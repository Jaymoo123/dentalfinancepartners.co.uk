"""Onboarding infra check for solicitors (read-only). Run from repo root."""
import json
import os
import sys

ROOT = r"C:\Users\user\Documents\Accounting"
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

# 1. Validate sites/solicitors.json paths
print("=== sites/solicitors.json path validation ===")
cfg = json.load(open(os.path.join(ROOT, "sites", "solicitors.json"), encoding="utf-8"))
missing = []
for key, rel in cfg["paths"].items():
    if key in ("repoRoot", "worktreeBase", "worktreePattern", "branchPattern"):
        continue
    p = os.path.join(ROOT, rel.replace("/", os.sep))
    exists = os.path.exists(p)
    # docs/solicitors + topicPool + briefs may not exist yet (we create them)
    flag = "OK " if exists else "-- "
    print(f"  {flag}{key:18s} {rel}")
    if not exists and key in ("blogContentDir", "blogRoutesDir", "buildDir", "siteConfigJson"):
        missing.append(rel)
vj = os.path.join(ROOT, cfg["vercel"]["projectJson"].replace("/", os.sep))
print(f"  {'OK ' if os.path.exists(vj) else '-- '}vercel.projectJson {cfg['vercel']['projectJson']}")
print(f"  CRITICAL MISSING: {missing if missing else 'none'}")

# 2. Env token presence (booleans only, no secrets)
print("\n=== env tokens (presence only) ===")
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass
for k in ("SUPABASE_URL", "SUPABASE_KEY", "SUPABASE_ACCESS_TOKEN", "ANTHROPIC_API_KEY"):
    print(f"  {k:24s} {'present' if os.getenv(k) else 'MISSING'}")

# 3. sites table row for solicitors
print("\n=== public.sites row: solicitors ===")
try:
    from optimisation_engine.config import get_site
    row = get_site("solicitors")
    for k in ("site_key", "domain", "gsc_property_url", "niche", "active"):
        print(f"  {k:18s} {row.get(k)}")
except Exception as exc:
    print(f"  [ERROR] {exc}")

# 4. GSC accessible properties (which one actually resolves)
print("\n=== GSC accessible properties ===")
try:
    from agents.utils.gsc_client_oauth import GSCClient
    gsc = GSCClient()
    resp = gsc.service.sites().list().execute()
    for s in resp.get("siteEntry", []):
        url = s.get("siteUrl", "")
        if any(t in url.lower() for t in ("solicitor", "accountsforlawyers", "lawyer")):
            print(f"  >> {url}   perm={s.get('permissionLevel')}")
    print("  -- all properties --")
    for s in resp.get("siteEntry", []):
        print(f"     {s.get('siteUrl')}   perm={s.get('permissionLevel')}")
except Exception as exc:
    print(f"  [ERROR] {exc}")
