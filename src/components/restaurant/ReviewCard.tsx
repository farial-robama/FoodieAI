"use client";
import { IReview } from "@/types";
import StarRating from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";

export default function ReviewCard({ review }: { review: IReview }) {
  const user = review.userId as { name?: string; avatar?: string } | string;
  const name   = typeof user === "object" ? user.name   : "Anonymous";
  const avatar = typeof user === "object" ? user.avatar : null;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-sm font-semibold text-stone-600 dark:text-stone-300 flex-shrink-0 overflow-hidden">
          {avatar
            ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
            : name?.[0]?.toUpperCase() || "U"
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-medium text-stone-900 dark:text-white text-sm">{name}</p>
            <p className="text-xs text-stone-400 flex-shrink-0">{formatDate(review.createdAt)}</p>
          </div>
          <StarRating rating={review.rating} size={13} className="mb-2" />
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}