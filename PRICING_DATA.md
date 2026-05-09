# Pricing Data

All pricing data used in the audit engine. Every number is cited with its official source and verification date.

**Last verified:** 2025-05-12

---

## ChatGPT (OpenAI)

**Source:** https://openai.com/chatgpt/pricing/

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | GPT-3.5, limited GPT-4o |
| Plus | $20/user/mo | GPT-4o, DALL-E, Advanced Data Analysis |
| Team | $25/user/mo | Min 2 seats, admin console, higher limits |
| Enterprise | $60/user/mo (est.) | Custom pricing, SSO, audit logs — public estimate |

---

## Claude (Anthropic)

**Source:** https://www.anthropic.com/pricing

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | Claude 3 Haiku, limited usage |
| Pro | $20/user/mo | Claude 3.5 Sonnet, priority access |
| Team | $25/user/mo | Min 5 seats, admin console |
| Enterprise | $50/user/mo (est.) | Custom pricing — public estimate |

---

## Gemini (Google)

**Source:** https://one.google.com/about/plans

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | Gemini 1.5 Flash |
| Advanced | $19.99/user/mo | Gemini 1.5 Pro, 2TB storage (Google One AI Premium) |
| Business | $22/user/mo | Google Workspace add-on |

---

## GitHub Copilot

**Source:** https://github.com/features/copilot#pricing

| Tier | Price | Notes |
|---|---|---|
| Individual | $10/user/mo | Code completion, chat |
| Business | $19/user/mo | Admin console, policy management |
| Enterprise | $39/user/mo | Fine-tuning, SSO, audit logs |

---

## Cursor

**Source:** https://cursor.com/pricing

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | 2,000 completions/mo, 50 slow requests |
| Pro | $20/user/mo | Unlimited completions, 500 fast requests |
| Business | $40/user/mo | Centralized billing, admin, SSO |

---

## Codeium

**Source:** https://codeium.com/pricing

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | Unlimited completions, individual |
| Teams | $12/user/mo | Admin dashboard, usage analytics |
| Enterprise | $25/user/mo (est.) | SSO, on-prem option — estimate |

---

## Notion AI

**Source:** https://www.notion.so/pricing

| Tier | Price | Notes |
|---|---|---|
| AI Add-on | $10/user/mo | Added on top of any Notion plan |

---

## Midjourney

**Source:** https://www.midjourney.com/account

| Tier | Price | Notes |
|---|---|---|
| Basic | $10/mo | 200 images/mo, 3.3 GPU hrs |
| Standard | $30/mo | Unlimited relaxed, 15 fast GPU hrs |
| Pro | $60/mo | Unlimited relaxed, 30 fast GPU hrs, stealth mode |
| Mega | $120/mo | Unlimited relaxed, 60 fast GPU hrs, stealth mode |

Note: Midjourney is per-account, not per-seat.

---

## Grammarly

**Source:** https://www.grammarly.com/plans

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | Basic grammar and spelling |
| Premium | $12/user/mo | Advanced suggestions, tone detection |
| Business | $15/user/mo | Min 3 seats, admin panel, analytics |

---

## Jasper

**Source:** https://www.jasper.ai/pricing

| Tier | Price | Notes |
|---|---|---|
| Creator | $49/user/mo | 1 user, 50+ templates |
| Pro | $69/user/mo | Up to 5 users, brand voice |
| Business | Custom | Unlimited users, API access, SSO |

Note: Business pricing estimated at $99/user/mo based on public reports.

---

## Perplexity

**Source:** https://www.perplexity.ai/pro

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | 5 Pro searches/day |
| Pro | $20/user/mo | 300+ Pro searches/day, file upload, API |

---

## Windsurf (Codeium)

**Source:** https://windsurf.com/pricing

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | Limited completions, basic models |
| Pro | $15/user/mo | Unlimited completions, GPT-4o, Claude 3.5 Sonnet |
| Teams | $30/user/mo | All Pro features, admin console, SSO |

---

## Anthropic API (direct)

**Source:** https://www.anthropic.com/pricing

| Model | Input | Output | Notes |
|---|---|---|---|
| Claude 3 Haiku | $0.25/MTok | $1.25/MTok | Fastest, cheapest |
| Claude 3.5 Sonnet | $3/MTok | $15/MTok | Best balance |
| Claude 3 Opus | $15/MTok | $75/MTok | Most capable |

Note: API pricing is usage-based. Monthly cost depends on volume.

---

## OpenAI API (direct)

**Source:** https://openai.com/api/pricing/

| Model | Input | Output | Notes |
|---|---|---|---|
| GPT-4o | $2.50/MTok | $10/MTok | Latest flagship |
| GPT-4o mini | $0.15/MTok | $0.60/MTok | Fast and cheap |
| o1 | $15/MTok | $60/MTok | Reasoning model |

Note: API pricing is usage-based. Monthly cost depends on volume.

---

## Claude (updated tiers)

**Source:** https://www.anthropic.com/pricing

| Tier | Price | Notes |
|---|---|---|
| Free | $0/user/mo | Claude 3 Haiku, limited usage |
| Pro | $20/user/mo | Claude 3.5 Sonnet, priority access |
| Max | $100/user/mo | 5x more usage than Pro, all models |
| Team | $25/user/mo | Min 5 seats, admin console |
| Enterprise | Custom (~$50/user/mo est.) | SSO, audit logs, custom limits |

---

## Abuse Protection

SpendLens uses a **honeypot field** for bot protection on the lead capture form.

- A hidden `<input type="text" name="website">` is added to the form
- Real users never see or fill it (hidden via CSS)
- Bots that auto-fill forms will populate it
- If the field has any value on submission, the request is silently dropped

**Why honeypot over rate limiting or hCaptcha:**
- No user friction (hCaptcha adds ~3s and accessibility issues)
- No infrastructure dependency (rate limiting needs Redis/KV)
- Catches the vast majority of automated submissions at MVP scale
- Can add rate limiting later if honeypot proves insufficient

---



1. All prices are monthly, billed monthly (not annual discount)
2. Per-seat prices are per active user
3. "Enterprise" prices marked as estimates are based on public reports, analyst estimates, or the lower bound of known ranges
4. Prices are in USD
5. Prices change frequently — this file should be re-verified quarterly
