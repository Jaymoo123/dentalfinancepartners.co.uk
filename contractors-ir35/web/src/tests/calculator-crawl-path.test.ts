/**
 * P1-GUARD: crawl path to the calculator surfaces.
 *
 * SITE-DERIVED, not copied. The estate `calculator-tabs-crawl-path` guard
 * pins a tabs-only switcher (`<CalculatorTabs`), which does not exist on this
 * site: `/calculators` is a plain grid of `<Link href="/calculators/<slug>">`
 * cards built from `allTools()`, and every tool page is served by the single
 * dynamic route `app/calculators/[slug]/page.tsx` with
 * `dynamicParams = false`. So the invariant worth guarding here is the one
 * that actually decides reachability: every registry tool is rendered as a
 * REAL anchor in the index's server HTML, and every one of those anchors
 * resolves to a route that generateStaticParams actually emits.
 *
 * The index page is a synchronous server component, so it is rendered with
 * renderToStaticMarkup and the anchors are counted in the output. That is a
 * stronger check than a source scan: a card that stops being an <a> (a button,
 * a tab, an onClick div) fails here and would not fail a grep.
 *
 * PREMIUM TOOLS ARE DELIBERATELY NOT LISTED. `lib/calculators/premium/registry`
 * holds four tools with NO routes of their own: they are client islands
 * mounted inside blog posts by `PremiumUpgrade`. Listing them on /calculators
 * would emit four dead links, so the last test asserts the opposite of the
 * first: no premium toolId is ever linked under /calculators/.
 */
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync } from "fs";
import { join } from "path";

// The index's closing ask is the estate `LeadCTAPanel` carrying the real
// `LeadForm`, and `LeadForm` calls `useRouter()`, which throws outside an app
// router ("invariant expected app router to be mounted"). Mock the router
// surface only: renderToStaticMarkup never navigates, and every assertion
// below is about anchors, not about the form.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: () => {}, replace: () => {}, refresh: () => {}, prefetch: () => {} }),
  usePathname: () => "/calculators",
  useSearchParams: () => new URLSearchParams(),
}));

// The app's .tsx files are transformed with the classic JSX runtime, which
// expects a global React. Set it before any component module is rendered.
(globalThis as { React?: typeof React }).React = React;

import { allTools, genericTools } from "@/lib/calculators/registry";
import { PREMIUM_TOOLS } from "@/lib/calculators/premium/registry";
import CalculatorsPage from "@/app/calculators/page";
import { generateStaticParams } from "@/app/calculators/[slug]/page";

const APP_DIR = join(__dirname, "..", "app");
const html = renderToStaticMarkup(React.createElement(CalculatorsPage));
const linkedSlugs = new Set(
  Array.from(html.matchAll(/href="\/calculators\/([a-z0-9-]+)"/g)).map((m) => m[1]),
);

describe("calculator crawl path", () => {
  it("the registry is not empty, so nothing below passes vacuously", () => {
    expect(allTools().length).toBeGreaterThan(0);
  });

  it("every registry tool is a real anchor in the /calculators server HTML", () => {
    const missing = allTools()
      .map((t) => t.slug)
      .filter((slug) => !linkedSlugs.has(slug));
    expect(
      missing,
      `these registry tools are not reachable by a crawlable link from /calculators: ${missing.join(", ")}. ` +
        "A tool that only appears behind a tab, a button or an onClick handler has no crawl path at all.",
    ).toEqual([]);
  });

  it("every anchor on /calculators resolves to a route that really exists", () => {
    const generated = new Set(generateStaticParams().map((p) => p.slug));
    const bespokeSlugs = allTools()
      .map((t) => t.slug)
      .filter((slug) => !generated.has(slug));

    const dead: string[] = [];
    for (const slug of linkedSlugs) {
      if (generated.has(slug)) continue;
      // A tool outside the generic route must own a static page of its own.
      if (existsSync(join(APP_DIR, "calculators", slug, "page.tsx"))) continue;
      dead.push(slug);
    }
    expect(
      dead,
      `/calculators links to ${dead.join(", ")}, which neither generateStaticParams() emits nor a static ` +
        "page.tsx serves. dynamicParams is false on the [slug] route, so these are 404s.",
    ).toEqual([]);

    // Same statement from the other side: nothing bespoke is silently routeless.
    const routeless = bespokeSlugs.filter(
      (slug) => !existsSync(join(APP_DIR, "calculators", slug, "page.tsx")),
    );
    expect(routeless, `bespoke tools with no page.tsx: ${routeless.join(", ")}`).toEqual([]);
  });

  it("generateStaticParams emits exactly the generic registry slugs", () => {
    expect(generateStaticParams().map((p) => p.slug).sort()).toEqual(
      genericTools().map((t) => t.slug).sort(),
    );
  });

  it("no premium tool is linked as a /calculators route (they have none)", () => {
    const linkedPremium = Object.keys(PREMIUM_TOOLS).filter((id) => linkedSlugs.has(id));
    expect(
      linkedPremium,
      `premium tools are in-page islands with no route of their own. Linking ${linkedPremium.join(", ")} ` +
        "under /calculators/ emits a dead link.",
    ).toEqual([]);
    expect(Object.keys(PREMIUM_TOOLS).length, "premium registry is empty, so this check is vacuous").toBeGreaterThan(0);
  });
});
