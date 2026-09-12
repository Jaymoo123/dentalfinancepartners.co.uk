# TRADE DESIGN PORT, PHASE 6 PLAN: CAPTURE + POST-SUBMIT, ABOUT, RESEARCH, TEMPLATE DOWNLOADS, LEGAL, INTERRUPTIVE STACK, MACHINE SURFACES, RETIREMENTS

Site: `construction-cis/web` (Trade Tax Specialists). Written 2026-09-11, planner pass. No code
written, no file edited outside this one. **Six work packages**, one strictly first, one strictly
last, three concurrent in the middle (section 6).

This is the **final build phase**. Section 11 carries the port-level definition of done, which is
the contract for the owner walk, not just for this phase.

**Method.** Every number below was measured against the running post-Phase-3 production server at
`http://localhost:3261`, with the served `<title>` on `/` asserted as
`CIS Accountants &amp; Construction Tax Specialists | UK` before anything was trusted. `/blog`'s
title differs and was never used as the assertion. Link counts re-derived with the sweep
instrument's own metric (`<a href="/..."`, hash and query stripped, `_next` excluded,
`docs/_engines/instruments/sweep.mjs:156`). CTA triples re-derived live, not read off
`cta_baseline.json`. Importer counts re-grepped. Every file path named was opened. No build, no dev
server, no test run, no git write command. All git commands were run from the repo root, read-only
and path-scoped; `pwd` asserted as `/c/Users/user/Documents/Accounting` first.

**Binding spec.** `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §D (D.1/D.2/D.3, read in full), §F.6,
§F.7, §A.1-A.8, §I, §N; `docs/property/DESIGN_SYSTEM.md` §0 (esp. §0.5), §4d, §5, §7, §9;
`DESIGN_DELTA.md` §1, §2 (preamble read before any figure was quoted), §3, §3a;
`_port/DISPOSITION_SLICE3.md` (the starting spec, reconciled in section 0);
`_port/PHASE2_PLAN.md` and `_port/PHASE3_PLAN.md` (artefact shape, and precedents inherited);
`_port/LIVE_DEFECTS.md` (TD-01..TD-35, TD-K1, TD-K2); `_port/GROUNDS_BASELINE.md`;
`link_baseline.json`, `cta_baseline.json`, `sweep_baseline.json`; playbook traps T6, T14, T16, T17,
T18, T19, T22, T23, T24, T26, T30.

---

## DELTA, re-derived 2026-09-12

**Read this before section 0.** This plan was written on 2026-09-11 by a planner standing in front of
an uncommitted Phase 3 working tree, before Phases 4 and 5 existed. Phases 3, 4 and 5 have since
landed and are committed. Everything below was re-derived against the tree at `dd935a98`, read-only,
no build and no server. Where a statement later in this file disagrees with this section, **this
section wins**.

### DL-1. Phase 3, 4 and 5 are COMMITTED. Section B2 is now actively misleading.

`git status --porcelain -- construction-cis` is **empty**. The working tree is clean. B2's instruction
to "read the working tree, and do not assume `git log` reflects what the server is serving" was true
on 2026-09-11 and is false now: `git log` is the record.

Verified with `git log -1 --format='%h %ad %s' --date=short <sha>`:

| sha | what |
|---|---|
| `72fe3261` | Phases 3 and 4 build, plus the tax figures they were carrying |
| `da7ec668` | Phase 5 build: homepage, `/services`, and the two pillars |
| `aab3886b` | Phase 5 gap-fix, three blockers from the factual review |
| `8ea5aea9` | Phase 5 review gaps: the orphaned `#book` ask, and the invisible closing band on `/cis-refund` |
| `05ddb709` | the `#book` panel wrapper was swallowing every click inside the form |
| `32dc4c90` | Phase 5 artefacts and the re-captured browser baseline |
| `dd935a98` | Phase 5 re-review and final verification results |

B2's row in section 0a is corrected in place. Its underlying point still stands in one narrow form:
`DISPOSITION_SLICE3.md` predates all five builds, so it is a hypothesis, not a specification.

### DL-2. Section 4a's triple table and its "798 across 9 triples" arithmetic are superseded.

Deriving command, run at the repo root:

```
grep -rn 'data-cta' construction-cis/web/src --include=*.tsx --include=*.ts | grep -v tests/
grep -rn 'data-cta' packages/web-shared/design/blog/BlogSidebarCta.tsx
```

The authoritative list is `construction-cis/web/src/tests/design/cta-attribute-diff.test.ts`, whose
`PINNED` array now holds **24 declared triples in `src/`**, plus **one kit triple**
(`blog_sidebar_book|sidebar|form`, from `packages/web-shared/design/blog/BlogSidebarCta.tsx:56`,
pinned separately in the same file because the extractor walks `src/` only). **25 declared triples
in total.** Section 4a's nine are a subset.

Added since section 4a was written, all ADDITIVE, all `goal="form"`:

- `calc_hero_help|hero|form` (`src/app/calculators/[slug]/page.tsx:84`), Phase 4
- `home_hero_book|hero|form` (`src/app/page.tsx:274`), Phase 5
- `services_hero_book|hero|form` (`src/app/services/page.tsx:175`), Phase 5
- `cis_refund_hero_book|hero|form` (`src/app/cis-refund/page.tsx:114`), `8ea5aea9`
- `gps_hero_book|hero|form` (`src/app/gross-payment-status/page.tsx:114`), `8ea5aea9`

Section 4a also under-listed the pre-existing set: `header_nav_secondary`, `header_mobile_primary`,
`header_mobile_secondary`, `home_cta_primary`, `home_cta_secondary`, `see_result`,
`deep_scroll_modal`, `deep_scroll_close`, `returning_bar`, `returning_bar_close`, `hero_cta` and
`contact_pricing_link` are all declared in source and none appears in that table.

**`cis_refund_book_panel` and `gps_book_panel` DO NOT EXIST and no builder should look for them.**
`8ea5aea9` added them to the two `#book` wrapper `<div>`s; `05ddb709` removed them again, because
`autoCapture` resolves through `closest("[data-cta]")` and a wrapper id swallowed every click on the
form's own controls. Both files now carry an explicit comment saying the wrapper carries no
`data-cta` (`cis-refund/page.tsx:261-262`, `gross-payment-status/page.tsx:257-258`). **This closes
the first of the three PHASE5_REVIEW §D open questions before P6-A takes its snapshot: there is
nothing left to remove.** Do not re-add an id to either wrapper.

**The "798 across 9 triples" arithmetic is withdrawn, not re-stated.** It was a RENDERED count over
246 routes and cannot be re-derived without a build and a crawl. The five hero ids above each render
on exactly one static route (`calc_hero_help` on the 12 calculator routes), so the total has moved by
a small, knowable amount, but nobody should quote a number here that was not measured. **P6-A's
snapshot is the re-measurement.** Until it exists, section 4a is a list of DECLARED triples only, and
every count in it is stale.

What has NOT changed, and the whole of section 4b still binds: the five LOCKED triples are
byte-frozen, `null`s included. `specialist_widget|null|null` is still declared with neither attribute
at `SpecialistWidget.tsx:560`, and `next_step`'s placement is still absent at `NextStepOffer.tsx:39`.

### DL-3. `cta-attribute-diff.test.ts` is a deliberate tripwire, and P6-F owns it.

`src/tests/design/cta-attribute-diff.test.ts:237-245` asserts that `StickyCTA.tsx` contains
`data-cta-id=` and does NOT contain `data-cta=`. Read the comment above it: it says in its own words
that the phase-6 rename ADDS a triple to the snapshot and that the assertion "is the reminder that
the new row is a new measurement, not a regression". It is a tripwire, not a blocker.

**Therefore: P6-F owns this test file and updates it as part of the TD-32 rename**, the
`StickyCTA` assertion, and the new `sticky_cta` / `sticky_cta_close` entries in `PINNED`. P6-F must
call out the new `vw_cta_performance` row **in its commit message and in the deploy note**
(§11e already requires this; it is restated here because the guard is where it will be noticed).

**This overrides the concurrency note at the end of section 6**, which says no package may edit that
file. That rule holds for P6-B, P6-C, P6-D and P6-E, which run concurrently and only RUN the guard.
It does not hold for P6-F, which runs strictly last and alone.

### DL-4. The dark tail on `/cis-refund` and `/gross-payment-status` is already CLOSED. Risk 7 is satisfied.

Section 1d (around line 150), §11c (around lines 711-713) and risk 7 (around line 774) all treat the
two pillars as owing Phase 5 work. They no longer do. Both closing bands were reworked in `8ea5aea9`.

Verified by reading the current source of both pages: each now ends on
`<div id="book" className="scroll-mt-24">` wrapping `<LeadCTAPanel contained ...>`, and `contained`
renders the panel on `--hero-cream`. The band comments state the resulting tails:
`/cis-refund` = stone-100 (rates), cream (panel), navy (footer); `/gross-payment-status` = white
(April 2026 section), cream (panel), navy (footer). Neither route's last opaque band under `<main>`
is dark. `8ea5aea9`'s message also records that only `/cis-refund` had the adjacent-ground breach,
and that it was fixed at the call site rather than in the shared `LeadCTAPanel` (7 other consumers).

**What is actually owed now: nothing from Phase 5.** The §3a arithmetic becomes
**25 (Phase 3) + 2 (Phase 5, DONE) + 2 (Phase 6, OWED) = 29.** Phase 6's two are still
`/cis-invoice-template` and `/cis-payment-deduction-statement-template`, unchanged.

So **risk 7's "the gate cannot close until Phase 5 lands" is now satisfied: Phase 5 has landed.**
The gate's remaining dependency is Phase 6's own two routes. What risk 7 was protecting against is
still real in a different form: a green Phase 6 does not by itself prove 0 of 246. The gate is still
verified by reading the served HTML of the 29 named routes on a production build, never by trusting
the instrument's boolean, and note that `--grounds` has now been repaired three times
(`f5313a68`, then `4431cf4d`), so **every grounds figure taken before `4431cf4d` must be re-derived,
not re-quoted.**

### DL-5. Line numbers inside the four Phase-5 files are DEAD. Re-derive at build time.

`src/app/page.tsx` changed +543/-360, `src/app/cis-refund/page.tsx` +157,
`src/app/gross-payment-status/page.tsx` +155, `src/app/services/page.tsx` +151.

**Any `file:line` this plan cites inside those four files is untrustworthy.** They are not renumbered
here, deliberately: a stale number that looks corrected is worse than one flagged as stale. Re-derive
every one by grepping for the string, not by opening the line. This applies to section 7's ownership
rows and anything quoting the homepage or either pillar.

Line numbers in files those four commits did not touch are unaffected. The two most load-bearing were
re-checked and still hold: `SpecialistWidget.tsx:560` and `NextStepOffer.tsx:39`.

### DL-6. The guard count in §11a is wrong. It is 10 today, not 14.

Deriving command: `ls construction-cis/web/src/tests/design/`.

The directory holds **11 files: 10 `*.test.ts` guards, plus `route-exists.ts`**, which is a shared
test HELPER, not a guard, and has no `it()` blocks. The 10 are `blog-cta-map`,
`consent-anchor-drift`, `cta-attribute-diff`, `em-dash`, `eyebrow-ground`, `hub-article-crawl-path`,
`nav-active-state`, `niche-config-port`, `page-summaries`, `penalty-figures`.

Phase 5 added test CASES, not files: `niche-config-port` and `penalty-figures` both grew. Current
case counts, `grep -cE '^\s+(it|test)\('` per file: blog-cta-map 4, consent-anchor-drift 4,
cta-attribute-diff 5, em-dash 3, eyebrow-ground 3, hub-article-crawl-path 5, nav-active-state 3,
niche-config-port 5, page-summaries 4, penalty-figures 6. **42 cases across 10 files.**

