# Data Protection Impact Assessment

Supplier-side DPIA for the Ashfield Partner Network lead distribution model, required by clause 11.3 of the Data Sharing Agreement. Prepared in line with ICO DPIA guidance. Read with the Legitimate Interests Assessment, which assesses the lawful basis; this document assesses the risk.

| | |
|---|---|
| Controller | Ashfield Trading Limited (company number 16358723) |
| Completed by | Mohammed Junayd Moughal, Director |
| Date | 14 August 2026, revised 17 August 2026 to reflect the layered transparency structure and to re-rate risk R1 accordingly |
| Review | 14 August 2027, or on any material change to the processing, and before any increase to either claim cap |
| Status | First DPIA for this processing. None existed previously; clause 11.3 has required one since the DSA was first issued. |

## 1. Is a DPIA required?

Article 35 requires one where processing is likely to result in a high risk. This processing is not on the Article 35(3) mandatory list and is not, in our assessment, high risk: the data is ordinary contact and enquiry data, volumes are small (approximately 100 enquiries a month), the data subjects are adults who have actively asked to be contacted, and there is no special category data, no systematic monitoring of a public area and no automated decision with legal effect.

Three ICO screening criteria are nonetheless engaged, which is why this assessment has been carried out rather than a bare screening note:

- Matching or combining datasets: we enrich an enquiry with data from our own analytics and from a public register.
- Innovative use of technology: an AI service grades and summarises the enquiry.
- Data used to make decisions about the individual's access to a service: the case grading determines which firms are offered the enquiry, and at what price.

We have therefore completed a full DPIA voluntarily. It is proportionate, not exhaustive.

## 2. The processing

### 2.1 Nature

Set out in full in the LIA under "How the distribution model works". In summary: an enquirer submits a form on one of 18 specialist websites; we attempt to verify their telephone number and email address; a verified enquiry is graded by case type and offered to firms in the network as a redacted alert; firms claim it and receive it in full, up to 3 accounting firms and up to 3 firms in other professions; an enquiry no firm claims cascades to the other lane after 48 hours at an unchanged price; unverified enquiries may be supplied as a batch to a single firm after 7 days.

### 2.2 Scope

| Item | Detail |
|---|---|
| Data subjects | Adults enquiring through a Site: individuals, landlords, business owners, company directors |
| Volume | Approximately 100 enquiries a month across 18 sites, from a base of roughly 190 to date |
| Personal data collected | Name, telephone, email, role, practice or company name, free-text enquiry message, rough area, page and site of origin, plus on-site behaviour |
| Personal data derived | Verification status and carrier or deliverability detail, case-type grade, one-line intent summary, internal quality score, best-contact-window inference, public-register match |
| Personal data shared | The subset in Annex A of the DSA. Derived analytics, device data, behaviour and public-register data are not shared |
| Special category data | None intended. Forms are designed to avoid it and to minimise sensitive free text |
| Children's data | Not intended. The service is aimed at adults seeking professional advice |
| Geography | UK data subjects. Processing in the UK and EEA, with processors that may process outside the UK (section 5) |
| Retention | As published in each site's privacy notice, longstop 24 months |

### 2.3 Context

Enquirers come to us deliberately, having searched for specialist tax or accounting help, and submit a form asking to be contacted. The relationship is initiated by them. They have no prior relationship with us and are unlikely to know the sites are operated by one company or that a lead distribution network sits behind them, which is why the point-of-collection notice does the heavy lifting. Public concern about lead generation is real and well documented, particularly about being contacted by multiple firms; that is the principal reputational risk here and it is addressed at R1 and R2 below.

### 2.4 Purpose

Connecting enquirers with specialist firms who can help them, and operating a commercially viable network to do so. We are paid by firms for enquiries they choose to claim.

## 3. Consultation

- Data subjects: not formally consulted, which is proportionate at this scale. Their position is represented by the transparency requirements the LIA imposes and by the objection route, which is monitored.
- Receiving firms: the DSA has been through five revisions in response to counterparty review, including a counterparty solicitor's redline in June 2026.
- Solicitor review: outstanding, and recorded as an open owner item. This assessment should be reviewed as part of that set.
- DPO: none appointed. Not required under Article 37: we are not a public authority, and neither large-scale systematic monitoring nor large-scale special category processing applies.

## 4. Necessity and proportionality

Assessed in full in the LIA Parts 1 and 2 and not repeated. In short: the sharing is what delivers the outcome the enquirer asked for; the alert-then-claim design is itself the data-minimising alternative, because firms that do not claim never learn who the enquirer is; and the recipient count is capped at a number chosen to be defensible rather than to maximise revenue.

Lawful basis: Article 6(1)(f), with the documented LIA. Enquirers are told at collection, in plain language, what happens to their data.

## 5. Processors and transfers

| Processor | Purpose | Location |
|---|---|---|
| Hosting and application platform | Running the sites and APIs | UK/EEA, may process in the US |
| Database and backend | Storing enquiries | EEA-hosted |
| Transactional email | Verification and delivery emails | May process outside the UK |
| SMS | Verification messages | May process outside the UK |
| AI service | Case-type grading and one-line intent summary | May process outside the UK |
| Companies House | Public-register lookup | UK |

