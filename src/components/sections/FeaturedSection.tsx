import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { IRestaurant } from "@/types";

async function getFeaturedRestaurants(): Promise<IRestaurant[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/restaurants?featured=true&limit=4`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.restaurants || [];
  } catch {
    return [];
  }
}

export default async function FeaturedSection() {
  const restaurants = await getFeaturedRestaurants();

  return (
    <section className="section-pad bg-[var(--color-warm)] dark:bg-stone-900">
      <div className="container-pad">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--color-primary)" }}>
              Handpicked for you
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Editor's Picks
            </h2>
          </div>
          <Link
            href="/explore"
            className="hidden sm:flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
            style={{ color: "var(--color-primary)" }}
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {restaurants.length > 0
            ? restaurants.map((r) => <RestaurantCard key={r._id} restaurant={r} />)
            : Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>

        <div className="flex sm:hidden justify-center mt-6">
          <Link href="/explore">
            <button
              className="flex items-center gap-1 text-sm font-medium px-5 py-2.5 rounded-xl border transition-colors"
              style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
            >
              View all restaurants <ArrowRight size={15} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}