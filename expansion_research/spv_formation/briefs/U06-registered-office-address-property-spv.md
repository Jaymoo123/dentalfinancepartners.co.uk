# Brief U06 — Registered Office Address for a Property SPV

## 1. Unit facts

- **Type:** NEW blog post, `Property/web/content/blog/registered-office-address-property-spv.md`.
- **Category:** Incorporation & Company Structures.
- **Priority:** P2.
- **Hub:** formation-mechanics.
- **Questions answered (target):** 9.
- **Intent:** mixed question/action — reader is choosing between home address, a paid service, or an accountant's address, and the ECCTA "appropriate address" rule makes the honest answer more current than most competitor content.

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| registered office address for a property company | question (dominant) | page_map, no measured volume |
| can my registered office be my home | question | page_map variant; also present verbatim in questions_corpus under "registered office" cluster |
| registered office service | action | page_map variant; questions_corpus + demand_corpus both carry it, demand_corpus 390/mo, CPC 17.51 |
| virtual address for limited company | action | page_map dominant-adjacent, demand_corpus 110/mo, CPC 13.17; also flagged `site:propertyspv.co.uk` in our_queries.csv — a competitor already ranks for this, treat as a coverage floor not a claimed win |
| change registered office address | action | page_map variant; demand_corpus 320/mo, CPC 5.16 |
| do i have to publish my home address at companies house | question | page_map variant — this is the privacy-driver query, foreground it |
| registered office vs trading address for a landlord company | conversational | page_map variant |
| appropriate address rule eccta | question | page_map variant — the freshness hook, foreground in facts pack and one H2 |
| can i use my home address as registered office | question | questions_corpus, "registered office" cluster, no volume |
| can you use your home address as registered office | question | questions_corpus, no volume |
| registered office address uk | question | demand_corpus, 110/mo, CPC 17.12 |
| registered office address for limited company uk | question | questions_corpus, no volume; demand_corpus carries the un-suffixed "for limited company" at 40/mo CPC 15.8 |
| change registered office address companies house | action | demand_corpus, 110/mo, CPC 3.39 |
| registered office address service | action | questions_corpus + demand_corpus (folded into "registered office service" 390/mo line above) |
| company registered office address | question | demand_corpus, 30/mo, CPC 18.93 |
| what is a registered office | question | questions_corpus, no volume — definitional, use for the opening definition, not a standalone H2 |
| registered office vs registered agent | conversational | questions_corpus, no volume — UK/US confusion query, one FAQ line correcting the misconception (UK company law has no "registered agent" concept; that's a US-state term) |
| difference between head office and registered office | question | questions_corpus, no volume — one FAQ line |
| can registered office be po box | question | questions_corpus, no volume — direct no post-4-March-2024 (facts pack), high-value correction |

The wider `registered office` bucket in demand_corpus.csv is dominated by non-UK-company, non-property noise (Indian company law "registered office in hindi/tamil/marathi," bank-branch registered-office lookups, DVLA/home-office forms tagged under the same seed keyword). These were filtered out as not matching this page's UK-property-SPV intent; only genuinely on-topic UK company-registered-office variants are listed above.

## 3. Our-data baseline

No page in our estate currently targets registered-office or virtual-address queries. our_queries.csv shows two adjacent generalist-site hits worth noting for context (not this page's direct baseline, but proof the topic area gets real query traffic):
- "official uk companies house non resident director private limited company requirements registered office utr bank account" — Bing, generalist site, 8 impressions, position 4.0 — bundles registered office with bank account and UTR, confirming these formation-admin topics cluster together in real queries.
- "uk companies house overseas director day-to-day obligations abroad registered office uk company director responsibilities" — Bing, generalist site, 8 impressions, position 6.0.

Neither is on the Property site or targets this page's dominant query directly; treat as adjacent-demand signal only.

## 4. Competitor coverage floor

- https://www.companyservicesuk.co.uk/address-services/registered-office-address/ — direct competitor, registered office service page.
- https://www.companyservicesuk.co.uk/address-services/directors-service-address/ — adjacent competitor: registered office vs director's service address distinction.
- https://propertyspv.co.uk/services/registered-office-address/ — direct property-SPV-specific competitor.
- https://propertyspv.co.uk/how-do-i-change-a-service-address/ — adjacent competitor, change-of-address mechanics.
- https://www.rapidformations.co.uk/blog/using-your-home-address-as-your-registered-office/ — direct competitor on the privacy/home-address question.
- https://www.rapidformations.co.uk/blog/po-box-as-a-registered-office/ — direct competitor on the PO box question; cross-check their currency against the post-4-March-2024 appropriate-address rule (many competitor pages predate this and will be stale).
- https://www.dnsassociates.co.uk/registered-office-address-service — direct competitor, registered office service.

## 5. Seam warnings — MUST-NOT rules

1. **Do not restate formation cost totals.** U03 (`spv-company-formation-cost-uk`, protected seam per PAGE_MAP §9.4) owns the year-one setup cost table. U06 may mention a registered-office service as a cost line item in one sentence with a link to U03 for the total — never rebuild a cost table here.
2. **This page owns the address, not the SIC code.** PAGE_MAP §5 explicitly separates U06 (the address) from U10 (`change-sic-code-companies-house-property-company`, the SIC code) as sibling post-formation CH-admin filings. Do not drift into SIC code content even though both are "Companies House admin" — link out if the reader needs that, don't explain it.
3. Do not restate full Companies House incorporation mechanics (IN01, PSC statement) — U02 owns that; U06 assumes the company is being formed or already exists and focuses only on the registered-office decision and the change-of-address mechanic.
4. Do not present a "best registered office provider" ranking or use referral/affiliate language — same non-promotional standard as U05.

## 6. Facts pack (dated; verify against `docs/property/house_positions.md`)

- **The "appropriate address" rule has applied since 4 March 2024** (Companies (Registration etc) Regulations 2024, per §11.A house_positions). A registered office must be an address where a document sent to the company would be expected to come to the attention of a person acting on the company's behalf, and where an acknowledgment of receipt of documents delivered there can be sent. **PO boxes alone do not qualify post-4-March-2024** — house_positions §11.A explicitly flags "appropriate address rule allows PO boxes" as a do-not-write.
- **A director's home address CAN be used as the registered office**, but it becomes visible on the public Companies House register at that point — this is the core privacy trade-off driving the "can my registered office be my home" query. A **separate director's service address** can be used to keep the home address off the public PSC/director record even if the registered office itself is elsewhere; this is a distinct mechanism from the registered office itself and worth one clear paragraph distinguishing the two.
- **Companies House now requires a registered email address** (ECCTA 2023 ss.28-30, inserted CA 2006 s.88A and following, per §11.A) — this is a CH-to-company correspondence channel, NOT published on the public register, and is distinct from the registered office (a postal/physical address). Do not conflate the two; one short clarifying sentence is enough.
- **Changing a registered office address is filed at Companies House** (form AD01 online or paper) — the change takes effect once Companies House registers it, and mail sent to the old address before the update is processed can be missed; note this as a practical timing risk.
- **Companies House incorporation fee: £100 online/software, £124 paper. Confirmation statement: £50 online, £110 paper** (§42 house_positions, verified against gov.uk fees page updated 2 July 2026, verified 2026-09-01) — relevant only as one-line cost context with a link to U03, per the seam rule.
- **No local registers of directors/PSCs any more** (ECCTA 2023 ss.51-52, abolition of local registers) — all address-linked filings consolidate at the Companies House central register; relevant background if a reader asks "where does this actually get published."

## 7. Interlink spec

- `/spv-company` (U01, live) — mandatory up-link to the pillar.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live, slug confirmed on disk) — for full incorporation mechanics, from the intro.
- `spv-company-formation-cost-uk` (U03, live, slug confirmed on disk) — for the cost handoff, per seam rule §5.1.
- `change-sic-code-companies-house-property-company` (U10, once live) — for the SIC-code sibling filing, per seam rule §5.2.
- `spv-company-bank-account` (U05, once live) — cross-link both ways: a registered office check feeds a bank's KYC process (already noted in U05's facts pack).
- `companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure` (live, slug confirmed on disk at `Property/web/content/blog/companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure.md`) — for the wider 4 March 2024 reform context (registered email, lawful purposes statement) alongside the appropriate-address rule.
- `confirmation-statements` (live, slug confirmed on disk) — for the annual filing that reconfirms the registered office each year.

