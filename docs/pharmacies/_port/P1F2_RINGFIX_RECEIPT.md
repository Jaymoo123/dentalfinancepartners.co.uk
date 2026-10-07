# P1-F2 receipt — ring fix (gap fix for P1 phase 1)

Scope: the 4 forms/calculators offenders P1-F's guard found, per
PHASE1_PACKAGES.md ownership (P1-D/P1-G rows). StickyCTA.tsx and
components/layout untouched (P1-C's concurrent territory).

## Per file

**`src/components/forms/BookingPicker.tsx`**
- Before: `chipBase` ended in `focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]`
  (hand-rolled, wrong token).
- After: imports `focusRing` from `@/components/ui/layout-utils` alongside
  `btnPrimary`; `chipBase` is now a template literal ending in `${focusRing}`.
  No other class changed.

**`src/components/forms/DetailsForm.tsx`**
- Before: `inputClass` ended in `focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]`
  (the `focus:border-[var(--brand-primary)]` border-on-focus is untouched —
  that's a border, not the ring).
- After: imports `focusRing` alongside `btnPrimary`; `inputClass` is a
  template literal ending in `${focusRing}`.

**`src/components/forms/LeadForm.tsx`**
- Before: `fieldClass` ended in `focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]`;
  no existing import of `layout-utils` in this file.
- After: added `import { focusRing } from "@/components/ui/layout-utils";`;
  `fieldClass` is a template literal ending in `${focusRing}`.

**`src/components/calculators/MiniCapture.tsx`**
- Before: `inputClass` had `focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]`
  sitting mid-string before a trailing `transition-colors`; no existing
  `layout-utils` import.
- After: added `import { focusRing } from "@/components/ui/layout-utils";`;
  `inputClass` is a template literal with `${focusRing}` spliced in at the
  same position, `transition-colors` kept trailing.

No wording changes. No other class touched (border-color-on-focus classes
like `focus:border-[var(--brand-primary)]` are left as-is — they are not the
ring).

## Test run

```
cd pharmacies/web && npx vitest run src/tests/focus-ring.test.ts
  × guards the guard: corpus has no .tsx literally containing
    "focus-visible:outline-[var(--focus-ring)]" — still fails, see below
  × no .tsx surface hand-writes a non-token focus outline or ring
    -> now only 1 offender: components\ui\StickyCTA.tsx (P1-C's file,
       out of this package's scope, not fixed here)
  ✓ btnPrimary is the kit recipe, not a local square one

Test Files  1 failed (1)
     Tests  2 failed | 1 passed (3)
```

```
cd pharmacies/web && npx tsc --noEmit
(no output, PASS)
```

## Guards-the-guard assertion — still fails, not loosened

Per P1F_RECEIPT.md's own flag: the assertion wants at least one `.tsx` body
to contain the literal string `focus-visible:outline-[var(--focus-ring)]`
inline. This fix imports and interpolates `focusRing` as a template literal
(`${focusRing}`) rather than retyping the literal string in any `.tsx` file —
that's the correct way to consume the recipe (the whole point of P1-B's
export), not a defect in this fix. No `.tsx` file in the corpus writes that
literal inline after this change either. Not fixed here; not loosening the
test. Flagging for the manager — it resolves either when P1-C's StickyCTA fix
writes the literal inline, or some other surface does; it is not this
package's job to manufacture an inline literal just to satisfy the guard.

## Not touched

`src/components/ui/StickyCTA.tsx` (`focus:ring-[#0f3a4a]`, hex ring) —
explicitly P1-C's concurrent territory per the brief and P1F_RECEIPT.md.
Left for P1-C; the remaining guard failure is that file.

No subagents launched. No build, server or git state touched.
