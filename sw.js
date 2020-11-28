const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/clapperboard.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];  

// install service worker
self.addEventListener('install', evt => {
    //console.log('Service Working has beeeen installed.');
    evt.waitUntil(
        caches.open(staticCacheName).then( cache => {
            console.log('Caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt =>{
    //console.log('Service worker has been activated');
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('Fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    );

});