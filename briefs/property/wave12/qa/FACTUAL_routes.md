# Wave 12 adversarial factual QA — routes batch (A10-A13)

Run 2026-08-21. Read-only pass. Ground truth: `docs/property/house_positions.md` as patched
2026-08-21 eve (§5.B, §1.Q corrected, §26.14, §26.15, §39, §39.A upgraded) plus each brief's
Stage 2 record in `briefs/property/wave12/`.

## Verdicts

| # | Surface | Verdict | BLOCKER | ADVISORY |
|---|---|---|---|---|
| A10 | `selling-a-house-at-auction-uk` | **PASS** | 0 | 3 |
| A11 | `modern-method-of-auction-explained` | **PASS** | 0 | 2 |
| A12 | `part-exchange-house-uk` | **FAIL — hold** | 1 | 3 |
| A13 | `selling-a-probate-property` | **PASS** | 0 | 5 |

Batch total: **1 BLOCKER, 13 ADVISORY.** Three surfaces are shippable as written. A12 needs one
sentence rewritten before deploy.

---

## Dispatch figures reconciled first

The QA dispatch named three figures that do not appear on any of the four surfaces. All three are
the **pillar's** (`src/app/cost-of-selling-a-property/page.tsx`), worked on its own £293,000 HM Land
Registry anchor, not the routes' example prices. Nothing is wrong; recording it so it is not
re-raised.

| Dispatch figure | Actually lives at | Re-derivation |
|---|---|---|
| £7,030-£10,550 | pillar, auction commission only on £293,000 | 2.4% to 3.6% × £293,000 = £7,032 to £10,548. Correct. |
| £8,790 | pillar, MMoA reservation fee on £293,000 | 3% × £293,000 = £8,790. Correct. |
| A10 "cost table £7,030-£10,550" | A10's own table is **£6,610 to £9,760** on a £250,000 sale | £6,000 + £360 + £250 = £6,610; £9,000 + £360 + £400 = £9,760. Correct, and it is a different quantity (all auction fees, not commission alone). |

No cross-page conflict: the pillar row is labelled commission, A10's row is labelled
"Total, auction fees only".

---

## Every worked figure re-derived

**A10, £250,000 sale.** Commission 2%-3% + VAT → £6,000-£9,000 ✓. Entry £300 + VAT = £360 ✓.
Legal pack £250-£400 ✓. Total £6,610-£9,760 ✓, summary's "roughly £6,600 to £9,800" is a fair
round ✓. "2% to 3% plus VAT is really 2.4% to 3.6%" ✓. Minimum-fee illustration: 3% × £60,000 =
£1,800 (above the £1,500 floor) ✓; 3% × £45,000 = £1,350 (floor bites) ✓. CGT line: £250,000 −
£190,000 = £60,000, less ~£7,000 = £53,000 ✓.

**A11, £275,000 lot.** 2.5% + VAT = 3.0% inc VAT; 3% × £275,000 = £8,250 ✓, matching HOA's own
worked case. Buyer cash total £8,250 + £349 = £8,599 ✓ (£349 BIP fee verified at brief line 127).
Incidence block: agent 1.5% inc VAT × £275,000 = £4,125 ✓; keep £275,000 − £4,125 = £270,875 ✓;
MMoA keep £275,000 − £8,250 = £266,750 ✓; gap £270,875 − £266,750 = £4,125 ✓. £6,000 inc VAT floor
does not bite at this price ✓.

**A12, £300,000 home.** 80%-90% → £240,000-£270,000 ✓, given up £30,000-£60,000 ✓. Agent 1.42% inc
VAT × £300,000 = £4,260 ✓. Keep on open market £300,000 − £4,260 = £295,740 ✓. "seven to fourteen
times the fee you avoid": 30,000 ÷ 4,260 = 7.04, 60,000 ÷ 4,260 = 14.08 ✓. Taylor Wimpey 70% cap:
300,000 ÷ 0.70 = £428,571 ✓. Barratt 80%: 300,000 ÷ 0.80 = £375,000 ✓. Discount return line:
£300,000 − £255,000 = £45,000 given up, × 24% = £10,800 back ✓ (= 24p in the pound ✓).

