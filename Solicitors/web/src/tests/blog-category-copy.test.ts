/**
 * Blog category coverage guard.
 *
 * Seventeen distinct categories exist in post frontmatter. Seven have
 * hand-built hub pages under src/app/blog/, the other ten are derived by
 * src/app/blog/[category]/page.tsx. Every one of them is addressed by the
 * output of `slugifyCategory()`, so any per-category copy map added in a
 * later phase is keyed on that output, and a missing key renders a blank
 * panel instead of failing.
 *
 * This guard pins the slug set, pins the one genuinely awkward slug
 * (parentheses plus a spaced slash), and, the moment a copy map module
 * exists, asserts it covers every category rather than most of them.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { getAllCategories, slugifyCategory } from "@/lib/blog";

const CATEGORY_ROUTE = join(__dirname, "..", "app", "blog", "[category]", "page.tsx");

/** Hand-built hubs, mirrored from STATIC_HUB_SLUGS in the dynamic route. */
const STATIC_HUB_SLUGS = [
  "partnership-llp-accounting",
  "practice-finance-cash-flow",
  "practice-succession-sale",
  "sole-practitioner-tax",
  "sra-compliance-trust-accounting",
  "structure-incorporation",
  "vat-compliance",
];

/**
 * Optional consumer. A later phase adds a per-category CTA copy map keyed on
 * slugifyCategory() output. Until it exists this resolves to null and the
 * coverage test reports itself as dormant; when it lands the test arms with
 * no edit here.
 */
const COPY_MODULE = "../lib/blog-category-copy";
let copyMap: Record<string, unknown> | null = null;
try {
  const mod = (await import(/* @vite-ignore */ COPY_MODULE)) as {
    BLOG_CATEGORY_COPY?: Record<string, unknown>;
  };
  copyMap = mod.BLOG_CATEGORY_COPY ?? null;
} catch {
  copyMap = null;
}

describe("blog category copy coverage", () => {
  const categories = getAllCategories();

  it("has seventeen distinct categories in the corpus", () => {
    expect(categories.length).toBe(17);
  });

  it("slugifies the awkward category exactly", () => {
    // Parentheses and a spaced slash. This is the slug a copy map must be
    // keyed on, and the one most likely to be hand-typed wrong.
    expect(slugifyCategory("Compliance & Risk (COLP / COFA)")).toBe(
      "compliance-risk-colp-cofa",
    );
    expect(slugifyCategory("SRA Accounts Rules")).toBe("sra-accounts-rules");
    expect(slugifyCategory("Fee-Earner Tax & Compensation")).toBe(
      "fee-earner-tax-compensation",
    );
  });

  it("gives every category a distinct, route-safe slug", () => {
    const slugs = categories.map((c) => c.slug);
    expect(new Set(slugs).size, `collision in ${slugs.join(", ")}`).toBe(slugs.length);
    const unsafe = slugs.filter((s) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s));
    expect(unsafe, unsafe.join(", ")).toEqual([]);
  });

  it("keeps the hand-built hub list in step with the dynamic route", () => {
    const src = readFileSync(CATEGORY_ROUTE, "utf8");
    for (const slug of STATIC_HUB_SLUGS) {
      expect(src.includes(`"${slug}"`), `${slug} is missing from STATIC_HUB_SLUGS`).toBe(true);
    }
    const slugs = new Set(categories.map((c) => c.slug));
    for (const slug of STATIC_HUB_SLUGS) {
      expect(slugs.has(slug), `${slug} has a hub page but no category produces that slug`).toBe(
        true,
      );
    }
  });

  it("covers every category key once a copy map exists", () => {
    if (!copyMap) {
      // Dormant on purpose: no consumer yet. Do not delete this test, it arms
      // itself the moment src/lib/blog-category-copy.ts lands.
      expect(copyMap).toBeNull();
      return;
    }
    const missing = categories.map((c) => c.slug).filter((s) => !(s in copyMap!));
    expect(missing, `copy map has no entry for: ${missing.join(", ")}`).toEqual([]);
    const orphans = Object.keys(copyMap).filter(
      (k) => !categories.some((c) => c.slug === k),
    );
    expect(orphans, `copy map keys matching no category: ${orphans.join(", ")}`).toEqual([]);
  });
});
