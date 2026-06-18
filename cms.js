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
