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

**2026-09-11, Trade. A CTA COUNT cannot detect trap 22, so there is now an instrument that records
the triple.** `docs/_engines/instruments/cta_snapshot.mjs`, new this session. Trap 22 flips
`data-cta-goal` and `data-cta-placement` for the same button and the same destination, so the count
is identical before and after and `sweep_baseline.json`'s CTA count proves nothing. What splits the
live funnel at cutover, and reads as a drop that never happened, is the triple. The instrument
records `(id, placement, goal, href)` per route, asserts the served page title before measuring
anything (section 5), and also picks up `data-cta-id`, the misspelling that exists in the wild.
On Trade: 5 distinct triples over 246 routes and 620 tags
(`docs/construction-cis/_port/cta_baseline.json`, `distinct_triples`), and the identical set
re-derived after the chrome rewrite, which is how trap 22 was cleared by measurement rather than by
assumption.
RULE: snapshot the triples BEFORE the first chrome commit; diff after every phase touching chrome or
CTAs. Also worth recording: the source declares 16 `data-cta` ids
(`grep -rohE 'data-cta="[a-z0-9_]+"' <site>/web/src | sort -u | wc -l`) and only 5 render, because
several sit in config branches this site does not use. A guard pinning only the rendered set leaves
11 unprotected.
PROMOTED: folded into playbook trap T22. Kept here for the instrument and the Trade numbers.

**2026-09-11, Medical phase 3. Renaming an analytics dimension HALFWAY is worse than not
renaming it.** The `data-cta-placement` values in the blog subsystem were made consistent on
`/blog` only, which left all eight category hubs emitting a bare `hero`. That is the value the
HOMEPAGE already emits on a live series, so hub clicks would have merged into the homepage's
series with no way to separate them afterwards. Caught in review, before any commit shipped.
Deriving command: `git diff -U0 | grep -E '^[+-].*data-cta-placement'`, then compare the value
set against what other route families already emit.
RULE: rename every surface in one pass, or none. A net-new series is free to rename before its
first click and impossible after.

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
~~RULE: pass `showBuilderCredit={false}` unless the studio designed your site.~~
**CORRECTED 2026-09-11, owner decision (commit `6966c1f1`): the credit is wanted estate-wide,
on every ported site. Pass `true`, which is also the kit default.** The rest of the entry
stands. RULE: audit any adopted component for outward-facing content generally: external
links, third-party assets, brand names, `rel` attributes. Playbook trap T27.

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
- `design/blog/HubArticleList.tsx:85` hardcodes Property's NESTED blog href
  (``/blog/${post.categorySlug ?? categorySlug}/${post.slug}``), and `BlogCategoryHub` mounts
  it internally with no override, no render slot and no opt-out. `BlogListWithSearch` has the
  same href and additionally `slice()`s off-page cards out of the server HTML.

**2026-09-11, Medical phase 3. The kit's BLOG components are unusable on a FLAT-URL site, and
the failure mode is a dead link on every hub.** On Medical `/blog/<category>/<slug>` returns
404 and `/blog/<slug>` returns 200, so adopting `BlogCategoryHub` as the disposition instructed
would have published every hub article link dead. Three agents hit it independently. Medical
mirrors the kit markup locally with flat hrefs; the cost is eight similar hub layouts instead of
eight data files, and no pagination control on the hubs.
**CORRECTED IN PLACE 2026-09-11.** This entry previously said "and `construction-cis`, the
estate's other flat site, had already reached the same conclusion and points its shared
crawl-path guard at its own local list". **`construction-cis` is NOT flat. Its blog is NESTED,
the same shape as Property's, so it is not a second data point for this lesson and never was.**
Evidence: the route directory is `construction-cis/web/src/app/blog/[category]/[slug]/` (there is
no `src/app/blog/[slug]/`); `construction-cis/web/src/app/blog/page.tsx:63` builds
`` `${siteConfig.url}/blog/${p.categorySlug}/${p.slug}` ``; and
`docs/_engines/instruments/sweep.mjs:61` defaults `--article-depth=3` with the comment naming
Medical as the flat exception. Confirmed live against the Trade production server on :3167:
`/blog/expenses/allowable-expenses-cis-subcontractor` returns **200**,
`/blog/allowable-expenses-cis-subcontractor` returns **404** — exactly the inverse of Medical.
Medical remains the estate's ONLY flat site, and the lesson below is unchanged: the kit blog
components hardcode Property's nested href and Medical had to mirror them locally.
Deriving command: `grep -n "href={\`/blog" packages/web-shared/design/blog/*.tsx`, then
`curl -s -o /dev/null -w "%{http_code}" <base>/blog/<category>/<slug>`.
RULE: before adopting any kit component that BUILDS a URL, check whether it builds YOUR site's
URL shape. The additive fix, deferred not dropped, is an `href`/`hrefFor` override prop on
`HubArticleList`; the first flat site that needs pagination should add it rather than fork
again.

---

## 3. Dependencies and the build

**2026-09-10, Solicitors, twice in one phase.** `tw-animate-css` and then `lucide-react`
both resolved only because sibling sites had hoisted them to the root `node_modules`. Each
built locally and would have failed on a clean install. This is the shape that made the
estate undeployable for nine days.
Deriving command: `python scripts/check_dependency_closure.py`
RULE: the closure check belongs in EVERY builder brief's acceptance tests, not only the
pre-deploy gate. A new import gets its declaration in the same commit. Playbook trap T24.

**2026-09-11, Solicitors phase 4. TWO ROUTES CAN CLAIM ONE URL, and the build is a coin
toss.** `/calculators/law-firm-sale-cgt` has a bespoke page AND was still emitted by the
generic `[slug]` route's `generateStaticParams`, because its config is `kind: "generic"`. Both
prerender to the SAME file, `.next/server/app/calculators/law-firm-sale-cgt.html`, and
whichever renders last wins. The generic render has no `dataCta`, so the page silently lost
`data-cta="see_result"`, a LIVE id with 73 recorded events, while the bespoke source was
correct all along.
Why it is nasty: it is NON-DETERMINISTIC. One build showed the bespoke render with the id
present, the next showed the generic one without it, with no source change in between, which
sent me hunting a stale cache that was not the cause. Its baseline floor was 3 and the page
still emitted 3, so every per-route gate stayed green. It surfaced ONLY as a one-unit drop in
the sweep's TOTAL data-cta count.
Deriving commands, in order:
`grep -c "<a section only the bespoke page has>" .next/server/app/<route>.html` -> 0 means the
generic route won.
`grep -n "kind:" src/lib/tools/configs/<slug>.ts` -> `generic` while a static page exists.
RULE: any site with BOTH a `[slug]` catch-all and static sibling pages must exclude the static
slugs from `generateStaticParams`, and needs a guard test asserting it. Solicitors now has
`src/tests/calculator-route-collision.test.ts`, which also asserts the exclusion list equals
the on-disk directories, so the next bespoke page cannot reintroduce it.
COROLLARY for the CTA gate: a per-route floor cannot see this class at all. Diff the TOTAL as
well as the per-route counts, and when the total moves, find the route before moving on.

**2026-09-11, Solicitors phase 4. A NEWER BUILD_ID does not mean a fresh artefact: Next's
incremental cache served a stale prerender.** Playbook trap T2 says to check `BUILD_ID` mtime
against the newest source file before trusting a build. That check PASSED here and the build
was still wrong: `/calculators/law-firm-sale-cgt` rendered the generic gate wording and had
LOST `data-cta="see_result"`, a live id with 73 recorded events, even though the source passed
its own label and id correctly. It looked exactly like a builder regression and was not.
How it surfaced: the sweep's total `data-cta` count fell by one while NO route fell below its
baseline, so the gate stayed green. Diffing my own two sweep runs found the single route.
Deriving command, which is the point of the note:
`grep -o "<a string you changed in this build>" .next/server/app/<route>.html`
`rm -rf .next/cache && npx next build` then re-grep; the string appeared.
RULE: T2's mtime check is necessary and NOT sufficient. Prove the ARTEFACT contains a string
you changed in this build, not merely that the build is younger than the source. When a
rendered page contradicts source you have just read, suspect the cache before the builder.

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

**2026-09-12, retrospective. The briefs were wrong, and arguing back is the only thing that
caught it. Keep the clause verbatim.** Every agent given "verify against source; if this
brief is wrong, say so and trust the source" found a real error in its brief. Instances from
the last five ports, on top of the eleven above: three defects an agent was sent to fix were
already fixed; two CTA attributes it was told to remove had already been removed; a guide it
was told to leave alone was carrying the banned figure; a plan said a phase owed work that
phase had already done; and Property's own `WhatToExpectCard` would have published a fee line
nobody authored, straight out of its default props.
RULE: paste the clause into every prompt verbatim (playbook §10.1) and say why it is there.
Reward the pushback. And note the shape of the last one: **copy Property's ANSWER, not its
DEFECTS.** Property is the living worked example and the default, but it is evidently wrong
in places, `FaqSection` (Radix, no `forceMount`, closed answers absent from server HTML while
the JSON-LD still asserts them) and `NumberedReasons` (animates off keyframe classes its
siblings lack) alongside that card. Deviate in writing; never fix Property to do it (trap 12).

**2026-09-12, retrospective. Sweeping by the LIST instead of the RULE under-counted every
single time.** The solicitors audit: a defect listed at 4 places was in 13, one listed at 3
was in 9, one listed at 6 was in 10. A construction-cis turnaround class was formally declared
closed at 23 instances across 19 files; the 24th was live in location `intro` strings that
three prior sweeps had never looked at. And on solicitors the compute library held the
flat-rate figure CORRECTLY, guarded by two invariant tests, while eight prose surfaces
published it inverted, which is precisely why nobody caught it.
RULE: sweep by rule, over the whole site, including frontmatter (`faqs`, `keyTakeaways`,
`metaTitle`, `metaDescription`, `summary`) and `schema:` JSON-LD strings; search the
ARITHMETIC and the CONCEPT, not only the string; check the VALUE, not the presence of a key;
and never take a guarded library value as evidence about the prose. Playbook T6, amended.


**2026-09-11, Medical. The biggest find of that port, and it is a site-level CSS hazard the
kit chrome silently assumes away: an UNLAYERED element rule beats every Tailwind utility.**
`Medical/web/src/app/globals.css` carried `a { color: var(--navy) }` outside any CSS layer.
Tailwind v4 emits every utility into a layer, and an unlayered rule wins over a layered one
whatever the specificity, so that one declaration beat `text-slate-300`, `text-white` and
every other colour utility on every `<a>` on the site. Two visible consequences: the footer's
navy-on-navy links at ratio 1.00, which had been mis-filed for a phase as a footer defect,
and the header's primary CTA label painted navy on the copper ground at 3.49. Moving the
block inside `@layer base` fixed both. **Property carries no bare `a` rule at all, which is
exactly why the kit chrome is written assuming the utility wins.**
Deriving command, run it in Phase 0 on any site — **CORRECTED 2026-09-13, see the
2026-09-13 contractors-ir35 entry below; the command and the claim that follows it were
both wrong and were believed for two phases**:
~~`grep -nE "^[a-zA-Z][^{]*\{" <site>/web/src/app/globals.css` lists every unlayered element
rule. Unlayered CLASS rules (Medical has `.hero-brand`) carry the same hazard and that regex
does catch them.~~ FALSE: `^[a-zA-Z]` requires a letter in column 1 and cannot match `.`, so
it CANNOT catch a class rule. Use the brace-depth walk in the 2026-09-13 entry instead.
Also worth knowing: the hazard is not only colour. Medical's unlayered
`input, textarea, select` sets `border-radius: 8px`, so it silently beats the radius system
the token phase had just shipped.
RULE: audit `globals.css` for unlayered rules BEFORE blaming a ported component for a
contrast or radius defect, and before patching the component. The fix is one `@layer base`
wrapper, and patching the symptom leaves every other `<a>` on the site still wrong.

