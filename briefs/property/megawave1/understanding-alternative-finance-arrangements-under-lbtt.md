# MegaWave 1 brief: understanding-alternative-finance-arrangements-under-lbtt

**Site:** property
**Bucket:** B (SDLT — Scottish / Welsh equivalents)
**Session:** B
**Batch:** M1-B-B2
**Pick ID:** B10
**Brief type:** Net-new page
**Stage:** 2 (full brief — Stage 1 seed extended 2026-05-26; LBTT(S)A 2013 Sch 7 paragraphs verified verbatim against legislation.gov.uk; §16.36 catch on financial-institution definition citation corrected from FA 2003 s.73BA to ITA 2007 s.564B)
**Source markdown path on launch:** `Property/web/content/blog/understanding-alternative-finance-arrangements-under-lbtt.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/understanding-alternative-finance-arrangements-under-lbtt

---

## Manager pre-decisions

- **Suggested slug:** `understanding-alternative-finance-arrangements-under-lbtt` (retain verbatim).
- **Suggested category:** `property-types-and-specialist-tax` (matches the existing scottish-lbtt-* family).
- **Bucket:** B (SDLT — Scottish / Welsh equivalents, Scottish-side specialist relief).
- **Cannibalisation classification:** fully net-new (no existing site page on alternative finance / Sharia-compliant home purchase plans at SDLT, LTT, or LBTT side).

### Cannibalisation differentiator (CRITICAL — read before writing)

NO existing site page covers Ijara / Diminishing Musharaka / Murabaha at any UK property-transfer tax side as at the seed-write date. B10 is the canonical LBTT alternative-finance treatment for the site. Cross-link the Wave 5 mechanics pages for the LBTT framework (rates, bands, ADS, MDR) but do NOT walk those mechanics here; they belong on the rates pages.

**Hard rule:** B10 must explicitly state in the opening that it is the first site treatment of UK alternative-finance property tax. Future MW pages may add SDLT-side (FA 2003 ss.71A-73) and Welsh LTT-side (LTTA 2017 Sch 10) equivalents; B10 should be written to cross-link to those when written.

### Framing differentiator (Stage 2, 2026-05-26)

This page is the **canonical LBTT alternative-finance treatment** for the site. Audience: a buyer using Islamic Finance Council UK members (Al Rayan Bank, Gatehouse Bank, BLME historically) to fund a Scottish property purchase via Sharia-compliant home purchase plan; the buyer wants to confirm that Schedule 7 eliminates the double LBTT charge that would otherwise arise on the institution's interim acquisition. Secondary audience: cross-border buyers using a UK-wide alternative-finance arrangement who need to file in Scotland.

The distinguishing angle is **the three structural patterns + the ADS interaction + the procedural mechanics**:

1. **The three head categories under LBTT(S)A 2013 Sch 7** (verified verbatim against legislation.gov.uk/asp/2013/11/schedule/7 on 2026-05-26):
   - **Part 1 (paras 2-6): "Land sold to financial institution and leased to person"** — the Ijara / lease-back structure. Institution buys; institution leases (or sub-leases) to the person with a right for the person to require transfer of the property at the end of the lease term.
   - **Part 2 (paras 7-12): "Land sold to financial institution and person in common"** — the Diminishing Musharaka / co-ownership structure. Institution and person jointly purchase as common owners; person has exclusive occupation right; person can require institution to transfer its share progressively over time.
   - **Part 3 (paras 13-15): "Land sold to financial institution and re-sold to person"** — the Murabaha / sale-and-immediate-resale structure. Institution buys; immediately resells to person at marked-up price; person grants security (a standard security in Scots law, the equivalent of a mortgage) over the interest.

2. **The exempt-interest treatment for the institution's intermediate holding (Sch 7 para 21).** Verified verbatim 2026-05-26: "An interest held by a financial institution as a result of the first transaction within the meaning of paragraph 2(a) or 7(a) is an exempt interest for the purposes of the tax." The exempt-interest treatment is the load-bearing mechanism that prevents the double LBTT charge across the Ijara and Diminishing Musharaka head categories.

3. **The financial-institution definition (Sch 7 para 25 Interpretation).** **STAGE 2 CATCH (§16.36 statutory cross-check):** the seed brief asserted that the LBTT financial-institution definition "mirrors the SDLT definition at FA 2003 s.73BA". This is INCORRECT. Para 25 of Sch 7 expressly imports the definition from **ITA 2007 s.564B** (Income Tax Act 2007), not from FA 2003. ITA 2007 s.564B(1) defines "financial institution" for the purposes of alternative finance arrangements across multiple UK tax codes; Sch 7 para 25 imports that definition with paragraph (d) omitted. Sessions writing on B10 must NOT cite FA 2003 s.73BA as the LBTT definition source.

4. **The ADS interaction question** (where the buyer already owns another dwelling). The institution's interim acquisition is NOT a buyer-side residential acquisition (the institution is acquiring as financier, not for occupation), so on a strict reading ADS should not engage on the interim step. On the substantive buyer's acquisition (whether crystallising on the lease-end transfer under Ijara, on each share-buyout under Musharaka, or on the immediate resale under Murabaha), ADS engages exactly as on a conventional purchase if the buyer (or joint buyer) already owns a dwelling. Stage 2 to verify Revenue Scotland's published position on the institution-side ADS treatment at write time; the statutory position is the strict-reading defensible position.

5. **Procedural mechanics — claim made in the original LBTT return.** Per Revenue Scotland procedure under LBTT(S)A 2013 s.30(1), the alternative-finance relief claim is made in the LBTT return at the effective date. Amendment route under TCMA 2014 s.83 within 12 months if the relief was omitted; overpayment claim under longer-stop limits if the amendment window has closed.

**Stage 1b HP-lock note:** The seed proposed a candidate **§23.X "Alternative property finance reliefs — Scottish Sch 7 + Welsh Sch 10 + SDLT ss.71A-73, aligned three-jurisdiction framework"** mini-lock. The §16.36 catch on the financial-institution definition (Sch 7 imports ITA 2007 s.564B, NOT FA 2003 s.73BA) strengthens the case for a central lock: future SDLT-side and LTT-side pages need a corrected anchor and the cross-jurisdictional alignment is the natural place to land it. Stage 1b conductor decision.

**Pool-thinness disclosure:** competitor coverage of LBTT alternative finance is thin compared to the SDLT-side. Brodies / Burness Paull / Anderson Strathern Scottish-tax-team briefings exist but typically cover the topic at high level. Specialist Islamic-finance commentators (IFC4UK, Islamic Finance News) cover the structural framework but not the LBTT mechanics specifically. The defensible point for B10 is **the verbatim Sch 7 paragraph architecture + the corrected ITA 2007 s.564B financial-institution citation + the ADS interaction analysis + the explicit cross-jurisdictional alignment with FA 2003 ss.71A-73 and LTTA 2017 Sch 10**.

---

## Competitor URLs (Stage 2 populated 2026-05-26; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx + BeautifulSoup`. Extract treatment of: (a) LBTT(S)A 2013 Sch 7 paragraph architecture (paras 2-6 / 7-12 / 13-15 / 21 / 25); (b) the financial-institution definition source (flag any competitor citing FA 2003 s.73BA as the LBTT source — this is the §16.36 drift catch); (c) ADS interaction with the institution's interim acquisition; (d) Scots-law standard security mechanics under Murabaha; (e) cross-jurisdictional alignment with SDLT and LTT.