**A13, £290,000 sale.** Agent 1.42% inc VAT × £290,000 = £4,118 ✓. Table low 4,118 + 610 + 60 + 250
+ 2,900 + 300 + 150 = **£8,388**; high 4,118 + 950 + 120 + 600 + 2,900 + 1,200 + 400 = **£10,288**.
Stated "about £8,400 to £10,300" ✓. Ordinary-sale comparator 4,118 + (610-950) + (60-120) = £4,788
to £5,188, stated "about £5,000" ✓. SP2/04 application: 1% × £290,000 probate value = £2,900 ✓,
band correct for a £340,000 estate ✓. Worked example: £298,000 − £290,000 = £8,000 uplift; 1.42% ×
£298,000 = £4,232 ✓; conveyancing mid £780 = (610+950)/2 ✓; EPC mid £90 = (60+120)/2 ✓; + £2,900 =
**£8,002** ✓ against an £8,000 uplift → nil gain, no 60-day return ✓.

---

## Ground-truth checks, all four surfaces

| Check | A10 | A11 | A12 | A13 |
|---|---|---|---|---|
| Two-date trap stated correctly (s.28 exchange vs FA 2019 completion) | ✓ hammer = contract, 30 Mar / 27 Apr worked | ✓ exchange, and reservation expressly **not** the contract | n/a (page states no disposal date) | ✓ twice, FAQ + body |
| Auction discount NOT asserted as fact (Stage 2 rule) | ✓ refuses explicitly | ✓ | ✓ (PX discount attributed to Zoopla, labelled commentary) | ADV-A13-3 |
| Clive Emson counter-position attributed | ✓ 15 Sep 2025, labelled "an auctioneer describing its own market" | n/a | n/a | n/a |
| Developer's-relief framing (never "you get SDLT relief") | n/a | n/a | ✓ strongest in batch: "It is theirs, not yours" | ✓ "It is never yours" |
| §26.15 redress (non-statutory, NHQB V2 Mar 2026) | n/a | n/a | ✓ body + FAQ; CCHB see ADV-A12-2 | n/a |
| No statutory pre-grant bar | n/a | n/a | n/a | ✓ "No statute bans a pre-grant sale and none permits one" |
| gov.uk quotes verbatim | n/a | n/a | n/a | ✓ both exact against §39.A |
| Sch 6A paragraph attributions vs corrected §1.Q | n/a | n/a | ✓ no paragraph numbers in prose; substance correct for paras 1/2/4 | ✓ para 3 (trader from PRs) correct incl. 2-year, refurb-cap, no-lease, no-occupation conditions |
| s.22(1)(c) F-177 conditional | ✓ "if you end up keeping a forfeited deposit" | ✓ **best treatment in batch** — retained-fee-not-to-seller quoted, seller-receipt fork stated | n/a | n/a |
| s.38(2) exhaustive list / removals-ERC correction | ✓ | ✓ | ✓ | ✓ |
| s.17 arm's length, genuine discount not re-based | n/a | n/a | ✓ implicit ("The builder is not connected to you, so the tax is worked out on the price you actually agreed") | n/a |
| CG14300 gross-of-VAT rule for private sellers | ✓ | ✓ | ✓ | ✓ explicit |
| SDLTM03720 three indicators, no product-specific HMRC statement | n/a | ✓ twice, dated 26 May 2026, linked | n/a | n/a |
| SDLTM04020 (SDLT on value acquired, not cash difference) | n/a | n/a | ✓ | n/a |
| SP2/04 scale live + s.38(1)(b) framing | n/a | n/a | n/a | ✓ full scale, actual-costs election, "separate category from the selling costs"; band edges see ADV-A13-1 |
| PR AEA (year of death + 2) / PR rate 24% 2026/27 per gov.uk | n/a | n/a | n/a | ✓ both, rates page linked |
| Zero hard statute in prose | ✓ 0 | ✓ 0 | ✓ 0 | ✓ 0 |
| Em-dashes | 0 | 0 | 0 | 0 |
| metaTitle ≤ 60 / metaDescription ≤ 155 | 48 / 145 | 52 / 138 | 48 / 146 | 51 / 142 |
| FAQ count 10-14 | 12 | 12 | 12 | 13 |
| Internal links resolve | 10/10 | 11/11 | 11/11 | 15/15 |

Link resolution verified against `slugifyCategory()` in `Property/web/src/lib/blog.ts` (`&` → `and`),
the calculators `[slug]` registry (`cost-of-selling-calculator`, `capital-gains-tax-calculator`,
`stamp-duty-calculator` all present) and `src/app/cost-of-selling-a-property/page.tsx`. **44 of 44
internal links resolve. No dead links.**

Cross-page shared figures: auction **2% to 3% + VAT, minimum from £1,500** identical on A10 and the
pillar ✓. MMoA **at least 2.5% + VAT or £6,000 inc VAT minimum** identical on A11 and the pillar ✓.
HOA **1.42% inc VAT** identical on A12, A13 and the pillar ✓ (A11 uses 1.5%, see ADV-A11-1).

