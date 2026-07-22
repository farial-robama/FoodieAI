export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import "@/models/Restaurant";

// GET /api/saved?clerkId=xxx
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const clerkId = req.nextUrl.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json(
        { error: "Missing clerkId" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId })
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
        stack: error instanceof Error ? error.stack : null,
      },
      { status: 500 }
    );
  }
}

// POST /api/saved — toggles save/unsave
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { clerkId, restaurantId } = await req.json();

    if (!clerkId || !restaurantId) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const alreadySaved = user.savedRestaurants?.some(
      (id: any) => id.toString() === restaurantId
    );

    if (alreadySaved) {
      user.savedRestaurants = user.savedRestaurants.filter(
        (id: any) => id.toString() !== restaurantId
      );
    } else {
      user.savedRestaurants = [...(user.savedRestaurants || []), restaurantId];
    }

    await user.save();

    return NextResponse.json({
      saved: !alreadySaved,
    });
  } catch (error) {
    console.error("Saved POST error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : null,
      },
      { status: 500 }
    );
  }
}