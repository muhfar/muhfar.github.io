const CACHE_NAME = "footballLeague-test";

let urlsToCache = [
    "/",
    "index.html",
    "standing.html",
    "manifest.json",
    "service-worker.js",
    "js/main.js",
    "js/materialize.min.js",
    "js/nav.js",
    "js/sw.js",
    "js/api.js",
    "js/idb.js",
    "js/db.js",
    "css/materialize.min.css",
    "css/material-icons.css",
    "pages/home.html",
    "pages/matches.html"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    const base_url = "https://api.football-data.org/v2/";

    if(event.request.url.indexOf(base_url) > -1){
        event.respondWith(
            caches.open(CACHE_NAME)
            .then((cache) => {
                return fetch(event.request)
                .then((response) => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        )
    } else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true})
            .then((response) => {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        console.log("Service Worker | cache "+ cacheName + " dihapus!");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})