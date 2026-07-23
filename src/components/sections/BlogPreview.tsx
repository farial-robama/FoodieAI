"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { posts } from "@/lib/blog-posts";

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
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className="absolute top-3 left-3 z-10 text-xs font-medium px-2.5 py-1 rounded-full text-white"
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