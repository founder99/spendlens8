# Metrics

## North Star metric

**Audits completed per week**

This is the single number that captures whether the product is delivering value. An "audit completed" means the user went through the full flow: filled the form, saw results, and captured their lead info.

Why not "leads captured"? Because leads without completed audits are low quality. Why not "monthly active users"? Because this is a tool people use quarterly, not daily — MAU would be misleading.

---

## Input metrics

These are the levers that drive the North Star:

| Metric | What it measures | Target (month 1) |
|---|---|---|
| Landing page visits | Top of funnel | — |
| Form start rate | % of visitors who start the audit form | > 40% |
| Form completion rate | % who submit after starting | > 70% |
| Lead capture rate | % who enter email after seeing results | > 55% |
| Share rate | % who copy or open the shareable link | > 20% |
| Return rate | % who run a second audit within 90 days | > 15% |

---

## Funnel

```
Landing page visit
    ↓ (target: 40%)
Form started
    ↓ (target: 70%)
Audit submitted
    ↓ (target: 55%)
Lead captured (email entered)
    ↓ (target: 20%)
Report shared
```

At these conversion rates, 1,000 visitors → 400 form starts → 280 audits → 154 leads → 31 shares.

Each share drives ~3 new visitors (based on typical link sharing behavior), creating a viral coefficient of ~0.09. Not viral, but meaningful organic growth.

---

## Instrumentation

Currently: zero instrumentation (MVP).

**Week 2 additions:**

```typescript
// Add to audit form submission
analytics.track('audit_submitted', {
  tool_count: tools.length,
  total_monthly_spend: totalSpend,
});

// Add to results page load
analytics.track('results_viewed', {
  audit_id: auditId,
  total_savings: totalSavings,
  has_ai_summary: !!aiSummary,
});

// Add to lead modal
analytics.track('lead_captured', {
  audit_id: auditId,
  has_company: !!company,
  has_role: !!role,
});

// Add to share button
analytics.track('report_shared', {
  audit_id: auditId,
  method: 'copy' | 'open',
});
```

**Tool:** Posthog (open source, self-hostable, free tier covers early stage)

---

## Pivot thresholds

If after 4 weeks of active distribution:

| Signal | Threshold | Action |
|---|---|---|
| Form completion rate | < 40% | Simplify the form — too many fields |
| Lead capture rate | < 30% | Reconsider the lead gate — maybe show partial results first |
| Average savings found | < $50/mo | Audit engine rules are too conservative — recalibrate |
| Return rate | < 5% | Product has no retention — add re-audit reminders or new value |
| Zero shares | — | Shareable URL is not compelling — redesign the public page |

**Biggest pivot signal:** If 80%+ of audits show $0 in savings, the engine is broken or the audience is wrong. This would require either fixing the rules or targeting a different user segment (e.g., larger teams with more tool sprawl).
