import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const session = await getSession();
  const isExpires = new Date(session?.expires) <= new Date();
  // const isExpires = true;
  if (isExpires) session.user = "";

  const { pathname } = req.nextUrl;
  if (session?.user && pathname === "/auth/login")
    return NextResponse.redirect(new URL("/", req.url));

  if (!session?.user && pathname !== "/auth/login")
    return NextResponse.redirect(new URL("/auth/login", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
