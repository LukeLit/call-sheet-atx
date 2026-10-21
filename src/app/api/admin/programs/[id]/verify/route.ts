import { NextResponse } from "next/server";
import { canWritePrograms, verifyProgram } from "@/lib/programs/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Middleware already gates /api/admin/*. Marks a program as checked against its official page today. */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  if (!canWritePrograms()) {
    return NextResponse.json({ error: "The programs database is not connected." }, { status: 503 });
  }
  let by = "ops desk";
  try {
    const body = (await request.json()) as { by?: unknown };
    if (typeof body.by === "string" && body.by.trim()) by = body.by.trim().slice(0, 60);
  } catch {
    // no body: the default name stands
  }
  try {
    await verifyProgram(params.id, by);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Verify failed." }, { status: 400 });
  }
}
