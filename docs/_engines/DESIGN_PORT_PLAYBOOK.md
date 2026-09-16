# Design port playbook (Property standard)

## STOP. Read this screen before anything else. (2026-09-13)

**Eight sites are fully ported** (generalist, solicitors, dentists, medical,
construction-cis, contractors-ir35, charities, crypto), tagged. **ALL EIGHT LIVE 2026-09-16**
(`9e43db45`, plus Property with the header fix), header measured on every live domain. **Eight sites remain**: digital-agency, wills-probate,
divorce-finances, startups-tech, pharmacies, care, hospitality, ecommerce. Derive that
list yourself (`git tag -l 'port-*'` against the rollout doc); this line has gone stale
twice, which is the same defect as a STATE.md contradicting its tags.

**FOUR OF THE EIGHT HAVE ALSO HAD THE DESIGN UPLIFT** (2026-09-14): crypto `7dfe04b3`,
charities `ba7b184a`, contractors-ir35 `569d3304`, construction-cis `48312e2c`. Only
crypto's is tagged. The other four ported sites pass the §9.1 kit-adoption gate without
one. **§9.1 was CORRECTED after that programme: it was counting comments as code on three
rows and would have blocked a site for declining correctly. Run the block as written there,
not a remembered one.**

**A PHASE TAG IS NOT THE END OF A PORT.** crypto's six phase-1-to-6 tags sit on ONE commit
and the review fixes land two commits later, so a checkout of `port-crypto-phase6` is
missing every one of them. Tag the final commit `port-<site>-complete` and check that out.

Read `docs/_engines/HANDOFF_NEXT_PORT.md` first; it is rewritten at the end of each port
and is the current state. Follow the **charities/crypto** shape: phase 0 alone and gated,
then phases 1 to 6 as concurrent packages on disjoint file sets, ONE build at wave close
with every verification list executed before tagging, then two independent adversarial
reviews and a gap-fix wave. Budget a mop-up package from the start.

**Read sections 11 and 12 of PORT_FIELD_NOTES.md before the next port.** Section 11 carries an
estate-wide defect, FIXED 2026-09-16 by owner decision: the header CTA never hid below 1024px on
any site because `btnPrimary` opened with `inline-flex` and the header composed `hidden` over it.
The fix splits `btnPrimaryBase` out of `btnPrimary` (kit + the four site-local copies) and the
header composes from the base; the charities and contractors-ir35 CSS overrides are gone. Measured
in headless Chrome on Property, Dentists, contractors-ir35, wills-probate at 390/1023/1024.
RULE stands: verify a hide utility in the RENDERED DOM, never in the class list. Section 12 carries another: `prose` and `section-label` are dead class names on
ten and five deployed sites, 161 live article pages rendering unformatted.

**PREFLIGHT, before you measure anything:**
```bash
netstat -ano | grep ":31"            # 19 orphaned `next start` servers were found listening
taskkill //PID <pid> //F             # kill every one you did not start, then re-check the port is free
git tag -l 'port-*'                  # THIS is what is built, not STATE.md
git log --oneline -20 -- <site>/
node docs/_engines/instruments/grounds_fixture_test.mjs   # an instrument with no passing test is not a gate
```
A STATE.md pickup block that disagrees with the tags is wrong; fix it before you plan.

**PHASE ORDER:** 0 baseline capture **+ CLAIMS AND GROUND-TRUTH AUDIT (§2.1, gated,
serious tier fixed before phase 1 starts)** → 1 chrome → 2 blog → 3 templates and hubs
→ 4 calculators → 5 homepage, pillars, locations → 6 the rest.

**THE FIVE RULES THAT CARRY THE MOST WEIGHT:**
1. **Claims defects are phase 0 work, not phase 5 discoveries.** Roughly 60% of the
   effort on the last five sites went on false content found late by agents doing
   something else. It is cheap at the start and ruinous at the end. §2.1, T36.
2. **Sweep by the RULE and the WHOLE SITE, never by the list you were handed.** Every
   list under-counted: 4 was 13, 3 was 9, 6 was 10, "closed at 23" was 24. Search
   frontmatter and `schema:` JSON-LD, search the arithmetic as well as the words, and
   check the VALUE not the presence of a key. T6, T34.
3. **ONE SITE AT A TIME.** Four concurrent ports in one tree bought no speed and cost a
   sibling's commit, three wrong-site measurements and 19 orphan servers. §13, T37.
4. **Put the pushback clause in every prompt, verbatim** (§10.1). Every agent told to
   contradict a false brief found a real error in it. That is what saved these ports.
5. **Default to what Property does, unless Property is evidently wrong.** Copy
   Property's ANSWER, not its DEFECTS, and never change Property to fix one (T12).

**Budget a third of every port for live defects that are not design work.** That is the
most valuable output a port produces. Report it to the owner as output, not overhead.

Detail: traps in §6, §14-18. Running log in `docs/_engines/PORT_FIELD_NOTES.md`.

---

Site-agnostic method for porting an estate site to the Property design standard.
Written 2026-09-10 from the generalist port (the O.8 pilot), which ran all six
phases end to end. Everything here is what actually worked or what actually
went wrong. Follow it and you skip roughly a day of rediscovery.

**Which site is next: derive it, never read it from here.** This line used to name a
site and went stale the moment that site shipped, which is the same defect as a
STATE.md that disagrees with its tags. Run `git tag -l 'port-*'` for what is already
done, take the order from `PROPERTY_STANDARD_ROLLOUT.md`, and confirm with the owner.

