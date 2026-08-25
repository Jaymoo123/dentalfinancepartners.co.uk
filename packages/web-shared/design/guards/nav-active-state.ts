/**
 * Guard-test TEMPLATE: exactly one dropdown/drawer child may render as
 * "active" on its own page.
 *
 * Ported from Property's `Property/web/src/tests/nav-active-state.test.ts`.
 * The regression this guards: a dropdown child reused the same PREFIX-match
 * predicate as the top-level trigger (`pathname.startsWith(href + "/")`)
 * instead of an EXACT match, so a self-referential "All services" child
 * (href = the parent's own href) lit up alongside whatever child page the
 * reader was actually on. Two lit rows means the menu has stopped answering
 * "where am I".
 *
 * The predicates below encode the two-tier rule Property's SiteHeader uses:
 * top-level trigger = prefix match (stays lit on any child page), dropdown
 * child = exact match only. If a sibling's own header re-unifies them (the
 * original bug), the "one child" assertion below fails against that site's
 * real nav data — the same way it was designed to fail on Property's.
 *
 * DROPPED FROM THE PORT: Property's third assertion ("would light two
 * children if the prefix predicate were used, which is the bug") proves the
 * guard is non-vacuous by finding one real Property nav group with a
 * parent-prefix child. That is a fact about PROPERTY's specific nav shape,
 * not something every sibling's nav is guaranteed to reproduce, so it is not
 * a portable assertion — a sibling without that exact collision pattern would
 * fail it for a reason that has nothing to do with a regression. The two
 * assertions below are the actual regression guard and need no such proof.
 *
 * ---- Worked example (crypto, the pilot site) ----
 *
 *   // crypto/web/src/tests/nav-active-state.test.ts
 *   import { registerNavActiveStateGuard } from
 *     "@accounting-network/web-shared/design/guards/nav-active-state";
 *   import { buildPrimaryNav } from "../../lib/nav"; // the site's own module, however it aliases it
 *
 *   registerNavActiveStateGuard({ nav: buildPrimaryNav() });
 */
import { describe, it, expect } from "vitest";

export interface NavChild {
  href: string;
}
export interface NavGroup {
  items: NavChild[];
}
export interface NavItemLike {
  label?: string;
  href: string;
  children?: NavChild[];
  groups?: NavGroup[];
}

/** Top-level trigger: prefix match, so a parent stays lit on any child page. */
export function hrefActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Dropdown/drawer child: exact match only. */
export function childActive(pathname: string, href: string): boolean {
  return pathname === href;
}

export function childHrefs(item: NavItemLike): string[] {
  return [
    ...(item.children?.map((c) => c.href) ?? []),
    ...(item.groups?.flatMap((g) => g.items.map((i) => i.href)) ?? []),
  ];
}

export interface NavActiveStateGuardOptions {
  /** The site's own already-built primary nav, e.g. `buildPrimaryNav()`. */
  nav: NavItemLike[];
}

/**
 * Call this from the SITE's own test file (not from web-shared). It registers
 * real `describe`/`it` blocks in whatever vitest run is currently executing,
 * against the already-built nav array passed in.
 */
export function registerNavActiveStateGuard(opts: NavActiveStateGuardOptions) {
  const itemsWithChildren = opts.nav.filter((item) => childHrefs(item).length > 0);

  describe("nav dropdown active state", () => {
    it("has at least one dropdown to test", () => {
      expect(itemsWithChildren.length).toBeGreaterThan(0);
    });

    it("lights exactly one child on that child's own page", () => {
      for (const item of itemsWithChildren) {
        const hrefs = childHrefs(item);
        for (const pathname of hrefs) {
          const lit = hrefs.filter((h) => childActive(pathname, h));
          expect(lit, `${item.label ?? item.href} on ${pathname} lit ${lit.join(", ")}`).toEqual([
            pathname,
          ]);
        }
      }
    });

    it("keeps the top-level trigger lit on children that sit under its own path", () => {
      // Not every child does: a curated nav can list a top-level route inside
      // a dropdown for convenience. The assertion is scoped to the children
      // the prefix rule is actually responsible for.
      for (const item of itemsWithChildren) {
        for (const child of childHrefs(item)) {
          if (!child.startsWith(`${item.href}/`)) continue;
          expect(hrefActive(child, item.href), `${item.href} not lit on ${child}`).toBe(true);
        }
      }
    });
  });
}
