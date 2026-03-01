import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "../../../lib/prisma";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth?mode=login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Procura o utilizador no banco de dados
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // 2. Verifica se a password coincide
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // 3. O AJUSTE PARA O ERRO DE TIPAGEM:
        // Convertemos o 'id' (que é Int no Prisma) para String (que o NextAuth exige)
        return {
          id: user.id.toString(), //
          email: user.email,
          name: user.name,
          role: user.role, // Opcional: passa o cargo do user
        };
      },
    }),
  ],
  callbacks: {
    // Adiciona o ID e a Role ao Token JWT para usares depois
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    // Adiciona os dados do Token à Sessão do browser
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };