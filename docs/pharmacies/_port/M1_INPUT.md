# M1 input — compiled handoffs, pharmacies design port

Compiled 2026-10-07 from every receipt in `docs/pharmacies/_port/` plus
`R1_PHASE1_REVIEW.md` and `V1_PHASE1_VERIFICATION.md`. **W7, G1_R1_GAPFIX,
G2_GLOBALS_FIX, G3_GROUNDS_FIX receipts are ABSENT from this directory** —
anything that depends on them (chiefly the `NextStepOffer` mounts, and B1/S1
cascade fixes if G1-G3 were meant to close them) is listed below as still
open, not as done. Owner items (PHASE2-6_PACKAGES.md §A9) are excluded from
the main table and listed separately. Kit edits (`packages/**`) are excluded
and listed separately.

## 1. Items for the manager (M1)

| id | item | file:line target | source | class |
|---|---|---|---|---|
| M01 | Wire `buildBlogPostingJsonLd` call site; confirm `post.updatedDate` is the real field name before pasting | `pharmacies/web/src/app/blog/[category]/[slug]/page.tsx`, after the `{post.schema && ...}` block | K9_RECEIPT.md §2, W2_RECEIPT.md §7/§8 | wiring |
| M02 | `NextStepOffer` mount, blog post template (W7 builds the component, mounts it nowhere) | `pharmacies/web/src/app/blog/[category]/[slug]/page.tsx:319` (after `RelatedArticles` close, before the `<style>` tag) | W2_RECEIPT.md §8 | mount (blocked on W7) |
| M03 | `NextStepOffer` mount, services detail | `pharmacies/web/src/app/services/[slug]/page.tsx:248` (after `FaqSection` close, before `LeadCTAPanel`) | W3_RECEIPT.md §8 | mount (blocked on W7) |
| M04 | `NextStepOffer` mount, for/[slug] detail (respect `noLeadForm`, must not add a capture surface on a flagged hub) | `pharmacies/web/src/app/for/[slug]/page.tsx:152` (same position; inside `!hub.noLeadForm` or above both branches) | W3_RECEIPT.md §8 | mount (blocked on W7) |
| M05 | `data-cta` on the submit buttons of the 4 form files W6 declined to touch (package lock forbids touching `data-cta|formId|...` lines mid-port) | `LeadForm.tsx:431`, `MiniCapture.tsx:208` suggested; `DetailsForm.tsx`/`BookingPicker.tsx` recommended left untagged (post-submit, not enquiry) | W6_RECEIPT.md §6 | data-cta |
| M06 | `calc_index_help` data-cta cannot be emitted without a help-CTA link label; one `niche.config.json` string unblocks it | `niche.config.json` (new string) then `calculators/page.tsx` one-line add | W4_RECEIPT.md §7 | data-cta / config |
| M07 | W5 band-10 wording deletion: two column headers ("Area", "Our approach") retired when the table became a numbered list. **Flag for R3**: wording deletions are forbidden by the owner ruling. Propose restoring as visually-hidden text or reverting to the table | `pharmacies/web/src/app/page.tsx` band 10 (`NumberedReasons`) | W5_RECEIPT.md §9 item 2, §4 | copy-needed / review |
| M08 | `src/lib/calculators/site.ts` carries a SECOND copy of `leadConsentText`, duplicating `config/site.ts`'s; wants one import, not two literals | `src/lib/calculators/site.ts:7-8` | W4_RECEIPT.md §12 item 2 | kit-gap-adjacent / cleanup |
| M09 | `LeadForm.tsx:65` dead local `const consentText = ...`, never read (consent rendered inline at `:398-405`); matches the package lock pattern so W6 could not delete it | `src/components/forms/LeadForm.tsx:65` | W6_RECEIPT.md §10 item 1 | cleanup |
| M10 | `og:image` absent on `/contact`, `/book`, `/complete`, `/thank-you`, both research pages, `/terms` (and no `images` on privacy/cookie policy); `/api/og` is the shared route, wants one mechanical sweep across 9 `Metadata` exports | 9 page files | W6_RECEIPT.md §10 item 7 | copy-needed / mechanical |
| M11 | `/services/page.tsx:26`-style machine-built hub description lowercases "VAT" ("Practical guides on vat and retail schemes...") in a meta description on 5 routes; fixing means authoring 5 descriptions | `blog/[category]/page.tsx:26` | W2_RECEIPT.md §6 D4 | copy-needed |
| M12 | `ReadingProgress` bar (`fixed top-0 z-50`) paints over the kit header's `sticky top-0 z-40` top edge; same-specificity utilities, winner is stylesheet order not attribute order, so no call-site className fix is reliable | `packages/web-shared/design/blog/ReadingProgress.tsx:36` vs `SiteHeader.tsx:449` | W2_RECEIPT.md §6 D1 | kit-gap (see §3 below too) |
| M13 | B1 (blocker): skip-link focused ground renders `primary-600` (3.71:1, under the 4.5 text floor), not the declared `primary-950` (12.18). Kit's `focus:bg-primary-600` utility (`@layer utilities`) always outranks the site's `a[href="#main"]:focus` rule in `@layer components`. One-line fix: move the rule out of the layer (unlayered carve-out) or add `!important` inside the layer | `pharmacies/web/src/app/globals.css:217` (P1-A's rule) | R1_PHASE1_REVIEW.md B1, V1_PHASE1_VERIFICATION.md B1 | wiring (cascade) |
| M14 | B2 (blocker, tagging not build): working tree already carries phase 2/4/5 page work (blog, services, calculators, homepage) newer than the reviewed `.next/BUILD_ID`. Decide explicitly whether to tag phase 1 from a tree holding only phase-1 OWNS files, or retire the phase-1 tag and record combined scope | tag/versioning decision | R1_PHASE1_REVIEW.md B2 | wiring / process |
| M15 | S1: `.ground-dark` declared but only half-mounted in the *reviewed build* — 11 live sub-floor focus rings (1.00/2.54/1.56) on `/` and `/calculators/[slug]`. **Note: the current worktree's `page.tsx` (W5) already adds `.ground-dark` to the three bands** — re-verify against HEAD before treating this as still open; report honestly either way, do not carry as a silent footnote | `pharmacies/web/src/app/page.tsx` hero/band2/NHS band | R1_PHASE1_REVIEW.md S1 | already-fixed-elsewhere (pending re-verify against W5) |
| M16 | S4: fixed `StickyCTA` bar covers the last footer row, including the site's only consent (PECR) control, at both 390 and 1440 | `components/layout/PageShell.tsx` / footer wrapper, needs bottom padding (e.g. `pb-24`) equal to bar height while mounted | R1_PHASE1_REVIEW.md S4 | mount / kit-gap (P1-C's file) |
| M17 | S5: 5-column footer reads as 4 headings over 4 self-links (SERVICES/RESOURCES/CALCULATORS/BLOG each link to themselves); `/for` has no footer column at all. Fix is data (`niche.config.json` `navigation` children + `resourcesHref`), not code | `niche.config.json` | R1_PHASE1_REVIEW.md S5 | config / data-cta-adjacent |
| M18 | B2 (verification): grounds regression — `darkOnDark` true on 17/35 routes, `adjacentSame` (white-on-white) on 5 routes, because footer is `bg-slate-900` and several last-content bands are already dark. New in phase 1, not inherited | footer ground / band ordering, multiple routes | V1_PHASE1_VERIFICATION.md B2 | review / wiring |
| M19 | S2/S3 (receipt corrections, not code): "0 unlayered rules" claim is true only of pharmacies' own authored `globals.css`; 149 unlayered rules in built CSS are kit motion-layer (`@font-face`/`@property` + `globals-standard.css` imports), confirmed not-a-regression by V1. Also: inherited unlayered `h1..h6{line-height:1.2}` beats the homepage h1's `leading-[1.1]` utility (60px/72px vs declared 66px) — write the line, don't leave undeclared | `globals.css` comments / receipts | R1_PHASE1_REVIEW.md S2/S3; V1_PHASE1_VERIFICATION.md built-CSS checks | already-fixed-elsewhere (V1 confirmed 0 authored-rule regression; still needs the declarative line in the receipt) |
| M20 | 11 navigation timeouts recorded by V1 (vs 3 baseline) — re-run in isolation before trusting the count; plausible session contention, not reproduced as a code defect | instrumentation | V1_PHASE1_VERIFICATION.md §For R1 item 3 | review |

