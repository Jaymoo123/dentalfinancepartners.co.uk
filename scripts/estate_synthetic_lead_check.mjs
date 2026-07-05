/**
 * Estate synthetic lead end-to-end post-deploy check (generalisation of
 * property_synthetic_lead_check.mjs for the CRO parity program).
 *
 * NON-POLLUTING by construction, two probes:
 *   A) PUBLIC PATH probe (always): ONE anon PostgREST insert with source='test'
 *      exactly as the legacy client fallback does, exercising RLS + the CHECK
 *      constraint + the insert triggers. source='test' routes operator-only
 *      (never DJH or Reflex) and paid enrichment skips it.
 *   B) CHOKEPOINT probe (when LEAD_PROBE_SECRET is set and --route is passed):
 *      POSTs the site's NEW /api/leads/submit route with probe_secret; the
 *      server rewrites the row to source='test' + extras.probe, so the full
 *      route -> validation -> service insert -> notify path is exercised with
 *      zero vendor contact. This automates the live-form probe's server side.
 * Both probes assert the row landed, then DELETE it via the service role.
 *
 * Usage:
 *   node scripts/estate_synthetic_lead_check.mjs --site generalist [--route]
 *   node scripts/estate_synthetic_lead_check.mjs --site solicitors --url https://preview-url [--route]
 * Exit 0 = money path healthy; 1 = FAIL (wire into the deploy gate).
 */
import fs from "node:fs";
import path from "node:path";

const SITE_URLS = {
  property: "https://www.propertytaxpartners.co.uk",
  generalist: "https://www.hollowaydavies.co.uk",
  solicitors: "https://www.accountsforlawyers.co.uk",
  dentists: "https://www.dentalfinancepartners.co.uk",
  medical: "https://www.medicalaccounts.co.uk",
  "contractors-ir35": "https://www.contractortaxaccountants.co.uk",
  "construction-cis": "https://www.tradetaxspecialists.co.uk",
  agency: "https://www.agencyfounderfinance.co.uk",
};
const NOTIFY_HOST = "https://www.propertytaxpartners.co.uk"; // central pipeline host for ALL sites

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const hasFlag = (name) => process.argv.includes(`--${name}`);

const siteKey = arg("site");
if (!siteKey || !(siteKey in SITE_URLS)) {
  console.log(`[FAIL] --site required, one of: ${Object.keys(SITE_URLS).join(", ")}`);
  process.exit(1);
}
const siteUrl = (arg("url") || SITE_URLS[siteKey]).replace(/\/$/, "");

