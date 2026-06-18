# Medical — Track-2 legacy-page REWRITE program state

Engine: `docs/_engines/REWRITE_PROGRAM.md` (site-agnostic). This doc is the medical-specific STATE (§8). Seed-of-truth: `docs/medical/house_positions.md` (re-locked by the orchestrator 2026-06-03, cited by `§N`). Started 2026-06-03.

> Isolation: this program works only in the main tree, edits only `Medical/web/content/blog/*.md`, `Medical/web/*`, `docs/medical/*`, `sites/medical.json`. No git branch/commit/deploy. Shared engine scripts are run with `--site medical`, never edited.

## STEP 0 — onboarding (DONE)
- `sites/medical.json`: existed from a prior session; added Vercel `projectId prj_50vByZ3rqXQQwCUeENUTBbNBB41n` / `orgId team_XF9WAygZX7SGk9Fo4tOAnihH` (from `Medical/.vercel/project.json`; note: at `Medical/.vercel/`, not `Medical/web/.vercel/`). `productionDomain` left as `www.medicalaccounts.co.uk` — confirm www-vs-apex before any deploy.
- Supabase `sites` row present, `gsc_property_url = sc-domain:medicalaccounts.co.uk` (correct; GSC query ingest reads this from the DB, not the hardcoded map).
- Data refreshed 2026-06-03: GSC query = **373 rows** (90-day window 2026-03-05..2026-06-03, correct property); Bing query = **119 rows** (was 0). Bing ingest required a dedupe by (page_url,query,date) before upsert — the shared client's batched ON CONFLICT fails on intra-batch duplicate keys (latent client bug; worked around in a medical-only ingest, client not edited).

### Onboarding flags (for the orchestrator / user; not blocking the rewrite)
- **`gsc_page_client.py::_SITE_URL_MAP` has a typo**: `medical -> sc-domain:medicalaccountants.co.uk` (extra "ant"; real domain is medicalaccounts.co.uk). Only affects the GSC *page* client (not run here). One-line fix when the shared scripts are next touched.
- **Corpus-wide canonical bug**: FIXED 2026-06-17 — all 46 blog `.md` canonicals batch-updated from `medicalaccountantsuk.co.uk` to `www.medicalaccounts.co.uk`; config + scripts unified at the same time.

## STEP 1 — house positions (DONE; superseded-then-corroborated)
The orchestrator re-locked `house_positions.md` on 2026-06-03 with a comprehensive, primary-source-verified version (10 sections, FA 2026 c.11 section cites, 26 sources). Independent re-verification at gov.uk on 2026-06-03 **corroborated every FA-2026-sensitive figure**: dividends 10.75% / 35.75% / **39.35% (additional UNCHANGED)** allowance £500 (§5); CGT 18/24 + AEA £3,000, **BADR 18% from 6 Apr 2026** (§4); CT 19/25 + 3/200 (§5); employer NIC 15% / ST £5,000 / EA £10,500 (§5), **LEL £6,708** (2026/27); **Class 4 6%** (§8); VAT £90,000 / dereg £88,000 (§6); NHS pension AA £60k / taper £200k+£260k / floor £10k / MPAA £10k / LSA £268,275 / LSDBA £1,073,100 (§2.B); MTD £50k/£30k/£20k (§9). No genuinely contested positions surfaced. Minor: McCloud "31 Jan 2027 claim" framing was not re-verified live this run but is framed conditionally in the HP.

## STEP 1b — prior-work reconciliation (DONE)
`medical-rewrite-a/b/c` branches all point at `e4cecef7` (0 commits ahead of main, 1233 behind). **0 pages were ever rewritten/committed.** `wt-medical-a` holds an abandoned 47-file deletion state (junk, at the old commit); b/c clean. Blog content on main = original DeepSeek-era corpus, intact. The `page_rewrite_tracker.md` (parked-session A/B/C scheme) confirms 0/46 done. **All 46 pages are rewrite candidates.** The three branches + worktrees are abandoned stubs — recommend the orchestrator clean them (`git worktree remove` + `git branch -D`).

## STEP 2 — worklist + staleness hit-list (DONE)

### Demand-ranked worklist (GSC 90-day + Bing snapshot, by slug; homepage/TSX excluded from rewrite)
| Rank | slug | G_impr | G_pos | Bing_impr | Bing_pos | note |
|---|---|---|---|---|---|---|
| 1 | gp-accounting-guide | 50 | 1.0 | 0 | – | strong Google |
| 2 | gp-tax-deductions-complete-list-2026 | 0 | – | 32 | 1.0 | PILLAR; Bing-strong/Google-invisible |
| 3 | gp-partner-vs-salaried-gp-tax-comparison | 1 | 67 | 27 | 1.0 | Class-4 9% stale |
| 4 | gp-vat-registration | 0 | – | 23 | 1.0 | £85k stale x3 |
| 5 | nhs-pension-for-locums-form-a-form-b | 0 | – | 18 | 3.0 | |
| 6 | nhs-pension-annual-allowance-complete-guide | 0 | – | 16 | 1.0 | PILLAR |
| 7 | gp-pension-contributions-tax-relief | 0 | – | 15 | 1.0 | |
| 8 | becoming-gp-partner-financial-implications | 7 | 20.5 | 0 | – | |
| 9 | gp-partnership-tax-complete-guide | 0 | – | 4 | 1.0 | PILLAR |
| 10 | nhs-pension-tapered-annual-allowance-calculator | 0 | – | 3 | 9.0 | |
| tail | locum-doctor-self-assessment-filing-guide, locum-doctor-expenses-what-you-can-claim, locum-doctor-tax-complete-guide, gp-limited-company-tax-benefits-drawbacks | 1 each / low | | 1 each | | |
17 pages have demand; the other **29 are invisible** (no GSC/Bing rows) → depth/intent repair, seeded queries from metaTitle, never gate on coverage (§4).

### Staleness hit-list (stale token → current value → HP §)
| Stale token | Files | Current value | HP § |
|---|---|---|---|
| dividend 8.75% / 33.75% (as "current"/untagged) | gp-corporation-tax, gp-limited-company-tax-benefits-drawbacks, medical-practice-incorporation-step-by-step | 10.75% / 35.75% from 6 Apr 2026 (additional 39.35% unchanged), allowance £500, tag the year | §5 |
| Class 4 NIC 9% | gp-partner-vs-salaried-gp-tax-comparison (+ check others) | 6% (£12,570–£50,270) then 2%, from 6 Apr 2024 | §8 |
| VAT threshold £85,000 | gp-vat-registration (x3), locum-doctor-limited-company-pros-and-cons, medical-practice-incorporation-step-by-step | £90,000 reg / £88,000 dereg (from 1 Apr 2024); non-exempt turnover only | §6 |
| em-dashes (U+2014) | 91 occurrences across 23 files | 0 — commas/parentheses/full stops/middle dots | HP intro |
| BADR 10% / 14% (for on/after 6 Apr 2026 disposal) | check on rewrite | 18% from 6 Apr 2026 (date-band every mention) | §4 |
| CGT AEA £6,000 / £12,300 | check on rewrite | £3,000 | §4 |
| old NHS taper £40k/£240k, £4k floor, LTA £1,073,100 | check on rewrite (note: "£40k→£60k in Apr 2023" mentions are historically correct, NOT stale) | £60k / £200k+£260k / £10k floor; LTA abolished → LSA/LSDBA | §2.B |

## STEP 3 — rewrite batches (IN PROGRESS)

### Adapted floor set for Medical (IMPORTANT deviation from the property/dentists template)
Medical's blog route is **FLAT** (`/blog/<slug>` via `[slug]/page.tsx`; category dirs are listing pages; all 158 internal links are flat; 0 genuinely broken). The shared link tooling (`slug_resolver.py`, `track2_link_audit.py`, the `predeploy_gate` link check) assumes **nested** `/blog/<category>/<slug>` and false-flags every flat link (146 phantom 404s). Therefore, for Medical:
- **DO NOT run `slug_resolver.py --fix`** (it converts flat→nested and would break correct links).
- **DO NOT trust `predeploy_gate`'s link 404 count** (false positives for flat routing).
- Link floor = **direct flat-slug existence audit** (every `/blog/<slug>` link resolves to an existing `.md`) + `npm run build`. Sub-agents must use flat `/blog/<slug>` links only.
- Coverage floor `track2_query_coverage.py --slug <slug> --site medical --json` WORKS (verified). `frontmatter_lint.py --fix --site medical` WORKS.
- (Recommendation for the orchestrator: parameterise the link tooling for flat-routed sites, or migrate Medical to nested — a separate decision.)

