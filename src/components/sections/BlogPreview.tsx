"use client";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    title: "Top 10 Biryani Spots in Dhaka You Must Try in 2025",
    excerpt: "From old Dhaka classics to modern fusion takes, we round up the best biryani restaurants that are worth every bite.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    category: "Bengali",
    slug: "top-biryani-spots-dhaka",
  },
  {
    title: "The Rise of Japanese Cuisine in Bangladesh",
    excerpt: "Japanese food is taking Dhaka by storm. We explore why sushi and ramen have become the go-to choice for young food lovers.",
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&auto=format&fit=crop",
    date: "Mar 10, 2025",
    readTime: "4 min read",
    category: "Japanese",
    slug: "japanese-cuisine-bangladesh",
  },
  {
    title: "How to Plan the Perfect Dinner Date Using FoodieAI",
    excerpt: "Let our AI assistant do the work. Here's a step-by-step guide to planning a flawless romantic dinner with zero stress.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop",
    date: "Mar 5, 2025",
    readTime: "3 min read",
    category: "Tips",
    slug: "plan-perfect-dinner-date",
  },
];

export default function BlogPreview() {
  return (
    <section className="section-pad bg-[var(--color-warm)] dark:bg-stone-900">
      <div className="container-pad">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--color-primary)" }}>
              Food stories
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              From Our Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
            style={{ color: "var(--color-primary)" }}
          >
            All articles <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1 gap-2">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-white text-sm leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}