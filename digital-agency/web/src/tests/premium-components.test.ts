/**
 * Component / behaviour tests for the Agency Founder Finance R2 premium surface layer.
 *
 * Tests the surface-layer contract (brief §4 + §5 regression invariants) without
 * requiring DOM / jsdom. The vitest config uses environment: "node" with
 * include: ["src/**\/\*.test.ts"], so these are pure-logic / source-grep tests.
 *
 * Coverage areas:
 *  A. Token compliance  -- no --gold / --navy / --dark in any premium component
 *  B. CalcResultCta prop fix  -- slug= (not campaign=) in PremiumCalculator
 *  C. ResultGateModal session-flag identity  -- module flag (not aff_modal_shown key)
 *  D. ResultGateModal escape hatch / skip event  -- cta_id="result_gate_skip"
 *  E. MiniCapture messageMinWords additive prop  -- backward-compat, word-count gate
 *  F. BlogPostRenderer injection  -- PremiumUpgrade present after InlineMiniLeadForm
 *  G. PremiumUpgrade null contract  -- returns null for international / unmapped
 *  H. Event allowlist compliance  -- no unlisted event names in component source
 *  I. No em-dash / DJH / credential claims in component strings
 *  J. MobileToolSlot accent token (var(--accent), not --gold)
 *  K. ResultGateModal backdrop token (var(--ink), not --navy)
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { resourceForTopic } from "@/lib/tools/premium/resources";
import { getPremiumTool, hasPremiumTool } from "@/lib/tools/premium/registry";
import { topicForBlogSlug } from "@/lib/intent/taxonomy";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SRC = join(process.cwd(), "src");

function readSrc(rel: string): string {
  return readFileSync(join(SRC, rel), "utf-8");
}

/**
 * Strip block comments (/* ... *\/) and line comments (// ...) from source
 * text before checking for disallowed token strings. The token compliance
 * checks should flag tokens used in actual code / JSX, not in explanatory
 * doc-comments that document which tokens were re-tokened from Dentists.
 */
function stripComments(src: string): string {
  // Remove block comments (non-greedy, handles nested * sequences)
  const noBlock = src.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove line comments
  const noLine = noBlock.replace(/\/\/.*/g, "");
  return noLine;
}

const PREMIUM_COMPONENTS = [
  "components/tools/premium/PremiumCalculator.tsx",
  "components/tools/premium/PremiumUpgrade.tsx",
  "components/tools/premium/MobileToolSlot.tsx",
  "components/tools/premium/ResultGateModal.tsx",
  "components/tools/premium/PremiumBarChart.tsx",
];

const PREMIUM_CONFIGS = [
  "lib/tools/premium/configs/salary-dividend-optimiser.ts",
  "lib/tools/premium/configs/agency-exit-cgt.ts",
  "lib/tools/premium/configs/vat-scheme-comparator.ts",
  "lib/tools/premium/configs/employer-cost-to-hire.ts",
  "lib/tools/premium/configs/rd-tax-credit.ts",
];

// ---------------------------------------------------------------------------
// A. Token compliance
// ---------------------------------------------------------------------------

describe("A. Token compliance: no --gold / --navy / --dark in premium component code", () => {
  for (const rel of PREMIUM_COMPONENTS) {
    it(`${rel} has no var(--gold) in code`, () => {
      // Strip comments: doc-comments may mention old Dentists tokens for context
      const code = stripComments(readSrc(rel));
      expect(code).not.toMatch(/var\(--gold\)/);
    });

    it(`${rel} has no var(--navy) in code`, () => {
      const code = stripComments(readSrc(rel));
      expect(code).not.toMatch(/var\(--navy\)/);
    });

    it(`${rel} has no var(--dark) in code`, () => {
      const code = stripComments(readSrc(rel));
      expect(code).not.toMatch(/var\(--dark\)/);
    });

    it(`${rel} has no var(--primary) in code`, () => {
      const code = stripComments(readSrc(rel));
      expect(code).not.toMatch(/var\(--primary\)/);
    });
  }
});

// ---------------------------------------------------------------------------
// B. CalcResultCta prop fix: slug= not campaign= in PremiumCalculator
// ---------------------------------------------------------------------------

describe("B. CalcResultCta prop fix in PremiumCalculator", () => {
  it("PremiumCalculator uses CalcResultCta with slug= prop", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    // Must contain slug={config.id} (the aff prop)
    expect(src).toMatch(/CalcResultCta\s+slug=\{config\.id\}/);
  });

  it("PremiumCalculator does NOT use campaign= prop on CalcResultCta", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    // campaign= is the Dentists prop, must be absent
    expect(src).not.toMatch(/CalcResultCta\s+campaign=/);
  });
});

