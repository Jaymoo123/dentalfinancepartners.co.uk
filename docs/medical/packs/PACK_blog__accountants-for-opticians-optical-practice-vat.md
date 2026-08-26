# §9.5 RESEARCH PACK: /blog/accountants-for-opticians-optical-practice-vat

Cluster: **C2_PLACEMENT.md row 20, "Opticians / optometrists"**, ABSORB -> `medical`.
Written 2026-08-26 as **coverage-cluster addendum item 1**, against the unblocking run described in section 0.
Naming note: a concurrent task owns `BATCH3_INDEX.md` and the `PACK_B3_*` family. These two packs are
NOT part of that batch. **Its ownership map at `BATCH3_INDEX.md` §6 is additionally binding on this page**
where it touches the same facts, and must be reconciled before writing.
This pack replaces the "cannot be packed" ruling in `packs/BATCH2_INDEX.md` §7 for this cluster.

Format follows batch 1 and batch 2: eight numbered sections in fixed order, then corrections
and deltas. Binding rules V1 to V9 live in `docs/medical/language_spec_2026-08-26.md` and are
not restated here except where a criterion makes one countable.

---

## 0. Provenance: every number in this pack carries the command that produced it

This cluster was unpackable on 2026-08-26 morning because no domain in the 22-domain competitor
universe runs an optician page. The fix was discovery first, harvest second. Guard raised to
$7.00 for this task only via `DATAFORSEO_ABORT_AT=7` on the invoking command; no config file was
edited and the default remains $5.00.

| # | What | Command |
|---|---|---|
| P1 | Live SERPs, 10 head terms, dual mode | `optimisation_engine.clients.serp_provider.fetch_serp(q, num=10, site_key="medical")`, all 10 returned `provider_used="dual"` |
| P2 | Competitor harvest, 18 domains, no volume floor | `DataForSEOClient.ranked_keywords(site_key="medical", domain=<d>, limit=1000)` then `persist_ranked_keywords(...)` into `dataforseo_competitor_data` |
| P3 | Independent demand read, not competitor-derived | `DataForSEOClient.keyword_ideas(["accountants for opticians","optometrist accountant","optical practice accounts","opticians tax"], site_key="medical", limit=700)` -> 700 ideas |
| P4 | Term-family slice of the harvest | full page-through of `dataforseo_competitor_data` where `site_key='medical'` (39,296 rows after this harvest, 32,872 before), regex `optician\|optometr\|ophthalm\|optical\|eye ?(test\|care\|clinic)\|spectacle\|dispensing` over `ranked_keyword`, then a second regex `accountant\|accounting\|accounts\|tax\|bookkeep\|vat\|payroll\|self.?assess\|limited company\|sole trader\|expenses\|allowance\|invoic\|ir35\|mtd\|hmrc\|financ` |
| P5 | Our own Google baseline | `searchanalytics().query(siteUrl="sc-domain:medicalaccounts.co.uk", body={"startDate":"2026-05-28","endDate":"2026-08-26","dimensions":["query"],"rowLimit":25000})` via `GSCQueryFetcher("medical").gsc_client` -> **220 query rows** |
| P6 | Our own Bing baseline | `BingQueryFetcher("medical").client.get_query_stats("https://www.medicalaccounts.co.uk")` -> **648 queries**, pulled 2026-08-26 |
| P7 | Competitor teardown fetches | `curl -sL --compressed -A "Mozilla/5.0 ... Chrome/126.0.0.0 Safari/537.36"`, HTTP status recorded per URL in section 4 |

**Paged reads are a trap and it bit this pack once.** A first pass through
`dataforseo_competitor_data` incremented the offset by the requested `limit` (10,000) rather than
by rows actually returned. PostgREST caps a page at 1,000, so the loop skipped nine tenths of the
table and returned 4,000 rows and **zero** family matches. Every count below comes from the fixed
loop (`off += len(page)`), which returns 39,296. Anyone re-deriving these numbers must page by
returned length.

Spend: see section 8h.

---

## 1. Target and permission level

**Page:** `/blog/accountants-for-opticians-optical-practice-vat`, NET-NEW.
**Permission level:** net-new file, no existing page touched, no redirect, no collapse.
**Revert path:** delete one new file, `Medical/web/content/blog/accountants-for-opticians-optical-practice-vat.md`. Nothing else changes.
**Blast radius:** one new URL in the sitemap. No existing page loses a query, because no existing page holds one (section 2).

### 1a. SIZING: the niche map says 3-5 pages. The evidence supports ONE. This is a required finding.

