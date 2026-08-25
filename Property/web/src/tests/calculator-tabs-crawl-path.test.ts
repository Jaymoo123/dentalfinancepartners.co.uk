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
 * WHAT MUST BE TRUE, re-derived in Phase 6A.
 *
 * Phase 5 widened this predicate to also accept a bare `href="/calculators"`
 * after its own homepage edit tripped it. That clause was self-authored by the
 * agent the guard caught, so it was re-derived from scratch rather than
 * inherited. The re-derivation says the widening was too wide, and why:
 *
 *  - REACHABILITY is not the thing at risk. `SiteFooter.tsx:31,38` renders five
 *    per-tool calculator links plus "All calculators" in the footer of EVERY
 *    page on the site, server-side. So every `/calculators/*` page is already
 *    two hops from everywhere. A predicate satisfied by a link to the index
 *    therefore asserts something the site chrome already guarantees on every
 *    page, and cannot fail on any page that has a footer. It is vacuous.
 *  - What is actually at risk is PAGE-AUTHORED, TOPICAL equity: the in-body link
 *    from a commercial page to the specific tool it discusses. That is what
 *    carve-out 5 protects, what report 03 §0 counts per page, and what their
 *    version of `/services/property-accountant` and `/services/property-tax-advice`
 *    deletes, 4 links each, when tabs replace the calculator link cards.
 *    `docs/Property/STRUCTURE_VS_COMPETITORS_2026-08-17.md:142` records
 *    `/calculators/mtd-checker` taking 0 in-body links from all 760 blog posts;
 *    the two on `/making-tax-digital-landlords` are its entire support. An index
 *    link is not a substitute for those.
 *  - The designer agrees. Their own fix, `CalculatorLinkCards`, emits one link
 *    per tool, and its docstring is "every tool stays a real crawlable link".
 *    The guard should assert their remedy, not a weaker one.
 *
 * So: a page rendering `CalculatorTabs` must emit a crawlable `<a href>` to a
 * SPECIFIC `/calculators/<slug>` page in its own markup.
 *
 * One page is exempt, narrowly and on evidence rather than on convenience: the
 * homepage. Verified at `design-port-phase-4` (`git show
 * design-port-phase-4:Property/web/src/app/page.tsx`) its "Free tools" section
 * embedded the four calculators inline and carried ZERO in-body calculator
 * links, so its tabs block replaced a calculator stack, not link cards, and
 * there is no per-page equity for this guard to protect there. Phase 5's
 * `href="/calculators"` was a net gain of one link on that page, not a loss of
 * four. Requiring per-tool links there would be new work invented by a test,
 * not regression protection. The exemption is one route wide; every other page
 * that renders tabs, now or later, must carry a real per-tool link.
 */
const NO_PRIOR_INBODY_CALCULATOR_LINKS = ["src/app/page.tsx"];

/**
 * Routes where the owner has decided, explicitly, that the tabs are the only
 * calculator surface the page carries.
 *
 * This is NOT the exemption above. That one says a page never had the equity to
 * lose. This one says the equity existed, the cost was put in writing, and the
 * owner chose to spend it anyway (2026-08-23, asked twice and reaffirmed: "no
 * ONLY keep the calculator tab designs on page"). Both pages previously shipped
 * four `CalculatorLinkCards` links; those cards were removed first and replaced
 * with a plain link list, then the list was removed too.
 *
 * `/section-24` had the same cards removed on the same day and is deliberately
 * NOT listed here. It keeps an in-prose `InlineLink` to
 * `/calculators/section-24-calculator` in its worked-example paragraph, so it
 * still satisfies the real predicate on its own merits and needs no exemption.
 * That is the outcome to prefer every time: an exemption is for a page that has
 * genuinely lost every per-tool link, not for one that merely lost the cards.
 *
 * What is actually spent: `CalculatorTabs` renders `<button role="tab">`, so
 * each of these pages now emits zero in-body links to any specific
 * `/calculators/<slug>` page. Reachability is untouched, because
 * `SiteFooter.tsx` ships per-tool links on every page of the site; what is gone
 * is the topical, page-authored link from a commercial page to the tool it
 * discusses. `/calculators/mtd-checker` is the one to watch, since
 * `docs/property/STRUCTURE_VS_COMPETITORS_2026-08-17.md:142` records it taking
 * zero in-body links from all 760 blog posts.
 *
 * Keep this list SHORT and keep it explicit. A route belongs here only on a
 * recorded owner decision, never because a page edit tripped the guard: that is
 * the failure mode this file was written to stop, and the correct response to a
 * red test is still to restore the links unless the owner says otherwise.
 */
const OWNER_REMOVED_INBODY_LINKS = [
  "src/app/services/property-accountant/page.tsx",
  "src/app/services/property-tax-advice/page.tsx",
];

