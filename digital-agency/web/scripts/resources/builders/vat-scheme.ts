/**
 * VAT scheme comparison Excel model builder for Agency Founder Finance.
 *
 * Produces a workbook with live formulas tracing calcVatScheme() from
 * src/lib/tools/compute/vat-scheme.ts. Imports the SAME hardcoded constants
 * that the compute lib uses, so the workbook and the on-site tool always agree.
 *
 * Formula style: banded MIN/MAX/IF arithmetic only. NO LET() function.
 *
 * Default golden cases (brief section 2, executed via Node):
 *   turnover=180000, vatInputs=8000, goodsSpend=500
 *   => vatCollected=36000, grossInclusive=216000, standardNet=28000
 *      lctApplies=true, flatRate=0.165, flatPayment=35640, bestScheme=Standard, saving=7640
 *
 *   High-goods case: turnover=180000, vatInputs=3000, goodsSpend=10000
 *   => flatRate=0.125, flatPayment=27000, bestScheme=Flat Rate, saving=6000, lctApplies=false
 *
 * Compliance:
 *   - No em-dashes.
 *   - No "DJH". No credential claims.
 *   - Creator = "Agency Founder Finance".
 *   - Colours: indigo #4f46e5 / slate #0f172a.
 *   - LCT trap clearly flagged: 16.5% rate on gross turnover.
 *   - VAT registration threshold 90,000 / deregistration 88,000 (current).
 *   - MTD for VAT since April 2022.
 */
import ExcelJS from "exceljs";

// ---- Colours ----
const INDIGO       = "FF4f46e5";
const SLATE        = "FF0f172a";
const INDIGO_LIGHT = "FFe0e7ff";
const WHITE        = "FFFFFFFF";
const INK          = "FF0f172a";

