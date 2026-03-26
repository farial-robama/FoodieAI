import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="container-pad text-center text-white">
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
          <Bot size={28} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 max-w-xl mx-auto">
          Let AI Find Your Perfect Restaurant
        </h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          Tell our AI what you're craving, your budget, and how many guests — it'll find the perfect spot in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/explore">
            <Button
              variant="ghost"
              size="lg"
              className="bg-white text-[var(--color-primary)] hover:bg-white/90 w-full sm:w-auto"
            >
              Browse Restaurants
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 w-full sm:w-auto"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}