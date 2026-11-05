const CACHE_NAME = 'budget-salinas-v2';
const CORE = ['./', './index.html', './manifest.json', './icon.png'];
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.allSettled(CORE.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function guardarSiOk(request, response) {
  if (response && response.ok && response.type === 'basic') {
    const copia = response.clone();
    return caches.open(CACHE_NAME).then(cache => cache.put(request, copia));
  }
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Página principal: red primero (siempre la última versión), caché si no hay internet o tarda
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const desdeCache = async () =>
        (await caches.match(req, { ignoreSearch: true })) ||
        (await caches.match('./index.html')) ||
        (await caches.match('./'));
      const red = fetch(req).then(res => { event.waitUntil(Promise.resolve(guardarSiOk(req, res))); return res; });
      try {
        const cacheado = await desdeCache();
        if (!cacheado) return await red;
        const limite = new Promise(resolve => setTimeout(() => resolve(null), NETWORK_TIMEOUT_MS));
        return (await Promise.race([red, limite])) || cacheado;
      } catch (e) {
        return (await desdeCache()) || Response.error();
      }
    })());
    return;
  }

  // Resto de archivos: caché primero y se guarda lo que se descarga
  event.respondWith(
    caches.match(req).then(cacheado => cacheado || fetch(req).then(res => { event.waitUntil(Promise.resolve(guardarSiOk(req, res))); return res; }))
  );
});
