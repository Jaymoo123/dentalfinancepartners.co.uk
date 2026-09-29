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
