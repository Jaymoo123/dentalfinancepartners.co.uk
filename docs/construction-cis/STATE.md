# construction-cis (Trade Tax Specialists) — site state

## PICKUP BLOCK (read this first) - design port, 2026-09-11

**Where it stands.** The Property-standard design port is at **PHASES 0 TO 4 COMPLETE, COMMITTED
AND TAGGED. NOTHING DEPLOYED, NOTHING PUSHED.** Phases 5 and 6 are PLANNED but NOT BUILT.

| phase | tag | commit |
| --- | --- | --- |
| 0 | `port-construction-cis-phase0` | `80a35e16` (artefacts also at `4d2bfeaa`, `03142e02`, `7b4ffaff`) |
| 1 | `port-construction-cis-phase1` | `405faf37` |
| 2 | `port-construction-cis-phase2` | `6575bbb6` |
| 3 | `port-construction-cis-phase3` | `72fe3261` |
| 4 | `port-construction-cis-phase4` | `72fe3261` |

Note the last row: **phases 3 and 4 landed in ONE commit**, so the two tags point at the same
object. **`git diff port-construction-cis-phase3..port-construction-cis-phase4` is therefore an
EMPTY range**: an empty diff there is correct, not a lost commit. Verify with
`git rev-parse "port-construction-cis-phase3^{}"` and the same for phase4. Read
`git log -1 --format=%B 72fe3261` before you touch anything; it is the full account of both phases
and this block is a compression of it.

The port artefacts live in `docs/construction-cis/_port/` and the brand contract in
`docs/construction-cis/DESIGN_DELTA.md`. The slices are the spec, this file is the state.

**Read these, in this order, before you touch anything.** A fresh agent needs no conversation
history, but it does need all nine.
1. `docs/_engines/DESIGN_PORT_PLAYBOOK.md` - the METHOD, and the numbered traps T1 onward.
   "T<n>" always means this file; `PROPERTY_STANDARD_ROLLOUT.md` section 7 has a RIVAL 1-to-15
   numbering that means something else and has already misled a reviewer.
2. `docs/_engines/PORT_FIELD_NOTES.md` - what actually bit the sibling ports this week.
3. This file, whole, including the stale sections below the pickup block that are struck through.
4. `git log -1 --format=%B 72fe3261` - the full account of phases 3 and 4.
5. `_port/PHASE5_PLAN.md`, then `_port/PHASE6_PLAN.md` - both written BEFORE that commit landed,
   so read them against it, not instead of it.
6. `DESIGN_DELTA.md` - the brand contract, the warning ladder and the contrast tables.
7. `_port/LIVE_DEFECTS.md` - TD-01 to TD-35 plus TD-14b/14c and TD-K1/K2.
8. `_port/CLAIMS_REGISTER.md` - every published claim, with the owner-gated ones flagged.
9. `_port/GROUNDS_BASELINE.md` (start at its READ FIRST block, `:3`) and
   `docs/construction-cis/house_positions.md` - the latter is ground truth and it currently
   contradicts itself in the places listed under owner decisions 1 and 2.

**Phases 5 and 6 are PLANNED, NOT BUILT.** Their plans are `_port/PHASE5_PLAN.md` (702 lines) and
`_port/PHASE6_PLAN.md` (779 lines). Both were written before the phase 3/4 commit landed, so read
the commit message alongside them.

**The measured state, verified.** Every number below is from the verification run recorded in
`72fe3261`. Build green at **275 pages**. **422 tests across 26 files.** Dependency closure OK
across **19 sites**. Sweep **246 of 246 routes clean**, **0 dead internal links**, **0 link-floor
breaches at 6,746 links**. Dashes at **2**, and the 2 are the protected en-dashes inside money
ranges (`cis-self-assessment-calculator.ts:125`, `cis-vs-paye-comparison.ts:113`, TD-28); a builder
told to reach zero would corrupt two correct figures. **Ten `data-cta` triples**, with the locked
five byte-identical at **246 / 246 / 109 / 18 / 1**. Section grounds: **dark-on-dark 4** and
**adjacent bands sharing a ground 2**, down from 29 and 48, and the survivors are exactly the
Phase 5 and Phase 6 routes that own them (`_port/GROUNDS_BASELINE.md` section 7).

**What phases 3 and 4 achieved.** Phase 3 took the `/for`, `/locations`, `/glossary` and
`/resources` families, 126 of 246 routes; phase 4 took the calculator fleet and `/embed`. Eight
build packages, four adversarial reviews, five gap-fix passes. Em-dashes 36 to 2 and the ratchet
table is gone, so the guard is flat. The tracked blocking item closed: dark-on-dark 29 to 4, and
adjacency, which nobody was tracking, 48 to 2. **45 trade pages that drew visitors and produced
zero enquiries now carry a reachable ask**: both hero CTAs used to leave the page, there was no
anchor, and the form sat below the FAQ. The published fee band is gone from all 246 routes; it was
recorded as 26 surfaces and was in fact in the Organization JSON-LD loaded from the root layout.
Three guide pages carried prose classes for a Tailwind plugin this site does not install, so they
rendered with browser defaults. Two `<main>` landmarks per route became one. And the 25 city
photographs turned out never to have existed: the hero image code, its scrim and both credit links
were dead branches, so the owner decision about stock photography and attribution was moot.

