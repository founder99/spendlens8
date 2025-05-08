# SpendLens — AI Spend Auditor

> Find out exactly how much your team is overpaying for AI tools. Get a free, personalized audit in 2 minutes.

**Live demo:** [spendlens.vercel.app](https://spendlens.vercel.app)

---

## What it does

SpendLens audits your AI tool stack and surfaces:

- **Overkill plans** — paying for Enterprise when Pro covers your needs
- **Unused seats** — licenses nobody is using
- **Cheaper alternatives** — tools that do the same job for less
- **Exact savings** — monthly and annual dollar amounts per tool

After the audit:
- An LLM generates a plain-English executive summary
- Results are stored with a permanent shareable URL (`/audit/[id]`)
- Lead info (email, company, role) is captured and a report link is emailed

---

## Screenshots

| Landing | Audit Form | Results |
|---|---|---|
| ![Landing](public/screenshots/landing.png) | ![Form](public/screenshots/form.png) | ![Results](public/screenshots/results.png) |

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router | Server Actions, RSC, file-based routing |
| Language | TypeScript (strict) | Type safety across engine + UI |
| Styling | Tailwind CSS + shadcn/ui | Fast, consistent, accessible |
| Database | Supabase (Postgres) | Instant REST API, RLS, free tier |
| Email | Resend | Simple API, 3k free emails/mo |
| AI | Anthropic / OpenAI | Pluggable abstraction, fallback template |
| Validation | Zod + React Hook Form | End-to-end type-safe forms |
| Testing | Vitest | Fast, ESM-native |
| Deployment | Vercel | Zero-config Next.js |

---

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/spendlens
cd spendlens
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_key        # optional
OPENAI_API_KEY=your_openai_key              # optional
RESEND_API_KEY=your_resend_key              # optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

At least one AI key is needed for AI summaries. If neither is set, a deterministic fallback template is used.

### 3. Set up Supabase

Run `lib/db/schema.sql` in your Supabase SQL editor:

```sql
-- Creates the audits table with RLS policies
-- See lib/db/schema.sql for full migration
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Running tests

```bash
npm run test:run     # single run
npm run test         # watch mode
```

14 tests covering the audit engine — savings calculations, rule evaluation, edge cases.

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.local`
4. Deploy

---

## Project structure

```
app/                    # Next.js App Router pages
  audit/[id]/           # Public shareable audit page
  results/[id]/         # Private results page (lead-gated)
  api/audit/            # REST endpoint (wraps server action)
  api/summary/          # Regenerate AI summary endpoint
components/ui/          # shadcn/ui components
features/
  audit/                # Audit form components
  results/              # Savings chart
  lead-capture/         # Lead modal
lib/
  audit-engine/         # Rule-based audit logic (engine + rules)
  ai/                   # LLM abstraction (Anthropic / OpenAI / fallback)
  db/                   # Supabase queries
  email/                # Resend email sender
  pricing/              # Tool pricing data
  utils/                # Zod schemas, localStorage hook
types/                  # Shared TypeScript types
tests/                  # Vitest test suite
```

---

## Architecture decisions

See [ARCHITECTURE.md](ARCHITECTURE.md) for full reasoning.
