import { describe, it, expect } from "vitest";
import { seisEisReliefCalculator } from "./seis-eis-relief-calculator";

// Golden figures from brief calc-seis-eis-relief-calculator.md
// HP8:  SEIS 50% IT relief on <= £200,000/yr
// HP10: EIS  30% IT relief on <= £1,000,000/yr
// HP30: IT bands — basic 20%, higher 40%, additional 45%
// Formula: worstCaseNetLoss = (I - relief) * (1 - band)

function compute(args: Record<string, string | number>) {
  return seisEisReliefCalculator.compute(args);
}

function row(result: ReturnType<typeof compute>, label: string) {
  return result.rows?.find((r) => r.label.startsWith(label))?.value;
}

// ── SEIS golden figures ────────────────────────────────────────────────────

describe("SEIS income tax relief", () => {
  it("£10k SEIS → relief £5,000 (HP8 50%)", () => {
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "SEIS income tax relief")).toBe("£5,000");
  });

  it("£10k SEIS → net cost £5,000", () => {
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "Net cash cost after IT relief")).toBe("£5,000");
  });

  it("£10k SEIS @45% → worst-case net loss £2,750 (brief golden figure)", () => {
    // (10000 - 5000) * (1 - 0.45) = 5000 * 0.55 = 2750
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "Worst-case net loss")).toBe("£2,750");
  });

  it("£10k SEIS @45% → loss relief £2,250", () => {
    // 5000 * 0.45 = 2250
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "Loss relief on failure")).toBe("£2,250");
  });

  it("£10k SEIS @20% (basic) → worst-case loss £4,000", () => {
    // (10000 - 5000) * (1 - 0.20) = 5000 * 0.80 = 4000
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.20", gainReinvested: 0 });
    expect(row(r, "Worst-case net loss")).toBe("£4,000");
  });

  it("£10k SEIS @40% (higher) → worst-case loss £3,000", () => {
    // (10000 - 5000) * (1 - 0.40) = 5000 * 0.60 = 3000
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.40", gainReinvested: 0 });
    expect(row(r, "Worst-case net loss")).toBe("£3,000");
  });
});

// ── SEIS cap (HP8 £200k limit) ─────────────────────────────────────────────

describe("SEIS annual cap", () => {
  it("£250k SEIS → relief capped at £200k × 50% = £100,000 (HP8)", () => {
    const r = compute({ investmentAmount: 250000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "SEIS income tax relief")).toBe("£100,000");
  });

  it("£250k SEIS → cap flag appears in note", () => {
    const r = compute({ investmentAmount: 250000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(r.note).toMatch(/£200,000/);
    expect(r.note).toMatch(/annual investor limit/i);
  });

  it("£200k SEIS exactly → NOT capped, relief £100,000", () => {
    const r = compute({ investmentAmount: 200000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "SEIS income tax relief")).toBe("£100,000");
    // no cap flag
    expect(r.note).not.toMatch(/annual investor limit/i);
  });
});

// ── SEIS CGT reinvestment exemption (HP8) ─────────────────────────────────

describe("SEIS CGT reinvestment exemption", () => {
  it("£10k invested, £10k gain → exempt gain £5,000 (50% of min(G,I))", () => {
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 10000 });
    expect(row(r, "SEIS CGT reinvestment exemption")).toBe("£5,000");
  });

  it("gain > investment: exemption capped at investment amount", () => {
    // G=20000, I=10000 → eligible=10000, exempt=5000
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 20000 });
    expect(row(r, "SEIS CGT reinvestment exemption")).toBe("£5,000");
  });

  it("gain=0 → no CGT line shown", () => {
    const r = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    const hasCgtRow = r.rows?.some((r) => r.label.includes("CGT"));
    expect(hasCgtRow).toBe(false);
  });
});

// ── EIS golden figures ─────────────────────────────────────────────────────

