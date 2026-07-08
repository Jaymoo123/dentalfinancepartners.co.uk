# Wave 10 page tracker

**Created:** 2026-07-08. **Status:** Pre-launch (all 12 picks todo). Wave 10 = 12 net-new pages (2 dropped at cannib gate), SINGLE lane (owner ruling 2026-07-08: no A/B/C buckets, batchSize 1, one sub-agent per pick in parallel). Source: gap discovery 2026-07 batch, collision-verified vs live corpus (15 dupes already rejected pre-wave). A1 is the wave's only PILLAR (portfolio landlord tax planning) â€” pillar ruling at PREP before cluster briefs launch.

Tracker columns: status | pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** [ ] todo / [~] in progress / [x] done / [!] blocked / [<] needs back-patch.

**Discipline reminder (engine Â§6):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave10_page_tracker.md`. NEVER commit tracker edits on a worktree branch. Q&A files use same absolute-path discipline.

---

## Session A â€” single lane: gap discovery 2026-07 batch (14 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| [x] | A1 | portfolio-landlord-tax-planning-strategy-guide | portfolio-management | ~3,900 | 12 | | RUN done 180c30ba 2026-07-09; ATED 2026/27 verified gov.uk; F-81/F-82/F-83 raised |
| [x] | A2 | business-asset-disposal-relief-residential-property-qualification | capital-gains-tax | 3059 | 13 | | SHA 01e8c94b; written 2026-07-09; F-62 open (HMRC BADR URL 404 at write time, HP §5.A governs) |
| [x] | A3 | non-resident-landlords-uk-inheritance-tax-exposure | non-resident-landlord-tax | 3035 | 12 | | SHA 8b50c149; written 2026-07-09 |
| [x] | A4 | vat-property-conversions-residential-reduced-rate-opted-to-tax | property-types-and-specialist-tax | ~3,643 | 13 | | WRITTEN 82c9b040; Sch 7A Grp 6/7 boundary verified; Sch 8 Grp 5 Note (7)(b)/(9) verified; OTT trap + CGS clawback + DIY s.35 covered; companion cross-link confirmed live |
| [x] | A5 | property-income-allowance-1000-exemption-vs-expenses | landlord-tax-essentials | ~3,100 | 12 | | WRITTEN b72ce87b; s.783BM rent-a-room gate confirmed; all statute verified via legislation.gov.uk |
| [!] | A6 | profit-extraction-buy-to-let-limited-company-salary-dividends | incorporation-and-company-structures | 2869 | 13 | | SHA 211ebedb; RUN done 2026-07-09; FA 2026 s.4 rates verified; s.455 verbatim quoted; A1 pillar link wave-internal (noted in page); cannibalisation check clear (sibling pages lack profit-band tables + DLA exhaustion narrative) |
| [x] | A7 | starting-property-business-sole-trader-vs-ltd-vs-partnership | incorporation-and-company-structures | 5478 | 13 | | 97b4445f; RUN done 2026-07-09 |
| [x] | A8 | cgt-on-inherited-property-uk-probate-base-cost | capital-gains-tax | 3088 | 13 | | 913657bd; RUN done 2026-07-09 |
| [x] | A9 | cgt-overseas-property-uk-residents-foreign-disposals | capital-gains-tax | ~3,100 | 12 | | WRITTEN 5bef4b9a; Bentley v Pike / CG78310 FX verified; 0 em-dashes, 0 s.252 refs; SA108+SA106 reporting; FTCR TIOPA 2010; companion link confirmed live (nested path) |
| [x] | A10 | family-investment-company-mechanics-share-classes-property | incorporation-and-company-structures | 3522 | 13 | | SHA 4efb0fd9; pillar link wave-internal (may not exist in worktree); 3 asides; F-42 confirmed (s.630 cited, s.629 not cited for variation) |
| [x] | A11 | gifting-property-and-deed-of-gift-tax-implications | capital-gains-tax | 3210 | 12 | | SHA 39535a5b; F-11 CLOSED §1.P applied; F-52 CLOSED (IHT 7yr page exists, nested link added); 3 asides; GROB + SDLT worked examples |
| [x] | A12 | buying-commercial-property-through-a-sipp | portfolio-management | ~3,150 | 12 | | SHA f63641f6; written 2026-07-09; F-22 resolved in body |
---

## Sequencing constraints

- **A1 (portfolio landlord pillar)** gets its pillar ruling at PREP; cluster pages that reference whole-portfolio strategy (A12 FIC mechanics, A7 profit extraction) should link INTO A1.
- **Non-resident pair:** A3 (NRL IHT) and A11 (CGT overseas property for UK residents) are opposite flows â€” writers must read each other's briefs to avoid scope bleed.
- Everything else standalone; no strict ordering. batchSize 1 = every pick is its own batch.

## Pre-launch checklist (manager)

- [x] Topic batch committed + collision-verified (blog_topics, status='pending')
- [x] picks.yaml written (briefs/property/wave10/picks.yaml)
- [x] Cannibalisation audit reviewed: A4 + A8 dropped as duplicates (Sch 15 page + pre-letting page already cover them); A2 kept (qualification-rules framing)
- [ ] Stage 1 seed briefs
- [ ] Stage 1b HP-lock sign-off (new sections needed: NRL IHT situs, FA 2003 Sch 15 SDLT partnership transfer â€” extend Â§11.C, VATA Sch 8 Grp 5 conversion VAT â€” extend Â§29, s.57 ITTOIA pre-trading)
- [ ] Stage 2 full briefs + Stage 2b drift sign-off
- [ ] RUN





