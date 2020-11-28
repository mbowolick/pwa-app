const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/clapperboard.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];  

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name,size));
            }
        })
    })
};


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
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys); 
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('Fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName,15);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if(evt.request.url.indexOf('.html') > -1 ) {
                return caches.match('/pages/fallback.html')
            }
            
        })
    );
});

// Add offline fallback
// Keep cache slim
//