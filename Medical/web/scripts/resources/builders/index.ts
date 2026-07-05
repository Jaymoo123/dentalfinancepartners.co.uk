/**
 * Registry of Excel workbook builders for Medical Accountants UK.
 * One builder per category. Each produces a workbook with live formulas that
 * import the SAME constants as the site calculators so they can never drift.
 *
 * Run `npm run resources:xlsx --workspace Medical/web` to regenerate all files.
 *
 * 3 builders: nhs-pension (flagship), locum (doctor take-home), incorporation-private.
 * No practice sale/CGT builder: NHS GP goodwill cannot be sold (HP section 4).
 */
import type ExcelJS from "exceljs";
import { build as buildNhsPension } from "./nhs-pension.js";
import { build as buildLocum } from "./locum.js";
import { build as buildIncorporation } from "./incorporation.js";

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
    topic: "nhs-pension",
    fileName: "nhs-pension-model.xlsx",
    build: buildNhsPension,
  },
  {
    topic: "locum",
    fileName: "doctor-take-home-model.xlsx",
    build: buildLocum,
  },
  {
    topic: "incorporation-private",
    fileName: "incorporation-model.xlsx",
    build: buildIncorporation,
  },
];
