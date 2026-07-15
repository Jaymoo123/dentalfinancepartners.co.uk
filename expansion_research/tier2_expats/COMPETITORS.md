# Expats + non-residents UK tax, verified competitor landscape (R3, Tier-2)

Date: 2026-07-15. Niche: UK tax/accountancy for expats and non-residents (UK-outbound
movers, non-resident landlords, NRCGT, split-year/SRT, FIG regime, dual residence,
US-expats-in-UK). Method: 34 UK buyer-intent queries via DDG (`s1_serp_collect.py`,
raw in `raw/serp_raw.json`), script-filtered against `own_estate_exclusion.json`
(hard assert passed: **0 estate domains survived**; 1 estate hit, propertytaxpartners
.co.uk, correctly dropped at the filter) and a directory/info blocklist (14 dropped).
207 domains seen, 192 survivors, **all fetch-verified** (`s2_verify_fetch.py` →
`raw/verify_evidence.json`). Bot-blocked strategic domains classified from their own
DDG SERP titles/snippets, marked `verify_method: serp` in competitors.json.

**Anomaly (same as care run)**: Serper credits remain exhausted estate-wide, so this
sweep is DDG-only by design (zero paid calls, none attempted). Google-side positions
are under-sampled; a Google re-sweep is queued in DOSSIER.md TODO paid pulls.

Verdict tiers: **DEDICATED** = whole brand is expat/non-resident/cross-border personal
tax; **SECTION** = real multi-service firm with a dedicated expat/non-res practice or
page. Every rival also carries a **direction** label: UK_OUTBOUND (Brits leaving or
abroad), FOREIGN_INBOUND (foreign nationals with UK exposure, dominated by the
US-expat-in-UK layer), or BOTH. Machine-readable list with evidence:
`competitors.json` (**53 rivals: 25 DEDICATED + 28 SECTION**).

## Headline read

This is the most entrenched field surveyed so far, and the entrenchment is structural,
not just numeric. Three distinct layers stack on the same SERPs:

1. **A real dedicated UK cross-border tier (16 brands)**, from boutiques
   (Horizon UK Tax Solutions, LSR Partners, Global Tax Consulting, expat-tax-advice
   .co.uk) up to an institutional brand (Blevins Franks, UK-to-Europe wealth+tax) and
   a content-moat introducer network (expertsforexpats.com, 568 sitemap URLs, ranks
   for almost every informational query in the sweep).
