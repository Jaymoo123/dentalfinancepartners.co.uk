# §9.5 RESEARCH PACK: /blog/accountants-for-physiotherapists-and-therapists

Cluster: **C2_PLACEMENT.md row 22, "Therapists & allied health"**, ABSORB -> `medical`.
Written 2026-08-26 as **coverage-cluster addendum item 2**, against the same unblocking run as the opticians pack.
Naming note: a concurrent task owns `BATCH3_INDEX.md` and the `PACK_B3_*` family. These two packs are
NOT part of that batch. **Its ownership map at `BATCH3_INDEX.md` §6 is additionally binding on this page**
where it touches the same facts, and must be reconciled before writing.
This pack replaces the "cannot be packed" ruling in `packs/BATCH2_INDEX.md` §7 for this cluster.

Eight numbered sections in fixed order, then corrections and deltas. Binding rules V1 to V9 live
in `docs/medical/language_spec_2026-08-26.md`.

---

## 0. Provenance: every number carries its command

Discovery first, harvest second, because no domain in the 22-domain competitor universe runs an
allied-health page. Guard raised to $7.00 for this task only via `DATAFORSEO_ABORT_AT=7` on the
invoking command. No config file edited, default still $5.00.

| # | What | Command |
|---|---|---|
| P1 | Live SERPs, dual mode, 10 head terms including `accountants for physiotherapists`, `accountants for osteopaths`, `accountants for chiropractors`, `accountants for therapists`, `accountants for private practice allied health`, `accountants for private therapy practice`, `chiropractor accountant uk` | `serp_provider.fetch_serp(q, num=10, site_key="medical")`, all 10 `provider_used="dual"` |
| P2 | Competitor harvest, 18 domains, no volume floor, filtered after fetching | `DataForSEOClient.ranked_keywords(site_key="medical", domain=<d>, limit=1000)` + `persist_ranked_keywords(...)` into `dataforseo_competitor_data` |
| P3 | Independent demand read | `DataForSEOClient.keyword_ideas(["accountants for physiotherapists","accountants for therapists","osteopath accountant","chiropractor accountant","private practice therapist tax"], site_key="medical", limit=700)` -> **259 ideas returned**, the generator exhausted itself below the requested limit |
| P4 | Term-family slice | full page-through of `dataforseo_competitor_data` where `site_key='medical'` (**39,296 rows**), regex `physio\|therapist\|therapy\|osteopath\|chiroprac\|podiatr\|counsell\|psycholog\|dietit\|paramedic\|radiograph\|allied health\|speech.{0,3}language\|sports massage\|acupunctur`, then the accountancy regex printed in the opticians pack §0 P4 |
| P5 | Our Google baseline | `searchanalytics().query(siteUrl="sc-domain:medicalaccounts.co.uk", body={"startDate":"2026-05-28","endDate":"2026-08-26","dimensions":["query"],"rowLimit":25000})` -> **220 query rows** |
| P6 | Our Bing baseline | `BingQueryFetcher("medical").client.get_query_stats("https://www.medicalaccounts.co.uk")` -> **648 queries**, pulled 2026-08-26 |
| P7 | Teardown fetches | `curl -sL --compressed -A "Mozilla/5.0 ... Chrome/126.0.0.0 Safari/537.36"`, status per URL in section 4 |

The PostgREST paging trap documented in the opticians pack §0 applies identically here: page by
returned length, not by requested limit, or the harvest reads as 4,000 rows and every count below
comes out zero.

---

## 1. Target and permission level

**Page:** `/blog/accountants-for-physiotherapists-and-therapists`, NET-NEW.
**Permission level:** net-new file. No existing page touched, no redirect, no collapse.
**Revert path:** delete `Medical/web/content/blog/accountants-for-physiotherapists-and-therapists.md`.
**Blast radius:** one new URL. No existing page loses a query (section 2).

### 1a. SIZING, and the honest answer is uncomfortable: the measured demand is ZERO. Build it anyway, as ONE page.

`C2_PLACEMENT.md` row 22 records "cluster 3-5" at 50 volume, containment 0.13, C1 CLEAR. Both
instruments now disagree with that, in the same direction, hard.

| Instrument | Result |
|---|---|
| Harvest (P4), allied-health term family across **39,296 rows** | **11 rows match the profession family. Zero of them carry accountancy vocabulary. Distinct accountancy keywords: 0. Volume: 0** |
| The 11, for the record | clinical, HR and indemnity terms only, of the same shape batch 2 §7 already reported: `counselling for doctors`, `paramedic practice`, `paramedics in gp surgeries`, `professional indemnity insurance for paramedics` and similar |
| Independent demand read (P3), 259 ideas from 5 profession-plus-accountancy seeds | **70 carry profession vocabulary; combined volume 430/mo; not one is an accountancy term.** Top rows: `cpd for occupational therapists` 140, `specialty certifications for occupational therapists` 30, then a long tail of US textbook titles at 10 each (`differential diagnosis for physical therapists`, `biomechanics for massage therapists`) |
| The other 189 ideas | The generator abandoned the profession and returned generic accountancy: `medic accountants` 720, `hr accountants` 480, `accountants for doctors` 390, `taxi driver accountants` 110, `accountants crewe` 90. That drift is itself the finding: seeded with `accountants for physiotherapists`, DataForSEO's UK idea generator cannot find a physiotherapist accountancy term and falls back to doctors and taxi drivers |
| Live SERPs (P1) | **Fully populated and competitive.** Ten head terms, ten UK-firm-dominated top-10s, five firms running dedicated pages, one of them 3,711 words |

