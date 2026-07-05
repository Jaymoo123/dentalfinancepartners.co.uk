/**
 * NHS Pension annual allowance Excel model builder for Medical Accountants UK.
 *
 * Produces a workbook with live formulas tracing calcNHSPension() from
 * src/lib/tools/compute/nhs-pension.ts. Constants are mirrored literally
 * from the compute lib (option 2 per section 0.E) with traced comments;
 * the golden test (nhs-pension.test.ts) is the drift guard.
 *
 * Golden cases (brief section 4.1):
 *   DEFAULT: thresholdIncome=150000, pensionGrowth=40000, higher
 *     -> adjustedIncome=190000, NOT tapered, allowance=60000, excess=0, taxCharge=0
 *   STRESS (NHS-A): thresholdIncome=210000, pensionGrowth=70000, higher
 *     -> adjustedIncome=280000, reduction=10000, allowance=50000, excess=20000, taxCharge=8000
 *   FLOOR (NHS-C): thresholdIncome=300000, pensionGrowth=200000, basic
 *     -> reduction=120000, allowance=10000 (floor), excess=190000, taxCharge=38000
 *
 * Brand: Medical Accountants UK (navy #001b3d, copper #b87333).
 * No em-dashes in any cell text. No "DJH". Creator = "Medical Accountants UK".
 */
import ExcelJS from "exceljs";

// ---- Colours (Medical Accountants UK brand) ----
const NAVY = "FF001b3d";   // #001b3d
const COPPER = "FFb87333"; // #b87333
const COPPER_LIGHT = "FFF5EDE0"; // light copper tint for input cells
const WHITE = "FFFFFFFF";
const INK = "FF001b3d";    // same as navy for headings

// ---- Locked constants: traced to src/lib/tools/compute/nhs-pension.ts ----
// Standard allowance (2025/26)
const STANDARD_ALLOWANCE = 60000;      // traced to nhs-pension.ts: STANDARD_ALLOWANCE
const MIN_ALLOWANCE = 10000;           // traced to nhs-pension.ts: MIN_ALLOWANCE
const THRESHOLD_LIMIT = 200000;        // traced to nhs-pension.ts: THRESHOLD_LIMIT
const ADJUSTED_LIMIT = 260000;         // traced to nhs-pension.ts: ADJUSTED_LIMIT
// Tax rates for the three bands
const RATE_BASIC = 0.20;               // traced to nhs-pension.ts: TAX_RATES.basic
const RATE_HIGHER = 0.40;              // traced to nhs-pension.ts: TAX_RATES.higher
const RATE_ADDITIONAL = 0.45;          // traced to nhs-pension.ts: TAX_RATES.additional

// ---- Shared style helpers ----
function navyHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  cell.alignment = { vertical: "middle" };
}

function copperHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COPPER } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: INK } };
}

function copperInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COPPER_LIGHT } };
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
  wb.creator = "Medical Accountants UK";
  wb.lastModifiedBy = "Medical Accountants UK";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: NAVY } },
  });
  rates.columns = [
    { key: "label", width: 60 },
    { key: "value", width: 18 },
  ];
  navyHeader(rates.getCell("A1"), "Locked rates: do not edit (2025/26 basis)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "STANDARD_ALLOWANCE", label: "Standard annual allowance (GBP): 2025/26 basis", value: STANDARD_ALLOWANCE },
    { name: "MIN_ALLOWANCE", label: "Minimum tapered allowance (GBP): 2025/26 basis", value: MIN_ALLOWANCE },
    { name: "THRESHOLD_LIMIT", label: "Threshold income taper trigger (GBP): 2025/26 basis", value: THRESHOLD_LIMIT },
    { name: "ADJUSTED_LIMIT", label: "Adjusted income taper trigger (GBP): 2025/26 basis", value: ADJUSTED_LIMIT },
    { name: "RATE_BASIC", label: "Income tax: basic rate (for AA charge)", value: RATE_BASIC, pct: true },
    { name: "RATE_HIGHER", label: "Income tax: higher rate (for AA charge)", value: RATE_HIGHER, pct: true },
    { name: "RATE_ADDITIONAL", label: "Income tax: additional rate (for AA charge)", value: RATE_ADDITIONAL, pct: true },
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
    properties: { tabColor: { argb: COPPER } },
  });
  ws.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 38 },
    { key: "e", width: 20 },
  ];

  navyHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // ---- Inputs (blue input cells) ----
  // Row 3: Threshold income (default 150000: R2 Tool 1 config)
  labelCell(ws.getCell("A3"), "Threshold income for the year (GBP)");
  ws.getCell("B3").value = 150000;
  moneyFmt(ws.getCell("B3"));
  copperInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_ThresholdIncome");

  // Row 4: NHS pension input amount / growth (default 40000)
  labelCell(ws.getCell("A4"), "NHS pension input amount (growth this year, GBP)");
  ws.getCell("B4").value = 40000;
  moneyFmt(ws.getCell("B4"));
  copperInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_PensionGrowth");

  // Row 5: Tax band (1=basic, 2=higher, 3=additional): default 2 (higher)
  // We store the rate directly as a selectable numeric for simplicity in formulas
  // (the user edits this cell to 0.20, 0.40, or 0.45; we label it clearly)
  labelCell(ws.getCell("A5"), "Marginal income tax rate (use: 0.20 / 0.40 / 0.45)");
  ws.getCell("B5").value = 0.40; // default: higher rate
  pctFmt(ws.getCell("B5"));
  copperInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_TaxRate");

  // ---- Intermediate calculations ----

  // Row 7: Adjusted income = threshold + pension growth
  labelCell(ws.getCell("A7"), "Adjusted income (threshold + pension growth)");
  ws.getCell("B7").value = { formula: "In_ThresholdIncome+In_PensionGrowth" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B7"));
  wb.definedNames.add("'Your figures'!$B$7", "AdjustedIncome");

  // Row 8: Is tapered? (threshold > 200000 AND adjusted > 260000)
  labelCell(ws.getCell("A8"), "Taper applies?");
  ws.getCell("B8").value = {
    formula: 'IF(AND(In_ThresholdIncome>THRESHOLD_LIMIT,AdjustedIncome>ADJUSTED_LIMIT),"Yes","No")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$8", "IsTapered");

  // Row 9: Reduction = (adjustedIncome - ADJUSTED_LIMIT) / 2 (only if tapered)
  labelCell(ws.getCell("A9"), "Taper reduction (GBP, 0 if not tapered)");
  ws.getCell("B9").value = {
    formula: "IF(AND(In_ThresholdIncome>THRESHOLD_LIMIT,AdjustedIncome>ADJUSTED_LIMIT),(AdjustedIncome-ADJUSTED_LIMIT)/2,0)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "TaperReduction");

  // Row 10: Annual allowance = MAX(MIN_ALLOWANCE, STANDARD_ALLOWANCE - reduction)
  labelCell(ws.getCell("A10"), "Your annual allowance (GBP)");
  ws.getCell("B10").value = {
    formula: "MAX(MIN_ALLOWANCE,STANDARD_ALLOWANCE-TaperReduction)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  ws.getCell("B10").font = { bold: true };
  ws.getCell("A10").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$10", "AnnualAllowance");

  // Row 11: Excess = MAX(0, pensionGrowth - annualAllowance)
  labelCell(ws.getCell("A11"), "Excess over annual allowance (GBP)");
  ws.getCell("B11").value = {
    formula: "MAX(0,In_PensionGrowth-AnnualAllowance)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "Excess");

  // Row 12: Tax charge = excess * tax rate
  labelCell(ws.getCell("A12"), "Estimated annual allowance tax charge (GBP)");
  ws.getCell("B12").value = {
    formula: "Excess*In_TaxRate",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  ws.getCell("B12").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("A12").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$12", "TaxCharge");

  // Row 13: Effective cost as % of pension growth (only when both > 0)
  labelCell(ws.getCell("A13"), "Effective cost as % of pension growth (when charge > 0)");
  ws.getCell("B13").value = {
    formula: "IF(AND(In_PensionGrowth>0,TaxCharge>0),TaxCharge/In_PensionGrowth,0)",
  } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B13"));

  // Row 15: Conservation check
  labelCell(ws.getCell("A15"), "Check: excess + allowance = pension growth");
  ws.getCell("B15").value = {
    formula: 'IF(ABS(Excess+AnnualAllowance-In_PensionGrowth)<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;

  // ---- Results panel (right side D/E columns) ----
  copperHeader(ws.getCell("D1"), "Summary");
  ws.mergeCells("D1:E1");

  const results: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Threshold income", formula: "In_ThresholdIncome" },
    { row: 4, label: "Pension input amount (growth)", formula: "In_PensionGrowth" },
    { row: 5, label: "Adjusted income", formula: "AdjustedIncome" },
    { row: 6, label: "Taper applies?", formula: "IsTapered" },
    { row: 7, label: "Annual allowance", formula: "AnnualAllowance", strong: true },
    { row: 8, label: "Excess over allowance", formula: "Excess" },
    { row: 10, label: "Annual allowance charge", formula: "TaxCharge", strong: true },
    { row: 11, label: "Effective cost %", formula: "TaxCharge/MAX(In_PensionGrowth,1)*100" },
  ];

  for (const r of results) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) {
      ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: NAVY } };
    }
    const c = ws.getCell(`E${r.row}`);
    if (r.label === "Taper applies?") {
      c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    } else if (r.label.includes("%")) {
      c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
      c.numFmt = "0.00";
    } else {
      c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
      moneyFmt(c);
    }
    if (r.strong) {
      c.font = { bold: true, color: { argb: NAVY } };
    }
  }

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: COPPER } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["NHS Pension annual allowance and taper model", true],
    ["Medical Accountants UK", false],
    ["", false],
    ["This model estimates your NHS pension annual allowance position and any annual", false],
    ["allowance charge, including the taper, for 2025/26.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells: threshold income, pension growth, tax rate.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["Tax rate options: 0.20 (basic 20%), 0.40 (higher 40%), 0.45 (additional 45%).", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2025/26 rates. Do not edit it.", false],
    ["See 'Notes' for assumptions and limitations.", false],
    ["", false],
    ["The taper applies only when threshold income is over 200,000 AND adjusted income", false],
    ["is over 260,000. The minimum tapered allowance is 10,000.", false],
    ["", false],
    ["Carry-forward from the previous three years can remove a charge entirely and is", false],
    ["not modelled here. Scheme Pays is available where the charge is over 2,000 and", false],
    ["NHS scheme growth alone exceeds 60,000. Speak to a specialist.", false],
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
    "2025/26 rates (restored 2023): standard annual allowance GBP60,000;",
    "minimum tapered allowance GBP10,000; threshold income trigger GBP200,000;",
    "adjusted income trigger GBP260,000.",
    "",
    "Taper: where threshold income is over GBP200,000 AND adjusted income is over GBP260,000,",
    "the allowance reduces by GBP1 for every GBP2 of excess adjusted income, down to GBP10,000.",
    "",
    "Pension input amount: this model uses the GROWTH in your pension benefits (the pension",
    "input amount), not the contributions you paid. These differ for defined-benefit schemes.",
    "",
    "Carry-forward: unused annual allowance from the previous three tax years can offset a",
    "current-year excess. Carry-forward is not modelled here.",
    "",
    "Scheme Pays: where the annual allowance charge exceeds GBP2,000 and NHS scheme growth",
    "alone exceeds GBP60,000, Mandatory Scheme Pays lets the scheme settle the charge",
    "in exchange for a permanent pension reduction. Election deadline: 31 July in the",
    "tax year after the charge (2025/26 charge: 31 July 2027).",
    "",
    "CT 25% flat is used in the incorporation model (see incorporation-model.xlsx Notes).",
    "This model is for NHS pension only.",
    "",
    "This is a directional model. Your actual position depends on carry-forward,",
    "Scheme Pays eligibility, other income and pension inputs from non-NHS schemes.",
    "Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: NAVY } };
  });

  // Tab order: Start here, Your figures, Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}

// Suppress unused import
void pctFmt;
