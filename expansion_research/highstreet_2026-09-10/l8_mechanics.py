"""High-street map, Leg 8: how many DISTINCT tax mechanics does the trade universe hold?

The question this answers: a rival publishes 2,107 trade pages. If we covered the same
universe, how many of those pages would carry a genuinely different tax answer, and how
many would be the same answer with the trade name swapped?

That number decides the shape of the programme. Trades sharing a mechanic do not each
need a page; they need to be NAMED and worked inside the page that owns their mechanic.

Method: a rule-based classifier over trade names against a taxonomy of UK mechanics that
actually change the accounting answer for a small business. Rules, not a model, because
the assignment has to be re-derivable and reviewable line by line.

LIMITS, stated because they matter to how the output is read:
  - It classifies on the trade NAME only. A name is a weak signal; "consultant" hides
    both an IR35 case and a VAT place-of-supply case.
  - Multi-mechanic trades get a primary and a secondary. Real ones often have three.
  - The residual bucket is deliberately large and honest: a trade with no distinguishing
    mechanic is the finding, not a failure to classify.

Writes mechanics.json and mechanics_report.txt.
"""
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).parent

# (mechanic, what makes it different, pattern). Order is priority: the first match wins
# the primary slot, so the more specific mechanics are listed first.
MECHANICS: list[tuple[str, str, str]] = [
    ("excise-duty", "goods carrying alcohol, tobacco, vaping or fuel duty",
     r"brew|distiller|winery|vineyard|cider|off.?licen|wine merchant|spirits|"
     r"tobacconist|vape|e.?cigarette|petrol|fuel|forecourt"),

    ("gambling-duty", "gaming duty, machine games duty, bingo duty",
     r"casino|betting|bookmaker|bingo|amusement arcade|amusement machine|"
     r"gaming|lottery|slot machine"),

    ("food-vat-boundary", "hot versus cold, eat in versus takeaway, the zero-rate line",
     r"restaurant|takeaway|cafe|coffee shop|sandwich|bakery|baker\b|butcher|"
     r"fish and chip|chip shop|deli\b|delicatessen|caterer|catering|food truck|"
     r"street food|ice cream|confection|chocolat|patisserie|pizza|burger|"
     r"kebab|sushi|noodle|curry|fried chicken|juice bar|snack"),

    ("zero-rated-goods", "sells mostly zero-rated goods, so a permanent repayment position",
     r"greengrocer|fishmonger|book shop|bookshop|bookseller|newsagent|"
     r"children.?s clothing|baby (shop|wear|goods)|health food|farm shop"),

    ("margin-scheme", "second-hand goods bought from private sellers, no input tax",
     r"antique|second.?hand|used car|car dealer|motor dealer|auction|pawnbroker|"
     r"charity shop|reseller|collectab|vintage|militaria|numismat|philatel|"
     r"salvage|reclamation|car supermarket"),

    ("health-exemption", "VAT exemption turns on a statutory professional register",
     r"doctor|\bgp\b|dentist|dental|optician|optometr|pharmac|chiropod|podiatr|"
     r"osteopath|chiroprac|physiotherap|physio\b|nurse|midwif|paramedic|"
     r"audiolog|hearing aid|orthopt|dietit|speech (and language )?therap|"
     r"psycholog|psychiatr|occupational therap|radiograph|clinic\b|"
     r"acupunctur|herbalis|homeopath|reflexolog|osteo|aesthetic|cosmetic (surgery|clinic)|"
     # medical specialisms are named by specialism, never as "doctor"
     r"ologist|ologis|surgeon|consultant physician|anaesthet|"
     r"cardiolog|neurolog|haematolog|oncolog|dermatolog|urolog|"
     r"paediatr|geriatr|gynaecolog|obstetric|ophthalm|"
     r"therapist|counsellor|counselling|hypnotherap"),

    ("welfare-care-exemption", "welfare or care exemption, and CQC-regulated income",
     r"care home|nursing home|domiciliary|home care|residential care|"
     r"childminder|nurser(y|ies)|day care|creche|foster|supported living|"
     r"charit|non.?profit|community interest|social enterprise|hospice|"
     r"food bank|almshouse"),

    ("education-exemption", "private tuition and eligible-body exemption",
     r"tutor|tuition|school\b|academy|college|university|training|driving instructor|"
     r"language school|music teacher|dance school|nursery school|education|"
     r"lecturer|teacher|coach(ing)? (school|academy)|exam board"),

    ("funeral-exemption", "funeral services are exempt, so input tax is the problem",
     r"funeral|undertaker|crematori|cemeter|burial|monumental mason|memorial"),

    ("sports-club-exemption", "non-profit sports club member subscriptions",
     r"golf club|sports club|cricket club|rugby club|football club|tennis club|"
     r"bowls|angling club|athletic club|leisure centre|swimming (pool|club)|"
     r"martial arts|gymnas|riding (school|club)|equestrian centre"),

    ("finance-insurance-exemption", "exempt financial or insurance supplies, partial exemption",
     r"insuran|mortgage|financial advis|\bifa\b|independent financial|broker|"
     r"loan\b|lending|credit union|debt (advice|management|collection)|"
     r"invoice financ|factoring|bureau de change|money transfer|"
     r"investment (manage|advis)|wealth manage|stockbrok|actuar"),

    ("land-property-exemption", "exempt land against standard-rated facilities, option to tax",
     r"self storage|storage|marina|mooring|liver(y|ies)|caravan (park|site)|"
     r"campsite|camping|glamping|holiday (park|let|cottage)|"
     r"landlord|letting agent|property manage|serviced office|business centre|"
     r"car park|parking|allotment|kennel|cattery|stables"),

    ("cis-construction", "CIS deductions and the domestic reverse charge",
     r"builder|building contractor|construction|groundwork|bricklay|plaster|"
     r"roofer|roofing|scaffold|carpenter|joiner|plumb|electric(ian|al contract)|"
     r"decorat|painter|tiler|tiling|glazier|glazing|window (fitter|install)|"
     r"demolition|asbestos|damp proof|render|screed|steel erect|"
     r"civil engineering|groundworker|drainage|excavat|piling|shopfitt|"
     r"kitchen fitt|bathroom fitt|floor(ing)? (layer|fitter)|insulation|"
     r"loft conversion|extension|landscap|fencing|driveway|paving|"
     r"pebble dash|render(er|ing)|cladding|guttering|fascia|soffit|"
     r"boiler|central heating|appliance install|appliance servic|"
     r"cable contract|cabling|ducting|sprinkler|"
     r"hot tub install|sauna install|conservatory install|"
     r"heating engineer|hvac|air conditioning|refrigeration|gas engineer|"
     r"solar|heat pump|ev charg|renewable"),

    ("supply-and-fit", "supply-only against supply-and-fit changes the rate",
     r"showroom|kitchen (design|show)|bathroom (design|show)|conservator|"
     r"blind\b|blinds|curtain|awning|shutter|signage|sign maker|"
     r"furniture (maker|retail)|carpet|flooring retail"),

    ("passenger-transport", "zero rating for vehicles carrying ten or more",
     r"coach (operator|hire|company)|bus (operator|company)|minibus|"
     r"train operat|ferry|airline|tour operator|excursion"),

    ("vehicle-trade", "vehicle capital allowances and the leased-car input tax block",
     r"taxi|private hire|chauffeur|driving school|courier|delivery driver|"
     r"haulage|haulier|lorry|\bhgv\b|freight|removal|man (and|with) a van|"
     r"car hire|van hire|vehicle rental|recovery|breakdown|"
     r"garage|\bmot\b|mechanic|tyre|exhaust|body shop|valeting|car wash"),

    ("printed-matter", "leaflets zero rated, stationery standard rated, same press",
     r"print(er|ing|ers)\b|copy shop|repro|lithograph|screen print|"
     r"publish|bookbind|stationer|greeting card|photocopy"),

    ("creative-reliefs", "theatre, orchestra, museum and film tax reliefs",
     r"theatre|orchestra|museum|gallery|film (production|studio)|"
     r"tv production|television production|animation|video game|"
     r"exhibition|opera|ballet|concert|festival"),

    ("rd-credits", "R&D relief on genuine process and product development",
     r"manufactur|engineering|laborator|pharmaceutic|biotech|chemical|"
     r"electronic|precision|fabricat|foundr|toolmak|machinist|"
     r"software develop|research|prototyp|materials|aerospace|automotive design"),

    ("agriculture-apr", "farm averaging and agricultural property relief",
     r"farm(er|ing)|agricultur|arable|dairy|livestock|poultry|"
     r"horticultur|market garden|nurser(y|ies) (grower|plant)|orchard|"
     r"fishery|fish farm|aquacultur|shoot(ing)? (estate|venue)|game (keeper|shoot)|"
     r"forestr|woodland|arboricultur|tree surgeon"),

    ("agent-vs-principal", "commission income, so turnover is not what passes through the till",
     r"travel agent|estate agent|recruitment|employment agenc|"
     r"advertising agenc|media buying|affiliate|introducer|"
     r"sales agent|distributor|wholesal|import|export|freight forward|"
     r"ticket agenc|booking agenc"),

    ("chair-room-rental", "is the person in the chair employed, self-employed, or renting",
     r"hairdress|barber|salon|beaut(y|ician)|nail\b|spa\b|tattoo|piercing|"
     r"massage|tanning|waxing|threading|make.?up artist|"
     r"holistic|wellbeing centre|therapy room"),

    ("tronc-tips", "tips, service charge and troncs",
     r"\bpub\b|\bbar\b|public house|inn\b|nightclub|hotel|guest house|"
     r"\bb&b\b|bed and breakfast|hostel|wine bar|cocktail|brasserie"),

    ("household-employer", "the client becomes a PAYE employer at home",
     r"nanny|nannies|au pair|housekeep|domestic (staff|cleaner|help)|"
     r"maternity nurse|carer\b|companion"),

    ("employment-status-ir35", "status, IR35 and the personal service company",
     r"consultan|contractor\b|interim|freelance|locum|"
     r"\bit\b|software|developer|programmer|analyst|project manage|"
     r"engineer(ing)? consultan|management consultan"),

    ("place-of-supply", "overseas clients decide whether UK VAT applies at all",
     r"translat|interpret|copywrit|\bseo\b|digital marketing|web design|"
     r"graphic design|e.?commerce|online (shop|retail|seller)|dropship|"
     r"saas|app develop|hosting|domain|virtual assistant|"
     r"fulfilment|fulfillment|internet (trader|retail|postal)|mail order|"
     r"online market|marketplace seller"),

    ("cash-business", "cash takings with no reliable till, and HMRC's interest in them",
     r"market (trader|stall)|launder(ette|ma)|dry clean|car boot|"
     r"vending|amusement|ice cream van|mobile (shop|catering)|"
     r"window clean|hand car wash|shoe repair|key cutting|locksmith"),

    ("stock-and-wip", "stock valuation and work in progress at the year end",
     r"retail|shop\b|store\b|boutique|florist|jewell|gift shop|toy shop|"
     r"pet shop|garden centre|hardware|diy\b|builders merchant|"
     r"clothing|fashion|footwear|furnitur|electrical retail|"
     r"bicycle|bike shop|sports shop|music shop|craft"),

    ("professional-practice", "partnership and practice-specific rules",
     r"solicitor|barrister|\blaw\b|legal|conveyanc|notar|"
     r"architect|surveyor|valuer|patent|trade mark|"
     r"veterinar|\bvet\b|accountant|bookkeep|auditor|tax advis"),

    ("licensed-premises", "licensing, security staff status and door supervision",
     r"security|door supervis|\bsia\b|guard|cctv|alarm|"
     r"bouncer|close protection|private investigat"),
]

