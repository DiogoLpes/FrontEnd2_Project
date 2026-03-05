import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Se o user tentar aceder ao dashboard e não houver token, o next-auth trata disso.
    return NextResponse.next();
  },
  {
    callbacks: {
      // Esta função garante que o middleware só autoriza se existir um token JWT
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth", // Se não estiver autorizado, manda para aqui
    },
  }
);

export const config = { 
  matcher: [
   "/dashboard/:path*",
   "/Agenda/:path*",
   "/Tracking/:path*"] 
};