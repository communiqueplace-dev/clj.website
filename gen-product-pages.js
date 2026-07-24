/* C.L Khanna Jewellers — static product-page generator (Phase 9 SEO)
   Reads catalog.js and writes one pre-rendered, indexable HTML page per
   product at the site root (e.g. ruby-cocktail-ring.html), each with its own
   title, meta description, canonical, OG image and Product JSON-LD. The page
   still loads bundle.js and renders normally for visitors (via data-product).
   Also rebuilds sitemap.xml. Run from deploy.ps1. */
const fs = require("fs");
const vm = require("vm");

const CAT_TITLES = { gold: "Gold Jewellery", diamond: "Diamond Jewellery", polki: "Polki Jewellery" };
const ORIGIN = "https://clkhannajewellers.in";

const slugify = s => String(s).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const htmlEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const jsonLd  = obj => JSON.stringify(obj).replace(/</g, "\\u003c"); // safe inside <script>

/* Load PRODUCTS from catalog.js */
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("catalog.js", "utf8") + ";this.PRODUCTS=PRODUCTS;", sandbox);
const PRODUCTS = sandbox.PRODUCTS;

/* Guard against slug collisions — both between products and with core pages,
   so a future product name can never silently overwrite e.g. gold.html. */
const RESERVED = new Set("404 about account cart clkhanna-admin clkhanna-studio custom diamond gold index location login media polki privacy product register reset-password returns shipping terms".split(" "));
const seen = {};
PRODUCTS.forEach(p => {
  const s = slugify(p.name);
  if (RESERVED.has(s)) throw new Error(`Slug "${s}" (${p.img}) collides with a core site page. Rename the product or special-case its slug.`);
  if (seen[s]) throw new Error(`Slug collision: "${s}" (${seen[s]} & ${p.img}). Disambiguate before generating.`);
  seen[s] = p.img;
});

const CSP = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://amqmojrqifsfuhnrabdc.supabase.co wss://amqmojrqifsfuhnrabdc.supabase.co https://feeds.behold.so https://www.google-analytics.com https://analytics.google.com; frame-src https://maps.google.com https://www.google.com; base-uri 'self'; form-action 'self' https://wa.me;">`;

function page(p) {
  const cat   = ["gold", "diamond", "polki"].includes(p.cat) ? p.cat : "gold";
  const catT  = CAT_TITLES[cat] || "Fine Jewellery";
  const slug  = slugify(p.name);
  const url   = `${ORIGIN}/${slug}.html`;
  const img   = `${ORIGIN}/assets/catalog/${cat}/${p.img}.jpg`;
  const title = `${p.name} — ${catT} | C.L Khanna Jewellers, Amritsar`;
  const desc  = `${p.desc} ${catT} by C.L Khanna Jewellers, Lawrence Road Amritsar. BIS hallmarked, ${p.metal}.`;
  const schema = {
    "@context": "https://schema.org", "@type": "Product",
    name: p.name, description: desc, image: img,
    brand: { "@type": "Brand", name: "C.L Khanna Jewellers" },
    category: catT, material: p.metal,
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "INR", url,
      seller: { "@type": "Organization", name: "C.L Khanna Jewellers", url: ORIGIN } }
  };
  if (p.price_from) schema.offers.price = String(p.price_from);
  const T = htmlEsc(title), D = htmlEsc(desc);
  const priceText = p.price_from ? `from ₹${Number(p.price_from).toLocaleString("en-IN")}` : "Price on request";
  const subLabel  = { sets: "Chokers, Malas & Sets", bangles: "Bangles & Kadas", bracelets: "Bracelets", earrings: "Earrings & Studs", rings: "Rings" }[p.sub] || "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${T}</title>
