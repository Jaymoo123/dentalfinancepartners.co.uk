# §9.5 RESEARCH PACK: /blog/nhs-pension-tax-charges-how-to-minimize

**Built** 2026-08-26. **Site** medicalaccounts.co.uk (`medical`). **Spec** `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5, §9.9, §9.10.
**Frozen scope input** `docs/medical/cluster_dossier_2026-08-26.md` (dossier freeze, §12). **Ground truth** `docs/medical/house_positions.md`.
**Peer classification** `docs/medical/competitor_universe_2026-08-26.md`. **Lanes** `sites/medical.discovery.json`.

This is preparation, not page content. Nothing under `Medical/web/` was edited. No commit, no deploy, no `monitored_pages` write, no monitor or alert created.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `/blog/nhs-pension-tax-charges-how-to-minimize` |
| Cluster / topic | `nhs tax refund / rebate` (dossier §3, topics-with-a-page table, row 4: 7 domains, 2,470 volume, 1,000 peer-winnable, 27 kws, 22 of 27 phrasings missing) |
| Lane | `nhs_pension_tax` (lane 2 of 15, `sites/medical.discovery.json`) |
| Grade | **REFRAME** (dossier §3) |
| Source file | `Medical/web/content/blog/nhs-pension-tax-charges-how-to-minimize.md` |
| **How it renders** | **Markdown file with YAML frontmatter.** The writer edits **one `.md` file**. Body is **raw HTML inside the markdown body**, not markdown syntax (see `blog_page_rendering_html_in_frontmatter`): `<p>`, `<h2>`, `<h3>`, `<ul>` are written literally. `metaTitle`, `h1`, `keyTakeaways`, `howtoSteps`, `faqs`, `summary` are **frontmatter keys**, not body headings, and the FAQ block is authored as the `faqs:` array, not as HTML. |
| Current sha | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/content/blog/nhs-pension-tax-charges-how-to-minimize.md` |

### Constraint first

**REFRAME = full rewrite permitted** against the topic keyword set in section 3: `metaTitle`, `h1`, H2s, body and `faqs` may all change. **The equity register in section 2 still binds absolutely.** This page carries live Bing equity (8 named queries, 9 impressions, **2 clicks**) and every one of those queries must still match after the rewrite. See section 7, criterion A.

**What may NOT change:** `slug`, `canonical`, `category`, the file path. Never propose a collapse, a redirect or a URL change (§5 working agreement). `image` / `imageCredit` stay as they are unless the image is broken.

### Frozen-list position

Batch 1 excludes the **16 pages with an armed `monitored_pages` window to 2026-09-10** and treats the **3 `status='flagged'` rows** as HOLD (dossier §6). **This page is on neither list**, so it is workable now.

That matters more here than on any other page in the batch, because **four of the pages this page's keyword set overlaps are frozen**: `medical-professional-expenses-what-is-claimable`, `gp-tax-deductions-complete-list-2026`, `nhs-pension-for-locums-form-a-form-b` and `nhs-pension-annual-allowance-complete-guide`. See section 7, criterion F and the corrections block.

---

## 2. Equity register (copied VERBATIM from the data sheet)

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/nhs-pension-tax-charges-how-to-minimize)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **8** | impressions 9 | clicks 2.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| as a doctor can i stop myself going over the annual allowance by contirbuting less to my pension | 2 | 1 | 3.0 |
| should i do nhs scheme pays or use my savings to pay for a pension aa tax charge | 1 | 1 | 5.0 |
| should i take 2000 off my annual nhs pension for an extra 24,0000 | 1 | 0 | 9.0 |
| nhs pension death benefit election | 1 | 0 | 19.0 |
| how much you charge off your chart grows how much you lose | 1 | 0 | 1.0 |
| can i stop my increase on my nhs pension instead of goverment taking it in tax | 1 | 0 | 8.0 |
| can i increase my nhs pension payments without being charged a fee | 1 | 0 | 5.0 |
| nhs cut off for scheme pays | 1 | 0 | 7.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

### Reading of the equity register (pack author's note, not data sheet content)

The equity is **annual-allowance and Scheme Pays equity**. Both clicks come from queries about the AA charge and Scheme Pays. Nothing in it is about a tax rebate or a pension refund. The dossier has assigned this page a topic (`nhs tax refund / rebate`) that its live demand does not reflect. **Do not swap the AA/Scheme Pays spine out for a rebate page.** The rewrite adds the refund and rebate vocabulary above and around the existing spine; it does not replace it. Two of the eight queries (`nhs pension death benefit election`, `can i increase my nhs pension payments without being charged a fee`) are not currently answered anywhere on the page and are matching on adjacent prose only, so they are the two most fragile rows in the table.

---

