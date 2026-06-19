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
  const igTimer = igGrid ? setTimeout(function(){ igGrid.innerHTML = igStatic; }, 6000) : null;
  const igImg = p => p.mediaUrl || p.thumbnailUrl ||
    (p.sizes && ((p.sizes.medium && p.sizes.medium.mediaUrl) || (p.sizes.large && p.sizes.large.mediaUrl) ||
                 (p.sizes.small && p.sizes.small.mediaUrl) || (p.sizes.full && p.sizes.full.mediaUrl))) || "";
  fetch(IG_FEED_URL).then(r => r.json()).then(d => {
    clearTimeout(igTimer);
    const posts = (d.posts || d).slice(0, 6);
    if (!posts.length) { if (igGrid) { igGrid.innerHTML = igStatic; skelLoaded(igGrid); } return; }
    const g = document.querySelector(".ig-grid");
    g.innerHTML = posts.map(p => `
      <a href="${p.permalink}" target="_blank" rel="noopener">
        <img loading="lazy" src="${igImg(p)}" alt="Instagram post">
      </a>`).join("");
    skelLoaded(g);
  }).catch(() => { clearTimeout(igTimer); if (igGrid) { igGrid.innerHTML = igStatic; skelLoaded(igGrid); } });
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