- https://www.ukpropertyaccountants.co.uk/understanding-alternative-finance-arrangements-under-lbtt/
- https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs
- https://www.brodies.com/insights/property/lbtt-alternative-finance-sharia-compliant/
- https://www.burnesspaull.com/insights/scottish-tax/lbtt-islamic-finance/
- https://www.andersonstrathern.co.uk/insights/scottish-property-tax/alternative-finance-lbtt/
- https://www.islamic-finance.com/uk-property-purchase-plans/

**Borrowable patterns (subject to verification):** competitor structural diagrams of Ijara / Musharaka / Murabaha flows; Revenue Scotland published worked examples on Sch 7 relief.

**Reliability notes:**
- Revenue Scotland pages: authoritative for Scottish published interpretation.
- Brodies / Burness Paull: reliable for Scots-law standard security mechanics; thinner on cross-jurisdictional alignment.
- ukpropertyaccountants.co.uk: canonical SERP competitor; verify any cited statutory section against legislation.gov.uk before borrowing (especially the financial-institution definition — flag any competitor citing FA 2003 s.73BA as drift).

---

## GSC data

*Net-new page; primary topical queries expected: "LBTT Sharia compliant mortgage", "Scottish Islamic finance property tax", "LBTT Ijara lease back", "LBTT Diminishing Musharaka", "LBTT Murabaha standard security", "LBTT alternative finance relief", "Schedule 7 LBTT alternative property finance", "Al Rayan Bank Gatehouse Bank Scotland LBTT".*

