// ============================================================
// REAL PRICING DATA — Last verified: May 2026
// Sources: Official pricing pages + real-time research
// ============================================================

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
  // ──────────────────────────────────────────────────────────
  // GENERAL PURPOSE LLMs
  // ──────────────────────────────────────────────────────────
  chatgpt: {
    id: "chatgpt",
    displayName: "ChatGPT (OpenAI)",
    category: "general",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["GPT-4o mini", "Limited GPT-4o access"],
      },
      plus: {
        name: "Plus — $20/mo",
        monthlyPricePerSeat: 20,
        includedSeats: 1,
        features: ["GPT-4o", "GPT-5.5", "DALL-E 3", "Sora", "Deep Research", "Agent Mode"],
      },
      pro: {
        name: "Pro — $100/mo",
        monthlyPricePerSeat: 100,
        includedSeats: 1,
        features: ["Everything in Plus", "5× usage limits", "GPT-5.5 Pro", "o1 Pro mode"],
      },
      pro200: {
        name: "Pro (Heavy) — $200/mo",
        monthlyPricePerSeat: 200,
        includedSeats: 1,
        features: ["Everything in Pro $100", "20× usage limits", "Larger context window"],
      },
      team: {
        name: "Team — $25/seat/mo",
        monthlyPricePerSeat: 25,
        includedSeats: 2,
        features: ["GPT-4o", "Admin console", "Higher rate limits", "Workspace management"],
      },
      enterprise: {
        name: "Enterprise — custom",
        monthlyPricePerSeat: 60,
        includedSeats: 1,
        features: ["GPT-4o", "SSO", "Advanced admin", "Custom data retention"],
      },
    },
    alternatives: ["claude", "gemini", "perplexity"],
  },

  claude: {
    id: "claude",
    displayName: "Claude (Anthropic)",
    category: "general",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Claude Haiku 4.5 (limited)", "Basic access"],
      },
      pro: {
        name: "Pro — $20/mo",
        monthlyPricePerSeat: 20,
        includedSeats: 1,
        features: ["Claude Sonnet 4.6", "Opus 4.6", "Priority access", "Claude Code"],
      },
      max5x: {
        name: "Max 5× — $100/mo",
        monthlyPricePerSeat: 100,
        includedSeats: 1,
        features: ["5× usage vs Pro", "Claude Sonnet 4.6", "Opus 4.6", "Claude Code unlimited"],
      },
      max20x: {
        name: "Max 20× — $200/mo",
        monthlyPricePerSeat: 200,
        includedSeats: 1,
        features: ["20× usage vs Pro", "All models", "Priority queue", "Claude Code unlimited"],
      },
      team: {
        name: "Team — $25/seat/mo",
        monthlyPricePerSeat: 25,
        includedSeats: 5,
        features: ["Claude Sonnet 4.6", "Admin console", "Usage analytics", "Min. 5 seats"],
      },
      enterprise: {
        name: "Enterprise — custom",
        monthlyPricePerSeat: 50,
        includedSeats: 1,
        features: ["All models", "SSO", "Audit logs", "Custom deployment"],
      },
    },
    alternatives: ["chatgpt", "gemini"],
  },

  gemini: {
    id: "gemini",
    displayName: "Google Gemini / AI Pro",
    category: "general",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Gemini 2.0 Flash (limited)", "Basic access"],
      },
      ai_plus: {
        name: "AI Plus — $7.99/mo",
        monthlyPricePerSeat: 7.99,
        includedSeats: 1,
        features: ["Gemini AI features", "200 GB storage", "Google One included"],
      },
      ai_pro: {
        name: "AI Pro — $19.99/mo",
        monthlyPricePerSeat: 19.99,
        includedSeats: 1,
        features: ["Gemini 2.5 Pro", "5 TB storage", "Workspace AI", "Deep Research", "Coding assistant"],
      },
      ai_ultra: {
        name: "AI Ultra — $249.99/mo",
        monthlyPricePerSeat: 249.99,
        includedSeats: 1,
        features: ["Highest usage limits", "30 TB storage", "Veo 3.1 video", "YouTube Premium"],
      },
      workspace_business: {
        name: "Workspace Business — $22/seat/mo",
        monthlyPricePerSeat: 22,
        includedSeats: 1,
        features: ["Gemini in Workspace apps", "Admin console", "Business-grade security"],
      },
    },
    alternatives: ["chatgpt", "claude", "perplexity"],
  },

  perplexity: {
    id: "perplexity",
    displayName: "Perplexity AI",
    category: "research",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Unlimited basic search", "5 Pro searches/day"],
      },
      pro: {
        name: "Pro — $20/mo",
        monthlyPricePerSeat: 20,
        includedSeats: 1,
        features: ["Unlimited Pro Search", "20 Deep Research/day", "GPT-5, Claude, Gemini access", "File uploads"],
      },
      max: {
        name: "Max — $200/mo",
        monthlyPricePerSeat: 200,
        includedSeats: 1,
        features: ["Unlimited Labs", "Perplexity Computer agentic system", "Priority features", "Power user tier"],
      },
      enterprise_pro: {
        name: "Enterprise Pro — $40/seat/mo",
        monthlyPricePerSeat: 40,
        includedSeats: 1,
        features: ["Unlimited Pro Search", "SSO", "Data controls", "Team management"],
      },
    },
    alternatives: ["chatgpt", "claude", "gemini"],
  },

  // ──────────────────────────────────────────────────────────
  // CODING / DEVELOPER TOOLS
  // ──────────────────────────────────────────────────────────
  github_copilot: {
    id: "github_copilot",
    displayName: "GitHub Copilot",
    category: "coding",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Limited code completions", "Limited premium requests"],
      },
      pro: {
        name: "Pro — $10/mo",
        monthlyPricePerSeat: 10,
        includedSeats: 1,
        features: ["Unlimited code completions", "$10 AI Credits/mo", "Chat in IDE", "CLI"],
      },
      pro_plus: {
        name: "Pro+ — $39/mo",
        monthlyPricePerSeat: 39,
        includedSeats: 1,
        features: ["Unlimited completions", "Larger AI Credit pool", "Advanced models", "Claude + GPT-4o"],
      },
      business: {
        name: "Business — $19/seat/mo",
        monthlyPricePerSeat: 19,
        includedSeats: 1,
        features: ["Unlimited completions", "$19 AI Credits/seat", "Centralized management", "Security features"],
      },
      enterprise: {
        name: "Enterprise — $39/seat/mo",
        monthlyPricePerSeat: 39,
        includedSeats: 1,
        features: ["Everything in Business", "Knowledge bases", "Custom model fine-tuning", "Requires GitHub Enterprise Cloud"],
      },
    },
    alternatives: ["cursor", "codeium", "windsurf"],
  },

  cursor: {
    id: "cursor",
    displayName: "Cursor",
    category: "coding",
    tiers: {
      hobby: {
        name: "Hobby — Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Limited completions", "Basic AI access"],
      },
      pro: {
        name: "Pro — $20/mo",
        monthlyPricePerSeat: 20,
        includedSeats: 1,
        features: ["$20 AI credits/mo", "Unlimited Tab completions", "Unlimited Auto mode", "Claude Sonnet + GPT-4o"],
      },
      pro_plus: {
        name: "Pro+ — $60/mo",
        monthlyPricePerSeat: 60,
        includedSeats: 1,
        features: ["3× credits of Pro", "Unlimited Tab completions", "Priority access"],
      },
      ultra: {
        name: "Ultra — $200/mo",
        monthlyPricePerSeat: 200,
        includedSeats: 1,
        features: ["Maximum credits", "Unlimited Tab completions", "Power user tier"],
      },
      teams: {
        name: "Teams — $40/seat/mo",
        monthlyPricePerSeat: 40,
        includedSeats: 1,
        features: ["All Pro features", "Admin dashboard", "Shared team rules", "SSO (SAML/OIDC)", "Centralized billing"],
      },
    },
    alternatives: ["github_copilot", "codeium", "windsurf"],
  },

  windsurf: {
    id: "windsurf",
    displayName: "Windsurf (Codeium)",
    category: "coding",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Limited Flow credits", "Basic completions"],
      },
      pro: {
        name: "Pro — $15/mo",
        monthlyPricePerSeat: 15,
        includedSeats: 1,
        features: ["Unlimited completions", "Claude + GPT-4o access", "500 Flow credits/mo", "Advanced models"],
      },
      teams: {
        name: "Teams — $30/seat/mo",
        monthlyPricePerSeat: 30,
        includedSeats: 1,
        features: ["All Pro features", "Team management", "Admin console", "SSO"],
      },
    },
    alternatives: ["cursor", "github_copilot"],
  },

  codeium: {
    id: "codeium",
    displayName: "Codeium (Enterprise)",
    category: "coding",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Unlimited completions", "Chat support"],
      },
      teams: {
        name: "Teams — $12/seat/mo",
        monthlyPricePerSeat: 12,
        includedSeats: 1,
        features: ["Unlimited completions", "Admin dashboard", "Priority support"],
      },
      enterprise: {
        name: "Enterprise — $25/seat/mo",
        monthlyPricePerSeat: 25,
        includedSeats: 1,
        features: ["All features", "SSO", "On-prem deployment", "Custom models", "Security audits"],
      },
    },
    alternatives: ["github_copilot", "cursor"],
  },

  // ──────────────────────────────────────────────────────────
  // WRITING & CONTENT
  // ──────────────────────────────────────────────────────────
  grammarly: {
    id: "grammarly",
    displayName: "Grammarly",
    category: "writing",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Basic grammar & spelling", "Tone suggestions (limited)"],
      },
      premium: {
        name: "Premium — ~$12/mo",
        monthlyPricePerSeat: 12,
        includedSeats: 1,
        features: ["Advanced suggestions", "Clarity", "Tone detection", "Plagiarism detection"],
      },
      business: {
        name: "Business — $15/seat/mo",
        monthlyPricePerSeat: 15,
        includedSeats: 3,
        features: ["All Premium features", "Admin dashboard", "Analytics", "Style guides", "Min. 3 seats"],
      },
    },
    alternatives: ["notion_ai"],
  },

  jasper: {
    id: "jasper",
    displayName: "Jasper AI",
    category: "marketing",
    tiers: {
      creator: {
        name: "Creator — $49/mo",
        monthlyPricePerSeat: 49,
        includedSeats: 1,
        features: ["1 user", "50+ templates", "Brand voice", "Unlimited AI output"],
      },
      pro: {
        name: "Pro — $69/mo",
        monthlyPricePerSeat: 69,
        includedSeats: 5,
        features: ["Up to 5 users", "Brand voice", "Campaign workflows", "Collaboration tools"],
      },
      business: {
        name: "Business — custom",
        monthlyPricePerSeat: 99,
        includedSeats: 1,
        features: ["Unlimited users", "API access", "SSO", "Dedicated account manager"],
      },
    },
    alternatives: ["chatgpt", "claude"],
  },

  notion_ai: {
    id: "notion_ai",
    displayName: "Notion AI",
    category: "writing",
    tiers: {
      plus: {
        name: "Plus — $10/seat/mo",
        monthlyPricePerSeat: 10,
        includedSeats: 1,
        features: ["Unlimited blocks", "Basic AI writing (trial only)", "5 guests"],
      },
      business: {
        name: "Business — $24/seat/mo (full AI)",
        monthlyPricePerSeat: 24,
        includedSeats: 1,
        features: ["Full Notion AI access", "Ask Notion", "AI Agents", "AI meeting notes", "Unlimited guests"],
      },
      enterprise: {
        name: "Enterprise — custom",
        monthlyPricePerSeat: 40,
        includedSeats: 1,
        features: ["Full AI + Agents", "SAML SSO", "Advanced security", "Custom contracts"],
      },
    },
    alternatives: ["grammarly", "coda_ai"],
  },

  // ──────────────────────────────────────────────────────────
  // DESIGN / IMAGE GENERATION
  // ──────────────────────────────────────────────────────────
  midjourney: {
    id: "midjourney",
    displayName: "Midjourney",
    category: "design",
    tiers: {
      basic: {
        name: "Basic — $10/mo",
        flatMonthlyPrice: 10,
        monthlyPricePerSeat: 10,
        includedSeats: 1,
        features: ["3.3 hr fast GPU/mo", "~200 images/mo", "Commercial usage"],
      },
      standard: {
        name: "Standard — $30/mo",
        flatMonthlyPrice: 30,
        monthlyPricePerSeat: 30,
        includedSeats: 1,
        features: ["15 hr fast GPU/mo", "Unlimited relax mode", "Commercial usage"],
      },
      pro: {
        name: "Pro — $60/mo",
        flatMonthlyPrice: 60,
        monthlyPricePerSeat: 60,
        includedSeats: 1,
        features: ["30 hr fast GPU/mo", "Unlimited relax mode", "Stealth mode", "Commercial usage"],
      },
      mega: {
        name: "Mega — $120/mo",
        flatMonthlyPrice: 120,
        monthlyPricePerSeat: 120,
        includedSeats: 1,
        features: ["60 hr fast GPU/mo", "Unlimited relax mode", "Stealth mode", "Commercial usage"],
      },
    },
    alternatives: ["canva", "runway"],
  },

  canva: {
    id: "canva",
    displayName: "Canva",
    category: "design",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["Basic templates", "Limited AI tools", "5 GB storage"],
      },
      pro: {
        name: "Pro — $15/seat/mo",
        monthlyPricePerSeat: 15,
        includedSeats: 1,
        features: ["Magic Studio AI", "Brand Kit", "Background Remover", "100 GB storage", "Premium templates"],
      },
      teams: {
        name: "Teams — $10/seat/mo",
        monthlyPricePerSeat: 10,
        includedSeats: 3,
        features: ["All Pro features", "Team collaboration", "Brand controls", "Admin dashboard", "Min. 3 seats"],
      },
      enterprise: {
        name: "Enterprise — custom",
        monthlyPricePerSeat: 30,
        includedSeats: 1,
        features: ["All Teams features", "SSO", "Advanced security", "Dedicated support"],
      },
    },
    alternatives: ["midjourney"],
  },

  runway: {
    id: "runway",
    displayName: "Runway (Video AI)",
    category: "design",
    tiers: {
      basic: {
        name: "Basic — Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["125 credits/mo", "Video generation (limited)", "Watermarked exports"],
      },
      standard: {
        name: "Standard — $15/mo",
        monthlyPricePerSeat: 15,
        includedSeats: 1,
        features: ["625 credits/mo", "HD video export", "No watermark", "Gen-3 Alpha access"],
      },
      pro: {
        name: "Pro — $35/mo",
        monthlyPricePerSeat: 35,
        includedSeats: 1,
        features: ["2250 credits/mo", "4K video export", "Priority generation", "Gen-3 Alpha Turbo"],
      },
      unlimited: {
        name: "Unlimited — $95/mo",
        monthlyPricePerSeat: 95,
        includedSeats: 1,
        features: ["Unlimited generations", "4K export", "Upscaling", "Custom fine-tuning"],
      },
    },
    alternatives: ["midjourney"],
  },

  // ──────────────────────────────────────────────────────────
  // VOICE / AUDIO
  // ──────────────────────────────────────────────────────────
  elevenlabs: {
    id: "elevenlabs",
    displayName: "ElevenLabs",
    category: "marketing",
    tiers: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["10,000 characters/mo", "3 custom voices", "Standard quality"],
      },
      starter: {
        name: "Starter — $5/mo",
        monthlyPricePerSeat: 5,
        includedSeats: 1,
        features: ["30,000 characters/mo", "10 custom voices", "Commercial license"],
      },
      creator: {
        name: "Creator — $22/mo",
        monthlyPricePerSeat: 22,
        includedSeats: 1,
        features: ["100,000 characters/mo", "30 custom voices", "Voice cloning", "Priority support"],
      },
      pro: {
        name: "Pro — $99/mo",
        monthlyPricePerSeat: 99,
        includedSeats: 1,
        features: ["500,000 characters/mo", "160 custom voices", "Pro voice cloning", "Dubbing"],
      },
      scale: {
        name: "Scale — $330/mo",
        monthlyPricePerSeat: 330,
        includedSeats: 1,
        features: ["2M characters/mo", "660 custom voices", "Dedicated support", "Usage analytics"],
      },
    },
    alternatives: [],
  },

  // ──────────────────────────────────────────────────────────
  // PRODUCTIVITY / MEETINGS
  // ──────────────────────────────────────────────────────────
  otter_ai: {
    id: "otter_ai",
    displayName: "Otter.ai",
    category: "general",
    tiers: {
      basic: {
        name: "Basic — Free",
        monthlyPricePerSeat: 0,
        includedSeats: 1,
        features: ["300 min transcription/mo", "3 audio imports/lifetime", "Basic summary"],
      },
      pro: {
        name: "Pro — $16.99/mo",
        monthlyPricePerSeat: 16.99,
        includedSeats: 1,
        features: ["1,200 min transcription/mo", "Unlimited imports", "Advanced summary", "Custom vocabulary"],
      },
      business: {
        name: "Business — $30/seat/mo",
        monthlyPricePerSeat: 30,
        includedSeats: 1,
        features: ["6,000 min transcription/seat/mo", "Admin panel", "CRM integration", "Priority support"],
      },
    },
    alternatives: [],
  },

};

// ──────────────────────────────────────────────────────────
// HELPER EXPORTS
// ──────────────────────────────────────────────────────────
export const TOOL_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(TOOL_PRICING).map(([k, v]) => [k, v.displayName])
);

export const TOOL_CATEGORIES: Record<string, string[]> = Object.entries(TOOL_PRICING).reduce(
  (acc, [id, tool]) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(id);
    return acc;
  },
  {} as Record<string, string[]>
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

export function getTierMonthlyPrice(toolId: string, tierId: string): number | null {
  const tool = getToolPricing(toolId);
  if (!tool) return null;
  const tier = tool.tiers[tierId];
  if (!tier) return null;
  return tier.flatMonthlyPrice ?? tier.monthlyPricePerSeat;
}
