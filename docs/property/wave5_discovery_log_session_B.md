# Wave 5 discovery log — Session B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)

Append-only. Each entry uses format `D-N | YYYY-MM-DD HH:MMZ | TAG | summary` plus optional sub-bullets.

Tags: ADJACENT_TOPIC, CALCULATOR_IDEA, COMPONENT_IDEA, EXISTING_PAGE_STALE, EXISTING_PAGE_LINK_OPPORTUNITY, AUTHORITY_GAP, CROSS_NICHE_LINK.

Discoveries do not block forward progress. Manager reads at wave end; feeds future waves + Track 2 sweep.

---

(Note: the prior Session B continuation's D-1 through D-8 entries were written to the worktree's copy of this file rather than to main, per the §16.15 violation acknowledged in the manager Q-1 answer. Manager will fold those in on reconciliation. New Session B entries from this point onward go to main per the §16.15 mandate.)

### D-9 | 2026-05-23 19:55Z | CALCULATOR_IDEA | Welsh/English/Scottish FTB cost-comparator widget

B4's four-jurisdiction comparison table (£200k/£225k/£275k/£350k/£425k) surfaces a structurally interesting cross-over: Welsh FTBs pay less than English FTBs at most price points below £275k (because Welsh £225k nil sits above English £125k main nil and absorbs the bulk of starter purchases), but English FTBs pay materially less in the £275k-£500k range (because English £300k FTB nil + 5% taper beats Welsh 6% second band). Scottish FTBs sit in between via the £175k+£600 mechanic. A dedicated cross-jurisdictional FTB cost-comparator widget under /calculators (price input + jurisdiction-of-purchase input → three-side-by-side cost output) would serve cross-border families and returning-expatriate buyers materially better than the current four-nation table at the foot of the page. Low priority; feeds the calculators roadmap.

### D-10 | 2026-05-23 19:55Z | ADJACENT_TOPIC | Dedicated SDLT FTB relief page absent on site

B4 forward-links to `sdlt-buy-to-let-rates-surcharge-guide-2025` as the entry point for the English FTB regime, because that pillar is the only on-site page covering FTB relief at all. The FTB-specific mechanic under FA 2003 Sch 6ZA (eligibility, joint-buyer test, intention-to-occupy, replacement-purchase rule, claim mechanics, common HMRC enquiry patterns) does not have its own dedicated page. Cross-jurisdictional pairs are now skewed: Wales (B4) + Scotland (B8) get their own FTB-position pages in Wave 5, but England remains FTB-covered only as part of the broader BTL surcharge pillar. Future-wave candidate: SDLT FTB relief depth page to round out the three-jurisdiction trio.

### D-11 | 2026-05-23 20:30Z | BRIEF_ERROR | B5 brief cited wrong LTTA 2017 section for return amendment

The B5 brief (`briefs/property/wave5/welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics.md` line 71 area) cited "LTTA 2017 ss.34-35" and "Tax Collection and Management (Wales) Act 2016" for the return-amendment / refund time limits. WebFetch of legislation.gov.uk/anaw/2017/1/section/34 at write time confirms LTTA 2017 s.34 is "Unit trust schemes", not amendment. The correct citations all sit in TCMA 2016: s.41 (12-month amendment from filing date), s.63 (overpayment relief mechanic), s.78 (4-year time limit for claims under ss.62-63). B5 uses the correct citations on-page. Implication for future Welsh-LTT briefs: when citing return amendment / refund mechanics for Welsh LTT, the citations are TCMA 2016 not LTTA 2017 (LTTA 2017 covers the substantive tax; TCMA 2016 is the procedural framework that WRA operates under). Suggested brief-template fix: replace "LTTA 2017 s.34" with "TCMA 2016 s.41" and add "TCMA 2016 s.63 + s.78" for the longer overpayment window.

### D-12 | 2026-05-23 20:30Z | AUTHORITY_GAP | gov.wales/repay-higher-rates-land-transaction-tax returns 404

The brief listed `gov.wales/repay-higher-rates-land-transaction-tax` as an authority URL for "LTT refund and amendment guidance". WebFetch at write time returned HTTP 404. Likely a recent gov.wales URL restructuring (similar pattern to D-7 from prior session on gov.wales MDR pages). B5 falls back to the gov.wales calculation technical guidance and to the TCMA 2016 statutory sections directly. Manager-level: gov.wales URL drift now flagged across 3 Welsh-LTT pages (D-7 MDR + D-12 refund); worth a systematic re-scan of brief-template gov.wales URLs before Wave 6 prep if any future Welsh-LTT bucket is planned.
