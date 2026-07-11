# Pharmacy accountancy — verified competitor landscape (R3)

Date: 2026-07-11. Method: 35 UK SERP queries (Serper gl=gb + DDG uk-en, `s1_serp_collect.py`,
raw in `raw/serp_raw.json`), script-filtered against the estate (1 estate domain dropped:
medicalaccounts.co.uk — our own medical site ranks in this niche's SERPs) and a
directory/info blocklist (13 dropped: gov.uk, NHSBSA, C+D, NHS jobs etc.). 129 surviving
domains all fetch-attempted (`s2_verify_fetch.py` → `raw/verify_evidence.json`: 89 fetched
with title, 37 blocked/failed; strategically important blocked ones re-verified via refetch
(`raw/refetch_2026-07-11b/c.json`) or live web search 2026-07-11, marked below).

Verdict tiers: **DEDICATED** = the whole brand is pharmacy/pharmacist accountancy;
**SECTION** = real multi-sector firm with a dedicated pharmacy or healthcare-incl-pharmacists
service page; **ADJACENT_BROKER** = pharmacy sales brokers/valuers (own the buying/selling
SERPs, sell brokerage not accountancy). Full machine-readable list with evidence quotes:
`competitors.json` (43 rivals: 7 DEDICATED + 33 SECTION + 3 ADJACENT_BROKER).

## Headline read

A real but **shallow-to-moderate specialist field**: only 7 dedicated pharmacy-accountancy
brands verified live, and several are small (pharmacyaccountants.co.uk is a 2-page brochure
site; hutchingsaccountants.com an 8-URL site; accountant4pharmacists.co.uk a Salhan
microsite). The depth comes from the healthcare-accountant SECTION tier (33 firms, incl.
heavyweights Hazlewoods, Hawsons, Larking Gowen, Lovewell Blake, Xeinadin) — most rank via
generic medical/healthcare pages, not pharmacy-specific content. One SEO-aggressive
programmatic player (Stetson, ~2,000 location pages). Nobody in the verified set publishes
a data asset or an interactive pharmacy tool in anything we fetched.

## DEDICATED specialists (7, all verified)

| Domain | Focus | Evidence (quoted from fetched page unless noted) |
|---|---|---|
| rxvirtualfinance.co.uk | Pharmacy virtual FD/bookkeeping | Title "Best UK Pharmacy Accountant for Accounting, Tax & Virtual FD"; H1 "Virtual Pharmacy Accountant". Highest hit-count in our sweep (17 hits) |
| pharmatax.co.uk | Pharmacy tax/accounts | "Pharmatax: Pharmacy Accountants \| Accountants for Pharmacy"; H1 "Pharmacy Specialist" |
| pharmacyaccountants.co.uk | Exact-match brand | www refetch 200: "Pharmacy Accountants \| Guiding pharmacies towards financial wellness" (166 pharmacy mentions); sitemap shows a 2-page brochure site |
| pharmacistaccountants.co.uk | Locum pharmacists | "Pharmacist Accountant \| Accountants for Locum Pharmacists" — the only locum-dedicated brand found |
| hutchingsaccountants.com | Pharmacy buy/sell accounting | "Pharmacy Accountants \| Hutchings Accountants"; dedicated pharmacy-buyers + pharmacy-sellers pages; accountancy arm of the Hutchings broker group |
| stetsonaccountants.co.uk | Pharmacists UK (SEO play) | H1 "Accountants For Pharmacists UK - Tax, VAT & Payroll"; ~2,000-URL programmatic location sitemap |
| accountant4pharmacists.co.uk | Pharmacists (Salhan microsite) | Fetch blocked (private-IP resolution) → search-verified: "Salhan Pharmacists - Accounting for Pharmacists" |

## SECTION rivals (33) — the ones that shape strategy

Two blocked-but-important firms search-verified: **Lanop** (12 hits; dedicated "Accountants
for Pharmacists in UK | Tax & NHS Income" page with FP34/NHS-reimbursement language — the most
content-serious SECTION rival) and **3E'S Accountants** (12 hits; dedicated "Pharmacy
accountants in the UK" page + pharmacy blog posts, NHS contract negotiation pitch).
Heavyweights with healthcare sector teams: **Hazlewoods** (Top-35, long-standing pharmacy
team), **Hawsons**, **Larking Gowen**, **Lovewell Blake** (dedicated /pharmacy-accountants
page surfaced in search), **Xeinadin** (national consolidator; dedicated pharmacists industry
page; absorbed Silver Levene — its old pharmacy URLs now 301 to a Xeinadin office page, see
`raw/refetch_2026-07-11c.json`). Healthcare-specialist mid-tier: SIAL, Kudos, Samera (dental
group with a pharmacists page), MMBA, PKPI (/pharmacies). SEO-led online firms with pharmacy
or medical pages: Shreem ("Pharmacy Accountants UK | Up to £200/mo OFF"), A2Z, AccountingIN,
Cruse Burke, GoForma, Nexus, plus regional firms with dedicated pharmacy pages (Xitax,
Mazekey, ForwardLooking, Aequitas). Full list: `competitors.json`.

## ADJACENT brokers (3)

hutchings-pharmacy-sales.com ("the UK's leading Pharmacy sales agents", 266-URL listings
sitemap), modiplus-pharmacysales.co.uk (broker arm of Modi Plus accountants),
pharmacysalesuk.com. They own "pharmacy for sale" SERPs but not the tax/accounting side of
the transaction — our purchase/sale money pages attack that gap.

## Dropped at judgment (not accountancy rivals)

Directories/official: gov.uk, cpe.org.uk, nhsbsa.nhs.uk, chemistanddruggist.co.uk, NHS
domains, indeed/jobs. Own estate: medicalaccounts.co.uk (ranks for locum-pharmacist queries —
see TOPICS.md medical adjacency gate). Noise in survivors excluded from competitors.json:
search engines (bing, startpage click-tracker rows), tiktok, consumer/foreign pharmacies
(lifepharmacy.com UAE, apollopharmacy.in, hy-vee.com US), software/tools (PharmaDash,
Sessional, Locumr, AccountsOS), stocktakers (Orridge/RGIS, Alliance), locum agencies
(Pharm-Assist, Locate A Locum), finance brokers (Rangewell), and one-hit generalist
accountants with no pharmacy/healthcare page (left in `candidates.json`).

## Implications for the build (feeds LAUNCH_CORE.md)

1. **The dedicated tier is beatable**: mostly small brochure sites and one programmatic SEO
   play; only RX Virtual Finance and Pharmatax look content-serious. Full A* depth + tools +
   the index asset out-builds all seven.
2. **The real fight is healthcare-SECTION heavyweights** on head terms — but their pages are
   generic healthcare; pharmacy-specific depth (FP34, Category M, retail-scheme VAT) is the
   differentiation wedge (house positions A-B).
3. **Locum content**: only one dedicated rival (pharmacistaccountants.co.uk) plus our own
   medical site — confirms the LAUNCH_CORE call: locum = content audience, deduped against
   medicalaccounts.co.uk.
4. **Buy/sell moment**: brokers own listings, Hutchings own both sides (broker + accountancy
   arm) — the only integrated rival on the highest-value lead moment. Nobody has a purchase
   affordability calculator (CALCULATORS.md tool 1).
5. Nobody found publishes a data asset; the Openings & Closures Index lane (DATA_ASSET.md)
   is open.
