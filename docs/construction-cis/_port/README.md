# Trade / construction-cis design port — programme artefacts

Owner decision (`docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §9, "Recommended sequencing",
item 2): construction-cis is **Pilot B** — "healthy, mid-size, representative family B. This
validates the port recipe on a full existing page set with the link floor." Method:
`docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Binding spec: `docs/property/DESIGN_SYSTEM.md` §0
plus `PROPERTY_STANDARD_ROLLOUT.md` appendices A to L. Reference to port FROM is
`Property/web`, always; where the kit, prior ports and Property disagree, Property wins.

This is the programme's fourth port: generalist was the pilot, Solicitors was site 2,
Medical was site 3.

Files here (planned, not yet written):
- `DISPOSITION_SLICE1.md` — chrome, homepage, blog subsystem (section-by-section, exact classes)
- `DISPOSITION_SLICE2.md` — calculators, trade pages, locations (ResultGate port decision,
  per-route link-floor arithmetic)
- `DISPOSITION_SLICE3.md` — contact/post-submit, about, glossary, resources, legal, the
  interruptive stack, brand layer + measured contrast, instrumentation + guard tests
- `LIVE_DEFECTS.md` — defects that exist on the live site today and are NOT design work
- `FUNNEL_BASELINE.md` — Phase-0 funnel evidence versus Property, post bot-gate only,
  every figure a fresh Supabase pull with its SQL inline
- `link_baseline.json` — per-route unique-internal-link floor, captured from `next start`
  at the production SHA before the first port commit; sha + deriving command embedded
- `sweep_baseline.json` — the raw sweep the link baseline is promoted from
- `browser_baseline.json` — per route per width (390 / 768 / 1024 / 1440) contrast,
  overflow, anchor scroll-margin and console findings

The site's brand layer will live one level up, at `docs/construction-cis/DESIGN_DELTA.md`
(not yet written).

## Owner decisions taken 2026-09-11

(a) Brand orange `--accent: #f97316` STAYS unchanged as this site's primary. The estate's
    warning/penalty semantics move OFF orange (same collision the generalist port resolved
    for this exact colour — `PROPERTY_STANDARD_ROLLOUT.md` §8 decision 3 names it "the
    construction-cis way").
(b) All six phases run. Deploy is owner-gated and explicitly NOT in scope for this port.
(c) **Gate W1, carried as a recommendation, K-blocker pending explicit confirmation:**
    adopt Medical's three-step warning ladder verbatim — red-600 `#dc2626` / purple-700
    `#7e22ce` / indigo-700 `#4338ca`, on-dark twins red-400 `#f87171` / purple-400
    `#c084fc` / indigo-400 `#818cf8`, plus `--form-error #b91c1c` — because red alone
    cannot express four escalating severity steps (CIS deduction rate change, GPS
    application deadline, penalty escalation, refund-claim time-bar). NOT yet confirmed
    by the owner; do not build against it until it is.

## Phase-0 facts (2026-09-11)

- **Production SHA** (Vercel `targets.production`, project `trade-tax-specialists`
  `prj_zaehvfgdTKx0Ftc8GQVedmRnjp4g`, `rootDirectory: construction-cis/web`, confirmed by
  name search against `trades-quotes`, a different project with `rootDirectory: null`):
  `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, readyState READY.
  `sha_deriving_command`: `curl -s "https://api.vercel.com/v9/projects?teamId=$VERCEL_ORG_ID&limit=100" -H "Authorization: Bearer $VERCEL_TOKEN"`,
  filter the response to the project whose `rootDirectory == "construction-cis/web"`, read
  `targets.production.meta.gitCommitSha`. `targets.production` used deliberately, not the
  deployments listing, for the same reason as the Medical and generalist ports: a rollback
  makes them differ and the target is what the alias actually serves.
- **Deploy-drift check**, both from repo root:
  - `git log 18b4f25f..HEAD --oneline -- 'construction-cis/'` = **0 commits**. Nothing
    construction-cis-owned is committed-but-undeployed.
  - `git log 18b4f25f..HEAD --oneline -- 'packages/web-shared/'` = **12 commits**
    (generalist port phases + two Solicitors Phase-1 fixups `cb041c9d`/`75d9f48f`-line
    work + one cross-consumer restore `0f4de663`). Files touched:
    `components/ServiceTiers.tsx`, `design/blog/BlogCategoryHub.tsx`,
    `design/blog/HubArticleList.tsx`, `design/chrome/SiteFooter.tsx`,
    `design/chrome/SiteHeader.tsx`, `design/layout-utils.ts`,
    `design/marketing/StatsCounter.tsx`, `design/primitives/ExampleFigureNote.tsx`,
    `design/primitives/FaqSection.tsx`, `package.json`, `tools/components/Calculator.tsx`.
    construction-cis imports two of these today: `ServiceTiers.tsx` (`app/page.tsx`,
    `app/services/page.tsx`, `config/service-tiers.ts`) and `tools/components/Calculator.tsx`
    (`components/calculators/CalculatorClient.tsx`). No chrome, blog, or layout-utils kit
    consumption yet — this site is still pre-port for those surfaces.
  - **Conclusion: working tree == production for construction-cis's own files; two
    web-shared files it imports have moved underneath it and will ride the next deploy.**
    Same shape as Medical's Phase-0 finding, same two files.
- **monitored_pages**, both predicates checked, they AGREE here (unlike Medical, where they
  disagreed): `site_key=eq.construction-cis&monitor_until=gt.now()` = **15 rows**;
  `site_key=eq.construction-cis&monitor_until=gte.2026-09-11` (current date) = **15 rows**;
  unfiltered row count for the site = **15 rows** — every row this site has is currently
  armed under either predicate. Breakdown: 8 `active`, 7 `flagged`, all windows to
  `2026-10-06`. SQL run (via Supabase REST, `Prefer: count=exact`):
  `select id, status, monitor_until from monitored_pages where site_key = 'construction-cis' order by monitor_until` —
  and the two count-only variants
  `...&monitor_until=gt.now()` / `...&monitor_until=gte.2026-09-11`.
- **Corpus, counted at source:**

  | Item | Count | Command |
  |---|---|---|
  | Blog markdown files | 82 | `find content/blog -name "*.md" \| wc -l` |
  | Trade types (`src/data/trade-types.ts`) | 47 | `grep -c 'slug:' src/data/trade-types.ts` |
  | Calculators (`src/lib/calculators/registry.ts`) | 12 (0 bespoke + 12 generic) | read `BESPOKE`/`GENERIC` arrays directly |
  | Glossary terms (`src/app/glossary/[slug]/data.ts`) | 50 | `grep -c '^\s*term: "' src/app/glossary/[slug]/data.ts` |
  | Locations (`src/app/locations/[slug]/data.ts`) | 25 | `grep -c '^\s*"slug": "' src/app/locations/[slug]/data.ts` |
  | Resource topics with a published file (`content/resources/`) | 3 (`cis-refund.md`, `cis-vs-paye.md`, `gross-payment-status.md`) | `ls content/resources` cross-checked against `publishedGuideTopicsWithFile()` in `src/lib/resources/content.ts` (4 topics enabled in the registry, only 3 have a file on disk — same enabled-but-no-file gap shape as elsewhere in the estate) |

  Cross-checked against `src/app/sitemap.ts`: it builds routes from the same five sources
  (`tradeTypes`, `getAllPosts()`, `allTools()`, `GLOSSARY`, `CITIES`) plus
  `publishedGuideTopicsWithFile()`, so the sitemap count is not an independent check, it is
  the same data re-read — no discrepancy possible by construction, and none found.

  **Delta against `docs/construction-cis/STATE.md` (confirmed STALE, last updated
  2026-06-16):**

  | Claim in STATE.md | Actual on disk (2026-09-11) |
  |---|---|
  | "Trade pages = 15" / "10 static `/for/[type]` trade pages" | **47** |
  | "Calculator fleet live (8 tools)" | **12** (0 bespoke, all generic) |
  | "35 blog pages" | **82** |
  | No glossary, locations, or resources corpus mentioned | **50 glossary terms, 25 locations,
    3 published resource guides** — all three surfaces did not exist, or were not counted,
    at STATE.md's last update |
  | "227 routes" (2026-06-16 deploy figure) | not independently re-derived here; the
    per-surface counts above already show the corpus roughly tripled since that figure was
    taken, so 227 should be treated as stale too, not re-used as a route-floor baseline |

## What was found to be FALSE in this brief

Nothing in the brief's premises was false. The Vercel project name (`trade-tax-specialists`),
the credential locations, the Supabase project ref, and the "STATE.md is stale" warning all
checked out exactly as stated.

## What could not be done

Nothing was skipped. `python3` is not installed in this shell (Microsoft Store alias only);
substituted `node` for the one JSON-parsing step (deriving the production SHA from the
Vercel API response) with no loss of fidelity.
