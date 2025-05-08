import { AuditForm } from "@/features/audit/audit-form";

export const metadata = {
  title: "Run Free AI Audit | SpendLens",
  description: "Audit your AI tool stack to find savings and remove overkill plans.",
};

export default function AuditPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
              <span className="text-sm">SL</span>
            </div>
            SpendLens
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-20 px-4 sm:px-6">
        <AuditForm />
      </main>

      <footer className="border-t border-border/50 py-6 mt-auto">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 text-xs text-muted-foreground sm:px-6">
          <span>SpendLens — Your data is processed securely to generate your savings report.</span>
        </div>
      </footer>
    </div>
  );
}
