# P1-F receipt — ring guard

File created: `pharmacies/web/src/tests/focus-ring.test.ts` only. No source file touched.

## Shape vs contractors-ir35's copy

Deliberate deviation from the brief's "copy the shape" instruction on one point: did
**not** pin the five recipe names (`btnPrimary`/`btnSecondary`/`btnOnDark`/`btnOnCream`/
`focusRing`). The brief itself names pinning the recipe list as the defect that let 29
hand-rolled rings through on contractors-ir35 — a fixed list is blind to a new recipe or a
new file. This version runs only the corpus walk (bans both hand-rolled shapes directly)
plus the `btnPrimary` recipe-shape check the brief asked for. Everything else matches the
brief: admin carve-out, guards-the-guard assertion with the literal `guards the guard`,
corpus.length > 25, `app/page.tsx` present, a known-present-literal read, no `/admin/`
path, both outline bans, the `focus:ring-[hex]` ban, the bare `focus:outline-none` ban,
and the `btnPrimary` recipe-shape assertion.

## Guard bites — proven

Temporarily added a third test asserting a scratch string
`focus-visible:outline-[#0f3a4a]` passes the bracket-ban logic (i.e. inverted the
expectation). Ran it: failed as expected (`expected true to be false`), alongside the two
real failures below. Removed the scratch test immediately after. The file now contains no
code that was not run.

## Test run result: 3/3 in this file FAIL on their own — 2 real failures, both pre-existing

```
cd pharmacies/web && npx vitest run src/tests/focus-ring.test.ts
  × guards the guard: corpus has no .tsx literally containing
    "focus-visible:outline-[var(--focus-ring)]" — every consumer reaches the ring via the
    `L.btnPrimary` etc. symbol, not an inline literal (see below, not a test defect)
  × no .tsx surface hand-writes a non-token focus outline or ring — 5 offenders (below)
  ✓ btnPrimary is the kit recipe, not a local square one
```

```
cd pharmacies/web && npm test
  Test Files  1 failed | 5 passed (6)   <- baseline 5 test files + this one, matches
  Tests        2 failed | 38 passed (40)
npx tsc --noEmit
  (no output, PASS)
grep -rl 'readdirSync' src/tests | wc -l   -> 1  (PASS)
grep -rl 'guards the guard' src/tests | wc -l -> 1  (PASS)
```

## Offenders (listed, not fixed — per brief, this package fixes none)

**Pending P1-C (re-run after it lands):**
- `src/components/ui/StickyCTA.tsx:52` — `focus:ring-[#0f3a4a]` (hex ring, the exact
  "StickyCTA close-button shape" the brief names). StickyCTA is explicitly P1-C's
  concurrent territory per the brief.