**2026-09-11, Medical. Fixing that layer bug UNCOVERS defects it was hiding, including a
legal one.** The consent notice's "Privacy Policy" link in the shared
`packages/web-shared/leads/MiniCapture.tsx`, i.e. the required data-sharing disclosure, had
been readable only because the bug forced it navy. With the bug gone it rendered the brand
copper `#b87333` at 3.79 on white, under the 4.5 floor, on 98 of 138 routes. The featured
tier CTA in the shared `ServiceTiers`, the site's primary conversion button, went from
navy-on-copper to white-on-copper at the same 3.79. Neither was caught by an instrument;
three adversarial reviews caught them.
RULE: after removing a global colour override, re-measure every surface that was inheriting
it, shared kit components first. And the general rule both fixes encode: **a mid-tone brand
hex can clear the 3:1 graphics floor and fail the 4.5:1 text floor, so one brand token
cannot serve graphic, text-on-white and ground-under-white-text roles at once.** Medical
mints `--brand-primary-text` and `--brand-primary-ground` for the other two roles; see
playbook section 8 item 11.

**2026-09-11, Medical phase 3. The second half of the same lesson: a base element rule also
beats an INHERITED value.** Phase 2 moved Medical's bare `a { color: var(--navy) }` into
`@layer base`, which is correct and fixed the footer. Phase 3 then found that an anchor with no
colour utility of its own still renders navy no matter what colour its parent sets, because a
base element rule is still a declaration and inheritance is not. That put the `/blog` hero
breadcrumb at ratio 1.04, navy on navy, on a component that looked correct in source because the
parent was `text-white`.
Deriving command, unchanged from the phase-2 entry — **now corrected, see below**.
RULE: fix it at the COMPONENT. Give the link its own colour class per variant and never rely on
inheritance to colour an anchor. Layering the rule makes utilities win; it does not make
inheritance win.

**2026-09-13, contractors-ir35 (F11). The deriving command above is wrong, and it is why the
phase-0 audit for this site reported 3 unlayered rules when there were 26.**
`grep -nE "^[a-zA-Z][^{]*\{"` requires the first character to be a letter, so it cannot match a
class selector (`.eyebrow`, `.prose-blog`, …) — it was never able to answer the question it was
being used to answer. A stricter pattern, `^[a-zA-Z.#\[][^{]*\{`, is still not good enough: it
still reads only the last line of a multi-line selector list (so `.prose-blog ul,` /
`.prose-blog ol {` is seen as one rule named `.prose-blog ol`), it misses selectors starting
`*` or `:` (`*, *::before, *::after` and `:where(...)` are both invisible to it), and — the
actual defect — it has no concept of `@layer` boundaries, which is the real question being
asked. `.prose-blog a` was beating `text-white` on the ToolIsland CTA across all 62 blog posts
at ratio 1.38, and `.eyebrow` was beating `text-cyan-400` on `/about` and `/contact` at 3.35.
Full method and inventory: `docs/contractors-ir35/_port/F10_UNLAYERED_SWEEP.md` §1.
**Correct method, replaces the grep above:** a brace-depth walk that strips comments and, for
every rule found, reports the stack of enclosing `@layer` blocks — the answer is `[]`
(unlayered) or a layer name, never a guess. **SUPERSEDED 2026-09-13: the line-based version
below finds nothing in a built (one-line) stylesheet and breaks on a BOM. Use the character-stream
`utf-8-sig` version in DESIGN_PORT_PLAYBOOK.md §15 (T30 correction), and see section 12.**
```
python - <<'PY'
import re
s=open('src/app/globals.css',encoding='utf8').read()
s=re.sub(r'/\*.*?\*/',lambda m:''.join(c if c=='\n' else ' ' for c in m.group()),s,flags=re.S)
lines=s.split('\n'); stack=[]
for i,l in enumerate(lines,1):
    for j,ch in enumerate(l):
        if ch=='{':
            k=i-2; pre=[]
            while k>=0 and lines[k].strip().endswith(','): pre.insert(0,lines[k].strip()); k-=1
            sel=(' '.join(pre)+' '+l[:j].strip()).strip()
            lay=[x for x in stack if x.startswith('@layer')]
            if not sel.startswith(('@layer','@media','@theme','@keyframes')) and sel!=':root':
                print(f"{i:>5}  {lay[0] if lay else '*** UNLAYERED ***':<18} {sel[:70]}")
            stack.append(sel)
        elif ch=='}':
            stack and stack.pop()
PY
```
**ESTATE-WIDE: every site previously audited with the old `grep -nE "^[a-zA-Z][^{]*\{"` or its
`^[a-zA-Z.#\[]` variant (Medical, Property, Trade/construction-cis, Generalist, Solicitors,
Dentists — every port that used the phase-0 command above) has the same undercount and should
be re-swept with the brace-depth walk before being called clean.

**2026-09-11, Medical phase 3. Two viewport clamps in one column is worse than either alone, and
both wrong answers look right in source.** The article sidebar holds a CTA card and a table of
contents. Nest a sticky max-height wrapper around a component that already clamps itself and you
get a scroll box inside a shorter scroll box, two scrollbars, and the inner `sticky` sticking to
the wrapper rather than to the viewport. Remove the OUTER clamp instead and the sticky element's
containing block becomes a short static div, so it sticks for a couple of hundred pixels and
scrolls away: measured at 1440x900 on a 24,594px article, 440px of the contents list sat below
the fold with nothing able to scroll to it. The arrangement that works is ONE clamp, on the
element that is a direct child of the tall column, with the inner component's own clamp switched
off (Medical passes `stickyDesktop={false}`).
Deriving method: scroll 6,000px, then read the sticky element's `getBoundingClientRect()` and
count scroll containers in the column. Medical's passing read is top 96, bottom 884 in a 900px
viewport, one scroll container.
RULE: measure the sticky element's bounding rect after scrolling. Reading the classes proves
nothing here, because both broken arrangements read as correct.

**2026-09-11, Trade. Third instance of the unlayered-beats-utility trap in one file, and the first
fix made it worse.** `construction-cis/web/src/app/globals.css:209-225` carries the whole incident in
its comment. `.eyebrow` was declared unlayered, so its `color` silently beat `text-orange-400` on its
own consumers (`/about` and `/contact`, both `className="eyebrow text-orange-400"` on
`bg-neutral-900`), which had correctly chosen the on-dark step. A first fix pass recoloured the
unlayered rule toward the light-ground reading, which fixes the one white consumer and regresses both
dark ones. The correct fix was to move the rule into `@layer components` so a consumer utility wins:
`#fb923c` on `#262626` = 6.69, and the light-ground consumer passes on the default at 5.18. Instance
two is the heading `line-height` rule in the same file, deliberately unlayered on the same mechanism
and documented as such.
RULE: before changing a colour on a shared class, enumerate its consumers and check what ground each
sits on AND whether any already declares its own utility. A class whose consumers disagree about
ground needs a layer, not a different hex. And the blast radius of moving a rule into a layer is
every utility it was beating, not the one you meant: list what is inside the block afterwards with
`awk '/^@layer components/,/^}$/' <file> | grep -E '^\s+\.'` (on Trade, exactly one selector).
PROMOTED: now playbook trap T30. Kept here for the three instances and the first-fix regression.

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

**2026-09-11, Medical. The committed instruments live at `docs/_engines/instruments/`, NOT in
`scripts/`, and a builder who cannot find them will write their own.** That is what happened:
a private crawler produced 5,786 links and a 122/52 dash pair against the committed
instrument's 5,234 and 59, and those numbers went into a phase report nobody could reproduce.
A reviewer caught it.
Deriving command: `ls docs/_engines/instruments/` (`sweep.mjs`, `browser_check.mjs`).
RULE: use the committed instrument, pass your own `--out` so you do not clobber a sibling
port's artefact, and never report a link, CTA or dash number from a hand-rolled crawler. If
an instrument seems to be missing, look in `docs/_engines/` before writing one.

**2026-09-11, Medical. Confirmation of the Trade MSYS finding, on a second site and a second
instrument.** Under git-bash on Windows, any argument beginning with `/` is rewritten into a
Windows path, so `browser_check.mjs / /services` silently crawls `C:/Program Files/Git/` and
`C:/Program Files/Git/services` and fails every navigation.
RULE unchanged and now twice-observed: prefix with `MSYS_NO_PATHCONV=1`.

**2026-09-11, Medical. A backgrounded `next start` can bind the port while the harness reports
the command as FAILED.** A later start then fails with EADDRINUSE against your own orphan,
which reads as another port's server holding the port.
Deriving and clearing commands: `netstat -ano | grep ":<PORT> "` for the PID, then
`taskkill //PID <pid> //F`, then re-check the port is free BEFORE starting again.
RULE: a failed-looking start is not proof that nothing is listening. Check the port, not the
exit code. This sits alongside the `pkill -f` note: on Windows neither the harness's exit
status nor `pkill` tells you the truth about a `next start`.

**2026-09-11, Medical. A contrast instrument that cannot resolve `oklch()` reports garbage,
and the committed one tells you whether it can.** It self-tests and prints the result
(slate-500 on white 4.76, slate-400 on white 2.56).
RULE: read the self-test line before quoting any ratio. If you write any colour check
yourself, convert by drawing the colour on a canvas and reading the pixel back, and self-test
against those two known values.

**2026-09-11, Medical. Never re-edit a `niche.config.json` by parsing and re-dumping the
JSON.** A round-trip rewrites every escaped character in the file: a pound sign stored as
`\u00c2\u00a3` comes back as mojibake, and a 36-line deletion showed up in the diff as 77
insertions and 55 deletions, which is unreviewable and hides whatever else changed.
RULE: edit the lines in place. The same applies to any hand-authored JSON in this repo.

**2026-09-11, Trade. Every DESIGN_DELTA in this programme computes contrast from Tailwind v3 hex
constants, and Tailwind v4 does not emit those colours.** v4 ships its ramps as `oklch()`
(`node_modules/tailwindcss/theme.css:26-29`), which resolves to materially different sRGB:
`orange-400` renders `#ff8904` not `#fb923c`, 69 summed RGB units of drift, and 500 and 600 drift 38
each. Across Trade's 17 binding contrast rows, 10 drifted, by at most 0.38, and **no verdict
changed**: every pass stayed a pass, every fail stayed a fail
(`docs/construction-cis/DESIGN_DELTA.md:136-151`). A precision problem, not a decision problem, but
that table is what five later phases measure against.
The sharp half: **a ramp UTILITY and a CSS custom property do not render the same colour.**
`bg-orange-500` renders the oklch value (`#ff6900`, 2.89 on white); `--accent: #f97316` renders the
literal hex (2.80). That is what reconciled an apparent disagreement between two instruments on this
port, where the hand computation said 2.80 and `browser_check.mjs` said 2.89 and both were right
about different subjects. Trade's pre-port button was the utility
(`git show HEAD~1:construction-cis/web/src/components/ui/layout-utils.ts`, `btnPrimary`,
`bg-orange-500`); the ported button is `bg-[var(--btn-ground)]`.
RULE: label every contrast row by SOURCE, utility or token. Measure a utility from the rendered DOM
or by converting the emitted `oklch()`, never from a v3 hex table, and self-test any converter
against a canvas read out of the running build.
PROMOTED: now playbook trap T28. Kept here for the drift figures and the two-instrument reconciliation.

**2026-09-11, Trade. A long `browser_check.mjs` run looks dead while it is working, and concluding
it died costs you the baseline.** It shows no browser process between page batches and buffers its
log, so one `ps` sample plus an empty log tail reads as a corpse. The manager read it that way,
started a second run, and two concurrent runs write the same `--baseline` path, which is the
collision the instrument's own docstring warns about (`browser_check.mjs:56`, `:91`, `:497`).
RULE: check for the OUTPUT FILE, not the process, and never start a second `--save-baseline` run.
Pass your own `--out` and `--baseline`.

**2026-09-11, Trade. Traps are numbered in the PLAYBOOK, and the rollout doc has a rival numbering
that does not mean the same thing.** A re-review reported "trap 27 does not exist" after checking
`PROPERTY_STANDARD_ROLLOUT.md`, whose section 7 carries its OWN incident list numbered 1 to 15. T27
is real and lives at `docs/_engines/DESIGN_PORT_PLAYBOOK.md:738`.
RULE: "T<n>" means the playbook, section 6 (T1-T21) and section 14 (T22-T27). Cite it with a line
number; an absence in the rollout doc proves nothing.
`grep -nE '^\*\*T[0-9]+\.' docs/_engines/DESIGN_PORT_PLAYBOOK.md` lists every one.

