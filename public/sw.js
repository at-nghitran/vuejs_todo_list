var cacheName = 'vuejs-todo-list-page';
var filesToCache = [
    '/',
    '/app.js',
    '/icons/192.png',
    '/icons/512.png',
    '/icons/logo-2x.png',
    '/favicon.ico',
    '/manifest.json'
];
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}).then(response => {
            return response || fetch(event.request);
        })
    );
});
