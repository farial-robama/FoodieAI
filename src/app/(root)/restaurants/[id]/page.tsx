"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Star, Users, ChevronLeft, Sparkles } from "lucide-react";
import { IRestaurant, IReview } from "@/types";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import SkeletonCard from "@/components/ui/SkeletonCard";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import BookingForm from "@/components/restaurant/BookingForm";
import ReviewForm from "@/components/restaurant/ReviewForm";
import ReviewCard from "@/components/restaurant/ReviewCard";
import AISummaryBox from "@/components/restaurant/AISummaryBox";

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant]   = useState<IRestaurant | null>(null);
  const [reviews, setReviews]         = useState<IReview[]>([]);
  const [related, setRelated]         = useState<IRestaurant[]>([]);
  const [loading, setLoading]         = useState(true);
  const [activeTab, setActiveTab]     = useState<"overview" | "menu" | "reviews">("overview");

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const [rRes, revRes] = await Promise.all([
          fetch(`/api/restaurants/${id}`),
          fetch(`/api/reviews?restaurantId=${id}`),
        ]);
        const rData   = await rRes.json();
        const revData = await revRes.json();
        setRestaurant(rData.restaurant);
        setReviews(revData.reviews || []);

        // Fetch related
        if (rData.restaurant?.cuisine) {
          const relRes  = await fetch(`/api/restaurants?cuisine=${rData.restaurant.cuisine}&limit=4`);
          const relData = await relRes.json();
          setRelated((relData.restaurants || []).filter((r: IRestaurant) => r._id !== id));
        }
      } catch {
        console.error("Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 container-pad py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-80 rounded-2xl bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <SkeletonCard />
          </div>
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🍽️</p>
          <p className="text-lg font-medium text-stone-700 dark:text-stone-300">Restaurant not found</p>
          <Link href="/explore" className="mt-4 inline-block">
            <Button variant="primary">Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-warm)] dark:bg-stone-950 pt-20">

      {/* Hero image */}
      <div className="relative h-72 sm:h-96">
        <Image
          src={restaurant.images?.[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container-pad">
            <Link href="/explore" className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 w-fit">
              <ChevronLeft size={16} /> Back to Explore
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex gap-2 mb-2">
                  <Badge variant="primary">{restaurant.cuisine}</Badge>
                  <Badge variant={restaurant.isOpen ? "secondary" : "danger"}>
                    {restaurant.isOpen ? "Open Now" : "Closed"}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-white">{restaurant.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {restaurant.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    {restaurant.rating} ({restaurant.reviewCount} reviews)
                  </span>
                  <span>{formatPrice(restaurant.priceRange)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-pad py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tabs */}
            <div className="flex gap-1 border-b border-stone-200 dark:border-stone-800">
              {(["overview", "menu", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors cursor-pointer border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                      : "border-transparent text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                  }`}
                >
                  {tab} {tab === "reviews" && `(${reviews.length})`}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
                  <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-3">About</h2>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{restaurant.description}</p>
                </div>

                <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
                  <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">Key Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Cuisine",       value: restaurant.cuisine },
                      { label: "Price Range",   value: formatPrice(restaurant.priceRange) },
                      { label: "Location",      value: restaurant.location },
                      { label: "Address",       value: restaurant.address },
                      { label: "Opening Hours", value: `${restaurant.openingHours?.open} – ${restaurant.openingHours?.close}` },
                      { label: "Status",        value: restaurant.isOpen ? "Open Now" : "Closed" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-stone-400 mb-1">{item.label}</p>
                        <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Summary */}
                <AISummaryBox restaurantId={id} restaurantName={restaurant.name} reviews={reviews} />
              </div>
            )}

            {/* Menu tab */}
            {activeTab === "menu" && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
                <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">Menu</h2>
                {restaurant.menu && restaurant.menu.length > 0 ? (
                  <div className="space-y-3">
                    {restaurant.menu.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 transition-colors">
                        <div>
                          <p className="font-medium text-stone-900 dark:text-white text-sm">{item.name}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{item.description}</p>
                          <Badge variant="gray" className="mt-1">{item.category}</Badge>
                        </div>
                        <p className="font-semibold text-stone-900 dark:text-white text-sm ml-4 whitespace-nowrap">
                          ৳{item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-stone-500 text-sm">No menu items available yet.</p>
                )}
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <ReviewForm
                  restaurantId={id}
                  onReviewAdded={(review) => setReviews([review, ...reviews])}
                />
                {reviews.length === 0 ? (
                  <div className="text-center py-10 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <p className="text-stone-500 text-sm">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right — booking */}
          <div className="space-y-5">
            <BookingForm restaurant={restaurant} />

            {/* Quick stats */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800">
              <h3 className="font-semibold text-stone-900 dark:text-white mb-4 text-sm">At a glance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <StarRating rating={restaurant.rating} size={13} />
                    <span className="font-medium text-stone-700 dark:text-stone-300">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Reviews</span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">{restaurant.reviewCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Price range</span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">{formatPrice(restaurant.priceRange)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Hours</span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">
                    {restaurant.openingHours?.open} – {restaurant.openingHours?.close}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related restaurants */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-6">
              More {restaurant.cuisine} Restaurants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.slice(0, 4).map((r) => (
                <RestaurantCard key={r._id} restaurant={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}