Selection principle, from the five that are done: the remaining twelve are mostly
small (19 to 45 posts against the 82 to 475 just ported), and `digital-agency` is the
outlier at 90 routes and 306 posts. Prove the phase-0 claims audit on a small site
before spending it on the big one.

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
| 0 | Baseline capture **+ claims audit (§2.1)** | Production SHA, link-floor baseline, armed monitored_pages, funnel evidence, CTA triples, claims ledger. No design code. |
| 1 | Chrome | Header, footer, shell, tokens, backdrop/motif |
| 2 | Blog subsystem | Renderer, index, projection |
| 3 | Article templates, hubs, indexes | 3a templates, 3b hubs |
| 4 | Calculators | Capture gate, tabs, index |
| 5 | Homepage, pillars, locations | The big one. Homepage is a 15-16 section rebuild |
| 6 | Contact, post-submit, about, research, magnets, legal, interruptive restyle, retirements | Last build phase |

Phase 0 is not optional. Without the link-floor baseline you cannot prove you
did no harm, and that proof is the whole safety net.

### 2.1 The claims and ground-truth audit (phase 0, gated)

A port is a chrome and template job. A claims audit is a content-integrity job.
**Mixing them is what turned a one-day port into several**, five times running: on
every site so far the serious content defects surfaced at phase 5 or 6, found by
agents sent to do something else, after the design work had already been built on
top of them. Run it as its own work package in phase 0, before any design work.

It covers, site-wide, by rule, including frontmatter and `schema:` JSON-LD:

- Any published figure with no source in `docs/<site>/house_positions.md`.
- The same quantity carrying different values in different places. Construction-cis
  published six different unsourced numbers answering one question, two of them in
  JSON-LD.
- Machine-readable output disagreeing with the visible page.
- Turnaround promises, and any published fee for our own services.
- **Claims to a qualification, a regulator, professional indemnity insurance, or
  performing regulated work.** Several sites claimed to be qualified accountants, to
  hold PI cover, and to be "qualified to deliver the SRA-mandated Accountant's
  Report", each contradicted by that site's own terms page.
- Invented clients, testimonials, case studies and client counts. Generalist used one
  figure 199 times across 193 location "case studies" to mean four incompatible
  things, framed as real clients.
- Compliance copy describing code that does not run (T18).
- Calculator outputs, **including the tests**: four Medical calculators handed a doctor
  a wrong number with two unit tests PINNING the stale values. A test is not evidence
  that a figure is right; it is evidence that it has not changed.

**How to COUNT, added 2026-09-13 (charities got this wrong in both directions in one port).**
`grep -c` understates against built CSS, which is one line: `grep -c primary-600
generalist/web/.next/static/css/*.css` returns 1 for 42 occurrences. Use `grep -o … | wc -l`.
`grep -c` OVERstates against Next.js HTML, because the DOM text is serialised again into the RSC
flight payload: 16 was 8, 2 was 1, 8 was 4. **Report rendered claims as per-page presence (count
files, `grep -ql` each), never raw match totals, and state which you measured.** Verify the
ledger's POSITIVES as well as its negatives: counts have now been found overstated as well as
understated.

**Before calling a site's copy false, check Property.** charities' lead consent text was treated
as a local variant describing a pool the site does not run. It is **byte-identical to Property's**,
and the pool (`Property/web/src/lib/leads/offer-send.ts`) is central, DB-driven and source-agnostic,
so a charities lead reaches the same pool. `docs/_engines/PROPERTY_REFERENCE_ANSWERS.md` §4.
RULE: grep Property for the same string, and establish whether the mechanism the copy describes is
site-local or estate-central, before grading the copy. Consent wording is also gate-load-bearing
(`consentAllowsSharing`, `consent-anchor-drift.test.ts`) and has a conversion incident behind it.

**Also sweep for classes the site emits and nothing defines.** A class that names nothing does not
error, it renders nothing. charities ships `class="prose prose-neutral"` on 32 article pages with
zero `.prose` rules (no typography plugin), and five sites emit `section-label` with no rule, one
of them at contrast 1.22:
```
curl -s <page> | grep -o 'class="[^"]*\bprose\b[^"]*"'
curl -s <domain>/_next/static/css/<hash>.css | grep -o '\.prose[ {,:]' | wc -l   # 0 = dead class
```
Count the SELECTOR, not the substring (`prose-blog`, `not-prose` inflate it).
Estate scope: `docs/_engines/ESTATE_PROSE_SWEEP_2026-09-13.md`, 161 live pages across 10 sites.

**Output: a ledger with a verdict per item** (verified / corrected / unsourced and
removed / owner decision), each row naming the deriving command. Owner gate on the
ledger. **The serious tier is fixed and committed before phase 1 starts.** A false
published statement is never deferred to the phase that owns the file (T34).

**Positioning ruling, 2026-09-12: match what the terms page already says.** The
estate's first-person "we do the work" voice STAYS, because Property uses it heavily.
What goes is any claim to a qualification, a regulator, PI insurance, or regulated work.

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

**Write the phase's package list down before launch and tick it off at close.** Of six
packages in one phase, five were launched and one was forgotten; it was caught only
because the last agent noticed those routes were byte-unchanged. A package is not
complete because you remember launching it. The close check is a receipt per package.

**Cap the fan-out at 6 concurrent agents, and say in every brief whether that agent may
delegate.** Five launched agents became twenty and hit the concurrency ceiling, because
sweep agents spawned their own workers with nobody having told them not to. Default in
the brief: "Do NOT launch subagents."

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

**Assert the JSON-LD PARSES, per URL** (added 2026-09-13). Three charities posts published
`[object Object]` as their JSON-LD in production: `schema:` is a YAML mapping, gray-matter parsed
it to an object, the frontmatter type said `string`, and the renderer interpolated it. Exactly the
three files that declare the key. A check that only looks for the
`<script type="application/ld+json">` tag passes this defect:
```python
for block in re.findall(r'ld\+json"[^>]*>(.*?)</script>', html, re.S):
    json.loads(block)          # must not raise, on every URL
```

