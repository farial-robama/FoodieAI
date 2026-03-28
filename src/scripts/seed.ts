import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import Restaurant from "../models/Restaurant";

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
    images: ["https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800"],
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
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(restaurants);
  console.log(`✅ Seeded ${restaurants.length} restaurants successfully`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });