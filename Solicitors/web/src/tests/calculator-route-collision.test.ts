import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { BESPOKE_CALCULATOR_SLUGS } from "@/lib/tools/bespoke-routes";
import { generateStaticParams } from "@/app/calculators/[slug]/page";

/**
 * A slug with its own static page AND a [slug] entry prerenders twice to the
 * same .next/server/app/calculators/<slug>.html, and the generic render wins.
 * That is what silently stripped law-firm-sale-cgt's gate wording and its live
 * `data-cta="see_result"`.
 */
describe("calculator route collision", () => {
  const staticSlugs = readdirSync(join(process.cwd(), "src/app/calculators"), {
    withFileTypes: true,
  })
    .filter((d) => d.isDirectory() && d.name !== "[slug]")
    .map((d) => d.name);

  it("excludes every static sibling from generateStaticParams", () => {
    const params = generateStaticParams().map((p) => p.slug);
    for (const slug of staticSlugs) expect(params).not.toContain(slug);
  });

  it("keeps the exclusion list equal to the static siblings on disk", () => {
    expect([...BESPOKE_CALCULATOR_SLUGS].sort()).toEqual([...staticSlugs].sort());
  });
});