**The half of phases 3 and 4 that was NOT design work.** Four published statements of tax law,
wrong on live pages, all now corrected:
- **s.62B stated as 20% of the sums returned**, where the statute charges the whole sum. Banned by
  name in `house_positions.md` section 3 and recorded as fixed by a session in June. It survived
  because the definition sentence had been corrected while the worked example three lines below
  still calculated 20%, so the file contradicted itself and a text search passed it.
- **The 12-month CIS300 tier stated as 100%** where it is £300 or 5%, a twentyfold overstatement,
  in four places including a worked example charging £50,000 where the figure is £2,500.
- **A "30% of the tax HMRC considers lost" director penalty**, which the ground truth bans in
  capitals because no such figure appears in either section, live on a calculator in body copy AND
  in FAQPage structured data.
- **The deliberate-and-concealed 100% tier applied to deliberate-not-concealed too**, where the
  statute sets 70%. It told a contractor in the lower tier they faced the maximum, on the page
  whose job is telling them what they owe.

**The root cause, which mattered more than any instance.** `house_positions.md` contradicted
itself in three places: both "practical writing rule" bullets carried the old figures under
corrected tables, and the HP-LOCK header summary carried them too. Those are the lines a writing
session follows, which is why the same error had been corrected twice and re-seeded twice. All
three now match their own tables.

**The guard, which is the part that lasts.** `src/tests/design/penalty-figures.test.ts` was written
in Phase 3 to stop these returning, read ONE file, and stayed green while the defect shipped on 45
pages from a different file. It now walks 200+ files programmatically so a new file is covered
automatically, windows to the containing sentence rather than a fixed character pad (its verdict
previously depended on prose layout: the same clause passed when its qualifier sat within 110
characters and failed when it did not), and carries a guards-the-guard assertion at `:133-138` so a
broken walk fails loudly instead of passing empty. Every rule was proven to bite by injection and
revert. One shape is deliberately left permitted, with the ground-truth clause quoted: a 30% figure
that names s.72A is legitimate, and flagging it would fire on correct published pages.

**Open owner decisions, plain language. None of these are blocked on code.**
1. **The ground-truth penalty phrase is internally incoherent and omits a statutory tier.**
   `house_positions.md:82` reads "12+ months, information withheld deliberately: additional penalty
   up to £3,000 or 100% of the CIS deductions (whichever is higher)". "Up to" and "whichever is
   higher" cannot both be true of the same figure, and the row collapses two statutory tiers into
   one: deliberate-and-concealed is the greater of £3,000 or 100%, deliberate-but-not-concealed is
   the greater of £1,500 or 70%, and the 70%/£1,500 tier is simply absent. Nothing should cite this
   row until he has fixed the wording.
2. **Two further self-contradictions in the same file, found and left for him.**
   `house_positions.md:11` and `:57` cite **SI 2026/289** as the commencement vehicle, while `:61`
   states in the same document that ss.62A/62B and the s.66 amendments commence directly under
   FA 2026 s.222 and that SI 2026/289 must NOT be cited as their vehicle. And `:221`, a watch item,
   still calls the law "**Finance Bill 2026**" and tells sessions to hedge, months after Royal
   Assent on 18 March 2026, which the rest of the file bans outright.
3. **Twelve owner-gated fixed-fee claims.** `_port/CLAIMS_REGISTER.md:319`: the fixed-fee pattern
   returns 16 hits, 12 of them breaches, all 12 owner-gated. They are statements about how we bill
   and only he can say whether they are true.
4. **The four soft turnaround phrases in transactional email**, deliberately left and out of every
   sweep's scope. Live strings: `src/lib/leads/aux-cron.ts:164` and `src/lib/leads/reply-ack.ts:48`
   and `:181` ("Speak soon"), plus the "call shortly" framing documented at `reply-ack.ts:7`. The
   site-facing tier of this defect (23 breaches across 19 files) is closed.
5. **The designer credit wording.** Decision TAKEN 2026-09-11 and recorded at
   `DESIGN_DELTA.md:229`, kept here because it reads like an open item in older notes: the kit
   footer (`packages/web-shared/design/chrome/SiteFooter.tsx:132`) defaults `showBuilderCredit` to
   TRUE and ships the studio's credit as a followed outbound link. "Built by" is literally true of
   Property, which the studio built, and is NOT true of a ported site. Trade's footer is local and
   has no credit block, so the absence is correct and structural. Do not add one. Re-open only if
   he wants different wording.
