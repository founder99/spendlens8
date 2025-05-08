import type { AuditToolInput, Recommendation } from "@/types";

export type RuleContext = {
  input: AuditToolInput;
  effectiveCostPerSeat: number;
  utilizationRate: number; // seats used / team size
};

export type AuditRule = {
  id: string;
  evaluate: (ctx: RuleContext) => Recommendation | null;
};
