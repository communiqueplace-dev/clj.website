/* C.L Khanna Jewellers — product catalogue (v3) */
var PRODUCTS = [
  {img:"d01", cat:"diamond", sub:"bangles",   name:"Diamond Bangle Pair",                desc:"A matched pair of bangles fully set with round brilliants.",            metal:"18k White Gold", work:"Pavé-set certified diamonds", occasion:"Evening & festive wear"},
  {img:"d02", cat:"diamond", sub:"earrings",  name:"Emerald & Diamond Paisley Earrings", desc:"Paisley drops of pavé diamonds carrying natural emeralds.",        metal:"18k Gold", work:"Pavé setting with natural emeralds", occasion:"Festive & party wear"},
  {img:"d03", cat:"diamond", sub:"earrings",  name:"Emerald Drop Danglers",              desc:"Long diamond danglers finished with emerald drops.",                   metal:"18k Gold", work:"Prong-set diamonds, emerald drops", occasion:"Evening wear"},
  {img:"d04", cat:"diamond", sub:"sets", name:"Ruby Centre Choker",                 desc:"A polished gold choker crowned with a ruby and diamond cluster.",      metal:"18k Gold", work:"Cluster setting with ruby centre", occasion:"Bridal & festive wear"},
  {img:"d05", cat:"diamond", sub:"rings",     name:"Ruby & Sapphire Floral Ring",        desc:"A floral cocktail ring in rubies, sapphires and rose-cut diamonds.",   metal:"18k Gold", work:"Hand-set rubies, sapphires & uncut diamonds", occasion:"Cocktail & festive wear"},
  {img:"d06", cat:"diamond", sub:"rings",     name:"Baguette Floral Ring",               desc:"A flower of baguette diamonds with a ruby-lined centre.",              metal:"18k Gold", work:"Baguette & round brilliant setting", occasion:"Cocktail wear"},
  {img:"d07", cat:"diamond", sub:"rings",     name:"Ruby Cocktail Ring",                 desc:"A deep ruby oval inside a double halo of brilliants.",                 metal:"18k Gold", work:"Double-halo setting, natural ruby", occasion:"Cocktail & party wear"},
  {img:"d08", cat:"diamond", sub:"rings",     name:"Enamel Cluster Ring",                desc:"A sculpted floral ring in blue enamel and diamond clusters.",          metal:"18k Gold", work:"Meenakari enamel with diamond clusters", occasion:"Festive wear"},
  {img:"d09", cat:"diamond", sub:"rings",     name:"Emerald Pavé Dome Ring",        desc:"A pavé dome ring centred on a natural emerald.",                  metal:"18k Gold", work:"Micro-pavé with emerald centre", occasion:"Party wear"},
  {img:"d10", cat:"diamond", sub:"rings",     name:"Ruby & Diamond Band",                desc:"A broad band woven with rubies and white diamonds.",                   metal:"18k Gold", work:"Channel & pavé setting", occasion:"Daily & party wear"},
  {img:"d11", cat:"diamond", sub:"rings",     name:"Diamond Wave Ring",                  desc:"A sculptural wave of micro-set pavé diamonds.",                   metal:"18k Gold", work:"Micro-pavé setting", occasion:"Daily & evening wear"},
  {img:"d12", cat:"diamond", sub:"earrings",  name:"Ruby Fan Studs",                     desc:"Fan-shaped studs in rubies edged with white diamonds.",                metal:"18k Gold", work:"Channel-set rubies & diamonds", occasion:"Festive wear"},
  {img:"d13", cat:"diamond", sub:"bangles",   name:"Ruby Halo Bracelet",                 desc:"Oval rubies in diamond halos, linked in warm gold.",                   metal:"18k Gold", work:"Halo setting with natural rubies", occasion:"Festive & party wear"},
  {img:"d14", cat:"diamond", sub:"rings",     name:"Diamond Spray Cocktail Ring",        desc:"A spray of round brilliants in an open floral design.",                metal:"18k White Gold", work:"Prong-set round brilliants", occasion:"Cocktail & evening wear"},
  {img:"d15", cat:"diamond", sub:"rings",     name:"Blue Sapphire Ring",                 desc:"A royal blue sapphire framed by a crown of diamonds.",                 metal:"18k Gold", work:"Halo setting, natural sapphire", occasion:"Engagement & evening wear"},
  {img:"d16", cat:"diamond", sub:"earrings",  name:"Ruby Wing Earrings",                 desc:"Dramatic wings of channel-set rubies tipped with diamonds.",           metal:"18k Gold", work:"Channel-set rubies", occasion:"Party & festive wear"},
  {img:"d17", cat:"diamond", sub:"bangles",   name:"Pink Sapphire Polki Bracelet",       desc:"A broad bracelet of pink sapphires set with uncut polki.",             metal:"18k Gold", work:"Pavé pink sapphires with uncut polki", occasion:"Festive & party wear"},
  {img:"d18", cat:"diamond", sub:"bangles",   name:"Peacock Kada",                       desc:"Twin pavé peacocks in blue enamel meeting in a hinged kada.",     metal:"18k Gold", work:"Enamel work with rose-cut diamonds", occasion:"Festive & bridal wear", gender:"men"},
  {img:"d19", cat:"diamond", sub:"bangles",   name:"Diamond Cluster Bangle",             desc:"A broad gold bangle set end-to-end with diamond clusters.",            metal:"18k Gold", work:"Cluster-set brilliants", occasion:"Festive wear"},
  {img:"d20", cat:"diamond", sub:"sets", name:"Rose Gold Necklace Set",             desc:"A scalloped rose-gold diamond necklace with matching drops.",          metal:"18k Rose Gold", work:"Prong & pavé setting", occasion:"Reception & evening wear"},
  {img:"d21", cat:"diamond", sub:"sets", name:"Sapphire Drop Necklace",             desc:"A diamond fringe collar finished with blue sapphire drops.",           metal:"18k White Gold", work:"Fringe setting with sapphire drops", occasion:"Reception wear"},
  {img:"d22", cat:"diamond", sub:"sets", name:"Sapphire Bridal Choker",             desc:"A grand diamond bib studded with deep blue sapphires.",                metal:"18k White Gold", work:"Bib setting, natural sapphires", occasion:"Bridal & reception wear"},
  {img:"g01", cat:"gold", sub:"sets", name:"Emerald Bead Haram",            desc:"Strands of emerald-green beads beneath a carved gold pendant.",  metal:"22k Gold", work:"Hand-strung beads, nakshi pendant", occasion:"Festive & temple wear"},
  {img:"g02", cat:"gold", sub:"sets", name:"Jhumki Fringe Choker",          desc:"A gold choker fringed with tiny jhumkis and green highlights.",  metal:"22k Gold", work:"Hand-finished jhumki fringe", occasion:"Wedding & festive wear"},
  {img:"g03", cat:"gold", sub:"sets", name:"Antique Bridal Haram",          desc:"A grand layered haram in deep antique-finish gold.",             metal:"22k Gold", work:"Antique nakshi craftsmanship", occasion:"Bridal wear"},
  {img:"g04", cat:"gold", sub:"earrings",  name:"Emerald Jhumka Danglers",       desc:"Sculpted hook danglers dropping into classic jhumkis.",          metal:"22k Gold", work:"Hand-carved with green accents", occasion:"Festive wear"},
  {img:"g05", cat:"gold", sub:"sets", name:"Floral Pendant Chain",          desc:"A classic gold chain with a hand-finished floral pendant.",      metal:"22k Gold", work:"Hand-engraved pendant", occasion:"Daily wear"},
  {img:"g06", cat:"gold", sub:"earrings",  name:"Pearl Chandbali Earrings",      desc:"Crescent chandbalis edged with pearls and gold drops.",          metal:"22k Gold", work:"Traditional chandbali with pearls", occasion:"Festive & wedding wear"},
  {img:"g07", cat:"gold", sub:"bangles",   name:"Textured Gold Kada",            desc:"A bold kada in richly textured satin-finish gold.",              metal:"22k Gold", work:"Textured satin finish", occasion:"Daily & festive wear", gender:"men"},
  {img:"g08", cat:"gold", sub:"sets", name:"Classic Necklace Set",          desc:"A graceful necklace and earrings with a single gold drop.",      metal:"22k Gold", work:"Polished classic craftsmanship", occasion:"Daily & gifting"},
  {img:"g09", cat:"gold", sub:"bracelets", name:"Gold Bracelet with Diamonds",   desc:"A slim gold bracelet brightened with diamond accents.",          metal:"18k Gold", work:"Bezel-set diamond accents", occasion:"Daily wear"},
  {img:"g10", cat:"gold", sub:"bangles",   name:"Carved Openwork Bangle",        desc:"A broad bangle carved in flowing openwork gold.",                metal:"22k Gold", work:"Hand-carved openwork", occasion:"Festive wear"},
  {img:"g11", cat:"gold", sub:"bangles",   name:"Antique Kada Pair",             desc:"Ornate kadas in deeply carved heritage patterns.",               metal:"22k Gold", work:"Antique hand-carving", occasion:"Wedding & festive wear", gender:"men"},
  {img:"g12", cat:"gold", sub:"sets", name:"Temple Jhumka Haram",           desc:"A temple haram with jhumka pendant and matching earrings.",      metal:"22k Gold", work:"Temple craftsmanship", occasion:"Bridal & temple wear"},
  {img:"g13", cat:"gold", sub:"sets", name:"Gold Beads Necklace Set",       desc:"Hand-strung gold beads with delicate matching earrings.",        metal:"22k Gold", work:"Hand-strung beadwork", occasion:"Daily & festive wear"},
  {img:"g14", cat:"gold", sub:"sets", name:"Ruby & Emerald Choker Set",     desc:"A gold choker set brightened with ruby and emerald stones.",     metal:"22k Gold", work:"Stone-set traditional design", occasion:"Wedding & festive wear"},
  {img:"p01", cat:"polki", sub:"sets", name:"Polki Choker with Emerald Drops", desc:"Uncut polki choker finished with carved emerald drops.",          metal:"22k Gold, jadau set", work:"Hand-set uncut polki, emerald drops", occasion:"Bridal & reception wear"},
  {img:"p02", cat:"polki", sub:"bracelets",    name:"Polki & Emerald Bracelet Set",    desc:"A polki bracelet with emerald beads and matching earrings.",      metal:"22k Gold, jadau set", work:"Jadau setting with emerald beads", occasion:"Festive wear"},
  {img:"p03", cat:"polki", sub:"sets", name:"Kundan Bridal Necklace",          desc:"A grand bib of kundan and emeralds for the wedding day.",         metal:"22k Gold, kundan set", work:"Traditional kundan craftsmanship", occasion:"Bridal wear"},
  {img:"p04", cat:"polki", sub:"sets",  name:"Pink Stone & Jade Mala",          desc:"A soft pink and green stone mala with a round jade pendant.",     metal:"22k Gold", work:"Hand-strung with carved pendant", occasion:"Festive & daily wear"},
  {img:"p05", cat:"polki", sub:"sets", name:"Emerald Bead Choker Set",         desc:"Emerald beads and polki with bracelet and studs to match.",       metal:"22k Gold, jadau set", work:"Jadau polki with emerald beads", occasion:"Wedding & festive wear"},
  {img:"p06", cat:"polki", sub:"sets", name:"Bridal Polki Layered Choker",     desc:"A double-layer bridal choker in luminous uncut polki.",           metal:"22k Gold, jadau set", work:"Layered uncut polki, hand-set", occasion:"Bridal wear"}
];
/* C.L Khanna Jewellers — shop backend (cart + accounts)
   ====================================================
   ACCOUNTS: paste your Supabase project values below.
   Get them from: supabase.com -> your project -> Settings -> API
*/
const SUPABASE_URL = "https://amqmojrqifsfuhnrabdc.supabase.co";        // e.g. "https://abcdefgh.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcW1vanJxaWZzZnVobnJhYmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjE2NjEsImV4cCI6MjA5NjY5NzY2MX0.nIjlTO2uIgiaPKnWA3SYXTCglkmDZ1KbS8kPmm9S0vg";   // the long "anon public" key

/* ---------------- cart (works for everyone, saved in browser) ---------------- */
function getCart(){
  try { return JSON.parse(localStorage.getItem("clj_cart") || "[]"); } catch(e){ return []; }
}
function setCart(items){
  localStorage.setItem("clj_cart", JSON.stringify(items));
  updateCartBadge();
  cloudSaveCart(items);
}
function addToCart(id){
  const items = getCart();
  const hit = items.find(i => i.id === id);
  if (hit) hit.qty += 1; else items.push({id, qty:1});
  setCart(items);
  toast("Added to your cart");
}
function removeFromCart(id){
  setCart(getCart().filter(i => i.id !== id));
  if (document.getElementById("cart-list")) renderCartPage();
}
function changeQty(id, d){
  const items = getCart();
  const hit = items.find(i => i.id === id);
  if (!hit) return;
  const next = hit.qty + d;
  if (next < 1){ removeFromCart(id); return; }   // minus on the last unit removes the item
  hit.qty = next;
  setCart(items);
  renderCartPage();
}
function updateCartBadge(){
  const n = getCart().reduce((s,i) => s + i.qty, 0);
  const el = document.getElementById("cartn");
  if (el){ el.textContent = n || ""; el.style.display = n ? "flex" : "none"; }
}
function toast(msg){
  let t = document.getElementById("toast");
  if (!t){
    t = document.createElement("div");
    t.id = "toast"; t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------------- cart page ---------------- */
function renderCartPage(){
  const box = document.getElementById("cart-list");
  if (!box) return;
  const items = getCart();
  if (!items.length){
    box.innerHTML = `<p class="cart-empty">Your cart is empty. <a href="./#collections">Explore the collections →</a></p>`;
    document.getElementById("cart-actions").style.display = "none";
    return;
  }
  document.getElementById("cart-actions").style.display = "";
  box.innerHTML = items.map(i => {
    const p = PRODUCTS.find(x => x.img === i.id);
    if (!p) return "";
    return `
    <div class="cart-row">
      <a href="product.html?id=${p.img}"><img src="${imgURL(p)}" alt="${p.name}"></a>
      <div class="ci">
        <a href="product.html?id=${p.img}"><h3>${p.name}</h3></a>
        <small>${CAT_TITLES[p.cat]} · ${p.metal}</small>
        <span class="price-note">Price on request</span>
      </div>
      <div class="cq">
        <button onclick="changeQty('${i.id}',-1)">−</button>
        <b>${i.qty}</b>
        <button onclick="changeQty('${i.id}',1)">+</button>
      </div>
      <button class="cx" onclick="removeFromCart('${i.id}')" title="Remove">×</button>
    </div>`;
  }).join("");
}
function sendCartEnquiry(){
  const items = getCart();
  if (!items.length) return;
  const note = (document.getElementById("cart-note") || {}).value || "";
  let msg = "Hello C.L Khanna Jewellers, I would like to enquire about these pieces from your website:\n";
  items.forEach((i, n) => {
    const p = PRODUCTS.find(x => x.img === i.id);
    if (p) msg += `\n${n+1}. ${p.name} (${CAT_TITLES[p.cat]})${i.qty > 1 ? " × " + i.qty : ""}`;
  });
  if (note.trim()) msg += "\n\nNote: " + note.trim();
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank");
}

/* ---------------- accounts (Supabase) ---------------- */
let sb = null, sbUser = null;
var _authMode = 'in';

/* hCaptcha "I'm not a robot".
   TO ACTIVATE: (1) replace HCAPTCHA_SITE_KEY below with your real hCaptcha site key,
   (2) in Supabase -> Auth -> Bot & Abuse Protection, enable hCaptcha and paste the matching
   SECRET key. While Supabase CAPTCHA is OFF, the token is ignored and auth works normally. */
var HCAPTCHA_SITE_KEY = 'c81414a8-918c-4fd0-9022-d3ea7786bca8'; // production hCaptcha site key (public — safe in frontend)
function cljRenderCaptchas(){
  if (typeof hcaptcha === 'undefined') return;
  document.querySelectorAll('.h-captcha-box').forEach(function(el){
    if (el.dataset.rendered) return;
    try { el.dataset.widgetId = hcaptcha.render(el, { sitekey: HCAPTCHA_SITE_KEY }); el.dataset.rendered = '1'; } catch(e){}
  });
}
window.cljRenderCaptchas = cljRenderCaptchas;
function _capToken(name){
  if (typeof hcaptcha === 'undefined') return null;          // widget not loaded -> let Supabase decide
  var el = document.querySelector('.h-captcha-box[data-cap="' + name + '"]');
  if (!el || !el.dataset.widgetId) return null;
  try { return hcaptcha.getResponse(el.dataset.widgetId) || ''; } catch(e){ return null; }
}
function _capReset(name){
  if (typeof hcaptcha === 'undefined') return;
  var el = document.querySelector('.h-captcha-box[data-cap="' + name + '"]');
  if (el && el.dataset.widgetId){ try { hcaptcha.reset(el.dataset.widgetId); } catch(e){} }
}

function sbReady(){ return !!(SUPABASE_URL && SUPABASE_ANON_KEY); }
function initSupabase(){
  if (!sbReady()) return;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.108.2/dist/umd/supabase.js";
  s.integrity = "sha384-nD3dwv4+ZqdYnmZKe/249ImlV04om7xTCcsoSeQYI+RO+XlKPoqAWaJR1M5SJH9p";
  s.crossOrigin = "anonymous";
  s.onload = async () => {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await sb.auth.getSession();
    if (data && data.session){ sbUser = data.session.user; afterLogin(); }
    refreshAuthUI();
    if (typeof window.onAuthReady === 'function') window.onAuthReady();
  };
  document.head.appendChild(s);
}
/* Auth lives on dedicated pages now (login.html / register.html / account.html).
   Already signed in -> the account area; otherwise -> the sign-in page. An optional
   prompt is carried across the navigation and shown on the login page. */
function openAuth(msg){
  if (!sbReady()){
    alert("Accounts are launching soon.\nYour cart is already saved on this device — and you can send it to us on WhatsApp any time.");
    return;
  }
  if (typeof sbUser !== 'undefined' && sbUser){ location.href = 'account.html'; return; }
  try { if (msg) sessionStorage.setItem('clj_auth_msg', msg); } catch(e){}
  location.href = 'login.html';
}
function refreshAuthUI(){
  if (document.getElementById('auth-page')) return;   // dedicated login/register pages manage themselves
  var inBox  = document.getElementById('auth-forms');
  var outBox = document.getElementById('auth-signed');
  var tabs   = document.getElementById('auth-tabs');
  var forgot = document.getElementById('auth-forgot');
  if (!inBox) return;
  if (sbUser){
    inBox.style.display  = 'none';
    if (outBox)  outBox.style.display  = 'block';
    if (tabs)    tabs.style.display    = 'none';
    if (forgot)  forgot.style.display  = 'none';
    var em = document.getElementById('auth-email-show');
    if (em) em.textContent = sbUser.email;
  } else {
    inBox.style.display  = '';
    if (outBox)  outBox.style.display  = 'none';
    if (tabs)    tabs.style.display    = '';
    if (forgot)  forgot.style.display  = 'none';
  }
}
async function doAuth(){
  if (!sb){ toast('Connecting...'); return; }
  var email = (document.getElementById('au-email').value || '').trim();
  var pass  = document.getElementById('au-pass').value;
  var errEl = document.getElementById('au-err');
  errEl.textContent = ''; errEl.style.color = '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    errEl.textContent = 'Please enter a valid email address.'; return;
  }
  if (_authMode === 'up'){
    if (pass.length < 8 || !/[A-Za-z]/.test(pass) || !/[0-9]/.test(pass)){
      errEl.textContent = 'Password must be at least 8 characters and include a letter and a number.'; return;
    }
    var pass2 = (document.getElementById('au-pass2') || {}).value || '';
    if (pass2 !== pass){ errEl.textContent = 'Passwords do not match.'; return; }
  } else {
    if (!pass){ errEl.textContent = 'Please enter your password.'; return; }
  }

  var capName = _authMode === 'up' ? 'signup' : 'signin';
  var capToken = _capToken(capName);
  if (capToken === ''){ errEl.textContent = 'Please complete the "I am not a robot" check.'; return; }

  var btn = document.getElementById('au-main-btn');
  btn.disabled = true;
  btn.textContent = _authMode === 'in' ? 'Signing in...' : 'Creating account...';

  var result;
  if (_authMode === 'up'){
    var meta = {};
    var nm = ((document.getElementById('au-name') || {}).value || '').trim();
    var gd = (document.getElementById('au-gender') || {}).value || '';
    if (nm) meta.full_name = nm;
    if (gd) meta.gender = gd;
    result = await sb.auth.signUp({ email: email, password: pass, options: { data: meta, captchaToken: capToken || undefined } });
  } else {
    result = await sb.auth.signInWithPassword({ email: email, password: pass, options: { captchaToken: capToken || undefined } });
  }

  btn.disabled = false;
  btn.textContent = _authMode === 'in' ? 'Sign In' : 'Create Account';

  var data = result.data, error = result.error;
  if (error){
    var msg = error.message || '';
    if (msg.includes('Invalid login credentials') || msg.includes('invalid_grant')){
      errEl.textContent = 'Incorrect email or password. Please try again.';
    } else if (msg.includes('User already registered') || msg.includes('already registered') || msg.includes('already exists')){
      errEl.textContent = 'An account with this email already exists — taking you to sign in…';
      setTimeout(function(){ location.href = 'login.html'; }, 1800);
    } else if (msg.includes('Email not confirmed')){
      errEl.textContent = 'Please confirm your email first — check your inbox.';
    } else if (msg.includes('rate limit') || msg.includes('too many')){
      errEl.textContent = 'Too many attempts — please wait a moment and try again.';
    } else {
      errEl.textContent = msg || 'Something went wrong. Please try again.';
    }
    _capReset(capName);   // hCaptcha tokens are single-use — let the user re-verify
    return;
  }
  // Already-registered email: Supabase returns a user with NO identities (and no error)
  // to avoid leaking which emails exist. Treat it as "account exists" and send them to sign in.
  if (_authMode === 'up' && data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0){
    errEl.textContent = 'An account with this email already exists — taking you to sign in…';
    setTimeout(function(){ location.href = 'login.html'; }, 1800);
    return;
  }
  if (_authMode === 'up' && data.user){
    fetch(SUPABASE_URL + '/functions/v1/send-welcome', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.user.email })
    }).catch(function(){});
  }
  if (_authMode === 'up' && data.user && !data.session){
    errEl.style.color = 'var(--gold-deep)';
    errEl.textContent = 'Almost there! Check your email to confirm your account, then sign in.';
    return;
  }
  sbUser = data.user;
  afterLogin();
  refreshAuthUI();
  toast('Welcome to C.L Khanna');
  // On the dedicated login/register pages, go straight to the account area.
  if (document.getElementById('auth-page')){ location.href = 'account.html'; }
}
async function doLogout(){
  if (sb) await sb.auth.signOut();
  sbUser = null;
  refreshAuthUI();
  toast("Signed out");
}
async function afterLogin(){
  /* merge cloud cart with local cart */
  if (!sb || !sbUser) return;
  try {
    const { data } = await sb.from("carts").select("items").eq("user_id", sbUser.id).maybeSingle();
    const cloud = (data && data.items) || [];
    const local = getCart();
    const merged = [...local];
    cloud.forEach(c => { if (!merged.find(m => m.id === c.id)) merged.push(c); });
    localStorage.setItem("clj_cart", JSON.stringify(merged));
    updateCartBadge();
    if (document.getElementById("cart-list")) renderCartPage();
    cloudSaveCart(merged);
  } catch(e){}
  /* merge per-user wishlist (cloud) with local favourites — same items-jsonb pattern as carts */
  try {
    const { data } = await sb.from("wishlists").select("items").eq("user_id", sbUser.id).maybeSingle();
    const cloud = (data && data.items) || [];
    const local = JSON.parse(localStorage.getItem("clj_wl") || "[]");
    const merged = Array.from(new Set([...local, ...cloud]));
    localStorage.setItem("clj_wl", JSON.stringify(merged));
    cloudSaveWishlist(merged);
    if (typeof refreshHearts === "function") refreshHearts();
  } catch(e){}
}
async function cloudSaveWishlist(items){
  if (!sb || !sbUser) return;
  try {
    await sb.from("wishlists").upsert({ user_id: sbUser.id, items: items, updated_at: new Date().toISOString() });
  } catch(e){}
}
async function cloudSaveCart(items){
  if (!sb || !sbUser) return;
  try {
    await sb.from("carts").upsert({ user_id: sbUser.id, items, updated_at: new Date().toISOString() });
  } catch(e){}
}

