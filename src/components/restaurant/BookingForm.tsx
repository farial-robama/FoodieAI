"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, CheckCircle2 } from "lucide-react";
import { IRestaurant } from "@/types";
import Button from "@/components/ui/Button";

export default function BookingForm({ restaurant }: { restaurant: IRestaurant }) {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const [date,    setDate]    = useState("");
  const [time,    setTime]    = useState("");
  const [guests,  setGuests]  = useState(2);
  const [note,    setNote]    = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  const timeSlots = ["11:00", "12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"];

  const handleBook = async () => {
    if (!isSignedIn) { router.push("/login"); return; }
    if (!date || !time) { setError("Please select date and time"); return; }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId:        userId,
          restaurantId:   restaurant._id,
          date, time, guests,
          specialRequest: note,
        }),
      });
      if (res.ok) setSuccess(true);
      else        setError("Booking failed. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={24} className="text-green-600 dark:text-green-400" />
        </div>
        <p className="font-semibold text-stone-900 dark:text-white mb-1">Booking Confirmed!</p>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
          Table for {guests} on {date} at {time}
        </p>
        <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>
          Book Another Table
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
      <h3 className="font-semibold text-stone-900 dark:text-white mb-5">
        Reserve a Table
      </h3>

      <div className="space-y-4">
        {/* Date */}
        <div>
          <label className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 flex items-center gap-1">
            <Calendar size={12} /> Date
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
          />
        </div>

        {/* Time */}
        <div>
          <label className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 flex items-center gap-1">
            <Clock size={12} /> Time
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setTime(slot)}
                className={`py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  time === slot
                    ? "text-white"
                    : "border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-[var(--color-primary)]"
                }`}
                style={time === slot ? { backgroundColor: "var(--color-primary)" } : {}}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 flex items-center gap-1">
            <Users size={12} /> Guests
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-9 h-9 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:border-[var(--color-primary)] transition-colors cursor-pointer font-bold"
            >
              −
            </button>
            <span className="text-lg font-semibold text-stone-900 dark:text-white w-6 text-center">
              {guests}
            </span>
            <button
              onClick={() => setGuests(Math.min(20, guests + 1))}
              className="w-9 h-9 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:border-[var(--color-primary)] transition-colors cursor-pointer font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Special request */}
        <div>
          <label className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 block">
            Special Request (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Allergies, celebrations, seating preference..."
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <Button
          onClick={handleBook}
          variant="primary"
          size="md"
          loading={loading}
          className="w-full"
        >
          {isSignedIn ? "Confirm Booking" : "Login to Book"}
        </Button>
      </div>
    </div>
  );
}