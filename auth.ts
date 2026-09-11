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
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
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

        if (userId) {
          session.user.id = userId;
        }

        session.user.name = session.user.name ?? user?.name ?? "Usuari";
        session.user.image = user?.image ?? session.user.image ?? null;
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
        const googleProfile = profile as GoogleProfileShape & { sub?: string };
        const profileImage = user.image ?? googleProfile.picture ?? null;
        const normalizedAvatar = typeof profileImage === "string" ? profileImage : null;
        const googleUserId = user.id ?? googleProfile.sub ?? user.email;

        if (!googleUserId) {
          return false;
        }

        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            googleId: googleUserId,
            name: user.name ?? googleProfile.name ?? "Usuari",
            avatar: normalizedAvatar,
            email: user.email,
          },
          create: {
            googleId: googleUserId,
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
