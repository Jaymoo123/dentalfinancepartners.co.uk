# FACTUAL QA (adversarial) — rural/landed-estates cap + anti-forestalling + s.124E family

Run 2026-08-21. Ground truth: `docs/property/house_positions.md` §15.4 (as patched today), §22.1, §22.3, plus the
F-102 rule (gov.uk announcement summary never authoritative for the cap figure).

**Statute independently re-fetched this pass at legislation.gov.uk** (not taken on trust from house positions):

- **IHTA 1984 s.124D(2)(a)** — "£2.5 million, less" prior usage; s.124D(3) allowance period = the 7-year period
  ending with the transfer. Confirms £2.5m. `https://www.legislation.gov.uk/ukpga/1984/51/section/124D`
- **IHTA 1984 s.124E "Transfer of unused 100% relief allowance"** — full text retrieved. Load-bearing subsections:
  - s.124E(4)(a): the "total 100% relieved amount" is *"the total amount by which values transferred by **chargeable
    transfers** made by the deceased person in the period of seven years ending with the day on which the deceased
    person died were treated as reduced as a result of section 104(1A) or 116(1A)"*.
  - s.124E(5): *"**Where a claim is made under this section**, the survivor's final allowance amount … is increased by
    the lesser of the amount of the survivor's final allowance amount and (a) the amount given by multiplying the
    survivor's final allowance amount by the **unused percentage** of the deceased person …"*
  - s.124E(6): unused percentage = unused allowance ÷ deceased's final allowance amount.
  - **Consequence used repeatedly below:** a first death that passes qualifying property to the spouse is
    *spouse-exempt*, therefore **not a chargeable transfer**, therefore nothing is "treated as reduced as a result of
    s.104(1A)/116(1A)", therefore the first allowance is **100% unused and 100% transferable on claim**. It is not
    wasted, and a deed of variation is not needed to recover it.
- **IHTA 1984 s.227** — qualifying property includes *"(a) land of any description, wherever situated"*; tax *"may …
  be paid by ten equal yearly instalments"*, first instalment *"six months after the end of the month in which the
  death occurred"*; on sale *"the tax unpaid … shall become payable forthwith … together with any interest accrued"*.
  Note s.227 instalments require an **election by notice in writing**; neither page says so.
- **IHTA 1984 s.234** — interest-free instalments attach to shares/securities/business/interest in a business (with
  carve-outs). File 2's hedge ("whether interest runs depends on the type of property") is safe and is **not** a finding.

Link targets verified live: `/calculators/bpr-apr-allowance-calculator` (exists via `src/lib/calculators/registry.ts`
→ `tools/bpr-apr-allowance-calculator.ts`, served by `src/app/calculators/[slug]`), `/landed-estates`
(`src/app/landed-estates/page.tsx`), and all three linked blog slugs with matching categories. Em-dash count = 0 on
all four files.

---

## Per-page verdicts

| # | File | Verdict | BLOCKER | MINOR |
|---|---|---|---|---|
| 1 | `Property/web/content/blog/inheritance-tax-on-farms.md` | **must_fix** | 1 | 4 |
| 2 | `Property/web/content/blog/how-to-avoid-inheritance-tax-on-a-farm.md` | **must_fix (minor only)** | 0 | 6 |
| 3 | `Property/web/content/blog/iht-april-2026-bpr-apr-cap-property-impact.md` | **must_fix** | 5 | 5 |
| 4 | `Property/web/content/blog/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation.md` (scoped) | **must_fix** | 3 | 2 |

Every arithmetic chain on all four pages was re-derived to the penny. **All cap arithmetic is correct** —
see the arithmetic ledger at the foot. The failures are in transferability seams, anti-forestalling framing,
trust treatment, one F-102 breach, and one RNRB error.

---

## File 1 — `Property/web/content/blog/inheritance-tax-on-farms.md`

### F1-B1 (BLOCKER) — the entire couples position is stated as if the s.124E transfer happens by itself; the claim is never mentioned anywhere on the page

Line 75: *"Each of you has your own £2.5 million allowance, and an unused allowance passes to the survivor in the
same way an unused nil rate band does, so between you the figure is up to **£5 million**."*

Line 77: *"If Helen had been married and the farm had passed to her husband on her death … the qualifying value of
£3,650,000 would sit under the couple's combined £5 million. The **£230,000 becomes £0**."*

