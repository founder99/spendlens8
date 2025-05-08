import { nanoid } from "nanoid";
import type { AuditToolInput, AuditResult, ToolAuditResult } from "@/types";
import { ALL_RULES } from "./rules";
import type { RuleContext } from "./types";

function auditTool(input: AuditToolInput): ToolAuditResult {
  const effectiveCostPerSeat =
    input.seats > 0 ? input.monthlySpend / input.seats : input.monthlySpend;

  const utilizationRate =
    input.seats > 0 ? Math.min(input.teamSize / input.seats, 1) : 1;

  const ctx: RuleContext = { input, effectiveCostPerSeat, utilizationRate };

  const recommendations = ALL_RULES.map((rule) => rule.evaluate(ctx)).filter(
    (r): r is NonNullable<typeof r> => r !== null
  );

  // Deduplicate: keep highest-savings recommendation per type
  const seen = new Set<string>();
  const deduped = recommendations.filter((r) => {
    if (seen.has(r.type)) return false;
    seen.add(r.type);
    return true;
  });

  const totalMonthlySavings = deduped.reduce(
    (sum, r) => sum + r.monthlySavings,
    0
  );

  return {
    tool: input.tool,
    plan: input.plan,
    currentMonthlySpend: input.monthlySpend,
    recommendations: deduped,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    isOptimized: deduped.length === 0,
  };
}

export function runAudit(tools: AuditToolInput[]): AuditResult {
  const toolResults = tools.map(auditTool);

  const totalMonthlySpend = tools.reduce((s, t) => s + t.monthlySpend, 0);
  const totalMonthlySavings = toolResults.reduce(
    (s, r) => s + r.totalMonthlySavings,
    0
  );

  return {
    id: nanoid(10),
    createdAt: new Date().toISOString(),
    toolResults,
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    aiSummary: null,
    leadCaptured: false,
  };
}
