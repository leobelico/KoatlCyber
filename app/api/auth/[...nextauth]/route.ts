import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Mejor retornar null para fallo, no throw Error
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        // Retorna solo los campos que quieres que estén en la sesión
        return {
          id: user.id,
          email: user.email,
          role: user.role ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      return account?.provider === "credentials";
    },
    // Puedes agregar aquí callbacks como jwt o session si quieres controlar datos de sesión
  },
});

export { handler as GET, handler as POST };
