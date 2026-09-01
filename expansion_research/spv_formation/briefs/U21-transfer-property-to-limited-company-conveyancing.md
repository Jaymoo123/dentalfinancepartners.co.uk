# U21 — transfer-property-to-limited-company-conveyancing

## 1. Unit facts

- Type: NEW blog post
- Category: Incorporation & Company Structures
- Slug: `transfer-property-to-limited-company-conveyancing`
- Hub: HUB (transfer-in cluster, sits alongside U15/U16 under the `/spv-company` pillar)
- Priority: P2
- Verdict rationale (`page_map.csv` U21): "PROCESS and PROFESSIONAL-FEES page, deliberately
  NOT tax. Seam vs U15/U16: those own the tax charge and the tax how-to; this owns
  solicitor, lender consent, valuation, Land Registry, timeline. Hard rule for the writer:
  summarise SDLT/CGT in two to four sentences and link up."

## 2. Dominant query + full variant list

**Dominant query (owns the H1):** transfer property to limited company solicitors —
`questions_corpus.csv`, tagged misc/transfer-in. No standalone volume figure on the exact
phrasing; the strongest measured signal is the fee-and-process cluster below (84 impressions,
Bing, position 3.9).

| Tag | Phrasing | Volume/source |
|---|---|---|
| dominant | transfer property to limited company solicitors | questions_corpus.csv |
| dominant-variant | limited company buy to let conveyancing | questions_corpus.csv |
| dominant-variant | limited company buy to let solicitor | questions_corpus.csv |
| conversational | who does the legal work transferring property to my company | page_map.csv U21 |
| question | do i need lender consent to transfer to a limited company | page_map.csv U21 |
| technical | costs of transferring property to limited company solicitor valuation fees | 84 impressions, Bing, pos 3.9, `our_queries.csv` (row `__site__`, no landing page yet — genuine gap, not cannibalisation) |
| technical | costs of transferring property to limited company uk solicitor valuation | 34 impressions, Bing, pos 2.5, `our_queries.csv` — currently landing on `how-to-transfer-property-into-limited-company-uk` (the PROTECTED transfer-in page); this unit should capture that intent instead |
| question | how long does it take to transfer a property into a company | page_map.csv U21 |
| question | do i need a new title at land registry | page_map.csv U21 |
| question | putting a personal property into a ltd company - do you need a solicitor | 6 impressions, Bing, pos 1.0, `our_queries.csv`, landing on `how-to-transfer-property-into-limited-company-uk` — misrouted process query |
| question | what happens to the land registry if you sell your properties on trust into a ltd company | 4 impressions, 2 clicks, Bing, pos 1.0, `our_queries.csv` |
| adjacent | transfer of equity conveyancing | 90/mo, `demand_corpus.csv` (seed: transfer property to limited company) |
| adjacent | transfer of equity conveyancing quotes | 20/mo, `demand_corpus.csv` |
| adjacent | conveyancing company search | 10/mo, `demand_corpus.csv` |
| adjacent | property conveyance deed | 10/mo, `demand_corpus.csv` |
| adjacent | conveyance deed cost | 10/mo, `demand_corpus.csv` |
| adjacent | conveyance of property by deed | 10/mo, `demand_corpus.csv` |
| adjacent | reconveyance of property | 10/mo, `demand_corpus.csv` |

**Zero-volume but real (cover, do not invent extra weight for):** "who does the legal work",
"do I need a new title at Land Registry" — page_map.csv candidate variants with no measured
volume in either corpus; genuine reader questions on a process page, keep as FAQ entries
rather than H2s.

## 3. Our-data baseline

Five rows in `our_queries.csv` touch this territory, all Bing, all currently misrouted to
`how-to-transfer-property-into-limited-company-uk` (the PROTECTED tax how-to page) except the
top one which has no landing page at all:
- "costs of transferring property to limited company solicitor valuation fees" — 84
  impressions, 0 clicks, position 3.9, `__site__` (no current landing page — this is the row
  this unit is built to capture)
- "costs of transferring property to limited company uk solicitor valuation" — 34
  impressions, 0 clicks, position 2.5, landing on the tax how-to page
- "putting a personal property into a ltd company - do you need a solicitor" — 6 impressions,
  position 1.0, landing on the tax how-to page
- "what happens to the land registry if you sell your properties on trust into a ltd company"
  — 4 impressions, 2 clicks, position 1.0, landing on the tax how-to page
- one long freeform SSAS-related query (12 impressions, position 3.0) also landing on the tax
  how-to page — out of scope (pension-scheme transfer, not a standard incorporation transfer);
  do not build around it, but the general "you should use a solicitor experienced in this"
  framing it surfaces is consistent with this page's advice to always instruct a conveyancer.

**Reading:** genuine demand exists for the process/fee angle and it is currently landing on
the wrong (tax-focused) page at reasonable positions (1.0-3.9) with zero clicks — a process
page answering "who does this, what does it cost, how long" directly should convert that
existing visibility.

## 4. Competitor coverage floor

`competitor_urls.csv` returns thin coverage on this exact angle:
- mfbrokers.co.uk — `other-services/conveyancing` (general conveyancing service page, not
  incorporation-specific)
- interpolitanmoney.com — one blog post on TPMAs and conveyancing/estate transactions,
  tangential

No competitor in the corpus owns "the conveyancing process of moving a property into a
limited company" as a dedicated page. This is genuine whitespace at the process level, sitting
under two protected tax pages that already win the tax-charge searches.

## 5. Seam MUST-NOTs

**Seam 6 (`PAGE_MAP.md` §9.6, the Track-B finance-vs-tax rule):** this page owns the
CONVEYANCING PROCESS of a transfer-in — solicitor's role, lender consent, valuation, Land
Registry, timeline, who does what and when.

**It must NEVER:**
- Restate or compete with `sdlt-transfer-property-company-cost` (CONFIRMED ON DISK) — that
  page owns the SDLT charge on a connected-party transfer. Summarise SDLT in 2-4 sentences
  ("a transfer to your own company is normally taxed as if you sold to a connected party at
  market value, so SDLT is charged on the property's market value even if no cash changes
  hands — see the dedicated SDLT cost page for the full charge and worked figures") and link
  out.
- Restate or compete with `how-to-transfer-property-into-limited-company-uk` (CONFIRMED ON
  DISK) — that page owns the tax how-to (s.162 incorporation relief route, CGT mechanics).
  Summarise in 2-4 sentences and link out. Do not re-explain s.162, do not restate the CGT
  charge mechanics.
- Present valuation, lender consent or Land Registry mechanics as tax content — keep every
  H2 anchored to "who does this task and how" rather than "what does it cost in tax".
- Quote a specific solicitor's-fee or valuation-fee figure as a locked house position — fees
  are market-rate and vary by firm/lender; frame as a range with the caveat that the reader
  should get quotes, not a locked number (house_positions.md carries no fee-quantum row for
  this; do not invent one).

## 6. Facts pack (dated 2026-09-01, verified vs `docs/property/house_positions.md`)

- **This is a same-legal-owner-to-different-legal-owner transfer.** Moving a property from an
  individual's name into a limited company is legally a sale/purchase for conveyancing
  purposes, even though no cash may change hands between connected parties — a full
  conveyancing process applies (title check, contract, transfer deed, completion, Land
  Registry update), not a simplified "change of details" process.
- **Solicitor's role:** acts for the transferring party and/or the company (can be the same
  firm acting for both connected parties in many cases, subject to conflict checks); handles
  title investigation, drafts/checks the TR1 transfer form, deals with any existing mortgage
  redemption or new lender's requirements, submits the SDLT return (SDLT is payable within 14
  days of the effective date per FA 2003, s.76 filing obligation — general SDLT filing rule,
  not specific to this transaction type), and registers the change of ownership at HM Land
  Registry.
- **Lender consent:** if the property has an existing personal mortgage, the individual cannot
  simply hand it to the company — the personal lender must either release the charge (mortgage
  redeemed, funded by a new limited company buy-to-let mortgage) or, rarely, consent to a
  transfer of equity with the company taking over the liability (most residential BTL lenders
  do not offer this; expect a full remortgage into a limited-company product in almost all
  cases). Flag this as the single biggest process/timeline driver — a new limited company
  mortgage application runs in parallel with the conveyancing and usually paces the whole
  transaction.
- **Valuation:** the receiving company's lender (if any) will require an independent RICS
  valuation as part of its mortgage underwriting; even in a cash purchase (no company
  borrowing), HMRC expects the transfer to be at market value for SDLT and CGT purposes (the
  connected-party market-value rule — see the SDLT and CGT pages this unit links to), so a
  professional valuation or comparable evidence is good practice regardless of financing.
- **Land Registry:** completion triggers a new registration — HM Land Registry updates the
  proprietorship register to show the limited company (by name and company number) as the
  new registered proprietor. This is not optional and is not the same as changing "details" on
  an existing title; it is a full change of registered proprietor following the same process
  as any other sale, submitted via the solicitor using form AP1 alongside the TR1 transfer.
  **Verify at write time:** the specific Land Registry form references (AP1/TR1) and any
  current Land Registry fee scale before publishing — this pack does not carry a locked fee
  figure.
- **Timeline:** a landlord-to-own-company transfer, once mortgage finance is arranged, tends to
  run on a similar timeline to an arm's-length purchase — commonly 6-12 weeks from instruction
  to completion, driven mainly by the limited company mortgage underwriting and any existing
  personal mortgage redemption, not by the conveyancing itself (which is faster than a normal
  chain sale since there is only one property and no chain).
- **Tax summary (2-4 sentences only, then link out):** SDLT is charged on market value even
  between connected parties (surcharge rates apply as they would to any additional-dwelling
  purchase by a company — see `sdlt-transfer-property-company-cost` for the full rate table
  and worked example) and CGT may arise on the individual's disposal at market value, though
  s.162 incorporation relief can defer it for a genuine letting business under conditions that
  changed materially from 6 April 2026 (relief must now be claimed, it is no longer automatic
  — see `how-to-transfer-property-into-limited-company-uk` for the full mechanics). Do not
  restate the SDLT rate table or the s.162 claim mechanics here.

## 7. Interlink spec

Verify slugs on disk before linking (both confirmed present):
- `sdlt-transfer-property-company-cost` — CONFIRMED ON DISK. Owns the SDLT charge and
  worked cost figures; link from the tax-summary section.
- `how-to-transfer-property-into-limited-company-uk` — CONFIRMED ON DISK. Owns the tax
  how-to and s.162 mechanics; link from the tax-summary section.
- **Up-link (required):** `/spv-company` (U01 pillar; route VERIFIED ON DISK 2026-09-01 at `Property/web/src/app/spv-company/page.tsx`, so the path is `/spv-company` at the site root, NOT under `/services/` — the link target is safe to write now, the U01 rewrite does not move it) — hub navigation, transfer-in
  cluster alongside U15/U16 and the two protected tax pages above.
- **Sibling cross-link:** `transfer-property-out-of-limited-company-to-personal-name` (U24, if
  built) — flag as the reverse journey for readers who land here after already incorporating
  and are now asking about moving a property back out; link only once U24 exists on disk.

## 8. Editorial conventions (hard rules)

£nnn always (never "£nnn.00", never a bare number for currency); "per cent" in prose, % only in
tables; hyphenated compounds (transfer-in, connected-party transfer, market-value rule,
limited-company mortgage, buy-to-let); sentence-case H2s; no em-dashes anywhere in the copy; no
templated second paragraph (do not open with a rephrased restatement of the H1, the pattern
Wave 1 QA flagged across multiple posts); every FAQ answer distinct in substance, not a
rephrasing of a body section; no build or pipeline narration in the copy ("verify at build",
inline house-position codes, "as covered above"); every citation either verified against
`house_positions.md` or explicitly flagged for the factual QA pass. **Fee figures specifically:**
never state a solicitor's fee, valuation fee or Land Registry fee as a locked number (§5) —
frame as a range with a "get quotes" caveat.

## 9. Fresh outline

**H1:** Transferring a property into your limited company: the conveyancing process

**H2 skeleton (from the variant list):**
1. What actually happens when you transfer a property to your own company (it's a sale in
   law, even between connected parties — verdict-up-top framing)
2. Who does the legal work: the solicitor's role, title check, TR1, SDLT filing, Land
   Registry registration
3. Do you need lender consent? Redeeming the personal mortgage vs a limited company remortgage
   (the usual path)
4. Valuation: why you need one even in a cash transfer
5. Land Registry: registering the company as the new proprietor (not a details change)
6. How long does it take? Typical 6-12 week timeline and what paces it
7. The tax side in brief (2-4 sentences, then link to the SDLT and CGT/how-to pages)
8. Comparison table: what a solicitor handles vs what a mortgage broker/lender handles vs
   what stays with the landlord
9. Worked example: a landlord with an existing personal buy-to-let mortgage transferring one
   property into a newly formed SPV, walked through instruction to completion
10. FAQ (10-14 entries): who does the legal work transferring property to my company, do i
    need lender consent to transfer to a limited company, costs of transferring property to
    limited company solicitor valuation fees, how long does it take to transfer a property
    into a company, do i need a new title at land registry, can the same solicitor act for me
    and my company, what if my personal lender won't consent, do i need a new EPC or survey,
    what happens if the mortgage isn't ready before exchange, is this different from a normal
    house purchase conveyancing-wise, do i pay stamp duty even with no cash changing hands
    (2-4 sentence answer + link), what if the property has no mortgage at all.
