import { NextRequest, NextResponse } from "next/server";

const CHATBOT_PORT = 3098;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, message } = body;

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: "sessionId and message are required" },
        { status: 400 }
      );
    }

    // Try connecting to the chatbot mini-service (available in dev/local environments)
    const chatbotUrl = `http://localhost:${CHATBOT_PORT}/chat`;
    
    try {
      const response = await fetch(chatbotUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message }),
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
      }

      return NextResponse.json(data);
    } catch {
      // Chatbot service not available (e.g., on Vercel) — return a helpful fallback
      const fallbackResponses = [
        "ধন্যবাদ আপনার বার্তার জন্য! 🙏 দুঃখিত, আমি এই মুহূর্তে অফলাইনে আছি। অনুগ্রহ করে নিচের তথ্যগুলো দেখুন অথবা রেজিস্ট্রেশন ফর্ম পূরণ করুন।",
        "Thank you for your message! 🙏 I'm currently offline. Please check the event details below or fill out the registration form directly.",
      ];

      return NextResponse.json({
        reply: fallbackResponses[message.includes("?") || /[া-িীুূৃেৈোৌংং]/.test(message) ? 0 : 1],
        action: "general",
        quickInfo: {
          date: "Eid-ul-Azha 2026 (2nd or 3rd day)",
          venue: "Biral Adarsha High School Campus, Dinajpur",
          contact: "+8801705937212",
          email: "mohontobacklinks22@gmail.com",
          facebook: "facebook.com/bahs.dnj",
        },
      });
    }
  } catch (error) {
    console.error("[chatbot-proxy] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try the registration form directly." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    try {
      const chatbotUrl = `http://localhost:${CHATBOT_PORT}/reset`;
      await fetch(chatbotUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
        signal: AbortSignal.timeout(3000),
      });
    } catch {
      // Chatbot service not available — ignore reset
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reset conversation" },
      { status: 500 }
    );
  }
}
