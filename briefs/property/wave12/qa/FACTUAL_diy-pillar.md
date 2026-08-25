# FACTUAL QA — Wave 12 DIY / cost-of-selling cluster (A3, A4, A5, pillar)

**Run:** 2026-08-21, adversarial factual pass. **Mode:** refute. **Edits made to surfaces: none.**

**Ground truth used:** `docs/property/house_positions.md` §5 (rates, 60-day), §5.B as patched
2026-08-21 EVE (exhaustive s.38(2), s.38(3), CG14300 gross-fee VAT rule, s.28 two-date trap),
§26.14 (EAA 1979 s.1(1)/s.1(4), s.18 + s.18(5)/(6), SI 1991/859 reg 5 + Sch, SI 2008/1712 art 2,
£1,000 penalty per SI 2008/1713 reg 2, DMCCA 2024 + CPUTR revocation, LSA 2007 Sch 3 para 3(10)
with its para 3(3)(d) ceiling, HMLR PG 67 / ID1, SI 2013/3134 regs 30/31/36), §39.A (AEA 1925
s.2(2)), plus each surface's brief in `briefs/property/wave12/` and `_language_spec.md` hard rules.

**Spot-verified live (3 fetches, 2026-08-21):**

| Source | Result |
|---|---|
| gov.uk "Completing forms ID1 and ID2" | Section B: "a conveyancer, Chartered Legal Executive or a Licensed Probate Practitioner (regulated by the Council for Licensed Conveyancers)." Accountants / doctors / dentists / financial advisers / MPs are **not** on it; that list belongs to **form ID3** ("a full list of accepted professions ... for verification by a non-conveyancer"). |
| moneysavingexpert.com/mortgages/how-to-sell-a-house/ (upd. 1 Jul 2026) | "Agency fees £0 - £400" sits in the **private-selling** column of the cost comparison table. DIY all-in **£900 to £3,250**. Named **online agent** flat fees: Visum £129, Emoov £395, **Yopa £999**, **Purplebricks £999-£1,599**. Conveyancing £800-£1,500. EPC £50-£120. High street 0.75%-3% + VAT. |
| hoa.org.uk .../how-much-should-i-pay-the-estate-agent/ | "The average estate agent fee in 2026 is 1.42% including VAT." Overall 0.9%-3.6%; sole agency 1.2%-1.8% inc VAT; multi-agency 3%-3.6% inc VAT. |

---

## Verdicts

| Surface | Verdict | Blockers | Advisories |
|---|---|---|---|
| A3 `sell-house-without-estate-agent` | **BLOCKED** | 3 (+ share of B4) | 5 |
| A4 `can-you-sell-a-house-without-an-estate-agent` | **PASS WITH FIXES** | share of B4 only | 3 |
| A5 `online-estate-agents-uk` | **PASS WITH FIXES** | share of B4 only | 3 |
| Pillar `/cost-of-selling-a-property` | **PASS WITH FIXES** | share of B4 only | 5 |

Mechanical gates, all four: metaTitle 54 / 50 / 47 / 48 (≤60 ✓), metaDescription 140 / 143 / 153 /
144 (≤155 ✓), FAQ 14 / 14 / 14 (blog gate 10-14, at the ceiling ✓) and pillar 8 (matches its own
tracker spec row "FAQ block 8 Qs / 800 w reported separately" ✓, blog gate does not apply),
hard statutory references in prose **0** on all four ✓, em/en-dashes **0** on all four ✓,
**59 / 59 internal links resolve** ✓ (both calculators render off `/calculators/[slug]` via
`registry.ts`; `capital-gains-tax-property-complete-guide-uk` exists with unquoted frontmatter).

---

# 1. THE AFTER-TAX FORK — ADJUDICATED

## 1.1 The arithmetic, derived from §5.B

With an agent: net = `P − F_a − r(P − B − F_a)`. Doing it yourself: net = `P − F_d − r(P − B − F_d)`.

Difference = `(F_a − F_d) − r(F_a − F_d)` = **`(F_a − F_d) × (1 − r)`**.

