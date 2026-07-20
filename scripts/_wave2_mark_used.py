# ponytail: one-off wave-2 matcher; explicit-id updates only
import sys, json, re
sys.path.insert(0, "scripts")
from _q import run

BRIEFS = {
 "charities": ["annual-report-vs-annual-return","best-charity-bank-accounts","business-donations-to-charity-tax","charity-structures-which-to-choose","cic-funding-and-grants","hmrc-recognition-vs-charity-registration","independent-examiners-report-template","orcic-cic-regulator-explained","register-a-charity-step-by-step"],
 "hospitality": ["bookkeeper-for-restaurant","epos-reconciliation-hospitality","hospitality-consultant-vs-accountant","hotel-finance-revenue-management","vat-rates-soft-drinks-and-food"],
 "care": ["care-worker-pay-rates-2026-27","cqc-consultant-vs-accountant-registration-support","cqc-fee-calculator","cqc-registered-manager-money-and-paperwork","cqc-registration-costs-and-finance-guide","cqc-registration-requirements-financial-viability-leg","cqc-registration-timeline-cash-burn-before-trading"],
 "startups-tech": ["eis3-certificate-explained","emi-annual-return-ers-walkthrough","saas-revenue-recognition-uk-guide","startup-cfo-pay-and-fractional-cfo-cost","stock-vesting-explained","uk-startup-grants-landscape","val231-emi-valuation-form-walkthrough","what-is-an-emi-scheme","what-is-emi"],
 "crypto": ["can-hmrc-track-crypto-wallets","crypto-backed-loans-collateral-disposals","crypto-isa-etn-uk-tax","hmrc-crypto-crackdown-2026","how-crypto-is-taxed-uk","legitimate-ways-reduce-crypto-cgt-uk","when-do-i-pay-tax-on-crypto-uk"],
 "pharmacies": ["cost-of-buying-a-pharmacy-investment","how-do-pharmacies-make-money","locum-pharmacist-expenses-self-assessment","pharmacy-business-loans-finance-mechanics","pharmacy-exit-planning-timeline","pharmacy-financial-due-diligence","reading-a-pharmacy-sale-listing"],
 "ecommerce": ["ebay-tax-rules-uk","etsy-fees-vat-and-tax","is-it-worth-selling-on-amazon-uk","print-on-demand-tax-uk","side-hustle-tax-checker"],
}
STOP = {"uk","a","the","and","vs","of","to","for","in","on","is","it","i","do","an","my","which","what","how","when"}
def toks(s):
    return set(re.split(r"[^a-z0-9]+", (s or "").lower())) - STOP - {""}

for site, slugs in BRIEFS.items():
    rows = run(f"SELECT id, primary_keyword, topic, slug, suggested_slug, generated_slug, used FROM blog_topics WHERE site_key='{site}'")
    print(f"\n=== {site} ({len(rows)} rows)")
    for bs in slugs:
        bt = toks(bs)
        best = []
        for r in rows:
            rt = toks(r["primary_keyword"]) | toks(r["topic"]) | toks(r["slug"]) | toks(r["suggested_slug"]) | toks(r["generated_slug"])
            inter = len(bt & rt)
            score = inter / len(bt) if bt else 0
            if score >= 0.6:
                best.append((score, inter, r))
        best.sort(key=lambda x: (-x[0], -x[1]))
        if not best:
            print(f"  {bs}  -> NO MATCH")
        else:
            for score, _, r in best[:3]:
                print(f"  {bs}  -> {score:.2f} id={r['id']} kw={r['primary_keyword']!r} topic={r['topic']!r} used={r['used']}")
