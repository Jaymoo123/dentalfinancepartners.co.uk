/**
 * Nav dropdown active state: exactly one child may be green at a time.
 *
 * Guards the bug this test was written for: the dropdown children used the same
 * prefix-matching predicate as the top-level trigger, so on
 * /services/property-accountant the self-referential "All services" child
 * (href /services) matched `pathname.startsWith("/services/")` and lit up
 * alongside the page the reader was actually on. Two green rows means the menu
 * has stopped answering "where am I".
 *
 * The predicates below mirror SiteHeader's. If someone re-unifies them, the
 * "one child" assertions fail on the real nav config.
 */
import { describe, it, expect } from "vitest";
import { buildPrimaryNav } from "@/lib/nav";
import type { NavItem } from "@/config/site";

/** Top-level trigger: prefix match, so "Services" stays lit on any child page. */
function hrefActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Dropdown/drawer child: exact match only. */
function childActive(pathname: string, href: string): boolean {
  return pathname === href;
}

function childHrefs(item: NavItem): string[] {
  return [
    ...(item.children?.map((c) => c.href) ?? []),
    ...(item.groups?.flatMap((g) => g.items.map((i) => i.href)) ?? []),
  ];
}

const nav = buildPrimaryNav();
const itemsWithChildren = nav.filter((item) => childHrefs(item).length > 0);

describe("nav dropdown active state", () => {
  it("has at least one dropdown to test", () => {
    expect(itemsWithChildren.length).toBeGreaterThan(0);
  });

  it("lights exactly one child on that child's own page", () => {
    for (const item of itemsWithChildren) {
      const hrefs = childHrefs(item);
      for (const pathname of hrefs) {
        const lit = hrefs.filter((h) => childActive(pathname, h));
        expect(lit, `${item.label} on ${pathname} lit ${lit.join(", ")}`).toEqual([pathname]);
      }
    }
  });

  it("would light two children if the prefix predicate were used, which is the bug", () => {
    // Proves the guard above is load-bearing rather than vacuous: at least one
    // real nav group has a parent-prefix child that prefix matching double-lights.
    const doubleLit = itemsWithChildren.some((item) => {
      const hrefs = childHrefs(item);
      return hrefs.some((pathname) => hrefs.filter((h) => hrefActive(pathname, h)).length > 1);
    });
    expect(doubleLit).toBe(true);
  });

  it("keeps the top-level trigger lit on children that sit under its own path", () => {
    // Not every child does: the Services group lists /incorporation, which is a
    // top-level route. That is deliberate nav curation, so the assertion is
    // scoped to the children the prefix rule is actually responsible for.
    for (const item of itemsWithChildren) {
      for (const child of childHrefs(item)) {
        if (!child.startsWith(`${item.href}/`)) continue;
        expect(hrefActive(child, item.href), `${item.href} not lit on ${child}`).toBe(true);
      }
    }
  });
});