`C2_PLACEMENT.md` row 20 records "cluster 3-5" at 50 volume, containment 0.32, C1 CLEAR. That
sizing was set under the coverage-over-selection rule with no keyword data at all, and it is now
measurable.

| Instrument | Result |
|---|---|
| Harvest (P4), optician term family | **17 rows**, of which **11 carry accountancy vocabulary**, collapsing to **5 distinct keywords / 350 combined monthly volume** |
| Those 5 keywords, in full | `vat on eye tests` (70), `eye test vat` (70), `is there vat on eye tests` (70), `vat on spectacles` (70), `is there vat on spectacles` (70) |
| Where they rank | Every accountancy row but one points at **one URL**: `https://sial-accountants.co.uk/services/vat-for-opticians/` (positions 5, 5, 5, 10, 16). The exception is `pricebailey.co.uk/blog/vat-cosmetic-procedures/` at position 72 on `vat on eye tests` |
| Independent demand read (P3), 700 optician ideas | **1** carries accountancy vocabulary: `private opticians`, 170/mo, and that is a consumer term about going private, not an accountancy term |
| The other 699 | Retail and navigational: `boots opticians` 246,000, `asda opticians` 60,500, `opticians` 40,500, `optometrist` 27,100, `marks and spencer opticians` 22,200, `specsavers opticians` 4,400. Profession-family volume totals **708,890/mo and essentially none of it is addressable by an accountant** |

**Ruling: ONE page, and it is a VAT page.** Every measurable keyword in this cluster is one idea
(is there VAT on eye tests and spectacles) in five word orders. Under V1 that idea may be placed
in **two** word orders on one page. Three to five pages would need three to five ideas and there
is one. A second page would be built on zero measured demand while the first page's own demand
went unspent, which is the shape V1 exists to prevent.

**Coverage is still the strategy, and one page delivers it.** Owner instruction 2026-08-26:
low volume is not a reason to skip a niche. It is not being skipped. 350/mo of exact-match
technical demand with the incumbent sitting at position 5 on a 906-word page is a better target
than most of what batch 2 shipped.

**The alternative is on the record if the owner prefers breadth to depth:** a hub plus two
satellites (optical practice VAT, locum optometrist tax, buying and selling an optical practice).
It is not recommended, because the second and third pages have **zero** measured search demand in
either instrument and would dilute the one page that has some.

### 1b. THE OWNERSHIP MAP ROWS THAT BIND THIS PAGE

Carried in full from `packs/BATCH2_INDEX.md` §4 so a writer cannot break them without reading them.

