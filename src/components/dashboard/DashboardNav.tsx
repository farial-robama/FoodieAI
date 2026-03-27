"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import { Menu, Bell } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function DashboardNav({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useUser();

  return (
    <header className="h-16 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 cursor-pointer"
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-sm font-semibold text-stone-900 dark:text-white">
            Welcome back, {user?.firstName || "there"} 👋
          </p>
          <p className="text-xs text-stone-400 hidden sm:block">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 relative cursor-pointer">
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}