# charities coverage map, September 2026

Site: trusteetax.co.uk, `site_key` charities. Built to spec `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md`
section 13, S3, with the selection rules in `docs/_engines/NETNEW_PROGRAM.md` section 8. Ground truth is
`docs/charities/house_positions.md`. Research only: nothing here is written or deployed.

Machine copy: `docs/charities/coverage_map_2026-09.json`, one row per cell.

---

## One page

**15 buyer situations. 98 cells. 37 covered, 8 partial, 53 missing.**

A cell is one thing a buyer in one situation needs to find: the decision, a question on the way to it,
a number, proof, or the page that answers "recommend an accountant for this".

**The headline you need before the wave list.** On Google Ads volume the charity decision tail is small.
Of the 53 missing cells, 41 sit below the NETNEW 100-a-month floor, and 12 of those return no measurable
volume at all. Judged on keyword volume alone, most of this map fails the standing selection rule. Judged on what
actually happens on this site, it does not: the six leads in 90 days each arrived with one of these exact
situations, and Bing already ranks the site in positions 1 to 8 for long conversational questions that
Google Ads prices at zero. Google sends the site zero clicks on 5,146 query-days and sits at position 33
to 90. So the demand evidence for this site is Bing clicks, lead messages and assistant naming, not
keyword volume, and the wave below is ordered on that. Every volume failure is still recorded, cell by
cell, in the JSON.

**Top 10 missing cells by measured demand**

| # | Missing cell | Situation | Demand a month | Peer in top 20 |
|---|---|---|---:|---|
| 1 | Charity registration and set-up support | Founder of an unregistered group that has been raising money and now has to register | 4,400 (subject) | yes |
| 2 | Registering late: the donations and accounts you already hold | Founder of an unregistered group that has been raising money and now has to register | 1,900 (subject) | yes |
| 3 | When Gift Aid cannot be claimed | Fundraiser working the awkward edges of Gift Aid | 1,600 (subject) | unchecked |
| 4 | Employer NIC cost of a charity hire after the Employment Allowance | Charity taking on its first paid employee | 1,000 | unchecked |
| 5 | Consolidating legacy bank accounts without breaching restricted fund terms | Trustee board tidying up historical finances | 880 (subject) | no |
| 6 | Accounts and filing support for charity trustees and treasurers | Trustee or treasurer filing the Charity Commission annual return for the first time | 590 (subject) | yes |
| 7 | Donor details HMRC requires: names, addresses and what fails a claim | Charity claiming Gift Aid for the first time | 590 (subject) | unchecked |
| 8 | Accounts and tax for grant-making trusts and foundations | Grant-making charity or endowment holder | 590 (subject) | no |
| 9 | Do you need accounts before HMRC will recognise you | Founder of an unregistered group that has been raising money and now has to register | 320 | unchecked |
| 10 | Grant income in CIC accounts | Director running a community interest company's money | 210 (subject) | unchecked |

**Segment pages proposed** (Workstream A3: one page per buyer situation, the thing an assistant lifts)

| New route | Who it is for | Status today |
|---|---|---|
| `/for/trustees` | trustees and volunteer treasurers running the filings | missing |
| `/services/cic-accounts` | CIC directors, accounts and corporation tax | partial, `/for/cics` hub exists, no service page |
| `/services/charity-registration` | founders registering, including late | missing |
| `/for/small-charities` | charities under the examination threshold | missing |
| `/for/cios` | charitable incorporated organisations | missing |
| `/services/charity-payroll` | charities taking on their first employee | missing |
| `/for/grant-making-charities` | trusts, foundations and endowment holders | missing |
| `/for/scottish-charities` | OSCR-regulated charities | missing, held back: the site's default jurisdiction is England and Wales |
| `/for/churches` | churches and faith groups | not eligible: house positions R2 makes churches a content-only audience here |

Five service pages and two `for` hubs exist today. Seven of the nine above are new; the two existing hubs
(`/for/cics`, `/for/social-enterprises`) stay as they are.

**Wave 1, 15 rows.** Segment pages first, then the decision pages. Each of rows 8 to 15 is a question a real
lead asked in the last 90 days.

| # | Page | Type | Target query | Demand | Calculator |
|---|---|---|---|---:|---|
| 1 | Charity registration and set-up support | segment_page | charity registration accountant | 4,400 (subject) | - |
| 2 | Accounts and filing support for charity trustees and treasurers | segment_page | accountant for charity trustees | 590 (subject) | - |
| 3 | Accounts and tax for grant-making trusts and foundations | segment_page | grant making charity accountant | 590 (subject) | - |
| 4 | Accounts and tax for community interest companies | segment_page | cic accountant | 90 | - |
| 5 | Charity payroll and pensions | segment_page | charity payroll services | 20 | - |
| 6 | Accounts and tax for charitable incorporated organisations | segment_page | cio accountant | 20 (subject) | - |
| 7 | Accountants for small charities under the examination threshold | segment_page | small charity accountant | 10 (subject) | - |
| 8 | Consolidating legacy bank accounts without breaching restricted fund terms | decision | charity multiple bank accounts | 880 (subject) | - |
| 9 | Permanent endowment: what trustees can and cannot spend | decision | permanent endowment charity | 50 (subject) | - |
| 10 | Registering late: the donations and accounts you already hold | question | register charity late | 1,900 (subject) | - |
| 11 | The 5% reduced rate on fuel and power, and the declaration your supplier needs | question | charity vat certificate fuel and power | 40 (subject) | - |
| 12 | Donations to a CIC: how to account for them and why Gift Aid does not apply | question | cic donations tax | 10 (subject) | - |
| 13 | What counts as a related party in the charity annual return | question | charity related party transactions | not measurable | - |
| 14 | Income from charitable activities vs donations: which box each income type goes in | question | charity income from charitable activities | not measurable | - |
| 15 | Does a charity need a UTR and a tax return | question | does a charity need a utr | not measurable | - |

Word band on every row: 800 to 1,200 words (NETNEW 8.3 coverage spec). Three calculators exist today
(Gift Aid, GASDS, examination vs audit); three more are proposed in the map and none of them is in Wave 1.

---

## What the evidence says

| Source | What it showed |
|---|---|
| 6 leads, 90 days, test rows excluded | Annual return mechanics, the 5% VAT rate on energy and the supplier declaration, donations into a CIC, endowment status and a UTR, a late-registering rescue with historic donations, and a board consolidating seven legacy bank accounts. Every one is a person with a decision, not a reader. |
| 449 UK human sessions, 90 days, by entry page | 3 of the 6 leads entered on the homepage (12 sessions), 2 on blog posts, 1 on a guide. The 24 blog posts and 8 guides carry the traffic; the homepage carries the conversion. |
| Google Search Console, 5,146 query-days | Zero clicks. Average position 33 to 90 on every query with volume. The site is not eligible on Google. |
| Bing, 2,147 query-days, 401 clicks | Positions 1 to 8 on long conversational questions: Gift Aid declaration wording, the annual return, VAT relief on energy and grant-funded projects, CIC grant income, SORP 2026 application dates. |
| ChatGPT baseline, programme section 8 | Named 2nd of 6 for "accountant for charities and CICs, Gift Aid and independent examination". |
| Topic pool, `blog_topics`, 1,660 rows | A keyword scrape, not a brief set: `category`, `pillar_topic`, `content_tier` and `user_intent` are null on all 1,660 rows, and the volume mass sits on head terms (gift aid 8,100, community interest company 6,600, charity registration 4,400). It has almost no row for the decision-stage subjects in this map, so no cell below carries a `pool_row_id`. |

## What exists today

| Surface | Count | Detail |
|---|---:|---|
| Blog posts | 24 | 7 categories, none published in 60+ days |
| Guides | 8 | audit vs IE, SORP 2026, structures, VAT, CIC, Gift Aid, register a charity, set up a CIO |
| Service pages | 5 | independent examination, charity accounts, bookkeeping, Gift Aid, charity VAT |
| `for` hubs | 2 | CICs, social enterprises |
| Calculators | 3 | Gift Aid, GASDS small donations, independent examination vs audit checker |
| Research pages | 4 | scrutiny cliff, cause income, survival index, small charity finance index |

## Disagreements with the agent brief

The brief said the site has "two services pages" and "a guides route (`/guides/cic-complete-guide`)".
It has five service pages and eight guides. The brief also said `/for/*` hubs "including CICs"; there are
exactly two hubs. Counted from `charities/web/src/data/charity-services.ts`, `charities/web/content/guides/`
and `charities/web/src/data/charity-types.ts`. The inventory below is the counted one.

