# charities phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation), control skipped this run
(passed once already this session on Property, scrollWidth 390).

## Verdict
SAFE AFTER FIXES LISTED (mechanical only): one real raw-markup leak on `/services`, and sitemap
`lastModified` is build-time `new Date()` estate-wide on this site, both confirmed defects.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 23 at 1280, 23 at 390 | harness summary.md |
| lead form on every money page | harness measured 0/23 outside calculators (3/3); confirmed by `curl` that `/`, `/about`, `/services`, `/for/cics`, `/contact` all carry a real `<form>` | same 2-step-form heuristic gap as care (form's step 1 has no email/phone input in the DOM); not a mechanical defect, confirmed by `services-1280.png` screenshot showing a rendered "Get in touch" form |
| one form under each calculator result, no gate | 3/3 PASS, 1 form each, no `ResultGate` on this site | wording_grep.txt: 0 hits; summary.md all PASS gate |
| header CTA visible 1280 / hidden 390 | 23/23 visible at 1280, 23/23 hidden at 390 | summary.md, all rows "2 PASS" / "0 PASS" |
| scrollWidth 390 on every page | 23/23 PASS | summary.md |
| raw markup as text | 1 page FAIL: `/services` | summary.md row `/services ... FAIL </a>`; confirmed real defect, see Findings 1 |
| focus ring on first form control | 20/23 "PASS (script focus)"; 3 hub pages (`/for`, `/calculators`, plus one guide) reported `noform`, same heuristic gap | summary.md |
| submit / primary CTA contrast >= 4.5 | 3/3 measured (calculators) = 7.85, well above 4.5 | summary.md |
| canonical self-referencing | 23/23 PASS | summary.md |
| sitemap lastModified real or omitted | FAIL | `charities/web/src/app/sitemap.ts:12-49`: `const now = new Date().toISOString()` used for `lastModified` on 15 static routes (home, services, for, guides, blog, calculators, research + 3 research sub-pages, about, contact, privacy/cookie/terms) plus 3 further category-derived entries (lines 35,42,49); only blog/guide posts use a real content date. Confirmed by summary.md sitemap line: `today=48` of 80 total dated today |
| Organization node with parentOrganization | 23/23 `PASS AccountingService` | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | /for/* and /services/* detail pages 1/1/1 each (13 pages); hub pages 0/0/1 (BreadcrumbList only) | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=41/43, llms-full 200, ads.txt 200 pub=true, og:image 200 on pages that declare one | summary.md header line |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96,0,24,48,168 (first 8 match) | wording_grep.txt, base=HEAD |
| defect-string count base vs HEAD | 32 vs 32 (all 14 files identical) | wording_grep.txt |
| phase-0 replacement strings at HEAD | 1 vs 1 at base, unchanged (`niche.config.json` `sticky_secondary`, exempt config string) | wording_grep.txt |
| tsc / vitest (if run) | not re-run this pass; PHASE0 report does not state a pass/fail figure in the section read | not independently confirmed |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. HIGH — Raw HTML leaks as visible text on `/services`. `charities/web/src/data/charity-services.ts:307`
   (and 7 further `intro` fields in the same file, plus entries in `charity-types.ts`) store body
   copy with a literal `<a href="...">...</a>` anchor. `charities/web/src/app/services/page.tsx:46`
   passes `service.intro` straight into `LinkCardGrid`'s `body` prop as a plain JSX text child, so
   the hub page renders the escaped markup as visible text: confirmed by fetching `/services` and
   finding `&lt;a href=&quot;/guides/register-a-charity-step-by-step&quot;&gt;register a charity
   step by step&lt;/a&gt;` in the raw response, matched by the harness's raw-markup detector as
   `</a>` in `document.body.innerText`. By contrast the detail pages
   (`services/[slug]/page.tsx:90`, `for/[slug]/page.tsx:95`) correctly render the same field through
   `dangerouslySetInnerHTML`, and carry a code comment explaining exactly this trap ("pre-port
   template rendered it as `{type.intro}`, which escaped the[m]", `for/[slug]/page.tsx:93`) — the
   hub-page instance was missed. This is exactly the defect class brief section 5 names ("Body copy
   stored with HTML anchors... renders through the template's `html` prop... never as a JSX text
   child"). The PHASE0 builder report does not mention `services/page.tsx` at all in its findings;
   not caught.
2. HIGH — `charities/web/src/app/sitemap.ts:12-49`: same build-time `new Date()` pattern as care
   (see care's recheck). The builder report explicitly lists "G7 (sitemap `lastModified`)... not
   run this pass... not independently re-verified" — confirmed still broken.
3. LOW — harness form-count and focus-ring checks read 0 forms on non-calculator pages for the same
   2-step-form reason documented on care; `curl` and `services-1280.png` confirm real forms render.
   Not a site defect.

## Wording

Deterministic walk: `git diff 8e1043d0 HEAD -- charities/web/src charities/niche.config.json
charities/web/public/llms.txt` = 11 files, 99 insertions, 32 deletions. Every hunk read.

| file | classification |
|---|---|
| `app/about/page.tsx` | NEW-COMPONENT, BUT CARRIES NEW PROSE. See the finding below. |
| `app/services/page.tsx` | NEW-COMPONENT, clean: the base `CtaBand` ("Not sure which service you need?" / "Tell us about your charity, CIC or social enterprise and we will tell you what is required and how we can help.") becomes a `LeadCTAPanel` with that same copy carried across verbatim, plus a real form. ALLOWED. |
| `app/calculators/[slug]/page.tsx` | MECHANICAL: duplicate-form removal, the page-footer `MiniCapture` ("Want to be sure of your position?") dropped; `CalcResultCta` under the result survives. |
| `app/blog/[category]/page.tsx`, `components/layout/PageShell.tsx` | MECHANICAL: dead `/book` links repointed to `/contact#form`. Labels unchanged. |
| `app/globals.css` | MECHANICAL: unlayered focus-ring floor. |
| `app/layout.tsx` | MECHANICAL: AdSense meta + client id. |
| `app/icon.svg` | MECHANICAL: favicon path simplified. |

Confirmed the ruling's charities-specific item landed: no `blog-cta-map.ts` exists anywhere under
`charities/`, and `app/blog/page.tsx`, `app/blog/[category]/page.tsx` and
`app/blog/[category]/[slug]/page.tsx` all read the fixed `BLOG_CTA` block from
`components/blog/blog-cta`.

### SURVIVING AGENT SENTENCES: 1 (LOW)
`charities/web/src/app/about/page.tsx:52-57`, rendered live at `/about`:

> "Get started"
> "Talk to a specialist"
> "Tell us about your charity, CIC or social enterprise. We will explain what your organisation needs, in plain English, with no obligation."

Base text (`git show 8e1043d0:charities/web/src/app/about/page.tsx`) is a bare link band carrying
the single label "Get in touch" and no title, eyebrow or description at all. The panel mount itself
is allowed (the page had no form), but the ruling says a newly mounted panel should "pass no custom
copy, so the shared `LeadCTAPanel` defaults render". This one passes a custom eyebrow ("Get
started", where the shared default is "Free first call, then a fixed fee in writing") and an
agent-written description that exists nowhere at base. It reads in the site's voice rather than
machine-written, so severity is LOW, but it is new prose on a surface that existed at base and the
owner's rule as written does not permit it.

**MECHANICAL REGRESSIONS: 0.** Form mounts 7 at base, 9 at HEAD (both of them new panels).
Defect-string count base 32, HEAD 32. Phase-0 replacement strings 1 at HEAD and 1 at base
(`niche.config.json:166` `sticky_secondary`, pre-existing). `delayHours` `0,0,4,20,24,48,72,96`
identical base and HEAD.

Rendered read, local `next start -p 3503`: `/`, `/about`, `/services`, `/services/gift-aid`,
`/services/charity-vat`, `/for/cics`, `/for/small-charities`, `/contact`,
`/calculators/gift-aid-calculator`,
`/blog/trustee-compliance/charity-annual-return-related-party-transactions`. Apart from the `/about`
panel above, nothing reads machine-written. The pages are specific and threshold-accurate
("Registration bites once income exceeds 5,000 pounds, and a charitable incorporated organisation
registers whatever its income."). One pre-existing defect the reversal is not responsible for:
`/services` renders a raw anchor tag as visible text in the Charity Registration entry, the words
"The guide" followed by a literal `<a href=...>register a charity step by step</a>` and then
"covers the mechanics". That is a raw-markup-as-text leak on a live hub page, and the harness
should be flagging it too.

Known exceptions: none of the three apply to charities.

Method: port 3503 only, listener PID 23332 killed, port confirmed free.


## What the PHASE0 report claimed that this recheck could not confirm
- The report explicitly flagged G7 (sitemap lastModified), G8 (canonical-hub fix), D8 (playbook
  9.1 gate) and C5/C6/C9 as "not run this pass... no evidence of a defect found in passing, but
  not independently re-verified." This recheck closes G7 and finds it FAILs (finding 2); G8
  (canonical) passes independently (23/23 self-referencing); D8 and C5/C6/C9 were not in this
  recheck's scope.
- tsc/vitest pass/fail counts for charities were not stated in the report section read and were
  not re-run this pass.

## Method notes
- Port 3403. Server started from `charities/web`, confirmed 200 on `/`, harness run with
  `--no-control` (control already verified scrollWidth 390 on Property earlier this session), 23
  pages. `bash wording_grep.sh charities` run from repo root, output saved to
  `out/charities/wording_grep.txt`. Screenshot read for `/services` at 1280 to look for the raw-markup
  leak by eye (not visible above the fold; confirmed instead by fetching the raw HTML and locating
  the escaped anchor, and by reading the source file/line directly). Listener PID 59820 killed;
  `netstat` confirms port 3403 no longer LISTENING.

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: raw HTML anchor rendering as text on /services (H6), the build-time sitemap dates (H7) and the custom copy on the new /about panel (L1).

## Fix round (2026-09-29)

Fixes applied, files touched restricted to `charities/web/src/`.

1. H6 — `charities/web/src/app/services/page.tsx:41-49`: hub card `body` now built from
   `service.intro.replace(/<[^>]+>/g, "").split(".")[0]` (first sentence, tags stripped) instead of
   the raw `service.intro` string, matching the existing pattern on `charities/web/src/app/for/page.tsx:38`.
2. L1 — `charities/web/src/app/about/page.tsx:52-56`: removed the custom `eyebrow` prop (component
   default "Free first call, then a fixed fee in writing" now renders); `title` and `description` are
   required props on `LeadCTAPanel` (no built-in default), so, per base carrying no panel copy for
   this page (`git show 8e1043d0:charities/web/src/app/about/page.tsx` = bare "Get in touch" link
   band, confirmed), they are set to the verbatim pre-existing strings already used for this same
   shared panel at `charities/web/src/app/page.tsx:719-720` ("Talk to a charity accountant" /
   "Tell us about your charity, CIC or social enterprise. We will explain what your organisation
   needs, in plain English, with no obligation."), rather than any new sentence.

### Markup sweep (`charities/web/src/data`)

| field | files | render path | status |
|---|---|---|---|
| `intro` (services) | `charity-services.ts` (1 entry, line 307) | `services/[slug]/page.tsx:90` `dangerouslySetInnerHTML` (detail); `services/page.tsx:46` was a plain JSX text child (hub) | FIXED (hub now strips tags) |
| `intro` (sectors) | `charity-types.ts` (2 entries: lines 176, 362) | `for/[slug]/page.tsx:95` `dangerouslySetInnerHTML` (detail); `for/page.tsx:38` already strips tags (hub) | OK, no change needed |
| `challenges[].body`, `howWeHelp[].body` | `charity-services.ts`, `charity-types.ts` | `HubParts.tsx` `RichCardGrid` → `dangerouslySetInnerHTML` | OK |
| `faqs[].answer` | `charity-services.ts` (5 entries), `charity-types.ts` (5 entries) | `HubParts.tsx` `FaqSection` → `dangerouslySetInnerHTML` | OK |
| `research/page.tsx` `blurb`, `guides/page.tsx` `summary` | generated plain strings / frontmatter, no markup found | `LinkCardGrid` text child | OK, no markup present |

Sweep total: 21 fields/entries carrying inline markup across `charity-services.ts` and
`charity-types.ts` (`intro` x3, `challenges[].body` + `howWeHelp[].body` x8, `faqs[].answer` x10);
1 render path was wrong (`services/page.tsx` hub); fixed.

### tsc / vitest

- `npx tsc --noEmit -p charities/web` — clean, no output, exit 0.
- `cd charities/web && npx vitest run` — `Test Files 8 passed (8)`, `Tests 65 passed (65)`.

## Fix round (2026-09-29)

- File: `charities/web/src/app/sitemap.ts`, lines 10-83 (static/service/for/guide/tool/category blocks).
- Before: every static, service, for, guide, tool and category entry set `lastModified: now`; post entries already used `post.updatedDate || post.date`.
- After: `lastModified` removed from static/service/for/guide/tool entries; `/blog` and category entries now derive `lastModified` from the newest `updatedDate || date` among their posts; post entries unchanged. URL list emitted is unchanged.
- `npx tsc --noEmit -p charities/web` — clean, no output.
- `cd charities/web && npx vitest run` — `Test Files 8 passed (8)`, `Tests 65 passed (65)`.