### Batch 1 (2026-06-03): DONE - all adapted floors + build PASS, NOT committed (working tree)

**Floor verdicts:** frontmatter_lint --site medical = all valid; em-dashes = 0/0/0; corpus flat-link audit = 173 flat / 0 nested / 0 broken; coverage (--site medical) = all non-gating PASS (0.80 / 0.71 / invisible-no-targets); `npm run build` (Medical/web) = exit 0. (slug_resolver + predeploy_gate link check deliberately NOT used: nested-only, would false-fail / break flat links.) Each page Opus-rewritten in place with rates verified at gov.uk/legislation for 2026/27.

Originally selected as highest-ROI + clearest staleness, mutually independent:
1. `gp-vat-registration` — §6 (£85k→£90k x3, exemption/principal-purpose nuance); 23 Bing pos 1.
2. `gp-partner-vs-salaried-gp-tax-comparison` — §1/§2/§8 (Class 4 9%→6%); 27 Bing pos 1.
3. `medical-practice-incorporation-step-by-step` — §5/§4/§2.C/§6 (dividend 8.75/33.75→10.75/35.75, £85k→£90k, pension-accrual-loss pairing); PILLAR; own the "how to incorporate, step by step" intent (leave rate-comparison to sibling company pages).

### Batch 2 (2026-06-03): DONE - all adapted floors + build PASS, NOT committed
Floor verdicts: frontmatter all valid; em-dashes 0/0/0/0; coverage (--site medical) non-gating PASS (0.78 / 0.75 / 0.99 / 1.0); flat-link audit = my 4 pages 0 broken; `npm run build` exit 0.
1. `gp-tax-deductions-complete-list-2026` (PILLAR) - §8/§7/§10: mileage 45p->55p (2026/27) x2, removed proprietary "£2,000-£4,000"/other invented averages, removed hardcoded GMC £425, added CNSGP nuance + NIC section + AIA framing; 32 Bing pos 1.
2. `nhs-pension-annual-allowance-complete-guide` (PILLAR, cluster head) - §2.B/§2.D/§2.A/§2.C: hardened AA £60k/taper/MPAA, added LTA-abolition + LSA/LSDBA, corrected Scheme Pays mandatory test + 31 Jul deadline, added McCloud; 16 Bing pos 1. (Agent set metaTitle to 2025/26 to match the figure tags; AA is unchanged for 2026/27 so harmless.)
3. `gp-accounting-guide` - §3/§1/§8/§9: NHS income reframed to Global Sum/Carr-Hill/QOF/PCN (not UDAs), Class 2 reform, mileage 55p, MTD £50k/Apr-2026 (killed £10k threshold); 50 GSC pos 1.
4. `becoming-gp-partner-financial-implications` - §1/§4/§8/§2.C: Class 4 9%->6%, Class 2 reform, NHS-goodwill-cannot-be-sold, premises/last-man-standing, pension taper; 7 GSC.

### AMAP mileage 55p (mid-program ground-truth update, 2026-06-03)
New ground truth landed: AMAP first-10k-mile rate rose 45p->55p for 2026/27 (verified at gov.uk, page updated 21 May 2026; 25p above 10k unchanged). The orchestrator's HP §8 still says 45p -> FLAGGED in `docs/medical/site_wide_flags.md` (FACTUAL) for the orchestrator to patch the seed (did NOT edit their locked HP). Patched batch-1 `gp-partner-vs-salaried` mileage line to 55p. Batch-2 deductions/accounting pages use 55p. Remaining stale-45p pages (fix on their rewrite): gp-partnership-tax-complete-guide, locum-doctor-expenses-what-you-can-claim, locum-doctor-tax-complete-guide, medical-professional-expenses-what-is-claimable.

