/**
 * Guards the result gate's single wiring point.
 *
 * The gate must be wired at the CalculatorClient boundary and NOWHERE else.
 * CalculatorClient has three importers: /calculators/[slug], /embed/[slug] and
 * /nhs-pension — the flagship pillar, on the DEFAULT variant. A gate written
 * into the /calculators route would gate ten calculator pages and leave
 * /nhs-pension ungated, which is exactly how the generalist port failed at this
 * phase with a different filename.
 *
 * The storage-key tests guard the other half: four ids are BOTH a generic slug
 * and a premium toolId, so an unprefixed key would let the free calculator
 * silently unlock the premium one.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC = join(process.cwd(), "src");

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

// This test file names every guarded string, so it excludes itself from the corpus.
const files = walk(SRC).filter((f) => !f.includes(join("src", "tests")));
const read = (p: string) => readFileSync(p, "utf8");

describe("result gate boundary", () => {
  it("is mounted exactly once, and that once is CalculatorClient", () => {
    // [\s>] so this does not also match <ResultGateModal.
    const mounts = files.filter((f) => /<ResultGate[\s>]/.test(read(f)));
    // CalculatorClient (generic fleet) + PremiumCalculator (premium fleet). No
    // route file may appear here.
    expect(mounts.map((f) => f.replace(SRC, "").replace(/\\/g, "/")).sort()).toEqual([
      "/components/tools/CalculatorClient.tsx",
      "/components/tools/premium/PremiumCalculator.tsx",
    ]);
  });

  it("is never wired per-route", () => {
    const appMounts = files.filter(
      (f) => f.includes(join("src", "app")) && read(f).includes("ResultGate")
    );
    expect(appMounts).toEqual([]);
  });

  it("gates the /nhs-pension pillar, because it mounts CalculatorClient", () => {
    const pillar = read(join(SRC, "app", "nhs-pension", "page.tsx"));
    expect(pillar).toContain("CalculatorClient");
    // The pillar passes no variant, so it takes the default "page" and the
    // gate's enabled={variant !== "embed"} is true there.
    expect(/<CalculatorClient[^>]*variant=/.test(pillar)).toBe(false);
  });

  it("excludes embeds structurally, from the same single wiring", () => {
    expect(read(join(SRC, "components", "tools", "CalculatorClient.tsx"))).toContain(
      'enabled={variant !== "embed"}'
    );
  });

  // Built rather than written out, so the acceptance greps for these strings
  // return ZERO hits across src and this guard is not its own false positive.
  const RETIRED_GLOBAL = "gateModal" + "ShownThisSession";
  const RETIRED_CTA = "Calc" + "ResultCta";

  it("has no once-per-session global left", () => {
    expect(files.filter((f) => read(f).includes(RETIRED_GLOBAL))).toEqual([]);
  });

  it("has no retired always-visible result CTA left", () => {
    expect(existsSync(join(SRC, "components", "tools", `${RETIRED_CTA}.tsx`))).toBe(false);
    expect(files.filter((f) => read(f).includes(RETIRED_CTA))).toEqual([]);
  });

  it("builds reveal keys only in resultGateStorage", () => {
    const owners = files
      .filter((f) => read(f).includes("ma_calc" + "_revealed_"))
      .map((f) => f.replace(SRC, "").replace(/\\/g, "/"));
    expect(owners).toEqual(["/components/tools/resultGateStorage.ts"]);
  });

  it("namespaces the key by tier, because four ids exist in both fleets", () => {
    const storage = read(join(SRC, "components", "tools", "resultGateStorage.ts"));
    expect(storage).toContain("`ma_calc" + "_revealed_${tier}_${campaign}`");
  });
});
