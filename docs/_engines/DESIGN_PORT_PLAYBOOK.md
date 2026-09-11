# Design port playbook (Property standard)

Site-agnostic method for porting an estate site to the Property design standard.
Written 2026-09-10 from the generalist port (the O.8 pilot), which ran all six
phases end to end. Everything here is what actually worked or what actually
went wrong. Follow it and you skip roughly a day of rediscovery.

**Next site: `Solicitors/` (Accounts for Lawyers, www.accountsforlawyers.co.uk,
`source_identifier: solicitors`).**

Read alongside:
- `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` for programme scope and site order.
- `docs/generalist/_port/` for a worked example of the per-site blueprint
  artefacts (DISPOSITION_SLICE1-3 + `link_baseline.json`).
- `docs/generalist/STATE.md` top block for the pilot's own outcome and leftovers.
- The `standard_terms` skill. It governs everything below and wins on conflict.

---

## 0. What this is, and the one-line summary

A port moves a site's chrome, templates and page anatomy onto Property's design
system. It is **not** a content programme, an IA change, or a rewrite. Content,
URLs and forms stay unless the owner says otherwise.

The method that works, and the only one that reliably finds defects:

> builder agent → manager verifies → **independent adversarial reviewer against
> the RENDERED DOM** → gap-fix agent → re-review → tag.

Every single review in the pilot found real defects. Two were invisible to
source-only inspection. One was invisible to `tsc` and the test suite as well,
and only a real production build caught it. A review that finds nothing has
failed; say so in the reviewer's prompt.

---

## 1. Owner gates

Ask before, never after:

| Gate | Why |
|---|---|
| The port itself, per site | Owner decision, recorded in the rollout doc |
| Brand swatch and warning ramp | Colour is his call; buttons must clear contrast |
| Capture-surface scope | Any new lead surface changes the funnel |
| Deleting a route | Even an orphan route; check GSC first (§6.T14) |
| Any pricing or claim policy change | See the pilot: 183 fee answers came out on one instruction |
| Anything that interrupts a visitor | Hard rule. Modals, banners, popups, exit intent, and any change to an existing one's timing, trigger, cadence or audience |
| Deploy | Always. Never autonomous |

Decide yourself, and record it:
- Which kit component to mirror locally when the shared one is unusable.
- Whether a link floor is met by a real link or needs a better one.
- Ordering, batching, model tier, agent count.
- Any fix that makes a false statement true (a wrong tax rate, a broken link, a
  fabricated cookie). Those are defects, not preferences.

**In-flow closing panels are not interruptive.** A panel at the end of a page is
not a modal. Do not let a planner file them as owner gates; do not let a builder
turn one into a popup.

---

## 2. Phase map

Tag each phase after its review passes: `port-<site>-phase<N>`.

**A site may split a phase, and then its numbers run ahead of this table. Say
which numbering you mean.** Medical split the chrome phase in two, tokens then
chrome, so its phases are 1 tokens, 2 chrome, 3 blog, and every later phase sits
one ahead of the rows below. The tag and the site's own STATE.md are the
authority for that site; this table is the default shape, not a promise about
what `phase3` means on a given site.

| Phase | Scope | Notes |
|---|---|---|
| 0 | Baseline capture | Production SHA, link-floor baseline, armed monitored_pages, funnel evidence. No code. |
| 1 | Chrome | Header, footer, shell, tokens, backdrop/motif |
| 2 | Blog subsystem | Renderer, index, projection |
| 3 | Article templates, hubs, indexes | 3a templates, 3b hubs |
| 4 | Calculators | Capture gate, tabs, index |
| 5 | Homepage, pillars, locations | The big one. Homepage is a 15-16 section rebuild |
| 6 | Contact, post-submit, about, research, magnets, legal, interruptive restyle, retirements | Last build phase |

Phase 0 is not optional. Without the link-floor baseline you cannot prove you
did no harm, and that proof is the whole safety net.

---

## 3. Orchestration

**The manager (you) never writes page code.** You sequence, gate, verify, commit
and talk to the owner. Manager context is the scarce resource; spend it on
judgement, not on file contents.

**Manager-direct carve-outs** (never delegate these):
- `packages/web-shared/` edits. They touch up to 19 sites.
- All git operations. Every one from the monorepo root.
- Builds, deploys, migrations.
- Owner communication.
- Per-citation factual back-patches where the same figure is right in one
  context and stale in another.

**Parallel vs serial:**
- Builders on disjoint file sets: parallel, one message, multiple tool calls.
- Anything that builds: **serial**. Concurrent builds corrupt a shared `.next`.
- A planner (read-only) can run alongside a reviewer safely.
- Package dependencies force order. In the pilot, WP5 (locations) needed WP2's
  `lib/service-lines.ts`, so WP2 ran first and WP5 followed.

**Model tiering:** Opus for anything a human reads, all content, all reviews,
all planning. Sonnet only for mechanical registry/config work. Never DeepSeek.

**Batch size:** one work package per builder, 3-6 packages per phase. Do not
spawn one agent per file.

**Every prompt must carry** (the pilot lost time to each of these being absent):
- The repo root path and the monorepo-root git rule.
- "Do not run `next build` or `next dev`."
- "Do not run any git write command."
- The exact file list, and an explicit OFF LIMITS list naming the other
  builders' files.
