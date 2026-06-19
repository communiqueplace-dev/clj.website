(function(){
  var b   = document.body;
  var pg  = b.dataset.page || '';
  var cat = b.dataset.cat  || '';

  /* initPage() wires up all click/input/change/submit delegation (setupDelegation),
     so every data-action / .burger / .filter-open-btn / cart-enquiry / reset-link
     handler is registered here — no inline on* attributes needed. */
  if (typeof initPage === 'function') initPage(pg);

  if (cat){
    window.__cmsRender = function(){
      if (typeof renderCatalog === 'function') renderCatalog(cat);
    };
    if (typeof showSkeletons === 'function') showSkeletons(document.getElementById('grid'), 6);
    if (typeof renderCatalog === 'function') renderCatalog(cat);
  }

  if (pg === 'cart' && typeof renderCartPage === 'function'){
    window.__cmsRender = function(){ renderCartPage(); };
    renderCartPage();
  }

  if (pg === 'product' && typeof renderProduct === 'function'){
    window.__cmsRender = function(){ renderProduct(); };
    renderProduct();
  }
})();