2. **A US-expat-in-UK layer (9 dedicated brands)** with global scale players
   (Bright!Tax, Greenback, Taxes for Expats) plus London US/UK dual-handler firms
   (Xerxes, Jaffe & Co, Buzzacott's practice). These are FOREIGN_INBOUND and mostly
   unattackable (US filing capability is the product; we cannot credibly offer it).
3. **A big/mid-tier institutional layer** (BDO, Blick Rothenberg, AAB, Moore Kingston
   Smith, Buzzacott) that owns the technical head terms (split-year, NRCGT,
   leaving-the-UK planning) with deep, current content.

On top sits a **wealth/IFA adjacent layer** (Titan Wealth, Hoxton, Skybound, Holborn,
Harrison Brook and six more surfaced) that dominates "expat financial/pension advice"
intent and buys aggressively.

Where care was "contested with a young dedicated tier", this is **CONTESTED with an
old, layered, well-funded tier**. The R2 "entrenched" prior is confirmed, not
weakened, by the evidence. The exploitable seams are narrow: non-resident-landlord
compliance productisation (the strongest player there, UK Property Accountants,
collides with our own property site's turf), the brand-new FIG-regime content window
(post-non-dom rules still young, several rivals' content is remittance-basis-stale),
and interactive tools (no SRT day-count or split-year calculator surfaced from any
accountancy rival in the sweep).

## DEDICATED, UK cross-border practices (16)

| Domain | Direction | Evidence |
|---|---|---|
| globaltaxconsulting.co.uk | BOTH | Top domain of the sweep (12 hits); "Your UK Tax Advisor For International Tax Advice"; 91 expat-term mentions on homepage |
| expertsforexpats.com | UK_OUTBOUND | Introducer network, not a firm; 568-URL content moat; ranks across FIG/NRCGT/SRT informational queries |
| expat-tax-advice.co.uk | BOTH | Exact-match domain; "Moving to or from the UK? Get your tax right before you move." |
| expattaxes.co.uk | UK_OUTBOUND | "Simple, clear & stress-free tax advice for UK expats"; online consultation model |
| horizonukts.com | BOTH | "UK Expat & Non-Resident Tax Advisers"; CTA-led boutique; strong FIG-regime pages |
| lsrpartners.com | BOTH | "Expat and UK Tax Advice for Global Clients" |
| taxadvisorypartnership.com | BOTH | "Leading UK & US Tax Advisory Service"; separate blog subdomain thick with expat content |
| blevinsfranks.com | UK_OUTBOUND | Institutional UK-to-Europe wealth+tax brand (bot-blocked; SERP-classified); decades old |
| smcotax.com | BOTH | "SMCO Chartered Tax Advisors UK: Expat tax specialists" |
| expattax.co.uk | UK_OUTBOUND | "UK Expat Tax Advice for Britons Working Abroad"; small site |
| expatuktax.com | UK_OUTBOUND | "UK tax expertise for expatriates worldwide" |
| hodgensglobal.com | UK_OUTBOUND | "Ex-pat self-assessment and annual tax returns" |
| ukautax.com | UK_OUTBOUND | UK-Australia corridor specialist (bot-blocked; SERP-classified) |
| dual.tax | BOTH | "Avoid Double Taxation When Moving Abroad" |
| taxback.co.uk | UK_OUTBOUND | UK tax refunds/returns for expats |
| uktaxadvisor.com | BOTH | "UK Tax advice online for residents and expatriates" (weaker signal) |

## DEDICATED, US-expat-in-UK / US-firm layer (9)

brighttax.com, greenbacktaxservices.com, taxesforexpats.com, protaxconsulting.com
(global US preparers, all FOREIGN_INBOUND, first three bot-blocked and
SERP-classified); xerxesllp.com, jaffeandco.com, usukexpattax.com,
expatglobaltax.com, expatustax.com (London/UK-facing US-UK dual handlers).
These own "us expat tax uk" / "american expat tax advisor london" intent. Their
product is dual US+UK filing; an A* UK-only site cannot take this segment and
should not try (label them as a fenced-off sub-market, not a gap).

## SECTION firms (28, selected)

| Domain | Direction | Evidence |
|---|---|---|
| blickrothenberg.com | BOTH | Dedicated non-resident tax practice; owns technical head terms (bot-blocked; SERP-classified) |
| bdo.co.uk | BOTH | Leaving-the-UK / split-year authority content |
| buzzacott.co.uk | FOREIGN_INBOUND | Institutional London US/UK expat practice |
| aab.uk | BOTH | FIG regime + NRCGT advisory content |
| mooreks.co.uk | BOTH | US/UK + double taxation pages |
| ukpropertyaccountants.co.uk | FOREIGN_INBOUND | Strongest NRL-scheme productisation in the sweep: NRL service page + complete guides (bot-blocked; SERP-classified). **Collides with our property site's turf** |
| taxaccountant.co.uk | BOTH | Generalist tax firm, expats/landlords on homepage; 8 SERP hits |
| tca.co.uk (Wellden Turnbull) | BOTH | Non-dom/expat advice pages, SRT + FIG services |
| uklandlordtax.co.uk / landlordstax.co.uk / ptireturns.com | FOREIGN_INBOUND | Landlord-specialist firms with NRL service lines |
| stampdutylandtaxexperts.co.uk | FOREIGN_INBOUND | "UK Accountants For Non-Residents" page (SERP-classified) |
| pearllemontax.co.uk | UK_OUTBOUND | UK-to-Dubai HNW residency pSEO pages (agency-style; SERP-classified) |
| alliotts / alexander.co.uk / geraldedelman / accotax / aswatax / taxinnovations / petersonsims | mixed | Real firms with expat/international private client pages |
| taxd.co.uk / uktaxreturns.co.uk / sizeraccountants / rhjaccountants / sterlingandwells | mixed | Online SA filers with non-resident flows/content |
| accusolveaccountants.com / cgincorporations.com | FOREIGN_INBOUND | Non-resident company formation + tax |
| gtn.uk | BOTH | Global mobility (employer-side corporate, adjacent) |

## Adjacent players (not accountancy rivals, but own SERP real estate)

- **Expat wealth/IFA layer (11 surfaced)**: Titan Wealth International (7 hits),
  Skybound, Hoxton Wealth, Holborn Assets, Harrison Brook, TailorMade Pensions,
  Ross Naylor, Finance with JC, PCC Wealth, Global Investments, Adam Fayed. They
  dominate pension/wealth intent and blur into tax advice.
- **Mortgages/banking**: expatmortgages-uk.com, HSBC Expat.
- **Software**: sprintax.com (non-resident filing SaaS).
- **Content/affiliate**: britishexpatmoney.com; expertsforexpats.com doubles here.
- **Foreign-side advisers**: trustnri.in (India-side CA marketing UK FIG angles), a
  reminder every corridor has a home-country adviser competing for the same client.

## Drop log

- 1 estate domain (propertytaxpartners.co.uk) filtered, 0 leaked (hard assert).
- 14 directory/info domains dropped (gov.uk, LITRG, Investopedia, expatica, etc.).
- Non-rival survivors left unclassified in verify_evidence.json: generic local firms
  with zero expat mentions (ray, thomasbarrie, jermyn...), law firms (Michelmores,
  Charles Russell Speechlys, Kingsley Napley), lifestyle/junk (phuketexpatguide,
  surreyhills.org, taxtwerk), and SERP-redirect junk strings (2).