## 3. The market's keyword set (copied VERBATIM from the data sheet)

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
(nhs|doctor|nurse|medical).*(tax refund|tax rebate|tax back|refund|rebate)|tax refund.*(nhs|nurse|doctor)|tax rebate.*(nhs|nurse|doctor)|claim tax back|nhs pension redundancy
```

Keywords in topic: **41** | combined volume **6,830** | peer-winnable volume **840** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 5
| **Absent verbatim from this page: 41 of 41. Absent from the whole 105-page corpus: 41.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 590 | 7 | bma.org.uk | no | **no** | no | nhs pension refund form |
| 480 | 8 | bma.org.uk | no | **no** | no | nhs pension refund |
| 480 | 9 | bma.org.uk | no | **no** | no | nhs pensions refund |
| 480 | 6 | bma.org.uk | no | **no** | no | nhs refund pension |
| 320 | 15 | bma.org.uk | no | **no** | no | what can i claim tax back on |
| 260 | 33 | lanop.co.uk | no | **no** | no | claim tax back on uniform |
| 260 | 69 | taxqube.co.uk | no | **no** | no | claim tax back uniform |
| 210 | 31 | lanop.co.uk | no | **no** | no | claim tax back for washing uniform |
| 210 | 8 | bma.org.uk | no | **no** | no | nhs pension opt out refund form rf12 |
| 210 | 14 | bma.org.uk | no | **no** | no | what can you claim tax back on |
| 140 | 6 | medicsmoney.co.uk | yes | **no** | no | nhs tax rebate |
| 140 | 10 | lanop.co.uk | yes | **no** | no | nhs tax rebate for uniform |
| 140 | 17 | lanop.co.uk | no | **no** | no | nhs tax rebate uniform |
| 140 | 9 | medicsmoney.co.uk | yes | **no** | no | nhs tax refund |
| 140 | 9 | medicsmoney.co.uk | yes | **no** | no | nhs tax refund scheme |
| 140 | 9 | lanop.co.uk | yes | **no** | no | nhs tax refund uniform |
| 140 | 7 | bma.org.uk | no | **no** | no | nhs tax refunds |
| 140 | 11 | lanop.co.uk | no | **no** | no | nhs uniform tax rebate |
| 140 | 4 | lanop.co.uk | yes | **no** | no | tax rebate nhs |
| 140 | 14 | lanop.co.uk | no | **no** | no | tax rebate nhs uniform |
| 140 | 14 | medicsmoney.co.uk | no | **no** | no | tax refund nhs |
| 140 | 15 | lanop.co.uk | no | **no** | no | uniform tax rebate nhs |
| 110 | 8 | bma.org.uk | no | **no** | no | claim tax back for professional fees |
| 110 | 16 | lanop.co.uk | no | **no** | no | claim tax back for uniform |
| 110 | 9 | bma.org.uk | no | **no** | no | claim tax back on professional fees |
| 110 | 10 | bma.org.uk | no | **no** | no | claim tax back professional fees |
| 110 | 37 | lanop.co.uk | no | **no** | no | how do i claim tax back on uniform |
| 110 | 19 | lanop.co.uk | no | **no** | no | how to claim tax back for uniform |
| 110 | 27 | lanop.co.uk | no | **no** | no | how to claim tax back for washing uniform |
| 110 | 40 | lanop.co.uk | no | **no** | no | how to claim tax back on uniform |
| 90 | 24 | bma.org.uk | no | **no** | no | claim tax back for union fees |
| 90 | 5 | bma.org.uk | no | **no** | no | nhs pension redundancy |
| 70 | 14 | medicsmoney.co.uk | no | **no** | no | claim tax back for mileage |
| 70 | 12 | medicsmoney.co.uk | no | **no** | no | claim tax back mileage |
| 70 | 25 | taxqube.co.uk | no | **no** | no | claim tax back on mileage |
| 70 | 10 | bma.org.uk | no | **no** | no | nhs pension opt out and refund |
| 70 | 10 | bma.org.uk | no | **no** | no | nhs pension opt out refund |
| 70 | 11 | bma.org.uk | no | **no** | no | nhs pension refund after 2 years |
| 70 | 7 | bma.org.uk | no | **no** | no | opt out nhs pension refund |
| 50 | 22 | medicsmoney.co.uk | no | **no** | no | how many years can you claim tax back |
| 50 | 9 | bma.org.uk | no | **no** | no | nhs pension refund how long does it take |

### 3a. THE BOUNDARY RULING: which of these 41 rows belong to THIS page, and which belong to NO-PAGE row 4

**Read this before writing a single heading.** This topic's regex drags in the uniform-tax-relief vocabulary, and the dossier gives that vocabulary its own separate item: **NO-PAGE row 4, "uniform tax rebate / work uniform tax relief", 4 domains, 26,880 total volume, 1,420 peer-winnable, 108 keywords, prescription "New page or section on the expenses hub"** (dossier §4). That is a **ten times larger** topic than this page's whole set. It is not this page's to take.

The 41 rows split into seven sub-families. Volumes below are sums of the `Vol` column above; every row is accounted for once and the seven sub-totals reconcile to 41 rows / 6,830 volume.

| # | Sub-family | Rows | Volume | Verdict for THIS page |
|---|---|---|---|---|
| 1 | NHS pension refund / opt-out / RF12 | 10 | 2,570 | **PARTIAL, framing only.** See ruling 2 below |
| 2 | NHS tax rebate / refund, unqualified | 6 | 840 | **YES, this page's core new vocabulary.** All 6 peer-winnable rows are here |
| 3 | Uniform, NHS-qualified | 6 | 840 | **ONE named FAQ only.** See ruling 1 |
| 4 | Uniform, unqualified | 8 | 1,280 | **NO. Belongs to NO-PAGE row 4** |
| 5 | Professional / union fees | 4 | 420 | **PARTIAL.** See ruling 3 |
| 6 | Mileage | 3 | 210 | **NO. Belongs to NO-PAGE row 8** |
| 7 | Generic "what can I claim tax back on" | 3 | 580 | **ONE H2 with a pointer.** See ruling 3 |
| 8 | nhs pension redundancy | 1 | 90 | **YES.** Dossier NO-PAGE row 31 assigns it here explicitly |
| | **Total** | **41** | **6,830** | balances to the data sheet header |

**Ruling 1, the uniform line.** The **six NHS-qualified uniform phrasings** (`nhs tax rebate for uniform`, `nhs tax rebate uniform`, `nhs tax refund uniform`, `nhs uniform tax rebate`, `tax rebate nhs uniform`, `uniform tax rebate nhs`; 840 volume) may be carried by **exactly one FAQ entry** on this page whose answer states the flat-rate position in one or two sentences and links onward. They are NHS-qualified, so a doctor searching them lands on an NHS page legitimately. The **eight unqualified phrasings** (`claim tax back on uniform`, `claim tax back uniform`, `claim tax back for washing uniform`, `claim tax back for uniform`, `how do i claim tax back on uniform`, `how to claim tax back for uniform`, `how to claim tax back for washing uniform`, `how to claim tax back on uniform`; 1,280 volume) **must not appear on this page at all**. They are the head of a 108-keyword, 26,880-volume topic that the dossier has already prescribed elsewhere. Writing them here does three bad things at once: it annexes a topic the dossier assigned to another surface, it creates a cannibalisation pair against a page that does not exist yet, and it hangs 26,880 volume of intent off a page whose H1 is about pension tax charges.

**Say it as a rule the QA can check:** the strings `claim tax back on uniform`, `claim tax back uniform`, `claim tax back for uniform`, `claim tax back for washing uniform`, `how to claim tax back` and `how do i claim tax back` **must be absent** from the finished file. That is a countable acceptance criterion (section 7, criterion E) and it is a **negative** criterion, which is unusual and deliberate.

**Ruling 2, the refund line.** Sub-family 1 is 2,570 volume of "how do I get my NHS pension contributions back". bma.org.uk holds positions 6 to 11 across all ten rows and its page (`/refunding-your-pension-contributions`, torn down in section 4) is the definitive answer. Dossier **NO-PAGE row 14, "nhs pension refund form (RF12)", 3,600 volume, 14 kws**, prescribes that vocabulary as a **section on `/blog/nhs-pension-for-locums-form-a-form-b`, which is FROZEN to 2026-09-10**. So the mechanics (who qualifies, RF12, REF1, the two-year rule, how long it takes) are **not this page's to write**. What this page may and should carry is the **tax framing that no competitor gives**: a refund of contributions is taxed, it destroys accrual, and it is a different thing from a tax rebate even though the market uses "refund" for both. One H2, the phrase `nhs pension refund` and `nhs pension opt out refund` present, and an explicit "the form and the process are covered here" pointer. Do not reproduce the RF12 walkthrough.

**Ruling 3, the professional-fees and generic-claim line.** `claim tax back for professional fees` / `on professional fees` / `professional fees` / `for union fees` (420 volume) and `what can i claim tax back on` / `what can you claim tax back on` / `how many years can you claim tax back` (580 volume) overlap `/blog/medical-professional-expenses-what-is-claimable` and `/blog/gp-tax-deductions-complete-list-2026`, **both FROZEN to 2026-09-10**. Carry the phrasings in **one H2 plus one FAQ** that answers at summary depth (professional fees are deductible, the four-year window, the BMA and Royal College position) and links to the two frozen pages. Do not build a deduction list here. Note the house-position constraint: **the GMC annual retention fee amount is UNVERIFIED** and no page may state a figure for it (section 7, criterion D).

**Ruling 4, mileage.** `claim tax back for mileage` / `mileage` / `on mileage` (210 volume) is dossier **NO-PAGE row 8**, prescribed as a section on `/blog/gp-tax-deductions-complete-list-2026`, **FROZEN to 2026-09-10**. Not this page. Do not write a mileage section, do not state a mileage rate here.

---

## 4. Competitor teardown

**Cap applied: 10 URLs of the 16 listed at the bottom of the data sheet**, per the brief. Cap rule: the 10 highest in-topic-keyword URLs. The six dropped are all 1-keyword tails on bma.org.uk (`/pensions/additional-pensions-advice/transferring-money-out-of-the-nhs-pension-scheme`, `/pensions/retirement/redundancy-and-your-pension`, `/pay-and-contracts/tax`) plus `taxqube.co.uk/how-far-back-can-hmrc-investigate/` and `medicsmoney.co.uk/opting-out-of-the-nhs-pension-scheme/` and `taxqube.co.uk/nhs-doctors-expenses-medical-accountants/`, which each hold 1 to 2 in-topic keywords. **`bma.org.uk/pay-and-contracts/pensions/retirement/redundancy-and-your-pension` is the one dropped URL that is a real gap**, because it is the sole competitor page for the `nhs pension redundancy` row (90 volume, bma pos 5) that dossier row 31 assigns to us. It is named here rather than silently dropped.

Peer classification per `competitor_universe_2026-08-26.md`: **bma.org.uk = unwinnable-authority** (§2b, 15 of 18 head terms, "cannot be outranked on brand"). **medicsmoney.co.uk = peer, rank 1** (§2a). **lanop.co.uk = peer, rank 12** (§2a, "generalist London firm with a doctors service page"). **taxqube.co.uk = peer, rank 18** (§2a, "small generalist with a medical/healthcare industry page"). **accountants4nhsdoctors.co.uk = peer, rank 13** (§2a, "exact-match micro-brand aimed only at NHS doctors. Most directly winnable").

All 10 fetched successfully. 0 fetch failures on this page.

### 4.1 lanop.co.uk/uniform-tax-rebate-uk-guide/, 17 in-topic kws, PEER

- **Title** "Uniform Tax Rebate UK 2026: Who Can Claim & What to Expect"
- **H1** "Uniform Tax Rebate UK 2026: Eligibility, Amount, and How to Claim"
- **Words** approx 4,200. **Tables** yes, 3. **Calculator** no. **FAQ** yes, 12 questions.
- **Headings** H2 Introduction · H2 What Is a Uniform Tax Rebate? (H3 Definition / Tax Relief vs Rebate / Who It Applies To) · H2 Who Qualifies for a Uniform Tax Rebate? (H3 Eligibility Rules / Who Does Not Qualify / Quick Eligibility Checklist) · H2 What Counts as a Work Uniform? (H3 Examples: Eligible vs Not Eligible / Grey Areas) · H2 Uniform Tax Rebate Amount: How Much Can You Claim? (H3 Flat Rate Explained / Real Payout Examples / Why Amounts Seem Low / Flat Rate vs Actual Cost Claims) · H2 Step-by-Step Guide to Claiming (H3 Online Method (Fastest) / P87 Method / Self-Assessment) · H2 What Happens After You Submit? (H3 Processing / Tax Code vs Refund) · H2 How Long Does a Uniform Tax Rebate Take? · H2 Claiming for Previous Years (H3 The 4-Year Rule / Example) · H2 Common Reasons Claims Are Rejected · H2 How to Fix a Rejected Claim · H2 Uniform Tax Rebate for Specific Professions (H3 NHS Workers / Other Common Roles) · H2 Special Cases (H3 Multiple Jobs / Part-Time Workers / Agency Workers) · H2 DIY vs Using a Claims Company · H2 Uniform Tax Rebate for Employers (H3 Employer Role / Compliance) · H2 Is It Worth Claiming? · H2 Key Takeaways · H2 FAQs · H2 Conclusion
- **Judgement.** This is the single page that holds 17 of our 41 rows, and it is **not a medical page**. It is a generalist uniform-rebate guide with one H3 ("NHS Workers") aimed at us. It is structurally excellent for its intent: year in the title, flat-rate table, four-year rule with a worked example, rejection reasons, DIY-versus-claims-company. What it gets wrong for a doctor: it treats every NHS worker as a uniform claimant, it never distinguishes an employed hospital doctor from a self-employed locum or a GP partner (a partner does not file a P87 at all), and it never mentions the interaction with Self Assessment for a doctor who already files. It also never touches pension tax. **This page is the concrete proof that ruling 1 is correct: the 4,200-word uniform answer already exists and belongs on a uniform page, not on ours.**

### 4.2 bma.org.uk/pay-and-contracts/tax/tax-claim/claiming-for-professional-expenses, 10 kws, UNWINNABLE-AUTHORITY

- **Title** "Claim tax on your BMA subscription" · **H1** "Using our tax relief tool to help claim for professional expenses"
- **Words** approx 2,200. **Tables** no. **Calculator** **yes** (a member tax-relief tool behind login). **FAQ** no.
- **Headings** H2 Claim tax back on your professional expenses · H2 Eligible expenses for tax relief (H3 1. Professional memberships and subscriptions like your BMA membership / 2. Medical equipment and protective clothing / 3. Mileage and accommodation costs / 4. Training and exam fees) · H2 Simplify the claims process with our tax relief tool · H2 When to claim/large claims (H3 When to claim / Large claims) · H2 Understanding your tax code · H2 Completing the P87 tax claim form yourself · H2 You might also be interested in
- **Judgement.** The page that owns `claim tax back on/for professional fees`, `what can i claim tax back on` and `claim tax back for union fees`. Its lever is the **gated tool**, not the copy: the whole page funnels to a login. Covers the four expense categories, the tax code, and the P87. What it omits: it is written for a BMA member employee, so there is nothing for a GP partner or a self-employed locum, nothing about the four-year window in numbers, and, being a union page, it is silent on whether the BMA subscription itself is only partly allowable. **Unwinnable on brand.** Its ranking tells us the *vocabulary* is winnable, not the URL.

### 4.3 taxqube.co.uk/tax-relief-for-nhs-medical-professionals/, 9 kws, PEER

- **Title** "Tax Relief for NHS Medical Professionals | Chartered Accountants London" · **H1** "Tax Relief for NHS Medical Professionals"
- **Words** approx 1,200. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 Tax Relief for NHS Medical Professionals · H3 What can I claim an NHS tax rebate for? · H3 What can a Nurse claim a tax rebate for? · H3 How to claim your Nurses Tax Rebate · H2 Looking for a Specialist? · H3 Our Expert Team Can Help
- **Judgement.** Thin, and it ranks anyway. 1,200 words, no tables, no FAQ, and two of its six headings are sales furniture. It is majority **nurse** content wearing an "NHS medical professionals" title, which is exactly the vocabulary substitution the dossier describes in §5: the market says "NHS tax rebate" and this page says it, three times, in headings. That is the whole trick. **It is beatable on depth without effort**, and it is the clearest evidence that a peer with 1,200 words and the right words in the right headings takes these positions.

### 4.4 bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/refunding-your-pension-contributions, 9 kws, UNWINNABLE-AUTHORITY

- **Title / H1** "Refunding your pension contributions"
- **Words** approx 1,100. **Tables** no. **Calculator** no. **FAQ** no (Q-form H2s only).
- **Headings** H2 When you can have your contributions refunded · H2 When you cannot have your contributions refunded · H2 How to apply for a refund of contributions · H2 Is a refund good value for money? · H2 Can I avoid taking a refund? · H2 Pensions refund letter without having left the NHS
- **Judgement.** The page behind every `nhs pension refund` row in section 3. Names **form RF12** (England and Wales), **REF1** (Scotland), the two-year service test, the loss of all accrued benefits, and the tax on a refund. Its "Is a refund good value for money?" H2 is the right question and the right answer. **It states a refund is taxed at "20% if the refund is less than £20,000 and 50% on any amount above this level"**, that figure is a BMA statement, is not in `house_positions.md`, and **must not be reproduced by us without re-verification at source** (section 7, criterion D). Its omission is ours to take: it never connects the refund decision to the annual-allowance charge that drove the doctor to consider opting out in the first place. That is the bridge only a page like ours can build.

### 4.5 medicsmoney.co.uk/what-can-doctors-claim-tax-back-on/, 6 kws, PEER (rank 1 peer)

- **Title** "What can doctors claim tax back on? - Medics Money" · **H1** "What can doctors claim tax back on?"
- **Words** approx 1,200. **Tables** no. **Calculator** **yes** (a doctors-tax-rebate calculator is referenced). **FAQ** no formal block, but every H2 is a question.
- **Headings** H2 What can resident doctors claim tax rebates on? · H2 Is there a list of what doctors can claim tax rebates on? · H2 Find a specialist medical accountant with Medics Money · H2 How many years can I claim for? · H2 Do I need receipts? · H2 What cannot be claimed? · H2 Is it worth claiming? YES · H2 What medical school didn't teach us about money · H2 About the author · H2 Explore our top 10 blog posts here (x3) · H2 Working with
- **Judgement.** The strongest peer in the niche, and the page is **1,200 words of question-shaped H2s**. It holds `nhs tax rebate`, `nhs tax refund`, `nhs tax refund scheme`, `tax refund nhs`, `how many years can you claim tax back` and `claim tax back for mileage` from four of its own H2s. Note the register: "Is it worth claiming? YES". Direct answer in the heading. Its structural weaknesses are real: three duplicate "Explore our top 10 blog posts" H2s, an author block and a course pitch inside the article, and it is aimed squarely at **resident doctors**, so consultants, GP partners and the pension-tax population are unserved. **This is the register to match and the audience gap to take.**

### 4.6 accountants4nhsdoctors.co.uk/tax-deductions-nhs-doctors-can-claim/, 4 kws, PEER (most directly winnable)

- **Title** "Tax Deductions NHS Doctors can Claim" · **H1** "Tax advice built around the way doctors are paid."
- **Words** approx 800 of body copy, inside roughly 40 headings. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** (abridged, the full set is a service directory) H3 Tax advice built around the way doctors are paid · H2 Tax Returns (H3 Self Assessment for Doctors / Locum Doctor Tax Returns / High-Earner Doctor Tax Returns / PAYE Tax Code Review / Professional Fees Tax Relief) · H2 NHS Pension Tax (H3 NHS Pension Tax Advice / NHS Pension Annual Allowance / Scheme Pays Advice / McCloud Remedy / RPSS Review / Tax Planning for Doctors) · H2 Practice & Companies (H3 Private Practice Tax / GP & Consultant Accounts / Limited Company Accounts / IR35 Advice for Locum Doctors / MTD for Locum Doctors) · H2 HMRC & International (H3 HMRC Compliance / Tax Disclosures / Foreign Income / Returning Doctors from Abroad / Capital Gains Tax) · H2 Who We Cater For · H2 NHS & Hospital Doctors · H2 Locums, GPs & Consultants · H2 Complex Circumstances · H2 Doctor Tax Services · H2 Specialist Support · H2 Quick Links · H2 Office Locations · H2 Useful external links for doctors
- **Judgement.** **The URL promises "Tax Deductions NHS Doctors can Claim" and the page delivers a service index.** H1 does not match the title, and there is no deduction list anywhere on it. 800 words spread across 40 headings. It ranks on **exact-match domain plus slug**, nothing else. Classified in the universe as "most directly winnable", and this teardown is why: any page that actually answers the question outranks it on merit. Worth noting what it *does* signal: `Scheme Pays Advice`, `McCloud Remedy / RPSS Review` and `NHS Pension Annual Allowance` as named service lines, which corroborates that the AA/Scheme Pays spine we already have is the commercially valuable half.

### 4.7 taxqube.co.uk/how-nhs-doctors-can-claim-a-tax-rebate-in-the-uk/, 4 kws, PEER

- **Title** "How NHS Doctors Can Claim a Tax Rebate in the UK | Chartered Accountants London" · **H1** "How NHS Doctors Can Claim a Tax Rebate in the UK"
- **Words** approx 1,200. **Tables** no. **Calculator** no. **FAQ** **yes, 4 questions**.
- **Headings** H3 What Is a Tax Rebate for NHS Doctors? · H3 Types of Expenses You Can Claim as an NHS Doctor · H3 How to Claim a Tax Rebate as an NHS Doctor · H3 Tips to Maximise Your Tax Rebate · H3 Frequently Asked Questions (FAQ) · H3 Appoint TaxQube to manage your taxes
- **Judgement.** The template answer for "nhs doctor tax rebate": what it is, what you can claim, how to claim, tips, FAQ. Note the heading levels are **all H3 with no H2**, which is sloppy and does not stop it ranking. Its four FAQs (new-qualification claims, processing time, lost receipts, inter-hospital travel) are the four questions the market actually asks and **inter-hospital travel is the one genuinely doctor-specific question on any of these pages**. What it omits: no distinction between employee and self-employed doctor, no pension interaction, nothing on what happens if you already file a return.

### 4.8 medicsmoney.co.uk/doctors-tax-relief-on-mileage-and-travelling-for-work-using-own-car/, 2 kws, PEER

- **Title / H1** "Doctors tax relief on mileage and travelling for work using own car"
- **Words** approx 1,200. **Tables** **yes, 1** (approved mileage allowance rates by vehicle). **Calculator** no. **FAQ** no.
- **Headings** H2 Can I claim mileage allowance? · H2 What doctors tax relief is available on mileage? · H2 What records should I keep to claims doctors tax relief? · H2 How do I make a doctors tax relief claim? · H3 Example: · H2 About the author · H2 Explore our top 10 blog posts here
- **Judgement.** Clean, single-question page with a rates table and a worked example. **Listed here for completeness only: mileage is dossier NO-PAGE row 8 and is prescribed to a FROZEN page.** Do not use this as a template for a section on our page. Its rates table is a live staleness risk for anyone copying it: the first-10,000-mile AMAP rate rose from 45p to **55p on 6 April 2026** (`house_positions.md` §8), and a competitor table showing 45p is now historic.

### 4.9 taxqube.co.uk/mileage-tax-rebates/, 2 kws, PEER

- **Title** "Claim Mileage Tax Rebates | Chartered Accountants London" · **H1** "Claim Mileage Tax Rebates"
- **Words** approx 1,200. **Tables** **yes, 1**. **Calculator** no. **FAQ** no.
- **Headings** H2 Claim Mileage Tax Rebates · H2 Looking for a Specialist? · H3 What exactly is a mileage allowance for a car? · H3 What journeys can employees claim mileage on? · H3 Business journeys you can claim: · H3 Business journeys you cannot claim: · H3 How much is the HMRC 2022 mileage allowance? · H3 Can a company set a different mileage allowance in the UK? · H3 What if an employee uses their own car?
- **Judgement.** **Stale on its face**: an H3 reading "How much is the HMRC **2022** mileage allowance?" is still ranking at position 25 for `claim tax back on mileage` in 2026. Not medical at all. Same NO-PAGE-row-8 exclusion applies. Recorded because it demonstrates the ceiling of the competitive set: a four-year-old generalist page holds a top-30 slot on this vocabulary.

### 4.10 accountants4nhsdoctors.co.uk/professional-fees-tax-relief-for-doctors/, 2 kws, PEER

- **Title** "Professional Fees Tax Relief for Doctors | GMC & BMA Claims" · **H1** "Professional Fees Tax Relief for Doctors"
- **Words** approx 2,400. **Tables** no. **Calculator** no. **FAQ** **yes, 4 questions**.
- **Headings** H2 Get help with your fees tax relief · H2 Why doctors should review claims · H2 The claim review route · H2 Common professional costs (H3 GMC registration fees / BMA subscription / Royal College fees / Medical indemnity) · H2 What we can help with · H2 PAYE and Self Assessment (H3 Tax relief may be given through the tax code / Doctors in Self Assessment normally claim through the tax return) · H2 Important point · H2 Records needed · H2 How we work (H3 Identify fees / Check eligibility / Review tax code / Select route / Submit claim) · H2 Professional fees FAQs (H3 Can doctors claim tax relief on GMC fees? / Can I claim BMA or Royal College subscriptions? / Do I claim professional fees through PAYE or Self Assessment? / Can I claim fees from earlier years?) · H2 Need help claiming professional fees tax relief?
- **Judgement.** Much better than its sibling at 4.6. It does the one thing every other page in this set skips: **the PAYE-versus-Self-Assessment fork**, and it warns about duplication (relief already sitting in a tax code being claimed twice). Its four FAQ questions are the correct four. It never states a GMC fee figure, which is the same position `house_positions.md` forces on us. What it omits: nothing on GP partners, nothing on the pension interaction, and the whole page is a service pitch wrapped around three facts.

### 4.11 Coverage checklist: union of competitor heading themes, minus ours

Union of the 10 teardowns, deduplicated to themes, with the decision required by §9.9 floor 8. **The count of undecided themes must be zero at QA.**

| # | Heading theme | On our page now | Decision |
|---|---|---|---|
| 1 | What a tax rebate / refund actually is, and rebate vs relief | no | **COVER.** New H2. Carries `nhs tax rebate`, `nhs tax refund` |
| 2 | What a doctor can claim tax back on (the list) | no | **COVER AT SUMMARY DEPTH + POINTER.** Frozen-page overlap, ruling 3 |
| 3 | How many years you can claim for (four-year rule) | no | **COVER.** One FAQ. Carries `how many years can you claim tax back` |
| 4 | Do I need receipts / records to keep | no | **COVER.** One FAQ |
| 5 | How to claim: P87 vs Self Assessment vs tax code | no | **COVER.** This is the fork every peer half-does. Ours must name which of the four doctor roles uses which route (`house_positions.md` §1) |
| 6 | Professional fees: GMC, BMA, Royal College, indemnity | no | **COVER AT SUMMARY DEPTH + POINTER.** No GMC figure |
| 7 | Uniform / laundry flat-rate relief | no | **DECLINED WITH REASON.** NO-PAGE row 4, 26,880 volume, 108 kws, prescribed to a new page or the expenses hub. One NHS-qualified FAQ only |
| 8 | Mileage and travel between sites | no | **DECLINED WITH REASON.** NO-PAGE row 8, prescribed to `/blog/gp-tax-deductions-complete-list-2026`, FROZEN to 2026-09-10 |
| 9 | Training and exam fees | no | **DECLINED WITH REASON.** Belongs to the expenses hub / `medical-professional-expenses-what-is-claimable`, FROZEN to 2026-09-10 |
| 10 | Understanding your tax code | no | **COVER.** One paragraph inside theme 5. It is where a rebate physically arrives |
| 11 | Why claims get rejected / how to fix | no | **DECLINE.** Belongs to the uniform/expenses page, not a pension-tax page |
| 12 | DIY vs a claims company | no | **DECLINE.** Off-brand for a specialist accountancy page and adjacent to a regulated-claims-firm framing |
| 13 | NHS pension refund of contributions: when you can, when you cannot | no | **COVER, FRAMING ONLY.** Ruling 2 |
| 14 | Is a pension refund good value for money | no | **COVER, and this is ours to win.** Ruling 2 and section 5 |
| 15 | RF12 / REF1 form mechanics and timescales | no | **DECLINED WITH REASON.** NO-PAGE row 14, prescribed to `/blog/nhs-pension-for-locums-form-a-form-b`, FROZEN to 2026-09-10 |
| 16 | Opting out of the NHS pension scheme | partial (H3 "Why opting out is rarely a tax win") | **KEEP AND EXTEND.** Carries `nhs pension opt out refund`, `opt out nhs pension refund` |
| 17 | Redundancy and your NHS pension | no | **COVER.** Dossier NO-PAGE row 31 assigns it here. One H2 or one FAQ |
| 18 | The annual allowance charge itself | **yes, in depth** | **KEEP.** Section 5, KEEP-1 |
| 19 | Carry forward | **yes, in depth** | **KEEP.** Section 5, KEEP-2 |
| 20 | Taper, threshold vs adjusted income | **yes, in depth** | **KEEP.** Section 5, KEEP-3 |
| 21 | Scheme Pays, mandatory vs voluntary, deadline | **yes, in depth** | **KEEP AND FIX.** Section 6, defect 3 |
| 22 | Partial retirement as an alternative to opting out | **yes** | **KEEP.** Section 5, KEEP-4 |
| 23 | McCloud remedy and revised statements | **yes** | **KEEP.** Section 5, KEEP-5 |
| 24 | Incorporation trap on private work | **yes** | **KEEP.** Section 5, KEEP-6 |
| 25 | LTA abolition, LSA and LSDBA | **yes** | **KEEP** |
| 26 | Author / credentials block | no | **DECLINE.** Site does not use per-post author blocks |

Undecided themes: **0**.

---

## 5. Whitespace

What no competitor in this set covers well, stated so a writer can quote it back.

**W1. Nobody joins the refund question to the charge question.** bma.org.uk (4.4) explains a refund of contributions in isolation. Our page explains the annual allowance charge in isolation. **The doctor's actual question is a single question**: "my pension is costing me a tax charge, should I get out and take my money back?" Not one of the ten pages answers it end to end. The answer is a sequence and it is specific: check carry forward first, then model the taper, then Scheme Pays, and only then consider partial retirement, and a refund of contributions is at the far end of that sequence and is almost never right. **That sequence is the page.**

**W2. Nobody distinguishes the three things the market calls a "refund".** The 41 rows conflate (a) a **tax rebate**, HMRC returning overpaid income tax on deductible expenses, (b) a **refund of NHS pension contributions**, the scheme returning your contributions and cancelling your accrual, (c) **Scheme Pays**, the scheme paying a tax charge for you in exchange for a permanent benefit reduction. They have opposite consequences and the same word. A single disambiguation block near the top, using all three phrasings verbatim, is both the highest-value 150 words on the page and the cleanest way to carry sub-families 1 and 2 without annexing anything.

**W3. Nobody segments by doctor role.** Every peer writes for a salaried NHS employee. `house_positions.md` §1 gives four roles with four different routes: **GP partner** (SA800 to SA104, no P87 ever), **salaried GP** (PAYE, P87 or tax code), **locum** (SA103 sole trader, or a PSC under §1.A), **hospital consultant** (PAYE plus a private-work return). "Which of these are you" is a four-row answer no competitor gives, and it is the single most reusable specialist asset on the page.

**W4. Nobody prices the refund.** bma.org.uk says a refund is poor value and gives one tax figure. Nobody shows what a doctor gives up: CARE accrual at **1/54th** with active revaluation at **CPI + 1.5%**, death-in-service cover, ill-health protection. Our page already asserts this in prose (H3 "Why opting out is rarely a tax win"). Turning that assertion into an illustrated comparison is whitespace and it is defensible without inventing figures.

**W5. Nobody covers the Scheme Pays extension limb.** Every competitor that mentions Scheme Pays gives the 31 July deadline flat. `house_positions.md` §2.D: the deadline is **extended** where a revised pension savings statement is issued **on or after 2 May**, to the earlier of **3 months from that statement** or **6 years from the end of the tax year**, and NHSBSA statements being late and revised is "the normal case, not the exception". That is a genuinely valuable, genuinely specialist, genuinely absent fact.

### Depth on our page worth keeping, marked KEEP

- **KEEP-1** The pension-input-amount framing: the charge follows capitalised DB growth, not payslip contributions, and the drivers (pay rise, merit award, return to full time, CPI revaluation). No competitor in this set states it at all.
- **KEEP-2** The carry-forward mechanics in order: current year in full first, then earliest of the three prior years, membership required in each year, and tapered years bank less.
- **KEEP-3** The two-income-measure explanation of the taper, and specifically the lever ("keeping threshold income at or below £200,000 takes you out of the taper entirely, however high your adjusted income is").
- **KEEP-4** Partial retirement as the alternative to a blanket opt-out, with the 20% to 100% range, the 10%-for-12-months condition and the 1 October 2023 date.
- **KEEP-5** The GP-partner lag: pensionable pay derives from net NHS profit, certified on the Type 1 Annual Certificate, so a profit uplift drives an input amount a year or more later.
- **KEEP-6** The incorporation trap paired both ways: taper headroom gained, NHS accrual lost, a company cannot hold a GMS or PMS contract.
- **KEEP-7** The "Common and costly mistakes" list. Six items, all correct, all specific. Keep the block, keep the ordering.

**None of the above is traded away to make room for the rebate vocabulary.** §9.3: the specialist tail is the differentiator. The plain-language layer goes *above* the depth.

---

## 6. Our current page, read honestly

**File** `Medical/web/content/blog/nhs-pension-tax-charges-how-to-minimize.md` · **date** 2026-04-01 · **generator** `opus-4.8/track2-rewrite` · **category** "NHS Pension Planning".

- **metaTitle** "How to Reduce NHS Pension Annual Allowance Charges" (52 chars)
- **h1** "How to Minimise NHS Pension Annual Allowance Charges"
- **title** "NHS Pension Tax Charges: How to Minimize Your Tax Bill as a Medical Professional"
- **Body word count** approx 2,000 words of body prose; **2,817 words** for the whole file including frontmatter (`wc -w`).
- **Structure** 5 `keyTakeaways`, 4 `howtoSteps`, **5 `faqs`**, 9 body H2s, 5 body H3s.
- **H2 sequence** First, work out whether you have a charge at all · Step one: use carry forward before anything else · Step two: understand and manage the taper · Step three: decide whether to use Scheme Pays · Other levers, used with care (H3 Manage pensionable pay and growth, do not just react to it / Partial retirement instead of opting out / Why opting out is rarely a tax win / The incorporation trap on private work) · The lifetime allowance is gone, but lump-sum caps remain · A note for GP partners and the McCloud remedy · Common and costly mistakes · How a specialist medical accountant helps · Related reading
- **Internal links** 10 body links, all to `/blog/<slug>` flat routes plus `/contact`.

### Is it thin? No. Is it on-topic for its assigned cluster? No.

This is a **well-built page about the wrong topic**. It is a competent, correctly sequenced annual-allowance strategy page and it would survive an editorial pass unchanged. It contains **zero** of the 41 phrasings in section 3. Its own Bing equity is annual allowance and Scheme Pays. The dossier has assigned it `nhs tax refund / rebate` because it scored 48.2 on that topic against `/blog/private-practice-tax-nhs-and-private-income` at 46.9 (dossier §7), a 1.3-point margin between two pages that are both a poor fit. **The honest read is that this topic has no good host, and this page is the least-bad one.** That is why the ruling in 3a is written as tightly as it is: the correct treatment is a layer, not a repositioning.

### What is stale or wrong, checked against `house_positions.md`

| # | Location | Problem | House position |
|---|---|---|---|
| 1 | `metaDescription`, `keyTakeaways` [2] and [5], `faqs` [1], body `<li>` under "That growth is then compared with your available allowance", H2 "Step two" opening, `howtoSteps` [3] | **Year tag stale.** The page tags £60,000, £200,000 and £260,000 as **"2025/26"** throughout. The live year is **2026/27** | §2.B: every figure carries into 2026/27 unchanged; "the 2026-06-03 '2025/26' tags in §2.B were stale tags on correct numbers and have been re-tagged". **The numbers are right, the tags are wrong.** Re-tag to 2026/27, and where a page compares years say "unchanged from 2025/26" |
| 2 | `howtoSteps` [4], `faqs` [4], body H2 "Step three" bullet 3 | **Scheme Pays worked example is on the closing year, not the live one.** "a 2025/26 charge must be elected by 31 July 2027" | §2.D: "use the 2025/26-to-31-July-2027 pairing only where the page is about the year just closed". This page is a live-planning page, so the primary pairing must be **2026/27 charge to 31 July 2028**, with 2025/26 to 31 July 2027 kept as the closing-year case |
| 3 | Body H2 "Step three", bullet 3 | **The extension limb is missing entirely.** The page gives the 31 July deadline flat | §2.D: "**Always** mention the extended 3-month limb for a revised statement issued on or after 2 May, because late NHSBSA statements are the normal case, not the exception". This is a named house-position omission, not a style point |
| 4 | Body H2 "Step three", bullet 3, phrasing | "The election deadline is 31 July in the year after the following tax year" is a garbled restatement. It arrives at the right answer and is close to unreadable | §2.D / FA 2004 s.237BA: "not later than 31 July in the year following the year in which the tax year ends" |
| 5 | H3 "The incorporation trap on private work" | "**The dividend rates also rose from 6 April 2026**" is correct as a fact and correct as a rate set (10.75 / 35.75 / 39.35, allowance £500) but is written as a recent event in a sentence that reads forward-looking | §5: "the dividend-rate rise that took effect on 6 April 2026 has already narrowed it (write this as a change that has happened, not one that is coming)" |
| 6 | Whole file | **`schema: ""` is empty.** The page has `howtoSteps` and 5 `faqs` but no schema string | Not a house-position issue; flagged because the frontmatter carries HowTo and FAQ data that the renderer may or may not be emitting. **The writer must not invent a schema value; check what `buildPostHowToJsonLd` already emits before touching it.** |
| 7 | H2 "The lifetime allowance is gone..." | Correct and well-handled. LSA £268,275 and LSDBA £1,073,100 both match §2.B, and the page explicitly warns against the "£1,073,100 as a lifetime allowance" framing | No change. Noted so QA does not "fix" a correct passage |
| 8 | H2 "Step two" | "the floor has been £10,000 and the entry threshold £260,000 **since 6 April 2023**" | Consistent with §2.B. No change |

### Arithmetic on the page

Two computations, both must be re-derived at QA (see section 7, criterion C):

- **A1** "£10,000 (reached once adjusted income hits £360,000)". Check: (360,000 − 260,000) ÷ 2 = 50,000 reduction; 60,000 − 50,000 = **£10,000**. Correct at 2026/27 figures. Recompute if any input changes.
- **A2** The carry-forward illustration: input exceeds allowance by £30,000, £35,000 of unused allowance banked across three prior years, so £30,000 carried forward and **no charge**. Check: 35,000 ≥ 30,000, residual 0. Correct. Note it is written as a general illustration, not as a named client, which is the right register.

### What is worth keeping

Everything in section 5, KEEP-1 to KEEP-7. Also keep the closing disclaimer paragraph and the "Related reading" block; the five links there all resolve and all point at siblings in the same lane.

---

## 7. Deterministic acceptance criteria

Countable and checkable at QA. Every criterion below either passes or names what failed.

### A. Equity preservation (§9.9 floor 5), BLOCKING

**All 8 Bing queries in section 2 must still match** in `metaTitle`, `h1`, a body H2, an FAQ or body prose after the rewrite. **Count: 8 of 8.** Any query that stops matching is a named BLOCK, listed with the diff line that removed it.

The two most fragile, which need a deliberate home:

- `nhs pension death benefit election`, currently has no host. Give it one: the LSDBA / death-benefit sentence in the "lifetime allowance is gone" H2 must name a **death benefit** and an **election**, or add it to the redundancy/refund H2.
- `can i increase my nhs pension payments without being charged a fee`, currently has no host. The Additional Pension / AVC sentence needed for theme 16 covers it if it uses the words *increase*, *payments* and *charge*.

The other six are hosted by KEEP-1, KEEP-2, KEEP-3 and the Scheme Pays H2 and must not be moved out of headings into buried prose.

### B. Named phrasings that must appear verbatim (§9.9 floor 6)

Drawn from the `On page = no` rows of section 3, prioritised **peer-winnable first, then volume**, and filtered by the section 3a boundary ruling. **Count: 19 phrases must appear verbatim.**

Tier 1, peer-winnable (all 6, mandatory, at least 3 of them in a heading or FAQ question):
1. `nhs tax rebate` · 2. `nhs tax refund` · 3. `nhs tax refund scheme` · 4. `tax rebate nhs` · 5. `nhs tax refund uniform` · 6. `nhs tax rebate for uniform`

*(5 and 6 are the NHS-qualified uniform rows and are permitted in the single uniform FAQ only, per ruling 1.)*

Tier 2, refund family, framing only (5, mandatory):
7. `nhs pension refund` · 8. `nhs pension refund form` · 9. `nhs pension opt out refund` · 10. `opt out nhs pension refund` · 11. `nhs pension refund after 2 years`

Tier 3, remaining rebate variants and the assigned NO-PAGE row (5, mandatory):
12. `nhs tax refunds` · 13. `tax refund nhs` · 14. `nhs pensions refund` · 15. `nhs refund pension` · 16. `nhs pension redundancy`

Tier 4, generic claim language, summary depth with pointer (3, mandatory):
17. `what can i claim tax back on` · 18. `how many years can you claim tax back` · 19. `claim tax back for professional fees`

**Not required and not to be forced:** `nhs pension opt out refund form rf12`, `nhs pension refund how long does it take`, `nhs pension opt out and refund`, `nhs tax rebate uniform`, `nhs uniform tax rebate`, `tax rebate nhs uniform`, `uniform tax rebate nhs`, `what can you claim tax back on`, `claim tax back on professional fees`, `claim tax back professional fees`, `claim tax back for union fees`, 11 rows, deliberately declined or left to the pointer targets. They are recorded here so the count reconciles: 19 required + 11 declined + 8 forbidden (criterion E) + 3 mileage (ruling 4) = 41. **Balances.**

### C. Arithmetic that must recompute, BLOCKING

Every worked figure re-derived, not judged plausible (§4 floor 2). Inputs stated:

- **A1 taper floor.** Inputs: standard AA £60,000, adjusted-income limit £260,000, £1-for-£2 reduction, floor £10,000. Assert: adjusted income at which the floor is reached = 260,000 + 2 × (60,000 − 10,000) = **£360,000**.
- **A2 carry-forward illustration.** Inputs: excess over available allowance £30,000, banked unused allowance across three prior years £35,000. Assert: carried forward £30,000, residual chargeable amount **£0**.
- **Any new illustration the writer adds** must state its inputs inline and be re-derivable from them with no unstated assumption.
- **The BMA refund-tax figures ("20% below £20,000, 50% above") from teardown 4.4 must NOT be reproduced.** They are not in `house_positions.md`, they were read off a competitor page, and they are not verified. If the page needs the point, it says a refund of contributions is taxed and that the rate depends on the amount, and sends the reader to NHSBSA.

### D. Statute and figures to re-verify at source, BLOCKING

Every citation WebFetched from the primary source and content-verified, not URL-liveness-checked (§4 floor 3):

| What | URL |
|---|---|
| Annual allowance £60,000, MPAA £10,000, tapered minimum £10,000, threshold income £200,000, adjusted income £260,000, LSA £268,275, LSDBA £1,073,100, confirm the **"2026 to 2027"** row | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates |
| Taper trigger conditions and three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance |
| Scheme Pays liability: charge exceeds £2,000 AND input exceeds the s.228(1) annual allowance | https://www.legislation.gov.uk/ukpga/2004/12/section/237B |
| Scheme Pays deadline, the 31 July limb AND the extended limb for a revised statement issued on or after 2 May | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA and https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 |
| LTA abolition from 6 April 2024 | https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024 |
| Dividend rates 2026/27 (10.75 / 35.75 / 39.35, allowance £500) if the incorporation H3 restates them | https://www.gov.uk/tax-on-dividends |
| 2015 section CARE 1/54th, CPI+1.5%, all active members from 1 April 2022 | https://www.nhsemployers.org/articles/comparing-different-sections-nhs-pension-scheme |
| Partial retirement from 1 October 2023, 20% to 100%, 10% reduction for 12 months | NHSBSA partial-retirement guidance. **NHSBSA member-hub pages return HTTP 403 to automated fetches** (`house_positions.md` verification log), so NHS Employers is the fetchable authority; if neither renders, the fact is carried from §2.E and the limitation is recorded, never guessed |
| McCloud remedy period 1 Apr 2015 to 31 Mar 2022, rollback 1 Oct 2023, deferred choice at retirement | https://www.nhsemployers.org/articles/mccloud-remedy |
| AMAP 55p/25p, **only if** any mileage phrasing survives editing | https://www.gov.uk/government/publications/rates-and-allowances-travel-mileage-and-fuel-allowances/travel-mileage-and-fuel-rates-and-allowances |

**UNVERIFIED-figure rule (house rule 4).** `house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. This page will reach for the GMC fee in the professional-fees H2 (criterion B, phrase 19). **No figure may be stated.** The page must say the GMC annual retention fee is **tax-deductible** and frame the amount as **"confirm the current figure at source"**, naming the block: the professional-fees H2 and, if present, the professional-fees FAQ answer. Global Sum and QOF point value are not in scope for this page and must not appear.

