import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (!req.cookies.has("azure_jwt_token")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!req.cookies.has("account_jwt_token")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$|login|register).*)"],
};
