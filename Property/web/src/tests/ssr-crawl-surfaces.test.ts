/**
 * The two surfaces a crawler without JavaScript must be able to read:
 *
 * 1. FAQ answers. `AccordionContent` force-mounts its content so every answer
 *    is in the server HTML, not only in the FAQPage schema. A regression here
 *    puts twelve questions and zero answers back in front of Bing and the AI
 *    crawlers.
 * 2. Header links. The desktop dropdown panels and the mobile drawer are always
 *    rendered (hidden by attribute, not by conditional mount), so every page
 *    carries a crawlable link to each service, resource and calculator.
 *
 * Rendered with react-dom/server, exactly what Next ships before hydration.
 */
import { describe, expect, it, vi } from "vitest";
import { createElement, type ComponentType } from "react";
import type { NavItem } from "@/config/site";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: unknown; [k: string]: unknown }) => {
    const attrs = Object.fromEntries(Object.entries(rest).filter(([k]) => k !== "onClick"));
    return createElement("a", { href, ...attrs }, children as never);
  },
}));

const faqs = [
  { question: "What does a landlord accountant do?", answer: "ANSWER ONE text that must be in the HTML." },
  { question: "Do I need an accountant for one rental property?", answer: "ANSWER TWO text that must be in the HTML." },
];

describe("FAQ answers are in the server HTML", () => {
  it("renders every answer, with closed items hidden by data-state", async () => {
    const { FaqSection } = await import("@/components/ui/FaqSection");
    const html = renderToStaticMarkup(createElement(FaqSection, { faqs }));
    for (const f of faqs) {
      expect(html).toContain(f.question);
      expect(html).toContain(f.answer);
    }
    // Closed by default: the content carries data-state="closed" and the class that hides it.
    expect(html).toMatch(/data-state="closed"[^>]*data-\[state=closed\]:hidden|data-\[state=closed\]:hidden[^>]*data-state="closed"/);
  });
});

describe("header links are in the server HTML", () => {
  it("carries the service, resource and calculator links on every page, hidden until opened", async () => {
    const { SiteHeader } = await import("@/components/layout/SiteHeader");
    const { buildPrimaryNav } = await import("@/lib/nav");
    const nav = buildPrimaryNav();
    const Header = SiteHeader as unknown as ComponentType<{ nav: NavItem[] }>;
    const html = renderToStaticMarkup(createElement(Header, { nav }));
    const hrefs = Array.from(html.matchAll(/href="([^"]+)"/g)).map((m) => m[1]);
    for (const must of [
      "/services/property-accountant",
      "/services/landlord-accountant",
      "/services/property-tax-advice",
      "/services/non-resident-landlord",
      "/landlord-tax",
      "/calculators",
    ]) {
      expect(hrefs, `missing ${must}`).toContain(must);
    }
    // Desktop panels and the drawer are present but hidden while closed.
    expect(html).toMatch(/aria-haspopup="true"/);
    expect((html.match(/ hidden=""/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect(html).toMatch(/role="dialog"[^>]*hidden=""/);
    expect(html).toMatch(/role="dialog"[^>]*inert=""/);
  });
});
