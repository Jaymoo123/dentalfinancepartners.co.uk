# Fact verification queue — divorce-finances

Every figure any writer/builder was not 100% sure of gets appended here, then verified against PRIMARY sources in Phase 3 (fix in place, tick with source URL).

Format: `- [ ] <figure/claim> | <where used> | <writer note> | source when verified`

## Queue

- [ ] Divorce application court fee £628 from 13 July 2026 (was £612) | divorce-finance.ts DIVORCE_APPLICATION_FEE, divorce-cost-calculator, help-with-fees-checker | from the derivation doc's screener evidence; confirm against the published HMCTS EX50 fees list / the 2026 fees SI | 
- [ ] Consent order court fee £62 from 13 July 2026 (was £60) | divorce-finance.ts CONSENT_ORDER_FEE, three tools | same source as above | 
- [ ] Contested financial order (Form A) fee £292 (was £275) | divorce-finance.ts CONTESTED_FINANCIAL_ORDER_FEE | derivation doc says £275/£292; confirm new figure and effective date on EX50 | 
- [ ] Help with Fees income thresholds: £1,420 single, £2,145 couple, +£710 per child (gross monthly) | divorce-finance.ts HWF, help-with-fees-checker | post Nov 2023 scheme figures from secondary sources; derivation doc had older £1,085/£245 figures which I did NOT use; verify on gov.uk/get-help-with-court-fees | 
- [ ] HwF partial remission taper = 50p per £1 of income above threshold, and whether a hard income cap (threshold + fixed amount) also applies | hwfRemission() | implemented pure 50% taper with no upper cutoff; confirm exact rule | 
- [ ] HwF capital limits: £4,250 for fees up to £1,420; £16,000 where applicant or partner is 66+ | divorce-finance.ts HWF | confirm current figures and whether limit test is >= or > | 
- [ ] HwF qualifying benefits list incl. Universal Credit earnings limit | help-with-fees-checker field help + FAQ | confirm the UC earnings condition wording on gov.uk | 
- [ ] HwF refund window after paying a fee = 3 months | help-with-fees-checker FAQ | verify on EX160A guidance | 
- [ ] Family Mediation Voucher Scheme £500, extended into 2026/27, child-dispute cases only | divorce-finance.ts MEDIATION_VOUCHER, mediation-vs-solicitor-costs | web-verified 2026-07-24 via secondary sources (NFM, Consilia, MoJ statements); no primary gov.uk confirmation of the 2026/27 extension fetched, RE-VERIFY on gov.uk/guidance/family-mediation-voucher-scheme | 
- [ ] Online divorce service cost band £150 to £300 | ONLINE_DIVORCE_SERVICE | market estimate, spot-check current providers | 
- [ ] Solicitor uncontested divorce band £500 to £1,500 + VAT | SOLICITOR_UNCONTESTED_DIVORCE | market estimate | 
- [ ] Solicitor-negotiated settlement band £2,000 to £8,000 + VAT per person | SOLICITOR_NEGOTIATED_SETTLEMENT | market estimate | 
- [ ] Contested proceedings band £10,000 to £30,000+ per person | CONTESTED_PROCEEDINGS | market estimate, widely cited but unverified | 
- [ ] Consent order online drafting £279 to £799 + VAT | CONSENT_ORDER_ONLINE | from derivation doc SERP evidence (expressdivorce £279, ols £799); confirm current prices and whether quoted incl. VAT | 
- [ ] Consent order solicitor drafting £500 to £1,500 + VAT | CONSENT_ORDER_SOLICITOR | market estimate | 
- [ ] Independent review of a drafted consent order £250 to £500 + VAT | consent-order-cost-calculator compute | market estimate | 
- [ ] MIAM fee £90 to £120 + VAT per person | MIAM_FEE | market estimate | 
- [ ] Mediation session £100 to £200 + VAT per person per session; typical 3 to 5 sessions | MEDIATION_SESSION_PER_PERSON, MEDIATION_TYPICAL_SESSIONS | market estimate | 
- [ ] Legal-aid-funded MIAM + first session free for both parties if one qualifies | mediation-vs-solicitor-costs FAQ | verify current gov.uk position | 
- [ ] "Over 90% of financial cases settle before a final hearing" | divorce-cost-calculator FAQ | widely cited, no primary source pinned; soften or source | 
- [ ] Consent order can be applied for from conditional order stage; most approved on paper in a few weeks | consent-order-cost-calculator FAQ | verify timing claims | 
- [ ] Settlement model bands (50/50 start, 30% to 70% clamp, short-marriage < 5 years, adjustment sizes) | divorce-finance.ts settlementRange | editorial model choices, not facts; needs an Opus/specialist sanity review rather than source verification | 

- [ ] Family Mediation Voucher: £500, still open, and scope limited to cases involving children | homepage (calc card 5), for-separated-parents (stats + challenge 4), service-tiers tier 1 | scheme has been extended repeatedly; confirm live status and eligibility on gov.uk before launch | 
- [ ] CGT no gain no loss for separating spouses extended from 6 April 2023 (3 tax years after separation, unlimited under a formal divorce agreement/order) | for-divorcing-homeowners FAQ 4 (stated loosely as "since 2023 ... extended") | confident of FA 2023 change but exact window conditions need primary check (TCGA 1992 s.58 as amended) | 
- [ ] SDLT exemption on transfers between spouses under a divorce court order/agreement | for-divorcing-homeowners FAQ 4 (stated as "generally exempt") | confirm FA 2003 Sch 3 para 3 scope | 
- [ ] Home rights: non-owning spouse's right to occupy the family home and register home rights | for-divorcing-homeowners FAQ 2 | Family Law Act 1996 Part IV; confirm framing | 
- [ ] Remarriage trap: which claims are barred by remarriage before applying (MCA 1973 s.28(3)) and how pension sharing is treated | for-over-50s FAQ 4 | pension sharing nuance stated vaguely ("survives differently"); verify before tightening or keep vague | 
- [ ] Divorce application fee £628 and consent order fee £62 from 13 July 2026 | homepage stats bar, for-divorcing-homeowners stats, service-tiers | taken from CALCULATOR_DERIVATION_2026-07-24 (R3); re-confirm against published HMCTS fee schedule at build time | 
- [ ] MIAM: "most court applicants must attend first" + domestic abuse exemptions + legal aid for mediation/abuse cases | for-separated-parents FAQ 4, about page partner-firms section | per LEAD_REGULATORY_POSITION doc (verified fact, not obligation); confirm current FPR position | 
- [ ] State pension: divorce can affect inheritance/substitution from ex-spouse NI record (old vs new state pension) | for-over-50s challenge 4 | stated loosely; verify gov.uk before any tightening | 
- [ ] Collect and Pay fees: 20% collection fee on paying parent, 4% deduction from receiving parent (and derived £100/week worked example: pays £120, receives £96) | research/uk-child-maintenance-tracker (money section, FAQ 1) | standard gov.uk policy but not verified from a primary page today; confirm current fee rates | 
- [ ] No fault divorce statutory minimum 26 weeks (20-week reflection period + 6-week wait before final order) | research/uk-divorce-financial-remedy-index (timeliness section, FAQ 1) | DDSA 2020 framework, widely published; confirm exact statutory wording/periods | 
- [ ] Direct Pay compliance not measured by DWP (payments unobserved) | research/uk-child-maintenance-tracker (compliance section, FAQ 4) | inference from DWP methodology notes; confirm exact wording in the statistics guidance | 
- [ ] Contested financial order (Form A) fee £292 from 13 July 2026 (was £275) | cost-of-divorce-uk pillar (fees section, FAQ 7), consent-orders pillar | taken from CALCULATOR_DERIVATION_2026-07-24; confirm against HMCTS fee schedule (Family Proceedings Fees Order) | 
- [ ] Divorce fee payer: applicant pays; applicant 1 in a joint application | cost-of-divorce-uk pillar FAQ 2 | believed correct per gov.uk apply-for-divorce flow; confirm | 
- [ ] Consent order drafting market band £400 to £900 fixed fee | cost-of-divorce-uk + consent-orders pillars | market estimate from competitor pricing (expressdivorce £279, ols £799 per calc doc); band is deliberately wide, sanity-check current market | 
- [ ] Divorce paperwork solicitor fixed fee band £450 to £1,000 plus VAT | cost-of-divorce-uk pillar | market estimate, unverified | 
- [ ] Solicitor-negotiated settlement band £2,000 to £10,000 plus VAT per person; contested cumulative bands (several k to First Appointment, £10k-£20k through FDR, £25k+ final hearing) | cost-of-divorce-uk pillar routes 3-4 | practitioner-cited ranges, no primary source exists; label as estimates on page (done), sanity-check vs competitor cost guides | 
- [ ] Mediation cost bands: MIAM £100-£150 pp, joint sessions £120-£250 pp per session | cost-of-divorce-uk pillar route 2 | market estimate, unverified; FMC publishes some guidance | 
- [ ] Legal aid for mediation can cover MIAM + first session for BOTH parties where one qualifies | cost-of-divorce-uk pillar route 2 | believed current LAA policy; confirm on gov.uk | 
- [ ] PODE/actuarial pension report cost £1,500 to £3,000 plus VAT | pensions-and-divorce + cost-of-divorce-uk pillars | market estimate, unverified | 
- [ ] Business valuation cost band £3,000 to £10,000+ | cost-of-divorce-uk pillar | market estimate, unverified | 
- [ ] Will rewrite cost £150 to £300 each | cost-of-divorce-uk pillar (forgotten costs) | market estimate, unverified | 
- [ ] Pension sharing available for divorces from December 2000 (WRPA 1999 commencement) | pensions-and-divorce pillar, FAQ 2 | confident of WRPA 1999 and 1 Dec 2000 commencement; confirm | 
- [ ] Pension sharing order 4-month implementation period, clock starts on receipt of final order + sealed order/annex + fee | pensions-and-divorce pillar | WRPA 1999 s.34 framework; confirm start conditions wording | 
- [ ] New state pension not shareable except protected payments; old-system basic pension NI substitution for divorced people | pensions-and-divorce pillar (state pension section) | Pensions Act 2014 framework; confirm on gov.uk | 
- [ ] New state pension cohort dates (men born on/after 6 Apr 1951, women on/after 6 Apr 1953) | pensions-and-divorce pillar FAQ 5 | confident but confirm | 
- [ ] Schemes may charge for more than one CE valuation in 12 months | pensions-and-divorce pillar valuation section | believed correct under disclosure regs; confirm | 
- [ ] Attachment order income payments generally cease on recipient remarriage; payments typically stop on member death | pensions-and-divorce pillar mechanism 3 | standard practitioner statement; confirm MCA 1973 s.25B-D detail | 
- [ ] DDSA 2020 in force April 2022; 20 weeks application to conditional order; 6 weeks + 1 day conditional to final | settlement + cost pillars | confident (6 Apr 2022) but overlaps queue item above; confirm together | 
- [ ] Consent order timing: approvable from conditional order, takes effect on final order | consent-orders pillar step 4/7, FAQ 6 | standard position; confirm whether approval can precede final order in current digital process wording | 
- [ ] Section 28(1A) bar prevents extension of term maintenance | consent-orders pillar clean break section | MCA 1973 s.28(1A); confirm | 
- [ ] Court "must consider" clean break in every case | consent-orders pillar | MCA 1973 s.25A duty; confirm exact scope (duty to consider termination of obligations) | 
- [ ] Consent order paper approval turnaround "a matter of weeks" | consent-orders pillar step 6, settlement pillar FAQ 4 | varies by court; deliberately vague, sanity-check current HMCTS timeliness data | 
- [ ] Maintenance pending suit available for interim support | settlement pillar timing traps | MCA 1973 s.22; confirm | 
- [ ] Form E gov.uk URL used in settlement pillar (long publications slug) | settlement pillar disclosure section | URL pasted from memory, verify link resolves | 
