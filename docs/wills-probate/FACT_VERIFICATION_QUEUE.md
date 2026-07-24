# Fact verification queue — wills-probate copy (pre-publish gate)

All items must be verified against primary sources (gov.uk/HMRC/HMCTS/OPG) by the Opus verification pass before any page ships. Sources logged next to each on completion.

## From core copy (copy-staging/core/)
- [ ] Pensions into IHT 6 Apr 2027: confirm final-legislation status; spouse exemption + death-in-service treatment per HMRC consultation response (copy currently hedged "due to take effect")
- [ ] Business relief from Apr 2026: £1m combined BR/APR 100% cap, 50% above (effective 20%), binding-contract-for-sale trap, commencement
- [ ] Long-term residence test (from 6 Apr 2025): 10-of-20-years, post-departure tail mechanics
- [ ] Probate fee £300 + £5,000 no-fee threshold still current
- [ ] RNRB: stepchildren count as direct descendants; £2m taper
- [ ] Marriage revokes will in E&W but NOT Scotland — jurisdiction footnote needed in wills copy

## From pillar copy (copy-staging/pillars/)
- [ ] Court of Protection deputyship application fee £421; OPG supervision fee "up to £320"/yr
- [ ] OPG LPA registration fee £82 per LPA
- [ ] **HMCTS "around 16 weeks" grant timeline is STALE** — FCSQ 2026-Q1 actuals (verified, OGL): mean 6.4 weeks all channels, digital 4.5 (82.6% share), paper 16.5. FIX pillar copy + probate-timeline-estimator HMCTS-wait defaults to cite these; keep "varies" hedging
- [ ] Grant copy fee £1.50
- [ ] Solicitor fee ranges 1-5% / £150-£350/hr / will + LPA price bands (hedged as market-typical; verify plausibility, keep hedged)
- [ ] "1 in 3 over 65 develop dementia" stat — find citable source or remove
- [ ] RNRB taper wipe-out points £2.35m (single) / £2.7m (couple)
- [ ] Threshold freeze "until April 2030"

## From pensions-2027 asset (research-staging/pensions-iht-2027/)
- [ ] 50%-withholding-for-15-months mechanism: attributed to July 2025 policy paper via search summary only — confirm in TIIN full text before publish
- [x] VERIFIED (21 Jul 2025 TIIN + consultation response, URLs in snapshot): 6 Apr 2027 commencement; 10,500 newly liable / 38,500 paying more / avg +£34,000; yield £640m/£1,340m/£1,460m; PRs liable (not PSAs); death-in-service EXCLUDED; spouse/charity exemptions unchanged
- [ ] PROPAGATE to estimator + copy + wave-3 hallucination_zones: death-in-service exclusion, PR liability, "~49,000 affected" should be restated as 10,500 newly liable + 38,500 paying more

## From calculators (add when calculator agent reports)
- [ ] estate-tax.ts constants sweep vs gov.uk (NRB/RNRB/taper/rates/gift exemptions/taper-relief bands/excepted-estate limits/statutory legacy £322k)