6. **The dormant pricing config.** `niche.config.json` carries a complete `packages` CTA variant
   publishing our own price list (£24 / £49 / £79 a month) across the hero, the sticky bar, every
   blog CTA and `/contact`. It does not render today because `cta.variant` is `"leadgen"`, so
   `isPackagesMode()` is false. `_port/CLAIMS_REGISTER.md:341` counts **11 dormant claims**.
   Flipping one string publishes all 11 in one commit. TD-02: strip the figures from the variant so
   the switch is safe to throw, or accept the risk in writing.

**What the next session must do first, before Phase 5.**
1. **Re-capture `_port/browser_baseline.json` with the repaired instrument.** The committed capture
   was taken while `browser_check.mjs` was oklch-blind on contrast, so **every oklch-coloured
   element is simply ABSENT from it rather than recorded as passing**. A review already read that
   absence as evidence and reported 16 routes with "NEW problems" that were not new, only newly
   visible. The instrument was fixed at `bf231f1a`; the baseline was not re-taken because it needs
   a running server, so it is a deliberate scheduled step, not a side effect. Until it lands, a
   "NEW" contrast finding derived from a diff against that file must be checked against the source
   before it is believed. See the READ FIRST block at `_port/GROUNDS_BASELINE.md:3`.
2. **Then Phase 5, per `_port/PHASE5_PLAN.md`.**

**Owner decisions already taken 2026-09-11, do not re-ask.**
- Brand stays orange (`#f97316` = orange-500). Warning and penalty semantics move OFF orange.
- All six phases run. **Deploy is owner-gated, every time.**
- Warning ladder T-W1 = red-600 / pink-700 / blue-700 / indigo-900 plus on-dark twins. Four steps,
  evidenced from this site's own penalty content. See DESIGN_DELTA section 1.
- `/admin/analytics/**` is EXEMPT from the port and from the ramp sweep (Medical M-L11 precedent).
- The adjacency metric is tracked as a second row alongside dark-on-dark, per GROUNDS_BASELINE
  section 8.

**The traps specific to this site, still true.**
- **The dash target is 2, not 0.** The sweep regex counts en-dashes, and the 2 survivors are
  legitimate numeric ranges protected by `LIVE_DEFECTS.md` TD-28.
- **Never diff 798 CTA attributes against the committed baseline.** `cta_baseline.json` holds 5
  distinct triples totalling 620 over 246 routes. The live site now returns more, because phases 2
  and 3 added 178 additive ids (82 + 50 + 45 + 1). Both numbers are correct and they are not
  comparable. `_port/PHASE5_PLAN.md:49`.
- **Property renders `header_book` / `header` / `form` for the button Trade calls
  `header_nav_primary` / `header` / `contact`.** Adopting Property's id or goal IS the T22 defect.
  Do neither. `_port/DISPOSITION_SLICE1.md:189`.
- **Property does NOT consume the kit chrome.** Only `generalist` and `Solicitors` do. Trade runs
  its own local header and footer, as Property does. Any argument of the form "the kit default
  protects Property" is about a two-consumer set, not the estate.
- **`StatsBar` here is a pure server component printing a literal string**, so Generalist's
  count-up SSR defect does not reproduce. Do not "fix" it.
- **The 4 research pages carry no `role="img"` and no `aria-hidden` wrapper**, so that defect does
  not reproduce either. `PremiumBarChart.tsx` DOES (TD-K2, byte-identical on Medical).
- **Git Bash mangles bare route arguments into Windows paths.** Pass `MSYS_NO_PATHCONV=1` and quote
  routes as `"//"`. `python` works on this machine; `python3` is a Microsoft Store stub.
- **`grep -c` counts LINES, not matches, and rendered Next.js HTML is one line.** So `curl ... |
  grep -c 'data-cta'` returns 1 on a page with forty of them. Use `grep -o ... | wc -l` for
  occurrences, and prefer the committed instruments at `docs/_engines/instruments/` over anything
  hand-rolled.
- **A path-scoped git command run from the wrong directory returns EMPTY, which looks exactly like
  deleted work.** Check `pwd` before believing any empty `git log`, `git diff` or `git status`
  output. Every git command here runs from the repo root, path-scoped, never repository-wide:
  five sibling sites have uncommitted work in this tree.
- **A dozen sibling dev servers hold ports on this machine.** Never assume the port you asked for.
  Read the bound port out of the server log, then ASSERT the served page title before trusting any
  crawl: three baselines in this programme were written from a sibling site's server. Assert on
  `/` (`CIS Accountants & Construction Tax Specialists | UK`, `src/app/page.tsx:36`), NOT on
  `/blog`, whose title is `CIS and Construction Tax Blog | Guides and Articles`
  (`src/app/blog/page.tsx:14`) and will fail a naive check.