---

## Closest existing pages (cannibalisation context)

- `scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide` (Wave 5) — main rates; light cross-link in the rate-calculation worked example.
- `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` (Wave 5) — ADS mechanics; cross-link in the ADS-interaction section.
- `scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics` (Wave 5) — Sch 7 sits in the same "specialist reliefs" tier; cross-link as sibling specialist-relief page.
- Sibling MW1 picks: B7 (ADS edge cases — parallel reading on Sch 2A); B11 (Welsh LTT calculator — cross-jurisdictional reference).
- Future MW pages: SDLT alternative finance (FA 2003 ss.71A-73) and Welsh LTT alternative finance (LTTA 2017 Sch 10) when written — B10 should cross-link forward to these as placeholder.

**Cannibalisation discipline:**
- Cross-link Wave 5 rates page and ADS page for headline framework.
- Cross-link Wave 5 bare-trust page as sibling specialist-relief page.
- No mandatory cross-link to a direct topic-companion (B10 is the canonical first treatment).

---

## Redirect overlap (on launch)

No existing slug matches B10's scope. **Session to scan `Property/web/middleware.ts` for any `lbtt-alternative-finance` / `lbtt-sharia` / `scottish-islamic-finance` token redirects pre-launch; if found, repoint to B10.**

---

## Authority links worth considering (Stage 2 populated 2026-05-26; session selects 8-10)

