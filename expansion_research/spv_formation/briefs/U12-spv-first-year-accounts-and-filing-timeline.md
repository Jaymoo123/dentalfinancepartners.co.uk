# Brief U12 — SPV First-Year Accounts and Filing Timeline

## 1. Unit facts

- **Type:** NEW blog post, `Property/web/content/blog/spv-first-year-accounts-and-filing-timeline.md`.
- **Category:** Incorporation & Company Structures.
- **Priority:** P2.
- **Hub:** SIC/CH-admin.
- **Questions answered (target):** 8.
- **Intent:** planning/question — reader has an incorporated SPV (with or without a property bought yet) and wants the actual first-cycle calendar: what's due, when, and to whom.

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| property limited company first year accounts | question (dominant) | page_map, no measured volume |
| buy to let limited company accounts example | question | page_map variant |
| landlord limited company accounts | question | page_map variant |
| spv company accounts | question | page_map variant |
| when are my first company accounts due | question | page_map variant — the core calendar query, foreground |
| micro-entity accounts for a property company | question | page_map variant |
| do i file dormant accounts if the spv has not bought yet | question | page_map variant — real pre-purchase-timing question, worth its own H2 |
| what does an spv accountant actually file | conversational | page_map variant |
| company confirmation statement | action | demand_corpus, 1000/mo, CPC 3.1 — high-volume adjacent term; this page owns the annual filing CALENDAR slot for it, not the mechanics (link to `confirmation-statements`) |
| company house confirmation statement | action | demand_corpus, 880/mo, CPC 3.59 (common misspelling of "companies house") |
| file company confirmation statement | action | demand_corpus, 590/mo, CPC 2.96 |
| what is a company confirmation statement | question | demand_corpus, 210/mo, CPC 2.32 — definitional, link out rather than re-explain |
| limited company confirmation statement | question | demand_corpus, 110/mo, CPC 6.78 |
| confirmation statement limited company | question | demand_corpus, 30/mo, CPC 2.14 |
| company confirmation statement form | action | demand_corpus, 10/mo, CPC 1.34 |
| how to list a limited company as dormant | question | our_queries.csv, Bing, generalist site, 28 impressions, position 8.0 — sibling-site page already ranks (`dormant-company-filing-requirements-uk`), do not compete; link out |
| would a property spv count as dormant accounts if it is not rented | question | our_queries.csv, Bing, property site, 20 impressions, 10 clicks, position 4.0 — direct evidence of real reader confusion on our own site, foreground this exact framing in the "not bought yet" H2 |
| how do i file a confirmation statement for my limited company at companies house | question | our_queries.csv, Bing, generalist site, 18 impressions, position 4.0 |
| does reporting a company for late filing of accounts and confirmation statement actually help | conversational | our_queries.csv, Bing, generalist site, 16 impressions, position 10.0 — tangential, one FAQ line at most (late-filing penalty consequence, not "reporting")|
| if i have a limited company but it is dormant and i have to fill the accounting so i can do it by myself or i need accountant | conversational | our_queries.csv, Bing, generalist site, 14 impressions, position 7.0 — DIY-vs-accountant framing, useful for one FAQ answer |

Zero-volume page_map variants are included by design per the brief spec. The confirmation-statement demand cluster is large but largely definitional/mechanical noise already owned by `confirmation-statements`; only the calendar-relevant framing belongs on this page.

## 3. Our-data baseline

- "would a property spv count as dormant accounts if it is not rented" — Bing, property site (our own), 20 impressions/mo, **10 clicks**, position 4.0. This is a live, converting query on our own site already surfacing this exact confusion — strong signal this page's "not bought yet" section is the highest-value single H2 on the page.
- "how do i file a confirmation statement for my limited company at companies house" — Bing, generalist site, 18 impressions, position 4.0.
- "how to list a limited company as dormant" — Bing, generalist site, 28 impressions, position 8.0 — routes to the sibling site's `dormant-company-filing-requirements-uk`; this page must not compete, only link.
- No page in our estate currently owns the first-year SPV filing CALENDAR specifically; `file-dormant-accounts-a-complete-guide` covers dormant-only mechanics and `btl-limited-company-year-end-date-changing-tax-planning` covers the ARD as a planning lever — neither owns the new-SPV first-cycle timeline, confirming the page_map gap read.

