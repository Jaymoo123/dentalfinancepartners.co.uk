---
slug: bnb-rent-a-room-boundary
tier: blog
route: /blog/hospitality-vat/bnb-rent-a-room-boundary
intent: OPERATOR-PROBLEM / DIY-informational. B&B and guest-house owners working out whether their income is Rent-a-Room (tax-free up to £7,500) or trading income; assist + capture into the hotels-and-guesthouses hub.
---
# B&B and Guest House vs the Rent-a-Room Scheme: Which Applies to You?

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO/Google Ads UK, fetched 2026-07-11)

- **Primary:** "rent a room scheme bed and breakfast" / "b&b rent a room" boundary cluster (LAUNCH_CORE names "B&B rent-a-room boundary" in the 12 priority blogs; the ~550/mo hotels-and-guesthouses field per TOPICS.md).
- Secondary long-tail (autocomplete-derived, NO measured volume, do not attach figures): "is b&b income taxable", "rent a room vs trading", "guest house tax", "do I pay tax on bed and breakfast income".
- Do NOT target the hotels head (owned by the for/hotels-and-guesthouses hub); link, do not compete.

## Search-intent class + play

OPERATOR-PROBLEM crossed with DIY-informational. The owner needs to know which tax regime their letting falls under, because it changes everything (tax-free allowance vs full trading accounts). Play: BLUF answer box on the boundary rule (Rent-a-Room only where it is genuinely your residence; a full guest house is a trade), then the £7,500 / £3,750 figures, then the residence condition, then the trade test, then capture into hotels-and-guesthouses accounting for anyone over the line.

**Cannibalisation split (locked at seed):** this blog owns the boundary/eligibility intent. The for/hotels-and-guesthouses hub owns hire. Note the estate-collision flag in TOPICS.md (property/generalist have adjacent content); page-level verify against the live estate at write time is mandatory (47% cumulative dupe rate per the gap-discovery lesson).

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk** (Rent a Room scheme page): source of truth; beat by framing the B&B-vs-trade decision explicitly, which the gov.uk page only touches.
- **thehospitalityaccountants.com** (DEDICATED, covers holiday lets/guest houses): beat on the specific Rent-a-Room boundary decision.
- **AAB / Perrys / property-portfolio firms** (SECTION, hotel/accommodation pages): beat on the small-B&B-owner plain-English angle.

## Required structure

H2 skeleton:
1. The short answer: Rent-a-Room only where you live there; a full guest house is a trade (BLUF box, cited)
2. What Rent-a-Room gives you (£7,500 tax-free, or £3,750 if shared)
3. The residence condition: it must be your own home
4. When your B&B is a trade, not property income (and what changes)
5. The grey middle: a few rooms in your home vs running a guest house
6. If you are trading: the accounts and taxes that then apply (link to hotels hub)
7. Working out which side of the line you are on (capture)

FAQ candidates (no answers at seed stage):
- Can I use Rent-a-Room for a bed and breakfast?
- How much is the Rent-a-Room allowance?
- What is the Rent-a-Room allowance if two people share the income?
- Do I have to live in the property to use Rent-a-Room?
- Is guest house income taxed as a trade?
- What is the difference between Rent-a-Room and running a B&B as a trade?
- Do I still have to declare income under the Rent-a-Room threshold?
- Can I claim Rent-a-Room on a property I do not live in?

Table/chart opportunities:
- Rent-a-Room vs trading comparison table (residence needed, allowance, what you declare, accounts required, source).
- Decision flow: do you live there? are you running it as a business? → which regime.

Calculator/tool embed: none in the launch fleet for this. Do not invent one.

Internal links (launch core): for/hotels-and-guesthouses hub (capture, TOMS/occupancy/B&B framing), hospitality VAT returns & schemes service (if trading and over the VAT threshold), MTD-IT-for-sole-traders blog (sibling, if trading).

## House positions touched (docs/hospitality/house_positions.md — ONLY figures source)

- **HP 21 (Rent-a-Room boundary), figures/framings locked:** "B&B and guest-house owners letting rooms in their own home may use Rent-a-Room relief of up to **£7,500** per year, but only where it is genuinely their residence." The scheme allows up to **£7,500** of letting income tax-free (**£3,750** if shared with another person). It explicitly covers bed and breakfast and guest houses. The condition is that the owner must **live in the property**; it cannot apply to a property used solely as trading premises. **Operating a full guest house as a trade (not letting part of a home) is a trade, and trading income rules apply rather than Rent-a-Room.** Citation: https://www.gov.uk/rent-room-in-your-home/the-rent-a-room-scheme

## Hallucination danger zones

- The £7,500 and £3,750 figures are locked in HP 21; use them verbatim, do not round or invent a per-room figure. Rent-a-Room is not year-flagged in the consistency rules, but re-verify at Stage 2 per the estate fresh-data rule.
- The core nuance (consistency of the whole page): Rent-a-Room applies ONLY where it is genuinely the owner's residence; a full guest house run as a trade is trading income, NOT Rent-a-Room. Never imply any B&B can use the £7,500 allowance.
- Do not state the exact mechanics of the "alternative method" (deducting expenses vs taking the allowance) beyond what HP 21 covers; flag for HP extension if the page needs it.
- Do not blur this with Furnished Holiday Lettings or the property-income allowance; those are separate regimes not in the HP set. If the topic demands them, flag for HP extension, do not improvise.
- ESTATE-COLLISION: property and generalist sites have adjacent content (TOPICS.md flag). Verify the exact live route/title against the estate before writing to avoid a dupe.
- No em-dashes in user-facing copy.

## Stage 2 TODO

- WebFetch the Rent a Room scheme page; re-verify £7,500 / £3,750, the B&B/guest-house coverage and the residence condition are current.
- Run the mandatory page-level live-estate dedup check (property + generalist hospitality/accommodation posts) before this is written; confirm intent differentiation vs any existing estate page.
- Confirm with the conductor whether FHL / property-income-allowance context needs an HP extension or stays out of scope for launch.
