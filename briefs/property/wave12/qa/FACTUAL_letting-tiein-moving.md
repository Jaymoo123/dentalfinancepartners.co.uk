# Wave 12 adversarial factual QA — A6 / A8 / A9

Track: adversarial factual (refute-first). Date: 2026-08-21. Read-only pass, no surface edited.

Surfaces:
- A6 `Property/web/content/blog/estate-agent-fees-for-renting.md`
- A8 `Property/web/content/blog/estate-agent-contract-tie-in-periods.md`
- A9 `Property/web/content/blog/cost-of-moving-house-uk.md`

Ground truth used: `docs/property/house_positions.md` §1, §3, §5, §5.B (as patched 2026-08-21 eve), §7,
§19.13, §26.5, §26.7, §26.13, §26.14; each brief's Stage 2 record in `briefs/property/wave12/`;
`_language_spec.md` page-type table. External re-verification at write: SI 2012/3118 reg 6
(legislation.gov.uk) and HM Land Registry registration services fees (gov.uk).

## Verdicts

| Surface | Verdict | BLOCKER | ADVISORY |
|---|---|---|---|
| A6 estate-agent-fees-for-renting | **PASS** | 0 | 4 |
| A8 estate-agent-contract-tie-in-periods | **PASS** | 0 | 4 |
| A9 cost-of-moving-house-uk | **PASS WITH BLOCKER** (one sentence to fix) | 1 | 6 |

Every worked figure on all three pages re-derived independently. **All arithmetic is correct.** No
figure on any of the three surfaces failed re-derivation.

## Arithmetic re-derivation (all PASS)

**A6**, base flat £1,200/month = £14,400/year:
- Full management 12% = £144/mo, +20% VAT = £172.80/mo = **£2,073.60/yr** ✓
- Tenant find 8–12% of first year's rent = £1,152–£1,728 net, £1,382.40–£2,073.60 gross → "£1,382 to £2,074" ✓
- Flat £400–£1,500 → £480–£1,800 inc VAT ✓; rent collection 3–12% → £43.20–£172.80/mo ✓
- Independent 10–15% → £144–£216/mo ✓; chain 15–17% → £216–£244.80/mo ✓
- Referencing £50–£150 → £60–£180 ✓; inventory £100–£250 → £120–£300 ✓
- Table subtotal: 2,073.60 + 120 + 60 = £2,253.60 low; 2,073.60 + 300 + 180 = £2,553.60 high → "£2,250 to £2,550" ✓
- Three-year gap: 2,073.60 × 3 = £6,220.80 vs tenant find 10% = £1,728 → **£4,492.80** → "about £4,490" ✓;
  × 0.6 = £2,695.68 → "roughly £2,700" ✓
- **Three-marginal-rate table on the gross fee:** 20% → £414.72 relief, £1,658.88 net ✓; 40% → £829.44,
  £1,244.16 ✓; 45% → £933.12, £1,140.48 ✓
- **14.4% → net conversions:** 14.4 × 0.8 = 11.52 → "11.5%" ✓; 14.4 × 0.6 = 8.64 → "8.6%" ✓.
  Cross-check against cash: 1,658.88 / 14,400 = 11.52% ✓; 1,244.16 / 14,400 = 8.64% ✓
- Deposit cap 5 weeks = 14,400/52 × 5 = £1,384.62 → "about £1,385" ✓; holding deposit 1 week = £276.92 → "about £277" ✓
- CGT hook: £4,000 × 24% = **£960** ✓ (24% is the §5 residential higher rate)

**A8:** £4,000 / £600 line carries no arithmetic and is explicitly labelled "Both figures are
illustrative", which is what the brief's S2.2 required ✓.

**A9**, England average £293,262:
- Agent 1.42% = **£4,164.32** → £4,164 ✓; 1.2% = £3,519.14 ✓; gap £645.18 → "£645" ✓
- **SDLT re-derived from §1 bands** (0% to £125k; 2% £125,001–£250k; 5% £250,001–£925k):
  0 + 2,500 + (43,262 × 5% = 2,163.10) = **£4,663.10** → £4,663 ✓
- FTB relief at this price: 0% to £300,000 → **£0** ✓ (§1)
- **Table total:** 4,164 + 700 + 80 + 4,663 + 150 + 650 + 1,050 + 1,000 + 150 + 550 + 78 + 39.50 =
  **£13,274.50** → £13,275 ✓
