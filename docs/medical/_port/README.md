# Medical design port — programme artefacts

Owner decision 2026-09-10: Medical (Medical Accountants UK) ports to the Property standard.
Method: `docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Binding spec:
`docs/property/DESIGN_SYSTEM.md` §0 plus `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md`
appendices A to L. Reference to port FROM is `Property/web`, always; where the kit, the
generalist port and Property disagree, Property wins.

This is the programme's third port: generalist was the pilot, Solicitors was site 2.

Files here:
- `DISPOSITION_SLICE1.md` — chrome, homepage, blog subsystem. 33 chrome rows, the 15-section
  F.2 homepage anatomy mapped onto the 13 sections that exist, 88 posts / 8 hubs / 1 index.
- `DISPOSITION_SLICE2.md` — calculators, services, locations, the four `/for-*` audience
  pages, `/nhs-pension`, `/medical-guides`, `/free-practice-health-check`. 42 routes,
  10 generic + 8 premium tools, the ResultGate decision, per-route link-floor arithmetic.
- `DISPOSITION_SLICE3.md` — contact and post-submit, about, research, resources, legal,
  the interruptive stack, machine surfaces, `/admin`, instrumentation and guard tests,
  the retirement list.
- `LIVE_DEFECTS.md` — 27 defects that exist on the live site today and are NOT design work.
- `FUNNEL_BASELINE.md` — Phase-0 funnel evidence versus Property, post bot-gate only,
  every figure a fresh Supabase pull with its SQL inline.
- `link_baseline.json` — per-route unique-internal-link floor, captured from `next start`
  at the production SHA before the first port commit. sha + deriving command embedded.
- `sweep_baseline.json` — the raw sweep the link baseline was promoted from.
- `browser_baseline.json` — per route per width (390 / 768 / 1024 / 1440) contrast,
  overflow, anchor scroll-margin and console findings.

The site's brand layer lives one level up, at `docs/medical/DESIGN_DELTA.md`.

## Owner decisions taken 2026-09-10

1. Navy `#001b3d` + copper `#b87333` STAY as the brand. `Medical/niche.config.json`'s
   `#0891b2` cyan is the stale value and is reconciled to the CSS, not the reverse.
   Warning / duty / deadline semantics move OFF copper and never onto amber or orange.
2. The second typeface, Cormorant Garamond, is DROPPED. Plus Jakarta Sans only, as
   Property. 131 usages across 29 files (116 `font-serif` + 15 `display-serif`).
3. Footer sister-site cross-links REMOVED (`SiteFooter.tsx:12-35`, links to
   dentalfinancepartners and accountsforlawyers). Footer takes the kit/Property shape,
   columns derived from nav data. Verified to cost zero internal links: both are
   cross-domain, so they never counted toward the link floor.
4. A skippable calculator ResultGate ships on the 10 generic calculators.

## Manager decisions, recorded not asked

- Blog URLs stay FLAT (`/blog/<slug>`). Never break a live URL for aesthetics (§4.6.4).
- Nav IA authoring (`navigation[]` groups + the nav builder) is priced port work in
  Phase 1, per §4.6.10, not an improvisation.
- Kit components that hardcode Property's copy are mirrored LOCALLY. The kit is never
  edited to fix Medical: that changes Property and 14 other sites (playbook T12).
- Do NOT adopt the kit `FaqSection` on Medical. It is a Radix accordion without
  `forceMount`, so closed answers are absent from the pre-hydration HTML, whereas
  Medical's `<details>` and `<dl>` answers are fully server-rendered on 88 pages today.
  Adopting it would be a crawlability regression. This deliberately reverses the
  Solicitors call and is a sanctioned deviation, recorded in the DESIGN_DELTA.

## Phase-0 facts (2026-09-10)

- Production SHA (Vercel `targets.production`, project `medicalaccounts.co.uk`
  `prj_50vByZ3rqXQQwCUeENUTBbNBB41n`, `rootDirectory: Medical/web`):
  `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, readyState READY.
  Deriving command: `GET https://api.vercel.com/v9/projects?teamId=team_XF9WAygZX7SGk9Fo4tOAnihH&limit=100`
  with `Authorization: Bearer $VERCEL_TOKEN` (root `.env`), read
  `targets.production.meta.gitCommitSha`. `targets.production` is used deliberately
  rather than a deployments listing: the listing gives the most recent production BUILD,
  `targets.production` gives what the production alias actually serves, and a rollback
  makes those differ.
