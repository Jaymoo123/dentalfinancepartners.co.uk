# U40 — property-joint-venture-spv-structure-uk

Verdict: NEW. Cluster: ownership-structures. Priority: P2.

## 1. Unit facts

- Slug: `property-joint-venture-spv-structure-uk` (verify free on disk before build; not found under `content/blog/` in current search).
- Dominant query: "spv joint venture" (no measured volume; autocomplete-blind bucket per page_map.csv).
- Tagged query variants, with data:
  - "joint venture vs spv" — no measured volume, ownership-structures bucket (questions_corpus.csv line 1376/1354).
  - "spv jv" — no measured volume (line 1391).
  - "spv joint venture agreement" — no measured volume (line 1390).
  - "how do two investors share a property company" — synthesised head from the brief's dominant_query field in page_map.csv row U40, no independent corpus hit found; treat as an editorial framing, not a measured query.
  - "jv property deal structure uk" — same status, editorial framing.
  - "what goes in a property jv shareholders agreement" — same status.
  - "profit split in a property spv" — same status.
  - "can spv issue shares" — questions_corpus.csv, ownership-structures bucket (41 questions), no measured volume. **Added at gate review**: this is the only other ownership-bucket row that lands squarely on U40's own turf (share classes per JV partner) and is not claimed by U38 or U41. Cover it inside the share-classes H2 and as an FAQ entry.
  - Related unmeasured demand-adjacent term: "spv holding company" / "spv vs holding company" / "spv vs investment holding company" / "can an spv be a holding company" / "is spv a holding company" / "what is spv holding company" (questions_corpus.csv, ownership bucket) all sit on U38 (COVERED, saturated) — do not re-answer "is an SPV a holding company" here, link out if it comes up.
  - Also in the ownership bucket but NOT this page's intent: "is a trust an spv", "spv business trust" (trust-structure intent, belongs to the trusts cluster), and the large "buy to let through limited company" / "buying property through limited company" family (that is the incorporate-or-not decision, owned by `/incorporation` per PAGE_MAP §9.3). Do not build content for either family here.

**Formulation types.** The corpus supports three cleanly, and the fourth is thin — cover as follows: **question** ("can spv issue shares"), **conversational** ("joint venture vs spv", "spv jv"), **technical** ("spv joint venture agreement", "property jv shareholders agreement content"). There is no genuine **action** formulation in the corpus for this topic (no "how to set up a JV SPV" row exists); do not invent one to fill the slot — instead let the shareholders'-agreement and exit sections carry the action intent naturally.

## 2. Our-data baseline

No GSC/Bing rows in our_queries.csv match "joint venture" or "jv" against any Property URL — this is a zero-baseline build, not a rewrite. Treat as a genuine gap fill (page_map.csv notes 7 questions_answered for U40, all unmeasured-volume, autocomplete-derived).

## 3. Competitor floor

- `propertyspv.co.uk` runs a live JV service page and JV-themed imagery/asset set (`unlock-the-secrets-of-spvs-for-profitable-property-joint-ventures`, several "Joint venture..." SVG assets) — competitor_urls.csv lines 4277, 4282, 4306, 4426, 4464, 4468. This is the only competitor with dedicated JV-property content in the corpus; treat their page as the floor to clear, not a template (it is service/sales-shaped, not an authority guide).
- No other competitor in `competitor_urls.csv` targets "SPV joint venture" as a distinct topic — most JV content elsewhere in the corpus is finance-side (mezzanine/equity) or SDLT-side, which is exactly the seam this brief exploits.

## 4. Seam MUST-NOTs

- **mezzanine-and-jv-finance** (`content/blog/mezzanine-and-jv-finance.md`) owns JV **finance**: capital stack, mezzanine vs JV equity cost/dilution/control, deed of priority, tax treatment of the finance. U40 must not re-explain how JV equity is priced or how it sits against a senior loan — link to it for the finance side, in two to three sentences, then move on.
- **property-partnership-trading-investment-jv-developer-structures-sch-15-sdlt-interaction** (`content/blog/property-partnership-trading-investment-jv-developer-structures-sch-15-sdlt-interaction.md`) owns the **SDLT Sch 15 technicals** of a JV/partnership structure (four-conditions test, three-year anti-withdrawal rule, s.162 vs Part 22 incorporation route, the worked £6m JV example). U40 must not re-derive Sch 15 mechanics; summarise in two to three sentences and link.
- **property-investment-company-structure-planning** (`content/blog/property-investment-company-structure-planning.md`) owns general share-class mechanics as part of "the five structures at a glance" and "extracting profit from a property company." U40 owns JV-specific share-class *use* (differential classes per investor, alphabet shares for unequal profit splits between JV partners) but must link to the structure-planning page rather than re-teach what an ordinary/alphabet share class is from scratch.
- **alphabet-shares-property-spv-dividend-splitting-spouse-children** (part of U41, COVERED) owns the mechanics of alphabet share classes generally (spouse/children framing). U40 borrows the *concept* for JV partners but does not restate the statutory mechanics; link.
- U40's own turf, not held anywhere else on disk: the JV SPV as a **structure decision** — how two or more unconnected investors share ownership and control of a single-purpose property company (share classes per partner, deadlock resolution, shareholders' agreement content, exit/buyout mechanics, who is a PSC on a JV cap table, drag-along/tag-along, reserved matters requiring unanimous consent).

## 5. Dated facts pack (verified vs house_positions.md)

- PSC disclosure: a JV SPV with multiple investors still runs the standard PSC test (25%+ shares or voting rights, or the right to appoint/remove a majority of directors). Where no single investor crosses 25%, the company may have no registrable PSC and must state so — this is a genuinely under-covered JV-specific wrinkle; state it plainly, do not imply every JV automatically has a PSC. (Not a numeric house-position figure; confirm against Companies House PSC guidance at write time, standard statutory test, no house_positions.md section directly on point — flag if a specific PSC threshold citation is added.)
- Dividend rates 2026/27 if the brief touches profit-split-via-dividend: £500 allowance, 10.75% basic, 35.75% higher, 39.35% additional (house_positions.md §21.9, confirmed gov.uk 2026-05-23; do not attribute the 39.35% additional rate to FA 2026, it predates it per FA 2022).
- s.455 CTA 2010 close-company loan charge, if a JV partner takes a director's loan: 35.75% on amounts made on or after 6 April 2026, 33.75% on loans made before that date (house_positions.md §21.1, §21.9). Only include if the outline needs a DLA-in-a-JV aside; do not force it in.
- SDLT: any transfer of a property into the JV SPV follows the standard connected-party/market-value rules already owned by U15/U16 (transfer-in cluster). Do not restate SDLT rates here beyond a one-line pointer.
- No ATED, NRCGT or DTA content belongs on this page unless a JV partner is explicitly non-resident, in which case a two-sentence pointer to U44/U43 is enough.

## 6. Interlink spec (verified on disk)

- **Mandatory up-link**: `/spv-company` (U01 pillar). **VERIFIED ON DISK 2026-09-01**: the route exists at `Property/web/src/app/spv-company/page.tsx`, so the live path is `/spv-company` at the site root. It is **NOT** under `/services/` — do not write `/services/spv-company`. This open note is closed; no further verification needed.
- `content/blog/mezzanine-and-jv-finance.md` (slug `mezzanine-and-jv-finance`) — JV finance.
- `content/blog/property-partnership-trading-investment-jv-developer-structures-sch-15-sdlt-interaction.md` (slug `property-partnership-trading-investment-jv-developer-structures-sch-15-sdlt-interaction`) — SDLT Sch 15.
- `content/blog/property-investment-company-structure-planning.md` (slug `property-investment-company-structure-planning`) — general structure comparison and share-class mechanics.
- U41 alphabet-shares page — **slug CONFIRMED ON DISK 2026-09-01** at `content/blog/alphabet-shares-property-spv-dividend-splitting-spouse-children.md`, slug `alphabet-shares-property-spv-dividend-splitting-spouse-children`. No further verification needed.
- U16 `how-to-transfer-property-into-limited-company-uk` — if the JV SPV is receiving a property transfer from an existing owner.

## 7. Editorial conventions (hard rules)

£nnn always (never "£nnn.00" or bare numbers for currency); "per cent" in prose, % only in tables; hyphenated compounds (joint-venture, shareholders' agreement is not hyphenated, deadlock-resolution); sentence-case H2s; no em-dashes; no templated second paragraph (do not open with a rephrased H1 restatement pattern seen across Wave 1); each FAQ answer must be distinct in substance, not a rephrasing of body text; no build/pipeline narration in the copy; every citation verified against house_positions.md or flagged for the QA pass if not locked there.

## 8. Outline

1. **H1**: Property joint venture SPV structure: sharing ownership and control (UK)
2. Sentence-case H2s, 8-10 body sections plus FAQ:
   - What a JV property SPV is, and when two investors choose it over a partnership or LLP (2-3 sentences pointing to structure-planning for the wider comparison)
   - Share classes for JV partners: matching ownership to control and profit split (concept only, link to alphabet-shares page and structure-planning for mechanics)
   - The shareholders' agreement: what a property JV deal needs beyond the model articles (reserved matters, unanimous-consent list, funding calls, non-compete)
   - Deadlock: what it is in a two-investor company and how a shareholders' agreement resolves it (Russian roulette / shotgun clause, deadlock director, mediation clause — pick the mechanisms actually used in UK property JV precedent, verify against a solicitor-facing source if citing a named clause)
   - PSC and control: when a JV SPV has a registrable PSC and when it does not (25% test, joint-arrangement PSC rule where partners act together)
   - Exit from a JV SPV: buy-sell provisions, tag-along/drag-along, valuation mechanism on exit
   - Funding the JV: brief link-out to mezzanine-and-jv-finance for the capital-stack side (2-3 sentences, no re-explanation)
   - Tax and SDLT touchpoints: brief link-out to the Sch 15 partnership page and to U15/U16 for transfer-in (2-3 sentences each, no re-derivation)
   - Common mistakes in JV SPV structuring (no written agreement, unequal shares with equal expectations, no deadlock mechanism, ignoring PSC obligations)
3. **FAQ, 10-14 questions**, each distinct, drawing on the tagged query variants in §1 plus natural follow-ons (e.g. "Can a JV SPV have unequal shareholdings?", "What happens if one JV partner wants to sell and the other does not?", "Does a property JV need a shareholders' agreement if it's just two friends?", "Is an SPV JV the same as a partnership for tax purposes?" — answer no, and link to the Sch 15 page for why).
4. Mandatory up-link to `/spv-company` from the intro or a "part of our SPV series" closing block.
