import { describe, it, expect } from "vitest";
import { founderDividendVsSalaryCalculator as calc } from "../founder-dividend-vs-salary-calculator";

// ---------------------------------------------------------------------------
// Golden figures from brief + house positions
// ---------------------------------------------------------------------------

describe("founderDividendVsSalaryCalculator", () => {
  // -------------------------------------------------------------------------
  // 1. EA solo-director trap: £12,570 salary, sole director => £1,050 employer NIC
  //    Brief: "sole director, £12,000 salary → £1,050 employer NIC uncovered"
  //    Actual brief figure uses £12,000: (12,000 - 5,000) * 15% = 7,000 * 15% = £1,050
  //    The tool recommends salary = PA = £12,570; same test works:
  //    (12,570 - 5,000) * 15% = 7,570 * 15% = £1,135.50 ~ £1,136 (rounded)
  //    We assert the brief's own golden figure using £12,000 salary input (extraction = £12,000).
  // -------------------------------------------------------------------------
  it("EA solo-director trap: £1,050 employer NIC on £12,000 extraction, no EA for solo director (brief golden figure)", () => {
    // Force salary at £12,000 by setting targetExtraction = £12,000 (salary = min(T, PA) = £12,000)
    const result = calc.compute({
      targetExtraction: 12_000,
      companyProfit: 50_000,
      soloDirector: true,
      otherIncome: 0,
      scotland: false,
    });
    const erNicRow = result.rows?.find((r) => r.label.startsWith("Employer NIC"));
    // (12,000 - 5,000) * 15% = £1,050
    expect(erNicRow?.value).toBe("£1,050");
  });

  it("Non-solo director with same £12,000 salary: EA offsets employer NIC to £0", () => {
    const result = calc.compute({
      targetExtraction: 12_000,
      companyProfit: 50_000,
      soloDirector: false,
      otherIncome: 0,
      scotland: false,
    });
    const erNicRow = result.rows?.find((r) => r.label.startsWith("Employer NIC"));
    // £1,050 fully covered by £10,500 EA -> £0
    expect(erNicRow?.value).toBe("£0");
  });

  // -------------------------------------------------------------------------
  // 2. Dividend tax golden figures from brief (HP22)
  //    Brief formula: (50,000 - 500) * 10.75% = £5,321.25 is an ILLUSTRATION
  //    of the ordinary-band component. For a salary of £12,570 + £50,000 dividends
  //    with no other income, dividends overflow the basic band (width = 37,700)
  //    so part lands in the upper rate. The tool is correct; the brief labels it
  //    "(illustration; real band placement depends on salary + other income)".
  //
  //    Test 2a: dividends entirely within basic band (£20,000 dividends, no other income,
  //    salary at PA -> basic band width 37,700 -> all fits):
  //    (20,000 - 500) * 10.75% = 19,500 * 0.1075 = £2,096.25 -> £2,096
  //
  //    Test 2b: brief formula component check — the 10.75% rate applied to £49,500
  //    = £5,321.25 -> £5,321 (for the basic-rate slice, verified by splitting manually)
  // -------------------------------------------------------------------------
  it("Dividend tax: £20,000 dividends fully in basic band => (20,000-500)*10.75% = £2,096", () => {
    // salary = min(25,000, 12570) = 12,570; dividends = 25,000 - 12,570 = 12,430
    // We want exactly £20,000 dividends: extraction = 12,570 + 20,000 = 32,570
    const result = calc.compute({
      targetExtraction: 32_570,
      companyProfit: 200_000,
      soloDirector: false,
      otherIncome: 0,
      scotland: false,
    });
    const divRow = result.rows?.find((r) => r.label.startsWith("Dividend tax"));
    // (20,000 - 500) * 10.75% = 19,500 * 0.1075 = 2,096.25 -> £2,096
    expect(divRow?.value).toBe("£2,096");
  });

  it("Dividend tax: basic-rate component of 10.75% rate is correct (37,700 div + £500 allowance)", () => {
    // £37,700 dividends fills the entire basic band after PA salary.
    // extraction = 12,570 (salary) + 37,700 (dividends) = 50,270
    // divTaxable = 37,700 - 500 = 37,200; all in basic band
    // tax = 37,200 * 10.75% = 3,999 (3999.00)
    const result = calc.compute({
      targetExtraction: 50_270,
      companyProfit: 200_000,
      soloDirector: false,
      otherIncome: 0,
      scotland: false,
    });
    const divRow = result.rows?.find((r) => r.label.startsWith("Dividend tax"));
    // 37,200 * 0.1075 = 3999.00 -> £3,999
    expect(divRow?.value).toBe("£3,999");
  });

  // -------------------------------------------------------------------------
  // 3. CT golden figures from brief:
  //    a) Profit £50,000, small rate 19% -> CT = £9,500 before salary
  //    b) After £12,000 salary + £1,050 employer NIC deduction:
  //       taxable = 50,000 - 13,050 = 36,950; CT = 36,950 * 19% = £7,020.50 -> £7,021
  // -------------------------------------------------------------------------
  it("CT golden figure: £50,000 profit before extraction -> £9,500 CT (small rate 19%)", () => {
    // With targetExtraction = 0 and soloDirector irrelevant, salary = 0, no deductions
    const result = calc.compute({
      targetExtraction: 0,
      companyProfit: 50_000,
      soloDirector: true,
      otherIncome: 0,
      scotland: false,
    });
    const ctRow = result.rows?.find((r) => r.label.startsWith("CT on company"));
    expect(ctRow?.value).toBe("£9,500");
  });

  it("CT golden figure: £50,000 profit, £12,000 salary + £1,050 employer NIC deducted -> £7,021 CT", () => {
    // Extraction £12,000: salary = £12,000 (min(12000, 12570) = 12000)
    // Solo director: erNic = (12,000-5,000)*15% = £1,050
    // Deductible = 12,000 + 1,050 = 13,050
    // Taxable = 50,000 - 13,050 = 36,950; CT = 36,950 * 0.19 = 7,020.50 -> round = £7,021
    const result = calc.compute({
      targetExtraction: 12_000,
      companyProfit: 50_000,
      soloDirector: true,
      otherIncome: 0,
      scotland: false,
    });
    const ctRow = result.rows?.find((r) => r.label.startsWith("CT on company"));
    expect(ctRow?.value).toBe("£7,021");
  });

  // -------------------------------------------------------------------------
  // 4. Low-profit case: warn when post-CT profit < wanted dividends
  // -------------------------------------------------------------------------
  it("Low-profit case: warns when dividends exceed distributable post-CT profit", () => {
    const result = calc.compute({
      targetExtraction: 80_000,
      companyProfit: 20_000,  // too small to fund large dividends
      soloDirector: true,
      otherIncome: 0,
      scotland: false,
    });
    expect(result.headline.tone).toBe("warn");
    expect(result.headline.label).toBe("Low-profit warning");
  });

  // -------------------------------------------------------------------------
  // 5. Scotland flag appears in note when scotland = true
  // -------------------------------------------------------------------------
  it("Scotland flag: note mentions Scottish income tax on salary line", () => {
    const result = calc.compute({
      targetExtraction: 50_000,
      companyProfit: 80_000,
      soloDirector: false,
      otherIncome: 0,
      scotland: true,
    });
    expect(result.note).toContain("Scottish income tax");
  });

  // -------------------------------------------------------------------------
  // 6. Dividends are post-CT (not deducted from pre-CT profit)
  //    With £0 salary and large profit, CT is paid first, then dividends come
  //    from what remains — not from the gross profit.
  // -------------------------------------------------------------------------
  it("Dividends are computed from post-CT profit, not gross profit", () => {
    const result = calc.compute({
      targetExtraction: 20_000,
      companyProfit: 30_000,
      soloDirector: false,
      otherIncome: 0,
      scotland: false,
    });
    // Salary = min(20000, 12570) = 12570; erNic covered by EA (solo=false)
    // Taxable after salary = 30000 - 12570 = 17430; CT = 17430*0.19 = 3311.70 ~ £3,312
    // post-CT pool = 17430 - 3312 = 14118
    // Dividends wanted = 20000 - 12570 = 7430 -> 7430 <= 14118, ok
    const divRow = result.rows?.find((r) => r.label.startsWith("Dividends paid"));
    expect(divRow?.value).toBe("£7,430");
    // Headline tone should NOT be warn
    expect(result.headline.tone).not.toBe("warn");
  });

  // -------------------------------------------------------------------------
  // 7. Dividend rate boundary: dividends pushed into higher rate
  //    Founder with £37,700 non-dividend income (basic band almost full) +
  //    £20,000 dividends: some should fall into upper band
  // -------------------------------------------------------------------------
  it("Dividend rate: dividends crossing into higher band taxed at 35.75% on the upper portion", () => {
    // PA = £12,570; basic band top = £50,270; basic space = 50,270 - 12,570 = 37,700
    // otherIncome = £37,700 (fills basic band exactly after PA)
    // dividends = £20,000; all in upper band (above 50,270)
    // divTaxable = 20,000 - 500 = 19,500
    // Tax = 19,500 * 35.75% = 6,971.25 -> £6,971
    const result = calc.compute({
      targetExtraction: 32_570,  // salary = 12,570, dividends = 20,000
      companyProfit: 200_000,
      soloDirector: false,
      otherIncome: 37_700,
      scotland: false,
    });
    const divRow = result.rows?.find((r) => r.label.startsWith("Dividend tax"));
    expect(divRow?.value).toBe("£6,971");
  });
});
