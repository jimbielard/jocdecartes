import Image from "next/image";
import { Search, MapPin, Star } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { mockRestaurants } from "@/lib/mock-data";

export default function RestaurantsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="soft-card p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-orange-500">Cerca</div>
              <h1 className="mt-1 text-2xl font-black text-slate-800">Restaurants</h1>
            </div>

            <div className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                aria-label="Buscar restaurant"
                placeholder="Nom, població o tipus de cuina"
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockRestaurants.map((restaurant) => (
            <article key={restaurant.id} className="soft-card overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={restaurant.photo}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">{restaurant.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      {restaurant.city}
                    </p>
                  </div>
                  <span className="metric-pill bg-green-100 text-green-700">{restaurant.averageGlobal.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  Google {restaurant.googleRating.toFixed(1)} · {restaurant.totalRatings} valoracions
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Cuina</div>
                  <div className="mt-1 font-medium text-slate-700">{restaurant.cuisine}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-xl bg-orange-50 p-2 text-slate-700">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-orange-700">ESPAI</div>
                    <div className="mt-1 font-bold">{restaurant.categoryAverages.ESPAI.toFixed(1)}</div>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-2 text-slate-700">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-orange-700">CUINA</div>
                    <div className="mt-1 font-bold">{restaurant.categoryAverages.CUINA.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
}