## 4. Competitor coverage floor

- https://propertyspv.co.uk/services/dormant-company-accounts-filing/ — direct property-SPV dormant-accounts competitor.
- https://propertyspv.co.uk/what-does-it-mean-to-have-a-dormant-company/ — adjacent, definitional dormant-company competitor.
- https://www.taxd.co.uk/blog/how-to-file-dormant-company-accounts/ — direct dormant-accounts-mechanics competitor.
- https://www.taxd.co.uk/blog/dormant-accounts-and-tax-filing-for-inactive-companies/ — adjacent, dormant tax-filing competitor.
- https://www.taxd.co.uk/blog/does-a-dormant-company-need-to-file-a-tax-return/ — direct, addresses the same not-yet-trading question this page's "not bought yet" H2 must answer for a property SPV specifically.
- https://www.dnsassociates.co.uk/blog/can-i-prepare-my-own-limited-company-accounts — DIY-vs-accountant competitor angle, useful for one FAQ answer.

## 5. Seam warnings — MUST-NOT rules

1. **The CT41G-is-dead point stays on U02.** U02 (`how-to-set-up-property-investment-company-uk-guide`) owns the corrected "you don't file a CT41G any more, corporation tax registration is automatic/online" point. U12 must not re-litigate this — assume the reader already knows CT registration happened at incorporation and link to U02 if a refresher is needed.
2. **U12 owns the CALENDAR, not each filing's mechanics.** Where an existing page owns a filing's how-to, U12 states the deadline and links out rather than re-explaining the process:
   - Confirmation statement mechanics/how-to → `confirmation-statements` (verified live on disk).
   - Register-for-corporation-tax mechanics → `register-for-uk-corporation-tax` (verified live on disk).
   - Full dormant-accounts filing walkthrough → `file-dormant-accounts-a-complete-guide` (verified live on disk).
   - Accounting reference date (ARD) as a planning/tax lever → `btl-limited-company-year-end-date-changing-tax-planning` (verified live on disk) — U12 states the default 21-month first-accounts rule and links there for "can I move it and why would I."
3. Do not restate SIC code selection (U09, protected) or SIC code changes (U10) even though both sit in the same SIC/CH-admin hub — off-topic for a filing-timeline page.
4. Do not build a full CT600/marginal-relief explainer — state the CT payment deadline and headline rates from the facts pack, link to a dedicated CT-rates page if one exists on disk (verify at write time) rather than re-deriving the marginal relief formula.
5. ATED gets **one line and a link only**, not a section — most BTL SPVs holding standard let residential property below £500k are out of scope entirely, and ATED depth belongs to the ATED estate (PAGE_MAP §9.10: "it must not re-explain ATED bands").

## 6. Facts pack (dated; verify against `docs/property/house_positions.md`)

