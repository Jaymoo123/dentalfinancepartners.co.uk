# Solicitors phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation, gov.uk control scrollWidth =
390). Nothing deployed.

## Verdict
SAFE TO DEPLOY mechanically, one gap: `Solicitors/pipeline/submit_indexnow.py` does not exist (all
other checked sites have one). Everything else measured passes.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 23 at 1280, 23 at 390 | harness summary.md |
| lead form on every money page | 23/23 PASS | 1-4 forms per route, none at 0 |
| one form under each calculator result, no gate | 10/10 calculator routes PASS | `PremiumCalculator.tsx:496` `gated = false` permanently; `ResultGate` on `law-firm-sale-cgt` renders inline, not modal-blocking, reveal is scripted |
| header CTA visible 1280 / hidden 390 | 23/23, 23/23 | harness `header CTA` column all "2 PASS" / "0 PASS" |
| scrollWidth 390 on every page | 23/23 | worst case still 390 |
| raw markup as text | 0 pages | harness `raw markup` column all PASS |
| focus ring on first form control | 22/23 | 1 route (`/calculators/law-firm-sale-cgt`) reports `NOLAND BUTTON` (harness could not locate a focusable control to test, not a visible defect) |
| submit / primary CTA contrast >= 4.5 | 23/23, flat 5.84 on every route | harness |
| canonical self-referencing | 23/23 PASS | harness `canonical self` column |
| sitemap lastModified real or omitted | PASS | `sitemap.ts:85` blog posts use `post.date`; 6 other entry blocks omit `lastModified` per `sitemap.ts:43-44` comment; 0 `todayUrls` |
| Organization node with parentOrganization | 23/23 | harness `Org parent` column `PASS AccountingService` throughout |
| Service / FAQPage / BreadcrumbList on segment + service pages | present on all 4 `/for-*` and `/services`, `/services/[slug]` | harness counts 1/1/2 pattern; home is 0/0/0 (not a segment/service page, not required) |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | 200 utm=62/63, 200, 200 pub=true, 200 | report.json `siteFiles` |
| lead-nurture delayHours | first eight: 0,0,4,20,24,48,72,96 | matches expected exactly; second (detail-capture) array `0,24,48,168` unchanged, correctly out of scope |
| defect-string count base vs HEAD | 57 vs 57, matched per file | wording_grep.txt (no file present in only one column) |
| phase-0 replacement strings at HEAD | 1: `niche.config.json:12` `cta.next` "We reply within 24 hours..." | config-only field; grepped for renders, see Findings #1 |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report already ran both clean, 219 tests) | docs/solicitors/PHASE0_2026-09-28.md "Verification" section |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **MEDIUM** `Solicitors/pipeline/submit_indexnow.py` does not exist. Every other checked site
   (Property, Medical, Dentists, generalist, digital-agency, ecommerce, hospitality, care,
   charities, construction-cis, contractors-ir35, crypto, divorce-finances, pharmacies,
   startups-tech, wills-probate) has one. PHASE0_2026-09-28.md does not mention IndexNow for
   Solicitors at all (out of scope for that pass), so this is a pre-existing gap, not a phase0
   regression, but it is the one item in section 5's checklist this site fails.
2. **LOW** `niche.config.json:12` `cta.next` = "We reply within 24 hours and one of our accountants
   comes back to you directly." is new since base (known estate-wide, brief item 2). Grepped
   `cta.next|cta\.next` across `Solicitors/web/src` and `templates`: no component reads this key on
   this site (`site.ts` does not surface `cta.next`, only `cta.sticky_secondary` and
   `cta.variants`). Config only, not rendered — no wording finding.
3. **LOW** `/calculators/law-firm-sale-cgt` harness focus-ring check returns `NOLAND BUTTON`
   instead of PASS/FAIL; this is a harness script-focus miss (its result gate reveal button uses a
   non-standard click handler), not confirmed as a missing focus ring by inspection of the
   screenshot. Flagged, not counted as a defect.
