# ecommerce DESIGN UPLIFT: R6 independent re-review after the gap-fix

Reviewer: independent, built none of it. Date 2026-09-29. Read-only: no edit to
site source, no commit, no tag, no build, no server started or stopped, no
subagent. Port 3202 was never touched. Scratch deleted.

Under review: `074b39ce` ("uplift(ecommerce): gap-fix after R5"), receipt at
`UPLIFT_PACKAGES.md` section H, against `R5_UPLIFT_REVIEW.md` (4 blockers,
12 gaps, 4 nits) and the manager rulings on B2, G1, G4, `/vat` and B1.

Identity asserted before anything else:

```
curl -s http://localhost:3203/ | grep -o '<title>[^<]*</title>'
<title>Ecommerce and marketplace seller accountants UK</title>
```

Evidence base: all 51 sitemap routes fetched as served HTML;
`browser_check.mjs --grounds` (39 routes, 156 entries, 4 widths);
`sweep.mjs` (51/51); `cta_snapshot.mjs` (51 routes); four purpose-built
`puppeteer-core` probes — a real `.focus()` and a real mouse hover on a
`.related-card` measured after the 200ms transition settles, computed
`grid-template-columns` at 1280, the post sidebar's scroll containers at lg, a
real 390 emulation (`page.emulate`, `isMobile: true`, dSF 3) over 8 routes, and
a real click on the 390 drawer toggle followed by a 14-press Tab walk;
`npm test` and `npx tsc --noEmit` read-only.

---

## A) VERDICT: **PASS-WITH-GAPS**

All four R5 blockers are closed or correctly ruled. Nine of the twelve gaps are
fixed and measured; G1 and G4 are owner calls left open as ruled; G6 is
pre-existing with its false comment now corrected. The content freeze is
absolute: **zero user-facing sentences changed in this commit.** The gate holds
on all eight rows and the four-marker row is unmoved.

Finding nothing would have been a failed review, and this one did not. **Seven
items are open, one of them a live revenue defect that R5 missed and this wave
did not cause**: AdSense frames are blocked by the site's own CSP on every route
and every width measured. One item is a genuine regression introduced by the
gap-fix: the post sidebar now has two nested scroll containers where the brief
asked for one. The rest are documentation defects in the receipt and in comments
the fix itself shifted.

### The designer's verdict, two sentences

**Homepage:** the audiences band is a four-up row again (254px x 4 at 1280) and
it fixes the single thing that most made the page read cheap, so the page now
runs hero, four-stat strip, four audiences, services, problem grid, comparison,
tools, three-post blog band and a closing panel that lands on a light band
rather than the footer — the generalist rhythm, held. What still reads thin is
directly below the fix: the four specialist-service cards sit two-up in
536px-wide boxes with two lines of text each, which is the same fat-card problem
R5 named on the audiences band, on a grid nobody touched because R5 did not name
it, and nothing on the page moves.

**`/services`:** the "WHAT WE DO" band is four-up and orphans nothing, the
three-tier pricing block above it is the strongest thing on the site, and the
brand-amber hero with the white breadcrumb is right — but the navy enquiry panel
runs into the navy footer as one 850px slab with no seam, which is the last
thing the eye reads on the page and is open owner question 1.

---

## B) STILL-OPEN AND NEW GAPS, most severe first

**O1. `packages/web-shared/lib/security-headers.ts:103` (`ADSENSE_FRAME_SRC`) —
AdSense is CSP-blocked on all 51 routes. NEW FINDING, missed by R5, not caused
by this wave.**
Spec: the kit's own docstring at `:35-38` — "ad iframes are refused by the
baseline `frame-src 'none'`, so a site running AdSense must set this or **every
unit renders blank with a console CSP violation and no other symptom**."
Renders: `script-src` allows `https://pagead2.googlesyndication.com`;
`frame-src` does not. Served header:
`frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://*.safeframe.googlesyndication.com https://*.adtrafficquality.google`
— `pagead2` is absent. `browser_check` logged
`Framing 'https://pagead2.googlesyndication.com/' violates ... "frame-src ..."`
on **156 of 156** measured page-loads (39 routes x 4 widths). The port's own
artefacts (`browser_uplift.json`, `browser_final.json`) record **0 noise
entries**, because they were captured at ports 3331/3323 before the 09-28 parity
phase 0 added the CSP at all — which is why nobody has seen this.
Severity: **highest open item.** Not a design defect and not this wave's, but it
is money: ad units are blank on every page of the site.
Scope: `ads: true` is set from the shared builder, so **every estate site with
AdSense on has this**, not just ecommerce.
Minimal fix: add `https://pagead2.googlesyndication.com` to `ADSENSE_FRAME_SRC`.
Kit change, owner-gated, and out of this site's wave.

