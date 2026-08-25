# FLOOR 8: competitor re-read (rural / landed-estates cluster)

`REWRITE_PROGRAM.md` §9.9 item 8. Run 2026-08-21, post-fix, against the surfaces
as they sit on disk.

**Deterministic requirement:** every heading theme on any competitor owner page in
the cluster is marked `covered` / `declined` / `belongs-elsewhere`, and the
UNDECIDED count is zero.

**Result: 72 themes. covered 46, declined 19, belongs-elsewhere 4, UNDECIDED 3.
THE FLOOR IS NOT MET.** The three undecided themes are listed in full at the
bottom. They are not forced into a bucket, because no honest bucket exists for
them: none is conceded by DOSSIER §1, none is off-niche, and no surface of ours
answers them.

## Method

Themes extracted from the `h2_h3` arrays of every page in `owner_pages` of
`_teardown_saffery.json` (12 pages) and `_teardown_oldmill.json` (23 pages),
paraphrases deduplicated, boilerplate headings ("Get in touch", "Latest
Insights", author name blocks, related-post H3s) excluded as non-themes. Every
`covered` verdict was checked by reading the named surface, not by assuming the
heading implies the answer. Where a competitor gives a theme a heading and we
answer it only inside a body paragraph or an FAQ, the verdict is `covered` with
`(thin)` recorded in the where/why column.

### Competitor page keys

| Key | Page |
|---|---|
| SAF-APR | saffery `/insights/articles/agricultural-property-relief/` (top-10: `agricultural property relief` p4) |
| SAF-BPR | saffery `/insights/articles/business-property-relief/` (top-10: `bpr` p4) |
| SAF-REF | saffery `/insights/articles/agricultural-property-relief-and-business-property-relief-reforms-from-6-april-2026/` (top-10: `apr and bpr` p2) |
| SAF-QUAL | saffery `/insights/articles/does-my-business-qualify-for-business-property-relief/` |
| SAF-WOOD | saffery `/insights/articles/commercial-woodland-tax-incentives/` |
| SAF-SUCC | saffery `/insights/articles/farm-succession-planning/` |
| SAF-ACRES | saffery `/insights/news/over-4-8-million-acres-of-uk-farmland-at-risk-from-iht-reforms/` |
| SAF-VAL | saffery `/insights/news/business-property-relief-and-agricultural-property-relief-remain-valuable-despite-future-changes/` |
| SAF-25M | saffery `/insights/news/planned-cap-on-apr-and-bpr-inheritance-tax-reliefs-raised-to-2-5m/` |
| SAF-BUD | saffery `/insights/articles/autumn-budget-2024-for-individuals/` (live H1: Autumn Budget 2025) |
| SAF-FARMBUD | saffery `/insights/articles/farm-budgeting-why-its-never-been-more-important/` |
| SAF-LOCK | saffery `/insights/case-studies/inside-lockerley-estates-regenerative-farming-vision/` |
| OM-BPR | om.uk `/business-property-relief-bpr/` (top-10 owner page, still states £1m as current law) |
| OM-BPRRE | om.uk `/insight/do-you-need-to-re-evaluate-business-property-relief-bpr-in-your-estate-plan/` |
| OM-BPRCH | om.uk `/insight/how-the-recent-changes-to-business-property-relief-bpr-may-impact-you/` |
| OM-WILLS | om.uk `/insight/farm-wills-inheritance-disputes/` (Old Mill's highest-mention owner page, 58) |
| OM-TRUSTS | om.uk `/insight/how-trusts-can-still-be-used-to-mitigate-inheritance-tax-hikes-for-farming-families/` |
| OM-IHTPOS | om.uk `/insight/review-your-inheritance-tax-position/` |
| OM-DRAFT | om.uk `/insight/what-the-new-draft-legislation-on-apr-and-bpr-could-mean-for-you/` |
| OM-BUD24 | om.uk `/insight/autumn-budget-2024-inheritance-tax/` |
| OM-DIV | om.uk `/insight/farm-diversification-tax/` |
| OM-DIVG | om.uk `/insight/farm-diversification-guide/` |
| OM-SHOP | om.uk `/insight/opening-a-farm-shop/` |
| OM-SUCC1..5 | om.uk practical-guide / successor-early / next-generation-concerns / young-farmers / financial-strategy succession pages |
| OM-STRUCT | om.uk `/insight/thoughts-on-business-structures-for-the-farms-future/` |
| OM-FINPLAN | om.uk `/insight/farming-financial-planning/` |
| OM-FIC | om.uk `/insight/family-investment-companies-fic-as-an-inheritance-tax-solution/` |
| OM-TEN | om.uk `/insight/farm-tenancy/` |
| OM-HUB | om.uk `/sectors/farming/` |
| OM-TIPS | om.uk `/insight/five-top-tips-to-help-you-make-the-right-decision-for-your-farming-business/` |
| OM-COVID | om.uk `/insight/covid-19-practical-guidance-for-our-rural-and-farming-clients-11-20-05-20/` |

### Our surface keys

| Key | Surface |
|---|---|
| PILLAR | `Property/web/src/app/landed-estates/page.tsx` |
| CALC | `Property/web/src/lib/calculators/tools/bpr-apr-allowance-calculator.ts` |
| N1 | `Property/web/content/blog/inheritance-tax-on-farms.md` |
| N2 | `Property/web/content/blog/farm-tax-uk-guide.md` |
| N3 | `Property/web/content/blog/how-to-avoid-inheritance-tax-on-a-farm.md` |
| E1 | `Property/web/content/blog/maximising-business-relief-to-reduce-inheritance-tax.md` |
| E2 | `Property/web/content/blog/agricultural-relief-for-inheritance-tax-key-benefits.md` |
| E3 | `Property/web/content/blog/iht-april-2026-bpr-apr-cap-property-impact.md` |
| MIXED | `Property/web/content/blog/agricultural-property-relief-mixed-estate-1m-cap.md` (E4, dropped to delta, live, linked from PILLAR and E2) |

## The table

| # | Theme | Source competitor page | Verdict | Where / why |
|---|---|---|---|---|
| 1 | What agricultural property relief is, and the rate | SAF-APR | covered | E2 H2 "What is agricultural property relief?" |
| 2 | What does not qualify as agricultural property (exclusions) | SAF-APR | covered | E2 H2 "Does your land actually qualify?" and "Why the relief covers less than your land is worth" |
| 3 | Does a farmhouse qualify (character-appropriate test) | SAF-APR | covered | E2 H2 "Does your farmhouse qualify?", McKenna cited, 21 farmhouse references |
| 4 | Land in environmental / stewardship schemes and APR | SAF-APR | declined | conceded-scope (DOSSIER §1: BPS/SFI, natural capital). PILLAR "What we do not cover" names environmental schemes explicitly. See thin-decline note below |
| 5 | Diversification and its effect on the relief | SAF-APR, OM-DIV, OM-DIVG | covered | E2 H2 "What if part of your farm is a business rather than a farm?" (farm shop, B&B, wedding venue, contract farming, energy) plus N2 H2 "Which diversification income counts as property income?" |
| 6 | Grazing licences and the occupation test | SAF-APR | covered | E2, 6 grazing references inside the occupation/two-year section |
| 7 | Agricultural value against market and hope value | SAF-APR | covered | E2 H2 "Why the relief covers less than your land is worth"; 20 agricultural-value references, hope value named; CALC strips it |
| 8 | BPR picking up what APR does not reach | SAF-APR, SAF-BPR | covered | E2 "What if part of your farm is a business rather than a farm?" plus E1 H2 "How is the allowance split between agricultural and business property relief?" |
| 9 | Debts: how liabilities are allocated against relieved property | SAF-APR (H3 Debts), SAF-BPR (H3 Debts) | **UNDECIDED** | see finding 1 |
| 10 | Clawback where the donee sells or the property stops qualifying | SAF-APR (H3 Clawbacks), SAF-BPR (H3 Clawbacks) | belongs-elsewhere | MIXED covers s.124A in the body, the statute table and a dedicated FAQ; E2 and PILLAR both link MIXED |
| 11 | Summary / recap of the relief | SAF-APR | covered | E2 "What to do next"; PILLAR in-force table |
| 12 | What business property relief is | SAF-BPR, OM-BPR, OM-BPRRE | covered | E1 H2 "What is Business Property Relief?" |
| 13 | Who qualifies, and what counts as a business | SAF-BPR, SAF-QUAL | covered | E1 H2 "What qualifies for business property relief?" |
| 14 | Relevant business property categories and the 100/50 rates | SAF-BPR, SAF-QUAL | covered | E1, 7 relevant-business-property references with the rate split |
| 15 | Worked BPR examples | SAF-BPR | covered | E1 H2 "A worked example: what this costs a £3,800,000 estate" with both branches |
| 16 | Excepted assets | SAF-BPR, SAF-QUAL | covered | E1 H3 "Surplus assets sitting inside the company" plus FAQ "What are excepted assets, and how much do they cost?" (s.112) |
| 17 | Trading against investment, the 50% rule, Pawson | SAF-QUAL | covered | E1 H2 "Does your property business qualify? The Pawson line"; E3 (16 Pawson refs); PILLAR landlords section |
| 18 | Ownership period, replacement property, spouse credit | SAF-QUAL, SAF-APR | covered | E1 H3 "Getting the two-year rule wrong in both directions" plus FAQ on inherited-spouse ownership; E2 H2 "How long must you have owned or farmed it?" with two-in-five and seven-in-ten |
| 19 | How business structure affects eligibility (sole trader, partnership, company) | SAF-QUAL, OM-STRUCT, OM-SUCC4 | covered (thin) | E1 H3 "Assuming a company wrapper creates relief"; E3 "review business structures". Three competitor pages against one H3 of ours |
| 20 | How APR and BPR reduced IHT before the reform | SAF-REF | covered | E3 H2 "What changed on 6 April 2026: the cap mechanics"; PILLAR in-force table gives the before/after |
| 21 | The £2.5m allowance from 6 April 2026 for individuals | SAF-REF, SAF-25M, OM-TRUSTS, OM-DRAFT, OM-BPRCH | covered | PILLAR in-force table row 1; N1 H2 "What does the £2.5 million allowance actually cover?"; E3; CALC |
| 22 | Actions to consider / planning responses | SAF-REF, SAF-25M, OM-DRAFT, OM-BPRRE | covered | N3 H2 "What to do before this tax year ends"; E3 H2 "Planning responses for affected estates"; PILLAR "Where to start" |
| 23 | Trusts: one allowance across same-settlor trusts | SAF-REF, OM-TRUSTS | covered | PILLAR in-force row "One allowance across same-settlor trusts"; N3 H3 "Splitting the farm across several trusts"; E3 |
| 24 | The trust allowance figure, and the superseded £1m trust number | SAF-REF, OM-DRAFT | covered | PILLAR in-force row "The £1 million figure", status "Superseded, never enacted at that level"; E3 |
| 25 | Trust ten-year and exit charges | SAF-REF | covered | E3, ten-year and exit-charge treatment in the trust section |
| 26 | Succession: passing the farm on, and when | SAF-SUCC, OM-SUCC1, OM-SUCC2, OM-SUCC3, OM-SUCC5 | covered (thin) | N3 H2 "When should you hand the farm on?". Five competitor owner pages against one H2 of ours |
| 27 | Selling the farm: CGT, roll-over, holdover | SAF-SUCC | covered | N2 H2 "Do you pay capital gains tax when you sell farmland?" with TCGA s.152 and s.165 and a worked figure |
| 28 | Farmland values and acreage at risk from the reform | SAF-ACRES | belongs-elsewhere | `farmland-supply-value-drops-is-iht-reform-to-blame`, linked from PILLAR "How do gifts and trusts change your allowance?" |
| 29 | The reliefs remain valuable despite the changes | SAF-VAL | covered | N1 H2 "Will your family farm pay inheritance tax?"; PILLAR hero |
| 30 | The cap rose from £1m to £2.5m, and stale £1m coverage | SAF-25M, OM-BPR, OM-DRAFT | covered | N1 H2 "Why do some pages still say the cap is £1 million?"; PILLAR in-force superseded row; this is the cluster's stated wedge against OM-BPR |
| 31 | Autumn Budget roundup for individuals | SAF-BUD | declined | news-cycle (DOSSIER §2 screen) |
| 32 | Farm budgeting, cashflow, harvest volatility, trade deals | SAF-FARMBUD | declined | conceded-scope: farm accountancy (DOSSIER §1) |
| 33 | Grant funding for farms and for diversification | SAF-FARMBUD, OM-DIV, OM-DIVG | declined | conceded-scope: BPS/SFI and land-agent territory; PILLAR names it |
| 34 | Regenerative farming and natural capital | SAF-LOCK | declined | conceded-scope: natural capital (DOSSIER §1) |
| 35 | BPR advice service page and conversion block | OM-BPR | covered | PILLAR CTA section plus the `/services/property-tax-advice` link |
| 36 | Providing for non-farming children while the farm goes to the farming child | OM-WILLS | **UNDECIDED** | see finding 3 |
| 37 | Restructuring or dividing the farm on succession | OM-WILLS | covered (thin) | E3 ownership-split passage (qualifying property to children on the first death); E1 note that allocation should be settled before a will is drafted |
| 38 | Outlying land with development potential | OM-WILLS | covered (tax slice) | E2 and N2 strip hope and development value from agricultural value; CALC does the same. The succession use of development land as the equalising asset sits under theme 36 |
| 39 | Whole-of-life policy to fund the bill | OM-WILLS, OM-TRUSTS | covered | N3, whole-of-life written in trust, with the "neither reduces the tax" caveat; E3 FAQ |
| 40 | Commercial woodland: inheritance tax and woodlands relief | SAF-WOOD | **UNDECIDED** | see finding 2 |
| 41 | Commercial woodland: income and corporation tax | SAF-WOOD | declined | off-niche: not property tax, and outside the term family's "woodland (IHT/relief only)" bound |
| 42 | Commercial woodland: CGT on standing timber | SAF-WOOD | declined | off-niche, same bound |
| 43 | Types of woodland (amenity, short rotation coppice, ancient / SSSI) | SAF-WOOD | declined | off-niche, same bound |
| 44 | Tree planting targets and policy context | SAF-WOOD | declined | news-cycle and off-niche |
| 45 | Next-generation concerns and young farmers' careers | OM-SUCC3, OM-SUCC4 | declined | off-niche: not a tax theme; DOSSIER §5 names working farmers as not our audience |
| 46 | APR and the residence nil-rate band | OM-SUCC5 | covered | E3 covers the RNRB interaction; MIXED covers the £2m taper at s.8D(5) |
| 47 | SIPPs, SSAS and pension planning for farmers | OM-SUCC5, OM-FINPLAN | declined | regulated financial advice, outside the property-tax half. The tax-relevant slice (pension IHT inclusion from April 2027) is covered on E3 |
| 48 | No successor: sale or contract farming | OM-SUCC5 | covered (thin) | N2 CGT-on-sale section; E2 names contract farming in the mixed-estate list |
| 49 | VAT on diversification and on farm rents | OM-DIV, OM-DIVG, OM-TEN | declined | conceded-scope: farm accountancy; N2 signposts the boundary in one sentence |
| 50 | Income or corporation tax on diversified profits | OM-DIV | covered (property half only) | N2 "Which diversification income counts as property income?" draws the property-income line; trading-profit computation is conceded |
| 51 | CGT consequences of diversifying | OM-DIV | covered | N2 CGT section |
| 52 | Limiting liability / choosing a structure for a diversified venture | OM-DIVG | covered (thin) | E1 company-wrapper section |
| 53 | Farm shop operating rules (skills, location, market, margins) | OM-SHOP, OM-DIV | declined | off-niche: business operations, not tax |
| 54 | Anti-forestalling and transfers after 30 October 2024 | OM-TRUSTS, OM-IHTPOS, OM-BUD24, SAF-REF | covered | E3 H2 "Anti-forestalling rules and the legislative pipeline"; PILLAR in-force row; the three-condition test is stated identically on N1, N3, E1, E2, E3 and CALC |
| 55 | Paying inheritance tax by instalments over ten years | OM-TRUSTS | covered | N3, instalment option with the interest and land-sale trigger |
| 56 | Case study: what the cap costs a farming couple | OM-TRUSTS | covered | N1 H2 "What if you are married or in a civil partnership?"; E2 Whitfield £2.4m worked example; E3 mixed-estate example |
| 57 | Use a trust before it is too late / lock in relief | OM-TRUSTS | covered (counter-position) | N3 H3 "Splitting the farm across several trusts" under "What does not work?". Deliberate opposite of Old Mill's line, post-commencement |
| 58 | Wills, gifting and ownership review | OM-TRUSTS, OM-IHTPOS | covered (tax slice) | E1 and E3 on allocation before the will is drafted. The drafting and family-agreement slice is theme 36 |
| 59 | What if I miss the deadline | OM-TRUSTS | covered | E3: the window closed on 6 April 2026, and the position is stated as in force rather than as a countdown |
| 60 | Understand your position, review your affairs | OM-IHTPOS | covered | PILLAR "Where to start"; N2 "Where should you start?" |
| 61 | Later-life and care-fee planning | OM-IHTPOS | declined | off-niche: not property tax |
| 62 | What the draft legislation told us / legislative pipeline | OM-DRAFT | covered | E3 H2 "Anti-forestalling rules and the legislative pipeline" |
| 63 | Frozen nil-rate bands to 2030/31 | OM-BUD24 | belongs-elsewhere | `residence-nil-rate-band-frozen` and `iht-property-investors-decision-framework-2026-onwards` |
| 64 | AIM shares: 50% sub-tier outside the allowance | OM-BUD24, SAF-REF | covered | PILLAR in-force row; N3 H2 "Do AIM shares still do anything for a farming estate?"; E1; E3; CALC models it as a separate tier |
| 65 | Family investment companies as an IHT solution | OM-FIC | belongs-elsewhere | `fic-iht-treatment-bpr-myth`, linked from PILLAR "How do gifts and trusts change your allowance?" |
| 66 | Agricultural tenancy law (AHA, succession rights, notices, rent reviews) | OM-TEN | declined | conceded-scope (DOSSIER §1); PILLAR names it in "What we do not cover" |
| 67 | Partnership agreements and capital accounts | OM-STRUCT, OM-TEN | covered (thin) | E1 partnership treatment for BPR. Agreement drafting is solicitor work and is not claimed |
| 68 | SDLT on agricultural land | OM-HUB | covered | N2 H2 "How much stamp duty do you pay on agricultural land?" |
| 69 | Capital allowances on farm plant and buildings | OM-HUB | declined | conceded-scope: farm accountancy. Property's capital-allowances corpus is landlord-facing, not farm-plant facing |
| 70 | Farm accountancy service menu (accounts, payroll, R&D, forensic accounting, tax investigations, wealth management, cashflow modelling) | OM-HUB | declined | conceded-scope: farm accountancy; PILLAR names the boundary and says who does it |
| 71 | Farm decision-making, family meetings, using advisers | OM-TIPS | declined | off-niche: farm management, not tax |
| 72 | COVID-19 support schemes, sector events, milk cost-of-production reporting | OM-COVID, OM-HUB | declined | obsolete news-cycle and off-niche |

## Bucket counts

| Verdict | Count |
|---|---|
| covered | 46 |
| declined (with named reason) | 19 |
| belongs-elsewhere | 4 |
| **UNDECIDED** | **3** |
| **Total themes** | **72** |

Counts recomputed from the table rows, not asserted.

`covered` includes 9 rows marked `(thin)` or scope-limited: themes 19, 26, 37, 38,
48, 50, 52, 58, 67. Theme 57 is marked `(counter-position)`, which is a deliberate
disagreement with Old Mill rather than thin coverage.

## UNDECIDED: three themes, for the conductor

These are the finding. None is conceded by DOSSIER §1, none falls outside the
declared term family, and no surface of ours answers them. Forcing them into
`covered` or `declined` would be false in both directions.

### Finding 1: debts and the allocation of liabilities against relieved property

**Source:** SAF-APR H3 "Debts" and SAF-BPR H3 "Debts". Both are top-10-holding
owner pages, so this theme carries a heading on two of the three saffery pages
that rank.

**What we have:** nothing. Searched all eight named surfaces plus the whole
764-post Property blog corpus for IHTA 1984 s.162A / s.162B, for debt or
liability allocated against relieved property, and for a loan or mortgage secured
on the farm. The only hits are TCGA 1992 s.162 incorporation relief (a different
statute on the incorporation pages) and one incidental E2 clause, "assuming no
other assets and no debts", which sidesteps the question rather than answering it.

**Why it matters here:** a farm with borrowing secured on the land is the normal
case, not the edge case. Under s.162B a liability incurred to acquire or maintain
relievable property is deducted from that property before relief is applied, so
the borrowing reduces the relieved value rather than the taxable estate. On the
new arithmetic that changes the number the reader takes away from N1, N3 and
CALC, all of which currently compute qualifying value with no debt input at all.
CALC has no liabilities field.

**Options:** (a) add a debts section to E2 and E1 and a liabilities input to CALC;
(b) add one page owning it and cross-link, as was done for clawback on MIXED;
(c) decline with a stated reason, which we do not think survives contact with the
audience in DOSSIER §5.

### Finding 2: commercial woodland: inheritance tax and woodlands relief

**Source:** SAF-WOOD, a saffery owner page with 50 family mentions, third by
mention count, carrying H3 "Inheritance tax" under H2 "Tax and woodland".

**What we have:** E2 quotes the s.115(2) definition, which brings woodland
"occupied with the land and ancillary to it" inside agricultural property. That
is the farm-adjacent slice and it is correct. The distinct relief for commercial
woodland (IHTA 1984 s.125 onward, deferral of tax on the value of the timber
until sale) appears nowhere in the corpus. Searched for "woodlands relief",
"s.125 IHTA" and "standing timber" across all 764 posts: zero hits.

**Why it is undecided rather than declined:** DOSSIER §1 puts "woodland
(IHT/relief only)" INSIDE the term family. DOSSIER §2 screened only "woodland for
rent" and "woodland mortgages" as off-niche. The IHT slice was therefore
explicitly kept in scope and then not built. Themes 41 to 44 (woodland income
tax, timber CGT, woodland types, planting policy) sit outside that bound and are
declined cleanly; this one does not.

**Options:** (a) a section on E2 or the pillar covering woodland within a landed
estate, deferral and the APR/BPR interaction; (b) amend DOSSIER §1 to narrow the
term family to woodland-occupied-with-farmland only, which makes the current E2
treatment complete and closes the theme as `covered`. Option (b) is a dossier
edit against a FROZEN document, so it is a conductor call, not ours.

### Finding 3: providing for non-farming children while the farm goes to the farming child

**Source:** OM-WILLS, Old Mill's highest-mention owner page (58 mentions, 1,623
words), whose entire structure is this one question with four options: equalise
with non-farming assets, restructure or divide the farm, use outlying development
land, or take out whole-of-life cover.

**What we have:** three of Old Mill's four options are covered in the tax
register. Whole-of-life cover is on N3 (theme 39). Development land is on E2 and
N2 as hope value stripped from agricultural value (theme 38). Restructuring is
thin on E3 and E1 (theme 37). The fourth, and the framing that binds all four
together, is absent: searched all surfaces for "non-farming", "equalis",
"sibling" and the farming-child-versus-other-children split. Zero hits anywhere.

**Why it is undecided rather than declined:** the tax half of the question is
ours and E3 already touches it, stating that an ownership split preserves relief
where qualifying property passes to children rather than a spouse. The half that
is missing (who gets what, and how the family is kept whole) is arguably
solicitor and will-drafting work, but the conceded boundary in DOSSIER §1 does
not name it, and PILLAR's "What we do not cover" list does not name it either. We
are neither covering it nor declining it, which is exactly the state this floor
exists to catch.

**Options:** (a) add a section to N3 on how the choice of who inherits which
asset changes the allowance arithmetic, staying in the tax register; (b) add a
fifth bullet to PILLAR's "What we do not cover" naming will drafting and family
agreements as solicitor work. Option (b) is one line and closes the theme
honestly. Either resolves the floor; doing neither leaves the competitor's single
strongest page unanswered.

## Thin-decline note (not undecided, but flagged)

**Theme 4, environmental schemes.** The prompt and DOSSIER §1 make
"conceded-scope" valid and final for BPS/SFI and natural capital, and PILLAR
names environmental schemes in its decline list, so the bucket is correct and
this is not counted as undecided. But saffery's heading is not about scheme
administration: it is about whether land in an environmental scheme still
qualifies for APR, which is a relief-qualification question of exactly the kind
E2 exists to answer. The decline reads slightly wider than the theme. If the
conductor is opening E2 anyway to resolve finding 1 or finding 2, one sentence
confirming that land in an environmental scheme remains agricultural property
would close the gap at near-zero cost, without touching the conceded scheme
administration itself.

## Where a covered claim is thinner than the competitor's treatment

| Theme | Our surface | The gap |
|---|---|---|
| 26 Succession timing | N3, one H2 | Old Mill runs five owner pages on succession; saffery runs one. We answer when to hand on, not how the handover is sequenced or what a partnership admission does to the clock |
| 19 / 52 / 67 Business structures | E1, one H3 plus scattered mentions | Three competitor pages (SAF-QUAL, OM-STRUCT, OM-SUCC4) treat sole trader against partnership against company as a decision. We only warn that a company wrapper does not create relief |
| 37 Restructuring the farm | E3 passage, E1 note | OM-WILLS gives it a numbered option with worked consequences; ours is a clause inside a planning list |
| 50 Diversified trading profits | N2 | We draw the property-income line correctly and concede the rest, which is honest, but a reader arriving from "farm diversification tax" gets less than OM-DIV gives them |
| 48 No successor | N2 CGT section, E2 mention | Covered as a disposal, not as a decision. OM-SUCC5 treats it as a strategic fork |

---

**Floor 8 verdict: FAIL, 3 undecided.** Findings 1 and 3 are closable with edits
to existing surfaces (E2, E1, CALC, N3, PILLAR). Finding 2 needs a conductor
ruling on the DOSSIER §1 woodland bound before any edit is worth making, because
the cheapest resolution is a scope narrowing rather than a build.
