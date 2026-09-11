"use client";

import Link from "next/link";

export function AuthButton() {
  return (
    <Link
      href="/"
      className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
    >
      Entrar a l’app
    </Link>
  );
}