### E. Forbidden strings, BLOCKING, negative criterion

The following **must be absent** from the finished file, per ruling 1. **Count: 6 string patterns, 8 keyword rows.**

`claim tax back on uniform` · `claim tax back uniform` · `claim tax back for uniform` · `claim tax back for washing uniform` · `how to claim tax back` · `how do i claim tax back`

Rationale carried into the QA note so a later reader does not "fix" the omission: these are the head of NO-PAGE row 4 (26,880 volume, 108 keywords), which the dossier prescribes to a new page or the expenses hub. Annexing them here creates a cannibalisation pair against a page that does not exist yet.

### F. Frozen-page respect, BLOCKING

The page must not build out content that the dossier prescribed to a page inside an armed window to **2026-09-10**. Specifically: **no mileage section** (row 8, `gp-tax-deductions-complete-list-2026`), **no RF12/REF1 walkthrough** (row 14, `nhs-pension-for-locums-form-a-form-b`), **no deduction list** (`medical-professional-expenses-what-is-claimable`). Summary-plus-pointer only. Checkable: each of those three topics occupies **at most one H2 or one FAQ** and contains **at least one internal link** to its prescribed owner.

### G. Protected elements

This is a REFRAME, so `metaTitle`, `h1` and the H2 order are **not** frozen and may change. **What is frozen:** `slug`, `canonical`, `date` may be refreshed but the file path, `category` and the frontmatter key set must survive. If `metaTitle` changes it must still contain `NHS pension` and stay at or under 60 characters.

