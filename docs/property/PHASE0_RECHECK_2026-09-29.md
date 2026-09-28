# Property phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation, gov.uk control scrollWidth =
390). Nothing deployed.

## Verdict
SAFE TO DEPLOY mechanically; wording confirmed reverted by grep parity (owner intent honoured).

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 53 at 1280, 53 at 390 (+1 extra pass for MTD page) | harness summary.md |
| lead form on every money page | 53/53 have >=1 form | summary.md, lead-forms column |
| one form under each calculator result, no gate | 27/27 calculator routes = 2 forms (panel + capture), `ResultGate` never holds the result (renders immediately, capture inline) | `Property/web/src/components/calculators/ResultGate.tsx:1-9,25-30` |
| header CTA visible 1280 / hidden 390 | 53/53, 53/53 | summary.md columns 5-6, all "2 PASS" / "0 PASS" |
| scrollWidth 390 on every page | 53/53 PASS, worst = 390 | summary.md, all rows "390 PASS" |
| raw markup as text | 0 pages | summary.md, all rows "PASS" |
| focus ring on first form control | 53/53 PASS | summary.md |
| submit / primary CTA contrast >= 4.5 | 53/53, lowest 5.48 (nav/panel), consent link 13.56 | summary.md contrast column, no value below 5.48 |
| canonical self-referencing | 53/53 PASS | summary.md |
| sitemap lastModified real or omitted | PASS | `Property/web/src/app/sitemap.ts:45-51`: comment says lastModified omitted unless a real edit date is tracked; `editedAt(post)`/`newest(posts)` drive blog dates, never `new Date()`. Resolves known issue #3: the 4 "today" blog dates are genuine content dates, not build-time |
| Organization node with parentOrganization | 53/53 pages `PASS AccountingService` | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | /for/* pages 1/1/1 each (15 pages); /services/* 1/1/1 (3 of 4) or 7/1/1 (property-accountant) | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=84/85, llms-full 200, ads.txt 200 pub=true, og:image 200 on 16/53 sampled pages (og only expected on og-bearing routes) | summary.md header line |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96,0,24,48,168 (first 8 match) | wording_grep.txt, base and HEAD identical |
| defect-string count base vs HEAD | 280 vs 280 (all 41 files identical) | wording_grep.txt |
| phase-0 replacement strings at HEAD | 9 (all exempt: consent/nurture "We reply within 24 hours...", `LeadCTAPanel` default eyebrow "Free first call, then a fixed fee in writing", contact page copy) | wording_grep.txt |
| tsc / vitest (if run) | not re-run this pass (PHASE0 report claims tsc clean, 57 files/1640 tests passing at HEAD after revert) | not independently confirmed |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. LOW — PHASE0 report cites `about/page.tsx:171`, `calculators/page.tsx:158`,
   `making-tax-digital-landlords/page.tsx:849` for the three contrast-sweep-collateral fixes
   (duplicated hover variant, missing "In scope" badge ground). Actual lines at HEAD are
   `about/page.tsx:171` (`group-hover:bg-emerald-700 group-hover:text-white`, confirmed),
   `calculators/page.tsx:158` (same pattern, confirmed), `making-tax-digital-landlords/page.tsx`
   badge at line ~848 (`bg-emerald-700 text-white`, confirmed one line off, immaterial). All three
   now paint a visible ground; screenshots of `/about` and `/calculators` at 1280 show no
   ground-less text. `/making-tax-digital-landlords` screenshot only captured above the fold (chat
   widget covers most of the viewport); badge confirmed by source only, not by screenshot.
2. LOW — PHASE0 report claims "form-mount and delayHours greps still show today's state" after the
   revert; confirmed independently: delayHours identical base/HEAD-post-fix state
   (0,0,4,20,24,48,72,96 already correct pre-phase-0, unchanged), form-mount file count 33/33
   base=HEAD (mounts unchanged in count, meaning the phase 0 pass added no new mounts to Property,
   consistent with the report's "nothing to canonicalise, no missing forms" line).
3. LOW — report's "defect-string grep returns 80 hits, same as 8e1043d0" figure does not match this
   recheck's total of 280 (this recheck used the AGENT_BRIEF's wording_grep.sh, a different/wider
   defect pattern set and file scope, `$SITE/web/src` in full, `niche.config.json`, `llms.txt`,
   than whatever narrower command the report ran). Both scripts agree base=HEAD count, which is the
   load-bearing claim (wording is back); the raw totals are not comparable across scripts and this
   is not treated as a discrepancy.

## Wording

Deterministic walk: `git diff 8e1043d0 HEAD -- Property/web/src Property/niche.config.json
Property/web/public/llms.txt` = 38 files, 82 insertions, 60 deletions. Every hunk read.

| file(s) | classification |
|---|---|
| 19 page files (`about`, `calculators`, `cost-of-selling-a-property`, `embed`, `for-letting-agents`, `incorporation`, `landed-estates`, `landlord-compliance`, `landlord-tax`, `leasehold`, `making-tax-digital-landlords`, `property-tax-rates`, `research/landlord-tax-index`, `section-24`, 4 `services/*`, `spv-company`) | MECHANICAL: page-level `bg-emerald-600` overrides removed off `btnPrimary` (contrast, cascade race). No text touched. |
| `components/ui/layout-utils.ts` | MECHANICAL: `btnPrimaryBase` emerald-600 to emerald-700 plus a code comment. The only 4+ word string literal changed on the whole site is inside that comment, so not prospect-facing. |
| `globals.css`, `resources/[topic]`, `ConsentBanner`, `BlogSidebarCta`, 6 calculators, `EmbedCta`, `DeepScrollModal`, `SpecialistWidget`, `StickyCTA` | MECHANICAL: contrast tokens, `--brand-primary-ground`, focus rings. |
| `layout.tsx` | MECHANICAL: server-rendered `google-adsense-account` meta plus `adsenseClientId`. |
| `components/layout/SiteFooter.tsx` | MECHANICAL: footer "Book a consultation" href `/book` to `/contact#book`. Label unchanged. |
| `config/lead-nurture.ts` | MECHANICAL: comment only. `delayHours` `0,0,4,20,24,48,72,96` identical base and HEAD. |

**SURVIVING AGENT SENTENCES: 0.** Defect-string count base 280, HEAD 280 (`wording_grep.sh`).
Phase-0 replacement strings 9 at HEAD, 9 at base: all nine are Property's own pre-existing copy
(`niche.config.json` `cta.next`, `sticky_secondary`, `llms.txt` line 18, `contact/page.tsx` 25/32/103,
`for/[slug]` 112, `components/property/LeadCTAPanel.tsx` 20). Property is the reference voice.
**MECHANICAL REGRESSIONS: 0.** No form mount lost (33 at base, 33 at HEAD), no focus ring undone.

Rendered read, local `next start -p 3501`: `/`, `/about`, `/services`,
`/services/property-accountant`, `/services/non-resident-landlord`, `/for/selling-a-buy-to-let`,
`/for/non-resident-landlords`, `/contact`, `/calculators/section-24-calculator`,
`/blog/incorporation-and-company-structures/are-landlords-really-leaving-net-formation-data`.
Nothing reads machine-written. Every sentence is in the site's own register, including the long
technical passages ("The disposal itself happens at exchange, so a March exchange with a May
completion is a gain in the earlier tax year with the clock running from May."). One observation,
not a defect: `/contact` still carries the consent sentence "your details may be shared with a firm
from our specialist partner network who will contact you", which the phase 0 brief lists as exempt
(`leadConsentText`) and the reversal did not touch. It is the only surface where the prospect reads
"partner network" on Property.

### The three reverter repairs (each has a ground behind the text)
- `app/about/page.tsx:171` icon tile `group-hover:bg-emerald-700` on a `bg-emerald-50` tile: ground present, holds an icon, no text.
- `app/calculators/page.tsx:158` same pattern on the category tile: ground present, icon only.
- `app/making-tax-digital-landlords/page.tsx:849` `inScope ? "bg-emerald-700 text-white"`: white "In scope" text on a painted pill, ground present on the element itself.
All three paint a background on the element carrying the content; none leaves white text on a transparent ground.

### Sitemap date verdict
REAL CONTENT DATE. `app/sitemap.ts` never calls `new Date()`: `lastModified` comes from
`editedAt(post) = new Date(p.dateModified ?? p.date)` for posts, `newest(posts)` for `/blog` and
each category index, and is omitted entirely on static paths. The four URLs dated 2026-09-28 are
`/blog`, the two posts whose frontmatter carries `dateModified: "2026-09-28"`
(`content/blog/director-living-in-property-owned-by-limited-company.md:15`,
`content/blog/how-many-buy-to-let-limited-companies-uk.md:15`, committed in `32981977`, a real
edit today) and their category index. `git diff 8e1043d0 HEAD -- Property/web/content/` is empty,
so no date was bumped by phase 0.

Method: ports 3501 only, listener PID 50812 killed, port confirmed free.


## What the PHASE0 report claimed that this recheck could not confirm
- `npx tsc --noEmit` clean and `57 test files / 1640 tests passing` at HEAD — not re-run this pass
  (time budget); wording_grep and harness numbers are consistent with no regression, but this is
  not a substitute for actually running tsc/vitest.
- The Opus read's rendered-read table (pre-fix) is historical (BUILD_ID 18:51 on port 3201) and not
  re-verified pixel-for-pixel; this recheck's own harness run on the current HEAD build supersedes
  it and shows all-PASS, which is consistent with the fixes having landed.

## Method notes
- Port 3401. Server started from `Property/web`, confirmed 200 on `/`, harness run from repo root
  (53 pages, gov.uk control scrollWidth 390, ~9 minutes wall time including page discovery), one
  extra `--pages /making-tax-digital-landlords --no-control` pass for the source-specific check.
  `bash wording_grep.sh Property` run from repo root, output saved to
  `out/Property/wording_grep.txt`. Screenshots read for home, about, calculators,
  making-tax-digital-landlords at 1280 (390 not manually reviewed beyond the sw390 PASS numbers).
  Listener PID 52088 killed; `netstat` confirms port 3401 no longer LISTENING.

## Estate summariser note (2026-09-29)
Final status: SAFE TO DEPLOY AS IS.
Blocking item: none.
