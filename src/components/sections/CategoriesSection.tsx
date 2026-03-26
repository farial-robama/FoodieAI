"use client";
import Link from "next/link";

const categories = [
  { name: "Bengali",    emoji: "🍛", color: "#FEF3C7" },
  { name: "Chinese",   emoji: "🥢", color: "#FCE7F3" },
  { name: "Italian",   emoji: "🍝", color: "#FEE2E2" },
  { name: "Japanese",  emoji: "🍱", color: "#E0E7FF" },
  { name: "Fast Food", emoji: "🍔", color: "#FEF9C3" },
  { name: "Pizza",     emoji: "🍕", color: "#FFE4E6" },
  { name: "Desserts",  emoji: "🍰", color: "#F3E8FF" },
  { name: "Coffee",    emoji: "☕", color: "#FEF3C7" },
  { name: "Thai",      emoji: "🌶️", color: "#DCFCE7" },
  { name: "Indian",    emoji: "🫓", color: "#FFF7ED" },
];

export default function CategoriesSection() {
  return (
    <section className="section-pad bg-white dark:bg-stone-950">
      <div className="container-pad">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-3">
            Browse by Cuisine
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            Explore restaurants by your favourite food type
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/explore?cuisine=${cat.name}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-[var(--color-primary)] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: cat.color }}
              >
                {cat.emoji}
              </div>
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-[var(--color-primary)] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}