function switchAuthTab(mode){
  _authMode = mode;
  var tabIn = document.getElementById('tab-in');
  var tabUp = document.getElementById('tab-up');
  if (tabIn) tabIn.classList.toggle('auth-tab-on', mode === 'in');
  if (tabUp) tabUp.classList.toggle('auth-tab-on', mode === 'up');
  var btn = document.getElementById('au-main-btn');
  if (btn) btn.textContent = mode === 'in' ? 'Sign In' : 'Create Account';
  var passEl = document.getElementById('au-pass');
  if (passEl){
    passEl.placeholder = mode === 'in' ? 'Password' : 'Min 8 characters';
    passEl.setAttribute('autocomplete', mode === 'in' ? 'current-password' : 'new-password');
  }
  var sw = document.getElementById('au-sw');
  if (sw) sw.style.display = mode === 'up' ? '' : 'none';
  var top = document.getElementById('au-signup-top');
  if (top) top.style.display = mode === 'up' ? '' : 'none';
  var cw = document.getElementById('au-confirm-wrap');
  if (cw) cw.style.display = mode === 'up' ? '' : 'none';
  var fp = document.getElementById('au-fp');
  if (fp) fp.style.display = mode === 'in' ? '' : 'none';
  var errEl = document.getElementById('au-err');
  if (errEl){ errEl.textContent = ''; errEl.style.color = ''; }
}
function onAuthPassInput(){
  if (_authMode !== 'up') return;
  var pw  = document.getElementById('au-pass').value;
  var s   = pw ? pwStrength(pw) : 0;
  var bar = document.getElementById('pw-bar');
  var hnt = document.getElementById('pw-hint');
  if (bar) bar.setAttribute('data-s', s || '');
  if (hnt){
    var hints = ['', 'Too short — use at least 8 characters', 'Getting stronger — try adding numbers or symbols', 'Strong password'];
    hnt.textContent = pw ? (hints[s] || '') : '';
  }
}
function pwStrength(pw){
  if (!pw || pw.length < 8) return 1;
  var hasUpper = /[A-Z]/.test(pw);
  var hasNum   = /[0-9]/.test(pw);
  var hasSym   = /[^A-Za-z0-9]/.test(pw);
  if ((hasUpper && hasNum) || hasSym) return 3;
  return 2;
}
function showForgotForm(){
  var forms  = document.getElementById('auth-forms');
  var tabs   = document.getElementById('auth-tabs');
  var forgot = document.getElementById('auth-forgot');
  if (forms)  forms.style.display  = 'none';
  if (tabs)   tabs.style.display   = 'none';
  if (forgot) forgot.style.display = '';
  var fe = document.getElementById('au-fe');
  var em = document.getElementById('au-email');
  if (fe && em) fe.value = em.value || '';
  var ferr = document.getElementById('au-ferr');
  if (ferr){ ferr.textContent = ''; ferr.style.color = ''; }
}
function showAuthForms(){
  var forgot = document.getElementById('auth-forgot');
  var tabs   = document.getElementById('auth-tabs');
  var forms  = document.getElementById('auth-forms');
  if (forgot) forgot.style.display = 'none';
  if (tabs)   tabs.style.display   = '';
  if (forms)  forms.style.display  = '';
}
async function doForgotPassword(){
  if (!sb){ toast('Connecting...'); return; }
  var email = (document.getElementById('au-fe').value || '').trim();
  var ferr  = document.getElementById('au-ferr');
  ferr.textContent = ''; ferr.style.color = '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    ferr.textContent = 'Please enter a valid email address.'; return;
  }
  var capToken = _capToken('forgot');
  if (capToken === ''){ ferr.textContent = 'Please complete the "I am not a robot" check.'; return; }
  var btn = document.querySelector('#auth-forgot .btn.solid');
  btn.disabled = true; btn.textContent = 'Sending...';
  var redirectTo = 'https://clkhannajewellers.in/reset-password.html';
  var result = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirectTo, captchaToken: capToken || undefined });
  btn.disabled = false; btn.textContent = 'Send Reset Link';
  if (result.error){
    var msg = (result.error.message && result.error.message !== '{}') ? result.error.message : 'Could not send reset link. Please try again.';
    ferr.textContent = msg;
    _capReset('forgot');
  } else {
    ferr.style.color = 'var(--gold-deep)';
    ferr.textContent = 'Reset link sent! Check your inbox (and spam folder).';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initSupabase();
});
/* C.L Khanna Jewellers — shared site logic (v4) */
const WA = "919815605373";
const SUBS = {
  gold:    [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]],
  diamond: [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]],
  polki:   [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]]
};
const CAT_TITLES = {gold:"Gold Jewellery", diamond:"Diamond Jewellery", polki:"Polki Jewellery"};
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function fmtPrice(v){ return v ? 'from ₹' + Number(v).toLocaleString('en-IN') : 'Price on request'; }

