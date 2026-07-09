---
slug: law-firm-financial-distress-restructuring-uk
category: Practice Finance & Cash Flow
intent: informational-distressed-scenario
title_target: "Law Firm Financial Distress and Restructuring: UK Guide"
meta_title: "Law Firm Financial Distress and Restructuring UK | 2026"
meta_description: "Insolvency options by structure, SRA intervention triggers, run-off PII costs and partner capital calls for law firms in financial distress. England and Wales."
competitors:
  - https://www.armstrongwatson.co.uk/sectors/legal-sector/restructuring-insolvency-law-firms-navigating-financial-distress
wave: 3
pick_id: A3
stage: run-ready
authored: 2026-07-09
extended: 2026-07-09
---

# Stage 1 Seed Brief — A3: law-firm-financial-distress-restructuring-uk

## 1. Scope and collision boundary (BINDING)

This page covers the **involuntary/distressed scenario**: a law firm whose cash flow has deteriorated to the point where it must consider formal restructuring, pre-insolvency options, SRA intervention risk, run-off PII obligations, and partner capital-call exposure. It does NOT cover:

- Voluntary conversion between structures (e.g. partnership to LLP) — that is a separate topic.
- Voluntary succession or retirement buyouts — covered by the succession pages.
- Ongoing practice sale and goodwill valuation (see how-to-value-a-uk-law-firm-2026, law-firm-goodwill-valuation).

The page must cross-link to: `run-off-cover-cessation-and-tax-treatment`, the two succession pages, `handling-sra-investigation-uk-law-firms`, `solicitor-practice-working-capital`, and `tax-loans-for-law-firm-partners-funding-the-bill`.

---

## 2. Page intent and audience

**Primary audience:** Managing partners, senior equity partners, and COFAs at law firms in England and Wales experiencing declining cash reserves, covenant breach, lock-up deterioration, or creditor pressure. Also relevant to insolvency-adjacent advisers seeking to understand the law-firm-specific layer (SRA intervention, PII obligations) alongside standard corporate/partnership insolvency options.

**Search intent:** Understand what happens structurally and regulatorily when a law firm gets into financial difficulty, what formal options exist, what the SRA can do, and what the costs (run-off PII, capital calls) look like.

**Voice:** Authoritative, plain, no em-dashes. Faceless (no named experts, no client names). Lead-gen handoff model: the LeadForm is injected at footer.

---

## 3. Proposed structure

### H1: Law Firm Financial Distress and Restructuring: UK Guide

### H2: Early warning signs specific to law firms
- Lock-up days rising (WIP days + debtor days: §4 ground truth)
- Drawings exceeding allocated profits (draws are advances, not income — if cash is not there, members are drawing from capital: §2 ground truth)
- COFA escalation triggers (unreconciled client account, suspense ledgers: §5/§5.F)
- VAT payment delays as a cash-flow proxy

### H2: The structural layer matters for insolvency options

This is the core distinguishing section. Every insolvency option and its availability depends on how the firm is constituted. Three structures, three regimes:

#### H3: General partnership (Partnership Act 1890)
- No separate legal personality: partners bear **unlimited joint and several liability** (§1 ground truth).
- Insolvency procedure: the **Insolvent Partnerships Order 1994 (SI 1994/2421)** governs. Key routes:
  - Partnership Voluntary Arrangement (PVA) under modified Part I Insolvency Act 1986, per IPO 1994 Art 4-5.
  - Administration under modified Schedule B1 IA 1986, per IPO 1994 Art 6.
  - Winding up as an unregistered company under modified IA 1986, per IPO 1994 Arts 7-11 (concurrent petitions against individual partners are the norm).
- **Personal exposure:** Because there is no separate legal personality, individual partner bankruptcy is the practical endpoint. Each partner is liable for all firm debts.
- **HP flag:** The Insolvent Partnerships Order 1994 (SI 1994/2421) governs these procedures; verified at legislation.gov.uk (contents level confirmed). Full IPO procedure detail is a NEW HP LOCK NEEDED for sub-section granularity beyond what is currently in §1.

#### H3: LLP (Limited Liability Partnerships Act 2000)
- An LLP has **separate legal personality** and limited liability for members (§1 ground truth).
- Insolvency procedures: the **Limited Liability Partnerships Regulations 2001 (SI 2001/1090) Schedule 3** applies the Insolvency Act 1986 to LLPs with modifications. Available procedures:
  - **Creditors' Voluntary Arrangement (CVA)**: Part I IA 1986 as modified, member meetings replace shareholder meetings.
  - **Administration**: Schedule B1 IA 1986 as modified; an LLP can enter administration to restructure or facilitate a sale of the business.
  - **Creditors' Voluntary Liquidation (CVL)** and compulsory winding-up: Parts IV-V IA 1986 as modified; member-based procedures replace shareholder-based ones.
- **Wrongful trading / adjustment of withdrawals (s.214A IA 1986 as applied to LLPs):** A new section 214A is inserted by Schedule 3 of the LLP Regulations 2001. Where an LLP is wound up and a member took withdrawals within two years before winding-up commenced, knowing (or where they ought to have known) that the LLP was insolvent or would become insolvent, the court may declare the member liable to contribute to the LLP's assets up to the aggregate amount of those withdrawals. The knowledge test is objective: what a reasonably diligent person with the member's skill and experience would have known. This is the primary personal-liability exposure for LLP members in distress (separate from any personal guarantees). NOTE: s.214 wrongful trading also applies to LLP members as modified by the same Schedule 3 (applied with deletion of certain judicial-discretion limits).
- **HP flag:** LLP insolvency procedures per SI 2001/1090 Schedule 3 are VERIFIED at legislation.gov.uk (Schedule 3 full text). The s.214A adjustment-of-withdrawals mechanism for LLPs is CONFIRMED as a distinct insertion. This warrants a NEW HP LOCK in §1/insolvency section.

