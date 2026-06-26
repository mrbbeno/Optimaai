import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // 1. Send notification to optimaai.eu admin
    const adminEmail = await resend.emails.send({
      from: "CUE Subscription <info@optimaai.eu>",
      to: ["info@optimaai.eu"],
      subject: `New CUE Request from ${name}`,
      html: `
        <h2>New CUE Subscription Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    if (adminEmail.error) {
      console.error("Resend Admin Email Error:", adminEmail.error);
      return NextResponse.json({ error: adminEmail.error.message }, { status: 500 });
    }

    // 2. Send Awwwards-style confirmation to the client
    const clientHtml = `
      <div style="background-color: #030303; color: #ffffff; padding: 60px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #333333;">
        <h1 style="font-size: 48px; font-weight: 900; letter-spacing: -2px; margin-bottom: 20px; line-height: 1;">INITIATED.</h1>
        <p style="color: #888888; font-size: 16px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 40px;">Subscription Request Received</p>
        
        <p style="font-size: 18px; line-height: 1.6; color: #dddddd; margin-bottom: 20px;">
          Hi ${name},
        </p>
        <p style="font-size: 18px; line-height: 1.6; color: #dddddd; margin-bottom: 40px;">
          Your request to activate CUE has been successfully logged. We operate strictly asynchronously to guarantee speed and quality. 
        </p>
        
        <div style="height: 1px; background-color: #333333; margin-bottom: 40px;"></div>
        
        <p style="font-size: 14px; color: #666666; margin-bottom: 10px;">
          Next steps:
        </p>
        <ul style="color: #dddddd; font-size: 16px; padding-left: 20px; line-height: 1.8;">
          <li>We will review your request within 24 hours.</li>
          <li>You will receive an onboarding link to set up your Trello board.</li>
        </ul>
        
        <div style="margin-top: 60px;">
          <span style="font-size: 24px; font-weight: 900; letter-spacing: -1px;">CUE</span>
          <span style="font-size: 12px; color: #666666; margin-left: 10px; text-transform: uppercase; letter-spacing: 2px;">by OptimaAI</span>
        </div>
      </div>
    `;

    const clientEmail = await resend.emails.send({
      from: "CUE by OptimaAI <info@optimaai.eu>",
      to: [email],
      subject: "CUE: Subscription Initiated",
      html: clientHtml,
    });

    if (clientEmail.error) {
      console.error("Resend Client Email Error:", clientEmail.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
