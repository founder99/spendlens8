import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart3,
  Zap,
  Shield,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const FEATURES = [
  {
    icon: TrendingDown,
    title: "Detect overspending instantly",
    description:
      "Our audit engine checks every tool against current pricing tiers and flags plans you've outgrown — or never needed.",
  },
  {
    icon: Zap,
    title: "Actionable recommendations",
    description:
      "Not just numbers — specific steps. Downgrade this plan, remove those seats, switch to this alternative.",
  },
  {
    icon: BarChart3,
    title: "AI-generated summary",
    description:
      "Get a plain-English summary of your entire AI stack written by an LLM, tailored to your actual usage.",
  },
  {
    icon: Shield,
    title: "Shareable audit report",
    description:
      "Every audit gets a permanent public URL. Share with your CFO, your team, or your investors.",
  },
];

const STEPS = [
  { step: "01", title: "Add your tools", description: "Enter each AI tool, your plan, monthly spend, and seat count." },
  { step: "02", title: "Run the audit", description: "Our engine checks for overkill plans, unused seats, and cheaper alternatives." },
  { step: "03", title: "Get your report", description: "See exact savings, per-tool recommendations, and an AI-written summary." },
];

const FAQS = [
  {
    q: "Is this really free?",
    a: "Yes. The audit is completely free. We capture your email to send you the report — that's it.",
  },
  {
    q: "How accurate are the savings estimates?",
    a: "Estimates are based on publicly available pricing data for each tool. They reflect realistic savings if you act on the recommendations.",
  },
  {
    q: "Do you store my spend data?",
    a: "Audit results are stored to generate your shareable link. We never sell or share your data. See our privacy policy.",
  },
  {
    q: "What tools do you support?",
    a: "ChatGPT, Claude, Gemini, GitHub Copilot, Cursor, Codeium, Notion AI, Midjourney, Grammarly, Jasper, Perplexity, and more being added regularly.",
  },
  {
    q: "Can I audit tools not on your list?",
    a: "Yes — you can enter any tool manually. The engine will apply general cost-optimization rules even without specific pricing data.",
  },
];

const SOCIAL_PROOF = [
  { quote: "Found $340/month in savings in under 3 minutes.", name: "Head of Engineering", company: "Series A startup" },
  { quote: "We had 4 overlapping AI writing tools. SpendLens caught it immediately.", name: "Marketing Director", company: "B2B SaaS" },
  { quote: "Sent the shareable link straight to our CFO. Approved the changes same day.", name: "CTO", company: "50-person team" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6">
        <Badge variant="secondary" className="mb-6 gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Free audit — no credit card required
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Stop overpaying for
          <br />
          <span className="text-muted-foreground">AI tools you don&apos;t need</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          SpendLens audits your entire AI stack in 2 minutes. Find unused seats,
          overkill plans, and cheaper alternatives — with exact dollar savings.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2" render={<Link href="/audit" />}>
            Start free audit <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="ghost" render={<Link href="#how-it-works" />}>
            See how it works
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Takes 2 minutes · No signup required · Instant results
        </p>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-border/50 bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            What teams are saying
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {SOCIAL_PROOF.map((item) => (
              <Card key={item.name} className="border-border/50">
                <CardContent className="pt-6">
                  <p className="text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything you need to cut AI waste
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for engineering leads, ops teams, and anyone who owns the AI budget.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border/50">
              <CardContent className="flex gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-border/50 bg-muted/30 py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col gap-3">
                <span className="text-4xl font-bold text-border">{step}</span>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <Accordion className="w-full">
          {FAQS.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-sm font-medium">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/50 bg-muted/30 py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to find your savings?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Free, instant, no credit card. Takes 2 minutes.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Button size="lg" className="gap-2" render={<Link href="/audit" />}>
              Start free audit <ArrowRight className="h-4 w-4" />
            </Button>
            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {["No signup", "Instant results", "Shareable report", "100% free"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6">
          <span>© 2026 SpendLens</span>
          <span>Built for teams that care about their AI budget</span>
        </div>
      </footer>
    </div>
  );
}