#### H3: Company / ABS (SRA-authorised incorporated firm)
- Standard Insolvency Act 1986 regime applies directly (no modifications instrument needed):
  - **Company Voluntary Arrangement (CVA)**: Part I IA 1986.
  - **Administration**: Schedule B1 IA 1986.
  - **Creditors' Voluntary Liquidation (CVL)**: Part IV IA 1986.
- **Wrongful trading (s.214 IA 1986)**: Directors (including non-lawyer directors in an ABS) can be declared liable to contribute to assets if they knew or ought to have known there was no reasonable prospect of avoiding insolvent liquidation or administration and failed to take every step to minimise creditor loss. Standard objective test: the knowledge/skill of a reasonably diligent person plus the director's actual knowledge. Remedy: court contribution order.
- Note: a company/ABS can be sold by **share sale** (unlike a partnership/LLP, which can only do an asset sale — §9 ground truth). A distressed sale may therefore be structured as a share purchase.

### H2: The SRA layer — intervention risk in distress

This section is the key differentiator from a standard corporate insolvency guide. The SRA's intervention powers sit on top of the insolvency regime and can be triggered independently of formal insolvency proceedings.

#### H3: What triggers SRA intervention?
Under **Solicitors Act 1974 Schedule 1 Part I**, the SRA may intervene in a solicitor's practice when (among other grounds):

- **Rule violations (para 1(1)(c)):** The SRA is satisfied a solicitor has failed to comply with the applicable rules (e.g. SRA Accounts Rules breaches, client-account misuse, failure to reconcile — §5 ground truth).
- **Bankruptcy/insolvency (para 1(1)(d)):** A solicitor is made bankrupt or makes a composition with creditors.
- **Dishonesty suspected (para 1(1)(a)):** Reason to suspect dishonesty by the solicitor or employees in relation to the practice.
- **Practice abandonment (para 1(1)(h)):** The SRA is satisfied a solicitor has abandoned their practice.
- **Client protection (para 1(1)(m)):** Intervention is necessary to protect client interests or trust beneficiaries.
- **Name removed/struck off/suspended (para 1(1)(g)).**
- **Unlicensed practice (para 1(1)(k)) / condition breaches (para 1(1)(l)).**

In a financial distress context, the most live triggers are: insolvency/bankruptcy of a principal (para (d)), rule violations arising from client-account misuse under cash-flow pressure (para (c)), and client-protection grounds where client matters are at risk of being abandoned (para (m)).

**HOUSE_POSITION_EXTENSION FLAG:** The specific mechanics of what happens during an SRA intervention (vesting of client money, control of documents, practice agent appointment, costs of intervention recovered from the firm) derive from Solicitors Act 1974 Sch 1 Part II (paras 5-10 confirmed at legislation.gov.uk) PLUS the SRA's Regulatory and Disciplinary Procedure Rules. The SRA's current guidance pages on intervention mechanics were not accessible via WebFetch during brief preparation. The following is drawn from the verified statutory text of Sch 1:

