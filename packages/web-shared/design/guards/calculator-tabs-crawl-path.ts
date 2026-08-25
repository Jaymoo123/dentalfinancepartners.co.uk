/**
 * Guard-test TEMPLATE: keeps a crawlable path to a shared "tool" fleet when a
 * page renders a tabs-only tool switcher instead of a list of real links.
 *
 * Ported from Property's `Property/web/src/tests/calculator-tabs-crawl-path.test.ts`
 * (carve-out 5). The regression this guards: a tabs component renders
 * `<button role="tab">`, not `<a href>`. Reachability survives (a shared
 * footer usually still links every tool once per page), but that is a
 * different signal from a page-authored, TOPICAL, in-body link from a
 * commercial page to the specific tool it discusses, and that is the thing a
 * tabs-only switcher silently deletes. Read Property's original file for the
 * full incident writeup and the standard of proof behind its two exemption
 * lists; this file only carries the portable mechanics.
 *
 * WHAT DID NOT COME ACROSS ON PURPOSE: Property's exemption list CONTENTS
 * (`NO_PRIOR_INBODY_CALCULATOR_LINKS`, `OWNER_REMOVED_INBODY_LINKS`). Those
 * are owner decisions about specific Property routes, not an estate default.
 * Every consuming site starts both lists empty (see the two `?: string[]`
 * options below) and earns entries one recorded owner decision at a time,
 * exactly like Property did.
 *
 * ---- Worked example (crypto, the pilot site) ----
 *
 *   // crypto/web/src/tests/calculator-tabs-crawl-path.test.ts
 *   import { join } from "path";
 *   import { registerCalculatorTabsCrawlPathGuard } from
 *     "@accounting-network/web-shared/design/guards/calculator-tabs-crawl-path";
 *
 *   registerCalculatorTabsCrawlPathGuard({
 *     appDir: join(__dirname, "..", "app"),
 *     tabsTag: "<ToolTabs",
 *     linkCardsTag: "<ToolLinkCards",
 *     toolRoutePrefix: "/calculators/",
 *     toolIndexRoute: "/calculators",
 *     // Both lists start empty. A route earns an entry only after a recorded
 *     // owner decision, never because a page edit tripped the guard.
 *     noPriorInBodyLinks: [],
 *     ownerRemovedInBodyLinks: [],
 *   });
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

export interface CalculatorTabsCrawlPathGuardOptions {
  /** Absolute path to the site's `src/app` directory (or wherever `page.tsx` files live). */
  appDir: string;
  /** JSX opening-tag text for the tabs-only switcher, e.g. `"<CalculatorTabs"`. */
  tabsTag: string;
  /** JSX opening-tag text for the per-tool fix component, e.g. `"<CalculatorLinkCards"`. */
  linkCardsTag: string;
  /** Route prefix a real per-tool link must start with, e.g. `"/calculators/"`. */
  toolRoutePrefix: string;
  /** The bare index route, e.g. `"/calculators"`. Only ever satisfies a route listed in `noPriorInBodyLinks`. */
  toolIndexRoute: string;
  /**
   * Routes that never carried in-body per-tool links before the tabs
   * component existed (e.g. a homepage that always inlined the tools
   * directly, so there is no per-page equity for this guard to protect).
   * Defaults to none: every sibling starts with zero exemptions and earns one
   * only on the same evidence Property required — see that file's docstring
   * for the standard of proof (a git-history check at the commit the tabs
   * component landed, not convenience).
   */
  noPriorInBodyLinks?: string[];
  /**
   * Routes where the owner has explicitly signed off on losing every in-body
   * per-tool link. Defaults to none. Keep this SHORT and add an entry only on
   * a recorded owner decision, never because a page edit tripped the guard —
   * the correct response to a red test is still to restore the links unless
   * the owner says otherwise.
   */
  ownerRemovedInBodyLinks?: string[];
  /**
   * Fail the suite if nothing in `appDir` renders `tabsTag` yet. Defaults to
   * true, matching Property (a passing-vacuously guard is worse than no
   * guard). Pass false for a site that has not ported the tabs component yet.
   */
  requireLiveUsage?: boolean;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasPerToolLink(
  src: string,
  opts: Pick<CalculatorTabsCrawlPathGuardOptions, "linkCardsTag" | "toolRoutePrefix">,
): boolean {
  const prefix = escapeRegExp(opts.toolRoutePrefix);
  return (
    src.includes(opts.linkCardsTag) ||
    // A literal JSX attribute, `href="/calculators/..."`, including the
    // template form `href={`/calculators/${slug}`}`.
    new RegExp(`href=\\{?["'\`]${prefix}`).test(src) ||
    // Or the same link expressed as an object property a component renders
    // into an <a>, `calc={{ href: "/calculators/..." }}`.
    new RegExp(`href:\\s*["'\`]${prefix}`).test(src)
  );
}