This holds because **both** sides of the subtraction are deductible: the agent's commission under
s.38(1)(c)/(2)(a) ("fees, commission or remuneration ... of any ... agent"), and the replacement
listing spend under **s.38(2)(b)** (advertising to find a buyer). Every figure gross of VAT for a
private seller per CG14300. So:

> **after-tax saving = cash saving × (1 − rate).** Nothing else moves.

Two corollaries, both load-bearing:

1. **The break-even sale price is unchanged by tax.** Saving S, price gap G: a taxable seller keeps
   0.76S and loses 0.76G, so break-even is G = S at any rate. **F-181 point 2 is correct and should
   be adopted wave-wide as a do-not-write.** No surface in scope breaches it.
2. **Route-neutral costs must not appear on either side.** Conveyancing, the EPC and removals are
   paid on both routes and cancel out.

## 1.2 Who is right

**Both A3 and A4 apply the multiplier correctly.** £3,181 × 0.82 = £2,608.42 → £2,608 ✓;
× 0.76 = £2,417.56 → £2,418 ✓. £3,860 × 0.76 = £2,933.60 → £2,934 ✓. The dispute is **not**
arithmetic. It is the input `F_d`, and the two pages priced **two different routes**.

**F-181 point 1 is half right.** The brief's *composition* of £1,079 ("a fixed listing fee, an EPC
and photography") is wrong: £999 + £80 leaves no room for photography, and the EPC is route-neutral.
But £3,181 **is** derivable — £999 is Yopa's price and Purplebricks' entry price in MSE's own
1 July 2026 table (the same guide A4's brief cites for £0-£400), and £80 is the identity/AML check
Purplebricks charges outside its headline. So neither page is wrong; **the brief mislabelled the
components and no page names its route.**

## 1.3 The adjudicated set — both routes, all four surfaces

**ROUTE 1 — no agent at all** (board, private-sale site, local groups, word of mouth; *not* on
Rightmove). MSE "Agency fees £0 to £400", private-selling column, updated 1 July 2026.

| Line | £300,000 |
|---|---|
| Commission avoided, 1.42% inc VAT (HOA 2026) | £4,260 |
| Spend instead | £0 to £400 |
| **Cash saving** | **£3,860** (top of range) to £4,260 |
| After tax at 18% | **£3,165** |
| After tax at 24% | **£2,934** |
| Break-even price gap | 1.3% of price, **unchanged by the tax rate** |

**ROUTE 2 — online agent / paid listing that reaches the portals.** Flat fee £999 (Yopa, and
Purplebricks' entry package, MSE 1 July 2026; Purplebricks' own packages page 21 August 2026),
plus the £80 identity check charged outside the headline price.

| Line | £300,000 | £293,000 (pillar anchor) |
|---|---|---|
| Commission avoided, 1.42% inc VAT | £4,260 | £4,160 |
| Flat fee | £999 | £999 |
| Identity / AML check | £80 | £80 |
| **Cash saving** | **£3,181** | **£3,081** |
| After tax at 18% | **£2,608** | £2,526 |
| After tax at 24% | **£2,418** | £2,342 |
| Break-even price gap | 1.1% of price | 1.1% |

Route 2's spread across named providers is £129 to £1,599 (MSE) and £300 to £1,500 as the market
band (Which?, 8 June 2026). MSE's **£900 to £3,250 all-in belongs to ROUTE 1**, and includes
conveyancing and the EPC.

**Landing figures per surface:** A3 £3,181 / £2,608 / £2,418 (Route 2, relabelled) · A4 £3,860 /
£2,934 (Route 1, labelled, cross-referencing £3,181) · A5 **£3,181** (was ~£3,300) · pillar
**£3,081** (was £3,160), or print both as "£3,160 on the headline fee, £3,080 once the £80 check
goes in".

---

# 2. BLOCKERS

## B1 · A3 · The ID1 section B professional list is the **form ID3** list — wrong on two surfaces

**Body, line 137:** "Section B of that form has to be completed by a conveyancer, or by one of the
professionals the guidance lists, which includes a chartered or certified accountant, a doctor, a
dentist, a regulated financial adviser or an MP."

**FAQ "What is form ID1 and why do you need it?", line 37:** "Section B of the form has to be
completed by a conveyancer or one of the listed professionals, which includes a chartered or
certified accountant, a doctor, a dentist, a regulated financial adviser or an MP."

gov.uk "Completing forms ID1 and ID2" (published 19 Aug 2014, updated 5 Feb 2024, re-fetched
2026-08-21): section B is completed by "a conveyancer, Chartered Legal Executive or a Licensed
Probate Practitioner (regulated by the Council for Licensed Conveyancers)". The accountant / doctor
/ dentist / financial adviser / MP list is the **form ID3** verifier list, which A3's own brief
records correctly at line 59 ("Form **ID3** verifiers include ..."). The writer read the ID3 line
and printed it as ID1. **A4 states it correctly at lines 33 and 78, so the two pages contradict
each other on the same fact.**

This one matters commercially as well as factually: it tells a DIY seller their accountant can sign
the form, which is exactly the reader Property Tax Partners attracts.

**Drop-in, body line 137:** "Section B of that form has to be completed by a conveyancer, a
Chartered Legal Executive or a licensed probate practitioner regulated by the Council for Licensed
Conveyancers. There is a separate form for verification by other professionals, but ID1 is the one
a private individual uses, and it needs one of those three."

**Drop-in, FAQ line 37:** replace "which includes a chartered or certified accountant, a doctor, a
dentist, a regulated financial adviser or an MP" with "which means a conveyancer, a Chartered Legal
Executive or a licensed probate practitioner. Your accountant cannot sign this one."

The £6,000 low-value carve-out on both is correct and stays.

## B2 · A3 · The £80 in the £1,079 is labelled an EPC, and the EPC is route-neutral

**Line 168:** "the DIY spend is a mid range listing package at £999 plus an energy certificate at
£80." **Table line 173:** "£1,079 | Mid range listing package £999 plus certificate £80."
**FAQ line 45:** "roughly £1,079 for a mid range listing package and an energy certificate."

The same page states the correct principle three rows earlier, **line 67**: "Conveyancing: paid on
either route, so it is not part of the saving." The EPC is required before marketing on both
routes; A4's own comparison table prints £50-£120 in **both** columns; the pillar carries it as a
standalone line on the agent route. Putting it only on the DIY side is a double-count and
contradicts A3's own rule.

The figure £1,079 is nonetheless **correct** once the £80 is identified as what it actually is: the
identity/AML check charged outside the online agent's headline price (A5 line 161 already uses
exactly "£1,079" on that composition; the pillar names the same £80 at line 300). So the fix is a
relabel, not a recalculation, and £3,181 / £2,608 / £2,418 all survive.

