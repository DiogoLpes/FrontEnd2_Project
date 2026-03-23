import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      // FORÇAR: Se não houver token, retorna false para qualquer rota no matcher
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth", // Removi o query param para testar se ele vai para a página base
    },
  }
);

export const config = { 
  matcher: [
   "/dashboard/:path*",
   "/agenda/:path*",
   "/admin/:path*" 
  ] 
};