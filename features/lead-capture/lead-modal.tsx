"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Briefcase, Building2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { leadCaptureSchema, type LeadCaptureValues } from "@/lib/utils/schemas";
import { captureLead } from "@/lib/actions";

interface LeadModalProps {
  auditId: string;
  isOpen: boolean;
  onComplete: () => void;
}

export function LeadModal({ auditId, isOpen, onComplete }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeadCaptureValues>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: { email: "", company: "", role: "" },
  });

  const onSubmit = async (data: LeadCaptureValues) => {
    setIsSubmitting(true);
    try {
      const result = await captureLead(auditId, data);
      if (result.success) {
        toast.success("Details saved! Unlocking full report...");
        onComplete();
      } else {
        toast.error(result.error ?? "Failed to save details.");
        setIsSubmitting(false);
      }
    } catch {
      toast.error("An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Unlock your full report</DialogTitle>
          <DialogDescription>
            Enter your details to view exact savings, per-tool recommendations, and your
            AI-generated summary.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">
              Work Email <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="pl-9"
                {...form.register("email")}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="company">Company (optional)</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                placeholder="Acme Corp"
                className="pl-9"
                {...form.register("company")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="role">Role (optional)</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="role"
                placeholder="CTO, VP Eng, Head of Ops..."
                className="pl-9"
                {...form.register("role")}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "View My Savings Report"
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No spam. We'll send you a link to this report so you can share it.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
