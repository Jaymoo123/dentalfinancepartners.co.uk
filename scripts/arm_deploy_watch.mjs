/**
 * Arm the self-driving post-deploy watch for the mini-form multi-step rollout.
 *
 * Seeds the four gate rows (days 3, 7, 14, 28) into public.deploy_watch with
 * watch_key 'miniform_multistep' and started_at = now. The daily cron
 * (/api/cron/deploy-watch) then fires each gate as its day arrives and emails a
 * PASS or ACTION verdict to the operator.
 *
 * Run this ONCE, at the moment the multi-step mini-form is deployed to
 * production, so the day counters start from the deploy.
 *
 * Idempotent: the (watch_key, gate_day) unique constraint means re-running skips
 * rows that already exist (resolution=ignore-duplicates), so a second run is a
 * no-op rather than a reset.
 *
 * Usage:
 *   node scripts/arm_deploy_watch.mjs
 * Reads SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env or the environment.
 * Exit 0 = armed (or already armed); 1 = FAIL.
 */
import fs from "node:fs";
import path from "node:path";

const WATCH_KEY = "miniform_multistep";
const GATE_DAYS = [3, 7, 14, 28];

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
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || "";

function fail(msg) {
  console.log(`[FAIL] ${msg}`);
  process.exit(1);
}
if (!SUPABASE_URL) fail("SUPABASE_URL not found");
if (!SERVICE_KEY) fail("SUPABASE_SERVICE_ROLE_KEY not found");

const startedAt = new Date().toISOString();
const rows = GATE_DAYS.map((day) => ({
  watch_key: WATCH_KEY,
  started_at: startedAt,
  gate_day: day,
  status: "pending",
}));

const res = await fetch(`${SUPABASE_URL}/rest/v1/deploy_watch?on_conflict=watch_key,gate_day`, {
  method: "POST",
  headers: {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
    // ignore-duplicates makes a re-run a no-op rather than a reset.
    Prefer: "resolution=ignore-duplicates,return=representation",
  },
  body: JSON.stringify(rows),
});

if (!res.ok) {
  const body = await res.text().catch(() => "");
  fail(`insert returned ${res.status}: ${body.slice(0, 300)}`);
}

const inserted = await res.json().catch(() => []);
const insertedCount = Array.isArray(inserted) ? inserted.length : 0;
const skipped = GATE_DAYS.length - insertedCount;

console.log(`Arm deploy watch -> watch_key=${WATCH_KEY} started_at=${startedAt}`);
console.log(`  inserted ${insertedCount} gate row(s): ${GATE_DAYS.join(", ")} days`);
if (skipped > 0) {
  console.log(`  ${skipped} gate row(s) already existed and were left unchanged (idempotent).`);
}
console.log("\nPASS: mini-form multi-step watch armed. The daily cron will fire each gate as its day arrives.");
process.exit(0);
