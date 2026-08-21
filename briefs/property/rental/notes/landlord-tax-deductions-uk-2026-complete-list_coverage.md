# E2 coverage note - `landlord-tax-deductions-uk-2026-complete-list` (EXTEND, additive only)

Written 2026-08-21. Pack: `briefs/property/rental/packs/PACK_landlord-tax-deductions-uk-2026-complete-list.md`
(read after the mid-task rename from `E2_keywords.md`; §3 market set = 99 rows, §2 equity register = 367 Bing rows + 3 Google rows).
Language spec: `briefs/property/rental/_language_spec.md`. Ground truth: `docs/property/house_positions.md` §34, §41, §4.

## 1. What was added

Six new question H2s, all answer-first, zero existing bytes touched.

| # | New H2 | Placed after |
|---|---|---|
| S1 | What expenses can you claim against rental income? | intro, immediately before `The Complete List of Allowable Landlord Expenses` |
| S2 | Can you deduct mortgage interest from rental income? | `What Is NOT Deductible Against Rental Income`, before `Worked Example` |
| S3 | Which repairs count as allowable expenses, and which are improvements? | after S2 |
| S4 | Which tax year do you claim a landlord expense in? | after S3 |
| S5 | Is rent tax deductible? | after S4 |
| S6 | Should you claim expenses or the £1,000 property income allowance? | after S5, before `Worked Example` |

Plus: one new 10-row repairs-vs-improvements table with a source line (inside S3); one source line under the
existing at-a-glance table; metaDescription rewritten to lead with the head term (old value preserved as
`metaDescription_prev`, prior value demoted to `metaDescription_prev_2` per the existing `_prev` convention).

Zero new FAQs: the page already carries 14, which is the permitted ceiling. Recorded as a deliberate call.
Zero statute or HMRC-manual references added, against a permitted budget of 2 (see §5).

## 2. Market keyword set (§3, 99 rows) - disposition of every row

Indices are the row order of the pack's §3 table.

### PLACED in new copy - head and list intent (S1) - 20 rows
1 `allowable expenses rental income` (320, peer pos 2) - S1 body sentence 2 verbatim as "the allowable
expenses for rental income", repeated in S1 para 2, and now leads the metaDescription.
4 `allowable expenses for rental income gov uk` - S1 + the two "Source: HMRC property income guidance ...
gov.uk" lines.
5 `what are allowable expenses for rental income`, 7 `rental income expenses deductible`,
8 `rental income deductible expenses`, 14 `which costs you can deduct from rental income in taxes
calculation 2026?`, 17 `what expenses can you deduct from rental income when filing uk taxes`,
18 `what expenses can i claim against rental income for uk property`, 20 `uk rental income tax deductions`,
21 `uk rental income tax allowable expenses 2026`, 23 `uk landlord tax return what expenses are deductible`,
27 `uk expenses list for deduction against gross profit when dealing with rental income tax`,
39 `property rental income tax uk allowable expenses list`, 61 `hmrc rental income and expenses`,
66 `expenses and rental income gov.uk`, 73 `costs you can deduct against rental income uk`,
96 `allowable expenses for rental income` - all served by the S1 H2 + the nine-category sentence + the
"take the total off your rent" answer. 22 `uk rental income allowable expenses 2025-26 maintenance
management` is served for the maintenance/management half only; the 2025-26 year is not written (page is
2026/27 and the year label is protected).
44 `list of expesnes for private landlord tax - list of allowable expenses` - S1 plus the existing list.
47 `landlord tax deductible expenses uk` - already in h1/title, reinforced by S1.

### PLACED in new copy - mortgage and finance costs (S2) - 33 rows
3 `can i deduct mortgage interest from rental income` (90), 6 `rental income interest deduction` (70),
13 `why is rental income taxable in uk and mortgage not deductible`, 16 `when was loan interest restricted
as a deduction against rental income`, 19 `uk residential property tax. can i claim mortgage arrangement
fee as a deduction against rental income`, 29 `self assessment on rental income interest expenses`,
31 `rental income uk can i claim mortgage interest orty`, 32 `rental income if own by landlord not company
does mortgage gettax deductable`, 34 `remortgage fees are they allowable against rental income`,
36/37/38 the three `property uk tax return deduct mortgage interest ... example` variants,
41 `mortgage product switch fee is tax deductible from rental income?`, 42 `mortgage interest for rental
income tax deduction`, 43 `mortgage broker fees allowable against rental income`, 48 `is the interest
element of mortgage payments deductable with rental income hmrc`, 50 `is mortgage an allowable expenses
when declaring rental income to hmrc`, 52 `is mortagage interest tax deductable on rental income`,
55 `is a mortgage broker fee deductible from buy to let rental income`, 57 `how much interest on property
rental income can you claim? 2026-27`, 65 `for uk tax can mortgage intrest payments be deducted from
rental income`, 75 `claiming bank loan repayments interest only rental income uk`, 76 `claim interest on
rental income`, 78 `claim back mortgage repayments on rental income`, 84 `can you claim mortgage repayment
as expense for rental income uk`, 85 `can mortgage interest be deducted from rental income uk 2026`,
86 `can mortgage interest be deducted from rental income in the uk?`, 87 `can i deduct 20% of mortgage
interest from rental income`, 88 `can i claim tax relief on my rental income if i pay a mortgage on the
property`, 89 `can i claim mortgage arrangement fees against rental income`, 90 `before 2017 could you
include mortgage arangement fees as part of your expenses for tax on rental income`, 92 `are new mortgage
fees deductable for htmrc rental income`, 93 `are mortgage payments a deductible expense on rental income
uk`.

Specific answers written for the sharpest of these: the phase-in dates (75% / 50% / 25% / nil) for 16 and 90;
"the 20% is not 20% off your rent" with the £7,200 / £1,440 figures for 87, 36, 37 and 38; "capital
repayments are never claimable" for 75, 78 and 84; the named fee list (arrangement, product-switch,
remortgage, broker, early redemption) for 19, 34, 41, 43, 55, 89 and 92; the one-line policy reason for 13.

### PLACED in new copy - repairs, items and assets (S3) - 10 rows
30 `repair deductions from rental income`, 33 `rental income claiming white goods` (carpets/curtains/washing
machine row, RDI), 54 `is cladding repair allowable expense against rental income` (dedicated paragraph),
74 `claiming replacement window costs as against rental income` (glazing row), 81 `can you deduct a hvac
system replacement from rental income` (heating/air-conditioning row), 82 `can you claim the cost of
redoing your flooring against uk rental income` (flooring row), 83 `can you claim purchase of a van against
rental income` (vans paragraph), 91 `are repairing and replacing bathrooms allowable against rental income`
(bathroom row), 97 `allowable expenses against rental income for leasehold properties` (leasehold major-works
paragraph), 98 `3k for repointing my rental property, 3k rent tax what can i claim` (repointing row).

### PLACED in new copy - rent paid and rent received (S5) - 5 rows
9 `is rent tax deductible uk` (50), 10 `is rent tax deductible` (50), 49 `is paying rent tax deductible`,
59 and 60 the two `hmrc sa box 20 ... amount deposited or amount before deductions` rows, answered as
"declare the gross rent and claim the agent's fee as an expense instead of netting it off" without entering
the SA105 box-numbering lane.

### ALREADY PRESENT - no new copy needed - 9 rows
2 `landlord tax deductions` (90) - metaTitle, h1, title, opening paragraph.
24 `uk landlord tax relief expenses council tax` and 53 `is council tax tax deductible for rental income` -
property running costs list and table row ("council tax (if liable)").
68 `does the hmrc allow for letting check-in fee ...` - letting agent tenant-finding fees.
69 `... epc ...` and 70 `... eicr ...` - the safety-certificates bullet in Insurance Claims and Other Grey Areas.
71 `do you claim milage in landlord tax return or fuel cost` - Travel and Motor Expenses gives the two
methods explicitly; S3's vans paragraph adds "you cannot use both methods on the same vehicle".
72 `deductions for accountancy fees rental income` - Professional Fees.
56 `how to track rental income and expenses across properties?` - Record-Keeping and MTD section.
77 `claim home office cost sgainst rental income` - the Home-Office Deduction H3 plus two FAQs.

### DECLINED - 22 rows, with reason
- **Non-resident landlord scheme (12 rows): 11, 12, 15, 35, 40, 62, 63, 64, 67, 94, 95, 99.** DOSSIER §4
  names the NRL pages as an already-covered satellite with its own owner. The NRL scheme is a withholding
  regime, not an expense question; writing it here would take the page off its own intent and add a second
  topic to a page whose Bing equity is entirely expenses-shaped.
