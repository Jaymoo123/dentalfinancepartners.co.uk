# PACK N2: net-new — Accountant for seafarers and yacht crew

Derived 2026-08-25 from FROZEN dossier `../specialist_professions_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **scenario-triage-led**). Ground truth: house §22.1 (SED, mariners'
NIC) and **§22.2 (tonnage-tax fence, this page's specific job)**, with §2 and §7. C1 row 87 = CLEAR on
the not-rebate-shaped condition. No C2 §8 gate.

## 1. Target and permission level

- NET-NEW service/coverage page. Proposed slug: `accountant-for-seafarers-and-yacht-crew` (writer may
  refine; resolver conventions).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- Shape: audience page with one factual tonnage-tax paragraph. **N1 owns the deduction mechanics; this
  page owns the audience and the service.** This split is the dossier's only named intra-cluster
  cannibalisation resolution (§6) and it is binding: SED machinery here is one short summary plus a
  link, never a second walkthrough.

## 2. Equity register

None (net-new). Cannibalisation guard against N1 is §1 above and acceptance criterion 5.

## 3. Market keyword slice (ledger, P-SED remainder, ~280/mo, peer-winnable ~90)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| ship tax | 110 | marineaccounts |
| seafarer uk | 70 | marineaccounts |
| uk seafarers | 70 | marineaccounts |
| marine accounting | 30 | marineaccounts |

`ship tax` is the tonnage-tax-adjacent query and gets the factual paragraph plus the boundary sentence
(house §22.2), not a tonnage-tax page. The SED head set belongs to N1.

## 4. Competitor teardown (fetched 2026-08-25)

The specialist field is real (marineaccounts, seafarerstaxreturns, seadays, yourtaxhelp) but only
marineaccounts has a measurable footprint, and dossier §1 records that **80%+ of that footprint is
career and salary content, not accountancy** (yacht crew salaries, how-to-become, deckhand and
stewardess content, VHF licences, ENG1/ML5 medicals, discharge books). That fleet is excluded under
the A* lead-intent bar (dossier §4, EX-CAREER ~12,000/mo, owner call parked as delta D3).

`marineaccounts.com/seafarers-earnings-deduction` fetched: ~3,200 words, 5 headings, 27-item knowledge
base, em-dashes throughout, and an acquisition model built on "Start FREE SED Qualifying Test" plus a
"Refer a friend and receive £50!" bounty. **No fetched competitor runs a straight service page for
crew**: the field converts through the deduction funnel. `seafarerstaxreturns.com` returned no body on
fetch and is not analysed.

## 5. Whitespace

- **A crew page that is not a claims funnel.** Nothing in the fetched sample addresses a seafarer as a
  taxpayer with a return to file rather than as a refund prospect.
- **The self-employed marine contractor**, who cannot claim SED at all and is invisible in this SERP.
  This is the clearest triage win: the page tells them in the first 40% that the deduction is not
  theirs and what applies instead.
- **Foreign-flag and mariners' NIC as a named open question**, signposted rather than answered.
- **The tonnage-tax boundary stated factually**, which turns `ship tax` from an off-topic query into a
  correctly answered one without pulling us into operator advisory.
- A recomputable worked example for a self-employed marine contractor at 2026/27 rates.

## 6. Fences (binding)

- **Not rebate-shaped, same as N1:** no reclaim, refund, tax-back, qualifying test, referral bounty,
  contingent fee, assignment or nomination language, no links to rebate firms.
- **SED depth stays on N1.** One summary paragraph naming the 365-day eligible period and the
  employee-only rule, then a link. No second machinery walkthrough, no duplicated FAQ set.
- **Tonnage tax:** one factual paragraph (elective ring-fenced corporation-tax regime for
  ship-operating companies) plus the explicit boundary that operator-level tonnage-tax advisory is out
  of scope. Nothing more, no structuring content, no eligibility assessment.
- **NIC:** separate regime, signposted, **no NIC outcome asserted** for any flag or employer case.
- **No career or salary content.** No yacht crew pay tables, no how-to-become sections, no
  qualifications, medicals or licence content. That is the excluded fleet and imitating it would fail
  the A* lead-intent bar.
- No em-dashes. **No house-position section numbers in reader copy** (report only; trades leaked 71).
- Rate-date discipline per language spec §2 on every band and Class 4 figure.

## 7. Acceptance criteria (deterministic)

1. Queries answerable: what does a seafarer accountant do; do I need to file a UK tax return as crew;
   is there VAT or tax on ships (`ship tax`); what about self-employed marine contractors; how does
   this differ from the deduction (link to N1).
2. Three named triage scenarios in the opening 40%: employed superyacht crew, foreign-flag merchant
   crew, self-employed marine contractor. Each resolved in one paragraph with a route.
3. Figures, recomputable: VAT registration £90,000 / deregistration £88,000; the 2026/27 income tax
   bands and Class 4 with the August 2026 check tag; one worked example for the self-employed
   contractor, re-derivable line by line.
4. Minimum 10 FAQ pairs, none duplicating an N1 FAQ.
5. **Cannibalisation check, deterministic:** no H2 on this page shares a phrasing with any N1 H2, and
   no N1 keyword from the P-SED head set appears in an H2 here. QA fails the page on either.
6. Links: N1 (twice is fine, once in the opening triage), core self-assessment page. Resolver-clean,
   0 invented slugs. §4 floors + coverage floor pass.
7. Zero career, salary, qualification, medical or licence content.

## 8. Expectation

~280/mo assigned with ~90 peer-winnable. This page is the service-side companion to N1 rather than a
volume play; most of its value is holding the audience term and answering `ship tax` correctly.
Realistic: impressions on `marine accounting` and `ship tax` within a quarter of indexing; the
`seafarer uk` / `uk seafarers` generics are low-intent and may never convert. Maturity caveat: net-new,
judge at 28d Bing / 90d Google. Failure trigger, written before the build: zero impressions on all 4
phrasings at 90d post-index, or any N1 keyword cannibalised (N1 position worse after N2 indexes).
