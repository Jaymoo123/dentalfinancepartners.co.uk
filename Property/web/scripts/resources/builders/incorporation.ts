/**
 * Incorporation Excel model builder.
 *
 * Produces a real, working workbook with LIVE FORMULAS for the "stay personal vs
 * incorporate" decision:
 *   - "Start here"  : what the model is + how to use it.
 *   - "Your figures": user inputs (property value, base cost, rents, interest, other
 *                     costs, band, year, s.162 relief, extraction) and the full
 *                     upfront-cost (CGT + SDLT) + annual-saving + break-even model,
 *                     all computed with cell formulas (no hard-coded results).
 *   - "Rates"       : LOCKED sheet written from the SAME constants the site math
 *                     uses (imported below) so the spreadsheet and the site can
 *                     never drift. The Your-figures formulas reference these cells.
 *   - "Notes"       : assumptions + disclaimers mirroring the on-site notes.
 *
 * The math here intentionally mirrors lib/incorporation.ts (which reuses cgt.ts,
 * sdlt.ts, section24.ts, corpTax.ts and dividendTax.ts) cell-for-cell; a golden
 * check asserts the formula result equals the TS compute for a sample input before
 * the category's xlsx flag is flipped on.
 */
import ExcelJS from "exceljs";
import {
  CGT_ANNUAL_EXEMPT_AMOUNT,
  CGT_RESIDENTIAL_BASIC,
  CGT_RESIDENTIAL_HIGHER,
} from "../../../src/lib/cgt";
import {
  STANDARD_SDLT_BANDS,
  ADDITIONAL_DWELLING_SURCHARGE,
} from "../../../src/lib/sdlt";
import {
  INCOME_TAX_RATES,
  REDUCER_RATE_2026_27,
  REDUCER_RATE_2027_28,
} from "../../../src/lib/section24";
import {
  SMALL_PROFITS_RATE,
  MAIN_RATE,
  CT_LOWER_LIMIT,
  CT_UPPER_LIMIT,
  CT_MARGINAL_FRACTION,
} from "../../../src/lib/corpTax";
import {
  DIV_BASIC,
  DIV_HIGHER,
  DIV_ADDITIONAL,
} from "../../../src/lib/dividendTax";

