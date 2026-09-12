/**
 * TD-01 regression guard, Phase 6 / P6-A: our own fees are never published, and
 * structured data is the place the rule gets broken invisibly.
 *
 * THE DEFECT IT IS POINTED AT. `src/lib/schema.ts` shipped `priceRange: "££"`
 * inside the `LocalBusiness` / `AccountingService` and `Organization` JSON-LD, on
 * 26 live surfaces (all 25 `/locations/[slug]` pages plus the site-wide
 * Organization block). Nothing rendered it, so no copy review could ever have
 * seen it; Google reads it as a price signal for our advisory service. The keys
 * are gone now (TD-01's Trade half is closed) and nothing held them gone.
 *
 * WHY IT ASSERTS ON SOURCE. A rendered assertion needs a production build and a
 * running server, which no unit test in this repo has. So the corpus is the
 * SOURCE OF EVERY SURFACE THAT EMITS JSON-LD, enumerated programmatically:
 * every `.ts`/`.tsx` under `src/` (tests excluded) whose comment-stripped source
 * mentions `schema.org`, plus the `schema:` frontmatter of every `content/*.md`
 * article, which publishes structured data the same way an inline builder does
 * and is invisible to a `src/` sweep. That is T33 and DL-9: enumerate the corpus,
 * never pin a file list.
 *
 * WHY THE SOURCE IS COMMENT-STRIPPED FIRST. This is the exact shape of guard
 * this site has already shipped three of that could not fail.
 * `src/app/services/page.tsx:114` contains the sentence "NO price, priceRange,
 * offers.price or priceSpecification anywhere" inside a docblock. A naive regex
 * over raw source matches that comment on every run, so the guard would be red
 * for a reason that is not a defect, and the obvious "fix" is to loosen the
 * regex until it is green against everything, including a real breach. Comments
 * are removed before matching, and that removal is itself asserted below.
 *
 * THE TWO PERMITTED EXCEPTIONS, both pinned byte-for-byte and both subtracted
 * from the source before it is scanned, so anything added beside them is still
 * caught. See `EXEMPTIONS` below for the second (`/services`' price-free
 * `OfferCatalog`). The first: `src/lib/calculator-schema.ts` emits `offers: { "@type": "Offer", price: "0",
 * priceCurrency: "GBP" }` on the 12 calculator routes. That describes the FREE
 * TOOL being free, which is what `isAccessibleForFree` means in
 * `WebApplication`; it is not a fee for the advisory service. It is allowed
 * because it is `"0"`, and it is pinned as a literal so that editing the figure
 * to anything else fails this test rather than passing through the exemption.
 *
 * WHEN THIS FAILS: do not widen the allow-list. Delete the key. If a new free
 * tool genuinely needs a `price: "0"` offer, pin it here as a second explicit
 * exception with the same `"0"` literal, in its own entry, never by relaxing the
 * pattern.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const WEB = join(__dirname, "..", "..", "..");
const SRC = join(WEB, "src");

function walk(dir: string, exts: string[], skip: string[] = []): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (skip.some((s) => p.includes(s))) continue;
    if (statSync(p).isDirectory()) out.push(...walk(p, exts, skip));
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const rel = (f: string) => relative(WEB, f).replace(/\\/g, "/");

/**
 * Remove block and line comments. `//` is only treated as a comment opener when
 * it is NOT preceded by a colon, so `"https://schema.org"` survives intact and
 * the corpus filter below still sees the files it must see.
 */
export function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/**
 * Schema.org properties that publish a price, a fee band or a rating. Matched as
 * an OBJECT KEY (`key:` or `"key":`) rather than as a bare word, so prose about
 * pricing in a page's copy is not mistaken for structured data, and as a `@type`
 * value for the three price/rating-carrying types.
 */