## 2. Kit gaps for the manager (packages/** — excluded from the table above by design)

| id | gap | file:line | source |
|---|---|---|---|
| K01 | `SlimHero` has no slot above the `h1`/eyebrow for a breadcrumb trail | `packages/web-shared/design/primitives/SlimHero.tsx:53-56` | W3_RECEIPT.md §9 item 3; W6_RECEIPT.md §4 decline 1 |
| K02 | `CardStack`/`CoverageCards` card body has no class hook for anchor colour/focus ring when body contains authored `<a>` tags | `page-blocks.tsx:120`, `CoverageCards.tsx:119-134` | W3_RECEIPT.md §9 item 4 |
| K03 | `CoverageCards` `glow` surface hardcodes Property's emerald rgba, unusable on a non-green brand | `CoverageCards.tsx:88` | W3_RECEIPT.md §9 item 5; W5_RECEIPT.md §6 D3 |
| K04 | `LeadCTAPanel` non-contained variant hardcodes `bg-slate-900`, no ground/class prop — visible ground change on every site that adopts it | `LeadCTAPanel.tsx:103` | W3_RECEIPT.md §9 item 6; W5_RECEIPT.md §6 D6 |
| K05 | `NoticeCard` hardcodes `text-center`, no alignment prop — left-aligned prose (methodology/caveat blocks) reads worse centred | `NoticeCard.tsx:38` | W6_RECEIPT.md §4 decline 2 |
| K06 | `ReadingProgress` bar z-index collides with kit header's sticky z-index; same-specificity utilities, source-order dependent | `ReadingProgress.tsx:36` vs `SiteHeader.tsx:449` | W2_RECEIPT.md §6 D1 |
| K07 | No declared `--chart-series-2` token; a two-series chart on a single-hue ramp needs a second hue and must use a literal | `globals.css` (token ask) | W6_RECEIPT.md §2 |
| K08 | `NumberedReasons`' `.story-numeral`/`.story-numeral-rule` motion depends on a per-site CSS rule not present estate-wide outside Property — **now closed for pharmacies by K9_RECEIPT.md §4**, listed here only so it isn't re-filed as unreached | `NumberedReasons.tsx:62,69` | W5_RECEIPT.md §6 D4 — already-fixed-elsewhere, K9_RECEIPT.md §4 |

