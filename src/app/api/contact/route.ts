import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, project, selectedSystems, situation, budget, deadline, details } = body;

    // Resend API hívás
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Optimaai Weboldal <info@optimaai.eu>', // Élesben ezt saját domainre kell cserélni
        to: ['info@optimaai.eu'],
        subject: `Új projekt megkeresés: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h1 style="font-size: 24px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Új projekt megkeresés érkezett</h1>
            <p><strong>Név:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Cég/Projekt:</strong> ${project || '—'}</p>
            <p><strong>Rendszer típusa:</strong> ${selectedSystems.join(', ') || '—'}</p>
            <p><strong>Jelenlegi helyzet:</strong> ${situation || '—'}</p>
            <p><strong>Tervezett büdzsé:</strong> ${budget || '—'}</p>
            <p><strong>Határidő:</strong> ${deadline || '—'}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 4px;">
              <p><strong>Egyéb részletek:</strong></p>
              <p>${details || 'Nincs további részlet.'}</p>
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; pt: 10px;">
              Ez az üzenet az Optimaai weboldal kapcsolatfelvételi űrlapján keresztül érkezett.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Resend API hiba:", errorData);
      throw new Error("Sikertelen email küldés");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Hiba a kapcsolatfelvétel során:", error);
    return NextResponse.json(
      { error: "Hiba történt az üzenet küldése közben." },
      { status: 500 }
    );
  }
}