- **Devolved and entity carve-outs (3 rows): 51 `... rental income scotland`, 80 `... property rental income
  scotland`, 79 `... in.a llp england`.** Language spec rule 4: zero winners carry a devolved carve-out and
  it would not change the reader's number here, because the finance-cost restriction is UK-wide. The general
  S2 answer serves all three. The LLP row additionally needs a partnership treatment the page does not carry.
- **SA105 box and category lane (1 row): 26 `uk hmrc rental income tax return 2025-2026 sa105 property income
  allowable expenses allowances`.** SA105 is a named already-covered satellite in DOSSIER §4.
- **Scrape artefacts and malformed rows (4 rows): 25, 45, 46, 58.** Two CSV-dump rows for `landlord tax
  deductions`, one `#TAB#"planning; real estate law"` fragment, and one breadcrumb string carrying an Airbnb
  intent that belongs to the holiday-let owner page. Nothing writable; the page already matches them.
- **Assets we do not publish (1 row): 28 `template for rental income and expenses`.** The page offers no
  downloadable template and the pack does not authorise creating one.
- **Prior-year framing (1 row, partial): 22** - counted as placed above for the maintenance/management half;
  the `2025-26` label is declined because the page's year is protected.

## 3. Equity-register work (§2, 367 Bing rows) - what the additions serve beyond the market set

Four sections exist mainly to serve register queries that the §3 set does not name. Recorded so the QA track
does not read them as scope creep:

- **S4 (which tax year)** answers `if i get repairs to property in 26/27 which happened 25/26 ...` (two rows,
  pos 6 and pos 3), `when are allowable uk tax deductions taken from income` (pos 4), `hmrcs general principal
  of deduction on a paid basis for property expensesuk law` (pos 9), and the pre-letting rows
  (`uk hmrc pre-letting expenditure finance cost relief 20%` pos 7, `are expenses incured to prepare a
  property for letting deductible expense` pos 4, `costs incurred in bringing a house up to standard ...`
  pos 9, `initial cots in a rental property allowable?` pos 10).
- **S6 (property income allowance)** answers `what is teh hmrc flat rate allowance for landlords to claim?`
  (pos 6), `hmrc landlords allowances`, `landlord tax allowances`, `tax free allowances for landlords`,
  `allowances for landlords uk`, `hmrc fixed allowance uk rental.property`, `flat rate expenses for
  landlords`, `is deductions allowance available to a property business`, plus the three wear-and-tear rows
  (`landlords hmrc wear and tear allowance`, `whats the 10% you can use when claiming expenses on house
  rentals`, `rental property wear and tear allowance 26-27`).
- **S1 para 3 (wholly and exclusively)** answers `hmrc property income allowable expenses contractual damages
  compensation wholly exclusively` (pos 7) and `what are all the hmrc allowed landlords claim expenses that
  are incurred wholly and exclusively for renting out the property` (pos 5, the page's only clicked
  wholly-and-exclusively row). The subsistence sentence answers four rows: `subsistence expenses for
  landlords uk` (pos 7), `can a landlord claim for hotel expenses whilst visiting their rental property`
  (pos 7), `can you claim a hotel stay on a landlord account if it is to visit a property` (pos 10) and
  `can landlord claim meal allowance for visiting property` (pos 7).
- **S3 vans/cars paragraph** answers `car lease property portfolio landlord allowable for tax purposes`
  (pos 7), `can landlords claim the buying of a vehicle` (pos 8), `tax deductables car for landlords` (pos 2)
  and `landlord vehicle repair allowances uk` (pos 4).

Register rows deliberately left unserved: the branded and junk navigational strings (`valour property
management hmrc`, `havelock place ...`, `roodegate expenses`, `guibies property + expense`, `gw dlw expenses
may 2026`, `expenses l.s 2026`, `rg expenses 2026`, `mtx 2026 expenses`, `oc24 deduction uk`,
`/free ststements in rdi`); the foreign-jurisdiction rows (`allowable expenses for cgt in fiji`, `allowable
deductions against furnished french property`, `is lpt an allowable rental expense`, `+what is irpef
reduction ...`); the SA105 / accounting-category cluster (`what account catergory to use ... on xero`,
`list of property expenses categories ... wirh hmrc codes`, `chairs and blinds ... under which category?`,
`what category of expense is landlord insurance hrmc`, the `out of: cost of replacing domestic items ...`
row), which belongs to the SA105 owner page; the licensing-fee row (`is westminster council fee to rent out
a private property tax deductable`) and the TV-licence row, both of which need a capital-versus-revenue
position the house file does not carry; and `claim costs between last tenancy and poroperty sale`, which
needs a post-cessation position we do not hold. None of these lose their match: every one of them is matched
by copy that was not touched.

