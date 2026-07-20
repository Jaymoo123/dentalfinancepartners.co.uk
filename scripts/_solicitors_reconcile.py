"""
Solicitors blog_topics coverage reconciliation.
Matches unused topics against on-disk content inventory (Solicitors/web/content/blog etc.)
and flips used=true where a live page directly serves the keyword.
Run: python scripts/_solicitors_reconcile.py [--dry-run]
Re-runnable: already-flipped rows drop out of the used=false select.
"""
import os, re, sys
from pathlib import Path

import httpx
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env")
TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN")
URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"
DRY = "--dry-run" in sys.argv
BLOG_DIR = ROOT / "Solicitors" / "web" / "content" / "blog"


def run(q):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}"}, json={"query": q}, timeout=120)
    r.raise_for_status()
    return r.json()


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


slugs = {p.stem for p in BLOG_DIR.glob("*.md")}

# Manual map for keywords whose covering slug isn't a mechanical match.
# Verified by hand against content/blog + core pages 2026-07-14.
MANUAL = {
    "accountant for solicitors": "core/homepage",
    "solicitor accountant": "blog/solicitor-accountant",
    "law firm accountant": "core/homepage",
    "best accountant for solicitors": "blog/solicitor-accountant",
    "what does a solicitor accountant do": "blog/solicitor-accountant",
    "how to find a solicitor accountant": "blog/solicitor-accountant",
    "solicitor self assessment": "blog/solicitor-self-assessment-uk-tax-guide",
    "solicitor tax return": "blog/solicitor-self-assessment-uk-tax-guide",
    "sra accounts rules compliance": "blog/sra-accounts-rules-compliance-guide",
    "sole practitioner solicitor tax": "blog/sole-practitioner-solicitor-tax-guide",
    "sole practitioner tax deductions": "blog/sole-practitioner-solicitor-tax-guide",
    "law firm partnership tax": "blog/law-firm-partnership-tax-guide",
    "law firm valuation": "blog/law-firm-valuation-guide-uk-solicitors",
    "solicitor practice valuation": "blog/law-firm-valuation-guide-uk-solicitors",
    "solicitor expenses claims": "blog/solicitor-expenses-claims-tax-relief-guide",
    "solicitor allowable expenses": "blog/solicitor-expenses-claims-tax-relief-guide",
    "solicitor professional fees tax": "blog/solicitor-expenses-claims-tax-relief-guide",
    "law firm accounting software": "blog/law-firm-accounting-software-guide-uk-solicitors",
    "solicitor trust accounting": "blog/solicitor-trust-accounting-guide",
    "solicitor practice sale": "blog/solicitor-practice-sale-guide",
    "solicitor practice exit strategy": "blog/solicitor-practice-sale-guide",
    "llp conversion tax": "blog/llp-conversion-tax-guide-uk-law-firms",
    "solicitor partnership accounting": "blog/solicitor-partnership-accounting-guide",
    "solicitor vat accounting": "blog/solicitor-vat-accounting-guide",
    "disbursements vat treatment": "blog/disbursements-vat-treatment-uk-law-firms",
    "mtd for income tax solicitors": "blog/making-tax-digital-solicitors",
    "law firm bookkeeping services": "blog/law-firm-accounting-services",
    "law firm succession planning": "blog/law-firm-succession-planning-guide-uk",
    "counsel fees vat": "blog/counsel-fees-vat-guide-uk-law-firms",
    "llp member taxation": "blog/llp-member-taxation-guide-uk-law-firms",
    "partner profit allocation": "blog/partner-profit-allocation-uk-law-firms",
    "partner retirement planning": "blog/partner-retirement-planning-guide-uk-law-firms",
    "leap accounting integration": "blog/leap-accounting-integration-guide",
    "law firm cash flow forecasting": "blog/uk-law-firm-cash-flow-management",
}


def covered_by(kw):
    kw_l = kw.lower().strip()
    if kw_l in MANUAL:
        return MANUAL[kw_l]
    s = slugify(kw_l)
    if s in slugs:
        return f"blog/{s}"
    # exact-prefix match: slug = keyword-slug + trailing qualifier(s)
    for slug in slugs:
        if slug == s or slug.startswith(s + "-"):
            return f"blog/{slug}"
    return None


rows = run(
    "SELECT id, coalesce(primary_keyword, topic) AS kw, search_volume "
    "FROM blog_topics WHERE site_key='solicitors' AND used=false"
)

to_flip, remaining = [], []
for row in rows:
    dest = covered_by(row["kw"])
    (to_flip if dest else remaining).append((row["id"], row["kw"], row["search_volume"] or 0, dest))

print(f"Pool (unused): {len(rows)}")
print(f"To flip:       {len(to_flip)}")
print(f"Remaining:     {len(remaining)}")

if DRY:
    print("\n[DRY RUN] would flip:")
    for id_, kw, vol, dest in sorted(to_flip, key=lambda x: -x[2]):
        print(f"  vol={vol:5d}  {kw!r} -> {dest}")
else:
    if to_flip:
        ids = ", ".join(f"'{t[0]}'" for t in to_flip)
        res = run(
            "UPDATE blog_topics SET used=true, "
            "notes=COALESCE(notes,'')||' coverage-reconcile-2026-07-14' "
            f"WHERE id IN ({ids}) AND site_key='solicitors'"
        )
        print(f"\nUPDATE result: {res}")

print("\nTop 20 verified-unwritten by search_volume:")
for _, kw, vol, _ in sorted(remaining, key=lambda x: -x[2])[:20]:
    print(f"  vol={vol:5d}  {kw!r}")
print(f"\nRemaining with volume>0: {sum(1 for r in remaining if r[2] > 0)}")
