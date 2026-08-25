# PACK farm-tax-uk-guide (N2, rural/landed-estates cluster)

Net-new page pack, assembled 2026-08-21 from `briefs/property/rural-estates/DOSSIER.md` (frozen
scope) and its named source files. Follows `docs/_engines/REWRITE_PROGRAM.md` §9.5, 8 sections in
reading order.

## 1. Target and permission level

- **Page:** NET-NEW, slug **`farm-tax-uk-guide`** (fixed, do not vary)
- **URL:** `/blog/property-types-and-specialist-tax/farm-tax-uk-guide`
- **Category:** `property-types-and-specialist-tax` (confirmed live category)
- **Middleware map entry required.** Add to `SLUG_TO_CATEGORY_MAP` in `Property/web/src/middleware.ts`:
  ```ts
  "farm-tax-uk-guide": "property-types-and-specialist-tax",
  ```
- **Grade:** NET-NEW. Full freedom, subject to the writer-constraint boundary below.
- **THE WRITER CONSTRAINT COMES BEFORE THE CONTENT PLAN, because it is a scope wall, not a style
  note.** DOSSIER.md §1 records the owner-approved concession: herd basis, farmers' averaging,
  BPS/SFI, agricultural tenancy law, natural capital, farm accountancy services are OUT OF SCOPE.
  This page is titled "farm tax" and will attract search intent for all of the above. **Writing full
  coverage of any conceded topic breaches the owner-approved scope** (EXPANSION_PROPOSAL_2026-08-21,
  ruled, do not re-litigate). The page's job is to be the property-tax half of "farm tax", not the
  operations half, and to say so honestly rather than pretend the operations half doesn't exist.
  - **Herd basis** — one signpost sentence only ("herd basis valuation is a specialist farm-accounting
    election; a farm accountant handles this"). No mechanics, no election detail, no examples.
  - **Farmers' averaging** — one signpost sentence only. Note for context, not for writing: saffery
    holds `farmers averaging` and `farmers averaging rules` at p3 on its own dedicated page
    (`/insights/articles/farmers-profit-averaging-can-you-benefit/`) — a specialist competing there
    is not this page's job, and DOSSIER.md §2 screening already excluded the keyword cluster as
    conceded-scope.
  - **BPS/SFI (Basic Payment Scheme / Sustainable Farming Incentive)** — one signpost sentence only.
  - **Agricultural tenancy law** — one signpost sentence only. Note: `agricultural tenancies act
    1995` / `agricultural holdings act 1995` are excluded from the ledger as conceded-scope
    (landlordzone.co.uk p27); do not attempt them here or link them as a covered topic.
  - **Farm accountancy services generally** — no promotional framing, no "we are farm accountants"
    claim (we are not; PropertyTaxPartners is a property-tax specialist).
- **Fixed constraints:** the slug above; the category above; zero em-dashes; UK English; no pricing.

## 2. Equity register

**ZERO.** Net-new page, no prior Google or Bing equity. Nothing to protect.

## 3. The market's keyword set

Source: `ledger.csv` (2026-08-21 harvest). **Verbatim-in-our-copy: no, for every row.**

**Primary targets** — the farm-tax-overview family (DOSSIER.md §2: "farming taxation / farm tax
overview" consensus cluster, 2,810 vol/mo, 1,090 peer-winnable, 2 domains):

| Keyword | Vol/mo | Best peer pos | Peer domain |
|---|---:|---:|---|
| farm tax | 1,000 | p25 | saffery.com |
| farm taxes | 1,000 | p36 | rossmartin.co.uk |
| farming taxation | 1,000 | **p10** | rossmartin.co.uk |
| tax for farmers | 480 | p32 | saffery.com |
| farmers tax | 480 | — | ideas source, no position data |
| taxation of farmers | 480 | p50 | dnsassociates.co.uk |
| farming tax uk | 210 | p22 | saffery.com |
| farm tax uk | 210 | p42 | ukpropertyaccountants.co.uk |
| farmers tax uk | 140 | — | ideas source, no position data |
| tax farming | 140 | p49 | dnsassociates.co.uk |
| do farmers pay tax | 50 | p36 | dnsassociates.co.uk |
| do farmers pay taxes | 50 | p34 | dnsassociates.co.uk |

**Honesty check on "nobody owns it":** `farming taxation` (1,000/mo) has rossmartin sitting at
**p10** — a peer already holds a top-10 slot. This is the strongest single term in the primary
table and it is not unowned. DOSSIER.md's peer-winnable figure (1,090) already accounts for this;
the pack does not repeat the "nobody holds top-10" claim for this row. Rossmartin's page is a
paywalled reference (`_language_spec.md` §4, W3 pattern: "Subscribers, click here for your detailed
guide") — the opportunity is depth a paywall can't supply, not an empty SERP.

**Boundary keywords — signpost only, NOT primary metaTitle/H1 targets.** These belong to the
in-scope spine (SDLT and CGT on agricultural land) that the page must acknowledge and link out from,
per the task's explicit boundary: full coverage of either would duplicate ground this page is not
meant to own.

*SDLT on agricultural land* (dnsassociates holds this cluster at p3-p7 — see §4 for the H2 study):

| Keyword | Vol/mo | Best peer pos | Peer domain |
|---|---:|---:|---|
| agriculture land stamp duty | 210 | p3 | dnsassociates.co.uk |
| agricultural land stamp duty | 210 | p3 | dnsassociates.co.uk |
| stamp duty agricultural land | 210 | p5 | dnsassociates.co.uk |
| stamp duty for agricultural land | 210 | p5 | dnsassociates.co.uk |
| stamp duty on agricultural land | 210 | p7 | dnsassociates.co.uk |
| stamp duty on farms | 70 | p5 | dnsassociates.co.uk |
| is there stamp duty on agricultural land | 50 | p4 | dnsassociates.co.uk |

*CGT on farmland sales* — task instruction: "link protaxaccountant-held topic", not a target to
compete on directly (protaxaccountant already sits p7-p19, near-incumbent strength):

| Keyword | Vol/mo | Best peer pos | Peer domain |
|---|---:|---:|---|
| cgt on agricultural land | 110 | p7 | protaxaccountant.co.uk |
| agricultural land capital gains tax | 110 | p15 | protaxaccountant.co.uk |
| capital gains tax agricultural land | 110 | p11 | protaxaccountant.co.uk |
| capital gains tax farm land | 110 | p13 | protaxaccountant.co.uk |
| capital gains tax on agricultural land | 110 | p19 | protaxaccountant.co.uk |
| capital gains tax on farm land | 110 | p17 | protaxaccountant.co.uk |
| capital gains tax on agricultural land calculator | 70 | p8 | protaxaccountant.co.uk |

*Ambiguous, low-priority tail* — `rates on agricultural land` (260/mo, p11, saffery.com): intent is
unclear from the phrase alone (could mean business-rates exemption for agricultural buildings, or a
rental-rate query). Not assigned to any specific H2; treat as low-priority signpost text only, do
not build a section around it without verifying searcher intent at write time.

## 4. Competitor teardown extracts

**dnsassociates.co.uk `stamp-duty-land-tax-on-agricultural-land`** (the SDLT page holding the
boundary-keyword cluster above at p3-p7): **NOT in the teardown files** (`_teardown_saffery.json`
and `_teardown_oldmill.json` cover only saffery.com and om.uk — see `_teardown_notes.md` §"Hubs
found"). Marked **keyword-harvest only, H2s unavailable** — do not invent its heading structure.

What IS available from a named source (`_language_spec.md` §1, its measured-table row W4, and §2's
quoted answer patterns — a different source from the teardown JSON, cited separately): word count
1,545; **7 of 15 headings are complete reader questions** (highest question-heading share of any
winner in the cluster); "you" 18.8/1,000 words (second-highest in the set); statute 0.0/1,000
words; 1 table; **5 FAQs**. Three headings are quoted verbatim in `_language_spec.md` P3: "Do you
pay Stamp Duty Land Tax on agricultural land?", "How much stamp duty land tax will you have to pay
on agricultural land?", "Can you claim Stamp Duty Relief on agricultural land?". These three are
quoted fragments from the language spec's pattern analysis, not a confirmed full H2 list — treat
them as evidence of shape (question-headed, second-person, no statute), not as a heading inventory
to copy.

**protaxaccountant.co.uk `agricultural-land-and-cgt`** (the CGT page to link, not compete with):
also **not in the teardown files**, **keyword-harvest only, H2s unavailable**. Measured data
available from `_language_spec.md` (its row W7): word count 3,684 (longest in the winner set); 32
headings, only 2 question-shaped; Flesch 27.6 (lowest of the "winner" set, i.e. hardest to read);
"you" 10.9/1,000; statute 0.8/1,000; 1 FAQ block. Named **do not copy** in `_language_spec.md` §4:
32 headings on 3,684 words, US spellings ("Utilizing ISAs"), off-topic advice ("Bed and ISA
Strategy", "Charitable Donations") and a liability-disclaimer close. Its first sentence is however
the pattern to imitate for this page's own CGT signpost paragraph: *"The simple answer is, No,
agricultural land in the UK is not automatically exempt from Capital Gains Tax (CGT), but there are
specific conditions and reliefs that can significantly reduce or defer the tax liability for
landowners."* — reader's yes/no first, qualification in the same sentence (`_language_spec.md` P1).

**Contrast, do not copy (`_language_spec.md` §4, B2):** om.uk's `/sectors/farming/` hub is
service-labelled, not question-labelled ("Specialist Farming Knowledge & Expertise"), Flesch 23.9
(lowest measured in the whole cluster), zero pound figures and zero percentages in 484 words on a
tax page, and closes on office addresses. It is the do-not-copy model for what "farm tax" content
looks like when it drifts into firm-about-us framing instead of answering the query.

## 5. Ours, side by side

n/a — net-new page. Nearest existing pages, for differentiation:

| Slug | Current title |
|---|---|
| `agricultural-relief-for-inheritance-tax-key-benefits` | "Agricultural Property Relief for Inheritance Tax: The Qualification Gate and the £2.5m Cap from April 2026" |
| `iht-april-2026-bpr-apr-cap-property-impact` | "April 2026 BPR/APR £2.5m Cap: Property Investor Impact" |
| `maximising-business-relief-to-reduce-inheritance-tax` | "Maximising Business Relief to Reduce Inheritance Tax" |

All three are IHT-only. None covers CGT, SDLT or income tax on farmland at all. This page is the
one place in the cluster where a reader gets the whole property-tax picture for a farm in one page
(IHT position stated briefly with links out to the three above for depth; CGT, SDLT, income tax and
diversification each get their own honest section). Do not let this page re-derive the IHT cap
arithmetic in full — one paragraph plus a link to `iht-april-2026-bpr-apr-cap-property-impact` and
to N1 (`inheritance-tax-on-farms`) is enough; the depth lives on those two pages.

## 6. Whitespace

- **No competitor in the tracked set writes one page spanning IHT + CGT + SDLT + income tax for a
  farm, bounded honestly at the operations line.** Saffery and rossmartin each write single-topic
  adviser pages; dnsassociates and protaxaccountant each own one tax head (SDLT, CGT respectively)
  and are silent on the others.
- **The conceded-topic signpost sentences themselves are whitespace**, done honestly: no tracked
  competitor states "we don't cover BPS/SFI, here's who does" — they either ignore the topic
  entirely (leaving the reader wondering) or (om.uk) blur into an about-us farm-accounting pitch.
  One honest sentence per conceded topic is a differentiator, not a weakness, provided it is exactly
  one sentence and does not become a mini-guide.
- **Income tax on let farmland treated as property income, in consumer language**, is not written
  anywhere in the tracked set at all.

## 7. Acceptance criteria

1. **Register** (per `_language_spec.md` §3, "Consumer decision pages" row — this exact row lists
   `taxation of farmers` and `agricultural SDLT` as its example keywords, which is this page's own
   keyword set): 15+ second-person address per 1,000 words, statute at 0-1 references per 1,000
   words, 900-1,600 words, **W4 shape**: question H2s plus a short FAQ block repeating the same
   questions.
2. **Named keywords placed**: `farm tax`, `farming taxation`, `tax for farmers` (or `taxation of
   farmers`) appear in metaTitle/H1/an H2/FAQ/body. SDLT and CGT boundary keywords from §3 appear
   naturally in their respective signpost sections, not forced into the metaTitle or H1.
3. **The five conceded-topic sentences present, each exactly one sentence, no elaboration**: herd
   basis, farmers' averaging, BPS/SFI, agricultural tenancy law — plus the general "not a farm
   accountancy service" framing. QA fails the page if any conceded topic runs to a second sentence
   or a sub-heading.
4. **SDLT section**: states the general position that agricultural land purchases are subject to
   SDLT (or LTT/LBTT where relevant) with property-specific detail, and links to the dedicated
   SDLT-on-agricultural-land ground once it exists in our corpus; does not attempt the full
   dnsassociates-style depth (rates table, worked example) — that is a candidate for its own future
   net-new page from the delta list, not this page's job.
5. **CGT section**: states the general position (agricultural land is not automatically exempt from
   CGT; APR/BPR relate to IHT not CGT; PPR and rollover relief may apply in specific circumstances)
   in 1-2 short paragraphs, then links out. Explicitly does NOT attempt protaxaccountant's depth.
6. **IHT section**: one paragraph stating the £2.5m combined allowance exists (house_positions
   §15.4, effective 20% above it), then mandatory links to `inheritance-tax-on-farms` (N1) for the
   consumer explainer and `iht-april-2026-bpr-apr-cap-property-impact` for the adviser depth. Do not
   duplicate either page's worked example here.
7. **Zero em-dashes, UK English, no pricing.**
8. **Middleware map entry present** before or with the content commit.
9. **All four §4 floors**: arithmetic (any IHT/CGT/SDLT figure stated matches house_positions
   ground truth); statute (0-1/1,000 words, per the consumer-decision register band); links (to the
   three §5 siblings plus the SDLT/CGT competitor-held topics named as external or internal links per
   point 4/5); coverage (the primary keyword table from §3 represented in body/FAQ).

## 8. Expectation + failure trigger

- **90-day read** (DOSSIER.md §9).
- **Success:** impressions on `farm tax`, `farming taxation`, `tax for farmers` / `taxation of
  farmers`, and the page holding a position better than rossmartin's paywalled p10 on `farming
  taxation` specifically (the one keyword in this page's set where a peer already ranks top-10 —
  the honest test of whether open content beats a paywall).
- **Page-level failure trigger:** if this page shows zero impressions on the primary keyword family
  (§3) by the 90-day read, the page failed. Additionally: if the page has visibly grown a section on
  any conceded topic beyond its one-sentence signpost by the 90-day review (drift, not a ranking
  failure), that is a scope-discipline failure to flag regardless of ranking outcome.
