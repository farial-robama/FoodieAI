"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { IRestaurant } from "@/types";
import { formatPrice, truncate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";

export default function RestaurantCard({ restaurant }: { restaurant: IRestaurant }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={restaurant.images[0] || "/placeholder.jpg"}
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={restaurant.isOpen ? "secondary" : "danger"}>
            {restaurant.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="gray">
            {formatPrice(restaurant.priceRange)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <Badge variant="primary" className="mb-2">{restaurant.cuisine}</Badge>
          <h3 className="font-semibold text-stone-900 dark:text-white text-base leading-tight">
            {restaurant.name}
          </h3>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 leading-relaxed">
            {truncate(restaurant.description, 80)}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1">
            <StarRating rating={restaurant.rating} size={13} />
            <span className="font-medium text-stone-700 dark:text-stone-300 ml-1">
              {restaurant.rating.toFixed(1)}
            </span>
            <span>({restaurant.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-stone-500 dark:text-stone-400">
          <MapPin size={13} />
          <span>{restaurant.location}</span>
          {restaurant.openingHours && (
            <>
              <span className="mx-1">·</span>
              <Clock size={13} />
              <span>{restaurant.openingHours.open} – {restaurant.openingHours.close}</span>
            </>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto pt-2">
          <Link href={`/restaurants/${restaurant._id}`} className="block">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}