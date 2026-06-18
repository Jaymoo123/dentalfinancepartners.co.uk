import json
import re
import urllib.request

CHECKS = {
    "dentists": 2,
    "generalist": 2,
    "solicitors": 2,
    "agency": 2,
}
for site, n in CHECKS.items():
    w = {e["slug"]: e for e in json.load(open(rf".cache\meta_program\{site}\worklist.json", encoding="utf-8"))}
    props = json.load(open(rf".cache\meta_program\{site}\proposals.json", encoding="utf-8"))
    done = 0
    for pe in props:
        we = w.get(pe["slug"])
        if not we or done >= n:
            continue
        url = we["page_url"]
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
        except Exception as exc:
            print(f"[{site}] {pe['slug']}: FETCH FAIL {exc}")
            done += 1
            continue
        m = re.search(r"<title>([^<]+)</title>", html)
        d = re.search(r'name="description" content="([^"]+)"', html)
        live_t = m.group(1) if m else "(none)"
        live_d = d.group(1) if d else "(none)"
        ok_t = live_t.startswith(pe["metaTitle"][:40])
        ok_d = live_d.startswith(pe["metaDescription"][:40])
        print(f"[{site}] {pe['slug']}: title={'OK' if ok_t else 'MISMATCH'} desc={'OK' if ok_d else 'MISMATCH'}")
        if not ok_t:
            print(f"   live:     {live_t[:90]}")
            print(f"   expected: {pe['metaTitle']}")
        done += 1