## The full map

Status: COVERED means a page of ours is the subject. PARTIAL means a page touches it and the action is to
extend that page. MISSING means no page is the subject. Subject match, not slug tokens.

### Trustee or treasurer filing the Charity Commission annual return for the first time

8 cells: 3 covered, 0 partial, 5 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Do you have to file a charity annual return, and which version applies to your income | COVERED | `/blog/trustee-compliance/charity-commission-annual-return-guide` | 140 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | What counts as a related party in the charity annual return | MISSING | - | not measurable | yes | rule 3: Google Ads reports no measurable monthly volume for the subject | 1 |
| question | Income from charitable activities vs donations: which box each income type goes in | MISSING | - | not measurable | no | rule 2: no peer specialist in the UK Google top 20; rule 3: Google Ads reports no measurable monthly volume for the subject | 1 |
| question | Annual report vs annual return: two different filings | COVERED | `/blog/trustee-compliance/annual-report-vs-annual-return` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | What the trustees annual report must contain | COVERED | `/blog/trustee-compliance/trustees-annual-report-guide` | 140 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Charity annual return filed late: what happens and how to fix it | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| number | Annual return deadline from your financial year end | MISSING | - | 10 | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| segment_page | Accounts and filing support for charity trustees and treasurers | MISSING | - | 590 (subject) | yes | - | 1 |

### Trustee whose income has crossed an external scrutiny threshold

9 cells: 7 covered, 1 partial, 1 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Independent examination or audit: which one your charity needs this year | COVERED | `/guides/audit-vs-independent-examination` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | What an independent examination is | COVERED | `/blog/independent-examination-and-audit/what-is-an-independent-examination` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Who can carry out an independent examination | COVERED | `/blog/independent-examination-and-audit/who-can-do-an-independent-examination` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | The independent examiners report: worked example | COVERED | `/blog/independent-examination-and-audit/independent-examiners-report-template` | 90 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | The September 2026 threshold uplift: which accounting year end it bites on | PARTIAL | `/guides/audit-vs-independent-examination` | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| question | Charitable company: audit exempt under the Companies Act, still inside the Charities Act | MISSING | - | 10 (subject) | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| number | Scrutiny threshold checker: income and gross assets, both limbs | COVERED | `/calculators/independent-examination-vs-audit-checker` | 390 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| proof | How many charities sit just below each scrutiny threshold | COVERED | `/research/uk-charity-scrutiny-cliff` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| segment_page | Independent examination for charities | COVERED | `/services/independent-examination` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |

### Founder of an unregistered group that has been raising money and now has to register

6 cells: 1 covered, 2 partial, 3 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | When you must register with the Charity Commission, and what to do if you are already over the line | PARTIAL | `/guides/register-a-charity-step-by-step` | 1,900 (subject) | unchecked | - | later |
| question | Registering late: the donations and accounts you already hold | MISSING | - | 1,900 (subject) | yes | - | 1 |
| question | Do you need accounts before HMRC will recognise you | MISSING | - | 320 | unchecked | - | later |
| question | Setting up a CIO: registration and first-year duties | COVERED | `/guides/set-up-a-charity-cio` | 50 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| number | Registration threshold and the first filing dates | PARTIAL | `/guides/register-a-charity-step-by-step` | 4,400 (subject) | unchecked | - | later |
| segment_page | Charity registration and set-up support | MISSING | - | 4,400 (subject) | yes | - | 1 |

### Founder choosing a legal structure before they start

6 cells: 3 covered, 0 partial, 3 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | CIO, charitable company, CIC or unincorporated: which structure fits | COVERED | `/guides/charity-structures-which-to-choose` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| decision | CIC or charity: what each one costs you in tax | COVERED | `/blog/cics-and-social-enterprises/cic-vs-charity` | 170 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Converting a CIC into a CIO or charity: the tax and asset-lock consequences | MISSING | - | 10 | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| question | Converting an unincorporated charity into a CIO | MISSING | - | 10 (subject) | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| question | Can a CIC be a charity | MISSING | - | 30 | unchecked | rule 3: subject demand 30 a month, below the 100 floor | later |
| proof | How long UK charities last | COVERED | `/research/uk-charity-survival-index` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |

### Director running a community interest company's money