**Execute every agent's written verification list at wave close, BEFORE tagging.** Agents return
lists (URL, command, expected result) and run no servers; the manager runs ONE build and executes
all of them against it. On charities that pass is what surfaced the JSON-LD defect above and a
leaked pipeline artefact, "(HP14)", published in the stats strip on `/services/gift-aid`
(`src/data/charity-services.ts:196`). Expect some failures to be wrong expected values in the
briefs rather than site defects: 2 of 30 groups were, and both were brief errors.

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
AMENDED 2026-09-12, and this is the programme's single most repeated method failure.
**Sweeping by the LIST instead of by the RULE under-counts every time.** The Solicitors
audit under-counted every item it reported: 4 places was 13, 3 was 9, 6 was 10. A
turnaround class on construction-cis was formally declared closed at 23 instances across
19 files while a 24th sat live in location `intro` strings three prior sweeps had never
looked at. Every agent that swept by rule found more than its brief contained.
Corollaries, each of which hid a real defect:
- Sweep `faqs`, `keyTakeaways`, `metaTitle`, `metaDescription`, `summary` and `schema:`
  JSON-LD strings, not only body copy.
- Search the ARITHMETIC and the CONCEPT, not only the string. A corrected sentence
  sitting above an uncorrected worked example defeats a text search.
- Check the VALUE, not the presence of a key.
- A correct value in a compute library proves nothing about the prose. On Solicitors the
  library held the flat-rate figure correctly and two invariant tests guarded it while
  eight prose surfaces published it inverted, which is exactly why nobody caught it.

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
AMENDED 2026-09-12, owner's standing rule: **default to what Property does, unless
Property is evidently wrong. Copy Property's ANSWER, not its DEFECTS.** Known Property
behaviours that must NOT be copied:
- `WhatToExpectCard` default props publish a fee line no page authored.
- `FaqSection` is a Radix accordion with no `forceMount`, so closed answers are absent
  from the server HTML while the JSON-LD still asserts them. A crawlability regression
  on any FAQ-schema page; two sites have now refused it in writing.
