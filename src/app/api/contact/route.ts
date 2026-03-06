import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Tri IQ Coaching <noreply@triiqcoaching.com>";
const COACH_EMAIL = "coachpete@triiqcoaching.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      interest,
      fitnessLevel,
      goalRace,
      targetDate,
      referral,
      notes,
    } = body as {
      name?: string;
      email?: string;
      phone?: string;
      interest?: string;
      fitnessLevel?: string;
      goalRace?: string;
      targetDate?: string;
      referral?: string;
      notes?: string;
    };

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !interest?.trim() || !fitnessLevel?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── Coach notification email ──────────────────────────────────────────────

    const coachHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .header { background: #0e7490; border-radius: 12px 12px 0 0; padding: 24px 28px; }
    .header h1 { color: #fff; font-size: 20px; font-weight: 800; margin: 0 0 4px; }
    .header p { color: #a5f3fc; font-size: 13px; margin: 0; }
    .body { background: #1e293b; border-radius: 0 0 12px 12px; padding: 28px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    td { padding: 10px 0; border-bottom: 1px solid #334155; font-size: 14px; vertical-align: top; }
    td:first-child { color: #94a3b8; width: 40%; font-weight: 600; padding-right: 12px; }
    td:last-child { color: #f1f5f9; }
    .notes { background: #0f172a; border-radius: 8px; padding: 14px; font-size: 14px; color: #cbd5e1; margin-top: 16px; white-space: pre-wrap; }
    .footer { text-align: center; padding: 20px 0 0; color: #475569; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🏊‍♂️ New Coaching Inquiry</h1>
      <p>Submitted via triiqcoaching.com</p>
    </div>
    <div class="body">
      <table>
        <tr><td>Name</td><td>${name}</td></tr>
        <tr><td>Email</td><td><a href="mailto:${email}" style="color:#22d3ee">${email}</a></td></tr>
        <tr><td>Phone</td><td>${phone || "—"}</td></tr>
        <tr><td>Coaching Interest</td><td>${interest}</td></tr>
        <tr><td>Fitness Level</td><td>${fitnessLevel}</td></tr>
        <tr><td>Goal Race / Event</td><td>${goalRace || "—"}</td></tr>
        <tr><td>Target Date</td><td>${targetDate || "—"}</td></tr>
        <tr><td>How They Found Us</td><td>${referral || "—"}</td></tr>
      </table>
      ${
        notes
          ? `<p style="color:#94a3b8;font-size:13px;font-weight:600;margin:20px 0 6px;">Additional Notes</p>
             <div class="notes">${notes}</div>`
          : ""
      }
    </div>
    <div class="footer">Tri IQ Coaching · triiqcoaching.com</div>
  </div>
</body>
</html>`;

    // ── Athlete confirmation email ────────────────────────────────────────────

    const athleteHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 0; }
    .wrapper { max-width: 520px; margin: 0 auto; padding: 40px 24px; }
    .card { background: #1e293b; border-radius: 16px; padding: 36px 32px; }
    .logo { font-size: 22px; font-weight: 900; color: #22d3ee; margin-bottom: 24px; }
    h2 { font-size: 22px; font-weight: 800; color: #f1f5f9; margin: 0 0 12px; }
    p { font-size: 15px; color: #94a3b8; line-height: 1.65; margin: 0 0 16px; }
    .highlight { color: #f1f5f9; }
    .divider { border: none; border-top: 1px solid #334155; margin: 24px 0; }
    .cta { display: inline-block; background: #0e7490; color: #fff !important; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 50px; text-decoration: none; }
    .footer { text-align: center; padding: 24px 0 0; color: #475569; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="logo">Tri IQ</div>
      <h2>We got your info, ${name.split(" ")[0]}! 👋</h2>
      <p>Thanks for reaching out. Coach Pete will review your intake and get back to you within <span class="highlight">24–48 hours</span> to talk next steps.</p>
      <p>In the meantime, feel free to check out the <a href="https://triiqcoaching.com/coaching" style="color:#22d3ee">coaching services page</a> or <a href="https://triiqcoaching.com/coaches" style="color:#22d3ee">meet the coaches</a>.</p>
      <hr class="divider" />
      <p style="font-size:13px;">What you submitted:</p>
      <p style="font-size:13px;margin:0;"><strong style="color:#f1f5f9;">Interest:</strong> ${interest}<br /><strong style="color:#f1f5f9;">Fitness Level:</strong> ${fitnessLevel}${goalRace ? `<br /><strong style="color:#f1f5f9;">Goal Race:</strong> ${goalRace}` : ""}</p>
    </div>
    <div class="footer">© ${new Date().getFullYear()} Tri IQ Coaching, LLC · <a href="https://triiqcoaching.com" style="color:#475569">triiqcoaching.com</a></div>
  </div>
</body>
</html>`;

    // ── Send both emails ──────────────────────────────────────────────────────

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: COACH_EMAIL,
        subject: `New Coaching Inquiry: ${name} — ${interest}`,
        html: coachHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "We received your Tri IQ inquiry!",
        html: athleteHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
