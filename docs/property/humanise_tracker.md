# Property — Humanise Tracker

Durable, resumable progress record for the [Humanise Engine](../_engines/HUMANISE_PROGRAM.md). One row per **processed** page. The ranked worklist of *pending* pages lives in the manifest (`optimisation_engine/.cache/voice_scan_property.json`), not here, so this table stays small and grows as pages complete.

**Status legend:** `done` = humanised, all five checks passed, committed. `escalate` = could not pass within the attempt cap; original left untouched, needs a human look.

**Summary:** processed 0 · done 0 · escalate 0 · (baseline actionable = 323; updated each run)

| slug | status | band_before | score_before | score_after | attempts | commit | date | note |
|---|---|---|---|---|---|---|---|---|
| double-taxation-agreement-uk-and-isle-of-man | done | robotic | 29.9 | 2.2 | 1 | (this commit) | 2026-06-06 | voice-only, all 5 checks passed |
| double-taxation-agreement-uk-and-isle-of-man | done | robotic | 29.9 | 2.3 | 2 | (this commit) | 2026-06-06 | voice-only, all 5 checks passed |
| airbnb-landlords | done | severe | 64.2 | 3.5 | 1 | (this commit) | 2026-06-06 | voice-only, all 5 checks passed |
| commercial-property-fixtures-claim-s198-election-purchase-mechanics | done | severe | 61 | 23.6 | 1 | (this commit) | 2026-06-06 | voice-only, all 5 checks passed |
| know-about-let-property-campaign | done | severe | 66.9 | 2.5 | 2 | (this commit) | 2026-06-06 | voice-only, all 5 checks passed |
| late-filing-and-late-payment-penalties | done | severe | 60 | 11.1 | 1 | (this commit) | 2026-06-06 | voice-only, all 5 checks passed |
<!-- conductor appends one row per processed page below this line -->
