"""One-off: Tier 2B verify-flagged factual fixes. Exact-string, match-reported."""
import pathlib
B = pathlib.Path("Property/web/content/blog")
FIXES = [
    # newcastle: CGT attribution conflated wrong Act + wrong date; state current rates plainly (Sunderland approach)
    ("newcastle-property-accountant-landlord-tax-services.md",
     "for higher-rate taxpayers (the rates set by Finance Act 2024 from 30 October 2024). The annual exempt amount",
     "for higher-rate taxpayers. The annual exempt amount"),
    ("newcastle-property-accountant-landlord-tax-services.md",
     "24% above it, as set by Finance Act 2024 from 30 October 2024.</li>",
     "24% above it.</li>"),
    # reading: 2027 property rates do not apply to Scottish taxpayers; "all/every UK landlord" overstates
    ("property-accountant-reading-specialist-tax-services.md",
     "The change applies to all UK landlords, including those in Reading.",
     "The change applies to landlords in England, Wales and Northern Ireland, including those in Reading; Scotland sets its own property income rates."),
    ("property-accountant-reading-specialist-tax-services.md",
     "This is a structural change for every UK landlord.",
     "This is a structural change for landlords in England, Wales and Northern Ireland; Scotland sets its own property income rates."),
]
for fn, old, new in FIXES:
    f = B / fn
    t = f.read_text(encoding="utf-8")
    n = t.count(old)
    if n == 0:
        print(f"  MISS {fn}: <<{old[:55]}...>>"); continue
    f.write_text(t.replace(old, new), encoding="utf-8")
    print(f"  OK x{n} {fn}")
print("done")
