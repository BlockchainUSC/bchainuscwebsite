import { NextResponse } from "next/server";
import crypto from "crypto";

function getMailchimpDC(apiKey: string) {
  const parts = apiKey.split("-");
  if (parts.length < 2) {
    throw new Error("Invalid Mailchimp API key");
  }
  return parts[1];
}

function getSubscriberHash(email: string) {
  return crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error("[newsletter] Mailchimp env vars missing", {
        hasMailchimpKey: !!apiKey,
        hasAudienceId: !!audienceId,
      });

      return NextResponse.json(
        { error: "Newsletter service is not configured" },
        { status: 500 }
      );
    }

    const dc = getMailchimpDC(apiKey);
    const subscriberHash = getSubscriberHash(email);

    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email.trim().toLowerCase(),
          status_if_new: "subscribed",
          status: "subscribed",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[newsletter] Mailchimp error:", data);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    console.log("[newsletter] subscribed:", email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter] internal error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}