**Drop-in, line 168:** "The house is a former rental worth £300,000, so the gain is chargeable, and
the DIY spend is a £999 flat fee, the entry price at two of the named providers on MoneySavingExpert's
July 2026 list, plus the £80 identity check one of them charges outside that headline. The energy
certificate is not in this sum, because you pay for it whichever route you take."

**Drop-in, table line 173:** `£1,079` | `£999 flat fee (MoneySavingExpert, 1 July 2026) plus an £80
identity check charged outside it`.

**Drop-in, FAQ line 45:** "against roughly £1,079 for a £999 flat fee and the £80 identity check
that sits outside it."

## B3 · A3 · The cost table's total row does not total the table, and imports a different route's range

**Table line 165:** "**Total, all in** | **£900 to £3,250** | MoneySavingExpert, updated 1 July 2026".

Two defects.

1. **It does not total its own rows.** The rows above are listing £129-£1,599, EPC £50-£120,
   conveyancing £800-£1,500, disbursements £40-£90. Minimum = **£1,019**, not £900. Maximum =
   **£3,309**, not £3,250. Hard rule 8 requires a total row; a total row that contradicts the rows
   above it is worse than none.
2. **It is the wrong route's figure.** Verified on MSE 2026-08-21: £900-£3,250 is MSE's all-in for
   the **private-sale** route, the one whose agency line is £0-£400. A3's table is built on the
   £129-£1,599 online-agent prices. The two cannot share a total.

