/**
 * TL-06 live check: drive a calculator page with a real browser engine and
 * report the visitor id so the store can be queried for calc_* events.
 * Usage: node scripts/tl06_calc_events.mjs [baseUrl] [calcPath] [prefix]
 */
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "http://localhost:3000";
const CALC = process.argv[3] || "/calculators/take-home-pay-calculator";
const PREFIX = process.argv[4] || "hd";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
try {
  const page = await browser.newPage();
  let beacons = 0;
  page.on("request", (r) => { if (r.url().includes("/api/track")) beacons++; });

  await page.goto(`${BASE}${CALC}`, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 1500));

  // Interact with the first numeric/text input the renderer produced.
  const input = await page.$("main input");
  if (!input) throw new Error("no input found on calculator page");
  await input.click({ clickCount: 3 });
  await input.type("52000", { delay: 80 });
  await page.mouse.move(300, 600);
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 7000)); // > flush interval

  const ids = await page.evaluate((p) => ({
    vid: window.localStorage.getItem(`${p}_vid`),
    sid: window.sessionStorage.getItem(`${p}_sid`),
  }), PREFIX);

  console.log(`beacons=${beacons}`);
  console.log(`visitor=${ids.vid}`);
  console.log(`session=${ids.sid}`);
} finally {
  await browser.close();
}