**The cluster is real commercially and invisible statistically, and both halves of that are the
finding.** Firms are spending money to hold these SERPs. DataForSEO's UK volume data reports
nothing, which means the demand sits below its reporting floor, is spread across too many
long-tail forms to aggregate, or is served by SERPs whose volume is attributed to terms our regex
did not name. **"Zero measured volume" is not "zero demand" and must not be reported as such.**

Two further contaminations worth stating rather than burying. `accountants for therapists` and
`accountants for private therapy practice` return **US and Australian** results inside the UK
top-10 (`joinheard.com`, `practiceoftherapy.com`, `cocountant.com`, `tldraccounting.com`,
`srjca.com`, `cleartax.com.au`, `physioaccountant.com.au`) plus `reddit.com` and `youtube.com`.
A UK SERP leaking that much foreign and UGC content is a SERP the search engine has not found
enough good UK answers for. That is an opportunity signal, and it is also why the volume data is
unreliable here.

**Ruling: ONE page.** Under the owner's standing instruction of 2026-08-26, coverage is the
strategy and low volume is not a reason to skip a niche, so the cluster gets built. But size
decides shape, and there is no keyword evidence anywhere for a second page, let alone five. One
page, cut around the fork in section 5a.

**The two-page alternative is on the record**, because it has a real argument and the owner may
prefer it. The competitor set splits cleanly in two: `livingstonesaccountants.co.uk` owns
physiotherapy clinics (2,521 words) and `btbaccountants.co.uk` owns therapists and counsellors
(3,711 words), and the VAT answer for those two audiences is **opposite** (section 5a). Two pages
would let each answer stand alone. It is not recommended, because splitting zero measured demand
across two pages gives each page nothing to rank for, and because the fork itself is the most
interesting thing either page could say. Putting the fork on one page makes the page; splitting it
across two destroys it on both.

### 1b. THE OWNERSHIP MAP ROWS THAT BIND THIS PAGE

Carried in full from `packs/BATCH2_INDEX.md` §4.

