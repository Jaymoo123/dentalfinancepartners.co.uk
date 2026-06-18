import json, urllib.request, urllib.error, re, sys

ROOT = "C:/Users/user/Documents/Accounting"

env = {}
with open(f"{ROOT}/.env", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")

token = env.get("SUPABASE_ACCESS_TOKEN")
url = env.get("SUPABASE_URL", "")
m = re.search(r"https?://([a-z0-9]+)\.supabase\.co", url)
if not token or not m:
    print("MISSING token or could not parse ref from SUPABASE_URL")
    sys.exit(1)
ref = m.group(1)
print("Project ref:", ref)


def run(sql, label):
    body = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{ref}/database/query",
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "ptp-deploy/1.0 (+migration runner)",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            print(f"[{label}] HTTP {r.status}")
            print(r.read().decode("utf-8")[:600])
            return True
    except urllib.error.HTTPError as e:
        print(f"[{label}] HTTP {e.code}")
        print(e.read().decode("utf-8")[:1200])
        return False


with open(f"{ROOT}/supabase/migrations/20260607000001_calc_gate_placement_views.sql", encoding="utf-8") as f:
    sql = f.read()

ok = run(sql, "apply migration")
if ok:
    run(
        "select table_name from information_schema.views "
        "where table_name in ('vw_calculator_conversion_placement','vw_resource_conversion') "
        "order by table_name;",
        "verify views exist",
    )
