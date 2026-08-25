# C1 — Regulatory availability of the 89 R1 niches

Date: 2026-08-25. Leg C1 of the niche-map redefinition. **Zero paid API calls; desk analysis
against the repo's own primary-source positions plus statute knowledge. No new web fetches.**

## Method

**What is being tested.** The estate model is faceless lead generation: a content site publishes
information, captures an enquiry through a web form, and passes it to a partner accountancy firm
for a fee. No named experts, no regulated advice given on site.

**The decisive distinction, applied to every row.** We are not carrying on the client's regulated
activity. We are selling accountancy services to people who carry it on. A vet's RCVS registration,
a care home's CQC registration, a security firm's SIA licence, a taxi driver's PHV licence and a
jeweller's high-value-dealer registration all bite on the *client* and are irrelevant to us. A
regime only produces a non-CLEAR verdict if it bites on **us** (the publisher/introducer) or on the
**partner accountant** who has to deliver the thing the page sells.

**Regimes tested.** FSMA s.19/s.21/s.23 and the RAO 2001 (arts 25, 36A, 53, 61, 89F-89N);
claims management (RAO arts 89G, 89M, 89N, 89V); insurance distribution; consumer credit and credit
broking; OISC (Immigration and Asylum Act 1999 ss.84, 91); Legal Services Act 2007 s.12/Sch 2
reserved activities; Companies Act 2006 Part 42 audit registration and its sector mandates
(Charities Act 2011, Academy Trust Handbook, SRA Accounts Rules); HMRC repayment-agent regime
(Income Tax (Repayment Agents) Regulations 2023); the avoidance-promoter regimes (DOTAS FA 2004
Pt 7, POTAS FA 2014 Pt 5, enablers FA 2017 Sch 16); MLR 2017; sector licensing.

**Effort split, as instructed.** 61 of 89 were bulk-cleared: the niche is an ordinary trading
business or profession, its own licensing regime does not touch its accountant, and the enquiry
is a straightforward request for accountancy. One line each, no further work. The remaining 28
touch regulated money, claims, credit, insurance, immigration, reserved legal work, audit-locked
assurance, health, or vulnerable people, and were reasoned individually against the specific
regime. Three of those are genuinely unresolved and are marked NEEDS-REVIEW.

**Precedents this leg is calibrated against.**
- `docs/settlement-agreements/REGULATORY_POSITION_2026-08-10.md` — per-lead referral of a potential
  claimant in one of the six claims sectors is regulated claims management (RAO art 89G), criminal
  if unauthorised (FSMA s.19/s.23). Art 89V's incidental-referral safe harbour never rescues a
  dedicated referral site.
- `expansion_research/tier2_fca/VERDICT.md` — where the *valuable* service in a niche legally
  requires a registered auditor, the moat faces the wrong way: it excludes the estate. This is a
  recurring shape, not a one-off, and it drives rows 52, 74, 76 and 77 below.
- `expansion_research/dental_finance/briefs/business_finance_BRIEF.md:32` — the estate's existing,
  worked credit-broking position: introducing a **body corporate** to a lender or broker is outside
  RAO art 36A; sole traders, individuals and small partnerships are consumer credit and would need
  FCA authorisation. Every finance cross-sell row below is fenced to that line.

**Standing constraints (apply estate-wide, not repeated per row).**
1. No avoidance-scheme promotion anywhere (DOTAS / POTAS / enablers). Cited per-row only where the
   niche's whole proposition is avoidance-shaped.
2. No contingent-fee or assignment-based tax-refund service, on any niche (HMRC repayment-agent
   registration + the deed-of-assignment ban). Cited per-row only where the audience is PAYE and
   the refund IS the commercial route.
3. No R&D "claim farm" positioning (contingent fee, volume claim preparation) on any niche that
   touches R&D relief. R&D relief itself is ordinary accountancy and is not a flag.
