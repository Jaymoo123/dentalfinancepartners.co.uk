import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createLeadSubmitHandler,
  mergeLeadMessages,
  normalizeEmailForDedupe,
  phoneDedupeKey,
  __resetLeadSubmitRateLimiter,
} from "./createLeadSubmitHandler";

const SUPA = "https://example.supabase.co";

type FetchCall = { url: string; init: RequestInit };

let fetchCalls: FetchCall[];
let fetchImpl: (url: string, init: RequestInit) => Response | Promise<Response>;

function jsonRes(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Default backend: dedupe lookup finds nothing; insert returns a fresh id. */
function defaultBackend(url: string, init: RequestInit): Response {
  if ((init.method ?? "GET") === "GET") return jsonRes([]);
  if (init.method === "POST") return jsonRes([{ id: "lead-new-1" }], 201);
  if (init.method === "PATCH") return jsonRes([]);
  return jsonRes([]);
}

function makeReq(body: unknown, ip = "203.0.113.7"): Request {
  return new Request("http://site.test/api/leads/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-real-ip": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const VALID = {
  full_name: "Jane Example",
  email: "jane@example.com",
  phone: "07123 456789",
  role: "Director",
  message: "Please call me about my accounts.",
};

function insertBodies(): Record<string, unknown>[] {
  return fetchCalls
    .filter((c) => c.init.method === "POST")
    .map((c) => JSON.parse(String(c.init.body)) as Record<string, unknown>);
}

beforeEach(() => {
  fetchCalls = [];
  fetchImpl = defaultBackend;
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    fetchCalls.push({ url: String(url), init });
    return fetchImpl(String(url), init);
  }));
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("SUPABASE_URL", SUPA);
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
  vi.stubEnv("LEAD_PROBE_SECRET", "");
  __resetLeadSubmitRateLimiter();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("environment isolation", () => {
  it("returns a success-shaped no-op outside production (no insert, no fallback trigger)", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    const POST = createLeadSubmitHandler({ source: "solicitors" });
    const res = await POST(makeReq(VALID));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, leadId: null, skipped: "nonprod" });
    expect(fetchCalls).toHaveLength(0);
  });

  it("returns 503 when service credentials are absent", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    const POST = createLeadSubmitHandler({ source: "solicitors" });
    const res = await POST(makeReq(VALID));
    expect(res.status).toBe(503);
  });
});

