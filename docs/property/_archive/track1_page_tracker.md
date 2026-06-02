# Property Track 1 — page rewrite tracker (first wave)

**Last consolidated update:** 2026-05-22 (orchestrator pre-launch setup)

**Total pages this wave:** 31
**Complete:** 25 · **In progress:** 4 · **Remaining:** 2 · _(Session B complete — all 8 of B1–B8 shipped)_
**Sessions running:** 3 parallel (A, B, C) — see `docs/sessions/property/TRACK1_SESSION_{A,B,C}_START_HERE.md`

Track 1 = NEW pages we don't yet have. Source: `docs/property/topic_gaps_final.md`. The full Track 1 universe is 429 net-new pages; this wave is the highest-priority subset (top buckets — SDLT, Ltd Co, VAT, FIC, ATED). Subsequent waves will follow.

## Status legend

- ✅ done — page written, built, FAQ schema verified, tracker updated, redirect set (if applicable)
- 🟡 in_progress — a session has claimed the page and is actively writing it (timestamp in UTC at claim time so stale claims can be detected; >4h stale + no decisions logged = abandonable)
- ⬜ todo — not yet started
- 🚫 skip — discovered to be a duplicate or no longer warranted (reason in Notes)

## Coordination rules

1. **Only edit your own assigned rows.** If a page is in your session's table below, you edit it. If not, do NOT touch.
2. **Claim ONE page at a time.** Mark `🟡 in_progress` with the UTC timestamp at claim time. Complete the page (or release the claim) before claiming the next.
3. **Mark `✅ done` immediately after build passes** and FAQ schema count matches frontmatter + redirect repointed (if applicable).
4. **Stale claim detection:** if a `🟡 in_progress` row is older than 4 hours and the brief's work-log section shows no decisions logged, the next agent can take it over (read the brief work-log to see if anything's salvageable first).
5. **If a page genuinely shouldn't exist** (becomes obviously duplicative of something else as you research), mark `🚫 skip` with a 1-line reason and flag in `docs/property/track1_site_wide_flags.md`.

## Worktree map

| Session | Worktree | Branch |
|---|---|---|
| A | `C:/Users/user/Documents/Accounting-wt-property-track1-a/` | `property-track1-a` |
| B | `C:/Users/user/Documents/Accounting-wt-property-track1-b/` | `property-track1-b` |
| C | `C:/Users/user/Documents/Accounting-wt-property-track1-c/` | `property-track1-c` |

Tracker, flags, and house positions live in the **main repo** (`Accounting/`). All three sessions edit the tracker via the main path.

## Pre-flight (orchestrator-completed)

- `docs/property/house_positions.md` — locked factual positions across SDLT / ATED / MTD / S24 / CGT / FHL / 2027 surcharge / LTA-replaced / IHT / DTAs / Companies House / RRA
- `briefs/property/track1/<slug>.md` — 31 per-page research-package briefs (research inputs + framing differentiator, NO prescribed outline)
- `docs/property/topic_gaps_final.md` — full 429 net-new candidate list (this wave is a 31-page subset; subsequent waves draw from the same source)
- `docs/property/topic_gaps_redirect_overlap.md` — redirect-overlap candidates per slug (referenced in individual briefs)
- 3 git worktrees set up
- `Accounting/optimisation_engine/analysis/detectors.py` already runs the monitored_pages regression detector weekly (Track 1 pages should be added to `monitored_pages` on launch — flagged in each brief)

---