// ---- Locked constants: sourced from vat-scheme.ts ----
const STANDARD_VAT = 0.20;
const FLAT_RATE_MARKETING_AGENCY = 0.125; // 12.5% non-LCT
const FLAT_RATE_LCT = 0.165;              // 16.5% LCT (punitive)
const ANNUAL_LCT_GOODS_THRESHOLD = 1000;  // GBP 1,000
const LCT_TURNOVER_THRESHOLD = 0.02;      // 2% of VAT-inclusive turnover

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
    { name: "STD_VAT",       label: "Standard VAT rate 20%",                                                  value: STANDARD_VAT, pct: true },
    { name: "FRS_NORMAL",    label: "Flat Rate Scheme rate 12.5% (marketing agency, non-LCT)",                value: FLAT_RATE_MARKETING_AGENCY, pct: true },
    { name: "FRS_LCT",       label: "Flat Rate Scheme rate 16.5% (limited-cost trader)",                      value: FLAT_RATE_LCT, pct: true },
    { name: "LCT_GBP",       label: "LCT goods threshold (GBP per year): goods must exceed this OR 2% test", value: ANNUAL_LCT_GOODS_THRESHOLD },
    { name: "LCT_PCT",       label: "LCT goods threshold (% of VAT-inclusive turnover): 2%",                 value: LCT_TURNOVER_THRESHOLD, pct: true },
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
  indigoHeader(startHere.getCell("A1"), "Agency Founder Finance - VAT scheme comparison model");
  startHere.getCell("A2").value = "Edit the blue cells on the Your figures sheet. The standard vs flat rate comparison recalculates automatically.";
  startHere.getCell("A3").value = "Most agencies are limited-cost traders (LCT): goods under 2% of VAT-inclusive turnover or under 1,000 a year.";
  startHere.getCell("A4").value = "LCT agencies pay 16.5% of VAT-inclusive turnover under the Flat Rate Scheme, which usually beats reclaiming input VAT.";
  startHere.getCell("A5").value = "VAT registration: register when taxable turnover exceeds 90,000 in any rolling 12 months. Deregister below 88,000.";
  startHere.getCell("A6").value = "MTD for VAT: mandatory for all VAT-registered businesses since April 2022.";
  startHere.getCell("A7").value = "This model is a starting point. Take specialist advice on your VAT position.";
  for (let r = 2; r <= 7; r++) {
    startHere.getCell(`A${r}`).font = { color: { argb: INK } };
  }

  // ---- Your figures sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: INDIGO } },
  });
  ws.columns = [
    { key: "a", width: 48 },
    { key: "b", width: 18 },
    { key: "c", width: 18 },
  ];

  // Row 1: header
  indigoHeader(ws.getCell("A1"), "Your figures (edit the blue cells)");
  slateHeader(ws.getCell("B1"), "Standard scheme");
  slateHeader(ws.getCell("C1"), "Flat Rate scheme");

  // Row 2: turnover (ex-VAT)
  labelCell(ws.getCell("A2"), "Turnover ex-VAT (GBP)");
  ws.getCell("B2").value = 180000;
  moneyFmt(ws.getCell("B2"));
  indigoInput(ws.getCell("B2"));
  wb.definedNames.add(`'Your figures'!$B$2`, "In_Turnover");

  // Row 3: vatInputs
  labelCell(ws.getCell("A3"), "Input VAT claimable (GBP, standard scheme)");
  ws.getCell("B3").value = 8000;
  moneyFmt(ws.getCell("B3"));
  indigoInput(ws.getCell("B3"));
  wb.definedNames.add(`'Your figures'!$B$3`, "In_VatInputs");

  // Row 4: goodsSpend
  labelCell(ws.getCell("A4"), "Annual goods spend (GBP, for LCT test)");
  ws.getCell("B4").value = 500;
  moneyFmt(ws.getCell("B4"));
  indigoInput(ws.getCell("B4"));
  wb.definedNames.add(`'Your figures'!$B$4`, "In_GoodsSpend");

  // ---- Computed rows ----
  indigoHeader(ws.getCell("A5"), "Computed");
  slateHeader(ws.getCell("B5"), "Standard");
  slateHeader(ws.getCell("C5"), "Flat Rate");

  // Row 6: VAT collected (20% of turnover)
  labelCell(ws.getCell("A6"), "VAT collected (GBP)");
  ws.getCell("B6").value = { formula: "In_Turnover*STD_VAT" };
  ws.getCell("C6").value = { formula: "In_Turnover*STD_VAT" };
  moneyFmt(ws.getCell("B6"));
  moneyFmt(ws.getCell("C6"));
  wb.definedNames.add(`'Your figures'!$B$6`, "VatCollected");

  // Row 7: VAT-inclusive gross
  labelCell(ws.getCell("A7"), "VAT-inclusive gross turnover (GBP)");
  ws.getCell("B7").value = { formula: "In_Turnover+VatCollected" };
  ws.getCell("C7").value = { formula: "In_Turnover+VatCollected" };
  moneyFmt(ws.getCell("B7"));
  moneyFmt(ws.getCell("C7"));
  wb.definedNames.add(`'Your figures'!$B$7`, "GrossInclusive");

  // Row 8: LCT test
  // LCT = goodsSpend < MAX(LCT_GBP, GrossInclusive * LCT_PCT)
  labelCell(ws.getCell("A8"), "Limited-cost trader (LCT)?");
  ws.getCell("B8").value = {
    formula: 'IF(In_GoodsSpend<MAX(LCT_GBP,GrossInclusive*LCT_PCT),"Yes","No")',
  };
  ws.getCell("C8").value = {
    formula: 'IF(In_GoodsSpend<MAX(LCT_GBP,GrossInclusive*LCT_PCT),"Yes","No")',
  };
  wb.definedNames.add(`'Your figures'!$B$8`, "LctFlag");

  // Row 9: Flat rate (16.5% if LCT, 12.5% if not)
  labelCell(ws.getCell("A9"), "Flat Rate Scheme rate");
  ws.getCell("B9").value = "n/a";
  ws.getCell("C9").value = {
    formula: 'IF(LctFlag="Yes",FRS_LCT,FRS_NORMAL)',
  };
  pctFmt(ws.getCell("C9"));
  wb.definedNames.add(`'Your figures'!$C$9`, "In_FlatRate");

  // Row 10: Standard net
  labelCell(ws.getCell("A10"), "Net VAT to HMRC (GBP)");
  ws.getCell("B10").value = { formula: "VatCollected-In_VatInputs" };
  ws.getCell("C10").value = { formula: "GrossInclusive*In_FlatRate" };
  moneyFmt(ws.getCell("B10"));
  moneyFmt(ws.getCell("C10"));
  ws.getCell("B10").font = { bold: true, color: { argb: SLATE } };
  ws.getCell("C10").font = { bold: true, color: { argb: SLATE } };
  wb.definedNames.add(`'Your figures'!$B$10`, "StandardNet");
  wb.definedNames.add(`'Your figures'!$C$10`, "FlatPayment");

  // Row 11: Best scheme
  labelCell(ws.getCell("A11"), "Best scheme");
  ws.getCell("B11").value = {
    formula: 'IF(StandardNet<FlatPayment,"Standard","Flat Rate")',
  };
  ws.getCell("C11").value = {
    formula: 'IF(StandardNet<FlatPayment,"Standard","Flat Rate")',
  };
  ws.getCell("B11").font = { bold: true, color: { argb: INDIGO } };
  ws.getCell("C11").font = { bold: true, color: { argb: INDIGO } };
  wb.definedNames.add(`'Your figures'!$B$11`, "BestScheme");

  // Row 12: annual saving
  labelCell(ws.getCell("A12"), "Annual saving vs the other scheme (GBP)");
  ws.getCell("B12").value = { formula: "ABS(StandardNet-FlatPayment)" };
  ws.getCell("C12").value = { formula: "ABS(StandardNet-FlatPayment)" };
  moneyFmt(ws.getCell("B12"));
  moneyFmt(ws.getCell("C12"));
  wb.definedNames.add(`'Your figures'!$B$12`, "Saving");

  // Row 13: conservation note
  labelCell(ws.getCell("A13"), "Conservation note");
  ws.getCell("B13").value = "Standard: you collect VAT and reclaim inputs.";
  ws.getCell("C13").value = "Flat Rate: you keep the difference between collected VAT and your flat payment.";
  ws.getCell("B13").font = { italic: true, color: { argb: "FF64748b" }, size: 10 };
  ws.getCell("C13").font = { italic: true, color: { argb: "FF64748b" }, size: 10 };

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes", {
    properties: { tabColor: { argb: SLATE } },
  });
  notes.columns = [{ key: "a", width: 90 }];
  indigoHeader(notes.getCell("A1"), "Notes: Agency Founder Finance VAT scheme comparison model");
  const noteLines = [
    "1. Agency services are standard-rated at 20%. Register when taxable turnover exceeds 90,000 in any rolling 12 months.",
    "2. Deregister when taxable turnover falls below 88,000. The old 85,000 threshold no longer applies.",
    "3. MTD for VAT: mandatory for all VAT-registered businesses since April 2022.",
    "4. Limited-cost trader (LCT) test: goods spend is less than both 1,000 a year AND 2% of VAT-inclusive turnover.",
    "   Agencies are overwhelmingly labour-and-software businesses and are nearly always LCT.",
    "5. LCT rate: 16.5% of VAT-inclusive gross turnover. This often makes the Flat Rate Scheme worse than the standard scheme.",
    "6. Non-LCT rate for marketing agencies: 12.5% of VAT-inclusive gross turnover.",
    "7. First-year FRS discount: 1% reduction in the applicable rate in the first year of VAT registration.",
    "8. The overseas B2B reverse-charge (place-of-supply) position depends on the nature of the supply and the customer.",
    "   Take specialist advice if you supply services to overseas VAT-registered businesses.",
    "9. This model is a starting point. Take specialist advice on your VAT scheme choice.",
  ];
  noteLines.forEach((line, i) => {
    noteCell(notes.getCell(`A${i + 2}`), line);
  });

  return wb;
}
