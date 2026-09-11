/**
 * Site instantiation of the estate `nav-active-state` guard.
 *
 * Section B of the rollout doc: top-level trigger = PREFIX match (a parent
 * stays lit on any child page), dropdown and drawer children = EXACT match. A
 * child reusing the prefix predicate lights two rows at once and the menu stops
 * answering "where am I".
 *
 * WHY IT IS CONDITIONAL. The kit template's first assertion requires at least
 * one dropdown to test. `buildPrimaryNav()` is grouped as of the chrome rebuild,
 * so the template registers; if the nav is ever flattened again the template is
 * skipped rather than failing for a reason that is not a regression, and the two
 * predicates below still hold the part of the contract a flat nav can break. No
 * edit to this file is needed when the nav shape changes either way.
 *
 * The predicates are IMPORTED from the kit, never re-implemented here: a local
 * copy of the rule would test itself.
 */
import { describe, it, expect } from "vitest";
import {
  registerNavActiveStateGuard,
  hrefActive,
  childActive,
  childHrefs,
  type NavItemLike,
} from "@accounting-network/web-shared/design/guards/nav-active-state";
import { buildPrimaryNav } from "@/lib/nav";

// The array SiteHeader actually renders: niche.config.json `navigation` with the
// registry-derived Calculators groups folded in. Reading the raw config instead
// would never exercise the grouped branch below.
const nav = buildPrimaryNav() as NavItemLike[];
const grouped = nav.some((item) => childHrefs(item).length > 0);

if (grouped) registerNavActiveStateGuard({ nav });

describe("nav active state, top-level entries", () => {
  it("has a nav to test", () => {
    expect(nav.length).toBeGreaterThan(0);
  });

  it("lights exactly one top-level entry on its own href", () => {
    for (const item of nav) {
      const lit = nav.filter((other) => hrefActive(item.href, other.href)).map((o) => o.href);
      expect(lit, `${item.href} lit ${lit.join(", ")}`).toEqual([item.href]);
    }
  });

  it("keeps a top-level trigger lit on a page beneath it, and an exact child not", () => {
    // The two-tier rule itself, asserted on a real nav href rather than a
    // fixture, so it keeps meaning when the nav is regrouped.
    const parent = nav.find((item) => item.href !== "/")!;
    expect(hrefActive(`${parent.href}/something`, parent.href)).toBe(true);
    expect(childActive(`${parent.href}/something`, parent.href)).toBe(false);
  });
});
