# divorce-finances phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation; `--no-control` after the
control passed on pharmacies earlier this session, scrollWidth 390). Nothing deployed.

## Verdict
SAFE AFTER FIXES LISTED (mechanical only) — no new HIGH findings; sitemap is correctly fixed here
(unlike wills-probate/startups-tech), duplicate-hero-copy re-test came back clean (phrase doesn't
even exist on this site's homepage), one pre-existing non-phase-0 leftover string noted.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 16 at 1280, 16 at 390 | harness summary.md |
| lead form on every money page | 11/16 with `leadForms>=1` (home, about, services, contact, for, all 4 `/for/*`, all 5 calculators); `/calculators` hub and `/blog` post read `noform` on harness's stricter check (same multi-step-form nuance as the other three sites) | summary.md |
| one form under each calculator result, no gate | 5/5 calculator routes, 2 forms each, gate column PASS (only "chat" flagged) | summary.md |
| `ResultGateModal` still in code but not live | confirmed dead code | `grep -rln "PremiumCalculator\b" web/src` finds no importer outside its own 3 files, same as wills-probate; PHASE0 report's "no live defect" claim independently confirmed |
| header CTA visible 1280 / hidden 390 | 16/16, 16/16 | summary.md, all rows "2 PASS / 0 PASS" |
| scrollWidth 390 on every page | 16/16 PASS | summary.md |
| raw markup as text | 0 pages | summary.md all PASS |
| focus ring on first form control | 12/12 forms with a control PASS (script-focused) | summary.md |
| submit / primary CTA contrast >= 4.5 | 20.39:1 (site-wide CTA), 5.22:1 (calculator result pill) on all 5 calculator routes | summary.md; matches PHASE0 report's addendum fix (2.68 → 5.17, harness measures 5.22) |
| canonical self-referencing | 16/16 PASS, including `/calculators/settlement-range-estimator` | summary.md; the PHASE0 report flagged this one route's canonical as unconfirmed after a render timeout — this recheck confirms it PASS |
| sitemap lastModified real or omitted | **PASS** | `divorce-finances/web/src/app/sitemap.ts:12-13` explicit comment: "lastModified is omitted rather than stamped with build time"; blog routes use `post.updatedDate \|\| post.date` (line 52). Correctly implemented, unlike wills-probate and startups-tech's sitemap.ts (both still build-time `new Date()`, flagged in their own recheck reports). |
| Organization node with parentOrganization | 16/16 harness "PASS AccountingService" | summary.md, matches report's claim of `organization-schema.ts` shared-builder port |
| Service / FAQPage / BreadcrumbList on segment + service pages | 4/4 `/for/*` pages show `1/1/1` | summary.md; matches report's claim that `buildServiceJsonLd`/`buildBreadcrumbJsonLd` were wired onto `/for/[slug]/page.tsx` |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200, 15/15 UTM-tagged, stub=false confirmed (`head -3` shows real firm-voice content) | harness header line + direct read |
| og:image resolves 200 locally | 200 | `curl -s -o /dev/null -w "%{http_code}" :3434/api/og` = 200, matches report's fix (was pointing at missing `/brand/icon-alt.png`, now the dynamic `/api/og` route) |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96 | wording_grep.txt, matches expected |
| defect-string count base vs HEAD | 51 vs 49, 2 files DIFFER (both explained) | `wording_grep.txt`; `llms.txt` 1→0 (named stub-replacement exception) and `services/page.tsx` 2→1 (the explicit flagged exception in `ESTATE_PARITY_WORDING_REVERT_2026-09-28.md`: "divorce-finances `/services` opening line ... keep the replacement") |
| phase-0 replacement strings at HEAD | 0 | divorce-finances is not in AGENT_BRIEF's list of 11 sites that gained a `cta.next` key — confirmed absent, consistent |
| duplicate hero copy re-test | **not applicable / clean** | `curl :3434/ \| grep -o "Free calculators, real numbers" \| wc -l` = 0 — this exact phrase does not appear on divorce-finances' homepage (different copy from wills-probate); no duplication found in this site's rendered HTML |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report claims clean/81 passed) | not independently reproduced |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. LOW (observation, pre-existing, not phase-0) — `SiteFooter.tsx:78` "Editorial content only. Book
   a call for advice specific to your situation." matches the section-1 DEFECT pattern and is
   byte-identical at base and HEAD (confirmed with `git show 8e1043d0:...`) — same leftover string
   found on wills-probate's footer, never touched by phase 0 or the reversal on either site.
