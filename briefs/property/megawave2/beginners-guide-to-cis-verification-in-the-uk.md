---
slug: beginners-guide-to-cis-verification-in-the-uk
category: property-accountant-services
intent: Plain-language entry-level explainer for a UK property owner / landlord / developer who has heard "CIS verification" — either from an accountant, a contractor invoice, or an HMRC letter — and wants to understand what it is, when they need to do it, and what happens if they don't. Property-specific framing: where the landlord-as-deemed-contractor threshold sits, and where pure residential landlords sit outside CIS entirely.
---

# A Beginner's Guide to CIS Verification in the UK: When Property Owners Must Verify Subcontractors and What Happens If You Skip the Step

## Statutory anchor
- Primary: Finance Act 2004 c. 12, Part 3 ("Construction Industry Scheme"). Verified verbatim at https://www.legislation.gov.uk/ukpga/2004/12/contents on 2026-05-26 (sub-agent re-verifies at write time per §16.35).
  - **FA 2004 s.63** — "**Registration for gross payment or for payment under deduction**" — verified verbatim at https://www.legislation.gov.uk/ukpga/2004/12/section/63 on 2026-05-26. Establishes the subcontractor registration regime under which HMRC registers individuals or companies for either gross-payment status or payment-under-deduction status; sets out the application criteria and HMRC's assessment process.
  - **FA 2004 s.69** — "**Verification etc of registration status of sub-contractors**" — verified verbatim at https://www.legislation.gov.uk/ukpga/2004/12/section/69 on 2026-05-26. **THE operative verification anchor.** Empowers HMRC to make regulations requiring contractors (and deemed-contractors) to verify, before making payment to a subcontractor for construction work, whether that subcontractor is registered for gross-payment or registered for payment-under-deduction or unregistered.
  - **FA 2004 s.57** — Introductory + scope (defines "contract relating to construction operations" + "contractor" + "sub-contractor"). Stage 2 verifies at write per §16.35.
  - **FA 2004 ss.58-61** — Definitions: "construction contract" (s.58); "construction operations" (s.59); "contractor" + "sub-contractor" (s.60); "payments under construction contracts" (s.61). Stage 2 verifies at write.
  - **FA 2004 s.62** — Deduction obligation: where subcontractor is registered for payment-under-deduction, contractor deducts at 20%; where unregistered, contractor deducts at 30%; where subcontractor holds gross-payment status, contractor pays gross. Stage 2 verifies at write.
  - **FA 2004 s.64** — Requirements for registration for gross payment (turnover test, compliance test, business test).
  - **FA 2004 s.66** — Cancellation of registration (compliance breaches; HMRC discretion).
  - **FA 2004 s.70 + ss.71-72** — Periodic returns + records-maintenance requirements (monthly CIS returns; CIS300 monthly statement filing).
  - **FA 2004 s.74** — Meaning of "construction operations" (the definitional core — Sch A1 list of in-scope vs out-of-scope works).
- Supporting (regulations): Income Tax (Construction Industry Scheme) Regulations 2005 (SI 2005/2045) — operational regs covering registration mechanics, verification process, returns, statements, deduction certificates. Verify SI reference + amending SIs at write time per §16.27.
- Supporting (deemed-contractor regime — CRITICAL for property): FA 2004 s.59(1)(l) + Schedule 11A (deemed-contractor scope). Property businesses become deemed contractors when their average annual construction-related spend exceeds the deemed-contractor threshold. **Threshold reformed by FA 2021 + supporting regulations to a rolling-12-month £3 million test** (verify exact rate and rolling-window mechanics at write per §16.27 / §16.42 — the threshold has moved historically; current state is the £3 million rolling-12-month test which superseded the old "£1m for 3 consecutive years" averaging test under FA 2021 reforms, in force from 6 April 2021). Property-investment companies, REITs, and large landlord groups with substantial refurb / development spend cross this threshold and become deemed contractors with full CIS compliance burden (registration as contractor, monthly returns, verification of every subcontractor before payment).
- Supporting (residential-landlord carve-out): pure residential property owners who are NOT property businesses (i.e. individuals letting out their own home or a small BTL portfolio for residential rent) are generally OUTSIDE CIS as contractors — the deemed-contractor threshold does not bite for non-business individuals. Distinction: a property developer or property-investment company IS a business and counts toward the deemed-contractor threshold; an individual landlord letting personally-owned residential property is not. Stage 2 sub-agent verifies the precise individual / business boundary at write time against HMRC CIS Manual + sub-section of s.59(1)(l) / Sch 11A.
- House position reference: **NEW LOCK CANDIDATE** — house_positions.md does NOT currently contain a section on CIS, deemed-contractor thresholds, or the residential-landlord carve-out. F-51 raised in `megawave2_site_wide_flags.md` to surface a Stage 1b HP-lock candidate for CIS property-context floor (statutory architecture; deemed-contractor £3m rolling test; verification process; gross-payment vs payment-under-deduction status; residential-landlord-individual carve-out; property-developer-and-investment-company in-scope position; penalties for verification failure). Stage 2 sub-agent should treat WebFetched statutory anchors as the floor until the lock is signed off; case-citation density is low for CIS (no leading case bottleneck) so the statutory + manual + SI route is sufficient even without HP lock.

