# PORT BLUEPRINT — SLICE 3: CONTACT/POST-SUBMIT, ABOUT, RESEARCH, RESOURCES, HEALTH-CHECK, LEGAL, PILLAR STATICS, INTERRUPTIVE STACK, BRAND LAYER, INSTRUMENTATION + GUARDS

Sources read in full 2026-09-10: rollout §4.3 + appendix A/D/E/F/K/L/N, DESIGN_SYSTEM §0 §4d §8 §9 §10, DESIGN_PORT_PLAYBOOK in full, generalist `_port/DISPOSITION_SLICE3.md` + `DESIGN_DELTA.md`, `packages/web-shared/design/**`, and every Solicitors file named below. Live checks against the pre-port production server on `http://localhost:3121`.

---

## 0. Premise check (corrections to the brief come first)

| Brief said | Verdict | Evidence |
|---|---|---|
| Solicitors imports nothing from `web-shared/design` | **TRUE** | `grep -rn "web-shared/design" src` = 0. Non-design kit imports (console, lead-nurture, analytics, leads) are extensive. |
| `globals.css` 522 lines, UTF-8 BOM, mojibake, bespoke `--crimson*`/`--slate-blue*`, canonical `--brand-primary*`, duplicated CSS-class recipes | **TRUE** | 522 lines; `head -c3` = `efbbbf`; mojibake `â€”` at :6 and `â‰¥` at :8; `--crimson*` :14-18, `--slate-blue*` :21-24, `--brand-primary*` :56-58; `.siteContainerLg` :105, `.sectionY` :111, `.btnPrimary` :128, `.btnSecondary` :155, `.btnOnDark` :177, `.card-premium` :227, `.card-flat` :241, `.hero-glass` :248. |
| The CSS-class button/container forms have zero consumers | **TRUE** | `className="btnPrimary"` etc. across all forms = **0 hits**. `.hero-glass` = 0. `.btnMailOutline` (:200, not in the brief's list) = **2 consumers**, so it is not free to delete. |
| `.card-premium` 13 consumers, `.card-flat` 6 | **FALSE, overcounted.** Actual **11** and **5**. | `card-premium`: about:43,58,73,91 · locations:57 · page.tsx:217,356,445,585 · sra-compliance:123,150. `card-flat`: locations/[slug]:236,258 · page.tsx:262,334,382. In slice 3's own scope: 6 of 11 and 0 of 5. Rule unchanged (both are the pre-redesign `border` + 1rem/0.75rem recipe). |
| Buttons render `border-radius: 9999px` | **TRUE** | `.btnPrimary` :137 and the TS constant `layout-utils.ts:21` both `rounded-full`. No `--radius`, no `--radius-xl`, no `--btn-radius` anywhere. |
| `tw-animate-css` not a dependency; missing it fails the build at CSS parse | **TRUE, and worse** | Absent from `Solicitors/web/package.json`, but **present at `node_modules/tw-animate-css`** hoisted by the 9 other sites that do declare it (`^1.4.0`). So an added `@import "tw-animate-css"` would resolve *by accident* today and stop resolving the moment another site drops it. This is the exact `check_dependency_closure.py` failure class. Declare `"tw-animate-css": "^1.4.0"` in the same commit as the import. `globals-standard.css:23` states the requirement explicitly. |
| GA is genuinely run, `layout.tsx` ~:108 renders `ConsentedScripts` with `gaMeasurementId="G-N6ZPRB3DSQ"` | **TRUE in substance, line/mechanism off.** | `layout.tsx:107` renders `<ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />`; the literal `G-N6ZPRB3DSQ` lives in `Solicitors/niche.config.json → seo.google_analytics_id` (and as a comment at `layout.tsx:91`). Confirmed live: `curl localhost:3121/ | grep -c G-N6ZPRB3DSQ` = 1. Posture `opt-out`, gate `state === "denied"` (`ConsentedScripts.tsx:24`). |
| `leadConsentText` byte-identical to Property's | **TRUE** | Constant at `src/config/site.ts:19` (exported field at :63). Python string compare against `Property/web/src/config/site.ts:39` = IDENTICAL. **Do not touch.** Its only slice-3 render path is `MiniCapture.tsx:42` (`ResourceGate` → `formId="resource_block"`). |
| `site.ts:8` reads `niche.company.registered_office` unguarded | **TRUE** | `const office = niche.company.registered_office;` at :8, destructured at :9. Property guards `(niche?.company ?? {})`. |
| `/resources` is a live 404 with no redirect | **TRUE** | `curl -o /dev/null -w '%{http_code}' localhost:3121/resources` = **404**. `resources/[topic]/page.tsx:56` links `href="/resources"` from all 8 topic pages. `next.config.ts:19-63` has 6 redirects, none for `/resources`. Absent from `link_baseline.json`. |
| `LegalIncorporationCharts.tsx` marks charts `role="img"` at :41 :103 :182 | **TRUE, and the defect is larger.** | All three `role="img"` confirmed. But the **wrapper `<div>` of each chart already carries `aria-hidden="true"`** (:36, :98, :177), so the `role`/`aria-label` are dead: the entire figure, label included, is removed from the accessibility tree. Every value lives only in an SVG `<title>` inside that hidden subtree (invisible on touch, unreachable by AT). Axis/legend/value text is `fontSize` 7-9. |
| "26.2% of SRA firm closures" on 4 pages, absent from house_positions | **TRUE** | `page.tsx:211`, `page.tsx:595`, `about:50`, `sra-compliance:117`. `grep "26.2" docs/solicitors/` = no hit in `house_positions.md` or anywhere else in the repo. See §7 for the verification verdict. |
| Interruptive stack exists and is mounted site-wide; `ExitIntentModal` unmounted | **TRUE** | `layout.tsx:110` ReturningBar, `:111` DeepScrollModal, `:114` SpecialistWidget (inside `IntentProvider` :108). `PageShell.tsx:26` StickyCTA. `ExitIntentModal.tsx:38` exports the component; **importers = 0** (the only other three hits are comments: `PageShell.tsx:5`, `SpecialistWidget.tsx:18` and `:136`). Dead file, safe to delete. |
| No UI or design guard tests; 9 test files, all logic-level | **TRUE** | `src/tests/{intent-engine,lead-contactability-bridge,lead-dossier,lead-payload,lead-submit-route,lead-submit-verify}.test.ts` + `lib/resources/resources-golden`, `lib/tools/compute/solicitors-tools`, `lib/tools/premium/premium-tools`. |
| 22 distinct `data-cta` ids, mixed conventions | **TRUE** | Full census in §9. |
| 41 armed `monitored_pages` rows to 2026-10-06/07 | **TRUE** | `_port/README.md:47-55`. `contact` is in the frozen set and is slice 3's. |
| 194 `font-serif` uses | **TRUE** | `grep -ro font-serif src | wc -l` = 194 across 39 files; **80 of them are slice 3's** (per-route counts in §2-§6). |
| 330 em-dashes across 274 routes | **TRUE** | `link_baseline.json.totalDashes` = 330. Slice-3 routes carrying them: `/uk-solicitor-tax-rates` 10, `/specialist-vs-generalist-accountant` 3, `/sra-compliance` 2, `/about` 1, `/free-firm-health-check` 1. Every other route in this slice is already at 0. |
| 83 US spellings across 26 files | **UNVERIFIABLE AS STATED; the naive sweep is a T6 trap.** | A literal `center|color|organiz` grep returns 443 hits, of which ~440 are Tailwind class names (`items-center`, `text-center`) and schema.org literals (`"@type":"Organization"`, `organization_type`) that must NOT be changed. Rule-based, word-boundary, exclusion-filtered, slice 3's real breaches are **6**: `about:44` "specialize", `about:62` "optimizing", `about:105` "city centers", `sra-compliance` "practicing" x2, plus `page.tsx:595` "practicing certificate" (slice 1/2's). Sweep by rule with this pattern set, never by the word "center". |

**Two further premise corrections, both material:**

- **The brief's recommended button ground (rose-700) should be REJECTED.** Owner decision 1 says `#c41e3a` stays primary. Measured: **white on `#c41e3a` = 5.84:1**, which clears 4.5:1 comfortably and beats rose-600 (4.70) and is within 0.45 of rose-700 (6.29). Generalist needed the 700-step shift because orange-600 was 3.56:1; Solicitors does not, because its live brand already passes. Shifting the ground to rose-700 would change the visible colour of every button on the site for **zero** contrast gain, contradicting owner decision 1. Recommendation in §8: `--btn-ground: #c41e3a`, hover `#a01829` (7.90), active `rose-900 #881337` (9.57). Rose 50-950 supplies the ramp *steps* the single brand hex cannot.
- **Structured data does NOT drift from the page on the research routes (T17 does not bite here).** Each data page builds one `faqs` array and passes the same binding to `buildFaqPage()` and to the rendered `faqs.map()` (`uk-legal-incorporation-index` :42/:147/:433; `law-firm-survival-index` :37/:140/:411; `uk-solicitor-profession-structure` :38/:160/:471). Verified rendered: the SIC-codes answer appears 4x in the HTML at `/research/uk-legal-incorporation-index` (schema + visible). Do not invent a fix for this.

---

## 1. Standing facts for every row below

- **Zero kit consumption today.** Every row is CONSUME-THE-KIT: `SlimHero`, `NoticeCard`, `WhatToExpectCard`, `LeadCTAPanel`, `FaqSection`, `Breadcrumb`, `ExampleFigureNote`, `TopicSection`, `NumberedReasons`, `DrawnTickList`, `CoverageCards`, `RelatedArticles`, `Prose`/`Eyebrow`/`InlineLink` (`primitives/page-blocks.tsx`) all exist in `packages/web-shared/design/`. No new local primitives in this slice.
- **The kit has NO `MarketingSections`.** `/contact`'s WhoWeAre / WhyChooseUs / WhatWeCover must be **lifted from the local module Slice 1 authors** (F.7 + §4c), never copied. Hard dependency: slice 1 lands first.
- **`--accent` on this site is a SECOND HUE (slate blue `#475569`), not the brand.** `globals.css:45-47`: `--accent: var(--slate-blue)`, `--accent-strong: var(--slate-blue-strong) #334155`. Every legal-page and contact link renders slate-700 (**10.35:1**, passes), and `focusRing` outlines slate-blue. This is the L.2 two-hue case: ground/action = crimson, accent = slate blue. It is legible and does not need "fixing"; the delta records both hues. Do not blindly re-point `--accent-strong` at the brand.
- **`sectionY` is already canonical** (`layout-utils.ts:12` = `py-12 sm:py-16 md:py-20`; A.4 wants `lg:py-20`, one breakpoint token differs). `siteContainerLg` is already `max-w-6xl`. `contentNarrow` is already `max-w-3xl`. Container work in this slice is small; the CSS-class twins at `globals.css:99-126` disagree (`max-width: 1280px`, `padding-block: 3rem/5rem`) and are dead — delete them.
- **`contentNarrow` is the SANCTIONED legal measure.** `/privacy-policy`, `/terms`, `/cookie-policy` keep it. Everywhere else in this slice, a body clamp is a defect.
- **Grounds today, corrected in every row:** `--background #f8fafc` (slate-50) is the *page* ground and `--surface #ffffff` is white — the inverse of the standard's naming. Sections that write `bg-[var(--surface)]` are white; `bg-[var(--background)]` is slate-50. Read every class through that inversion before judging oscillation.
- **The dark ground is split three ways today:** research pages `bg-neutral-900 #171717`, footer `#1e293b`, everything else has no dark band at all (the statics use full-bleed crimson instead). Delta resolves to **slate-900 `#0f172a`** everywhere (§8).
- **Post-submit routes are absent from `link_baseline.json`** (noindex, not in the sitemap): `/thank-you`, `/book`, `/complete` have **no link floor**. Every other route in this slice has one, quoted per row.

---

## 2. Contact + post-submit

### R1 — `/contact` (`src/app/contact/page.tsx`, 157 lines) · floor **11** · ctas 2 · dashes 0 · `font-serif` x5 · **in the frozen `monitored_pages` set**

Final rendered order:

