"use client";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  color: "coral" | "teal" | "purple" | "amber";
}

const colorMap = {
  coral:  { bg: "#FAECE7", icon: "var(--color-primary)" },
  teal:   { bg: "#E1F5EE", icon: "var(--color-secondary)" },
  purple: { bg: "#EEEDFE", icon: "#534AB7" },
  amber:  { bg: "#FAEEDA", icon: "#BA7517" },
};

export default function StatsCard({
  title, value, change, positive, icon, color,
}: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: colors.bg }}
        >
          <div style={{ color: colors.icon }}>{icon}</div>
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              positive
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
            )}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-stone-900 dark:text-white mb-1">{value}</p>
      <p className="text-sm text-stone-500 dark:text-stone-400">{title}</p>
    </div>
  );
}