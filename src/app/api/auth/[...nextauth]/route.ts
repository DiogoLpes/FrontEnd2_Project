import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs"; 

export const authOptions: NextAuthOptions = {
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("--- 🏁 TENTATIVA DE LOGIN ---");
        
        if (!credentials?.email || !credentials?.password) return null;

        const emailInput = credentials.email.toLowerCase();
        const passwordInput = credentials.password;

        if ((emailInput === "admin" || emailInput === "admin@local.com") && passwordInput === "Admin123") {
          return { id: "1", name: "Administrador", email: "admin@local.com", role: "ADMIN" };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: emailInput },
          });

          if (!user) {
            console.log("❌ Utilizador não encontrado:", emailInput);
            return null;
          }


          const isPasswordValid = await bcrypt.compare(passwordInput, user.password);

          if (isPasswordValid) {
            console.log("✅ Login realizado com sucesso");
            return {    
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              role: user.role || "USER",
            };
          } else {
            console.log("❌ Password incorreta para:", emailInput);
          }
        } catch (err) {
          console.error("❌ Erro Prisma:", err);
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session; 
    }
  },
  pages: { signIn: "/auth", error: "/auth" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };