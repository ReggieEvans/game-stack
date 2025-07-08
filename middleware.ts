import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verifyJWT } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = await verifyJWT(token);

    if (req.nextUrl.pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*"],
};
