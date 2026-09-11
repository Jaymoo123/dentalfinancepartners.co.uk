import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { BESPOKE_CALCULATOR_SLUGS } from "@/lib/tools/bespoke-routes";
import { generateStaticParams as calculatorParams } from "@/app/calculators/[slug]/page";
import { generateStaticParams as embedParams } from "@/app/embed/[slug]/page";

/**
 * A slug with its own static page AND a [slug] entry prerenders twice to the
 * same .next/server/app/calculators/<slug>.html, and the generic render wins.
 * That is what silently stripped law-firm-sale-cgt's gate wording and its live
 * `data-cta="see_result"`.
 *
 * Every catch-all route that can grow static siblings gets the same guard, not
 * just /calculators: /embed/[slug] has the identical shape. Its exclusion list
 * is empty today, and the second assertion is what makes that a claim rather
 * than an omission, so the day someone adds src/app/embed/<slug>/ the test
 * fails until the slug is excluded from generateStaticParams.
 */
const ROOTS = [
  {
    dir: "src/app/calculators",
    params: calculatorParams,
    excluded: BESPOKE_CALCULATOR_SLUGS,
  },
  // ponytail: no bespoke embed pages yet, so the list is a literal empty array
  // rather than a second exported constant. Promote it to one when it fills.
  { dir: "src/app/embed", params: embedParams, excluded: [] as string[] },
];

describe.each(ROOTS)("route collision: $dir", ({ dir, params, excluded }) => {
  const staticSlugs = readdirSync(join(process.cwd(), dir), { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "[slug]")
    .map((d) => d.name);

  it("excludes every static sibling from generateStaticParams", () => {
    const generated = params().map((p) => p.slug);
    for (const slug of staticSlugs) expect(generated).not.toContain(slug);
  });

  it("keeps the exclusion list equal to the static siblings on disk", () => {
    expect([...excluded].sort()).toEqual([...staticSlugs].sort());
  });
});
