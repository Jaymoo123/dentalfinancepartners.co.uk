/**
 * Trap 22 guard: the `data-cta` / `data-cta-placement` / `data-cta-goal`
 * TRIPLE, pinned per rendering component.
 *
 * WHY A COUNT CANNOT DO THIS. Adopting standard chrome keeps the same button
 * pointing at the same destination but flips its goal (`contact` to `form`) or
 * its placement (`header_mobile` to `mobile_menu`). The id count, the CTA count
 * and the link floor are all unchanged, so nothing in the existing suite moves.
 * What moves is `vw_cta_performance`: the history splits at the cutover and the
 * launch reads as a funnel drop that never happened. The pre-port truth is
 * `docs/construction-cis/_port/cta_baseline.json`: 5 rendered triples, headed by
 * `header_nav_primary|header|contact` on all 246 routes.
 *
 * WHAT IS ASSERTED, AND WHY NOT A RENDER. No build and no server are available
 * to this guard, and rendering `SiteHeader` under the test runner is not a
 * cheaper substitute: it is a client component on `usePathname`, so a render
 * harness would add jsdom, a router mock and a failure mode that has nothing to
 * do with CTA attributes. Two things are asserted instead, which together cover
 * the rendered triple:
 *   1. the attribute triple each component DECLARES, extracted from source by
 *      attribute name rather than by line text, so reformatting and the chrome
 *      rewrite do not move it, and a goal or placement edit does;
 *   2. for the two ids whose goal is a conditional expression, the real config
 *      the condition reads, imported live, so the BRANCH TAKEN is pinned too.
 *      Pinning the expression alone would pass while the config flipped the
 *      rendered value from `contact` to `pricing`, which is trap 22 exactly.
 *
 * This is a deliberate snapshot. If a triple below changes, that is either the
 * regression this guard exists for, or an intended change that must be recorded
 * here and in the deploy-watch note in the same commit. Never "fix" it by
 * copying the new value in without saying so.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const SRC = join(__dirname, "..", "..");

/**
 * The pre-port triples, `file|id|placement|goal`, `null` where the attribute is
 * absent. Cross-checked against `cta_baseline.json`: `header_nav_primary`
 * renders `header`/`contact` on 246 routes, `specialist_widget` renders neither
 * attribute on 246, `next_step` renders neither except where its offer points at
 * /contact (then `goal="form"`, 18 routes), `hero_primary` renders `hero`/`lead`
 * on 1. `contact_pricing_link` is in source but inside the dormant
 * `isPackagesMode` branch (TD-02), so it never renders and is absent from the
 * baseline: it is pinned anyway, because the day packages mode is switched on it
 * must arrive with a placement and a goal rather than silently without.
 */
const PINNED = [
  // Phase 2 / WP-B5, ADDITIVE. /blog made no ask at all: 110 sessions, 42 form
  // views, 0 completions over 19 days. A new id splits no existing history, so
  // the five baseline triples are untouched. Placement/goal follow the site's
  // own `hero_primary|hero|lead`, not Property's `hero_book`.
  "src/app/blog/page.tsx|blog_index_primary|hero|lead",
  "src/app/contact/page.tsx|contact_pricing_link|contact|null",
  "src/app/page.tsx|hero_primary|hero|lead",
  "src/app/page.tsx|home_cta_primary|home_cta|lead",
  "src/app/page.tsx|home_cta_secondary|home_cta|contact",
  "src/components/calculators/premium/PremiumCalculator.tsx|see_result|null|null",
  "src/components/intent/DeepScrollModal.tsx|deep_scroll_close|null|null",
  'src/components/intent/DeepScrollModal.tsx|deep_scroll_modal|null|offer.href.startsWith("/contact") ? "form" : undefined',
  'src/components/intent/HeroOffer.tsx|hero_cta|null|offer.href.startsWith("/contact") ? "form" : undefined',
  'src/components/intent/NextStepOffer.tsx|next_step|null|offer.href.startsWith("/contact") ? "form" : undefined',
  'src/components/intent/ReturningBar.tsx|returning_bar|null|offer.href.startsWith("/contact") ? "form" : undefined',
  "src/components/intent/ReturningBar.tsx|returning_bar_close|null|null",
  "src/components/layout/SiteHeader.tsx|header_nav_secondary|header|contact",
  'src/components/layout/SiteHeader.tsx|header_nav_primary|header|activeCta.header_primary.href.startsWith("/contact") ? "contact" : "pricing"',
  'src/components/layout/SiteHeader.tsx|header_mobile_primary|header_mobile|activeCta.header_primary.href.startsWith("/contact") ? "contact" : "pricing"',
  "src/components/layout/SiteHeader.tsx|header_mobile_secondary|header_mobile|contact",
  "src/components/support/SpecialistWidget.tsx|specialist_widget|null|null",
];

function attr(name: string, line: string): string | undefined {
  const m = line.match(new RegExp(`\\b${name}=(?:"([^"]*)"|\\{([^}]*)\\})`));
  return m ? (m[1] ?? m[2])?.trim() : undefined;
}

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.tsx?$/.test(entry) && !entry.includes(".test.")) out.push(full);
  }
  return out;
}

