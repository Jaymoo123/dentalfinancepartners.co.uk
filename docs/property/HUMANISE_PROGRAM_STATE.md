# Property — Humanise Program State

Per-site state for the [Humanise Engine](../_engines/HUMANISE_PROGRAM.md). The engine doc is the HOW; this is the WHERE-WE-ARE for Property. Voice rules: [VOICE_STANDARD.md](../_engines/VOICE_STANDARD.md).

## Heartbeat (newest first)

- **2026-06-06** — Engine built (Phase A). `voice_scan.py` (detector + property `voice` config), `voice_safety_diff.py` (fact guard), `VOICE_STANDARD.md`, engine + state docs landed and committed on branch `property-humanise`. Baseline corpus scan: **686 pages -> clean 39 / minor 324 / robotic 303 / severe 20** (actionable robotic+severe = 323). Manifest: `optimisation_engine/.cache/voice_scan_property.json`. Next: build `voice_rewrite.wf.js` + conductor, then proof batch + voice sign-off.

## Where we are now

- **Phase:** A (build + calibrate) -> moving to the workflow, then B (proof batch + sign-off).
- **Worktree:** `C:/Users/user/Documents/Accounting-wt-property-humanise` (branch `property-humanise`, pushed to origin). `.env` copied in.
- **Scope:** Property only (user decision 2026-06-06). Voice-first, protect depth. Order: worst-scored among real-traffic pages.
- **Deployed:** nothing yet (local-first; deploy gated on explicit user sign-off).

## Exclusion set (do NOT humanise these — concurrent agent)

A second agent is actively working on **Section 24 blogs, calculators, and dashboards** in the MAIN tree on `property-calculators-and-geo` (user note 2026-06-06). To avoid file conflicts:
- Skip every Section 24 blog page (slug contains `section-24` / `section24`, or category "Section 24 & Tax Relief"). Re-check the live category before processing any borderline page.
- Calculators/dashboards are not blog `.md` and are out of scope anyway.
- Use a non-Section-24 page as the voice calibration control (the DTA page is the stable anti-pattern control; pick a tight non-S24 page as the positive control).

## How to resume (fresh agent, context filled)

1. Read `docs/_engines/HUMANISE_PROGRAM.md` (esp. §3 the per-page loop and §5 resume), `docs/_engines/VOICE_STANDARD.md`, and this file.
2. `git -C C:/Users/user/Documents/Accounting-wt-property-humanise status` — confirm you are in the worktree on `property-humanise`.
3. `python scripts/voice_scan.py --all --site property` — refresh the manifest.
4. Build the worklist: manifest pages band>=robotic then minor, ordered (has GSC impressions desc, robot_score desc); subtract the exclusion set above and every slug already `done`/`escalate` in `humanise_tracker.md`.
5. Run the per-page loop on the top slug; commit + push on `done`; update `humanise_tracker.md`. Repeat.
6. Update this heartbeat before stopping.

## Corpus snapshot (2026-06-06 baseline)

- 686 pages total. Worst examples: VAT/option-to-tax/IHT/FIG/MTD deep-dives heavy on abstract-noun voice; `commercial-property-fixtures-claim-s198-...` leaks "bucket sibling page C5" / "fixtures-acquisition cluster"; `double-taxation-agreement-uk-and-isle-of-man` is the meta-commentary anti-pattern.
- The full ranked list with per-signal counts is in the manifest, not duplicated here.
