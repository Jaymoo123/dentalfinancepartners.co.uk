/**
 * Registry of Excel workbook builders for Contractor Tax Accountants (cfp).
 * One builder per category. Each produces a workbook with live formulas that
 * import the SAME constants as the site calculators (tax2026.ts) so they can never drift.
 *
 * Run `npm run resources:xlsx --workspace contractors-ir35/web` to regenerate all files.
 */
import type ExcelJS from "exceljs";
import { build as buildIr35Compare } from "./ir35-compare.js";
import { build as buildUmbrellaVsLimited } from "./umbrella-vs-limited.js";
import { build as buildSalaryDividend } from "./salary-dividend.js";

/** A builder produces one workbook for one category. */
export type WorkbookBuilder = () => ExcelJS.Workbook | Promise<ExcelJS.Workbook>;

/** One output workbook: the topic segment + its builder. */
export interface BuilderEntry {
  /** topic segment, used for the output path /resources/<topic>/<filename> */
  topic: string;
  /** output filename within the topic folder */
  fileName: string;
  build: WorkbookBuilder;
}

export const BUILDERS: BuilderEntry[] = [
  {
    topic: "ir35",
    fileName: "outside-vs-inside-ir35-model.xlsx",
    build: buildIr35Compare,
  },
  {
    topic: "structure",
    fileName: "umbrella-vs-limited-model.xlsx",
    build: buildUmbrellaVsLimited,
  },
  {
    topic: "pay-planning",
    fileName: "salary-dividend-model.xlsx",
    build: buildSalaryDividend,
  },
];
