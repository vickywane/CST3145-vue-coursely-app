// src/registerServiceWorker.js

import { precacheAndRoute } from 'workbox-precaching';

import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Ensure that __WB_MANIFEST is defined as an array of objects

// Precache local files and set up routes
precacheAndRoute([].concat(self.__WB_MANIFEST || []));

// Cache Vue.js library from a CDN
registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net\/npm\/vue@\d+\.\d+\.\d+\/dist\/vue\.js$/,
  new CacheFirst({
    cacheName: 'vue-library-cache',
  })
);

// // Cache images from specific API requests
// registerRoute(
//   /^https:\/\/cw-lessons\.eu-north-1\.elasticbeanstalk\.com\/images\/(.*)$/,
//   new CacheFirst({
//     cacheName: 'api-images-cache',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 7 * 24 * 60 * 60,
//       }),
//     ],
//   })
// );

// Cache API request data using StaleWhileRevalidate strategy
registerRoute(
  "https://2a4e-188-28-41-79.ngrok-free.app/lessons",
  new StaleWhileRevalidate({
    cacheName: 'api-data-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60,
      }),
    ],
  })
);

// Serve cached files for all routes
registerRoute(
  ({ request }) => {
    return (
      request.destination === 'script' ||
      request.destination === 'style' ||
      request.destination === 'document' ||
      request.destination === 'image'
    );
  },
  new StaleWhileRevalidate({
    cacheName: 'app-cache',
  })
);