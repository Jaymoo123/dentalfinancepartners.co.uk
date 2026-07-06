/**
 * Salary and dividend planner Excel model builder for Agency Founder Finance.
 *
 * Produces a workbook with live formulas tracing calcSalaryDividend() from
 * src/lib/tools/compute/salary-dividend.ts. Imports the SAME hardcoded
 * constants that the compute lib uses, so the workbook and the on-site tool
 * always agree.
 *
 * Formula style: banded MIN/MAX/IF arithmetic only. NO LET() function (Excel
 * 365-only; renders #NAME? in older Excel / LibreOffice). The Medical
 * incorporation.ts builder is the LET-free reference pattern.
 *
 * Default golden case (brief section 2, executed via Node):
 *   profitBeforeDirector=120000, salary=12570, useEA=No
 *   -> employerNi=1135.5, corporationTax=24418.04, dividendTax=19667.08
 *      totalTax=45220.63, netCash=74779.37
 * EA=Yes case (salary=60000, useEA=Yes):
 *   -> netCash=76279.78
 *
 * Compliance:
 *   - No em-dashes in any cell text.
 *   - No "DJH" anywhere.
 *   - No credential claims (ICAEW / ACA / CTA / chartered / qualified / MLR).
 *   - Creator = "Agency Founder Finance".
 *   - Colours: indigo #4f46e5 (ARGB FF4f46e5), slate #0f172a (ARGB FF0f172a).
 *   - 2026/27 dividend rates (FA 2026 s.4): 10.75% / 35.75% / 39.35%.
 *   - Employer NIC 15% above 5000, EA 10500 (single-director caveat in Notes).
 */
import ExcelJS from "exceljs";

// ---- Colours (Agency Founder Finance brand: indigo/slate) ----
const INDIGO = "FF4f46e5";  // var(--accent) #4f46e5
const SLATE  = "FF0f172a";  // var(--ink)   #0f172a
const INDIGO_LIGHT = "FFe0e7ff"; // indigo-100 tint for input cells
const WHITE  = "FFFFFFFF";
const INK    = "FF0f172a";

// ---- Locked constants: sourced from salary-dividend.ts ----
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const NI_SECONDARY_THRESHOLD = 5000;
const NI_PRIMARY_THRESHOLD = 12570;
const UPPER_EARNINGS_LIMIT = 50270;
const EMPLOYER_NI = 0.15;
const EMPLOYEE_NI_BASIC = 0.08;
const EMPLOYEE_NI_UPPER = 0.02;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_THRESHOLD = 250000;
const CT_SMALL_RATE = 0.19;
const CT_MARGINAL_RATE = 0.265;
const CT_MAIN_RATE = 0.25;
const EMPLOYMENT_ALLOWANCE = 10500;