## 4. Figures and derivations

| Figure | Source | Derivation |
|---|---|---|
| 55p / 25p per mile | house_positions AMAP lock (55p first 10,000 miles from 6 Apr 2026); matches the page's existing text | none |
| 20% finance-cost reducer for 2026/27 | house_positions §4 | none |
| £7,200 interest, £1,440 reducer | illustration | 7,200 x 20% = 1,440 |
| £2,880 old relief, £1,440 annual cost | illustration | 7,200 x 40% = 2,880; 2,880 - 1,440 = 1,440 |
| 75% / 50% / 25% / nil phase-in, 2017/18 to 2020/21 | Section 24 phase-in, consistent with the page's existing "fully phased in for 2020/21" | none |
| £1,000 property income allowance; per person; full relief at or below £1,000; election to deduct £1,000 instead of actual expenses; blocked in a year the s.24 reducer is claimed, except where the reducer computes to nil | house_positions §41 (ITTOIA Part 6A lock, PIM4460 interaction verified 2026-07-09) | none |
| £4,000 rent, £600 expenses: £3,000 vs £3,400, £400 of profit, £80 of tax | illustration | 4,000 - 1,000 = 3,000; 4,000 - 600 = 3,400; 3,400 - 3,000 = 400; 400 x 20% = 80 |
| £300 ground rent: £60 basic rate, £120 higher rate | illustration | 300 x 20% = 60; 300 x 40% = 120 |
| Cash basis default for individual landlords since 2017-18; does not apply where receipts exceed £150,000; companies, LLPs and trustees excluded | **verified at write time**, PIM1092 fetched 2026-08-21 ("Since the 2017-18 tax year, the cash basis has been the default way of reporting the profits or losses of a property business"; "Receipts that would be brought into account under the cash basis for the tax year exceed £150,000") | none |
| Pre-letting: costs in the seven years before letting starts treated as incurred on day one | pre-trading expenditure rule, consistent with our existing `pre-letting-expenses-landlord-claim-before-first-tenant` page, which the paragraph links | none |
| £9,000 re-roof / £900 fitted wardrobe | illustrative amounts only, no rate or threshold claimed | none |

## 5. Calls recorded

1. **Zero new FAQs.** The permitted ceiling is 14 and the page already has 14. Everything went into H2 prose,
   which is also where W2 (the page holding position 2 on the head term) puts its expense coverage.
2. **Zero statute references added** against a budget of 2. The page measured 10.9 per 1,000 words, roughly
   4x the winner median. Adding none and adding 1,495 words dilutes it to about 7.2 per 1,000 without
   touching a byte of protected copy, which is the only lever an additive-only grade allows. The phrase
   "Section 24" appears twice in the additions; it is the page's own existing label for the restriction, not
   a new citation.
3. **metaDescription updated.** The old one carried no form of "rental income" at all, so it could not
   support the head term. New value leads with "Allowable expenses for rental income in 2026/27" at 150
   characters. Applied by hand rather than through `scripts/meta_apply.py`, so no `optimisation_changes`
   audit row exists for it; the `_prev` chain was preserved manually.
4. **`dateModified` left at 2026-05-30.** It is neither in the protected list nor in the permitted-additions
   list, so it was not touched. Flagged to the conductor: a page shipping 1,495 new words with a May
   dateModified understates freshness, and all three cluster targets should be swept together.
5. **A second repairs H2 was accepted despite the existing `Repairs, Maintenance and the
   Repairs-versus-Improvements Line`.** The existing section states the principle; the new one is a
   named-job lookup table, which is what the register queries actually ask for (bathrooms, flooring,
   repointing, boilers, cladding, windows). The existing section is untouched and keeps its own matches.
6. **Kitchens were deliberately kept out of the new table.** See §6.
7. **No Scotland, Wales or Northern Ireland clause was added**, per language spec rule 4, even though four
   pack and register rows use devolved phrasing.

## 6. Protected-copy defects found - reported, not fixed