#### H3: Mechanics of an SRA intervention (statutory basis: Solicitors Act 1974 Sch 1 Part II)
- **Control of client money (paras 5-7):** The SRA can apply to court to freeze payments without leave; can vest sums held for clients in trust (trust vesting); can establish special accounts for held funds. Client-account money is ring-fenced and passed to the SRA-appointed agent (usually a solicitor agent firm).
- **Document seizure (para 9):** The SRA can give notice requiring production or delivery of all practice documents. A court order can authorise entry to premises using "such force as is reasonably necessary."
- **Debt recovery (para 6A):** The SRA can vest rights to recover debts owed to the solicitor in the intervention agent.
- **Communications (para 10):** Courts may order redirection of postal, electronic and telephone communications; the SRA can manage the firm's website.
- Practical consequence: once intervention begins, the principals lose control of the practice. Clients must be notified and their files transferred or returned. The costs of the intervention (the agent's time, storage, client notification) are recoverable from the firm/its assets, adding to the insolvency burden.

**HP items for conductor gate:**
1. SRA intervention mechanics (Sch 1 Pt II paras 5-10): statutory powers confirmed at legislation.gov.uk. The SRA's own procedural guidance on how it appoints agents, timelines, and client communication protocols was not WebFetch-accessible (sra.org.uk/solicitors/firm-based-authorisation/interventions/ returned 404). Conductor should verify via an accessible SRA URL or the SRA's published intervention guidance PDF at Stage 1b.
2. The SRA Regulatory and Disciplinary Procedure Rules were also not accessible. Brief relies on Solicitors Act 1974 Sch 1 statutory text only for intervention mechanics; the Rules may add procedural detail (deadlines, notice periods, appeal rights). NEW HP LOCK NEEDED for the procedural layer.

### H2: Client account ring-fencing in distress

This section connects the §5 SRA Accounts Rules ground truth to the distress scenario.

- Client money is **not firm money** (SRA Accounts Rules 2019 Rule 2, §5). In distress, the cardinal rule is that client account cannot be used to fund the firm's own cash-flow shortfall (Rule 3.3 banking-facility prohibition, §5).
- Misuse of client account in a cash-flow crisis is an SRA Accounts Rules breach that can independently trigger intervention (para 1(1)(c) above) before insolvency proceedings are commenced.
- The COFA's duty: continue five-weekly reconciliations (Rule 8.3) even in distress; an unreconciled client account in a distressed firm is a direct intervention risk. The COFA should escalate to the SRA proactively where client money is at risk.
- Client money cannot form part of the firm's insolvency estate: it must be returned to clients or paid to the SRA intervention agent.
- Internal action: conduct an immediate client-account ledger review (§5.F), clear suspense balances (§5.F), ensure the Rule 12 accountant's report is current (§5.G).

### H2: Run-off PII — the unavoidable cost of cessation

- Every SRA-regulated firm that ceases must hold **run-off cover for six years** (SRA Indemnity Insurance Rules + MTC, Annex 1 clause 5.3 and 5.4(b), §10 ground truth). Run-off cover is triggered on **cessation of practice**, including where the firm becomes a non-SRA firm.
- Minimum sum insured under run-off: **£3 million per claim** for a relevant recognised body or relevant licensed body (LLP, company, ABS); **£2 million per claim** for sole practitioners and partnerships (§10 ground truth / SRA MTC clause 5.4(b)).
- Run-off premiums are typically the single largest cash cost of an orderly wind-down. They are front-loaded: the insurer requires payment on cessation for a block of six years. For a mid-size LLP the premium can be material relative to any realisable surplus.
- Tax treatment of run-off premiums: allowable trading expense (ITTOIA 2005 s.34 / CTA 2009 for companies, §10 ground truth). For a partnership/LLP winding up through a tax year, this is a deduction in the cessation year's computation.
- **SRA intervention and run-off:** The SRA Rules define cessation broadly to include becoming a non-SRA firm. If the SRA intervenes and the firm loses its authorisation, run-off is triggered at that point. The cost falls on the firm's residual assets (or on individual partners in a general partnership).
- Cross-link: `run-off-cover-cessation-and-tax-treatment` (full detail on PII tax treatment).

### H2: Partner capital calls in distress

- **LLP capital accounts:** LLP members have capital accounts representing their stake. In distress, a member may face a **capital call** — a demand to contribute further capital to fund the firm's operating shortfall or to fund run-off PII premiums. The LLP agreement governs whether and how capital calls can be made.
- **s.214A exposure (LLP members):** As set out above, members who took withdrawals (drawings, bonuses, profit distributions) within two years before winding-up, when they knew or ought to have known the LLP was insolvent or would become so, face a court contribution order up to the withdrawal amount. The practical planning consequence: members should reduce discretionary drawings early when distress signs emerge, and document the basis for continued drawings (ongoing profitable work, specific matter receipts).
- **General partnership partners:** Unlimited personal liability means each partner is exposed to the full firm debt, not just their capital account. A creditor can pursue any partner for the whole debt (joint and several liability). Partners need specialist personal insolvency advice alongside any firm-level restructuring.
- **Qualifying loan interest:** A member who borrowed personally to fund their capital contribution (§2 ground truth, ITA 2007 ss.398-412) can still claim interest relief while they remain a member and the capital stays in. If they are required to draw down capital to fund a capital call shortfall or winding-up costs, they should take advice on the effect on the loan interest relief.
- Personal tax obligations continue irrespective of firm distress: a partner still owes income tax + Class 4 NIC on their allocated profit share (§2/§3 ground truth), even if cash has not been drawn. Payment-on-account obligations (31 January and 31 July) do not pause. Cross-link: `tax-loans-for-law-firm-partners-funding-the-bill`.

### H2: Pre-insolvency restructuring options

- **Informal creditor standstill:** Before formal insolvency, a firm can seek a creditor standstill (payment holiday, deferred settlement) with its principal creditors (bank lender, HMRC, landlord). No statutory mechanism — depends on creditor agreement. Requires current management accounts and a credible recovery plan.
- **CVA (for LLP or company):** A CVA binds all unsecured creditors (including HMRC) to a composition or moratorium once approved by 75%+ in value of creditors (and 50%+ of unconnected creditors). The firm continues trading under the CVA supervisor. For a law firm LLP: the modified Part I IA 1986 route per SI 2001/1090 Sch 3.
- **Administration:** Primarily a business-sale vehicle in a law-firm context. The administrator can sell the client list and WIP book as a going concern (TOGC, no VAT if conditions met — §9 ground truth), preserving value for creditors and continuity for clients. The SRA must be notified; run-off covers legacy claims; the successor firm (buyer) takes new SRA authorisation.
- **Pre-pack administration:** A sale to a connected or external buyer agreed before the administrator is appointed, completed on day one. Controversial in legal services because it can look like partners shedding liabilities; the SRA scrutinises authorisation of the successor. Requires Statement of Insolvency Practice 16 (SIP 16) compliance and reporting to the Pre-Pack Pool where the buyer is connected.
- **Orderly wind-down without formal insolvency:** Where the firm is solvent but distressed, partners can resolve to wind down: run off open matters, return client balances, pay creditors, obtain run-off PII, and cease authorisation. The cleanest outcome but requires adequate cash headroom. Tax on cessation: WIP is treated as a trading receipt at cessation value (ITTOIA 2005 ss.182-185, §9 ground truth); transition-profit spreading continues for any partner still in the 5-year window (§4 ground truth).

### H2: HMRC in the mix — tax debts in firm distress

- HMRC is typically a major creditor: PAYE/NIC, VAT quarterly returns, and corporation tax (or partners' personal self-assessment arrears in a partnership/LLP context) all accumulate fast.
- Time to Pay (TTP) arrangements with HMRC are available for viable firms. A law firm COFA/FD should engage HMRC proactively before arrears reach enforcement. HMRC's Business Payment Support Service (0300 200 3835) can agree deferred payments.
- VAT: a distressed firm must continue filing VAT returns on time. Failure to file triggers surcharges (default surcharge regime / late payment penalties from 2025/26 for new periods). VAT collected from clients is held on trust and HMRC has preferential-creditor status for certain VAT debts in insolvency.
- MTD for ITSA: partners with qualifying income above £50,000 are in scope from 6 April 2026 (§10 ground truth). In a distress scenario this means quarterly digital filings continue regardless.

### H2: Practical distress checklist for law firm management

Short, actionable list — not a service menu:

1. Prepare current management accounts (WIP, lock-up, aged debtors, partner capital balances).
2. Conduct an immediate client-account reconciliation (Rule 8.3 — even if a regular reconciliation is not due).
3. Review all client ledgers for suspense/dormant balances (§5.F) — these must be resolved before any regulatory notification.
4. Obtain a run-off PII quote (minimum six-year cover, minimum £3m/£2m per claim by structure).
5. Identify HMRC arrears: PAYE/NIC, VAT, CT/self-assessment; initiate TTP if viable.
6. Seek legal advice on personal exposure (capital calls, s.214A for LLP members, unlimited liability for partners).
7. Notify the COLP and COFA immediately — both have personal regulatory duties; concealment of financial difficulty is itself an SRA Code of Conduct risk.
8. If formal insolvency is likely, engage an insolvency practitioner with law-firm experience alongside the firm's accountant (the SRA regulatory layer is not standard corporate IP territory).

---

## 4. Statutory anchors (VERIFIED — updated Stage 2, 2026-07-09)

| Anchor | Source | Verified? |
|---|---|---|
| Solicitors Act 1974 Sch 1 Pt I (intervention grounds, paras 1(1)(a)(aa)(b)(c)(d)(e)(ee)(f)(g)(h)(j)(k)(l)(m)) | https://www.legislation.gov.uk/ukpga/1974/47/schedule/1 | YES — WebFetch 2026-07-09 confirmed all grounds and para numbers at full-text level |
| Solicitors Act 1974 Sch 1 Pt II (intervention powers, paras 5-7, 6A, 9, 10) | https://www.legislation.gov.uk/ukpga/1974/47/schedule/1 | YES — WebFetch 2026-07-09 confirmed para structure |
| Insolvent Partnerships Order 1994 (SI 1994/2421) Arts 4-11 (PVA, administration, winding up routes) | https://www.legislation.gov.uk/uksi/1994/2421/contents | YES — full article structure confirmed 2026-07-09; Art 7 (no concurrent petitions) and Art 8 (concurrent petitions) text also fetched verbatim |
| LLP Regulations 2001 (SI 2001/1090) Sch 3 (IA 1986 applied to LLPs — CVA, administration, winding-up, s.214 wrongful trading, s.214A adjustment of withdrawals) | https://www.legislation.gov.uk/uksi/2001/1090/schedule/3 | YES — WebFetch 2026-07-09 confirmed full s.214A wording verbatim (2-year lookback, withdrawal definition, knowledge test, cap) |
| IA 1986 s.214 (wrongful trading — companies) | legislation.gov.uk/ukpga/1986/45/section/214 | YES — test, standard, remedy confirmed (carry-through from seed) |
| IA 1986 s.214A (adjustment of withdrawals — LLPs, via Sch 3 SI 2001/1090) | https://www.legislation.gov.uk/uksi/2001/1090/schedule/3 | YES VERBATIM — "period of two years ending with the commencement of the winding up"; withdrawal = "share of profits, salary, repayment of or payment of interest on a loan to the LLP or any other withdrawal of property"; knowledge = "knew or should have known the LLP was at the time of the withdrawal unable to pay its debts"; cap = "aggregate of amounts or values of all withdrawals within two years" |
| SRA Indemnity Insurance Rules + MTC Annex 1 clause 5.3/5.4(b) (run-off cover — 6 years, £3m/£2m) | https://www.sra.org.uk/solicitors/standards-regulations/indemnity-insurance-rules/ | YES — carry-through from HP §10 (verified 2026-06-03) |
| SRA Accounts Rules 2019 Rule 3.3, 8.3 (banking-facility prohibition, reconciliation) | HP §5 (verified 2026-06-03) | Carry-through |
| ITTOIA 2005 ss.182-185 (WIP on cessation as trading income) | HP §9 | Carry-through |
| ITA 2007 ss.398-412 (qualifying loan interest) | HP §2 | Carry-through |
| Partnership Act 1890 (unlimited liability) | HP §1 | Carry-through |
| SRA intervention guidance (procedural/agent mechanics) | sra.org.uk | WRITE-TIME FETCH REQUIRED — all tested URLs returned 404 (2026-07-09); write from Sch 1 Pt II statute only and hedge procedure |

---

## 4A. Write-time fetch resolution (Stage 2, 2026-07-09)

### IPO 1994 (SI 1994/2421) articles 7-11 — RESOLVED

WebFetch on 2026-07-09 confirmed the full article structure at legislation.gov.uk/uksi/1994/2421. The relevant articles:

- **Art 4 (Part II):** Voluntary arrangement of insolvent partnership (PVA under modified Part I IA 1986).
- **Art 5 (Part II):** Voluntary arrangements of members of insolvent partnership (individual members).
- **Art 6 (Part III):** Administration in relation to insolvent partnership (modified Schedule B1 IA 1986).
- **Art 7 (Part IV):** Winding up of insolvent partnership as unregistered company on petition of creditor etc. where NO concurrent petition presented against a member. Applies Part V IA 1986 with modifications per Schedule 3 Pt I of the IPO. Petitioners include creditors, liquidators, temporary administrators, responsible insolvency practitioners, and the Secretary of State.
- **Art 8 (Part IV):** Winding up of insolvent partnership as unregistered company on petition of creditor etc. where concurrent petitions ARE presented against one or more members. Part V IA 1986 applies with modifications per Schedule 4. This creates the coordinated concurrent-petition framework (the most common route in practice): one petition against the partnership and parallel bankruptcy petitions against individual partners.
- **Art 9 (Part V):** Winding up on member's petition where no concurrent petition against a member.
- **Art 10 (Part V):** Winding up on member's petition where concurrent petitions against all members.
- **Art 11 (Part V):** Insolvency proceedings NOT involving winding up of partnership as unregistered company, where individual members present a joint bankruptcy petition (pure personal insolvency route without winding up the partnership as an entity).
- **Art 11A (Part VI):** Decision procedure in insolvency proceedings relating to insolvent partnerships.

**Live verified URL:** https://www.legislation.gov.uk/uksi/1994/2421/contents — confirmed 2026-07-09.

WRITE NOTE FOR WRITER: The key practical route for a general partnership in distress is Art 8 (concurrent petitions against partnership + individual partners). Art 7 (creditor petition, no concurrent member petition) is a secondary route. Art 11 (joint bankruptcy petition by members, no firm winding up) covers the scenario where the partners prefer personal bankruptcy over a firm wind-up. State these with correct article numbers.

### SRA intervention guidance — PARTIALLY RESOLVED (statute confirmed, procedure pages 404)

Two separate SRA URLs were attempted during Stage 1b (conductor note in seed brief) AND again at Stage 2 (2026-07-09):
- https://www.sra.org.uk/consumers/problems/intervention/ — **404**
- https://www.sra.org.uk/solicitors/firm-based-authorisation/interventions/ — **404**
- https://www.sra.org.uk/solicitors/guidance/intervention/ — **404**
- https://www.sra.org.uk/risk-and-compliance/case-studies/intervention/ — **404**

**Resolution:** Solicitors Act 1974 Sch 1 Pt I (grounds) and Pt II (powers) are VERIFIED at legislation.gov.uk/ukpga/1974/47/schedule/1 (confirmed 2026-07-09). All grounds (paras 1(1)(a)(aa)(b)(c)(d)(e)(ee)(f)(g)(h)(j)(k)(l)(m)) and all powers (paras 5-7, 6A, 9, 10) are confirmed from statute. The SRA procedural guidance (how agents are appointed, timeline, client notification protocols) remains WRITE-TIME FETCH REQUIRED from a live sra.org.uk source. The statute alone is sufficient for accurate copy; hedge procedural language accordingly.

**WRITE-TIME FETCH REQUIRED — SRA intervention guidance:** Before writing the "mechanics of intervention" section, attempt to fetch https://www.sra.org.uk/consumers/firms/firm-closed/ or https://www.sra.org.uk/consumers/get-help/firm-closed/ for consumer-facing intervention description. If those also 404, write the mechanics from Sch 1 Pt II statutory text only (paras 5-7, 6A, 9, 10) and note the source is statutory, not SRA procedural guidance.

### s.214A adjustment of withdrawals — RESOLVED VERBATIM

WebFetch of SI 2001/1090 Sch 3 on 2026-07-09 confirmed the exact wording of the inserted s.214A:

- **Two-year lookback period:** "the period of two years ending with the commencement of the winding up" — CONFIRMED.
- **Definition of withdrawal:** "whether in the form of a share of profits, salary, repayment of or payment of interest on a loan to the limited liability partnership or any other withdrawal of property" — CONFIRMED. This is wider than simple profit drawings: it catches salary-style fixed payments, loan repayments, interest payments, and any other property extracted by the member.
- **Knowledge test (objective):** the court may declare liability where the member "knew or should have known the LLP was at the time of the withdrawal unable to pay its debts" or would become unable after the withdrawal.
- **Cap on liability:** the declaration "cannot exceed the aggregate of the amounts or values of all the withdrawals...made by that person within the period of two years."

**Live verified URL:** https://www.legislation.gov.uk/uksi/2001/1090/schedule/3 — confirmed 2026-07-09.

---

## 4B. Competitor analysis (Armstrong Watson — verified live 2026-07-09)

**URL:** https://www.armstrongwatson.co.uk/sectors/legal-sector/restructuring-insolvency-law-firms-navigating-financial-distress — **LIVE** (confirmed 2026-07-09).

**Topics covered on that page:** early diagnosis and strategic turnaround, stakeholder management, cash flow stabilisation, accelerated mergers and acquisitions as an exit route, formal insolvency options (administration, CVA, liquidation). Written from the perspective of a restructuring adviser selling specialist services.

**Differentiation for this page:**
1. Armstrong Watson leads with services; this page leads with the legal framework (what the law actually does to you by structure).
2. Armstrong Watson does not parse the three-structure analysis (company/LLP/partnership) with distinct statutory regimes.
3. Armstrong Watson does not address s.214A LLP withdrawal clawback with statutory precision, nor the two-year lookback.
4. Armstrong Watson does not address SRA intervention powers with specific Schedule 1 paragraph references.
5. This page includes the tax dimension throughout: cessation-year WIP treatment, partner payment-on-account obligations, run-off PII deductibility, s.214A as a personal income/tax liability.
6. Audience handoff: this page's lead form routes to a tax accountant who understands the SRA regulatory layer, not a restructuring IP who may lack the regulatory background.

**Cross-link differentiation note (collision_verify §A3):** this page sits between `run-off-cover-cessation-and-tax-treatment` (PII detail, which this page cross-links for tax treatment of the premium), `handling-sra-investigation-uk-law-firms` (SRA process post-event, which this page cross-links for investigation mechanics), and the succession pages (voluntary exit, which this page cross-links to contrast with the involuntary/distressed scenario). This page is the ONLY page covering the involuntary/distressed scenario as a unified framework.

---

## 4C. Worked examples (for writer to embed in body)

### Example 1: s.214A clawback scenario (LLP member, £120k drawings over 2 years)

**Scenario:** A four-partner LLP specialising in residential conveyancing. Lock-up has been rising for 18 months (WIP days 75, debtor days 45 — combined 120 days). The LLP has been loss-making for two years. Member A, a senior equity partner, drew the following in the 24 months before the LLP entered creditors' voluntary liquidation (CVL) on 1 March 2026:

| Period | Type | Amount |
|---|---|---|
| Mar 2024 to Sep 2024 | Profit share (drawings on account) | £55,000 |
| Oct 2024 to Mar 2025 | Profit share (drawings on account) | £40,000 |
| Apr 2025 to Feb 2026 | Salary-style fixed draw | £25,000 |
| **Total within 2-year window** | | **£120,000** |

The LLP's management accounts for the year ended 31 March 2025 showed net liabilities. The COFA raised a concern in October 2024 (within the two-year window) that client reconciliations were taking longer than usual and cash was tight.

**s.214A analysis:**

- Lookback period: 2 years ending 1 March 2026 = 1 March 2024 to 1 March 2026. All £120,000 is within the window.
- Knowledge test (objective): did Member A know or should they have known the LLP was or would become unable to pay its debts? The COFA's October 2024 concern email, the net-liability balance sheet as at 31 March 2025, and the continued drawing of £25,000 in salary-style amounts (Oct 2025 to Feb 2026) create strong grounds for a liquidator to argue the objective test is met from at least October 2024.
- All three types of withdrawal count: profit-share drawings, and the salary-style fixed draw all fall within "share of profits, salary... or any other withdrawal of property."
- Maximum court order: up to £120,000 (the aggregate of all withdrawals in the two-year period).
- **Practical planning consequence:** a member who spots the distress signs early (rising lock-up, net-liability balance sheet, COFA concerns) should reduce discretionary drawings and document the specific matter receipts justifying any continued drawing. Reducing drawings from October 2024 onwards would have cut the potentially clawable amount materially.

**Income tax note:** the £120,000 was already taxed as income in Members A's hands as it was paid (as allocated profit share, §2 ground truth). If a s.214A contribution order is made, Member A pays the money back to the LLP's estate from after-tax funds. There is no automatic income-tax refund on the clawback: it is a capital payment back to the LLP, not a trading loss. Members should take specialist tax advice on whether any relief is available under ITTOIA 2005 or as an allowable deduction against capital.

### Example 2: Run-off PII as a distress cost (premium multiple illustration per HP §10)

**Scenario:** A three-partner LLP doing residential conveyancing and private client work. Annual PII premium (run-on cover): £18,000 per year. Firm ceases practice (whether voluntarily or via SRA intervention) on 30 June 2026.

**Run-off PII obligation (HP §10):** the firm must obtain six-year run-off cover. Minimum sum insured: £3 million per claim (relevant recognised body / LLP, per SRA MTC Annex 1 cls 5.3/5.4(b)).

**Premium multiple:** run-off premiums are typically set at a **multiple of the annual run-on premium** reflecting the insurer's aggregate exposure over 6 years with no new premium income. Market multiples for a conveyancing-heavy firm vary, but a range of **1.5x to 3x** the annual premium is common. At a 2x multiple on this firm: **£36,000**, payable upfront at cessation.

Note: if the firm is in financial distress, this £36,000 is a creditor priority payment that must be funded before distribution to other creditors. If the SRA intervenes and the firm loses its authorisation, run-off is triggered immediately and this cost sits against the residual assets (which may already be depleted).

**Tax treatment:** the run-off premium is an allowable trading expense in the cessation year (ITTOIA 2005 s.34 for a partnership/LLP; CTA 2009 for a company). For a partnership/LLP winding up through a tax year, this is a deduction in the cessation-year profit computation, allocated to partners in their profit-sharing ratio for that period. Cross-link: `run-off-cover-cessation-and-tax-treatment` for full detail.

**Writer note:** do NOT state a specific market multiple as a definitive figure. Present the range illustratively and state that actual premiums depend on claims history, practice area mix, and insurer. The point is that the premium is a material upfront cost, not a deferred one.

### Example 3: Decision matrix — CVA vs administration vs orderly wind-down

| Factor | CVA (LLP/company) | Administration | Orderly wind-down (solvent) |
|---|---|---|---|
| **Firm is solvent?** | Not required (CVA can be for insolvent entity) | Not required | Required: assets exceed liabilities |
| **Continue trading?** | Yes, under CVA supervisor | Possibly (trading to sale) | Yes, running off open matters |
| **Client continuity?** | High (firm continues) | Partial (sale of practice preserves some) | High (matters run to completion or transferred) |
| **SRA authorisation?** | Retained (firm continues under CVA) | Lost on administration/sale (buyer takes new auth) | Retained until voluntary cessation |
| **Run-off triggered?** | No (firm continues in practice) | Yes on cessation of practice | Yes on cessation |
| **HMRC position?** | Bound by CVA (75%+ creditor vote) | Preferential creditor for certain debts | TTP arrangement recommended pre-cessation |
| **Partner personal liability?** | LLP: capital calls per LLP agreement; no s.214A if CVA avoids winding up. Partnership: unlimited, unaffected. | s.214A exposure crystallises on winding up following administration. | None beyond capital accounts unless personal guarantees exist |
| **Best suited to?** | Viable underlying practice, creditor support obtainable, SRA engagement active | Sale of client list/WIP to preserve value; unviable as ongoing practice | Solvent but distressed; cash headroom sufficient to fund run-off + creditor settlement |

**Writer note:** present this as a table in the body copy. State clearly that selecting the right route requires insolvency-practitioner advice combined with regulatory advice (the SRA layer is not standard IP territory).

---

## 4D. FAQ full draft answers (Questions 8-12)

(Questions 1-7 were listed in seed brief as starters without answers. Writer drafts 1-7 from body content. Full draft answers for 8-12 below.)

### FAQ 8: Are partners in a general partnership personally liable for firm debts in insolvency?

Yes. A general partnership formed under the Partnership Act 1890 has no separate legal personality: there is no corporate veil. Each partner is **jointly and severally liable** for all the firm's debts and obligations incurred while they were a partner. This means a single creditor can pursue any one partner for the full amount owed by the firm (not just that partner's share), and that partner must then seek contribution from their co-partners.

In insolvency, the Insolvent Partnerships Order 1994 (SI 1994/2421) governs the procedure. The most common route (Art 8) involves concurrent petitions: one winding-up petition against the partnership as an unregistered company, and parallel bankruptcy petitions against individual partners. The practical endpoint for each partner is personal bankruptcy if the firm's liabilities exceed the partners' combined personal assets.

There is no equivalent of the LLP's s.214A two-year lookback in a general partnership context: partners were always personally liable throughout, so there is no need for a clawback mechanism. Each partner should take personal insolvency advice alongside any firm-level proceedings.

### FAQ 9: What are the tax consequences of a law firm ceasing practice mid-year?

Several tax events crystallise on cessation:

**WIP and work in progress:** under ITTOIA 2005 ss.182-185, when a trade ceases, any work in progress is brought into account as a trading receipt at its cessation value (the amount for which it could reasonably be expected to sell in the open market at the date of cessation). This is income, not capital, and is allocated to partners in their profit-sharing ratio for the cessation period.

**Cessation year profits and payments on account:** the cessation year's taxable profit (including WIP) is assessed on the tax-year basis (from 2024/25, per Finance Act 2022). Partners with existing payments on account (due 31 January and 31 July) must continue to meet those obligations even during wind-down. HMRC does not automatically pause payments on account because the firm is in distress; a partner who is cash-constrained should review their estimated cessation-year income and, if materially lower than the previous year, submit a claim to reduce payments on account under TMA 1970 s.59A(3A).

**Overlap relief on cessation:** if the firm has a non-31-March year-end and the partner has unused overlap relief (from pre-tax-year-basis periods), the overlap relief is deducted in the cessation year, reducing the final tax charge. Partners with significant overlap relief (and little remaining under the five-year spreading) benefit from cessation triggering the relief early.

**Run-off PII premium:** deductible as a trading expense in the cessation year (ITTOIA 2005 s.34). Cross-link: `run-off-cover-cessation-and-tax-treatment`.

**Capital gains on goodwill:** if the firm had any goodwill value and that goodwill was distributed or realised on cessation, the gain is a capital gain on each partner's share, subject to CGT (18%/24% standard; BADR at 18% from 6 April 2026 if conditions met). Most distressed wind-downs realise little or no goodwill value.

**MTD for ITSA:** partners with qualifying income above £50,000 remain in scope from 6 April 2026 regardless of the firm's distress; quarterly digital filings continue through the cessation year.

### FAQ 10: What is a pre-pack administration in a law firm context?

A pre-pack administration is a sale of a business agreed with a buyer before the administrator is appointed, completed on the first day of administration. In a law-firm context it typically involves an insolvency practitioner agreeing terms with a buyer (which may be the existing partners forming a new vehicle, or an external acquirer) for the purchase of the client list, WIP, equipment, and goodwill.

Pre-packs can be attractive in a law-firm distress because they:
- preserve client continuity (clients are transferred to the new firm with minimum disruption)
- protect the value of WIP (a going-concern sale achieves more than a piecemeal asset realisation)
- may qualify as a TOGC for VAT purposes (transfer of a going concern, no VAT) if the conditions are met

However, pre-packs in legal services attract scrutiny from two angles. First, the SRA must be satisfied that the successor firm meets its own authorisation requirements independently; the SRA does not automatically transfer authorisation from the failed firm to the buyer. Second, where the buyer is connected to the existing partners (a common "phoenix" structure), the sale must comply with Statement of Insolvency Practice 16 (SIP 16) reporting requirements and must be reported to the Pre-Pack Pool for independent scrutiny (mandatory for connected-party sales under the Administration (Restrictions on Disposal etc. to Connected Persons) Regulations 2021).

The run-off PII obligation attaches to the old firm from the date of cessation of its SRA authorisation, regardless of the pre-pack structure. The cost of that run-off is a creditor claim against the old firm's assets and reduces the net realisations available to creditors.

### FAQ 11: Can run-off PII premiums be claimed as a tax deduction?

Yes. Run-off PII premiums are an allowable trading expense under the wholly-and-exclusively test (ITTOIA 2005 s.34 for a partnership or LLP, CTA 2009 for a company). The deduction arises in the cessation year's profit computation: the premium is paid to obtain the six-year run-off cover that is a mandatory regulatory requirement on cessation, and it is incurred for the purposes of the trade (protecting clients and meeting SRA requirements arising from the practice).

For a partnership or LLP, the deduction is made at firm level before profit allocation, so each partner receives the benefit in proportion to their profit-sharing ratio for the cessation period. The premium is not a capital payment: it purchases insurance cover, not a permanent asset.

PII premiums (including run-off premiums) are **VAT-exempt** (VATA 1994 Sch 9 Group 2: insurance), so there is no input VAT to reclaim on the premium payment.

Cross-link: `run-off-cover-cessation-and-tax-treatment` for full worked treatment including the interaction with cessation-year WIP.

### FAQ 12: What is a partnership voluntary arrangement (PVA)?

A partnership voluntary arrangement (PVA) is a formal insolvency procedure that allows an insolvent partnership to propose a composition or arrangement with its creditors, binding all unsecured creditors once approved. It is governed by the Insolvent Partnerships Order 1994 (SI 1994/2421, Art 4), which applies Part I of the Insolvency Act 1986 to partnerships with modifications.

The procedure involves the partners (or a licensed insolvency practitioner as nominee) preparing a proposal for creditors, typically a schedule of repayments funded from future revenues or asset realisations. Creditors must approve the proposal by a majority of 75% or more in value. Once approved, the PVA binds all unsecured creditors including HMRC (who can be included in the arrangement, unlike in some other restructuring options).

A PVA is available to a general partnership only (not an LLP: an LLP uses a CVA under the modified IA 1986 Part I route per SI 2001/1090 Sch 3). The PVA does not protect individual partners from personal creditors: it binds creditors of the partnership as a firm but does not automatically stay proceedings against individual partners. Article 5 of the IPO 1994 deals with voluntary arrangements of the members themselves alongside the firm PVA, allowing a combined procedure.

In a law-firm context, a PVA requires the SRA to be notified (insolvency of a partner is an intervention trigger under Solicitors Act 1974 Sch 1 para 1(1)(d)); the firm should engage the SRA proactively to minimise intervention risk during the arrangement.

---

## 4E. Differentiation note and cross-link list (per collision_verify A3)

### Differentiation from sibling pages

| Sibling page | What it covers | What this page does NOT repeat |
|---|---|---|
| `run-off-cover-cessation-and-tax-treatment` | Full PII tax treatment, MTC detail, cessation timing | This page summarises run-off as a distress COST and cross-links for detail; does not re-explain MTC clauses at length |
| `handling-sra-investigation-uk-law-firms` | SRA investigation process (post-event, conduct/discipline) | This page covers SRA INTERVENTION (involuntary takeover), which is distinct from a disciplinary investigation; both are cross-linked |
| `law-firm-goodwill-valuation` / `how-to-value-a-uk-law-firm-2026` | Valuation methodology | This page does not cover valuation; notes that goodwill realisation in distress is typically low |
| `solicitor-practice-working-capital` | Cash flow management, lock-up, debtor management | This page assumes that working-capital management has failed; cross-links as the earlier-stage page |
| Succession pages (sale/retirement) | Voluntary exit and succession planning | This page is explicitly the involuntary/distressed scenario; flags voluntary wind-down as an option only where solvency allows |
| `tax-loans-for-law-firm-partners-funding-the-bill` | Partner tax-bill funding | This page cross-links for the partner who needs liquidity to meet payment-on-account obligations during distress |
| `sra-accounts-rules-explained-for-uk-solicitors` | Full accounts rules detail | This page references Rule 3.3 and Rule 8.3 in the distress context only; does not re-explain the full accounts rules |
| `cofa-responsibilities-uk-law-firms` | Full COFA duties | This page covers COFA escalation triggers in distress only; cross-links for full COFA duties |

### Required cross-links in body copy

- `run-off-cover-cessation-and-tax-treatment` (mandatory, at run-off section and FAQ 11)
- `handling-sra-investigation-uk-law-firms` (mandatory, at SRA intervention section)
- `solicitor-practice-working-capital` (mandatory, at early warning signs section)
- `tax-loans-for-law-firm-partners-funding-the-bill` (mandatory, at partner capital calls section)
- `sra-accounts-rules-explained-for-uk-solicitors` (mandatory, at client account ring-fencing section)
- `cofa-responsibilities-uk-law-firms` (mandatory, at COFA section)
- Both succession pages (one cross-link at pre-insolvency options, noting orderly wind-down is the succession-planning scenario)

---

## 5. HP-lock flags — status after Stage 2 write-time resolution (2026-07-09)

### FLAG-A3-1: SRA intervention mechanics (procedural layer) — REMAINS OPEN
**Status:** All tested SRA URLs returned 404 at Stage 2 (2026-07-09):
- sra.org.uk/consumers/problems/intervention/ — 404
- sra.org.uk/solicitors/firm-based-authorisation/interventions/ — 404
- sra.org.uk/solicitors/guidance/intervention/ — 404
- sra.org.uk/risk-and-compliance/case-studies/intervention/ — 404

**Resolution for writer:** Write intervention mechanics from Solicitors Act 1974 Sch 1 Pt II only. Do not state specific timelines for agent appointment or client notification that are not in the statute. Hedge procedural language: "under Schedule 1 Part II, the SRA may..." rather than asserting specific procedural steps derived from SRA guidance.
**Writer instruction:** At write time, attempt https://www.sra.org.uk/consumers/firms/firm-closed/ and https://www.sra.org.uk/consumers/get-help/firm-closed/. If those also 404, write from statute only.

### FLAG-A3-2: IPO 1994 (SI 1994/2421) sub-article detail — RESOLVED
**Resolved at Stage 2 (2026-07-09):** Full article structure confirmed (Arts 4-11A and beyond). Arts 7 and 8 text fetched verbatim. See §4A above for confirmed article titles and coverage. Writer may now cite specific articles (Art 7 for no-concurrent-petition creditor route; Art 8 for concurrent-petition route; Art 11 for joint member bankruptcy without firm winding up).
**Live URL confirmed:** https://www.legislation.gov.uk/uksi/1994/2421/contents

### FLAG-A3-3: s.214A two-year lookback and withdrawal definition — RESOLVED VERBATIM
**Resolved at Stage 2 (2026-07-09):** Exact statutory wording confirmed from Sch 3 SI 2001/1090.
- Two-year period: "period of two years ending with the commencement of the winding up" — CONFIRMED.
- Definition of withdrawal: "whether in the form of a share of profits, salary, repayment of or payment of interest on a loan to the limited liability partnership or any other withdrawal of property" — CONFIRMED.
- Knowledge test: member "knew or should have known the LLP was at the time of the withdrawal unable to pay its debts" — CONFIRMED.
- Cap: "aggregate of the amounts or values of all the withdrawals...made by that person within the period of two years" — CONFIRMED.
**Live URL confirmed:** https://www.legislation.gov.uk/uksi/2001/1090/schedule/3

---

## 6. Cross-links (existing pages to link to)

- `run-off-cover-cessation-and-tax-treatment` — PII detail
- `handling-sra-investigation-uk-law-firms` — SRA process
- `solicitor-practice-working-capital` — cash-flow context
- `tax-loans-for-law-firm-partners-funding-the-bill` — partner tax-bill funding
- Both succession pages (law firm sale / partner retirement)
- `sra-accounts-rules-explained-for-uk-solicitors` — Rule 3.3/8.3 context
- `cofa-responsibilities-uk-law-firms` — COFA duties in distress

---

## 7. Differentiation from competitor (Armstrong Watson)

Armstrong Watson's page covers the topic from the perspective of a restructuring adviser selling their service. This page takes the tax/accounting lens: the structural insolvency options by entity type (with statutory citations), the regulatory layer (SRA intervention powers with exact Schedule 1 grounds), the PII run-off cost as a quantified obligation (6 years, £3m/£2m), and the personal tax exposure of partners (s.214A, capital calls, ongoing payment-on-account obligations). Lead form handoff to the firm's accountant (not restructuring adviser).

---

## 8. Word-count target and format

- Target body: 3,000-3,500 words (non-pillar). Complex topic warrants the upper end.
- FAQs: 10-12 (schema-eligible). Suggested FAQ starters:
  1. What triggers SRA intervention in a financially distressed law firm?
  2. What is the difference between administration and CVL for an LLP?
  3. Can the SRA take control of a firm's client account during an intervention?
  4. How long must a law firm hold run-off PII after closure?
  5. What is s.214A and how does it expose LLP members personally?
  6. Can HMRC be included in a CVA for a law firm?
  7. What happens to client files when a law firm goes insolvent?
  8. Are partners in a general partnership personally liable for firm debts in insolvency?
  9. What are the tax consequences of a law firm ceasing practice mid-year?
  10. What is a pre-pack administration in a law firm context?
  11. Can run-off PII premiums be claimed as a tax deduction?
  12. What is a partnership voluntary arrangement (PVA)?
- Semantic HTML in body (no utility CSS classes).
- No em-dashes.
- LeadForm auto-injected at footer only (no LeadForm duplicate in body).
