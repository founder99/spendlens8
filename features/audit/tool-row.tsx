"use client";

import { useFormContext } from "react-hook-form";
import { Trash2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOOL_PRICING, getTierMonthlyPrice } from "@/lib/pricing/tools";
import type { AuditFormValues } from "@/lib/utils/schemas";

const USE_CASES = [
  { value: "coding", label: "Coding / Engineering" },
  { value: "writing", label: "Writing / Content" },
  { value: "research", label: "Research / Search" },
  { value: "customer-support", label: "Customer Support" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "design", label: "Design / Creative" },
  { value: "marketing", label: "Marketing" },
  { value: "general", label: "General Purpose" },
];

// Group tools by category for a cleaner picker
const CATEGORY_LABELS: Record<string, string> = {
  general: "💬 General Purpose AI",
  coding: "💻 Coding & Developer Tools",
  writing: "✍️ Writing & Content",
  marketing: "📣 Marketing",
  design: "🎨 Design & Image Generation",
  research: "🔍 Research & Search",
};

const GROUPED_TOOLS = Object.values(TOOL_PRICING).reduce(
  (acc, tool) => {
    const cat = tool.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push({ value: tool.id, label: tool.displayName });
    return acc;
  },
  {} as Record<string, { value: string; label: string }[]>
);

// Sort category order
const CATEGORY_ORDER = ["general", "coding", "writing", "marketing", "design", "research"];

type Props = {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
};

export function ToolRow({ index, onRemove, canRemove }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<AuditFormValues>();

  const toolErrors = errors.tools?.[index];
  const selectedTool = watch(`tools.${index}.tool`);
  const selectedPlan = watch(`tools.${index}.plan`);

  const toolData = selectedTool ? TOOL_PRICING[selectedTool] : null;

  // Build plan options showing the real price in the label
  const planOptions = toolData
    ? Object.entries(toolData.tiers).map(([id, tier]) => {
        const price = tier.flatMonthlyPrice ?? tier.monthlyPricePerSeat;
        const priceLabel = price === 0 ? "Free" : `$${price}/mo`;
        return {
          value: id,
          label: tier.name.includes("$") ? tier.name : `${tier.name} — ${priceLabel}`,
          price,
        };
      })
    : [];

  // When a plan is selected, auto-fill the monthly spend
  const handlePlanChange = (planId: string | null) => {
    if (!planId) return;
    setValue(`tools.${index}.plan`, planId, { shouldValidate: true });
    if (selectedTool) {
      const price = getTierMonthlyPrice(selectedTool, planId);
      if (price !== null && price > 0) {
        setValue(`tools.${index}.monthlySpend`, price, { shouldValidate: true });
      }
    }
  };

  return (
    <div className="rounded-lg border border-border/60 bg-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Tool {index + 1}</span>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
            aria-label="Remove tool"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* ── Tool Selector (grouped by category) ── */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`tool-${index}`}>AI Tool</Label>
          <Select
            onValueChange={(v) => {
              setValue(`tools.${index}.tool`, v || "", { shouldValidate: true });
              setValue(`tools.${index}.plan`, "");
              setValue(`tools.${index}.monthlySpend`, 0);
            }}
            value={selectedTool}
          >
            <SelectTrigger id={`tool-${index}`}>
              <SelectValue placeholder="Select a tool…" />
            </SelectTrigger>
            <SelectContent className="max-h-[320px]">
              {CATEGORY_ORDER.map((cat) => {
                const tools = GROUPED_TOOLS[cat];
                if (!tools?.length) return null;
                return (
                  <SelectGroup key={cat}>
                    <SelectLabel>{CATEGORY_LABELS[cat] ?? cat}</SelectLabel>
                    {tools.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
              <SelectGroup>
                <SelectLabel>Other</SelectLabel>
                <SelectItem value="other">Other / Custom Tool</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {toolErrors?.tool && (
            <p className="text-xs text-destructive">{toolErrors.tool.message}</p>
          )}
        </div>

        {/* ── Plan Selector with real prices ── */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`plan-${index}`}>Current Plan</Label>
          {planOptions.length > 0 ? (
            <Select onValueChange={handlePlanChange} value={selectedPlan}>
              <SelectTrigger id={`plan-${index}`}>
                <SelectValue placeholder="Select plan…" />
              </SelectTrigger>
              <SelectContent>
                {planOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={`plan-${index}`}
              placeholder="e.g. Pro, Business, Enterprise"
              {...register(`tools.${index}.plan`)}
            />
          )}
          {toolErrors?.plan && (
            <p className="text-xs text-destructive">{toolErrors.plan.message}</p>
          )}
        </div>

        {/* ── Monthly Spend (auto-filled from plan, editable) ── */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`spend-${index}`}>
            Monthly Spend ($)
            {selectedPlan && planOptions.length > 0 && (
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                (auto-filled from plan)
              </span>
            )}
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id={`spend-${index}`}
              type="number"
              min={0}
              step={0.01}
              placeholder="e.g. 150"
              className="pl-7"
              {...register(`tools.${index}.monthlySpend`, { valueAsNumber: true })}
            />
          </div>
          {toolErrors?.monthlySpend && (
            <p className="text-xs text-destructive">{toolErrors.monthlySpend.message}</p>
          )}
        </div>

        {/* ── Seats / Licenses ── */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`seats-${index}`}>Seats / Licenses</Label>
          <Input
            id={`seats-${index}`}
            type="number"
            min={1}
            step={1}
            placeholder="e.g. 10"
            {...register(`tools.${index}.seats`, { valueAsNumber: true })}
          />
          {toolErrors?.seats && (
            <p className="text-xs text-destructive">{toolErrors.seats.message}</p>
          )}
        </div>

        {/* ── Active Users ── */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`team-${index}`}>Active Users</Label>
          <Input
            id={`team-${index}`}
            type="number"
            min={1}
            step={1}
            placeholder="e.g. 7"
            {...register(`tools.${index}.teamSize`, { valueAsNumber: true })}
          />
          {toolErrors?.teamSize && (
            <p className="text-xs text-destructive">{toolErrors.teamSize.message}</p>
          )}
        </div>

        {/* ── Primary Use Case ── */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`usecase-${index}`}>Primary Use Case</Label>
          <Select
            onValueChange={(v) =>
              setValue(`tools.${index}.useCase`, v as never, { shouldValidate: true })
            }
            value={watch(`tools.${index}.useCase`)}
          >
            <SelectTrigger id={`usecase-${index}`}>
              <SelectValue placeholder="Select use case" />
            </SelectTrigger>
            <SelectContent>
              {USE_CASES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {toolErrors?.useCase && (
            <p className="text-xs text-destructive">{toolErrors.useCase.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
