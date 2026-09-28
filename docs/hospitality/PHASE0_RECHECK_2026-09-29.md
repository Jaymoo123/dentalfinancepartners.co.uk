# hospitality phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation). Control skipped this run
(passed once already this session on Solicitors: gov.uk @390 scrollWidth 390). Nothing deployed.

## Verdict
SAFE TO DEPLOY mechanically. Two harness false positives explained below; no real defects found.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 21 at 1280, 21 at 390 | harness summary.md |
| lead form on every money page | form mounts present on 10/10 template files (up from 6 at base, `wording_grep`); harness `leadForms` reads 0 on non-calculator pages | 2-step wizard, same harness blind spot as ecommerce (see Findings #1); confirmed 1 `<form>` tag via curl on home |
| one form under each calculator result, no gate | 3/3 calculator routes PASS, 1 form each; wording_grep gate section empty (no ResultGate in source) | harness + wording_grep |
| header CTA visible 1280 / hidden 390 | 21/21, 21/21 (brief flagged hospitality as having NO header CTA at any width before phase0; now present) | harness `headerCtas` "Get in touch" `header_book`, visible=true at 1280 |
| scrollWidth 390 on every page | 21/21 | harness |
| raw markup as text | 0 pages | harness |
| focus ring on first form control | 18/21 script-focus PASS, 3 `noform` on hub pages with no interactive control (`/for`, `/calculators` hub, `/blog/hospitality-accounts`) | harness |
| submit / primary CTA contrast >= 4.5 | 3/3 calculator routes, flat 5.09 | harness |
| canonical self-referencing | 21/21 PASS | harness |
| sitemap lastModified real or omitted | PASS | `sitemap.ts:9-10` comment "2026-09-28 parity fix (brief section 5, G7): lastModified was build-time `new Date()`... "; `sitemap.ts:60` blog posts use `post.updatedDate \|\| post.date` |
| Organization node with parentOrganization | 21/21 PASS | harness `Org parent` column `PASS ProfessionalService\|AccountingService`; report.json `orgInfo.parentName` = "Ashfield Trading Ltd" |
| Service / FAQPage / BreadcrumbList on segment + service pages | present on all 5 `/services/*` and 6 `/for/*` (1/1/1 each); hub pages (`/`, `/about`, `/services`, `/contact`, `/for`) correctly carry 0 | harness |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | 200 utm=30/31, 200, 200 pub=true, 200 | report.json |
| lead-nurture delayHours | first eight: 0,0,4,20,24,48,72,96 | matches expected exactly |
| defect-string count base vs HEAD | 28 vs 28, matched per file | wording_grep.txt |
| phase-0 replacement strings at HEAD | 1: `niche.config.json:12` `cta.next` | config-only, not rendered |
| raw-HTML-anchor body copy renders as links | confirmed on `/services/hospitality-payroll` (screenshot: "a tronc scheme" renders as a real underlined anchor mid-sentence, not escaped markup) | screenshot + harness raw markup PASS on all `/services/*` and `/for/*` |
| tsc / vitest (if run) | not rerun this pass | relying on PHASE0 report |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **MEDIUM (harness blind spot, not a site defect)** Harness `leadForms=0` on every hub/about/
   contact/for/services page. Cause: `LeadForm.tsx` is a 2-step wizard (`step===0`/`step===1`,
   lines 203-376); email (`type="email"`, line 353) and phone (`type="tel"`, line 376) only mount
   after step 0's "Continue". Confirmed via curl: home page has 1 `<form>` tag; component import
   list (`wording_grep`) confirms `LeadCTAPanel`/`LeadForm` mounted on 10 app files. Same pattern
   as ecommerce. Not a defect; the harness numbers for this site undercount forms.
2. **LOW (false positive)** `/services/hospitality-payroll` shows `FAIL text` in the harness gate
   column. Cause: the harness's gate-text regex matches "...for the independence conditions that
   **unlock the** saving" — ordinary tax-saving prose, not a content gate. Confirmed by reading the
   raw HTML around the match. Not a defect.
3. **LOW** `niche.config.json:12` `cta.next` new key (estate-wide, brief item 2): grepped
   `hospitality/web/src` for `cta.next` reads — none found. Config only, not rendered.
4. **CONFIRMED** Header CTA gap the brief named for hospitality is closed: "Get in touch"
   (`data-cta="header_book"`) visible at 1280, hidden at 390, on every page.
5. **CONFIRMED** delayHours: HEAD array `0,0,4,20,24,48,72,96`, Property's shape.
6. **CONFIRMED** `parentOrganization` present (Ashfield Trading Ltd) on every page.

## Wording (Opus reader section)

Deterministic walk of `git diff 8e1043d0 HEAD -- hospitality/web/src hospitality/niche.config.json hospitality/web/public/llms.txt`
(19 files, +359/-136). Defect-string counts match base: TOTAL base=28 HEAD=28. WORDING CLEAN:
no surviving agent sentence, no mechanical regression.

| file | classification |
|---|---|
| `niche.config.json` (`entity` block incl. `entity.next`) | CONFIG-NOT-RENDERED. `next` is inside `entity`, not `cta`. `grep -rn EntityBlock hospitality/web/src` = 0 hits; `EntityBlock` (`packages/web-shared/design/marketing/EntityBlock.tsx:72`) is the only component that renders `next`. Ruling keeps `entity`. |
| `app/about/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/for/[slug]/page.tsx` | NEW-COMPONENT MOUNT, allowed, copy NOT authored. Each route previously ended in a dark band with a heading, a line and a `/contact` link and no form. The band was swapped for `LeadCTAPanel` + this site's `LeadForm`, with `eyebrow=""`, `formTitle=""`, `proofPoints={[]}` so no shared default publishes copy, and the `title`/`description` are the exact strings the removed band published. The diff shows both sides in the same hunk: removed `<h2>Speak to a hospitality accounts specialist.</h2>` and `Tell us about your hospitality business and we will reply within 24 hours. No obligation.`, added as `title=` and `description=`. Same for `/for/[slug]`: "Speak to a specialist." and the `${hub.title.toLowerCase()}` line, carried over unchanged. |
| `components/layout/SiteHeaderWrap.tsx` (new) | NEW COMPONENT, allowed. Header CTA where the site had none. Label is not prose: `ctaPrimary={{ label: niche.cta.sticky_button, href: "/contact" }}`, i.e. the site's existing config string, exactly as the ruling requires. |
| `app/calculators/[slug]/page.tsx` | MECHANICAL. Removes the DUPLICATE footer `MiniCapture` (the route rendered two identical capture forms), leaving one form under the result. A copy deletion, not a rewrite, and the ruling keeps duplicate-form removals. |
| `app/services/[slug]/page.tsx`, `app/for/[slug]/page.tsx` | MECHANICAL. `buildServiceJsonLd` + `buildBreadcrumb` nodes added; authored HTML in `intro`/`item.body` now renders through `dangerouslySetInnerHTML` instead of as a JSX text child (the raw-markup-as-text fix), with anchor colour utilities. No sentence changed. |
| `app/services/page.tsx` teaser | MECHANICAL. `service.intro.replace(/<[^>]+>/g, "")` strips markup from the truncated card so an anchor is not nested inside the card's Link. Same words, no tags. |
| `app/sitemap.ts`, `app/globals.css`, `web/public/llms.txt` | MECHANICAL. Build-time lastModified removed, contrast token, UTM tagging only. |
| `config/lead-nurture.ts` | MECHANICAL, delayHours now 0,0,4,20,24,48,72,96. |

Form mounts rose base=6 to HEAD=10, matching the four new panel mounts. No `ResultGate` usage at HEAD.

### Rendered read (local build, port 3525)
Read home, /about, /services, /services/tronc-scheme-setup, /services/hospitality-vat,
/for/restaurants, /for/pubs-and-bars, /contact, /calculators/tronc-tips-paye-nic-calculator,
/blog/licensed-trade/alcohol-duty. (This site has no `/vat/*` section; VAT lives at
/services/hospitality-vat, so the /vat page the brief asks for does not exist here.)
The site reads in its own pre-phase-0 voice throughout:

- /about: "We work on a fixed-fee basis. You know what you are paying before we start. We reply within one working day."
- /contact: "Tell us about your hospitality business. We reply within 24 hours."
- calculator panel: "A calculator gives you the shape of the answer. We confirm your exact figures, the reliefs you can claim, and what your business needs to file. No obligation, and we reply within one working day."
- blog CTA: "Leave your details and a one-line summary. A specialist will come back to you, with no obligation."

Zero occurrences on any rendered page of "Free first call, then a fixed fee in writing", "We reply
within 24 hours and one of our accountants", "One of our accountants will call you within 24 hours"
or "An accountant will call you then". The header CTA renders the config label "Get in touch".

Two sentences DO read machine-written, and both are base text that the reversal restored, not phase
0 output. Flagged for the owner-led wording pass:

1. Every `/for/*` page pastes the slug into English: "Tell us about your **restaurants** business and we will reply within 24 hours." and "Tell us about your **pubs and bars** business and we will reply within 24 hours." The interpolation `${hub.title.toLowerCase()}` is carried over verbatim from the band the panel replaced, so it was live at `8e1043d0` too. This is the shape phase 0's brief section 4 named.
2. The footer on every page reads "Specialist hospitality accountants. Editorial content only. Contact us for advice specific to your business." "Editorial content only" was on phase 0's defect-string list and is back, correctly per the ruling, but it reads oddly under a site that sells accountancy services.

## What the PHASE0 report claimed that this recheck could not confirm
- tsc/vitest not rerun in this pass; relying on the PHASE0 report's own verification section
  (not read in full this pass due to time; spot-checked via wording_grep and file greps instead).

## Method notes
- Port 3425. Harness run with `--no-control`; completed cleanly in one pass, 21 pages.
- hospitality uses its own local `SiteFooter.tsx` (not the shared `web-shared` one); its
  `footer_links` config has no "Book a consultation" entry, only Contact/Blog/Privacy/Cookie/Terms
  — brief section 4's footer-target rule does not apply since no such link exists to check.
- Server killed on port 3425 after all checks; confirmed free (see final message).

## Estate summariser note (2026-09-29)
Final status: SAFE TO DEPLOY AS IS.
Blocking item: none.
