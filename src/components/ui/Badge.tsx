import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gray" | "success" | "warning" | "danger";
  className?: string;
}

export default function Badge({ children, variant = "gray", className }: BadgeProps) {
  const variants = {
    primary:   "bg-[#FAECE7] text-[#712B13]",
    secondary: "bg-[#E1F5EE] text-[#085041]",
    gray:      "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
    success:   "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning:   "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    danger:    "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}