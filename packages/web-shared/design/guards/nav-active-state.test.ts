/**
 * Self-test for the nav-active-state guard TEMPLATE.
 *
 * Exercises the pure predicates directly, and also calls
 * `registerNavActiveStateGuard` itself against a synthetic in-memory nav
 * fixture (not any site's real config) to prove the registrar wires up
 * correctly end to end. No filesystem access, no site content directory.
 */
import { describe, it, expect } from "vitest";
import {
  hrefActive,
  childActive,
  childHrefs,
  registerNavActiveStateGuard,
  type NavItemLike,
} from "./nav-active-state";

describe("hrefActive", () => {
  it("matches the href itself and any child path, not a sibling prefix", () => {
    expect(hrefActive("/services", "/services")).toBe(true);
    expect(hrefActive("/services/tax", "/services")).toBe(true);
    expect(hrefActive("/services-guide", "/services")).toBe(false);
  });
});

describe("childActive", () => {
  it("matches only the exact href", () => {
    expect(childActive("/services", "/services")).toBe(true);
    expect(childActive("/services/tax", "/services")).toBe(false);
  });
});

describe("childHrefs", () => {
  it("flattens both children and grouped items", () => {
    const item: NavItemLike = {
      href: "/calculators",
      groups: [{ items: [{ href: "/calculators/a" }, { href: "/calculators/b" }] }],
    };
    expect(childHrefs(item)).toEqual(["/calculators/a", "/calculators/b"]);
  });

  it("returns empty for an item with neither", () => {
    expect(childHrefs({ href: "/about" })).toEqual([]);
  });
});

describe("registerNavActiveStateGuard (synthetic fixture, not a site's real nav)", () => {
  const nav: NavItemLike[] = [
    {
      label: "Services",
      href: "/services",
      children: [
        { href: "/services" }, // self-referential "All services" child
        { href: "/services/tax" },
        { href: "/services/accounts" },
      ],
    },
    { label: "About", href: "/about" }, // no children: excluded from the guard
  ];

  registerNavActiveStateGuard({ nav });
});