**§11a's "All 14 `src/tests/design/*` guards green, including the 3 new ones" is corrected to: all
13 guards green (10 existing + P6-A's 3 new), plus the `route-exists.ts` helper, which is not a
guard and is not counted.** Assert the file count as well as the pass count, so a guard that stops
being collected fails loudly instead of passing silently.

### DL-7. All twelve owner gates are ACCEPTED as recommended. Owner decision, 2026-09-12.

**Nobody stalls on a gate.** Every one of section 10's twelve recommendations is accepted as written.
Section 10 is annotated per gate. Two clarifications override the plan's own text:

**Gate 3: the ruling is CHANGE NOTHING.** The plan recommends switching the deletion job on and
giving consent records a real expiry. The ruling is **do what Property does**, and Property was
checked:

- `Property/web/src/app/privacy-policy/page.tsx:201-203` publishes the **identical two sentences**:
  enquiry data kept N months "after which it is deleted", and consent records "kept for up to six
  years, under access controls".
- `Property/web/vercel.json:9` schedules `/api/cron/lead-retention` daily at 03:30.
- `Property/web/src/app/api/cron/lead-retention/route.ts:52-55` is **dry-run unless
  `LEAD_RETENTION_PURGE_ENABLED` is `1` or `true`**, the same condition Trade has.
- `grep -rn "six years\|six-year" Property/web/src` returns **one hit: that same sentence.** There is
  no six-year consent expiry job on Property either.

So Trade is a faithful clone of Property here, and **Phase 6 must not "improve" those retention
sentences.** TD-38 and TD-39 stay filed in `LIVE_DEFECTS.md` as the record, and their remedy is
**removed from Phase 6's scope**. The underlying gap, published words ahead of shipped code,
estate-wide, and the job anonymises rather than deletes, is an OWNER item for a separate slot, not
phase 6 work, and fixing it on Trade alone would put one site out of step with fourteen others.

**Gate 2's other half still applies in full, and is Phase 6 work.** The cookie page must stop calling
web storage "cookies" (TD-36), must drop the Google Analytics opt-out section for analytics this site
does not run (TD-16), and must say what is actually recorded: **city, region and timezone against a
lasting visitor id**, not "only a country" (TD-17). TD-37's absolute "no strictly necessary cookies"
sentence also stands to be corrected. Nothing in gate 3's ruling touches any of that.

### DL-8. The three PHASE5_REVIEW §D open questions, settled.

`docs/construction-cis/_port/PHASE5_REVIEW.md` section D carries three questions into Phase 6.
Settled answers:

**1. The two `*_book_panel` ids are already removed.** See DL-2. `05ddb709` took them off both wrapper
`<div>`s. **P6-A's reference CTA snapshot is therefore safe to take**, and it must be taken against
the tree as it stands at `dd935a98` or later, never against an artefact captured between `8ea5aea9`
and `05ddb709`.

**2. CIS refund timing is a defect. Correct it, and sweep by RULE not by page.** The page contradicts
itself: `src/app/cis-refund/page.tsx:25` (FAQ body, published prose) says **"8 to 12 weeks"**, while
`:78` (the page's own HowTo schema step) says **"5 to 10 working days"**, and
`docs/construction-cis/house_positions.md:187` says "SA online repayment: typically 5-10 working
days" with a separate 25-working-day EPS/company target. A visitor reads one number and Google reads
the other off the same page. That is a false published statement either way round and it is a defect,
not a preference.

**Two things a builder must not get wrong here.** First, **the ground-truth figure is scoped**:
house_positions' 5-10 working days is the HMRC *repayment* step after a return is processed, not the
end-to-end wait from engagement. The correction may therefore be a re-scoping of the sentence rather
than a straight number swap, and both halves of the page must end up saying the same thing about the
same step. Second, **this is not one sentence.** Deriving command:

```
grep -rn "8 to 12 weeks\|8-12 weeks\|12 weeks" construction-cis/web/src construction-cis/web/content
```

returns the claim in **`src/data/trade-types.ts` (9 occurrences, which render across the 45
`/for/[slug]` routes), `src/app/locations/[slug]/data.ts`, and `src/app/cis-refund/page.tsx`**, plus
a DIFFERENT and separately-sourced "4 to 12 weeks" company-claim figure in two blog posts that is
attributed and is not part of this defect. Most of those files belong to Phases 3 and 4 by the
ownership table. **See DL-9: the sweep is scoped to the rule and the whole site, not to Phase 6's
route list.** Grep the ARITHMETIC and the worked examples as well as the words: the recorded failure
mode on this site is a corrected sentence sitting above an uncorrected worked example.

**3. Orange tick marks on `/` and `/services`: FIX ON TRADE ONLY.** 19 ticks per page on both
routes render `text-[var(--brand-primary)]`, which resolves through `--accent` to `#f97316` at
**2.80 on white** against a 3:1 graphics floor, and `globals.css:43-44` says in its own comment that
this token "must never carry text on a light ground. Use `--accent-strong`."
**Change the call sites on those two routes to `--accent-strong`** (`#c2410c`, 5.18 on white).
**Do NOT change the shared brand token**, and do not change `--accent`: that reaches sites already
finished, and this is precisely the "fix the hex instead of the consumer" mistake T30 records.

### DL-9. Standing note: a correctness sweep is scoped to the RULE and the WHOLE SITE.

Never to the phase's route list, and never to the file list a brief hands you.

The recorded incident on this site: a banned director-penalty claim survived **two** correction
passes and stayed live, in body copy AND in `FAQPage` structured data, purely because the file it
lived in was fenced off for a later phase. The guard written to stop it
(`src/tests/design/penalty-figures.test.ts`) pinned one data file and stayed green while the same
figures shipped on 45 pages from `src/data/trade-types.ts`. That is playbook trap T33, and the guard
now enumerates its corpus programmatically for exactly this reason.

**So:** when Phase 6 closes a CLAIM, a NUMBER, a promise or a compliance sentence, it sweeps every
`.ts`/`.tsx` under `src/`, every `.md` under `content/`, and `niche.config.json`, structured-data
strings included, because a `schema:` frontmatter block and an inline `faqs` array both publish and
neither is visible to an HTML body sweep. Section 7's ownership table governs DESIGN edits. It does
not fence off a correctness sweep. If the sweep lands a correction in another phase's file, that is
correct behaviour: record it in the commit message rather than leaving the claim live.

---

## 0. CORRECTIONS: WHERE THE BRIEF AND `DISPOSITION_SLICE3` ARE STALE OR WRONG

Read these before anything else. Eleven of them change what a builder is told to do, and four of
them delete work that the disposition specifies.

### 0a. Corrections to the BRIEF

| # | Brief claim | Status | Correction |
|---|---|---|---|
| B1 | "Require `src/tests/intent-engine.test.ts` passing byte-unchanged as the proof no cadence moved" | **FALSE. That file does not exist.** | `ls construction-cis/web/src/tests/` returns no `intent-engine.test.ts`. The cadence tripwire on this site is **`src/tests/assistant-journey-opener.test.ts`** (872 lines, cadence pinned at `:832-`). Every acceptance row below names the real file. A package told to run a file that does not exist gets a green vitest run over zero matched specs and reads it as proof. |
| B2 | "`DISPOSITION_SLICE3.md` ... **predates Phases 1 to 3**" | **CORRECTED 2026-09-12. The original row is now actively misleading, see DL-1.** | It was written 2026-09-11 and committed in `4d2bfeaa` (Phase 0), so it predates every build, Phases 4 and 5 included: it is a hypothesis, not a specification. **The rest of the original row is void.** It said Phase 3 was uncommitted working-tree work and that `git log` could not be trusted. That was true on 2026-09-11 and is false now. Phases 3+4 are `72fe3261` and Phase 5 is `da7ec668` + `aab3886b` + `8ea5aea9` + `05ddb709`, with artefacts `32dc4c90` and close `dd935a98`. **`git status --porcelain -- construction-cis` is empty: the tree is clean and `git log` IS the record.** |
| B3 | "`src/lib/schema.ts` had `priceRange` removed in Phase 3; verify nothing else asserts a fee" | **TRUE, both halves, verified** | `grep -n priceRange construction-cis/web/src/lib/schema.ts` = **0 hits** (the Phase 3 diff is `-2` lines on that file). `grep -E 'priceRange\|offers\|price\|AggregateRating\|Review'` across the whole 240-line file = **0 hits**. No fee, offer or rating is asserted anywhere. TD-01's Trade half is CLOSED. |
| B4 | "The kit fork `packages/web-shared/schema/local-business.ts:127` still carries it for OTHER sites and Trade does not reach it: confirm" | **CONFIRMED** | The line is live (`priceRange: "££"`). Trade's only `@accounting-network/web-shared` import specifiers are `console/*`, `experiments/registries`, `content/feed`, `content/llmsFull`. Nothing under `construction-cis/web/src` imports the barrel (`packages/web-shared/index.ts:15`) or `schema/local-business`. **Trade does not reach it.** Hand up to the orchestrator as TD-K1; **no package in this phase edits the kit.** |
| B5 | "TD-K2 records `PremiumBarChart.tsx` as an `aria-hidden` chart, **byte-identical** on Trade and Medical" | **The `aria-hidden` half is TRUE. "Byte-identical" is FALSE.** | `aria-hidden="true"` on the wrapper at `src/components/calculators/premium/PremiumBarChart.tsx:90`, `role="img"` on the inner `<svg>` at `:97` (the labelled svg is hidden from AT: the defect is real). But md5 `6727b7a57a5a903a8744323279fa71d6` (Trade) vs `3f9872ca39254447230d8f359c815cf7` (`Medical/web/src/components/tools/premium/PremiumBarChart.tsx`). The files have **diverged**. That matters because TD-K2's remedy ("promote to the kit, fix once, delete the per-site copies") now requires a reconciliation, not a move. Hand the correction up. **Out of this phase's scope either way**: it is the premium calculator's chart, which is Phase 5's surface. |
| B6 | "a previous review found **5** of the charts have no adjacent data table" | **FALSE. It is 4.** | Enumerated chart by chart against the rendered pages: `AnnualIncorporationsChart` (index:319), `SeasonalityChart` (index:502), `AnnualInsolvencyChart` (insolvency:293), `OneYearTrendChart` (survival:313). The likely miscount: there are 11 chart exports, one of which (`TradeBreakdownTable`, `ConstructionIndexCharts.tsx:323`) **is itself a table**. |
| B7 | "The 4 research pages are recharts with data tables and NO `role="img"` wrapper, so the sibling-site defect does NOT reproduce: verify and do not fix it" | **CONFIRMED** | `grep -E 'role=\|aria-hidden\|aria-label\|<title>\|<figure>'` across `src/components/research/*.tsx` = **0 hits**. No subtree is hidden from AT. Do not "fix" it. The 4 unpaired charts (B6) are an optional **content** gate, not a port task. |
| B8 | "Template downloads: ... plus the XLSX path (`scripts/resources/generate-xlsx.ts`, `ExcelPreview.tsx`)" | **FALSE, twice, and this deletes a whole work item** | (a) `scripts/resources/generate-xlsx.ts` does **not** produce the template-page downloads. It loops `scripts/resources/builders/index.ts` (`cis-refund`, `cis-vs-paye`, `gross-payment-status`) and writes `public/resources/<topic>/*.xlsx`, which are the **resource-guide** magnets on `/resources/[topic]`, a Phase 3 surface. The template pages serve 8 static committed binaries from `public/downloads/` and no script generates them. (b) **`ExcelPreview.tsx` has ZERO importers.** `grep -rn 'ExcelPreview' src scripts content` outside the file itself returns nothing; neither template page has a `dynamic(` or `import(`. It is unmounted. `DISPOSITION_SLICE3` §4.11 specs a six-point restyle of it. **That restyle is work on a component nobody can see.** It moves from RESTYLE to RETIRE (section 8). Its 4 ASCII-`GBP` money lines are consequently not user-facing copy and carry no T6 obligation. |
| B9 | "Four remain, deliberately, in transactional email and acknowledgement copy" | **TRUE as a count, once you read `:48` as two** | `reply-ack.ts:48` carries **two** turnaround-flavoured strings in one line ("will call you **shortly**" and "**Speak soon**."), plus `reply-ack.ts:181` and `aux-cron.ts:164` ("Speak soon, the team at..."). Four. Recommendation in section 10, gate 9. Note these are **SMS and email bodies, not web surfaces**: they are outside the design port's scope entirely and no package here may edit them. |
| B10 | "`StickyCTA.tsx` ships `data-cta-id` ... that is TD-32"; "LIVE_DEFECTS.md in full (now to TD-35)" | **The defect is real. The id is not filed.** | `LIVE_DEFECTS.md` contains TD-01..TD-30, TD-33, TD-34, TD-35, TD-K1, TD-K2. **There is no TD-31 and no TD-32 row.** Both were *proposed* in `DISPOSITION_SLICE3` §13.5 and never filed. This plan adopts the two ids as proposed so nothing is renumbered, and section 9 lists five further unfiled defects as TD-36..TD-40. **Filing them in `LIVE_DEFECTS.md` is P6-A's first commit**, so the ledger is complete before the owner walk. |
| B11 | "`md5sum src/config/site.ts` is `06814d487e10f00fc9e5780de603c30c`" | **CONFIRMED, unchanged** | Re-measured this run: `06814d487e10f00fc9e5780de603c30c`. The T19 pin is intact after three build phases. |

### 0b. Corrections to `DISPOSITION_SLICE3.md`

| # | Disposition claim | Status | Correction |
|---|---|---|---|
| D1 | §4.7, §4.8, §4.10: `/resources/<topic>` needs a hero, breadcrumb, `.prose-blog`, TOC, and the inline `#f97316` hex converted; `ResourceGate`'s 4 dead props retired | **DONE. Reassigned to Phase 3 and already built.** | `/resources/[topic]` is in `PHASE3_PLAN.md`'s scope table (3 routes) and its working-tree diff is `+76/-67`. The page now renders `.article-body prose-blog` (`:119`) and inherits Phase 2's `.prose-blog [id] { scroll-margin-top }`. **No Phase 6 package touches `src/app/resources/`.** §4.8's orphaned-guides linking gate survives as an owner gate only (section 10, gate 6); it is a linking decision, not Phase 6 work. |
| D2 | §9: five guards "to AUTHOR (none of these exists anywhere for this site)" and four kit templates "Trade consumes none of the four" | **Mostly built. Two guards and one script remain.** | `src/tests/design/` now holds 10 files. Built since: `consent-anchor-drift`, `cta-attribute-diff`, `em-dash`, `hub-article-crawl-path`, `nav-active-state`, plus `blog-cta-map`, `eyebrow-ground`, `niche-config-port`, `page-summaries`, `penalty-figures`. **Still missing: `schema-no-price.test.ts`, the link-floor script, and 2 of the 4 kit templates** (`calculator-tabs-crawl-path`, `first-sentence`). That is P6-A's real scope, not the eight-item list §9 describes. |
| D3 | §8: `src/components/blog/ExitIntentModal.tsx` (182 ln) is a DELETE candidate with 0 importers | **ALREADY GONE.** | Deleted in `6575bbb6` (Phase 2 blog port). Two stale **comments** still name it (`intent/DeepScrollModal.tsx:44`, `support/SpecialistWidget.tsx:15`). Correcting those two comments is P6-F's; the two `sessionStorage` keys stay, because both components still read them. Also deletes §6's `ExitIntentModal` row and §1's `ExitIntentModal` capture row. |
| D4 | §3.12: `/research/uk-construction-index/net-formation-data` is a VERIFY-BEFORE-BUILD item, "confirm it exists or the index route loses a link against a floor of 20" | **VERIFIED, it exists and is live.** | `curl -o /dev/null -w '%{http_code}'` = **200**; declared at `.../net-formation-data/route.ts:44`; linked twice from the index page. It is a second CSV route on the same `force-static` / `text/csv` / `content-disposition: attachment` contract. Item closed, no work owed. |
| D5 | §0: "Link floors ... `/contact` 14 · `/about` 14 · ..." with the arithmetic implying tight headroom | **Floors are right. The headroom arithmetic is stale, and it is not uniform.** | Chrome grew 14 → 20 destinations in Phase 1. Measured live today, every route in this phase is **above** its floor, but by **+6** on the flat pages and only **+4** on the four research children. See the table in section 5. `DISPOSITION_SLICE3` predates the chrome growth and `PHASE3_PLAN`'s "every route sits exactly 6 above its floor" does not hold for research. |
| D6 | §1 capture table: `ExitIntentModal` and `calc_result` rows; §4.11 `ExcelPreview` restyle | **Three rows are void** | `ExitIntentModal` (D3, gone), `ExcelPreview` (B8, unmounted), and `calc_result` (a calculator surface = Phase 5's, flagged here only as gate 7). |
| D7 | §5.1: delete the GA opt-out section at `cookie-policy/page.tsx:104-120` | **Right conclusion, stale line numbers, and the page has four more defects than §5 records** | The section is now at **`:113-125`**. §5 finds two problems (GA opt-out, IP understatement). Independent re-verification against the code found **four more** (section 9, TD-36..TD-39): the pages describe web storage as "cookies" throughout, assert "no strictly necessary cookies" against a live admin session cookie, promise a six-year consent-record expiry that no job implements, and state enquiry data "is deleted" at 24 months when the purge is dry-run unless an env var is set. |
| D8 | §1.8 / §6 / §9: add `data-cta-placement` to every CTA | **A TRAP 22 breach as written, on the two most-rendered ids on the site** | The five locked triples include **`specialist_widget|null|null` on all 246 routes** and **`next_step|null|null` on 109**. Their `placement` is `null` *at baseline*. Adding `data-cta-placement` to `SpecialistWidget.tsx:560` or `NextStepOffer.tsx:39` changes the triple on 246 and 109 routes respectively and splits `vw_cta_performance` at the cutover: the exact failure T22 exists to prevent, at the largest scale available on this site. §9's blanket "every one carries `data-cta-placement`" applies to **NEW ids only**. See section 4. |
| D9 | §10 step 3: "the CTA snapshot has to be taken pre-port or T22 cannot be detected at all" | **Already taken, and it holds.** | `cta_baseline.json` (`sha 18b4f25f`, 246 routes, `served_title` asserted) was committed in `03142e02` before Phase 1. All 9 current triples re-verified live today against it; see section 4. |
| D10 | §9: "the deep-scroll modal's denominator already exists ... query `personalization_shown` before adding any new instrumentation" | **Still true and still unclosed.** | Verified in code this run: `DeepScrollModal.tsx:118` is a **click** id; the open fires `trackPersonalization("shown", ...)` → `IntentProvider.tsx:99-112` as `personalization_shown` with `surface`. The SQL in §9 remains the way to close it. **Nobody in this phase runs it** (no DB access, and it changes no build decision). Carried into the definition of done as a post-walk analytics item, not a build item. |

---

## 1. REALITY CHECK PER SURFACE

Line counts re-measured. **Every route in this phase is unported**: the counts below match
`DISPOSITION_SLICE3`'s Phase-0 numbers almost exactly, which is the proof that Phases 1-3 touched
chrome, blog, trades, locations and glossary and left this phase's bodies alone.

### 1a. Capture and post-submit: four small files, one of which is the most exposed copy on the site

`/contact` 103 ln · `/book` 51 · `/complete` 118 · `/thank-you` 117 ·
`forms/{LeadForm 517, DetailsForm 205, BookingPicker 163, MiniCapture 59}`.

**What is actually there.** All four routes run a single `bg-white` (or `bg-[#fafaf7]`) section under
a `mx-auto max-w-2xl` clamp, with no `SlimHero`, no second column and no `NoticeCard`. `/complete`'s
"needs the personal link" card is a hand-copy of `/book`'s, which is the precise drift
`DESIGN_SYSTEM.md` §4d names. `/thank-you:23` computes `returnPath` and then executes
`void returnPath;`. `/thank-you:47-51` is a ternary whose two arms are byte-identical. `/book:4` and
`/complete:4` import `siteConfig` and never use it.

**What the minimal fix is.** `DESIGN_SYSTEM.md` §4d is explicit that the three post-submit routes are
**one unit** and that doing one alone is what produced the drift. So P6-C takes all three in one
package, with `lead-payload.test.ts` green at every commit.

**The trap in doing more.** `LeadForm` is 517 lines and is the site's primary conversion unit. It is
**KEEP-PAYLOAD-RESTYLE**: field styling and the submit button move, and nothing inside the payload,
the validation floors, `useFormTracking("lead_form")`, the honeypot `enquiry_ref`, or the consent
block changes. D.1's ground invariant was re-verified on this site and **the invisible-label bug does
not reproduce**: both in-scope `LeadForm` mounts sit on white (`contact:95-97` inside a white card,
`cis-invoice-template:257` inside a white card in the navy band).

Property's `LeadForm` makes `situation` / `prompted` / `callGoal` **required** first-class fields
where Trade hides them in an optional `<details>`. **Do not port that.** It is a validation-floor
change on the site's only working form, it is not a design change, and Property's own
`SITUATION_MIN_CHARS` was halved after 96% of `form_error` events turned out to be users blocked by
it. Restyle the `<details>`, leave the field contract alone.

### 1b. `/about`: 51 lines, and its only ask leaves the page

Four `<p>` in a `max-w-3xl` stack under a flat `bg-neutral-900` hero, then a bare `btnPrimary` to
`/contact` at `:42-46`. No breadcrumb, no schema, no form, no `data-cta`, and **0 recorded CTA
clicks**. §0.5: "a page a reader can scroll to the bottom of without meeting an ask is not finished",
and "a bare button is not a CTA block".

Paragraph 4 carries **two gated strings**: "We work on a fixed-fee basis. You know what you are
paying before we start." (TD-18: under the pool model we do not quote at all; the partner firm sets
its own fee) and a turnaround promise (TD-13/TD-14). Both are owner gates. Paragraph 2 carries "55p
per mile from April 2026", which traces correctly to `house_positions.md` and the AMAP ground truth.

### 1c. Research: five routes, no shared layout, one chrome change = four edits

Hub 102 ln · index 630 · insolvency 528 · payment-practices-league 436 · survival 424. `Stat()` and
`Section()` are redefined byte-identically in all four page files. **`ResearchLayout` extraction
first, then four inheritances** is the whole sequencing argument for P6-E.

Two things must not be touched. **The derived `HEADLINE_SENTENCE` h1** on each page is the GEO asset:
never retype a number into a heading. **The 5 `data/route.ts` CSV endpoints** (four `data` plus
`net-formation-data`) are the data-asset contract: `force-static`, `text/csv`,
`content-disposition: attachment`, `max-age=3600`, `Dataset` JSON-LD, OGL statement. The design port
does not reach them.

One live defect this phase closes and one it declines. **Closes:** all five research routes render
`Breadcrumb`'s light-ground **default** variant inside a `bg-neutral-900` hero, while the component
already ships the `variant="light"` built for exactly that case and no call site passes it. One prop,
five call sites (TD-31). **Declines:** the 4 unpaired charts (B6) stay as they are.

### 1d. Template downloads: the highest-intent surface on the site, and one of the two pages asks for nothing

`/cis-invoice-template` 264 ln, floor **24**, 3 download variants × (xlsx + pdf) = 6 affordances.
`/cis-payment-deduction-statement-template` 251 ln, floor **19**, 1 pair repeated twice = 4
affordances. **10 download affordances, and not one carries a `data-cta`.** All 28 recorded download
clicks in the Phase-0 window arrived as generic `element_click`, recoverable only because that event
happens to capture `nearest_text`.

**`DISPOSITION_SLICE3` §13.1's correction stands and is re-verified:** the family is not
capture-free. `/cis-invoice-template:257` has a full `LeadForm submitLabel="Request a callback"`
inside a white card in the closing navy band. **`/cis-payment-deduction-statement-template` has no
capture form anywhere**, its closing `bg-[#1e293b]` band at `:220-248` repeats the two downloads and
links to `/cis-refund`. A builder told "the family has zero capture" would add a second form to the
page that already has one.

Both pages are on the **dark-tail** list. `GROUNDS_BASELINE.md:248-249` assigns exactly these two of
the 29 dark-band-touching-footer routes to **Phase 6**; the other two standalones (`/cis-refund`,
`/gross-payment-status`) were Phase 5's and **are now CLOSED** (`8ea5aea9`, DL-4), and `/locations`'s
25 are Phase 3's. **Phase 6 closes the last 2 of 29.** A green Phase 6 is still not a closed gate on
its own: the gate is 0 of 246, read off the served HTML of all 29 routes.

Neither page has a breadcrumb or `BreadcrumbList` JSON-LD, both are indexable, and both hand-roll a
FAQ block in two different markups for the same job (`<details>` vs `<article>` cards) while feeding
the same array to `buildFaqJsonLd`, so there is no T17 risk in unifying them.

`#downloads` (`cis-invoice-template:109`) is the one app-route instance of TD-22: the page's own hero
CTA jumps to it under a `sticky top-0` header with `scroll-behavior: smooth`, and it has no
`scroll-mt-24`.

### 1e. Legal: the frame is right, the content is not

`contentNarrow` is the sanctioned legal measure and is already in place (`terms:14`). Content is a
carve-out from restyling. `/terms` (148 ln) makes **no** data-handling claims at all and is clean.
`/privacy-policy:107-136` is **the reference**: six-firm cap, independent controllers, 48-hour
re-offer, related professions named, retention from config. It matches the code and the caps, and
every reassurance claim elsewhere in the port is checked against this page, not the reverse.

`/cookie-policy` (145 ln) is where the T18 work is, and it carries **six** defects, not the two the
disposition records. Full table in section 3.

### 1f. Interruptive stack: restyle only, every number frozen

`intent/{IntentProvider 113, DeepScrollModal 142, ReturningBar 76, NextStepOffer 48, HeroOffer 41}` ·
`support/SpecialistWidget 583` · `ui/StickyCTA 176`.

Thresholds re-measured and **FROZEN**: `lib/intent/engine.ts` `ENGAGED_ESCALATE_MS 90_000`,
`ENGAGED_GUIDE_MS 60_000`, `SCROLL_ESCALATE_PCT 60`, `SCROLL_MODAL_PCT 70`; `IntentProvider` polls at
`1500` ms; `DeepScrollModal` `SUPPRESS_DAYS 30` + module-flag once-per-session + `bfp_modal_shown`;
`SpecialistWidget` cadence `[30_000, 70_000, 120_000, 180_000]` of **visible** time, auto-open
`AUTO_OPEN_DELAY_MS 600` once per session, exit-intent armed after 10s desktop / 8s mobile, mobile
gesture `maxY > 700 && y < 150 && lastY - y > 4`, friction ping on `form_error`; `StickyCTA`
`min(500px, 25% of scrollHeight)`, one-way, `sessionStorage` dismiss, suppressed on `/admin`,
`/embed`, `/pricing`-in-packages-mode, and when `isConverted()`.

**Trade's StickyCTA threshold is 25%; Property's is 30%.** That is a tuned local deviation, not
drift. Keep Trade's. Recorded, and confirmed at gate 4.

`HeroOffer.tsx:33` declares `data-cta="hero_cta"`, which appears in **none** of the 9 live triples:
the component falls through to the static CTA and the id has never rendered. Recorded so nobody reads
its absence from the baseline as a regression.

### 1g. Machine surfaces

`sitemap.ts` (108 ln) emits 22 static routes including both templates (`:19-20`), `/about` (`:24`) and
all 5 research routes (`:31-35`), plus trades, blog, calculators, glossary, cities and the 3 resource
guides, and correctly excludes `/book`, `/complete`, `/thank-you`, `/admin/*`, `/embed/*`. `robots.ts`
(101 ln) allows ~60 named AI and search bots and disallows `/thank-you`, `/admin`, `/api/`.
`feed.xml/route.ts` (27 ln) is the kit builder. All three: **KEEP**, no design surface.

`llms-full.txt/route.ts` (79 ln) is the one em-dash instance this phase owns: **8**, confirmed live
against the served route, budgeted at `src/tests/design/em-dash.test.ts` as
`"app/llms-full.txt/route.ts": 8`. It also lists **8** calculators against **12** in
`src/lib/calculators/registry.ts:32-45`, and omits the research data assets and both template pages.
The em-dash guard is a **ratchet with per-file ceilings**: fixing these 8 cannot fail it, and the
budget entry is deleted in the same commit.

`api/og/route.tsx` (109 ln, edge) already reads `niche.brand.primary_color` at `:21`, so it inherits
the brand layer free. But `DISPOSITION_SLICE3` §7.3's "KEEP, no edit" is **too generous**: it
hardcodes `background:"white"` (`:33`), title `#1e293b` (`:62`), domain `#64748b` (`:85`) and an 8px
accent bar (`:101`), and **loads no custom font**, so every social card renders in the edge default
while the site is Geist. Recorded as TD-40; the colour tokens are a one-line-each fix, the font is
not, and the recommendation is to take the colours and leave the font.

`src/lib/schema.ts` (240 ln): T17 clean (B3). **No work.**

### 1h. `/admin/analytics`: EXEMPT

`src/app/admin/analytics/{page,login,leads,trends,visitor/[visitorId]}`. Gated at `page.tsx:494-495`
(`checkAuth()` → `redirect("/admin/analytics/login")`), implemented in `checkAuth.ts:14-20` as an
HttpOnly cookie verified against `ADMIN_DASHBOARD_KEY`, deny-on-empty. Live: `GET /admin/analytics` →
**307**. All console routes carry `CONSOLE_NOINDEX_META` and `/admin` is disallowed in `robots.ts:88`.

**Out of the design port AND out of the ramp sweep**, on the Medical M-L11 precedent: login-gated
internal console, no Property equivalent. `StickyCTA` already suppresses itself on `/admin`
(`:92-95`). Excluded from the link-floor crawl **by name, not silently**. **No work is specified.**
The exemption is recorded here so no later phase re-derives it.

---

## 2. THE CAPTURE-SURFACE TABLE (§D.2: port all, add none)

Every capture surface reachable in this phase, its fields, its consent wording quoted, its
instrumentation as it actually is, and its disposition.

| Surface | Mounts in scope | Fields | Consent / reassurance wording shown | Instrumentation today | Disposition |
|---|---|---|---|---|---|
| **`LeadForm`** (517 ln) | `/contact:95-97` (`submitLabel="Send enquiry"`); `/cis-invoice-template:257` (`submitLabel="Request a callback"`); all 4 `/research/*` (`redirectOnSuccess={false}`) | honeypot `enquiry_ref` (`:223-232`); `role` (`:236`); `trade` cond. (`:270`); `subbieCount` cond. (`:297`); `fullName` (`:324`); `email`+`phone` (`:346-388`); `message` optional (`:390`); `<details>` → `situation`/`prompted`/`callGoal`, all optional (`:411-473`) | **`site.ts:17`, verbatim, DO-NOT-CHANGE:** "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this." + " See our Privacy Policy." appended at `:478-484`. **Pinned byte-exact twice**: `tests/lead-payload.test.ts:36-40` and `tests/design/consent-anchor-drift.test.ts:5` | `useFormTracking("lead_form")` (`:84-85`) → `form_field_focus` / `form_start` / `form_submit`; `onError(field, kind)` (`:130`); `onLead({role})` (`:185`); `getVisitorId()`/`getSessionId()` (`:169-170`). **No `data-cta` anywhere in the file** | **KEEP-PAYLOAD-RESTYLE.** Add `data-cta="contact_lead_submit"` (route-unique) on `/contact`'s submit only. Field contract, validation floors and `<details>` optionality unchanged (§1a) |
| **`DetailsForm`** (205 ln) | `/complete:97` | only the missing field(s) of name / phone; honeypot. Posts `/api/leads/complete` | **NO consent notice.** In its place, `:191-192`: **"We only use this to arrange your free review."** + Privacy Policy link. **FALSE** (TD-15) | none. **And it sends no `consent_text` / `consent_at`**, unlike `LeadForm.tsx:167-168` and `SpecialistWidget.tsx:340-341` | **KEEP-PAYLOAD-RESTYLE + GATE 1.** The wording swap is owner's, not a builder's |
| **`BookingPicker`** (163 ln) | `/book:34`; `/thank-you:79` | day + call window, signed token. Posts `/api/leads/book` | `:157-159` "No obligation. A specialist will call you in your chosen window." **Accurate under the pool model. KEEP.** `:82-84` "The call takes about 20 minutes. Your specialist will have read your enquiry before they ring." **Accurate. KEEP** | `POST /api/leads/booking-viewed` once on mount, ref-guarded (`:26-34`) | **KEEP-PAYLOAD-RESTYLE.** Chips to `rounded-xl` + `min-h-12`; outcomes to `NoticeCard`. Token flow untouched |
| **`MiniCapture`** (59 ln) | not mounted by any Phase 6 route (its 5 call sites are blog, calculator and `/resources`, all earlier phases) | name + phone + email + message (shared kit) | Same `leadConsentText`, injected at `:28`. **DO-NOT-CHANGE** | `onExperimentView` / `onExperimentAction` (`:55-56`) | **KEEP, no work.** Its own docstring forbids adding logic. Listed for completeness only |
| **`SpecialistWidget`** (583 ln) | site-wide via `PageShell`, **all 246 routes** | `email` + `question` (`captureMode: "email_only"`); honeypot `enquiry_ref` | Same `leadConsentText` + " See our Privacy Policy." **DO-NOT-CHANGE.** But `:379` "A specialist replies within one working day" = **TD-14, GATE 8** | `data-cta="specialist_widget"` at **`:560`**, with **no placement and no goal**, the locked triple. Plus `personalization_shown` (`:134`, `:254`), `support_opened` (`:260`, `:283`), a hand-built `cta_click {cta_id:"assistant_<goal>", placement:"assistant_card"}` (`:295`), `lead_submitted` (`:358`) | **KEEP-PAYLOAD-RESTYLE, thresholds frozen.** **Its triple is byte-frozen: add no `data-cta-placement`, no `data-cta-goal`** (section 4). Its auto-open is NOT a human signal (bot-gate incident): never wire it into a conversion metric |
| ~~`ExitIntentModal`~~ | n/a | n/a | n/a | n/a | **VOID.** Already deleted in `6575bbb6` (D3) |
| ~~`ExcelPreview`~~ | **none, 0 importers** | n/a | n/a | n/a | **VOID as a capture/design surface. RETIRE** (B8, section 8) |
| ~~`calc_result` form id~~ | calculator pages | n/a | n/a | n/a | **Phase 5's surface.** Carried here only as owner gate 7 |

**The T19 rule, stated once and binding on every package:** `src/config/site.ts` is **OFF LIMITS**.
Its md5 is `06814d487e10f00fc9e5780de603c30c` and must be that at the end of every commit. No package
may change `leadConsentText` or `resourceConsentText`. The only consent-adjacent copy change in this
phase is gate 1, and it is a *swap to the already-correct existing string*, not new wording.

**The documented divergence, so nobody "fixes" it:** `leadConsentText` describes a serial fallback
("a firm ... another firm") while `/privacy-policy:126-131` discloses up to six concurrent. That is
**deliberate**, documented at `site.ts:14-16` and `lead-payload.test.ts:31-34` as layered
transparency, and chosen because the honest one-line wording collapsed step-2 conversion to zero in
August. It is not a defect and must not be harmonised.

---

## 3. LEGAL: EVERY CLAIM CHECKED AGAINST THE CODE (T18)

**Does this site run Google Analytics? NO.** Established four ways, not taken on trust:

1. `niche.config.json:251` → `"google_analytics_id": ""`.
2. `src/app/layout.tsx:98` passes it to `<ConsentedScripts gaMeasurementId={...} />`.
3. `packages/web-shared/analytics/react/GoogleAnalytics.tsx:8` →
   `if (!measurementId || !/^G-[A-Z0-9]{6,}$/.test(measurementId)) return null;`, it renders
   **nothing**, no `gtag`, no `googletagmanager` script.
4. `grep -E 'gtag|GoogleAnalytics|googletagmanager|NEXT_PUBLIC_GA|@next/third-parties'` across
   `construction-cis/web/src` = **0 hits** (earlier apparent hits were `.next/` build artifacts).
   `.env.local.example` carries no GA var.

**What IS running:** first-party analytics. `src/app/api/track/route.ts:17` →
`createTrackHandler({ siteKey })`, client side `packages/web-shared/analytics/autoCapture.ts` +
`track.ts`, ids in localStorage / sessionStorage (`analytics/ids.ts:4-5`), ingested to the Supabase
RPC `ingest_web_events`.

**What that means for the cookie policy:** the page is **self-contradictory**. `:46` correctly says
the site "does not use Google Analytics or any other third-party analytics cookies", and then
`:113-125` runs an entire **"Google Analytics opt-out"** section telling visitors to install the GA
opt-out add-on. It tells them to take a step that does nothing, about a product that is not running,
four lines after saying so. **Delete the section** (TD-16). It is fragile in one direction worth
noting: GA is one config value away from being switched on with no policy change, and the CSP still
allowlists `googletagmanager.com` / `google-analytics.com` as a dead allowance.

| # | Claim (file:line) | What the code does | Verdict | Disposition |
|---|---|---|---|---|
| 1 | `cookie-policy:113-125`, the whole "Google Analytics opt-out" section | No GA runs | **FALSE + self-contradicting `:46`** | **DELETE** (TD-16). Drops links: check the floor of 14 |
| 2 | `cookie-policy:40`, "We do not store your IP address (only a country derived from it)" | `createTrackHandler.ts:231-234` reads `x-vercel-ip-country`, **`-city`, `-country-region`, `-timezone`** and persists all four at `:148-151`, against a **persistent visitor id** | **Half true.** The raw IP genuinely is never stored or hashed (no `x-forwarded-for`, no `request.ip` in the handler): that half holds. But city + region + timezone is not "only a country", and with a durable id it is not anonymous in the UK GDPR sense | **GATE 2** (TD-17). Say what is stored |
| 3 | `privacy-policy:61-63`, "an approximate country derived from your IP address" | same as #2 | **Understates** | Same gate, same edit |
| 4 | `cookie-policy:19-21, 24, 50-60`; `privacy-policy:204`, framed as **"cookies"** throughout | `analytics/ids.ts:81,105` localStorage; `:121,137` sessionStorage. **Zero `document.cookie`** anywhere in `packages/web-shared/analytics/` or `construction-cis/web/src` | **Misleading.** No cookies are used; it is web storage. PECR still applies, so this is not a legal escape, but the description is wrong | **NEW, TD-36. GATE 2** (same edit) |
| 5 | `cookie-policy:28-30`, "We do not currently use any strictly necessary cookies" | `src/app/api/admin/login/route.ts:78` sets a session cookie, read at `admin/analytics/checkAuth.ts:15` | **FALSE as stated.** Admin-only and arguably out of scope for public visitors, but the sentence is absolute | **NEW, TD-37. GATE 2** |
| 6 | `privacy-policy:169`, "Consent records are kept for up to six years" | `src/lib/leads/retention.ts:78` preserves `consent_text` / `consent_at` **unconditionally**. No six-year expiry job exists | **FALSE.** Kept indefinitely | **NEW, TD-38. GATE 3** (a code decision, not a copy one) |
| 7 | `privacy-policy:166-167`, enquiry data kept 24 months "after which it is deleted" | Cron scheduled `vercel.json:9`, but `api/cron/lead-retention/route.ts:52-53` is **dry-run unless `LEAD_RETENTION_PURGE_ENABLED=1`** | **Conditional.** True only if that env var is set | **NEW, TD-39. GATE 3** |
| 8 | `DetailsForm.tsx:191-192`, "We only use this to arrange your free review." | The name and phone it collects are exactly the fields `privacy-policy:109-114` says go to up to six independent controllers, `:131-132` "at most six firms may receive your details", and `:143-144` discloses a lead-gen fee | **FALSE.** An exclusivity claim on the page that collects the phone number, the single most onward-shared field | **GATE 1** (TD-15). Correct wording already exists at `site.ts:17` |
| 9 | `privacy-policy:57-58`, "we keep a record of the exact wording you agreed to and the date and time" | True for `LeadForm` (`:167-168`) and `SpecialistWidget` (`:340-341`); **not for `DetailsForm`**, which sends neither | **Partly false** | Folded into **GATE 1** |
| 10 | `privacy-policy:107-136`, six-firm cap, independent controllers, 48-hour re-offer, related professions, retention from config | Matches the code and the caps | **TRUE. This is the reference page** | **KEEP.** Every reassurance claim in the port is checked against this, never the reverse |
| 11 | `privacy-policy:146-157`, processors Supabase / Vercel / Resend / Twilio / Anthropic via AI Gateway / Companies House | Matches the route inventory | **TRUE** | KEEP |
| 12 | `cookie-policy:36-37`, "we do not collect your name, email or phone number in these events" | `autoCapture.ts:52` non-reversible short hash; `:125,129` `track("contact_click", {value_hash})` | **TRUE** | KEEP |
| 13 | `cookie-policy:42`, opt-out via a "Do not track me" link in the footer | `components/analytics/ConsentToggle.tsx:33` renders that exact label, mounted at `SiteFooter.tsx:176` | **TRUE** | KEEP |
| 14 | `terms/page.tsx` (whole) | Makes no data-handling claims; only `:83` mentions third-party sites | **Nothing to contradict** | KEEP. Restyle only |

The only styling work in the legal package is `text-orange-700` → `text-primary-700` across ~14 link
instances and the body rhythm to canonical `sectionY`. orange-700 already measures **5.18** on white
and **PASSES** (`DESIGN_DELTA.md` §2.1, `--accent-strong` / `--btn-ground` row), so that is
tokenisation for a single future swap point, **not** a contrast fix. Do not describe it as one.

---

## 4. INSTRUMENTATION AND THE TRAP 22 CONTRACT

### 4a. The triple set

> **SUPERSEDED 2026-09-12 by DL-2. Read that first.** The table below was measured live on :3261 on
> 2026-09-11, before Phases 4 and 5 landed. It is now an incomplete subset and its counts are stale.
> **The current authority is the `PINNED` array in
> `construction-cis/web/src/tests/design/cta-attribute-diff.test.ts`: 24 declared triples in `src/`
> plus one kit triple, 25 in total.** Deriving command:
> `grep -rn 'data-cta' construction-cis/web/src --include=*.tsx --include=*.ts | grep -v tests/`
> plus `grep -rn 'data-cta' packages/web-shared/design/blog/BlogSidebarCta.tsx`.
> Added since: `calc_hero_help|hero|form` (Phase 4), `home_hero_book|hero|form`,
> `services_hero_book|hero|form` (Phase 5), `cis_refund_hero_book|hero|form`,
> `gps_hero_book|hero|form` (`8ea5aea9`). Also absent below but declared in source:
> `header_nav_secondary`, `header_mobile_primary`, `header_mobile_secondary`, `home_cta_primary`,
> `home_cta_secondary`, `see_result`, `deep_scroll_modal`, `deep_scroll_close`, `returning_bar`,
> `returning_bar_close`, `hero_cta`, `contact_pricing_link`.
> **`cis_refund_book_panel` and `gps_book_panel` do not exist**: added in `8ea5aea9`, removed in
> `05ddb709` because a wrapper id swallowed every click inside the form. Do not re-add them.
> **The "Total 798 across 9 triples" arithmetic below is WITHDRAWN, not restated.** It was a rendered
> count over 246 routes and cannot be re-derived without a build and a crawl. P6-A's snapshot is the
> re-measurement; until it exists, quote no total.
> What still binds unchanged: section 4b. The five LOCKED triples are byte-frozen, `null`s included.

`cta_baseline.json` (`sha 18b4f25f`, 246 routes, `served_title` asserted) is the pre-port truth.
The 2026-09-11 reading, kept for the record:

| Triple (`id\|placement\|goal`) | Count | Class | Status |
|---|---|---|---|
| `header_nav_primary\|header\|contact` | 246 | **LOCKED** | verified on `/`, `/contact`, `/about`, `/blog`, `/glossary/cis`, `/for/plumbers`, `/research/uk-construction-index` |
| `specialist_widget\|null\|null` | 246 | **LOCKED** | verified on all 8 probes. **Placement and goal are `null` and must stay `null`** |
| `next_step\|null\|null` | 109 | **LOCKED** | verified on `/for/plumbers`. **`null` stays `null`** |
| `next_step\|null\|form` | 18 | **LOCKED** | verified on a blog post |
| `hero_primary\|hero\|lead` | 1 | **LOCKED** | verified on `/` |
| `blog_sidebar_book\|sidebar\|form` | 82 | additive (Phase 2) | verified |
| `glossary_entry_book\|article\|form` | 50 | additive (Phase 3) | verified |
| `for_hero_book\|hero\|form` | 45 | additive (Phase 3) | verified |
| `blog_index_primary\|hero\|lead` | 1 | additive (Phase 2) | verified |

~~**Total 798 across 9 triples** (620 baseline + 178 additive). Arithmetic confirmed:
246+246+109+18+1 = 620; 82+50+45+1 = 178.~~ **WITHDRAWN, DL-2. Do not quote this number.**

### 4b. The rule that D8 corrects, stated as a constraint

> **The five LOCKED triples are byte-frozen, `null`s included.** No package adds
> `data-cta-placement` or `data-cta-goal` to `SpecialistWidget.tsx:560`, `NextStepOffer.tsx:39`,
> `HeroOffer.tsx:33`, the header, or the homepage hero. `DISPOSITION_SLICE3` §9's "every one carries
> `data-cta-placement`" applies to **NEW ids only**.

`specialist_widget` is the most exposed triple in this phase: **it renders on all 246 routes and its
component is in scope.** How it is protected, in four layers:

1. The restyle touches `className`, inline `#1e293b` and `text-red-600` only. `:560`'s attribute line
   is not in any diff.
2. `src/tests/design/cta-attribute-diff.test.ts` is the existing guard and is **run on every commit**
   of P6-C, P6-D, P6-E and P6-F. It extracts the declared triple **by attribute name**, so
   reformatting does not move it and a goal or placement edit does.
3. A live re-crawl of the 8 probe routes above, diffed against section 4a, at the end of P6-F.
4. `src/tests/assistant-journey-opener.test.ts` green **and byte-unchanged** (`git diff --stat` on
   that one path returning empty) is the separate proof no cadence moved.

### 4c. SSR blind spot, stated because it has bitten this programme

`data-cta-id=0` on every SSR crawl of all 15 in-scope routes, yet `StickyCTA.tsx:147` ships it. The
sticky bar, `DeepScrollModal`, `ReturningBar` and `NextStepOffer`'s conditional arms are **client**
renders and a curl-based snapshot cannot see them. Any acceptance test asserting `sticky_cta` appears
"in the rendered DOM" must read the **client bundle** or a real browser DOM, never a curl.

### 4d. New `data-cta` ids this phase adds (all route-unique, per D.3)

`template_invoice_xlsx_<variant>` ×3 · `template_invoice_pdf_<variant>` ×3 ·
`template_invoice_downloads_anchor` · `template_pds_xlsx` · `template_pds_pdf` ·
`template_pds_xlsx_footer` · `template_pds_pdf_footer` · `template_pds_cta_book` ·
`research_<slug>_hero_book` ×4 · `research_<slug>_hero_data` ×4 · `research_<slug>_lead_form` ×4 ·
`about_hero_book` · `about_cta_book` · `contact_lead_submit` · `thankyou_return_article` ·
`sticky_cta` + `sticky_cta_close` (the TD-32 rename) · `deep_scroll_secondary`.

Every new id carries `data-cta-placement` and, where it targets a form, `data-cta-goal="form"`.
**None reuses an id across routes** (the view groups without `page_path`). Research ids are
slug-suffixed so four routes do not merge into one `vw_cta_performance` row.

### 4e. Naming convention: the inconsistency, and the resolution

Trade's pre-port hero triple is `hero_primary|hero|lead`. Phase 3 shipped `for_hero_book|hero|form`
and `glossary_entry_book|article|form`. Nothing is deployed, so this is decidable now.

**The `goal` vocabulary was already mixed at baseline**, before any port: `contact` (header),
`lead` (homepage hero), `form` (`next_step` on blog). So there is no single pre-existing convention
to restore.

**Recommendation: adopt `goal` = what the click does, and change nothing that exists.**
`form` = scrolls to or focuses an on-page capture form. `contact` = navigates to `/contact`.
`lead` = legacy, frozen on the two routes that carry it (`hero_primary`, `blog_index_primary`) and
never used again. `placement` = the structural region the button sits in (`hero`, `sidebar`,
`article`, `footer`, `sticky`, `header`). Id = `<surface>_<position>_<action>`.

On that rule Phase 3's spellings are **already correct and stay as shipped**: `for_hero_book` is a
hero button that scrolls to an on-page form (`goal="form"`), and `glossary_entry_book` sits in the
article body (`placement="article"`), not the hero. The only inconsistency is the two frozen `lead`
values, and renaming those would be a T22 breach for a cosmetic gain. **Decision: keep all nine
triples exactly as they render today; apply the rule to the ~24 new ids only.** Record the `lead`
exception in the guard file's comment so the next reader does not "fix" it.

### 4f. Guards: what exists, what P6-A adds

**Existing, and two are tripwires that no package may modify:**

- `src/tests/lead-payload.test.ts` (74 ln) pins `siteConfig.leadConsentText` **verbatim** at `:36-40`,
  plus `:27` "specialist partner network", `:28` not-"Reflex", `:44-46` not-"DJH". One of the estate's
  7 consent pins. **Run on every commit of every package.** A restyle that trips it has touched the
  one thing T19 forbids. (Minor: its header comment at `:6` claims an assertion about the brand name
  that the file does not contain, and the pinned string does not contain the brand name. Stale
  comment; correct it, do not act on it.)
- `src/tests/assistant-journey-opener.test.ts` (872 ln), cadence pinned at `:832-`. Green **and
  byte-unchanged** is the §6 acceptance proof.

Also present and run: `design/{blog-cta-map, consent-anchor-drift, cta-attribute-diff, em-dash,
eyebrow-ground, hub-article-crawl-path, nav-active-state, niche-config-port, page-summaries,
penalty-figures}`, plus `lib/{niche-config, blog, lead-message, resources/resources}`,
`calculators/{tools, premium/premium-tools}`, `extras-qualifiers`, `lead-contactability-bridge`,
`lead-dossier`, `lead-submit-route`, `lead-submit-verify`.

**The TD-07 caveat, restated because it is why two defects survived two correction passes:** a green
test here does not prove the rule. `assistant-journey-opener.test.ts:706-711` asserts "Finance Act
2026, not Bill" against the resources-registry FAQ set while the live breach sat in a page's own
`faqs` array. **Any guard this phase adds must assert against the surface that actually renders.**

**P6-A adds exactly three things** (not the eight `DISPOSITION_SLICE3` §9 lists, see D2):

| New | Asserts | Why |
|---|---|---|
| `src/tests/design/schema-no-price.test.ts` | no builder in `src/lib/schema.ts` emits `priceRange`/`offers`/`price`/`AggregateRating`/`Review`, **and** the rendered JSON-LD of `/` and one `/locations/*` contains no `priceRange` | TD-01's Trade half is closed (B3) but nothing holds it closed. Asserting on source alone is the TD-07 mistake, so it asserts on the built HTML too |
| `scripts/_port/link_floor_check.mjs` + a `.test.ts` wrapper | every route in `link_baseline.json` at or above its floor; em-dash count not above baseline; `llms-full.txt` included explicitly as a route, not a page | **T14. No link-floor test exists anywhere in the estate.** ~20 lines over built HTML, run pre/post each package. `/book`, `/complete`, `/thank-you` are excluded **by name, not silently** |
| `src/tests/design/{calculator-tabs-crawl-path, first-sentence}.test.ts` | instantiated from `packages/web-shared/design/guards/` | the last 2 of the 4 kit templates. `calculator-tabs` is parameterised with the 12 registry slugs + two empty exemption lists; `first-sentence` takes the site's own excerpt function **passed in, not imported** |

---

## 5. THE PER-ROUTE LINK FLOOR TABLE (T14)

Floors are `link_baseline.json` (`sha 18b4f25f`, 246 routes, 5,301 links, 620 CTAs, 36 dashes).
"Live" is measured today on :3261 with the sweep metric. **Floors are binding: a decrease fails.**

| Route | Floor | Live today | Headroom | Notes |
|---|---|---|---|---|
| `/contact` | 14 | 20 | **+6** | Gate 5 deletes the self-referential block (1 link). Compensate with an `InlineLink` in the body, never by keeping the block |
| `/about` | 14 | 20 | **+6** | Few outbound links; the `LeadCTAPanel` adds, it does not subtract |
| `/privacy-policy` | 14 | 20 | **+6** | |
| `/terms` | 14 | 20 | **+6** | |
| `/cookie-policy` | 14 | 20 | **+6** | **The GA-opt-out deletion drops at least one external + internal link. Count before and after.** Headroom covers it, but assert it |
| `/cis-invoice-template` | **24** | 30 | **+6** | Breadcrumb ADDS links; `FaqSection` is link-neutral |
| `/cis-payment-deduction-statement-template` | **19** | 24 | **+5** | `LeadCTAPanel` + breadcrumb both add |
| `/research` (hub) | 18 | 24 | **+6** | Hub emits **no JSON-LD** at all, unlike its 4 children. Nav index, acceptable, recorded so nobody files it twice |
| `/research/uk-construction-index` | **20** | 24 | **+4** | Carries 2 CSV routes (`data`, `net-formation-data`), both 200 |
| `/research/uk-construction-insolvency-index` | 18 | 22 | **+4** | |
| `/research/uk-construction-payment-practices-league` | 18 | 22 | **+4** | |
| `/research/uk-construction-survival-index` | 19 | 23 | **+4** | |
| `/book` | **none** | 20 | n/a | `robots index:false`, absent from `sitemap.ts`, never crawled by the baseline |
| `/complete` | **none** | 20 | n/a | same |
| `/thank-you` | **none** | 20 | n/a | same, and explicitly `disallow`ed at `robots.ts:88` |
| `/admin/analytics/*` | **exempt** | n/a | n/a | §1h. Excluded by name |

**Do not invent a floor for `/book`, `/complete` or `/thank-you`.** Record the absence. Adding
`RelatedArticles` to `/thank-you` raises its count; that is fine and unmeasured.

**The +4 vs +6 discrepancy on the four research children is flagged, not diagnosed.** Chrome
contributes 20 destinations and `/about` measures exactly 20, so the flat pages are pure chrome. The
research children sit 2 below the same arithmetic. Two explanations are live and this plan does not
choose between them: body links that dedupe against chrome destinations, or 2 body destinations lost
since the baseline. **It is not a failure either way** (24 ≥ 20 on every one), and P6-E's acceptance
is the floor, not the arithmetic. A builder who "restores" two links on a guess will have invented
them.

---

## 6. WORK PACKAGES

Six packages. **P6-A is strictly first** (it builds the instruments everything else is measured
with). **P6-F is strictly last** (retirements, so the tree stays bisectable). **P6-B, P6-C and P6-E
run concurrently**; **P6-D follows P6-C**.

```
P6-A  ──▶  ┌ P6-B ┐
           │ P6-C ├──▶ P6-D ──▶ P6-F
           └ P6-E ┘
```

| WP | Scope | Verified paths | Property source | Spec | Acceptance tests | Depends on |
|---|---|---|---|---|---|---|
| **P6-A** | **Instruments and the ledger. No visual change, no route touched.** File TD-31, TD-32, TD-36..TD-40 in `LIVE_DEFECTS.md`. Author `schema-no-price.test.ts` and `scripts/_port/link_floor_check.mjs`. Instantiate the last 2 kit guards. Re-take the live CTA-triple crawl into the existing snapshot as the post-Phase-3 reference | `docs/construction-cis/_port/LIVE_DEFECTS.md`, `construction-cis/web/src/tests/design/*` (new), `scripts/_port/link_floor_check.mjs` (new), `packages/web-shared/design/guards/*` (**read only**) | `Property/web/src/tests/*` | §N, D.3, T14, T17, T22, T24 | all new tests green; both tripwires green **and byte-unchanged**; snapshot committed showing all 9 triples of section 4a incl. `specialist_widget\|null\|null`; `check_dependency_closure.py` green | **none. Must be first** |
| **P6-B** | **Template-download family.** 10 `data-cta` ids; `LeadCTAPanel` closing ask on the PDS page; `FaqSection` ×2 (unifying the two hand-rolled markups); `Breadcrumb` ×2 (+ its own BreadcrumbList JSON-LD); `scroll-mt-24` on `#downloads`; standard hero on both; **dark tail closed on both** | `src/app/cis-invoice-template/page.tsx`, `src/app/cis-payment-deduction-statement-template/page.tsx` | `Property/web/src/app/contact/page.tsx` (panel shape), `components/ui/FaqSection.tsx`, `components/ui/Breadcrumb.tsx` | §D.3, §0.5, §4a, §9, F.1 | floors **24** and **19** held (link-floor script); 10 new ids in the built HTML; `buildFaqJsonLd` arrays byte-unchanged; **last opaque band under `<main>` is light on both routes**; `cta-attribute-diff` green | P6-A; gates 10, 11 |
| **P6-C** | **Post-submit set, all three as ONE unit.** `SlimHero` ×3; `[1.6fr_1fr]` two-column body ×3; **every `max-w-2xl` gone**; `NoticeCard` ×6 replacing the hand-rolled cards; `WhatToExpectCard` ×3 (copy drafted against `privacy-policy:107-136`); `aria-current="step"` + `grid sm:grid-cols-3` progress; `?rt=` return link revived; `private, no-cache, no-store` ×3; `DetailsForm` wording swap (gate 1); dead `siteConfig` imports and the dead ternary removed | `src/app/{book,complete,thank-you}/page.tsx`, `src/components/forms/{DetailsForm,BookingPicker}.tsx` | `Property/web/src/app/{book,complete,thank-you}/page.tsx`, `components/ui/{SlimHero,NoticeCard}.tsx`, `components/property/WhatToExpectCard.tsx` | §F.6, §4d | `lead-payload.test.ts` green at **every** commit; `site.ts` md5 still `06814d48…`; `grep -rn 'max-w-2xl' src/app/{book,complete,thank-you}` = 0; `aria-current="step"` present; `consent-anchor-drift` green; **no floor assertion** (all three unbaselined) | P6-A; **gate 1** |
| **P6-D** | **`/contact` + `/about` + the 3 legal pages.** Navy motif hero + `#book` CTA ×2; `WhatToExpectCard` on `/contact`; `NumberedReasons` + `TopicSection` on `/about`; `LeadCTAPanel` closing ask on `/about`; GA opt-out section deleted; the cookie/privacy corrections of section 3; `text-orange-700` → `text-primary-700` | `src/app/{contact,about,privacy-policy,terms,cookie-policy}/page.tsx` | `Property/web/src/app/{contact,about}/page.tsx` | §F.7, §I, §0.5, T18 | floors **14 ×5** held; GA opt-out section absent from the built HTML of `/cookie-policy`; `schema-no-price` green; `cta-attribute-diff` green; **no new claim on either page that `/privacy-policy` does not support** | P6-A, **P6-C** (it redirects into that set, and the reassurance copy must already be settled); gates 2, 3, 5, 8 |
| **P6-E** | **Research, extraction first.** Extract `ResearchLayout.tsx` + `ResearchSection.tsx` (lift `Stat`/`Section` once), then the 4 pages inherit. `Breadcrumb variant="light"` ×5 (**TD-31**). Stat tiles off the dark hero into body `rounded-xl bg-slate-50 ring-1` tiles, value `text-primary-800 tabular-nums`. Hero CTA rows with slug-suffixed ids. `FaqSection` on the same arrays. The 5 raw `rgba(249,115,22,0.08)` chart literals tokenised onto `--chart-*`. Hub `rounded-2xl` → `rounded-xl`, `text-orange-600` → `text-primary-700` | `src/app/research/**/page.tsx`, `src/components/research/*.tsx` | `Property/web/src/app/research/landlord-tax-index/page.tsx`, `components/research/LandlordIndexCharts.tsx` | §0.5, §4a, §9 | floors **18/20/18/18/19** held; **12 new slug-suffixed ids**; **charts still carry no `role="img"` and no `aria-hidden`** (assert the absence); `HEADLINE_SENTENCE` h1s byte-unchanged; the 5 `data/route.ts` files byte-unchanged; **one** helper definition, not four | P6-A |
| **P6-F** | **Interruptive restyle, `llms-full.txt`, then RETIREMENTS as the final commit.** Restyle only, every threshold frozen: `StickyCTA` (`border-t-4 border-primary-600`, `btnPrimary` ≥44px, `max-w-5xl` → `siteContainerLg`), `ReturningBar` (`bg-orange-900` → `bg-slate-900` + primary rule), `DeepScrollModal` (`bg-orange-500` → `btnPrimary`), `NextStepOffer`, `HeroOffer`, `SpecialistWidget` (chips + submit to `btnPrimary`, inline `#1e293b` → token, `text-red-600` → `--form-error`). **TD-32**: `data-cta-id` → `data-cta="sticky_cta"` + placement + goal, and `sticky_cta_close` on the dismiss. `llms-full.txt` 8 em-dashes removed and the calculator list derived from the registry. Then section 8's deletions | `src/components/intent/*`, `src/components/support/SpecialistWidget.tsx`, `src/components/ui/StickyCTA.tsx`, `src/app/llms-full.txt/route.ts`, `src/tests/design/em-dash.test.ts` (budget row), deletions per section 8 | `Property/web/src/components/ui/StickyCTA.tsx` | §D.2, §6, §8, TD-28, TD-32 | **`assistant-journey-opener.test.ts` green AND `git diff --stat` on that path empty**; `specialist_widget\|null\|null` still 246 in a live re-crawl; `sticky_cta` + `sticky_cta_close` present **in the client bundle** (not a curl); `llms-full.txt` em-dash count **0** and its budget row deleted; `tsc --noEmit` clean after the deletions; `check_dependency_closure.py` green | **everything above**; gates 4, 12 |

**Concurrency note.** B, C and E touch disjoint file sets and share no component. The one shared
surface is `src/tests/design/cta-attribute-diff.test.ts`, which all three **run** and none of them
**edits**: if a package needs that snapshot changed, that is the regression the guard exists for, and
it stops and reports rather than editing.

**Exception, added 2026-09-12 (DL-3): P6-F OWNS `cta-attribute-diff.test.ts` and updates it.** The
`:237-245` assertion that `StickyCTA.tsx` carries `data-cta-id=` and not `data-cta=` is a deliberate
tripwire for the TD-32 rename, and its own comment says so. P6-F flips that assertion and adds
`sticky_cta` / `sticky_cta_close` to `PINNED`, in the rename commit, and names the new
`vw_cta_performance` row in the commit message and the deploy note. The no-edit rule above still
binds P6-B, P6-C, P6-D and P6-E, which run concurrently; P6-F runs strictly last and alone.

---

## 7. OFF LIMITS: OWNERSHIP TABLE

| Path | Owner | Why |
|---|---|---|
| `construction-cis/web/src/config/site.ts` | **NOBODY. Frozen.** | **T19.** md5 `06814d487e10f00fc9e5780de603c30c` at the end of every commit |
| `src/tests/lead-payload.test.ts` | **NOBODY. Tripwire.** | Consent pin. Run it, never edit it |
| `src/tests/assistant-journey-opener.test.ts` | **NOBODY. Tripwire.** | Cadence pin. Byte-unchanged is the §6 proof |
| `src/tests/design/consent-anchor-drift.test.ts` | NOBODY | Second consent pin (`:5`) |
| `packages/web-shared/**` | **Orchestrator only** | TD-K1 (`schema/local-business.ts:127`) and TD-K2 (`PremiumBarChart` reconciliation, B5). **Trade does not reach either.** Hand up, never edit |
| `src/components/layout/SiteFooter.tsx` | Another agent (held since Phase 3) | `PHASE3_PLAN` correction 9. Still modified in the working tree |
| `src/app/globals.css`, `src/components/ui/layout-utils.ts` | Phase 1, **complete** | Phase 6 **consumes tokens only and adds none**. `--warn-1..4`, `--btn-ground*`, `--accent-strong`, `--hero-cream`, the `--color-primary-*` ramp and `globals-standard.css` are all in place |
| `src/app/resources/**`, `src/components/resources/ResourceGate.tsx` | Phase 3, **complete** | D1. Already ported |
| `src/app/page.tsx`, `src/app/{cis-refund,gross-payment-status,services}/**`, `src/lib/calculators/**`, `src/components/calculators/**` | **Phase 5** | Homepage, pillars, calculators. Includes the 5 calculator em-dash files and `PremiumBarChart` |
| `src/app/{for,locations,glossary,blog}/**`, `src/components/blog/**` | Phases 2 and 3, complete | Do not re-do `.prose-blog` fixes; they already landed on 50 glossary + 25 city + 82 blog routes |
| `src/app/admin/**` | **EXEMPT** | §1h. Out of the port and out of the ramp sweep |
| `src/lib/leads/{reply-ack,aux-cron}.ts`, `src/lib/leads/**` | **NOBODY in this phase** | B9. Transactional email and SMS, not a web surface. Gate 9 only |
| `src/app/research/**/data/route.ts` (5 files) | NOBODY | The data-asset contract. Byte-unchanged |
| `niche.config.json` | **Orchestrator** | Any change ripples through `cta.variants` and therefore through the locked triples |

---

## 8. RETIREMENTS (final commit of P6-F, so the tree stays bisectable)

Importer counts **re-grepped this run** by resolved specifier (`from` / `import(` / `require(` plus
JSX usage), self-references excluded. Three build phases have shipped since
`DISPOSITION_SLICE3` §8 was written and **two of its five rows have changed**.

### DELETE (0 importers)

| File | Lines | Importers | Evidence | Verdict vs §8 |
|---|---|---|---|---|
| `src/components/blog/ExitIntentModal.tsx` | n/a | n/a | **File does not exist.** Deleted in `6575bbb6` (Phase 2) | **ALREADY GONE.** §8 row is void |
| `src/components/experiments/useExperiment.ts` | 23 | **0** | `:11` imports the shared factory (self-ref). The only `useExperiment*` consumer, `src/lib/experiments/exposure.ts:13`, imports from the **shared package** | SAFE TO DELETE. Confirms §8 |
| `src/lib/experiments/assign.ts` | 29 | **0** | `:12` self-ref to `@accounting-network/web-shared/experiments/assign`. Raw basename greps for "assign" are prose noise in `data.ts` / `trade-types.ts`, not imports | SAFE TO DELETE. Confirms §8 |
| `src/lib/experiments/exposure.ts` | 15 | **0** | The real consumer, `src/components/forms/MiniCapture.tsx:24`, imports the **shared** package directly, not this shim | SAFE TO DELETE. Confirms §8 |
| **`src/components/resources/ExcelPreview.tsx`** | **458** | **0** | **NOT on §8's list.** `grep -rn 'ExcelPreview' src scripts content` outside the file returns nothing; neither template page has a `dynamic(` or `import(`; its only occurrence is its own export at `:391`. Its header comment at `:6` still says "before entering their email", so it is a casualty of the R3 gated-resources build (shipped `e08808c50`, never mounted) | **NEW. SAFE TO DELETE.** This replaces `DISPOSITION_SLICE3` §4.11's entire restyle spec (B8) |

Net: **four files, 525 lines.** A **three-file dead experiment layer** over
`@accounting-network/web-shared/experiments/*`, plus one orphaned 458-line component.
`src/config/**` re-confirmed clean: no dead files. Two files have **test-only** importers and are
**NOT dead**, flagged, not deleted: `src/lib/lead-message.ts`, `src/lib/support/faq.ts`.

### UNMOUNT-THEN-DELETE SEQUENCE

**None is required, and that is the point of putting them last.** Every file above is already
unmounted, which is why all four can be taken in **one commit at the end**. The sequence, stated
explicitly so it is followed rather than assumed:

1. P6-B..P6-F ship and are green. Nothing is deleted yet.
2. **Verify unmount at that moment, not at plan time**: re-run the importer grep for all four files
   against the tree as it then stands. A package may legitimately have started importing something.
3. Delete the four files in **one** commit.
4. `npx tsc --noEmit` clean, `npm test` green, `python scripts/check_dependency_closure.py` green
   (T24: a deletion can break the declared dependency closure).
5. Correct the two stale comments naming `ExitIntentModal`
   (`intent/DeepScrollModal.tsx:44`, `support/SpecialistWidget.tsx:15`) in the same commit.
   **The two `sessionStorage` keys stay**: `bfp_modal_shown` and `bfp_assistant_active` are still read
   by both components.

### RETIRE (replaced in place, not deleted as files)

6 hand-rolled notice cards (`book:36-44`, `complete:18-27`, `:46-55`, `:83-95`,
`DetailsForm:158-173`, `:175-185`) → `NoticeCard` · the 4 duplicated `Stat`/`Section` helper pairs →
`ResearchLayout` · `void returnPath;` (`thank-you:23`) · the dead identical-branch ternary
(`thank-you:47-51`) · the dead `siteConfig` imports (`book:4`, `complete:4`) · the self-referential
"Prefer to contact us directly?" block (`contact:80-92`, **gate 5**) · `data-cta-id` as an attribute
name (one instance, `StickyCTA:147`, **gate 4**) · the GA opt-out section
(`cookie-policy:113-125`) · `em-dash.test.ts`'s `"app/llms-full.txt/route.ts": 8` budget row.

### BASELINE RESTATEMENT

**No `data-cta` id is deleted in this phase**, so no deploy-watch baseline restatement is owed. The
one rename (`data-cta-id` → `data-cta`, TD-32) **ADDS a `vw_cta_performance` row that has never
existed**; say so in the commit message so nobody reads the new row as a regression, and say so again
in the deploy note.

### T26 TRANSITIONAL MAPPING

Nothing in this phase retires a font or a class family, so no transitional no-op is owed. The one
family that moves is the warning/duty set onto T-W1, and `BRAND_LAYER.md` §4.6 establishes that
ladder is **net-new on this site**, so there is no legacy family to alias.

### T30

Five unlayered CSS rules were recorded as silently beating consumers' utilities. **Phase 6 edits no
CSS file** (section 7), so it neither creates nor closes a T30 instance. It inherits Phase 2's move
of `.prose-blog a` into `@layer components`. If a package finds itself wanting a new global rule,
that is a signal it is reaching outside its scope: stop and escalate.

---

## 9. DEFECT LEDGER: WHAT THIS PHASE FILES AND CLOSES

**Files (P6-A's first commit).** Seven rows are missing from `LIVE_DEFECTS.md` today:

| id | Surface | Defect | Class | Source |
|---|---|---|---|---|
| **TD-31** | `Breadcrumb` default variant inside `bg-neutral-900` heroes on all 5 `/research/*` routes | `text-neutral-500` links on a dark ground = contrast failure on 5 routes, while the component already ships `variant="light"` and no call site passes it | a11y / contrast | proposed `DISPOSITION_SLICE3` §13.5a, **never filed** |
| **TD-32** | `src/components/ui/StickyCTA.tsx:147` | `data-cta-id`, which `packages/web-shared/analytics/autoCapture.ts:100` (`closest("[data-cta]")`) does not match. **The site's only persistent site-wide CTA has never emitted a single `cta_click`**, and its dismiss button has no id at all. The only surface in either repo using `data-cta-id` | instrumentation | proposed `DISPOSITION_SLICE3` §13.5b, **never filed** |
| **TD-36** | `cookie-policy:19-21,24,50-60`; `privacy-policy:204` | Describes web storage as "cookies" throughout. Zero `document.cookie` in the analytics path | T18 compliance copy | **new this phase** |
| **TD-37** | `cookie-policy:28-30` | "We do not currently use any strictly necessary cookies" against the live admin session cookie (`api/admin/login/route.ts:78`) | T18 compliance copy | **new this phase** |
| **TD-38** | `privacy-policy:169` | "Consent records are kept for up to six years", `retention.ts:78` preserves them unconditionally and no expiry job exists | T18, code-vs-copy | **new this phase** |
| **TD-39** | `privacy-policy:166-167` | "after which it is deleted", `api/cron/lead-retention/route.ts:52-53` is dry-run unless `LEAD_RETENTION_PURGE_ENABLED=1` | T18, code-vs-copy | **new this phase** |
| **TD-40** | `src/app/api/og/route.tsx:33,62,85,101` | Hardcoded `white` / `#1e293b` / `#64748b` and no custom font loaded, so every social card renders off-token and in the edge default face while the site is Geist | brand / design | **new this phase** |

**Closes in this phase:** TD-15 (gate 1), TD-16, TD-17 + TD-36 + TD-37 (gate 2), TD-19 (gate 5),
TD-22's one app-route instance (`#downloads`), TD-28's `llms-full.txt` 8, TD-31, TD-32 (gate 4),
TD-40's colours. **TD-13/TD-14/TD-18** close on this phase's surfaces only (gates 5, 8).

**Hands up to the orchestrator, does not close here:** TD-K1 (kit `priceRange`, B4), TD-K2 (kit
`PremiumBarChart`, now **divergent**, B5).

**Explicitly declines:** the 4 unpaired research charts (B6/B7), TD-34's hedged-but-unattributed
residual (`house_positions.md` §13 permits the framing), TD-20 (`/pricing`, inside the dormant
`isPackagesMode` branch), the `api/og` custom font (TD-40's second half).

---

## 10. OWNER GATES, IN PLAIN LANGUAGE

> **ALL TWELVE ARE ANSWERED. Owner decision, 2026-09-12: every recommendation below is ACCEPTED as
> written. Gates 1, 2, 4, 5, 6, 7, 8, 9, 10, 11 and 12: build to the recommendation, do not wait,
> do not re-ask.** Blocking-on-gate is no longer a reason for any package to stop.
>
> **Gate 3 is the one exception and its ruling REPLACES the recommendation printed under it: CHANGE
> NOTHING.** See DL-7. Property publishes the identical two retention sentences
> (`Property/web/src/app/privacy-policy/page.tsx:201-203`), ships the same daily purge cron
> (`Property/web/vercel.json:9`) which is equally dry-run unless `LEAD_RETENTION_PURGE_ENABLED` is
> set (`.../api/cron/lead-retention/route.ts:52-55`), and has no six-year consent expiry job either.
> Trade is a clone of Property. **Phase 6 must not touch those retention sentences.** TD-38 and
> TD-39 remain filed as the record; their remedy leaves Phase 6's scope and becomes an owner item for
> a separate slot, words ahead of code, estate-wide, and the job anonymises rather than deletes.
> **Gate 2's other half is unaffected and IS Phase 6 work**: stop calling web storage "cookies",
> drop the Google Analytics opt-out section for analytics this site does not run, and say what is
> actually recorded, city, region and timezone against a lasting visitor id, not just a country.
>
> Record each outcome against its gate below as the phase closes (§11f), dated.

Numbered. Each one names what happens if the answer is "leave it", because that is a real option.

1. **The page that asks for your phone number says we only use it to arrange your review. We then
   share it with up to six firms.** The correct wording is already written and sitting in the config
   file. Use it, or leave the page contradicting our own privacy policy. **This touches wording next
   to a form field, which is the one change that has cost us real leads before, so it is yours to
   approve, not ours.** *Recommend: use the correct wording. It is a swap to an existing, already
   conversion-tested string, not new copy.* Blocks P6-C.
2. **Our cookie page understates what we record, calls web storage "cookies", and tells people to
   opt out of Google Analytics we do not run.** We say we keep only a country; we keep city, region
   and timezone against a lasting visitor id. *Recommend: delete the Google Analytics section and say
   what we actually store.* Blocks P6-D.
3. **Two things our privacy page promises are not things the code does.** We say consent records are
   kept "up to six years" (nothing ever deletes them) and that enquiry data "is deleted" at 24 months
   (the deletion job runs in test mode unless a setting is switched on). Either change the words or
   change the code. ~~*Recommend: switch the deletion job on and give consent records a real expiry.*~~
   **RULED 2026-09-12: CHANGE NOTHING in Phase 6.** Property publishes the identical sentences and
   runs the identical dry-run job, so Trade is in step with the estate, not adrift from it. The gap
   is real and it is estate-wide; it leaves this phase and becomes an owner item for its own slot.
   **No Phase 6 package edits those two sentences or that cron.** See DL-7.
4. **The bar at the bottom of every page has never been measured, because of a one-word mistake in
   the code.** Fix the word and add a tag to its close button. This starts a brand-new measurement
   stream rather than changing an old one, so nothing in our history moves. Separately, the bar
   appears at 25% scroll here against 30% elsewhere in the estate. *Recommend: fix the word, and keep
   our 25%.* Blocks P6-F.
5. **Our contact page tells people to "contact us directly" and then links them back to the contact
   page.** There is no phone number or email published anywhere. Give us a real direct route to
   publish, or we delete the block. *Recommend: delete it.* Blocks P6-D.
6. **Three free guides are live and indexed and nothing on the site links to them.** Zero visits,
   ever. This is a linking gap, not a broken page. *Recommend: link to them from the pages about the
   same topic now, and consider a guides index page later.* **Not Phase 6 work** (the pages
   themselves were rebuilt in Phase 3); this gate only decides whether the links get added.
7. **One of our calculator capture forms is a version the Property site switched off in August.** It
   produced a real enquiry here on 20 August. *Recommend: keep it, and measure it.* **Phase 5's
   surface**, listed here so it is not lost.
8. **Fifteen places on the site promised a reply within 24 hours, four of them calling it a
   guarantee. A sweep closed 23 of them across 19 files.** What is left on Phase 6's own pages is the
   assistant widget's "A specialist replies within one working day" and the about page's
   fixed-fee-plus-turnaround sentence. We do not reply: partner firms do, and our own privacy page
   allows them 48 hours. *Recommend: remove both.* Blocks P6-D and P6-F.
9. **Four turnaround-flavoured phrases remain on purpose, in text messages and emails.** Three are
   the sign-off "Speak soon", which is a valediction, not a promise, and a reviewer who disagreed was
   arguing about a greeting. The fourth is different: the post-opt-in text message says "A specialist
   will call you **shortly**", which is a response-time promise, made to someone who has just handed
   over their details, about a call a partner firm has up to 48 hours to make. *Recommend: keep the
   three "Speak soon" sign-offs, and drop the single word "shortly".* **These are emails and text
   messages, not web pages, so no Phase 6 package may touch them.** This gate decides a separate
   one-line change.
10. **Our two free-template pages are the keenest visitors we get and one of them asks for nothing.**
    28 people downloaded a template in 19 days and not one reached the contact page. Add a plain
    block at the bottom of the statement-template page offering a review. It is not a popup, nothing
    appears on its own, and the sibling page already has exactly this. *Recommend: yes.* Blocks P6-B.
11. **We cannot currently tell whether anything on those template pages works.** None of the ten
    download buttons is tagged, so there is no before-and-after to compare across the redesign. Tag
    them in the same change. Port time is the cheapest moment. *Recommend: yes.* Blocks P6-B.
12. **We are deleting four unused files, 525 lines, including a 458-line spreadsheet-preview
    component that nothing on the site has ever rendered.** *Recommend: yes, and in the last commit
    of the phase so the history stays easy to bisect.* Blocks P6-F's final commit.

### 10a. GATE OUTCOMES, RECORDED 2026-09-12 (§11f)

Closed by P6-F at the end of the phase. "Built" means the change is in the working tree and the
suite is green on it; **nothing is deployed** (§11g). Where a gate's work belongs to a package that
did not run, that is said plainly rather than reported as closed.

| Gate | Ruling | Outcome, 2026-09-12 | Where |
|---|---|---|---|
| 1 | Use the correct `DetailsForm` wording | **BUILT** by P6-C. The page now renders `siteConfig.leadConsentText` plus the Privacy Policy link, the same string every other capture surface uses. `site.ts` untouched, md5 still `06814d48...`, `lead-payload.test.ts` green and byte-unchanged | `src/components/forms/DetailsForm.tsx:204` |
| 2 | Delete the GA opt-out section, stop calling web storage "cookies", say what is actually stored | **BUILT** by P6-D, 2026-09-12 (it ran last, out of order). GA opt-out section deleted; the page now distinguishes a cookie from browser storage and names `localStorage`/`sessionStorage`; it says country, city, region AND timezone and drops the word "anonymous"; the absolute "no strictly necessary cookies" is qualified to name the admin sign-in cookie. Every claim re-verified in the handler and the login route before writing, not from the plan. The IP-location correction was made in BOTH published places (row 3 of section 3). TD-16, TD-17, TD-36, TD-37 CLOSED | `src/app/{cookie-policy,privacy-policy}/page.tsx` |
| 3 | **CHANGE NOTHING** (DL-7) | **HONOURED.** No package edited the two retention sentences or the cron. Verified by re-grep: `privacy-policy` `:166-167` and `:169` are as published, matching Property byte for byte. TD-38 and TD-39 stay filed as the record and leave the phase | `src/app/privacy-policy/page.tsx` |
| 4 | Fix the attribute, KEEP the 25% | **BUILT** by P6-F. `data-cta-id` → `data-cta="sticky_cta"` + `data-cta-placement="sticky"`, and `sticky_cta_close` on the dismiss. `SCROLL_THRESHOLD` 500 and the `0.25` factor are **unchanged**. TD-32 CLOSED. **Two new `vw_cta_performance` rows, no history moved**: in the commit message and in the deploy note | `src/components/ui/StickyCTA.tsx` |
| 5 | Delete the self-referential "contact us directly" block | **BUILT** by P6-D. Deleted, replaced with `WhatToExpectCard` (all strings passed explicitly, each checked against `/privacy-policy` section 5). Floor arithmetic: the deleted `<a>` pointed at `/contact`, already a chrome destination (`SiteFooter.tsx:28`), so **0 unique internal destinations lost**; the added `Breadcrumb` points at `/`, also chrome. Floor 14, live 20, still 20. No compensating link invented. TD-19 CLOSED | `src/app/contact/page.tsx` |
| 6 | Link the three orphaned guides | **NOT PHASE 6 WORK** by its own terms, and no package touched `src/app/resources/**`. Still owed as a linking decision | n/a |
| 7 | Keep the calculator capture form and measure it | **PHASE 5'S SURFACE.** No Phase 6 package touched `src/components/calculators/**`. Nothing changed, which is the ruling | n/a |
| 8 | Remove both remaining turnaround promises | **BUILT, both halves.** The assistant widget's sentence was already closed in the 2026-09-11 TD-14 sweep (`SpecialistWidget.tsx:383`); P6-F re-verified it. P6-D closed the `/about` half on 2026-09-12. **Correction to this gate's own wording**: by the time P6-D read the file, `about/page.tsx:39` carried NO turnaround promise, only the fee claim. The 19-file TD-13/TD-14 sweep had already taken the turnaround half out; the gate text was stale, not the page. The fee half is now "Fees are agreed before any work starts. The specialist firm you speak to sets its own fee and agrees it with you up front", which is the wording TD-18 pins for all 11 call sites of the claim shape. TD-18 PARTLY CLOSED: `/about` done, **10 instances still live** in other packages' files | `src/app/about/page.tsx` |
| 9 | Keep the three "Speak soon", drop the word "shortly" | **NOT PHASE 6 WORK.** `src/lib/leads/**` is off limits to every package (section 7) and no package touched it. The one-line change is still owed in its own slot | n/a |
| 10 | Add a closing ask to the statement-template page | **BUILT** by P6-B. `LeadCTAPanel` at `cis-payment-deduction-statement-template/page.tsx:325`. Not a popup, nothing appears on its own | that file |
| 11 | Tag the ten download buttons | **BUILT** by P6-B. Six pinned rows in `cta-attribute-diff.test.ts` (the invoice page's six rendered ids are declared as two template literals, which is what the extractor reads). New goal value `download`, deliberately distinct so the download family cannot be confused with a capture id | both template pages |
| 12 | Delete the four unused files in the last commit | **BUILT** by P6-F, in the final commit. 525 lines. Unmount re-verified at deletion time, not at plan time: `grep` for each resolved specifier across `src`, `scripts`, `content` and `packages` returned **0 importers** for all four. `tsc --noEmit` clean and `check_dependency_closure.py` green **after** the deletion | see section 8 |

~~**The gap this table exists to make visible: P6-D did not run.**~~ **CLOSED 2026-09-12: P6-D ran
last, alone, on its own five files.** §11d's "every sentence on the 3 legal pages either matches the
code or has been corrected" is now **satisfied**, less rows 6 and 7 which gate 3 removed from scope
and which were not touched (re-verified: `privacy-policy` sections 6 is as published). Suite green at
**438 / 29 files**, `tsc` clean, both tripwires byte-unchanged, `site.ts` md5 unmoved.

**The gap that REPLACES it, and it is bigger than the one it closes.** The "fixed fee" claim shape
TD-18 describes is on **11 source lines, not the 3 the entry lists**, and 10 of them are in other
packages' files: `src/config/service-tiers.ts:35`, `src/app/page.tsx:292,395,678`,
`src/app/services/page.tsx:239`, `src/app/cis-refund/page.tsx:285`,
`src/app/gross-payment-status/page.tsx:281` (= TD-41), `src/app/blog/page.tsx:158`,
`src/app/glossary/page.tsx:149` and `src/app/glossary/[slug]/page.tsx:172` (that last pair renders on
50+ routes). P6-D established ONE wording and put it live on `/about`; per DL-9 the sweep is scoped
to the rule and the whole site, so these are the orchestrator's to route to that wording rather than
to a rival one. Separately, `src/components/marketing/MarketingSections.tsx:37` still republishes
`/about`'s OLD client-base sentence on the homepage and `/contact`, having lifted it before P6-D
corrected it.

**Standing, and not a gate because the answer is already no:** no new modal, banner, toast, popup or
exit-intent, and no change to any existing trigger, threshold or cadence. The interruptive stack in
this phase is **restyle only**.

---

## 11. THE PORT-LEVEL DEFINITION OF DONE

Everything below must be true before the owner walk. Phase 6 owns the rows marked **P6**; the rest
are inherited and must be re-checked, not assumed.

### 11a. Build and guards

- [ ] **P6** `npx tsc --noEmit` clean.
- [ ] **P6** `npm test` green, **including both tripwires**, and
      `git diff --stat -- construction-cis/web/src/tests/assistant-journey-opener.test.ts` and
      `.../lead-payload.test.ts` both **empty**.
- [ ] **P6** `md5sum construction-cis/web/src/config/site.ts` = `06814d487e10f00fc9e5780de603c30c`.
- [ ] **P6** `python scripts/check_dependency_closure.py` green (T24), re-run **after** the deletions.
- [ ] **P6** A **production build**, never a dev server, is what every measurement below runs against.
- [ ] **P6** All **13** `src/tests/design/*.test.ts` guards green: the **10** that exist today
      (`blog-cta-map`, `consent-anchor-drift`, `cta-attribute-diff`, `em-dash`, `eyebrow-ground`,
      `hub-article-crawl-path`, `nav-active-state`, `niche-config-port`, `page-summaries`,
      `penalty-figures`) plus P6-A's 3 new ones. **Corrected 2026-09-12, DL-6: the old count of 14
      was wrong.** `route-exists.ts` is in that directory and is a shared test HELPER with no `it()`
      blocks; it is not a guard and is not counted. Assert the FILE COUNT as well as the pass count,
      so a guard that stops being collected fails loudly instead of passing silently. Current case
      counts are 42 across the 10 files (Phase 5 added cases to `niche-config-port` and
      `penalty-figures`, not new files).

### 11b. The verification contract, per instrument

- [ ] **P6** `scripts/_port/link_floor_check.mjs`: every one of the 246 routes in
      `link_baseline.json` at or above its floor. `/book`, `/complete`, `/thank-you` excluded **by
      name**; `/admin/*` excluded **by name**.
- [ ] **P6** CTA triples: a live re-crawl reproduces section 4a exactly. **The five locked triples
      byte-identical, `null`s included**, at 246 / 246 / 109 / 18 / 1. New ids present and
      route-unique. **The sticky and modal ids checked in the client bundle, not by curl** (§4c).
- [ ] **P6** Em-dash: `src/tests/design/em-dash.test.ts` green with the `llms-full.txt` budget row
      **deleted**; the served `/llms-full.txt` returns **0**; the 2 en-dashes in money ranges
      untouched.
- [ ] **P6** `schema-no-price`: no `priceRange` in the rendered JSON-LD of `/` or a `/locations/*`.
- [ ] Inherited: `browser_check.mjs --contrast`, **use the contrast path, not the grounds path.**
      `PHASE3_PLAN` correction 1 establishes the grounds path cannot read `oklch()` and does not see
      `<article>`, so **neither `darkOnDark` nor `bands` may be an acceptance test on its own.**

### 11c. The dark-on-dark closure gate (§3a)

- [ ] Inherited. The real total is **29** routes whose last opaque band under `<main>` is dark, not
      the 79 that was originally recorded. Phase 3 closes 25 (`/locations/[slug]`). **P6** closes
      **2** (`/cis-invoice-template`, `/cis-payment-deduction-statement-template`; line numbers
      unverified, grep for the band). **Phase 5's 2 are DONE**: `8ea5aea9` reworked both pillar
      closing bands onto `LeadCTAPanel contained`, so `/cis-refund` tails stone-100, cream, navy and
      `/gross-payment-status` tails white, cream, navy. **Corrected 2026-09-12, DL-4: 25 + 2 (done)
      + 2 (owed) = 29, and Phase 6's two are the only ones outstanding.**
- [ ] **The gate is: 0 of 246.** Verified by reading the served HTML of the 29 named routes and
      confirming the last opaque band under `<main>` is light, **not** by trusting the instrument's
      boolean. Either tail shape satisfies it: panel-then-FAQ, or `LeadCTAPanel contained` (which
      renders its own `bg-slate-50` section).
- [ ] Adjacent-band breaches: **48** at baseline, 46 of them Phase 3's. Phase 6 must not add one.
      Grounds set **explicitly** per section, never auto-alternated; navy never touching navy or the
      footer.

### 11d. Copy, claims and compliance

- [ ] **P6** Every sentence on the 3 legal pages either matches the code or has been corrected.
      Section 3's 14 rows are the checklist, **less rows 6 and 7** (TD-38, TD-39, the two retention
      sentences), which gate 3's ruling removes from this phase: they stay as published and match
      Property byte for byte. DL-7.
- [ ] **P6** No reassurance string anywhere in the port claims something `/privacy-policy:107-136`
      does not support. That page is the reference, never the reverse.
- [ ] **P6** No consent-adjacent string changed except gate 1's swap to the existing config value.
- [ ] Inherited: no client-outcome or aggregate-performance claim about our own client base (TD-10,
      TD-33 closed); no fee, price band or turnaround guarantee anywhere (TD-01, TD-13, TD-14,
      TD-18); every published number re-derivable from `house_positions.md`.
- [ ] **P6** No em-dash in user-facing copy on any surface this phase owns, `llms-full.txt` included
      **because it is a route, not a page**, and an HTML-only sweep cannot see it.

### 11e. Instrumentation integrity

- [ ] **P6** No `data-cta` id deleted anywhere in the port, so no deploy-watch baseline restatement
      is owed. The one **addition** (`sticky_cta`, TD-32) is called out in its commit message **and**
      in the deploy note, so the new `vw_cta_performance` row is not misread as a regression.
- [ ] **P6** `specialist_widget` still renders on all 246 routes with `placement` and `goal` **null**.
- [ ] Post-walk, not a build item: run `DISPOSITION_SLICE3` §9's `personalization_shown` query before
      anyone adds instrumentation to `DeepScrollModal`. The denominator already exists under a
      different `event_name`; Phase 0 queried only `cta_click` and could not see it (D10).

### 11f. Ledger and handover

- [ ] **P6** `LIVE_DEFECTS.md` complete: TD-31, TD-32, TD-36..TD-40 filed; every id this phase closes
      marked CLOSED with its evidence, as TD-10, TD-33 and TD-35 already are.
- [ ] **P6** TD-K1 and TD-K2 handed to the orchestrator **in writing**, with B5's md5 divergence
      recorded, and **not edited** by any Trade package.
- [ ] **P6** `docs/construction-cis/STATE.md` pickup block rewritten to say what is committed versus
      what is working-tree, because that block has been stale at the start of two phases running.
- [ ] **P6** Owner gates 1-12 answered and the outcomes recorded **in this file**, dated.
- [ ] **P6** Section 8's four deletions taken in the final commit, after step 2's re-verification.

### 11g. Explicitly NOT in the definition of done

Nothing is deployed. `standard_terms` 3: **deploy is user-triggered.** No package runs
`vercel deploy`, `deploy-and-index.ps1` or IndexNow. The phase ends with a green local production
build and a walk.

---

## 12. RISKS, WITH RECOMMENDED RESOLUTIONS

| # | Risk | Why it is live | Recommended resolution |
|---|---|---|---|
| 1 | **A package adds `data-cta-placement` to `specialist_widget` and splits 246 routes of funnel history.** | `DISPOSITION_SLICE3` §9 instructs exactly this in one sentence, and it reads as good hygiene | Section 4b states the constraint as a rule, `cta-attribute-diff` catches it mechanically on every commit, and P6-F ends with a live re-crawl. **Three layers, because one sentence in a spec caused it.** |
| 2 | **Someone "fixes" the consent wording while restyling a form.** | Four capture surfaces in this phase sit beside a capture field, and one of them is already false | `site.ts` frozen by md5 in the per-commit check; two independent byte-exact pins (`lead-payload`, `consent-anchor-drift`); gate 1 is the only sanctioned change and it is a swap, not new copy |
| 3 | **A builder adds a second `LeadForm` to `/cis-invoice-template`** because the family is described as capture-free. | The brief and the disposition both carry the imprecise version | §1d names which page has a form and which does not, and P6-B's scope says "closing ask on the **PDS** page" |
| 4 | **A builder restyles `ExcelPreview.tsx` for a day** because the disposition specs six changes to it. | §4.11 is detailed and confident | B8 and section 8 move it to RETIRE, and P6-B's scope does not list it |
| 5 | **A package runs `intent-engine.test.ts`, gets a green run over zero specs, and calls the cadence proven.** | The brief names a file that does not exist | B1 names the real file; P6-F's acceptance requires `git diff --stat` on that path to be **empty**, which a non-existent file cannot satisfy |
| 6 | **The grounds instrument reports a false dark-on-dark pass or fail.** | It cannot read `oklch()` and does not see `<article>` | §11b forbids using `darkOnDark` or `bands` as an acceptance test on their own; §11c requires reading the served HTML of the 29 named routes |
| 7 | **Phase 6 goes green and the §3a gate is reported closed.** | It is the last build phase, so "last" reads as "complete" | **PARTLY SATISFIED 2026-09-12, DL-4. Phase 5 HAS landed** (`8ea5aea9`) and its 2 routes are closed, so "the gate cannot close until Phase 5 lands" no longer applies. The live half of the risk does: a green Phase 6 still does not prove 0 of 246. §11c stands, read the served HTML of all 29 named routes on a production build, never the instrument's boolean, and note `--grounds` was repaired a third time at `4431cf4d`, so **re-derive every grounds figure taken before it rather than re-quoting one** |
| 8 | **The research floors are "restored" to +6 by inventing two links.** | The +4 looks like a regression against `PHASE3_PLAN`'s arithmetic | Section 5 flags it as undiagnosed, states both live explanations, and makes the **floor** the acceptance, not the arithmetic |
| 9 | **Deleting the GA opt-out section drops `/cookie-policy` below its floor.** | It is the only package whose main job is a deletion | +6 headroom covers it, but P6-D's acceptance asserts the floor before and after rather than assuming |
| 10 | **Someone corrects the `leadConsentText` / privacy-policy plurality "divergence".** | It genuinely looks like an inconsistency | Section 2's closing note: it is deliberate layered transparency, documented in two places, and the honest one-liner collapsed conversion to zero in August |
| 11 | **A phase-6 edit lands in `packages/web-shared` because TD-K1 is one line.** | It is genuinely one line, and it is a banned claim | Section 7 makes the kit orchestrator-only. Trade does not reach that module (B4), so fixing it changes nothing for Trade and risks 15 other sites |
| 12 | **The turnaround-email question gets settled by a builder.** | It is in this brief, so it reads as in scope | Gate 9, and section 7 makes `src/lib/leads/**` off limits to every package |