### H. The four existing floors (§4) plus §9.9 floors 5 to 8

1. **Query-coverage floor**, `python scripts/track2_query_coverage.py --slug nhs-pension-tax-charges-how-to-minimize --json`. Proven impression demand placed on the page; gates on high-demand queries only; numbers matched literally.
2. **Arithmetic recompute**, criterion C, `arithmetic_recomputed[]` populated, `all_clear` derived from the dimensions and never trusted from the agent.
3. **Statute verification at source**, criterion D, `statute_checks[]`, each citation content-verified at legislation.gov.uk or gov.uk, Royal Assent checked on any Finance Act cited.
4. **Link resolution**, `slug_resolver.py` + `track2_link_audit.py` + `predeploy_gate.py`. **0 broken internal links repo-wide.** Medical uses **FLAT** `/blog/<slug>` routing (`medical_parked` memory: `slug_resolver` HARD-REFUSES flat sites), so do **not** run the category resolver on this file; use `scripts/medical_flat_link_audit.py`.
5. **Equity preservation**, criterion A, 8 of 8.
6. **Cluster coverage**, criterion B, 19 of 19, plus criterion E, 0 of 6 forbidden patterns present.
7. **Reconciliation balance**, the 41 rows reconcile as 19 required + 11 declined + 8 forbidden + 3 mileage-declined = 41.
8. **Competitor re-read**, the section 4.11 table, 26 themes, **0 undecided**.

