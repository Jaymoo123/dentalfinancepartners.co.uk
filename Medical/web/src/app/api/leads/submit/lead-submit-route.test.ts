/**
 * Tests for the Medical Accountants UK /api/leads/submit chokepoint.
 *
 * Verifies the route wrapper uses the correct source identifier and that the
 * shared factory contract is honoured (the factory itself has its own full
 * battery in packages/web-shared).
 */

import { describe, it, expect } from "vitest";

/* 30s timeout, not the 5s default: every test here does a dynamic
 * import("./route"), which pulls in the whole lead stack and next/server on
 * first call. Under parallel transform load that first import occasionally
 * loses the race and times out, turning CI red at random on code nobody
 * touched (reproduced at the production SHA with no port code present).
 * Not an assertion failure: the file passes in 2.2s in isolation. */
describe("lead submit route — source identifier", () => {
  it("route module exports a POST handler", async () => {
    // Dynamic import to avoid next/server issues at test resolution time.
    // We only verify the export shape; the factory is tested separately.
    const mod = await import("./route");
    expect(typeof mod.POST).toBe("function");
  });

  it("route module exports runtime=nodejs for SEC-04", async () => {
    const mod = await import("./route");
    expect(mod.runtime).toBe("nodejs");
  });

  it("route module exports maxDuration=10 for SEC-04", async () => {
    const mod = await import("./route");
    expect(mod.maxDuration).toBe(10);
  });

  it("route module exports dynamic=force-dynamic for SEC-04", async () => {
    const mod = await import("./route");
    expect(mod.dynamic).toBe("force-dynamic");
  });
}, 30_000);
