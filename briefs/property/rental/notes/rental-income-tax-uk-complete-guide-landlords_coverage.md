# E1 coverage note

Target: `rental-income-tax-uk-complete-guide-landlords` (EXTEND, additive only)
Pack: `briefs/property/rental/packs/PACK_rental-income-tax-uk-complete-guide-landlords.md` (466 keywords; the `E1_keywords.md` path is now a MOVED stub)
Written: 2026-08-21. Not committed.

## 1. What was added

Nothing existing was altered except `metaDescription`. `git diff` on the file is
62 insertions, 1 deletion, and the single deletion is the old `metaDescription`
line. metaTitle, title, h1, all nine existing H2s and their order, all existing
body prose and all twelve existing FAQs are byte-identical.

**Three new H2s** (answer-first, number in the heading, placed between existing sections):

| # | Heading | Placed | Carries |
|---|---|---|---|
| A | `Do landlords pay tax on rent? Yes, at 0%, 20%, 40% or 45%` | after the intro paragraph, before `How is rental income taxed in the UK?` | `do landlords pay tax on rent`, `tax on rental income uk`, `rental income tax rate`, `landlord tax on rental income`, `is rental income taxable`, `do you pay tax on rental income or rental profit` |
| B | `How much tax do I pay on rental income? £2,400 on a £12,000 profit at basic rate` | after the existing bands section, before `What expenses can landlords claim` | the whole `how much tax do/will i pay on rental income` family, `how much is tax on rental income`, `how to work out tax on rental income` |
| C | `How to avoid paying tax on rental income legally: £12,570, £7,500 and £1,000 of allowances` | after `Property allowance and Rent-a-Room Relief`, before the MTD section | `how to avoid paying tax on rental income`, `how to avoid paying rental income tax`, `tax free rental income`, `how much rental income is tax free`, `rental income allowance`, `who is exempt from paying tax on rental property` |

**Two new FAQs** (12 -> 14, at the permitted cap): "Do landlords pay tax on rent?"
and "How can I legally reduce the tax on my rental income?". Both over 25 words,
both carry figures.

**Two source lines** under the two existing rate tables (the one permitted touch
inside existing blocks, purely additive underneath):
- under the 2026/27 bands table: *Rates: house-verified against HMRC rates and thresholds, 2026/27.*
- under the April-2027 property rates table: *Rates: house-verified against HMRC guidance, applying from 6 April 2027.*

The MTD threshold table was deliberately left alone: the permission names rate
tables, and a mandation-threshold table is not one. Call recorded.

**metaDescription updated** (148 chars, was 153). Old copy carried no figure and
no head phrasing. New copy leads on the exact head term and answers it:
`Tax on rental income UK: you pay 0%, 20%, 40% or 45% on rental profit in 2026/27, plus expenses, the Section 24 credit and the new April 2027 rates.`
It keeps "Section 24", which protects the `section 24 rental income tax` equity
row (Bing position 2).

## 2. Keyword disposition, all 466 reconciled

226 placed + 90 already-present + 150 declined = 466.

### Placed by the new copy (226 kw, 43,500 raw vol)

| Family | Kw | Vol | Where |
|---|---|---|---|
| Head `tax on rental income` / `taxation rental income` / `landlord tax` / `is rental income taxable` / `rental income tax uk` | 122 | 35,170 | H2 A opening sentence and its three bullets; reinforced by the new "Do landlords pay tax on rent?" FAQ |
| `rate` family: `rental income tax rate`, `what tax rate is rental income`, `uk tax rate on rental income`, `rent tax brackets`, `42% tax on rental income` | 48 | 880 | numbers in H2 A's heading (0/20/40/45), the bullet "The rental income tax rate is your rate", the rate row in H2 B's table |
| `avoid` / `tax free` / `allowance` family | 34 | 5,090 | H2 C heading and its six bullets; the second new FAQ |
| `how much tax` family | 22 | 2,360 | H2 B heading, its opening sentence and its Priya/Marcus table |

### Already present in protected copy (90 kw, 1,280 vol), no new copy needed

