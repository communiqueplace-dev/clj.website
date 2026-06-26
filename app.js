/* C.L Khanna Jewellers — shared site logic (v4) */
const WA = "919815605373";
const SUBS = {
  gold:    [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]],
  diamond: [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]],
  polki:   [["sets","Chokers, Malas & Sets"],["bangles","Bangles & Kadas"],["bracelets","Bracelets"],["earrings","Earrings & Studs"],["rings","Rings"]]
};
const CAT_TITLES = {gold:"Gold Jewellery", diamond:"Diamond Jewellery", polki:"Polki Jewellery"};
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
/* Pretty product URL — MUST match gen-product-pages.js slugify exactly. */
function slugify(s){ return String(s).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
function productHref(p){ return slugify(p.name) + '.html'; }
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
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site">
    <div class="bar">
      <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
      <a class="brand" href="./"><img src="assets/logo-main.png" alt="C.L Khanna Jewellers"></a>
      <div class="actions">
        <button class="ic" aria-label="Search" title="Search">
          <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="15.4" y1="15.4" x2="21" y2="21" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <button class="ic" aria-label="Book an Appointment" title="Book an Appointment">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.4"/><line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" stroke-width="1.4"/><line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <span class="country" title="India · INR">IN · ₹</span>
        <button class="ic" aria-label="Account" title="Account">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <button class="ic" aria-label="Cart" title="Cart"><span class="cartn" id="cartn"></span>
          <svg viewBox="0 0 24 24"><path d="M6 7h12l-1.2 11a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 9V6a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
      </div>
    </div>
  </header>
  <div class="hairline"></div>
  <div class="drawer-veil" id="dveil"></div>
  <aside class="drawer" id="drawer">
    <button class="dx">×</button>
    <a class="d-home" href="./">Home</a>
    <div class="d-group">
      <a class="d-cat" href="javascript:void(0)">Shop <i>+</i></a>
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
    <a class="d-appt" href="https://wa.me/919815605373?text=Hello%20C.L%20Khanna%20Jewellers%2C%20I%20would%20like%20to%20book%20an%20appointment%20to%20visit%20the%20store.">Book an Appointment</a>
  </aside>
  <div class="search-veil" id="sveil">
    <div class="search-box">
      <button class="dx">×</button>
      <input id="sq" type="text" placeholder="Search the collection — e.g. choker, ruby, kada…">
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
      <a href="${esc(productHref(p))}">
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
      <form data-action="news">
        <input id="nl-email" type="email" placeholder="Your email address" required>
        <button class="btn solid" type="submit">Subscribe</button>
      </form>
    </div>
    <div class="cols">
      <div class="fcol">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-info">Information<span class="fcol-ic" aria-hidden="true">+</span></button>
        <div class="fcol-p" id="fcp-info">
        <a href="about.html">About Us</a>
        <a href="location.html">Contact Us</a>
        <a href="custom.html">Customized Jewellery</a>
        <a href="location.html">Store Location</a>
        </div>
      </div>
      <div class="fcol">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-pol">Policies<span class="fcol-ic" aria-hidden="true">+</span></button>
        <div class="fcol-p" id="fcp-pol">
        <a href="privacy.html">Privacy Policy</a>
        <a href="returns.html">Return Policy</a>
        <a href="shipping.html">Shipping Policy</a>
        <a href="terms.html">Terms &amp; Conditions</a>
        <a href="#" class="ck-footer-link">Cookie Settings</a>
        </div>
      </div>
      <div class="fcol git">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-git">Get In Touch<span class="fcol-ic" aria-hidden="true">+</span></button>
        <div class="fcol-p" id="fcp-git">
        <a href="https://www.google.com/maps/search/?api=1&query=C.L.+Khanna+Jewellers+Lawrence+Road+Amritsar" target="_blank" rel="noopener"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>C.L Khanna Jewellers, 8 Dilawari Street,<br>Lawrence Road, Amritsar, Punjab</span></a>
        <a href="tel:+919815605373"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a13 13 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>+91 98156 05373</span></a>
        <a href="tel:+917717624298"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a13 13 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>+91 77176 24298</span></a>
        <a href="mailto:clkhannajewellers@gmail.com"><svg width="15" height="15" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>clkhannajewellers@gmail.com</span></a>
        </div>
      </div>
      <div class="fcol">
        <button class="fcol-h" type="button" aria-expanded="false" aria-controls="fcp-follow">Follow Us<span class="fcol-ic" aria-hidden="true">+</span></button>
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
      <button class="x">×</button>
      <h3>Book an Appointment</h3>
      <p class="sub">Visit us at Lawrence Road without the wait.</p>
      <label>Your name</label><input id="ap-name" type="text" placeholder="Full name">
      <label>Preferred day</label>
      <select id="ap-day"><option>Today</option><option>Tomorrow</option><option>This weekend</option><option>Next week</option></select>
      <label>Preferred time</label>
      <select id="ap-time"><option>11 AM – 1 PM</option><option>1 PM – 3 PM</option><option>3 PM – 5 PM</option><option>5 PM – 8 PM</option></select>
      <label>Interested in</label>
      <select id="ap-int"><option>Bridal / Wedding</option><option>Gold Jewellery</option><option>Diamond Jewellery</option><option>Polki Jewellery</option><option>Customized Jewellery</option><option>General visit</option></select>
      <button class="btn solid send">Confirm on WhatsApp</button>
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
  <a class="card rv in" data-s="${esc(p.sub)}" data-g="${esc(p.gender||'women')}" href="${esc(productHref(p))}">
    <div class="ph">
      <img loading="lazy" decoding="async" src="${imgURL(p)}" alt="${esc(p.name)}, ${esc(CAT_TITLES[p.cat]||'')} — C.L Khanna Jewellers Amritsar">
      <button class="wl-btn" aria-label="${wled?'Remove from wishlist':'Add to wishlist'}" data-wid="${esc(p.img)}">
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
    return `<label class="fs-check"><input type="checkbox" data-sub-keys="${esc(keys)}"><span>${esc(label)} <span class="fs-cnt">(${cnt})</span></span></label>`;
  }).join('');
  fsBody.innerHTML =
    `<div class="fs-group">
      <button class="fs-group-hd">Category <span class="fs-toggle-icon">−</span></button>
      <div class="fs-group-body">${catRows}</div>
    </div>
    <div class="fs-group">
      <button class="fs-group-hd">Gender <span class="fs-toggle-icon">−</span></button>
      <div class="fs-group-body">
        <label class="fs-check"><input type="checkbox" data-gender="women"><span>Women <span class="fs-cnt">(${womenCount})</span></span></label>
        <label class="fs-check"><input type="checkbox" data-gender="men"><span>Men <span class="fs-cnt">(${menCount})</span></span></label>
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
let _pdDescFull = "", _pdDescShort = "", _pdName = "";

function toggleReadMore(){
  const el = document.getElementById("pd-desc-txt");
  const btn = document.getElementById("pd-rm-btn");
  if (!el || !btn) return;
  const expanding = btn.textContent.trim() === "Read More";
  el.textContent = expanding ? _pdDescFull : _pdDescShort;
  btn.textContent = expanding ? "Read Less" : "Read More";
}

function checkPinCode(){
  const val = ((document.getElementById("pd-pin-val") || {}).value || "").trim();
  const res = document.getElementById("pd-pin-result");
  if (!res) return;
  if (!/^\d{6}$/.test(val)) { res.textContent = "Please enter a valid 6-digit pin code."; res.style.color = "#b87c2a"; return; }
  /* No external API — confirm delivery personally over WhatsApp, pre-filled with the pin + piece. */
  const msg = 'Hello C.L Khanna Jewellers, do you deliver to pincode ' + val +
    '? I am interested in the "' + (_pdName || 'piece') + '" from your website.';
  res.textContent = "Opening WhatsApp to confirm delivery to " + val + "…";
  res.style.color = "var(--gold-deep)";
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
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
  /* native share sheet on mobile; otherwise copy the link with a quiet toast */
  if (navigator.share && navigator.canShare && navigator.canShare(data)){
    navigator.share(data).catch(()=>{});
  } else if (navigator.clipboard){
    navigator.clipboard.writeText(url).then(() => {
      if (typeof toast === 'function') toast('Link copied');
    }).catch(() => prompt('Copy this link:', url));
  } else { prompt('Copy this link:', url); }
}

/* ---- Ask → WhatsApp ---- */
function submitAskWA(e, productName){
  e.preventDefault();
  const f = e.target;
  const name = f.querySelector('[name=ask-name]').value.trim();
  const emailEl = f.querySelector('[name=ask-email]');
  const email = emailEl ? emailEl.value.trim() : '';
  const phone = f.querySelector('[name=ask-phone]').value.trim();
  const query = f.querySelector('[name=ask-query]').value.trim();
  let text = 'Hello C.L Khanna Jewellers,\n\nProduct: ' + productName + '\nName: ' + name;
  if (email) text += '\nEmail: ' + email;
  text += '\nPhone: ' + phone + '\nQuery: ' + query;
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
    list.innerHTML = '';
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

/* ---- How to Style It (relatable styling / occasion note) ---- */
function renderStyleNote(p){
  const el = document.getElementById('pd-style-txt');
  if (!el) return;
  /* admin-written note wins; otherwise build a relatable one automatically */
  if (p.style_note && p.style_note.trim()){ el.textContent = p.style_note.trim(); return; }
  const safeCat = ['gold','diamond','polki'].includes(p.cat) ? p.cat : 'gold';
  const occ = (p.occasion || '').trim().replace(/\.$/, '');
  const lead = occ
    ? 'Perfect for ' + occ.charAt(0).toLowerCase() + occ.slice(1) + '.'
    : ({ gold:'An effortless everyday-to-festive piece.', diamond:'Made for celebrations and milestone moments.', polki:'A true bridal heirloom.' })[safeCat];
  const pair = ({
    sets:      'Let it take centre stage — finish the look with matching jhumkas and a few fine bangles.',
    necklaces: 'Let it take centre stage — finish the look with matching jhumkas and a few fine bangles.',
    chokers:   'Let it sit high on the neckline and pair it with statement jhumkas for a complete bridal look.',
    harams:    'Layer it over a choker for a full bridal neckline, and echo it with matching jhumkas.',
    earrings:  'Pair with a sleek choker or a layered haram so the earrings frame the face.',
    rings:     'Stack it with a slim band, or wear it solo for a clean, modern statement.',
    bangles:   'Wear it stacked with other kadas, or balance it with a delicate bracelet on the other wrist.',
    bracelets: 'Pair with statement studs and a cocktail ring for a polished evening look.'
  })[p.sub] || 'Pair it with complementary pieces from the collection to complete your look.';
  el.textContent = lead + ' ' + pair;
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
  const id = new URLSearchParams(location.search).get("id") || document.body.getAttribute("data-product");
  const p = PRODUCTS.find(x => x.img === id) || PRODUCTS[0];
  /* fire-and-forget product-open tracking (once per page; never blocks).
     analytics_events.product_id is a FK to products(id), so we use the DB id
     (carried in via cms.js) — only logs once the DB product is available. */
  try { if (p.id && !window.__clkPC && typeof window.clkLog === 'function'){ window.__clkPC = 1; window.clkLog('product_click', { product_id: p.id }); } } catch(e){}
  const safeCat = ['gold','diamond','polki'].includes(p.cat) ? p.cat : 'gold';
  const subLabel = (SUBS[safeCat].find(([k]) => k === p.sub) || ["",""])[1];
  document.title = p.name + " — " + CAT_TITLES[safeCat] + " | C.L Khanna Jewellers, Amritsar";
  var _desc = p.desc + " " + CAT_TITLES[safeCat] + " by C.L Khanna Jewellers, Lawrence Road Amritsar. BIS hallmarked, " + p.metal + ".";
  /* Prefer the page's own (pre-rendered) canonical so static pretty URLs keep theirs. */
  var _canonEl = document.querySelector('link[rel="canonical"]');
  var _canonHref = _canonEl ? _canonEl.getAttribute('href') : '';
  var _url  = (_canonHref && _canonHref.indexOf('http') === 0) ? _canonHref : ("https://clkhannajewellers.in/" + productHref(p));
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
  const TRUNC = 190;
  _pdName = p.name;
  _pdDescFull = p.desc;
  _pdDescShort = p.desc.length > TRUNC ? p.desc.slice(0, TRUNC).replace(/\s+\S*$/, '') + '…' : p.desc;
  const needRM = p.desc.length > TRUNC;
  const wled = isWishlisted(p.img);
  /* stock pill — green when in stock, "Made to Order" otherwise (undefined = treat as in stock) */
  const inStock = p.in_stock !== false;
  const stockHtml = inStock
    ? '<span class="pd-stock in"><span class="pd-dot" aria-hidden="true"></span>Item In Stock</span>'
    : '<span class="pd-stock out"><span class="pd-dot" aria-hidden="true"></span>Made to Order</span>';
  /* Spec accordions — only from fields that already exist; "-" where we have no data. */
  const dash = v => (v != null && String(v).trim() !== '') ? String(v) : '-';
  const accInfo = [
    ['Product Name', p.name],
    ['Brand', 'C.L Khanna Jewellers'],
    ['Certification', dash(p.certification)],
    ['Craftsmanship', dash(p.work)],
    ['Category', CAT_TITLES[safeCat]]
  ];
  const accMetal = [
    ['Metal Purity', dash(p.metal)],
    ['Gross Weight', dash(p.gross_weight)],
    ['Net Weight', dash(p.net_weight)]
  ];
  const accDelivery = [
    ['Delivery Time', (p.delivery_time && p.delivery_time.trim()) ? p.delivery_time : '7-14 days'],
    ['Shipping Terms', (p.shipping_terms && p.shipping_terms.trim()) ? p.shipping_terms : 'Excluded']
  ];
  const rowsHtml = rows => rows.map(r => '<div><b>' + esc(r[0]) + '</b><span>' + esc(dash(r[1])) + '</span></div>').join('');
  const accHtml = (title, rows, open) =>
    '<details class="pd-acc"' + (open ? ' open' : '') + '>' +
      '<summary class="pd-acc-h">' + esc(title) + '<span class="pd-acc-ic" aria-hidden="true"></span></summary>' +
      '<div class="pd-acc-body"><div class="pd-specs">' + rowsHtml(rows) + '</div></div>' +
    '</details>';
  const accordionsHtml = accHtml('Product Information', accInfo, true) +
                         accHtml('Metal Details', accMetal, false) +
                         accHtml('Delivery', accDelivery, false);
  document.getElementById("pd").innerHTML =
  `<nav class="crumbs"><a href="./">Home</a> / <a href="${safeCat}.html">${esc(CAT_TITLES[safeCat])}</a> / <a href="${safeCat}.html?sub=${esc(p.sub)}">${esc(subLabel)}</a> / <span>${esc(p.name)}</span></nav>
  <div class="pd-grid">
    <div class="pd-left">
      <div class="pd-photo" id="zoomBox">
        <img id="zoomImg" src="${imgURL(p)}" alt="${esc(p.name)}">
      </div>
      <div class="pd-style" id="pd-style">
        <p class="pd-style-h">How to Style It</p>
        <p class="pd-style-txt" id="pd-style-txt"></p>
      </div>
    </div>
    <div class="pd-info">
      <p class="eyebrow">${esc(CAT_TITLES[safeCat])} · ${esc(subLabel)}</p>
      <div class="pd-name-row">
        <h1>${esc(p.name)}</h1>
        <div class="pd-name-acts">
          <button class="pd-share-icon" data-action="share" data-name="${esc(p.name)}" aria-label="Share this piece" title="Share">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>
          </button>
          <button class="wl-btn" aria-label="${wled?'Remove from wishlist':'Add to wishlist'}" data-wid="${esc(p.img)}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="${wled?'var(--gold)':'none'}" stroke="${wled?'var(--gold)':'currentColor'}" stroke-width="1.7"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>

      <p class="pd-desc" id="pd-desc-txt">${esc(needRM ? _pdDescShort : _pdDescFull)}</p>
      ${needRM ? '<button class="pd-readmore" id="pd-rm-btn">Read More</button>' : ''}

      <div class="trust-badges">
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.56 14.29L7 22l5-3 5 3-1.56-7.72"/></svg><span>100% Certified Jewellery</span></div>
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg><span>Free Shipping Across India</span></div>
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg><span>Purity Guaranteed</span></div>
        <div class="tb-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg><span>Lifetime Buyback &amp; Exchange</span></div>
      </div>

      <div class="pd-stock-line">
        ${stockHtml}
        <span class="pd-stock-sep" aria-hidden="true"></span>
        <span class="pd-tax">Taxes Inclusive</span>
        <span class="pd-stock-sep" aria-hidden="true"></span>
        <a class="pd-view-details" href="#pd-information">View Details</a>
      </div>

      <div class="pd-pincode" id="pd-delivery">
        <p class="pd-pin-label">Check delivery — enter your pin code and we'll confirm on WhatsApp.</p>
        <div class="pd-pin-row">
          <input class="pd-pin-input" type="text" inputmode="numeric" maxlength="6" placeholder="e.g. 143001" id="pd-pin-val">
          <button class="pd-pin-btn">Check Delivery</button>
        </div>
        <p class="pd-pin-result" id="pd-pin-result"></p>
      </div>
      <div class="cta-row">
        <a class="btn solid" href="#" data-action="cart" data-prod="${esc(p.img)}">Add to Cart</a>
        <a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Hello C.L Khanna Jewellers, I would like to enquire about the "' + p.name + '" (' + CAT_TITLES[safeCat] + ') from your website.')}">Enquire on WhatsApp</a>
      </div>
    </div>
  </div>

  <div class="pd-cols">
    <div class="pd-accordions" id="pd-information">
      ${accordionsHtml}
    </div>
    <div class="pd-ask">
      <h3 class="pd-sec-h">Have a Question?</h3>
      <form data-action="ask-wa" data-name="${esc(p.name)}">
        <div class="pd-form-group"><label>Name</label><input type="text" name="ask-name" placeholder="Your name" required></div>
        <div class="pd-form-group"><label>Email</label><input type="email" name="ask-email" placeholder="you@example.com"></div>
        <div class="pd-form-group"><label>Phone</label><input type="tel" name="ask-phone" placeholder="+91 98765 43210" required></div>
        <div class="pd-form-group"><label>Your Question</label><textarea name="ask-query" rows="4" placeholder="e.g. Is this available in 22k gold?" required></textarea></div>
        <button type="submit" class="btn solid">Send on WhatsApp</button>
      </form>
    </div>
  </div>

  <section class="pd-reviews pd-revs" id="pd-reviews">
    <h3 class="pd-sec-h pd-rev-head">Ratings and Reviews</h3>
    <p class="pd-rev-sub">Review this product — share your thoughts with other customers.</p>
    <div id="pd-rv-summary"></div>
    <div id="pd-rv-list"><p class="rv-empty">Loading…</p></div>
    <details class="pd-rv-writebox">
      <summary class="pd-rv-writebtn"><span class="btn ghost">Write a product review</span></summary>
      <div class="pd-rv-write">
        <h4>Write a Review</h4>
        <form data-pid="${esc(p.img)}" data-action="review">
          <div class="pd-form-group"><label>Your Name</label><input type="text" name="rv-name" placeholder="e.g. Priya S." required></div>
          <div class="pd-form-group"><label>Rating</label>
            <div class="star-pick">
              <span class="sps" data-v="1">★</span><span class="sps" data-v="2">★</span><span class="sps" data-v="3">★</span><span class="sps" data-v="4">★</span><span class="sps" data-v="5">★</span>
              <input type="hidden" name="rv-rating">
            </div>
          </div>
          <div class="pd-form-group"><label>Comment <span style="font-family:var(--serif);font-style:italic;text-transform:none;letter-spacing:0;font-size:.82rem;color:var(--muted)">(optional)</span></label><textarea name="rv-comment" rows="3" placeholder="Share your experience…"></textarea></div>
          <button type="submit" class="btn solid">Submit Review</button>
        </form>
      </div>
    </details>
  </section>

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
  renderStyleNote(p);
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
  const carousel = document.querySelector(".t-carousel");
  const cards = document.querySelectorAll(".t-slide");
  const dots = document.querySelectorAll(".t-dots button");
  if (!cards.length) return;
  if (carousel){
    carousel.setAttribute("role", "region");
    carousel.setAttribute("aria-roledescription", "carousel");
    carousel.setAttribute("aria-label", "Client testimonials");
    carousel.setAttribute("aria-live", "polite");
  }
  cards.forEach((c, j) => {
    c.setAttribute("role", "group");
    c.setAttribute("aria-roledescription", "slide");
    c.setAttribute("aria-label", (j + 1) + " of " + cards.length);
  });
  dots.forEach((d, j) => d.setAttribute("aria-label", "Show testimonial " + (j + 1)));
  let i = 0, t;
  function go(n){
    i = (n + cards.length) % cards.length;
    cards.forEach((c, j) => { c.classList.toggle("on", j === i); c.setAttribute("aria-hidden", j === i ? "false" : "true"); });
    dots.forEach((d, j) => { d.classList.toggle("on", j === i); if (j === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    clearInterval(t); t = setInterval(() => go(i + 1), 6500);
  }
  dots.forEach((d, j) => d.addEventListener("click", () => go(j)));
  go(0);
}

/* label decorative editorial/look carousels as regions for screen readers */
function enhanceCarouselA11y(){
  document.querySelectorAll(".ed-carousel").forEach(function(c){
    if (c.getAttribute("role")) return;
    c.setAttribute("role", "region");
    c.setAttribute("aria-roledescription", "carousel");
    if (!c.getAttribute("aria-label")) c.setAttribute("aria-label", "Image gallery");
  });
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
  document.querySelectorAll('a[data-lb], .gallery a, .lookbook a, .ed-track a:not([href])').forEach(el=>{
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

/* ---------- event delegation (replaces all inline on* handlers; lets us drop
   'unsafe-inline' from the script-src CSP) ---------- */
var _delegationWired = false;
function setupDelegation(){
  if (_delegationWired) return; _delegationWired = true;

  document.addEventListener('click', function(e){
    var t = e.target;

    /* wishlist heart (cards + product detail) — sits inside a card <a>, so stop the nav */
    var wl = t.closest('.wl-btn');
    if (wl){ e.preventDefault(); e.stopPropagation(); if (typeof toggleWishlist === 'function') toggleWishlist(wl.getAttribute('data-wid'), wl); return; }

    /* editorial / lookbook lightbox */
    var lbEl = t.closest('[data-lb]');
    if (lbEl){ e.preventDefault(); if (typeof openLB === 'function') openLB(lbEl.getAttribute('data-lb')); return; }

    /* cart page quantity / remove */
    var cAct = t.closest('[data-cart-act]');
    if (cAct){
      var cid = cAct.getAttribute('data-id'), ca = cAct.getAttribute('data-cart-act');
      if (ca === 'inc' && typeof changeQty === 'function') changeQty(cid, 1);
      else if (ca === 'dec' && typeof changeQty === 'function') changeQty(cid, -1);
      else if (ca === 'del' && typeof removeFromCart === 'function') removeFromCart(cid);
      return;
    }

    /* header */
    if (t.closest('.burger')){ if (typeof toggleDrawer === 'function') toggleDrawer(true); return; }
    if (t.closest('.ic[aria-label="Search"]')){ if (typeof openSearch === 'function') openSearch(); return; }
    if (t.closest('.ic[aria-label="Book an Appointment"]')){ if (typeof openAppt === 'function') openAppt(e); return; }
    if (t.closest('.ic[aria-label="Account"]')){ if (typeof openAuth === 'function') openAuth(); return; }
    if (t.closest('.ic[aria-label="Cart"]')){ location.href = 'cart.html'; return; }

    /* drawer + search overlays */
    if (t.closest('#dveil')){ if (typeof toggleDrawer === 'function') toggleDrawer(false); return; }
    if (t.closest('#drawer .dx')){ if (typeof toggleDrawer === 'function') toggleDrawer(false); return; }
    if (t.closest('#sveil .dx')){ if (typeof closeSearch === 'function') closeSearch(); return; }
    var shopToggle = t.closest('a.d-cat[href^="javascript"]');
    if (shopToggle){ e.preventDefault(); shopToggle.parentNode.classList.toggle('openg'); return; }
    if (t.closest('.d-appt')){ if (typeof openAppt === 'function') openAppt(e); if (typeof toggleDrawer === 'function') toggleDrawer(false); return; }

    /* footer */
    var fcol = t.closest('.fcol-h');
    if (fcol){ if (typeof toggleFootCol === 'function') toggleFootCol(fcol); return; }
    if (t.closest('.ck-footer-link')){ e.preventDefault(); if (typeof openCookieSettings === 'function') openCookieSettings(); return; }

    /* appointment modal */
    if (t.closest('#appt .x')){ var ap = document.getElementById('appt'); if (ap) ap.classList.remove('open'); return; }
    if (t.closest('#appt .send')){ if (typeof sendAppt === 'function') sendAppt(); return; }

    /* catalogue filters */
    if (t.closest('.filter-open-btn')){ if (typeof toggleFilterPanel === 'function') toggleFilterPanel(true); return; }
    if (t.closest('.fs-close') || t.closest('#fs-veil')){ if (typeof toggleFilterPanel === 'function') toggleFilterPanel(false); return; }
    var fsHd = t.closest('.fs-group-hd');
    if (fsHd){ if (typeof toggleFsGroup === 'function') toggleFsGroup(fsHd); return; }

    /* product detail */
    if (t.closest('.pd-readmore')){ if (typeof toggleReadMore === 'function') toggleReadMore(); return; }
    if (t.closest('.pd-pin-btn')){ if (typeof checkPinCode === 'function') checkPinCode(); return; }
    if (t.closest('.star-pick')){ if (typeof pickStar === 'function') pickStar(e); return; }

    /* data-action buttons */
    var act = t.closest('[data-action]');
    if (act){
      var a = act.getAttribute('data-action');
      if (a === 'cart'){ e.preventDefault(); if (typeof addToCart === 'function') addToCart(act.getAttribute('data-prod')); return; }
      if (a === 'share'){ if (typeof shareProduct === 'function') shareProduct(act.getAttribute('data-name')); return; }
      if (a === 'appt'){ if (typeof openAppt === 'function') openAppt(e); return; }
      if (a === 'cart-enquiry'){ if (typeof sendCartEnquiry === 'function') sendCartEnquiry(); return; }
      if (a === 'reset-link'){ location.href = 'login.html?forgot=1'; return; }
    }
  });

  document.addEventListener('input', function(e){
    if (e.target.id === 'sq'){ if (typeof runSearch === 'function') runSearch(); }
  });

  document.addEventListener('change', function(e){
    var inp = e.target;
    if (inp.matches && inp.matches('.fs-check input[data-sub-keys], .fs-check input[data-gender]')){
      if (typeof onSidebarChange === 'function') onSidebarChange();
    }
  });

  document.addEventListener('submit', function(e){
    var f = e.target.closest('form[data-action]');
    if (!f) return;
    var a = f.getAttribute('data-action');
    if (a === 'news'){ if (typeof joinNews === 'function') joinNews(e); }
    else if (a === 'ask-wa'){ if (typeof submitAskWA === 'function') submitAskWA(e, f.getAttribute('data-name')); }
    else if (a === 'review'){ if (typeof submitReview === 'function') submitReview(e); }
  });

  /* star picker hover (mouseover/mouseout bubble, so document-level works) */
  document.addEventListener('mouseover', function(e){
    if (e.target.closest('.star-pick') && typeof hoverStar === 'function') hoverStar(e);
  });
  document.addEventListener('mouseout', function(e){
    var sp = e.target.closest('.star-pick');
    if (sp && typeof unhoverStar === 'function') unhoverStar({ currentTarget: sp });
  });
}

function initPage(active){
  setupDelegation();
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
  try { enhanceCarouselA11y(); } catch(e){}
  /* Mark the first content region as the skip-link target. */
  try {
    var mc = document.getElementById('main-content') ||
             document.querySelector('.pagehead') || document.querySelector('section');
    if (mc && !mc.id) mc.id = 'main-content';
    if (mc){ mc.setAttribute('role', 'main'); if (!mc.hasAttribute('tabindex')) mc.setAttribute('tabindex', '-1'); }
  } catch(e){}
}