Plus the two human passes: adversarial factual QA against `house_positions.md`, and the editorial pass, which here also checks that the rebate layer reads as prose and not as inserted keywords, and that the page still opens as an annual-allowance strategy page.

---

## 8. Stated expectation

Written before the work, as a number a later read can fail (§9.6).

**Baseline, 90d to 2026-08-26:** Bing 8 named queries, 9 impressions, **2 clicks**. Google 0 query-level rows.

**Engine and window.** Bing is the **14 to 28 day** read; Google the **28 to 90 day** read. One change per page per window.

| Horizon | Engine | Expectation |
|---|---|---|
| 14 days | Bing | The page holds its 8 equity queries (impressions > 0 on at least 5 of the 8) and Bing begins returning impressions on at least **3 distinct queries containing "rebate" or "refund"** that it returned none of at baseline |
| 28 days | Bing | Bing named queries for this URL **>= 20** (from 8), impressions **>= 30** (from 9), clicks **>= 3** (from 2). Phrase coverage, not total traffic, is the verdict basis (§9.6 rule 2) |
| 90 days | Google | At least **one** query-level GSC row appears for this URL where there were 0, and it is a rebate/refund/pension-refund phrasing rather than an annual-allowance phrasing |

**`target_keywords` on `blog_optimizations`** must be populated with the **19 phrases in criterion B**, not with the annual-allowance vocabulary the page already ranked for. Total impressions rising while the 19 stay missing is **drift and must be recorded as a fail**.