**2026-09-11, Medical phase 3. The instrument can be the thing that is wrong. Twice in one
phase.** A brief told a builder to count nested blog URLs with `grep -c '/.*/.*'`, which matches
flat hrefs too and therefore reported "everything is nested"; the builder re-derived it correctly
and got zero. Separately, the committed sweep counts `data-cta` OCCURRENCES per route and
compares with `<` only, so it cannot see an id, a placement or a goal whose VALUE changed, nor a
swap of one id for another.
Deriving command that closes the second one: `git diff -U0 | grep -E '^[+-].*data-cta'`.
RULE: a number that confirms the brief is the one to re-derive by a second method. And never let
"0 data-cta regressions" stand as proof of attribute continuity; it is a count, not a diff.

**2026-09-11, Medical phase 3. A guard test that checks the DATA and not the WIRING guards the
wrong half.** `src/tests/blog-cta.test.ts` proved `CTA_BY_CATEGORY` had all eight keys and no
orphans. It asserted nothing about consumption, so if the renderer stopped calling
`blogCtaFor()` every article would have fallen back to generic copy with every test still green,
which is exactly the Property incident the test was written for.
RULE: a guard test for a lookup table must assert at SOURCE level that each consumer imports and
calls the accessor. Derive the consumer list from the map itself, so a ninth category is covered
automatically rather than needing the test edited.

**2026-09-11, Trade phases 3 and 4. A guard that reads one file while the defect lives in
another.** `src/tests/design/penalty-figures.test.ts` was written in Phase 3 specifically to stop
two wrong tax figures coming back. It pinned a single data file. It stayed green while the same
figures shipped on 45 pages from a different file (`src/data/trade-types.ts`, which renders every
`/for/[slug]` route). The test was not wrong about its file; it was wrong about its corpus.
Deriving command: `git log -1 --format=%B 72fe3261`, and the rewritten guard is the file itself,
which now enumerates every `.ts`/`.tsx` under `src/` except tests, every `.md` under `content/`,
plus `niche.config.json`.
RULE: a guard against a CONTENT rule enumerates its corpus PROGRAMMATICALLY, never from a path
list, so a new page or data file is covered the day it is added. And it carries a
guards-the-guard assertion (`penalty-figures.test.ts:133-138`: corpus length, plus four known
strings that must be found) so a broken walk fails loudly instead of passing empty. An empty
corpus passes every assertion in the file.
PROMOTED: now playbook trap T33. Kept here for the 45-page corpus miss that exposed it.

**2026-09-11, Trade phases 3 and 4. A guard whose verdict depends on prose layout.** The same
guard windowed each match with a fixed +/-110 character pad. An identical wrong clause therefore
PASSED when its qualifying sentence happened to fall within 110 characters and FAILED when an
editor pushed it beyond. Two pages with the same defect got opposite verdicts, and neither verdict
was about the defect. File:line: `penalty-figures.test.ts:20-24` documents it; `sentenceAt()` at
`:71` is the replacement.
RULE: window a text guard to the containing SENTENCE or BLOCK, never to a character count. Split
on sentence and block boundaries and treat a match that straddles one as no match.

**2026-09-11, Trade phase 3. An acceptance test that is unsatisfiable on arrival gets quietly
substituted.** Every Phase 3 work package carried the acceptance line `totalDashes == 2`
(`docs/construction-cis/_port/PHASE3_PLAN.md:241`). All 36 dashes on the site sat on 6 calculator
pages, and the same plan scopes Phase 3 to `/for`, `/locations`, `/glossary` and `/resources` and
names the calculators as Phase 4's. No Phase 3 package could move the number. In practice it was
replaced with a no-regression assertion, silently, and the real move to 2 happened in Phase 4.
RULE: derive every acceptance number from the phase's OWN scope before you write it down. If the
phase cannot satisfy it, the number belongs to a different phase. A substituted acceptance test is
worse than a missing one, because the plan still reads as though it was met.
PROMOTED: now playbook trap T35. Kept here for the red-on-arrival-by-34 arithmetic.

**2026-09-11, Trade. "The instrument was blind" is an attractive explanation, and it was wrong.**
Three Trade records asserted that `_port/browser_baseline.json` (11:31) was invalid on CONTRAST
because `browser_check.mjs` was oklch-blind at the time, so oklch elements were absent rather than
recorded, and that a review had read that absence as evidence and reported 16 routes with "NEW
problems" that were only newly visible. A re-capture at 19:55 disproved it. Deriving commands:
`grep -o 'oklch(' browser_baseline_OLD.json | wc -l` → **2,586 of that capture's 5,466 contrast
findings already carried `oklch()` colours** (e.g. `button "Do not track me" ratio=2.47
color=oklch(0.708 0 0)`); and `git log -1 --format=%B bf231f1a`, the supposed repair, says in its
own words that it fixed the `--grounds` classifier only, with no hunk in the contrast block
(`git diff bf231f1a~1 bf231f1a -- docs/_engines/instruments/browser_check.mjs`). The canvas-paint
contrast path dates from the instrument's first commit, `08cee664`. A real GROUNDS defect had been
over-generalised to the CONTRAST half of the same file, and the whole 5,466 → 352 delta was real
remediation from phases 3 and 4.
RULE: **a finding ABSENT from a baseline and a finding that was FIXED are indistinguishable in a
count.** Before believing "the instrument was blind", test it against the instrument's own
history: grep the old artefact for the colour form it supposedly could not see, and read the
repair commit's own message for what it actually repaired. Then confirm the fixed direction the
same way, because "the element vanished" and "the element was fixed" also look identical in a
count: check `unrendered` and that the markup is still served before recording a fix.

**2026-09-11, Trade. `--grounds` reported "0 adjacent bands sharing a ground" on routes whose
closing band it had never looked at.** Two faults, and each on its own produced a clean number
out of a measurement that did not happen. (1) `bandsOf` selected `:scope > section` etc, direct
children of `<main>` only; Trade's phase 5 closing band sits inside a `<div id="book">`, so it
was invisible and `/cis-refund` reported 5 bands where the page has 6. (2) Grounds were compared
by STRING EQUALITY, so `rgb(250, 250, 247)` and `rgb(250, 250, 249)` counted as two different
grounds although they differ by about 0.001 in lightness and render as one continuous slab,
which is the exact defect the check exists to find.
Deriving command and the decisive lines, before and after, same server, same routes:
```
MSYS_NO_PATHCONV=1 node docs/_engines/instruments/browser_check.mjs --site=construction-cis   --base=http://localhost:3167 --widths=1440 --grounds --out=tmp/bc_g.json /cis-refund
before:  adjacent bands sharing a ground: 0
after:   [grounds]  bands 4 and 5 share a ground: rgb(250, 250, 249) / rgb(250, 250, 247) (distance 2.84)
         adjacent bands sharing a ground: 1  [/cis-refund 1]
```
Repaired at `browser_check.mjs` in the `--grounds` block: candidates are now matched at ANY depth
under `<main>` (semantic band tags unconditionally, a plain `<div>` still only with a `bg-` class),
then filtered to those spanning >= 90% of `<main>`'s width and de-nested. **CORRECTION, same day:
the de-nesting sentence originally written here said "dropping any candidate that CONTAINS another".
That was the rule as shipped and it was wrong, see the third-repair entry below. The rule is the
other way round: drop any candidate CONTAINED BY another, outermost wins.** The wrapper case still
works because `<div id="book">` carries no `bg-` class and is therefore not a candidate at all.
Comparison
is the redmean weighted-sRGB distance with threshold 3, just above the ~2.3 JND; the estate's real
alternation (white vs stone-50) measures 15.72 and stays distinct.
RULE, and it is the general one: **an instrument that reports zero because it never looked is
indistinguishable, in its output, from one that looked and found nothing.** A zero from a scan is
evidence only if you can say what it examined. Make the instrument print its corpus size (bands
found, routes measured) next to its findings, and before quoting a zero, verify the scan saw the
element by name.

**2026-09-11, Trade. The anchor check printed a rule it did not enforce.** `browser_check.mjs:283`
fired at `sm < 24` while printing `want >= 96px / scroll-mt-24`: 24 was the Tailwind class number
pasted in as a pixel count. A target at 32px passed silently under a message claiming a 96px floor,
and every port has read the output as though 96 were enforced. Fixed by enforcing what is printed
(`sm < 96`), because the contract specifies `scroll-mt-24` and 24 on that scale IS 96px. Proven on
a constructed fixture, since no live Trade route has a target between 24 and 96: a throwaway static
page serving `<section id="t32" style="scroll-margin-top:32px">` plus an `<a href="#t32">`, measured
by both the old and the new rule.
```
old rule:  200 desktop //                      (silent, 0 with NEW problems)
new rule:  [anchor]   #t32 scroll-margin-top=32px (want >= 96px / scroll-mt-24)
```
RULE: a gate's message and its predicate are two separate things and drift apart silently. When a
threshold appears in both, derive one from the other or assert them against a fixture that sits
between them.

**2026-09-11. This is now the THIRD repair of `--grounds`, and THE SECOND REPAIR INTRODUCED THE
DEFECT THE THIRD FIXED. That is the durable finding, and this entry is corrected in place rather
than answered by a rival one.** It shipped at `61e9b6b2` with three defects, was repaired at
`bf231f1a`, repaired again at `f5313a68` for two more, and that repair's de-nesting rule was
inverted: it dropped the OUTER full-width band in favour of its full-width descendants. Below
1440px most inner elements are full width, so an ordinary `<section class="bg-white">` was replaced
by four or five of its own children and the mode INVENTED phantom white-on-white runs, plus a fake
navy-on-navy tail on `/calculators` where the hero's inner wrapper became a second navy band. It
also destroyed the one genuine `/cis-refund` finding that same repair had just proved, because both
bands at distance 2.84 were replaced by their children.
`f5313a68`'s own commit message claimed the new rule "under-reports rather than inventing a breach".
**That claim was FALSE. It invented eight.** Decisive lines, same server, same three routes, all
four widths:
```
before:  dark band touching the footer: 1  [/calculators 1]
         adjacent bands sharing a ground: 3  [/cis-refund 1, /gross-payment-status 1, /calculators 1]
after:   dark band touching the footer: 0
         adjacent bands sharing a ground: 0
```
The band sequences after the fix are now IDENTICAL at 390/768/1024/1440 and match an independent
direct walk: `/cis-refund` 6 bands, `/gross-payment-status` 5 (the `<div id="book">` band is the
last one on both), `/calculators` 2 ending white against a navy footer, so the dark tail was never
real. The genuine 2.84 adjacency is still caught: constructed on `/cis-refund` it reports
`bands 6 and 7 share a ground: rgb(250, 250, 247) / rgb(250, 250, 249) (distance 2.84)` at both
390 and 1440.
RULE, and it is the one worth carrying: **a repair to a shared instrument is a code change like any
other and needs its own adversarial check.** Neither existing self-test covered band DISCOVERY,
which is where the last two defects both lived: the classifier and the same-ground threshold were
pinned while the thing deciding WHAT to classify was not. The third repair of one function is
evidence that the function needed a TEST, not another fix. `--grounds` now carries a discovery
self-test on a built-in fixture (an outer band containing a full-width `bg-` child, two bands inside
a plain wrapper, and a narrow card), asserted at two widths because the defect was width-dependent
and happened to give the right answer at 1440. Proven to bite: flipping the containment comparison
back exits 2 with `discovery ... got "bg-white,fx2,fx3"` and prints no grounds figures at all.
QUOTABLE, for this port, as of this repair: Trade `/cis-refund`, `/gross-payment-status` and
`/calculators` = **0 adjacent bands sharing a ground and 0 dark bands touching the footer**, at all
four widths. Every other route's grounds figure, and every grounds figure taken anywhere before this
repair, remains UNVERIFIED: re-derive, do not re-quote.