<style>@media(max-width:760px){.nojs-nav{display:none!important}.nojs-burger{display:flex!important}}@media(min-width:761px){.nojs-burger{display:none}}</style>
<link rel="stylesheet" href="style.css">
<link rel="preload" as="image" href="assets/logo-main.png" fetchpriority="high">
<meta name="description" content="${D}">
<link rel="canonical" href="${url}">
<link rel="icon" href="./favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="./favicon-192.png" sizes="192x192">
<link rel="apple-touch-icon" href="./apple-touch-icon.png">
<link rel="manifest" href="./site.webmanifest">
<meta name="theme-color" content="#15130e">
<meta property="og:type" content="product">
<meta property="og:site_name" content="C.L Khanna Jewellers">
<meta property="og:title" content="${T}">
<meta property="og:description" content="${D}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${T}">
<meta name="twitter:description" content="${D}">
<meta name="twitter:image" content="${img}">
<script type="application/ld+json">
${jsonLd(schema)}
</script>
<noscript><style>.rv{opacity:1!important;transform:none!important}</style></noscript>

${CSP}
<meta name="referrer" content="strict-origin-when-cross-origin">
</head>
<body data-page="product" data-product="${htmlEsc(p.img)}">
<noscript><div style="background:#15130e;color:#f8f4ec;text-align:center;padding:12px 16px;font-family:Jost,sans-serif;font-size:14px">C.L Khanna Jewellers · Lawrence Road, Amritsar · <a href="tel:+919815605373" style="color:#cdb36e">+91 98156 05373</a> · <a href="https://www.instagram.com/clkhannajewellers/" style="color:#cdb36e">@clkhannajewellers</a> — please enable JavaScript for the full site.</div></noscript>

<div id="site-header"><header class="site"><div class="bar">
<button class="burger nojs-burger" aria-label="Menu"><span></span><span></span><span></span></button>
<a class="brand" href="./"><img src="assets/logo-main.png" alt="C.L Khanna Jewellers"></a>
<nav class="nojs-nav"><a href="gold.html">Gold</a><a href="diamond.html">Diamond</a><a href="polki.html">Polki</a><a href="custom.html">Custom</a><a href="about.html">About</a><a href="location.html">Contact</a><a href="cart.html">Cart</a></nav>
</div></header><div class="hairline"></div></div>
<section style="padding-top:48px">
  <div class="wrap" id="pd">
    <nav class="crumbs"><a href="./">Home</a> / <a href="${cat}.html">${htmlEsc(catT)}</a> / <a href="${cat}.html?sub=${htmlEsc(p.sub)}">${htmlEsc(subLabel)}</a> / <span>${htmlEsc(p.name)}</span></nav>
    <div class="pd-grid">
      <div class="pd-left">
        <div class="pd-photo"><img src="${img}" alt="${htmlEsc(p.name)}, ${htmlEsc(catT)} by C.L Khanna Jewellers Amritsar"></div>
      </div>
      <div class="pd-info">
        <p class="eyebrow">${htmlEsc(catT)} &middot; ${htmlEsc(subLabel)}</p>
        <h1>${htmlEsc(p.name)}</h1>
        <p class="pd-desc">${D}</p>
        <p class="card-price">${priceText}</p>
      </div>
    </div>
  </div>
