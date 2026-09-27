# Track A factual QA: self-employed-carers-and-personal-assistants

Site: care. Reviewed 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a.
Tie-breaker: `docs/care/house_positions.md`; primary law on legislation.gov.uk, gov.uk, cqc.org.uk.

## The central claim, tested hardest

**Limb 1, the CQC carve-out: HOLDS.** SI 2014/2936 Schedule 1 para 1(3)(c) excludes from the
regulated activity of personal care "the services of a carer employed by an individual or
related third party, without the involvement of an undertaking acting as an employment agency
or employment business, and working wholly under the direction and control of that individual
or related third party in order to meet the individual's own care requirements". The statute
says "employed"; CQC's own registration guidance applies the exception to a self-employed
personal assistant with a direct agreement, so the page's use of "engaged" is right and not an
overreach. One qualification the writer got wrong: CQC's limit is working **as an individual**
(not in partnership, not employing another carer), not the number of clients. Several separate
direct engagements each meeting the test stay outside registration. Corrected, see edit 1.

**Limb 2, the VAT consequence: HOLDS.** VAT Notice 701/2 restricts exempt welfare supplies to
charities, public bodies and state-regulated private welfare institutions or agencies (Group 7,
Sch 9 VATA 1994). An unregistered individual carer is none of the three, so the supply is
standard-rated and counts as taxable turnover against the rolling £90,000 threshold (HP3).
No correction needed.

## Assertions

| # | Assertion | Where | Source | Verdict |
|---|---|---|---|---|
| 1 | £90,000 VAT registration threshold, rolling 12 months, taxable turnover only | stats, challenge 2, howWeHelp 2, faq 2, intro | HP3 / gov.uk vat-registration | CORRECT |
| 2 | Welfare exemption limited to charities, public bodies, state-regulated providers | intro, challenge 2, faq 2 | HP1 / Notice 701/2 | CORRECT |
| 3 | Exemption blocks input VAT recovery (framed as a cost) | faq 2 | HP1 + consistency rule (never a perk) | CORRECT |
| 4 | MTD IT £50,000 from 6 April 2026, £30,000 a year later | stats, challenge 5, howWeHelp 3 | HP27 | CORRECT |
| 5 | AMAP 55p first 10,000 business miles from 6 April 2026, 25p after | stats, challenge 4, faq 4 | HP8 / employer rates 2026-27 | CORRECT |
| 6 | Dividend basic rate 10.75% from 6 April 2026, £500 allowance | stats, challenge 5, howWeHelp 1 | HP28 | CORRECT |
| 7 | Dividend higher rate 35.75% | howWeHelp 1 | HP28 | CORRECT |
| 8 | Corporation tax 19% on profits to £50,000 | challenge 5, howWeHelp 1, faq 3 | HP18 | CORRECT |
| 9 | Personal care is a regulated activity under Sch 1 to SI 2014/2936 | challenge 1 | legislation.gov.uk Sch 1 para 1(1) | CORRECT |
| 10 | Carve-out: direct engagement, no employment agency, wholly under direction and control | intro, challenge 1, faq 1 | Sch 1 para 1(3)(c) + CQC guidance | CORRECT |
| 11 | Carve-out fails once you "build a round of clients" or "set your own rota" | challenge 1 | CQC: the test is working as an individual, not client count | **WRONG, corrected** |
| 12 | Carrying on a regulated activity unregistered is a criminal offence | faq 1 | HP21 / HSCA 2008 | CORRECT |
| 13 | Employment status decided by substance, not contract label; back-dated PAYE lands on the engager | challenge 3, faq 5 | HP9 / gov.uk employment-status | CORRECT |
| 14 | Substitution, control, equipment, financial risk as status factors | faq 5 | gov.uk employment-status | CORRECT |
| 15 | Inter-client travel allowable; home to first call is commuting | challenge 4, faq 4 | HMRC BIM37600 / Samadian principle; mirrors HP6's NMW commuting exclusion | CORRECT |
| 16 | Deductible list: DBS, training, PPE, workwear laundering, phone share, indemnity, accountancy | challenge 4, faq 4 | wholly-and-exclusively test, ITTOIA s.34 | CORRECT |
| 17 | Company overheads: accounts, CT return, confirmation statement, payroll, public filings | challenge 5, faq 3, howWeHelp 4 | Companies Act filing regime | CORRECT |
| 18 | Class 4 NIC applies to sole-trader profits (no rate quoted) | faq 3 | gov.uk self-employed NIC | CORRECT |
| 19 | Self assessment registration, UTR, quarterly MTD updates on compatible software | howWeHelp 3 | HP27 / gov.uk register-for-self-assessment | CORRECT |
| 20 | Second worker moves you towards a domiciliary service: registration, travel-time NMW, holiday pay | howWeHelp 4 | HP6, HP10, HP21, CQC individual-worker limit | CORRECT |
| 21 | VAT, NIC, mileage and MTD are UK-wide; Scottish rates apply to Scottish taxpayers' earnings | faq 6 | Scotland Act rate-setting scope (non-savings non-dividend income) | CORRECT |
| 22 | CQC England only; Care Inspectorate, Care Inspectorate Wales, RQIA elsewhere | faq 6 | regulator scope | CORRECT (was UNSOURCED, source added) |

No STALE items: every rate on the page is the 2026/27 figure and each carries its 6 April 2026
or 1 April 2026 start.

## Edit log

1. `challenges[0].body`, final sentence. Was: "The carve-out stops holding the moment you build
   a round of clients, set your own rota, or send someone else when you cannot attend." Now:
   "The carve-out stops holding the moment you send or employ another carer, or set the terms
   yourself rather than working under the client's direction." Reason: CQC's exception turns on
   working as an individual under the client's direction, not on how many separate clients you
   hold; a PA with several direct engagements is still outside registration. One-clause rewrite,
   +1 word.
2. `sources`, added one line for the devolved regulators named in FAQ 6 (CQC scope of
   registration page). Assertion 22 was otherwise unsourced.
3. `sources`, added one line for the CQC guidance that carries limb 1 for a *self-employed* PA
   and states the employing-another-carer limit, which the statute alone does not say.

Nothing removed. No prose rewritten beyond edit 1.

## Checks

- JSON parses after the edits.
- Word count across intro, challenges, howWeHelp and faqs including titles and questions: 1,196
  (band 800 to 1,200). Tight; any later addition needs a matching trim.
- `metaTitle` 49 chars, `metaDescription` 155 chars. No em-dashes anywhere in the file.
- Intro answers the buyer's situation in the first 138 words.
- Internal links, all four verified on disk:
  - `/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases` -
    `care/web/content/blog/care-home-vat-exemption-edge-cases.md`, category "VAT and Welfare
    Exemption" slugifies to `vat-and-welfare-exemption`.
  - `/blog/care-home-accounts-and-funding/mtd-it-care-owner-operators` -
    `care/web/content/blog/mtd-it-care-owner-operators.md`, category "Care Home Accounts and
    Funding".
  - `/for/domiciliary-care` - `care/web/src/data/care-hubs.ts:82`.
  - `/services/start-a-domiciliary-care-agency` - `care/web/src/data/care-services.ts:411`.
- `sources` array now covers every figure, statutory rule and regulator assertion on the page.

VERDICT: PASS
