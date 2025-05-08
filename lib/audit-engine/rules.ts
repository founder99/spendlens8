import { TOOL_PRICING, getCheaperTier } from "@/lib/pricing/tools";
import type { AuditRule } from "./types";

// Rule: User is paying for more seats than their team uses
export const lowUtilizationRule: AuditRule = {
  id: "low-utilization",
  evaluate({ input, utilizationRate }) {
    if (utilizationRate >= 0.8 || input.seats <= 1) return null;

    const unusedSeats = input.seats - input.teamSize;
    const costPerSeat = input.monthlySpend / input.seats;
    const monthlySavings = Math.round(unusedSeats * costPerSeat);

    if (monthlySavings < 5) return null;

    return {
      type: "optimize",
      title: "Reduce unused seats",
      description: `You're paying for ${input.seats} seats but only ${input.teamSize} people use this tool. Remove ${unusedSeats} unused seat${unusedSeats > 1 ? "s" : ""}.`,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      confidence: utilizationRate < 0.5 ? "high" : "medium",
    };
  },
};

// Rule: A cheaper plan exists for this tool
export const overkillPlanRule: AuditRule = {
  id: "overkill-plan",
  evaluate({ input }) {
    const cheaper = getCheaperTier(input.tool, input.plan);
    if (!cheaper) return null;

    const expectedCost = cheaper.pricing.flatMonthlyPrice
      ? cheaper.pricing.flatMonthlyPrice
      : cheaper.pricing.monthlyPricePerSeat * input.seats;

    const monthlySavings = Math.round(input.monthlySpend - expectedCost);
    if (monthlySavings < 5) return null;

    return {
      type: "downgrade",
      title: `Downgrade to ${cheaper.pricing.name}`,
      description: `The "${cheaper.pricing.name}" plan covers your team's needs at a lower cost. Features included: ${cheaper.pricing.features.join(", ")}.`,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      confidence: "high",
    };
  },
};

// Rule: A cheaper alternative tool exists for the same use case
export const cheaperAlternativeRule: AuditRule = {
  id: "cheaper-alternative",
  evaluate({ input }) {
    const toolData = TOOL_PRICING[input.tool];
    if (!toolData?.alternatives?.length) return null;

    const alternatives = toolData.alternatives
      .map((altId) => TOOL_PRICING[altId])
      .filter(Boolean);

    for (const alt of alternatives) {
      const freeTier = Object.values(alt.tiers).find(
        (t) => t.monthlyPricePerSeat === 0
      );
      if (freeTier && input.monthlySpend > 0) {
        return {
          type: "alternative",
          title: `Try ${alt.displayName} (free tier available)`,
          description: `${alt.displayName} offers a free tier with ${freeTier.features.join(", ")} that may cover your use case.`,
          monthlySavings: Math.round(input.monthlySpend * 0.5),
          annualSavings: Math.round(input.monthlySpend * 0.5 * 12),
          confidence: "low",
        };
      }

      const cheapestPaidTier = Object.values(alt.tiers).sort(
        (a, b) => a.monthlyPricePerSeat - b.monthlyPricePerSeat
      )[0];

      const altMonthlyCost = cheapestPaidTier.monthlyPricePerSeat * input.seats;
      const monthlySavings = Math.round(input.monthlySpend - altMonthlyCost);

      if (monthlySavings >= 10) {
        return {
          type: "alternative",
          title: `Switch to ${alt.displayName}`,
          description: `${alt.displayName}'s "${cheapestPaidTier.name}" plan offers similar capabilities at a lower price point.`,
          monthlySavings,
          annualSavings: monthlySavings * 12,
          confidence: "medium",
        };
      }
    }

    return null;
  },
};

// Rule: High per-seat cost relative to category benchmarks
export const highPerSeatCostRule: AuditRule = {
  id: "high-per-seat-cost",
  evaluate({ input, effectiveCostPerSeat }) {
    const CATEGORY_BENCHMARKS: Record<string, number> = {
      coding: 19,
      writing: 15,
      general: 20,
      research: 20,
      design: 30,
      marketing: 50,
      "customer-support": 30,
      "data-analysis": 25,
    };

    const toolData = TOOL_PRICING[input.tool];
    const category = toolData?.category ?? input.useCase;
    const benchmark = CATEGORY_BENCHMARKS[category] ?? 25;

    if (effectiveCostPerSeat <= benchmark * 1.5) return null;

    const targetMonthlyCost = benchmark * input.seats;
    const monthlySavings = Math.round(input.monthlySpend - targetMonthlyCost);

    if (monthlySavings < 10) return null;

    return {
      type: "optimize",
      title: "Above-average spend for this category",
      description: `Your per-seat cost of $${effectiveCostPerSeat.toFixed(2)} is above the typical $${benchmark}/seat for ${category} tools. Consider reviewing your plan.`,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      confidence: "medium",
    };
  },
};

// Rule: Solo user on a team plan
export const soloOnTeamPlanRule: AuditRule = {
  id: "solo-on-team-plan",
  evaluate({ input }) {
    const isTeamPlan = ["team", "business", "enterprise"].includes(
      input.plan.toLowerCase()
    );
    if (!isTeamPlan || input.teamSize > 2) return null;

    const toolData = TOOL_PRICING[input.tool];
    const individualTier = toolData
      ? Object.entries(toolData.tiers).find(([k]) =>
          ["individual", "pro", "plus", "premium", "advanced"].includes(k)
        )
      : null;

    if (!individualTier) return null;

    const [, tierPricing] = individualTier;
    const monthlySavings = Math.round(
      input.monthlySpend - tierPricing.monthlyPricePerSeat
    );

    if (monthlySavings < 5) return null;

    return {
      type: "downgrade",
      title: "Team plan for a solo user",
      description: `You're on a team plan but only ${input.teamSize} person uses this tool. The "${tierPricing.name}" plan is sufficient and cheaper.`,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      confidence: "high",
    };
  },
};

export const ALL_RULES: AuditRule[] = [
  soloOnTeamPlanRule,
  overkillPlanRule,
  lowUtilizationRule,
  cheaperAlternativeRule,
  highPerSeatCostRule,
];
