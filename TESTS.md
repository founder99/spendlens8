# Tests

## Running tests

```bash
npm run test:run    # single run, CI mode
npm run test        # watch mode for development
```

**Framework:** Vitest  
**Test file:** `tests/audit-engine.test.ts`  
**Total:** 14 tests, 7 describe blocks

---

## Test coverage

### Overkill plan rule

| Test | What it covers |
|---|---|
| Detects enterprise plan for solo user | `overkillPlanRule` fires when a cheaper tier exists and savings ≥ $5 |
| No downgrade when already on cheapest paid plan | Rule does not fire when no cheaper tier exists |

### Low utilization rule

| Test | What it covers |
|---|---|
| Flags unused seats when utilization < 80% | `lowUtilizationRule` fires when `teamSize / seats < 0.8` |
| Does not flag when seats are fully used | Rule silent when utilization = 100% |
| Does not flag single-seat tools | Rule skips when `seats <= 1` |

### Solo on team plan rule

| Test | What it covers |
|---|---|
| Flags solo user on business plan | `soloOnTeamPlanRule` fires for team/business/enterprise plans with ≤ 2 users |

### Already optimized

| Test | What it covers |
|---|---|
| No recommendations for free plan with 1 seat | `isOptimized = true`, `totalMonthlySavings = 0` |
| Marks tool as optimized when no rules fire | `isOptimized` flag set correctly |

### Savings calculations

| Test | What it covers |
|---|---|
| Annual savings = 12x monthly | Arithmetic correctness of annualization |
| Aggregates savings across multiple tools | `totalMonthlySavings` = sum of all tool savings |
| Never produces negative savings | All `monthlySavings` values ≥ 0 |

### Multiple tools / edge cases

| Test | What it covers |
|---|---|
| Empty tools array | Returns empty results, zero spend, zero savings |
| Unique ID per audit run | `nanoid` generates different IDs each call |

### Cheaper alternative rule

| Test | What it covers |
|---|---|
| Suggests alternatives for high-spend tools | `cheaperAlternativeRule` fires when alternatives exist |

---

## What is NOT tested (and why)

- **UI components** — shadcn/base-ui components are tested by their maintainers; testing them here adds noise without value
- **Supabase queries** — require a live database; covered by integration testing in staging
- **AI summary generation** — non-deterministic; tested manually with real API keys
- **Email sending** — requires Resend API key; verified manually in staging

---

## Adding new tests

Add test cases to `tests/audit-engine.test.ts`. To add a new rule test:

```typescript
it("describes what the rule should do", () => {
  const tools: AuditToolInput[] = [
    { tool: "chatgpt", plan: "enterprise", monthlySpend: 60, seats: 1, teamSize: 1, useCase: "general" },
  ];
  const result = runAudit(tools);
  expect(result.toolResults[0].recommendations.some(r => r.type === "downgrade")).toBe(true);
});
```
