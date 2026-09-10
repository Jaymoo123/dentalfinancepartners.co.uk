/**
 * Site-parameterised consumption of the estate `calculator-tabs-crawl-path`
 * guard. A page that renders a tabs-only calculator switcher must still carry
 * a real in-body link to a specific /calculators/<slug> page, because tabs
 * render <button role="tab">, not <a href>. See DESIGN_SYSTEM.md 0.4.
 *
 * STATE OF THIS SITE: no <CalculatorTabs component exists here yet. The
 * calculator fleet is still plain routes under /calculators. So
 * `requireLiveUsage` is false, otherwise the guard would fail for the honest
 * reason that the component it protects has not been ported. The per-page
 * assertions arm themselves automatically the moment a page renders the tag,
 * and the "no tabs component yet" test below fails loudly at that point so
 * `requireLiveUsage` gets flipped back to true rather than left false forever.
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
  requireLiveUsage: false,
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
  it("no page renders the tabs component yet, so requireLiveUsage may stay false", () => {
    const pages = pageFiles(APP_DIR).filter((p) =>
      readFileSync(p, "utf8").includes(TABS_TAG),
    );
    expect(
      pages.map((p) => p.replace(/\\/g, "/")),
      "a page now renders " +
        TABS_TAG +
        ". Set requireLiveUsage: true in this file so the guard stops being " +
        "allowed to pass vacuously.",
    ).toEqual([]);
  });
});
