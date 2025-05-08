"use server";

import { runAudit } from "@/lib/audit-engine/engine";
import { generateAuditSummary } from "@/lib/ai/summary";
import { saveAudit, updateAuditLead, updateAuditSummary, getAuditById } from "@/lib/db/audits";
import { isPlaceholder } from "@/lib/db/client";
import { sendAuditReportEmail } from "@/lib/email/send-report";
import { auditFormSchema, leadCaptureSchema } from "@/lib/utils/schemas";
import type { AuditResult } from "@/types";

export async function submitAudit(
  rawData: unknown
): Promise<{ success: true; auditId: string; result: AuditResult } | { success: false; error: string }> {
  const parsed = auditFormSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (isPlaceholder) {
    return {
      success: false,
      error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    };
  }

  const result = runAudit(parsed.data.tools);

  const [auditId, summary] = await Promise.allSettled([
    saveAudit(result),
    generateAuditSummary(result),
  ]);

  if (auditId.status === "rejected") {
    console.error("Audit save error:", auditId.reason);
    return { success: false, error: "Failed to save audit. Please try again." };
  }

  const id = auditId.value;
  result.aiSummary = summary.status === "fulfilled" ? summary.value : null;

  if (result.aiSummary) {
    await updateAuditSummary(id, result.aiSummary);
  }

  return { success: true, auditId: id, result };
}

export async function captureLead(
  auditId: string,
  rawData: unknown
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = leadCaptureSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await updateAuditLead(auditId, parsed.data);

    // Fire-and-forget email — don't block the response if it fails
    if (parsed.data.email) {
      const audit = await getAuditById(auditId);
      if (audit) {
        sendAuditReportEmail({
          to: parsed.data.email,
          auditId,
          monthlySavings: audit.total_monthly_savings,
          annualSavings: audit.total_annual_savings,
        }).catch((err) => console.error("Email send failed:", err));
      }
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to save your info. Please try again." };
  }
}
