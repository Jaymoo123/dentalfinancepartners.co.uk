# P2-8: independent adversarial fidelity review, phase 2

Package P2-8. I built none of phase 2. Nothing was edited, staged, committed or deployed by
this package; no server was started, restarted or stopped. One file written: this one.

**VERDICT: FAITHFUL-WITH-GAPS.**

Phase 2 delivered its own surfaces to the standard. Every high-stakes claim in the brief
that concerns the blog subsystem holds when measured in the rendered DOM: FAQ answers,
BlogPosting JSON-LD, hub corpora, the header breakpoint fix, the single sidebar scroll
container, the capture-surface set and the `data-cta` triples all pass. The gaps are one
new defect the port introduced (an outbound studio credit on every route, contradicting its
own receipt), and a class of pre-existing contrast failures that the port walked past on
209 of 241 instrument findings, one of which lands on a CTA button on all 62 posts the
phase rewrote.

---

## 0. Server identity and age, re-asserted before anything was quoted

The brief's discriminator was slightly wrong and I did not use it as given: `grep -c "fixed
fee"` returns **0 on BOTH ports** (case-sensitive). The live string is `Fixed fee`. Re-derived:

| Check | 3611 | 3641 | Proves |
|---|---|---|---|
| `<title>` | `Specialist Contractor Accountants \| IR35 Advice UK` | identical | this site, not a sibling |
| `grep -c "Fixed fee"` on `/` | 17 | 0 | age: `18b4f25f:page.tsx` has 3 source hits, `HEAD:page.tsx` has 0 (F8 fee-promise sweep) |
| P1-9 layered CTA rule in the served stylesheet | absent (0 hits) | present, both `display:none` and the `@media (min-width:64rem)` arm | 3641 carries a rule that exists **only** at HEAD |

3641 is the phase-2 build at `HEAD` (`b0479e3c`). Confirmed a second way, and this matters:
**phase 3 is editing the working tree right now** (16 modified files, `P3-1_GLOSSARY_LOCATIONS.md`
and `P3-2_RESEARCH_RESOURCES.md` untracked, plus an untracked `ChromeGate.tsx`). The build on
3641 does **not** contain those edits, e.g. `research/page.tsx` renders `text-neutral-400`
(HEAD:83) while the working tree already reads `text-slate-500`. **Every source line quoted
below is from `git show HEAD:`, never from the working tree**, so a phase-3 edit landing
mid-review cannot make this report wrong.

Instrument re-run by me, not inherited: `browser_check.mjs --site=contractors-ir35
--base=http://localhost:3641 --sample=6`, 392 page-widths. Self-test `ok`, slate-500/white
4.76, slate-400/white 2.56. **0 overflow findings, 0 anchor-target gaps, 0 unparseable
colours.** 241 contrast findings (more than the brief's 209 only because my blog sample was
larger; the twelve distinct classes are identical).

**Measurement method for the triage.** Puppeteer + Edge at DPR 1: set the candidate's own
`color` to `transparent !important`, settle the scroll (the page's smooth-scroll races the
capture; this cost two wrong result sets before I caught it), screenshot the viewport, and
read the real painted pixel at the element's centre, rejecting any sample where
`elementsFromPoint` says something else is on top (the DeepScrollModal white card occludes
the footer and produced three wrong result sets before that guard went in). Foreground from
`getComputedStyle`, resolved through a canvas so `oklch()` is exact. Every real ratio below
was cross-checked against hand arithmetic on the resolved hexes, and the two agree.

---

## 1. FIRST JOB — contrast triage

**241 findings, 12 distinct classes: 209 instances REAL, 32 instances FALSE POSITIVE.**
By class: 8 real, 4 false positive. The instrument lied in both directions exactly as warned:
it invented the whole homepage hero class, and it stayed silent on the ResultGateModal
(§1.1, last row).