**2026-09-12. FOURTH repair of `--grounds`, and the durable finding is that nobody wrote a
test.** Three repairs in one day, the second introducing the bug the third fixed, a mode that
invented defects on real routes which then had to be disproved, and counts reported over
bands it had never measured. It now has a fixture test that runs the SHIPPED instrument
against its own server: `docs/_engines/instruments/grounds_fixture_test.mjs`, mutation-proven
against all four historical failures (flip each one back and the test exits non-zero).
Deriving command, and it is now part of session preflight:
`node docs/_engines/instruments/grounds_fixture_test.mjs`
RULE: **an instrument with no test is not an acceptance gate.** A repair to a shared
instrument is a code change and ships with its own fixture test in the same commit. The
third repair of one function was evidence the function needed a test, not another fix.
Playbook trap T29, amended.

---

## 5b. What the Solicitors port taught, in one block

**2026-09-11. A "no copy changes" rule does not only ban rewriting. Copy also arrives through a
component's DEFAULT PROPS.** Three builders were stopped from passing `LEAD_PROOF_POINTS`, then
`LeadCTAPanel` supplied its own `eyebrow` and `formTitle` and put new strings on three route
families anyway, and the homepage rendered one heading twice. RULE: on a site under a copy
freeze, pass EVERY visible prop explicitly from that route's own published strings, or suppress
it. Audit the component for defaults before adopting it.

**2026-09-11. sr-only text is published text.** Fixing three unreachable charts meant adding
column headers, invisible to sighted readers and fully indexable, on two indexed routes.
Challenged, the fixer found three of the four already appeared on the page as visible headers
or legend labels. RULE: accessibility text counts against a copy freeze; reuse an on-page
string before authoring one.

**2026-09-11. Adopting a component can destroy meaning while preserving words.** `/contact`'s
three numbered steps became three identical ticks. Every word survived; the ORDINAL did not, so
a sequence read as a set. A word-multiset diff passes this cleanly. RULE: diff GLYPHS and
semantics, not only words, and prefer `<ol>` where order is the point.

**2026-09-11. Sweep by RULE over the whole tree, never over the file list you were handed.**
Turnaround promises were declared closed three times and found live three times, the last on a
page nobody had listed. Our own published pricing was found on a comparison page that appears
in NO disposition slice, the same way. Both classes were only ever closed by a tree-wide
pattern sweep.

**2026-09-11. A per-route gate cannot see a route collision.** A page generated by BOTH a
bespoke route and a catch-all lost a live `data-cta` with 73 recorded events, non-deterministically,
while its per-route floor stayed green. It surfaced only as a ONE-UNIT drop in the site TOTAL.
RULE: diff totals as well as per-route counts, and when a total moves, find the route before
moving on.

## 6. What the ports keep finding that is not design work

Every port so far has spent roughly a third of its time on live defects nobody knew about.
Budget for it; do not treat it as scope creep, and record each one in the site's STATE.md
rather than quietly fixing it.

**2026-09-12, all five ported sites. This section IS the port, and it was run last instead
of first.** Roughly 60% of the total effort across generalist, solicitors, dentists, medical
and construction-cis went on content that was false. Almost none of it was design work, and
every serious instance was found at phase 5 or 6, by an agent doing something else, after
design work had been built on top of it. Live in production today as this is written:
- construction-cis: six different unsourced numbers answering one question, two in JSON-LD.
- solicitors: a fabricated solicitor/barrister domestic reverse charge that has never
  existed, with a worked example instructing firms to mis-bill; and the flat-rate
  limited-cost-trader rate published as 12% against the real 16.5%, with the scheme
  recommended on the strength of the inversion.
- dentists: invented client testimonials, and a page built entirely on a national UDA rate
  that does not exist.
- medical: four calculators handing a doctor a wrong number, with two unit tests PINNING
  the stale values.
- generalist: one figure used 199 times across 193 location "case studies" to mean four
  incompatible things, framed as real clients.
- several sites: claims to be qualified accountants, to hold professional indemnity
  insurance, and to be "qualified to deliver the SRA-mandated Accountant's Report", each
  contradicted by that site's own terms page.
RULE: run it as a gated phase 0 work package with its own ledger, before any design work
(playbook §2.1, prompt §10.7, trap T36). Serious tier fixed and committed before phase 1.
Positioning ruling 2026-09-12: match the terms page. The first-person "we do the work"
voice stays, because Property uses it heavily; claims to a qualification, a regulator, PI
insurance or regulated work go.

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

**2026-09-11, Trade. A blocking gate that names a check nobody can run decays into a deferral.** The
delta recorded a BLOCKING item requiring a "section-grounds scan" before the owner walk. No committed
instrument performed one: the scan behind the figure was a throwaway script that no longer existed.
Worse, it parsed colours textually, `oklch()` defeated it, and it scored every unresolved ground as
light, producing 102 breaching routes where the real figure is 79 and naming `/blog` and `/resources`
as in breach when neither is (`docs/construction-cis/DESIGN_DELTA.md:234-246`). Fixed by adding a
real `--grounds` mode to `docs/_engines/instruments/browser_check.mjs` (read the comment above
`const GROUNDS`, `:83-89`), which resolves colour through the browser and reproduces the corrected
finding: glossary and locations breach, blog and resources do not.
RULE: when you record a gate, name the committed command that satisfies it in the same edit. If that
command does not exist, building it is part of recording the gate. And never measure colour with a
parser while a browser is already open.
PROMOTED: now playbook trap T29. Kept here for the 102-against-79 miscount that exposed it.

**2026-09-11, Trade. An orchestrator keeping small work is how the manager's context goes.** The
manager did a contrast re-derivation, an instrument change and a set of document corrections inline,
because each one looked too small to delegate. Collectively they were not small, and the owner
corrected it.
RULE: the test is not "is this small enough to do myself", it is "is there a reason only the manager
can do this". The carve-outs are git, serialised builds, deploys, migrations, owner comms, and the
judgement at a gate. Everything else, audits and instrument work included, goes to an agent.

**2026-09-11, Medical. A 301'd slug whose file is still on disk is a listing defect nobody's gate
catches.** `sitemap.ts` had filtered `DUPLICATE_REDIRECTS` since commit `0abd26e7`, but the blog
index, the eight hubs and the related-articles rail had not. The incorporation hub therefore
rendered nine cards for eight destinations, and the sweep's dead-link check passed, because a 301
is not a dead link. One of Medical's sixteen redirected slugs has an `.md` on disk, so the fix cost
two internal links and one static page (163 to 162) and the route still 301s.
Deriving command: compare the redirect map against the corpus,
`grep -oE "'[a-z0-9-]+'" <site>/web/src/middleware.ts` against `ls <site>/web/content/blog/`.
RULE: filter the redirect map ONCE in `getAllPosts()` so every listing surface inherits it. Fixing
it per surface leaves the next new listing wrong, and no crawl-based instrument will tell you.

**2026-09-11, Trade phases 3 and 4. Ground truth that contradicts itself re-seeds the defect
forever.** The same CIS penalty error was corrected twice, in June and again in this port, and
returned twice. `docs/construction-cis/house_positions.md` carried corrected TABLES while both
"Practical writing rule for sessions" bullets underneath them still carried the OLD figures, and
the HP-LOCK header summary at `:11` carried them too. Those bullets and that header are the lines
a writing session actually follows; nobody writes a page off the table. All three now match their
own tables.
Deriving command: grep the ground-truth file for the retired figure itself, not for the sentence,
e.g. `grep -n '30%\|20% of the sums\|100%' docs/<site>/house_positions.md`.
RULE: when correcting a locked position, grep the WHOLE ground-truth file for the old figure and
fix every restatement in the same edit, headers and writing-rule summaries included. A corrected
table above an uncorrected bullet is not a correction, it is a slower re-seed.

**2026-09-11, Trade phases 3 and 4. A self-contradicting file defeats a text search.** The s.62B
error ("20% of the sums returned" where the statute charges the whole sum) was recorded as fixed by
a session in June. It was live. The definition SENTENCE had been corrected while the worked EXAMPLE
three lines below still calculated 20% of the figure, so a text search for the wrong wording found
nothing and the file disagreed with itself inside one section.
Deriving command: `git log -1 --format=%B 72fe3261`; the surviving guard is
`construction-cis/web/src/tests/design/penalty-figures.test.ts`.
RULE: when correcting a figure, search the same file for its ARITHMETIC as well as its words. A
worked example is a restatement of the rule in numbers, and it is the copy a reader trusts most.

**2026-09-11, Trade phase 4. A phase boundary is not a reason to leave a wrong published figure.**
The manager fenced one calculator file off from three separate sweeps because a later phase owned
it, having written himself that a phase boundary is no reason to leave a wrong tax figure
published. That fencing is the SOLE reason a director-penalty claim the ground truth bans in
capitals survived two passes and stayed live, in body copy AND in FAQPage structured data, where
Google could quote it. It was caught in Phase 4 only because Phase 4 finally owned the file.
Deriving command: `git log -1 --format=%B 72fe3261`, section "WHAT I GOT WRONG".
RULE: scope a CORRECTNESS sweep to the RULE and the WHOLE SITE, never to the phase's route list.
Phase ownership governs design work. It does not govern false statements, and a wrong figure does
not wait politely inside a file boundary.
PROMOTED: now playbook trap T34, which amends the playbook's own phase-ownership guidance.

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

---

## 8. Concurrency incidents (the rule exists and was still broken)

**2026-09-11, Dentists. A sibling agent's repo-wide `git add` swept 28 Dentists files into a
commit titled "feat(generalist): high-street mechanic wave 5" (`f75438bf`).** The Dentists port
had staged its own paths explicitly, ran `git diff --cached --name-only` to confirm the set was
clean, and in the seconds between that check and `git commit` a sibling staged and committed the
whole tree. The port's phase 1 gap-fix is therefore committed under another site's message, with
no Dentists commit to find it by.

Nothing was lost and nothing was corrupted: `git diff HEAD -- Dentists/` was empty afterwards and
`git show f75438bf:<file>` confirmed every fix intact and byte-identical to the verified build.
The damage is purely to the audit trail, which is the thing a six-phase port depends on.

Deriving commands, run in this order, because the second is the one that tells you what happened:
```
git diff --cached --name-only | grep -v "^<Site>/"     # foreign paths in YOUR index
for sha in $(git log --format=%h -4); do \
  echo "$sha $(git show --name-only --format='' $sha | grep -c '^<Site>/')"; done
git status --porcelain <Site>/                          # empty = someone committed your work
```

Why the existing rule did not prevent it: §13 rule 1 binds the agent READING it. It cannot bind the
sibling that never read it, and staging is a whole-repository operation on a shared index, so one
agent's `git add -A` captures every other agent's uncommitted work regardless of how carefully they
staged. **An explicit-path discipline protects the repo from you; it does not protect you from the
repo.**

RULE, in three parts:
1. **Treat the index as shared, hostile state.** Stage and commit as ONE command
   (`git add <paths> && git commit`), never as two steps with a check in between. The gap between
   them is the whole vulnerability, and it is seconds wide.
2. **After every commit, verify what YOU actually committed**, not that a commit happened:
   `git show --name-only --format="" HEAD | grep -c "^<Site>/"`. A clean `git status` afterwards
   proves your files are committed; it does NOT prove they are in YOUR commit.
3. **Never fix this by rewriting history.** With four ports live in one tree, a rebase or amend
   destroys siblings' work to tidy your own log. Record where the work actually landed, in the
   site's STATE.md, and move on. A misleading commit message is cheap; a corrupted sibling is not.

**2026-09-12, retrospective across the four concurrent ports. Concurrency was pure tax and
the next ports run ONE SITE AT A TIME.** Measured cost of running four sites in one tree:
the sibling `git add` incident above; instruments crawling the wrong site three separate
times (section 5); and NINETEEN orphaned `next start` servers still listening days later,
seven copies of one site and five of another, which is the direct cause of those wrong-site
measurements. No offsetting speed gain was observed on any phase.
Deriving and clearing commands, and they belong in the preflight of every session:
```
netstat -ano | grep ":31" | sort -u      # every listener in the ports this programme uses
taskkill //PID <pid> //F                 # then re-check the port is FREE before starting
```
RULE: one site at a time. Kill every orphan you did not start before measuring anything, and
assert the served page title afterwards. Playbook trap T37 and §13.