</section>
<footer id="site-footer"><div class="topline"></div><div class="wrap"><div class="cols">
<div><h4>Information</h4><a href="about.html">About Us</a><a href="location.html">Contact Us</a><a href="custom.html">Customized Jewellery</a></div>
<div><h4>Get In Touch</h4><a href="tel:+919815605373">+91 98156 05373</a><a href="tel:+917717624298">+91 77176 24298</a><a href="mailto:clkhannajewellers@gmail.com">clkhannajewellers@gmail.com</a></div>
<div><h4>Visit</h4><a>8 Dilawari Street, Lawrence Road, Amritsar</a><a href="https://www.instagram.com/clkhannajewellers/">@clkhannajewellers</a></div>
</div><div class="base">Copyright © C.L Khanna Jewellers. All rights reserved.</div></div></footer>
<script src="bundle.js"></script>
<script src="consent.js"></script>
<script src="page-init.js"></script>
<script src="sw-reg.js"></script>
</body>
</html>
`;
}

let n = 0;
PRODUCTS.forEach(p => { fs.writeFileSync(`${slugify(p.name)}.html`, page(p), "utf8"); n++; });

/* Pre-render each category listing page's product grid into static HTML too —
   otherwise Googlebot's first pass only ever sees an empty <div id="grid">
   (identical across gold.html/diamond.html/polki.html/collections.html),
   the same "looks like duplicate shells" problem the product pages had.
   The client JS (renderCatalog) still fully overwrites this on load, so
   visitors and the wishlist/filter behaviour are completely unaffected. */
function fmtPriceStatic(v) {
  return v ? `from &#8377;${Number(v).toLocaleString("en-IN")}` : "Price on request";
}
function cardHTML(p) {
  const cat = ["gold", "diamond", "polki"].includes(p.cat) ? p.cat : "gold";
  const img = `assets/catalog/${cat}/${p.img}.jpg`;
  return `<a class="card rv in" data-s="${htmlEsc(p.sub)}" data-g="${htmlEsc(p.gender || "women")}" href="${slugify(p.name)}.html">
    <div class="ph">
      <img loading="lazy" decoding="async" src="${img}" alt="${htmlEsc(p.name)}, ${htmlEsc(CAT_TITLES[cat] || "")} — C.L Khanna Jewellers Amritsar">
      <button class="wl-btn" aria-label="Add to wishlist" data-wid="${htmlEsc(p.img)}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
    <div class="info">
      <h3>${htmlEsc(p.name)}</h3>
      <p>${htmlEsc(p.desc)}</p>
      <span class="card-price">${fmtPriceStatic(p.price_from)}</span>
    </div>
  </a>`;
}
function injectGrid(file, cat) {
  const products = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  const count = `${products.length} piece${products.length === 1 ? "" : "s"}`;
  const cards = products.map(cardHTML).join("\n");
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<!--COUNT_START-->[\s\S]*?<!--COUNT_END-->/, `<!--COUNT_START-->${count}<!--COUNT_END-->`);
  html = html.replace(/<!--GRID_START-->[\s\S]*?<!--GRID_END-->/, `<!--GRID_START-->${cards}<!--GRID_END-->`);
  fs.writeFileSync(file, html, "utf8");
}
[["gold.html", "gold"], ["diamond.html", "diamond"], ["polki.html", "polki"], ["collections.html", "all"]].forEach(([file, cat]) => {
  if (fs.existsSync(file)) injectGrid(file, cat);
});

/* Rebuild sitemap.xml: keep the static pages, append every product */
const staticUrls = [
  ["/", "1.0", "weekly"], ["/collections.html", "0.9", "weekly"], ["/diamond.html", "0.9", "weekly"], ["/gold.html", "0.9", "weekly"],
  ["/polki.html", "0.9", "weekly"], ["/custom.html", "0.8", "monthly"], ["/about.html", "0.7", "monthly"],
  ["/media.html", "0.6", "weekly"], ["/location.html", "0.7", "monthly"], ["/cart.html", "0.3", null],
  ["/privacy.html", "0.2", null], ["/returns.html", "0.2", null], ["/shipping.html", "0.2", null],
  ["/terms.html", "0.2", null],
];
const row = (loc, pr, cf) => `  <url><loc>${ORIGIN}${loc}</loc><priority>${pr}</priority>${cf ? `<changefreq>${cf}</changefreq>` : ""}</url>`;
const lines = staticUrls.map(([l, p, c]) => row(l, p, c))
  .concat(PRODUCTS.map(p => row(`/${slugify(p.name)}.html`, "0.6", "monthly")));
fs.writeFileSync("sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join("\n")}\n</urlset>\n`, "utf8");

console.log(`Generated ${n} product pages + sitemap (${staticUrls.length + PRODUCTS.length} URLs).`);
