# Wave 7 discovery log — Session C

**Created:** 2026-05-24 PM.

Discovery log format (one block per discovery):
```
## D-N {DISCOVERY_TYPE} — {one-line headline}
**Surfaced at:** {timestamp + which page you were writing}
**Detail:** {what you found / what is interesting}
**Recommendation:** {what should happen with it — future wave bucket idea? site-wide back-patch? calculator? component? cross-site link?}
```

Discovery types per NETNEW_PROGRAM §13.4:
- ADJACENT_TOPIC — competitor covers something we do not, not in topic_gaps
- CALCULATOR_IDEA, COMPONENT_IDEA — interactive tool / UI component idea
- EXISTING_PAGE_STALE — existing page with stale figures/framing
- EXISTING_PAGE_LINK_OPPORTUNITY — existing page should link to your new page
- AUTHORITY_GAP — HMRC manual / legislation never cited on our site
- CROSS_NICHE_LINK — opportunity to cross-link to dentists/medical/solicitors/agency
- OTHER — anything else worth recording

Discoveries are FYI for future-wave bucket planning. Never block.

---

(Sessions append D-N entries below this line.)

## D-1 EXISTING_PAGE_STALE — Competitor URL inventory for TRS rotted
**Surfaced at:** 2026-05-24, writing C1 (`trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017`)
**Detail:** Three of four Stage 1a/Stage 2 competitor URLs in the C1 brief are dead at write time: `ukpropertyaccountants.co.uk/trust-registration-service-rental-property/` (404), `shipleys.com/insights/trust-registration-service-and-property-trusts/` (301 redirect to `mooreks.co.uk` because Shipleys merged into Moore Kingston Smith), `haines-watts.com/insight/trs-registration-property-trusts/` (ECONNREFUSED at DNS level). Reverification path via legislation.gov.uk + TRSM80020 saturated the verification requirement so the page shipped cleanly, but the brief's intended competitor-borrowable-patterns analysis was not possible.
**Recommendation:** Treat TRS-territory competitor URL set as in need of refresh before any future TRS-related Wave 8+ pick. Wave-prep `serp_runner.py` re-run should explicitly cover "trust registration service property" + "TRS landlord" + "MLR 2017 reg 45 trust registration" query bundle to identify currently-live specialist competitors. The high dead-URL rate also suggests TRS/MLR-territory commentary in the UK property-accounting space has a high content-churn rate (firm mergers, page consolidations), so any future TRS-area selection should weight URL-liveness as a brief-quality signal.

## D-2 AUTHORITY_GAP — TRSM80020 manual page is actively maintained (May 2026 update)
**Surfaced at:** 2026-05-24, writing C1 (per-write verification of TRSM80020)
**Detail:** HMRC's TRS Manual page at TRSM80020 was last updated 13 May 2026, eleven days before C1 write time. The active maintenance signal matters because TRS penalty enforcement architecture is the live operational territory where HMRC discretion shapes outcomes; manual updates may shift the case-by-case factors. Anchoring TRS-content references on TRSM80020's verbatim wording rather than competitor paraphrases is the right discipline for future-proofing.
**Recommendation:** Track TRSM80020 + the broader TRS Manual on a quarterly review cadence in the Wave 8+ pre-prep hygiene checklist. Treat any TRSM80020 update as a §16.30 / §16.35 site-wide review trigger (Wave-N close back-patch sweep) for any new pages citing TRS penalty mechanics.