- **Bucket 1** 4,164 + 700 + 80 = **£4,944** ✓ | **Bucket 2** 4,663 + 1,050 + 150 + 650 = **£6,513** ✓ |
  **Bucket 3** 1,000 + 150 + 550 + 78 + 39.50 = **£1,817.50** → £1,818 ✓ | buckets sum to the total ✓
- Buy-only: 13,274.50 − 4,944 = **£8,330.50** → £8,331 ✓
- Sell-only: 4,944 + 550 + 39.50 = **£5,533.50** → £5,534 ✓
- FTB all-in: 8,330.50 − 4,663 = **£3,667.50** → £3,668 ✓ (reads off the buy-only figure, correct in context)
- **Scale 1 rows** all six bands match SI 2024/931 Sch 1 exactly (£20/£40/£100/£150/£295/£500 reduced;
  £45/£95/£230/£330/£655/£1,105 full) ✓

## A6 — estate-agent-fees-for-renting — PASS (0 BLOCKER, 4 ADVISORY)

Deductibility split is **correct and is the page's strongest asset**. Management, tenant find and
renewal fees are treated as revenue against rental income in the year incurred; the sale commission
alone is treated as an incidental cost of disposal; the letting fee is expressly said never to
accumulate as base cost. That is §5.B's "the A6-style page carries both halves" satisfied in full,
including the double-count warning in FAQ 9. CG14300 gross rule stated correctly on both sides
(irrecoverable VAT → deduct gross, revenue side; irrecoverable VAT → deduct gross, capital side).
s.38(3) is respected: no interest anywhere in the deductible set.

Also verified clean: 0 hard statutory tokens in prose; source attribution named and dated (Landlord
Studio 10 Aug 2026, LettingAProperty 6 Jul 2026 with its January 2026 method disclosed); the gov.uk
link is `/guidance/fees-you-can-charge-as-part-of-a-tenancy`, the live replacement, **not** the
"Tenant Fees Act 2019: guidance" page withdrawn 8 May 2026; the deposit cap is quoted from the
statute with the "no upper limit" correction rather than gov.uk's £50,000-to-£100,000 phrasing;
TFA Sch 1 para 1(1A)-(1B) rent-in-advance rule from 1 May 2026 stated correctly; the two surviving
default fees (evidenced lost key, 3% over base once rent is 14 days overdue) match the statute;
redress is the LETTINGS instrument with the two correct schemes per §26.5 and no gov.uk penalty
figure imported. Every fee-table row traces to the brief's S2.2 source table.

### ADVISORY A6-1 — MTD stated unconditionally, and the page's own landlord is below every threshold

> "Handing the property to an agent does not hand over your filing. The rental income is yours, so
> the quarterly updates and the year end return are yours too."

And FAQ 11: *"the quarterly updates and the year end return are yours to make"*.

§3 locks the mandate at qualifying income above **£50,000** from 6 Apr 2026, £30,000 from 2027,
£20,000 from 2028. The page's worked landlord has £14,400 of rent. As written the page tells that
reader they have quarterly updates. §19.13's core point (the landlord is the filer, not the agent)
is correct and should stay; the unconditional framing is the problem.

Drop-in fix (body):

> Handing the property to an agent does not hand over your filing. The rental income is yours, so
> the year end return is yours, and so are the quarterly updates once your property and trading
> income crosses the Making Tax Digital threshold. That holds even where the agent keeps every
> receipt and sends you a statement each month.

And FAQ 11 first line:

> No. Handing the property to an agent does not hand over your filing obligation. The rental income
> is yours, so the year end return is yours, and the quarterly updates are yours too once your
> income is above the Making Tax Digital threshold, even where the agent holds every receipt.

### ADVISORY A6-2 — PRR clause overstates on a pure buy-to-let, and brushes freeze adjacency

> "Because you let the property, private residence relief will not cover the whole gain, so there is
> usually a gain for it to work on."

On a property that was never the owner's residence, private residence relief covers **none** of the
gain, not "not the whole" of it. The sentence implies partial cover as the default case for a
landlord. It is also the only PRR content on the page, against the brief's freeze rule ("no PRR
mechanics"). Simplest fix is to drop the relief reference entirely, which the CGT block does not need.

Drop-in fix:

> Because the property was let rather than lived in, there is usually a gain for that deduction to
> work on.

