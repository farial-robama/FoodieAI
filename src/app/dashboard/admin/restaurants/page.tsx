"use client";
import { useEffect, useState } from "react";
import { Search, Trash2, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { IRestaurant } from "@/types";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);

  const fetchData = async (p = 1, q = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: "10" });
      if (q) params.set("search", q);
      const res  = await fetch(`/api/restaurants?${params}`);
      const data = await res.json();
      setRestaurants(data.restaurants || []);
      setTotalPages(data.totalPages  || 1);
      setPage(p);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this restaurant?")) return;
    await fetch(`/api/restaurants/${id}`, { method: "DELETE" });
    fetchData(page, search);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-900 dark:text-white">Manage Restaurants</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{restaurants.length} restaurants</p>
        </div>
        <Link href="/dashboard/admin/restaurants/add">
          <Button variant="primary" size="sm">
            <Plus size={15} /> Add Restaurant
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); fetchData(1, e.target.value); }}
          placeholder="Search restaurants..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)]"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                {["Restaurant", "Cuisine", "Location", "Rating", "Price", "Status", ""].map((h) => (
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
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded bg-stone-100 dark:bg-stone-800 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : restaurants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-stone-400 text-sm">
                    No restaurants found
                  </td>
                </tr>
              ) : (
                restaurants.map((r) => (
                  <tr key={r._id} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                          {r.images?.[0] && <img src={r.images[0]} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <span className="text-sm font-medium text-stone-900 dark:text-white truncate max-w-[140px]">
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">{r.cuisine}</td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">{r.location}</td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">⭐ {r.rating}</td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">{formatPrice(r.priceRange)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={r.isOpen ? "secondary" : "danger"}>
                        {r.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-stone-200 dark:border-stone-800">
            <p className="text-xs text-stone-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => fetchData(page - 1, search)}>Prev</Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => fetchData(page + 1, search)}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}