**Drop-in:** change the label and the source cell so it stops claiming to be a sum —
`**Total, all in**` | `**£1,020 to £3,310** on the rows above. MoneySavingExpert's own all-in for
selling with no agent at all, where the agency line is £0 to £400, is £900 to £3,250` |
`Calculated from the rows above; MoneySavingExpert, updated 1 July 2026`.

## B4 · CROSS-SURFACE · Four different answers to the same question, none of them route-labelled

| Surface | Prints | On | Route actually priced |
|---|---|---|---|
| A3 line 60, 174 | £3,181 | £300,000 | Route 2 (£999 + £80) |
| A4 line 52, 110, 120 | £3,860 | £300,000 | Route 1 (£0-£400) |
| A5 line 50, 153 | "roughly £3,300" | £300,000 | Route 2, **but with the £80 dropped** |
| Pillar line 363, FAQ 5 | "roughly £3,160" | £293,000 | Route 2, **but with the £80 dropped** |

A3 and A4 interlink twice each; A5 and the pillar link to both. A reader crossing two of these sees
noise, and the cluster's stated differentiator is provenance.

Two of the four are also **internally** inconsistent, which is what makes this a blocker rather than
an editorial nit:

- **A5 line 121** tells the reader "An £80 identity check that every seller pays is part of the cost
  of selling rather than an optional extra, so add it in when you compare", and **A5 line 161** then
  uses "£1,079" as the all-in. Its own headline at lines 50 and 153 does not add it.
- **The pillar line 300** names the same £80 as sitting "outside its headline price", then its
  line 363 and FAQ 5 compute the gap without it.

**Fixes, per §1.3:**

- **A3** — no figure change. Add the route label at line 60: "That is the route that gets you on to
  the portals. Sell with no agent at all and a private listing package is £0 to £400
  (MoneySavingExpert, 1 July 2026), which puts the saving nearer £3,860 and the work squarely on
  you." Plus B2's relabel.
- **A4** — no figure change. Label the route at line 52: "A private listing package, the no-agent-at-all
  route, costs £0 to £400, per MoneySavingExpert in July 2026. So the cash on the table is roughly
  £3,860. Take the online-agent route instead, which is the only one that reaches Rightmove, and a
  £999 flat fee plus the £80 identity check leaves about £3,181." Optionally add the 18% figure
  (£3,165) at line 156 for parity with A3.
- **A5 line 50** — "So the saving is real, and on that sale it is roughly **£3,300**" →
  "So the saving is real, and on that sale it is about **£3,180** once the £80 identity check goes
  in with the fee."
- **A5 line 153** — "The saving on a £300,000 sale is around **£3,300** against the high street
  average" → "around **£3,180** against the high street average, with the £80 check included".
- **Pillar line 363** — "a £999 fixed fee leaves you roughly **£3,160** better off before anything
  else happens" → "a £999 fixed fee leaves you roughly **£3,160** better off, or about **£3,080**
  once the £80 check below goes in with it".
- **Pillar FAQ 5 (line 113)** — "is a gap of about **£3,160**" → "is a gap of about **£3,160**, or
  **£3,080** with the £80 identity check that sits outside the headline price".

---

# 3. ADVISORIES

## A3

**A3-1 · The portal paradox is stated as a legal absolute.** Line 97: "The two things cannot both be
true at once. If the route gets you on to Rightmove, it runs through a business that is an estate
agent in law." The **legal test itself is correct** to §26.14 — s.1(1) (business, on instructions
from another) and s.1(4) (pure advertiser / information-disseminator / direct buyer-seller channel
is outside the Act) are both stated accurately at lines 56 and 95. The overstatement is the
inference: Rightmove's "registered estate and letting agents" means registered **with Rightmove**,
not registered under any statutory scheme, and nothing stops an s.1(4)-exempt advertiser holding
portal membership and joining a redress scheme voluntarily. A3's own brief warns at line 40 that
several named intermediaries hold redress membership and "must not be overstated", though its
Stage 2 at line 62 does frame it as mutually exclusive, so the writer followed the brief.
**Drop-in:** "In practice the two do not coexist. If the route gets you on to Rightmove, it almost
always runs through a business doing estate agency work". Keep the rest verbatim; the "ask which
approved redress scheme they belong to" test is the useful part and survives untouched.