const EMERALD = "FF059669";
const SLATE_900 = "FF0F172A";
const SLATE_100 = "FFF1F5F9";
const SLATE_50 = "FFF8FAFC";

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

  // Named single cells so the Your-figures sheet can reference them by name.
  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "Rate_Basic", label: "Income tax — basic rate", value: INCOME_TAX_RATES.basic, pct: true },
    { name: "Rate_Higher", label: "Income tax — higher rate", value: INCOME_TAX_RATES.higher, pct: true },
    { name: "Rate_Additional", label: "Income tax — additional rate", value: INCOME_TAX_RATES.additional, pct: true },
    { name: "Reducer_2026", label: "Section 24 finance-cost credit (2026/27)", value: REDUCER_RATE_2026_27, pct: true },
    { name: "Reducer_2027", label: "Section 24 finance-cost credit (2027/28)", value: REDUCER_RATE_2027_28, pct: true },
    { name: "CGT_AEA", label: "CGT annual exempt amount (£)", value: CGT_ANNUAL_EXEMPT_AMOUNT },
    { name: "CGT_Basic", label: "CGT residential — basic rate", value: CGT_RESIDENTIAL_BASIC, pct: true },
    { name: "CGT_Higher", label: "CGT residential — higher rate", value: CGT_RESIDENTIAL_HIGHER, pct: true },
    { name: "SDLT_Surcharge", label: "SDLT additional-dwelling surcharge", value: ADDITIONAL_DWELLING_SURCHARGE, pct: true },
    { name: "CT_Small", label: "Corporation Tax — small profits rate", value: SMALL_PROFITS_RATE, pct: true },
    { name: "CT_Main", label: "Corporation Tax — main rate", value: MAIN_RATE, pct: true },
    { name: "CT_Lower", label: "Corporation Tax — lower limit (£)", value: CT_LOWER_LIMIT },
    { name: "CT_Upper", label: "Corporation Tax — upper limit (£)", value: CT_UPPER_LIMIT },
    { name: "CT_Fraction", label: "Corporation Tax — marginal fraction", value: CT_MARGINAL_FRACTION },
    { name: "Div_Basic", label: "Dividend tax — basic rate", value: DIV_BASIC, pct: true },
    { name: "Div_Higher", label: "Dividend tax — higher rate", value: DIV_HIGHER, pct: true },
    { name: "Div_Additional", label: "Dividend tax — additional rate", value: DIV_ADDITIONAL, pct: true },
  ];

  rateRows.forEach((r, i) => {
    const row = i + 2;
    labelCell(rates.getCell(`A${row}`), r.label);
    const vc = rates.getCell(`B${row}`);
    vc.value = r.value;
    vc.numFmt = r.pct ? "0%" : "#,##0.######";
    wb.definedNames.add(`Rates!$B$${row}`, r.name);
  });

  // --- SDLT band table (each rate applies only to its slice) ---
  // Written from STANDARD_SDLT_BANDS so the SDLT formula and the site agree. Each
  // row carries its band's LOWER and UPPER threshold so the marginal SDLT formula
  // is a clean SUMPRODUCT(rate, slice) with slice = MAX(0, MIN(price,upper)-lower).
  const sdltHeaderRow = rateRows.length + 3; // a blank row, then the heading
  headerCell(rates.getCell(`A${sdltHeaderRow}`), "Standard SDLT bands (England & NI)");
  rates.mergeCells(`A${sdltHeaderRow}:B${sdltHeaderRow}`);
  labelCell(rates.getCell(`A${sdltHeaderRow + 1}`), "Lower threshold (£)");
  labelCell(rates.getCell(`B${sdltHeaderRow + 1}`), "Upper threshold (£)");
  labelCell(rates.getCell(`C${sdltHeaderRow + 1}`), "Rate");
  // Infinity cannot live in a cell — represent the top band's upper threshold as a
  // very large number so the marginal SDLT formula caps the price within it.
  const SDLT_TOP = 1_000_000_000;
  const sdltFirstRow = sdltHeaderRow + 2;
  let prevUpper = 0;
  STANDARD_SDLT_BANDS.forEach((b, i) => {
    const row = sdltFirstRow + i;
    const upper = Number.isFinite(b.upTo) ? b.upTo : SDLT_TOP;
    rates.getCell(`A${row}`).value = prevUpper; // this band's lower threshold
    rates.getCell(`A${row}`).numFmt = "#,##0";
    rates.getCell(`B${row}`).value = upper; // this band's upper threshold
    rates.getCell(`B${row}`).numFmt = "#,##0";
    rates.getCell(`C${row}`).value = b.rate;
    rates.getCell(`C${row}`).numFmt = "0%";
    prevUpper = upper;
  });
  const sdltLastRow = sdltFirstRow + STANDARD_SDLT_BANDS.length - 1;
  // Name the band columns so the Your-figures SDLT formula can reference them.
  wb.definedNames.add(`Rates!$A$${sdltFirstRow}:$A$${sdltLastRow}`, "SDLT_Lowers");
  wb.definedNames.add(`Rates!$B$${sdltFirstRow}:$B$${sdltLastRow}`, "SDLT_Uppers");
  wb.definedNames.add(`Rates!$C$${sdltFirstRow}:$C$${sdltLastRow}`, "SDLT_Rates");

  // Frozen income-band thresholds used to place the CGT gain and the dividend in
  // the bands (mirroring cgt.ts and dividendTax.ts). These are statutory thresholds
  // referenced by both modules; written here so the dividend stacking matches.
  const thresholds: Array<{ name: string; label: string; value: number }> = [
    { name: "PersonalAllowance", label: "Personal allowance (£)", value: 12_570 },
    { name: "BasicRateBand", label: "Basic-rate band, CGT (£)", value: 37_700 },
    { name: "DividendAllowance", label: "Dividend allowance (£)", value: 500 },
    { name: "BasicRateTop", label: "Top of basic-rate band, total income (£)", value: 50_270 },
    { name: "HigherRateTop", label: "Additional-rate threshold, total income (£)", value: 125_140 },
  ];
  let thrRow = sdltLastRow + 2;
  for (const t of thresholds) {
    labelCell(rates.getCell(`A${thrRow}`), t.label);
    rates.getCell(`B${thrRow}`).value = t.value;
    rates.getCell(`B${thrRow}`).numFmt = "#,##0";
    wb.definedNames.add(`Rates!$B$${thrRow}`, t.name);
    thrRow++;
  }

  rates.getColumn("label").alignment = { wrapText: true };
  // Protect the rates sheet so the locked figures cannot be edited in Excel.
  rates.protect("", { selectLockedCells: true, selectUnlockedCells: true });

  /* ------------------------- Helper lookup sheet --------------------------- */
  // Hidden helper mapping the band/year/relief/extraction dropdown text to a rate
  // or flag the formulas can use.
  const helper = wb.addWorksheet("Lookups");
  helper.state = "veryHidden";
  helper.getCell("A1").value = "Band";
  helper.getCell("B1").value = "IncomeRate";
  helper.getCell("C1").value = "DivRate";
  const bandMap: Array<[string, string, string]> = [
    ["Basic rate (20%)", "Rate_Basic", "Div_Basic"],
    ["Higher rate (40%)", "Rate_Higher", "Div_Higher"],
    ["Additional rate (45%)", "Rate_Additional", "Div_Additional"],
  ];
  bandMap.forEach(([text, incName, divName], i) => {
    helper.getCell(`A${i + 2}`).value = text;
    helper.getCell(`B${i + 2}`).value = { formula: incName } as ExcelJS.CellFormulaValue;
    helper.getCell(`C${i + 2}`).value = { formula: divName } as ExcelJS.CellFormulaValue;
  });

  helper.getCell("E1").value = "Year";
  helper.getCell("F1").value = "Reducer";
  const yearMap: Array<[string, string]> = [
    ["2026/27 (20% credit)", "Reducer_2026"],
    ["2027/28 (22% credit)", "Reducer_2027"],
  ];
  yearMap.forEach(([text, name], i) => {
    helper.getCell(`E${i + 2}`).value = text;
    helper.getCell(`F${i + 2}`).value = { formula: name } as ExcelJS.CellFormulaValue;
  });

  helper.getCell("H1").value = "Relief";
  helper.getCell("I1").value = "Flag";
  const reliefMap: Array<[string, number]> = [
    ["No — pay CGT on transfer", 0],
    ["Yes — s.162 relief claimed", 1],
  ];
  reliefMap.forEach(([text, flag], i) => {
    helper.getCell(`H${i + 2}`).value = text;
    helper.getCell(`I${i + 2}`).value = flag;
  });

  helper.getCell("K1").value = "Extraction";
  helper.getCell("L1").value = "Flag";
  const extractMap: Array<[string, number]> = [
    ["Draw it all out as dividends", 0],
    ["Retain and reinvest in the company", 1],
  ];
  extractMap.forEach(([text, flag], i) => {
    helper.getCell(`K${i + 2}`).value = text;
    helper.getCell(`L${i + 2}`).value = flag;
  });

  /* ----------------------------- Your figures ------------------------------ */
  const ws = wb.addWorksheet("Your figures", {
    properties: { tabColor: { argb: EMERALD } },
  });
  ws.columns = [
    { key: "a", width: 48 },
    { key: "b", width: 18 },
    { key: "c", width: 4 },
    { key: "d", width: 48 },
    { key: "e", width: 18 },
  ];

  headerCell(ws.getCell("A1"), "Your figures — edit the blue cells");
  ws.mergeCells("A1:B1");

  // --- Inputs (unlocked) ---
  const inputRows: Array<{ row: number; label: string; value: number | string; name: string; money?: boolean }> = [
    { row: 3, label: "Current property value", value: 300000, name: "In_Value", money: true },
    { row: 4, label: "Original purchase price (base cost)", value: 200000, name: "In_Base", money: true },
    { row: 5, label: "Buying / improvement costs (reduce the gain)", value: 0, name: "In_Costs", money: true },
    { row: 6, label: "Annual rental income", value: 24000, name: "In_Rent", money: true },
    { row: 7, label: "Annual mortgage interest", value: 9000, name: "In_Interest", money: true },
    { row: 8, label: "Other running costs", value: 3000, name: "In_Other", money: true },
    { row: 9, label: "Other taxable income (for the CGT band split)", value: 0, name: "In_OtherIncome", money: true },
    { row: 10, label: "Your income tax band", value: "Higher rate (40%)", name: "In_Band" },
    { row: 11, label: "Tax year", value: "2026/27 (20% credit)", name: "In_Year" },
    { row: 12, label: "Claim s.162 incorporation relief?", value: "No — pay CGT on transfer", name: "In_Relief" },
    { row: 13, label: "Profit you take out of the company", value: "Draw it all out as dividends", name: "In_Extract" },
  ];
  for (const ir of inputRows) {
    labelCell(ws.getCell(`A${ir.row}`), ir.label);
    const c = ws.getCell(`B${ir.row}`);
    c.value = ir.value;
    if (ir.money) moneyFmt(c);
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
    c.protection = { locked: false };
    wb.definedNames.add(`'Your figures'!$B$${ir.row}`, ir.name);
  }
  // Dropdowns.
  ws.getCell("B10").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"Basic rate (20%),Higher rate (40%),Additional rate (45%)"'],
  };
  ws.getCell("B11").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"2026/27 (20% credit),2027/28 (22% credit)"'],
  };
  ws.getCell("B12").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"No — pay CGT on transfer,Yes — s.162 relief claimed"'],
  };
  ws.getCell("B13").dataValidation = {
    type: "list",
    allowBlank: false,
    formulae: ['"Draw it all out as dividends,Retain and reinvest in the company"'],
  };

  // --- Resolved rates / flags (from the dropdowns) ---
  labelCell(ws.getCell("A15"), "Marginal income tax rate");
  ws.getCell("B15").value = { formula: "VLOOKUP(In_Band,Lookups!$A$2:$C$4,2,FALSE)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B15").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$B$15`, "MarginalRate");

  labelCell(ws.getCell("A16"), "Section 24 finance-cost credit rate");
  ws.getCell("B16").value = { formula: "VLOOKUP(In_Year,Lookups!$E$2:$F$3,2,FALSE)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B16").numFmt = "0%";
  wb.definedNames.add(`'Your figures'!$B$16`, "ReducerRate");

  labelCell(ws.getCell("A17"), "Dividend tax rate (your band)");
  ws.getCell("B17").value = { formula: "VLOOKUP(In_Band,Lookups!$A$2:$C$4,3,FALSE)" } as ExcelJS.CellFormulaValue;
  ws.getCell("B17").numFmt = "0.00%";
  wb.definedNames.add(`'Your figures'!$B$17`, "DivRate");

  labelCell(ws.getCell("A18"), "s.162 relief flag (1 = CGT deferred)");
  ws.getCell("B18").value = { formula: "VLOOKUP(In_Relief,Lookups!$H$2:$I$3,2,FALSE)" } as ExcelJS.CellFormulaValue;
  wb.definedNames.add(`'Your figures'!$B$18`, "ReliefFlag");

  labelCell(ws.getCell("A19"), "Retain-in-company flag (1 = no dividend)");
  ws.getCell("B19").value = { formula: "VLOOKUP(In_Extract,Lookups!$K$2:$L$3,2,FALSE)" } as ExcelJS.CellFormulaValue;
  wb.definedNames.add(`'Your figures'!$B$19`, "RetainFlag");

  /* --- UPFRONT COST: CGT + SDLT (column A/B) --- */
  headerCell(ws.getCell("A21"), "Upfront cost — moving the property into a company");
  ws.mergeCells("A21:B21");

  ws.getCell("A22").value = "Chargeable gain (value − base − costs)";
  ws.getCell("B22").value = { formula: "MAX(0,In_Value-In_Base-In_Costs)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B22"));
  wb.definedNames.add(`'Your figures'!$B$22`, "Gain");

  ws.getCell("A23").value = "Taxable gain (after £3,000 annual exempt amount)";
  ws.getCell("B23").value = { formula: "MAX(0,Gain-CGT_AEA)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B23"));
  wb.definedNames.add(`'Your figures'!$B$23`, "TaxableGain");

  ws.getCell("A24").value = "Unused basic-rate band (after other income)";
  ws.getCell("B24").value = {
    formula: "MAX(0,BasicRateBand-MAX(0,In_OtherIncome-PersonalAllowance))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B24"));
  wb.definedNames.add(`'Your figures'!$B$24`, "UnusedBand");

  ws.getCell("A25").value = "CGT on transfer (18% in band, 24% above)";
  // gain at basic rate up to the unused band, the rest at the higher residential rate.
  ws.getCell("B25").value = {
    formula:
      "MIN(TaxableGain,UnusedBand)*CGT_Basic+MAX(0,TaxableGain-UnusedBand)*CGT_Higher",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B25"));
  wb.definedNames.add(`'Your figures'!$B$25`, "CgtFull");

  ws.getCell("A26").value = "CGT actually due (£0 if s.162 relief claimed)";
  ws.getCell("B26").value = { formula: "IF(ReliefFlag=1,0,CgtFull)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B26"));
  wb.definedNames.add(`'Your figures'!$B$26`, "CgtCost");

  ws.getCell("A27").value = "SDLT — standard bands (marginal)";
  // Marginal SDLT: sum over bands of rate × slice, where slice for each band is
  // MAX(0, MIN(price, upper) − lower). SUMPRODUCT evaluates the arrays natively.
  ws.getCell("B27").value = {
    formula:
      "SUMPRODUCT(SDLT_Rates,(MIN(In_Value,SDLT_Uppers)>SDLT_Lowers)*(MIN(In_Value,SDLT_Uppers)-SDLT_Lowers))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B27"));
  wb.definedNames.add(`'Your figures'!$B$27`, "SdltStandard");

  ws.getCell("A28").value = "SDLT — additional-dwelling surcharge (5%)";
  ws.getCell("B28").value = { formula: "In_Value*SDLT_Surcharge" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B28"));
  wb.definedNames.add(`'Your figures'!$B$28`, "SdltSurcharge");

  ws.getCell("A29").value = "SDLT total";
  ws.getCell("B29").value = { formula: "SdltStandard+SdltSurcharge" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B29"));
  wb.definedNames.add(`'Your figures'!$B$29`, "SdltCost");

  labelCell(ws.getCell("A30"), "Total upfront cost (CGT + SDLT)");
  ws.getCell("B30").value = { formula: "CgtCost+SdltCost" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B30"));
  wb.definedNames.add(`'Your figures'!$B$30`, "UpfrontCost");

  /* --- ANNUAL: personal (Section 24) vs company (column D/E) --- */
  headerCell(ws.getCell("D21"), "Annual tax — stay personal vs company");
  ws.mergeCells("D21:E21");

  // Personal under Section 24.
  ws.getCell("D22").value = "Rental profit before interest";
  ws.getCell("E22").value = { formula: "In_Rent-In_Other" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E22"));
  wb.definedNames.add(`'Your figures'!$E$22`, "ProfitBeforeFinance");

  ws.getCell("D23").value = "Personal income tax before credit";
  ws.getCell("E23").value = { formula: "MAX(0,ProfitBeforeFinance)*MarginalRate" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E23"));
  wb.definedNames.add(`'Your figures'!$E$23`, "PersBefore");

  ws.getCell("D24").value = "Section 24 finance-cost credit (capped)";
  ws.getCell("E24").value = {
    formula: "MIN(In_Interest,MAX(0,ProfitBeforeFinance))*ReducerRate",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E24"));
  wb.definedNames.add(`'Your figures'!$E$24`, "PersCredit");

  labelCell(ws.getCell("D25"), "Personal income tax (per year)");
  ws.getCell("E25").value = { formula: "MAX(0,PersBefore-PersCredit)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E25"));
  wb.definedNames.add(`'Your figures'!$E$25`, "PersonalTax");

  // Company.
  ws.getCell("D26").value = "Company profit (interest deducted in full)";
  ws.getCell("E26").value = { formula: "MAX(0,ProfitBeforeFinance-In_Interest)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E26"));
  wb.definedNames.add(`'Your figures'!$E$26`, "CoProfit");

  ws.getCell("D27").value = "Corporation Tax";
  ws.getCell("E27").value = {
    formula:
      "IF(CoProfit<=0,0,IF(CoProfit<=CT_Lower,CoProfit*CT_Small,IF(CoProfit>=CT_Upper,CoProfit*CT_Main,CoProfit*CT_Main-(CT_Upper-CoProfit)*CT_Fraction)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E27"));
  wb.definedNames.add(`'Your figures'!$E$27`, "CoTax");

  // Dividend drawn = post-CT profit (0 if retained). The personal tax on it is
  // computed faithfully in the "Dividend tax detail" block below (rows 36-46),
  // mirroring dividendTax.ts (unused PA, £500 allowance, band stacking).
  ws.getCell("D28").value = "Dividend tax on extracting profit (0 if retained)";
  ws.getCell("E28").value = { formula: "IF(RetainFlag=1,0,DivTaxDetail)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E28"));
  wb.definedNames.add(`'Your figures'!$E$28`, "DivTax");

  labelCell(ws.getCell("D29"), "Total company tax (CT + dividends, per year)");
  ws.getCell("E29").value = { formula: "CoTax+DivTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E29"));
  wb.definedNames.add(`'Your figures'!$E$29`, "CompanyTax");

  /* --- Dividend tax detail (mirrors dividendTax.ts cell-for-cell) --- */
  // Dividends are the top slice of income: other income fills the personal allowance
  // and the bands first, then the dividend stacks on top. PA + £500 dividend
  // allowance are tax-free; the rest is taxed at 10.75% / 35.75% / 39.35% by band (2026/27, FA 2026 s.4).
  headerCell(ws.getCell("A36"), "Dividend tax detail (if you extract profit)");
  ws.mergeCells("A36:B36");

  ws.getCell("A37").value = "Dividend drawn (post-CT profit)";
  ws.getCell("B37").value = { formula: "MAX(0,CoProfit-CoTax)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B37"));
  wb.definedNames.add(`'Your figures'!$B$37`, "DivDrawn");

  ws.getCell("A38").value = "Unused personal allowance";
  ws.getCell("B38").value = { formula: "MAX(0,PersonalAllowance-MAX(0,In_OtherIncome))" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B38"));
  wb.definedNames.add(`'Your figures'!$B$38`, "UnusedPA");

  ws.getCell("A39").value = "Other taxable income (above PA)";
  ws.getCell("B39").value = { formula: "MAX(0,In_OtherIncome-PersonalAllowance)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B39"));
  wb.definedNames.add(`'Your figures'!$B$39`, "OtherTaxable");

  ws.getCell("A40").value = "Dividend after PA";
  ws.getCell("B40").value = { formula: "MAX(0,DivDrawn-UnusedPA)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B40"));
  wb.definedNames.add(`'Your figures'!$B$40`, "DivAfterPA");

  ws.getCell("A41").value = "Dividend allowance used (tax-free)";
  ws.getCell("B41").value = { formula: "MIN(DivAfterPA,DividendAllowance)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B41"));
  wb.definedNames.add(`'Your figures'!$B$41`, "AllowanceUsed");

  ws.getCell("A42").value = "Taxable dividend";
  ws.getCell("B42").value = { formula: "MAX(0,DivAfterPA-DividendAllowance)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B42"));
  wb.definedNames.add(`'Your figures'!$B$42`, "TaxableDiv");

  // Position where the taxable dividend starts stacking = other taxable income +
  // the (tax-free) allowance used. Band limits are measured above the PA.
  ws.getCell("A43").value = "Taxed at basic dividend rate (10.75%)";
  ws.getCell("B43").value = {
    formula: "MAX(0,MIN(TaxableDiv,(BasicRateTop-PersonalAllowance)-(OtherTaxable+AllowanceUsed)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B43"));
  wb.definedNames.add(`'Your figures'!$B$43`, "DivAtBasic");

  ws.getCell("A44").value = "Taxed at higher dividend rate (35.75%)";
  ws.getCell("B44").value = {
    formula:
      "MAX(0,MIN(TaxableDiv-DivAtBasic,(HigherRateTop-PersonalAllowance)-MAX(OtherTaxable+AllowanceUsed,BasicRateTop-PersonalAllowance)))",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B44"));
  wb.definedNames.add(`'Your figures'!$B$44`, "DivAtHigher");

  ws.getCell("A45").value = "Taxed at additional dividend rate (39.35%)";
  ws.getCell("B45").value = { formula: "MAX(0,TaxableDiv-DivAtBasic-DivAtHigher)" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B45"));
  wb.definedNames.add(`'Your figures'!$B$45`, "DivAtAdditional");

  labelCell(ws.getCell("A46"), "Dividend tax total");
  ws.getCell("B46").value = {
    formula: "DivAtBasic*Div_Basic+DivAtHigher*Div_Higher+DivAtAdditional*Div_Additional",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B46"));
  wb.definedNames.add(`'Your figures'!$B$46`, "DivTaxDetail");

  /* --- The decision --- */
  headerCell(ws.getCell("D31"), "The decision");
  ws.mergeCells("D31:E31");

  ws.getCell("D32").value = "Annual saving (personal − company tax)";
  ws.getCell("E32").value = { formula: "PersonalTax-CompanyTax" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("E32"));
  wb.definedNames.add(`'Your figures'!$E$32`, "AnnualSaving");

  labelCell(ws.getCell("D33"), "Break-even (years to recover the upfront cost)");
  ws.getCell("E33").value = {
    formula: 'IF(AnnualSaving>0,UpfrontCost/AnnualSaving,"Never")',
  } as ExcelJS.CellFormulaValue;
  ws.getCell("E33").numFmt = "0.0";

  ws.getCell("D34").value = "Worth incorporating on these figures?";
  ws.getCell("E34").value = { formula: 'IF(AnnualSaving>0,"Saves tax each year","No saving")' } as ExcelJS.CellFormulaValue;

  // Light styling on the bodies.
  for (let r = 22; r <= 30; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }
  for (let r = 37; r <= 46; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }
  for (let r = 22; r <= 34; r++) {
    ws.getCell(`D${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }
  ws.getColumn("a").alignment = { wrapText: true };
  ws.getColumn("d").alignment = { wrapText: true };

  /* ------------------------------ Start here ------------------------------- */
  const start = wb.addWorksheet("Start here", {
    properties: { tabColor: { argb: SLATE_900 } },
  });
  start.columns = [{ width: 96 }];
  const startLines: Array<[string, boolean]> = [
    ["Stay personal vs incorporate — property company model", true],
    ["", false],
    ["This spreadsheet weighs the UPFRONT cost of moving a rental property into a limited company", false],
    ["(Capital Gains Tax on the deemed market-value disposal, plus Stamp Duty Land Tax at standard", false],
    ["bands and the 5% additional-dwelling surcharge) against the ANNUAL tax saving the company", false],
    ["structure gives, and works out the break-even point in years.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit only the blue cells: property value, base cost, rents, interest, costs, your band, year,", false],
    ["   whether you claim s.162 relief, and whether you draw the profit out or reinvest it.", false],
    ["3. Everything else updates automatically: upfront cost, annual saving, break-even.", false],
    ["", false],
    ["The 'Rates' tab holds the locked tax rates and SDLT bands — the same source the website uses.", false],
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
  notes.columns = [{ width: 104 }];
  const noteLines = [
    "Assumptions and limitations",
    "",
    "• Upfront cost — Capital Gains Tax. Transferring a property into your own company is a disposal at",
    "  market value between connected persons (TCGA 1992 s.17/s.18), so CGT can arise on the gain. This",
    "  model applies the £3,000 annual exempt amount, then 18% on the gain within your unused basic-rate",
    "  band and 24% above. It assumes the property was never your main home (no Private Residence Relief).",
    "",
    "• s.162 incorporation relief can DEFER the CGT where the lettings are a genuine business and ALL the",
    "  assets are transferred wholly or partly for shares. Since Finance Act 2026 it must be CLAIMED for",
    "  transfers on or after 6 April 2026 (no longer automatic), and HMRC scrutinises whether residential",
    "  letting really amounts to a business — usually needing a portfolio under active management. The",
    "  relief toggle simply zeroes the CGT; it does not test whether you qualify.",
    "",
    "• Upfront cost — SDLT. The company's purchase pays SDLT at standard bands PLUS the 5% additional-",
    "  dwelling surcharge on the whole value. A genuine letting company is relieved from the 15% Sch 4A",
    "  rate, so it pays standard rates plus the surcharge. SDLT applies in England & NI; Scotland (LBTT,",
    "  8% ADS) and Wales (LTT) differ and are not modelled here.",
    "",
    "• Annual saving. Personally, the Section 24 restriction means mortgage interest is not deducted; you",
    "  pay tax on the rents (less non-finance costs) at your marginal rate, less a 20% (rising to 22% from",
    "  2027/28) finance-cost credit. A company deducts interest in full and pays Corporation Tax (19% to",
    "  £50,000, 25% from £250,000, marginal relief between). The company's money is not yours: unless you",
    "  retain and reinvest it, drawing it out as dividends is taxed again (10.75% / 35.75% / 39.35% for 2026/27).",
    "",
    "• Not modelled: company buy-to-let mortgage costs (usually higher), ATED on £500k+ dwellings (relieved",
    "  for genuine commercial lets but the return must still be filed), the £100,000 personal-allowance taper,",
    "  ongoing company accounts/filing costs, and the second-order effects on allowances and child benefit.",
    "",
    "• Figures are rounded and use 2026/27 rates unless you pick 2027/28. This is general guidance, not advice",
    "  for your specific situation. Incorporation is consequential and hard to reverse — speak to a property",
    "  tax specialist and model it property by property before acting.",
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
