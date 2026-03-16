import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  // Define como a sessão é gerida (JSON Web Token)
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
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
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Campos vazios.");
          return null;
        }

        // Converter para minúsculas para evitar erros de digitação
        const emailInput = credentials.email.toLowerCase();
        const passwordInput = credentials.password;

        // 1. LOGIN MESTRE (HARDCODED)
        if ((emailInput === "admin" || emailInput === "admin@local.com") && passwordInput === "Admin123") {
          console.log("✅ LOGIN Administrador DETETADO");
          return {
            id: "admin-id-01",
            name: "Administrador",
            email: "admin@local.com",
            role: "ADMIN",
          };
        }

        // 2. BUSCA NA BASE DE DADOS
        try {
          const user = await prisma.user.findUnique({
            where: { email: emailInput },
          });

          if (!user) {
            console.log("❌ Utilizador não encontrado na BD:", emailInput);
            return null;
          }

          // Comparação direta de password (conforme o teu registo atual)
          if (user.password === passwordInput) {
            console.log("✅ Login realizado com sucesso via BD");
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              role: user.role || "USER", // Garante que tem um role
            };
          } else {
            console.log("❌ Password incorreta para o utilizador:", emailInput);
          }
        } catch (err) {
          console.error("❌ Erro crítico ao ligar ao Prisma:", err);
        }

        return null;
      }
    })
  ],
  callbacks: {
    // Guarda o ID e o ROLE no Token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    // Passa o ID e o ROLE do Token para a Sessão (acessível no Front-end)
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: { 
    signIn: "/auth", // Onde o utilizador é mandado se não estiver logado
    error: "/auth",  // Onde o utilizador é mandado se o login falhar
  },
  // Chave secreta necessária para assinar os cookies da sessão
  secret: process.env.NEXTAUTH_SECRET || "chave-secreta-para-escola-123",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };