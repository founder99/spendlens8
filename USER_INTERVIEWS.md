# User Interviews

Conducted 3 interviews with people who manage or pay for AI tools at their companies. Interviews were 20-30 minutes each, done over video call. Participants were shown a working prototype and asked to complete an audit of their real tool stack.

---

## Interview 1

**Profile:** CTO at a 35-person B2B SaaS startup. Manages a team of 12 engineers.  
**AI tools they use:** GitHub Copilot (Business, 12 seats), ChatGPT Team (8 seats), Notion AI (add-on, 20 seats), Perplexity Pro (3 seats)  
**Monthly AI spend:** ~$680/month

### What they said

> "I approved all of these tools individually over 18 months. I've never looked at them together in one place. Seeing $680/month written out is kind of shocking."

> "The Notion AI thing is interesting — we pay for it for 20 people but I genuinely don't know who uses it. I just added it when we upgraded our Notion plan."

> "The GitHub Copilot recommendation to check utilization is right. We had 3 people leave in Q1 and I never removed their seats."

### What they did after the audit

Removed 3 unused Copilot seats ($57/month savings). Said they'd "look into" the Notion AI usage but hadn't acted on it yet.

### Surprising insight

They didn't know Perplexity had a free tier. They were paying $60/month for 3 Pro seats for people who "just use it for quick searches." Switched 2 of the 3 to free.

### How it changed the product

Added the "solo on team plan" rule specifically because of this interview — the pattern of paying for team features when individual plans would suffice came up repeatedly.

---

## Interview 2

**Profile:** Founder of a 4-person indie SaaS. Solo developer, one designer, two part-time contractors.  
**AI tools they use:** ChatGPT Plus (1 seat), Cursor Pro (1 seat), Midjourney Pro (1 seat), Grammarly Premium (1 seat)  
**Monthly AI spend:** ~$112/month

### What they said

> "I feel like I'm paying for four different things that all kind of do the same thing. Like, ChatGPT and Cursor both have chat. Do I need both?"

> "Midjourney Pro — I upgraded to Pro for the stealth mode but I don't actually care about stealth mode. I just wanted more fast hours."

> "Grammarly is the one I'm least sure about. I use it but I don't know if it's worth $12/month when ChatGPT can proofread."

### What they did after the audit

Downgraded Midjourney from Pro ($60) to Standard ($30). Said they'd "think about" canceling Grammarly.

### Surprising insight

The overlap between tools was the most valuable insight for this user — not the savings amount. They wanted to know "which tools are redundant" more than "how much can I save." This is a feature gap in the current product.

### How it changed the product

Added "use case" as a field in the audit form. If two tools have the same use case, the engine should flag the overlap. Not yet implemented — on the Week 2 roadmap.

---

## Interview 3

**Profile:** Head of Engineering at a 90-person company. Manages 25 engineers across 3 teams.  
**AI tools they use:** GitHub Copilot Enterprise (25 seats), ChatGPT Enterprise (~30 seats), Claude Team (10 seats), Jasper Pro (5 seats, marketing team)  
**Monthly AI spend:** ~$3,200/month

### What they said

> "We have both ChatGPT Enterprise and Claude Team. That happened because two different teams bought them independently. Nobody consolidated."

> "The Jasper thing is interesting — marketing bought it before ChatGPT was good at writing. I'm not sure they still need it."

> "I would use this to build a case for our CFO. If I can show $400/month in savings with specific recommendations, that's a 30-minute meeting instead of a 2-hour debate."

### What they did after the audit

Committed to reviewing the Claude Team subscription at the next quarterly planning meeting. Said the shareable URL feature was "exactly what I need" to send to the CFO.

### Surprising insight

The shareable URL was the most-mentioned feature across all three interviews. People don't just want the audit for themselves — they need to share it with someone who controls the budget. This validated the decision to make public audit pages a core feature, not an afterthought.

### How it changed the product

Made the share section more prominent on the results page. Added the "Public Audit Report" badge on the `/audit/[id]` page to make it clear this is a shareable artifact, not just a URL.

---

## Cross-interview themes

1. **Nobody has looked at their AI tools as a portfolio** — they approved tools one at a time and never audited the total
2. **Unused seats are universal** — every interview surfaced at least one tool with seats that weren't being used
3. **The shareable URL is the killer feature** — people need to show this to someone else, not just see it themselves
4. **Overlap detection is a gap** — users want to know which tools are redundant, not just which are overpriced