function showSkeletons(container, n){
  if(!container) return;
  container.innerHTML = Array.from({length:n||6}).map(()=>
    '<div class="skel-card"><div class="skel skel-img"></div>'+
    '<div class="skel skel-line"></div><div class="skel skel-line short"></div></div>'
  ).join('');
}
function showReviewSkeletons(container, n){
  if(!container) return;
  container.innerHTML = Array.from({length:n||3}).map(()=>
    '<div class="skel-review"><div class="skel skel-line short"></div>'+
    '<div class="skel skel-line"></div><div class="skel skel-line"></div>'+
    '<div class="skel skel-line short"></div></div>'
  ).join('');
}
function skelLoaded(container){
  if(!container) return;
  container.classList.remove('skel-loaded');
  void container.offsetWidth;
  container.classList.add('skel-loaded');
  container.addEventListener('animationend', function h(){ container.classList.remove('skel-loaded'); container.removeEventListener('animationend',h); }, {once:true});
}



/* ---------- header: burger left · logo centre · icons right · hairline ---------- */
function buildHeader(active){
  document.getElementById("site-header").innerHTML = `
  <header class="site">
    <div class="bar">
      <button class="burger" aria-label="Menu" onclick="toggleDrawer(true)"><span></span><span></span><span></span></button>
      <a class="brand" href="./"><img src="assets/logo-main.png" alt="C.L Khanna Jewellers"></a>
      <div class="actions">
        <button class="ic" aria-label="Search" onclick="openSearch()" title="Search">
          <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="15.4" y1="15.4" x2="21" y2="21" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <button class="ic" aria-label="Book an Appointment" onclick="openAppt(event)" title="Book an Appointment">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.4"/><line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" stroke-width="1.4"/><line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <span class="country" title="India · INR">IN · ₹</span>
        <button class="ic" aria-label="Account" onclick="openAuth()" title="Account">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <button class="ic" aria-label="Cart" onclick="location.href='cart.html'" title="Cart"><span class="cartn" id="cartn"></span>
          <svg viewBox="0 0 24 24"><path d="M6 7h12l-1.2 11a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 9V6a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
      </div>
    </div>
  </header>
  <div class="hairline"></div>
  <div class="drawer-veil" id="dveil" onclick="toggleDrawer(false)"></div>
  <aside class="drawer" id="drawer">
    <button class="dx" onclick="toggleDrawer(false)">×</button>
    <a class="d-home" href="./">Home</a>
    <div class="d-group">
      <a class="d-cat" href="javascript:void(0)" onclick="this.parentNode.classList.toggle('openg')">Shop <i>+</i></a>
      ${["gold","diamond","polki"].map(c => `
        <a class="d-sub d-strong" href="${c}.html">${CAT_TITLES[c]}</a>
      `).join("")}
    </div>
    <a class="d-cat" href="./#collections">Categories</a>
    <a class="d-cat" href="polki.html?sub=sets">Bridal</a>
    <a class="d-cat" href="custom.html">Custom Jewellery</a>
    <a class="d-cat" href="media.html">Media</a>
    <a class="d-cat" href="about.html">About Us</a>
    <a class="d-cat" href="location.html">Contact</a>
    <a class="d-appt" href="https://wa.me/919815605373?text=Hello%20C.L%20Khanna%20Jewellers%2C%20I%20would%20like%20to%20book%20an%20appointment%20to%20visit%20the%20store." onclick="openAppt(event);toggleDrawer(false)">Book an Appointment</a>
  </aside>
  <div class="search-veil" id="sveil">
    <div class="search-box">
      <button class="dx" onclick="closeSearch()">×</button>
      <input id="sq" type="text" placeholder="Search the collection — e.g. choker, ruby, kada…" oninput="runSearch()">
      <div id="sres" class="sres"></div>
    </div>
  </div>`;
}
function toggleDrawer(open){
  document.getElementById("drawer").classList.toggle("open", open);
  document.getElementById("dveil").classList.toggle("open", open);
}
function soon(what){
  alert(what + " are coming soon.\nFor now, we serve you personally — call or WhatsApp +91 98156 05373.");
}

/* ---------- search ---------- */
function openSearch(){
  document.getElementById("sveil").classList.add("open");
  setTimeout(() => document.getElementById("sq").focus(), 50);
}
function closeSearch(){ document.getElementById("sveil").classList.remove("open"); }
function runSearch(){
  const q = document.getElementById("sq").value.trim().toLowerCase();
  const box = document.getElementById("sres");
  if (q.length < 2){ box.innerHTML = ""; return; }
  const hits = PRODUCTS.filter(p =>
    (p.name + " " + p.desc + " " + p.cat + " " + p.work + " " + p.occasion).toLowerCase().includes(q)
  ).slice(0, 8);
  box.innerHTML = hits.length
    ? hits.map(p => `
      <a href="product.html?id=${esc(p.img)}">
        <img src="${imgURL(p)}" alt="${esc(p.name)}, C.L Khanna Jewellers Amritsar">
        <span><b>${esc(p.name)}</b><small>${esc(CAT_TITLES[p.cat]||'')}</small></span>
      </a>`).join("")
    : `<p class="nores">No pieces found — try "choker", "ring", "polki"…</p>`;
}

/* ---------- footer: Company · Services · Policies · Social + newsletter ---------- */
function buildFooter(){
  document.getElementById("site-footer").innerHTML = `
  <div class="topline"></div>
  <div class="wrap">
    <div class="news">
      <div>
        <h4>Join the List</h4>
        <p>Be the first to see new collections and bridal editorials.</p>
      </div>
      <form onsubmit="return joinNews(event)">
        <input id="nl-email" type="email" placeholder="Your email address" required>
        <button class="btn solid" type="submit">Subscribe</button>
      </form>
    </div>
    <div class="cols">
      <div class="fcol">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-info" onclick="toggleFootCol(this)">Information<span class="fcol-ic" aria-hidden="true">+</span></button>
        <div class="fcol-p" id="fcp-info">
        <a href="about.html">About Us</a>
        <a href="location.html">Contact Us</a>
        <a href="custom.html">Customized Jewellery</a>
        <a href="location.html">Store Location</a>
        </div>
      </div>
      <div class="fcol">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-pol" onclick="toggleFootCol(this)">Policies<span class="fcol-ic" aria-hidden="true">+</span></button>
        <div class="fcol-p" id="fcp-pol">
        <a href="privacy.html">Privacy Policy</a>
        <a href="returns.html">Return Policy</a>
        <a href="shipping.html">Shipping Policy</a>
        <a href="terms.html">Terms &amp; Conditions</a>
        <a href="#" onclick="if(typeof openCookieSettings==='function')openCookieSettings();return false;" class="ck-footer-link">Cookie Settings</a>
        </div>
      </div>
      <div class="fcol git">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-git" onclick="toggleFootCol(this)">Get In Touch<span class="fcol-ic" aria-hidden="true">+</span></button>
        <div class="fcol-p" id="fcp-git">
        <a href="https://www.google.com/maps/search/?api=1&query=C.L.+Khanna+Jewellers+Lawrence+Road+Amritsar" target="_blank" rel="noopener"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>C.L Khanna Jewellers, 8 Dilawari Street,<br>Lawrence Road, Amritsar, Punjab</span></a>
        <a href="tel:+919815605373"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a13 13 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>+91 98156 05373</span></a>
        <a href="tel:+917717624298"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a13 13 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>+91 77176 24298</span></a>
        <a href="mailto:clkhannajewellers@gmail.com"><svg width="15" height="15" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>clkhannajewellers@gmail.com</span></a>
        </div>
      </div>
      <div class="fcol">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-follow" onclick="toggleFootCol(this)">Follow Us<span class="fcol-ic" aria-hidden="true">+</span></button>
        <div class="fcol-p" id="fcp-follow">
        <div class="socials">
          <a href="https://www.instagram.com/clkhannajewellers/" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>
          </a>
          <a href="https://wa.me/919815605373" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
            <svg width="14" height="14" viewBox="0 0 32 32"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.7 6L4 29l8.2-1.6c1.2.6 2.5.9 3.8.9 6.6 0 12-5.4 12-12S22.6 3 16 3zm6.1 16.9c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.5-4.8-5.6-5-.2-.2-1.4-1.8-1.4-3.5 0-1.7.9-2.5 1.2-2.8.3-.3.7-.4.9-.4h.7c.2 0 .5-.1.8.6.3.8 1 2.6 1.1 2.8.1.2.2.4 0 .7-.1.3-.2.4-.4.7-.2.2-.4.5-.6.7-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.3 2.8 1.7 3.2 1.9.4.2.6.2.9-.1.2-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2.4.1 2.2 1 2.6 1.2.4.2.6.3.7.5.1.1.1.8-.1 1.6z" fill="currentColor"/></svg>
          </a>
        </div>
        <a class="ig-handle" href="https://www.instagram.com/clkhannajewellers/" target="_blank" rel="noopener">@clkhannajewellers</a>
        </div>
      </div>
    </div>
    <div class="base">Copyright © <span id="yr"></span> C.L Khanna Jewellers. All rights reserved.</div>
  </div>`;
  document.getElementById("yr").textContent = new Date().getFullYear();
}

/* footer columns become tap-to-expand accordions on phones (CSS controls visibility) */
function toggleFootCol(btn){
  var open = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", open ? "false" : "true");
  var ic = btn.querySelector(".fcol-ic");
  if (ic) ic.textContent = open ? "+" : "–";
}

function joinNews(e){
  e.preventDefault();
  const email = ((document.getElementById("nl-email") || {}).value || "").trim();
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  if (typeof SUPABASE_URL !== "undefined" && SUPABASE_URL){
    fetch(SUPABASE_URL + "/rest/v1/subscribers", {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
        "Prefer": "resolution=ignore-duplicates,return=minimal"
      },
      body: JSON.stringify({ email: email })
    }).catch(function(){});
    fetch(SUPABASE_URL + "/functions/v1/send-welcome", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    }).catch(function(){});
  }
  e.target.innerHTML = '<p class="nl-thanks">Thank you — you are on the list.</p>';
  return false;
}

/* ---------- shells ---------- */
function buildShells(){
  document.body.insertAdjacentHTML("beforeend", `
  <a class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp"
     href="https://wa.me/${WA}?text=${encodeURIComponent('Hello C.L Khanna Jewellers, I would like to make an enquiry.')}">
    <svg viewBox="0 0 32 32"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.7 6L4 29l8.2-1.6c1.2.6 2.5.9 3.8.9 6.6 0 12-5.4 12-12S22.6 3 16 3zm6.1 16.9c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.5-4.8-5.6-5-.2-.2-1.4-1.8-1.4-3.5 0-1.7.9-2.5 1.2-2.8.3-.3.7-.4.9-.4h.7c.2 0 .5-.1.8.6.3.8 1 2.6 1.1 2.8.1.2.2.4 0 .7-.1.3-.2.4-.4.7-.2.2-.4.5-.6.7-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.3 2.8 1.7 3.2 1.9.4.2.6.2.9-.1.2-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2.4.1 2.2 1 2.6 1.2.4.2.6.3.7.5.1.1.1.8-.1 1.6z"/></svg>
  </a>
  <div class="modal" id="appt">
    <div class="box">
      <button class="x" onclick="document.getElementById('appt').classList.remove('open')">×</button>
      <h3>Book an Appointment</h3>
      <p class="sub">Visit us at Lawrence Road without the wait.</p>
      <label>Your name</label><input id="ap-name" type="text" placeholder="Full name">
      <label>Preferred day</label>
      <select id="ap-day"><option>Today</option><option>Tomorrow</option><option>This weekend</option><option>Next week</option></select>
      <label>Preferred time</label>
      <select id="ap-time"><option>11 AM – 1 PM</option><option>1 PM – 3 PM</option><option>3 PM – 5 PM</option><option>5 PM – 8 PM</option></select>
      <label>Interested in</label>
      <select id="ap-int"><option>Bridal / Wedding</option><option>Gold Jewellery</option><option>Diamond Jewellery</option><option>Polki Jewellery</option><option>Customized Jewellery</option><option>General visit</option></select>
      <button class="btn solid send" onclick="sendAppt()">Confirm on WhatsApp</button>
    </div>
  </div>
  <div class="lb" id="lb" style="position:fixed;inset:0;background:rgba(252,250,245,.97);z-index:140;display:none;align-items:center;justify-content:center;padding:4vh 4vw;cursor:zoom-out">
    <img id="lbimg" alt="Jewellery" style="max-height:88vh;max-width:90vw;object-fit:contain;border:1px solid #e6dec9;background:#fff">
  </div>`);
  document.getElementById("lb").addEventListener("click", function(){ this.style.display = "none"; });
}
function openAppt(e){
  if(e) e.preventDefault();
  var appt = document.getElementById("appt");
  if(appt){ appt.classList.add("open"); }
  else { window.open("https://wa.me/919815605373?text=" + encodeURIComponent("Hello C.L Khanna Jewellers, I would like to book an appointment to visit the store."), "_blank", "noopener"); }
}
function sendAppt(){
  const n = document.getElementById("ap-name").value.trim() || "A customer";
  const msg = "Hello C.L Khanna Jewellers, I would like to book an appointment.\nName: " + n +
    "\nDay: " + document.getElementById("ap-day").value +
    "\nTime: " + document.getElementById("ap-time").value +
    "\nInterested in: " + document.getElementById("ap-int").value;
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank");
  document.getElementById("appt").classList.remove("open");
}
function openLB(src){
  const lb = document.getElementById("lb");
  document.getElementById("lbimg").src = src;
  lb.style.display = "flex";
}

var _webp = (function(){ try { var c=document.createElement('canvas'); return c.toDataURL('image/webp').indexOf('data:image/webp')===0; } catch(e){ return false; } })();
function imgURL(p){ if (p && p.image_url) return p.image_url; return 'assets/catalog/'+p.cat+'/'+p.img+(_webp?'.webp':'.jpg'); }

/* ---------- product cards / catalogue ---------- */
function cardHTML(p){
  const wled = isWishlisted(p.img);
  return `
  <a class="card rv in" data-s="${esc(p.sub)}" data-g="${esc(p.gender||'women')}" href="product.html?id=${esc(p.img)}">
    <div class="ph">
      <img loading="lazy" src="${imgURL(p)}" alt="${esc(p.name)}, ${esc(CAT_TITLES[p.cat]||'')} — C.L Khanna Jewellers Amritsar">
      <button class="wl-btn" aria-label="${wled?'Remove from wishlist':'Add to wishlist'}" data-wid="${esc(p.img)}" onclick="event.preventDefault();event.stopPropagation();toggleWishlist('${esc(p.img)}',this)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${wled?'var(--gold)':'none'}" stroke="${wled?'var(--gold)':'currentColor'}" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
    <div class="info">
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <span class="card-price">${fmtPrice(p.price_from)}</span>
    </div>
  </a>`;
}
const FILTER_CATS = [
  {keys:"sets",              label:"Chokers & Sets"},
  {keys:"bangles,bracelets", label:"Bracelets & Bangles"},
  {keys:"earrings",          label:"Earrings & Studs"},
  {keys:"rings",             label:"Rings"},
];

function applyCatalogFilter(){
  const grid = document.getElementById("grid");
  const count = document.getElementById("count");
  const fsBody = document.getElementById("fs-body");
  if (!grid) return;
  const checkedCatKeys = fsBody
    ? Array.from(fsBody.querySelectorAll('.fs-check input[data-sub-keys]:checked'))
        .flatMap(i => i.dataset.subKeys.split(','))
    : [];
  const checkedGenders = fsBody
    ? Array.from(fsBody.querySelectorAll('.fs-check input[data-gender]:checked'))
        .map(i => i.dataset.gender)
    : [];
  let n = 0;
  grid.querySelectorAll(".card").forEach(c => {
    const catOk    = checkedCatKeys.length  === 0 || checkedCatKeys.includes(c.dataset.s);
    const genderOk = checkedGenders.length  === 0 || checkedGenders.includes(c.dataset.g || 'women');
    const show = catOk && genderOk;
    c.style.display = show ? "" : "none";
    if (show) n++;
  });
  if (count) count.textContent = n + " piece" + (n === 1 ? "" : "s");
}

function onSidebarChange(){
  applyCatalogFilter();
}

function buildFilterSidebar(cat, catProducts){
  const fsBody = document.getElementById("fs-body");
  if (!fsBody) return;
  const subCounts = {};
  let womenCount = 0, menCount = 0;
  catProducts.forEach(p => {
    subCounts[p.sub] = (subCounts[p.sub] || 0) + 1;
    if ((p.gender || 'women') === 'men') menCount++; else womenCount++;
  });
  const catRows = FILTER_CATS.map(({keys, label}) => {
    const cnt = keys.split(',').reduce((s, k) => s + (subCounts[k] || 0), 0);
    return `<label class="fs-check"><input type="checkbox" data-sub-keys="${esc(keys)}" onchange="onSidebarChange()"><span>${esc(label)} <span class="fs-cnt">(${cnt})</span></span></label>`;
  }).join('');
  fsBody.innerHTML =
    `<div class="fs-group">
      <button class="fs-group-hd" onclick="toggleFsGroup(this)">Category <span class="fs-toggle-icon">−</span></button>
      <div class="fs-group-body">${catRows}</div>
    </div>
    <div class="fs-group">
      <button class="fs-group-hd" onclick="toggleFsGroup(this)">Gender <span class="fs-toggle-icon">−</span></button>
      <div class="fs-group-body">
        <label class="fs-check"><input type="checkbox" data-gender="women" onchange="onSidebarChange()"><span>Women <span class="fs-cnt">(${womenCount})</span></span></label>
        <label class="fs-check"><input type="checkbox" data-gender="men" onchange="onSidebarChange()"><span>Men <span class="fs-cnt">(${menCount})</span></span></label>
      </div>
    </div>`;
}

function toggleFsGroup(btn){
  const group = btn.closest(".fs-group");
  const icon = btn.querySelector(".fs-toggle-icon");
  group.classList.toggle("collapsed");
  icon.textContent = group.classList.contains("collapsed") ? "+" : "−";
}

function toggleFilterPanel(open){
  const sidebar = document.getElementById("filter-sidebar");
  const veil = document.getElementById("fs-veil");
  if (sidebar) sidebar.classList.toggle("open", open);
  if (veil) veil.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}

function renderCatalog(cat){
  const grid = document.getElementById("grid");
  const catProducts = PRODUCTS.filter(p => p.cat === cat);
  grid.innerHTML = catProducts.map(cardHTML).join("");
  skelLoaded(grid);
  buildFilterSidebar(cat, catProducts);
  const want = new URLSearchParams(location.search).get("sub");
  if (want) {
    const fsBody = document.getElementById("fs-body");
    if (fsBody) {
      const cbs = Array.from(fsBody.querySelectorAll('.fs-check input[data-sub-keys]'));
      const match = cbs.find(inp => inp.dataset.subKeys.split(',').includes(want));
      if (match) { match.checked = true; applyCatalogFilter(); return; }
    }
  }
  applyCatalogFilter();
}

/* ---------- product detail ---------- */
let _pdDescFull = "", _pdDescShort = "";

function toggleReadMore(){
  const el = document.getElementById("pd-desc-txt");
  const btn = document.getElementById("pd-rm-btn");
  if (!el || !btn) return;
  const expanding = btn.textContent.trim() === "Read More";
  el.textContent = expanding ? _pdDescFull : _pdDescShort;
  btn.textContent = expanding ? "Read Less" : "Read More";
}

function checkPinCode(){
  const val = (document.getElementById("pd-pin-val") || {}).value || "";
  const res = document.getElementById("pd-pin-result");
  if (!res) return;
  if (!val.trim()) { res.textContent = "Please enter a pin code."; res.style.color = "#b87c2a"; return; }
  res.textContent = "We deliver across India — free insured shipping.";
  res.style.color = "#3d9c5a";
}

/* ---- Wishlist (localStorage) ---- */
function _wlGet(){ try{ return JSON.parse(localStorage.getItem('clj_wl')||'[]'); }catch(e){ return []; } }
function _wlSet(a){ try{ localStorage.setItem('clj_wl', JSON.stringify(a)); }catch(e){} }
function isWishlisted(id){ return _wlGet().includes(id); }
function _wlSyncBtn(btn, on){
  if (!btn) return;
  btn.setAttribute('aria-label', on ? 'Remove from wishlist' : 'Add to wishlist');
  btn.classList.toggle('wl-on', on);
  const path = btn.querySelector('path');
  if (path){ path.setAttribute('fill', on ? 'var(--gold)' : 'none'); path.setAttribute('stroke', on ? 'var(--gold)' : 'currentColor'); }
}
function toggleWishlist(id, btn){
  // Saving favourites requires an account — logged-out taps open the sign-in modal and save nothing.
  if (typeof sbUser === 'undefined' || !sbUser){
    if (typeof openAuth === 'function') openAuth('Please sign in to save favourites.');
    return;
  }
  const a = _wlGet();
  const i = a.indexOf(id);
  const adding = (i === -1);
  if (adding) a.push(id); else a.splice(i, 1);
  _wlSet(a);
  const on = a.includes(id);
  document.querySelectorAll('.wl-btn[data-wid="'+id+'"]').forEach(b => _wlSyncBtn(b, on));
  // Persist per-user under RLS (instant UI above; DB sync is fire-and-forget).
  if (typeof cloudSaveWishlist === 'function') cloudSaveWishlist(a);
  // Let the Account wishlist view react (e.g. drop a card that was just un-hearted).
  if (typeof window.onWishlistChange === 'function') window.onWishlistChange(id, on);
}
// Re-sync all heart buttons on the page from stored favourites (used after login merge).
function refreshHearts(){
  const a = _wlGet();
  document.querySelectorAll('.wl-btn').forEach(b => _wlSyncBtn(b, a.includes(b.getAttribute('data-wid'))));
}

/* ---- Share ---- */
function shareProduct(name){
  const url = location.href;
  const data = { title: name + ' — C.L Khanna Jewellers', url };
  if (navigator.share && navigator.canShare && navigator.canShare(data)){
    navigator.share(data).catch(()=>{});
  } else {
    const btn = document.querySelector('.pd-share-btn');
    if (navigator.clipboard){
      navigator.clipboard.writeText(url).then(() => {
        if (btn){ const t = btn.textContent; btn.textContent = 'Link Copied!'; setTimeout(()=>{ btn.textContent = t; }, 2000); }
      }).catch(() => prompt('Copy this link:', url));
    } else { prompt('Copy this link:', url); }
  }
}

/* ---- Ask → WhatsApp ---- */
function submitAskWA(e, productName){
  e.preventDefault();
  const f = e.target;
  const name = f.querySelector('[name=ask-name]').value.trim();
  const phone = f.querySelector('[name=ask-phone]').value.trim();
  const query = f.querySelector('[name=ask-query]').value.trim();
  const text = 'Hello C.L Khanna Jewellers,\n\nProduct: ' + productName + '\nName: ' + name + '\nPhone: ' + phone + '\nQuery: ' + query;
  window.open('https://wa.me/919815605373?text=' + encodeURIComponent(text), '_blank', 'noopener');
}

/* ---- Star picker ---- */
function pickStar(e){
  const star = e.target.closest('.sps');
  if (!star) return;
  const val = parseInt(star.dataset.v);
  const container = star.closest('.star-pick');
  container.querySelectorAll('.sps').forEach((s,i) => s.classList.toggle('on', i < val));
  const inp = container.querySelector('input[type=hidden]');
  if (inp) inp.value = val;
}
function hoverStar(e){
  const star = e.target.closest('.sps');
  if (!star) return;
  const val = parseInt(star.dataset.v);
  star.closest('.star-pick').querySelectorAll('.sps').forEach((s,i) => s.classList.toggle('hov', i < val));
}
function unhoverStar(e){
  e.currentTarget.querySelectorAll('.sps').forEach(s => s.classList.remove('hov'));
}

/* ---- Reviews ---- */
async function loadReviews(productImg){
  const list = document.getElementById('pd-rv-list');
  const summary = document.getElementById('pd-rv-summary');
  if (!list) return;
  showReviewSkeletons(list, 3);
  if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL){ _renderReviews([]); return; }
  const safeTimer = setTimeout(function(){ _renderReviews([]); }, 6000);
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/reviews?product_img=eq.' + encodeURIComponent(productImg) + '&order=created_at.desc', {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY }
    });
    clearTimeout(safeTimer);
    _renderReviews(r.ok ? (await r.json()) : []);
  } catch(err){ clearTimeout(safeTimer); _renderReviews([]); }
}
function _renderReviews(rows){
  const list = document.getElementById('pd-rv-list');
  const summary = document.getElementById('pd-rv-summary');
  if (!list) return;
  const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
  if (!rows.length){
    if (summary) summary.innerHTML = '';
    list.innerHTML = '<p class="rv-empty">Be the first to review this item.</p>';
    skelLoaded(list);
    return;
  }
  const avg = rows.reduce((s,r) => s + (r.rating||0), 0) / rows.length;
  if (summary) summary.innerHTML = `<div class="rv-avg"><span class="rv-stars">${stars(avg)}</span><span class="rv-score">${avg.toFixed(1)}</span><span class="rv-ct">(${rows.length} review${rows.length>1?'s':''})</span></div>`;
  const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '';
  list.innerHTML = rows.map(r => `<div class="rv-item"><div class="rv-meta"><span class="rv-name">${esc(r.name||'Anonymous')}</span><span class="rv-date">${fmt(r.created_at)}</span></div><div class="rv-rating">${stars(r.rating||0)}</div>${r.comment?'<p class="rv-comment">'+esc(r.comment)+'</p>':''}</div>`).join('');
  skelLoaded(list);
}
async function submitReview(e){
  e.preventDefault();
  const form = e.target;
  const productImg = form.dataset.pid;
  const name = form.querySelector('[name=rv-name]').value.trim().slice(0, 100);
  const rating = parseInt(form.querySelector('[name=rv-rating]').value || '0');
  const comment = form.querySelector('[name=rv-comment]').value.trim().slice(0, 1000);
  if (!rating){ alert('Please select a star rating.'); return; }
  if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL){ alert('Reviews service unavailable.'); return; }
  const btn = form.querySelector('[type=submit]');
  btn.disabled = true; btn.textContent = 'Saving…';
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/reviews', {
      method: 'POST',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ product_img: productImg, name: name||'Anonymous', rating, comment })
    });
    btn.disabled = false; btn.textContent = 'Submit Review';
    if (r.ok || r.status === 201){
      form.reset();
      form.querySelectorAll('.sps').forEach(s => s.classList.remove('on'));
      loadReviews(productImg);
    } else { alert('Could not save your review. Please try again.'); }
  } catch(err){ btn.disabled = false; btn.textContent = 'Submit Review'; alert('Could not save your review. Please try again.'); }
}

/* ---- Complete the Look ---- */
function renderCompleteTheLook(cat, sub, currentId){
  const grid = document.getElementById('pd-ctl-grid');
  if (!grid) return;
  const picks = PRODUCTS.filter(p => p.cat === cat && p.sub === sub && p.img !== currentId)
    .sort(() => Math.random() - 0.5).slice(0, 2);
  if (!picks.length){ grid.closest('.pd-ctl').style.display = 'none'; return; }
  grid.innerHTML = picks.map(p => `
    <a class="pd-ctl-card" href="product.html?id=${esc(p.img)}">
      <img src="${imgURL(p)}" alt="${esc(p.name)}">
      <div><span class="pd-ctl-name">${esc(p.name)}</span><span class="pd-ctl-meta">${esc(p.metal)}</span></div>
    </a>`).join('');
}

/* ---- You May Also Like ---- */
function renderYMAL(cat, currentId){
  const grid = document.getElementById('pd-ymal-grid');
  if (!grid) return;
  const others = PRODUCTS.filter(p => p.cat === cat && p.img !== currentId);
  const picks = others.sort(() => Math.random() - 0.5).slice(0, 4);
  grid.innerHTML = picks.map(cardHTML).join('');
}

function renderProduct(){
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find(x => x.img === id) || PRODUCTS[0];
  const safeCat = ['gold','diamond','polki'].includes(p.cat) ? p.cat : 'gold';
  const subLabel = (SUBS[safeCat].find(([k]) => k === p.sub) || ["",""])[1];
  document.title = esc(p.name) + " — C.L Khanna Jewellers";
  var _desc = p.desc + " " + CAT_TITLES[safeCat] + " by C.L Khanna Jewellers, Lawrence Road Amritsar. BIS hallmarked, " + p.metal + ".";
  var _url  = "https://clkhannajewellers.in/product.html?id=" + encodeURIComponent(p.img);
  var _img  = "https://clkhannajewellers.in/assets/catalog/" + safeCat + "/" + p.img + ".jpg";
  (function(m,k,v){ var el=document.querySelector('meta[name="'+k+'"]')||document.querySelector('meta[property="'+k+'"]'); if(el) el.setAttribute('content',v); }); // helper reference
  [['name','description',_desc],['property','og:title',document.title],['property','og:description',_desc],['property','og:url',_url],['property','og:image',_img],['name','twitter:title',document.title],['name','twitter:description',_desc],['name','twitter:image',_img]].forEach(function(t){ var el=document.querySelector('meta['+t[0]+'="'+t[1]+'"]'); if(el) el.setAttribute('content',t[2]); });
  var canon = document.querySelector('link[rel="canonical"]'); if(canon) canon.setAttribute('href', _url);
  /* Product schema for Google rich results */
  var _pdSchema = document.getElementById('pd-schema');
  if (_pdSchema) _pdSchema.remove();
  var _pdSchemaEl = document.createElement('script');
  _pdSchemaEl.id = 'pd-schema';
  _pdSchemaEl.type = 'application/ld+json';
  var _schema = {"@context":"https://schema.org","@type":"Product","name":p.name,"description":_desc,"image":_img,"brand":{"@type":"Brand","name":"C.L Khanna Jewellers"},"category":CAT_TITLES[safeCat],"material":p.metal,"offers":{"@type":"Offer","availability":"https://schema.org/InStock","priceCurrency":"INR","seller":{"@type":"Organization","name":"C.L Khanna Jewellers","url":"https://clkhannajewellers.in"}}};
  if (p.price_from) _schema.offers.price = p.price_from;
  _pdSchemaEl.textContent = JSON.stringify(_schema);
  document.head.appendChild(_pdSchemaEl);
  const TRUNC = 130;
  _pdDescFull = p.desc;
  _pdDescShort = p.desc.length > TRUNC ? p.desc.slice(0, TRUNC).replace(/\s+\S*$/, '') + '…' : p.desc;
  const needRM = p.desc.length > TRUNC;
  const wled = isWishlisted(p.img);
  document.getElementById("pd").innerHTML =
  `<nav class="crumbs"><a href="./">Home</a> / <a href="${safeCat}.html">${esc(CAT_TITLES[safeCat])}</a> / <a href="${safeCat}.html?sub=${esc(p.sub)}">${esc(subLabel)}</a> / <span>${esc(p.name)}</span></nav>
  <div class="pd-grid">
    <div class="pd-left">
      <div class="pd-photo" id="zoomBox">
        <img id="zoomImg" src="${imgURL(p)}" alt="${esc(p.name)}">
        <button class="wl-btn" aria-label="${wled?'Remove from wishlist':'Add to wishlist'}" data-wid="${esc(p.img)}" onclick="toggleWishlist('${esc(p.img)}',this)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${wled?'var(--gold)':'none'}" stroke="${wled?'var(--gold)':'currentColor'}" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="pd-ctl">
        <p class="pd-ctl-h">Complete the Look</p>
        <div id="pd-ctl-grid"></div>
      </div>
    </div>
    <div class="pd-info">
      <p class="eyebrow">${esc(CAT_TITLES[safeCat])} · ${esc(subLabel)}</p>
      <h1>${esc(p.name)}</h1>
      <p class="pd-instock"><span class="pd-dot" aria-hidden="true"></span>In Stock &nbsp;·&nbsp; <span class="pd-tax">Taxes inclusive</span></p>
      <p class="pd-desc" id="pd-desc-txt">${esc(needRM ? _pdDescShort : _pdDescFull)}</p>
      ${needRM ? '<button class="pd-readmore" id="pd-rm-btn" onclick="toggleReadMore()">Read More</button>' : ''}
      <div class="pd-specs">
        <div><b>Metal</b><span>${esc(p.metal)}</span></div>
        <div><b>Craftsmanship</b><span>${esc(p.work)}</span></div>
        <div><b>Occasion</b><span>${esc(p.occasion)}</span></div>
        <div><b>Price</b><span>${p.price_from ? 'from ₹' + Number(p.price_from).toLocaleString('en-IN') + ' · varies with the daily rate' : 'Price on request'}</span></div>
        <div><b>Certification</b><span>BIS hallmarked</span></div>
      </div>
      <div class="trust-badges">
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.56 14.29L7 22l5-3 5 3-1.56-7.72"/></svg><span>100% Certified Jewellery</span></div>
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg><span>Free Shipping Across India</span></div>
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg><span>Purity Guaranteed</span></div>
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg><span>Lifetime Buyback &amp; Exchange</span></div>
      </div>
      <div class="pd-pincode" id="pd-delivery">
        <p class="pd-pin-label">Enter your pin code to check delivery availability</p>
        <div class="pd-pin-row">
          <input class="pd-pin-input" type="text" inputmode="numeric" maxlength="6" placeholder="e.g. 143001" id="pd-pin-val">
          <button class="pd-pin-btn" onclick="checkPinCode()">Check</button>
        </div>
        <p class="pd-pin-result" id="pd-pin-result"></p>
      </div>
      <div class="cta-row">
        <a class="btn solid" href="#" onclick="addToCart(this.dataset.prod);return false;" data-prod="${esc(p.img)}">Add to Cart</a>
        <a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Hello C.L Khanna Jewellers, I would like to request the price of the "' + p.name + '" (' + CAT_TITLES[safeCat] + ') from your website.')}">Request Price on WhatsApp</a>
        <button class="btn ghost pd-share-btn" onclick="shareProduct('${esc(p.name)}')">Share</button>
        <a class="btn ghost" href="#" onclick="openAppt(event)">See It In Store</a>
      </div>
      <p class="pd-note">Every piece can be customised — sizes, stones and finish. <a href="custom.html">Learn about custom orders →</a></p>
    </div>
  </div>

  <div class="pd-cols">
    <div class="pd-ask">
      <h3 class="pd-sec-h">Have a Question?</h3>
      <form onsubmit="submitAskWA(event,'${esc(p.name)}')">
        <div class="pd-form-group"><label>Name</label><input type="text" name="ask-name" placeholder="Your name" required></div>
        <div class="pd-form-group"><label>Phone</label><input type="tel" name="ask-phone" placeholder="+91 98765 43210" required></div>
        <div class="pd-form-group"><label>Your Question</label><textarea name="ask-query" rows="4" placeholder="e.g. Is this available in 22k gold?" required></textarea></div>
        <button type="submit" class="btn solid">Send on WhatsApp</button>
      </form>
    </div>
    <div class="pd-revs">
      <h3 class="pd-sec-h">Ratings &amp; Reviews</h3>
      <div id="pd-rv-summary"></div>
      <div id="pd-rv-list"><p class="rv-empty">Loading…</p></div>
      <div class="pd-rv-write">
        <h4>Write a Review</h4>
        <form data-pid="${esc(p.img)}" onsubmit="submitReview(event)">
          <div class="pd-form-group"><label>Your Name</label><input type="text" name="rv-name" placeholder="e.g. Priya S." required></div>
          <div class="pd-form-group"><label>Rating</label>
            <div class="star-pick" onclick="pickStar(event)" onmouseover="hoverStar(event)" onmouseout="unhoverStar(event)">
              <span class="sps" data-v="1">★</span><span class="sps" data-v="2">★</span><span class="sps" data-v="3">★</span><span class="sps" data-v="4">★</span><span class="sps" data-v="5">★</span>
              <input type="hidden" name="rv-rating">
            </div>
          </div>
          <div class="pd-form-group"><label>Comment <span style="font-family:var(--serif);font-style:italic;text-transform:none;letter-spacing:0;font-size:.82rem;color:var(--muted)">(optional)</span></label><textarea name="rv-comment" rows="3" placeholder="Share your experience…"></textarea></div>
          <button type="submit" class="btn solid">Submit Review</button>
        </form>
      </div>
    </div>
  </div>

  <div class="pd-ymal">
    <h3 class="pd-ymal-h">You May Also Like</h3>
    <div class="grid" id="pd-ymal-grid"></div>
  </div>`;

  const box = document.getElementById("zoomBox"), img = document.getElementById("zoomImg");
  box.addEventListener("mousemove", e => {
    if (e.target.closest('.wl-btn')) return;
    const r = box.getBoundingClientRect();
    img.style.transformOrigin = (((e.clientX - r.left) / r.width) * 100) + "% " + (((e.clientY - r.top) / r.height) * 100) + "%";
    img.style.transform = "scale(2)";
  });
  box.addEventListener("mouseleave", () => { img.style.transform = "scale(1)"; });
  loadReviews(p.img);
  renderYMAL(p.cat, p.img);
  renderCompleteTheLook(p.cat, p.sub, p.img);
}