**Statutory (legislation.gov.uk):**
- LBTT(S)A 2013 Schedule 7 (full text — verified 2026-05-26): https://www.legislation.gov.uk/asp/2013/11/schedule/7
- LBTT(S)A 2013 Sch 7 Part 1 paras 2-6 (Ijara / lease-back): https://www.legislation.gov.uk/asp/2013/11/schedule/7/part/1
- LBTT(S)A 2013 Sch 7 Part 2 paras 7-12 (Diminishing Musharaka / common ownership): https://www.legislation.gov.uk/asp/2013/11/schedule/7/part/2
- LBTT(S)A 2013 Sch 7 Part 3 paras 13-15 (Murabaha / sale-and-resale): https://www.legislation.gov.uk/asp/2013/11/schedule/7/part/3
- LBTT(S)A 2013 Sch 7 para 21 (institution's interim interest = exempt interest): https://www.legislation.gov.uk/asp/2013/11/schedule/7/paragraph/21
- LBTT(S)A 2013 Sch 7 para 25 (Interpretation — financial-institution definition via ITA 2007 s.564B): https://www.legislation.gov.uk/asp/2013/11/schedule/7/paragraph/25
- LBTT(S)A 2013 s.27 (reliefs general): https://www.legislation.gov.uk/asp/2013/11/section/27
- LBTT(S)A 2013 s.30 (claim made in the LBTT return): https://www.legislation.gov.uk/asp/2013/11/section/30
- **ITA 2007 s.564B (financial-institution definition — the actual statutory source, NOT FA 2003 s.73BA)**: https://www.legislation.gov.uk/ukpga/2007/3/section/564B
- LBTT(S)A 2013 Sch 2A (ADS — for the institution-side / buyer-side interaction discussion): https://www.legislation.gov.uk/asp/2013/11/schedule/2A
- TCMA 2014 ss.83-86 (amendment and review mechanics): https://www.legislation.gov.uk/asp/2014/16/contents

**Cross-jurisdictional comparators (cited as cross-jurisdictional context):**
- FA 2003 ss.71A-73 (SDLT alternative property finance — equivalent English / NI framework): https://www.legislation.gov.uk/ukpga/2003/14/section/71A
- LTTA 2017 Schedule 10 (Welsh LTT alternative property finance — equivalent Welsh framework): https://www.legislation.gov.uk/anaw/2017/1/schedule/10

**Revenue Scotland / WRA / HMRC guidance:**
- Revenue Scotland LBTT3 reliefs technical guidance: https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs
- HMRC SDLT manual on alternative finance (cross-jurisdictional cite): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax/sdltm28000

**Cross-references in house_positions.md:**
- §23.4-§23.6 (Scottish LBTT framework — main residential bands, ADS 8% from 5 Dec 2024, non-residential bands).
- §23.11 do-not-write (ADS rate framing).
- **Proposed §23.X mini-lock candidate** (Stage 1b decision): three-jurisdiction alternative-finance alignment (Sch 7 / Sch 10 / ss.71A-73) with corrected ITA 2007 s.564B financial-institution definition citation.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify LBTT(S)A 2013 Sch 7 paras 2-6, 7-12, 13-15, 21, 25 verbatim against legislation.gov.uk before citing.
- **Verify ITA 2007 s.564B as the financial-institution definition source** (NOT FA 2003 s.73BA — Stage 2 §16.36 catch).
- Verify current 8% ADS rate against revenue.scot at write time (rate-by-reference).
- Verify LBTT(S)A 2013 ss.27, 30 verbatim section headings.
- Verify TCMA 2014 ss.83-86 verbatim for amendment / review mechanics.
- Verify FA 2003 ss.71A-73 and LTTA 2017 Sch 10 as cross-jurisdictional comparators (note the comparator statutes for context; do NOT walk those mechanics here).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation, statutory paragraph references verbatim.
- Anonymised personas only.
- **Tone discipline:** present alternative finance as a regulated and recognised structuring route, not as a tax-avoidance scheme. The relief is statutorily authorised and tightly conditioned. Do NOT use loaded or marketing-led framing.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Sharia-compliant home buyer + cross-border (English + Scottish) Islamic finance buyer + Scottish solicitor advising a Sharia-compliant client + financial institution structuring documentation.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "three head categories" H2 (high-intent: buyer mid-arrangement-selection).
  - After the "ADS interaction" H2 (high-intent: buyer already owning another dwelling).
  - After the "procedural mechanics" H2 (high-intent: solicitor preparing the LBTT return).
- Vary opening; lead with the structural Sharia-finance distinction (Ijara vs Musharaka vs Murabaha) and the riba avoidance, NOT with "LBTT was introduced in 2015...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- No mandatory companion cross-link (B10 is canonical first treatment).
- Cross-link Wave 5 rates page + ADS page + bare-trust specialist-relief page.

### House positions
- §23.4-§23.6 (Scottish LBTT framework).
- §23.11 do-not-write enforcement.

### Quality bar
- Word count: 2,800-3,400 (specialist topic depth).
- FAQs: 10-12.
- New external authority links: 8-10.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the **verbatim Sch 7 architecture + corrected ITA 2007 s.564B financial-institution citation + ADS interaction + three-jurisdiction alignment**. Write to it.
- Lead with the structural distinction between the three head categories, NOT with regime-history.

---

## Draft FAQ entries (Stage 2 populated 2026-05-26; session may rewrite or expand)

Target 10-12 FAQs.

1. **What is alternative property finance and why does it need a special LBTT relief?**
   Sharia-compliant home purchase plans avoid the payment of interest (riba) by using ownership-based structures rather than interest-bearing loans. The financial institution buys the property and transfers ownership to the buyer over time (Ijara), or jointly with the buyer (Diminishing Musharaka), or via immediate resale (Murabaha). Without a special relief, each transfer would attract LBTT, producing a double or triple charge. LBTT(S)A 2013 Schedule 7 eliminates the double charge while leaving the buyer paying LBTT on the substantive economic acquisition.

2. **What is the Ijara structure under Schedule 7 Part 1?**
   The institution purchases the property; grants a lease (or sub-lease) to the person with a right for the person to require transfer of the property at the end of the lease term. Sch 7 para 21 makes the institution's interim interest an exempt interest for LBTT, so LBTT is charged only on the institution's initial purchase from the original vendor. The buyer's lease and option to acquire the property at the end of the term are NOT charges to LBTT.

3. **What is Diminishing Musharaka under Schedule 7 Part 2?**
   The institution and the person jointly purchase the property as common owners (typically with the person taking a small initial share and the institution the majority share). The person has exclusive occupation right; the person progressively buys out the institution's share over the financing term. Each share-buyout would in principle be a separate acquisition subject to LBTT, but Sch 7 Part 2 relieves the periodic share-buyouts so that LBTT is charged only on the buyer's substantive co-ownership share at the outset.

4. **What is Murabaha under Schedule 7 Part 3?**
   The institution purchases the property from the original vendor; immediately resells the property to the person at a marked-up price (representing the financing margin); the person grants a standard security (the Scots law mortgage equivalent) over the interest to the institution. Sch 7 Part 3 relieves the institution's first acquisition so that LBTT is charged only on the buyer's acquisition from the institution. The Scots-law standard security mechanics are similar to but distinct from the English / Welsh mortgage equivalent.

5. **What qualifies as a "financial institution" for Schedule 7 purposes?**
   Schedule 7 para 25 (Interpretation) imports the definition from **Income Tax Act 2007 section 564B**. ITA 2007 s.564B(1) defines "financial institution" by reference to authorised banks, building societies, and certain other prescribed institutions. Note that the LBTT definition is via ITA 2007 s.564B, NOT via FA 2003 s.73BA (which is the SDLT alternative-finance institution definition); the underlying ITA 2007 architecture is the common spine. Private individuals do not qualify; private "alternative finance" arrangements between family members are not Sch 7 relief eligible.

6. **Does ADS (the 8% Additional Dwelling Supplement) apply to alternative finance arrangements?**
   On the institution's interim acquisition: the institution is not buying for use as a residential dwelling; it is buying as a financier. On a strict reading, ADS should not engage on the institution-side. Stage 2 must verify Revenue Scotland's published position at write time for any specific guidance. On the buyer's substantive acquisition: ADS engages exactly as on a conventional purchase if the buyer (or any joint buyer) already owns another dwelling at the effective date of the buyer's acquisition. Sharia-compliant finance does not exempt the buyer from ADS.

7. **How does Schedule 7 relief interact with the joint-buyer rules where the buyer is married or in a civil partnership?**
   Diminishing Musharaka structures often involve the institution and one named buyer; the spouse may or may not be a party to the arrangement. Where the spouse is a joint party, both spouses' Sch 7 relief claims aggregate. Where the spouse is not a party but is occupying as principal home, only the named buyer's substantive acquisition attracts LBTT (subject to ADS aggregation rules under Sch 2A para 5(2) and para 6). The page must walk the joint-buyer treatment explicitly because it is the most common Sharia-compliant arrangement structure.

8. **How do I claim Schedule 7 relief in the LBTT return?**
   The claim is made in the original LBTT return at the effective date under LBTT(S)A 2013 s.30(1) and Revenue Scotland published procedure. The buyer's solicitor (or accredited LBTT agent) files the return citing the Sch 7 relief and providing the qualifying alternative-finance arrangement documents. Where the relief was omitted from the original return, the amendment route under TCMA 2014 s.83 within 12 months of filing is available; longer-stop overpayment claim under the standard 5-year route if the amendment window has closed.

9. **What evidence does Revenue Scotland expect for a Schedule 7 relief claim?**
   Standard pack: (a) the alternative finance arrangement documents (the Ijara lease deed, the Musharaka co-ownership deed, or the Murabaha sale-and-resale contracts); (b) the financial institution's authorisation reference under FSMA 2000 / ITA 2007 s.564B; (c) the timeline showing the institution's acquisition and the buyer's acquisition were part of a single qualifying arrangement (typically same-day completions for Murabaha); (d) for Diminishing Musharaka, the share-buyout schedule showing the progressive transfer to the buyer.

10. **What are the equivalent reliefs for English and Welsh property?**
    FA 2003 ss.71A-73 (SDLT alternative property finance) operates the equivalent framework for England and Northern Ireland. LTTA 2017 Schedule 10 operates the equivalent framework for Wales. The three frameworks are deliberately aligned to avoid jurisdictional arbitrage on Sharia-compliant home finance. Cross-border portfolio buyers using a single financing arrangement need to file in each jurisdiction the property sits, with each jurisdiction's relief claimed separately.

11. **Are mixed-use commercial / residential alternative finance arrangements covered by Schedule 7?**
    Yes. Schedule 7 applies to "land" generically, not just to residential property. Commercial property acquired via Sharia-compliant alternative finance attracts Sch 7 relief on the same basis. Mixed-use property attracts mixed-use rates on the underlying acquisition (non-residential rate band), and Sch 7 relief operates to eliminate the double charge on the interim institution holding regardless of property classification.

12. **Are there any anti-avoidance considerations to be aware of?**
    Yes. The LBTT(S)A 2013 s.75A anti-avoidance code (the Ramsay general anti-avoidance provision under LBTT) can engage if an alternative-finance structure is used principally to obtain a tax advantage beyond the relief's authorised scope. Project Blue Ltd v HMRC [2018] UKSC 30 (an SDLT case) is the leading authority on substance-over-form analysis of alternative finance structures; the principles apply in adapted form to LBTT. Conventional Sharia-compliant home purchase plans with bona fide regulated financial institutions do not engage the anti-avoidance code, but structured arrangements using nominees or artificial intermediaries may.

---

## Worked examples (Stage 2 drafted 2026-05-26; session may adapt personas + figures)

Two illustrative scenarios. Use anonymised personas (no real names; persona-type only).

### Worked example 1: Murabaha purchase, double-charge eliminated by Schedule 7

A buyer ("Buyer U") purchases a £350,000 residential property in Glasgow on 1 March 2026 using a Sharia-compliant Murabaha arrangement with Al Rayan Bank (regulated financial institution under FSMA 2000; meets the ITA 2007 s.564B definition imported by Sch 7 para 25). The bank purchases the property from the original vendor at £350,000; immediately resells to Buyer U at £420,000 (representing the financing margin over a 25-year repayment period); Buyer U grants a standard security over the property to the bank. Buyer U has no other dwelling (first home).

- **Counterfactual without Sch 7:** institution's acquisition at £350,000 would attract LBTT at residential rates (£145,000 at 0% + £105,000 at 2% + £75,000 at 5% + £25,000 at 10% = £8,850) PLUS buyer's acquisition at £420,000 would attract LBTT (£145,000 at 0% + £105,000 at 2% + £75,000 at 5% + £95,000 at 10% = £15,350). Double charge total = £24,200.
- **With Sch 7 Part 3 relief:** the institution's first acquisition is relieved (Sch 7 para 21 makes the institution's interim interest an exempt interest); only the buyer's acquisition attracts LBTT (£15,350). LBTT charged once on the substantive economic acquisition.
- **Saving:** £8,850 of double-charge LBTT eliminated. Plus the buyer pays no ADS (first home; no other dwelling holdings).
- **Operational point:** clean Murabaha relief. Sch 7 Part 3 + para 21 exempt-interest treatment is the load-bearing combination. The Scots-law standard security mechanics are documented in the bank's standard pack; no separate stamp duty / LBTT charge on the security itself.

