!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js"),workbox.core.setCacheNameDetails({prefix:"leagueFB",suffix:"v5",precache:"precache"}),skipWaiting(),workbox.precaching.precacheAndRoute([{'revision':'0b492e035d300c65900fd684a8e65d99','url':'./pages/favorite.html'},{'revision':'7d4c1b39db9918e266383c39bcc59bd3','url':'./pages/home.html'},{'revision':'b1dfb97a165ecdd4110042e26377a719','url':'./pages/matches.html'},{'revision':'2bb86168f57644bc2167452586c67709','url':'assets/Bundesliga.svg'},{'revision':'c646959e3b64e340f5c3a788ec122795','url':'assets/FIFA World Cup.svg'},{'revision':'de9459ede4f4e36ff97fa39699b4bd2c','url':'assets/Premier League.svg'},{'revision':'e0e07376ef7e7e5ba37a64197572cb21','url':'assets/UEFA Champions League.svg'},{'revision':'e79bfd88537def476913f3ed52f4f4b3','url':'fonts/MaterialIcons-Regular.eot'},{'revision':'a37b0c01c0baf1888ca812cc0508f6e2','url':'fonts/MaterialIcons-Regular.ttf'},{'revision':'012cf6a10129e2275d79d6adac7f3b02','url':'fonts/MaterialIcons-Regular.woff'},{'revision':'570eb83859dc23dd0eec423a49e147fe','url':'fonts/MaterialIcons-Regular.woff2'},{'revision':'d7b5c2cc48955366cddddc5d59e94b97','url':'index.html'},{'revision':'535980e05db58b7d09986ff962e3a7c2','url':'main.js'},{'revision':'6b18d94d50d8f084e687247129ef216e','url':'nav.html'},{'revision':'ee06bbb4c736a18069b0318ebd207923','url':'standing.html'},{'revision':'deca5d2b1fc443b2eb72910138a5b703','url':'standing_bundle.js'},{'revision':'388551472ecc52126c43d11c240d3f59','url':'team.html'},{'revision':'17b27fe85996ee4f90c3ac4a5ca450c4','url':'team_bundle.js'}],{ignoreURLParametersMatching:[/.*/]}),workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg|json)$/,new workbox.strategies.CacheFirst({cacheName:"leagueFB-assets",plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:60,maxAgeSeconds:604800})]})),workbox.routing.registerRoute((function(e){return e.url.origin}),new workbox.strategies.StaleWhileRevalidate({cacheName:"football-data",plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]}),new workbox.expiration.ExpirationPlugin({maxEntries:20,maxAgeSeconds:604800})]})),self.addEventListener("push",(function(e){var t={body:e.data?e.data.text():"No message payload",icon:"assets/icon_192x192.png",badge:"assets/icon_192x192.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("League Football",t))}))}]);