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

**The lesson under all five:** the previous port's blueprint is a starting hypothesis, not
a specification. Phase 0 re-derives.

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

**THE BIG ONE, three times in one session: the instrument measured the wrong site.**
`next start` failed to bind because another session held the port, the error went to a log
nobody read, and the sweep crawled whatever WAS on that port and wrote a baseline from it.
Twice it was Medical, once generalist. Caught only by asserting the served page title.
RULE: read the bound port out of the server log and assert the title before trusting any
crawl. Playbook section 13.

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

---

## 7. Conversion evidence, for the sites that have not measured it yet

Solicitors, 18 days post bot-gate, against Property on the same window: 1.16 leads per
1,000 sessions against 9.85, an 8.5x gap. The leak was NOT traffic and NOT form starts
alone; it was start-to-complete, 4.5% against 17.8%. Blog articles produced 40 form starts
and zero completions.

RULE: pull the funnel per template family in Stage 0, post bot-gate only (the gate landed
2026-08-23 and figures spanning it are inflated). It tells you which phase of the port
actually matters for that site, and it is the number the owner will judge the port by.
