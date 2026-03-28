import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "top-biryani-spots-dhaka",
    title: "Top 10 Biryani Spots in Dhaka You Must Try in 2025",
    excerpt: "From old Dhaka classics to modern fusion takes, we round up the best biryani restaurants that are worth every bite.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop",
    date: "March 15, 2025",
    readTime: "5 min",
    category: "Bengali",
    author: { name: "Tasnim R.", avatar: "https://i.pravatar.cc/40?img=47" },
  },
  {
    slug: "japanese-cuisine-bangladesh",
    title: "The Rise of Japanese Cuisine in Bangladesh",
    excerpt: "Japanese food is taking Dhaka by storm. We explore why sushi and ramen have become the go-to choice for young food lovers.",
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&auto=format&fit=crop",
    date: "March 10, 2025",
    readTime: "4 min",
    category: "Japanese",
    author: { name: "Arif H.", avatar: "https://i.pravatar.cc/40?img=12" },
  },
  {
    slug: "plan-perfect-dinner-date",
    title: "How to Plan the Perfect Dinner Date Using FoodieAI",
    excerpt: "Let our AI assistant do the work. Here's a step-by-step guide to planning a flawless romantic dinner with zero stress.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    date: "March 5, 2025",
    readTime: "3 min",
    category: "Tips",
    author: { name: "Nadia I.", avatar: "https://i.pravatar.cc/40?img=32" },
  },
  {
    slug: "best-street-food-dhaka",
    title: "Best Street Food Spots in Old Dhaka",
    excerpt: "Old Dhaka is a paradise for street food lovers. From fuchka to chotpoti, discover the hidden gems locals swear by.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    date: "Feb 28, 2025",
    readTime: "6 min",
    category: "Street Food",
    author: { name: "Rafiq A.", avatar: "https://i.pravatar.cc/40?img=11" },
  },
  {
    slug: "healthy-restaurants-dhaka",
    title: "5 Healthy Restaurants in Dhaka for the Health-Conscious Foodie",
    excerpt: "Eating healthy doesn't mean sacrificing taste. These five restaurants prove you can have both.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
    date: "Feb 20, 2025",
    readTime: "4 min",
    category: "Healthy",
    author: { name: "Priya S.", avatar: "https://i.pravatar.cc/40?img=48" },
  },
  {
    slug: "ai-food-recommendations",
    title: "How AI is Changing the Way We Discover Restaurants",
    excerpt: "Artificial intelligence is making it easier than ever to find your perfect meal. Here's how it works behind the scenes.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    date: "Feb 15, 2025",
    readTime: "5 min",
    category: "Technology",
    author: { name: "Karim H.", avatar: "https://i.pravatar.cc/40?img=14" },
  },
];

export default function BlogPage() {
  const featured = posts[0];
  const rest     = posts.slice(1);

  return (
    <div className="min-h-screen pt-20 bg-[var(--color-warm)] dark:bg-stone-950">

      {/* Header */}
      <section className="section-pad bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="container-pad">
          <p className="text-sm font-medium mb-2" style={{ color: "var(--color-primary)" }}>
            Food Stories
          </p>
          <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-3">Our Blog</h1>
          <p className="text-stone-500 dark:text-stone-400 max-w-lg">
            Discover food guides, restaurant reviews, and tips from our team of food lovers.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad space-y-10">

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Featured
                </span>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span
                  className="text-xs font-medium mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {featured.category}
                </span>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-4">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={featured.author.avatar} alt="" className="w-7 h-7 rounded-full" />
                    <div>
                      <p className="text-xs font-medium text-stone-700 dark:text-stone-300">{featured.author.name}</p>
                      <p className="text-xs text-stone-400">{featured.date}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-stone-400">
                    <Clock size={11} /> {featured.readTime} read
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
                  <h3 className="font-semibold text-stone-900 dark:text-white text-sm leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt="" className="w-6 h-6 rounded-full" />
                      <p className="text-xs text-stone-500">{post.author.name}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-stone-400">
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}