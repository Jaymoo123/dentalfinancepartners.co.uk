/**
 * Smoke tests: the /api/track route rejects bad payloads without ingesting.
 * Always responds 204 (no bot signal); the check is that nothing hits Supabase.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

let fetchCalls: number;

beforeEach(() => {
  fetchCalls = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      fetchCalls++;
      return new Response(null, { status: 204 });
    }),
  );
  vi.stubEnv("SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function req(body: unknown): Request {
  return new Request("http://site.test/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("/api/track bad-payload rejection", () => {
  it("returns 204 and ingests nothing on malformed JSON", async () => {
    const res = await POST(req("{not json") as never);
    expect(res.status).toBe(204);
    expect(fetchCalls).toBe(0);
  });

  it("drops events missing identity fields", async () => {
    const res = await POST(req({ events: [{ event_name: "page_view" }] }) as never);
    expect(res.status).toBe(204);
    expect(fetchCalls).toBe(0);
  });

  it("drops events carrying a foreign site_key", async () => {
    const res = await POST(
      req({
        events: [
          {
            event_name: "page_view",
            session_id: "s_1",
            visitor_id: "v_1",
            site_key: "property",
            props: {},
          },
        ],
      }) as never,
    );
    expect(res.status).toBe(204);
    expect(fetchCalls).toBe(0);
  });
});