describe("EIS income tax relief", () => {
  it("£10k EIS → relief £3,000 (HP10 30%)", () => {
    const r = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "EIS income tax relief")).toBe("£3,000");
  });

  it("£10k EIS → net cost £7,000", () => {
    const r = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "Net cash cost after IT relief")).toBe("£7,000");
  });

  it("£10k EIS @45% → worst-case net loss £3,850 (brief golden figure)", () => {
    // (10000 - 3000) * (1 - 0.45) = 7000 * 0.55 = 3850
    const r = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "Worst-case net loss")).toBe("£3,850");
  });

  it("£10k EIS @45% → loss relief £3,150", () => {
    // 7000 * 0.45 = 3150
    const r = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "Loss relief on failure")).toBe("£3,150");
  });
});

// ── EIS cap (HP10 £1m limit) ───────────────────────────────────────────────

describe("EIS annual cap", () => {
  it("£1.2m EIS → relief capped at £1m × 30% = £300,000 (HP10)", () => {
    const r = compute({ investmentAmount: 1_200_000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "EIS income tax relief")).toBe("£300,000");
  });

  it("£1.2m EIS → KIC note appears in note", () => {
    const r = compute({ investmentAmount: 1_200_000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(r.note).toMatch(/knowledge-intensive/i);
    expect(r.note).toMatch(/£2,000,000/);
  });
});

// ── EIS CGT deferral (NOT exemption) ──────────────────────────────────────

describe("EIS CGT deferral", () => {
  it("£10k EIS, £10k gain → deferral shown as £10,000", () => {
    const r = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 10000 });
    expect(row(r, "EIS CGT deferral available")).toBe("£10,000");
  });

  it("EIS note states deferral, not exemption", () => {
    const r = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 10000 });
    expect(r.note).toMatch(/deferral/i);
    expect(r.note).toMatch(/not an exemption/i);
  });

  it("EIS does NOT show a 50% CGT exemption row", () => {
    const r = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 10000 });
    const has50pcExemption = r.rows?.some((row) => row.label.includes("50%") && row.label.includes("CGT"));
    expect(has50pcExemption).toBe(false);
  });
});

// ── Band drives loss relief ONLY, not the IT relief rate ──────────────────

describe("Band isolation (hallucination guard)", () => {
  it("SEIS 50% relief is unchanged across all bands", () => {
    const basic  = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.20", gainReinvested: 0 });
    const higher = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.40", gainReinvested: 0 });
    const addl   = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(basic,  "SEIS income tax relief")).toBe("£5,000");
    expect(row(higher, "SEIS income tax relief")).toBe("£5,000");
    expect(row(addl,   "SEIS income tax relief")).toBe("£5,000");
  });

  it("EIS 30% relief is unchanged across all bands", () => {
    const basic  = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.20", gainReinvested: 0 });
    const higher = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.40", gainReinvested: 0 });
    const addl   = compute({ investmentAmount: 10000, scheme: "eis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(basic,  "EIS income tax relief")).toBe("£3,000");
    expect(row(higher, "EIS income tax relief")).toBe("£3,000");
    expect(row(addl,   "EIS income tax relief")).toBe("£3,000");
  });
});

// ── Edge cases ─────────────────────────────────────────────────────────────

describe("Edge cases", () => {
  it("zero investment → all values £0", () => {
    const r = compute({ investmentAmount: 0, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(row(r, "SEIS income tax relief")).toBe("£0");
    expect(row(r, "Worst-case net loss")).toBe("£0");
  });

  it("not-advice disclaimer present in every result", () => {
    const seis = compute({ investmentAmount: 10000, scheme: "seis", incomeTaxBand: "0.45", gainReinvested: 0 });
    const eis  = compute({ investmentAmount: 10000, scheme: "eis",  incomeTaxBand: "0.45", gainReinvested: 0 });
    expect(seis.note).toMatch(/general tax illustration/i);
    expect(eis.note).toMatch(/general tax illustration/i);
  });
});