Also seen the same session, and handled correctly: `.git/index.lock` held by a sibling's in-flight
commit. It cleared in 3 seconds. NEVER delete that file to get past it; it belongs to another
agent's running commit, and removing it corrupts theirs to unblock yours. Poll for it to clear.

---

## 9. Two ways a contrast audit lies to you (2026-09-11, Dentists)

Both found in one phase, both by builders correcting the manager, and both will bite any port
that themes through CSS variables. Neither is exotic; both produce a clean-looking audit over a
live failure.

**A. An ALIAS token hides from the grep everyone is using.** `globals.css` defines
`--accent-strong: var(--gold-strong)`. So `text-[var(--accent-strong)]` IS gold text, and the
audit grep the whole port had been running, `grep "text-\[var(--gold"`, returns ZERO for it.
Dentists carried **21 such usages** on `/about` and the legal pages, on light grounds at 3.76,
invisible to every gold count this port quoted, including the manager's.
Deriving commands, and note the second is the one that finds the truth:
```
grep -rn 'text-\[var(--gold'   <site>/web/src --include=*.tsx | wc -l   # the number everyone quoted
grep -nE '^\s*--[a-z-]+:\s*var\(--' <site>/web/src/app/globals.css      # every alias in the file
grep -rn 'text-\[var(--accent' <site>/web/src --include=*.tsx | wc -l   # what the alias hides
```
RULE: before auditing a token by name, **enumerate the aliases of that token first** and search
the alias set, not the name. This is playbook T6 (search by RULE, not by symptom) in its
cheapest form: the symptom is the token's name, the rule is "gold-valued text on a light
ground". Any count taken by the naive grep is a FLOOR and must be reported as one.

**B. Alpha defeats a contrast fix that measured correctly.** Twice in one phase, a colour was
swapped to a passing step and then rendered semi-transparent, which composites it back under
the floor:
- chart bars recoloured to `--gold-strong` for **3.32** on the panel, then drawn at
  `opacity={0.9}`, compositing to **2.89**;
- an audience-page stat label using `text-[var(--gold)]/90` on `--navy-soft`, **4.24**, where the
  solid colour measures 5.29 and the plan had classed it with the passing group.
RULE: measure the COMPOSITED pixel, not the token. Any `/NN` alpha suffix or `opacity=` on or
above the element invalidates the swatch figure, and a contrast table that lists a token without
its alpha is not evidence. This is the same family as measuring a button against its own label
instead of the ground it sits on, which is how this port shipped an invisible hero CTA.

---

## 10. Managing the port: how the manager lost work (2026-09-12)

**Three STATE.md pickup blocks contradicted git.** One said "phase 1 complete, next phase 2"
when all six phases were built and tagged. Another said two phases were unbuilt when one of
them was tagged. Dentists' build plans for the last three shipped phases existed on disk and
were never committed. A fresh agent reading any of them would have redone finished work, and
that is the exact failure the pickup block exists to prevent.
Deriving commands, run before you plan anything:
```
git tag -l 'port-*'
git log --oneline -20 -- <site>/
git status --porcelain docs/<site>/
```
RULE: git is the authority for what is built. Update the pickup block in the SAME commit as
the phase it describes, and do not close a phase until its plan is committed. Playbook T38.

**A whole work package was dropped, and five agents became twenty.** Of six packages in one
phase, five were launched and one was forgotten; it surfaced only because the last agent
noticed those routes were byte-unchanged. Separately, sweep agents spawned their own workers
because nothing in their briefs said not to, and the launch hit the concurrency ceiling.
RULE: write the phase's package list down before launch and tick it off at close with a
receipt per package. A package is not complete because you remember launching it. Cap
concurrent agents at 6 and state in every brief whether that agent may delegate; the default
line is "Do NOT launch subagents." Playbook T39.

---

## 11. What the contractors-ir35 port taught (2026-09-12)

**THE BIG ONE, estate-wide: a chrome fix recorded as shipped on 2026-08-23 never took effect on
any site, including Property.** `packages/web-shared/design/chrome/SiteHeader.tsx:473` composes
`{btnPrimary} hidden ... lg:inline-flex`, and `btnPrimary` (`design/layout-utils.ts:30`) OPENS
with `inline-flex`. In the emitted stylesheet `.inline-flex` sits AFTER `.hidden`, so `hidden` is
a dead no-op and the header CTA never hides at any width. Both classes are present in the class
list, which is exactly why source review, diff review and every test pass it.
Measured on contractors-ir35: pre-port the CTA/burger overlap ran 0-767px; the port WIDENED it to
0-1023px while its own phase 1 commit claimed the dead zone was fixed. Wordmark wraps to 119x62
at 390px. Property reproduces it: byte-identical string at
`Property/web/src/components/layout/SiteHeader.tsx:310`, its own `btnPrimary` also opens
`inline-flex`, and its built CSS has `.hidden` at 14722 and `.inline-flex` at 14801.
Deriving command, run on any ported site: compare the byte offset of `.hidden{display:none}`
against `.inline-flex{display:inline-flex}` in `<site>/web/.next/static/css/*.css`.
RULE: when a utility is supposed to hide something, verify it in the BUILT CSS ORDER, not in the
class list. Two competing `display` utilities in one class string is a cascade race and the loser
is silent. Site-local fix used here: a layered rule keyed on the CTA data attributes, specificity
0,2,2 inside `@layer utilities`, so it does not depend on source order. The durable fix is in
web-shared and crosses 18 sites, so it is an owner decision (trap 12).

**A site can be missing `@source` for web-shared, and then NONE of the kit utilities exist.**
`contractors-ir35/web/src/app/globals.css` had no `@source "../../../../packages/web-shared"`.
`source("..")` narrows the scan to `src/`, and web-shared resolves through a node_modules symlink
Tailwind skips. Phase 1 adopted three kit components wholesale and none of their utilities were
generated at all. A Tailwind class naming a token that does not exist does not error, it silently
produces nothing, so the header, footer and breadcrumb would have shipped unstyled with every
test green. The missing `primary-*` ramp was only the visible tip.
Deriving command: `grep -c "primary-600" <site>/web/.next/static/css/*.css` must be >= 1 after
adopting any kit chrome. Compare `dentists/web/src/app/globals.css:3`, which has the line.
RULE: after adopting a kit component on a site that has never used one, prove the utilities exist
in the COMPILED output before believing anything about colour.

**`sr-only` on a `<table>` does not work, and it causes horizontal overflow.** A chart
accessibility fix added visually hidden data tables with `sr-only` on the `<table>`.
`display: table` treats `width` as a MINIMUM, so `width: 1px` is ignored; `overflow: hidden`
cannot clip the element's own box; and `clip: rect(0,0,0,0)` affects painting only, never the
scroll region. The table laid out at natural content width and reached the document scroll area:
390px viewport, `scrollWidth` 979. The wrapper variant gives 390.
RULE: put `sr-only` on a wrapping `<div>`, never on the table. Verify
`document.documentElement.scrollWidth <= clientWidth + 1` at 390px, and separately confirm the
accessibility tree still exposes table, rowgroup, row and columnheader.

**A figure without its scenario is not a figure. Two near-misses in one package.** A claims
ledger recomputed a CORRECT published saving at zero expenses, declared it wrong, and an agent
nearly republished a wrong number on it. Then the manager passed a second agent a figure from a
different sweep (220 days, salary 6,708, zero expenses) as if it were the workbook default curve.
Both were caught only because one number failed to reconcile with another, and the second only
because the receiving agent REFUSED to write the line and asked for the calculation.
RULE: every derived figure travels with its scenario or it does not travel. Reward an agent that
refuses to write a line it cannot reconcile.

**A trend claim is a defect class no figure sweep finds.** Four surfaces said the
limited-versus-umbrella advantage WIDENS with day rate. It is non-monotonic: rises, troughs near
480, peaks near 570, falls to 155 at 700, crosses zero near 750, both turning points being the
100,000 personal allowance taper hitting the two routes at different rates.
Deriving method: grep for DIRECTIONAL language, not numbers:
`wider|widen|narrow|rate rises|high enough|relatively low|comfortably exceeds|scales|break-even`.
RULE: sweep claims about BEHAVIOUR separately from the figures.

**The config-file trap fired again, and the audit that missed it had searched the repo.**
`niche.config.json:20` carried "Fixed fees, plain English." in the site `description`, rendering
in the footer and the Organization JSON-LD on EVERY url while appearing in no page source. A
phase 0 claims audit concluded the site published no pricing at all.
RULE: grep the RENDERED HTML of a served build, not only the repo. It is the only method that
catches copy injected from config.

**Canonical inheritance: one line in a root layout excluded five route families.**
`alternates: { canonical: siteUrl }` in `src/app/layout.tsx` is inherited by every route that does
not override it, so about, services, contact, the IR35 hub and all 11 `/for` URLs told Google they
were duplicates of the homepage. The brief named ONE family.
Deriving command: `curl -s <base>/<route> | grep -o 'link rel="canonical"'` per family.
RULE: check every route family, and check the inverse too. Two legitimate point-away cases exist
here (embed pages, syndicated posts) and forcing self-canonicalisation would have been its own
defect.

**Undercount, five more instances, and the first OVERcounts.** Canonical: reported 1 family, was
5. Pricing: the audit found 6 and proposed 0 edits; the re-sweep made 17 across 9 files, 11 of
them new. Breadcrumb imports: brief said 15, was 14. Charts: brief said 9, was 8. And a ledger
called a CORRECT saving figure wrong. Sixth instance (F11, 2026-09-13): unlayered CSS rules,
brief said 3, was 26 — undercount of **23** — and this one's cause was not the auditor, it was
the documented deriving command (`grep -nE "^[a-zA-Z][^{]*\{"`, section 6 above), which cannot
match a class selector by construction. See section 6, 2026-09-13 entry, and
`docs/contractors-ir35/_port/F10_UNLAYERED_SWEEP.md`.
RULE now two-sided: sweep by rule to find what a list omits, and verify the list's positives too.

**Three comments described code that does not exist.** A dead component described as mounted by
three other files; a chart claiming an accessible prose fallback that was never there; and a port
report claiming a token broke 12 files when it has zero consumers. One of them had already cost a
real defect its detection.
RULE: correct a false comment in the same commit as the code it describes. A comment is a claim,
never evidence.

**Serialise builds when agents share a site directory.** Four agents running `next build` in one
`contractors-ir35/web` produced a phantom `pages-manifest.json ENOENT` that read as a real defect.
Fixed by banning builds in agent briefs and running ONE build at wave close, then executing every
agent's written verification list against it. Agents returned verification lists (URL, command,
expected result) instead of running servers, which worked well and is recommended.
RULE: one builder of a site directory at a time, and that builder is the manager.

**Prove a server's AGE, not just its identity.** A reviewer correctly rejected a server 11 minutes
older than the working tree. The method that settles it: pick a string whose commit you know and
diff it across servers. Here "fixed fee" is present pre-port and absent after, and `/about`
canonicalises to the homepage pre-port and to itself after.
RULE: assert title AND age before quoting any server.

---

## 12. What the charities port taught (2026-09-13/14)

**The documented unlayered sweep is still broken, and this is the second consecutive port whose
documented audit command could not find the defect it describes.** The brace-depth walk in section
11 above and in `docs/contractors-ir35/_port/F10_UNLAYERED_SWEEP.md` §1 iterates `s.split('\n')`,
so it returns NOTHING against a built stylesheet: `charities/web/.next/static/css/*.css` is
**46,359 bytes on ONE line**. It also opens with `encoding='utf8'`, and
`crypto/web/src/app/globals.css` and `generalist/web/src/app/globals.css` both start `ef bb bf`, so
the first selector arrives with a BOM glued to it.
RULE: walk the CSS as a CHARACTER STREAM, not lines, and read it `utf-8-sig`. The same walk then
works on source and on minified build output, which is the only place layer order is decidable.

**Contrast is symmetric, so a colour has ONE ratio and THREE floors.** `P0D_CSS_CONTRAST.md`
§4.5: `#1a5c4a` measures 7.85 as a graphic (floor 3.0), as text on white (4.5) and as a ground
under white text (4.5). A brief that asks for "three ratios" is asking the wrong question, and an
agent that answers it invents numbers. Calibration correction: Tailwind **v4** `slate-500`
`#62748e` is **4.77**; 4.76 is the v3 hex `#64748b`. v4 `slate-400` `#90a1b9` = 2.63 (v3 2.56), as
already recorded.

