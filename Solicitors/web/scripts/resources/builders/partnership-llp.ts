/**
 * Partnership / LLP profit allocation and personal tax Excel model builder.
 *
 * Sheets:
 *  "Start here"       : overview and usage instructions
 *  "Profit allocation": firm profit → per-partner allocation (equal / two-tier)
 *  "Personal tax (partner)": allocated share → income tax + Class 4 NI + take-home
 *  "Personal tax (ltd)"    : same gross profit → salary + dividends after CT
 *  "Rates"            : LOCKED constants (same as site compute lib)
 *  "Notes"            : assumptions and context
 *
 * Constants mirror solicitor-take-home.ts and llp-profit-share.ts exactly.
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
const NI_SECONDARY = 5000;        // employer NIC threshold from April 2025 (FA 2025)
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
    { label: "Ltd company admin cost estimate (£)", value: 2500, name: "Ltd_Admin", fmt: "£#,##0" },
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

  /* ------------------------------------------------- Profit allocation -- */
  const alloc = wb.addWorksheet("Profit allocation", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  alloc.columns = [
    { key: "a", width: 48 },
    { key: "b", width: 22 },
  ];
  hdr(alloc.getCell("A1"), "Partner profit allocation: edit the blue cells");
  alloc.mergeCells("A1:B1");

  alloc.getCell("A3").value = "Firm net profit (£):";
  inputCell(alloc.getCell("B3"), 800000, true);
  wb.definedNames.add(`'Profit allocation'!$B$3`, "Firm_Profit");

  alloc.getCell("A4").value = "Senior equity partners (count):";
  inputCell(alloc.getCell("B4"), 3);
  wb.definedNames.add(`'Profit allocation'!$B$4`, "Senior_Count");

  alloc.getCell("A5").value = "Junior equity partners (count):";
  inputCell(alloc.getCell("B5"), 2);
  wb.definedNames.add(`'Profit allocation'!$B$5`, "Junior_Count");

  alloc.getCell("A6").value = 'Method (two-tier / equal):';
  inputCell(alloc.getCell("B6"), "two-tier");
  alloc.getCell("B6").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"two-tier,equal"'],
  };
  wb.definedNames.add(`'Profit allocation'!$B$6`, "Alloc_Method");

  hdr(alloc.getCell("A8"), "Allocation results (two-tier: senior 1.5x, junior 1x)");
  alloc.mergeCells("A8:B8");

  // Two-tier: total points = senior*1.5 + junior*1
  alloc.getCell("A9").value = "Total points:";
  alloc.getCell("B9").value = {
    formula: 'IF(Alloc_Method="two-tier",Senior_Count*1.5+Junior_Count*1,Senior_Count+Junior_Count)',
  } as ExcelJS.CellFormulaValue;
  alloc.getCell("B9").numFmt = "#,##0.0";
  wb.definedNames.add(`'Profit allocation'!$B$9`, "Total_Points");

  alloc.getCell("A10").value = "Value per point (£):";
  alloc.getCell("B10").value = {
    formula: "IF(Total_Points>0,Firm_Profit/Total_Points,0)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(alloc.getCell("B10"));
  wb.definedNames.add(`'Profit allocation'!$B$10`, "Per_Point");

  lbl(alloc.getCell("A12"), "Senior partner share each (£):");
  alloc.getCell("B12").value = {
    formula: 'IF(Alloc_Method="two-tier",Per_Point*1.5,Per_Point)',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(alloc.getCell("B12"));
  wb.definedNames.add(`'Profit allocation'!$B$12`, "Senior_Share");

  lbl(alloc.getCell("A13"), "Senior partner share total (£):");
  alloc.getCell("B13").value = { formula: "Senior_Share*Senior_Count" } as ExcelJS.CellFormulaValue;
  moneyFmt(alloc.getCell("B13"));

  lbl(alloc.getCell("A14"), "Junior partner share each (£):");
  alloc.getCell("B14").value = { formula: "Per_Point" } as ExcelJS.CellFormulaValue;
  moneyFmt(alloc.getCell("B14"));
  wb.definedNames.add(`'Profit allocation'!$B$14`, "Junior_Share");

  lbl(alloc.getCell("A15"), "Junior partner share total (£):");
  alloc.getCell("B15").value = { formula: "Junior_Share*Junior_Count" } as ExcelJS.CellFormulaValue;
  moneyFmt(alloc.getCell("B15"));

  alloc.getCell("A17").value =
    "For the personal tax on each share, go to 'Personal tax (partner)' or 'Personal tax (ltd)'.";
  alloc.getCell("A17").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  alloc.getColumn("a").alignment = { wrapText: true };

  /* ----------------------------------------- Personal tax (partner) -- */
  const ptPartner = wb.addWorksheet("Personal tax (partner)", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  ptPartner.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
  ];
  hdr(ptPartner.getCell("A1"), "Personal tax: partnership / LLP (2026/27)");
  ptPartner.mergeCells("A1:B1");

  ptPartner.getCell("A3").value = "Allocated profit share (£):";
  inputCell(ptPartner.getCell("B3"), 184615, true);
  wb.definedNames.add(`'Personal tax (partner)'!$B$3`, "P_Share");

  ptPartner.getCell("A4").value = "Pension contribution (£):";
  inputCell(ptPartner.getCell("B4"), 0, true);
  wb.definedNames.add(`'Personal tax (partner)'!$B$4`, "P_Pension");

  ptPartner.getCell("A6").value = "Taxable income (share minus pension):";
  ptPartner.getCell("B6").value = { formula: "MAX(0,P_Share-P_Pension)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B6"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$6`, "P_Taxable");

  // Income tax (with PA taper above £100k)
  ptPartner.getCell("A7").value = "Personal allowance (tapered above £100k):";
  ptPartner.getCell("B7").value = {
    formula: "MAX(0,PA-MAX(0,(P_Taxable-100000)/2))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B7"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$7`, "P_PA_Used");

  ptPartner.getCell("A8").value = "Taxable above PA:";
  ptPartner.getCell("B8").value = { formula: "MAX(0,P_Taxable-P_PA_Used)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B8"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$8`, "P_Above_PA");

  ptPartner.getCell("A9").value = "Amount in basic-rate band:";
  ptPartner.getCell("B9").value = {
    formula: "MIN(P_Above_PA,BRL-PA)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B9"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$9`, "P_Basic");

  ptPartner.getCell("A10").value = "Amount in higher-rate band:";
  ptPartner.getCell("B10").value = {
    formula: "MIN(MAX(0,P_Above_PA-P_Basic),HRL-BRL)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B10"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$10`, "P_Higher");

  ptPartner.getCell("A11").value = "Amount in additional-rate band:";
  ptPartner.getCell("B11").value = {
    formula: "MAX(0,P_Above_PA-P_Basic-P_Higher)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B11"));

  lbl(ptPartner.getCell("A13"), "Income tax:");
  ptPartner.getCell("B13").value = {
    formula: "P_Basic*IT_Basic+P_Higher*IT_Higher+MAX(0,P_Above_PA-P_Basic-P_Higher)*IT_Addl",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B13"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$13`, "P_IT");

  // Class 4 NI
  ptPartner.getCell("A14").value = "Class 4 NI (main band):";
  ptPartner.getCell("B14").value = {
    formula: "MAX(0,MIN(P_Taxable,C4_Upper)-C4_Lower)*C4_Main",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B14"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$14`, "P_C4_Main");

  ptPartner.getCell("A15").value = "Class 4 NI (upper rate):";
  ptPartner.getCell("B15").value = {
    formula: "MAX(0,P_Taxable-C4_Upper)*C4_Up",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B15"));

  lbl(ptPartner.getCell("A16"), "Total Class 4 NI:");
  ptPartner.getCell("B16").value = {
    formula: "P_C4_Main+MAX(0,P_Taxable-C4_Upper)*C4_Up",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B16"));
  wb.definedNames.add(`'Personal tax (partner)'!$B$16`, "P_C4_Total");

  lbl(ptPartner.getCell("A18"), "NET TAKE-HOME (partnership):");
  ptPartner.getCell("B18").value = { formula: "P_Share-P_IT-P_C4_Total-P_Pension" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptPartner.getCell("B18"));
  ptPartner.getCell("B18").font = { bold: true, size: 13 };

  ptPartner.getColumn("a").alignment = { wrapText: true };

  /* -------------------------------------------- Personal tax (ltd) -- */
  const ptLtd = wb.addWorksheet("Personal tax (ltd)", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  ptLtd.columns = [
    { key: "a", width: 52 },
    { key: "b", width: 22 },
  ];
  hdr(ptLtd.getCell("A1"), "Personal tax: limited company director (2026/27)");
  ptLtd.mergeCells("A1:B1");

  ptLtd.getCell("A3").value = "Gross firm profit (£):";
  inputCell(ptLtd.getCell("B3"), 184615, true);
  wb.definedNames.add(`'Personal tax (ltd)'!$B$3`, "L_Profit");

  ptLtd.getCell("A4").value = "Pension contribution (£):";
  inputCell(ptLtd.getCell("B4"), 0, true);
  wb.definedNames.add(`'Personal tax (ltd)'!$B$4`, "L_Pension");

  // Salary = NI Primary threshold (min-salary strategy)
  ptLtd.getCell("A6").value = "Director salary (NI Primary threshold: £12,570):";
  ptLtd.getCell("B6").value = NI_PRIMARY;
  moneyFmt(ptLtd.getCell("B6"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$6`, "L_Salary");

  ptLtd.getCell("A7").value = "Employer NI on salary:";
  ptLtd.getCell("B7").value = {
    formula: "MAX(0,(L_Salary-NI_Sec)*ER_NI)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B7"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$7`, "L_ErNI");

  ptLtd.getCell("A8").value = "Profit after salary, employer NI and pension:";
  ptLtd.getCell("B8").value = {
    formula: "MAX(0,L_Profit-L_Salary-L_ErNI-L_Pension)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B8"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$8`, "L_PreCT");

  // Corporation tax
  ptLtd.getCell("A9").value = "Corporation tax:";
  ptLtd.getCell("B9").value = {
    formula:
      "IF(L_PreCT<=0,0," +
      "IF(L_PreCT<=CT_SmThr,L_PreCT*CT_Small," +
      "IF(L_PreCT>=CT_MargUp,L_PreCT*CT_Main," +
      "CT_SmThr*CT_Small+(L_PreCT-CT_SmThr)*CT_Marg)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B9"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$9`, "L_CT");

  ptLtd.getCell("A10").value = "Profit after corporation tax (available as dividend):";
  ptLtd.getCell("B10").value = { formula: "MAX(0,L_PreCT-L_CT)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B10"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$10`, "L_Dividend");

  // Personal tax on salary
  ptLtd.getCell("A11").value = "Income tax on salary:";
  ptLtd.getCell("B11").value = {
    formula: "MAX(0,L_Salary-PA)*IT_Basic",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B11"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$11`, "L_SalaryTax");

  ptLtd.getCell("A12").value = "Employee NI on salary:";
  ptLtd.getCell("B12").value = {
    formula: "IF(L_Salary<=NI_Pri,0,MIN(L_Salary,50270)-NI_Pri)*EE_NI",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B12"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$12`, "L_EeNI");

  // Dividend tax (simplified: salary uses all basic-rate band in min-salary scenario)
  ptLtd.getCell("A13").value = "Taxable dividend (after allowance):";
  ptLtd.getCell("B13").value = {
    formula: "MAX(0,L_Dividend-DivAllow)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B13"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$13`, "L_TaxDiv");

  ptLtd.getCell("A14").value = "Basic-rate band remaining after salary:";
  ptLtd.getCell("B14").value = {
    formula: "MAX(0,BRL-PA-MAX(0,L_Salary-PA))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B14"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$14`, "L_RemBasic");

  ptLtd.getCell("A15").value = "Dividend in basic band:";
  ptLtd.getCell("B15").value = { formula: "MIN(L_TaxDiv,L_RemBasic)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B15"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$15`, "L_DivBasic");

  ptLtd.getCell("A16").value = "Dividend in higher/additional band:";
  ptLtd.getCell("B16").value = { formula: "MAX(0,L_TaxDiv-L_DivBasic)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B16"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$16`, "L_DivHigher");

  lbl(ptLtd.getCell("A17"), "Dividend tax:");
  ptLtd.getCell("B17").value = {
    formula: "L_DivBasic*Div_Basic+L_DivHigher*Div_Higher",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ptLtd.getCell("B17"));
  wb.definedNames.add(`'Personal tax (ltd)'!$B$17`, "L_DivTax");

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
    ["Partner profit allocation and personal tax model", true],
    ["", false],
    ["This workbook has four working sheets:", false],
    ["", false],
    ["  Profit allocation: enter firm net profit, partner counts and the allocation method.", false],
    ["    Two-tier: senior 1.5x, junior 1x. Equal: equal shares for all. The model allocates", false],
    ["    profit and shows each tier's share per partner.", false],
    ["", false],
    ["  Personal tax (partner): enter an individual partner's allocated share and pension.", false],
    ["    Shows income tax (with the PA taper above £100k), Class 4 NI and take-home for", false],
    ["    a partnership / LLP / sole-trader structure. Uses 2026/27 rates.", false],
    ["", false],
    ["  Personal tax (ltd): same gross profit modelled as a director salary + dividends.", false],
    ["    Uses the £12,570 min-salary strategy, 2026/27 corporation tax, FA 2026 dividend", false],
    ["    rates (10.75% / 35.75% / 39.35%) and a £2,500 admin cost estimate.", false],
    ["", false],
    ["  Rates: locked constants. The same source as the on-site calculator.", false],
    ["", false],
    ["Read the Notes tab for assumptions and context.", false],
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
    "Tax year: 2026/27. Dividend rates are those in force from 6 April 2026 under FA 2026 s.4.",
    "",
    "Profit allocation",
    "In a genuine partnership or LLP, profit is allocated per the members' agreement. The",
    "two-tier model (1.5x senior, 1x junior) is a common convention; your agreement may differ.",
    "Merit-based, lockstep and fixed-share-plus-equity models are not built in because they",
    "require firm-specific inputs (origination credits, individual billing targets).",
    "",
    "Partnership personal tax",
    "Partners are self-employed and pay income tax and Class 4 NI on their allocated profit",
    "share for the tax year in which the firm's accounting period ends. They file through",
    "Self Assessment. The PA taper reduces the allowance by £1 for every £2 of income above",
    "£100,000; it is eliminated at £125,140.",
    "",
    "Limited company",
    "The model assumes a £12,570 salary (NI Primary Threshold) so no employee income tax is",
    "payable on the salary, and employer NI is calculated on salary above the £5,000 secondary",
    "threshold at 15% (FA 2025, from April 2025). Remaining profit is paid as dividend.",
    "The dividend tax uses FA 2026 rates: 10.75% basic / 35.75% higher / 39.35% additional.",
    "The £2,500 admin cost is indicative. Your SRA authorisation costs are separate.",
    "",
    "Limitations",
    "The comparison is simplified. It does not model pension tax relief in the company,",
    "Employment Allowance, basis-period transitional rules, IR35 or the settlements legislation",
    "on income splitting. Take specialist advice before changing your firm's structure.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0 || text === "Profit allocation" || text === "Partnership personal tax" ||
        text === "Limited company" || text === "Limitations") {
      c.font = { bold: true, size: i === 0 ? 14 : 11, color: { argb: INK } };
    }
  });

  // Tab order
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Profit allocation", "Personal tax (partner)", "Personal tax (ltd)", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
