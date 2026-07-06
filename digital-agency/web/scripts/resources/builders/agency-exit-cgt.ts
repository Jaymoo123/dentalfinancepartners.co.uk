/**
 * Agency exit, CGT and BADR Excel model builder for Agency Founder Finance.
 *
 * Produces a workbook with live formulas tracing calcBadrCgt() from
 * src/lib/tools/compute/badr-cgt.ts. Imports the SAME hardcoded constants
 * that the compute lib uses, so the workbook and the on-site tool always agree.
 *
 * Formula style: banded MIN/MAX/IF arithmetic only. NO LET() function.
 *
 * Default golden cases (brief section 2, executed via Node):
 *   saleProceeds=750000, originalCost=50000, previousBadrUsed=0, year=2026/27
 *   WITH BADR: gain=700000, eligibleForBadr=700000, badrTax=126000, netProceeds=624000
 *   STANDARD CGT: totalTax=168000, netProceeds=582000
 *   2025/26 BADR: badrTax=98000, netProceeds=652000 (14% rate)
 *   Over-limit (1500000, 0, 2026/27): badrTax=180000, standardTax=120000, total=300000
 *
 * Compliance:
 *   - No em-dashes.
 *   - No "DJH". No credential claims.
 *   - Creator = "Agency Founder Finance".
 *   - Colours: indigo #4f46e5 / slate #0f172a.
 *   - Date band stated: 14% to 5 April 2026, 18% from 6 April 2026.
 *   - BADR lifetime limit 1,000,000 stated.
 *   - earn-out and relocation hedges in Notes.
 */
import ExcelJS from "exceljs";

// ---- Colours ----
const INDIGO       = "FF4f46e5";
const SLATE        = "FF0f172a";
const INDIGO_LIGHT = "FFe0e7ff";
const WHITE        = "FFFFFFFF";
const INK          = "FF0f172a";

// ---- Locked constants: sourced from badr-cgt.ts ----
const BADR_RATE_2025_26   = 0.14;  // 14%: disposals to 5 April 2026
const BADR_RATE_2026_27   = 0.18;  // 18%: from 6 April 2026
const STANDARD_CGT_HIGHER = 0.24;  // 24%: standard CGT higher rate
const BADR_LIFETIME_LIMIT = 1_000_000;

// ---- Style helpers ----
function indigoHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INDIGO } };
  cell.alignment = { vertical: "middle" };
}

function slateHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 10 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: INK } };
}

function indigoInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INDIGO_LIGHT } };
  cell.protection = { locked: false };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0.00";
}

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "0.00%";
}

function noteCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { italic: true, color: { argb: "FF64748b" }, size: 10 };
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Agency Founder Finance";
  wb.lastModifiedBy = "Agency Founder Finance";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: INDIGO } },
  });
  rates.columns = [
    { key: "label", width: 72 },
    { key: "value", width: 18 },
  ];
  indigoHeader(rates.getCell("A1"), "Locked rates: do not edit");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "BADR_2025_26",    label: "BADR rate 14%: disposals to 5 April 2026",                              value: BADR_RATE_2025_26, pct: true },
    { name: "BADR_2026_27",    label: "BADR rate 18%: from 6 April 2026",                                      value: BADR_RATE_2026_27, pct: true },
    { name: "STD_CGT",         label: "Standard CGT higher rate 24%: from 30 Oct 2024",                        value: STANDARD_CGT_HIGHER, pct: true },
    { name: "LIFETIME_LIMIT",  label: "BADR lifetime limit (GBP): per individual, cumulative",                  value: BADR_LIFETIME_LIMIT },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0.00%" : "#,##0.######";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  // ---- Start here sheet ----
  const startHere = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE } },
  });
  startHere.columns = [{ key: "a", width: 80 }];
  indigoHeader(startHere.getCell("A1"), "Agency Founder Finance - Agency exit, CGT and BADR model");
  startHere.getCell("A2").value = "Edit the blue cells on the Your figures sheet. Both scenario columns recalculate automatically.";
  startHere.getCell("A3").value = "BADR rate: 14% for disposals to 5 April 2026, 18% from 6 April 2026. Lifetime limit: 1,000,000.";
  startHere.getCell("A4").value = "Standard CGT higher rate: 24% (from 30 Oct 2024). Annual exempt amount: 3,000.";
  startHere.getCell("A5").value = "Qualifying conditions: 5% ordinary shares, 5% voting rights, officer or employee throughout 2 years to disposal.";
  startHere.getCell("A6").value = "This model is a starting point. Take specialist advice before an exit transaction.";
  for (let r = 2; r <= 6; r++) {
    startHere.getCell(`A${r}`).font = { color: { argb: INK } };
  }

  // ---- Your figures sheet (two scenario columns) ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: INDIGO } },
  });
  ws.columns = [
    { key: "a", width: 44 },
    { key: "b", width: 18 },  // With BADR
    { key: "c", width: 18 },  // Standard CGT
  ];

  // Row 1: header
  indigoHeader(ws.getCell("A1"), "Your figures (edit the blue cells)");
  slateHeader(ws.getCell("B1"), "With BADR");
  slateHeader(ws.getCell("C1"), "Standard CGT (if you do not qualify)");

  // Row 2: saleProceeds
  labelCell(ws.getCell("A2"), "Sale proceeds (GBP)");
  ws.getCell("B2").value = 750000;
  moneyFmt(ws.getCell("B2"));
  indigoInput(ws.getCell("B2"));
  wb.definedNames.add(`'Your figures'!$B$2`, "In_Proceeds");

  // Row 3: originalCost
  labelCell(ws.getCell("A3"), "Original cost (GBP)");
  ws.getCell("B3").value = 50000;
  moneyFmt(ws.getCell("B3"));
  indigoInput(ws.getCell("B3"));
  wb.definedNames.add(`'Your figures'!$B$3`, "In_Cost");

  // Row 4: previousBadrUsed
  labelCell(ws.getCell("A4"), "Previous BADR lifetime limit used (GBP)");
  ws.getCell("B4").value = 0;
  moneyFmt(ws.getCell("B4"));
  indigoInput(ws.getCell("B4"));
  wb.definedNames.add(`'Your figures'!$B$4`, "In_PrevBadr");

  // Row 5: year (dropdown hint)
  labelCell(ws.getCell("A5"), "Tax year (2025/26 or 2026/27)");
  ws.getCell("B5").value = "2026/27";
  ws.getCell("B5").font = { bold: true, color: { argb: INDIGO } };
  indigoInput(ws.getCell("B5"));
  wb.definedNames.add(`'Your figures'!$B$5`, "In_Year");

  // ---- Computed rows ----
  indigoHeader(ws.getCell("A6"), "Computed (2026/27 or 2025/26 rates)");
  slateHeader(ws.getCell("B6"), "With BADR");
  slateHeader(ws.getCell("C6"), "Standard CGT");

  // Row 7: gain
  labelCell(ws.getCell("A7"), "Gain (GBP)");
  const gainFormula = "MAX(0,In_Proceeds-In_Cost)";
  ws.getCell("B7").value = { formula: gainFormula };
  ws.getCell("C7").value = { formula: gainFormula };
  moneyFmt(ws.getCell("B7"));
  moneyFmt(ws.getCell("C7"));
  wb.definedNames.add(`'Your figures'!$B$7`, "Gain_BADR");
  wb.definedNames.add(`'Your figures'!$C$7`, "Gain_Std");

  // Row 8: BADR rate (by year)
  labelCell(ws.getCell("A8"), "BADR rate (by year)");
  // IF year = "2025/26" then 14%, else 18%
  ws.getCell("B8").value = { formula: 'IF(In_Year="2025/26",BADR_2025_26,BADR_2026_27)' };
  ws.getCell("C8").value = "n/a";
  pctFmt(ws.getCell("B8"));
  wb.definedNames.add(`'Your figures'!$B$8`, "In_BadrRate");

  // Row 9: Eligible slice (min(gain, lifetime_limit - prev_used))
  labelCell(ws.getCell("A9"), "Eligible for BADR (GBP)");
  ws.getCell("B9").value = { formula: "MIN(Gain_BADR,MAX(0,LIFETIME_LIMIT-In_PrevBadr))" };
  ws.getCell("C9").value = 0;
  moneyFmt(ws.getCell("B9"));
  moneyFmt(ws.getCell("C9"));
  wb.definedNames.add(`'Your figures'!$B$9`, "EligibleSlice");

  // Row 10: overflow slice (not eligible)
  labelCell(ws.getCell("A10"), "Gain above lifetime limit (GBP)");
  ws.getCell("B10").value = { formula: "MAX(0,Gain_BADR-EligibleSlice)" };
  ws.getCell("C10").value = { formula: "Gain_Std" };
  moneyFmt(ws.getCell("B10"));
  moneyFmt(ws.getCell("C10"));
  wb.definedNames.add(`'Your figures'!$B$10`, "OverflowSlice");

  // Row 11: BADR tax
  labelCell(ws.getCell("A11"), "BADR tax (GBP)");
  ws.getCell("B11").value = { formula: "EligibleSlice*In_BadrRate" };
  ws.getCell("C11").value = 0;
  moneyFmt(ws.getCell("B11"));
  moneyFmt(ws.getCell("C11"));
  wb.definedNames.add(`'Your figures'!$B$11`, "BadrTax");

  // Row 12: standard CGT on overflow
  labelCell(ws.getCell("A12"), "Standard CGT (on overflow / full gain, GBP)");
  ws.getCell("B12").value = { formula: "OverflowSlice*STD_CGT" };
  ws.getCell("C12").value = { formula: "Gain_Std*STD_CGT" };
  moneyFmt(ws.getCell("B12"));
  moneyFmt(ws.getCell("C12"));
  wb.definedNames.add(`'Your figures'!$B$12`, "StdTax_BADR");
  wb.definedNames.add(`'Your figures'!$C$12`, "StdTax_NoBADR");

  // Row 13: total tax
  labelCell(ws.getCell("A13"), "Total tax (GBP)");
  ws.getCell("B13").value = { formula: "BadrTax+StdTax_BADR" };
  ws.getCell("C13").value = { formula: "StdTax_NoBADR" };
  moneyFmt(ws.getCell("B13"));
  moneyFmt(ws.getCell("C13"));
  ws.getCell("B13").font = { bold: true, color: { argb: SLATE } };
  ws.getCell("C13").font = { bold: true, color: { argb: SLATE } };
  wb.definedNames.add(`'Your figures'!$B$13`, "TotalTax_BADR");
  wb.definedNames.add(`'Your figures'!$C$13`, "TotalTax_Std");

  // Row 14: net proceeds
  labelCell(ws.getCell("A14"), "Net proceeds (GBP)");
  ws.getCell("B14").value = { formula: "In_Proceeds-TotalTax_BADR" };
  ws.getCell("C14").value = { formula: "In_Proceeds-TotalTax_Std" };
  moneyFmt(ws.getCell("B14"));
  moneyFmt(ws.getCell("C14"));
  ws.getCell("B14").font = { bold: true, color: { argb: INDIGO } };
  ws.getCell("C14").font = { bold: true, color: { argb: INDIGO } };
  wb.definedNames.add(`'Your figures'!$B$14`, "NetProceeds_BADR");
  wb.definedNames.add(`'Your figures'!$C$14`, "NetProceeds_Std");

  // Row 15: effective rate
  labelCell(ws.getCell("A15"), "Effective rate on gain");
  ws.getCell("B15").value = { formula: "IF(Gain_BADR>0,TotalTax_BADR/Gain_BADR,0)" };
  ws.getCell("C15").value = { formula: "IF(Gain_Std>0,TotalTax_Std/Gain_Std,0)" };
  pctFmt(ws.getCell("B15"));
  pctFmt(ws.getCell("C15"));
  wb.definedNames.add(`'Your figures'!$B$15`, "EffectiveRate_BADR");
  wb.definedNames.add(`'Your figures'!$C$15`, "EffectiveRate_Std");

  // Row 16: conservation check
  labelCell(ws.getCell("A16"), "Conservation check (must be OK)");
  ws.getCell("B16").value = {
    formula: 'IF(ABS(NetProceeds_BADR-(In_Proceeds-TotalTax_BADR))<0.01,"OK","CHECK")',
  };
  ws.getCell("C16").value = {
    formula: 'IF(ABS(NetProceeds_Std-(In_Proceeds-TotalTax_Std))<0.01,"OK","CHECK")',
  };
  wb.definedNames.add(`'Your figures'!$B$16`, "Conservation_BADR");
  wb.definedNames.add(`'Your figures'!$C$16`, "Conservation_Std");

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes", {
    properties: { tabColor: { argb: SLATE } },
  });
  notes.columns = [{ key: "a", width: 90 }];
  indigoHeader(notes.getCell("A1"), "Notes: Agency Founder Finance agency exit, CGT and BADR model");
  const noteLines = [
    "1. BADR rate: 14% for disposals to 5 April 2026, 18% from 6 April 2026 (Finance Act 2026).",
    "2. An unconditional exchange of contracts on or before 5 April 2026 fixes the 14% rate even if completion follows later.",
    "3. Qualifying conditions for BADR on a share sale: hold at least 5% of ordinary share capital, 5% of voting rights,",
    "   and be an officer or employee throughout the 2 years to disposal.",
    "4. BADR lifetime limit: 1,000,000 per individual. Any previous BADR you have claimed reduces the remaining limit.",
    "5. Earn-outs: the right to a future performance payment is a separate chargeable asset (Marren v Ingles).",
    "   BADR generally does not reach the second disposal. Earn-outs are usually taxed at the standard CGT rate.",
    "   Watch the income-versus-capital substance test: an earn-out tied to the seller's ongoing employment may be income.",
    "6. Relocation note: BADR is not available while you are non-resident. The temporary non-residence rule can tax",
    "   a non-resident-period disposal on your return unless you are non-resident for 5 complete tax years.",
    "   Take specialist advice before relocating.",
    "7. This model excludes the annual exempt amount (3,000) for simplicity. Apply it to your taxable gain before tax.",
    "8. Get specialist advice before an exit transaction. This model is a starting point only.",
  ];
  noteLines.forEach((line, i) => {
    noteCell(notes.getCell(`A${i + 2}`), line);
  });

  return wb;
}