4. No introduction of an individual, sole trader or small partnership to a lender or broker
   (RAO art 36A). Company/LLP borrowers only.

**Verdict key.** CLEAR = no regulatory obstacle to content + lead form + handoff to an accountant.
CONDITIONAL = buildable, with a named activity, wording or monetisation route off. BLOCKED = not
doable under the current model. NEEDS-REVIEW = genuinely uncertain, needs a written position first.

## Split

| Verdict | Count |
|---|---|
| CLEAR | 61 |
| CONDITIONAL | 24 |
| BLOCKED | 1 |
| NEEDS-REVIEW | 3 |
| **Total** | **89** |

## The table

| # | Niche | Verdict | Reason | Regime |
|---|---|---|---|---|
| 1 | Landlords (buy-to-let) | CONDITIONAL | Accountancy lead is clear; the finance cross-sell is not. Safe form: tax/accountancy enquiry, plus finance introductions fenced to Ltd/LLP borrowers only, consumer BTL and individual borrowers routed away | RAO art 36A (credit broking), art 61 (regulated mortgage contract) |
| 2 | Property investors | CONDITIONAL | Same as row 1; individual investors are consumer-credit territory. Safe form: company-borrower fence, or tax-only CTA | RAO art 36A / art 61 |
| 3 | Airbnb / holiday-let hosts | CLEAR | Short-let licensing and registration bite the host, not the accountant; FHL abolition is pure tax content | — |
| 4 | Property developers | CONDITIONAL | Development-finance introductions must be company-only; the SPV structure usually satisfies that but the fence must be explicit on the page | RAO art 36A |
| 5 | Property management companies | **NEEDS-REVIEW** | Service-charge accounts certification is restricted to a "qualified accountant" as statutorily defined, and the definition plus the certification duty are mid-reform. Unresolved: what the partner may sign and what the site may claim | Landlord and Tenant Act 1985 ss.21, 28; Leasehold and Freehold Reform Act 2024 |
| 6 | Estate & letting agents | CONDITIONAL | Accountancy is clear, but client-money-protection and RICS client-money reports require specified accountants; and we must never drift into estate agency work ourselves | Estate Agents Act 1979; MLR 2017 (HMRC registration); CMP scheme rules |
| 7 | Landed estates / rural estates | CONDITIONAL | IHT/APR-BPR content is fine; it must not become will delivery, probate applications, trust or investment advice, or scheme promotion | LSA 2007 Sch 2 para 5 (probate); RAO art 53; POTAS |
| 8 | Construction / CIS subcontractors | CLEAR | Live estate site; CIS refunds are ordinary self-assessment work | — |
| 9 | Builders | CLEAR | Ordinary trade; CITB/building control bite the client | — |
| 10 | Plumbers / heating engineers | CLEAR | Gas Safe registration bites the client | — |
| 11 | Electricians | CLEAR | NICEIC/Part P bite the client | — |
| 12 | Painters & decorators | CLEAR | Unregulated trade | — |
| 13 | Landscapers / gardeners | CLEAR | Unregulated trade | — |
| 14 | Tradespeople (family) | CLEAR | Unregulated. Note: §6.1's "marketplace-locked trades" is a **competitive** lock (Checkatrade/MyBuilder), not a regulatory one, and it was recorded against consumer trade lead-gen, not accountancy | — |
| 15 | Dentists | CONDITIONAL | Live site, accountancy clear. The practice-finance cluster is only outside the perimeter because it is fenced to business-purpose company borrowing; associates and sole-trader principals must stay fenced out | RAO art 36A, art 60C business-purpose exemption |
| 16 | Doctors / GPs | CLEAR | GMC/CQC bite the client; NHS pensions and private-practice tax are ordinary accountancy | — |
| 17 | Locum doctors | CLEAR | PSC/agency tax work; standing constraint 4 applies if finance is ever added | — |
| 18 | Locum pharmacists | CLEAR | As row 17 | — |
| 19 | Pharmacies | CLEAR | GPhC bites the client; practice-purchase finance would need the company fence | — |
| 20 | Opticians / optometrists | CLEAR | GOC bites the client | — |
| 21 | Vets | CLEAR | RCVS bites the client | — |
| 22 | Therapists & allied health | CLEAR | HCPC/BACP/UKCP bite the client; we publish tax content, not health content | — |
| 23 | Nurses / healthcare professionals | CONDITIONAL | Audience is overwhelmingly PAYE, so the only natural monetisation is refund-shaped, which is the one route that is off. Safe form: informational content plus an accountancy lead restricted to self-employed/agency/bank nurses, and no benefits-claim content or onward benefits referral | HMRC repayment-agent regime + deed-of-assignment ban (Income Tax (Repayment Agents) Regs 2023); RAO art 89G specified-benefits sector |
| 24 | Care homes | CLEAR | CQC bites the client; the vulnerable people are the client's residents, not our readers | — |
| 25 | Domiciliary care agencies | CLEAR | As row 24 | — |
| 26 | Childminders / nurseries | CLEAR | Ofsted bites the client; childminder tax treatment is ordinary accountancy | — |
| 27 | Foster carers | CLEAR | Qualifying care relief is ordinary tax. Keep off benefits-claim referral (standing, see row 23) | — |
| 28 | Solicitors / law firms | **NEEDS-REVIEW** | The niche's stated hook is the "SRA accounts rules angle", but the SRA Accounts Rules accountant's report must be signed by an accountant who is or works for a **registered auditor**. This is a LIVE site (accountsforlawyers.co.uk), so the question is not whether to build but whether current wording sells assurance the partner cannot sign | SRA Accounts Rules r.12; Companies Act 2006 Part 42 |
| 29 | Barristers | CLEAR | BSB bars barristers from holding client money, so there is no accounts-rules report to be locked out of | — |
| 30 | IT contractors | CONDITIONAL | IR35 status content is fine; promoting umbrella, loan or other disguised-remuneration arrangements is not | ITEPA 2003 Pt 7A; POTAS FA 2014 Pt 5; enablers FA 2017 Sch 16 |
| 31 | Freelancers | CONDITIONAL | As row 30 | ITEPA Pt 7A / POTAS |
| 32 | Management consultants | CLEAR | Unregulated profession | — |
| 33 | Startups | CONDITIONAL | SEIS/EIS advance assurance and compliance statements for the *company* are accountancy. Introducing investors, listing opportunities or promoting a raise is not. Safe form: company-side only, no investor-facing surface | RAO art 25 (arranging deals in investments); FSMA s.21 |
| 34 | Tech / SaaS companies | CONDITIONAL | Same SEIS/EIS investor-side constraint as row 33; R&D relief content is fine subject to standing constraint 3 | RAO art 25; FSMA s.21 |
| 35 | Ecommerce sellers | CLEAR | VAT/OSS/marketplace deemed-supplier rules are ordinary accountancy | — |
| 36 | Amazon FBA sellers | CLEAR | As row 35 | — |
| 37 | Content creators / influencers | CLEAR | CAP/ASA disclosure duties bite the creator | — |
| 38 | OnlyFans creators | CONDITIONAL | No regulatory regime bites: adult content is legal and its tax is ordinary self-assessment. The constraints are ad-platform, payment-rail and brand-safety. Safe form: separate domain, tax copy only, no adult imagery, no links to creator content, no dependence on paid search | None (commercial/platform constraint, recorded here so it is not mistaken for a legal bar) |
| 39 | Crypto traders / investors | CONDITIONAL | **This is the pilot.** Tax content and CGT calculators sit outside the perimeter. Any promotion of a qualifying cryptoasset, exchange or wallet, including affiliate links and "best exchange" pages, is a financial promotion and criminal if unapproved. No investment advice. Needs its own §6.2 position doc before build | FSMA s.21 as extended to qualifying cryptoassets (FCA PS23/6); RAO art 53 |
| 40 | Day / forex traders | CONDITIONAL | Badges-of-trade and CGT content is fine; CFD/spread-bet broker affiliates, "best platform" pages and any signals or recommendations are not | FSMA s.21; RAO arts 25, 53 |
| 41 | Musicians | CLEAR | Unregulated | — |
| 42 | Actors / entertainment | CLEAR | Unregulated | — |
| 43 | Film & TV production | CLEAR | Creative-sector reliefs are mainstream statutory reliefs; standing constraint 1 covers the sector's scheme history | — |
| 44 | Artists / creatives | CLEAR | Unregulated | — |
| 45 | Authors / writers | CLEAR | Unregulated | — |
| 46 | Photographers | CLEAR | Unregulated | — |
| 47 | Interior designers | CLEAR | Unregulated | — |
| 48 | Marketing agencies | CLEAR | Live estate site; unregulated | — |
| 49 | Recruitment agencies | CLEAR | Conduct Regs and the April 2026 umbrella PAYE liability shift are *content*, not a bar. Standing constraint on umbrella promotion applies | — |
| 50 | Architects | CLEAR | ARB title protection bites the client | — |
| 51 | Engineers / engineering consultants | CLEAR | Unregulated | — |
| 52 | Financial advisers / FCA-regulated firms | **BLOCKED** | Locked on file. The valuable services (CASS audits, safeguarding audits, statutory audits, anything opined to the FCA) legally require a registered auditor the estate is not and cannot become by content. The strictly legal bar is narrower than the lock: nothing forbids selling ordinary accountancy leads to a small IFA, but that residual slice is what the estate already rejected as not worth a build | Companies Act 2006 Part 42 (audit registration); `expansion_research/tier2_fca/VERDICT.md` |
| 53 | Restaurants | CLEAR | Food and alcohol licensing bite the client | — |
| 54 | Takeaways | CLEAR | As row 53 | — |
| 55 | Pubs & bars | CLEAR | Licensing Act bites the client | — |
| 56 | Hotels & guesthouses | CLEAR | As row 55 | — |
| 57 | Hospitality (family) | CLEAR | As rows 53-56 | — |
| 58 | Event caterers | CLEAR | FSA registration bites the client | — |
| 59 | Travel agents / tour operators | CLEAR | ATOL, ABTA and the Package Travel Regs bite the client; TOMS VAT is accountancy | — |
| 60 | Hairdressers / barbers / beauty | CLEAR | Local licensing bites the client; chair rental is an employment-status tax question | — |
| 61 | Gyms / fitness / personal trainers | CLEAR | Unregulated | — |
| 62 | Sports clubs | CLEAR | CASC status is an HMRC registration held by the club | — |
| 63 | Footballers / sports professionals | CONDITIONAL | Image-rights and HNW content must not become scheme promotion, and no investment or pension advice. Sector history makes this a live risk rather than a theoretical one | DOTAS FA 2004 Pt 7; POTAS FA 2014 Pt 5; enablers FA 2017 Sch 16; RAO art 53 |
| 64 | Taxi & private-hire drivers | CLEAR | Licensing bites the driver; the HMRC tax check for licence renewal is ordinary compliance work | — |
| 65 | Couriers / delivery drivers | CLEAR | Gig-economy employment status is a tax question | — |
| 66 | Hauliers / trucking | CLEAR | O-licence bites the client | — |
| 67 | Pilots / aviation | CONDITIONAL | Mostly PAYE employees, so flight-crew expense claims are the natural route and that route is refund-shaped. Safe form: informational plus accountancy leads for contractor/self-employed pilots; no rebate service, no assignment, no contingent fee | HMRC repayment-agent regime; Income Tax (Repayment Agents) Regs 2023 |
| 68 | Farmers / agriculture | CONDITIONAL | APR/BPR reform is legitimate tax content; succession planning must not become will delivery, probate applications, or trust/investment advice | LSA 2007 Sch 2 (probate); RAO art 53 |
| 69 | Retail / independent shops | CLEAR | Unregulated | — |
| 70 | Used car dealers / automotive | CONDITIONAL | Margin-scheme VAT accountancy is clear. Motor-finance commission or mis-selling claim content, and any referral of a claimant, is regulated claims management in the financial services sector | RAO art 89G (financial services claims); FSMA s.19/s.23 |
| 71 | Jewellers | CLEAR | Hallmarking and MLR high-value-dealer registration bite the client | — |
| 72 | Cake makers / food producers | CLEAR | FSA registration bites the client | — |
| 73 | Manufacturing | CLEAR | Unregulated; R&D content subject to standing constraint 3 | — |
| 74 | Charities / non-profits | CONDITIONAL | Audit above the Charities Act threshold requires a registered auditor and independent examination requires an eligible examiner. Same failure shape as row 52. Safe form: SORP, gift aid, VAT and trustee-reporting content plus bookkeeping/management-accounts leads; never advertise assurance the partner cannot sign | Charities Act 2011; Companies Act 2006 Part 42 |
| 75 | CICs / social enterprises | CLEAR | CIC34 filing and the CIC Regulator regime are ordinary company work below audit thresholds | — |
| 76 | Churches / religious organisations | CONDITIONAL | As row 74 where the body crosses the charity audit or examination threshold; most are excepted and below it | Charities Act 2011 |
| 77 | Schools & academies | **NEEDS-REVIEW** | The buyer's mandatory need is an external audit **plus** a regularity assurance engagement reported to the department, both registered-auditor work. This is row 52's shape repeating in a bigger market, and the estate has already been burned once by mistaking an audit-locked niche for an accountancy niche. Independent schools and the tutor side may be clean; that is exactly what the position doc must separate | Academy Trust Handbook; Companies Act 2006 Part 42 |
| 78 | Tutors / private teachers | CLEAR | Unregulated; the Superprof/marketplace lock recorded in §6.1 is competitive, not regulatory | — |
| 79 | Driving instructors | CLEAR | DVSA ADI registration bites the instructor | — |
| 80 | Expats / non-residents | CONDITIONAL | Residence, SRT, double-tax and NRL content is clear. No immigration or visa advice, no eligibility assessment, and no onward referral to an immigration adviser: giving immigration advice or services unregulated is a criminal offence | Immigration and Asylum Act 1999 ss.84, 91 (OISC) |
| 81 | High-net-worth individuals | CONDITIONAL | No will delivery or probate applications, no investment or pension advice, no avoidance-scheme promotion. Safe form: tax content plus a compliance/planning enquiry to an accountant | LSA 2007 Sch 2; RAO arts 53, 53E; DOTAS/POTAS |
| 82 | Franchisees | CLEAR | UK franchising is unregulated; the BFA is voluntary | — |
| 83 | Virtual assistants | CLEAR | Unregulated | — |
| 84 | Neurodivergent business owners | CONDITIONAL | Business-tax content only. No diagnostic or medical framing, and no disability-benefit claim content or onward referral, which would be regulated claims management in the specified-benefits sector. Vulnerability makes the tone rules bite harder than the law does | RAO arts 89F/89G (specified benefits); Equality Act 2010 (tone/accessibility) |
| 85 | Energy & renewables | CONDITIONAL | Accountancy to energy and renewables businesses is clear. Any energy-broking or TPI switching monetisation is off, per the §6.1 locked-out list | Ofgem TPI regime; §6.1 lock |
| 86 | Life sciences / pharma | CLEAR | MHRA regulation bites the client; R&D content subject to standing constraint 3 | — |
| 87 | Maritime | CLEAR | Seafarers Earnings Deduction is claimed through self-assessment, ordinary accountancy. If the proposition ever becomes rebate-shaped, standing constraint 2 applies | — |
| 88 | Security firms | CLEAR | SIA licensing bites the client | — |
| 89 | Cleaning businesses | CLEAR | Unregulated | — |

