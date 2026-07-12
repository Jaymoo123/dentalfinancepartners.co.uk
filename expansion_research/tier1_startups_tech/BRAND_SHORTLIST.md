# R4 Brand/Domain Shortlist — Startups & tech/SaaS accountancy (Tier-1 #4)

Date: 2026-07-12. Checks: `r4_domain_check.py` (Nominet RDAP for .co.uk, rdap.org for .com; sanity: propertytaxpartners.co.uk returned RDAP 200 before trusting 404s). Collision checks via web search same day. **Nothing locked — owner picks and registers (G1 gate).**

## Landscape note (collision context)

- **"accountant for startups" is a saturated commodity namespace** (Sleek, 123Financials, Chacc, Lanop, Fusion, Accotax etc. — all surfaced in collision searches). Any "Startup ..." brand fights that head; persona-first ("Founder ...") names sidestep it.
- **Scaleup Finance UK Limited (scaleup.finance)** is a VC-backed fractional-CFO platform (£6.4m pre-Series A, London), plus a separate scaleupfinance.uk and scaleup-cfo.co.uk — this killed both "Scaleup" candidates despite clean RDAP.
- **Venture Tax Limited (venturetax.co.uk)** and **Venture Partners Limited** are existing UK companies; "Venture Finance Management" (Liverpool) and "Venture Finance" (Sheffield) are trading accountancy firms — the whole "Venture" namespace is occupied and also reads VC-fund, not accountant.
- **Tax Partners UK (taxpartnersuk.com)** markets itself as a start-up specialist tax firm; two-word "... Tax Partners" names must stay clearly distinct from it.
- Specialist incumbents from the R3 dossier to stay distinct from: Accountancy Cloud, Finerva, Barnes & Scott, OnTheGo (strapline "Your Finance Partner"), Standard Ledger UK, Chacc, ihorizon.

## Shortlist (ranked)

### 1. Founder Finance Partners — founderfinancepartners.co.uk
- **Rationale:** Speaks to the R2-locked buyer persona (funded/scaling founders, not "startups" generically), exact house pattern (`Dental Finance Partners`). Sidesteps the commodity "startup accountants" head entirely — lowest collision risk of the set.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:40Z. **.com:** 404 (available).
- **Collision check:** search `"Founder Finance Partners" UK accountant` — no firm of that exact name. Nearest: UK Finance Partners Ltd (Solihull bookkeeping/tax company, distinct name) and OnTheGo's "Your Finance Partner" strapline (not a brand name).
- **storagePrefix:** `ffp` (free vs ptp/dfp/ma/afl/hd/aff/cfp/bfp/tfp/ctp/cfs/ttp/npf).
- **Colour direction:** electric indigo/violet + near-black — tech-native energy, unused by the estate's existing primaries.

### 2. Startup Tax Partners — startuptaxpartners.co.uk
- **Rationale:** Most niche-legible; mirrors `Property Tax Partners` exactly. "Tax" pushes toward the winnable clusters (R&D, SEIS/EIS, EMI) rather than the commodity bookkeeping head.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:41Z. **.com:** 404 (available).
- **Collision check:** search `"Startup Tax Partners" UK accountant` — no firm of that name; results are generic startup-accountant pages (Hayes, Lanop, TaxAce, Accace).
- **Risk:** the word "startup" plants the brand inside the crowded commodity namespace; proximity to Tax Partners UK (start-up specialist tax advisers) — distinguishable but adjacent.
- **storagePrefix:** `stfp`.
- **Colour direction:** deep navy + citrus lime accent.

### 3. Founder Tax Partners — foundertaxpartners.co.uk
- **Rationale:** Persona + tax angle combined; strong fit for the SEIS/EIS/EMI/founder-dividend clusters. Slightly narrower than #1 (site also covers company-level finance, not just founder tax).
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:41Z. **.com:** 404 (available).
- **Collision check:** search `"Founder Tax Partners" UK` — no firm of that exact name; nearest are Tax Partners UK (taxpartnersuk.com) and taxpartner.co.uk, both close enough in phrasing to note before locking.
- **storagePrefix:** `fdp`.
- **Colour direction:** graphite + electric cyan.

### 4. Founder Finance Specialists — founderfinancespecialists.co.uk
- **Rationale:** House pattern (`... Specialists`), persona-first, avoids "Partners" (distance from Tax Partners UK / taxpartner.co.uk). Longest slug of the set.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:58Z. **.com:** 404 (available).
- **Collision check:** search `"Founder Finance Specialists" UK accountant firm` — no firm of that name; results are the generic startup-accountant field (ihorizon, Accotax, OnTheGo, Clear House).
- **storagePrefix:** `eqp`.
- **Colour direction:** midnight blue + coral accent.

### 5. Venture Tax Partners — venturetaxpartners.co.uk
- **Rationale:** Investor/EIS-side legibility (matches the 2,400/mo EIS-relief calculator angle in the dossier). Weakest of the set: "venture" reads VC fund, and the namespace is occupied.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:57Z. **.com:** 404 (available).
- **Collision check:** search `"Venture Tax Partners" UK` — no firm of that exact name, but **Venture Tax Limited (venturetax.co.uk, co. 11993038)** is a live UK tax consultancy one word away, and Venture Partners Limited (co. 01940787) also exists. Proximity risk is the highest on the shortlist.
- **storagePrefix:** `vfp`.
- **Colour direction:** warm grey + cobalt.

## Recommendation

**Founder Finance Partners** (fallback: Startup Tax Partners if maximum SEO-legibility of "startup" in the brand is preferred and the commodity-namespace adjacency is accepted).

## Rejected

| Name | Reason |
|---|---|
| Equity Finance Partners | .co.uk + .com registered (RDAP 200) |
| Scaleup Finance Partners / Scaleup Tax Partners | Scaleup Finance UK Limited (scaleup.finance, VC-backed CFO platform) + scaleupfinance.uk + scaleup-cfo.co.uk — namespace directly occupied despite clean RDAP |
| Venture Finance Partners | Venture Finance Management (Liverpool) + Venture Finance (Sheffield) trading accountancy firms; also reads VC fund |
| Tech Tax Partners | .com registered (RDAP 200) — secondary-signal negative; "tech" weakest niche-legibility of the set |
| Startup Finance Partners / Startup Tax Specialists | Available but weaker phrasing inside the crowded "startup" namespace; kept as reserves in r4 script output |

## RDAP notes

- Nominet RDAP unreliable in bursts again: the sanity call itself failed twice (WinError 10054 connection reset) before succeeding; within the passing run, scaleupfinancepartners.com returned 429 and scaleuptaxpartners.co.uk hit a TLS handshake timeout. Both re-checked individually @ 2026-07-12T10:29:22Z / 10:29:26Z with clean 404s and merged into `r4_results.json`. Script has DNS NXDOMAIN fallback but treat RDAP as authoritative.