**`grep -c` is wrong against built CSS and wrong the other way against Next.js HTML.**
A production stylesheet is one line, so `grep -c` can only return 0 or 1:
`grep -c primary-600 generalist/web/.next/static/css/1487733c3b9dd0c2.css` returns **1** for **42**
occurrences (`grep -o … | wc -l`). Next.js HTML serialises the same text twice, once in the DOM and
once in the RSC flight payload, so `grep -c` OVERstates there: homepage `section-label` counted 16
was 8 real, "connect you with an independent examiner" counted 2 was 1, "partner firm we work with"
counted 8 was 4. Both errors happened on this port and one reached an owner report.
RULE: count built CSS with `grep -o … | wc -l`; report rendered HTML as **per-page presence**
(`grep -ql` per file, count files), and say which of the two you measured.

**A class that names nothing does not error, it renders nothing.** charities emits
`class="prose prose-neutral"` on all 24 posts and 8 guides with **zero `.prose` rules** shipped,
because no typography plugin is installed. `docs/_engines/ESTATE_PROSE_SWEEP_2026-09-13.md`:
**161 live article pages across TEN deployed sites**. Five sites (charities, crypto, hospitality,
pharmacies, startups-tech) also emit `section-label` with no rule anywhere in their CSS; the
charities instance at `src/app/page.tsx:690` sits on `bg-[#0f2e24]` and measures **1.22**.
Sweep command, per site:
```
curl -s <page> | grep -o 'class="[^"]*\bprose\b[^"]*"'
curl -s <domain>/_next/static/css/<hash>.css | grep -o '\.prose[ {,:]' | wc -l   # 0 = dead class
```
Count the SELECTOR (`.prose`), not the substring: `prose-blog` and `not-prose` inflate a raw count
(Solicitors shows 43 `prose` hits and is fine).

**A pre-existing defect can hide in valid-looking frontmatter.** Three charities posts published
`[object Object]` as their JSON-LD in production, on exactly the three files that declare a
`schema:` key: `schema:` is a YAML mapping, gray-matter parses it to an object, the type said
`string` and the renderer interpolated it.
RULE: the instrument asserts the JSON-LD **PARSES**, per URL. A check that only looks for the
`<script type="application/ld+json">` tag passes this defect.

**The claims audit held again, and so did its counter-lesson.** 26 serious rows (the ledger's own
summary said 25; its table carries S1-S26), **26 of 26 CONFIRMED** against the rendered build,
0 overstated, 0 false positives, plus **8 further serious rows** only a rendered-HTML sweep could
find (config-injected copy, `priceRange "££"` on 68 nodes, 116 FAQ pairs with no on-page
counterpart, sibling files outside a row's scope). Serious total 26 → 34, the same undercount ratio
as every prior port. Counter-lesson unchanged from section 11: verify the ledger's POSITIVES too:
four rows were understated in scale, one was mis-located and one minor was mis-graded.

**A work-package split leaks defects at its own seams.** One OFF LIMITS list named
`src/lib/charity-services.ts`; the file is `src/data/charity-services.ts`, so the fence guarded
nothing. The homepage was fenced off from the claims agent while assigned to an agent fixing links
only, so its testimonials, client-base claim, regulated-work line and turnaround promise all
survived the wave and needed a sixth gap-fix package.
RULE: every path in an OFF LIMITS list is proved to exist (`ls` it) before the prompt ships, and
every file assigned to a package has an owner for EVERY defect class in it, not only the package's
theme.

**Executing the written verification lists at wave close is what caught the last two defects.**
`V1_PHASE0_VERIFICATION.md`, 30 groups against one production build: it surfaced the `[object
Object]` JSON-LD and the leaked pipeline artefact "(HP14)" published in the stats strip on
`/services/gift-aid` (ledger M1, `src/data/charity-services.ts:196`). Its 2 failures were wrong
expected values in the briefs, not site defects.
RULE: agents return lists (URL, command, expected result); the manager runs ONE build and executes
every list against it BEFORE tagging.

**A premise that survives four agents can still be false.** The port ran for some time on the
belief that charities does not implement the pool routing model and that its consent text was a
local variant. `docs/_engines/PROPERTY_REFERENCE_ANSWERS.md` §4: the consent text is
**byte-identical** to Property's, and the pool (`Property/web/src/lib/leads/offer-send.ts`) is
central, DB-driven and **source-agnostic**. `matchingBuyers` filters `lead_buyers` on
`sources cs.{<source>}`, so a charities lead reaches the same pool a Property lead does. Whether
the paragraphs were right to delete is still open at the time of writing; the premise is not.
RULE: before calling a site's copy false, (a) grep Property for the same string, and (b) establish
whether the mechanism it describes is site-local or estate-central. Consent text is also
gate-load-bearing: `consentAllowsSharing` matches on the published wording and
`Property/web/src/tests/consent-anchor-drift.test.ts` pins it.

### Phases 1 to 6 (2026-09-14)

**A composed utility override ties on specificity and LOSES ON SOURCE ORDER.** `btnPrimary`
hardcodes `text-white` and its own ground (`packages/web-shared/design/layout-utils.ts`);
a call site that appends a competing colour produces two single-class rules of equal
specificity, so the one later in the stylesheet wins, and which one that is depends on
Tailwind's emission order, not on your class string. Two live defects on this estate are
now this same shape: the header CTA `hidden` vs `lg:inline-flex`
(`design/chrome/SiteHeader.tsx:473`) and the charities homepage hero button rendering
**white on white** since launch.
RULE: never invert a kit recipe by composition. Write the button out, or drive it from a
token. Settle any suspected tie by byte offset in the served stylesheet:
`curl -s <cssbundle> | grep -bo '<selector>'`.

**An undefined CSS custom property invalidates the WHOLE declaration, so the element
renders nothing and every test stays green.** `bg-[var(--primary)]` with no `--primary`
declared is not a fallback to black, it is no background at all. charities declared
neither `--primary` nor `--accent-strong` while adopting components that paint from both,
so the reading-progress bar was transparent with a clean `browser_check`.
RULE: before adopting a kit component, sweep it for bare reads:
`grep -rn 'var(--[a-z-]*)' <component>` and check each name against the site's
`globals.css`. Both kit families now ship `var(--primary,var(--brand-primary,#0f172a))`
so the class cannot recur.

**There are TWO copies of several kit components.** `packages/web-shared/design/blog/` and
`packages/web-shared/content/` both carry `ReadingProgress.tsx` and `TableOfContents.tsx`.
A survey that checked only one family reached the wrong answer on a live site.
RULE: `grep -rn "<component>" <site>/web/src` to find which family the site imports BEFORE
concluding a defect does or does not apply, and patch both families when you patch one.

**A kit component's DEFAULT props can ship dead links.**
`SiteFooter.companyItems` defaults to `{ label: "Locations", href: "/locations" }`
(`design/chrome/SiteFooter.tsx:84`), which **404s on every site without location routes**.
charities has `locations: []`.
RULE: read every default object in a chrome component's signature and pass the prop. A
default is a claim about your site that nobody checked.

**`wordmarkIcon` is a component function and cannot cross the RSC boundary.** That is why
every ported site keeps a thin client shell wrapper around `PageShell`
(`design/chrome/SiteHeader.tsx:88` types it `WordmarkIcon`). generalist, Solicitors and now
charities all have one.
RULE: the wrapper is the required pattern, not a bespoke deviation. Do not raise it as a
port defect and do not try to delete it.

**Instrument blind spot, stated honestly: `ratio=1.00` with `color=rgb(255, 255, 255)` is
usually a white-on-gradient artefact, and on this port one of them was a REAL
white-on-white button.** `browser_baseline.json` carries **64** such rows out of 164; the
homepage `a "Talk to a charity accountant"` row was the live hero CTA.
RULE: never dismiss a `ratio=1.00` white row as an artefact and never accept it as a defect
without proof. Settle each one against the served stylesheet's byte order, at the element
the row names.

---

## 13. What the crypto port taught (2026-09-14)

**A site can have NO CHROME AT ALL, and three phase-0 packages found it independently
before anyone planned a restyle.** crypto shipped **no header, no `<nav>`, no mobile
drawer, no `<main>` landmark and no skip link on any of 51 routes**. Not a drifted
breakpoint and not a broken drawer: no header component existed in the repo.
`crypto/web/src/app/layout.tsx` rendered `ConsentProvider > AnalyticsProvider >
{children} + SiteFooter` and nothing else. The consequence was measurable in the link
baseline: **608 unique internal links over 51 routes with a per-route floor of 8, and the
floor of 8 is exactly the footer** - ten routes had footer-only internal linking
(`docs/crypto/_port/P0D_BASELINE.md` section 2). Every brief written for this port assumed
a header existed, and four of its questions were unanswerable as written: measure the
burger's breakpoint, the drawer's, the nav's, the primary CTA's.
Deriving command, run before writing any phase-1 brief:
```
for p in / /blog /contact /services; do curl -s <base>$p | grep -c '<header\|<nav\|<main'; done
```
RULE: phase 0 must establish whether chrome EXISTS before anything plans to restyle it,
and must say so in one line at the top of the structural inventory. A port of a site with
no chrome is not a restyle, it is net-new construction, and the phase order changes.

**Corollary, for the CTA baseline: the risk is not flipping the site's literals, it is
INVENTING them.** crypto carried **one `data-cta` on the entire site**
(`thankyou-return-article`, and only when a safe `rt` query param is present, which is why
a plain fetch saw nothing). There was no pre-port drawer CTA goal or placement to
preserve, so every `data-cta` the kit chrome introduced is net-new analytics with no
baseline to compare against.
RULE: on a site with no chrome, record the phase-1 CTA set as a deliberate decision with
its reason, not as a value validated against a pre-port set. Name the one id that must
survive byte-identical.

**The brief's own defect can be the defect, four times on one port.** Each of these sent a
builder after the wrong element:
- A warn-tone contrast failure named in a brief was **passing at 10.9 on its real ground**;
  the actual failure in the same component was a brand colour at **1.06:1** - calculator
  headline labels rendered navy inside the navy result panel, invisible, on all four
  calculators and all four embeds.
- "Six `neutral-400` research elements" - `P0C_CSS_TOKEN_AUDIT.md` C11 locates
  `text-neutral-400` at **three** research lines (`:115, :122, :212`) plus five elsewhere,
  and the real research failure the port fixed was a different colour at **3.73 on navy**.
- "17 gov.uk citations per page" - the measured range across the five service pages was
  **15 to 22** escaped-tag occurrences.
- "One text-child field" - `{faq.answer}` interpolated as a React text child was **four**
  affected fields, and the fix belonged at the template, not the field.
RULE: a builder's first act is to re-derive the brief's own number at the element the
brief names. Report the correction as a numbered false premise before fixing anything.
Every package on this port that did this caught a mis-aimed instruction; the cost of the
check is one grep.

**A fix can propagate the error it was fixing.** Phase 0 correctly fixed the CGT estimator
for measuring the basic-rate band against **gross** income (37,700 is a taxable-income
ceiling). The same wave then "corrected" a basic-rate band figure in prose **using the
same gross-income method that made it wrong**: `staking-rewards-tax-two-step.md:97` was
left publishing "25,000 of salary, leaving 12,700 of her basic-rate band unused (37,700
minus 25,000)" where the answer is 25,270. The site's own calculator printed **25,270** on
identical inputs on the very next URL. Only the independent content review caught it
(`R2_CONTENT_REVIEW.md` C2).
Deriving command: `grep -rnoE '.{160}37,700.{160}' <site>/web/content <site>/web/src` -
every correct occurrence says "taxable income"; the wrong one says "salary".
RULE: when a wave fixes a METHOD error, re-derive every figure the method touches, in
prose as well as in code, and cross-check against the site's own tool output on the same
inputs. A tool and an article disagreeing on identical inputs is a free oracle.

