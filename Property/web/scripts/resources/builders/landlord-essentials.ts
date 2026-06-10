/**
 * Landlord tax essentials Excel model builder.
 *
 * Produces a real, working workbook with LIVE FORMULAS:
 *   - "Start here"  : what the model is + how to use it.
 *   - "Your figures": a multi-property grid (rent / running costs / interest per
 *                     property), the £1,000 property-allowance choice, portfolio
 *                     totals, a band-aware income-tax charge on the rental profit
 *                     sitting on top of your other income, the Section 24
 *                     finance-cost credit (with its three caps), tax payable and
 *                     net cash — all computed with cell formulas (no hard-coded
 *                     results).
 *   - "Rates"       : LOCKED sheet written from the SAME constants the site math
 *                     uses (imported below) so the spreadsheet and the site can
 *                     never drift. The Your-figures formulas reference these cells.
 *   - "Notes"       : assumptions + disclaimers mirroring the on-site notes.
 *
 * The math here mirrors lib/landlordTax.ts; a golden check
 * (landlord-essentials.golden.ts) asserts the formula result equals the TS
 * compute for a sample input before the category's xlsx flag is flipped on.
 */
import ExcelJS from "exceljs";
import {
  PERSONAL_ALLOWANCE,
  PA_TAPER_START,
  PA_TAPER_END,
  BASIC_RATE_LIMIT,
  HIGHER_RATE_LIMIT,
  PROPERTY_ALLOWANCE,
} from "../../../src/lib/landlordTax";
import {
  REDUCER_RATE_2026_27,
  REDUCER_RATE_2027_28,
} from "../../../src/lib/section24";

const EMERALD = "FF059669";
const SLATE_900 = "FF0F172A";
const SLATE_100 = "FFF1F5F9";
const SLATE_50 = "FFF8FAFC";
const BLUE_INPUT = "FFDBEAFE";

const PROP_ROWS = 5; // number of editable property rows in the grid

function headerCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_900 } };
  cell.alignment = { vertical: "middle" };
}

function labelCell(cell: ExcelJS.Cell, text: string) {
  cell.value = text;
  cell.font = { bold: true, color: { argb: SLATE_900 } };
}

function moneyFmt(cell: ExcelJS.Cell) {
  cell.numFmt = "£#,##0";
}

