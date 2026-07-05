/**
 * Associate take-home Excel model builder for Dental Finance Partners.
 *
 * Produces a workbook with live formulas tracing calcAssociateTakeHome() from
 * src/lib/tools/compute/associate-take-home.ts. Imports the SAME hardcoded
 * constants that the compute lib uses, so the workbook and the on-site tool
 * always agree.
 *
 * Golden case (brief §4.1, compute lib defaults):
 *   grossFees=120000, associatePct=50, labPct=8, expenses=3000, pension=0
 *   -> netCash=41408, totalTax=10792, incomeTax=8312, class4=2300.6, class2=179.4
 *
 * Token note: workbook branded "Dental Finance Partners", navy/gold header ARGB
 * (navy #001b3d = ARGB FF001b3d, gold #b8975d = ARGB FFb8975d).
 * No em-dashes in any cell text.
 */
import ExcelJS from "exceljs";

// ---- Colours (Dental Finance Partners brand) ----
const NAVY = "FF001b3d"; // #001b3d
const GOLD = "FFb8975d"; // #b8975d
const GOLD_LIGHT = "FFF5EDD8"; // light gold tint for input cells
const WHITE = "FFFFFFFF";
const INK = "FF1A1A2E"; // near-black ink

// ---- Locked constants: sourced from associate-take-home.ts ----
// Income tax 2025/26 (compute lib uses 2025/26 rates)
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
// Class 4 NI
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_RATE_LOWER = 0.06;
const CLASS4_RATE_UPPER = 0.02;
// Class 2 NI (still payable in 2025/26 calculate year for this compute lib)
const CLASS2_WEEKLY = 3.45;
const CLASS2_THRESHOLD = 6725;

