# V1 — Verification run, contractors-ir35 design port

Date: 2026-09-13. Read-only run. No code, content or config changed; no `next build`;
no state-changing git command. The only file written is this one.

**What this is.** Every package on this port returned a WRITTEN verification list instead
of running one, because four agents sharing one `.next` produced a phantom
`pages-manifest.json ENOENT`. The manager ran the site-wide gates (build, tests, sweep,
browser, dependency closure, predeploy) and they pass. The per-package lists were never
executed. This run executes them.

---

## 0. Server identity, re-asserted before anything was trusted

| Probe | 3651 (current build) | 3611 (pre-port, SHA `18b4f25f`) |
|---|---|---|
| `curl -s <base>/ \| grep -o "<title>[^<]*"` | `Specialist Contractor Accountants \| IR35 Advice UK` | same |
| `curl -s <base>/ \| grep -o -i "fixed[- ]fee" \| wc -l` | **0** | **17** |
| Served stylesheet | `/_next/static/css/e2fc5c841fee2c83.css` | `/_next/static/css/23f126c6dbaa32d9.css` |

Both re-asserted. Distinct CSS hashes confirm 3651 is not serving the pre-port sheet.
All measurements below are against 3651 unless the row is a before/after comparison.

**Tooling used.** `curl`; a purpose-written brace-depth CSS walker; a hand-written
contrast calculator self-tested before use; and headless Chrome driven through the
repo's existing `puppeteer-core` (the Claude browser extension was not connected).
Three instrument defects were found and corrected mid-run — they are recorded in §4
because two of them initially produced false FAILs.

---

## 1. FAILURES, restated first

### FAIL 1 — the `rounded-xl` radius scale is collapsed site-wide (PORT REGRESSION)

**File:** `contractors-ir35/web/src/app/globals.css:51` and **`:60`**

```css
  --radius: 0rem;                              /* line 51 */
  --radius-xl: calc(var(--radius) + 4px);      /* line 60  <- the defect */
  --btn-radius: var(--radius-xl);              /* line 61 */
```

`--radius-xl` is Tailwind v4's own theme token, emitted as `.75rem` inside
`@layer theme`. Line 60 redefines it in a **plain, unlayered `:root` block**, which
beats the layered definition. Every `rounded-xl` utility on the site therefore resolves
`var(--radius-xl)` to `calc(0rem + 4px)` = **4px instead of 12px**.

Measured with `getComputedStyle` on a probe element injected into the live page:

| utility | Tailwind v4 value | 3611 (before) | 3651 (after) |
|---|---|---|---|
| `rounded-sm` | 4px | 4px | 4px |
| `rounded-md` | 6px | 6px | 6px |
| `rounded-lg` | 8px | 8px | 8px |
| **`rounded-xl`** | **12px** | **12px** | **4px  FAIL** |
| `rounded-2xl` | 16px | 16px | 16px |
| `rounded-3xl` | 24px | 0px | 0px (pre-existing, `--radius-3xl` undefined) |

Token values read from the live document element:
`--radius: 0rem`, `--radius-xl: calc(0rem + 4px)`, `--btn-radius: calc(0rem + 4px)`.
On 3611: `--radius-xl: .75rem`, `--btn-radius` empty.

**Blast radius.** 146 `rounded-xl` occurrences in `contractors-ir35/web/src`, 42 more in
`packages/web-shared`. 44 elements on the homepage alone measure 4px, including the
header primary CTA (`data-cta="header_book"`, computed `border-radius: 4px`) and every
kit button, because `--btn-radius` chains off the same shadowed token. The scale is now
**inverted**: a `rounded-xl` card is squarer than a `rounded-lg` one.

**Why every existing check missed it.** This is the same *shape* as the F10 defect — a
`globals.css` declaration silently beating the Tailwind utility layer — but F10 swept for
unlayered **rules**. This is an unlayered **custom property**. No class read, no diff and
no source grep can see it; only a computed value can.

**Also wrong: the comment that ships with it.** `globals.css:56-58` states
`--radius-xl` is *"kept for parity with the estate's other radius chains even though
nothing here reads it directly."* That is false. `.rounded-xl` reads it (188 call sites),
and so does `--btn-radius`. The stated intent in the same comment — *"Standard is one
radius, rounded-xl"* — is exactly what the line prevents.

**Suggested fix (not applied):** delete the line 60 redefinition so `--radius-xl` falls
back to Tailwind's `.75rem`, and set `--btn-radius: var(--radius-xl)` unchanged on line 61.
One line deleted restores 12px everywhere and keeps the button on the same single radius.

**Verdict against the lists:** fails P4-2 items 6, 7 and 13 (all specify 12px), and
contradicts P2-2 item 5, P2-3 item 7 and the kit card recipe in P3-1 rows 12-14.

---

### FAIL 2 — the "Built by Double Wired Creative" credit ships on every page

**File:** `contractors-ir35/web/src/components/layout/SiteFooter.tsx:33-47`
(the `<KitSiteFooter …/>` call), against
`packages/web-shared/design/chrome/SiteFooter.tsx:55-65` and `:217-229`.

P1-3 item 5 expects `grep -o 'Built by Double Wired Creative'` to return **no match**.
It returns **1 in the rendered footer HTML** (plus 1 in the RSC payload).

The wrapper's own docstring (`SiteFooter.tsx:7-9`) says *"showBuilderCredit intentionally
omitted: this site did not commission Double Wired Creative"*. But the kit prop
**defaults to `true`** — its own comment says so: *"Defaults TRUE so Property, the site
they actually designed, is byte-identical… A site that did not commission the design
passes `false`."* Omitting the prop is the opposite of disabling it.

Consequence: a followed outbound link to `https://www.doublewiredcreative.com/` on every
page of the site, carrying an indigo/orange gradient that belongs to no other brand here —
the precise harm the kit's comment warns about.

Corroborated by the link count. P1-3 item 6 expects **15** footer anchors against a
pre-port 10:

| | 3611 (before) | 3651 (after) |
|---|---|---|
| footer `<a>` total | 10 | **16** |
| footer unique hrefs | 9 | 14 |

16 − the unwanted credit = 15, exactly the predicted figure. So item 6 fails only because
of this defect, and passes the moment it is fixed.

**Suggested fix (not applied):** add `showBuilderCredit={false}` to the `KitSiteFooter`
call in `contractors-ir35/web/src/components/layout/SiteFooter.tsx`.

---

**No other FAIL was found.** Everything else either passed, or the list row was wrong
and the underlying property passed — those are separated in §3 and §4.

---

## 2. THE HIGHEST-VALUE CHECK — F10 item 6, reproduced independently

**Claim under test:** in the built stylesheet, a brace-depth walk to `.prose-blog a`,
`.eyebrow` and `.section-label` must report an enclosing `@layer components`, not `[]`.

I did not reuse the report's script. I wrote a fresh character-level walker with
string-awareness over the sheet **actually served by 3651**
(`/_next/static/css/e2fc5c841fee2c83.css`, 93,744 bytes — note the report quotes
`226f67dec972778a.css`, the pre-fix build).

**Result:**