## Session A pages (10 assigned — SDLT depth)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| A1 | sdlt-5-percent-surcharge-refund-claim-process | ✅ done | 2026-05-22T00:25Z | Process-focused page: 4 statutory conditions, gov.uk claim steps, SDLTM09807 exceptional circumstances, 6 failure modes, 28-month worked timeline; 13 FAQs |
| A2 | sdlt-six-dwellings-non-residential-election | ✅ done | 2026-05-22T01:25Z | Mechanics + £284k worked saving on £3m nine-flat acquisition; 6 traps; decision matrix vs partnership/sub-sale routes; 13 FAQs. HOUSE_POSITION_CONFLICT flagged on Sch 6B para 7 vs s.116(7) FA 2003. |
| A3 | sdlt-sub-sale-relief-mechanics | ✅ done | 2026-05-22T02:30Z | Clarification piece on s.45 FA 2003; separates genuine pre-completion use from incorporation myth; off-plan worked example; 11 FAQs; ~2,718 body words (M-4 calibrated). |
| A4 | sdlt-shared-ownership-staircasing | ✅ done | 2026-05-22T11:45Z | Decision-framework: market-value election vs pay-in-stages; 80% trigger; full 25/50/80 worked comparison; HRAD + non-resident surcharge interactions; 11 FAQs; 2,919 body words. |
| A5 | sdlt-group-relief-for-corporate-landlord-portfolios | ✅ done | 2026-05-22T12:30Z | s.62 + Sch 7 FA 2003 group relief; 4 conditions; 75% test; 3-year clawback; 4-SPV worked restructure; 12 FAQs; 2,858 body words |
| A6 | sdlt-on-probate-property-transfers | ✅ done | 2026-05-22T13:00Z | Five-category taxonomy (assents/variations/legacy discharge/PR sales/buy-outs) + Sch 6A property-trader relief + Patel-estate worked example; 11 FAQs; 3,230 body words. Category overridden from CGT → landlord-tax-essentials (rationale in work-log). |
| A7 | sdlt-non-resident-2-percent-surcharge | ✅ done | 2026-05-22T13:30Z | Sch 9A FA 2003 mechanics; 183-day test; surcharge stack; close-co carve-in; returning-expat worked example; refund route; 11 FAQs; 2,819 words |
| A8 | sdlt-refund-scams-how-to-avoid | ✅ done | 2026-05-22T14:00Z | Consumer-protection piece: 5 scam angles (mixed-use/MDR/6-dwellings/uninhabitable/annexe) with tribunal authority (Hyman, Goodfellow, Pensfold, Fiander, Mudan, Bewley) + 4 real refund routes table + 8 red flags + engagement-letter cancellation playbook + post-refund discovery exposure; 11 FAQs; 2,859 body words |
| A9 | sdlt-mixed-use-property-classification | ✅ done | 2026-05-22T14:30Z | Case-law walkthrough: s.116 FA 2003 + SDLTM00390 + Hyman (FTT+UT) + Goodfellow + Pensfold + Horton Hall + Withers; 5 evidential pillars; Mawell-Estate worked example £294,500 saving; 3 borderline scenarios; 11 FAQs; 2,890 body words |
| A10 | sdlt-leasehold-extension-vs-fresh-purchase | ✅ done | 2026-05-22T15:00Z | Extension SDLT mechanics: s.43+Sch 17A FA 2003 surrender-and-regrant, LRHUDA 1993 + LFRA 2024 marriage-value abolition, £40k HRAD trap, Priya-Wandsworth worked comparison (~£35k cheaper than sell-and-rebuy), collective enfranchisement, Archer LBTT case, CGT recovery, 4 common errors; 12 FAQs; 2,909 body words |

## Session B pages (8 assigned — Limited company / BTL operation)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| B1 | director-loan-account-property-company-mechanics | ✅ done | 2026-05-22T09:35Z | Mechanics-first: s.455 + 9-month clock + s.464C bed-and-breakfast + £10k BIK + £200k credit DLA worked example; 13 FAQs |
| B2 | property-company-group-relief-corporation-tax | ✅ done | 2026-05-22T09:59Z | SPV-portfolio-applied: 75% test (s.151 CTA 2010) + s.99 surrenderable amounts + worked 4-SPV refurb-year saving + s.171A capital-loss mechanism; 12 FAQs. Manager fix-up commit a326b1f at 2026-05-22T13:30Z: corrected CIHC framing per s.18N carve-out for unconnected-tenant land investment (per Session B FACTUAL flag); worked example now uses marginal relief (£15,075 saving) rather than flat 25%. |
| B3 | substantial-shareholding-exemption-property-companies | ✅ done | 2026-05-22T10:13Z | Sch 7AC TCGA 1992: 10%/12mo test + trading-vs-investment dividing line + £1.5m saving on £8m DevCo share-sale worked example; 11 FAQs; 2,673 body words. Brief cited s.192A; corrected to Sch 7AC. No flags. |
| B4 | corporation-tax-marginal-relief-property-companies | ✅ done | 2026-05-22T10:19Z | Mechanics-first: assoc-co squeeze (£50k/£250k ÷ N), s.18N CTA 2010 CIHC carve-out (connected-party lets only), worked standalone vs 5-SPV example, FII augmented profits, 5 failure modes; 12 FAQs; 2,788 body words. FACTUAL flag raised on B2 CIHC overstatement. |
| B5 | transferring-fhl-portfolio-to-limited-company | ✅ done | 2026-05-22T10:26Z | Post-abolition decision-framework: S24 + BADR loss + pension link broken; s.162 / Ramsay test; SDLT+5% surcharge; ATED; 2027 surcharge maths; 3-cottage Devon worked example with £9,150/yr saving; 12 FAQs; 2,652 body words. No flags. |
| B6 | incorporating-hmo-portfolio-to-limited-company | ✅ done | 2026-05-22T10:31Z | HMO-specific: common-parts CA (CAA s.35), narrower ltd-co HMO mortgage market, licence transfer (Housing Act 2004 s.72 criminal risk), Ramsay s.162 stronger case, 3-house Leeds worked example £13,200/yr saving + 7-8yr payback; 12 FAQs; 2,989 body words. No flags. |
| B7 | extracting-money-from-property-limited-company | ✅ done | 2026-05-22T10:37Z | Comparison: salary (LEL post-2025 NIC) + dividends + employer pension + DLA repayment; 3-strategy worked example £40k from £150k profits showing pension-route best; buyback/capital reduction/MVL briefly; 12 FAQs; 2,754 body words. No flags. |
| B8 | close-investment-holding-company-property | ✅ done | 2026-05-22T10:43Z | Definitive CIHC page: s.18N qualifying-purpose carve-out for unconnected-party lets, s.1122 connected-person definition, 3 boundary examples, BPR/Pawson IHT note; 12 FAQs; 2,669 body words. Resolves B2 framing issue. |

