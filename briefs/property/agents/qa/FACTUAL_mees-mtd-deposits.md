# QA FACTUAL (adversarial): MEES / MTD / deposits — agents1 batch

Run 2026-08-21. Read-only pass. Nothing on any surface was edited by this session.

Method: every figure, date, threshold and tax position on the three surfaces was treated as wrong
until it matched `docs/property/house_positions.md` as patched 2026-08-21 or a primary source
fetched at QA time. Primary sources fetched: PIM1051, PIM1052, PIM1092, PIM1094, PIM1010, PIM1030,
PIM2025, PIM2030 (gov.uk HMRC internal manuals); the gov.uk consultation outcome "Improving the
energy performance of privately rented homes: 2025 update" (updated 21 January 2026); the gov.uk
MEES domestic landlord guidance (updated 5 May 2026); gov.uk "Penalties for Making Tax Digital for
Income Tax"; the gov.uk search API (news-story filter).

## Verdicts

| Surface | Verdict | BLOCKER | ADVISORY |
|---|---|---:|---:|
| `mees-epc-rules-what-your-landlords-think.md` | **all_clear**, with one open verification question | 0 | 3 |
| `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md` | **must_fix** | 2 | 2 |
| `tenancy-deposits-landlord-tax-position.md` | **all_clear** | 0 | 3 |

Two of the three MTD findings are also **gaps in house_positions §19.7**, not just page errors. They
are flagged as such below because every future MTD page inherits them.

---

## 1. MTD page — `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md`

### BLOCKER 1 — the first-year 30-day grace on late-payment penalties is missing

Quoted sentence (line 132):

> "Late payment is a separate regime and it bites faster. From 6 April 2026 it runs at 3% of the
> unpaid tax from day 15, a further 3% from day 30, then 10% a year from day 31."

**Why wrong.** gov.uk "Penalties for Making Tax Digital for Income Tax", under *When late payment
penalties apply*, states verbatim: *"In your first year of new penalties, you have 30 days from the
payment due date to either: make full payment [or] contact HMRC to set up a payment plan"*, and
*"After 30 days, we'll start to apply penalties. After your first year, this reduces to 15 days."*
The 2026 to 2027 table row for "Payment 16 to 30 days late" reads: *"3% of the tax owed at day 15,
**or no penalty if it's your first year**"*.

The page is written for the cohort mandated from 6 April 2026 — i.e. precisely the landlords in
their first year of the new penalties. For them, paying on day 20 attracts **no** late-payment
penalty, not 3%. The page overstates exposure for its own audience.

**Governing source.** gov.uk MTD ITSA penalties guidance (fetched 2026-08-21). §19.7 does not carry
the first-year grace at all, so the writer could not have got this from the lock.

**Drop-in fix** (replace line 132):

> Late payment is a separate regime and it bites faster. For the 2026 to 2027 tax year it runs at 3%
> of the unpaid tax from day 15, a further 3% from day 30, then 10% a year from day 31. There is one
> softener worth knowing: in a landlord's first year of the new penalties, HMRC allows 30 days from
> the due date to pay in full or agree a payment plan before any late-payment penalty starts. That
> concession is once only.

**Lock action (separate from the page):** §19.7 should record the first-year 30-day concession and
the "once only" rule. Every MTD page written off §19.7 to date is exposed to the same error.

### BLOCKER 2 — the £200 penalty is understated by one instance

Quoted sentence (line 130):

> "For quarterly filers the penalty threshold is four points, and once a landlord is at that
> threshold each further missed submission costs £200."