**A3-2 · £999 is not "the mid range of the sourced figures below".** Line 60: "comes to roughly
£1,079 on the mid range of the sourced figures below". Mid of £129-£1,599 is £864; mid of
£300-£1,500 is £900. £999 is neither. It is Yopa's price and Purplebricks' entry price on MSE's
1 July 2026 list. Fold into B2's drop-in, which attributes it.

**A3-3 · The "listing-only service" FAQ is answered with online-agent prices.** FAQ line 25: "What
does a listing-only service cost?" → "MoneySavingExpert ... records fixed fees ranging from £129 to
£1,599". Those are Visum, Emoov, Yopa and Purplebricks: online **agents**, per A5 line 101. On a page
whose central original point is that an advertiser and an agent are different things in law, pricing
"listing-only" with agent fees undercuts its own test. **Drop-in:** retitle the FAQ "What does a
paid listing route cost?" and open "The services that get you on to the big portals are online
agents rather than pure listing sites, which is why they can list you at all."

**A3-4 · Hard rule 13 (the CGT freeze) is breached, and the armed cgt1 batch is the exposure.**
Rule 13: "The CGT block is one block, plain words, one pound figure, one link out. No rate table, no
annual exempt amount explainer, no PRR mechanics, **no 60-day filing walkthrough**." A3 carries
(i) a five-row after-tax table printing both 18% and 24%, (ii) three paragraphs of deduction
reasoning at lines 179-183, (iii) an entire further H2, "Step ten: the tax return nobody reminds you
about", lines 185-191, which is a 60-day filing walkthrough with the £100 penalty and the
March/May worked example, and (iv) four CGT links out. The brief itself says at line 17 "Hook plus
one worked line only; cgt1 owns the mechanics." `picks.yaml` header: "cgt1 batch is ARMED to
~11-19". This is the page most likely to contaminate an armed experiment window.
**Recommendation:** keep the after-tax table (it is the wave's differentiator and is not cgt1's
keyword set), compress "Step ten" to two sentences plus the existing link to
`cgt-payment-deadlines-property-sales-2026`, and drop the £100 penalty figure.

**A3-5 · TA6 sixth edition is single-sourced.** Lines 31 and 116 date the sixth edition to
30 March 2026 on the HomeOwners Alliance's guide, because the Law Society's own page returned 403
(brief F-169). Attribution is on the page, so this is a watch item rather than a defect. Re-verify
against the Law Society before the next back-patch window.

## A4

**A4-1 · The exclusivity claim is more absolute than A3's.** Line 86: "You can be outside the rules
or you can be on the portal. You cannot be both." Same analysis as A3-1. **Drop-in:** "In practice
you get one or the other: the routes that reach the portal are doing agency work, and the ones that
genuinely sit outside the rules do not reach it."

**A4-2 · The fork prints 24% only.** Line 156 and FAQ line 45 give £2,934 at 24% with no
basic-rate figure, while A3 prints both. £3,860 × 0.82 = **£3,165**. Add it, or accept the
asymmetry deliberately (A4 is the decision page and one figure is defensible under hard rule 13).

**A4-3 · Hard rule 13, links out.** Line 158 carries five internal links, two gov.uk links and a
calculator link in one paragraph, against rule 13's "one link out". Lower risk than A3-4 because the
mechanics are not restated, but it is the same freeze boundary.

## A5