| # | Shared fact | Owner | What THIS page does |
|---|---|---|---|
| O3 | Adjusted net income, the £100,000 to £125,140 taper, the 60% band | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | One sentence and a link, if at all. A practice-owning optometrist can hit it; that is the whole of what this page may say |
| O7 | Flat-rate uniform and laundry relief, professional subscriptions under ITEPA 2003 s.343 / List 3 | `/blog/nhs-uniform-tax-relief-laundry-allowance` | **Do not touch.** That page already names the £125 healthcare group. One sentence and a link maximum |
| O8 | Claiming employment expenses: P87, self-assessment route, four-year limit, repayment-agent warning | `/blog/nhs-uniform-tax-relief-laundry-allowance` | One sentence and a link |
| O9 | GMC annual retention fee: deductible, **amount UNVERIFIED** | `house_positions.md` §8, §10 | **Hard fail F5 extends here: no GOC retention fee figure, no ABDO or AOP subscription figure, may be printed on this page.** Deductibility may be stated. An amount may not |
| O14 | "What a healthcare accountant does", the national commercial pitch | `/blog/healthcare-accountants-uk` | This page does not pitch nationally and does not add city vocabulary |
| O15 | Audience descriptions for vets, nurses, **allied health and opticians** inside the hub | The hub **routes only** | `/blog/healthcare-accountants-uk` already ships the sentence "Opticians and similar independent healthcare businesses share some of the same ownership ground." **This page is the handoff target for that sentence.** V4: the hub must not grow an optician section, and this page must not become a second hub |
| O16 | Practice-ownership economics shared with the rest of the corpus: goodwill, associate versus principal, incorporation, partnership accounts | The existing GP and private-practice corpus | One sentence and a link for the shared shape. Write only what is genuinely optical-specific |
| O17 | VAT: healthcare exemption versus standard rating, the liability principle | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` | **See the C1 (was O19) amendment immediately below.** This page does not re-explain what the exemption is |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link. See the hard warning in section 6 about what that sentence may and may not assert |

**C1 (was O19), NEW, and it is what makes this page possible.** O17 as written would leave this page with
nothing, since the page's entire commercial core is VAT. The split is clean and it is a real
legal split, not a drafting convenience:

- **O17 keeps LIABILITY.** What the Group 7 exemption is, which supplies are exempt, the primary-purpose test in general. `/blog/gp-vat-registration` owns it.
- **C1 (was O19) gives THIS PAGE VALUATION.** How a single charge covering an exempt supply and a taxable supply is split: VATA 1994 s.19(4), separately disclosed charges under s.19(2), the full-cost apportionment method, and the fact that HMRC approval of a method has not been required since 1 October 2020. No page in the corpus holds this and it is not a GP problem.

This page gets **one sentence plus a link** for the liability principle, then works entirely in
valuation. The dentists site holds an adjacent page (`cosmetic-vs-therapeutic-dental-vat-principal-purpose.md`)
on the same statutory test applied to dentistry; different site, different profession, no conflict,
but do not import its framing wholesale.

### 1c. FRAMING CONDITIONS. Hard acceptance criteria, not guidance.

1. **The reader is not an NHS employee and is probably not in the NHS Pension Scheme.** Every default this corpus has is wrong for them. See section 6.
2. **GOS is not GMS.** An optical practice's NHS work is a General Ophthalmic Services contract under s.117 NHS Act 2006, paid through PCSE as sight-test fees and optical vouchers. It is not a Global Sum, there is no QOF, there are no PCN or ARRS mechanics. Any sentence that reads across from the GP contract is a factual error.
3. **The practice is a retailer as well as a clinic.** Stock, margin on frames and lenses, and a shop lease are ordinary parts of this reader's life and are foreign to the rest of the corpus.
4. **No figure may be lifted from a competitor page.** Batch 2 finding C: the competitor layer on this site's clusters is stale, and three competitor pages gave three different values for one flat rate. Primary source or nothing.
5. **Brand risk read at 90 days**, per the batch-2 condition. This page puts a retail-adjacent audience on a healthcare-accountancy brand. If it attracts consumer traffic asking whether they pay VAT on their own glasses, that is a mis-targeting signal and is recorded, not celebrated.

### 1d. Regulatory position of the reader

- Optometrists and dispensing opticians register with the **General Optical Council** under the Opticians Act 1989. Registration is what unlocks the VAT exemption (section 4 of this pack, VAT Notice 701/57 §2.1).
- An optical practice may be owned by a non-registrant, unlike some other clinical professions. The registrant carries the clinical duty; the business carries the tax.
- GOS work sits under NHS England, administered by **PCSE**, which is a name this corpus already uses in a GP context. Reusing it without saying which contract is meant would be the single easiest way to mislead this reader.

---

## 2. Equity register

**Empty, and this is the finding, not a gap in the research.** The page is net-new and nothing on
this site currently ranks for anything in the cluster.

```
# P5: GSC, sc-domain:medicalaccounts.co.uk, 2026-05-28 to 2026-08-26, dimensions ["query"]
# total query rows: 220
# regex optic|optom|ophthalm|spectacle|eye test  (case-insensitive) over the query
# matches: 0

# P6: Bing GetQueryStats, https://www.medicalaccounts.co.uk, pulled 2026-08-26
# total site-level queries: 648
# same regex
# matches: 0
```

Nothing to preserve. No redirect. No protected query. Section 7.2 sets the equity-preservation
criterion at **0 queries**, which is a pass by construction and is stated so the QA step does not
go looking for one.

---

## 3. The market's keyword set

### 3a. What actually exists, in full

Five distinct keywords, 350 combined monthly volume, one idea. Reproduced whole because it is
short enough that summarising it would hide the point.

| Keyword | Volume | Best observed position | Domain | URL |
|---|---:|---:|---|---|
| `vat on eye tests` | 70 | 5 | sial-accountants.co.uk | `/services/vat-for-opticians/` |
| `eye test vat` | 70 | 5 | sial-accountants.co.uk | `/services/vat-for-opticians/` |
| `is there vat on eye tests` | 70 | 5 | sial-accountants.co.uk | `/services/vat-for-opticians/` |
| `vat on spectacles` | 70 | 10 | sial-accountants.co.uk | `/services/vat-for-opticians/` |
| `is there vat on spectacles` | 70 | 16 | sial-accountants.co.uk | `/services/vat-for-opticians/` |
| `vat on eye tests` | 70 | 72 | pricebailey.co.uk | `/blog/vat-cosmetic-procedures/` |

### 3b. What does not exist, stated so nobody re-runs this

- **No `accountants for opticians` keyword row exists in the harvest at any volume.** The SERP for that term is live and competitive (section 4), so the term has demand below DataForSEO's UK reporting floor, or the volume is attributed to a variant. Do not write "there is no demand for accountants for opticians"; write nothing about it, and target the VAT idea.
- **No optometrist-tax, optical-practice-sale, GOS-income or locum-optometrist keyword row exists** in 39,296 harvested rows or in 700 seeded ideas.
- **The profession vocabulary is owned by retail.** `boots opticians` at 246,000/mo is the shape of this niche's search volume. An accountancy page competing for optician vocabulary generically is competing with Specsavers' store finder.

### 3c. The V1 allocation, computed before writing

One idea. Two word orders permitted. **Required phrases: 2** (section 7.1). The remaining three
word orders are **reported as unplaced**, not squeezed in. This is the uniform-cluster lesson from
batch 2 applied before the fact rather than after.

---

## 4. Competitor teardown

Fetched 2026-08-26 per P7. Status codes recorded; nothing dropped.

### 4.1 `https://sial-accountants.co.uk/services/vat-for-opticians/` — HTTP 200, ~906 words

