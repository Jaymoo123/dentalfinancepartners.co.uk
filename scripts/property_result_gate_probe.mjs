/**
 * result_gate_capture two-arm live probe (read-mostly, NON-POLLUTING).
 *
 * Forces each arm via the ?ab override on a live in-blog calculator and confirms
 * the experiment is not silently broken:
 *   - treatment: the "See your result" gate renders, and clicking it mounts the
 *     interstitial capture form (the ONLY capture on this surface for treatment,
 *     since the inline form is removed — so a broken modal = zero capture);
 *   - control: the inline capture CTA renders.
 *
 * Non-pollution: pre-seeds the visitor id with the reserved `synthetic_` prefix,
 * so every event this probe emits is flagged is_bot server-side (createTrackHandler)
 * and excluded from vw_experiment_results and all human-only rollups. It therefore
 * cannot skew the live experiment. The calculator is desktop-only (hidden sm:block),
 * so the probe uses a desktop viewport.
 *
 * Usage:  node scripts/property_result_gate_probe.mjs [blogCalculatorUrl]
 * Exit 0 = both arms healthy, 1 = a FAIL (treatment likely broken).
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

try {
  for (const arm of ["treatment", "control"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 }); // desktop: calc is hidden on mobile
    const vid = `synthetic_${arm}_${Date.now()}`;
    // seed the reserved synthetic_ visitor id BEFORE any page script runs, so the
    // analytics this probe generates is flagged is_bot and excluded from metrics.
    await page.evaluateOnNewDocument((v) => {
      try {
        localStorage.setItem("ptp_vid", v);
      } catch {
        /* storage blocked */
      }
    }, vid);

    await page.goto(`${URL}?ab=result_gate_capture:${arm}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 4500)); // let the ssr:false calculator hydrate
    // scroll the calculator into view so the control arm's below-result inline form
    // renders (and exposure fires); harmless for treatment.
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await new Promise((r) => setTimeout(r, 1500));

    const probe = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll("input"));
      const txt = document.body.innerText || "";
      const find = (re) =>
        Array.from(document.querySelectorAll("button, a")).some((e) => re.test(e.textContent || ""));
      const has = (re) => inputs.some((i) => re.test(`${i.name} ${i.type} ${i.placeholder}`));
      const inDialog = document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0');
      return {
        hasCalc: inputs.length > 3 || /Advanced options|specialist|result/i.test(txt),
        gateButton: find(/see your result/i),
        // inline capture form present on the page (not behind a modal) — the control surface
        inlineCaptureForm: !inDialog && has(/email/i) && has(/name|full/i),
      };
    });

    let modal = null;
    if (arm === "treatment" && probe.gateButton) {
      await page.evaluate(() => {
        const b = Array.from(document.querySelectorAll("button, a")).find((e) =>
          /see your result/i.test(e.textContent || ""),
        );
        if (b) b.click();
      });
      await new Promise((r) => setTimeout(r, 1500));
      modal = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll("input"));
        const has = (re) => inputs.some((i) => re.test(`${i.name} ${i.type} ${i.placeholder}`));
        const dialog = document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0');
        return { dialogPresent: !!dialog, hasEmail: has(/email/i), hasName: has(/name|full/i) };
      });
    }

    out[arm] = { vid, ...probe, modal };
    await page.close();
  }

  const t = out.treatment;
  const c = out.control;
  if (!t.hasCalc) failMsg("treatment: calculator did not render");
  if (!t.gateButton) failMsg("treatment: 'See your result' gate button missing — treatment may be broken");
  if (t.gateButton && t.modal && !(t.modal.dialogPresent && (t.modal.hasEmail || t.modal.hasName)))
    failMsg("treatment: gate clicked but the modal capture form did not mount — capture is dead for treatment users");
  if (c.gateButton) failMsg("control: a gate button rendered on the control arm (arm assignment wrong?)");
  if (!c.hasCalc) failMsg("control: calculator did not render");
  if (!c.inlineCaptureForm) console.log("[warn] control: inline capture form (name+email) not detected — verify manually");

  console.log(JSON.stringify(out, null, 1));
  console.log(ok ? "\nPASS: both arms render; treatment gate + modal capture mount." : "\nFAIL: see above.");
} finally {
  await browser.close();
}
process.exit(ok ? 0 : 1);
