/**
 * Result-gate DEFAULT verifier (read-mostly, NON-POLLUTING).
 *
 * The result_gate_capture experiment was CONCLUDED to treatment 2026-06-30: the
 * gate is now the default for EVERY in-blog non-converted visitor (no A/B split).
 * This probe confirms the conclusion shipped correctly on a live in-blog calculator.
 *
 * The PRIMARY discriminator is check 2: ?ab=result_gate_capture:control must be
 * INERT now (pre-conclusion that override forced the ungated control arm; post-
 * conclusion PremiumCalculator makes no useExperiment call, so the override does
 * nothing and the gate still renders). Checks 1 + 3 verify the per-visitor surface.
 *
 * Detection is scoped to the calculator's OWN elements, never the whole document,
 * because every blog post also renders a bottom enquiry <LeadForm> (name+email)
 * and an auto-opening assistant dialog — both would confound a page-wide scan:
 *   - the inline calc capture is CalcResultCta's MiniCapture (formId "calc_result")
 *     => a heading with id "calc_result-heading", unique to the calculator;
 *   - the gate's capture is the ResultGateModal MiniCapture (formId
 *     "calc_result_gate") => id "calc_result_gate-heading", scoped to that dialog;
 *   - the "See your result" button text is unique to the gate.
 *
 *   1. default visitor (fresh, not converted): the gate renders (See your result),
 *      the inline calc form (#calc_result) is ABSENT, and clicking the gate mounts
 *      the modal capture (#calc_result_gate).
 *   2. ?ab=result_gate_capture:control is INERT — the gate still renders.
 *   3. a converted visitor (ptp_converted=1) is NEVER gated: no gate button, and
 *      the inline calc form (#calc_result) is present (instant result + capture).
 *
 * Non-pollution: pre-seeds the visitor id with the reserved `synthetic_` prefix,
 * so every event this probe emits is flagged is_bot server-side (createTrackHandler)
 * and excluded from all human-only rollups. The calculator is desktop-only
 * (hidden sm:block), so the probe uses a desktop viewport.
 *
 * Usage:  node scripts/property_result_gate_probe.mjs [blogCalculatorUrl]
 * Exit 0 = conclusion shipped correctly, 1 = a FAIL.
 */
import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const URL =
  process.argv[2] ||
  "https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/bed-and-breakfasting";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-first-run", "--no-sandbox"],
});

const out = {};
let ok = true;
function failMsg(m) {
  ok = false;
  console.log(`[FAIL] ${m}`);
}

/**
 * Load the URL as a fresh synthetic (non-polluting) visitor and report what the
 * CALCULATOR rendered (scoped to its own elements). `converted` seeds the
 * ptp_converted flag so the gate is bypassed.
 */
async function inspect(label, { suffix = "", converted = false } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 }); // desktop: calc hidden on mobile
  const vid = `synthetic_${label}_${Date.now()}`;
  await page.evaluateOnNewDocument(
    (v, conv) => {
      try {
        localStorage.setItem("ptp_vid", v);
        if (conv) localStorage.setItem("ptp_converted", "1");
      } catch {
        /* storage blocked */
      }
    },
    vid,
    converted,
  );

  await page.goto(`${URL}${suffix}`, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4500)); // let the ssr:false calculator hydrate
  // scroll the calculator into view so a non-gated visitor's below-result inline
  // form renders (and any in-view effects fire); harmless for the gate.
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 1500));

  const probe = await page.evaluate(() => {
    // Calculator-specific signals ONLY (see file header for why whole-document
    // scans are invalid here).
    const seeResultButton = Array.from(document.querySelectorAll("button, a")).some(
      (e) => /see your result/i.test(e.textContent || ""),
    );
    // CalcResultCta's MiniCapture: formId "calc_result" -> heading id below. This
    // is the inline below-result capture, rendered ONLY for non-gated readers.
    const inlineCalcForm = !!document.getElementById("calc_result-heading");
    return {
      seeResultButton,
      inlineCalcForm,
      // The calc mounted if either of its own capture surfaces is present (gated
      // readers get the gate button; non-gated readers get the inline form).
      calcRendered: seeResultButton || inlineCalcForm,
    };
  });

  let gateModal = null;
  if (probe.seeResultButton) {
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll("button, a")).find((e) =>
        /see your result/i.test(e.textContent || ""),
      );
      if (b) b.click();
    });
    await new Promise((r) => setTimeout(r, 1500));
    gateModal = await page.evaluate(() => {
      // Scope strictly to the gate's own dialog so the assistant dialog / bottom
      // enquiry form cannot mask a dead gate capture.
      const heading = document.getElementById("calc_result_gate-heading");
      const scope = heading ? heading.closest('[role="dialog"]') || heading.parentElement : null;
      const hasField = (re) =>
        scope
          ? Array.from(scope.querySelectorAll("input")).some((i) =>
              re.test(`${i.name} ${i.type} ${i.placeholder}`),
            )
          : false;
      // The result-gate message field carries a fuller-detail placeholder (change
      // 2026-06-30): capture it so the suite confirms that copy shipped.
      const ta = scope ? scope.querySelector("textarea") : null;
      return {
        mounted: !!heading,
        hasEmail: hasField(/email/i),
        hasName: hasField(/name|full/i),
        messagePlaceholder: ta ? ta.getAttribute("placeholder") || "" : "",
      };
    });
  }

  out[label] = { vid, ...probe, gateModal };
  await page.close();
  return out[label];
}

try {
  // 1. Default visitor — must be gated, with NO inline calc form, and a working modal.
  const def = await inspect("default");
  if (!def.calcRendered) failMsg("default: calculator did not render (no gate button and no inline calc capture)");
  if (!def.seeResultButton) failMsg("default: 'See your result' gate missing — conclusion did not ship (everyone in-blog should be gated)");
  if (def.inlineCalcForm) failMsg("default: inline below-result calc capture (#calc_result) is present — it must be removed for gated readers");
  if (def.seeResultButton && !(def.gateModal && def.gateModal.mounted && (def.gateModal.hasEmail || def.gateModal.hasName)))
    failMsg("default: gate clicked but the modal capture (#calc_result_gate) did not mount — capture is dead for gated users");
  if (def.gateModal && def.gateModal.mounted && !/detail|as much/i.test(def.gateModal.messagePlaceholder || ""))
    failMsg("default: result-gate message placeholder is not the fuller-detail copy — the 2026-06-30 message-prompt change may not have shipped");

  // 2. ?ab=result_gate_capture:control — PRIMARY discriminator: the override must be INERT now.
  const ctrl = await inspect("ab_control_override", { suffix: "?ab=result_gate_capture:control" });
  if (!ctrl.seeResultButton)
    failMsg("ab override: ?ab=result_gate_capture:control switched the gate OFF — the experiment is not fully concluded (still arm-switchable)");

  // 3. Converted visitor — must be bypassed: no gate, inline calc form present.
  const conv = await inspect("converted", { converted: true });
  if (!conv.calcRendered) failMsg("converted: calculator did not render");
  if (conv.seeResultButton) failMsg("converted: a gate rendered for a converted visitor — converted visitors must never be gated");
  if (!conv.inlineCalcForm) failMsg("converted: inline calc capture (#calc_result) missing — a converted visitor should get the result + inline form");

  console.log(JSON.stringify(out, null, 1));
  console.log(
    ok
      ? "\nPASS: gate is the default for all in-blog visitors; ?ab override inert; converted visitors bypass it."
      : "\nFAIL: see above.",
  );
} finally {
  await browser.close();
}
process.exit(ok ? 0 : 1);