- `NumberedReasons` animates off keyframe classes its siblings do not have.
When a Property behaviour would publish something false or hide indexable content, say
so and deviate, in writing, in the site's STATE.md.
**Trap 12 still binds and is not negotiable: no work bringing another site to the
standard may change Property in any way, including indirectly via
`packages/web-shared/`.** The two shared defects above are deliberately left unfixed for
this reason and are owner-approved items in their own right.

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
11. **The SIX kit-chrome props that must be considered on every port** (the first added
    `cb041c9d`,
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
    - `SiteFooter.resourcesHref` (added to this list 2026-09-13, charities): default is
      **`"/landlord-tax"`**, Property's own hub. A port that passes nothing derives the whole
      Resources column from a route the site does not have.
    - `SiteFooter.companyItems` (added to this list 2026-09-13, charities): default is
      Property's four routes, **including `/locations`, which 404s on charities**. Pass the
      site's own, and probe every href in what you pass.
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
    - **Contrast is symmetric** (2026-09-13): a hex has ONE ratio and THREE FLOORS, 3:1 as a
      graphic, 4.5:1 as text, 4.5:1 as a ground under text. Ask for one ratio and three verdicts;
      a brief asking for "three ratios" makes the agent invent numbers. charities' `#1a5c4a`
      measures 7.85 and clears all three, so it needs neither token below; Medical's copper
      measured 3.79 and needed both.
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
the rendered DOM, gaps fixed, re-reviewed, tagged, committed, **its build plan committed,
and `docs/<site>/STATE.md`'s pickup block updated IN THE SAME COMMIT as the phase it
describes.** Every package on the phase's written list is ticked off with a receipt.

**Git is the authority for what is built; STATE.md is a claim.** Three pickup blocks
lied to the next session: one said "phase 1 complete, next phase 2" when all six phases
were built and tagged, another said two phases were unbuilt when one of them was tagged,
and Dentists' build plans for the last three shipped phases sat on disk uncommitted. A
fresh agent reading any of them would have redone finished work. Reconcile against
`git tag -l 'port-*'` before you plan, and a phase is not closed until its plan is
committed.

A port is done when all six phases are done and:
- The phase 0 claims ledger is closed, every serious row fixed, and the residue carried
  into STATE.md as owner items.
- Build green, all pages accounted for (a change in page count must be explained).
- Site tests and, if the kit was touched, `web-shared` tests green.
- Dependency closure OK across all sites.
- Every baseline route at or above its link floor, no em-dash regressions.
- Zero 404s on internal links across the ported surfaces.
- Structured data matches what the page renders.
- `docs/<site>/STATE.md` updated in place with: phase commits, the verification
  numbers, live defects found that were not design work, open owner decisions,
  deliberate calls, orphaned analytics ids, and the leftovers ledger.
- **The kit-adoption gate below passes, and its table is pasted into STATE.md.**
- Owner walk on a dev server.
- Deploy on the owner's word, from a clean worktree at a pushed SHA.

Then archive the closed memory entries and clean the scratchpad.

### 9.1 The kit-adoption gate (added 2026-09-14, run at phase 6 close)

Every other gate in this playbook is a contrast, overflow, link-floor or claims gate.
**crypto passed all of them and the owner still said it was not there.** It passed while
sharing almost nothing with the standard it had been ported to: it hand-rolled its own
copies of the kit's primitives instead of adopting them. generalist, the same method on
the same playbook, re-exported the kit and cleared the owner's bar. That control case is
written up in `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md`; the uplift that answered
it is `7dfe04b3`.

**Four sites have now been through the uplift**, all on 2026-09-14, all committed, none
pushed and none deployed: crypto `7dfe04b3` (owner verdict "much better", which is what
approved the other three), charities `ba7b184a`, contractors-ir35 `569d3304`,
construction-cis `48312e2c`. Rows 6, 7 and 8 below exist because of defects those three
found that rows 1 to 5 could not see.

So there is now a gate that asks the one question none of the others did: **did this site
ADOPT the kit, or REIMPLEMENT it?**

Run this from the monorepo root with `DIR` set to the site's directory. It is read-only.

**CORRECTED 2026-09-14 after the four-site uplift programme.** The first edition of this
block had two measurement flaws, both found by agents running it for real on
construction-cis, and both of them the same flaw in opposite directions: **it counted
comments as code.** Row 2 rewarded writing a decline, row 5 punished explaining one, and
row 2b would have BLOCKED a site whose every marketing decline was correct. The commands
below are the fixed ones. Read the notes under the table before you report a number.

```bash
DIR=construction-cis; P=$DIR/web/src/app/page.tsx
KIT='web-shared/design/(marketing|primitives)/[A-Za-z-]+'
# Only an IMPORT adopts a component. Everything else that names a kit path is prose.
IMP=$(grep -rhoE "from \"[^\"]*$KIT\"" $DIR/web/src | grep -oE '(marketing|primitives)/[A-Za-z-]+')
MKT="$P $(ls $DIR/web/src/components/marketing/*.tsx 2>/dev/null)"
# Strips block and line comments, so a comment cannot score as markup.
strip() { perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' "$1"; }

echo "1  layout-utils  : $(grep -c 'web-shared/design/layout-utils' $DIR/web/src/components/ui/layout-utils.ts)"
echo "2  kit adopted   : $(echo "$IMP" | sort -u | grep -c .) distinct / $(echo "$IMP" | grep -c .) call sites"
echo "2a kit declined  : $(grep -rhE "$KIT" $DIR/web/src | grep -vcE 'from \"') comment references naming a kit path"
echo "2b homepage mktg : adopted=$(cat $MKT 2>/dev/null | grep -cE 'from \"[^\"]*web-shared/design/marketing/') declined=$(cat $MKT 2>/dev/null | grep -E 'web-shared/design/marketing/' | grep -vcE 'from \"')"
echo "3  webfont       : $(grep -o 'next/font[a-z/]*\|geist/font[a-z/]*' $DIR/web/src/app/layout.tsx | sort -u | tr '\n' ' ')"
echo "4  backdrop      : $(ls $DIR/web/src/components/layout/ | grep -ci backdrop)"
echo "5  eyebrow ratio : Eyebrow=$(strip $P | grep -o '<Eyebrow' | wc -l) section-label=$(strip $P | grep -o 'section-label' | wc -l)"
echo "6  rings not the token:"
grep -rnoE 'focus-visible:outline-[A-Za-z0-9_-]+' $DIR/web/src --include=*.tsx | grep -vE 'outline-(2|4|8|none|offset)' | sed "s|$DIR/web/src/|     |"
echo "7  gradient grounds to measure stop by stop:"
grep -rlE 'bg-gradient-to|linear-gradient' $DIR/web/src --include=*.tsx --include=*.css | sed "s|$DIR/web/src/|     |"
echo "8  ring guard    : walks=$(grep -rl 'readdirSync' $DIR/web/src/tests 2>/dev/null | wc -l) guards-the-guard=$(grep -rl 'guards the guard' $DIR/web/src/tests 2>/dev/null | wc -l)"
```

Expected result, and each row is a BLOCKER on its own:

| # | row | passes when | what a fail looks like |
|---|---|---|---|
| 1 | `layout-utils` | **>= 1.** The site's `components/ui/layout-utils.ts` re-exports or imports the kit's. A deliberate deviation (crypto wraps the four button recipes to swap an embedded outline, and keeps `focusRing` local) is fine **only if the reason is written above it in that file.** | `0` means every container, section and button recipe is a hand-rolled copy that will drift. Pre-uplift: crypto 0, construction-cis 0, charities 0, contractors-ir35 0. **All four now report 1 or 2**, re-derived 2026-09-14 after `48312e2c`. |
| 2 | kit adopted | **Report the number, always**, next to generalist's **16 distinct / 142 call sites**. There is no numeric floor: the uplifted crypto sits at 6 distinct / 18 and the owner passed it. A port that reports **0 distinct** has not adopted anything and does not close. **Read the DISTINCT count as the signal and the call-site count as an order of magnitude.** | construction-cis pre-uplift: 0 distinct / 0 call sites. crypto pre-uplift: 5 / 20, of which 1 was a marketing component. |
| 2a | kit declined | **Report it, never grade it.** It counts comment references naming a kit path, which is the shape a legitimate decline takes. It is the number the old row 2 was silently ADDING to row 2. It is also a coverage check on the counter-rule: construction-cis reports **6**, and crypto **1**, while charities and contractors-ir35 report **0** even though both declined components correctly, because their decline comments say "NOT the kit FaqSection" without naming the file. | A high row 2a with a low row 2 is a site that declined nearly everything: legitimate only if each decline is measured. |
| 2b | homepage marketing | **`adopted >= 1` OR `declined >= 1`.** The question is not "did you adopt one", it is "did you adopt one **or record a measured decline**". Counted over the homepage plus `components/marketing/*.tsx`, because the closing panel usually lives in a site-local wrapper the homepage renders. **Telling them apart is mechanical: an `import ... from` line adopts, any other reference to a kit path is a decline.** | `adopted=0 declined=0` is the fail: no kit marketing component and nothing written down about why. Property is `n/a`, it is the source and imports nothing. |
| 3 | webfont | **non-empty.** The site loads a real webfont through `next/font`. | Empty means the site renders in `ui-sans-serif, system-ui`. crypto and charities both shipped that; **both now load Geist** (`7dfe04b3`, `ba7b184a`). It is the loudest "unfinished template" signal a non-technical eye reads and it is ten minutes to fix. |
| 4 | backdrop | **1.** A `<Site>Backdrop` component exists in `components/layout/`. Phase 1's own scope line says "Header, footer, shell, tokens, **backdrop/motif**". | `0`. A flat `bg-gradient-to-br` is a div with a colour on it. contractors-ir35 and charities were both `0`; **all eight ported sites now report 1**, re-derived 2026-09-14. |
| 5 | eyebrow ratio | **`<Eyebrow>` >= `section-label`, measured on comment-stripped source.** | The kit's own comment at `packages/web-shared/design/primitives/page-blocks.tsx:27-30` says the old recipe "shouted louder than the heading it was introducing". construction-cis pre-uplift shipped **10 `section-label` and 0 `<Eyebrow>`** on its homepage; today it is 9/0 the other way, across 47 converted call sites. **The comment trap runs here too, in the opposite direction:** the raw grep reports `section-label=2` on contractors-ir35's homepage, and both hits are inside one comment at `contractors-ir35/web/src/app/page.tsx:156,163` explaining that neither class is reachable. Stripped, it is 0. |
| 6 | rings not the token | **Every line printed has a reason written at that line.** Any coloured `focus-visible:outline-*` that is not `outline-[var(--focus-ring)]` is a deliberate carve-out or a bypass, and the row cannot tell you which, so it lists them and you read them. Empty is also a pass. | An unexplained line. Legitimate ones today: crypto 5, charities 2, contractors-ir35 1, all explicit white rings on dark grounds; construction-cis 3 `outline-primary-400`, kept because routing them to the token would have **lowered** them from 7.51 to 4.97. |
| 7 | gradient grounds | **Every file printed has had its ring and its controls measured AT EACH STOP, composited against what is behind it.** A ring measured against a declared flat colour is not measured. | charities' ring cleared 3.0 on all nine flat grounds and measured **1.98** at the composited `via` stop of `from-primary-900 via-primary-600/90` (`charities/web/src/app/page.tsx:303`), where both hero CTAs sit; those two now ship an explicit white ring at 8.42 worst-stop. contractors-ir35 measured **2.59** on the `/locations/[slug]` hero gradient, which hosts buttons. **Where a stop sits over a photograph, state the assumption and bracket it**, worst case and best case, rather than reporting one number. |
| 8 | ring guard | **`walks=1` or more AND `guards-the-guard=1`.** The guard must enumerate every `.tsx` under `src` programmatically (`readdirSync` walk), not pin the shared recipes, and must carry an assertion that the walk found the corpus. | contractors-ir35's guard passed throughout while **29 elements hand-rolled their own ring**, because it imported `layout-utils` and tested only the five recipes. A token fix could not reach those 29. The rewritten guard is `contractors-ir35/web/src/tests/focus-ring.test.ts`; copy its shape. crypto and charities report `walks=0` today and are the two sites still exposed to that class. |

Also paste the four-marker row from the diagnosis §1 into STATE.md, because it is the
cheapest one-line summary of where the site sits:

```bash
S=$(perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' $P)
echo "ping=$(echo "$S"|grep -c 'animate-ping') stats=$(echo "$S"|grep -c 'StatsCounter') backdrop=$(echo "$S"|grep -c 'Backdrop') rounded-full=$(echo "$S"|grep -o 'rounded-full'|wc -l)"
```
**Strip the comments here too.** The raw version reports crypto at `stats=2` and both hits
are the `StatsCounter` decline comment at `crypto/web/src/app/page.tsx:345`, so the marker
that is supposed to say "this site has no stats strip" says the opposite. Same flaw as
rows 2 and 5, third surface.

Property 1/2/3/4 ("wow"), generalist 1/2/3/4 ("looks good"), crypto pre-uplift 0/0/0/0
("not there"). It is a thermometer, not a blocker: **post-uplift and comment-stripped,
crypto is 0/0/3/1, charities 0/0/2/0, contractors-ir35 0/0/2/0 and construction-cis
0/0/4/0, and the owner passed crypto at those numbers**, because the zeros are the
declines below and `rounded-full` is a homepage-copy artefact rather than a kit marker.
Report it; do not chase it.

**THE COUNTER-RULE, AND IT MATTERS AS MUCH AS THE GATE. Adopt the kit unless adopting it
breaks something, and record the reason at the call site.** A gate that forced blind
adoption would have shipped six defects on crypto alone. Every one of these was declined
on measurement, not on taste:

- **`StatsCounter`** takes one number and renders no links. Adopting it would have mangled
  "18% / 24%" and "1 Jan 2027", stripped the separator from "£3,000", and **deleted four
  gov.uk source links** (`crypto/web/src/app/page.tsx:23-43`).
- **`FaqSection`** is a Radix accordion with no `forceMount`
  (`packages/web-shared/design/primitives/FaqSection.tsx:34-43`), so it strips closed
  answers from the server HTML while the JSON-LD keeps asserting them. That is the exact
  defect crypto's phase 0 had just closed on 222 answers.
- **`CoverageCards`** and **`CardStack`** render authored bodies as text children, which
  would print escaped markup and kill the gov.uk citations on the service pages.
- **`ProcessTimeline`** needs content the site does not publish.
- **`StickyCTA`** is an interruption, and those are banned.

A decline is only legitimate when the reason is written **at the call site**, in the file,
not only in a commit body. crypto's `FaqSection` declines are (`app/page.tsx:727`,
`app/blog/[category]/[slug]/page.tsx:160`); its `StatsCounter` decline was not, and was
closed in `c3824681` (`crypto/web/src/app/page.tsx:345`).

