/**
 * The help widget is the kit's (@accounting-network/web-shared/support); what
 * is this site's is `lib/intent/widget-config.ts`. This file guards that config
 * surface, because a missing entry there is the way the widget can silently
 * render wrong copy, an unbranded control or a broken link.
 *
 * Voice rules are enforced on the opener corpus in assistant-opener.test.ts;
 * the panel's own strings are checked here.
 */
import { describe, it, expect } from "vitest";
import {
  widgetConfig,
  ROUTE_RULES,
  SPECIALIST_WIDGET_FORM_ID,
} from "@/lib/intent/widget-config";
import { focusRing } from "@/components/ui/layout-utils";
import { TOPICS } from "@/lib/intent/taxonomy";

const EM_DASH = String.fromCharCode(0x2014);

describe("widget config identity", () => {
  it("keeps the estate's form id and data-cta", () => {
    expect(SPECIALIST_WIDGET_FORM_ID).toBe("specialist_widget");
    expect(widgetConfig.formId).toBe("specialist_widget");
    expect(widgetConfig.ctaId).toBe("specialist_widget");
  });

  it("uses this site's hfp storage prefix, matching AnalyticsProvider", () => {
    expect(widgetConfig.storagePrefix).toBe("hfp");
  });

  it("sends the same lead source as LeadForm", () => {
    expect(widgetConfig.leadSource).toBe("hospitality");
  });

  it("stays off /embed and /admin", () => {
    expect(widgetConfig.hiddenOnPaths).toEqual(["/embed", "/admin"]);
  });

  it("links at real routes", () => {
    expect(widgetConfig.calculatorHrefPrefix).toBe("/calculators/");
    expect(widgetConfig.contactHref).toBe("/contact");
    expect(widgetConfig.privacyHref).toBe("/privacy-policy");
  });
});

describe("widget config completeness", () => {
  it("every copy string is present and non-empty", () => {
    const entries = Object.entries(widgetConfig.copy);
    expect(entries.length).toBeGreaterThanOrEqual(20);
    for (const [k, v] of entries) {
      expect(typeof v, k).toBe("string");
      expect(v.trim().length, k).toBeGreaterThan(0);
    }
  });

  it("no copy string carries an em-dash", () => {
    const offenders = Object.entries(widgetConfig.copy).filter(([, v]) =>
      v.includes(EM_DASH),
    );
    expect(offenders.map(([k]) => k)).toEqual([]);
  });

  it("every class recipe is present and non-empty", () => {
    const entries = Object.entries(widgetConfig.classes);
    expect(entries.length).toBeGreaterThanOrEqual(25);
    for (const [k, v] of entries) {
      expect(typeof v, k).toBe("string");
      expect(v.trim().length, k).toBeGreaterThan(0);
    }
  });

  it("no class recipe hardcodes a hex value", () => {
    const offenders = Object.entries(widgetConfig.classes).filter(([, v]) =>
      /#[0-9a-f]{3,8}\b/i.test(v),
    );
    expect(offenders.map(([k]) => k)).toEqual([]);
  });

  /* The defect this site's focus-ring work exists to stop: a control painted
   * with the kit's `outline-primary-*` literal instead of this site's
   * --focus-ring token. src/tests/focus-ring.test.ts walks .tsx files, which do
   * not include the widget (it is the kit's), so the recipes are checked here. */
  it("every interactive recipe carries this site's focus ring, never a primary-* outline", () => {
    const interactive = [
      "closeButton",
      "chip",
      "primaryButton",
      "submitButton",
      "input",
      "privacyLink",
      "peekButton",
      "peekDismiss",
      "launcher",
    ] as const;
    for (const k of interactive) {
      const v = widgetConfig.classes[k];
      expect(v, k).toContain(focusRing);
      expect(v, k).not.toMatch(/focus-visible:outline-primary-/);
    }
  });

  it("buttons sit on this site's locked 600/700 steps, not the kit's 700/800", () => {
    for (const k of ["launcher", "primaryButton", "submitButton"] as const) {
      expect(widgetConfig.classes[k], k).toContain("bg-primary-600");
      expect(widgetConfig.classes[k], k).toContain("hover:bg-primary-700");
      expect(widgetConfig.classes[k], k).not.toContain("bg-primary-800");
    }
  });

  it("the header keeps the kit's primary-950 ground and the ground-dark ring rebind", () => {
    expect(widgetConfig.classes.header).toContain("bg-primary-950");
    expect(widgetConfig.classes.header).toContain("ground-dark");
  });

  it("the launcher sits at bottom-4, there being no sticky bar on this site", () => {
    expect(widgetConfig.classes.container).toContain("bottom-4");
    expect(widgetConfig.classes.container).toContain("print:hidden");
  });
});

describe("widget config wiring", () => {
  it("covers every route family the site has", () => {
    const segments = ROUTE_RULES.flatMap((r) => r.segments).sort();
    expect(segments).toEqual(
      ["blog", "calculators", "embed", "for", "research", "services"].sort(),
    );
  });

  it("getTopic resolves the site taxonomy", () => {
    for (const t of TOPICS) expect(widgetConfig.getTopic(t.key)?.key).toBe(t.key);
    expect(widgetConfig.getTopic(null)).toBeNull();
    expect(widgetConfig.getTopic("not-a-topic")).toBeNull();
  });

  it("the offer builders return live routes for every topic", () => {
    const { tool, review, specialist } = widgetConfig.engine.offers;
    for (const t of TOPICS) {
      const s = specialist(t.key);
      expect(s.href).toBe("/contact");
      expect(review(t.key)?.href).toBe("/contact");
      const tl = tool(t.key);
      if (t.primaryCalculator) expect(tl?.href).toBe(`/calculators/${t.primaryCalculator}`);
      else expect(tl).toBeNull();
    }
  });

  it("no offer copy carries an em-dash", () => {
    const { tool, review, specialist } = widgetConfig.engine.offers;
    const lines: string[] = [widgetConfig.engine.offers.returningReason];
    for (const t of TOPICS) {
      for (const o of [tool(t.key), review(t.key), specialist(t.key)]) {
        if (o) lines.push(o.title, o.blurb, o.reason);
      }
    }
    expect(lines.filter((l) => l.includes(EM_DASH))).toEqual([]);
  });

  it("ruleLabel is the site's human map", () => {
    expect(widgetConfig.ruleLabel("escalate_specialist")).toBe("Specialist escalation");
  });
});