- **Serialise builds against in-flight CRAWLS, not just against other builds.** A `next build`
  replaces `.next` under a running server, so a sweep or a browser run that is mid-crawl starts
  measuring a half-written tree. I reddened `lead-submit-route.test.ts` exactly this way.
- **The premium calculator tier is invisible to every committed instrument.** `PremiumUpgrade` is
  `next/dynamic` with `ssr:false` inside `hidden sm:block`, reachable only from
  `BlogPostRenderer.tsx`, never from `/calculators/[slug]`
  (`_port/DISPOSITION_SLICE2.md:13`, import chain grep-derived). It is live blog-only,
  desktop-only, client-only, so `curl` and `sweep.mjs` both see nothing and a zero finding on
  those five files and 1,172 lines (`_port/PHASE4_PLAN.md:15`) proves nothing. Verifying any
  premium-tier change needs a human, or a real browser, at a desktop width.
- **Corpus, counted at source:** 45 trade types (a `grep -c 'slug:'` wrongly gives 47 because two
  lines are `slug: string` annotations), 12 calculators with `BESPOKE` empty, 82 blog posts across
  8 categories, 50 glossary terms, 25 locations, 3 published resource guides. The older counts
  further down this file are STALE and struck through.
- **Production SHA `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`**, from the Vercel production TARGET,
  not the deployments listing. The working tree is now four phases AHEAD of production for
  `construction-cis/` and nothing has been pushed, so this SHA is the diff reference, not the state.

**Traps this port DISPROVED, corrected here rather than deleted.**
- **The header CTA breakpoint is CLOSED, not open.** Older notes list "the header CTA renders below
  its breakpoint" as an owner decision. Phase 1 (`405faf37`) moved it from `sm:inline-flex` to
  `lg:inline-flex`, matching Property's `SiteHeader.tsx:310` exactly, so Trade and Property are now
  identical on this button. The consequence stands and is the reason it was ever a decision:
  **the button no longer renders between `sm:` and `lg:`, so `header_nav_primary` click counts
  before and after phase 1 do not compare cleanly.** Read any before/after on that id with that in
  mind. `construction-cis/web/src/components/layout/SiteHeader.tsx:282-298`.
- **Navigation unreachable between 768px and 1023px is CLOSED.** The drawer was `md:hidden` against
  an `lg:hidden` burger. Both are `lg:hidden` now, `SiteHeader.tsx:321-326`.
- **79 routes dark-on-dark is STALE.** It is 4, and they are Phase 5 and Phase 6 routes.
- **`browser_check.mjs` resolved every colour on this site (0 unparseable)**, so playbook trap 25
  does not reproduce here. This is still true, and it is NOT the same thing as the oklch contrast
  blindness above: the parser resolved the colours and then classified them wrongly.

**An honest note on `_port/PHASE3_PLAN.md`.** Its work packages all carry the acceptance test
`totalDashes == 2` (`PHASE3_PLAN.md:241`). **That test was unsatisfiable on the day it was
written.** All 36 dashes sat on 6 calculator pages, and PHASE3_PLAN scopes Phase 3 to `/for`,
`/locations`, `/glossary` and `/resources`, listing the calculators as Phase 4's. No Phase 3
package could have moved the number. In practice it was substituted with a no-regression assertion
(the count must not rise), which is what Phase 3 could actually satisfy, and the real move to 2
happened in Phase 4. **The document should be corrected** so the next reader does not take the
number at face value.

**Where this manager went wrong, so the next one does not repeat it.** From
`git log -1 --format=%B 72fe3261` section "WHAT I GOT WRONG", plus what the reviews caught.
- **I fenced the GPS calculator off from three separate correctness sweeps** because Phase 4
  owned the file, having written myself that a phase boundary is no reason to leave a wrong tax
  figure published. That fencing is the sole reason the banned director-penalty claim survived
  two passes, live in body copy and in FAQPage structured data. Now playbook trap T34.
- **I shipped a broken instrument into the SHARED engines folder, and it sat there for six
  commits.** The `--grounds` mode of `docs/_engines/instruments/browser_check.mjs` was committed
  at `61e9b6b2` (85 insertions) carrying three defects, and repaired only at `bf231f1a`. Its
  `isDark` helper pulled the digits out of a colour string and divided by 255, so EVERY `oklch()`
  ground classified as dark regardless of lightness, which is the exact blindness the mode was
  written to replace; its band selector could not see `<article>`; and its opacity filter matched
  only one literal transparent value. Any sibling port that ran it in that window got wrong
  answers. It is shared by every port in the programme. The repaired version self-tests on two
  `rgb()` and two `oklch()` values and refuses to report if the classifier fails, which is the
  discipline the contrast half of the same file already had and which I did not copy.