**Why wrong.** gov.uk: *"The penalty point threshold is 4 points. If you reach this, you'll get a:
£200 penalty"*, and thereafter *"£200 penalty each time you miss another submission deadline"*. The
£200 lands **on reaching** four points, not only on the fifth and later failures. As written, a
landlord is told the fourth missed update is free. §19.7 supports the correct reading ("At
threshold: £200 penalty per missed submission"); §19.19's "after threshold reached" phrasing is what
the drift came through.

**Drop-in fix** (replace line 130's second clause):

> For quarterly filers the penalty threshold is four points. The fourth missed update takes them to
> the threshold and triggers a £200 penalty, and every missed submission after that costs another
> £200.

### ADVISORY 1 — the late-payment percentages step up in 2027 to 2028 and the page reads open-ended

"From 6 April 2026 it runs at 3%..." has no end date. The gov.uk table gives **4%** at day 15 and
**4%** at day 30 for the 2027 to 2028 tax year (the 10% annual rate is unchanged). The page becomes
wrong on 6 April 2027 with no trigger to catch it. The BLOCKER 1 fix above already replaces the
open-ended "From 6 April 2026" with "For the 2026 to 2027 tax year", which closes this too.

**Lock action:** §19.7 records only 3%/3%/10% and presents it as the standing MTD ITSA schedule. Add
the 2027-28 step to 4%/4%/10% so the next writer hedges by tax year rather than by mandate date.

### ADVISORY 2 — one item in the "what you can safely say" list sits over the line

Quoted (line 137, inside the list headed "You can say all of this without going anywhere near tax
advice"):

> "What each line on your statement is, and which category it belongs to."

Telling a landlord which tax category an expense belongs in is a categorisation judgment, and the
page elsewhere assigns categorisation to the landlord or the accountant (line 59 table: the agency
"never" categorises for tax; line 76: "Your monthly statement is a source document, not a return.
Somebody still has to categorise it"). The line contradicts the page's own split. No regulated-advice
claim is made anywhere else on the page, and the "send these to the accountant" list is correct.

**Drop-in fix:** "What each line on your statement is, and which line is the gross rent."

### Verified clean on the MTD page

- Threshold ladder and test years: >£50,000 from 6 April 2026 tested on the 2024/25 return;
  >£30,000 from 6 April 2027 on 2025/26; >£20,000 from 6 April 2028 on 2026/27. Matches §19.1.
- Qualifying income is gross and aggregated; £30,000 trade + £25,000 rent = £55,000 in scope;
  PAYE, pensions, dividends, savings interest excluded. Matches §19.2.
- £52,000 gross / £42,000 banked example. Matches §19.2.
- Joint owners test their own share; £100,000 tests £50,000 each on the 50/50 default; Form 17 can
  pull one owner in early. Matches §19.4, and the §19.9 do-not-write is avoided explicitly.
- Quarterly deadlines 7 August / 7 November / 7 February / 7 May; EoPS and final declaration by
  31 January. Matches §19.6. Calendar-quarter election referred to the accountant, per §19.6.
- Points: one per missed update, 4-point threshold, reset needs **both** 12 months of compliance
  **and** all submissions due in the preceding 24 months. Verified verbatim on gov.uk; matches
  §19.19's dual-condition test with both limbs surfaced.
- Digital link definition, acceptable list, unacceptable list, PDF-is-not-a-record consequence,
  SA105-shaped column discipline, no product named. Matches §19.14 and §19.6.
- SA105 category names ("legal, management and other professional fees", "property repairs and
  maintenance", "other allowable property expenses") are the real box labels; box **numbers** were
  correctly dropped, since §19 locks none.
- Statement arithmetic re-derived: 165 + 20 + 90 + 135 + 60 = 470; 1,650 − 470 = 1,180 net ✓;
  185 + 225 + 60 = 470 ✓. Joint-owner FAQ halves (900 / 90 / 50) ✓.
- Foot reference names the Income Tax (Digital Obligations) Regulations 2026 as replacing the 2021
  regulations on 1 April 2026, with no reg numbers asserted. Matches §19.18; nothing on the page
  treats SI 2021/1076 as live.
- **All eleven §19.9 + §19.17 do-not-writes absent**, checked one by one: Ltd Cos in from April 2026;
  GP partnerships in from April 2026; £10,000 threshold; joint owners testing the property total;
  immediate £200 penalty; 2%/2%/4% late payment; letting agent files for the landlord; SIPP combining
  with the personal portfolio; copy-paste as a digital link; ASA authorisations transferring
  automatically; foreign property income excluded.

---

## 2. MEES page — `mees-epc-rules-what-your-landlords-think.md`

### OPEN VERIFICATION QUESTION (highest-risk item on the page; blocks only if the URL cannot be produced)

Quoted (myth table, row 4, middle column, line 50):

> A gov.uk news page dated 30 April 2026 does say "By 2030, all privately rented homes must achieve
> EPC rating C or better".

And the paraphrase at line 99: *"A gov.uk news page from 30 April 2026 does say all privately rented
homes must reach EPC C by 2030."*

**Status.** The page reproduces §26.3's `[08-21 additive]` block faithfully, so this is not writer
drift. But I could not locate the source. Searches run: gov.uk site search for the exact string; the
gov.uk search API filtered to `news_story` for the topic; direct fetch of the two candidate pages.
The nearest gov.uk news story ("Warm homes and cheaper bills as government accelerates Plan for
Change") is dated **7 February 2025** and says something different: *"As of 2030 all private
landlords will be required to meet a higher standard of Energy Performance Certificate (EPC) C or
equivalent in their properties – up from the current level of EPC E."* The live gov.uk MEES landlord
guidance (updated **5 May 2026**) uses the softer aspiration wording: *"Government has committed to
look at a long-term trajectory ... with the aim for as many of them as possible to be upgraded to
EPC Band C or equivalent by 2030."*

**Why it matters.** The sentence is inside quotation marks, on a myth-table row whose entire purpose
is to be checkable by a landlord who wants to argue. If the wording or the date is off, the row
fails in the exact scenario it was written for.

**Action.** Produce the URL for the 30 April 2026 news page and pin it in §26.3. If it cannot be
produced, the row still works without the quotation — drop-in replacement for the middle cell:

> gov.uk's own news and guidance pages describe an EPC C standard by 2030 in the indicative mood. It
> is policy. The government's formal consultation response says the powers do not exist yet.

### ADVISORY 1 — the response is paraphrased, not quoted, on the line the page tells the reader to quote

Quoted (lines 81 and 83):

> "The response says the government will seek new powers by Act of Parliament, and only then lay the
> regulations, with the aim of them coming into force in 2027." ... "So when a landlord tells you EPC
> C is settled, you are not disagreeing with the government. You are quoting it."

Substantively accurate and it correctly avoids quotation marks. The actual sentence, fetched from
the consultation outcome (updated 21 January 2026), is: *"Government will proceed with introducing
new powers by Act of Parliament to implement the decisions set out in the government response, and
will seek to lay a statutory instrument with the aim of it coming into force in 2027."* Since the
page invites the reader to quote it, give them the words.

**Drop-in fix** for line 81's last sentence:

> The response says government "will proceed with introducing new powers by Act of Parliament to
> implement the decisions set out in the government response", and will only then seek to lay a
> statutory instrument, with the aim of it coming into force in 2027.

### ADVISORY 2 — the answer script forecasts, one paragraph after the page bans forecasting

Quoted (myth table row 1, right column, line 47):

> "It is coming, but it is not a rule yet. Today the property needs an E."

Line 105 tells the agent: *"You are not forecasting anything, so avoid writing anything that reads
like a forecast."* Line 101 tells them to *"Say 'would be' and not 'will be', because none of it is
made yet."* "It is coming" is the forecast the page elsewhere forbids, put into the agent's mouth.

**Drop-in fix:** `"It is proposed, but it is not a rule yet. Today the property needs an E."`

### ADVISORY 3 — the £3,500 cap described as a spending cap in the one-line answer

Quoted (line 32): *"your landlord's spending on getting there is capped at £3,500 including VAT"*.
Reg 24 caps what a landlord is **required** to spend before an exemption becomes available, not what
they may spend. Line 63 gets it right ("Spend up to it, or register an exemption once you reach
it"), so this is tone rather than substance. Optional tightening: "the most they can be required to
spend getting there is £3,500 including VAT".

### Verified clean on the MEES page

- Both myth-table columns re-derived row by row. Rows 1, 2, 3 and 5 are correct in both columns.
- EPC E floor; new tenancies since 1 April 2018; every continuing let since 1 April 2020; F or G
  unlettable without a registered exemption on the PRS Exemptions Register; England and Wales only.
  Matches §26.3 and confirmed live on the gov.uk MEES landlord guidance (updated 5 May 2026).
- £3,500 including VAT confirmed verbatim on gov.uk: *"You are not currently required to spend more
  than £3,500 (including VAT) on energy efficiency improvements."*
- **£10,000 appears eight times and is framed as future policy every time** (summary, FAQ 3, table
  row 2, the policy list, the "Do I need to spend £10,000?" section heading which is a landlord's
  quoted question, its three-part answer, and the close). No occurrence asserts it as a current
  obligation.
- The 21 January 2026 government response block re-derived against the primary source: single
  compliance date of **1 October 2030** (gov.uk verbatim: *"introducing a single compliance date of
  1 October 2030 for the new standard"*); dual metric; cap *"up to £10,000"* (gov.uk: *"raising the
  cost-cap to £10,000 with a 10-year validity period for exemptions"*); ten-year exemption validity;
  grandparenting for EPC C on the EER before **1 October 2029** (gov.uk verbatim: *"private rented
  homes graded C or above against the Energy Efficiency Rating (EER) on EPCs before 1 October
  2029"*). The "2028 is out of date even as policy" claim in row 3 and FAQ 4 is **directly
  supported** by the primary source's "single compliance date" wording.
- PIM2030 hook runs in the correct direction. Line 124 and FAQ 5 both state single-to-double glazing
  as a **repair**, matching PIM2030 verbatim: *"alterations due to advancements in technology are
  generally treated as an allowable repair rather than an improvement, if the functionality and
  character of the asset is broadly the same. For example, when single glazing is replaced with
  double glazing."* Capital is correctly reserved for additions beyond the modern equivalent, and
  the grant-reduces-base-cost point matches §26.7 as corrected 2026-08-21.
- The 1 May 2026 amendment paragraph (line 103) matches §26.3's `[08-21 additive]` SI 2026/325 reg 9
  entry, including the correct negative ("It left the band E standard and the cost cap exactly where
  they were").
- §26.8 do-not-writes: none present. No "EPC C is law", no "the cap is now £10,000", no
  "Renters' Rights Act 2026" in body copy, no non-domestic figures imported (§26.3a kept out).

---

## 3. Deposits page — `tenancy-deposits-landlord-tax-position.md`

### Position-to-PIM register: all 14 rows re-derived independently

Every paragraph named in
`briefs/property/agents/notes/tenancy-deposits-landlord-tax-position.md_coverage.md` §3 was fetched
from gov.uk at QA time. **All 14 positions are supported by the paragraph cited.** No position on
the page lacks a citation, and no citation fails to support its claim.

| # | Cited | Verified at source | Supports the page's statement? |
|---|---|---|---|
| 1 | PIM1051 | "Income chargeable: overview"; receipts list carries "deposits/bonds taken from tenants" | Yes |
| 2 | PIM1094 | verbatim: deposit "only recognised as a receipt under the cash basis when the landlord becomes legally entitled to retain that amount at the end of the tenancy" | Yes |
| 3 | PIM1052 | verbatim: "deposits should be recognised in accordance with generally accepted accounting practice, normally by being deferred and matched with the costs of providing the services or carrying out repairs" | Yes |
| 4 | PIM1052 | verbatim: "To the extent that a deposit taken from a tenant or licensee exceeds the relevant costs, and is subsequently refunded, it should be excluded from the receipts of the property business" | Yes |
| 5 | PIM1052 | verbatim: "Deposits, bonds and similar which are not refunded at the end of a tenancy should be included as income at that point to the extent that they have not already been recognised" | Yes |
| 6 | PIM1094 | entitlement trigger + Example 3 | Yes |
| 7 | PIM1052 | single rule, no character split on the paragraph | Yes |
| 8 | PIM2025 | verbatim: "A repair is normally a revenue expense that can be deducted in computing property business profits", with "exterior and interior painting and decorating", "mending broken windows, doors...", "damp and rot treatment" | Yes |
| 9 | PIM2030 | verbatim: "Capital expenditure cannot be deducted in computing the profits of a property business." | Yes |
| 10 | PIM1052 + PIM2025 | income on non-refund with no spend condition; deduction requires expenditure | Yes |
| 11 | PIM1092 + PIM1094 + PIM1010 | cash timing + tax-year basis period | Yes |
| 12 | PIM1092 | verbatim: "property business receipts and expenses are accounted for when money is received or paid, not on the date the income is earned or expenses incurred" | Yes |
| 13 | PIM1092 | £150,000 default since 2017-18, individuals and partnerships, part-year proportional reduction, election out within one year of the filing date | Yes |
| 14 | PIM1030 | s.271 ITTOIA 2005 "the person receiving or entitled to the profits"; verbatim: "Receiving rent as agent of another person does not mean the agent receives the income for tax purposes" | Yes |

**Mr F example: not used on the page, correctly.** PIM1094 Example 3 runs £1,100 deposit taken in
2019-20 (not income), tenancy ends 2020-21, £300 agreed for fixture repairs and brought into account
for 2020-21, £800 refunded and never brought into account. The page uses an unnamed £800 carpet
retention as a spoken scenario and does not present it as HMRC's example, so there is no
misattribution. The pack's "contingent liability to repay" reasoning (§6b point 2) was correctly
**declined** — it is not the manual's reasoning, and the coverage note logs the decline.

Locked positions used without PIM verification (per pack §6c) were checked against
house_positions and are correct: the two advance-rent layers, the private-assured-tenancy carve-out,
the 6-months-upfront do-not-write, and "Renters' Rights Act 2025" naming.

### ADVISORY 1 — the £800 carpet answer is unqualified across the cash/GAAP fork

Quoted (line 52):

> "'I kept eight hundred quid off the deposit for the carpet, that's not income is it?' Answer: it
> is. You record eight hundred pounds of the landlord's taxable rental income on the date that
> deduction was agreed."

The "date the deduction was agreed" trigger is the **cash-basis** rule (PIM1094). For a GAAP landlord
the deposit is deferred and matched with the cost of the repair (PIM1052), so the date is not
necessarily the agreement date. The page forks correctly two paragraphs earlier and the cash basis
is the default for the overwhelming majority, so the answer is right for almost every landlord an
agent will meet. Worth one clause so an agent does not over-generalise.

**Drop-in fix:** append to the sentence: *"...on the date that deduction was agreed, on the cash
basis most landlords use."*

### ADVISORY 2 — "individuals or partnerships" slightly overstates who gets the cash basis by default

Quoted (FAQ 5 and line 82): *"The cash basis applies by default to a property business run by
individuals or partnerships with receipts of £150,000 or less"*. PIM1092 excludes companies, LLPs,
trustees **and corporate firms**, so a partnership with a company partner is out. Immaterial for the
agent audience; noted only because the page states a default without its exclusion. Optional
tightening: "run by individuals or ordinary partnerships".

Also note the page says "below that line" at line 82 where the rule is "£150,000 or less". FAQ 5
states it correctly. One-word fix if touched: "at or below that line".

### ADVISORY 3 — the page does not link the hub, unlike its two batch siblings

`for-letting-agents/page.tsx` links **to** this page, and both `mees-epc-rules-...` (line 134) and
`rra-2026-whats-in-force-...` (line 172) link back to `/for-letting-agents`. This page has no hub
link, so the cluster's internal linking is asymmetric. Not a factual finding; flagged because the
batch was built as a hub-and-spoke set.

### Verified clean on the deposits page

- Advance rent, both layers, matches §20.8 including the F-16 correction: pre-tenancy via the Tenant
  Fees Act 2019 amendment (prohibited payment, narrow carve-outs), during the tenancy via the
  Housing Act 1988 insertion (term of no effect), carve-outs for an initial rent in an initial 28 day
  period and rent in a permitted pre-tenancy period.
- The private-assured-tenancy scoping and the social-housing carve-out match §20.12 (SI 2026/421
  reg 2). "No date for it has been appointed" is the correct framing; the roadmap's 2027 is an
  expectation only.
- §20.13 do-not-writes absent, including "landlords can demand 6 months rent upfront".
- The Act is named "Renters' Rights Act 2025" throughout; no "2026" in body copy. §26.8 clean.
- Client money protection held to exactly one definitional sentence plus one scope sentence, per the
  pack's compliance constraint. No scheme comparison, no client-account mechanics.
- Only one pound figure in the body (£150,000, PIM1092), as the pack requires. No invented deposit
  sums, adjudication statistics or percentages.
- The declined positions in coverage note §4 are genuinely absent from the page — in particular the
  CGT base-cost consequence (the page says only that capital spend cannot be deducted from rental
  profits) and the unpaid-rent/damage character split.

Coverage-note nit, for the note rather than the page: §3's parenthetical says PIM1051's deposits line
"appears to route to" PIM1058. Fetched at QA time, the line reads *"deposits/bonds taken from tenants
(see final paragraph below)"* — it routes within PIM1051, not to PIM1058. The note's conclusion
(PIM1052 governs, found via the PIM1050 contents page) is correct either way.

---

## 4. Cross-cutting checks

**Frozen pages.** `git diff --stat` over `Property/web/content/blog/` shows exactly two modified
files: `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md` and
`prs-database-landlord-ombudsman-registration-requirements.md`, both REFRAME targets in this batch.
Neither appears on the DOSSIER §freeze register. The hard-frozen assets
(`a-complete-guide-to-periodic-tenancy` armed to 2026-11-16, `mees-regulations-landlords` armed to
2026-11-19, `epc-certificate-cost-uk`, and the five Wave 7 pages armed to 2026-08-22) are all
untouched. **No frozen page edited.**

**Internal links.** All 19 outbound internal links across the three surfaces resolve to files on
disk, and every `/blog/{category}/{slug}` path matches the target file's own `canonical` category:

- MEES → `mees-regulations-landlords` (×2), `energy-performance-certificates-epc`,
  `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`, `/for-letting-agents`.
- MTD → `mtd-itsa-joint-property-owners-...` (×2), `mtd-itsa-overview-six-changes-...`,
  `mtd-itsa-qualifying-income-test-gross-vs-net`, `mtd-itsa-agent-services-account-asa-...`,
  `nrl-scheme-letting-agents-quarterly-returns-mechanics` (correctly under
  `non-resident-landlord-tax`).
- Deposits → `what-repairs-can-landlords-deduct-from-rental-income`,
  `capital-vs-revenue-expenditure-landlord-uk`, `vat-dilapidations-payments-...`,
  `a-complete-guide-to-periodic-tenancy`, `pet-rights-tenancy-landlord-refusal-reasonable-grounds`.
  The pet-rights page does own the Tenant Fees Act 2019 deposit cap (5 weeks, 6 weeks at or above
  £50,000 annual rent), so the deferral lands where the page says it does.

**Routing.** All three new slugs are present in `SLUG_TO_CATEGORY_MAP` in
`Property/web/src/middleware.ts`, and `/for-letting-agents` is in `sitemap.ts` and in both nav
blocks of `Property/niche.config.json`.

**Cross-page consistency with the other three batch surfaces.** No contradiction found.

- EPC: hub `page.tsx` (lines 256-264) says EPC C by 2030 is government policy, not enacted, and that
  the standard in force is EPC E with a £3,500 including-VAT cap above which an exemption can be
  registered. Identical to the MEES page.
- MTD: hub (lines 277-286) says MTD is the landlord's obligation, the agency does not file, and the
  threshold test runs on gross. Identical to the MTD page.
- Deposits: hub (lines 299-308) says the tax question arises at the end of the tenancy when a
  deduction is made, and scopes out agency client money. Identical to the deposits page.
- Advance rent: `rra-2026-whats-in-force-letting-agents.md` line 55 ("Advance rent is prohibited,
  before the tenancy and during it") agrees with the deposits page's two-layer treatment.
- Deposit protection unchanged: asserted on the RRA page (line 154), the PRS database page (line 169)
  and the deposits page (line 98). Consistent, and consistent with §20 (the Act changed what a
  landlord may charge, not how a deposit is taxed or protected).
- Social housing: the RRA page gives the roadmap year (2027) and labels it an expectation; the
  deposits page says a later phase with no appointed date. Both correct under §20.12; not a conflict.

---

## 5. Actions, in order

1. **MTD page, BLOCKER 1** — add the first-year 30-day late-payment grace and scope the percentages
   to the 2026 to 2027 tax year. Drop-in copy above.
2. **MTD page, BLOCKER 2** — one-clause fix so the fourth missed update triggers the first £200.
3. **house_positions §19.7** — record the first-year 30-day concession (once only) and the 2027-28
   step to 4%/4%/10%. Both are lock gaps, not writer drift, and both propagate to every MTD page.
4. **MEES page** — produce the URL for the 30 April 2026 gov.uk news page, or replace the quoted
   sentence in myth-table row 4 with the reported-speech version above. Pin the outcome in §26.3.
5. **MEES page, optional** — swap "It is coming" for "It is proposed" in row 1, and quote the
   government response verbatim at line 81.
6. **Deposits page, optional** — one clause scoping the £800 carpet answer to the cash basis; add the
   `/for-letting-agents` backlink for cluster symmetry.