- **First accounts filing deadline: 21 months from the date of incorporation** for a company's first set of statutory accounts (CA 2006 s.441 as applied, per §11.C.Z house_positions). This is the reader's single most-searched fact on this page ("when are my first company accounts due").
- **Subsequent accounts filing deadline: 9 months from the end of the accounting reference period (ARP)** for a private company (CA 2006 s.442), i.e. every year after the first.
- **CT600 (company tax return) filing deadline: 12 months from the end of the accounting period.** This runs on a different clock from the accounts deadline and from the CT payment deadline — flag this explicitly as the trap most first-time SPV directors trip on (three different deadlines, three different anchor points).
- **Corporation tax PAYMENT deadline: 9 months and 1 day after the end of the accounting period** (for companies below the large-company threshold, which covers virtually all landlord SPVs) — earlier than the CT600 filing deadline itself, another common trap worth stating plainly.
- **Confirmation statement: filed annually**, review period no longer than 12 months, due within 14 days of the end of the review period (mechanics owned by `confirmation-statements`, link out per seam rule). Fee: £50 online, £110 paper (§42 house_positions, verified 2026-09-01).
- **Companies House incorporation fee: £100 online/software, £124 paper** (§42 house_positions, same verification date) — one-line context only, cost detail belongs to U03.
- **Micro-entity accounts (FRS 105)** are the typical regime for a small single-property or few-property landlord SPV — abridged/filleted accounts under applied CA 2006 s.444/s.444A can omit the profit and loss account from the public filing; state this plainly as the realistic expectation for most readers rather than assuming full statutory accounts.
- **Corporation tax rates 2026/27:** 19% small profits rate (augmented profits ≤ £50,000), 25% main rate (≥ £250,000), marginal relief tapering the band between them to an effective ~26.5% rate (CTA 2010 s.18A/s.18B/s.18D, standard fraction 3/200, per house_positions §21.4/§21.5 mini-lock, confirmed gov.uk 2026-05-23, unchanged for 2026/27). State headline rates only; do not rebuild the associated-companies divisor mechanic (s.18D/s.18E) in depth — one sentence noting multi-SPV portfolios share the thresholds via the associated-company divisor, with a link if a dedicated page exists on disk (verify at write time).
- **Dormant vs trading for a not-yet-purchased SPV:** a newly incorporated SPV that has not yet bought a property, taken out a loan, or incurred trading expenses can usually file dormant accounts for that first period — but the moment the company incurs any "significant accounting transaction" (per Companies House's own dormant-company test) it stops qualifying. State this test plainly, since it is the exact confusion behind our own site's highest-signal query in §3.
- **ATED (Annual Tax on Enveloped Dwellings)** applies only where a company holds a UK residential dwelling valued over £500,000 — most standard let-to-tenant BTL SPVs are out of scope entirely, but a reader incorporating to hold a higher-value single dwelling should be aware an ATED return may be due. One line, link to `ated-complete-guide-2026-27` (verified live on disk), do not explain bands or reliefs here.
- **Director/PSC identity verification has been a legal requirement for newly appointed directors and PSCs since 18 November 2025** (§11.A house_positions) — mention only as background if the reader is filing their first confirmation statement and encountering the ID-verification prompt for the first time; do not re-explain the mechanics (owned elsewhere per U02/§11.A).

## 7. Interlink spec

- `/spv-company` (U01, live) — mandatory up-link to the pillar.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live, slug confirmed on disk) — for the CT41G-is-dead point and incorporation mechanics, per seam rule §5.1.
- `confirmation-statements` (live, slug confirmed on disk at `Property/web/content/blog/confirmation-statements.md`) — mandatory link for confirmation statement mechanics, per seam rule §5.2.
- `register-for-uk-corporation-tax` (live, slug confirmed on disk at `Property/web/content/blog/register-for-uk-corporation-tax.md`) — mandatory link for CT registration mechanics.
- `file-dormant-accounts-a-complete-guide` (live, slug confirmed on disk at `Property/web/content/blog/file-dormant-accounts-a-complete-guide.md`) — mandatory link for the full dormant-accounts walkthrough, from the "not bought yet" H2.
- `btl-limited-company-year-end-date-changing-tax-planning` (live, slug confirmed on disk) — for the ARD-as-planning-lever handoff.
- `companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure` (live, slug confirmed on disk) — optional, for the 2024 confirmation-statement reform context (lawful purposes statement, registered email) if the writer needs it for the confirmation-statement calendar entry.
- `ated-complete-guide-2026-27` (live, slug confirmed on disk) — one-line ATED link per facts pack.
- `registered-office-address-property-spv` (U06, once live) — optional light link, since the confirmation statement reconfirms the registered office annually.
- `spv-company-formation-cost-uk` (U03, live, slug confirmed on disk) — one-line cost handoff per seam rule §5.

## 8. Editorial conventions (hard rules)

£nnn always (never "£nnn.00", never a bare number for currency); "per cent" in prose, % only in tables; hyphenated compounds (first-year accounts, micro-entity accounts, year-end date, not-yet-trading company, single-property SPV); sentence-case H2s; no em-dashes anywhere in the copy; no templated second paragraph (do not open with a rephrased restatement of the H1, the pattern Wave 1 QA flagged across multiple posts — see §9.1 for the required alternative opening); every FAQ answer distinct in substance, not a rephrasing of a body section; no build or pipeline narration in the copy ("verify at build", inline house-position codes, "as covered above"); every citation either verified against `house_positions.md` or explicitly flagged for the factual QA pass.

