/**
 * Self-test for the calculator-tabs-crawl-path guard TEMPLATE.
 *
 * Exercises the pure `keepsCrawlPath` predicate against inline source
 * strings only — no filesystem access, no site content directory. Mirrors
 * the fixture assertions in Property's original
 * `calculator-tabs-crawl-path.test.ts`, translated to the parameterised API,
 * plus one case with non-Property tag/route names to prove the template
 * actually generalises rather than hard-coding "CalculatorTabs"/"/calculators/".
 */
import { describe, it, expect } from "vitest";
import { keepsCrawlPath } from "./calculator-tabs-crawl-path";

const propertyOpts = {
  appDir: "",
  tabsTag: "<CalculatorTabs",
  linkCardsTag: "<CalculatorLinkCards",
  toolRoutePrefix: "/calculators/",
  toolIndexRoute: "/calculators",
  noPriorInBodyLinks: ["src/app/page.tsx"],
  ownerRemovedInBodyLinks: [
    "src/app/services/property-accountant/page.tsx",
    "src/app/services/property-tax-advice/page.tsx",
  ],
};

describe("keepsCrawlPath", () => {
  it("fails a tabs page with no per-tool link, passes one with a real link", () => {
    expect(keepsCrawlPath("<CalculatorTabs />", "", propertyOpts)).toBe(false);
    expect(
      keepsCrawlPath('<CalculatorTabs /><CalculatorLinkCards items={x} />', "", propertyOpts),
    ).toBe(true);
    expect(
      keepsCrawlPath('<CalculatorTabs /><Link href="/calculators/mtd-checker" />', "", propertyOpts),
    ).toBe(true);
    expect(
      keepsCrawlPath("<CalculatorTabs /><Link href={`/calculators/${t.slug}`} />", "", propertyOpts),
    ).toBe(true);
    expect(
      keepsCrawlPath(
        '<CalculatorTabs /><Section calc={{ href: "/calculators/mtd-checker" }} />',
        "",
        propertyOpts,
      ),
    ).toBe(true);
    expect(keepsCrawlPath('<CalculatorTabs /><Link href="/blog/mtd" />', "", propertyOpts)).toBe(false);
    expect(
      keepsCrawlPath('<CalculatorTabs /><Link href="/calculators-guide" />', "", propertyOpts),
    ).toBe(false);
    expect(keepsCrawlPath("<p>no tabs here</p>", "", propertyOpts)).toBe(true);
  });

  it("an index-only link satisfies only a route in noPriorInBodyLinks", () => {
    const src = '<CalculatorTabs /><Link href="/calculators" />';
    expect(keepsCrawlPath(src, "src/app/page.tsx", propertyOpts)).toBe(true);
    expect(keepsCrawlPath(src, "src/app/making-tax-digital-landlords/page.tsx", propertyOpts)).toBe(
      false,
    );
    expect(keepsCrawlPath("<CalculatorTabs />", "src/app/page.tsx", propertyOpts)).toBe(false);
  });

  it("the owner-removed exemption is scoped to its listed routes only", () => {
    const src = "<CalculatorTabs />";
    expect(keepsCrawlPath(src, "src/app/services/property-accountant/page.tsx", propertyOpts)).toBe(
      true,
    );
    expect(keepsCrawlPath(src, "src/app/services/landlord-accountant/page.tsx", propertyOpts)).toBe(
      false,
    );
  });

  it("defaults both exemption lists to empty when omitted", () => {
    const bare = {
      appDir: "",
      tabsTag: "<CalculatorTabs",
      linkCardsTag: "<CalculatorLinkCards",
      toolRoutePrefix: "/calculators/",
      toolIndexRoute: "/calculators",
    };
    // No exemption lists supplied: every route needs a real per-tool link,
    // including the ones Property carved out.
    expect(keepsCrawlPath("<CalculatorTabs />", "src/app/page.tsx", bare)).toBe(false);
    expect(
      keepsCrawlPath("<CalculatorTabs />", "src/app/services/property-accountant/page.tsx", bare),
    ).toBe(false);
  });

  it("generalises to a differently-named tabs component, fix component and route prefix", () => {
    const cryptoOpts = {
      appDir: "",
      tabsTag: "<ToolTabs",
      linkCardsTag: "<ToolLinkCards",
      toolRoutePrefix: "/tools/",
      toolIndexRoute: "/tools",
    };
    expect(keepsCrawlPath("<ToolTabs />", "", cryptoOpts)).toBe(false);
    expect(keepsCrawlPath('<ToolTabs /><ToolLinkCards items={x} />', "", cryptoOpts)).toBe(true);
    expect(keepsCrawlPath('<ToolTabs /><Link href="/tools/cgt-checker" />', "", cryptoOpts)).toBe(true);
    // Property's own tag/prefix must not match under crypto's options.
    expect(
      keepsCrawlPath('<ToolTabs /><Link href="/calculators/mtd-checker" />', "", cryptoOpts),
    ).toBe(false);
  });
});