## 8. Editorial conventions (hard rules)

£nnn always (never "£nnn.00", never a bare number for currency); "per cent" in prose, % only in tables; hyphenated compounds (appropriate-address rule, registered-office service, director's service address is not hyphenated, home-address option, single-director SPV); sentence-case H2s; no em-dashes anywhere in the copy; no templated second paragraph (do not open with a rephrased restatement of the H1, the pattern Wave 1 QA flagged across multiple posts — see §9.1 for the required alternative opening); every FAQ answer distinct in substance, not a rephrasing of a body section; no build or pipeline narration in the copy ("verify at build", inline house-position codes, "as covered above"); every citation either verified against `house_positions.md` or explicitly flagged for the factual QA pass. **Non-promotional rule carries into the wording itself** (§5.4): no "best provider" ranking, no affiliate or referral phrasing, and the comparison table's cost row stays an indicative range, never a quoted price.

**Formulation types**, all four present in the corpora and all four must be covered: **question** ("can my registered office be my home", "do i have to publish my home address at companies house", "registered office address uk"); **action** ("registered office service", "change registered office address", "virtual address for limited company"); **conversational** ("registered office vs trading address for a landlord company", "difference between head office and registered office"); **technical** ("appropriate address rule eccta" — retagged at gate review from question to technical, since it is the legislative-hook formulation and is this page's freshness advantage over stale competitor content).

## 9. Fresh outline

1. **Intro** — direct answer up top: what a registered office is (statutory postal address on the public register, distinct from a trading address), and the two live options for an SPV (home address vs a paid service). Second paragraph must NOT follow a "this guide covers X, deliberately not Y" template — open instead with the privacy trade-off, since that's the real decision driver.
2. **H2 — What a registered office actually is (and what it isn't)** — statutory definition, registered office vs trading address vs director's service address vs registered email, one short table or clear paragraph distinguishing all four.
3. **H2 — Can your registered office be your home address** — direct answer (yes, but it becomes public), the privacy trade-off explained plainly, and the director's-service-address alternative for keeping the home address off the public director record even when the registered office itself is a business address.
4. **H2 — The appropriate address rule (since 4 March 2024)** — what changed, why PO boxes no longer qualify, what "capable of acknowledging receipt" means in practice.
5. **H2 — Home address vs a paid registered office service: what changes** — comparison table (see below).
6. **Comparison table — home address vs paid registered office service**

   | Factor | Home address | Paid registered office service |
   |---|---|---|
   | Privacy | Address becomes public at Companies House | Home address stays off the public register |
   | Typical annual cost | Free | Market-rate annual fee (indicative range, not a quoted price) |
   | Mail handling | You receive everything directly | Provider forwards or scans official mail |
   | Suitable for | Single-director landlord comfortable with public visibility | Multi-director SPVs, privacy-conscious landlords, non-resident directors |
   | Appropriate-address compliance | Must still meet the acknowledgment-of-receipt test | Provider is designed to meet it |

7. **H2 — How to change your registered office address** — AD01 filing mechanic, timing risk (mail to the old address before the change registers), link to `confirmation-statements` for the annual reconfirmation.
8. **H2 — Non-UK resident directors and the registered office** — short section: the registered office itself does not need to be where the director lives; a UK service address is the usual route for overseas directors. Keep brief, link out if a fuller non-resident page exists (verify slug at write time).
9. **FAQ (10-14 questions)** — built from §2's variant list plus natural follow-ups, e.g. "can my registered office be my home address," "do i have to publish my home address at companies house," "can a po box be a registered office," "what is the difference between a registered office and a director's service address," "how much does a registered office service cost," "can i change my registered office address myself," "what happens if i don't update my registered office address," "is my registered office the same as my trading address," "does my registered office affect my company's tax residence," "can a non-uk resident use a uk registered office service," "is a registered email address the same as a registered office," "what is the difference between a registered office and a registered agent" (UK has no registered-agent concept — correct the US-state-law confusion directly).