4. **CONFIRMED** PHASE0 report's delayHours line numbers (409/424/445/462/493) match: HEAD array
   reads `0,0,4,20,24,48,72,96`, exactly Property's shape.
5. **CONFIRMED** PHASE0 report's footer-to-`/contact` decision: `niche.config.json:151` overrides
   the shared `SiteFooter` default (`/book`) to `/contact`, and `/contact` renders 1 form
   (`curl` HTML, harness `lead forms` column = 1). `/book` itself is token-gated
   (`app/book/page.tsx`) and correctly not linked from the footer.

## Wording (Opus reader section)
## Wording

Deterministic walk of `git diff 8e1043d0 HEAD -- Solicitors/web/src Solicitors/niche.config.json`
(29 files, +136/-112). Defect-string counts match base exactly: TOTAL base=57 HEAD=57
(`wording_grep.sh Solicitors`). Every positioning sentence is back at its base text.

| file | classification |
|---|---|
| `niche.config.json` (`entity` block incl. `entity.next`) | CONFIG-NOT-RENDERED. `next` sits inside `entity`, not `cta`. Only `entity.firm` is read, at `web/src/lib/organization-schema.ts:15` (schema description). `EntityBlock` (the one component that renders `next`) is imported by zero files on this site: `grep -rn EntityBlock Solicitors/web/src` = 0 hits. Ruling keeps `entity` as machine copy. |
| `app/about/page.tsx`, `app/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/data.ts`, `app/for-*/page.tsx`, `app/uk-solicitor-tax-rates/page.tsx`, `app/sra-compliance/page.tsx`, `app/specialist-vs-generalist-accountant/page.tsx`, `lib/health-check/rules.ts`, `lib/tools/configs/*.ts` | MECHANICAL. Every hunk is an em-dash to comma/colon swap or a US-to-UK spelling fix (`specialize`, `optimization`, `centers`, `practicing`). Sentence structure identical to base in all of them. |
| `app/page.tsx` `<p>` to `<h1>` | MECHANICAL, and correct: the h1 text is the pre-existing hero heading "Specialist accountancy matching for UK solicitors and law firms", not new prose. |
| `app/sitemap.ts`, `lib/organization-schema.ts`, `components/audience/AudienceStageLayout.tsx` (Service node), `components/tools/premium/PremiumCalculator.tsx` (`gated = false`), `config/lead-nurture.ts` (delayHours 0,0,4,20,24,48,72,96), `app/admin/analytics/login/page.tsx` (focus-visible ring) | MECHANICAL, all stay per the ruling. No mechanical regression found: the ring, the form mount count (base=25 HEAD=25) and the delayHours array are all still at today's state. |
| `app/page.tsx` metadata title | SURVIVING AGENT STRING, LOW. HEAD `"Accountants for Solicitors UK 2026/27 \| SRA + LLP + Partner Tax"`; base `"Accountants for Solicitors UK 2025/26 \| SRA + LLP + Partner Tax"` (`app/page.tsx`, title and openGraph.title). A tax-year bump, not positioning prose; rendered in the `<title>` and og:title. Owner call. |
| `lib/tools/configs/llp-profit-share.ts:118` | SURVIVING AGENT STRING, MEDIUM, rendered. The em-dash sweep replaced a dash *glyph placeholder* with a comma: HEAD `value: r.partners.length > 0 ? gbp(Math.round(topPartner.share)) : ","`, base `... : "—"`. With no partners the "Highest" tile prints a bare comma. Only instance of this shape on the site. |

### Rendered read (local build, port 3521)
Read home, /about, /services, /services/sra-accounts-rules, /for-partners, /for-locum-solicitors,
/contact, /calculators/llp-profit-share-allocation, /blog/vat-compliance/conveyancing-vat-rules-uk-2025-26.
The site reads in its own pre-phase-0 voice throughout. Restorations confirmed live:

- home: "Specialist accountancy matching for UK solicitors and law firms"
- /about: "We match you with an accountancy firm from our partner network that works with solicitors, law firms, and legal practitioners."
- /contact: "A specialist reads your enquiry and comes back to you"
- /for-partners and /for-locum-solicitors closers: "30-minute scoping call. We confirm scope (FA 2014 audit, SA filing, pre-sale planning) and quote a fixed annual fee."
- /services hero button: "Book a free scoping call"; home hero: "Book free consultation"

Zero occurrences of the phase 0 phrasing on any rendered page: no "Free first call, then a fixed
fee in writing", no "We reply within 24 hours and one of our accountants", no "One of our
accountants will call you within 24 hours", no "An accountant will call you then".
The calculator panel copy ("Confirm your figure with a specialist solicitors' accountant" /
"Client account rules are unforgiving...") is base text, present at `8e1043d0` in
`components/tools/CalcResultCta.tsx`; not a finding.

Nothing on any page read machine-written or out of voice apart from the stray comma above.
Noted for the inventory agent, not a wording item: the calculator page still renders a
"Your result / Your figure is ready... / See my result" reveal step from
`components/calculators/ResultGate.tsx` (still imported at `components/tools/CalculatorClient.tsx:18`),
sitting below an already-visible result.


## What the PHASE0 report claimed that this recheck could not confirm
- The 47 em-dash removals across 18 files (line-by-line) were not individually re-diffed; spot
  checks on `for-partners/page.tsx` and `services/page.tsx` (0 em-dashes at HEAD in both) are
  consistent with the claim.
- tsc/vitest were not rerun in this pass (mechanical recheck only); relying on the PHASE0 report's
  clean run.

## Method notes
- Port 3421. Harness run in foreground (not backgrounded) after an initial background attempt was
  killed for producing no output; final run completed cleanly, ~3.5 minutes wall time for 23 pages
  (Solicitors samples 1 of 196 blog posts, as instructed).
- `wording_grep.sh` required the proper-case site name (`Solicitors`, not `solicitors`); the
  lowercase first attempt returned all zeros and was rerun.
- Server killed on port 3421 after all checks; confirmed free (see final message).

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: the bare comma at llp-profit-share.ts:118 (M5) and the missing pipeline/submit_indexnow.py (M6); the 2026/27 title bump is an owner call.

## Fix round (2026-09-29)

**M5** `Solicitors/web/src/lib/tools/configs/llp-profit-share.ts:118`.
Before: `value: r.partners.length > 0 ? gbp(...) : ","` — bare comma in the "Highest"
tile with zero partners (em-dash sweep collapsed the dash placeholder glyph).
Base glyph (`git show 8e1043d0:...llp-profit-share.ts`) was an em-dash `—`.
After: `"–"` (en dash, U+2013), not an em-dash, per instruction.

**M6** No `Solicitors/pipeline/submit_indexnow.py` existed. Created it, mirroring
`Property/pipeline/submit_indexnow.py`'s shim exactly, `SITE_KEY = "solicitors"`.
`optimisation_engine/indexing/config.py` already had a `solicitors` entry
(host `www.accountsforlawyers.co.uk`, key `b5e67f188da49b020b33f4e8d08cb384`) matching
the existing key file `Solicitors/web/public/b5e67f188da49b020b33f4e8d08cb384.txt` — no
new key generated, config.py untouched (out of edit scope, already correct). Script not run.

**L2** Title year 2025/26 → 2026/27 on `web/src/app/page.tsx`: left as is. 2026/27 is
the current UK tax year as of 2026-09-28, so the bump is a factual correction, not
agent prose — no action needed.

tsc: `npx tsc --noEmit -p Solicitors/web` — pass, 0 errors.
vitest: `npx vitest run` (Solicitors/web) — 18 files, 219 tests passed.
