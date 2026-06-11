import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const POST = process.argv[2];
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
try {
  const page = await browser.newPage();
  await page.goto(`${POST}?ab=calc_promo_inline:control`, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  // Human-like incremental scroll so the zero-height anchor passes through view.
  for (let y = 200; y <= 3000; y += 200) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await new Promise((r) => setTimeout(r, 150));
  }
  await new Promise((r) => setTimeout(r, 6000));
  const vid = await page.evaluate(() => window.localStorage.getItem("hd_vid"));
  console.log(JSON.stringify({ vid }));
} finally { await browser.close(); }
