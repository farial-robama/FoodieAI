import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import HowItWorks from "@/components/sections/HowItWorks";
import StatsSection from "@/components/sections/StatsSection";
import TopRatedSection from "@/components/sections/TopRatedSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreview from "@/components/sections/BlogPreview";
import NewsletterSection from "@/components/sections/NewsletterSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <HowItWorks />
      <StatsSection />
      <TopRatedSection />
      <TestimonialsSection />
      <BlogPreview />
      <NewsletterSection />
      <CTASection />
    </main>
  );
}