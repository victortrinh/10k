import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";
import prisma from "@lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET)
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    //@ts-ignore
    session: async ({ session, user, token }) => {
      if (!token.user) {
        return {
          session,
          user
        };
      }

      return {
        ...session,
        user: {
          ...user,
          ...token.user
        }
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    }
  }
});