**Failure trigger, as a number.** **If Bing clicks on this URL fall below 2 in a 28-day window, or Bing named queries for this URL fall below 8, revert to `b3d78c97e768645cca480dd350281ffa68c1faf9`.** Both floors are the measured baseline, so the trigger fires only on a real loss of the equity the page already has.

**Secondary trigger.** If at 28 days Bing impressions have risen but **zero** of the 19 named phrases appear in the Bing query set, record `impact_verdict = drift` and do not count the change as a success, whatever the headline number does.

---

## Corrections to the dossier

Per hard rule 7. Stated, not silently harmonised.

**C1. This page's assigned topic does not match its equity, and the dossier's own §7 shows the assignment was marginal.** Dossier §3 assigns `nhs tax refund / rebate` here. Dossier §7 shows the margin: this page 48.2 against `/blog/private-practice-tax-nhs-and-private-income` 46.9. The page's live Bing equity is entirely annual allowance and Scheme Pays. **The assignment is not wrong, but it is a least-bad host, not a fit**, and the pack has therefore graded the treatment as an additive layer over a preserved spine rather than the full repositioning that REFRAME nominally permits. Recorded so a later reader does not conclude the writer under-delivered on the grade.

**C2. Sixteen of this topic's 41 keywords (2,340 volume, 34% of the topic) are prescribed by the dossier to pages that are FROZEN to 2026-09-10.** Specifically: mileage (3 rows, 210, NO-PAGE row 8 to `gp-tax-deductions-complete-list-2026`), RF12/refund-form mechanics (a subset of sub-family 1, NO-PAGE row 14 to `nhs-pension-for-locums-form-a-form-b`), professional fees and generic claim language (7 rows, 1,000, overlapping `medical-professional-expenses-what-is-claimable`). The dossier's §6 notes that "four NO-PAGE prescriptions (rows 7, 8, 18, 21) point at frozen pages and are blocked until 2026-09-10" but does not note that **an assigned topic's own keyword set is also partly blocked**. This page therefore cannot fully cover its topic before 2026-09-10 by design, and criterion B is scoped accordingly. **Suggested delta:** a post-09-10 pass to place the mileage, RF12 and professional-fees phrasings on their prescribed owners.

