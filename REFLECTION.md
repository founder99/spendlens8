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

**Overall: 7.5/10**

Strong:
- Audit engine is genuinely useful and well-tested
- Architecture is clean and maintainable
- TypeScript is strict throughout — zero `any` types
- The shareable URL feature is a real product differentiator

Could be better:
- Pricing data covers only 10 tools — needs 30+ to be truly useful
- No analytics instrumentation — can't measure funnel conversion
- The AI summary is good but not great — a more specific prompt with tool-level context would improve it
- Mobile layout on the results page is functional but not polished enough for a public launch