**Link-out discipline is an editorial rule here, not just a seam rule.** This page states a deadline and links; it never walks a filing's how-to (§5.2). If a section starts explaining *how* to do something rather than *when* it is due, it has drifted onto a page that already owns that content.

**Formulation types**, all four present in the corpora and all four must be covered: **question** ("when are my first company accounts due", "property limited company first year accounts", "what is a company confirmation statement"); **action** ("file company confirmation statement", "company confirmation statement form"); **conversational** ("what does an spv accountant actually file", "would a property spv count as dormant accounts if it is not rented" — the highest-signal row in §3, foreground this exact framing); **technical** ("micro-entity accounts for a property company" — retagged at gate review from question to technical; it is the accounting-regime formulation and owns the FRS 105 section).

## 9. Fresh outline

1. **Intro** — direct answer up top: the four deadlines in a first-year SPV's filing calendar (first accounts at 21 months, CT600 at 12 months, CT payment at 9 months + 1 day, confirmation statement annually), stated as a compact list before any explanation. Second paragraph must NOT follow a "this guide covers X, deliberately not Y" template — open instead with the trap (three different clocks, three different anchor points) since that's the reader's actual problem.
2. **H2 — The four deadlines at a glance** — table (see below), the page's central asset.
3. **Comparison/reference table — first-year SPV filing calendar**

   | Filing | Deadline | Anchor point | Where filed |
   |---|---|---|---|
   | First statutory accounts | 21 months | From date of incorporation | Companies House |
   | Subsequent statutory accounts | 9 months | From end of accounting reference period | Companies House |
   | Company tax return (CT600) | 12 months | From end of accounting period | HMRC |
   | Corporation tax payment | 9 months and 1 day | From end of accounting period | HMRC |
   | Confirmation statement | Annually, within 14 days of review period end | From last confirmation statement (or incorporation, first time) | Companies House |

4. **H2 — Has the spv bought a property yet? What changes if it hasn't** — the dormant-vs-trading test, "significant accounting transaction" trigger, direct answer to "would a property spv count as dormant accounts if it is not rented," link to `file-dormant-accounts-a-complete-guide` for the full mechanics.
5. **H2 — What an spv accountant actually files (micro-entity accounts explained)** — FRS 105, abridged/filleted accounts, what's public vs what HMRC sees, realistic expectation-setting for a small landlord SPV.
6. **Worked example** — a single-property SPV incorporated on a specific illustrative date, walked through its first-year calendar: incorporation date → first accounts due date (21 months) → accounting period end → CT600 due (12 months later) → CT payment due (9 months + 1 day, earlier than CT600) → first confirmation statement due. Label clearly as illustrative.
7. **H2 — Corporation tax: what you'll actually pay** — headline 19%/25%/marginal relief rates, one sentence on the associated-companies divisor for multi-SPV portfolios, link out for depth; no CT41G reference (link to U02 if the reader needs the "how CT registration works" refresher).
8. **H2 — ATED: does it apply to your spv** — one paragraph, most readers out of scope, link to `ated-complete-guide-2026-27`.
9. **H2 — DIY or an accountant: what most spv directors actually do** — short, practical, answers the our_queries.csv DIY-vs-accountant conversational variant.
10. **FAQ (10-14 questions)** — built from §2's variant list plus natural follow-ups, e.g. "when are my first company accounts due," "do i file dormant accounts if my spv has not bought a property yet," "what is the deadline for my first confirmation statement," "how long do i have to file my first ct600," "when does corporation tax actually need to be paid," "can i change my accounting reference date," "what happens if i miss the 21-month first-accounts deadline," "do i need an accountant for micro-entity accounts," "does an spv need to register for ated," "what counts as a significant accounting transaction for dormant company purposes," "is the ct600 deadline the same as the corporation tax payment deadline," "what's the difference between my accounting period and my accounting reference date."
