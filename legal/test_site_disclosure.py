"""Audit layer two (the privacy policy) against DSA Annex B.4 on every site.

Layer one is now short, so the privacy policy carries the disclosures the LIA
conclusion depends on. A site missing any of these must not be routed into the
network (DSA Annex B.5). Reports per site, exits non-zero if any site fails.
"""
import re
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\user\Documents\Accounting")
SITES = ["Property", "Dentists", "Medical", "Solicitors", "generalist", "divorce-finances",
         "wills-probate", "contractors-ir35", "construction-cis", "digital-agency", "care",
         "charities", "crypto", "ecommerce", "hospitality", "pharmacies", "startups-tech"]

# Annex B.4 (a) to (e). Each is a list of alternative phrasings; one match is enough,
# because the sites word these differently and only the substance is mandated.
CHECKS = {
    "B.4(a) more than one firm": [r"more than one firm", r"More than one firm"],
    "B.4(a) maximum number":     [r"at most six firms", r"six firms may receive", r"up to\s*<strong>\s*three"],
    "B.4(a) both professions":   [r"related professions", r"other professions"],
    "B.4(b) cascade":            [r"no accountancy or tax firm takes it up", r"if no firm takes up",
                                  r"offer it instead to firms", r"no firm takes up your enquiry"],
    "B.4(c) bulk supply":        [r"as part of a batch", r"part of a batch"],
    "B.4(d) fee":                [r"may be paid a fee", r"may receive a fee"],
    "B.4(e) processors":         [r"as our processors", r"process data on our instructions"],
    "B.4(e) non-UK":             [r"not exclusively within the United Kingdom", r"outside the UK",
                                  r"outside the United Kingdom"],
    "objection right":           [r"object at any time", r"right to object"],
}

# LIA section 3.2 rests on the enquirer seeing plural firms. A policy that describes the
# recipient as "a relevant regulated firm" contradicts the paragraph above it and the
# balancing test with it. These two singulars are correct and are not flagged: one firm
# claiming from a redacted alert, and the fee being paid by one particular firm.
SINGULAR = re.compile(r"\ba (?:relevant )?(?:regulated |partner )?firm\b", re.I)
SINGULAR_OK = ("only a firm that decides", "fee by a firm your enquiry")


def main():
    failed = {}
    for site in SITES:
        path = ROOT / site / "web" / "src" / "app" / "privacy-policy" / "page.tsx"
        if not path.exists():
            failed[site] = ["NO PRIVACY POLICY PAGE"]
            continue
        text = path.read_text(encoding="utf-8")
        missing = [name for name, pats in CHECKS.items()
                   if not any(re.search(p, text, re.I) for p in pats)]

        flat = " ".join(text.split())
        for m in SINGULAR.finditer(flat):
            context = flat[max(0, m.start() - 30):m.start() + 30]
            if not any(k in context for k in SINGULAR_OK):
                missing.append(f"singular recipient: ...{context}...")

        if missing:
            failed[site] = missing
        print(f"{site:<18} {'OK' if not missing else 'MISSING: ' + ', '.join(missing)}")

    print()
    if failed:
        print(f"{len(failed)} of {len(SITES)} sites fail Annex B.4. These must not be routed.")
        sys.exit(1)
    print(f"all {len(SITES)} sites carry layer two in full")


if __name__ == "__main__":
    main()
