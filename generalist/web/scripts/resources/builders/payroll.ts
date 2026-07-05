/**
 * True cost of hire model builder.
 *
 * Traces calcEmployerNIFleet / calcSingleEmployerNi / calcMinPensionEmployer
 * from lib/tools/compute/employer-ni.ts.
 *
 * Default: 1 employee, role "First hire", salary £30,000; EA on; pension on.
 * EA NOT applied with single employee (EA requires >=2 employees, per compute lib).
 * Golden: employerNi=3750, eaApplied=0, pension=712.80, totalCost=34462.80.
 */
import ExcelJS from "exceljs";
import { UK_TAX_RATES as T } from "../../../src/lib/uk-tax-rates";

const SECONDARY_THRESHOLD = T.nationalInsurance.employer.secondaryThreshold;
const EMPLOYER_NI_RATE = T.nationalInsurance.employer.rate;
const EMPLOYMENT_ALLOWANCE = T.nationalInsurance.employer.employmentAllowance;
const PENSION_MIN_QUALIFYING = 6240;
const PENSION_EMPLOYER_MIN_RATE = 0.03;

const ORANGE = "FFF97316";
const SLATE_900 = "FF0F172A";
const SLATE_50 = "FFF8FAFC";
const BLUE_50 = "FFDBEAFE";

function headerCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_900 } };
  cell.alignment = { vertical: "middle" };
}
function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { color: { argb: SLATE_900 } };
}
function moneyFmt(cell: ExcelJS.Cell) { cell.numFmt = "£#,##0"; }
function blueInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_50 } };
  cell.protection = { locked: false };
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Holloway Davies";
  wb.lastModifiedBy = "Holloway Davies";

  /* ---- Rates ---- */
  const rates = wb.addWorksheet("Rates", { properties: { tabColor: { argb: ORANGE } } });
  rates.columns = [{ key: "label", width: 50 }, { key: "value", width: 18 }];
  headerCell(rates.getCell("A1"), "Locked rates: do not edit (2026/27)");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "SecondaryThreshold", label: "Employer NIC: secondary threshold (£)", value: SECONDARY_THRESHOLD },
    { name: "EmployerNiRate", label: "Employer NIC: rate", value: EMPLOYER_NI_RATE, pct: true },
    { name: "EmploymentAllowance", label: "Employment Allowance (£)", value: EMPLOYMENT_ALLOWANCE },
    { name: "PensionMinQualifying", label: "Auto-enrolment: lower qualifying earnings (£)", value: PENSION_MIN_QUALIFYING },
    { name: "PensionEmployerMin", label: "Minimum employer pension rate", value: PENSION_EMPLOYER_MIN_RATE, pct: true },
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

  /* ---- Your team ---- */
  const ws = wb.addWorksheet("Your team", { properties: { tabColor: { argb: ORANGE } } });
  ws.columns = [
    { key: "a", width: 30 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 36 },
    { key: "e", width: 20 },
  ];

  headerCell(ws.getCell("A1"), "Your team: edit the blue cells");
  ws.mergeCells("A1:B1");

  // Options
  labelCell(ws.getCell("A3"), "Claim Employment Allowance?");
  ws.getCell("B3").value = "Yes";
  blueInput(ws.getCell("B3"));
  ws.getCell("B3").dataValidation = { type: "list", allowBlank: false, formulae: ['"No,Yes"'] };
  wb.definedNames.add("'Your team'!$B$3", "In_EA");

  labelCell(ws.getCell("A4"), "Include minimum pension?");
  ws.getCell("B4").value = "Yes";
  blueInput(ws.getCell("B4"));
  ws.getCell("B4").dataValidation = { type: "list", allowBlank: false, formulae: ['"No,Yes"'] };
  wb.definedNames.add("'Your team'!$B$4", "In_Pension");

  labelCell(ws.getCell("A5"), "Number of employees (rows below)");
  ws.getCell("B5").value = { formula: "COUNTA(B8:B20)-COUNTBLANK(B8:B20)" } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your team'!$B$5", "NumEmployees");

  // Employee grid header
  headerCell(ws.getCell("A7"), "Role");
  headerCell(ws.getCell("B7"), "Annual salary");
  ws.getCell("A7").border = { bottom: { style: "thin" } };
  ws.getCell("B7").border = { bottom: { style: "thin" } };

  // Employee row 1 (default)
  ws.getCell("A8").value = "First hire";
  blueInput(ws.getCell("A8"));
  ws.getCell("B8").value = 30000;
  moneyFmt(ws.getCell("B8")); blueInput(ws.getCell("B8"));

  // Blank rows 2-13 for additional employees
  for (let r = 9; r <= 20; r++) {
    blueInput(ws.getCell(`A${r}`));
    moneyFmt(ws.getCell(`B${r}`)); blueInput(ws.getCell(`B${r}`));
  }

  // Derived ranges (name the salary range)
  wb.definedNames.add("'Your team'!$B$8:$B$20", "SalaryRange");

  // Summary
  headerCell(ws.getCell("D3"), "True cost build-up");
  ws.mergeCells("D3:E3");

  labelCell(ws.getCell("D4"), "Gross salaries");
  ws.getCell("E4").value = { formula: "SUM(SalaryRange)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E4"));
  wb.definedNames.add("'Your team'!$E$4", "GrossSalaries");

  labelCell(ws.getCell("D5"), "Employer NIC (before allowance)");
  ws.getCell("E5").value = {
    formula:
      "SUMPRODUCT((SalaryRange-SecondaryThreshold)*(SalaryRange>SecondaryThreshold)*EmployerNiRate)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E5"));
  wb.definedNames.add("'Your team'!$E$5", "NITotal");

  labelCell(ws.getCell("D6"), "Employment Allowance applied");
  // EA only when >=2 employees AND In_EA="Yes"
  ws.getCell("E6").value = {
    formula: 'IF(AND(NumEmployees>=2,In_EA="Yes"),MIN(EmploymentAllowance,NITotal),0)',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E6"));
  wb.definedNames.add("'Your team'!$E$6", "EAApplied");

  labelCell(ws.getCell("D7"), "Employer NIC after allowance");
  ws.getCell("E7").value = { formula: "MAX(0,NITotal-EAApplied)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E7"));
  wb.definedNames.add("'Your team'!$E$7", "NIAfterEA");

  labelCell(ws.getCell("D8"), "Employer pension (3% min)");
  ws.getCell("E8").value = {
    formula:
      'IF(In_Pension="Yes",SUMPRODUCT(MAX(0,SalaryRange-PensionMinQualifying)*(SalaryRange>PensionMinQualifying))*PensionEmployerMin,0)',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E8"));
  wb.definedNames.add("'Your team'!$E$8", "PensionTotal");

  labelCell(ws.getCell("D10"), "Total annual employment cost");
  ws.getCell("E10").value = { formula: "GrossSalaries+NIAfterEA+PensionTotal" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E10")); ws.getCell("E10").font = { bold: true };
  wb.definedNames.add("'Your team'!$E$10", "TotalCost");

  labelCell(ws.getCell("D11"), "Monthly cost");
  ws.getCell("E11").value = { formula: "TotalCost/12" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E11"));

  // EA warning note
  ws.getCell("D13").value = "Note: Employment Allowance requires at least one";
  ws.getCell("D13").font = { italic: true, color: { argb: "FF64748B" }, size: 10 };
  ws.getCell("D14").value = "non-director employee. A single-director company cannot claim it.";
  ws.getCell("D14").font = { italic: true, color: { argb: "FF64748B" }, size: 10 };

  for (let r = 4; r <= 11; r++) {
    ws.getCell(`D${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ---- Start here ---- */
  const start = wb.addWorksheet("Start here", { properties: { tabColor: { argb: SLATE_900 } } });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["True cost of hire model", true],
    ["", false],
    ["Shows the full loaded cost of your team: gross salaries, employer NIC at 15% above the", false],
    ["£5,000 secondary threshold, Employment Allowance offset, and the minimum 3% auto-enrolment", false],
    ["pension. 2026/27 rates.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your team' tab.", false],
    ["2. Enter each role and salary in the blue cells (rows 8 onwards).", false],
    ["3. Set Employment Allowance and pension toggles at the top.", false],
    ["4. All totals update automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked rates. Read 'Notes' for assumptions.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 16 : 12, color: { argb: SLATE_900 } };
  });

  /* ---- Notes ---- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "• Employer NIC 15% on earnings above £5,000 secondary threshold per employee (2026/27,",
    "  unchanged from 2025/26). Rate increased from 13.8% in April 2025.",
    "",
    "• Employment Allowance: £10,500 maximum, available only if you have at least one genuine",
    "  non-director employee. A single-director company with no other staff cannot claim it.",
    "  The £100,000 prior-year NI cap was removed from April 2025.",
    "",
    "• Auto-enrolment: 3% employer minimum on qualifying earnings (£6,240 to £50,270).",
    "  Employee contributes at least 5%. The trigger income threshold is £10,000.",
    "",
    "• This model shows the statutory floor cost. Real all-in hiring cost is typically 10-20%",
    "  higher: add equipment, software, training, recruitment fees and any bonus structure.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  // Tab order: Start here, Your team (not "Your figures" here), Rates, Notes
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your team", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
