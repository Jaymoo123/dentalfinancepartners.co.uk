# Resource Excel models (`scripts/resources`)

Build-time generator for the per-category Excel (`.xlsx`) downloads in the
premium tools + resources system. **Not** part of `next build` — run it manually
or in CI, then commit the generated files.

## Run

```bash
npm run resources:xlsx
```

In Phase A the builders registry is empty, so this is a safe no-op.

## Layout

- `generate-xlsx.ts` — entry point. Loops `BUILDERS`, writes one workbook per
  category to `public/resources/<topic>/<topic>-model.xlsx`, pinning the workbook
  `created`/`modified` to a fixed date so regeneration yields byte-stable diffs.
- `builders/index.ts` — the `BUILDERS` registry. Append one entry per category.
- `builders/<topic>.ts` — (Phase B/C) one file per category, exporting
  `build(): ExcelJS.Workbook | Promise<ExcelJS.Workbook>`.

## Adding a category (Phase B/C)

1. Create `builders/<topic>.ts` exporting a `build()` that constructs the
   workbook. Each workbook should have:
   - a "Start here" sheet,
   - a user-input sheet with **live formulas**,
   - a **locked `Rates` sheet** whose values are imported from the SAME locked
     constants the site calculators use (`src/lib/sdlt.ts`, `src/lib/cgt.ts`,
     `src/lib/incorporation.ts`, …) so the spreadsheet and the site cannot drift,
   - a Notes/assumptions sheet mirroring the on-site disclaimers,
   - data-validation dropdowns for band selections,
   - sheet protection on the locked sheets.
2. Register it in `builders/index.ts`.
3. Run `npm run resources:xlsx` and **commit** the generated `.xlsx`.
4. Add a golden test asserting the TS `compute()` result equals the xlsx formula
   result for sample inputs.
5. Only once that test passes, flip the `xlsx.enabled` flag for the category in
   `src/lib/resources/registry.ts`.

## Why `exceljs` + `tsx` are devDependencies

`exceljs` writes real workbooks (formulas, named ranges, validation, protection)
at build time and is **never shipped** to the browser. `tsx` runs this TypeScript
script directly. Both are dev-only.
