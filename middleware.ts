import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth", 
  },
});

export const config = {
  // Rotas que EXIGEM login para entrar
  matcher: [
    "/dashboard/:path*", 
    "/Agenda/:path*", 
    "/Tracking/:path*",
    "/garagem/:path*"
  ],
};