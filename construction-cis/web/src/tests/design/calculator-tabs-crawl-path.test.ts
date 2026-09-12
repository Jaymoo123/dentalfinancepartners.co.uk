/**
 * Site instantiation of the estate `calculator-tabs-crawl-path` guard.
 *
 * THE REGRESSION IT GUARDS. Property's homepage swapped a list of real
 * `<a href="/calculators/...">` links for a tabs component that renders
 * `<button role="tab">`. Reachability survived, because the footer still links
 * every tool, but the page-authored, topical, in-body link from a commercial
 * page to the specific tool it discusses did not, and that is the link that
 * carries equity.
 *
 * TRADE'S POSITION TODAY, and why this is not a vacuous guard. Trade renders NO
 * tabs component: `src/app/page.tsx:137-153` says so in its own ponytail comment
 * and the band is four literal server-rendered anchors read out of the registry
 * by slug. So the kit registrar runs with `requireLiveUsage: false` (its default
 * of true would fail for the absence of a defect), and the guard that actually
 * bites on this site is the second block below: the four featured calculator
 * slugs are pinned, they must still exist in the live registry, and the homepage
 * must still resolve them through `getGenericTool` and hand them to a component
 * that renders `toolPath(...)`. Replace those anchors with a tabs component, or
 * drop a slug from the registry so `.filter(Boolean)` silently shrinks the band,
 * and this goes red.
 *
 * The predicate is IMPORTED from the kit, never re-implemented, so the day Trade
 * does adopt a tabs component the estate's rule is already pointed at it.
 * Both exemption lists start empty and stay empty until an owner decision says
 * otherwise, exactly as the template requires.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { registerCalculatorTabsCrawlPathGuard } from "@accounting-network/web-shared/design/guards/calculator-tabs-crawl-path";
import { allTools, getGenericTool, toolPath } from "@/lib/calculators/registry";

const SRC = join(__dirname, "..", "..");

registerCalculatorTabsCrawlPathGuard({
  appDir: join(SRC, "app"),
  tabsTag: "<CalculatorTabs",
  linkCardsTag: "<CalculatorLinkCards",
  toolRoutePrefix: "/calculators/",
  toolIndexRoute: "/calculators",
  // Empty by decision, not by oversight. A route earns an entry only on a
  // recorded owner decision, never because a page edit tripped the guard.
  noPriorInBodyLinks: [],
  ownerRemovedInBodyLinks: [],
  // Trade has no tabs component. See the docblock: the live half of this guard
  // is the featured-band block below.
  requireLiveUsage: false,
});

/** The homepage band, pinned. Read from page.tsx so a rename cannot pass. */
const FEATURED = [
  "cis-refund-estimator",
  "cis-deduction-calculator",
  "cis-gps-eligibility-checker",
  "cis-sole-trader-vs-limited",
];

describe("homepage keeps crawlable in-body links to specific calculators", () => {
  const home = readFileSync(join(SRC, "app", "page.tsx"), "utf8");

  it("guard-the-guard: the registry is populated and the tools resolve", () => {
    expect(allTools().length).toBeGreaterThanOrEqual(12);
    for (const slug of FEATURED) {
      expect(getGenericTool(slug), `${slug} is gone from the registry`).toBeDefined();
      expect(toolPath(slug)).toBe(`/calculators/${slug}`);
    }
  });

  it("the homepage still lists exactly the four assessed slugs", () => {
    const listed = (home.match(/"cis-[a-z0-9-]+"/g) || [])
      .map((s) => s.slice(1, -1))
      .filter((s) => FEATURED.includes(s));
    expect([...new Set(listed)].sort()).toEqual([...FEATURED].sort());
  });

  it("the band resolves real per-tool routes rather than rendering a tabs switcher", () => {
    // The failure this is pointed at: the four anchors become <button role="tab">
    // and the only remaining path to a tool is site chrome.
    expect(home).toContain("featuredCalculatorSlugs");
    expect(home).toMatch(/getGenericTool\(slug\)/);
    expect(home).not.toContain("<CalculatorTabs");
    expect(home).not.toMatch(/role="tab"/);
    // The band's own anchors are inline in page.tsx: one <Link> per tool with a
    // real per-tool href, plus the index link beneath it. The index link on its
    // own is chrome and does not satisfy this.
    expect(home).toMatch(/href=\{`\/calculators\/\$\{tool\.slug\}`\}/);
  });
});
