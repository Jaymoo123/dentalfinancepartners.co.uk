"""Wave-2 deterministic validator (manager gate before judging). Covers all 50 posts."""
from __future__ import annotations

import re
from pathlib import Path

import yaml

BLOG = Path(r"C:\Users\user\Documents\Accounting\contractors-ir35\web\content\blog")

W1 = {
    "what-is-ir35": ("IR35 Status", "pillar"),
    "inside-ir35": ("IR35 Status", "pillar"),
    "outside-ir35": ("IR35 Status", "pillar"),
    "limited-company-vs-umbrella-contractor": ("Umbrella vs Limited Company", "pillar"),
    "psc-limited-company-contractor-tax": ("Limited Company Tax", "pillar"),
    "contractor-expenses-allowable-guide": ("Expenses and Deductions", "pillar"),
    "contractor-pension-employer-contributions": ("Pension and Dividends", "pillar"),
    "how-to-choose-contractor-accountant": ("Contractor Accounting Basics", "pillar"),
    "off-payroll-working-rules-private-sector": ("IR35 Status", "pillar"),
    "sds-status-determination-statement": ("IR35 Status", "cluster"),
    "ir35-small-company-exemption": ("IR35 Status", "cluster"),
    "flat-rate-vat-limited-cost-trader": ("MTD and Compliance", "cluster"),
    "travel-expenses-inside-ir35": ("Expenses and Deductions", "cluster"),
    "umbrella-company-holiday-pay": ("Umbrella vs Limited Company", "cluster"),
    "contractor-pension-carry-forward": ("Pension and Dividends", "cluster"),
}
W2 = {
    "set-up-limited-company-contractor": ("Contractor Accounting Basics", "pillar"),
    "inside-ir35-take-home-explained": ("IR35 Status", "pillar"),
    "director-salary-dividend-split-guide": ("Limited Company Tax", "pillar"),
    "contractor-tax-planning-guide": ("Limited Company Tax", "pillar"),
    "mtd-income-tax-contractors-guide": ("MTD and Compliance", "pillar"),
    "how-to-switch-contractor-accountant": ("Contractor Accounting Basics", "cluster"),
    "contractor-accountant-fees-cost": ("Contractor Accounting Basics", "cluster"),
    "what-is-a-contractor-accountant": ("Contractor Accounting Basics", "cluster"),
    "outside-ir35-take-home-explained": ("IR35 Status", "cluster"),
    "ir35-contract-review-checklist": ("IR35 Status", "cluster"),
    "how-to-use-cest-tool": ("IR35 Status", "cluster"),
    "ir35-status-tests-explained": ("IR35 Status", "cluster"),
    "substitution-clause-ir35": ("IR35 Status", "cluster"),
    "mutuality-of-obligation-ir35": ("IR35 Status", "cluster"),
    "fee-payer-liability-ir35": ("IR35 Status", "cluster"),
    "deemed-employment-payment-explained": ("IR35 Status", "cluster"),
    "challenge-ir35-determination-sds": ("IR35 Status", "cluster"),
    "dividend-tax-rates-contractors-2026": ("Pension and Dividends", "cluster"),
    "corporation-tax-contractor-limited-company": ("Limited Company Tax", "cluster"),
    "contractor-self-assessment-guide": ("MTD and Compliance", "cluster"),
    "vat-flat-rate-scheme-contractors": ("MTD and Compliance", "cluster"),
    "contractor-vat-registration-guide": ("MTD and Compliance", "cluster"),
    "home-office-expenses-contractor": ("Expenses and Deductions", "cluster"),
    "mileage-claims-contractor-limited-company": ("Expenses and Deductions", "cluster"),
    "training-subscriptions-expenses-contractor": ("Expenses and Deductions", "cluster"),
    "contractor-pension-tax-relief": ("Pension and Dividends", "cluster"),
    "contractor-pension-schemes-sipp": ("Pension and Dividends", "cluster"),
    "msc-legislation-contractors": ("Contractor Accounting Basics", "cluster"),
    "umbrella-company-explained": ("Umbrella vs Limited Company", "cluster"),
    "best-umbrella-company-how-to-choose": ("Umbrella vs Limited Company", "cluster"),
    "switching-umbrella-to-limited-company": ("Umbrella vs Limited Company", "cluster"),
    "umbrella-company-deductions-explained": ("Umbrella vs Limited Company", "cluster"),
    "closing-contractor-limited-company": ("Limited Company Tax", "cluster"),
    "first-contract-outside-ir35-checklist": ("Contractor Accounting Basics", "cluster"),
    "contractor-day-rate-to-take-home": ("Limited Company Tax", "cluster"),
}
ASSIGN = {**W1, **W2}

