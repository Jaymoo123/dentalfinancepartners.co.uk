/**
 * Structural tests for the /api/leads/submit route module.
 *
 * These tests verify that the route exports the correct Vercel runtime
 * declarations and a POST handler, without executing the handler itself.
 * They catch configuration drift that would cause silent Vercel build failures.
 */
import { describe, it, expect } from "vitest";

// Dynamic import so the module is resolved through the vitest alias (@/ -> src/).
// The factory is never called during this test; we just inspect exports.
const routeModule = await import("@/app/api/leads/submit/route");

describe("/api/leads/submit route exports", () => {
  it('exports runtime = "nodejs"', () => {
    expect(routeModule.runtime).toBe("nodejs");
  });

  it('exports dynamic = "force-dynamic"', () => {
    expect(routeModule.dynamic).toBe("force-dynamic");
  });

  it("exports a POST function", () => {
    expect(typeof routeModule.POST).toBe("function");
  });
});
