import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const URL = process.argv[2] || "https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/annual-investment-allowance-2024-25";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
try {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2000));
  const out = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("a,button")).filter((e) =>
      (e.textContent || "").includes("Get a specialist to check your numbers"));
    return els.map((e) => {
      const cs = getComputedStyle(e);
      return {
        tag: e.tagName, cls: e.className.slice(0, 160),
        color: cs.color, bg: cs.backgroundColor,
        parentBg: getComputedStyle(e.parentElement).backgroundColor,
      };
    });
  });
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