1. **Navy motif hero, net-new.** `<section class="relative overflow-hidden bg-slate-900 py-10 sm:py-12 lg:py-14 min-h-[300px] sm:min-h-[350px]">` + `<SolicitorsBackdrop tone="navy"/>` + `<div class="relative z-10">`: `Breadcrumb` (moved from :35-40), `Eyebrow onDark`, `h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"` keeping the string "Contact us" (:41), standfirst `text-base sm:text-lg text-slate-300 max-w-3xl` from :42-44, CTA row → `#book`. Replaces the bare `contentNarrow sectionY` div (:34) and the `font-serif` h1 (:41). Reason: F.7 opens navy; the page currently has no hero and clamps its whole body to `max-w-3xl`.
2. **`#book` slate-50 capture band**, `<div id="book" class="scroll-mt-24">`, `siteContainerLg`, `grid gap-8 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16`. **Left (wide):** white `rounded-xl bg-white p-6 sm:p-8 ring-1 ring-slate-200/70` card holding the h2 (:113-115) and `<LeadForm redirectOnSuccess submitLabel="Send enquiry" />` **byte-unchanged** (:120). **Right:** kit `WhatToExpectCard`, items ported verbatim from the three `<li>` at :96-107 **minus the 24-hour clause** (see gate). Replaces the `lg:grid-cols-[1fr_1.5fr]` at :68 and the two hand-rolled cards at :70-91 and :93-109. Reason: F.7 + D.3 (LeadForm never in a coloured card; the `bg-gradient-to-br from-[var(--primary)]/5` card at :93 is exactly that).
3. **WhoWeAre** (white) — consumed from slice 1's `MarketingSections`.
4. **WhyChooseUs** (slate-50) — same module.
5. **"Common enquiries"** — the four topic blocks at :127-152 become kit `CoverageCards columns={2}` on **white**, cards `bg-slate-50 rounded-xl ring-1 ring-slate-200/70`, h3 `text-base sm:text-lg font-bold text-slate-900` (currently `text-[var(--primary)]` at 14px semibold; crimson-on-white is 5.84 so this is a hierarchy fix, not a contrast one). Each card gains one deep link (SRA → `/sra-compliance`, Partnership/LLP → `/services`, LLP conversion → the LLP guide, Succession → `/resources/succession-sale`) — this is where the link headroom comes from.
6. **TestimonialsSection** (navy), third from last, only if real anonymisable quotes exist. **GATE:** none exist on this site today; omit rather than invent (§10 copy rule).
7. **WhatWeCover** (white) — slice 1's module. Navy never touches navy: white here keeps the footer clear.

Grounds: navy / slate-50 / white / slate-50 / white / navy / white / footer.

