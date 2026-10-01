import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEYS } from "./constants/cookies.constants";
import { IUser } from "./interfaces/user.interface";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;
  const userCookie = request.cookies.get(COOKIE_KEYS.USER)?.value;

  const hasAuth = Boolean(accessToken || refreshToken);

  let user: IUser | null = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie) as IUser;
    } catch {
      user = null;
    }
  }

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isProtectedRoute = pathname.startsWith("/admin") || pathname === "/onboarding";

  // 1. Unauthenticated user trying to access protected admin routes -> redirect to /login
  if (isProtectedRoute && !hasAuth) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 2. Already authenticated user trying to access login/register -> redirect to /admin
  if (isAuthRoute && hasAuth) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const target = redirectParam && redirectParam.startsWith("/admin") ? redirectParam : "/admin";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/admin/:path*",
    "/onboarding",
    "/login",
    "/register",
  ],
};