| # | Finding (instrument) | Instr. ratio | Real ratio, painted pixels | Verdict | Instances / routes | File (at HEAD) and fix |
|---|---|---|---|---|---|---|
| 1 | `h2 "Not sure how this applies to your IR35 p"` | 1.10 | **1.10** — `#0a0a0a` on `#171717` | **REAL, blocking** | 152 / 38 routes (`/glossary/[slug]`, all 4 widths) | `app/glossary/[slug]/page.tsx:121-124`. The card is `bg-neutral-900 p-8 text-white`; the `<h2>` carries no colour class, so `globals.css:193-199` `@layer base { h1..h6 { color: var(--ink) } }` beats the inherited white. Fix: `className="text-xl font-bold text-white sm:text-2xl"`, or swap the hand-rolled card for the kit `LeadCTAPanel` already used elsewhere on this site. Pre-existing: 3611 measures 1.10 too |
| 2 | `a "Run the numbers"` | 1.38 | **1.38** — `#155e75` on `#0e7490` (arith. 1.36) | **REAL, blocking** | 24 sampled / **62 posts**, all widths | `components/blog/ToolIsland.tsx:26` sets `text-white`, but the anchor sits inside `article-body prose-blog`, and `globals.css:300` `.prose-blog a { color: var(--accent-strong) }` is **unlayered**, so it beats the layered utility. `not-prose` does nothing here (no typography plugin; the selector is a plain descendant). The CTA label is invisible on its own button. I confirmed the ToolIsland renders on **62 of 62** posts. Pre-existing (3611 identical), but it is inside the prose wrapper P2-1 rewrote. Fix: scope the rule (`.prose-blog p > a, .prose-blog li > a`) or move `.prose-blog` rules into `@layer components` |
| 3 | `label "Leave blank"` | 1.00 | n/a, never painted | **FALSE POSITIVE** | 24 / 6 routes | `components/forms/LeadForm.tsx:174-187`. Genuine honeypot: wrapper is `aria-hidden="true"` with `position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden` **in the rendered HTML**, input is `tabIndex={-1} autoComplete="off"`, and it is genuinely load-bearing server-side — `packages/web-shared/leads/server/createLeadSubmitHandler.ts:230` reads `enquiry_ref` and stores the row flagged. No human can see it. Exclude |
| 4 | `p "Composite snapshot based on client patte"` | 2.48 | **2.48** — `#a3a3a3` on `#fafafa` | **REAL** | 12 / 3 routes (`/for/[slug]`) | `app/for/[slug]/page.tsx:151`, `text-neutral-400`. Fix: `text-neutral-500` (4.53 on this ground) or `text-slate-500`. Pre-existing. Separately, the sentence itself breaches §0.9 — see gap M6 |
| 5 | `h2 "Your accountant should understand how co"` | 1.00 | **7.97** — white on `rgb(36,87,103)` | **FALSE POSITIVE** | 4 / 1 route | Ground is a photograph under `bg-cyan-900/82`, `app/page.tsx:412-419`. `bgOf()` returns `null` on a background-image and the node should have been skipped; it was not, because the gradient/photo layers are not in the element's own paint chain. Passes comfortably |
| 6 | `p "IR35 rules, PSC dividends, the 24-month "` | 1.12 | **7.05** — `#cffafe` on `rgb(41,87,104)` | **FALSE POSITIVE** | 4 / 1 route | Same band, `app/page.tsx:421-423`. Passes |
| 7 | `p "Updated Apr 2026" / "Updated 2025-11-20" / "Updated Jun 2026"` | 2.58 | **2.58** — `#a3a3a3` on white (arith. 2.52) | **REAL** | 12 / 1 route (`/research`, 3 cards) | `app/research/page.tsx:83`, `text-neutral-400`. Fix: `text-slate-500`. **Phase 3 has already made exactly this edit in the working tree** (uncommitted, not in the 3641 build) |
| 8 | `p "About us"` | 3.35 | **3.35** — `#0e7490` on `#171717` | **REAL** | 4 / 1 route | `app/about/page.tsx:18` is `<p className="eyebrow text-cyan-400">`. `text-cyan-400` would measure 9.88 on this navy, but `globals.css:211-219` `.eyebrow { color: var(--accent) }` is **unlayered** and beats it, repainting the eyebrow cyan-700. Fix: delete `color` from `.eyebrow`, or move the rule into `@layer components`. Pre-existing |
| 9 | `p "Get in touch"` | 3.35 | **3.35** — same | **REAL** | 4 / 1 route | `app/contact/page.tsx:18`. Same rule, same fix |
| 10 | `button "×"` | 2.58 | **2.52** — `#a3a3a3` on white | **REAL** | 1 / 1 route, 390 only | `components/intent/DeepScrollModal.tsx:104`, `text-neutral-400`. This is the modal's close control, so it also misses the 3:1 non-text floor. Fix: `text-neutral-500`. Pre-existing, byte-identical at `18b4f25f` |
| — | **Silence the instrument cannot break** | — | not measured | **REAL, unverified ratio** | 2 call sites | `components/calculators/premium/ResultGateModal.tsx:94` (close control) and `:139` (a `text-xs` link) carry the same `text-neutral-400`. Both sit behind a gate the crawler never opens, so the instrument reports nothing. Same token, same white card: expect ~2.5. Flagged as **not measured**, not as a finding |

