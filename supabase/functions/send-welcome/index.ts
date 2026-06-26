/* C.L Khanna Jewellers — Edge Function: send-welcome
   Sends a fixed welcome email via Resend to a given address.
   Guards:
   1. Email must exist in the subscribers table inserted within the last 2 minutes
      (verified server-side using SUPABASE_SERVICE_ROLE_KEY — never in the repo).
      This prevents the endpoint being used to spam arbitrary addresses.
   2. Email format validated.
   3. CORS locked to the live domain.

   Required secrets (Supabase Dashboard → Settings → Edge Functions → Secrets):
     RESEND_API_KEY            — your Resend API key
     SUPABASE_URL              — auto-injected by Supabase
     SUPABASE_SERVICE_ROLE_KEY — auto-injected by Supabase
*/

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const SUPABASE_URL   = Deno.env.get("SUPABASE_URL")   ?? "";
const SERVICE_KEY    = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const FROM_ADDRESS = "C.L Khanna Jewellers <hello@mail.clkhannajewellers.in>";
const SUBJECT      = "Welcome to C.L Khanna Jewellers";

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
  <div style="text-align:center;margin-bottom:28px"><img src="https://raw.githubusercontent.com/communiqueplace-dev/clj.website/main/assets/logo-main.png" alt="C.L Khanna Jewellers" style="height:60px;width:auto"></div>
  <h1>Welcome to C.L Khanna Jewellers</h1>
  <p>Thank you for joining us — we are delighted to have you.</p>
  <p>At C.L Khanna, every piece is crafted with intention: hand-set polki chokers, BIS hallmarked gold, and diamond jewellery made for real celebrations. Whether you are shopping for a wedding, a gift, or simply yourself, we look forward to helping you find something beautiful.</p>
  <p>Explore the collection at <a href="https://clkhannajewellers.in">clkhannajewellers.in</a>, or visit us in person at 8 Dilawari Street, Lawrence Road, Amritsar.</p>
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
  "Access-Control-Allow-Origin":  ALLOWED_ORIGIN,
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

  // Verify this email was genuinely just subscribed (within last 2 minutes).
  // Uses the service role key — only available server-side, never exposed to clients.
  // If the check fails we return 200 silently so attackers get no signal.
  if (SUPABASE_URL && SERVICE_KEY) {
    try {
      const since = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const check = await fetch(
        `${SUPABASE_URL}/rest/v1/subscribers?email=eq.${encodeURIComponent(email)}&created_at=gte.${since}&select=email&limit=1`,
        { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } },
      );
      const rows = check.ok ? await check.json() : [];
      if (!Array.isArray(rows) || !rows.length) {
        // Not a fresh subscription — silently succeed without sending
        return new Response(
          JSON.stringify({ ok: true }),
          { headers: { ...CORS, "Content-Type": "application/json" } },
        );
      }
    } catch {
      // If the check itself errors, fail safe: don't send
      return new Response(
        JSON.stringify({ ok: true }),
        { headers: { ...CORS, "Content-Type": "application/json" } },
      );
    }
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
