/**
 * Carve-out 5 guard for the calculators subsystem.
 *
 * `CalculatorTabs` renders `<button role="tab">`, not `<a href>`. It is a good
 * component and it stays (Rule Zero), but the block it replaces on a page
 * carries no crawlable link to any `/calculators/*` page. The designer saw this
 * and wrote `CalculatorLinkCards` to solve it, argued the trade-off in that
 * file's own docstring ("Cards rather than tabs on purpose: every tool stays a
 * real crawlable link"), and then never wired it up on any page.
 *
 * In the designer's tree `CalculatorTabs` lands on 11 pages, and on two of them
 * (`/services/property-accountant` and `/services/property-tax-advice`) their
 * version drops 4 crawlable calculator links each. Phase 4 ships the component
 * but only puts it on `/calculators`, where the full 26-link directory renders
 * two sections below it, so nothing is breached yet. Phases 5 and 6 put it on
 * the other ten pages, and that is where the links would quietly go.
 *
 * This test is what stops that happening silently. It is a source-file scan
 * rather than a render, deliberately: the point is to catch the page edit at the
 * moment it is written.
 */

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const APP_DIR = join(__dirname, "..", "app");

/**
 * A page that renders the tabs must also put at least one real `<a href>` to a
 * calculator in its own markup, either through the designer's card component or
 * directly.
 */
export function keepsCrawlPath(src: string): boolean {
  if (!src.includes("<CalculatorTabs")) return true;
  return src.includes("<CalculatorLinkCards") || /href=\{?["'`]\/calculators\//.test(src);
}

function pageFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...pageFiles(full));
    else if (entry === "page.tsx") out.push(full);
  }
  return out;
}

describe("CalculatorTabs pages keep a crawlable path to /calculators/*", () => {
  it("the predicate fails a tabs page with no calculator link", () => {
    expect(keepsCrawlPath("<CalculatorTabs />")).toBe(false);
    expect(keepsCrawlPath('<CalculatorTabs /><CalculatorLinkCards items={x} />')).toBe(true);
    expect(keepsCrawlPath('<CalculatorTabs /><Link href="/calculators/mtd-checker" />')).toBe(true);
    expect(keepsCrawlPath("<p>no tabs here</p>")).toBe(true);
  });

  const pages = pageFiles(APP_DIR).filter((p) =>
    readFileSync(p, "utf8").includes("<CalculatorTabs"),
  );

  it("at least one page renders CalculatorTabs, so the guard is live", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  for (const page of pages) {
    const rel = page.slice(page.indexOf(join("src", "app")));
    it(`${rel} keeps a crawlable calculator link`, () => {
      expect(
        keepsCrawlPath(readFileSync(page, "utf8")),
        `${rel} renders CalculatorTabs but has no <a href> to any /calculators/* page. ` +
          "Wire <CalculatorLinkCards>, which is the designer's own fix for exactly this.",
      ).toBe(true);
    });
  }
});
