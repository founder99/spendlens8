export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "customer-support"
  | "data-analysis"
  | "design"
  | "marketing"
  | "general";

export type AuditToolInput = {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
  teamSize: number;
  useCase: UseCase;
};

export type AuditFormData = {
  tools: AuditToolInput[];
  email?: string;
  company?: string;
  role?: string;
};

export type Recommendation = {
  type: "downgrade" | "alternative" | "optimize" | "cancel";
  title: string;
  description: string;
  monthlySavings: number;
  annualSavings: number;
  confidence: "high" | "medium" | "low";
};

export type ToolAuditResult = {
  tool: string;
  plan: string;
  currentMonthlySpend: number;
  recommendations: Recommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  isOptimized: boolean;
};

export type AuditResult = {
  id: string;
  createdAt: string;
  toolResults: ToolAuditResult[];
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary: string | null;
  leadCaptured: boolean;
};

export type StoredAudit = {
  id: string;
  created_at: string;
  tool_results: ToolAuditResult[];
  total_monthly_spend: number;
  total_monthly_savings: number;
  total_annual_savings: number;
  ai_summary: string | null;
  email: string | null;
  company: string | null;
  role: string | null;
};
