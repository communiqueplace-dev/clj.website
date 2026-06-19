(function(){
  initPage('');
  _authMode = 'in';

  /* Show any prompt carried here from a "please sign in" action */
  try {
    var m = sessionStorage.getItem('clj_auth_msg');
    if (m){
      var e = document.getElementById('au-err');
      e.style.color = 'var(--gold-deep)';
      e.textContent = m;
      sessionStorage.removeItem('clj_auth_msg');
    }
  } catch(e){}

  /* Deep-link to the reset-link form */
  if (/[?&]forgot=1/.test(location.search)){ showForgotForm(); }

  /* Already signed in? Go straight to the account area */
  function loginGuard(){
    if (typeof sbUser !== 'undefined' && sbUser){ location.replace('account.html'); }
  }
  window.onAuthReady = loginGuard;
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(loginGuard, 1200); });

  /* Form & button event listeners */
  var authForm = document.getElementById('auth-forms');
  if (authForm) authForm.addEventListener('submit', function(e){ e.preventDefault(); doAuth(); });

  var forgotForm = document.getElementById('auth-forgot');
  if (forgotForm){
    forgotForm.querySelector('[data-action="do-forgot"]').addEventListener('click', doForgotPassword);
    forgotForm.querySelector('[data-action="show-auth"]').addEventListener('click', showAuthForms);
  }

  var forgotBtn = document.querySelector('[data-action="show-forgot"]');
  if (forgotBtn) forgotBtn.addEventListener('click', showForgotForm);
})();