```
.prose-blog a    layers=['@layer components']  sel=.prose-blog a
.eyebrow         layers=['@layer components']  sel=.eyebrow,.font-geist-mono,.font-mono
.eyebrow         layers=['@layer components']  sel=.eyebrow
.section-label   layers=['@layer components']  sel=.section-label
```

**PASS.** Layer declaration order in the built sheet, by first appearance (there is no
`@layer a,b,c;` statement): `properties` → `theme` → `base` → `components` → `utilities`.
`utilities` comes last, so a Tailwind utility now beats all three rules. Correct.

**Full unlayered inventory of the built sheet — 14 entries, all benign:**

| what | count | assessment |
|---|---|---|
| `@keyframes` percentage stops (`0%`, `to`, `50%`, `75%,to`) | 8 | not cascade-resolved, correct |
| `:where(h2[id],h3[id],h4[id])` | 1 | the one rule F10 deliberately left unlayered; `:where()` pins specificity at 0 |
| `.__className_*` / `.__variable_*` | 4 | generated by `next/font`, outside the author sheet |
| *(everything else)* | 0 | — |

So the "1 deliberately left unlayered" figure in F10 §0 is right for author rules.

**The rendered proof, which the CSS walk alone does not give.** F10 §3.2 says the defect
was `.prose-blog a` forcing `var(--accent-strong)` `#155e75` onto the ToolIsland CTA over
`bg-cyan-700`, at ratio **1.38** across all 62 blog posts. Measured in the live DOM on a
blog post at 1440×900:

| element | computed `color` | painted ground | ratio |
|---|---|---|---|
| ToolIsland CTA "Run the numbers" (inside `.prose-blog`) | `rgb(255,255,255)` | `oklch(.52 .105 223.128)` = `#007595` | **5.28 PASS** |
| "Open calculator" CTA | `rgb(255,255,255)` | same | **5.28 PASS** |

And the pre-fix pairing reproduces exactly: `#155e75` on `#007595` = **1.38**. The
defect was real and is fixed on the rendered page, not merely in the source.

**Self-test of my walker.** My first version reported *zero* unlayered rules — wrong. It
desynced on Tailwind's escaped-quote class selectors (`.after\:content-\[\'\'\]:after`),
entering string mode at a backslash-escaped `'` and swallowing the rest of the file.
Corrected by handling backslash escapes outside strings as well as inside; the fixed
walker closes at stack depth 0 over 877 rules and finds the `:where(h2[id]…)` rule at
offset 87,371 that the broken one missed. Recorded because an instrument that returns a
clean result for the wrong reason is the exact failure mode this run exists to catch.

---

## 3. Full item table

Verdicts: **PASS** / **FAIL** / **CANNOT-RUN** / **PASS\*** = the property holds but the
list row as written checks the wrong thing (detailed in §4).

### P1-1_TOKENS.md

| Item | Command run | Expected | Actual | Verdict |
|---|---|---|---|---|
| `--ink-whisper` has 0 call sites | `grep -rn 'ink-whisper' src packages/web-shared` | 0 consumers | 3 hits: the definition at `globals.css:25` and 2 code **comments** (`research/page.tsx:95`, `BlogListWithSearch.tsx:149`). Zero consuming references | PASS |
| P0D unlayered findings re-verified | brace-depth walk, §2 | rules layered | layered | PASS |
| *(not in the list, found here)* `--radius-xl` override | computed radius scale | — | 4px, not 12px | **FAIL 1** |

### P1-2_HEADER.md (7)

| # | Command | Expected | Actual | Verdict |
|---|---|---|---|---|
| 1 | `grep -o "<title>…"` | real title | `Specialist Contractor Accountants \| IR35 Advice UK` | PASS |
| 2 | `grep -o 'CONTRACTOR TAX'` + computed colour | 1+; `rgb(14,116,144)` | 9 occurrences; header CTA `background-color: rgb(14, 116, 144)`, `color: rgb(255,255,255)` | PASS |
| 3 | `data-cta="header_book"` + goal/placement | `contact` / `header` | `data-cta="header_book"` ×1, `data-cta-goal="contact"` ×1, `data-cta-placement="header"` ×1 | PASS |
| 3b | drawer `header_book_mobile` at 390px | `header_mobile` | drawer CTA renders at 390 (§P1-9 row) | PASS |
| 4 | 768 / 1023 / 1024 / 1280 breakpoint agreement | switch at 1024 only | see P1-9 table — exact | PASS |
| 5 | 5 nav links, no new ones | 5, none added | `/services /ir35-status /for /blog /contact` all present; zero `/calculators /glossary /locations /research /resources` in the header | PASS |
| 6 | contrast ≥4.5, target 5.36 | ≥4.5 | `#0e7490` on white = **5.36**; white on `#0e7490` = 5.36 | PASS |
| 7 | no dead `BrandWordmarkHomeLink` import | nothing | nothing | PASS |

### P1-3_FOOTER.md (8)

| # | Command | Expected | Actual | Verdict |
|---|---|---|---|---|
| 1 | title | this site | correct | PASS |
| 2 | `grep -o 'bg-slate-900'` | present on `<footer>` | 2 hits; computed footer background `oklch(.208 .042 265.755)` = slate-900 | PASS |
| 3 | consent toggle renders + click flips | label flips, storage changes | button reads **"Do not track me"** → click → **"Enable analytics"**; `localStorage.cfp_consent = "denied"` | PASS |
| 4 | `text-primary-400` computes `rgb(34,211,238)` | cyan-400 | footer "Company" heading computed `rgb(34, 211, 238)`; `--color-primary-400: #22d3ee` present in built CSS | PASS |
| 5 | `Built by Double Wired Creative` | **no match** | **1 in rendered footer + 1 in RSC payload** | **FAIL 2** |
| 6 | footer `<a>` count | 15 (was 10) | **16** (was 10) — the extra one is FAIL 2 | **FAIL 2** |
| 7 | `/locations`, `/book`, `/calculators` resolve | 200 | 200, 200, 200 | PASS |
| 8 | 390px / 1440px no horizontal scroll | none | `scrollWidth == clientWidth` at both, 13 routes (see P2-1 V17) | PASS |

### P1-4_SHELL.md (6)

| # | Command | Expected | Actual | Verdict |
|---|---|---|---|---|
| 1 | title | this site | correct | PASS |
| 2 | `grep -o 'scroll-mt-24'` | 1+ | 4 | PASS |
| 3 | anchor targets clear the sticky header (browser) | target not hidden | header height **73px**; all 20 in-page anchor targets on a blog post compute `scroll-margin-top` ≥ 60 (96px); **0** below | PASS |
| 4 | redundant with P1-2/P1-3/P1-5 | — | not re-run, per "run once" | — (dedup) |
| 5 | `/embed` and `/embed/<slug>` chrome | both keep chrome (pre-port behaviour) | `/embed` keeps chrome (header ✔ footer ✔ skip link ✔); `/embed/<slug>` is **chrome-free** | **PASS\*** — see §4 |
| 6 | 390 / 1440 no new horizontal scroll | none | none | PASS |

### P1-5_STICKY.md (7)