- The locked design decisions and the locked content rules.
- The link floor for each route it touches.
- The acceptance tests, and "report the command and its decisive output line".
- "Never silently skip. Report anything you could not do."

---

## 4. The review contract

Reviewers are **independent** (did not build it) and **adversarial** (their job
is to find failure). Give them:

- The spec sections, the owner decisions, the ground-truth file.
- A **running production server** (`next start`), and the instruction to review
  the rendered DOM by curl, not the source.
- A list of the specific things you suspect. In the pilot, every named suspicion
  turned out to be real.
- An explicit KNOWN AND ACCEPTED list, so they do not re-litigate settled items.
- The output shape: verdict, gaps table with `file:line`, a CLEARED section
  where each line names the command run and the decisive output, and open
  questions in plain non-technical English.

**"Never claim a check passed without running something"** belongs in every
reviewer prompt. So does "finding nothing is a failed review".

Re-review after gap fixes. The pilot's phase-4 re-review found a blocker the
fix pass had introduced (see §6.T7).

---

## 5. Verification contract

Run **all** of these, and re-run them after every content change, not once:

```bash
python scripts/check_dependency_closure.py          # before any deploy
cd <site>/web && npx tsc --noEmit
cd <site>/web && npm test
cd packages/web-shared && npm test                  # if the kit was touched
cd <site>/web && npx next build                     # serialised, nothing else building
cd <site>/web && npx next start -p 3111             # then crawl it
```

Plus the crawl, which is the one that proves no harm:

```python
# all baseline routes at or above their unique-internal-link floor,
# and no em-dash regressions. Scratchpad only, delete after.
b = json.load(open("docs/<site>/_port/link_baseline.json"))
for route, floor in b["links"].items():
    html = fetch(base + route)
    assert len(set(re.findall(r'href="(/[^"]*)"', html))) >= floor
    assert html.count("—") <= b["dashes"].get(route, 0)
```

**Verify on a production build, not a dev server.** If the owner is walking a
dev server, build in a clean git worktree instead of fighting over `.next`:

```bash
git worktree add -f /c/dep-verify <sha>   # short path; long paths break on Windows
cd /c/dep-verify && npm install
```

**Own the noise.** Failed CI runs and failed deploys email the owner. Count them
and report them before he finds them.

---

## 6. Traps

Each of these cost real time in the pilot. The rule is what to do instead.

**T1. Concurrent builds share `.next`.** Two agents building at once corrupts
it. RULE: builders never build. The manager builds, serially.

**T2. A "verified green" build can predate the files it claims to cover.**
RULE: check `BUILD_ID` mtime against the newest source file before trusting it.

**T3. The sibling `.git` husk.** `<site>/.git` exists on some sites and silently
swallows commits, tags and staged files. It bit twice in one session.
RULE: every git command from the monorepo root, always. Put it in every prompt.

**T4. `tsc` and tests do not catch a server/client boundary error.** Passing a
render-prop function from a server component to a client component fails only at
prerender: `Functions cannot be passed directly to Client Components`.
RULE: a real build is part of verification, not an optional extra. Prefer a
serializable prop (a string) over a function prop across that boundary.

**T5. A shared component can have a per-site fork.** The pilot fixed
`packages/web-shared/design/marketing/StatsCounter.tsx` and announced it had
repaired Property. Property runs its own copy at
`Property/web/src/components/property/StatsCounter.tsx` and was untouched.
RULE: before claiming estate-wide reach, grep the import path in the target site.

**T6. Fixing the symptom rather than the rule.** In the location data files the
pound sign is stored as a JSON unicode escape, six literal characters
(`\u00a3`), NOT as the character `£`. So `grep '£'` finds NOTHING and
reports a clean file. A pricing sweep searched for the symbol, "succeeded",
and left 183 breaches of the same rules that happened to contain no pound
sign, costing a whole second pass to find them.
RULE: sweep by RULE, with a pattern list per rule, and prove zero hits per rule.
RULE: whenever a fix is described as "remove all X", ask what representation X
has in the file before searching for it.

**T7. A fix pass can introduce a blocker.** Phase 4's fix wired a result gate on
one page and left the same component ungated in the tab strip on the two
highest-traffic surfaces.
RULE: re-review after every gap fix. Ask "where else does this component
render?"

**T8. Verifying the wrong attribute.** The FAQ crawlability fix used Radix
`forceMount`, and verification checked that the answer text was in the HTML. It
was. But `forceMount` pins `present` true forever, so `hidden` is never set and
every answer renders permanently expanded, on 210 pages.
RULE: verify the attribute that produces the behaviour, not a proxy for it. For
a collapse, that is `hidden`. And check the fix is needed at all: those answers
were already in the FAQPage JSON-LD, which is what crawlers consume.

**T9. A self-test that tests itself.** The caretaker guard asserted against a
local lambda copy of the rule, not the shipped function, so reinstating the bug
would still have passed.
RULE: the test calls the real function. Prove the guard bites by reintroducing
the regression and watching it fail.

**T10. Relaying an agent's summary as verified fact.** "The super-deduction is
fixed" was reported from an agent's summary; it had been fixed in FAQ answers
and left in two case-study bodies.
RULE: the manager spot-checks the rendered page before repeating a claim to the
owner. Correct plainly when wrong.

**T11. Accepting a planner's premise.** A planner reported "six FAQs emit schema
with nothing visible". The builder checked and they were rendering fine.
RULE: put "correct the brief if its premise is false" in every builder prompt.
Reward the pushback.

