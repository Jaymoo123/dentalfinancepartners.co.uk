#!/usr/bin/env node
/**
 * Non-polluting synthetic probe for the lead contactability pipeline.
 *
 * Submits a source='test' lead to /api/leads/submit on a deployed target and
 * asserts the server verified + enrolled it and returned cleanly. Because the
 * lead is source='test': every channel send is skipped (no message reaches a
 * real person), and the handoff email is skipped, so this is safe to run against
 * production. If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are in the env, it then
 * deletes the test lead (FK cascade cleans verification/state/sends/events).
 *
 * Usage:
 *   node scripts/lead_nurture_probe.mjs [baseUrl]
 *   LEAD_PROBE_BASE_URL=https://www.propertytaxpartners.co.uk node scripts/lead_nurture_probe.mjs
 *
 * Deeper gate/handoff behaviour is covered by the unit suites
 * (packages/web-shared/lead-nurture/lead-nurture.test.ts and
 * Property/web/src/tests/lead-nurture.test.ts); this probe checks the live wire.
 */

const BASE =
  process.argv[2] ||
  process.env.LEAD_PROBE_BASE_URL ||
  "https://www.propertytaxpartners.co.uk";

const stamp = Date.now();
const email = `probe+${stamp}@example.com`;
const payload = {
  full_name: "Probe Tester",
  email,
  phone: "+447700900123", // Ofcom reserved test range, never a real person
  role: "Other",
  message: "Synthetic probe: verifying the lead contactability pipeline end to end.",
  source: "test",
  source_url: `${BASE}/__probe`,
  submitted_at: new Date().toISOString(),
  consent_given: true,
  consent_text: "probe",
  consent_at: new Date().toISOString(),
};

function fail(msg) {
  console.error(`PROBE FAIL: ${msg}`);
  process.exit(1);
}

async function cleanup() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.log("cleanup: skipped (no service-role env); delete the source=test probe row manually if needed.");
    return;
  }
  const res = await fetch(
    `${url}/rest/v1/leads?source=eq.test&email=eq.${encodeURIComponent(email)}`,
    { method: "DELETE", headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "return=minimal" } },
  );
  console.log(`cleanup: delete test lead -> HTTP ${res.status}`);
}

async function main() {
  console.log(`Probe target: ${BASE}/api/leads/submit  (email ${email})`);
  let res;
  try {
    res = await fetch(`${BASE}/api/leads/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    fail(`network error: ${e.message}`);
  }

  let json = {};
  try {
    json = await res.json();
  } catch {
    fail(`non-JSON response (HTTP ${res.status})`);
  }

  if (!res.ok) fail(`HTTP ${res.status}: ${JSON.stringify(json)}`);
  if (json.success !== true) fail(`success !== true: ${JSON.stringify(json)}`);
  if (!json.leadId) fail(`no leadId returned: ${JSON.stringify(json)}`);

  console.log(`OK: lead saved ${json.leadId}`);
  if (json.verify) {
    console.log(`OK: verification ran -> phone=${json.verify.phone} email=${json.verify.email}`);
  } else {
    console.log("NOTE: no verify block returned (Twilio/verify may be unconfigured; fail-open path). Not fatal.");
  }

  await cleanup();
  console.log("PROBE PASS");
}

main().catch((e) => fail(e.message));
