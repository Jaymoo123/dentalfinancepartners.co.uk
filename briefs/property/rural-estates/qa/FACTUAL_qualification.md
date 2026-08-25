# FACTUAL QA — rural / landed-estates batch (qualification surfaces)

Adversarial factual pass, 2026-08-21. Four surfaces. Every number re-derived from
first principles; every statute flagged below was fetched from legislation.gov.uk
in this session before the flag was written. Ground truth: `docs/property/house_positions.md`
§1, §5, §7, §9, §15.1, §15.4, §21.4, §22.1, §22.3 (§15.4 as patched 2026-08-21).

## Verdicts

| # | Surface | Verdict |
|---|---|---|
| 1 | `content/blog/farm-tax-uk-guide.md` | **must_fix** (1 BLOCKER, 2 MINOR) |
| 2 | `content/blog/maximising-business-relief-to-reduce-inheritance-tax.md` | **all_clear** (0 BLOCKER, 2 MINOR) |
| 3 | `content/blog/agricultural-relief-for-inheritance-tax-key-benefits.md` | **must_fix** (2 BLOCKER, 3 MINOR) |
| 4 | `src/app/landed-estates/page.tsx` + `src/lib/calculators/tools/bpr-apr-allowance-calculator.ts` | **must_fix** (1 BLOCKER, 2 MINOR) |

**Conductor's priority flag (April 2027 property income) is a FALSE ALARM.** See §1.0.

---

## 1. `Property/web/content/blog/farm-tax-uk-guide.md`

### 1.0 PRIORITY FLAG — CLEARED, no finding

The conductor flagged the page's "20/40/45 now, 22/42/47 from 6 April 2027 with
Scotland carved out". Checked against `house_positions.md` §7 verbatim, not memory.

House position §7: *"For **2026/27**, the standard UK income tax rates of **20%,
40%, 45%** apply to rental income... For **2027/28 onwards**, property income
(England, Wales and NI; Scotland excluded) is taxed at **22% basic, 42% higher,
47% additional**"*, enacted by FA 2026 ss.6-7.

Page line 69: *"From 6 April 2027 property income gets its own rates of 22%, 42%
and 47% in England, Wales and Northern Ireland, two points above the equivalent
general rates, while Scottish taxpayers stay on the Holyrood rates for this
income."*

- **Mechanism**: correct. §7 describes **separate property income tax rates**, not
  a surcharge bolted onto the general rates and not a change to the reducer. The
  page says "gets its own rates". Match.
- **Rates**: 22/42/47 correct.
- **Scope**: correct, and correct in the way §7's do-not-write list specifically
  polices. §7: *do not write "the 2027 rates apply to England and NI only" or
  "Scotland and Wales set their own property rates"*. The page names England,
  Wales and NI and carves out Scotland only. Match.
- **Reducer**: the page never claims the s.24 reducer stays at 20%, so it does not
  trip §7's other do-not-write. Its silence on the reducer is also substantively
  right here: the s.24 restriction bites on dwelling-related loans, and bare
  farmland let under an FBT or a grazing licence is not a dwelling.
- Arithmetic check, line 69: 2% x £40,000 = **£800**. Correct.

No finding. The page is the closest of the four to §7's locked framing.

### 1.1 BLOCKER — s.165 holdover scope is stated too narrowly; let farmland that qualifies for APR does get holdover

**Wrong text (FAQ, line 25):** *"Roll-over relief under section 152 of the
Taxation of Chargeable Gains Act 1992 and gift holdover under section 165 of the
same Act are the two that can apply to **trading farmland**."*

**Also (body, line 53):** *"Both turn on the land being used in a trade, so land
you have let out for years is a harder case than land you farm yourself."*

**Correct position.** True for s.152. **Not true for s.165.** TCGA 1992 Sch 7
para 1 is an express carve-out for agricultural property that is *not* used in a
trade, fetched verbatim from
`https://www.legislation.gov.uk/ukpga/1992/12/schedule/7`:

> **para 1(1)** "This paragraph applies where—(a) there is a disposal of an asset
> which is, or is an interest in, agricultural property within the meaning of
> Chapter II of Part V of the Inheritance Tax Act 1984..., and (b) apart from
> this paragraph, the disposal would not fall within section 165(1) **by reason
> only that the agricultural property is not used for the purposes of a trade**
> carried on as mentioned in section 165(2)(a)."
>
> **para 1(2)** "Where this paragraph applies, section 165(1) shall apply in
> relation to the disposal if the circumstances are such that a reduction in
> respect of the asset—(a) is made under Chapter II of Part V of the Inheritance
> Tax Act 1984..."

So the gate for s.165 on let farmland is **APR availability, not trade use**. A
landlord whose let acres clear the s.117(b) seven-year limb gets holdover. The
page tells that reader the opposite.

Note the direction of the error: it *understates* relief, so it does not breach
the conductor's "must not imply landlords get trading reliefs" constraint. It
still states the statutory scope wrongly on a page whose readers are, by
definition, the people Sch 7 para 1 was written for.

s.152 itself verified at `https://www.legislation.gov.uk/ukpga/1992/12/section/152`:
old assets *"used, and used only, for the purposes of the trade throughout the
period of ownership"*, new assets acquired *"in the period beginning 12 months
before and ending 3 years after the disposal"*. The page's roll-over description
is correct and needs no change.

**Severity: BLOCKER.** A stated rule of statutory scope that is verifiably wrong.

### 1.2 MINOR — "let cottages ... never qualified for the relief in the first place" contradicts s.115(2)

**Wrong text (line 45):** *"That means the agricultural value of the land and
buildings plus any genuine trading business, with **let cottages**, development
hope value and any pure investment holdings stripped out, because those parts
**never qualified for the relief in the first place**."*

**Correct text**, IHTA 1984 s.115(2), fetched from
`https://www.legislation.gov.uk/ukpga/1984/51/section/115`:

> "'Agricultural property' means agricultural land or pasture and includes
> woodland and any building used in connection with the intensive rearing of
> livestock or fish... and also **includes such cottages, farm buildings and
> farmhouses**, together with the land occupied with them, as are of a character
> appropriate to the property."

Cottages are inside the statutory definition. A cottage occupied by a farm worker
and of a character appropriate to the holding is agricultural property and does
qualify. The blanket "never qualified" is wrong, and it contradicts the sibling
APR page, which uses *"A cottage let to a farm worker"* (line 76) as a worked
example of property whose APR continuity can be broken — i.e. property that
otherwise qualifies. See CROSS-PAGE C4.

