import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");

    if (clerkId) {
      const user = await User.findOne({ clerkId }).lean();
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ user });
    }

    const users = await User.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Users GET error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { clerkId, name, email, avatar, role } = body;

    if (!clerkId) {
      return NextResponse.json({ error: "clerkId required" }, { status: 400 });
    }

    const existing = await User.findOne({ clerkId });
    if (existing) {
      return NextResponse.json({ user: existing });
    }

    const user = await User.create({
      clerkId,
      name:   name  || "User",
      email:  email || "",
      avatar: avatar || "",
      role:   role  || "user",
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Users POST error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { clerkId, ...updates } = body;

    const user = await User.findOneAndUpdate(
      { clerkId },
      updates,
      { new: true }
    );

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}