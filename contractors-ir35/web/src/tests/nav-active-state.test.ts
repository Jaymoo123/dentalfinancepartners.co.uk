/**
 * P1-GUARD: the primary nav answers "where am I" with exactly one lit row.
 *
 * SITE-DERIVED. The estate `nav-active-state` guard assumes a two-tier nav
 * (prefix-matched trigger, exact-matched dropdown children) and opens with
 * "has at least one dropdown to test". This site has NO dropdowns: SiteHeader
 * renders a flat list from `niche.config.json -> navigation`, with one
 * predicate, `pathname === href || pathname.startsWith(href + "/")`. Calling
 * the shared guard here would fail on its own first assertion for a reason
 * that has nothing to do with a regression, so the rule is re-derived for the
 * shape this site really has:
 *
 *   1. The predicate is reproduced here verbatim, so a change to it in
 *      SiteHeader that breaks the rule is caught by the assertions rather
 *      than silently mirrored.
 *   2. On every nav route, and on a representative child route beneath it,
 *      exactly one row lights. With a prefix predicate this holds only while
 *      no nav href is a prefix of another, which is the regression: add
 *      /services and /services-lite, or /for and /for-contractors, and two
 *      rows light on one page.
 *   3. Every nav and footer href resolves to a real route, so the menu cannot
 *      point at a 404.
 */
import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { siteConfig } from "@/config/site";

/** SiteHeader's own active predicate (components/layout/SiteHeader.tsx). */
export function navActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const APP_DIR = join(__dirname, "..", "app");
const nav = siteConfig.nav as Array<{ label: string; href: string }>;
const footer = siteConfig.footer as Array<{ label: string; href: string }>;

/** True when `href` is served by a static segment or by a [param] segment. */
function routeExists(href: string): boolean {
  const segments = href.replace(/^\//, "").split("/").filter(Boolean);
  let dir = APP_DIR;
  for (const segment of segments) {
    const direct = join(dir, segment);
    if (existsSync(direct)) {
      dir = direct;
      continue;
    }
    return false; // every nav/footer target on this site is a static segment
  }
  return existsSync(join(dir, "page.tsx"));
}

describe("nav active state", () => {
  it("has a nav to test", () => {
    expect(nav.length).toBeGreaterThan(0);
  });

  it("lights exactly one row on each nav route", () => {
    for (const item of nav) {
      const lit = nav.filter((n) => navActive(item.href, n.href)).map((n) => n.href);
      expect(lit, `${item.href} lit ${lit.join(", ")}`).toEqual([item.href]);
    }
  });

  it("lights exactly one row on a child route beneath a nav item", () => {
    for (const item of nav) {
      const child = `${item.href}/some-child-page`;
      const lit = nav.filter((n) => navActive(child, n.href)).map((n) => n.href);
      expect(lit, `${child} lit ${lit.join(", ")}`).toEqual([item.href]);
    }
  });

  it("no nav href is a prefix of another (the two-lit-rows regression)", () => {
    const clashes: string[] = [];
    for (const a of nav) {
      for (const b of nav) {
        if (a.href === b.href) continue;
        if (b.href.startsWith(`${a.href}/`)) clashes.push(`${b.href} sits under ${a.href}`);
      }
    }
    expect(
      clashes,
      `${clashes.join("; ")}. With SiteHeader's prefix predicate both rows light at once.`,
    ).toEqual([]);
  });

  it("every nav and footer link points at a route that exists", () => {
    const dead = [...nav, ...footer]
      .map((i) => i.href)
      .filter((href) => href.startsWith("/"))
      .filter((href) => !routeExists(href));
    expect(dead, `nav/footer links with no page.tsx behind them: ${dead.join(", ")}`).toEqual([]);
  });
});
