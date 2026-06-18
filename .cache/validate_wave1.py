"""Independent wave-1 draft validator (manager gate before judging)."""
from __future__ import annotations

import re
from pathlib import Path

import yaml

BLOG = Path(r"C:\Users\user\Documents\Accounting\contractors-ir35\web\content\blog")

# slug -> (category, tier)
ASSIGN = {
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


def check(slug: str) -> list[str]:
    issues: list[str] = []
    p = BLOG / f"{slug}.md"
    if not p.exists():
        return ["MISSING FILE"]
    raw = p.read_text(encoding="utf-8")
    for ch, name in [("—", "EM-DASH"), ("–", "EN-DASH")]:
        n = raw.count(ch)
        if n:
            issues.append(f"{name} x{n}")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.DOTALL)
    if not m:
        return issues + ["FRONTMATTER does not parse (no --- block)"]
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError as e:
        return issues + [f"YAML error: {e}"]
    body = m.group(2)
    cat, tier = ASSIGN[slug]

    for f in ["title", "slug", "date", "updatedDate", "author", "category",
              "metaTitle", "metaDescription", "h1", "summary", "keyTakeaways",
              "sourcesVerifiedAt", "faqs"]:
        if f not in fm or fm[f] in (None, []):
            issues.append(f"frontmatter missing/empty: {f}")
    if fm.get("slug") != slug:
        issues.append(f"slug mismatch: {fm.get('slug')}")
    if fm.get("category") != cat:
        issues.append(f"category mismatch: {fm.get('category')!r} != {cat!r}")
    mt, md = str(fm.get("metaTitle", "")), str(fm.get("metaDescription", ""))
    if len(mt) > 62:
        issues.append(f"metaTitle {len(mt)} chars (>62)")
    if len(md) > 158:
        issues.append(f"metaDescription {len(md)} chars (>158)")

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
    if re.search(r"\*\*[^*]+\*\*", body):
        issues.append("markdown bold in body")

    links = re.findall(r'href="([^"]+)"', body)
    internal = [l for l in links if l.startswith("/")]
    bad = [l for l in internal if l.rstrip("/") not in ALLOW]
    if bad:
        issues.append(f"links off allowlist: {bad}")
    uniq = len(set(internal))
    if not (4 <= uniq <= 8):
        issues.append(f"internal links {uniq} unique (range 4-8)")

    flags = re.findall(r"<!--\s*FLAG[^>]*-->", raw)
    if flags:
        issues.append(f"FLAG comments: {len(flags)}")

    for phrase in ["In today's", "navigate the complexities", "it's important to note",
                   "ever-evolving", "game-changer", "delve"]:
        if phrase.lower() in raw.lower():
            issues.append(f"banned phrase: {phrase}")
    return issues


total_bad = 0
for slug in ASSIGN:
    issues = check(slug)
    status = "OK " if not issues else "FAIL" if any(
        "MISSING" in i or "EM-DASH" in i or "mismatch" in i or "YAML" in i for i in issues
    ) else "WARN"
    if issues:
        total_bad += 1
    print(f"[{status}] {slug}")
    for i in issues:
        print(f"        - {i}")
print(f"\n{len(ASSIGN) - total_bad}/{len(ASSIGN)} clean")