Also FAQ 1 (line 21) and the summary (line 17): *"a couple can pass on up to £5 million between them."*

The page nowhere states that a claim is required. The word "automatic" is absent, so the literal do-not-write phrase
is clean, but the page **reads** as automatic, which is the substance house positions §15.4 bans. The asserted
outcome ("becomes £0") is false if the survivor's executors do not claim.

Correct text, IHTA 1984 s.124E(5): *"**Where a claim is made under this section**, the survivor's final allowance
amount … is increased by … the unused percentage of the deceased person."*
(`https://www.legislation.gov.uk/ukpga/1984/51/section/124E`)

Cross-page: files 2 and 3 both say it plainly ("it is not automatic: … the transfer claimed on the second death";
"It needs a claim rather than happening automatically"). File 1 is the only consumer surface silent on it, so this
is also a hunt-(f) cross-page inconsistency. Minimum fix: one clause on line 75 and in FAQ 1.

### F1-M1 (MINOR) — "two and a half times larger" is 2.30x, not 2.5x
Line 93: *"Every piece of planning built on the old figure is aimed at a problem **two and a half times larger** than
the one you have."* Re-derived: at £1m allowance, excess £2,650,000 → £1,325,000 chargeable → **£530,000** (the
page's own figure, correct). £530,000 ÷ £230,000 = **2.30x**. The excess ratio is also 2.30x
(£2,650,000 ÷ £1,150,000). Only the *allowance* ratio is 2.5x, and that is not what the sentence claims.
Fix: "well over twice as large" or "2.3 times larger".

### F1-M2 (MINOR) — "pays on £750,000 of it" is chargeable value, reads as tax
FAQ 1, line 21: *"A farm worth £4 million **pays on £750,000** of it."* £750,000 is the post-50%-relief chargeable
value; the tax is £300,000. Sister page file 2 answers the identical question as *"A £4,000,000 farm in one person's
estate produces **£300,000 of tax**"*. Not a contradiction, but file 1's phrasing invites the reader to think the
bill is £750,000. Fix: "pays tax on £750,000 of it, which is £300,000".

### F1-M3 (MINOR) — let-land qualification framed as ownership-irrelevant
FAQ 5, line 29: *"whether let land qualifies for relief in the first place is a separate question, decided by how the
land is occupied and used **rather than by who owns it**."* APR's occupation/ownership gate is IHTA 1984 s.117: two
years' occupation *by the transferor*, **or seven years' ownership** where occupied by another for agricultural
purposes. Ownership period is squarely part of the test. Fix: "decided by how the land is occupied and for how long
it has been owned, not by whether a tenant farms it".

### F1-M4 (MINOR) — rolling-allowance FAQ omits the 30 Oct 2024 floor
FAQ 2, line 23: *"The allowance is a rolling seven-year one, so qualifying gifts made in the seven years before death
use part of it."* True as mechanism, but on its own it sweeps in pre-30-October-2024 gifts. FAQ 6 and the body both
fix the date correctly, so this is a standalone-snippet risk (FAQ answers get lifted into rich results). Fix: add
"made on or after 30 October 2024".

**Clean on file 1:** anti-forestalling stated exactly (line 85 and FAQ 6: "on or after 30 October 2024 … dies on or
after 6 April 2026 and within seven years of the gift"); AIM sub-tier correct and non-consuming; s.124D /
FA 2026 Sch 12 para 4 / subsection (2)(a) cite correct; F-102 compliant (gov.uk summary cited only as the stale
source to avoid, never as authority for the figure); all five worked-example lines re-derived correct.

---

## File 2 — `Property/web/content/blog/how-to-avoid-inheritance-tax-on-a-farm.md`

**No blockers.** This is the strongest of the four on the hunted issues. Explicit findings on the hunts:

- **Hunt (a)/(b) — clean, and best-in-batch.** Line 61: *"That £5 million is derived from the £2.5 million each
  rather than being an allowance in its own right, and **it is not automatic: the first allowance must be unused and
  the transfer claimed on the second death**."* Matches s.124E(5) exactly. No "not transferable" / "fixed to their
  own estate" phrasing anywhere.
- **Hunt (c) — taper is stated correctly.** Line 77: *"Taper relief reduces **the tax** where death falls between
  three and seven years after a gift, but it only touches tax above your nil rate band and **gives you nothing in the
  first three years**."* Matches house positions §15.2 (s.7(4) IHTA 1984 tapers the tax, not the gift value; no relief
  inside 3 years; nothing to taper within the NRB). No finding.
