import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Tri IQ Coaching <noreply@triiqcoaching.com>";
const COACH_EMAIL = "coachpete@triiqcoaching.com";

/** Escape HTML special characters to prevent XSS in email templates. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, topic, question } = body as {
      name?: string;
      email?: string;
      phone?: string;
      topic?: string;
      question?: string;
    };

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !question?.trim()) {
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

    // Sanitize all user input before inserting into HTML
    const s = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: phone?.trim() ? escapeHtml(phone) : "—",
      topic: topic?.trim() ? escapeHtml(topic) : "General question",
      question: escapeHtml(question),
    };

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
    td:first-child { color: #94a3b8; width: 30%; font-weight: 600; padding-right: 12px; }
    td:last-child { color: #f1f5f9; }
    .question { background: #0f172a; border-radius: 8px; padding: 14px; font-size: 14px; color: #cbd5e1; margin-top: 16px; white-space: pre-wrap; }
    .footer { text-align: center; padding: 20px 0 0; color: #475569; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="https://triiqcoaching.com/triiq-logo.png" alt="Tri IQ Coaching" style="height:36px;width:auto;background:#fff;padding:4px 10px;border-radius:6px;display:block;margin-bottom:14px;" />
      <h1>💬 New Question</h1>
      <p>Submitted via triiqcoaching.com</p>
    </div>
    <div class="body">
      <table>
        <tr><td>Name</td><td>${s.name}</td></tr>
        <tr><td>Email</td><td><a href="mailto:${s.email}" style="color:#22d3ee">${s.email}</a></td></tr>
        <tr><td>Phone</td><td>${s.phone}</td></tr>
        <tr><td>About</td><td>${s.topic}</td></tr>
      </table>
      <p style="color:#94a3b8;font-size:13px;font-weight:600;margin:20px 0 6px;">Question</p>
      <div class="question">${s.question}</div>
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
    h2 { font-size: 22px; font-weight: 800; color: #f1f5f9; margin: 0 0 12px; }
    p { font-size: 15px; color: #94a3b8; line-height: 1.65; margin: 0 0 16px; }
    .highlight { color: #f1f5f9; }
    .divider { border: none; border-top: 1px solid #334155; margin: 24px 0; }
    .question { background: #0f172a; border-radius: 8px; padding: 14px; font-size: 14px; color: #cbd5e1; white-space: pre-wrap; }
    .footer { text-align: center; padding: 24px 0 0; color: #475569; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div style="margin-bottom:24px;">
        <img src="https://triiqcoaching.com/triiq-logo.png" alt="Tri IQ Coaching" style="height:36px;width:auto;background:#fff;padding:4px 10px;border-radius:6px;display:block;" />
      </div>
      <h2>Got your question, ${escapeHtml(name.split(" ")[0])}! 👋</h2>
      <p>Thanks for reaching out — your coach will take a look and reply within <span class="highlight">24–48 hours</span>.</p>
      <hr class="divider" />
      <p style="font-size:13px;font-weight:600;color:#f1f5f9;margin:0 0 8px;">What you asked${topic?.trim() ? ` — ${s.topic}` : ""}:</p>
      <div class="question">${s.question}</div>
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
        subject: `New Question: ${s.name} — ${s.topic}`,
        html: coachHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "We got your question!",
        html: athleteHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/ask]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
