/**
 * Registry of Excel workbook builders, one per category.
 *
 * Each builder is a pure function `build(): Promise<ExcelJS.Workbook>` (or sync)
 * that constructs a workbook with live formulas, a locked Rates sheet (importing
 * the SAME locked constants the site calculators use, so the spreadsheet and the
 * site can never drift), data-validation dropdowns and sheet protection.
 *
 * PHASE A: this registry is intentionally EMPTY. The generator (generate-xlsx.ts)
 * loops it and writes nothing, so `npm run resources:xlsx` is a safe no-op until
 * a builder is added. Onboarding a category (Phase B/C):
 *   1. add `builders/<topic>.ts` exporting a `build()`,
 *   2. add one entry here keyed by the topic's output path segment,
 *   3. run `npm run resources:xlsx`,
 *   4. flip the xlsx `enabled` flag in src/lib/resources/registry.ts.
 */
import type ExcelJS from "exceljs";
import { build as buildSection24 } from "./section-24";

/** A builder produces one workbook for one category. */
export type WorkbookBuilder = () => ExcelJS.Workbook | Promise<ExcelJS.Workbook>;

/** One output workbook: the topic segment + its builder. */
export interface BuilderEntry {
  /** topic segment, used for the output path /resources/<topic>/<topic>-model.xlsx */
  topic: string;
  /** output filename within the topic folder */
  fileName: string;
  build: WorkbookBuilder;
}

/**
 * Append one entry per category as builders are authored.
 */
export const BUILDERS: BuilderEntry[] = [
  {
    topic: "section-24",
    fileName: "section-24-model.xlsx",
    build: buildSection24,
  },
];