**O2. `ecommerce/web/src/app/blog/[category]/[slug]/page.tsx:205` — the G7 fix
created a nested scroll container. REGRESSION, introduced by `074b39ce`. 14 post
routes.**
Spec: the brief's own check, "the TOC clamp on posts (one scroll container at
lg)", and the comment the fix wrote at `:177-191` ("ONE scroll container, and it
is this wrapper").
Renders (measured at 1280, computed style): the `<aside>` is clean —
`overflow-y: visible`, `max-height: none` — and `BlogSidebarCta` is outside
every scroller, so **the G7 defect proper is fixed**. But the column now holds
**two** scrollers, one inside the other:
`div.lg:max-h-[calc(100vh-14rem)].lg:overflow-y-auto` → `max-height: 676px,
overflow-y: auto`, and inside it the kit's own
`ul.mt-3.space-y-1.max-h-[60vh].overflow-y-auto`
(`packages/web-shared/design/blog/TableOfContents.tsx:74`) →
`max-height: 540px, overflow-y: auto`. The inner list clamps 136px shorter, so
it always scrolls first and the outer wrapper never moves: dead weight that
re-creates the exact class the fix was closing.
Severity: **gap.** No user-visible breakage today; it is the nested-scroll shape
the startups-tech review named, now one layer down.
Minimal fix: drop the new wrapper's `lg:max-h`/`lg:overflow-y-auto` pair — the
kit component already owns its clamp — or keep the wrapper and stop claiming
"ONE scroll container" in the comment.

**O3. Four `globals.css:NNN` citations are stale, three of them shifted by this
commit's own insertions, one now pointing at an unrelated rule.**
Renders (each checked against the current file):
- `blog/[category]/[slug]/page.tsx:195` cites `globals.css:265-273` for the
  `.ground-dark` focus-ring rebind. That rebind is at **`:305-313`**; lines
  265-273 are now the `.related-card` hover/focus rules this commit unlayered.
  A reader following the citation lands on the opposite rule.
- `page.tsx:330` cites `globals.css:206-216` for the motion option C ruling.
  That block starts at **`:228`**; 206-216 is now the `--ink-navy-via`
  commentary this commit added.
- `research/online-seller-survival-index/page.tsx:149` cites
  `globals.css:226-229` for the "light-island shape". `:226` is a closing brace.
- `page.tsx:410` cites `globals.css:192` for the `--ink-navy` token. The comment
  block starts there; the declaration is at **`:195`**.
Clean: `layout-utils.ts:153` → `:56` correct; `calculators/page.tsx:96` and
`embed/[slug]/page.tsx:43` → `:96` correct.
Severity: **gap.** R5's G5 was six comments asserting what the code does not do;
fixing those six shifted four line numbers and nobody re-derived them. Same
class of defect, freshly made.
Minimal fix: re-derive the four, or cite the selector instead of the line.

**O4. `UPLIFT_PACKAGES.md` section H says "19" three times. There are 18.**
Renders: `grep -rn "<LeadForm" ecommerce/web/src` returns **18 mounts** across
17 files (`blog/[category]/[slug]/page.tsx` has two). The receipt's own list
under "data-cta census after" enumerates **18 ids**, and the new test asserts
`expect(mounts.length).toBeGreaterThanOrEqual(18)`. The prose says "all 19 panel
forms", "19 `LeadForm` mounts" and "every one of the 19 mounts". The `19` in the
earlier grep is the comment at `contact/page.tsx:48` naming `ctaId`.
Severity: **nit, but it is a false premise in the wave record**, and the record
is what the next agent reads.
Minimal fix: 18.

