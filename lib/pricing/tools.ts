export type PricingTier = {
  name: string;
  monthlyPricePerSeat: number;
  includedSeats: number;
  flatMonthlyPrice?: number;
  features: string[];
};

export type ToolPricing = {
  id: string;
  displayName: string;
  category: string;
  tiers: Record<string, PricingTier>;
  alternatives?: string[];
};

export const TOOL_PRICING: Record<string, ToolPricing> = {
  chatgpt: {
    id: "chatgpt",
    displayName: "ChatGPT",
    category: "general",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["GPT-3.5"] },
      plus: { name: "Plus", monthlyPricePerSeat: 20, includedSeats: 1, features: ["GPT-4o", "DALL-E"] },
      team: { name: "Team", monthlyPricePerSeat: 25, includedSeats: 2, features: ["GPT-4o", "Admin console"] },
      enterprise: { name: "Enterprise", monthlyPricePerSeat: 60, includedSeats: 1, features: ["GPT-4o", "SSO", "Advanced admin"] },
    },
    alternatives: ["claude", "gemini"],
  },
  claude: {
    id: "claude",
    displayName: "Claude",
    category: "general",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["Claude 3 Haiku"] },
      pro: { name: "Pro", monthlyPricePerSeat: 20, includedSeats: 1, features: ["Claude 3.5 Sonnet", "Priority access"] },
      max: { name: "Max", monthlyPricePerSeat: 100, includedSeats: 1, features: ["5x more usage than Pro", "Claude 3.5 Sonnet", "Claude 3 Opus"] },
      team: { name: "Team", monthlyPricePerSeat: 25, includedSeats: 5, features: ["Claude 3.5 Sonnet", "Admin console"] },
      enterprise: { name: "Enterprise", monthlyPricePerSeat: 50, includedSeats: 1, features: ["All models", "SSO", "Audit logs"] },
    },
    alternatives: ["chatgpt", "gemini"],
  },
  gemini: {
    id: "gemini",
    displayName: "Gemini",
    category: "general",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["Gemini 1.5 Flash"] },
      advanced: { name: "Advanced", monthlyPricePerSeat: 19.99, includedSeats: 1, features: ["Gemini 1.5 Pro", "2TB storage"] },
      business: { name: "Business", monthlyPricePerSeat: 22, includedSeats: 1, features: ["Gemini 1.5 Pro", "Admin console"] },
    },
    alternatives: ["chatgpt", "claude"],
  },
  github_copilot: {
    id: "github_copilot",
    displayName: "GitHub Copilot",
    category: "coding",
    tiers: {
      individual: { name: "Individual", monthlyPricePerSeat: 10, includedSeats: 1, features: ["Code completion", "Chat"] },
      business: { name: "Business", monthlyPricePerSeat: 19, includedSeats: 1, features: ["Code completion", "Chat", "Admin"] },
      enterprise: { name: "Enterprise", monthlyPricePerSeat: 39, includedSeats: 1, features: ["All features", "Fine-tuning", "SSO"] },
    },
    alternatives: ["cursor", "codeium"],
  },
  cursor: {
    id: "cursor",
    displayName: "Cursor",
    category: "coding",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["2000 completions/mo"] },
      pro: { name: "Pro", monthlyPricePerSeat: 20, includedSeats: 1, features: ["Unlimited completions", "GPT-4"] },
      business: { name: "Business", monthlyPricePerSeat: 40, includedSeats: 1, features: ["All Pro features", "Admin", "SSO"] },
    },
    alternatives: ["github_copilot", "codeium"],
  },
  codeium: {
    id: "codeium",
    displayName: "Codeium",
    category: "coding",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["Unlimited completions"] },
      teams: { name: "Teams", monthlyPricePerSeat: 12, includedSeats: 1, features: ["Unlimited completions", "Admin"] },
      enterprise: { name: "Enterprise", monthlyPricePerSeat: 25, includedSeats: 1, features: ["All features", "SSO", "On-prem"] },
    },
    alternatives: ["github_copilot", "cursor"],
  },
  notion_ai: {
    id: "notion_ai",
    displayName: "Notion AI",
    category: "writing",
    tiers: {
      add_on: { name: "AI Add-on", monthlyPricePerSeat: 10, includedSeats: 1, features: ["AI writing", "Summarize", "Translate"] },
    },
    alternatives: ["coda_ai", "craft"],
  },
  midjourney: {
    id: "midjourney",
    displayName: "Midjourney",
    category: "design",
    tiers: {
      basic: { name: "Basic", flatMonthlyPrice: 10, monthlyPricePerSeat: 10, includedSeats: 1, features: ["200 images/mo"] },
      standard: { name: "Standard", flatMonthlyPrice: 30, monthlyPricePerSeat: 30, includedSeats: 1, features: ["Unlimited relaxed", "15h fast"] },
      pro: { name: "Pro", flatMonthlyPrice: 60, monthlyPricePerSeat: 60, includedSeats: 1, features: ["Unlimited relaxed", "30h fast", "Stealth"] },
      mega: { name: "Mega", flatMonthlyPrice: 120, monthlyPricePerSeat: 120, includedSeats: 1, features: ["Unlimited relaxed", "60h fast", "Stealth"] },
    },
    alternatives: ["dalle", "stable_diffusion"],
  },
  grammarly: {
    id: "grammarly",
    displayName: "Grammarly",
    category: "writing",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["Basic grammar"] },
      premium: { name: "Premium", monthlyPricePerSeat: 12, includedSeats: 1, features: ["Advanced suggestions", "Tone detection"] },
      business: { name: "Business", monthlyPricePerSeat: 15, includedSeats: 3, features: ["All Premium", "Admin", "Analytics"] },
    },
    alternatives: ["notion_ai"],
  },
  jasper: {
    id: "jasper",
    displayName: "Jasper",
    category: "marketing",
    tiers: {
      creator: { name: "Creator", monthlyPricePerSeat: 49, includedSeats: 1, features: ["1 user", "50+ templates"] },
      pro: { name: "Pro", monthlyPricePerSeat: 69, includedSeats: 1, features: ["Up to 5 users", "Brand voice"] },
      business: { name: "Business", monthlyPricePerSeat: 99, includedSeats: 1, features: ["Unlimited users", "API", "SSO"] },
    },
    alternatives: ["chatgpt", "claude"],
  },
  windsurf: {
    id: "windsurf",
    displayName: "Windsurf",
    category: "coding",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["Limited completions"] },
      pro: { name: "Pro", monthlyPricePerSeat: 15, includedSeats: 1, features: ["Unlimited completions", "GPT-4o", "Claude"] },
      teams: { name: "Teams", monthlyPricePerSeat: 30, includedSeats: 1, features: ["All Pro", "Admin console", "SSO"] },
    },
    alternatives: ["cursor", "github_copilot"],
  },
  anthropic_api: {
    id: "anthropic_api",
    displayName: "Anthropic API (direct)",
    category: "general",
    tiers: {
      payg: { name: "Pay-as-you-go", monthlyPricePerSeat: 0, includedSeats: 1, features: ["Claude 3 Haiku $0.25/MTok", "Claude 3.5 Sonnet $3/MTok", "Claude 3 Opus $15/MTok"] },
    },
    alternatives: ["claude", "openai_api"],
  },
  openai_api: {
    id: "openai_api",
    displayName: "OpenAI API (direct)",
    category: "general",
    tiers: {
      payg: { name: "Pay-as-you-go", monthlyPricePerSeat: 0, includedSeats: 1, features: ["GPT-4o $2.50/MTok", "GPT-4o-mini $0.15/MTok", "o1 $15/MTok"] },
    },
    alternatives: ["chatgpt", "anthropic_api"],
  },
  perplexity: {
    id: "perplexity",
    displayName: "Perplexity",
    category: "research",
    tiers: {
      free: { name: "Free", monthlyPricePerSeat: 0, includedSeats: 1, features: ["5 Pro searches/day"] },
      pro: { name: "Pro", monthlyPricePerSeat: 20, includedSeats: 1, features: ["300+ Pro searches/day", "File upload"] },
    },
    alternatives: ["chatgpt", "claude"],
  },
};

export const TOOL_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(TOOL_PRICING).map(([k, v]) => [k, v.displayName])
);

export function getToolPricing(toolId: string): ToolPricing | undefined {
  return TOOL_PRICING[toolId.toLowerCase().replace(/\s+/g, "_")];
}

export function getCheaperTier(
  toolId: string,
  currentTier: string
): { tier: string; pricing: PricingTier } | null {
  const tool = getToolPricing(toolId);
  if (!tool) return null;

  const tiers = Object.entries(tool.tiers);
  const currentIndex = tiers.findIndex(([k]) => k === currentTier);
  if (currentIndex <= 0) return null;

  const [tierKey, tierPricing] = tiers[currentIndex - 1];
  return { tier: tierKey, pricing: tierPricing };
}
