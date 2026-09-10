# Solicitors design port: programme artefacts

Owner decision 2026-09-10: Solicitors (Accounts for Lawyers) ports to the Property standard.
Method: `docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Binding spec:
`docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` appendix + `docs/property/DESIGN_SYSTEM.md` §0.
Reference to port FROM is `Property/web`, always; where the kit, the generalist port and
Property disagree, Property wins.

Files here:
- `DISPOSITION_SLICE1.md`: chrome, homepage, blog subsystem (section by section, exact classes)
- `DISPOSITION_SLICE2.md`: calculators, services, locations, result-gate decision, tabs map
- `DISPOSITION_SLICE3.md`: contact/post-submit, about, research, resources, legal,
  interruptive stack, brand layer + measured contrast, instrumentation + guard tests
- `link_baseline.json`: per-route unique-internal-link floor, captured from `next start` at
  the production SHA before the first port commit (sha + deriving command embedded)

## Owner decisions taken 2026-09-10

1. Brand crimson `#c41e3a` STAYS primary. Warning/duty/penalty semantics move OFF red.
2. Second typeface (Cormorant Garamond) DROPPED. Plus Jakarta Sans only, as Property.
3. Our own published pricing REMOVED (`from GBP180/month`, `from GBP450/month`,
   `GBP4,000-GBP12,000`), replaced with what is included at each level.
4. Skippable calculator ResultGate ships on the generic fleet, exactly as Property has it.
5. Footer sister-site cross-links REMOVED; footer takes the kit/Property shape.

## Phase-0 facts (2026-09-10)

- Production SHA (Vercel `targets.production`, project `solicitors`
  `prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9`): `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`,
  readyState READY, framework preset `nextjs`.
  Deriving command: `GET https://api.vercel.com/v9/projects?teamId=team_XF9WAygZX7SGk9Fo4tOAnihH&limit=100`
  with `Authorization: Bearer $VERCEL_TOKEN` (root `.env`), pick the project whose
  `rootDirectory` is `Solicitors/web`, read `targets.production.meta.gitCommitSha`.
  NOTE: `docs/solicitors/STATE.md` said `435cc12e` (dated 2026-08-25). That is STALE; the
  estate has deployed since. Corrected here and in STATE.md the same session.
- `git log 18b4f25f..origin/main --oneline -- 'Solicitors/'` = **0 commits**. No
  Solicitors-owned committed-but-undeployed change rides the cutover.
- `git log 18b4f25f..origin/main --oneline -- 'packages/web-shared/'` = **10 commits**, all
  from the generalist port. Two touch modules Solicitors actually imports:
  `components/ServiceTiers.tsx` and `tools/components/Calculator.tsx`. Both verified
  strictly additive with behaviour-preserving defaults (`resultWrapper = (node) => node`
  identity; `featuredBadge` default unchanged; calculator warn colours moved behind
  `--calc-warn-*` vars with the old amber as the fallback). Solicitors renders
  byte-identically today. They MUST be named in the cutover annotation because they ship
  with this site's next deploy. `Calculator.resultWrapper` is the exact hook Phase 4's
  ResultGate needs, already built.
- Armed `monitored_pages`: **41 rows** under `monitor_until > now()`; 76 rows under
  `monitor_until >= current_date` (the extra 35 expire today, 2026-09-10). Derived with
  `select slug, status, rewrite_type, rewrite_date, monitor_until from monitored_pages
  where site_key='solicitors' and monitor_until > now() order by monitor_until;`
  **No status predicate** (estate-wide correction 2026-08-26): 16 of the 41 are at status
  `'flagged'`, which the old `status='active'` filter silently excused. The frozen set
  includes `__home`, `services`, `contact` and `blog`. The cutover knowingly re-baselines
  all 41; the cutover annotation must say so.
- Kit design consumption before the port: ZERO
  (`grep -rn "web-shared/design" Solicitors/web/src` = empty). This port is the kit's
  second consumer after generalist.

## Browser baseline (`browser_baseline.json`, 2026-09-10)

