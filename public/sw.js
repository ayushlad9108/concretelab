const CACHE = 'concretelab-v1';
const PRECACHE = [
  '/concrete-calculator.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Install: cache everything up front
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
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

// Fetch: cache-first for precached assets, network-first for everything else
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;

  // Cache-first for the calculator page and its known assets
  const isCacheable = PRECACHE.some(p => url.includes(p.replace('https://cdnjs.cloudflare.com', '')));
  if (isCacheable) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      }))
    );
    return;
  }

  // Network-first for everything else (navigation, API calls)
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
