import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

type GoogleProfileShape = {
  name?: string | null;
  picture?: string | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const userId = typeof user.id === "string" ? user.id : String(user.id ?? "");
        const avatarSource = typeof user.avatar === "string" ? user.avatar : null;

        session.user.id = userId;
        session.user.name = user.name ?? session.user.name;
        session.user.image = avatarSource ?? session.user.image ?? null;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      if (account?.provider === "google" && profile) {
        const googleProfile = profile as GoogleProfileShape;
        const avatar = typeof user.avatar === "string" ? user.avatar : null;
        const profileImage = avatar ?? user.image ?? googleProfile.picture ?? null;
        const normalizedAvatar = typeof profileImage === "string" ? profileImage : null;

        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            googleId: user.id,
            name: user.name ?? googleProfile.name ?? "Usuari",
            avatar: normalizedAvatar,
            email: user.email,
          },
          create: {
            googleId: user.id,
            email: user.email,
            name: user.name ?? googleProfile.name ?? "Usuari",
            avatar: normalizedAvatar,
            alias: user.name ?? "Usuari",
          },
        });
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
