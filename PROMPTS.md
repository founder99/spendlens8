# Prompts

## AI summary prompt

Used in `lib/ai/summary.ts` to generate the executive summary shown on the results page.

### Exact prompt

```
You are an AI spend analyst. Write a concise, professional 3-sentence audit summary for a SaaS team.

Audit data:
- Total monthly spend: $${audit.totalMonthlySpend}
- Potential monthly savings: $${audit.totalMonthlySavings}
- Potential annual savings: $${savings}

Per-tool breakdown:
${tools}

Write a helpful, specific summary. Be direct. No fluff. No bullet points. Plain paragraph only.
```

### Why written this way

- **"3-sentence"** — constrains length. Without this, models write 5-8 sentences and the card becomes too tall.
- **"Plain paragraph only"** — models default to bullet points. The UI already has a structured breakdown; the summary should feel like a human analyst wrote it.
- **"Be direct. No fluff."** — prevents filler phrases like "Great news! Your audit is complete."
- **Including the per-tool breakdown** — without this, the summary is generic. With it, the model references specific tools by name.
- **"professional"** — shifts tone away from casual/enthusiastic toward analyst/consultant register.

### What failed

**First attempt (too vague):**
```
Summarize this AI spend audit in a few sentences.
```
Result: Generic output like "Your team is spending money on AI tools. There are opportunities to save." Useless.

**Second attempt (too long):**
```
Write an executive summary of this AI spend audit for a CTO.
```
Result: 6-8 sentences, often with headers. Too long for the card.

**Third attempt (current):** Works well. Produces 2-4 sentences, specific to the actual tools and numbers.

### Hallucinations caught

1. **Model invented savings numbers** — in early testing without the per-tool breakdown in the prompt, the model would say "you could save $X" where X was not from the actual audit data. Fixed by including the exact numbers in the prompt.

2. **Model suggested tools that don't exist** — when asked to suggest alternatives without the pricing data context, it invented tool names. Fixed by keeping alternative suggestions in the deterministic rule engine, not the LLM.

---

## Model selection

- **Primary:** `claude-3-haiku-20240307` — fast, cheap, good enough for 3-sentence summaries
- **Fallback:** `gpt-4o-mini` — similar cost profile, good quality
- **Why not Claude 3.5 Sonnet or GPT-4o?** — overkill for a 3-sentence summary. Haiku/mini are 10x cheaper and 2x faster with no meaningful quality difference for this task.

---

## Fallback template

When no AI API key is configured or all providers fail:

```typescript
if (audit.totalMonthlySavings === 0) {
  return `Your AI tool stack looks well-optimized. You're spending $${audit.totalMonthlySpend}/month 
  across ${audit.toolResults.length} tools with no significant waste detected. 
  Keep reviewing quarterly as pricing changes.`;
}
return `Based on your current AI tool usage, you could save up to $${audit.totalMonthlySavings}/month 
($${audit.totalAnnualSavings}/year) by acting on the recommendations below. 
The biggest opportunities are in right-sizing plans and eliminating unused seats. 
Reviewing your subscriptions quarterly will help you stay ahead of cost creep.`;
```

This is deterministic, always accurate, and indistinguishable from a mediocre LLM response.
