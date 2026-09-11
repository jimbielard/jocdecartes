import Link from "next/link";
import type { ReactNode } from "react";
import { AuthButton } from "@/components/auth-button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Sessions", href: "/sessions" },
  { label: "Perfil", href: "/profile" },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9faf7] text-slate-800">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 font-bold text-white">
              J
            </span>
            <div>
              <div className="text-lg font-bold tracking-tight">Joc de Cartes</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Restaurant rating</div>
            </div>
          </Link>

          <nav className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
              Entrar amb codi
            </button>
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