**A5-1 · reg 36(2), the full-performance limb, is missing.** Lines 33 and 129 correctly state
reg 36(4) (proportionate charge after an express request) and reg 36(6) (nothing payable where the
trader gave no cancellation information or the consumer did not expressly request supply). Not
stated: under **reg 36(2)** the right to cancel is **lost entirely** once the service has been fully
performed, where performance began at the consumer's express request with acknowledgement that the
right would be lost. For an agency contract that bites if the sale completes inside the window.
**Drop-in, after line 129:** "One limit on all of that. If the service is finished inside the 14
days, and you asked for it to start knowing you would lose the right, the right to cancel is gone."
Everything else on regs 30, 31 and 36 is correct: 14 days from the day the contract is made for a
service contract ✓, 12-month extension for an information breach with 14 days from late receipt ✓.

**A5-2 · "the biggest provider" is an unattributed market claim.** Lines 50, 55 and 91. Every other
figure on the page carries a publisher and a date. **Drop-in:** "£999 with Purplebricks, on its own
packages page read on 21 August 2026".

**A5-3 · The £80 is called an "identity check" here and an "anti-money-laundering check" on the
pillar.** Same fee, two names, and A3 currently calls the same £80 an energy certificate (B2).
Pick one label across the cluster.

Everything else on A5 verifies: the £1,000 non-membership penalty ✓ (§26.14, and gov.uk's wrong
£5,000 correctly avoided), The Property Ombudsman + Property Redress Scheme "now trades as Property
Redress" ✓, sales-side redress only and never the 2014 lettings instrument ✓, s.18 with the
s.18(5)/(6) unenforceability and judicial reduction ✓ (line 117), DMCCA total-price rule from
6 April 2025 ✓ (line 121), the s.1(4) boundary at lines 39/70/123 stated **without** the exclusivity
overreach ✓ (the cleanest statement of it in the cluster), £150 + £2,099 = £2,249 ✓, £2,840 on
£200,000 and £6,390 on £450,000 at 1.42% ✓, £999 × 24% = £240 ✓, and the abortive-cost point at
line 161 ✓ (no disposal, no s.38 deduction).

## Pillar

**P-1 · The CGT block silently switches anchor from £293,000 to £300,000.** Line 513: "Sell a former
rental for £300,000 ... the commission is £4,260. Add £700 of conveyancing and you have £4,960
coming off the gain, which is worth just under £1,200 at the higher residential rate." The
arithmetic is right (£4,260 + £700 = £4,960; × 24% = £1,190.40 ✓) and £4,260 is the figure every
spoke uses, so the switch buys cluster consistency. But the page anchors everything else on
£293,000 and does not say it has moved. **Drop-in:** "Sell a former rental for £300,000, a round
number rather than the £293,000 average used above, and the commission is £4,260." On the £293,000
anchor the equivalent is £4,160 + £700 = £4,860, worth £1,166.

**P-2 · Five figures carry no publisher on a page whose stated differentiator is provenance.**
Line 226 promises "the source and the vintage for every figure". Unattributed: the survey at
"around £650", purchase conveyancing at "around £1,050" and mortgage arrangement fees at "around
£1,000" (line 409); accompanied viewings at "around £300" (line 371, which A5 attributes to Which?,
8 June 2026); and the EPC range £35 to £120 in the at-a-glance box, whose condition cell names no
source (the tracker records it as "our own EPC page", which is citable and should be named, and it
is a fourth EPC range in the cluster alongside MSE's £50-£120 and HOA's £60-£120).

**P-3 · "roughly £5,000" understates its own figure by 5%.** Line 288: sole 1.2%-1.8% against
multi 3%-3.6% on £293,000 is a constant **£5,274** at every point of the range. Print £5,270.

**P-4 · The "closed list" enumeration is incomplete.** Line 518 and FAQ 6: "The list is a closed one
... In go your agent's commission, your solicitor's fees on the sale, the cost of advertising to
find a buyer and an auctioneer's fees." §5.B / s.38(2) also names **surveyor, valuer and
accountant**, the **costs of transfer or conveyance including SDLT**, and the **costs of any
valuation or apportionment required for the computation**. Asserting the list is closed and then
under-enumerating invites the reader to conclude a valuer's fee is out. **Drop-in:** add "a
surveyor's or valuer's fee, and the cost of any valuation you need to work the gain out". The
exclusions are all correct as written (removals, storage, cleaning, presentation spend, mortgage
interest and early repayment charges ✓ s.38(3)).