- **Hunt (e) — anti-forestalling stated exactly**, twice (line 53 and FAQ line 25).
- **Hunt (d) — s.227 checked against the text**, see F2-M4/M5 below.

### F2-M1 (MINOR) — "relieved only on its agricultural value" ignores BPR on the same land
Line 45: *"**Land with development or hope value is relieved only on its agricultural value**, and everything else
you own is taxed under the ordinary rules with your £325,000 nil rate band against it."* True for APR (IHTA 1984
s.115(3) restricts APR to the agricultural value). But this page's own framing is "combined agricultural **and
business** property", and for an in-hand farming business the land is a business asset, so BPR can relieve the
above-agricultural-value element (subject to the same s.124D allowance). The flat statement understates the relief
available to exactly the reader the page is written for. Fix: "relieved only on its agricultural value for APR
purposes, though an in-hand farming business may bring the excess within business relief instead".

### F2-M2 (MINOR) — "must be unused" is all-or-nothing; s.124E transfers a percentage
Line 61 and FAQ line 27: *"it depends on the first allowance being **unused**"*. s.124E(5)-(6) transfer the
**unused percentage**, so a partly-used first allowance still transfers pro rata. Correct text, s.124E(6): *"The
unused percentage of the deceased person means the percentage given by dividing (a) the unused 100% relief allowance
in relation to the deceased person, by (b) the deceased person's final allowance amount."* Fix: "the unused part of
the first allowance transfers, in the same proportion it was left unused".

### F2-M3 (MINOR) — FAQ "did not lock in anything" drops the 7-year escape the body gives
FAQ line 25: *"a family who transferred land in 2025 believing they had locked in the old unlimited 100% relief
**did not lock in anything**"*. The body corrects itself at line 55 (*"surviving seven years from any gift ends the
question entirely"*), but the FAQ is the snippet-extractable surface and overstates. Fix: add "unless the donor
survives seven years from the gift".

### F2-M4 (MINOR) — s.227 instalments presented without the election
Line 91 and FAQ line 31: *"inheritance tax attributable to land **can be paid** in ten equal yearly instalments"*.
s.227(1) makes this available only *"if the person paying it by notice in writing to the Board so elects"*. The
executors must elect on the IHT400 schedule; it is not the default. Fix: "can be paid … if the executors elect".

### F2-M5 (MINOR) — FAQ and body disagree on instalment interest
FAQ line 31 presents *"ten payments of £30,000"* flat with no interest mention; body line 91 hedges *"whether
interest runs depends on the type of property, so check before you rely on it"*. The body hedge is correct
(s.234); the FAQ implies an interest-free ten-year run. Fix: carry the hedge into the FAQ.

### F2-M6 (MINOR) — instalment "balance falls due if the land is sold" omits accrued interest
Line 91 / FAQ line 31: *"The balance falls due if the land is sold."* s.227(4) actual text: *"If at any time the
whole or any part of the property concerned is sold, the tax unpaid … shall become payable forthwith … **together
with any interest accrued**."* Fix: "the balance, with any accrued interest, falls due".

**Re-derived and correct on file 2:** £4m farm → £1.5m excess → £750,000 chargeable → £300,000 (line 43 and FAQ
line 21); the "20% of the £1.5 million" cross-check; £300,000 ÷ 10 = £30,000; the AIM "effective 20%" (50% relief →
50% of value at 40%); s.3A PET cite; s.102 FA 1986 GWR treatment (matches house positions §15.3, including the
market-rent and move-out escapes); trust anti-fragmentation from 30 October 2024 with a single allowance divided
across the same-settlor cohort; £325,000 NRB. Statute reference block at line 101 is accurate on every cite.

---

## File 3 — `Property/web/content/blog/iht-april-2026-bpr-apr-cap-property-impact.md`

The two back-patched s.124E answers (line 36 FAQ, line 172 misconception bullet) are **correct and well drafted**.
The problem is that the old statute-dense body was written under the superseded "allowance is fixed to each estate"
position and was not reconciled with them, plus two stale-pipeline passages.

### F3-B1 (BLOCKER) — three passages still tell readers to split ownership because the allowance does not transfer; the page now says it does

