# care (carehometax.co.uk) coverage map, September 2026

Built to spec `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S3. Selection rules
from `NETNEW_PROGRAM.md` section 8. Ground truth from `docs/care/house_positions.md`.
Research only. Nothing was built, changed or deployed.

Data pulled 2026-09-27: Search Console 90 days (sc-domain:carehometax.co.uk), Bing Webmaster
query stats, `leads` (5 rows, test excluded), `web_sessions` 90 days UK humans with the bot gate,
`blog_topics` 652 rows, DataForSEO keyword volume and UK Google top-20. DataForSEO spend $0.139.

---

## One page

**Recommendation: build the 15 Wave 1 pages, but expect them to earn leads, not traffic. The care
niche is too small for the normal traffic test.**

**Buyer situations: 12.** Care home registrant, domiciliary agency founder, supported living or
supported accommodation operator, children's home operator, solo care personal assistant, established
operator wanting payroll and bookkeeping, care home buyer, care home seller, nursing home with an
FNC and CHC fee mix, care group deciding its VAT position, employer sponsoring overseas workers,
care franchise buyer.

**Cells: 69.** 25 covered, 5 partial, 39 missing. Coverage is strong on CQC registration, VAT
exemption, payroll and workforce, and the buy and sell services. It is thin or absent on supported
living, children's homes, the solo carer, company structuring and franchising, and those are exactly
where the real leads came from.

**Top 10 missing cells by demand** (UK monthly Google volume, DataForSEO, 2026-09-27):

| Missing cell | Target query | Volume |
|---|---|---:|
| NHS continuing healthcare and what it changes in your accounts | nhs continuing healthcare funding provider | 590 |
| Accountants for care franchisees (segment page) | home care franchise uk | 110 |
| Sole trader, partnership or limited company before you apply to CQC | cqc registration for new providers | 90 |
| CQC registration for domiciliary care: the finance side | cqc registration domiciliary care | 90 |
| Share purchase or asset purchase when you buy a care home | buying a care home share or asset purchase | 70 |
| What it costs to set up a care agency before the first invoice | how to set up a care agency | 70 |
| How to start a domiciliary care agency: the money decisions in order | how to start a domiciliary care agency | 50 |
| How to structure a supported living company before bidding for a framework place | how to start a supported living business | 50 |
| What a care business is worth: the multiples buyers use | care home valuation | 30 |
| Opening a children's home: the finance decisions Ofsted will test | how to start a childrens home | 20 |

**The number that changes the plan: 1 of 54 care queries we priced clears 100 searches a month.**
The standard rule says build only where demand sits between 100 and 5,000. On this site almost
nothing does. Building to that rule would mean building nothing. The case for building anyway is
that care converts at 45 leads per 1,000 UK humans, the third best rate in the estate, and the 5
leads we have are people with a decision worth thousands. Low volume, high value. The map keeps the
failed rule on every row so the choice is visible, not hidden.

**Segment pages proposed: 2 new, 11 in total.** The site already has 5 `/for` hubs and 6 `/services`
pages, which cover nine of the twelve situations. The two genuinely missing audiences are the solo
care personal assistant or support worker trading through a limited company, and the care franchisee.
A third, nursing homes, is partial: `/for/care-homes` touches it, so extend rather than add.

**Wave 1: 15 pages**, listed in build order in section 5. Segment pages first, then the decision
pages, then the supporting pages. Every one is 800 to 1,200 words per the coverage page spec.
Two of them need a new calculator built alongside.

**Two things worth knowing before the wave.** First, Bing already ranks this site in its top 10 on
VAT exemption and CQC viability questions while Google has it at average position 50 to 90 and zero
clicks in 90 days. The wave will read as a success on Bing months before Google shows anything.
Second, three of the five leads named supported living, supported accommodation or children's homes,
and the children's homes hub was the second busiest entry page on the site. That segment is under
served relative to what it brings in.

**One decision for you: do we accept building below the demand rule on this site?** If yes, Wave 1
goes ahead as listed. If no, care drops to three or four pages and the content budget moves to
another site.

---

## 1. Where the site stands

| | |
|---|---:|
| Blog posts | 19 |
| `/for` hubs | 5 (care homes, domiciliary care, supported living, children's homes, care startups) |
| `/services` pages | 6 |
| Calculators | 5 |
| Research pages | 3 |
| Topic pool rows | 652 (8 used) |
| UK humans, 90 days | 111 |
| Leads, 90 days | 5 (45 per 1,000) |
| Google impressions, 90 days | 2,671 |
| Google clicks, 90 days | 0 |
| Bing impressions on its reported queries | 291, with 15 clicks |

Note on the prompt for this task: it said the site has two services pages. The code has six
(`care/web/src/data/care-services.ts`). The inventory below is from the code.

Note on the Bing figures: they come from `GetQueryStats`, which returns only the top-N queries, not
site totals (memory `bing_query_stats_topn_trap`). Every query it returned sits at average position
1 to 10. Treat 291 as a floor, not a total.

### What Google shows us for

Top earning queries, 90 days, all at zero clicks:

| Query | Impressions | Average position |
|---|---:|---:|
| care home accountants | 465 | 74.2 |
| care home tax advice | 218 | 74.1 |
| accountant for care homes | 141 | 87.6 |
| capital allowances for care homes | 128 | 53.7 |
| how to set up a care agency | 113 | 63.8 |
| accountants for care homes | 110 | 78.5 |
| how to start a domiciliary care agency | 75 | 58.3 |
| setting up a care agency | 70 | 66.1 |
| cqc registration fees domiciliary care | 67 | 54.2 |
| cqc financial viability statement | 64 | 9.0 |

The "starting a care agency" family is the biggest cluster we already earn impressions on, about
560 impressions across nine variants, all at position 54 to 76, and there is no blog post whose
subject is that question. That is the clearest single content gap on the site.

### What Bing shows us for

Bing returns us at average position 1 to 10 on care VAT exemption, CQC financial viability, capital
allowances, FNC rates and staffing calculators. Same corpus, same pages. This matches the estate
pattern on medical and construction-cis: judge new care pages on Bing at 28 days, on Google at 90.

### Where our own URLs sit in a live UK Google top 20

Checked on 14 buyer queries. We appear twice: `/services/cqc-financial-viability-statement` at 7 for
"cqc financial viability statement", and `/services/care-vat-review` at 17 for "care home vat
exemption". Absent from the other 12, including "care home accountant", "buying a care home",
"how to start a domiciliary care agency" and "how to start a supported living business".

A peer specialist site holds a top-20 slot on all 14 queries, so NETNEW rule 2 passes everywhere.
Examples: hawsons.co.uk and pricebailey.co.uk on "care home accountant", lovewell-blake.co.uk and
blog.shorts.uk.com on "care home vat exemption", lovellconsulting.com on "care home capital
allowances", davidsonmorris.com on "care worker sponsor licence cost".

### Who actually contacted us

Five leads in 90 days, all through `/contact`, read for meaning only:

- A new supported accommodation business on a council approved list for care leavers, service is
  accommodation and support rather than personal care. Wanted company structuring and, once a
  contract lands, a lender-ready 24 to 36 month forecast. Explicitly did not want bookkeeping yet.
- A new care company preparing for its solicitor and its CQC submission, wanting registration
  support plus accounts and payroll set up.
- A care and support personal assistant working with disabled children, limited company for two
  years, asking whether and when VAT registration bites.
- An operator wanting accounting, bookkeeping, payroll, filing and help reducing costs.
- One with no message.

Three of five are pre-trading or newly formed. None is an established care home group. The site's
content centre of gravity (care home operations, fee mix, capital allowances) is aimed at a buyer
who is not the one filling in the form.

### Traffic by entry page, 90 days, UK humans

| Entry page | Sessions | Leads |
|---|---:|---:|
| /blog/.../business-rates-care-homes | 28 | 0 |
| /for/childrens-homes | 26 | 1 |
| / | 24 | 3 |
| /calculators/care-staffing-cost-margin-calculator | 11 | 0 |
| /blog/.../care-home-vat-exemption-edge-cases | 11 | 0 |
| /research/uk-care-density-quality-index | 10 | 0 |
| /services/care-vat-review | 7 | 0 |
| /for/supported-living | 6 | 0 |

The homepage and the children's homes hub produce the leads. Blog posts produced none, which is
consistent with the fact that care blog posts render no lead form at all (programme spec S2).

### ChatGPT

The programme baseline has care named 6th of 6 for "accountant specialising in care homes",
alongside Menzies, Bishop Fleming, Hawsons, LOYALS and The Care Home Accountants. Named, but last.
The estate pattern is that assistants cite segment pages, not homepages, so the two new segment
pages and the four supported living and children's home pages are the direct lever on that position.

---

## 2. The twelve buyer situations

| # | Situation | Evidence it exists | Cells | Missing |
|---|---|---|---:|---:|
| 1 | First-time care home operator going through CQC registration | leads, GSC CQC cluster, `/for/care-startups` | 9 | 4 |
| 2 | Founder starting a domiciliary care agency | GSC 560 impressions on the start-an-agency cluster, services page | 8 | 5 |
| 3 | Supported living or supported accommodation operator on a local authority framework | lead 2026-08-20, `/for/supported-living` | 6 | 5 |
| 4 | Children's home operator registering with Ofsted | 26 entries and 1 lead on `/for/childrens-homes` | 6 | 4 |
| 5 | Solo care personal assistant or support worker trading through a limited company | lead 2026-07-22 | 5 | 2 |
| 6 | Established operator wanting bookkeeping, payroll and cost control | lead 2026-08-26, `/services/care-payroll` | 9 | 3 |
| 7 | Buyer of an existing care home | `/services/buying-a-care-home`, 320 a month on the head term | 6 | 3 |
| 8 | Owner selling or exiting a care business | `/services/selling-a-care-home` | 4 | 3 |
| 9 | Nursing home operator managing the FNC, CHC and LA fee mix | GSC nursing home queries, FNC calculator | 5 | 2 |
| 10 | Care group deciding its VAT position | Bing top-10 VAT cluster, `/services/care-vat-review` | 5 | 3 |
| 11 | Employer sponsoring overseas care workers | pool rows, one blog post | 3 | 1 |
| 12 | Buyer of a care franchise | 49 pool rows, 110 a month, no page anywhere | 3 | 3 |

---

## 3. The inventory the map was diffed against

**Blog, 19 posts.** Agency staff costs and occupancy; business rates; capital allowances on fit-out;
care business survival rates; bed supply and care deserts; VAT exemption edge cases; provider
formation trends; care worker pay rates 2026-27; CQC consultant vs accountant; CQC financial
viability walkthrough; CQC registered manager money and paperwork; CQC registration costs; CQC
registration financial leg; CQC registration timeline and cash burn; FNC, CHC and LA fee mix; MTD
for care owner-operators; Ofsted vs CQC; sleep-in pay and travel time; sponsoring care workers.

**`/for` hubs, 5.** care-homes, domiciliary-care, supported-living, childrens-homes, care-startups.

**`/services`, 6.** cqc-financial-viability-statement, care-payroll, care-vat-review,
buying-a-care-home, selling-a-care-home, start-a-domiciliary-care-agency.

**Calculators, 5.** cqc-fee-calculator, care-staffing-cost-margin-calculator,
true-cost-care-hour-calculator, sleep-in-shift-nmw-compliance-calculator,
funded-nursing-care-fee-mix-calculator.

**Research, 3.** UK Care Home Density and Quality Index, Care Provider Business Index, UK Care
Business Survival Index.

**Pool, 652 rows.** 8 used. Only 10 rows carry a volume of 100 or more, and most of those are CQC
registration variants already covered. Cluster counts: care home 163, CQC 106, nursing 97, funding
85, workforce 81, buying and selling 53, franchise 49, domiciliary 33, supported living 29, VAT 24,
sponsorship 16, children's homes 6, Ofsted 2. The franchise cluster is 49 rows against zero pages.

Subject match was used, not slug tokens (NETNEW section 8.2 rule 4).

---

## 4. Eligibility, and the rule this site fails

Every missing cell was tested against the four NETNEW rules. The results:

- **Rule 1, we are absent.** Fails on the care agency startup cluster, capital allowances, business
  rates, care home accountant, nursing home accountant and raising finance. We already earn
  impressions there, at position 54 to 88. Recorded, not dropped. For these the page is still the
  right action because no page of ours is the subject; the impressions come from adjacent pages.
- **Rule 2, a peer ranks top 20.** Passes on all 14 queries checked. No cell fails this.
- **Rule 3, demand between 100 and 5,000 a month.** Fails on 37 of 39 missing cells. Of 54 care
  queries priced, one clears 100 and is operator-facing ("home care franchise uk", 110); one clears
  100 and is mostly consumer-facing ("nhs continuing healthcare funding", 590); the rest sit at 0 to
  90. This is the defining fact about the site.
- **Rule 4, no page of ours is the subject.** Fails on 25 cells, which is why they are marked
  COVERED rather than missing.

Cells that fail a rule are kept in the map with the reason in the `eligibility_rule_failed` field of
the JSON, exactly as the spec requires. None were dropped.

**What this means for measurement.** The NETNEW kill criterion is a cohort median of 200 impressions
per 90 days. On this niche that bar is unreachable by arithmetic, not by quality: the whole care
corpus earned 2,671 Google impressions in 90 days. If the Wave 1 cohort is judged on that bar it
will fail regardless of how good the pages are. Recommend judging this site's cohort on Bing
impressions at 28 days and on leads per 1,000 UK humans, and recording that departure explicitly
before the wave runs.

---

## 5. Wave 1: the first 15

In build order. Segment pages first, then decisions, then supporting pages. All 800 to 1,200 words
per the coverage page spec (NETNEW 8.3). Volume is UK monthly Google, DataForSEO 2026-09-27.

| # | Working title | Type | Target query | Vol | Calculator | House positions |
|---|---|---|---|---:|---|---|
| 1 | Accountants for self-employed carers and personal assistants | segment page | personal assistant care limited company | 0 | | HP3, HP9, HP18, HP28 |
| 2 | Accountants for care franchisees | segment page | home care franchise uk | 110 | | HP1, HP4, HP18 |
| 3 | How to start a domiciliary care agency: the money decisions in order | decision | how to start a domiciliary care agency | 50 | | HP1, HP3, HP21, HP22 |
| 4 | How to structure a supported living company before bidding for a framework place | decision | how to start a supported living business | 50 | | HP18, HP26, HP28 |
| 5 | Sole trader, partnership or limited company before you apply to CQC | decision | cqc registration for new providers | 90 | | HP18, HP21, HP28 |
| 6 | Supported accommodation that is not personal care: who registers you and what changes for tax | decision | supported accommodation ofsted registration | 10 | | HP1, HP21 |
| 7 | Do you charge VAT on domiciliary care | decision | is domiciliary care vat exempt | 10 | | HP1, HP3, HP4 |
| 8 | Opening a children's home: the finance decisions Ofsted will test | decision | how to start a childrens home | 20 | | HP18, HP21 |
| 9 | VAT grouping in care after Revenue and Customs Brief 2/2025 | decision | vat grouping care industry hmrc | 0 | | HP1, HP2 |
| 10 | Does a care personal assistant have to register for VAT | decision | vat threshold care services | 0 | | HP1, HP3, HP4 |
| 11 | Business Asset Disposal Relief at 18%: what selling a care business costs from April 2026 | decision | business asset disposal relief care home | 0 | | HP18, HP19 |
| 12 | What it costs to set up a care agency before the first invoice | question | how to set up a care agency | 70 | existing CQC fee calculator | HP11, HP12, HP21 |
| 13 | CQC registration for domiciliary care: the finance side | question | cqc registration domiciliary care | 90 | | HP21, HP22 |
| 14 | A lender-ready 24 to 36 month forecast for a supported living contract | number | supported living business plan | 10 | new: 36-month contract forecast model | HP11, HP12, HP18, HP26 |
| 15 | NHS continuing healthcare: what changes in your accounts when a resident is CHC funded | question | nhs continuing healthcare funding provider | 590 | | HP1, HP25 |

Why these fifteen and not the highest-volume fifteen: rows 1, 4, 6, 10 and 14 come straight out of
what the five leads actually asked for, rows 3, 12 and 13 sit on the one cluster where Google already
gives us 560 impressions, row 8 sits behind the second busiest entry page on the site, rows 7, 9 and
11 sit on the Bing cluster where we already hold top-10 positions, and rows 2 and 15 are the only two
cells that pass the demand rule outright.

Two new calculators are implied, row 14 and (in the later list) a 24-month registration cash-flow
model. Both are the same underlying model with different horizons; build one, configure two.

## 6. The rest of the manifest

24 further missing or partial cells, ordered inside each situation in the JSON, marked `later`.
The largest clusters in that list are: the care franchise cost comparison and year-one cost pages
(49 pool rows, no coverage); supported living VAT and local authority fee reviews; children's home
cash flow, placement fees and acquisition; the sponsored-worker cost-per-head model and cost recovery;
care home valuation, due diligence, share versus asset purchase and raising finance; partial exemption
and de minimis; holiday pay for irregular hours; director salary and dividends; corporation tax and
marginal relief; the SIC code question; and the nursing home segment page as an extend on
`/for/care-homes`.

26 cells are marked `not_eligible`: a page of ours is already the subject and the correct action is
extend, not add. These are listed in the JSON with their existing page path so a later extend pass
has the diff ready.

---

## 7. Ground truth and claims

Every figure referenced in this map traces to `docs/care/house_positions.md` (HP1 to HP30, locked
2026-07-12) or to the primary source that file cites. The map asserts no new tax figures. It makes no
claim about the firm, its size, its clients or its results, per `ESTATE_CLAIMS_INTEGRITY`.

Positions the Wave 1 pages will lean on most: HP1 to HP4 (welfare exemption, RCB 2/2025 grouping
challenge, the £90,000 taxable turnover test, partial exemption de minimis), HP18 (corporation tax
19% and 25% with marginal relief), HP19 (BADR at 18% from 6 April 2026), HP21 and HP22 (CQC
registration and the financial viability statement), HP25 (NHS continuing healthcare), HP26 (Care Act
fair cost of care), HP28 (dividend rates from 6 April 2026).

Default jurisdiction is England. Scotland, Wales and Northern Ireland are flagged, never silently
mixed. That rule applies to all fifteen briefs.

---

## 8. Spend and provenance

DataForSEO: $0.09 for one Google Ads search volume task covering 54 keywords, $0.049 for 14 live UK
Google organic top-20 pulls. **Total $0.139**, against a $2 budget.

Free sources: Search Console API 90 days (read only, nothing written to `gsc_query_data`), Bing
Webmaster `GetQueryStats`, Supabase read-only queries on `leads`, `web_sessions` and `blog_topics`,
and the repository itself for the page inventory.