## Framing differentiator (anti-templating, anti-cannibalisation)

**Net-new topic territory** for the site. The site carries `domestic-reverse-charge-construction-vat-landlords` (VAT domestic reverse charge for construction — a VATA-side topic; CIS is parallel but distinct, on the income-tax side). No existing page on CIS verification, gross payment status, or the deemed-contractor regime. Stage 2 sub-agent: re-grep blog corpus at write time for "CIS", "Construction Industry Scheme", "FA 2004 Part 3", "deemed contractor", "gross payment", "verification", "subcontractor" — if a sibling has shipped between this Stage 1 seed and Stage 2 write, raise CANNIBAL flag in `megawave2_site_wide_flags.md` (F-50..F-99 range).

**SERP / framing logic:** the slug `beginners-guide-to-cis-verification-in-the-uk` is explicitly entry-level + verification-focused. The searcher is most likely a property owner / landlord / developer who has received either (a) an HMRC nudge letter on CIS, (b) a contractor invoice asking for their CIS reference, or (c) advice from an accountant that their spend has crossed the deemed-contractor threshold. They want to know **what the verification step is, why they have to do it, and what happens if they skip it**. The page should be **process-led** with clear "do you need to do this? — yes if X, no if Y" framing.

Tone is plain-language; H2s mix question-led and process-led ("Do I need to verify?", "How does verification work?", "What if I skip the verification step?"); word count target 2,200-2,600. Stage 2 must lead with the boundary question (am I a contractor or deemed contractor in scope?) before walking the mechanics — there is significant risk of writing a generic CIS explainer that loses the property-business angle.

**Counter-pattern Stage 2 must avoid:** opening with the statute ("Section 69 of the Finance Act 2004 requires construction contractors to verify..."). Open instead with the property-owner-facing scenario: "If your property business has crossed the £3 million construction-spend threshold over the last 12 months, or if you've taken on a refurb project as a property developer, you are now a contractor under the Construction Industry Scheme. That means before you pay any subcontractor for construction work, you have to verify them with HMRC first..."

## Key questions this page must answer

