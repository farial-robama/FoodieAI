"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import { IReview } from "@/types";

interface Props {
  restaurantId: string;
  onReviewAdded: (review: IReview) => void;
}

export default function ReviewForm({ restaurantId, onReviewAdded }: Props) {
  const { isSignedIn, userId } = useAuth();
  const router  = useRouter();
  const [rating,   setRating]   = useState(0);
  const [comment,  setComment]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);

  const handleSubmit = async () => {
    if (!isSignedIn) { router.push("/login"); return; }
    if (rating === 0)          { setError("Please select a rating"); return; }
    if (comment.length < 10)   { setError("Review must be at least 10 characters"); return; }

    setLoading(true);
    setError("");
    try {
      const userRes  = await fetch(`/api/users?clerkId=${userId}`);
      const userData = await userRes.json();

      const res = await fetch("/api/reviews", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId:       userData.user._id,
          restaurantId, rating, comment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onReviewAdded(data.review);
        setRating(0); setComment(""); setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to submit review");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
      <h3 className="font-semibold text-stone-900 dark:text-white mb-4">Write a Review</h3>

      {success ? (
        <p className="text-sm text-green-600 dark:text-green-400">
          Review submitted successfully!
        </p>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-stone-500 mb-2">Your rating</p>
            <StarRating rating={rating} size={24} interactive onRate={setRating} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (min. 10 characters)..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button onClick={handleSubmit} variant="primary" size="sm" loading={loading}>
            {isSignedIn ? "Submit Review" : "Login to Review"}
          </Button>
        </div>
      )}
    </div>
  );
}