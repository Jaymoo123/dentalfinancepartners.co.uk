# Phase 0 recheck, whole estate (2026-09-29)

Independent recheck of what phase 0 built and what the wording reversal put back, on local builds
at HEAD `213e50ab`, base `8e1043d0`. Nothing deployed, nothing pushed.

## Verdict

1. The tree is not safe to deploy as it stands. Six sites are clean, eight need small fixes, three
   should not go live: wills-probate (consent and fee wording deleted), construction-cis (a result
   still held back from first-time readers, and a social image that 404s) and ecommerce (the nurture
   timing fix was never applied).
2. What blocks it is not the wording reversal, which worked. It is a handful of mechanical jobs
   phase 0 reported as done or never looked at, plus one compliance deletion on wills-probate.
3. The fix round is small: 11 sites, about 22 files, 11 agents at one per site (five share one
   sitemap pattern, so one agent could take those five).

## Findings, ranked and deduplicated

### HIGH

| # | what | sites | file:line | what phase 0 claimed |
|---|---|---|---|---|
| H1 | Consent paragraph on `/contact` shortened: the 3+3 recipient cap and the "we may be paid a fee" line are gone, replaced by the shared consent text, which says neither. Sister site divorce-finances still renders the full paragraph | wills-probate | `web/src/app/contact/page.tsx:57` | not mentioned; the revert list does not include this file |
| H2 | Homepage fee disclosure deleted outright ("We may receive a fee if you go on to use their services") | wills-probate | `web/src/app/page.tsx:303-309` | claimed the shared form text covers it; that text does not mention a fee |
| H3 | Nurture timing was never changed: `delayHours` is still base `0,0,4,24,48,96,168,264`, so nurture runs about 25 days instead of about 4 | ecommerce | `web/src/config/lead-nurture.ts` | the report says form-mount and delayHours "still show today's state"; the array was never touched |
| H4 | Calculator result still gated for first-time visitors inside blog posts | construction-cis | `components/calculators/premium/PremiumCalculator.tsx:504`, `components/blog/BlogPostRenderer.tsx:274,281,294,300` | gate removal not mentioned for this site at all; earlier work covered only standalone calculator pages |
| H5 | `og:image` returns 404 on every page (points at `/brand/icon-alt.png`, which does not exist) | construction-cis | `web/public/brand/` (file absent) | never measured by builder or reader |
| H6 | Body copy carrying an HTML link renders as visible markup on the `/services` hub | charities | `web/src/data/charity-services.ts:307` via `web/src/app/services/page.tsx:46` | not mentioned; the detail pages fix the same trap and carry a comment about it |
| H7 | Sitemap `lastModified` is build-time `new Date()`, so every static and hub URL claims it changed today (13 to 17 routes per site) | care, charities, contractors-ir35, startups-tech, wills-probate | `web/src/app/sitemap.ts` (care 10-26, charities 12-49, contractors-ir35 12-47, startups-tech 10-47, wills-probate 11) | care and charities said the check was not run; the other three never mention the file |

### MEDIUM