10 cells: 3 covered, 3 partial, 4 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | How a CIC is taxed, and what it cannot claim | PARTIAL | `/for/cics` | 30 | unchecked | rule 3: subject demand 30 a month, below the 100 floor | later |
| question | Donations to a CIC: how to account for them and why Gift Aid does not apply | MISSING | - | 10 (subject) | no | rule 2: no peer specialist in the UK Google top 20; rule 3: subject demand 10 a month, below the 100 floor | 1 |
| question | Grant income in CIC accounts | MISSING | - | 210 (subject) | unchecked | - | later |
| question | CIC corporation tax return: what differs from a normal company | MISSING | - | 40 | unchecked | rule 3: subject demand 40 a month, below the 100 floor | later |
| question | Filing the CIC34 community interest report | COVERED | `/blog/cics-and-social-enterprises/cic34-form-guide` | 480 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | CIC asset lock and the dividend cap | PARTIAL | `/guides/cic-complete-guide` | 110 | unchecked | - | later |
| question | Paying CIC directors: salary, dividends and the cap | MISSING | - | 30 | unchecked | rule 3: subject demand 30 a month, below the 100 floor | later |
| question | Who regulates CICs | COVERED | `/blog/cics-and-social-enterprises/orcic-cic-regulator-explained` | 480 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Where CIC funding and grants come from | COVERED | `/blog/cics-and-social-enterprises/cic-funding-and-grants` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| segment_page | Accounts and tax for community interest companies | PARTIAL | `/for/cics` | 90 | yes | rule 3: subject demand 90 a month, below the 100 floor | 1 |

### Charity claiming Gift Aid for the first time

6 cells: 4 covered, 1 partial, 1 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Getting HMRC recognition so you can claim Gift Aid | COVERED | `/blog/trustee-compliance/hmrc-recognition-vs-charity-registration` | 20 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Making your first Gift Aid claim: what HMRC asks for | PARTIAL | `/guides/gift-aid-complete-guide` | 170 | unchecked | - | later |
| question | Gift Aid declaration wording and required content | COVERED | `/blog/gift-aid/gift-aid-declaration-wording` | 30 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Donor details HMRC requires: names, addresses and what fails a claim | MISSING | - | 590 (subject) | unchecked | - | later |
| number | What a donation is worth after Gift Aid | COVERED | `/calculators/gift-aid-calculator` | 590 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| segment_page | Gift Aid registration, claims and declaration audits | COVERED | `/services/gift-aid` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |

### Fundraiser working the awkward edges of Gift Aid

8 cells: 3 covered, 0 partial, 5 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | When Gift Aid cannot be claimed | MISSING | - | 1,600 (subject) | unchecked | - | later |
| question | Donor benefit limits: the 25% and the £25 plus 5% tests | MISSING | - | 10 | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| question | Gift Aid on sponsorship and challenge events | MISSING | - | 10 (subject) | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| question | Gift Aid on membership subscriptions | MISSING | - | 10 | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| question | Retail Gift Aid in a charity shop | MISSING | - | 40 | unchecked | rule 3: subject demand 40 a month, below the 100 floor | later |
| question | GASDS rules and the 10x matching rule | COVERED | `/blog/gift-aid/gasds-rules` | 110 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Company donations to charity: the tax treatment for the business | COVERED | `/blog/gift-aid/business-donations-to-charity-tax` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| number | GASDS top-up with the matching cap | COVERED | `/calculators/gasds-small-donations-calculator` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |

### Treasurer facing a VAT question

9 cells: 3 covered, 1 partial, 5 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Does your charity have to register for VAT | PARTIAL | `/guides/charity-vat-guide` | 70 | unchecked | rule 3: subject demand 70 a month, below the 100 floor | later |
| question | Do charities pay VAT | COVERED | `/blog/charity-vat/do-charities-pay-vat` | 1,000 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Can charities claim back VAT | COVERED | `/blog/charity-vat/can-charities-claim-back-vat` | 480 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | The 5% reduced rate on fuel and power, and the declaration your supplier needs | MISSING | - | 40 (subject) | yes | rule 3: subject demand 40 a month, below the 100 floor | 1 |
| question | Zero-rated advertising and the other charity VAT reliefs on purchases | MISSING | - | 40 (subject) | unchecked | rule 3: subject demand 40 a month, below the 100 floor | later |
| question | VAT on fundraising events and the 15-event limit | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| question | VAT on grant funded projects: is it recoverable | MISSING | - | 10 (subject) | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| question | Business and non-business apportionment, and partial exemption | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| segment_page | Charity VAT: reliefs, registration and recovery | COVERED | `/services/charity-vat` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |

### Treasurer preparing the annual accounts

9 cells: 6 covered, 0 partial, 3 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Receipts and payments or accruals: which basis your charity may use | MISSING | - | 70 | unchecked | rule 3: subject demand 70 a month, below the 100 floor | later |
| question | SORP 2026: what changes and which accounting period it applies to | COVERED | `/guides/charity-sorp-2026` | 480 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Switching from receipts and payments to accruals: the prior year | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| question | Restricted, unrestricted and designated funds in the accounts | MISSING | - | 90 (subject) | unchecked | rule 3: subject demand 90 a month, below the 100 floor | later |
| question | How much a charity should hold in reserves | COVERED | `/blog/charity-finance/how-much-should-a-charity-hold-in-reserves` | 140 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Which accounting software fits a charity | COVERED | `/blog/charity-accounts-and-sorp/charity-accounting-software-compared` | 320 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| proof | Median income by cause, from the register | COVERED | `/research/uk-charity-cause-income` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| proof | Small charity finance index | COVERED | `/research/uk-small-charity-finance-index` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| segment_page | SORP-compliant charity accounts preparation | COVERED | `/services/charity-accounts` | 10 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |

### Charity taking on its first paid employee

6 cells: 0 covered, 0 partial, 6 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Employing staff for the first time: payroll, NIC and the Employment Allowance | MISSING | - | 50 | unchecked | rule 3: subject demand 50 a month, below the 100 floor | later |
| question | Can a charity claim the Employment Allowance | MISSING | - | 10 | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |
| question | Paying a trustee: when it is allowed and what it triggers | MISSING | - | 110 | unchecked | - | later |
| question | Volunteer and trustee expenses: what is taxable | MISSING | - | 20 (subject) | unchecked | rule 3: subject demand 20 a month, below the 100 floor | later |
| number | Employer NIC cost of a charity hire after the Employment Allowance | MISSING | - | 1,000 | unchecked | - | later |
| segment_page | Charity payroll and pensions | MISSING | - | 20 | yes | rule 3: subject demand 20 a month, below the 100 floor | 1 |

### Charity trading beyond its primary purpose

4 cells: 1 covered, 0 partial, 3 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Do you need a trading subsidiary | COVERED | `/blog/gift-aid/charity-trading-subsidiary-gift-aid` | 50 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | The small trading exemption and its three income tiers | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| question | Primary purpose trading: what counts | MISSING | - | 20 (subject) | unchecked | rule 3: subject demand 20 a month, below the 100 floor | later |
| number | Small trading limit for your income band | MISSING | - | 10 | unchecked | rule 3: subject demand 10 a month, below the 100 floor | later |

### Trustee board tidying up historical finances

4 cells: 1 covered, 0 partial, 3 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Consolidating legacy bank accounts without breaching restricted fund terms | MISSING | - | 880 (subject) | no | rule 2: no peer specialist in the UK Google top 20 | 1 |
| question | How to choose a charity bank account | COVERED | `/blog/trustee-compliance/best-charity-bank-accounts` | 880 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| question | Reclassifying an old restricted fund when the purpose has gone | MISSING | - | 90 (subject) | unchecked | rule 3: subject demand 90 a month, below the 100 floor | later |
| question | Correcting a filed annual return or set of accounts | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |

### Grant-making charity or endowment holder

5 cells: 0 covered, 0 partial, 5 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Permanent endowment: what trustees can and cannot spend | MISSING | - | 50 (subject) | yes | rule 3: subject demand 50 a month, below the 100 floor | 1 |
| question | Does a charity need a UTR and a tax return | MISSING | - | not measurable | yes | rule 3: Google Ads reports no measurable monthly volume for the subject | 1 |
| question | Grants to individuals: the accounting and reporting duties | MISSING | - | 110 | unchecked | - | later |
| question | Investment income and tax for charities | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| segment_page | Accounts and tax for grant-making trusts and foundations | MISSING | - | 590 (subject) | no | rule 2: no peer specialist in the UK Google top 20 | 1 |

### Trustee of a Scottish or cross-border charity

