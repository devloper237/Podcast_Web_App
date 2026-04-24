const cacheName = "podcast-player-v1";
const assetsToCache = [
  "/",
  "/index.html",
  "/script.js",
  "/potty_192.png",
  "/potty_512.png",
  "/style.css",
  "favicon.png",
  "/podcaster.png",
];

//Install event caching asset

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    }),
  );
});

//Fecth event serving cached content

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          //Handle offline stuff
        })
      );
    }),
  );
});

//Activate event clean up old caches

self.addEventListener("activate", (event) => {
  const cacheWhiteList = [cacheName];
  event.waitUtil(
    caches.keys().then((cacheName) => {
      return Promise.all(
        cacheName.map((cache) => {
          if (!cacheWhiteList.includes(cache)) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});