Line 139 (planning response 2): *"**Split ownership between spouses.** Each spouse has their own £2.5m s.124D
allowance at death. Transferring property between spouses to ensure **each estate holds qualifying property up to the
cap maximises the combined allowance at second death**."*

Line 131 (Singh planning): *"separate the spouses' ownership of the company shares **so both £2.5m s.124D allowances
are usable** at second death."*

Line 40 (FAQ planning): *"Second, transfer assets between spouses **to use both £2.5m s.124D allowances** at second
death."*

All three assert that both allowances are only reachable by holding qualifying property in both names. That is the
substance of the banned "fixed to each estate" position. Under s.124E(4)(a) the first allowance is consumed only by
**chargeable transfers** reduced under s.104(1A)/116(1A); a spouse-exempt first death consumes nothing, so 100% is
transferable on claim. The page itself says so at lines 36 and 172. Direct internal contradiction.

Correct text, s.124E(1) and (4)(a): *"This section applies where (a) immediately before the death of a person … the
deceased person had a spouse or civil partner ('the survivor'), and (b) an amount of the 100% relief allowance of the
deceased person is unused on death … the 'total 100% relieved amount' is the total amount by which values transferred
by **chargeable transfers** … were treated as reduced as a result of section 104(1A) or 116(1A)."*

Fix: reframe all three as *"where qualifying property is left to someone other than the spouse on the first death,
ownership split still matters; where it passes to the spouse, the unused allowance transfers on claim under s.124E."*

### F3-B2 (BLOCKER) — anti-forestalling given a purpose/intent test that does not exist in the rule

Line 151: *"Anti-forestalling provisions catch **arrangements designed to** crystallise relief at the pre-reform 100%
rate **where the underlying intent is to defeat the cap**."*

Line 80: *"Anti-forestalling provisions catch **arrangements designed to** crystallise relief at the pre-reform rate
via accelerated lifetime transfers in the run-up."*

The rule is mechanical, not motive-based. House positions §15.4: *"the new rules apply to lifetime transfers made
**on or after 30 October 2024** … if the donor dies **on or after 6 April 2026** and within 7 years of the gift."*
A perfectly ordinary succession gift made in November 2024 with no avoidance motive is caught; a reader of lines 80
and 151 would conclude it is not. The page's own new consumer block at line 201 states the mechanical rule correctly,
as do files 1, 2 and 4. Fix: replace both with the three-limb trigger.

### F3-B3 (BLOCKER) — "Trusts in existence at 6 April 2026 retain the pre-reform treatment" is wrong and contradicts the page's own FAQ

Line 154 heading bullet, line 156: *"**Trusts in existence at 6 April 2026** retain the pre-reform treatment for the
property held at that date."*

"Pre-reform treatment" is unlimited 100% relief. Pre-30-October-2024 trusts do not keep unlimited relief; they keep
**their own allowance**, i.e. they are capped. The page's own FAQ at line 38 says exactly that: *"Existing trusts
settled pre-30-October-2024 each retain their own £2.5m allowance."* Two different answers to the same question, one
of them materially over-generous.

Also wrong on the date: the dividing line is 30 October 2024 (settlement date), not 6 April 2026 (existence date).
A trust settled 1 November 2024 exists at 6 April 2026 but shares the settlor's single allowance.

House positions §15.4: *"trusts settled **before 30 October 2024** each retain their own allowance for chargeable
events. For trusts settled by the **same settlor on or after 30 October 2024** … a **single allowance divided across
the same-settlor cohort**."* Fix: replace "in existence at 6 April 2026 / pre-reform treatment" with "settled before
30 October 2024 / their own allowance".

### F3-B4 (BLOCKER) — F-102 breach: readers are pointed at the gov.uk technical note for the operative figures, and the reform is described as still in draft

Line 160: *"The legislative pipeline. The reform sits in the Finance Act 2026 cycle, with the technical note
published on gov.uk and **the draft legislation under consultation**. **The published HMRC technical note carries the
operative figures**; the exact AIM mechanics and the trust anti-fragmentation rules are the two areas where the
published detail is most likely to differ from the announcement headline."*

Three faults in one paragraph:

1. **F-102 rule violated directly.** House positions §15.4: *"Sessions and writers must NOT cite that page as
   authoritative for the cap figure; cite IHTA 1984 s.124D direct via
   `https://www.legislation.gov.uk/ukpga/1984/51/section/124D`."* The announcement-stage gov.uk material carries £1m.
   Sending a reader there for "the operative figures" is the exact failure F-102 exists to prevent, and it
   contradicts this page's own line 62 (*"Any worked example or planning response should be tested against the £2.5m
   enacted figure, not the £1m headline that still appears on the GOV.UK summary"*) and line 171 (*"The GOV.UK
   summary is stale; cite the legislation direct"*).
