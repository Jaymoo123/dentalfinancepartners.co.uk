# Port field notes: what each site's port taught the next one

**Read this before you start a port. Add to it before you finish one.**

Several sites are being ported to the Property design standard at the same time, by
different agents, in the same working tree. This file is how they teach each other. The
playbook (`DESIGN_PORT_PLAYBOOK.md`) is the METHOD and changes rarely. This file is the
running log of what actually bit, and it changes every session.

If a lesson is durable and general, promote it into the playbook as a numbered trap and
leave a one-line pointer here. If it is specific to one site, it belongs in that site's
`docs/<site>/STATE.md`, not here.

## How to add an entry

Append to the bottom of the relevant section. One entry is one lesson. Every entry carries:

- **the date and the site** it came from,
- **what actually happened**, not what you feared might happen,
- **the deriving command or the file:line**, so the next agent can re-check rather than
  trust you,
- **the rule** that prevents it.

Do not write an entry for something you did not personally observe. A claim with no
command beside it is a rumour, and this file is read by agents who will act on it.

Correct an entry in place if it turns out to be wrong, and say so; a field note that is
quietly deleted teaches nothing, and one that is wrong is worse than one that is missing.

---

## 1. Live-analytics hazards (the class that costs the most)

**2026-09-10, Solicitors and generalist. Adopting the kit chrome rewrites CTA
segmentation.** `data-cta-goal` flipped `contact` to `form` and `data-cta-placement`
flipped `header_mobile` to `mobile_menu`, on every route, for the same button pointing at
the same destination. Both are live `vw_cta_performance` values sent in the same
`cta_click` payload by `packages/web-shared/analytics/autoCapture.ts`.
Why it matters: the site's funnel history splits at the cutover, so the before-and-after
read you take to justify the port is against a broken baseline. It reads as a drop that
never happened.
Deriving command: crawl the pre-port build and the ported build and diff the full
attribute set, not just ids:
`curl -s $URL | grep -o 'data-cta="[^"]*"[^>]*data-cta-goal="[^"]*"'`
RULE: pass `ctaContactGoal` and `ctaMobilePlacement` from your own call site with your
site's pre-port values. Playbook trap T22.

**2026-09-10, Solicitors. Fifteen of twenty-two `data-cta` ids had never fired.** The
funnel pull found only 5 live, 2 dormant, 15 never-fired, and the never-fired set included
every hero, header and homepage CTA. Three further ids fire from JS with no `data-cta`
attribute at all.
Why it matters: you cannot read a conversion lift on a surface that was never instrumented,
and the port is the cheapest moment to fix it because you are already in those files.
RULE: inventory `data-cta` against recorded events in Stage 0, not at the end. Classify
each id live / dormant / never-fired before you touch a single component.


**2026-09-11, Trade (construction-cis). `web_events.is_bot` does not inherit
`web_sessions.is_bot`, so every "post bot-gate" figure in the programme is two different
numbers.** 45 of Trade's 247 nominal sessions (18.2%) and 460 of Property's 5,089 (9.0%) are
flagged bot on the session row and clean on the event rows, all `bot_reason='ua_pattern'`.
This is not academic: the loose read manufactured an 11-click `assistant_contact` cluster on
one glossary page where all 11 sessions loaded `/contact` and none started a form, and all 11
were fingerprint-identical (desktop Chrome Windows, 1366x768, `engaged_ms=0`, self-referrer,
click 1s after load). A textbook fake leak that would have sent a phase at the wrong surface.
RULE: filter on BOTH flags, state which definition you used, and never compare a strict number
against a loose one. Medical's `_port/FUNNEL_BASELINE.md` is loose-definition and its figures
are inflated; corrected here rather than in that file, which belongs to that port.

**2026-09-11, Trade. A CTA can be invisible to the estate's analytics because of the attribute
NAME, not the absence of instrumentation.** `src/components/ui/StickyCTA.tsx:147` ships
`data-cta-id`, and `packages/web-shared/analytics/autoCapture.ts:100` matches `data-cta`. The
site's only persistent site-wide CTA has therefore never emitted a single `cta_click`, and its
dismiss control carries no id at all. It reads as a dead surface in the data when it is in fact
an unmeasured one.
RULE: in the Stage 0 CTA inventory, grep the attribute the capture code actually matches, not
the concept. An id that returns zero rows is a question, not a finding: check the spelling of
the attribute before concluding the surface is dead.

