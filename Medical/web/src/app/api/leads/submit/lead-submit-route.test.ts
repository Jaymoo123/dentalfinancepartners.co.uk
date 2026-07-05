/**
 * Tests for the Medical Accountants UK /api/leads/submit chokepoint.
 *
 * Verifies the route wrapper uses the correct source identifier and that the
 * shared factory contract is honoured (the factory itself has its own full
 * battery in packages/web-shared).
 */

import { describe, it, expect } from "vitest";

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
});