### Worked example 2: Diminishing Musharaka with ADS engagement on the buyer side

A buyer ("Buyer V") purchases a £400,000 residential property in Aberdeen on 15 May 2026 using a Diminishing Musharaka arrangement with Gatehouse Bank. Buyer V already owns a £150,000 residential property in Inverness (let to tenants since 2018). The bank and Buyer V acquire the Aberdeen property jointly as common owners: 75% to the bank, 25% to Buyer V at completion. Buyer V will buy out the bank's 75% share over 20 years through monthly payments.

- **Sch 7 Part 2 relief on the initial co-acquisition + the periodic buyouts:** the periodic share-buyouts under Sch 7 Part 2 are relieved. The bank's 75% interim co-ownership is treated as exempt interest under para 21. The substantive LBTT charge is on Buyer V's 25% initial acquisition at the effective date, valued at £100,000 (25% of £400,000).
- **Buyer-side ADS engagement:** Buyer V already owns the Inverness BTL above the £40,000 threshold, so ADS applies to her 25% Aberdeen acquisition. ADS at 8% on the £100,000 chargeable consideration on her 25% share = £8,000 of ADS. Standard LBTT on the £100,000 share = £0 (under the £145,000 nil band).
- **Operational point:** Sch 7 Part 2 relief on the share-buyouts does NOT eliminate ADS on the buyer's initial acquisition. ADS bites on the buyer-side regardless of the Sch 7 structure. The total LBTT + ADS exposure at completion = £8,000. Subsequent share-buyouts over 20 years are Sch 7-relieved (no further LBTT). Specialist advice essential to model the long-term LBTT-and-ADS profile across the financing term.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9. Key per-page anchors: §23.4-§23.6 primary; §16.35 per-write verification on Sch 7 paras 2-25 verbatim + ITA 2007 s.564B verbatim + cross-jurisdictional comparator citations.

## Session-side watcher pattern

Standard per NETNEW_PROGRAM §8.4. After raising any Q at `C:/Users/user/Documents/Accounting/docs/property/megawave1_questions_session_B.md` (absolute path), arm a single Monitor task watching for STATUS flip to answered.

---

## Per-page work-log (session fills during work)

### Decisions
- Final slug:
- Final category:
- H1 chosen:
- Meta title (≤62 chars):
- Meta description (≤158 chars):
- Why these vs other options:

### Competitor URLs fetched + key takeaway per URL
-

### Existing-page review (overlap, differentiation decision)
-

### Citations added
-

### Internal links added
-

### Inline CTA placements
-

### Build attempts (pass/fail)
-

### Verification (six checks)
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### monitored_pages registration
-

### Flags raised to megawave1_site_wide_flags.md
-

### 2-3 sentence summary
-
