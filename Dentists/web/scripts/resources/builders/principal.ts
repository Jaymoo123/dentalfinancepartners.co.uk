/**
 * Principal profit-extraction Excel model builder for Dental Finance Partners.
 *
 * Produces a workbook with live formulas tracing calcPrincipalExtraction() from
 * src/lib/tools/compute/principal-extraction.ts. Side-by-side partnership vs
 * limited company comparison.
 *
 * Golden case (brief §4.1, compute lib defaults):
 *   profit=120000, nhsActive=true, pensionContrib=0
 *   -> partnership.net=76489, partnership.tax=43511
 *   -> ltd.net=72279.37, ltd.tax=47720.63
 *
 * Note on constants:
 *   - EMPLOYEE_NI_BASIC 8% (not the usual 12%) as per compute lib line 33.
 *   - EMPLOYER_NI 15%, NI_SECONDARY GBP5,000 (Apr 2025 change).
 *   - DIVIDEND_BASIC 10.75%, DIVIDEND_HIGHER 35.75% (FA 2026 s.4 from Apr 2026).
 *   - LTD_ADMIN_COST GBP2,500 (principal; different from locum's GBP1,800).
 *   - No Employment Allowance (single-director restriction).
 */
import ExcelJS from "exceljs";

const NAVY = "FF001b3d";
const GOLD = "FFb8975d";
const GOLD_LIGHT = "FFF5EDD8";
const WHITE = "FFFFFFFF";
const INK = "FF1A1A2E";