**Write the decline so a grep can find it: name the kit FILE PATH, not just the component
name.** `packages/web-shared/design/marketing/LeadCTAPanel.tsx` is countable;
"NOT the kit FaqSection" is not. construction-cis writes them the countable way
(`construction-cis/web/src/components/marketing/LeadCTAPanel.tsx:20-31`, and the same shape
in `ui/NoticeCard.tsx` and `ui/WhatToExpectCard.tsx`, each opening `KIT DECLINE`); charities
and contractors-ir35 do not, which is why row 2a reads 0 on two sites that declined
correctly. This is a documentation defect, not an adoption one, but it is the one that
makes the counter-rule auditable instead of assertable.

**The four-site programme's evidence for row 2b, which is why the row was re-cast.**
construction-cis declined **every** kit marketing component and each decline was correct
and measured: `LeadCTAPanel` would have deleted two instrumented `data-cta` ids and failed
a live pinned test (its API takes the form as a `form` slot and drops `submitLabel` and
`redirectOnSuccess`, the two props every capture surface on that site is configured
through, and lead capture was frozen for the uplift); `StatsCounter` has no icon field and
would have silently dropped four icons; `TestimonialsSection` hardcodes Property's landlord
quotes with no `items` prop. Under the old row 2b that site reported `0` and failed the
gate for doing the right thing. **A gate that fails a site for the correct outcome is worse
than no gate**, because the next agent's cheapest way to pass it is to ship the defect.

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
- Do NOT launch subagents. [or: you may launch at most <N>; say which in every brief]
- VERIFY AGAINST SOURCE. If this brief is wrong, SAY SO and trust the source. Do not
  invent a fix for a defect that does not exist, and do not re-fix something already
  fixed. Report every false premise you find as a numbered item.

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

