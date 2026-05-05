import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);

      // Add contact to Resend audience
      const audienceId = process.env.RESEND_AUDIENCE_ID;
      if (audienceId) {
        await resend.contacts.create({ email, audienceId });
      }

      // Send confirmation email to the subscriber
      await resend.emails.send({
        from: "Blockchain@USC <newsletter@blockchainatusc.com>",
        to: email,
        subject: "You're on the list — Blockchain@USC",
        html: `
          <p>Hey,</p>
          <p>You're now subscribed to research updates from <strong>Blockchain@USC</strong>.</p>
          <p>We publish protocol analysis, DeFi research, and ecosystem deep-dives on our <a href="https://medium.com/blockchain-at-usc">Medium</a>.</p>
          <p>— Blockchain@USC</p>
        `,
      });
    } else {
      // No Resend configured — log for development
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