### Corpus note
Net-new session is concurrently ADDING new Medical blog pages (e.g. nhs-pension-scheme-pays-doctors-deadlines, mccloud-remedy-nhs-pension-doctors-explained, gp-surgery-notional-rent-vs-cost-rent-explained, gp-partnership-last-man-standing-premises-risk, nhs-pension-partial-retirement-doctors-guide, gp-surgery-premises-own-vs-rent-tax-guide). My batch-2 pages link to these (valid). Those net-new pages contain 6 `/blog/<category>` links (gp-practice-management, nhs-pension-planning) that a slug-only audit flags but which resolve to the category-index routes; they are the net-new session's files, not touched here.

### Rolling workflow harness (from 2026-06-03)
A background Workflow now drives the rest, per page: Opus writer (self-diagnoses staleness vs the hit-list, source-verifies 2026/27) -> INDEPENDENT adversarial verifier (re-derives arithmetic, re-checks statutes, runs frontmatter_lint + coverage + flat-link + em-dash, pricing/proprietary check) -> conditional fix agent (fires only on a failing verdict) -> one build per run. Returns a compact manifest only (manager context stays flat). Script: `...workflows/scripts/medical-rewrite-rolling-wf_baf73293-360.js`. NOTE: pass the batch by editing the in-file `PAGES` array (the Workflow `args` channel did not deliver in this environment); each page has a slug + intent hint so parallel siblings differentiate (no cannibalisation). No git, no worktrees (one distinct file per agent), flat routing (no slug_resolver).

### Batch 3 = validation batch (2026-06-03): DONE via harness
4 pages: gp-tax-return, gp-corporation-tax (clean first pass), locum-doctor-expenses-what-you-can-claim (clean; 45p->55p), nhs-pension-for-locums-form-a-form-b (verifier flagged -> fix agent -> clean). Build ok. Manager spot-check confirmed em-dashes 0, no stale tokens (8.75/9%/£85k/45p gone or correct-as-history), 0 broken links in these pages.

### COMPLETE — 46/46 rewritten + verified, NOT committed (2026-06-03)
All 46 original DeepSeek-era pages rewritten in place via the rolling harness (Opus writer -> independent verifier -> conditional fix), then a manager final gate. Counts: batch 1: 3, batch 2: 4, validation: 4, wave 2: 18, wave 3: 17 (1 + 6 + 6 + 4 after the rate-limit recovery).

FINAL CORPUS GATE across all 46: em-dashes **0**; nested (non-flat) links **0**; broken internal links **0**; stale token stated as current **0** (3 regex hits were confirmed false positives: an "8% to 9% of costs" proportion, and "dropped from 9%"/"down from £6,000 and £12,300" history); `npm run build` (Medical/web) **exit 0**.

Process notes worth keeping:
- Wave 2: 11 clean first pass + 7 verifier-flagged->fixed. Manager spot-check caught ONE residual the verifier missed (locum-doctor-umbrella-company-2026-reforms stated 45p mileage as current) -> manager-fixed to 55p. Verifier then HARDENED with a deterministic stale-token grep (45p/£85,000/8.75/33.75/9%/£40k/£240k/£12,300/£4,000/LTA/£10k-threshold must each be historical-framed or FAIL).
- Wave 3 first attempt (17 pages, full burst) hit a RATE LIMIT: 16 writers ended without StructuredOutput and made NO edits (files stayed pristine originals, no corruption); only gp-accountant-liverpool completed. Recovered by chunking the 16 into [0,6]/[6,12]/[12,16] windows (<=6 concurrent writers), all clean. Lesson: keep the harness batch <=6-8 to stay under the shared Opus rate limit.

Harness (reusable): `...workflows/scripts/medical-rewrite-rolling-wf_baf73293-360.js`. Edit the in-file PAGES/CHUNK (the Workflow `args` channel did not deliver here) and re-invoke by scriptPath.

### Remaining for the human (NOT part of the rewrite)
- COMMIT: nothing is committed; the 46 changed .md files (+ docs/medical/* + sites/medical.json) await the human's commit/deploy.
- HP §8 mileage 45p -> 55p: still flagged in site_wide_flags.md for the orchestrator to patch the locked seed.
- Corpus-wide canonical domain bug: FIXED 2026-06-17 (batch replace to www.medicalaccounts.co.uk).
- gsc_page_client.py medical map typo (page client only).
- Shared link tooling is nested-only; parameterise for Medical's flat routing (or migrate to nested) before relying on predeploy_gate's link check.
