export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import "@/models/Restaurant";

// GET /api/saved
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId })
      .populate(
        "savedRestaurants",
        "name cuisine images rating reviewCount location priceRange isOpen openingHours description"
      )
      .lean();

    return NextResponse.json({
      saved: user?.savedRestaurants || [],
    });
  } catch (error) {
    console.error("Saved GET error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        ...(process.env.NODE_ENV !== "production" && {
          stack: error instanceof Error ? error.stack : null,
        }),
      },
      { status: 500 }
    );
  }
}

// POST /api/saved — toggles save/unsave
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { restaurantId } = await req.json();

    if (!restaurantId || typeof restaurantId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid restaurantId" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return NextResponse.json(
        { error: "Invalid restaurantId" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId }).select(
      "savedRestaurants"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const alreadySaved = user.savedRestaurants?.some(
      (id: any) => id.toString() === restaurantId
    );

    await User.updateOne(
      { _id: user._id },
      alreadySaved
        ? { $pull: { savedRestaurants: restaurantId } }
        : { $addToSet: { savedRestaurants: restaurantId } }
    );

    return NextResponse.json({
      saved: !alreadySaved,
    });
  } catch (error) {
    console.error("Saved POST error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        ...(process.env.NODE_ENV !== "production" && {
          stack: error instanceof Error ? error.stack : null,
        }),
      },
      { status: 500 }
    );
  }
}