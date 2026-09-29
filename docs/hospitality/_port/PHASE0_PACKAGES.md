# hospitality port, phase 0 package list

Written 2026-09-29 at launch (playbook T39). Owner go for the whole programme, 2026-09-29:
"yeah let's go for everything, we're not deploying but we do everything". Deploy stays parked.

Pre-port build: `hospitality/web/.next` rebuilt 2026-09-29 from the working tree at `7e2575c4`
(kit at `4a267372`), served on `next start -p 3202`, identity asserted (`<title>Specialist
Hospitality Accountants UK`). Production SHA for the baseline: `origin/main` (local `main` is
about 100 commits ahead and unpushed, so the live site is OLDER than this build).

Site facts derived before launch: 30 `page.tsx` (25 public, 5 admin); 59 public URLs, sitemap
agrees; 23 flat markdown posts in 8 categories; 6 `/for` + 5 `/services`; 3 calculators on the
kit `Calculator`; 3 research pages + index; brand `#b0532f` (5.09:1 on white, clears all three
floors; 3.51 on slate-900, answered by `--calc-result-accent`); Plus Jakarta Sans; kit
`SiteHeader` already mounted through `SiteHeaderWrap.tsx` (2026-09-28 parity), local
`SiteFooter`; no `@theme` ramp so the kit `LeadCTAPanel` badge renders uncoloured on 4 pages;
two grey ramps (`neutral-*` in 23 files, `slate-*` in 6); `layout-utils.ts` is a hand-rolled
fork hardcoding three hexes; four-marker homepage row 0/0/0/0; pre-port CTA triple
`header_book|header|form` on all 59 routes (kit header emits it; `src` grep cannot see it).

| pkg | scope | model | output | status |
|---|---|---|---|---|
| P0-A | claims and ground-truth audit, whole site, by rule | Opus | `P0A_CLAIMS_LEDGER.md` | DONE, 34 rows, 9 serious (7 owner-ruled, 3 fixable + 2 client-outcome clauses) |
| P0-B | rendered-HTML sweep, 70 URLs touched, 62 swept | Sonnet | `P0B_RENDERED_SWEEP.md` | DONE, 15 findings, 4 serious; its "no BreadcrumbList on services/for" was a check error |
| P0-C | CSS, token and contrast audit | Sonnet | `P0C_CSS_TOKEN_AUDIT.md` | DONE, 15 findings, 6 serious, all phase 1 except the admin login ring |
| P0-D | instrument baseline (`sweep`, `browser_check`, `cta_snapshot`) | Sonnet | `P0D_BASELINE.md` + 3 JSON | DONE, 59 URLs, 3 dead links, 235 contrast, 0 overflow, 171 console, 59 CTAs |
| P0-E | structural and disposition inventory, section 8 parameters | Sonnet | `P0E_STRUCTURAL_INVENTORY.md` | DONE, 59 routes, 23 posts; its "research `<main>` = 0" was wrong (nested on 3) |
| P0-F | serious-tier fix wave | 3 Sonnet (F1 copy/data/research/homepage, F2 schema/templates/structure, F3 instrument findings + leftovers) | commit, tag `port-hospitality-phase0` | DONE, see close block |
| P0-G | deterministic re-check on the rebuilt site | Sonnet | `P0G_RECHECK.md` | see close block |

Owner gate on the ledger: the seven estate-wide rows (composite testimonial standfirst B1/B2,
retention sentence F1, cookie policy vs AdSense F2, 24-hour promises, rubric) LEFT AS IS under
the 2026-09-29 startups-tech ruling. Site-local serious rows fixed minimally: B3 and B5 (two
client-outcome clauses deleted, the sentences otherwise untouched), G1 (Tips Act date in
`llms.txt` and one post), G2 (VAT checker hot-food test, two places), E1 (blog FAQs rendered
from the same frontmatter the FAQPage schema already asserted, kit `FaqSection` with
`alwaysRenderAnswers`).

Every changed sentence is listed in the F1 receipt (14 items) and reproduced in STATE.md.

## Phase 0 close (2026-09-29, manager)

Commit `36d2b4fe`, tag `port-hospitality-phase0`. Re-check `P0G_RECHECK.md` on the rebuilt site:
sweep 59/59, dead links 3 to 0, link floor held on every route, em-dashes 0; browser_check
contrast 235 to 219 (the 16 LeadForm failures gone; the 219 left are the header CTA white on
white and the consent toggle in the local footer, both replaced in phase 1), overflow 0, anchor
gaps 0, dead-link 404s 12 to 0; CTAs 59 on the one pre-port triple `header_book|header|form`.
Curl proofs 14 of 15 PASS; the one FAIL (h1 to h3 jump on the three calculator pages) predates
the wave, was filed by P0-E, and is phase 4's template work. Residual for phase 1: the two chrome
contrast groups, no skip link, no `primary-*` ramp. Residual for the OWNER: 152 to 164 console
errors per run are AdSense creatives opening a frame from `pagead2.googlesyndication.com`,
refused by the kit CSP `frame-src` (`packages/web-shared/lib/security-headers.ts`); the fix is one
allowed host and it is estate-wide, so it is his call (the session classifier refused it as a
security weakening).

Agents used in phase 0: 5 audit + 3 fix + 1 re-check = 9.
