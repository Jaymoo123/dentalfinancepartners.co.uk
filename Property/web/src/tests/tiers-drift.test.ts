/**
 * Drift guard: the hand-written constants in src/lib/leads/tiers.ts must
 * match the canonical config/tiers.json at the repo root. If the JSON changes
 * (owner sign-off) this test fails until the TS constants are updated.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  CASE_TIERS,
  CLAIM_SLOTS_PER_LEAD,
  DEFAULT_PRICE_CARD,
  EXCLUSIVE_MULTIPLIER,
  TIER_RANK,
} from "@/lib/leads/tiers";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// tests -> src -> web -> Property -> repo root
const CONFIG_PATH = path.resolve(HERE, "../../../../config/tiers.json");

type JsonTier = {
  id: string;
  label: string;
  price?: number;
  decay?: { last_call_price?: number };
};

const json = JSON.parse(readFileSync(CONFIG_PATH, "utf-8")) as {
  tiers: JsonTier[];
  claim_slots_per_lead: number;
  exclusive_multiplier: number;
};
const byId = new Map(json.tiers.map((t) => [t.id, t]));

describe("tiers.ts matches config/tiers.json", () => {
  it("carries every sellable case tier with matching prices", () => {
    for (const tier of Object.values(CASE_TIERS)) {
      const j = byId.get(tier.id);
      expect(j, `config/tiers.json is missing tier "${tier.id}"`).toBeDefined();
      expect(tier.label).toBe(j!.label);
      expect(tier.price).toBe(j!.price);
      expect(tier.lastCallPrice).toBe(j!.decay?.last_call_price);
    }
  });

  it("default price card encodes the same prices", () => {
    const card = Object.fromEntries(
      DEFAULT_PRICE_CARD.split(",").map((p) => {
        const [k, v] = p.split(":");
        return [k, Number(v)];
      }),
    );
    expect(card).toEqual({
      advisory: byId.get("advisory")!.price,
      standard: byId.get("standard")!.price,
      essential: byId.get("essential")!.price,
    });
  });

  it("carries the claim cap and exclusive multiplier", () => {
    expect(CLAIM_SLOTS_PER_LEAD).toBe(json.claim_slots_per_lead);
    expect(EXCLUSIVE_MULTIPLIER).toBe(json.exclusive_multiplier);
  });

  it("ranks tiers in price order", () => {
    expect(TIER_RANK.advisory).toBeGreaterThan(TIER_RANK.standard);
    expect(TIER_RANK.standard).toBeGreaterThan(TIER_RANK.essential);
  });
});
