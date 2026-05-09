"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, useWatch, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Plus, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { auditFormSchema, type AuditFormValues } from "@/lib/utils/schemas";
import { submitAudit } from "@/lib/actions";
import { useLocalStorage } from "@/lib/utils/use-local-storage";
import { ToolRow } from "./tool-row";

const DEFAULT_TOOL: AuditFormValues["tools"][number] = {
  tool: "chatgpt",
  plan: "plus",
  monthlySpend: 20,
  seats: 1,
  teamSize: 1,
  useCase: "general",
};

export function AuditForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { value: storedData, set: setStoredData } =
    useLocalStorage<AuditFormValues | null>("spendlens-audit-draft", null);

  // Always start with static defaults (same on server + client) to avoid hydration mismatch.
  // After mount, rehydrate from localStorage via reset() — purely client-side.
  const methods = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: { tools: [DEFAULT_TOOL] },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "tools",
  });

  const watchedTools = useWatch({ control: methods.control, name: "tools" });

  // Rehydrate saved draft after first client render (avoids SSR mismatch)
  useEffect(() => {
    if (storedData) {
      methods.reset(storedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save draft to localStorage whenever the form changes
  useEffect(() => {
    if (watchedTools) setStoredData({ tools: watchedTools } as AuditFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedTools)]);

  const onSubmit = async (data: AuditFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await submitAudit(data);
      if (result.success) {
        toast.success("Audit completed!");
        router.push(`/results/${result.auditId}`);
      } else {
        toast.error(result.error ?? "Failed to submit audit.");
        setIsSubmitting(false);
      }
    } catch {
      toast.error("An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Your AI Stack</h2>
          <p className="mt-1 text-muted-foreground">
            Enter the AI tools your team currently pays for. We&apos;ll cross-reference with our
            real-time pricing database to find overkill plans and unused seats.
          </p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {fields.map((field, index) => (
              <ToolRow
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
                canRemove={fields.length > 1}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed py-6 text-muted-foreground hover:text-foreground"
            onClick={() =>
              append({ tool: "", plan: "", monthlySpend: 0, seats: 1, teamSize: 1, useCase: "general" })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Tool
          </Button>

          <Separator />

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Analyzing {fields.length} tool{fields.length > 1 ? "s" : ""} for savings.
            </p>
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running Audit...</>
              ) : (
                <>Run Audit <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
