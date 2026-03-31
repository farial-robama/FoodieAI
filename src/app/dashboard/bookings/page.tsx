"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Calendar, Clock, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface Booking {
  _id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  specialRequest?: string;
  restaurantId: {
    name: string;
    cuisine: string;
    images: string[];
    location: string;
  };
}

export default function BookingsPage() {
  const { userId }              = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/bookings?clerkId=${userId}`)
      .then((r) => r.json())
      .then((d) => { setBookings(d.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userId]);

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">My Bookings</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
          {bookings.length} total bookings
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "confirmed", "pending", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors cursor-pointer ${
              filter === s
                ? "text-white"
                : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
            }`}
            style={filter === s ? { backgroundColor: "var(--color-primary)" } : {}}
          >
            {s} ({s === "all" ? bookings.length : bookings.filter((b) => b.status === s).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-stone-200 dark:bg-stone-800 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-12 text-center">
          <p className="text-stone-400 text-sm mb-3">No bookings found</p>
          <Link
            href="/explore"
            className="text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Book a restaurant →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b._id}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 flex gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                {b.restaurantId?.images?.[0] && (
                  <img
                    src={b.restaurantId.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">
                      {b.restaurantId?.name || "Restaurant"}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {b.restaurantId?.cuisine} · {b.restaurantId?.location}
                    </p>
                  </div>
                  <Badge
                    variant={
                      b.status === "confirmed" ? "secondary" :
                      b.status === "cancelled" ? "danger" : "warning"
                    }
                  >
                    {b.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-stone-500 dark:text-stone-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {b.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {b.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {b.guests} guests
                  </span>
                </div>
                {b.specialRequest && (
                  <p className="text-xs text-stone-400 mt-2 italic">
                    "{b.specialRequest}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}