export function keepsCrawlPath(src: string, pagePath = ""): boolean {
  if (!src.includes("<CalculatorTabs")) return true;
  const norm = pagePath.replace(/\\/g, "/");
  if (OWNER_REMOVED_INBODY_LINKS.some((p) => norm.endsWith(p))) return true;
  if (NO_PRIOR_INBODY_CALCULATOR_LINKS.some((p) => norm.endsWith(p))) {
    // Still has to link the index; it is the only crawl affordance that block has.
    return /href=\{?["'`]\/calculators["'`]/.test(src) || hasPerToolLink(src);
  }
  return hasPerToolLink(src);
}

function hasPerToolLink(src: string): boolean {
  return (
    src.includes("<CalculatorLinkCards") ||
    // A literal JSX attribute, `href="/calculators/..."`, including the template
    // form `href={`/calculators/${slug}`}` that /calculators itself uses.
    /href=\{?["'`]\/calculators\//.test(src) ||
    // Or the same link expressed as an object property that a component renders
    // into an <a>, `calc={{ href: "/calculators/..." }}`. Phase 5 hit this on
    // /property-tax-rates, where six crawlable calculator links are written this
    // way and the attribute-only predicate called a page with links a page
    // without. Both forms are real links; only the spelling differs.
    /href:\s*["'`]\/calculators\//.test(src)
  );
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
  it("the predicate fails a tabs page with no per-tool calculator link", () => {
    expect(keepsCrawlPath("<CalculatorTabs />")).toBe(false);
    expect(keepsCrawlPath('<CalculatorTabs /><CalculatorLinkCards items={x} />')).toBe(true);
    expect(keepsCrawlPath('<CalculatorTabs /><Link href="/calculators/mtd-checker" />')).toBe(true);
    expect(keepsCrawlPath("<CalculatorTabs /><Link href={`/calculators/${t.slug}`} />")).toBe(true);
    expect(
      keepsCrawlPath('<CalculatorTabs /><Section calc={{ href: "/calculators/mtd-checker" }} />'),
    ).toBe(true);
    expect(keepsCrawlPath('<CalculatorTabs /><Link href="/blog/mtd" />')).toBe(false);
    expect(keepsCrawlPath('<CalculatorTabs /><Link href="/calculators-guide" />')).toBe(false);
    expect(keepsCrawlPath("<p>no tabs here</p>")).toBe(true);
  });

  it("an index-only link satisfies the homepage and nothing else", () => {
    const src = '<CalculatorTabs /><Link href="/calculators" />';
    expect(keepsCrawlPath(src, "C:\\x\\Property\\web\\src\\app\\page.tsx")).toBe(true);
    expect(keepsCrawlPath(src, "src/app/page.tsx")).toBe(true);
    // The clause Phase 5 added, on any other page: now a failure.
    expect(keepsCrawlPath(src, "src/app/making-tax-digital-landlords/page.tsx")).toBe(false);
    expect(keepsCrawlPath(src)).toBe(false);
    // The exemption is not a blanket pass: the homepage still needs one of the two.
    expect(keepsCrawlPath("<CalculatorTabs />", "src/app/page.tsx")).toBe(false);
  });

  it("the owner exemption is scoped to the two routes, not a blanket pass", () => {
    const src = "<CalculatorTabs />";
    expect(keepsCrawlPath(src, "src/app/services/property-accountant/page.tsx")).toBe(true);
    expect(keepsCrawlPath(src, "src/app/services/property-tax-advice/page.tsx")).toBe(true);
    expect(keepsCrawlPath(src, "src/app/services/landlord-accountant/page.tsx")).toBe(false);
    expect(keepsCrawlPath(src, "src/app/making-tax-digital-landlords/page.tsx")).toBe(false);
  });

  const pages = pageFiles(APP_DIR).filter((p) =>
    readFileSync(p, "utf8").includes("<CalculatorTabs"),
  );

  it("every owner-exempt route still renders CalculatorTabs and still has no per-tool link", () => {
    // Two-way honesty check on the list. A route that regained its links, or
    // that stopped rendering tabs entirely, should come off the exemption rather
    // than sit there granting a pass nothing needs.
    for (const rel of OWNER_REMOVED_INBODY_LINKS) {
      const page = pages.find((p) => p.replace(/\\/g, "/").endsWith(rel));
      expect(page, `${rel} is exempt but renders no CalculatorTabs`).toBeDefined();
      const src = readFileSync(page!, "utf8");
      expect(
        hasPerToolLink(src),
        `${rel} has per-tool calculator links again, so remove it from OWNER_REMOVED_INBODY_LINKS ` +
          "and let the real guard cover it.",
      ).toBe(false);
    }
  });

  it("at least one page renders CalculatorTabs, so the guard is live", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  for (const page of pages) {
    const rel = page.slice(page.indexOf(join("src", "app")));
    it(`${rel} keeps a crawlable calculator link`, () => {
      expect(
        keepsCrawlPath(readFileSync(page, "utf8"), page),
        `${rel} renders CalculatorTabs but has no <a href> to a specific /calculators/<slug> page. ` +
          "A link to the /calculators index does not count: the footer already ships one on every " +
          "page. Wire <CalculatorLinkCards>, which is the designer's own fix for exactly this.",
      ).toBe(true);
    });
  }
});