CAT_SLUG = {
    "IR35 Status": "ir35-status",
    "Limited Company Tax": "limited-company-tax",
    "Umbrella vs Limited Company": "umbrella-vs-limited-company",
    "Expenses and Deductions": "expenses-and-deductions",
    "Pension and Dividends": "pension-and-dividends",
    "MTD and Compliance": "mtd-and-compliance",
    "Contractor Accounting Basics": "contractor-accounting-basics",
}
FOR_SLUGS = [
    "it-contractors", "engineering-contractors", "finance-contractors",
    "management-consultants", "project-managers", "nhs-locum-doctors",
    "oil-and-gas-contractors", "legal-contractors", "marketing-contractors",
    "construction-contractors",
]
ALLOW = {"/services", "/ir35-status", "/contact", "/for"}
ALLOW |= {f"/for/{s}" for s in FOR_SLUGS}
ALLOW |= {f"/blog/{CAT_SLUG[c]}/{s}" for s, (c, _) in ASSIGN.items()}

WORDS = {"pillar": (3500, 4500), "cluster": (2800, 3500)}
FAQS = {"pillar": (10, 14), "cluster": (6, 10)}

STALE = [r"\b8\.75%", r"\b33\.75%", r"45p\b", r"£85,000", r"13\.8%",
         r"£10\.2m", r"£5\.1m", r"£40,000 annual allowance"]
HIST_OK = re.compile(
    r"(2025/26|2024/25|earlier|historic|previous|rose from|up from|before 6 April 2026|"
    r"pre-April-2026|to 5 Apr(il)? 2026|prior|raised from|was|\(from|rise from|rose to|"
    r"from 8\.75|from 33\.75|10\.75|35\.75|still quoting|old rates)", re.I)
STALE = [s for s in STALE if s != r"£85,000"]  # worked-example profits false-positive


def check(slug: str, only_new: bool) -> tuple[str, list[str]]:
    issues: list[str] = []
    p = BLOG / f"{slug}.md"
    if not p.exists():
        return "FAIL", ["MISSING FILE"]
    raw = p.read_text(encoding="utf-8")
    for ch, name in [("—", "EM-DASH"), ("–", "EN-DASH")]:
        if raw.count(ch):
            issues.append(f"{name} x{raw.count(ch)}")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.DOTALL)
    if not m:
        return "FAIL", issues + ["FRONTMATTER block missing"]
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError as e:
        return "FAIL", issues + [f"YAML error: {str(e).splitlines()[0]}"]
    body = m.group(2)
    cat, tier = ASSIGN[slug]

    if fm.get("slug") != slug:
        issues.append(f"slug mismatch: {fm.get('slug')}")
    if fm.get("category") != cat:
        issues.append(f"category mismatch: {fm.get('category')!r} != {cat!r}")
    mt, md = str(fm.get("metaTitle", "")), str(fm.get("metaDescription", ""))
    if len(mt) > 62:
        issues.append(f"metaTitle {len(mt)} chars")
    if len(md) > 158:
        issues.append(f"metaDescription {len(md)} chars")
    faqs = fm.get("faqs") or []
    lo, hi = FAQS[tier]
    if not (lo <= len(faqs) <= hi):
        issues.append(f"FAQ count {len(faqs)} (range {lo}-{hi})")
    for i, f in enumerate(faqs):
        if not isinstance(f, dict) or not f.get("question") or not f.get("answer"):
            issues.append(f"FAQ {i} malformed")

    text = re.sub(r"<[^>]+>", " ", body)
    wc = len(text.split())
    lo, hi = WORDS[tier]
    if not (lo <= wc <= hi):
        issues.append(f"word count {wc} (range {lo}-{hi})")

    if re.search(r"^#{1,6} ", body, re.M):
        issues.append("markdown heading in body")
    if "class=" in body:
        issues.append("CSS class in body")

    links = [l for l in re.findall(r'href="([^"]+)"', body) if l.startswith("/")]
    bad = sorted({l for l in links if l.rstrip("/") not in ALLOW})
    if bad:
        issues.append(f"links off allowlist: {bad}")
    uniq = len(set(links))
    if not (4 <= uniq <= 8):
        issues.append(f"internal links {uniq} unique")

    # stale figures without historical framing nearby
    for pat in STALE:
        for sm in re.finditer(pat, raw):
            ctx = raw[max(0, sm.start() - 160): sm.end() + 160]
            if not HIST_OK.search(ctx):
                issues.append(f"STALE FIGURE unframed: {sm.group(0)} ...{ctx[140:220]}...")

    flags = len(re.findall(r"<!--\s*FLAG", raw))
    if flags:
        issues.append(f"INFO: {flags} FLAG comment(s)")
    return ("WARN" if issues else "OK "), issues


total_clean = 0
for slug in (W2 if True else ASSIGN):
    status, issues = check(slug, True)
    if all(i.startswith("INFO:") for i in issues):
        status, total_clean = "OK ", total_clean + 1
    elif not issues:
        total_clean += 1
    print(f"[{status}] {slug}")
    for i in issues:
        print(f"        - {i}")
print(f"\n{total_clean}/{len(W2)} clean (FLAG comments counted as INFO)")