**Sub-totals.** REAL: classes 1, 2, 4, 7, 8, 9, 10 = **209 instances**. FALSE POSITIVE:
classes 3, 5, 6 = **32 instances**.

**One root cause behind three of them.** Findings 1, 2, 8 and 9 are the same bug wearing
three masks: `globals.css` sets colour from **outside `@layer utilities`** (an `@layer base`
element rule, and two unlayered class rules), so it silently beats every Tailwind colour
utility written on the element or inherited onto it. This is the Medical port's recorded
trap. Nothing in phase 2 swept for it, and a class-reading review cannot see it — all four
elements *say* `text-white` / `text-cyan-400` in the markup.

**My own harness's false positives, reported so nobody re-derives them as findings.**
`a "Built by Double Wired Creative"` reads 1.59 in my sweep: the text is
`text-transparent` with `bg-clip-text`, so my transparent-text trick cannot separate glyph
from ground. Computed honestly, the gradient stops `#818cf8` and `#fb923c` on slate-900
measure **5.98** and **7.89** — it passes. Its defect is not contrast (gap S1). Likewise
four footer legal links on `/services` and `/research` read 4.41 in my sweep; the footer
ground is uniformly `oklch(0.208 0.042 265.755)` = slate-900 with no motif, and slate-400 on
slate-900 is **6.96**. Sampling artifacts, not findings.

**Net contrast movement, 21 routes measured on both ports at 390px:** 83 failures pre-port
→ **39** post-port. The port fixed the whole 2.47 read-time class on `/blog` and the hubs,
the calculator result panel, the breadcrumb-on-dark and the image-credit links. It introduced
**zero** genuine new contrast failures.

---

## 2. SECOND JOB — the seven claims

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | FAQ answers in server HTML on all 62 posts, matching the FAQPage JSON-LD | **TRUE** | All 62 posts curled. `<dd>` count == `FAQPage.mainEntity.length` on **62/62**, every count > 0 (5 to 14, median 10), `<dt>` == `<dd>` throughout. Includes the 3 markup-carrying posts: on `best-umbrella-company-how-to-choose` the answer's `<a href='/blog/umbrella-vs-limited-company/limited-company-vs-umbrella-contractor'>` renders as a **real anchor inside the `<dd>`**, `grep -c "&lt;a href"` = 0, so nothing is escaped into visible literal markup. The kit accordion was correctly not adopted |
| 2 | BlogPosting JSON-LD on all 62 posts | **TRUE** | `"@type":"BlogPosting"` count == **exactly 1 on 62/62**. Every `ld+json` block on every post parses; **0 empty blocks**, 0 parse failures. Types per post: `[ProfessionalService, AccountingService]`, `WebSite`, `BlogPosting`, `FAQPage`, `BreadcrumbList`. The failure mode P2-1 predicted did not occur |
| 3 | Header CTA hides below 1024px; wordmark does not wrap at 390px | **TRUE** | Measured on `/`: CTA `display:none` at 390/768/1023 and `inline-flex` at 1024/1440; burger the exact inverse. No width renders both. Wordmark box: **390 → 208x42** at x=16, burger starts at x=326, so 102px of clear air and no overlap; 768/1023 → 337x38; 1024 → 327x49; 1440 → 337x38. 42px is the kit's intended two-line lockup, not the 119x62 wrap the gap-fix was written against. Burger is 48x48 at every width (was 44x44 pre-port). Page overflow 0 at all five widths |
| 4 | All 7 hubs reach full corpus in server HTML | **TRUE** | Unique post hrefs per hub, `curl -L`: 17, 13, 9, 7, 6, 5, 5 = **62**, matching the sitemap's per-category counts exactly. Pagination is hide-not-slice: one `aria-label="Pagination"` and 59 `hidden` occurrences with every article still in the DOM. `/blog` itself now emits **62** post links (12 pre-port) |
| 5 | The sticky sidebar has one scroll container | **TRUE** | At 1440x900, scrolled 6000px: `stickyCount` 1 visible, **`scrollContainers` 1**, sticky element `getBoundingClientRect()` **top 96, bottom 884** — the passing shape named in the brief, to the pixel. Re-run on the two longest articles (54 and 48 ToC items): identical, still one container. The clamp lives on the outer `div.sticky.top-24.max-h-[calc(100vh-7rem)].overflow-y-auto` and `stickyDesktop={false}` is passed, so the inner component does not clamp |
| 6 | No capture surface added or removed | **TRUE** | All ten mount: StickyCTA + SpecialistWidget (`PageShell`), ReturningBar + DeepScrollModal (`app/layout`), InlineMiniLeadForm + NextStepOffer (`BlogPostRenderer`), CalcResultCta (2), MobileToolSlot, ResultGateModal, ResourceGate (2). `ExitIntentModal.tsx` is deleted, has zero importers, zero mounts, and the three misleading comment blocks now say "retired". `git diff --name-status 18b4f25f..HEAD` adds **no** component to `src/components` except `research/ChartDataTable.tsx` (an sr-only a11y table, not a capture surface). StickyCTA's diff is classNames and comments only; trigger, persistence, exclusions and cadence are untouched |
| 7 | Every pre-port `data-cta` triple still exists | **TRUE** | Rendered-DOM triples (not counts, not server HTML — most of these mount client-side), 21 routes, both ports, each page scrolled to the foot to fire the deferred surfaces. **6 pre-port triples, 6 still present, zero missing, zero route-coverage shrink.** 13 new ids, all expected: `header_book\|header\|contact` on 21/21 routes, plus 12 `blog_hub_*` ids on the new hubs. Link floor separately clean: all **157** baseline routes re-fetched with `curl -L`, **0 regressions**, unique internal links 2755 → 3616 |

