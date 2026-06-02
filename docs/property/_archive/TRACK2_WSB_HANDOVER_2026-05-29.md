# Track 2 remediation — NEXT-STAGE handover (start here) — 2026-05-29 PM

**This supersedes `TRACK2_REMEDIATION_HANDOVER_2026-05-29.md` (now stale).** Read this, then the two memories below.

Mode: **autonomous** (user away, decides without confirmation, safest-reversible-when-uncertain; deploy verified reversible changes autonomously). User-chosen sequencing: **finish CityService → 2027 sweep → links → engine**, each its own reviewed + deployed step.

Memories to load first: `track2_remediation_state`, `property_2027_rates_ground_truth`.

---

## 0. WHAT'S ALREADY DONE — do NOT redo
**Workstream A (CityService remediation) is COMPLETE, DEPLOYED, and VERIFIED LIVE** (commit `dfb3d277`; prod `www.propertytaxpartners.co.uk`; build + deploy both exit 0; bristol prod page confirmed showing corrected "22% property basic rate / no new wedge"). It fixed:
- `docs/property/house_positions.md` §4 + §7 — the **root seed** (was wrong on the 2027 rules, re-seeding the corpus error). Now correct: FA 2026 enacted, reducer rises to 22%, no new wedge, England+NI scope.
- 41 CityService pages + **birmingham** + dundee (Scotland scope) + glasgow (STL myth + 6 wrong-cat 404 links) + cambridge (false Article 4) + london (SDLT maths) + the ITTOIA 2005 s.272A/274A sweep (35 cites, 14 files) + GBP/pounds→£.
- Verified: 0 broken links, 0 em-dashes on the 41 + birmingham.

## 1. GROUND TRUTH (cold-verified 2026-05-29 — do NOT re-litigate)
See memory `property_2027_rates_ground_truth` for the full statement. Summary:
- **Announced Autumn Budget 2025 (26 Nov 2025)**, NOT 2024. **Enacted FA 2026, Royal Assent 18 March 2026** (ss.6-7). NOT draft/awaiting/scheduled/policy-commitment.
- Rates **22/42/47 from 6 Apr 2027, England + NI only** (Scotland/Wales devolved per FA 2026 s.8/Sch 2).
- **FA 2026 Sch 1 raises the Section 24 reducer to the 22% property basic rate** (amends ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B). So **basic-rate landlords get NO new wedge**; higher/additional relief rises 20%→22% but wedge is **unchanged** at 20pp (42−22)/25pp (47−22). The corpus "credit stays at 20% so wedge widens" is BACKWARDS.
- Section 24 cite is **ITTOIA 2005 ss.272A/274A**, never ITA 2007.

## 2. WORKSTREAM B — corpus-wide 2027-framing sweep (THIS IS NEXT; deploy 2)
**Worklist:** `docs/property/track2_2027_scope.json` (per-page error snippets). **Scoper:** `python scripts/track2_2027_framing_scope.py` (regenerates the JSON + prints summary). ~25 pages carry real errors, in three classes:
- **FORWARD (~7):** backwards "credit stays/remains at 20% / wedge widens / 22pp gap (42−20)". Pages incl. the flagship pillars `2027-property-income-tax-rates-landlords-uk`, `2027-property-tax-rates-section-24-relief-uk-landlords` (h1 literally "The Enacted Wedge"), `section-24-higher-rate-taxpayers-changes-2027`, `section-24-2027-tax-year-planning-uk-landlords`, `mortgage-interest-deductible-landlords-uk-2026`, `2027-tax-rates-incorporation-decision-property-landlords`, `unequal-rental-income-split-...`.
- **WORKED (~9):** a 2027/28 worked example applying a **20%** reducer → recompute at **22%** (`2027-property-income-tax-rates-landlords-uk` line ~142 £7,000→£7,700, gap 22pp→20pp; section-24-2027 pages; retirement-planning-spousal; section-24-tax-credit-20-percent; serviced-accommodation-vs-btl; tax-relief-mortgage-interest).
- **ENACT (~15):** "draft Finance Act 2026 / awaiting Royal Assent / subject to FA 2026 receiving RA / scheduled for inclusion / policy commitment" → enacted. Pages incl. airbnb-tax, big-tax-changes-fhl, abolition-fhl, how-much-tax-rental-income, income-tax-rates-landlords-2026-27, tax-efficient-property-investment-structure, transferring-fhl-portfolio, the CGT-cluster (cgt-deferral, cgt-property-sold-loss, reduce-cgt, rollover-relief, cgt-property-2027-rate-changes, 2027-property-tax-rates-affect-cgt), leaving-uk-landlord, why-luton.

**Canonical corrected snippet** (use verbatim; also in house_positions §7): *"Separate property income tax rates of 22% basic, 42% higher and 47% additional take effect from 6 April 2027 for property income in England and Northern Ireland (Scotland and Wales set their own). They were announced at the Autumn Budget 2025 (26 November 2025) and enacted in Finance Act 2026 (Royal Assent 18 March 2026). From 6 April 2027 the Section 24 finance-cost reducer is also given at the new 22% property basic rate (not frozen at 20%), so a basic-rate landlord sees no new wedge, while a higher/additional-rate landlord's relief rises from 20% to 22% but still sits well below their 42%/47% rate."*