| # | Shared fact | Owner | What THIS page does |
|---|---|---|---|
| O3 | Adjusted net income, £100,000 to £125,140 taper, 60% band | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | One sentence and a link at most |
| O7 | **Flat-rate uniform and laundry relief, professional subscriptions, ITEPA 2003 s.343 / List 3** | `/blog/nhs-uniform-tax-relief-laundry-allowance` | **The sharpest fence on this page.** That page is LIVE and already names "nurses, midwives, chiropodists, dental nurses, phlebotomists, radiographers and physiotherapists and other therapists, at £125 per tax year (HMRC EIM32712)". **This page prints no flat rate, no EIM reference, no List 3 explanation.** One sentence and a link |
| O8 | P87, self-assessment route, four-year limit, repayment-agent warning | `/blog/nhs-uniform-tax-relief-laundry-allowance` | One sentence and a link |
| O9 | Professional body fees: deductible, **amounts UNVERIFIED** | `house_positions.md` §8, §10 | **Extended: no HCPC, GOsC, GCC, CSP, BACP or UKCP fee amount may be printed.** Deductibility yes, figures no. Hard fail F5 |
| O14 | The national commercial pitch, "what a healthcare accountant does" | `/blog/healthcare-accountants-uk` | This page does not pitch nationally, adds no city vocabulary |
| O15 | Audience descriptions for vets, nurses, **allied health** inside the hub | Hub **routes only**, 2 to 4 sentences then hands off | **This page is the handoff target.** V4: the hub must not grow an allied-health section, and this page must not become a second hub |
| O16 | Practice-ownership economics: goodwill, associate versus principal, incorporation, partnership accounts | The existing GP and private-practice corpus | One sentence and a link. Write only what is genuinely allied-health-specific |
| O17 | VAT: healthcare exemption versus standard rating, the liability principle | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` | **See the C2 (was O20) amendment below** |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link. A privately practising physiotherapist is not in it by virtue of private work; an NHS-employed one is. See section 6b |
| C1 (was O19) | VAT **valuation**: apportionment of a single charge, s.19(4), separately disclosed charges | `/blog/accountants-for-opticians-optical-practice-vat` (coverage-cluster addendum item 1) | One sentence and a link if a mixed supply comes up. Do not explain apportionment |

**C2 (was O20), NEW, and it is what gives this page a reason to exist.** O17 owns the exemption's general
mechanics. It does not own, and no page in the corpus owns, **the statutory-register test applied
to the non-medical professions**: who is on a register named in VAT Notice 701/57 §2.1 and who is
not, and what follows commercially from being on the wrong side of that line. That is this page's
property. The liability principle gets one sentence and a link to O17; the register fork is
written here in full.

### 1c. FRAMING CONDITIONS. Hard acceptance criteria.

1. **This reader has no NHS pension from their private work and probably no NHS contract at all.** Every default in this corpus is wrong for them.
2. **The audience is not one audience.** A physiotherapist, an osteopath and a chiropractor are statutorily registered. A counsellor, a psychotherapist, a hypnotherapist and an acupuncturist are not. The page's job is to make the reader work out which side they are on. It must never address them as a single undifferentiated "therapist".
3. **The tax answer diverges before the accounting answer does.** For the registered group, professional fees are exempt and VAT registration is largely a non-question. For the unregistered group, fees are standard-rated and crossing the registration threshold is a real and expensive event. Writing one answer for both would be the single worst failure available on this page.
4. **No figure may be lifted from a competitor page.** Batch 2 finding C. Primary source or nothing.
5. **Brand-risk read at 90 days.** This page widens the brand from doctors to allied health. If the enquiries it produces are ones the practice cannot serve, that is recorded, not celebrated.

### 1d. Regulatory position of the reader, verified

- **Physiotherapists, chiropodists/podiatrists, occupational therapists, dietitians, orthoptists, paramedics, radiographers, speech and language therapists, arts therapists, practitioner psychologists, prosthetists/orthotists, biomedical scientists, clinical scientists, hearing aid dispensers, operating department practitioners**: registered under the Health Professions Order 2001 (HCPC), and named in VAT Notice 701/57 §2.1.
- **Osteopaths** (General Osteopathic Council) and **chiropractors** (General Chiropractic Council): separately named in §2.1.
- **Counsellors, psychotherapists, hypnotherapists, acupuncturists**: **not** on a statutory register. VAT Notice 701/57 §2.2, verbatim: *"Therapists such as acupuncturists, psychotherapists, hypnotherapists and others who do not have statutory registers as described in section '2.1 Meaning of a health professional' cannot currently exempt their services."* BACP and UKCP are voluntary registers and do not change this.
- **Practitioner psychologists are HCPC-registered and therefore ARE in §2.1**, while psychotherapists are not. That is a distinction the reader will get wrong and it must be stated explicitly.

---

## 2. Equity register

**Empty. Net-new page, nothing on this site ranks for anything in the cluster.**

```
# P5: GSC, sc-domain:medicalaccounts.co.uk, 2026-05-28 to 2026-08-26, dimensions ["query"]
# total query rows: 220
# regex optic|optom|ophthalm|spectacle|eye test|physio|therap|osteopath|chiroprac|podiat|counsell|psycholog|dietit|paramedic|radiograph|allied
# matches: 1
#   "im a physiotherapist"  1 impression, 0 clicks, average position 3.0

# P6: Bing GetQueryStats, https://www.medicalaccounts.co.uk, pulled 2026-08-26
# total site-level queries: 648
# same regex
# matches: 0
```

One impression, no clicks, on a query that is not an accountancy query and that this page will not
target. **Nothing to preserve, no redirect, no protected query.** Criterion 7.2 sets equity
preservation at **0 queries**, a pass by construction. Recorded rather than rounded to zero,
because "absence of data is a question, not a finding" and this particular one is genuinely
absence.

---

## 3. The market's keyword set

### 3a. There is no keyword set. That is section 3.

Zero distinct accountancy keywords in the profession family, across 39,296 harvested competitor
rows and 259 seeded ideas (section 1a). This is the first pack in the programme with an empty
section 3, and it is stated plainly rather than padded with adjacent terms to look full.

### 3b. What that changes about how the page is written

- **Section 7.1 cannot list required exact phrases derived from volume data, because there are none.** It instead requires the two head terms the live SERP proves are commercial, which is the next-best evidence available and is labelled as such.
- **V1's two-word-orders cap is not the binding constraint here; V6 is.** With no keyword pressure at all, the risk is not over-placement, it is a writer inventing vocabulary to fill a section that has no vocabulary. Nothing goes in that does not sit as natural English.
- **V2 matters more than usual.** With no keyword set, the temptation to narrate what people search is higher. It stays out.

### 3c. The two head terms, and why they are the target despite reporting zero volume

`accountants for physiotherapists` and `accountants for therapists` each return a full, contested,
UK-firm-dominated top 10 with five firms running dedicated pages. Search engines do not build
those SERPs for terms nobody searches. The terms are the target on SERP evidence, not on volume
evidence, and section 8 sets the expectation accordingly: **the test is presence on the phrase,
never a traffic number**, because no honest traffic number can be forecast from a zero.

---

## 4. Competitor teardown

Fetched 2026-08-26 per P7. Status codes recorded; nothing dropped.

### 4.1 `https://btbaccountants.co.uk/accountants-for-therapists/` — HTTP 200, **~3,711 words**

**The strongest page in the cluster and the one to beat.** Heading tree:

