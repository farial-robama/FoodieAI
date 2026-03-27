"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import Button from "@/components/ui/Button";
import { IRestaurant } from "@/types";
import { CUISINES, LOCATIONS } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading]         = useState(true);
  const [total, setTotal]             = useState(0);
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [search,     setSearch]     = useState(searchParams.get("search")   || "");
  const [cuisine,    setCuisine]    = useState(searchParams.get("cuisine")  || "");
  const [priceRange, setPriceRange] = useState(searchParams.get("price")   || "");
  const [rating,     setRating]     = useState(searchParams.get("rating")  || "");
  const [location,   setLocation]   = useState(searchParams.get("location")|| "");
  const [isOpen,     setIsOpen]     = useState(false);
  const [sort,       setSort]       = useState(searchParams.get("sort")    || "newest");

  const debouncedSearch = useDebounce(search, 400);

  const fetchRestaurants = useCallback(async (currentPage = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search",     debouncedSearch);
      if (cuisine)          params.set("cuisine",    cuisine);
      if (priceRange)       params.set("priceRange", priceRange);
      if (rating)           params.set("rating",     rating);
      if (location)         params.set("location",   location);
      if (isOpen)           params.set("isOpen",     "true");
      if (sort)             params.set("sort",        sort);
      params.set("page",  String(currentPage));
      params.set("limit", "12");

      const res  = await fetch(`/api/restaurants?${params.toString()}`);
      const data = await res.json();
      setRestaurants(data.restaurants || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(currentPage);
    } catch {
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, cuisine, priceRange, rating, location, isOpen, sort]);

  useEffect(() => {
    fetchRestaurants(1);
  }, [fetchRestaurants]);

  const clearFilters = () => {
    setSearch(""); setCuisine(""); setPriceRange("");
    setRating(""); setLocation(""); setIsOpen(false);
    setSort("newest");
  };

  const hasFilters = search || cuisine || priceRange || rating || location || isOpen;

  return (
    <div className="min-h-screen bg-[var(--color-warm)] dark:bg-stone-950 pt-20">

      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="container-pad py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
                Explore Restaurants
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
                {loading ? "Loading..." : `${total} restaurants found`}
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:border-[var(--color-primary)] transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && (
                <span
                  className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  !
                </span>
              )}
            </button>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants by name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">

                {/* Cuisine */}
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  <option value="">All Cuisines</option>
                  {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>

                {/* Price */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  <option value="">Any Price</option>
                  <option value="1">$ Budget</option>
                  <option value="2">$$ Moderate</option>
                  <option value="3">$$$ Upscale</option>
                  <option value="4">$$$$ Fine Dining</option>
                </select>

                {/* Rating */}
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Excellent</option>
                  <option value="4">4.0+ Very Good</option>
                  <option value="3.5">3.5+ Good</option>
                </select>

                {/* Location */}
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>

                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="rating">Top Rated</option>
                  <option value="price">Price: Low to High</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                {/* Open now toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${isOpen ? "bg-[var(--color-secondary)]" : "bg-stone-300 dark:bg-stone-600"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isOpen ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm text-stone-600 dark:text-stone-400">Open now</span>
                </label>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:text-red-600 cursor-pointer flex items-center gap-1"
                  >
                    <X size={13} /> Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-pad py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🍽️</p>
            <p className="text-lg font-medium text-stone-700 dark:text-stone-300 mb-2">
              No restaurants found
            </p>
            <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
              Try adjusting your filters or search term
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {restaurants.map((r) => (
                <RestaurantCard key={r._id} restaurant={r} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => fetchRestaurants(page - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => fetchRestaurants(i + 1)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      page === i + 1
                        ? "text-white"
                        : "border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-[var(--color-primary)]"
                    }`}
                    style={page === i + 1 ? { backgroundColor: "var(--color-primary)" } : {}}
                  >
                    {i + 1}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => fetchRestaurants(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}