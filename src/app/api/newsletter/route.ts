import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const formspreeId = process.env.FORMSPREE_ID;

    if (formspreeId) {
      // Forward to Formspree
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to submit" },
          { status: 500 }
        );
      }
    } else {
      // No Formspree configured — log to console for development
      console.log("[newsletter] New signup:", email);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
