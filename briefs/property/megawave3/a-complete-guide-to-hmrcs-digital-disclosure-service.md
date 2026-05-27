---
slug: a-complete-guide-to-hmrcs-digital-disclosure-service
category: landlord-tax-essentials
intent: A landlord or property-business operator searching this query wants the operational architecture of HMRC's Digital Disclosure Service (DDS) — the gov.uk online portal that hosts the Let Property Campaign, the Worldwide Disclosure Facility, the Card Transaction Programme, and the catch-all voluntary disclosure route. The searcher needs to know what DDS is, which campaign route applies to their facts (residential rental → LPC; offshore → WDF; UK-only non-rental → general DDS), the notification + 90-day disclosure + payment cycle, the Sch 41 unprompted-disclosure mitigation floor, and the boundary at which DDS is the wrong route (deliberate-behaviour cases with criminal-prosecution exposure → CoP9 / CDF instead). Property context: this page is framed for landlords + property-business owners, not generalist self-employed taxpayers.
---

# A Complete Guide to HMRC's Digital Disclosure Service: The DDS Architecture for UK Landlords and Property Operators

## Statutory anchor

- **Primary — disclosure obligation framework:** Taxes Management Act 1970 section 7 — notice of liability to income tax and capital gains tax. Subsection (1C)(a) requires notification within "the period of 6 months from the end of the year of assessment". Verified live 2026-05-27 at `https://www.legislation.gov.uk/ukpga/1970/9/section/7`. Subsection (1A)/(1B) identify the persons within scope (broadly: anyone with untaxed liability not already within self-assessment).
- **Primary — failure-to-notify penalty:** Schedule 41 FA 2008 — penalties for failure to notify chargeability. The penalty bites where a landlord with untaxed rental income misses the s.7 six-month deadline. Sch 41 para 5 sets out the behaviour categories (non-deliberate / deliberate not concealed / deliberate and concealed); Sch 41 para 13 sets the unprompted-disclosure mitigation floor; Sch 41 para 20 codifies the reasonable-excuse defence. House-position-locked at §27.3 with verbatim verification 2026-05-24.
- **Primary — inaccuracy penalty (where returns already filed):** Schedule 24 FA 2007 — penalties for errors. Sch 24 para 4 sets the standard maxima; Sch 24 para 4A imports the offshore Category 1/2/3 uplift; Sch 24 para 14 enables suspension of careless penalties. House-position-locked at §27.2.
- **Supporting — late filing penalties (where SA returns are missed):** Schedule 55 FA 2009. House-position-locked at §27 framework. Sch 55 also covers MTD ITSA from 6 April 2026 under §19.7.
- **Supporting — discovery + extended time limits (the alternative if HMRC opens enquiry first):** TMA 1970 s.29 (discovery) + s.34 (ordinary 4 years) + s.36 (careless 6 years / deliberate 20 years) + s.36A FA 2019 (offshore innocent-error 12 years). House-position-locked at §27.1.
- **Supporting — Failure-to-Correct offshore overlay:** FA 2017 Schedule 18 (FtC regime; pre-30-September-2018 offshore matters carry a minimum 200% penalty post-deadline, reducible to 100% on full unprompted disclosure + asset-based penalty + naming-and-shaming). House-position-locked at §27.6.
- **House position reference:** §27.6 (voluntary disclosure routes — LPC + WDF + DDS + CoP9 architecture) is the primary anchor; §27.2 (Sch 24) and §27.3 (Sch 41) provide the penalty-banding mechanics this page must cite without duplicating. Closure of §27.5 (CoP9) provides the boundary on the deliberate-behaviour side. No NEW HP LOCK NEEDED — fully covered by Wave 7 §27 lock.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **DDS architectural overview** — what the Digital Disclosure Service is as an HMRC online product, which campaign sub-routes sit inside it (LPC + WDF + Card Transaction Programme + general voluntary disclosure), how to choose between them, and how the 90-day disclosure cycle works operationally. The closest pages on our site sit at the campaign-specific layer: `benefits-of-participating-in-the-let-property-campaign` (sibling M3-A-B1 pick, focused on LPC specifically), `let-property-campaign-why-voluntary-disclosure-makes-sense` (sibling M3-A-B3 pick, the why-disclose framing), `let-property-campaign-penalty-calculator` (M3-A-B3, calculator-led), `know-about-let-property-campaign` (M3-A-B2), and `missed-taxes-let-property-campaign-to-the-rescue` (M3-A-B3). All five focus on LPC. None of them describes the **DDS umbrella architecture** — the gov.uk online portal at `tax.service.gov.uk/digital-disclosure` that hosts LPC + WDF + Card Transaction Programme + the catch-all "general voluntary disclosure" route as four distinct campaign tracks within one digital product.