2. **Stale status.** "Draft legislation under consultation" contradicts line 64 (*"now enacted in the Finance Act
   2026"*), the summary, and the frontmatter editorialNote. FA 2026 is enacted; s.124D is in force from 6 April 2026.
3. **Superseded hedge.** "The exact AIM mechanics and the trust anti-fragmentation rules are … most likely to differ"
   is the pre-F-18 hedging that house positions §15.4 records as replaced on 2026-05-23: *"earlier §15.4 … hedged AIM
   mechanics as 'the most-likely-to-be-amended detail' … Three structural positions firmly locked."* The page states
   both firmly elsewhere.

Fix: delete the paragraph or rewrite to point at s.124D / FA 2026 Sch 12 para 4 only.

### F3-B5 (BLOCKER) — "lock in 100% relief" advice for gifts made after 30 October 2024

Line 138: *"**Accelerate lifetime gifts of qualifying property.** Gifts of qualifying BPR / APR property made before
6 April 2026 use the pre-reform 100% relief at the time of the gift … For donors in good health under their
mid-70s, this is the most direct way to **lock in 100% relief** on the affected value."*

For any gift made now (post-30 October 2024) nothing is locked in: the anti-forestalling rule reworks it under the
new rules on a death on or after 6 April 2026 within 7 years. The parenthetical hedge in the same bullet covers the
7-year survival point but not the anti-forestalling point, and the phrase "lock in 100% relief" is precisely what
file 2 line 55 tells readers is false: *"If you transferred land in late 2024 or during 2025 believing you had locked
in the old treatment, **you did not**."* Same question, opposite answers across two live pages. Fix: "removes the
value from the estate if the donor survives seven years; it does not lock in the pre-reform rate, because
anti-forestalling reworks any gift made on or after 30 October 2024 where death falls on or after 6 April 2026 within
seven years."

### F3-M1 (MINOR) — FAQ line 38 opening sentence contradicts its own third sentence
*"Trusts holding BPR or APR-qualifying property **at 6 April 2026** each receive their own £2.5m s.124D allowance"*
vs, three sentences later, *"Existing trusts settled **pre-30-October-2024** each retain their own £2.5m allowance."*
Same drafting fault as F3-B3, in the FAQ. Fix the opening clause to "settled before 30 October 2024".

### F3-M2 (MINOR) — trust-side £2.5m quantum asserted where house positions say it is not locked
Lines 38 and 156 state the per-trust allowance as £2.5m. House positions §15.4: *"Quantum of the trust-side allowance
is set by the s.124G-124K range (the 'settlement allowance' mechanics); **pre-RUN re-verification against the enacted
FA 2026 text recommended for any trust-side worked example**."* Not verified this pass (s.124G-124K not fetched).
Flag for the manager rather than assert.

### F3-M3 (MINOR) — "£400k+ that the £1m headline would have produced" understates; the figure is £600,000
Line 98: *"Net effect: £300,000 of additional IHT on the trading element previously fully sheltered, materially less
than the **£400k+** that the £1m headline would have produced."* Re-derived on the page's own £4m trading business:
£4,000,000 − £1,000,000 = £3,000,000 excess → 50% relief → £1,500,000 chargeable → 40% = **£600,000**. "£400k+" is
literally true of £600,000 but reads as ~£400k. Fix: "£600,000".

### F3-M4 (MINOR) — RNRB taper extinguishment point cited at the single-person figure inside a two-allowance sum
Line 127: *"RNRB (fully tapered, **estate over £2.35m**)"* for the Singh couple's combined position. House positions
§15.1: fully extinguished at £2,350,000 single **or £2,700,000 with transferable RNRB**. The conclusion is unaffected
(£4,950,000 estate), but the threshold quoted is the wrong one for the sum being done. Fix: "£2.7m with both RNRBs".

### F3-M5 (MINOR) — the "pre-cap" comparator includes pensions under 2025/26 rules
Lines 125-127: the estate is sized *"on the 2027/28 basis (pension included)"* at £4,950,000, then the pre-cap
figure is computed *"(illustrative, on 2025/26 rules)"* on the same £4,950,000. Pensions do not enter the estate
until 6 April 2027 (house positions §15.5). On true 2025/26 rules the gross is £4,550,000 and the pre-cap IHT is
£560,000, not £720,000. Holding the base constant to isolate the cap is defensible and it is labelled illustrative,
but the label "2025/26 rules" is wrong for a pension-inclusive estate. Fix: "on pre-cap relief rules, holding the
2027/28 estate constant".

Also noted, not scored: line 107 attributes the wholly-or-mainly-trading test to *"IHTM25000"*; the test is
s.105(3) IHTA 1984, IHTM25000 is HMRC guidance on it.

**Correct and verified on file 3:** the two back-patched s.124E answers (lines 36 and 172) — both state the claim
requirement and the unused-percentage mechanism accurately; all four segment worked examples; the Singh arithmetic;
the new consumer blocks at lines 177-205 (anti-forestalling exact at line 201, AIM non-consuming at line 183,
£3.0m → £100,000 and £4.5m → £400,000 at line 181, £3.0m farm + £1.0m rental split at line 189); the F-102 warnings
at lines 62 and 171; "around 17 months of run-up" (30 Oct 2024 → 6 Apr 2026 = 17.2 months).

---

## File 4 — `Property/web/content/blog/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation.md` (scoped: lines ~38 and ~158 plus one paragraph either side)

### F4-B1 (BLOCKER) — line 38 says a spouse-exempt first death WASTES the allowance and that a deed of variation is the only recovery; both are false, and it contradicts the s.124E sentence two sentences above it

Line 38, closing sentence: *"A spouse leaving qualifying property entirely to the survivor under the s.18 spouse
exemption **wastes the first-death allowance, which is recoverable only via a deed of variation within 2 years of
first death** (see Wave 4 C5)."*

This is the worst finding in the batch. It is the superseded "fixed to their own estate" position surviving verbatim
in substance, it sits in the same answer as the correct back-patch, and it pushes families toward an unnecessary and
irreversible deed of variation.

Correct text, IHTA 1984 s.124E(4)(a): the first allowance is reduced only by *"the total amount by which values
transferred by **chargeable transfers** made by the deceased person … were treated as reduced as a result of section
104(1A) or 116(1A)."* A s.18 spouse-exempt transfer is not a chargeable transfer. Nothing is reduced under
s.104(1A)/116(1A). The allowance is therefore **100% unused**, and s.124E(5)-(6) transfer 100% of it to the survivor
on claim. Leaving everything to the spouse is the case in which the allowance is *most* fully preserved, not wasted.

Internal contradiction, same answer, two sentences earlier: *"Any allowance the first-to-die spouse leaves unused can
be claimed by the survivor's estate under IHTA 1984 s.124E."* And line 158 of the same file: *"A first-death
allowance that goes unused **is not wasted**."* And file 2 line 61: *"Leaving everything to your spouse **does not
burn it**."*

Fix: delete the sentence. If a deed-of-variation cross-link is wanted, it belongs to a different case (qualifying
property left to non-spouse beneficiaries in excess of the allowance).

### F4-B2 (BLOCKER) — line 38 asserts £5m is reachable "only by structuring ownership"

Line 38: *"A married couple where both spouses each hold qualifying BPR or APR property has £5m of total allowance
in aggregate, **but only by structuring ownership so that each spouse's estate genuinely holds £2.5m of qualifying
property**."*

Falsified by the next sentence in the same answer and by s.124E. Where all qualifying property sits in one name and
that spouse dies first leaving it to the survivor, the first allowance is fully unused and transfers on claim; the
couple reaches £5m with no ownership restructuring at all. The follow-on sentence compounds it: *"an estate can only
set qualifying property against the allowance it actually holds"* — true of the *first* estate's own charge, but it
is the transferred allowance, not the property location, that delivers the £5m.

Fix: *"£5m is reachable either by both estates holding qualifying property, or by the survivor claiming the first
spouse's unused allowance under s.124E. Ownership split still matters where qualifying property passes to
non-spouse beneficiaries on the first death."*

### F4-B3 (BLOCKER, cross-page via hunt (f)) — RNRB applied to a £3.5m estate that contains no main residence, where file 3 correctly zeroes it

In scope because it is the same question answered two ways across the batch. Line 34 (FAQ, adjacent to the scoped
block) and line 115 (body): *"After **£325k NRB plus £175k RNRB** plus transferred allowances (assume single estate
not couple): £1,600k less £500k = £1,100k chargeable at 40% = £440k IHT"*, and the post-cap mirror *"After £500k of
NRB plus RNRB: £1,250k at 40% = £500k IHT."*