- **I introduced TWO regressions personally, not one, and neither was visible in the source.**
  The first is playbook T30: I recoloured `.eyebrow` toward a reading I had measured against
  white, when both live consumers sit on a near-black panel where the old value passed at 5.40
  and mine failed at 2.92. The second leaves no trace in the history because it was introduced
  and fixed inside the same Phase 2 commit (`6575bbb6`): moving `.prose-blog a` into
  `@layer components` was the correct structural fix for an invisible button, and it also let the
  shared form's own colours through, taking the privacy links inside every inline enquiry form
  from 3.02 to 2.69. Both were caught only by diffing the rendered DOM against
  `_port/browser_baseline.json`. Neither would have been caught by reading the diff.
- **I cited a cadence tripwire that does not exist** in several briefs:
  `src/tests/intent-engine.test.ts` is named in the source briefs and there is no such file
  (`_port/PHASE4_PLAN.md:713`, `_port/PHASE6_PLAN.md:40`). A builder running it gets a green
  vitest run over zero matched specs and reads it as proof. The real tripwires are
  `src/tests/assistant-journey-opener.test.ts` (cadence, `:832-`) and
  `src/tests/lead-payload.test.ts` (consent). Never modify either.
- **A gate was recorded whose check nobody could run.** The "section-grounds scan" behind the
  blocking item was a throwaway script that no longer existed, parsed colour as text so `oklch()`
  defeated it, and reported 102 breaching routes where the real figure is 79, naming two route
  families that were not in breach. It was only a real gate once `--grounds` was built into the
  shared `docs/_engines/instruments/browser_check.mjs` at `bf231f1a`. Playbook trap T29.
- **A fix pass introduced its own regression, caught only by reading the rendered DOM.** The
  first `.eyebrow` fix recoloured an unlayered rule toward the light ground and turned a passing
  value into a failing one on both dark consumers; the real defect was the missing `@layer`.
  Source review passed it. Playbook trap T30.
- **Agents corrected my briefs more than forty times across these two phases**, including the
  homepage anatomy (12 blocks, not 16) and token contrast figures quoted where the rendered
  utilities differ. Read a brief here as a proposal to be re-derived, not as fact.

**Live defects found that are NOT design work: 37, plus 2 in the shared kit.** Full catalogue with
file and line in `_port/LIVE_DEFECTS.md` (TD-01 to TD-35, with TD-14b and TD-14c, plus TD-K1 and
TD-K2). Still open and worth knowing:
1. `DetailsForm.tsx:192` tells the user "we only use this to arrange your free review" on the page
   that collects their phone number, against a privacy policy disclosing sharing with up to six
   firms.
2. **Every primary button on the site is white on orange-500 at 2.80:1**, below even the 3:1
   graphics floor. Article links measure 3.16, the eyebrow 2.68, the footer fine print 2.42.
   Measured two independent ways, hand-computed and instrument. The token layer is in; the
   remaining instances are Phase 5 and 6 surfaces.
3. `StickyCTA.tsx:147` ships `data-cta-id`, which `autoCapture.ts` does not match, so the site's
   only persistent site-wide CTA has never once recorded a click.
4. TD-34: refund-average instances that are hedged as typical or illustrative, which house
   positions section 13 permits, but carry no source. Open, low priority.
5. TD-02, the dormant price list. See owner decision 6.

**Conversion reality, and it reorders the work.** Post bot-gate, 19 days to 2026-09-11: **203 clean
sessions, and 3 leads in the site's entire history** (first 2026-08-17). 4.93 leads per 1,000
sessions against Property's 10.80. The leak is sessions-to-form-start, 0.99% against Property's
6.16%, a 6.2x gap, and NOT start-to-complete. By family: blog articles 110 sessions and ZERO
completions; CIS template pages 27 sessions with 28 download clicks; `/for/[slug]` 24 sessions and
zero form views; **the homepage got 4 sessions and the three service pillars got 1 between them.**
So the homepage rebuild stays in scope but is NOT the centrepiece, and the blog plus the template
family carry the upside. Phase 3 closed the `/for/[slug]` half of this: the hero CTAs no longer
leave the page and the form no longer sits below the FAQ.

**An estate-wide analytics finding, not specific to this site.** `web_events.is_bot` does NOT
inherit `web_sessions.is_bot`: 18.2% of this site's nominal sessions and 9.0% of Property's are
flagged bot on the session row and clean on the event rows. Every figure above uses the strict
both-flags-clean definition. Medical's `_port/FUNNEL_BASELINE.md` numbers are loose-definition and
are inflated by this.

**Known fragile test, not a port defect.** `src/tests/lead-submit-route.test.ts` does a cold dynamic
import taking 4.64s against a 5s timeout. It fails under concurrent load and passes isolated. I
reddened it once myself by running the suite during a build. Raising its timeout is a leftover, not
port work.

