/**
 * Registry of Excel workbook builders for Probate Compass (wills-probate).
 * One builder per category. Each produces a workbook with live formulas that
 * import the SAME constants as the site calculators so they can never drift.
 *
 * PLACEHOLDER — empty until Phase 2 authors the probate/IHT resource models
 * (see construction-cis/web/scripts/resources/builders/ for the pattern to
 * port: cis-refund.ts, cis-vs-paye.ts, gps-readiness.ts).
 *
 * Run `npm run resources:xlsx --workspace wills-probate/web` to regenerate all files.
 */
import type ExcelJS from "exceljs";

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

export const BUILDERS: BuilderEntry[] = [];
