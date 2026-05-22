# Property Wave 2 — Session C — start here (Leaving the UK / Expat)

**You are Session C.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **Leaving the UK / expat landlord tax**. Sessions A (IHT) and B (DTAs) have their own pre-assigned lists.

This is **Wave 2** of the Property Net-New Program. Wave 1 (31 SDLT / Ltd Co / VAT / FIC / ATED pages) is on `main` already.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave2-c/` on branch `property-wave2-c`. **Stay inside that worktree.**

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/house_positions.md`** — locked positions. For Expat work, you read **§§5 (CGT, including NRCGT)**, **§10 (DTAs headline — interacts with your work)**, AND **§17 (Wave 2 Expat extension)** which is your primary working detail. §17 locks the SRT cascade, split-year Cases 1-8, the **s.10A TCGA 1992 temporary non-residence "5 years or less" rule** (verified HMRC CG26540 wording, 2026-05-22), the NRCGT regime timeline (residential 2015, non-residential + indirect 2019, 60-day reporting), the NRL scheme operational mechanics (NRL1/2/3/6), and the April 2025 non-dom reform with the 4-year FIG regime + 12% TRF.
3. **`docs/property/NETNEW_PROGRAM.md`** — manager handover doc. §4 (brief anatomy), §7 (19-step workflow), §8.4 (session-side watcher — new for Wave 2).
4. **Your assigned briefs** at `briefs/property/wave2/<expat-slug>.md`.
5. **`docs/property/wave2_page_tracker.md`** — your pages in "Session C pages".

## Per-page workflow

Each brief has the canonical 19-step workflow. Summary:

1. Read house positions (once at session start).
2. Claim ONE page (`⬜ todo` → `🟡 in_progress`).
3. Read brief.
4. Fetch competitor URLs.
5. Read closest-existing pages.
6. Plan H2/H3 + meta + FAQs + CTA placements.
7. Verify factual claims.
8. Fetch hero image.
9. Write markdown.
10. Build clean.
11. Six verifications.
12. Redirect repointing if applicable.
13. Register in `monitored_pages`.
14. **Commit on your branch.**
15. Fill work-log.
16. **Mark `✅ done` in tracker** (only AFTER step 14).
17. Site-wide flags.
18. Discoveries.
19. Claim next page.

**Critical Wave 2 calibration: step 14 (commit) BEFORE step 16 (mark done).**

## Q&A channel + session-side watcher

If blocked, append to `docs/property/wave2_questions_session_C.md` with `STATUS: open`. Immediately spawn a Monitor task watching for `STATUS: answered` flip. Keep working on another page or step while waiting.

```bash
QFILE="docs/property/wave2_questions_session_C.md"
LATEST_Q=$(grep -oE '^## \[Q-[0-9]+\]' "$QFILE" | tail -1)
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

## Universal rules (non-negotiable)

(Same as A and B. No em-dashes. Specific. Anonymised. LeadForm auto-injected. Asides classless. Semantic HTML only. FAQs 10-14 in frontmatter. House positions are tie-breaker.)

## Anti-templating (especially important for an all-expat session)

Risk: 10 emigration / non-residence pages reading like "here's how the SRT applies, fetch your NRL1, file your 60-day return". Don't. Each brief pins a distinct angle:

- **C1 (12-month checklist):** action-led pre-departure timeline. Pillar.
- **C2 (SRT decision tree):** the test itself, applied to landlord scenarios.
- **C3 (split-year Cases 1-8):** the eight cases with property-specific examples.
- **C4 (s.10A 5-year rule):** TCGA temporary non-residence — the often-misunderstood 5-year recapture.
- **C5 (NRL agent-side mechanics):** agents' NRL2/NRL6 quarterly/annual machinery, NOT the landlord-facing NRL1 page (which exists already).
- **C6 (Dubai pathway):** UAE-specific including the asymmetric-treaty issue + common misconceptions.
- **C7 (Australia pathway):** ATO interaction + FITO credit relief.
- **C8 (non-dom April 2025 reform):** the FIG regime + 12% TRF + CGT rebasing election.
- **C9 (returning to UK):** the re-arrival side, including s.10A recapture timing.
- **C10 (NRCGT indirect disposal):** Sch 4AA TCGA 1992 — shares in property-rich entities.

If two pages share an H2 outline or you find yourself reusing an opening sentence, stop and rework.

## What to handle yourself vs flag

(Same as A and B. Self-handle voice / FAQs / Tailwind / citations / asides / differentiation. Flag cross-session / cross-page issues to `wave2_site_wide_flags.md`. Log adjacencies and gaps to `wave2_discovery_log_session_C.md`. Q&A only when blocked.)

## Cannibalisation watch

- **C4 (s.10A temporary non-residence)** — partial topical overlap with existing `non-resident-cgt-selling-uk-property-overseas-guide` (0.27, below threshold). Different framing — your page is about the 5-year recapture mechanic; the existing page is about direct NRCGT mechanics. Link bidirectionally.
- **C5 (NRL agent-side)** — three existing NRL pages cover the landlord side (`non-resident-landlord-scheme-uk-complete-guide`, `nrl-approval-receive-rent-gross-hmrc-guide`, `nrl-withholding-tax-20-percent-basic-rate-deduction`). Your page is the agent-side complement. Do NOT re-cover NRL1 mechanics; link out.
- **C8 (non-dom April 2025 / FIG)** — no existing page on the reform; safe to write the comprehensive treatment.
- **C10 (NRCGT indirect disposal)** — existing NRCGT pages cover direct disposals. The indirect-disposal angle (≥25%/≥75% test, Sch 4AA, property-rich entities) is genuinely new. Differentiate cleanly.

## Your Session C pages (10 assigned — Leaving the UK / Expat)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| C1 | leaving-uk-landlord-12-month-pre-departure-checklist |
| C2 | srt-statutory-residence-test-landlord-decision-tree |
| C3 | split-year-treatment-cases-1-8-landlord-departure-arrival |
| C4 | temporary-non-residence-5-year-cgt-recapture-property |
| C5 | nrl-scheme-letting-agents-quarterly-returns-mechanics |
| C6 | moving-to-dubai-uk-rental-property-tax-pathway |
| C7 | moving-to-australia-uk-rental-property-tax-pathway |
| C8 | non-dom-reform-april-2025-fig-regime-property-investors |
| C9 | returning-to-uk-after-non-residence-property-portfolio |
| C10 | nrcgt-indirect-disposal-property-rich-companies-shares |

**Sequence note:** C1 (12-month checklist) is the pillar. Consider writing it first or second. C2 and C3 are SRT-and-split-year — write the SRT first (C2) before split-year (C3) because split-year depends on SRT outcomes. C4 (s.10A) is best after C2 + C3 because it builds on the non-residence concept.

## When you're done with all 10

Update the summary at the top of `wave2_page_tracker.md` and append a `[SESSION_C_COMPLETE]` paragraph to `wave2_site_wide_flags.md`. Then stop.

Begin with C1 (`leaving-uk-landlord-12-month-pre-departure-checklist`).