**2026-09-11, Trade. Phase 0 queried the wrong event and concluded a modal had no denominator.**
The first funnel pass reported that `deep_scroll_modal` had never fired, so the modal's value was
unmeasurable. It was querying `cta_click`, where that id is the id of the offer LINK; the modal's
open fires `personalization_shown` with `surface='deep_scroll_modal'`. Nothing needed building.
RULE: before proposing instrumentation to fix an absence, find the event the component actually
emits and query that. Caught by a sibling slice agent reading the code path, not by the data.

---

## 2. The shared kit (`packages/web-shared/design/`)

**2026-09-10. Property is NOT a consumer of the kit chrome.** `Property/web` imports
`./SiteHeader` and `./SiteFooter`, its own local copies. The kit chrome is imported by the
PORTED sites only.
Deriving command: `grep -rn "web-shared/design/chrome" --include=*.tsx . | grep import`
Why it matters: a fix justified as "the default protects Property" is reasoning about the
wrong set. The first Solicitors fix did exactly that, wired one consumer and left the other
broken. Playbook trap T23.
RULE: derive the consumer list, fix every consumer in the same commit.

**2026-09-10. The kit footer ships Property's designer credit to whatever site adopts it.**
A followed outbound link to the design studio, in their indigo/orange gradient, on every
page. Two sites shipped it without anyone deciding to.
RULE: pass `showBuilderCredit={false}` unless the studio designed your site. Audit any
adopted component for outward-facing content generally: external links, third-party assets,
brand names, `rel` attributes. Playbook trap T27.

**Standing rule for kit edits.** Additive only. Every new prop defaults to Property's exact
current behaviour. Record the prop in playbook section 8 item 11 in the SAME commit, so the
next port inherits it instead of inventing a rival with a different name. Check
`git log --oneline -5 -- packages/web-shared/` before you touch it, because another port
may have just changed it.

**Known kit gaps, do not rediscover these:**
- `design/blog/BlogCategoryHub.tsx` defaults Property's `proofPoints` and standfirst.
- `design/chrome/SiteFooter.tsx` defaults `resourcesHref` to Property's `/landlord-tax`,
  which renders an empty Resources column on any other site, and its default Company column
  includes `/book`.
- `design/marketing/ProblemStatement.tsx` and `ComparisonTable.tsx` hardcode Property's
  copy with no copy props. Mirror them locally; do not edit the kit to fix it.
- The kit drawer has no secondary-link slot.
- `design/primitives/FaqSection.tsx` is a Radix collapsible whose closed answers are NOT in
  the server HTML, and it renders answers as escaped text. See section 4.

---

## 3. Dependencies and the build

**2026-09-10, Solicitors, twice in one phase.** `tw-animate-css` and then `lucide-react`
both resolved only because sibling sites had hoisted them to the root `node_modules`. Each
built locally and would have failed on a clean install. This is the shape that made the
estate undeployable for nine days.
Deriving command: `python scripts/check_dependency_closure.py`
RULE: the closure check belongs in EVERY builder brief's acceptance tests, not only the
pre-deploy gate. A new import gets its declaration in the same commit. Playbook trap T24.

**A real build is part of verification, not an optional extra.** `tsc` and the test suite
both pass a server/client boundary error; only a production build catches it.

---

## 4. Things that differ per site, so never assume

**Check, do not inherit, the previous port's premise.** Each of these was found by an agent
told to correct the brief if its premise was false. All were correct to push back.

| Assumption from an earlier port | What was actually true |
|---|---|
| The site has a `firstSentence` excerpt helper | Solicitors has none. Every excerpt is frontmatter `summary`. Guard the real mechanism. |
| Premium calculators are routes and belong in the nav | Solicitors' 5 premium tools have NO routes. Listing them would emit 5 dead links. |
| The pound sign is stored as a unicode escape | True on generalist's location data, FALSE on Solicitors, where it is literal. Check the representation before searching for the symbol. |
| The kit's FAQ component is a safe adoption | On generalist yes; on Solicitors it would have STRIPPED answer text from 196 posts, because that site already renders answers in a plain list that IS in the server HTML, and 7 of 1,245 answers contain real HTML the kit would escape. |
| The site's own STATE.md counts are current | Solicitors' said 149 posts and 6 guides; disk had 196 and 10. Re-measure every number you use. |


