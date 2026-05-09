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
  Sparkles,
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
    a: "Audit results are stored to generate your shareable link. We never sell or share your data.",
  },
  {
    q: "What tools do you support?",
    a: "ChatGPT, Claude, Gemini, GitHub Copilot, Cursor, Windsurf, Codeium, Notion AI, Midjourney, Grammarly, Jasper, Perplexity, and more.",
  },
  {
    q: "Can I audit tools not on your list?",
    a: "Yes — enter any tool manually. The engine applies general cost-optimization rules even without specific pricing data.",
  },
];

const SOCIAL_PROOF = [
  { quote: "Found $340/month in savings in under 3 minutes.", name: "Head of Engineering", company: "Series A startup" },
  { quote: "We had 4 overlapping AI writing tools. SpendLens caught it immediately.", name: "Marketing Director", company: "B2B SaaS" },
  { quote: "Sent the shareable link straight to our CFO. Approved the changes same day.", name: "CTO", company: "50-person team" },
];

const TOOLS = [
  "ChatGPT", "Claude", "Cursor", "GitHub Copilot", "Gemini",
  "Windsurf", "Notion AI", "Midjourney", "Grammarly", "Perplexity",
  "Jasper", "Codeium", "Runway", "ElevenLabs", "Canva",
];

const STATS = [
  { value: "$340", label: "avg monthly savings found" },
  { value: "2 min", label: "to complete an audit" },
  { value: "14", label: "AI tools supported" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-glow relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6">
        <Badge
          variant="secondary"
          className="animate-fade-up mb-6 gap-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Free audit — no credit card required
        </Badge>

        <h1 className="animate-fade-up animation-delay-100 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Stop overpaying for
          <br />
          <span className="text-muted-foreground">AI tools you don&apos;t need</span>
        </h1>

        <p className="animate-fade-up animation-delay-200 mt-6 max-w-xl text-lg text-muted-foreground">
          SpendLens audits your entire AI stack in 2 minutes. Find unused seats,
          overkill plans, and cheaper alternatives — with exact dollar savings.
        </p>

        <div className="animate-fade-up animation-delay-300 mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 transition-transform hover:scale-105 btn-shine" render={<Link href="/audit" />}>
            Start free audit <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="ghost" render={<Link href="#how-it-works" />}>
            See how it works
          </Button>
        </div>

        <p className="animate-fade-up animation-delay-400 mt-4 text-sm text-muted-foreground">
          Takes 2 minutes · No signup required · Instant results
        </p>

        {/* Stats row */}
        <div className="animate-fade-up animation-delay-500 mt-14 grid w-full max-w-2xl grid-cols-3 gap-4 rounded-2xl border border-border/50 bg-muted/30 p-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold tracking-tight sm:text-3xl">{value}</span>
              <span className="text-center text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tool marquee strip — with premium fade mask */}
      <div className="relative border-y border-border/50 bg-muted/20 py-6 overflow-hidden">
        {/* Gradient masks for smooth fade on edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-semibold tracking-wide text-muted-foreground/50 hover:text-primary transition-colors cursor-default"
            >
              {tool}
              <span className="ml-8 text-border/40">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Social proof */}
      <section className="border-b border-border/50 bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What teams are saying
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {SOCIAL_PROOF.map((item, i) => (
              <Card
                key={item.name}
                className="animate-fade-up border-border/50 transition-shadow hover:shadow-md"
                style={{ animationDelay: `${i * 100}ms` }}
              >
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
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <Card
              key={title}
              className="animate-fade-up group border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:bg-card hover:border-primary/20"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="flex gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-border/50 bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ step, title, description }, i) => (
              <div
                key={step}
                className="animate-fade-up flex flex-col gap-3"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="text-5xl font-bold text-border/60">{step}</span>
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
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to find your savings?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Free, instant, no credit card. Takes 2 minutes.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Button
              size="lg"
              className="gap-2 transition-transform hover:scale-105 btn-shine"
              render={<Link href="/audit" />}
            >
              Start free audit <ArrowRight className="h-4 w-4" />
            </Button>
            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {["No signup", "Instant results", "Shareable report", "100% free"].map((item) => (
                <li key={item} className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6">
          <span>© {new Date().getFullYear()} SpendLens</span>
          <span>Built for teams that care about their AI budget</span>
        </div>
      </footer>
    </div>
  );
}
