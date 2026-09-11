"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AuthButton } from "@/components/auth-button";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
      return;
    }

    if (status === "unauthenticated") {
      signIn("google", { callbackUrl: "/" });
    }
  }, [status, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100 p-4">
      <div className="soft-card w-full max-w-md p-6 md:p-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Tornar a l’inici
        </Link>

        <div className="space-y-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Accés</div>
            <h1 className="mt-2 text-3xl font-black text-slate-800">Entrar a Joc de Cartes</h1>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Inicia sessió amb Google per crear sessions, valorar restaurants i guardar el teu historial personal.
          </p>

          <div className="pt-3">
            <AuthButton />
          </div>
        </div>
      </div>
    </main>
  );
}
