# T1 build brief: combined BPR + APR allowance calculator

Slug: `bpr-apr-allowance-calculator`. Pattern: `GenericTool` in
`Property/web/src/lib/calculators/tools/` + registry entry, exactly like
`lease-extension-premium-calculator.ts` (typed inputs, worked example, honest
`note`, related links). Golden tests in the `src/tests/calculator-goldens.test.ts`
pattern, one per compute branch.

Ground truth `docs/property/house_positions.md` §15.4 ONLY. Mechanics:
- Inputs: qualifying agricultural property value (APR), qualifying business
  property value (BPR), AIM/unquoted-share value in the 50% sub-tier, allowance
  already consumed by lifetime transfers since 30 Oct 2024 (anti-forestalling),
  married/civil-partner toggle (shows the combined £5m view).
- Compute per person: combined allowance £2,500,000 rolling 7-year. APR+BPR value
  up to the unused allowance relieved at 100%; the excess relieved at 50%, i.e.
  chargeable at half value, i.e. effective IHT 20% (40% x 50%) on the excess.
- AIM sub-tier: flat 50% relief, does NOT consume the allowance. Keep it a
  separate output row so the interaction is visible.
- Outputs: allowance used, allowance remaining, value relieved at 100%, value
  relieved at 50%, chargeable value, IHT at 40% on chargeable, the effective-rate
  line on the excess, and the couples view when toggled (two allowances, £5m,
  transferability note).
- Honest `note`: valuation of what "qualifying" means is the hard part (occupation
  tests, Pawson line for any letting business); the tool assumes the values
  entered already qualify; nil-rate bands and RNRB are OUT of this tool's scope
  and said so.

Edge cases pinned by goldens: zero inputs; exactly £2.5m; excess above allowance;
AIM-only estate; anti-forestalling consumption reducing headroom to zero;
couples toggle doubling.

Constraints: every figure traces to §15.4; no em-dashes in copy; UK English; no
pricing; suite stays green (vitest incl. goldens), tsc clean. Register the page in
the calculators registry so `/calculators/bpr-apr-allowance-calculator` and
`/embed/bpr-apr-allowance-calculator` render via the generic routes.