**2026-09-11, Solicitors phase 2, five more of the same shape.** Every agent corrected the
brief again; the corrections changed the build each time.

| Assumption carried into the phase | What was actually true |
|---|---|
| The site has four turnaround promises, all on `/contact` | Eleven across ten files, including the homepage closing ask, both calculator result panels, the support widget and a support FAQ whose QUESTION was "How quickly will a specialist reply?" so the answer could not be de-timed in place. Sweep by rule, site-wide, before a phase touches those files. |
| The dead blog links live in `content/blog/` | Nine dead URLs over ten occurrences, and six of the seven two-segment ones were in a SOLICITOR GUIDE, not the blog. Resolve every href in `content/` against real frontmatter, not against the directory you expect. |
| `/blog` renders its category list twice | It does not. The local list component accepted `categories` and `activeCategory` and never read either, exactly like the kit copy it was extracted from. Read the component body before reporting a duplicate. |
| The local `BlogListWithSearch` must be kept because the kit copy ignores the category props | Both ignore them, and the two are feature-identical (same search, sort, pagination, read-time props). The local copy was deleted and both consumers repointed at the kit. Compare before you fork. |
| Three renderer features are load-bearing (hero image, photo credit, updated date) | All 196 posts have `image: ""`, none has `imageCredit` and none has `updatedDate`. The branches are correct and inert. Deleting the photographic hero removed nothing a reader could see. |

**The lesson under all five:** the previous port's blueprint is a starting hypothesis, not
a specification. Phase 0 re-derives.


**2026-09-11, Trade. Six more "assumed from a previous port" premises that were false here.**
Every one was caught by an agent told to contradict the brief, and every one was right.

| assumption carried in | what was actually true on Trade |
|---|---|
| `StatsCounter` SSRs a fraction of its value (generalist) | Trade renders the kit `StatsBar`, a 27-line pure server component printing a literal string. No counter, no animation, defect structurally impossible. Do not "fix" it. |
| research charts collapse the a11y subtree via `role="img"` (generalist) | Trade's 4 research pages are recharts with NO `role="img"` and NO `aria-hidden` wrapper. The defect that DOES exist is `PremiumBarChart.tsx`, byte-identical on Trade and Medical. |
| anchors site-wide lack a scroll offset (Solicitors: 428 across 80 routes) | 31 unoffset targets across 10 routes; `scroll-mt-24` is already on the research pages, `/services`, `/calculators/[slug]` and the shared blog chrome. A separate and real defect: `#main` has `scroll-margin-top: 0px` on every route. |
| the pound sign is stored as an entity or an escape (generalist) | Literal UTF-8 on this site, 112 files, zero `&pound;` and zero `\u00a3`. The representation that DOES hide money here is `ExcelPreview.tsx` writing ASCII `GBP 1,908.20` on 11 lines, invisible to any pound-sign grep. |
| premium calculators have no routes, so listing them emits dead links (Solicitors) | All 12 registry tools return 200; `BESPOKE` is genuinely empty. `PremiumCalculator` IS reachable, but only from the blog renderer, desktop-only and client-only. Tested, not assumed. |
| `ServiceTiers` is a dead component, do not scaffold it (rollout doc section 302) | The SHARED component is live on 16 sites including this one. Only PROPERTY'S LOCAL copy is dead, which is what the doc means at its line 147 and contradicts at line 302. |

RULE unchanged, now with eleven instances behind it: the previous port's blueprint is a
hypothesis. Phase 0 re-derives. An agent that never contradicts the brief is not reading it.

---

## 5. Instruments, and where they lie to you

