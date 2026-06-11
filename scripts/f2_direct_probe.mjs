import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
try {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    window.__msgs = [];
    window.addEventListener("message", (e) => { window.__msgs.push(e.data); });
  });
  await page.goto("https://www.propertytaxpartners.co.uk/embed/stamp-duty-calculator", { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4000));
  const msgs = await page.evaluate(() => window.__msgs.filter((m) => m && m.type === "ptp-embed-height"));
  console.log(JSON.stringify({ selfPosted: msgs.length, sample: msgs[0] || null }));
} finally { await browser.close(); }
