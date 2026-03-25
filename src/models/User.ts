import mongoose, { Schema } from "mongoose";
import { IUser } from "@/types";

const UserSchema = new Schema<IUser>(
  {
    clerkId:          { type: String, required: true, unique: true },
    name:             { type: String, required: true },
    email:            { type: String, required: true, unique: true },
    avatar:           { type: String },
    role:             { type: String, enum: ["user", "admin"], default: "user" },
    savedRestaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);