import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "@/types";

const MenuItemSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String, default: "" },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  image:       { type: String },
});

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name:         { type: String, required: true },
    slug:         { type: String, required: true, unique: true },
    description:  { type: String, required: true },
    cuisine:      { type: String, required: true },
    priceRange:   { type: Number, enum: [1, 2, 3, 4], required: true },
    rating:       { type: Number, default: 0, min: 0, max: 5 },
    reviewCount:  { type: Number, default: 0 },
    location:     { type: String, required: true },
    address:      { type: String, required: true },
    images:       [{ type: String }],
    isOpen:       { type: Boolean, default: true },
    openingHours: { open: { type: String }, close: { type: String } },
    menu:         [MenuItemSchema],
    featured:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);