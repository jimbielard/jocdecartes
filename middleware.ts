import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const signInUrl = new URL("/api/auth/signin/google", request.url);
    signInUrl.searchParams.set("callbackUrl", `${request.nextUrl.origin}/`);
    return NextResponse.redirect(signInUrl);
  }

  if (!token) {
    const signInUrl = new URL("/api/auth/signin/google", request.url);
    signInUrl.searchParams.set("callbackUrl", `${request.nextUrl.origin}/`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
