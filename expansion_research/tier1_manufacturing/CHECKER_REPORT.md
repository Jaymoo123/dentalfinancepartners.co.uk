# CHECKER REPORT — R3 manufacturing & engineering dossier

Checker: independent fresh-context agent, 2026-07-12. No paid calls made, no guard
touched, nothing committed, nothing fixed silently. Verdict at bottom.

## 1. Rival classifications — PASS

- **skynetaccounting.co.uk DEDICATED: CONFIRMED live.** Fetched homepage 2026-07-12:
  title "Accountants For Manufacturing & Engineering Business Owners", H1 "Driving
  Manufacturing Profit", nav is entirely manufacturing services (product costing
  accountant, manufacturing efficiency audit, VFO for factory owners). Whole brand,
  not a sector page. Quotes in COMPETITORS.md/competitors.json match `raw/verify_evidence.json`
  byte-for-byte (8 SERP hits, same query list).
- **8 SECTION rivals live-fetched, all correctly classed** (mix of heavyweights + small):
  - mha.co.uk — own fetch 403 (as producer recorded) but site: search confirms
    /industries/manufacturing-distribution/manufacturing-engineering + dedicated teams. SECTION correct.
  - azets.co.uk — old URL 308-redirects to azets.com/en-uk/industries/engineering; page live,
    national firm sector page. SECTION correct (URL has since moved; cosmetic).
  - pkf-francisclark.co.uk — page live; exact quote confirmed: "we support more than 300
    manufacturing and engineering businesses". SECTION correct.
  - hurst.co.uk — /sectors/manufacturing-engineering exists; the "since 1982" sentence was
    not in the fetched excerpt (nav-heavy render) — page existence + sector focus confirmed,
    quote unconfirmed-but-plausible. SECTION correct.
  - chandlerandpartners.co.uk — general Worcester firm, 11+ industry verticals, manufacturing
    page one of many. SECTION correct (correctly NOT dedicated despite page title).
  - rousepartners.co.uk — full-service firm; exact quote "led by a partner experienced in the
    manufacturing sector" confirmed on page. SECTION correct.
  - smithbutler.co.uk — Bradford general firm, sector page live, H1 "Manufacturing
    Accountants". SECTION correct.
  - lanop.co.uk — /accounting-for-engineer/ live, "Accountants for Engineers & Engineering
    Firms UK", R&D/CIS/VAT as claimed. SECTION correct.
- **Hidden-dedicated probe on the 23 excluded-unverifiable domains: NONE FOUND.**
  Search-recovered a sample: bluejayaccountants.co.uk (CIMA generalist, Sheffield/Mansfield,
  manufacturing mentioned within a broad multi-sector practice), quilliammarr.co.uk
  (multi-niche programmatic generalist: property/construction/dentists/ecommerce...),
  mhcandco.co.uk (Bristol generalist, no manufacturing specialism). Crowe/Price Bailey/
  Mitchell Charlesworth are known nationals = SECTION at best. The excluded list hides
  additional SECTION weight, not a dedicated brand — producer's "conservative" note is right.

## 2. PARK reasoning audit — PASS (with two framing caveats)

- **Condition 1 (contested field at the deciding tier): HOLDS.** 1 DEDICATED + 37 SECTION
  reproduced from competitors.json; institutional heavyweights (MHA, Azets, PKF-FC, Hurst)
  independently confirmed live above. The excluded-unverifiable list can only raise the
  SECTION count.
- **Condition 2 (weak/contaminated intent): HOLDS on the raw data.** Sampled the 1,690
  cluster heads directly: the 327-head costing/WIP/overhead family is visibly student/
  definitional ("factory overhead grade 11", "factory overhead kannada meaning", "another
  word for work in progress in accounting", variance-formula homework strings). CBAM family
  contains EU-language noise as claimed. TOPICS.md's contamination reading is supported by
  the pool, not just asserted.
- **256-term generic-CA wall: REASONABLE, not evidence-destroying.** Regex audit of all 256
  dropped terms: **0 carry any manufacturing/engineering/plant/machinery qualifier** (sample:
  "annual investment allowance pickup truck", "ford ranger annual investment allowance",
  "full expensing second hand assets"). The drop list is preserved in topic_pool_final.json
  (`generic_ca_wall_terms`), so nothing is destroyed — it is reversible and consistent with
  the estate-wall finding (49/49 measured dupes in the CA family... see correction below).
- Verdict is correctly gated: PARK is conditional on the specified paid volume re-check,
  and the un-forced wedge case (FA 2026 freshness, tool vacuum, CBAM) is honestly recorded.
- **Caveat A:** the "promotion rule (<3 genuine dedicated rivals AND weak search intent →
  PARK-candidate)" cited in DOSSIER.md is the producer's own framing — it appears nowhere
  in EXPANSION_PROGRAM.md, the tracker, or the R2 docs. The reasoning stands on its
  evidence, but the owner should know the rule is dossier-local, not doctrine.
