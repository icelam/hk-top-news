if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules */
    workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'), {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/, /^(.*)\/api\/news/]
    });

    workbox.routing.registerRoute(
      /^http(s?):\/\/.*\.(?:png|gif|jpg|jpeg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'newsImageCache',
        plugins: [
          new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }),
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      /^https:\/\/pinkylam.me\/playground\/hk-top-news\/api*/,
      new workbox.strategies.NetworkFirst({
        cacheName: 'newsApiCache',
        plugins: [
          new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }),
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 1 * 24 * 60 * 60 // 1 Day
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      /^https:\/\/fonts\.(googleapis|gstatic)\.com.*/,
      new workbox.strategies.CacheFirst({
        cacheName: 'googelFontsCache',
        plugins: [
          new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }),
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