### ADVISORY A6-3 — jurisdiction unstated on the tenant-fee limbs

The fee ban, the deposit and holding-deposit caps, and the 1 May 2026 rent-in-advance rule are
England. The page says "in England" only once, in the redress paragraph. Wales runs the Renting
Homes (Fees etc.) (Wales) Act 2019 on a different footing. One clause fixes it.

Drop-in fix (opening of the tenant section):

> Almost nothing, and this is the England position. Since 1 June 2019 neither you nor your agent can
> require a tenant to pay anything outside a short permitted list.

### ADVISORY A6-4 — §19.13's gross-rent trap is not carried, and this is its natural home

The page raises the monthly agent statement twice but never says the landlord returns the **gross**
rent collected with the agent's fee as a separate expense, not the net figure the agent pays over.
§19.13 records that reporting net understates both income and expense and can push a landlord to the
wrong side of the threshold test. One sentence, and it is a genuine differentiator.

Suggested addition (after the statement sentence):

> One thing to get right on that statement: your income is the rent the agent collected, not the net
> figure they paid you. The fee comes off separately, as the expense it is.

## A8 — estate-agent-contract-tie-in-periods — PASS (0 BLOCKER, 4 ADVISORY)

**Foxtons is stated per the Stage 2 correction. The SERP-common inversion is NOT present.** Hunted
specifically for it and the page in fact calls it out as the misquote:

- para 36 construction (introduced to the purchase, not merely to the property) ✓
- para 37 (no effective-cause requirement needed implying) ✓, and correctly labelled as the limb
  guides get backwards
- para 20 Bowstead as a **separate** proposition, "very readily" implied in a residential consumer
  context unless the contract or facts negative it ✓
- para 24 (more than one commission possible but far rarer than Foxtons argued) ✓, mirrored in FAQ 5
- outcome stated correctly (homeowner won, fee claim failed), Court of Appeal, April 2008 ✓

Also verified clean: SI 1991/859 prescribed wording quoted accurately for both sole selling rights
("even if the purchaser was not found by us but by another agent or by any other person, including
yourself") and sole agency (three limbs, all present), and the three explained terms are correctly
counted as three; EAA 1979 s.18 remedy stated as unenforceable-except-by-court-order with the court's
power to reduce or discharge; SI 2013/3134 mapped correctly to §26.14's reg numbers (durable-medium
express request, reg 36(4) proportionate charge, reg 36(2) loss on full performance with
acknowledgement, reg 36(6) nothing payable where the cancellation information was never given, reg 31
extension); sale-side redress asserted without naming the lettings instrument and **without** copying
gov.uk's wrong £5,000 penalty; the s.38(1)(b) title argument is framed as an argument with paperwork
behind it, exactly as the brief required; withdrawal fee correctly excluded; interest on an unpaid fee
correctly excluded per s.38(3); the £4,000/£600 line labelled illustrative; no fee percentages, per
lane discipline; the HOA URL used is the working one, not the 404 sibling.

### ADVISORY A8-1 — "On those terms" is ambiguous on the one sentence the page exists to get right

> "**The bit that gets misquoted.** Guides often say the case decided an agent must be the effective
> cause of the sale. On those terms the court said the opposite: no such requirement needed implying
> (paragraph 37)."

"the Terms" is the Foxtons contract's defined term and the reading is defensible, but a lay reader
parses "on those terms" as the idiom meaning "on that footing", which points it back at the guides'
claim rather than at the contract. On a page whose citation-level differentiator is this exact
paragraph, the ambiguity is worth removing.

Drop-in fix:

> **The bit that gets misquoted.** Guides often say the case decided an agent must be the effective
> cause of the sale. On the wording of that contract the court said the opposite: no such
> requirement needed implying (paragraph 37).

### ADVISORY A8-2 — paras 37 and 20 read as a flat contradiction with nothing reconciling them

Bullet three says no effective-cause requirement needed implying; bullet four says the court treated
effective cause as "very readily" implied. Both are correct, and the reason they coexist (the para 36
construction already does the work, so the implication becomes unnecessary on those terms) is not on
the page. A reader in a dispute, which is this page's reader, will read it as the page contradicting
itself.

Drop-in fix (bullet four):

> **Where effective cause lives.** It is a general principle rather than something that case created,
> and it did not need implying there because the construction above already decided it. The court
> treated it as a term "very readily" implied in a residential consumer case, unless your contract or
> the facts rule it out (paragraph 20).

