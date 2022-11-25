import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (user?.password === credentials?.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // token.accessToken = account?.access_token;
        token.id = user.id;
      }
      return token;
    },
    // session({ session, user }) {
    //   if (session.user) {
    //     session.user.id = user.id;
    //   }
    //   return session;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
