import { CheckCircle2, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { activeSession, categories } from "@/lib/mock-data";

export default function SessionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="soft-card p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-orange-500">Sessió</div>
              <h1 className="mt-1 text-2xl font-black text-slate-800">{activeSession.code}</h1>
            </div>
            <div className="flex gap-3">
              <span className="metric-pill bg-orange-100 text-orange-700">{activeSession.status}</span>
              <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-600">
                Tancar registre
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="soft-card p-5">
            <h2 className="text-xl font-bold text-slate-800">Participants</h2>
            <div className="mt-4 space-y-3">
              {activeSession.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-orange-200 to-slate-200" />
                    <div>
                      <div className="font-semibold text-slate-800">{participant.name}</div>
                      <div className="text-xs text-slate-500">{participant.status}</div>
                    </div>
                  </div>
                  <span className="metric-pill bg-green-100 text-green-700">{participant.status === "FINALITZAT" ? "Finalitzat" : participant.status === "VOTANT" ? "Votant" : "En espera"}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-card p-5">
            <h2 className="text-xl font-bold text-slate-800">Categories</h2>
            <div className="mt-4 space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <span className="font-medium text-slate-700">{category.name}</span>
                  <span className={`metric-pill ${category.active ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>
                    {category.active ? "Actiu" : "Inactiu"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="soft-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Resultats de la sessió</h2>
            <span className="metric-pill bg-green-100 text-green-700">Resultats visibles</span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(activeSession.categoryAverages).map(([category, value]) => (
              <div key={category} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-600">{category}</span>
                  <Sparkles className="h-4 w-4 text-orange-500" />
                </div>
                <div className="mt-3 text-2xl font-black text-slate-800">{value.toFixed(1)}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Mitjana general de la sessió
            </div>
            <div className="text-2xl font-black text-orange-600">{activeSession.sessionAverage.toFixed(2)}</div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
