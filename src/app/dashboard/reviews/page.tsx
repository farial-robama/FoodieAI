"use client";
import { useEffect, useState } from "react";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  restaurantId: { name: string; cuisine: string };
}

export default function ReviewsPage() {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">My Reviews</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{reviews.length} reviews written</p>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-12 text-center">
        <p className="text-stone-400 text-sm mb-2">No reviews yet</p>
        <p className="text-xs text-stone-400">Visit a restaurant page and leave your first review!</p>
      </div>
    </div>
  );
}