1. **Kitchens (body, Repairs section; and FAQ 2).** The page states that "fitting a brand-new kitchen is an
   improvement" and lists "an upgraded kitchen" as capital. HMRC's settled position is that replacing a
   fitted kitchen with a modern equivalent of a similar standard is a repair, and only the improving element
   is capital. The page's wording is at best an over-simplification and will cost readers deductions. It is
   protected, so it stands; the new table omits kitchens entirely rather than contradict it. Recommend a
   one-sentence fix at the next unprotected pass.
2. **Home-office flat rate versus house_positions §34.2.** The page says a property business cannot use the
   simplified flat-rate amounts (£10/£18/£26) and must apportion actual costs. house_positions §34.2 presents
   the s.94H flat rate as route (a) of a two-route choice for landlords. One of the two is wrong. The page's
   version is the narrower and better-evidenced one, and it is protected, so the additions follow the page.
   Recommend the house file be re-checked, because §34.2 is what future writers will pick up.
3. **Pack path mismatch.** The pack header gives the page as
   `/blog/landlord-tax-essentials/landlord-tax-deductions-uk-2026-complete-list`, but the file's `canonical`
   and `category` put it under `section-24-and-tax-relief`, which is what every internal link on the estate
   uses. The pack header is wrong, not the page. No action taken.
4. **Closing hedge retained.** The final MTD paragraph ends "rules ... change often, so if you are unsure
   about any specific expense, it is worth checking the position before you file rather than after", which
   language spec rule 13 bans. Protected prose, untouched.

## 7. Verification

| Check | Result |
|---|---|
| `python scripts/voice_scan.py --site property --slug landlord-tax-deductions-uk-2026-complete-list` | robot_score 23.0, band **MINOR** (baseline 17.5 MINOR). The entire delta is S6 length (over-ideal 28% to 96%); S1 density fell 2.51 to 2.00 per 1k, S2 unchanged at 1, S3/S4/S5/S7 all 0 |
| Em-dashes | 0 |
| metaTitle length | 58 (unchanged, protected) |
| metaDescription length | 150 (limit 155) |
| FAQ count | 14 (ceiling 14, none added) |
| H2 count and order | 20; all 14 original H2s present, byte-identical, in original relative order |
| Internal hrefs | 15 distinct `/blog/...` links, all resolve to files in `Property/web/content/blog/` (both new links included) |
| Body words | 2,833 to 4,328, **delta +1,495** (voice_scan count) |
| Diff shape | `git diff --numstat` = 121 insertions, 2 deletions; both deletions are the two metaDescription frontmatter lines (permitted update, old values preserved as `_prev` / `_prev_2`). Every other change is a pure insertion, so title, h1, metaTitle, all 14 original H2s, all existing prose and all 14 FAQs are byte-identical |
| Readability, additions only, tables excluded | mean sentence 17.4 words, Flesch 64.5 |
| Readability, whole page, tables excluded | mean sentence 25.3 to 21.6, Flesch 39.0 to 48.5, both now inside the winner band (spec rule 8: 22 or below, 45 or above) |
| Question H2 share | 0/20 to 6/20 (30%, winner median 29%) |
| Statute density | about 10.9 to about 7.2 per 1,000 words, by dilution only |
| Commits | none, per instruction |


## Fix round (2026-08-21) — conductor-approved protected-copy carve-outs

Both edits below are **protected copy**, made under the factual-correction carve-out on the
conductor's explicit ruling 3. The protected H2 sequence is untouched; these are an H3 and a
FAQ answer. `sdlt_equity_gate.py --cluster rental --baseline HEAD` passes (protected
metaTitle / h1 / title byte-identical, baseline H2 sequence preserved).

1. **Carve-out (a): H3 "Deductible Finance Costs That Survive Section 24" retitled.**
   The heading was factually wrong. Arrangement, product, broker, valuation and early-redemption
   fees on a dwelling-related loan are costs of that loan, so for an individual they fall inside
   the ITTOIA 2005 s.272A/s.274A reducer; nothing about them "survives" Section 24 as a deduction
   from profit. The section already contradicted its own heading at the arrangement-fee-timing
   paragraph. Changed to:
   - H3: `Other Finance Costs That Also Run Through the Reducer`
   - stem: "Section 24 restricts more than the interest. These related costs are finance costs too,
     so for individuals they are relieved through the 20% reducer rather than deducted from profit:"
   The bullet list underneath is unchanged. The page now agrees with the new mortgage-interest H2
   ("they run through the same reducer rather than reducing your profit") instead of contradicting it.