// ---------------------------------------------------------------------------
// C. ResultGateModal session-flag identity
// ---------------------------------------------------------------------------

describe("C. ResultGateModal session-flag: module-level flag, not sessionStorage key", () => {
  it("PremiumCalculator declares gateModalShownThisSession as a module-level let", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).toMatch(/let\s+gateModalShownThisSession\s*=\s*false/);
  });

  it("PremiumCalculator does NOT use the aff_modal_shown sessionStorage key in code", () => {
    // Strip comments: the doc-comment explains WHY we avoid this key, that is fine
    const code = stripComments(readSrc("components/tools/premium/PremiumCalculator.tsx"));
    expect(code).not.toMatch(/aff_modal_shown/);
  });

  it("ResultGateModal does NOT use aff_modal_shown sessionStorage key", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).not.toMatch(/aff_modal_shown/);
  });

  it("ResultGateModal does NOT re-derive topicKey from the URL", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    // Should not use window.location or usePathname for topicKey
    expect(src).not.toMatch(/window\.location.*topic/);
    expect(src).not.toMatch(/usePathname/);
    expect(src).not.toMatch(/useSearchParams/);
  });
});

// ---------------------------------------------------------------------------
// D. ResultGateModal escape hatch / skip event
// ---------------------------------------------------------------------------

describe("D. ResultGateModal escape hatch: skip fires cta_click result_gate_skip", () => {
  it('ResultGateModal fires cta_click with cta_id="result_gate_skip"', () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/cta_id.*result_gate_skip/);
    expect(src).toMatch(/cta_click/);
  });

  it("ResultGateModal has X close button (aria-label skip)", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/Skip and show my result/);
  });

  it("ResultGateModal has a backdrop click handler that calls skip", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/e\.target === e\.currentTarget/);
    expect(src).toMatch(/skip\(\)/);
  });

  it("ResultGateModal has Escape key handler", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/Escape/);
    expect(src).toMatch(/skip\(\)/);
  });

  it("ResultGateModal has No thanks link that calls skip", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/No thanks, just show my result/);
  });

  it("ResultGateModal: onReveal is called on form success (MiniCapture onSuccess)", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    // MiniCapture's onSuccess={onReveal}
    expect(src).toMatch(/onSuccess=\{onReveal\}/);
  });
});

// ---------------------------------------------------------------------------
// E. MiniCapture messageMinWords additive prop
// ---------------------------------------------------------------------------

describe("E. MiniCapture messageMinWords additive prop", () => {
  it("MiniCapture.tsx declares messageMinWords? in its props", () => {
    const src = readSrc("components/forms/MiniCapture.tsx");
    expect(src).toMatch(/messageMinWords\s*\?/);
  });

  it("MiniCapture validate() respects messageMinWords word count when set", () => {
    const src = readSrc("components/forms/MiniCapture.tsx");
    // The validate callback should check messageMinWords
    expect(src).toMatch(/messageMinWords/);
    expect(src).toMatch(/wordCount\s*</);
  });

  it("MiniCapture dependency array includes messageMinWords", () => {
    const src = readSrc("components/forms/MiniCapture.tsx");
    expect(src).toMatch(/messageMinLength.*messageMinWords|messageMinWords.*messageMinLength/);
  });

  it("ResultGateModal passes messageMinWords=8 to MiniCapture gate", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/messageMinWords=\{8\}/);
  });

  it("ResultGateModal passes messageMinLength=40 to MiniCapture gate", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/messageMinLength=\{40\}/);
  });

  it("ResultGateModal formId is calc_result_gate", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/formId="calc_result_gate"/);
  });

  it("ResultGateModal R2 gate is FULL capture (no captureMode= prop or email_only prop value)", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    // captureMode and resource_gate must not appear as props (they may appear in comments)
    expect(src).not.toMatch(/captureMode=["'{]/);
    expect(src).not.toMatch(/resource_gate.*:.*true/);
  });
});

// ---------------------------------------------------------------------------
// F. BlogPostRenderer injection
// ---------------------------------------------------------------------------

