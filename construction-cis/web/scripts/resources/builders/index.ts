/**
 * Registry of Excel workbook builders for Trade Tax Specialists (construction-cis).
 * One builder per category. Each produces a workbook with live formulas that
 * import the SAME constants as the site calculators so they can never drift.
 *
 * Run `npm run resources:xlsx --workspace construction-cis/web` to regenerate all files.
 */
import type ExcelJS from "exceljs";
import { build as buildCisRefund } from "./cis-refund.js";
import { build as buildCisVsPaye } from "./cis-vs-paye.js";
import { build as buildGpsReadiness } from "./gps-readiness.js";

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
    topic: "cis-refund",
    fileName: "cis-refund-model.xlsx",
    build: buildCisRefund,
  },
  {
    topic: "cis-vs-paye",
    fileName: "cis-vs-paye-model.xlsx",
    build: buildCisVsPaye,
  },
  {
    topic: "gross-payment-status",
    fileName: "gps-readiness-model.xlsx",
    build: buildGpsReadiness,
  },
];