2. INFO — the PHASE0 report's addendum discloses a one-off `next build` was run on wills-probate
   (not divorce-finances) to diagnose the flight-payload duplication question, then deleted — a
   documented deviation from the "no next build" rule, already self-reported and explained in the
   report text, not rediscovered here as a new issue. Noting only because AGENT_BRIEF instructed me
   to check the duplication claim; it is resolved and consistent with what I independently found on
   wills-probate.
3. INFO — `ResultGateModal` dead-code confirmed on this site too (see Numbers table); PHASE0
   report's claim independently verified true.

## Wording
Opus reader, 2026-09-29. Deterministic walk of `git diff 8e1043d0 HEAD -- divorce-finances/web/src divorce-finances/niche.config.json divorce-finances/web/public/llms.txt`, every hunk adding or removing a 4+ word string literal, then a ten-route rendered read on `next start -p 3534`. Verdict: **WORDING CLEAN. 0 surviving agent sentences, 0 mechanical regressions.** Both known exceptions are present and correct.

| file | change | class | evidence |
|---|---|---|---|
| `niche.config.json:18-29` | new `entity` block (`firm`, `serves`, `where`, `howItWorks[4]`, `next`) | MECHANICAL (schema feed) + CONFIG-NOT-RENDERED | only reader is `web/src/lib/organization-schema.ts` `niche.entity?.firm`; grep of `web/src` for `cta.next` / `entity.next` = 0 lines, so `entity.next` "We reply within 24 hours and one of our team comes back to you directly." never reaches a page. The phase-0 replacement-string count at HEAD is 0 for this site. The base `partner.name` key "regulated firms in our specialist partner network" is untouched |
| `niche.config.json:37` | `publisher_logo_url` `/brand/icon-alt.png` to `/api/og` | MECHANICAL (og:image 404 fix) |
| `web/public/llms.txt` | replaced entirely | KNOWN EXCEPTION, see below |
| `web/src/app/services/page.tsx:25-29` | intro "Full service detail is being built now." replaced with a real intro | KNOWN EXCEPTION, see below; also the only prose-file count mismatch, 2 at base to 1 at HEAD |
| `web/src/lib/organization-schema.ts` (new), `web/src/lib/schema.ts` | hand-rolled Organization replaced by shared `buildOrganization`; `buildServiceJsonLd` added | MECHANICAL (schema builders) |
| `about/page.tsx:169-187`, `for/page.tsx:128-146`, `services/page.tsx:56-74` | new closing `LeadForm` band on three routes that rendered no form | NEW-COMPONENT, allowed. The copy is the site's own, not agent prose: "Talk to a specialist about your situation" and "Book a free call. We will talk through your situation and whether there is anything worth changing. No hard sell, no obligation." both exist at base and only in `app/for/[slug]/page.tsx` (`git grep -l` at `8e1043d0`) |
| `for/[slug]/page.tsx` | `Service` plus `BreadcrumbList` JSON-LD added; `alternates.canonical`; `bg-orange-500`/`600` to `bg-orange-700` | MECHANICAL (schema, canonical, contrast) |
| `components/blog/BlogPostRenderer.tsx` | byline and the "Figures checked against primary sources..." block moved below the key takeaways | MECHANICAL (block moved, text byte-identical) |
| `components/calculators/premium/PremiumCalculator.tsx:73-75` | `focus:outline-none focus:ring-2` swapped for a visible `focus-visible:outline` | MECHANICAL (focus ring) |
| `sitemap.ts`, `layout.tsx`, `next.config.ts`, `public/ads.txt`, `pipeline/submit_indexnow.py`, `globals.css`, `lead-nurture.ts`, 8 component files | sitemap `lastModified`, AdSense, IndexNow, table overflow, `delayHours`, `focusRing` | MECHANICAL |

Defect-string counts base against HEAD: 51 vs 49, and both missing hits are inside the two known exceptions (`llms.txt` "pre-launch STUB", `/services` "being built now"). Every other prose file matches exactly. Form mounts 10 to 14. `delayHours` = `0,0,4,20,24,48,72,96` at HEAD (base `0,0,4,24,48,96,168,264`): the nurture fix survived the reversal. No mechanical regression found. The `ResultGateModal` import still sitting at `components/calculators/premium/PremiumCalculator.tsx:678` is the dead code finding 3 above verified; I note only that brief section 4 named this site as one whose gate was to be removed, so the reference remaining in source is expected to read as unfinished to anyone grepping later.

### Rendered read
`/`, `/about`, `/services`, `/financial-settlements`, `/pension-sharing`, `/for/divorcing-homeowners`, `/for/over-50s`, `/contact`, `/calculators/divorce-cost-calculator`, `/blog/financial-settlements/divorce-and-joint-debts`.