/** Pure predicate: does this one page's source keep a crawlable per-tool link? */
export function keepsCrawlPath(
  src: string,
  pagePath: string,
  opts: CalculatorTabsCrawlPathGuardOptions,
): boolean {
  if (!src.includes(opts.tabsTag)) return true;
  const norm = pagePath.replace(/\\/g, "/");
  const ownerRemoved = opts.ownerRemovedInBodyLinks ?? [];
  const noPrior = opts.noPriorInBodyLinks ?? [];
  if (ownerRemoved.some((p) => norm.endsWith(p))) return true;
  if (noPrior.some((p) => norm.endsWith(p))) {
    // Still has to link the index; it is the only crawl affordance that block has.
    const indexEsc = escapeRegExp(opts.toolIndexRoute);
    return new RegExp(`href=\\{?["'\`]${indexEsc}["'\`]`).test(src) || hasPerToolLink(src, opts);
  }
  return hasPerToolLink(src, opts);
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

/**
 * Call this from the SITE's own test file (not from web-shared). It registers
 * real `describe`/`it` blocks in whatever vitest run is currently executing,
 * scanning `opts.appDir` for `page.tsx` files at call time.
 */
export function registerCalculatorTabsCrawlPathGuard(opts: CalculatorTabsCrawlPathGuardOptions) {
  const ownerRemoved = opts.ownerRemovedInBodyLinks ?? [];
  const requireLiveUsage = opts.requireLiveUsage ?? true;

  describe(`${opts.tabsTag.replace("<", "")} pages keep a crawlable path to ${opts.toolRoutePrefix}*`, () => {
    const pages = pageFiles(opts.appDir).filter((p) => readFileSync(p, "utf8").includes(opts.tabsTag));

    it("every owner-exempt route still renders the tabs component and still has no per-tool link", () => {
      // Two-way honesty check on the list: a route that regained its links,
      // or stopped rendering tabs entirely, should come off the exemption.
      for (const rel of ownerRemoved) {
        const page = pages.find((p) => p.replace(/\\/g, "/").endsWith(rel));
        expect(page, `${rel} is exempt but renders no ${opts.tabsTag}`).toBeDefined();
        const src = readFileSync(page!, "utf8");
        expect(
          hasPerToolLink(src, opts),
          `${rel} has per-tool links again, so remove it from ownerRemovedInBodyLinks and let the real guard cover it.`,
        ).toBe(false);
      }
    });

    if (requireLiveUsage) {
      it("at least one page renders the tabs component, so the guard is live", () => {
        expect(pages.length).toBeGreaterThan(0);
      });
    }

    for (const page of pages) {
      const rel = page.replace(/\\/g, "/");
      it(`${rel} keeps a crawlable per-tool link`, () => {
        expect(
          keepsCrawlPath(readFileSync(page, "utf8"), page, opts),
          `${rel} renders ${opts.tabsTag} but has no <a href> to a specific ${opts.toolRoutePrefix}<slug> page. ` +
            `A link to the ${opts.toolIndexRoute} index does not count if site chrome already ships one on every page.`,
        ).toBe(true);
      });
    }
  });
}
