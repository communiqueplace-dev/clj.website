(function(){
  initPage('');
  _authMode = 'up';

  var passEl = document.getElementById('au-pass');
  if (passEl) passEl.addEventListener('input', onAuthPassInput);

  var authForm = document.getElementById('auth-forms');
  if (authForm) authForm.addEventListener('submit', function(e){ e.preventDefault(); doAuth(); });

  /* Already signed in? Go straight to the account area */
  function registerGuard(){
    if (typeof sbUser !== 'undefined' && sbUser){ location.replace('account.html'); }
  }
  window.onAuthReady = registerGuard;
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(registerGuard, 1200); });
})();
