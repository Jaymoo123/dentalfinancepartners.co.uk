# MegaWave 3 discovery log - Session B

Discovery format:

    ## D-N <TYPE> - one-line
    **Surfaced at:** <timestamp + page>
    **Detail:** <what>
    **Recommendation:** <future-wave bucket / back-patch / calculator / component>

Types: ADJACENT_TOPIC / CALCULATOR_IDEA / COMPONENT_IDEA / FUTURE_WAVE_PICK / SITE_WIDE_PATTERN.

---

## D-1 SITE_WIDE_PATTERN - tracker / queue alphabetical-vs-curated slot mismatch at M3-B-B1 pickup
**Surfaced at:** 2026-05-27 batch M3-B-B1 Stage 1 pickup (agent 0403c24f-ae61-4c10-a665-c53008d9db92).
**Detail:** `megawave3_page_tracker.md` Session-B rows for B1-B4 carried alphabetical-order ATED slugs (`a-complete-guide-to-annual-tax-on-enveloped-dwellings`, `annual-tax-enveloped-dwellings`, `annual-tax-on-enveloped-dwellings`, `annual-tax-on-enveloped-dwellings-ated`) while `queue_B.jsonl` at the same pick_ids held the queue-resliced batch (3 DTA + 1 OTM ATED). Rows for B5 + B6 matched between tracker and queue. Sub-agent updated tracker rows B1-B4 in place to match queue (slug + cluster) per "queue is authoritative" convention. Session A sub-agent shows the same pattern (A1 reassigned from tracker original to `paye-penalties-for-late-submission-and-filing` per picks.yaml). Four displaced ATED slugs need manager reconciliation: either drop as queue-pruned duplicates or restore to a later batch row.
**Recommendation:** manager re-runs slice/queue against tracker before the next batch dispatch to align ordering; consider a pre-launch tracker-vs-queue diff script as a §6 step. The four displaced slugs likely overlap heavily with B5 + B3 + B4 + B16 (all are ATED definitional / overview slugs) and may be intentional dedupe by the slicer.

