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

      // Add contact to Resend segment
      const segmentId = process.env.RESEND_SEGMENT_ID;
      if (segmentId) {
        await resend.contacts.create({ email, segments: [segmentId] });
      }

      // Send confirmation email to the subscriber
      await resend.emails.send({
        from: "Blockchain@USC <newsletter@blockchainatusc.com>",
        to: email,
        subject: "You're on the list — Blockchain@USC",
        html: `
          <!DOCTYPE html>
          <html>
            <body style="margin:0;padding:0;background:#0a0a0a;font-family:monospace;color:#e5e5e5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
                <tr><td align="center">
                  <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #222;padding:40px;">
                    <tr><td>
                      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.15em;color:#888;text-transform:uppercase;">Blockchain@USC</p>
                      <h1 style="margin:0 0 24px;font-size:22px;font-weight:500;color:#fff;letter-spacing:-0.02em;">You're on the list.</h1>
                      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#aaa;">
                        You'll hear from us when we publish new research — protocol analysis, DeFi deep-dives, and ecosystem breakdowns on our
                        <a href="https://medium.com/blockchain-at-usc" style="color:#e8a0a0;text-decoration:none;">Medium</a>.
                      </p>
                      <p style="margin:0 0 32px;font-size:14px;line-height:1.6;color:#aaa;">
                        In the meantime, follow us to stay in the loop:
                      </p>
                      <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                        <tr>
                          <td style="padding-right:16px;">
                            <a href="https://x.com/0xBlockchainSC" style="display:inline-block;font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#e5e5e5;text-decoration:none;border:1px solid #333;padding:8px 14px;">X / Twitter</a>
                          </td>
                          <td style="padding-right:16px;">
                            <a href="https://www.instagram.com/blockchainatusc/" style="display:inline-block;font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#e5e5e5;text-decoration:none;border:1px solid #333;padding:8px 14px;">Instagram</a>
                          </td>
                          <td>
                            <a href="https://www.linkedin.com/company/trojancrypto/" style="display:inline-block;font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#e5e5e5;text-decoration:none;border:1px solid #333;padding:8px 14px;">LinkedIn</a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:0;font-size:12px;color:#555;border-top:1px solid #222;padding-top:24px;">
                        — Blockchain@USC &nbsp;·&nbsp; <a href="https://blockchainatusc.com" style="color:#555;text-decoration:none;">blockchainatusc.com</a>
                      </p>
                    </td></tr>
                  </table>
                </td></tr>
              </table>
            </body>
          </html>
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
