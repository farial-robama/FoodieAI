"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Calendar,
  Star,
  Heart,
  User,
  BarChart2,
  UtensilsCrossed,
  Users,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const userNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Saved", href: "/dashboard/saved", icon: Heart },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

const getFilteredUserNav = (isAdmin: boolean) =>
  isAdmin
    ? userNav.filter(({ label }) => label === "Profile")
    : userNav;

const adminNav = [
  { label: "Analytics", href: "/dashboard/admin", icon: BarChart2 },
  {
    label: "Restaurants",
    href: "/dashboard/admin/restaurants",
    icon: UtensilsCrossed,
  },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Bookings", href: "/dashboard/admin/bookings", icon: Calendar },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { userId, isLoaded } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    let attempts = 0;
    const tryFetch = async () => {
      try {
        const res = await fetch(`/api/users?clerkId=${userId}`);
        if (!res.ok) {
          if (attempts < 5) {
            attempts++;
            setTimeout(tryFetch, 1000);
          }
          return;
        }
        const data = await res.json();
        const admin = data.user?.role === "admin";
        setIsAdmin(admin);
        setChecked(true);

        // Fetch pending bookings count for admin badge
        if (admin) {
          const bRes = await fetch("/api/bookings");
          const bData = await bRes.json();
          const pending = (bData.bookings || []).filter(
            (b: { status: string }) => b.status === "pending",
          ).length;
          setPendingCount(pending);
        }
      } catch {
        if (attempts < 5) {
          attempts++;
          setTimeout(tryFetch, 1000);
        }
      }
    };

    tryFetch();
  }, [userId, isLoaded]);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <UtensilsCrossed size={15} className="text-white" />
          </div>
          <span className="text-stone-900 dark:text-white">
            Foodie<span style={{ color: "var(--color-primary)" }}>AI</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden text-stone-400 hover:text-stone-600 cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Role badge */}
      <div className="px-5 py-3">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: isAdmin ? "#FAECE7" : "#E1F5EE",
            color: isAdmin ? "#712B13" : "#085041",
          }}
        >
          {!checked ? "Loading..." : isAdmin ? "Admin" : "User"}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {!checked ? (
          // Skeleton loader while role is being fetched
          <div className="space-y-2 px-3 py-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-9 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* User nav section */}
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wide px-3 py-2">
              My Account
            </p>
            {getFilteredUserNav(isAdmin).map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  pathname === href
                    ? "text-white"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white",
                )}
                style={
                  pathname === href
                    ? { backgroundColor: "var(--color-primary)" }
                    : {}
                }
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}

            {/* Admin nav section */}
            {isAdmin && (
              <>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide px-3 py-2 mt-4">
                  Admin Panel
                </p>
                {adminNav.map(({ label, href, icon: Icon }) => {
                  const isPending = label === "Bookings" && pendingCount > 0;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        pathname === href
                          ? "text-white"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white",
                      )}
                      style={
                        pathname === href
                          ? { backgroundColor: "var(--color-primary)" }
                          : {}
                      }
                    >
                      <Icon size={16} />
                      <span className="flex-1">{label}</span>
                      {isPending && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white min-w-[18px] text-center"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          {pendingCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </>
            )}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-stone-200 dark:border-stone-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Website
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 fixed top-0 left-0 h-full z-40">
        <NavContent />
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 z-50 lg:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