/* ---------- hero slider ---------- */
function startSlider(){
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dots button");
  if (!slides.length) return;
  let i = 0, t;
  function go(n){
    i = (n + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle("on", j === i));
    dots.forEach((d, j) => d.classList.toggle("on", j === i));
    clearInterval(t); t = setInterval(() => go(i + 1), 5600);
  }
  dots.forEach((d, j) => d.addEventListener("click", () => go(j)));
  go(0);
}

/* ---------- testimonial carousel ---------- */
function startTesti(){
  const cards = document.querySelectorAll(".t-slide");
  const dots = document.querySelectorAll(".t-dots button");
  if (!cards.length) return;
  let i = 0, t;
  function go(n){
    i = (n + cards.length) % cards.length;
    cards.forEach((c, j) => c.classList.toggle("on", j === i));
    dots.forEach((d, j) => d.classList.toggle("on", j === i));
    clearInterval(t); t = setInterval(() => go(i + 1), 6500);
  }
  dots.forEach((d, j) => d.addEventListener("click", () => go(j)));
  go(0);
}

/* ---------- reveal ---------- */
function reveals(){
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
  }), {threshold:.1});
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
}


/* ---------- a11y: keyboard support + escape-to-close ---------- */
function enhanceA11y(){
  document.querySelectorAll('a[onclick]:not([href]), .gallery a, .lookbook a, .ed-track a').forEach(el=>{
    if(el.getAttribute('href')) return;
    if(!el.hasAttribute('tabindex')) el.setAttribute('tabindex','0');
    if(!el.getAttribute('role')) el.setAttribute('role','button');
    if(el.dataset.kb) return; el.dataset.kb='1';
    el.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); el.click(); } });
  });
}
function closeAllOverlays(){
  const lb=document.getElementById('lb'); if(lb) lb.style.display='none';
  closeSearch&&closeSearch();
  toggleDrawer&&toggleDrawer(false);
  document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAllOverlays(); });

/* ---------- carousel touch / mouse drag swipe ---------- */
function addCarouselSwipe(carousel) {
  var track = carousel.querySelector('.ed-track');
  if (!track || track.id === 'editorial-track') return;
  var sx = 0, sy = 0, baseX = 0, lastX = 0, dragging = false, moved = false;

  /* inject progress bar (skip editorial carousel) */
  var bar = { style: {} };
  if (track.id !== 'editorial-track') {
    var prog = document.createElement('div'); prog.className = 'ed-progress';
    bar = document.createElement('div'); bar.className = 'ed-bar';
    prog.appendChild(bar); carousel.parentNode.insertBefore(prog, carousel.nextSibling);
    var dur = parseFloat(getComputedStyle(track).animationDuration) || 46;
    bar.style.animationDuration = dur + 's';
  }

  function snapX() {
    try { return new DOMMatrix(getComputedStyle(track).transform).m41 || 0; } catch(e) { return 0; }
  }

  function start(x, y) {
    sx = x; sy = y;
    baseX = lastX = snapX();
    track.style.animationPlayState = 'paused';
    bar.style.animationPlayState  = 'paused';
    track.style.transform = 'translateX(' + baseX + 'px)';
    dragging = true; moved = false;
  }

  function move(x, y) {
    if (!dragging) return;
    var dx = x - sx, dy = y - sy;
    if (!moved && Math.abs(dy) > Math.abs(dx) + 4) { dragging = false; release(); return; }
    if (Math.abs(dx) > 5) moved = true;
    lastX = baseX + dx;
    track.style.transform = 'translateX(' + lastX + 'px)';
  }

  function release() {
    if (!moved) {
      track.style.transform = '';
      track.style.animationPlayState = '';
      return;
    }
    var half = track.offsetWidth * 0.5;
    if (!half) { track.style.transform = ''; track.style.animationPlayState = ''; return; }
    var norm = lastX % half;
    if (norm > 0) norm -= half;
    var dur = parseFloat(getComputedStyle(track).animationDuration) || 46;
    var delay = -(Math.abs(norm) / half * dur);
    /* restart CSS animation from the swiped position via custom property */
    track.style.setProperty('--_ed-nm', 'none');
    track.getBoundingClientRect();
    track.style.setProperty('--_ed-dl', delay + 's');
    track.style.setProperty('--_ed-nm', 'edscroll');
    track.style.animationPlayState = '';
    bar.style.animationPlayState  = '';
    track.style.transform = '';
  }

  function end() { if (!dragging) return; dragging = false; release(); }

  carousel.addEventListener('touchstart', function(e) {
    start(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  carousel.addEventListener('touchmove', function(e) {
    if (!dragging) return;
    if (Math.abs(e.touches[0].clientX - sx) > Math.abs(e.touches[0].clientY - sy)) e.preventDefault();
    move(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  carousel.addEventListener('touchend', end);

  carousel.addEventListener('mousedown', function(e) {
    if (e.button !== 0 || e.target.closest('.wl-btn')) return;
    start(e.clientX, e.clientY);
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) { move(e.clientX, e.clientY); });
  document.addEventListener('mouseup', end);

  /* suppress link/button click after a real drag */
  carousel.addEventListener('click', function(e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);
}

function initPage(active){
  try { buildHeader(active); } catch(e){ console.error("buildHeader failed:", e); }
  try { buildFooter(); } catch(e){ console.error("buildFooter failed:", e); }
  try { buildShells(); } catch(e){ console.error("buildShells failed:", e); }
  try { reveals(); } catch(e){}
  try { if (typeof updateCartBadge === "function") updateCartBadge(); } catch(e){}
  try {
    enhanceA11y();
    new MutationObserver(enhanceA11y).observe(document.body,{childList:true,subtree:true});
  } catch(e){}
  try { document.querySelectorAll('.ed-carousel').forEach(addCarouselSwipe); } catch(e){}
}
/* C.L Khanna — CMS loader (safe, non-blocking)
   Each page first renders the built-in catalogue (catalog.js) immediately, so
   the site ALWAYS shows. This then quietly upgrades to the database products
   if they load. Any failure or slowness is ignored — the page is never blocked. */
(function(){
  if (typeof SUPABASE_URL === "undefined" || !SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  var ctrl = new AbortController();
  var timer = setTimeout(function(){ try{ ctrl.abort(); }catch(e){} }, 6000);
  fetch(SUPABASE_URL + "/rest/v1/products?select=*&order=sort.asc", {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: "Bearer " + SUPABASE_ANON_KEY },
    signal: ctrl.signal
  })
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(rows){
    clearTimeout(timer);
    if (Array.isArray(rows) && rows.length){
      window.PRODUCTS = rows.map(function(r){ return {
        img:r.img, cat:r.cat, sub:r.sub, name:r.name, desc:r.description||"",
        metal:r.metal||"", work:r.work||"", occasion:r.occasion||"", image_url:r.image_url||"",
        price_from: r.price_from ?? null
      };});
      if (typeof window.__cmsRender === "function"){ try{ window.__cmsRender(); }catch(e){} }
    }
  })
  .catch(function(){ clearTimeout(timer); });
})();

/* ---- Site config: homepage category order + featured products ---- */
(function(){
  if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  var ctrl = new AbortController();
  var timer = setTimeout(function(){ try{ ctrl.abort(); }catch(e){} }, 4000);
  fetch(SUPABASE_URL + '/rest/v1/site_config?select=key,value', {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY },
    signal: ctrl.signal
  })
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(rows){
    clearTimeout(timer);
    if (!Array.isArray(rows) || !rows.length) return;
    var cfg = {};
    rows.forEach(function(r){ cfg[r.key] = r.value; });
    window.__siteConfig = cfg;
    if (typeof window.__siteConfigReady === 'function'){ try{ window.__siteConfigReady(cfg); }catch(e){} }
  })
  .catch(function(){ clearTimeout(timer); });
})();

/* ---- Editorial / model photos: load from Supabase if any, else keep built-in ---- */
(function(){
  if (typeof SUPABASE_URL === "undefined" || !SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  var track = document.getElementById("editorial-track");
  if (!track) return;
  var staticHTML = track.innerHTML;
  if (typeof showSkeletons === "function") showSkeletons(track, 3);
  var ctrl = new AbortController();
  var timer = setTimeout(function(){ try{ ctrl.abort(); }catch(e){} track.innerHTML = staticHTML; }, 6000);
  fetch(SUPABASE_URL + "/rest/v1/editorial_images?select=*&order=sort.asc", {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: "Bearer " + SUPABASE_ANON_KEY },
    signal: ctrl.signal
  })
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(rows){
    clearTimeout(timer);
    if (!Array.isArray(rows) || !rows.length) { track.innerHTML = staticHTML; skelLoaded(track); return; }
    function makeCell(u, hidden){
      var a = document.createElement('a');
      if (hidden){ a.setAttribute('aria-hidden','true'); a.setAttribute('tabindex','-1'); }
      var img = document.createElement('img');
      img.setAttribute('loading','lazy');
      img.src = u;
      img.alt = 'Editorial photo';
      a.appendChild(img);
      a.addEventListener('click', function(){ openLB(u); });
      return a;
    }
    var frag = document.createDocumentFragment();
    rows.forEach(function(r){ frag.appendChild(makeCell(r.image_url, false)); });
    rows.forEach(function(r){ frag.appendChild(makeCell(r.image_url, true)); });
    track.innerHTML = '';
    track.appendChild(frag);
    skelLoaded(track);
  })
  .catch(function(){ clearTimeout(timer); track.innerHTML = staticHTML; skelLoaded(track); });
})();
