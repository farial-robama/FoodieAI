import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import Restaurant from "../models/Restaurant";

const restaurants = [
  {
    name: "Kacchi Bhai",
    slug: "kacchi-bhai",
    description: "Famous for authentic Dhaka-style kacchi biryani cooked in traditional dum style.",
    cuisine: "Bengali",
    priceRange: 2,
    rating: 4.8,
    reviewCount: 312,
    location: "Dhaka",
    address: "Road 11, Dhanmondi, Dhaka",
    images: ["https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800"],
    isOpen: true,
    openingHours: { open: "11:00", close: "23:00" },
    featured: true,
    menu: [
      { name: "Kacchi Biryani", description: "Slow-cooked mutton biryani", price: 280, category: "Main" },
      { name: "Borhani", description: "Spiced yogurt drink", price: 50, category: "Drinks" },
    ],
  },
  {
    name: "Star Kabab",
    slug: "star-kabab",
    description: "Legendary Old Dhaka restaurant serving melt-in-mouth kababs since 1948.",
    cuisine: "Bengali",
    priceRange: 2,
    rating: 4.7,
    reviewCount: 289,
    location: "Dhaka",
    address: "Nawabpur Road, Old Dhaka",
    images: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800"],
    isOpen: true,
    openingHours: { open: "12:00", close: "22:00" },
    featured: true,
    menu: [
      { name: "Shami Kabab", description: "Crispy minced meat patties", price: 180, category: "Starters" },
      { name: "Beef Rezala", description: "Slow-cooked beef in white gravy", price: 220, category: "Main" },
    ],
  },
  {
    name: "Sakura Japanese",
    slug: "sakura-japanese",
    description: "Authentic Japanese cuisine with fresh sushi, ramen, and teppanyaki.",
    cuisine: "Japanese",
    priceRange: 3,
    rating: 4.6,
    reviewCount: 156,
    location: "Dhaka",
    address: "Gulshan 2, Dhaka",
    images: ["https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800"],
    isOpen: true,
    openingHours: { open: "12:00", close: "22:30" },
    featured: true,
    menu: [
      { name: "Salmon Sushi (8pc)", description: "Fresh Atlantic salmon nigiri", price: 650, category: "Sushi" },
      { name: "Tonkotsu Ramen", description: "Rich pork bone broth ramen", price: 480, category: "Ramen" },
    ],
  },
  {
    name: "Pizza Napoli",
    slug: "pizza-napoli",
    description: "Wood-fired Neapolitan pizza with imported Italian ingredients.",
    cuisine: "Italian",
    priceRange: 3,
    rating: 4.5,
    reviewCount: 203,
    location: "Chittagong",
    address: "GEC Circle, Chittagong",
    images: ["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800"],
    isOpen: true,
    openingHours: { open: "11:00", close: "23:00" },
    featured: false,
    menu: [
      { name: "Margherita", description: "San Marzano tomato, buffalo mozzarella", price: 580, category: "Pizza" },
      { name: "Tiramisu", description: "Classic Italian coffee dessert", price: 220, category: "Desserts" },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(restaurants);
  console.log("✅ Seeded", restaurants.length, "restaurants");
  process.exit(0);
}

seed().catch(console.error);