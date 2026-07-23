export interface BlogPost {
  title: string;
  excerpt: string;
  content: string; // full article body (plain paragraphs, split by \n\n)
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export const posts: BlogPost[] = [
  {
    title: "Top 10 Biryani Spots in Dhaka You Must Try in 2025",
    excerpt:
      "From old Dhaka classics to modern fusion takes, we round up the best biryani restaurants that are worth every bite.",
    content: `Dhaka's biryani scene is as diverse as the city itself, spanning generations-old Old Dhaka kitchens and modern fusion spots putting their own spin on the classic dish.

Whether you're after the deep, slow-cooked flavor of a traditional kacchi or a lighter, modern take, this city has something for every biryani lover. We've spent weeks eating our way through Dhaka to bring you this list.

Add your own restaurant recommendations and reviews right here on FoodieAI, and use our AI assistant to find biryani spots near you based on your exact taste and budget.`,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    category: "Bengali",
    slug: "top-biryani-spots-dhaka",
  },
  {
    title: "The Rise of Japanese Cuisine in Bangladesh",
    excerpt:
      "Japanese food is taking Dhaka by storm. We explore why sushi and ramen have become the go-to choice for young food lovers.",
    content: `Over the past few years, Japanese cuisine has quietly become one of the fastest-growing dining trends in Dhaka, particularly among younger diners in areas like Gulshan and Banani.

From casual ramen bars to upscale omakase experiences, the variety available today would have been unimaginable a decade ago.

Curious where to start? Ask our FoodieAI assistant for Japanese food recommendations near you, filtered by price range and specific dishes.`,
    image:
      "https://images.unsplash.com/photo-1554502078-ef0fc409efce?w=1200&auto=format&fit=crop",
    date: "Mar 10, 2025",
    readTime: "4 min read",
    category: "Japanese",
    slug: "japanese-cuisine-bangladesh",
  },
  {
    title: "How to Plan the Perfect Dinner Date Using FoodieAI",
    excerpt:
      "Let our AI assistant do the work. Here's a step-by-step guide to planning a flawless romantic dinner with zero stress.",
    content: `Planning a great dinner date is about more than just picking a restaurant — it's about the right atmosphere, the right timing, and a menu both people will love.

Our AI assistant can help narrow things down fast: just describe the vibe you're going for, your budget, and the area, and it'll suggest a shortlist worth considering.

Ready to plan your next date night? Open the FoodieAI chat assistant on any page and ask for a romantic dinner recommendation.`,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop",
    date: "Mar 5, 2025",
    readTime: "3 min read",
    category: "Tips",
    slug: "plan-perfect-dinner-date",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}