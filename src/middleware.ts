import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "./lib/utils/functions/session";
import { SESSION_COOKIE_KEY } from "./lib/utils/constants";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_KEY)?.value;
  const session = await decryptSession(sessionCookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