- Accountants for Therapists and Counsellors
- Trusted Accounting for Mental Health Professionals
- Supporting Self-Employed Therapists
- Claiming Expenses for Therapy and Counselling Work
- Accountancy Expertise / Complete Accuracy / Time Saving
- Understanding Business Structure and Growth Options
- Managing Irregular Income and Variations
- Clear Accounting Support for Private Practice Therapists
- Support for Counsellors, Psychotherapists and Mental Health Professionals
- A Personal, Confidential Approach to Your Accounting
- Frequently Asked Questions

**The finding, and it is the page's whole opportunity.** 3,711 words addressed squarely at
counsellors and psychotherapists, with a heading on business structure and a heading on irregular
income, and **not one heading on VAT**. The audience it names is precisely the audience VAT Notice
701/57 §2.2 excludes from exemption, and the page does not mention it. The single most expensive
fact in this reader's life is missing from the market's best page.

### 4.2 `https://www.livingstonesaccountants.co.uk/blog/opening-a-physiotherapy-clinic-in-the-uk-accounting-tax-regulation-guide/` — HTTP 200, ~2,521 words

The other real content competitor, and structurally the better page. Headings: Regulation &
Professional Requirements, Choosing the Right Location & Clinic Setup, Insurance for Physiotherapy
Clinics, Tax & Accounting Considerations, Sole Trader or Limited Company?, **VAT Rules for
Physiotherapy**, Software & Financial Systems, Staffing Payroll & Compliance, Cash Flow Pricing &
Growth, Common Mistakes Clinic Owners Make, Checklist Before Opening.

It has the VAT section this cluster needs, and it is scoped to **opening a clinic**, which is a
different intent from "I already practise and need an accountant". It is also visibly a
template: the same site publishes taxi-driver, nursery, charity and pharmacy variants of the same
outline, and its own sidebar advertises "Business Accountants (555)". Beatable on specificity and
on the fork, not on length.

### 4.3 `https://www.ainsworth-healthcare-accountants.co.uk/` — HTTP 200, ~1,145 words homepage

An exact-match specialist micro-brand, "Accounting and Tax Services for Healthcare Professionals",
holding **top-3 positions on `accountants for osteopaths`, `accountants for chiropractors` and
`chiropractor accountant uk`** from a homepage. Its content pages are generic self-employment
explainers (`/self-employed-accounting-and-tax/cash-basis/`, `/class-2-national-insurance/`,
`/class-4-national-insurance/`, `/making-tax-digital-mtd/`, `/what-expense-claims-are-allowed/`,
`/our-guide-to-the-hmrc-tax-payments-on-account-system/`). `/what-expense-claims-are-allowed/`
(HTTP 200, ~1,320 words) is titled for healthcare professionals but is a generic allowable-expenses
list with a Capital Items section. **A brand ranking on its name, with no profession-specific tax
content behind it.** The most directly winnable domain in the set.

### 4.4 `https://broadreachaccountancy.co.uk/` — HTTP 200, ~773 words homepage

Cornwall chartered firm, fixed-fee cloud accounting, holds top-4 on three allied-health head terms
from a 773-word homepage with headings like "So, what do we do? Well, quite a lot actually…".
No allied-health content of any kind. Same shape as 4.3, weaker.

### 4.5 `https://www.thepeloton.co.uk/` — ranks on 3 head terms; both guessed sector slugs **HTTP 404**

`/accountants-for-physiotherapists/` and `/sectors/physiotherapists/` both 404. Its real ranking
URL was not recovered from the harvest. **Flagged as a gap, not dropped.** A later pass should take
the URL from the SERP payload rather than guessing at slugs.

### 4.6 `https://gmprofessionalaccountants.co.uk/2024/09/vat-exemptions-on-medical-private-healthcare-in-the-uk-what-you-need-to-know-for-2024/` — HTTP 200, ~1,282 words

The only competitor page in either cluster that engages the exemption directly. Headings: What
counts as VAT exempt medical care, When VAT does apply to private healthcare, The importance of
"medical purpose" in VAT exemption, Common VAT mistakes in private healthcare, Mixed services in
healthcare practices, HMRC expectations, FAQs.

**Two findings.** First, it is competent on the primary-purpose test and is the nearest thing to
competition for C2 (was O20). Second, its URL says `2024/09` and `for-2024` while its H1 and title now say
**"for 2026"**: the page has been date-swapped without a visible rewrite. Framing condition 4
applies with force. Take nothing numeric from it.

### 4.7 `https://www.rsbc.uk/who-we-work-with/health-and-well-being/accountants-for-fitness-wellbeing` and `/accountants-for-locum-doctors-nurses-and-pharmacists` — in harvest

Sector landing pages on the same AI-templated pattern described in the opticians pack §4.5. The
locum page bundles doctors, nurses and pharmacists on one URL, which is the same one-page-serves-
three-professions pattern `gorillaaccounting.com` uses and which
`competitor_universe_2026-08-26.md` §4 already records. Not a content competitor.

### 4.8 `https://www.hawsons.co.uk/sectors/healthcare-medical-accountants/physiotherapists/` — **HTTP 404**

Recorded. Batch 2 finding B established hawsons is reachable with a browser user agent, so this
404 is a genuine missing page, not a block. Hawsons ranked on `accountants for physiotherapists`
from a different URL that was not recovered. Flagged.

### 4.9 The classification, which is what the task asked for

