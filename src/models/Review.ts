import mongoose, { Schema } from "mongoose";
import { IReview } from "@/types";

const ReviewSchema = new Schema<IReview>(
  {
    userId:       { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    rating:       { type: Number, required: true, min: 1, max: 5 },
    comment:      { type: String, required: true, minlength: 10 },
  },
  { timestamps: true }
);

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);