# Reflection

## 1. Hardest bug

The hardest bug was the `@base-ui/react` Select component rendering garbled text (`1 2 rem #`) in the plan dropdown for Tool #2.

The root cause was subtle: when a new tool row is appended with `tool: ""`, the plan Select receives `value=""`. Base-UI's Select treats empty string as a valid value — it searches for a matching `SelectItem`, finds none, and renders the raw internal state of the trigger element (which includes CSS class fragments and aria attributes).

The fix was passing `value={planValue || undefined}` — converting empty string to `undefined` so base-ui treats it as "nothing selected" and renders the placeholder correctly.

This took about 45 minutes to debug because the error message ("1 2 rem #") gave no indication of the actual cause. I had to read the base-ui Select source code to understand how it handles unmatched values.

**Lesson:** When using a UI library you haven't used before, read the source for controlled component behavior before assuming it works like Radix or MUI.

---

## 2. A decision I reversed

Initially I built the results page as a fully client-side component — it would fetch the audit data from Supabase in a `useEffect` after mount. This caused a flash of empty content and made the lead modal appear before any data was visible.

I reversed this and made `ResultsPage` a React Server Component that fetches the audit on the server. The per-tool breakdown and stats render immediately with no loading state. Only the interactive parts (lead modal, AI summary, share button) are in `ResultsClient`.

This is the correct architecture for Next.js App Router — server components for data fetching, client components only for interactivity. The reversal improved both performance and UX significantly.

---

## 3. Week 2 roadmap

If I had another week:

1. **Email verification** — confirm the email is real before showing the full report. Reduces fake leads.
2. **Pricing data freshness** — add a `last_verified` date to each pricing tier and a script to flag stale data. Pricing changes frequently.
3. **Team comparison** — "your team spends 3x the industry average on coding tools." Requires aggregate data across audits.
4. **CSV export** — let users download their audit as a spreadsheet to share with finance teams.
5. **Webhook to Slack** — notify a Slack channel when a new lead is captured. Useful for early sales outreach.
6. **More tools** — Notion, Linear, Figma, Loom, Zoom AI, Microsoft Copilot. The pricing data layer makes this a 10-minute addition per tool.

---

## 4. How I used AI

I used Claude (Anthropic) as a coding assistant throughout this project. Specifically:

- **Scaffolding** — generated the initial folder structure and type definitions, which I then reviewed and modified
- **Debugging** — described the base-ui Select bug and got the correct diagnosis on the second attempt (first attempt suggested the wrong fix)
- **Documentation** — drafted sections of the markdown files which I then rewrote to be accurate and specific

What I did NOT use AI for:
- The audit engine rules — these required product thinking about what "overkill" actually means for each tool category
- The pricing data — manually verified against each tool's pricing page
- Architecture decisions — these came from experience with Next.js and Supabase

**Hallucinations caught:**
- Claude initially suggested `onInteractOutside` as a prop for the base-ui Dialog to prevent closing. This prop doesn't exist in base-ui — it's a Radix UI API. Fixed by reading the actual Dialog source.
- Claude suggested `asChild` for base-ui Button. Also Radix-only. Base-ui uses `render` prop instead.

---

## 5. Self-rating

**Discipline: 7/10** — Commits are spread across 6 distinct days with meaningful messages. I didn't start on day 1 (spent day 1 reading the spec carefully and planning), which cost me a day of buffer. The DEVLOG entries are honest and specific, not padded.

**Code quality: 8/10** — Zero TypeScript `any` types. All business logic is isolated in `lib/` with no React dependencies. The audit engine is fully unit-tested with 14 tests. The one weakness is the `useWatch` + `useEffect` pattern for localStorage persistence — it works but is more complex than it should be. A cleaner solution would use a custom `useFormPersist` hook.

**Design sense: 6/10** — The UI is clean and functional but not exceptional. It follows the Stripe/Linear aesthetic (minimal, good spacing, readable typography) but lacks the polish of a product that's been iterated on with real user feedback. The results page in particular could be more visually striking — the savings numbers should feel more celebratory.

**Problem-solving: 8/10** — Debugged several non-obvious issues: the base-ui Select garbled text bug, the Vercel serverless function termination killing fire-and-forget emails, the hydration mismatch from `typeof window` checks. Each was solved by reading source code and understanding root causes rather than applying workarounds.

**Entrepreneurial thinking: 7/10** — The GTM strategy is specific and realistic. The ECONOMICS math is honest about rough estimates. The user interviews surfaced a genuine insight (shareable URL is the killer feature, not the savings number). The Credex integration is well-motivated. What's missing: I haven't actually posted this anywhere or gotten real traction data, which would sharpen all of these estimates significantly.