Two independent reasons the £175k RNRB is unavailable:

1. **Taper.** House positions §15.1: *"RNRB taper: withdrawn at £1 for every £2 of net estate above £2,000,000; fully
   extinguished at £2,350,000 (single)."* The Aldridge estate is £3.5m. The taper runs on the net estate **before**
   reliefs and exemptions, so APR/BPR do not rescue it. RNRB = £0.
2. **No qualifying residence.** House positions §15.1: *"the residence must be in the deceased's estate, must have
   been a residence of the deceased at some point, and must pass to a direct lineal descendant."* The itemised estate
   is farmland £1.2m, developer SPV £400k, BTL flats £1.6m, AIM £300k. No main residence is present at all.

Re-derived correct figures: pre-cap £1,600k − £325k = £1,275k × 40% = **£510k** (page says £440k, understated by
£70k); post-cap £1,750k − £325k = £1,425k × 40% = **£570k** (page says £500k, understated by £70k). The headline
**cap impact of £60k is unaffected** and remains correct, as is the £180k / £120k £1m-headline comparison.

File 3's Singh example handles the same point correctly (*"RNRB (fully tapered, estate over £2.35m)"*, NRB only),
so the two pages give different answers to "does RNRB survive on a multi-million estate".

### F4-M1 (MINOR) — line 155 still recommends ownership restructuring on the superseded premise
Line 155 (the paragraph immediately before the scoped line 158): *"restructuring ownership across spouses to use both
£2.5m s.124D allowances"*. Same fault as F3-B1, lower severity because line 158 immediately below now carries the
s.124E correction. Fix: add "or, where qualifying property passes to the survivor, claiming the unused allowance
under s.124E".

