import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"; // Se estiver usando next-auth

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if (token.role !== "admin") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
