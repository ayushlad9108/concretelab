const CACHE = 'concretelab-v2';
const PRECACHE = [
  '/concrete-calculator.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install: cache only local assets — NOT the CDN script
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - CDN requests (SheetJS etc): always go to network, never intercept
// - Local assets: cache-first
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;

  // Never intercept CDN requests — let them go straight to network
  if (url.includes('cdnjs.cloudflare.com') || url.includes('cdn.jsdelivr.net')) return;

  // Cache-first for local precached assets
  const isLocal = PRECACHE.some(p => url.endsWith(p));
  if (isLocal) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Network-first for everything else (navigation, SSR routes)
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
