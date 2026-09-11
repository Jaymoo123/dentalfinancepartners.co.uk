/**
 * Guards `src/lib/page-summaries.ts`: the one-line summary a related-reading
 * card shows for a non-article destination (DESIGN_SYSTEM section 3).
 *
 * The registry's value is that there is ONE sentence per page. Its risk is that
 * it becomes a stale second copy of the page's own standfirst. So the central
 * assertion is a sync check: each sentence must equal that route's
 * `metadata.description`, read out of the page source. Edit the page and the
 * registry must follow, or this fails.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { PAGE_SUMMARIES, pageSummary } from "@/lib/page-summaries";
import { routeExists, APP_DIR as APP } from "./route-exists";

/** The route's own `metadata.description`, as authored in its page source. */
function metadataDescription(href: string): string | undefined {
  const file = join(APP, ...href.split("/").filter(Boolean), "page.tsx");
  const src = readFileSync(file, "utf8");
  return src.match(/description:\s*\n?\s*["'`]([^"'`]{40,500})/)?.[1];
}

describe("page summaries", () => {
  it("has a registry to test", () => {
    expect(Object.keys(PAGE_SUMMARIES).length).toBeGreaterThan(5);
  });

  it("gives every registered route one readable sentence", () => {
    const bad: string[] = [];
    for (const [href, summary] of Object.entries(PAGE_SUMMARIES)) {
      if (!href.startsWith("/")) bad.push(`${href}: not an internal route`);
      if (!routeExists(href, APP)) bad.push(`${href}: no such route`);
      if (summary.length < 60) bad.push(`${href}: too short (${summary.length})`);
      if (!/\.$/.test(summary)) bad.push(`${href}: does not end in a full stop`);
      if (summary.includes("—")) bad.push(`${href}: contains an em dash`);
    }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("matches each route's own metadata.description, so the two cannot drift", () => {
    const drifted: string[] = [];
    for (const [href, summary] of Object.entries(PAGE_SUMMARIES)) {
      const description = metadataDescription(href);
      if (!description) drifted.push(`${href}: no metadata.description found in page source`);
      else if (description !== summary) drifted.push(`${href}:\n  page: ${description}\n  registry: ${summary}`);
    }
    expect(drifted, drifted.join("\n")).toEqual([]);
  });

  it("resolves a route with a query string or a fragment", () => {
    expect(pageSummary("/contact?utm_source=x")).toBe(PAGE_SUMMARIES["/contact"]);
    expect(pageSummary("/contact#form")).toBe(PAGE_SUMMARIES["/contact"]);
    expect(pageSummary("/nope")).toBeUndefined();
  });
});
