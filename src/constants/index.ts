export const CUISINES = [
  "Bengali", "Chinese", "Italian", "Japanese",
  "Fast Food", "Desserts", "Coffee", "Pizza",
  "Indian", "Thai", "Mexican", "Mediterranean",
];

export const LOCATIONS = [
  "Dhaka", "Chittagong", "Sylhet",
  "Rajshahi", "Khulna", "Comilla",
];

export const PRICE_LABELS: Record<number, string> = {
  1: "Budget (under ৳300)",
  2: "Moderate (৳300–600)",
  3: "Upscale (৳600–1000)",
  4: "Fine Dining (৳1000+)",
};

export const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Explore",   href: "/explore" },
  { label: "Blog",      href: "/blog" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
];

export const DASHBOARD_NAV = [
  { label: "Overview",    href: "/dashboard",           icon: "LayoutDashboard" },
  { label: "Bookings",    href: "/dashboard/bookings",  icon: "Calendar" },
  { label: "Reviews",     href: "/dashboard/reviews",   icon: "Star" },
  { label: "Saved",       href: "/dashboard/saved",     icon: "Heart" },
  { label: "Profile",     href: "/dashboard/profile",   icon: "User" },
];

export const ADMIN_NAV = [
  { label: "Analytics",    href: "/dashboard/admin",               icon: "BarChart2" },
  { label: "Restaurants",  href: "/dashboard/admin/restaurants",   icon: "UtensilsCrossed" },
  { label: "Users",        href: "/dashboard/admin/users",         icon: "Users" },
  { label: "Bookings",     href: "/dashboard/admin/bookings",      icon: "Calendar" },
  { label: "Settings",     href: "/dashboard/admin/settings",      icon: "Settings" },
];