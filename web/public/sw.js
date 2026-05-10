// Minimal service worker stub — enables PWA installability.
// Offline support and caching added in issue #13.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim())
);
