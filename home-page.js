/* Homepage bootstrap — extracted from the inline <script> so the page can run
   under a CSP without script-src 'unsafe-inline'. */
initPage('home');
startTesti();

/* ===== Instagram live feed =====
   Paste your Behold feed URL between the quotes below and the grid
   auto-shows your real latest posts. Leave empty to show campaign photos. */
const IG_FEED_URL = "https://feeds.behold.so/GnQgSVFgfOScttb7tUSS";
if (IG_FEED_URL) {
  const igGrid = document.querySelector(".ig-grid");
  const igStatic = igGrid ? igGrid.innerHTML : "";
  if (igGrid) showSkeletons(igGrid, 6);
  /* Prefer Behold's own cached image (stable) over Instagram's CDN link (expires / 403s). */
  const igImg = p =>
    (p.sizes && ((p.sizes.medium && p.sizes.medium.mediaUrl) || (p.sizes.large && p.sizes.large.mediaUrl) ||
                 (p.sizes.small && p.sizes.small.mediaUrl) || (p.sizes.full && p.sizes.full.mediaUrl))) ||
    p.thumbnailUrl || p.mediaUrl || "";
  const igRevert = () => { if (igGrid) { igGrid.innerHTML = igStatic; skelLoaded(igGrid); } };
  const igTimer = igGrid ? setTimeout(igRevert, 6000) : null;
  fetch(IG_FEED_URL).then(r => r.json()).then(d => {
    const posts = (d.posts || d).slice(0, 6).filter(p => igImg(p));
    if (!posts.length || !igGrid) { clearTimeout(igTimer); igRevert(); return; }
    /* Only swap in the live feed once we've confirmed the images actually load;
       if Instagram/Behold block them, keep the curated campaign photos instead. */
    const probe = new Image();
    probe.onload = () => {
      clearTimeout(igTimer);
      igGrid.innerHTML = posts.map(p => `
      <a href="${p.permalink}" target="_blank" rel="noopener">
        <img loading="lazy" src="${igImg(p)}" alt="Instagram post">
      </a>`).join("");
      skelLoaded(igGrid);
    };
    probe.onerror = () => { clearTimeout(igTimer); igRevert(); };
    probe.src = igImg(posts[0]);
  }).catch(() => { clearTimeout(igTimer); igRevert(); });
}
const FEATURED = ["p06","d22","g03","d16","g11","p03","d20","g12"];
function renderFeatured(){
  var items = FEATURED.map(id => PRODUCTS.find(x => x.img === id)).filter(Boolean);
  var html = items.map(cardHTML).join("");
  var dup  = items.map(p => cardHTML(p).replace("<a ", "<a aria-hidden=\"true\" tabindex=\"-1\" ")).join("");
  var feat = document.getElementById("featured");
  feat.innerHTML = html + dup;
  skelLoaded(feat);
  reveals();
}
window.__cmsRender = renderFeatured;
showSkeletons(document.getElementById("featured"), 6);
renderFeatured();
