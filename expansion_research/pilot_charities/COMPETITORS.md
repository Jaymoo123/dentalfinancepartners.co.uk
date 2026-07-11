# Verified competitor universe — Charities & non-profits pilot (R3)

Date: 2026-07-11. Machine-readable version: `competitors.json`. Raw evidence:
`raw/serp_raw.json` (SERPs), `raw/verify_evidence.json` (fetched homepages + service pages),
`candidates.json` (filter audit).

## Method

1. **32 UK queries** (head + service long-tail: charity accountant / independent examination /
   audit threshold / CIC / SORP / Gift Aid / charity VAT / churches / CIO) run on **Serper
   (gl=gb) AND DuckDuckGo (uk-en)** → 180 unique domains.
2. **Script filter**: own estate (hard `assert` vs `own_estate_exclusion.json` — caught 1 leak:
   `hollowaydavies.co.uk` ranks in a charity SERP, see Open questions) + 12 directory/gov/info
   domains → 167 candidates.
3. **Fetch-verify every candidate**: homepage + one charity service page each (robots-compliant
   fetcher from `optimisation_engine/competitor/_fetch.py`). 128 fetched clean; 39 errored
   (WAF 403s, TLS, DDG artefacts) — the material ones re-verified by WebFetch, the rest judged
   from SERP snippets or discarded as noise.
4. Verdicts judged from evidence (title/meta/H1/charity-mention density/UK signals), not by the
   script.

## Headline

**The real fight is ~11 dedicated specialists, of which 7 are primary** — consistent with R2's
STRONG-adjacent call. It splits into three lanes:

| Lane | Who owns it today | Depth |
|---|---|---|
| Small-charity accounts/IE (the money lane) | charityaccountants.co.uk, charityaccountant.co.uk, iel.org.uk (since 1996), charityexaminers.co.uk, accountantsforcharities.uk/.org.uk | Real but small firms; brochure sites + thin blogs |
| CIC compliance | cicaccountants.co.uk, KG Accountants (site + blog) | KG's blog owns huge CIC informational clusters (cic 12,100/mo, community interest company 6,600/mo — ranked_keywords pull) |
| Church/faith accounts | finspireaccounting.co.uk, stewardship.org.uk (platform) | We are content-only here by R2 decision |

## True rivals (verdict + evidence quote per domain)

### Primary (7)
1. **charityaccountants.co.uk** (14 SERP hits — most visible domain in the sweep). H1: *"Expert
   Accountants for Small Charities Across the UK"*; meta lists annual accounts, independent
   examination, payroll, Gift Aid, Commission compliance. The closest model to our intended play.
2. **charityaccountant.co.uk** (8 hits). Meta: *"accounting, bookkeeping and independent
   examination services at reasonable price to charities and social enterprises"*. ACCA firm.
3. **kgaccountants.co.uk** + 4. **kgaccountantsblog.com** (3 + 11 hits). *"Specialists in
   Community interest Companies(CICS) & Charities"*. The blog is their ranking machine and the
   single biggest topic-source rival.
5. **charityaccountingpartners.co.uk** (8 hits). WebFetch-verified: *"Specialist Charity
   Accountants Who Give Your Team Real Time Back"*, SORP-ready accounts, named ACA founder,
   ICAEW, London address. Targets £100k-£250k+ charities.
6. **cicaccountants.co.uk** (4 hits). H1: *"Complete Accountancy Services for Community Interest
   Companies"*, fixed monthly packages.
7. **iel.org.uk** — Independent Examiners Ltd (3 hits). Meta: *"UK charity specialists since 1996.
   Independent examination and year-end charity accounts... Fixed fees"*. The entrenched IE
   incumbent.

### Secondary / micro / regional (10)
charityexaminers.co.uk (IE for <£100k charities, fixed-fee remote), nfpaccountants.co.uk
(chartered, small charities & social enterprises, London), accountantsforcharities.org.uk
(exact-match brand **with programmatic location doorway pages** — a rank-and-rent-style SEO
play worth watching), sabaccountancy.co.uk ("focused exclusively on charities [and CICs]"),
cicaccountingservices.co.uk (solo, Cornwall), charitybookkeepingandaccounts.co.uk (solo
bookkeeper), accountingforgood.co.uk (CIC serving social enterprises), harrisaccountancy.co.uk
(third sector, regional), bcacic.uk (Bristol community accountants), jacksonandjackson.co.uk
(charity accountants London, /independent-examinations service page).

### Flagged, fetch-unverified (2)
- **accountantsforcharities.uk** — Serper #1 for "charity accountant"; snippet: *"leading UK-based
  accountants dedicated to the non-profit sector"*. 403 to both the bot fetcher and WebFetch.
  Treated as a primary-lane rival on SERP evidence; manual browser check queued (open question).
- **misss.co.uk** — SERP #2 for "CIC accountant"; TLS certificate expired on fetch. Micro rival,
  weak operator signal.

## Reference competitors (audit tier — quality bar, NOT target clients)

UHY Hacker Young (sector page fetched), Saffery (sector page fetched), Price Bailey (403; placed
top-10 in the R2 red-team live checks), Albert Goodman (403), plus regional multi-sector firms
appearing 1-2x each: MHA, Menzies, Kreston Reeves, Streets, Armstrong Watson, Larking Gowen,
Bishop Fleming, Milsted Langdon, Rouse, AAB, Burton Sweet, Richard Place Dobson, Randall & Payne.
Their sector content sets the E-E-A-T bar; their clients (audit-tier, £1m+) are explicitly not
our funnel (R2 decision: small/medium charities + CICs, below the audit threshold).

## Excluded (examples, full list in competitors.json)

- **Info platforms/sector bodies** (rank heavily, compete for attention not clients):
  Charity Excellence Framework, Charity Tax Group, ACIE, CAF, NCVO/CFG (filtered as directories),
  charitysorp.org, SCVO, Stewardship, Parish Resources.
- **Generalists with one charity page**: Treggena, Finance Box, Taxwise, Halliday Styan, ABM,
  Livingstones, Towerstone, Accounting People (WebFetch-confirmed generalist), Yorkshire Accountancy.
- **Adjacent specialists, not accountancy firms**: vatadvice.org + constablevat.com (charity VAT
  consultancies), ExpensePlus (software), Payroll Giving.

## Open questions

1. `hollowaydavies.co.uk` already surfaces in one charity SERP — cannibalisation wall needed at
   S-brand stage (which query: see `candidates.json` dropped.estate trail / serp_raw.json).
2. accountantsforcharities.uk manual verification (WAF-blocked).
3. accountantsforcharities.org.uk doorway-page footprint deserves a look before we design the
   locations architecture — Google is currently rewarding it.
