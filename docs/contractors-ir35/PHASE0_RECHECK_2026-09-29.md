# contractors-ir35 phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation), control skipped this run
(passed once already this session on Property, scrollWidth 390).

## Verdict
SAFE AFTER FIXES LISTED (mechanical only): sitemap `lastModified` is build-time `new Date()`,
matching the same defect found on care and charities.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 31 at 1280, 31 at 390 | harness summary.md |
| lead form on every money page | 31/31 have >=1 form (this site's form is single-step, no
  heuristic gap) | summary.md lead-forms column, all >=1 |
| one form under each calculator result, no gate | 10/10 calculator routes 2-3 forms (panel +
  1-2 captures), `ResultGateModal` present in source but inert: `PremiumCalculator.tsx:499`
  `const gated = false;` (hardcoded), `gateOpen` state (line 501) is never set true elsewhere in
  the file, so the modal branch at line 675-676 never renders. Confirmed a dead branch, not a live
  gate | `contractors-ir35/web/src/components/calculators/premium/PremiumCalculator.tsx:499,501,675-676`; PHASE0 report line 69-71 makes the same claim |
| header CTA visible 1280 / hidden 390 | 31/31, 31/31 | summary.md, all "2 PASS" / "0 PASS" |
| scrollWidth 390 on every page | 31/31 PASS | summary.md |
| raw markup as text | 0 pages | summary.md all PASS |
| gate/modal check | harness flagged all 31 pages "FAIL" on the gate column, but this is a false
  positive: the flagged element is the chat widget ("A contractor specialist replies personally"),
  already separately confirmed `chatWidget: true` on every page. The harness's chat-detection regex
  (`replies within\|specialist widget\|ask a specialist`) does not match this site's exact copy
  ("replies personally"), so the same element is double-counted as a gate. Not a site defect | `contractors-ir35/web/src/components/support/SpecialistWidget.tsx:378` (`A contractor specialist replies personally`); `report.json` shows `chatWidget: true` on every sampled page |
