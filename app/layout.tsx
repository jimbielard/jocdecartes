import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joc de Cartes",
  description: "App per valorar restaurants de forma individual i compartida.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ca"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f9faf7] text-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
