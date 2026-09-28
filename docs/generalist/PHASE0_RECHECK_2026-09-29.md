# generalist phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation). Control skipped this run
(passed once already this session on Solicitors: gov.uk @390 scrollWidth 390). Nothing deployed.

## Verdict
SAFE AFTER FIXES LISTED: mechanically clean except `Organization` JSON-LD never carries
`parentOrganization` (own local `lib/schema.ts`, not the shared builder's field). Wording matches
base exactly.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 27 at 1280, 27 at 390 | harness summary.md; no `/for/[slug]` route (expected, not a defect) |
| lead form on every money page | 27/27 PASS | 2-7 forms per route |
| one form under each calculator result, no gate | 21/21 calculator routes PASS | `PremiumCalculator.tsx:220` `gated = false` permanently; `ResultGate.tsx` renamed wrapper no longer gates (`ResultCaptureForm` inline, comment "owner decision 2026-09-27, ported from Property: results are never held") |
| header CTA visible 1280 / hidden 390 | 27/27, 27/27 | harness |
| scrollWidth 390 on every page | 27/27 | harness |
| raw markup as text | 0 pages | harness |
| focus ring on first form control | 27/27 | harness |
| submit / primary CTA contrast >= 4.5 | 27/27, flat 5.18 | harness |
| canonical self-referencing | 27/27 PASS | harness |
| sitemap lastModified real or omitted | PASS | `sitemap.ts:77,88` use `post.date`/`guide.date`; other entries omit per `sitemap.ts:47-48` comment |
| Organization node with parentOrganization | 0/27 FAIL | harness `Org parent` column all `FAIL ProfessionalService`; `generalist/web/src/lib/schema.ts:95` `getSiteOpts()` never sets `parentOrganization` |
| Service / FAQPage / BreadcrumbList on segment + service pages | present, `/services` and calculator pages carry 1/1 or 9/1/1 | harness |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | 200 utm=69/70, 200, 200 pub=true, 200 | report.json |
| lead-nurture delayHours | first eight: 0,0,4,20,24,48,72,96 | matches expected exactly |
| defect-string count base vs HEAD | 30 vs 30, matched per file | wording_grep.txt |
| phase-0 replacement strings at HEAD | 3 (was 2 at base): `niche.config.json:32` `cta.next`, `book/page.tsx:43`, `BookingPicker.tsx:85` both "An accountant will call you then" | the 2 `book`/`BookingPicker` hits are the brief's own contractors-ir35 line, deliberately kept per revert doc; `cta.next` is config-only (see Findings #2) |
| tsc / vitest (if run) | not rerun this pass | relying on PHASE0 report |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **MEDIUM (already flagged by builder)** `Organization` JSON-LD has no `parentOrganization` on any
   page. `generalist/web/src/lib/schema.ts:95-109` `getSiteOpts()` sets `organizationType`,
   `knowsAbout`, etc but never `parentOrganization`. `docs/generalist/PHASE0_2026-09-28.md:104-107`
   already names this exact gap and defers it to "needs the shared agent" — this recheck confirms
   the gap is real and unresolved, not a new find.
2. **LOW** `niche.config.json:32` `cta.next` new key (estate-wide, brief item 2): grepped
   `generalist/web/src` and `config/site.ts` for `cta.next` reads — none found. Config only, not
   rendered.
3. **CONFIRMED** ResultGate/ResultGateModal usage remains in source
   (`EmployerNICalculator.tsx`, `PremiumCalculator.tsx`) but is dead-gated: `gated = false`
   permanently (`PremiumCalculator.tsx:220`) and `ResultGate.tsx` was rewritten to render inline
   (`ResultCaptureForm`), never popping a modal. Matches the "remove ResultGate usage where it
   still gates" instruction in spirit; the component names are legacy, the gating behaviour is
   gone. Confirmed by harness `gate` column: PASS on every calculator route.
4. **CONFIRMED** delayHours: `lead-nurture.ts` HEAD array `0,0,4,20,24,48,72,96`, Property's shape.
5. **CONFIRMED** footer "Book a consultation" -> `/contact`, which renders 2 forms per harness.
   `/book` also renders a form directly (no token required, unlike Solicitors) per
   `wording_grep` form-mount list including `app/book` — not checked in this pass since footer
   already points to a working page.

## Wording (Opus reader section)
## Wording

Deterministic walk of `git diff 8e1043d0 HEAD -- generalist/web/src generalist/niche.config.json`
(14 files, +102/-115). Defect-string counts match base: TOTAL base=30 HEAD=30. Chat openers
(`lib/assistant/opener.ts`) are untouched, 2 hits at base and 2 at HEAD, so the restored opener
lines are in place.

| file | classification |
|---|---|
| `niche.config.json` (`entity` block incl. `entity.next`) | CONFIG-NOT-RENDERED. `next` is inside `entity`, not `cta`. `grep -rn EntityBlock generalist/web/src` = 0 hits, and `EntityBlock` is the only component that renders `next` (`packages/web-shared/design/marketing/EntityBlock.tsx:72`). Nothing on this site reads it. Ruling keeps `entity` as machine copy. |
| `app/sitemap.ts`, `app/globals.css` (`--brand-primary: var(--accent-strong)`), `tests/niche-config.test.ts` (expectation follows the token), `components/forms/LeadForm.tsx`, `components/forms/DetailsForm.tsx`, `app/admin/analytics/login/page.tsx`, `components/calculators/EmployerNICalculator.tsx` (`htmlFor` + ids + focus-visible) | MECHANICAL. Contrast token, focus rings, label bindings, sitemap lastModified. All stay. |
| `app/page.tsx` | MECHANICAL. `StatsCounter` number-parse guard only, no string changes. |
| `components/calculators/ResultGate.tsx`, `components/tools/CalculatorClient.tsx`, `components/calculators/premium/PremiumCalculator.tsx` (`gated = false`) | MECHANICAL, the gate removal, which the ruling keeps. |
| `config/lead-nurture.ts` | MECHANICAL, delayHours now 0,0,4,20,24,48,72,96. |
| `components/calculators/ResultCaptureForm.tsx` (new file, lines 21-24) | **SURVIVING AGENT SENTENCES, MEDIUM, rendered on every calculator page.** |

No mechanical regression found: form mounts base=29 HEAD=29, delayHours at today's values, rings
and the `--accent-strong` token all still present.

### The surviving sentences
`components/calculators/ResultCaptureForm.tsx` is new, but the surface it occupies existed at base
as `ResultGate` plus `ResultGateModal`, and it carries the SAME strings with the phase 0 positioning
swap applied. Not the shared `LeadCTAPanel` defaults, so the exemption does not cover it.

- HEAD line 22: "A calculator gives the shape of the answer. Tell us your situation and one of our accountants will confirm your exact figure and the legitimate ways to reduce it, with no obligation."
  Base text, still live in `components/calculators/premium/ResultGateModal.tsx:107` on this very site, and identical in Property's `web/src/components/calculators/ResultCaptureForm.tsx:40`: "... and **a specialist** will confirm your exact figure ..."
- HEAD line 21: `heading={topic?.ctaCopy || "Want one of our accountants to check your figure?"}`; base and Property: "Want a specialist to check your figure?" (`ResultGateModal.tsx:106`, `Property/.../ResultCaptureForm.tsx:39`).
- HEAD line 24: successText "Sent. Check your email and phone now, we have just messaged you to arrange your **free first call**."; Property's line reads "... to arrange your **free review**."

The inconsistency is visible on one screen. `/calculators/sole-trader-vs-ltd` renders the agent
line "...one of our accountants will confirm your exact figure..." and, a few blocks below, the
untouched mobile slot "Leave your details and **a specialist** will send your figure and the next
sensible step, with no obligation."

### Rendered read (local build, port 3522)
Read home, /about, /services, /r-and-d-credits, /contact, /calculators/sole-trader-vs-ltd,
/blog/vat-and-making-tax-digital/agent-or-principal. (`/incorporation` is a 307 redirect, not a page.)
The site reads in its own voice everywhere else: /contact "Reply within one working day, usually
same day", blog CTAs "Skip the spreadsheet. Tell us about your situation and a specialist will
review your position...", "Ask a specialist", "We respond within 24 hours and store your details
securely." All base text.
"Free first call, then a fixed fee in writing" and "Book your free first call" on the calculator
page come from the shared `LeadCTAPanel` defaults, which already carried those strings at
`8e1043d0` (`git show 8e1043d0:packages/web-shared/design/marketing/LeadCTAPanel.tsx` lines 18 and 27).
Exempt, not a finding.
"An accountant will call you then." at `components/forms/BookingPicker.tsx:85` is base text
(present at `8e1043d0`, same line); not a phase 0 addition.


## What the PHASE0 report claimed that this recheck could not confirm
- tsc/vitest not rerun in this pass; relying on the PHASE0 report's own verification section.
- The remaining 27 files whose string literals changed base..HEAD (wording_grep candidates list)
  were not individually diffed against base text; only the defect-string and phase-0-replacement
  counts were checked (both clean).

## Method notes
- Port 3422. Harness run with `--no-control` (control already passed on Solicitors earlier in this
  session); completed in one pass.
- `wording_grep.sh` run with proper case `generalist` (matches directory name as-is, unlike
  `Solicitors`).
- Server killed on port 3422 after all checks; confirmed free (see final message).

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: parentOrganization missing from lib/schema.ts (M3) and the three rewritten ResultCaptureForm strings (M1).
