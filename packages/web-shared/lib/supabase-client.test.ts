import { describe, it, expect } from "vitest";
import { getSupabaseConfig } from "./supabase-client";

describe("supabase-client", () => {
  it("getSupabaseConfig returns an object with supabaseUrl and supabaseKey keys", () => {
    const cfg = getSupabaseConfig();
    expect(cfg).toHaveProperty("supabaseUrl");
    expect(cfg).toHaveProperty("supabaseKey");
  });

  it("getSupabaseConfig returns undefined values when env vars are unset", () => {
    const cfg = getSupabaseConfig();
    // In the test environment no Supabase env vars are set
    expect(cfg.supabaseUrl).toBeUndefined();
    expect(cfg.supabaseKey).toBeUndefined();
  });
});