// ---- Shared style helpers ----
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
    { key: "label", width: 52 },
    { key: "value", width: 18 },
  ];
  navyHeader(rates.getCell("A1"), "Locked rates: do not edit (2025/26)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "PA", label: "Income tax: personal allowance (GBP)", value: PERSONAL_ALLOWANCE },
    { name: "BasicLimit", label: "Income tax: basic rate upper limit (GBP)", value: BASIC_RATE_LIMIT },
    { name: "HigherLimit", label: "Income tax: higher rate upper limit (GBP)", value: HIGHER_RATE_LIMIT },
    { name: "IncomeBasic", label: "Income tax: basic rate", value: INCOME_BASIC, pct: true },
    { name: "IncomeHigher", label: "Income tax: higher rate", value: INCOME_HIGHER, pct: true },
    { name: "IncomeAdditional", label: "Income tax: additional rate", value: INCOME_ADDITIONAL, pct: true },
    { name: "Class4Lower", label: "Class 4 NI: lower profits limit (GBP)", value: CLASS4_LOWER },
    { name: "Class4Upper", label: "Class 4 NI: upper profits limit (GBP)", value: CLASS4_UPPER },
    { name: "Class4RateLower", label: "Class 4 NI: main rate (below upper limit)", value: CLASS4_RATE_LOWER, pct: true },
    { name: "Class4RateUpper", label: "Class 4 NI: upper rate (above upper limit)", value: CLASS4_RATE_UPPER, pct: true },
    { name: "Class2Weekly", label: "Class 2 NI: weekly amount (GBP)", value: CLASS2_WEEKLY },
    { name: "Class2Threshold", label: "Class 2 NI: small profits threshold (GBP)", value: CLASS2_THRESHOLD },
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
    { key: "a", width: 44 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 38 },
    { key: "e", width: 20 },
  ];

  navyHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // ---- Inputs ----
  const inputs: Array<{ row: number; label: string; value: number; name: string }> = [
    { row: 3, label: "Gross fees (GBP)", value: 120000, name: "In_GrossFees" },
    { row: 4, label: "Associate percentage of fees (%)", value: 50, name: "In_AssocPct" },
    { row: 5, label: "Lab percentage of gross fees (%)", value: 8, name: "In_LabPct" },
    { row: 6, label: "Other expenses (GBP)", value: 3000, name: "In_Expenses" },
    { row: 7, label: "NHS Pension contribution (GBP)", value: 0, name: "In_Pension" },
  ];

  for (const inp of inputs) {
    labelCell(ws.getCell(`A${inp.row}`), inp.label);
    const c = ws.getCell(`B${inp.row}`);
    c.value = inp.value;
    if (inp.row === 4 || inp.row === 5) {
      c.numFmt = "0.00";
    } else {
      moneyFmt(c);
    }
    goldInput(c);
    wb.definedNames.add(`'Your figures'!$B$${inp.row}`, inp.name);
  }

  // ---- Intermediate calculations ----
  // Associate share of fees
  labelCell(ws.getCell("A9"), "Associate share of fees");
  ws.getCell("B9").value = { formula: "In_GrossFees*(In_AssocPct/100)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add("'Your figures'!$B$9", "AssocShare");

  // Lab deduction (lab% of gross, allocated to associate in proportion)
  labelCell(ws.getCell("A10"), "Lab deduction");
  ws.getCell("B10").value = { formula: "In_GrossFees*(In_LabPct/100)*(In_AssocPct/100)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "LabDeduct");

  // Profit before pension
  labelCell(ws.getCell("A11"), "Profit before pension");
  ws.getCell("B11").value = { formula: "MAX(0,AssocShare-LabDeduct-In_Expenses)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "ProfitBeforePension");

  // Taxable profit (after pension)
  labelCell(ws.getCell("A12"), "Taxable profit");
  ws.getCell("B12").value = { formula: "MAX(0,ProfitBeforePension-In_Pension)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add("'Your figures'!$B$12", "TaxableProfit");

  // Income tax: tapers PA above 100k, three bands
  // Note: PA taper starts at 100k, full PA = PERSONAL_ALLOWANCE. Matches calcIncomeTax().
  labelCell(ws.getCell("A13"), "Income tax");
  ws.getCell("B13").value = {
    formula:
      "LET(tp,TaxableProfit,pa,IF(tp>100000,MAX(0,PA-(tp-100000)/2),PA),t,MAX(0,tp-pa)," +
      "basic,MIN(t,BasicLimit-PA)," +
      "higher,MAX(0,MIN(t-basic,HigherLimit-BasicLimit))," +
      "additional,MAX(0,t-basic-higher)," +
      "basic*IncomeBasic+higher*IncomeHigher+additional*IncomeAdditional)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B13"));
  wb.definedNames.add("'Your figures'!$B$13", "IncomeTax");

  // Class 4 NI
  labelCell(ws.getCell("A14"), "Class 4 NI");
  ws.getCell("B14").value = {
    formula:
      "IF(TaxableProfit<=Class4Lower,0," +
      "(MIN(TaxableProfit,Class4Upper)-Class4Lower)*Class4RateLower+" +
      "MAX(0,TaxableProfit-Class4Upper)*Class4RateUpper)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  wb.definedNames.add("'Your figures'!$B$14", "Class4");

  // Class 2 NI
  labelCell(ws.getCell("A15"), "Class 2 NI");
  ws.getCell("B15").value = {
    formula: "IF(ProfitBeforePension>Class2Threshold,52*Class2Weekly,0)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "Class2");

  // Total tax
  labelCell(ws.getCell("A16"), "Total tax and NI");
  ws.getCell("B16").value = { formula: "IncomeTax+Class4+Class2" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  ws.getCell("B16").font = { bold: true };
  ws.getCell("A16").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$16", "TotalTax");

  // Net cash
  labelCell(ws.getCell("A17"), "Net cash in your pocket");
  ws.getCell("B17").value = { formula: "TaxableProfit-TotalTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  ws.getCell("B17").font = { bold: true };
  ws.getCell("A17").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$17", "NetCash");

  // Effective rate
  labelCell(ws.getCell("A18"), "Effective tax rate");
  ws.getCell("B18").value = {
    formula: "IF(ProfitBeforePension>0,TotalTax/ProfitBeforePension,0)",
  } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B18"));

  // Conservation check: net + total tax = taxable profit
  labelCell(ws.getCell("A20"), "Check: net + tax = taxable profit");
  ws.getCell("B20").value = { formula: "IF(ABS(NetCash+TotalTax-TaxableProfit)<0.01,\"OK\",\"ERROR\")" } as ExcelJS.CellFormulaValue;

  // ---- Results panel (right side) ----
  goldHeader(ws.getCell("D1"), "Summary");
  ws.mergeCells("D1:E1");

  const results: Array<{ row: number; label: string; formula: string; strong?: boolean }> = [
    { row: 3, label: "Gross fees", formula: "In_GrossFees" },
    { row: 4, label: "Associate share", formula: "AssocShare" },
    { row: 5, label: "Lab deduction", formula: "LabDeduct" },
    { row: 6, label: "Expenses", formula: "In_Expenses" },
    { row: 7, label: "NHS Pension", formula: "In_Pension" },
    { row: 8, label: "Taxable profit", formula: "TaxableProfit", strong: true },
    { row: 10, label: "Income tax", formula: "IncomeTax" },
    { row: 11, label: "Class 4 NI", formula: "Class4" },
    { row: 12, label: "Class 2 NI", formula: "Class2" },
    { row: 13, label: "Total tax and NI", formula: "TotalTax", strong: true },
    { row: 15, label: "Net cash", formula: "NetCash", strong: true },
  ];

  for (const r of results) {
    labelCell(ws.getCell(`D${r.row}`), r.label);
    if (r.strong) {
      ws.getCell(`D${r.row}`).font = { bold: true, color: { argb: NAVY } };
    }
    const c = ws.getCell(`E${r.row}`);
    c.value = { formula: r.formula } as ExcelJS.CellFormulaValue;
    moneyFmt(c);
    if (r.strong) {
      c.font = { bold: true, color: { argb: NAVY } };
    }
  }

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: GOLD } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Associate and locum take-home model", true],
    ["Dental Finance Partners", false],
    ["", false],
    ["This model shows your estimated take-home pay as a dental associate or locum,", false],
    ["after income tax, Class 4 NI and Class 2 NI, based on 2025/26 rates.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells: fees, percentages, expenses, pension.", false],
    ["3. Every figure recalculates automatically.", false],
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
    "2025/26 rates: income tax personal allowance GBP12,570; basic rate 20% to GBP50,270;",
    "higher rate 40% to GBP125,140; additional rate 45% above.",
    "",
    "Class 4 NI: 6% between GBP12,570 and GBP50,270, 2% above.",
    "Class 2 NI: GBP3.45/week (52 weeks) if profit exceeds the GBP6,725 small profits threshold.",
    "",
    "Lab deduction: calculated as lab% of gross fees, then scaled by the associate percentage.",
    "This matches the calcAssociateTakeHome() formula in the site calculator.",
    "",
    "NHS Pension: treated as deductible from taxable profit (practitioner arrangement).",
    "It reduces both income tax and Class 4 NI. Class 2 is based on profit before pension.",
    "",
    "This is a directional model. Your actual position depends on student loan repayments,",
    "Marriage Allowance, other income, and local NHS Pension tier. Speak to a specialist.",
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
void pctFmt;
