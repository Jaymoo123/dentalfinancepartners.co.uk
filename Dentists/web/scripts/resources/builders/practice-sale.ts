/**
 * Practice sale CGT/BADR Excel model builder for Dental Finance Partners.
 *
 * Produces a workbook with live formulas tracing calcPracticeSaleCgt() from
 * src/lib/tools/compute/practice-sale-cgt.ts.
 *
 * Golden case (brief §4.1, compute lib defaults):
 *   gain=200000, otherIncome=50000, badrEligible=true, aeaAvailable=3000
 *   -> taxableGain=197000, totalCgt=35460, netProceeds=164540
 *
 * Constants verified against practice-sale-cgt.ts:
 *   - DEFAULT_AEA = 3000
 *   - BADR_RATE = 0.18 (from 6 April 2026, HP §4)
 *   - CGT_BASIC = 0.18 (from 30 October 2024)
 *   - CGT_HIGHER = 0.24 (from 30 October 2024)
 *   - BADR_LIFETIME = 1,000,000
 *   - BASIC_RATE_LIMIT = 50,270, PERSONAL_ALLOWANCE = 12,570
 */
import ExcelJS from "exceljs";

const NAVY = "FF001b3d";
const GOLD = "FFb8975d";
const GOLD_LIGHT = "FFF5EDD8";
const WHITE = "FFFFFFFF";
const INK = "FF1A1A2E";

// Constants from practice-sale-cgt.ts
const DEFAULT_AEA = 3000;
const BADR_RATE = 0.18;
const CGT_BASIC = 0.18;
const CGT_HIGHER = 0.24;
const BADR_LIFETIME = 1_000_000;
const BASIC_RATE_LIMIT = 50270;
const PERSONAL_ALLOWANCE = 12570;

function navyHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  cell.alignment = { vertical: "middle" };
}

function goldHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: NAVY }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: INK } };
}

function goldInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
  cell.protection = { locked: false };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0";
}

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "0.00%";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Dental Finance Partners";
  wb.lastModifiedBy = "Dental Finance Partners";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: NAVY } },
  });
  rates.columns = [
    { key: "label", width: 54 },
    { key: "value", width: 18 },
  ];
  navyHeader(rates.getCell("A1"), "Locked rates: do not edit");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "AEA", label: "Annual Exempt Amount (GBP, 2025/26 and 2026/27)", value: DEFAULT_AEA },
    { name: "BadrRate", label: "BADR rate from 6 Apr 2026 (HP para 4)", value: BADR_RATE, pct: true },
    { name: "CgtBasic", label: "Standard CGT: basic rate from 30 Oct 2024", value: CGT_BASIC, pct: true },
    { name: "CgtHigher", label: "Standard CGT: higher rate from 30 Oct 2024", value: CGT_HIGHER, pct: true },
    { name: "BadrLifetime", label: "BADR lifetime limit (GBP)", value: BADR_LIFETIME },
    { name: "BasicLimit", label: "Income tax basic rate upper limit (GBP)", value: BASIC_RATE_LIMIT },
    { name: "PA", label: "Personal allowance (GBP)", value: PERSONAL_ALLOWANCE },
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

  // ---- Your figures sheet ----
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: GOLD } },
  });
  ws.columns = [
    { key: "a", width: 46 },
    { key: "b", width: 22 },
    { key: "c", width: 4 },
    { key: "d", width: 38 },
    { key: "e", width: 22 },
  ];

  navyHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // Inputs
  labelCell(ws.getCell("A3"), "Total gain on disposal (GBP)");
  ws.getCell("B3").value = 200000;
  moneyFmt(ws.getCell("B3"));
  goldInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_Gain");

  labelCell(ws.getCell("A4"), "Other taxable income this year (GBP)");
  ws.getCell("B4").value = 50000;
  moneyFmt(ws.getCell("B4"));
  goldInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_OtherIncome");

  labelCell(ws.getCell("A5"), "BADR eligible");
  ws.getCell("B5").value = "Yes";
  ws.getCell("B5").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"Yes,No"'],
  };
  goldInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_BadrEligible");

  labelCell(ws.getCell("A6"), "Annual Exempt Amount available (GBP)");
  ws.getCell("B6").value = DEFAULT_AEA;
  moneyFmt(ws.getCell("B6"));
  goldInput(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_AEA");

  labelCell(ws.getCell("A7"), "BADR lifetime remaining (GBP)");
  ws.getCell("B7").value = BADR_LIFETIME;
  moneyFmt(ws.getCell("B7"));
  goldInput(ws.getCell("B7"));
  wb.definedNames.add("'Your figures'!$B$7", "In_BadrRemaining");

  // ---- Calculations ----
  // Step 1: taxable gain
  labelCell(ws.getCell("A9"), "Taxable gain (after AEA)");
  ws.getCell("B9").value = { formula: "MAX(0,In_Gain-In_AEA)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "TaxableGain");

  // Step 2: basic band remaining after other income
  // incomeInBasicBand = MIN(MAX(0,otherIncome-PA), BasicLimit-PA)
  // basicBandRemaining = MAX(0, BasicLimit-PA - incomeInBasicBand)
  labelCell(ws.getCell("A10"), "Basic rate band remaining");
  ws.getCell("B10").value = {
    formula:
      "LET(inBand,MIN(MAX(0,In_OtherIncome-PA),BasicLimit-PA)," +
      "MAX(0,(BasicLimit-PA)-inBand))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "BasicBandRemaining");

  // Step 3: BADR gain
  // IF eligible AND BadrRemaining>0: gainAtBadr = MIN(TaxableGain, BadrRemaining)
  labelCell(ws.getCell("A11"), "Gain at BADR (18%)");
  ws.getCell("B11").value = {
    formula: 'IF(AND(In_BadrEligible="Yes",In_BadrRemaining>0),MIN(TaxableGain,In_BadrRemaining),0)',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "GainAtBadr");

  // Remaining gain after BADR
  labelCell(ws.getCell("A12"), "Remaining gain (standard CGT)");
  ws.getCell("B12").value = { formula: "MAX(0,TaxableGain-GainAtBadr)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "RemainingGain");

  // Basic band after BADR occupies the lower stack
  labelCell(ws.getCell("A13"), "Basic band after BADR");
  ws.getCell("B13").value = { formula: "MAX(0,BasicBandRemaining-GainAtBadr)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  wb.definedNames.add("'Your figures'!$B$13", "BasicBandAfterBadr");

  // Gain at basic CGT (18%)
  labelCell(ws.getCell("A14"), "Gain at basic CGT (18%)");
  ws.getCell("B14").value = { formula: "MIN(RemainingGain,BasicBandAfterBadr)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  wb.definedNames.add("'Your figures'!$B$14", "GainAtBasic");

  // Gain at higher CGT (24%)
  labelCell(ws.getCell("A15"), "Gain at higher CGT (24%)");
  ws.getCell("B15").value = { formula: "MAX(0,RemainingGain-GainAtBasic)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "GainAtHigher");

  // Total CGT
  labelCell(ws.getCell("A16"), "Total CGT");
  ws.getCell("B16").value = {
    formula: "GainAtBadr*BadrRate+GainAtBasic*CgtBasic+GainAtHigher*CgtHigher",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  ws.getCell("A16").font = { bold: true };
  ws.getCell("B16").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$16", "TotalCgt");

  // Net proceeds
  labelCell(ws.getCell("A17"), "Net proceeds (gain minus CGT)");
  ws.getCell("B17").value = { formula: "In_Gain-TotalCgt" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  ws.getCell("A17").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("B17").font = { bold: true, color: { argb: NAVY } };
  wb.definedNames.add("'Your figures'!$B$17", "NetProceeds");

  // Conservation check: TaxableGain = GainAtBadr + GainAtBasic + GainAtHigher
  labelCell(ws.getCell("A19"), "Check: gains sum to taxable gain");
  ws.getCell("B19").value = { formula: "IF(ABS(GainAtBadr+GainAtBasic+GainAtHigher-TaxableGain)<0.01,\"OK\",\"ERROR\")" } as ExcelJS.CellFormulaValue;

  // ---- Summary panel (D/E) ----
  goldHeader(ws.getCell("D1"), "Summary");
  ws.mergeCells("D1:E1");

  const results: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Total gain", formula: "In_Gain" },
    { row: 4, label: "Annual Exempt Amount", formula: "In_AEA" },
    { row: 5, label: "Taxable gain", formula: "TaxableGain", strong: true },
    { row: 7, label: "At BADR (18%)", formula: "GainAtBadr" },
    { row: 8, label: "At basic CGT (18%)", formula: "GainAtBasic" },
    { row: 9, label: "At higher CGT (24%)", formula: "GainAtHigher" },
    { row: 10, label: "Total CGT", formula: "TotalCgt", strong: true },
    { row: 12, label: "Net proceeds", formula: "NetProceeds", strong: true },
  ];

  for (const r of results) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: NAVY } };
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.strong) c.font = { bold: true, color: { argb: NAVY } };
  }

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: GOLD } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Practice sale model: CGT and BADR", true],
    ["Dental Finance Partners", false],
    ["", false],
    ["This model shows the approximate Capital Gains Tax on a dental practice disposal,", false],
    ["applying Business Asset Disposal Relief (BADR) at 18% within the GBP1m lifetime limit.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to 'Your figures' and edit the highlighted cells.", false],
    ["2. Enter your total gain, other income, BADR eligibility and AEA.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["Rates are from 6 April 2026 (BADR 18%) and 30 October 2024 (CGT 18%/24%).", false],
    ["See 'Notes' for assumptions and limitations.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 14 : 12, color: { argb: NAVY } };
  });

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "BADR rate 18% applies from 6 April 2026 (HP para 4, gov.uk/business-asset-disposal-relief).",
    "Standard CGT: 18% basic, 24% higher, both from 30 October 2024.",
    "AEA: GBP3,000 for 2025/26 and 2026/27.",
    "BADR lifetime limit: GBP1,000,000.",
    "",
    "BADR gains sit at the bottom of the gain stack and use the basic-rate band first.",
    "The model applies BADR to the full taxable gain up to the lifetime limit when eligible.",
    "",
    "The model does not: quantify the two-year holding period test, assess qualifying",
    "conditions for share vs asset sales, model earn-outs across tax years,",
    "or account for pension contributions reducing adjusted net income.",
    "",
    "Net proceeds = total gain minus total CGT (before legal/professional costs).",
    "Speak to a specialist before any disposal decision.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: NAVY } };
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}

// Suppress unused import warning
void pctFmt;
