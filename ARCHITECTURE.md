# Architecture

## Overview

SpendLens is a Next.js 15 App Router application with a rule-based audit engine, pluggable AI layer, Supabase persistence, and Resend email delivery.

---

## Data flow

```mermaid
graph TD
    A[User fills audit form] --> B[localStorage draft saved]
    B --> C[submitAudit server action]
    C --> D[Zod validation]
    D --> E[Audit Engine runs rules]
    E --> F[saveAudit to Supabase]
    E --> G[generateAuditSummary LLM]
    F --> H[Redirect to /results/id]
    G --> I[updateAuditSummary in Supabase]
    H --> J[ResultsPage fetches audit]
    J --> K[LeadModal shown]
    K --> L[captureLead server action]
    L --> M[updateAuditLead in Supabase]
    L --> N[sendAuditReportEmail via Resend]
    J --> O[/audit/id shareable public page]
```

---

## Key decisions

### Why Next.js 15 App Router

- Server Actions eliminate the need for a separate API layer for form submissions
- React Server Components let the results page fetch from Supabase on the server — no client-side loading states for the main content
- File-based routing makes `/audit/[id]` and `/results/[id]` trivial
- Vercel deployment is zero-config

### Why Supabase over Prisma + raw Postgres

- No ORM overhead for an MVP with one table
- Built-in REST API, Row Level Security, and a generous free tier
- The `@supabase/supabase-js` client is typed and works identically on server and client
- Can add auth, realtime, and storage later without changing the stack

### Why a rule-based audit engine (not AI)

The audit calculations are deterministic and must be trustworthy. Using an LLM for savings math would produce inconsistent, hallucinated numbers. The rule engine:
- Is fully testable (14 unit tests)
- Produces reproducible results
- Is easy to extend — add a new `AuditRule` object to `rules.ts`
- AI is used only for the narrative summary, where creativity is appropriate

### Why a pluggable AI abstraction

`lib/ai/summary.ts` tries Anthropic first, then OpenAI, then falls back to a deterministic template. This means:
- The app works with zero AI keys configured
- Switching providers requires changing one file
- Quota errors and timeouts are handled gracefully

### Why Resend over Nodemailer / SendGrid

- Single API call, no SMTP configuration
- 3,000 free emails/month covers early traction
- React Email compatible for future HTML template upgrades

---

## Folder philosophy

```
lib/          Pure business logic — no React, no HTTP
features/     React feature modules — form, results, lead capture
components/   Reusable UI primitives (shadcn wrappers)
app/          Routing, pages, server actions
types/        Shared TypeScript interfaces
tests/        Vitest unit tests
```

The audit engine (`lib/audit-engine/`) has zero dependencies on React or Next.js. It can be extracted to a standalone package or run in a worker without changes.

---

## Scaling thoughts

**Current:** Single Supabase table, server-rendered pages, no caching.

**At 10k audits/month:**
- Add `created_at` index for analytics queries
- Cache public `/audit/[id]` pages with `revalidate` — they never change
- Move AI summary generation to a background job (Supabase Edge Function or Vercel background function) to avoid blocking the audit response

**At 100k audits/month:**
- Separate the pricing data into a database table so it can be updated without deploys
- Add a `leads` table separate from `audits` for CRM integration
- Add Posthog or Mixpanel for funnel analytics

**The audit engine scales horizontally by design** — it's pure functions with no I/O.
