/**
 * Taxonomy and route-derivation tests for the help widget's intent model.
 *
 * The point of these is drift: the taxonomy hard-codes slugs, and the slugs live
 * in five other files. Each block below re-derives the real slug set from its
 * source of truth (content frontmatter, the calculator registry, the service and
 * hub data files, the research route folder) and asserts the taxonomy still
 * covers it, so adding a calculator or a blog category fails here rather than
 * silently falling back to the generic opener.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { slugifyCategory } from "@/lib/blog";
import { TOOLS } from "@/lib/calculators/registry";
import { hospitalityServices } from "@/data/hospitality-services";
import { hospitalityHubs } from "@/data/hospitality-hubs";
import {
  TOPICS,
  CALC_SLUG_TO_TOPIC,
  SERVICE_SLUG_TO_TOPIC,
  HUB_SLUG_TO_TOPIC,
  RESEARCH_SLUG_TO_TOPIC,
  getTopic,
  type TopicKey,
} from "@/lib/intent/taxonomy";
import { deriveTopic } from "@/lib/intent/widget-config";

const ROOT = join(__dirname, "..", "..");
const ALL_KEYS = TOPICS.map((t) => t.key);

function publishedCategorySlugs(): string[] {
  const dir = join(ROOT, "content", "blog");
  const cats = new Set<string>();
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const m = readFileSync(join(dir, f), "utf8").match(/^category:\s*"?([^"\n]+)"?\s*$/m);
    if (m) cats.add(slugifyCategory(m[1].trim()));
  }
  return [...cats].sort();
}

describe("taxonomy covers the site's real slugs", () => {
  it("topic keys are unique and every topic has copy", () => {
    expect(new Set(ALL_KEYS).size).toBe(ALL_KEYS.length);
    for (const t of TOPICS) {
      expect(t.label.length).toBeGreaterThan(0);
      expect(t.ctaCopy.length).toBeGreaterThan(0);
      expect(getTopic(t.key)).toBe(t);
    }
    expect(getTopic(null)).toBeNull();
    expect(getTopic("not-a-topic")).toBeNull();
  });

  it("every published blog category resolves to a topic", () => {
    const slugs = publishedCategorySlugs();
    // Guards the guard: an empty read would make the loop vacuous.
    expect(slugs.length).toBeGreaterThanOrEqual(8);
    const covered = new Set(TOPICS.flatMap((t) => t.blogCategorySlugs));
    for (const s of slugs) expect(covered.has(s), s).toBe(true);
  });

  it("every calculator in the registry maps to a topic", () => {
    const slugs = TOOLS.map((t) => t.slug);
    expect(slugs.length).toBeGreaterThanOrEqual(3);
    for (const s of slugs) expect(CALC_SLUG_TO_TOPIC[s], s).toBeTruthy();
  });

  it("every service and every audience hub maps to a topic", () => {
    expect(hospitalityServices.length).toBe(5);
    expect(hospitalityHubs.length).toBe(6);
    for (const s of hospitalityServices) expect(SERVICE_SLUG_TO_TOPIC[s.slug], s.slug).toBeTruthy();
    for (const h of hospitalityHubs) expect(HUB_SLUG_TO_TOPIC[h.slug], h.slug).toBeTruthy();
  });

  it("every research route maps to a topic", () => {
    const dir = join(ROOT, "src", "app", "research");
    const routes = readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    expect(routes.length).toBeGreaterThanOrEqual(3);
    for (const r of routes) expect(RESEARCH_SLUG_TO_TOPIC[r], r).toBeTruthy();
  });

  it("every mapped topic value is a real topic key", () => {
    const maps = [
      CALC_SLUG_TO_TOPIC,
      SERVICE_SLUG_TO_TOPIC,
      HUB_SLUG_TO_TOPIC,
      RESEARCH_SLUG_TO_TOPIC,
    ];
    for (const m of maps) {
      for (const v of Object.values(m)) expect(ALL_KEYS).toContain(v as TopicKey);
    }
  });

  it("a topic's primaryCalculator, when set, is a live calculator slug", () => {
    const live = new Set(TOOLS.map((t) => t.slug));
    for (const t of TOPICS) {
      if (t.primaryCalculator) expect(live.has(t.primaryCalculator), t.key).toBe(true);
    }
  });
});

describe("deriveTopic maps every route family", () => {
  const cases: Array<[string, TopicKey | null]> = [
    // blog category index and post
    ["/blog/tips-and-tronc", "tronc"],
    ["/blog/hospitality-vat/hot-food-five-tests", "vat"],
    ["/blog/payroll-and-employment", "staff-costs"],
    ["/blog/business-rates", "business-rates"],
    ["/blog/capital-allowances", "business-rates"],
    ["/blog/licensed-trade", "licensed-trade"],
    ["/blog/hospitality-accounts", "compliance"],
    ["/blog/making-tax-digital", "compliance"],
    // service slug
    ["/services/tronc-scheme-setup", "tronc"],
    ["/services/hospitality-vat", "vat"],
    ["/services/toms-advice", "vat"],
    ["/services/hospitality-payroll", "staff-costs"],
    ["/services/business-rates-relief", "business-rates"],
    // audience slug
    ["/for/restaurants", "vat"],
    ["/for/pubs-and-bars", "licensed-trade"],
    ["/for/caterers-and-street-food", "vat"],
    // calculator and its embed twin
    ["/calculators/tronc-tips-paye-nic-calculator", "tronc"],
    ["/calculators/food-drink-vat-rate-checker", "vat"],
    ["/calculators/staff-cost-rota-margin-calculator", "staff-costs"],
    ["/embed/food-drink-vat-rate-checker", "vat"],
    // research page
    ["/research/uk-hospitality-insolvency-index", "compliance"],
    ["/research/uk-hospitality-food-hygiene-map", "compliance"],
    // no topic
    ["/", null],
    ["", null],
    ["/contact", null],
    ["/about", null],
    ["/book", null],
    ["/blog", null],
    ["/services", null],
    ["/research", null],
    ["/calculators", null],
    ["/for", null],
    ["/services/not-a-service", null],
    ["/for/not-a-hub", null],
  ];

  for (const [path, expected] of cases) {
    it(`${path || "(empty)"} -> ${expected ?? "null"}`, () => {
      expect(deriveTopic(path)).toBe(expected);
    });
  }

  it("ignores query strings, hashes and trailing slashes", () => {
    expect(deriveTopic("/services/tronc-scheme-setup/")).toBe("tronc");
    expect(deriveTopic("/blog/licensed-trade?page=2")).toBe("licensed-trade");
    expect(deriveTopic("/research/uk-hospitality-insolvency-index#method")).toBe("compliance");
  });
});