- **Caveat B (correction, favours PARK):** the "~390/mo" R2D demand figure the dossier
  leans on is not what R2D measured. `R2D_VOLUMES.md` row 22 gives manufacturing
  **family 260/mo, head "manufacturing accountant" 170/mo**; 390/mo appears in
  R2_NICHE_SCORES_FINAL.md's narrative (and matches the hospitality/energy rows, likely a
  transcription). The demand leg is therefore weaker than stated, which strengthens PARK.

## 3. Citations — PASS (10/10, incl. flagged s.29)

Live-fetched 10 of the 34: FA 2026 s.28 (18%→14% WDA, exact substitution wording), FA 2026
s.29, AIA £1m, R&D claim-notification 6-month rule, employer NIC 15%/£5,000 (2026-27 page),
CBAM factsheet (1 Jan 2027; aluminium/cement/fertiliser/hydrogen/iron & steel), FA 2026 s.4
dividends (8.75→10.75%, 33.75→35.75%), MTD ITSA (£50k Apr 2026 / £30k Apr 2027), full
expensing 100%, CH SIC list (divisions 10-33 + 71121 present). All anchors present.

**s.29 scope note verified against legislation.gov.uk:** new s.45U 40% FYA applies to plant
or machinery that is **"unused and not second-hand"** and not special-rate, expenditure on
or after 1 Jan 2026; s.46(4B) permits it for plant **provided for leasing** where the lessee
uses it wholly/almost wholly to earn taxable income. So: second-hand EXCLUDED, certain
leased assets INCLUDED. The outline's hedged wording ("leased/second-hand angles... verify
scope per asset at write time") is safe but loose — at write time the position must state
the asymmetry explicitly, not imply second-hand may qualify. `raw/citation_checks.json`
contains 34 records, status 200, phrases_found populated, 0 misses — matches the 34/34 claim.

## 4. Numbers audit — PASS (one one-word correction)

Recomputed from disk:
- autocomplete: 918 queries → 3,958 unique suggestions ✓ (raw/autocomplete_raw.json)
- DDG: 36 queries, 220 distinct domains ✓ (raw/serp_raw.json; serper key holds the single
  400 probe + no-retry note ✓)
- verify_evidence.json: 204 entries ✓
- raw pool 3,283 ✓; estate titles checked 7,905 ✓; dupes 15 exact + 34 fuzzy = 49 = 1.49% ✓
- kept 3,042 − 48 (R&D wall) − 256 (CA wall) − 152 (junk) = **2,586 final** ✓
- clusters 1,690; cluster members sum = 2,586 (no keyword lost) ✓
- **Correction (minor):** TOPICS.md says "every one of the 49 measured estate dupes is in
  the... capital-allowances family". 48 are; 1 is "what is r&d tax credit" (R&D family —
  which the dossier also walls, so no consequence). One-word fix ("all but one").
- The "96 noisy cluster heads" figure is probe-dependent (my cruder regex found 11 flagrant;
  the producer's probe was broader); the qualitative claim it supports is confirmed by
  direct sampling regardless.

## 5. Hard rules — PASS

- **Zero DataForSEO:** no dfs_* files anywhere under tier1_manufacturing/ (care/crypto/
  pharmacies have them from the separately owner-authorised paid runs; manufacturing has none).
- **No guard edits by the producer:** the only optimisation_engine diff is config.py making
  DATAFORSEO_ABORT_AT env-overridable with default unchanged at 0.85 — this is the
  documented manager-level owner ruling of 2026-07-11 (EXPANSION_PROGRAM.md rule 9), not a
  producer change, and `scripts/_r3_paid_pulls.py` (manager-authored, crypto/pharmacies/care
  only, zero manufacturing references) is its consumer.
- **Nothing outside tier1_manufacturing/:** all manufacturing artefacts (8 docs, 7 scripts,
  4 json, raw/) live inside the dir. Other dirty paths in git status (tier1_care/crypto/
  pharmacies mods, tier1_ecommerce/, tracker) belong to the concurrent agents the dossier's
  anomaly 7 discloses; none reference manufacturing.

## Corrections requested (no fix applied, per checker rules)

1. TOPICS.md line "every one of the 49 measured estate dupes is in the annual-investment-
   allowance / full-expensing / capital-allowances family" → "all but one (48 CA + 1 generic
   R&D)".
2. DOSSIER.md verdict: replace/annotate "~390/mo" with R2D's actual measured figures
   (family 260/mo, head 170/mo per R2D_VOLUMES.md row 22) or note the discrepancy; either
   way it strengthens PARK.
3. DOSSIER.md: mark the "<3 dedicated + weak intent" promotion rule as dossier-local
   reasoning, not program doctrine.
4. At write time (if ever un-parked), position B.2 must state the s.29/s.45U asymmetry
   explicitly: second-hand excluded, qualifying leased plant included.

## VERDICT: **VERIFIED-WITH-CORRECTIONS**

The PARK-candidate verdict is sound and, on the corrected R2D demand figure, slightly
understated. All corrections are wording-level; no classification, count, or citation error
that changes the verdict was found. The paid volume re-check gate specified in DOSSIER.md
remains the right closing step.
