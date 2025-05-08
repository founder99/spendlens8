import { NextRequest, NextResponse } from "next/server";
import { getAuditById, updateAuditSummary } from "@/lib/db/audits";
import { generateAuditSummary } from "@/lib/ai/summary";
import type { AuditResult } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { auditId } = await req.json() as { auditId: string };
    if (!auditId) {
      return NextResponse.json({ error: "auditId is required" }, { status: 400 });
    }

    const stored = await getAuditById(auditId);
    if (!stored) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 });
    }

    const auditResult: AuditResult = {
      id: stored.id,
      createdAt: stored.created_at,
      toolResults: stored.tool_results,
      totalMonthlySpend: stored.total_monthly_spend,
      totalMonthlySavings: stored.total_monthly_savings,
      totalAnnualSavings: stored.total_annual_savings,
      aiSummary: stored.ai_summary,
      leadCaptured: !!stored.email,
    };

    const summary = await generateAuditSummary(auditResult);
    await updateAuditSummary(auditId, summary);

    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
