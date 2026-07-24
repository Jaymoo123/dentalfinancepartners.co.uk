/**
 * Registry of Excel workbook builders for divorce-finances.
 * STUB (scaffold phase): empty. One builder per category. Each produces a
 * workbook with live formulas that import the SAME constants as the site
 * calculators so they can never drift.
 *
 * Run `npm run resources:xlsx --workspace divorce-finances/web` to regenerate all files.
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