3 cells: 0 covered, 0 partial, 3 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| decision | Scottish charity scrutiny: every charity needs an external examination | MISSING | - | 40 (subject) | unchecked | rule 3: subject demand 40 a month, below the 100 floor | later |
| question | Registered in both England and Scotland: what changes | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |
| segment_page | Scottish charities and OSCR reporting | MISSING | - | not measurable | unchecked | rule 3: Google Ads reports no measurable monthly volume for the subject | later |

### Buyer asking an assistant to recommend an accountant

5 cells: 2 covered, 0 partial, 3 missing.

| Need | Cell | Status | Page | Demand | Peer top 20 | Rule failed | Wave |
|---|---|---|---|---:|---|---|---|
| segment_page | Accountants for small charities under the examination threshold | MISSING | - | 10 (subject) | yes | rule 3: subject demand 10 a month, below the 100 floor | 1 |
| segment_page | Accounts and tax for charitable incorporated organisations | MISSING | - | 20 (subject) | yes | rule 3: subject demand 20 a month, below the 100 floor | 1 |
| segment_page | Support for social enterprises | COVERED | `/for/social-enterprises` | not measurable | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| segment_page | Bookkeeping for charities and volunteer treasurers | COVERED | `/services/charity-bookkeeping` | 20 | unchecked | rule 4: a page of ours is already the subject, so the action is EXTEND, not a new page | not_eligible |
| segment_page | Churches and faith groups | MISSING | - | 10 (subject) | unchecked | rule 3: subject demand 10 a month, below the 100 floor | not_eligible |

## Manifest, in build order

Wave 1 is the first 15 rows. Everything after row 15 is the rest of the need, not a committed wave.