## Follow-up queue: niches warranting a full written REGULATORY_POSITION

Per §6.2 every new niche needs one before Phase 0 closes. This queue is the subset where the doc is
load-bearing rather than a formality, in priority order.

1. **#77 Schools & academies** — highest risk of repeating the #52 mistake. Must separate the
   audit-locked academy-trust market from independent schools, MATs' non-assurance work and tutors.
2. **#28 Solicitors / law firms** — LIVE SITE. Verify whether the partner is or works for a
   registered auditor, and audit current accountsforlawyers.co.uk wording against SRA Accounts
   Rules r.12. This is a wording-risk check on a running site, not a build gate.
3. **#5 Property management companies** — statutory service-charge certification and who may sign
   it, under a regime that is mid-reform.
4. **#39 Crypto** — the pilot. §6.2 mandates the doc anyway; the s.21 cryptoasset promotion
   perimeter and the affiliate-monetisation ban are the specific things it must nail.
5. **#52 Financial advisers** — only if the owner ever overrides the BLOCKED lock. The doc would
   need to define the residual ordinary-accountancy slice and how the site avoids implying audit.
6. **Cross-cutting: the finance cross-sell.** Not a niche. One position covering rows 1, 2, 4 and
   15, confirming the art 36A company-borrower fence holds for individual landlords and sole-trader
   practice principals. See the contradiction below.