| Family | Kw | Existing owner on the page |
|---|---|---|
| April-2027 / 22% timing questions (`when is rental income becoming taxable at 22%`, `is landlord tax now 22%`) | 37 | existing H2 `What changes from April 2027` + its FAQ. These are live Bing equity rows at positions 2-5, so no competing new H2 was written for them |
| Section 24 / mortgage-interest family | 23 | existing H2 `How does Section 24 mortgage interest relief work?` + two FAQs |
| Reporting / MTD / declaring | 20 | existing H2s `How to report rental income to HMRC` and the MTD section + three FAQs |
| Expenses / repairs / capital-vs-revenue | 5 | existing H2 `What expenses can landlords claim` + H3 + FAQ |
| Room-let / lodger / Airbnb | 4 | existing H3 `Rent-a-Room Relief up to £7,500` + FAQ |
| Losses | 1 | existing FAQ on offsetting losses |

### Declined (150 kw, 6,610 vol)

| Family | Kw | Vol | Reason (one line) |
|---|---|---|---|
| Local/service/brand intent (`landlord tax accountant london`, `landlord tax advice leeds`, `landlord tax accountants salary`) | 40 | 790 | commercial-local intent, not answerable in a national guide; PTP pricing is barred |
| Newscycle + generic tax-year (`current tax rates`, `landlord tax changes 2026`, `not paid tax on rental income for 5 years`) | 36 | 3,750 | excluded generic / news-cycle per DOSSIER §4 adjudication; the 5-years arrears query is owned by the Let Property Campaign pages, which the new H2 C links to |
| Mortgage affordability + property valuation (`buy to let mortgage based on rental income`, `property value based on rental income`) | 26 | 1,590 | lending and valuation intent, not tax; no page of ours should chase it |
| Non-resident / NRL / overseas | 15 | 210 | owned by the NRL pages (already-covered satellites, DOSSIER §4) |
| Commercial property rental income | 12 | 0 | zero measured volume and a different rate story; belongs to a commercial page, not the residential head |
| Trusts / estates / IHT on rental property | 6 | 40 | owned by the IHT cluster |
| Calculators, spreadsheets, software | 6 | 50 | assigned to Phase B T3 by the cross-phase adjudication in HANDOFF §3; prose pages do not chase them |
| Devolved (`tax on rental income scotland`) | 5 | 180 | language spec rule 4: no devolved carve-outs, it is a linked page not a clause. The page already carries five such clauses in protected copy; adding more would worsen it |
| Limited company / corporate rate | 4 | 0 | deferred to Phase D incorporation per DOSSIER §4 |

## 3. Figures re-derived

| Figure | Source | Derivation |
|---|---|---|
| 0% / 20% / 40% / 45% for 2026/27 | house_positions §7 (2026/27 standard rates apply to rental income) | 0% is the personal-allowance slice, not a fifth rate |
| £12,570 personal allowance, £50,270 basic-rate ceiling, £125,140 | existing protected bands table on the page, consistent with §7 | unchanged |
| £1,000 property allowance | house_positions §41 (ITTOIA Part 6A, s.783BD) | stated as gross property income, per person |
| Property allowance blocked in a year the finance-cost reducer is claimed | house_positions §41, PIM4460 lock verified 2026-07-09 | written as "you cannot take the property allowance in a year you claim the finance-cost credit described above", so it fits an unmortgaged let |
| £7,500 / £3,750 Rent-a-Room | existing protected copy on the page | unchanged |
| 20% finance-cost credit | house_positions §4 | 2026/27 rate; the 22% 2027/28 figure is left to the existing protected section |
| Priya: £18,000 - £6,000 = £12,000 profit; £32,000 + £12,000 = £44,000 total, all inside the £50,270 band; 20% x £12,000 = **£2,400** | arithmetic | £44,000 < £50,270, so no spill into higher rate |
| Marcus: same £12,000 profit; £60,000 salary is already above £50,270 so the whole profit is higher-rate; 40% x £12,000 = **£4,800** | arithmetic | £72,000 total is below £100,000, so no personal-allowance taper and below £125,140, so no 45% slice. Neither has a mortgage, so no credit interacts |
| Payoff: £4,800 - £2,400 = **£2,400** more tax | arithmetic | stated in plain money as the spec requires |
| £6,000 of costs "worth £2,400 to you" at 40% | arithmetic | 40% x £6,000 |
| Penalty 0% unprompted vs roughly 15% prompted | house_positions §27 (Let Property Campaign band, careless 0% unprompted within 12 months to 15% prompted) | written as a range with "roughly", no statute cited |
| Losses: set against other properties in-year, then carried forward against the same property business | existing protected FAQ on the page | unchanged |

