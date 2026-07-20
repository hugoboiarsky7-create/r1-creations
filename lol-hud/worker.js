/* ============================================================
   LoL HUD — Cloudflare Worker relay
   - POST /update  (header X-Hud-Secret) : reçoit l'état du client LoL
   - GET  /state                          : sert le dernier état (CORS ouvert)
   Déploiement : voir les instructions dans le README du repo.
   ============================================================ */

const SECRET = 'change-moi-petit-secret';   // ← même valeur que dans bridge.py

// Dernier état, gardé en mémoire de l'isolate + copié dans le cache du colo.
// (Pour un HUD à 1 utilisateur qui poll toutes les 2 s, c'est suffisant.)
let lastState = null;
let lastTs = 0;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Hud-Secret',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (request.method === 'POST' && url.pathname === '/update') {
      if (request.headers.get('X-Hud-Secret') !== SECRET) {
        return new Response('forbidden', { status: 403, headers: CORS });
      }
      try {
        lastState = await request.text();
        lastTs = Date.now();
        // copie dans le cache du colo pour survivre au recyclage de l'isolate
        const cacheReq = new Request('https://hud.internal/state');
        const resp = new Response(JSON.stringify({ ts: lastTs, data: JSON.parse(lastState) }), {
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=60' },
        });
        await caches.default.put(cacheReq, resp);
        return new Response('ok', { headers: CORS });
      } catch (e) {
        return new Response('bad payload', { status: 400, headers: CORS });
      }
    }

    if (request.method === 'GET' && url.pathname === '/state') {
      let body = null;
      if (lastState !== null) {
        body = JSON.stringify({ ts: lastTs, data: JSON.parse(lastState) });
      } else {
        const cached = await caches.default.match(new Request('https://hud.internal/state'));
        if (cached) body = await cached.text();
      }
      if (body === null) {
        return new Response(JSON.stringify({ ts: 0, data: null }), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
      return new Response(body, { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    return new Response('LoL HUD relay', { headers: CORS });
  },
};
