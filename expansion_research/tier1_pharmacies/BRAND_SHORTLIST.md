# R4 Brand/Domain Shortlist — Community Pharmacies (Tier 1)

Date: 2026-07-12. Checks: `r4_domain_check.py` (Nominet RDAP for .co.uk, rdap.org for .com; sanity: propertytaxpartners.co.uk returned RDAP 200 before trusting 404s). Collision checks via web search same day. **Nothing locked — owner picks and registers (G1 gate).**

## Landscape note (collision context)

- **Hutchings Accountants (hutchingsaccountants.com)** and **Silver Levene (silverlevene.co.uk)** are the established pharmacy-accounting incumbents (30+ years each, both NPA trusted partners) — verified by search 2026-07-12. Neither uses a descriptive brand, so the descriptive namespace is open.
- **"Pharmacy finance" as a bare phrase reads LENDING in UK SERPs** — Gable Asset Finance, FTA Finance (NPA partner), Rangewell, UK Business Finance all brand around "pharmacy finance" for acquisition loans. "Partners" + accounting positioning must carry the disambiguation.
- **pharmacistaccountants.co.uk** is an existing firm (locum-focused chartered accountants) — kills any "Pharmacist Accountants" adjacent name.
- **Reflex Accounting** (the estate's lead-gen partner) has a live pharmacy sector page — a pharmacy site here feeds them directly; no name collision but worth knowing.
- Other sector firms to stay distinct from: RX Virtual Finance, Hazlewoods, Hawsons, Lovewell Blake, A2Z Accounting, ABM Chartered Accountants, Lanop, Accotax, AudTax.

## Shortlist (ranked)

### 1. Pharmacy Finance Partners — pharmacyfinancepartners.co.uk
- **Rationale:** Exact house pattern (`Dental Finance Partners`), niche-legible to the owner persona (pharmacy owners/buyers, NHS contract accounting), trustworthy not salesy. No incumbent uses it.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:19Z. **.com:** 404 (available).
- **Collision check:** search `"Pharmacy Finance Partners" UK accountant` — no firm of that name; results are generic pharmacy-accountant pages (RX Virtual Finance, ABM, Xeinadin etc.).
- **Risk:** "pharmacy finance" bare-phrase SERP is lender territory (Gable, FTA, Rangewell) — brand must always render with "Partners"; note before locking.
- **storagePrefix:** `phfp` (free vs ptp/dfp/ma/afl/hd/aff/cfp/bfp/tfp/ctp/cfs/ttp/npf).
- **Colour direction:** deep petrol/ink blue + cool mint accent — clinical-trust signal, unused by the estate's existing primaries.

### 2. Pharmacy Tax Partners — pharmacytaxpartners.co.uk
- **Rationale:** Mirrors `Property Tax Partners` exactly; "Tax" sidesteps the lending connotation of "finance" entirely and differentiates from the accounts/audit-led incumbents (VAT, BADR on sale, goodwill are underserved angles).
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:20Z. **.com:** 404 (available).
- **Collision check:** search `"Pharmacy Tax Partners" UK accountant` — no firm of that name; only generic pharmacy-tax service pages (Accotax, Reflex, HHM etc.).
- **storagePrefix:** `phtp`.
- **Colour direction:** midnight navy + soft sage.

### 3. Pharmacy Tax Specialists — pharmacytaxspecialists.co.uk
- **Rationale:** House "Specialists" pattern, plainly descriptive, avoids "Partners" if maximum distance from partnership-sounding incumbents is wanted. Slightly weaker brand warmth than 1-2.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:20Z. **.com:** 404 (available).
- **Collision check:** search `"Pharmacy Tax Specialists" UK accountant firm` — no firm of that name; phrase appears only as a generic descriptor on incumbent pages (A2Z, Accotax).
- **storagePrefix:** `phx`.
- **Colour direction:** graphite + warm white.

### 4. Pharmacist Finance Partners — pharmacistfinancepartners.co.uk
- **Rationale:** Person-word variant; but the buyer is the pharmacy BUSINESS owner (LAUNCH_CORE positioning), and "pharmacist" leans locum — the content-only audience. Weaker persona fit.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:20Z. **.com:** 404 (available).
- **Collision check:** search `"Pharmacist Finance Partners" ... UK` — no firm of that name; nearest namespace is lending brokers (FTA Finance's pharmacists page) and pharmacistaccountants.co.uk (different name, locum-focused).
- **storagePrefix:** `rxfp`.
- **Colour direction:** deep teal-grey + chalk.

### 5. Dispensary Finance Partners — dispensaryfinancepartners.co.uk
- **Rationale:** Distinctive, zero namespace crowding; but "dispensary" is not how UK owners search (head terms are all "pharmacy accountant") and reads US/cannabis in global SERPs. Reserve only.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:29:26Z (re-run after first-pass RDAP error). **.com:** 404 (available).
- **Collision check:** search `"Dispensary Finance Partners" UK` — no firm of that name; dispensingpartners.co.uk exists but serves dispensing GP practices, a different market and name.
- **storagePrefix:** `disp`.
- **Colour direction:** dark olive-grey + parchment.

## Recommendation

**Pharmacy Finance Partners** (fallback: Pharmacy Tax Partners if the lender-adjacent "pharmacy finance" SERP is judged too risky — it fully sidesteps the lending namespace and mirrors Property Tax Partners).

## Rejected

| Name | Reason |
|---|---|
| Pharmacist Accountants (any variant) | pharmacistaccountants.co.uk is an existing UK firm — direct collision |
| Community Pharmacy Accountants | Available (RDAP 404) but generic-descriptor, unbrandable; phrase saturated across every incumbent's pages |
| Community Pharmacy Finance | Available but reads as a lending product, not a firm |
| Pharmacy Accounts Partners / Pharmacist Accounts Partners | Available but "Accounts" proximity to pharmacistaccountants.co.uk; weakest legibility of the Partners set |
| Dispensing Finance Partners | "Dispensing" collides conceptually with dispensingpartners.co.uk (dispensing GP practices) |
| Pharmacy Finance Specialists | Available but compounds the lender-read of "pharmacy finance" without the Partners warmth; kept as reserve in r4 output |

## RDAP notes

- Nominet RDAP rate-limits bursts: 2 of 12 first-pass .co.uk calls failed (WinError 10054 / TLS handshake timeout) and one .com retry hit 429; re-runs with 4-8s spacing returned clean 404s and were merged into `r4_results.json`. Script has DNS NXDOMAIN fallback but treat RDAP as authoritative.
