/**
 * Site-parameterised consumption of the estate `calculator-tabs-crawl-path`
 * guard. A page that renders a tabs-only calculator switcher must still carry
 * a real in-body link to a specific /calculators/<slug> page, because tabs
 * render <button role="tab">, not <a href>. See DESIGN_SYSTEM.md 0.4.
 *
 * STATE OF THIS SITE: `/calculators` renders `<CalculatorTabs` in its Tier 1
 * band (phase 4, WP3), so `requireLiveUsage` is TRUE: the guard now fails if
 * no page renders the component, which would mean it was passing vacuously.
 * The Tier 2 directory carries the literal crawl href the guard scans for.
 *
 * Both exemption lists stay empty. A route earns an entry only on a recorded
 * owner decision, never because a page edit tripped the guard.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { registerCalculatorTabsCrawlPathGuard } from "@accounting-network/web-shared/design/guards/calculator-tabs-crawl-path";

const APP_DIR = join(__dirname, "..", "app");
const TABS_TAG = "<CalculatorTabs";

registerCalculatorTabsCrawlPathGuard({
  appDir: APP_DIR,
  tabsTag: TABS_TAG,
  linkCardsTag: "<CalculatorLinkCards",
  toolRoutePrefix: "/calculators/",
  toolIndexRoute: "/calculators",
  noPriorInBodyLinks: [],
  ownerRemovedInBodyLinks: [],
  requireLiveUsage: true,
});

function pageFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...pageFiles(full));
    else if (entry === "page.tsx") out.push(full);
  }
  return out;
}

describe("calculator tabs component adoption", () => {
  it("the /calculators index is the page that renders the tabs component", () => {
    const pages = pageFiles(APP_DIR)
      .filter((p) => readFileSync(p, "utf8").includes(TABS_TAG))
      .map((p) => p.replace(/\\/g, "/"));
    expect(pages.length, "no page renders " + TABS_TAG + " any more, so requireLiveUsage: true is now the honest failure.").toBeGreaterThan(0);
    expect(pages.some((p) => p.endsWith("app/calculators/page.tsx"))).toBe(true);
  });
});