2. **Carve-out (b): FAQ 2 glazing answer corrected.**
   The answer listed "replacing single-glazing with double-glazing" as a capital improvement. That is
   wrong per PIM2030 verbatim ("alterations due to advancements in technology are generally treated as
   an allowable repair ... For example, when single glazing is replaced with double glazing") and per
   the corrected `house_positions.md` §26.7 (CORRECTED 2026-08-21: "the pre-correction text had double
   glazing backwards"). The capital example was swapped to "a first-time loft conversion" and one
   sentence added: "Replacing single glazing with double glazing is normally a repair rather than an
   improvement, because double glazing is the modern equivalent of what was there." The FAQ now agrees
   with the page's own body at the repairs H2 and with the new 10-row repairs table.

## Fix round (2026-08-21) — other changes, all in this pass's own new copy or frontmatter

- `metaDescription_prev` restored with the value this batch replaced (E2-2). `meta_apply.py` treats
  `_prev` as the rollback path; the key had been deleted rather than overwritten, orphaning `metaTitle_prev`.
- Nine-category list annotated "finance costs (relieved as a credit, not a deduction, for individuals)"
  and "Take the total off your rent" softened to "The deductible ones come off your rent" (E2-3 / E2-A2).
- "Two rules sit on top of the allowable expenses for rental income" to "on top of that list" (E2-A1).
- Third opener paragraph: the "Wholly and exclusively is the test HMRC applies" topic sentence cut, the
  phrase now lands twice in the opener rather than three times (E2-A3, partial).
- Cars sentence corrected: "Cars sit outside that treatment either way" over-generalised. Now "Cars are
  excluded from that cash-basis deduction, so a car is claimed either through mileage at 55p or, on
  traditional accounting, through capital allowances plus apportioned running costs" (E2-1). An ordinary
  UK property business is a qualifying activity for plant and machinery allowances (CAA 2001 s.15; the
  s.35 dwelling-house restriction does not reach a car), so the old wording removed a legitimate claim.
- Spec-killed hedge removed from the new cladding paragraph: "get the split checked before you file
  rather than after" replaced with "A contractor's single-line invoice is what turns a defensible split
  into a disallowed claim" (E2-B3).
- "saves £400 of profit" corrected to "is £400 less profit and £80 less tax at the basic rate" (E2-A4).

## Fix round (2026-08-21) — declined, with reasons

1. **E2-A3, second limb: moving the tenant-compensation sentence into the "Insurance Claims and Other
   Grey Areas" list.** That list is protected copy and is not one of ruling 3's two carve-outs. The
   sentence was instead reworded in place to stand on its own ("allowable on the same
   wholly-and-exclusively basis") rather than dangling off "the same test".
2. **E2-B3, second limb: deleting the closing hedge at the end of the MTD section** ("Tax rules for
   landlords are detailed and change often, so ... check the position before you file rather than
   after"). Protected copy, outside ruling 3. The duplication the report objected to is gone because
   the new instance was removed; the page now hedges once, in pre-existing prose, not twice. Fixing
   the survivor needs a REWRITE permission.
3. **Related Reading link text at the foot of the page** (labels
   `/blog/landlord-tax-essentials/how-much-tax-rental-income-uk-complete-guide` with E1's title).
   Protected copy, outside ruling 3, and the target is the Bing-experiment CONTROL page which is frozen
   to ~09-15. The href resolves; only the label is misleading. Flagged for the next REWRITE pass.
4. **Property-allowance / finance-credit trap kept here, removed from E1** (conductor ruling 7). E2 owns
   expenses mechanics, so the paragraph at "The trap if you have a mortgage" is unchanged and E1's
   restatement was compressed to a pointer link.


## Conductor note 2026-08-21: metaDescription history moved out of frontmatter

Prior metaDescription values (recorded here, not as frontmatter fields):
- "Every allowable landlord expense for 2026/27: repairs, finance costs, RDI, travel at 55p/mile, plus the grey areas that trip landlords up."
- prior metaTitle: "Landlord Expenses List: 2026 Allowable Deductions"

## Conductor decline 2026-08-21: FACTUAL_homeoffice A6

The worked example's "Home office (apportioned share): £120" cosmetically equals the £10 x 12
flat rate the home-office page bans. No factual error (the £120 is a genuine apportionment
figure in a summing example). Changing it means re-deriving the example's totals inside
protected copy for a cosmetic collision. Declined as disproportionate; revisit if the page
ever gets REWRITE permission.
