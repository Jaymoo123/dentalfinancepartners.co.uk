#!/usr/bin/env python3
"""Copy charities' env vars onto wills-probate and divorce-finances.

Dry run by default (prints the plan, writes nothing). Pass --apply to
actually POST to Vercel. Site-specific secrets (ADMIN_DASHBOARD_KEY,
CRON_SECRET, LEAD_NURTURE_TOKEN_SECRET) are never copied -- generate fresh
values for those and set them by hand (or extend SITE_SPECIFIC below with
real values before running --apply).

ponytail: no library abstraction, no config file -- one script, one purpose.
"""
import argparse
import json
import os
import urllib.request

TEAM = "team_XF9WAygZX7SGk9Fo4tOAnihH"
SOURCE_PROJECT = "prj_ckcgp2JjoBzJ9ihNZfdacdgYUuEG"  # charities
TARGETS = {
    "wills-probate": "prj_oZhUm1ZKq3BeckaBtwpbjp5EBs2G",
    "divorce-finances": "prj_krGSMLVAWcrx6M8c6IlEyKtrgwqP",
}
SITE_DOMAINS = {
    "wills-probate": "https://www.estateplanningspecialists.co.uk",
    "divorce-finances": "https://www.divorcefinancespecialists.co.uk",
}
# Regenerate these per project -- never clone a per-site secret across projects.
NEVER_COPY = {"ADMIN_DASHBOARD_KEY", "CRON_SECRET", "LEAD_NURTURE_TOKEN_SECRET"}
# Derived per site instead of copied verbatim.
DERIVED = {"NEXT_PUBLIC_SITE_URL"}


def api(path, token, method="GET", body=None):
    url = f"https://api.vercel.com{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method,
                                  headers={"Authorization": f"Bearer {token}",
                                           "Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def fetch_source_envs(token):
    d = api(f"/v9/projects/{SOURCE_PROJECT}/env?teamId={TEAM}&decrypt=true", token)
    return d.get("envs", [])


def fetch_value(token, env_id):
    d = api(f"/v9/projects/{SOURCE_PROJECT}/env/{env_id}?teamId={TEAM}&decrypt=true", token)
    return d.get("value", "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Actually write to Vercel. Default: dry run.")
    args = ap.parse_args()

    token = os.environ.get("VERCEL_TOKEN")
    if not token:
        raise SystemExit("Set VERCEL_TOKEN in the environment (source .env first).")

    envs = fetch_source_envs(token)
    if not args.apply:
        print("DRY RUN -- no writes made. Pass --apply to create these on Vercel.\n")

    for site, project_id in TARGETS.items():
        print(f"{site} ({project_id}):")
        n_copy, n_skip = 0, 0
        for e in envs:
            key, typ, target = e["key"], e["type"], e["target"]
            if key in NEVER_COPY:
                print(f"  SKIP  {key:<30} (site-specific secret -- generate fresh, not copied)")
                n_skip += 1
                continue
            if key in DERIVED:
                value = SITE_DOMAINS[site]
                print(f"  DERIVE {key:<29} {typ:<10} {target}  -> {value}")
            else:
                value = None
                print(f"  COPY  {key:<30} {typ:<10} {target}")
            n_copy += 1
            if args.apply:
                if value is None:
                    if e["type"] == "sensitive":
                        # sensitive vars can't be read back -- must be re-supplied,
                        # never silently copied blind.
                        print(f"    -> REFUSED: {key} is sensitive-type, cannot read its "
                              f"value back from Vercel. Supply it manually.")
                        continue
                    value = fetch_value(token, e["id"])
                body = {"key": key, "value": value, "type": typ, "target": target}
                api(f"/v10/projects/{project_id}/env?teamId={TEAM}", token, "POST", body)
                print(f"    -> created")
        print(f"  {n_copy} to copy, {n_skip} skipped (generate fresh)\n")


if __name__ == "__main__":
    main()
