"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-sm text-slate-500">Carregant…</span>;
  }

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
      >
        Tancar sessió
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
    >
      Iniciar amb Google
    </button>
  );
}