Fix is narrowing, not deletion: "cottages let to non-agricultural tenants" would
be right.

### 1.3 MINOR — couples £5m stated without the s.124E claim

**Text (line 43):** *"If you are married or in a civil partnership, the unused
part of the allowance passes to the survivor, so the two of you can cover up to
£5 million between you."* **(FAQ, line 23):** *"Unused allowance passes to a
surviving spouse or civil partner, so a couple can cover up to £5 million between
them."*

Neither says "automatic", so neither trips §15.4's explicit prohibition. But both
present the transfer as self-executing. IHTA 1984 s.124E, fetched from
`https://www.legislation.gov.uk/ukpga/1984/51/section/124E`, is claim-gated:

> **s.124E(5)** "**Where a claim is made under this section**, the survivor's
> final allowance amount... is increased by the lesser of the amount of the
> survivor's final allowance amount and—(a) the amount given by multiplying the
> survivor's final allowance amount by the unused percentage of the deceased
> person..."

The other three surfaces all carry the qualifier in some form (BPR post: *"so it
is not automatic"*; landed-estates FAQ: *"not automatic in the sense of needing
no paperwork"*; calculator FAQ: *"It has to be claimed"*). This page is the
weakest of the four. See CROSS-PAGE C1.

### 1.4 Re-derived and CORRECT (no finding)

| Claim | Check | Result |
|---|---|---|
| CGT rates 18%/24% on farmland | §5: non-residential aligned to 18%/24% from 30 Oct 2024 | correct |
| AEA £3,000 | §5 | correct |
| £400,000 gain, higher rate: "24% of £397,000, which is £95,280" | 400,000 − 3,000 = 397,000; x 0.24 = 95,280 | correct |
| SDLT £900,000 bare farmland = £34,500 | FA 2003 s.55 Table B fetched: 0% to £150,000; 2% £150,000–£250,000; 5% remainder. 0 + (100,000 x 2% = 2,000) + (650,000 x 5% = 32,500) = **34,500** | correct |
| £900,000 second home, residential + surcharge = £80,000 | §1 surcharge column: 125,000 x 5% = 6,250; 125,000 x 7% = 8,750; 650,000 x 10% = 65,000. Total **80,000**. Surcharge correctly 5%, not 3% | correct |
| Saving "£45,500" | 80,000 − 34,500 = 45,500 | correct |
| s.116 FA 2003 as the residential definition; s.55 as the rate table | both correct cites | correct |
| Mixed use puts the whole price through Table B | s.55: Table B applies where "the relevant land consists of or includes land that is not residential property" | correct |
| 60-day scope: bare land via Self Assessment, residential element via the 60-day return where tax is due | §5: 60-day for UK residents only where CGT is due; residential only | correct |
| "£1 million ... was written at announcement stage" | §15.4 stale-page warning | correct |
| £1m of qualifying value above the allowance costs £200,000 | 1,000,000 x 50% x 40% = 200,000 | correct |
| APR reaches let land on a longer test | s.117(b) seven-year limb | correct |
| BPR does not reach passive rental | §22.1, *Pawson* | correct |
| FHL abolished 6 April 2025 | §6 | correct |
| Scotland LBTT / Wales LTT carve-out on the SDLT figures | §1 | correct |

---

## 2. `Property/web/content/blog/maximising-business-relief-to-reduce-inheritance-tax.md`

**Verdict: all_clear.** The entire Holloway chain re-derives exactly. Every
statutory cite checked out verbatim. Two MINORs, neither a stop.

### 2.1 Full re-derivation of the worked example — all correct

Estate March 2026: shares £2,000,000 + BTL £1,000,000 + AIM £500,000 + cash
£300,000 = **£3,800,000**. Widower, wife d.2018, NRB unused: £325,000 + £325,000
= **£650,000** (§15.1, TNRB up to 100%). RNRB: estate £3,800,000 > £2,700,000, so
extinguished (§15.1: "fully extinguished at... £2,700,000 (with transferable
RNRB)"). Both correct. Death 2031, company then £3,000,000.

**Do nothing:**
- shares £3,000,000: £2,500,000 at 100%, £500,000 at 50% → £250,000 chargeable ✓
- AIM £500,000 at 50% in its own tier → £250,000 chargeable ✓ (§15.4: AIM is a
  separate 50% sub-tier that does not consume the s.124D allowance — so the
  £2,500,000 is available in full to the trading shares, exactly as the page
  applies it)
- BTL £1,000,000 chargeable ✓ (*Pawson*, §22.1)
- cash £300,000 ✓
- 250,000 + 250,000 + 1,000,000 + 300,000 = **£1,800,000** ✓
- 1,800,000 − 650,000 = 1,150,000; x 40% = **£460,000** ✓

**Trust gift June 2026 (£2,000,000 of shares into a non-settlor-interested
discretionary trust):**
- CLT covered by 100% BPR inside the £2,500,000 allowance, so nil transfer of
  value, nil entry charge, and no NRB consumed at death ✓
- TCGA 1992 s.260 holdover available ✓ (§22.4; trust must be
  non-settlor-interested, which the page states at line 130 and FAQ line 37)
- Death 2031 is inside seven years of a June 2026 gift, so the death-time
  allowance is £2,500,000 − £2,000,000 = £500,000. Harmless here: the estate
  holds no s.124D-qualifying property (BTL fails, AIM is out-of-tier, cash is
  not relevant business property). The page's line 140 caveat — *"If he also
  owned qualifying farmland, the £2,000,000 gift would have eaten allowance that
  the farmland needed at death"* — is the correct statement of that mechanic ✓
- 1,000,000 + 250,000 + 300,000 = **£1,550,000** ✓
- 1,550,000 − 650,000 = 900,000; x 40% = **£360,000** ✓
- 460,000 − 360,000 = **£100,000** ✓
- Line 138 reconciliation "40% of half of £500,000" = 0.4 x 250,000 = £100,000 ✓
- Line 140 "if he survives to 2033" — June 2026 + 7 = June 2033 ✓

**Excepted assets:** £200,000 surplus cash + £150,000 let commercial unit =
£350,000 stripped; x 40% = **£140,000** ✓

**Dividend counter-example:** £200,000 x 39.35% = £78,700; £200,000 − £78,700 =
£121,300; x 40% = £48,520; 78,700 + 48,520 = **£127,220** ✓. Against 40% x
£200,000 = **£80,000** inside the company. 127,220 − 80,000 = **£47,220 worse
off** ✓.

Dividend rate check against the locked stack (§21.4 / §4053): *"Dividend rates
from 6 April 2026 (ITA 2007 s.8 as in force): ordinary 10.75%, upper 35.75%,
additional 39.35%. FA 2026 s.4 amended ONLY the ordinary... and upper... rates;
the 39.35% additional rate was already in force (FA 2022)."* Mr Holloway on a
£3,800,000 estate taking a £200,000 dividend is an additional-rate taxpayer, so
**39.35% is the right rate**, and it is the one rate in the stack that did not
move on 6 April 2026. This is the trap the F-19/F-20 back-patch was about and
the page is on the right side of it. ✓

**Contract for sale:** £2,400,000 sits inside the £2,500,000 allowance, so it is
fully relieved absent a contract; with a s.113 contract it is fully chargeable.
40% x £2,400,000 = **£960,000** ✓

**Mixed-estate FAQ (line 39):** £2,000,000 farmland + £1,500,000 shares =
£3,500,000; £2,500,000 at 100%, **£1,000,000 at 50%** ✓

### 2.2 Statutes — all verified correct

- **s.105(3)** filter as described ✓ (page compresses the s.105(3) list by
  dropping "dealing in securities, stocks or shares", acceptable for a property
  audience).
- **s.106** two years immediately preceding ✓.
- **s.107(1)** verified verbatim: *"...owned by the transferor for periods which
  together comprised **at least two years falling within the five years**
  immediately preceding the transfer of value"* — page line 31/166 correct ✓.
- **s.108** verified verbatim: *"(a) he shall be deemed to have owned it from the
  date of the death, and (b) if that other person was his spouse or civil partner
  he shall also be deemed to have owned it for any period during which the spouse
  or civil partner owned it."* — page correct on both limbs ✓.
- **s.112(2)** verified verbatim: *"An asset is an excepted asset... if it was
  neither—(a) used wholly or mainly for the purposes of the business concerned
  throughout the whole or **the last two years** of the relevant period..., nor
  (b) **required at the time of the transfer for future use** for those
  purposes"* — page line 33/150 correct on both limbs and on the two-year
  look-back ✓.
- **s.113** verified verbatim including both exceptions (sale of a business to a
  company mainly for shares/securities; sale of shares for reconstruction or
  amalgamation) — page line 35/156 correct ✓.
- **TCGA 1992 s.260** holdover, non-settlor-interested requirement ✓ (§22.4).
- ***Pawson* [2013] UKUT 050 (TCC)** ✓ (§22.1). Line 64's characterisation
  ("a holiday letting business with a reasonable level of management was still
  held to be mainly the holding of an investment") is an accurate statement of
  the ratio.
- **s.124D** £2,500,000, combined, rolling seven years ✓ (§15.4).
- **IHT413** is the correct BPR supplementary form ✓.

### 2.3 MINOR — s.105(1)(cc) controlling quoted shares listed in the qualifying set but never rated

Line 56 lists *"quoted shares where you control the company"* among what
qualifies; line 58 then rates only two things — *"Unquoted trading company shares
and businesses get 100%... Assets you own personally and let your own company or
partnership use get 50%"*. Controlling quoted shares (s.105(1)(cc)) get 50% under
s.104(1)(b) and fall in neither stated bucket, so a reader assumes 100%. FAQ line
21 has the same gap. One clause fixes it.

### 2.4 MINOR — the illustrative estate contains no residence, so the RNRB reasoning is redundant

Line 115 explains the RNRB away by taper (*"Because the estate is worth more than
£2,700,000, the residence nil-rate band is withdrawn to nothing"*). Correct as
far as it goes, and the £2,700,000 figure matches §15.1. But the itemised estate
is shares, BTL, AIM and cash — no qualifying residential interest, so there is no
RNRB to taper in the first place. Harmless (the conclusion is right by two
routes) but a sharp reader notices.

---

## 3. `Property/web/content/blog/agricultural-relief-for-inheritance-tax-key-benefits.md`

**Verdict: must_fix.** The Whitfield computation is clean, including the taper
subtlety most writers get wrong. Two flat errors elsewhere.

### 3.1 BLOCKER — *HMRC v Atkinson* is cited for the proposition the Upper Tribunal rejected

**Wrong text (FAQ, line 21):** *"**HMRC v Atkinson [2011] UKUT 506 (TCC) confirms
that a temporary end to the owner's personal occupation does not necessarily
break continuity where the land carried on being farmed by someone.**"*

**What the case actually decided.** *HMRC v (1) Colin Atkinson (2) Paul Smith,
executors of William Mashiter Atkinson deceased* [2011] UKUT 506 (TCC), 31 October
2011. The deceased owned a farm let to a family farming partnership and lived in a
bungalow on it until ill health moved him into residential care; he made
occasional visits and his possessions stayed in the bungalow until his death. The
First-tier Tribunal allowed APR on the bungalow. **The Upper Tribunal allowed
HMRC's appeal and reversed that**, holding that throughout the seven-year period
ending with the death the bungalow was **not** occupied by the deceased or another
for the purposes of agriculture as IHTA 1984 s.117(b) requires. APR was **denied**.

Source: Upper Tribunal (Tax and Chancery) decision,
`https://assets.publishing.service.gov.uk/media/575c04fbe5274a0da9000026/HMRC_v_CAtkinson_PSmith_exec_Atkinson_dece.pdf`
and `https://gov.uk/tax-and-chancery-tribunal-decisions/the-commissioners-for-hm-revenue-and-customs-v-1-colin-atkinson-2-paul-smith-executors-of-william-mashiter-atkinson-deceased-2011-ukut-506-tcc`.

The page cites the case for the FTT reasoning that the UT overturned. *Atkinson*
is the leading authority for the **opposite** of what the page says: it is the
case that breaks continuity when the occupier leaves.

The underlying proposition in the body prose (line 76, *"illness or a spell away
does not end the claim if a contractor or tenant kept the operation going"*) is
independently defensible for the **s.117(b) let-land limb**, where occupation "by
him or another" is expressly permitted. So the fix is to drop or reverse the
*Atkinson* citation, not to rewrite the surrounding advice. Cite *Atkinson* as the
cautionary case, or cite nothing.

**Severity: BLOCKER.** Citing a case backwards is the single worst failure mode
for an authority page, and it is the kind of thing a competitor or a professional
reader spots immediately.

### 3.2 BLOCKER — the APR replacement window is stated as three years; s.118 says 2-in-5 and 7-in-10

**Wrong text (line 78):** *"If you are replacing one holding with another, there
is a substitution rule that lets the old and new periods be added together
**within a three-year window**."*

**Correct text**, IHTA 1984 s.118 (Replacements), fetched from
`https://www.legislation.gov.uk/ukpga/1984/51/section/118`:

> **s.118(1)** (owner-occupier limb): occupation for periods which together
> comprised *"**at least two years falling within the five years** ending with
> that date"*.
>
> **s.118(2)** (let-land limb): ownership and occupation for periods which
> together comprised *"**at least seven years falling within the ten years**
> ending with that date"*.

There is no three-year window anywhere in s.118. The likely source of the error is
the TCGA 1992 s.152(3) roll-over reinvestment window (12 months before / 3 years
after), which is a different tax and a different rule. Note the page's own sibling
BPR post states the parallel BPR rule (s.107) correctly as 2-in-5, so the two
pages now disagree on a rule with the same shape. See CROSS-PAGE C3.

**Severity: BLOCKER.** Verifiably wrong statement of a statutory period, stated as
fact, on the page whose stated selling point is the qualification gate.

### 3.3 The Whitfield computation — fully re-derived, CORRECT

Helen Whitfield, widow, d. 2027, estate £2,400,000, husband used no allowances,
everything to two children.

**Relief table:** arable £600,000 + paddock agricultural value £20,000 =
**£620,000**; farmhouse and barn nil. Market values 600,000 + 180,000 +
1,150,000 + 470,000 = **£2,400,000** ✓ Both columns foot.

**Tax table, step by step:**
- Estate £2,400,000, less APR £620,000 → chargeable **£1,780,000** ✓
- NRB + TNRB: £325,000 x 2 = **£650,000** ✓ (§15.1)
- RNRB: base **£350,000** — correct in context. She is a widow whose husband used
  none of his allowances, so £175,000 own + £175,000 brought forward (§15.1:
  "up to 100% of each"). The farmhouse is a qualifying residential interest in
  her estate passing to lineal descendants, so RNRB is in play at all ✓
- **Taper — the hard part, and the page gets it right on two counts.**
  - *Is the taper base the pre-relief £2,400,000 or the post-APR £1,780,000?*
    Pre-relief. HMRC IHTM46023, fetched: *"The taper threshold applies to the
    value of the estate after liabilities, but **before taking into account any
    exemptions or reliefs**"*, and *"the value of his estate for taper purposes,
    'E', includes the aggregate of all the property he is beneficially entitled
    to, but is **not reduced by the reliefs**"*. So E = £2,400,000. If the page
    had used £1,780,000 there would be no taper at all and the whole computation
    would be wrong by £80,000. It did not.
  - *Does the taper bite on the combined £350,000 or only on her own £175,000?*
    On the combined figure. IHTA 1984 s.8D, fetched from
    `https://www.legislation.gov.uk/ukpga/1984/51/section/8D`: the *"default
    allowance"* is *"the total of—(i) the residential enhancement at the person's
    death, and (ii) the person's brought-forward allowance"*, and the
    *"adjusted allowance"* is *"the person's default allowance, less... the
    [taper] amount"*. Cross-checks against §15.1's *"fully extinguished at
    £2,350,000 (single) or £2,700,000 (with transferable RNRB)"*: £2,700,000 −
    £2,000,000 = £700,000; / 2 = £350,000 = the whole combined band. Consistent.
  - Arithmetic: (2,400,000 − 2,000,000) / 2 = **£200,000** withdrawn; 350,000 −
    200,000 = **£150,000** ✓
- Taxable: 1,780,000 − 650,000 − 150,000 = **£980,000** ✓
- IHT: 980,000 x 40% = **£392,000** ✓

**Counterfactual (farmhouse passes, agricultural value £700,000):**
- total relief 620,000 + 700,000 = **£1,320,000** ✓
- chargeable 2,400,000 − 1,320,000 = 1,080,000; − 650,000 − 150,000 = 280,000;
  x 40% = **£112,000** ✓
- RNRB stays £150,000 because E is still the pre-relief £2,400,000 — the page is
  internally consistent with its own (correct) taper treatment ✓
- delta 392,000 − 112,000 = **£280,000** ✓

**Anti-forestalling example (line 181):** £4,000,000 gifted November 2024, death
2028. £2,500,000 at 100%; £1,500,000 at 50% → **£750,000 in charge** ✓. Matches
§15.4 (rules apply to lifetime transfers on/after 30 October 2024 where the donor
dies on/after 6 April 2026 and within seven years) and matches the landed-estates
page's £4m worked figure exactly ✓.

### 3.4 Statutes — verified correct

- **s.115(2)** agricultural property definition: page FAQ line 19 tracks the
  statutory wording closely, including *"of a character appropriate to the
  property"* ✓
- **s.115(3)** agricultural value: *"the value which would be the value of the
  property if the property were subject to a perpetual covenant prohibiting its
  use otherwise than as agricultural property"* — page lines 25 and 82 ✓
- **s.116** rate: 100% where the interest carries the right to vacant possession
  or the right to obtain it within twelve months, or where let on a tenancy
  beginning on or after 1 September 1995; 50% otherwise ✓ (see MINOR 3.5)
- **s.117** two-year owner-occupier limb / seven-year let-land limb ✓
- ***McKenna's Executors v HMRC* [2006] SpC 565** as the character-appropriate
  authority ✓; the four-factor framing at lines 92-97 is a fair rendering
- **IHT400 + IHT414** correct forms ✓
- **s.124D(2)(a)** £2,500,000, combined, rolling seven years ✓

### 3.5 MINOR — s.116(2)(b) omitted, and the post-FA-2026 s.116 architecture is not reflected

Line 108: *"You get 100 per cent in **either of two situations**."* s.116(2) has
three limbs. The omitted one is s.116(2)(b): a beneficial interest held since
before **10 March 1981** with the s.116(3) conditions met. Narrow and historic,
but "either of two situations" is stated as exhaustive and is not. Line 110's
*"in practice that means one thing"* compounds it.

Separately, s.116 as fetched now reads: s.116(1) gives **50%** as the base rate,
s.116(1A) uplifts to **100%** where the transferor's interest condition is met
*and* the value is within the s.124D allowance. The page teaches rate first and
allowance second as separate topics. That is a defensible pedagogic split and I
am not flagging it as an error, but the page nowhere signals that the 100% rate is
now statutorily conditional on the allowance rather than sitting alongside it.

### 3.6 MINOR — s.115(4) stud-farm carve-out missing from a page built on the horses failure

Lines 59 and FAQ line 37 make equestrian use the headline disqualifier (*"Horses
kept for leisure, livery or a riding school are not agriculture"*, *"the single
most common reason a small holding gets nothing"*). Correct as stated. But IHTA
1984 s.115(4), fetched verbatim, deems the opposite for one case:

> "The breeding and rearing of horses on a stud farm and the grazing of horses in
> connection with those activities shall be taken to be agriculture and any
> buildings used in connection with those activities to be farm buildings."

Nothing on the page is wrong, but a reader with a stud farm reads four bullets
about horses and concludes they fail, when statute expressly says they pass. One
sentence closes it.

### 3.7 MINOR — IHTM24067 is the wrong manual page for the horses position

FAQ line 37: *"Horses kept for leisure, livery or a riding school are not
agriculture, which is HMRC's position at **IHTM24067**."* IHTM24067 fetched: its
title is *"Agricultural purposes: Farm Woodland Premium Scheme and other
agri-environmental schemes"*, opening *"There are many other
agricultural/environmental schemes that can apply to agricultural land."* The
exclusion language does appear there (*"keeping horses for recreational and/or
sporting purposes is specifically excluded, as is fish farming"*) but in the
context of **scheme eligibility**, not the general APR position on equestrian use.
Off-target cite. Either drop the manual reference or point it at the on-point
page, and pair it with s.115(4) per 3.6.

### 3.8 MINOR — the paddock is labelled "Borderline" in the table and then relieved at 100% in the computation

Table row (line 141) marks the two-acre paddock *"Borderline"* in the Qualifies?
column; the prose (line 148) says *"the rate depends on whether that grazing
arrangement is a licence or a tenancy"*; the tax table (line 158) then applies
*"agricultural relief at 100%"* to the full £620,000, which includes the
paddock's £20,000. Immaterial to the headline (£20,000 of relief is £8,000 of
tax at most) but the computation silently resolves a question the page says is
open. Either resolve it in the prose or footnote the assumption.

---

## 4. Code surfaces (copy only)

### 4a. `Property/web/src/app/landed-estates/page.tsx`

**Verdict: all_clear on the two items the conductor named. One MINOR.**

**Transferability ledger row (lines 60-65) — CORRECT, no hedge, no "automatic":**

> rule: *"Transferable between spouses and civil partners"*
> status: *"In force from 6 April 2026"*
> effect: *"Whatever the first of you to die does not use passes to the survivor,
> so a couple can shelter up to £5 million of qualifying value between them."*

Checked against §15.4 as patched today. The row does **not** say "automatic"
(§15.4's explicit prohibition) and does **not** carry the superseded
"fixed to each estate / not transferable" framing or any "recommended
re-verification" hedge. It is a plain statement of a now-verified position, which
is what the patched §15.4 supports. The FAQ at line 112 supplies the claim
qualifier the ledger row leaves out: *"It is not automatic in the sense of needing
no paperwork, and it is worth checking what the first estate actually used before
assuming the whole allowance carried over."* That is a fair lay rendering of
s.124E(5) *"Where a claim is made under this section"*. **Clear.**

**£4m worked arithmetic (lines 242-246) — CORRECT:**

> *"The first £2.5 million is relieved in full. The remaining £1.5 million is
> relieved at 50%, so £750,000 stays in the estate. At the ordinary 40% rate that
> is £300,000 of inheritance tax, before your nil rate band and the rest of your
> estate come into it."*

1,500,000 x 50% = 750,000 ✓; 750,000 x 40% = 300,000 ✓; effective 20% on the
excess ✓. The *"before your nil rate band and the rest of your estate come into
it"* caveat is doing necessary work and is present. FAQ line 107 repeats the same
chain identically. Matches the APR post's £4m/£750,000 figure exactly (CROSS-PAGE
C5: consistent).

**Other ledger rows — all match §15.4:** combined £2.5m under s.124D ✓; one
allowance not two ✓; rolling seven-year period cited to s.124D(3) ✓; AIM 50%
sub-tier *"sits outside the allowance and does not consume any of your £2.5
million"* ✓; anti-forestalling 30 Oct 2024 / 6 Apr 2026 / seven years, with
pre-30-Oct-2024 gifts *"not caught at all"* ✓; same-settlor trust
anti-fragmentation ✓; the £1m row as *"Superseded, never enacted at that level"* ✓.

**MINOR 4a.1 — the transferability row is the only ledger row with no statutory
cite, and the file's own convention says it should have one.** The doc comment at
lines 39-46 states: *"Statute citations belong in these cells, not in the prose
above them."* Five of the eight rows carry a cite (s.124D, s.124D(3)). The
transferability row carries none. As of the 2026-08-21 patch there is now a
verified one to give it: **IHTA 1984 s.124E, "Transfer of unused 100% relief
allowance"**. Adding it brings the row into line with the file's stated rule and
records the verification.

### 4b. `Property/web/src/lib/calculators/tools/bpr-apr-allowance-calculator.ts`

**Verdict: must_fix. One BLOCKER in an FAQ answer.**

**BLOCKER 4b.1 — the anti-forestalling FAQ makes surviving seven years conditional
on the gift predating the announcement. It is not, and the same answer contradicts
itself two sentences later.**

**Wrong text (line 213, opening of "Can I give the farm away now to avoid the
cap?"):** *"**Only if you live seven years, and even then only for gifts made
before the announcement.**"*

**The rest of the same answer, which is correct:** *"The anti-forestalling rule
applies the new rules to lifetime transfers made on or after 30 October 2024
**where the donor dies on or after 6 April 2026 and within seven years of the
gift**."*

The two conditions are **alternatives, not cumulative**. §15.4: *"the new rules
apply to lifetime transfers made **on or after 30 October 2024** if the donor dies
**on or after 6 April 2026 and within 7 years of the gift**."* Survive the seven
years and the gift is outside the rule on the second limb, whatever its date — a
PET that has run its seven years is not a chargeable transfer at all and consumes
no allowance. The opening sentence tells a reader that a gift made today can never
escape the cap, which is the opposite of the planning position and the opposite of
what the page's own next sentence, its own explainer paragraph 4, and the
landed-estates ledger row all say.

The rest of the answer is fine: *"A gift made in 2025 followed by a death in 2028
is caught"* ✓ (2028 is inside seven years of a 2025 gift, and death is after
6 April 2026). *"Gifts completed before 30 October 2024 sit outside the rule"* ✓.
The fix is the opening clause only.

**Severity: BLOCKER.** Self-contradicting inside one answer, wrong on the law,
and it sits on a calculator FAQ where readers arrive already looking for exactly
this answer.

**Couples toggle + s.124E consistency — CORRECT, no finding.** The conductor asked
specifically whether the toggle description is consistent with claim-based
transferability. It is:
- toggle help (line 94): *"The allowance is transferable, so an allowance unused
  on the first death can pass to the survivor. A couple can shelter up to
  £5,000,000 across two deaths."* — no "automatic" ✓
- explainer para 4 (line 186): *"Between spouses and civil partners the allowance
  is transferable **in the same way as the nil-rate band**"* ✓ — the NRB analogy
  is exactly right, since s.124E(5) is claim-gated in the same way s.8A is
- FAQ line 218: *"**It has to be claimed**, and it is only worth what was left
  over"* ✓ — the most explicit and most correct statement of s.124E across all
  four surfaces
- the £5,000,000 ceiling is right: s.124E(5) caps the uplift at *"the lesser of
  the amount of the survivor's final allowance amount and..."*, i.e. at most a
  doubling ✓

**Other copy checked against §15.4 — all correct:** file-header doc comment
(lines 4-25) is an accurate précis including the stale-page warning ✓;
`ALLOWANCE_PER_PERSON = 2_500_000` cited to s.124D(2)(a) ✓; intro ✓; AIM
sub-tier throughout ✓; the "£1m or £2.5m" FAQ ✓; the Pawson FAQ ✓ (§22.1);
explainer para 2's *"An estate £1,000,000 over the line therefore carries
£200,000 of tax on that slice"* = 1,000,000 x 50% x 40% ✓; the out-of-scope note
(NRB, RNRB and its £2m taper, 36% charity rate, trust-side allowances) is honest
and matches §15.4's trust-side "pre-RUN re-verification recommended" caution by
simply staying out ✓.

**Worked example 1 re-derived:** APR 1,800,000 + BPR 1,200,000 = 3,000,000;
allowance 2,500,000; excess 500,000; chargeable excess 250,000; AIM 200,000 x
50% = 100,000; total chargeable 350,000; x 40% = **£140,000** ✓. Split check:
500,000 x 20% = 100,000 and 200,000 x 50% x 40% = 40,000; 100,000 + 40,000 =
140,000 ✓ — line 240's attribution is right.

**Worked example 2 re-derived:** allowance 2,500,000 − 1,000,000 gift =
1,500,000; farm 2,000,000; relieved at 100% 1,500,000; excess 500,000;
chargeable 250,000; x 40% = **£100,000** ✓. Line 254's counterfactual (gift
before 30 Oct 2024 → full £2.5m available → farm wholly relieved) ✓ since
2,000,000 < 2,500,000.

**MINOR 4b.2 — the allocation FAQ says mixed estates must "decide in advance
which assets take the 100% slice", which sits awkwardly against the sibling BPR
post.** Calculator FAQ line 198: *"Mixed estates need to **decide in advance which
assets take the 100% slice**, because the allowance is applied to the estate
rather than chosen asset by asset once someone has died."* BPR post line 170, on
the identical £2,000,000 farmland / £1,500,000 shares fact pattern: *"**which of
the two you treat as filling the allowance makes no difference to the total**."*
Both can be true (the total is rate-invariant where both assets attract the same
rates; the sequencing still matters in lifetime planning) but a reader moving
between the two gets opposite steers on the same numbers. §15.4 is silent on the
allocation mechanics, so I am **not** asserting which is right — flagging it as
an unresolved position that the two surfaces should state the same way. Worth an
HP note rather than a page edit.

---

## CROSS-PAGE

### C1. The s.124E claim qualifier is present on three surfaces and absent on two

| Surface | Wording | Carries the claim? |
|---|---|---|
| calculator FAQ (line 218) | *"It has to be claimed, and it is only worth what was left over"* | **yes, explicit** |
| landed-estates FAQ (line 112) | *"It is not automatic in the sense of needing no paperwork"* | **yes** |
| BPR post (line 87) | *"...in the same way the nil-rate band does... but it depends on the first death being handled properly, so it is not automatic"* | **yes** |
| APR post (line 121 / FAQ line 31) | *"Unused allowance transfers to a surviving spouse or civil partner, in the same way the nil-rate band does"* / *"Any unused allowance transfers between spouses and civil partners"* | **partial** (analogy only in body; FAQ flat) |
| farm-tax post (line 43 / FAQ line 23) | *"the unused part of the allowance passes to the survivor"* / *"Unused allowance passes to a surviving spouse or civil partner"* | **no** |
| landed-estates ledger row (line 64) | *"Whatever the first of you to die does not use passes to the survivor"* | **no** (but the page's FAQ covers it) |

None of them says "automatic", so §15.4's hard prohibition is not breached
anywhere. But the family answers the same question at five different levels of
qualification. **Recommended single form**, since it is already the best one on
the estate and is right on the statute: *"in the same way as the nil-rate band, so
it has to be claimed."* Apply to farm-tax (both places), APR (both places), and
the landed-estates ledger row (alongside the s.124E cite from 4a.1).

### C2. The AIM sub-tier is consistent everywhere — no finding

All four surfaces say the same thing and all match §15.4: relief falls 100% → 50%,
the 50% tier is separate, and it does **not** consume the s.124D allowance. Nobody
writes §15.4's prohibited *"AIM relief is unaffected"*. The BPR post and the
calculator both go further and give the same worked figure (£500,000 AIM → 50%
shelters £250,000 → £100,000 of IHT at 40%; and £200,000 AIM → £100,000
chargeable → £40,000). Consistent and correct.

### C3. Replacement/substitution periods now disagree between the two sibling posts

- BPR post (line 31 / line 166): *"two years of combined ownership within the five
  years before the transfer"* — **correct**, s.107(1) verified.
- APR post (line 78): *"added together within a three-year window"* — **wrong**,
  s.118 is 2-in-5 and 7-in-10.

Same rule shape, two pages in the same cluster, two different answers, one of them
verifiably wrong. Fixing 3.2 fixes the divergence.

### C4. "Let cottages never qualified" (farm-tax) vs cottages as APR property (APR post)

- farm-tax (line 45): let cottages *"never qualified for the relief in the first
  place"*.
- APR post (FAQ line 19, tracking s.115(2)): agricultural property *"includes...
  such cottages, farm buildings and farmhouses... as are of a character
  appropriate to the property"*; and (line 76) uses *"A cottage let to a farm
  worker"* as an example of property whose APR continuity can be broken.

Direct contradiction on the same asset class. s.115(2) is with the APR post.
Fixing 1.2 fixes the divergence.

### C5. The £4m anti-forestalling worked figure is consistent — no finding

APR post line 181 (£4,000,000 gifted Nov 2024, £2.5m at 100% + £1.5m at 50% =
**£750,000 in charge**) and landed-estates lines 242-246 / FAQ line 107
(**£750,000** chargeable, **£300,000** of tax at 40%) are the same computation
carried to one more step on the hub page. Both correct, both consistent, and the
hub page correctly caveats that the £300,000 is before the NRB.

### C6. Cap quantum — no surface states £1m as current law

All five surfaces state £2,500,000 and describe £1m as superseded
announcement-stage history, which is what §15.4 requires. Two related-link slugs
contain `1m` (`agricultural-property-relief-mixed-estate-1m-cap`,
`iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation`) but the
user-visible link labels do not, so this is not a copy finding on these four
surfaces.

*(Sibling cap-family pages `inheritance-tax-on-farms`,
`how-to-avoid-inheritance-tax-on-a-farm`, `iht-april-2026-bpr-apr-cap-property-impact`,
`agricultural-property-relief-mixed-estate-1m-cap` and
`iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation` were swept
separately; see the CROSS-PAGE ADDENDUM below.)*

---

---

## CROSS-PAGE ADDENDUM — the wider cap family

Swept: `inheritance-tax-on-farms.md`, `how-to-avoid-inheritance-tax-on-a-farm.md`,
`iht-april-2026-bpr-apr-cap-property-impact.md`,
`agricultural-property-relief-mixed-estate-1m-cap.md`,
`iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation.md`.

**The four in-scope surfaces all link into this family.** Two out-of-scope pages
carry errors materially worse than anything found in the four. They are outside
this QA's remit to fix but they are inside the same cluster and they contradict
what the four surfaces tell the same reader, so they are reported here.

### C7. BLOCKER (out of scope, escalate) — `agricultural-property-relief-mixed-estate-1m-cap.md` still denies s.124E spousal transferability

**Wrong text (line 86):** *"The cap is per individual; **transferable cap between
spouses on second death is not provided by the announced reform package** (a point
still being clarified in technical consultations; sessions writing this content
should check the most-recent legislation.gov.uk text and gov.uk technical note for
any transitional or transferable-cap provisions)."*

This is verbatim the superseded position that §15.4 was patched today to kill:

> *"Do not write 'automatic' (it needs a claim) and do not write '**fixed to each
> estate / not transferable**' (superseded; two shipped lines on
> `iht-april-2026-bpr-apr-cap-property-impact` carried this and were back-patched
> 2026-08-21)."*

The 2026-08-21 back-patch hit `iht-april-2026-bpr-apr-cap-property-impact` (now
correct: *"Yes, but only by claim. IHTA 1984 s.124E..."*) and **missed this page**.
IHTA 1984 s.124E "Transfer of unused 100% relief allowance" is enacted and was
verified direct at statute today (s.124E(1), (5), (6) quoted at 1.3 above). The
page also never states the £5,000,000 couples figure anywhere, so it is the only
page in the family that leaves a reader believing a couple gets £2.5m, not £5m.

Two of the four in-scope surfaces link to it by name (farm-tax line 47:
*"the mixed estate allocation problem"*; landed-estates line 348 and the
calculator's `related` list).

**Also on the same line: a pipeline-artefact leak into live copy** —
*"sessions writing this content should check the most-recent legislation.gov.uk
text and gov.uk technical note"*. That is an instruction to a writing session
sitting in published body text. Same leak at line 39-40: *"sessions advising on a
pre-April-2026 transfer should confirm against the most-recent published
guidance."* Editorial track should see this.

### C8. BLOCKER (out of scope, escalate) — the same page states the anti-forestalling trigger as 6 April 2026, not 30 October 2024

**Wrong text (FAQ, lines 39-40):** *"Yes, **for transfers completed before 6 April
2026 the existing 100% APR rate applies regardless of value**... **The transitional
position protects pre-6-April-2026 PETs even if the donor dies within 7 years
afterwards: 100% APR remains available on the gifted property**... **Anti-forestalling
provisions in the Autumn Budget 2024 reform package were largely directed at
BPR-relevant share schemes rather than direct land transfers**."*

**And (line 177):** *"the failed-PET value is still relieved at 100% under the
pre-April-2026 rates (**s.131 IHTA 1984 transitional logic**)."*

**Correct position**, §15.4, which quotes gov.uk verbatim:

> *"the new rules apply to lifetime transfers made **on or after 30 October 2024**
> if the donor dies **on or after 6 April 2026** and within 7 years of the gift.
> Pre-announcement gifts (before 30 October 2024) are NOT caught."* Gov.uk
> verbatim: *"The new rules will apply for lifetime transfers on or after 30
> October 2024 if the donor dies on or after 6 April 2026. This prevents
> forestalling."*

Three errors in one passage:
1. **Wrong trigger date.** 30 October 2024, not 6 April 2026. The page treats
   roughly 17 months of gifts as safe that are in fact caught.
2. **Wrong scope.** The rule catches APR land transfers exactly as it catches BPR
   share transfers. §15.4 says "lifetime transfers" without any land/shares
   distinction; the sibling page
   `iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation` line 124 says
   so explicitly (*"a lifetime gift of **BPR or APR property** made on or after
   30 October 2024"*). This page is the only one in the family claiming
   anti-forestalling barely touches land.
3. **Wrong statute.** s.131 is not transitional-rate logic. Fetched from
   `https://www.legislation.gov.uk/ukpga/1984/51/section/131`: heading *"The
   relief"*, and s.131(1) *"...where because of the transferor's death within
   seven years of the transfer, tax becomes chargeable in respect of the value
   transferred by a potentially exempt transfer..."*, s.131(2) *"If the market
   value of the transferred property at the time of the chargeable transfer
   exceeds its market value on the relevant date..."*. It is **fall-in-value
   relief**. It has nothing to do with locking in a relief rate.

This is the most planning-damaging error found anywhere in the cluster: it tells a
farming reader that a gift made at any point up to 5 April 2026 is safe on a death
within seven years. All four in-scope surfaces say the opposite, correctly.

### C9. MINOR (out of scope) — `iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation.md` says a spouse-exempt first death WASTES the allowance; the calculator says it does not

- Sibling page (FAQ, lines 37-38): *"A spouse leaving qualifying property entirely
  to the survivor under the s.18 spouse exemption **wastes the first-death
  allowance, which is recoverable only via a deed of variation within 2 years of
  first death**."*
- Calculator (FAQ, line 218): *"leaving everything to the survivor spouse-exempt
  **does not waste the allowance**, but failing to hold qualifying property in a
  way that lets the survivor use it can."*

**The calculator is right.** s.124E(1)(b) requires only that *"an amount of the
100% relief allowance of the deceased person is **unused on death**"*, and
s.124E(6) measures the unused percentage as the unused allowance over the
deceased's final allowance amount. A wholly spouse-exempt estate makes no
chargeable transfer, so **none** of the allowance is used and the full 100%
percentage is available to claim. Identical architecture to the TNRB at s.8A,
which §15.4 expressly names as the model (*"CLAIM-BASED (s.124E(5), like the
transferable NRB, a claim must be made)"*). The sibling page is teaching the
pre-s.124E ownership-splitting workaround and is internally inconsistent, since
the same answer also correctly cites s.124E as transferring the unused
percentage.

Direct contradiction on the exact question the conductor flagged (the couples /
£5m mechanism), between an in-scope surface and a page it links to.

### C10. Family-wide, for the record

- **AIM sub-tier:** consistent and correct across every page that mentions it
  (50%, separate tier, does not consume the s.124D allowance). Nobody writes
  §15.4's prohibited *"AIM relief is unaffected"*.
  `agricultural-property-relief-mixed-estate-1m-cap.md` does not mention AIM at
  all, which is a coverage gap rather than an error.
- **Cap quantum:** no page in the family states £1m as current law. Every
  occurrence frames it as superseded announcement-stage history. The two `1m`
  slugs are retained for URL stability and both pages say so in their own
  summaries. Clean.
- **Worked-example mechanism:** every example across all nine pages applies 100%
  to the allowance then 50% above it, i.e. an effective 20% on the excess, and
  each is internally correct. No numeric contradictions.
- **s.124E claim qualifier**, family-wide count: explicit on
  `how-to-avoid-inheritance-tax-on-a-farm`,
  `iht-april-2026-bpr-apr-cap-property-impact`,
  `iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation` and the
  calculator; NRB-analogy-only on `inheritance-tax-on-farms` and the APR post;
  absent on the farm-tax post and the landed-estates ledger row; **denied
  outright** on `agricultural-property-relief-mixed-estate-1m-cap` (C7). Nine
  pages, four different answers.
- **MINOR, `iht-april-2026-bpr-apr-cap-property-impact.md` line 80:** *"The reform
  applies to deaths on or after 6 April 2026, and to chargeable lifetime transfers
  made on or after the same date."* Read alone this omits the 30 October 2024
  trigger. The page corrects itself at lines 40, 154, 155 and 199-201, so it is
  looseness rather than error, but it is the one sentence a skim-reader lands on.

---

## Fix list, by severity

**BLOCKER (4):**
1. `farm-tax-uk-guide.md` FAQ line 25 + body line 53 — s.165 holdover is not
   limited to trading farmland; TCGA 1992 Sch 7 para 1 gives it to APR-qualifying
   agricultural property not used in a trade.
2. `agricultural-relief-for-inheritance-tax-key-benefits.md` FAQ line 21 —
   *HMRC v Atkinson* [2011] UKUT 506 (TCC) is cited backwards; HMRC won and APR
   was denied.
3. `agricultural-relief-for-inheritance-tax-key-benefits.md` line 78 — the s.118
   replacement window is 2-in-5 / 7-in-10, not "a three-year window".
4. `bpr-apr-allowance-calculator.ts` line 213 — *"Only if you live seven years,
   and even then only for gifts made before the announcement"* makes two
   alternative conditions cumulative and contradicts the next sentence.

**MINOR (10):** 1.2 (let cottages vs s.115(2)), 1.3 + C1 (s.124E claim qualifier
missing on farm-tax and the ledger row), 2.3 (s.105(1)(cc) unrated), 2.4 (RNRB
reasoning on an estate with no residence), 3.5 (s.116(2)(b) omitted), 3.6
(s.115(4) stud farms), 3.7 (IHTM24067 off-target), 3.8 (paddock "Borderline" then
relieved at 100%), 4a.1 (transferability row has no statutory cite), 4b.2
(allocation steer differs from the BPR post).

**ESCALATE, outside this QA's four surfaces but inside the linked cluster (3):**
- **C7 BLOCKER** — `agricultural-property-relief-mixed-estate-1m-cap.md` line 86
  still says the s.124D allowance is "not provided" as transferable between
  spouses. The 2026-08-21 §15.4 back-patch missed this page. Plus a
  pipeline-artefact leak ("sessions writing this content should check...") in
  live copy.
- **C8 BLOCKER** — same page, lines 39-40 and 177: anti-forestalling trigger given
  as 6 April 2026 rather than 30 October 2024, scope wrongly narrowed to BPR share
  schemes, and s.131 IHTA 1984 (fall-in-value relief) miscited as transitional
  rate logic.
- **C9 MINOR** — `iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation.md`
  lines 37-38 say a spouse-exempt first death wastes the allowance; s.124E(1)(b)
  and the calculator say the opposite, and the calculator is right.

## Statutes and sources fetched this session

`legislation.gov.uk`: IHTA 1984 ss.8D, 107, 108, 112, 113, 115, 116, 118, 124E;
TCGA 1992 s.152 and Sch 7 para 1; FA 2003 s.55 (Table B).
`gov.uk`: IHTM46023 (RNRB taper base), IHTM24067.
Upper Tribunal: *HMRC v Atkinson* [2011] UKUT 506 (TCC) decision PDF.
House positions: §1, §5, §6, §7, §9, §15.1, §15.4, §21.4, §22.1, §22.4.
