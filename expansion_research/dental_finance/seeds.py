"""Dental-finance seed keyword universe, clustered.

UNREG = commercial/business finance (outside FCA scope — buildable now).
REG   = residential mortgage / insurance (regulated — map for completeness, flag).
Slug-derived candidates from competitor sitemaps get merged on top at volume time.
"""

CLUSTERS: dict[str, dict] = {
    # ---- UNREGULATED: build-now core -------------------------------------
    "practice_purchase": {
        "reg": "UNREG",
        "seeds": [
            "dental practice finance", "dental practice loan", "buy a dental practice",
            "dental practice acquisition finance", "finance to buy a dental practice",
            "dental practice purchase loan", "how to buy a dental practice",
            "buying a dental practice", "dental practice for sale finance",
            "dental practice funding", "first dental practice purchase",
            "associate to practice owner finance", "100% dental practice finance",
            "no deposit dental practice loan",
        ],
    },
    "goodwill": {
        "reg": "UNREG",
        "seeds": [
            "goodwill loan dental practice", "dental goodwill finance",
            "dental practice goodwill loan", "goodwill funding dentist",
        ],
    },
    "commercial_mortgage": {
        "reg": "UNREG",
        "seeds": [
            "dental practice commercial mortgage", "commercial mortgage dental practice",
            "dental surgery commercial mortgage", "dentist commercial mortgage",
            "freehold dental practice mortgage", "commercial mortgage for dentists",
        ],
    },
    "asset_equipment": {
        "reg": "UNREG",
        "seeds": [
            "dental equipment finance", "dental chair finance", "dental equipment leasing",
            "cbct scanner finance", "dental x-ray machine finance",
            "dental equipment lease", "finance dental equipment",
            "intraoral scanner finance", "dental laser finance",
        ],
    },
    "squat_startup": {
        "reg": "UNREG",
        "seeds": [
            "squat dental practice finance", "start a dental practice",
            "squat practice funding", "how to open a dental practice",
            "dental practice startup loan", "setting up a dental practice cost",
            "new dental practice finance",
        ],
    },
    "refinance_expansion": {
        "reg": "UNREG",
        "seeds": [
            "dental practice refinance", "refinance dental practice loan",
            "second dental practice finance", "dental practice expansion finance",
            "dental practice development loan", "dental practice working capital",
            "cash flow finance dental practice", "dental practice tax loan",
            "vat loan dental practice",
        ],
    },
    "valuation": {
        "reg": "UNREG",
        "seeds": [
            "dental practice valuation", "how much is my dental practice worth",
            "dental practice valuation calculator", "value of a dental practice",
            "dental practice ebitda multiple", "selling a dental practice",
            "sell my dental practice", "dental practice sale process",
        ],
    },
    # ---- REGULATED: map for completeness, do NOT build capture pre-IAR ----
    "residential_mortgage": {
        "reg": "REG",
        "seeds": [
            "dentist mortgage", "mortgages for dentists", "dentist residential mortgage",
            "associate dentist mortgage", "self employed dentist mortgage",
            "newly qualified dentist mortgage", "professional mortgage dentist",
            "mortgage for associate dentist", "how much can a dentist borrow mortgage",
        ],
    },
    "protection": {
        "reg": "REG",
        "seeds": [
            "dentist income protection", "associate dentist income protection",
            "income protection for dentists", "dentist locum insurance",
            "dental locum insurance", "self employed dentist sick pay",
            "dentist life insurance", "dental associate protection",
            "locum cover insurance dentist",
        ],
    },
}


def all_seeds() -> list[str]:
    out: list[str] = []
    for c in CLUSTERS.values():
        out += c["seeds"]
    return sorted(dict.fromkeys(s.lower().strip() for s in out))


def reg_of(keyword: str) -> str:
    kw = keyword.lower().strip()
    for c in CLUSTERS.values():
        if kw in {s.lower().strip() for s in c["seeds"]}:
            return c["reg"]
    return "?"


if __name__ == "__main__":
    seeds = all_seeds()
    unreg = sum(1 for s in seeds if reg_of(s) == "UNREG")
    print(f"{len(seeds)} seeds  |  {unreg} UNREG  |  {len(seeds)-unreg} REG")
