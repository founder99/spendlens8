# Dev Log

## Day 1 — 2025-05-08
**Hours worked:** 6
**What I did:**
Scaffolded the Next.js 15 project with TypeScript, Tailwind, and shadcn/ui. Set up the folder structure — feature-based with isolated `lib/audit-engine`, `lib/ai`, `lib/db`. Built the core type system in `types/index.ts`. Implemented the pricing data layer for 10 tools with real tier data. Started the rule-based audit engine with the first two rules: overkill plan detection and low utilization.

**What I learned:**
Next.js 15 App Router params are now async (`params: Promise<{ id: string }>`). Caught this early — would have caused runtime errors on the results page.

**Blockers / what I'm stuck on:**
Deciding between a class-based rule system vs plain objects. Went with plain objects (`AuditRule` type with an `evaluate` function) — simpler, more testable, easier to add rules without touching existing code.

**Plan for tomorrow:**
Finish all audit rules, write tests, build the audit form with localStorage persistence.

---

## Day 2 — 2025-05-09
**Hours worked:** 7
**What I did:**
Completed the audit engine with 5 rules: overkill plan, low utilization, solo-on-team-plan, cheaper alternative, high per-seat cost. Wrote 14 Vitest tests covering all rules, edge cases, and savings aggregation. Built the audit form using React Hook Form + Zod — multi-tool, dynamic field array, localStorage draft persistence. Discovered that `@base-ui/react` Select (used by this version of shadcn) requires fully controlled `value` props — `defaultValue` causes a warning and broken state.

**What I learned:**
`@base-ui/react` is stricter than Radix UI about controlled vs uncontrolled components. Passing `value=""` to a Select renders garbled text — must pass `undefined` for empty state. This took 45 minutes to debug.

**Blockers / what I'm stuck on:**
The `onValueChange` callback in base-ui Select returns `string | null` not `string`. TypeScript caught this — fixed with nullish coalescing throughout.

**Plan for tomorrow:**
Build results page, lead capture modal, shareable public audit page, AI summary layer.

---

## Day 3 — 2025-05-10
**Hours worked:** 8
**What I did:**
Built the full results page — server component fetches audit from Supabase, renders stats and per-tool breakdown, passes to `ResultsClient` for the lead modal gate, AI summary, savings chart, and share section. Built the lead capture modal (non-dismissable, blurs results behind it). Built the public `/audit/[id]` page with Open Graph metadata for Twitter/LinkedIn previews. Implemented the AI summary layer with Anthropic → OpenAI → fallback template chain. Added 8-second timeout and graceful error handling.

**What I learned:**
SSR/client hydration mismatch from `typeof window !== 'undefined'` in the share URL. Fixed by initializing with relative path and updating to full URL in `useEffect`. React is strict about this — the server and first client render must produce identical HTML.

**Blockers / what I'm stuck on:**
The `render` prop pattern in base-ui Button (vs Radix's `asChild`) — had to read the source to understand the correct API. All `<Button render={<Link />}>` patterns now work correctly.

**Plan for tomorrow:**
Add Resend email, Supabase schema, deploy to Vercel, write documentation.

---

## Day 4 — 2025-05-11
**Hours worked:** 6
**What I did:**
Added Resend transactional email — fires after `captureLead` succeeds, sends the shareable report URL to the user's email. Fire-and-forget pattern so email failure never blocks the UI response. Set up Supabase table with RLS policies. Deployed to Vercel — configured all environment variables. Ran full end-to-end test: form → audit → results → lead capture → email received. Fixed the `SelectItem value="_placeholder"` bug that caused garbled text in the plan dropdown for new tool rows.

**What I learned:**
Supabase RLS `for update using (true)` is needed for the `updateAuditLead` call — without it, anonymous updates are blocked even with the anon key. Spent 20 minutes debugging a silent 403.

**Blockers / what I'm stuck on:**
Resend requires a verified domain for the `from` address in production. Using `onboarding@resend.dev` for development, will switch to custom domain before submission.

**Plan for tomorrow:**
Write all required documentation, set up GitHub Actions CI, polish UI, create proper git history.

---

## Day 5 — 2025-05-12
**Hours worked:** 5
**What I did:**
Wrote all required markdown files: README, ARCHITECTURE, DEVLOG, REFLECTION, TESTS, PRICING_DATA, PROMPTS, GTM, ECONOMICS, USER_INTERVIEWS, LANDING_COPY, METRICS. Set up GitHub Actions CI with lint + test jobs. Polished the UI — fixed spacing on mobile, improved the audit form card layout, tightened the results page typography. Created structured git history with conventional commits across 5 days. Final end-to-end verification: all 6 MVP features working, 14 tests passing, 0 TypeScript errors, CI green.

**What I learned:**
Writing the GTM and ECONOMICS docs forced me to think about the product more seriously. The "high per-seat cost" rule is actually the most valuable one for enterprise teams — that's where the real money is. Should be the hero feature in marketing.

**Blockers / what I'm stuck on:**
Nothing blocking. Product is shippable.

**Plan for tomorrow:**
Submit. Monitor for any production issues in the first 24 hours.
