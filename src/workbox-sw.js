importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.core.setCacheNameDetails({
	prefix: 'leagueFB',
	suffix: 'v5',
	precache: 'precache',
});

skipWaiting();

workbox.precaching.precacheAndRoute(
	self.__WB_MANIFEST, {
	ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg|json)$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'leagueFB-assets',
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 60 * 60 * 24 * 7,
			})
		]
	})
);

workbox.routing.registerRoute(
	({url}) => url.origin,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'football-data',
		plugins: [
			new workbox.cacheableResponse.CacheableResponsePlugin({
				statuses: [0, 200]
			}),
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 20,
				maxAgeSeconds: 60 * 60 * 24 * 7,
			})
		]
	})
);

self.addEventListener('push', (event) => {
	let body;
	const title = 'League Football';

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'No message payload';
	}

	const options = {
		body: body,
		icon: 'assets/icon_192x192.png',
		badge: 'assets/icon_192x192.png',
		vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
	}

	event.waitUntil(
		self.registration.showNotification(title, options)
	);
})