/**
 * Every declared triple. The window is the 4 lines either side of the
 * `data-cta=` line, cut at any other `data-cta=` line, which is how these
 * attributes are written throughout this codebase and in the kit.
 */
export function extractTriples(): string[] {
  const out: string[] = [];
  for (const file of sourceFiles(join(SRC, "app")).concat(sourceFiles(join(SRC, "components")))) {
    const rel = `src/${file.slice(SRC.length + 1).replace(/\\/g, "/")}`;
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const id = attr("data-cta", line);
      if (id === undefined) return;
      let placement: string | undefined;
      let goal: string | undefined;
      for (let j = Math.max(0, i - 4); j < Math.min(lines.length, i + 5); j++) {
        if (j !== i && /\bdata-cta=/.test(lines[j])) continue;
        placement ??= attr("data-cta-placement", lines[j]);
        goal ??= attr("data-cta-goal", lines[j]);
      }
      out.push(`${rel}|${id}|${placement ?? "null"}|${goal ?? "null"}`);
    });
  }
  return out.sort();
}

describe("data-cta triple snapshot (trap 22)", () => {
  const found = extractTriples();

  it("the extractor finds the site's CTA attributes at all", () => {
    // Guards the guard: a regex that silently stopped matching would make every
    // assertion below vacuously true.
    expect(found.length).toBeGreaterThan(10);
  });

  it("every declared id, placement and goal is unchanged", () => {
    expect(found).toEqual([...PINNED].sort());
  });

  it("the header primary CTA's goal condition still resolves to contact", async () => {
    const { getActiveCta } = await import("@accounting-network/web-shared/lib/niche-config");
    const { niche } = await import("@/config/niche-loader");
    const href = getActiveCta(niche).header_primary.href;
    expect(
      href.startsWith("/contact"),
      `header_primary.href is "${href}", so header_nav_primary now emits goal="pricing". ` +
        "cta_baseline.json pins goal=\"contact\" on 246 routes: changing it splits vw_cta_performance history.",
    ).toBe(true);
  });

  /**
   * The kit triple. `extractTriples` walks src/ only, so the one CTA this site
   * renders from outside src/ was unpinned: `blog_sidebar_book|sidebar|form`,
   * arriving from `packages/web-shared/design/blog/BlogSidebarCta.tsx` on 82
   * article routes. A placement or goal flip inside the kit would have passed
   * this site's guard while splitting vw_cta_performance, which is trap 22 with
   * the edit one directory further away. The kit is shared by Trade, generalist,
   * Medical and Solicitors (Property keeps a local copy of the same file), so the
   * guard pins it rather than the kit defending itself.
   *
   * Two halves, because the rendered placement is the kit DEFAULT: the kit's
   * declared triple, and the fact that BlogPostRenderer does not pass
   * `ctaPlacement`. Pinning only the kit would pass while the host overrode the
   * placement; pinning only the host would pass while the default moved.
   */
  it("the kit's blog sidebar CTA triple is unchanged", () => {
    const kit = join(
      SRC, "..", "..", "..",
      "packages", "web-shared", "design", "blog", "BlogSidebarCta.tsx",
    );
    const lines = readFileSync(kit, "utf8").split("\n");
    const i = lines.findIndex((l) => attr("data-cta", l) !== undefined);
    expect(i, "no data-cta found in the kit BlogSidebarCta: the extractor is stale").toBeGreaterThan(-1);
    const window = lines.slice(Math.max(0, i - 4), i + 5);
    const triple = [
      attr("data-cta", lines[i]),
      window.map((l) => attr("data-cta-placement", l)).find((v) => v !== undefined),
      window.map((l) => attr("data-cta-goal", l)).find((v) => v !== undefined),
    ].join("|");
    expect(triple).toBe("blog_sidebar_book|ctaPlacement|form");

    // The default the condition above resolves to, and the host's non-override.
    expect(readFileSync(kit, "utf8")).toMatch(/ctaPlacement\s*=\s*"sidebar"/);
    const host = readFileSync(
      join(SRC, "components", "blog", "BlogPostRenderer.tsx"), "utf8",
    );
    expect(
      /ctaPlacement=/.test(host),
      "BlogPostRenderer now passes ctaPlacement, so the rendered placement is no longer the kit default \"sidebar\". " +
        "That is a placement flip on 82 routes: record it here and in the deploy-watch note.",
    ).toBe(false);
  });

  it("StickyCTA still carries no data-cta (TD-32), so its rename is visible here", () => {
    // TD-32: StickyCTA ships `data-cta-id`, which autoCapture never matches, so
    // the site's only persistent CTA emits nothing. The fix renames it to
    // `data-cta`, which ADDS a triple to the snapshot above. This assertion is
    // the reminder that the new row is a new measurement, not a regression.
    const sticky = readFileSync(join(SRC, "components", "ui", "StickyCTA.tsx"), "utf8");
    expect(/\bdata-cta=/.test(sticky)).toBe(false);
    expect(/\bdata-cta-id=/.test(sticky)).toBe(true);
  });
});
