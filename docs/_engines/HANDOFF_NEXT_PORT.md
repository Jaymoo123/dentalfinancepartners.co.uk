# Handoff: port the next estate site to the Property design standard

Port the next estate site to the Property design standard.

FIRST, in this order, before anything else:
1. Load the `standard_terms` skill. It governs everything and wins on conflict.
2. Run `python scripts/port_preflight.py`. It must exit 0 before you plan or measure
   anything. It checks for stray dev servers, a STATE.md that contradicts its git tags,
   uncommitted port artefacts, and the instrument fixture test. If it fails, fix what it
   names first. Every one of those failed again on the last port, including at the end,
   when three servers were left listening and the pickup block claimed phase 2 while git
   had tags to phase 6.
3. Read the STOP block on screen one of `docs/_engines/DESIGN_PORT_PLAYBOOK.md`, then
   section 2.1, then section 13. Read `docs/_engines/PORT_FIELD_NOTES.md` sections 4, 5,
   6, 10 and **11**. Section 11 is the newest and carries an estate-wide defect plus a
   correction to a command the playbook itself got wrong.

STATE OF PLAY. Six sites are ported: generalist, solicitors, dentists, medical,
construction-cis and contractors-ir35, all six phases built and tagged. NOTHING IS PUSHED
and NOTHING IS DEPLOYED. Production serves the pre-port SHA on every site. Eleven sites
remain. Do not push and do not deploy: both are owner-triggered, and the walk happens at
the end once everything is done.

**contractors-ir35 is genuinely finished:** all seven phases built, independently reviewed,
gap-fixed, gated and tagged. No inherited debt. The reviews were run AFTER the first tagging,
at the owner's instruction, and they were worth it: they found a site-wide regression that
rendered every corner radius at 4px instead of 12px with the scale inverted, and a banned card
affordance the port itself had created. Neither was in any of the 22 verification lists.

WHICH SITE. Derive it, do not read it from a doc. Run `git tag -l 'port-*'` for what is
done, take the order from `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md`, and confirm with
the owner in one plain-language message. The remaining eleven are mostly small.
`digital-agency` is the outlier at 90 routes and 306 posts: leave it late. Two sites
(`wills-probate`, `divorce-finances`) have never launched, so they carry no cutover risk.

THE ONE CHANGE THAT MATTERS MOST. Phase 0 is baseline capture AND a claims and
ground-truth audit, gated, with the serious tier fixed and committed BEFORE phase 1
starts. It worked on contractors-ir35: roughly 45 serious content defects were found up
front instead of at phase 5. Still budget a third of the port for live defects that are
not design work. On the last site that included five route families excluded from Google
by their own canonical tag, a fee claim rendering on every page from a config file, and
the full site chrome leaking into every partner's embedded calculator.

## RULES THAT ARE NOT NEGOTIABLE

- **ONE SITE AT A TIME.**
- **SWEEP BY THE RULE AND THE WHOLE SITE, never by the list you were handed.** Every list
  undercounted again: a canonical defect reported on 1 route family was on 5; a pricing
  audit that found 6 instances and proposed 0 edits was followed by a re-sweep making 17
  across 9 files; an unlayered-CSS audit reported 3 rules where there were 26. Search
  frontmatter and `schema:` JSON-LD, search the arithmetic as well as the words, and check
  the VALUE not the presence of a key. **Also verify the list's positives**: a ledger
  called a CORRECT figure wrong, which is the first overcount on this estate.
- **GREP THE RENDERED HTML OF A SERVED BUILD, not only the repo.** A fee claim sat in
  `niche.config.json` and rendered in the footer and the Organization JSON-LD on every
  single URL while appearing in no page's source. A repo-only audit concluded the site
  published no pricing at all.
- **PUT THE PUSHBACK CLAUSE IN EVERY AGENT BRIEF, VERBATIM** (playbook 10.1): "Verify
  against source. If this brief is wrong, say so and trust the source." On the last port
  it caught: a proposed embed fix that would have been a silent no-op, a claim that a
  result gate emitted no analytics when it does, a brief naming files that did not exist,
  12 contractor pages that were 10, and the manager's own server age-probe twice.
- **THE MANAGER IS THE ONLY ONE WHO BUILDS.** Four agents running `next build` in one site
  directory share one `.next` and produced a phantom `pages-manifest.json ENOENT` that
  read as a real defect. Ban builds and servers in every agent brief; require each agent to
  return a WRITTEN VERIFICATION LIST instead (URL, command, expected result), then run ONE
  build at wave close and execute every list against it. **Then actually execute them.**
  On contractors-ir35 that last step was skipped at first, and running it later found a
  site-wide regression that none of the 22 lists contained. Execute them at wave close, not
  after tagging.