function loadEnvFiles(files) {
  const out = {};
  for (const f of files) {
    try {
      const txt = fs.readFileSync(f, "utf8");
      for (const line of txt.split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
        if (m && !(m[1] in out)) out[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
      }
    } catch {
      /* file absent */
    }
  }
  return out;
}
const root = path.resolve(process.cwd());
const fileEnv = loadEnvFiles([path.join(root, ".env")]);
const env = { ...fileEnv, ...process.env };

const SUPABASE_URL = (env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || "";
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || "";
const PROBE_SECRET = env.LEAD_PROBE_SECRET || "";

function fail(msg) {
  console.log(`[FAIL] ${msg}`);
  process.exit(1);
}
if (!SUPABASE_URL) fail("SUPABASE_URL not found");
if (!ANON_KEY) fail("anon key not found - needed to test the public path");
if (!SERVICE_KEY) fail("service-role key not found - needed to clean up probe rows");

async function assertRowAndDelete(email, expectExtrasProbe) {
  const selRes = await fetch(
    `${SUPABASE_URL}/rest/v1/leads?email=eq.${encodeURIComponent(email)}&select=id,source,extras`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } },
  );
  const found = await selRes.json().catch(() => []);
  if (!Array.isArray(found) || found.length !== 1) {
    fail(`expected exactly 1 probe row for ${email}, found ${Array.isArray(found) ? found.length : "?"}`);
  }
  const row = found[0];
  if (row.source !== "test") fail(`probe row source='${row.source}', expected 'test'`);
  if (expectExtrasProbe && !(row.extras && row.extras.probe === true)) {
    fail(`chokepoint probe row missing extras.probe (got ${JSON.stringify(row.extras)})`);
  }
  const delRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${row.id}`, {
    method: "DELETE",
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, Prefer: "return=representation" },
  });
  if (!delRes.ok) fail(`cleanup DELETE returned ${delRes.status} - probe row may remain (id ${row.id})`);
  const delBody = await delRes.json().catch(() => []);
  if (!Array.isArray(delBody) || delBody.length !== 1) fail(`cleanup did not remove exactly one row (id ${row.id})`);
  return row.id;
}

console.log(`Estate synthetic lead check -> site=${siteKey} url=${siteUrl}`);

// A) PUBLIC PATH probe (anon PostgREST, source='test', site attribution in message/source_url)
{
  const email = `probe+${siteKey}-${Date.now()}@ashfieldtrading.com`;
  const payload = {
    full_name: "Synthetic Probe",
    email,
    phone: "00000000000",
    role: "Other",
    message: `__synthetic_probe__ site=${siteKey} post-deploy money-path check`,
    source: "test",
    source_url: `${siteUrl}/__healthcheck`,
    consent_given: true,
    consent_text: "synthetic probe - not a real enquiry",
    consent_at: new Date().toISOString(),
    submitted_at: new Date().toISOString(),
  };
  const insRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
  const insBody = await insRes.text();
  if (insRes.status !== 201) fail(`anon public insert returned ${insRes.status}: ${insBody.slice(0, 200)}`);
  console.log("  [ok] A: public anon insert accepted (201)");
  const id = await assertRowAndDelete(email, false);
  console.log(`  [ok] A: row landed + deleted (id ${id}; operator-only routing, vendors CC-excluded)`);
}

// B) CHOKEPOINT probe (the new /api/leads/submit route, probe_secret -> source='test')
if (hasFlag("route")) {
  if (!PROBE_SECRET) {
    fail("--route requested but LEAD_PROBE_SECRET not in env (set it locally AND on the site's Vercel project)");
  }
  const email = `probe-route+${siteKey}-${Date.now()}@ashfieldtrading.com`;
  const res = await fetch(`${siteUrl}/api/leads/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "user-agent": "estate-synthetic-check" },
    body: JSON.stringify({
      full_name: "Synthetic Route Probe",
      email,
      phone: "00000000000",
      role: "Other",
      message: `__synthetic_probe__ site=${siteKey} chokepoint check`,
      source_url: `${siteUrl}/__healthcheck`,
      consent_given: true,
      consent_text: "synthetic probe - not a real enquiry",
      probe_secret: PROBE_SECRET,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (res.status !== 200 || body.success !== true) {
    fail(`chokepoint route returned ${res.status} ${JSON.stringify(body).slice(0, 200)}`);
  }
  console.log(`  [ok] B: /api/leads/submit accepted (leadId ${body.leadId ?? "n/a"})`);
  const id = await assertRowAndDelete(email, true);
  console.log(`  [ok] B: chokepoint row landed as source=test + extras.probe, deleted (id ${id})`);
}

// C) central notify wiring healthy (does not send)
try {
  const h = await fetch(`${NOTIFY_HOST}/api/leads/notify`, { headers: { "user-agent": "estate-synthetic-check" } });
  const hj = await h.json().catch(() => ({}));
  console.log(`  [ok] C: notify health: HTTP ${h.status} (secretSet=${hj.secretSet}, resendSet=${hj.resendSet ?? hj.resendReady})`);
} catch {
  console.log("  [warn] C: could not reach notify health endpoint");
}

console.log(`\nPASS: ${siteKey} money path healthy, no vendor contacted, nothing left behind.`);
process.exit(0);