The angle this page takes: an operator (landlord, property-developer, serviced-accommodation host, BTL portfolio owner) who has identified some prior-year unfiled liability needs to know which route inside DDS to use BEFORE they start the disclosure cycle, because the campaign-track choice locks the disclosure window (LPC: notify-then-90-days; WDF: notify-then-90-days extendable to 180; general DDS: 90-day default), the eligibility (residential rent only → LPC; offshore → WDF + FtC overlay; UK-only non-rental → general DDS), and the penalty-banding access (LPC unlocks the most favourable mitigation floors for residential rental income; general DDS is the catch-all with standard Sch 41 floors). This page is the routing layer that the campaign-specific pages assume the reader has already navigated.

## Key questions this page must answer

1. What is the Digital Disclosure Service in product terms — the gov.uk online portal launched 5 September 2016, the campaign sub-tracks it hosts, and how the gov.uk URL routes a user into the right track?
2. What is the legal basis for the disclosure obligation — TMA 1970 s.7 notification, Sch 41 failure-to-notify penalty mechanics, and Sch 24 inaccuracy penalty for already-filed returns containing errors?
3. How do you choose the correct campaign sub-track within DDS — residential rental → LPC; offshore → WDF + FtC overlay; card-acquirer income → Card Transaction Programme; UK-only non-rental → general DDS catch-all?
4. What is the three-step DDS cycle (notify → disclose within 90 days → pay) and how does each step interact with the Sch 41 unprompted-disclosure floor under §27.3?
5. What penalty-banding floor can a disclosing taxpayer expect — Sch 41 para 13: 0% non-deliberate within 12 months unprompted / 10% non-deliberate after 12 months unprompted / 20% deliberate not concealed unprompted / 30% deliberate and concealed unprompted; vs prompted 10% / 35% / 50%?
6. What is the boundary at which DDS is the wrong route — deliberate-fraud cases with criminal-prosecution exposure should go via CoP9 / CDF under §27.5 (HMRC-initiated or taxpayer-requested), not via DDS; offshore deliberate-conduct cases need Sch 18 FtC analysis under §27.6.
7. What does a "reasonable excuse" look like under Sch 41 para 20 and how does Perrin v HMRC [2018] UKUT 156 four-stage test apply at the disclosure-of-historic-non-notification stage?
8. How does record retention interact (§27.7 — TMA 1970 s.12B 5-year-from-31-January for income tax; CA 2006 s.388 6-year for companies)? What records does HMRC expect to support a DDS disclosure?
9. What is the position when DDS is started but the taxpayer cannot pay in full within the 90-day window — the time-to-pay arrangement (TMA 1970 s.108 + CRCA 2005) and how that interacts with the disclosure crystallisation?
10. What is the post-disclosure landscape — closure of any open enquiry under TMA 1970 s.28A; finality of liability subject to the s.29(4)/(5) re-opening conditions; HMRC's discretion on whether to pursue criminal investigation despite a complete DDS disclosure (note: DDS does NOT confer criminal-prosecution immunity — only CoP9 / CDF does).

## Manager pre-decisions placeholder

