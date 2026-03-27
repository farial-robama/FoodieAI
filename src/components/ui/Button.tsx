"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className,
  disabled,
  type = "button",
  style,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants: Record<string, string> = {
    primary:   "text-white active:scale-95",
    secondary: "text-white active:scale-95",
    outline:   "border text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white active:scale-95",
    ghost:     "bg-transparent text-stone-700 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95",
    danger:    "bg-red-500 hover:bg-red-600 text-white active:scale-95",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const inlineStyles: Record<string, React.CSSProperties> = {
    primary:   { backgroundColor: "var(--color-primary)", ...style },
    secondary: { backgroundColor: "var(--color-secondary)", ...style },
    outline:   { borderColor: "var(--color-primary)", ...style },
    ghost:     { ...style },
    danger:    { ...style },
  };

  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      style={inlineStyles[variant]}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}