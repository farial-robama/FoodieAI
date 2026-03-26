import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { IRestaurant } from "@/types";

async function getTopRated(): Promise<IRestaurant[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/restaurants?sort=rating&limit=4`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.restaurants || [];
  } catch {
    return [];
  }
}

export default async function TopRatedSection() {
  const restaurants = await getTopRated();

  return (
    <section className="section-pad bg-[var(--color-warm)] dark:bg-stone-900">
      <div className="container-pad">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--color-secondary)" }}>
              Community favourites
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Top Rated Right Now
            </h2>
          </div>
          <Link
            href="/explore?sort=rating"
            className="hidden sm:flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
            style={{ color: "var(--color-secondary)" }}
          >
            See more <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {restaurants.length > 0
            ? restaurants.map((r) => <RestaurantCard key={r._id} restaurant={r} />)
            : Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </section>
  );
}