Line 158 itself is **correct** as back-patched: *"A first-death allowance that goes unused is not wasted: the
survivor's executors can claim the unused percentage under IHTA 1984 s.124E."* Matches s.124E(5)-(6). Its opening
clause (*"should consider pre-2026 ownership rebalancing"*) is softened by "consider" and survives.

### F4-M2 (MINOR) — line 34 self-contradicts on whose allowances are in play
*"After £325k NRB plus £175k RNRB **plus transferred allowances (assume single estate not couple)**"*. Transferred
allowances and "single estate not couple" are mutually exclusive. Fix: delete "plus transferred allowances".

**Out of scope this pass, flagged not scored:** line 148 still reads *"Trusts that were created to multiply the
**£1m** allowance"* — a surviving pre-F-102 quantum, against a frontmatter editorialNote that claims *"body uses
enacted £2.5m figure"* and a lead note claiming *"updated to the enacted £2.5m s.124D figure **throughout**"*. Worth
a one-word fix when the page is next opened.

---

## Cross-page contradiction register (hunt (f))

| Question | File 1 | File 2 | File 3 | File 4 | Correct |
|---|---|---|---|---|---|
| Does the s.124E transfer need a claim? | silent (F1-B1) | yes, stated | yes, stated (36, 172) | yes, stated (38, 158) | Claim required, s.124E(5) |
| Does a spouse-exempt first death waste the allowance? | implicitly no | "does not burn it" | n/a | **line 38 "wastes … recoverable only via DoV"** vs line 158 "is not wasted" (F4-B1) | Not wasted; 100% transfers on claim, s.124E(4)(a) |
| Must you split ownership to reach £5m? | not raised | no | **yes, 3 passages** (F3-B1) | **yes, line 38 "only by"** (F4-B2) | No, where property passes to the spouse |
| Is anti-forestalling motive-based? | no (mechanical) | no (mechanical) | **yes, lines 80 + 151** (F3-B2) vs line 201 mechanical | no (mechanical) | Mechanical: on/after 30 Oct 2024 + death on/after 6 Apr 2026 + within 7 years |
| Do gifts made now "lock in" 100% relief? | not raised | **no** (line 55) | **yes** (line 138) (F3-B5) | no | No |
| Do pre-30-Oct-2024 trusts keep unlimited relief? | n/a | no, own allowance | **line 156 "pre-reform treatment"** vs FAQ 38 "own £2.5m allowance" (F3-B3) | no, own allowance | Own allowance, not unlimited |
| RNRB on a multi-million estate? | n/a | n/a | **£0, correctly tapered** | **£175k applied to £3.5m** (F4-B3) | £0 |
| Where do the operative figures live? | s.124D | s.124D | **line 160 "HMRC technical note"** vs lines 62/171 (F3-B4) | s.124D | s.124D only (F-102) |