- **PROVE A SERVER'S IDENTITY AND ITS AGE before quoting it.** Assert the served page title,
  then diff a string whose commit date you know. A reviewer correctly rejected a server 11
  minutes older than the working tree. Pick the probe carefully: "fixed fee" matched 1 hit
  where the real hyphenated string matched 17, and two agents caught that independently.
- **DEFAULT TO WHAT PROPERTY DOES, unless Property is evidently wrong.** Copy Property's
  ANSWER, not its DEFECTS. Known defects not to copy: `WhatToExpectCard` default props
  publish a fee line no page authored; `FaqSection` is a Radix accordion with no
  `forceMount`, so closed answers leave the server HTML while the JSON-LD still asserts
  them; `NumberedReasons` animates off keyframe classes its siblings lack; and its
  `LeadCTAPanel` call site passes "Fixed fees, quoted upfront" and "24-hour response",
  which are a fee claim and a turnaround promise. Pass `proofPoints={[]}` and never invent
  replacements.
- **NEVER CHANGE PROPERTY, including indirectly via `packages/web-shared/`** (trap 12).
- **POSITIONING: match what the site's own terms page already says.** The first-person "we
  do the work" voice STAYS. "Free call" STAYS (owner ruling: Property uses it in 61
  places). What goes is any claim to a qualification, a regulator, professional indemnity
  insurance, or performing regulated work.
- **Write the phase's work-package list down before you launch it and tick it off at close.**
- **Cap agent fan-out sensibly and say in every brief whether that agent may delegate.**
  The default line is "Do NOT launch subagents."
- No new monitor, alert, cron, email, digest, popup, modal or banner, and no change to an
  existing one's timing, trigger or cadence. Ask first, every time. This includes adding a
  capture surface to a page that had none, and changing when an existing interruption fires.

## TRAPS ADDED BY THE LAST PORT, read these before phase 1

- **NEVER DECLARE A CUSTOM PROPERTY WHOSE NAME COLLIDES WITH A TAILWIND V4 THEME VARIABLE
  OUTSIDE `@theme`.** `--radius-*`, `--color-*`, `--font-*`, `--spacing-*`, `--text-*`,
  `--leading-*`, `--shadow-*`. One `--radius-xl` in an unlayered `:root` shadowed the layered
  theme value, and `.rounded-xl` READS that property, so every corner on the site rendered 4px
  instead of 12px and the scale inverted (`rounded-xl` squarer than `rounded-lg`). 146 site call
  sites plus 42 in the kit. Both values were in the shipped stylesheet; the unlayered one won.
  Delete the shadow rather than pinning it to the right value: pinning keeps the bug class alive.
  Sweep by NAME collision, not by whether a utility "looks literal". A report on that site
  asserted `rounded-xl` was "a literal Tailwind utility, not an arbitrary var() read", which is
  false in v4 and is why it shipped.
- **THE CALIBRATION FIGURES IN CIRCULATION ARE TAILWIND V3.** slate-500 on white = 4.76 and
  slate-400 = 2.56 are v3 hexes. v4 paints those steps 4.76 and **2.63**. Self-test against the
  version the site actually ships, and say which table you used.
- **AGREEMENT BETWEEN AGENTS IS NOT EVIDENCE.** Four times on the last port, two independent
  agents agreed on a defect that did not exist: the footer studio credit (the owner's own
  estate-wide decision), a token said to break 12 files (zero consumers), a contrast failure
  measured on a stale build, and a content package filed as unbuilt that was fully written. Only
  the measurement counts, and the measurement has to be on the CURRENT build.
- **THE AUDIT COMMAND IN OUR OWN DOCS COULD NOT FIND THE DEFECT IT DESCRIBED.**
  `grep -nE "^[a-zA-Z][^{]*\{"` requires the first character to be a letter, so it can
  never match a class selector, which starts with a dot, while the notes claimed it did.
  Result: 3 unlayered rules reported on a site that had 26, believed for two phases, while
  an anchor rule beat `text-white` at ratio 1.38 on all 62 blog posts. The replacement is a
  brace-depth walk that reports the enclosing `@layer` list for a selector, written up in
  `docs/contractors-ir35/_port/F10_UNLAYERED_SWEEP.md` section 1. **Six sites were audited
  with the old command and all of them need re-sweeping.**
