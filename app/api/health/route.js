import { NextResponse } from "next/server";

/**
 * GET /api/health
 * Health check da aplicação.
 */
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