## 4. Statute discipline

**1 statute reference in all new copy**, against the permitted maximum of 2. It is
"the Section 24 credit" in the new metaDescription (carried over from the old one
to protect the position-2 equity row). The three new body sections and the two new
FAQs contain **zero** Act names, zero section numbers, zero HMRC manual codes and
zero "Royal Assent". The new copy says "finance-cost credit" and "mortgage interest
credit" where the existing page says "Section 24".

Effect on density: the page carried 9.9 statute references per 1,000 words against
a winner median of 2.4. Body prose went from 2,027 to 2,990 words with no new
statute references, so the same absolute count now sits over 47% more words. The
additions dilute rather than add, as instructed. Protected copy still carries the
seven Act names the language spec counted; those are not fixable under this permission.

## 5. Verification run

| Check | Result |
|---|---|
| `python scripts/voice_scan.py --site property --slug rental-income-tax-uk-complete-guide-landlords` | score 31.4, band **ROBOTIC**. Baseline before this edit was 28.8, also **ROBOTIC**. Band unchanged. See §6 |
| U+2014 em-dashes | 0 (S4 = 0) |
| Americanisms (S7 UK-English lock) | 0 |
| metaDescription length | 148 (limit 155) |
| Frontmatter FAQ count vs body reality | 14 in frontmatter; the body has no FAQ block, so frontmatter is the single source. Was 12, +2, at the permitted cap |
| Word count delta | body prose 2,027 -> 2,990, **+963 words (+47.5%)** |
| Internal hrefs resolve | 11 of 11 blog links resolve to a file on disk whose canonical matches the category segment used. The 3 links added by this pass (`rent-a-room-relief-uk-landlords-lodgers-guide`, `jointly-owned-property`, `let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026`) all pass |
| Protected copy byte-identical | yes, `git diff` shows 62 insertions and 1 deletion, the deletion being the replaced metaDescription line |

## 6. Findings in protected copy (reported, not fixed)

