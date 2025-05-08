import type { AuditResult } from "@/types";

function buildPrompt(audit: AuditResult): string {
  const savings = audit.totalAnnualSavings;
  const tools = audit.toolResults
    .map((r) => {
      const recs = r.recommendations.map((rec) => `- ${rec.title}: ${rec.description}`).join("\n");
      return `Tool: ${r.tool} (${r.plan}) — $${r.currentMonthlySpend}/mo\n${recs || "- Already optimized"}`;
    })
    .join("\n\n");

  return `You are an AI spend analyst. Write a concise, professional 3-sentence audit summary for a SaaS team.

Audit data:
- Total monthly spend: $${audit.totalMonthlySpend}
- Potential monthly savings: $${audit.totalMonthlySavings}
- Potential annual savings: $${savings}

Per-tool breakdown:
${tools}

Write a helpful, specific summary. Be direct. No fluff. No bullet points. Plain paragraph only.`;
}

function fallbackSummary(audit: AuditResult): string {
  if (audit.totalMonthlySavings === 0) {
    return `Your AI tool stack looks well-optimized. You're spending $${audit.totalMonthlySpend}/month across ${audit.toolResults.length} tool${audit.toolResults.length !== 1 ? "s" : ""} with no significant waste detected. Keep reviewing quarterly as pricing changes.`;
  }
  return `Based on your current AI tool usage, you could save up to $${audit.totalMonthlySavings}/month ($${audit.totalAnnualSavings}/year) by acting on the recommendations below. The biggest opportunities are in right-sizing plans and eliminating unused seats. Reviewing your subscriptions quarterly will help you stay ahead of cost creep.`;
}

async function generateWithAnthropic(prompt: string): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 256,
    messages: [{ role: "user", content: prompt }],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text.trim();
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 256,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response");
  return content.trim();
}

export async function generateAuditSummary(audit: AuditResult): Promise<string> {
  const prompt = buildPrompt(audit);
  const timeout = 8000;

  const withTimeout = <T>(promise: Promise<T>): Promise<T> =>
    Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      ),
    ]);

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return await withTimeout(generateWithAnthropic(prompt));
    } catch {
      // fall through to next provider
    }
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      return await withTimeout(generateWithOpenAI(prompt));
    } catch {
      // fall through to fallback
    }
  }

  return fallbackSummary(audit);
}
