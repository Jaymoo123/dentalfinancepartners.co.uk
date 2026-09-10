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
    - `SiteFooter.showBuilderCredit` — pass `false`. Default is `true`, which puts
      Property's designer credit, a followed outbound link, on every page of the ported
      site.
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
