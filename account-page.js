(function(){
  initPage('');

  /* Profile form */
  var profileForm = document.querySelector('[data-action="save-profile"]');
  if (profileForm) profileForm.addEventListener('submit', saveAccountProfile);

  /* Sign-in gate button */
  var gateBtn = document.querySelector('[data-action="open-auth"]');
  if (gateBtn) gateBtn.addEventListener('click', function(){
    if (typeof openAuth === 'function') openAuth('Please sign in to view your account.');
  });

  /* Sign out */
  var outBtn = document.querySelector('[data-action="logout"]');
  if (outBtn) outBtn.addEventListener('click', accountLogout);

  /* Wishlist WhatsApp button (injected dynamically — use delegation) */
  document.addEventListener('click', function(e){
    if (e.target.closest('[data-action="wishlist-wa"]')) sendWishlistToWA();
  });

  var _acInit = false;
  function acInit(){
    if (typeof sb === 'undefined' || !sb) return;
    if (_acInit) return; _acInit = true;
    try { sb.auth.onAuthStateChange(function(ev, session){ sbUser = session ? session.user : null; acRender(); }); } catch(e){}
    acRender();
  }
  window.onAuthReady = acInit;
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(acInit, 1200); });

  function acRender(){
    var loading = document.getElementById('ac-loading');
    var main    = document.getElementById('ac-main');
    var gate    = document.getElementById('ac-gate');
    if (typeof sbUser === 'undefined' || !sbUser){
      loading.style.display = 'none'; main.style.display = 'none'; gate.style.display = '';
      try { sessionStorage.setItem('clj_auth_msg', 'Please sign in to view your account.'); } catch(e){}
      location.replace('login.html');
      return;
    }
    gate.style.display = 'none'; loading.style.display = 'none'; main.style.display = '';
    var m = sbUser.user_metadata || {};
    document.getElementById('ac-name').value  = m.full_name || '';
    document.getElementById('ac-email').value = sbUser.email || '';
    document.getElementById('ac-gender').value = m.gender || '';
    if (m.full_name){
      document.getElementById('ac-greeting').textContent = 'Welcome back, ' + String(m.full_name).split(' ')[0] + '.';
    }
    acRenderWishlist();
  }

  async function acRenderWishlist(){
    var box = document.getElementById('ac-wishlist');
    var ids = [];
    try {
      var r = await sb.from('wishlists').select('items').eq('user_id', sbUser.id).maybeSingle();
      ids = (r.data && r.data.items) || [];
    } catch(e){ ids = (typeof _wlGet === 'function') ? _wlGet() : []; }
    var products = window.PRODUCTS || [];
    var cards = ids.map(function(id){
      var p = products.find(function(x){ return x.img === id; });
      return p ? cardHTML(p) : '';
    }).join('');
    if (!cards.trim()){
      box.innerHTML = '<p class="rv-empty" style="text-align:center">No saved favourites yet. Tap the heart on any piece to save it here.</p>';
      return;
    }
    box.innerHTML = '<div class="grid">' + cards + '</div>' +
      '<div style="margin-top:36px;padding-top:28px;border-top:1px solid var(--line);text-align:center">' +
      '<p style="font-family:var(--serif);font-size:.95rem;color:var(--muted);margin-bottom:16px">Share your saved pieces with us and we\'ll send you prices &amp; availability.</p>' +
      '<button class="btn ghost" data-action="wishlist-wa">Send Wishlist on WhatsApp</button>' +
      '</div>';
    if (typeof refreshHearts === 'function') refreshHearts();
  }

  function sendWishlistToWA(){
    var ids = typeof _wlGet === 'function' ? _wlGet() : [];
    var products = window.PRODUCTS || [];
    var items = ids.map(function(id){
      var p = products.find(function(x){ return x.img === id; });
      return p ? '• ' + p.name + (window.CAT_TITLES ? ' — ' + window.CAT_TITLES[p.cat] : '') : null;
    }).filter(Boolean);
    if (!items.length){ return; }
    var text = 'Hello C.L Khanna Jewellers,\n\nI would like to enquire about the following pieces from my wishlist:\n\n' + items.join('\n') + '\n\nKindly share the price and availability. Thank you!';
    window.open('https://wa.me/919815605373?text=' + encodeURIComponent(text), '_blank', 'noopener');
  }

  window.__cmsRender = function(){ if (_acInit && sbUser) acRenderWishlist(); };

  window.onWishlistChange = function(id, on){
    if (on) return;
    var box = document.getElementById('ac-wishlist');
    if (!box) return;
    var btn  = box.querySelector('.wl-btn[data-wid="' + id + '"]');
    var card = btn ? btn.closest('.card') : null;
    if (card) card.remove();
    if (!box.querySelector('.card')){
      box.innerHTML = '<p class="rv-empty" style="text-align:center">No saved favourites yet. Tap the heart on any piece to save it here.</p>';
    }
  };

  async function saveAccountProfile(e){
    e.preventDefault();
    if (!sb || !sbUser) return;
    var msg = document.getElementById('ac-msg'); msg.style.color = ''; msg.textContent = '';
    var name   = document.getElementById('ac-name').value.trim();
    var gender = document.getElementById('ac-gender').value;
    var btn = e.target.querySelector('button[type="submit"]'); var bt = btn.textContent;
    btn.disabled = true; btn.textContent = 'Saving…';
    var r = await sb.auth.updateUser({ data: { full_name: name, gender: gender } });
    btn.disabled = false; btn.textContent = bt;
    if (r.error){ msg.textContent = 'Could not save — please try again.'; }
    else { sbUser = r.data.user; msg.style.color = 'var(--gold-deep)'; msg.textContent = 'Saved.'; }
  }

  async function accountLogout(){
    if (typeof doLogout === 'function'){ try { await doLogout(); } catch(e){} }
    location.href = './';
  }
})();
