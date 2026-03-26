import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Restaurant from "@/models/Restaurant";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const cuisine = searchParams.get("cuisine");

    const query: Record<string, unknown> = {};
    if (featured === "true") query.featured = true;
    if (cuisine) query.cuisine = { $regex: cuisine, $options: "i" };
    if (search) query.name = { $regex: search, $options: "i" };

    const sortOption =
      sort === "rating" ? { rating: -1 } :
      sort === "price"  ? { priceRange: 1 } :
      { createdAt: -1 };

    const restaurants = await Restaurant.find(query)
      .sort(sortOption as Record<string, 1 | -1>)
      .limit(limit)
      .lean();

    return NextResponse.json({ restaurants });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const restaurant = await Restaurant.create(body);
    return NextResponse.json({ restaurant }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create restaurant" }, { status: 500 });
  }
}