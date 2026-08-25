# PACK R3: accountant-for-musicians-uk — REFRAME (royalties P-ROY folded in)

Derived 2026-08-25 from FROZEN dossier `../creative_performers_2026-08-25.md` only. Reads with `language_spec.md` (lead structure: **example-led**, a working musician's year as the spine, plus one royalties table).

## 1. Target and permission level

- Page: `generalist/web/content/blog/accountant-for-musicians-uk.md`. No URL change.
- Grade: **REFRAME** (Google 0 / 30 / 10.8; Bing 0/0). metaTitle, H1, H2s, body, FAQ all changeable.
- P-ROY (royalties tax/VAT, 5 kws, 250/mo) is folded in as an H2 + FAQ section, never a separate page (dossier §3). A second musicians page is explicitly NOT built.
- Revert path: git revert; baseline at deploy. Frozen-ground check against live `monitored_pages` first.

## 2. Equity register (do not lose)

30 Google impressions at pos 10.8, no named queries surfaced in GSC 90d. The page's existing royalty/tour/IR35 coverage themes are the presumed impression carriers: keep royalties, touring/foreign tax, and company-structure coverage present (they may be restructured).

## 3. Market keyword slice (ledger, P-MUS + P-ROY)

| Keyword | Vol/mo | Domains | Best peer |
|---|---|---|---|
| musician accountant | 140 | 6 | weareband p4 |
| music accountants | 140 | 6 | srlv p1, rsbc p8 |
| musician accountants | 110 | 6 | — |
| accountants for music industry / accounting for music industry | 70 each | 6/5 | — |
| music industry accountants / accounting | 70 each | 6 | — |
| accounting in (the) music industry | 70 each | 5/6 | — |
| accountant/accountants/accounting for musicians | 50 each | 5-6 | weareband p7 |
| P-ROY: income from royalties / royalty accounting / vat on royalties / vat on royalty / vat on royalty payments | 50 each | 1-2 | srlv p2 (royalty accounting), performanceaccountancy p16 (vat on royalties) |

Assigned 1,210/mo incl. royalties; all P-MUS peer-winnable.

## 4. Competitor teardown (head-term top rankers)

- `weareband.co.uk/expertise/music/` — p4 `musician accountant`, p7 `accountant for musicians`. ~1,100 words, thin H2 set ("What can we do for you?", business management list). Pure service brochure: PRS claims, royalty management, tour expenses, VAT named but never explained. No FAQ, no figures, no examples. It ranks on domain relevance, not content.
- `performanceaccountancy.co.uk/knowledgebase/how-to-treat-royalties-...` — p16 `vat on royalties`. 650 words, one comparison table (PPL/PRS/licensing x taxable/VAT/threshold). Note: it asserts "PPL income does not count toward your VAT threshold"; our §15 position is that UK royalty income is standard-rated and counts toward £90,000 — the writer must follow §15, flag the discrepancy to QA, and not copy their line.

Gap across all six ranking domains: nobody explains royalties + VAT + self-billing + touring inside one substantive musician page with figures.

## 5. Whitespace (§15)

- The full royalties position: trading income of the profession (not investment income); s.579 only for non-professional holders; post-cessation receipts; overseas royalties gross + treaty relief, hedged to "check the DTA".
- VAT: royalties standard-rated, count toward £90,000 (the "gig income plus growing royalties crosses it unnoticed" warning); PRS/PPL self-billing does not remove the duty to account for output VAT.
- Current-year figures throughout; competitors carry none at all.

## 6. Fences

- House §15 wording locks: never "royalties are always taxed the same way regardless of who receives them"; never assert a specific foreign withholding rate; cite "HMRC's Business Income Manual" generically (BIM paragraph numbers not yet verified, §15 open question).
- §16 governs any employment-status mention (orchestral players can be employees; entertainer Class 1 regime ended 6 Apr 2014). §12 for touring travel. Cite §15, §16, §2, §7, §12 by number.
- No em-dashes. Royalties = section, never a new page.

## 7. Acceptance criteria

1. Queries answerable: "musician accountant / accountant for musicians" (H1/metaTitle), music industry accounting phrasings (H2s/body), how are music royalties taxed, is VAT charged on royalties, do PRS/PPL payments count toward VAT registration.
2. Figures, recomputable: £90,000 VAT threshold; 2026/27 rates per §2 in one worked example (a musician's year: gig income + PRS royalties + a sync fee, computed to tax/NIC, VAT-threshold check shown); £1,000 trading allowance where side-income framing appears.
3. Royalties H2 carries a table (source x income-tax treatment x VAT) consistent with §15.
4. Links: to R4, E1, VAT-registration and sole-trader hubs; resolver-clean; all floors + equity floor pass.

## 8. Expectation

Pos 10.8 with real impressions = the cluster's strongest reframe base. Target: top-5 on `musician accountant`/`accountant for musicians` within a quarter (incumbents above us are thin brochures), plus first rankings on the royalties tail. Failure trigger: impressions below 15/90d or pos worse than 20 at 90d Google (that is equity loss, revert per `blog_optimizations` trail).
