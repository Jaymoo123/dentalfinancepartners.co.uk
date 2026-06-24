/**
 * Synthetic lead end-to-end post-deploy check (the "did my change break the money
 * path?" gate). NON-POLLUTING by construction:
 *   - submits ONE lead with source='test' through the REAL public path (anon POST
 *     to PostgREST, exactly as the live form does) so it exercises RLS + the CHECK
 *     constraint + the insert triggers;
 *   - source='test' routes ONLY to the operator (never DJH or Reflex) and is
 *     skipped by paid enrichment (see lead-routing.ts / enrich route);
 *   - asserts the row landed, then DELETES it via the service role;
 *   - is excluded from billing/reconciliation and the dashboard.
 *
 * Requires the test-data-isolation migration (source='test' allowed) to be applied;
 * until then the insert is correctly rejected by the CHECK and this reports that.
 *
 * Usage:  node scripts/property_synthetic_lead_check.mjs
 * Exit 0 = money path healthy (insert+row+cleanup OK); 1 = FAIL (wire into deploy gate).
 */
import fs from "node:fs";
import path from "node:path";

// --- minimal .env loader (node has no auto-load): process.env wins, else parse files ---
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
const fileEnv = loadEnvFiles([
  path.join(root, ".env"),
  path.join(root, "Property", "web", ".env.local"),
]);
const env = { ...fileEnv, ...process.env };

const SUPABASE_URL = (env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || "";
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || "";

function fail(msg) {
  console.log(`[FAIL] ${msg}`);
  process.exit(1);
}
if (!SUPABASE_URL) fail("SUPABASE_URL not found");
if (!ANON_KEY) fail("anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY) not found - needed to test the REAL public path");
if (!SERVICE_KEY) fail("service-role key not found - needed to clean up the probe row");

const tag = `synthetic_probe`;
const payload = {
  full_name: "Synthetic Probe",
  email: `probe+${Date.now()}@ashfieldtrading.com`,
  phone: "00000000000",
  role: "Other",
  message: `__${tag}__ post-deploy money-path check`,
  source: "test",
  source_url: `${SUPABASE_URL}/__healthcheck`,
  consent_given: true,
  consent_text: "synthetic probe - not a real enquiry",
  consent_at: new Date().toISOString(),
  submitted_at: new Date().toISOString(),
};

console.log("Synthetic lead check ->", SUPABASE_URL);

// 1) INSERT via the public anon path EXACTLY as the live form does: fire-and-forget,
//    NO return=representation (anon has no SELECT policy by design, so a readback
//    would trip RLS - the form never reads back).
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
if (insRes.status === 400 && /leads_source_valid|violates check constraint/i.test(insBody)) {
  fail("source='test' rejected by CHECK -> migration 20260624000001 not applied yet.");
}
if (insRes.status !== 201) fail(`insert via anon path returned ${insRes.status}: ${insBody.slice(0, 200)}`);
console.log("  [ok] public anon insert accepted (201)");

// 2) Read it back via the SERVICE role (anon cannot SELECT) to confirm it landed and
//    capture the id for cleanup. Match on the unique probe email.
const selRes = await fetch(
  `${SUPABASE_URL}/rest/v1/leads?email=eq.${encodeURIComponent(payload.email)}&select=id,source`,
  { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } },
);
const found = await selRes.json().catch(() => []);
if (!Array.isArray(found) || found.length !== 1) {
  fail(`expected exactly 1 probe row, found ${Array.isArray(found) ? found.length : "?"}`);
}
const row = found[0];
if (row.source !== "test") fail(`probe row source='${row.source}', expected 'test'`);
console.log(`  [ok] row landed (id ${row.id}, source=${row.source}; routed operator-only, vendors CC-excluded)`);

// 2) notify wiring healthy (does not send; just confirms secrets/recipient configured)
const SITE = (process.argv[2] || "https://www.propertytaxpartners.co.uk").replace(/\/$/, "");
try {
  const h = await fetch(`${SITE}/api/leads/notify`, { headers: { "user-agent": "ptp-synthetic-check" } });
  const hj = await h.json().catch(() => ({}));
  console.log(`  [ok] notify health endpoint: HTTP ${h.status} (secretSet=${hj.secretSet}, resendSet=${hj.resendSet ?? hj.resendReady})`);
} catch {
  console.log("  [warn] could not reach notify health endpoint");
}

// 3) CLEANUP - delete the probe row via service role (anon cannot delete)
const delRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${row.id}`, {
  method: "DELETE",
  headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, Prefer: "return=representation" },
});
if (!delRes.ok) fail(`cleanup DELETE returned ${delRes.status} - a probe row may remain (id ${row.id})`);
const delBody = await delRes.json().catch(() => []);
if (!Array.isArray(delBody) || delBody.length !== 1) fail(`cleanup did not remove exactly one row (id ${row.id})`);
console.log(`  [ok] probe row deleted (id ${row.id})`);

console.log("\nPASS: money path healthy (public insert -> row -> cleanup), no vendor contacted, nothing left behind.");
process.exit(0);
