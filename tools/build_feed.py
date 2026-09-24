#!/usr/bin/env python3
"""Mirror the YouTube channel into channel/feed.json — the data the site's channel page draws.

Runs on GitHub Actions every 3 hours (.github/workflows/channel-feed.yml). Python stdlib only,
no API key: YouTube's public RSS feeds. Each feed caps at 15 entries, which is why Shorts and
long-form are read from their own feeds instead of splitting the channel's latest 15.

    python3 tools/build_feed.py            # writes channel/feed.json

Playlists are listed in PLAYLISTS in the order the channel shows them. Add a new playlist here
and it appears on the site on the next run.
"""
import json, os, sys, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone

CH = "F5AqXCMX3L3719EtmFFpwA"          # UC + this = the channel; UUSH/UULF + this = Shorts/long
PLAYLISTS = [                           # read off youtube.com/@moonologyartgallery/playlists 2026-09-24
    "PLDGGDcJHmOvU",   # 🏺 Ancient Egypt · Object by Object
    "PLC6NPe1d6o1g",   # 🌕 Every Moon in the Solar System
    "PLevpeIT--HY8",   # THE RECORD SAYS 🌙
    "PLYC3_DRf5JAY",   # Lost Machines 🌙
    "PLePidkCunzBI",   # Binaural Myths & Facts 🌙
    "PLBlCONv9nKwA",   # Thoth Teaches 🌙
    "PLIOM9gZUpGrw",   # Moonology Binaural 🌙
]
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015",
      "m": "http://search.yahoo.com/mrss/"}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "channel", "feed.json")


def fetch(q):
    url = f"https://www.youtube.com/feeds/videos.xml?{q}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 moonology-site-feed"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return ET.fromstring(r.read())


def entries(root):
    out = []
    for e in root.findall("a:entry", NS):
        vid  = e.findtext("yt:videoId", namespaces=NS)
        link = e.find("a:link", NS).get("href", "")
        g    = e.find("m:group", NS)
        st   = g.find("m:community/m:statistics", NS) if g is not None else None
        out.append({
            "id": vid,
            "title": e.findtext("a:title", namespaces=NS),
            "published": e.findtext("a:published", namespaces=NS),
            "short": "/shorts/" in link,
            "views": int(st.get("views")) if st is not None and st.get("views") else None,
        })
    return out


def main():
    ch = fetch(f"channel_id=UC{CH}")
    data = {
        "channel": {
            "name": ch.findtext("a:title", namespaces=NS),
            "url": "https://www.youtube.com/@moonologyartgallery",
            "subscribe": "https://www.youtube.com/@moonologyartgallery?sub_confirmation=1",
        },
        "latest": entries(ch),
        "shorts": entries(fetch(f"playlist_id=UUSH{CH}")),
        "videos": entries(fetch(f"playlist_id=UULF{CH}")),
        "playlists": [],
    }
    for pid in PLAYLISTS:
        try:
            r = fetch(f"playlist_id={pid}")
        except Exception as ex:                     # one bad playlist never blanks the page
            print(f"  skip {pid}: {ex}", file=sys.stderr); continue
        items = entries(r)
        if items:
            data["playlists"].append({"id": pid, "title": r.findtext("a:title", namespaces=NS),
                                      "items": items})
    # 🔴 NEVER WRITE AN EMPTY MIRROR. If YouTube hiccups, keep yesterday's file instead of
    # publishing a blank channel page.
    if not data["latest"]:
        sys.exit("channel feed came back empty — keeping the previous feed.json")
    old = None
    if os.path.exists(OUT):
        old = json.load(open(OUT, encoding="utf-8"))
        old.pop("updated", None)
    if old == data:
        print("  no change"); return
    data["updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=1)
    print(f"  wrote {OUT}: {len(data['latest'])} latest · {len(data['shorts'])} shorts · "
          f"{len(data['videos'])} videos · {len(data['playlists'])} playlists")


if __name__ == "__main__":
    main()
