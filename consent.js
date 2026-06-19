/* C.L Khanna Jewellers - Cookie Consent + Google Analytics 4
   ===========================================================
   >> REPLACE the value below with your real GA4 Measurement ID <<
   Get it from: analytics.google.com -> Admin -> Data Streams -> your stream -> Measurement ID
*/
var GA_MEASUREMENT_ID = 'G-9TPG9YYZ7Q';

(function(){
  /* --- Google Consent Mode v2: DENY everything before GA loads --- */
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    analytics_storage:  'denied',
    ad_storage:         'denied',
    ad_user_data:       'denied',
    ad_personalization: 'denied',
    wait_for_update:    500
  });
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  var STORE_KEY = 'clj_cookie_v1';
  var gaLoaded  = false;

  function getStored(){
    try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch(e){ return null; }
  }
  function savePrefs(prefs){
    try { localStorage.setItem(STORE_KEY, JSON.stringify(prefs)); } catch(e){}
  }

  function loadGA(){
    if (gaLoaded || typeof GA_MEASUREMENT_ID === 'undefined') return;
    gaLoaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    s.onload = function(){ gtag('event', 'page_view'); };
    document.head.appendChild(s);
  }

  function hideBanner(){
    var b = document.getElementById('ck-banner');
    if (!b) return;
    b.style.transform = 'translateY(110%)';
    b.style.opacity   = '0';
    setTimeout(function(){ if (b.parentNode) b.parentNode.removeChild(b); }, 360);
  }

  function injectBanner(){
    if (document.getElementById('ck-banner')) return;
    var d = document.createElement('div');
    d.id = 'ck-banner';
    d.innerHTML =
      '<p class="ck-text"><b>We use cookies.</b> Essential ones keep the site running; analytics ' +
      'help us understand what you love. <a href="privacy.html#cookies" class="ck-text-link">Learn more</a>.</p>' +
      '<div class="ck-btns">' +
        '<button class="ck-accept" data-ck="acceptAll">Accept All</button>' +
        '<button class="ck-reject" data-ck="reject">Reject Non-Essential</button>' +
        '<button class="ck-customize" data-ck="openPanel">Customize</button>' +
      '</div>';
    document.body.appendChild(d);
  }

  function buildPanel(){
    var prefs = getStored();
    var analyticsOn = !!(prefs && prefs.analytics);
    var d = document.createElement('div');
    d.id = 'ck-panel';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', 'Cookie settings');
    d.innerHTML =
      '<div class="ck-veil" data-ck="closePanel"></div>' +
      '<div class="ck-pbox">' +
        '<button class="ck-pbox-x" aria-label="Close" data-ck="closePanel">&#215;</button>' +
        '<h3 class="ck-pbox-h">Cookie Settings</h3>' +
        '<div class="ck-row">' +
          '<div class="ck-row-info">' +
            '<b>Essential Cookies</b>' +
            '<p>Required for navigation, cart and security. Cannot be disabled.</p>' +
          '</div>' +
          '<div class="ck-tog ck-tog-on ck-tog-locked" aria-disabled="true" title="Always on"></div>' +
        '</div>' +
        '<div class="ck-row">' +
          '<div class="ck-row-info">' +
            '<b>Analytics Cookies</b>' +
            '<p>Anonymous usage data via Google Analytics 4. Helps us improve the site. No personal data is sent.</p>' +
          '</div>' +
          '<button class="ck-tog' + (analyticsOn ? ' ck-tog-on' : '') + '"' +
            ' id="ck-tog-an"' +
            ' role="switch"' +
            ' aria-checked="' + (analyticsOn ? 'true' : 'false') + '"' +
            ' data-ck="toggleAnalytics">' +
          '</button>' +
        '</div>' +
        '<div class="ck-pbox-btns">' +
          '<button class="btn solid" style="font-size:.82rem;padding:9px 20px" data-ck="savePanel">Save Preferences</button>' +
          '<button class="btn ghost" style="font-size:.82rem;padding:9px 20px" data-ck="acceptAll">Accept All</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d);
  }

  window.CK = {
    acceptAll: function(){
      savePrefs({ analytics: true });
      loadGA();
      hideBanner();
      CK.closePanel();
    },
    reject: function(){
      savePrefs({ analytics: false });
      hideBanner();
    },
    openPanel: function(){
      if (!document.getElementById('ck-panel')) buildPanel();
      var tog = document.getElementById('ck-tog-an');
      if (tog){
        var on = !!(getStored() && getStored().analytics);
        tog.classList.toggle('ck-tog-on', on);
        tog.setAttribute('aria-checked', on ? 'true' : 'false');
      }
      document.getElementById('ck-panel').classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    closePanel: function(){
      var p = document.getElementById('ck-panel');
      if (p){ p.classList.remove('open'); document.body.style.overflow = ''; }
    },
    toggleAnalytics: function(){
      var tog = document.getElementById('ck-tog-an');
      if (!tog) return;
      var on = tog.classList.toggle('ck-tog-on');
      tog.setAttribute('aria-checked', on ? 'true' : 'false');
    },
    savePanel: function(){
      var tog = document.getElementById('ck-tog-an');
      var on = !!(tog && tog.classList.contains('ck-tog-on'));
      savePrefs({ analytics: on });
      if (on) loadGA();
      CK.closePanel();
      hideBanner();
    }
  };

  /* Called from footer "Cookie Settings" link */
  window.openCookieSettings = function(){ CK.openPanel(); };

  /* Event delegation for banner/panel controls (replaces inline on* handlers
     so the page can run under a CSP without script-src 'unsafe-inline'). */
  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-ck]');
    if (!el) return;
    var fn = el.getAttribute('data-ck');
    if (typeof CK[fn] === 'function') CK[fn]();
  });
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest && e.target.closest('[data-ck="toggleAnalytics"]');
    if (el){ e.preventDefault(); CK.toggleAnalytics(); }
  });

  /* Init: apply stored prefs or show banner */
  var stored = getStored();
  if (stored !== null){
    if (stored.analytics) loadGA();
  } else {
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', injectBanner);
    } else {
      injectBanner();
    }
  }
})();
