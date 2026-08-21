# Legacy back-patches, rural/landed-estates batch

Coverage note. One line per fix: finding ID, old text, new text.
Ground truth: `docs/property/house_positions.md` §15.4 as patched 2026-08-21 (s.124E claim-based
spousal transferability verified at statute; s.124E(4)(a) spouse-exempt first death leaves the
allowance 100% unused and transferable by claim; anti-forestalling mechanical, no motive test).
Statutes re-verified at legislation.gov.uk this pass: IHTA 1984 s.124E (headings + ss.(1),(4),(5),(6));
IHTA 1984 s.131 (heading "The relief", ss.(1)-(2) = fall-in-value relief, not transitional-rate logic).

## 2026-08-21 fix round, monitored windows expired 2026-08-21

### File 1: `Property/web/content/blog/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation.md`

| Finding | Loc | Old | New |
|---|---|---|---|
| F4-B1 / C9 | FAQ "Does the £2.5m allowance refresh between spouses?" | "A spouse leaving qualifying property entirely to the survivor under the s.18 spouse exemption wastes the first-death allowance, which is recoverable only via a deed of variation within 2 years of first death (see Wave 4 C5)." | "A spouse leaving qualifying property entirely to the survivor under the s.18 spouse exemption does not waste the first-death allowance: a spouse-exempt transfer is not a chargeable transfer, so under s.124E(4)(a) none of the first allowance is treated as used and the whole of it is available for the survivor's executors to claim." Deed-of-variation route deleted. |
| F4-B2 | same FAQ | "has £5m of total allowance in aggregate, but only by structuring ownership so that each spouse's estate genuinely holds £2.5m of qualifying property" | "can reach £5m of total allowance across the two deaths. There are two routes to that figure. Either each estate holds qualifying property of its own, or the survivor's executors claim whatever the first-to-die spouse left unused under IHTA 1984 s.124E" |
| F4-B2 (entangled) | same FAQ, closing | "Couples with significant BPR or APR exposure should still review ownership pre-6-April-2026, because an estate can only set qualifying property against the allowance it actually holds." | "Reviewing ownership before 6 April 2026 still matters where qualifying property is destined for children or other non-spouse beneficiaries on the first death, because that estate can only set qualifying property against the allowance it actually holds." |
| F4-B3 | Aldridge FAQ, pre-cap | "After £325k NRB plus £175k RNRB plus transferred allowances (assume single estate not couple): £1,600k less £500k = £1,100k chargeable at 40% = £440k IHT" | "After the £325k NRB (the RNRB is nil here: on a £3.5m estate it is fully tapered away, the extinguishment point being £2.35m for a single estate): £1,600k less £325k = £1,275k chargeable at 40% = £510k IHT" (also closes F4-M2: "plus transferred allowances" deleted) |
| F4-B3 | Aldridge FAQ, post-cap | "After £500k of NRB plus RNRB: £1,250k at 40% = £500k IHT. Cap impact: £500k less £440k = £60k" | "After the same £325k NRB, with no RNRB: £1,425k at 40% = £570k IHT. Cap impact: £570k less £510k = £60k" |
| F4-B3 | body, pre-cap bullets | "NRB £325,000 plus RNRB £175,000 (single estate, simplified): £500,000." / "Net chargeable: £1,100,000 at 40% = £440,000 IHT." | "NRB £325,000. RNRB nil: the residence nil-rate band is withdrawn at £1 for every £2 of net estate above £2,000,000 and is fully extinguished at £2,350,000 for a single estate, and the taper runs on the estate before reliefs, so a £3,500,000 estate gets none of it." / "Net chargeable: £1,600,000 less £325,000 = £1,275,000 at 40% = £510,000 IHT." |
| F4-B3 | body, post-cap bullets | "NRB £325,000 plus RNRB £175,000: £500,000." / "Net chargeable: £1,250,000 at 40% = £500,000 IHT." | "NRB £325,000. RNRB nil, for the same taper reason." / "Net chargeable: £1,750,000 less £325,000 = £1,425,000 at 40% = £570,000 IHT." |
| F4-B3 (downstream) | body, cap-impact para | "Cap impact: £500,000 minus £440,000 = £60,000" | "Cap impact: £570,000 minus £510,000 = £60,000" (delta unchanged, as the QA predicted) |
| F4-B3 (downstream) | body, cap-impact para | "the cap adds 14% to the IHT bill" | "the cap adds around 12% to the IHT bill" (60,000 / 510,000 = 11.8%) |
| F4-M1 | Planning responses, Tier 1 / Tier 2 bullet | "restructuring ownership across spouses to use both £2.5m s.124D allowances;" | "restructuring ownership across spouses to use both £2.5m s.124D allowances, or, where the qualifying property passes to the survivor instead, claiming the first-death allowance under IHTA 1984 s.124E;" |
| quantum (line ~148) | trust anti-fragmentation para | "Trusts that were created to multiply the £1m allowance across the same settlor" | "Trusts that were created to multiply the £2.5m allowance across the same settlor" |

**Aldridge re-derivation (arithmetic re-derived before writing):**
pre-cap chargeable £1,600,000 − NRB £325,000 = £1,275,000 x 40% = **£510,000**;
post-cap chargeable £1,750,000 − NRB £325,000 = £1,425,000 x 40% = **£570,000**;
cap impact £570,000 − £510,000 = **£60,000** (unchanged).
RNRB = £0: taper withdraws £1 per £2 of net estate above £2,000,000, fully extinguished at
£2,350,000 single, and the taper base is the estate before reliefs, so a £3.5m estate gets none.
The £1m-headline comparison is unaffected: pool £1,600,000 − £1,000,000 = £600,000 excess
x 50% x 40% = £120,000, plus £60,000 AIM = £180,000.

### File 2: `Property/web/content/blog/agricultural-property-relief-mixed-estate-1m-cap.md`

| Finding | Loc | Old | New |
|---|---|---|---|
| C7 | "The £2.5m combined cap from 6 April 2026" (line ~86) | "The cap is per individual; transferable cap between spouses on second death is not provided by the announced reform package (a point still being clarified in technical consultations; sessions writing this content should check the most-recent legislation.gov.uk text and gov.uk technical note for any transitional or transferable-cap provisions)." | "The cap is per individual, but an allowance left unused on a first death is transferable to the surviving spouse or civil partner. Under IHTA 1984 s.124E the survivor's executors can claim the unused percentage of the first-to-die spouse's allowance, in the same shape as the transferable nil-rate band, which takes a couple to as much as £5,000,000 of combined allowance across the two deaths. It has to be claimed rather than applying by itself, and it is worth only whatever the first estate actually left unused." Pipeline leak deleted in the same edit; page now carries the £5m couples figure it previously lacked. |
| C8 | FAQ "Can lifetime gifting still work for farming families ahead of April 2026?" (line ~40) | "Yes, for transfers completed before 6 April 2026 the existing 100% APR rate applies regardless of value... The transitional position protects pre-6-April-2026 PETs even if the donor dies within 7 years afterwards... Anti-forestalling provisions in the Autumn Budget 2024 reform package were largely directed at BPR-relevant share schemes rather than direct land transfers, but the gov.uk technical note carries the authoritative answer; sessions advising on a pre-April-2026 transfer should confirm against the most-recent published guidance." | "Yes, but the anti-forestalling rule narrows the window, and the date that matters is 30 October 2024 rather than 6 April 2026. A lifetime transfer of qualifying property made on or after 30 October 2024 is relieved under the post-cap rules if the donor dies on or after 6 April 2026 and within 7 years of the gift. The test is mechanical, with no motive limb, and it reaches direct transfers of agricultural land exactly as it reaches transfers of BPR-qualifying shares..." Scope-narrowing to "BPR share schemes" deleted; second pipeline leak deleted. |
| C8 | "Pre-April-2026 planning windows", lifetime-gifts bullet (line ~177) | "Gifts before 6 April 2026 of APR-qualifying or BPR-qualifying property lock in the 100% relief... the failed-PET value is still relieved at 100% under the pre-April-2026 rates (s.131 IHTA 1984 transitional logic)." | "A gift... made before 30 October 2024 keeps the pre-cap 100% relief whenever the donor dies. A gift made on or after that date does not: the anti-forestalling rule computes the relief under the £2,500,000 cap where the donor dies on or after 6 April 2026 and within 7 years of the gift... the failed-PET value is then relieved under the post-cap rules rather than at the old unlimited 100% rate." **s.131 cite dropped**, not re-pointed: s.131 verified at legislation.gov.uk as fall-in-value relief ("The relief", ss.(1)-(2), claim-based recalculation on a fall in market value between transfer and death or qualifying sale), with no bearing on relief rates. |
| C8 (entangled) | FAQ "What should mixed-estate landlords do between now and April 2026?" (line ~48) | "(2) Consider lifetime gifts of qualifying property before 6 April 2026 to lock in the 100% relief on the gifted value, subject to the 7-year clock and the GROB rules (gift must be without reservation of benefit)." | "(2) Consider lifetime gifts of qualifying property, bearing in mind that the anti-forestalling rule applies the £2.5m cap to any gift made on or after 30 October 2024 where the donor dies on or after 6 April 2026 and within 7 years, so the outcome turns on surviving the 7-year clock rather than on beating the commencement date, and the gift must be without reservation of benefit to clear the GROB rules." |

### Self-check

- Em-dashes in either file: **0** (both files, whole-file count).
- "wastes the allowance" / "not transferable" / "fixed to their own estate" phrasing: **none surviving**.
  The only residual match is the corrected negation on file 1 ("does not waste the first-death allowance").
- Anti-forestalling trigger: file 1 was already correct throughout (30 Oct 2024 + death on/after
  6 Apr 2026 + within 7 years, 5 places); file 2 now correct in all 3 places (FAQ line ~40,
  FAQ line ~48, body line ~177).
- Arithmetic re-derived before writing; no residual £440k / £500k / £175k RNRB figures on file 1's
  Aldridge example.
