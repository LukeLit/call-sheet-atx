import { NextResponse } from "next/server";
import { ADMIN_COOKIE, PREVIEW_COOKIE, adminCookieOptions } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/admin", request.url), 303);
  const expired = { ...adminCookieOptions(), maxAge: 0 };
  res.cookies.set(ADMIN_COOKIE, "", expired);
  res.cookies.set(PREVIEW_COOKIE, "", expired);
  return res;
}