### ADVISORY A8-3 — FAQ 12 drops the qualifier the body carries on the five-year floor

FAQ 12: *"keep the paperwork for at least five years after the 31 January that follows the tax year
of the sale"*, stated flat. The body qualifies it correctly (*"the floor for a let property"*). The
five-year retention floor is the business-records rule; a private seller of a main home sits on a
much shorter statutory floor. Align the FAQ to the body.

Drop-in fix (FAQ 12, second sentence):

> If the sale is taxable, keep the paperwork for at least five years after the 31 January that
> follows the tax year of the sale, which is the floor where the property was let, because that is
> when a deduction has to be evidenced.

### ADVISORY A8-4 — four case-law paragraph numbers in prose against a page-type budget of zero

`_language_spec.md` classes A8 as a fee page with **0** hard references in body prose. The page carries
"paragraph 36", "paragraph 37", "paragraph 20", "paragraph 24" plus a case name and a Find Case Law
link. The A8 brief S2.3 expressly required the paragraph numbers as the differentiator, so this is a
brief-versus-spec conflict, not a writer error, and it is a factual-integrity feature rather than a
defect. Flagged for the conductor to resolve one way; recommendation is to keep them, because a reader
in a dispute checking the judgment is exactly who this page is for.

## A9 — cost-of-moving-house-uk — PASS WITH BLOCKER (1 BLOCKER, 6 ADVISORY)

Bucket classification checked line by line against the exhaustive s.38(2) list. **Removals, storage,
cleaning, mail redirection, new carpets, mortgage arrangement and valuation fees and mortgage
interest/ERCs are all correctly given no relief**, in the table, in the prose and in FAQ 10, with the
§5.B do-not-write line respected everywhere. **Advertising is correctly split by direction of travel**
(to find a buyer = disposal side now; to find a home to buy = banked into the new base cost), which is
the F-171 precision and the one page in the wave where it is live. The s.28 exchange-versus-completion
two-date trap is stated correctly, with the 60-day clock running from completion and the tax year from
exchange. The VAT-inclusive rule is stated correctly for a private seller. SDLT prints an amount for
the worked scenario only and links the calculator, per the §1 freeze. Land Registry Scale 1 rows,
the whole-title-versus-part-transfer correction (F-173), the round-down rule and the VAT-inclusive
consideration rule are all correct and correctly sourced to the Order plus the HMLR restatement.

**Re-verified externally at QA:** the EPC availability wording, which the brief listed as
re-verify-at-write. SI 2012/3118 reg 6(2)(b) reads "no later than whichever is the earlier of — (i)
in the case of a person who requests information about the building, the time at which the relevant
person first makes available any information in writing about the building to the person; or (ii) in
the case of a person who makes a request to view the building, the time at which the person views the
building", and reg 6(5) requires one to be given to the person who ultimately buys. The page's
rendering is **exact**. This is a rare thing to get right and most competitor pages carry the revoked
2007 formulation.

### BLOCKER A9-1 — first registration is stated as a reduced scale, and it is not for a buyer

> "Land that has never been registered goes on a separate reduced scale for first registration."

This is wrong in the exact scenario the page is about, and it sits inside the paragraph headed **"Two
details that other sites get wrong"**, which is where the page claims authority.

HM Land Registry's own fees guidance (re-fetched 2026-08-21): *"There are no reduced fees for ...
applications for first registration."* The 25% reduction attaches to **voluntary** first registration
only, and the guidance is explicit that an application including a deed that triggers compulsory
registration is not treated as voluntary. Buying unregistered land triggers **compulsory** first
registration, so the buyer this page is written for pays the **full** Scale 1 fee, £330 in the
£200,001 to £500,000 band, not the £250 voluntary figure and not the £150 reduced figure.

The A9 brief's Scale 1 table gets this right: its fourth column is headed "**Voluntary** first
registration". The page dropped the word.

Drop-in fix (replace the sentence):

> Land that has never been registered is different again, and it goes the other way. Buying
> unregistered land forces first registration, and a forced first registration pays the full fee
> rather than a reduced one. The discount is only there for an owner who registers voluntarily when
> nothing obliges them to.

### ADVISORY A9-2 (high) — the EPC is asserted into bucket one and no house position supports it

