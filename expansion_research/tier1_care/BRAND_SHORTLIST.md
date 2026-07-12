# R4 Brand/Domain Shortlist — Care homes & domiciliary care (Tier-1)

Date: 2026-07-12. Checks: `r4_domain_check.py` (Nominet RDAP for .co.uk, rdap.org for .com; sanity: propertytaxpartners.co.uk returned RDAP 200 before trusting 404s). Collision checks via web search same day. **Nothing locked — owner picks and registers (G1 gate).**

## Landscape note (collision context)

- **"Care home finance" is a crowded LENDING namespace**, not an accountancy one: Shawbrook, OakNorth, Assetz Capital, Fox Davidson, MAF Finance Group, Wattsford all market "care home finance" (mortgages/development loans). Any name containing "care home finance" risks reading as a broker — this demotes `carehomefinancepartners` despite clean RDAP.
- **"Care Accountancy" (careaccountancy.co.uk)** is an existing ICAEW/ACCA firm (Leeds/Birmingham, trading since 2010) — "Care" there is the brand word, not the sector, but it crowds any care+accountancy name.
- **"Taxcare / Tax Care Accountants"** (taxcare.org.uk, taxcareaccountancy.co.uk, mytaxcare.co.uk) — multiple firms use the care+tax word pair reversed; names must not be confusable with "Taxcare".
- **"Cost Care Tax" (costcare.co.uk)** sells care-home capital-allowances claims to accountants — trademark-adjacent for care+tax naming.
- **carehomeaccountant.co.uk** is a live exact-match incumbent (one of the two EMDs flagged in the R3 dossier); generic "care home accountants" SERPs are held by Tax Accountant, Reflex, MMBA, Mitchells, Hawsons et al.

## Shortlist (ranked)

### 1. Care Finance Partners — carefinancepartners.co.uk
- **Rationale:** Exact house pattern (`Dental Finance Partners`), and the broadest fit for the dossier's persona split — covers care homes AND domiciliary/supported-living providers, where the widest gaps sit. Trustworthy, not salesy; avoids the crowded "care home ..." and "taxcare" word orders.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:43Z. **.com:** 404 (available).
- **Collision check:** search `"Care Finance Partners" UK accountant` — no firm of that name; results are Care Accountancy, Charity Accounting Partners and generic care-home sector pages. Residual ambiguity: "care finance" can read as care-fees funding (consumer) — positioning copy must anchor "for care providers".
- **storagePrefix:** `carf` (free vs ptp/dfp/ma/afl/hd/aff/cfp/bfp/tfp/ctp/cfs/ttp/npf; note `cfp` itself is taken).
- **Colour direction:** dusty heather/lavender + soft grey — calm, care-sector-appropriate, unused across the estate.

### 2. Care Provider Tax Partners — careprovidertaxpartners.co.uk
- **Rationale:** Most precise buyer signal ("care provider" is the CQC-register term, spans residential + domiciliary), mirrors `Property Tax Partners`. Longer domain is the trade-off.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:44Z. **.com:** 404 (available).
- **Collision check:** search `"Care Provider Tax Partners" OR "care provider accountants" UK firm` — no firm of that name; nearest results are Taxcare Accountants and Care Accountancy (distinct names).
- **storagePrefix:** `cdfp`.
- **Colour direction:** soft sage + warm ivory.

### 3. Care Home Tax Specialists — carehometaxspecialists.co.uk
- **Rationale:** House pattern (`... Tax Specialists`), maximum SEO legibility for the residential-home demand core (CQC money, capital allowances). Weaker: excludes domiciliary care by name, and sits nearest the Cost Care Tax capital-allowances incumbent.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:00Z. **.com:** 404 (available).
- **Collision check:** search `"Care Home Tax Specialists" UK accountants care home` — no firm of that exact name; the phrase-space is occupied by generic "care home accountants" pages (Tax Accountant, Reflex, MMBA, Hawsons) and Cost Care Tax describes itself as "Care Home Tax and Capital Allowances Specialists" — descriptive proximity, not a brand collision, but note before locking.
- **storagePrefix:** `chx`.
- **Colour direction:** dusty blue + chalk.

### 4. Care Tax Partners — caretaxpartners.co.uk
- **Rationale:** Shortest of the set, clean house pattern. Weaker: "care tax" reads ambiguously (care fees vs provider tax) and is one word-swap from the established "Taxcare" firms.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:44Z. **.com:** 404 (available).
- **Collision check:** search `"Care Tax Partners" UK accountants` — no firm of that name; results dominated by Taxcare Accountant(s) (Birmingham, award-marketed) and Cost Care Tax — reversed-word-order confusability is the live risk here.
- **storagePrefix:** `chfp` (repurposable; no semantic tie).
- **Colour direction:** warm taupe + off-black.

### 5. Care Home Finance Partners — carehomefinancepartners.co.uk
- **Rationale:** Reads naturally and matches the house pattern, but "care home finance" is an established lending/broker phrase — the brand would fight a funded mortgage-broker SERP and could be mistaken for a lender.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:27:43Z. **.com:** 404 (available).
- **Collision check:** search `"Care Home Finance Partners" UK` — no firm of that exact name, but the results page is wall-to-wall lenders/brokers (Shawbrook, OakNorth, Assetz Capital, Fox Davidson, MAF, SynergiseUK, Wattsford) marketing "care home finance". Category-confusion risk, not a name collision.
- **storagePrefix:** `dom` (repurposable).
- **Colour direction:** soft clay + linen (kept away from reserved terracotta/copper — clay here means a muted grey-pink, adjust at brand-lock).

## Recommendation

**Care Finance Partners** (fallback: Care Provider Tax Partners if the care-fees ambiguity of "care finance" is judged too costly — CPTP is unambiguous but longer).

## Rejected

| Name | Reason |
|---|---|
| Care Home Finance Partners | Available, but "care home finance" is an incumbent lending phrase — demoted to #5, effectively reserve |
| Domiciliary Care Accountants | Available, but descriptive not a brand, excludes care homes, and "care ... accountants" crowds Care Accountancy; no dedicated collision search run |
| Care Sector Finance Partners / Care Sector Tax Specialists | Available; "care sector" is flabbier than "care provider"; kept as reserves in r4 script output |
| Care Provider Finance Partners / Care Provider Accounts | Available; weaker phrasing than the CPTP/CFP picks; reserves |
| Care Home Tax Partners / Care Finance Specialists | Available (after re-run); redundant with #3/#1; reserves |

## RDAP notes

- Nominet/rdap.org rate-limit bursts: first pass had 2 TLS handshake timeouts (.co.uk) and rdap.org returned 429 twice for the same names' .com; re-runs with 4-10s spacing after a 30s backoff returned clean 404s and were merged into `r4_results.json`. Script has DNS NXDOMAIN fallback but treat RDAP as authoritative.
