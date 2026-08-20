const CACHE = 'clj-v65';
const STATIC = [
  '/',
  '/bundle.js',
  '/style.css',
  '/consent.js',
  '/catalog.js',
  '/page-init.js',
  '/sw-reg.js',
  '/assets/logo-main.png',
  '/assets/fonts/marcellus-400.woff2',
  '/assets/fonts/marcellus-400-ext.woff2',
  '/assets/fonts/cormorant-400.woff2',
  '/assets/fonts/cormorant-400i.woff2',
  '/assets/fonts/jost-latin.woff2',
  '/assets/fonts/jost-latin-ext.woff2'
];

self.addEventListener('install', e => {
  /* Force a genuine network fetch for every file cached on install, bypassing
     the browser's own HTTP cache. caches.addAll() uses default fetch caching,
     so a file that was HTTP-cached moments earlier (GitHub Pages sends
     Cache-Control: max-age=600) could get baked into a brand-new SW cache
     version as stale content, defeating the whole point of bumping CACHE. */
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(STATIC.map(url => fetch(url, { cache: 'reload' }).then(res => c.put(url, res)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  /* cache-first for assets, network-first for HTML */
  if (e.request.method !== 'GET') return;
  if (url.pathname.match(/\.(js|css|woff2|png|jpg|webp|svg|ico)$/)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    })));
  } else {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
