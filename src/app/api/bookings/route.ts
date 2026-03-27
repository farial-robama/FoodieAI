import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");
    const restaurantId = searchParams.get("restaurantId");

    const query: Record<string, unknown> = {};

    if (clerkId) {
      const user = await User.findOne({ clerkId });
      if (user) query.userId = user._id;
    }
    if (restaurantId) query.restaurantId = restaurantId;

    const bookings = await Booking.find(query)
      .populate("restaurantId", "name images location cuisine")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { clerkId, restaurantId, date, time, guests, specialRequest } = body;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const booking = await Booking.create({
      userId: user._id,
      restaurantId,
      date,
      time,
      guests,
      specialRequest,
      status: "confirmed",
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}