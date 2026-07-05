/**
 * Doctor take-home pay Excel model builder for Medical Accountants UK.
 *
 * Produces a workbook with live formulas tracing calcLocumTax() from
 * src/lib/tools/compute/locum-tax.ts. Constants are mirrored literally
 * from the compute lib (option 2 per section 0.E) with traced comments;
 * the golden test (locum.test.ts) is the drift guard.
 *
 * Golden cases (brief section 4.1):
 *   DEFAULT: grossIncome=80000, expenses=5000, pension=10000, none
 *     -> netIncome=65000, incomeTax=13432, nationalInsurance=2556.6,
 *        totalDeductions=15988.6, netTakeHome=49011.4, effectiveRate=24.6%
 *   PLAN2 (LOC-B): grossIncome=80000, expenses=5000, pension=10000, plan2
 *     -> threshold=28470, SL=3287.70, netTakeHome=45723.7
 *
 * Class 4 is 6% (not the abolished 9%): traced to locum-tax.ts.
 * Class 2 is removed from 6 April 2024 and is NOT in this model.
 *
 * Brand: Medical Accountants UK (navy #001b3d, copper #b87333).
 * No em-dashes in any cell text. No "DJH". Creator = "Medical Accountants UK".
 * Date label: 2025/26 (income tax bands unchanged into 2026/27).
 */
import ExcelJS from "exceljs";

// ---- Colours (Medical Accountants UK brand) ----
const NAVY = "FF001b3d";
const COPPER = "FFb87333";
const COPPER_LIGHT = "FFF5EDE0";
const WHITE = "FFFFFFFF";
const INK = "FF001b3d";