// ---- Locked constants from principal-extraction.ts ----
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_LOWER_RATE = 0.06;
const CLASS4_UPPER_RATE = 0.02;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const NI_PRIMARY = 12570;
const NI_SECONDARY = 5000;
const EMPLOYEE_NI_BASIC = 0.08;
const EMPLOYER_NI = 0.15;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_THRESHOLD = 250000;
const CT_MAIN_RATE = 0.25;
const CT_SMALL_RATE = 0.19;
const CLASS2_WEEKLY = 3.45;
const CLASS2_THRESHOLD = 6725;
const LTD_ADMIN_COST = 2500;
const LTD_SALARY = 12570;

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
  navyHeader(rates.getCell("A1"), "Locked rates: do not edit (2026/27)");
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
    { name: "Class4LowerRate", label: "Class 4 NI: main rate", value: CLASS4_LOWER_RATE, pct: true },
    { name: "Class4UpperRate", label: "Class 4 NI: upper rate", value: CLASS4_UPPER_RATE, pct: true },
    { name: "NiPrimary", label: "Employee NI: primary threshold (GBP)", value: NI_PRIMARY },
    { name: "NiSecondary", label: "Employer NI: secondary threshold (GBP)", value: NI_SECONDARY },
    { name: "EmployeeNiRate", label: "Employee NI: main rate", value: EMPLOYEE_NI_BASIC, pct: true },
    { name: "EmployerNiRate", label: "Employer NI: rate (15% from Apr 2025)", value: EMPLOYER_NI, pct: true },
    { name: "DivAllowance", label: "Dividend allowance (GBP)", value: DIVIDEND_ALLOWANCE },
    { name: "DivBasic", label: "Dividend tax: basic rate (FA 2026)", value: DIVIDEND_BASIC, pct: true },
    { name: "DivHigher", label: "Dividend tax: higher rate (FA 2026)", value: DIVIDEND_HIGHER, pct: true },
    { name: "DivAdditional", label: "Dividend tax: additional rate (FA 2026)", value: DIVIDEND_ADDITIONAL, pct: true },
    { name: "CtSmallRate", label: "Corporation Tax: small profits rate", value: CT_SMALL_RATE, pct: true },
    { name: "CtMainRate", label: "Corporation Tax: main rate", value: CT_MAIN_RATE, pct: true },
    { name: "CtSmallThresh", label: "Corporation Tax: small profits limit (GBP)", value: CT_SMALL_THRESHOLD },
    { name: "CtMainThresh", label: "Corporation Tax: main rate lower limit (GBP)", value: CT_MAIN_THRESHOLD },
    { name: "Class2Weekly", label: "Class 2 NI: weekly amount (GBP)", value: CLASS2_WEEKLY },
    { name: "Class2Threshold", label: "Class 2 NI: small profits threshold (GBP)", value: CLASS2_THRESHOLD },
    { name: "LtdSalary", label: "Ltd: director salary (GBP)", value: LTD_SALARY },
    { name: "LtdAdminCost", label: "Ltd: estimated admin cost (GBP)", value: LTD_ADMIN_COST },
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
    { key: "a", width: 36 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 36 },
    { key: "e", width: 20 },
    { key: "f", width: 4 },
    { key: "g", width: 36 },
    { key: "h", width: 20 },
  ];

  navyHeader(ws.getCell("A1"), "Inputs: edit the highlighted cells");
  ws.mergeCells("A1:B1");

  // Inputs
  const inputs: Array<{ row: number; label: string; value: number | string; name: string; dropdown?: string[] }> = [
    { row: 3, label: "Practice profit (GBP)", value: 120000, name: "In_Profit" },
    { row: 4, label: "NHS Pension contribution (GBP)", value: 0, name: "In_Pension" },
  ];
  for (const inp of inputs) {
    labelCell(ws.getCell(`A${inp.row}`), inp.label);
    const c = ws.getCell(`B${inp.row}`);
    c.value = inp.value as number;
    moneyFmt(c);
    goldInput(c);
    wb.definedNames.add(`'Your figures'!$B$${inp.row}`, inp.name);
  }

  // ---- Partnership column (D/E) ----
  goldHeader(ws.getCell("D1"), "Partnership / sole trader");
  ws.mergeCells("D1:E1");

  // Partnership income tax (on profit - pension)
  labelCell(ws.getCell("D3"), "Taxable profit");
  ws.getCell("E3").value = { formula: "MAX(0,In_Profit-In_Pension)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E3"));
  wb.definedNames.add("'Your figures'!$E$3", "P_TaxableProfit");

  labelCell(ws.getCell("D4"), "Income tax");
  ws.getCell("E4").value = {
    formula:
      "LET(tp,P_TaxableProfit,pa,IF(tp>100000,MAX(0,PA-(tp-100000)/2),PA),t,MAX(0,tp-pa)," +
      "basic,MIN(t,BasicLimit-PA)," +
      "higher,MAX(0,MIN(t-basic,HigherLimit-BasicLimit))," +
      "additional,MAX(0,t-basic-higher)," +
      "basic*IncomeBasic+higher*IncomeHigher+additional*IncomeAdditional)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E4"));
  wb.definedNames.add("'Your figures'!$E$4", "P_IncomeTax");

  labelCell(ws.getCell("D5"), "Class 4 NI");
  ws.getCell("E5").value = {
    formula:
      "IF(P_TaxableProfit<=Class4Lower,0," +
      "(MIN(P_TaxableProfit,Class4Upper)-Class4Lower)*Class4LowerRate+" +
      "MAX(0,P_TaxableProfit-Class4Upper)*Class4UpperRate)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E5"));
  wb.definedNames.add("'Your figures'!$E$5", "P_Class4");

  labelCell(ws.getCell("D6"), "Class 2 NI");
  ws.getCell("E6").value = { formula: "IF(In_Profit>Class2Threshold,52*Class2Weekly,0)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E6"));
  wb.definedNames.add("'Your figures'!$E$6", "P_Class2");

  labelCell(ws.getCell("D7"), "Total tax and NI");
  ws.getCell("E7").value = { formula: "P_IncomeTax+P_Class4+P_Class2" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E7"));
  ws.getCell("E7").font = { bold: true };
  ws.getCell("D7").font = { bold: true };
  wb.definedNames.add("'Your figures'!$E$7", "P_TotalTax");

  labelCell(ws.getCell("D8"), "Net in pocket (incl pension)");
  // partnership.net = partnershipNet + pensionContrib; partnershipNet = profit - tax
  ws.getCell("E8").value = { formula: "In_Profit-P_TotalTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E8"));
  ws.getCell("E8").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("D8").font = { bold: true, color: { argb: NAVY } };
  wb.definedNames.add("'Your figures'!$E$8", "P_Net");

  // ---- Limited company column (G/H) ----
  navyHeader(ws.getCell("G1"), "Limited company (salary + dividends)");
  ws.mergeCells("G1:H1");

  // Ltd: salary is LtdSalary, employer NI above secondary threshold
  labelCell(ws.getCell("G3"), "Director salary");
  ws.getCell("H3").value = { formula: "LtdSalary" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H3"));
  wb.definedNames.add("'Your figures'!$H$3", "L_Salary");

  labelCell(ws.getCell("G4"), "Employer NI");
  ws.getCell("H4").value = { formula: "MAX(0,(L_Salary-NiSecondary)*EmployerNiRate)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H4"));
  wb.definedNames.add("'Your figures'!$H$4", "L_EmployerNi");

  labelCell(ws.getCell("G5"), "Profit after salary + NI");
  ws.getCell("H5").value = { formula: "MAX(0,In_Profit-L_Salary-L_EmployerNi-In_Pension)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H5"));
  wb.definedNames.add("'Your figures'!$H$5", "L_ProfitAfterSalary");

  // Corporation tax (marginal formula matching compute lib)
  labelCell(ws.getCell("G6"), "Corporation Tax");
  ws.getCell("H6").value = {
    formula:
      "IF(L_ProfitAfterSalary<=0,0," +
      "IF(L_ProfitAfterSalary<=CtSmallThresh,L_ProfitAfterSalary*CtSmallRate," +
      "IF(L_ProfitAfterSalary>=CtMainThresh,L_ProfitAfterSalary*CtMainRate," +
      "CtSmallThresh*CtSmallRate+(L_ProfitAfterSalary-CtSmallThresh)*0.265)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H6"));
  wb.definedNames.add("'Your figures'!$H$6", "L_CorpTax");

  labelCell(ws.getCell("G7"), "Dividend paid");
  ws.getCell("H7").value = { formula: "MAX(0,L_ProfitAfterSalary-L_CorpTax)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H7"));
  wb.definedNames.add("'Your figures'!$H$7", "L_Dividend");

  // Employee NI on salary (8% on band, 2% above UEL per compute lib)
  labelCell(ws.getCell("G8"), "Employee NI on salary");
  ws.getCell("H8").value = {
    formula:
      "IF(L_Salary<=NiPrimary,0," +
      "(MIN(L_Salary,50270)-NiPrimary)*EmployeeNiRate+" +
      "MAX(0,L_Salary-50270)*0.02)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H8"));
  wb.definedNames.add("'Your figures'!$H$8", "L_EmployeeNi");

  // Income tax on salary
  labelCell(ws.getCell("G9"), "Income tax on salary");
  ws.getCell("H9").value = {
    formula:
      "LET(sal,L_Salary,pa,IF(sal>100000,MAX(0,PA-(sal-100000)/2),PA),t,MAX(0,sal-pa)," +
      "basic,MIN(t,BasicLimit-PA)," +
      "higher,MAX(0,MIN(t-basic,HigherLimit-BasicLimit))," +
      "additional,MAX(0,t-basic-higher)," +
      "basic*IncomeBasic+higher*IncomeHigher+additional*IncomeAdditional)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H9"));
  wb.definedNames.add("'Your figures'!$H$9", "L_SalaryTax");

  // Dividend tax (matches calcDividendTax from compute lib)
  labelCell(ws.getCell("G10"), "Dividend tax");
  ws.getCell("H10").value = {
    formula:
      "IF(L_Dividend<=0,0,LET(sal,L_Salary,div,L_Dividend,pa,IF(sal+div>100000,MAX(0,PA-(sal+div-100000)/2),PA)," +
      "paUsedBySal,MIN(sal,pa),paLeft,MAX(0,pa-paUsedBySal)," +
      "taxableDiv,MAX(0,div-paLeft-DivAllowance)," +
      "basicBand,BasicLimit-PA,higherBand,HigherLimit-BasicLimit," +
      "salInBasic,MIN(MAX(0,sal-pa),basicBand)," +
      "salInHigher,MIN(MAX(0,sal-pa-salInBasic),higherBand)," +
      "remBasic,MAX(0,basicBand-salInBasic)," +
      "remHigher,MAX(0,higherBand-salInHigher)," +
      "inBasic,MIN(taxableDiv,remBasic)," +
      "inHigher,MIN(taxableDiv-inBasic,remHigher)," +
      "inAdd,MAX(0,taxableDiv-inBasic-inHigher)," +
      "inBasic*DivBasic+inHigher*DivHigher+inAdd*DivAdditional))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H10"));
  wb.definedNames.add("'Your figures'!$H$10", "L_DivTax");

  // Admin cost
  labelCell(ws.getCell("G11"), "Ltd admin cost");
  ws.getCell("H11").value = { formula: "LtdAdminCost" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H11"));
  wb.definedNames.add("'Your figures'!$H$11", "L_AdminCost");

  // Total ltd tax (matches compute lib: salary tax + employee NI + employer NI + CT + div tax + admin)
  labelCell(ws.getCell("G12"), "Total tax + NI + costs");
  ws.getCell("H12").value = { formula: "L_SalaryTax+L_EmployeeNi+L_EmployerNi+L_CorpTax+L_DivTax+L_AdminCost" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H12"));
  ws.getCell("H12").font = { bold: true };
  ws.getCell("G12").font = { bold: true };
  wb.definedNames.add("'Your figures'!$H$12", "L_TotalCost");

  // Ltd net: salary - tax - employee NI + (dividend - div tax) - admin + pension
  // Matches: ltdNet = ltdSalary - ltdSalaryTax - ltdEmployeeNi + (ltdDividend - ltdDividendTax) - LTD_ADMIN_COST + pensionContrib
  labelCell(ws.getCell("G13"), "Net in pocket (incl pension)");
  ws.getCell("H13").value = {
    formula: "L_Salary-L_SalaryTax-L_EmployeeNi+(L_Dividend-L_DivTax)-L_AdminCost+In_Pension",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H13"));
  ws.getCell("H13").font = { bold: true, color: { argb: NAVY } };
  ws.getCell("G13").font = { bold: true, color: { argb: NAVY } };
  wb.definedNames.add("'Your figures'!$H$13", "L_Net");

  // Advantage row
  labelCell(ws.getCell("G15"), "Partnership advantage over ltd");
  ws.getCell("H15").value = { formula: "P_Net-L_Net" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("H15"));
  ws.getCell("G15").font = { bold: true };

  // Conservation checks
  labelCell(ws.getCell("A10"), "Partnership check: net+tax=profit");
  ws.getCell("B10").value = { formula: "IF(ABS(P_Net+P_TotalTax-In_Profit)<0.1,\"OK\",\"ERROR\")" } as ExcelJS.CellFormulaValue;
  labelCell(ws.getCell("A11"), "Ltd check: net+totalcost=profit");
  ws.getCell("B11").value = { formula: "IF(ABS(L_Net+L_TotalCost-In_Profit)<0.1,\"OK\",\"ERROR\")" } as ExcelJS.CellFormulaValue;

  // ---- Start here sheet ----
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: GOLD } },
  });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Principal profit extraction model", true],
    ["Dental Finance Partners", false],
    ["", false],
    ["This model compares extracting practice profit as a sole trader or partnership", false],
    ["versus through a limited company (salary plus dividends) for 2026/27.", false],
    ["", false],
    ["How to use:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit the highlighted cells: profit and pension contribution.", false],
    ["3. The partnership and limited company columns recalculate automatically.", false],
    ["", false],
    ["The 'Rates' tab holds locked 2026/27 rates. Do not edit it.", false],
    ["NHS Pension note: incorporating typically means dividends are not pensionable.", false],
    ["The model does not quantify lost NHS Pension accrual. See 'Notes'.", false],
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
    "2026/27 rates. Employer NIC 15% above GBP5,000 secondary threshold.",
    "Dividend tax: 10.75% basic, 35.75% higher, 39.35% additional (FA 2026).",
    "Dividend allowance GBP500. CT marginal fraction 0.265.",
    "",
    "Ltd model: director salary GBP12,570, full distributable profit as dividend.",
    "No Employment Allowance (single-director restriction). Admin cost GBP2,500.",
    "",
    "Partnership model: sole trader or single principal, no Class 1 NI on profit.",
    "Class 2 NI at GBP3.45/week if profit above GBP6,725.",
    "",
    "NHS Pension: the model does not quantify the accrual you would lose on",
    "incorporation. Over a 10 to 15 year run to retirement, that lost accrual",
    "can outweigh the headline tax saving. Take specialist advice.",
    "",
    "This is a directional model. Speak to a specialist before any restructuring decision.",
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
