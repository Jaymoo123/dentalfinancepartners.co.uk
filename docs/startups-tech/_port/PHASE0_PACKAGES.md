# startups-tech port, phase 0 package list

Written BEFORE launch (playbook T39: a package is not complete because you remember
launching it). Tick each off at close with a receipt. Owner go for the port: 2026-09-29
("yes go, header and footer fine, no phone number yet").

Pre-port build: `startups-tech/web/.next` built 2026-09-28 23:05 from the working tree at
`4e870daa` (last source change), nothing under `web/src` newer than `BUILD_ID`. Server:
`next start -p 3201`, identity asserted (`<title>Founder Tax Partners | Accountants for Funded
and Scaling UK Startups</title>`). Production SHA for the baseline: `eeb3dbef`
(`git rev-parse --short origin/main`); local `main` is 79 commits ahead and unpushed, so the
live site is OLDER than this build (the estate parity phase 0 and its recheck are not deployed).

Site facts derived before launch: 30 public `page.tsx`; 32 flat markdown posts under
`web/content/blog/` (route `/blog/[category]/[slug]`); 7 `/for` + 8 `/services` slugs; 4
calculators; 8 test files; brand `#4f46e5` indigo (`niche.config.json` `brand.primary_color`);
`@source "../../../../packages/web-shared"` and `prose-standard.css` already imported in
`globals.css`; Tailwind 4.3.0; **NO chrome at all** (no header, footer, `PageShell` or
`components/layout/`; `layout.tsx` renders providers + children), so phase 1 is NET-NEW
construction from the kit, not a replacement; `niche.config.json` already authors
`navigation` (7) and `footer_links` (9) that nothing consumes; `cta.sticky_*` strings exist;
`source_identifier` is NOT in `niche.config.json` (P0-E derives the lead source key from
`web/src/config/site.ts`); phone number is the placeholder `+44 20 0000 0000` and the owner has
ruled the header carries NO phone number.

| pkg | scope | model | output | status |
|---|---|---|---|---|
| P0-A | claims and ground-truth audit, repo source, whole site, by rule (§2.1, §10.7) | Opus | `P0A_CLAIMS_LEDGER.md` | DONE, 27 rows, 7 serious |
| P0-B | rendered-HTML sweep against the served build (config-injected copy, JSON-LD parse and agreement with visible page, FAQ pairs, canonical per family, index crawlability, dead classes) | Sonnet | `P0B_RENDERED_SWEEP.md` | DONE, 68 URLs, 3 serious |
| P0-C | CSS, token and contrast audit (unlayered rule walk, bare `var()` reads, composed-override order, brand `#4f46e5` one ratio three verdicts on every ground it is used on, `layout-utils.ts` divergence from the kit) | Sonnet | `P0C_CSS_TOKEN_AUDIT.md` | DONE, brand 6.29:1 clears all three floors |
| P0-D | instrument baseline capture (`sweep.mjs`, `browser_check.mjs`, `cta_snapshot.mjs` against :3201) | Sonnet | `P0D_BASELINE.md`, `sweep_baseline.json`, `browser_baseline.json`, `cta_baseline.json` | DONE (sweep writes `sweep_baseline.json`, not `link_baseline.json`) |
| P0-E | structural live-defect and disposition inventory (chrome contract for phase 1 incl. the six kit-chrome props, `<main>`/skip-link census, dead links, anchors, FAQ mechanism, a11y, interruptions, `dangerouslySetInnerHTML` sites for T12, kit components usable vs declined) | Sonnet | `P0E_STRUCTURAL_INVENTORY.md` | DONE, 30 routes, 10 T12 decline sites |
| P0-F | serious-tier FIX wave, derived from A+B+C+D+E after the owner gate | 4 Sonnet (F1 copy/config/legal, F2 schema/metadata, F3 instrument findings, F4 og:image mop-up + hydration) | commit, tag `port-startups-tech-phase0` | DONE |
| P0-G | rule-based re-sweep proving zero hits per rule, after P0-F | manager, deterministic | sweep.mjs + browser_check.mjs compare + curl per fix | DONE, see close block |

Phase 0 closes when: every ledger row is graded, the serious tier is fixed and committed,
and the owner gate on the ledger is cleared. Phase 1 does not start before that.

Locked for this port (owner 2026-09-29): header and footer appear on every page for the first
time; no phone number in the header; prose untouched (owner ruling 2026-09-28); deploy parked.

## Phase 0 close (2026-09-29, manager)

Owner gate on the ledger, 2026-09-29: the three estate-wide serious rows (B1/B2 composite
testimonial standfirst, F1 retention sentence vs dormant purge, F2 cookie policy vs consented
GA4/AdSense) are LEFT AS THEY ARE by owner decision ("I just don't think these issues are
particularly important"). C1 to C3 and D1 (24-hour promises) and F5 (rubric) left as Property has
them. Site-local serious rows A1, B3, B4 fixed; CORRECT IN PLACE rows E1, E2, E3, F4 fixed; F3 left
(GA4 is being wired estate-wide).

Fix wave receipts (4 Sonnet agents, disjoint files): A1 entity.firm superlative corrected; B3 eight-week
clause removed; B4 SMS outcome claim removed; E1 one Organization node under `#organization` (page node
is now an `@id` reference stub, layout node keeps every field); E2 `priceRange` removed; E3 llms-full
no longer claims BlogPosting; F4 duplicate cookie-policy block removed; keyTakeaways renderer now
renders authored HTML (5 posts fixed by one change); research title suffix no longer doubled (5
pages); dead `/blog/uk-startup-grants-landscape` link corrected; og:image on all 14 URLs that lacked
it (the layout default is dropped by any page that sets its own `openGraph`; 7 pages given `images`);
`(HP3)` pipeline code removed from the R&D estimator notes and its pinning test; research fine print
`text-neutral-400` to `-500`; the four research pages' embedded LeadForm wrapped in a white card
(was 1.12:1 on the dark band); `scroll-mt-24` on 8 anchor targets; hydration #418 root cause =
React 19 hoists SVG `<title>` children to head, fixed by `title` attributes on the chart rects
(`TechFundingReliefsCharts.tsx`).

Deterministic re-check on the rebuilt site (`next start -p 3201`, build PASS, tsc clean, vitest 75/75):
`sweep.mjs` 66/66 URLs clean, 0 dead internal links (baseline 1), 0 link-floor breaches, 0 dash
regressions; `browser_check.mjs` 152 page-loads: contrast failures 200 to 16 (all on
`/research/startup-formation-survival-index`, 12px footnote markers at 3.09 and one 12px td at 4.24,
left for the research template phase), overflow 0, anchor gaps 32 to 0, console/page errors 9 to 0
(hydration gone), one transient navigation timeout on `/for`@390 that reloads at 200 with scrollWidth
390; curl: 0 doubled titles, 14/14 og:image, 0 raw `<sup>` text, 0 `(HP` codes, 0 `priceRange`, 1
visible "First-party analytics" heading, 0 SVG `<title></title>`.

Known, deferred to phase 1 (tokens and chrome): undefined `primary-*` ramp (kit badge renders
uncoloured on 5 pages), no header/footer so `/about` and `/contact` have a same-site link floor of 0,
no `<main>` on 12 routes, no skip link, no logo asset, zero `data-cta` instrumentation on the site.
Agents used in phase 0: 5 audit + 4 fix = 9 (plan estimate was 4 + fix wave).
