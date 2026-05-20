"""Phase 1 closeout: add medical + solicitors to sites table.

The sites table is the source-of-truth registry. Phase 1 audit found 4 of
6 sites already registered; this script adds the 2 missing rows so all
six are queryable from a single place.

Idempotent — safe to re-run.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from shared_supabase_config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

import requests  # noqa: E402

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation,resolution=merge-duplicates",
}

NEW_SITES = [
    {
        "site_key": "medical",
        "display_name": "Medical Accountants UK",
        "domain": "www.medicalaccounts.co.uk",
        "gsc_property_url": "sc-domain:medicalaccounts.co.uk",
        "niche": "medical",
        "target_buyer_persona": "UK GPs, consultants, locum doctors, private practice owners",
        "content_dir": "Medical/web/content/blog",
        "git_repo_path": "Medical/web",
        "blog_topics_table": "blog_topics_medical",
        "active": True,
    },
    {
        "site_key": "solicitors",
        "display_name": "Accounts For Lawyers",
        "domain": "www.accountsforlawyers.co.uk",
        "gsc_property_url": "sc-domain:accountsforlawyers.co.uk",
        "niche": "solicitors",
        "target_buyer_persona": "UK partners, associate solicitors, LLP firms, sole-practitioner lawyers",
        "content_dir": "Solicitors/web/content/blog",
        "git_repo_path": "Solicitors/web",
        "blog_topics_table": "blog_topics_solicitors",
        "active": True,
    },
]


def main() -> None:
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/sites"

    print(f"Posting {len(NEW_SITES)} rows to {url}...")
    r = requests.post(url, headers=HEADERS, json=NEW_SITES, timeout=15)

    if r.status_code in (200, 201, 204):
        print("[OK] Insert succeeded")
        if r.text:
            data = r.json()
            for row in data:
                print(f"  - {row.get('site_key')}: {row.get('display_name')}")
    else:
        print(f"[FAIL] status={r.status_code}")
        print(f"  body: {r.text[:600]}")
        sys.exit(1)

    # Verify
    print("\nVerifying full sites table:")
    r = requests.get(f"{url}?select=site_key,display_name,domain,active&order=site_key", headers=HEADERS, timeout=10)
    if r.status_code == 200:
        for row in r.json():
            print(f"  - {row.get('site_key')}: {row.get('display_name')} @ {row.get('domain')} (active={row.get('active')})")


if __name__ == "__main__":
    main()
