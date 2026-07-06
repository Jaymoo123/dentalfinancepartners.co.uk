/**
 * CIS vs PAYE take-home comparison Excel model builder for Trade Tax Specialists.
 *
 * Produces a workbook with live formulas tracing saLiability() and class1EmployeeNi()
 * from src/lib/calculators/cis-tax.ts. Constants are mirrored literally from the
 * compute lib with traced comments; the golden test (cis-vs-paye.test.ts) is the
 * drift guard.
 *
 * Golden default (brief section 2):
 *   grossEarnings=45000, cisExpenses=5000, cisRate=20%
 *   -> CIS side: profit=40000, incomeTax=5486, class4=1645.80, cisTakeHome=32868.20
 *   -> PAYE side: payeIncomeTax=6486, payeNi=2594.40, payeTakeHome=35919.60
 *   -> difference = CIS - PAYE = -3051.40 (PAYE wins at these inputs)
 *
 * CRITICAL rate-mix assertion (the brief regression guard):
 *   CIS side uses Class 4 NI at 6%/2% (C4_MAIN / C4_UPPER_RATE).
 *   PAYE side uses employee Class 1 NI at 8%/2% (C1_MAIN / C1_UPPER_RATE).
 *   These MUST NOT be swapped. The golden test pins both numbers to the penny.
 *
 * LET-FREE formulas throughout (Medical incorporation.ts pattern, no LET()).
 *
 * HP traces:
 *   PA 12570, basic 20% to 50270, higher 40% above - HP section 11a
 *   Class 4 NI 6%/2% on CIS profit                 - HP section 11a
 *   Employee Class 1 NI 8%/2%                       - HP section 11a
 *
 * Brand: Trade Tax Specialists (orange #f97316, slate #1e293b).
 * No em-dashes in any cell text. No "DJH". Creator = "Trade Tax Specialists".
 */
import ExcelJS from "exceljs";

// ---- Colours (Trade Tax Specialists brand) ----
const ORANGE = "FFf97316";
const ORANGE_LIGHT = "FFfff7ed";
const SLATE = "FF1e293b";
const WHITE = "FFFFFFFF";

// ---- Locked constants: traced to src/lib/calculators/cis-tax.ts ----
// Income tax thresholds 2026/27 (HP section 11a)
const PA = 12570;               // traced: PERSONAL_ALLOWANCE
const BRL = 37700;              // traced: BASIC_RATE_LIMIT (band width)
const IT_BASIC = 0.20;          // traced: INCOME_TAX_RATES.basic
const IT_HIGHER = 0.40;         // traced: INCOME_TAX_RATES.higher
// Class 4 NI (self-employed, CIS side, HP section 11a)
const C4_LOWER = 12570;         // traced: CLASS4_NI.lowerLimit
const C4_UPPER = 50270;         // traced: CLASS4_NI.upperLimit
const C4_MAIN = 0.06;           // traced: CLASS4_NI.main (6%, NOT 9%)
const C4_UPPER_RATE = 0.02;     // traced: CLASS4_NI.upper
// Employee Class 1 NI (PAYE side, HP section 11a)
const C1_LOWER = 12570;         // traced: uses CLASS4_NI.lowerLimit (same threshold)
const C1_UPPER = 50270;         // traced: uses CLASS4_NI.upperLimit (same threshold)
const C1_MAIN = 0.08;           // traced: CLASS1_NI.main (8%, PAYE employee)
const C1_UPPER_RATE = 0.02;     // traced: CLASS1_NI.upper

// ---- Shared style helpers ----
function orangeHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ORANGE } };
  cell.alignment = { vertical: "middle" };
}

function slateHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: SLATE } };
}

