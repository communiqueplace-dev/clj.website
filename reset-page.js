(function(){
  initPage('');

  var passEl = document.getElementById('rp-pass');
  if (passEl) passEl.addEventListener('input', rpStrength);

  var rpForm = document.querySelector('[data-action="set-password"]');
  if (rpForm) rpForm.addEventListener('submit', setNewPassword);

  function showRPState(id){
    ['rp-loading','rp-form','rp-success','rp-invalid'].forEach(function(s){
      var el = document.getElementById(s);
      if (el) el.style.display = (s === id) ? '' : 'none';
    });
  }

  function rpStrength(){
    var pw  = document.getElementById('rp-pass').value;
    var s   = pw ? pwStrength(pw) : 0;
    var bar = document.getElementById('rp-bar');
    var hnt = document.getElementById('rp-hint');
    if (bar) bar.setAttribute('data-s', s || '');
    if (hnt){
      var hints = ['','Too short — use at least 8 characters','Getting stronger — try numbers or symbols','Strong password'];
      hnt.textContent = pw ? (hints[s] || '') : '';
    }
  }

  async function setNewPassword(e){
    e.preventDefault();
    var pass    = document.getElementById('rp-pass').value;
    var confirm = document.getElementById('rp-confirm').value;
    var errEl   = document.getElementById('rp-err');
    errEl.textContent = '';
    if (pass.length < 8){ errEl.textContent = 'Password must be at least 8 characters.'; return; }
    if (pass !== confirm){ errEl.textContent = 'Passwords do not match. Please re-enter.'; return; }
    var btn = e.target.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Updating…';
    try {
      var result = await sb.auth.updateUser({ password: pass });
      btn.disabled = false; btn.textContent = 'Set New Password';
      if (result.error){
        errEl.textContent = result.error.message || 'Could not update your password. Please try again.';
      } else {
        showRPState('rp-success');
      }
    } catch(err){
      btn.disabled = false; btn.textContent = 'Set New Password';
      errEl.textContent = 'Something went wrong. Please try again.';
    }
  }

  /* Verify the reset token from the URL hash.
     Supabase's own client already resolves the recovery link into a real
     session in the background as soon as it loads (it's injected from a CDN,
     so timing varies) — we must wait for that outcome rather than judging
     validity from whether the hash is still present when this script runs,
     or a page that Supabase already logged in gets shown "Link Expired". */
  (function(){
    var hash = location.hash ? location.hash.slice(1) : '';
    var params = {};
    hash.split('&').forEach(function(pair){
      var kv = pair.split('=');
      if (!kv[0]) return;
      try { params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || ''); } catch(e){}
    });

    var handled = false;
    function finish(id){
      if (handled) return;
      handled = true;
      showRPState(id);
    }

    var attempts = 0;
    var poll = setInterval(function(){
      attempts++;
      if (typeof sb !== 'undefined' && sb !== null){
        clearInterval(poll);
        sb.auth.onAuthStateChange(function(event, session){
          if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session && params.type === 'recovery')){
            finish('rp-form');
          }
        });
        sb.auth.getSession().then(function(res){
          if (res.data && res.data.session){ finish('rp-form'); }
        });
        setTimeout(function(){ finish('rp-invalid'); }, 8000);
      } else if (attempts > 100){
        clearInterval(poll);
        finish('rp-invalid');
      }
    }, 100);
  })();
})();