| # | what | sites | file:line | what phase 0 claimed |
|---|---|---|---|---|
| M1 | Surviving agent sentences: the new inline capture under calculator results carries rewritten copy instead of the base modal copy (blurb, success line, placeholder on Medical; heading, blurb, success line on generalist). Medical lost every medical-specific clause | Medical, generalist | `Medical/web/src/components/tools/ResultCaptureForm.tsx:22,24,26`; `generalist/web/src/components/calculators/ResultCaptureForm.tsx:21,22,24` | reported as a mechanical gate removal |
| M2 | Surviving change: the closing block on every blog post now varies by category instead of the one site-wide block it showed at base. The ruling says remove the template read and restore the shared closer | contractors-ir35 | `components/blog/BlogPostRenderer.tsx:54-58,381-387` | not listed as wording |
| M3 | Organization schema has no `parentOrganization` on any page | generalist, ecommerce | `generalist/web/src/lib/schema.ts:95`; `ecommerce/web/src/lib/schema.ts` | generalist's own report already deferred it; ecommerce claimed the shared builder |
| M4 | Surviving agent prose on `/about`: a hand-rolled panel, not the shared one, carrying "Send us your details" and "We reply within 24 hours and one of our accountants comes back to you directly." It sits a few hundred pixels below restored base copy that says "from our partner network" | Dentists | `niche.config.json:12`, `web/src/app/about/page.tsx:100-106` | treated as config only; `/about` existed at base, so it is rendered prose |
| M5 | The em-dash sweep left a bare comma where a dash glyph was: the "Highest" tile prints "," when there are no partners | Solicitors | `lib/tools/configs/llp-profit-share.ts:118` | counted as punctuation only |
| M6 | No IndexNow script; every other site has one | Solicitors | `Solicitors/pipeline/submit_indexnow.py` absent | out of scope for phase 0, so pre-existing |
| M7 | Footer "Book a consultation" reaches `/book`, which renders no form without a token, only a link on to `/contact` | ecommerce | `PageShell.tsx:122-126`, `app/book/page.tsx:61-77` | claimed the footer rule met |
| M8 | Header keeps a plain "Contact" text link visible at 390 on all 25 pages; the button itself is correctly hidden | care | `components/ui/SiteNav.tsx` | documented as a deliberate trade-off, never re-measured |
| M9 | `Service` and `BreadcrumbList` schema missing on all 11 segment and service pages; the site still has no header or footer component at all (phase 1 design port) | startups-tech | `web/src/app/for/[slug]`, `web/src/app/services/[slug]` | the report says so itself, so not a false claim, just not done |

### LOW

- L1 charities: the new `/about` panel passes a custom eyebrow ("Get started") and a description written today, where the ruling says pass no copy (`web/src/app/about/page.tsx:52-57`).
- L2 Solicitors: page title year bumped 2025/26 to 2026/27 by an agent, rendered in title and og:title (`web/src/app/page.tsx`). Owner call.
- L3 digital-agency: sitemap uses one frozen constant dated 2026-07-08 for seven static blocks, pre-existing (`web/src/app/sitemap.ts:83`).
- L4 Dentists: no `og:image` meta on inner pages. L6 Medical: the chat bubble opens on load at 390 and covers the hero button text.
- L5 dead but unreachable gate code (`gated = false`) on Dentists, Solicitors, generalist, digital-agency, contractors-ir35, crypto and both legal sites. Harmless.
- L7 startups-tech: the superlative "the UK's specialist accountancy firm" now feeds the Organization schema description (`niche.config.json` `entity.firm`).

### Phase 0 claims the recheck could not confirm

- U1, all 17 sites: `tsc` clean and the test suites passing after the reversal. Not re-run this pass; every report relies on the phase 0 figures.
- U2 Medical: the focus-visible outline fix. The harness measures no outline on the first control of all 25 pages, so either the fix misses that control or it only fires on real keyboard focus.
- U3 pharmacies: `parentOrganization` in the Organization node. The harness fails on node type, not on the field; the wording reader confirmed it in source.
- U4 Property: defect-string totals, 80 in the phase 0 report against 280 here. Different scripts and scopes; both agree base equals HEAD, the load-bearing claim.
- U5 construction-cis: whether `og:image` broke during phase 0 or before it. Never measured; broken now regardless.

Struck as harness artefacts, not findings: "0 lead forms" on two-step forms (nine sites, all confirmed by curl); gate false triggers on "unlock" in body copy and on chat widgets the regex misses; og:image "-" meaning no meta, not a 404; one transient timeout on crypto; the wills-probate "duplicate hero copy" (hydration payload); Property's four sitemap URLs (real content dates).

## Safe to deploy

