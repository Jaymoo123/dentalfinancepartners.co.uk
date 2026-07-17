/**
 * Firm structure comparison Excel model builder (LLP vs limited company).
 *
 * Sheets:
 *  "Start here"   : overview and usage instructions
 *  "Comparison"   : LLP vs Ltd after-tax comparison (2026/27 rates)
 *  "Rates"        : LOCKED 2026/27 constants
 *  "Notes"        : assumptions and regulatory context
 */
import ExcelJS from "exceljs";

const CRIMSON = "FFC41E3A";
const INK = "FF0F172A";
const SURFACE = "FFF8F9FA";
const BLUE_INPUT = "FFDBEAFE";

// 2026/27 constants (FA 2026)
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const INCOME_TAX_BASIC = 0.20;
const INCOME_TAX_HIGHER = 0.40;
const INCOME_TAX_ADDITIONAL = 0.45;
const PA_TAPER_THRESHOLD = 100000;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_MAIN = 0.06;
const CLASS4_UPPER_RATE = 0.02;
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const DIVIDEND_ALLOWANCE = 500;
const CT_SMALL = 0.19;
const CT_MAIN = 0.25;
const CT_SMALL_LIMIT = 50000;
const CT_MAIN_LIMIT = 250000;
const NI_THRESHOLD = 5000;
const NI_RATE = 0.15;
const LTD_ADMIN_COST = 2500;

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
  cell.numFmt = '£#,##0';
}