1. **What is CIS verification in one paragraph?** (A statutory pre-payment check under FA 2004 s.69 + SI 2005/2045 that contractors and deemed-contractors must complete with HMRC before making any payment to a subcontractor for construction work. Verification establishes the subcontractor's CIS registration status — gross-payment, payment-under-deduction at 20%, or unregistered at 30% — which dictates the contractor's withholding obligation under FA 2004 s.62. HMRC returns a verification reference per subcontractor.)
2. **Who has to do CIS verification — am I in scope?** (Property-business decision tree: **(a) Pure residential individual landlords** — generally OUT of CIS as contractors (not a "contractor in the construction industry" under s.59(1)(k) and not a business hitting the deemed-contractor threshold under s.59(1)(l)). **(b) Property developers** — IN scope from the start (mainstream contractor under s.59(1)(k)). **(c) Property-investment companies / large landlord groups** — IN scope as **deemed contractors** once average annual construction-related spend crosses the deemed-contractor threshold (currently £3 million rolling 12 months per FA 2021 reforms; verify rate and rolling-window mechanics at write per §16.27 / §16.42). **(d) REITs / property funds / HMO operators with significant capex programmes** — same deemed-contractor logic. Stage 2 sub-agent walks each path with a concrete example.)
3. **What construction work counts — what's "construction operations" under FA 2004 s.74 + Sch A1?** (The CIS definition is broad: construction, alteration, repair, extension, demolition, installation of systems in buildings. It catches major refurbs, conversions, extensions, kitchen / bathroom installations, electrical / heating / plumbing systems work. It excludes professional services (architects, surveyors, valuers — separate s.74 carve-out); pure manufacture / delivery of materials (with installation excluded); routine cleaning and decorating where not part of a larger construction contract. The boundary is well-litigated; Stage 2 sub-agent surfaces 2-3 boundary illustrations from HMRC CIS Manual.)
4. **How does the verification step actually work — process walkthrough?** (Process: (a) contractor obtains subcontractor's full legal name, UTR, NI number (sole trader) or company UTR + Companies House number (Ltd Co), Business Tax Account access; (b) contractor logs into HMRC CIS online portal OR uses commercial CIS software OR calls the CIS helpline; (c) HMRC system checks subcontractor against CIS register and returns one of three responses: gross-payment status / registered for payment-under-deduction / unregistered; (d) HMRC issues a verification reference (Vxxxxxxxxx) which the contractor records against the subcontractor for the verification's lifetime (typically valid for 2 tax years for that contractor-subcontractor relationship); (e) contractor applies the correct withholding rate (0% / 20% / 30%) on each subsequent payment.)
5. **What is gross-payment status and how does a subcontractor get it?** (FA 2004 s.64 + Sch 11 sets the three-test gate: **turnover test** (£30,000 net construction turnover individual / per partner, or higher for companies); **compliance test** (timely tax + NIC returns + payments over the qualifying period — typically the last 12 months); **business test** (carrying on a genuine construction business with appropriate UK trading premises + bank account). HMRC reviews status annually. Failure of any test triggers downgrade to payment-under-deduction.)
6. **What does the verification result mean for the payment?** (Three withholding states under FA 2004 s.62: **Gross-payment status** — contractor pays gross, no deduction. **Registered for payment-under-deduction** — contractor deducts 20% of labour element (materials portion excluded under FA 2004 s.61(2) + SI 2005/2045 reg 6). **Unregistered** — contractor deducts 30% of labour element. Deduction is paid to HMRC monthly under FA 2004 s.62 + s.70 returns regime; subcontractor receives a deduction certificate and credits the deduction against their year-end income tax liability.)
7. **What happens if I make a payment without verifying?** (FA 2004 s.69 + SI 2005/2045 + s.62 trigger penalty exposure under TMA 1970 / FA 2009 penalty regime. Headline consequences: contractor liable for the under-deducted tax (HMRC can recover the 20% or 30% that should have been deducted from the contractor under FA 2008 Sch 41 / Reg 13 of SI 2005/2045); penalties on top per FA 2009 Sch 55 + Sch 56 for late filings; potential withdrawal of contractor's gross-payment status if held; reputational + ongoing-compliance friction with HMRC. The penalty path is steep enough that "verify everyone before paying anyone" is the operational discipline.)
8. **What if my CIS subcontractor's status changes mid-project?** (Verification result is generally valid for 2 tax years for that contractor-subcontractor relationship; the contractor uses the same verification reference + withholding rate for that period. Status changes (e.g. subcontractor loses gross-payment status mid-relationship) — HMRC notifies the contractor on the verification record at the next verification or via the contractor's monthly return; contractor adjusts withholding from the notification date forward. Re-verification required when the 2-year window expires or when the contractor-subcontractor relationship lapses then resumes.)
9. **Do I have to file monthly CIS returns even if no payments made?** (FA 2004 s.70 + SI 2005/2045 — yes, monthly CIS300 return required for every month from registration until deregistration. If no payments made in a month, file a nil return. Failure-to-file penalty applies even to nil returns. Many property businesses set up CIS contractor registration only to forget the monthly nil-return obligation; this is a common HMRC penalty source.)
10. **How does this fit alongside the VAT domestic reverse charge for construction?** (Two parallel regimes that interact but don't merge. CIS = income tax withholding on subcontractor labour payments. VAT domestic reverse charge = VAT-side mechanism where customer (contractor) accounts for VAT on inbound construction supplies instead of supplier (subcontractor) charging it. Forward-link to `domestic-reverse-charge-construction-vat-landlords` for the VAT-side mechanics; this page focuses on the income-tax-side CIS verification step. A subcontractor on a job for an in-scope contractor will trigger BOTH regimes simultaneously: CIS withholding on labour element + reverse charge on VAT on labour + materials.)

## Manager pre-decisions placeholder
- Category routing: `property-accountant-services` (services / process / compliance topics — best fit; matches the operational-compliance flavour of CIS. Alternative is `landlord-tax-essentials` if framing is landlord-as-deemed-contractor focused; recommend `property-accountant-services` because CIS is more of a contractor-side compliance regime than a landlord-tax topic. Sub-agent flagged for manager arbitration.).
- Worked-example numbers: deemed-contractor £3 million threshold — **rate-by-reference framing** per §16.27 / §16.42; verify FA 2021 + supporting SI at write per §16.35. Deduction rates (0% / 20% / 30%) — operative rates from FA 2004 s.62, stable since 2007; if HMRC publishes a rate change verify before publication. Gross-payment turnover test (£30k net) — long-stable but verify against current FA 2004 s.64 + Sch 11 at write.
- Cross-link targets: `domestic-reverse-charge-construction-vat-landlords` (sibling VAT-side regime — forward-link from question 10); `landlord-expenses-allowable-uk-2026` (refurb cost treatment — forward-link from question 3); sibling MW2 pages where they ship.

## Stage 2 research target list
- Competitor pages to fetch (Stage 2 verifies liveness before listing): BDO / Saffery / Crowe / RSM CIS briefings (for established-firm framing); ICAEW Tax Faculty + ATT / CIOT technical articles on the post-FA-2021 deemed-contractor reforms; HMRC CISR (Construction Industry Scheme Reform) manual cross-references; landlord-press CIS explainers (Landlord Today, Property118, This is Money landlord pages — verify liveness); CIS-software vendor explainers (FreeAgent, Xero CIS module documentation — for the process-flow framing).
- HMRC + Companies House manuals to cite: **HMRC CIS Manual (CISR0001+)** is the primary manual — verify each section live at write. CISR12000+ (registration); CISR14000+ (verification process); CISR15000+ (deductions); CISR17000+ (returns); CISR20000+ (enforcement + penalties). Also **HMRC CIS booklet CIS340** (the public guidance — the most-cited landing reference for non-specialist users); verify URL liveness at write.
- Case-law to ground: CIS case-law density is low; rely on statute + manual + SI. Notable potentially-relevant: *G C Lockton (London) Ltd v HMRC* (CIS gross-payment-status compliance test); *J P Whitter (Water Well Engineers) Ltd v HMRC* [2018] UKSC 31 (UKSC on gross-payment-status withdrawal — verify citation at write). Stage 2 sub-agent verifies any case citations against BAILII at write.

## NEW HP LOCK NEEDED — CIS property-context floor

house_positions.md does NOT yet contain locked positions on:
- FA 2004 Part 3 architecture (registration, verification, deduction, returns).
- The deemed-contractor £3m rolling-12-month threshold (FA 2021 reform) for property-investment-business in-scope.
- The pure-residential-individual-landlord out-of-scope carve-out.
- Property-developer always-in-scope position.
- Verification process + 2-year validity window + status-change notification mechanic.
- Penalty exposure for unverified payments.

Raised F-51 in `megawave2_site_wide_flags.md` to surface this gap for Stage 1b reviewer. Stage 2 sub-agent can proceed in the absence of the lock by self-sourcing the statutory anchors above, but the lock would materially improve consistency for any future CIS-touching page (BTL refurb cost-management pages, property-development pages, REIT compliance pages).

## Universal rules + workflow stubs (Stage 2 fills)
[Stage 2 populates from NETNEW_PROGRAM §4 — voice (no em-dashes; commas, parentheses, full stops, middle dots only); lead-gen architecture (LeadForm footer auto-injected; aside-styled inline CTAs at conversion moments — after the "am I in scope?" decision-tree paragraph, after the verification-process walkthrough, after the penalties paragraph); semantic HTML only; FAQs 11-12 entries given process-led + decision-tree mix; FAQPage JSON-LD auto-emitted; cannibalisation re-grep against the construction-VAT corpus at write time; rate-by-reference for £3m + deduction rates + gross-payment turnover test per §16.27; quality bar six-verification gate (0 em-dashes, 0 Tailwind class attrs, FAQ count match, metaTitle ≤62, metaDescription ≤158, all internal `/blog/...` links resolve); anti-templating opening per the framing-differentiator (open with the property-owner scenario, not the statute); per-write figure verification gov.uk + HMRC CIS Manual at write time per §16.35.]

## Work log (Stage 2 + RUN session populate)
[Stage 2 + RUN session record their work here. Stage 1 seed verifications: FA 2004 s.63 ("Registration for gross payment or for payment under deduction") and s.69 ("Verification etc of registration status of sub-contractors") existence + headings verified verbatim via WebFetch against https://www.legislation.gov.uk/ukpga/2004/12/section/63 and https://www.legislation.gov.uk/ukpga/2004/12/section/69 on 2026-05-26. Other FA 2004 section attributions (ss.57-62, s.64, s.66, s.70-72, s.74) used here are pre-treated as statute-of-record per the published FA 2004 Part 3 contents page; Stage 2 sub-agent re-verifies each at write time per §16.35. £3 million deemed-contractor rolling-12-month threshold per FA 2021 reforms — figure cited here but NOT independently verified at seed time; Stage 2 sub-agent verifies via gov.uk + FA 2021 + SI 2005/2045 amending SIs + HMRC CIS Manual at write per §16.27 + §16.35. Case-law placeholders (J P Whitter UKSC, G C Lockton) flagged for strict-verify at Stage 2. F-51 raised for HP-lock candidate.]

### Stage 2 extension log
- **2026-05-27** — Stage 2 sub-agent (M2-B-B1) appended Competitor URLs, Closest-existing-pages cannibalisation context, Redirect-overlap check, Authority links, Universal rules, 19-step Workflow, and Per-page work-log skeleton (below). **HP-LOCK NEWLY THREADED: §33 Construction Industry Scheme (FA 2004 Part 3) property-business context floor** signed off by Stage 1b reviewer 2026-05-27 (commit 96ea3a6 closing F-51). §33 now anchors B4 with: statutory architecture (FA 2004 Part 3 ss.57-77 + SI 2005/2045 implementation), in-scope categorisation for property businesses (developers always in; investment companies + large landlord groups at £3m rolling-12-month deemed-contractor threshold per FA 2021; pure-residential individual landlords out), verification process, withholding rates (0% / 20% / 30% on labour element only — materials excluded per s.61(2) + reg 6), returns + penalties (CIS300 monthly + nil-return rule + late-filing exposure), interaction with VAT domestic reverse charge, do-not-write list. Stage 2 sub-agent did NOT independently re-verify FA 2004 s.63 + s.69 (carried forward verbatim from Stage 1 — confirmed live URL). £3m deemed-contractor threshold + FA 2021 commencement remain rate-by-reference per §16.27 (RUN session WebFetches gov.uk + amending SIs at write). Case-law citations (*J P Whitter (Water Well Engineers) Ltd v HMRC* [2018] UKSC 31; *G C Lockton (London) Ltd v HMRC*) require BAILII strict-verify by RUN session per §16.36 before publication.

---

## Competitor URLs (Stage 2 populated 2026-05-27; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` + `BeautifulSoup(html, "lxml")`. Extract treatment of: (a) the "am I in scope?" decision-tree (residential individual carve-out vs developer always-in vs property-investment-company at £3m threshold); (b) the verification process walkthrough (UTR / personal code / 3-status return); (c) the 0%/20%/30% withholding rates and the labour-element-only rule; (d) the monthly CIS300 nil-return trap; (e) the CIS-vs-reverse-charge interaction (parallel regimes, distinct bases); (f) the post-FA-2021 £3m threshold mechanics. Lead-firm pieces (BDO, Saffery, Crowe, RSM) typically frame as construction-sector compliance; landlord-press tends to under-surface the deemed-contractor angle. RUN session flags any competitor copy that asserts all landlords need to register for CIS as drift (per §33 do-not-write list — pure-residential individual landlords are not contractors).

- https://www.bdo.co.uk/en-gb/insights/tax/property/construction-industry-scheme-property-investors (BDO Property CIS briefing — established-firm framing)
- https://www.saffery.com/insights/articles/construction-industry-scheme-property-businesses/ (Saffery CIS briefing — deemed-contractor framing for property)
- https://www.crowe.com/uk/insights/construction-industry-scheme-cis (Crowe UK CIS overview — operational walkthrough)
- https://www.rsmuk.com/insights/cis-construction-industry-scheme (RSM UK CIS briefing — mid-tier-firm framing)
- https://www.icaew.com/insights/tax-news/construction-industry-scheme (ICAEW Tax Faculty CIS technical article — independent professional-body voice)
- https://www.gov.uk/government/publications/construction-industry-scheme-cis-340 (HMRC CIS340 booklet — public guidance, the most-cited landing reference; verify URL liveness at write)
- https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform (HMRC CIS Manual — verify exact section live at write)

**Borrowable patterns:** the "am I in scope?" decision-tree; the verification walkthrough; the labour-element-only withholding framing; the nil-return monthly-filing trap; the FA 2021 £3m threshold reform context. Do NOT borrow any competitor copy that asserts all landlords are CIS contractors (per §33 do-not-write); do NOT borrow any deduction calculation that includes materials in the base (drift against s.61(2) + reg 6 carve-out); do NOT borrow any case citation without strict-verifying via BAILII per §16.36.

---

## GSC data

*Net-new page; primary topical queries expected: "CIS verification UK", "CIS verification process", "construction industry scheme verification", "how to verify CIS subcontractor", "do landlords need CIS registration", "deemed contractor CIS £3 million", "CIS verification for property investors", "CIS gross payment status".*

---

## Closest existing pages (cannibalisation context)

- `domestic-reverse-charge-construction-vat-landlords` (cannibal score ~0.30 — parallel VAT-side regime; **cross-link from question 10** for the CIS-vs-reverse-charge interaction; differentiation = B4 is income-tax-side CIS withholding, reverse-charge page is VAT-side mechanism; both trigger simultaneously on same payment but operate on different bases)
- `landlord-expenses-allowable-uk-2026` (~0.18 — refurb cost treatment context; **cross-link from question 3** for the construction-operations boundary and the capital-vs-revenue line)

**Cannibalisation discipline:**
- The site has NO existing CIS page; B4 is the canonical entry point on income-tax-side CIS.
- Cross-link the reverse-charge page from question 10; do NOT re-walk the VAT-side reverse-charge mechanics.
- Cross-link the allowable-expenses pillar from question 3; do NOT re-walk the broader expense taxonomy.
- Sibling MW2 pages forward-link as they ship.
- Stage 2 sub-agent re-greps blog corpus at write time for "CIS", "Construction Industry Scheme", "FA 2004 Part 3", "deemed contractor", "gross payment", "subcontractor verification"; if a sibling page has shipped between this brief and write, raise CANNIBAL flag in F-50..F-99 range.

---

## Redirect overlap (on launch)

No existing middleware redirect matches B4's slug or near-slugs (verified 2026-05-27 against `Property/web/src/middleware.ts`). No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-27; session selects 6-8)

**Statutory (FA 2004 Part 3 + SI 2005/2045):**
- FA 2004 c. 12 (contents): https://www.legislation.gov.uk/ukpga/2004/12/contents
- FA 2004 s.62 (Deduction obligation — operative withholding rates): https://www.legislation.gov.uk/ukpga/2004/12/section/62
- FA 2004 s.63 (Registration for gross payment or for payment under deduction — verified verbatim 2026-05-26): https://www.legislation.gov.uk/ukpga/2004/12/section/63
- FA 2004 s.64 (Requirements for registration for gross payment — turnover / compliance / business tests): https://www.legislation.gov.uk/ukpga/2004/12/section/64
- FA 2004 s.66 (Cancellation of registration): https://www.legislation.gov.uk/ukpga/2004/12/section/66
- FA 2004 s.69 (Verification etc of registration status of sub-contractors — verified verbatim 2026-05-26): https://www.legislation.gov.uk/ukpga/2004/12/section/69
- FA 2004 s.70 (Periodic returns + records): https://www.legislation.gov.uk/ukpga/2004/12/section/70
- FA 2004 s.74 (Meaning of "construction operations" — Sch A1): https://www.legislation.gov.uk/ukpga/2004/12/section/74
- Income Tax (Construction Industry Scheme) Regulations 2005 (SI 2005/2045): https://www.legislation.gov.uk/uksi/2005/2045/contents
- FA 2021 (deemed-contractor reform — verify §3m threshold + commencement 6 April 2021 at write)

**HMRC manuals + guidance:**
- HMRC CIS340 booklet (public guidance; verify URL liveness at write): https://www.gov.uk/government/publications/construction-industry-scheme-cis-340
- HMRC CISR (Construction Industry Scheme Reform Manual): https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform
- CISR12000+ (registration); CISR14000+ (verification process); CISR15000+ (deductions); CISR17000+ (returns); CISR20000+ (enforcement + penalties)

**Case-law (BAILII; RUN strict-verify each before publication per §16.36):**
- *J P Whitter (Water Well Engineers) Ltd v HMRC* [2018] UKSC 31 — UKSC on gross-payment-status withdrawal
- *G C Lockton (London) Ltd v HMRC* — CIS gross-payment-status compliance test (verify FTT / UT citation at write)

**Cross-references in house_positions.md:** **§33 primary** (NEW lock — Construction Industry Scheme property-business context floor, signed off 2026-05-27 closing F-51); §33.1 statutory architecture; §33.2 verification process; §33.3 withholding rates + materials exclusion; §33.4 returns + penalties; §33.5 reverse-charge interaction; §16.27 rate-by-reference for £3m threshold + withholding rates + £30k turnover test; §16.42 per-write figure verification.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Re-verify at write time against legislation.gov.uk + gov.uk + HMRC CIS Manual: (a) FA 2004 Part 3 s.62 + s.63 + s.64 + s.66 + s.69 + s.70 + s.74 verbatim text; (b) £3 million deemed-contractor rolling-12-month threshold per FA 2021 + amending SIs at HMRC CIS Manual + gov.uk; (c) withholding rates 0% / 20% / 30% at FA 2004 s.62; (d) gross-payment turnover test £30k at FA 2004 s.64 + Sch 11; (e) materials-exclusion rule at s.61(2) + SI 2005/2045 reg 6; (f) CIS340 booklet URL liveness at write per §16.31. **§16.36 statutory cross-check:** verify every section / schedule / paragraph cited against legislation.gov.uk verbatim; verify every case name + neutral citation against BAILII before transcription.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Plain-language, process-led tone with clear "do you need to do this? — yes if X, no if Y" framing. Addressed to a property owner / landlord / developer who has received either an HMRC nudge letter, a contractor invoice asking for CIS reference, or accountant advice that they have crossed the deemed-contractor threshold.
- Specific worked frames using anonymised personas (Patel-developer-Manchester; Singh-property-investment-company-100-units; Mawell-residential-landlord-3-houses); no real client names.
- Named statute every time a rate or rule is asserted (FA 2004 s.62, s.69, SI 2005/2045 reg 6).

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline. Semantic HTML only.

### CTA placement guidance (per this page)
- 3 inline `<aside>` CTAs:
  - After the "am I in scope?" decision-tree paragraph (high-intent: reader has just calibrated whether the regime applies to them)
  - After the verification-process walkthrough (high-intent: reader ready to register + start verifying)
  - After the penalties paragraph (high-intent: reader who has been paying subcontractors without verifying and is now realising the back-tax exposure)
- Vary opening; do NOT lead with "Section 69 of the Finance Act 2004 requires construction contractors to verify...". Open with the property-owner-facing scenario per the framing-differentiator instruction: "If your property business has crossed the £3 million construction-spend threshold over the last 12 months, or if you've taken on a refurb project as a property developer, you are now a contractor under the Construction Industry Scheme. That means before you pay any subcontractor for construction work, you have to verify them with HMRC first...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 11 to 12 for this process-led decision-tree explainer. Include explicit FAQ on the residential-individual carve-out (question 2 path (a)), the monthly nil-return trap (question 9), and the CIS-vs-reverse-charge interaction (question 10).

### Cannibalisation
- The site has NO existing CIS page; B4 is canonical entry point.
- Cross-link `domestic-reverse-charge-construction-vat-landlords` from question 10 for the parallel VAT-side regime.
- Cross-link `landlord-expenses-allowable-uk-2026` from question 3 for the construction-operations / capital-vs-revenue framing.
- Sibling MW2 pages forward-link as they ship.

### House positions
- §33 primary (NEW lock — Construction Industry Scheme property-business context floor, signed off 2026-05-27 closing F-51); honour every sub-section.
- §16.27 (rate-by-reference for £3m threshold + withholding rates + turnover test); honour rate-by-reference framing.
- §16.36 (case-citation strict-verify discipline); RUN strict-verifies case citations.
- §33 do-not-write list (pure-residential individual landlords out; CIS applies beyond developers; verification not one-off; nil-returns required; deduction on labour only); honour all bullets.

### Quality bar
- Body word count: 2,200 to 2,600 (process-led decision-tree; matches the deemed-contractor-decision pattern).
- FAQs: 11 to 12.
- External authority links: 6 to 8.
- Build clean: `cd Property/web && npm run build`.
- All six verifications (0 em-dashes; 0 Tailwind classes; FAQ count match; meta title under 62; meta description under 158; internal links resolve).

### Anti-templating
- Differentiator is the **process-led decision-tree** structure with mixed question-and-process H2s, distinct from the on-ramp definitional pattern (B1 + B2) and the case-law-led pattern (B3). Write to it.
- Lead with the property-owner-facing scenario per the framing-differentiator counter-pattern; do NOT open with "Section 69 of the Finance Act 2004 requires...".
- Vary H2s; "Do I need to verify?", "How does verification work?", "What if I skip the verification step?", "What happens to my monthly CIS300 return?" — mixing question and process structures.
- Vary FAQ phrasing; do NOT reuse phrasings from the reverse-charge VAT page.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. **§33 primary** (NEW lock); §16.27 + §16.36 + §16.42 adjacent.
2. Claim in tracker (⬜ to 🟦 + UTC timestamp).
3. Read this brief end-to-end.
4. Fetch competitor URLs via httpx + BeautifulSoup. Note any drift against §33 do-not-write list (most common competitor drift: claiming all landlords need to register; under-surfacing the deemed-contractor angle for property-investment companies).
5. Read closest existing pages: `domestic-reverse-charge-construction-vat-landlords`, `landlord-expenses-allowable-uk-2026`. Decide differentiation (CIS income-tax-side canonical entry point).
6. Plan H2 outline + meta + FAQs + CTA placements. Use process-led + decision-tree H2 structure.
7. Verify factual claims; **per §16.35 + §16.36: re-verify FA 2004 ss.62/63/64/66/69/70/74 verbatim; £3m deemed-contractor threshold + FA 2021 commencement at gov.uk + HMRC CIS Manual + SI 2005/2045 amending SIs; £30k gross-payment turnover test; withholding rates 0%/20%/30% at s.62; materials-exclusion at s.61(2) + reg 6; CIS340 URL liveness; J P Whitter UKSC citation via BAILII strict-verify**.
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`. Query suggestion: "construction subcontractor invoice" or "construction site office paperwork".
9. Write markdown at `Property/web/content/blog/beginners-guide-to-cis-verification-in-the-uk.md` with full frontmatter (slug, category, title, metaTitle, metaDescription, faqs, reviewer, dates, hero image).
10. Build: `cd Property/web && npm run build`.
11. Run the six verifications.
12. No middleware edit required on initial launch.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on main per rolling-architecture RUN-phase convention.** Commit message format: `MW2 RUN B-B1: beginners-guide-to-cis-verification-in-the-uk page (M2-B-B1 pick B4)`.
15. Fill in the per-page work-log below.
16. Mark ✅ done in tracker with 1-line Notes.
17. Append any site-wide issues to `megawave2_site_wide_flags.md` (F-50 to F-99 range for Bucket B).
18. Append discoveries to `megawave2_discovery_log_session_B.md`.
19. Claim next page.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Meta description chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
-

### Existing-page review
-

### Citations added
-

### Internal links added
-

### Inline CTA placements
-

### Build attempts
-

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to megawave2_site_wide_flags.md
-

### 2-3 sentence summary
-
