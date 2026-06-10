# Wave 4 Session B discovery log (MTD ITSA operational)

Append-only. Observations / future-wave hooks / research items / patterns.

---

## 2026-05-23 — B1 (joint-property-owners quarterly-filing mechanics)

- **fhpaccounting.co.uk "quarterly gross-only easement" claim, NOT verified.** fhpaccounting article on jointly-owned MTD states *"Those who choose to take this easement will be allowed to report their share of gross income only on the quarterly returns"* (full expense detail deferred to the annual return). Independent verification against `https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax` returned "no such easement found in the guidance" — but the URL the WebFetch saw was the TOC-only view. The easement may be in the HMRC operating notice (the equivalent of VAT Notice 700/22) which is not the same URL. **Research item for B10 (digital records) and B8 (spreadsheet/bridging):** verify whether HMRC's MTD ITSA operating notice carries a joint-owner gross-only quarterly easement. If yes, write it into both B10 + B8 + back-patch B1 with the easement caveat. If no, log as a common competitor-page error pattern.
- **Provestor's data-model insight is generalisable:** software that records the full transaction amount and applies the ownership-percentage automatically at submission stage is the data-model pattern most joint-owner-friendly products use. B2 (software decision tree) could surface this as a "joint-owner-handling" decision-tree branch, as one of the dimensions landlords filter on.
- **rentalbux + ukpropertyaccountants both explicitly use "no nominated submitter" or "no nominated filer" phrasing.** This is the FAQ-rank query landlords are searching. B1 picked up the exact "no nominated-filer rule" phrasing. B2 / B6 (letting agent) should also use it.
- **Boundary discipline held cleanly:** Wave 3 B3 (threshold-split) is the threshold-test sibling; B1 stays out of threshold arithmetic except in the scenario-walk setup figures. No back-patch flag raised on B3. Pattern for the rest of Bucket B: lean on Wave 3 siblings via cross-link; do not re-walk their content.

---

## 2026-05-23 — B2 (software decision tree by landlord scenario)

- **Anti-listicle framing held cleanly via explicit framing in the intro.** "We are a tax firm, not a software reseller" anchors the reader before any decision-tree content lands; existing product-listicle pages (best-mtd-software-landlords-2026, landlord-accounting-software-uk-best-options-2026, mtd-software-landlords-free-vs-paid-options-compared) are framed as legitimate companions for users who want named picks, NOT as competing content. Pattern for Wave 4 anti-listicle bucket: lead with the WHY-NOT-A-LISTICLE position before the framework lands.
- **rentalbux.com's "what 'free' actually means" 5-criterion framework is genuinely good material.** Banking dependency / operational caps / feature scope / permanence / upgrade-ramp. Lifted directly into the Pricing-Traps H2. Worth flagging for B10 (digital records) and any future "MTD software practical operation" content to reuse.
- **Forward-cross-link to B8 (spreadsheet + bridging) is one inline reference in Q3.** Left as a plain-text "our forthcoming spreadsheet-plus-bridging page" reference, not a hyperlink, to avoid a broken internal link until B8 commits. Manager / I will back-patch the link in once B8 lands.
- **Two competitor URLs (rentalbux.com QuickBooks-vs-FreeAgent + the 3rd ukpropertyaccountants listicle) were skipped after the first 3 fetches saturated the framework material.** Pattern: for framework-only pages where competitor URLs are sources of question phrasing rather than facts to be verified, stop fetching once material is sufficient; over-fetching risks drifting back toward listicle framing.

---

## 2026-05-23 — B3 (ASA authorisation walkthrough)

