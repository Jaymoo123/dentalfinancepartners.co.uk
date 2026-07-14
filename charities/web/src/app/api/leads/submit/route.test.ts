/**
 * Smoke test: a honeypot-filled submit is tag-only — the lead is processed
 * through the normal pipeline with extras.honeypot=true recorded for
 * monitoring (every historical hit was a real human via browser autofill).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

type FetchCall = { url: string; init: RequestInit };
let fetchCalls: FetchCall[];

beforeEach(() => {
  fetchCalls = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      fetchCalls.push({ url: String(url), init });
      if (init.method === "POST") {
        return new Response(JSON.stringify([{ id: "lead-1" }]), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }),
  );
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function makeReq(body: Record<string, unknown>): Request {
  return new Request("http://site.test/api/leads/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-real-ip": "203.0.113.7" },
    body: JSON.stringify(body),
  });
}

const VALID = {
  full_name: "Jane Example",
  email: "jane@example.com",
  phone: "07123 456789",
  role: "Trustee",
  message: "Please call me about our year-end accounts.",
};

describe("lead submit honeypot", () => {
  it("stores the row tagged with source=charities and processes it normally", async () => {
    const res = await POST(makeReq({ ...VALID, enquiry_ref: "autofilled value" }));
    expect(res.status).toBe(200);
    expect(((await res.json()) as { success: boolean }).success).toBe(true);

    const inserts = fetchCalls.filter((c) => c.init.method === "POST");
    expect(inserts).toHaveLength(1);
    const row = JSON.parse(String(inserts[0].init.body)) as Record<string, unknown>;
    expect(row.source).toBe("charities");
    expect((row.extras as Record<string, unknown>).honeypot).toBe(true);
    expect((row.extras as Record<string, unknown>).suspected_spam).toBeUndefined();
  });

  it("a clean submit inserts a real lead with source=charities", async () => {
    const res = await POST(makeReq(VALID));
    expect(res.status).toBe(200);
    const inserts = fetchCalls.filter((c) => c.init.method === "POST");
    const row = JSON.parse(String(inserts[0].init.body)) as Record<string, unknown>;
    expect(row.source).toBe("charities");
    expect(row.extras ?? null).toBeNull();
  });
});