---

# BLOCKER

## BLK-A12-1 — the CGT permitted area is stated as a flat half-hectare line, which is wrong, and the §1.Q difference is never noted

`Property/web/content/blog/part-exchange-house-uk.md`, "Do you pay capital gains tax on a part
exchange?".

> "Or the garden and grounds run past the half hectare line, so the extra land sits outside the
> relief."

TCGA 1992 s.222(3) extends the permitted area above 0.5 hectare where the larger area is required
for the reasonable enjoyment of the dwelling-house **as a residence, having regard to its size and
character**. Land past half a hectare therefore does **not** automatically sit outside relief. The
brief fetched both provisions verbatim on 2026-08-21 (`part-exchange-house-uk.md` lines 57-60) and
issued the writer rule: "say the baseline is the same 0.5 hectare in both, note that the CGT
extension test is expressly tied to enjoyment as a residence and to the size and character of the
house while the SDLT one is not, and stop there." §1.Q carries the same resolution.

The page also never notes the difference anywhere. It uses "permitted area" and "half hectare" for
both the Sch 6A test and the PRR test without distinguishing them. It does not breach the hard rule
("no page may assert they are the same test"), but a reader takes them as one test, which is exactly
the drift §1.Q was written to stop. The SDLT-side sentence in "Do you qualify?" is fine as written
("which starts at half a hectare"), because "starts at" already signals the extension.

**Drop-in fix.** Replace the quoted sentence with:

> Or the garden and grounds are bigger than the relief reaches. The starting point is half a hectare
> including the ground the house stands on, and a larger area counts only where it is genuinely
> needed to enjoy the house as a home, judged against the size and character of the house itself.
> Anything past that sits outside the relief. Worth knowing that this is not word for word the same
> test as the builder's stamp duty one, which has the same half hectare starting point but does not
> tie the larger area to enjoying the place as a residence. A big garden can pass one and fail the
> other.

That closes the factual error and lands the §1.Q differentiator in the same breath, on a page whose
whole pitch is the tax layer.

---

# ADVISORY

## ADV-A12-2 — Consumer Code for Home Builders named as fact with no source, against an explicit lock guard

Body: "A second voluntary code, the Consumer Code for Home Builders, still runs alongside it."
FAQ 12: same claim.

§26.15's Stage 2 open item reads: "confirm whether the Consumer Code for Home Builders still
operates alongside the NHQB code, and for which developers, **before naming either on a page**."
The brief only **partially** resolved it: `consumercode.co.uk` returned HTTP 403 to automated fetch
on 2026-08-21, so the writer rule is "the page may say two voluntary codes currently operate and a
buyer should check which one their developer signed up to, **sourced to the warranty providers' own
pages**, and must not quote the Consumer Code's own site."

The page carries the permission but not the condition. Not factually wrong (LABC Warranty, NHBC,
Premier Guarantee and Checkmate all describe the two codes coexisting), but it publishes an
unverified-at-source fact that a lock specifically flagged.

**Drop-in fix.** Append one clause in both places:

> A second voluntary code, the Consumer Code for Home Builders, still runs alongside it, and the
> major warranty providers list it as the code their registered builders follow.

## ADV-A12-3 — metaDescription asserts the Zoopla range unattributed

> "Part exchange gets you 80% to 90% of market value. See what that costs on a £300,000 home, who
> qualifies, and how to push the builder's number up."

The Stage 2 writer rule requires the 80-90% range to be attributed explicitly and labelled as press
commentary. The body does this four times; the meta does not, and the meta is what appears in the
SERP. Currently 146 chars, so there is room.

**Drop-in fix** (154 chars):

> "Zoopla puts part exchange at 80% to 90% of market value. See what that costs on a £300,000 home,
> who qualifies, and how to push the builder's number up."

## ADV-A12-4 — NHQB code dates and the uncommenced 2022 Act carry no link

"version 2 of March 2026 for homes reserved from 2 March 2026 and version 1 of October 2023" and
"Parliament passed a law in 2022" are both stated as fact with no outbound link, on a page that
links Barratt, Taylor Wimpey and Zoopla. `https://www.nhqb.org.uk/` fetched HTTP 200 at Stage 2.
Add the NHQB link on first mention of the code version. Low priority; the facts match §26.15.

## ADV-A10-1 — summary credits three publishers for a total only two of them feed