1. **Record-retention period is overstated.** The `How to report rental income to
   HMRC` section says to keep records "for at least five years and ten months after
   the relevant 31 January filing deadline". house_positions §27.7 (TMA 1970 s.12B)
   gives **5 years after the 31 January following the tax year**. The page has
   welded together the two standard formulations ("5 years after the 31 January
   deadline" and "5 years and 10 months after the end of the tax year") and produced
   a date roughly 10 months too late. Conservative for the reader, still wrong.
   Protected body prose, so untouched.

2. **voice_scan band is floored at ROBOTIC by protected copy, not by this edit.**
   The scanner's `metaFloorRobotic` rule escalates any page with 4 or more
   meta-commentary hits. All four are pre-existing: `summary` ("This guide sets out
   the rates, the full allowable-expense list..."), the intro paragraph ("This guide
   sets out exactly what you pay..."), "We unpack the calculation in detail in our"
   and "We cover the planning response in our". Deleting the single
   meta-commentary sentence from `summary` drops the count to 3 and moves the band
   to MINOR (verified by running the scanner against a modified copy in memory).
   `summary` was not in this pass's additive permission, so it was left alone. That
   one deletion is the whole fix if the fix-round wants the band.

3. **The score rise of 2.6 points is entirely the length signal.** S6 is the only
   signal that moved: body prose passed the 2,200-word non-pillar ideal, costing
   3.6 of the 31.4. S1 abstract-noun density fell (per-1k) because the new prose
   diluted it, S2/S3/S4/S5/S7 are unchanged. The language spec's own measurement
   says word count is not a ranking lever in this cluster (winner W1 wins the head
   term on 814 words, W3 on 4,084), so the length penalty was accepted rather than
   trimmed out of the worked example.

4. **Pack metadata disagrees with the file.** The pack header gives the page URL as
   `/blog/landlord-tax-essentials/rental-income-tax-uk-complete-guide-landlords`.
   The file's `canonical` and `category` put it under
   `/blog/section-24-and-tax-relief/`. Not something this pass can adjudicate;
   flagging it because any link built from the pack header would 404.

5. **Language-spec defects left in place by design.** Five devolved-nation
   carve-outs, seven Act names, one "Royal Assent", and the closing CTA shape the
   spec calls out ("When professional advice pays for itself", a five-bullet
   qualifier list, "get in touch through the form below"). All are protected copy.
   Fixing them needs a REWRITE permission, not an EXTEND.


## Conductor-approved protected-copy changes (2026-08-21, post-extend)

1. Voice fix, approved deletion: the summary's meta-commentary sentence ("This guide sets out the rates, ...") removed; returns the voice band to MINOR (metaFloorRobotic hits 4 to 3).
2. Factual back-patch under the correction carve-out: record retention corrected from "five years and ten months after the relevant 31 January filing deadline" to "five years after the 31 January following the tax year" per house_positions 27.7 (TMA 1970 s.12B).
3. Pack header category segment corrected to /blog/section-24-and-tax-relief/ (the page's real canonical); the writer's added internal links used verified paths and are unaffected.


## Gate-closure declines (conductor, 2026-08-21; each keyword named for the floor-6 matcher)

Placed in a second additive touch (writer's own new sections only): "can you offset mortgage interest against rental income", "does rental income count as earned income", "landlord tax tips", "declaring rental income".

Declined, with owners/reasons:
- "buy to let mortgages based on rental income only" / "buy-to let mortgages based on rental income only" / "buy-to-let mortgages based on rental income only": lending-criteria intent; owned by the tools cluster (BTL mortgage calculator + stress-test tool), not a tax guide.
- "declaration of trust rental income" / "declaration of trust for rental income": owned by the joint-ownership / form-17 satellite pages (ledger already-covered).
- "rental income spreadsheet": owned by landlord-accounting-spreadsheet-template-free-excel-guide (protected equity page).
- "property valuation based on rental income" / "valuation of property based on rental income" / "value of property based on rental income" / "rental income ratio": valuation and lending-metric intent; free-rental-valuation page + stress-test tool own these.
- "current tax brackets" / "different tax brackets uk" / "what is my current tax code" / "how many different taxes are there in the uk": off-family generic personal-tax queries; classifier over-assignment recorded, no property intent.
- "government landlord tax increase" / "landlord mps rental income": news-cycle phrasings; the 2027-rates page carries the enacted-change story.


## Fix round (2026-08-21)

EXTEND discipline held: no protected H2 touched, no protected body prose edited in this round.
Every change below is in this batch's own new copy or in frontmatter. Equity gate, voice scan and
frontmatter lint all re-run and pass (voice band moved ROBOTIC to MINOR).

**Blockers fixed**

- **E1-1 (factual), property allowance presented as stacking.** Both instances corrected to the §41
  position (ITTOIA 2005 Part 6A: full relief only where gross property income is £1,000 or less;
  above that partial relief is an election to deduct £1,000 INSTEAD of actual expenses, ss.783BG-BH,
  s.783BK). The body bullet now reads "the allowance is a choice rather than an extra: deduct either
  the flat £1,000 or your actual expenses, whichever is larger, never both", and FAQ 13 was rewritten
  around the same rule. The page's later H3 already had it right; the new copy now agrees with it.
- **E1-2 (factual), Let Property Campaign penalty floors from the wrong schedule.** The "0% versus
  roughly 15%" pair was the Sch 24 FA 2007 careless matrix. Rewritten to the Sch 41 FA 2008 figures
  in house_positions §27.3: unprompted non-deliberate disclosure within 12 months of the tax falling
  due can reduce the penalty to nil; once HMRC has prompted, the floor is 10%. No figure asserted
  beyond what §27.3 records.
- **E1-B1 / E1-B2 (editorial), the two new FAQs were verbatim lifts of body copy.** Both rewritten to
  answer independently. FAQ 13 leads on the profit-not-rent point and carries the two-case tax-free
  test; FAQ 14 opens on the £1,200 / £2,400 payoff figure the body does not carry. Longest shared run
  with the body is now under 80 characters on both, down from 90-plus.
  Note: the editorial drop-in for FAQ 13 ("£13,570 before any tax is due, because the £1,000 property
  allowance sits on top of the £12,570 personal allowance") was NOT used. It re-states the stacking
  error E1-1 exists to remove, and conductor ruling 1 is explicit that the allowance is never
  additive. Declined and replaced.
- **E1-B3 (editorial), "avoid tax" H2 re-explains the two H3s above it.** Option (b) taken (compress,
  do not move), so the H2 sequence stays untouched. Bullets 2 and 3 are now pointers. Bullet 2 also
  drops the property-allowance / finance-credit trap entirely per conductor ruling 7 (E2 owns that
  mechanic) and links to the £1,000 property income allowance guide instead. This also disposes of
  E1-6, since the "low-cost room let" example that collided with the Rent-a-Room bullet is gone.
- **E1-B4 / E1-3 (both tracks), source lines leaked "house-verified".** Reformatted to E2's convention:
  "Source: HMRC Income Tax rates and allowances for 2026/27, gov.uk. Data to August 2026." and
  "Source: HMRC measure paper on the 2027 property, savings and dividend income tax rates, gov.uk.
  Data to August 2026." The second line names the measure paper rather than "HMRC guidance", which
  answers the factual reviewer's objection without pulling an Act name and an enactment date into a
  caption (spec rules 2 and 3).

**Advisories applied**

- E1-4 / E1-A5: `summary` restored to a complete thought with the MTD and April-2027 facts back in,
  trailing space removed. The meta-commentary sentence deleted in the previous pass was NOT restored,
  so the voice-scan S2 count stays at 3 and the band stays MINOR.
- E1-5: Form 17 reframed. It now "tells HMRC about an unequal beneficial split that a deed has already
  created, rather than creating one itself" (§24.2).
- E1-7: `reviewedAt` moved to 2026-08-21 to match the substantive tax content added in this batch.
- E1-A1: the broken appositive "and the most practical of the landlord tax tips below" reworked into a
  list stem, "The landlord tax tips below come down to three allowances and one ownership decision".
  The keyword (140 vol, peer position 20) is retained and now reads naturally.
- E1-A2: "Declaring rental income late is always cheaper than being found" removed. The truncated idiom
  and the "always" overclaim are gone; "declaring rental income" is carried in a plain sentence
  ("So declaring rental income voluntarily is the cheaper of the two routes"). The closer was also
  varied from "our guide to X explains the route" to "the Let Property Campaign is the way back in",
  which is conductor ruling 7's shared-closer dedupe.
- E1-A3: "The rental income tax rate is your rate" (circular) became "There is no separate rental
  income tax rate", which keeps the 320-volume keyword and answers the query. "That is landlord tax on
  rental income in one line" became "Landlord tax on rental income comes down to one line", which
  keeps the 880-volume keyword in a sentence that reads.
- E1-A4: "Everything below fills in each step, in the order you will actually need it" cut.
- E1-8: recorded, not actioned. E1's link to `national-insurance-on-rental-income` resolves on disk but
  N1 is untracked, so **E1 must not deploy without N1** or the link 404s in the page's opening section.

**Declined**

- E1-A3, third item (line 67, "Tax on rental income in the UK is charged on profit"). The reviewer said
  to leave it if A1 and the two bolded sentences were fixed. They were, so it stays.
- Everything the editorial report filed under "Out of remit": the two devolved-nation carve-outs, the
  parenthetical amendment chain, the two "Royal Assent" mentions and the closing CTA are all protected
  copy and need a REWRITE permission, not an EXTEND.

**Gate-driven addition, recorded because it is a keyword placement.** Removing "house-verified" from
the two source lines dropped the only instance of the token "house" on the page, which failed
`sdlt_equity_gate.py` on `house rent tax` (vol 70). Placed naturally instead, in the new opening H2:
"The answer is the same whether you let a house, a flat or a single room." Gate re-run and passes.
