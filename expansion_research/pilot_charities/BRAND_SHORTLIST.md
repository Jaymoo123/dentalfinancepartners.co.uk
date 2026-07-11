# R4 Brand/Domain Shortlist — Charities & Non-profits pilot

Date: 2026-07-11. Checks: `r4_domain_check.py` (Nominet RDAP for .co.uk, rdap.org for .com; sanity: propertytaxpartners.co.uk returned RDAP 200 before trusting 404s). Collision checks via web search same day. **Nothing locked — owner picks and registers (G1 gate).**

## Landscape note (collision context)

- **"Charity Accounting Partners" (charityaccountingpartners.co.uk)** is an existing UK firm (ICAEW, SORP-focused). This killed "Charity Accounts Partners" and raises proximity risk for any charity+partners name.
- **"Charity Finance Group" (cfg.org.uk)** is the sector membership body, not a firm — names using "Charity Finance" must stay clearly distinct.
- **charityfinancepartners.co.uk** is already registered (RDAP 200) — dropped.
- Established sector firms to stay distinct from: Sayer Vincent, HaysMac, Slade & Cooper, Price Bailey, Bishop Fleming, Kreston Reeves, NfP Accountants, SC Accounting, Third Sector Accountancy.

## Shortlist (ranked)

### 1. Trustee Finance Partners — trusteefinancepartners.co.uk
- **Rationale:** Speaks directly to the buyer persona (trustees/finance officers), trustworthy not salesy, exact house pattern (`Dental Finance Partners`). Sidesteps the crowded "Charity ..." namespace entirely, so lowest collision risk.
- **.co.uk RDAP:** 404 (available) @ 2026-07-11T16:17:41Z. **.com:** 404 (available).
- **Collision check:** search `"Trustee Finance Partners" UK` — no firm of that name; only generic trustee-services pages (Holden & Partners, Evelyn Partners etc.).
- **storagePrefix:** `tfp` (free vs ptp/dfp/ma/afl/hd/aff/cfp/bfp).
- **Colour direction:** deep forest/racing green + warm cream — sector-appropriate stewardship signal, unused by the estate's existing primaries.

### 2. Charity Tax Partners — charitytaxpartners.co.uk
- **Rationale:** Most niche-legible; mirrors `Property Tax Partners` exactly. "Tax" differentiates from the accounting/audit-led incumbents (Gift Aid, VAT, trading subsidiaries are underserved angles).
- **.co.uk RDAP:** 404 (available) @ 2026-07-11T16:17:43Z. **.com:** 404 (available).
- **Collision check:** search `"Charity Tax Partners" accountants` — no firm of that name (only US trust-tax and generic charity-accountant results).
- **Risk:** two-word proximity to existing "Charity Accounting Partners" — distinguishable (tax vs accounting) but adjacent; note before locking.
- **storagePrefix:** `ctp`.
- **Colour direction:** deep plum/aubergine + gold accent.

### 3. Charity Finance Specialists — charityfinancespecialists.co.uk
- **Rationale:** House pattern (`Trade Tax Specialists`), plainly descriptive, avoids "Partners" (distance from Charity Accounting Partners).
- **.co.uk RDAP:** 404 (available) @ 2026-07-11T16:17:41Z. **.com:** 404 (available).
- **Collision check:** no firm of that name; nearest is Charity Finance Group (membership body, distinct function and name).
- **storagePrefix:** `cfs`.
- **Colour direction:** slate blue-teal + off-white.

### 4. Trustee Tax Partners — trusteetaxpartners.co.uk
- **Rationale:** Persona + tax angle combined; slightly weaker semantically (charities, not trustees, bear the tax exposure).
- **.co.uk RDAP:** 404 (available) @ 2026-07-11T16:17:42Z. **.com:** 404 (available).
- **Collision check:** no UK firm of that name (results all US fiduciary/trust-tax — different meaning of "trustee", worth noting for SERP ambiguity).
- **storagePrefix:** `ttp`.
- **Colour direction:** burgundy + stone.

### 5. Nonprofit Finance Partners — nonprofitfinancepartners.co.uk
- **Rationale:** Broadens beyond registered charities (CICs, CASCs). Weaker: "nonprofit" reads US; UK audience says charity/not-for-profit.
- **.co.uk RDAP:** 404 (available) @ 2026-07-11T16:17:42Z. **.com:** RDAP 200 — **registered**, secondary-signal negative.
- **Collision check:** no UK firm of that name; FinOps Partners and NfP Accountants operate nearby in the space.
- **storagePrefix:** `npf` (avoid `nfp` — collides with existing firm NfP Accountants' branding, though not our prefix table).
- **Colour direction:** ochre/amber + charcoal.

## Recommendation

**Trustee Finance Partners** (fallback: Charity Tax Partners if maximum SEO-legibility of "charity" in the brand is preferred and the CAP proximity risk is accepted).

## Rejected

| Name | Reason |
|---|---|
| Charity Finance Partners | .co.uk + .com registered (RDAP 200) |
| Charity Accounts Partners | Existing firm "Charity Accounting Partners" — direct collision |
| Charity Reporting Partners | "Partners" + charity namespace crowded by CAP; weakest legibility of the Partners set |
| Third Sector Tax Specialists | "Third Sector Accountancy" is an existing UK firm; jargon |
| Nonprofit Accounts Specialists / Nonprofit Tax Specialists / Trustee Accounts Specialists | Available but weaker phrasing; kept as reserves in r4 script output |

## RDAP notes

- Nominet RDAP rate-limits bursts: 3 of 12 first-pass calls failed (WinError 10054 / TLS timeout); re-run with 3s spacing returned clean 404s. Script has DNS NXDOMAIN fallback but treat RDAP as authoritative.
