import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Platform deploy health probes hit "/health" with NO trailing slash. Next's
// default routing was returning a 308 redirect / 404 at that exact path, causing
// the deploy probe to mark the container unhealthy and recycle it in a loop.
// Middleware runs BEFORE routing + trailing-slash handling, so intercepting
// "/health" here guarantees an immediate 200 at the exact probed path.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/health" || pathname === "/health/") {
    return NextResponse.json({ ok: true, status: "ok" });
  }
  return NextResponse.next();
}

// Only run middleware for the health path — zero overhead on all other routes.
export const config = {
  matcher: ["/health", "/health/"],
};
