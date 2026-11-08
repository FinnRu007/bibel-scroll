var V="bibelscroll-v1";
var CORE=["./","index.html","data.js","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var nav=r.mode==="navigate";
  if(nav){e.respondWith(fetch(r).then(function(x){var y=x.clone();caches.open(V).then(function(c){c.put("index.html",y)});return x}).catch(function(){return caches.match("index.html")}));return}
  e.respondWith(caches.match(r).then(function(h){return h||fetch(r).then(function(x){var y=x.clone();caches.open(V).then(function(c){c.put(r,y)});return x})}));
});
