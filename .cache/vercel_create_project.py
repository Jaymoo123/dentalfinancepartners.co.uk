"""Create the contractor-finance-partners Vercel project + env vars (P7.1/7.2)."""
import json
import secrets
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SUPA_REF = "dhlxwmvmkrfnmcgjbntk"


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found")


TOKEN = load_env("VERCEL_TOKEN")
TEAM = load_env("VERCEL_ORG_ID")


def vapi(method: str, path: str, body: dict | None = None) -> dict:
    url = f"https://api.vercel.com{path}{'&' if '?' in path else '?'}teamId={TEAM}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        raise SystemExit(f"{method} {path} -> HTTP {e.code}: {e.read().decode()[:500]}")


def supa_service_role_key() -> str:
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{SUPA_REF}/api-keys?reveal=true",
        headers={"Authorization": f"Bearer {load_env('SUPABASE_ACCESS_TOKEN')}",
                 "User-Agent": "accounting-network-migrator/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        keys = json.loads(resp.read().decode())
    for k in keys:
        if k.get("name") == "service_role":
            return k["api_key"]
    raise SystemExit("service_role key not found")


# 1. Create project
proj = vapi("POST", "/v10/projects", {
    "name": "contractor-finance-partners",
    "framework": "nextjs",
    "rootDirectory": "contractors-ir35/web",
})
pid = proj["id"]
print(f"PROJECT CREATED: {pid} name={proj['name']} framework={proj.get('framework')} rootDirectory={proj.get('rootDirectory')}")

# 2. Env vars (production + preview)
admin_key = secrets.token_hex(24)
site_url = "https://contractor-finance-partners.vercel.app"
env_items = [
    {"key": "NEXT_PUBLIC_SUPABASE_URL", "value": load_env("NEXT_PUBLIC_SUPABASE_URL"), "type": "plain"},
    {"key": "NEXT_PUBLIC_SUPABASE_ANON_KEY", "value": load_env("NEXT_PUBLIC_SUPABASE_ANON_KEY"), "type": "plain"},
    {"key": "SUPABASE_SERVICE_ROLE_KEY", "value": supa_service_role_key(), "type": "sensitive"},
    {"key": "ADMIN_DASHBOARD_KEY", "value": admin_key, "type": "sensitive"},
    {"key": "NEXT_PUBLIC_SITE_URL", "value": site_url, "type": "plain"},
]
for item in env_items:
    vapi("POST", f"/v10/projects/{pid}/env?upsert=true", {
        **item, "target": ["production", "preview"]})
    print(f"ENV SET: {item['key']} ({item['type']})")

# 3. Persist link file
link_dir = ROOT / "contractors-ir35" / "web" / ".vercel"
link_dir.mkdir(exist_ok=True)
(link_dir / "project.json").write_text(json.dumps({
    "projectId": pid, "orgId": TEAM, "projectName": "contractor-finance-partners"},
    indent=2), encoding="utf-8")
print("LINK FILE WRITTEN: contractors-ir35/web/.vercel/project.json")
print(f"\nADMIN_DASHBOARD_KEY (give to user): {admin_key}")
print(f"PROD URL: {site_url}")
