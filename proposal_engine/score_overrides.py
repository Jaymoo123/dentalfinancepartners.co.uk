"""Local tier scores for leads not yet in the lead_value_scores table.
Scored manually 2026-07-15 using the LEAD_QUALITY_REPORT_2026-07 rubric.
Key = lead id 8-char prefix. Merged at runtime; table rows win if present.
channel: contact-page submission = form; blog-page inline capture = widget."""

SCORE_OVERRIDES = {
    # (tier, est_value_gbp, intent, work_type, channel, confidence, rationale)
    "c57d1cea": ("medium", 1000, "structure", "recurring", "form", "high", "Airbnb/short-let purchase, Ltd vs personal, wants ongoing structure advice"),
    "025fd0bc": ("low", 100, "structure", "unknown", "form", "low", "Vague first-steps portfolio question, knowledge only"),
    "23e989ae": ("medium", 600, "incorporation", "one_off", "widget", "medium", "One-line transfer-to-Ltd question from blog form"),
    "eb23434e": ("medium", 800, "structure", "recurring", "form", "medium", "Flat to Airbnb operator, wants accountancy quote"),
    "8b87e37c": ("medium", 400, "cgt", "one_off", "widget", "medium", "Simple CGT computation on one disposal"),
    "e8240209": ("high", 2000, "cgt", "project", "form", "high", "MVL distribution + BADR + in-specie DLA, complex one-year project"),
    "b3d7ccda": ("medium", 900, "compliance", "recurring", "form", "high", "2 BTLs, MTD setup plus ongoing support"),
    "da7a30cb": ("high", 2500, "incorporation", "recurring", "form", "high", "3 personal BTLs into existing Ltd with 3, transfer planning"),
    "d650f5b2": ("medium", 500, "compliance", "unknown", "widget", "low", "Retired, 5 flats plus pensions, no specific ask"),
    "53f31e13": ("very_high", 6000, "incorporation", "project", "widget", "high", "15-property partnership business, incorporation exploration"),
    "f4ea2e60": ("medium", 400, "incorporation", "one_off", "widget", "low", "One-line transfer-under-Ltd question"),
    "d8283a3e": ("very_high", 5000, "structure", "project", "form", "medium", "Adviser to GBP 5m mixed portfolio client, requesting fee proposal"),
    "8c63d2a0": ("low", 100, "structure", "one_off", "widget", "medium", "Mortgage interest relief personal vs Ltd, information only"),
    "5f95f87e": ("medium", 700, "cgt", "one_off", "widget", "high", "Second-property sale, spouse transfer to reduce CGT"),
    "83e35f85": ("high", 2500, "structure", "project", "widget", "high", "Block of 4 flats, acquisition plus tax structuring brief"),
    "37df11ad": ("high", 1800, "sdlt", "project", "form", "medium", "GBP 1.5m plus GBP 400k linked Edinburgh purchases, ADS/LBTT structuring"),
}

# Scored 2026-07-16 (session: proposal v2 pass), same rubric.
SCORE_OVERRIDES.update({
    "729416b5": ("high", 2500, "structure", "recurring", "widget", "high", "3 properties GBP 100k+ rent, mixed personal/Ltd, salary-dividend-DLA planning, wants specialist to replace generalist accountant"),
    "08c9ffcd": ("medium", 800, "incorporation", "recurring", "form", "high", "First BTL, quote for incorporation plus annual filing, clear recurring ask"),
    "3788e0a2": ("low", 200, "other", "unknown", "widget", "low", "Vague tax planning line, age 62 with pension, no property specifics"),
})

# Scored 2026-08-12 (session: full-ledger proposal), same rubric, grade-down on doubt.
SCORE_OVERRIDES.update({
    "a4b05d7c": ("low", 100, "other", "unknown", "widget", "high", "Single info question on 2027 landlord tax, no engagement described"),
    "f0d2887a": ("high", 1500, "structure", "recurring", "form", "high", "Ltd HMO in Wales, year-end plus planning, scaling to 5+ HMOs, fixed-fee ask"),
    "aefe7432": ("very_high", 6000, "incorporation", "project", "form", "high", "32 flats (10 personal, 22 Ltd), transfer question plus sibling buyout"),
    "ea14fd10": ("medium", 600, "incorporation", "one_off", "widget", "medium", "Transfer personal property to existing Ltd, SDLT and CT advice"),
    "155e45e1": ("medium", 700, "structure", "one_off", "form", "medium", "Remortgage vs company holding plus possible HMO, pre-decision planning call"),
    "0da067ba": ("high", 1200, "compliance", "recurring", "form", "high", "New CQC care startup, accounts and payroll setup, call today urgency"),
    "a2ca2438": ("low", 200, "other", "one_off", "form", "low", "Council tax completion-notice dispute, legal status question, not core accounting"),
    "61711ac9": ("high", 2000, "structure", "project", "form", "high", "UAE non-resident couple, existing plus future BTLs, full ownership/extraction/SDLT/CGT scope"),
    "f425503f": ("high", 1000, "compliance", "recurring", "form", "high", "France-resident NRL, SA registration plus double-tax relief, ongoing need"),
    "2517e0bd": ("high", 2500, "compliance", "recurring", "form", "high", "New SRA law firm, full stack quote incl client account and SRA accountant's report"),
    "28d547fd": ("low", 200, "structure", "unknown", "widget", "low", "One line, jointly owned BTL, no ask stated"),
    "0641889b": ("high", 2500, "incorporation", "project", "form", "high", "5 personally held BTLs into existing property Ltd, transfer planning"),
    "898cf4c1": ("very_high", 4000, "structure", "project", "form", "medium", "Unpicking hybrid LLP (Spotlight 63) plus incorporation and succession"),
    "5af237bb": ("medium", 600, "other", "unknown", "form", "low", "Expat retiring to UK, NHS pension plus international investments, part-IFA territory"),
    "ccbee637": ("high", 2000, "structure", "project", "form", "high", "CIO formation, GBP 100k historic funds, records reconstruction and personal tax"),
    "1aebdb61": ("medium", 500, "structure", "unknown", "form", "low", "Advisory keywords (group structure, trading income) but no specifics, graded down"),
    "278f75ef": ("high", 1500, "structure", "project", "form", "medium", "3 BTLs pre-purchase, full personal-vs-Ltd and extraction planning list"),
    "8316bc6b": ("medium", 700, "structure", "one_off", "form", "medium", "Mixed-use/short-let purchase, personal vs Ltd structure decision"),
    "d1ddd38a": ("high", 1200, "cgt", "one_off", "form", "medium", "Gift without reservation plus CGT on let annexe, IHT planning context"),
    "d5bc1a79": ("low", 100, "compliance", "one_off", "widget", "high", "Single SA box-number question, self-completing return"),
})

# Scored 2026-07-17 (reviewed: no PII in message).
SCORE_OVERRIDES.update({
    "4799b085": ("medium", 600, "sdlt", "one_off", "form", "high", "SDLT higher-rate question on GBP 445k main residence, spouse interests in commercial property and trust, paid consultation requested"),
})
