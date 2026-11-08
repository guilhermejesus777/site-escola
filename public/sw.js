/*
 * Service Worker do protótipo (PWA).
 *
 * Estratégia:
 * - Páginas e navegações: network-first, com fallback para o cache
 *   quando o dispositivo está sem internet (modo offline básico).
 * - Apenas recursos realmente estáticos (manifest, ícones, ilustrações)
 *   usam cache.
 * - JavaScript/CSS e a API NUNCA passam pelo cache, para o app sempre
 *   carregar a versão mais recente.
 */
const CACHE_NAME = "site-escola-v2";

const STATIC_ASSETS = [
  "/manifest.json",
  "/mascote-cepk.svg",
  "/escola-cepk.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const path = new URL(request.url).pathname;

  // API e arquivos de código: sempre pela rede.
  if (!["/manifest.json", "/mascote-cepk.svg", "/escola-cepk.svg", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png"].some(asset => path === asset)) {
    return;
  }

  // Navegações sem conexão: tenta a rede primeiro e usa a cópia em cache.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit ?? caches.match("/"))),
    );
    return;
  }

  // Recursos estáticos listados: cache primeiro.
  event.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
