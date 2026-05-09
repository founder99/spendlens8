# SpendLens — AI Spend Auditor

> Free AI tool spend auditor for startup founders and engineering managers. Find unused seats, overkill plans, and cheaper alternatives in 2 minutes.

**Live demo:** [spendlens8.vercel.app](https://spendlens8.vercel.app)

**GitHub:** [github.com/rishavjha006/spendlens](https://github.com/rishavjha006/spendlens)

---

## What it does

SpendLens audits your AI tool stack and surfaces:

- **Overkill plans** — paying for Enterprise when Pro covers your needs
- **Unused seats** — licenses nobody is using
- **Cheaper alternatives** — tools that do the same job for less
- **Exact savings** — monthly and annual dollar amounts per tool
- **Credex consultation** — for audits showing >$500/mo savings, surfaces Credex discounted credits

After the audit:
- An LLM generates a plain-English executive summary
- Results stored with a permanent shareable URL (`/audit/[id]`)
- Lead info captured via email gate (shown after value, never before)
- Report link emailed to the user

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router | Server Actions, RSC, zero-config Vercel deploy |
| Language | TypeScript (strict) | Type safety across engine + UI, no `any` |
| Styling | Tailwind CSS + shadcn/ui | Fast, accessible, consistent |
| Database | Supabase (Postgres) | Instant REST API, RLS, free tier |
| Email | Nodemailer SMTP | Free, sends to any address |
| AI | Anthropic → OpenAI → fallback | Pluggable, graceful degradation |
| Validation | Zod + React Hook Form | End-to-end type-safe forms |
| Testing | Vitest | Fast, ESM-native, 14 tests |
| Deployment | Vercel | Zero-config Next.js |

---

## Quick start

```bash
git clone https://github.com/rishavjha006/spendlens
cd spendlens
npm install
cp .env.local.example .env.local
# Fill in .env.local with your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=optional_for_ai_summaries
OPENAI_API_KEY=optional_fallback
NEXT_PUBLIC_APP_URL=https://spendlens8.vercel.app
```

### Supabase setup

Run `lib/db/schema.sql` in your Supabase SQL editor once.

---

## Running tests

```bash
npm run test:run   # single run
npm run test       # watch mode
```

14 tests — audit engine rules, savings calculations, edge cases.

---

## Deployment

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variables
4. Deploy — done in ~2 minutes

---

## Decisions

Five key trade-offs made during the build:

1. **Rule-based engine over LLM for audit math** — Deterministic rules are testable, reproducible, and trustworthy. A finance person can audit the logic. LLMs hallucinate numbers. AI is used only for the narrative summary where creativity is appropriate.

2. **Supabase over Prisma + raw Postgres** — No ORM overhead for an MVP with one table. The `@supabase/supabase-js` client is typed, works on server and client, and the free tier is generous. Prisma adds migration complexity with no benefit at this scale.

3. **Email gate after value, not before** — Showing the audit results first (blurred) then asking for email converts better and is more honest. Users who see their savings number are motivated to unlock. Gating before showing value kills conversion.

4. **Nodemailer for transactional email** — Simple SMTP integration that sends to any address with no domain verification required. Trade-off: has daily send limits which would need upgrading at scale, but sufficient for MVP.

5. **`useWatch` over `form.watch()` inside render** — React Compiler flags `form.watch()` as incompatible with memoization. Extracting each tool row into a `ToolRow` component using `useWatch` fixes the lint warning and improves render performance by isolating re-renders per row.

---

## Project structure

```
app/
  audit/[id]/         Public shareable audit page (OG metadata)
  results/[id]/       Private results page (lead-gated)
  api/audit/          REST endpoint
  api/summary/        Regenerate AI summary
features/
  audit/              Multi-tool audit form
  results/            Savings chart
  lead-capture/       Lead modal with honeypot
lib/
  audit-engine/       Rule-based engine (5 rules, extensible)
  ai/                 Anthropic → OpenAI → fallback chain
  db/                 Supabase queries
  email/              Gmail SMTP sender
  pricing/            Tool pricing data (10 tools, cited sources)
types/                Shared TypeScript types
tests/                14 Vitest tests
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for full system design.
