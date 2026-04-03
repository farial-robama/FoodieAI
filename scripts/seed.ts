import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import Restaurant from "../src/models/Restaurant";

const restaurants = [
  {
    name: "Kacchi Bhai", slug: "kacchi-bhai",
    description: "Famous for authentic Dhaka-style kacchi biryani cooked in traditional dum style with premium mutton.",
    cuisine: "Bengali", priceRange: 2, rating: 4.8, reviewCount: 312,
    location: "Dhaka", address: "Road 11, Dhanmondi, Dhaka",
    images: ["https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800"],
    isOpen: true, openingHours: { open: "11:00", close: "23:00" }, featured: true,
    menu: [
      { name: "Kacchi Biryani",    description: "Slow-cooked mutton biryani",   price: 280, category: "Main" },
      { name: "Borhani",           description: "Spiced yogurt drink",           price: 50,  category: "Drinks" },
      { name: "Shemai Dessert",    description: "Sweet vermicelli pudding",      price: 80,  category: "Desserts" },
    ],
  },
  {
    name: "Star Kabab", slug: "star-kabab",
    description: "Legendary Old Dhaka restaurant serving melt-in-mouth kababs since 1948. A must-visit for meat lovers.",
    cuisine: "Bengali", priceRange: 2, rating: 4.7, reviewCount: 289,
    location: "Dhaka", address: "Nawabpur Road, Old Dhaka",
    images: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800"],
    isOpen: true, openingHours: { open: "12:00", close: "22:00" }, featured: true,
    menu: [
      { name: "Shami Kabab",  description: "Crispy minced meat patties",   price: 180, category: "Starters" },
      { name: "Beef Rezala",  description: "Slow-cooked beef in white gravy", price: 220, category: "Main" },
    ],
  },
  {
    name: "Sakura Japanese", slug: "sakura-japanese",
    description: "Authentic Japanese cuisine with fresh sushi, ramen, and teppanyaki prepared by a Japanese chef.",
    cuisine: "Japanese", priceRange: 3, rating: 4.6, reviewCount: 156,
    location: "Dhaka", address: "Gulshan 2, Dhaka",
    images: ["https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800"],
    isOpen: true, openingHours: { open: "12:00", close: "22:30" }, featured: true,
    menu: [
      { name: "Salmon Sushi (8pc)", description: "Fresh Atlantic salmon nigiri", price: 650, category: "Sushi" },
      { name: "Tonkotsu Ramen",     description: "Rich pork bone broth ramen",   price: 480, category: "Ramen" },
    ],
  },
  {
    name: "Pizza Napoli", slug: "pizza-napoli",
    description: "Wood-fired Neapolitan pizza with imported Italian ingredients and authentic recipes from Naples.",
    cuisine: "Italian", priceRange: 3, rating: 4.5, reviewCount: 203,
    location: "Chittagong", address: "GEC Circle, Chittagong",
    images: ["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800"],
    isOpen: true, openingHours: { open: "11:00", close: "23:00" }, featured: false,
    menu: [
      { name: "Margherita",  description: "San Marzano tomato, buffalo mozzarella", price: 580, category: "Pizza" },
      { name: "Tiramisu",    description: "Classic Italian coffee dessert",          price: 220, category: "Desserts" },
    ],
  },
  {
    name: "Dragon Palace", slug: "dragon-palace",
    description: "Authentic Chinese cuisine with dim sum, Peking duck, and traditional wok-fried dishes.",
    cuisine: "Chinese", priceRange: 2, rating: 4.4, reviewCount: 178,
    location: "Dhaka", address: "Banani, Dhaka",
    images: ["https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800"],
    isOpen: true, openingHours: { open: "11:30", close: "22:00" }, featured: false,
    menu: [
      { name: "Dim Sum Basket",  description: "Assorted steamed dumplings",    price: 320, category: "Starters" },
      { name: "Kung Pao Chicken", description: "Spicy stir-fried chicken",     price: 350, category: "Main" },
    ],
  },
  {
    name: "Burger Barn", slug: "burger-barn",
    description: "Juicy smash burgers made with 100% local beef, served with hand-cut fries and milkshakes.",
    cuisine: "Fast Food", priceRange: 1, rating: 4.3, reviewCount: 445,
    location: "Dhaka", address: "Mirpur 10, Dhaka",
    images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"],
    isOpen: true, openingHours: { open: "10:00", close: "24:00" }, featured: false,
    menu: [
      { name: "Classic Smash Burger", description: "Double smash patty with special sauce", price: 280, category: "Burgers" },
      { name: "Loaded Fries",         description: "Fries with cheese sauce and jalapeños", price: 150, category: "Sides" },
    ],
  },
  {
    name: "Café Mishti", slug: "cafe-mishti",
    description: "Cozy café specializing in Bengali sweets, specialty coffee, and homemade pastries.",
    cuisine: "Coffee", priceRange: 1, rating: 4.6, reviewCount: 267,
    location: "Sylhet", address: "Zindabazar, Sylhet",
    images: ["https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800"],
    isOpen: true, openingHours: { open: "08:00", close: "22:00" }, featured: false,
    menu: [
      { name: "Mishti Doi",       description: "Sweetened yogurt dessert",   price: 80,  category: "Desserts" },
      { name: "Bengali Latte",    description: "Espresso with condensed milk", price: 120, category: "Coffee" },
    ],
  },
  {
    name: "Spice Garden", slug: "spice-garden",
    description: "Aromatic Indian cuisine featuring tandoor specialties, biryanis, and rich curries from North India.",
    cuisine: "Indian", priceRange: 2, rating: 4.5, reviewCount: 134,
    location: "Dhaka", address: "Uttara, Dhaka",
    images: ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"],
    isOpen: false, openingHours: { open: "12:00", close: "22:30" }, featured: false,
    menu: [
      { name: "Butter Chicken",  description: "Creamy tomato-based chicken curry", price: 380, category: "Main" },
      { name: "Garlic Naan",     description: "Freshly baked leavened bread",      price: 60,  category: "Bread" },
    ],
  },
  {
    name: "Bella Italia", slug: "bella-italia",
    description: "Authentic Italian trattoria serving handmade pasta, risotto, and classic Italian wines in a cozy atmosphere.",
    cuisine: "Italian", priceRange: 3, rating: 4.6, reviewCount: 189,
    location: "Dhaka", address: "Gulshan 1, Dhaka",
    images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"],
    isOpen: true, openingHours: { open: "12:00", close: "23:00" }, featured: true,
    menu: [
      { name: "Spaghetti Carbonara", description: "Classic Roman pasta with egg and pancetta", price: 520, category: "Pasta" },
      { name: "Penne Arrabbiata",    description: "Spicy tomato sauce pasta",                  price: 420, category: "Pasta" },
      { name: "Panna Cotta",         description: "Creamy Italian dessert with berry coulis",  price: 250, category: "Desserts" },
    ],
  },
  {
    name: "Seoul Kitchen", slug: "seoul-kitchen",
    description: "Authentic Korean BBQ and street food. Grill your own meat at the table with traditional banchan sides.",
    cuisine: "Korean", priceRange: 3, rating: 4.7, reviewCount: 142,
    location: "Dhaka", address: "Banani 11, Dhaka",
    images: ["https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800"],
    isOpen: true, openingHours: { open: "12:00", close: "23:30" }, featured: true,
    menu: [
      { name: "Korean BBQ Platter", description: "Assorted grilled meats with banchan",  price: 850, category: "BBQ" },
      { name: "Bibimbap",           description: "Mixed rice bowl with vegetables",       price: 380, category: "Main" },
      { name: "Kimchi Jjigae",      description: "Spicy kimchi stew with tofu and pork", price: 320, category: "Soups" },
    ],
  },
  {
    name: "Thai Orchid", slug: "thai-orchid",
    description: "Authentic Thai cuisine with rich curries, fresh pad thai, and traditional Thai desserts.",
    cuisine: "Thai", priceRange: 2, rating: 4.5, reviewCount: 167,
    location: "Dhaka", address: "Dhanmondi 15, Dhaka",
    images: ["https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800"],
    isOpen: true, openingHours: { open: "11:30", close: "22:30" }, featured: false,
    menu: [
      { name: "Pad Thai",        description: "Stir-fried rice noodles with shrimp",  price: 380, category: "Main" },
      { name: "Green Curry",     description: "Aromatic coconut milk green curry",     price: 420, category: "Curry" },
      { name: "Mango Sticky Rice", description: "Sweet glutinous rice with fresh mango", price: 180, category: "Desserts" },
    ],
  },
  {
    name: "Istanbul Kebab House", slug: "istanbul-kebab-house",
    description: "Authentic Turkish kebabs, mezze platters, and baklava in a warm, Mediterranean atmosphere.",
    cuisine: "Turkish", priceRange: 2, rating: 4.4, reviewCount: 98,
    location: "Chittagong", address: "Agrabad, Chittagong",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=800"],
    isOpen: true, openingHours: { open: "12:00", close: "23:00" }, featured: false,
    menu: [
      { name: "Adana Kebab",   description: "Spiced minced lamb on skewer",       price: 420, category: "Kebabs" },
      { name: "Hummus Platter", description: "Creamy chickpea dip with pita",    price: 220, category: "Mezze" },
      { name: "Baklava",        description: "Honey-soaked flaky pastry with nuts", price: 150, category: "Desserts" },
    ],
  },
  {
    name: "Taco Fiesta", slug: "taco-fiesta",
    description: "Vibrant Mexican restaurant with street-style tacos, nachos, and fresh guacamole.",
    cuisine: "Mexican", priceRange: 1, rating: 4.3, reviewCount: 211,
    location: "Dhaka", address: "Uttara Sector 7, Dhaka",
    images: ["https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800"],
    isOpen: true, openingHours: { open: "11:00", close: "23:00" }, featured: false,
    menu: [
      { name: "Chicken Tacos (3pc)", description: "Grilled chicken with salsa and guac",  price: 280, category: "Tacos" },
      { name: "Loaded Nachos",       description: "Tortilla chips with cheese and jalapeños", price: 320, category: "Starters" },
      { name: "Churros",             description: "Fried dough with chocolate dipping sauce", price: 180, category: "Desserts" },
    ],
  },
  {
    name: "Mezze House", slug: "mezze-house",
    description: "Lebanese and Middle Eastern cuisine with fresh mezze, shawarma, and grilled meats.",
    cuisine: "Lebanese", priceRange: 2, rating: 4.6, reviewCount: 123,
    location: "Sylhet", address: "Amberkhana, Sylhet",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=800"],
    isOpen: true, openingHours: { open: "11:00", close: "22:30" }, featured: false,
    menu: [
      { name: "Chicken Shawarma", description: "Slow-roasted chicken wrap with garlic sauce", price: 250, category: "Wraps" },
      { name: "Falafel Plate",    description: "Crispy chickpea patties with tahini",          price: 200, category: "Vegetarian" },
      { name: "Knafeh",           description: "Sweet cheese pastry soaked in syrup",          price: 160, category: "Desserts" },
    ],
  },
  {
    name: "Sushi Zen", slug: "sushi-zen",
    description: "Modern Japanese sushi bar with omakase options, fresh sashimi, and premium sake selection.",
    cuisine: "Japanese", priceRange: 4, rating: 4.9, reviewCount: 87,
    location: "Dhaka", address: "Gulshan 2 Circle, Dhaka",
    images: ["https://images.unsplash.com/photo-1553621042-f6e147245754?w=800"],
    isOpen: true, openingHours: { open: "13:00", close: "22:00" }, featured: true,
    menu: [
      { name: "Omakase Set (12pc)", description: "Chef's selection of premium nigiri",    price: 1800, category: "Omakase" },
      { name: "Tuna Sashimi (8pc)", description: "Fresh bluefin tuna slices",             price: 950,  category: "Sashimi" },
      { name: "Dragon Roll",        description: "Shrimp tempura topped with avocado",    price: 750,  category: "Rolls" },
    ],
  },
  {
    name: "Dhakai Nizami", slug: "dhakai-nizami",
    description: "Traditional Dhakai cuisine with authentic morog polao, beef bhuna, and old Dhaka specialties.",
    cuisine: "Bengali", priceRange: 2, rating: 4.7, reviewCount: 334,
    location: "Dhaka", address: "Puran Dhaka, Lalbagh",
    images: ["https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800"],
    isOpen: true, openingHours: { open: "11:00", close: "22:00" }, featured: true,
    menu: [
      { name: "Morog Polao",   description: "Aromatic chicken rice Dhakai style",    price: 320, category: "Main" },
      { name: "Beef Bhuna",    description: "Slow-cooked spiced beef",                price: 280, category: "Main" },
      { name: "Firni",         description: "Traditional rice pudding dessert",       price: 80,  category: "Desserts" },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(restaurants);
  console.log(`✅ Seeded ${restaurants.length} restaurants successfully`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });