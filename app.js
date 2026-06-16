/* C.L Khanna Jewellers — shared site logic (v4) */
const WA = "919815605373";
const SUBS = {
  gold:    [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]],
  diamond: [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]],
  polki:   [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]]
};
const CAT_TITLES = {gold:"Gold Jewellery", diamond:"Diamond Jewellery", polki:"Polki Jewellery"};
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

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



/* ---------- header: burger left · logo centre · icons right · hairline ---------- */
function buildHeader(active){
  document.getElementById("site-header").innerHTML = `
  <header class="site">
    <div class="bar">
      <button class="burger" aria-label="Menu" onclick="toggleDrawer(true)"><span></span><span></span><span></span></button>
      <a class="brand" href="index.html"><img src="assets/logo-main.png" alt="C.L Khanna Jewellers"></a>
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
    <a class="d-home" href="index.html">Home</a>
    <div class="d-group">
      <a class="d-cat" href="javascript:void(0)" onclick="this.parentNode.classList.toggle('openg')">Shop <i>+</i></a>
      ${["gold","diamond","polki"].map(c => `
        <a class="d-sub d-strong" href="${c}.html">${CAT_TITLES[c]}</a>
      `).join("")}
    </div>
    <a class="d-cat" href="index.html#collections">Collections</a>
    <a class="d-cat" href="polki.html?sub=sets">Bridal</a>
    <a class="d-cat" href="custom.html">Custom Jewellery</a>
    <a class="d-cat" href="media.html">Media</a>
    <a class="d-cat" href="about.html">About Us</a>
    <a class="d-cat" href="location.html">Contact</a>
    <a class="d-appt" href="#" onclick="openAppt(event);toggleDrawer(false)">Book an Appointment</a>
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
        <img src="${imgURL(p)}" alt="">
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
      <div>
        <h4>Information</h4>
        <a href="about.html">About Us</a>
        <a href="location.html">Contact Us</a>
        <a href="custom.html">Customized Jewellery</a>
        <a href="location.html">Store Location</a>
      </div>
      <div>
        <h4>Policies</h4>
        <a href="privacy.html">Privacy Policy</a>
        <a href="returns.html">Return Policy</a>
        <a href="shipping.html">Shipping Policy</a>
        <a href="terms.html">Terms &amp; Conditions</a>
        <a href="#" onclick="if(typeof openCookieSettings==='function')openCookieSettings();return false;" class="ck-footer-link">Cookie Settings</a>
      </div>
      <div class="git">
        <h4>Get In Touch</h4>
        <a href="https://www.google.com/maps/search/?api=1&query=C.L.+Khanna+Jewellers+Lawrence+Road+Amritsar" target="_blank" rel="noopener"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>C.L Khanna Jewellers, 8 Dilawari Street,<br>Lawrence Road, Amritsar, Punjab</span></a>
        <a href="tel:+919815605373"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a13 13 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>+91 98156 05373</span></a>
        <a href="tel:+917717624298"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a13 13 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>+91 77176 24298</span></a>
        <a href="mailto:clkhannajewellers@gmail.com"><svg width="15" height="15" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>clkhannajewellers@gmail.com</span></a>
      </div>
      <div>
        <h4>Follow Us</h4>
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
    <div class="base">Copyright © <span id="yr"></span> C.L Khanna Jewellers. All rights reserved.</div>
  </div>`;
  document.getElementById("yr").textContent = new Date().getFullYear();
}

