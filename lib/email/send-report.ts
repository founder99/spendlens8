import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "SpendLens <reports@spendlens.app>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function sendAuditReportEmail({
  to,
  auditId,
  monthlySavings,
  annualSavings,
}: {
  to: string;
  auditId: string;
  monthlySavings: number;
  annualSavings: number;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  const reportUrl = `${APP_URL}/audit/${auditId}`;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Your AI spend audit — $${annualSavings}/yr in potential savings`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:40px 16px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">
    <div style="padding:32px 32px 0;">
      <div style="margin-bottom:24px;">
        <span style="font-weight:700;font-size:16px;">SpendLens</span>
      </div>
      <h1 style="font-size:22px;font-weight:700;color:#111;margin:0 0 8px;">Your audit report is ready</h1>
      <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
        We found <strong style="color:#111;">$${monthlySavings}/month</strong> in potential savings
        across your AI tool stack — that's <strong style="color:#16a34a;">$${annualSavings}/year</strong>.
      </p>
    </div>
    <div style="padding:0 32px 24px;">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#15803d;font-weight:500;">
          Potential annual savings: <strong>$${annualSavings}</strong>
        </p>
      </div>
      <a href="${reportUrl}" style="display:block;background:#111;color:#fff;text-align:center;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin-bottom:16px;">
        View Full Report
      </a>
      <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0;">
        Share link: <a href="${reportUrl}" style="color:#6b7280;">${reportUrl}</a>
      </p>
    </div>
    <div style="border-top:1px solid #f3f4f6;padding:16px 32px;">
      <p style="color:#9ca3af;font-size:12px;margin:0;">
        One-time email from SpendLens. We will not spam you.
      </p>
    </div>
  </div>
</body>
</html>`,
  });
}
