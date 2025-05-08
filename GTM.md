# Go-To-Market Strategy

## Target users

**Primary:** Engineering leads and CTOs at 10-200 person startups who own the AI tool budget but don't have time to audit it manually.

**Secondary:** Ops/finance people at the same companies who get handed a $3k/month AI bill and need to justify or cut it.

**Why this segment:**
- They feel the pain acutely — AI tool sprawl happened fast and nobody audited it
- They have budget authority — they can act on recommendations immediately
- They share tools — a CTO who saves $400/month will tweet about it

---

## Where they hang out

- **Twitter/X** — engineering Twitter, indie hacker community, startup founders
- **Hacker News** — Show HN posts get real feedback from exactly this audience
- **Linear/Notion/Vercel Discord servers** — people already paying for these tools
- **r/SaaS, r/startups** — founders discussing costs
- **Slack communities** — Indie Hackers, Online Geniuses, Ramen Club

---

## First 100 users

### Week 1: Launch on Hacker News

Post a "Show HN: I built a free tool to audit your AI tool spend" with:
- The live URL
- A real example audit showing $340/month in savings
- Honest explanation of how the engine works

HN is the highest-leverage single channel for this audience. A front-page Show HN can drive 500-2000 visitors in 24 hours.

### Week 1-2: Twitter thread

Thread format: "I audited 10 common AI tool stacks. Here's what I found:"
- Show real savings examples per tool category
- End with the free audit link
- Tag relevant accounts (Levels.fyi, Pragmatic Engineer, etc.)

### Week 2: Cold outreach to 20 CTOs

Find CTOs at 20-100 person startups on LinkedIn. Message:
> "Hey — I built a free tool that audits AI tool spend. Ran it on a few stacks and found $200-500/month in savings on average. Would you try it and tell me if the recommendations make sense for your team?"

This is not spam — it's a genuine ask for feedback with a free tool. Response rate should be 15-25%.

### Week 3: Product Hunt launch

Coordinate upvotes from the HN/Twitter audience. Product Hunt drives a different audience (product managers, early adopters) and generates backlinks.

### Ongoing: SEO

Target long-tail keywords:
- "github copilot vs cursor cost"
- "chatgpt team plan worth it"
- "how much does AI tooling cost per developer"

Each tool comparison page can rank for these queries and funnel to the audit.

---

## Growth strategy

**Viral loop:** Every audit generates a shareable `/audit/[id]` URL. When a CTO shares their audit with their CFO or team, those people see the SpendLens branding and CTA. This is the primary organic growth mechanism.

**Content:** Publish monthly "State of AI Tool Spend" reports using anonymized aggregate data from audits. This generates press coverage and backlinks.

**Integrations:** Build a Slack bot that runs a quick audit from `/spendlens audit`. Slack is where budget conversations happen.

**Referral:** "Share your audit and get a detailed breakdown of your team's spend vs industry benchmarks." Incentivizes sharing without a cash referral program.

---

## What I am NOT doing

- **Paid ads** — too early, CAC would be too high before product-market fit
- **Cold email blasts** — damages domain reputation, low quality leads
- **Enterprise sales** — wrong motion for an MVP; self-serve first
