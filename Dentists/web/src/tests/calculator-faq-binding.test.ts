/**
 * T17 guard for /calculators/[slug]: the FAQPage JSON-LD must name exactly the questions
 * the page renders in its <dl>, for every routed tool.
 *
 * Both consumers read ONE array, `tool.faqs` (the schema at page.tsx via buildFaqPage, the
 * <dl> via `tool.faqs.map`). This test asserts the set equality the binding produces AND
 * that the single binding is still single: a second source for either consumer is how
 * structured data starts claiming text the page does not show.
 */
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { buildFaqPage } from "@/lib/schema/faq-page";
import { allTools } from "@/lib/tools/registry";

const PAGE = readFileSync("src/app/calculators/[slug]/page.tsx", "utf8");

type Question = { name: string };

describe("calculator FAQ: one array, both consumers", () => {
  it("every routed tool's FAQPage names the exact set of questions rendered", () => {
    const tools = allTools().flatMap((t) =>
      t.kind === "generic" && t.faqs && t.faqs.length > 0
        ? [{ slug: t.slug, faqs: t.faqs }]
        : [],
    );
    expect(tools.length).toBeGreaterThan(0);

    for (const tool of tools) {
      const faqs = tool.faqs;
      // What the <dl> renders: one <dt> per entry of tool.faqs.
      const rendered = new Set(faqs.map((f) => f.question));
      const schema = buildFaqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })));
      const emitted = new Set(
        ((schema as unknown as { mainEntity: Question[] }).mainEntity ?? []).map((q) => q.name),
      );
      expect(emitted, `FAQPage vs <dl> for ${tool.slug}`).toEqual(rendered);
    }
  });

  it("the template still binds both consumers to tool.faqs and nothing else", () => {
    expect(PAGE).toContain("buildFaqPage(tool.faqs.map(");
    expect(PAGE).toContain("{tool.faqs.map(");
    // No second FAQ source sneaking in beside it.
    expect(PAGE.match(/\.faqs\.map\(/g)?.length).toBe(2);
  });
});
