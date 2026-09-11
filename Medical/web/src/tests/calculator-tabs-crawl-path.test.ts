/**
 * Site-parameterised consumption of the estate `calculator-tabs-crawl-path`
 * guard. A page that renders a tabs-only calculator switcher must still carry
 * a real in-body link to a specific /calculators/<slug> page, because tabs
 * render <button role="tab">, not <a href>. See DISPOSITION_SLICE2 B.1/B.4.
 *
 * STATE OF THIS SITE: phase 5 mounts `<CalculatorTabs` on `/services` and
 * `/medical-guides`, and on the four `/for-*` routes through
 * `AudienceStageLayout`. `requireLiveUsage` is therefore TRUE: the guard fails
 * if no page renders the component, which would mean it was passing vacuously.
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
  it("the tabs component is live on at least one page", () => {
    const pages = pageFiles(APP_DIR).filter((p) => readFileSync(p, "utf8").includes(TABS_TAG));
    expect(
      pages.length,
      "no page renders " + TABS_TAG + " any more, so requireLiveUsage: true is now the honest failure.",
    ).toBeGreaterThan(0);
  });

  /**
   * The four /for-* routes render the tabs THROUGH AudienceStageLayout, so the
   * guard above (a per-page source scan) never sees them. Their literal hrefs
   * live in their own page files, which is what this checks.
   */
  it("every /for-* page spells out its own /calculators/<slug> hrefs", () => {
    const owed: Record<string, string[]> = {
      "for-gps": ["/calculators/nhs-pension-annual-allowance"],
      "for-consultants": [
        "/calculators/nhs-pension-annual-allowance",
        "/calculators/private-practice-incorporation",
      ],
      "for-locum-doctors": ["/calculators/locum-tax-calculator"],
      "for-junior-doctors": ["/calculators/locum-tax-calculator"],
    };
    for (const [route, hrefs] of Object.entries(owed)) {
      const src = readFileSync(join(APP_DIR, route, "page.tsx"), "utf8");
      for (const href of hrefs) {
        expect(src, `${route} owes a literal href to ${href}`).toContain(`"${href}"`);
      }
    }
  });
});
