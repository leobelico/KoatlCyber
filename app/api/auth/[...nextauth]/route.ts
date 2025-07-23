// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type DefaultSession, type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import type { JWT } from "next-auth/jwt";

// Extender tipos de NextAuth
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    password?: string;
    role?: string | null;
  }
  
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role?: string | null;
    } & DefaultSession["user"];
  }
}

// Configuración de autenticación
const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user?.password) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          return isValid ? {
            id: user.id,
            email: user.email,
            role: user.role ?? null,
          } : null;
        } catch (error) {
          console.error("Error en autorización:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | null | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Manejador de rutas
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };