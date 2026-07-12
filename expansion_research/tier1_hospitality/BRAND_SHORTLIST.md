# R4 Brand/Domain Shortlist — Hospitality (Tier-1)

Date: 2026-07-12. Checks: `r4_domain_check.py` (Nominet RDAP for .co.uk, rdap.org for .com; sanity: propertytaxpartners.co.uk returned RDAP 200 before trusting 404s). Collision checks via web search same day. **Nothing locked — owner picks and registers (G1 gate).**

## Landscape note (collision context)

- The "hospitality accountants" namespace is dense but built around own-brand generalists with sector pages (Rouse Partners, Xeinadin, Fusion, Heighten, Allenby, Alexander & Co, Apex) — no incumbent owns a "Hospitality <X> Partners"-shaped name.
- **HaysMac** (haysmac.com) is the large established hospitality/leisure specialist; **Paperchase** (paperchase.ac) is the dominant outsourced restaurant/hotel accounting brand — stay clearly distinct from both.
- **hospitality.accountants** exists as a live exact-niche domain — a naming-adjacency signal, not a name collision.
- **Viewpoint Partners** (viewpointpartners.co.uk) brands itself "Hospitality Accountants" with "Partners" in the name — reason to lead with a fully distinct first word, which all shortlisted names do.
- **licensedtradeaccountants.co.uk** is already registered (RDAP 200) — dropped; also a warning that the licensed-trade namespace has prior claims (two dissolved "Licensed Trade Associates" companies at Companies House).

## Shortlist (ranked)

### 1. Hospitality Finance Partners — hospitalityfinancepartners.co.uk
- **Rationale:** Exact house pattern (`Dental Finance Partners`), covers the whole trade family (pubs, restaurants, hotels, cafes, caterers) in one word, matching the /for/* sub-trade hub architecture. Trustworthy, not salesy; the head keyword "hospitality accountants" (390+390/mo) sits naturally under it.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:24Z. **.com:** 404 (available).
- **Collision check:** search `"Hospitality Finance Partners" UK accountant` — no firm of that name; results are generalist sector pages (QX Global, Rouse Partners, Paperchase, 123Financials).
- **storagePrefix:** `hfp` (free vs ptp/dfp/ma/afl/hd/aff/cfp/bfp/tfp/ctp/cfs/ttp/npf).
- **Colour direction:** terracotta/copper + warm neutral (stone/cream) — hospitality-warm, unused across the estate's existing primaries.

### 2. Hospitality Tax Partners — hospitalitytaxpartners.co.uk
- **Rationale:** Mirrors `Property Tax Partners` exactly. "Tax" is the differentiator in a field led by accounting/bookkeeping generalists — tronc, tips compliance, food-VAT edge cases and TOMS are the underserved buyer angles (CPC £16-50 proves buyer money).
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:25Z. **.com:** 404 (available).
- **Collision check:** search `"Hospitality Tax Partners" UK accountant` — no firm of that name; nearest results are Xeinadin's "Hospitality Tax Advisor" sector page and Rouse Partners.
- **storagePrefix:** `htp`.
- **Colour direction:** deep navy + brass accent.

### 3. Hospitality Tax Specialists — hospitalitytaxspecialists.co.uk
- **Rationale:** House `<Niche> Tax Specialists` pattern; avoids "Partners" entirely (distance from Viewpoint Partners / Rouse Partners). Plainly descriptive, slightly weaker brand memorability than 1-2.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:25Z. **.com:** 404 (available).
- **Collision check:** search `"Hospitality Tax Specialists" UK firm` — no firm of that name; the phrase appears only generically (Tax Qube, Apex, Alexander & Co sector pages).
- **storagePrefix:** `hsp`.
- **Colour direction:** olive + off-white.

### 4. Licensed Trade Tax Partners — licensedtradetaxpartners.co.uk
- **Rationale:** Strongest sub-trade legibility for the pub/bar cluster (wet/dry split, draught relief, MGD, AWRS). Weaker as an umbrella: "licensed trade" excludes cafes/takeaways in the reader's mind, fighting the /for/* architecture.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:25Z. **.com:** 404 (available).
- **Collision check:** search `"Licensed Trade Tax Partners" UK` — no firm of that name; Companies House shows two dissolved "Licensed Trade Associates" companies (2010, 2017) and an unrelated active "Tax Partners Limited".
- **storagePrefix:** `pubx`.
- **Colour direction:** dark chestnut + parchment.

### 5. Restaurant Tax Partners — restauranttaxpartners.co.uk
- **Rationale:** Targets the biggest single sub-trade head (680/mo restaurants cluster) but narrows the brand to one sub-trade — same umbrella problem as #4, more acute. Kept for the scenario where the owner prefers a restaurant-first wedge.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:37Z (clean re-run after first-pass RDAP errors). **.com:** 404 (available).
- **Collision check:** search `"Restaurant Tax Partners" UK accountant` — no firm of that name; results are restaurant-accountant sector pages (Rouse Partners, Viewpoint Partners, Fusion, AccounTax Zone).
- **storagePrefix:** `inn`.
- **Colour direction:** aubergine-brown + sand.

## Recommendation

**Hospitality Finance Partners** (fallback: Hospitality Tax Partners if the owner wants the tax-led wedge and exact `Property Tax Partners` symmetry).

## Rejected

| Name | Reason |
|---|---|
| Licensed Trade Accountants | .co.uk registered (RDAP 200) |
| Hospitality Finance Specialists / Catering Tax Partners / Hospitality Accounts Partners | Available but weaker phrasing or narrower umbrella; kept as reserves in r4 script output |
| Licensed Trade Finance Partners | Available; redundant with #4, weaker keyword fit |
| Inn and Table Finance | Available but boutique/lifestyle register, off the house pattern and weak for SEO legibility |

## RDAP notes

- Nominet RDAP rate-limits bursts: 4 of 12 first-pass calls failed (WinError 10054 / TLS handshake timeout); re-runs with 3-6s spacing returned clean codes and were merged into `r4_results.json`. Script has DNS NXDOMAIN fallback but treat RDAP as authoritative.
