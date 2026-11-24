const cacheName = "gate-da-static-v3";
const filenames = ["index.html","style.css","lessons.js","practice.js","paper-index.js","study-content.js","app.js","study.js"];
const scope = new URL(self.registration.scope);
const files = filenames.map(path=>new URL(path,scope).href);

self.addEventListener("install",event=>{
 event.waitUntil((async()=>{
   const cache=await caches.open(cacheName);
   const responses=await Promise.all(files.map(url=>fetch(url,{cache:"reload",redirect:"error"})));
   if(responses.some(response=>!response.ok))throw new Error("Could not cache study files.");
   await Promise.all(files.map((url,i)=>cache.put(url,responses[i])));
   await self.skipWaiting();
 })());
});

self.addEventListener("activate",event=>{
 event.waitUntil((async()=>{
   const keys=await caches.keys();
   await Promise.all(keys.filter(key=>key.startsWith("gate-da-static-")&&key!==cacheName).map(key=>caches.delete(key)));
   await self.clients.claim();
 })());
});

self.addEventListener("fetch",event=>{
 const request=event.request;
 if(request.method!=="GET")return;
 const url=new URL(request.url);
 if(url.origin!==scope.origin)return;
 if(request.mode==="navigate" && (url.pathname===scope.pathname || url.pathname===new URL(files[0]).pathname)) {
   event.respondWith(fetch(request).catch(async()=>{
     const cache=await caches.open(cacheName);
     return (await cache.match(files[0])) || Response.error();
   }));
 } else if(files.includes(url.origin+url.pathname)) {
   event.respondWith(fetch(request).catch(async()=>{
     const cache=await caches.open(cacheName);
     return (await cache.match(url.origin+url.pathname)) || Response.error();
   }));
 }
});
