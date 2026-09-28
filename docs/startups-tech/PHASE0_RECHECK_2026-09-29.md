# startups-tech phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation; `--no-control` used after
the control passed on pharmacies earlier this session, scrollWidth 390). Nothing deployed.
Known going in: this site has no header or footer component at all (phase 1 design port).

## Verdict
SAFE AFTER FIXES LISTED (mechanical only) — 1 new HIGH finding not in the PHASE0 report
(sitemap `lastModified` is build-time `new Date()` on every route), rest matches what the
builder already flagged as unfixed (no header/footer, missing Service/BreadcrumbList schema).

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 21 at 1280, 21 at 390 | harness summary.md |
| lead form (`<form>`) on every money page | `<form>` present on all 21 routes except `/complete`, `/book` (flow pages, by design); harness `leadForms` (email/phone input) reads 0 on non-calculator/blog routes for the same 2-step-form reason as pharmacies (see pharmacies recheck) | `DetailsForm.tsx` uses the same step pattern; not a regression |
| one form under each calculator result, no gate | 4/4 calculator routes, 2 forms each (result-ask + page foot), no ResultGate | summary.md; `ResultGate` grep returns 0 hits at HEAD |
| header CTA visible 1280 / hidden 390 | 0/21 at 1280 (all FAIL), 0/21 at 390 (all PASS by the "hidden" sense but there is nothing to hide) | summary.md; confirmed no `<header>` element anywhere: `curl -s :3432/ \| grep -c "<header"` = 0. Known, not fixed — PHASE0 report itself says "no header, no footer anywhere in the codebase... fix is the design-port phase 1" |
| scrollWidth 390 on every page | 21/21 PASS | summary.md |
| raw markup as text | 0 pages | summary.md all PASS; confirmed anchors render as real `<a href="https://www.gov.uk/...">` tags on `/services/rd-tax-claims` (3 checked), 0 escaped `&lt;a href` |
| focus ring on first form control | 19/19 forms with a control PASS (script-focused) | summary.md |
| submit / primary CTA contrast >= 4.5 | 6.29:1 on all 4 calculator routes | summary.md |
| canonical self-referencing | 21/21 PASS | summary.md |
| sitemap lastModified real or omitted | **FAIL** | `startups-tech/web/src/app/sitemap.ts:10` `const now = new Date().toISOString()`, then every one of 15+ static/hub/research entries uses `lastModified: now` (lines 13-28, 33, 40, 47). This is exactly the build-time pattern section 5 forbids. Not mentioned or fixed in `docs/startups-tech/PHASE0_2026-09-28.md` at all — new finding this recheck. |
| Organization node with parentOrganization | 21/21 harness "PASS AccountingService" (type check passes here, unlike pharmacies) | summary.md; matches PHASE0 report's claim of `organization-schema.ts` wrapping shared `buildOrganization` with `parentOrganization` |
| Service / FAQPage / BreadcrumbList on segment + service pages | FAQPage only: 11/11 segment+service pages show `0/1/0` (Service=0, Breadcrumb=0) | summary.md; matches PHASE0 report's own admission ("only FAQPage renders today... not added this pass") — confirmed still true at HEAD, a real unmet section-5 requirement |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=34/37 stub=false; llms-full 200; ads.txt 200 pub=true; og:image 200 on pages that have one | harness header line |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96 | `startups-tech/web/src/config/lead-nurture.ts` wording_grep output, matches expected |
| defect-string count base vs HEAD | 26 vs 26, all files matched | wording_grep.txt |
| phase-0 replacement strings at HEAD | 1 (`niche.config.json:12` `cta.next`) | grep for renderer under `web/src`: no match, config-only, not rendered |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report claims clean/75 passed) | not independently reproduced |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. HIGH — `startups-tech/web/src/app/sitemap.ts:10-47`: `lastModified` is `new Date().toISOString()`
   computed once at request/build time and reused for every static, hub and research URL. This is
   the exact anti-pattern section 5 names ("never build-time `new Date()`, never one frozen
   constant for every entry"). The PHASE0 report (builder, Opus read, and wording-revert sections)
   never mentions `sitemap.ts` at all — this was not touched in phase 0 and is not a regression
   from today's work, but it is a real unmet requirement that nobody has flagged yet.
2. MEDIUM — Service + BreadcrumbList schema absent on all 11 segment/service pages (FAQPage only).
   Confirmed still true (harness `0/1/0` on every `/for/*` and `/services/*` row). Matches the
   builder's own "not added this pass" note, so not a false claim, but it means section 5's schema
   requirement is not met on this site and should not be read as done.
3. MEDIUM (known, not a false claim) — no header or footer component anywhere in the DOM
   (`document.querySelector('header')` null, confirmed by curl showing 0 `<header` tags on `/`).
   Header CTA and footer "Book a consultation" both fail by necessity. The PHASE0 report is
   explicit and correct that this is phase-1 scope; flagging only so the recheck numbers (21/21
   header-CTA-at-1280 FAIL) are not misread as a phase-0 regression.
4. LOW — `niche.config.json:12` `cta.next` phase-0 string present at HEAD but not rendered
   anywhere (`grep -rn "cta.next\|cta\[.next.\]" startups-tech/web/src` empty). Config-only per
   AGENT_BRIEF known item 2, not a wording defect.

## Wording
Opus reader, 2026-09-29. Deterministic walk of `git diff 8e1043d0 HEAD -- startups-tech/web/src startups-tech/niche.config.json`, every hunk adding or removing a 4+ word string literal, then a ten-route rendered read on `next start -p 3532`. Verdict: **WORDING CLEAN. 0 surviving agent sentences, 0 mechanical regressions.** One borderline the owner should see (item B below).

| file | change | class | evidence |
|---|---|---|---|
| `niche.config.json:2-14` | new `entity` block (`firm`, `serves`, `where`, `howItWorks[4]`, `next`) | MECHANICAL (schema feed) + CONFIG-NOT-RENDERED | only reader is `web/src/lib/organization-schema.ts:35` `niche.entity?.firm`; grep of `web/src` for `cta.next` / `entity.next` returns 0 lines. Independently confirms finding 4 above, and locates the key under `entity`, not `cta` |
| `web/src/lib/organization-schema.ts` (new file) | shared `buildOrganization`, `knowsAbout` from the five audience page titles, `sameAs` plus `parentOrganization` | MECHANICAL (schema builder) | replaces the one-line inline node at base `layout.tsx:8`; every base field survives |
| `web/src/app/for/[slug]/page.tsx:94-99` | base bespoke call-to-action `<section>` (h2 + p + "Get in touch" link, no form) replaced by `LeadCTAPanel` + `LeadForm` | NEW-COMPONENT (route had no form at base) | title and description are the base strings verbatim: base:92-94 "Speak to a startup tax specialist." / "Tell us about your {hub.title.toLowerCase()} situation and we will reply within 24 hours." |
| `web/src/app/services/[slug]/page.tsx:94-99` | same swap | NEW-COMPONENT | same base strings, base:92-94 |
| `web/src/app/about/page.tsx:32-37`, `for/page.tsx:33-38`, `services/page.tsx:55-60` | new `LeadCTAPanel` + `LeadForm`; `/about` loses its "Get in touch" link | NEW-COMPONENT | routes rendered zero forms at base (mount files 8 to 13); the copy reuses the site's own `/services/[slug]` strings, not agent prose |
| `for/[slug]`, `services/[slug]` intro / challenge / howWeHelp / FAQ bodies | `{x}` text child to `dangerouslySetInnerHTML` plus `[&_a]:underline` | MECHANICAL (brief section 5: HTML anchors were rendering as literal text) | no string content changed, only the render path |
| `web/src/app/globals.css:8-16` | `.prose table` scroll container | MECHANICAL | comment only |
| `web/src/app/layout.tsx` | AdSense meta plus `adsenseClientId` on `ConsentedScripts`; `organizationJsonLd` from the builder | MECHANICAL | brief section 6 |
| `web/src/app/calculators/[slug]/page.tsx:28` | `openGraph.images` added | MECHANICAL | og:image fix |

Defect-string counts match exactly base vs HEAD, 26 vs 26 across 15 files. `delayHours` = `0,0,4,20,24,48,72,96` at HEAD (base `0,0,4,24,48,96,168,264`): the nurture fix survived the reversal. `ResultGate` grep at HEAD = 0. No mechanical regression found.

### Rendered read (local `next start -p 3532`, ten routes)
`/`, `/about`, `/services`, `/services/rd-tax-claims`, `/services/emi-scheme-setup`, `/for/pre-seed-founders`, `/for/saas-companies`, `/contact`, `/calculators/rd-relief-estimator`, `/blog/saas-and-tech-finance/founder-salary-vs-dividends-2026-27`.

A. No page renders "We reply within 24 hours and one of our accountants", "One of our accountants will call you within 24 hours" or "An accountant will call you then". The pool-model copy the reversal restored renders as at base, including `/contact` "Tell us about your startup tax situation. A specialist firm from our partner network may contact you directly, and you will hear back within 24 hours.", the blog inline form "Leave your details and a one-line summary. A specialist will come back to you, with no obligation." and the exempt consent sentence on every form.

B. BORDERLINE, flagged not counted. Eight pre-existing routes now render two strings a prospect did not see before phase 0: the shared `LeadCTAPanel` defaults `eyebrow` "Free first call, then a fixed fee in writing" and `formTitle` "Book your free first call" (`packages/web-shared/design/marketing/LeadCTAPanel.tsx:18,27`, unchanged base..HEAD, Property's wording). Routes: `/about`, `/services`, all six `/services/*`, all five `/for/*`. The ruling permits the defaults on panels NEWLY mounted where no form existed, which is the case on every one of these routes (base had a link-only call-to-action band, not a panel and not a form), so this is allowed as written. Recording it because it is the one place where new "free first call" phrasing reaches a page that existed at base, and the owner may want it swapped for the site's own `cta` strings in the later careful pass.

C. Pre-existing, restored by the reversal, not a defect: the segment closer still pastes the slug into English, "Tell us about your saas companies situation and we will reply within 24 hours." (`web/src/app/for/[slug]/page.tsx:96`, identical to base:93). Brief section 4 asked for this to be fixed; the reversal put the template back. Same shape on all five `/for/*`.

D. LOW, machine layer only: `niche.config.json` `entity.firm` opens "Founder Tax Partners is the UK's specialist accountancy firm for funded and scaling technology companies." That superlative is now the Organization JSON-LD `description`. No prospect-facing page renders it, but it is a claim a competitor could dispute, and the other sites in this batch use a plainer "is a UK accounting practice" opening.

No known exception applies to startups-tech.

## What the PHASE0 report claimed that this recheck could not confirm
- `npx tsc --noEmit` / `npx vitest run` (claims clean / 8 files, 75 tests passed) — not rerun this
  pass, out of scope for a render-only recheck.
- The report's own "Opus read" section claims the raw-markup and 417px/592px overflow fixes hold
  under a real 390 render — this recheck independently confirms both (sw390 390 on every page,
  raw markup PASS on every page), so this claim IS confirmed, not just repeated.
- IndexNow actually submitting (report flags `optimisation_engine/indexing/config.py` needs a
  `startups-tech` entry before the shim works) — not tested this pass, read-only recheck does not
  call the network.

## Method notes
- Port 3432, server started from `startups-tech/web`, killed PID 50344 after run, port confirmed
  free.
- Harness run in foreground with `--no-control` (gov.uk control already passed on pharmacies
  earlier this session, scrollWidth 390); runtime roughly 70 s for 21 pages.
- Pages sampled: 21 (home, about, services hub, contact, for hub, calculators hub, 6 services
  detail, 5 for detail, 4 calculators, 1 blog post) — note `/complete`, `/book`, `/research/*`
  index and detail pages were not all in this harness's derived page list; sitemap.xml itself was
  read directly for the `lastModified` finding instead.
- No unstyled-block or overlapping-text issue flagged by the numeric checks; screenshots not
  individually opened this pass given full numeric PASS coverage and time-boxing.

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: the build-time sitemap dates (H7) and the missing Service/BreadcrumbList schema on 11 pages (M9); the absent header and footer stay with phase 1.
