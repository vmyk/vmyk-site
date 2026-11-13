// Cloudflare Pages Function: forwards requests to Last.fm and adds the API key
// on the server, so the key never appears in the website's code.
// Set LASTFM_KEY and LASTFM_USER in Cloudflare (Settings > Variables and Secrets).

const ALLOWED = ["user.getrecenttracks", "track.getInfo"];

export async function onRequest({ request, env }) {
  const incoming = new URL(request.url).searchParams;
  const method = incoming.get("method");
  if (!ALLOWED.includes(method)) {
    return new Response("Not allowed", { status: 400 });
  }

  const q = new URLSearchParams();
  for (const k of ["method", "limit", "artist", "track"]) {
    if (incoming.has(k)) q.set(k, incoming.get(k));
  }
  if (method === "user.getrecenttracks") q.set("user", env.LASTFM_USER);
  q.set("api_key", env.LASTFM_KEY);
  q.set("format", "json");

  const res = await fetch("https://ws.audioscrobbler.com/2.0/?" + q);
  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
