/**
 * F2 acceptance — prove the FROZEN embed resize contract on the LIVE site:
 * a third-party page embedding /embed/<slug> must receive postMessage
 * { type: "ptp-embed-height", height } from the iframe.
 *
 * Usage: node scripts/f2_embed_contract.mjs [embedUrl]
 */
import puppeteer from "puppeteer-core";
import { writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";

const EMBED = process.argv[2] || "https://www.propertytaxpartners.co.uk/embed/stamp-duty-calculator";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const host = resolve("scripts/.f2_embed_host.html");
writeFileSync(host, `<!doctype html><html><body>
<iframe src="${EMBED}" style="width:480px;border:0"></iframe>
<script>
  window.__msgs = [];
  window.addEventListener("message", (e) => { window.__msgs.push(e.data); });
</script></body></html>`);

const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
try {
  const page = await browser.newPage();
  await page.goto("file:///" + host.replace(/\\/g, "/"), { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));
  const msgs = await page.evaluate(() => window.__msgs);
  const resize = msgs.filter((m) => m && m.type === "ptp-embed-height" && typeof m.height === "number");
  console.log(JSON.stringify({ totalMessages: msgs.length, ptpResize: resize.length, sample: resize[0] || null }));
  process.exitCode = resize.length > 0 ? 0 : 1;
} finally {
  await browser.close();
  unlinkSync(host);
}
