import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingDown, DollarSign } from "lucide-react";

import { getAuditById } from "@/lib/db/audits";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TOOL_PRICING } from "@/lib/pricing/tools";
import { ResultsClient } from "./results-client";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Audit Results | SpendLens",
  description: "View your personalized AI spend audit results and savings recommendations.",
};

export default async function ResultsPage({ params }: Props) {
  const { id } = await params;
  const audit = await getAuditById(id);

  if (!audit) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Your Audit Results</h1>
          <p className="text-muted-foreground">
            {audit.tool_results.length} tool{audit.tool_results.length !== 1 ? "s" : ""} analyzed
            · ${audit.total_monthly_spend}/mo total spend
          </p>
        </div>
        <Button variant="ghost" size="sm" render={<Link href="/audit" />}>
          <ArrowLeft className="mr-2 h-4 w-4" /> New Audit
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Current Spend</CardDescription>
            <CardTitle className="text-3xl font-bold">
              ${audit.total_monthly_spend}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-700 dark:text-green-400">
              Monthly Savings
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">
              ${audit.total_monthly_savings}
              <span className="text-sm font-normal">/mo</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-700 dark:text-green-400">
              Annual Savings
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">
              ${audit.total_annual_savings}
              <span className="text-sm font-normal">/yr</span>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Per-tool breakdown */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Per-Tool Breakdown</h2>
        <div className="space-y-4">
          {audit.tool_results.map((toolResult, idx) => {
            const displayName =
              TOOL_PRICING[toolResult.tool]?.displayName ?? toolResult.tool;
            return (
              <Card key={idx} className="border-border/50">
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                  <div>
                    <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                      {displayName}
                      <Badge variant="outline" className="font-normal capitalize">
                        {toolResult.plan}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      ${toolResult.currentMonthlySpend}/mo
                    </CardDescription>
                  </div>
                  {toolResult.isOptimized ? (
                    <Badge className="shrink-0 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Optimized
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="shrink-0 bg-destructive/10 text-destructive border-destructive/20"
                    >
                      <TrendingDown className="mr-1 h-3 w-3" />
                      Save ${toolResult.totalMonthlySavings}/mo
                    </Badge>
                  )}
                </CardHeader>
                {toolResult.recommendations.length > 0 && (
                  <CardContent>
                    <ul className="space-y-3">
                      {toolResult.recommendations.map((rec, rIdx) => (
                        <li key={rIdx} className="flex gap-3 text-sm">
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{rec.title}</p>
                            <p className="mt-0.5 text-muted-foreground">{rec.description}</p>
                            <p className="mt-1 text-xs font-medium text-green-600 dark:text-green-400">
                              Saves ${rec.monthlySavings}/mo · ${rec.annualSavings}/yr
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Client: lead modal gate + AI summary + share */}
      <ResultsClient audit={audit} />
    </div>
  );
}
