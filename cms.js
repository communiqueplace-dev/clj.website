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
        id:r.id, img:r.img, cat:r.cat, sub:r.sub, name:r.name, desc:r.description||"",
        metal:r.metal||"", work:r.work||"", occasion:r.occasion||"", image_url:r.image_url||"",
        style_note:r.style_note||"", in_stock:r.in_stock,
        certification:r.certification||"", gross_weight:r.gross_weight||"", net_weight:r.net_weight||"",
        delivery_time:r.delivery_time||"", shipping_terms:r.shipping_terms||"",
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

/* ---- privacy-safe, fire-and-forget analytics (reuses the shared `sb` client) ----
   Logs page views / product opens / enquiries to the existing analytics_events &
   enquiries tables. No personal data, no third-party scripts. Any failure is
   ignored and NEVER blocks or delays the page. */
(function(){
  var path = location.pathname || '/';
  /* never track the admin / studio tools (they don't even load this bundle) */
  if (/clkhanna-(admin|studio)\.html$/i.test(path)) return;

  function vid(){
    try {
      var v = localStorage.getItem('clk_vid');
      if (!v){
        v = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
              var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        localStorage.setItem('clk_vid', v);
      }
      return v;
    } catch(e){ return null; }
  }
  window.clkVid = vid;

  /* run fn once the shared Supabase client (shop.js) is ready; give up after ~10s */
  function whenSb(fn){
    if (typeof sb !== 'undefined' && sb){ fn(); return; }
    var n = 0, t = setInterval(function(){
      if (typeof sb !== 'undefined' && sb){ clearInterval(t); fn(); }
      else if (++n > 100){ clearInterval(t); }
    }, 100);
  }

  window.clkLog = function(type, extra){
    whenSb(function(){
      try {
        var row = { event_type: type, path: path, visitor_id: vid() };
        if (extra){ for (var k in extra){ row[k] = extra[k]; } }
        sb.from('analytics_events').insert(row).then(function(){}, function(){});
      } catch(e){}
    });
  };

  /* page view on every public page load */
  window.clkLog('page_view');
})();