**T12. The shared kit hardcodes the reference site's copy.** `ProblemStatement`
carries Property's landlord copy with no copy props; `ComparisonTable` forces a
"Most recommended" pill.
RULE: mirror locally rather than shipping the reference site's copy, and log the
kit gap as an owner item. Never edit the kit to fix it mid-port; that changes
Property.

**T13. Removing a prop does not remove its default.** Dropping `featuredBadge`
left the shared default "Most Popular" rendering.
RULE: read the component's defaults before assuming an omission disables
anything.

**T14. Deleting a route silently costs internal links.** Removing `/team` cost
every article 2 unique internal links. Linking the byline to `/about` added
nothing, because `/about` was already in the chrome.
RULE: check GSC before choosing 404 vs redirect (`permanent: true` emits 308,
which is fine). Count the link delta on a real page, and remember that a link to
a destination already in the chrome adds zero unique links.

**T15. Animated counters SSR the start frame.** A count-up from 60% of target
server-rendered "12%" where the answer was 20%.
RULE: any animated number must SSR its true value. Crawlers and LLM scrapes read
the pre-hydration HTML.

**T16. `role="img"` collapses a subtree.** A chart marked `role="img"
aria-label="Bar chart"` makes every value unreachable to a screen reader.
RULE: values as text nodes, decorative bars `aria-hidden`.

**T17. Structured data drifting from the page.** FAQ arrays fed the rendered
FAQ and the schema through two separate `.map()` calls.
RULE: one binding, passed to both. Make it an acceptance test.

**T18. Compliance copy that describes another site.** The pilot found a cookie
policy naming three Google Analytics cookies on a site that runs no GA, and a
contact page promising "we don't share your details" against a policy disclosing
up to six recipient firms.
RULE: every compliance sentence is checked against code that actually runs.
Trace to the call site. A notice that overstates or understates reality is the
defect, whichever direction it errs in.

**T19. Consent wording is a conversion surface.** A change to `leadConsentText`
on 2026-08-24 cut mini-form leads from ~10/wk to 3.9/wk and was reverted.
RULE: never change it as a side effect. Owner decision, with a conversion read.
See memory `consent_wording_conversion_incident`.

**T20. A red CI run is a notification.** The caretaker exited non-zero on BLIND
(a lane that could not look) as well as ALARM, so every run went red over a
permission that will never be granted.
RULE: exit non-zero for a verified defect only. Detail goes to the step summary.

**T21. Windows specifics.** Long paths break git checkouts; use a short worktree
path. `£` and other non-ASCII in a bash heredoc can mangle; match on an
ASCII-only substring and slice by index instead.

---

## 7. Locked rules to paste into every content prompt

- No pricing for our services, including comparative claims.
- No contingent or no-win-no-fee offers (claim-farm idiom, house positions §21.6).
- No turnaround promises.
- No client-behaviour assertions ("most clients prefer").
- No client-count or aggregate-performance claims.
- No "most businesses qualify" framing.
- Every figure re-derivable from `docs/<site>/house_positions.md`, and used
  within its stated scope (watch Scotland fences on income tax and the landlord
  finance-cost reducer).
- No em-dashes. En-dashes fine in numeric ranges.
- Anonymised case-study outcomes and statutory thresholds are retained by design.
- British English.

Content is Opus-only. Two QA tracks on drafted content: adversarial factual
against house positions, and editorial quality.

---

## 8. Per-site parameterisation

Before starting a site, capture and put in the prompts:

