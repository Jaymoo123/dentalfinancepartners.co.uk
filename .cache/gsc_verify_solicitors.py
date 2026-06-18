"""One-off: verify accessible GSC properties + current solicitors sites row.

Guarded so it never triggers the interactive OAuth local-server flow:
only proceeds if secrets/gsc_token.pickle already exists.
"""
import os
import sys
import pickle

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
os.chdir(ROOT)

TOKEN = os.path.join(ROOT, "secrets", "gsc_token.pickle")
if not os.path.exists(TOKEN):
    print("NO_TOKEN: secrets/gsc_token.pickle missing; skipping live GSC listing.")
    sys.exit(0)

# Refresh the token offline (no browser) before building the service.
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

with open(TOKEN, "rb") as fh:
    creds = pickle.load(fh)

if not creds.valid:
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(TOKEN, "wb") as fh:
            pickle.dump(creds, fh)
    else:
        print("INVALID_CREDS_NO_REFRESH: cannot refresh without browser; skipping.")
        sys.exit(0)

svc = build("searchconsole", "v1", credentials=creds)
entries = svc.sites().list().execute().get("siteEntry", [])
print("ACCESSIBLE_GSC_PROPERTIES:")
for e in sorted(entries, key=lambda x: x.get("siteUrl", "")):
    print(f"  {e.get('permissionLevel'):<22} {e.get('siteUrl')}")

print("\nSOLICITORS_CANDIDATE_CHECK:")
urls = {e.get("siteUrl") for e in entries}
for cand in ("sc-domain:solicitoraccountants.co.uk",
             "sc-domain:accountsforlawyers.co.uk",
             "https://www.accountsforlawyers.co.uk/"):
    print(f"  owned={cand in urls!s:<5} {cand}")

# Current Supabase sites row for solicitors (+ dentists as the fixed reference)
print("\nSUPABASE_SITES_ROWS:")
try:
    from optimisation_engine.config import get_site
    for sk in ("solicitors", "dentists"):
        try:
            row = get_site(sk)
            print(f"  {sk}: gsc_property_url={row.get('gsc_property_url')!r} "
                  f"domain={row.get('domain') or row.get('production_domain')!r} active={row.get('active')!r}")
        except Exception as exc:
            print(f"  {sk}: ERROR {exc}")
except Exception as exc:
    print(f"  SUPABASE_ERROR: {exc}")
