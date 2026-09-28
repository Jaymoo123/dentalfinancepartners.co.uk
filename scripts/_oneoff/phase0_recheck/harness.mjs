// Phase 0 recheck render harness. Shared by every recheck agent so all 17 sites are measured
// the same way. Run from the repo root (puppeteer-core is a root dependency):
//
//   node scripts/_oneoff/phase0_recheck/harness.mjs --site Property --port 3401 --out <scratch>/out
//        [--pages home,/about,...] override the sitemap-derived page list ("home" = "/")
//        [--blog N]               blog posts to sample (default 1)
//        [--no-control]           skip the gov.uk 390 control (only if already proven this run)
//
// Assumes `npx next start -p <port>` is already serving <site>/web on localhost. Writes
// <out>/<site>/report.json, <out>/<site>/summary.md and screenshots. Never edits the repo.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
// resolve puppeteer-core from the repo root (cwd), since this script lives outside the repo
const require = createRequire(path.join(process.cwd(), "package.json"));
const puppeteer = require("puppeteer-core");

const CHROME = "C:/Users/user/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe";
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : "true"]);
    return acc;
  }, [])
);
const site = args.site;
const port = Number(args.port);
const outRoot = args.out || path.join(process.cwd(), "recheck-out");
if (!site || !port) { console.error("need --site and --port"); process.exit(2); }
const base = `http://localhost:${port}`;
const outDir = path.join(outRoot, site);
fs.mkdirSync(outDir, { recursive: true });

const MOBILE = {
  viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
};
const DESKTOP = { width: 1280, height: 900, deviceScaleFactor: 1 };

async function fetchStatus(url) {
  try { const r = await fetch(url, { redirect: "manual" }); return r.status; } catch { return "ERR"; }
}
async function fetchText(url) {
  try { const r = await fetch(url); return { status: r.status, text: r.ok ? await r.text() : "" }; } catch { return { status: "ERR", text: "" }; }
}

// ---- page list from the local sitemap ---------------------------------------------------
async function derivePages() {
  // "home" is an alias for "/" because Git Bash rewrites a bare "/" argument into a Windows path
  if (args.pages) return args.pages.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (s === "home" ? "/" : s.replace(/^C:\/Program Files\/Git\/?/, "/")));
  const { status, text } = await fetchText(`${base}/sitemap.xml`);
  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const set = new Set(["/", "/about", "/services", "/contact"]);
  for (const p of locs) {
    if (/^\/services\/[^/]+$/.test(p)) set.add(p);
    if (/^\/for(-[^/]+)?(\/[^/]+)?$/.test(p)) set.add(p);
    if (/^\/calculators(\/[^/]+)?$/.test(p)) set.add(p);
    if (/^\/vat\/[^/]+$/.test(p)) set.add(p);
  }
  const blogs = locs.filter((p) => /^\/blog\/[^/]+$/.test(p) || /^\/(articles|guides|insights)\/[^/]+$/.test(p));
  for (const b of blogs.slice(0, Number(args.blog || 1))) set.add(b);
  return { pages: [...set], sitemapStatus: status, sitemapLocs: locs.length, sitemapXml: text };
}