- `git log 18b4f25f..HEAD --oneline -- 'Medical/'` = **0 commits**. Nothing
  Medical-owned is committed-but-undeployed.
- `git log 18b4f25f..HEAD --oneline -- 'packages/web-shared/'` = **10 commits**, all from
  the generalist port. Two touch modules Medical actually imports:
  `components/ServiceTiers.tsx` (`app/page.tsx:11`, `app/services/page.tsx:9`,
  `config/service-tiers.ts:1`) and `tools/components/Calculator.tsx`
  (`components/tools/CalculatorClient.tsx:15`). They MUST be named in the cutover
  annotation because they ship with this site's next deploy. `Calculator.resultWrapper`
  (identity default at `Calculator.tsx:42`, applied at `:122` to the result column only)
  is the exact hook Phase 4's ResultGate needs, already built, no kit edit required.
- Armed `monitored_pages`, both predicates stated because they disagree:
  `monitor_until > now()` = **1 row** (`__home`, status `flagged`, window to 2026-10-06);
  `monitor_until >= current_date` = **19 rows**, the extra 18 being windows that expire
  TODAY, 2026-09-10. 19 is every row this site has. The estate-canonical predicate has NO
  status predicate: 3 of the 19 are status `flagged`, which the old active-only filter
  silently excused, and flagged marks an OPEN regression. By cutover the 18 will have
  closed, so the cutover re-baselines roughly ONE row. Re-derive on the day.
  Note separately: wave C shipped 2026-09-02 and was never registered in
  `monitored_pages`, so those pages are live but unscored. That is a pre-existing gap,
  not something the port creates.
- Kit design consumption before the port: ZERO
  (`grep -rn "web-shared/design" Medical/web/src` = empty). This port is the design
  kit's third consumer, after generalist and Solicitors.
- Corpus on disk and in the sitemap, both counted at source: **88 blog markdown files**,
  87 of them in the sitemap; the 88th
  (`private-practice-incorporation-complete-guide`) is deliberately 301'd to
  `medical-practice-incorporation-step-by-step` by `src/middleware.ts:21` and correctly
  excluded. 8 category hubs, 10 generic calculators, 8 premium, 5 locations, 4 `/for-*`
  audience pages, 6 medical guides, 3 resource topics. **Build at 18b4f25f: exit 0.
  Sitemap and sweep agree at 138 URLs.**
- Link-floor baseline: **138 routes, 3,836 unique internal links, 308 `data-cta`,
  59 rendered em/en dashes across 8 routes.** Chrome floor is 17 links; no route
  renders zero. Full sweep (`--sample=9999 --article-depth=2`; Medical's blog is FLAT,
  so depth 2, not the default 3).

## Process notes worth keeping

- **The sweep trap fired again, and was caught by the assertion the Solicitors run added.**
  The first `next start` was issued on port 3131, which was already serving the
  Solicitors site; the bind failed silently and the served `<title>` came back as
  "Accountants for Solicitors UK". 3111 and 3121 were also occupied by earlier ports.
  Medical was captured on 3141 after asserting the title read "Specialist Medical
  Accountants & GP Accountants | UK". **Assert the served `<title>` before trusting any
  sweep.** It has now saved a measurement on two consecutive sites.
- **A carve-out to protect, §4.6.1.** All 88 posts carry `keyTakeaways` (rendered,
  `BlogPostRenderer.tsx:87`) and all 88 carry `imageCredit` (`grep -rn imageCredit
  Medical/web/src` = **zero consumers**: authored attribution data that reaches no
  page). Dropping either in the port is a fidelity failure no gate would catch, because
  neither is a link. The `imageCredit` gap is pre-existing and is logged as a defect.
- Medical is the estate's second-best converting site, not a broken funnel. That reframes
  the port: it is protecting something that works, not repairing something that does not.
