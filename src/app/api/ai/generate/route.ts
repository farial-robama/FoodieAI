import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { restaurantName, cuisine } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type":  "application/json",
        "HTTP-Referer":  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{
          role:    "user",
          content: `Write a 2-sentence appetizing restaurant description for "${restaurantName}", a ${cuisine} restaurant. Be specific, mouth-watering, and mention what makes it special. No fluff, just great copy.`,
        }],
        max_tokens: 100,
      }),
    });

    const data        = await response.json();
    const description = data.choices?.[0]?.message?.content || "";
    return NextResponse.json({ description });
  } catch {
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}