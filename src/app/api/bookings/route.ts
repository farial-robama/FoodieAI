import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const clerkId      = searchParams.get("clerkId");
    const restaurantId = searchParams.get("restaurantId");

    const query: Record<string, unknown> = {};

    if (clerkId) {
      const user = await User.findOne({ clerkId });
      if (!user) return NextResponse.json({ bookings: [] });
      query.userId = user._id;
    }

    if (restaurantId) query.restaurantId = restaurantId;

    const bookings = await Booking.find(query)
      .populate("restaurantId", "name images location cuisine")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Bookings GET error:", error);
    return NextResponse.json({ bookings: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { clerkId, restaurantId, date, time, guests, specialRequest } = body;

    // Find user
    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.create({ clerkId, name: "User", email: "", role: "user" });
    }

    
    if (user.role === "admin") {
      return NextResponse.json(
        { error: "Admins cannot make bookings. Please use a user account." },
        { status: 403 }
      );
    }

   
    const booking = await Booking.create({
      userId:         user._id,
      restaurantId,
      date,
      time,
      guests,
      specialRequest,
      status:         "pending", 
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Bookings POST error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}