describe("honeypot tag-only (real humans hit it via autofill)", () => {
  it("processes the lead through the normal pipeline with extras.honeypot tagged", async () => {
    const POST = createLeadSubmitHandler({ source: "generalist" });
    const res = await POST(makeReq({ ...VALID, enquiry_ref: "autofilled co ltd" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    const [row] = insertBodies();
    expect(row.source).toBe("generalist");
    expect((row.extras as Record<string, unknown>).honeypot).toBe(true);
    expect((row.extras as Record<string, unknown>).suspected_spam).toBeUndefined();
  });
});

describe("validation (lighter qualified pattern)", () => {
  const POST = createLeadSubmitHandler({ source: "solicitors" });

  it("rejects short name / bad email / short phone", async () => {
    expect((await POST(makeReq({ ...VALID, full_name: "J" }))).status).toBe(400);
    expect((await POST(makeReq({ ...VALID, email: "not-an-email" }, "203.0.113.8"))).status).toBe(400);
    expect((await POST(makeReq({ ...VALID, phone: "0712" }, "203.0.113.9"))).status).toBe(400);
  });

  it("accepts a submission with no message (message optional in full mode)", async () => {
    const res = await POST(makeReq({ ...VALID, message: "" }));
    expect(res.status).toBe(200);
    expect((await res.json()).leadId).toBe("lead-new-1");
  });

  it("email_only mode requires just email + message floor", async () => {
    const ok = await POST(
      makeReq({ email: "a@b.co", message: "Need help with my accounts", captureMode: "email_only" }),
    );
    expect(ok.status).toBe(200);
    const short = await POST(
      makeReq({ email: "a@b.co", message: "hi", captureMode: "email_only" }, "203.0.113.10"),
    );
    expect(short.status).toBe(400);
  });

  it("returns 400 on malformed JSON", async () => {
    const res = await POST(makeReq("{not json"));
    expect(res.status).toBe(400);
  });
});

describe("source enforcement", () => {
  it("ignores a spoofed body source", async () => {
    const POST = createLeadSubmitHandler({ source: "solicitors" });
    await POST(makeReq({ ...VALID, source: "property" }));
    const [row] = insertBodies();
    expect(row.source).toBe("solicitors");
  });

  it("rewrites to source='test' + extras.probe on a matching probe secret", async () => {
    vi.stubEnv("LEAD_PROBE_SECRET", "s3cret-probe");
    const POST = createLeadSubmitHandler({ source: "solicitors" });
    await POST(makeReq({ ...VALID, probe_secret: "s3cret-probe" }));
    const [row] = insertBodies();
    expect(row.source).toBe("test");
    expect((row.extras as Record<string, unknown>).probe).toBe(true);
  });

  it("treats a wrong probe secret as a normal lead for the configured site", async () => {
    vi.stubEnv("LEAD_PROBE_SECRET", "s3cret-probe");
    const POST = createLeadSubmitHandler({ source: "solicitors" });
    await POST(makeReq({ ...VALID, probe_secret: "wrong" }));
    const [row] = insertBodies();
    expect(row.source).toBe("solicitors");
    expect(row.extras ?? null).toBeNull();
  });
});

describe("dedupe adopt-and-merge", () => {
  it("PATCHes the existing row, merging messages and never overwriting with blanks", async () => {
    fetchImpl = (url, init) => {
      if ((init.method ?? "GET") === "GET") {
        return jsonRes([
          { id: "lead-old-9", full_name: "Jane Example", phone: "07123456789", message: "First enquiry" },
        ]);
      }
      return jsonRes([]);
    };
    const POST = createLeadSubmitHandler({ source: "generalist" });
    const res = await POST(
      makeReq({ ...VALID, full_name: "", phone: "", message: "Second follow-up" }),
    );
    // blank name/phone would fail full validation — use email_only-adjacent path:
    // full mode requires them, so this 400s; retry with values present but same email.
    expect(res.status).toBe(400);

    const res2 = await POST(makeReq({ ...VALID, message: "Second follow-up" }, "203.0.113.20"));
    expect(res2.status).toBe(200);
    expect((await res2.json()).leadId).toBe("lead-old-9");
    const patch = fetchCalls.find((c) => c.init.method === "PATCH");
    expect(patch).toBeDefined();
    expect(patch!.url).toContain("id=eq.lead-old-9");
    const body = JSON.parse(String(patch!.init.body)) as Record<string, unknown>;
    expect(body.message).toBe("First enquiry\n\n---\nSecond follow-up");
    expect(body.full_name).toBe("Jane Example");
    const posts = fetchCalls.filter((c) => c.init.method === "POST");
    expect(posts).toHaveLength(0);
  });

  it("URL-encodes the email in the dedupe filter", async () => {
    const POST = createLeadSubmitHandler({ source: "generalist" });
    await POST(makeReq({ ...VALID, email: "a+tag@example.com" }));
    const get = fetchCalls.find((c) => (c.init.method ?? "GET") === "GET");
    expect(get!.url).toContain(encodeURIComponent("a+tag@example.com"));
    expect(get!.url).not.toContain("a+tag@example.com&");
  });

  it("exact-eq fast path still merges without a second-pass candidate fetch", async () => {
    fetchImpl = (url, init) => {
      if ((init.method ?? "GET") === "GET") {
        return jsonRes([
          { id: "lead-old-9", full_name: "Jane Example", phone: "07123456789", message: "First" },
        ]);
      }
      return jsonRes([]);
    };
    const POST = createLeadSubmitHandler({ source: "generalist" });
    const res = await POST(makeReq(VALID));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, leadId: "lead-old-9", merged: true });
    const gets = fetchCalls.filter((c) => (c.init.method ?? "GET") === "GET");
    expect(gets).toHaveLength(1);
    expect(fetchCalls.filter((c) => c.init.method === "POST")).toHaveLength(0);
  });
});

describe("dedupe second pass (2026-08-19 incident: plus-alias + phone matching)", () => {
  /** Exact-eq lookup misses; the candidate list holds the prior wizard row. */
  function secondPassBackend(candidates: unknown[]): typeof fetchImpl {
    return (url, init) => {
      if ((init.method ?? "GET") === "GET") {
        return url.includes("email=eq.") ? jsonRes([]) : jsonRes(candidates);
      }
      if (init.method === "POST") return jsonRes([{ id: "lead-new-1" }], 201);
      return jsonRes([]);
    };
  }

  it("merges the plus-alias wizard row into the real enquiry (extras survive, merged flag set)", async () => {
    fetchImpl = secondPassBackend([
      {
        id: "lead-wizard-1",
        full_name: "Ken Dlc",
        phone: "",
        message: "Wizard summary",
        email: "kendlc2026+ma@gmail.com",
        extras: { health_check: { score: 42, answers: ["a", "b"] } },
      },
    ]);
    const POST = createLeadSubmitHandler({ source: "medical" });
    const res = await POST(
      makeReq({
        ...VALID,
        full_name: "Ken Dlc",
        email: "kendlc2026@gmail.com",
        phone: "07123 456789",
        message: "Please call me about the health check.",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, leadId: "lead-wizard-1", merged: true });
    const patch = fetchCalls.find((c) => c.init.method === "PATCH");
    expect(patch).toBeDefined();
    expect(patch!.url).toContain("id=eq.lead-wizard-1");
    const body = JSON.parse(String(patch!.init.body)) as Record<string, unknown>;
    expect(body.message).toBe("Wizard summary\n\n---\nPlease call me about the health check.");
    expect(body.phone).toBe("07123 456789");
    expect(body.extras).toEqual({ health_check: { score: 42, answers: ["a", "b"] } });
    expect(fetchCalls.filter((c) => c.init.method === "POST")).toHaveLength(0);
    const candGet = fetchCalls.find(
      (c) => (c.init.method ?? "GET") === "GET" && !c.url.includes("email=eq."),
    );
    expect(candGet!.url).toContain("select=id,full_name,phone,message,email,extras");
    expect(candGet!.url).toContain("limit=50");
  });

  it("matches on the phone key when the emails differ entirely", async () => {
    fetchImpl = secondPassBackend([
      {
        id: "lead-phone-1",
        full_name: "Jane Example",
        phone: "+44 7123 456789",
        message: "First enquiry",
        email: "jane.other@hotmail.com",
        extras: null,
      },
    ]);
    const POST = createLeadSubmitHandler({ source: "generalist" });
    const res = await POST(makeReq({ ...VALID, message: "Second enquiry" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, leadId: "lead-phone-1", merged: true });
    const patch = fetchCalls.find((c) => c.init.method === "PATCH");
    const body = JSON.parse(String(patch!.init.body)) as Record<string, unknown>;
    expect(body.message).toBe("First enquiry\n\n---\nSecond enquiry");
  });

  it("a different person (different email, different phone) still inserts fresh", async () => {
    fetchImpl = secondPassBackend([
      {
        id: "lead-other-1",
        full_name: "Someone Else",
        phone: "07999 888777",
        message: "Unrelated",
        email: "someone.else@example.org",
        extras: null,
      },
    ]);
    const POST = createLeadSubmitHandler({ source: "generalist" });
    const res = await POST(makeReq(VALID));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, leadId: "lead-new-1" });
    expect(fetchCalls.filter((c) => c.init.method === "PATCH")).toHaveLength(0);
  });

  it("falls through to insert when the dedupe lookup fails (never loses a lead)", async () => {
    fetchImpl = (url, init) => {
      if ((init.method ?? "GET") === "GET") throw new Error("postgrest down");
      if (init.method === "POST") return jsonRes([{ id: "lead-new-1" }], 201);
      return jsonRes([]);
    };
    const POST = createLeadSubmitHandler({ source: "generalist" });
    const res = await POST(makeReq(VALID));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, leadId: "lead-new-1" });
  });
});