- **LINK FLOOR 11, zero headroom.** Two links are removed (the self-referential `href="/contact"` at :78 and the dead `/pricing` link at :57). Step 5 adds four. Net **+2**; state the count in the builder's report.
- **CONTENT DEFECT, live:** `:87` "Within 24 hours, typically same working day", `:98` "respond within 24 hours", plus `metadata.description` `:15` "24-hour response" and `openGraph.description` `:19` "24-hour response time". These are **turnaround promises**, banned outright by the locked content rules. Remove all four. `WhatToExpectCard` item 1 becomes "We read your enquiry and come back to you" with no interval.
- **PRICING, dormant:** `:52-66` renders our own fixed monthly pricing ("£49 a month" + `/pricing` link) behind `packagesMode`. `niche.config.json → cta.variant = "leadgen"` and `isPackagesMode` (`niche-config.ts:305`) requires `"packages"`, so **the branch does not render today** (confirmed: `curl /contact` finds neither "£49" nor "full pricing published here"). Owner decision 3 nonetheless removes it: delete :52-66, the `packagesMode` const :11, and the `isPackagesMode` import :9. `/pricing` 301s to `/services` (`next.config.ts:58-62`), so the link was pointing at a redirect anyway.
- `Wiring:` `LeadForm` props byte-unchanged; `siteConfig` (:5) still used by metadata; `niche` import retained only if `data-cta-variant` survives (it does not, once :52-66 goes — drop the import).
- `RETIRED:` `contentNarrow` body clamp (:34); the `dl` at :72-90 (its only row links to the form beside it, DS §4d's "worse than no CTA"); the gradient tint card (:93); `rounded-2xl border` x3 (:70, :93, :112, :125); 5x `font-serif` (:41, :71, :94, :113, :126); the `packagesMode` fork.
- `JSON-LD:` `buildOrganizationJsonLd()` (:26, emitted :30-33) is **already emitted site-wide** by `layout.tsx:87`. Duplicate `@id` nodes on one page. Delete the page-level emit and the import (:7). ADD `BreadcrumbList` via the kit `Breadcrumb` (it emits its own).

### R2 — `/thank-you` (`src/app/thank-you/page.tsx`, 211 lines) · no floor · `font-serif` x0

All four branches survive: `optout` (:44), `confirmed` (:68), default+`bt` (:165), default no-`bt` (:172). The `LEAD_NURTURE_ENABLED` copy fork (:102) is **not** collapsible.

1. **`SlimHero`** (kit) `py-8 sm:py-10 lg:py-12`, no `min-h`, eyebrow "Enquiry received", h1 `text-2xl sm:text-4xl lg:text-5xl`, backdrop. **The four §4d departures are honoured: no `LeadCTAPanel`, no breadcrumb, no hero CTA, and NO TICK BADGE** — `CheckIcon` (:14-26) is deleted, not restyled. It currently renders on all three branches (:49, :73, :99) as a 96px crimson disc; the tick survives only inside the progress row where it means "done".
2. **Aswatax paragraph moves byte-intact** into the hero standfirst (`:108-112` armed branch, `:119-124` unarmed branch). GATE: the carve-out is about the *words*; confirm placement is free to move.
3. **White body** `py-12 sm:py-16 lg:py-20`, `siteContainerLg`. **The `mx-auto max-w-2xl` clamp (:48/:72/:98) is deleted** and `text-center` with it (§4d: there is no place on this site where a body element is clamped).
4. **Endowed-progress `ol`** kept (:128-163), restyled to `ol grid gap-3 sm:grid-cols-3` with `rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70` items; done badges `bg-[var(--btn-ground)]`; `aria-current="step"` already present at :157, keep. Labels verbatim. Fixes the 390px squash from the `sm:flex-row` at :128.
5. **Two-column ask** `grid gap-8 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16`. Left: `BookingPicker token={bookingToken}` (:170) in a `rounded-xl bg-slate-50 p-6 sm:p-8 ring-1` card. Right: kit `WhatToExpectCard`. **GATE:** its five items must be drafted against `/privacy-policy` §5 before ship — that policy discloses up to six recipient firms, so no item may imply exclusivity or "we will not pass this on" (the exact Property incident, DS §4d).
6. **No-`bt` branch (:172-181) rewritten.** "Ready to book a time that works for you?" → `/contact` is a CTA whose only destination is the form the reader just submitted. Replace with kit `NoticeCard tone="slate"`: the enquiry is in, nothing else to do. The onward journey is step 7.
7. **"While you wait" slate-50 band, net-new:** `RelatedArticles columns={3}` + a literal `<a href="/blog">` + the `?rt=` return link. `returnPath` is already live here (:36, :196-205) with `data-cta="thankyou-return-article"` and `data-cta-placement="thank_you"` — **keep both strings exactly**; it is a live `vw_cta_performance` series.
8. `optout` branch keeps prose + one link and **no visual** — DS §0.2's single recorded exemption. It still needs a light section under the SlimHero so navy never touches the navy footer.

- `Wiring:` ADD `export const dynamic`-adjacent cache headers per F.6 (`private, no-cache, no-store`). This is a behaviour change; flag it in the phase log.
- `RETIRED:` `CheckIcon` (:14-26); `max-w-2xl` x3; `text-center` on the body; three hand-rolled `rounded-full border` buttons (:82-88, :184-195, :196-205 → `btnSecondary`/`btnOnDark`); the unused `siteConfig` import (:4).
- `JSON-LD:` none, and none added. `robots: { index: false, follow: true }` (:11) unchanged.

### R3 — `/book` (`src/app/book/page.tsx`, 57 lines) · no floor · `font-serif` x0

1. `SlimHero` **left-aligned**, eyebrow "Your callback", h1 "Book your free review call" (:31-33), standfirst (:34-37) verbatim including "no obligation". `text-center` (:31, :34) deleted.
2. White section `py-12 sm:py-16 lg:py-20`, `siteContainerLg`, clamp `mx-auto max-w-2xl` (:30) deleted, `grid lg:grid-cols-[1.6fr_1fr]`.
3. Left: `BookingPicker token={token}` (:40) unchanged, or the no-token fallback (:42-51) as kit `NoticeCard tone="slate"` with the copy **verbatim** and `btnPrimary` (:47) kept.
4. Right: kit `WhatToExpectCard` (same instance as R2, same privacy gate) + a "plans changed?" paragraph linking `/contact`.
- `Wiring:` F.6 cache headers. `RETIRED:` dead `siteConfig` import (:4); `max-w-2xl`; `text-center` x2; the hand-rolled notice card (:42). `JSON-LD:` none; `robots index:false, follow:false` (:16) unchanged.

### R4 — `/complete` (`src/app/complete/page.tsx`, 130 lines) · no floor · `font-serif` x0

All four branches survive: no token (:48), invalid/expired (:52), already-complete + freshly minted `book` token (:86-107), `DetailsForm` (:109).

1. `SlimHero` "Complete your details" (:118-120), standfirst (:121-124) verbatim — it keeps "a specialist firm from our partner network", which is the truthful pool-model wording.
2. White `py-12 sm:py-16 lg:py-20`, clamp (:117) and `text-center` (:118, :121) deleted, `grid lg:grid-cols-[1.6fr_1fr]`.
3. **Three hand-rolled cards → kit `NoticeCard`**: `NeedsLinkCard` (:24-36) and the expired card (:53-63) → `tone="slate"`; the "You are all set" card (:93-107) → `tone="emerald"`. This is precisely the drift the component exists to stop — the expired card is a hand-copy of `NeedsLinkCard`. Note the kit `NoticeCard` has **no red tone by design**; none of these states is the reader's fault.
4. `DetailsForm token missing` (:109) and the entire token/`adminSelect` logic (:51-110) **byte-untouched**. Add the comment Property carries: `verifyLeadToken` catches a missing or short `LEAD_NURTURE_TOKEN_SECRET` internally and returns `bad-signature`, so an unconfigured environment degrades to the expired card rather than a 500.
5. Right column: net-new `WhatToExpectCard` variant "Why we are asking". **GATE, same as R2**: every item drafted against `/privacy-policy` §5.
- `Wiring:` F.6 cache headers. `RETIRED:` 3 hand-rolled cards; `max-w-2xl`; `text-center` x2. `JSON-LD:` none; `robots` (:21) unchanged.

---

## 3. About

### R5 — `/about` (`src/app/about/page.tsx`, 133 lines) · floor **11, zero headroom** · ctas 4 · dashes **1** · `font-serif` x2

1. **Navy motif hero.** `Breadcrumb` (:31) into the hero; h1 (:34-36) loses `font-serif` and moves off `text-[var(--primary)]`. **Live measurement:** crimson `#c41e3a` on the page ground `#f8fafc` = **5.58:1**, so it passes today; on navy it would be **3.06:1 and FAIL**, so on the new navy hero the h1 is `text-white` and any accent is `text-rose-300` (9.44 on navy). Standfirst (:37-39) verbatim. **Net-new hero CTA → `#book`**, `data-cta="about_hero_book"` — today the page's first ask is at the very bottom and both closing asks leave the page.
2. **Four `card-premium` prose blocks (:43, :58, :73, :91) → kit `TopicSection`** with explicit oscillating grounds (white / slate-50 / white / slate-50), `id` + `scroll-mt-24`, `Eyebrow`, h2 `text-2xl font-bold text-slate-900 sm:text-4xl`, `Prose`. Copy verbatim except the fixes below. Reason: `.card-premium` is `border` + 1rem radius + a hover lift, the pre-redesign recipe; and DS §0.2 forbids prose-only sections, so each gains a figure:
   - "Why we specialise" → `NumberedReasons` over the three SRA/partnership/VAT strands already in the copy.
   - "Our approach" → `DrawnTickList tickClassName="text-[var(--btn-ground)]"` (the kit default tick is tuned for navy and measures ~1.9:1 on white — A.8).
   - "What makes us different" → `CoverageCards columns={2}` from the four bolded claims at :77, :80, :83, :86.
   - "Who we work with" → the five-item `ul` (:97-103) as a ruled statement list.
3. **`#book` `LeadCTAPanel`** replacing BOTH closing asks: the inline block at :110-122 and `<CTASection>` at :127-130 currently render the *same heading and the same body text twice, 6 lines apart*. One panel. `proofPoints` re-derived from the page's own claims ("Legal sector only", "Fixed fees agreed up front", "SRA Accounts Rules on a monthly rhythm"). Footnote: "No obligation. If your position is already right, we will say so."
4. **FAQ** — none exists; do not invent one. Tail is panel → white "Who we work with" → footer, which satisfies §9 by ordering rather than by adding a section.

- **LINK FLOOR 11, zero headroom.** Collapsing the duplicate closing asks removes one `/contact` link and `CTASection`'s two. `/contact` is already in the chrome, so re-linking it adds **zero unique links** (T14). Compensate with genuinely useful in-body `InlineLink`s: `/sra-compliance`, `/services`, `/resources/partnership-llp`, `/uk-solicitor-tax-rates`, `/free-firm-health-check`. Count and report; do not pad.
- **CONTENT DEFECTS, live:** `:50` carries the 26.2% statistic (§7). `:68` contains the slice's only em-dash on this route ("clear explanations—no jargon"). `:44` "specialize", `:62` "optimizing", `:105` "city centers" are US spellings. `:77` "**100% legal sector focus**… Every client is a solicitor" and `:53` "Every accountant on our team works only with solicitors" are **client-count / client-behaviour assertions on a lead-generation site that has no client records** (DS §10). Rewrite to what is evidenced: the site's scope, not its client base. `:65` "Our solicitor accountants work with sole practitioners…" same class.
- `Wiring:` `siteConfig` (:6) retained for metadata. `RETIRED:` `card-premium` x4; `CTASection` on this page; `font-serif` x2 (:34, :111); the `mx-auto max-w-3xl` clamps (:33, :42).
- `JSON-LD:` none today. ADD `BreadcrumbList` (kit `Breadcrumb`). Do **not** add `AboutPage`/`Person`.

---

## 4. Research (hub + 3 data pages + the shared charts file)

The brief says "the 4 research pages"; that is **the hub plus three data pages** (`law-firm-survival-index`, `uk-legal-incorporation-index`, `uk-solicitor-profession-structure`). There is no fourth data page.

**Estate-wide for all four:** the research routes are a **`neutral-*` island on an otherwise `slate-*` site** (`--ink #0f172a`, `--border #e2e8f0`, `--muted #64748b` are all slate). Every other surface, the footer, and the whole kit are slate. **Move research to slate**, not the site to neutral: it is a mechanical class swap on 4 files and it removes the one visibly wrong mix (a `neutral-900 #171717` band abutting kit `slate-900 #0f172a`).

### R6 — `/research` hub (`src/app/research/page.tsx`, 98 lines) · floor **14** · ctas 2 · dashes 0 · `font-serif` x0

1. Hero `bg-neutral-900` (:59) → `bg-slate-900` + `SolicitorsBackdrop tone="navy"` + `relative overflow-hidden` / `relative z-10`. Breadcrumb (:61), h1 (:65), standfirst `text-neutral-300` (:68) → `text-slate-300`.
2. Report cards (:82) `rounded-2xl border border-neutral-200` → `rounded-xl bg-white ring-1 ring-slate-200/70` on a **slate-50** section (:75 is `bg-white`; a white card on white has no edge, DS §4a).
3. Stat (:84) `text-[var(--primary)]` at 30-36px on slate-50 = **5.58:1**, passes, keep. Label (:85) `text-neutral-500` → `text-slate-500` (4.76).
4. **`:90` `text-neutral-400` "Updated {r.updated}" = 2.52:1 — a live WCAG failure.** → `text-slate-500` (4.76).
5. All four report entries and their derived stats are computed from the JSON snapshots; **never retype a number**.
6. **GATE:** the hub has no closing ask. Property's research hub has none either. Recommend leaving it capture-free; adding one is a capture-scope decision.
- `Wiring:` none new. `RETIRED:` `rounded-2xl`; `neutral-*`. `JSON-LD:` `BreadcrumbList` via the kit `Breadcrumb`; no `Dataset` at hub level.

### R7/R8/R9 — the three data pages · floors **13 / 12 / 13** · ctas 2 each · dashes 0 each · `font-serif` x0

One shared set of edits, applied three times (there is no shared layout file here — unlike generalist, each page inlines its own `Section`/`StatTile`; that is 3 edits, not 1, and it is the honest number).

1. **Derived-`HEADLINE_SENTENCE` h1 pattern KEPT** (the GEO asset). Never retype a figure.
2. **LIVE CONTRAST FAILURE, one per page:** the eyebrow `text-[var(--primary)]` sits inside the `bg-neutral-900` hero — `uk-legal-incorporation-index:177`, `law-firm-survival-index:182`, `uk-solicitor-profession-structure:190`. Crimson on `#171717` measures **~3.05:1** at 14px semibold uppercase. → `text-rose-300` (**9.44** on slate-900) or `text-rose-400` (6.63). Fix before anything cosmetic.
3. **Stat tiles move off the dark hero.** `<div class="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">` (:130 / :129 / :124) in the `grid grid-cols-2 sm:grid-cols-4` (:189 / :195 / :203) → body **slate-50** tiles `rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70`, value `text-3xl sm:text-4xl font-bold font-mono tabular-nums text-slate-900`, label `text-sm text-slate-600`. Property owner ruling.
4. **`Section` loses the auto-device.** `border-t border-neutral-200 py-10 first:border-t-0` (:139 / :120 / :133) → `py-12 sm:py-16 lg:py-20` with `tone` set explicitly by each caller, grounds oscillating white/slate-50. Roughly 6-8 sections per page written out.
5. **Key-findings card** `rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/5` (:216 / :222 / :230) → `rounded-xl bg-white ring-1 ring-slate-200/70` with an `Eyebrow`. A 5%-brand tint is decoration; DS §0.3 says colour is meaning.
6. **Tables:** `text-neutral-400` percentage parentheticals (`uk-legal-incorporation-index:323, 327, 331, 335`) = **2.52:1, live failure** → `text-slate-500`. Wrap every table in `overflow-x-auto` (already done at :301 / :279 / :336, keep) and add `tabular-nums`.
7. **Net-new `FigureCard` wrapper** around each chart: `rounded-xl p-4 sm:p-6 ring-1` with a tone opposing the section. Charts sit in bare `not-prose` divs today.
8. **`ExampleFigureNote`** on every figure-bearing visual. **GATE:** its literal string is "\* Example figures displayed", which is FALSE over Companies House / SRA / ONS official statistics. Either the component gains a `label` prop ("Source: Companies House Advanced Search API, SRA regulated-community statistics, ONS Business Demography · OGL v3.0") or a sanctioned deviation is recorded. Same gate generalist raised; resolve once for the estate.
9. **KEEP untouched:** the `Dataset` JSON-LD blocks, `temporalCoverage`, `variableMeasured`, `license` (OGL v3.0), `isAccessibleForFree`, and the `/data` CSV routes. **NOTE:** `law-firm-survival-index` emits a `Dataset` (`:88-114`) but has **no `data/route.ts`** — the other two do (`uk-legal-incorporation-index/data/route.ts`, `uk-solicitor-profession-structure/data/route.ts`). Either add the CSV route or drop the `Dataset` claim of accessibility. Recommend adding the route; it is 40 lines and the data is already in the snapshot.
10. **FAQ:** already rendered from the same binding as the schema (see §0). Restyle only, into kit `FaqSection`, and keep `buildFaqPage(faqs)` on the *same* array.
11. Closing card (`:407` / `:385` / equivalent): `rounded-2xl border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5` with two bare `&rarr;` links → the mid-page CTA block recipe (`mt-10 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8`), statement left, `btnPrimary` right. `&rarr;` entities retired.
12. **GATE:** all three research routes have **zero capture surfaces**. Adding any is capture-scope, owner-gated.
- `Wiring:` `data-cta` ids must be **slug-suffixed** so three routes do not merge into one analytics row: `research_incorporation_cta`, `research_survival_cta`, `research_structure_cta`. `RETIRED:` `neutral-*` ramp; `rounded-2xl` x~8/page; the `border-t first:border-t-0` device; `&rarr;`. `JSON-LD:` `Dataset` + `FAQPage` KEPT unchanged; ADD `BreadcrumbList`.

### R10 — `src/components/research/LegalIncorporationCharts.tsx` (239 lines, 2 consumers)

**T16, in its worse form.** Dispositions, one per chart:

- **`AnnualIncorporationChart` (:22-71).** Wrapper `<div … aria-hidden="true">` at **:36** — DELETE the attribute. `role="img"` (:41) + `aria-label` (:42) — DELETE both; a bar chart is not a single image. Each `<rect>` (:57) gets `aria-hidden="true"`; each `<title>` (:59) becomes a real `<text>` value label above the bar at `fontSize={11}` `fill="#0f172a"`; add a visually-hidden `<table>` sibling carrying year/value pairs for AT and for LLM scrapes. Year axis labels (:61-64) `fontSize={8}` → `11`.
- **`SraStructureChart` (:76-150).** Same three edits at **:98** (`aria-hidden`), **:103-104** (`role`/`aria-label`), :124-127 (`aria-hidden` the rects, values out of `<title>`). Legend text (:143) `fontSize={8}` → `11`. Year labels (:130-133) `fontSize={7}` → `11` with `d.year % 2` thinning kept. **Hardcoded hex `#7c6ff7` (:92) is the only non-token colour in the file** — replace with a slate/violet token; `#94a3b8` (:93) and `#cbd5e1` (:94) are slate-400/300 as *graphic fills*, which is fine at the 3:1 graphics floor, but every segment must be direct-labelled so nothing rests on hue.
- **`SurvivalComparisonChart` (:155-239).** Same three edits at **:177**, **:182-183**. This one already draws visible `%` labels (:205-208, :217-220) — good, but at `fontSize={8}`; raise to `11`. The comparison series stays **neutral slate-400 (:214)** and never red (A.1: "the other side gets a neutral minus, never a red cross").
- Bars recolour to `var(--btn-ground)` / the rose ramp per §8. `ExampleFigureNote` (with the source `label`) below each figure.

---

## 5. Resources (index + 8 topic pages) and the health check

### R11 — `/resources` index · **NET-NEW, currently a live 404** · no baseline floor (absent from the sitemap)

Owner default is BUILD. Justification, in one line: 8 indexable pages already promise it (`resources/[topic]/page.tsx:56`), the kit footer derives a Resources column from it, and there is no redirect to absorb it.

File: `src/app/resources/page.tsx`.

1. **Cream `TopicHero`** (`heroCreamSurface` from the kit = `bg-[var(--hero-cream,#fbfaf7)]`), `Breadcrumb`, `Eyebrow` "Free resources", h1 "Guides and models for law firms", standfirst, CTA row → `#book`. Cream rather than navy so the route is visually distinct from the research family.
2. **White section, `siteContainerLg`, `CoverageCards columns={3}`** generated from `publishedGuideTopics()` (`src/lib/resources/content.ts`) joined to `resourceForTopic()` (`src/lib/resources/registry.ts`). Every card links `/resources/<topic>` and, where `isXlsxEnabled(resource)`, carries a second `btnSecondary` + download affordance to `resource.xlsx.file`. **Derive from the registry; never hand-list the eight topics.**
3. **Slate-50 "How to use these" band** — three `NumberedReasons` rows.
4. `#book` `LeadCTAPanel contained` (light, because the FAQ-less tail would otherwise put navy against the navy footer).
- `Wiring:` `sitemap.ts` gains `/resources`. The 8 topic pages' "Back to resources" link stops 404ing. `data-cta="resources_index_book"`.
- `RETIRED:` nothing. `JSON-LD:` `BreadcrumbList` + `CollectionPage`; **no `Dataset`**, these are guides not datasets.
- **Alternative, if the owner declines the build:** a `next.config.ts` redirect `/resources → /solicitor-guides` (`permanent: true`, 308). Cheaper, but it leaves the footer without a hub and makes eight pages' primary back-link a redirect. Recommend the build.

### R12 — `/resources/[topic]` (`src/app/resources/[topic]/page.tsx`, 113 lines, renders 8 routes from ONE file) · floors **13,13,13,13,13,13,12,12** · ctas 2 each · dashes 0 each · `font-serif` x1

**Smallest edit point: one file, 8 routes.**

1. **Hero `bg-[var(--primary)] text-white` (:53) → navy + motif.** White on crimson is 5.84 and passes, but a full-bleed brand hero is decoration, not meaning, and it is the pattern §6 retires site-wide. `bg-slate-900` + `SolicitorsBackdrop tone="navy"`.
2. Hand-rolled "Back to resources" chevron link (:55-63) → kit `Breadcrumb` (`Home / Resources / <guide>`), which also emits `BreadcrumbList`. It resolves once R11 exists.
3. Eyebrow (:64-66) `text-[10px] … text-white/80` → kit `Eyebrow onDark` (11/12px). 10px is below the fine-print floor.
4. h1 (:67) loses `font-serif`. Summary (:70-74) keeps `max-w-3xl` (hero copy is the one sanctioned narrow measure).
5. **xlsx direct-download affordance (:75-86) KEPT** with its `download` attribute and `resource.xlsx.label`; restyled to `btnSecondary` on the navy hero → the real `btnOnDark`. The mechanics (`isXlsxEnabled`, `resource.xlsx.file`) are byte-kept.
6. **Body becomes two-column**: `article` → `siteContainerLg` → `lg:grid lg:grid-cols-[1fr_250px] lg:gap-12`. Main keeps `.article-body.prose-blog` (:99-102) — already the right class, do not change it. Sidebar: kit `TableOfContents` + `BlogSidebarCta`. The `mx-auto max-w-3xl` clamp (:92) goes; `prose-blog` already caps the measure at 65ch.
7. "Last reviewed / Version" (:93-98) → meta pills `text-xs font-semibold text-slate-600`.
8. **`ResourceGate` (:106) KEPT AS IS.** It is `MiniCapture formId="resource_block"` with `postSubmit="redirect"` and `siteConfig.leadConsentText` (`MiniCapture.tsx:42`). Restyle its wrapper only: `rounded-2xl border-l-4 bg-[var(--surface-elevated)]` → `rounded-xl bg-slate-50 p-6 sm:p-8 ring-1 ring-slate-200/70` on a white section. **QA must verify no email-gated arm remains** (carve-out 2, "never resurrect"); the docstring at :1-6 and `registry.ts:13` both say the gate was retired 2026-07-17. **Note for the deploy watch:** `resource_block` is the residual open item from the consent-wording incident (0 leads; renders fine). The port must not be read as the cause if that stays at 0.
- `Wiring:` `data-cta="resource_guide_book"` + `data-cta-placement="resource_<topic>"` so 8 routes stay separable.
- `RETIRED:` `font-serif` (:67); hand-rolled breadcrumb (:55-63); the 10px eyebrow; `max-w-3xl` body clamp (:92); the pill-radius download button.
- `JSON-LD:` currently **none**. ADD `BreadcrumbList` + `Article` (headline, `datePublished`/`dateModified` from `guide.frontmatter.lastReviewed`, publisher `@id` `#organization`). `dynamicParams = false` (:17) unchanged.

### R13 — `/free-firm-health-check` (`src/app/free-firm-health-check/page.tsx`, 216 lines) · floor **14** · ctas 2 · dashes **1** · `font-serif` x9

1. Hero `bg-[var(--primary)] text-white` (:86) → navy + motif; `Breadcrumb variant="light"` (:88) becomes the kit's `onDark`; h1 (:93) loses `font-serif`.
2. `HealthCheckWizard` (:110-ish, inside `bg-[var(--surface)]` :109) is the page's tool and **satisfies DS §0.2 on its own** — no figure needed beside it. Wizard internals stay functionally untouched.
3. **`Wizard.tsx:610-611` and `:625-626` are the site's only real severity ramp**: `high: border-red-200 bg-red-50 text-red-900` / `medium: border-amber-200 bg-amber-50 text-amber-900`. **This is the brand collision owner decision 1 names.** `red-900 #881337`-adjacent on `red-50` reads as the brand; move to the §8 warning ladder: high → `violet-700`/`violet-50`, medium → `amber-700`/`amber-50`, keeping the escalation direction and direct labels ("Priority", "Notable"). `Wizard.tsx:356` `text-red-600` is a **form error**, not a severity — that one stays red (errors are the one legitimate red on the site) but must be checked against the brand: `red-600` is 32.2 RGB units from `#c41e3a`, so pair it with the `role="alert"` it already has and an icon, never colour alone.
4. Three-step explainer (:120-131) → kit `NumberedReasons`. FAQ block (:135-146) → kit `FaqSection` fed from the same `FAQS` array already passed to `buildFaqPage(FAQS)` (:79) — one binding, both consumers.
5. Closing `bg-[var(--primary)]` band (:150-175) → `LeadCTAPanel`. The guide cards inside it (:166-170) move into a preceding slate-50 band.
6. Stat tiles (:202) and step cards (:210-212) lose `font-serif` and `rounded-2xl`.
- `RETIRED:` `font-serif` x9; `rounded-2xl` x4 (:140, :166, :210, and the stat wrapper); the crimson full-bleed heroes/bands x2. `JSON-LD:` `Service` + `BreadcrumbList` + `FAQPage` (:78-84) all KEPT; the `FAQPage` array must remain the one fed to `FaqSection`.

---

## 6. Legal x3 and the four pillar-shaped statics

### R14 — `/privacy-policy` (249 lines) · floor **11, zero headroom** · dashes 0 · `font-serif` x12

Frame conforms already: `contentNarrow` + `sectionY` + kit-shaped `Breadcrumb`. Design fixes are small; the **compliance trace is the work**.

Design: `font-serif` x12 dropped (:35 h1 and 11 h2s) — there is no serif face after owner decision 2, so today these already resolve to the browser default serif and will resolve to Plus Jakarta after; h1 → `text-3xl sm:text-4xl font-bold text-slate-900`; h2 → `text-2xl font-bold text-slate-900 sm:text-3xl`; the 11 inline `text-[var(--accent-strong)] underline` links → kit `InlineLink` (slate-700, **10.35:1**, keep the hue). **Content is a carve-out: no restyle may reword a sentence.**

**T18 trace — every claim against code that runs:**

| Claim | Traced to | Verdict |
|---|---|---|
| :66-68 enquiry-form fields "including through the form that may appear if you are about to leave a page" | `ExitIntentModal` is **unmounted** (0 importers). `SpecialistWidget.tsx` does carry an exit-intent trigger and does capture. | **TRUE via SpecialistWidget only.** Keep, but the sentence must survive R25's restyle unchanged; if SpecialistWidget's exit-intent trigger is ever removed the sentence becomes false. |
| :71-73 "**Email sign-ups:** if you subscribe to our updates or download a guide, we collect your email address" | `grep -rln "subscribe\|newsletter\|SignupForm" src` → **no subscribe/newsletter form exists on this site**. Guides are ungated (`registry.ts:13`, "OPEN RESOURCES … 2026-07-17"). | **FALSE, overstatement.** No email-only capture surface exists. **OWNER GATE:** delete the bullet, or keep it if a newsletter is planned. Same for :97-99 (§3), :115-118 (§4 consent basis), :185-186 (§6 "until you unsubscribe"), :199 (§7 withdraw consent). Four sections describe a lawful basis this site never uses. |
| :94, :106-113, :126-149 pool model, 3+3 = up to six firms, independent controllers, anonymised-first | `src/lib/leads/handoff.ts`, `enroll.ts`, caps documented in memory `pool_model_compliance_alignment` | **TRUE.** Byte-identical in substance to Property's. Leave alone. |
| :152-158 "If no firm takes up your enquiry … within 48 hours … after seven days … a single firm as part of a batch" | `src/lib/leads/{enroll,aux-cron,send-window}.ts` | **VERIFY the two intervals against the live cron config before ship.** A wrong number here is a defect either way (T18). |
| :165 Supabase (EU-hosted) | `src/lib/supabase/admin.ts` | TRUE. |
| :166 Google Analytics | `layout.tsx:107` → `ConsentedScripts` → `GoogleAnalytics.tsx` | **TRUE.** This is the opposite of the generalist finding; the disclosure stays and is expanded in R16. |
| :167 Vercel | deploy target | TRUE. |
| :168 Resend | `package.json` dependency + `src/lib/leads/channels.ts` | TRUE. |
| :169 Twilio (SMS) | `channels.ts:89-191` — real `twilioSendMessage` against `api.twilio.com/2010-04-01/.../Messages.json`; `src/config/lead-nurture.ts:376,393,408,444,463` schedule `channels: ["sms","whatsapp"]` steps | **TRUE.** Note the disclosure covers SMS **and WhatsApp**; the bullet says only "text messages". Add "and WhatsApp" or it understates. |
| :171-173 "**Anthropic, through the Vercel AI Gateway:** reading your enquiry to grade the type of work … and to write the one-line summary" | `dossier.ts:187` selects `intent_category, quality_score, summary`; the only in-repo Anthropic reference is `api/leads/inbound/email/route.ts:18` (inbound-reply classification). The grading producer is not in this repo. | **CONSUMED, producer out of view.** Do not delete. Confirm with the owner that the enquiry-grading job is live; if it is not, the sentence overstates. |
| :174 "**Companies House:** looking up publicly available information where you mention a company" | `handoff.ts:156-159` writes `ch_company_name`, `ch_company_number`, `ch_company_status` into what the receiving firm sees; `dossier.ts:187` reads the same columns. Producer out of repo. | **SUPPORTED at the consumption end.** Keep. Same owner confirmation as the row above. |
| :204 "We will respond within one month" | statutory (UK GDPR Art. 12(3)) | TRUE, and not a turnaround promise about services. |

- **LINK FLOOR 11, zero headroom.** Deleting the email-sign-up bullets removes no links. Do not remove `/cookie-policy` (x2) or `/contact` (x4).
- `Wiring:` `company.*` reads via `siteConfig.company`, which routes through the unguarded `site.ts:8`. **Port Property's guard** in the same commit: `const office = (niche?.company ?? {}).registered_office ?? {}`. Seven production `client_error` rows on Property came from partial chunk loads; this page and `/terms` are the two that render it.
- `RETIRED:` `font-serif` x12. `JSON-LD:` none; ADD `BreadcrumbList`.

### R15 — `/terms` (141 lines) · floor **11, zero headroom** · dashes 0 · `font-serif` x14

Design: identical treatment to R14 (`font-serif` x14 dropped, kit `InlineLink`, h2 scale). Content is a carve-out **with one exception**:

- **§2 (:56) "No accountant-client relationship is created by your use of this Site or submission of an enquiry form"** is true, but the page never discloses the referral model that `/privacy-policy` §5 spells out (up to six firms, and "we may be paid a fee by a firm your enquiry is passed to", :160-162). A terms page that describes only "formal engagements … subject to separate written engagement letters" implies we are the engaging firm. **OWNER GATE:** add one sentence to §2 mirroring the privacy policy's own wording, or record a decision that the privacy policy is the sole home for it. Recommend adding it; a notice that understates is a defect just as much as one that overstates (T18).
- `Wiring:` same `site.ts:8` guard. `RETIRED:` `font-serif` x14. `JSON-LD:` none; ADD `BreadcrumbList`.

### R16 — `/cookie-policy` (171 lines) · floor **11** · dashes 0 · `font-serif` x6

Design: same as R14/R15 (`font-serif` x6 dropped, kit `InlineLink` x6, h2/h3 scale).

**T18 trace, and this is the one page where the port must ADD a true disclosure rather than strip a false one:**

| Claim | Traced to | Verdict |
|---|---|---|
| :44 "We do not currently use any strictly necessary cookies" | no `document.cookie` writes anywhere in `packages/web-shared/analytics` | TRUE. |
| :49-53 first-party analytics: "two random identifiers", "record anonymous interaction events", "we do not store your IP address (only a country derived from it)", legitimate interest | `analytics/ids.ts:4-5` (`visitor_id` localStorage, `session_id` sessionStorage), `analytics/consent.ts:38,77` (localStorage), `analytics/server/createTrackHandler` | **TRUE**, and correctly filed under "similar technologies" since these are Web Storage, not cookies. |
| :61 `_ga` "Distinguishes unique users. Expires after 2 years." | GA4 via `GoogleAnalytics.tsx:13` (`gtag/js?id=G-N6ZPRB3DSQ`) | TRUE. |
| :63-65 **`_gid`** "Distinguishes unique users. Expires after 24 hours." | `_gid` is a **Universal Analytics** cookie. This property is GA4 (`/^G-[A-Z0-9]{6,}$/` enforced at `GoogleAnalytics.tsx:8`). UA was retired in 2024. | **FALSE.** Delete the bullet. |
| — missing — | GA4 sets a second cookie `_ga_<container>` = **`_ga_N6ZPRB3DSQ`** (session state, 2 years) | **UNDERSTATEMENT.** ADD it. This is the port's positive compliance addition. |
| :66-68 `_gat_gtag_*` "throttle request rate, 1 minute" | gtag.js does set `_gat_gtag_<id>` in some configurations | KEEP, but verify in a real browser session before ship rather than asserting it. |
| :71 "IP addresses are anonymised" | GA4 does not record IP addresses at all | Tighten to "Google Analytics does not store your IP address." Understating our own posture is still inaccurate. |
| :71 "Data is retained for 14 months" | a GA4 **property admin setting**; nothing in code proves it | **UNVERIFIABLE FROM CODE. OWNER GATE:** confirm the property's retention setting (GA4 default is 2 or 14 months) or delete the sentence. |
| :91 "Your choice … takes effect immediately" for **Google Analytics** | `ConsentProvider.reject()` → `state = "denied"` → `ConsentedScripts.tsx:24` returns `null`. But `gtag/js` is already injected and `window.gtag` persists for the rest of that page load; **no `gtag('consent','denied')` call is made anywhere**. | **OVERSTATEMENT for GA.** True for first-party analytics (`consent.ts` is read live on every event). Reword: "stops our own analytics immediately, and stops Google Analytics loading from your next page view." Alternatively fix the code by adding a `gtag('consent','update',{analytics_storage:'denied'})` on reject — that is a `web-shared` change and therefore manager-direct and out of slice 3's hands. **Recommend the wording fix now, log the code fix as a kit gap.** |
| :83 "We do **not** use cookies for advertising, remarketing, or selling your data" | no ad tags anywhere; `robots.ts` blocks AI crawlers only | TRUE. |
| :9, :13, :20 metadata "Google Analytics cookies explained" | true | keep. |

- `Wiring:` the "Do not track me" footer link is slice 1's (`ConsentToggle.tsx`); this page's §3 depends on it existing. `RETIRED:` `font-serif` x6. `JSON-LD:` none; ADD `BreadcrumbList`.

### R17 — `/sra-compliance` (206 lines) · floor **11, zero headroom** · ctas 4 · dashes **2** · `font-serif` x4 · `card-premium` x2

1. Hero (:79-105) → navy + motif; h1 (:92) loses `font-serif`; `Breadcrumb` (:87) `onDark`.
2. Section h2s (:113, :140, :175) `font-serif … text-[var(--primary)]` → `text-2xl font-bold text-slate-900 sm:text-4xl`. Crimson h2s at 30-36px pass contrast (5.84/5.58) but colour-as-hierarchy is the pre-redesign idiom.
3. **`card-premium` x2 (:123, :150) → `rounded-xl bg-white ring-1 ring-slate-200/70` / `bg-slate-50` per section ground.** Section at :134 uses `style={{ background: "var(--surface-elevated)" }}` (an inline style, `#f1f5f9`) → `className="bg-slate-50"`.
4. **`:154` `text-red-600` on the consequence line inside the breach cards is the brand collision.** `red-600 #dc2626` is 32.2 RGB units from `#c41e3a` — at 14px in a card it reads as a brand accent, not a warning. → §8 ladder step 3 (`text-violet-700`, 7.10 on white) or step 2 (`text-fuchsia-700`, 6.32), with the consequence direct-labelled ("Consequence:") so nothing rests on hue.
5. `CTASection` (:200) → `LeadCTAPanel`.
6. **CONTENT DEFECTS, live:** `:117` carries the 26.2% statistic **and the slice's clearest em-dash** ("breaches—up from 18.6%"), plus the year label "in 2024-25" which is the wrong scope (§7). "practicing" x2 → "practising".
- **LINK FLOOR 11, zero headroom:** `CTASection` contributes 2 of the 4 CTAs; `LeadCTAPanel` must carry at least as many outbound links, and the breach cards should each gain a deep link (`/resources/sra-compliance`, `/uk-solicitor-tax-rates`, `/free-firm-health-check`).
- `RETIRED:` `card-premium` x2; `font-serif` x4; `CTASection`; the inline `style` ground. `JSON-LD:` none today; ADD `BreadcrumbList`. If a FAQ is added, pair it with `buildFaqPage` on the same array.

### R18 — `/uk-solicitor-tax-rates` (162 lines) · floor **11, zero headroom** · dashes **10, the worst route in the slice** · `font-serif` x6

1. Hero `bg-[var(--primary)]` (:73) → navy + motif; h1 (:78) loses `font-serif`.
2. Two rate tables (:88-102, :112-126) keep their `overflow-hidden rounded-2xl border` wrappers → `rounded-xl ring-1 ring-slate-200/70` + `overflow-x-auto`, cells `tabular-nums`. `thead className="bg-[var(--primary)] text-white"` (:90, :114) is **5.84:1 and passes**; keep the brand header, it is the one place brand-as-ground is doing semantic work.
3. **`ExampleFigureNote` applies here with NO gate** — DS §0.3 names statutory rates, thresholds, deadlines and penalty amounts directly.
4. FAQ cards (:138) `rounded-2xl border-l-4` → kit `FaqSection` fed from the same `FAQS` array already at `buildFaqPage(FAQS)` (:66).
5. Closing `bg-[var(--primary)]` band (:148-158) with two hand-rolled pill buttons (:154, :155) → `LeadCTAPanel`. Buttons `px-6 py-3` = 44px, at the floor but not the 48px primary floor; `btnPrimary` fixes it.
6. **Every rate on this page must trace to `docs/solicitors/house_positions.md`** and be used within its stated scope — watch the Scotland fences on income tax, and the tax-year tag on dividends (HP §3: from 6 Apr 2026 use 10.75% / 35.75% / 39.35%, never untagged).
7. **10 em-dashes to remove**, more than the other four routes in this slice combined.
- `RETIRED:` `font-serif` x6; `rounded-2xl` x4; the crimson hero and closing band; 2 hand-rolled pill buttons. `JSON-LD:` `BreadcrumbList` + `FAQPage` (:65-67) KEPT.

### R19 — `/specialist-vs-generalist-accountant` (153 lines) · floor **11, zero headroom** · dashes **3** · `font-serif` x5

1. Hero `bg-[var(--primary)]` (:86) → navy + motif; h1 (:91) loses `font-serif`.
2. **The comparison rows (:105-118) are the page's argument and should be the kit `ComparisonTable`**, not 2-up cards: stacked below `md`, `<table min-w-[36rem]>` in `overflow-x-auto` above, our column brand-edged, and **a neutral slate-500 minus for the other side, never a red cross** (A.1). **T12/T13 warning:** the kit `ComparisonTable` forces a "Most recommended" pill and `featuredBadge` defaults to "Most Popular"; read its defaults before assuming an omission disables anything, and mirror locally if the pill cannot be turned off. Log any kit gap as an owner item — **never edit the kit mid-port**, that changes Property.
3. FAQ cards (:129) → kit `FaqSection` from the same `FAQS` array (:79).
4. Closing crimson band (:139-149) → `LeadCTAPanel`.
5. **PRICING BREACH, LIVE, IN MY SCOPE:** `:57` — *"Specialist fees are typically £180-£1,800/month … The fee gap to a specialist is usually smaller than the value of one missed planning point."* This is our own published pricing plus a comparative fee claim, rendered **both visibly and inside the `FAQPage` schema**. Owner decision 3 removes it. Replacement answers what is included, not what it costs, and drops the comparative claim entirely. `£180` is the `from GBP180/month` token the port README lists.
6. **Note on searching for it (T6):** the pound sign here is the literal character `£` in TSX, but in the location/resource **data** files it is stored as the six-character escape `£`. Sweep by rule with both representations plus `GBP` and `&pound;`, and prove zero hits per rule.
- `RETIRED:` `font-serif` x5; `rounded-2xl` x3; the crimson hero and band; 2 hand-rolled pill buttons (:145, :146). `JSON-LD:` `BreadcrumbList` + `FAQPage` KEPT — **the schema must be regenerated from the edited `FAQS` array, or the removed pricing survives in structured data** (the exact T17 failure, in reverse).

### R20 — `/law-firm-chart-of-accounts-template` (335 lines) · floor **16, the highest in the slice** · dashes 0 · `font-serif` x14

1. Hero `bg-[var(--primary)]` (:81) → navy + motif; h1 (:88) loses `font-serif`.
2. Five body sections (:115, :146, :185, :229, :273) already oscillate white / `--surface` / white / `--surface` / `--background`; keep the rhythm, set grounds explicitly as `bg-white` / `bg-slate-50`, and give each an `id` + `scroll-mt-24`.
3. Code-range cards (:134), principle cards (:174), numbered list (:213) → `rounded-xl … ring-1 ring-slate-200/70`; the numeral badge (:214) and range figure (:135) lose `font-serif` and gain `font-mono tabular-nums`.
4. **`#downloads` (:229-270) is the page's payload**: two cards, xlsx (:239-251) and pdf (:253-268). Keep both `download` links and both filenames verbatim; buttons → `btnPrimary` / `btnSecondary` (the pdf button at :262 is `py-3` = 44px, under the 48px primary floor). Add `PrintButton` with `print:hidden` beside the pdf.
5. FAQ cards (:281) → kit `FaqSection` from the same `FAQS` array (:71).
6. Closing `LeadCTAPanel` before the footer.
- **LINK FLOOR 16 is the most headroom in the slice** and the easiest to preserve; still count it.
- `RETIRED:` `font-serif` x14 (the largest single concentration in slice 3); `rounded-2xl` x7. `JSON-LD:` `Service` + `BreadcrumbList` + `FAQPage` (:70-76) KEPT.

---

## 7. The 26.2% statistic — VERDICT: VERIFIED, KEEP WITH A CORRECTION AND A HOUSE-POSITIONS ENTRY

Verified at source 2026-09-10. The figure is real and re-derivable; what is published around it is not all correct.

- **What is true:** breaches of the SRA Accounts Rules were the cause of **26.2% of SRA firm closures in the year to 30 September 2025** — **11 of 42** firms subject to closure — up from **18.6%** (**11 of 59**) the year before. Source checked: lawcareers.net, "Accounting breaches behind more than a quarter of SRA firm closures" (25 March 2026), which attributes the analysis to chartered accountants **Lubbock Fine** working from SRA closure data; corroborated by Law360 ("SRA Shuts Quarter Of Firms Over Accounting Breaches") and Solicitors Journal. It is **not** a figure the SRA itself publishes as a headline statistic.
- **Two things published today are wrong or unsupported:**
  1. `sra-compliance:117` dates it **"in 2024-25"**. The period is the SRA year **to 30 September 2025**. Correct the label on that page.
  2. All four instances present a bare percentage with no denominator. **n = 42**. A 26.2% share of 42 firms is one firm's difference from 23.8%, and the *count* of accounting-breach closures did not move at all (11 both years) — the share rose because total closures fell from 59 to 42. Publishing the percentage without that is technically true and materially misleading.
- **Recommended `house_positions.md` entry** (new section, wording for the owner to lock):
  > **SRA firm closures attributable to accounting breaches.** Year to 30 September 2025: **11 of 42** firms subject to closure (**26.2%**). Prior year: **11 of 59** (**18.6%**). The absolute count was unchanged; the share rose because total closures fell. Source: Lubbock Fine analysis of SRA closure data, reported March 2026 (lawcareers.net, Law360, Solicitors Journal); not an SRA headline publication. **Writing rule:** always give the period as "the year to 30 September 2025", always give the denominator, and never imply the number of accounting-breach closures increased.
- **Disposition:** keep all four instances, apply the writing rule to each (`page.tsx:211`, `page.tsx:595` — slice 1/2's, flag to them; `about:50`, `sra-compliance:117` — mine), and land the house-positions entry **before** the copy edits so the figures trace. If the owner declines the entry, DS §0.3 binds and all four come out.

---

## 8. Brand layer — the seven swap points, measured

**Method.** ratio = (L1+0.05)/(L2+0.05) on WCAG relative luminance, sRGB. `scripts/validate_palette.js` does not exist (A.8); values hand-computed. **Instrument self-test passed both reference pairs before any figure below was trusted: slate-500 `#64748b` on white = 4.7588 (doc: 4.76 ✓), slate-400 `#94a3b8` on white = 2.5640 (doc: 2.56 ✓).** Every figure the manager supplied was independently re-derived and **all matched**; none was wrong.

### 8.1 The seven swap points (rollout §4.3)

**1. Primary ramp + semantic vars.** Family = **rose** (nearest Tailwind ramp to `#c41e3a`; rose-600 `#e11d48` and rose-700 `#be123c` bracket it, at 32.2 and 13.6 RGB units). Owner decision 1 keeps `#c41e3a` itself as `--brand-primary`, so this is the L.2 snap rule applied to the *steps*, not to the brand hex. Declare `--color-primary-50..950` = rose oklch; keep `--brand-primary: #c41e3a`, `--brand-primary-strong: #a01829`, `--brand-on-primary: #ffffff` (already correct at `globals.css:56-58`, only the ramp is missing). Keep `--accent`/`--accent-strong` on slate blue: this is a genuine two-hue brand (L.2), and slate-700 links measure 10.35:1.

**2. Font.** Plus Jakarta Sans only. `layout.tsx:2, 22-26` drops the `Cormorant_Garamond` import and loader; `layout.tsx:82` drops `${cormorant.variable}`; `globals.css:65` drops `--font-serif: var(--font-cormorant)`. **194 `font-serif` uses retire**, 80 of them in this slice. Weights stay `400,500,600,700` (A.3 wants 800 too; add it if any 800 usage lands). Body `line-height: 1.5` (`globals.css:87`) → **1.6**. Headings: `@layer base { h1..h6 { font-weight: 700; letter-spacing: -0.02em } }` plus, **unlayered on purpose** (A.3 / trap 7.1), `h1..h6 { line-height: 1.2 }`.

**3. Button constants.** Box per A.5 (`min-h-12`, `min-w-[10rem]`, `px-8 py-3.5`, `text-base font-bold`, `rounded-xl`). Colour tokens only. The kit's `btnPrimary` reads `bg-[var(--btn-ground,var(--color-primary-600))]`, so declare in `:root`:
```
--btn-ground:        #c41e3a;   /* white label 5.84:1 PASS  */
--btn-ground-hover:  #a01829;   /* white label 7.90:1 PASS  */
--btn-ground-active: #881337;   /* rose-900, 9.57:1 PASS    */
```
`focusRing` → `outline-primary-600` (rose-600 on white = 4.70, well past the 3:1 graphics floor; the current slate-blue outline at 10.35 also passes and could be kept as a recorded deviation — recommend the brand ring for estate parity). Real `btnOnDark` lands (the current `.btnOnDark` at `globals.css:177-198` puts `color: var(--primary)` on `background: var(--accent)` = **crimson on slate-blue, 1.85:1, effectively invisible**; it has 0 consumers in its CSS form, but the TS `btnOnDark` at `layout-utils.ts:28` is fine and stays).

**4. `niche.config.json` values.** `brand.primary_color` stays `#c41e3a` and must equal `--brand-primary` (the `niche-config` guard pins the pair). `seo.theme_color` `#c41e3a` unchanged. `content_strategy.source_identifier` = `site_key` = `solicitors` — **verified, do not touch** (the PF-07 rule).

**5. Wordmark.** Propose lucide **`Scale`** (the balance: the one mark every branch of legal practice shares, reads at 16px, and is not a building or a document). Fallback **`Gavel`**. Rejected: `Landmark`/`Building2` (says "court", and this site serves sole practitioners working from an office); `BookOpen` (says publisher); `Calculator` (every accountancy brand uses it, and this site's calculators mean something specific). line1 `ACCOUNTS FOR LAWYERS`; line2 = owner's pick, recommendation `SPECIALIST ACCOUNTANTS`. Icon `text-[var(--brand-primary)]` on light (graphic, 5.84 clears 3:1), `text-rose-400` on the navy footer (6.63; **the brand hex itself is 2.50:1 on the current `#1e293b` footer and 3.06:1 on slate-900 — a crimson wordmark on a dark ground is a live failure and must not be ported forward**). Wordmark `aria-label` built from the visible strings (WCAG 2.5.3).

**6. Hero/footer backdrop motif.** **Ruled COLUMN LEDGER**: evenly spaced vertical rules at ~34px pitch with two heavier rules marking a debit/credit fold, crossed by sparse horizontal rules that stop short of the edges, and 3-4 short tick entries at 1.5x stroke. It reads as a ruled account book, which is the single object shared by SRA client-account reconciliation, partnership ledgers and the firm's own books; it degrades gracefully under the 35%→92% mask (a pictorial mark would half-truncate); ~26 SVG lines, `aria-hidden`. Geometry per E: `absolute inset-y-0 right-0 w-[55%] hidden sm:block`, host `relative overflow-hidden`, content `relative z-10`. Navy tone `stroke-rose-400` at `.18`, mask `to left, black 35% → transparent 92%`; cream tone `stroke-[var(--brand-primary)]` at `.10`, mask 45%/97%. Rejected: scales/gavel (the wordmark already carries it, and a gavel is American iconography for an English-law brand), columns/pediment (says "courthouse", excludes in-house and locum), abstract blobs (says nothing). File: `src/components/layout/SolicitorsBackdrop.tsx`, one component, 12+ consumers across this slice alone.

**7. Re-derived accent semantics.** Money/outcome semantics: **brand rose = relief / satisfied / money kept**; **slate = neutral or N/A**; **duty, penalty and no-relief move entirely off red** (owner decision 1). The measured reason: `red-600 #dc2626` is **32.2 RGB units** from `#c41e3a` and `red-800 #991b1b` is 53.1 — at chip size, indistinguishable from the brand. The one red that stays is the **form-error** red (`Wizard.tsx:356`, `SpecialistWidget.tsx:460`), which is paired with `role="alert"` and never rests on colour alone. `SpecialistWidget.tsx:514-516`'s `bg-red-500`/`bg-red-600` notification badge is decoration in the collision zone and moves to `--brand-primary`.

### 8.2 The warning / duty / penalty ladder

**RECOMMENDED — W1** (as briefed, re-derived and confirmed): **amber-700 `#b45309` → orange-700 `#c2410c` → fuchsia-700 `#a21caf` → violet-700 `#6d28d9`**, on-dark variants **amber-400 → orange-400 → fuchsia-400 → violet-400**.

| step | meaning | white | cream `#fbfaf7` | slate-50 | on slate-900 (400 step) | RGB distance from `#c41e3a` |
|---|---|---|---|---|---|---|
| 1 amber-700 | a duty bites | **5.02** | 4.81 | 4.80 | amber-400 **10.69** | 73.9 |
| 2 orange-700 | escalation / deadline passed | **5.18** | 4.96 | 4.95 | orange-400 **7.89** | 57.8 |
| 3 fuchsia-700 | no relief | **6.32** | 6.06 | 6.04 | fuchsia-400 **7.25** | 121.9 |
| 4 violet-700 | criminal / regulatory track | **7.10** | 6.81 | 6.79 | violet-400 **6.56** | 143.6 |

Every step clears 4.5:1 on all three light grounds and on the dark ground. Steps 1 and 2 are Property's own first two steps, so half the estate vocabulary is preserved. **The weak link is step 2**: orange-700 is the closest step to the brand at 57.8 units, and it must never sit adjacent to a brand chip without its own label. DS §0.3's direct-labelling rule answers "purple is not a warning colour": nothing rests on hue.

**Alternatives, with reasons for rejection:**

- **W2 — amber-700 → orange-700 → fuchsia-700 → violet-900 `#4c1d95`** (10.95 white / 10.49 cream / on-dark violet-300 9.67). A darker terminal step reads as heavier. **Rejected:** violet-900 against violet-700 is a value shift, not a hue shift, so at chip size steps 3 and 4 collapse into "two purples"; W1's fuchsia→violet is the clearer pair.
- **W3 — sky-700 `#0369a1` (5.93) → indigo-700 `#4338ca` (7.90) → fuchsia-700 → violet-700.** Maximum distance from the brand. **Rejected:** sky-700 is link-blue and collides with the link affordance on every page that carries both, and a cool-only ladder has no "warm caution" entry point, which is the one hue convention readers actually bring with them.
- **W4 — keep Property's ramp verbatim (amber-700 / orange-700 / red-600 / red-800).** Cheapest, zero re-derivation. **REJECTED and shown to the owner only as the counter-example:** `red-600 #dc2626` is 32.2 RGB units from the brand and `red-800 #991b1b` is 53.1 — the top two steps of the severity ladder would be visually indistinguishable from the brand chip, which is exactly the L.2 degenerate case ("primary colliding with a semantic ramp") and exactly what owner decision 1 rules out. A.8's lock is on the **contract** (escalating, distinguishable, every step ≥4.5:1, first step fully saturated), not on Property's specific hues; W1 honours the contract.

**Sweep cost, priced before commit:** `grep -rno "amber-[0-9]00\|orange-[0-9]00\|red-[0-9]00\|rose-[0-9]00" src` = **50 usages**. That is a small sweep (construction-cis's equivalent was 128 across 46 files). Of the 50, **12 are `rose-*` and all but one live under `/admin`** (a noindex internal console using rose for "weak/poor" metrics) — after the ramp swap, admin's rose reads as brand. Admin is not a brand surface; **record as an accepted deviation** rather than sweeping it. The remaining `red`/`amber` usages concentrate in `health-check/Wizard.tsx` (:610-611, :625-626), `sra-compliance:154`, and the two form-error sites.

### 8.3 Measured contrast table (paste into `DESIGN_DELTA.md` §2; ⚠ = fails today)

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| brand `#c41e3a` | button ground, white label | — | **5.84** | PASS — no 700-step shift needed |
| brand `#c41e3a` | body/link text | white | **5.84** | PASS |
| brand `#c41e3a` | h2 / stat text | cream `#fbfaf7` / slate-50 | **5.60 / 5.58** | PASS |
| brand `#c41e3a` | eyebrow / accent text | slate-900 `#0f172a` | **3.06** | ⚠ FAIL — live on 3 research heroes |
| brand `#c41e3a` | wordmark / text | footer `#1e293b` | **2.50** | ⚠ FAIL — never on the footer |
| crimson-dark `#a01829` | button hover, white label | — | **7.90** | PASS |
| crimson-soft `#d63851` | current `btnPrimary:hover`, white label | — | **4.62** | PASS, but only just; `#a01829` is the better hover |
| crimson-muted `#e05268` | text | white | 3.77 | ⚠ FAIL for text; graphics only |
| crimson-light `#eb6c7f` | text | white | 3.01 | ⚠ FAIL |
| rose-300 `#fda4af` | accent / eyebrow on dark | slate-900 | **9.44** | PASS — the on-navy accent |
| rose-400 `#fb7185` | accent / motif stroke on dark | slate-900 / `#1e293b` | **6.63 / 5.44** | PASS |
| rose-600 `#e11d48` | focus ring (graphic, 3:1) | white | 4.70 | PASS |
| rose-700 `#be123c` | text | white / cream | 6.29 / 6.02 | PASS (available, not adopted for the button) |
| rose-900 `#881337` | button active, white label | — | **9.57** | PASS |
| slate-blue-strong `#334155` (`--accent-strong`) | every legal + contact link | white | **10.35** | PASS — keep the second hue |
| slate-500 `#64748b` | fine print 11px | white / cream / slate-50 | 4.76 / 4.56 / 4.55 | PASS |
| slate-400 `#94a3b8` | text | white | 2.56 | ⚠ FAIL — never for text; graphic fills only |
| slate-600 `#475569` | body | white | 7.58 | PASS |
| slate-300 `#cbd5e1` | body text on dark | slate-900 | 12.02 | PASS |
| neutral-400 `#a3a3a3` | "Updated" + table parentheticals | white | **2.52** | ⚠ FAIL — LIVE at `research/page.tsx:90` and `uk-legal-incorporation-index:323,327,331,335` |
| neutral-500 `#737373` | fine print | white | 4.74 | PASS (retired with the neutral ramp) |
| white | on brand button | `#c41e3a` | 5.84 | PASS |
| white | on slate-900 / `#1e293b` | — | 17.85 / 14.63 | PASS |
| W1 step 1 amber-700 | duty | white / cream / slate-50 | 5.02 / 4.81 / 4.80 | PASS |
| W1 step 2 orange-700 | escalation | white / cream / slate-50 | 5.18 / 4.96 / 4.95 | PASS |
| W1 step 3 fuchsia-700 | no relief | white / cream / slate-50 | 6.32 / 6.06 / 6.04 | PASS |
| W1 step 4 violet-700 | criminal track | white / cream / slate-50 | 7.10 / 6.81 / 6.79 | PASS |
| W1 on-dark 400s | amber / orange / fuchsia / violet | slate-900 | 10.69 / 7.89 / 7.25 / 6.56 | PASS |
| `.btnOnDark` CSS twin | `color:var(--primary)` on `background:var(--accent)` | — | **1.85** | ⚠ FAIL — dead class, delete (`globals.css:177-198`) |
| kit `DrawnTickList` default tick | emerald-400 | white | ~1.9 | ⚠ pass `tickClassName` at the 600 level |

### 8.4 `docs/solicitors/DESIGN_DELTA.md` — content for the appendix L.1 template

```markdown
# SOLICITORS DESIGN DELTA
Standard: docs/_engines/PROPERTY_STANDARD_ROLLOUT.md appendix + docs/property/DESIGN_SYSTEM.md §0.
An empty section means: Property standard, no exception.
Status 2026-09-10: PROPOSED. Owner decisions 1-5 taken; every (pending) row below awaits the swatch turn.

## 1. Brand tokens (the seven swap points)
primary ramp:        rose — Tailwind 4 oklch, verbatim from node_modules/tailwindcss/theme.css
                     (50 #fff1f2, 100 #ffe4e6, 200 #fecdd3, 300 #fda4af, 400 #fb7185, 500 #f43f5e,
                      600 #e11d48, 700 #be123c, 800 #9f1239, 900 #881337, 950 #4c0519)
                     BRAND HEX IS NOT A RAMP STEP: --brand-primary stays #c41e3a (owner decision 1,
                     2026-09-10). Rose supplies the steps the single hex cannot; #c41e3a sits
                     between rose-600 (32.2 RGB units) and rose-700 (13.6).
neutral ramp:        slate (unchanged). The research routes' neutral-* island moves TO slate,
                     not the reverse: 4 files, and it removes the one visibly wrong mix
                     (neutral-900 #171717 abutting kit slate-900 #0f172a).
dark ground:         slate-900 #0f172a. Retires bg-neutral-900 (research) and the full-bleed
                     bg-[var(--primary)] heroes on the four pillar statics + /resources/[topic].
                     Footer #1e293b is slice 1's call; note brand-on-#1e293b = 2.50 FAIL.
warning ramp:        OFF red (owner decision 1). W1 = amber-700 -> orange-700 -> fuchsia-700 ->
                     violet-700; on-dark amber-400 / orange-400 / fuchsia-400 / violet-400.
                     Full measurements in _port/DISPOSITION_SLICE3.md §8.2. Sweep = 50 usages.
semantic overrides:  --accent / --accent-strong STAY slate blue (#475569 / #334155). This is a
                     genuine two-hue brand per L.2: crimson = action, slate blue = accent/links
                     (10.35:1). Do not re-point --accent-strong at the brand.
                     ADD: --btn-ground #c41e3a / --btn-ground-hover #a01829 /
                     --btn-ground-active #881337 (the kit btnPrimary reads these).
font:                Plus Jakarta Sans ONLY (owner decision 2). Cormorant Garamond DROPPED:
                     layout.tsx:2,22-26,82 and globals.css:65 removed; 194 font-serif uses retire
                     (80 in slice 3). Weights 400,500,600,700 (+800 if an 800 usage lands).
                     Body line-height 1.5 -> 1.6. h1..h6 weight 700 + letter-spacing -0.02em INSIDE
                     @layer base; line-height 1.2 UNLAYERED (A.3 / trap 7.1).
button constants:    box per A.5, colour tokens only. Ground = the live brand, NOT the 700 step:
                     white on #c41e3a = 5.84:1, so L.2's shift-to-700 remedy does not apply here
                     (it applied to generalist because orange-600 was 3.56:1). focusRing =
                     outline-primary-600 (4.70, graphics floor 3:1). Real btnOnDark lands; the CSS
                     .btnOnDark twin (globals.css:177) renders 1.85:1 and is deleted with its
                     zero-consumer siblings.
wordmark:            icon = Scale (fallback Gavel); line1 = "ACCOUNTS FOR LAWYERS";
                     line2 = "SPECIALIST ACCOUNTANTS" (recommendation; owner picks). Icon
                     text-[var(--brand-primary)] on light, text-rose-400 on dark — the brand hex is
                     3.06 on slate-900 and 2.50 on #1e293b and must never carry the dark wordmark.
backdrop motif:      ruled COLUMN LEDGER (proposed): vertical rules ~34px pitch, two heavier
                     debit/credit fold rules, sparse horizontal rules stopping short of the edges,
                     3-4 tick entries at 1.5x stroke. Navy tone stroke-rose-400 @ .18 (mask 35%/92%);
                     cream tone stroke-[var(--brand-primary)] @ .10 (mask 45%/97%). E geometry.
                     File: src/components/layout/SolicitorsBackdrop.tsx.
cream surface:       #fbfaf7 (Property's value; the site has no incumbent cream to preserve).
radius:              --radius: 0rem; --radius-xl: calc(var(--radius) + 4px) = 4px;
                     --btn-radius: var(--radius-xl). None of the three exists today, which is why
                     every button on the site renders as a 9999px pill.
glow channel tokens: --brand-glow 225 29 72 (rose-500 #e11d48-adjacent);
                     --brand-glow-deep 196 30 58 (the brand #c41e3a);
                     --brand-glow-edge 251 113 133 (rose-400);
                     --brand-glow-faint 255 228 230 (rose-100).
                     A crimson glow reads hotter than emerald at equal alpha; if it reads hot at
                     390/768/1440, drop card-glow alphas 0.28/0.4 -> 0.22/0.32 as a recorded deviation.
plumbing:            globals.css gains, in this exact order, @import "tw-animate-css"; then
                     @import "@accounting-network/web-shared/design/globals-standard.css"; then :root.
                     package.json MUST gain "tw-animate-css": "^1.4.0" in the SAME commit — it is
                     currently resolving from the hoisted root node_modules by accident.
                     Strip the UTF-8 BOM and the mojibake comments at globals.css:1,6,8.

## 2. Measured contrast table
(the table in _port/DISPOSITION_SLICE3.md §8.3, verbatim)
Method: ratio = (L1+0.05)/(L2+0.05), WCAG relative luminance, sRGB. scripts/validate_palette.js
does not exist (A.8); values hand-computed and self-tested against slate-500/white = 4.7588 and
slate-400/white = 2.5640 before use.

## 3. Sanctioned deviations
| deviation | owner decision + date |
| btnPrimary ground stays the live brand #c41e3a rather than shifting to the 700 step | (pending) |
| two-hue brand: crimson action + slate-blue accent/links retained | (pending) |
| duty/penalty ramp = amber-700 / orange-700 / fuchsia-700 / violet-700 (on-dark 400 steps) | (pending) |
| /admin console keeps rose-* as its "weak metric" signal after the ramp swap (noindex, not a brand surface) | (pending) |
| form-error red retained (paired with role="alert" and an icon, never colour alone) | (pending) |
| StickyCTA keeps min(500px, 25%) vs Property's 30% — timing is FROZEN | (pending) |
| deep_scroll_close kept over the canonical deep_scroll_modal_close (analytics continuity) | (pending) |
| ExampleFigureNote gains a source `label` on official-statistics research pages | (pending, estate-level) |
| research routes have zero capture surfaces and gain none | (pending) |

## 4. Owner-input state (appendix K rows)
| Input | Class | State 2026-09-10 |
| Brand colour ramp sign-off | BLOCKER | PROPOSED (rose steps, brand hex retained) |
| Wordmark icon | BLOCKER | PROPOSED: Scale (fallback Gavel) |
| Wordmark line2 descriptor | BLOCKER | PROPOSED: "SPECIALIST ACCOUNTANTS" |
| Favicon set | COSMETIC | keep src/app/icon.svg; never generate |
| Hero imagery | COSMETIC | none needed; ledger motif only |
| Phone number | BLOCKER for schema/copy | niche.contact.phone "+44 20 7946 0157"; NOT displayed publicly today (site.ts:32-33) and no public telephone in schema. Keep that posture. |
| GA4 id | INFO | G-N6ZPRB3DSQ, LIVE and consent-gated. Unchanged. |
| Font change | BLOCKER | TAKEN 2026-09-10: Cormorant dropped, Plus Jakarta only |
| Capture-surface scope | BLOCKER | PROPOSED: no new surfaces in slice 3. Restyle only; /resources index ships a LeadCTAPanel (in-flow, not interruptive) |
| Deploy approval | BLOCKER | owner-triggered, every time |

## 5. L.3 ramp registry
| Site | Primary ramp | Approved |
| Property | emerald | live |
| generalist | orange | APPROVED 2026-09-09 |
| Solicitors | rose | PROPOSED 2026-09-10 |
Collision check: emerald / orange / rose are three distinct families — NO two ported sites share a
ramp. Unported note carried forward: construction-cis's live brand is also #f97316 (orange), the
same as generalist; that collision predates the programme and is recorded, not precedent.
Warning-ramp differentiation: Property = amber/orange/red; generalist = violet/fuchsia/red;
Solicitors = amber/orange/fuchsia/violet. Solicitors and generalist share fuchsia-700 and
violet-700 as steps but in DIFFERENT positions and with different terminal steps; check
generalist's delta before locking, and note neither site may use red at the top of its ladder.
```

---

## 9. Instrumentation and guard tests

### 9.1 `data-cta` census — 22 distinct ids. Propose ZERO renames.

They are live `vw_cta_performance` series and the view groups without `page_path`. D.3's binding rules are continuity and never-reuse-across-routes, not conformity of spelling. Any rename needs a deploy-watch baseline restatement in the same commit.

| id | file:line | convention | canonical equivalent | disposition |
|---|---|---|---|---|
| `header-book-call` | SiteHeader | hyphen | `header_book` | KEEP, map |
| `mobile-menu-book-call` | SiteHeader | hyphen | `header_book_mobile` | KEEP, map |
| `header_nav_secondary` | SiteHeader | underscore | `header_contact` | KEEP, map |
| `header_mobile_secondary` | SiteHeader | underscore | — | KEEP |
| `hero_primary` / `hero_secondary` | page.tsx | underscore | `hero_book` / `hero_calculators` | KEEP, map |
| `home_cta_primary` / `home_cta_secondary` | page.tsx | underscore | same | KEEP |
| `cta-section-primary` / `cta-section-secondary` | `ui/CTASection.tsx` | hyphen | — | **DYING** — CTASection is replaced by `LeadCTAPanel` on `/about` (R5) and `/sra-compliance` (R17). Check for other consumers before deleting the component; pair the two id deletions with a baseline restatement in the same commit. |
| `contact_pricing_link` | `contact:58` | underscore | — | **DYING with the dead `packagesMode` branch (R1). It emits zero rows today** (`cta.variant = "leadgen"`), so the restatement is a formality, but state it. |
| `thankyou-return-article` | `thank-you:199` | hyphen | matches Property exactly | **KEEP BYTE-EXACT** with `data-cta-placement="thank_you"` |
| `sticky_cta` | `StickyCTA.tsx:167` | underscore | canonical | KEEP |
| `returning_bar` / `returning_bar_close` | `ReturningBar.tsx:50,60` | underscore | canonical | KEEP |
| `deep_scroll_modal` / `deep_scroll_close` | `DeepScrollModal.tsx:110,96` | underscore | `deep_scroll_modal_close` | KEEP `deep_scroll_close` (continuity beats conformity); record the mapping |
| `specialist_widget` | SpecialistWidget | underscore | — | KEEP |
| `next_step` | `NextStepOffer.tsx` | underscore | — | KEEP (slice 2 owns the mount) |
| `see_result` x2, `calculator-page-cta` x2, `equity-partner-buyin-page-cta` | calculators | mixed | — | slice 2's |

**ADDITIONS this slice owns** (all route-unique, none reusing an existing id):
`sticky_cta_close` (**the dismiss button at `StickyCTA.tsx:182` carries no id at all, so the dismiss rate of the most-shown surface on the site is unmeasurable today**), `about_hero_book`, `about_cta_book`, `contact_hero_book`, `resources_index_book`, `resource_guide_book` (+ `data-cta-placement="resource_<topic>"`), `research_incorporation_cta`, `research_survival_cta`, `research_structure_cta` (slug-suffixed so three routes do not merge into one row), `healthcheck_cta_book`, `sra_cta_book`, `taxrates_cta_book`, `specialist_cta_book`, `coa_download_xlsx`, `coa_download_pdf`, `thankyou_blog_all`. Every one carries `data-cta`, `data-cta-placement` and `data-cta-goal`.

**Baseline:** `link_baseline.json.totalCtas` = **774** across 274 routes, captured at SHA `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`. Slice-3 per-route CTA counts are quoted in each row (2 on almost every route = the header pair; 4 on `/about` and `/sra-compliance` = the header pair plus `CTASection`'s two).

### 9.2 Guards to build

The site has **no UI or design guard test**. Each guard below must call the **SHIPPED** function, never a local copy of the rule (T9), and each must be **proven to bite** by reintroducing the regression and watching it fail. Record the failing output in the phase log.

**CONSUME from `packages/web-shared/design/guards/` (site-parameterised, one `.test.ts` each in `src/tests/`):**

- `nav-active-state` → `registerNavActiveStateGuard({ items: siteConfig.nav, ... })`. `siteConfig.nav` comes from `getActiveNav(niche)`, so the guard also pins the packages/leadgen nav fork.
- `hub-article-crawl-path` → `registerHubArticleCrawlPathGuard`. **Slice 2 owns the hub component**; wire the guard once that lands, not before.
- `calculator-tabs-crawl-path` → `registerCalculatorTabsCrawlPathGuard`. **Slice 2's**, same sequencing.
- `first-sentence` → **DOES NOT APPLY AS BRIEFED, and the generalist doc's framing of it is wrong for this site.** The guard's contract is `firstSentence(contentHtml, fallback?)` + `getPosts()` (see its header, :30-38); it does **not** need `lib/page-summaries.ts`. Solicitors has **no `firstSentence` function** — `src/lib/blog.ts` exports `getAllPosts`, `getPostBySlug`, `getPostByCategoryAndSlug`, `getRelatedPosts`, `slugifyCategory`, `getCategorySlug`, `getAllCategories`, `calculateReadTime` and nothing else; excerpts come from frontmatter `summary` (`blog.ts:30`). **Disposition:** skip `first-sentence` unless slice 2's `RelatedArticles` port introduces a `firstSentence`; in its place author a **`summary-quality.test.ts`** asserting the same failure mode over the same corpus (every published post has a `summary` of at least 30 characters, containing no markdown, no table cell and no pipeline artefact). Do not invent a `page-summaries.ts` this site has no consumer for.

**PORT from Property:**

- `consent-anchor-drift.test.ts` — four surfaces in this slice sit beside capture fields (`/contact`, `/complete`, `/resources/[topic]`, and the health-check wizard's submit step). It asserts the rendered consent notice still anchors to `siteConfig.leadConsentText`.
- `niche-config.test.ts` — pins `content_strategy.source_identifier === content_strategy.site_key` (both `solicitors`, verified) **and** `brand.primary_color` ↔ `--brand-primary` (`#c41e3a` ↔ `#c41e3a`). The brand work touches one half of that pair, which is exactly why the guard belongs in this slice.

**DO NOT TOUCH:**

- `src/tests/lead-payload.test.ts` — one of the estate's 7 consent-wording pins, the **TRIPWIRE** (T19). Run it on every commit in this slice. A port that trips it has touched something it must not.
- `src/tests/intent-engine.test.ts` — pins the interruptive thresholds. **A restyle that trips this means a trigger, timing, cadence or audience was changed, which is a standing owner gate.** Green throughout §10 step 9 is the proof that the restyle stayed a restyle.

**AUTHOR NEW:**

- **Em-dash gate** (one line, runs over rendered HTML or over `src` + content): zero U+2014 in user-facing copy. Baseline 330 site-wide; the gate ships asserting `<= baseline` per route from `link_baseline.json.dashes`, and slice 3's 17 come out (`/uk-solicitor-tax-rates` 10, `/specialist-vs-generalist-accountant` 3, `/sra-compliance` 2, `/about` 1, `/free-firm-health-check` 1).
- **Link-floor script** — no such test exists anywhere in the estate. ~20 lines, parses built HTML, counts unique internal `href`s per route, compares against `docs/solicitors/_port/link_baseline.json`. Scratchpad only, deleted after; the baseline file is the durable artefact. **Any decrease is a blocker.**
- **Blog-category-copy coverage assert** — the category-specific CTA copy map must be keyed on the **slugified** category (F.3: raw-frontmatter keying caused Property's 57-posts-wrong-CTA and 228-pages-wrong-related bugs). Solicitors has 7 categories in `niche.config.json` and a `src/lib/blog/capture-map.ts`; assert every category in `getAllCategories()` resolves to a copy entry and that the key is the output of `slugifyCategory` (`blog.ts:106`). Slice 2 owns the renderer; the assert is cheap and belongs here.
- **`role="img"` / `aria-hidden` chart guard** — after R10, assert `LegalIncorporationCharts.tsx` contains no `role="img"` and no `aria-hidden` on a chart wrapper, and that every rendered value appears as a text node. This one bites on a real, currently-live defect, so it is the easiest to prove.

**Verification instruments:** use `docs/_engines/instruments/sweep.mjs` and `browser_check.mjs` as they stand (N: one committed implementation, fixed in place, never rebuilt per port). Always pass `--out` per run. `browser_check.mjs` self-tests the two reference contrast pairs on every launch and exits 2 without reporting if it fails — the same self-test this document passed by hand in §8.

---

## 10. Retirement and delete list (importer counts grep-verified 2026-09-10)

**DELETE (0 importers):** `src/components/blog/ExitIntentModal.tsx` — the three other hits are comments (`PageShell.tsx:5`, `SpecialistWidget.tsx:18`, `:136`); delete the file and tidy the comments in the same commit. The `globals.css` zero-consumer CSS classes: `.siteContainerLg` (:105), `.contentNarrow` (:99), `.sectionY`/`.sectionYLoose` (:111-126), `.btnPrimary` (:128), `.btnSecondary` (:155), `.btnOnDark` (:177), `.focusRing` (:222), `.hero-glass` (:248). **NOT `.btnMailOutline` (:200) — it has 2 consumers.**

**REPLACE:** `.card-premium` (11 consumers, 6 in this slice) and `.card-flat` (5 consumers, 0 in this slice) with `rounded-xl` + `ring-1 ring-slate-200/70`. Delete the class definitions only once the last consumer is gone, which means slice 1/2 must land first — sequence it.

**RETIRE across the slice:** 80 `font-serif` uses; ~40 `rounded-2xl` card recipes; every `mx-auto max-w-2xl` / `max-w-3xl` body clamp outside the three legal pages; the `CheckIcon` tick badge; 6 hand-rolled notice cards; 8 hand-rolled pill buttons; the duplicated closing ask on `/about`; the `border-t first:border-t-0` auto-ground device on the three research pages; the page-level duplicate `Organization` JSON-LD on `/contact`; `&rarr;` entities; the dead `siteConfig` imports at `thank-you:4` and `book:4`.

**GATE, do not act without the owner:** deleting `ui/CTASection.tsx` (check every consumer first, and restate its two `data-cta` baselines in the same commit); the `/resources` build-vs-redirect choice; the privacy-policy email-sign-up bullets; the terms §2 referral disclosure.

---

## 11. Owner gates registered by this slice

1. `/resources` — build the missing index (recommended) or redirect it. It is a live 404 that 8 indexable pages link to.
2. The 26.2% statistic — adopt the proposed `house_positions.md` entry with its denominator and period, or remove the figure from all four pages.
3. Privacy policy §2/§3/§4/§6/§7 — the email-sign-up / consent lawful basis describes a surface this site does not have. Delete, or confirm a newsletter is coming.
4. Cookie policy — `_gid` is a Universal Analytics cookie and is false on a GA4 property; `_ga_N6ZPRB3DSQ` is missing; "14 months retention" cannot be verified from code; "takes effect immediately" overstates what happens to GA on the current page.
5. Terms §2 — add one sentence disclosing the partner-network referral and the fee, mirroring privacy §5, or record that the privacy policy is its sole home.
6. `/specialist-vs-generalist-accountant:57` — our own published pricing (£180-£1,800/month) plus a comparative fee claim, live in copy and in `FAQPage` schema. Owner decision 3 removes it; confirm the replacement wording.
7. Warning ladder W1 and the brand-ground decision (keep `#c41e3a` rather than shifting to rose-700).
8. Wordmark icon `Scale` and line2 `SPECIALIST ACCOUNTANTS`.
9. `WhatToExpectCard` copy on `/thank-you`, `/book` and `/complete` — every claim checked against privacy §5's six-firm disclosure before ship.
10. `ExampleFigureNote`'s literal "Example figures displayed" over Companies House / SRA / ONS official statistics (estate-level; generalist raised the same gate).
11. Adding any capture surface to the three zero-capture research routes.
12. Confirmation that the enquiry-grading job (Anthropic via Vercel AI Gateway) and the Companies House enrichment are live — both are disclosed in privacy §5 and both are consumed by `handoff.ts`, but neither producer is in this repo.

---

## 12. Slice 3 execution order (guards green at every step)

1. **Plumbing.** `package.json` gains `tw-animate-css@^1.4.0`; `globals.css` BOM stripped, mojibake comments fixed, the two `@import`s added in order, rose ramp + radius + `--btn-ground` + glow channels declared, dead CSS classes deleted. `site.ts:8` niche guard ported. Nothing renders differently yet except radii and button shape.
2. **`layout-utils.ts`** — buttons, focus ring, rhythm. Makes every later restyle a one-liner.
3. **Font.** Cormorant dropped from `layout.tsx` and `globals.css`; 80 `font-serif` uses swept in this slice's files (the other 114 are slice 1/2's, coordinate).
4. **`SolicitorsBackdrop.tsx`** — one component, 12+ consumers downstream.
5. **Guard wiring + link-floor baseline check.** Author the em-dash gate, the link-floor script, `niche-config`, `consent-anchor-drift`, `summary-quality`. Prove each bites. `lead-payload` and `intent-engine` green.
6. **Post-submit set** (R2, R3, R4) — the smallest surfaces, and they prove kit consumption. `lead-payload` green throughout.
7. **`/contact`** (R1) — depends on slice 1's `MarketingSections`.
8. **`/about`** (R5).
9. **Research** (R6-R9) with the shared charts file (R10) **first**, since one file feeds two pages.
10. **Resources** (R11 index, then R12 template) and the health check (R13).
11. **Legal x3** (R14-R16) — compliance trace before restyle, not after.
12. **Pillar statics** (R17-R20).
13. **Interruptive restyle** (R21-R25 below) — `intent-engine.test.ts` green is the proof the restyle stayed a restyle.
14. **Retirements LAST**, so the tree stays bisectable and the `data-cta` baselines are restated in the same commits as their deletions.

### R21-R25 — the interruptive stack (RESTYLE ONLY; timing, trigger, cadence and audience are FROZEN)

| # | Surface | Mount | Disposition |
|---|---|---|---|
| R21 | `StickyCTA` | `PageShell.tsx:26` (site-wide) | Threshold `min(500px, 25%)` at `:77-80` **FROZEN** — it differs from Property's 30%; record as a deviation, do not "fix" it. Restyle `bg-white/95 border-t` (:151) → `bg-slate-900 border-t-4 border-[var(--brand-primary)]`, headline `text-white`, blurb `text-slate-300`, button `btnPrimary` (already at :172), inner `max-w-7xl` (:153) → `siteContainerLg`. **ADD `data-cta="sticky_cta_close"` to the dismiss button at :182** — it has no id today. Mount stays site-wide unless the owner moves it. |
| R22 | `ReturningBar` | `layout.tsx:110` | Triggers FROZEN. **Brand-collision restyle:** `bg-[var(--primary)]` full-bleed crimson bar (`:41`) → `bg-slate-900 border-t-4 border-[var(--brand-primary)]`, the same bar language as R21 — never two different bar languages on one site. Inner `max-w-5xl` (:42) → `siteContainerLg`. Action button (:53) → `btnPrimary`; close (:70) `text-white/80` → `text-slate-300`. Ids `returning_bar` / `returning_bar_close` already canonical. |
| R23 | `DeepScrollModal` | `layout.tsx:111` | 70% + once-per-page-load + 30-day per-topic suppress **FROZEN**. Sheet keeps `rounded-2xl` (:88) — the sanctioned overlay exception. Primary action `rounded-lg bg-[var(--primary)] px-4 py-2.5` (:116) → `btnPrimary`; secondary (:126) → `btnSecondary`. **Both are 42px tall today, under the 44px touch floor** — `btnPrimary`'s `min-h-12` fixes it. `data-cta="deep_scroll_close"` (:96) KEPT over the canonical spelling; record the mapping. |
| R24 | `SpecialistWidget` | `layout.tsx:114`, inside `print:hidden` | Cadence, arm times, exit-intent and form-friction triggers **FROZEN**. Restyle chips and submit to the brand; launcher stays a pill (it is a FAB, not a card, so `rounded-xl` does not apply). `bg-red-500`/`bg-red-600` notification badge (`:514-516`) → `--brand-primary` (decoration sitting in the collision zone). `text-red-600` form error (`:460`) stays red, paired with its existing alert semantics. **Its auto-open is a NON-human signal (the bot-gate incident) and must never be wired into a conversion metric.** Note: this widget's exit-intent arm is what makes privacy §2's exit-form sentence true; if it is ever removed, that sentence must go with it. |
| R25 | `ExitIntentModal` | none | **DELETE the file.** 0 importers, verified. Property deleted its equivalent 2026-07-09 after 162 shows and 0 leads with "do not rebuild". Tidy the three referring comments in the same commit. |

**No new interruptive surface is proposed anywhere in this slice.** The `/resources` index's `LeadCTAPanel` (R11) and every closing panel are **in-flow, not interruptive** (playbook §1) and are not owner gates on that ground; they are gated only as capture-scope.
