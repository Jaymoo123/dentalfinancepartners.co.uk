# R4 Brand/Domain Shortlist — Crypto investors & traders (Tier 1)

Date: 2026-07-12. Checks: `r4_domain_check.py` (Nominet RDAP for .co.uk, rdap.org for .com; sanity: propertytaxpartners.co.uk returned RDAP 200 before trusting 404s). Collision checks via web search same day. **Nothing locked — owner picks and registers (G1 gate).**

## Landscape note (collision context)

- The "crypto tax" namespace is the most crowded the estate has entered: 22 dedicated rival brands contest the head term (R3 SERP evidence), plus software incumbents **Koinly, Recap, TokenTax, CoinLedger, Blockpit** — any name echoing a software brand is out.
- **TokenTax (tokentax.co)** is a major crypto tax software + filing firm serving UK users — killed "Token Tax Partners" outright.
- **CoinTax** appears as an existing UK Chartered Certified crypto accounting firm in search results — killed "Coin Tax Partners" on proximity.
- **"Digital Asset Finance"** exists as a UK LinkedIn company, and "asset finance" reads as lending, not tax — downgrades that name.
- Established firms/desks to stay distinct from: Andersen LLP, MyCryptoTax, Knightbridge Tax, Myna L2, BKL, CryptoCountancy, KoinKeepers, MJ Kane, Lanop, Alexander & Co, plus Big-firm desks (BDO, Crowe, Saffery, Grant Thornton).
- "Digital asset" / "cryptoasset" is HMRC's own vocabulary (CRYPTO manual, Cryptoasset Disclosure Facility) — it sidesteps the consumer "crypto tax" brand pile-up while staying persona-legible.

## Shortlist (ranked)

### 1. Digital Asset Tax Partners — digitalassettaxpartners.co.uk
- **Rationale:** Exact house pattern (`Property Tax Partners`), professional not salesy, and steps out of the crowded consumer "crypto..." namespace using HMRC's own term. Reads senior enough for the flagship HMRC-disclosure lane.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:08Z. **.com:** 404 (available).
- **Collision check:** search `"Digital Asset Tax Partners" UK accountant` — no firm of that name; nearest namespace neighbours are big-firm digital-asset desks (Andersen, Saffery, Grant Thornton) and an unrelated "Digital Tax Accountants Limited" at Companies House.
- **storagePrefix:** `datp` (free vs ptp/dfp/ma/afl/hd/aff/cfp/bfp/tfp/ctp/cfs/ttp/npf).
- **Colour direction:** midnight navy + neon lime/citrus accent — signals fintech-adjacent competence without meme-coin styling; unused by the estate.

### 2. Cryptoasset Tax Partners — cryptoassettaxpartners.co.uk
- **Rationale:** Most niche-legible of the available set; "cryptoasset" is the statutory/HMRC word, which differentiates from the "crypto tax" software brands while keeping the keyword.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:29:34Z. **.com:** 404 (available).
- **Collision check:** search `"Cryptoasset Tax Partners" UK crypto tax` — no firm of that name; results are guides (Koinly, Blockpit, LITRG) and firms with different names (Knightbridge Tax, Rouse Partners). Recap's blog addresses "UK tax partners" generically, not as a brand.
- **Risk:** still lives inside the crowded crypto-tax SERP namespace; slightly awkward to say aloud.
- **storagePrefix:** `cytx`.
- **Colour direction:** deep charcoal + amber signal accent.

### 3. Digital Asset Tax Specialists — digitalassettaxspecialists.co.uk
- **Rationale:** House pattern (`... Tax Specialists`), plainly descriptive, avoids "Partners" entirely for maximum distance from partner-styled incumbents.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:29:46Z. **.com:** 404 (available).
- **Collision check:** search `"Digital Asset Tax Specialists" UK firm` — no firm of that name; phrase appears only descriptively on incumbent service pages (Crowe, MJ Kane, BDO). Long at 26 characters.
- **storagePrefix:** `dax`.
- **Colour direction:** ink blue + warm sand.

### 4. Cryptoasset Accountants — cryptoassetaccountants.co.uk
- **Rationale:** Shortest, most searchable; reads like the category. Weaker as a brand: generic, and "Crypto Accountants" (cryptoaccountants.live, plus a UK LinkedIn company of that name) is one word away.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:30:23Z. **.com:** 404 (available).
- **Collision check:** search `"Cryptoasset Accountants" UK firm` — no firm of that exact name, but "Crypto Accountants" exists as a live UK brand; proximity risk noted before locking.
- **storagePrefix:** `cxtp`.
- **Colour direction:** graphite + electric cyan.

### 5. Digital Asset Finance Partners — digitalassetfinancepartners.co.uk
- **Rationale:** Mirrors `Dental Finance Partners` exactly; broadest frame (covers the /for/businesses lane naturally). Weakest fit: "finance" reads lending/asset-finance, not tax, for this persona.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:09Z. **.com:** 404 (available).
- **Collision check:** search `"Digital Asset Finance Partners" UK` — no firm of that full name, but a UK LinkedIn company "Digital Asset Finance" exists and the asset-finance lender namespace (Investec, Lombard, Close Brothers) sits adjacent.
- **storagePrefix:** `koin`.
- **Colour direction:** dark olive + off-white.

## Recommendation

**Digital Asset Tax Partners** (fallback: Cryptoasset Tax Partners if maximum keyword legibility of "crypto" in the brand is preferred and the crowded-namespace proximity is accepted).

## Rejected

| Name | Reason |
|---|---|
| Crypto Tax Partners | .com registered (RDAP 200); deepest inside the crowded "crypto tax" brand namespace |
| Token Tax Partners | TokenTax (tokentax.co) is a major crypto tax software/filing brand serving UK users — direct collision |
| Coin Tax Partners | Existing UK firm "CoinTax" surfaced in search — proximity collision |
| Crypto Tax Specialists | .com registered (RDAP 200); also purely generic |
| Crypto Finance Partners | .com registered (RDAP 200); "finance" off-persona |
| Digital Asset Accountants | .com registered (RDAP 200) |
| Blockchain Tax Partners | .com registered (RDAP 200); "blockchain" reads dated for a 2026 consumer tax brand |

## RDAP notes

- Nominet RDAP + rdap.org rate-limit bursts: first pass returned 2 .co.uk connection errors (WinError 10054 / TLS handshake timeout) and 7 .com 429s; a 4s-spaced retry cleared most, a final 12s-spaced retry cleared the remainder. `r4_results.json` is the merged clean set (all 12 names have integer RDAP statuses). Treat RDAP as authoritative over the DNS fallback.
