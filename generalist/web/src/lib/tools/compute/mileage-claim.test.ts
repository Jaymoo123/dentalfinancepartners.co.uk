// Golden tests for mileage-claim compute (2026/27: car/van 55p first 10k / 25p
// above; motorcycle 24p; bicycle 20p). Separate file: compute.test.ts is being
// edited by parallel tool builds.
import { describe, it, expect } from "vitest";
import { calcMileage } from "./mileage-claim";

const r2 = (n: number) => Math.round(n * 100) / 100;

describe("mileage-claim compute", () => {
  it("self-employed 14,000 car miles = £6,500, £2,600 saving at 40%", () => {
    const r = calcMileage("selfEmployed", "car_van", 14000, 0, 0.4);
    expect(r.amap).toBe(6500); // 10000*0.55 + 4000*0.25
    expect(r.taxAtMarginal).toBe(2600);
    expect(r2(r.upliftVsOld)).toBe(1000); // vs 45p first 10k
  });

  it("employee 8,000 miles at 45p → £800 shortfall, £160 MAR at 20%", () => {
    const r = calcMileage("employee", "car_van", 8000, 45, 0.2);
    expect(r2(r.amap)).toBe(4400);
    expect(r2(r.shortfall)).toBe(800);
    expect(r2(r.taxAtMarginal)).toBe(160);
    expect(r.excess).toBe(0);
  });

  it("employee 5,000 miles at 70p → £750 excess, tax + 8% NIC", () => {
    const r = calcMileage("employee", "car_van", 5000, 70, 0.4);
    expect(r2(r.excess)).toBe(750); // 3500 - 2750
    expect(r2(r.taxAtMarginal)).toBe(300);
    expect(r2(r.nicOnExcess)).toBe(60);
  });

  it("motorcycle and bicycle flat rates, no uplift vs old car rate", () => {
    expect(calcMileage("selfEmployed", "motorcycle", 1000, 0, 0.2).amap).toBe(240);
    expect(calcMileage("selfEmployed", "bicycle", 1000, 0, 0.2).amap).toBe(200);
    expect(calcMileage("selfEmployed", "bicycle", 1000, 0, 0.2).upliftVsOld).toBe(0);
  });
});
