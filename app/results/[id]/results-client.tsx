"use client";

import { useState } from "react";
import { Sparkles, Copy, ExternalLink, Check, BarChart2 } from "lucide-react";

import { LeadModal } from "@/features/lead-capture/lead-modal";
import { SavingsChart } from "@/features/results/savings-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { StoredAudit } from "@/types";

export function ResultsClient({ audit }: { audit: StoredAudit }) {
  const [showModal, setShowModal] = useState(!audit.email);
  const [isCopied, setIsCopied] = useState(false);

  const shareableUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/audit/${audit.id}`
      : `https://spendlens.vercel.app/audit/${audit.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <>
      <LeadModal
        auditId={audit.id}
        isOpen={showModal}
        onComplete={() => setShowModal(false)}
      />

      <div
        className={`space-y-8 transition-all duration-300 ${
          showModal ? "pointer-events-none select-none opacity-20 blur-sm" : "opacity-100"
        }`}
      >
        {/* Savings Chart */}
        {audit.tool_results.length > 1 && (
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <BarChart2 className="h-5 w-5 text-primary" />
              Spend vs Savings
            </h2>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <SavingsChart toolResults={audit.tool_results} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Summary */}
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Executive Summary
          </h2>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              {audit.ai_summary ? (
                <p className="leading-relaxed text-foreground/90">{audit.ai_summary}</p>
              ) : (
                <p className="italic leading-relaxed text-muted-foreground">
                  Generating your personalized summary… Reload in a few moments.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Share */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Share Report</h2>
          <Card className="border-border/50">
            <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
              <div className="flex-1 overflow-x-auto whitespace-nowrap rounded-md bg-muted px-3 py-2 font-mono text-sm text-muted-foreground">
                {shareableUrl}
              </div>
              <div className="flex w-full gap-2 sm:w-auto">
                <Button
                  variant="secondary"
                  onClick={handleCopy}
                  className="w-28 flex-1 sm:flex-none"
                >
                  {isCopied ? (
                    <><Check className="mr-2 h-4 w-4" /> Copied</>
                  ) : (
                    <><Copy className="mr-2 h-4 w-4" /> Copy Link</>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  render={
                    <a
                      href={shareableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Open
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
