# SPV Formation / Landlord Ltd Co Demand Map

Source: DataForSEO Labs (keywords_for_site x5 competitor domains, keyword_ideas x8 seeds), UK, en.
9,762 unique keywords after dedupe. Total spend: **$1.48** (well under $8 cap).
Files: `demand_corpus.csv` (full corpus), `raw/` (API responses).

## Bucket totals (raw, includes generic-tax noise pulled in by broad seeds)

| bucket | monthly volume | notes |
|---|---|---|
| other | 17,614,790 | seed drift (car tax, council tax etc) — noise, ignore |
| tools | 594,310 | mostly generic calculators (vat/income tax/loan) |
| form-now | 396,950 | mostly generic company registration/VAT reg, NOT SPV-specific |
| transfer-in | 386,880 | mostly generic CGT/stamp-duty calculators, NOT SPV-specific |
| run-the-company | 222,810 | generic corp tax / dividend terms |
| mortgages | 222,330 | mix of generic rate-shopping + real BTL/ltd-co mortgage terms |
| non-resident | 2,590 | thin |
| decide | 180 | near-empty |

**SPV-specific volume (keyword contains spv/buy-to-let/btl/limited company/property company/landlord/portfolio) — the number that actually matters:**

| bucket | SPV-specific volume | # terms |
|---|---|---|
| mortgages | 41,660 | 137 |
| form-now | 21,210 | 52 |
| transfer-in | 7,530 | 76 |
| run-the-company | 540 | 14 |
| non-resident | 280 | 16 |
| decide | 50 | 4 |

## Top terms, priority buckets (SPV-specific only)

**form-now**
- set up a limited company — 14,800 / cpc £55.64 / kd 26
- uk limited company registration — 2,900 / £53.61 / kd 70
- setting up a limited company online — 1,300 / £40.97 / kd 78
- private limited company registration — 480 / £55.43
- limited company vat registration — 390 / £17.21
- setting up limited company for buy to let — 110 / £6.80
- setting up a property company — 90 / £14.17
- setting up a limited company to buy property — 90 / £9.14
- buy-to-let company set up — 70 / £1.83
- private limited company registration uk — 70 / £82.42

**decide** (thin — essentially no volume)
- tax advantages of interest-only buy-to let mortgage — 20
- buy to let limited company vs personal — 10
- limited company vs personal buy to let — 10
- limited company vs personal buy-to let — 10

**transfer-in**
- stamp duty and buy to let — 1,300 / £1.44 / kd 18
- stamp duty on buy to let — 1,300 / £1.44 / kd 12
- stamp duty for limited company — 1,000 / £3.73 / kd 1
- stamp duty calculator limited company — 1,000 / £2.32 / kd 8
- stamp duty on buy to let property — 390 / £3.25
- transfer property into limited company — 390 / £2.57
- transfer property to limited company — 390 / £2.57
- capital gains tax on buy to let — 140 / £2.81
- landlords stamp duty — 140
- capital gains tax on buy to let property — 110 / £1.45

**non-resident**
- non resident landlord tax — 90 / £6.91
- non resident landlord tax returns — 30
- overseas landlord tax form — 20
- uk non resident landlord tax — 20
- uk limited company non resident director tax — 10
- (rest all ≤10/mo — bucket is genuinely thin, no page justifies a standalone cluster)

**mortgages** (largest SPV-specific pool, for reference — not asked for top-20 but the money bucket)
- buy to let mortgage — 27,100 (generic, high competition)
- limited company buy to let mortgage — 2,400 / £8.79
- ltd company buy to let mortgage — 2,400 / £8.79
- limited company buy-to-let mortgages comparison — 480 / £6.59
- limited company mortgage rates — 480 / £9.12
- btl mortgages for limited companies — 480 / £13.71

## Honest read

1. **Total demand is smaller than the seed list implied.** Once generic tax/company-registration/calculator terms are stripped out, the real "SPV formation" cluster is roughly 71k/mo across all buckets (mortgages 41.6k + form-now 21.2k + transfer-in 7.5k + the rest). This is a niche, not a mass-market vertical.
2. **Mortgages, not formation, is the money bucket.** "Limited company buy to let mortgage" and its variants carry the highest CPC-weighted, on-topic volume (£8-14 CPC, decent volume) and are the terms someone deep in the decision funnel (about to act) types. Formation content should exist to funnel into this, not stand alone.
3. **"decide" (should I / vs personal) is nearly dead** — 50/mo total. Nobody is Googling "should I set up an SPV" at scale; they've already decided by the time they search, or they get this answer from an accountant/forum, not search. Don't build a pillar page around this angle expecting search traffic.
4. **"form-now" is dominated by generic company-registration intent** (register a company uk, companies house registration) that isn't landlord-specific — those searchers want Companies House, not a landlord-focused funnel. The actually-targeted formation terms ("setting up limited company for buy to let", "setting up a property company") only total ~380/mo combined. Small.
5. **transfer-in is real but stamp-duty/CGT-calculator shaped**, not "how do I do a s162 incorporation relief transfer" shaped — nobody searched the technical trigger phrases at volume. The calculator-tool angle (stamp duty calculator limited company, 1,000/mo) is the highest-intent entry point here, more than educational content.
6. **non-resident is a non-starter as a standalone cluster** — 280/mo total, most terms ≤10-20/mo. Fold it into a section of a broader page, don't build a dedicated hub.
7. **Surprise:** competitor site-based discovery (provestor, getground, uklandlordtax, propertyspv, watsonknipe) returned mostly generic/irrelevant ranking keywords once volume-filtered (car tax, council tax, payday loans) — these sites rank broadly for tax-adjacent terms unrelated to SPV, not because they have deep SPV-specific keyword footprints. The real signal came from seed expansion, not site crawling.
8. **Bottom line:** if building one page, build it around the mortgage-comparison + formation-cost angle (highest CPC, real transactional intent, ~63k/mo combined), with stamp-duty/CGT calculators as secondary tools content. Skip a dedicated "should I incorporate" persuasion page and skip a non-resident hub — neither has search demand to justify the build.