**2026-09-10. `browser_check.mjs` cannot resolve `var()` colours.** On a site themed through
`text-[var(--primary)]` arbitrary values it reported 1,644 contrast findings, including
ratio 1.00 white-on-white, for combinations that actually measure 5.84:1 and pass. It falls
back to white when the chain does not resolve.
RULE: on a variable-themed site the contrast half of the browser baseline is unusable until
the port replaces those values with real ramp classes. The overflow and anchor halves are
sound. Hand-compute contrast instead, self-testing against slate-500 on white = 4.76 and
slate-400 on white = 2.56. Re-capture the baseline after phase 1. Playbook trap T25.

**2026-09-10. The sweep's dash count and a raw grep are different metrics.** `sweep.mjs`
counts dashes in visible body text after stripping scripts. A raw byte count of the same
page disagrees (script payloads), and a raw count of the source tree disagrees again (code
comments, which the rule exempts). On Solicitors these were 330, 11 on one page, and 393.
RULE: state which metric you mean, every time. And note the uncaught class: an em-dash in a
`metaTitle` or `metaDescription` never reaches body text but does reach users in search
results, so sweep frontmatter separately.

**2026-09-10. Default `--sample=30` measures a tenth of the corpus.** The baseline sweep
samples 30 articles unless told otherwise. A floor built from a sample cannot prove no harm
on the other 166 pages.
RULE: pass `--sample=9999` for a baseline.

**2026-09-11, Solicitors phase 2. A "before" server built from a stale worktree lies, and it
lies quietly.** Trap T22 needs the FULL `data-cta` attribute set diffed against the pre-port
page, but `link_baseline.json` stores only per-route CTA COUNTS, so the baseline alone cannot
catch a flipped placement or goal. The fix is to stand up the production SHA on a second port
and diff the rendered triples. That worked, and it also produced a false alarm: one calculator
route appeared to have newly hidden its result behind a gate. It had not. The worktree at
`C:/port-base` was serving a `.next` built before a July commit, so the component was not in
its bundle at all, and the same server still served a copy string that had been removed hours
earlier.
Deriving command, the one that settles it in a second:
`curl -s http://localhost:<preport>/<route> | grep -c "<a string you changed today>"`
A non-zero count means the "before" server is older than you think. Also compare the served
route's bundle for a symbol you know exists in the current source.
RULE: before trusting a pre-port server, prove its age with a string whose commit date you
know. A stale artefact is worse than no baseline, because it produces a confident wrong diff.
Rebuild it, or kill it so nobody quotes it.

**2026-09-11, Solicitors. `curl` without `-L` makes a component look like it never renders.**
`/blog/<slug>` 301s to the category-nested URL and returns a 62-byte body. A reviewer checking
"does the table of contents render" against that body concludes it does not.
RULE: `curl -L` on any route family that carries a redirect, and check the byte count before
you conclude anything from an empty grep.

**2026-09-11, Solicitors. Check the VALUE, not the presence of the key.** A phase-0 pass
reported that 181 of 196 posts carry BOTH a `schema` and a `faqs` frontmatter block, and
concluded the renderer's `post.schema?.trim() ||` bypass fired on 181 pages and that the
nested `FAQPage` was dead code. Every one of those 181 values is the EMPTY STRING
(`127 schema: ""`, `54 schema: ''`), so the bypass never fires and the schema is live on all
196. Acting on the first reading would have emitted a SECOND `FAQPage` on every post.
Deriving command:
`grep -h '^schema:' content/blog/*.md | grep -vE '^schema: *(""|'"''"'| *)$' | wc -l` -> 0
RULE: `grep -l 'key:'` proves a key exists, never that it holds anything. Print the values.

**THE BIG ONE, three times in one session: the instrument measured the wrong site.**
`next start` failed to bind because another session held the port, the error went to a log
nobody read, and the sweep crawled whatever WAS on that port and wrote a baseline from it.
Twice it was Medical, once generalist. Caught only by asserting the served page title.
RULE: read the bound port out of the server log and assert the title before trusting any
crawl. Playbook section 13.


