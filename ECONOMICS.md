# Economics

## Current state (free tool, lead gen)

SpendLens is currently free. The business model is lead generation — capture emails of people with AI budget authority, then convert to a paid product.

---

## Monetization path

### Option A: Freemium SaaS

| Tier | Price | What you get |
|---|---|---|
| Free | $0 | Audit up to 3 tools, basic recommendations |
| Pro | $29/mo | Unlimited tools, CSV export, team comparison, quarterly re-audit reminders |
| Team | $99/mo | Up to 10 team members, Slack integration, custom pricing rules |

### Option B: One-time audit report

$49 for a detailed PDF report with implementation checklist. No subscription friction.

### Option C: B2B consulting upsell

Free tool → capture lead → sales call → $500-2000 one-time "AI stack optimization" consulting engagement. High margin, no product complexity.

**Most likely path:** Start with Option B (lowest friction), add Option A once there's evidence of repeat usage.

---

## Unit economics (Pro tier, $29/mo)

### Customer Acquisition Cost (CAC)

| Channel | Cost per visitor | Conversion to audit | Conversion to paid | CAC |
|---|---|---|---|---|
| Hacker News (organic) | ~$0 | 40% | 3% | ~$0 |
| Twitter (organic) | ~$0 | 25% | 2% | ~$0 |
| Google Ads (future) | $2-4/click | 30% | 2% | $333-667 |

At organic channels only, CAC is effectively $0 (time cost only). This is the right phase to be in.

### Lifetime Value (LTV)

Assumptions:
- Average subscription: 8 months (churn ~12%/mo for a tool people use quarterly)
- Price: $29/mo
- LTV = $29 × 8 = **$232**

At $0 CAC (organic), LTV:CAC ratio is effectively infinite. Even at $50 CAC (light paid), LTV:CAC = 4.6x — healthy.

### Revenue math

| Monthly audits | Lead capture rate | Free→Paid conversion | MRR |
|---|---|---|---|
| 100 | 60% | 5% | $87 |
| 500 | 60% | 5% | $435 |
| 2,000 | 60% | 5% | $1,740 |
| 10,000 | 60% | 5% | $8,700 |

At 10,000 audits/month (achievable with a front-page HN post + sustained SEO), MRR = $8,700.

### Infrastructure costs at scale

| Scale | Supabase | Vercel | Resend | Anthropic API | Total |
|---|---|---|---|---|---|
| 0-500 audits/mo | $0 | $0 | $0 | ~$2 | ~$2 |
| 500-5k audits/mo | $25 | $20 | $0 | ~$20 | ~$65 |
| 5k-50k audits/mo | $25 | $20 | $20 | ~$200 | ~$265 |

Gross margin at 5k-50k audits/mo with $8,700 MRR: **($8,700 - $265) / $8,700 = 97%**

---

## Profitability threshold

Break-even on $0 infrastructure (free tiers): **1 paying customer**

Break-even on $265/mo infrastructure: **10 paying customers at $29/mo**

This is an extremely capital-efficient business. The main cost is founder time.

---

## Risks

1. **Pricing data goes stale** — if tool prices change and we don't update, recommendations become wrong and trust erodes. Mitigation: quarterly verification script + community contributions.

2. **Low repeat usage** — people audit once and never return. Mitigation: quarterly re-audit email reminders, "your stack has changed" notifications.

3. **Tools build this natively** — if Notion or GitHub adds a "cost optimizer" feature, our value prop weakens. Mitigation: expand to cross-tool optimization, which no single vendor can do.
