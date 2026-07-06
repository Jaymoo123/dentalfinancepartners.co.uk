"""GSC sitemap submission + status check for medicalaccounts.co.uk.

Uses the SAME OAuth client and token as optimisation_engine/snapshot (secrets/ga4_oauth_client.json
/ secrets/snapshot_token.json).  The existing token has webmasters.readonly scope.

Behaviour:
  - sitemaps().submit() requires the non-readonly 'webmasters' scope.  If the current
    token is readonly-only, the submit call will return HTTP 403 (insufficientPermissions).
    In that case the script records the exact error and prints the owner fallback URL.
  - sitemaps().list() works fine with webmasters.readonly and is always attempted so we
    can report lastDownloaded / isPending without needing user intervention.

To upgrade to write access (one-time, owner only):
  1. Delete secrets/snapshot_token.json
  2. Re-run optimisation_engine/snapshot auth with SCOPES updated to include
     'https://www.googleapis.com/auth/webmasters' (drop readonly) — consent prompt
     will open in browser.
  OR simply use the GSC UI: Search Console -> medicalaccounts.co.uk -> Sitemaps -> Submit.

Usage:
    python scripts/medical/gsc_sitemap_submit.py
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

SC_DOMAIN = "sc-domain:medicalaccounts.co.uk"
SC_URL_PREFIX = "https://www.medicalaccounts.co.uk/"
SITEMAP_URL = "https://www.medicalaccounts.co.uk/sitemap.xml"

GSC_UI_URL = (
    "https://search.google.com/search-console/sitemaps"
    "?resource_id=sc-domain%3Amedicalaccounts.co.uk"
)


def main() -> int:
    # Reuse the snapshot auth which already has a valid, refreshed token.
    from optimisation_engine.snapshot.auth import get_credentials
    from googleapiclient.discovery import build

    try:
        creds = get_credentials()
    except Exception as exc:
        print(f"[ERROR] OAuth: {exc}", file=sys.stderr)
        return 1

    service = build("searchconsole", "v1", credentials=creds)

    # --- List all verified properties for diagnostics ---
    try:
        sites_resp = service.sites().list().execute()
        site_entries = sites_resp.get("siteEntry", [])
        print(f"\nVerified GSC properties ({len(site_entries)}):")
        for s in site_entries:
            print(f"  {s.get('siteUrl', '?')}  permissionLevel={s.get('permissionLevel', '?')}")
    except Exception as exc:
        print(f"[warn] Could not list GSC sites: {exc}")
        site_entries = []

    # --- Attempt submit via sc-domain ---
    submit_ok = False
    submit_error = ""
    print(f"\n[1] sitemaps().submit() -> siteUrl={SC_DOMAIN!r}, feedpath={SITEMAP_URL!r}")
    try:
        service.sitemaps().submit(siteUrl=SC_DOMAIN, feedpath=SITEMAP_URL).execute()
        print("    OK: sitemap submitted successfully.")
        submit_ok = True
        active_site_url = SC_DOMAIN
    except Exception as exc:
        submit_error = str(exc)
        print(f"    FAIL (sc-domain): {submit_error[:300]}")

        # Retry with URL-prefix property if sc-domain rejected
        print(f"\n[2] Retry with URL-prefix: {SC_URL_PREFIX!r}")
        try:
            service.sitemaps().submit(siteUrl=SC_URL_PREFIX, feedpath=SITEMAP_URL).execute()
            print("    OK: submitted via URL-prefix property.")
            submit_ok = True
            active_site_url = SC_URL_PREFIX
        except Exception as exc2:
            submit_error = str(exc2)
            print(f"    FAIL (url-prefix): {submit_error[:300]}")
            active_site_url = SC_DOMAIN
            print(
                f"\n    [!] Both submit attempts failed. Likely cause: snapshot_token.json "
                f"has webmasters.readonly scope only (insufficient for submit).\n"
                f"    Owner fallback (30 seconds): {GSC_UI_URL}"
            )

    # --- sitemaps().list() (always works with webmasters.readonly) ---
    print(f"\n[3] sitemaps().list() for {active_site_url!r}:")
    sitemaps = []
    try:
        resp = service.sitemaps().list(siteUrl=active_site_url).execute()
        sitemaps = resp.get("sitemap", [])
    except Exception as exc:
        print(f"    [warn] list failed for {active_site_url}: {exc}")
        if active_site_url != SC_URL_PREFIX:
            try:
                resp2 = service.sitemaps().list(siteUrl=SC_URL_PREFIX).execute()
                sitemaps = resp2.get("sitemap", [])
                print(f"    (fell back to URL-prefix list)")
            except Exception:
                pass

    if sitemaps:
        for sm in sitemaps:
            path = sm.get("path", "?")
            last_dl = sm.get("lastDownloaded", "(never downloaded)")
            is_pending = sm.get("isPending", False)
            errors = sm.get("errors", 0)
            warnings = sm.get("warnings", 0)
            print(f"  {path}")
            print(f"    lastDownloaded={last_dl}")
            print(f"    isPending={is_pending}  errors={errors}  warnings={warnings}")
    else:
        print("  (no sitemaps listed — may be a new property or sitemap not yet added in GSC)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
