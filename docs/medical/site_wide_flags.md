# Medical site-wide flags — issues requiring orchestrator / user input

**Append-only.** Each session adds to the bottom with timestamp + session ID. Never edit existing entries.

**Format:** `## [TIMESTAMP] [SESSION_ID] [CATEGORY] Title` then a body paragraph with the issue, impact, and recommendation.

**Categories:**
- `FACTUAL` — factual error live on the production site needing user awareness or sign-off to fix
- `CANNIBAL` — cannibalisation / duplicate-content issue between pages
- `POSITIONING` — brand / business-model question the session cannot decide
- `MISSING` — page is missing entirely (404 / broken link target referenced elsewhere)
- `OBSOLETE` — content no longer accurate due to time passing
- `HOUSE_POSITION_CONFLICT` — competitor evidence contradicts the locked house position; orchestrator to reconcile
- `OTHER` — anything else

---

## [Sessions: append below this line]

## [2026-06-03] [track2-rewrite] [FACTUAL] HP §8 mileage rate 45p is stale for 2026/27 (now 55p) — RESOLVED 2026-07-06
HP §8 (and the §8 expenses framing) states the AMAP / mileage allowance as "45p/mile first 10,000 business miles, 25p thereafter". Verified at source on 2026-06-03 (https://www.gov.uk/government/publications/rates-and-allowances-travel-mileage-and-fuel-allowances/travel-mileage-and-fuel-rates-and-allowances, page updated 21 May 2026): for **2026/27 the first-10,000-mile rate is 55p** (up from 45p), 25p thereafter unchanged. This matches the cross-site ground-truth note (memory `amap_mileage_55p_2026_ground_truth`). Impact: the HP is the seed-of-truth, so the stale 45p re-seeds into every rewrite citing mileage. Recommend the orchestrator update HP §8 to **55p first 10,000 miles / 25p thereafter (2026/27, FA-era AMAP uplift)**. I did not edit the locked HP (per the append-a-flag rule). Corpus pages still carrying stale 45p (to fix on their rewrite): gp-partnership-tax-complete-guide, locum-doctor-expenses-what-you-can-claim, locum-doctor-tax-complete-guide, medical-professional-expenses-what-is-claimable, gp-tax-deductions-complete-list-2026 (note: its "for 2025/26: 45p" is historically correct but the page is 2026-branded so must lead with 55p). Already patched: gp-partner-vs-salaried-gp-tax-comparison (batch 1). Rewrite sub-agents from now on are briefed to use 55p/25p (2026/27) with the gov.uk source.

**RESOLVED 2026-07-06 [phase5-lane-E]:** HP §8 already showed 55p at the time of this sweep (had been updated during Wave 1). Corpus: all .md blog files already carry 55p. Stale 45p found and corrected in 4 source files: `Medical/web/src/app/blog/locum-tax/page.tsx` (bullet), `Medical/web/src/app/blog/medical-expenses/page.tsx` (paragraph), `Medical/web/src/app/for-locum-doctors/page.tsx` (FAQ answer), `Medical/web/src/lib/medical-guides-data.ts` (motor-expenses body + keyPoints bullet). No arithmetic worked examples needed updating (stale references were rate-only, not worked sums). Homepage carries no mileage reference so freeze exception not triggered.