**The incumbent, and the only page in the market holding the target keywords.** Heading tree:

- VAT for Opticians / VAT Services for Opticians
- Maximise Your Optical Practice's Profits with Expert VAT Guidance
- VAT for Opticians
- Business Relationships / Clear Communications / Friendly Service / Specialist accountants
- FAQ's about VAT for Opticians
  - What VAT rate applies to optical services?
  - Can opticians reclaim VAT on business purchases?
  - How should VAT be handled for sales of non-prescription sunglasses?
  - What are the implications of not complying with VAT regulations in an optical practice?
  - Are there any VAT planning strategies that can improve the financial health of an optical practice?

**Finding, and it is the whole opportunity.** This is a **906-word service page with a five-item
FAQ**, ranking at position 5 on five keywords. Four of its nine headings are trust boilerplate
("Friendly Service"). It does not contain the words apportionment, s.19(4), separately disclosed
charges, Leightons or Eye-Tech. It asks "what VAT rate applies to optical services" and does not
answer the only question that matters commercially, which is how you split one till receipt
between an exempt dispensing fee and standard-rated frames.

### 4.2 `https://sial-accountants.co.uk/services/accountants-for-opticians/` — HTTP 200, ~895 words

Sister service page. Headings are Final Accounts & Tax Returns, Bookkeeping Payroll and VAT,
Incorporation and Secretarial Services, Other Services, plus testimonial and FAQ furniture. No
optical-specific tax content. This is what a service page looks like when it has nothing to say.

### 4.3 `https://sial-accountants.co.uk/self-assessment-tax-returns-for-opticians/` — HTTP 200, ~866 words

Their only optician blog post. Headings: Report All Income Sources, Claim Allowable Expenses, Keep
Well-Organised Records, File Your Tax Return on Time, Common Challenges, Why Choose SIAL, FAQs.
Four generic self-assessment tips with an optician noun in front. Titled "Your 2023/24 Guide" and
**still live in August 2026**, which is a staleness signal and a competitive opening, and is also
exactly the trap framing condition 4 forbids us from copying figures out of.

### 4.4 `https://www.pricebailey.co.uk/industries/healthcare/opticians/` — HTTP 200, ~1,105 words

A national top-30 firm's sector page. Headings: The challenges that the optical industry face,
**VAT for opticians**, Why Price Bailey is the right choice, services list. It has a VAT section,
which is why it is the second domain in the harvest, but it ranks at position **72** on
`vat on eye tests` from a different URL (`/blog/vat-cosmetic-procedures/`). Brand strength, not
page strength. Not winnable on brand; entirely winnable on the specific question.

### 4.5 `https://www.rsbc.uk/who-we-work-with/health-and-well-being/accountants-for-dental-and-healthcare` — HTTP 200, ~2,670 words

The longest page in the optician SERP set and the least useful. Headings include "AI-Powered
Practice Setup & HMRC Support", "AI-Enhanced Bookkeeping Services", "AI-Driven Tax Returns",
"AI-Monitored Annual Returns", plus a "Source & Pricing Reference" block linking out to vatcalc.com
and RossMartin. It is an SEO surface, not an advisory page, and it is not optician-specific at all.
It also **crosses the dentists boundary** in its own title, which is a reminder that our siblings'
ground is being farmed by generalists and that we do not follow them there (section 6c).

### 4.6 `https://www.accurus.co.uk/` — HTTP 200, ~1,067 words

Ranks on four of the ten head terms but has **no optician page**. `/sectors/opticians/` returns
**HTTP 404**. It ranks on homepage authority as "Specialist Accountants for Healthcare
Professionals". Classification matters here: this is a specialist firm with zero cluster content
holding SERP slots, which is the cheapest kind of competitor to displace.

