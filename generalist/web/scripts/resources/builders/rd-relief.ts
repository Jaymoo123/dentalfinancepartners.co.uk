/**
 * R&D tax relief estimator model builder.
 *
 * Traces calcRDCredit from lib/tools/compute/rd-credit.ts.
 * Hardcoded-rate note (brief §4.1): ERIS payable rate = 1.86 * 14.5% = 0.2697;
 * RDEC net = 20% * 0.75. Intensity threshold 0.30.
 *
 * Default: total=500000, staff=120000, sub=0, cons=10000, sw=5000.
 * Golden: qualifying=135000, intensity=0.27 (not intensive), grossCredit=27000, netBenefit=20250.
 */
import ExcelJS from "exceljs";

// rd-credit.ts constants: builder mirrors exactly (brief §4.1)
const RDEC_RATE = 0.20;
const CT_MAIN_RATE = 0.25;
const ERIS_ENHANCEMENT = 1.86;
const ERIS_CREDIT_RATE = 0.145;
const RD_INTENSIVE_THRESHOLD = 0.30;
const SUBCONTRACTOR_HAIRCUT = 0.65;

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
function pctFmt(cell: ExcelJS.Cell) { cell.numFmt = "0.0%"; }
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
  headerCell(rates.getCell("A1"), "Locked rates: do not edit");
  rates.mergeCells("A1:B1");

  const rateRows: Array<{ name: string; label: string; value: number; pct?: boolean }> = [
    { name: "RDECRate", label: "Merged RDEC: above-the-line credit rate", value: RDEC_RATE, pct: true },
    { name: "CTMainRate", label: "Corporation Tax: main rate (RDEC haircut)", value: CT_MAIN_RATE, pct: true },
    { name: "ERISEnhancement", label: "ERIS: enhancement factor (1.86)", value: ERIS_ENHANCEMENT },
    { name: "ERISCreditRate", label: "ERIS: payable credit rate (14.5%)", value: ERIS_CREDIT_RATE, pct: true },
    { name: "SubcontractorHaircut", label: "Subcontractor qualifying % (65%)", value: SUBCONTRACTOR_HAIRCUT, pct: true },
    { name: "IntensityThreshold", label: "R&D intensity threshold for ERIS (30%)", value: RD_INTENSIVE_THRESHOLD, pct: true },
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
    { key: "a", width: 44 },
    { key: "b", width: 20 },
    { key: "c", width: 4 },
    { key: "d", width: 24 },
    { key: "e", width: 20 },
  ];

  headerCell(ws.getCell("A1"), "Your figures: edit the blue cells");
  ws.mergeCells("A1:B1");

  // Inputs
  const inputs: Array<{ row: number; label: string; value: number; name: string }> = [
    { row: 3, label: "Total operating expenditure", value: 500000, name: "TotalExpenditure" },
    { row: 4, label: "R&D staff costs", value: 120000, name: "StaffCost" },
    { row: 5, label: "R&D subcontractor cost (65% qualifies)", value: 0, name: "SubcontractorCost" },
    { row: 6, label: "R&D consumables", value: 10000, name: "ConsumablesCost" },
    { row: 7, label: "R&D software", value: 5000, name: "SoftwareCost" },
  ];

  for (const inp of inputs) {
    labelCell(ws.getCell(`A${inp.row}`), inp.label);
    ws.getCell(`B${inp.row}`).value = inp.value;
    moneyFmt(ws.getCell(`B${inp.row}`));
    blueInput(ws.getCell(`B${inp.row}`));
    wb.definedNames.add(`'Your figures'!$B$${inp.row}`, inp.name);
  }

  // Derived
  headerCell(ws.getCell("A9"), "Your R&D benefit");
  ws.mergeCells("A9:B9");

  labelCell(ws.getCell("A10"), "Qualifying R&D spend");
  ws.getCell("B10").value = {
    formula: "StaffCost+SubcontractorCost*SubcontractorHaircut+ConsumablesCost+SoftwareCost",
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B10"));
  wb.definedNames.add("'Your figures'!$B$10", "Qualifying");

  labelCell(ws.getCell("A11"), "R&D intensity ratio");
  ws.getCell("B11").value = {
    formula: "IF(TotalExpenditure>0,Qualifying/TotalExpenditure,0)",
  } as ExcelJS.CellFormulaValue;
  pctFmt(ws.getCell("B11"));
  wb.definedNames.add("'Your figures'!$B$11", "IntensityRatio");

  labelCell(ws.getCell("A12"), "Qualifies for ERIS (>=30% intensity)?");
  ws.getCell("B12").value = {
    formula: 'IF(IntensityRatio>=IntensityThreshold,"Yes","No")',
  } as ExcelJS.CellFormulaValue;
  wb.definedNames.add("'Your figures'!$B$12", "IsIntensive");

  labelCell(ws.getCell("A13"), "Credit rate applied");
  ws.getCell("B13").value = {
    formula: 'IF(IsIntensive="Yes",ERISEnhancement*ERISCreditRate,RDECRate)',
  } as ExcelJS.CellFormulaValue;
  ws.getCell("B13").numFmt = "0.00%";
  wb.definedNames.add("'Your figures'!$B$13", "CreditRate");

  labelCell(ws.getCell("A14"), "Gross R&D credit");
  ws.getCell("B14").value = { formula: "Qualifying*CreditRate" } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B14"));
  wb.definedNames.add("'Your figures'!$B$14", "GrossCredit");

  labelCell(ws.getCell("A15"), "Net benefit (after CT haircut on RDEC)");
  // ERIS: no CT haircut (payable, not taxable). RDEC: net = gross * (1 - 0.25)
  ws.getCell("B15").value = {
    formula: 'IF(IsIntensive="Yes",GrossCredit,GrossCredit*(1-CTMainRate))',
  } as ExcelJS.CellFormulaValue;
  moneyFmt(ws.getCell("B15"));
  ws.getCell("B15").font = { bold: true };
  wb.definedNames.add("'Your figures'!$B$15", "NetBenefit");

  for (let r = 10; r <= 15; r++) {
    ws.getCell(`A${r}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: SLATE_50 } };
  }

  /* ---- Start here ---- */
  const start = wb.addWorksheet("Start here", { properties: { tabColor: { argb: SLATE_900 } } });
  start.columns = [{ width: 90 }];
  const startLines: Array<[string, boolean]> = [
    ["R&D tax relief estimator model", true],
    ["", false],
    ["Estimates your R&D tax relief under the merged RDEC scheme or the ERIS route,", false],
    ["for accounting periods starting on or after 1 April 2024.", false],
    ["", false],
    ["How to use it:", true],
    ["1. Go to the 'Your figures' tab.", false],
    ["2. Edit only the blue cells: total expenditure, staff, subcontractor, consumables, software.", false],
    ["3. The benefit and intensity ratio update automatically.", false],
    ["", false],
    ["The 'Rates' tab holds the locked rates. Read 'Notes' for important assumptions.", false],
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
    "• Merged scheme (RDEC): 20% above-the-line credit for accounting periods on/after",
    "  1 April 2024. The credit is taxable at the main CT rate (25%), so the net benefit",
    "  is 20% * 75% = 15p per £1 of qualifying spend.",
    "",
    "• ERIS: Enhanced R&D Intensive Support for R&D-intensive loss-making SMEs. The",
    "  30% intensity threshold applies from 1 April 2024 (reduced from 40%). Net benefit",
    "  is approximately 26.97p per £1 of qualifying spend (1.86 * 14.5%); the payable",
    "  credit is not subject to CT, so no haircut.",
    "",
    "• Only 65% of subcontractor cost qualifies for the merged scheme.",
    "",
    "• This is a directional estimate only. The actual claim depends on your loss position,",
    "  the PAYE/NIC cap, grants, connected-party rules and the HMRC enquiry risk profile.",
    "  A specialist should scope any real claim before submission.",
    "",
    "• Do not cite the exact ITTOIA section in your own documents without advice: the",
    "  legislation for the merged scheme is in Finance Act 2023.",
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