## Session C pages (13 assigned — VAT + FIC + ATED)

| # | Slug | Status | Claimed at (UTC) | Notes |
|---|---|---|---|---|
| C1 | domestic-reverse-charge-construction-vat-landlords | ✅ done | 2026-05-22 10:18 UTC | VAT bucket. 3527 words, 13 FAQs. Two-audience structure (end-user landlords + CIS-chain developers), three worked scenarios. No flags. |
| C2 | toms-vat-serviced-accommodation | ✅ done | 2026-05-22 10:23 UTC | VAT bucket. 3038 words, 13 FAQs. Post-Sonder UT (Mar 2024) taxonomy: 3 still-qualifies models + 3 now-outside; £1.2m worked example showing £160k/yr swing. No flags. |
| C3 | vat-on-new-builds-residential-property | ✅ done | 2026-05-22 10:28 UTC | VAT bucket. 3023 words, 13 FAQs. Three-band rate matrix (zero/5%/20%); Astral Construction Ltd substantial-reconstruction boundary; £2m greenfield worked example with VAT 1614D + BTR workaround. No flags. |
| C4 | togc-vat-property-letting-business | ✅ done | 2026-05-22 10:32 UTC | VAT bucket. 3255 words, 14 FAQs. Five conditions; option-to-tax notification dominant failure mode; £5m commercial-let worked example (£1m VAT + £50k SDLT saving). No flags. |
| C5 | diy-housebuilders-vat-refund-scheme | ✅ done | 2026-05-22 10:38 UTC | VAT bucket COMPLETE. 2912 words, 13 FAQs. s.35 VATA 1994 + Dec 2023 deadline extension (3→6 months) + rejection-pattern breakdown + £450k Devon worked example showing £24,650 refund. No flags. |
| C6 | fic-complete-guide-property-wealth-transfer | ✅ done | 2026-05-22 10:43 UTC | FIC comprehensive ref. 3845 words (M-3 C6 band 3.5k-4.5k), 14 FAQs. Entity → share classes → funding → life/death → governance → enquiry; BPR myth + April 2026 cap. INTERNAL_LINK flag raised for back-link from existing FIC page. |
| C7 | fic-vs-discretionary-trust-property-comparison | ✅ done | 2026-05-22 10:55 UTC | FIC daughter. 3373 words, 13 FAQs. 6-axis comparison + £3m portfolio 20-yr worked example showing ~£900k tax-cost gap; IHT entry charge as principal driver. No flags. |
| C8 | fic-growth-shares-and-freezer-shares-design | ✅ done | 2026-05-22 11:01 UTC | FIC daughter. 3571 words (71 over band), 13 FAQs. Hurdle-setting + Black-Scholes valuation + s.431 ITEPA election + 6 common design mistakes + Singh £3m worked example showing dividend-coupon trap. No flags. |
| C9 | fic-iht-treatment-bpr-myth | ✅ done | 2026-05-22 11:08 UTC | FIC daughter, SESSION C COMPLETE. 3513 words, 13 FAQs. Pawson v HMRC + April 2026 £1m cap + structural-mechanism analysis showing £1.24m worked IHT saving from growth-share + PETs (not BPR). No flags. |
| C10 | ated-complete-guide-2026-27 | ✅ done | 2026-05-22 09:35 UTC | PILLAR. 4316 words, 13 FAQs, 2026/27 bands from gov.uk, no flags raised |
| C11 | ated-rental-property-relief-mechanics | ✅ done | 2026-05-22 09:58 UTC | Daughter of C10. 3483 words, 13 FAQs. s.133 FA 2013 + s.1122 CTA 2010 connected-person test + 3-year worked example (£1.5m Wandsworth BTL). No flags. |
| C12 | ated-15-percent-flat-rate-sdlt-interaction | ✅ done | 2026-05-22 10:06 UTC | Daughter of C10. 3700 words (200 over ceiling, 3 worked examples justify), 12 FAQs. Sch 4A FA 2003 + s.81ZA clawback + 3-year window. M-1 corrected s.116(7) used in FAQ. No flags. |
| C13 | ated-late-filing-penalties-mechanics | ✅ done | 2026-05-22 10:12 UTC | Daughter of C10. 3540 words, 13 FAQs. Sch 55/56 FA 2009 + Sch 24 FA 2007. Category OVERRIDDEN to incorporation-and-company-structures (was landlord-tax-essentials) for ATED cluster coherence. No flags. |
