import { UtensilsCrossed, Target, Heart, Zap } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const team = [
  { name: "Rafiq Ahmed",    role: "Founder & CEO",       avatar: "https://i.pravatar.cc/80?img=11" },
  { name: "Nusrat Jahan",   role: "Head of Product",     avatar: "https://i.pravatar.cc/80?img=47" },
  { name: "Karim Hassan",   role: "Lead Engineer",       avatar: "https://i.pravatar.cc/80?img=14" },
  { name: "Priya Sharma",   role: "AI & Data Science",   avatar: "https://i.pravatar.cc/80?img=48" },
];

const values = [
  { icon: Target, title: "Our Mission",   color: "#FAECE7", iconColor: "var(--color-primary)",   desc: "To make discovering great food effortless for everyone in Bangladesh through the power of AI and community reviews." },
  { icon: Heart,  title: "Our Vision",    color: "#E1F5EE", iconColor: "var(--color-secondary)", desc: "A world where no one ever has a bad meal — where every dining experience is informed, intentional, and memorable." },
  { icon: Zap,    title: "Our Approach",  color: "#EEEDFE", iconColor: "#534AB7",                desc: "We combine real user reviews with cutting-edge AI to give recommendations that feel personal, not algorithmic." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-[var(--color-warm)] dark:bg-stone-950">

      {/* Hero */}
      <section className="section-pad bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="container-pad text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <UtensilsCrossed size={28} className="text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 dark:text-white mb-4">
            About FoodieAI
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We started FoodieAI with one simple belief — finding a great restaurant should be as enjoyable as eating at one. Founded in Dhaka in 2024, we are on a mission to transform how people discover food.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad">
        <div className="container-pad">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white text-center mb-10">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 hover:shadow-md transition-shadow">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: v.color }}
                >
                  <v.icon size={22} style={{ color: v.iconColor }} />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad bg-white dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800">
        <div className="container-pad">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,200+", label: "Restaurants Listed" },
              { value: "50,000+", label: "Happy Users" },
              { value: "80+", label: "Cities Covered" },
              { value: "4.8★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold mb-1" style={{ color: "var(--color-primary)" }}>
                  {s.value}
                </p>
                <p className="text-stone-500 dark:text-stone-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad">
        <div className="container-pad">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white text-center mb-10">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 text-center hover:shadow-md transition-shadow">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3"
                />
                <p className="font-semibold text-stone-900 dark:text-white text-sm">{member.name}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <div className="container-pad text-center">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-3">
            Ready to discover great food?
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm">
            Join thousands of food lovers already using FoodieAI.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/explore">
              <Button variant="primary" size="lg">Explore Restaurants</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">Sign Up Free</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}