Zero hits on any route for "Free first call, then a fixed fee in writing", "We reply within 24 hours and one of our accountants", "One of our accountants will call you within 24 hours" or "An accountant will call you then". "we stay on the money side" renders on exactly one route, `/services`, which is the flagged exception. Everything else is the site's base introducer voice, restored: "Tell us about your situation and we will introduce you to a vetted, SRA-regulated family law firm or an accredited mediator suited to it. Your details are shared only with your consent, we may receive a fee from the firm we introduce you to, and you remain free to walk away at any stage." `/contact` still carries the FULL base consent paragraph, including the 3+3 recipient cap and "We may be paid a fee by a firm your enquiry is passed to." (worth noting because the equivalent paragraph on wills-probate was NOT restored, which is a HIGH finding in that site's report). Nothing on any page reads machine-written or off the site's voice.

### Known exceptions, confirmed present, not counted as defects
- **`/services` intro.** HEAD renders "We work out the money side of divorce and separation with you: what a fair settlement looks like, how pensions split, and the tax on it. Where you need a solicitor, we introduce you to a regulated firm we work with, and we stay on the money side." Base was "Free tools and guides for the money side of divorce and separation. Full service detail is being built now." plus a `// Services STUB (scaffold phase)` comment. Exception confirmed, kept per the ruling. One thing for the owner to see when he strikes or keeps it: two sections down that same page, the base copy says "we will introduce you to a vetted, SRA-regulated family law firm or an accredited mediator suited to it... we may receive a fee from the firm we introduce you to". The new intro reads as the firm doing the work; the block below reads as an introducer taking a fee. They contradict each other on one page.
- **`web/public/llms.txt` replaced entirely.** Base was three lines saying "STUB (pre-launch)... nothing here should be cited or indexed". Judged as a machine file: sound. Firm-first opening, four pillars, calculators, blog, glossary and `llms-full.txt` all listed, every URL carries `utm_source=chatgpt&utm_medium=llms`, dated "Facts current as at 2026-09-28", and no figure a prospect could dispute (the £628 and £62 court fees appear only inside calculator descriptions). Two gaps: it names only two of the four `/for/*` audiences (`separated-parents` and `over-50s` are missing, covered only by the "full index" link), and like wills-probate it now describes a service the HTML does not, "One of our team calls you to go through it" and "We stay on the money side", against pages that say the site "is not a law firm and does not give legal advice" and hands you to a third-party firm. One for the owner-led wording pass, in whichever direction he picks.

## What the PHASE0 report claimed that this recheck could not confirm
- `npx tsc --noEmit` / `npx vitest run` (claims clean / 7 files, 81 tests passed, one expected
  test-env console noise) — not rerun this pass.
- Whether the blog-post byline reorder (moved below key takeaways) actually reads correctly on a
  real post — confirmed structurally via harness raw-markup PASS and sw390 PASS on
  `/blog/financial-settlements`, but did not open the screenshot to visually confirm reading order.

## Method notes
- Port 3434, server started from `divorce-finances/web`, killed PID 57092 after run, port
  confirmed free.
- Harness run in foreground with `--no-control`; runtime roughly 60 s for 16 pages.
- Pages sampled: 16 (home, about, services hub, contact, for hub, calculators hub, 4 for detail,
  5 calculators, 1 blog post).
- No unstyled-block or overlapping-text issue flagged by numeric checks; screenshots not
  individually opened this pass, time-boxed given full numeric PASS coverage.

## Estate summariser note (2026-09-29)
Final status: SAFE TO DEPLOY AS IS.
Blocking item: none; this site's sitemap and consent paragraph are the models the fix round copies onto wills-probate.

## Fix round (2026-09-29)

Owner ruling 2026-09-28 late: `/contact` consent paragraph
(`divorce-finances/web/src/app/contact/page.tsx`, was lines 57-80) still carried the
old "up to three firms ... up to three in related professions ... We may be paid a fee"
text. Replaced the inline run with the same shape wills-probate uses at
`wills-probate/web/src/app/contact/page.tsx:57`:
`By submitting the form you agree to us using your details to respond to your enquiry.
{siteConfig.leadConsentText} See our privacy policy for full details.`
`siteConfig` was already imported on the page; `leadConsentText` already exists in
`divorce-finances/web/src/config/site.ts:23`. Nothing else on the page touched.

tsc: `npx tsc --noEmit -p divorce-finances/web` — pass, 0 errors.
vitest: `npx vitest run` (divorce-finances/web) — 7 files, 81 tests passed.