**Keep the VERIFY AGAINST SOURCE clause verbatim, and know why it is there.** It is the
single clause with the best record on this programme. Every agent given it found a real
error in its brief: three defects it was sent to fix were already fixed, two CTA
attributes it was told to remove had already been removed, a guide it was told to leave
alone was carrying the banned figure, a plan claimed a phase owed work that phase had
already done, and Property's own component would have published a fee line nobody
authored. Reward the pushback. An agent that never contradicts you is not reading.

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

### 10.7 Claims and ground-truth audit (phase 0, read-mostly)

```
You are a CLAIMS AND GROUND-TRUTH AUDITOR for `<site>`. This is NOT design work and you
will touch no component. Ground truth: `docs/<site>/house_positions.md`. Also read
`<site>/web/src/app/terms/` and the privacy and cookie pages: a claim that contradicts
this site's own terms page is a defect whichever one is wrong.

Sweep the WHOLE SITE by RULE, never by a list. Include markdown frontmatter (`faqs`,
`keyTakeaways`, `metaTitle`, `metaDescription`, `summary`), `schema:` JSON-LD strings,
data files under `src/data/`, `niche.config.json`, and calculator source AND its tests.
For each rule give the patterns you searched and prove your hit count.

RULES: published figure with no source in house positions; the same quantity with
different values in different places; JSON-LD disagreeing with the visible page;
turnaround promise; our own fee; claim to a qualification, a regulator, professional
indemnity insurance, or performing regulated work; invented client, testimonial, case
study or client count; compliance sentence describing code that does not run.

OUTPUT: a LEDGER, one row per item: file:line | the claim as published | the rule it
breaches | the deriving command | verdict (VERIFIED / CORRECT IN PLACE / UNSOURCED,
REMOVE / OWNER DECISION) | SEVERITY (serious = false, regulated, or financial; else
minor). Write it to `docs/<site>/_port/CLAIMS_LEDGER.md` and reply with a receipt and
the serious-tier count only.
```

---

## 11. Session-one checklist for the next site

0. Preflight (top of this file): kill orphan servers, prove the port is free, reconcile
   STATE.md against `git tag -l 'port-*'`, run the instruments' fixture tests.
1. Load `standard_terms`. Read this playbook and the field notes.
2. Capture the section 8 parameters. Confirm `source_identifier` from
   `<site>/niche.config.json`, not from memory.
3. Phase 0: production SHA, link-floor baseline, monitored_pages, funnel
   evidence, CTA triples, **and the claims audit (§2.1, §10.7)**. No design code.
4. Owner gate: the claims ledger first, then swatch, capture scope,
   copy/compliance decisions, deletions. Fix the serious tier before phase 1.
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
- **`ls` every path in an OFF LIMITS list before the prompt ships** (2026-09-13): charities
  fenced off `src/lib/charity-services.ts`, which does not exist; the file is
  `src/data/charity-services.ts`, so the fence guarded nothing.
- **Every file in a package has an owner for EVERY defect class in it, not just the package's
  theme** (2026-09-13): the charities homepage was fenced off from the claims agent and assigned
  to an agent fixing links only, so its testimonials, client-base claim, regulated-work line and
  turnaround promise survived the whole wave and cost a sixth gap-fix package. Split by FILE, then
  check the claims sweep still covers every file.
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

**RULING 2026-09-12: DO NOT. Run ONE SITE AT A TIME.** Four sites were ported at once in
one tree. The measured result was a sibling's repo-wide `git add` sweeping 28 of another
site's files into the wrong commit, instruments crawling the wrong site three separate
times, and NINETEEN orphaned `next start` servers still listening days later (seven
copies of one site, five of another), which is the direct cause of the wrong-site
measurements. There was no offsetting speed gain. The remaining twelve sites are small,
19 to 45 posts against the 82 to 475 just done, so serial costs almost nothing.

The rest of this section stands as the protocol for the case where the owner
nevertheless directs concurrent ports, and for the orphan-server hygiene that is
mandatory either way (preflight, top of this file).