- **A SITE CAN BE MISSING `@source` FOR `packages/web-shared`, and then NONE of the kit's
  utilities are generated at all.** `source("..")` narrows Tailwind's scan to `src/`, and
  web-shared resolves through a symlink Tailwind skips. A class naming a token that does
  not exist does not error, it silently produces nothing, so adopted chrome ships unstyled
  with every test green. Check `grep -c "primary-600" <site>/web/.next/static/css/*.css`
  after adopting any kit component.
- **TWO COMPETING `display` UTILITIES IN ONE CLASS STRING ARE A CASCADE RACE AND THE LOSER
  IS SILENT.** `packages/web-shared/design/chrome/SiteHeader.tsx` appends `hidden ...
  lg:inline-flex` to a `btnPrimary` that opens with `inline-flex`, and `.inline-flex` sits
  later in the stylesheet, so `hidden` is a dead no-op. The header CTA never hides, on
  EVERY ported site including Property. The estate-wide chrome fix recorded as shipping on
  2026-08-23 never took effect anywhere. Verify in BUILT CSS ORDER, not the class list.
  This is an owner decision, blocked by trap 12; contractors-ir35 carries a site-local fix
  only.
- **`sr-only` ON A `<table>` DOES NOT WORK AND CAUSES HORIZONTAL OVERFLOW.** `display:
  table` treats `width` as a minimum so `width:1px` is ignored, `overflow:hidden` cannot
  clip the element's own box, and `clip` affects painting only. Put it on a wrapper `<div>`.
- **A FIGURE WITHOUT ITS SCENARIO IS NOT A FIGURE.** A ledger recomputed a correct saving
  at zero expenses and called it wrong; the manager then passed an agent a figure from a
  different sweep as if it were the default curve. Both were caught only because one number
  failed to reconcile with another. Reward an agent that refuses to write a line it cannot
  reconcile.
- **TREND CLAIMS ARE A DEFECT CLASS NO FIGURE SWEEP FINDS.** Four surfaces said an
  advantage widened with day rate when it is non-monotonic and crosses zero. Grep for
  directional language, not numbers: `wider|widen|narrow|rate rises|high enough|relatively
  low|comfortably exceeds|scales|break-even`.
- **A COMMENT IS A CLAIM, NEVER EVIDENCE.** Three comments described code that does not
  exist: a dead component described as mounted, a chart claiming an accessible fallback it
  never had, and a report claiming a token broke 12 files when it has zero consumers.
  Correct a false comment in the same commit as the code it describes.
- **CANONICAL INHERITANCE.** One `alternates: { canonical: siteUrl }` in a root layout is
  inherited by every route that does not override it. Check every route family, and check
  the inverse: embed pages and syndicated posts legitimately point away.
- **CHECK INDEX AND HUB CRAWLABILITY IN SERVER HTML** against the corpus count. The link
  floor will NOT catch a slice, because the baseline was captured from the same broken page.

## OWNER DECISIONS ALREADY OPEN. Do not re-ask them and do not act on them

1. The shared header cascade defect above. Crosses 18 sites including Property.
2. `packages/web-shared/leads/MiniCapture.tsx` publishes a timed promise under six mounts
   per site. The only timed promise still reaching users on contractors-ir35.
3. ZeroBounce receives enquirer emails from the live submit path and is not disclosed in
   the privacy policy.
4. `packages/web-shared` hardcodes an `AccountingService` schema type and a local-business
   locality. Property uses plain `Organization` and is right.
5. The dormant `packages` CTA variant in six niche.config.json files. Cannot be removed
   per-site: the shared validator requires the key.
6. Site titles, H1s and meta still assert firm identity. That is the SEO surface.
7. Solicitors IR35 size test: house_positions says £10.2m/£5.1m, three pages say £15m/£7.5m
   with the lag explained correctly. THE PAGES LOOK RIGHT. Do not "correct" them.
8. Estate-wide: privacy pages promise enquiry data is deleted at 24 months and consent
   records kept up to six years. The purge cron is dry-run unless an env flag is set, and
   even armed it anonymises rather than deletes. One cron governs about twenty sites.
   Arming it is irreversible across all of them.
9. Property's own `niche.config.json` description publishes "Fixed fees, 24hr response",
   rendering in its footer and JSON-LD on every page.
10. Both umbrella workbooks on contractors-ir35 cite an "HMRC list" of compliant umbrella
    companies that does not exist. Owner ruled out spending time on downloadable files, so
    it is report-only.

BACKGROUND: `docs/_engines/PORT_FIELD_NOTES.md` (section 11 is the last port),
`docs/contractors-ir35/_port/` for worked examples of every artefact, and the memory
entries `contractors_ir35_design_port` and `shared_header_cascade_defect`.

Report to the owner like he is the CEO: recommendation in the first three lines, one
decision at the end, plain language, no file paths in the question itself.
