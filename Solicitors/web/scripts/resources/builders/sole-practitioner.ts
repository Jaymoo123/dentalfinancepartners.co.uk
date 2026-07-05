/**
 * Sole practitioner take-home Excel model builder.
 *
 * Sheets:
 *  "Start here"             : overview and usage
 *  "Take-home (partner)"    : profit → income tax + Class 4 NI + take-home
 *  "Take-home (ltd)"        : same gross profit → salary + dividends after CT
 *  "Rates"                  : LOCKED constants from solicitor-take-home.ts
 *  "Notes"                  : assumptions and context
 *
 * Constants mirrored from solicitor-take-home.ts (corrected 2026-07-06):
 *   NI_SECONDARY = 5000 (employer NIC secondary threshold from April 2025)
 *   Dividend rates: 10.75% / 35.75% / 39.35% (FA 2026 s.4 from 6 April 2026)
 */
import ExcelJS from "exceljs";

const CRIMSON = "FFC41E3A";
const INK = "FF0F172A";
const SURFACE = "FFF8F9FA";
const BLUE_INPUT = "FFDBEAFE";

// ── Rate constants (mirrored from solicitor-take-home.ts) ──────────────────
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_MAIN = 0.06;
const CLASS4_UPPER_RATE = 0.02;
const NI_SECONDARY = 5000;        // employer NIC threshold from April 2025 (FA 2025 corrected 2026-07-06)
const EMPLOYER_NI_RATE = 0.15;    // employer NIC rate from April 2025 (FA 2025)
const NI_PRIMARY = 12570;
const EMPLOYEE_NI_BASIC = 0.08;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC = 0.1075;    // FA 2026 s.4 from 6 Apr 2026
const DIVIDEND_HIGHER = 0.3575;   // FA 2026 s.4 from 6 Apr 2026
const DIVIDEND_ADDITIONAL = 0.3935; // FA 2026 s.4 (unchanged)
const CT_SMALL_RATE = 0.19;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_RATE = 0.25;
const CT_MARGINAL_RATE = 0.265;
const CT_MARGINAL_UPPER = 250000;
const LTD_ADMIN = 2500;            // estimated annual admin / compliance cost

function hdr(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CRIMSON } };
  cell.alignment = { vertical: "middle" };
}

function lbl(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: INK } };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0.00";
}

