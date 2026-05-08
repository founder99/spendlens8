// Email sending is handled via external service
// Configure GMAIL_USER and GMAIL_APP_PASSWORD env vars to enable

export async function sendAuditReportEmail(_params: {
  to: string;
  auditId: string;
  monthlySavings: number;
  annualSavings: number;
}): Promise<void> {
  // Email delivery not configured in this build
  return;
}
