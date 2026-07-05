/**
 * VAT scheme chooser model builder.
 *
 * Traces compareVATSchemes from lib/tools/compute/vat-scheme.ts.
 * Hardcoded-rate note (brief §4.1): non-LCT flat rate is hardcoded 0.125
 * (FLAT_RATE_MARKETING_AGENCY); the LCT branch (0.165) is taken at the defaults.
 * Rates sheet carries both.
 *
 * Default inputs: turnover=100000, vatInputs=2000, goodsSpend=500.
 * Golden: LCT applies, standard wins, saving=1800.
 */
import ExcelJS from "exceljs";
import { UK_TAX_RATES as T } from "../../../src/lib/uk-tax-rates";

// vat-scheme.ts hardcodes these: builder mirrors exactly.
const STANDARD_VAT = 0.20;
const FLAT_RATE_MARKETING_AGENCY = 0.125;
const FLAT_RATE_LCT = T.vat.flatRateLimitedCostTrader; // 0.165
const ANNUAL_LCT_GOODS_THRESHOLD = 1000;
const LCT_TURNOVER_THRESHOLD = 0.02;

const ORANGE = "FFF97316";
const SLATE_900 = "FF0F172A";
const SLATE_50 = "FFF8FAFC";
const BLUE_50 = "FFDBEAFE";

function headerCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_900 } };
  cell.alignment = { vertical: "middle" };
}
function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: SLATE_900 } };
}
function moneyFmt(cell: ExcelJS.Cell) { cell.numFmt = "£#,##0"; }
function pctFmt(cell: ExcelJS.Cell) { cell.numFmt = "0.00%"; }
function blueInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_50 } };
  cell.protection = { locked: false };
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Holloway Davies";
  wb.lastModifiedBy = "Holloway Davies";

  /* ---- Rates ---- */
  const rates = wb.addWorksheet("Rates", { properties: { tabColor: { argb: ORANGE } } });
  rates.columns = [{ key: "label", width: 50 }, { key: "value", width: 18 }];
  headerCell(rates.getCell("A1"), "Locked rates: do not edit (2026/27)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "StandardVatRate", label: "VAT standard rate", value: STANDARD_VAT, pct: true },
    { name: "FlatRateNonLCT", label: "Flat Rate Scheme: non-LCT (marketing/services, hardcoded)", value: FLAT_RATE_MARKETING_AGENCY, pct: true },
    { name: "FlatRateLCT", label: "Flat Rate Scheme: limited cost trader (LCT)", value: FLAT_RATE_LCT, pct: true },
    { name: "LCTGoodsThreshold", label: "LCT annual goods threshold (£)", value: ANNUAL_LCT_GOODS_THRESHOLD },
    { name: "LCTTurnoverThreshold", label: "LCT goods as % of VAT-inclusive turnover", value: LCT_TURNOVER_THRESHOLD, pct: true },
    { name: "RegistrationThreshold", label: "VAT registration threshold (£)", value: T.vat.registrationThreshold },
    { name: "DeregistrationThreshold", label: "VAT deregistration threshold (£)", value: T.vat.deregistrationThreshold },
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

  /* ---- Your figures ---- */
  const ws = wb.addWorksheet("Your figures", { properties: { tabColor: { argb: ORANGE } } });
  ws.columns = [
    { key: "a", width: 44 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 24 },
    { key: "e", width: 18 },
  ];

  headerCell(ws.getCell("A1"), "Your figures: edit the blue cells");
  ws.mergeCells("A1:B1");

  // Inputs
  labelCell(ws.getCell("A3"), "VAT-taxable turnover (ex VAT)");
  ws.getCell("B3").value = 100000; moneyFmt(ws.getCell("B3")); blueInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "Turnover");

  labelCell(ws.getCell("A4"), "VAT on purchases (reclaimable input VAT)");
  ws.getCell("B4").value = 2000; moneyFmt(ws.getCell("B4")); blueInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "VatInputs");

  labelCell(ws.getCell("A5"), "Annual spend on goods (ex VAT)");
  ws.getCell("B5").value = 500; moneyFmt(ws.getCell("B5")); blueInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "GoodsSpend");

  // Derived
  headerCell(ws.getCell("A7"), "Which scheme wins?");
  ws.mergeCells("A7:B7");

  labelCell(ws.getCell("A8"), "VAT collected");
  ws.getCell("B8").value = { formula: "Turnover*StandardVatRate" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B8")); wb.definedNames.add("'Your figures'!$B$8", "VatCollected");

  labelCell(ws.getCell("A9"), "VAT-inclusive turnover");
  ws.getCell("B9").value = { formula: "Turnover+VatCollected" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9")); wb.definedNames.add("'Your figures'!$B$9", "GrossInclusive");

  labelCell(ws.getCell("A10"), "Standard VAT: net payable");
  ws.getCell("B10").value = { formula: "VatCollected-VatInputs" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10")); wb.definedNames.add("'Your figures'!$B$10", "StandardNet");

  labelCell(ws.getCell("A11"), "Limited-cost trader test applies?");
  // LCT if goodsSpend < MAX(1000, grossInclusive*0.02)
  ws.getCell("B11").value = {
    formula: 'IF(GoodsSpend<MAX(LCTGoodsThreshold,GrossInclusive*LCTTurnoverThreshold),"Yes","No")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$11", "LCTApplies");

  labelCell(ws.getCell("A12"), "Flat rate applied");
  ws.getCell("B12").value = {
    formula: 'IF(LCTApplies="Yes",FlatRateLCT,FlatRateNonLCT)',
  } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B12")); wb.definedNames.add("'Your figures'!$B$12", "FlatRate");

  labelCell(ws.getCell("A13"), "Flat Rate: net payable");
  ws.getCell("B13").value = { formula: "GrossInclusive*FlatRate" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13")); wb.definedNames.add("'Your figures'!$B$13", "FlatNet");

  labelCell(ws.getCell("A14"), "Saving (difference between schemes)");
  ws.getCell("B14").value = { formula: "ABS(StandardNet-FlatNet)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14")); wb.definedNames.add("'Your figures'!$B$14", "Saving");

  labelCell(ws.getCell("A15"), "Best scheme");
  ws.getCell("B15").value = {
    formula: 'IF(StandardNet<=FlatNet,"Standard VAT","Flat Rate")',
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B15").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$15", "BestScheme");

  for (let r = 8; r <= 15; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ---- Start here ---- */
  const start = wb.addWorksheet("Start here", { properties: { tabColor: { argb: SLATE_900 } } });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["VAT scheme chooser model", true],
    ["", false],
    ["Compares the standard VAT scheme against the Flat Rate Scheme for your business,", false],
    ["including the limited-cost trader (LCT) trap. Uses 2026/27 VAT rates.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit only the blue cells: turnover, input VAT and goods spend.", false],
    ["3. The verdict and saving update automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked rates. Read 'Notes' for assumptions.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 16 : 12, color: { argb: SLATE_900 } };
  });

  /* ---- Notes ---- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "• VAT registration threshold: £90,000 in any rolling 12 months (increased from £85,000",
    "  on 1 April 2024). You must register if you exceed this or expect to within 30 days.",
    "",
    "• Flat Rate Scheme: available if your expected VAT-inclusive turnover is under £150,000",
    "  in the next 12 months. You leave if your turnover exceeds £230,000.",
    "",
    "• Limited-cost trader (LCT): applies if your goods cost under 2% of your VAT-inclusive",
    "  turnover OR under £1,000 a year. LCT businesses pay 16.5% flat rate, which usually",
    "  makes standard VAT the better choice. Service businesses almost always qualify as LCT.",
    "",
    "• This model does not cover partial exemption, the Annual Accounting Scheme, or",
    "  the Cash Accounting Scheme. Speak to a specialist if any of these apply.",
    "",
    "• MTD for VAT has applied to all registered businesses since April 2022.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
