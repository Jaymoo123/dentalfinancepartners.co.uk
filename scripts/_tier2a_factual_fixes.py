"""One-off: apply Tier 2A verify-flagged factual fixes via exact string replacement.
Reports matched/MISSED per fix so nothing silently fails. Reasoned/verify-backed
corrections; exact-string only (no fuzzy match)."""
import pathlib

B = pathlib.Path("Property/web/content/blog")

FIXES = [
    # (file, old, new)  -- CGT 24% is Finance (No. 2) Act 2024 c.12 s.6, not Finance Act 2024 c.3
    ("cambridge-property-accountant-landlord-tax-services.md",
     "unified by Finance Act 2024", "unified by the Finance (No. 2) Act 2024"),
    ("coventry-property-accountant.md",
     "following Finance Act 2024", "following the Finance (No. 2) Act 2024"),
    ("coventry-property-accountant.md",
     "above it (Finance Act 2024)", "above it (Finance (No. 2) Act 2024)"),
    ("property-accountant-aberdeen-landlords-tax-services.md",
     "the unified rates under Finance Act 2024", "the unified rates under the Finance (No. 2) Act 2024"),

    # belfast (NI, UK rates apply): FA 2026 is enacted, not awaiting Royal Assent
    ("belfast-property-accountant-specialist-tax-services.md",
     "legislated in the Finance Act 2026, scheduled to take effect from 6 April 2027 once it receives Royal Assent. If it commences as drafted, the effective property income rates become 22 percent basic, 42 percent higher and 47 percent additional.",
     "enacted by the Finance Act 2026, which received Royal Assent on 18 March 2026, and takes effect from 6 April 2027. From that date the property income rates become 22 percent basic, 42 percent higher and 47 percent additional."),
    ("belfast-property-accountant-specialist-tax-services.md",
     "legislated in the <strong>Finance Act 2026</strong>, scheduled to take effect from <strong>6 April 2027</strong> once it receives Royal Assent. If it commences as drafted, the effective property income rates become:",
     "enacted by the <strong>Finance Act 2026</strong> (Royal Assent 18 March 2026) and takes effect from <strong>6 April 2027</strong>. From that date the property income rates become:"),
    ("belfast-property-accountant-specialist-tax-services.md",
     "The surcharge is scheduled rather than fully commenced, so the sensible position is to plan against these rates while watching for commencement.",
     "Because these rates are enacted and take effect from 6 April 2027, the sensible position is to plan for them now."),

    # edinburgh (Scotland): 22/42/47 are rest-of-UK; Scottish property rates set separately (FA 2026 s.8/Sch 2)
    ("property-accountant-edinburgh-landlord-tax-services.md",
     "From 6 April 2027 a 2% surcharge applies to UK property income on top of the standard income tax rates, enacted in Finance Act 2026. For 2027/28 that produces effective property income rates of 22% basic, 42% higher, and 47% additional. This sits alongside, and interacts with, the Scottish rate structure for Scottish taxpayers, so the combined position is worth modelling before the tax year begins.",
     "From 6 April 2027 the rest-of-UK property income rates rise by 2 percentage points to 22% basic, 42% higher and 47% additional under the Finance Act 2026. These figures do not apply directly to Scottish taxpayers: the Finance Act 2026 (section 8 and Schedule 2, amending the Scotland Act 1998) provides that property income rates for Scottish taxpayers are set separately by the Scottish Parliament. An Edinburgh landlord should model the Scottish position once the 2027/28 Scottish rates are set, rather than assuming the 22/42/47 figures."),
    ("property-accountant-edinburgh-landlord-tax-services.md",
     "From <strong>6 April 2027</strong>, a 2% surcharge applies to UK property income on top of the standard income tax rates, enacted in Finance Act 2026. For 2027/28 this produces effective property income rates of <strong>22% basic, 42% higher, and 47% additional</strong>. For Scottish taxpayers this interacts with the Scottish band structure, so the combined picture is worth modelling before the tax year starts rather than after.",
     "From <strong>6 April 2027</strong> the rest-of-UK property income rates rise by 2 percentage points to <strong>22% basic, 42% higher and 47% additional</strong> under the Finance Act 2026. These figures do not apply directly to Scottish taxpayers: the Finance Act 2026 (section 8 and Schedule 2) provides that property income rates for Scottish taxpayers are set separately by the Scottish Parliament. An Edinburgh landlord should model the Scottish position once the 2027/28 Scottish rates are set."),

    # aberdeen (Scotland): same correction
    ("property-accountant-aberdeen-landlords-tax-services.md",
     "Finance Act 2026 enacted separate tax rates for property income from 6 April 2027: 22% basic, 42% higher and 47% additional. These are 2 percentage points above the equivalent non-savings, non-dividend rates and apply to taxable rental profit. Aberdeen landlords should factor the enacted 2027 rates into structure and timing decisions now rather than treating them as speculative.",
     "Finance Act 2026 raised the rest-of-UK property income rates by 2 percentage points from 6 April 2027, to 22% basic, 42% higher and 47% additional. These rest-of-UK figures do not apply directly to Scottish taxpayers: the Finance Act 2026 (section 8 and Schedule 2) provides that property income rates for Scottish taxpayers are set separately by the Scottish Parliament. An Aberdeen landlord should plan around the Scottish position once the 2027/28 Scottish rates are set."),
    ("property-accountant-aberdeen-landlords-tax-services.md",
     "Finance Act 2026 has enacted separate property income tax rates from April 2027.",
     "Finance Act 2026 has introduced separate property income tax rates from April 2027, with the rates for Scottish taxpayers set separately by the Scottish Parliament."),
]

for fn, old, new in FIXES:
    f = B / fn
    txt = f.read_text(encoding="utf-8")
    n = txt.count(old)
    if n == 0:
        print(f"  MISS  {fn}: <<{old[:60]}...>>")
        continue
    f.write_text(txt.replace(old, new), encoding="utf-8")
    print(f"  OK x{n}  {fn}: {old[:50]}...")
print("done")
