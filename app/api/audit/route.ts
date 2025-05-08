import { NextRequest, NextResponse } from "next/server";
import { submitAudit } from "@/lib/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await submitAudit(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ auditId: result.auditId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