Captured with `docs/_engines/instruments/browser_check.mjs --site=Solicitors
--base=http://localhost:3121 --save-baseline` against `next start` at the production SHA,
80 routes x 4 widths (mobile/tablet/laptop/desktop).

- **Horizontal overflow: ZERO findings at every width.** The one hard-zero-tolerance check
  passes today, so the port must not introduce any.
- **Anchor targets: 428 findings across all 80 routes.** Every in-page anchor computes
  `scroll-margin-top: 0px` where the standard requires `scroll-mt-24` (>= 96px). With a
  sticky header this means every `#` jump on the site currently hides its own heading under
  the header. Systemic, pre-existing, and fixed by the port.
- **Console: 8 React error #418 (hydration mismatch)** plus RSC-payload fetch failures.
  Pre-existing; investigate during the port rather than assuming the port caused them.

**INSTRUMENT LIMITATION, do not read the contrast findings on this site at face value.**
1,644 contrast findings were reported, including many at `ratio=1.00` with
`color=rgb(255,255,255)`. Spot-checked against the built CSS and the served HTML:
`/services` renders its CTA as `bg-white text-[var(--primary)]`, the rule
`color:var(--primary)` IS present in the emitted stylesheet, and `--primary` resolves to
`--crimson` `#c41e3a`, which measures 5.84:1 on white and PASSES. The instrument fails to
resolve `var()` chains in arbitrary-value Tailwind classes and falls back to white, so it
reports a passing combination as a total failure. This bites HARD on this site specifically,
because Solicitors themes almost entirely through `text-[var(--primary)]`-style arbitrary
values, where Property uses literal `emerald-600` classes. Appendix N already warns that the
Property contrast checker was materially wrong three times on exactly this class of
operation.

Consequence: the contrast half of this baseline is NOT a usable before/after comparison.
The anchor and overflow halves ARE. Phase 1 removes the root cause by replacing the
var-arbitrary colour values with real ramp classes, so RE-CAPTURE the browser baseline
after Phase 1 and use that as the contrast reference. Contrast decisions before then come
from the hand-computed table in `DISPOSITION_SLICE3.md` / `DESIGN_DELTA.md`, whose maths is
self-tested against the two known pairs (slate-500 on white = 4.76, slate-400 on white =
2.56).

## Two metric definitions to pin down, so nobody re-litigates them

**Em-dashes.** `sweep.mjs` counts `/[—–]|&mdash;|&ndash;/` in `bodyText(html)`, i.e. VISIBLE
body copy after tags and `<script>` are stripped. That is the correct metric for the house
rule. The baseline's **330 across 274 routes** is therefore the user-visible figure, and 43
routes carry at least one. A raw byte count of the same page disagrees (e.g. `/blog` shows
0 visible but 11 in the raw HTML, all inside the RSC flight payload) and a raw count of the
SOURCE tree disagrees again (393 across 73 files, much of it in code comments, which are
exempt). Do not mix the three. A disposition pass reported "/blog records 0 against a live
149"; that is a raw count, not visible text, and the gate is sound as written.

**UNCAUGHT CLASS, worth its own pass:** the instrument reads body text only, so an em-dash
in a `metaTitle` or `metaDescription` never trips it, yet those DO reach users in search
results. Sweep frontmatter separately.

**US spellings.** The manager's raw pattern count of 83 across 26 files is INFLATED: it
matches schema.org `"Organization"` literals, which are correct code and must never be
changed. Sweep by rule with an exclusion for schema type strings. One real breach that
survives any counting method: `practicing certificate` (5) against `practising` (226).

## Why the disposition slices contain em-dashes and that is fine

The three slices carry em-dashes in their own prose (52 / 2 / 140). So did the generalist
pilot's (32 / 38), and that port shipped clean. These are internal engineering specs, not
site copy, and the rule exempts anything that is not user-facing.

The control is not doc hygiene, it is the gate: the Phase 1 guard-test suite includes an
em-dash gate over `src/` and `content/`, so a dash that reaches shipped copy fails the build
whatever document a builder copied it from. Fix the class, not the instance. Any copy deck a
builder lifts VERBATIM out of a slice must still be dash-free, and each slice's authored copy
blocks were written that way deliberately.