| focus ring on first form control | 31/31 "PASS (script focus)" | summary.md |
| submit / primary CTA contrast >= 4.5 | 31/31 measured, uniformly 5.36, well above 4.5 | summary.md |
| canonical self-referencing | 31/31 PASS | summary.md |
| sitemap lastModified real or omitted | FAIL | `contractors-ir35/web/src/app/sitemap.ts:12-47`: `const now = new Date().toISOString()` used for `lastModified` on 17 static/category routes; only post-level entries use a real date. Confirmed by summary.md sitemap line: `today=96` of 163 total dated today |
| Organization node with parentOrganization | 31/31 `PASS AccountingService` | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | /for/* detail pages 1/1/1 each (13 pages); calculators 0/1/1; hub pages 0/0/0 or 0/0/1 | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=51/52, llms-full 200, ads.txt 200 pub=true, og:image 200 on pages that declare one | summary.md header line |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96,0,24,48,168 (first 8 match) | wording_grep.txt, base=HEAD |
| defect-string count base vs HEAD | 37 vs 37 (all 17 files identical) | wording_grep.txt |
| phase-0 replacement strings at HEAD | 23 vs 23 at base (unchanged); all are the exempt `LeadCTAPanel` default eyebrow "Free first call, then a fixed fee in writing" (19 instances, pre-existing default copy on pages that already had the panel) plus the 4 "An accountant will call you then" booking-page lines, which are this site's OWN source wording (contractors-ir35 is named in the brief as the line's origin, so it is base text here, not a phase-0 rewrite) | wording_grep.txt |
| footer "Book a consultation" reaches a form | PASS | `SiteFooter.tsx:50` points to `/contact#book`; `curl http://localhost:3404/contact` returns 1 `<form` and `id="book"` present |
| tsc / vitest (if run) | not re-run this pass | not independently confirmed |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. HIGH — `contractors-ir35/web/src/app/sitemap.ts:12-47`: build-time `new Date()` for
   `lastModified` on 17 routes, same defect class as care and charities (a shared or
   copy-pasted `sitemap.ts` shape across the estate, not site-specific). The PHASE0 report line 117
   lists "G8 (canonical-hub fix presence), D5/D8 (fonts, playbook 9.1 gate)" as checked/in scope but
   does not mention sitemap `lastModified` at all; not caught by this site's builder or Opus pass.
2. LOW — harness gate-column false positive on all 31 pages: the chat widget's own copy
   ("A contractor specialist replies personally") doesn't match the harness's narrower "replies
   within" pattern, so the same chat element is flagged as a gate. `chatWidget: true` is already
   correctly set on the same pages in `report.json`, so this is read as a harness limitation, not a
   defect. Recommend widening the harness's `isChat` regex for a future run.
3. LOW — `ResultGateModal` still imported and present in `PremiumCalculator.tsx`, matching the
   brief's naming of contractors-ir35 as a site needing gate removal, but confirmed dead code
   (`gated` hardcoded `false`, `gateOpen` never set true). The PHASE0 report's own claim ("dead
   branch left in place, gateOpen never...") is confirmed accurate; no live gate reaches a
   prospect.

## Wording

Deterministic walk: `git diff 8e1043d0 HEAD -- contractors-ir35/web/src
contractors-ir35/niche.config.json contractors-ir35/web/public/llms.txt` = 10 files, 98 insertions,
14 deletions. Every hunk read. `git diff 8e1043d0 HEAD -- contractors-ir35/web/content/` is EMPTY,
so the three rewritten blog post bodies and their `dateModified` bumps are fully reverted.

| file | classification |
|---|---|
| `components/blog/BlogPostRenderer.tsx` | SURVIVING REWRITTEN CLOSER. See the finding below. |
| `app/globals.css` | MECHANICAL: unlayered focus-ring floor. |
| `app/layout.tsx` | MECHANICAL: AdSense meta + client id. |
| `components/calculators/premium/PremiumCalculator.tsx` | MECHANICAL: gate removal (`gated = false`), so the in-blog CTA always renders under the result. Kept per the ruling. |
| `components/forms/LeadForm.tsx`, `components/forms/DetailsForm.tsx` | MECHANICAL: `focusRing` replaces `focus:outline-none`. |
| `components/layout/SiteFooter.tsx` | MECHANICAL: `companyItems` override so "Book a consultation" points at `/contact#book` instead of the token-gated `/book`. Labels unchanged. |

### SURVIVING AGENT SENTENCES: 1 (MEDIUM)
`contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx:54-58, 381-387`. Phase 0 added a
template read of `ctaCopyForCategory(categorySlug, ...)`, so the closing CTA on every blog POST now
varies by category instead of rendering the one site-wide block. Verified live at
`/blog/ir35-status/inside-ir35-keep-close-or-umbrella`, visible text lines 130 and 157.

HEAD renders:
> "Want your IR35 status read properly?"
> "A status determination turns on the contract and on how the engagement actually runs, and those two rarely say the same thing. We read both, against substitution, control and mutuality, and put the position in writing so you have something to stand behind if it is ever questioned."
> button "Request an IR35 status review"

Base (`git show 8e1043d0:contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx`, which reads
`niche.blog.cta_heading` / `cta_body` / `cta_button`) rendered:
> "Not sure where you stand on IR35?"
> "Book a free first call with a specialist contractor accountant. We will review your contract, your working practices and your current structure. Plain English, no jargon. If we take the work on, you get a fixed fee in writing before anything starts."
> button "Book a free first call"

This is precisely the pattern the ruling names: "If a `closer` field was added to a data model and
the template now reads it, remove the field and the template read, restoring the original shared
closing line, even where that line was one template for every page." The `CTA_BY_CATEGORY` map in
`lib/blog-categories.ts` is not itself new (that file is unchanged base to HEAD, last touched in
`6d0155b6`, and the hub pages read it at base); what phase 0 added, and what survives, is the read
on the post template. Every blog post on the site now shows a different closer from the one it
showed at base. MEDIUM: the words are the site's own pre-existing copy rather than fresh agent
prose, but the sentence a prospect reads at the foot of eight categories of post is not the base
sentence.

**MECHANICAL REGRESSIONS: 0.** Form mounts 22 at base, 22 at HEAD. Defect-string count base 37,
HEAD 37. Phase-0 replacement strings 23 at HEAD and 23 at base, all of them this site's own
pre-existing copy (`niche.config.json:120`, sixteen `eyebrow="Free first call, then a fixed fee in
writing"` props, `book/page.tsx:34`, `thank-you/page.tsx:78`, `BookingPicker.tsx:85`). `delayHours`
`0,0,4,20,24,48,72,96` identical base and HEAD.

Rendered read, local `next start -p 3504`: `/`, `/about`, `/services`, `/for/it-contractors`,
`/for/umbrella-to-limited-company`, `/contact`, `/calculators/outside-ir35-take-home-calculator`,
`/blog/ir35-status/inside-ir35-keep-close-or-umbrella`. Apart from the closer above, nothing reads
machine-written; the segment pages are specific and mechanism-led ("Under Chapter 10 the fee-payer
deducts PAYE and employee NIC and pays employer NIC at 15% on top, all from the same assignment
rate, and no 5% expenses allowance exists in that calculation.").

Known exceptions: none of the three apply to contractors-ir35.

Method: port 3504 only, listener PID 47652 killed, port confirmed free.


## What the PHASE0 report claimed that this recheck could not confirm
- tsc/vitest pass/fail figures were not re-run this pass.
- G8 canonical-hub fix: independently confirmed PASS (31/31 self-referencing canonicals), consistent
  with the report's claim.

## Method notes
- Port 3404. Server started from `contractors-ir35/web`, confirmed 200 on `/`, harness run with
  `--no-control` (control already verified scrollWidth 390 on Property earlier this session), 31
  pages. `bash wording_grep.sh contractors-ir35` run from repo root, output saved to
  `out/contractors-ir35/wording_grep.txt`. No screenshots needed beyond the numeric checks; the gate
  false-positive and dead-code gate were confirmed by reading source and `report.json` directly.
  Listener PID 50564 killed; `netstat` confirms port 3404 no longer LISTENING.

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: the build-time sitemap dates (H7) and the category blog closer read that replaced the base site-wide closer (M2).

## Fix round (2026-09-29)

- File: `contractors-ir35/web/src/app/sitemap.ts`, lines 10-98 (static/for/category/calculator/glossary/city/resource blocks).
- Before: every static, for, tool, glossary, city and resource entry set `lastModified: now`; post entries already used `post.updatedDate || post.date`; no per-entry real date exists for glossary/city/resource so those are undated, matching Property's pattern.
- After: `lastModified` removed from static/for/tool/glossary/city/resource entries; `/blog` and category entries now derive `lastModified` from the newest `updatedDate || date` among their posts; post entries unchanged. URL list emitted is unchanged.
- `npx tsc --noEmit -p contractors-ir35/web` — clean, no output.
- `cd contractors-ir35/web && npx vitest run` — `Test Files 22 passed (22)`, `Tests 456 passed (456)`.

## Fix round (2026-09-29)

**M2** `contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx` (was lines
54-58 and 381-387). Removed the `ctaCopyForCategory` import/read and the
per-category `closingCta` variable; the closing block now reads `niche.blog.cta_heading`
/ `cta_body` / `cta_button` directly, matching base
(`git show 8e1043d0:...BlogPostRenderer.tsx`) exactly. `ctaCopyForCategory` itself is
still imported and used by `src/app/blog/[category]/page.tsx`, so `lib/blog-categories.ts`
was left in place.

Base and HEAD closer text are now identical for every post, e.g. from
`contractors-ir35/niche.config.json`:
- heading: "Not sure where you stand on IR35?"
- body: "Book a free first call with a specialist contractor accountant. We will
  review your contract, your working practices and your current structure. Plain
  English, no jargon. If we take the work on, you get a fixed fee in writing before
  anything starts."
- button: "Book a free first call"

tsc: `npx tsc --noEmit -p contractors-ir35/web` — pass, 0 errors.
vitest: `npx vitest run` (contractors-ir35/web) — 22 files, 456 tests passed.