function inputCell(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ORANGE_LIGHT } };
  cell.protection = { locked: false };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "#,##0.00";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Trade Tax Specialists";
  wb.lastModifiedBy = "Trade Tax Specialists";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: SLATE } },
  });
  rates.columns = [
    { key: "label", width: 80 },
    { key: "value", width: 18 },
  ];
  slateHeader(rates.getCell("A1"), "Locked rates: do not edit (2026/27 basis, HP section 11a)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "PA", label: "Income tax: personal allowance (GBP, 2026/27, HP section 11a)", value: PA },
    { name: "BRL", label: "Income tax: basic rate band width (GBP, 20% on first 37700 above PA)", value: BRL },
    { name: "IT_BASIC", label: "Income tax: basic rate 20% (2026/27, HP section 11a)", value: IT_BASIC, pct: true },
    { name: "IT_HIGHER", label: "Income tax: higher rate 40% (2026/27, HP section 11a)", value: IT_HIGHER, pct: true },
    { name: "C4_LOWER", label: "Class 4 NI (CIS): lower profits limit (GBP, 2026/27)", value: C4_LOWER },
    { name: "C4_UPPER_LIM", label: "Class 4 NI (CIS): upper profits limit (GBP, 2026/27)", value: C4_UPPER },
    { name: "C4_MAIN", label: "Class 4 NI (CIS): main rate 6% on C4_LOWER to C4_UPPER_LIM (HP section 11a)", value: C4_MAIN, pct: true },
    { name: "C4_UPPER_RATE", label: "Class 4 NI (CIS): upper rate 2% above C4_UPPER_LIM (HP section 11a)", value: C4_UPPER_RATE, pct: true },
    { name: "C1_LOWER", label: "Employee Class 1 NI (PAYE): primary threshold (GBP, 2026/27)", value: C1_LOWER },
    { name: "C1_UPPER_LIM", label: "Employee Class 1 NI (PAYE): upper earnings limit (GBP, 2026/27)", value: C1_UPPER },
    { name: "C1_MAIN", label: "Employee Class 1 NI (PAYE): main rate 8% on C1_LOWER to C1_UPPER_LIM (HP section 11a)", value: C1_MAIN, pct: true },
    { name: "C1_UPPER_RATE", label: "Employee Class 1 NI (PAYE): upper rate 2% above C1_UPPER_LIM (HP section 11a)", value: C1_UPPER_RATE, pct: true },
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
    properties: { tabColor: { argb: ORANGE } },
  });
  ws.columns = [
    { key: "a", width: 46 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 38 },
    { key: "e", width: 18 },
  ];

  slateHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // ---- Inputs ----
  labelCell(ws.getCell("A3"), "Gross annual earnings (GBP, same figure for both paths)");
  ws.getCell("B3").value = 45000;
  moneyFmt(ws.getCell("B3"));
  inputCell(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_Gross");

  labelCell(ws.getCell("A4"), "Annual business expenses (CIS path only: mileage, tools, PPE, van, GBP)");
  ws.getCell("B4").value = 5000;
  moneyFmt(ws.getCell("B4"));
  inputCell(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_CisExpenses");

  labelCell(ws.getCell("A5"), "CIS deduction rate (0 for GPS / 0.20 for registered / 0.30 for unregistered)");
  ws.getCell("B5").value = 0.20;
  ws.getCell("B5").numFmt = "0%";
  inputCell(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_CisRate");

  // ---- CIS self-employed path ----
  slateHeader(ws.getCell("A7"), "CIS self-employed path");
  ws.mergeCells("A7:B7");

  // cisProfit = max(0, gross - expenses)
  labelCell(ws.getCell("A8"), "Taxable profit (gross less expenses, GBP)");
  ws.getCell("B8").value = { formula: "MAX(0,In_Gross-In_CisExpenses)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B8"));
  wb.definedNames.add("'Your figures'!$B$8", "CIS_Profit");

  // incomeTax: LET-free banded formula on cisProfit (HP section 11a)
  labelCell(ws.getCell("A9"), "Income tax (basic 20% + higher 40%, GBP)");
  ws.getCell("B9").value = {
    formula:
      "IF(CIS_Profit<=PA,0," +
      "MIN(CIS_Profit-PA,BRL)*IT_BASIC+" +
      "MAX(0,CIS_Profit-PA-BRL)*IT_HIGHER)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "CIS_IncomeTax");

  // Class 4 NI on CIS profit: 6%/2% (NOT 8%/2% - that is Class 1 PAYE)
  labelCell(ws.getCell("A10"), "Class 4 NI (6%/2% on CIS profit, NOT Class 1, GBP)");
  ws.getCell("B10").value = {
    formula:
      "IF(CIS_Profit<=C4_LOWER,0," +
      "(MIN(CIS_Profit,C4_UPPER_LIM)-C4_LOWER)*C4_MAIN+" +
      "MAX(0,CIS_Profit-C4_UPPER_LIM)*C4_UPPER_RATE)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "CIS_Class4Ni");

  // cisTotalTax = incomeTax + class4
  labelCell(ws.getCell("A11"), "Total CIS tax (income tax + Class 4 NI, GBP)");
  ws.getCell("B11").value = { formula: "CIS_IncomeTax+CIS_Class4Ni" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "CIS_TotalTax");

  // cisTakeHome = gross - expenses - totalTax
  labelCell(ws.getCell("A12"), "CIS take-home (gross less expenses less total tax, GBP)");
  ws.getCell("B12").value = { formula: "In_Gross-In_CisExpenses-CIS_TotalTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  ws.getCell("B12").font = { bold: true };
  ws.getCell("A12").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$12", "CIS_TakeHome");

  // Conservation check CIS side: gross - expenses - totalTax = takeHome
  labelCell(ws.getCell("A13"), "Check: In_Gross - In_CisExpenses - CIS_TotalTax = CIS_TakeHome");
  ws.getCell("B13").value = {
    formula: 'IF(ABS(CIS_TakeHome-(In_Gross-In_CisExpenses-CIS_TotalTax))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$13", "CIS_ConservationCheck");

  // ---- PAYE employee path ----
  slateHeader(ws.getCell("A15"), "PAYE employee path");
  ws.mergeCells("A15:B15");

  // payeIncomeTax: same bands as CIS but on gross (no expenses on PAYE side)
  labelCell(ws.getCell("A16"), "Income tax (basic 20% + higher 40%, GBP)");
  ws.getCell("B16").value = {
    formula:
      "IF(In_Gross<=PA,0," +
      "MIN(In_Gross-PA,BRL)*IT_BASIC+" +
      "MAX(0,In_Gross-PA-BRL)*IT_HIGHER)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  wb.definedNames.add("'Your figures'!$B$16", "PAYE_IncomeTax");

  // Employee Class 1 NI: 8%/2% (NOT 6%/2% - that is Class 4 CIS)
  labelCell(ws.getCell("A17"), "Employee Class 1 NI (8%/2% on gross, NOT Class 4, GBP)");
  ws.getCell("B17").value = {
    formula:
      "IF(In_Gross<=C1_LOWER,0," +
      "(MIN(In_Gross,C1_UPPER_LIM)-C1_LOWER)*C1_MAIN+" +
      "MAX(0,In_Gross-C1_UPPER_LIM)*C1_UPPER_RATE)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  wb.definedNames.add("'Your figures'!$B$17", "PAYE_Class1Ni");

  // payeTotalTax = incomeTax + class1
  labelCell(ws.getCell("A18"), "Total PAYE tax (income tax + employee NI, GBP)");
  ws.getCell("B18").value = { formula: "PAYE_IncomeTax+PAYE_Class1Ni" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  wb.definedNames.add("'Your figures'!$B$18", "PAYE_TotalTax");

  // payeTakeHome = gross - payeTotalTax
  labelCell(ws.getCell("A19"), "PAYE take-home (gross less total tax, GBP)");
  ws.getCell("B19").value = { formula: "In_Gross-PAYE_TotalTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B19"));
  ws.getCell("B19").font = { bold: true };
  ws.getCell("A19").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$19", "PAYE_TakeHome");

  // Conservation check PAYE side: gross - totalTax = takeHome
  labelCell(ws.getCell("A20"), "Check: In_Gross - PAYE_TotalTax = PAYE_TakeHome");
  ws.getCell("B20").value = {
    formula: 'IF(ABS(PAYE_TakeHome-(In_Gross-PAYE_TotalTax))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$20", "PAYE_ConservationCheck");

  // ---- Comparison ----
  slateHeader(ws.getCell("A22"), "Take-home comparison");
  ws.mergeCells("A22:B22");

  labelCell(ws.getCell("A23"), "CIS take-home less PAYE take-home (positive = CIS wins, GBP)");
  ws.getCell("B23").value = { formula: "CIS_TakeHome-PAYE_TakeHome" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B23"));
  ws.getCell("B23").font = { bold: true, color: { argb: ORANGE } };
  ws.getCell("A23").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$23", "TakeHomeDiff");

  // ---- Results panel (right side D-E columns) ----
  orangeHeader(ws.getCell("D1"), "CIS self-employed");
  ws.mergeCells("D1:E1");
  slateHeader(ws.getCell("D8"), "PAYE employee");
  ws.mergeCells("D8:E8");

  const cisResults: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 2, label: "Gross earnings", formula: "In_Gross" },
    { row: 3, label: "Allowable expenses", formula: "In_CisExpenses" },
    { row: 4, label: "Income tax", formula: "CIS_IncomeTax" },
    { row: 5, label: "Class 4 NI (6%/2%)", formula: "CIS_Class4Ni" },
    { row: 6, label: "Take-home", formula: "CIS_TakeHome", strong: true },
  ];
  for (const r of cisResults) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: SLATE } };
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.strong) c.font = { bold: true, color: { argb: SLATE } };
  }

  const payeResults: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 9, label: "Gross earnings", formula: "In_Gross" },
    { row: 10, label: "Income tax", formula: "PAYE_IncomeTax" },
    { row: 11, label: "Employee NI (Class 1 8%/2%)", formula: "PAYE_Class1Ni" },
    { row: 12, label: "Take-home", formula: "PAYE_TakeHome", strong: true },
  ];
  for (const r of payeResults) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: SLATE } };
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.strong) c.font = { bold: true, color: { argb: SLATE } };
  }

  labelCell(ws.getCell("D14"), "CIS advantage (negative = PAYE wins)");
  ws.getCell("D14").font = { bold: true, color: { argb: SLATE } };
  const diffCell = ws.getCell("E14");
  diffCell.value = { formula: "TakeHomeDiff" } as ExcelJS.CellFormulaValue;
  diffCell.numFmt = "#,##0.00";
  diffCell.font = { bold: true, color: { argb: ORANGE } };

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: ORANGE } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["CIS vs PAYE take-home comparison model", true],
    ["Trade Tax Specialists", false],
    ["", false],
    ["This model compares the annual take-home of a CIS self-employed subcontractor", false],
    ["with a PAYE employee at the same gross earnings, using 2026/27 rates.", false],
    ["", false],
    ["Key differences:", true],
    ["CIS: you can deduct genuine business expenses. Class 4 NI 6%/2%.", false],
    ["PAYE: no expense deduction. Employee Class 1 NI 8%/2%.", false],
    ["The CIS advance (deducted at source) is a cash-flow timing point only.", false],
    ["", false],
    ["Non-financial factors: PAYE carries statutory employment rights.", false],
    ["CIS subcontractors have no sick pay, holiday pay or redundancy protection.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2026/27 rates. Do not edit it.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 14 : 12, color: { argb: SLATE } };
  });

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "Rate mix",
    "CIS self-employed: Class 4 NI at 6% (12570-50270) and 2% above (HP section 11a).",
    "PAYE employee: employee Class 1 NI at 8% (12570-50270) and 2% above (HP section 11a).",
    "Employer NIC is the engager's cost and is excluded from this subcontractor comparison.",
    "",
    "Income tax: 2026/27 rates. PA GBP 12,570; basic 20% on next GBP 37,700; higher 40% above.",
    "",
    "PAYE take-home assumes no employment benefits, pension contributions or tax codes other",
    "than the standard personal allowance code.",
    "",
    "CIS take-home assumes the year-end Self Assessment refund is received in full. The CIS",
    "advance is a timing point: it is reconciled via Self Assessment, not a final tax.",
    "",
    "This is a directional estimate. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE } };
    if (i === 2) c.font = { bold: true, color: { argb: SLATE } };
  });

  // Tab order: Start here, Your figures, Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