Body table: *"Energy Performance Certificate | Comes off the gain on the home you are leaving"*.
FAQ 9: *"The agent's commission, the solicitor on the sale, the EPC and what you spend advertising to
find a buyer all come off that gain."* The £80 midpoint is baked into the headline **£4,944** subtotal.

§5.B's exhaustive list is: fees for the professional services of a surveyor, valuer, auctioneer,
accountant, agent or legal adviser; costs of transfer or conveyance including SDLT; advertising to
find a buyer; and valuation or apportionment costs for the computation. A domestic energy assessor is
none of the six named professions, an EPC is a certificate rather than advertising, and it is not a
valuation for the computation of the gain. §26.13 locks the EPC machinery and says nothing about
deductibility. The page's own differentiator is "the list is closed" and "HMRC's guidance puts it in
four words: the definition is exhaustive", which makes a flatly asserted borderline item the softest
target on the page.

Not a writer deviation: the A9 brief's S2.2 Table 2 spec expressly puts the EPC in bucket 1, and the
**live** `cost-of-selling-calculator` already publishes `£4,160 + £700 + £80 = £4,941` on the same
basis. This is a program-level position now carried on three surfaces. Two options, conductor's call:

1. Hedge on-page (smallest change, preserves the arithmetic):

> The agent's commission, the solicitor on the sale and what you spend advertising to find a buyer
> all come off that gain. The EPC is the one arguable line: it is a legal precondition of marketing,
> so it is normally taken with the marketing spend, but no HMRC guidance names it either way.

2. Or add an explicit EPC position to §5.B and leave all three surfaces as they are. Recommend option
   2 plus a one-clause hedge, because the £80 is immaterial to the total and the credibility of the
   "closed list" claim is not.

### ADVISORY A9-3 (high) — the page says UK, the tax and the fee scale say England

Title, H1, meta and opening sentence all say "UK". The page then prints SDLT (England and Northern
Ireland), the Land Registry Scale 1 fee (England and Wales) and an England average price, with no
caveat anywhere. Scotland charges LBTT through Revenue Scotland and registers through Registers of
Scotland; Wales charges LTT. §1 requires devolved figures for devolved readers. The sibling
`cost-of-selling-calculator` already carries the caveat: *"The figures are for England: Scotland and
Wales run a different conveyancing process and charge the buyer a different tax."* A9 does not.

Drop-in fix (append to the existing source note under the itemised table):

> One scope note: the stamp duty and Land Registry lines are England. Scotland and Wales charge a
> different purchase tax and register through their own systems, so those two lines will not be your
> numbers if you are moving there.

### ADVISORY A9-4 — 1.42% used unattributed in FAQ 2, and the HOA source is dated only by year

FAQ 2: *"the agent takes about £4,164 at the 2026 average fee of 1.42% including VAT"*, no source
named. The source note says "HomeOwners Alliance 2026 figures". §26.14: *"every published range needs
a named dated source"*, and the A9 brief records that the HOA fee page **carries no date and no
method**. The honest form is the read date, which the sibling A8 handles as "(HomeOwners Alliance,
read 2026)".

Drop-in fix (FAQ 2): `...and the agent takes about £4,164 at the HomeOwners Alliance 2026 average fee
of 1.42% including VAT.` And in the source note: `...are HomeOwners Alliance figures, published for
2026 and read on 21 August 2026.`

### ADVISORY A9-5 — rounding drift against the pillar and the calculator on the same worked case

A9 works the exact HPI figure £293,262 and gets agent £4,164 and bucket 1 £4,944. The
`/cost-of-selling-a-property` pillar and the `cost-of-selling-calculator` both round to £293,000 and
publish agent £4,160 and deductible £4,941. Every figure is internally correct and each surface states
its own base, so this is not an error, but a reader crossing from the pillar to A9 sees three
near-identical-but-different numbers on the same scenario. Recommend the conductor picks one base for
the cluster. Cheapest resolution is to leave A9 (which uses the authoritative unrounded index figure)
and note the rounding on the pillar.

### ADVISORY A9-6 — the pillar's closed-list FAQ omits the EPC that A9 and the calculator include

`Property/web/src/app/cost-of-selling-a-property/page.tsx` enumerates the deductible set as *"Your
estate agent's commission counts, and so do your solicitor's fees on the sale, the cost of advertising
to find a buyer, and an auctioneer's fees if you sell that way"*, with no EPC, while the same site's
calculator sums `£4,160 + £700 + £80 = £4,941` including it. Same root cause as A9-2; listing it here
so the fix lands on all three surfaces together rather than one at a time.

