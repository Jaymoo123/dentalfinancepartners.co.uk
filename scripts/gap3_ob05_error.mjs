/**
 * OB-05 acceptance — throw a real uncaught error in a real browser on the live
 * site and report the visitor/session ids so the manager can confirm the
 * client_error row landed and renders in the console errors panel.
 *
 * Usage: node scripts/gap3_ob05_error.mjs [siteUrl] [prefix]
 * Defaults: https://www.hollowaydavies.co.uk  hd
 */
import puppeteer from "puppeteer-core";

const SITE = process.argv[2] || "https://www.hollowaydavies.co.uk";
const PREFIX = process.argv[3] || "hd";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-first-run", "--disable-extensions"],
});

try {
  const page = await browser.newPage();
  let beacons = 0;
  page.on("request", (req) => {
    if (req.url().includes("/api/track")) beacons++;
  });

  await page.goto(SITE, { waitUntil: "networkidle2", timeout: 60000 });

  // Light interaction so the session exists and auto-capture is armed.
  await page.mouse.move(200, 300);
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));

  // Throw an uncaught error from page context (setTimeout escapes puppeteer's
  // own evaluate error handling, so window.onerror sees it like a real bug).
  await page.evaluate(() => {
    setTimeout(() => {
      throw new Error("OB05_TEST_ERROR gap3 acceptance 2026-06-11");
    }, 100);
  });

  // Wait past the SDK flush interval so the client_error beacon ships.
  await new Promise((r) => setTimeout(r, 8000));

  const ids = await page.evaluate((p) => ({
    vid: window.localStorage.getItem(`${p}_vid`),
    sid: window.sessionStorage.getItem(`${p}_sid`),
  }), PREFIX);

  console.log(JSON.stringify({ beacons, ...ids }));
} finally {
  await browser.close();
}
