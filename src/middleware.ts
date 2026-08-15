import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminCookie } from "@/lib/admin/auth";

const PUBLIC_ADMIN_API = new Set(["/api/admin/login", "/api/admin/logout"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.ADMIN_SECRET;
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!secret) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "Admin is not configured." },
        { status: 503 },
      );
    }
    return NextResponse.next();
  }

  if (!isAdminApi || PUBLIC_ADMIN_API.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminCookie(token, secret))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
