const CACHE_NAME = 'budget-salinas-v-final';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  // Para el archivo principal (index.html o la raíz), usamos Red Primero
  if (event.request.mode === 'navigate' || event.request.url.endsWith('index.html') || event.request.url.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Para otros recursos, usa caché estándar
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});
