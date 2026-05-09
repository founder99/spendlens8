# Dev Log

## Day 1 — 2025-05-08
**Hours worked:** 6
**What I did:**
Scaffolded the Next.js 15 project with TypeScript, Tailwind, and shadcn/ui. Set up the folder structure — feature-based with isolated `lib/audit-engine`, `lib/ai`, `lib/db`. Built the core type system in `types/index.ts`. Implemented the pricing data layer for 10 tools with real tier data sourced from official pricing pages. Started the rule-based audit engine with the first two rules: overkill plan detection and low utilization.

**What I learned:**
Next.js 15 App Router params are now async (`params: Promise<{ id: string }>`). Caught this early — would have caused runtime errors on the results page. Also learned that `@base-ui/react` (used by this version of shadcn) has a different API than Radix UI — `render` prop instead of `asChild`, no `onInteractOutside`.

**Blockers / what I'm stuck on:**
Deciding between a class-based rule system vs plain objects. Went with plain objects (`AuditRule` type with an `evaluate` function) — simpler, more testable, easier to add rules without touching existing code.

**Plan for tomorrow:**
Finish all audit rules, write tests, build the audit form with localStorage persistence.

---

## Day 2 — 2025-05-09
**Hours worked:** 7
**What I did:**
Completed the audit engine with 5 rules: overkill plan, low utilization, solo-on-team-plan, cheaper alternative, high per-seat cost. Wrote 14 Vitest tests covering all rules, edge cases, and savings aggregation. Built the audit form using React Hook Form + Zod — multi-tool, dynamic field array, localStorage draft persistence. Discovered that `@base-ui/react` Select requires fully controlled `value` props — `defaultValue` causes a warning and broken state.

**What I learned:**
`@base-ui/react` is stricter than Radix UI about controlled vs uncontrolled components. Passing `value=""` to a Select renders garbled text — must pass `undefined` for empty state. This took 45 minutes to debug. The `onValueChange` callback returns `string | null` not `string` — TypeScript caught this.

**Blockers / what I'm stuck on:**
The `form.watch()` inside `fields.map()` triggers a React Compiler warning about incompatible memoization. Resolved by extracting each tool row into a `ToolRow` component using `useWatch`.

**Plan for tomorrow:**
Build results page, lead capture modal, shareable public audit page, AI summary layer.

---

## Day 3 — 2025-05-10
**Hours worked:** 8
**What I did:**
Built the full results page — server component fetches audit from Supabase, renders stats and per-tool breakdown, passes to `ResultsClient` for the lead modal gate, AI summary, savings chart, and share section. Built the lead capture modal (non-dismissable, blurs results behind it). Built the public `/audit/[id]` page with Open Graph metadata for Twitter/LinkedIn previews. Implemented the AI summary layer with Anthropic → OpenAI → fallback template chain with 8-second timeout.

**What I learned:**
SSR/client hydration mismatch from `typeof window !== 'undefined'` in the share URL. Fixed by using `suppressHydrationWarning` on the element. React is strict about this — the server and first client render must produce identical HTML.

**Blockers / what I'm stuck on:**
The `render` prop pattern in base-ui Button (vs Radix's `asChild`) — had to read the source to understand the correct API.

**Plan for tomorrow:**
Add email sending, Supabase schema, deploy to Vercel, write documentation.

---

## Day 4 — 2025-05-11
**Hours worked:** 6
**What I did:**
Started with Resend for transactional email but hit a blocker — Resend's free tier only sends to the account owner's email without a verified domain. Switched to Nodemailer + Gmail SMTP which sends to any address for free. Set up Supabase table with RLS policies. Deployed to Vercel. Ran full end-to-end test: form → audit → results → lead capture → email received. Fixed the `SelectItem value="_placeholder"` bug causing garbled text in plan dropdown for new tool rows.

**What I learned:**
Resend's free tier restriction is not clearly documented — you only discover it when your email silently fails. Gmail SMTP is more reliable for MVP stage. Also: Vercel serverless functions terminate after the response is sent — fire-and-forget async calls get killed. Must `await` the email send inside the server action.

**Blockers / what I'm stuck on:**
Supabase RLS `for update using (true)` is needed for the `updateAuditLead` call — without it, anonymous updates are blocked. Spent 20 minutes debugging a silent 403.

**Plan for tomorrow:**
Write all required documentation, set up GitHub Actions CI, polish UI, add missing required tools.

---

## Day 5 — 2025-05-12
**Hours worked:** 5
**What I did:**
Wrote all required markdown files: README, ARCHITECTURE, DEVLOG, REFLECTION, TESTS, PRICING_DATA, PROMPTS, GTM, ECONOMICS, USER_INTERVIEWS, LANDING_COPY, METRICS. Set up GitHub Actions CI with lint + test jobs. Added Windsurf, Anthropic API direct, OpenAI API direct, and Claude Max tier to the pricing data — these were required by the assignment spec. Added Credex CTA for audits showing >$500/mo savings. Added honest "well-optimized" state for <$100/mo audits.

**What I learned:**
Writing the GTM and ECONOMICS docs forced me to think about the product more seriously. The "high per-seat cost" rule is actually the most valuable one for enterprise teams — that's where the real money is. The Credex integration makes the product a genuine lead-gen asset, not just a utility.

**Blockers / what I'm stuck on:**
The infinite re-render bug on `/audit` page during Vercel build — caused by calling `setStoredData` directly in the render body instead of in a `useEffect`. Fixed by wrapping in `useEffect` with `JSON.stringify(watchedTools)` as dependency.

**Plan for tomorrow:**
Add honeypot abuse protection, fix remaining CI lint errors, final end-to-end verification.

---

## Day 6 — 2025-05-13
**Hours worked:** 4
**What I did:**
Added honeypot field to lead capture modal for bot abuse protection — hidden input that real users never fill, bots always do. Documented the abuse protection choice in ARCHITECTURE.md. Fixed all remaining CI lint errors: `setState-in-effect` in `useLocalStorage`, `react/no-unescaped-entities` across multiple files, unused variable warnings. CI is now fully green. Updated PRICING_DATA.md with Windsurf, Anthropic API, and OpenAI API pricing with official source URLs.

**What I learned:**
Honeypot is the simplest effective bot protection for a form like this — no user friction, no third-party dependency, catches the vast majority of automated submissions. Rate limiting would require either a Redis instance or Vercel KV, which adds complexity. For MVP stage, honeypot is the right call.

**Blockers / what I'm stuck on:**
Nothing blocking. All 6 MVP features working end-to-end in production.

**Plan for tomorrow:**
Final polish pass, update all markdown files to reflect current state, submit.

---

## Day 7 — 2025-05-14
**Hours worked:** 3
**What I did:**
Final polish pass — updated README with correct live URL and Decisions section, added `.env.local.example`, verified all 14 tests pass, confirmed CI is green, ran full end-to-end flow on production URL. Checked Lighthouse scores on deployed URL. Updated DEVLOG to 7 entries. Final git push to both repos.

**What I learned:**
The assignment is as much about documentation and thinking as it is about code. The GTM, ECONOMICS, and USER_INTERVIEWS files took as long to write well as the audit engine itself. That's intentional — Credex is evaluating founder thinking, not just coding ability.

**Blockers / what I'm stuck on:**
Nothing. Product is shippable.

**Plan for tomorrow:**
Submit. Monitor production for any issues in the first 24 hours.
