import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  safeEqual,
  signAdminToken,
} from "@/lib/admin/auth";

export const runtime = "nodejs";

async function readPassword(request: Request): Promise<string> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { password?: unknown };
    return typeof body.password === "string" ? body.password : "";
  }
  const form = await request.formData();
  const value = form.get("password");
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json")
    || (request.headers.get("content-type") ?? "").includes("application/json");

  if (!secret) {
    if (wantsJson) {
      return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
    }
    return NextResponse.redirect(new URL("/admin", request.url), 303);
  }

  let password = "";
  try {
    password = await readPassword(request);
  } catch {
    if (wantsJson) {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  }

  if (!safeEqual(password, secret)) {
    if (wantsJson) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  }

  const token = await signAdminToken(secret);
  const res = wantsJson
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL("/admin", request.url), 303);
  res.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
  return res;
}