**Worked-example invariant (2027/28 context):** reducer = **22% ×** (lower of finance costs / profit-before-finance-costs / income above PA). higher wedge = 0.42·FC − 0.22·FC; additional = 0.47·FC − 0.22·FC; basic wedge = £0.

**Methodology options:** (a) manager-direct per-page targeted edits (most reliable — what WS-A used), or (b) build `scripts/track2_2027_framing_fix.wf.js` (Stage A surgical edit of tagged forward-looking lines only + Stage B adversarial verify that INDEPENDENTLY recomputes each example and confirms no current-year line changed), batch 8. Either way ADJUDICATE every flag.

**GOTCHAS (critical):**
- **Over-correction is the dominant risk.** Do NOT touch correct current-year (2026/27) "20% credit" statements (e.g. glasgow/newcastle/norwich say the reducer is "fixed at 20%" in CURRENT context — that is CORRECT, leave it). The scoper's `CORRECT_GUARD` already excludes pages that state "rises to 22 / property basic rate / no new wedge".
- **Scoper over-flags.** "two percentage points above the equivalent rates" is CORRECT (the rates are 2pp above standard) — not an error. The ENACT bucket mixes real "draft/awaiting" errors with the **benign residential-CGT-date** issue (see §4): for "Autumn Budget 2024"/"30 October 2024", only fix it where it is attached to the **property income rates** (22/42/47); leave it where it correctly describes the SDLT 5% surcharge or the CGT 18/24 change (those genuinely were the 30 Oct 2024 budget).
- After fixing: re-run the scoper (expect 0 real flags), re-run `track2_link_audit.py` (no new broken links), `cd Property/web && npm run build`, commit, deploy.

## 3. WORKSTREAM C — corpus-wide wrong-category link fix (deploy 3)
~224 remaining wrong-category 404 links + 10 nonexistent-slug links across the corpus (the 41 CityService + birmingham are already clean). **Tool:** `scripts/track2_link_audit.py` (authoritative; `dynamicParams=false` means a correct slug under the wrong category 404s). The deterministic fix = replace the category segment with the target slug's real frontmatter category (proven 404→200). Add a `--fix-wrong-category` mode to the auditor (the classify + frontmatter-category logic is already there). Hand-adjudicate the 10 no-file links (invented prefixes like `/blog/wave6-trusts/…`). Re-audit to **0 HARD**, build, deploy.

## 4. WORKSTREAM D — engine root-cause hardening (final; prevents recurrence)
- **slug→category resolver** (`optimisation_engine/blog_generator/slug_resolver.py`) as single source of truth; de-dup the slugify rule shared with `track2_link_audit.py` + `lib/blog.ts` (add a parity test).
- **Hard pre-deploy gate** (`scripts/predeploy_gate.py`, reuse the auditor): fail on any broken internal /blog link, pricing pattern (`£\d[-–]£?\d`, `£\d (per|/|a) (hour|month|year)`, `\d% of (the )?rent`), or em-dash. Wire as Step 0 in `scripts/deploy-and-index.ps1` + a root `package.json` `gate:property` script (NOT an npm prebuild hook).
- **Link-category emission fix** in `content_pipeline.py` (`_apply_post_processing` ~line 614 + the `links_block` ~line 287): a deterministic post-process that rewrites every /blog link's category via the resolver, plus a `normalise_links` stage in `track2_rewrite_writer.wf.js`.
- **Fold the independent-QA in as a MANDATORY pre-deploy gate** (`track2_independent_qa.wf.js`): add `arithmetic_recomputed[]` (independently recompute every worked example; disagreement = blocking), `statute_checks[]` (WebFetch each legislation.gov.uk cite; dead link or contradiction = blocking), `links_resolve`; a blocking verdict halts deploy.

## 5. Parked minor (task, non-blocking)
Residential CGT 18/24 date attribution: many pages say "since/following the Autumn Budget 2024 (30 Oct 2024)"; the residential higher rate actually fell 28%→24% on **6 April 2024** (F(No.2)A 2024). Rates are correct so non-blocking — fold into WS-B or a dedicated date sweep.

## 6. Deploy + verify
Build: `cd Property/web && npm run build`. Deploy (repo root): `VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH vercel deploy --prod --yes` (vercel CLI v50.1.2 present; aliases to www.propertytaxpartners.co.uk). `monitored_pages` rows already exist for CityService URLs — no re-insert. Verify a fixed page in prod with WebFetch after deploy.

## 7. Tools inventory
- `scripts/track2_2027_framing_scope.py` — 2027 error scoper (window-based, current-vs-forward, already-correct guard) → `docs/property/track2_2027_scope.json`.
- `scripts/track2_link_audit.py` — authoritative internal-link auditor (parses middleware maps + frontmatter categories; classifies ok/HARD/SOFT).
- `scripts/track2_fix_ittoia_citations.py` — the ITTOIA sweep (done; kept for reference).
- `scripts/track2_independent_qa.wf.js`, `scripts/track2_rewrite_writer.wf.js`, `scripts/track2_apply_lifts.wf.js`, `scripts/track2_triage.wf.js` — existing engine.
- Full plan (user-home, this session only): `C:\Users\user\.claude\plans\vast-booping-kite.md`.
