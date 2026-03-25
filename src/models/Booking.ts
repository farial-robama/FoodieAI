import mongoose, { Schema } from "mongoose";
import { IBooking } from "@/types";

const BookingSchema = new Schema<IBooking>(
  {
    userId:         { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId:   { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    date:           { type: String, required: true },
    time:           { type: String, required: true },
    guests:         { type: Number, required: true, min: 1, max: 20 },
    status:         { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    specialRequest: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);