### 4.7 `https://www.yorkshiremedicalaccountants.co.uk/` — HTTP 200, ~869 words

Homepage only, Leeds-focused, generic medical. Ranks on three optician head terms with no optician
content whatsoever. Same shape as 4.6.

### 4.8 `https://www.emaccountancy.co.uk/opticians/` — **HTTP 404**

Recorded as a flagged gap, not dropped. The domain held three optician head-term positions in the
live SERP but the guessed slug does not resolve; its ranking URL was not recoverable from the
harvest. If a later pass wants it, take the URL from the SERP payload rather than guessing.

### 4.9 The classification, which is what the task asked for

| Domain | Class | Evidence |
|---|---|---|
| sial-accountants.co.uk | **Specialist firm** (medical and dental), already §2a peer #2 | 3 dedicated optician URLs, holds all 5 target keywords |
| pricebailey.co.uk | **National brand** with a sector hub, already §2a peer #5 | `/industries/healthcare/opticians/`, ranks on brand |
| rsbc.uk | **Generalist with a sector page**, NEW | 2,670-word AI-templated healthcare page, no optician content |
| accurus.co.uk | **Specialist firm** (healthcare), NEW | 4 head terms, homepage only, `/sectors/opticians/` 404 |
| yorkshiremedicalaccountants.co.uk | **Specialist firm** (medical, regional), NEW | 3 head terms, homepage only |
| emaccountancy.co.uk | **Generalist with a sector page**, NEW, unverified | 3 head terms, page not resolvable |
| aop.org.uk | **Institution**, non-peer | Association of Optometrists. Ranks on 2 head terms. Citation target, not a rank target, same status as aisma.org.uk in `competitor_universe_2026-08-26.md` §2b |
| djh.co.uk | **Sibling-site territory**, excluded | Ranks on 3 optician head terms as a dental brand. Belongs to the `dentists` universe per §2c. We do not chase it |
| e-accounts.co.uk, fusionaccountants.co.uk, tajaccountants.co.uk, mlaaccounting.co.uk | **Generalists, one appearance each** | Not harvested beyond the ranked-keyword pull; no optician content found |

**Universe delta:** four domains should be added to `sites/medical.discovery.json` `competitors`
if the owner wants the config to match reality — `accurus.co.uk`, `rsbc.uk`,
`yorkshiremedicalaccountants.co.uk`, `emaccountancy.co.uk`. **Not changed by this pack**; config
edits are outside its permission level. Recorded in section 9.

---

## 5. Whitespace

### 5a. Candidate (a): apportionment of a single charge. **GENUINELY UNCLAIMED. This is the page.**

Not one competitor page in section 4 contains the word apportionment. The market's best page
(4.1) ranks at position 5 by asserting that dispensing is exempt and stopping. Verified at source
2026-08-26:

- **VATHLT2190** (HMRC VAT Health manual): exempt elements are "Measuring and fitting - includes the fees in relation to the fitting of safety spectacles", "Further professional advice", "Follow up action", "Producing a report on the condition of the patient's eye(s)". Standard-rated elements are "Sale of spectacles, frames and lenses", "Spectacle repairs", "Accessories, e.g. spectacle cases and chains".
- **VATHLT2170**: "the charge for spectacles or contact lenses will include an exempt dispensing element and a taxable supply of goods making an apportionment necessary."
- **VATHLT2190** again, on why: "as a result of the High Court decisions in Leightons and Eye-Tech in the late 1990s, dispensing (i.e. the measuring and fitting) is now accepted as a separate supply from the goods (frames and lenses) and is moreover exempt when performed by either an optometrist or a dispensing optician."
- **VATVAL12360**: s.19(4) VATA 1994 "demands a 'proper attribution' of value between any supplies that are made in return for a single charge", and "section 19(4) does not apply where Separately Disclosed Charges are being operated. In that instance section 19(2) applies."
- **VATVAL12360**: "Any method may be used, but it must be attributable to verifiable data, and based on an accurate representation of the business practices of the individual optician." Prior HMRC approval of a method has not been required since **1 October 2020**.
- **VATVAL12420 / 12460 / 12400**: background, a suggested full-cost apportionment method, and a worked example.

### 5b. Candidate (b): the business decision, apportionment versus separately disclosed charges. **UNCLAIMED.**

VATVAL12360: it is a business decision which route an optician takes and **HMRC has no preference**.
That is a genuine advisory fork with a cash consequence, it is stated by HMRC in terms, and no
accountancy page in this market mentions it exists. It is the single sharpest thing this page can
say.

### 5c. Candidate (c): non-prescription sunglasses and accessories. **HALF-CLAIMED.**

