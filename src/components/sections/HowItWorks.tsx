"use client";
import { Search, CalendarCheck, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search & Discover",
    description:
      "Browse 1,200+ restaurants by cuisine, location, price, or let our AI recommend the perfect spot for your mood.",
    color: "#FAECE7",
    iconColor: "var(--color-primary)",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book a Table",
    description:
      "Reserve your table in seconds. Choose your date, time, and number of guests with instant confirmation.",
    color: "#E1F5EE",
    iconColor: "var(--color-secondary)",
  },
  {
    icon: UtensilsCrossed,
    step: "03",
    title: "Enjoy Your Meal",
    description:
      "Arrive at your reserved table and enjoy a wonderful dining experience. Leave a review to help others discover great food.",
    color: "#EEF2FF",
    iconColor: "#6366F1",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white dark:bg-stone-950">
      <div className="container-pad">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-1" style={{ color: "var(--color-primary)" }}>
            Simple as 1-2-3
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-3">
            How FoodieAI Works
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            From discovery to dining — we make it effortless every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px border-t-2 border-dashed border-stone-200 dark:border-stone-800" />
              )}

              <div className="flex flex-col items-center gap-4">
                <div
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon size={32} style={{ color: step.iconColor }} />
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-500 flex items-center justify-center"
                  >
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}