import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("--- TENTATIVA DE LOGIN ---");
        
        // 1. FORÇAR ENTRADA (Para não dependeres da BD enquanto corriges o Prisma)
        if (credentials?.email === "admin@local.com" && credentials?.password === "Admin123") {
          console.log("✅ LOGIN MESTRE DETETADO");
          return {
            id: "1",
            name: "Administrador",
            email: "admin@local.com",
            role: "ADMIN",
          };
        }

        // 2. TENTAR BASE DE DADOS (Se o de cima falhar)
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (user && user.password === credentials?.password) {
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              role: (user as any).role || "ADMIN",
            };
          }
        } catch (err) {
          console.error("Erro ao ligar à BD:", err);
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: { signIn: "/auth" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };