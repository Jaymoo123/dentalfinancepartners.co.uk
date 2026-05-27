---
slug: anti-avoidance-rules-share-exchanges-and-reorganisations
category: incorporation-and-company-structures
intent: Practitioner-aimed page for the property-business owner (or their accountant) restructuring a property SPV via share exchange or company reorganisation — adding a parent holdco above a BTL company, demerging asset-holding from operating, merging two property portfolios, or rolling shares in a corporate sale. Covers the no-gain-no-loss reliefs under TCGA 1992 ss.135-136, the anti-avoidance gate at s.137 (main-purpose test), the advance-clearance route at s.138, the ITA 2007 Part 13 Ch 1 income-tax-side counterpart for individuals, and the CTA 2010 Pt 15 corporate transactions-in-securities regime. Anchored to property-SPV reorganisation use cases.
---

# Anti-Avoidance Rules on Share Exchanges and Reorganisations (UK Property Companies)

## Statutory anchor
- Primary (the share-exchange relief): TCGA 1992 s.135 — "Exchange of securities for those in another company" — verified verbatim at https://www.legislation.gov.uk/ukpga/1992/12/section/135 on 2026-05-27. Applies where Company B issues shares or debentures to exchange for shares in Company A in three statutory cases: (i) B holds >25% of A's ordinary share capital after the exchange; (ii) the exchange results from a general offer to A's members that would give B control; (iii) B holds the greater part of voting power in A. Effect (read with s.127): no-gain-no-loss treatment — the holder of the original shares is treated as not having disposed of them; the new shares step into the original cost-and-acquisition-date.
- Primary (the reconstruction relief): TCGA 1992 s.136 — "Reconstruction involving issue of securities" — applies on a scheme of reconstruction (the *Brooklands Selangor* / *Mytravel* line of case-law defines "reconstruction" — Stage 2 sub-agent re-verifies the term's case-law shape at write time). Same no-gain-no-loss mechanic; covers demergers and group reorganisations that meet the reconstruction test.
- Primary (the anti-avoidance gate): TCGA 1992 s.137 — "Restriction on application of sections 135 and 136" — verified verbatim at https://www.legislation.gov.uk/ukpga/1992/12/section/137 on 2026-05-27 (most-recently amended by Finance Act 2026 s.37(4)(b); current text confirmed live as of the verification fetch). Disapplies ss.135-136 where "the main purpose, or one of the main purposes, of the arrangements is to reduce or avoid liability to capital gains tax or corporation tax." Subsections (1)-(1C) substituted by FA 2026 substantially extend the counteraction mechanism — Stage 2 sub-agent verifies the post-FA-2026 wording at write time.
- Primary (advance clearance): TCGA 1992 s.138 — "Procedure for clearance in advance" — verified verbatim at https://www.legislation.gov.uk/ukpga/1992/12/section/138 on 2026-05-27. Pre-exchange / pre-reconstruction application to HMRC ("the Board") for confirmation that s.137 will not apply. **The clearance is the operational discipline** — practitioners routinely apply before the deal to extinguish s.137 risk; deals proceed without clearance only where the s.137 risk is plainly absent (which is rare for property-SPV reorganisations).
- Primary (the reconstruction-business-transfer relief — corporate side, sometimes confused with s.135-136): TCGA 1992 s.139 — "Reconstruction involving transfer of business" — asset-by-asset rollover for company-to-company business transfers on a scheme of reconstruction. Distinct from s.135 / s.136 (which work at the shareholder level on share exchanges); s.139 works at the asset level on inter-company transfers.
- Primary (the income-tax-side anti-avoidance counterpart for individuals): ITA 2007 Part 13 Chapter 1 (ss.682-713) — "Transactions in securities" — verified at https://www.legislation.gov.uk/ukpga/2007/3/part/13/chapter/1 on 2026-05-27. s.684 (person liable to counteraction), s.685 (receipt of consideration in connection with distribution by close company — the close-company anti-Bullock route), s.687 (income tax advantage definition), s.701 (application for clearance — the income-tax-side advance-clearance route paralleling TCGA s.138). Recovers income tax where a transaction in securities produces an income-tax-advantage outcome (eg. capital extraction dressed as a share exchange).
- Primary (the corporation-tax-side transactions-in-securities counterpart): CTA 2010 Part 15 (ss.731-751) — "Transactions in securities" — corporation-tax-side anti-avoidance for company-to-company transactions. Stage 2 sub-agent verifies the current section range at write time.
- Primary (the underlying no-disposal rule): TCGA 1992 s.127 — "Equation of original shares and new holding" — the no-disposal rule that s.135 and s.136 operate via.
- Supporting: §11.A (ECCTA 2023 architecture — for the ID-verification + ACSP angle on the underlying corporate transactions); §21.5 (FIC architecture — for the share-class-and-reorganisation case); §22.18 (Employee Ownership Trust property-SPV exit — adjacent reorganisation route); §28 (transactions-in-UK-land — adjacent anti-avoidance regime, conceptually similar but operates on a different test).
- House position reference: this is a **new statutory cluster for the property site** — TCGA ss.135-139 + s.127 + ITA 2007 Part 13 Ch 1 + CTA 2010 Pt 15 are not currently locked at any HP section. The closest existing lock is §21.5 (FIC mechanics, which touches share-class architecture). **F-101 raised in `megawave3_site_wide_flags.md`** to scope a §37 ("Share-exchange + reconstruction reliefs + transactions-in-securities anti-avoidance — TCGA 1992 ss.127, 135-139 + ITA 2007 Pt 13 Ch 1 + CTA 2010 Pt 15") HP-lock candidate. Bucket C also has C6 (this pick) and potentially C16 (`case-laws`) touching this cluster; if both proceed to Stage 2, the §37 lock becomes a clear Stage 1b deliverable. Not blocking C6 seed; statutory citations carried inline.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **practitioner-aimed primer on share-exchange and reconstruction anti-avoidance** as it applies to property-business owners and their accountants. The hook is the specific use cases that arise in property-SPV land: adding a parent holdco above an existing BTL company; demerging the asset-holding side from the operating side; merging two property portfolios into a single group; rolling shares as part of a corporate sale or partial exit.

The site has **no existing page on share-exchange or reconstruction anti-avoidance**. The closest adjacencies are:

- The FIC cluster (`family-investment-company-property-worth-it`, `fic-complete-guide-property-wealth-transfer`, and ten sibling FIC pages) — touches share-class architecture but does NOT cover the s.137 anti-avoidance gate or the s.138 clearance route. Forward-link only.
- The incorporation cluster (`a-complete-guide-on-incorporating-a-company-in-uk`, the s.162 incorporation-relief pages) — touches business-incorporation but works at the asset level, not the share level. Forward-link only.
- The EOT page on the site if shipped (covers a different reorganisation route — employee-ownership trust transfer, not share exchange). Forward-link.

**Anti-cannibalisation discipline:** the existing FIC and incorporation pages cover share-class architecture and asset-incorporation respectively; this page covers the share-exchange + reconstruction anti-avoidance gate that sits over BOTH. The page must not re-walk FIC share-class design or s.162 incorporation mechanics; it must surface those as the pre-conditions for the situations where s.135 / s.136 reliefs come into play.

**Counter-pattern Stage 2 must avoid:** opening with "Section 135 of TCGA 1992 provides relief from capital gains tax on share-for-share exchanges where..." (textbook generic; sells the page as a tax-law primer rather than a property-context guide). Open instead with the property-owner use case: "If you have a BTL portfolio in a limited company and you want to add a parent holdco for IHT planning, transfer your shares to a new family investment company in exchange for new shares, or merge your portfolio with a partner's, you are doing a share exchange — and the question that decides whether you pay CGT now or roll the gain into the new shares is whether HMRC accepts that the main purpose is not tax avoidance." Word count target 2,400-2,800.

## Key questions this page must answer

1. **What is a share exchange in property-SPV terms** — the property-owner case is almost always one of three: (a) inserting a parent holdco above an existing operating SPV (the shareholder gives their original shares to the new parent, receives parent shares in exchange); (b) merging two SPVs into a group by share exchange (shareholders of B swap into A in exchange for new A shares); (c) family-internal share reorganisation, eg. moving shares into a family investment company. Each is mechanically a s.135 exchange — provided the statutory cases (>25% holding after exchange, general-offer-leading-to-control, voting-power-majority) are met.
2. **What relief does s.135 actually provide** — read with TCGA 1992 s.127 ("Equation of original shares and new holding"), s.135 treats the share-exchange as NOT a disposal. The shareholder does not crystallise the gain at exchange; the gain rolls into the new shares (which step into the original acquisition date and base cost). Without s.135, the exchange would be a deemed disposal at market value (TCGA 1992 s.17 + s.18 — connected-party deemed-market-value) triggering immediate CGT.
3. **The s.137 anti-avoidance gate** — TCGA 1992 s.137(1) disapplies the s.135 / s.136 reliefs where "the main purpose, or one of the main purposes, of the arrangements is to reduce or avoid liability to capital gains tax or corporation tax." The test is a **main-purpose test**, not a sole-purpose test — even where commercial reasons are dominant, if a co-equal main purpose is tax avoidance, s.137 bites. The bar is lower than it looks. **Property-context risk**: where the SPV reorganisation is timed around a planned sale or extraction, s.137 risk rises sharply.
4. **The s.138 advance clearance route** — TCGA 1992 s.138(1) allows the company (either side of the exchange) to apply to HMRC ("the Board") in advance for confirmation that s.137 will not apply. Application sets out the proposed transaction, the commercial reasons, the absence of tax-avoidance main purpose. HMRC has 30 days from the application (per s.138(4) — Stage 2 verifies the current statutory window) to either grant clearance, refuse, or request further information. **A negative clearance does NOT mean s.137 applies — it just means HMRC will not pre-commit.** A positive clearance is operational gold: deal proceeds with statutory certainty.
5. **What HMRC looks for in a clearance application** — commercial purpose for the reorganisation (succession planning, governance structure, IHT planning, BTL portfolio aggregation, debt restructuring) documented from a contemporary contemporaneous record. Where tax planning IS part of the picture, HMRC accepts the picture as long as it is not the *main* picture. The clearance application should NOT minimise tax planning — that reads as suppression of the truth. It should frame tax planning as part of a broader commercial-and-family agenda.
6. **What happens if clearance is refused or never sought** — the share exchange is fully effective at company-law level (it happens regardless of tax treatment). The CGT consequence is the live risk: HMRC may seek to apply s.137, treat the exchange as a disposal at market value, and assess CGT at 24% (or 20% for non-residential gains; rates per §5 lock and Stage 2 verifies). The counteraction can occur years later under TMA 1970 s.29 discovery-assessment window (4 years standard, 6 years for carelessness, 20 years for deliberate — §27.1 lock).
7. **The income-tax-side trap — ITA 2007 Part 13 Chapter 1** — for individual shareholders, a separate anti-avoidance regime sits over the picture. ITA 2007 s.684 catches a "person... who is in a position to obtain... an income tax advantage in consequence of a transaction in securities or two or more such transactions." s.685 is the close-company route — receiving consideration "in connection with the distribution by or assets of a close company" can be re-characterised as a dividend even where the transaction took the form of a share exchange. **The income-tax-side parallel clearance route is at ITA 2007 s.701.** Where the property-SPV reorganisation involves shareholder extraction (cash payment alongside the share exchange, redemption of shares, etc.) the income-tax route is the bigger risk than s.137 CGT.
8. **The corporation-tax-side parallel — CTA 2010 Part 15** — company-to-company transactions (not at the shareholder level) come within ss.731-751 CTA 2010 transactions-in-securities. Stage 2 verifies the current section range at write time. Practically: where the reorganisation is structured at the company level (eg. share-for-share between two trading entities, group reorganisation under FA 1988 Schedule 18-style rules), the CTA 2010 anti-avoidance regime applies in parallel with TCGA s.137. The clearance route for CT-side counteraction sits at CTA 2010 s.748 (Stage 2 confirms).
9. **The s.139 reconstruction-business-transfer route — when it applies** — TCGA 1992 s.139 is the asset-level rollover for inter-company business transfers on a scheme of reconstruction. Distinct from s.135 / s.136 which work at shareholder level. **Practical use**: where the BTL portfolio (the assets) is transferred between two companies as part of a reconstruction, s.139 gives asset-level no-gain-no-loss treatment for the company holding the assets. Often used alongside s.136 (which handles the shareholder side). The clearance route is at TCGA 1992 s.139(5) — separate from s.138.
10. **Practical sequence for a property-SPV reorganisation** — closing checklist: (i) draft the commercial reasons memo BEFORE structuring the deal — what is the family / portfolio / governance objective; (ii) frame the share-exchange structure around that commercial picture; (iii) apply for advance clearance under s.138 (CGT-side) and ITA 2007 s.701 (income-tax side) and CTA 2010 s.748 (CT side) — three separate but linked applications; (iv) wait for HMRC response (typically 30 days each, often concurrent); (v) proceed only on positive clearance; (vi) document the deal contemporaneously — minutes, board resolutions, valuations, deed of variation — so the clearance picture is fully evidenced; (vii) take advice on the parallel SDLT picture if the reorganisation triggers a property transfer at the underlying level (§1.A partnership SDLT relief / §1.G group relief — different cluster).

## Manager pre-decisions placeholder
- Category routing: `incorporation-and-company-structures` (confirmed — sits alongside the FIC + incorporation cluster pages; no better-fitting category).
- HP-lock candidate: §37 (share-exchange + reconstruction reliefs + transactions-in-securities anti-avoidance — TCGA 1992 ss.127, 135-139 + ITA 2007 Pt 13 Ch 1 + CTA 2010 Pt 15). **F-101 raised informationally.** Stage 1b decision whether to scope at this MegaWave or defer to MW4.
- Worked-example numbers: avoid hard-coding any percentage / rate / cap. Use rate-by-reference framing per §16.27 for CGT rates, clearance windows, anti-avoidance section ranges (the s.137 substitution under FA 2026 specifically is a moving statutory target — Stage 2 verifies the post-FA-2026 wording).
- Case-law selection: the *Mytravel* line on what counts as a "reconstruction" (s.136); the *Cleary v IRC* / *IRC v Brebner* line on the s.684 / s.687 income-tax-advantage test under ITA 2007 Part 13; the *IRC v Joiner* line on the commercial-purpose test under s.701. Stage 2 verifies each citation at BAILII at write time.
- Cross-link discipline: forward-link to FIC cluster from Q1; to incorporation cluster from the s.162 mention in Q1; to §28 transactions-in-UK-land where the page brushes against trading-vs-investment territory; to §1.A / §1.G SDLT cluster from Q10.

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/1992/12/section/135`** — TCGA 1992 s.135 "Exchange of securities for those in another company". Verified verbatim 2026-05-27: "sections 127 to 131 (share reorganisations etc) apply with the necessary adaptations as if company A and company B were the same company and the exchange were a reorganisation of its share capital." Three statutory conditions for B's holding post-exchange: (i) >25% of A's ordinary share capital; (ii) general offer to A's members would give B control; (iii) majority voting power.
- **`https://www.legislation.gov.uk/ukpga/1992/12/section/137`** — TCGA 1992 s.137 "Restriction on application of sections 135 and 136". Verified verbatim 2026-05-27. Operative main-purpose test: arrangements where "the main purpose, or one of the main purposes, of the arrangements is to reduce or avoid liability to capital gains tax or corporation tax" trigger counteraction. **FA 2026 substantially restructured s.137 effective 18 March 2026:** replaced subsection (1) with new subsections (1)–(1C); omitted former subsections (2) and (3); added new subsection (7) defining "arrangements" to include "any agreement, understanding, scheme, transaction or series of transactions (whether or not legally enforceable)"; technical modifications to subsection (4) on assessment procedures. RUN session re-verifies the FA-2026-substituted text at write time.
- **`https://www.legislation.gov.uk/ukpga/1992/12/section/138`** — TCGA 1992 s.138 "Procedure for clearance in advance". Verified verbatim 2026-05-27: s.138(1) HMRC notification of satisfaction; s.138(2) HMRC may request further particulars (applicant has 30 days to respond); s.138(3) HMRC notifies decision within 30 days of application or of further-particulars compliance; failure to notify within 30 days triggers tribunal-escalation route within a further 30 days.
- **`https://www.legislation.gov.uk/ukpga/1992/12/section/127`** — TCGA 1992 s.127 "Equation of original shares and new holding". The underlying no-disposal rule via which ss.135 + 136 operate.
- **`https://www.legislation.gov.uk/ukpga/1992/12/section/136`** — TCGA 1992 s.136 "Reconstruction involving issue of securities". Shareholder-side relief on a scheme of reconstruction.
- **`https://www.legislation.gov.uk/ukpga/1992/12/section/139`** — TCGA 1992 s.139 "Reconstruction involving transfer of business". Asset-by-asset rollover on inter-company business transfers on a scheme of reconstruction; s.139(5) parallel clearance route.
- **`https://www.legislation.gov.uk/ukpga/2007/3/part/13/chapter/1`** — ITA 2007 Part 13 Chapter 1 "Transactions in securities". Verified verbatim 2026-05-27. Chapter heading verbatim; income-tax-advantage counteraction framework for individuals. s.684 person liable; s.685 close-company-distribution route; s.687 income-tax-advantage definition; s.701 clearance application route.
- **`https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg52500`** — HMRC Capital Gains Manual CG52500 "Company reconstructions: introduction". Verified live 2026-05-27. Use as the cluster anchor for s.135-139 share-exchange + reconstruction operational guidance.

### Competitor URLs

`<!-- competitor section: session-side WebSearch at write time. Recommended queries: "TCGA 1992 section 137 anti-avoidance share exchange property", "section 138 clearance application property company holdco", "ITA 2007 section 684 transactions in securities individual close company", "property SPV holdco insertion share exchange UK", "FA 2026 TCGA s.137 amendment effective March 2026". Aim 4-6 firm-side practitioner briefings (BDO + KPMG + PwC + Deloitte share-exchange / reconstruction briefings; Saffery + Crowe + Mishcon de Reya share-for-share guides; Practical Law / Lexology private-client notes; ICAEW Tax Faculty s.701 clearance briefings). The FA 2026 amendment to s.137 (effective 18 March 2026) is recent + structurally important — RUN session prioritises post-March-2026-vintage firm briefings over older notes that may not capture the (1)–(1C) substitution. -->`

### HMRC + supervisor manual anchors

- HMRC Capital Gains Manual CG52500+ (Company reconstructions: introduction — verified live).
- HMRC CG52630+ (s.137 anti-avoidance gate — RUN session re-verifies at write for post-FA-2026 manual updates).
- HMRC CG52700+ (s.138 advance-clearance procedure).
- HMRC CG52900+ (s.136 reconstruction).
- HMRC CTM36000+ (CTA 2010 Part 15 corporate transactions in securities).
- HMRC CTM37000+ (clearance procedure under CTA 2010 s.748).

### Case-law (verify each at BAILII at write time)

- *IRC v Brebner* [1967] 2 AC 18 — the "main purpose" test for anti-avoidance; foundational. The page's anchor authority for the s.137 main-purpose-test framing.
- *Mytravel Group Plc v HMRC* [2007] STC 1281 — what counts as a "reconstruction" for s.136. Use to disambiguate the reconstruction-vs-exchange line in the worked examples.
- *Cleary v IRC* [1968] AC 766 — income-tax-advantage from close-company transactions under what is now ITA 2007 Part 13 Ch 1. Use for the s.685 close-company-route paragraph.
- *IRC v Joiner* [1975] STC 657 — commercial-purpose test under what is now ITA 2007 s.701. Anchor for the clearance-application narrative.
- *Snell v HMRC* [2008] STC 1094 — modern application of s.137 main-purpose test (Snell-style cases on tax-driven reorganisations where commercial reasons co-exist with tax planning).

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Patel BTL portfolio: inserting a holdco above an existing SPV

Mr Patel owns 100% of Patel Property Ltd, an SPV holding 12 BTL flats with combined market value £4.2m and combined CGT base cost £2.6m (his original subscription + retained-earnings reinvestment over a decade). He wants to insert a parent holdco (Patel Holdings Ltd) above the SPV for governance + future-IHT-planning reasons (a family share-class structure for his two adult children's future minority interests).

- **The exchange:** Mr Patel transfers his 100% in Patel Property Ltd to Patel Holdings Ltd in exchange for newly issued ordinary shares in Patel Holdings Ltd.
- **s.135 conditions:** Patel Holdings Ltd holds >25% of Patel Property Ltd's ordinary share capital after the exchange (it holds 100%). Condition (i) satisfied.
- **Without s.135:** the transfer would be a deemed disposal at market value under TCGA 1992 s.17 (connected-party deemed-market-value), triggering CGT on the £1.6m gain (£4.2m - £2.6m). At 24% residential or 20% non-residential CGT rate (RUN session verifies the current corporate CGT rate at write — note: Patel Property Ltd's underlying assets are residential property but the disposal at issue is of SHARES, not the underlying property, so the rate is the non-residential CGT rate not the 24% residential).
- **With s.135 (read with s.127):** no disposal. The Patel Holdings Ltd shares step into the original cost-and-acquisition-date.
- **s.137 anti-avoidance gate:** the main purpose is governance + IHT-planning (preparing for share-class architecture for the children) and family-investment-company-style structuring. NOT capital-gains-or-corporation-tax avoidance. **Apply for s.138 advance clearance.** Document the commercial picture in the application (board minutes, succession-planning notes, valuation report, family decision record).
- **Outcome:** HMRC grants clearance within 30 days (or with one round of further-particulars). Exchange proceeds with statutory certainty. No CGT crystallised; gain rolls into the holdco shares.

### Example 2 — Singh portfolio merger via share exchange

Mr Singh owns 100% of Singh Property A Ltd (£1.8m, base cost £1.1m). Mrs Patel-Singh (his sister-in-law's brother's spouse — not a connected person under TCGA 1992 s.286 for connected-party purposes) owns 100% of Patel-Singh Property B Ltd (£1.4m, base cost £900k). They agree to merge into a new vehicle, Singh Group Ltd, taking shares in proportion to relative value: Mr Singh receives 56% of Singh Group, Mrs Patel-Singh receives 44%.

- **The exchange:** both transferor-shareholders give their original company shares to Singh Group Ltd in exchange for new Singh Group shares.
- **s.135 conditions:** Singh Group Ltd holds >25% of each underlying SPV (it holds 100% of each). Condition (i) satisfied for both.
- **Without s.135:** each transferor disposes at market value of their underlying shares; combined £1.2m gain crystallises (£700k + £500k).
- **With s.135:** no disposal; each transferor's Singh Group shares step into the original cost-and-acquisition-date.
- **s.137 gate:** main purpose is genuine business merger (combining portfolios for operational scale + financing efficiency + succession). Not CGT-avoidance.
- **s.138 clearance:** apply jointly for both transferors. Demonstrate the commercial merger thesis.
- **Snell-style risk:** if either transferor were to extract cash from Singh Group within 12-24 months of the exchange (eg. dividend, share buy-back, redemption), HMRC may reopen the s.137 question — the cash-extraction sequence reframes the picture as "merge then strip" tax-avoidance-shaped sequence. Document the post-merger commercial plan + actual operational integration to defuse the *Snell* risk.

### Example 3 — Cash + shares = the ITA 2007 Part 13 Ch 1 trap

Mr Patel sells his 100% of Patel Property Ltd to Patel Holdings Ltd in exchange for (a) new Patel Holdings shares to the value of £3.5m + (b) £700k cash consideration. The cash element is paid out of Patel Property Ltd's retained earnings (which Patel Holdings drew from after acquisition).

- **TCGA s.135:** the share-for-share leg gets s.135 treatment (no disposal on the £3.5m share value).
- **ITA 2007 s.685:** the £700k cash element — received "in connection with the distribution by or assets of a close company" — risks recharacterisation as a dividend under the income-tax-advantage counteraction route. HMRC may treat the £700k as a dividend in Mr Patel's hands, taxed at dividend rates (35.75% for additional-rate-band per §21.4 lock — RUN session verifies current rate at write).
- **s.701 clearance:** if the cash element is included in the deal, apply for s.701 income-tax-side clearance **in parallel with** the s.138 CGT-side clearance. Three-route clearance discipline: TCGA s.138 (CGT) + ITA 2007 s.701 (IT individual) + CTA 2010 s.748 (CT corporate, if a corporate transferor is involved).
- **Without all three clearances:** the CGT side may be clean but the income-tax side bites the cash element. The discipline is to deal-structure the cash component (or restrict it, or replace with debt) to avoid the close-company-distribution recharacterisation route.

### Example 4 — The 7-step practitioner sequence for any property-SPV reorganisation

For the RUN session to render as a numbered list:

1. **Draft the commercial reasons memo BEFORE structuring the deal.** Family / portfolio / governance / financing-restructure / IHT-planning objective. Contemporaneous record of the commercial picture.
2. **Frame the share-exchange or reconstruction structure around the commercial picture.** Tax planning may be part of the picture but should NOT be the main picture (the s.137 main-purpose test bites where tax avoidance is "the main purpose, or one of the main purposes").
3. **Apply for advance clearance under TCGA 1992 s.138** (CGT-side) — full disclosure of the commercial reasons, the deal mechanics, and any tax planning that forms part of the broader picture.
4. **Apply for parallel clearance under ITA 2007 s.701** (income-tax-side, where individual shareholders are involved) AND under CTA 2010 s.748 (corporation-tax-side, where corporate transferor is involved). Three separate but linked applications.
5. **Wait for HMRC response.** Typically 30 days per application under each section; applications often run concurrently. If HMRC requests further particulars (s.138(2) / s.701 equivalent), respond within 30 days.
6. **Proceed only on positive clearance.** Negative response or refusal does not mean s.137 applies; it just means HMRC will not pre-commit. Proceeding without clearance carries discovery-assessment exposure under TMA 1970 s.29 (4-year standard, 6-year carelessness, 20-year deliberate per §27.1).
7. **Document the deal contemporaneously.** Board minutes, board resolutions, valuations, deed of variation, completion certificates. Defuse later *Snell*-style or cash-extraction-sequence challenges.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: What is a share exchange in property-SPV terms?**
   A: Three property-owner cases dominate: (a) inserting a parent holdco above an existing operating SPV (the shareholder gives their shares to the new parent and receives parent shares); (b) merging two SPVs into a group by share exchange (B-shareholders swap into A in exchange for new A shares); (c) family-internal share reorganisation, eg. moving SPV shares into a family investment company. Each is mechanically a TCGA 1992 s.135 share exchange where the statutory conditions (>25% holding after exchange, general-offer-leading-to-control, voting-power-majority) are met.

2. **Q: What relief does TCGA s.135 provide?**
   A: Read with TCGA 1992 s.127 ("Equation of original shares and new holding"), s.135 treats the share-exchange as NOT a disposal. The shareholder does not crystallise the gain at exchange; the gain rolls into the new shares (which step into the original acquisition date and base cost). Without s.135, the exchange would be a deemed disposal at market value under s.17 + s.18 connected-party rules, triggering immediate CGT.

3. **Q: What is the s.137 anti-avoidance gate?**
   A: TCGA 1992 s.137(1), as substituted by FA 2026 effective 18 March 2026, disapplies the s.135 + s.136 reliefs where "the main purpose, or one of the main purposes, of the arrangements is to reduce or avoid liability to capital gains tax or corporation tax". The test is a main-purpose test (not a sole-purpose test); commercial reasons dominating but co-existing with tax-avoidance as a co-equal main purpose still trigger counteraction. The FA 2026 substitution restructured (1)–(1C), added a wide "arrangements" definition at new s.137(7) including "any agreement, understanding, scheme, transaction or series of transactions (whether or not legally enforceable)", and modified the assessment-procedure subsection (4). Pre-FA-2026 firm briefings may not capture the new framework.

4. **Q: How does the s.138 advance-clearance route work?**
   A: TCGA 1992 s.138(1) allows either party to a proposed exchange or reconstruction to apply to HMRC ("the Board") for confirmation that s.137 will not apply. Application sets out the commercial purpose, the deal mechanics, the absence of tax-avoidance as a main purpose, and any tax planning that forms part of the broader picture. HMRC notifies its decision within 30 days under s.138(3); HMRC may request further particulars under s.138(2) with a 30-day applicant response window. Failure by HMRC to notify within the relevant 30-day window triggers a tribunal-escalation route within a further 30 days.

5. **Q: What does HMRC look for in a clearance application?**
   A: A commercial-purpose narrative documented from contemporary records: succession planning, governance structure, IHT planning, BTL portfolio aggregation, debt restructuring, share-class architecture for next-generation transfer. Where tax planning IS part of the picture, HMRC accepts the picture as long as tax avoidance is not the main purpose. The application should NOT minimise the tax-planning element — that reads as suppression of truth. Frame tax planning as part of a broader commercial-and-family agenda.

6. **Q: What happens if clearance is refused?**
   A: The share exchange is fully effective at company-law level regardless of tax treatment. The CGT consequence is the live risk: HMRC may seek to apply s.137, treat the exchange as a disposal at market value under s.17 connected-party rules, and assess CGT. Counteraction can occur years later under TMA 1970 s.29 discovery-assessment window (4 years standard, 6 years for carelessness, 20 years for deliberate per §27.1). The discipline is: where clearance is refused, restructure the deal (different parties, different timing, different commercial framing) and reapply, rather than proceeding into the unclear position.

7. **Q: What is the ITA 2007 Part 13 Chapter 1 income-tax trap?**
   A: For individual shareholders, a separate anti-avoidance regime sits over the picture. ITA 2007 s.684 catches a person "in a position to obtain... an income tax advantage in consequence of a transaction in securities or two or more such transactions". s.685 is the close-company route — receiving consideration "in connection with the distribution by or assets of a close company" can be recharacterised as a dividend even where the transaction took the form of a share exchange. The income-tax-side parallel clearance route is at ITA 2007 s.701. Where the property-SPV reorganisation involves shareholder cash extraction alongside the share-for-share leg, the income-tax route is often the bigger risk than s.137 CGT.

8. **Q: What is the corporation-tax-side counterpart?**
   A: CTA 2010 Part 15 (transactions in securities for companies). RUN session verifies the current section range at write. The CT clearance route sits at CTA 2010 s.748. In practice, where the property-SPV reorganisation is structured at the company level (share-for-share between two trading entities, group reorganisation under FA 1988 Schedule 18-style rules), the CT-side regime applies in parallel with TCGA s.137 — three-route clearance discipline: s.138 (CGT) + s.701 (IT individual) + s.748 (CT corporate).

9. **Q: When does TCGA s.139 apply instead?**
   A: TCGA 1992 s.139 is the asset-level rollover for inter-company business transfers on a scheme of reconstruction. Distinct from s.135 + s.136 which work at shareholder level. Practical use: where the BTL portfolio (the assets) is transferred between two companies as part of a reconstruction, s.139 gives asset-level no-gain-no-loss treatment for the company holding the assets. Often used alongside s.136 (which handles the shareholder side). The clearance route is at TCGA 1992 s.139(5) — separate from s.138.

10. **Q: How does FA 2026 change my practitioner approach?**
    A: The 18 March 2026 substitution of TCGA s.137(1) with new subsections (1)–(1C) and the addition of s.137(7) "arrangements" definition substantially widen the anti-avoidance reach. The definition catches "any agreement, understanding, scheme, transaction or series of transactions (whether or not legally enforceable)" — informal arrangements between connected parties around a share exchange are now expressly within scope. Three practitioner implications: (i) document EVERY informal step around a structured exchange contemporaneously; (ii) clearance applications under s.138 should describe the entire arrangements series, not only the formal exchange; (iii) post-exchange operational decisions (cash extraction, share buybacks, redemptions in the 12-24 months after) form part of the "arrangements" if part of a pre-formed plan — they cannot be safely deferred to after clearance.

11. **Q: How does this guide differ from the FIC cluster pages?**
    A: The Family Investment Company cluster pages (`family-investment-company-property-worth-it`, `fic-complete-guide-property-wealth-transfer`, and siblings) cover share-class architecture and FIC formation. This page covers the share-exchange + reconstruction anti-avoidance gate that sits OVER both FIC formation and any share-class restructuring within an existing portfolio. Read this page for the anti-avoidance framework; read the FIC cluster for the share-class design that operates within the s.137 clearance regime.

12. **Q: What is the practical 7-step sequence?**
    A: (i) Draft the commercial reasons memo BEFORE structuring the deal; (ii) frame the structure around the commercial picture; (iii) apply for s.138 advance clearance (CGT-side); (iv) apply for parallel s.701 (IT individual) and s.748 (CT corporate) clearance — three separate but linked applications; (v) wait for HMRC response (typically 30 days each); (vi) proceed only on positive clearance; (vii) document the deal contemporaneously (minutes, resolutions, valuations) to defuse later *Snell*-style or cash-extraction-sequence challenges.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy.
- **Specific over generic.** Named statute (TCGA 1992 ss.17, 18, 127, 135, 136, 137 [as substituted by FA 2026 effective 18 March 2026], 138, 139; ITA 2007 ss.684, 685, 687, 701, Part 13 Chapter 1; CTA 2010 ss.731-751, 748, Part 15; TMA 1970 s.29; FA 1988 Sch 18). Worked-example personas only.
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Inline aside-styled CTAs at three conversion moments: (i) after the s.137 main-purpose-test paragraph; (ii) after the s.138 clearance walkthrough; (iii) after the 7-step closing sequence.
- **CSS in markdown:** semantic HTML only.
- **FAQs:** 10-12 entries (FAQs angled at "do I need clearance?" "what does HMRC look for?" "what changed in March 2026?" "what if clearance is refused?").
- **Body word count target:** 2,400-2,800.
- **Anti-templating:** open with the property-owner use-case hook from the seed counter-pattern ("If you have a BTL portfolio in a limited company and you want to add a parent holdco for IHT planning, transfer your shares to a new family investment company in exchange for new shares, or merge your portfolio with a partner's, you are doing a share exchange..."). Do NOT open with the textbook generic "Section 135 of TCGA 1992 provides relief from capital gains tax on share-for-share exchanges..." opener.
- **Rate-by-reference per §16.27.**
- **Six-verification gate per §9.**
- **§16.35 per-write statute re-verification at write time** — every TCGA s.135-139 + ITA 2007 Part 13 Ch 1 + CTA 2010 Part 15 cite verified at legislation.gov.uk at write. The FA 2026 s.137 substitution is recent — RUN session WebFetches s.137 at write to confirm the post-March-2026 text.
- **Do-not-write GREP discipline (RUN session greps draft):** "s.135 is automatic" (FALSE — it is conditional on the three s.135 cases AND on s.137 not biting); "clearance under s.138 is mandatory" (FALSE — it is optional but operationally near-essential for risk management); "the main-purpose test is sole-purpose" (FALSE — it is main-purpose, lower bar); "ITA 2007 s.685 only catches cash" (FALSE — it catches consideration "in connection with the distribution by or assets of a close company", which can include in-kind transfers); "s.139 is at the shareholder level" (FALSE — s.139 is at the asset level for inter-company business transfers); "FA 2026 left s.137 alone" (FALSE — substantial restructuring of (1)–(1C) + new (7) "arrangements" definition effective 18 March 2026); "a Snell challenge is foreclosed by positive clearance" (FALSE — clearance is based on the disclosed facts; post-exchange conduct can reopen the picture).

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §11.A ECCTA architecture for ID-verification overlay; §21.5 FIC; §22.18 EOT; §28 transactions-in-UK-land — separate anti-avoidance regime).
2. Claim this page in `megawave3_page_tracker.md`.
3. Read this brief end-to-end.
4. Fetch + read authority URLs above + WebSearch for live competitor briefings (prioritising post-FA-2026-vintage).
5. Read closest-existing pages: FIC cluster pages, incorporation cluster pages, EOT pages, §28 transactions-in-UK-land cluster.
6. Plan H2 / H3 outline: property-owner use-case open → what a share exchange means → what s.135 + s.127 provide → the s.137 main-purpose gate (with FA 2026 update) → the s.138 advance-clearance route → what HMRC looks for → what happens if clearance fails → ITA 2007 Part 13 Ch 1 income-tax trap → CTA 2010 Part 15 corporate counterpart → s.139 asset-level alternative → 7-step practitioner sequence close.
7. Verify factual claims per §16.35 — every TCGA / ITA / CTA section cited; the FA 2026 s.137 substitution + new (7) "arrangements" definition.
8. Fetch hero image.
9. Write markdown.
10. Build clean.
11. Six verifications + do-not-write GREP.
12. Apply redirect repointing if needed.
13. Register in `monitored_pages`.
14. Commit: `MegaWave 3 RUN C: anti-avoidance-rules-share-exchanges-and-reorganisations`.
15-19. Per workflow.

## Work log (Stage 2 + RUN session populate)

[RUN session records work here at write time. **Stage 2 verification notes (2026-05-27):** TCGA 1992 s.135 verbatim verified (heading + 25%/general-offer/majority-voting conditions); s.137 verbatim verified including **FA 2026 substitution effective 18 March 2026** (replaces (1) with (1)–(1C); omits former (2)–(3); adds (7) "arrangements" definition "any agreement, understanding, scheme, transaction or series of transactions (whether or not legally enforceable)"; modifies (4) on assessment procedures); s.138 verbatim verified (s.138(1) HMRC notification of satisfaction; s.138(2) further-particulars 30-day window; s.138(3) HMRC 30-day notification window; tribunal-escalation route); ITA 2007 Part 13 Chapter 1 contents verified verbatim. HMRC Capital Gains Manual CG52500 confirmed live. **§37 HP-lock candidate (F-101) confirmed as appropriate for Stage 1b decision** — page operates within statutory cluster not currently locked at any HP section. Case-law citations (*Brebner*, *Mytravel*, *Cleary*, *Joiner*, *Snell*) carried as Stage 2 research targets; RUN session BAILII-verifies each. No NEW HP lock raised at Stage 2 (F-101 already raised at Stage 1).]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent C on 2026-05-27.
- **Stage 2 author:** MW3 Stage 2 Sub-Agent C (batch M3-C-B1) on 2026-05-27.
- **Cluster anchor:** TCGA ss.127, 135-139 + ITA 2007 Part 13 Ch 1 + CTA 2010 Part 15. Property-context use cases for share-exchange + reconstruction anti-avoidance.
- **HP-lock alignment:** no existing lock covers this statutory cluster. F-101 raised at Stage 1 as §37 HP-lock candidate ("Share-exchange + reconstruction reliefs + transactions-in-securities anti-avoidance — TCGA 1992 ss.127, 135-139 + ITA 2007 Pt 13 Ch 1 + CTA 2010 Pt 15"). Stage 1b decision whether to scope at MW3 or defer to MW4.
- **§16.36 statutory-citation cross-check (Stage 2):** all TCGA s.135-139 + s.127 + ITA 2007 Pt 13 Ch 1 verbatim verified at legislation.gov.uk on 2026-05-27. The FA 2026 s.137 substitution (effective 18 March 2026) is captured in the FAQ + worked-example structure; not a drift catch (the seed already flagged the live-amendment target at §16.35).
- **§16.31 URL verification (Stage 2):** legislation.gov.uk anchors all live; HMRC CG52500 live. No dead-link drops at Stage 2. Competitor list deferred to RUN-time WebSearch per Bug #3 discipline + the FA-2026-vintage filter requirement.
- **Cannibalisation reasoning:** no existing site page covers share-exchange or reconstruction anti-avoidance. FIC cluster covers share-class architecture but not the s.137 gate. Incorporation cluster covers s.162 asset-level relief but not share-level mechanics. EOT cluster covers a different transfer route. Clean cluster gap; no CANNIBAL.
- **Anti-templating watchpoints for RUN session:** (a) property-owner use-case open (NOT statute-summary open); (b) the FA 2026 s.137 substitution is the page's load-bearing recent-amendment point — RUN session must capture (1)–(1C) restructure + new (7) "arrangements" definition; (c) three-route clearance discipline (s.138 + s.701 + s.748) is the closing operational fact, NOT just s.138; (d) the *Snell* post-clearance-conduct risk is the high-value nuance — surface in FAQ 10 worked context; (e) §28 transactions-in-UK-land is the adjacent cluster cross-link (different test, similar architecture) — surface but do not collapse the two.
