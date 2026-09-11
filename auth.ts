import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

type GoogleProfileShape = {
  name?: string | null;
  picture?: string | null;
};

const hasDatabaseConfiguration = Boolean(process.env.DATABASE_URL);

export const authOptions: NextAuthOptions = {
  adapter: hasDatabaseConfiguration ? PrismaAdapter(prisma) : undefined,
  session: {
    strategy: hasDatabaseConfiguration ? "database" : "jwt",
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        const userId =
          typeof user?.id === "string"
            ? user.id
            : typeof token?.sub === "string"
              ? token.sub
              : null;

        const avatarSource =
          typeof user?.image === "string"
            ? user.image
            : typeof user?.avatar === "string"
              ? user.avatar
              : null;

        if (userId) {
          session.user.id = userId;
        }

        session.user.name = session.user.name ?? user?.name ?? "Usuari";
        session.user.image = avatarSource ?? session.user.image ?? null;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      if (!hasDatabaseConfiguration) {
        return true;
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