function joinNews(e){
  e.preventDefault();
  const email = (document.getElementById("nl-email") || {}).value || "";
  if (!email) return false;
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
function openAppt(e){ if(e) e.preventDefault(); document.getElementById("appt").classList.add("open"); }
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

function imgURL(p){ return (p && p.image_url) ? p.image_url : 'assets/catalog/'+p.cat+'/'+p.img+'.jpg'; }

/* ---------- product cards / catalogue ---------- */
function cardHTML(p){
  const wled = isWishlisted(p.img);
  return `
  <a class="card rv in" data-s="${esc(p.sub)}" href="product.html?id=${esc(p.img)}">
    <div class="ph">
      <img loading="lazy" src="${imgURL(p)}" alt="${esc(p.name)}">
      <button class="wl-btn" aria-label="${wled?'Remove from wishlist':'Add to wishlist'}" data-wid="${esc(p.img)}" onclick="event.preventDefault();event.stopPropagation();toggleWishlist('${esc(p.img)}',this)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${wled?'var(--gold)':'none'}" stroke="${wled?'var(--gold)':'currentColor'}" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
    <div class="info">
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
    </div>
  </a>`;
}
function applyCatalogFilter(){
  const grid = document.getElementById("grid");
  const count = document.getElementById("count");
  const fsBody = document.getElementById("fs-body");
  if (!grid) return;
  const checked = fsBody
    ? Array.from(fsBody.querySelectorAll('.fs-check input[data-sub]:checked')).map(i => i.dataset.sub)
    : [];
  let n = 0;
  grid.querySelectorAll(".card").forEach(c => {
    const show = checked.length === 0 || checked.includes(c.dataset.s);
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
  const subs = SUBS[cat];
  const total = catProducts.length;
  const subCounts = {};
  catProducts.forEach(p => { subCounts[p.sub] = (subCounts[p.sub] || 0) + 1; });
  fsBody.innerHTML =
    `<div class="fs-group">
      <button class="fs-group-hd" onclick="toggleFsGroup(this)">Product Type <span class="fs-toggle-icon">−</span></button>
      <div class="fs-group-body">` +
        subs.map(([k,l]) =>
          `<label class="fs-check"><input type="checkbox" data-sub="${esc(k)}" onchange="onSidebarChange()"><span>${esc(l)} <span class="fs-cnt">(${subCounts[k]||0})</span></span></label>`
        ).join("") +
      `</div>
    </div>
    <div class="fs-group">
      <button class="fs-group-hd" onclick="toggleFsGroup(this)">Shop For <span class="fs-toggle-icon">−</span></button>
      <div class="fs-group-body">
        <label class="fs-check"><input type="checkbox" checked disabled><span>Women <span class="fs-cnt">(${total})</span></span></label>
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
  buildFilterSidebar(cat, catProducts);
  const want = new URLSearchParams(location.search).get("sub");
  if (want && SUBS[cat].some(([k]) => k === want)) {
    const fsBody = document.getElementById("fs-body");
    if (fsBody) {
      const cb = fsBody.querySelector('.fs-check input[data-sub="' + want + '"]');
      if (cb) { cb.checked = true; applyCatalogFilter(); return; }
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
  const a = _wlGet();
  const i = a.indexOf(id);
  if (i === -1) a.push(id); else a.splice(i, 1);
  _wlSet(a);
  const on = a.includes(id);
  document.querySelectorAll('.wl-btn[data-wid="'+id+'"]').forEach(b => _wlSyncBtn(b, on));
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
    return;
  }
  const avg = rows.reduce((s,r) => s + (r.rating||0), 0) / rows.length;
  if (summary) summary.innerHTML = `<div class="rv-avg"><span class="rv-stars">${stars(avg)}</span><span class="rv-score">${avg.toFixed(1)}</span><span class="rv-ct">(${rows.length} review${rows.length>1?'s':''})</span></div>`;
  const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '';
  list.innerHTML = rows.map(r => `<div class="rv-item"><div class="rv-meta"><span class="rv-name">${esc(r.name||'Anonymous')}</span><span class="rv-date">${fmt(r.created_at)}</span></div><div class="rv-rating">${stars(r.rating||0)}</div>${r.comment?'<p class="rv-comment">'+esc(r.comment)+'</p>':''}</div>`).join('');
}
async function submitReview(e){
  e.preventDefault();
  const form = e.target;
  const productImg = form.dataset.pid;
  const name = form.querySelector('[name=rv-name]').value.trim();
  const rating = parseInt(form.querySelector('[name=rv-rating]').value || '0');
  const comment = form.querySelector('[name=rv-comment]').value.trim();
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
  const TRUNC = 130;
  _pdDescFull = p.desc;
  _pdDescShort = p.desc.length > TRUNC ? p.desc.slice(0, TRUNC).replace(/\s+\S*$/, '') + '…' : p.desc;
  const needRM = p.desc.length > TRUNC;
  const wled = isWishlisted(p.img);
  document.getElementById("pd").innerHTML =
  `<nav class="crumbs"><a href="index.html">Home</a> / <a href="${safeCat}.html">${esc(CAT_TITLES[safeCat])}</a> / <a href="${safeCat}.html?sub=${esc(p.sub)}">${esc(subLabel)}</a> / <span>${esc(p.name)}</span></nav>
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
        <div><b>Weight &amp; Price</b><span>On request — varies with the day's rate</span></div>
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
}
