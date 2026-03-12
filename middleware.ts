import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    // Bloqueia acesso a /admin se o utilizador não tiver role ADMIN
    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth?mode=login",
    },
  }
);

export const config = { 
  matcher: [
   "/dashboard/:path*",
   "/agenda/:path*",
   "/Tracking/:path*",
   "/admin/:path*" 
  ] 
};