4.1 asks the question in an FAQ. Treat as a short section, not a spine, and answer it properly
from VATHLT2190's standard-rated list rather than restating the FAQ.

### 5d. Candidate (d): the three contrasts with the rest of this site. **UNCLAIMED BY ANYONE, AND UNIQUELY OURS.**

No competitor holds these because no competitor has a doctors corpus to contrast with. See
section 6b for exactly what they are and why a writer's default gets each one wrong.

### 5e. What we deliberately do NOT take

- The `accountants for opticians` service-page term. That is a commercial page's job, and O14 puts the national commercial pitch on `/blog/healthcare-accountants-uk`.
- Practice valuation and sale. O16 keeps it with the existing corpus; optical-specific goodwill has no measured demand and no verified ground truth in `house_positions.md`.
- Anything about consumer eligibility for a free NHS sight test. Wrong audience, and it is the mis-targeting risk framing condition 5 exists to watch.

---

## 6. Our current position

### 6a. What the page inherits from the existing corpus

- `/blog/healthcare-accountants-uk` already ships the routing sentence naming opticians (verified in `Medical/web/content/blog/healthcare-accountants-uk.md`). That sentence becomes a link to this page. **The hub is not otherwise edited by this batch.**
- The private-practice and incorporation family gives the shared ownership shape under O16.
- `/blog/gp-vat-registration` gives the liability principle under O17, one sentence and a link.

### 6b. What it must NOT inherit. This is the V5-style failure mode for this cluster, and it is a factual one.

The corpus is 87 blog files written for doctors. A writer's defaults will be wrong three times over.

1. **NHS pension.** Do not assume this reader is in it. NHS Pension Scheme Regulations 2015 Schedule 5 para 6 lists medical practitioners as "(a) a medical practitioner; (b) a locum medical practitioner; (c) an ophthalmic practitioner", and the operative contribution provisions speak of "an ophthalmic **medical** practitioner with a GOS contract" (regs 33(6)(b) and the reg 33(7) employing-authority table). NHSBSA's own eligibility article (KA-04447) lists "a medical, dental or ophthalmic practitioner or trainee" as eligible and states that those "who are self-employed" cannot join.
   **STATUS: UNVERIFIED AT THE EDGE, and it is a hard fail to resolve it in prose.** Whether a non-medically-qualified optometrist performing GOS is an "ophthalmic practitioner" for scheme purposes was not settled at source in this pack. `nhsbsa.nhs.uk/scheme-access-self-employed-individuals` returned **403 to WebFetch and returned an "Access denied" body to curl with a browser user agent**, which is the full escalation and is recorded rather than worked around. **No sentence on this page may assert that an optometrist is, or is not, in the NHS Pension Scheme.** The permitted sentence is that the scheme's practitioner route is built around medical, dental and ophthalmic **medical** practitioners and that an optometrist should check their own position, then a link to `/nhs-pension` under O18. Criterion 7.5 makes this countable.
2. **The NHS contract.** GOS under s.117 NHS Act 2006 and the General Ophthalmic Services Contracts Regulations 2008, paid as sight-test fees and optical vouchers through PCSE. No Global Sum, no QOF, no PCN, no ARRS, no Statement of Financial Entitlements. Any of those words appearing on this page is a hard fail (7.6).
3. **VAT.** The rest of the corpus treats VAT as a question about whether a doctor's service is exempt. For this reader the liability answer is settled and the live question is valuation of a mixed supply. Do not write the GP framing.

### 6c. The sibling-site boundary, confirmed

Verified 2026-08-26 by direct inspection of the sibling corpora:

```
ls <site>/web/content/blog | grep -Ei "optic|optom|physio|therap|osteo|chiro|podiat|counsel|psych|allied"
grep -rliE "optician|optometrist|physiotherapist|osteopath|chiropractor" <site>/web/content/
  dentists   -> 1 file, cosmetic-vs-therapeutic-dental-vat-principal-purpose.md (dental, not optical)
  pharmacies -> 0 files
  care       -> 0 files
```

**Opticians are medical's ground and no sibling holds an inch of it.** `dentists`, `pharmacies`
and `care` own their own professions per `competitor_universe_2026-08-26.md` §4, and this page
does not name a dentist, a pharmacist or a care home except where a cross-link is the natural
answer. `djh.co.uk` ranking on optician terms as a dental brand is a competitor's boundary
violation, not an invitation to copy it. Lane 14 `allied_health` in
`sites/medical.discovery.json` exists precisely to hold this assigned-but-unbuilt ground as a
measurable hole (`lane_map_2026-08-26.md`: allied_health, our 0 versus competitor max 3, ratio
0.00); this page and its allied-health sibling are the first two rows that will land in it.