---


Last updated 2026-06-16. The 8th estate site. **LIVE + HEALTHY at www.tradetaxspecialists.co.uk** (227 routes). Deployed to prod 2026-06-16 (the DB migrations had ALREADY been applied in the rushed pre-break session, so the site was serving traffic before this session; this deploy shipped the QA-clean content + 4 conversion levers).

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **30 commits** were on
the branch and not in `origin/main`.

**All 30 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'construction-cis/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'construction-cis/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## 2026-06-16 session — finish + nail it (DONE)

- **Content QA:** the 41 un-QA'd wave-2/3 posts taken through the Opus independent-QA chain over **4 rounds** to all_clear; pre-deploy gate `predeploy_gate.py --site construction-cis --qa-batch cc_wave2_3` = **PASS**. Corpus-wide seeded-error fixes (manager-direct): **s.62B = 100% not 20%**, **PDS deadline = 14 days after end of tax month**, **Reg 24ZA → 23A** (public-sector exemption, verified SI 2026/289 enacted — HP §10 + SITE_PLAN §8 corrected), CIS300 penalty maths, deemed-contractor £3m-rolling exit, retention tax-year allocation, stale software prices, cis-vs-paye take-home→tax-saving reframe.
- **Conversion levers (all shipped + verified live):** B1 inline calc-result capture (MiniCapture, embed-excluded), B2 sticky CTA, B3 `/research/uk-construction-index` data-PR asset (Companies House ingestion + charts + CSV + JSON-LD), B4 personalization/intent engine (one additive shared experiments-registry edit). AN-01 browser pass ALL GREEN post-deploy.
- **Open follow-ups:** IndexNow sitemap submission (retry — Bing first-time verification delay; key file live); GA4 measurement id + GSC sitemap upload (operator); ~~blog_topics seeding (deferred)~~ **DONE 2026-07-14: 299-cluster pool seeded from GSC+Bing+DataForSEO, 221 net-new vs 208 live pages — see docs/_engines/CONTENT_GAP_ENRICHMENT.md**; monitored_pages registration; live test-lead (held for sign-off — pipeline structurally verified).

---

## (pre-launch runbook below — historical; site is now live)

---

## RESUME HERE (next manager)