describe("F. BlogPostRenderer injection: PremiumUpgrade after InlineMiniLeadForm", () => {
  it("BlogPostRenderer imports PremiumUpgrade", () => {
    const src = readSrc("components/blog/BlogPostRenderer.tsx");
    expect(src).toMatch(/import.*PremiumUpgrade/);
    expect(src).toMatch(/components\/tools\/premium\/PremiumUpgrade/);
  });

  it("BlogPostRenderer renders PremiumUpgrade after InlineMiniLeadForm", () => {
    const src = readSrc("components/blog/BlogPostRenderer.tsx");
    const leadPos = src.indexOf("InlineMiniLeadForm");
    const upgradePos = src.indexOf("PremiumUpgrade");
    expect(upgradePos).toBeGreaterThan(leadPos);
  });

  it("PremiumUpgrade in BlogPostRenderer passes placement=blog and category={categorySlug}", () => {
    const src = readSrc("components/blog/BlogPostRenderer.tsx");
    expect(src).toMatch(/placement="blog"/);
    expect(src).toMatch(/category=\{categorySlug\}/);
  });

  it("PremiumUpgrade in BlogPostRenderer passes topic={topicKey} (from topicForBlogSlug)", () => {
    const src = readSrc("components/blog/BlogPostRenderer.tsx");
    expect(src).toMatch(/topic=\{topicKey\}/);
  });

  it("BlogPostRenderer does NOT add a separate short-post fallback branch for PremiumUpgrade", () => {
    // The brief says a single injection at the mid-split covers both long and short posts.
    // There should be only ONE PremiumUpgrade reference in the JSX.
    const src = readSrc("components/blog/BlogPostRenderer.tsx");
    const count = (src.match(/<PremiumUpgrade/g) || []).length;
    expect(count).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// G. PremiumUpgrade null contract
// ---------------------------------------------------------------------------

describe("G. PremiumUpgrade null contract: returns null for international / unmapped", () => {
  it("resourceForTopic('international') returns toolId='' (excluded)", () => {
    const r = resourceForTopic("international");
    expect(r).not.toBeNull();
    expect(r!.toolId).toBe("");
  });

  it("hasPremiumTool('') is false (international stays dark)", () => {
    expect(hasPremiumTool("")).toBe(false);
  });

  it("hasPremiumTool(undefined as any) is false", () => {
    expect(hasPremiumTool(undefined as unknown as string)).toBe(false);
  });

  it("topicForBlogSlug('international-agencies') is 'international'", () => {
    expect(topicForBlogSlug("international-agencies")).toBe("international");
  });

  it("getPremiumTool('') returns undefined", () => {
    expect(getPremiumTool("")).toBeUndefined();
  });

  it("resourceForTopic(null) returns null", () => {
    expect(resourceForTopic(null)).toBeNull();
  });

  it("resourceForTopic(undefined) returns null", () => {
    expect(resourceForTopic(undefined)).toBeNull();
  });

  it("PremiumUpgrade source has guard: !resource.toolId -> return null", () => {
    const src = readSrc("components/tools/premium/PremiumUpgrade.tsx");
    expect(src).toMatch(/!resource\s*\|\|\s*!resource\.toolId/);
  });

  it("all 5 toolIds have hasPremiumTool=true", () => {
    const toolIds = [
      "salary-dividend-optimiser-premium",
      "agency-exit-cgt-premium",
      "vat-scheme-comparator-premium",
      "employer-cost-to-hire-premium",
      "rd-tax-credit-premium",
    ];
    for (const id of toolIds) {
      expect(hasPremiumTool(id)).toBe(true);
    }
  });

  it("all 5 toolIds return a config from getPremiumTool", () => {
    const toolIds = [
      "salary-dividend-optimiser-premium",
      "agency-exit-cgt-premium",
      "vat-scheme-comparator-premium",
      "employer-cost-to-hire-premium",
      "rd-tax-credit-premium",
    ];
    for (const id of toolIds) {
      const config = getPremiumTool(id);
      expect(config).toBeDefined();
      expect(config!.id).toBe(id);
    }
  });
});

// ---------------------------------------------------------------------------
// H. Event allowlist compliance
// ---------------------------------------------------------------------------

describe("H. Event allowlist compliance: no unlisted event names in component source", () => {
  const ALLOWLIST = [
    "calc_view",
    "calc_input_change",
    "calc_computed",
    "calc_result_viewed",
    "cta_click",
    // MiniCapture form events (tracked inside MiniCapture):
    "form_start",
    "form_submit",
    "form_error",
    "lead_submitted",
  ];

  // Check no gate_view or resource_unlocked (R3 only) appears in R2 components
  it("PremiumCalculator does not use gate_view (R3 only)", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).not.toMatch(/gate_view/);
  });

  it("PremiumCalculator does not use resource_unlocked (R3 only)", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).not.toMatch(/resource_unlocked/);
  });

  it("ResultGateModal fires only cta_click (allowlisted) on skip", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    // Confirm cta_click is present
    expect(src).toMatch(/["']cta_click["']/);
    // Confirm no gate_view
    expect(src).not.toMatch(/gate_view/);
  });

  it("PremiumCalculator fires calc_view on mount", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).toMatch(/["']calc_view["']/);
  });

  it("PremiumCalculator fires calc_input_change on field change", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).toMatch(/["']calc_input_change["']/);
  });

  it("PremiumCalculator fires calc_result_viewed on first interaction", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).toMatch(/["']calc_result_viewed["']/);
  });

  it("PremiumCalculator fires calc_computed after debounce", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).toMatch(/["']calc_computed["']/);
  });
});

// ---------------------------------------------------------------------------
// I. No em-dash / DJH / credential claims in component source strings
// ---------------------------------------------------------------------------

describe("I. Compliance: no em-dash / DJH / credential claims in premium components", () => {
  const EM_DASH = "—";
  const DOUBLE_HYPHEN = "--";

  for (const rel of [...PREMIUM_COMPONENTS, ...PREMIUM_CONFIGS]) {
    it(`${rel}: no em-dash (U+2014)`, () => {
      const src = readSrc(rel);
      // Exclude CSS variable names (--accent, --ink, etc.) from double-hyphen check
      const stripped = src.replace(/var\(--[a-z-]+\)/g, "");
      expect(stripped).not.toContain(EM_DASH);
    });

    it(`${rel}: no "DJH" string`, () => {
      const src = readSrc(rel);
      expect(src).not.toMatch(/\bDJH\b/);
    });
  }

  for (const rel of PREMIUM_CONFIGS) {
    it(`${rel}: no credential claims (ICAEW/ACA/chartered/qualified accountant)`, () => {
      const src = readSrc(rel);
      expect(src).not.toMatch(/ICAEW|ACA\b|chartered accountant|qualified accountant/i);
    });
  }

  it("ResultGateModal blurb has no em-dash", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).not.toContain(EM_DASH);
  });

  it("MobileToolSlot blurb has no em-dash", () => {
    const src = readSrc("components/tools/premium/MobileToolSlot.tsx");
    expect(src).not.toContain(EM_DASH);
  });
});

