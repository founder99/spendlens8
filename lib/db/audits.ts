import { supabase } from "./client";
import type { AuditResult, StoredAudit } from "@/types";

export async function saveAudit(
  audit: AuditResult,
  lead?: { email?: string; company?: string; role?: string }
): Promise<string> {
  const { data, error } = await supabase
    .from("audits")
    .insert({
      id: audit.id,
      tool_results: audit.toolResults,
      total_monthly_spend: audit.totalMonthlySpend,
      total_monthly_savings: audit.totalMonthlySavings,
      total_annual_savings: audit.totalAnnualSavings,
      ai_summary: audit.aiSummary,
      email: lead?.email ?? null,
      company: lead?.company ?? null,
      role: lead?.role ?? null,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

export async function getAuditById(id: string): Promise<StoredAudit | null> {
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as StoredAudit;
}

export async function updateAuditSummary(
  id: string,
  aiSummary: string
): Promise<void> {
  await supabase.from("audits").update({ ai_summary: aiSummary }).eq("id", id);
}

export async function updateAuditLead(
  id: string,
  lead: { email: string; company?: string; role?: string }
): Promise<void> {
  await supabase
    .from("audits")
    .update({ email: lead.email, company: lead.company, role: lead.role })
    .eq("id", id);
}
