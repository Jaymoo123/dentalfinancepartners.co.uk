/**
 * CIS refund and deduction workbook builder for Trade Tax Specialists (construction-cis).
 *
 * Produces a workbook with live formulas tracing cisDeduction() and saLiability()
 * from src/lib/calculators/cis-tax.ts. Constants are mirrored literally from the
 * compute lib with traced comments; the golden test (cis-refund.test.ts) is the
 * drift guard.
 *
 * Golden default (brief section 2):
 *   grossIncome=45000, materials=5000, registered (20%), expenses=4000, otherIncome=0
 *   -> deductionBase=40000, cisDeducted=8000, taxableProfit=36000,
 *      incomeTax=4686, class4=1405.80, totalLiability=6091.80, refund=1908.20
 *
 * LET-FREE formulas throughout (the Medical incorporation.ts lesson):
 *   LET() is Excel-365-only and renders #NAME? in older Excel and LibreOffice.
 *   All income-tax and NIC formulas use banded MIN/MAX/IF arithmetic instead.
 *
 * HP traces:
 *   CIS deduction on labour-only base (materials excluded) - HP section 1
 *   PA 12570, basic 20% to 50270, higher 40% above       - HP section 11a
 *   Class 4 NI 6% on 12570-50270, 2% above               - HP section 11a
 *   Refund entry service, not guaranteed amount           - HP section 9, 13
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
// CIS deduction rates (HP section 1)
const CIS_REGISTERED = 0.20;    // traced: CIS_RATES.registered
const CIS_UNREGISTERED = 0.30;  // traced: CIS_RATES.unregistered
// Income tax thresholds 2026/27 (HP section 11a)
const PA = 12570;                // traced: PERSONAL_ALLOWANCE
const BRL = 37700;               // traced: BASIC_RATE_LIMIT (band width: 50270-12570)
const UEL = 50270;               // traced: UEL (upper earnings limit)
// Class 4 NI rates 2026/27 (HP section 11a)
const C4_LOWER = 12570;          // traced: CLASS4_NI.lowerLimit
const C4_UPPER = 50270;          // traced: CLASS4_NI.upperLimit
const C4_MAIN = 0.06;            // traced: CLASS4_NI.main
const C4_UPPER_RATE = 0.02;      // traced: CLASS4_NI.upper
// Income tax rates
const IT_BASIC = 0.20;           // traced: INCOME_TAX_RATES.basic
const IT_HIGHER = 0.40;          // traced: INCOME_TAX_RATES.higher

// Suppress unused var warnings
void CIS_UNREGISTERED;
void UEL;

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

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "0.00%";
}

// Suppress unused
void pctFmt;

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Trade Tax Specialists";
  wb.lastModifiedBy = "Trade Tax Specialists";

  // ---- Rates sheet (locked) ----
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: SLATE } },
  });
  rates.columns = [
    { key: "label", width: 72 },
    { key: "value", width: 18 },
  ];
  slateHeader(rates.getCell("A1"), "Locked rates: do not edit (2026/27 basis, HP sections 1 and 11a)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "PA", label: "Income tax: personal allowance (GBP, 2026/27, HP section 11a)", value: PA },
    { name: "BRL", label: "Income tax: basic rate band width (GBP, 20% on first 37700 above PA)", value: BRL },
    { name: "UEL", label: "Upper earnings limit (GBP, higher rate above PA+BRL = 50270)", value: UEL },
    { name: "IT_BASIC", label: "Income tax: basic rate 20% (2026/27, HP section 11a)", value: IT_BASIC, pct: true },
    { name: "IT_HIGHER", label: "Income tax: higher rate 40% (2026/27, HP section 11a)", value: IT_HIGHER, pct: true },
    { name: "C4_LOWER", label: "Class 4 NI: lower profits limit (GBP, 2026/27, HP section 11a)", value: C4_LOWER },
    { name: "C4_UPPER_LIM", label: "Class 4 NI: upper profits limit (GBP, 2026/27, HP section 11a)", value: C4_UPPER },
    { name: "C4_MAIN", label: "Class 4 NI: main rate 6% on C4_LOWER to C4_UPPER_LIM (2026/27, HP section 11a)", value: C4_MAIN, pct: true },
    { name: "C4_UPPER_RATE", label: "Class 4 NI: upper rate 2% above C4_UPPER_LIM (2026/27, HP section 11a)", value: C4_UPPER_RATE, pct: true },
    { name: "CIS_REGISTERED", label: "CIS deduction rate: registered subcontractor 20% (HP section 1)", value: CIS_REGISTERED, pct: true },
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
    { key: "a", width: 50 },
    { key: "b", width: 18 },
  ];

  slateHeader(ws.getCell("A1"), "Your figures: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // ---- Inputs ----
  labelCell(ws.getCell("A3"), "Gross CIS labour income for the year (GBP)");
  ws.getCell("B3").value = 45000;
  moneyFmt(ws.getCell("B3"));
  inputCell(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "In_GrossIncome");

  labelCell(ws.getCell("A4"), "Materials included in CIS payments (excluded from deduction base, HP section 1, GBP)");
  ws.getCell("B4").value = 5000;
  moneyFmt(ws.getCell("B4"));
  inputCell(ws.getCell("B4"));
  wb.definedNames.add("'Your figures'!$B$4", "In_Materials");

  labelCell(ws.getCell("A5"), "CIS deduction rate (0 for GPS / 0.20 for registered / 0.30 for unregistered)");
  ws.getCell("B5").value = 0.20;
  ws.getCell("B5").numFmt = "0%";
  inputCell(ws.getCell("B5"));
  wb.definedNames.add("'Your figures'!$B$5", "In_CisRate");

  labelCell(ws.getCell("A6"), "Allowable business expenses (mileage, tools, PPE, van costs, GBP)");
  ws.getCell("B6").value = 4000;
  moneyFmt(ws.getCell("B6"));
  inputCell(ws.getCell("B6"));
  wb.definedNames.add("'Your figures'!$B$6", "In_Expenses");

  labelCell(ws.getCell("A7"), "Other taxable income in the same year (GBP, leave 0 if CIS only)");
  ws.getCell("B7").value = 0;
  moneyFmt(ws.getCell("B7"));
  inputCell(ws.getCell("B7"));
  wb.definedNames.add("'Your figures'!$B$7", "In_OtherIncome");

  // ---- CIS deduction calculation ----
  slateHeader(ws.getCell("A9"), "CIS deduction (HP section 1: labour-only base, materials excluded)");
  ws.mergeCells("A9:B9");

  // deductionBase = max(0, grossIncome - materials)
  labelCell(ws.getCell("A10"), "Labour-only deduction base (gross less materials, GBP)");
  ws.getCell("B10").value = { formula: "MAX(0,In_GrossIncome-In_Materials)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "CIS_DeductionBase");

  // cisDeducted = deductionBase * rate
  labelCell(ws.getCell("A11"), "CIS deducted at source (deduction base x rate, GBP)");
  ws.getCell("B11").value = { formula: "CIS_DeductionBase*In_CisRate" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B11"));
  ws.getCell("B11").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$11", "CIS_Deducted");

  // ---- Self Assessment liability ----
  slateHeader(ws.getCell("A13"), "Self Assessment liability (HP sections 9 and 11a)");
  ws.mergeCells("A13:B13");

  // taxableProfit = max(0, deductionBase - expenses)
  labelCell(ws.getCell("A14"), "Taxable profit (labour base less expenses, GBP)");
  ws.getCell("B14").value = { formula: "MAX(0,CIS_DeductionBase-In_Expenses)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  wb.definedNames.add("'Your figures'!$B$14", "SA_TaxableProfit");

  // totalIncome = taxableProfit + otherIncome
  labelCell(ws.getCell("A15"), "Total taxable income (profit plus other income, GBP)");
  ws.getCell("B15").value = { formula: "SA_TaxableProfit+In_OtherIncome" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  wb.definedNames.add("'Your figures'!$B$15", "SA_TotalIncome");

  // taxableAfterPA = max(0, totalIncome - PA)
  // incomeTax = min(taxableAfterPA, BRL)*IT_BASIC + max(0, taxableAfterPA - BRL)*IT_HIGHER
  // LET-free banded formula (Medical incorporation.ts pattern, no LET())
  labelCell(ws.getCell("A16"), "Income tax (basic 20% on first 37700 above PA, higher 40% above, GBP)");
  ws.getCell("B16").value = {
    formula:
      "IF(SA_TotalIncome<=PA,0," +
      "MIN(SA_TotalIncome-PA,BRL)*IT_BASIC+" +
      "MAX(0,SA_TotalIncome-PA-BRL)*IT_HIGHER)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  wb.definedNames.add("'Your figures'!$B$16", "SA_IncomeTax");

  // Class 4 NI on taxableProfit: 6% on (C4_LOWER to C4_UPPER_LIM), 2% above
  // LET-free banded formula
  labelCell(ws.getCell("A17"), "Class 4 NI on CIS profit (6% on 12570-50270, 2% above, GBP, HP section 11a)");
  ws.getCell("B17").value = {
    formula:
      "IF(SA_TaxableProfit<=C4_LOWER,0," +
      "(MIN(SA_TaxableProfit,C4_UPPER_LIM)-C4_LOWER)*C4_MAIN+" +
      "MAX(0,SA_TaxableProfit-C4_UPPER_LIM)*C4_UPPER_RATE)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B17"));
  wb.definedNames.add("'Your figures'!$B$17", "SA_Class4Ni");

  // Total SA liability
  labelCell(ws.getCell("A18"), "Total Self Assessment liability (income tax + Class 4 NI, GBP)");
  ws.getCell("B18").value = { formula: "SA_IncomeTax+SA_Class4Ni" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B18"));
  ws.getCell("B18").font = { bold: true };
  ws.getCell("A18").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$18", "SA_TotalLiability");

  // ---- Refund or balance ----
  slateHeader(ws.getCell("A20"), "Refund or balance (HP sections 9 and 13)");
  ws.mergeCells("A20:B20");

  // refund = cisDeducted - totalLiability (positive = refund, negative = tax owed)
  labelCell(ws.getCell("A21"), "CIS refund or balance due (CIS deducted less SA liability, GBP)");
  ws.getCell("B21").value = { formula: "CIS_Deducted-SA_TotalLiability" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B21"));
  ws.getCell("B21").font = { bold: true, color: { argb: ORANGE } };
  ws.getCell("A21").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$21", "CIS_Refund");

  labelCell(ws.getCell("A22"), "Positive = refund owed to you. Negative = tax still to pay.");
  ws.getCell("A22").font = { italic: true, color: { argb: SLATE } };

  // Conservation check: cisDeducted - totalLiability = refund
  labelCell(ws.getCell("A24"), "Check: CIS_Deducted - SA_TotalLiability = CIS_Refund");
  ws.getCell("B24").value = {
    formula: 'IF(ABS(CIS_Refund-(CIS_Deducted-SA_TotalLiability))<0.01,"OK","ERROR")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$24", "ConservationCheck");

  // Disclaimer row
  labelCell(ws.getCell("A26"), "Typical CIS refund is GBP 2,000 to GBP 3,000 for registered subbies. This is for content only, not guaranteed (HP section 13).");
  ws.getCell("A26").font = { italic: true, color: { argb: SLATE } };
  ws.getCell("A26").alignment = { wrapText: true };
  ws.getRow(26).height = 28;

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: ORANGE } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["CIS refund and deduction model", true],
    ["Trade Tax Specialists", false],
    ["", false],
    ["This model estimates how much CIS has been deducted at source and how much you are", false],
    ["likely to get back via Self Assessment after expenses and your personal allowance.", false],
    ["2026/27 income tax and Class 4 NI rates. Labour-only deduction base (HP section 1).", false],
    ["", false],
    ["Why most registered subbies get a refund:", true],
    ["CIS is deducted from the labour element before any allowances or expenses.", false],
    ["So the deduction usually exceeds the actual tax and NI liability for the year.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells.", false],
    ["3. Every figure recalculates automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2026/27 rates. Do not edit it.", false],
    ["See 'Notes' for assumptions and limitations.", false],
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
    "CIS deduction base (HP section 1)",
    "CIS is deducted on the labour element of the payment only. Materials are excluded.",
    "A contractor paying GBP 600 labour and GBP 400 materials deducts CIS from the GBP 600.",
    "Entering the correct materials figure is the most important input in this model.",
    "",
    "Refund route",
    "Sole traders: claim the CIS refund via Self Assessment after the tax year ends.",
    "Limited companies: claim in-year via the Employer Payment Summary (HP section 9).",
    "",
    "Market average (HP section 13)",
    "The typical refund for a registered sole-trader subcontractor is GBP 2,000 to GBP 3,000.",
    "This is for content purposes only and is not guaranteed. Your actual refund depends on",
    "your gross income, materials, expenses, other income and the rate applied.",
    "",
    "Income tax: 2026/27 rates. PA GBP 12,570; basic 20% on next GBP 37,700; higher 40% above.",
    "Class 4 NI: 6% on profit between GBP 12,570 and GBP 50,270, 2% above.",
    "",
    "This is a directional estimate. Speak to a specialist for your exact position.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE } };
    if (i === 2 || i === 7 || i === 11) c.font = { bold: true, color: { argb: SLATE } };
  });

  // Tab order: Start here, Your figures, Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