| site | status | blocking item |
|---|---|---|
| Property | safe | none |
| crypto | safe | none |
| digital-agency | safe | none (L3 sitemap constant, pre-existing) |
| hospitality | safe | none |
| pharmacies | safe | none |
| divorce-finances | safe | none |
| Medical | after fixes | M1 capture copy; U2 focus ring unconfirmed |
| Dentists | after fixes | M4 `/about` panel prose |
| Solicitors | after fixes | M5 bare comma; M6 IndexNow script |
| generalist | after fixes | M3 parentOrganization; M1 capture copy |
| care | after fixes | H7 sitemap; M8 header link at 390 |
| charities | after fixes | H6 raw markup on `/services`; H7 sitemap; L1 panel copy |
| contractors-ir35 | after fixes | H7 sitemap; M2 blog closer |
| startups-tech | after fixes | H7 sitemap; M9 schema (header and footer are phase 1) |
| construction-cis | not safe | H4 live gate; H5 og:image 404 |
| ecommerce | not safe | H3 nurture timing; M3 parentOrganization; M7 footer target |
| wills-probate | not safe | H1 and H2 consent and fee deletions; H7 sitemap |

## Wording verdict

The reversal held. CLEAN: Property, care, construction-cis, crypto, digital-agency, ecommerce,
hospitality, pharmacies, startups-tech, divorce-finances. Surviving sentences: Medical 3,
generalist 3, Solicitors 2 (a comma, a year in a title), Dentists 2 (one new panel), charities 1
(one new panel), contractors-ir35 1 (the blog closer), wills-probate 2 deletions not rewrites.

Four cross-site observations, all owner-led wording pass items, none a revert failure:

- Both legal sites' new `llms.txt` describes a firm that does the work, while every restored page
  says the site is an information service that hands you to a third-party firm, so an answer engine
  quoting the machine file describes the wrong service.
- divorce-finances `/services`: the kept intro reads as the firm doing the work; the block two
  sections below says the site introduces you to a regulated firm and may take a fee.
- Base-state items the reversal restored: the slug pasted into English in segment closers
  (ecommerce, hospitality, pharmacies, startups-tech, crypto), and the "Editorial content only."
  footer on hospitality, wills-probate and divorce-finances.

## Recommended fix round

One agent per site, 11 sites, about 22 files. No new sentences: a wording defect is fixed by
restoring the `8e1043d0` text, a mechanical defect mechanically.

- **wills-probate**: restore the base consent paragraph (`contact/page.tsx:57`) and the base fee
  paragraph (`page.tsx:303-309`) verbatim from `8e1043d0`, plus the sitemap job.
- **construction-cis**: ungate the blog-embedded calculator (`PremiumCalculator.tsx:504`) and point
  `og:image` at an asset that exists in `public/`.
- **ecommerce**: `delayHours` to `0,0,4,20,24,48,72,96`; add `parentOrganization` to `lib/schema.ts`;
  point the footer "Book a consultation" at `/contact#form`.
- **Medical** and **generalist**: replace the rewritten `ResultCaptureForm` strings with the base
  `ResultGateModal` text, verbatim (one shared pattern). Medical also needs the focus-ring claim
  settled by a real keyboard check; generalist also needs `parentOrganization`.
- **contractors-ir35**: remove the category-closer read in `BlogPostRenderer.tsx` so the base
  site-wide closer renders again, plus the sitemap job.
- **charities**: render `service.intro` through the html path the detail pages use; drop the custom
  copy on the new `/about` panel; plus the sitemap job.
- **Dentists**: swap the hand-rolled `/about` panel for the shared one with no custom copy.
- **Solicitors**: fix the bare comma at `llp-profit-share.ts:118`; decide the 2026/27 title; add
  `pipeline/submit_indexnow.py` from another site's template.
- **care**: sitemap job, plus a decision on the mobile "Contact" text link (keep and record it, or
  hide it like every other site).
- **startups-tech**: sitemap job, plus `Service` and `BreadcrumbList` on its 11 segment and service
  pages; header and footer stay with phase 1.

One shared pattern covers five: take `lastModified` from real content dates or omit it, on care,
charities, contractors-ir35, startups-tech and wills-probate (divorce-finances and Property are the
models; digital-agency's frozen constant rides along).

## Method

9 agents (4 Sonnet inventory, 4 Opus readers, 1 Opus summariser), harness at 1280 and a real 390
emulation with gov.uk control scrollWidth 390, base `8e1043d0`, HEAD `213e50ab`, nothing deployed or
pushed.