| # | Command | Expected | Actual | Verdict |
|---|---|---|---|---|
| 1 | title | this site | correct | PASS |
| 2 | bar appears past 500px, cyan rules | visible | present in DOM with `border-t-4 border-cyan-700` | PASS |
| 3 | `data-cta="sticky_cta"` / `sticky` / goal `form` | exact triple | `data-cta-placement="sticky"` present site-wide; attributes preserved character-for-character vs 3611 | PASS |
| 4 | click fires analytics with `cta_id`/`placement` | event fires | **CANNOT-RUN** — needs a live analytics endpoint; no event sink available read-only | CANNOT-RUN |
| 5 | dismiss persists; hidden on `/admin` and `/embed` | stays hidden | `/embed/<slug>` has no sticky CTA at all (chrome-free); session persistence not exercised | PASS (partial) |
| 6 | fallback vs personalised offer | swaps | **CANNOT-RUN** — requires driving intent state | CANNOT-RUN |
| 7 | CTA contrast ~5.36 | ≥4.5 | white on `#0e7490` = **5.36** | PASS |

### P1-6_BREADCRUMB.md (5 rows + 5 static)

| Row | Command | Expected | Actual | Verdict |
|---|---|---|---|---|
| `/blog` nav | `grep -o 'aria-label="Breadcrumb"'` | present | 1 | PASS |
| `/blog` JSON-LD | parse BreadcrumbList | 2 items | 2: `Home → https://www.contractortaxaccountants.co.uk/`, `Blog` | PASS |
| `/calculators` | Home + Calculators + chevron | present | `<ol>` with "Home" anchor, inline chevron `<svg>`, then the current crumb | PASS |
| `/glossary/ir35` | absolute URL in JSON-LD | absolute | `"item":"https://www.contractortaxaccountants.co.uk/glossary"` | **PASS\*** — the list's expected string spells the domain `contractor-tax-accountants.co.uk`, which is not this site's domain. Intent (absolute URL) passes |
| `/research/uk-contractor-index` | title matches | contains "UK Contractor Index" | `<title>UK Contractor Index \| Contractor Tax Accountants` | PASS |
| static ×5 (14 imports, `siteUrl`, `onDark`, no `data-cta` lost, `siteConfig`) | source | as stated | confirmed; the report's own correction of the brief's "15 imports" to 14 stands | PASS |

### P1-7_RAMP.md (8)

| # | Command | Expected | Actual | Verdict |
|---|---|---|---|---|
| 1 | `grep -c "primary-600"` in built CSS | ≥1 | **36**; `lg:flex` also present | PASS |
| 2 | header CTA ground `rgb(14,116,144)` | solid petrol-cyan | `rgb(14, 116, 144)`, white label | PASS |
| 3 | footer column heading cyan | `rgb(34,211,238)` | "Company" computed `rgb(34, 211, 238)` | PASS |
| 4 | active nav underline cyan at ≥1024 | cyan border | `border-primary-600 text-primary-700` applied; `--color-primary-600 #0e7490`, `-700 #155e75` both emitted | PASS |
| 5 | drawer active state at 390 | cyan bar + pale ground | classes emitted, ramp resolves | PASS |
| 6 | breadcrumb link `rgb(21,94,117)` | primary-700 | `--color-primary-700: #155e75` = rgb(21,94,117) | PASS |
| 7 | 700 / 1100 / 1000 breakpoints | burger-only below 1024 | exact, see P1-9 | PASS |
| 8 | no unstyled-chrome regression | laid out | header/footer flex rows render correctly at all 7 widths | PASS |
| *receipt* | "Ramp steps minted: **11** (`-50` … `-950`)" | 11 | **10** steps emitted: 50,100,200,300,400,500,600,700,800,900. **No `--color-primary-950`** | receipt inaccurate, ramp itself PASS |

### P1-9_HEADER_GAPFIX.md (7 widths + 3 assertions)

Measured with `getBoundingClientRect` + `getComputedStyle` on the homepage.

| Width | nav | CTA required | CTA actual | burger | verdict |
|---|---|---|---|---|---|
| 390 | hidden ✔ | `display:none` | `display:none` | visible 48×48 | PASS |
| 640 | hidden ✔ | `display:none` | `display:none` | visible 48×48 | PASS |
| 700 | hidden ✔ | `display:none` | `display:none` | visible 48×48 | PASS |
| 768 | hidden ✔ | `display:none` | `display:none` | visible 48×48 | PASS |
| 1023 | hidden ✔ | `display:none` | `display:none` | visible 48×48 @ x=951 | PASS |
| 1024 | visible 430×38 | visible | `display:flex`, 171×48 @ x=821 | `display:none` | PASS |
| 1440 | visible 491×38 | visible | `display:flex`, 171×48 @ x=1157 | `display:none` | PASS |

All four surfaces switch at 1024 and only at 1024. The pre-fix bug (CTA VISIBLE 171×48 at
390–1023) is gone at every width.

| Extra assertion | Expected | Actual | Verdict |
|---|---|---|---|
| Wordmark at 390 | single line, height < 50 (was 118.97×62) | **208 × 42** | PASS |
| Drawer CTA still renders at 390 | yes | yes, burger opens | PASS |
| xl secondary `header_contact` at 1440, absent at 1024 | present at 1440 | **absent at every width, 390→1440** | **CANNOT-RUN** — see §4 |

### P2-1_RENDERER.md (18, V0–V17)

Post under test: `/blog/umbrella-vs-limited-company/best-umbrella-company-how-to-choose`.

| # | Expected | Actual | Verdict |
|---|---|---|---|
| V0 | this site's title | correct | PASS |
| V1 | 200 | 200 | PASS |
| V2 | `<dd>` = 10 (E1 gate) | **10** after, **10** before | PASS |
| V3 | FAQ heading ≥1 | 2 (`grep -o`) | PASS |
| V4 | `"@type":"FAQPage"` = 1 | 1 | PASS |
| V5 | `"@type":"BlogPosting"` = 1 (E2 gate) | 1 | PASS |
| V6 | `cssSelector:[".tldr","h1"]` = 1, `tldr` class ≥1 | 1 and 1 | PASS |
| V7 | **link floor**: only additions, zero deletions | 42 unique before → 48 after. **Zero content deletions.** The only two "deletions" are build-hash asset URLs (`webpack-93c4….js`, `23f126….css`). Additions: `#enquiry-form` (expected), `/book`, `/calculators`, `/locations` (P1-3 footer), the pexels image href, the new asset hashes, and `doublewiredcreative.com` (FAIL 2) | PASS |
| V8 | pexels credit ≥1 (E4 gate) | 2 | PASS |
| V9 | `next_step` 1, `specialist_widget` 1, matching pre-port exactly | both present ×1; **plus `header_book` ×1** | **PASS\*** — see §4 |
| V10 | `id="enquiry-form"` 1, `scroll-mt-24` 1, `href="#enquiry-form"` 1 | 1, **4**, 1 | **PASS\*** — see §4 |
| V11 | `<time dateTime=` = 1 (E6b) | 1 | PASS |
| V12 | `<figcaption` = 1 | 1 | PASS |
| V13 | `blur-[2px]`/`h-[420px]` = 0 | 0 | PASS |
| V14 | a post in an UNMAPPED category | **CANNOT-RUN** — see §4 | CANNOT-RUN |
| V15 | second post `/blog/ir35-status/inside-ir35` | 200; `<dd>` 13; `BlogPosting` 1; `next_step` + `specialist_widget` + `header_book` | PASS |
| V16 | **link floor**, whole site: 157 URLs / 2755 links or better | see below | PASS |
| V17 | 390/768/1024/1440: no h-scroll; ONE scrollbar in the ToC column (E13) | see below | PASS |

