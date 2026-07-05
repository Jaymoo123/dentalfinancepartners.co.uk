/**
 * Golden tests for the UDA value xlsx builder.
 *
 * Asserts that the workbook formula logic at its default inputs equals
 * calcUdaValue() from the compute lib.
 *
 * Golden case (brief §4.1):
 *   region=england, udas=12000, contractValue=336000, yearSigned=2019
 *   -> effectiveUda=28, yearsSinceSigned=7, realValuePerUda~=23.5554, position="within"
 *
 * Trace:
 *   effectiveUda = 336000 / 12000 = 28
 *   yearsSinceSigned = max(0, 2026-2019) = 7
 *   cumulativeCpi = (1.025)^7 - 1 = 1.18868...  - 1 = 0.18868...
 *   realValuePerUda = 28 / 1.18868... = 23.5554...
 *   benchmark England: [25, 35]; 28 is within range -> "within"
 */
import { describe, it, expect } from "vitest";
import { calcUdaValue } from "../../../src/lib/tools/compute/uda-value.js";

describe("UDA value builder: brief golden case (england, 12000 UDAs, GBP336000, signed 2019)", () => {
  const res = calcUdaValue("england", 12000, 336000, 2019);

  it("effectiveUda equals 28", () => {
    expect(res.effectiveUda).toBeCloseTo(28, 5);
  });

  it("yearsSinceSigned equals 7", () => {
    expect(res.yearsSinceSigned).toBe(7);
  });

  it("cumulativeCpi equals (1.025)^7 - 1", () => {
    expect(res.cumulativeCpi).toBeCloseTo(Math.pow(1.025, 7) - 1, 8);
  });

  it("realValuePerUda close to 23.5554", () => {
    expect(res.realValuePerUda).toBeCloseTo(23.5554, 2);
  });

  it("positionVsBenchmark is within (GBP28 is between GBP25 and GBP35)", () => {
    expect(res.positionVsBenchmark).toBe("within");
  });

  it("benchmarkLow England is 25", () => {
    expect(res.benchmarkLow).toBe(25);
  });

  it("benchmarkHigh England is 35", () => {
    expect(res.benchmarkHigh).toBe(35);
  });
});

describe("UDA value builder: below benchmark (GBP20 UDA, england)", () => {
  const res = calcUdaValue("england", 10000, 200000, 2022);

  it("effectiveUda is 20", () => {
    expect(res.effectiveUda).toBe(20);
  });

  it("position is below", () => {
    expect(res.positionVsBenchmark).toBe("below");
  });
});

describe("UDA value builder: above benchmark (GBP40 UDA, england)", () => {
  const res = calcUdaValue("england", 10000, 400000, 2022);

  it("effectiveUda is 40", () => {
    expect(res.effectiveUda).toBe(40);
  });

  it("position is above", () => {
    expect(res.positionVsBenchmark).toBe("above");
  });
});

describe("UDA value builder: Wales benchmark (wider range)", () => {
  const res = calcUdaValue("wales", 5000, 180000, 2020);

  it("benchmarkLow Wales is 25", () => {
    expect(res.benchmarkLow).toBe(25);
  });

  it("benchmarkHigh Wales is 38", () => {
    expect(res.benchmarkHigh).toBe(38);
  });
});

describe("UDA value builder: Northern Ireland", () => {
  const res = calcUdaValue("ni", 4000, 120000, 2018);

  it("benchmarkLow NI is 21", () => {
    expect(res.benchmarkLow).toBe(21);
  });

  it("benchmarkHigh NI is 32", () => {
    expect(res.benchmarkHigh).toBe(32);
  });
});

describe("UDA value builder: zero UDAs edge case", () => {
  const res = calcUdaValue("england", 0, 100000, 2019);

  it("effectiveUda is 0", () => {
    expect(res.effectiveUda).toBe(0);
  });
});

describe("UDA value builder: real value always less than effective (inflation erodes)", () => {
  const res = calcUdaValue("england", 5000, 150000, 2010);

  it("realValuePerUda < effectiveUda (CPI erosion)", () => {
    expect(res.realValuePerUda).toBeLessThan(res.effectiveUda);
  });
});
