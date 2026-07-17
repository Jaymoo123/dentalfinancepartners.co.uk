"""B0 presence defect 2 prep: apex->www redirect 307 -> 308 on Vercel domain config.

Dry-run by default: prints each project's domains with redirect + redirectStatusCode.
--apply PATCHes redirectStatusCode=308 on apex domains that redirect to www.
PROD CHANGE - run --apply only on owner word.
"""
import argparse, json, os, sys, urllib.request

TEAM = "team_XF9WAygZX7SGk9Fo4tOAnihH"
PROJECTS = {
    "solicitors": "prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9",
    "medical": "prj_50vByZ3rqXQQwCUeENUTBbNBB41n",
    "generalist": "prj_rMK56yY2qcCPTObgwkQjVXQl8yl3",
    "agency": "prj_roTeeTjzABAR7D649dTkq2ta4rQi",
    "property": "prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU",
    "dentists": "prj_f3tGDR4zozATcYOSLMmCqO2ZInNV",
}


def token():
    t = os.environ.get("VERCEL_TOKEN", "")
    if len(t) <= 20:
        env = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
        for line in open(env, encoding="utf-8"):
            if line.strip().startswith("VERCEL_TOKEN="):
                t = line.split("=", 1)[1].strip().strip('"')
    if len(t) > 20:
        return t
    p = os.path.join(os.environ["APPDATA"], "com.vercel.cli", "Data", "auth.json")
    return json.load(open(p))["token"]


def req(method, url, tok, body=None):
    r = urllib.request.Request(url, method=method, headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
                               data=json.dumps(body).encode() if body else None)
    return json.load(urllib.request.urlopen(r))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()
    tok = token()
    for site, pid in PROJECTS.items():
        doms = req("GET", f"https://api.vercel.com/v9/projects/{pid}/domains?teamId={TEAM}", tok).get("domains", [])
        for d in doms:
            name, redir, code = d["name"], d.get("redirect"), d.get("redirectStatusCode")
            print(f"{site:11} {name:40} redirect={redir} status={code}")
            if args.apply and redir and code != 308:
                out = req("PATCH", f"https://api.vercel.com/v9/projects/{pid}/domains/{name}?teamId={TEAM}", tok,
                          {"redirect": redir, "redirectStatusCode": 308})
                print(f"  -> PATCHED to 308: {out.get('redirectStatusCode')}")


if __name__ == "__main__":
    main()