**C3. The dossier's topic row says 27 keywords, the data sheet's regex returns 41.** Dossier §3 row 4: `nhs tax refund / rebate | 7 domains | 2,470 volume | 1,000 peer-winnable | 27 kws | 22 of 27 missing`. The data sheet for this page: **41 kws, 6,830 volume, 840 peer-winnable, 5 domains, 41 of 41 missing.** The two selections are not the same set. The pack's regex is broader (it adds the `claim tax back` and `nhs pension redundancy` families) and picks up the uniform vocabulary that the dossier isolates as NO-PAGE row 4. **The pack works to the 41-row data sheet because that is the frozen input the brief supplies, but the boundary ruling in section 3a exists precisely to stop the broader regex being read as a licence to take NO-PAGE row 4.** Both numbers should be reconciled in the next dossier pass; neither has been altered here.

**C4. `nhs pension redundancy` is assigned twice.** Dossier §4 NO-PAGE row 31 prescribes it as a section on this page. Dossier §7 lists it as a conflict: this page 56.0 against `/nhs-pension` 48.0. Both readings agree this page wins, so there is no contradiction to resolve, but the pack for `/nhs-pension` is instructed not to take it, and that instruction is recorded in both packs.

---

*Pack built 2026-08-26. No `Medical/web/` file was modified. No commit, no deploy, no `monitored_pages` write, no monitor, alert, cron or notification created.*