// ---- Locked constants: traced to src/lib/tools/compute/locum-tax.ts ----
// Income tax 2025/26
const PA = 12570;              // traced: PERSONAL_ALLOWANCE
const BRL = 50270;             // traced: BASIC_RATE_LIMIT
const HRL = 125140;            // traced: HIGHER_RATE_LIMIT
// Class 4 NIC (self-employed) 2025/26
const NI_LOWER = 12570;        // traced: NI_LOWER_LIMIT
const NI_UPPER = 50270;        // traced: NI_UPPER_LIMIT
const C4_MAIN = 0.06;          // traced: 0.06 (6%: NOT the abolished 9%)
const C4_UPPER = 0.02;         // traced: 0.02
// Student loan thresholds 2025/26 (deliberate correction 2026-06-11)
const SL_PLAN1 = 26065;        // traced: STUDENT_LOAN_THRESHOLDS.plan1
const SL_PLAN2 = 28470;        // traced: STUDENT_LOAN_THRESHOLDS.plan2
const SL_PLAN4 = 32745;        // traced: STUDENT_LOAN_THRESHOLDS.plan4
const SL_RATE = 0.09;          // traced: 9%

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
    { name: "PA", label: "Income tax: personal allowance (GBP): 2025/26", value: PA },
    { name: "BRL", label: "Income tax: basic rate upper limit (GBP): 2025/26", value: BRL },
    { name: "HRL", label: "Income tax: higher rate upper limit (GBP): 2025/26", value: HRL },
    { name: "NI_LOWER", label: "Class 4 NIC: lower profits limit (GBP): 2025/26", value: NI_LOWER },
    { name: "NI_UPPER", label: "Class 4 NIC: upper profits limit (GBP): 2025/26", value: NI_UPPER },
    { name: "C4_MAIN", label: "Class 4 NIC: main rate (6%, between lower and upper limit): 2025/26", value: C4_MAIN, pct: true },
    { name: "C4_UPPER_RATE", label: "Class 4 NIC: upper rate (2%, above upper limit): 2025/26", value: C4_UPPER, pct: true },
    { name: "SL_PLAN1", label: "Student loan Plan 1: repayment threshold (GBP): 2025/26", value: SL_PLAN1 },
    { name: "SL_PLAN2", label: "Student loan Plan 2: repayment threshold (GBP): 2025/26", value: SL_PLAN2 },
    { name: "SL_PLAN4", label: "Student loan Plan 4: repayment threshold (GBP): 2025/26", value: SL_PLAN4 },
    { name: "SL_RATE", label: "Student loan repayment rate (9% of income above threshold): 2025/26", value: SL_RATE, pct: true },
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

  // ---- Inputs ----
  labelCell(ws.getCell("A3"), "Gross fees / self-employed income for the year (GBP)");
  ws.getCell("B3").value = 80000;
  moneyFmt(ws.getCell("B3"));
  copperInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_GrossIncome");

  labelCell(ws.getCell("A4"), "Allowable business expenses (GBP)");
  ws.getCell("B4").value = 5000;
  moneyFmt(ws.getCell("B4"));
  copperInput(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_Expenses");

  labelCell(ws.getCell("A5"), "Personal pension contributions (GBP)");
  ws.getCell("B5").value = 10000;
  moneyFmt(ws.getCell("B5"));
  copperInput(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_Pension");

  // Student loan plan as a number code: 0=none, 1=plan1, 2=plan2, 4=plan4
  labelCell(ws.getCell("A6"), "Student loan plan (0=none, 1=Plan1, 2=Plan2, 4=Plan4)");
  ws.getCell("B6").value = 0; // default: none
  copperInput(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_StudentLoanPlan");

  // ---- Intermediate calculations ----
  // netIncome = grossIncome - expenses - pension
  labelCell(ws.getCell("A8"), "Net income after expenses and pension (GBP)");
  ws.getCell("B8").value = { formula: "MAX(0,In_GrossIncome-In_Expenses-In_Pension)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B8"));
  wb.definedNames.add("'Your figures'!$B$8", "NetIncome");

  // taxableIncome = MAX(0, netIncome - PA)
  labelCell(ws.getCell("A9"), "Taxable income after personal allowance (GBP)");
  ws.getCell("B9").value = { formula: "MAX(0,NetIncome-PA)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "TaxableIncome");

  // Income tax: basic + higher + additional (no PA taper: locum-tax.ts does not apply one)
  // basicBandIncome = MIN(taxable, BRL-PA)
  // higherBandIncome = MIN(MAX(0, taxable-(BRL-PA)), HRL-BRL)
  // additionalBandIncome = MAX(0, taxable-(HRL-PA))
  labelCell(ws.getCell("A10"), "Income tax (GBP)");
  ws.getCell("B10").value = {
    formula:
      "LET(t,TaxableIncome," +
      "basic,MIN(t,BRL-PA)," +
      "higher,IF(t>BRL-PA,MIN(t-(BRL-PA),HRL-BRL),0)," +
      "additional,IF(t>HRL-PA,t-(HRL-PA),0)," +
      "basic*0.2+higher*0.4+additional*0.45)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "IncomeTax");

  // Class 4 NIC: 6% between NI_LOWER and NI_UPPER, 2% above
  // Computed on netIncome (not taxableIncome): matches locum-tax.ts behaviour
  labelCell(ws.getCell("A11"), "Class 4 National Insurance (GBP)");
  ws.getCell("B11").value = {
    formula:
      "IF(NetIncome<=NI_LOWER,0," +
      "(MIN(NetIncome,NI_UPPER)-NI_LOWER)*C4_MAIN+" +
      "MAX(0,NetIncome-NI_UPPER)*C4_UPPER_RATE)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "Class4");

  // Student loan repayment:
  // Plan 0 (none): 0
  // Plan 1: MAX(0, netIncome - SL_PLAN1) * 0.09
  // Plan 2: MAX(0, netIncome - SL_PLAN2) * 0.09
  // Plan 4: MAX(0, netIncome - SL_PLAN4) * 0.09
  labelCell(ws.getCell("A12"), "Student loan repayment (GBP)");
  ws.getCell("B12").value = {
    formula:
      "IF(In_StudentLoanPlan=0,0," +
      "IF(In_StudentLoanPlan=1,MAX(0,NetIncome-SL_PLAN1)*SL_RATE," +
      "IF(In_StudentLoanPlan=2,MAX(0,NetIncome-SL_PLAN2)*SL_RATE," +
      "IF(In_StudentLoanPlan=4,MAX(0,NetIncome-SL_PLAN4)*SL_RATE,0))))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "StudentLoan");

  // Total deductions
  labelCell(ws.getCell("A13"), "Total deductions (GBP)");
  ws.getCell("B13").value = { formula: "IncomeTax+Class4+StudentLoan" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  ws.getCell("B13").font = { bold: true };
  ws.getCell("A13").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$13", "TotalDeductions");

  // Net take-home
  labelCell(ws.getCell("A14"), "Net take-home pay (GBP)");
  ws.getCell("B14").value = { formula: "NetIncome-TotalDeductions" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  ws.getCell("B14").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("A14").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$14", "NetTakeHome");

  // Effective rate
  labelCell(ws.getCell("A15"), "Effective deduction rate");
  ws.getCell("B15").value = { formula: "IF(NetIncome>0,TotalDeductions/NetIncome,0)" } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B15"));

  // Conservation check: takeHome + totalDeductions = netIncome
  labelCell(ws.getCell("A17"), "Check: take-home + deductions = net income");
  ws.getCell("B17").value = {
    formula: 'IF(ABS(NetTakeHome+TotalDeductions-NetIncome)<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;

  // ---- Results panel (right side D/E columns) ----
  copperHeader(ws.getCell("D1"), "Summary");
  ws.mergeCells("D1:E1");

  const results: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Gross income", formula: "In_GrossIncome" },
    { row: 4, label: "Expenses", formula: "In_Expenses" },
    { row: 5, label: "Pension contributions", formula: "In_Pension" },
    { row: 6, label: "Net income", formula: "NetIncome", strong: true },
    { row: 8, label: "Income tax", formula: "IncomeTax" },
    { row: 9, label: "Class 4 NIC", formula: "Class4" },
    { row: 10, label: "Student loan", formula: "StudentLoan" },
    { row: 11, label: "Total deductions", formula: "TotalDeductions", strong: true },
    { row: 13, label: "Net take-home", formula: "NetTakeHome", strong: true },
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
    properties: { tabColor: { argb: COPPER } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Doctor take-home pay model", true],
    ["Medical Accountants UK", false],
    ["", false],
    ["This model shows your estimated take-home pay as a locum or self-employed", false],
    ["doctor, after income tax, Class 4 NIC and student loan, based on 2025/26 rates.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells: gross income, expenses, pension, student loan plan.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["Student loan plan: enter 0 for none, 1 for Plan 1, 2 for Plan 2, 4 for Plan 4.", false],
    ["", false],
    ["Class 4 NIC rate: 6% between 12,570 and 50,270, 2% above. Class 2 is no longer", false],
    ["a required payment from 6 April 2024.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2025/26 rates. Do not edit it.", false],
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
    "2025/26 rates: personal allowance GBP12,570; basic rate 20% to GBP50,270;",
    "higher rate 40% to GBP125,140; additional rate 45% above.",
    "",
    "Class 4 NIC: 6% on profits between GBP12,570 and GBP50,270, 2% above.",
    "Class 2 NIC: removed as a required payment from 6 April 2024 and is NOT included.",
    "",
    "This model covers self-employed and locum income (sole trader or PSC/outside-IR35).",
    "A salaried GP is taxed under PAYE with Class 1 NIC, not Class 4.",
    "Use this model for the self-employed portion only; PAYE income uses your allowance",
    "and basic-rate band first.",
    "",
    "Student loan thresholds (2025/26): Plan 1 GBP26,065; Plan 2 GBP28,470; Plan 4 GBP32,745.",
    "All repaid at 9% on income above the threshold.",
    "",
    "MTD for ITSA: if gross self-employed income is over GBP50,000 you are in Making Tax",
    "Digital from 6 April 2026.",
    "",
    "This is a directional model. Your actual position depends on marriage allowance,",
    "other income, IR35 status and NHS pension deductions. Speak to a specialist.",
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

// Suppress unused import warning
void copperHeader;