~~The site carries **35 blog pages** (wave 1 = 15 through the full QA chain; wave 2 = 20 written but NOT yet QA'd), build green (95 static routes). Calculator fleet live (8 tools). Trade pages = 15.~~ **STALE. Corrected 2026-09-11: 82 posts, 12 calculators, 45 trade pages, build green at 275 pages. See the PICKUP BLOCK at the top of this file.** Schema layer fully wired. llms-full.txt includes calculator fleet.

Wave-2 posts written 2026-06-12: 5 Opus pillars (cis-april-2026-rule-changes, cis-self-assessment-complete-guide, cis-vs-paye-complete-comparison, gross-payment-status-cash-flow-guide, cis-back-years-refund-guide) + 15 Sonnet clusters (see content/blog/ for full list). Same QA standard: HP-locked figures, no em-dashes, raw HTML body, 6+ FAQs per post. **Wave-2 posts HAVE NOT had the formal QA sweep chain run** (sweeps + judge panels + fact-auditor) — this is the next step before deploy.

Conduct rules: Sonnet for judging panels and cluster writes; Opus only for pillars, repairs, and fact-auditing (model-tiering memory: feedback_no_deepseek_opus_only, Amendment 4).

Outstanding, in order:

0. **Wave-2 QA chain (run before deploy):**
   - Sweeps: em/en-dash zero, markdown-in-body zero, stale figures, frontmatter/category/slug/link audit
   - Judge panels: Sonnet on 15 clusters, Opus on 5 pillars
   - Fact-auditor: batch Opus web-verification of all off-HP figures across wave-2 posts
   - Wave-1 back-patch: add calculator CTAs to existing 15 wave-1 posts where relevant (manager-direct, ~30 mins)

1. **DB migrations + topic seeding (sign-off required):**
   - Re-read live constraint definitions before applying (schema may drift). Then apply:
     - `supabase/migrations/20260614000001_add_construction_cis_to_sites.sql` (sites registry row + `sites_site_key_check`)
     - `supabase/migrations/20260614000002_add_construction_cis_to_leads_source.sql` (`leads_source_valid` check)
   - After apply: run autocomplete expansion against CIS keyword seed to populate `blog_topics` rows, then mark wave-1 and wave-2 slugs used in the registry.

2. **Deploy day** (user go-ahead gated; local review first):
   a. DONE 2026-06-13: Vercel project **trade-tax-specialists** created in team `sitenudge-projects` (team_XF9WAygZX7SGk9Fo4tOAnihH), project ID `prj_zaehvfgdTKx0Ftc8GQVedmRnjp4g` (also in `.cache/construction_cis/vercel_project.json`). Framework Preset **Next.js**, Root Directory **construction-cis/web** set at creation (no null-framework trap). Domains attached: `www.tradetaxspecialists.co.uk` (primary) + apex 308→www. User pointing DNS at registrar (CNAME www → `cname.vercel-dns.com`, apex A → `76.76.21.21`).
   b. DONE 2026-06-13: public env vars set (production+preview): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   c. DONE 2026-06-13: all 5 env vars set. `SUPABASE_SERVICE_ROLE_KEY` added by user; `ADMIN_DASHBOARD_KEY` = the shared estate console key (per user: one unified console at estate-console.vercel.app, all sites share the same admin key; no per-site passwords). Estate console picks the site up automatically from the `sites` DB row (active=true, registered 2026-06-12) with default analytics+leads capabilities.
   d. Deploy from **repo root** with `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` env override: `vercel deploy --prod`. (Do not run from inside the web dir — `vercel.json` `installCommand` uses `cd ../..`; cloud rootDirectory build is the proven path.)
   e. Live battery: analytics opt-out stops beacons probe; console auth check (/api/admin/login 303-wrong-key / cookie on right key / authed dashboard); ingest verify (web_events rows `site_key='construction-cis'`); security headers probe; feed.xml + llms-full.txt both 200.
   f. **Test-lead protection before submitting test form:** `ALTER TABLE leads DISABLE TRIGGER leads_to_email_trg; ALTER TABLE leads DISABLE TRIGGER leads_to_enrich_trg;` — the notify route CC's ahmadtirmizey@reflexaccounting.co.uk on every leads insert; disable both triggers, submit test lead, verify row + consent fields + stitching, re-enable both triggers, DELETE the test row.
   g. DONE 2026-06-13 (user): domain purchased, DNS pointed, domain added in Vercel. GSC property + Bing set up by user.
   h. GA4 property → measurement id → `niche.config.json` `seo.google_analytics_id` + `optimisation_engine/clients/ga4_config.py` → redeploy. (GSC/Bing properties already created by user 2026-06-13; enable in engine gsc config once data flows.)
   i. **Immediately after deploy (agreed 2026-06-13):** submit IndexNow for ALL site URLs (every sitemap entry, ~210 routes; key `e23614f9759b971c52b602307ed7522b`, public file already at `public/e23614f9759b971c52b602307ed7522b.txt`); user then uploads sitemap.xml in GSC. Register shipped pages in `monitored_pages`.
   j. `python scripts/spinup_site_check.py construction-cis` → expect all-PASS (09-vercel-link will be a GAP until after step a).

3. **Parked until post-launch:**
   - Wave 3+ (seeding-driven; run autocomplete expansion first per step 1 above).
   - Calculator fleet is LIVE (8 tools: cis-refund-estimator, cis-take-home-calculator, cis-deduction-calculator, cis-self-assessment-calculator, cis-gps-eligibility-checker, cis-vs-paye-comparison, cis-invoice-splitter, cis-back-years-calculator).
   - GSC-dependent optimisation engines (SITE_RULES + CORE_PAGES deferred until engines first run here per SITE_SPINUP convention).
   - Experiments composition (estate-wide shared change; defer to experiments rollout).

---

## Identity

- site_key `construction-cis` · display "Trade Tax Specialists" · domain `www.tradetaxspecialists.co.uk` (PURCHASED 2026-06-12; was Build Finance Partners / buildfinancepartners.co.uk pre-rebrand)
- Brand: construction orange `#f97316` primary + slate `#1e293b` dark; accent light `#fdba74` (orange-300 on dark); background `#fafaf9` (off-white stone-50); Geist Sans (estate standard). Distinct from Property (emerald), cfp (petrol/cyan), Generalist (ink+orange).
- Storage prefix **`bfp` FROZEN** (estate registry: ptp/dfp/ma/afl/aff/hd/cfp/bfp; registered in `docs/_engines/SITE_SPINUP.md`)
- Niche: CIS / construction accounting, UK sole traders and limited company directors in construction trades. Estimated CPC £8-18; HMRC-registered sub pool 1.4m+.
- Lead source identifier: `construction-cis` (PF-07 throughout, consent checkbox mandatory)

---

## Machinery

All composed; build green (32 routes, 21 tests).

- Analytics SDK: ConsentProvider / AnalyticsProvider / ConsentedScripts, opt-out posture; `/api/track` via `createTrackHandler`; no key literals (PF-07)
- `/admin/analytics` console (shared cookie auth) + `/api/admin/login` + `/api/og` (brand colours from config)
- `buildSecurityHeaders`; `validateNicheConfig`; `assertFrontmatter`; `feed.xml`; `llms-full.txt`
- LeadForm: consent checkbox (LD-04), honeypot, visitor stitching, source `construction-cis`
- Blog apparatus: `/blog` + `/blog/[category]/[slug]`; nested routing (not flat); 7 categories; canonical `/blog/{category-slug}/{slug}`
- Service pages: `/cis-refund` (Tier 1) + `/gross-payment-status` (Tier 1); 10 static `/for/[type]` trade pages via `src/data/trade-types.ts`
- Nurture: not built (no newsletter surface). Calculators: deferred post-launch. Experiments: not composed (estate-wide change; defer to rollout).
- CI: added to `.github/workflows/ci-build-test.yml` build matrix. Vitest wired into `npm test`.
- IndexNow key file: `public/e23614f9759b971c52b602307ed7522b.txt`

### Build incidents (lessons recorded)

**Fabricated scaffold report:** The first Sonnet scaffold agent's completion report was premature and fabricated; approximately half the page layer was missing. Manager caught it by independent re-verification via tree diff against the contractors-ir35 reference. A repair agent and the original agent running in parallel completed the tree. **Lesson: always re-verify agent build claims manager-direct before proceeding to content.**

**YAML frontmatter quoting:** 12 of 15 wave-1 files had unquoted colons in working titles (YAML parse error); one file had a stray `</faqs>` tag. Manager wrote a deterministic Python quote-repair script; all 15 files patched; sweeps and build re-run clean. **Lesson: brief writers to quote any title containing a colon; add frontmatter lint to the QA sweep chain.**

---

## Data layer (local, NOT applied to prod)

- Migrations drafted local-first (prod access permission-gated; apply after user sign-off; re-read live constraints at apply time):
  - `supabase/migrations/20260614000001_add_construction_cis_to_sites.sql`
  - `supabase/migrations/20260614000002_add_construction_cis_to_leads_source.sql`
- Blog generator config: `optimisation_engine/blog_generator/site_configs/construction_cis.py` + `routing_safety.py` prefix entry; import-verified; dry-run seed clean. Topic seeding pending (autocomplete expansion step, post-migration).
- Engine maps registered: GSC `_SITE_URL_MAP`, Bing `DEFAULT_SITE_URL`, IndexNow config (key `e23614f9...` + public file), `cli.py` choices. SITE_RULES / CORE_PAGES deferred until engines first run here.
- Vercel project: NOT created (Vercel CLI not installed locally; deploy gated on domain purchase). 5 env vars not set. GA4 / GSC / Bing properties = post-domain operator items.
- Nothing committed to git (no-auto-commit rule); everything in working tree.

---

## Content

### HP lock

`docs/construction-cis/house_positions.md` — 13 sections, FA 2026-verified, manager spot-checked at lock. §11a addendum added post wave-1 audit with verified 2026/27 supplementary figures: Class 4 6% / 2%, PA £12,570, SSP £123.25/week, MTD quarterly deadlines 7th, Class 2 £0 above £7,105 profits threshold, use-of-home flat rates, HMRC helpline 0300 200 3210, EPS 25-working-day target. Watch items in the HP (re-check before citing): CIS gross payment status enacted-status of April 2026 Finance Bill provisions.

### Wave 1 (CLOSED 2026-06-12)

15 pages: 3 Opus pillars + 12 Sonnet clusters. Full QA chain executed: deterministic sweeps all PASS (em/en-dash zero, markdown-in-body zero, stale figures zero, frontmatter/category/slug/link audit clean); 15 judge panels (Opus on 3 pillars, Sonnet on 12 clusters) returned 12 SHIP + 3 REPAIR, all repaired; 1 Opus fact-auditor web-verified every off-HP figure across all 15 pages.

Fact-audit findings, all fixed manager-direct:
- **cis-deduction-rates-explained**: Class 4 9% stale; corrected to 6%; worked example recomputed (refund £4,388).
- **allowable-expenses-cis-subcontractor**: plasterer table Class 4 9%→6% (saving £1,367); Class 2 £180→£0 (above £7,105 threshold); total and refund (£3,075) recomputed; refund range lower bound raised £1,500→£2,000 per HP §13.
- **cis-vs-paye**: SSP £116.75→£123.25.
- **mtd-income-tax-cis**: MTD quarterly deadlines 5th→7th.

Panel repairs: cis-limited-company-reclaim (missing what-is-cis up-link added, duplicate removed); cis-monthly-return-guide (Reg 24ZA Finance Bill 2026 hedge added, "cumulative" penalty annotation removed).

Full record: `WAVE1_TRACKER.md`.

### Model tiering observed

Sonnet: scaffold, configs, cluster writes, cluster panels, all docs. Opus: house_positions, 3 pillar writes, 3 pillar panels, 1 batched fact-auditor. Haiku: banned from content. DeepSeek: banned. Per memory `feedback_no_deepseek_opus_only` Amendment 4.