const BANNED_KEY =
  /(?:^[ 	]*|[{,[]\s*)"?(priceRange|priceSpecification|priceCurrency|lowPrice|highPrice|price|offers|aggregateRating|ratingValue|reviewCount|review)"?\s*:/g;
const BANNED_TYPE = /"@type"\s*:\s*"(Offer|AggregateRating|Review)"/g;

/** Every match of either pattern, with the ~80 characters around it for the failure message. */
function findPriceSignals(text: string): string[] {
  const hits: string[] = [];
  for (const re of [BANNED_KEY, BANNED_TYPE]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      hits.push(text.slice(Math.max(0, m.index - 40), m.index + 60).replace(/\s+/g, " ").trim());
    }
  }
  return hits;
}

/** The JSON-LD-emitting source files, enumerated, not listed. */
const LD_FILES = walk(SRC, [".ts", ".tsx"], [join("src", "tests")])
  .map((f) => ({ path: rel(f), raw: readFileSync(f, "utf8") }))
  .map((f) => ({ ...f, code: stripComments(f.raw) }))
  // schema.org for an inline literal, ld+json for a page that renders one it was
  // handed, "@type" for an object assembled without the @context line in view.
  .filter((f) => /schema\.org|application\/ld\+json|"@type"/.test(f.code));

/** The three JSON-LD builder modules. Anything under src/lib named *schema*. */
const BUILDERS = walk(join(SRC, "lib"), [".ts"], [".test.ts"])
  .filter((f) => /schema/i.test(f))
  .map((f) => ({ path: rel(f), code: stripComments(readFileSync(f, "utf8")) }));

/**
 * `schema:` frontmatter is a one-line single-quoted JSON string in this corpus.
 * Most articles carry `schema: ''` and rely on the page's own builder; 4 carry a
 * hand-written FAQPage block, and those 4 publish structured data that no `src/`
 * sweep can see. Both numbers are asserted below so a drop in either is loud.
 */
const MD_FILES = walk(join(WEB, "content"), [".md"]);
const MD_SCHEMA = MD_FILES
  .map((f) => ({ path: rel(f), block: (readFileSync(f, "utf8").match(/^schema:\s*'([\s\S]*?)'\s*$/m) || [, ""])[1] }))
  .filter((f) => f.block.includes("schema.org"));

const FREE_TOOL_FILE = "src/lib/calculator-schema.ts";
const FREE_TOOL_OFFER = `offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },`;
const SERVICES_FILE = "src/app/services/page.tsx";
const SERVICES_OFFER = `"@type": "Offer",\n      itemOffered: {`;

/**
 * The only two tolerated offer constructs on this site, pinned byte-for-byte and
 * SUBTRACTED from the source before it is scanned, so that anything added beside
 * them is still caught.
 *
 *  1. the free tool's own zero price inside `WebApplication`. Exempt because the
 *     price is the string "0" on a free calculator, not a fee for advice.
 *  2. `/services`' `OfferCatalog`, whose seven `Offer` entries carry NO price at
 *     all (an OfferCatalog is valid without one) and exist to declare the seven
 *     services the page documents. Exempt as written; add a price key anywhere
 *     inside it and the scan below still sees it, because only this literal is
 *     removed.
 */
const EXEMPTIONS = [
  { path: FREE_TOOL_FILE, literal: FREE_TOOL_OFFER },
  { path: SERVICES_FILE, literal: SERVICES_OFFER },
];

function unexplainedSignals(file: { path: string; code: string }): string[] {
  let code = file.code;
  for (const ex of EXEMPTIONS) {
    if (ex.path === file.path) code = code.split(ex.literal).join(" ");
  }
  return findPriceSignals(code);
}

describe("no JSON-LD surface publishes our own pricing (TD-01)", () => {
  it("guard-the-guard: the corpus is real and non-empty", () => {
    // If any of these is 0 every assertion below passes vacuously.
    expect(LD_FILES.length, "no JSON-LD source files found").toBeGreaterThan(8);
    expect(BUILDERS.map((b) => b.path)).toContain("src/lib/schema.ts");
    expect(BUILDERS.map((b) => b.path)).toContain(FREE_TOOL_FILE);
    expect(BUILDERS.map((b) => b.path)).toContain("src/lib/faq-page-schema.ts");
    expect(MD_FILES.length, "no article corpus found").toBeGreaterThan(50);
    expect(MD_SCHEMA.length, "no article schema frontmatter found").toBeGreaterThanOrEqual(4);
  });

  it("guard-the-guard: the detector fires on a real breach and on the shape TD-01 shipped", () => {
    // The literal that was live on 26 surfaces.
    expect(findPriceSignals(`priceRange: "££",`).length).toBeGreaterThan(0);
    expect(findPriceSignals(`"priceRange": "£££"`).length).toBeGreaterThan(0);
    expect(findPriceSignals(`offers: { "@type": "Offer", price: "150.00" }`).length).toBeGreaterThan(0);
    expect(findPriceSignals(`aggregateRating: { ratingValue: 4.9 }`).length).toBeGreaterThan(0);
    // And does NOT fire on ordinary prose that happens to use the word.
    expect(findPriceSignals("Building the price: the cost stack for a rewire")).toEqual([]);
    expect(findPriceSignals("We do not publish our prices anywhere on this site.")).toEqual([]);
  });

  it("guard-the-guard: comments are stripped, so a docblock cannot make this test red or green", () => {
    const services = readFileSync(join(SRC, "app", "services", "page.tsx"), "utf8");
    // This file genuinely contains the words in a docblock. If the stripper ever
    // stops working, this assertion tells the reader exactly why the suite went
    // red, instead of leaving them to loosen the regex.
    expect(services).toContain("priceRange");
    expect(
      unexplainedSignals({ path: SERVICES_FILE, code: stripComments(services) }),
    ).toEqual([]);
    // ...and the stripper must not eat live code or the schema.org URL.
    expect(stripComments('const a = 1; // note\nconst b = "https://schema.org";')).toContain(
      "https://schema.org",
    );
    expect(stripComments("/* priceRange: 1 */ const live = 2;")).toContain("const live = 2;");
  });

  it("no price, priceRange, offers, rating or currency key in any JSON-LD source file", () => {
    const breaches = LD_FILES.flatMap((f) => unexplainedSignals(f).map((h) => `${f.path}: ${h}`));
    expect(
      breaches,
      [
        "A price/fee/rating signal reached a JSON-LD surface. This is TD-01.",
        "Our own advisory fees are never published, and structured data is where",
        "the rule breaks invisibly: nothing renders it and Google reads it.",
        "Delete the key. Do not add it to the allow-list in this file.",
        ...breaches,
      ].join("\n"),
    ).toEqual([]);
  });

  it("no price signal in any article's schema frontmatter either", () => {
    const breaches = MD_SCHEMA.flatMap((f) => findPriceSignals(f.block).map((h) => `${f.path}: ${h}`));
    expect(breaches, breaches.join("\n")).toEqual([]);
  });

  it("no currency amount anywhere in a schema builder", () => {
    // Scoped to the builders, where any money at all is suspect. Page files are
    // excluded on purpose: their FAQ copy is full of legitimate £ figures.
    const breaches = BUILDERS.flatMap((b) =>
      (b.code.match(/£\s*[\d£]|\bGBP\b|\bEUR\b|\bUSD\b/g) || []).map((m) => `${b.path}: ${m}`),
    ).filter((m) => m !== `${FREE_TOOL_FILE}: GBP`);
    expect(breaches, breaches.join("\n")).toEqual([]);
  });

  it("both permitted exceptions are still present, byte-for-byte", () => {
    // A two-way honesty check on the allow-list: an exemption whose literal has
    // changed shape is no longer the thing that was assessed, and must be
    // re-assessed rather than silently carried.
    for (const ex of EXEMPTIONS) {
      const src = readFileSync(join(WEB, ...ex.path.split("/")), "utf8");
      expect(
        src.split(ex.literal).length - 1,
        `${ex.path} must contain exactly one:\n  ${ex.literal}\n` +
          "The exemption is for that literal only. Any other figure, currency or " +
          "shape is a published fee and is not exempt.",
      ).toBe(1);
    }
    // The exemption must not have quietly spread to a second builder.
    const holders = BUILDERS.filter((b) => /\boffers\s*:/.test(b.code)).map((b) => b.path);
    expect(holders).toEqual([FREE_TOOL_FILE]);
  });
});
