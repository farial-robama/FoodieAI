import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { restaurantName, reviews } = await req.json();

    if (!reviews || reviews.length === 0) {
      return NextResponse.json({ summary: "No reviews available to summarize." });
    }

    const reviewText = reviews
      .map((r: { rating: number; comment: string }) => `Rating: ${r.rating}/5 — ${r.comment}`)
      .join("\n");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type":  "application/json",
        "HTTP-Referer":  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role:    "user",
            content: `Summarize these reviews for "${restaurantName}" in exactly 3 sentences. Cover: 1) best dishes or food quality, 2) ambiance and service, 3) value for money. Be specific and helpful.\n\nReviews:\n${reviewText}`,
          },
        ],
        max_tokens: 200,
      }),
    });

    const data    = await response.json();
    const summary = data.choices?.[0]?.message?.content || "Could not generate summary.";
    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}