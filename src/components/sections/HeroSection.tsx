"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Star, Users } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/explore?search=${encodeURIComponent(search)}`);
    else router.push("/explore");
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-20 container-pad w-full text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span>AI-Powered Restaurant Discovery</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl mx-auto">
          Find Your Next{" "}
          <span style={{ color: "var(--color-primary)" }}>Favourite</span>{" "}
          Meal
        </h1>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Discover top-rated restaurants, book tables instantly, and get AI-powered recommendations tailored just for you.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-10"
        >
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants, cuisines..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-white border-0 outline-none shadow-lg"
            />
          </div>
          <Button type="submit" variant="primary" size="lg">
            Search
          </Button>
        </form>

        {/* Quick stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} style={{ color: "var(--color-primary)" }} />
            <span>1,200+ Restaurants</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>4.8 Average Rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} style={{ color: "var(--color-secondary)" }} />
            <span>50,000+ Happy Users</span>
          </div>
        </div>
      </div>
    </section>
  );
}