## 3. Owner items (excluded from the M1 table; PHASE2-6_PACKAGES.md §A9 + receipt owner questions)

- Nine serious P0-A rows the owner already ruled on 2026-09-29: composite testimonials and cookie-policy-vs-AdSense/retention-months are LEFT AS IS.
- P0-A "not serious" list in full (fixed-fee promise, three who-we-act-for claims, "Most popular" badge, `llms.txt` currency rendering, two-dataset pharmacy count drift, five uncited income-tax constants) — no package touches any of it.
- `niche.config.json`: stale `brand.logo_path`, 175-char `description`, 7-vs-5 blog category drift.
- `app/admin/analytics/login/page.tsx:39` ring defeat — out of the port's lease.
- New FAQ section visible on 22 blog posts (was JSON-LD only) — owner keep/rename/drop call (W2_RECEIPT.md §11).
- Per-category blog CTA copy not authored, one shared triple across 5 categories, per 2026-10-07 decision (W2_RECEIPT.md §11).
- `/book` and `/complete` not in `robots.txt` disallow while `/thank-you` is (W6_RECEIPT.md §10 item 5).
- No `/research` hub route exists; breadcrumbs run `Home > <index>` with no middle crumb (W6_RECEIPT.md §10 item 6, also A6 in PHASE2-6_PACKAGES.md).
- Nav label "For" reads as a truncation next to Services/Research/Blog/About/Contact (R1_PHASE1_REVIEW.md M5).
- `WhatToExpectCard` declined everywhere (no items to pass without authoring copy); four config strings would unblock it on `/contact`/`/book` (W6_RECEIPT.md §4 decline 3).

## 4. Already-fixed-elsewhere (verified, not re-opened)

- K9's `lib/schema.ts` FAQ-answer HTML strip + `buildBlogPostingJsonLd` export + `globals.css` `.story-numeral` block — all applied by K9_RECEIPT.md, closing W2/W3 handoffs.
- `tsc` baseline error at `research/pharmacy-openings-closures-index/page.tsx:69` — closed by phase 0 (confirmed independently by W2, W3, W4, W5, W6, K9).
- K4 `<noscript>` FAQ-visibility release in `layout.tsx` — already applied (W6_RECEIPT.md correction 4; V1 should confirm V30 passes).
- K3 accordion focus-ring token gap — already closed in kit source (W3/W4/W6 all re-verified).
- `components/ui/Breadcrumb.tsx` reduced to a delegation shim over the kit `Breadcrumb`, still has 3 live consumers (privacy/cookie/terms) — W6/M1 may switch those imports to the kit directly and delete the shim (W3_RECEIPT.md §9 item 7).

---

**Summary of what's still missing from this directory at compile time:** W7_RECEIPT.md, G1_R1_GAPFIX_RECEIPT.md, G2_GLOBALS_FIX_RECEIPT.md, G3_GROUNDS_FIX_RECEIPT.md are all absent. M02-M04 (NextStepOffer mounts) are blocked on W7. If G1/G2/G3 were meant to close B1/S1/B2/S4/S5 from R1/V1, re-check those items against HEAD before acting on M13/M15/M16/M17/M18 — this table reflects the receipts on disk now, not any later fix.
