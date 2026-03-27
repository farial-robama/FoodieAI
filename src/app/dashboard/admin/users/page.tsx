"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { IUser } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users,   setUsers]   = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((d) => { setUsers(d.users || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">Manage Users</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{users.length} registered users</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)]"
        />
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                {["User", "Email", "Role", "Joined"].map((h) => (
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
                    {Array.from({ length: 4 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded bg-stone-100 dark:bg-stone-800 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-stone-400 text-sm">No users found</td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u._id} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs font-bold text-stone-600 dark:text-stone-300 flex-shrink-0 overflow-hidden">
                          {u.avatar
                            ? <img src={u.avatar} alt="" className="w-full h-full object-cover" />
                            : u.name[0]?.toUpperCase()
                          }
                        </div>
                        <span className="text-sm font-medium text-stone-900 dark:text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 dark:text-stone-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant={u.role === "admin" ? "primary" : "gray"}>{u.role}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-500">{formatDate(u.createdAt)}</td>
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