**Other standing checks, all measured.** Zero horizontal overflow at 390px across 41 routes
(my own run) and across all 154 routes at all four widths (the instrument). Zero anchor-target
gaps: every `#anchor` target computes `scroll-margin-top >= 96px`, including the new
`#enquiry-form`. Canonical tail holds on posts: ask (byte 79419) precedes FAQ (byte 86581),
so navy never touches the navy footer. Band grounds oscillate on `/blog`
(neutral-900 → #fafaf7 → white → navy footer) and on hubs (cream → slate-50 → slate-900 →
slate-50 → navy footer). The blog ask carries `id`, `scroll-mt-24`, `aria-labelledby` and a
"Skip to enquiry form" route into it; the header CTA leaves for `/contact`, as §0.5 allows.
The `primary-*` ramp genuinely resolves in the built stylesheet with `--color-primary-600:
#0e7490`, the delta's binding step shift, so nothing renders uncoloured.

**Silent substitution hunt.** Three candidates found, two cleared and one confirmed:
P2-1's two non-adoptions (`EyebrowRule`, `RelatedArticles`) are honest — `globals.css` at
HEAD really does lack `.related-card` and `.eyebrow-rule` and really does not import
`globals-standard.css`, and the hand-matched related grid ships a real
`focus-visible:outline-2 outline-primary-600` ring with `rounded-xl ring-1
ring-neutral-200/70`, so the kit's recipe is met and the invisible-focus defect is avoided.
The confirmed one is S1 below: a receipt that says a prop was omitted so a feature would be
off, where omitting the prop turns it **on**.

---

## 3. Gaps, by severity

### BLOCKING

**B1. The ToolIsland CTA label is invisible on all 62 blog posts.** 1.38:1, measured.
`components/blog/ToolIsland.tsx:26` writes `text-white`; `globals.css:300`
`.prose-blog a { color: var(--accent-strong) }` is unlayered and repaints it cyan-800 on the
cyan-700 button. The standard says 4.5 for all text (§0.7). Pre-existing and identical on
3611, but it is the one real contrast defect that lands inside the surface phase 2 rewrote,
on every route the phase owns, and P2-1's own §4 acceptance table signs E10 off as "LIVE,
unchanged" without measuring it.

**B2. The glossary lead-CTA heading is invisible on 38 routes.** 1.10:1, measured.
`app/glossary/[slug]/page.tsx:121-124`, `@layer base` h-rule beating inherited white. Out of
phase-2 scope and phase 3 is in that file now, so the action is: make sure P3-1 fixes the
heading colour and does not just restyle the card.

