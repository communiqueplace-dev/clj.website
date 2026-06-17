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
  hit.qty = Math.max(1, hit.qty + d);
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
function sbReady(){ return !!(SUPABASE_URL && SUPABASE_ANON_KEY); }
function initSupabase(){
  if (!sbReady()) return;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  s.onload = async () => {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await sb.auth.getSession();
    if (data && data.session){ sbUser = data.session.user; afterLogin(); }
    refreshAuthUI();
  };
  document.head.appendChild(s);
}
function openAuth(msg){
  if (!sbReady()){
    alert("Accounts are launching soon.\nYour cart is already saved on this device — and you can send it to us on WhatsApp any time.");
    return;
  }
  document.getElementById("auth").classList.add("open");
  refreshAuthUI();
  if (msg){ switchAuthTab('in'); }            // show the sign-in view for a prompt
  var aErr = document.getElementById('au-err');
  if (aErr){ aErr.textContent = msg || ''; aErr.style.color = msg ? 'var(--gold-deep)' : ''; }
}
function refreshAuthUI(){
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
    if (pass.length < 8){ errEl.textContent = 'Password must be at least 8 characters.'; return; }
    if (pwStrength(pass) < 2){ errEl.textContent = 'Please choose a stronger password — try adding numbers or symbols.'; return; }
  } else {
    if (!pass){ errEl.textContent = 'Please enter your password.'; return; }
  }

  var btn = document.getElementById('au-main-btn');
  btn.disabled = true;
  btn.textContent = _authMode === 'in' ? 'Signing in...' : 'Creating account...';

  var result = _authMode === 'up'
    ? await sb.auth.signUp({ email: email, password: pass })
    : await sb.auth.signInWithPassword({ email: email, password: pass });

  btn.disabled = false;
  btn.textContent = _authMode === 'in' ? 'Sign In' : 'Create Account';

  var data = result.data, error = result.error;
  if (error){
    var msg = error.message || '';
    if (msg.includes('Invalid login credentials') || msg.includes('invalid_grant')){
      errEl.textContent = 'Incorrect email or password. Please try again.';
    } else if (msg.includes('User already registered') || msg.includes('already registered') || msg.includes('already exists')){
      errEl.textContent = 'An account with this email already exists — please sign in instead.';
      setTimeout(function(){ switchAuthTab('in'); }, 1800);
    } else if (msg.includes('Email not confirmed')){
      errEl.textContent = 'Please confirm your email first — check your inbox.';
    } else if (msg.includes('rate limit') || msg.includes('too many')){
      errEl.textContent = 'Too many attempts — please wait a moment and try again.';
    } else {
      errEl.textContent = msg || 'Something went wrong. Please try again.';
    }
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
}
async function cloudSaveCart(items){
  if (!sb || !sbUser) return;
  try {
    await sb.from("carts").upsert({ user_id: sbUser.id, items, updated_at: new Date().toISOString() });
  } catch(e){}
}

/* auth modal shell — injected on every page */
function buildAuthShell(){
  document.body.insertAdjacentHTML('beforeend',
    '<div class="modal" id="auth">' +
      '<div class="box">' +
        '<button class="x" onclick="document.getElementById(\'auth\').classList.remove(\'open\')">&#215;</button>' +
        '<h3>Your Account</h3>' +
        '<p class="sub">Save your cart and enquiries across devices.</p>' +
        '<div class="auth-tabs" id="auth-tabs">' +
          '<button class="auth-tab auth-tab-on" id="tab-in" onclick="switchAuthTab(\'in\')">Sign In</button>' +
          '<button class="auth-tab" id="tab-up" onclick="switchAuthTab(\'up\')">Create Account</button>' +
        '</div>' +
        '<div id="auth-forms">' +
          '<label>Email</label>' +
          '<input id="au-email" type="email" placeholder="you@example.com" autocomplete="email">' +
          '<label>Password</label>' +
          '<input id="au-pass" type="password" placeholder="Password" autocomplete="current-password" oninput="onAuthPassInput()">' +
          '<div class="pw-strength-wrap" id="au-sw" style="display:none">' +
            '<div class="pw-bar" id="pw-bar"></div>' +
            '<p class="pw-hint" id="pw-hint"></p>' +
          '</div>' +
          '<div class="au-fp-wrap" id="au-fp"><button class="auth-forgot" onclick="showForgotForm()">Forgot password?</button></div>' +
          '<p id="au-err" class="au-err"></p>' +
          '<button class="btn solid" id="au-main-btn" onclick="doAuth()">Sign In</button>' +
        '</div>' +
        '<div id="auth-forgot" style="display:none">' +
          '<p class="sub" style="margin-bottom:12px">Enter your email and we\'ll send a reset link.</p>' +
          '<label>Email</label>' +
          '<input id="au-fe" type="email" placeholder="you@example.com" autocomplete="email">' +
          '<p id="au-ferr" class="au-err"></p>' +
          '<div class="auth-btns">' +
            '<button class="btn solid" onclick="doForgotPassword()">Send Reset Link</button>' +
            '<button class="btn ghost" onclick="showAuthForms()">&#8592; Back</button>' +
          '</div>' +
        '</div>' +
        '<div id="auth-signed" style="display:none">' +
          '<p class="signed">Signed in as <b id="auth-email-show"></b></p>' +
          '<div class="auth-btns">' +
            '<a class="btn ghost" href="cart.html">View My Cart</a>' +
            '<button class="btn solid" onclick="doLogout()">Sign Out</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>');
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
  var btn = document.querySelector('#auth-forgot .btn.solid');
  btn.disabled = true; btn.textContent = 'Sending...';
  var redirectTo = 'https://clkhannajewellers.in/reset-password.html';
  var result = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirectTo });
  btn.disabled = false; btn.textContent = 'Send Reset Link';
  if (result.error){
    var msg = (result.error.message && result.error.message !== '{}') ? result.error.message : 'Could not send reset link. Please try again.';
    ferr.textContent = msg;
  } else {
    ferr.style.color = 'var(--gold-deep)';
    ferr.textContent = 'Reset link sent! Check your inbox (and spam folder).';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildAuthShell();
  updateCartBadge();
  initSupabase();
});
