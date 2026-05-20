"""Centralised IndexNow submission CLI for the multi-site network.

Submits URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep, etc.) for any
configured site. Replaces the per-site pipeline/submit_indexnow.py copies
which previously had to be maintained separately for each niche.

Per-site config (HOST + KEY) lives in optimisation_engine/indexing/config.py.
The queue file lives at optimisation_engine/indexing/.indexnow_queue_<site>.txt
(one per site, gitignored).

Usage:
  # Submit URLs inline:
  python -m optimisation_engine.indexing.submit_indexnow --site dentists \\
    https://www.dentalfinancepartners.co.uk/blog/post-1

  # Submit everything in the live sitemap (use sparingly):
  python -m optimisation_engine.indexing.submit_indexnow --site dentists \\
    --from-sitemap

  # Submit URLs listed in a text file (one per line):
  python -m optimisation_engine.indexing.submit_indexnow --site dentists \\
    --from-file urls.txt

  # Drain the per-site pending-publish queue:
  python -m optimisation_engine.indexing.submit_indexnow --site dentists \\
    --from-queue

  # Add a URL to the site's queue without submitting (called by generators):
  python -m optimisation_engine.indexing.submit_indexnow --site dentists \\
    --enqueue https://www.dentalfinancepartners.co.uk/blog/post-1

Notes:
  - IndexNow limit: 10,000 URLs per request. Script chunks automatically.
  - Etiquette: only submit URLs that are new or recently changed. Don't
    re-submit the same content repeatedly — search engines may rate-limit.
  - A 200 or 202 response means accepted. 422 usually means a URL doesn't
    match the host, or the key file isn't reachable at keyLocation.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

from optimisation_engine.indexing.config import get_site_config

ENDPOINT = "https://api.indexnow.org/IndexNow"
CHUNK_SIZE = 10_000
_QUEUE_DIR = Path(__file__).parent


def _queue_file(site_key: str) -> Path:
    return _QUEUE_DIR / f".indexnow_queue_{site_key}.txt"


def enqueue(site_key: str, url: str) -> None:
    """Append a URL to the per-site queue. Called by content generators
    after a successful publish; URL is only pinged when --from-queue runs.
    """
    cfg = get_site_config(site_key)
    if not url.startswith(f"https://{cfg['host']}"):
        return
    queue_file = _queue_file(site_key)
    existing: set[str] = set()
    if queue_file.exists():
        with open(queue_file, encoding="utf-8") as f:
            existing = {line.strip() for line in f if line.strip()}
    if url in existing:
        return
    with open(queue_file, "a", encoding="utf-8") as f:
        f.write(url + "\n")


def load_queue(site_key: str) -> list[str]:
    queue_file = _queue_file(site_key)
    if not queue_file.exists():
        return []
    with open(queue_file, encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip() and not line.startswith("#")]


def clear_queue(site_key: str) -> None:
    queue_file = _queue_file(site_key)
    if queue_file.exists():
        os.remove(queue_file)


def submit_chunk(site_key: str, urls: list[str]) -> tuple[int, str]:
    cfg = get_site_config(site_key)
    host = cfg["host"]
    key = cfg["key"]
    body = json.dumps({
        "host": host,
        "key": key,
        "keyLocation": f"https://{host}/{key}.txt",
        "urlList": urls,
    }).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT,
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")


def load_sitemap_urls(site_key: str) -> list[str]:
    cfg = get_site_config(site_key)
    sitemap_url = f"https://{cfg['host']}/sitemap.xml"
    with urllib.request.urlopen(sitemap_url, timeout=30) as resp:
        xml = resp.read()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    root = ET.fromstring(xml)
    return [loc.text.strip() for loc in root.findall("sm:url/sm:loc", ns) if loc.text]


def load_urls_from_file(path: str) -> list[str]:
    with open(path, encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip() and not line.startswith("#")]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--site", required=True, help="Site key (e.g. dentists, property, generalist, agency)")
    parser.add_argument("urls", nargs="*", help="URLs to submit")
    parser.add_argument("--from-sitemap", action="store_true", help="Submit every URL in the live sitemap")
    parser.add_argument("--from-file", help="Read URLs (one per line) from a file")
    parser.add_argument("--from-queue", action="store_true", help="Drain the per-site queue (clears on success)")
    parser.add_argument("--enqueue", help="Append URL to the queue WITHOUT submitting (for generator scripts)")
    parser.add_argument("--dry-run", action="store_true", help="Print URLs but don't submit")
    args = parser.parse_args()

    cfg = get_site_config(args.site)
    host = cfg["host"]

    if args.enqueue:
        enqueue(args.site, args.enqueue)
        print(f"[{args.site}] Queued for next --from-queue run: {args.enqueue}")
        return 0

    urls: list[str] = []
    if args.from_sitemap:
        urls.extend(load_sitemap_urls(args.site))
    if args.from_file:
        urls.extend(load_urls_from_file(args.from_file))
    if args.from_queue:
        urls.extend(load_queue(args.site))
    urls.extend(args.urls)

    # Deduplicate while preserving order, and filter to host-matching URLs only.
    urls = [u for u in dict.fromkeys(urls) if u.startswith(f"https://{host}")]

    if not urls:
        print(f"[{args.site}] No valid URLs to submit (must start with https://{host})", file=sys.stderr)
        return 1

    print(f"[{args.site}] Prepared {len(urls)} URL(s) for IndexNow submission")
    if args.dry_run:
        for u in urls:
            print("  ", u)
        return 0

    for i in range(0, len(urls), CHUNK_SIZE):
        chunk = urls[i:i + CHUNK_SIZE]
        status, body = submit_chunk(args.site, chunk)
        print(f"[{args.site}] Chunk {i // CHUNK_SIZE + 1}: {len(chunk)} URLs -> HTTP {status}")
        if status not in (200, 202):
            print(f"  Response: {body[:500]}", file=sys.stderr)
            return 2

    if args.from_queue:
        clear_queue(args.site)
        print(f"[{args.site}] Queue cleared.")
    print(f"[{args.site}] Submission complete")
    return 0


if __name__ == "__main__":
    sys.exit(main())