| Domain | Class | Evidence |
|---|---|---|
| btbaccountants.co.uk | **Generalist with a sector page**, NEW, and the content leader | 3,711-word therapists and counsellors page; 4 head terms |
| livingstonesaccountants.co.uk | **Generalist with a sector page**, NEW | 2,521-word physiotherapy clinic guide, template-driven; 2 head terms |
| ainsworth-healthcare-accountants.co.uk | **Specialist firm** (healthcare micro-brand), NEW | 4 head terms, top-3 on three of them, homepage only |
| broadreachaccountancy.co.uk | **Generalist**, NEW | 4 head terms, homepage only, zero cluster content |
| thepeloton.co.uk | **Generalist with a sector page**, NEW, URL unrecovered | 3 head terms |
| accurus.co.uk | **Specialist firm** (healthcare), NEW, shared with the opticians cluster | 4 head terms across both clusters, homepage only |
| e-accounts.co.uk | **Generalist**, NEW, shared with the opticians cluster | 4 head terms across both clusters |
| gmprofessionalaccountants.co.uk | **Generalist with a sector page**, NEW | Ranks via a healthcare VAT post; the nearest C2 (was O20) competitor |
| xeinadin.com | **National brand**, NEW | Top-1 on `accountants for therapists` and `accountants for private therapy practice`. Not harvested: a national roll-up whose ranked-keyword profile would be almost entirely irrelevant at 1,000 rows. Deliberate omission, stated |
| hawsons.co.uk, kudosaccounting.co.uk, medicsmoney.co.uk, forvismazars.com, sial-accountants.co.uk, pricebailey.co.uk | **Existing §2a peers and §2b non-peers** appearing on `accountants for private practice allied health` | Confirms the cluster sits inside the existing universe's reach, it just has no pages in it |
| designatedmedical.com, aims.co.uk, leonandcompany.co.uk, apexaccountants.tax, cruseburke.co.uk, knowleswarwick.com, amaccountex.co.uk, vanillaonlineaccountancy.co.uk, gmprofessionalaccountants.co.uk | **Generalists, one or two appearances** | Harvested where cheap; no allied-health content found in any |
| joinheard.com, practiceoftherapy.com, cocountant.com, tldraccounting.com, srjca.com, physioaccountant.com.au, cleartax.com.au | **Foreign**, excluded | US and AU. Their presence in a UK top-10 is the demand-thinness signal in 1a |
| reddit.com, youtube.com | **UGC**, excluded | Same signal |
| dentists-side and pharmacy-side domains | **Sibling-site territory**, excluded | See 6c |

**Universe delta:** `btbaccountants.co.uk`, `livingstonesaccountants.co.uk`,
`ainsworth-healthcare-accountants.co.uk`, `thepeloton.co.uk`, `broadreachaccountancy.co.uk` and
`gmprofessionalaccountants.co.uk` are genuine competitors for lane 14 and are absent from
`sites/medical.discovery.json`. **Not changed by this pack.**

---

## 5. Whitespace

### 5a. Candidate (a): the statutory-register fork. **GENUINELY UNCLAIMED, AND IT IS THE PAGE.**

The market's best page for counsellors (4.1, 3,711 words) has no VAT heading. The market's best
page for physiotherapists (4.2) has a VAT heading but is scoped to opening a clinic and does not
draw the contrast. Nobody puts the two sides next to each other. Verified at source 2026-08-26:

- **VAT Notice 701/57 §2.1** lists the qualifying professions and requires that they be "enrolled or registered on the appropriate statutory register". Physiotherapists, podiatrists, dietitians, occupational therapists, orthoptists, paramedics, radiographers, speech and language therapists, arts therapists, practitioner psychologists, prosthetists and orthotists are named through the Health Professions Order 2001. Osteopaths and chiropractors are named separately.
- **VAT Notice 701/57 §2.2**, verbatim: *"Therapists such as acupuncturists, psychotherapists, hypnotherapists and others who do not have statutory registers as described in section '2.1 Meaning of a health professional' cannot currently exempt their services."*
- **VAT Notice 701/57 §2.3**, both conditions verbatim: *"The services are within the profession in which you're registered to practice"* and *"The primary purpose of the services is the protection, maintenance or restoration of the health of the person concerned."*
- **VAT Notice 701/57 §2.5**: services outside the exemption include those not aimed at preventing, diagnosing, treating or curing disease, and administrative work such as countersigning passport applications and character references.
- Statutory basis: **VATA 1994 Schedule 9 Group 7**, Items 1 to 3.

The commercial consequence, which is the sentence the reader came for: a registered
physiotherapist's fees are exempt and the VAT registration threshold is largely irrelevant to
their clinical income, while an unregistered psychotherapist's fees are standard-rated and
crossing the threshold means either absorbing 20% or raising prices 20%. **Nobody in this market
says that.**

### 5b. Candidate (b): the primary-purpose test as it bites allied health. **HALF-CLAIMED (4.6).**

