"use client";
import { useState } from "react";
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { IReview } from "@/types";

interface Props {
  restaurantId: string;
  restaurantName: string;
  reviews: IReview[];
}

export default function AISummaryBox({ restaurantId, restaurantName, reviews }: Props) {
  const [summary,   setSummary]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [expanded,  setExpanded]  = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateSummary = async () => {
    if (reviews.length === 0) {
      setSummary("No reviews yet to summarize. Be the first to leave a review!");
      setExpanded(true);
      setGenerated(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai/summarize", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantName,
          reviews: reviews.map((r) => ({
            rating:  r.rating,
            comment: r.comment,
          })),
        }),
      });
      const data = await res.json();
      setSummary(data.summary || "Could not generate summary.");
      setExpanded(true);
      setGenerated(true);
    } catch {
      setSummary("Failed to generate summary. Please try again.");
      setExpanded(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: "#9FE1CB", backgroundColor: "#E1F5EE10" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#E1F5EE" }}
          >
            <Sparkles size={15} style={{ color: "var(--color-secondary)" }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900 dark:text-white">AI Review Summary</p>
            <p className="text-xs text-stone-500">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""} analysed
            </p>
          </div>
        </div>
        {!generated ? (
          <button
            onClick={generateSummary}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white transition-colors cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {loading ? "Generating..." : "Generate"}
          </button>
        ) : (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-stone-400 hover:text-stone-600 cursor-pointer"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {expanded && summary && (
        <p className="mt-4 text-sm text-stone-700 dark:text-stone-300 leading-relaxed border-t border-stone-200 dark:border-stone-700 pt-4">
          {summary}
        </p>
      )}
    </div>
  );
}