# PACK N1: net-new — accountant for taxi and private-hire drivers (spine hub)

Derived 2026-08-25 from FROZEN dossier `../trades_transport_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **service-choice hub-led**). Head page of the 3-page taxi
spine (N1 hub -> N2 SA/expenses/MTD -> N3 VAT), the right-sized replacement for C2's "hub 12-15"
shape (dossier §6, owner question 3).

## 1. Target and permission level

- NET-NEW page, sole-trader blog family. Proposed slug: `accountant-for-taxi-drivers-uk`
  (writer may refine; must resolve via `slug_resolver` conventions). The site currently has NO
  taxi page: the highest-volume niche in the cluster has no seed (dossier §1).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy it enters
  `monitored_pages` as a new surface.
- Shape: specialist service hub. Every harvested specialist runs a dedicated drivers page;
  gondal holds p1 on the head term with one.

## 2. Equity register

None (net-new). Must NOT poach: gig-status Q&A (E1's ground), SA/expenses/MTD depth (N2),
VAT depth (N3). The hub states each in one paragraph and links out.

## 3. Market keyword slice (ledger, T-TAXI, 580/mo, peer-winnable 330)

| Keyword | Vol/mo | Domains | Best peer |
|---|---|---|---|
| taxi accounts | 140 | 1 | livingstones p14 |
| accountant for taxi drivers | 110 | 4 | gondal p1, lanop p9 |
| accounting for taxi drivers | 110 | 3 | gondal p9 |
| accounts for taxi drivers | 110 | 3 | livingstones p15 |
| taxi driver accountants | 110 | 3 | gondal p9, livingstones p13 |

## 4. Competitor teardown (head-term top ranker, fetched 2026-08-25)

`gondalaccountancy.co.uk/accountants-for-drivers` — p1 on `accountant for taxi drivers`.
Title "Accountants for Taxi & Private Hire Drivers | Fixed Fees", ~5,500w single page spanning
all driver types, 13 H2s + 15-18 FAQ pairs, all figures current (£12,570, £1,000, £90,000,
correct MTD dates). Gaps we exploit: **no worked example, no sole-trader vs ltd-co figures, no
licence-renewal tax-check treatment beyond a mention, one page trying to rank for every driver
type at once** (we run a spine instead), em-dashes throughout. lanop's rival page (p9) is a
slogan-led brochure with no figures.

## 5. Whitespace (§18 lets us own)

- **The licence-renewal tax check done properly (§18.3):** FA 2021 Sch 33 conditionality;
  England and Wales from 4 April 2022, Scotland and NI from 2 October 2023; renewal (or
  re-application after a year's lapse) needs an HMRC tax check code, **valid 120 days**; the
  council sees pass/fail, not your tax affairs; first-time applicants only confirm awareness.
  No fetched competitor explains this properly, and it is the single most concrete "why a taxi
  accountant" hook in the niche.
- The hub-spine architecture itself: one clean head page linking real depth (N2, N3, E1) beats
  gondal's everything-page for every non-head query.
- Current 2026/27 figures with a one-line worked hook (full example lives on N2).

## 6. Fences (binding)

- §18.3 wording: the check confirms tax registration; never imply HMRC blocks licences for tax
  DEBT disputes or that the council audits drivers. Date-tag by nation, give the 120-day validity.
- §18.2 one-line fence if Uber is named (worker status is employment law, not tax); depth stays
  on E1. §18.4 one-line fork maximum; depth stays on N3.
- Intra-spine assignment is hard: no SA walkthrough H2s (N2), no VAT question H2s (N3), no
  gig-status H2s (E1). Cite §2, §7, §12, §17, §18 by number. No em-dashes.
- C1 row 64 CLEAR: licensing bites the driver; describe, never advise on licensing law.

## 7. Acceptance criteria (deterministic)

1. Queries answerable: all 5 §3 keywords in metaTitle/H1/H2/FAQ/body; "what does a taxi
   accountant do"; "tax check code for taxi licence renewal" (+ 120 days figure); sole trader
   vs limited one-paragraph answer.
2. Figures, recomputable: £1,000; 5 October; £90,000; 55p/25p from 6 Apr 2026 (§12) with the
   §18.6 stick-rule sentence; tax-check dates 4 Apr 2022 / 2 Oct 2023 / 120 days.
3. Links: N2, N3, E1 all linked from body prose; resolver-clean; all §4 floors + coverage pass.
4. No H2 duplicating an N2/N3/E1 H2 phrasing (language_spec §4).

## 8. Expectation

Winnable: 4 domains rank, best incumbent p1 is a generalist-drivers page not a taxi page; peers
hold p9-p15 with thinner pages. Realistic: Google top-10 on 2+ of the 5 head phrasings within a
quarter of indexing; Bing earlier. Maturity caveat: net-new, "maturing, revisit ~a quarter";
poor position at 28d is immaturity, not a gap. Failure trigger: zero impressions on all 5 head
phrasings at 90d post-index.