Where any of this involves a restricted transfer, an Article 44 to 49 mechanism is in place. Action R7: confirm and record the specific mechanism for each processor, and name the processor categories in every site's privacy notice, which currently list only three of them.

## 6. Risks and measures

Likelihood and severity are scored low, medium or high; residual risk is after the measure.

| # | Risk | Likelihood | Severity | Measure | Residual |
|---|---|---|---|---|---|
| R1 | Enquirer is contacted by more firms than they expected and experiences it as spam. The single most likely complaint. | Medium | Medium | Cap of 3 per lane, 6 total, enforced in code and tested. Sharing with plural firms in the network is disclosed at the point of collection; the maximum number is disclosed in the privacy notice the form links to (layered, see LIA section 3.2). Firms self-select from a redacted alert, so in practice most enquiries are taken by fewer than the maximum, which matters more under the layered notice than it did when the number appeared on the form. Objection route on every message. | Medium. Raised from low to medium on 17 August 2026 when the number moved to the second layer. Accepted, and monitored through complaint volume; if complaints on this ground appear, the number goes back on the form. |
| R2 | Enquirer was not adequately told the enquiry goes to several firms, because a site still carries single-firm wording. | High if unaddressed | High | The LIA makes the disclosure a condition of the lawful basis; a site without it must not be routed into the pool. The estate-wide wording sweep is the remedy. | Low once the sweep is complete. Until then this is the live risk in the model and the reason enquiries from un-swept sites must not enter the pool. |
| R3 | A firm misuses the data: markets unrelated services, sells it on, or retains it indefinitely. | Low | High | DSA clauses 12.1 to 12.3 bar onward disclosure, sale and list-broking; clause 6 restricts contact to a response, not marketing; clause 11.2 limits retention; clause 10 gives audit and complaint routes; every firm is regulated or professionally qualified and signs before receiving anything. | Low. Contractual rather than technical, which is inherent to controller-to-controller sharing. |
| R4 | Data delivered to a firm that has not signed the agreement. | Medium | High | Currently a manual runbook check only. `lead_buyers.dsa_signed_at` exists but nothing filters on it. Action R4: enforce in code before the first live claim. | Medium until the code gate lands, then low. |
| R5 | An objection or opt-out is not honoured, and the enquirer is offered or delivered anyway. | Medium | High | DSA clause 3.5 and clause 6 require it, and the LIA promises it. No suppression check exists on the offer and claim path today. Action R5: implement the suppression check and a suppression record before the first live claim. | Medium until implemented, then low. |
| R6 | Data retained beyond the published period, because the purge is dormant, restricted to one site and skips derived tables. | High | Medium | Published periods exist and the longstop is contractual. Action R6: arm the purge, extend it to every site and to the enrichment, scoring, teaser and nurture tables. | Medium until armed. Note no enquiry is yet close to the 24-month longstop, but the site publishing 3 months is already past it. |
| R7 | Processors not disclosed, so the transparency information is incomplete. | High | Low | Action R7 above. | Low once disclosed. |
| R8 | Unverified enquirer receives an unexpected approach after bulk supply. | Medium | Medium | One recipient per batch, 7-day window, objection exclusion, same contractual safeguards, and the practice disclosed in the privacy notice as a distinct item. Assessed at LIA 3.3c as the narrowest limb. | Low to medium. Accepted, conditional on those controls. |
| R9 | AI grading is wrong, so an enquiry is mis-priced or offered to the wrong profession. | Medium | Low | The rubric is published and the grading recorded against the lead, so a firm can check it; grey-zone cases grade down, in the buyer's favour; a mis-described enquiry is a credit ground. No decision with legal or similarly significant effect is taken about the enquirer: grading affects which firm calls them, not their access to advice. | Low. |
| R10 | Breach in transit or at rest. | Low | High | TLS in transit, access controls, 24-hour mutual breach notification (DSA clause 9), professional indemnity cover of £100,000. Cyber cover is recommended and not currently held. | Low. |
| R11 | Enquirer cannot work out who has their data, because firms are disclosed only as a category. | Medium | Low | Each firm self-identifies in its Article 14 notice at first contact; we hold the record and answer a subject access request; the privacy notice explains the route. | Low. |

## 7. Outcome

The processing may proceed on the Article 6(1)(f) basis assessed in the LIA, subject to the actions below. No residual high risk remains, so no prior consultation with the Information Commissioner under Article 36 is required.

### Actions, in order of priority.
| Ref | Action | Gate |
|---|---|---|
| R2 | Roll the multi-firm disclosure to every site's enquiry form and privacy policy | Before any enquiry from that site enters the pool |
| R5 | Suppression check on the offer and claim path, plus a suppression record | Before the first live claim |
| R4 | Code-enforced signed-agreement gate before a firm is alerted | Before the first live claim |
| R6 | Arm the retention purge, extend to all sites and derived tables | Before the earliest published retention period expires |
| R7 | Record transfer mechanisms; name processor categories in every privacy notice | With the site sweep |
| - | Solicitor review of the agreement, LIA and on-site wording as a set | Before first delivery |
| - | ICO registration reference recorded in the Supplier details block | Before first delivery |
| - | Consider cyber and data-breach insurance | Not gating |

### Signed:

MJ Moughal

### Name:

Mohammed Junayd Moughal, Director, Ashfield Trading Limited

### Date:

14 August 2026
