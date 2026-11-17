/* ==========================================================================
   Assistant Coach — service worker : l'appli fonctionne hors ligne
   - à l'installation, tous les fichiers de l'appli sont mis en cache (liste ASSETS)
     ainsi que les polices Google (cache séparé, gardé d'une version à l'autre)
   - ensuite tout est servi depuis le cache : l'appli s'ouvre sans réseau
   - une nouvelle version = un nouveau VERSION : le navigateur la télécharge en arrière-plan
     et la page propose de recharger
   VERSION et ASSETS sont écrits par scripts/maj_sw.py : ne pas les modifier à la main.
   ========================================================================== */

/* ASSETS:debut */
const VERSION = '0341290a8825';
const ASSETS = [
  './',
  'manifest.webmanifest',
  'icons/apple-touch-icon.png',
  'css/styles.css?v=34',
  'js/data/themes.js?v=34',
  'js/data/cards.js?v=34',
  'js/data/cards-educatif.js?v=34',
  'js/data/cards-pressure.js?v=34',
  'js/data/cards-double.js?v=34',
  'js/data/cards-tactics.js?v=34',
  'js/data/cards-jambes.js?v=34',
  'js/data/cards-fond.js?v=34',
  'js/data/cards-service.js?v=34',
  'js/data/cards-filet.js?v=34',
  'js/data/classification.js?v=34',
  'js/icons.js?v=34',
  'js/court.js?v=34',
  'js/card.js?v=34',
  'js/store.js?v=34',
  'js/generator.js?v=34',
  'js/app.js?v=34',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png'
];
/* ASSETS:fin */

const CACHE = 'ac-app-' + VERSION;
const FONTS = 'ac-fonts-v1';
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Unbounded:wght@500;700;800&display=swap';
const ROOT = new URL('./', self.location).href;

/* Polices : la feuille de Google et les fichiers woff2 qu'elle cite */
async function cacheFonts() {
  const fc = await caches.open(FONTS);
  if (await fc.match(FONT_CSS)) return;
  const res = await fetch(FONT_CSS, { mode: 'cors' });
  if (!res.ok) return;
  const css = await res.clone().text();
  const urls = Array.from(css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g), (m) => m[1]);
  await Promise.all(urls.map(async (u) => {
    const r = await fetch(u, { mode: 'cors' });
    if (r.ok) await fc.put(u, r);
  }));
  await fc.put(FONT_CSS, res);
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    /* cache: 'reload' : on ne reprend pas une vieille copie du cache HTTP */
    await cache.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' })));
    try { await cacheFonts(); } catch (e) { /* hors ligne : les polices système prennent le relais */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.indexOf('ac-app-') === 0 && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* Polices Google : cache d'abord, réseau sinon (et on garde la copie) */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith((async () => {
      const fc = await caches.open(FONTS);
      const hit = await fc.match(req.url);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') fc.put(req.url, res.clone());
      return res;
    })());
    return;
  }

  if (url.origin !== self.location.origin) return;

  /* Ouverture de l'appli : la page en cache, même sans réseau */
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      return (await cache.match(ROOT)) || (await cache.match(new URL('index.html', ROOT).href)) || fetch(req);
    })());
    return;
  }

  /* Fichiers de l'appli : cache d'abord, réseau en secours */
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
    if (hit) return hit;
    return fetch(req);
  })());
});

/* La page peut demander l'activation immédiate d'une nouvelle version */
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