Summary: "roughly £6,600 to £9,800 including VAT, using the fee ranges published by Auction Link,
Clive Emson and the HomeOwners Alliance." The total is built from Auction Link (commission, entry
fee) and Clive Emson (legal pack). HOA's 2.5% is a corroborating second reading in the table, not an
input. Defensible as written but loose. Cut "and the HomeOwners Alliance" or change to "using the
fee ranges published by Auction Link and Clive Emson, with a second reading from the HomeOwners
Alliance".

## ADV-A10-2 — the two Clive Emson legal-pack figures read as contradicting each other

Table and FAQ 9 both carry "£250 and above, with average costs of roughly £200 to £400". The
average range starts £50 below the stated floor. This is source-faithful (brief line 62 quotes both
sentences verbatim from the 20 March 2025 guide), so it is not a factual finding, but a reader hits
it as an error. Suggest: "£250 and above on Clive Emson's own guide, which also gives a wider market
average of roughly £200 to £400, and more for leasehold."

## ADV-A10-3 — DMCCA Sch 20 paras 5 and 7 carry two prose claims but are not in §26.14

Body: "The new list of banned practices includes advertising something at a price the seller knows
it cannot be sold at. It also bans manufactured urgency designed to make you decide on the spot."
FAQ 2 restates the first.

Both are correct and brief-verified (Sch 20 para 5 bait advertising, para 7 false scarcity, in force
6 April 2025 by SI 2025/272, verified 2026-08-21). But §26.14 records only ss.225/226/227/230 and
the CPUTR revocation — **the 32-item always-unfair Sch 20 list is not in the lock**. Once the brief
is archived, the only place these two live facts exist is this page. Recommend folding one bullet
into §26.14: "DMCCA 2024 **Sch 20**, 32 always-unfair practices, incl. para 5 bait advertising and
para 7 false scarcity; same 6 Apr 2025 commencement." No page change needed.

One drafting nit in the same sentence: the banned practices bind the **trader** (the auction house),
not "the seller". Consider "a price the auction house knows it cannot be sold at".

## ADV-A11-1 — the incidence block uses a 1.5% agent fee where every sibling and the pillar use the sourced 1.42%

