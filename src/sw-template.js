if (typeof importScripts === 'function') {
  // eslint-disable-next-line no-undef
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.4/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    // eslint-disable-next-line no-restricted-globals
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules */
    const handler = workbox.precaching.createHandlerBoundToURL('./index.html');
    const navigationRoute = new workbox.routing.NavigationRoute(handler, {
      // eslint-disable-next-line no-useless-escape
      denylist: [/^\/_/, /\/[^\/]+\.[^\/]+$/, /^(.*)\/api\/news/]
    });
    workbox.routing.registerRoute(navigationRoute);

    workbox.routing.registerRoute(
      /^http(s?):\/\/.*\.(?:png|gif|jpg|jpeg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'newsImageCache',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
          new workbox.expiration.ExpirationPlugin({
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
          new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
          new workbox.expiration.ExpirationPlugin({
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
          new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
          new workbox.expiration.ExpirationPlugin({
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