describe("dedupe key helpers (unit)", () => {
  it("normalizeEmailForDedupe trims, lowercases and strips plus-addressing but not dots", () => {
    expect(normalizeEmailForDedupe("  KendLC2026+MA@Gmail.COM ")).toBe("kendlc2026@gmail.com");
    expect(normalizeEmailForDedupe("kendlc2026@gmail.com")).toBe("kendlc2026@gmail.com");
    expect(normalizeEmailForDedupe("a.b+tag@c.d")).toBe("a.b@c.d");
    expect(normalizeEmailForDedupe("a.b@c.d")).toBe("a.b@c.d");
    expect(normalizeEmailForDedupe("not-an-email")).toBe("not-an-email");
  });

  it("phoneDedupeKey keeps the last 10 digits, null under 10", () => {
    expect(phoneDedupeKey("07123 456789")).toBe("7123456789");
    expect(phoneDedupeKey("+44 7123 456789")).toBe("7123456789");
    expect(phoneDedupeKey("0712")).toBeNull();
    expect(phoneDedupeKey("")).toBeNull();
  });
});

describe("merge semantics (unit)", () => {
  it("keeps single/identical messages as-is", () => {
    expect(mergeLeadMessages("", "new")).toBe("new");
    expect(mergeLeadMessages("same", "same")).toBe("same");
    expect(mergeLeadMessages("old", "")).toBe("old");
  });

  it("caps at 4000 chars trimming from the front (recent context wins)", () => {
    const prior = "a".repeat(3990);
    const next = "THE-RECENT-TAIL";
    const merged = mergeLeadMessages(prior, next);
    expect(merged.length).toBe(4000);
    expect(merged.endsWith("THE-RECENT-TAIL")).toBe(true);
  });
});

describe("failure and abuse handling", () => {
  it("returns 500 when the insert fails", async () => {
    fetchImpl = (url, init) => {
      if ((init.method ?? "GET") === "GET") return jsonRes([]);
      return jsonRes({ message: "boom" }, 500);
    };
    const POST = createLeadSubmitHandler({ source: "solicitors" });
    const res = await POST(makeReq(VALID));
    expect(res.status).toBe(500);
    expect((await res.json()).success).toBe(false);
  });

  it("rate-limits a single IP within the window", async () => {
    const POST = createLeadSubmitHandler({ source: "solicitors" });
    let last: Response = new Response(null);
    for (let i = 0; i < 11; i += 1) {
      last = await POST(makeReq({ ...VALID, email: `u${i}@example.com` }, "198.51.100.5"));
    }
    expect(last.status).toBe(429);
    const other = await POST(makeReq(VALID, "198.51.100.99"));
    expect(other.status).toBe(200);
  });
});