### ADVISORY A9-7 (low) — the valuation limb is stated generically, it is disposal-side only

> "They are advertising, and any valuation you need to work the gain out."

s.38(2)(b) puts "costs reasonably incurred in making any valuation or apportionment required for the
purposes of the computation of the gain" in the **disposal** limb only; s.38(2)(a) carries advertising
to find a seller and nothing else. The page splits advertising by direction correctly two paragraphs
later but leaves valuation reading as if it applied at both ends. One word fixes it.

Drop-in fix: `They are advertising, and, on the sale side, any valuation you need to work the gain out.`

## Mechanical checks (all PASS)

| Check | A6 | A8 | A9 |
|---|---|---|---|
| metaTitle ≤ 60 | 54 ✓ | 55 ✓ | 47 ✓ |
| metaDescription ≤ 155 | 143 ✓ | 143 ✓ | 149 ✓ |
| FAQ count 10–14 | 12 ✓ | 12 ✓ | 13 ✓ |
| H2 count vs brief skeleton | 8 = 8 ✓ | 9 = 9 ✓ | 10 vs 9, expanded ✓ |
| Em-dashes / en-dashes | 0 / 0 ✓ | 0 / 0 ✓ | 0 / 0 ✓ |
| Hard statute tokens in prose (spec budget) | 0 (budget 0) ✓ | 0 statute; 4 case paras (see A8-4) | 1, "Order 2024" (budget 0–1) ✓ |
| Internal blog links resolve, category segment matches `slugifyCategory` | all ✓ | all ✓ | all ✓ |
| Non-blog routes exist | `/for-letting-agents`, `/calculators/rental-income-tax-calculator`, `/cost-of-selling-a-property`, `/calculators/cost-of-selling-calculator` ✓ | `/cost-of-selling-a-property`, `/calculators/cost-of-selling-calculator` ✓ | `/calculators/stamp-duty-calculator`, `/cost-of-selling-a-property`, `/calculators/cost-of-selling-calculator` ✓ |
| Armed `/calculators/capital-gains-tax-calculator` NOT linked | ✓ | ✓ | ✓ |
| Source attribution present in body | ✓ LS 10 Aug 2026, LAP 6 Jul 2026 + method | ✓ HOA, Find Case Law | ✓ HOA, HM Land Registry HPI, SI 2024/931 + HMLR guidance |
| CGT freeze adjacency (no rate table, no AEA, no PRR mechanics) | one rate, one line; PRR clause flagged A6-2 | no rates ✓ | no rates, no AEA, light PRR framing only ✓ |

## Cross-page consistency on shared figures (PASS)

Checked A9 against A1 `how-much-do-estate-agents-charge-to-sell-a-house`, A2
`cheapest-estate-agent-fees-uk`, A5 `online-estate-agents-uk`, A7
`average-london-estate-agent-fees`, the `/cost-of-selling-a-property` pillar and
`src/lib/calculators/tools/cost-of-selling-calculator.ts`:

- **1.42% including VAT (HOA 2026 average)** — identical on all seven surfaces ✓
- **Sole agency 1.2% to 1.8% including VAT** — identical on A1, A7, A9, pillar ✓
- **£550 removals, presented as one published estimate not a market average** — identical wording
  discipline on A9, pillar and calculator ✓
- **£700 sale conveyancing** — identical on A9, pillar, calculator ✓
- **£80 EPC midpoint of £35–£120** — identical on A9, pillar, calculator ✓
- **Sole agency prescribed wording** — A1 and A8 quote the same SI 1991/859 limbs consistently ✓
- Divergences found: only the £293,262-versus-£293,000 rounding (A9-5) and the EPC enumeration
  gap (A9-6). Both logged above.
- A1's headline is "1.3% to 1.42%" (blending Which?/Rightmove with HOA) where A9 uses 1.42% alone.
  Not a conflict: A9 attributes its figure to HOA specifically. No action.

## Totals

**1 BLOCKER, 14 ADVISORY across three surfaces. Zero arithmetic errors.** The single blocker is one
sentence on A9 with a drop-in replacement above. A6 and A8 are shippable as they stand; their
advisories are precision improvements, except A6-1 (MTD threshold), which is worth taking before
deploy because the page's own worked landlord contradicts it.
