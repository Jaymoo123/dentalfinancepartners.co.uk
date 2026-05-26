# MW2 Carryover Backlog

Picks that were drafted in MW1 but rolled to MW2 (or later) per conductor decisions at Stage 1b. MW2 slicer should include these picks in its candidate pool BEFORE running affinity grouping.

---

## From MW1 (closed 2026-05-26)

### B12 — `ltd-property-spreadsheet`

- **Original MW1 lane:** B (SDLT Scottish/Welsh equivalents)
- **Reason for carryover:** F-51 lane-mis-clustered. The slug is an Incorporation / Limited Company topic (spreadsheet template for tracking property within a limited-company structure), which fits MW2's "Entity / incorporation family" affinity grouping (Limited company / BTL cluster) rather than MW1's SDLT-devolved-equivs cluster.
- **Conductor decision (2026-05-26):** Drop from MW1; roll to MW2.
- **Existing Stage 1 seed:** committed at `4497efb` on main at `briefs/property/megawave1/ltd-property-spreadsheet.md`. MW2 slicer + sub-agent can either:
  1. **Re-draft from scratch** in MW2 context (cleaner cluster fit; may produce different angle)
  2. **Resurrect the seed** by reading the MW1 file as Stage 1 seed input and extending in Stage 2 under MW2's HP-locks
- **MW2 cluster home:** Limited company / BTL (27-pick cluster per `sites/property.megawave-affinity.json`)
- **Recommended action for MW2 slicer:** include `ltd-property-spreadsheet` in MW2's candidate pool with a `carryover_from: MW1-B12` annotation; let MW2's affinity grouping place it in the Incorporation lane naturally.

---

## Process notes

- MW2 slicer (`./scripts/slice-megawave.ps1 -MegaWave 2`) currently reads `docs/property/topic_gaps_final.md` and excludes already-shipped slugs (those with ✅ in any tracker). Since B12's tracker row is now ⚠ (DROPPED, not ✅), the slicer should pick it up on the next slice — **verify behaviour at MW2 prep time**.
- If the slicer's exclusion logic ignores ⚠ rows but excludes ✅ rows only, B12 will be re-claimed automatically. If the slicer's exclusion is broader (any row in any tracker), the conductor must manually add B12 to MW2's pool.
- Cross-check before MW2 dispatch: confirm B12 lands in MW2's Incorporation cluster, not somewhere else.