## Arithmetic ledger — every chain re-derived

| Page | Claim | Re-derivation | Verdict |
|---|---|---|---|
| 1 | £3,650,000 farm → £230,000 | 3,650,000 − 2,500,000 = 1,150,000; ×50% = 575,000; ×40% = 230,000 | correct |
| 1 | effective 20% / 6.3% of farm | 230,000 ÷ 1,150,000 = 20.0%; 230,000 ÷ 3,650,000 = 6.301% | correct |
| 1 | 40% of everything = £1,460,000 | 3,650,000 × 40% | correct |
| 1 | at £1m allowance → £530,000 | 2,650,000 × 50% × 40% | correct |
| 1 | "two and a half times larger" | 530,000 ÷ 230,000 = **2.30x** | **F1-M1** |
| 1 | £3m farm → £100,000, 20% of excess, 3.3% of farm | 500,000 × 50% × 40% = 100,000; ÷500,000 = 20%; ÷3,000,000 = 3.333% | correct |
| 1 | £4m farm → £750,000 in charge | 1,500,000 × 50% | correct (phrasing F1-M2) |
| 1 | mixed £1.8m + £0.9m → £200,000 above | 2,700,000 − 2,500,000 | correct |
| 2 | £4m farm → £300,000; 20% of £1.5m | 1,500,000 × 50% × 40% = 300,000 | correct |
| 2 | £300,000 → ten × £30,000 | 300,000 ÷ 10 | correct |
| 2 | AIM effective 20% | 50% relief → 50% × 40% | correct |
| 3 | £5m farm / £5m WIP / £5m SA → £500,000 | 2,500,000 × 50% × 40% | correct (all three) |
| 3 | mixed £4m trading → £300,000 | 1,500,000 × 50% × 40% | correct |
| 3 | "£400k+ at the £1m headline" | 3,000,000 × 50% × 40% = **600,000** | **F3-M3** |
| 3 | £1.5m APR + £1.5m BPR → £100k | 500,000 × 50% × 40% | correct |
| 3 | Singh gross £4,950,000 | 2,500,000 + 1,000,000 + 900,000 + 400,000 + 150,000 | correct |
| 3 | Singh £1,800,000 → £720,000 | 2,450,000 − 650,000 = 1,800,000; ×40% | correct (labelling F3-M5) |
| 3 | Singh at £4m company → £300,000 | 1,500,000 × 50% × 40% | correct |
| 3 | £3.0m → £100,000; £4.5m → £400,000 | 500,000 × 20%; 2,000,000 × 20% | correct |
| 3 | £3.0m farm + £1.0m rental → £100,000 | 500,000 × 50% × 40% | correct |
| 4 | Aldridge pre-cap £440k | 1,600 − 500 = 1,100 × 40% = 440 **but RNRB is nil** → 1,600 − 325 = 1,275 × 40% = **510** | **F4-B3** |
| 4 | Aldridge post-cap £500k | 1,750 − 500 = 1,250 × 40% = 500 **but RNRB is nil** → 1,750 − 325 = 1,425 × 40% = **570** | **F4-B3** |
| 4 | AIM chargeable £150,000 | 300,000 × 50% | correct |
| 4 | cap impact £60k = 20% of £300k AIM | 500 − 440 = 60; 570 − 510 = 60 (impact unchanged by the RNRB error) | correct |
| 4 | £1m-headline comparison £180k / £120k | 1,600 − 1,000 = 600 excess × 50% × 40% = 120; +60 AIM = 180 | correct |
| 4 | £2m CLT at £1m headline → £120k | 1,000,000 excess × 50% × 20% lifetime rate = 100,000… page says £120k | **out of scope, unverified** |

Last row noted only: the £120k figure at line 48 sits outside the scoped passages and its derivation is not obvious
(a £1,000,000 excess at 50% relief gives £500,000 chargeable; at the 20% lifetime CLT rate that is £100,000, and the
NRB is not obviously accounted for). Flagged for whoever takes the rest of that page.
