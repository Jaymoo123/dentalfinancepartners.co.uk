/**
 * AN-01 deploy-gate browser pass — automated against the LIVE site with a real
 * browser engine (headless system Edge via puppeteer-core).
 *
 * Proves, in order:
 *   1. AN-04 (half): beacons to /api/track fire from a real page on interaction.
 *   2. AN-02: visitor/session ids exist under the site prefix, random-shaped.
 *   3. AN-01 (THE GATE): localStorage <prefix>_consent = "denied" stops beacons
 *      on the very next interactions, no reload needed.
 *   4. AN-01 (resume): clearing the key resumes tracking without reload.
 *
 * Usage: node scripts/an01_browser_pass.mjs [siteUrl] [prefix]
 * Defaults: https://www.hollowaydavies.co.uk  hd
 */
import puppeteer from "puppeteer-core";

const SITE = process.argv[2] || "https://www.hollowaydavies.co.uk";
const PREFIX = process.argv[3] || "hd";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const results = [];
function record(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}  ${detail}`);
}

// Interact enough to trip auto-capture + the 4s flush timer.
async function interact(page) {
  await page.mouse.move(200, 300);
  await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
  await page.mouse.move(400, 500);
  await page.mouse.click(400, 200).catch(() => {});
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 6000)); // > FLUSH_INTERVAL_MS (4s)
}

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

  // Phase 1: default posture — beacons must fire.
  await page.goto(SITE, { waitUntil: "networkidle2", timeout: 60000 });
  await interact(page);
  const phase1 = beacons;
  record("AN-04 beacons fire on interaction", phase1 > 0, `${phase1} POST(s) to /api/track`);

  // Phase 2: AN-02 — ids exist, prefix-derived, random-shaped.
  const ids = await page.evaluate((p) => ({
    vid: window.localStorage.getItem(`${p}_vid`),
    sid: window.sessionStorage.getItem(`${p}_sid`),
    consent: window.localStorage.getItem(`${p}_consent`),
  }), PREFIX);
  record(
    "AN-02 ids minted under prefix",
    !!ids.vid && !!ids.sid && /^v_[a-z0-9]{8,}/.test(ids.vid) && /^s_[a-z0-9]{8,}/.test(ids.sid),
    `vid=${ids.vid?.slice(0, 12)}… sid=${ids.sid?.slice(0, 12)}… consent=${ids.consent ?? "(unset = track-by-default)"}`,
  );

  // Phase 3: THE GATE — set denied, interact, beacons must STOP (no reload).
  await page.evaluate((p) => window.localStorage.setItem(`${p}_consent`, "denied"), PREFIX);
  beacons = 0;
  await interact(page);
  record("AN-01 opt-out stops beacons live (no reload)", beacons === 0, `${beacons} beacon(s) after denied`);

  // Phase 4: clear the key — tracking resumes without reload.
  await page.evaluate((p) => window.localStorage.removeItem(`${p}_consent`), PREFIX);
  beacons = 0;
  await interact(page);
  // engagement/scroll milestones may already be spent on this page; navigate to
  // a second page to force a fresh page_view if nothing fired in place.
  if (beacons === 0) {
    await page.goto(`${SITE}/calculators`, { waitUntil: "networkidle2", timeout: 60000 });
    await interact(page);
  }
  record("AN-01 tracking resumes after opt-out cleared", beacons > 0, `${beacons} beacon(s) after clear`);

  const allPass = results.every((r) => r.pass);
  console.log(`\n=== AN-01 BROWSER PASS: ${allPass ? "ALL GREEN" : "FAILURES PRESENT"} ===`);
  process.exitCode = allPass ? 0 : 1;
} finally {
  await browser.close();
}
