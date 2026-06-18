/**
 * Post-deploy probe for the qualified lead form + experiment restructure
 * (branch property-funnel-qualified-form). FORM-START LEVEL ONLY: it never
 * submits, so no lead row is written and no partner email is sent.
 *
 * Against the LIVE Property site it checks:
 *  1. /contact renders the qualified form (fullName + email + phone[req] +
 *     message[req]) with no "(optional)" markers.
 *  2. Focusing a field fires a `form_start` beacon (instrumentation intact) and
 *     NO `lead_submitted` fires (we never submit).
 *  3. Kept-experiment continuity: a seeded golden visitor (v_tester_00001) gets
 *     personalization=control stamped on props.exp (re-pinned golden value).
 *  4. A calculator page renders the qualified MiniCapture (full_name + message).
 *
 * Usage: node scripts/property_qualified_form_probe.mjs [baseUrl]
 */
import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = process.argv[2] || "https://www.propertytaxpartners.co.uk";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-first-run"] });
const out = { base: BASE };
const evName = (e) => e.event_name || e.name;
const expOf = (e) => (e.props && e.props.exp) || e.exp || null;
try {
  // 1-3: /contact render + form_start + continuity (seeded golden visitor)
  {
    const page = await browser.newPage();
    const beacons = [];
    page.on("request", (req) => {
      if (req.url().includes("/api/track") && req.method() === "POST") {
        try { beacons.push(JSON.parse(req.postData() || "{}")); } catch {}
      }
    });
    await page.evaluateOnNewDocument(() => { try { window.localStorage.setItem("ptp_vid", "v_tester_00001"); } catch {} });
    await page.goto(`${BASE}/contact`, { waitUntil: "networkidle2", timeout: 60000 });
    const dom = await page.evaluate(() => {
      const names = Array.from(document.querySelectorAll("input,textarea")).map((e) => e.getAttribute("name"));
      const phone = document.querySelector('[name="phone"]');
      const message = document.querySelector('[name="message"]');
      return {
        hasFullName: names.includes("fullName"),
        hasEmail: names.includes("email"),
        hasPhone: names.includes("phone"),
        hasMessage: names.includes("message"),
        phoneRequired: phone ? phone.required : null,
        messageRequired: message ? message.required : null,
        optionalCount: (document.body.innerText.match(/\(optional\)/g) || []).length,
      };
    });
    await page.focus('[name="fullName"]').catch(() => {});
    await page.keyboard.type("Probe Tester", { delay: 10 }).catch(() => {});
    await page.focus('[name="email"]').catch(() => {});
    await new Promise((r) => setTimeout(r, 4000));
    const events = beacons.flatMap((b) => b.events || []);
    out.contact = {
      dom,
      beacons: beacons.length,
      visitorEcho: beacons[0]?.visitor_id || null,
      formStartFired: events.some((e) => evName(e) === "form_start"),
      leadSubmittedFired: events.some((e) => evName(e) === "lead_submitted"), // expect false
      sampleExp: events.map(expOf).find(Boolean) || null, // expect to contain personalization:control
    };
    await page.close();
  }
  // 4: qualified MiniCapture render on calculator pages (best-effort)
  for (const path of ["/calculators/section-24-calculator", "/calculators/capital-gains-tax-calculator"]) {
    const page = await browser.newPage();
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2", timeout: 60000 }).catch(() => {});
    await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" })).catch(() => {});
    await new Promise((r) => setTimeout(r, 3000));
    out[path] = await page.evaluate(() => {
      const names = Array.from(document.querySelectorAll("input,textarea")).map((e) => e.getAttribute("name"));
      return {
        full_name: names.filter((n) => n === "full_name").length,
        phone: names.filter((n) => n === "phone").length,
        message: names.filter((n) => n === "message").length,
      };
    }).catch(() => null);
    await page.close();
  }
  console.log(JSON.stringify(out, null, 2));
} finally { await browser.close(); }