---

## 7. Deterministic acceptance criteria

### 7.1 Exact phrases that must appear, **2 required**

Under the V1 two-word-orders cap over one idea (section 3c):

1. `VAT on eye tests`
2. `VAT on spectacles`

**Unplaced and reported, not squeezed in:** `eye test vat`, `is there vat on eye tests`,
`is there vat on spectacles`. Three word orders, 210 combined volume, deliberately forfeited. A
writer who places any of them has broken V1.

### 7.2 Equity preservation: **0 queries**

Net-new page, empty equity register (section 2). Pass by construction.

### 7.3 Protected elements

None. No existing page is edited. The routing sentence in `/blog/healthcare-accountants-uk`
becomes a link only when the hub is next opened, which is **not in this batch**.

### 7.4 Arithmetic that must recompute

Any worked apportionment example must reconcile. The minimum shape: a single charge, a stated
cost of the goods, a stated cost of the dispensing service, a full-cost apportionment producing an
exempt fraction and a taxable fraction, and output VAT computed on the taxable fraction only, at
20%. Every figure in the example is **invented for the example and labelled as such**, per framing
condition 4. QA recomputes it.

### 7.5 Statutes and sources to re-verify at source before publication

| Claim | Source | Verified in this pack |
|---|---|---|
| Health exemption turns on enrolment on a statutory register | VAT Notice 701/57 §2.1 | Yes, 2026-08-26 |
| Optometrists and dispensing opticians are on the §2.1 list | VAT Notice 701/57 §2.1 | Yes |
| Two conditions: within the registered profession, and primary purpose is protection, maintenance or restoration of health | VAT Notice 701/57 §2.3, verbatim | Yes |
| Dispensing is a separate exempt supply; goods are standard-rated | VATHLT2170, VATHLT2190 (Leightons, Eye-Tech) | Yes |
| Exempt versus standard-rated element lists | VATHLT2190 | Yes |
| s.19(4) proper attribution; s.19(2) where separately disclosed charges operate | VATVAL12360 | Yes |
| Any method allowed if attributable to verifiable data; HMRC approval not required since 1 Oct 2020 | VATVAL12360 | Yes |
| Spectacles and contact lenses are excluded from zero-rated "qualifying goods" for disabled people | VAT Notice 701/57 §3.2.1 | Yes |
| **Group 7 Item 1 exact statutory wording** | VATA 1994 Sch 9 Group 7 on legislation.gov.uk | **NO. The fetch returned a paraphrase, not the text. The writer must read the Item 1 wording at source before quoting it. Do not quote it from this pack** |
| **Whether an optometrist is an "ophthalmic practitioner" for NHS Pension Scheme purposes** | SI 2015/94 Sch 5 para 6(c) and its definition | **NO. Blocked, escalated, recorded in 6b. Nothing may be asserted either way** |

### 7.6 The floors, made countable

| # | Criterion | Test |
|---|---|---|
| F1 | Both required phrases in 7.1 present | grep, case-insensitive |
| F2 | No unplaced phrase from 7.1 present | grep, must return 0 for all three |
| F3 | The words `apportionment` **and** `separately disclosed` both present | grep |
| F4 | `19(4)` and `19(2)` both cited | grep |
| F5 | **No GOC, ABDO or AOP fee amount anywhere**; no GMC fee, no Global Sum, no QOF point value | grep for `£` adjacent to any of those tokens, must return 0 |
| F6 | **None of `Global Sum`, `QOF`, `PCN`, `ARRS`, `Statement of Financial Entitlements`, `GMS`, `PMS` appears** | grep, must return 0 |
| F7 | No sentence asserts an optometrist is or is not in the NHS Pension Scheme | manual, adversarial QA, flagged as the pack's number-one factual risk |
| F8 | O7 fence: no flat-rate uniform figure, no List 3 explanation beyond one sentence | grep for `125`, manual read |
| F9 | O17 fence: the exemption's general mechanics get one sentence and a link, not a section | manual |
| F10 | V2: no keyword narration. No "also searched as", no variant list | grep + manual |
| F11 | V5: no rhetorical construction more than twice; `it is not ... it is ...` at most once | manual |
| F12 | Worked example recomputes (7.4) | manual recompute |
| F13 | No figure sourced from a competitor page (framing condition 4) | manual, every figure traced |

### 7.7 Named factual requirements

