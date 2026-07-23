import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { posts, getPostBySlug } from "@/lib/blog-posts";
import ReadingProgressBar from "./ReadingProgressBar";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const paragraphs = post.content.split("\n\n");

  return (
    <article>
      <ReadingProgressBar />

      {/* Hero */}
      <div className="relative h-[52vh] min-h-[380px] max-h-[560px] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/10" />

        <div className="absolute inset-x-0 top-0 p-5 sm:p-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} /> All articles
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <div className="container-pad max-w-3xl mx-auto">
            <span
              className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full text-white mb-3 tracking-wide uppercase"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span className="flex items-center gap-1">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="section-pad">
        <div className="container-pad max-w-3xl mx-auto">
          <div>
            {paragraphs.map((paragraph, i) =>
              i === 0 ? (
                <p
                  key={i}
                  className="text-stone-700 dark:text-stone-300 leading-[1.8] mb-6 text-[1.05rem]"
                >
                  <span
                    className="text-6xl font-bold float-left mr-3 mt-1 leading-[0.8]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {paragraph.charAt(0)}
                  </span>
                  {paragraph.slice(1)}
                </p>
              ) : (
                <p
                  key={i}
                  className="text-stone-700 dark:text-stone-300 leading-[1.8] mb-6 text-[1.05rem]"
                >
                  {paragraph}
                </p>
              )
            )}
          </div>

          {/* Chat CTA */}
          <div
            className="mt-10 rounded-2xl p-6 flex items-start gap-4 border border-stone-200 dark:border-stone-800"
            style={{ backgroundColor: "var(--color-warm)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-stone-900 dark:text-white text-sm mb-1">
                Want personalized picks like these?
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Open the FoodieAI assistant and ask for recommendations
                tailored to your taste, budget, and neighborhood.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="border-t border-stone-200 dark:border-stone-800 section-pad bg-[var(--color-warm)] dark:bg-stone-900">
          <div className="container-pad max-w-3xl mx-auto">
            <p className="text-sm font-medium mb-5 text-stone-500 dark:text-stone-400">
              Keep reading
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-900 dark:text-white text-sm leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1.5">
                      {p.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}