Registration is necessary, not sufficient. A registered physiotherapist doing sports massage for
performance rather than for health, or a report for an insurer rather than for treatment, is
outside §2.3's second condition even though they are on the register. 4.6 covers the principle
generically for private healthcare; nobody applies it to this profession. Take it as a section,
not as the spine, and keep it inside C2 (was O20)'s boundary: this page owns the register test, not the
general exemption mechanics (O17).

### 5c. Candidate (c): the multi-disciplinary clinic. **UNCLAIMED.**

A clinic employing or hosting both a physiotherapist and a counsellor makes exempt and taxable
supplies from the same premises, which is a partial-exemption problem. Verify the partial-exemption
mechanics at source before writing beyond one paragraph, and hand the mixed-supply valuation
question to C1 (was O19) with a link rather than explaining apportionment here.

### 5d. Candidate (d): associate and room-rental arrangements. **UNCLAIMED, and flagged as ungrounded.**

The room-rental model is near-universal in this sector and raises employment status, and whether
a room licence is exempt or opted to tax. **`house_positions.md` holds no verified position on
either.** Recommended as a signposted question, not an answer, until ground truth exists. Do not
let a writer improvise it.

### 5e. What we deliberately do NOT take

- The uniform, laundry and subscription relief. O7, hard fence, and the live page already names physiotherapists and other therapists explicitly.
- Apportionment method mechanics. C1 (was O19).
- Practice sale and goodwill. O16, and there is no measured demand.
- Anything about NHS Agenda for Change bands or NHS employment terms. Wrong reader for a page about private practice, and the corpus has no verified ground truth on it.

---

## 6. Our current position

### 6a. What the page inherits

- `/blog/healthcare-accountants-uk` is the O15 hub and is the natural inbound link.
- `/blog/nhs-uniform-tax-relief-laundry-allowance` already serves this audience's most-searched relief and is the outbound link under O7.
- `/blog/accountants-for-vets-veterinary-practice-tax` is the closest structural sibling: a non-doctor healthcare profession with no NHS pension and a different VAT answer. **Read it before writing, then do not reuse its wording.** V5 and V9: the tic to avoid is not a phrase, it is the shape "the rest of this site assumes X, but you are not X", which the vets page already runs.

### 6b. What it must NOT inherit. Factual, not stylistic, and this is the pack's biggest risk.

1. **NHS pension.** A privately practising physiotherapist, osteopath, chiropractor or counsellor is **not** accruing NHS pension on that income. An NHS-employed physiotherapist is an ordinary employed member of the scheme on their NHS pay, on the same footing as any other NHS employee, and is not a "practitioner" member the way a GP is. The permitted treatment is one sentence drawing that distinction and a link to `/nhs-pension` under O18. **No annual allowance mechanics, no Scheme Pays, no tiered contribution table, no McCloud.** Those are O2, O4 and O1 and they belong to other pages, and for most of this page's readers they are irrelevant.
2. **The NHS contract.** No Global Sum, no QOF, no PCN, no ARRS, no PCSE, no Statement of Financial Entitlements, no GMS or PMS. Where an allied-health professional has NHS work it is through employment, an AQP-style arrangement or a sub-contract, and none of it resembles a GP contract. Naming any GP contract mechanism on this page is a hard fail (F6).
3. **VAT.** Do not carry the corpus's default that healthcare is exempt. For roughly half of this page's audience it is not, and saying otherwise would be a serious error published to readers who would act on it.
4. **"Doctor" vocabulary.** No consultant, no locum GP, no NHS trust, no appraisal, no revalidation. The reader is a clinician, not a doctor, and the words are not interchangeable.

### 6c. The sibling-site boundary, confirmed

Verified 2026-08-26 by direct inspection:

```
ls <site>/web/content/blog | grep -Ei "optic|optom|physio|therap|osteo|chiro|podiat|counsel|psych|allied"
grep -rliE "optician|optometrist|physiotherapist|osteopath|chiropractor" <site>/web/content/
  dentists   -> 1 file, cosmetic-vs-therapeutic-dental-vat-principal-purpose.md
  pharmacies -> 0 files
  care       -> 0 files
```

**Allied health is medical's ground and no sibling holds any of it.** Three fences the writer must
respect:

- **Dentists.** `dental therapists` and `dental hygienists` are named in VAT Notice 701/57 §2.1 alongside the allied-health professions, and `livingstonesaccountants.co.uk` runs a `/product/dental-therapist-accountants/` page. **They belong to the `dentists` site.** This page's profession list stops before the dental professions, exactly as `competitor_universe_2026-08-26.md` §4 vetoes `dental and medical accountants` as a head term.
- **Dental VAT.** The `dentists` site already holds `cosmetic-vs-therapeutic-dental-vat-principal-purpose.md`, which is the same §2.3 primary-purpose test applied to dentistry. Different site, different profession, no ownership conflict, but do not import its framing and do not cross-link to it as though it were ours to route to.
- **Pharmacies and care.** Pharmacists and pharmacy technicians are also in §2.1, and care staff are the `care` site's audience. Neither is named as an audience of this page.

