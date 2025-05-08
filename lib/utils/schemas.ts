import { z } from "zod";

export const useCaseSchema = z.enum([
  "coding",
  "writing",
  "research",
  "customer-support",
  "data-analysis",
  "design",
  "marketing",
  "general",
]);

export const auditToolSchema = z.object({
  tool: z.string().min(1, "Select a tool"),
  plan: z.string().min(1, "Enter your plan name"),
  monthlySpend: z
    .number()
    .min(0, "Spend cannot be negative")
    .max(100000, "Enter a realistic amount"),
  seats: z
    .number()
    .int()
    .min(1, "At least 1 seat"),
  teamSize: z
    .number()
    .int()
    .min(1, "At least 1 person"),
  useCase: useCaseSchema,
});

export const auditFormSchema = z.object({
  tools: z.array(auditToolSchema).min(1, "Add at least one tool"),
});

export const leadCaptureSchema = z.object({
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  role: z.string().optional(),
});

export type AuditToolFormValues = z.infer<typeof auditToolSchema>;
export type AuditFormValues = z.infer<typeof auditFormSchema>;
export type LeadCaptureValues = z.infer<typeof leadCaptureSchema>;