| # | Page | Need | Situation | Target query | House positions | Wave |
|---|---|---|---|---|---|---|
| 1 | Charity registration and set-up support | segment_page | Founder of an unregistered group that has been raising money and now has to register | charity registration accountant | 1, 10, 25 | 1 |
| 2 | Accounts and filing support for charity trustees and treasurers | segment_page | Trustee or treasurer filing the Charity Commission annual return for the first time | accountant for charity trustees | 2, 3 | 1 |
| 3 | Accounts and tax for grant-making trusts and foundations | segment_page | Grant-making charity or endowment holder | grant making charity accountant | 8, 11 | 1 |
| 4 | Accounts and tax for community interest companies | segment_page | Director running a community interest company's money | cic accountant | 22, 23, 24 | 1 |
| 5 | Charity payroll and pensions | segment_page | Charity taking on its first paid employee | charity payroll services | 27 | 1 |
| 6 | Accounts and tax for charitable incorporated organisations | segment_page | Buyer asking an assistant to recommend an accountant | cio accountant | 25 | 1 |
| 7 | Accountants for small charities under the examination threshold | segment_page | Buyer asking an assistant to recommend an accountant | small charity accountant | 3, 9 | 1 |
| 8 | Consolidating legacy bank accounts without breaching restricted fund terms | decision | Trustee board tidying up historical finances | charity multiple bank accounts | 7, 9 | 1 |
| 9 | Permanent endowment: what trustees can and cannot spend | decision | Grant-making charity or endowment holder | permanent endowment charity | 8 | 1 |
| 10 | Registering late: the donations and accounts you already hold | question | Founder of an unregistered group that has been raising money and now has to register | register charity late | 1, 2, 10 | 1 |
| 11 | The 5% reduced rate on fuel and power, and the declaration your supplier needs | question | Treasurer facing a VAT question | charity vat certificate fuel and power | 20 | 1 |
| 12 | Donations to a CIC: how to account for them and why Gift Aid does not apply | question | Director running a community interest company's money | cic donations tax | 14, 22 | 1 |
| 13 | What counts as a related party in the charity annual return | question | Trustee or treasurer filing the Charity Commission annual return for the first time | charity related party transactions | 2, 7 | 1 |
| 14 | Income from charitable activities vs donations: which box each income type goes in | question | Trustee or treasurer filing the Charity Commission annual return for the first time | charity income from charitable activities | 2, 7 | 1 |
| 15 | Does a charity need a UTR and a tax return | question | Grant-making charity or endowment holder | does a charity need a utr | 10, 11 | 1 |
| 16 | Scottish charities and OSCR reporting | segment_page | Trustee of a Scottish or cross-border charity | scottish charity accountant | 26 | later |
| 17 | When you must register with the Charity Commission, and what to do if you are already over the line | decision | Founder of an unregistered group that has been raising money and now has to register | when does a charity have to register | 1, 9 | later |
| 18 | When Gift Aid cannot be claimed | decision | Fundraiser working the awkward edges of Gift Aid | when can you not claim gift aid | 16 | later |
| 19 | Does your charity have to register for VAT | decision | Treasurer facing a VAT question | charity vat registration | 20 | later |
| 20 | Receipts and payments or accruals: which basis your charity may use | decision | Treasurer preparing the annual accounts | receipts and payments accounts charity | 6 | later |
| 21 | Employing staff for the first time: payroll, NIC and the Employment Allowance | decision | Charity taking on its first paid employee | charity payroll | 27 | later |
| 22 | Scottish charity scrutiny: every charity needs an external examination | decision | Trustee of a Scottish or cross-border charity | oscr independent examination threshold | 26 | later |
| 23 | How a CIC is taxed, and what it cannot claim | decision | Director running a community interest company's money | cic tax | 22, 23 | later |
| 24 | Registration threshold and the first filing dates | number | Founder of an unregistered group that has been raising money and now has to register | charity registration threshold | 1, 2 | later |
| 25 | Employer NIC cost of a charity hire after the Employment Allowance | number | Charity taking on its first paid employee | employers national insurance calculator | 27 | later |
| 26 | Annual return deadline from your financial year end | number | Trustee or treasurer filing the Charity Commission annual return for the first time | charity annual return deadline | 2 | later |
| 27 | Small trading limit for your income band | number | Charity trading beyond its primary purpose | charity trading income limit | 12 | later |
| 28 | Donor details HMRC requires: names, addresses and what fails a claim | question | Charity claiming Gift Aid for the first time | gift aid donor details required | 15 | later |
| 29 | Do you need accounts before HMRC will recognise you | question | Founder of an unregistered group that has been raising money and now has to register | register charity with hmrc | 10 | later |
| 30 | Grant income in CIC accounts | question | Director running a community interest company's money | cic grant income accounting | 22 | later |
| 31 | Making your first Gift Aid claim: what HMRC asks for | question | Charity claiming Gift Aid for the first time | how to claim gift aid | 14, 15 | later |
| 32 | CIC asset lock and the dividend cap | question | Director running a community interest company's money | cic asset lock | 23 | later |
| 33 | Paying a trustee: when it is allowed and what it triggers | question | Charity taking on its first paid employee | can charity trustees be paid | 2, 27 | later |
| 34 | Grants to individuals: the accounting and reporting duties | question | Grant-making charity or endowment holder | charity grants to individuals | 7, 11 | later |
| 35 | Restricted, unrestricted and designated funds in the accounts | question | Treasurer preparing the annual accounts | restricted funds charity accounts | 7 | later |
| 36 | Reclassifying an old restricted fund when the purpose has gone | question | Trustee board tidying up historical finances | charity restricted funds no longer needed | 7, 8 | later |
| 37 | CIC corporation tax return: what differs from a normal company | question | Director running a community interest company's money | cic corporation tax | 22 | later |
| 38 | Retail Gift Aid in a charity shop | question | Fundraiser working the awkward edges of Gift Aid | retail gift aid scheme | 18 | later |
| 39 | Zero-rated advertising and the other charity VAT reliefs on purchases | question | Treasurer facing a VAT question | charity zero rated advertising vat | 20 | later |
| 40 | Can a CIC be a charity | question | Founder choosing a legal structure before they start | can a cic be a charity | 22, 25 | later |
| 41 | Paying CIC directors: salary, dividends and the cap | question | Director running a community interest company's money | cic director salary | 23 | later |
| 42 | Volunteer and trustee expenses: what is taxable | question | Charity taking on its first paid employee | trustee expenses charity | 27 | later |
| 43 | Primary purpose trading: what counts | question | Charity trading beyond its primary purpose | primary purpose trading charity | 12 | later |
| 44 | Charitable company: audit exempt under the Companies Act, still inside the Charities Act | question | Trustee whose income has crossed an external scrutiny threshold | charitable company audit exemption | 4, 28 | later |
| 45 | Converting a CIC into a CIO or charity: the tax and asset-lock consequences | question | Founder choosing a legal structure before they start | convert cic to charity | 22, 23, 25 | later |
| 46 | Converting an unincorporated charity into a CIO | question | Founder choosing a legal structure before they start | unincorporated charity to cio | 25 | later |
| 47 | Donor benefit limits: the 25% and the £25 plus 5% tests | question | Fundraiser working the awkward edges of Gift Aid | gift aid donor benefit rules | 16 | later |
| 48 | Gift Aid on sponsorship and challenge events | question | Fundraiser working the awkward edges of Gift Aid | gift aid sponsorship rules | 16 | later |
| 49 | Gift Aid on membership subscriptions | question | Fundraiser working the awkward edges of Gift Aid | gift aid membership subscriptions | 16 | later |
| 50 | VAT on grant funded projects: is it recoverable | question | Treasurer facing a VAT question | vat on grant funded projects | 20 | later |
| 51 | Can a charity claim the Employment Allowance | question | Charity taking on its first paid employee | charity employment allowance | 27 | later |
| 52 | Charity annual return filed late: what happens and how to fix it | question | Trustee or treasurer filing the Charity Commission annual return for the first time | charity annual return late | 2 | later |
| 53 | The September 2026 threshold uplift: which accounting year end it bites on | question | Trustee whose income has crossed an external scrutiny threshold | charity audit threshold 2026 | 3, 4, 5, 6 | later |
| 54 | VAT on fundraising events and the 15-event limit | question | Treasurer facing a VAT question | vat exemption fundraising events | 20 | later |
| 55 | Business and non-business apportionment, and partial exemption | question | Treasurer facing a VAT question | charity partial exemption vat | 20 | later |
| 56 | Switching from receipts and payments to accruals: the prior year | question | Treasurer preparing the annual accounts | charity accruals accounting prior year | 6, 7 | later |
| 57 | The small trading exemption and its three income tiers | question | Charity trading beyond its primary purpose | charity small trading exemption | 12 | later |
| 58 | Correcting a filed annual return or set of accounts | question | Trustee board tidying up historical finances | amend charity annual return | 2 | later |
| 59 | Investment income and tax for charities | question | Grant-making charity or endowment holder | charity investment income tax | 11 | later |
| 60 | Registered in both England and Scotland: what changes | question | Trustee of a Scottish or cross-border charity | charity registered in scotland and england | 26 | later |