### SERIOUS

**S1. The port added an unearned, followed outbound link to every page, and its receipt says
the opposite.** `components/layout/SiteFooter.tsx:35-44` does not pass `showBuilderCredit`;
the kit's default is `true` (`packages/web-shared/design/chrome/SiteFooter.tsx:132`). The
file's own comment claims the prop was "intentionally omitted" so the credit would not
render. It renders: "Built by Double Wired Creative", `rel="noopener noreferrer"` (followed),
in an indigo/orange gradient belonging to no palette on this site, on **154 of 154 routes**.
Pre-port: **0 occurrences**. This is the single defect the port introduced. Fix:
`showBuilderCredit={false}`, one line.

**S2. `.eyebrow` overrides its own utility and fails contrast on two routes.**
`globals.css:211-219` sets `color: var(--accent)` unlayered, so `about/page.tsx:18` and
`contact/page.tsx:18` render 3.35:1 despite asking for `text-cyan-400` (which would be 9.88).
Fix: drop `color` from `.eyebrow` and let the utility own it. Note the delta's §3 N3 argues
to keep the mono eyebrow; keeping the face does not require keeping the colour declaration.

**S3. The `neutral-400` metadata class was fixed by file, not by rule.** P2-2 correctly moved
`/blog`'s read-time to `neutral-500`, but the identical token still ships at
`research/page.tsx:83` (3 instances), `for/[slug]/page.tsx:151` (3 routes) and
`intent/DeepScrollModal.tsx:104`, all 2.5:1, plus two unmeasured siblings in
`ResultGateModal.tsx:94,139`. Sweep by rule: `grep -rn "text-neutral-400" src` and judge each
call site against its ground.

**S4. No layer audit was done on `globals.css`.** Three separate findings above are the same
mechanism. Until the colour declarations in `@layer base` and in the unlayered class block
are either scoped or moved into `@layer components`, any future utility written on those
elements is a no-op, and the diff will look correct. This is the trap that already cost this
programme the phase-1 CTA fix.

### MINOR

**M1. The blog index keeps the pre-redesign card edge.** §0.1: "Radii and edges are
`rounded-xl` with `ring-1 ring-slate-200/70`. `rounded-2xl` and `border border-slate-200` are
the pre-redesign recipe." `BlogListWithSearch.tsx:117,130` ship `rounded-xl border
border-neutral-200` — 76 instances on `/blog`, 0 rings — while the hubs P2-3 built next door
ship 29 rings and 1 border. The site's two blog entry points do not match each other.
P2-2's receipt argues the recipe from a sibling port, not from §0, and no delta row sanctions
border-instead-of-ring. Fix: `ring-1 ring-neutral-200/70`.

**M2. The blog closing ask is hand-rolled, not `LeadCTAPanel`.** §0.5: "The closing ask is
`LeadCTAPanel` ... No bare `LeadForm` in a coloured card, ever."
`BlogPostRenderer.tsx:367-381` is a `bg-slate-900 rounded-xl` section with a `LeadForm` in a
white card. The composition mirrors the kit and the code comment reasons it out, but the kit
component is already in use on this site with `contained`, and the delta records no such
deviation. Either adopt it on posts or write the row into `DESIGN_DELTA.md §3`.

**M3. Read-time contrast passes with 0.03 of headroom.** `neutral-500` on the `#fafaf7` card
is **4.53** (62 instances measured on `/blog`); one card sampled at 4.42 where the ground is
`#f7f7f4`. Any future darkening of that ground breaks the floor. `slate-500` would give 4.55
and is where N1 points anyway.

**M4. 11 of the 13 new CTA ids emit no `data-cta-goal`.** `blog_hub_*_articles` and
`blog_hub_topic_*` carry id + placement only. This is the kit's own behaviour
(`BlogCategoryHub.tsx:206` sets a goal on the primary only), so it is not a site deviation,
but `vw_cta_performance` will carry null goals for the new hub funnel.

**M5. The hub hero and the band under it are the same ground to the eye.** Cream
`rgb(251,250,247)` then slate-50 `rgb(248,250,252)`: redmean distance 8.8, against the
instrument's own 15.72 benchmark for a genuine alternation. §0.1 wants grounds to oscillate
visibly.

