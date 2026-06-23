"""Remediate unsubstantiated protected-title reviewer claims on Property blog.
Replaces reviewedBy/reviewerCredentials that assert a protected designation
(ICAEW/ACA/ACCA/CTA/ATT/CIOT/Chartered...) with a truthful verification signal.
Keeps already-truthful credential lines. Fixes the James Holloway cross-site leak.
Manager-direct mechanical sweep (no per-page judgment). Edits frontmatter only.
"""
import re, pathlib, sys

BLOG = pathlib.Path("C:/Users/user/Documents/Accounting/Property/web/content/blog")
PROT = re.compile(r'ICAEW|ACCA|CIOT|[Cc]hartered|\bACA\b|\bCTA\b|\bATT\b')
JAMES = re.compile(r'James Holloway')
NEW_REVIEWER = 'reviewedBy: "Property Tax Partners Editorial Team"'
NEW_CREDS = 'reviewerCredentials: "Reviewed against legislation.gov.uk and HMRC guidance"'

apply = "--apply" in sys.argv
changed_rev = changed_creds = james = files_changed = 0
kept_creds = {}

for f in sorted(BLOG.glob("*.md")):
    lines = f.read_text(encoding="utf-8").split("\n")
    idx = [i for i, l in enumerate(lines) if l.strip() == "---"]
    if len(idx) < 2:
        continue
    lo, hi = idx[0], idx[1]
    fchanged = False
    for i in range(lo + 1, hi):
        l = lines[i]
        if re.match(r'\s*reviewedBy:', l):
            val = l.split(":", 1)[1]
            if PROT.search(val) or JAMES.search(val):
                if JAMES.search(val):
                    james += 1
                lines[i] = NEW_REVIEWER
                changed_rev += 1
                fchanged = True
        elif re.match(r'\s*reviewerCredentials:', l):
            val = l.split(":", 1)[1]
            if PROT.search(val):
                lines[i] = NEW_CREDS
                changed_creds += 1
                fchanged = True
            else:
                k = val.strip().strip('"\'')
                kept_creds[k] = kept_creds.get(k, 0) + 1
    if fchanged:
        files_changed += 1
        if apply:
            f.write_text("\n".join(lines), encoding="utf-8")

print(f"{'APPLIED' if apply else 'DRY-RUN'}:")
print(f"  files changed:            {files_changed}")
print(f"  reviewedBy replaced:      {changed_rev}  (incl. {james} James-Holloway leaks)")
print(f"  reviewerCredentials repl: {changed_creds}")
print(f"  reviewerCredentials KEPT (already truthful), distinct values:")
for k, n in sorted(kept_creds.items(), key=lambda x: -x[1]):
    print(f"      {n:3}  {k[:90]}")