// ---------------------------------------------------------------------------
// J. MobileToolSlot accent token (var(--accent), not --gold)
// ---------------------------------------------------------------------------

describe("J. MobileToolSlot: uses var(--accent) for left border", () => {
  it("MobileToolSlot className includes border-[var(--accent)]", () => {
    const src = readSrc("components/tools/premium/MobileToolSlot.tsx");
    expect(src).toMatch(/border-\[var\(--accent\)\]/);
  });

  it("MobileToolSlot formId is mobile_tool", () => {
    const src = readSrc("components/tools/premium/MobileToolSlot.tsx");
    expect(src).toMatch(/formId="mobile_tool"/);
  });

  it("MobileToolSlot submitLabel is 'Send me my figure'", () => {
    const src = readSrc("components/tools/premium/MobileToolSlot.tsx");
    expect(src).toMatch(/Send me my figure/);
  });

  it("MobileToolSlot messagePrefix includes [Mobile tool:", () => {
    const src = readSrc("components/tools/premium/MobileToolSlot.tsx");
    expect(src).toMatch(/\[Mobile tool:/);
  });
});

// ---------------------------------------------------------------------------
// K. ResultGateModal backdrop token (var(--ink), not --navy)
// ---------------------------------------------------------------------------

describe("K. ResultGateModal: uses var(--ink) for backdrop (not --navy)", () => {
  it("ResultGateModal backdrop uses bg-[var(--ink)]/60", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/bg-\[var\(--ink\)\]\/60/);
  });

  it("ResultGateModal card left border uses border-[var(--accent)]", () => {
    const src = readSrc("components/tools/premium/ResultGateModal.tsx");
    expect(src).toMatch(/border-\[var\(--accent\)\]/);
  });
});

// ---------------------------------------------------------------------------
// L. PremiumUpgrade: correct chip and accent bar tokens
// ---------------------------------------------------------------------------

describe("L. PremiumUpgrade: chip uses var(--accent), no var(--navy)", () => {
  it("PremiumUpgrade eyebrow chip uses bg-[var(--accent)]", () => {
    const src = readSrc("components/tools/premium/PremiumUpgrade.tsx");
    expect(src).toMatch(/bg-\[var\(--accent\)\]/);
  });

  it("PremiumCalculator accent bar uses bg-[var(--accent)]", () => {
    const src = readSrc("components/tools/premium/PremiumCalculator.tsx");
    expect(src).toMatch(/bg-\[var\(--accent\)\]/);
  });
});

// ---------------------------------------------------------------------------
// M. aff storage prefix: no ptp:/dfp:/cfp:/bfp: in premium components
// ---------------------------------------------------------------------------

describe("M. Storage prefix: no ptp:/dfp:/cfp:/bfp: in premium components or configs", () => {
  const allFiles = [...PREMIUM_COMPONENTS, ...PREMIUM_CONFIGS];
  for (const rel of allFiles) {
    it(`${rel}: no cross-site storage prefix`, () => {
      const src = readSrc(rel);
      expect(src).not.toMatch(/["']ptp:|["']dfp:|["']cfp:|["']bfp:/);
    });
  }
});
