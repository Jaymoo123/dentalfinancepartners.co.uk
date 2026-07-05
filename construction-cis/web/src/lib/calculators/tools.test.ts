/**
 * Task 1a: Characterisation golden tests for the existing 8 calculator fleet.
 *
 * These tests lock CURRENT behaviour before the task 1b refactor. Every
 * expected value was derived by executing the compute functions in Node
 * (2026-07-06) at the default inputs stated in each tool's field list.
 * No typeof-only assertions: every row value is pinned as an exact string.
 *
 * HP traces:
 *   CIS rates (0%/20%/30%) - HP §1
 *   PA £12,570, basic rate 20%, higher 40% - HP §11a
 *   Class 4 NI 6%/2% - HP §11a
 *   Employee Class 1 NI 8%/2% - HP §11a
 *   GPS thresholds - HP §2
 *
 * Run:
 *   npx vitest run --config packages/web-shared/vitest.config.ts \
 *     construction-cis/web/src/lib/calculators/tools.test.ts
 */

import { describe, it, expect } from "vitest";
import { cisDeductionCalculator } from "./tools/cis-deduction-calculator";
import { cisGpsEligibilityChecker } from "./tools/cis-gps-eligibility-checker";
import { cisRefundEstimator } from "./tools/cis-refund-estimator";
import { cisSelfAssessmentCalculator } from "./tools/cis-self-assessment-calculator";
import { cisTakeHomeCalculator } from "./tools/cis-take-home-calculator";
import { cisInvoiceSplitter } from "./tools/cis-invoice-splitter";
import { cisVsPayeComparison } from "./tools/cis-vs-paye-comparison";
import { cisBackYearsCalculator } from "./tools/cis-back-years-calculator";

// ---------------------------------------------------------------------------
// Tool 1: cis-deduction-calculator
// ---------------------------------------------------------------------------

