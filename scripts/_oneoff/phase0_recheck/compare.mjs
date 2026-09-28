// Compare the pre-fix harness run (out/) with the post-fix run (out2/) per site, on the
// columns the fix round touched. Usage: node compare.mjs <scratch>/recheck
import fs from "node:fs";
import path from "node:path";
const root = process.argv[2];
const sites = fs.readdirSync(path.join(root, "out2"));
const load = (dir, s) => { try { return JSON.parse(fs.readFileSync(path.join(root, dir, s, "report.json"), "utf8")); } catch { return null; } };
const agg = (r) => {
  const pages = r.pages.filter((p) => p.desktop);
  const calc = pages.filter((p) => /^\/calculators\/[^/]+/.test(p.route));
  const seg = pages.filter((p) => /^\/(for|services)(-[^/]+)?\/[^/]+$|^\/for-[^/]+$/.test(p.route));
  const n = (arr, f) => arr.filter(f).length;
  return {
    pages: pages.length,
    sitemapToday: r.siteFiles.sitemap.lastmodToday,
    sitemapLastmod: r.siteFiles.sitemap.lastmodCount,
    ogImage404: n(pages, (p) => p.ogImageStatus === 404),
    ogImage200: n(pages, (p) => p.ogImageStatus === 200),
    rawMarkupPages: n(pages, (p) => p.desktop.rawMarkup.length > 0),
    gatePages: n(pages, (p) => p.desktop.gate.length > 0),
    focusRingFail: n(pages, (p) => p.focus?.present && p.focus.landed && !p.focus.ringVisible),
    focusRingPass: n(pages, (p) => p.focus?.present && p.focus.landed && p.focus.ringVisible),
    orgNoParent: n(pages, (p) => p.desktop.orgInfo && !p.desktop.orgInfo.parentOrganization),
    orgMissing: n(pages, (p) => !p.desktop.orgInfo),
    segPages: seg.length,
    segWithService: n(seg, (p) => (p.desktop.ldTypes.Service || 0) > 0),
    segWithBreadcrumb: n(seg, (p) => (p.desktop.ldTypes.BreadcrumbList || 0) > 0),
    calcPages: calc.length,
    calcForms: calc.map((p) => p.desktop.forms).join(","),
    sw390Fail: n(pages, (p) => p.mobile && p.mobile.scrollWidth !== 390),
    lowContrast: n(pages, (p) => p.desktop.formInfo.some((f) => typeof f.submitContrast === "number" && f.submitContrast < 4.5)),
  };
};
const keys = ["pages", "sitemapToday", "sitemapLastmod", "ogImage404", "ogImage200", "rawMarkupPages", "gatePages", "focusRingFail", "focusRingPass", "orgNoParent", "orgMissing", "segPages", "segWithService", "segWithBreadcrumb", "calcPages", "calcForms", "sw390Fail", "lowContrast"];
console.log("| site | " + keys.join(" | ") + " |");
console.log("|---|" + keys.map(() => "---").join("|") + "|");
for (const s of sites) {
  const a = load("out", s), b = load("out2", s);
  if (!b) continue;
  const A = a ? agg(a) : null, B = agg(b);
  console.log(`| ${s} | ` + keys.map((k) => (A && String(A[k]) !== String(B[k]) ? `${A[k]} -> ${B[k]}` : String(B[k]))).join(" | ") + " |");
}
