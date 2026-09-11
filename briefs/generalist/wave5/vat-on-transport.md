---
slug: vat-on-transport
tier: blog
category: "VAT and Making Tax Digital"
route: /blog/vat-and-making-tax-digital/vat-on-transport
intent: DIY-INFORMATIONAL. A coach, minibus, taxi or transport operator asking whether fares carry VAT. The answer turns on a seat count, and almost nobody knows the rule is a seat count.
---
# Blog: VAT on transport, the 10-passenger rule that decides the rate

> Wave-5 high-street mechanic asset. PILLAR, 3,500-4,500 body words. Faceless. Raw-HTML body, no em-dashes, first prose block a plain sentence of 30+ characters.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

This is binding. The phrasing must appear naturally in the page, in a heading, in body prose or in an FAQ question, in the words people typed. **It may not be split out into another page.**

- vat on transport

Head query: "vat on transport". Volume 60/mo. Mechanic: `passenger-transport`.

## Asset type + play

The page's whole value is one counter-intuitive fact: **passenger transport is zero-rated, not exempt, and the deciding test is the size of the vehicle, not the kind of journey.** Schedule 8 Group 8 item 4(a) zero-rates transport of passengers in any vehicle, ship or aircraft designed or adapted to carry **not less than 10 passengers**. Under 10 and the fare is standard-rated.

Two consequences worth the page on their own. First, it means a taxi fare and a coach fare on the same route carry different VAT. Second, because this is zero-rating rather than exemption, a coach operator recovers input tax on vehicles, fuel and maintenance and is typically in a repayment position. That inverts the instinct to avoid registering.

The test is applied to **the vehicle actually used at the time of the supply**, not to the operator's fleet in general, which is the operational trap for a mixed fleet.

## Dedup evidence

- **Own site, `vat-on-taxi-fares-uk.md`**: one vehicle class, and dominated by the July 2025 Supreme Court private hire ruling. This page is the passenger-transport zero rate across rail, coach, air, ferry and minibus, and it owns the 10-passenger rule. **This page must not re-argue the private hire ruling**; give it one sentence and link across. Bidirectional link required.
- **Own site, `accountant-for-taxi-drivers-uk.md`** and **`self-employed-taxi-driver-tax-self-assessment.md`**: trade and self-assessment pages, no VAT rate content at depth. Link once.
- **Own site, `accountant-for-haulage-and-transport-companies.md`**: **freight**, not passengers. Different regime entirely. Say so in one sentence so the reader is not misrouted, and link.
- Parent: `zero-rated-vat.md`.

## Required structure (H2 skeleton)

Open with a 40-60 word BLUF in plain prose: passenger transport is zero-rated when the vehicle, ship or aircraft is designed or adapted to carry at least 10 passengers. Buses, coaches, trains and larger minibuses carry no VAT on the fare. Taxis, private hire cars and minicabs fall under the count and are standard-rated at 20%.

1. The 40-60 word answer (BLUF)
2. The rule: VATA 1994 Schedule 8 Group 8, item 4(a), "in any vehicle, ship or aircraft designed or adapted to carry not less than 10 passengers", quoted verbatim
3. Zero-rated, not exempt, and why that distinction is worth money here. Link `zero-rated-vat.md`
4. **Boundary table: zero-rated fares against standard-rated fares** (rows below)
5. The vehicle actually used: the test applies supply by supply, not fleet-wide, so a mixed operator has both rates in one week
6. Wheelchair-accessible vehicles: relief without meeting the count, on HMRC's terms (see HP GAP 1 before writing this)
7. Input tax and the repayment position: why a zero-rated operator registers voluntarily. Link `when-to-register-for-vat-zero-rated-goods.md`
8. What sits outside this rule: freight and haulage (different regime, link out), and other charges an operator makes alongside the fare (see HP GAP 2)
9. Worked examples (two, below)
10. What people get wrong
11. FAQ block, 10 to 14 FAQs
12. Links out

**Boundary table (MANDATORY). Two columns: "Zero-rated (10 or more passengers)" against "Standard-rated at 20% (under 10)".** Minimum four trade-anchored row pairs:

| Zero-rated: designed or adapted for 10 or more passengers | Standard-rated at 20%: under the count |
|---|---|
| A coach operator's 52-seat school trip | A private hire operator's saloon car on the same route |
| A minibus firm's 16-seat airport transfer | The same firm's 8-seat people carrier on the identical booking |
| A rail operator's ticket | A licensed taxi's metered fare |
| A ferry operator's foot passenger crossing | A chauffeur company's executive car hire |
| A scheduled bus service in a market town | A minicab taking the same passengers home after the last bus |

Under the table, in one sentence: the operator's licence, the route and the fare all make no difference. **The question is how many passengers the vehicle that did the job was designed or adapted to carry.**

**Worked examples (two, named to a trade):**
- A minibus operator runs the same £400 airport job twice in a week, once in a 16-seater and once in an 8-seater because the big vehicle was off the road. The first fare is zero-rated. The second is standard-rated, so £66.67 of the £400 is VAT if the price is VAT-inclusive (state the assumption). Same customer, same journey, different answer, and this is the trap.
- A coach company turning over £300,000, all zero-rated. Output VAT is nil, but input VAT on coaches, diesel, tyres and depot costs is recoverable, so registration puts the business in a repayment position. Contrast with a taxi driver under the threshold, for whom registering would add 20% to every fare.

**What people get wrong:**
- Believing passenger transport is exempt. It is zero-rated, and the difference is the input tax.
- Applying the seat count to the fleet rather than to the vehicle that did the journey.
- Assuming a taxi is zero-rated because a bus is.
- Assuming the driver's seat is excluded from the count (see HP GAP 1, the page must not assert either way beyond what is locked).
- A zero-rated operator staying unregistered and leaving recoverable input tax on the table.
- Confusing passenger transport with freight. Haulage is a different regime.

## Figures mapped to HP

Traces to `docs/generalist/STAGE_1B_HP_LOCK_DRAFTS_A.md` unless noted.

- **Schedule 8 Group 8, item 4(a): transport of passengers "in any vehicle, ship or aircraft designed or adapted to carry not less than 10 passengers", zero-rated** - Anchor 4f, **LOCKED for the statutory rule and its location**, corroborated by the Schedule 8 index fetch. Quotable.
- **The test applies to the vehicle actually used at the time of the supply, not to the fleet** - Anchor 4f. **See HP GAP 1: this sits in the practice gloss, hedge it.**
- **Consequence: taxis, private hire cars and minicabs (fewer than 10 seats) standard-rated; buses, coaches, trains and larger minibuses zero-rated** - Anchor 4f, LOCKED.
- **Zero-rated means input tax IS recoverable and the operator is in a repayment position, the opposite of the exempt pages** - Anchor 4f, LOCKED, and stated there as the page's payoff.
- **Schedule 8 is the zero-rating schedule; exempt against zero-rated framing** - Anchors 1, 3a and 4c, LOCKED.
- **Zero-rated producer registration inversion, Sch 1 para 14(1)** - HP 21.9.5 (the mechanic transfers).
- **Taxi fares standard-rated; the £90,000 threshold** - HP 18 statutory hooks and HP 7.
- **20% standard rate, £88,000 deregistration** - HP 7.

**HP GAPS (do NOT invent, omit or link gov.uk):**
1. **VAT Notice 744A was NOT fetched.** The practice gloss on the rule is UNCONFIRMED at paragraph level. Specifically: **whether the 10 counts seats including the driver and crew**, and **the wheelchair-vehicle relief following Revenue and Customs Brief 3 (2019)**. Both are described in Anchor 4f as unverified. **State the statutory 10-passenger rule as law. For the seat-counting detail and the wheelchair-vehicle position, describe them qualitatively as HMRC's published practice and link Notice 744A. Do not quote, do not give a paragraph number, do not state a firm seat-counting arithmetic.** If the writer cannot hedge cleanly, cut section 6 and keep the count at statute level.
2. **No locked position on ancillary charges** (booking fees, luggage charges, cancellation charges, on-board catering, tour packages, the Tour Operators Margin Scheme). **Omit all of them.** TOMS in particular is unverified and must not appear.
3. **No locked position on international passenger transport or place of supply.** Omit.
4. **No locked position on the July 2025 Supreme Court private hire ruling.** It lives on `vat-on-taxi-fares-uk.md`. **One neutral sentence and a link. Do not restate its reasoning or its consequences.**
5. **Freight and haulage VAT is not authored here.** One sentence that it is a different regime, plus a link to `accountant-for-haulage-and-transport-companies.md`.
6. **Do not name Schedule 8 Group 14** (unverified name) and do not publish a numbered Schedule 8 group list.

## Internal links (all VERIFIED to exist in `generalist/web/content/blog/`)

**Out to live pages:** `vat-on-taxi-fares-uk.md` (bidirectional, the vehicle-class companion), `accountant-for-taxi-drivers-uk.md`, `self-employed-taxi-driver-tax-self-assessment.md`, `accountant-for-haulage-and-transport-companies.md` (the freight fence), `when-to-register-for-vat-zero-rated-goods.md`, `vat-threshold-2025-26.md`.
**Out to wave-5 siblings:** `zero-rated-vat.md` (parent), `vat-exemption.md`.
**In:** `zero-rated-vat.md` links here from its transport row.

## FAQ candidates (10 to 14, phrased as typed)

Is there VAT on transport? · Is public transport VAT exempt or zero rated? · Is there VAT on bus fares? · Is there VAT on train tickets? · Is there VAT on a taxi fare? · Why is a coach zero rated but a minicab standard rated? · How many seats does a minibus need for zero rating? · Does the driver's seat count toward the 10? (hedge, HP GAP 1) · Is a wheelchair accessible vehicle treated differently? (hedge, HP GAP 1) · Can a coach operator reclaim VAT on fuel and vehicles? · Should a transport operator register for VAT below the £90,000 threshold? · Do zero rated fares count toward the VAT threshold? · Is there VAT on freight or haulage? (one sentence, link) · What VAT applies if I use a smaller vehicle for a booking?

## Hallucination danger zones

- Never say passenger transport is exempt. It is zero-rated.
- Never state a firm seat-counting arithmetic including or excluding the driver (HP GAP 1).
- Never assert the wheelchair-vehicle relief conditions.
- Never mention TOMS or ancillary charges.
- Never restate the private hire ruling; link `vat-on-taxi-fares-uk.md`.
- Never name Schedule 8 Group 14.
- No fee figures, no named operators.