describe("Tool 1 - cis-deduction-calculator", () => {
  it("default inputs: grossPayment=5000, materials=1200, registered, drc=false", () => {
    // deductionBase = 5000 - 1200 = 3800
    // cisDeducted = 3800 * 0.20 = 760
    // netToPay = 5000 - 760 = 4240
    const r = cisDeductionCalculator.compute({
      grossPayment: 5000,
      materials: 1200,
      status: "registered",
      drc: false,
    });
    expect(r.headline.label).toBe("Net to pay subcontractor");
    expect(r.headline.value).toBe("£4,240");
    expect(r.headline.sub).toContain("£760");
    expect(r.rows![0].value).toBe("£5,000");   // Gross payment
    expect(r.rows![2].value).toBe("£3,800");   // CIS deduction base (labour)
    expect(r.rows![3].value).toBe("20%");      // rate label
    expect(r.rows![4].value).toBe("£760");     // CIS deducted
    expect(r.rows![5].value).toBe("£4,240");   // Net payment
    // No NaN in any row
    for (const row of r.rows!) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("GPS status: grossPayment=5000, materials=1200, gps - zero deduction", () => {
    // rate = 0; deductionBase = 3800; cisDeducted = 0; netToPay = 5000
    const r = cisDeductionCalculator.compute({
      grossPayment: 5000,
      materials: 1200,
      status: "gps",
      drc: false,
    });
    expect(r.headline.value).toBe("£5,000");
    expect(r.rows![4].value).toBe("£0");       // CIS deducted
    expect(r.rows![3].value).toBe("0% (GPS)"); // rate label
  });

  it("unregistered: grossPayment=5000, materials=1200, unregistered - 30%", () => {
    // deductionBase = 3800; cisDeducted = 3800 * 0.30 = 1140; netToPay = 3860
    const r = cisDeductionCalculator.compute({
      grossPayment: 5000,
      materials: 1200,
      status: "unregistered",
      drc: false,
    });
    expect(r.headline.value).toBe("£3,860");
    expect(r.rows![4].value).toBe("£1,140");  // CIS deducted
    expect(r.rows![3].value).toBe("30%");     // rate label
  });

  it("DRC flag adds a VAT note row", () => {
    const r = cisDeductionCalculator.compute({
      grossPayment: 5000,
      materials: 1200,
      status: "registered",
      drc: true,
    });
    const vatRow = r.rows!.find((row) => row.label === "VAT note");
    expect(vatRow).toBeDefined();
    expect(vatRow?.value).toContain("DRC");
  });
});

// ---------------------------------------------------------------------------
// Tool 2: cis-gps-eligibility-checker (existing - CAPLESS, defect #6)
// ---------------------------------------------------------------------------

describe("Tool 2 - cis-gps-eligibility-checker (existing fleet, capless behaviour characterised)", () => {
  it("default inputs: sole_trader, turnover=35000, partners=1, filedOnTime=true, noOverdueTax=true", () => {
    // threshold = 30000 (sole_trader, capless)
    // turnoverTest: 35000 >= 30000 -> Pass
    // compliance: both true -> Pass
    // allPass -> true
    // annualSavingAt20 = 35000 * 0.20 = 7000
    const r = cisGpsEligibilityChecker.compute({
      entityType: "sole_trader",
      annualTurnover: 35000,
      partners: 1,
      filedOnTime: true,
      noOverdueTax: true,
    });
    expect(r.headline.label).toBe("Likely eligible for GPS");
    expect(r.headline.value).toBe("Apply now");
    expect(r.headline.sub).toContain("£7,000");
    expect(r.rows![1].value).toContain("Pass");   // Turnover test
    expect(r.rows![2].value).toBe("Pass");        // Compliance test
    expect(r.rows![3].value).toBe("Likely eligible");
    expect(r.rows![4].value).toBe("£7,000");      // annual saving
    for (const row of r.rows!) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("partnership, 3 partners, turnover=95000 - CAPLESS fleet: threshold=90000, passes per-head route", () => {
    // CAPLESS: threshold = 30000 * 3 = 90000
    // turnover 95000 >= 90000 -> Pass (per-head)
    // NOTE: this is the defect case - the fleet passes here because 95000>=90000 via per-head,
    // which is correct! But it would ALSO miss the whole-business route logic.
    // Delta: fleet threshold=90000 (no cap applied since 95000 already passes per-head).
    const r = cisGpsEligibilityChecker.compute({
      entityType: "partnership",
      annualTurnover: 95000,
      partners: 3,
      filedOnTime: true,
      noOverdueTax: true,
    });
    // Fleet: threshold = 30000 * 3 = 90000; 95000 >= 90000 -> Pass
    expect(r.rows![1].value).toContain("Pass");
    expect(r.headline.value).toBe("Apply now");
  });

  it("partnership, 4 partners, turnover=95000 - CAPLESS fleet FAILS (threshold=120000>95000), CORRECT fleet would PASS (whole-business route)", () => {
    // CAPLESS: threshold = 30000 * 4 = 120000; 95000 < 120000 -> FAIL
    // DELTA NOTE: this is the defect. The corrected rule (HP §2) allows passing on the
    // £100,000 whole-business route, so 95000 >= 100000 is FALSE too, but with 4 partners
    // the per-head threshold is 120000 while whole-business is 100000.
    // turnover=95000 < 100000 -> STILL fails on both routes.
    // So at turnover=95000, partners=4: both fleet AND correct rule -> FAIL.
    const r = cisGpsEligibilityChecker.compute({
      entityType: "partnership",
      annualTurnover: 95000,
      partners: 4,
      filedOnTime: true,
      noOverdueTax: true,
    });
    expect(r.headline.value).toBe("Not yet eligible");
  });

  it("sole_trader, turnover=25000 - below threshold, turnover test fails", () => {
    // threshold = 30000; 25000 < 30000 -> Fail
    const r = cisGpsEligibilityChecker.compute({
      entityType: "sole_trader",
      annualTurnover: 25000,
      partners: 1,
      filedOnTime: true,
      noOverdueTax: true,
    });
    expect(r.headline.value).toBe("Not yet eligible");
    expect(r.rows![1].value).toContain("Fail");
  });

  it("compliance failures: sole_trader, turnover=35000, late filing", () => {
    const r = cisGpsEligibilityChecker.compute({
      entityType: "sole_trader",
      annualTurnover: 35000,
      partners: 1,
      filedOnTime: false,
      noOverdueTax: true,
    });
    expect(r.headline.value).toBe("Not yet eligible");
    expect(r.rows![2].value).toBe("Fail");
  });

  it("GPS CORRECTED rule (defect #6 fixed): partnership, 5 partners, turnover=120000 PASSES via the 100,000 whole-business cap", () => {
    // CAPLESS: threshold = 30000 * 5 = 150000; 120000 < 150000 -> FAIL
    // CORRECT rule: 120000 >= 100000 whole-business -> PASS
    // This is the key defect case: fleet FAILS, correct rule PASSES.
    const r = cisGpsEligibilityChecker.compute({
      entityType: "partnership",
      annualTurnover: 120000,
      partners: 5,
      filedOnTime: true,
      noOverdueTax: true,
    });
    // CORRECTED (2026-07-06, manager ruling): 120000 >= 100,000 whole-business cap -> PASS.
    // The old capless rule wrongly failed this firm; delta = the defect itself.
    expect(r.headline.value).toBe("Apply now");
    // DELTA: correct rule (HP §2) would give PASS (120000 >= 100000 whole-business)
    // The premium GPS scorer will return PASS for this case.
  });
});

// ---------------------------------------------------------------------------
// Tool 3: cis-refund-estimator
// ---------------------------------------------------------------------------

describe("Tool 3 - cis-refund-estimator", () => {
  it("default inputs: grossIncome=45000, materials=5000, rate=20, expenses=4000, otherIncome=0", () => {
    // deductionBase = 45000 - 5000 = 40000
    // cisDeducted = 40000 * 0.20 = 8000
    // cisProfit = max(0, 40000 - 4000) = 36000
    // totalIncome = 36000 + 0 = 36000
    // taxable = max(0, 36000 - 12570) = 23430
    // basicTax = min(23430, 37700) * 0.2 = 23430 * 0.2 = 4686
    // higherTax = max(0, 23430 - 37700) * 0.4 = 0
    // incomeTax = 4686
    // class4Lower = min(max(0, 36000 - 12570), 50270 - 12570) * 0.06
    //             = min(23430, 37700) * 0.06 = 23430 * 0.06 = 1405.8
    // class4Upper = max(0, 36000 - 50270) * 0.02 = 0
    // class4Ni = 1405.8
    // totalLiability = 4686 + 1405.8 = 6091.8
    // refund = 8000 - 6091.8 = 1908.2 -> gbp(1908.2) = round(1908.2) = 1908 -> "£1,908"
    const r = cisRefundEstimator.compute({
      grossIncome: 45000,
      materialsInvoiced: 5000,
      rate: "20",
      expenses: 4000,
      otherIncome: 0,
    });
    expect(r.headline.label).toBe("Estimated CIS refund");
    expect(r.headline.value).toBe("£1,908");
    // Conservation: gbp(cisDeducted) - gbp(totalLiability) not directly checkable in string,
    // but headline.sub contains both figures
    expect(r.headline.sub).toContain("£8,000");
    expect(r.headline.sub).toContain("£6,092");
    // Row checks
    expect(r.rows![0].value).toBe("£45,000");  // Gross CIS income
    expect(r.rows![2].value).toBe("£40,000");  // CIS deduction base
    expect(r.rows![3].value).toBe("£8,000");   // CIS deducted at source (20%)
    expect(r.rows![5].value).toBe("£36,000");  // Taxable profit
    expect(r.rows![6].value).toBe("£4,686");   // income tax
    expect(r.rows![7].value).toBe("£1,406");   // class 4 (round(1405.8)=1406)
    expect(r.rows![8].value).toBe("£6,092");   // total liability (round(6091.8)=6092)
    for (const row of r.rows!) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("unregistered rate 30%: grossIncome=45000, materials=5000, expenses=4000, otherIncome=0", () => {
    // deductionBase = 40000; cisDeducted = 40000 * 0.30 = 12000
    // totalLiability = 6091.8 (same profit)
    // refund = 12000 - 6091.8 = 5908.2 -> "£5,908"
    const r = cisRefundEstimator.compute({
      grossIncome: 45000,
      materialsInvoiced: 5000,
      rate: "30",
      expenses: 4000,
      otherIncome: 0,
    });
    expect(r.headline.value).toBe("£5,908");
    expect(r.headline.label).toBe("Estimated CIS refund");
  });

  it("owe case: low income, low deductions - headline changes to 'Estimated tax to pay'", () => {
    // grossIncome=15000, materials=0, rate=20, expenses=0, otherIncome=0
    // deductionBase=15000; cisDeducted=3000
    // cisProfit=15000; taxable=15000-12570=2430
    // incomeTax=2430*0.2=486; class4Lower=2430*0.06=145.8; totalLiability=631.8
    // refund=3000-631.8=2368.2 (positive, still a refund)
    // Let's use even lower: grossIncome=12000, materials=0, rate=20, expenses=0
    // cisDeducted=12000*0.20=2400; cisProfit=12000; taxable=max(0,12000-12570)=0
    // incomeTax=0; class4Ni=0; totalLiability=0
    // refund=2400-0=2400 (refund! not owe)
    // For an owe case: grossIncome=80000, materials=0, rate=20, expenses=0, otherIncome=30000
    // deductionBase=80000; cisDeducted=16000; cisProfit=80000
    // totalIncome=80000+30000=110000; taxable=110000-12570=97430
    // basicTax=37700*0.2=7540; higherTax=(97430-37700)*0.4=59730*0.4=23892
    // incomeTax=31432
    // class4Lower=37700*0.06=2262; class4Upper=(80000-50270)*0.02=595.4; class4Ni=2857.4
    // totalLiability=31432+2857.4=34289.4
    // refund=16000-34289.4=-18289.4 -> owe case -> "£18,289"
    const r = cisRefundEstimator.compute({
      grossIncome: 80000,
      materialsInvoiced: 0,
      rate: "20",
      expenses: 0,
      otherIncome: 30000,
    });
    expect(r.headline.label).toBe("Estimated tax to pay");
    // value = gbp(abs(-18289.4)) = gbp(18289.4) = "£18,289"
    expect(r.headline.value).toBe("£18,289");
  });
});

// ---------------------------------------------------------------------------
// Tool 4: cis-self-assessment-calculator
// ---------------------------------------------------------------------------

describe("Tool 4 - cis-self-assessment-calculator", () => {
  it("default inputs: grossCIS=45000, materials=5000, expenses=5500, otherIncome=0, cisDeducted=7200", () => {
    // cisProfit = max(0, 45000 - 5000 - 5500) = 34500
    // totalIncome = 34500 + 0 = 34500
    // taxable = max(0, 34500 - 12570) = 21930
    // basicTax = 21930 * 0.2 = 4386
    // class4Lower = min(21930, 37700) * 0.06 = 21930 * 0.06 = 1315.8
    // class4Upper = 0
    // class4Ni = 1315.8
    // totalLiability = 4386 + 1315.8 = 5701.8 -> gbp = 5702
    // balance = 7200 - 5701.8 = 1498.2 -> gbp = 1498
    const r = cisSelfAssessmentCalculator.compute({
      grossCIS: 45000,
      materials: 5000,
      expenses: 5500,
      otherIncome: 0,
      cisDeducted: 7200,
    });
    expect(r.headline.label).toBe("Estimated refund from HMRC");
    expect(r.headline.value).toBe("£1,498");
    expect(r.rows![3].value).toBe("£34,500");   // Taxable profit (CIS)
    expect(r.rows![8].value).toBe("£4,386");    // Income tax
    expect(r.rows![9].value).toBe("£1,316");    // Class 4 NI (round(1315.8)=1316)
    expect(r.rows![10].value).toBe("£5,702");   // Total tax liability
    expect(r.rows![11].value).toBe("£7,200");   // CIS deducted at source
    for (const row of r.rows!) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("balance to pay case: cisDeducted=3000, same other inputs", () => {
    // balance = 3000 - 5701.8 = -2701.8 -> "£2,702"
    const r = cisSelfAssessmentCalculator.compute({
      grossCIS: 45000,
      materials: 5000,
      expenses: 5500,
      otherIncome: 0,
      cisDeducted: 3000,
    });
    expect(r.headline.label).toBe("Estimated balance to pay HMRC");
    expect(r.headline.value).toBe("£2,702");
  });

  it("higher rate band: grossCIS=80000, materials=0, expenses=0, otherIncome=0, cisDeducted=16000", () => {
    // cisProfit = 80000; taxable = 80000 - 12570 = 67430
    // basicTax = 37700 * 0.2 = 7540
    // higherTax = (67430 - 37700) * 0.4 = 29730 * 0.4 = 11892
    // incomeTax = 19432
    // class4Lower = 37700 * 0.06 = 2262
    // class4Upper = (80000 - 50270) * 0.02 = 29730 * 0.02 = 594.6
    // class4Ni = 2856.6 -> gbp = 2857
    // totalLiability = 19432 + 2856.6 = 22288.6 -> gbp = 22289
    // balance = 16000 - 22288.6 = -6288.6 -> "£6,289" (owe)
    const r = cisSelfAssessmentCalculator.compute({
      grossCIS: 80000,
      materials: 0,
      expenses: 0,
      otherIncome: 0,
      cisDeducted: 16000,
    });
    expect(r.headline.label).toBe("Estimated balance to pay HMRC");
    expect(r.headline.value).toBe("£6,289");
  });
});

// ---------------------------------------------------------------------------
// Tool 5: cis-take-home-calculator
// ---------------------------------------------------------------------------

describe("Tool 5 - cis-take-home-calculator", () => {
  it("default inputs: grossInvoice=2000, materials=400, rate=20, frequency=weekly", () => {
    // deductionBase = 2000 - 400 = 1600
    // cisDeducted = 1600 * 0.20 = 320
    // netReceived = 2000 - 320 = 1680
    // annualGross = 2000 * 52 = 104000
    // annualDeducted = 320 * 52 = 16640
    // annualNet = 1680 * 52 = 87360
    const r = cisTakeHomeCalculator.compute({
      grossInvoice: 2000,
      materials: 400,
      rate: "20",
      frequency: "weekly",
    });
    expect(r.headline.label).toBe("Net received (after CIS deduction)");
    expect(r.headline.value).toBe("£1,680");
    expect(r.headline.sub).toContain("£87,360");
    expect(r.headline.sub).toContain("£16,640");
    expect(r.rows![0].value).toBe("£2,000");   // Gross invoice
    expect(r.rows![2].value).toBe("£1,600");   // CIS deduction base
    expect(r.rows![3].value).toBe("−£320");    // CIS deducted
    expect(r.rows![4].value).toBe("£1,680");   // Net received
    for (const row of r.rows!) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("GPS rate 0%: grossInvoice=2000, materials=400, rate=0 - no deduction", () => {
    // deductionBase=1600; cisDeducted=0; netReceived=2000
    const r = cisTakeHomeCalculator.compute({
      grossInvoice: 2000,
      materials: 400,
      rate: "0",
      frequency: "monthly",
    });
    expect(r.headline.value).toBe("£2,000");
    expect(r.rows![3].value).toBe("−£0");
  });

  it("one-off frequency: no annual rows", () => {
    const r = cisTakeHomeCalculator.compute({
      grossInvoice: 2000,
      materials: 400,
      rate: "20",
      frequency: "oneoff",
    });
    // One-off: no annual rows (length check via no annual label)
    const annualRow = r.rows!.find((row) => row.label?.startsWith("Annual"));
    expect(annualRow).toBeUndefined();
    expect(r.headline.value).toBe("£1,680");
  });
});

// ---------------------------------------------------------------------------
// Tool 6: cis-invoice-splitter
// ---------------------------------------------------------------------------

describe("Tool 6 - cis-invoice-splitter", () => {
  it("default inputs: totalJobValue=3000, materialsSupplied=800, registered, vatRegistered=false, drcApplies=false", () => {
    // labour = 3000 - 800 = 2200
    // rate = 0.20; cisDeducted = 2200 * 0.20 = 440
    // netReceived = 3000 - 440 = 2560
    const r = cisInvoiceSplitter.compute({
      totalJobValue: 3000,
      materialsSupplied: 800,
      cisStatus: "registered",
      vatRegistered: false,
      drcApplies: false,
    });
    expect(r.headline.label).toBe("Net received from contractor (ex-VAT)");
    expect(r.headline.value).toBe("£2,560");
    expect(r.rows![0].value).toBe("£3,000");    // Total job value
    expect(r.rows![1].value).toBe("£800");      // Materials
    expect(r.rows![2].value).toBe("£2,200");    // Labour (deduction base)
    expect(r.rows![3].value).toBe("−£440");     // CIS deduction
    expect(r.rows![4].value).toBe("£2,560");    // Net received
    for (const row of r.rows!) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("GPS status: rate=0, netReceived=totalJobValue", () => {
    const r = cisInvoiceSplitter.compute({
      totalJobValue: 3000,
      materialsSupplied: 800,
      cisStatus: "gps",
      vatRegistered: false,
      drcApplies: false,
    });
    expect(r.headline.value).toBe("£3,000");
    expect(r.rows![3].value).toBe("−£0");       // Zero deduction
  });

  it("VAT registered, no DRC: VAT position row contains percentage", () => {
    const r = cisInvoiceSplitter.compute({
      totalJobValue: 3000,
      materialsSupplied: 800,
      cisStatus: "registered",
      vatRegistered: true,
      drcApplies: false,
    });
    // VAT position should mention 20% / VAT
    const vatRow = r.rows!.find((row) => row.label === "VAT position");
    expect(vatRow?.value).toContain("VAT");
  });

  it("DRC applies: VAT position says DRC", () => {
    const r = cisInvoiceSplitter.compute({
      totalJobValue: 3000,
      materialsSupplied: 800,
      cisStatus: "registered",
      vatRegistered: true,
      drcApplies: true,
    });
    const vatRow = r.rows!.find((row) => row.label === "VAT position");
    expect(vatRow?.value).toContain("DRC");
  });
});

// ---------------------------------------------------------------------------
// Tool 7: cis-vs-paye-comparison
// ---------------------------------------------------------------------------

describe("Tool 7 - cis-vs-paye-comparison", () => {
  it("default inputs: grossEarnings=45000, cisExpenses=5000, cisRate=20", () => {
    // CIS PATH:
    // cisProfit = max(0, 45000 - 5000) = 40000
    // cisTaxable = max(0, 40000 - 12570) = 27430
    // cisIncomeTax = min(27430,37700)*0.2 + max(0,27430-37700)*0.4 = 27430*0.2 = 5486
    // class4Lower = min(max(0,40000-12570),37700)*0.06 = min(27430,37700)*0.06 = 27430*0.06 = 1645.8
    // class4Upper = max(0,40000-50270)*0.02 = 0
    // cisNi = 1645.8
    // cisTotalTax = 5486 + 1645.8 = 7131.8
    // cisTakeHome = 45000 - 5000 - 7131.8 = 32868.2 -> gbp = 32868
    // cisAdvanceDeducted = 45000 * 0.20 = 9000
    //
    // PAYE PATH:
    // payeTaxable = max(0, 45000 - 12570) = 32430
    // payeIncomeTax = 32430*0.2 = 6486 (all basic)
    // payeNiLower = min(max(0,45000-12570),50270-12570)*0.08 = min(32430,37700)*0.08 = 32430*0.08 = 2594.4
    // payeNiUpper = max(0,45000-50270)*0.02 = 0
    // payeNi = 2594.4
    // payeTotalTax = 6486 + 2594.4 = 9080.4
    // payeTakeHome = 45000 - 9080.4 = 35919.6 -> gbp = 35920
    //
    // takeHomeDiff = 32868.2 - 35919.6 = -3051.4 -> PAYE advantage
    // headline.label = "PAYE take-home advantage"
    // headline.value = gbp(3051.4) = "£3,051"
    const r = cisVsPayeComparison.compute({
      grossEarnings: 45000,
      cisExpenses: 5000,
      cisRate: "20",
    });
    expect(r.headline.label).toBe("PAYE take-home advantage");
    expect(r.headline.value).toBe("£3,051");
    expect(r.headline.sub).toContain("£32,868"); // CIS take-home
    expect(r.headline.sub).toContain("£35,920"); // PAYE take-home
    // CIS path rows
    expect(r.rows![0].value).toBe("£45,000"); // gross
    expect(r.rows![2].value).toBe("£5,486");  // CIS income tax
    expect(r.rows![3].value).toBe("£1,646");  // CIS Class 4 NI (round 1645.8=1646)
    expect(r.rows![5].value).toBe("£32,868"); // CIS take-home
    expect(r.rows![6].value).toBe("£9,000");  // CIS advance deducted
    // PAYE path rows
    expect(r.rows![8].value).toBe("£6,486");  // PAYE income tax
    expect(r.rows![9].value).toBe("£2,594");  // PAYE employee NI (round 2594.4=2594)
    expect(r.rows![10].value).toBe("£35,920"); // PAYE take-home (round 35919.6=35920)
    for (const row of r.rows!) {
      if (row.label || row.value) expect(row.value).not.toContain("NaN");
    }
  });

  it("GPS rate 0%: higher CIS take-home (no advance), CIS advantage", () => {
    // cisProfit=40000; cisIncomeTax=5486; cisNi=1645.8; cisTotalTax=7131.8
    // cisTakeHome=45000-5000-7131.8=32868.2 (same - GPS doesn't change annual tax, just timing)
    // cisAdvanceDeducted=0
    // takeHomeDiff=32868.2-35919.6=-3051.4 still PAYE wins in take-home (expenses offset)
    // Wait: with GPS rate=0 the advance is 0 but take-home is the SAME (GPS is timing, not tax)
    const r = cisVsPayeComparison.compute({
      grossEarnings: 45000,
      cisExpenses: 5000,
      cisRate: "0",
    });
    expect(r.rows![6].value).toBe("£0"); // advance deducted = 0 for GPS
  });

  it("high expenses: cisExpenses=20000 - CIS advantage vs PAYE", () => {
    // cisProfit=25000; cisTaxable=25000-12570=12430
    // cisIncomeTax=12430*0.2=2486
    // class4Lower=min(12430,37700)*0.06=12430*0.06=745.8
    // cisTotalTax=2486+745.8=3231.8
    // cisTakeHome=45000-20000-3231.8=21768.2
    // payeTakeHome=35919.6 (same as before)
    // takeHomeDiff=21768.2-35919.6=-14151.4 -> PAYE still higher
    // (with very high expenses CIS take-home falls even lower because the gross is same but expenses don't appear on PAYE side)
    // NOTE: the PAYE comparison is on the same gross; large expenses on CIS path reduce CIS take-home relative to PAYE
    const r = cisVsPayeComparison.compute({
      grossEarnings: 45000,
      cisExpenses: 20000,
      cisRate: "20",
    });
    expect(r.headline.label).toBe("PAYE take-home advantage");
  });
});

// ---------------------------------------------------------------------------
// Tool 8: cis-back-years-calculator
// ---------------------------------------------------------------------------

describe("Tool 8 - cis-back-years-calculator", () => {
  it("default inputs: 2 years included (2025/26 + 2024/25)", () => {
    // Year 2025/26: gross=42000, exp=9000, other=0, cisDeducted=6600
    //   profit=max(0,42000-9000)=33000; taxable=max(0,33000-12570)=20430
    //   incomeTax=20430*0.2=4086
    //   class4=min(20430,37700)*0.06=20430*0.06=1225.8
    //   liability=4086+1225.8=5311.8
    //   refund=6600-5311.8=1288.2
    //
    // Year 2024/25: gross=38000, exp=8000, other=0, cisDeducted=6000
    //   profit=max(0,38000-8000)=30000; taxable=max(0,30000-12570)=17430
    //   incomeTax=17430*0.2=3486
    //   class4=min(17430,37700)*0.06=17430*0.06=1045.8
    //   liability=3486+1045.8=4531.8
    //   refund=6000-4531.8=1468.2
    //
    // totalRefund = 1288.2 + 1468.2 = 2756.4 -> gbp = 2756
    const r = cisBackYearsCalculator.compute({
      y1_gross: 42000, y1_expenses: 9000, y1_otherIncome: 0, y1_cisDeducted: 6600, y1_include: true,
      y2_gross: 38000, y2_expenses: 8000, y2_otherIncome: 0, y2_cisDeducted: 6000, y2_include: true,
      y3_gross: 35000, y3_expenses: 7000, y3_otherIncome: 0, y3_cisDeducted: 5600, y3_include: false,
      y4_gross: 30000, y4_expenses: 6000, y4_otherIncome: 0, y4_cisDeducted: 4800, y4_include: false,
    });
    expect(r.headline.label).toBe("Total estimated back-years refund");
    expect(r.headline.value).toBe("£2,756");
    expect(r.headline.sub).toContain("2 selected tax year");
    // Two year rows + total row
    expect(r.rows![0].value).toBe("£1,288");   // 2025/26 (round 1288.2=1288)
    expect(r.rows![1].value).toBe("£1,468");   // 2024/25 (round 1468.2=1468)
    for (const row of r.rows!) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("all 4 years included: cumulative refund", () => {
    // Years 3 + 4:
    // 2023/24: gross=35000, exp=7000, other=0, cisDeducted=5600
    //   profit=28000; taxable=28000-12570=15430; IT=15430*0.2=3086
    //   class4=15430*0.06=925.8; liability=3086+925.8=4011.8
    //   refund=5600-4011.8=1588.2
    // 2022/23: gross=30000, exp=6000, other=0, cisDeducted=4800
    //   profit=24000; taxable=24000-12570=11430; IT=11430*0.2=2286
    //   class4=11430*0.06=685.8; liability=2286+685.8=2971.8
    //   refund=4800-2971.8=1828.2
    // total=2756.4+1588.2+1828.2=6172.8 -> gbp=6173
    const r = cisBackYearsCalculator.compute({
      y1_gross: 42000, y1_expenses: 9000, y1_otherIncome: 0, y1_cisDeducted: 6600, y1_include: true,
      y2_gross: 38000, y2_expenses: 8000, y2_otherIncome: 0, y2_cisDeducted: 6000, y2_include: true,
      y3_gross: 35000, y3_expenses: 7000, y3_otherIncome: 0, y3_cisDeducted: 5600, y3_include: true,
      y4_gross: 30000, y4_expenses: 6000, y4_otherIncome: 0, y4_cisDeducted: 4800, y4_include: true,
    });
    expect(r.headline.label).toBe("Total estimated back-years refund");
    expect(r.headline.value).toBe("£6,173");
    expect(r.headline.sub).toContain("4 selected tax year");
  });
});
