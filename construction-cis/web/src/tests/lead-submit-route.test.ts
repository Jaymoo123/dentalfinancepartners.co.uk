/**
 * Smoke tests for the Trade Tax Specialists /api/leads/submit route module.
 *
 * Verifies:
 *  - The module can be imported without errors.
 *  - It exports a POST handler function.
 *  - The expected runtime/maxDuration/dynamic exports are present and correct.
 *
 * TL-03: pure Node.js module tests only -- no React, no window, no fetch mocks.
 * The factory behaviour (validation, honeypot, dedupe) is tested by the shared
 * createLeadSubmitHandler.test.ts suite; we only need to confirm the site
 * wiring is correct here.
 */

import { describe, it, expect } from "vitest";

// Dynamic import so any top-level init errors surface as a clear test failure.
async function loadRoute() {
  return import("@/app/api/leads/submit/route");
}

describe("/api/leads/submit route module", () => {
  it("exports a POST handler function", async () => {
    const mod = await loadRoute();
    expect(typeof mod.POST).toBe("function");
  });

  it("exports runtime = 'nodejs'", async () => {
    const mod = await loadRoute();
    expect(mod.runtime).toBe("nodejs");
  });

  it("exports maxDuration = 10", async () => {
    const mod = await loadRoute();
    expect(mod.maxDuration).toBe(10);
  });

  it("exports dynamic = 'force-dynamic'", async () => {
    const mod = await loadRoute();
    expect(mod.dynamic).toBe("force-dynamic");
  });
});
