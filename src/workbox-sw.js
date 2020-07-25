importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.precaching.precacheAndRoute(
	self.__WB_MANIFEST, {
	ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
	new RegExp('/assets/'),
	new workbox.strategies.CacheOnly({
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
	new RegExp('/fonts/'),
	new workbox.strategies.CacheOnly({
		cacheName: 'leagueFB-assets'
	})
);

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'leagueFB-assets'
	})
);

workbox.routing.registerRoute(
	/^https:\/\/api\.football-data\.org\/v2\//,
	new workbox.strategies.CacheFirst({
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