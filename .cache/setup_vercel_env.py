"""Set the 5 env vars on contractor-finance-partners via the CLI (stored auth)."""
import json
import secrets
import subprocess
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CWD = str(ROOT / "contractors-ir35" / "web")
SUPA_REF = "dhlxwmvmkrfnmcgjbntk"


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found")


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


def env_add(key: str, value: str, target: str = "production") -> None:
    for attempt in range(2):
        p = subprocess.run(
            ["vercel", "env", "add", key, target, "--cwd", CWD, "--force"],
            input=value, text=True, capture_output=True, shell=True if False else False,
        )
        if p.returncode == 0:
            print(f"ENV SET: {key} ({target})")
            return
    print(f"ENV FAIL: {key}: {p.stderr[-300:]}")
    raise SystemExit(1)


admin_key = secrets.token_hex(24)
pairs = [
    ("NEXT_PUBLIC_SUPABASE_URL", load_env("NEXT_PUBLIC_SUPABASE_URL")),
    ("NEXT_PUBLIC_SUPABASE_ANON_KEY", load_env("NEXT_PUBLIC_SUPABASE_ANON_KEY")),
    ("SUPABASE_SERVICE_ROLE_KEY", supa_service_role_key()),
    ("ADMIN_DASHBOARD_KEY", admin_key),
    ("NEXT_PUBLIC_SITE_URL", "https://contractor-finance-partners.vercel.app"),
]
import shutil
vercel = shutil.which("vercel") or shutil.which("vercel.cmd")
for key, value in pairs:
    p = subprocess.run([vercel, "env", "add", key, "production", "--cwd", CWD, "--force"],
                       input=value, text=True, capture_output=True)
    if p.returncode != 0:
        print(f"ENV FAIL {key}: {(p.stderr or p.stdout)[-400:]}")
        raise SystemExit(1)
    print(f"ENV SET: {key}")

(ROOT / ".cache" / "cfp_admin_key.txt").write_text(admin_key, encoding="utf-8")
print(f"\nADMIN_DASHBOARD_KEY written to .cache/cfp_admin_key.txt (hand to user, then delete)")
