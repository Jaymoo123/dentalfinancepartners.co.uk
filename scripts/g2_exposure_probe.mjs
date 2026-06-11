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
    const scrolled = await page.evaluate(() => {
      // Scroll the card (treatment) or its invisible anchor (control) into view.
      const card = Array.from(document.querySelectorAll("aside")).find((e) =>
        (e.textContent || "").includes("Check your numbers"));
      const anchor = document.querySelector('[data-exp-anchor], div[aria-hidden="true"].h-0')
        || document.querySelector("article");
      const target = card || anchor;
      if (target) { target.scrollIntoView({ block: "center", behavior: "instant" }); return target.tagName; }
      window.scrollTo({ top: 2000, behavior: "instant" });
      return "fallback-scroll";
    });
    await new Promise((r) => setTimeout(r, 8000));
    const vid = await page.evaluate(() => window.localStorage.getItem("hd_vid"));
    out[arm] = { scrolled, vid };
    await page.close();
  }
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
