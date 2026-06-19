const CACHE_NAME = 'iniobong-card-v1';
const PRECACHE_URLS = [
  '.',
  'index.html',
  'director.jpg',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // For navigation requests, try network first, fallback to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('index.html'))
    );
    return;
  }

  // For other requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        // Put a copy in cache for future
        return caches.open(CACHE_NAME).then((cache) => {
          // clone response because response streams can only be read once
          cache.put(event.request, resp.clone());
          return resp;
        });
      }).catch(() => {
        // Nothing cached and failed — let it fail
      });
    })
  );
});
