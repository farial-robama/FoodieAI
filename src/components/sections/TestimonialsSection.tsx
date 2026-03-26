"use client";
import StarRating from "@/components/ui/StarRating";

const testimonials = [
  {
    name: "Tasnim Rahman",
    role: "Food Blogger",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    review:
      "FoodieAI completely changed how I discover restaurants. The AI chatbot suggested a hidden gem in Dhanmondi I never would have found on my own. Absolutely love it!",
    restaurant: "Recommended: Kacchi Bhai",
  },
  {
    name: "Arif Hossain",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    review:
      "Booking a table used to be such a hassle. Now I just open FoodieAI, pick a time, and I'm done in 30 seconds. The review summaries save me so much time deciding where to go.",
    restaurant: "Recommended: Sakura Japanese",
  },
  {
    name: "Nadia Islam",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 5,
    review:
      "I used the AI assistant to plan a birthday dinner for 10 people with dietary restrictions. It gave me 3 perfect options with menus that worked for everyone. Incredible.",
    restaurant: "Recommended: Pizza Napoli",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-pad bg-white dark:bg-stone-950">
      <div className="container-pad">
        <div className="text-center mb-12">
          <p className="text-sm font-medium mb-1" style={{ color: "var(--color-primary)" }}>
            Real stories
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-3">
            What Our Users Say
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            Join thousands of food lovers who found their favourite restaurants with FoodieAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[var(--color-warm)] dark:bg-stone-900 hover:shadow-md transition-shadow duration-300"
            >
              <StarRating rating={t.rating} size={15} />
              <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed flex-1">
                "{t.review}"
              </p>
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                <p className="text-xs text-stone-400 mb-3">{t.restaurant}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-stone-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-stone-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}