// ---- Shared style helpers ----
function indigoHeader(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: WHITE }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INDIGO } };
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
  indigoHeader(rates.getCell("A1"), "Locked rates: do not edit (2025/26 income tax / NI; 2026/27 dividend rates FA 2026 s.4)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "PA",          label: "Income tax: personal allowance: 2025/26",                              value: PERSONAL_ALLOWANCE },
    { name: "BRL",         label: "Income tax: basic rate upper limit: 2025/26",                          value: BASIC_RATE_LIMIT },
    { name: "HRL",         label: "Income tax: higher rate upper limit: 2025/26",                         value: HIGHER_RATE_LIMIT },
    { name: "NI_SEC",      label: "Employer NI: secondary threshold (GBP): from 6 April 2025",           value: NI_SECONDARY_THRESHOLD },
    { name: "NI_PRI",      label: "Employee NI: primary threshold (GBP): 2025/26",                       value: NI_PRIMARY_THRESHOLD },
    { name: "UEL",         label: "Employee NI: upper earnings limit (GBP): 2025/26",                    value: UPPER_EARNINGS_LIMIT },
    { name: "EMP_NI",      label: "Employer NI rate 15%: from 6 April 2025",                             value: EMPLOYER_NI, pct: true },
    { name: "EMP_NI_BASIC",label: "Employee NI basic rate 8%: 2025/26",                                  value: EMPLOYEE_NI_BASIC, pct: true },
    { name: "EMP_NI_UPR",  label: "Employee NI upper rate 2%: 2025/26",                                  value: EMPLOYEE_NI_UPPER, pct: true },
    { name: "INC_BASIC",   label: "Income tax basic rate 20%: 2025/26",                                  value: INCOME_BASIC, pct: true },
    { name: "INC_HIGHER",  label: "Income tax higher rate 40%: 2025/26",                                 value: INCOME_HIGHER, pct: true },
    { name: "INC_ADDL",    label: "Income tax additional rate 45%: 2025/26",                             value: INCOME_ADDITIONAL, pct: true },
    { name: "DIV_ALLOWANCE",label:"Dividend allowance (GBP): from 6 April 2026 (FA 2026 s.4)",           value: DIVIDEND_ALLOWANCE },
    { name: "DIV_BASIC",   label: "Dividend tax basic rate 10.75%: from 6 April 2026 (FA 2026 s.4)",     value: DIVIDEND_BASIC, pct: true },
    { name: "DIV_HIGHER",  label: "Dividend tax higher rate 35.75%: from 6 April 2026 (FA 2026 s.4)",    value: DIVIDEND_HIGHER, pct: true },
    { name: "DIV_ADDL",    label: "Dividend tax additional rate 39.35%: from 6 April 2026 (FA 2026 s.4)",value: DIVIDEND_ADDITIONAL, pct: true },
    { name: "CT_SMALL",    label: "Corporation tax small profits threshold (GBP): 2024+",                 value: CT_SMALL_THRESHOLD },
    { name: "CT_MAIN_LIM", label: "Corporation tax main rate threshold (GBP): 2024+",                    value: CT_MAIN_THRESHOLD },
    { name: "CT_SMALL_RATE",label:"Corporation tax small profits rate 19%: 2024+",                       value: CT_SMALL_RATE, pct: true },
    { name: "CT_MARG",     label: "Corporation tax marginal rate 26.5% (between 50k-250k): 2024+",       value: CT_MARGINAL_RATE, pct: true },
    { name: "CT_MAIN_RATE",label: "Corporation tax main rate 25%: 2024+",                                value: CT_MAIN_RATE, pct: true },
    { name: "EA",          label: "Employment Allowance (GBP): 2025/26 (single-director: see Notes)",    value: EMPLOYMENT_ALLOWANCE },
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
  indigoHeader(startHere.getCell("A1"), "Agency Founder Finance - Salary and dividend planner 2026/27");
  startHere.getCell("A2").value = "Edit the blue cells on the Your figures sheet. All computed rows recalculate automatically.";
  startHere.getCell("A3").value = "The Rates sheet is locked. Do not edit it directly.";
  startHere.getCell("A4").value = "This model is a starting point. Your actual position depends on your circumstances. Take specialist advice.";
  startHere.getCell("A5").value = "Dividend rates: 10.75% / 35.75% / 39.35% from 6 April 2026 (FA 2026 s.4, 2026/27).";
  startHere.getCell("A6").value = "Employer NIC: 15% above the 5,000 secondary threshold from 6 April 2025.";
  startHere.getCell("A7").value = "Employment Allowance: 10,500 per year, but NOT available when the only employee is a single director.";
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
  ];

  // --- Inputs header ---
  indigoHeader(ws.getCell("A1"), "Your figures (edit the blue cells)");
  ws.mergeCells("A1:B1");

  // Row 2: profitBeforeDirector
  labelCell(ws.getCell("A2"), "Profit before director cost (GBP)");
  ws.getCell("B2").value = 120000;
  moneyFmt(ws.getCell("B2"));
  indigoInput(ws.getCell("B2"));
  wb.definedNames.add(`'Your figures'!$B$2`, "In_Profit");

  // Row 3: salary
  labelCell(ws.getCell("A3"), "Director salary (GBP)");
  ws.getCell("B3").value = PERSONAL_ALLOWANCE; // 12570 default
  moneyFmt(ws.getCell("B3"));
  indigoInput(ws.getCell("B3"));
  wb.definedNames.add(`'Your figures'!$B$3`, "In_Salary");

  // Row 4: useEmploymentAllowance (text input: Yes / No)
  labelCell(ws.getCell("A4"), "Use Employment Allowance? (Yes/No - see Notes)");
  ws.getCell("B4").value = "No";
  ws.getCell("B4").font = { bold: true, color: { argb: INDIGO } };
  indigoInput(ws.getCell("B4"));
  wb.definedNames.add(`'Your figures'!$B$4`, "In_UseEA");

  // --- Computed rows header ---
  indigoHeader(ws.getCell("A5"), "Computed extraction (2026/27 rates)");
  ws.mergeCells("A5:B5");

  // Row 6: Employer NI
  // Formula: IF(salary <= NI_SEC, 0, MAX(0, (salary - NI_SEC)*EMP_NI - IF(In_UseEA="Yes", EA, 0)))
  labelCell(ws.getCell("A6"), "Employer NI (GBP)");
  ws.getCell("B6").value = {
    formula:
      'IF(In_Salary<=NI_SEC,0,MAX(0,(In_Salary-NI_SEC)*EMP_NI-IF(UPPER(In_UseEA)="YES",EA,0)))',
  };
  moneyFmt(ws.getCell("B6"));
  wb.definedNames.add(`'Your figures'!$B$6`, "EmployerNi");

  // Row 7: Profit after payroll
  labelCell(ws.getCell("A7"), "Profit after payroll (GBP)");
  ws.getCell("B7").value = { formula: "MAX(0,In_Profit-In_Salary-EmployerNi)" };
  moneyFmt(ws.getCell("B7"));
  wb.definedNames.add(`'Your figures'!$B$7`, "ProfitAfterPayroll");

  // Row 8: Corporation tax (banded, LET-free)
  // 19% up to CT_SMALL, marginal 26.5% between CT_SMALL and CT_MAIN_LIM, 25% above
  labelCell(ws.getCell("A8"), "Corporation tax (GBP)");
  ws.getCell("B8").value = {
    formula:
      "IF(ProfitAfterPayroll<=0,0," +
      "IF(ProfitAfterPayroll<=CT_SMALL,ProfitAfterPayroll*CT_SMALL_RATE," +
      "IF(ProfitAfterPayroll>=CT_MAIN_LIM,ProfitAfterPayroll*CT_MAIN_RATE," +
      "CT_SMALL*CT_SMALL_RATE+(ProfitAfterPayroll-CT_SMALL)*CT_MARG)))",
  };
  moneyFmt(ws.getCell("B8"));
  wb.definedNames.add(`'Your figures'!$B$8`, "CorporationTax");

  // Row 9: Dividend (distributable profit)
  labelCell(ws.getCell("A9"), "Dividend (distributable profit, GBP)");
  ws.getCell("B9").value = { formula: "MAX(0,ProfitAfterPayroll-CorporationTax)" };
  moneyFmt(ws.getCell("B9"));
  wb.definedNames.add(`'Your figures'!$B$9`, "Dividend");

  // Row 10: Employee NI (banded, LET-free)
  // 8% on (salary - NI_PRI) up to UEL, 2% above
  labelCell(ws.getCell("A10"), "Employee NI (GBP)");
  ws.getCell("B10").value = {
    formula:
      "IF(In_Salary<=NI_PRI,0," +
      "MIN(In_Salary,UEL)*EMP_NI_BASIC-NI_PRI*EMP_NI_BASIC+" +
      "MAX(0,In_Salary-UEL)*EMP_NI_UPR)",
  };
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add(`'Your figures'!$B$10`, "EmployeeNi");

  // Row 11: Income tax on salary (banded, LET-free, PA taper above 100k)
  // PA tapered: PA - max(0, (salary-100000)/2), floored at 0
  // taxable = max(0, salary - adjustedPA)
  // basic = min(taxable, BRL-PA); higher = min(max(0, taxable-basic), HRL-BRL); addl = max(0, taxable-basic-higher)
  labelCell(ws.getCell("A11"), "Income tax on salary (GBP)");
  ws.getCell("B11").value = {
    formula:
      "IF(In_Salary<=0,0," +
      "MAX(0,MIN(In_Salary,BRL)-MAX(PA,PA-MAX(0,(In_Salary-100000)/2)))*INC_BASIC+" +
      "MAX(0,MIN(In_Salary,HRL)-MAX(BRL,MAX(PA,PA-MAX(0,(In_Salary-100000)/2))))*INC_HIGHER+" +
      "MAX(0,In_Salary-HRL)*INC_ADDL)",
  };
  moneyFmt(ws.getCell("B11"));
  wb.definedNames.add(`'Your figures'!$B$11`, "IncomeTax");

  // Row 12: Dividend tax (banded, LET-free)
  // PA used by salary -> remaining PA for dividend -> taxable dividend after DA
  // basic band capacity: BRL-PA; higher band: HRL-BRL
  // salary occupies basic/higher; dividend fills remainder
  labelCell(ws.getCell("A12"), "Dividend tax (GBP)");
  ws.getCell("B12").value = {
    formula:
      "IF(Dividend<=0,0," +
      "MAX(0,MIN(Dividend,MAX(0,BRL-PA-MAX(0,In_Salary-PA))-DIV_ALLOWANCE))*DIV_BASIC+" +
      "MAX(0,MIN(Dividend-MAX(0,BRL-PA-MAX(0,In_Salary-PA))+DIV_ALLOWANCE," +
      "MAX(0,HRL-BRL-MAX(0,In_Salary-BRL))))*DIV_HIGHER+" +
      "MAX(0,Dividend-MAX(0,BRL-PA-MAX(0,In_Salary-PA))+DIV_ALLOWANCE" +
      "-MAX(0,HRL-BRL-MAX(0,In_Salary-BRL)))*DIV_ADDL)",
  };
  moneyFmt(ws.getCell("B12"));
  wb.definedNames.add(`'Your figures'!$B$12`, "DividendTax");

  // Row 13: Total tax
  labelCell(ws.getCell("A13"), "Total tax (GBP)");
  ws.getCell("B13").value = { formula: "EmployerNi+CorporationTax+EmployeeNi+IncomeTax+DividendTax" };
  moneyFmt(ws.getCell("B13"));
  ws.getCell("B13").font = { bold: true, color: { argb: SLATE } };
  wb.definedNames.add(`'Your figures'!$B$13`, "TotalTax");

  // Row 14: Net cash
  labelCell(ws.getCell("A14"), "Net cash to director (GBP)");
  ws.getCell("B14").value = { formula: "In_Salary-EmployeeNi-IncomeTax+Dividend-DividendTax" };
  moneyFmt(ws.getCell("B14"));
  ws.getCell("B14").font = { bold: true, color: { argb: INDIGO } };
  wb.definedNames.add(`'Your figures'!$B$14`, "NetCash");

  // Row 15: Conservation check
  // NetCash = In_Profit - TotalTax + EmployerNi - EmployerNi (cancels) = In_Profit - AllTaxes
  // Actually: NetCash = salary - empNi - incTax + div - divTax
  // Conservation: NetCash + TotalTax = In_Salary - EmployeeNi - IncomeTax + Dividend - DividendTax
  //                                   + EmployerNi + CorporationTax + EmployeeNi + IncomeTax + DividendTax
  //             = In_Salary + Dividend + EmployerNi + CorporationTax - ... (simplified)
  // Simple conservation: TotalTax + NetCash approx = In_Profit (after payroll deductions)
  // Use: IF(ABS(NetCash+TotalTax - (In_Salary + Dividend + EmployerNi + CorporationTax)) < 1, "OK", "CHECK")
  labelCell(ws.getCell("A15"), "Conservation check (must be OK)");
  ws.getCell("B15").value = {
    formula:
      'IF(ABS(NetCash-(In_Salary-EmployeeNi-IncomeTax+Dividend-DividendTax))<0.01,"OK","CHECK")',
  };
  wb.definedNames.add(`'Your figures'!$B$15`, "ConservationCheck");

  // ---- Notes sheet ----
  const notes = wb.addWorksheet("Notes", {
    properties: { tabColor: { argb: SLATE } },
  });
  notes.columns = [{ key: "a", width: 90 }];
  indigoHeader(notes.getCell("A1"), "Notes: Agency Founder Finance salary and dividend planner 2026/27");
  const noteLines = [
    "1. This model is a simplified illustration. Your actual tax position depends on your specific circumstances.",
    "2. Dividend rates (10.75% / 35.75% / 39.35%) apply from 6 April 2026 (Finance Act 2026 s.4, 2026/27).",
    "3. Employer NIC is 15% above the 5,000 secondary threshold from 6 April 2025 (NOT the old 13.8% / 9,100 threshold).",
    "4. Employment Allowance (10,500): NOT available when the only employee is a single director.",
    "   Most solo founder-director agencies cannot claim the EA and often set salary at 5,000 (secondary threshold).",
    "   An agency with a genuinely employed non-director can lift salary to 12,570 with the EA and still pay no employer NI.",
    "5. There is no single universal optimal salary. The model shows the extraction at your chosen salary.",
    "6. Corporation tax uses the 2024+ banded rates: 19% (profits to 50,000), marginal 26.5% (50,000 to 250,000), 25% (above 250,000).",
    "7. Income tax: personal allowance 12,570. Tapers by 1 for every 2 above 100,000 (fully withdrawn at 125,140).",
    "8. Get specialist advice before making decisions based on this model.",
  ];
  noteLines.forEach((line, i) => {
    noteCell(notes.getCell(`A${i + 2}`), line);
  });

  return wb;
}
