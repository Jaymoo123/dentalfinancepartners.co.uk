"""Wave-2 topic bookkeeping: preview then mark consumed blog_topics rows used."""
import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REF = "dhlxwmvmkrfnmcgjbntk"
APPLY = "--apply" in sys.argv


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found")


def run_sql(sql: str) -> list:
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{REF}/database/query",
        data=json.dumps({"query": sql}).encode(), method="POST",
        headers={"Authorization": f"Bearer {load_env('SUPABASE_ACCESS_TOKEN')}",
                 "Content-Type": "application/json",
                 "User-Agent": "accounting-network-migrator/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())


# slug -> ILIKE patterns covering the intent (incl. same-intent variants)
PATTERNS = {
    "inside-ir35-take-home-explained": ["%inside ir35%take%home%", "%take%home%inside ir35%", "%how much%inside ir35%"],
    "outside-ir35-take-home-explained": ["%outside ir35%take%home%", "%take%home%outside ir35%"],
    "contractor-day-rate-to-take-home": ["%day rate%take%home%", "%take home%day rate%"],
    "how-to-use-cest-tool": ["%cest%"],
    "ir35-status-tests-explained": ["%ir35 status test%", "%ir35 test%", "%status test%ir35%"],
    "substitution-clause-ir35": ["%substitution%"],
    "mutuality-of-obligation-ir35": ["%mutuality%", "%moo%ir35%"],
    "fee-payer-liability-ir35": ["%fee payer%", "%fee-payer%"],
    "deemed-employment-payment-explained": ["%deemed employment%", "%deemed payment%"],
    "challenge-ir35-determination-sds": ["%challenge%ir35%", "%dispute%ir35%", "%disagree%sds%", "%appeal%ir35%"],
    "dividend-tax-rates-contractors-2026": ["%dividend tax%"],
    "corporation-tax-contractor-limited-company": ["%corporation tax%"],
    "contractor-self-assessment-guide": ["%self assessment%"],
    "vat-flat-rate-scheme-contractors": ["%flat rate%"],
    "contractor-vat-registration-guide": ["%vat registration%", "%register%vat%"],
    "contractor-pension-tax-relief": ["%pension tax relief%", "%pension relief%"],
    "contractor-pension-schemes-sipp": ["%sipp%", "%pension scheme%"],
    "msc-legislation-contractors": ["%msc%", "%managed service compan%"],
    "umbrella-company-explained": ["what is%umbrella%", "%umbrella company explained%", "%how%umbrella%work%"],
    "best-umbrella-company-how-to-choose": ["%best umbrella%", "%which umbrella%", "%choose%umbrella%", "%umbrella%best%"],
    "umbrella-company-deductions-explained": ["%umbrella%deduction%", "%umbrella%fee%", "%umbrella%cost%", "%umbrella%payslip%", "%umbrella%margin%"],
    "switching-umbrella-to-limited-company": ["%umbrella to limited%", "%umbrella%to%ltd%"],
    "mtd-income-tax-contractors-guide": ["%mtd%", "%making tax digital%"],
    "contractor-tax-planning-guide": ["%tax planning%", "%reduce%tax%contract%", "%contractor%tax%tips%"],
    "director-salary-dividend-split-guide": ["%salary%dividend%", "%dividend%salary%", "%director%salary%"],
    "what-is-a-contractor-accountant": ["%what is a contractor accountant%", "%contractor accountant do%", "%do i need%accountant%"],
    "set-up-limited-company-contractor": ["%set%up%limited company%", "%setting up%limited%", "%start%limited company%", "%form%limited company%"],
    "ir35-contract-review-checklist": ["%contract review%", "%review%contract%"],
    "first-contract-outside-ir35-checklist": ["%first contract%"],
    "closing-contractor-limited-company": ["%clos%company%", "%strike off%", "%mvl%", "%wind%up%compan%"],
    "home-office-expenses-contractor": ["%home office%", "%work from home%", "%working from home%"],
    "mileage-claims-contractor-limited-company": ["%mileage%", "%45p%", "%55p%"],
    "training-subscriptions-expenses-contractor": ["%training%expense%", "%subscription%", "%equipment%expense%"],
    "how-to-switch-contractor-accountant": ["%switch%accountant%", "%chang%accountant%"],
    "contractor-accountant-fees-cost": ["%accountant%cost%", "%accountant%fee%", "%how much%accountant%"],
}

total = 0
for slug, pats in PATTERNS.items():
    where = " OR ".join(f"topic ILIKE '{p}'" for p in pats)
    if APPLY:
        rows = run_sql(
            f"UPDATE blog_topics SET used=true, used_at=now(), slug='{slug}', status='published' "
            f"WHERE site_key='contractors-ir35' AND used=false AND ({where}) RETURNING topic")
        print(f"{slug}: marked {len(rows)}")
    else:
        rows = run_sql(
            f"SELECT topic FROM blog_topics WHERE site_key='contractors-ir35' AND used=false AND ({where})")
        print(f"{slug}: {len(rows)} rows")
        for r in rows[:6]:
            print(f"    {r['topic']}")
    total += len(rows)

print(f"\nTOTAL: {total}")
if APPLY:
    print(run_sql("SELECT count(*) FILTER (WHERE used) AS used, count(*) AS total FROM blog_topics WHERE site_key='contractors-ir35'"))
