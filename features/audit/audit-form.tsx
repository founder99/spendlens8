"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { auditFormSchema, type AuditFormValues } from "@/lib/utils/schemas";
import type { UseCase } from "@/types";
import { submitAudit } from "@/lib/actions";
import { useLocalStorage } from "@/lib/utils/use-local-storage";
import { TOOL_PRICING, TOOL_DISPLAY_NAMES } from "@/lib/pricing/tools";

const USE_CASES: { id: UseCase; label: string }[] = [
  { id: "coding", label: "Coding / Engineering" },
  { id: "writing", label: "Copywriting / Content" },
  { id: "research", label: "Research / Searching" },
  { id: "customer-support", label: "Customer Support" },
  { id: "data-analysis", label: "Data Analysis" },
  { id: "design", label: "Design / Creative" },
  { id: "marketing", label: "Marketing" },
  { id: "general", label: "General Purpose" },
];

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
  const {
    value: storedData,
    set: setStoredData,
    hydrated,
  } = useLocalStorage<AuditFormValues | null>("spendlens-audit-draft", null);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: { tools: [DEFAULT_TOOL] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tools",
  });

  // Once localStorage is hydrated, reset form with stored values
  useEffect(() => {
    if (hydrated && storedData) {
      form.reset(storedData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  // Persist to localStorage on every change
  form.watch((val) => {
    if (hydrated) setStoredData(val as AuditFormValues);
  });

  if (!hydrated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Your AI Stack</h2>
        <p className="text-muted-foreground">
          Enter the AI tools your team currently pays for. We&apos;ll cross-reference with our
          pricing database to find overkill plans and unused seats.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          {fields.map((field, index) => {
            const toolId = form.watch(`tools.${index}.tool`);
            const planValue = form.watch(`tools.${index}.plan`);
            const useCaseValue = form.watch(`tools.${index}.useCase`);
            const currentTool = TOOL_PRICING[toolId] ?? null;
            const toolErrors = form.formState.errors.tools?.[index];

            return (
              <Card
                key={field.id}
                className="relative overflow-hidden border-border/50 bg-card/50 shadow-sm"
              >
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-2 top-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}

                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    Tool {index + 1}
                  </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-4 sm:grid-cols-2">
                  {/* Tool */}
                  <div className="space-y-1.5">
                    <Label>Select Tool</Label>
                    <Select
                      value={toolId}
                      onValueChange={(val) => {
                        form.setValue(`tools.${index}.tool`, val ?? "");
                        form.setValue(`tools.${index}.plan`, "");
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a tool" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(TOOL_DISPLAY_NAMES).map(([id, name]) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {toolErrors?.tool && (
                      <p className="text-xs text-destructive">{toolErrors.tool.message}</p>
                    )}
                  </div>

                  {/* Plan */}
                  <div className="space-y-1.5">
                    <Label>Current Plan</Label>
                    <Select
                      value={planValue}
                      onValueChange={(val) =>
                        form.setValue(`tools.${index}.plan`, val ?? "")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentTool ? (
                          Object.entries(currentTool.tiers).map(([id, tier]) => (
                            <SelectItem key={id} value={id}>
                              {tier.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="_placeholder" disabled>
                            Select a tool first
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {toolErrors?.plan && (
                      <p className="text-xs text-destructive">{toolErrors.plan.message}</p>
                    )}
                  </div>

                  {/* Monthly Spend */}
                  <div className="space-y-1.5">
                    <Label>Total Monthly Spend ($)</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 100"
                      {...form.register(`tools.${index}.monthlySpend`, {
                        valueAsNumber: true,
                      })}
                    />
                    {toolErrors?.monthlySpend && (
                      <p className="text-xs text-destructive">
                        {toolErrors.monthlySpend.message}
                      </p>
                    )}
                  </div>

                  {/* Seats */}
                  <div className="space-y-1.5">
                    <Label>Seats Paid For</Label>
                    <Input
                      type="number"
                      min={1}
                      placeholder="e.g. 5"
                      {...form.register(`tools.${index}.seats`, { valueAsNumber: true })}
                    />
                    {toolErrors?.seats && (
                      <p className="text-xs text-destructive">{toolErrors.seats.message}</p>
                    )}
                  </div>

                  {/* Team Size */}
                  <div className="space-y-1.5">
                    <Label>Active Users</Label>
                    <Input
                      type="number"
                      min={1}
                      placeholder="e.g. 3"
                      {...form.register(`tools.${index}.teamSize`, {
                        valueAsNumber: true,
                      })}
                    />
                    {toolErrors?.teamSize && (
                      <p className="text-xs text-destructive">
                        {toolErrors.teamSize.message}
                      </p>
                    )}
                  </div>

                  {/* Use Case */}
                  <div className="space-y-1.5">
                    <Label>Primary Use Case</Label>
                    <Select
                      value={useCaseValue}
                      onValueChange={(val) =>
                        form.setValue(
                          `tools.${index}.useCase`,
                          (val ?? "general") as UseCase
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a use case" />
                      </SelectTrigger>
                      <SelectContent>
                        {USE_CASES.map((uc) => (
                          <SelectItem key={uc.id} value={uc.id}>
                            {uc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {toolErrors?.useCase && (
                      <p className="text-xs text-destructive">
                        {toolErrors.useCase.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed py-6 text-muted-foreground hover:text-foreground"
          onClick={() =>
            append({
              tool: "",
              plan: "",
              monthlySpend: 0,
              seats: 1,
              teamSize: 1,
              useCase: "general",
            })
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
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Audit...
              </>
            ) : (
              <>
                Run Audit <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
