/**
 * Site-parameterised consumption of the estate `nav-active-state` guard:
 * exactly one dropdown child may light on its own page. A child that reuses
 * the top-level PREFIX predicate instead of an exact match lights two rows at
 * once and the menu stops answering "where am I".
 *
 * The guard runs against this site's real nav data. Work package 1.1 ships
 * `src/lib/nav.ts` with `buildPrimaryNav()`; until that lands the module is
 * absent, so the import is done dynamically and its absence FAILS as a named
 * test rather than silently passing (playbook trap T9 and T17). The moment
 * 1.1 lands, that test goes green and the real guard arms itself against the
 * built nav with no edit here.
 */
import { describe, it, expect } from "vitest";
import {
  registerNavActiveStateGuard,
  type NavItemLike,
} from "@accounting-network/web-shared/design/guards/nav-active-state";

const NAV_MODULE = "../lib/nav";

let nav: NavItemLike[] | null = null;
let loadError: unknown = null;
try {
  const mod = (await import(/* @vite-ignore */ NAV_MODULE)) as {
    buildPrimaryNav?: () => NavItemLike[];
  };
  if (typeof mod.buildPrimaryNav !== "function") {
    throw new Error("src/lib/nav.ts does not export buildPrimaryNav()");
  }
  nav = mod.buildPrimaryNav();
} catch (error) {
  loadError = error;
}

describe("nav source module", () => {
  it("src/lib/nav.ts exports buildPrimaryNav() (work package 1.1)", () => {
    expect(
      loadError,
      "the nav active-state guard has nothing to run against. Until src/lib/nav.ts ships " +
        "buildPrimaryNav(), the dropdown active-state rule is unguarded on this site: " +
        String(loadError),
    ).toBeNull();
  });

  it("the built nav carries at least one entry", () => {
    if (loadError) return; // already reported above
    expect(nav?.length ?? 0).toBeGreaterThan(0);
  });
});

if (nav) {
  registerNavActiveStateGuard({ nav });
}