**Real findings (not P1-C's scope — owned per PHASE1_PACKAGES.md row ownership):**
- `src/components/forms/BookingPicker.tsx:23` — `focus-visible:outline-[var(--brand-primary)]`,
  not the ring token. Listed under P1-D (grey ramp, line 602) and again under P1-G
  (fork-vs-shared deferral, line 775).
- `src/components/forms/DetailsForm.tsx:19` — same shape, `var(--brand-primary)`. P1-D
  line 603, P1-G line 775.
- `src/components/forms/LeadForm.tsx:14` — same shape, `var(--brand-primary)`. P1-D
  line 601, P1-G line 775.
- `src/components/calculators/MiniCapture.tsx:12` — same shape, `var(--brand-primary)`.
  P1-G line 775 (fork-vs-shared deferral); not listed under P1-D's grey-ramp table.

None of the four forms/calculators offenders is a bare primary-ramp or hex literal — all
already reference a CSS var, just the wrong one (`--brand-primary`, not `--focus-ring`).
The bracketed-value ban is what catches them; a regex banning only the bare
`outline-primary-` shape would have missed all five offenders, same failure mode the
brief warns about for startups-tech.

## Also true today, separate from the 5 offenders above

The "guards the guard" assertion that at least one `.tsx` body contains the literal
`focus-visible:outline-[var(--focus-ring)]` fails right now: no `.tsx` file on pharmacies
writes that literal inline (checked — confirmed zero `grep -rn "focus-ring" src --include=*.tsx`
hits). Every current consumer of the fixed recipes reaches the ring through the
`L.btnPrimary`/`L.focusRing` etc. symbol, which is intentional (P1-B) but means no
`.tsx` body contains the literal string today. Checked contractors-ir35 for comparison:
12 of its `.tsx` files (`StickyCTA.tsx`, `BookingPicker.tsx`, page-level files, etc.) DO
write the literal inline, which is why the identical assertion passes there. This is not a
defect in this test — it is pharmacies not yet having any inline literal usage anywhere in
its corpus, which the five offenders above are examples of (they use the wrong var inline
instead of the right one). It should resolve once any package fixes one of the five
offenders to use the actual token inline, or once any other surface does. Flagging for
P1-G / the manager rather than silently loosening the assertion.

## Known pre-closed offender from the plan

`app/admin/analytics/login/page.tsx:39` (`focus:outline-none`, no compensating ring) — correctly
excluded by the admin carve-out, so this guard will never see it. Recorded here per the
brief; not fixed, not in this guard's corpus.

## No subagents launched. No build, no server, no git state touched. No source file edited.

---

## 2026-10-07 update — guards-the-guard assertion revised per P1F2 ring-fix

Per coordinator follow-up, after `docs/pharmacies/_port/P1F2_RINGFIX_RECEIPT.md` fixed the
4 real offenders (`BookingPicker`/`DetailsForm`/`LeadForm`/`MiniCapture`) by consuming the
`focusRing` recipe: the "no inline literal anywhere" state flagged above was correctly
identified as the *better* outcome (everything through the recipe), not a defect — but the
old guards-the-guard assertion demanded an inline literal that will now never exist on a
compliant site. Revised `src/tests/focus-ring.test.ts` (only file touched) so that
assertion instead checks: (a) `src/components/ui/layout-utils.ts` contains the literal
token `focus-visible:outline-[var(--focus-ring)]` (confirmed present, 4 occurrences), and
(b) at least one `.tsx` under `src` imports `focusRing` from `layout-utils` (confirmed —
8 files do: `app/page.tsx`, `ConsentToggle.tsx`, `MiniCapture.tsx`, `BookingPicker.tsx`,
`DetailsForm.tsx`, `LeadForm.tsx`, `Breadcrumb.tsx`, `StickyCTA.tsx`). The ban itself is
unchanged — not loosened.

Re-ran the mutation proof: temporarily added a scratch assertion against
`focus:ring-[#0f3a4a]` with the expectation inverted, confirmed it failed
(`expected true to be false`), then removed it.

Re-ran `npx vitest run src/tests/focus-ring.test.ts`: **2 passed, 1 failed** — the only
remaining offender is `components\ui\StickyCTA.tsx` (`focus:ring-[#0f3a4a]`), unchanged
from before, **pending P1-C** (StickyCTA is P1-C's concurrent territory per the original
brief). The 4 real offenders from the first run are gone — confirmed fixed by P1F2.
`npx tsc --noEmit`: clean. Acceptance greps unchanged: `readdirSync` 1 hit, `guards the
guard` 1 hit.

No source file touched. No subagents launched. No build, no server, no git state touched.

---

## 2026-10-07 update #2 — strip comments before matching (playbook gate 9.1 lesson)

The one remaining offender, `StickyCTA.tsx:31`, was not a live ring: it's a comment
describing the OLD `focus:ring-[#0f3a4a]` that P1-C already replaced with the `focusRing`
recipe in the real `className`. Same false positive the playbook's own gate hit
(section 9.1, "it counted comments as code"). Added `stripComments()` to
`src/tests/focus-ring.test.ts` (only file touched) — strips `/* ... */` and `// ...`
to end of line, same shape as the gate's `strip()` — and run it on each file body before
the ban regexes.

Mutation proof extended to two cases: a hex ring in real markup is still caught (true),
and the identical literal inside a comment is not (false) — both verified, then the
scratch test removed.

Re-ran `npx vitest run src/tests/focus-ring.test.ts`: **3 of 3 passing.** `npx tsc
--noEmit`: clean. Zero real offenders remain; StickyCTA is clean once its comment is
excluded from the scan.

No source file touched. No subagents launched. No build, no server, no git state touched.