// ---- in-page measurement ----------------------------------------------------------------
const measure = (width) => {
  const lum = (rgb) => {
    const m = rgb.match(/[\d.]+/g);
    if (!m) return null;
    const [r, g, b] = m.slice(0, 3).map((v) => { v = Number(v) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const alpha = (rgb) => { const m = rgb.match(/[\d.]+/g); return m && m.length === 4 ? Number(m[3]) : (rgb === "transparent" || !m ? 0 : 1); };
  const effectiveBg = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      if (alpha(bg) > 0) return bg;
      const img = getComputedStyle(n).backgroundImage;
      if (img && img !== "none") return `image:${img.slice(0, 40)}`;
      n = n.parentElement;
    }
    return getComputedStyle(document.body).backgroundColor || "rgb(255, 255, 255)";
  };
  const contrast = (fg, bg) => {
    const a = lum(fg), b = lum(bg);
    if (a == null || b == null) return null;
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0";
  };
  const txt = (el) => (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);

  // forms
  const forms = [...document.querySelectorAll("form")];
  const leadForms = forms.filter((f) => f.querySelector('input[type=email],input[name*=email i],input[type=tel],input[name*=phone i]'));
  const formInfo = leadForms.map((f) => {
    const r = f.getBoundingClientRect();
    const submit = f.querySelector('button[type=submit],input[type=submit],button:not([type])');
    let submitContrast = null, submitColors = null;
    if (submit) {
      const fg = getComputedStyle(submit).color, bg = effectiveBg(submit);
      submitContrast = bg.startsWith("image:") ? "image-bg" : contrast(fg, bg);
      submitColors = `${fg} on ${bg}`;
    }
    return { top: Math.round(r.top + window.scrollY), submit: submit ? txt(submit) : null, submitContrast, submitColors, visible: visible(f) };
  });

  // header CTA
  const header = document.querySelector("header") || document.querySelector('[role=banner]');
  const ctaRe = /book|contact|call|enquir|quote|talk|get started|speak|consult/i;
  const headerCtas = header
    ? [...header.querySelectorAll("a,button")].filter((el) => ctaRe.test(txt(el)) || /header_(book|contact|cta)/.test(el.getAttribute("data-cta") || ""))
        .map((el) => { const r = el.getBoundingClientRect(); return { text: txt(el), dataCta: el.getAttribute("data-cta"), visible: visible(el), rect: `${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.x)},${Math.round(r.y)}` }; })
    : [];

  // primary CTAs outside forms (hero etc.)
  const ctaEls = [...document.querySelectorAll('a[data-cta],button[data-cta],a[class*="btn"],a[class*="primary"],button[class*="primary"],a[class*="cta"]')]
    .filter(visible).slice(0, 12)
    .map((el) => { const fg = getComputedStyle(el).color, bg = effectiveBg(el); return { text: txt(el), dataCta: el.getAttribute("data-cta"), contrast: bg.startsWith("image:") ? "image-bg" : contrast(fg, bg), colors: `${fg} on ${bg}` }; });

  // raw markup leaked as text
  const bodyText = document.body.innerText || "";
  const rawMarkup = [...bodyText.matchAll(/(<\/?[a-z][a-z0-9-]*(?:\s[^>\n]{0,40})?>|&lt;|&amp;[a-z]+;|&nbsp;|className=|dangerouslySetInnerHTML)/gi)].slice(0, 5).map((m) => m[0]);

  // gates / modals
  const dialogs = [...document.querySelectorAll('[role=dialog],[aria-modal=true],[class*="ResultGate" i],[data-cta="deep_scroll_modal"]')].filter(visible);
  const isChat = (el) => /specialist_widget|chat/i.test((el.getAttribute("data-cta") || "") + " " + (el.className || "")) || /replies within|specialist widget|ask a specialist/i.test(txt(el));
  const chatWidget = dialogs.some(isChat) || !!document.querySelector('[data-cta="specialist_widget"]');
  const gate = dialogs.filter((el) => !isChat(el)).map((el) => txt(el));
  const gateText = /unlock (the|your|full)|enter your (email|details) to (see|get|view)|to reveal|see your full result/i.test(bodyText);

  // machine layer
  const canonical = document.querySelector('link[rel=canonical]')?.getAttribute("href") || null;
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") || null;
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent); } catch { return { PARSE_ERROR: s.textContent.slice(0, 80) }; } });
  const flat = [];
  const walk = (n) => { if (Array.isArray(n)) n.forEach(walk); else if (n && typeof n === "object") { if (n["@type"]) flat.push(n); if (n["@graph"]) walk(n["@graph"]); Object.values(n).forEach((v) => { if (v && typeof v === "object" && v !== n) walk(v); }); } };
  walk(ld);
  const types = {};
  for (const n of flat) { const t = [].concat(n["@type"]).join("|"); types[t] = (types[t] || 0) + 1; }
  const org = flat.find((n) => /Organization|AccountingService|LocalBusiness|ProfessionalService/.test([].concat(n["@type"]).join()));
  const orgInfo = org ? { type: [].concat(org["@type"]).join("|"), parentOrganization: !!org.parentOrganization, parentName: org.parentOrganization?.name || null, sameAs: Array.isArray(org.sameAs) ? org.sameAs.length : org.sameAs ? 1 : 0, knowsAbout: Array.isArray(org.knowsAbout) ? org.knowsAbout.length : org.knowsAbout ? 1 : 0 } : null;

  return {
    width, scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth,
    title: document.title, h1: txt(document.querySelector("h1") || document.body).slice(0, 80), h1Count: document.querySelectorAll("h1").length,
    forms: forms.length, leadForms: leadForms.length, formInfo, headerCtas, ctaEls, rawMarkup, gate, gateText, chatWidget,
    canonical, ogImage, ldTypes: types, orgInfo, ldParseErrors: ld.filter((x) => x.PARSE_ERROR).length,
    mainLandmark: !!document.querySelector("main"), pageHeight: document.documentElement.scrollHeight,
  };
};

