import Image from "next/image";
import { CalendarDays, MapPin, Star, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { mockMyRatings, mockMyRestaurants, mockUser } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="soft-card overflow-hidden p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-black text-slate-800">{mockUser.name}</h1>
                <p className="text-sm text-slate-500">@{mockUser.alias}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="rounded-2xl bg-orange-50 p-3 text-center">
                <div className="text-xs uppercase tracking-[0.18em] text-orange-700">Restaurants</div>
                <div className="text-2xl font-black text-orange-600">{mockMyRestaurants.length}</div>
              </div>
              <div className="rounded-2xl bg-green-50 p-3 text-center">
                <div className="text-xs uppercase tracking-[0.18em] text-green-700">Valoracions</div>
                <div className="text-2xl font-black text-green-600">{mockMyRatings.length}</div>
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">{mockUser.bio}</p>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="soft-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Els meus restaurants</h2>
              <span className="text-sm text-slate-500">{mockMyRestaurants.length} vinculats</span>
            </div>

            <div className="space-y-3">
              {mockMyRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex gap-3">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-800">{restaurant.name}</div>
                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="h-3 w-3" />
                            {restaurant.city}
                          </div>
                        </div>
                        <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                          {restaurant.source}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {restaurant.addedAt}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Global {restaurant.globalAverage.toFixed(1)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                          {restaurant.isRated ? `Personal ${restaurant.personalAverage?.toFixed(1)}` : "Sense valorar"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Les meves valoracions</h2>
              <span className="text-sm text-slate-500">{mockMyRatings.length} registres</span>
            </div>

            <div className="space-y-3">
              {mockMyRatings.map((rating) => (
                <div key={rating.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-bold text-slate-800">{rating.restaurant}</div>
                    <span className="metric-pill bg-green-100 text-green-700">{rating.personalScore.toFixed(1)}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>{rating.date}</span>
                    <span>Session {rating.session}</span>
                    <span>Mitjana sessió {rating.sessionAverage.toFixed(1)}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-700">
                    {Object.entries(rating.categoryScores).map(([category, score]) => (
                      <div key={category} className="rounded-xl bg-white px-2 py-2">
                        <span className="text-slate-500">{category}</span>
                        <div className="mt-1 font-bold">{score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
