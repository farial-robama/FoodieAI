"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, name, ...props }, ref) => {
    const inputId = id || name || Math.random().toString(36).slice(2);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-stone-700 dark:text-stone-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            className={cn(
              "w-full rounded-xl border border-stone-200 dark:border-stone-700",
              "bg-white dark:bg-stone-900",
              "text-stone-900 dark:text-white placeholder:text-stone-400",
              "px-4 py-2.5 text-sm outline-none transition-all duration-200",
              "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon && "pl-10",
              error && "border-red-400 focus:border-red-400 focus:ring-red-200",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;