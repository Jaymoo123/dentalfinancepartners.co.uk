import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

/* W7B / R2 B1 + B2 guard. The capture layer's exclusion rules are DOM-time
 * behaviour and this suite runs in the `node` environment with no DOM and no
 * testing-library (vitest.config.ts), so these assert the rules at their source
 * the way focus-ring.test.ts asserts rings: each rule has exactly one line that
 * implements it, and that line is pinned here, so deleting it fails the suite.
 * The manager's own check is the build walk at 390 and 1440 (W7B_RECEIPT.md). */
const SRC = join(__dirname, "..");
const read = (p: string) => readFileSync(join(SRC, p), "utf8");

const sticky = read("components/ui/StickyCTA.tsx");
const modal = read("components/intent/DeepScrollModal.tsx");
const layout = read("app/layout.tsx");

describe("one capture surface publishes an offer at a time", () => {
  it("guards the guard: the three files were actually read", () => {
    expect(sticky.length).toBeGreaterThan(2000);
    expect(modal.length).toBeGreaterThan(2000);
    expect(layout.length).toBeGreaterThan(2000);
  });

  it("the modal flags <html data-surface-open> while it is open, and clears it", () => {
    expect(modal).toContain('document.documentElement.setAttribute("data-surface-open", "1")');
    expect(modal).toContain('document.documentElement.removeAttribute("data-surface-open")');
  });

  it("that flag hides the sticky bar and the widget mount", () => {
    expect(layout).toContain("html[data-surface-open] .capture-sticky");
    expect(layout).toContain("html[data-surface-open] .capture-widget");
    expect(layout).toContain("display: none !important");
    // the two hooks the rule needs
    expect(sticky).toContain("capture-sticky fixed bottom-0");
    expect(layout).toContain('className="capture-widget print:hidden"');
  });

  /* W7C / V2 blocker B1. The gate tests the widget panel's OPEN state, not the
   * dialog's PRESENCE, and it retries instead of giving up: the kit auto-opens
   * its panel on every desktop pageview >= 768, which made the old presence
   * check permanently true and the deep-scroll offer dead on desktop. */
  it("the modal never opens over an open widget panel", () => {
    expect(modal).toContain("if (widgetPanelOpen()) {");
    expect(modal).toContain("function widgetPanelOpen(): boolean {");
  });

  it("the open-state signal is aria-expanded first, mount-AND-paint second", () => {
    // `aria-expanded` the moment the kit grows one (handoff, W7C_RECEIPT.md s2)
    expect(modal).toContain('document.querySelector(".capture-widget button[aria-expanded]")');
    expect(modal).toContain('launcher.getAttribute("aria-expanded") === "true"');
    // until then: the panel is mounted ONLY while open, and must be painting
    expect(modal).toContain("const panel = document.querySelector('.capture-widget [role=\"dialog\"]');");
    expect(modal).toContain("return !!panel && panel.getClientRects().length > 0;");
  });

  it("REGRESSION PIN: the old bare presence check must not come back", () => {
    // W7B's gate. It is true for the kit's own auto-open, so as a one-shot
    // `return` it killed the offer for the whole page load (V2 B1).
    expect(modal).not.toContain("if (document.querySelector('.capture-widget [role=\"dialog\"]')) return;");
  });

  it("a closed panel re-arms the gate, so one auto-open does not kill the offer", () => {
    expect(modal).toContain("new MutationObserver(() => {");
    expect(modal).toContain("if (!widgetPanelOpen()) setPanelClosed((n) => n + 1);");
    expect(modal).toContain('attributeFilter: ["aria-expanded"],');
    expect(modal).toContain("return () => obs.disconnect();");
    // and the retry is actually wired into the open effect's deps
    expect(modal).toContain("}, [action, open, panelClosed]);");
  });

  it("the sticky bar and the returning bar never both show", () => {
    expect(sticky).toContain('const returning = useIntent("returning_bar")');
    expect(sticky).toContain("if (dismissed || bare || returning) return null;");
  });

  it("one modal per page-load session survives", () => {
    expect(modal).toContain("let shownThisSession = false;");
    expect(modal).toContain("if (!action || open || shownThisSession) return;");
  });

  it("the modal keeps its focus trap and returns focus to the pre-open element", () => {
    expect(modal).toContain('aria-modal="true"');
    expect(modal).toContain('if (e.key === "Escape")');
    // captured in the OPEN effect, before the panel renders and takes focus
    const openEffect = modal.slice(
      modal.indexOf("if (!action || open || shownThisSession) return;"),
      modal.indexOf("setOpen(true);"),
    );
    expect(openEffect).toContain("returnFocusRef.current =");
    expect(modal).toContain("returnFocusRef.current?.focus?.()");
  });
});

describe("the sticky bar cannot grow past the pre-wave bar height at 390", () => {
  it("the personalised offer is gated on >=640 as well as on scroll", () => {
    expect(sticky).toContain('window.matchMedia("(min-width: 640px)")');
    expect(sticky).toContain("const offer = wide && visible && action && !isConverted() ? action.offer : null;");
  });

  it("the heading is clamped to a single line", () => {
    expect(sticky).toContain("line-clamp-1");
  });

  it("the text column still cannot collapse", () => {
    expect(sticky).toContain("min-w-0 flex-1");
  });
});

describe("no-JS visitors get finished marks, not ghosts", () => {
  it("the noscript block releases the story numerals and their rules", () => {
    expect(layout).toContain('[data-draw="off"] .story-numeral { color: var(--color-primary-700) !important; }');
    expect(layout).toContain('[data-draw="off"] .story-numeral-rule { transform: none !important; }');
  });
});
