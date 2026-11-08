const C="leitor-v2",A=["./","index.html","manifest.webmanifest","icon.svg","https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const same=new URL(e.request.url).origin===location.origin;
const net=()=>fetch(e.request).then(x=>{const k=x.clone();caches.open(C).then(c=>c.put(e.request,k));return x});
e.respondWith(same?net().catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))):caches.match(e.request).then(r=>r||net()))});