The failure it prevents is real: nine writers
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
self-tested against the TAILWIND V4 values, corrected 2026-09-13: slate-500 `#62748e` on white =
**4.77** and slate-400 `#90a1b9` on white = **2.63** (4.76 and 2.56 are the v3 hexes `#64748b` and
`#94a3b8`; check which version the site resolves before quoting either pair), and re-capture
the browser baseline after phase 1. Never hand the owner its raw contrast output.
QUALIFIED 2026-09-11 (Trade): this trap is conditional on HOW a site is themed, not a blanket
property of the instrument. The contrast path paints the colour onto a 1x1 canvas and reads the
pixel back, so it resolves `oklch()` literals and named ramp utilities exactly; Trade's 11:31
capture carried `oklch()` colours on 2,586 of its 5,466 findings and 0 unparseable colours. What
defeats it is the unresolvable `var()` chain above, not the colour space. The test is the
instrument's OWN self-test line plus its unparseable-colour count on the site in front of you,
never an assumption either way. See `PORT_FIELD_NOTES.md` section 5, "the instrument was blind"
entry, for the incident where assuming it cost a whole record set.

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
AMENDED 2026-09-12: **an instrument with no test is not an acceptance gate.** `--grounds`
was repaired FOUR times, three of them in one day, and the second repair introduced the bug
the third fixed. It invented defects on real routes that then had to be disproved, and it
reported counts over bands it had never measured. The third repair of one function was
evidence the function needed a TEST, not another fix. It now has one:
`docs/_engines/instruments/grounds_fixture_test.mjs`, which runs the SHIPPED instrument
against its own server and is mutation-proven against all four historical failures. Run it
in preflight. Any instrument change ships with a fixture test in the same commit, and an
instrument that reports zero prints the size of the corpus it examined next to the zero.

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