**A sweep finds only the class it was sent for.** The phase-0 arithmetic sweep read all 19
posts and fixed two worked examples. It missed, **in files it had open**: a 2,136 CGT
figure on a 2,400 gain (five times the true 432), an **expired 5 April 2026 claim
deadline** published as live guidance, and a metaDescription putting CARF reporting at
2026 where every body on the site says 2027. The expired deadline and the tense error were
found by a different package reading adjacent files for a different reason.
RULE: dates and tenses are a separate sweep class from arithmetic, and the same file can
pass one and fail the other. Sweep for `must ... by <date>` / `from <date>` / `will`
independently, with today's date in hand, and re-run it every time a port crosses a tax
year or a deadline.

**A grounds scan keyed to named Tailwind scales is blind to arbitrary-value grounds.** The
`--grounds` capture reported **0 section bands on 27 of 51 routes**, the homepage among
them, and a brief told a builder there was no section-ground rhythm to preserve. The
homepage in fact runs **13 deliberate `bg-[#fafaf9]` bands** (R1 D4 measured the full
inventory post-port: `bg-slate-50` x26, `bg-neutral-50` x12, `bg-[#fafaf9]` x6 inside
`<main>`). An arbitrary-value ground is invisible to a scale-keyed scan.
Deriving command: `grep -o 'bg-\[#[0-9a-fA-F]\{3,8\}\]' <served html> | sort | uniq -c`
alongside the named-scale scan.
RULE: a zero from a grounds scan means "the scan found nothing it knows how to name", not
"there is no rhythm". Say which of the two you measured, and scan for `bg-[#...]`
separately before telling a builder there is nothing to preserve.

**Auditing from the sitemap misses served pages that carry published copy.** crypto's
sitemap lists **51 URLs**; **54 are served**. `/book`, `/complete` and `/thank-you` are
live, carry published claims (including "free review call" copy and the site's only
authored `data-cta`), and were outside every claims audit driven by `sitemap.xml`. The
sitemap was **correct** to omit them - all three are `noindex, nofollow` - so this is not
a sitemap defect, it is an audit-scope defect. `robots.ts` compounded it on this site by
disallowing `/thank-you` but not `/book` or `/complete`.
Deriving command: enumerate route families from `find <site>/web/src/app -name page.tsx`
AND from `sitemap.xml`, then diff the two and dispose of every difference explicitly.
RULE: the audit corpus is what the server serves, not what the sitemap advertises. Publish
the served-URL inventory with a disposition line per excluded family (crypto's P0-B and
P0-D both did; that is the pattern).

**`grep -q` and `grep -l` are mutually exclusive, so `grep -ql` prints nothing and a
harness built on it returns a clean pass for every check.** `-q` suppresses all output and
exits on first match; `-l` asks for the filename. Combined, the quiet flag wins and the
harness reads "no match" for a present string and "no match" for an absent one alike.
Every row goes green.
RULE: every verification harness carries a **self-test row with one known-present and one
known-absent string**, and refuses to report if the known-present row does not fire. This
is the same discipline `browser_check.mjs` already applies to its contrast converter, and
it costs two lines. Note the sibling instrument hazard found here: `browser_check.mjs`
`--save-baseline` exits at line 726 **before** printing its self-test verdict, so on a
baseline run the operator is never shown the evidence the gate passed - quote it from the
run JSON's `selfTest` field instead.

**A tag-adjacent inline element breaks a naive text-presence check.** R2's first automated
FAQ pass reported 4 asserted-but-absent answers. **All four were artefacts of its own
normalisation**: stripping `<strong>` inserts a space next to the following comma, so the
JSON-LD's "pooling," no longer matches the page's "pooling ,". Re-run with
alphanumeric-only normalisation and entity decoding: **222 of 222 answers present**.
RULE: normalise to alphanumerics and decode entities before declaring a FAQ answer absent,
and re-check every miss by eye. The asserted-but-absent defect is real and this port fixed
132 genuine instances of it, which is exactly why a false positive in that class is
expensive.

**A `@theme` ramp must be minted before any kit component is mounted, or the kit renders
colourless and every test stays green.** crypto had **no `@theme` block and no `primary-*`
ramp at all** (`P0E_STRUCTURAL_INVENTORY.md` E5), while every kit component styles off
`text-primary-600` / `bg-primary-600` / `btnPrimary`. On this port the token ramp was run
as its own package, ALONE, before every visual package, because all of them blocked on it.
That ordering is the reusable part.
RULE: token ramp is package one, alone, on any site that has never mounted kit chrome.
Prove `grep -o "primary-600" <site>/web/.next/static/css/*.css | wc -l` is non-zero after.

**An unlayered `body` rule is a latent trap that only fires when the port touches the
body.** `crypto/web/src/app/globals.css:11` set `background`, `color` and `font-family` on
a bare `body`. It was beating nothing (the rendered body carried only `antialiased`), and
it would have silently beaten the first `bg-*`, `text-*` or `next/font` class any later
package added, because a v4 utility lives in `@layer utilities` and an unlayered element
rule outranks every layer. The font case was the live risk: crypto loads no webfont, so a
port adding Geist via `next/font` would have rendered the system stack with every visual
test passing.
RULE: move `body` into `@layer base` in the token-ramp package, BEFORE anything adds a
font or a body-level utility. A latent cascade trap is worth fixing in the commit that
would otherwise trigger it.

**"Zero undeclared custom properties" is the wrong claim to make, and it was made.** The
phase 1-6 commit body asserts zero undeclared names in the built CSS. R1 re-derived
independently: **222 names used, 224 declared, 10 used-but-undeclared**
(`--brand-primary-ground-hover`, `--btn-radius`, `--calc-warn-*`, `--hero-cream` and four
`--default-*font*`). Every one carries an inline fallback, so nothing renders blank and
the *conclusion* was safe, but the stated check was false and a gap-fix wave repeating it
would keep being wrong.
RULE: the defensible claim is "every undeclared name is fallback-guarded, checked at the
element", not "zero undeclared". State the check you actually ran. An undefined custom
property with no fallback invalidates the whole declaration - that shipped live on
Dentists - so the distinction is the entire point.

**A component created inside a disjoint-file-set wave can end up owned by nobody.**
`crypto/web/src/app/_parts/PageHero.tsx` is net-new in the phase 1-6 commit, appears in no
row of `PHASE0_PACKAGES.md`, and is now imported by seven page files plus
`TopicPageLayout.tsx`, reaching **nine route families and eighteen URLs**. So are
`PageShell.tsx`, `nav.ts`, `TopicPageLayout.tsx` and `wrapWideTables.ts`. The package
table's file sets were disjoint on the files that EXISTED; the files a wave creates are
outside it by construction.
Deriving command at wave close:
`git diff --stat --diff-filter=A <phase0-tag> HEAD -- <site>/web/src` - every added file
must be assigned to a package or named in the state doc as shared.
RULE: at wave close, list the files the wave CREATED and give each one an owner. A shared
component with no owner is where the next port's cross-cutting defect will live.

**Budget confirmation, third consecutive port: the design work was the smaller half.** On
crypto the critical path was E1 (no chrome), E2 (no landmark, no skip link), E3 (132
orphaned FAQ answers) and E5 (no token ramp), all live defects, none of them styling.
Phase 0 alone fixed six wrong figures handed to users, two schema defects, two canonical
defects and a compliance section describing code that does not run. Both independent
reviews then found further live content defects the port's own verification lists had not
re-read, two of them in copy the port itself wrote.
RULE unchanged from section 11, now with a third data point: budget a third of every port
for defects that are not design work, and treat the live-defect list as the port's
headline OUTPUT, not as overhead.

**Counting corrections, carried intact from section 12 and re-confirmed on this port.**
`grep -c` UNDERcounts against a one-line built stylesheet (crypto's served sheet is 76,705
bytes on **zero newlines**), so count with `grep -o ... | wc -l`. `grep -c` OVERcounts
against Next.js HTML, which serialises DOM text a second time into the RSC flight payload,
so report rendered findings as **per-page presence** (`grep -l` per file, count files) and
say which you measured. Both P0-B and R2 declared their counting method at the top of the
document before any number; do that. New this port: a naive `re.escape` selector probe
against the built sheet reported **165 dead classes** where the real answer is **5**,
because Tailwind CSS-escapes `sm\:py-4`, `mt-0\.5` and `bg-\[\#0e1a3a\]` - the probe must
allow an optional backslash before every non-word character.

### Added after the gap-fix wave landed (`f9a96c30`)

**Disjoint file ownership stops agents colliding and strands defects at the seams, so
budget the mop-up package from the START.** The wave model works: six packages, disjoint
file sets, one build at close, no collisions. What it cannot do is reach a defect that
sits between two packages or inside a file a package may read but not write. **Three
separate packages this session measured a real defect they could not reach** and
correctly reported it instead of fixing it out of scope. Those reports are the only
reason the defects survived to the gap-fix wave rather than shipping. On this port the
mop-up was *discovered* at the end, after two adversarial reviews, and it needed its own
commit touching 32 files.
RULE: the package table gets a final row from the start - a mop-up package that owns
every cross-seam finding, and whose input is the "reported, could not reach" list every
other package returns. Make "report what you cannot reach" an explicit deliverable of
every package, not an act of initiative. A defect a package saw and could not touch is
the cheapest defect in the port; one nobody wrote down is the most expensive.

**`getComputedStyle` misreports outlines in this environment, so a focus audit built on
computed `outlineColor` chases ghosts.** Under a real `:focus-visible`
(`el.matches(':focus-visible') === true`) computed style reported
`outline: rgb(255,255,255) solid 3px; outline-offset: 0px` for a ring that actually
painted burnt-orange 2px at offset 2, under both `prefers-color-scheme` settings, with no
3px or white outline rule anywhere in the served CSS. A reviewer nearly filed a false
BLOCKING on it. The defect that WAS real - a navy ring on the navy band ground, measuring
1.00 - was established from the emitted rule and a screenshot, not from computed style.
RULE: for outlines specifically, reason from the emitted rule (which declaration sets
`outline-color`, and what does the element's ground resolve to) and confirm by screenshot.
Treat any focus-ring number that is neither rule-derived nor screenshot-backed as
unmeasured, and say so in the report.

**Use `grep -boF`, never a regex, for any selector containing a backslash, bracket or
colon.** Tailwind escapes variant and arbitrary-value selectors, so the emitted text is
`.lg\:inline-flex{`, `.mt-0\.5{`, `.bg-\[\#0e1a3a\]{`. A regex probe for `lg:inline-flex`
matches nothing and **reads as "not emitted"**, which is the wrong conclusion with the
right-looking evidence; the same mistake at scale produced a 165-item false-positive
dead-class list where the true answer was 5. `-F` takes the pattern literally, `-b` gives
the byte offset that settles cascade order, and the two together are the only reliable
probe against a one-line built stylesheet.
RULE: `grep -boF '.lg\:inline-flex{' app.css`. And remember what byte offsets can and
cannot settle: they settle ORDER between two rules you have already proven exist; only
the matched-rule list (CDP `CSS.getMatchedStylesForNode`) settles EXISTENCE.

**Corollary on the port's own arithmetic, because it recurred at every scale.** Phase 0
fixed a gross-vs-taxable band error in a calculator, then propagated the same error into
its own prose fix. The independent review caught it by noticing the site's calculator and
its article disagreed on identical inputs, on adjacent URLs.
RULE: when a site ships both a tool and prose about the same calculation, run the tool's
default render against the article's worked example. A disagreement is free evidence and
neither artefact has to be trusted first.

### Added after the design uplift landed (`7dfe04b3`)

The owner walked the finished port and said it did not look as good as Property. He then
said, unprompted, that **generalist** looks good, and generalist is also a ported site.
That control case is what made the gap diagnosable rather than a matter of taste, and the
whole of `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md` hangs off it.

**A port can pass every gate in the playbook and still not look ported.** crypto cleared
contrast at four widths, zero overflow, every link floor, the claims ledger and 38 tests,
and it still read as flat. The cause was not art direction and not content: it was that
crypto **reimplemented** the shared kit where generalist **adopted** it. generalist's
`components/ui/layout-utils.ts:6-19` re-exports the kit's containers, sections and button
recipes; crypto declared all of them locally, and its `btnPrimary` came out square,
`font-medium`, with no `min-w`, on the most-repeated element on 53 routes. Its own
`globals.css:52-55` had already declared the `--btn-ground` trio "so the navy button ground
survives adoption of the kit recipe" - **the tokens were declared for an adoption that
never happened.**
RULE: the playbook now carries a kit-adoption gate at phase 6 close (§9.1). Two ported
sites through the same method, one over and one under the owner's bar, is the only
evidence that ever settled this. If a future port is judged flat, look for the control
case before looking for a cause.

**Both of the intuitions we started with were wrong, and they were the obvious two.** The
owner suspected Property looked better because a UX designer had designed it for its
niche. I suspected crypto's corpus was too thin. Measurement falsified both:

```
grep -c '<section' <site>/web/src/app/page.tsx ; wc -l <site>/web/src/app/page.tsx
```
crypto's homepage is the **longest** of the three (793 source lines against generalist's
471 and Property's 537), with the most sections (13 vs ~11 vs 7) and the fullest grids; and
both crypto and Property run **three dark bands** on the homepage at effectively the same
ground (`#0e1a3a` against `slate-900` `#0f172b`). Section padding and container widths are
identical across all three.
RULE: the next session will reach for "bespoke design" and "thin content" in that order,
because they are the two explanations that feel true. Both are cheap to test and both were
false here. Test them before spending on either.

**The cheapest and most visible defect on the whole list was a missing webfont.** crypto
and charities load none and render in `ui-sans-serif, system-ui`
(`grep -o 'next/font[a-z/]*' <site>/web/src/app/layout.tsx` returns nothing for either).
Ten minutes to fix, and it is the loudest "unfinished template" signal a non-technical eye
reads. Nothing else on the list was as cheap or as visible.
RULE: check for a webfont in phase 0, not at review. charities still has none.

**Three of the six uplift briefs were themselves the defect, which is the third port
running.** Each was caught by the agent executing it, not by the manager writing it:

- The kit's button recipes **embed** `focus-visible:outline-primary-600` (`btnOnDark`:
  `-400`) inside their own class strings, so keeping the site's local `focusRing` constant
  does **not** protect the focus ring: the failing utility rides inside the recipe. On
  crypto `--color-primary-600` is `#8f421f`, 2.42:1 on the navy band, under the 3.0 graphic
  floor. `crypto/web/src/tests/focus-ring.test.ts` now pins it and fails if a future edit
  re-exports a kit recipe raw.