export function build(): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Property Tax Partners";
  wb.lastModifiedBy = "Property Tax Partners";

  /* ----------------------------- Rates (locked) ---------------------------- */
  const rates = wb.addWorksheet("Rates", {
    properties: { tabColor: { argb: EMERALD } },
  });
  rates.columns = [
    { key: "label", width: 50 },
    { key: "value", width: 16 },
  ];
  headerCell(rates.getCell("A1"), "Locked rates — do not edit");
  rates.mergeCells("A1:B1");

  // The band rates depend on the chosen year (2026/27 vs 2027/28). We write BOTH
  // sets of band rates as named cells; the Your-figures sheet picks the set that
  // matches the In_Year dropdown.
  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "Basic_2026", label: "Income tax — basic rate (2026/27)", value: 0.2, pct: true },
    { name: "Higher_2026", label: "Income tax — higher rate (2026/27)", value: 0.4, pct: true },
    { name: "Additional_2026", label: "Income tax — additional rate (2026/27)", value: 0.45, pct: true },
    { name: "Basic_2027", label: "Property income — basic rate (2027/28)", value: 0.22, pct: true },
    { name: "Higher_2027", label: "Property income — higher rate (2027/28)", value: 0.42, pct: true },
    { name: "Additional_2027", label: "Property income — additional rate (2027/28)", value: 0.47, pct: true },
    { name: "Reducer_2026", label: "Section 24 finance-cost credit (2026/27)", value: REDUCER_RATE_2026_27, pct: true },
    { name: "Reducer_2027", label: "Section 24 finance-cost credit (2027/28)", value: REDUCER_RATE_2027_28, pct: true },
    { name: "PA_Full", label: "Personal allowance (£)", value: PERSONAL_ALLOWANCE },
    { name: "PA_TaperStart", label: "Personal-allowance taper start (£)", value: PA_TAPER_START },
    { name: "PA_TaperEnd", label: "Personal allowance fully withdrawn (£)", value: PA_TAPER_END },
    { name: "BasicLimit", label: "Top of basic-rate band — taxable income (£)", value: BASIC_RATE_LIMIT },
    { name: "HigherLimit", label: "Top of higher-rate band — taxable income (£)", value: HIGHER_RATE_LIMIT },
    { name: "PropAllowance", label: "Property allowance (£)", value: PROPERTY_ALLOWANCE },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0%" : "#,##0";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });
  rates.getColumn("label").alignment = { wrapText: true };
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ------------------------- Helper lookup sheet --------------------------- */
  // Hidden helper that maps the year dropdown text to the matching rate set.
  const helper = wb.addWorksheet("Lookups");
  helper.state = "veryHidden";
  // Columns: Year | Basic | Higher | Additional | Reducer
  const head: Array<[string, string]> = [
    ["A1", "Year"],
    ["B1", "Basic"],
    ["C1", "Higher"],
    ["D1", "Additional"],
    ["E1", "Reducer"],
  ];
  head.forEach(([ref, text]) => (helper.getCell(ref).value = text));
  const yearMap: Array<{ text: string; basic: string; higher: string; additional: string; reducer: string }> = [
    { text: "2026/27 (20/40/45, 20% credit)", basic: "Basic_2026", higher: "Higher_2026", additional: "Additional_2026", reducer: "Reducer_2026" },
    { text: "2027/28 (22/42/47, 22% credit)", basic: "Basic_2027", higher: "Higher_2027", additional: "Additional_2027", reducer: "Reducer_2027" },
  ];
  yearMap.forEach((y, i) => {
    const r = i + 2;
    helper.getCell(`A${r}`).value = y.text;
    helper.getCell(`B${r}`).value = { formula: y.basic } as ExcelJS.CellFormulaValue;
    helper.getCell(`C${r}`).value = { formula: y.higher } as ExcelJS.CellFormulaValue;
    helper.getCell(`D${r}`).value = { formula: y.additional } as ExcelJS.CellFormulaValue;
    helper.getCell(`E${r}`).value = { formula: y.reducer } as ExcelJS.CellFormulaValue;
  });

  /* ----------------------------- Your figures ------------------------------ */
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: EMERALD } },
  });
  ws.columns = [
    { key: "a", width: 30 }, // property name / labels
    { key: "b", width: 16 }, // rent / values
    { key: "c", width: 16 }, // running costs
    { key: "d", width: 16 }, // interest
    { key: "e", width: 18 }, // taxable profit per property
  ];

  headerCell(ws.getCell("A1"), "Your figures — edit the blue cells");
  ws.mergeCells("A1:E1");

  // --- Top inputs: other income + year ---
  labelCell(ws.getCell("A3"), "Your other taxable income (salary, pension)");
  const otherCell = ws.getCell("B3");
  otherCell.value = 40000;
  moneyFmt(otherCell);
  otherCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_INPUT } };
  otherCell.protection = { locked: false };
  wb.definedNames.add(`'Your figures'!$B$3`, "In_Other");

  labelCell(ws.getCell("A4"), "Tax year");
  const yearCell = ws.getCell("B4");
  yearCell.value = "2026/27 (20/40/45, 20% credit)";
  yearCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_INPUT } };
  yearCell.protection = { locked: false };
  ws.mergeCells("B4:D4");
  yearCell.dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"2026/27 (20/40/45, 20% credit),2027/28 (22/42/47, 22% credit)"'],
  };
  wb.definedNames.add(`'Your figures'!$B$4`, "In_Year");

  // Resolved rates from the year dropdown.
  ws.getCell("A6").value = "Basic rate";
  ws.getCell("B6").value = { formula: "VLOOKUP(In_Year,Lookups!$A$2:$E$3,2,FALSE)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B6").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$B$6`, "BasicRate");
  ws.getCell("C6").value = "Higher rate";
  ws.getCell("D6").value = { formula: "VLOOKUP(In_Year,Lookups!$A$2:$E$3,3,FALSE)" } as ExcelJS.CellFormulaValue;
  ws.getCell("D6").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$D$6`, "HigherRate");
  ws.getCell("A7").value = "Additional rate";
  ws.getCell("B7").value = { formula: "VLOOKUP(In_Year,Lookups!$A$2:$E$3,4,FALSE)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B7").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$B$7`, "AddlRate");
  ws.getCell("C7").value = "Section 24 credit rate";
  ws.getCell("D7").value = { formula: "VLOOKUP(In_Year,Lookups!$A$2:$E$3,5,FALSE)" } as ExcelJS.CellFormulaValue;
  ws.getCell("D7").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$D$7`, "ReducerRate");

  // --- The property grid (header at row 9, properties rows 10..10+PROP_ROWS-1) ---
  const gridHeaderRow = 9;
  headerCell(ws.getCell(`A${gridHeaderRow}`), "Property");
  headerCell(ws.getCell(`B${gridHeaderRow}`), "Annual rent");
  headerCell(ws.getCell(`C${gridHeaderRow}`), "Running costs");
  headerCell(ws.getCell(`D${gridHeaderRow}`), "Mortgage interest");
  headerCell(ws.getCell(`E${gridHeaderRow}`), "Taxable profit");

  const firstPropRow = gridHeaderRow + 1; // 10
  const lastPropRow = firstPropRow + PROP_ROWS - 1; // 14
  for (let r = firstPropRow; r <= lastPropRow; r++) {
    // Editable inputs (blue).
    const nameCell = ws.getCell(`A${r}`);
    nameCell.value = r === firstPropRow ? "Property 1" : "";
    nameCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_INPUT } };
    nameCell.protection = { locked: false };

    const seedRent = r === firstPropRow ? 18000 : 0;
    const seedCosts = r === firstPropRow ? 3000 : 0;
    const seedInt = r === firstPropRow ? 6000 : 0;
    [["B", seedRent], ["C", seedCosts], ["D", seedInt]].forEach(([col, seed]) => {
      const c = ws.getCell(`${col}${r}`);
      c.value = seed as number;
      moneyFmt(c);
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BLUE_INPUT } };
      c.protection = { locked: false };
    });

    // Taxable profit per property (formula): full relief if rent <= £1,000;
    // otherwise rent minus the GREATER of running costs and the £1,000 allowance.
    const e = ws.getCell(`E${r}`);
    e.value = {
      formula:
        `IF(B${r}<=PropAllowance,0,MAX(0,B${r}-MAX(C${r},PropAllowance)))`,
    } as ExcelJS.CellFormulaValue;
    moneyFmt(e);
    e.fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ----------------------------- Portfolio totals -------------------------- */
  const totalsRow = lastPropRow + 2; // 16
  labelCell(ws.getCell(`A${totalsRow}`), "Portfolio totals");
  const tRent = ws.getCell(`B${totalsRow}`);
  tRent.value = { formula: `SUM(B${firstPropRow}:B${lastPropRow})` } as ExcelJS.CellFormulaValue;
  moneyFmt(tRent);
  wb.definedNames.add(`'Your figures'!$B$${totalsRow}`, "TotRent");
  const tCosts = ws.getCell(`C${totalsRow}`);
  // Sum of expenses actually used (the greater of costs / allowance, or rent if full relief).
  tCosts.value = {
    formula: `SUMPRODUCT((B${firstPropRow}:B${lastPropRow}-E${firstPropRow}:E${lastPropRow}))`,
  } as ExcelJS.CellFormulaValue;
  moneyFmt(tCosts);
  wb.definedNames.add(`'Your figures'!$C$${totalsRow}`, "TotExpenses");
  const tInt = ws.getCell(`D${totalsRow}`);
  tInt.value = { formula: `SUM(D${firstPropRow}:D${lastPropRow})` } as ExcelJS.CellFormulaValue;
  moneyFmt(tInt);
  wb.definedNames.add(`'Your figures'!$D$${totalsRow}`, "TotInterest");
  const tProfit = ws.getCell(`E${totalsRow}`);
  tProfit.value = { formula: `SUM(E${firstPropRow}:E${lastPropRow})` } as ExcelJS.CellFormulaValue;
  moneyFmt(tProfit);
  tProfit.font = { bold: true };
  wb.definedNames.add(`'Your figures'!$E$${totalsRow}`, "TotProfit");

  /* --------------------------- Tax computation block ----------------------- */
  // We compute income tax on (other income + rental profit) and on (other income
  // alone) using a band-aware sub-calculation, then take the difference. A
  // tapered personal allowance is applied to each.
  let row = totalsRow + 2; // 18

  headerCell(ws.getCell(`A${row}`), "Income tax on your rental profit");
  ws.mergeCells(`A${row}:E${row}`);
  row++; // 19

  // Helper: total income with rentals.
  ws.getCell(`A${row}`).value = "Total income incl. rentals";
  const incWithRow = row;
  ws.getCell(`B${row}`).value = { formula: "In_Other+TotProfit" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  wb.definedNames.add(`'Your figures'!$B$${row}`, "IncWith");
  row++;

  // Tapered PA at the WITH-rentals income.
  ws.getCell(`A${row}`).value = "Personal allowance after £100k taper";
  ws.getCell(`B${row}`).value = {
    formula:
      "IF(IncWith<=PA_TaperStart,PA_Full,IF(IncWith>=PA_TaperEnd,0,MAX(0,PA_Full-ROUNDDOWN((IncWith-PA_TaperStart)/2,0))))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  wb.definedNames.add(`'Your figures'!$B$${row}`, "PA_With");
  row++;

  // Tapered PA at the OTHER-income-alone level.
  ws.getCell(`A${row}`).value = "Personal allowance on other income alone";
  ws.getCell(`B${row}`).value = {
    formula:
      "IF(In_Other<=PA_TaperStart,PA_Full,IF(In_Other>=PA_TaperEnd,0,MAX(0,PA_Full-ROUNDDOWN((In_Other-PA_TaperStart)/2,0))))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  wb.definedNames.add(`'Your figures'!$B$${row}`, "PA_Other");
  row++;

  // Tax on (other + rentals): band-banded charge on taxable income.
  ws.getCell(`A${row}`).value = "Tax on income incl. rentals";
  ws.getCell(`B${row}`).value = {
    formula: bandedTaxFormula("IncWith", "PA_With"),
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  wb.definedNames.add(`'Your figures'!$B$${row}`, "TaxWith");
  row++;

  // Tax on (other income alone).
  ws.getCell(`A${row}`).value = "Tax on other income alone";
  ws.getCell(`B${row}`).value = {
    formula: bandedTaxFormula("In_Other", "PA_Other"),
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  wb.definedNames.add(`'Your figures'!$B$${row}`, "TaxOther");
  row++;

  // Tax on the rental profit before the finance-cost credit.
  ws.getCell(`A${row}`).value = "Tax on rental profit before credit";
  ws.getCell(`B${row}`).value = { formula: "MAX(0,TaxWith-TaxOther)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  wb.definedNames.add(`'Your figures'!$B$${row}`, "TaxBeforeCredit");
  row++;

  // Section 24 finance-cost credit: reducer × lower of interest, profit, ATI.
  ws.getCell(`A${row}`).value = "Section 24 finance-cost credit (capped)";
  ws.getCell(`B${row}`).value = {
    formula: "MIN(TotInterest,MAX(0,TotProfit),MAX(0,IncWith-PA_With))*ReducerRate",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  wb.definedNames.add(`'Your figures'!$B$${row}`, "FinanceCredit");
  row++;

  // Income tax payable.
  labelCell(ws.getCell(`A${row}`), "Income tax payable on the rentals");
  ws.getCell(`B${row}`).value = { formula: "MAX(0,TaxBeforeCredit-FinanceCredit)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  ws.getCell(`B${row}`).font = { bold: true };
  wb.definedNames.add(`'Your figures'!$B$${row}`, "IncomeTax");
  row++;

  // Net cash kept.
  labelCell(ws.getCell(`A${row}`), "Net cash kept after tax & interest");
  ws.getCell(`B${row}`).value = {
    formula: "TotRent-TotExpenses-TotInterest-IncomeTax",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell(`B${row}`));
  ws.getCell(`B${row}`).font = { bold: true };
  wb.definedNames.add(`'Your figures'!$B$${row}`, "NetCash");
  row++;

  // Effective rate.
  ws.getCell(`A${row}`).value = "Effective tax rate on the profit";
  ws.getCell(`B${row}`).value = { formula: "IF(TotProfit>0,IncomeTax/TotProfit,0)" } as ExcelJS.CellFormulaValue;
  ws.getCell(`B${row}`).numFmt = "0.0%";

  ws.getColumn("a").alignment = { wrapText: true };

  /* ------------------------------ Start here ------------------------------- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 92 }];
  const startLines: Array<[string, boolean]> = [
    ["Landlord rental profit & income tax model", true],
    ["", false],
    ["This spreadsheet works out, for one property or a whole portfolio, your taxable rental profit", false],
    ["and the income tax on it — with the £1,000 property allowance, the Section 24 mortgage-interest", false],
    ["credit and your tax band all handled automatically.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Enter your other taxable income (salary, pension) and pick the tax year at the top.", false],
    ["3. Fill in one row per property: annual rent, running costs and mortgage interest (blue cells).", false],
    ["4. Everything else — taxable profit, tax, the Section 24 credit and your net cash — updates itself.", false],
    ["", false],
    ["The £1,000 property allowance is applied for you: if a property's rent is £1,000 or less it is", false],
    ["covered in full; otherwise the model deducts the greater of your actual costs and £1,000.", false],
    ["", false],
    ["The 'Rates' tab holds the locked tax figures and is the same source the website calculator uses.", false],
    ["Read the 'Notes' tab for the assumptions and what this model does NOT cover.", false],
  ];
  startLines.forEach(([text, bold], i) => {
    const c = start.getCell(`A${i + 1}`);
    c.value = text;
    if (bold) c.font = { bold: true, size: i === 0 ? 16 : 12, color: { argb: SLATE_900 } };
  });
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_100 } };
  wb.views = [
    {
      x: 0,
      y: 0,
      width: 12000,
      height: 9000,
      firstSheet: 0,
      activeTab: 0,
      visibility: "visible",
    },
  ];

  /* -------------------------------- Notes ---------------------------------- */
  const notes = wb.addWorksheet("Notes");
  notes.columns = [{ width: 100 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "• Rental profit = gross rents less allowable RUNNING costs (repairs, letting/agent fees, insurance,",
    "  ground rent, accountancy). Capital improvements are NOT deductible against income (they may reduce a",
    "  future Capital Gains Tax bill). Mortgage interest is NOT deducted from profit — see Section 24 below.",
    "",
    "• £1,000 property allowance: if a property's gross rent is £1,000 or less, the income is covered in full",
    "  and need not be declared. Above £1,000 you may deduct the £1,000 allowance INSTEAD of actual expenses",
    "  where that is better; you cannot use the allowance and also deduct expenses. The model picks the better",
    "  of the two for each property automatically.",
    "",
    "• Section 24: individual landlords cannot deduct mortgage interest / finance costs. Instead a basic-rate",
    "  tax credit is given — 20% for 2026/27, rising to 22% from 2027/28 (Finance Act 2026). The credit is",
    "  capped at the lower of the credit rate times (a) the finance costs, (b) the rental profit before finance",
    "  costs, and (c) your income above the personal allowance.",
    "",
    "• Tax bands: the rental profit is taxed ON TOP of your other income, so it falls into the right band(s),",
    "  and above £100,000 of total income the personal allowance tapers away (£1 lost per £2, gone at £125,140).",
    "  For 2026/27 the bands are 20/40/45; from 2027/28 property income in England, Wales and Northern Ireland",
    "  is taxed at 22/42/47 (Scotland is excluded and sets its own rates).",
    "",
    "• NOT modelled: National Insurance (rental income is not earnings for NI), student-loan repayments, the",
    "  High Income Child Benefit Charge, Scottish income tax rates, payments on account, or income through a",
    "  company. Figures are rounded.",
    "",
    "• This is general guidance, not advice for your specific situation. Speak to a property tax specialist",
    "  before you file or restructure.",
  ];
  noteLines.forEach((text, i) => {
    const c = notes.getCell(`A${i + 1}`);
    c.value = text;
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: SLATE_900 } };
  });

  // Order the tabs: Start here, Your figures, Rates, Notes (Lookups hidden).
  wb.worksheets.sort((a, b) => {
    const order = ["Start here", "Your figures", "Rates", "Notes", "Lookups"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return wb;
}

/**
 * A band-aware income-tax formula for a given income cell and its tapered-PA
 * cell. Returns the Excel formula string (no leading "="). Mirrors incomeTaxOn()
 * in lib/landlordTax.ts: tax the income above the PA across the basic / higher /
 * additional bands at the year's rates.
 *
 *   taxable        = MAX(0, income - pa)
 *   basicAmount    = MIN(taxable, BasicLimit)
 *   higherAmount   = MIN(MAX(0, taxable - BasicLimit), HigherLimit - BasicLimit)
 *   additionalAmt  = MAX(0, taxable - HigherLimit)
 */
function bandedTaxFormula(income: string, pa: string): string {
  const taxable = `MAX(0,${income}-${pa})`;
  const basicAmt = `MIN(${taxable},BasicLimit)`;
  const higherAmt = `MIN(MAX(0,${taxable}-BasicLimit),HigherLimit-BasicLimit)`;
  const addlAmt = `MAX(0,${taxable}-HigherLimit)`;
  return `${basicAmt}*BasicRate+${higherAmt}*HigherRate+${addlAmt}*AddlRate`;
}