**T30 CORRECTION, 2026-09-13 (contractors-ir35, F11): the deriving command below (and in
section 1 of this playbook) is wrong, and it is why a phase-0 audit on this site reported 3
unlayered rules when the real count was 26 — an undercount of 23, believed for two phases.**
~~`grep -nE "^[a-zA-Z][^{]*\{" <site>/web/src/app/globals.css`~~ FALSE claim attached to it:
that this also catches class rules. It cannot — `^[a-zA-Z]` requires the first character to be
a letter, and a class selector starts with `.`. A stricter version,
`^[a-zA-Z.#\[][^{]*\{`, is STILL not good enough: it reads only the last line of a multi-line
selector list, misses `*` and `:where(...)` selectors, and — the real problem — has no concept
of `@layer` boundaries at all, which is the actual question being asked ("is this rule inside a
layer or not"). Two live consequences on this site: `.prose-blog a` beat `text-white` on the
ToolIsland CTA across all 62 blog posts (ratio 1.38), and `.eyebrow` beat `text-cyan-400` on
`/about` and `/contact` (ratio 3.35). Method and full inventory:
`docs/contractors-ir35/_port/F10_UNLAYERED_SWEEP.md` §1.
**Correct method — a brace-depth walk that reports, per rule, the enclosing `@layer` stack (`[]`
or a layer name, never a guess). CORRECTED 2026-09-13 (charities): the earlier version of this
walk iterated `s.split('\n')` and so returned NOTHING against a built stylesheet, which is ONE
line (`charities/web/.next/static/css/*.css` = 46,359 bytes, 1 line); and it opened the file
`utf8`, so a BOM (`crypto` and `generalist` `globals.css` both start `ef bb bf`) glued itself to
the first selector. Walk the CHARACTER STREAM and read `utf-8-sig`. Run it on BOTH the source and
the built CSS; only the built CSS decides layer order.**
```
python - <<'PY'
import re,sys
p=sys.argv[1] if len(sys.argv)>1 else 'src/app/globals.css'
s=open(p,encoding='utf-8-sig').read()
s=re.sub(r'/\*.*?\*/',lambda m:''.join(c if c=='\n' else ' ' for c in m.group()),s,flags=re.S)
stack=[];buf=[];line=1
for ch in s:
    if ch=='\n': line+=1
    if ch=='{':
        sel=' '.join(''.join(buf).split())
        lay=[x for x in stack if x.startswith('@layer')]
        if not sel.startswith(('@layer','@media','@theme','@keyframes','@supports')) and sel!=':root':
            print(f"{line:>6}  {lay[-1] if lay else '*** UNLAYERED ***':<18} {sel[:70]}")
        stack.append(sel);buf=[]
    elif ch in '};':
        ch=='}' and stack and stack.pop();buf=[]
    else: buf.append(ch)
PY
```
**ESTATE-WIDE: every site previously audited with the old grep command (Medical, Property,
Trade/construction-cis, Generalist, Solicitors, Dentists) carries the same undercount and
should be re-swept with the brace-depth walk before being called clean on this dimension.**

---

## 16. Traps added by the Medical port (2026-09-11)

**T31. A base element rule beats an INHERITED value, so layering it is only half the fix.**
The companion to T30. Medical moved its bare `a { color: var(--navy) }` into `@layer base`,
which made every colour UTILITY win, and the footer was fixed. The blog hero breadcrumb was
still navy on navy at ratio 1.04, because its links carried no colour utility of their own
and relied on a `text-white` parent: inheritance loses to any matching declaration, layered
or not. The component looked correct in source review for exactly that reason.
Deriving command: superseded — see the T30 correction above (2026-09-13). This grep only
finds element rules and cannot see class rules at all; use the brace-depth walk given there.
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

---

## 17. Traps promoted out of the field notes (Trade phases 3 and 4, 2026-09-11)

**T33. A guard that reads one file while the defect lives in another.**
`construction-cis/web/src/tests/design/penalty-figures.test.ts` was written in Phase 3 to stop
two wrong tax figures coming back. It pinned a single data file and stayed green while the same
figures shipped on 45 pages out of `src/data/trade-types.ts`, which renders every `/for/[slug]`
route (`generateStaticParams` at `src/app/for/[slug]/page.tsx:15-17`, 45 entries). The test was
not wrong about its file, it was wrong about its corpus. The sibling of T9: there the guard
asserted against its own copy of the rule, here it asserted over its own copy of the corpus.
RULE: a guard against a CONTENT rule enumerates its corpus PROGRAMMATICALLY, never from a path
list, so a new page or data file is covered the day it is added. It carries a guards-the-guard
assertion (`penalty-figures.test.ts:132-138`: a corpus-length floor plus known strings that must
be found) so a broken walk fails loudly instead of passing empty. An empty corpus passes every
assertion in the file.

**T34. A phase boundary is not a reason to leave a wrong published figure.**
The manager fenced one calculator file off from three separate correctness sweeps because a
later phase owned it. That fencing is the sole reason a director-penalty claim the ground truth
bans in capitals (`docs/construction-cis/house_positions.md` section 3, "no 30% figure appears
in either section") stayed live through two passes, in body copy AND in the FAQPage structured
data where Google could quote it. Caught in Phase 4 only because Phase 4 finally owned the file.
Deriving command: `git log -1 --format=%B 72fe3261`, section "WHAT I GOT WRONG".
RULE: scope a CORRECTNESS sweep to the RULE and the WHOLE SITE, never to the phase's route list.
Phase ownership governs design work. It does not govern false statements.
This AMENDS T26 and the section 2 phase map's ownership guidance: "each later phase deletes its own
classes" is a rule about design debt, which is visible and harmless for the duration of the
port. It has never covered a false published statement, and it was read as though it did.

**T35. An acceptance test that is unsatisfiable on arrival gets quietly substituted.**
Every Phase 3 work package carried the acceptance line `totalDashes == 2`
(`docs/construction-cis/_port/PHASE3_PLAN.md:239-241`, stated once for all packages). All 36 of
the site's dashes sat on the 6 calculator pages, and the same plan scopes Phase 3 to `/for`,
`/locations`, `/glossary` and `/resources` and names the calculators as Phase 4's. The assertion
was therefore red on arrival by 34 and no Phase 3 package could move it. In practice the
builders substituted a no-regression assertion, silently, and the real move to 2 happened in
Phase 4. The target is 2 and not 0 because `sweep.mjs:72` counts en-dashes too and two are
protected numeric ranges (field notes section 5, Trade).
RULE: derive every acceptance number from the phase's OWN scope before you write it down, and
check it against the phase's own out-of-scope list. If the phase cannot satisfy it, the number
belongs to a different phase. Leaving one in is worse than omitting it: the plan still reads as
though it was met, and it teaches the next phase that acceptance criteria are negotiable.

---

## 18. Traps from the five-site retrospective (2026-09-12)

Four new. The other lessons of that retrospective AMEND traps already here rather than
duplicating them: T6 (sweep by rule), T12 (Property's own defects, and trap 12's
Property freeze), T29 (an instrument with no test is not a gate), T34 (a correctness
sweep ignores phase boundaries). Read those amendments, not a rival entry.

**T36. Content-integrity defects found at phase 5 are phase 0 defects that were not
looked for.** Roughly 60% of the total effort on five ports went on content that was
false, and almost none of it was design work. Every serious instance was found late, by
an agent doing something else, after design work had been built on top of it: a
fabricated solicitor/barrister domestic reverse charge with a worked example telling
firms to mis-bill; the flat-rate limited-cost-trader rate published as 12% when it is
16.5%, with the scheme recommended on the strength of the inversion; a dentists page
built entirely on a national UDA rate that does not exist, next to invented
testimonials; four Medical calculators handing a doctor a wrong number with two unit
tests pinning the stale values.
RULE: the claims and ground-truth audit is a gated phase 0 deliverable with its own work
package and its own ledger (§2.1, prompt §10.7). The serious tier is fixed and committed
before phase 1 starts. Budget a third of the port for it and report it to the owner as
the port's most valuable output, not as scope creep.

**T37. Concurrent ports in one working tree are pure tax.** Four at once produced a
sibling's repo-wide `git add` sweeping 28 of another site's files into the wrong commit,
three wrong-site instrument runs, and nineteen orphaned `next start` servers still
listening days later (seven of one site, five of another) which are the direct cause of
those wrong-site measurements. No offsetting speed gain was observed.
RULE: ONE SITE AT A TIME (§13). Whatever the ordering, kill every orphan server and
prove the port is free before any measurement, and assert the served page title.

**T38. A STATE.md pickup block is a claim, and three of them lied to the next session.**
One said "phase 1 complete, next phase 2" when all six phases were built and tagged;
another said two phases were unbuilt when one of them was tagged; a third site's build
plans for its last three shipped phases were on disk and never committed. A fresh agent
reading any of them redoes finished work.
RULE: git is the authority. Reconcile against `git tag -l 'port-*'` and the log before
planning, update the pickup block in the SAME commit as the phase it describes, and do
not close a phase until its plan is committed.

**T39. A manager loses a work package, and agents fan out without being told not to.**
Of six packages in one phase, five were launched and one was forgotten; it surfaced only
because the last agent noticed those routes were byte-unchanged. Separately, five
launched agents became twenty and hit the concurrency ceiling, because sweep agents
spawned their own workers.
RULE: write the phase's package list down before launch and tick it off at close, with a
receipt per package. Cap concurrent agents at 6, and state in every brief whether that
agent may delegate. Default: "Do NOT launch subagents."
