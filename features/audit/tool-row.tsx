"use client";

import { useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOOL_PRICING } from "@/lib/pricing/tools";
import type { AuditFormValues } from "@/lib/utils/schemas";

const USE_CASES = [
  { value: "coding", label: "Coding" },
  { value: "writing", label: "Writing" },
  { value: "research", label: "Research" },
  { value: "customer-support", label: "Customer Support" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "general", label: "General" },
];

const TOOL_OPTIONS = Object.values(TOOL_PRICING).map((t) => ({
  value: t.id,
  label: t.displayName,
}));

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

  const planOptions = selectedTool
    ? Object.values(TOOL_PRICING[selectedTool]?.tiers ?? {}).map((t) => ({
        value: t.name.toLowerCase(),
        label: t.name,
      }))
    : [];

  return (
    <div className="rounded-lg border border-border/60 bg-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Tool {index + 1}
        </span>
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
        {/* Tool */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`tool-${index}`}>AI Tool</Label>
          <Select
            onValueChange={(v) => {
              setValue(`tools.${index}.tool`, v || "", { shouldValidate: true });
              setValue(`tools.${index}.plan`, "");
            }}
            value={selectedTool}
          >
            <SelectTrigger id={`tool-${index}`}>
              <SelectValue placeholder="Select a tool" />
            </SelectTrigger>
            <SelectContent>
              {TOOL_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {toolErrors?.tool && (
            <p className="text-xs text-destructive">{toolErrors.tool.message}</p>
          )}
        </div>

        {/* Plan */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`plan-${index}`}>Current Plan</Label>
          {planOptions.length > 0 ? (
            <Select
              onValueChange={(v) =>
                setValue(`tools.${index}.plan`, v || "", { shouldValidate: true })
              }
              value={watch(`tools.${index}.plan`)}
            >
              <SelectTrigger id={`plan-${index}`}>
                <SelectValue placeholder="Select plan" />
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

        {/* Monthly Spend */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`spend-${index}`}>Monthly Spend ($)</Label>
          <Input
            id={`spend-${index}`}
            type="number"
            min={0}
            step={0.01}
            placeholder="e.g. 150"
            {...register(`tools.${index}.monthlySpend`, { valueAsNumber: true })}
          />
          {toolErrors?.monthlySpend && (
            <p className="text-xs text-destructive">
              {toolErrors.monthlySpend.message}
            </p>
          )}
        </div>

        {/* Seats */}
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

        {/* Team Size */}
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
            <p className="text-xs text-destructive">
              {toolErrors.teamSize.message}
            </p>
          )}
        </div>

        {/* Use Case */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`usecase-${index}`}>Primary Use Case</Label>
          <Select
            onValueChange={(v) =>
              setValue(`tools.${index}.useCase`, v as never, {
                shouldValidate: true,
              })
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
            <p className="text-xs text-destructive">
              {toolErrors.useCase.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