## Repo contradictions found

1. **§6.1's locked-out list is mislabelled "regulatory".** It reads "Locked-out verticals
   (regulatory): FCA-adjacent consumer finance, equity release, funeral plans, business energy,
   immigration, marketplace-locked trades/tutoring." But the source, `LEADGEN_NICHE_SWEEP.md`
   lines 110-124, records immigration as "KD 36-50 and vulnerable clients", tutoring and trades as
   "marketplace-locked by Checkatrade/MyBuilder/Superprof, and low lead value", and business energy
   as reputational. Those are **commercial and ethical** rejections, not regulatory bars, and they
   were made about *consumer* lead-gen, not about selling accountancy to those audiences. Read
   literally, the §6.1 label would wrongly block rows 10-14 and 78, which are among the cleanest
   niches on the list. Only equity release and funeral plans are genuinely FCA-perimeter items.
   **Recommend §6.1 splits the list into "regulatory" and "commercial/structural".**
2. **The credit-broking fence is stated two different ways.** `business_finance_BRIEF.md:32` sets a
   hard rule: company borrowers only, because introducing a sole trader or individual is consumer
   credit needing authorisation. But `track_b_spv_btl_BRIEF.md:435` specifies a landlord-facing CTA
   as a "bare introduction to a business-finance broker" with the wording only "flagged pending
   solicitor sign-off" — and individual (non-SPV) landlords are exactly the borrowers the first doc
   fences out. The BTL brief also carries a "first-time-landlord" and "expat" page in the same
   cluster. Either the SPV fence is absolute and the individual-landlord pages carry no finance CTA,
   or the sign-off happens before those pages ship. Unresolved on file.
3. **#52's "lock" is broader than its cited cause.** `tier2_fca/VERDICT.md` is a NO-GO on commercial
   grounds with audit registration as one of five reasons; the brief treats #52 as a legal lock.
   Both conclusions point the same way so nothing changes, but the ledger should say the lock is an
   estate decision reinforced by an audit bar, not a statutory prohibition on the niche.

## Notes

- No row was marked non-CLEAR because the *client* is regulated. That is the single most common way
  to over-flag this list and it was deliberately excluded, per the method above.
- The claims-management regime (RAO art 89G) reaches only three of the 89: rows 23, 70 and 84, and
  in each case only through an adjacent claim-shaped proposition, not through the accountancy
  enquiry itself. Fence the proposition and the niche is clean.
- Nothing here evaluates demand, competition or lead value. C1 is the availability gate only.