**2026-09-11, Trade. T25 does NOT reproduce everywhere: `browser_check.mjs` resolved every
colour on this site.** 0 unparseable colours, self-test OK, and it independently reproduced the
hand-computed figures: 2.89 for the rendered button against a hand-computed 2.80 for the orange
ground, 2.80 for the orange tick, 3.58 and 3.43 for article links, 2.47 against a hand-computed
2.42 for the footer fine print. Trade themes through named Tailwind utilities and `oklch()`
literals rather than `text-[var(--x)]` arbitrary values, which is the case the instrument
actually chokes on.
RULE: T25 is conditional on HOW a site is themed, not on whether it uses variables. Run the
instrument, read its self-test line and its `unparseable colour(s)` count, and decide from those
two numbers. Two independent methods agreeing is worth far more than either alone, and it is
cheap: hand-compute the handful of load-bearing ratios anyway and use the agreement as the check.

**2026-09-11, Trade. Git Bash silently turned the instruments' route arguments into Windows
paths.** `node browser_check.mjs ... / /contact` ran against `C:/Program Files/Git/` and
`C:/Program Files/Git/contact`, producing `Protocol error (Page.navigate): Cannot navigate to
invalid URL` on every route and then `INSTRUMENT SELF-TEST FAILED: null`, which looks exactly
like a broken instrument rather than a mangled argument. MSYS path conversion rewrites any
argument that starts with `/`.
RULE: on Windows, prefix the command with `MSYS_NO_PATHCONV=1` and quote routes as `"//"` and
`"//contact"`. And read a self-test failure of `null` as "the instrument never got to run",
not as "the maths is wrong".

**2026-09-11, Trade. The sweep's dash count includes EN-dashes, so the acceptance target is not
always zero.** `sweep.mjs:72` matches em AND en dashes. Trade's 36 are 34 em plus 2 en, and both
en-dashes are legitimate numeric ranges in money figures that the site's own defect catalogue
protects. A builder told to "get the dash count to 0" would have corrupted two correct figures.
RULE: when you hand a builder a dash target, derive it from the protected set, state the target
as a number with its justification, and name which of the four metrics you mean: raw source,
user-facing source, rendered body, or sweep. On Trade those were 39, 35, 34 and 36.

**2026-09-11, Trade. A baseline without `--sha` is refused, and it tells you so.** `sweep.mjs`
prints `WARNING: no --sha given. Section 4.7 requires the baseline to embed the production SHA
and its deriving command; a baseline without them is invalid for link-floor purposes` and still
writes the file.
RULE: pass `--sha=<production sha>`. The warning is easy to scroll past, and the artefact it
leaves behind looks complete.

---

## 6. What the ports keep finding that is not design work

Every port so far has spent roughly a third of its time on live defects nobody knew about.
Budget for it; do not treat it as scope creep, and record each one in the site's STATE.md
rather than quietly fixing it.

Recurring shapes, worth checking early on any site:

- **Our own pricing published**, against the standing rule. Solicitors had it in ~15 places
  including one fed to the homepage from a shared config file, invisible in the page source.
  Generalist had a cost band in a guide. Search by RULE, never by the pound symbol.
- **Unsourced statistics** presented as fact, absent from `house_positions.md`. Solicitors
  had two. One verified at source and was kept with a correction; the site had been
  publishing it without its denominator, which changed what it meant.
- **Turnaround promises** in capture copy, also banned. Solicitors had four on `/contact`,
  including in the metadata.
- **Compliance copy describing a different site.** Check every sentence against code that
  actually runs. Generalist named Google Analytics cookies on a site with no GA; Solicitors
  genuinely runs GA, so the SAME mirror operation has the opposite correct answer.
- **Dead internal links.** Solicitors had 10, plus a hub linked from 8 pages that had no
  route at all. Fix at the link or the target, never by deleting the link.
- **Accessibility defects that hide data**, such as a chart wrapper marked `aria-hidden` or
  `role="img"`, which removes every value from the accessibility tree.
- **Anchor targets with no scroll offset**, so every in-page jump hides its own heading
  under the sticky header. Solicitors: all 428 targets across 80 routes.


**2026-09-11, Trade. Two new recurring shapes, both found in Phase 0 and neither one design work.**