- **HowTo schema candidacy flagged for orchestrator review.** B3 has a clean 5-step procedural backbone (Step 1: accountant ASA setup → Step 2: email lands → Step 3: Government Gateway approval → Step 4: HMRC records → Step 5: both sides verify). The handshake-at-a-glance H2 lists the same 5 steps as the body H2s elaborate. If HowTo schema is enabled, the template implementation is straightforward.
- **gov.uk genuinely glosses over 3 failure modes that catch landlords.** Verified via WebFetch: the gov.uk MTD ITSA agent-side guidance does not surface (1) email-address mismatch with MTD enrolment, (2) partially-completed Government Gateway profile, (3) 14-day in-flight expiry. These are documented in HMRC's agent-update bulletins but not on the consumer-facing pages. B3 fills the gap. Pattern: for any walkthrough page covering an HMRC digital service, expect the gov.uk landlord-facing guidance to skip the operational failure modes; competitor pages tend to skip them too. The differentiation opportunity is real.
- **Boundary with `how-to-register-mtd-landlord-step-by-step-guide` (landlord self-registration) held cleanly via explicit framing.** B3 is the agent-route flow; existing page is the self-route flow. Cross-linked from B3 as the alternative path. Pattern: for any future MTD operational page that intersects with a procedural sibling on main, lead the differentiation in the page intro (one sentence) before the body lands.
- **Skipped 3 ukpropertyaccountants.co.uk URLs in brief after gov.uk gave the authoritative procedural backbone.** Pattern: when the brief lists both gov.uk and competitor URLs and the page is a procedural walkthrough, gov.uk is usually sufficient; pulling competitor URLs adds commercial-bias colour without contributing facts. Save the budget for pages where competitor framing genuinely drives the differentiator.

---

## 2026-05-23 — B4 (foreign property income inside MTD)

- **Word count came in at 2,340 (below the 2,500 lower-bound floor).** Calibration justification: the page covers SA106 mapping + FX translation + FTC timing + software gap + worked example + NRL interaction + 3 traps, which is the full operational mechanic per the framing differentiator. Padding to 2,500 would require either repeating §19.11 content or duplicating FTC-mechanism content from the cross-linked Wave 2 page. Pattern from Wave 2 §16.16: light word counts are acceptable when the framing differentiator is genuinely tight and cross-linking discipline is held.
- **Existing Wave 2 page `foreign-tax-credit-uk-property-overseas-landlords` is in category "Non-Resident Landlord Tax".** Cross-link URL is `/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords`. Confirmed via grep. Pattern: when a Wave 4 page cross-links to a page outside the bucket's category, verify the category URL segment explicitly; the Jaccard top-5 list does not always include the category metadata visibly.
- **Competitor URLs (ukpropertyaccountants + rentalbux) confirmed the FTC-at-final-declaration / report-gross-quarterly pattern from §19.11 explicitly.** No house-position correction needed; §19.11 is solid for the FTC-timing point. Pattern: when a Wave 4 house position lands a procedural rule, competitor URLs corroborate without needing back-patch.
- **2 CTAs (under the ≤3 limit).** The technical-mechanics framing has fewer natural high-intent CTA moments than a topic-broad page (like B1 joint-owners which had 3). Pattern: for narrow-technical pages, 2 CTAs is appropriate; do not force a third just to hit the limit.

---

## 2026-05-23 — B5 (penalty worked examples, 15/30/31 schedule)

- **Spring Statement 2025 HTML quote pulled and used verbatim.** "The new rates will be 3% of the tax outstanding where tax is overdue by 15 days, plus 3% where tax is overdue by 30 days, plus 10% per annum where tax is overdue by 31 days or more." This is the authoritative anchor for the §19.7 figures. Block-quoted in the page. Verified scope: applies to MTD-side regimes (MTD ITSA + MTD VAT in newer format), NOT to non-MTD income tax (which stays on legacy FA 2021 Sch 26 at 2%/2%/4% on 31/46/91). Pattern: for any future page citing the new MTD ITSA penalty schedule, the SS2025 HTML quote is the cleaner external authority than the FA 2025 amendments to Sch 26 (which are pending statutory consolidation as of 2026-05).
- **Skipped all 3 competitor URLs from brief (rentalbux + ukpropertyaccountants).** Pattern: when the brief includes an F-7/F-9 warning that competitor pages may carry stale figures, the safer route is to skip them entirely and rely on the cited statutory authority + house position §19.7. Pulling competitor pages risks tonal contamination even if you don't carry forward their figures.
- **Anti-templating discipline with Wave 3 B6 + B8 held cleanly.** B5 owns the worked-example numerical floor; B6 owns the action-list; B8 owns the rule summary. B5 cross-links to both twice but does NOT re-walk either's content. Pattern: for any future page sitting downstream of sibling pages that already own a specific content floor, lead with the framing differentiator in the intro (one sentence acknowledging what the page does NOT cover) before the body starts.
- **Worked example tables are content-efficient.** B5 came in at 2,517 body words with 3 full tables (each covering 7 milestones) plus 1 contrast table plus 12 FAQs. Tables generate visible structure with low word count. Pattern: for numeric-mechanic pages, use tables to carry the worked examples; avoid prose-only descriptions which inflate word count without improving scanability.