RESIDUAL = ("generic-service-business",
            "no mechanic of its own: sole trader or company, equipment, insurance, "
            "the ordinary rules")

COMPILED = [(name, why, re.compile(pat, re.I)) for name, why, pat in MECHANICS]


def classify(trade: str) -> list[str]:
    return [name for name, _why, rx in COMPILED if rx.search(trade)]


def main() -> None:
    trades = [t.strip() for t in
              (HERE / "rival_trades.txt").read_text(encoding="utf-8").splitlines()
              if t.strip()]

    primary: dict[str, str] = {}
    allhits: dict[str, list[str]] = {}
    for t in trades:
        hits = classify(t)
        allhits[t] = hits
        primary[t] = hits[0] if hits else RESIDUAL[0]

    counts = Counter(primary.values())
    by_mech: dict[str, list[str]] = defaultdict(list)
    for t, m in primary.items():
        by_mech[m].append(t)

    multi = sum(1 for h in allhits.values() if len(h) > 1)
    none_ = counts[RESIDUAL[0]]

    (HERE / "mechanics.json").write_text(
        json.dumps({"primary": primary, "all": allhits,
                    "counts": counts.most_common()}, indent=1), encoding="utf-8")

    lines = []
    lines.append(f"TRADE UNIVERSE: {len(trades)} distinct trades "
                 f"(from a rival's 2,107 published pages)")
    lines.append(f"MECHANICS USED: {len([c for c in counts if c != RESIDUAL[0]])} "
                 f"of {len(MECHANICS)} defined")
    lines.append(f"NO DISTINCT MECHANIC: {none_} trades "
                 f"({none_ / len(trades) * 100:.0f}%)")
    lines.append(f"MORE THAN ONE MECHANIC: {multi} trades "
                 f"({multi / len(trades) * 100:.0f}%)")
    lines.append("")
    lines.append(f"{'mechanic':<30} {'trades':>7}   what makes it different")
    lines.append("-" * 100)
    why = {n: w for n, w, _ in MECHANICS}
    why[RESIDUAL[0]] = RESIDUAL[1]
    for mech, n in counts.most_common():
        lines.append(f"{mech:<30} {n:>7}   {why[mech]}")
    lines.append("")
    lines.append("SAMPLE ASSIGNMENTS, for review")
    lines.append("-" * 100)
    for mech, _ in counts.most_common():
        ex = ", ".join(by_mech[mech][:8])
        lines.append(f"{mech}:\n    {ex}")

    out = "\n".join(lines)
    (HERE / "mechanics_report.txt").write_text(out, encoding="utf-8")
    print(out[:3000])


if __name__ == "__main__":
    main()