function pctFmt(cell: ExcelJS.Cell) {
  cell.numFmt = '0.00%';
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
    { key: "label", width: 60 },
    { key: "value", width: 18 },
  ];
  hdr(ratesWs.getCell("A1"), "Locked rates (2026/27): do not edit");
  ratesWs.mergeCells("A1:B1");

  const rateRows: Array<{ label: string; value: number; name: string; fmt?: string }> = [
    { label: "Personal allowance (£)", value: PERSONAL_ALLOWANCE, name: "PA", fmt: "£#,##0" },
    { label: "Basic rate band upper limit (£)", value: BASIC_RATE_LIMIT, name: "BasicLimit", fmt: "£#,##0" },
    { label: "Higher rate band upper limit (£)", value: HIGHER_RATE_LIMIT, name: "HigherLimit", fmt: "£#,##0" },
    { label: "Income tax: basic rate", value: INCOME_TAX_BASIC, name: "IT_Basic", fmt: "0%" },
    { label: "Income tax: higher rate", value: INCOME_TAX_HIGHER, name: "IT_Higher", fmt: "0%" },
    { label: "Income tax: additional rate", value: INCOME_TAX_ADDITIONAL, name: "IT_Additional", fmt: "0%" },
    { label: "PA taper threshold (£)", value: PA_TAPER_THRESHOLD, name: "PATaper", fmt: "£#,##0" },
    { label: "Class 4 NIC lower profits limit (£)", value: CLASS4_LOWER, name: "C4Lower", fmt: "£#,##0" },
    { label: "Class 4 NIC upper profits limit (£)", value: CLASS4_UPPER, name: "C4Upper", fmt: "£#,##0" },
    { label: "Class 4 NIC main rate", value: CLASS4_MAIN, name: "C4Main", fmt: "0%" },
    { label: "Class 4 NIC upper rate", value: CLASS4_UPPER_RATE, name: "C4Upper_Rate", fmt: "0%" },
    { label: "Dividend tax: basic rate (FA 2026 s.4)", value: DIVIDEND_BASIC, name: "Div_Basic", fmt: "0.00%" },
    { label: "Dividend tax: higher rate (FA 2026 s.4)", value: DIVIDEND_HIGHER, name: "Div_Higher", fmt: "0.00%" },
    { label: "Dividend tax: additional rate (FA 2026 s.4)", value: DIVIDEND_ADDITIONAL, name: "Div_Additional", fmt: "0.00%" },
    { label: "Dividend allowance (£)", value: DIVIDEND_ALLOWANCE, name: "DivAllowance", fmt: "£#,##0" },
    { label: "Corporation tax: small profits rate (profits <= £50k)", value: CT_SMALL, name: "CT_Small", fmt: "0%" },
    { label: "Corporation tax: main rate (profits >= £250k)", value: CT_MAIN, name: "CT_Main", fmt: "0%" },
    { label: "CT small profits limit (£)", value: CT_SMALL_LIMIT, name: "CT_SmallLimit", fmt: "£#,##0" },
    { label: "CT main rate limit (£)", value: CT_MAIN_LIMIT, name: "CT_MainLimit", fmt: "£#,##0" },
    { label: "Employer NIC secondary threshold (£)", value: NI_THRESHOLD, name: "NI_Threshold", fmt: "£#,##0" },
    { label: "Employer NIC rate", value: NI_RATE, name: "NI_Rate", fmt: "0%" },
    { label: "Ltd: estimated admin cost (£/yr)", value: LTD_ADMIN_COST, name: "AdminCost", fmt: "£#,##0" },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    lbl(ratesWs.getCell(`A${row}`), r.label);
    const vc = ratesWs.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.fmt ?? "#,##0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  ratesWs.getColumn("label").alignment = { wrapText: true };
  ratesWs.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ----------------------------------------------------------- Comparison -- */
  const cmp = wb.addWorksheet("Comparison", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  cmp.columns = [
    { key: "a", width: 48 },
    { key: "b", width: 22 },
    { key: "c", width: 22 },
  ];
  hdr(cmp.getCell("A1"), "LLP vs limited company: after-tax comparison (2026/27)");
  cmp.mergeCells("A1:C1");
  hdr(cmp.getCell("B2"), "LLP / partnership");
  hdr(cmp.getCell("C2"), "Limited company");

  cmp.getCell("A4").value = "Annual profit (£):";
  inputCell(cmp.getCell("B4"), 120000, true);
  wb.definedNames.add(`Comparison!$B$4`, "Profit");
  cmp.getCell("C4").value = { formula: "Profit" } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C4"));

  cmp.getCell("A5").value = "Director salary (Ltd only, £):";
  cmp.getCell("B5").value = "n/a";
  inputCell(cmp.getCell("C5"), 12570, true);
  wb.definedNames.add(`Comparison!$C$5`, "Salary");

  // --- LLP column ---
  // Effective PA after taper
  cmp.getCell("A8").value = "Taxable profit (after any PA taper)";
  // Simplified: PA taper: lose £1 PA for every £2 above £100k, min PA = 0
  // effectivePA = MAX(0, PA - MAX(0, (Profit - PATaper)/2))
  // taxable = Profit (income tax computed on full profit, PA applied in band calc)
  // For the formula: we show the net figure
  const llpIT =
    `MAX(0,MIN(Profit,BasicLimit)-MAX(0,PA-MAX(0,(Profit-PATaper)/2)))*IT_Basic` +
    `+MAX(0,MIN(Profit,HigherLimit)-BasicLimit)*IT_Higher` +
    `+MAX(0,Profit-HigherLimit)*IT_Additional`;
  const llpC4 =
    `MAX(0,MIN(Profit,C4Upper)-C4Lower)*C4Main` +
    `+MAX(0,Profit-C4Upper)*C4Upper_Rate`;
  const llpNet = `Profit-(${llpIT})-(${llpC4})`;

  lbl(cmp.getCell("A10"), "Income tax (estimated):");
  cmp.getCell("B10").value = { formula: llpIT } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("B10"));

  lbl(cmp.getCell("A11"), "Class 4 NIC:");
  cmp.getCell("B11").value = { formula: llpC4 } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("B11"));

  lbl(cmp.getCell("A12"), "Total tax and NIC:");
  cmp.getCell("B12").value = { formula: `(${llpIT})+(${llpC4})` } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("B12"));
  cmp.getCell("B12").font = { bold: true };

  lbl(cmp.getCell("A13"), "Estimated take-home:");
  cmp.getCell("B13").value = { formula: llpNet } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("B13"));
  cmp.getCell("B13").font = { bold: true, color: { argb: CRIMSON } };

  // --- Ltd column ---
  // employer NI on salary above threshold
  const employerNI = `MAX(0,Salary-NI_Threshold)*NI_Rate`;
  // profit after salary and employer NI
  const profitAfterSalary = `Profit-Salary-(${employerNI})`;
  // CT: small (<=50k), main (>=250k), marginal rate in between
  // Simplified marginal relief: CT = profitAfterSalary * effective rate
  const ctFormula =
    `IF(${profitAfterSalary}<=CT_SmallLimit,` +
      `(${profitAfterSalary})*CT_Small,` +
    `IF(${profitAfterSalary}>=CT_MainLimit,` +
      `(${profitAfterSalary})*CT_Main,` +
      // marginal: CT_Small on first 50k, 26.5% on remainder
      `CT_SmallLimit*CT_Small+(${profitAfterSalary}-CT_SmallLimit)*0.265))`;
  const afterCT = `(${profitAfterSalary})-(${ctFormula})`;
  // salary tax (IT on salary above PA): 0 if salary = PA
  const salaryIT = `MAX(0,Salary-PA)*IT_Basic`;
  // employee NI: simplified zero at salary = PA (below primary threshold ≈ PA)
  // dividend tax on after-CT profits
  const divTaxable = `MAX(0,(${afterCT})-DivAllowance)`;
  // basic band remaining after salary
  const remBasic = `MAX(0,BasicLimit-MAX(0,Salary-PA))`;
  const divInBasic = `MIN(${divTaxable},${remBasic})`;
  const divInHigher = `MIN(MAX(0,(${divTaxable})-(${divInBasic})),HigherLimit-BasicLimit)`;
  const divInAdditional = `MAX(0,(${divTaxable})-(${divInBasic})-(${divInHigher}))`;
  const divTax = `(${divInBasic})*Div_Basic+(${divInHigher})*Div_Higher+(${divInAdditional})*Div_Additional`;
  const ltdNet = `Salary-(${salaryIT})+(${afterCT})-(${divTax})-AdminCost`;

  lbl(cmp.getCell("A15"), "Employer NIC on salary:");
  cmp.getCell("C15").value = { formula: employerNI } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C15"));

  lbl(cmp.getCell("A16"), "Corporation tax:");
  cmp.getCell("C16").value = { formula: ctFormula } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C16"));

  lbl(cmp.getCell("A17"), "Dividend tax:");
  cmp.getCell("C17").value = { formula: divTax } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C17"));

  lbl(cmp.getCell("A18"), "Income tax on salary:");
  cmp.getCell("C18").value = { formula: salaryIT } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C18"));

  lbl(cmp.getCell("A19"), "Estimated admin cost:");
  cmp.getCell("C19").value = { formula: "AdminCost" } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C19"));

  lbl(cmp.getCell("A20"), "Total tax, NIC and admin:");
  cmp.getCell("C20").value = { formula: `(${employerNI})+(${ctFormula})+(${divTax})+(${salaryIT})+AdminCost` } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C20"));
  cmp.getCell("C20").font = { bold: true };

  lbl(cmp.getCell("A21"), "Estimated take-home:");
  cmp.getCell("C21").value = { formula: ltdNet } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("C21"));
  cmp.getCell("C21").font = { bold: true, color: { argb: CRIMSON } };

  hdr(cmp.getCell("A23"), "Difference (LLP take-home minus Ltd take-home)");
  cmp.mergeCells("A23:C23");
  lbl(cmp.getCell("A24"), "LLP advantage (positive = LLP better after tax):");
  cmp.getCell("B24").value = { formula: `(${llpNet})-(${ltdNet})` } as ExcelJS.CellFormulaValue;
  moneyFmt(cmp.getCell("B24"));
  cmp.getCell("B24").font = { bold: true };
  cmp.mergeCells("B24:C24");

  cmp.getCell("A26").value =
    "This model estimates fully extracted profit. If significant profit is retained in a limited company, the effective tax cost differs materially. See the Notes tab.";
  cmp.getCell("A26").font = { italic: true, size: 10, color: { argb: "FF64748B" } };
  cmp.mergeCells("A26:C26");
  cmp.getColumn("a").alignment = { wrapText: true };

  /* ------------------------------------------------------------ Start here -- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: INK } },
  });
  start.columns = [{ width: 95 }];
  const startLines: Array<[string, boolean]> = [
    ["LLP vs limited company: structure comparison model (2026/27)", true],
    ["", false],
    ["This workbook models the after-tax position under two structures:", false],
    ["", false],
    ["  LLP / partnership: income tax + Class 4 NIC on profit share.", false],
    ["  Limited company: corporation tax + dividend tax + employer NIC on salary.", false],
    ["", false],
    ["To use the Comparison sheet:", false],
    ["  1. Enter your annual profit in cell B4.", false],
    ["  2. For the limited company column, set your intended director salary in C5.", false],
    ["     Default is £12,570 (equal to personal allowance, minimising income tax and NIC).", false],
    ["  3. Read the estimated take-home in rows 13 (LLP) and 21 (Ltd).", false],
    ["  4. Row 24 shows the difference (positive = LLP more tax-efficient at this profit level).", false],
    ["", false],
    ["The model assumes all profit is extracted. Retained profits in a limited company are", false],
    ["taxed only at CT rates until drawn, which may favour the corporate structure for firms", false],
    ["with significant reinvestment. See Notes for the full assumptions.", false],
    ["", false],
    ["The Rates tab holds locked 2026/27 constants. Do not edit it.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 15 : 12, color: { argb: INK } };
  });
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SURFACE } };

  /* ----------------------------------------------------------------- Notes -- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and regulatory context",
    "",
    "Tax rates",
    "All rates are 2026/27 (Finance Act 2026). Dividend rates: 10.75% basic / 35.75% higher / 39.35% additional.",
    "Corporation tax: 19% (profits <= £50,000), 25% (profits >= £250,000), 26.5% effective marginal rate in between.",
    "Employer NIC: 15% on earnings above £5,000 secondary threshold (from April 2025).",
    "BADR: 18% on qualifying gains up to £1 million lifetime limit (was 14% in 2025/26).",
    "",
    "Salaried-member rules (LLP)",
    "Members whose remuneration is more than 80% guaranteed, who lack significant influence AND",
    "whose capital is less than 25% of their disguised salary are treated as employees for tax.",
    "PAYE and employer NIC apply to such members. This model assumes no salaried members.",
    "",
    "Limited company salary assumption",
    "Default salary is £12,570 (equal to personal allowance). At this level, no income tax applies",
    "and no employee NIC is payable. Employer NIC of £1,135.50 (7,570 x 15%) applies.",
    "",
    "Admin cost",
    "A £2,500 annual admin cost is included for the limited company (accountancy, filing, Companies House).",
    "Adjust in the Rates sheet if your actual cost differs.",
    "",
    "Retained profit",
    "This model shows fully extracted profit. Where the limited company retains profit for reinvestment,",
    "the effective tax rate is the CT rate only (19% to 25%), materially lower than the LLP equivalent",
    "until the profit is drawn as dividends. Run a separate scenario for retention strategies.",
    "",
    "SRA authorisation",
    "LLPs are recognised bodies authorised directly. Limited companies require an ABS licence.",
    "Both routes are viable and well-established. The SRA minimum PII terms (£2m / £3m per claim) apply equally.",
    "",
    "General",
    "This model is for planning and orientation. It is not a substitute for tax advice specific to your firm.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    const boldHeadings = ["Assumptions and regulatory context", "Tax rates", "Salaried-member rules (LLP)",
      "Limited company salary assumption", "Admin cost", "Retained profit", "SRA authorisation", "General"];
    if (boldHeadings.includes(text)) {
      c.font = { bold: true, size: i === 0 ? 14 : 11, color: { argb: INK } };
    }
  });

  // Tab order
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Comparison", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}