Boundary in one line, extending `competitor_universe_2026-08-26.md` §4: **medical owns the
clinician, the practice and the NHS pension, plus the not-yet-built opticians, vets, therapists
and nurses ground; dentists, pharmacies and care own their own professions, and the fact that a
profession appears next to ours on HMRC's §2.1 list does not transfer it to us.** Lane 14
`allied_health` was created empty for exactly this cluster so the hole would be measurable
(`lane_map_2026-08-26.md`: our 0 versus competitor max 3, ratio 0.00, and the lane is listed as
ownable at competitor max share 25%). This page is the first row in it.

---

## 7. Deterministic acceptance criteria

### 7.1 Required phrases: **2**, and they are SERP-derived, not volume-derived

There is no keyword set (section 3a), so these are justified on live SERP evidence and the
justification is stated rather than implied:

1. `accountants for physiotherapists`
2. `accountants for therapists`

**No third.** V1 caps the idea at two word orders and there is no data supporting a third anyway.
`accountants for osteopaths`, `accountants for chiropractors` and `chiropractor accountant uk` are
**reported as unplaced**, with the note that all three return the same three-domain top-3 and are
therefore the same idea in different profession nouns.

### 7.2 Equity preservation: **0 queries**

Net-new page, empty register (section 2). Pass by construction.

### 7.3 Protected elements

None. No existing page is edited.

### 7.4 Arithmetic that must recompute

If a threshold example is used, it must reconcile: turnover over the rolling twelve months, the
registration threshold current at publication **taken from `house_positions.md` or from gov.uk, not
from a competitor**, and the 20% consequence expressed both as absorbed margin and as a price rise.
QA recomputes. If `house_positions.md` holds no verified threshold figure, the example is written
without a threshold number rather than with a guessed one.

### 7.5 Statutes and sources to re-verify at source before publication

| Claim | Source | Verified in this pack |
|---|---|---|
| Exemption requires enrolment on a statutory register | VAT Notice 701/57 §2.1 | Yes, 2026-08-26 |
| Which professions are on the §2.1 list | VAT Notice 701/57 §2.1 | Yes |
| Acupuncturists, psychotherapists and hypnotherapists cannot exempt their services | VAT Notice 701/57 §2.2, quoted verbatim in 5a | Yes |
| Both conditions: within the registered profession; primary purpose is protection, maintenance or restoration of health | VAT Notice 701/57 §2.3, verbatim | Yes |
| Non-exempt examples: passport countersigning, character references | VAT Notice 701/57 §2.5 | Yes |
| Practitioner psychologists are HCPC-registered; psychotherapists are not | VAT Notice 701/57 §2.1 versus §2.2 | Yes |
| **VATA 1994 Sch 9 Group 7 Item 1 exact statutory wording** | legislation.gov.uk | **NO. The fetch returned a paraphrase. Read it at source before quoting. Do not quote it from this pack** |
| **Partial exemption mechanics for a mixed clinic** | VAT Notice 706 | **NO. Not verified here. Keep to one paragraph or verify first** |
| **VAT registration threshold current at publication** | gov.uk or `house_positions.md` | **NO. Not verified here. Hard fail if guessed** |
| **Whether room licences to associates are exempt or opted** | Not verified | **NO. 5d. Signpost only** |

### 7.6 The floors, made countable

| # | Criterion | Test |
|---|---|---|
| F1 | Both required phrases in 7.1 present | grep, case-insensitive |
| F2 | No unplaced phrase from 7.1 present | grep, must return 0 |
| F3 | The page states, in terms, that some of its audience is exempt and some is not, and names at least three professions on each side | manual |
| F4 | `701/57` and `Schedule 9 Group 7` both cited | grep |
| F5 | **No HCPC, GOsC, GCC, CSP, BACP, UKCP or GMC fee amount anywhere.** No Global Sum, no QOF point value | grep for `£` adjacent to those tokens, must return 0 |
| F6 | **None of `Global Sum`, `QOF`, `PCN`, `ARRS`, `PCSE`, `Statement of Financial Entitlements`, `GMS`, `PMS`, `revalidation`, `appraisal` appears** | grep, must return 0 |
| F7 | O7 fence: no flat-rate figure, no `EIM32712`, no List 3 explanation beyond one sentence | grep for `125` and `EIM`, manual read |
| F8 | O2/O4/O1 fence: no annual allowance mechanics, no Scheme Pays, no tiered contribution table, no McCloud | grep, must return 0 |
| F9 | C1 (was O19) fence: `apportionment` explained in at most one sentence, with a link | manual |
| F10 | Dental professions are not addressed as an audience (6c) | grep for `dental therapist`, `dental hygienist`, must return 0 as audience terms |
| F11 | V2: no keyword narration | grep + manual |
| F12 | V5 and V9: no rhetorical construction more than twice; `it is not ... it is ...` at most once; the vets page's "the rest of this site assumes" shape not reused | manual |
| F13 | No figure sourced from a competitor page | manual, every figure traced |
| F14 | No threshold figure unless traced to gov.uk or `house_positions.md` (7.4) | manual |

### 7.7 Named factual requirements

