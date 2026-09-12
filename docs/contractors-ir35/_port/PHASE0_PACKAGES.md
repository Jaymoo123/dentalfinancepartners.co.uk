# contractors-ir35 port, phase 0 work packages (2026-09-12)

Site chosen by owner 2026-09-12. Family B, 62 posts, 34 route files, LIVE.
Preflight exit 0. No prior `_port/` artefacts. Nothing pushed, nothing deployed.

Launch list. Tick at close with a receipt per package (playbook T39).

| # | Package | Owner | Launched | Receipt |
|---|---|---|---|---|
| P0-A | Route/component inventory + per-page disposition list + capture surfaces + config reconciliation + nav IA | agent (Sonnet) | [x] | `P0A_INVENTORY.md`: 60 route files (34 pages), 35 components, 1 dead (`blog/ExitIntentModal.tsx`, zero importers), 10 LIVE capture surfaces, 62 posts, `schema` empty on 61/62 but renderer fallback handles it. Brief wrong on 2 counts: `niche.config.json` sits at site root not in `web/`, and `src/config/site.ts` is a pure pass-through so there is no dual-config reconciliation to do |
| P0-B | Link-floor baseline from the production SHA + build/serve gates | MANAGER (serialised build) | [x] | `P0B_DEPLOY_BASELINE.md` + `sweep_baseline.json`: prod SHA `18b4f25f`, build exit 0, server age-proved, title asserted, 157 URLs / 2755 internal links / 219 data-cta / 14 dashes. browser baseline running |
| P0-C1 | Claims audit, tier 1: figures, statistics, arithmetic, calculators AND their tests, vs house_positions; frontmatter + `schema:` JSON-LD included | agent (Opus) | [x] | `P0C1_CLAIMS_LEDGER.md`: 36 defects, 21 SERIOUS + 18 VERIFIED rows. Compute library `tax2026.ts` is CLEAN and matches house positions exactly; every error is in the prose around it. Worst density `content/resources/` (3 files, 11 defects, 6 serious). One quantity published as FIVE different values. A green test suite named "house position accuracy spot-checks" sits over a wrong LEL because it never asserts it |
| P0-C2 | Claims audit, tier 2: qualification/regulator/PI/regulated-work claims, our own pricing, turnaround promises, invented clients/testimonials/case studies, compliance copy vs code that runs | agent (Opus) | [x] | `P0C2_CLAIMS_LEDGER.md`: 63 rows, 24 SERIOUS (15 MUST GO, 9 REWORD, 21 OWNER DECISION, 18 OK). Currency is TWO representations (literal UTF-8 x3049 AND ASCII `GBP` x178 in 6 files); 16 turnaround promises in 12 files + 2 in web-shared; `/about` client-scale claim; privacy names two processors that do not run; site does NOT run GA yet publishes a GA opt-out section |
| P0-D | `globals.css` unlayered-rule audit, theming method, contrast hazards, header breakpoint set, anchor scroll offsets | agent (Sonnet) | [x] | `P0D_CSS_A11Y.md`: 3 unlayered blocks, none hazardous; 0 contrast failures; CTA breakpoint dead-zone 640-767px; 13 files var()-themed so instrument unsafe there; 9 charts hide data via role=img |
| P0-E | Crawl integrity: server-HTML href counts per index/hub vs corpus, dead internal links, redirect map vs corpus, `data-cta` inventory | agent (Sonnet) | [x] | `P0E_CRAWL_INTEGRITY.md`: `/blog` serves 12 of 62 articles (19.4%) behind client-side button pagination; 1 dead link (`glossary/[slug]/data.ts:27`); NO redirect map exists on this site so that brief item is N/A; 0 misspelled `data-cta` attributes (all 14 match the listener) |

Gate: C1 + C2 produce ONE ledger with a verdict per row and a deriving command per row.
Owner gate on the ledger. Serious tier fixed and committed BEFORE phase 1 starts.

| P0-C3 | Follow-up: `public/**` downloadable assets and machine-facing files, gap named by P0-C1 | agent (Opus) | [x] | `P0C3_PUBLIC_ASSETS.md`: 7 assets + 7 generated. **The brief's central premise was WRONG: the 3 workbooks are CLEAN**, every locked constant matches house positions, zero retired figures. The dirty half is the prose describing them. Hand-recomputed the model: outside £71,821, inside £69,890, gap **£1,931**, which VERIFIES the "£1,900 to £2,000" claim P0-C1 had listed among five rival values. 3 new non-numeric defects, 1 serious: both umbrella workbooks cite an "HMRC list" of compliant umbrellas that does not exist. `llms.txt` clean, all 60+ URLs resolve |

## Fix packages (serious tier, before phase 1)

| # | Package | Owner | Launched | Receipt |
|---|---|---|---|---|
| F1 | `content/resources/` wrong figures + statements of law, minimum-bytes fact fix only (owner ruled out rewrite) | agent (Opus) | [x] | |
| F2 | Figures consistency outside resources: the one-quantity-five-values class, take-home arithmetic, 19%-above-£50k worked examples, missing test assertions | agent (Opus) | [x] | |
| F3 | Turnaround promises (16 in 12 files), `/about` client-scale claim, homepage testimonial heading, stale counts | agent (Opus) | [x] | |
| F4 | Compliance copy vs code that runs: phantom GA opt-out section, two phantom processors, non-existent rubric, understated IP ingest | agent (Opus) | [x] | |

Owner ruling 2026-09-12: do NOT spend time fixing the downloadable workbooks. Their defects
are report-only and carried to the final report as open items.