// keyboard-focus the first control of the first lead form, report the focus ring
async function focusRing(page) {
  const target = await page.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const lead = [...document.querySelectorAll("form")].filter((f) => f.querySelector('input[type=email],input[name*=email i],input[type=tel],input[name*=phone i]'));
    const f = lead.find(vis) || lead[0] || [...document.querySelectorAll("form")].find(vis) || document.querySelector("form");
    if (!f) return null;
    const el = f.querySelector("input:not([type=hidden]):not([type=checkbox]):not([type=radio]),select,textarea");
    if (!el) return null;
    el.setAttribute("data-recheck-target", "1");
    el.scrollIntoView({ block: "center" });
    // move keyboard focus to the element just before the target so one Tab lands on it
    const focusables = [...document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,[tabindex]:not([tabindex="-1"])')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
    const i = focusables.indexOf(el);
    if (i > 0) focusables[i - 1].focus();
    return { tag: el.tagName, name: el.getAttribute("name") || el.id || null, hadPrev: i > 0 };
  });
  if (!target) return { present: false };
  await page.keyboard.press("Tab");
  const landedByTab = await page.evaluate(() => document.activeElement === document.querySelector("[data-recheck-target]"));
  if (!landedByTab) await page.evaluate(() => document.querySelector("[data-recheck-target]").focus()); // keyboard modality already set by the Tab
  return await page.evaluate((landedByTab) => {
    const el = document.querySelector("[data-recheck-target]");
    const active = document.activeElement;
    const cs = getComputedStyle(active);
    const landed = active === el;
    return {
      present: true, landed, landedByTab, activeTag: active.tagName, activeName: active.getAttribute("name") || active.id || null,
      outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, boxShadow: cs.boxShadow, borderColor: cs.borderColor,
      ringVisible: (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || /0px 0px 0px [1-9]/.test(cs.boxShadow || ""),
    };
  }, landedByTab);
}