**O5. `/book` is a live 200 route with zero inbound links and no sitemap entry.**
This is B2's real consequence, and it is more than a count. Measured: the only
href lost on all 51 routes versus `sweep_final.json` is `/book`, 51 times, and
nothing else — the `09acd2af` cause is now proven by the delta rather than
asserted. `curl -o /dev/null -w "%{http_code}" http://localhost:3203/book` →
**200**, `ecommerce/web/src/app/book/page.tsx` exists, and `/book` is **not** in
the 51-URL sitemap. So the page is reachable only by typing the URL.
Severity: **gap**, owner question 4 sharpened.
Minimal fix: either delete the route or give it one link and a sitemap entry.

**O6. The two research studies still carry unequal instrumentation.**
G9 asked for parity. `research_survival_index_book` now exists, so the headline
complaint is answered, but the seller index emits **four** ids
(`research_seller_index_form_start`, `_csv`, `_book`, `_tool`) and the survival
index **two** (`research_survival_index_book_start`, `_csv`). The survival index
has no `_tool` and no closing-placement id.
Severity: **nit.** Half-closed, recorded.

**O7. A 20x20 control on the calculator pages is under the 24px tap floor at
390.** `<input type="checkbox" class="mt-0.5 h-5 w-5 shrink-0 accent-[var(--brand-primary)]">`
measures 20x20 in a real 390 emulation on
`/calculators/seller-take-home-calculator`. Every other sub-24px hit in that
sweep is an inline prose link or a 16px kit footer link (estate-wide,
pre-existing, N-class). Severity: **nit**, and not this wave's.

### Not open, stated so nobody re-raises them

- **G1** (navy panel meeting the navy footer) — measured, unchanged, 32 routes
  `[/blog 7, /vat 6, /services 5, /for 5, /calculators 5, /research 3,
  /about 1]`. Owner question 1. The homepage is correctly NOT among them.
- **G4** (motion option C) — no change, owner question 3.
- **G6** (duplicate `BreadcrumbList`) — still 2 on the same 13 slug routes,
  pre-existing, comments corrected as ruled.
- **N1, N2, N3, N4** — recorded, unchanged, none this wave's.
- The homepage's two-up specialist-services grid
  (`page.tsx:602`, `536px 536px` for four items) is **pre-existing**: byte
  identical at `074b39ce^` and at `a5fff093^` (pre-uplift). A design
  observation, not a gap; it feeds owner question 2.

---

## C) CLOSURE TABLE

