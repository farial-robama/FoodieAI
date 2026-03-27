import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Restaurant from "@/models/Restaurant";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const featured   = searchParams.get("featured");
    const sort       = searchParams.get("sort");
    const limit      = parseInt(searchParams.get("limit")  || "12");
    const page       = parseInt(searchParams.get("page")   || "1");
    const search     = searchParams.get("search");
    const cuisine    = searchParams.get("cuisine");
    const priceRange = searchParams.get("priceRange");
    const rating     = searchParams.get("rating");
    const location   = searchParams.get("location");
    const isOpen     = searchParams.get("isOpen");

    const query: Record<string, unknown> = {};
    if (featured === "true")  query.featured   = true;
    if (cuisine)              query.cuisine    = { $regex: cuisine,  $options: "i" };
    if (location)             query.location   = { $regex: location, $options: "i" };
    if (search)               query.name       = { $regex: search,   $options: "i" };
    if (priceRange)           query.priceRange = parseInt(priceRange);
    if (rating)               query.rating     = { $gte: parseFloat(rating) };
    if (isOpen === "true")    query.isOpen     = true;

    const sortOption =
      sort === "rating"  ? { rating: -1 }     :
      sort === "price"   ? { priceRange: 1 }  :
      sort === "newest"  ? { createdAt: -1 }  :
      { createdAt: -1 };

    const skip  = (page - 1) * limit;
    const total = await Restaurant.countDocuments(query);

    const restaurants = await Restaurant.find(query)
      .sort(sortOption as Record<string, 1 | -1>)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ restaurants, total, page, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body       = await req.json();
    const restaurant = await Restaurant.create(body);
    return NextResponse.json({ restaurant }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create restaurant" }, { status: 500 });
  }
}