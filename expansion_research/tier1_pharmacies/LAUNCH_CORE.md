# Launch core — Pharmacies (R3)

Date: 2026-07-11. Volumes = R2D pulls (2026-07, `../r2d_volumes.json`) + same-day paid
enrichment (`raw/dfs_head_volumes.json`, `raw/dfs_keyword_suggestions.json`, DataForSEO
gl=GB, 2026-07-11 late evening). Competitive read = COMPETITORS.md. Positioning per R2 FINAL caveat:
**pharmacy BUSINESS owners + NHS contract accounting; locum pharmacists are content only.**

## Intent split: owner vs locum (the structural decision)

- **OWNER (lead audience).** Community pharmacy owners/buyers. Head cluster ~600/mo (R2D):
  "pharmacy accountant"/"pharmacist accountant" 210 CPC £11.49, "accountants for
  pharmacies"/"accountants for pharmacists" 90 CPC £11.60. Lead value 4 (R2B): sticky
  recurring compliance + the purchase/sale event. All lead forms, all money pages, all
  segment-specific optional form fields (stores count, items/month, buying or selling) are
  owner-side.
- **LOCUM (content audience, NO lead funnel at launch).** Paid pull CONFIRMS content-only:
  "accountants for locum pharmacists" 30/mo (CPC £7.79, KD 5) is the whole hire signal; the
  "locum pharmacist tax ..." family is 10/mo per variant and locum terms are absent from all
  three rivals' ranked sets. Autocomplete still shows a real question cluster ("are locum
  pharmacists self employed", "locum pharmacist ir35", "locum pharmacist limited company",
  "locum pharmacist how to pay tax"). Serves three jobs: topical authority breadth, the
  take-home comparator tool, and internal links into owner pages (today's locum is tomorrow's
  buyer — the natural bridge page is "locum to owner: buying your first pharmacy"). This split
  also keeps the site clear of the contractors-ir35 site's generic locum/PSC turf: everything
  locum here is pharmacist-specific (ESM4270, GPhC, day-rate norms).

## Site architecture

```
/                          Pharmacy accountants (head 210+210/mo, CPC ~£11.50)
/for/pharmacy-owners       community pharmacy owners hub (NHS contract economics frame)
/for/buying-a-pharmacy     THE high-value moment ("buying a pharmacy" 140/mo KD 59,
                           "buying a pharmacy uk" 70/mo KD 0, CPC £0.84-1.69)
/for/selling-a-pharmacy    exit side: BADR/CGT, goodwill ("selling a pharmacy" 30/mo
                           CPC £9.32 KD 7; "pharmacy valuation" 10-20/mo CPC £7.90-15.33;
                           "pharmacy goodwill" no measured volume)
/for/pharmacy-groups       multiple-store owners (associated companies, consolidation)
/for/locum-pharmacists     content hub only — status/IR35/MTD; tool link; no lead form v1
                           ("accountants for locum pharmacists" 30/mo CPC £7.79 KD 5)
/calculators/*             fleet per CALCULATORS.md (purchase affordability, FP34 cash-flow,
                           locum take-home first)
/research/pharmacy-index   UK Community Pharmacy Openings & Closures Index (DATA_ASSET.md)
/blog/*                    clusters below
```

BUSINESS-audience rule honoured: every /for/* page carries the owner (employer/contractor-
holder) frame, never the employee-pharmacist frame; career/salary queries are junk-gated out
of the pool.

## Intent classes

1. **HIRE** (lead pages): head terms + "pharmacy purchase accountant", "NHS pharmacy contract
   accounting", "pharmacy valuation accountant". CPC £11-12 with LOW-MED competition = real
   buyer money at beatable ad density.
2. **EVENT-PROBLEM** (assist + capture): buying/selling a pharmacy, valuation/goodwill,
   finance, due diligence. Highest lead value; brokers (Hutchings, pharmacysalesuk) own the
   listing side but not the tax/accounting side.
3. **OPERATOR-PROBLEM** (assist + capture): FP34/NHSBSA payment timing, Drug Tariff/Category M
   margin, pharmacy VAT mix, payroll, fit-out allowances. The "only a specialist writes this"
   layer; feeds calculators. Measured heads (2026-07-11): "fp34" 140/mo KD 0, "drug tariff"
   14,800/mo KD 37 (mostly professional look-up intent — treat as citation/GEO surface, not a
   money page); "category m clawback" and "pharmacy first payment" return no measured volume
   (long-tail, autocomplete-real).
4. **DIY-INFORMATIONAL** (authority + citations + GEO): "do pharmacies pay vat", "are
   pharmacies vat exempt", "do you pay vat on prescriptions", drug tariff month pages,
   pharmacy first payment. Never the success metric. Paid pull: both VAT question heads
   return no measured volume (below Google Ads reporting floor) — value is GEO/answer-box,
   not tracked-volume traffic.

## Launch core (26 pages + 3 tools + 1 asset)

**Hubs (6):** homepage + the five /for/* pages above. Heads from R2D + the 2026-07-11 paid
pull (volume lines in the architecture block). Note the intent trap in the sell cluster:
"pharmacy for sale" is 2,400/mo (CPC £0.75, MEDIUM) but that is buyer/broker-listing intent —
target it only as a supporting angle on /for/buying-a-pharmacy, never as a money head.

**Money/service pages (8):**
- Pharmacy purchase accounting & due diligence (deal support, finance-ready accounts)
- Pharmacy sale: CGT, BADR and deal structure
- Pharmacy valuation & goodwill: how pharmacies are priced (method-level, cited)
- NHS payment reconciliation (FP34/NHSBSA) service page
- Pharmacy VAT returns & retail schemes (zero-rated NHS vs standard OTC)
- Pharmacy payroll & workforce costs (employer NIC 15%/£5,000 angle)
- Incorporation & structure for pharmacy owners (incl. associated companies for groups)
- Pharmacy benchmarking & margin analysis (Category M/clawback literacy as the pitch)

**Blog clusters at launch (12 posts):**
VAT: do pharmacies pay VAT / are pharmacies VAT exempt (autocomplete cluster); VAT on private
services & Pharmacy First income. NHS economics: how the FP34 payment cycle works; Category M
and clawbacks explained; Drug Tariff changes (monthly-updatable format). Buying: buying a
pharmacy in the UK checklist (autocomplete: "buying a pharmacy uk/checklist/cost of");
first-time buyer finance; share vs asset purchase. Selling: preparing a pharmacy for sale;
goodwill and what it's worth. Locum: are locum pharmacists self-employed (ESM4270); locum
pharmacist limited company vs umbrella — **must be written pharmacist-specific and deduped
against medicalaccounts.co.uk's existing `locum-limited-company-vs-umbrella` guide (found
ranking in our own SERP sweep) and the contractors-ir35 corpus** — see TOPICS.md medical
adjacency gate.

**Tools at launch (3):** purchase affordability, FP34 cash-flow estimator, locum take-home
comparator (CALCULATORS.md launch tier).

**Asset (1):** UK Community Pharmacy Openings & Closures Index (DATA_ASSET.md) — also the
faceless data-PR channel.
