importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.precaching.precacheAndRoute(
	[{"revision":"0b492e035d300c65900fd684a8e65d99","url":"./pages/favorite.html"},{"revision":"7d4c1b39db9918e266383c39bcc59bd3","url":"./pages/home.html"},{"revision":"b1dfb97a165ecdd4110042e26377a719","url":"./pages/matches.html"},{"revision":"2bb86168f57644bc2167452586c67709","url":"assets/Bundesliga.svg"},{"revision":"c646959e3b64e340f5c3a788ec122795","url":"assets/FIFA World Cup.svg"},{"revision":"de9459ede4f4e36ff97fa39699b4bd2c","url":"assets/Premier League.svg"},{"revision":"e0e07376ef7e7e5ba37a64197572cb21","url":"assets/UEFA Champions League.svg"},{"revision":"06173bc5fd98c60ca3a2f80a64beb1de","url":"assets/icon-192.png"},{"revision":"17555f4566923ba3957fc5b2bf8330d3","url":"assets/icon-512.png"},{"revision":"e79bfd88537def476913f3ed52f4f4b3","url":"fonts/MaterialIcons-Regular.eot"},{"revision":"a37b0c01c0baf1888ca812cc0508f6e2","url":"fonts/MaterialIcons-Regular.ttf"},{"revision":"012cf6a10129e2275d79d6adac7f3b02","url":"fonts/MaterialIcons-Regular.woff"},{"revision":"570eb83859dc23dd0eec423a49e147fe","url":"fonts/MaterialIcons-Regular.woff2"},{"revision":"0445b0e136ab6570841e84c4ffead0b6","url":"index.html"},{"revision":"8c6936540dd8e4dc2983f5ebf2c574ac","url":"main.js"},{"revision":"0caf0f826cfe7190da9ceae069ba32df","url":"manifest.json"},{"revision":"6b18d94d50d8f084e687247129ef216e","url":"nav.html"},{"revision":"073a6d5630d814fc60aaf049147e1c9f","url":"standing.html"},{"revision":"efdfcf1ab7e06331d5a888e698a9f5b3","url":"standing_bundle.js"},{"revision":"68d9a6c7ec725b00d4950d04b48f11c4","url":"team.html"},{"revision":"1ae6431e2c946290a0eeb002f2b0a5ed","url":"team_bundle.js"}], {
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