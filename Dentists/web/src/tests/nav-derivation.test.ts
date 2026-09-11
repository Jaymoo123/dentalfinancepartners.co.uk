/**
 * Guard for the hand-listed nav children in src/lib/nav.ts.
 *
 * The kit footer derives its Services and Resources columns from nav[].children
 * and silently drops empty columns, and chrome links appear on all 309 routes,
 * so a drifted or missing child is a link-floor breach on every page.
 */
import { describe, it, expect } from "vitest";
import { SERVICE_SLUGS } from "@/app/services/[slug]/data";
import { getGuideSlugs } from "@/lib/dental-guides";
import { buildPrimaryNav, SERVICE_NAV_CHILDREN, GUIDE_NAV_CHILDREN } from "@/lib/nav";

const hrefsUnder = (children: NonNullable<typeof SERVICE_NAV_CHILDREN>, hub: string) =>
  children.filter((c) => c.href !== hub).map((c) => c.href);

describe("nav children stay in step with the content", () => {
  it("/services children are exactly SERVICE_SLUGS, plus the self-referential hub", () => {
    expect(SERVICE_NAV_CHILDREN?.[0]).toEqual({ label: "All services", href: "/services" });
    expect(hrefsUnder(SERVICE_NAV_CHILDREN!, "/services").sort()).toEqual(
      SERVICE_SLUGS.map((s) => `/services/${s}`).sort(),
    );
  });

  it("/dental-guides children are exactly getGuideSlugs(), plus the self-referential hub", () => {
    expect(GUIDE_NAV_CHILDREN?.[0]).toEqual({ label: "All guides", href: "/dental-guides" });
    expect(hrefsUnder(GUIDE_NAV_CHILDREN!, "/dental-guides").sort()).toEqual(
      getGuideSlugs()
        .map((s) => `/dental-guides/${s}`)
        .sort(),
    );
  });
});

describe("buildPrimaryNav", () => {
  const nav = buildPrimaryNav();

  it("carries the whole calculator fleet under /calculators", () => {
    const calculators = nav.find((i) => i.href === "/calculators");
    expect(calculators?.groups).toBeDefined();
    const items = calculators!.groups!.flatMap((g) => g.items);
    expect(items).toHaveLength(13);
    expect(new Set(items.map((i) => i.href)).size).toBe(13);
  });

  it("every top-level item has a label and a site-relative href", () => {
    expect(nav.length).toBeGreaterThan(0);
    for (const item of nav) {
      expect(item.label).toBeTruthy();
      expect(item.href.startsWith("/")).toBe(true);
    }
    for (const item of nav) {
      for (const child of item.children ?? []) {
        expect(child.label).toBeTruthy();
        expect(child.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("matches the nav the site renders today, item for item", () => {
    expect(nav.map((i) => `${i.label}|${i.href}`)).toEqual([
      "Services|/services",
      "Pillar Guides|/dental-guides",
      "Calculators|/calculators",
      "Health Check|/free-practice-health-check",
      "Blog|/blog",
      "Contact|/contact",
    ]);
  });
});
