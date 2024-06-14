import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const session = await auth();
  const { pathname } = req.nextUrl;
  if (session && pathname === "/api/auth/signin")
    return NextResponse.redirect(new URL("/", req.url));

  if (!session && pathname !== "/api/auth/signin")
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