"An agent fee of 1.5% including VAT costs you £4,125." A12, A13 and the pillar all use the HOA 2026
average of 1.42% inc VAT. The page discloses it ("The agent fee is an assumption rather than a
published average, so treat it as an example") and the brief sanctions it, so this is not a
correctness finding.

Recording the trade-off so it is a decision and not an accident: 1.5% was chosen because it is
exactly half of the 3% reservation fee, which is what makes the closing line "The gap. £4,125, in
the buyer's favour" land as a clean identity. At the sourced 1.42% the fee is £3,905, the agent-route
keep is £271,095, and the gap becomes £4,345 — no longer equal to the fee, and the paragraph loses
its punch. Leave as is unless the conductor wants estate-wide rate consistency to win, in which case
all three numbers move together.

## ADV-A11-2 — "Buyer's cash total, fees only" omits two buyer-paid rows above it in the same table

The total row gives £8,599 (reservation fee + buyer information pack) while the table's own
"Legal work and searches, buyer's side" row is also marked "Buyer". "Fees only" is doing a lot of
work. FAQ 3 states it correctly ("you need the £275,000 and a further £8,250 including VAT, plus
your deposit, your legal costs and your searches"). Suggest relabelling the row "Buyer's cash total
on that £275,000 lot, platform fees only".

## ADV-A13-1 — SP2/04 band boundaries rendered as overlapping ranges

The scale table reads "£50,000 to £90,000", "£90,000 to £400,000", "£400,000 to £500,000",
"£500,000 to £1,000,000", "£1,000,000 to £5,000,000". The source (transcribed at brief lines 65-71,
gov.uk fetched HTTP 200 2026-08-21) reads "Over £50,000 but not exceeding £90,000" and so on. As
published, an estate at exactly £50,000, £90,000, £400,000, £500,000 or £1,000,000 falls in two rows
at once, and the £50,000 boundary contradicts row 1 ("Not more than £50,000"). Same issue in the
at-a-glance bullet ("where the estate falls between £90,000 and £400,000").

**Drop-in fix.** Change the six band cells to "Over £50,000, up to £90,000", "Over £90,000, up to
£400,000", "Over £400,000, up to £500,000", "Over £500,000, up to £1,000,000", "Over £1,000,000, up
to £5,000,000", and the bullet to "where the estate is over £90,000 and up to £400,000". Row 1
("Not more than £50,000") and row 7 ("Over £5,000,000") are already right.

## ADV-A13-2 — the IHT loss-on-sale paragraph runs three sentences with no link, against the freeze-adjacency cap

> "One trap worth naming. If you sell within three years of the death for less than the probate
> value, the estate may be able to reclaim inheritance tax on the difference. Making that claim also
> resets the starting cost for capital gains tax to your sale price, so the loss you were expecting
> to bank disappears. Take advice before you claim."

Factually correct and correctly avoids the §39 four-year trap (three years is the sale window, four
is the claim deadline for land sold in the third year) ✓. But the brief caps this at "one sentence
and a link each, maximum" (line 49), and the topic is owned by
`cgt-inherited-rental-property-calculation-uk`, which carries it at depth in both its FAQ and body.
This page links that post twice elsewhere but not here.

**Drop-in fix.** Add the link to the last sentence: "Take advice before you claim, and the full
mechanics are on <a href="/blog/capital-gains-tax/cgt-inherited-rental-property-calculation-uk">capital
gains tax on an inherited property</a>." Wording is consistent with the owner page, so no
back-patch is needed there.

## ADV-A13-3 — "a substantial discount" for cash-buying companies is unsourced

> "A cash-buying company gets you speed and a substantial discount."

Not the auction discount, so the A10 Stage 2 rule does not strictly bite, but it is an unsourced
size claim on a wave whose whole differentiator is provenance. Suggest "gets you speed, and prices
that speed into the offer" — same meaning, no unsourced magnitude.

## ADV-A13-4 — the two verbatim gov.uk quotes carry no link

"You should not make any financial plans or put property on the market until you've got probate" and
"You'll normally have to start paying Inheritance Tax before probate is granted" are both exact
against §39.A ✓, attributed to gov.uk in prose, but not linked. The page links gov.uk twice
elsewhere (SP2/04, the CGT rates page), so the omission is visible. Add the "Applying for probate"
URL on first quote.

## ADV-A13-5 — "about £5,000" for an ordinary sale reads against the pillar's "about £5,500"

A13 opens on "about £5,000" for an ordinary sale of a £290,000 house; the pillar opens on "about
£5,500" for a £293,000 house. Both are right and both are HOA-derived: the pillar includes £550 of
removals, A13 excludes them because removals are excluded from its own probate table too (and are
not deductible per §5.B). The methodology is consistent; the reader crossing from one page to the
other cannot see why. Suggest A13 says "about £5,000 before removals" — four words, closes it.

---

## Not findings, checked and cleared

- **EPC deductibility.** A10 and A13 both list the EPC as coming off the gain. This matches the live
  house position on `epc-certificate-cost-uk`, which pins it to the s.38(2) advertising-to-find-a-buyer
  limb with CG15250. Consistent, not a stretch. Noted separately: the **pillar's** own deduction list
  (agent commission, solicitor, advertising, auctioneer) omits the EPC and the computation valuation.
  Pillar gap, outside Wave 12 scope, worth one line on the pillar pass.
- **A11 traditional-auction "28 days per iamsold".** Verified at brief line 62: iamsold's own FAQ
  says traditional auction "Completion is then generally expected within 28-days". Same source used
  on A10. Correct.
- **A11 £349 buyer information pack.** iamsold's published figure, brief line 127. Correct.
- **A13 £340,000 estate in the worked example.** Introduced as a stated assumption in the same
  sentence; the £2,900 is 1% of the £290,000 probate value, not of the estate, which is what the
  scale actually says. Correct.
- **A10 minimum-fee arithmetic.** £1,800 vs £1,350 against a £1,500 floor, both computed ex-VAT,
  consistent with how Auction Link quotes the floor. Correct.
- **A12 Sch 6A para 1 conditions.** All five reproduced in FAQ 9 and the body, matching §1.Q exactly,
  with no paragraph numbers in prose. Correct.
- **A13 trader-from-PRs relief (para 3).** Two-year pre-death residence test, refurbishment cap,
  no-lease/licence, no-connected-occupation, all present and correct against corrected §1.Q, framed
  as the buyer's relief. Correct, and it is the batch's strongest unclaimed asset.
- **Pipeline-artefact sweep.** No "verify at build", no inline "(HP…)" codes, no generator leakage in
  body text on any of the four.

---

## One recommendation for the lock, not the pages

Fold **DMCCA 2024 Sch 20** (32 always-unfair practices, para 5 bait advertising, para 7 false
scarcity, in force 6 Apr 2025 by SI 2025/272) into **§26.14**. Two live claims on A10 currently rest
only on the brief, and briefs archive. One bullet, no page change. See ADV-A10-3.
