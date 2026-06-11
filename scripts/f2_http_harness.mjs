import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
try {
  const page = await browser.newPage();
  await page.goto("http://localhost:8099/embed_host.html", { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));
  const msgs = await page.evaluate(() => window.__msgs.filter((m) => m && m.type === "ptp-embed-height" && typeof m.height === "number"));
  console.log(JSON.stringify({ parentReceived: msgs.length, sample: msgs[0] || null }));
  process.exitCode = msgs.length > 0 ? 0 : 1;
} finally { await browser.close(); }