- **Category routing:** `landlord-tax-essentials` (matches live route at `Property/web/src/app/blog/landlord-tax-essentials/`). DDS is the umbrella for voluntary disclosure routes that apply across landlord scenarios. Manager to confirm or override to `property-accountant-services`.
- **Worked-example numbers:** the Sch 41 para 13 mitigation floor percentages (0% / 10% / 20% / 30% / 35% / 50%) and the FtC 200%/100% post-deadline penalty are rate-by-reference under §16.27. RUN session verifies live at write time.
- **Cross-link targets:**
  - Within MW3 Bucket A: `benefits-of-participating-in-the-let-property-campaign` (A3 sibling — LPC-specific), `know-about-let-property-campaign` (A12), `let-property-campaign-why-voluntary-disclosure-makes-sense` (A15), `let-property-campaign-penalty-calculator` (A14), `missed-taxes-let-property-campaign-to-the-rescue` (A17), `hmrcs-loan-charge-settling-disguised-remuneration-schemes` (A8 — a parallel disclosure-via-settlement-not-DDS scenario).
  - To existing pages: any Wave 7 Bucket B pages on enquiry mechanics, CoP9 / CDF guides where present, and the general tax compliance pillar.

## Stage 2 research target list

- Competitor pages to fetch (Stage 2 sources fresh via Google Search / Bing Search at write time per §16.31; Wave 8 + Wave 9 5/5 dead-rate pattern recurs): 2-4 candidates from tax-investigation specialist sites + accountancy practice voluntary-disclosure pages. Recommended search queries: "HMRC Digital Disclosure Service guide", "DDS notification process gov.uk".
- HMRC manuals + gov.uk anchors: Compliance Handbook CH150000+ (disclosure mitigation); Compliance Handbook CH71000+ (Sch 41 failure-to-notify); gov.uk page at `gov.uk/guidance/admitting-tax-fraud-the-contractual-disclosure-facility-cop9` (CoP9 boundary); gov.uk page at `gov.uk/digital-disclosure` (DDS landing — verify URL at write time).
- Legislation anchors RUN session must verify at write time: TMA 1970 s.7 + s.12B + s.29 + s.34 + s.36 + s.36A; Sch 41 FA 2008 (paras 5, 13, 20); Sch 24 FA 2007 (paras 3, 4, 4A, 9, 10, 14); Sch 18 FA 2017 (FtC).
- Case-law to ground: Perrin v HMRC [2018] UKUT 156 (reasonable excuse four-stage test); HMRC v Tooth [2021] UKSC 17 (deliberate-behaviour test for s.29(4) / s.36(1A) deliberate limb).

## Universal rules + workflow stubs (Stage 2 fills)

[Stage 2 populates from NETNEW_PROGRAM §4.]

## Work log (Stage 2 + RUN session populate)

[Stage 2 + RUN session record their work here.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Cluster anchor:** Let Property Campaign & HMRC voluntary disclosure — DDS umbrella-architecture framing. Differentiation framing: the gov.uk online product layer hosting LPC + WDF + Card Transaction Programme + general voluntary disclosure as sub-tracks, distinct from sibling LPC-specific pages in this same wave.
- **HP-lock alignment:** §27.6 (LPC + WDF + DDS + CoP9 route choice) primary; §27.3 (Sch 41 mechanics) for the penalty-banding floor; §27.2 (Sch 24) for the inaccuracy boundary; §27.5 (CoP9) for the deliberate-fraud boundary; §27.1 (s.29 / s.36 / s.36A) for the HMRC-discovery alternative. No NEW HP LOCK NEEDED.
- **§16.35 per-write verification note:** TMA 1970 s.7 verified live 2026-05-27. Sch 41 / Sch 24 mechanics anchored to §27 lock verified 2026-05-24. FtC + LPC + WDF dates anchored to §27.6 lock. RUN session WebFetches Sch 41 + Sch 24 paragraph language at write time per §16.35.
- **Cannibalisation reasoning:** five sibling LPC-specific pages exist in this same wave bucket; this page differentiates by being the DDS umbrella-architecture layer (the routing-decision layer above the campaign-specific layer). No CANNIBAL flag — sibling pages assume the reader has already navigated to the correct sub-track; this page does the navigation.
