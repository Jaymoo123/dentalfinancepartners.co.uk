/**
 * Full-site post-deploy health sweep (read-only, non-polluting).
 *
 * Crawls EVERY URL in the live sitemap and asserts, per page:
 *   - HTTP 200 (catches the framework-preset-404 class: all routes 404)
 *   - a complete HTML document (</html>) + the site layout rendered
 *     (catches blank/error renders and the blog ISR-fallback class)
 *   - a non-empty <title> and a canonical link (SEO guardrail)
 *   - every JSON-LD block parses as valid JSON (catches broken structured data)
 *
 * Pure GET requests, no JS execution -> fires ZERO analytics events, so it never
 * pollutes prod data. Answers "are all my pages OK?" without eyeballing each one.
 *
 * Usage:
 *   node scripts/property_health_sweep.mjs [baseUrl]
 *   node scripts/property_health_sweep.mjs https://www.propertytaxpartners.co.uk
 * Exit code 0 = all pages healthy, 1 = at least one FAIL (wire into the deploy gate).
 */

const BASE = (process.argv[2] || "https://www.propertytaxpartners.co.uk").replace(/\/$/, "");
const CONCURRENCY = 8;
const UA = "ptp-health-sweep (read-only post-deploy check)";

// Layout markers: at least one must appear in a healthy server-rendered page.
const LAYOUT_MARKERS = ["Property Tax Partners", "Privacy policy", "/privacy-policy"];

async function fetchSitemapUrls(base) {
  const res = await fetch(`${base}/sitemap.xml`, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  // de-dupe + keep only same-host URLs
  return [...new Set(locs)].filter((u) => u.startsWith(base));
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1],
  );
}

async function checkUrl(url) {
  const fails = [];
  const warns = [];
  let status = 0;
  let bytes = 0;
  try {
    const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
    status = res.status;
    const html = await res.text();
    bytes = html.length;

    if (status !== 200) fails.push(`HTTP ${status}`);
    if (!/<\/html>/i.test(html)) fails.push("incomplete document (no </html>)");
    if (!LAYOUT_MARKERS.some((m) => html.includes(m))) fails.push("layout shell did not render");

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) fails.push("missing/empty <title>");

    if (!/<link[^>]+rel=["']canonical["']/i.test(html)) warns.push("no canonical link");

    const blocks = jsonLdBlocks(html);
    if (blocks.length === 0) warns.push("no JSON-LD");
    for (const b of blocks) {
      try {
        JSON.parse(b);
      } catch {
        fails.push("invalid JSON-LD (does not parse)");
        break;
      }
    }
  } catch (err) {
    fails.push(`request error: ${err.message}`);
  }
  return { url, status, bytes, fails, warns };
}

// Pre-flight guard for the 2026-06-24 outage class: a trailing CR/LF baked into
// NEXT_PUBLIC_SUPABASE_URL/ANON_KEY silently breaks every client-side lead insert
// (the served bundle calls fetch(`...supabase.co\r\n/rest/v1/leads`) -> Invalid value).
// Fetch the served JS chunks and assert the byte right after "supabase.co" is a
// clean string terminator (a quote), not a backslash/escape or a raw CR/LF.
async function checkBundleSupabaseConfig(base) {
  const chunkUrls = new Set();
  for (const p of ["/", "/contact"]) {
    try {
      const html = await (await fetch(base + p, { headers: { "user-agent": UA } })).text();
      for (const m of html.matchAll(/\/_next\/static\/[^"'\\]+\.js/g)) chunkUrls.add(base + m[0]);
    } catch {
      /* ignore here; the page crawl below reports dead pages */
    }
  }
  let found = false;
  let corruptByte = null;
  for (const cu of chunkUrls) {
    let t;
    try {
      t = await (await fetch(cu, { headers: { "user-agent": UA } })).text();
    } catch {
      continue;
    }
    for (let idx = t.indexOf("supabase.co"); idx !== -1; idx = t.indexOf("supabase.co", idx + 1)) {
      found = true;
      const next = t.charCodeAt(idx + "supabase.co".length);
      if (next === 0x5c || next === 0x0d || next === 0x0a) corruptByte = next; // backslash / CR / LF
    }
  }
  if (!found) return { ok: false, detail: "could not locate the inlined Supabase URL in the bundle (cannot verify)" };
  if (corruptByte !== null)
    return { ok: false, detail: "inlined Supabase config is CORRUPTED (trailing char) -> client lead capture is BROKEN" };
  return { ok: true, detail: "inlined Supabase URL is clean" };
}

async function runPool(urls, worker, concurrency) {
  const results = [];
  let i = 0;
  async function next() {
    while (i < urls.length) {
      const idx = i++;
      results[idx] = await worker(urls[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, next));
  return results;
}

console.log(`Health sweep: ${BASE}`);

const bundle = await checkBundleSupabaseConfig(BASE);
console.log(`Bundle Supabase config: ${bundle.ok ? "OK" : "FAIL"} -> ${bundle.detail}`);

const urls = await fetchSitemapUrls(BASE);
console.log(`Sitemap URLs: ${urls.length}\n`);

const results = await runPool(urls, checkUrl, CONCURRENCY);
const failed = results.filter((r) => r.fails.length > 0);
const warned = results.filter((r) => r.fails.length === 0 && r.warns.length > 0);

if (failed.length) {
  console.log(`FAILURES (${failed.length}):`);
  for (const r of failed) console.log(`  [FAIL] ${r.url}  (HTTP ${r.status}, ${r.bytes}b)  -> ${r.fails.join("; ")}`);
  console.log("");
}
if (warned.length) {
  console.log(`WARNINGS (${warned.length}):`);
  for (const r of warned.slice(0, 40)) console.log(`  [warn] ${r.url}  -> ${r.warns.join("; ")}`);
  if (warned.length > 40) console.log(`  ...and ${warned.length - 40} more`);
  console.log("");
}

const healthy = results.length - failed.length;
console.log(
  `SUMMARY: ${healthy}/${results.length} pages healthy, ${failed.length} FAIL, ${warned.length} warn; bundle config ${bundle.ok ? "OK" : "FAIL"}`,
);
process.exit(failed.length || !bundle.ok ? 1 : 0);
