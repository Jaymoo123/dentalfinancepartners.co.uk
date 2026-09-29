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
import { startupsServices } from "@/data/startups-services";
import { startupsHubs } from "@/data/startups-hubs";
import {
  TOPICS,
  CALC_SLUG_TO_TOPIC,
  SERVICE_SLUG_TO_TOPIC,
  HUB_SLUG_TO_TOPIC,
  RESEARCH_SLUG_TO_TOPIC,
  getTopic,
  type TopicKey,
} from "@/lib/intent/taxonomy";
import { deriveTopic } from "@/lib/intent/deriveTopic";

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
    expect(slugs.length).toBeGreaterThanOrEqual(5);
    const covered = new Set(TOPICS.flatMap((t) => t.blogCategorySlugs));
    for (const s of slugs) expect(covered.has(s)).toBe(true);
  });

  it("every calculator in the registry maps to a topic", () => {
    const slugs = TOOLS.map((t) => t.slug);
    expect(slugs.length).toBeGreaterThanOrEqual(4);
    for (const s of slugs) expect(CALC_SLUG_TO_TOPIC[s]).toBeTruthy();
  });

  it("every service and every audience hub maps to a topic", () => {
    expect(startupsServices.length).toBe(6);
    expect(startupsHubs.length).toBe(5);
    for (const s of startupsServices) expect(SERVICE_SLUG_TO_TOPIC[s.slug]).toBeTruthy();
    for (const h of startupsHubs) expect(HUB_SLUG_TO_TOPIC[h.slug]).toBeTruthy();
  });

  it("every research route maps to a topic", () => {
    const dir = join(ROOT, "src", "app", "research");
    const routes = readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    expect(routes.length).toBeGreaterThanOrEqual(5);
    for (const r of routes) expect(RESEARCH_SLUG_TO_TOPIC[r]).toBeTruthy();
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
      if (t.primaryCalculator) expect(live.has(t.primaryCalculator)).toBe(true);
    }
  });
});

describe("deriveTopic maps every route family", () => {
  const cases: Array<[string, TopicKey | null]> = [
    // blog category index and post
    ["/blog/share-schemes-and-emi", "share-schemes"],
    ["/blog/research-and-development/rd-intensive-sme-rules", "rnd"],
    ["/blog/seis-and-eis", "seis-eis"],
    ["/blog/saas-and-tech-finance", "saas-finance"],
    ["/blog/startup-compliance", "compliance"],
    // service slug
    ["/services/rd-tax-claims", "rnd"],
    ["/services/emi-scheme-setup", "share-schemes"],
    // audience slug
    ["/for/saas-companies", "saas-finance"],
    ["/for/pre-seed-founders", "seis-eis"],
    // calculator and its embed twin
    ["/calculators/founder-dividend-vs-salary-calculator", "founder-pay"],
    ["/embed/emi-vs-unapproved-calculator", "share-schemes"],
    // research page
    ["/research/rd-tax-relief-index", "rnd"],
    ["/research/tech-startup-survival-index", "saas-finance"],
    // no topic
    ["/", null],
    ["", null],
    ["/contact", null],
    ["/about", null],
    ["/blog", null],
    ["/services", null],
    ["/research", null],
    ["/calculators", null],
    ["/services/not-a-service", null],
    ["/for/not-a-hub", null],
  ];

  for (const [path, expected] of cases) {
    it(`${path || "(empty)"} -> ${expected ?? "null"}`, () => {
      expect(deriveTopic(path)).toBe(expected);
    });
  }

  it("ignores query strings, hashes and trailing slashes", () => {
    expect(deriveTopic("/services/rd-tax-claims/")).toBe("rnd");
    expect(deriveTopic("/blog/seis-and-eis?page=2")).toBe("seis-eis");
    expect(deriveTopic("/research/rd-tax-relief-index#method")).toBe("rnd");
  });
});