**P-5 · The probate paragraph drops both statutory qualifiers.** Line 475: "if there is more than
one of them, they all have to agree to the sale." §39.A / AEA 1925 s.2(2) adds "**or a court
order**", and excepts the case where probate was granted to only some of the named executors, in
which case the proving executors may convey alone. A4 line 41 and line 71 both carry the exception
correctly, so the hub is weaker than its spoke. **Drop-in:** "they all have to agree to the sale, or
a court has to order it. The exception is where probate was granted to only some of the named
executors, in which case the ones who proved the will can sell on their own."

Everything else on the pillar verifies: £4,160 at 1.42% on £293,000 ✓, £3,809 at 1.3% ✓,
0.9%-3.6% = £2,637-£10,548 ✓, MSE 0.75%-3% + VAT = £2,700-£10,800 on £300,000 ✓, £644 saved moving
1.42% → 1.2% ✓, £5,490 ≈ "about £5,500" ✓, auction 2%-3% + VAT = £7,032-£10,548 ✓, MMoA 2.5% + VAT
= £8,790 ✓, the CG14300 gross-fee rule stated twice ✓, no statutory commission cap asserted ✓,
Land Registry fee correctly assigned to the buyer ✓, and the 60-day clock correctly run from
completion ✓.

---

# 4. Do-not-write sweep — clean on all four

| §5.B / §26.14 do-not-write | Result |
|---|---|
| "you can deduct removal costs against the gain" | Not present. A3 line 183 and the pillar line 522 both state the correction explicitly ✓ |
| "all the costs of selling are deductible" | Not present ✓ |
| "mortgage interest / ERCs reduce the gain" (s.38(3)) | Not present; A3 and the pillar both exclude them ✓ |
| "the 60-day clock runs from exchange" | Not present. A3 and A4 both carry the two-date trap with a worked March/May line ✓; A5 and the pillar state completion only, which is correct ✓ |
| "auction sales are taxed at completion" | Not present ✓ |
| "there is a legal cap on estate agent commission" | Not present. A4 FAQ line 23 states the opposite ✓ |
| "CPUTR 2008 applies" | Not present. A3 line 149 correctly frames the April 2025 replacement ✓ |
| "Property Misdescriptions Act 1991" | Not present ✓ |
| "letting agents and estate agents share one redress instrument" | Not present. A5 line 37 confines the two schemes to sales work ✓ |
| gov.uk's wrong "£5,000 and licence revoked" redress penalty | Not present. A5 uses **£1,000** ✓ |
| "the New Homes Ombudsman is a statutory scheme" (§26.15) | Out of scope on all four ✓ |
| "anyone can do anyone's conveyancing unpaid" | Not present. A3 line 135 and A4 line 31 both hold the Sch 3 para 3(10) exemption at its para 3(3)(d) ceiling ✓ |

---

# 5. Flags for the manager

- **F-181 should be re-stated, not closed as written.** Point 2 (tax does not move the break-even
  price) is correct and should become a wave-wide do-not-write. Point 1 is half right: the brief's
  *composition* of £1,079 is wrong, but £3,181 / £2,418 are the correct **Route 2** figures and are
  derivable from MSE's own 1 July 2026 online-agent table. The real defect is that no brief in the
  cluster distinguishes the two routes, which is what produced four saving figures.
- **New, ID1 vs ID3.** Worth a §26.14 patch line: *"ID1 section B is completed by a conveyancer,
  Chartered Legal Executive or CLC-regulated Licensed Probate Practitioner ONLY. The accountant /
  doctor / dentist / IFA / MP list is form ID3 and must never be attached to ID1."* Three Wave 12
  briefs carry both lists two lines apart, and one page has already mixed them.
- **New, portal exclusivity.** The Stage 2 framing "the two things are mutually exclusive" is an
  inference from Rightmove's commercial membership rule, not from EAA 1979 s.1(4). Recommend the
  house form becomes "in practice", so no future page states it as a legal impossibility.
