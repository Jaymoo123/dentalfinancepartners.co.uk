# Medical page rewrite — master tracker

**Last consolidated update:** 2026-05-21 (orchestrator session, Opus 4.7 setup)

**Total pages:** 46 (every page in `Medical/web/content/blog/`)
**Complete:** 0
**Remaining:** 46
**Sessions running:** 3 parallel (A, B, C) — see `docs/sessions/medical/SESSION_{A,B,C}_START_HERE.md`

## Status legend

- ✅ done — page rewritten, built, FAQ schema verified, tracker updated
- 🟡 in_progress — a session has claimed the page and is actively rewriting it
- ⬜ todo — not yet started
- ⏭️ skip — page should not be rewritten (TSX template / redirect candidate / etc). Reason in Notes.

## Coordination rules

1. **Only edit your own assigned rows.** If a page is in your session's table, you edit it. If not, do NOT touch.
2. **Mark `🟡 in_progress` BEFORE starting work** so other sessions can see it.
3. **Mark `✅ done` immediately after build passes** and FAQ schema count matches frontmatter.
4. **If something needs orchestrator input**, do NOT pause — append to `docs/medical/site_wide_flags.md` (append-only) and continue.
5. **If you discover a page is a duplicate / redirect candidate / TSX template**, mark `⏭️ skip` with reason, flag in `docs/medical/site_wide_flags.md`, move on.

## Worktree map

| Session | Worktree | Branch |
|---|---|---|
| A | `C:/Users/user/Documents/Accounting-wt-medical-a/` | `medical-rewrite-a` |
| B | `C:/Users/user/Documents/Accounting-wt-medical-b/` | `medical-rewrite-b` |
| C | `C:/Users/user/Documents/Accounting-wt-medical-c/` | `medical-rewrite-c` |

Each session edits the tracker in the **main** repo (`Accounting/`) — open the file from main, not from a worktree, so the three sessions and the orchestrator all see consistent state.

## Pre-flight notes (completed by orchestrator before sessions launched)

- `.prose-blog aside` rule added to `Medical/web/src/app/globals.css` (medical-teal accent on copper-soft).
- FAQPage JSON-LD fallback verified in `Medical/web/src/lib/schema.ts` via `buildBlogPostingJsonLd`.
- `niche.config.json` lead-form role segments verified: GP (salaried) / GP (partner) / Locum doctor / Hospital consultant / Private practice owner.
- Baseline `npm run build` passes.
- `briefs/medical/<slug>.md` generated for all 46 pages.
- House positions locked in `docs/medical/house_positions.md`.
- GSC refreshed 2026-05-21 — only 4 pages have GSC visibility. Other pages use a seeded primary query from metaTitle.

## Session A pages (16 assigned)

| # | Slug | Status | Date | Notes |
|---|---|---|---|---|
| A1 | accountant-accounting-services | ⬜ todo | | |
| A2 | gp-accountant | ⬜ todo | | |
| A3 | gp-accountant-cost | ⬜ todo | | |
| A4 | gp-accountant-leeds | ⬜ todo | | |
| A5 | gp-accountant-manchester | ⬜ todo | | |
| A6 | gp-accountant-sheffield | ⬜ todo | | |
| A7 | gp-bookkeeping-guide-uk | ⬜ todo | | |
| A8 | gp-home-office-expenses-tax-relief | ⬜ todo | | |
| A9 | gp-partnership-profit-sharing-tax-planning | ⬜ todo | | |
| A10 | gp-pension-contributions-tax-relief | ⬜ todo | | |
| A11 | gp-tax-return | ⬜ todo | | |
| A12 | locum-doctor-ir35-what-you-need-to-know | ⬜ todo | | PILLAR |
| A13 | locum-doctor-tax-complete-guide | ⬜ todo | | PILLAR |
| A14 | medical-professional-expenses-what-is-claimable | ⬜ todo | | |
| A15 | nhs-pension-tapered-annual-allowance-calculator | ⬜ todo | | |
| A16 | private-practice-tax-nhs-and-private-income | ⬜ todo | | |

## Session B pages (15 assigned)

| # | Slug | Status | Date | Notes |
|---|---|---|---|---|
| B1 | accountant-self-assessment | ⬜ todo | | |
| B2 | gp-accountant-birmingham | ⬜ todo | | |
| B3 | gp-accountant-edinburgh | ⬜ todo | | |
| B4 | gp-accountant-liverpool | ⬜ todo | | |
| B5 | gp-accountant-newcastle | ⬜ todo | | |
| B6 | gp-accounting-guide | ⬜ todo | | |
| B7 | gp-corporation-tax | ⬜ todo | | |
| B8 | gp-limited-company-tax-benefits-drawbacks | ⬜ todo | | PILLAR |
| B9 | gp-partnership-tax-complete-guide | ⬜ todo | | PILLAR |
| B10 | gp-tax-advice | ⬜ todo | | |
| B11 | gp-vat-registration | ⬜ todo | | |
| B12 | locum-doctor-limited-company-pros-and-cons | ⬜ todo | | |
| B13 | locum-doctor-umbrella-company-2026-reforms | ⬜ todo | | |
| B14 | nhs-pension-annual-allowance-complete-guide | ⬜ todo | | PILLAR |
| B15 | nhs-pension-tax-charges-how-to-minimize | ⬜ todo | | |

## Session C pages (15 assigned)

| # | Slug | Status | Date | Notes |
|---|---|---|---|---|
| C1 | becoming-gp-partner-financial-implications | ⬜ todo | | |
| C2 | gp-accountant-bristol | ⬜ todo | | |
| C3 | gp-accountant-glasgow | ⬜ todo | | |
| C4 | gp-accountant-london | ⬜ todo | | |
| C5 | gp-accountant-services-complete-guide | ⬜ todo | | PILLAR |
| C6 | gp-accounting-software | ⬜ todo | | |
| C7 | gp-financial-planning | ⬜ todo | | |
| C8 | gp-partner-vs-salaried-gp-tax-comparison | ⬜ todo | | |
| C9 | gp-payroll-services | ⬜ todo | | |
| C10 | gp-tax-deductions-complete-list-2026 | ⬜ todo | | PILLAR |
| C11 | locum-doctor-expenses-what-you-can-claim | ⬜ todo | | |
| C12 | locum-doctor-self-assessment-filing-guide | ⬜ todo | | |
| C13 | medical-practice-incorporation-step-by-step | ⬜ todo | | PILLAR |
| C14 | nhs-pension-for-locums-form-a-form-b | ⬜ todo | | |
| C15 | nottingham-gp-accountant | ⬜ todo | | |

## How to update this file safely

- Each session edits only rows in its own table.
- One status change per edit: `🟡 in_progress` when starting, `✅ done` when build passes + FAQ schema verified.
- Do NOT edit other sessions' tables.
- Each session is on its own git worktree + branch, so writes to this tracker happen from the main repo (open `docs/medical/page_rewrite_tracker.md` from `Accounting/`, not from your worktree) to avoid divergent copies.
