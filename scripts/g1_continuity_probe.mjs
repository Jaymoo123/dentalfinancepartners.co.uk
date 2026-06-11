/**
 * G1 live continuity probe: seed a golden visitor id into the LIVE site's
 * storage, browse a calculator page, and read the experiment assignments the
 * page computed (via the analytics module's active-experiment state attached
 * to outgoing beacons). Golden expectation for v_tester_00001:
 * calc_result_capture=treatment (per the pinned suite).
 */
import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
try {
  const page = await browser.newPage();
  const beacons = [];
  page.on("request", (req) => {
    if (req.url().includes("/api/track") && req.method() === "POST") {
      try { beacons.push(JSON.parse(req.postData() || "{}")); } catch {}
    }
  });
  // Seed the golden visitor id BEFORE any site script runs.
  await page.evaluateOnNewDocument(() => {
    try { window.localStorage.setItem("ptp_vid", "v_tester_00001"); } catch {}
  });
  await page.goto("https://www.propertytaxpartners.co.uk/calculators/capital-gains-tax-calculator", { waitUntil: "networkidle2", timeout: 60000 });
  await page.mouse.move(300, 400);
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 7000));
  const flat = beacons.flatMap((b) => b.events || []);
  const tagged = flat.filter((e) => e.experiments || e.props?.experiments || e.exp);
  const sample = tagged[0] || flat[0] || null;
  console.log(JSON.stringify({
    beacons: beacons.length,
    events: flat.length,
    visitorEcho: beacons[0]?.visitor_id || null,
    taggedEvents: tagged.length,
    sampleExperiments: sample?.experiments ?? sample?.props?.experiments ?? sample?.exp ?? null,
  }, null, 1));
} finally { await browser.close(); }
