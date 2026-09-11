import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  MapPin,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { categories, mockMyRatings, mockUser } from "@/lib/mock-data";

const quickActions = [
  { label: "Cercar restaurant", href: "/restaurants", icon: Search },
  { label: "Crear sessió", href: "/sessions", icon: Plus },
  { label: "Entrar amb codi", href: "/sessions", icon: ArrowRight },
  { label: "Els meus restaurants", href: "/profile", icon: MapPin },
  { label: "Les meves valoracions", href: "/profile", icon: Star },
  { label: "El meu perfil", href: "/profile", icon: Users },
];

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-4">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-50">
                Assessoria gastronòmica
              </span>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                Comparteix valoracions i decideix on menjar.
              </h1>
              <p className="max-w-lg text-base text-orange-50/90">
                Crea sessions, puntua categories, bloqueja resultats fins que tots hagin acabat i guarda l’historial del teu tast.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 shadow-inner backdrop-blur-sm">
              <div className="text-sm uppercase tracking-[0.18em] text-orange-50/80">Sessió activa</div>
              <div className="mt-2 text-3xl font-black">JDC-5824</div>
              <div className="mt-1 text-sm text-orange-50/90">La Brasa del Port · 3 participants</div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="soft-card p-5">
            <div className="text-sm text-slate-500">Restaurants vinculats</div>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-800">18</span>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">+6 aquest mes</span>
            </div>
          </div>
          <div className="soft-card p-5">
            <div className="text-sm text-slate-500">Valoracions personals</div>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-800">{mockMyRatings.length}</span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">Històric</span>
            </div>
          </div>
          <div className="soft-card p-5">
            <div className="text-sm text-slate-500">Categories actives</div>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-800">{categories.filter((item) => item.active).length}</span>
              <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700">7 base</span>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Accesos principals</h2>
              <span className="text-sm text-slate-500">Mobile-first</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {quickActions.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="soft-card flex items-center justify-between rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-slate-700">{label}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>

          <aside className="soft-card p-5">
            <div className="flex items-center gap-3">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="text-lg font-bold text-slate-800">{mockUser.name}</div>
                <div className="text-sm text-slate-500">@{mockUser.alias}</div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ChefHat className="h-4 w-4 text-orange-500" />
                Bio resumida
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{mockUser.bio}</p>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-orange-200 bg-orange-50 p-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-orange-700">Rang</div>
                <div className="font-semibold text-orange-800">Gourmet en actiu</div>
              </div>
              <div className="text-2xl font-black text-orange-600">8.8</div>
            </div>
          </aside>
        </section>

        <section className="soft-card p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-800">Restaurants destacats</h2>
            <Link href="/restaurants" className="text-sm font-semibold text-orange-600">
              Veure tots
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { name: "La Brasa del Port", city: "Barcelona", cuisine: "Marisc i mediterrània", average: 8.72 },
              { name: "Sabor de Bosc", city: "Girona", cuisine: "Creativa", average: 8.26 },
              { name: "Casa del Forn", city: "València", cuisine: "Clàssica", average: 8.91 },
            ].map((restaurant) => (
              <div key={restaurant.name} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="h-28 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{restaurant.name}</div>
                    <div className="text-sm text-slate-500">{restaurant.city}</div>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                    {restaurant.average.toFixed(1)}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-600">{restaurant.cuisine}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
