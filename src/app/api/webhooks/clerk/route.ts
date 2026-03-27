import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    await connectDB();

    if (type === "user.created") {
      const existingUser = await User.findOne({ clerkId: data.id });
      if (!existingUser) {
        await User.create({
          clerkId: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          email: data.email_addresses?.[0]?.email_address || "",
          avatar: data.image_url || "",
          role: "user",
        });
      }
    }

    if (type === "user.updated") {
      await User.findOneAndUpdate(
        { clerkId: data.id },
        {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address || "",
          avatar: data.image_url || "",
        }
      );
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}