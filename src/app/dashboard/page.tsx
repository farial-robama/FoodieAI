"use client";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Calendar, Star, Heart, ArrowRight } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import Badge from "@/components/ui/Badge";

interface Booking {
  _id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  restaurantId: {
    name: string;
    images: string[];
  };
}

export default function DashboardPage() {
  const { userId } = useAuth();
  const { user }   = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading,  setLoading]  = useState(true);


useEffect(() => {
  if (!userId || !user) return;

  const init = async () => {
    
    await fetch("/api/users", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: userId,
        name:    user.fullName || "User",
        email:   user.primaryEmailAddress?.emailAddress || "",
        avatar:  user.imageUrl || "",
      }),
    });

    // Fetch bookings
    const res  = await fetch(`/api/bookings?clerkId=${userId}`);
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  };

  init();
}, [userId, user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">
          My Dashboard
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
          Track your bookings and activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Bookings"
          value={bookings.length}
          icon={<Calendar size={18} />}
          color="coral"
          change="+2 this month"
          positive
        />
        <StatsCard
          title="Confirmed"
          value={bookings.filter((b) => b.status === "confirmed").length}
          icon={<Calendar size={18} />}
          color="teal"
          change="Active"
          positive
        />
        <StatsCard
          title="Reviews Given"
          value={0}
          icon={<Star size={18} />}
          color="purple"
          change="This month"
          positive
        />
        <StatsCard
          title="Saved Places"
          value={0}
          icon={<Heart size={18} />}
          color="amber"
          change="Favourites"
          positive
        />
      </div>

      {/* Recent bookings */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-semibold text-stone-900 dark:text-white">
            Recent Bookings
          </h2>
          <Link
            href="/dashboard/bookings"
            className="text-sm flex items-center gap-1"
            style={{ color: "var(--color-primary)" }}
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-stone-400 text-sm mb-3">No bookings yet</p>
            <Link
              href="/explore"
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              Explore restaurants →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {bookings.slice(0, 5).map((b) => (
              <div key={b._id} className="flex items-center gap-4 p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 overflow-hidden flex-shrink-0">
                  {b.restaurantId?.images?.[0] && (
                    <img
                      src={b.restaurantId.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900 dark:text-white text-sm truncate">
                    {b.restaurantId?.name || "Restaurant"}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {b.date} at {b.time} · {b.guests} guests
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}