1. Site key, display name, domain, `source_identifier` (check
   `<site>/niche.config.json`; the pilot found the memory's value was stale).
2. Production SHA from Vercel `targets.production`.
3. Whether any committed-but-undeployed changes ride the cutover.
4. Armed `monitored_pages` rows and their windows; the cutover re-baselines them.
5. Funnel evidence versus Property, post bot-gate only.
6. The link-floor baseline JSON.
7. Brand tokens, warning ramp, wordmark, motif.
8. The retirement list and the delete list.
9. Which kit components are unusable for this site (T12).
10. `house_positions.md` section numbers for the figures this niche uses.
11. **The two kit-chrome props that must be passed on every port** (added `cb041c9d`,
    both default to Property's exact current behaviour, so a port that forgets them
    inherits Property's, silently):
    - `SiteHeader.ctaContactGoal` — pass the site's own pre-port `data-cta-goal`.
      Default is `"form"`. Getting this wrong splits the site's live funnel history at
      the cutover, so the comparison you read afterwards is against a broken baseline.
    - `SiteHeader.ctaMobilePlacement` — pass the site's own pre-port
      `data-cta-placement` for the drawer CTA. Default is `"mobile_menu"`, which is
      Property's literal. Added `0f4de663`, AFTER the note above was written, because
      the first fix missed it: `analytics/autoCapture.ts` sends placement in the SAME
      `cta_click` payload as goal, so it splits the same series. It is the easiest of
      the three to miss, because the drawer renders only when open and therefore no
      SSR crawl and no page-source review will ever see it. Read the shipped client
      bundle.
    - `SiteFooter.showBuilderCredit` — OWNER DECISION 2026-09-11 REVERSED THIS: the
      studio credit now appears estate-wide, on every ported site, not only the one the
      studio designed. Both consumers pass `true`. The default was already `true`, so a
      new port that passes nothing is correct; do not re-introduce a `false` "fix".
    - `SiteHeader.wordmarkAccentColor` (added 2026-09-11) — optional CSS colour for the
      LIGHT header wordmark's icon and rule. Default undefined keeps `primary-600`, which
      is what both consumers rendered before the prop existed. Pass it when the site's
      brand hex is not a ramp step, or the header shows two different versions of the
      brand colour: Solicitors' crimson `#c41e3a` sits between rose-600 and rose-700, so
      the kit wordmark and the CTA were visibly different reds. The FOOTER lockup is
      deliberately out of scope: it sits on slate-900 where a mid-tone brand hex fails
      contrast and the `primary-400` step is correct.
    - `--brand-primary-text` (CSS custom property, added 2026-09-11, Medical Phase 2) — read
      by `packages/web-shared/leads/MiniCapture.tsx` at the Privacy Policy consent link and
      the two "Step N of 2" eyebrows, as
      `text-[var(--brand-primary-text,var(--brand-primary))]`. It is the step of the brand
      colour that is safe when the brand colour carries TEXT rather than a graphic. A site
      that does not define it renders byte-identically, and Property does not define it. 9
      sites import MiniCapture; only Medical defines the token, to `--copper-deep` `#7d4b22`,
      because brand copper `#b87333` measures 3.79 on white against the 4.5 floor.
    - `--brand-primary-ground` (CSS custom property, added 2026-09-11, Medical Phase 2) —
      read by `packages/web-shared/components/ServiceTiers.tsx` at the "Most popular" badge
      and the featured tier CTA, as `bg-[var(--brand-primary-ground,var(--brand-primary))]`.
      It is the step of the brand colour that is safe as a GROUND under a white label.
      Fallback identical, Property does not define it; Medical sets it to `--btn-ground`
      `#a0622b`. The arbitrary utility with a comma inside `var()` is confirmed emitted by
      Tailwind 4.3.0, verified in the built CSS.
      **The rule both tokens encode, and it generalises to every site:** a mid-tone brand hex
      can clear the 3:1 graphics floor and fail the 4.5:1 text floor, so one brand token
      cannot serve graphic, text-on-white and ground-under-white-text roles at once.
    **Who actually consumes this component, corrected 2026-09-10:** the kit CHROME is
    imported by the ported sites only (generalist, Solicitors, and Medical when it
    lands). **Property is NOT a consumer**: it keeps its own local `SiteHeader` and
    `SiteFooter`. The package is shared by 19 sites; these components are not. A fix
    reasoned about as "19 sites so the default protects Property" is reasoning about
    the wrong set, and the first Solicitors fix made exactly that error: it wired the
    prop on one consumer and left the other still broken.
    - `BlogCategoryHub.heading` and `HubSection.bullets` (added 2026-09-11, Solicitors
      phase 3). Both default to undefined, so Property and generalist render
      byte-identically. `heading` overrides the h1 ONLY, leaving `categoryName` to drive
      the breadcrumb, the essentials eyebrow and the library heading: a ported site whose
      hub h1 reads "Complete VAT Guide for UK Law Firms" over a "VAT and Compliance"
      breadcrumb can adopt the component without retitling either, which would be a copy
      and SEO change. `bullets` renders a `list-disc` list after a section's paragraphs,
      because six of Solicitors' seven hand-built hubs carry list blocks inside their
      published prose and flattening them into paragraphs would restructure copy the
      reader has seen and drop the list semantics a screen reader announces.
    - `BlogSidebarCta.buttonClassName` (added phase 2) keeps the `primary-600` recipe by
      default and lets a site whose button ground is its brand hex pass its own.
    - The kit blog CARD RECIPE was corrected to the contract in phases 2 and 3
      (`BlogListWithSearch`, `HubArticleList`, `BlogCategoryHub`): `ring-1 ring-slate-200/70`,
      not `border border-slate-200`. Consumer set derived by grep, NOT assumed: generalist
      and Solicitors only. Property keeps local copies and is unaffected.
    - `BlogSidebarCta.ctaPlacement` and `BlogSidebarCta.buttonLabel` (added 2026-09-11,
      Medical phase 3, `packages/web-shared/design/blog/BlogSidebarCta.tsx`). Defaults
      `"sidebar"` and `"Book a call"`, which is exactly what every existing consumer already
      rendered, so a site that passes nothing is byte-identical. `ctaPlacement` because
      placement is a live `vw_cta_performance` dimension and Medical's port spec binds
      `blog_sidebar`; `buttonLabel` because the card already took the article's per-category
      copy for its heading and body but had no way to take the matching BUTTON, so the card
      and the form it jumps to could name the same action two different ways.
    - `TableOfContents.stickyDesktop` (added 2026-09-11, Medical phase 3,
      `packages/web-shared/content/TableOfContents.tsx`). Default `true`, the component's own
      pre-existing sticky-plus-max-height behaviour. Pass `false` when the HOST owns the
      column's clamp: two viewport clamps in one column give you a scroll box inside a
      shorter scroll box and a `sticky` that sticks to the wrapper rather than the viewport.
      Six sites import this component.
    Do not add rival props for either; these are the supported hooks.

---

## 9. Definition of done

A phase is done when: built, manager-verified, adversarially reviewed against
the rendered DOM, gaps fixed, re-reviewed, tagged, committed.

A port is done when all six phases are done and:
- Build green, all pages accounted for (a change in page count must be explained).
- Site tests and, if the kit was touched, `web-shared` tests green.
- Dependency closure OK across all sites.
- Every baseline route at or above its link floor, no em-dash regressions.
- Zero 404s on internal links across the ported surfaces.
- Structured data matches what the page renders.
- `docs/<site>/STATE.md` updated in place with: phase commits, the verification
  numbers, live defects found that were not design work, open owner decisions,
  deliberate calls, orphaned analytics ids, and the leftovers ledger.
- Owner walk on a dev server.
- Deploy on the owner's word, from a clean worktree at a pushed SHA.

Then archive the closed memory entries and clean the scratchpad.

---

## 10. Prompt templates

Lift these. They are the versions that worked, including the clauses added after
something went wrong. Replace `<...>` and delete what does not apply.

### 10.1 Preamble, goes in EVERY agent prompt

```
REPO: C:\Users\user\Documents\Accounting (monorepo). Site: `<site>/web`.
Reference to port FROM: `Property/web`. Shared kit: `packages/web-shared/design/`.

HARD RULES:
- Do NOT run `next build` or `next dev`. The manager runs the single serialized
  build. Verify with `npx tsc --noEmit` + `npm test` + source inspection.
- Do NOT run any git write command. The manager commits. Read-only git from the
  monorepo ROOT only, NEVER from `<site>/` (a stale `<site>/.git` husk repo
  silently swallows operations).
- Do NOT edit `packages/web-shared/` (manager-direct carve-out). If the kit
  blocks you, stop and report it.
- Other builders are concurrently editing <list>. ALL OFF LIMITS.
- If any premise in this brief turns out to be false, SAY SO rather than
  inventing a fix for a defect that does not exist.

LOCKED DESIGN DECISIONS: <brand> primary, BUTTONS at the 700 step; warning /
duty / deadline semantics on <ramp>, never amber or orange; <font>; warm
neutrals + slate-900 dark ground; ALL content and URLs stay; NO EM-DASHES in
user-facing copy; reuse the kit before writing anything new.

LOCKED CONTENT RULES: no pricing for our services including comparative claims;
no contingent or no-win-no-fee offers; no turnaround promises; no
client-behaviour assertions; no client-count or aggregate-performance claims;
no "most businesses qualify" framing; every figure re-derivable from
`docs/<site>/house_positions.md` and used within its stated scope.

OUTPUT (all that returns to the manager; self-contained, no preamble):
1. Files created/edited, one line each.
2. Every acceptance test with its command and decisive output line.
3. Link count(s) vs the floor(s).
4. Any copy you authored, in full, for manager fact-QA.
5. Anything you could NOT do and why. Never silently skip.
Be terse. No praise.
```

### 10.2 Planner (read-only)

Add to the preamble:

```
You are a READ-ONLY BUILD PLANNER. Produce an exact, file-by-file spec a builder
can execute without re-reading the blueprint. Do NOT edit any file.

1. Read the relevant spec sections in full.
2. Inspect the CURRENT implementation of each surface AND the Property
   reference. Say plainly where earlier phases already satisfy the spec, rather
   than inventing work.
3. Establish the SMALLEST edit point. If one template renders 193 pages, say so
   and do not propose touching 193 files.
4. Capture the link_baseline floors for every route in scope.

OUTPUT adds: a reality check per surface; 3-6 work packages sized for one
builder each with exact verified file paths, the Property file to port from, the
spec section and an acceptance test; inter-package dependencies so the manager
can sequence; a risks/ambiguities section with YOUR recommended resolution.
Verify every path. Do not guess.
```

### 10.3 Builder

Add to the preamble: the work package's file list, the Property reference file
with line anchors, the spec section, the in-repo consumption pattern to copy
(name a page already ported in an earlier phase), and:

```
ACCEPTANCE TESTS you must run and report the output of:
- <greps proving the retired idioms are gone>
- No hardcoded hex, no em-dashes.
- `npx tsc --noEmit` clean; `npm test` GREEN, counts verbatim.
- LINK FLOOR: `<route>` had N unique internal links at the pre-port baseline.
  You must emit N OR MORE. State your count and how you derived it. If short,
  add genuinely useful links; never pad with duplicates.
```

### 10.4 Adversarial reviewer

```
You are an INDEPENDENT ADVERSARIAL FIDELITY REVIEWER. You did not build this.
Your job is to find where it FAILS the blueprint. Finding nothing is a failed
review; every prior review on this programme found real defects.

READ-ONLY: do NOT edit, commit, tag, or run any build.

A PRODUCTION SERVER IS RUNNING: http://localhost:<port> (`next start`, built
from current HEAD). REVIEW AGAINST THE RENDERED DOM via `curl`, not just source.
Source-only review has missed real defects on this programme.

MANDATORY CHECKS: <list, naming every specific thing you suspect>
KNOWN AND ACCEPTED, do not report as gaps: <list>

OUTPUT:
A) VERDICT: PASS / PASS-WITH-GAPS / FAIL
B) GAPS, most severe first: `file:line` | what the spec says | what actually
   renders | severity (blocker/gap/nit) | the exact minimal fix.
C) CLEARED: one line per mandatory check, with the command run and the decisive
   output line. Never claim a check passed without running something.
D) OPEN QUESTIONS for the owner, in plain non-technical English.
Be terse. No praise. Do not fix anything.
```

### 10.5 Gap-fix

```
You are a GAP-FIX agent. An independent adversarial reviewer failed <phase>.
Fix exactly the gaps below, nothing else. The reviewer will re-run afterwards.

<numbered gaps, each with file:line, what the spec says, what actually renders,
and the minimal fix>

DEFERRED, DO NOT DO: <list, with the reason>
```

### 10.6 Content sweep (rule-based, not symptom-based)

```
The previous pass fixed the SYMPTOM. This pass enforces the RULES, so it must
find breaches that do not contain <the symptom token>.

NOTE ON SEARCHING: <token> is stored as <representation> in this file. Searching
for <naive form> finds NOTHING and will fool you. Known counts before you start:
<counts>.

For each rule, give the regex patterns you searched and prove zero hits.
Rewrite individually: no two answers may share their first 60 characters, and
these are <N> pages that compete with each other in local search.
Report EVERY breach found and fixed as a table: page, rule, old text, new text.
```

Worked example of the escape trap: the pound sign lives in the location data as
the six characters `\u00a3`, so a literal grep is useless.

---

## 11. Session-one checklist for the next site

1. Load `standard_terms`. Read this playbook and the rollout doc.
2. Capture the section 8 parameters. Confirm `source_identifier` from
   `<site>/niche.config.json`, not from memory.
3. Phase 0: production SHA, link-floor baseline, monitored_pages, funnel
   evidence. No code.
4. Owner gate: swatch, capture scope, copy/compliance decisions, deletions.
5. Phases 1-6, each: plan, build in parallel, verify, adversarial review, fix,
   re-review, tag.
6. Full verification contract after every content change.
7. Update `docs/<site>/STATE.md` in place. No second doc.
8. Owner walk on a dev server; build for verification in a worktree so the two
   do not fight over `.next`.
9. Deploy on the owner's word only.
10. Archive closed memory entries, clean the scratchpad, report any CI or deploy
    noise you caused.

---

## 12. Your job: you are the ORCHESTRATOR, not the builder

Read this before you touch anything. It is the single biggest determinant of whether a
port finishes.

**You do not write page code.** You sequence, gate, verify, commit, and talk to the owner.
Your context is the scarce resource on a six-phase port and it is what runs out first.
Spend it on judgement, never on file contents.

### 12.1 What you keep, and why each one is on the list

| Kept by you | Because |
|---|---|
| All git operations, from the monorepo ROOT | A sibling `<site>/.git` husk silently swallows commits and tags. It bit twice in one session. |
| `packages/web-shared/` edits | Shared by 19 sites. Additive only, always defaulting to Property's current behaviour. |
| Every build, serialised | Concurrent builds corrupt a shared `.next`. |
| Deploys, migrations | Owner-triggered, every time. |
| Owner communication | Bundled, plain English, one decision at the end. |
| Spot-checking a claim before repeating it | An agent's summary is not evidence. Open the rendered page yourself. |
| Per-citation factual back-patches | Where the same figure is right in one context and stale in another. |

### 12.2 What you delegate, and how

Delegate the reading as well as the writing. Inventories, greps, disposition drafting,
per-phase reality checks and reviews all go to agents that return TABLES, not file dumps.

- **3 to 6 work packages per phase, one agent per package**, launched in ONE message so
  they run concurrently. Never one agent per file.
- **Disjoint file sets, enforced by an explicit OFF LIMITS list** naming the other
  builders' files. Agents respect it; without it they wander.
- **Agents write their own artefacts.** A disposition slice runs 400 to 650 lines. If the
  agent hands it back in chat you have burned your context for nothing. Tell it to Write
  the file and reply with a receipt only.
- **Serialise anything that blocks.** The brand-layer package blocks every other package
  in the port, because kit components emit `primary-*` classes that render as nothing
  until the ramp lands. Run it alone, first.

### 12.3 The receipt: what every agent returns

Fixed shape, terse, no preamble, no praise:

1. Files created, edited or deleted, one line each.
2. Every acceptance test with its command and its decisive output line.
3. Link counts against the floor.
4. Any copy it authored, in full, for your fact-QA.
5. **Anything in the brief it found to be FALSE.**
6. Anything it could not do. Never silently skip.

Item 5 is not a courtesy. On the Solicitors port every single agent corrected the brief,
and they were right every time: a services count, a hub count, a card-usage count, a
premium-calculator fleet that has no routes and would have emitted five dead links, a
"first sentence" helper that does not exist on that site, and a recommended button colour
that was unnecessary because the live brand already cleared contrast. **Reward the
pushback. An agent that never contradicts you is not reading.**

### 12.4 Model tiering

Opus for anything a human reads, all content, all reviews, all planning. Sonnet only for
mechanical registry or config work. Never DeepSeek.

---

## 13. Running ports CONCURRENTLY, on one working tree

Several sites are ported at once by separate agents, in the SAME checkout. This is normal
and it works, but only under a protocol. The failure it prevents is real: nine writers
once shared a dirty tree, one ran a repo-wide stash to get a baseline word count, hit a
conflict on pop, and resolved it by restoring a sibling's file to HEAD **while another
agent was editing it**.

**Binding rules, for you and in every agent brief:**

1. **Never a repository-wide command.** No `git stash`, `git reset`, `git checkout`, no
   `git add -A` at the root. "Edit only this file" constrains the file, not the
   repository, and that gap is exactly what let the incident through.
2. **Stage explicit paths.** Before every commit run `git status --porcelain` and stage
   only your own. You WILL see other sites' work in progress; leave it alone.
3. **A claim about repository state is checked with a command**, never inferred from a
   failed write. "File has been modified since read" on a single-agent file usually means
   your own earlier write landed.
4. **Commit at the end of each round**, not the end of the session. Uncommitted batch work
   is what is actually at risk.
5. **Ports do not share a `.next`**, because each site builds in its own directory. They
   DO share the root `node_modules`, so never run a root install mid-flight.
6. **The one genuinely shared surface is `packages/web-shared/`.** Before touching it, run
   `git log --oneline -5 -- packages/web-shared/` to see whether a sibling port just
   changed it. Additive only, Property's behaviour as every default, and record the new
   prop in section 8 item 11 of this file in the SAME commit, so the next port inherits it
   instead of inventing a rival.
7. **Read the field notes first and add to them last:**
   `docs/_engines/PORT_FIELD_NOTES.md`. That is where concurrent ports teach each other.

**Port numbers are a shared resource too, and this is not a trivial point.** Three
separate wrong-site measurements happened in one Solicitors session: the server failed to
bind because another session already held the port, the failure went to a log nobody read,
and the instrument happily crawled a DIFFERENT SITE and wrote a baseline from it. Twice
the site was Medical, once generalist.

> **RULE: read the bound port out of the server log, and assert the served page title,
> before you trust any crawl.** Never assume the port you asked for is the port you got.

Start the server redirecting output to a log, sleep, then parse the actual `localhost:NNNN`
out of that log and curl the title to confirm it is your site before running any
instrument against it.

---

## 14. Traps added by the Solicitors port (2026-09-10)

On top of the 21 in section 6. Same contract: each cost real time, each has a rule.

**T22. A design port silently rewrites live analytics segmentation.** Adopting the kit
chrome flipped `data-cta-goal` from `contact` to `form`, and `data-cta-placement` from
`header_mobile` to `mobile_menu`, on every route. Same button, same destination, but both
are live `vw_cta_performance` segmentation values carried in the same `cta_click` payload.
Left alone, the site's funnel history splits at the cutover and the after-reading is taken
against a broken baseline: it looks like a drop that never happened.
RULE: diff the FULL `data-cta` attribute set, id AND placement AND goal, rendered page
against rendered pre-port page, on every phase that touches chrome or a CTA. An id-only
diff passes this defect straight through. The drawer CTA renders only when the menu is
open, so no SSR crawl sees it: read the shipped client bundle.
There is now an instrument: `docs/_engines/instruments/cta_snapshot.mjs` records
`(id, placement, goal, href)` per route, asserts the served page title before measuring so a
collided port cannot measure a sibling site, and also captures `data-cta-id`, the misspelling
that exists in the wild. Capture the triples BEFORE the first chrome commit and diff after
every phase touching chrome or CTAs; the sweep's CTA COUNT is identical before and after and
cannot detect this flip. On Trade the source declared 16 `data-cta` ids and only 5 rendered,
because several sit in config branches that site does not use, so a guard pinning only the
rendered set leaves the rest unprotected.

**T23. The fix pass reasons about the wrong consumer set.** The first fix assumed the kit
chrome was shared by 19 sites and that a Property-preserving default therefore covered
everyone. The component is imported by TWO sites, and Property is not one of them. So the
fix landed on one consumer and left the other broken, in a site already built and awaiting
its owner walk.
RULE: before fixing a shared component, grep the import path across the repo and FIX EVERY
CONSUMER IN THE SAME COMMIT. "Shared by N sites" is a claim; derive it.

**T24. A dependency that resolves only by hoisting accident.** Twice in one phase a new
import resolved because sibling sites had hoisted the package to the root `node_modules`.
It builds locally and fails on a clean install, which is the shape that made the estate
undeployable for nine days.
RULE: `python scripts/check_dependency_closure.py` belongs in EVERY builder brief's
acceptance tests, not only the pre-deploy gate. A new import gets its declaration in the
same commit.

**T25. The contrast instrument cannot resolve `var()` colours.** `browser_check.mjs`
reported 1,644 contrast findings on a site themed through `text-[var(--primary)]`
arbitrary values, including ratio 1.00 white-on-white for combinations that actually
measure 5.84:1 and pass. It falls back to white when it cannot resolve the chain.
RULE: on a site that themes through CSS variables, the contrast half of the browser
baseline is UNUSABLE until the port replaces those values with real ramp classes. The
overflow and anchor halves are sound. Take contrast decisions from a hand-computed table,
self-tested against slate-500 on white = 4.76 and slate-400 on white = 2.56, and re-capture
the browser baseline after phase 1. Never hand the owner its raw contrast output.

**T26. Dropping a font leaves its classes pointing at Times.** Retiring a second typeface
is one line; the 193 `font-serif` classes consuming it are spread across page files that
later phases own, so they cannot be swept in the same commit without colliding with every
other package.
RULE: map the retired family to the surviving one as a documented transitional no-op, so
pages render correctly for the duration of the port. Each later phase deletes its own
classes; the mapping goes when the count reaches zero. Never leave a visible regression in
the tree across phases because the tidy-up belongs to someone else.

**T27. The shared kit carries the reference site's own outbound link.** The kit footer
credits Property's design studio, as a FOLLOWED external link, on every page of whatever
site adopts it. Two sites shipped it without anyone deciding to.
RULE: the T12 family is wider than copy. Audit any adopted component for anything
outward-facing: external links, third-party assets, brand names, `rel` attributes. Ask the
owner before a sibling site links out to anyone.

---

## 15. Traps added by the Trade port (2026-09-11)

**T28. Tailwind v4 emits `oklch()`, so every contrast table derived from a v3 hex table is
wrong, and a ramp utility and a CSS custom property do not render the same colour.**
`node_modules/tailwindcss/theme.css:26-29` ships `orange-400` as `oklch(75% 0.183 55.934)`,
which resolves to `#ff8904` and not the v3 `#fb923c`: 69 summed RGB units. 500 is `#ff6900`
not `#f97316` and 600 is `#f54900` not `#ea580c`, 38 each. Measured across Trade's 17 binding
rows, 10 drifted, by at most 0.38, and NO verdict changed, so this is a precision problem and
not a decision problem, but the table is what the later phases measure against. The half that
bites: `bg-orange-500` renders the oklch value and measures 2.89 on white, while
`--accent: #f97316` renders the literal hex and measures 2.80. On Trade this reconciled two
instruments that appeared to disagree, a hand computation at 2.80 against `browser_check.mjs`
at 2.89, both correct about different subjects
(`docs/construction-cis/DESIGN_DELTA.md` section 2 preamble).
RULE: label every row of a contrast table by SOURCE, utility or token. Measure a utility from
the rendered DOM, or by converting the emitted `oklch()` out of
`node_modules/tailwindcss/theme.css`, never from a v3 hex table. Self-test any converter
against two known values before trusting it.

**T29. A gate whose check nobody can run is a deferral, not a gate.** A port recorded a
BLOCKING item on its definition of done requiring a "section-grounds scan" before the owner
walk. No committed instrument performed one: the scan behind both of its figures was a
throwaway script that no longer existed. It also parsed colours as text, so `oklch()` defeated
it and it scored every unresolved ground as light, reporting 102 breaching routes where the
real figure is 79 and naming two whole route families as in breach when neither was. Fixed by
adding a real `--grounds` mode to `docs/_engines/instruments/browser_check.mjs:83-89`, which
resolves colour through the browser; named at `DESIGN_DELTA.md` section 3a.
RULE: when you record a gate, name the committed command that satisfies it in the same edit.
If that command does not exist, building it is part of recording the gate. And never measure
colour with a parser when a browser is already open.

**T30. An unlayered rule on a shared class silently beats the utility its own consumers chose.**
Third instance in the programme, first in this shape.
`construction-cis/web/src/app/globals.css:209-225` declared `.eyebrow` unlayered, so its
`color` beat `text-orange-400` on the consumers that had correctly picked the on-dark step for
`bg-neutral-900`. A first fix pass recoloured the unlayered rule toward the light ground, which
turned a passing value into a failing one on both dark consumers before the missing layer was
identified as the real defect. The correct fix was `@layer components`, so a consumer utility
wins. Instance two is the heading `line-height` rule in the same file, deliberately unlayered
on the same mechanism.
RULE: before changing a colour on a shared class, enumerate its consumers and check both what
ground each sits on AND whether any already declares its own utility. A class whose consumers
disagree about ground needs a layer, not a different hex. Moving a rule into a layer changes
its precedence against EVERY utility it was beating, not the one you meant, so verify which
selectors ended up inside the block:
`awk '/^@layer components/,/^}$/' <file> | grep -E '^\s+\.'`

---

## 16. Traps added by the Medical port (2026-09-11)

**T31. A base element rule beats an INHERITED value, so layering it is only half the fix.**
The companion to T30. Medical moved its bare `a { color: var(--navy) }` into `@layer base`,
which made every colour UTILITY win, and the footer was fixed. The blog hero breadcrumb was
still navy on navy at ratio 1.04, because its links carried no colour utility of their own
and relied on a `text-white` parent: inheritance loses to any matching declaration, layered
or not. The component looked correct in source review for exactly that reason.
Deriving command: `grep -nE "^[a-zA-Z][^{]*\{" <site>/web/src/app/globals.css` lists every
element rule that can do this.
RULE: any link component that renders on more than one ground declares its own colour class
per variant. Never colour an anchor by inheritance on a site whose `globals.css` styles `a`.

**T32. Two viewport clamps in one column, and both wrong answers read as correct in source.**
An article sidebar holding a CTA card and a table of contents. Nesting a sticky max-height
wrapper around a component that already clamps itself gives a scroll box inside a shorter
scroll box, two scrollbars, and an inner `sticky` that sticks to the wrapper instead of the
viewport. Removing the outer clamp instead leaves the sticky element's containing block a
short static div, so it sticks for a couple of hundred pixels and scrolls away: measured at
1440x900 on a 24,594px article, 440px of the contents list sat below the fold with nothing
able to scroll to it.
The arrangement that works: ONE clamp, on the element that is a direct child of the tall
column, with the inner component's own clamp switched off (`TableOfContents.stickyDesktop`,
section 8 item 11).
RULE: verify by measuring the sticky element's `getBoundingClientRect()` after scrolling, and
by counting scroll containers in the column. Reading the classes cannot distinguish the two
broken arrangements from the correct one.