**V16, site-wide crawl.** Identical crawler run against both servers:

| | 3611 (before) | 3651 (after) | delta |
|---|---|---|---|
| URLs reached | 102 | **114** | +12 |
| internal links | 1,793 | **2,442** | +649 |
| `data-cta` attributes | 163 | **391** | +228 |
| non-200s | 0 | 0 | — |
| URLs lost | — | **0** | — |
| pages with fewer links than before | — | **0** | — |

New URLs are the 10 city pages plus `/locations` and `/book`. My crawler's absolute
totals (102) differ from the baseline's (157) because `sweep_baseline.json` seeds from the
sitemap, not from `/`; the before/after comparison above uses one method on both servers,
which is the gate that matters. Sitemap totals: 3611 = 157, 3651 = **154**, the three
`/resources/*` guides correctly removed by F5.

**V17, ToC column.** At 1440×900, scrolled to 6000px, on `aside.hidden.lg\:block`:

```
stickyRect  = { top: 96, bottom: 884, height: 788 }
maxHeight   = 788px   (max-h-[calc(100vh-7rem)])
activeScrollContainers = 1
```

Exactly the passing shape. See P2-5 below for the stress test.

### P2-2_BLOG_INDEX.md (7)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1 | build clean | manager's gate | — (dedup) |
| 2 | `/blog` post links = 62 | **62** | PASS |
| 3 | files on disk = 62 | **62** (`content/blog/*.md`) | PASS |
| 4 | sweep, 0 regressions | 0 URLs lost, 0 pages with fewer links (V16) | PASS |
| 5 | cards `rounded-xl` + neutral-200 hairline | classes present, but `rounded-xl` computes **4px** | **FAIL 1** |
| 6 | search / sort / count still work | code paths unchanged; page 200s and renders | PASS |
| 7 | `data-cta` in lease = 0 | `blog/page.tsx` 0, `BlogListWithSearch.tsx` 0 | PASS |

### P2-3_HUBS.md (8)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1 | lint clean | scoped eslint per report | — (dedup) |
| 2 | 7 static params | all 7 hubs 200 | PASS |
| 3 | per-category counts 17/13/9/7/6/5/5 | `ir35-status` **17**, `umbrella-vs-limited-company` **13**, `mtd-and-compliance` **9**, `contractor-accounting-basics` **7**, `limited-company-tax` **6**, `pension-and-dividends` **5**, `expenses-and-deductions` **5** — all exact | PASS |
| 4 | `ir35-status` title | `IR35 Status \| Contractor Tax Guides \| Contractor Tax Accountants` | PASS |
| 5 | h1 vs breadcrumb crumb kept separate | confirmed in rendered HTML | PASS |
| 6 | `data-cta` count = "4", formula `3 + otherTopics.length` | **9** hub CTAs = 3 + 6 topics. Formula correct; the stated "4" is a typo in the list | **PASS\*** |
| 7 | `rounded-xl` + `ring-1`, no stray `rounded-2xl` | no stray classes, but `rounded-xl` computes 4px | **FAIL 1** |
| 8 | sweep G5, hub rows must not decrease | 0 decreases | PASS |

### P2-5_SIDEBAR.md (5) — the load-bearing geometry check

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1 | `top: 96`, `bottom: 884`, exactly **1** scroll container | **top 96, bottom 884, height 788, activeScrollContainers 1** | **PASS** |
| 2 | `stickyDesktop={false}` reached the component: one `sticky top-24`, not two | host `<div class="sticky top-24 max-h-[calc(100vh-7rem)] … overflow-y-auto">` is the only **active** scroller | PASS |
| 3 | ToC link targets clear the sticky header | 26 heading targets on the 26-heading post, **0** below 60px `scroll-margin-top` (all 96px). The receipt's "currently will fail" is **stale** | PASS |
| 4 | mobile `<details>` ToC untouched | present and unchanged | PASS |
| 5 | link floor unchanged by ToC | 0 decreases (V16) | PASS |

**Stress test I added, because one post is one post.** The column declares **two**
`overflow-y` containers and **two** `position:sticky` elements — the host div (`top:96px`)
and the kit ToC's own inner `<ul class="max-h-[60vh] overflow-y-auto">`
(`TableOfContents.tsx:65`, unconditional, not switched off by `stickyDesktop={false}`).
Only one *scrolls*, so E13 holds — but that is the kind of thing that holds on the sampled
post and breaks elsewhere. I re-ran the measurement on the longest ToC in the corpus
(`psc-limited-company-contractor-tax`, 27 headings): still `top 96 / bottom 884`, still
**activeScrollContainers = 1**. The latent double-scroll does not materialise. Closed.

**Receipt inaccuracy:** P2-5's receipt records the clamp as `max-h-[calc(100vh-8rem)]`.
The shipped value is `7rem`. 7rem is the one that produces the expected bottom of 884
(900 − 112 = 788; 96 + 788 = 884); 8rem would give 868. The shipped code is right and
the receipt's transcription is wrong.

### P3-1_GLOSSARY_LOCATIONS.md (25 rows)

| Row | Expected | Actual | Verdict |
|---|---|---|---|
| 0 | title | correct | PASS |
| 0b | `More in ` on `/glossary` = 0 | 0 | PASS |
| 1 | 38 glossary links | **38** | PASS |
| 2 | 10 location links | **10** | PASS |
| 3 | 7 `data-cta*` lines, 1 each | 7 lines, 1 each: `header_book`/`header`/`contact`/`hero_book`/`hero`/`form`/`specialist_widget` | PASS |
| 4 | identical on `/glossary/ir35`, `/locations`, `/locations/london` | identical on all three | PASS |
| 5 | `/locations/london` `id="book"` = 1 | 1 | PASS |
| 6 | same on other three | 1 each | PASS |
| 7 | `/locations/london` blog links ≥4 | **4** | PASS |
| 8 | `/locations/london` unique `/` hrefs ≥21 | **25** | PASS |
| 9 | `/glossary/ir35` ≥28 | **28** | PASS |
| 10 | `/glossary` ≥53 | **53** | PASS |
| 11 | `/locations` ≥25 | **25** | PASS |
| 12 | `rounded-2xl` = 0 ×4 | 0 0 0 0 | PASS |
| 13 | `bg-stone-50` = 0 ×4 | 0 0 0 0 | PASS |
| 14 | `bg-cyan-600` = 0 ×4 (the 3.68 pill) | 0 0 0 0 | PASS |
| 15 | em-dash = 0 ×4 | 0 0 0 0 | PASS |
| 16 | banned claims on `/locations/london` | no output | PASS |
| 17 | `<details>` = London's `localFaqs` length | London has **6** `localFaqs`; page serves **7** `<details>` (6 FAQ + 1 unrelated disclosure), all 6 questions and the first answer fragment present | **PASS\*** — the row's `grep -c` is wrong on single-line HTML; see §4 |
| 18 | all JSON-LD parses | `/glossary` 3 blocks, `/glossary/ir35` 5, `/locations` 3, `/locations/london` 6 — all parse, no exception | PASS |
| 19 | 10 location slugs → 200 | **10 × 200** | PASS |
| 20 | 38 glossary slugs → 200 | **38 × 200, 0 non-200** | PASS |
| 21 | browser: visible **cyan** focus ring on a term card at 1280 | **#0e7490 ring, 1,896 pixels**, measured by pixel diff — see §4, this initially read as a FAIL | PASS |
| 22 | `/locations/london` hero CTA scrolls to the form with header clearance | `id="book"` present; all in-page targets ≥96px `scroll-margin-top` | PASS |
| 23 | `/glossary/ir35` prose ~65ch + right rail, rail drops <1024 | `prose-blog max-width: 65ch`; `lg:` rail; no h-scroll at 390 | PASS |
| 24 | no dark band touching the dark footer | last band before footer is light on all four routes; no overflow | PASS |

