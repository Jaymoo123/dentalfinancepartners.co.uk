/**
 * Golden check for the Stamp Duty (SDLT) Excel model.
 *
 * exceljs does not evaluate formulas, so we cannot just "read the answer" from
 * the workbook. Instead this check:
 *   1. reads the LOCKED rate/threshold cells out of the generated workbook's
 *      Rates sheet (the real values that ship to users), and
 *   2. re-implements the exact band-by-band formula chain from "Your figures" in
 *      JS using those workbook rates, then
 *   3. asserts the result equals lib/sdltScenarios.ts computeSdltScenarios() for a
 *      sample price.
 *
 * If the spreadsheet rates or the formula logic ever drift from the site math,
 * this fails — and the category's xlsx flag must not be flipped on.
 *
 *   cd Property/web && npx tsx scripts/resources/golden/stamp-duty.golden.ts
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";
import { computeSdltScenarios } from "../../../src/lib/sdltScenarios";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = path.resolve(
  __dirname,
  "../../../public/resources/stamp-duty/stamp-duty-model.xlsx",
);

// Sample price (matches the workbook's default blue cell).
const SAMPLE_PRICE = 350_000;

/** Marginal SDLT across [upperThreshold, rate] slices (top band: upper = price). */
function marginal(
  price: number,
  slices: Array<{ lower: number; upper: number; rate: number }>,
): number {
  let tax = 0;
  for (const s of slices) {
    tax += Math.max(0, Math.min(price, s.upper) - s.lower) * s.rate;
  }
  return tax;
}

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX_PATH);
  const rates = wb.getWorksheet("Rates");
  if (!rates) throw new Error("Rates sheet missing from generated workbook");

  // Pull the locked rates straight out of the shipped file.
  const byLabel: Record<string, number> = {};
  rates.eachRow((row, n) => {
    if (n === 1) return;
    const label = String(row.getCell(1).value ?? "");
    const value = row.getCell(2).value;
    if (typeof value === "number") byLabel[label] = value;
  });

  const stdT1 = byLabel["Standard band 1 upper (£)"];
  const stdT2 = byLabel["Standard band 2 upper (£)"];
  const stdT3 = byLabel["Standard band 3 upper (£)"];
  const stdT4 = byLabel["Standard band 4 upper (£)"];
  const stdR1 = byLabel["Standard band 1 rate (to T1)"];
  const stdR2 = byLabel["Standard band 2 rate (T1–T2)"];
  const stdR3 = byLabel["Standard band 3 rate (T2–T3)"];
  const stdR4 = byLabel["Standard band 4 rate (T3–T4)"];
  const stdR5 = byLabel["Standard top rate (above T4)"];
  const ftbT1 = byLabel["First-time-buyer band 1 upper (£)"];
  const ftbT2 = byLabel["First-time-buyer band 2 upper (£)"];
  const ftbR1 = byLabel["First-time-buyer band 1 rate (to T1)"];
  const ftbR2 = byLabel["First-time-buyer band 2 rate (T1–T2)"];
  const ftbCap = byLabel["First-time-buyer relief price cap (£)"];
  const addSur = byLabel["Additional-dwelling surcharge"];
  const nonResSur = byLabel["Non-UK-resident surcharge"];

  const price = SAMPLE_PRICE;

  const stdBase = marginal(price, [
    { lower: 0, upper: stdT1, rate: stdR1 },
    { lower: stdT1, upper: stdT2, rate: stdR2 },
    { lower: stdT2, upper: stdT3, rate: stdR3 },
    { lower: stdT3, upper: stdT4, rate: stdR4 },
    { lower: stdT4, upper: price, rate: stdR5 },
  ]);
  const addSurcharge = price * addSur;
  const nonResSurcharge = price * nonResSur;

  const standardTotal = Math.round(stdBase);
  const additionalTotal = Math.round(stdBase + addSurcharge);
  const nonResidentTotal = Math.round(stdBase + addSurcharge + nonResSurcharge);
  const ftbTotal =
    price > ftbCap
      ? Math.round(stdBase)
      : Math.round(
          marginal(price, [
            { lower: 0, upper: ftbT1, rate: ftbR1 },
            { lower: ftbT1, upper: ftbT2, rate: ftbR2 },
          ]),
        );

  // TS reference: non-resident scenario WITH the additional surcharge (default).
  const [tsStd, tsAdd, tsNonRes, tsFtb] = computeSdltScenarios({
    price,
    nonResidentIsAdditional: true,
  });

  const checks: Array<[string, number, number]> = [
    ["Standard SDLT", standardTotal, tsStd.total],
    ["Additional property total", additionalTotal, tsAdd.total],
    ["Non-resident BTL total", nonResidentTotal, tsNonRes.total],
    ["First-time-buyer total", ftbTotal, tsFtb.total],
    ["Additional surcharge", Math.round(addSurcharge), tsAdd.additionalSurcharge],
    ["Non-resident surcharge", Math.round(nonResSurcharge), tsNonRes.nonResidentSurcharge],
  ];

  let failed = 0;
  for (const [name, xlsx, tsv] of checks) {
    const ok = xlsx === tsv;
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}: xlsx=${xlsx}  ts=${tsv}`);
  }

  if (failed > 0) {
    console.error(`\nGolden check FAILED: ${failed} mismatch(es).`);
    process.exit(1);
  }
  console.log("\nGolden check PASSED: Stamp Duty xlsx math == TS compute.");
}

main().catch((err) => {
  console.error("Golden check error:", err);
  process.exit(1);
});
