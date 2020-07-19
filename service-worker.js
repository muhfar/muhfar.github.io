const CACHE_NAME = "footballLeague-test";

let urlsToCache = [
    "/",
    "main.js",
    "standing_bundle.js",
    "team_bundle.js",
    "index.html",
    "standing.html",
    "team.html",
    "nav.html",
    "manifest.json",
    "pages/home.html",
    "pages/matches.html",
    "pages/favorite.html",
    "assets/Bundesliga.svg",
    "assets/FIFA World Cup.svg",
    "assets/Premier League.svg",
    "assets/UEFA Champions League.svg",
    "assets/icon-192.png",
    "assets/icon-512.png",
    "fonts/MaterialIcons-Regular.eot",
    "fonts/MaterialIcons-Regular.ttf",
    "fonts/MaterialIcons-Regular.woff",
    "fonts/MaterialIcons-Regular.woff2",
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

self.addEventListener("push", (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        body: body,
        icon: 'icon-192.png',
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});