### P3-2_RESEARCH_RESOURCES.md

| Item | Expected | Actual | Verdict |
|---|---|---|---|
| 1 (overflow, the whole list's item 1) | no horizontal overflow, research routes | `/research/uk-contractor-index` at 390 and 1440: `scrollWidth == clientWidth`, 0 culprits | PASS |
| §8.1 "`fixed fee` returns 17 on 3611" | 17 | **17** — confirmed | PASS |
| §8.2 contrast defect is 2.52 not 2.38 | the call site's ground is white | method reproduces the family of figures; the fixed value now renders | PASS |
| §8.4 `--muted` = `var(--ink-soft)` = `#525252`, 7.47 on slate-50 | pass | `#525252` on `#ecfeff` = **7.51**; on white = **7.80** | PASS |
| §8.5 port 3621 is down | — | still down; 3651 used instead | acknowledged |
| research route anchors | ≥96px | 2 in-page anchors, **0** below 60 | PASS |

### P4-1_CALCULATORS.md (33, V1–V33)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| V1 | 200 | 200 | PASS |
| V2 | 10 tool links | **10** | PASS |
| V3 | `premium` = 0 | 0 | PASS |
| V4 | ≥21 unique internal | **26** | PASS |
| V5 | `header_book`/`hero_book`/`specialist_widget` ×1 | exactly those 3, 1 each | PASS |
| V6 | `id="book"` = 1 | 1 | PASS |
| V7 | `rounded-2xl`/`border-2 border-neutral` = 0 | 0 | PASS |
| V8 | 10 slugs → 200 | **10 × 200** | PASS |
| V9 | dividend ≥11 | **15** | PASS |
| V10 | ir35-status-indicator ≥14 | **18** | PASS |
| V11 | umbrella-take-home ≥13 | **17** | PASS |
| V12 | 3 CTAs ×1 | exact | PASS |
| V13 | `id="book"` = 1 | 1 | PASS |
| V14 | `max-w-5xl` = 0 | 0 | PASS |
| V15 | every FAQ question+answer in raw HTML **and** FAQPage JSON-LD | 5 FAQPage entries on `/calculators/dividend-tax-calculator`; **0** missing from the visible HTML | PASS |
| **V16** | `/embed/<slug>` internal links = **0** (was 13/24) | 0 `<a>` internal links. The row's regex also matches `<link>` asset hrefs, which return 2 | **PASS\*** — see §4 |
| **V17** | `<footer` = 0 (was 1) | 0 in HTML; `document.querySelector('footer')` = **null** after hydration | PASS |
| **V18** | `Skip to content` = 0 (was 2) | 0 rendered anchors (`querySelectorAll` = 0). 1 occurrence survives **inside the RSC flight payload only** | **PASS\*** — see §4 |
| **V19** | `data-cta` = 0 (was 1) | 0 in HTML and 0 in the hydrated DOM | PASS |
| V20 | canonical points at the twin | `https://www.contractortaxaccountants.co.uk/calculators/corporation-tax-calculator` | PASS |
| V21 | robots `noindex, nofollow` | `<meta name="robots" content="noindex, nofollow"/>` | PASS |
| V22 | `utm_source=partner-embed` = 1 | 1 rendered anchor (2 raw, HTML + RSC payload) | PASS |
| V23 | `ir35-embed-height` ≥1 in HTML | 0 in HTML — the string lives in the client chunk, not the markup. **Verified by the right check instead:** intercepted `parent.postMessage` and captured `{type:"ir35-embed-height", height:968}` firing twice | **PASS\*** — see §4 |
| V24 | 10 `/embed/<slug>` → 200 | **10 × 200** | PASS |
| **V25** | `/embed` unique internal ≥23, UNCHANGED | **25** by curl, **24** unique in the hydrated DOM | PASS |
| **V26** | `/embed` `<footer` = 1 | 1; hydrated DOM has header ✔ footer ✔ skip link ✔ | PASS |
| V27 | `/embed` 10 calculator links | **10** | PASS |
| V28 | `/embed` resize snippet ≥1 | present | PASS |
| V29 | `utm_source=embed-gallery` = 1 | 1 rendered (2 raw) | PASS |
| V30 | `bg-[#fafaf7]` = 0 | 0 | PASS |
| V31 | em/en dash = 0 on all 4 routes | 0 0 0 0 | PASS |
| V32 | banned claims = 0 | empty on all 4 | PASS |
| V33 | full sweep, no `/calculators*` decrease | 0 decreases anywhere (V16) | PASS |

**The two embed gates the brief singled out both hold.** V16–V19 prove the chrome
strip landed on `/embed/<slug>`; V25–V26 prove it did **not** over-apply to `/embed`,
which still carries full chrome and 24 internal links.

### P4-2_PREMIUM.md (16)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1 | `premium-tool-` ≥1 | 2 (`premium-tool-ir35`) | PASS |
| 2 | `Free interactive tool` = 1; old filled chip = 0 | 1 and 0 | PASS |
| 3 | new recipe hit; `rounded-2xl border-l-4` = 0 | `rounded-xl border-l-4 border-[var(--accent)] … ring-1` present; `rounded-2xl border-l-4` = 0 | PASS |
| 4 | `/calculators` premium = 0; internal links "still 21" | 0; **24** (≥ the 21 floor; "still 21" is a stale exact) | **PASS\*** |
| 5 | `see_result` absent from server HTML | 0 | PASS |
| 6 | card radius **12px** all corners | **4px** | **FAIL 1** |
| 7 | inputs/segmented buttons **12px** | governed by the same token | **FAIL 1** |
| 8 | gate opens once, Esc reveals, second tool does not re-open | modal opens on `see_result`; contains "Get my figure confirmed", "No thanks, just show my result", a `Skip and show my result` button and a Privacy Policy link. Once-per-session across two tools **not exercised** | PASS (partial) |
| 9 | all three escape hatches reveal | all three controls exist and are wired; three-tab dismissal matrix **not exercised** | CANNOT-RUN |
| 10 | X button and "No thanks" compute `rgb(82,82,82)` | both compute `oklch(0.439 0 0)` — which **is** `#525252` = `rgb(82,82,82)` = neutral-600, 7.80 on white. Neither reads `rgb(163,163,163)` | PASS |
| 11 | eyebrow: monospace, uppercase, `rgb(82,82,82)`, letter-spaced, **not** cyan | `color: rgb(82,82,82)`, `font-family: GeistMono…`, `text-transform: uppercase`, `letter-spacing: 1.2px`. **Not** `rgb(14,116,144)` — the unlayered `.eyebrow` rule does not reach it | PASS |
| 12 | cyan 2px focus rings in the modal | the same `focus-visible:outline-primary-600` recipe verified painting `#0e7490` at 2px by pixel diff (§4) | PASS |
| 13 | at 390: slot visible, calculator not, gate unreachable; slot 12px + cyan edge | `see_result` is hidden by an ancestor `hidden sm:block` → gate unreachable ✔; slot visible with `border-left-color: rgb(14,116,144)` ✔; slot radius **4px, not 12px** | PASS except **FAIL 1** |
| 14 | no horizontal overflow at 390 | `scrollWidth == clientWidth` = 390 | PASS |
| 15 | `tsc --noEmit` exit 0 | manager's gate | — (dedup) |
| 16 | `vitest run calculator-crawl-path` | manager's gate | — (dedup) |

### P5-1_HOMEPAGE_PILLARS.md (9)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1 | link floor | 0 URLs lost, 0 pages down (V16) | PASS |
| 2 | 10 persona links on `/` and `/for` | **10** and **10** | PASS |
| 3 | exactly 3 `data-cta` per route ×5 | `/`, `/services`, `/ir35-status`, `/for`, `/contact` — each exactly `header_book` + `hero_book` + `specialist_widget` | PASS |
| 4 | no hydration mismatch from the panel footnote | 1 console error across the run, a 404 on an asset — **no** hydration warning on `/`, `/services` or the premium post | PASS |
| 5 | `#book` resolves with header clearance | `id="book"` present on all four P3-1 routes; all anchor targets ≥96px | PASS |
| 6 | self-canonicals | `/` → `…co.uk`, `/for` → `…/for`, `/services` → `…/services`, `/ir35-status` → `…/ir35-status` | PASS |
| 7 | ramp resolved (hero) | header CTA `rgb(14,116,144)` | PASS |
| 8 | grounds alternate, nothing navy touches the footer | confirmed on the five routes | PASS |
| 9 | `tsc --noEmit` | manager's gate | — (dedup) |

### P6-1_SECONDARY_LEGAL.md (15)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1 | all eight routes 200 | `/about /contact /book /complete /thank-you /privacy-policy /cookie-policy /terms` = **8 × 200** | PASS |
| 2 | 34 clause ids across the three legal pages | privacy **11** + cookie **10** + terms **13** = **34** exact | PASS |
| 3 | section rail in server HTML at every width | present, no h-scroll at 390 or 1440 | PASS |
| 4 | `/cookie-policy` names the footer toggle and the toggle works | "Do not track me" named 5× and "footer" 9×; the live toggle flips and writes `cfp_consent` (P1-3.3) | PASS |
| 5 | two policies word-identical to **3641** | 3641 is down. Compared to **3611** instead: the only text deltas are chrome (wordmark casing `Contractor Tax Accountants` → `CONTRACTOR TAX`, plus the new footer links). Policy prose unchanged | **PASS\*** — baseline substituted |
| 6 | `/complete` four branches | `/complete` 200 and `noindex, nofollow`; four `?t=` branches **not exercised** | CANNOT-RUN |
| 7 | `/book` both branches | 200, `noindex, nofollow`; branch matrix not exercised | CANNOT-RUN |
| 8 | `/thank-you` both branches + progress indicator | 200; branch matrix not exercised | CANNOT-RUN |
| 9 | `/book` and `/complete` `noindex, nofollow` | **both exact**. `/thank-you` = `noindex, follow` | PASS |
| 10 | `/about` hero CTA fires a funnel row | needs an analytics sink | CANNOT-RUN |
| 11 | hero CTA scrolls to form with clearance | `id="book"` + ≥96px clearance | PASS |
| 12 | `/about` panel publishes no proof points | no banned claims; `fixed fee` = 0 sitewide on `/` | PASS |
| 13 | no hydration mismatch on `/about` | none observed | PASS |
| 14 | link floor on the legal routes | 0 decreases | PASS |
| 15 | grounds oscillate on `/about` | navy → white → neutral-50 → …; no dark band abutting the footer | PASS |

### F5_INDEXING_CRAWL_FIX.md

| Check | Expected | Actual | Verdict |
|---|---|---|---|
| three guides honour `noindex` | `noindex, follow` | `/resources/ir35`, `/resources/pay-planning`, `/resources/structure` — **all three** `noindex, follow` | PASS |
| still built, served, linked | 200, no 404s | **200 × 3** | PASS |
| out of the sitemap | absent | **absent**; sitemap 157 (3611) → **154** (3651), exactly −3 | PASS |

### F7_CANONICAL_FIX.md

| Check | 3611 (before) | 3651 (after) | Verdict |
|---|---|---|---|
| `/for` | `…co.uk` (homepage) | `…co.uk/for` | PASS |
| `/for/it-contractors` | `…co.uk` (homepage) | `…co.uk/for/it-contractors` | PASS |
| all 10 `/for/<slug>` | homepage | **each self-canonical, 10/10** | PASS |
| `/`, `/services`, `/ir35-status` | — | self-canonical | PASS |

The whole 11-URL `/for` family told Google it was a duplicate of the homepage. It no
longer does. The report's diagnosis and its "5 route families, not 1" correction both
reproduce.

### F8_FEE_PROMISE_RESWEEP.md (11)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1 | `tsc --noEmit` clean | manager's gate | — (dedup) |
| 2 | `vitest` 448/448 | manager's gate | — (dedup) |
| 3 | `Fixed fees` on `/` = 0 (was 10) | **0** on 3651; **17** on 3611 | PASS |
| 4 | `priceRange` = 0 on `/` and a location | **0** and **0**; 3611 had 2 | PASS |
| 5 | `/about` closing line, no fee | "not a call centre" ×2, no fee claim | PASS |
| 6 | `/locations` + a slug: no "Fixed fees" in body, meta or JSON-LD | **0** and **0** | PASS |
| 7 | `/services` two exact strings | "Scope agreed after a call" ×2, "Scope agreed up front, no surprises" ×2 | PASS |
| 8 | `/for/<slug>` third trust bullet | "Contractor work only, not a general practice sideline" ×2 | PASS |
| 9 | homepage FAQ question in accordion + JSON-LD | "How do you work out what a contractor needs?" ×5 | PASS |
| **10** | **repo-wide regression grep returns nothing** | **2 hits**: `calculators/page.tsx:146` and `calculators/[slug]/page.tsx:172` — both are **code comments documenting the ban** (`"fixed-fee claim and a 24-hour response promise, both banned here"`), not claims | **PASS\*** — see §4 |
| 11 | no file under `packages/` modified | `git status --porcelain packages/` = **empty**. Whole tree: 3 untracked docs only | PASS |

*(The brief calls this "section 11"; it is item 10 of the list in section "Verification
list for the manager's serialised build". Item 11 is the `packages/` check.)*

### F9_OVERFLOW_ANCHORS.md

Computed `scroll-margin-top` on every `h2[id]/h3[id]/h4[id]` and every in-page anchor
target, at 390px:

| route | headings | below 60px | anchor targets | bad targets | verdict |
|---|---|---|---|---|---|
| `/blog/ir35-status/challenge-ir35-determination-sds` (was 25 × 0px) | 26 | **0** | 22 | **0** | PASS |
| `/resources/ir35` (was 9 × 0px) | 9 | **0** | 9 | **0** | PASS |
| `/resources/pay-planning` | 11 | **0** | 11 | **0** | PASS |
| `/resources/structure` | 9 | **0** | 9 | **0** | PASS |
| `/research/uk-contractor-index` | 0 | 0 | 2 | **0** | PASS |
| `/calculators/ir35-status-indicator` | 2 | **0** | 2 | **0** | PASS |
| `/services` | 0 | 0 | 2 | **0** | PASS |
| `/` | 1 | **0** | 2 | **0** | PASS |

Both routes F9 measured at `0px` pre-fix now measure 96px on every target. The
`:where()` rule reaches both stampers — the regex-stamped blog headings and the
hand-written resource ids — as designed.

**Horizontal overflow**, 13 routes × {390, 1440} = 26 measurements:
`document.documentElement.scrollWidth === clientWidth` on **26 of 26**. Zero overflow,
zero culprit nodes. This one sweep discharges P1-3.8, P1-4.6, P2-1 V17, P3-2 item 1,
P4-2 item 14 and F9's overflow half.

### F10_UNLAYERED_SWEEP.md (16)

| # | Expected | Actual | Verdict |
|---|---|---|---|
| 1-5 | inventory of 26 blocks, 25 moved | 0 author rules unlayered in the built sheet; the 1 deliberate exception present | PASS |
| **6** | **`.prose-blog a` / `.eyebrow` / `.section-label` report `@layer components`, not `[]`** | **all three `['@layer components']`** — reproduced independently, §2 | **PASS** |
| 7 | layer order `properties, theme, base, components, utilities` | exact, by first appearance | PASS |
| 8 | `.eyebrow` on dark: `text-cyan-400` wins → 9.90 | `#00d3f2` on `#171717` = **9.90**; the pre-fix `#0e7490` on `#171717` = **3.34** (report says 3.35) | PASS |
| 9 | `.eyebrow` on light unchanged: 5.36 / 5.13 | `#0e7490` on white **5.36**, on `#fafafa` **5.13** | PASS |
| 10 | recolouring would have broken light grounds: cyan-400 on white = 1.81 | **1.81** | PASS |
| 11 | `.prose-blog a` ToolIsland: 1.38 → `text-white` 5.28 | **1.38** and **5.28**, the latter measured in the live DOM | PASS |
| 12 | authored prose links unchanged at 7.27 | `#155e75` on white = **7.27** | PASS |
| 13 | `.section-label` self-grounded 5.36, dormant | 5.36; 19 consumers add layout utilities only | PASS |
| 14 | `.hairline` has 0 class consumers | confirmed: only `var(--hairline)` reads | PASS |
| 15 | `:where(h2[id]…)` left unlayered deliberately | the only unlayered author rule in the built sheet | PASS |
| 16 | `.prose-blog p` also fixed (ToolIsland hierarchy) | `#525252` on cyan-50 measured **7.51** (report says 6.71 using the v3 hex); passes either way | PASS |

---

## 4. Where the lists themselves are wrong

Twelve rows. None of these are site defects; all are defects in the verification lists
or in my own instruments, and each is recorded with the check that should have been
written.

**1. P1-9 — "the xl secondary `header_contact` still appears at 1440".** It appears at no
width. `packages/web-shared/design/chrome/SiteHeader.tsx:438` renders it only
`{ctaSecondary ? … : null}`, and `contractors-ir35/web/src/components/layout/SiteHeader.tsx`
never passes `ctaSecondary`. This site has no xl secondary and never had one, so the row
is unrunnable. **Right check:** assert `ctaSecondary` is absent by design, and assert the
nav "Contact" item is therefore *not* `xl:hidden` (it is not — nav is visible at 1440).
Worth noting the wrapper's docstring claims *"Every prop below is passed EXPLICITLY…
Nothing is left to a kit default"* while `ctaSecondary` is omitted — the same pattern
that made FAIL 2 possible in the footer.

**2. P2-1 V9 — "`data-cta` must match the pre-port server HTML exactly".** It cannot: P1-2
deliberately introduced `header_book` in the same wave. Actual is the pre-port pair plus
`header_book`. **Right check:** assert the pre-port CTAs are a *subset* of the current set
(they are), and enumerate additions against the packages that own them.

**3. P2-1 V10 — "`scroll-mt-24` = 1".** It is 4: P1-4 added it to `#main` and P2-5/F9
added it elsewhere. **Right check:** `≥1`, plus the per-target computed assertion F9 uses.

**4. P2-1 V14 — a post in an UNMAPPED category.** No such post exists. All 7 live
categories are keys of `EARLY_TOOL_BY_CATEGORY`
(`src/lib/intent/taxonomy.ts:211-219`), and all 62 posts carry one of those 7.
`fallbackSplit` (`BlogPostRenderer.tsx:64`) is **unreachable on the current corpus**.
**Right check:** a unit test on `splitContentAtMidScroll`, plus a guard test asserting the
category→tool map stays total. Flagging the dead branch is more useful than the row.

**5. P2-1 V16 — "157 URLs / 2755 internal links or better".** `sweep_baseline.json` seeds
from the sitemap; a crawl from `/` reaches 102 at the same SHA. The literal is not
reproducible without the baseline's own crawler. **Right check:** the relative gate — same
crawler, both servers, zero URLs lost and zero pages with fewer links. Run and passed.
Incidentally: 157 sitemap URLs vs 102 reachable from the homepage means **55 URLs are
orphaned from a home-page crawl** on both servers. Pre-existing, outside this port, worth
someone's attention.

**6. P4-1 V16 — `grep -o 'href="/[^"#?]*"'` on `/embed/<slug>`.** The regex matches
`<link>` asset hrefs, so it returns 2 on a page whose only `<a>` is the external
attribution link. **Right check:** restrict to `<a `, or read `querySelectorAll('a')` —
which returns exactly 1, the external one. Gate passes.

**7. P4-1 V18 — "`Skip to content` = 0".** 0 rendered anchors, but 1 occurrence survives in
the escaped RSC flight payload. The shell markup is still serialised even though it is
not rendered. **Right check:** `document.querySelectorAll('a')` filtered on the text (= 0),
not a grep over the whole response body.

**8. P4-1 V23 — "`grep -c 'ir35-embed-height'` ≥ 1".** The string lives in the client
chunk, never in the HTML, so this row can never pass as written. **Right check, which I
ran:** intercept `window.parent.postMessage` and assert the message. Captured
`{type: "ir35-embed-height", height: 968}`. `EmbedAutoResize` is mounted and working.

**9. P3-1 row 17 (and several others) — `grep -c` on single-line HTML.** Next.js serves
one line, so `grep -c` returns 1 for any non-zero count. P3-1 row 17, P2-1 V3/V6/V8/V12/V13,
P4-2 items 1-5 and F8 items 3/4 all use it. **Right check:** `grep -o … | wc -l`. I re-ran
every one of them that way; the corrected counts are in §3 and none changed a verdict —
but London's `<details>` reads 1 with `grep -c` and **7** with `grep -o`, which would have
hidden a real mismatch had there been one.

**10. P1-6 glossary row — expected `https://contractor-tax-accountants.co.uk/glossary`.**
The site's domain is `contractortaxaccountants.co.uk`, no hyphens, with `www.`. The row's
literal would never match. Intent (absolute URL in BreadcrumbList) passes.

**11. F8 item 10 — "repo-wide regression grep, should return nothing".** It returns two
hits, both code comments that exist to document the ban. **Right check:** exclude comment
lines, e.g. append `| grep -v '^\s*\(\*\|//\|/\*\|{/\*\)'` or scope the grep to rendered
strings. As written, this row will fail forever on its own documentation.

**12. Stale receipts.** P1-7 records "11 ramp steps, `-50` … `-950`" — the build emits
**10** and has no `-950`. P2-5 records the clamp as `8rem` — the shipped value is `7rem`,
and `7rem` is what produces the expected `bottom: 884`. P4-2 item 4 says `/calculators`
internal links are "still 21" — they are 24 (the P4-1 V4 floor is `≥21`, which holds).
P2-3 item 6 says the hub `data-cta` count is "4" then gives the formula `3 +
otherTopics.length`, which is 9; 9 is what ships. P2-5's receipt says the ToC anchor fix
"currently will fail" — it now passes on all 26 targets.

### My own instrument defects, recorded because two produced false FAILs

**A. The brace-depth walker desynced on escaped quotes.** First run reported 0 unlayered
rules — a clean-looking pass arrived at by parsing only 13% of the file. Cause:
`.after\:content-\[\'\'\]:after`, where a backslash-escaped `'` in a *selector* put the
walker into string mode. Fixed by handling `\` escapes outside strings. §2.

**B. `getComputedStyle().outlineColor` is unreliable in headless Chrome.** It reported
`rgb(10,10,10)` for the glossary term card's focus ring. I very nearly filed that as a
defect. An inline `element.style.outlineColor = '#0e7490'` *also* read back as
`rgb(10,10,10)`, which proved the instrument, not the site, was wrong. Settled by pixel
diff of the card focused vs blurred: **1,896 pixels of `#0e7490`** — P3-1 row 21 passes,
and a cyan ring at 5.36 on white clears the 3.0 graphics floor. The DESIGN_DELTA note
about not trusting the automated instrument on `var()`-themed files should be widened:
do not trust computed `outline-color` at all.

**C. Puppeteer's `screenshot({clip})` is page-relative; `getBoundingClientRect()` is
viewport-relative.** Mixing them silently photographs the wrong part of the page. My first
three focus-ring measurements were of a dark hero band 300px away from the card. The
control that caught it: the header nav link sits at scroll 0, where the two coordinate
systems coincide, so it produced a correct reading while the card produced a false one.
Add `window.scrollX/scrollY` before clipping.

**D. `document.querySelector('aside')` picked the wrong `aside`.** The blog post has four;
the ToC column is the fourth (`aside.hidden.lg\:block`). My first pass reported *no sticky
element at all* and I was one step from filing P2-5 item 1 as a FAIL. Query all four and
select by class. This is exactly the trap P2-5's own brief warns about in the other
direction — both broken arrangements read as correct in source, and here a correct
arrangement read as broken in the DOM.

### Contrast method, self-tested before use

Required calibration: slate-500 on white = 4.76, slate-400 on white = 2.56.

| pair | my figure |
|---|---|
| `#64748b` on white (Tailwind **v3** slate-500) | **4.76** ✔ |
| `#94a3b8` on white (Tailwind **v3** slate-400) | **2.56** ✔ |

Method confirmed exact. One consequence worth recording: this site ships Tailwind **v4**,
which paints slate-500 as `oklch(55.4% .046 257.417)` = `#62748e` (4.77 on white) and
slate-400 as `oklch(70.4% .04 256.788)` = `#90a1b9` (**2.63** on white). The calibration
figures in the brief are v3 hexes. So P1-3's "lowest ratio found: 6.96 (slate-400 on
slate-900)" is the v3 number; the value actually painted is **6.78**. Still well over the
floor, but any future row that quotes a v3 hex table against a v4 build is quoting a
colour the browser never renders. All ratios in this report are computed from the oklch
values the build actually emits.

---

## 5. Totals

| | count |
|---|---|
| Items executed | **198** |
| **PASS** | **175** |
| of which **PASS\*** (property holds, list row wrong) | 12 |
| **FAIL** | **10 rows, 2 distinct defects** |
| **CANNOT-RUN** | 8 |
| Deduplicated (same check in two lists, or a site-wide gate the manager already ran) | 5 |

**FAIL rows:** P1-3 items 5 and 6 (FAIL 2); P2-2 item 5, P2-3 item 7, P4-2 items 6, 7 and
13 (FAIL 1); plus FAIL 1 recorded against P1-1 and P4-2's card/control/slot radii.

**CANNOT-RUN rows, and why:**

| Row | Why |
|---|---|
| P1-5.4 sticky CTA analytics event | no analytics sink available read-only |
| P1-5.6 personalised vs fallback offer | requires driving intent state |
| P1-9 xl secondary at 1440 | the surface does not exist on this site (§4.1) |
| P2-1 V14 unmapped-category post | no unmapped category exists (§4.4) |
| P4-2.9 three-tab escape-hatch matrix | needs three fresh sessions; controls verified present |
| P6-1.6 `/complete` four `?t=` branches | branch matrix not exercised |
| P6-1.7 `/book` both branches | branch matrix not exercised |
| P6-1.8 `/thank-you` both branches | branch matrix not exercised |
| P6-1.10 `/about` CTA funnel row | no analytics sink |

None of these is a pass. Four are genuinely unrunnable as written; five need a session
harness or an analytics sink that a read-only run does not have.

---

## 6. What the owner should take from this

1. **Two defects, both one-line fixes, both invisible to source review.**
   `globals.css:60` (radius) and `SiteFooter.tsx` (`showBuilderCredit`). Neither shows in
   a diff as wrong; both change what every page renders.
2. **The radius defect is the more serious.** It is a port regression that flattens the
   port's central design decision — "standard is one radius, rounded-xl" — across 188 call
   sites, and it is defended by a code comment asserting the exact opposite of the truth.
3. **F10 item 6 passes, independently.** The unlayered-rule defect is genuinely fixed in
   the served stylesheet and on the rendered page.
4. **The lists were worth executing.** 175 of 198 rows passed, but 12 rows checked the
   wrong thing and 4 were unrunnable — and the single highest-value defect found here
   (radius) was in *none* of the lists. The pattern holds: a written verification list
   converges on what its author could already see.
