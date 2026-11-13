document.getElementById("y").textContent = new Date().getFullYear();

// Last.fm "now playing"
// 1. Create a free API key at https://www.last.fm/api/account/create
// 2. Paste your Last.fm username and the key below
const LASTFM_USER = "mklz";
const LASTFM_KEY = "912207f0e4d52db05a98530e096c1412";

const POLL_MS = 5000;                            // how often to check Last.fm
const BLANK_ART = "2a96cbd8b46e442fc41c2b86b821562f"; // Last.fm's grey star placeholder
const FALLBACK_MS = 5 * 60 * 1000;               // used when a track's length is unknown

const els = {
  box: document.getElementById("now"),
  art: document.getElementById("now-art"),
  label: document.getElementById("now-label"),
  track: document.getElementById("now-track"),
  artist: document.getElementById("now-artist"),
  eq: document.getElementById("now-eq"),
};
const covers = {};      // track key -> cover URL promise
let current = null;     // { key, since, duration } for the track Last.fm says is playing
let busy = false;

els.art.onerror = () => els.art.removeAttribute("src");

function lastfm(params) {
  const q = new URLSearchParams({ ...params, api_key: LASTFM_KEY, format: "json", _: Date.now() });
  return fetch("https://ws.audioscrobbler.com/2.0/?" + q).then(r => r.json());
}

// Last.fm cover first; if it's missing or the grey star, look it up on iTunes.
function findCover(t, key) {
  const imgs = t.image || [];
  const hit = imgs.find(i => i.size === "extralarge") || imgs.find(i => i.size === "large");
  const url = hit && hit["#text"];
  if (url && !url.includes(BLANK_ART)) return Promise.resolve(url);
  if (!covers[key]) {
    const q = new URLSearchParams({ term: t.artist["#text"] + " " + t.name, entity: "song", limit: 1 });
    covers[key] = fetch("https://itunes.apple.com/search?" + q)
      .then(r => r.json())
      .then(d => {
        const a = d.results && d.results[0] && d.results[0].artworkUrl100;
        return a ? a.replace("100x100", "300x300") : "";
      })
      .catch(() => "");
  }
  return covers[key];
}

async function trackLength(t) {
  try {
    const d = await lastfm({ method: "track.getInfo", artist: t.artist["#text"], track: t.name });
    return parseInt(d.track && d.track.duration, 10) || 0;
  } catch (e) { return 0; }
}

async function updateNowPlaying() {
  if (busy || LASTFM_USER.startsWith("YOUR_") || LASTFM_KEY.startsWith("YOUR_")) return;
  busy = true;
  try {
    const data = await lastfm({ method: "user.getrecenttracks", limit: 1, user: LASTFM_USER });
    let t = data.recenttracks && data.recenttracks.track;
    if (Array.isArray(t)) t = t[0];
    if (!t) { els.box.hidden = true; return; }

    const key = t.artist["#text"] + "|" + t.name;
    let live = !!(t["@attr"] && t["@attr"].nowplaying === "true");

    // Last.fm keeps the "now playing" flag on for a while after you stop.
    // Once the track's own length has passed, treat it as no longer playing.
    if (live) {
      if (!current || current.key !== key) current = { key, since: Date.now(), duration: null };
      if (current.duration === null) current.duration = await trackLength(t);
      const limit = (current.duration || FALLBACK_MS) + 20000;
      if (Date.now() - current.since > limit) live = false;
    } else {
      current = null;
    }

    els.track.textContent = t.name;
    els.artist.textContent = t.artist["#text"];
    els.label.textContent = live ? "Currently listening to" : "Last listened to";
    els.eq.hidden = !live;
    els.box.href = t.url || "https://www.last.fm";
    els.box.hidden = false;

    const cover = await findCover(t, key);
    if (cover) { if (els.art.getAttribute("src") !== cover) els.art.src = cover; }
    else els.art.removeAttribute("src");
  } catch (e) {
    els.box.hidden = true;
  } finally {
    busy = false;
  }
}

updateNowPlaying();
setInterval(() => { if (!document.hidden) updateNowPlaying(); }, POLL_MS);
document.addEventListener("visibilitychange", () => { if (!document.hidden) updateNowPlaying(); });