- Name the **General Optical Council** and the **Opticians Act 1989** as the registration basis.
- Name **PCSE** and **GOS** together, and say in one clause that this is not the GP contract.
- State the exempt and standard-rated element lists from VATHLT2190 as lists, not as prose claims.
- State that choosing between apportionment and separately disclosed charges is the practice's decision and that HMRC expresses no preference, citing VATVAL12360.

---

## 8. Stated expectation

Written before the work, so the later read has something to fail against.

### 8a. The commitment

One net-new page, targeting one idea at 350/mo combined, against an incumbent holding position 5
with 906 words and no technical content. This is a depth play on a small target, not a volume play.

### 8b. The measurement reality

Google indexes roughly 21 of 130 URLs on this domain. Bing indexes it fully and sends about 3.4x
the Google clicks. Baseline on this cluster is **0 of 220 GSC query rows and 0 of 648 Bing
queries** (section 2). Any impression is a new impression.

### 8c. Bing, 14 days after deploy

**Target: at least one impression on a phrase containing `vat` and (`eye test` or `spectacles`).**
Zero at 14 days on a low-authority domain is normal and is not a failure.

### 8d. Bing, 28 days

**Target: impressions on both required phrases from 7.1, and an average position better than 30.**
Total traffic rising while the two named phrases stay missing is a **FAIL**, recorded as drift,
per §9.6 point 2.

### 8e. Google, 28 to 90 days

The incumbent here is a **peer** (sial-accountants, §2a #2), not an institution, so unlike most of
this corpus Google is genuinely open on this cluster. That makes it worth recording. **No numeric
target is set**, because 16% index coverage makes a 28-day Google miss uninformative. The one
observation worth writing down at 90 days is whether the page is indexed at all.

### 8f. Failure trigger, as a number, before the work

**If at 28 days Bing shows zero impressions on both required phrases AND the page is not in
Google's index, the cluster's sizing is wrong and the recommendation is to leave it at one page
permanently rather than expand.** No revert applies: a net-new page with no equity is not reverted
for underperformance, it is left to mature.

### 8g. Brand-risk read at 90 days

Required by framing condition 5. Check the Bing query set for consumer intent (`do i pay vat on
glasses`, `free eye test`). More than 50% consumer intent on this page's impressions means the
page is attracting the wrong reader and the H1 is recut. Recorded either way.

### 8h. Spend, and it is this pack's share of a shared run

This pack and its allied-health sibling were unblocked by one shared run. Combined actual
DataForSEO spend for both, read from `api_cost_log` via `optimisation_engine.cost_tracker._spent_today("dataforseo")`
before and after: **$1.146** (from $4.9565 to $6.1025 on 2026-08-26), against a $1.50 task
authorisation and a temporarily raised $7.00 guard. Breakdown: 10 SERPs $0.0200, 18
`ranked_keywords` harvests $0.9869, 2 `keyword_ideas` seeds $0.1391. Every call went through
`CostTracker.guard()`. The batch-2 index priced this unblock at ~$1.13; actual was $1.146.

### 8i. No monitor is created by this pack

No `monitored_pages` row, no tripwire, no cron, no email. Registration is an owner-triggered step.

---

## 9. Corrections and deltas

1. **`packs/BATCH2_INDEX.md` §7 is now out of date for this cluster.** It records opticians as unpackable and the fix as unauthorised. The fix was authorised and run on 2026-08-26 and this pack is the result. §7's diagnosis was correct in substance: the gap was in the competitor set, not the market. Six domains run optician-facing surfaces and none of them was in our 22.
2. **`C2_PLACEMENT.md` row 20's "cluster 3-5" sizing is not supported.** Recut to one page with the evidence in 1a. Row 20's volume figure of 50 is also low: the addressable figure is 350.
3. **Four domains should be added to `sites/medical.discovery.json` `competitors`**: `accurus.co.uk`, `rsbc.uk`, `yorkshiremedicalaccountants.co.uk`, `emaccountancy.co.uk`. Not changed here.
4. **A PostgREST paging bug is now documented (section 0)** and any future re-derivation of harvest counts must page by returned length. The first run of this pack's own analysis reported a false zero because of it.
5. **`emaccountancy.co.uk/opticians/` is a 404** on the guessed slug; its real ranking URL was not recovered. Flagged, not dropped.
6. **`nhsbsa.nhs.uk/scheme-access-self-employed-individuals` is hard-blocked** to both WebFetch (403) and curl with a browser user agent ("Access denied" body). This is a different failure from the `hawsons.co.uk` user-agent block that batch 2 finding B closed. Recorded so the next agent does not spend the same escalation.
7. **Nothing outside `docs/medical/packs/` was written.** No commit, no deploy, no IndexNow, no config change, no edit to `Medical/web/`, `house_positions.md` or any blog file.
