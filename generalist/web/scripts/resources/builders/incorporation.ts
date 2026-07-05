/**
 * Sole trader vs limited company comparison model builder.
 *
 * Traces soleTraderTax (via calcIncomeTaxTHP + class4) and the company leg
 * (modelExtraction/findOptimalSalary) from the compute libs.
 *
 * Hardcoded-rate note (brief §4.1): take-home-pay.ts hardcodes income-tax bands
 * locally (12570/50270/125140, 20/40/45); the incorporation builder uses those
 * same values. CT marginal slice 0.265.
 *
 * Default inputs: profit=80000, EA off.
 * Golden: ST net=57711.40, Co net=55889.88, difference=-1821.52 (sole trader wins).
 */
import ExcelJS from "exceljs";
import { UK_TAX_RATES as T } from "../../../src/lib/uk-tax-rates";

// take-home-pay.ts hardcodes these locally: builder must mirror exactly.
const THP_PA = 12570;
const THP_BASIC_LIMIT = 50270;
const THP_HIGHER_LIMIT = 125140;
const THP_BASIC_RATE = 0.20;
const THP_HIGHER_RATE = 0.40;
const THP_ADDITIONAL_RATE = 0.45;
// Class 4 rates from uk-tax-rates.ts
const C4_MAIN = T.nationalInsurance.selfEmployed.class4MainRate;
const C4_UPPER = T.nationalInsurance.selfEmployed.class4UpperRate;
const C4_LOWER = THP_PA; // Class 4 lower threshold = personal allowance
const C4_UPPER_LIMIT = THP_BASIC_LIMIT;

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
    { name: "PA", label: "Personal allowance (£)", value: THP_PA },
    { name: "BasicLimit", label: "Basic rate upper limit (£)", value: THP_BASIC_LIMIT },
    { name: "HigherLimit", label: "Higher rate upper limit (£)", value: THP_HIGHER_LIMIT },
    { name: "BasicRate", label: "Income tax: basic rate", value: THP_BASIC_RATE, pct: true },
    { name: "HigherRate", label: "Income tax: higher rate", value: THP_HIGHER_RATE, pct: true },
    { name: "AdditionalRate", label: "Income tax: additional rate", value: THP_ADDITIONAL_RATE, pct: true },
    { name: "C4Main", label: "Class 4 NIC: main rate", value: C4_MAIN, pct: true },
    { name: "C4Upper", label: "Class 4 NIC: upper rate", value: C4_UPPER, pct: true },
    { name: "C4Lower", label: "Class 4 NIC: lower threshold (£)", value: C4_LOWER },
    { name: "C4UpperLimit", label: "Class 4 NIC: upper threshold (£)", value: C4_UPPER_LIMIT },
    { name: "SecondaryThreshold", label: "Employer NIC: secondary threshold (£)", value: T.nationalInsurance.employer.secondaryThreshold },
    { name: "EmployerNiRate", label: "Employer NIC: rate", value: T.nationalInsurance.employer.rate, pct: true },
    { name: "EmploymentAllowance", label: "Employment Allowance (£)", value: T.nationalInsurance.employer.employmentAllowance },
    { name: "DividendAllowance", label: "Dividend allowance (£)", value: T.dividendTax.allowance },
    { name: "DividendBasicRate", label: "Dividend tax: basic rate", value: T.dividendTax.basicRate, pct: true },
    { name: "DividendHigherRate", label: "Dividend tax: higher rate", value: T.dividendTax.higherRate, pct: true },
    { name: "DividendAdditionalRate", label: "Dividend tax: additional rate", value: T.dividendTax.additionalRate, pct: true },
    { name: "CTSmallRate", label: "Corporation Tax: small profits rate", value: T.corporationTax.smallProfitsRate, pct: true },
    { name: "CTMainRate", label: "Corporation Tax: main rate", value: T.corporationTax.mainRate, pct: true },
    { name: "CTSmallLimit", label: "Corporation Tax: small profits upper limit (£)", value: T.corporationTax.smallProfitsUpperLimit },
    { name: "CTMainLimit", label: "Corporation Tax: main rate lower limit (£)", value: T.corporationTax.mainRateLowerLimit },
    { name: "CTMarginalRate", label: "Corporation Tax: marginal slice rate (hardcoded 0.265)", value: 0.265, pct: true },
    { name: "OptimalSalary", label: "Optimal director salary (£): no EA", value: 12570 },
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

  /* ---- Your figures ---- */
  const ws = wb.addWorksheet("Your figures", { properties: { tabColor: { argb: ORANGE } } });
  ws.columns = [
    { key: "a", width: 36 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 28 },
    { key: "e", width: 20 },
    { key: "f", width: 20 },
  ];

  headerCell(ws.getCell("A1"), "Your figures: edit the blue cells");
  ws.mergeCells("A1:B1");

  // Inputs
  labelCell(ws.getCell("A3"), "Annual profit");
  ws.getCell("B3").value = 80000; moneyFmt(ws.getCell("B3")); blueInput(ws.getCell("B3"));
  wb.definedNames.add("'Your figures'!$B$3", "Profit");

  labelCell(ws.getCell("A4"), "Claim Employment Allowance (company leg)");
  ws.getCell("B4").value = "No";
  blueInput(ws.getCell("B4"));
  ws.getCell("B4").dataValidation = { type: "list", allowBlank: false, formulae: ['"No,Yes"'] };
  wb.definedNames.add("'Your figures'!$B$4", "In_EA");

  // --- Sole trader leg ---
  headerCell(ws.getCell("A6"), "Sole trader");
  ws.mergeCells("A6:B6");

  labelCell(ws.getCell("A7"), "Income tax");
  // Income tax on profit using THP bands (hardcoded to match take-home-pay.ts)
  ws.getCell("B7").value = {
    formula:
      "MAX(0,MIN(MAX(0,Profit-PA),BasicLimit-PA)*BasicRate+MAX(0,MIN(MAX(0,Profit-PA)-(BasicLimit-PA),HigherLimit-BasicLimit))*HigherRate+MAX(0,MAX(0,Profit-PA)-(HigherLimit-PA))*AdditionalRate)",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B7"));
  wb.definedNames.add("'Your figures'!$B$7", "STIncomeTax");

  labelCell(ws.getCell("A8"), "Class 4 NIC");
  ws.getCell("B8").value = {
    formula: "(MIN(Profit,C4UpperLimit)-C4Lower)*C4Main+MAX(0,Profit-C4UpperLimit)*C4Upper",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B8"));
  wb.definedNames.add("'Your figures'!$B$8", "STClass4");

  labelCell(ws.getCell("A9"), "Net cash (sole trader)");
  ws.getCell("B9").value = { formula: "Profit-STIncomeTax-STClass4" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B9"));
  ws.getCell("B9").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$9", "STNet");

  // --- Company leg (optimal salary £12,570 no EA) ---
  headerCell(ws.getCell("D6"), "Limited company");
  ws.mergeCells("D6:F6");

  labelCell(ws.getCell("D7"), "Director salary");
  ws.getCell("E7").value = { formula: "OptimalSalary" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E7"));
  wb.definedNames.add("'Your figures'!$E$7", "CoSalary");

  labelCell(ws.getCell("D8"), "Employer NIC");
  ws.getCell("E8").value = {
    formula: 'MAX(0,(CoSalary-SecondaryThreshold)*EmployerNiRate - IF(In_EA="Yes",EmploymentAllowance,0))',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E8"));
  wb.definedNames.add("'Your figures'!$E$8", "CoEmployerNi");

  labelCell(ws.getCell("D9"), "Profit after payroll");
  ws.getCell("E9").value = { formula: "Profit-CoSalary-CoEmployerNi" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E9"));
  wb.definedNames.add("'Your figures'!$E$9", "CoProfitAfter");

  labelCell(ws.getCell("D10"), "Corporation tax");
  ws.getCell("E10").value = {
    formula:
      "IF(CoProfitAfter<=0,0,IF(CoProfitAfter<=CTSmallLimit,CoProfitAfter*CTSmallRate,IF(CoProfitAfter>=CTMainLimit,CoProfitAfter*CTMainRate,CTSmallLimit*CTSmallRate+(CoProfitAfter-CTSmallLimit)*CTMarginalRate)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E10"));
  wb.definedNames.add("'Your figures'!$E$10", "CoCorporationTax");

  labelCell(ws.getCell("D11"), "Dividend paid");
  ws.getCell("E11").value = { formula: "MAX(0,CoProfitAfter-CoCorporationTax)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E11"));
  wb.definedNames.add("'Your figures'!$E$11", "CoDividend");

  labelCell(ws.getCell("D12"), "Dividend tax");
  ws.getCell("E12").value = {
    formula:
      "IF(CoDividend<=0,0,LET(pa,PA,paUsedSal,MIN(CoSalary,pa),paLeft,MAX(0,pa-paUsedSal),taxableDiv,MAX(0,CoDividend-paLeft-DividendAllowance),basicCap,BasicLimit-PA,higherCap,HigherLimit-BasicLimit,salInBasic,MIN(MAX(0,CoSalary-pa),basicCap),salInHigher,MIN(MAX(0,CoSalary-pa-salInBasic),higherCap),remBasic,MAX(0,basicCap-salInBasic),remHigher,MAX(0,higherCap-salInHigher),inBasic,MIN(taxableDiv,remBasic),inHigher,MIN(taxableDiv-inBasic,remHigher),inAdd,MAX(0,taxableDiv-inBasic-inHigher),inBasic*DividendBasicRate+inHigher*DividendHigherRate+inAdd*DividendAdditionalRate))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E12"));
  wb.definedNames.add("'Your figures'!$E$12", "CoDividendTax");

  labelCell(ws.getCell("D13"), "Net cash (company route)");
  ws.getCell("E13").value = {
    formula: "CoSalary+CoDividend-CoDividendTax",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E13"));
  ws.getCell("E13").font = { bold: true };
  wb.definedNames.add("'Your figures'!$E$13", "CoNet");

  // Difference
  headerCell(ws.getCell("A15"), "The difference");
  ws.mergeCells("A15:B15");
  labelCell(ws.getCell("A16"), "Company net minus sole trader net");
  ws.getCell("B16").value = { formula: "CoNet-STNet" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B16"));
  ws.getCell("B16").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$16", "Difference");

  labelCell(ws.getCell("A17"), "(negative = sole trader keeps more)");
  ws.getCell("A17").font = { italic: true, color: { argb: "FF64748B" }, size: 10 };

  // Light bg
  for (let r = 7; r <= 13; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
    ws.getCell(`D${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ---- Start here ---- */
  const start = wb.addWorksheet("Start here", { properties: { tabColor: { argb: SLATE_900 } } });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["Sole trader vs limited company comparison model", true],
    ["", false],
    ["Shows, for the same annual profit, the net cash position as a sole trader versus a", false],
    ["limited company director taking a salary and dividends. Uses 2026/27 tax rates.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit only the blue cells: annual profit and Employment Allowance.", false],
    ["3. All figures update automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked 2026/27 rates. The 'Notes' tab covers assumptions.", false],
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
    "• Sole trader: income tax using 2026/27 bands (PA £12,570; basic to £50,270 at 20%; higher to",
    "  £125,140 at 40%; additional above at 45%). Class 4 NIC 6% on profits £12,570 to £50,270;",
    "  2% above. Class 2 NIC was removed from 6 April 2024 and is not shown.",
    "",
    "• Company: director salary set at the optimal £12,570 (full personal allowance, avoids",
    "  employee NIC). Employment Allowance is shown only if you select 'Yes' and have a genuine",
    "  non-director employee. A single-director company cannot claim the allowance.",
    "",
    "• The full distributable profit is taken as dividend. In practice you may retain some profit.",
    "",
    "• This model ignores CGT and goodwill on incorporation, s.162 incorporation relief, and the",
    "  admin cost of running a company. It shows the annual tax gap only.",
    "",
    "• Speak to a specialist before incorporating. The tax gap is one input into a wider decision.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: 0, visibility: "visible" }];

  return wb;
}
