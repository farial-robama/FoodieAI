// src/app/dashboard/admin/restaurants/add/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CUISINES, LOCATIONS } from "@/constants";

export default function AddRestaurantPage() {
  const router = useRouter();
  const [loading,    setLoading]    = useState(false);
  const [aiLoading,  setAiLoading]  = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [form, setForm] = useState({
    name: "", description: "", cuisine: "Bengali",
    priceRange: 2, location: "Dhaka", address: "",
    openingHoursOpen: "11:00", openingHoursClose: "22:00",
    images: "", isOpen: true, featured: false,
  });

  const update = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const generateDescription = async () => {
    if (!form.name) return;
    setAiLoading(true);
    try {
      const res  = await fetch("/api/ai/generate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ restaurantName: form.name, cuisine: form.cuisine }),
      });
      const data = await res.json();
      if (data.description) update("description", data.description);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/restaurants", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images:       [form.images].filter(Boolean),
          openingHours: { open: form.openingHoursOpen, close: form.openingHoursClose },
        }),
      });
      if (res.ok) { setSuccess(true); router.push("/dashboard/admin/restaurants"); }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/admin/restaurants">
          <button className="w-9 h-9 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-500 hover:text-stone-700 cursor-pointer">
            <ArrowLeft size={16} />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-stone-900 dark:text-white">Add Restaurant</h1>
          <p className="text-stone-500 text-sm">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-5">

        <Input label="Restaurant Name *" value={form.name}
          onChange={(e) => update("name", e.target.value)} placeholder="e.g. Kacchi Bhai" required />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Description *</label>
            <button type="button" onClick={generateDescription} disabled={!form.name || aiLoading}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg text-white disabled:opacity-40 cursor-pointer"
              style={{ backgroundColor: "var(--color-secondary)" }}>
              {aiLoading
                ? <span className="animate-spin">⟳</span>
                : <Sparkles size={11} />}
              AI Generate
            </button>
          </div>
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
            rows={3} required placeholder="Describe the restaurant..."
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5 block">Cuisine</label>
            <select value={form.cuisine} onChange={(e) => update("cuisine", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer">
              {CUISINES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5 block">Price Range</label>
            <select value={form.priceRange} onChange={(e) => update("priceRange", Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer">
              <option value={1}>$ Budget</option>
              <option value={2}>$$ Moderate</option>
              <option value={3}>$$$ Upscale</option>
              <option value={4}>$$$$ Fine Dining</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5 block">Location</label>
            <select value={form.location} onChange={(e) => update("location", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm outline-none focus:border-[var(--color-primary)] cursor-pointer">
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <Input label="Address" value={form.address}
            onChange={(e) => update("address", e.target.value)} placeholder="Street, area" />
        </div>

        <Input label="Image URL" value={form.images}
          onChange={(e) => update("images", e.target.value)}
          placeholder="https://images.unsplash.com/..." />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Opening Time" type="time" value={form.openingHoursOpen}
            onChange={(e) => update("openingHoursOpen", e.target.value)} />
          <Input label="Closing Time" type="time" value={form.openingHoursClose}
            onChange={(e) => update("openingHoursClose", e.target.value)} />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isOpen}
              onChange={(e) => update("isOpen", e.target.checked)}
              className="rounded" />
            <span className="text-sm text-stone-700 dark:text-stone-300">Currently Open</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="rounded" />
            <span className="text-sm text-stone-700 dark:text-stone-300">Featured</span>
          </label>
        </div>

        <Button type="submit" variant="primary" loading={loading} className="w-full">
          Add Restaurant
        </Button>
      </form>
    </div>
  );
}