*A responsive breakpoint mismatch that makes navigation unreachable.* `SiteHeader.tsx:105` hides
the burger at `lg:hidden` while `:118` hides the drawer it opens at `md:hidden`. Between 768px and
1023px the burger renders and does nothing, so the site has no navigation at all on a tablet or a
large phone in landscape. Verified against the rendered DOM, not inferred.
RULE: diff the burger's breakpoint against its drawer's, and against the nav's and the primary
CTA's, as a single check. The header contract puts all four at `lg:` for exactly this reason, and
a one-token drift is invisible in source review and silent in every test.

*A paginated index that is not in the server HTML.* `/blog` carries 12 of 82 articles in its
rendered HTML because the list slices behind button pagination. This site's blog is 54% of its
traffic, so the highest-value family is 85% uncrawlable from its own index. Derive it with
`curl -s <base>/blog | grep -oE 'href="/blog/[a-z-]+/[a-z0-9-]+"' | sort -u | wc -l` against the
file count on disk.
RULE: for every index and hub, compare the count of article hrefs in SERVER HTML against the
corpus count. The link floor does not catch this, because the floor was captured from the same
broken page.

*And one correction to this section's own pricing guidance.* The rollout doc warns that Trade has
"128 amber/orange-6xx/7xx usages across 46 files; a reassignment is a sweep, price it." Re-measured
at 138 usages across 48 files, and on a broader regex including hex literals, 385 across 63. But
the count was measuring the BRAND doing brand work. Usages carrying genuine warning semantics:
ONE file, three lines. The ladder is net-new, and the sweep is nearly free.
RULE: when pricing a semantic-ramp reassignment, split the usage list into semantics, brand
furniture and exempt surfaces BEFORE quoting a cost. A raw colour-family count prices the wrong
thing by an order of magnitude, in both directions.

---

## 7. Conversion evidence, for the sites that have not measured it yet

Solicitors, 18 days post bot-gate, against Property on the same window: 1.16 leads per
1,000 sessions against 9.85, an 8.5x gap. The leak was NOT traffic and NOT form starts
alone; it was start-to-complete, 4.5% against 17.8%. Blog articles produced 40 form starts
and zero completions.

RULE: pull the funnel per template family in Stage 0, post bot-gate only (the gate landed
2026-08-23 and figures spanning it are inflated). It tells you which phase of the port
actually matters for that site, and it is the number the owner will judge the port by.


**2026-09-11, Trade (construction-cis), 19 days post bot-gate, strict both-flags-clean.** 203
sessions, 3 leads in the site's ENTIRE history, first on 2026-08-17. 4.93 leads per 1,000 sessions
against Property's 10.80 in the same window. The leak is one stage earlier than Solicitors':
sessions to form-START, 0.99% against Property's 6.16%, a 6.2x gap. Start-to-complete is
unreadable at n=2, and quoting its nominal 50% would have been meaningless.

| family | sessions | form starts | completions |
|---|---:|---:|---:|
| blog article | 110 | 1 | **0** |
| CIS template pages | 27 | 0 | 0 |
| trade pages `/for/[slug]` (45 pages) | 24 | 0 | 0 |
| homepage | **4** | 0 | 0 |
| the three service pillars combined | **1** | 0 | 0 |

Two lessons worth more than the numbers.

*The homepage is not automatically the big phase.* The programme's phase map calls phase 5
(homepage, a 15-16 section rebuild) "the big one". On this site the homepage drew 4 sessions in 19
days and the three pillars drew 1 between them, while the blog drew 110. The rebuild still happens,
because the standard requires it and it is the brand's front door, but sizing review effort by the
phase map rather than by the site's own traffic would have spent the most expensive review on the
least-read page.
RULE: pull the per-family funnel in Phase 0 and let it set review depth and sequence within the
phase map, not the phase map's own ordering.

*"No capture on this family" is usually false, and the real defect is worse.* Phase 0 reported that
the template pages and the 45 trade pages had no ask at all. Both were wrong: `/cis-invoice-template`
carries a full `LeadForm`, and so does the `/for/[slug]` template. The actual defect is that both
hero CTAs leave the page, there is no `#book` anchor to scroll to, and the form sits below the FAQ.
That is one template edit, not new capture on 46 pages.
RULE: before concluding a family has no capture surface, grep the template for the form component
and curl one rendered page. Then ask the better question, which is whether anything on the page
points AT the form.
