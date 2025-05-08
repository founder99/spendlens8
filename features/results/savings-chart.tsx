"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { TOOL_PRICING } from "@/lib/pricing/tools";
import type { ToolAuditResult } from "@/types";

type Props = {
  toolResults: ToolAuditResult[];
};

export function SavingsChart({ toolResults }: Props) {
  const data = toolResults.map((r) => ({
    name: TOOL_PRICING[r.tool]?.displayName ?? r.tool,
    "Optimized Cost": Math.max(0, r.currentMonthlySpend - r.totalMonthlySavings),
    "Potential Savings": r.totalMonthlySavings,
  }));

  if (data.length === 0) return null;

  const formatDollar = (value: ValueType | undefined) =>
    typeof value === "number" ? `$${value}` : String(value ?? "");

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `$${v}`} />
          <Tooltip
            formatter={formatDollar}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="Optimized Cost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Potential Savings" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