// ---- main ------------------------------------------------------------------------------------
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
  const report = { site, port, ranAt: new Date().toISOString(), control: null, siteFiles: {}, pages: [] };

  // control: gov.uk at a real 390 emulation
  if (args["no-control"] !== "true") {
    const p = await browser.newPage();
    await p.emulate(MOBILE);
    try {
      await p.goto("https://www.gov.uk/", { waitUntil: "domcontentloaded", timeout: 30000 });
      report.control = { url: "https://www.gov.uk/", scrollWidth: await p.evaluate(() => document.documentElement.scrollWidth), innerWidth: await p.evaluate(() => innerWidth) };
    } catch (e) { report.control = { url: "https://www.gov.uk/", error: String(e).slice(0, 120) }; }
    await p.close();
  }

  // site-level files
  const llms = await fetchText(`${base}/llms.txt`);
  const ads = await fetchText(`${base}/ads.txt`);
  const robots = await fetchText(`${base}/robots.txt`);
  const derived = await derivePages();
  const pages = Array.isArray(derived) ? derived : derived.pages;
  const sitemapXml = Array.isArray(derived) ? (await fetchText(`${base}/sitemap.xml`)).text : derived.sitemapXml;
  const lastmods = [...sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  const today = new Date().toISOString().slice(0, 10);
  const todayUrls = [...sitemapXml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((m) => m[0]).filter((u) => u.includes(`<lastmod>${today}`)).map((u) => (u.match(/<loc>([^<]+)<\/loc>/) || [])[1]).slice(0, 8);
  report.siteFiles = {
    llmsTxt: { status: llms.status, utmChatgpt: (llms.text.match(/utm_source=chatgpt/g) || []).length, links: (llms.text.match(/https?:\/\//g) || []).length, stub: /STUB|pre-launch|nothing here should be cited/i.test(llms.text), firstLine: llms.text.split("\n")[0]?.slice(0, 100) },
    llmsFull: { status: await fetchStatus(`${base}/llms-full.txt`) },
    adsTxt: { status: ads.status, hasPub: ads.text.includes("pub-3756285576371279"), body: ads.text.trim().slice(0, 120) },
    robots: { status: robots.status, gptbot: /GPTBot/i.test(robots.text), sitemapLine: /Sitemap:/i.test(robots.text) },
    sitemap: { status: Array.isArray(derived) ? "n/a" : derived.sitemapStatus, locs: Array.isArray(derived) ? null : derived.sitemapLocs, lastmodCount: lastmods.length, lastmodDistinct: new Set(lastmods.map((d) => d.slice(0, 10))).size, lastmodToday: lastmods.filter((d) => d.startsWith(today)).length, todayUrls },
  };

  for (const route of pages) {
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/[\/\[\]]/g, "_").slice(0, 60);
    const entry = { route, status: await fetchStatus(`${base}${route}`), desktop: null, mobile: null, focus: null, ogImageStatus: null, canonicalSelf: null };
    if (entry.status !== 200) { report.pages.push(entry); continue; }
    // desktop
    let p = await browser.newPage();
    await p.setViewport(DESKTOP);
    try {
      await p.goto(`${base}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
      entry.desktop = await p.evaluate(measure, 1280);
      entry.focus = await focusRing(p);
      await p.screenshot({ path: path.join(outDir, `${slug}-1280.png`), fullPage: false });
      if (entry.desktop.ogImage) {
        const u = new URL(entry.desktop.ogImage, `${base}${route}`);
        const local = `${base}${u.pathname}${u.search}`;
        entry.ogImageStatus = await fetchStatus(local);
        entry.ogImageLocalUrl = local;
      }
      if (entry.desktop.canonical) {
        const c = new URL(entry.desktop.canonical, `${base}${route}`);
        entry.canonicalSelf = c.pathname.replace(/\/$/, "") === route.replace(/\/$/, "");
      }
    } catch (e) { entry.desktopError = String(e).slice(0, 160); }
    await p.close();
    // mobile
    p = await browser.newPage();
    await p.emulate(MOBILE);
    try {
      await p.goto(`${base}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
      entry.mobile = await p.evaluate(measure, 390);
      await p.screenshot({ path: path.join(outDir, `${slug}-390.png`), fullPage: false });
    } catch (e) { entry.mobileError = String(e).slice(0, 160); }
    await p.close();
    report.pages.push(entry);
    process.stderr.write(`${site} ${route} ${entry.status} forms=${entry.desktop?.leadForms ?? "?"} sw390=${entry.mobile?.scrollWidth ?? "?"}\n`);
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));

  // summary table
  const pass = (b) => (b ? "PASS" : "FAIL");
  const lines = [
    `# ${site} render recheck (${report.ranAt})`, "",
    `Control gov.uk @390: scrollWidth ${report.control?.scrollWidth ?? report.control?.error ?? "skipped"}`, "",
    `llms.txt ${report.siteFiles.llmsTxt.status} utm=${report.siteFiles.llmsTxt.utmChatgpt}/${report.siteFiles.llmsTxt.links} stub=${report.siteFiles.llmsTxt.stub} | llms-full ${report.siteFiles.llmsFull.status} | ads.txt ${report.siteFiles.adsTxt.status} pub=${report.siteFiles.adsTxt.hasPub} | robots ${report.siteFiles.robots.status} GPTBot=${report.siteFiles.robots.gptbot} | sitemap ${report.siteFiles.sitemap.status} locs=${report.siteFiles.sitemap.locs} lastmod=${report.siteFiles.sitemap.lastmodCount} distinct=${report.siteFiles.sitemap.lastmodDistinct} today=${report.siteFiles.sitemap.lastmodToday} ${report.siteFiles.sitemap.todayUrls.join(" ")}`, "",
    "| route | status | lead forms | header CTA 1280 | header CTA 390 | sw390 | raw markup | gate | focus ring | submit contrast | canonical self | og:image | Org parent | Service/FAQ/Breadcrumb |",
    "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
  ];
  for (const e of report.pages) {
    const d = e.desktop, m = e.mobile;
    if (!d) { lines.push(`| ${e.route} | ${e.status} | ${e.desktopError || ""} |`); continue; }
    const hv = d.headerCtas.filter((c) => c.visible).length, mv = m ? m.headerCtas.filter((c) => c.visible).length : "?";
    const t = d.ldTypes;
    lines.push(`| ${e.route} | ${e.status} | ${d.leadForms} | ${hv} ${pass(hv >= 1)} | ${mv} ${pass(mv === 0)} | ${m?.scrollWidth} ${pass(m?.scrollWidth === 390)} | ${d.rawMarkup.length ? "FAIL " + d.rawMarkup[0] : "PASS"} | ${d.gate.length || d.gateText ? "FAIL " + (d.gate[0] || "text") : "PASS"}${d.chatWidget ? " chat" : ""} | ${e.focus?.present ? (e.focus.landed ? (e.focus.ringVisible ? "PASS" : "FAIL " + e.focus.outline + " / " + e.focus.boxShadow.slice(0, 40)) + (e.focus.landedByTab ? "" : " (script focus)") : "NOLAND " + e.focus.activeTag) : "noform"} | ${d.formInfo.map((f) => f.submitContrast).join("/") || "-"} | ${e.canonicalSelf === null ? "none" : pass(e.canonicalSelf)} | ${e.ogImageStatus ?? "-"} | ${d.orgInfo ? (d.orgInfo.parentOrganization ? "PASS" : "FAIL") + " " + d.orgInfo.type : "NO ORG"} | ${(t.Service || 0)}/${(t.FAQPage || 0)}/${(t.BreadcrumbList || 0)} |`);
  }
  fs.writeFileSync(path.join(outDir, "summary.md"), lines.join("\n") + "\n");
  console.log(lines.join("\n"));
})().catch((e) => { console.error(e); process.exit(1); });