- Name the **Health Professions Order 2001 / HCPC**, the **General Osteopathic Council** and the **General Chiropractic Council** as the registration bases.
- Quote or closely paraphrase §2.2's exclusion of acupuncturists, psychotherapists and hypnotherapists, attributed to VAT Notice 701/57.
- State both §2.3 conditions, and say that registration alone is not enough.
- State that practitioner psychologists are on the register and psychotherapists are not.
- State once that a privately practising allied-health professional does not accrue NHS pension on private income, then link to `/nhs-pension`.

---

## 8. Stated expectation

Written before the work.

### 8a. The commitment, stated honestly

One net-new page on a cluster with **zero measured search volume** and a live, contested,
five-firm SERP. This is a coverage build under the owner's 2026-08-26 instruction, not a
demand-led build, and it is the first page in the programme where that is true. The expectation
below is set accordingly: it tests **presence**, never traffic.

### 8b. The measurement reality

Baseline is 1 of 220 GSC query rows (a non-commercial query at 1 impression) and 0 of 648 Bing
queries. Google indexes ~16% of this domain's URLs. There is no forecastable number here and none
is offered.

### 8c. Bing, 14 days after deploy

**Target: the page is in the Bing index.** Any impression on any phrase counts. Zero impressions
at 14 days is normal and is not a failure.

### 8d. Bing, 28 days

**Target: at least one impression on a phrase containing `physiotherapist`, `therapist`,
`osteopath` or `chiropractor` together with an accountancy token.** One impression is a pass. This
is a deliberately low bar because the honest prior is zero, and setting a higher one would be
inventing a number the data cannot support. Traffic rising while those phrases stay missing is a
**FAIL** and is recorded as drift.

### 8e. Google, 28 to 90 days

The head terms are held by **peers**, not institutions, which makes Google structurally open here,
unlike most of this corpus. **No numeric target.** The observation to record at 90 days is whether
the page is indexed, and whether any of the five dedicated-page competitors moved.

### 8f. Failure trigger, as a number, before the work

**If at 90 days the page has zero impressions on both engines across every phrase in 8d, the
conclusion is that the cluster's demand is genuinely below the floor at which a page can be found,
and the recommendation is: keep the page for coverage, add nothing, and never expand the cluster.**
No revert: a net-new page with no equity is not reverted for underperformance.

**The counter-trigger, and it matters as much.** If the page produces impressions on unregistered-
therapist VAT phrases, the fork in 5a is the demand and the cluster's second page is a dedicated
VAT-for-counsellors page. That is the only evidence that would justify expanding this cluster.

### 8g. Brand-risk read at 90 days

Framing condition 5. If enquiries arrive from readers the practice cannot serve, record it. Also
check whether the page's impressions are UK: the SERP leaks US and AU results (1a) and a page that
attracts US therapists is not serving a UK lead-gen brand.

### 8h. Spend

Shared with the opticians pack. Combined actual DataForSEO spend for the unblocking run, from
`api_cost_log` via `CostTracker`: **$1.146** (from $4.9565 to $6.1025 on 2026-08-26), against a
$1.50 authorisation and a temporarily raised $7.00 guard. 10 SERPs $0.0200, 18 `ranked_keywords`
harvests $0.9869, 2 `keyword_ideas` seeds $0.1391. Every call through `CostTracker.guard()`.

### 8i. No monitor is created by this pack

No `monitored_pages` row, no tripwire, no cron, no email.

---

## 9. Corrections and deltas

1. **`packs/BATCH2_INDEX.md` §7 is out of date for this cluster.** Its diagnosis was right: the gap was in the competitor set, not the market. Six domains run allied-health surfaces and none was in our 22. Its price estimate of ~$1.13 was accurate; actual for both clusters was $1.146.
2. **`C2_PLACEMENT.md` row 22's "cluster 3-5" sizing at 50 volume is not supported.** Recut to one page. The true measured volume is **0**, and the case for building rests on SERP evidence plus the coverage instruction, not on volume. Row 22's containment of 0.13 was, if anything, generous.
3. **This is the first pack in the programme with an empty section 3.** If more coverage clusters land in this state, the pack template needs an explicit "no keyword set" branch rather than each pack improvising one. Recommended for the §9.5 template, not changed here.
4. **DataForSEO's UK `keyword_ideas` generator drifts off-profession when seeded with allied-health accountancy terms**, returning `taxi driver accountants` and `accountants crewe`. Anyone reading section 1a's 189-row accountancy count as cluster demand would be badly wrong. Recorded as an instrument limitation.
5. **Six domains should be added to `sites/medical.discovery.json` `competitors`** for lane 14 (listed in 4.9). Not changed here.
6. **`xeinadin.com` was deliberately not harvested** despite holding position 1 on two head terms: a national roll-up whose 1,000 highest-volume keywords would be almost entirely irrelevant, at the same price as a specialist. Stated so the omission is not mistaken for an oversight.
7. **Two competitor URLs are unrecovered 404s** (`thepeloton.co.uk` sector slug, `hawsons.co.uk/sectors/healthcare-medical-accountants/physiotherapists/`). Flagged, not dropped.
8. **Nothing outside `docs/medical/packs/` was written.** No commit, no deploy, no IndexNow, no config change, no edit to `Medical/web/`, `house_positions.md` or any blog file.
