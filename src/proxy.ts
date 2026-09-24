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

  const isLoginRoute = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin") && !isLoginRoute;

  // 1. Unauthenticated user trying to access protected admin routes -> redirect to login
  if (isAdminRoute && !hasAuth) {
    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 2. Role restriction: Only admin role can access the admin dashboard
  if (isAdminRoute && user && user.role !== "admin" && user.role !== "superadmin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Already authenticated admin user trying to access login page -> redirect to admin dashboard
  if (isLoginRoute && hasAuth) {
    if (user && user.role !== "admin" && user.role !== "superadmin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