- The brief said to copy `GeneralistBackdrop`. It uses a **fixed `viewBox`**, which is the
  exact shape that causes horizontal overflow, and the port's own overflow gate would have
  caught it a day later. Trade's mechanism was used instead;
  `crypto/web/src/components/layout/CryptoBackdrop.tsx` carries no `viewBox`.
- The brief said to adopt the kit's `story-numeral` rules. **They are not in the kit at
  all.** They live in Property's own stylesheet, where they light emerald, a token crypto
  does not declare, so copying them would have shipped Property's brand or nothing.

RULE unchanged and now on its third port: **verify the brief's POSITIVES, not only its
omissions.** A brief that names a file, a component or a constant is a claim; open it.

**A half-converted ramp is worse than either state.** The neutral-to-slate conversion ran
as one package that converted the homepage and `/research` and left **41 classes in the
forms** (session record; the two packages were squashed into `7dfe04b3`, so git shows only
the finished state - `git show 7dfe04b3 -- crypto/web/src/components/forms | grep '^-' |
grep -o 'neutral-[0-9]\+' | wc -l` returns **28** for the three form files alone), which
render on every capture surface. Converted copy then sat directly next to
unconverted copy on the same page, which reads worse than a site that had never started.
It took one more package to finish, and the final state is 98 classes across 10 files with
**zero `neutral-*` classes left in live markup** (the 7 remaining `neutral-` hits in
`crypto/web/src` are all prose inside comments recording retired pairs).
RULE: a ramp conversion is all-or-nothing within a site. Scope it by the ramp, not by the
page, and count forms and shared components in from the start, because they are the files
every surface pulls in.

**Counting trap, new: `grep -o 'slate-[0-9]*'` over-counts.** `translate-x-1` contains the
substring `slate-`, and `[0-9]*` matches the empty string, so every transform utility
scores a hit. Across `crypto/web/src` the naive pattern returns **484** where the
prefix-anchored one returns **465**.
RULE: anchor the utility prefix, not the ramp name:
```
grep -rhoE '(bg|text|border|ring|from|to|via|divide|outline|placeholder|fill|stroke|accent|caret|shadow|decoration)-slate-[0-9]+' <site>/web/src | wc -l
```
The same trap applies to any ramp whose name is a substring of a utility: check before you
report a ramp count.

### Added after the four-site uplift programme (`ba7b184a`, `569d3304`, `48312e2c`)

crypto's uplift (`7dfe04b3`) got "much better" from the owner, and he approved the same
work on the three sites that measured flattest: charities, contractors-ir35 and
construction-cis. All four are committed, none pushed, none deployed. What follows is only
what generalises off three more runs of the same method.

**Every site's real defect was invisible to every existing gate, and not one of them was
design taste.** Four uplifts, four live defects, none found by contrast-at-four-widths,
overflow, link floor, claims or the kit-adoption gate as first written:

- **charities**: keyboard focus was invisible on four dark grounds. The ring was the brand
  green `#1a5c4a`, 7.85 on white and **1.86 to 2.28** on the grounds the site actually
  paints. Live since launch.
- **contractors-ir35**: the same class, plus **29 elements hand-rolling their own ring**,
  so the token fix could not reach them. Its guard test passed throughout, because it
  pinned the five shared recipes and the 29 bypasses lived alongside it.
- **construction-cis**: an **unlayered `.prose-blog p`** beat the in-article tool panels'
  own classes, so their brand eyebrow and bold title rendered as plain grey body text on
  every mapped-category article. Not a contrast failure, a fidelity failure, and nothing
  in the battery measures fidelity.
- **crypto** (found at its port review, not its uplift): calculator headline labels
  rendered navy inside the navy result panel at **1.06**, on all four calculators and all
  four embeds (`docs/crypto/STATE.md:264`).

RULE: budget the uplift the way the playbook budgets a port. A third of it is live defects
that are not design work, and the design work is what surfaces them.

**A gradient ground has no single colour, so a ring measured against a declared flat colour
is not measured.** charities' replacement ring `#3b8871` clears 3.0 on all **nine** flat
grounds the site paints and measures **1.98** at the composited `via` stop of
`from-primary-900 via-primary-600/90` (`charities/web/src/app/page.tsx:303`), which is
exactly where both hero CTAs sit. contractors-ir35's measured **2.59** on the cyan
`/locations/[slug]` hero gradient, which is laid over a photograph.
RULE: composite **each stop** against what is behind it and take the worst. Where the
ground is a photograph, state the assumption and bracket it, worst case and best case, and
say which you are reporting. Enumerate the grounds from source before you measure:
`grep -rlE 'bg-gradient-to|linear-gradient' <site>/web/src --include=*.tsx --include=*.css`.
This is now row 7 of the playbook's §9.1 gate.

**A brand colour that is also a band ground measures about 1.0 against itself.** On
contractors-ir35 the focus ring was the brand cyan and the dark bands are the brand cyan:
1.00 on `primary-600`, 1.70 on `primary-800`. It was **proved** that no single colour
clears 3.0 on both white and the cyan bands, which makes a third colour (`#0891b2`, from
the site's own ramp) the only correct answer rather than a preference.
RULE: when a brand hue is both the action colour and a section ground, the ring is a
**third** colour by necessity. Prove the impossibility before choosing it, because the
proof is what stops the next agent "restoring the brand colour".

**A comment is a claim, never evidence, and this time it cost a whole package.** A
contractors-ir35 package reported `.section-label` and `.eyebrow` as unlayered rules that
no utility could override, and the manager relayed it. Both are, and always had been,
inside `@layer components`. What actually existed was **15 source comments asserting the
false claim**. The comments were fixed; no CSS moved. The same shape appeared on
construction-cis as **ten stylesheet hex comments publishing the Tailwind v3 ramp as fact
while the site emits v4 oklch** (`primary-600` is `#f54900`, not `#ea580c`), plus two
component files. Every verdict survived, but a v3 hex table sitting in a stylesheet is
precisely how the next port inherits the error.
RULE: the estate already had this rule for live surfaces, "a surface is live because
something renders it". It applies to CSS layering and to colour tables identically. Settle
layering with the matched-rule list, settle a colour with the value the build emits, and
treat every hex written in a comment as unverified until you re-derive it.

**The gate itself counted comments as code, in both directions, on three separate rows.**
Row 2 grepped kit import paths anywhere in `src`, so a package that correctly DECLINED a
component and wrote the reason at the call site scored as if it had adopted it:
construction-cis reported **7 distinct / 20 call sites** where the honest figure is
**2 / 14**, four of the seven matching only inside decline comments. Row 5 carried the same
flaw inverted, reporting `section-label=2` on contractors-ir35's homepage where both hits
are one comment explaining that neither class is reachable. The four-marker thermometer had
it too: it reported crypto at `stats=2`, both hits being the `StatsCounter` decline comment.
RULE: any gate that greps source counts **imports** for adoption and runs everything else
over comment-stripped text (`perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g'`). The corrected
commands are §9.1. The deeper rule: **a metric that rewards writing a decline gets gamed by
an honest agent without either of you noticing**, because the honest behaviour and the
gaming behaviour emit the same bytes.

**A gate that fails a site for the correct outcome is worse than no gate.** Row 2b demanded
at least one kit marketing component on the homepage. construction-cis correctly declined
every one of them on measurement: `LeadCTAPanel` would have **deleted two instrumented
`data-cta` ids and failed a live pinned test**, `StatsCounter` would have silently dropped
four icons, `TestimonialsSection` hardcodes Property's landlord quotes with no `items`
prop. It reported `0` and failed the gate for doing the right thing.
RULE: express an adoption gate as **adopt OR record a measured decline**, and make the two
mechanically distinguishable (an `import ... from` line adopts; any other reference to the
kit path is a decline). Otherwise the cheapest way for the next agent to pass is to ship
the defect. Corollary, and it is what makes the counter-rule auditable: **write the decline
naming the kit FILE PATH**, not just the component name. construction-cis does
(`construction-cis/web/src/components/marketing/LeadCTAPanel.tsx:20-31`); charities and
contractors-ir35 do not, so their correct declines are invisible to the gate that exists to
protect them.

**The three uplifts each found the previous one's lesson already applied, or inverted.
Derive, never inherit.**

- The diagnosis implied charities was flat. It was **more kit-adopted than crypto ever
  was**: 24 eyebrows against zero shouty label chips, and a complete kit page vocabulary
  across eleven hub templates. The row it actually failed was the import bypass, and that
  is the row that mattered.
- crypto, charities and contractors-ir35 each needed a ring carve-out.
  **construction-cis needed none**: its `primary-600` is byte-identical to the outline it
  already painted and clears 3.0 on every ring ground, so it is the only one of the four
  that adopts the kit ring unchanged. Copying the carve-out across would have been noise.
- Adopting the kit's on-dark button on contractors-ir35 **fixed a defect nobody was looking
  for**: the hand-rolled ghost button used `border-white/30`, 2.47 at the copy column's
  right edge, under the 3.0 floor for a button's only visible boundary. The kit's
  `border-white/40` measures 3.20.

RULE: run the measurement on the site in front of you before applying the last site's fix.
Three for three, the inherited conclusion was wrong in a different way each time.

**Counting corrections the commits record.** construction-cis is not `0/0/0/0` on the
four-marker row: it has a `TradeBackdrop` imported 4 times, so only charities and
contractors-ir35 ever scored zero on all four. Five ported sites had a backdrop before this
programme, not six, because the sixth is Property and Property is the source, not a port.
Two agents measuring the same colours on charities disagreed, and it was settled by
converting the `oklch()` Tailwind v4 actually emits and reproducing the estate's two
calibration values exactly: the losing table had been measured against the **v3 hex
constants**, which are different colours. The repo table was right. And on
contractors-ir35, a reported set of `focus-visible` contrast rows was proven an artefact at
the element, four rows being one element at four widths whose scrim is a sibling absolute
div rather than an ancestor, so background resolution fell back to white and reported 1.00
where the real composite is about 7.0.