| R5 item | status | command | decisive line |
|---|---|---|---|
| **B1** related-card indicator | **CLOSED, both halves** | real `.focus()` + real `mouse.move`, measured after the 200ms transition settles | focus: anchor `outline: solid 2px rgb(138, 94, 26)` offset 2px (#8a5e1a on white = **5.68**) AND card `border-color: rgb(201, 134, 27)` + `box-shadow: srgb(.788 .525 .106 / .22) 0 0 0 3px, ... 0 18px 40px -10px`. Hover: the identical pair. R5 measured `oklab(0 0 0 / 0) 0px 0px 0px 0px` before and after; both now paint. `.related-card` confirmed outside every `@layer` at `globals.css:263-272`. **The indicator pair on focus is the kit anchor ring at 5.68 plus the card's amber border at 3.04 (graphic floor 3.0)** |
| **B2** link floors -1/route | **PRE-EXISTING, confirmed by delta not by assertion** | per-route set difference, `sweep_r6.json` vs `sweep_final.json` | histogram `{"1/3":1,"1/0":50}`; hrefs lost, by frequency: **`51 x /book`** and nothing else. Exactly the `09acd2af` footer repoint. `/` gained 3. Against the instrument's own default baseline (`sweep_baseline.json`, 707 links, SHA `153e5017`) sweep reports **`0 LINK-FLOOR breaches (1196 links total)`**. R5's "1244" came from `sweep_final.json`, which is not the file the instrument reads. See O5 |
| **B3** D2 on 15 money routes | **CLOSED, server AND client halves measured** | `cta_snapshot.mjs`; grep over 51 served HTML; RSC payload; served client chunk | **all 18** `<id>_start` ids are in the server HTML. Every route that had one `data-cta` now has at least two; `/blog` and the six category hubs, `/calculators` and the four tool pages, `/services`, `/for`, `/vat` all carry their panel id. RSC payload carries the prop per route (`ctaId\":\"home_panel_book\"`, `\"contact_form_book\"`, `\"services_hub_book\"`, `\"research_survival_index_book\"`). Step 2 verified in the shipped bundle `/_next/static/chunks/9914-828bd42ec4b9d1aa.js`: `"data-cta":"".concat(N` and `"data-cta":N` |
| **B4** one id for three tools | **CLOSED** | `cta_snapshot.mjs` | three distinct, each with a goal: `home_calculator_seller_take_home\|tools_band\|tool`, `home_calculator_vat_threshold_tracker\|tools_band\|tool`, `home_calculator_sole_trader_vs_ltd\|tools_band\|tool`. `data-cta="home_calculator"` returns 0 |
| **E9** header ids | **CLOSED, measured for the first time** | real click on the 390 drawer toggle, then read visible `[data-cta]` | toggle is 48x48 at (350,36), `aria-label="Open menu"`, `aria-expanded` flips to `true`, and **`header_book_mobile` is then visible**. It renders; no static scan could see it. `header_contact` does not render — this site passes no `ctaSecondary`. The receipt's claim is now evidence |
| **G1** panel/footer seam | **owner call, measured** | `browser_check --grounds` | `dark band touching the footer: 32 [/blog 7, /vat 6, /services 5, /for 5, /calculators 5, /research 3, /about 1]`, `last=rgb(15, 23, 43) footer=rgb(15, 23, 43)`. Unchanged. Visible in the 1280 `/services` screenshot |
| **G2** two grey ramps | **CLOSED** | `grep -oh 'neutral-[0-9]\{2,3\}' html/*.html` over all 51 served routes; computed style on two form cards | **empty**. `grep -c "neutral-" LeadForm.tsx` = 0. Both hardest mounts measured: `/contact` and the `/research/online-seller-index` dark band both put the form on `rgb(255, 255, 255)`, neither inside `.ground-dark`, labels `rgb(15, 23, 42)` on white = **17.83** |
| **G3** CoverageCards density | **CLOSED for 3, correctly REJECTED for `/vat`** | computed `grid-template-columns` at 1280 | `/` "Who we work with." **`254px 254px 254px 254px`, n=4**; `/services` "WHAT WE DO" `254px x4`, n=4; `/for` `254px x4`, n=4. No orphan on any of the three. `/vat` `346.656px 346.672px 346.656px`, **n=5** → 3+2, orphans nothing, so `columns={3}` is right and `columns={4}` would have created the defect. Manager ruling upheld on measurement |
| **G4** motion option C | no change, owner call | — | as R5 |
| **G5** six false comments | **CLOSED, all six** | read against the DOM | `about/page.tsx` no longer lists `LeadCTAPanel` as declined; `layout-utils.ts` and `EcommerceBackdrop.tsx` diffs are **comment-only** (code-line diff after stripping comments = empty); the three "ONLY BreadcrumbList" claims are gone; `TestimonialsSection` rewritten not appended. **But see O3** — fixing them shifted four line citations that were not re-derived |
| **G6** duplicate BreadcrumbList | **PRE-EXISTING, as ruled** | ld+json parse over 51 routes | 13 routes at 2 (`for/*` 4, `services/*` 4, `vat/*` 5). 19 routes at 0 — homepage, `/blog`, the 14 posts and the 3 legal pages — correct, none renders a visible breadcrumb (`aria-label="Breadcrumb"` count 0 on all of them) |
| **G7** nested sidebar scroll | **half closed, REGRESSION** | computed style on the `<aside>` subtree at 1280 | `<aside>`: `overflow-y: visible`, `max-height: none`, `position: sticky` — clean, and `BlogSidebarCta` is in **no** scroller. But two nested scrollers remain: 676px wrapper around a 540px kit `<ul>`. See **O2** |
| **G8** `/contact` wrapper hack | **CLOSED** | `grep -n "tone=\|crumbOnBrand\|onDark" contact/page.tsx` | `:59 tone="onBrand"`; `crumbOnBrand` and the legacy `onDark` boolean both gone. Thirteenth of thirteen |
| **G9** eight incomplete triples | **CLOSED** | triple census over 51 served routes | **zero** `data-cta-goal` unset, across all 37 distinct triples and all 167 attributes. Goal vocabulary `contact 66, form 91, tool 4, research 3, data 2, services 1` = 167. `research_survival_index_book` now exists. See **O6** for the residual asymmetry |
| **G10** two hexes in `page.tsx` | **CLOSED** | comment-stripped grep for `#[0-9a-fA-F]{3,8}` in `page.tsx` | **empty**. `--ink-navy-via: #22334d` and `--ink-navy-deep: #0f1c30` declared at `globals.css:213-214`; the via stop is the composited value, so no painted colour moved |
| **G11** two off-whites | **CLOSED** | `grep -oh fafaf7 html/*.html` over 51 routes | **0**. All four slug templates on `bg-[var(--ground-subtle)]`: `calculators/[slug]:130`, `for/[slug]:210`, `services/[slug]:205`, `vat/[slug]:162`. One off-white on the site |
| **G12** no wave-close artefacts | **CAPTURED by this review** | the three instruments against the `074b39ce` build | `sweep_r6.json`, `cta_r6.json`, `bc_r6.json` written and read. Manager to commit them as `sweep_gapfix2` / `cta_gapfix2` / `browser_gapfix2` if they are wanted in the record |
| **N1-N4** | recorded, no change | — | as R5 |

### Checks the brief named that are not R5 items

| check | command | decisive line |
|---|---|---|
| `data-cta` census vs `cta_final.json` | `cta_snapshot.mjs` | distinct triples **1 → 37**; `non_interactive_ctas: []`; **zero ids lost**; 36 gained. Total attributes 51 → **167** |
| wrapper-`data-cta` guard | carrier-tag census over 51 routes + source grep | carriers are `105 <a` and `62 <button`, **nothing else**; source grep for `<(div\|section\|aside\|li\|figure\|ul\|ol\|form\|p\|span)[^>]*data-cta=` returns nothing. R5 B2's guard holds |
| header ids unchanged | grep over 51 served routes | `51 x data-cta="header_book"`, triple `header_book\|header\|contact`. Exactly as before |
| `Calculator headingLevel` | heading order on the four tool pages | `h1 h2 h2 h2 h3` on all four. No skipped level; the tool name is an h2 under the page h1 |
| prose freeze vs `074b39ce^` | comment-stripped string-literal + JSX-text multiset per changed file, all 23 source files | **one** added string, `"LeadForm carries the data-cta triple"`, a test name. **Zero user-facing sentences added, changed or removed.** Absolute |
| every `ld+json` parses | parse over all 51 routes | **0 unparseable** |
| artefacts, all 51 routes | grep | em-dash **0** (`sweep.totalDashes` 0), `[object Object]` **0**, `undefined` as text **0**, `NaN` **0**, `{{` **0**, `TODO` **0** |
| gate §9.1, all 8 rows | playbook block, `DIR=ecommerce` | `1 layout-utils:6 / 2 kit adopted: 8 distinct / 56 call sites / 2a declined:151 / 2b adopted=4 declined=17 / 3 geist/font/sans / 4 backdrop:1 / 5 Eyebrow=7 section-label=0 / 6 (empty) / 7 page.tsx + EcommerceBackdrop.tsx / 8 walks=2 guards-the-guard=2` — **all 8 pass**. Row 8 improved 1→2. Row 2a 152→151 |
| four-marker row | playbook block, comment-stripped | `ping=1 stats=2 backdrop=3 rounded-full=4` — **held**, identical to R5 |
| contrast / overflow / anchor gaps | `browser_check.mjs --grounds`, 4 widths, 156 entries | **contrast 0, overflow 0, anchorGaps 0**. 39 of 51 routes captured (4 nav timeouts: `/vat`, `/research/online-seller-index`, `/cookie-policy`, `/vat/vat-on-marketplace-fees`) — the N4 instrument class, not a site defect |
| mobile at a real 390 | `page.emulate({isMobile:true})`, dSF 3, 8 routes | `scrollWidth == clientWidth == innerWidth == 390` on **every** route; **0** horizontal page scroll. The wide research and comparison tables exceed 390 inside their `overflow-x-auto` wrappers, which is the intended shape. Sub-24px hits are inline prose links, the 16px kit footer links and the 1x1 skip link — plus O7 |
| drawer focus trap at 390 | real click on the toggle, then 14 `keyboard.press("Tab")` | drawer opens, **`outside: 0`** — all 14 stops inside `<header>`, every one ringing `solid 2px rgb(138, 94, 26)`. The `6799f9289` trap holds |
| `npm test` | read-only run | `Test Files 8 passed (8)`, `Tests 57 passed (57)` |
| `tsc` | `npx tsc --noEmit` | exit 0, no output |

---

## D) OPEN QUESTIONS FOR THE OWNER, plain English

Bundle all six into one ask. Nothing below is built until he answers.

1. **Your ads are switched off by your own site, on every page.** The site tells
   the browser which outside companies are allowed to put a box on the page, and
   Google's ad address was left off that list by mistake when security settings
   were added on 28 September. The symptom is silent: the ad space is simply
   blank and nothing is reported. This affects every site in the estate that has
   ads turned on, not just this one. It is a one-line fix in the shared code.
   Do you want it done, and on which sites?

2. **The enquiry panel sits directly on the dark footer on 32 pages.** Two dark
   blocks with nothing between them read as one. The house component has a
   setting that puts the panel on a light band instead, made for exactly this.
   Every other kit site does the same thing, so this is a family look, not a
   mistake here. Do you want it switched on, or is the solid dark block fine?

3. **The "who we help" row on the home page is a row of four again.** That was
   the fix you were owed. Immediately below it, the four "specialist services"
   boxes are still two across and twice as wide, and they have been that way
   since before this programme started — nobody flagged them because nobody
   asked. Do you want those four to match the row above?

4. **Nothing on this site moves.** The house animation sheet (cards lighting up
   as you scroll, a small rule drawing itself under each section label) was
   deliberately left out because switching it on risked dragging another site's
   colours across. That risk is now contained and it is a small job. It is the
   clearest remaining difference from Holloway Davies. Do you want it?

5. **The booking page is now unreachable.** On 28 September the footer's "Book a
   consultation" was pointed at the contact form instead. The old booking page
   is still live and still works if you type the address, but nothing anywhere
   on the site links to it and it is not in the list we give Google. Should it
   be deleted, or given its link back?

6. **The FAQ question from the original plan has quietly answered itself.** The
   plan said the site showed its questions in three different styles. It now
   shows them in one — click-to-open panels on all 21 pages that have them,
   home page included — with the two research studies deliberately showing their
   answers as plain text. The only thing still undecided is whether to swap the
   panels for the house component, which would look identical to a reader. Our
   recommendation: leave it, and close the question.

---

## E) FALSE PREMISES FOUND

1. **"19 `LeadForm` mounts"** in the gap-fix receipt, said three times. There are
   18. The receipt's own list has 18 and the new test asserts 18. O4.
2. **"ONE scroll container, and it is this wrapper"**
   (`blog/[category]/[slug]/page.tsx:177`). There are two; the kit component
   carries its own, tighter clamp. O2.
3. **R5's B2 baseline.** R5 compared against `sweep_final.json` (1244). The
   instrument's default baseline is `sweep_baseline.json` (707, SHA
   `153e5017`), against which the site has **0 breaches**. Both numbers are
   real; only one is the instrument's. The manager's ruling to compare against
   the post-`09acd2af` count was the right call and the delta now proves the
   cause outright.
4. **Four `globals.css:NNN` citations** that no longer point at what they name,
   three of them moved by this commit. O3.
5. **The port's `browser_*.json` artefacts record zero console noise**, which
   reads as "this site is clean". They predate the CSP entirely. Any claim of
   console cleanliness drawn from them is void. O1.

---

Scratch deleted.
