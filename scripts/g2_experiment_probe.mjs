/**
 * G2 live probe: force each arm of calc_promo_inline via the ?ab override on a
 * live generalist blog post; verify the card renders ONLY for treatment, scroll
 * to fire exposure, and report the visitor id for store-side verification.
 */
import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const POST = process.argv[2];
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
const out = {};
try {
  for (const arm of ["treatment", "control"]) {
    const page = await browser.newPage();
    await page.goto(`${POST}?ab=calc_promo_inline:${arm}`, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
    await new Promise((r) => setTimeout(r, 6000));
    const cardVisible = await page.evaluate(() =>
      Array.from(document.querySelectorAll("aside,div")).some((e) =>
        (e.textContent || "").includes("Check your numbers in 60 seconds") && e.offsetHeight > 0));
    const vid = await page.evaluate(() => window.localStorage.getItem("hd_vid"));
    out[arm] = { cardVisible, vid };
    await page.close();
  }
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
