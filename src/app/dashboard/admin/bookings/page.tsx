"use client";
import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import { Calendar, Clock, Users } from "lucide-react";

interface Booking {
  _id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  userId: { name: string; email: string };
  restaurantId: { name: string; cuisine: string };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((d) => { setBookings(d.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status } : b));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">Manage Bookings</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{bookings.length} total bookings</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "confirmed", "pending", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize cursor-pointer transition-colors ${
              filter === s ? "text-white" : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
            }`}
            style={filter === s ? { backgroundColor: "var(--color-primary)" } : {}}
          >
            {s} ({s === "all" ? bookings.length : bookings.filter((b) => b.status === s).length})
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                {["Restaurant", "Customer", "Date & Time", "Guests", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded bg-stone-100 dark:bg-stone-800 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-stone-400 text-sm">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b._id} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50">
                    <td className="px-4 py-3 text-sm font-medium text-stone-900 dark:text-white">
                      {b.restaurantId?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">
                      {b.userId?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">
                      <div className="flex items-center gap-1"><Calendar size={11} /> {b.date}</div>
                      <div className="flex items-center gap-1 mt-0.5"><Clock size={11} /> {b.time}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">
                      <span className="flex items-center gap-1"><Users size={11} /> {b.guests}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={b.status === "confirmed" ? "secondary" : b.status === "cancelled" ? "danger" : "warning"}>
                        {b.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {b.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus(b._id, "confirmed")}
                            className="text-xs px-2 py-1 rounded-lg text-white cursor-pointer"
                            style={{ backgroundColor: "var(--color-secondary)" }}
                          >
                            Confirm
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(b._id, "cancelled")}
                            className="text-xs px-2 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}