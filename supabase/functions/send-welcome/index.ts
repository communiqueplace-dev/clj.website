/* C.L Khanna Jewellers — Edge Function: send-welcome
   Sends a fixed welcome email via Resend to a given address.
   Recipient is the only variable; the email content is hardcoded here
   so this function cannot be used to relay arbitrary messages.

   Required secret (set in Supabase Dashboard → Settings → Edge Functions → Secrets):
     RESEND_API_KEY  — your Resend API key

   Required Resend setup:
     FROM_ADDRESS below must match a domain you have verified in Resend.
     e.g. verify clkhannajewellers.com and set FROM_ADDRESS to
     "C.L Khanna Jewellers <hello@clkhannajewellers.com>"
*/

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";

// For testing: onboarding@resend.dev works immediately but only sends to your Resend account email.
// For production: verify a domain in Resend and change this to e.g. "C.L Khanna Jewellers <hello@clkhannajewellers.com>"
const FROM_ADDRESS = "C.L Khanna Jewellers <hello@mail.clkhannajewellers.in>";

const SUBJECT = "Welcome to C.L Khanna Jewellers";

const HTML_BODY = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#f8f4ec;font-family:Georgia,serif;color:#15130e}
  .wrap{max-width:540px;margin:40px auto;background:#fff;border:1px solid #e6dec9;padding:48px 40px}
  h1{font-size:1.4rem;font-weight:400;letter-spacing:.05em;margin:0 0 20px;color:#9a7740}
  p{font-size:.97rem;line-height:1.78;margin:0 0 16px}
  a{color:#9a7740}
  .sig{font-style:italic;color:#9a7740;margin-top:28px}
  .foot{margin-top:32px;font-size:.78rem;color:#9a9080;border-top:1px solid #e6dec9;padding-top:16px}
</style>
</head>
<body>
<div class="wrap">
  <h1>Welcome to C.L Khanna Jewellers</h1>
  <p>Thank you for joining us — we are delighted to have you.</p>
  <p>At C.L Khanna, every piece is crafted with intention: hand-set polki chokers, BIS hallmarked gold, and diamond jewellery made for real celebrations. Whether you are shopping for a wedding, a gift, or simply yourself, we look forward to helping you find something beautiful.</p>
  <p>Explore the collection at <a href="https://communiqueplace-dev.github.io/clj.website/">clkhannajewellers.com</a>, or visit us in person at 8 Dilawari Street, Lawrence Road, Amritsar.</p>
  <p class="sig">With warmth,<br>The C.L Khanna Jewellers family</p>
  <div class="foot">
    C.L Khanna Jewellers &nbsp;·&nbsp; 8 Dilawari Street, Lawrence Road, Amritsar<br>
    <a href="tel:+919815605373">+91 98156 05373</a> &nbsp;·&nbsp;
    <a href="https://www.instagram.com/clkhanna_jewellers/">@clkhanna_jewellers</a>
  </div>
</div>
</body>
</html>`;

const ALLOWED_ORIGIN = "https://clkhannajewellers.in";

const CORS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: CORS });
  }

  let email: string;
  try {
    const body = await req.json();
    email = String(body.email ?? "").trim().toLowerCase();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY secret is not set");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 503, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [email],
      subject: SUBJECT,
      html: HTML_BODY,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", res.status, err);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 502, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { ...CORS, "Content-Type": "application/json" } },
  );
});
