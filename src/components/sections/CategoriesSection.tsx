"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

function CategoryCard({
  cat,
  index,
  visible,
}: {
  cat: (typeof categories)[number];
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={cardRef}
      href={`/explore?cuisine=${cat.name}`}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden hover:border-[var(--color-primary)] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${
          index * 60
        }ms, border-color 0.3s, box-shadow 0.3s, translate 0.3s`,
      }}
    >
      {/* Cursor-following light */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(180px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--color-primary) 16%, transparent), transparent 70%)",
        }}
      />

      {/* Emoji badge with pulsing ring on hover */}
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-xl scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 ease-out"
          style={{ backgroundColor: cat.color }}
        />
        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 ease-out"
          style={{ backgroundColor: cat.color }}
        >
          {cat.emoji}
        </div>
      </div>

      <span className="relative text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-[var(--color-primary)] transition-colors">
        {cat.name}
      </span>
    </Link>
  );
}

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-pad bg-white dark:bg-stone-950">
      <div className="container-pad" ref={sectionRef}>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-3">
            Browse by Cuisine
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            Explore restaurants by your favourite food type
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}