**M6. Standing §0.9 breach, already logged, still open.** "Composite snapshot based on client
patterns" (`for/[slug]/page.tsx:152`) and "patterns across our contractor clients"
(`page.tsx:236`) are claims of clients, which §0.9 forbids outright; a disclaimer does not
cure it. Recorded at SERIOUS in `P0C2_CLAIMS_LEDGER.md` as an owner decision. Repeated here
only so it is not read as cleared.

---

## 4. What this brief got wrong

1. **The "fixed fee" discriminator.** Returns 0 on both servers; the live string is
   `Fixed fee`, 17 on 3611 and 0 on 3641. The intent was right, the case was not.
2. **The homepage hero description, inherited from a prior reviewer, is wrong, and so is the
   correction.** The flagged `h2` and `p` do **not** sit over
   `from-neutral-950/97 via-neutral-950/90 to-neutral-900/60`. That gradient is the `h1` hero
   at `page.tsx:168`. The flagged pair sits in a **second** photo band at `page.tsx:412-423`
   under `bg-cyan-900/82` — the cyan layer the prior reviewer deleted from the description is
   real, it is just on a different section. Both layers exist. The prior reviewer's numbers
   (11.74 / 7.30) also do not reproduce: painted pixels give **7.97** and **7.05**. The
   verdict is unchanged — both pass — but the account was wrong twice over, which is why I
   inherited neither.
3. **"`a "Run the numbers"` ... the tool believes the ground is dark."** It does not: the
   ground is the cyan-700 button, correctly resolved. The tool was right about the ground and
   right about the ratio; what makes it look impossible is that the *foreground* is not the
   `text-white` the markup asks for. Settled as REAL either way.
4. **"`label "Leave blank"` ... probably the form honeypot."** Correct, and verified rather
   than assumed.
5. Sitemap note, not an error in the brief: 3611 serves 157 `<loc>`, 3641 serves 154. The
   three missing are the `/resources/*` guides, dropped deliberately by the phase-0 F5
   indexing fix. The URLs still respond, and the link floor is unaffected.

---

## 5. Checked and clean vs not checked

**Checked and found nothing:** horizontal overflow (154 routes x 4 widths, plus my own 41 at
390); anchor-target `scroll-mt`; internal-link floor (157 routes); FAQ/JSON-LD parity (62/62);
BlogPosting (62/62); hub corpora (7/7); capture-surface inventory (10/10 plus the deleted
one); `data-cta` triples (21 routes, rendered DOM, both ports); header breakpoints (5 widths);
sidebar scroll containers (3 posts incl. the 2 longest); band grounds (3 phase-2 routes);
`primary-*` ramp resolution; StickyCTA cadence; P2-1's two non-adoption arguments.

**Not checked, and named so it is not assumed:** anything behind an interaction — the
ResultGateModal, ResourceGate, CalcResultCta result flows and the mobile drawer's open state
were never opened, so their contrast, focus order and `data-cta` triples are unmeasured (the
two `text-neutral-400` call sites in `ResultGateModal` are the known risk). Widths other than
390/768/1023/1024/1440. Keyboard focus order and screen-reader output. `next build` was not
run, so nothing here says the tree compiles. The 100 routes outside my 21-route both-ports
differential were measured on 3641 by the instrument but not re-measured pre-port, so
"pre-existing" is asserted only where I ran both ports.

---

## Receipt

- **Verdict: FAITHFUL-WITH-GAPS.**
- **Contrast triage: 241 findings, 12 classes. REAL 209 instances (8 classes). FALSE POSITIVE
  32 instances (4 classes: the honeypot label x24, the two homepage hero nodes x8).** Plus one
  real defect the instrument is structurally blind to (`ResultGateModal`), reported as
  unmeasured.
- **Gaps: 2 blocking, 4 serious, 6 minor.** One of the twelve (S1) was introduced by the port;
  the rest are pre-existing failures the port did not sweep, or written-standard deviations
  absent from the delta.
- **All 7 brief claims: TRUE, measured in the rendered DOM.**
- **Wrong in the brief: 3 items** — the `fixed fee` discriminator (case), the homepage hero
  gradient account and both of the prior reviewer's hero ratios, and the reading of the
  "Run the numbers" ground.
- Nothing edited, nothing staged, nothing committed, nothing deployed, no server touched.
