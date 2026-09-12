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
  // Phase 3 / WP-C1, ADDITIVE. The 45 /for/[slug] hero primaries pointed at
  // /contact and the LeadForm further down the same page was unreachable: 24
  // sessions, 0 form views, 0 form starts (FUNNEL_BASELINE.md:171,244). The
  // button now scrolls to #book. A NEW id, deliberately: reusing an existing
  // one would merge two different asks, and adding placement/goal to
  // `next_step` on these same 45 routes would split the locked
  // `next_step|null|null` 109 into 64 + 45 (PHASE3_PLAN section 1g, trap 22).
  // Goal is `form` because the destination is an on-page form, matching
  // `next_step`'s own /contact branch, not the hero_primary `lead` convention
  // used where the CTA leaves the page.
  "src/app/for/[slug]/page.tsx|for_hero_book|hero|form",
  // Phase 4 / WP-D2, ADDITIVE, owner gate 1. The 12 /calculators/[slug] routes
  // already carried a LeadForm at #get-expert-help and nothing on the page
  // pointed at it; the only ask in the hero was the header button. The hero now
  // carries its own primary scrolling to that form. A NEW id, for the same
  // reason for_hero_book is one: reusing `hero_primary` would merge the
  // homepage's single off-page CTA with 12 on-page ones, and adding
  // placement/goal to an existing id would split a locked baseline triple
  // (trap 22). Goal is `form` because the destination is an on-page form
  // anchor, per this site's taxonomy; `lead` is for a CTA that leaves the page.
  "src/app/calculators/[slug]/page.tsx|calc_hero_help|hero|form",
  // Phase 2 / WP-B5, ADDITIVE. /blog made no ask at all: 110 sessions, 42 form
  // views, 0 completions over 19 days. A new id splits no existing history, so
  // the five baseline triples are untouched. Placement/goal follow the site's
  // own `hero_primary|hero|lead`, not Property's `hero_book`.
  "src/app/blog/page.tsx|blog_index_primary|hero|lead",
  // Phase 3 / WP-C3, ADDITIVE. The 50 glossary entry pages made no ask at all.
  // In-page anchor to the closing LeadCTAPanel on the same route, so it splits
  // no existing history: the five baseline triples are untouched.
  "src/app/glossary/[slug]/page.tsx|glossary_entry_book|article|form",
  // Phase 5 / WP-E2, ADDITIVE. /services carried no capture at all: two bare
  // /contact links and no form on the page. It now closes on a LeadCTAPanel at
  // #book and the hero points at it. A NEW id, for the same reason
  // for_hero_book and calc_hero_book are new ones: the two baseline CTAs on
  // this route are chrome, and reusing or re-goaling either would split
  // vw_cta_performance at the cutover (trap 22). Goal is `form` because the
  // destination is an on-page form anchor, per this site's taxonomy.
  "src/app/services/page.tsx|services_hero_book|hero|form",
  // Phase 5 gap-fix / G4, ADDITIVE, two ids across the two pillars. Both
  // pillars closed on a #book LeadCTAPanel that NOTHING on the route linked to
  // (0 href="#book" in the served HTML), so the band converted silently. The
  // hero now points at it. Both ids are NEW, for the same reason for_hero_book,
  // calc_hero_help, home_hero_book and services_hero_book are: repointing or
  // re-goaling either pillar's existing /contact primary would split
  // vw_cta_performance at the cutover (trap 22). Goal is `form`, this site's
  // taxonomy for an on-page form anchor. The #book panel wrapper deliberately
  // carries NO data-cta: autoCapture resolves through closest("[data-cta]"),
  // so an id there would swallow the form's own controls and links.
  "src/app/cis-refund/page.tsx|cis_refund_hero_book|hero|form",
  "src/app/gross-payment-status/page.tsx|gps_hero_book|hero|form",
  "src/app/contact/page.tsx|contact_pricing_link|contact|null",
  // Phase 5 / WP-E1, ADDITIVE. The homepage hero made no on-page ask: all three
  // hero CTAs left the page, and the LeadForm in the closing band had nothing
  // pointing at it. The hero secondary now scrolls to #book. A NEW id, for the
  // same reason for_hero_book and calc_hero_help are new: `hero_primary` renders
  // on this ONE route site-wide, so repointing it at #book would rewrite the
  // whole series rather than split it, and `lead` would then mean the opposite
  // here of what it means on all 245 other routes (trap 22). Goal is `form`,
  // this site's taxonomy for an on-page form anchor; `lead` is for a CTA that
  // leaves the page. `hero_primary` below is unchanged, href included.
  "src/app/page.tsx|home_hero_book|hero|form",
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
  // Phase 6 / P6-B, ADDITIVE, owner gate 11. The two template-download pages
  // carried 10 download affordances and not one data-cta: every one of the 28
  // recorded downloads arrived as a generic element_click. The invoice page's
  // six rendered ids are declared as two template literals over the download
  // variants, which is what this extractor reads (it takes the JSX attribute,
  // not the rendered value), so six rendered ids collapse to two rows here.
  // `download` is a NEW goal value, deliberately distinct from `form` and
  // `contact` so the download family cannot be confused with a capture id in
  // vw_cta_performance.
  "src/app/cis-invoice-template/page.tsx|`template_invoice_pdf_${d.slug|downloads|download",
  "src/app/cis-invoice-template/page.tsx|`template_invoice_xlsx_${d.slug|downloads|download",
  "src/app/cis-payment-deduction-statement-template/page.tsx|template_pds_pdf_footer|footer|download",
  "src/app/cis-payment-deduction-statement-template/page.tsx|template_pds_pdf|hero|download",
  "src/app/cis-payment-deduction-statement-template/page.tsx|template_pds_xlsx_footer|footer|download",
  "src/app/cis-payment-deduction-statement-template/page.tsx|template_pds_xlsx|hero|download",
  // Phase 6 / P6-E, ADDITIVE. The four research routes made no ask in the hero
  // and nothing pointed at the data assets. Three new ids per route, each
  // SLUG-SUFFIXED: the four pages share a layout, and a shared id would merge
  // four different surfaces into one vw_cta_performance row (the view groups
  // without page_path). All ADDITIVE, so no baseline triple moves.
  "src/app/research/uk-construction-index/page.tsx|research_index_cta_calculator|article|null",
  "src/app/research/uk-construction-index/page.tsx|research_index_hero_book|hero|form",
  "src/app/research/uk-construction-index/page.tsx|research_index_hero_data|hero|null",
  "src/app/research/uk-construction-insolvency-index/page.tsx|research_insolvency_cta_calculator|article|null",
  "src/app/research/uk-construction-insolvency-index/page.tsx|research_insolvency_hero_book|hero|form",
  "src/app/research/uk-construction-insolvency-index/page.tsx|research_insolvency_hero_data|hero|null",
  "src/app/research/uk-construction-payment-practices-league/page.tsx|research_payment_practices_cta_calculator|article|null",
  "src/app/research/uk-construction-payment-practices-league/page.tsx|research_payment_practices_hero_book|hero|form",
  "src/app/research/uk-construction-payment-practices-league/page.tsx|research_payment_practices_hero_data|hero|null",
  "src/app/research/uk-construction-survival-index/page.tsx|research_survival_cta_calculator|article|null",
  "src/app/research/uk-construction-survival-index/page.tsx|research_survival_hero_book|hero|form",
  "src/app/research/uk-construction-survival-index/page.tsx|research_survival_hero_data|hero|null",
  // Phase 6 / P6-F, TD-32. The bar shipped `data-cta-id`, which
  // autoCapture's closest("[data-cta]") never matched, so the site's only
  // persistent site-wide CTA has never emitted a single cta_click and its
  // dismiss carried no id at all. The rename ADDS two vw_cta_performance rows
  // that have never existed; it moves NO history, because there is none to
  // move. Said in the rename commit message and in the deploy note so the new
  // rows are not read as a regression. The id is `sticky_cta`, not the old
  // attribute's value `sticky_cis_refund`: the old value never reached the
  // warehouse, so there is nothing to stay consistent with, and the offer this
  // bar renders is not refund-specific.
  'src/components/ui/StickyCTA.tsx|sticky_cta|sticky|offer.href.startsWith("/contact") ? "form" : undefined',
  "src/components/ui/StickyCTA.tsx|sticky_cta_close|sticky|null",
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

  it("StickyCTA carries data-cta and no data-cta-id (TD-32 closed, P6-F)", () => {
    // TD-32, CLOSED 2026-09-12 by P6-F. StickyCTA shipped `data-cta-id`, which
    // autoCapture's closest("[data-cta]") never matched, so the site's only
    // persistent CTA emitted nothing. The rename to `data-cta` ADDED the two
    // `sticky_cta` / `sticky_cta_close` rows to the snapshot above: a NEW
    // measurement, not a regression, and no history moved because none existed.
    // The assertion is flipped rather than deleted, so `data-cta-id` cannot come
    // back on this file, here or anywhere it is copied from.
    const sticky = readFileSync(join(SRC, "components", "ui", "StickyCTA.tsx"), "utf8");
    expect(/\bdata-cta=/.test(sticky)).toBe(true);
    expect(
      /\bdata-cta-id=/.test(sticky),
      "data-cta-id is back on StickyCTA. autoCapture matches [data-cta] only: this attribute emits nothing.",
    ).toBe(false);
  });
});
