addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const clientIP = request.headers.get('CF-Connecting-IP');
  const host = "ipwhois.app";
  switch(url.pathname)
  {
    case "/json":
      url.pathname += "/";
      url.pathname += clientIP;
      break;
    case "/json/":
      url.pathname += clientIP;
      break;
    case "/ip":
    case "/ip/":
      return new Response(clientIP);
      break;
  }
  url.hostname = host;
  return fetch(url);
}
