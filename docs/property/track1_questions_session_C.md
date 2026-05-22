# Property Track 1 — Session C — questions to manager

**Append-only channel between Session C and the manager (orchestrator).** One file per session so the three sessions never collide on writes.

## How it works

- **You (Session C) ask** by appending a new question block at the bottom of this file using the template below.
- **The manager answers** by appending a `### Manager answer [TIMESTAMP_UTC]` block directly underneath your question, then flipping the STATUS line from `open` to `answered`.
- **You poll** by re-reading this file. When STATUS flips to `answered`, the answer is in the block below your question.
- Never edit a previous question or a previous answer. Append only.

## When to use this channel (vs. flag / discovery / just continue)

- **Use this channel** when you genuinely cannot make progress without a manager decision AND the decision can't be inferred from your brief + house positions + your judgement.
- **Use `track1_site_wide_flags.md`** when you've already decided and acted (or you're flagging something cross-session) and you want the orchestrator to action it later. Flagging never blocks you.
- **Use `track1_discovery_log_session_C.md`** for observations that compound into future waves but don't need action.
- **Just continue** for anything inside your authority per the START_HERE doc.

Pause work on the current page while a question is open ONLY if you genuinely cannot proceed without the answer. If you can move on to another step or another page meanwhile, do.

## Question template (copy this block exactly when asking)

```
## [Q-<n>] [<TIMESTAMP_UTC>] [STATUS: open] <one-line title>

**Page in scope:** <slug or "general">
**Step in workflow:** <e.g. step 4 competitor fetch / step 9 markdown write / step 11 verification>
**What I tried:** <1-3 lines>
**What I need decided:** <the actual question>
**My recommendation (if any):** <so the manager can just say "yes, proceed">
**Blocks progress?:** <yes / no — can you keep working on something else while you wait?>
```

`<n>` is the next integer (Q-1, Q-2, Q-3, ...).
`<TIMESTAMP_UTC>` is ISO format, e.g. `2026-05-22T14:30Z`.

---

## [Sessions: append questions below this line]

## [M-1] [2026-05-22T02:35Z] [MANAGER NOTE] House positions doc correction — six-dwellings rule

Heads up: `docs/property/house_positions.md` section 1 has been corrected as of 2026-05-22T02:30Z. The six-dwellings rule was previously cited as "Sch 6B para 7 FA 2003" and framed as an election; it is actually **s.116(7) FA 2003** and is **automatic** (statutory deeming, no election). Verified directly against legislation.gov.uk.

**Impact on your Session C bucket (VAT + FIC + ATED):** likely none of your 13 pages touch the six-dwellings rule as a primary topic. The closest interaction is C12 (`ated-15-percent-flat-rate-sdlt-interaction`), where SDLT mechanics around enveloped acquisitions might intersect — if your C12 brief or page touches portfolio acquisitions of 6+ dwellings, use the corrected framing. Otherwise no action required.

If you've already read house_positions.md and cached the wrong framing, refresh it. Continue as planned.

---

## [M-2] [2026-05-22T10:00Z] [MANAGER NOTE] C10 cleared — proceed to C11

C10 (`ated-complete-guide-2026-27`) was inspected and committed cleanly (commit `daa0444`). All six checks pass: em-dashes 0, Tailwind 0, FAQ count 13=13, meta title 51, meta description 148, internal links resolve. Content quality looks high on skim. Word count 4332 — defensible for a pillar.

**You're cleared to claim C11 (`ated-rental-property-relief-mechanics`).** This is an ATED daughter that should link back to C10 in its body and FAQs (you have that context from the START_HERE doc).

You correctly followed the commit-before-mark-done order. Keep doing that — the other two sessions hit issues with skipping step 14.

---

## [M-3] [2026-05-22T10:05Z] [MANAGER NOTE] Word-count calibration for ATED daughters

C10 at 4332 words is fine for a pillar. **For C11, C12, C13 (the ATED daughters) and your VAT pages (C1–C5), aim for 2,800–3,500.** Pillars carry comprehensive coverage; daughters and bucket pages should be tightly scoped, link back to the pillar for context, and avoid restating the full ATED bands every time.

Specifically:
- C11–C13: keep each under ~3,500 words. Link back to C10 for bands, scope, returns mechanics.
- C1–C5 VAT pages: 2,800–3,500. VAT mechanics are reference-dense; resist comprehensive when applied is better.
- C6–C9 FIC pages: C6 is positioned as a comprehensive reference (partial overlap with the existing decision-focused FIC page), so 3,500–4,500 is acceptable for C6 only. C7–C9 should be 2,800–3,500.

If you write a 4000+ word non-pillar, justify it in your work-log Decisions block.