function inputCell(cell: ExcelJS.Cell, value: number | string, money = false) {
  cell.value = value;
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_INPUT } };
  cell.protection = { locked: false };
  if (money) moneyFmt(cell);
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Accounts for Lawyers";
  wb.lastModifiedBy = "Accounts for Lawyers";

  /* ---------------------------------------------------------------- Rates -- */
  const ratesWs = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  ratesWs.columns = [
    { key: "label", width: 55 },
    { key: "value", width: 18 },
  ];
  hdr(ratesWs.getCell("A1"), "Locked rates: do not edit");
  ratesWs.mergeCells("A1:B1");

  const rateRows: Array<{ label: string; value: number; name: string; fmt: string }> = [
    { label: "Personal allowance (£)", value: PERSONAL_ALLOWANCE, name: "PA", fmt: "£#,##0" },
    { label: "Basic rate limit (£)", value: BASIC_RATE_LIMIT, name: "BRL", fmt: "£#,##0" },
    { label: "Higher rate limit (£)", value: HIGHER_RATE_LIMIT, name: "HRL", fmt: "£#,##0" },
    { label: "Income tax: basic rate", value: INCOME_BASIC, name: "IT_Basic", fmt: "0%" },
    { label: "Income tax: higher rate", value: INCOME_HIGHER, name: "IT_Higher", fmt: "0%" },
    { label: "Income tax: additional rate", value: INCOME_ADDITIONAL, name: "IT_Addl", fmt: "0%" },
    { label: "Class 4 NI lower threshold (£)", value: CLASS4_LOWER, name: "C4_Lower", fmt: "£#,##0" },
    { label: "Class 4 NI upper threshold (£)", value: CLASS4_UPPER, name: "C4_Upper", fmt: "£#,##0" },
    { label: "Class 4 NI main rate", value: CLASS4_MAIN, name: "C4_Main", fmt: "0%" },
    { label: "Class 4 NI upper rate", value: CLASS4_UPPER_RATE, name: "C4_Up", fmt: "0%" },
    { label: "Employer NI secondary threshold (£)", value: NI_SECONDARY, name: "NI_Sec", fmt: "£#,##0" },
    { label: "Employer NI rate (from Apr 2025)", value: EMPLOYER_NI_RATE, name: "ER_NI", fmt: "0%" },
    { label: "Employee NI primary threshold (£)", value: NI_PRIMARY, name: "NI_Pri", fmt: "£#,##0" },
    { label: "Employee NI basic rate", value: EMPLOYEE_NI_BASIC, name: "EE_NI", fmt: "0%" },
    { label: "Dividend allowance (£)", value: DIVIDEND_ALLOWANCE, name: "DivAllow", fmt: "£#,##0" },
    { label: "Dividend tax: basic rate (FA 2026 s.4, 2026/27)", value: DIVIDEND_BASIC, name: "Div_Basic", fmt: "0.00%" },
    { label: "Dividend tax: higher rate (FA 2026 s.4, 2026/27)", value: DIVIDEND_HIGHER, name: "Div_Higher", fmt: "0.00%" },
    { label: "Dividend tax: additional rate (FA 2026 s.4, 2026/27)", value: DIVIDEND_ADDITIONAL, name: "Div_Addl", fmt: "0.00%" },
    { label: "Corporation tax small profits rate (<=£50k)", value: CT_SMALL_RATE, name: "CT_Small", fmt: "0%" },
    { label: "Corporation tax small profits threshold (£)", value: CT_SMALL_THRESHOLD, name: "CT_SmThr", fmt: "£#,##0" },
    { label: "Corporation tax main rate (>£250k)", value: CT_MAIN_RATE, name: "CT_Main", fmt: "0%" },
    { label: "Corporation tax marginal relief rate", value: CT_MARGINAL_RATE, name: "CT_Marg", fmt: "0.000%" },
    { label: "Corporation tax marginal upper limit (£)", value: CT_MARGINAL_UPPER, name: "CT_MargUp", fmt: "£#,##0" },
    { label: "Ltd company admin cost estimate (£)", value: LTD_ADMIN, name: "Ltd_Admin", fmt: "£#,##0" },
    { label: "Ltd salary (NI Primary threshold) (£)", value: NI_PRIMARY, name: "Ltd_Salary", fmt: "£#,##0" },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    lbl(ratesWs.getCell(`A${row}`), r.label);
    const vc = ratesWs.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.fmt;
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  ratesWs.getColumn("label").alignment = { wrapText: true };
  ratesWs.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ---------------------------------------- Take-home (partner) -- */
  const ptPartner = wb.addWorksheet("Take-home (partner)", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  ptPartner.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
  ];
  hdr(ptPartner.getCell("A1"), "Sole practitioner / partnership take-home (2026/27)");
  ptPartner.mergeCells("A1:B1");

  ptPartner.getCell("A3").value = "Annual profit (£):";
  inputCell(ptPartner.getCell("B3"), 120000, true);
  wb.definedNames.add(`'Take-home (partner)'!$B$3`, "S_Profit");

  ptPartner.getCell("A4").value = "Pension contribution (£):";
  inputCell(ptPartner.getCell("B4"), 0, true);
  wb.definedNames.add(`'Take-home (partner)'!$B$4`, "S_Pension");

  ptPartner.getCell("A6").value = "Taxable income (profit minus pension):";
  ptPartner.getCell("B6").value = { formula: "MAX(0,S_Profit-S_Pension)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B6"));
  wb.definedNames.add(`'Take-home (partner)'!$B$6`, "S_Taxable");

  // PA taper
  ptPartner.getCell("A7").value = "Personal allowance (tapered above £100k):";
  ptPartner.getCell("B7").value = {
    formula: "MAX(0,PA-MAX(0,(S_Taxable-100000)/2))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B7"));
  wb.definedNames.add(`'Take-home (partner)'!$B$7`, "S_PA");

  ptPartner.getCell("A8").value = "Taxable above PA:";
  ptPartner.getCell("B8").value = { formula: "MAX(0,S_Taxable-S_PA)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B8"));
  wb.definedNames.add(`'Take-home (partner)'!$B$8`, "S_AbovePA");

  ptPartner.getCell("A9").value = "In basic-rate band:";
  ptPartner.getCell("B9").value = { formula: "MIN(S_AbovePA,BRL-PA)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B9"));
  wb.definedNames.add(`'Take-home (partner)'!$B$9`, "S_Basic");

  ptPartner.getCell("A10").value = "In higher-rate band:";
  ptPartner.getCell("B10").value = {
    formula: "MIN(MAX(0,S_AbovePA-S_Basic),HRL-BRL)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B10"));
  wb.definedNames.add(`'Take-home (partner)'!$B$10`, "S_Higher");

  ptPartner.getCell("A11").value = "In additional-rate band:";
  ptPartner.getCell("B11").value = {
    formula: "MAX(0,S_AbovePA-S_Basic-S_Higher)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B11"));

  lbl(ptPartner.getCell("A13"), "Income tax:");
  ptPartner.getCell("B13").value = {
    formula: "S_Basic*IT_Basic+S_Higher*IT_Higher+MAX(0,S_AbovePA-S_Basic-S_Higher)*IT_Addl",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B13"));
  wb.definedNames.add(`'Take-home (partner)'!$B$13`, "S_IT");

  ptPartner.getCell("A14").value = "Class 4 NI (main band):";
  ptPartner.getCell("B14").value = {
    formula: "MAX(0,MIN(S_Taxable,C4_Upper)-C4_Lower)*C4_Main",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B14"));
  wb.definedNames.add(`'Take-home (partner)'!$B$14`, "S_C4Main");

  ptPartner.getCell("A15").value = "Class 4 NI (upper rate):";
  ptPartner.getCell("B15").value = {
    formula: "MAX(0,S_Taxable-C4_Upper)*C4_Up",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B15"));

  lbl(ptPartner.getCell("A16"), "Total Class 4 NI:");
  ptPartner.getCell("B16").value = {
    formula: "S_C4Main+MAX(0,S_Taxable-C4_Upper)*C4_Up",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B16"));
  wb.definedNames.add(`'Take-home (partner)'!$B$16`, "S_C4Total");

  lbl(ptPartner.getCell("A18"), "NET TAKE-HOME (partnership / sole trader):");
  ptPartner.getCell("B18").value = { formula: "S_Profit-S_IT-S_C4Total-S_Pension" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B18"));
  ptPartner.getCell("B18").font = { bold: true, size: 13 };

  ptPartner.getColumn("a").alignment = { wrapText: true };

  /* -------------------------------------------- Take-home (ltd) -- */
  const ptLtd = wb.addWorksheet("Take-home (ltd)", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  ptLtd.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
  ];
  hdr(ptLtd.getCell("A1"), "Limited company director take-home (2026/27)");
  ptLtd.mergeCells("A1:B1");

  ptLtd.getCell("A3").value = "Gross firm profit (£):";
  inputCell(ptLtd.getCell("B3"), 120000, true);
  wb.definedNames.add(`'Take-home (ltd)'!$B$3`, "L_Profit");

  ptLtd.getCell("A4").value = "Pension contribution (£):";
  inputCell(ptLtd.getCell("B4"), 0, true);
  wb.definedNames.add(`'Take-home (ltd)'!$B$4`, "L_Pension");

  ptLtd.getCell("A6").value = "Director salary (from Rates: NI Primary Threshold):";
  ptLtd.getCell("B6").value = { formula: "Ltd_Salary" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B6"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$6`, "L_Salary");

  ptLtd.getCell("A7").value = "Employer NI on salary:";
  ptLtd.getCell("B7").value = {
    formula: "MAX(0,(L_Salary-NI_Sec)*ER_NI)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B7"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$7`, "L_ErNI");

  ptLtd.getCell("A8").value = "Profit after salary, employer NI and pension:";
  ptLtd.getCell("B8").value = {
    formula: "MAX(0,L_Profit-L_Salary-L_ErNI-L_Pension)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B8"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$8`, "L_PreCT");

  ptLtd.getCell("A9").value = "Corporation tax:";
  ptLtd.getCell("B9").value = {
    formula:
      "IF(L_PreCT<=0,0," +
      "IF(L_PreCT<=CT_SmThr,L_PreCT*CT_Small," +
      "IF(L_PreCT>=CT_MargUp,L_PreCT*CT_Main," +
      "CT_SmThr*CT_Small+(L_PreCT-CT_SmThr)*CT_Marg)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B9"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$9`, "L_CT");

  ptLtd.getCell("A10").value = "Profit after CT (available as dividend):";
  ptLtd.getCell("B10").value = { formula: "MAX(0,L_PreCT-L_CT)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B10"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$10`, "L_Dividend");

  ptLtd.getCell("A11").value = "Income tax on salary:";
  ptLtd.getCell("B11").value = {
    formula: "MAX(0,L_Salary-PA)*IT_Basic",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B11"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$11`, "L_SalaryTax");

  ptLtd.getCell("A12").value = "Employee NI on salary:";
  ptLtd.getCell("B12").value = {
    formula: "IF(L_Salary<=NI_Pri,0,MIN(L_Salary,50270)-NI_Pri)*EE_NI",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B12"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$12`, "L_EeNI");

  ptLtd.getCell("A13").value = "Taxable dividend (after allowance):";
  ptLtd.getCell("B13").value = {
    formula: "MAX(0,L_Dividend-DivAllow)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B13"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$13`, "L_TaxDiv");

  ptLtd.getCell("A14").value = "Basic-rate band remaining after salary:";
  ptLtd.getCell("B14").value = {
    formula: "MAX(0,BRL-PA-MAX(0,L_Salary-PA))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B14"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$14`, "L_RemBasic");

  ptLtd.getCell("A15").value = "Dividend in basic band:";
  ptLtd.getCell("B15").value = { formula: "MIN(L_TaxDiv,L_RemBasic)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B15"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$15`, "L_DivBasic");

  ptLtd.getCell("A16").value = "Dividend in higher/additional band:";
  ptLtd.getCell("B16").value = { formula: "MAX(0,L_TaxDiv-L_DivBasic)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B16"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$16`, "L_DivHigher");

  lbl(ptLtd.getCell("A17"), "Dividend tax:");
  ptLtd.getCell("B17").value = {
    formula: "L_DivBasic*Div_Basic+L_DivHigher*Div_Higher",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B17"));
  wb.definedNames.add(`'Take-home (ltd)'!$B$17`, "L_DivTax");

  ptLtd.getCell("A18").value = "Estimated admin / compliance cost:";
  ptLtd.getCell("B18").value = { formula: "Ltd_Admin" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B18"));

  lbl(ptLtd.getCell("A20"), "NET TAKE-HOME (ltd):");
  ptLtd.getCell("B20").value = {
    formula: "L_Salary-L_SalaryTax-L_EeNI+(L_Dividend-L_DivTax)-Ltd_Admin",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B20"));
  ptLtd.getCell("B20").font = { bold: true, size: 13 };

  ptLtd.getColumn("a").alignment = { wrapText: true };

  /* -------------------------------------------------------- Start here -- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: INK } },
  });
  start.columns = [{ width: 95 }];
  const startLines: Array<[string, boolean]> = [
    ["Sole practitioner take-home: partnership vs limited company", true],
    ["", false],
    ["Two sheets compare the take-home from the same gross profit under two structures:", false],
    ["", false],
    ["  Take-home (partner): models the profit as a self-employed sole trader or partner.", false],
    ["    Shows income tax (with the PA taper above £100k), Class 4 NI and take-home.", false],
    ["    Uses 2026/27 rates.", false],
    ["", false],
    ["  Take-home (ltd): models the same profit as a limited company director.", false],
    ["    Uses a £12,570 min-salary strategy, employer NI at 15% above £5,000 (FA 2025),", false],
    ["    corporation tax at 2026/27 rates, and FA 2026 dividend rates:", false],
    ["    10.75% (basic) / 35.75% (higher) / 39.35% (additional).", false],
    ["    A £2,500 admin/compliance cost is included.", false],
    ["", false],
    ["  Rates: locked constants. Same source as the on-site calculator.", false],
    ["  Notes: assumptions, methodology and limitations.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 15 : 12, color: { argb: INK } };
  });
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SURFACE } };

  /* -------------------------------------------------------------- Notes -- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and context",
    "",
    "Tax year: 2026/27. Dividend rates from 6 April 2026 (FA 2026 s.4).",
    "Employer NIC from 6 April 2025 (FA 2025): 15% above £5,000 secondary threshold.",
    "",
    "Partnership / sole trader",
    "Self-employed practitioners pay income tax and Class 4 NI on their profit share.",
    "The personal allowance tapers by £1 for every £2 of income above £100,000 and",
    "is eliminated at £125,140. Class 4 NI: 6% (£12,570-£50,270), 2% above £50,270.",
    "",
    "Limited company",
    "The model uses a £12,570 salary (NI Primary Threshold). Employer NI is 15% above",
    "the £5,000 secondary threshold. Remaining profit after salary, employer NI and pension",
    "is taxed at corporation tax rates (19% <= £50k, marginal 26.5% relief, 25% > £250k).",
    "The after-CT profit is paid as a dividend. Dividend tax uses FA 2026 rates.",
    "The dividend allowance is £500. A £2,500 admin/compliance cost is deducted.",
    "",
    "SRA authorisation",
    "A sole solicitor practising through a limited company must obtain SRA authorisation",
    "for the company as an authorised body (recognised sole practice or licensed body).",
    "This carries its own fees and compliance requirements not modelled here.",
    "",
    "General",
    "This is a simplified comparison for orientation. It does not model pension relief",
    "in the company, Employment Allowance, basis-period transitional rules, IR35 or",
    "income splitting under the settlements legislation. Take specialist advice.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0 || text === "Partnership / sole trader" || text === "Limited company" ||
        text === "SRA authorisation" || text === "General") {
      c.font = { bold: true, size: i === 0 ? 14 : 11, color: { argb: INK } };
    }
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Take-home (partner)", "Take-home (ltd)", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
