#!/usr/bin/env python3
"""Track 2 remediation: fix the systematic wrong-Act citation of the Section 24
finance-cost provisions across the Property blog corpus.

The finance-cost restriction (s.272A) and the individual's relief entitlement /
basic-rate reducer with its carry-forward of unrelieved costs (s.274A) live in
the Income Tax (Trading and Other Income) Act 2005 (ITTOIA 2005, c.5) -- NOT the
Income Tax Act 2007 (ITA 2007, c.3). The legislation.gov.uk link for the wrong
Act (ukpga/2007/3/section/272A) 404s. Verified against legislation.gov.uk
2026-05-29: ITTOIA 2005 ss.272A/274A are the correct home.

The section numbers (272A, 274A) are correct; only the Act name and URL are
wrong. Replacements are regex-anchored to the 272/274 section tokens so nothing
else in an ITA-2007 or ITTOIA-2005 citation is touched. Every matched
occurrence was confirmed (by reading its context) to be a Section 24 reference.
"""
import re
import pathlib

BLOG = pathlib.Path("Property/web/content/blog")

SUBS = [
    # legislation.gov.uk URL: ITA 2007 (ukpga/2007/3) -> ITTOIA 2005 (ukpga/2005/5)
    (re.compile(r"ukpga/2007/3/section/(27[24][A-Z]*)"), r"ukpga/2005/5/section/\1"),
    # short-form label "ITA 2007 s.272A" -> "ITTOIA 2005 s.272A"
    (re.compile(r"\bITA 2007 (s\.27[24][A-Z]*)"), r"ITTOIA 2005 \1"),
    # full-name label "Income Tax Act 2007 s.272A" -> full ITTOIA 2005 name
    (re.compile(r"\bIncome Tax Act 2007 (s\.27[24][A-Z]*)"),
     r"Income Tax (Trading and Other Income) Act 2005 \1"),
]


def main() -> None:
    total = 0
    changed = []
    for f in sorted(BLOG.glob("*.md")):
        txt = f.read_text(encoding="utf-8")
        orig = txt
        n = 0
        for pat, rep in SUBS:
            txt, c = pat.subn(rep, txt)
            n += c
        if txt != orig:
            f.write_text(txt, encoding="utf-8")
            changed.append((f.name, n))
            total += n
    for name, n in changed:
        print(f"  {n:2d}  {name}")
    print(f"TOTAL: {total} replacements across {len(changed)} files")


if __name__ == "__main__":
    main()