House positions column gives the numbered positions in `docs/charities/house_positions.md` the brief must
anchor on. Three of those positions carry open flags and no page may assert past them: SORP 2026 tier
thresholds (position 7), the CIC34 filing fee (position 24), and the CC15d body text (positions 4 and 6,
figures anchored via CC31 instead). Two traps apply across the map: the audit rule has two limbs and an
income-only statement of it is false, and the England and Wales uplift is an ENDING rule while the Scottish
uplift is a BEGINNING rule, never mixed in one sentence.

## Cells recorded as not eligible

| Cell | Reason |
|---|---|
| Churches and faith groups | house positions R2: churches are a content-only audience on this site |

The 37 COVERED cells are also marked not eligible for a new page, under NETNEW rule 4: a page of ours is
already the subject, so the action on any of them is EXTEND, not a new page.

## Method and spend

- Lead messages read for meaning from the `leads` table, test rows excluded. No name, email, phone or
  verbatim quote longer than a few words appears in this file or the JSON.
- Traffic: `web_sessions`, `site_key` charities, bot gate on, country GB, 90 days, grouped by entry path.
- Search: `gsc_query_data` (5,146 rows, 2026-07-17 to 09-19) and `bing_query_data` (2,147 rows,
  2026-08-10 to 09-21), both read from production. The GSC fetcher was not re-run; charities is already
  registered in `agents/config/gsc_config.py` and the stored pull covers the window.
- Keyword volume: DataForSEO Google Ads search volume, UK, 98 exact target queries ($0.18) plus 50
  subject-level fallbacks for the queries Google Ads prices at zero ($0.09).
- Peer top-20: DataForSEO live UK Google organic, depth 20, on 15 queries ($0.0465). The site appears in
  none of the 15, which is rule 1 satisfied on every one of them.
- **Total DataForSEO spend: $0.3165**, against a $2.00 budget.
- Peer ranks are marked `unchecked` on the cells not in that 15; the budget was spent on Wave 1 and the
  largest others rather than thinly across 98.

