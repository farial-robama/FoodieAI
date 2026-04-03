import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "FoodieAI",
        },
        body: JSON.stringify({
          model: "qwen/qwen3.6-plus:free",
          messages: [
            {
              role: "system",
              content: `You are FoodieAI, a friendly and helpful food assistant for a restaurant discovery platform in Bangladesh. 
Help users find great restaurants based on their preferences. Be friendly, concise, and suggest 2-3 options when recommending.
Always mention cuisine type, price range, and why you recommend it.
If asked about non-food topics, politely redirect to food and restaurants.
Keep responses under 100 words.`,
            },
            ...messages,
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter error:", errorData);
      return NextResponse.json(
        {
          message:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
        { status: 200 },
      );
    }

    const data = await response.json();
    const message =
      data.choices?.[0]?.message?.content ||
      "I couldn't process that. Please try again.";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 200 },
    );
  }
}
