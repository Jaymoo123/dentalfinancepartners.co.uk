#!/usr/bin/env python3
"""Track 2 WS-B scoper: find the TRUE set of pages whose April-2027 framing is
wrong, without flagging pages that only mention the (correct) 2026/27 20% credit.

Ground truth (verified against legislation.gov.uk + gov.uk, see house_positions
§7): FA 2026 (enacted, RA 18 Mar 2026) sets property income rates 22/42/47 from
6 Apr 2027 for England + NI; the Section 24 finance-cost reducer rises to the
22% property basic rate (NOT frozen at 20%), so NO new basic-rate wedge; the
rates were announced at Autumn Budget 2025, not 2024.

Three error classes, detected by proximity to a 2027 marker so correct
current-year "20%" statements far from any 2027 reference are NOT flagged:

  FORWARD  - claims the reducer stays/remains/frozen/fixed at 20% in a 2027
             context, or that the wedge "widens" / a "2pp gap (42-20)" opens.
  ENACT    - frames FA 2026 as draft / awaiting Royal Assent / scheduled /
             policy commitment, OR attributes the property income rates to the
             Autumn Budget 2024 / 30 October 2024.
  WORKED   - a worked example applying a 20% reducer inside a 2027/28 block.

Output: docs/property/track2_2027_scope.json + a printed summary. Files with no
flags are out of scope. ADJUDICATE the flagged snippets before fixing.
"""
import re
import json
import pathlib

BLOG = pathlib.Path("Property/web/content/blog")
WIN = 260  # chars each side of a marker

MARK_2027 = re.compile(r"2027/28|6 April 2027|from April 2027|April 2027|in 2027|by 2027|2027 rate|2027 property|2027 tax year")
RATE_TOKEN = re.compile(r"22%|42%|47%|22/42/47|property income tax rate|property basic rate|separate property income")

FORWARD = re.compile(
    r"stays? at 20%|remains? at 20%|credit stays|credit remains|reducer stays|frozen at 20%|fixed at 20%"
    r"|wedge widens|widens the (section 24 )?wedge|unchanged by the 2027"
    r"|relieved 2 percentage points below|22 percentage point gap|gap on every pound of mortgage", re.I)
# A window that already states the corrected position is NOT an error.
CORRECT_GUARD = re.compile(
    r"property basic rate|rises to 22|rises from 20% to 22|no new wedge"
    r"|keeps pace with the 22|given at the new 22", re.I)
ENACT = re.compile(
    r"draft finance act 2026|awaiting royal assent|requires royal assent|require enactment"
    r"|not yet (a )?(statute|law|enacted)|finance bill 2025-26|policy commitment"
    r"|scheduled to take effect|scheduled for inclusion|subject to .{0,30}royal assent"
    r"|autumn budget 2024|autumn budget on 30 october 2024|30 october 2024", re.I)
WORKED = re.compile(r"(20% (of|×|x)|× 20%|x 20%|20% credit|credit of 20%|0\.2\s*[×x])", re.I)


def windows(text, marker):
    for m in marker.finditer(text):
        yield text[max(0, m.start() - WIN): m.end() + WIN]


def scan(text):
    flags = {}
    # FORWARD + WORKED: must be near a 2027 marker
    for w in windows(text, MARK_2027):
        if CORRECT_GUARD.search(w):
            continue
        for fm in FORWARD.finditer(w):
            flags.setdefault("FORWARD", set()).add(fm.group(0).lower())
        if WORKED.search(w) and re.search(r"2027", w):
            wm = WORKED.search(w)
            flags.setdefault("WORKED", set()).add(wm.group(0).lower())
    # ENACT: enactment/budget error near a property-rate token
    for w in windows(text, RATE_TOKEN):
        if CORRECT_GUARD.search(w):
            continue
        for em in ENACT.finditer(w):
            tok = em.group(0).lower()
            # "30 october 2024" / "autumn budget 2024" only count near a RATE token,
            # which this window guarantees -> still skip if window is clearly SDLT/CGT
            if tok in ("30 october 2024", "autumn budget 2024") and re.search(
                r"sdlt|surcharge|stamp duty|capital gains|cgt|18%|24%|additional dwelling", w, re.I):
                # could be a legit 2024 SDLT/CGT mention; only flag if it also ties
                # the property INCOME rates to 2024
                if not re.search(r"property income|22%|42%|47%", w, re.I):
                    continue
            flags.setdefault("ENACT", set()).add(tok)
    return {k: sorted(v) for k, v in flags.items()}


def main():
    report = {}
    counts = {"FORWARD": 0, "ENACT": 0, "WORKED": 0}
    for f in sorted(BLOG.glob("*.md")):
        flags = scan(f.read_text(encoding="utf-8"))
        if flags:
            report[f.stem] = flags
            for k in flags:
                counts[k] += 1
    out = pathlib.Path("docs/property/track2_2027_scope.json")
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"Files flagged: {len(report)}")
    print(f"  with FORWARD (backwards wedge/20%): {counts['FORWARD']}")
    print(f"  with ENACT (draft/wrong-budget): {counts['ENACT']}")
    print(f"  with WORKED (2027 worked example @20%): {counts['WORKED']}")
    print(f"\nWrote {out}\n")
    for slug, flags in report.items():
        kinds = ",".join(flags.keys())
        print(f"  [{kinds}] {slug}")


if __name__ == "__main__":
    main()
