# §9.5 RESEARCH PACK: /calculators/nhs-pension-scheme-pays

Assembled 2026-08-26 from the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md`, the deterministic data sheet for this page, `docs/medical/house_positions.md`, `docs/medical/competitor_universe_2026-08-26.md` and live competitor fetches recorded in section 4. Preparation only. The pack does not write the page.

---

## 1. Target and permission level

**CONSTRAINT FIRST.**

| Field | Value |
|---|---|
| URL | `/calculators/nhs-pension-scheme-pays` |
| Cluster / topic | nhs pensions (contribution rates, scheme changes) · lane `nhs_pension` |
| Grade | **REFRAME** (data sheet header; dossier §3 row 1: 12 domains, 448,550 volume, 294 of 332 phrasings missing) |
| Source file | `Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts` |
| Compute logic | `Medical/web/src/lib/tools/compute/nhs-pension-scheme-pays.ts` |
| Renderer | `Medical/web/src/app/calculators/[slug]/page.tsx` |
| Current sha | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts Medical/web/src/lib/tools/compute/nhs-pension-scheme-pays.ts` |

**This page is NOT a markdown file.** There is no `content/blog/*.md` to edit. The writer edits a **TypeScript data object**, `nhsPensionSchemePaysTool`, exported from the config file above and typed as `GenericTool`. Copy lives in named object properties, not in prose blocks:

- `metaTitle`, `metaDescription`, `name`, `oneLiner`, `intro`, strings.
- `fields[]`, each input's `label` and `help` string. These are on-page text and the matcher sees them.
- `compute()`, the `rows[]` labels, the `headline` labels and the `note` string. Also on-page text.
- `explainer.heading` and `explainer.paragraphs[]`, this is the page's body. There is **no H2 array**: `explainer.heading` renders as the single body heading. Adding structural headings means adding entries to the config shape the renderer supports, so **check `Medical/web/src/app/calculators/[slug]/page.tsx` and the shared `GenericTool` type in `@accounting-network/web-shared/tools/types` before assuming a new heading can be added.** If the type does not carry a repeatable heading, the coverage work lands in `explainer.paragraphs[]`, `faqs[]` and the field `help` strings, and that limitation must be recorded, not worked around by inventing config keys.
- `faqs[]`, `question` / `answer` pairs. This is the largest addressable surface on the page.
- `related[]`, internal links.

**REFRAME = full rewrite permitted.** metaTitle, the tool `name`, the explainer heading, the explainer paragraphs and the FAQ set may all be rewritten against the topic keyword set in section 3. The equity register in section 2 still binds absolutely: every one of the four Bing queries must still match after the rewrite.

**What may NOT be changed.**
- The URL, the slug and the file path. Rewrite in place. No redirect, no collapse, no new page (§5, hard rule 6).
- The compute contract: `calcSchemePays` inputs, outputs and field `id` values. Changing a field `id` breaks the renderer. Rewriting `label` and `help` text is fine; renaming `id` is not.
- The locked figures in `house_positions.md` §2.B and §2.D (see section 7).
- Nothing under `Medical/web/` may be edited by the pack author. The writer edits only the two files named above.

**Frozen-list position.** This page is **not** frozen. Batch 1 excludes the 16 pages holding an armed `monitored_pages` window to **2026-09-10** (dossier §6) and treats the 3 `status='flagged'` rows as **HOLD**. This calculator appears on neither list, so it is workable now.

**Differentiation, not collapse (load-bearing).** Dossier §7 records that `/calculators/nhs-pension-scheme-pays` and `/blog/nhs-pension-scheme-pays-doctors-deadlines` **tie on nine consensus topics** (nhs pensions 67.2, nhs pension schemes 63.9, nhs pension 1995 scheme 62.2, how does nhs pension work 56.2, death in service 49.7, is the nhs pension good 64.4, how does the scheme work 66.7, is nhs pension salary sacrifice 52.0, added years 52.5). The blog post carries `monitored_pages status='flagged'` and is therefore **on HOLD**. That does not license folding it in.

> **Instruction to the writer.** Differentiate. **The calculator owns the tool intent.** It answers "what will this cost me and which option do I pick", with inputs, a computed answer, the arithmetic and the decision. The blog post owns the **deadline and procedure narrative** and is not yours to write, edit or absorb. Where this page needs the procedural detail, it states the rule in one or two sentences and links to `/blog/nhs-pension-scheme-pays-doctors-deadlines`. Do not build a deadline explainer here that duplicates that page's structure, and do not remove the existing link relationship. If a phrasing in section 3 reads as pure procedure with no calculable component, place it in an FAQ answer that resolves the question and then points onward, rather than growing a rival narrative section.

**Governing ground truth.** `house_positions.md` **§2.D (Scheme Pays mechanics)** governs the mechanics and the deadline. **§2.C** carries the **NHS tiered member contribution bands uplifted 1 April 2026** and the employer rate. **§2.B** carries the annual allowance figures. All three are load-bearing here; §2.D and §2.C are the two the writer will reach for most.

---

## 2. Equity register

*(Copied verbatim from the data sheet, including provenance lines.)*

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/calculators/nhs-pension-scheme-pays)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **4** | impressions 4 | clicks 1.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| nhs pension scheme pays calculation | 1 | 1 | 7.0 |
| nhs pension annual allowance tax 2026 scheme pays | 1 | 0 | 2.0 |
| nhs pension scheme pays interest rate | 1 | 0 | 8.0 |
| nhs scheme pays elect | 1 | 0 | 7.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

---

## 3. The market's keyword set

*(Copied verbatim from the data sheet, including provenance lines and the full table. Not re-sorted, not truncated.)*

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
scheme pays|annual allowance charge|nhs pension (scheme )?(contribution|contributions|tier|tiers|tiered)|superannuation|nhs pension (scheme )?change|changes to nhs pension|is the nhs pension (scheme )?good|death in service|salary sacrifice.*pension|added years|how does the nhs pension
```

Keywords in topic: **121** | combined volume **206,880** | peer-winnable volume **2,880** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 17
| **Absent verbatim from this page: 116 of 121. Absent from the whole 105-page corpus: 111.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 27100 | 9 | bma.org.uk | no | **no** | no | changes to nhs pension scheme |
| 27100 | 8 | bma.org.uk | no | **no** | no | nhs pension changes |
| 27100 | 16 | bma.org.uk | no | **no** | no | nhs pension scheme changes |
| 12100 | 13 | bma.org.uk | no | **no** | no | salary sacrifice and pensions |
| 12100 | 14 | bma.org.uk | no | **no** | no | salary sacrifice pension |
| 12100 | 11 | bma.org.uk | no | **no** | no | salary sacrifice pension scheme |
| 12100 | 14 | bma.org.uk | no | **no** | no | salary sacrifice scheme pension |
| 9900 | 6 | bma.org.uk | no | **no** | yes | nhs pension contribution |
| 9900 | 6 | bma.org.uk | no | **no** | yes | nhs pension contributions |
| 9900 | 5 | bma.org.uk | no | **no** | no | nhs pension scheme contributions |
| 9900 | 7 | bma.org.uk | no | **no** | no | nhs superannuation contributions |
| 2900 | 17 | bma.org.uk | no | **no** | no | what is salary sacrifice pension |
| 2400 | 16 | bma.org.uk | no | **no** | no | salary sacrifice for pension contributions |
| 2400 | 15 | bma.org.uk | no | **no** | no | salary sacrifice pension contribution |
| 2400 | 6 | bma.org.uk | no | **no** | no | salary sacrifice pension contributions |
| 1900 | 9 | bma.org.uk | no | **no** | yes | nhs pension contribution rates |
| 1900 | 4 | bma.org.uk | no | **no** | no | nhs superannuation contribution rates |
| 1600 | 29 | medicsmoney.co.uk | no | **no** | no | nhs death in service |
| 1600 | 41 | bhp.co.uk | no | **no** | no | salary sacrifice pension changes |
| 1300 | 6 | bma.org.uk | no | **no** | no | nhs pension contributions employer |
| 1000 | 10 | medicsmoney.co.uk | yes | **no** | no | how does the nhs pension scheme work |
| 1000 | 16 | medicsmoney.co.uk | no | **no** | no | how does the nhs pension work |
| 880 | 18 | medicsmoney.co.uk | no | **no** | no | nhs superannuation rates |
| 720 | 8 | medicsmoney.co.uk | yes | **no** | no | is the nhs pension good |
| 720 | 8 | medicsmoney.co.uk | yes | **no** | no | is the nhs pension scheme good |
| 590 | 42 | medicsmoney.co.uk | no | **no** | no | nhs death in service benefit |
| 590 | 11 | medicsmoney.co.uk | no | **no** | no | what is nhs superannuation scheme |
| 390 | 9 | bma.org.uk | no | **no** | no | calculate nhs pension contribution |
| 390 | 14 | bma.org.uk | no | **no** | no | nhs pension contribution calculator |
| 390 | 8 | bma.org.uk | no | **no** | no | nhs pension contributions calculator |
| 390 | 7 | bma.org.uk | no | **no** | no | nhs pension scheme contributions calculator |
| 390 | 29 | bhp.co.uk | no | **no** | no | salary sacrifice pension budget |
| 390 | 5 | bma.org.uk | no | **no** | no | what is nhs pension contribution |
| 390 | 7 | medicsmoney.co.uk | yes | **no** | no | what is the nhs pension contribution |
| 320 | 5 | bma.org.uk | no | **no** | no | death in service nhs pension |
| 320 | 9 | bma.org.uk | no | **no** | no | death in service payments |
| 320 | 14 | bma.org.uk | no | **no** | no | disadvantages of salary sacrifice pension |
| 320 | 9 | bma.org.uk | no | **no** | no | how does salary sacrifice pension work |
| 320 | 7 | bma.org.uk | no | **no** | no | nhs pension contributions 2025 |
| 320 | 8 | bma.org.uk | no | **no** | no | nhs pension death in service |
| 320 | 4 | bma.org.uk | no | **no** | no | nhs pension scheme death in service |
| 320 | 3 | bma.org.uk | no | **no** | no | nhs pensions death in service |
| 320 | 22 | medicsmoney.co.uk | no | **no** | no | nhs superannuation death in service |
| 320 | 28 | bma.org.uk | no | **no** | no | salary sacrifice pension cap |
| 260 | 16 | bma.org.uk | no | **no** | no | nhs pension change of address |
| 260 | 15 | bma.org.uk | no | **no** | no | nhs pension scheme change of address |
| 260 | 9 | bma.org.uk | no | **no** | no | salary sacrifice pension uk |
| 210 | 7 | bma.org.uk | no | YES | yes | annual allowance charge |
| 210 | 9 | bma.org.uk | no | **no** | no | death in service tax |
| 210 | 9 | bma.org.uk | no | **no** | no | death in service taxable |
| 210 | 4 | bma.org.uk | no | **no** | no | does salary sacrifice affect pension |
| 210 | 4 | bma.org.uk | no | **no** | no | nhs pension contributions employee |
| 210 | 28 | medicsmoney.co.uk | no | **no** | yes | superannuation nhs |
| 210 | 92 | johnstoncarmichael.com | no | **no** | no | what is a death in service benefit |
| 210 | 87 | johnstoncarmichael.com | no | **no** | no | what is death in service benefit |
| 170 | 10 | bma.org.uk | no | **no** | no | changing to salary sacrifice pension |
| 170 | 11 | bma.org.uk | no | **no** | no | how does salary sacrifice work for pensions |
| 170 | 5 | bma.org.uk | no | **no** | no | how much is nhs pension contribution |
| 170 | 7 | bma.org.uk | no | **no** | no | is death in service taxable |
| 170 | 25 | bma.org.uk | no | YES | yes | scheme pays |
| 170 | 23 | bma.org.uk | no | **no** | no | teachers pension death in service |
| 140 | 14 | bma.org.uk | no | **no** | no | is death in service a taxable benefit |
| 140 | 14 | bma.org.uk | no | **no** | no | is death in service benefit taxable |
| 140 | 40 | medicsmoney.co.uk | no | **no** | no | nhs death in service how much |
| 140 | 26 | medicsmoney.co.uk | no | **no** | no | nhs pension contributions 2026 |
| 140 | 15 | bma.org.uk | no | **no** | no | salary sacrifice pension example |
| 110 | 5 | bma.org.uk | no | **no** | no | nhs pension contribution percentage |
| 110 | 5 | bma.org.uk | no | **no** | no | nhs pension contributions percentage |
| 110 | 3 | bma.org.uk | no | **no** | no | nhs pension contributions scotland |
| 90 | 9 | bma.org.uk | no | **no** | no | benefits of salary sacrifice pension |
| 90 | 8 | bma.org.uk | no | **no** | no | can i increase my nhs pension contributions |
| 90 | 35 | bma.org.uk | no | **no** | no | maximum salary sacrifice pension |
| 90 | 7 | bma.org.uk | no | **no** | no | nhs pension contributions 2025/26 |
| 90 | 8 | bma.org.uk | no | **no** | no | nhs pension tiers 2025/26 |
| 90 | 24 | bma.org.uk | no | **no** | no | salary sacrifice pension limit |
| 90 | 14 | bma.org.uk | no | **no** | no | salary sacrifice pension limits |
| 90 | 9 | bma.org.uk | no | **no** | no | salary sacrifice pension tax |
| 90 | 11 | bma.org.uk | no | **no** | no | what does salary sacrifice pension mean |
| 70 | 3 | bma.org.uk | no | **no** | no | added years nhs pension |
| 70 | 8 | bma.org.uk | no | **no** | no | annual allowance charge pension |
| 70 | 52 | johnstoncarmichael.com | no | **no** | no | death in service benefit hmrc |
| 70 | 5 | bma.org.uk | no | **no** | no | death in service pension |
| 70 | 18 | bma.org.uk | no | **no** | no | difference between salary sacrifice and pension contribution |
| 70 | 3 | bma.org.uk | no | **no** | no | nhs added years pension |
| 70 | 3 | bma.org.uk | no | **no** | no | nhs death in service pay |
| 70 | 5 | bma.org.uk | no | **no** | no | nhs death in service payment |
| 70 | 4 | bma.org.uk | no | **no** | no | nhs pension added years |
| 70 | 14 | bma.org.uk | no | **no** | no | nhs pension contributions 2026 27 |
| 70 | 11 | bma.org.uk | no | **no** | no | nhs pension contributions 2026/27 |
| 70 | 3 | bma.org.uk | no | **no** | no | nhs pension scheme added years |
| 70 | 2 | bma.org.uk | no | **no** | no | nhs salary sacrifice pension |
| 70 | 20 | bma.org.uk | no | **no** | no | non salary sacrifice pension |
| 70 | 9 | bma.org.uk | no | **no** | yes | pension annual allowance charge |
| 70 | 4 | bma.org.uk | no | **no** | no | pension death in service |
| 70 | 12 | bma.org.uk | no | **no** | no | salary sacrifice pension meaning |
| 70 | 18 | bma.org.uk | no | **no** | no | salary sacrifice pension vs non salary sacrifice |
| 70 | 13 | bma.org.uk | no | **no** | no | what is salary sacrifice pension contributions |
| 50 | 18 | bma.org.uk | no | **no** | no | average death in service payout uk |
| 50 | 13 | bma.org.uk | no | **no** | no | is salary sacrifice pension |
| 50 | 13 | bma.org.uk | no | **no** | no | is salary sacrifice pension better |
| 50 | 9 | bma.org.uk | no | **no** | no | nhs pension contribution rates 2025/26 |
| 50 | 3 | bma.org.uk | no | YES | yes | nhs scheme pays |
| 50 | 2 | pricebailey.co.uk | yes | **no** | no | nhs superannuation tax relief |
| 50 | 13 | bma.org.uk | no | **no** | no | salary sacrifice into pension |
| 50 | 12 | pricebailey.co.uk | no | **no** | no | salary sacrifice pension and maternity leave |
| 50 | 16 | pricebailey.co.uk | no | **no** | no | salary sacrifice pension maternity leave |
| 50 | 15 | bma.org.uk | no | **no** | no | salary sacrifice pension maximum contribution |
| 50 | 19 | bma.org.uk | no | **no** | no | salary sacrifice vs pension contribution |
| 50 | 5 | bma.org.uk | no | **no** | no | scheme pays nhs |
| 50 | 5 | bma.org.uk | no | **no** | no | scheme pays nhs pension |
| 50 | 10 | bma.org.uk | no | **no** | no | what is salary sacrifice pension uk |
| 50 | 11 | medicsmoney.co.uk | no | **no** | no | what is superannuation nhs |
| 50 | 19 | bma.org.uk | no | **no** | no | what is the maximum salary sacrifice for pension uk |
| 50 | 10 | bma.org.uk | no | **no** | no | who gets death in service payment |
| 40 | 32 | medicsmoney.co.uk | no | **no** | no | nhs death in service lump sum |
| 40 | 6 | bma.org.uk | no | **no** | no | nhs pension contribution rates 2025 |
| 40 | 4 | bma.org.uk | no | YES | yes | nhs pension scheme pays |
| 40 | 27 | bma.org.uk | no | **no** | no | police death in service payout |
| 40 | 8 | bma.org.uk | no | **no** | no | pros and cons of salary sacrifice pension |
| 40 | 23 | bma.org.uk | no | YES | yes | voluntary scheme pays |
| 10 | 6 | bma.org.uk | no | **no** | no | salary sacrifice pension tax implications |

---

## 4. Competitor teardown

**Cap declared.** The data sheet lists **36** competitor URLs holding keywords in this topic. Per the brief this teardown is capped at the **12 highest in-topic-keyword URLs**, which run from 39 keywords down to 4. The 24 URLs below that line (each holding 4 or fewer in-topic keywords, tailing to 1) are **not torn down here** and are listed at the end of this section as a named deferral so the §9.7 balance rule still holds: no competitor page is silently dropped.

Domain classification per `competitor_universe_2026-08-26.md`: **peer** = §2a target set; **unwinnable-authority** = §2b; **other** = present in the keyword harvest but not in the validated 18-head-term universe.

### 4.1 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/salary-sacrifice-schemes
39 in-topic keywords · **unwinnable-authority** (bma.org.uk, §2b, 15 of 18 head terms, best position 1)
- Title / H1: "Salary sacrifice schemes" / "Salary sacrifice schemes". ~2,100 words.
- H2/H3: What benefits you can access · Adjust your arrangement · Implications (H3: Tax and national insurance benefits · Salary sacrifice differences between pension schemes · High earners and the Annual Allowance · Final pay controls for employers · Salary Sacrifice and partial retirement · Impact on other benefits) · What to consider.
- Tables: no. Calculator: no. FAQ block: no.
- **Judgement.** This single URL carries a third of the topic's keyword mass and it is a **salary sacrifice** page, not a Scheme Pays page. It covers what can be sacrificed, the NIC and tax effect, and, usefully, how sacrifice differs across the 1995/2008/2015 sections and how it interacts with the annual allowance and partial retirement. It omits any worked arithmetic beyond a car-leasing PDF, has no decision tool, and gives the reader nothing to compute. It is broad and unquantified, which is exactly the shape a calculator can beat on intent even though it cannot beat bma.org.uk on brand.

### 4.2 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates
28 in-topic keywords · **unwinnable-authority**
- Title / H1: "NHS pension contribution rates". ~1,200 words.
- H2/H3: Employer contribution rates from 1 April 2024 · From 1 April 2025 the contributions will be: · In England · In Northern Ireland · In Scotland · Pension contributions and tax · Part-time doctors.
- Tables: **yes**, multiple tier-band tables by nation (England/Wales, Northern Ireland, Scotland) and by period (pre-October 2022, Phase 1, Phase 2, April 2025). Calculator: no. FAQ: no.
- **Judgement.** The best structured tier data in the set, and the reason "nhs pension contribution rates" and its variants sit here. It is also the clearest **staleness target in the whole teardown**: its most recent tier heading is "From 1 April 2025", and `house_positions.md` §2.C records that the bands were **uplifted again on 1 April 2026**. It omits tax relief mechanics beyond a short section, gives no worked example of a tier crossing, and has no tool.

### 4.3 https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/
24 in-topic keywords · **peer** (medicsmoney.co.uk, §2a rank 1, 15 of 18 head terms, best position 1)
- Title: "NHS Pension Scheme - Guide by Medics Money". H1: "NHS Pension Scheme Guide". ~2,800 words.
- H2/H3: How the NHS Pension works · What is a pension and why is the NHS Pension different? · The NHS Pension is different to most other pensions, in a good way · How does the NHS Pension actually work? · How much does it cost to join the NHS Pension? · When can I retire? · How can I retire early? Can I buy additional pension? What's an ERRBO? · What is the McCloud judgment and what do doctors need to do about it? · NHS Pension FAQs · I'm a GP. How is my pensionable income calculated? · What additional benefits does the NHS Pension give you? · Should I opt out of the pension? · I'm planning to leave the UK, should I join the NHS Pension? · What is pensionable salary? · Do I need an accountant or IFA to help with pension problems? · I need pension advice, where can I get it? · Is the NHS Pension still a good deal? · Do I need an accountant or a financial adviser for NHS Pension advice? · What are the annual checks all doctors need to make on their pension?
- Tables: yes (3 contribution-rate tables, regional). Calculator: no. FAQ: **yes**.
- **Judgement.** This is the page that holds every peer-winnable row in section 3 except one: "how does the nhs pension scheme work" (position 10), "is the nhs pension good" and "is the nhs pension scheme good" (both position 8), "what is the nhs pension contribution" (position 7). It wins those on **question-form headings phrased exactly as the query**. It is a primer, not a decision tool: no Scheme Pays mechanics, no charge arithmetic, no factor table. That is the seam.

### 4.4 https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/death-in-service-and-your-pension
18 in-topic keywords · **unwinnable-authority**
- Title / H1: "Death in service and your pension". ~3,200 words.
- H2/H3 (abridged only in nesting, all themes present): Am I covered for death in service benefits? (H3s: I'm a locum GP · I am bank staff · I'm a secondary care doctor on authorised leave · I'm on unpaid sickness absence · I'm on maternity leave · I'm a mental health officer over 60 with maximum service · I have taken partial retirement · I have retired and returned to pensionable employment having taken 100% of my pension) · Is a lump sum payable if you die in pensionable service? (H3s: I'm in the 2015 scheme · I'm working part-time · I work in the NHS, but have opted out of the pension scheme · I have retired and returned ... 100% of my pension · I have remained in pensionable employment and taken partial retirement) · What tax is charged on the lump sum? · Can I choose who gets my lump sum? (H3s: I have a partner but do not want them to receive my lump sum · I have a partner but we're not married · I am not married and don't have a partner) · Qualifying for an adult dependant pension (H3s: I am married or in a registered civil partnership · I'm not married or in a registered civil partnership · I transitioned into the 2015 scheme · I've been in the pension scheme for less than two years · I've been in the pension scheme for more than two years) · The pension your adult dependant will receive short term · The pension your adult dependant will receive long term (H3s: I'm in the 2015 scheme · I have taken partial retirement) · Child allowance (H3s: I'm in the 2015 scheme · I've been in the scheme for less than two years · When does the child allowance become payable? · My child is not able to live independently) · How can I provide more benefits to my dependents through the pension scheme? · Equity of benefits across pensions schemes.
- Tables: no. Calculator: no. FAQ: yes (the whole page is scenario Q&A).
- **Judgement.** Exhaustive on eligibility-by-circumstance and the strongest structural lesson in the teardown: **it wins by enumerating the reader's situation as a heading** ("I'm a locum GP", "I have taken partial retirement"). It omits processing timelines, nomination procedure and any cross-section benefit comparison. It is also an entirely different subject from Scheme Pays, which is the central problem with this topic's regex (see Corrections).

### 4.5 https://medicsmoney.co.uk/nhs-pension-ill-health-death-in-service/
11 in-topic keywords · **peer**
- Title: "NHS pension ill health and death in service benefits - PPE for your families finances - Medics Money". H1: "NHS pension ill health and death in service benefits, PPE for your families finances". ~2,800 words.
- H2/H3: PPE for doctors finances · Family Protection · Protecting your Income · What medical school didn't teach us about money · Insurers approach to Covid-19 · NHS Scheme Benefits · Ill Health Pensions · Survivors Pensions · Childrens pensions · Join 30,000 doctors and receive free, exclusive, financial CPD for doctors in your inbox · Death in Service (DIS) Benefits · Locum GPs · What if I am retired and I return to the scheme? · About the author · Explore our top 10 blog posts here · Ready to read more of our great content? Check out our most popular blog posts below.
- Tables: no. Calculator: no. FAQ: no.
- **Judgement.** Covers Tier 1 and Tier 2 ill-health retirement, survivor and children's pensions and the locum protection gap. Carries a visible **Covid-19 section**, which dates it. Roughly a third of the headings are newsletter, author and cross-promo furniture rather than content, which is why it ranks at positions 29 to 42 on most of its death-in-service rows despite the peer domain.

### 4.6 https://johnstoncarmichael.com/insights/employee-benefits-the-perils-of-the-wrong-type-of-death-in-service
7 in-topic keywords · **unwinnable-authority** (johnstoncarmichael.com, §2b, large Scottish national firm)
- Title: "Death in Service Schemes - the tax pitfall to avoid | Johnston Carmichael". H1: "Death in Service Schemes - the tax pitfall to avoid". ~520 words.
- H2/H3: Insights · What can be done? · Want to know more? (the remainder returned by the fetch, Footer / Follow us / Using our site / Arrange a chat / All fields are required, is chrome, not content).
- Tables: no. Calculator: no. FAQ: no.
- **Judgement. Factually stale and quotably wrong.** It states "most people are subject to a maximum lifetime pension saving of £1m, with any lump sum payments above this being taxed at 55%". The **lifetime allowance was abolished from 6 April 2024** (`house_positions.md` §2.B and the Verification log) and the 55% lump-sum charge with it; the framework is now the Lump Sum Allowance £268,275 and the Lump Sum and Death Benefit Allowance £1,073,100. This page ranks at positions 52 to 92 on its rows, so it is not a threat, but it is proof that the death-in-service SERP is carrying pre-2024 tax law.

### 4.7 https://practiceindex.co.uk/gp/blog/explaining-the-nhs-pension-scheme-part-three/
6 in-topic keywords · **peer** (practiceindex.co.uk, §2a rank 6)
- Title / H1: "Explaining the NHS Pension Scheme, Part Three". ~1,200 words.
- H2/H3: Employer contribution · Member contribution · Tax relief.
- Tables: **yes**, four tables of contribution rates by nation and tier. Calculator: no. FAQ: no.
- **Judgement.** Three headings, four tables, and one genuinely good idea: it works an example of how **crossing a tier threshold can cut take-home pay despite a pay rise**. That is the single most useful reader-facing insight in the contribution half of this topic and nobody else in the teardown quantifies it. It is part three of a nine-part AISMA series, so it defers the annual allowance charge entirely.

### 4.8 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance
6 in-topic keywords · **unwinnable-authority**
- Title / H1: "NHS pension annual allowance". ~2,100 words.
- H2/H3: Tapered annual allowance 2023/24 · Your annual allowance statement (H3: GPs · Nations) · What your statement includes (H3: Pension input start date · Pension input end · Annual allowance · Pension input amount) · Ensuring your statement is right (H3: Hospital doctors 1995/2008 section accrual · GPs 1995/2008 section accrual · 2015 scheme accrual) · Receiving a backdated pay award · What to do if you exceed the limit (H3: Scheme pays) · If you are a deferred scheme member · Video guides · BMA pensions.
- Tables: no. Calculator: no (links the HMRC tapered AA tool). FAQ: no.
- **Judgement.** Strong on **checking your statement is right**, which is a genuine doctor pain point and something no calculator in this niche does. Scheme Pays is one H3. It carries a **"Tapered annual allowance 2023/24"** heading, which is three tax years stale. The fetch confirms the **£2,000 mandatory test is not stated on this page at all**.

### 4.9 https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/your-annual-allowance-statement-and-exceeding-the-limit
5 in-topic keywords · **unwinnable-authority**
- Title / H1: "Your annual allowance statement and getting a tax charge". ~2,200 words.
- H2/H3: What's included in your statement · Higher earners and tapered allowance · GPs · If you exceed the annual allowance limit · Using previous unused allowance · Offsetting negative growth in legacy public sector schemes (1995/2008) · If you still have an excess · Paying the charge · Tax return · Deadlines and scheme pays · Interest on scheme pays · Alternative options for pension contribution.
- Tables: referenced but not embedded (defers the Scheme Pays interest table to a NHSBSA PDF, "page 30"). Calculator: links the HMRC tool. FAQ: no.
- **Judgement. This is the closest competitor to our page's actual subject.** It carries mandatory versus voluntary, the "more than £2,000" test, the 31 July deadline and the McCloud-related deadline extensions, plus two things our page does not have at all: **carry-forward of unused allowance treated as a step** and **offsetting negative growth in the 1995/2008 legacy sections**. It has **no worked example and no arithmetic**, and it pushes the interest mechanics into an external PDF. Every heading here is a coverage obligation for us; the whitespace is that it never computes anything.

### 4.10 https://bhp.co.uk/news-events/healthcare-insights/nhs-pensions-scheme-pays-elections/
4 in-topic keywords · **other** (bhp.co.uk is in §2a at rank 15 as a regional generalist with a healthcare team, so treat as a **weak peer**)
- Title: "NHS Pensions - Scheme Pays Elections - BHP, Chartered Accountants". H1: "NHS Pensions, Scheme Pays Elections". ~650 words.
- H2/H3: Mandatory Scheme Pays · Voluntary Scheme Pays · Impact of the Public Service Pensions Remedy (McCloud Remedy).
- Tables: no. Calculator: no. FAQ: no.
- **Judgement.** Six hundred and fifty words, three headings, and it still lands the mandatory/voluntary split, the £2,000 test and the 31 July deadline. Its one distinctive point is that with a **voluntary** election the member remains responsible for HMRC interest if payment lands after the 31 January self-assessment deadline, which our page does not mention. It gives no rates, no factors, no numbers.

### 4.11 https://www.hawsons.co.uk/nhs-pension-contribution-changes/
4 in-topic keywords · **peer** (hawsons.co.uk, §2a rank 14)
- **FETCH FAILED: HTTP 403 Forbidden.** Flagged gap. Not dropped. Keyword data only, per §9.10 ("domains that block crawling are recorded as keyword-data-only, with the limitation stated"). What is known from the harvest: it holds 4 in-topic keywords in the `nhs pension contribution changes` family. Its headings are **unknown** and therefore **cannot** be marked covered or declined at QA floor 8 without a human read; record it as an explicit unknown rather than as zero.

### 4.12 https://www.pricebailey.co.uk/blog/changes-nhs-pension-scheme-contributions/
4 in-topic keywords · **peer** (pricebailey.co.uk, §2a rank 5)
- **FETCH FAILED: HTTP 403 Forbidden.** Flagged gap. Not dropped. Keyword data only. Note this matters more than 4.11 because pricebailey holds the **only non-medicsmoney peer-winnable row in section 3**, "nhs superannuation tax relief" at **position 2**, volume 50, and also the two maternity-leave salary-sacrifice rows. The phrasing that wins that row is unreadable to us; treat "nhs superannuation tax relief" as a phrase to place on merit, not as a structure to copy.

### 4.13 Deferred, not torn down (24 URLs, all at 4 or fewer in-topic keywords)
Listed so the ledger balances. Each is a competitor page holding at least one cluster keyword; none was fetched.

`r-m-t.co.uk/blog/payroll-and-nhs-pension-changes/` (4) · `bhp.co.uk/news-events/blog/could-the-budget-spell-the-end-to-pension-salary-sacrifice/` (3) · `bma.org.uk/.../transferring-money-out-of-the-nhs-pension-scheme` (3) · `medicsmoney.co.uk/how-much-does-the-nhs-contribute-to-my-pension/` (3) · `kudosaccounting.co.uk/is-it-worth-staying-in-the-nhs-pension-scheme/` (2) · `nicholsmedical.co.uk/news/nhs-pension-and-tax-in-2025/` (2) · `medicsmoney.co.uk/nhs-pension-scheme-pays-deadline-extended/` (2) · `pricebailey.co.uk/blog/pension-contributions-statutory-leave/` (2) · `bma.org.uk/.../additional-pension-purchase` (1) · `nicholsmedical.co.uk/news/increasing-an-nhs-pension/` (1) · `themdu.com/guidance-and-advice/podcasts-and-videos/tax-and-pensions-webinar` (1) · `bma.org.uk/.../about-the-2015-nhs-pension-scheme` (1) · `fkca.co.uk/news/blog/the-latest-set-of-changes-to-nhs-pensions-the-2024-updates/` (1) · `themdu.com/mdu-journal/2024-issue-29/nhs-pension-changes-your-questions-answered` (1) · `forvismazars.com/uk/en/insights/healthcare-and-pharma-insights/nhs-pension` (1) · `rbp.co.uk/images/RBP-NHS-Pension-Report.pdf` (1) · `sandisoneasson.co.uk/news/post/tiers-of-joy` (1) · `accountants4nhsdoctors.co.uk/understanding-nhs-pension-annual-allowance/` (1) · `rbp.co.uk/news/nhs-pension-agency-will-pay-the-tapered-annual-allowance-tax-charge` (1) · `themdu.com/guidance-and-advice/podcasts-and-videos/navigate-the-nhs-pensions-maze-webinar` (1) · `accountants4nhsdoctors.co.uk/scheme-pays-advice-for-doctors/` (1) · `nicholsmedical.co.uk/services/consultants/nhs-pension-scheme/scheme-pays-election/` (1) · `medifintech.co.uk/` (1) · `bma.org.uk/.../added-years-for-those-continuing-with-1995-section-purchases-in-the-2015-scheme` (4, deferred because it belongs to the added-years sub-family, see Corrections).

Two of these are worth a manual eye before QA even though they are outside the cap, because they are **direct-subject peer pages at position-holding domains**: `accountants4nhsdoctors.co.uk/scheme-pays-advice-for-doctors/` and `nicholsmedical.co.uk/services/consultants/nhs-pension-scheme/scheme-pays-election/`.

### 4.14 Coverage checklist: union of their heading themes minus ours

Our page's only body headings are `explainer.heading` ("How Scheme Pays works and when it makes sense") plus six FAQ questions. So almost the entire union is "minus ours". Themes, deduplicated, with the source:

**Scheme Pays and the charge (directly ours)**
1. Mandatory Scheme Pays, defined by test (4.9, 4.10), partly ours
2. Voluntary Scheme Pays, and that HMRC interest still runs to 31 January (4.10), **not ours**
3. Deadlines and scheme pays, including the McCloud-extended deadlines (4.9), **partly ours, extension missing**
4. Interest on scheme pays (4.9), ours, and we are the only page with a rate
5. Paying the charge / tax return: the charge is declared on self-assessment either way (4.9), partly ours
6. Using previous unused allowance (carry-forward) (4.9), ours, in the note and one FAQ
7. Offsetting negative growth in legacy 1995/2008 sections (4.9), **not ours**
8. If you still have an excess (4.9), **not ours**
9. Alternative options for pension contribution (4.9), **not ours**
10. Ensuring your statement is right, by scheme and by role (4.8), **not ours**
11. What your statement includes: pension input start/end, pension input amount (4.8), **not ours**
12. Receiving a backdated pay award (4.8), **not ours**
13. Deferred scheme members (4.8), **not ours**

**Contributions and superannuation**
14. Member contribution tiers, by nation, with an effective date (4.2, 4.3, 4.7), **not ours**
15. Employer contribution rate (4.2, 4.7), **not ours**
16. Tax relief on member contributions (4.7, and the pricebailey row we cannot read), **not ours**
17. Part-time doctors and how the tier is set (4.2), **not ours**
18. Tier-crossing: a pay rise that reduces net pay (4.7), **not ours**
19. How much does it cost to join / what is pensionable salary (4.3), **not ours**
20. How is a GP's pensionable income calculated (4.3), **not ours**

**Scheme primer**
21. How the NHS pension actually works, 1995/2008/2015 (4.3), **not ours**
22. Is the NHS pension a good deal / should I opt out (4.3), **not ours**
23. When can I retire / early retirement / ERRBO / additional pension (4.3), **not ours**, and belongs to `/blog/nhs-pension-partial-retirement-doctors-guide`
24. McCloud and what doctors must do (4.3, 4.10), **not ours**, and belongs to `/blog/mccloud-remedy-nhs-pension-doctors-explained`
25. Annual checks every doctor should make (4.3), **not ours**

**Salary sacrifice**
26. What can be sacrificed / what is salary sacrifice (4.1), **not ours**
27. Tax and NIC effect of sacrifice (4.1), **not ours**
28. Sacrifice differences between the 1995/2008/2015 sections (4.1), **not ours**
29. Sacrifice, high earners and the annual allowance (4.1), **not ours**
30. Final pay controls for employers (4.1), **not ours**
31. Salary sacrifice and partial retirement (4.1), **not ours**
32. Impact on other benefits, including maternity (4.1, pricebailey rows), **not ours**

**Death in service**
33. Am I covered, by circumstance (locum, bank, leave, maternity, partial retirement, retire-and-return) (4.4), **not ours**
34. Lump sum payable in pensionable service, by section (4.4), **not ours**
35. Tax on the lump sum, and the LSDBA (4.4, 4.6), **not ours**
36. Nominating who receives it (4.4), **not ours**
37. Adult dependant pension, short term and long term (4.4, 4.5), **not ours**
38. Child allowance (4.4, 4.5), **not ours**
39. Ill-health retirement Tier 1 and Tier 2 (4.5), **not ours**
40. Locum GP protection gap (4.4, 4.5), **not ours**

Forty themes. **Thirty-six are absent from our page.** Section 7 turns this into a decision requirement: every one of the forty must end QA marked covered, deliberately-declined-with-reason, or belongs-to-another-page (§9.9 floor 8). Themes 23, 24, 31 and 33 in particular belong to other pages of ours and must be declined with the destination named, not silently ignored.

---

## 5. Whitespace

What no competitor in the teardown does well, stated so it is quotable:

1. **Nobody computes the cost of the Scheme Pays decision. Nobody.** Twelve URLs, zero calculators. 4.9 has every rule and no arithmetic. 4.10 has the rules in 650 words and no arithmetic. 4.3 has the best primer in the niche and does not touch Scheme Pays. We are the only page in the topic that turns "elect or pay cash" into a number.
2. **Nobody applies the interest accrual before the actuarial factor.** Our own explainer already names the failure mode and quantifies it: a commonly quoted illustration of about £380 a year for an £8,000 charge, against our £693, because the simpler illustrations divide the charge by a factor without compounding the debit first. **KEEP.** That paragraph is the single most defensible thing on the page.
3. **Nobody publishes an age-banded factor table with the source and revision date.** `SCHEME_PAYS_FACTORS` (ages 20 to 67, factors 27.4 down to 12.9, NHSBSA April 2024 revision, 2015 scheme, NPA 68) is a data asset none of the twelve has. 4.9 defers its interest table to page 30 of an NHSBSA PDF. **KEEP, and surface it on the page rather than leaving it only in the compute file.**
4. **Nobody states the break-even.** "Draw your pension beyond about age 79 and a half and Scheme Pays will have cost you more in lost pension than the £8,000 cash" is a sentence no competitor writes, because none of them has the arithmetic to write it. **KEEP.**
5. **Nobody shows the age effect as a comparison.** Our £8,000-at-45 versus £25,000-at-55 pairing (factor 19.7 versus 16.6, break-even 11.5 versus 12.3 years) is the only cross-age illustration in the set. **KEEP.**
6. **Nobody covers the extended deadline limb.** Not one of the twelve states the FA 2004 s.237BA extension where a **revised** pension savings statement is issued **on or after 2 May** (earlier of three months from that statement or six years from the end of the tax year). 4.9 gets closest with McCloud-specific dates. `house_positions.md` §2.D calls this "the limb NHS members most often need, because NHSBSA statements are routinely late and revised". **This is open whitespace that we also currently fail to occupy.** It is the highest-value single addition available to this page.
7. **Nobody states that the election dies when all benefits are taken.** §2.D records that the deadline is brought forward where the member becomes entitled to all their benefits. Our own `/blog/nhs-pension-partial-retirement-doctors-guide` carries this point; this calculator does not, and no competitor does.
8. **The death-in-service SERP is carrying abolished law.** 4.6 quotes a £1m lifetime limit and a 55% charge, both dead since 6 April 2024. Any correctly stated LSA/LSDBA framing beats it on accuracy even at a weaker domain.
9. **Nobody quantifies the tier-crossing trap except in prose.** 4.7 describes a pay rise cutting net pay; nobody puts a number on it against the **2026/27** bands. Those bands are in `house_positions.md` §2.C and are current, while 4.2's newest table is dated 1 April 2025.

---

## 6. Our current page, read honestly

Read from `Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts` and `.../compute/nhs-pension-scheme-pays.ts`, both at sha `b3d78c97`.

**What it says now.**
- metaTitle: `NHS Pension Scheme Pays Calculator 2026/27 | Cash vs Scheme Pays`
- Tool name (the on-page H1 equivalent): `NHS Pension Scheme Pays Calculator`
- Single body heading, `explainer.heading`: "How Scheme Pays works and when it makes sense"
- Six FAQ questions: What is Scheme Pays and who can use it? · What is the Scheme Pays election deadline? · Is Scheme Pays cheaper than paying the charge in cash? · Does electing Scheme Pays give me any tax relief? · Can carry-forward remove the charge so I do not need Scheme Pays at all? · How accurate is the estimated pension reduction?
- Four inputs: Annual Allowance tax charge · Pension input amount · Your current age · Your marginal income tax rate.
- Approximate word count of all editable copy (intro + field help + compute note + explainer + FAQs): **about 1,750 words**. Against the teardown median of roughly 2,100, that is not thin, but it is **structurally thin**: one heading and six questions, against 4.4's forty-plus headings and 4.3's nineteen.

**What is right, checked line by line against `house_positions.md`.**
- Mandatory test: charge > £2,000 **AND** input > £60,000, cited to FA 2004 s.237B. Matches §2.D exactly.
- Standard annual allowance £60,000, tagged 2026/27. Matches §2.B.
- Deadline "31 July in the tax year following the charge year", with the 2025/26-to-31-July-2027 worked pairing. Matches §2.D.
- "Scheme Pays gives no income-tax relief: you are settling a tax charge, not making a pension contribution." Correct and well put.
- Carry-forward from the previous three tax years, current year first, and the consequence that carry-forward dropping the charge below £2,000 removes mandatory eligibility. Matches §2.B and is a genuinely sharp point.
- The arithmetic recomputes. £8,000 x 1.0235^23 = £13,649.1; ÷ 19.7 = £692.8 a year; 8,000 ÷ 692.8 = 11.55 years. £25,000 x 1.0235^13 = £33,813; ÷ 16.6 = £2,036.9; 25,000 ÷ 2,036.9 = 12.27 years. Both stated figures are correct.

**What is wrong or missing, bluntly.**
1. **The extended deadline limb is absent.** §2.D's practical writing rule says "**always** mention the extended 3-month limb for a revised statement issued on or after 2 May, because late NHSBSA statements are the normal case, not the exception". The page states the 31 July deadline as flat and strict ("The deadline is strict: miss it and the Scheme Pays route closes"). For a member holding a revised statement issued in June, that sentence is **misleading**. This is the most serious defect on the page.
2. **The brought-forward limb is absent.** No election once all benefits are taken. §2.D. Live for anyone approaching full or partial retirement.
3. **Voluntary Scheme Pays is a label, not an explanation.** The compute function emits three different "Voluntary Scheme Pays only" strings and the note says voluntary "may be available on scheme-specific terms", but nothing tells the reader what voluntary actually means, that the deadline still bites, or that HMRC interest can still run (4.10).
4. **NPA 68 is hard-coded and under-flagged.** `yearsToRetirement = 68 - age`, the factor table is 2015-scheme-NPA-68, and the age input is capped at 67. The `note` does say members with 1995 or 2008 benefits will see different figures, but the headline row is labelled "Estimated annual pension reduction from age 68" as though 68 were universal. §2.E: NPA is 60 (1995), 65 (2008), State Pension Age (2015). For a 1995-section consultant this page's headline number is materially wrong and the caveat is buried.
5. **The 2.35% interest rate and the April 2024 factor table are both calibration knobs past their annual review.** The compute file's own header comment says "update at each annual NHSBSA release". The rate is tagged "NHSBSA 2024/25". Two releases have passed. **The figures may still be right, but they are unverified as at 2026-08-26 and must be re-checked at source before publication.**
6. **Contribution tiers appear nowhere**, despite this page owning the topic that contains "nhs pension contribution rates" (1,900), "nhs pension contributions 2026/27" (70) and every superannuation variant. §2.C has the current 2026/27 bands. The page does not mention a tier, a band or the 23.7% employer rate.
7. **116 of the topic's 121 phrasings are absent.** The five present are "annual allowance charge", "scheme pays", "nhs scheme pays", "nhs pension scheme pays" and "voluntary scheme pays". The page is written in exactly the right vocabulary for its own narrow subject and in none of the vocabulary for the topic it has been assigned.
8. **The FAQ set is six entries.** 4.3 runs nineteen question-headings and 4.4 runs thirty-plus. On a config-driven page where `faqs[]` is the most expandable surface, six is under-using the only structural affordance available.
9. **`related[]` has two links.** Neither goes to `/blog/nhs-pension-scheme-pays-doctors-deadlines`, the page it ties with on nine topics, nor to `/nhs-pension`.

Verdict: **not thin, but narrow.** The arithmetic and the factor table are genuinely best-in-topic. The page is a good calculator wearing a page that covers a twentieth of its assigned topic, and it carries one real accuracy defect (the flat deadline) plus one under-flagged modelling assumption (NPA 68).

---

## 7. Deterministic acceptance criteria

All countable at QA. Numbers are stated so a checker can fail them.

### 7.1 Exact phrases that must appear (verbatim, case and punctuation normalised), **30 required**

Drawn from the `On page = no` rows of section 3, ordered peer-winnable first, then by volume. Placement must be in `metaTitle`, `name`, `oneLiner`, `intro`, a field `label`/`help`, a compute `row` label, the compute `note`, `explainer.heading`, an `explainer.paragraphs[]` entry, or an `faqs[]` question or answer.

**Tier A, peer-winnable (5 of 5 required, all held by peers we can take):**
1. how does the nhs pension scheme work (1,000, medicsmoney pos 10)
2. is the nhs pension good (720, medicsmoney pos 8)
3. is the nhs pension scheme good (720, medicsmoney pos 8)
4. what is the nhs pension contribution (390, medicsmoney pos 7)
5. nhs superannuation tax relief (50, pricebailey pos 2)

**Tier B, highest-volume non-peer, on-subject (17 required):**
6. nhs pension changes (27,100)
7. changes to nhs pension scheme (27,100)
8. nhs pension scheme changes (27,100)
9. nhs pension contribution (9,900)
10. nhs pension contributions (9,900)
11. nhs pension scheme contributions (9,900)
12. nhs superannuation contributions (9,900)
13. nhs pension contribution rates (1,900)
14. nhs superannuation contribution rates (1,900)
15. nhs pension contributions employer (1,300)
16. how does the nhs pension work (1,000)
17. nhs superannuation rates (880)
18. what is nhs superannuation scheme (590)
19. nhs pension contribution calculator (390)
20. calculate nhs pension contribution (390)
21. what is nhs pension contribution (390)
22. superannuation nhs (210)
23. annual allowance charge pension (70)

**Tier C, Scheme Pays long tail (5 required, all directly on-subject and currently absent):**
24. scheme pays nhs (50)
25. scheme pays nhs pension (50)
26. nhs pension contributions 2026/27 (70)
27. nhs pension contributions 2026 27 (70)
28. how much is nhs pension contribution (170)

**Tier D, bounded sub-family placement (2 required, one per family, see Corrections):**
29. nhs pension death in service (320), one bounded block only, then link onward
30. salary sacrifice pension (12,100), one bounded block only, stating plainly whether NHS member contributions are a salary sacrifice arrangement, verified at source

**The remaining 86 absent phrasings are NOT required on this page.** They are recorded as a **delta** in the Corrections block with the reason and the destination. QA must see a decision for each family, not a placement for each keyword (§9.9 floor 8 is about decisions existing, floor 6 about the assigned set being placed; the assigned set for this page is the 30 above plus the 5 already present).

### 7.2 Equity preservation, **4 queries, all must still match**

Every query in section 2 must still be matchable in `metaTitle`, the tool `name`, `explainer.heading`, an FAQ question or body prose after the rewrite. Named, so a BLOCK is unambiguous:
1. `nhs pension scheme pays calculation`
2. `nhs pension annual allowance tax 2026 scheme pays`
3. `nhs pension scheme pays interest rate`
4. `nhs scheme pays elect`

Note for the checker: query 3 is currently satisfied by the 2.35% interest passages and query 4 by the words "elect"/"election". If the interest paragraphs are rewritten out, query 3 breaks. Count required: **4 of 4**.

### 7.3 Protected elements
REFRAME. **No byte-identical requirement applies to this page.** The elements that are nonetheless immutable are structural, not editorial: the slug `nhs-pension-scheme-pays`, the four field `id` values (`annualAllowanceCharge`, `schemeGrowth`, `age`, `marginalRate`), the exported symbol `nhsPensionSchemePaysTool`, and the `calcSchemePays` signature.

### 7.4 Arithmetic that must recompute

Every number below is recomputed at QA from the named inputs. Any mismatch is a BLOCK.

| Statement | Inputs | Must equal |
|---|---|---|
| Debit at retirement, worked example 1 | charge £8,000, age 45, rate 2.35%, NPA 68, years 23 | £13,649 (8000 x 1.0235^23) |
| Annual pension reduction, example 1 | debit £13,649 ÷ factor 19.7 (age band 45 to 49) | £693 a year |
| Break-even, example 1 | £8,000 ÷ £693 | 11.5 years; "beyond about age 79 and a half" |
| Debit at retirement, worked example 2 | charge £25,000, age 55, rate 2.35%, years 13 | £33,813 |
| Annual pension reduction, example 2 | debit £33,813 ÷ factor 16.6 (age band 55 to 59) | £2,037 a year |
| Break-even, example 2 | £25,000 ÷ £2,037 | 12.3 years |
| Contrast figure | the "commonly quoted illustration" of about £380 for an £8,000 charge | 8,000 ÷ 19.7 = £406, or 8,000 ÷ 21.4 = £374 at the age-40 band. **If the £380 figure is retained, the pack requires it be attributed to a named source or restated as the arithmetic that produces it.** An unattributed competitor figure is not a fact. |
| Any new tier-crossing example | 2026/27 bands from `house_positions.md` §2.C | pay just above £67,669 at 12.5% versus just below at 10.7%, computed, not asserted |

If the writer adds any new worked example, it must state its inputs inline so the checker can recompute without opening the compute file.

### 7.5 Statutes and sources to re-verify at source before publication

Each URL is fetched and the figure read, not recalled. No page may cite a figure that failed to fetch.

| What | URL | Why |
|---|---|---|
| Scheme Pays liability, "> £2,000" and the input-exceeds-AA test | https://www.legislation.gov.uk/ukpga/2004/12/section/237B | FA 2004 s.237B, cited on the page today |
| Scheme Pays notice deadline, the 31 July limb, the **on-or-after-2-May revised-statement extension** and the brought-forward limb | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA | s.237BA. The extension is the page's biggest gap |
| Scheme Pays HMRC guidance | https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 | PTM056430 |
| Annual allowance £60,000, MPAA £10,000, taper £200,000 / £260,000, floor £10,000, LSA £268,275, LSDBA £1,073,100, tagged **2026 to 2027** | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates | §2.B |
| Taper trigger wording and three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance | §2.B |
| **NHS tiered member contribution bands 2026/27, uplifted 1 April 2026** | https://www.nhsemployers.org/publications/nhs-pension-scheme-member-contributions | §2.C. NHSBSA's own pages return HTTP 403 to automated fetches; NHS Employers is the fetchable authority |
| Employer contribution rate 23.7% | https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions | §2.C. Re-set from 1 April 2027, so it must carry a date tag |
| **NHSBSA Scheme Pays interest rate and the age-banded actuarial factor table** | NHSBSA Scheme Pays interest and factors document (current release) | The page uses 2.35% and an April 2024 factor table. **Both are calibration knobs two annual releases old. If the current release cannot be read at source, the page must say the factors are the April 2024 revision and are illustrative, and must not present them as current.** |
| Lifetime allowance abolition and the LSA/LSDBA replacement | https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024 | Needed if any death-in-service lump-sum tax sentence is written (see 4.6's error) |

**UNVERIFIED figures, hard rule 4.** `house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. **This page must state no figure for any of them.** The topic does not require any of the three, so the expected outcome is simple absence. If a draft introduces one (most plausibly a GMC fee in a "what else is deductible" aside), the acceptance criterion is that the block instead reads "confirm the current figure at source" and names the block: the aside is deleted or reframed, and the block named for QA is the FAQ or explainer paragraph containing it.

### 7.6 The four existing floors plus §9.9 floors 5 to 8

| Floor | Requirement on this page |
|---|---|
| 1. Arithmetic | Every figure in 7.4 recomputes from its stated inputs. |
| 2. Statute | Every citation in 7.5 re-verified at the URL given, on the day of the rewrite. FA 2004 s.237B and s.237BA both re-read. |
| 3. Links | Zero broken internal links repo-wide. `related[]` and any in-copy links resolve. Add `/blog/nhs-pension-scheme-pays-doctors-deadlines` and `/nhs-pension`. |
| 4. Coverage | The 30 phrases in 7.1 placed; the checker names any that are not. |
| 5. Equity preservation | The 4 queries in 7.2 all still match. Any that stops matching is a named BLOCK with the diff line. |
| 6. Cluster coverage | Same matcher, the 7.1 input. Count required: 30 placed, 0 unplaced. |
| 7. Reconciliation balance | The 121 keywords land as: 5 already-covered, 30 assigned-and-placed, 86 deferred with a named destination (Corrections). 5 + 30 + 86 = 121. The ledger must balance or the gate fails. |
| 8. Competitor re-read | All **40** heading themes in 4.14 marked covered, declined-with-reason, or belongs-to-another-page. Undecided count must be **0**. The two 403 URLs (4.11, 4.12) are recorded as **fetch-failed, themes unknown**, which is a stated limitation, not a decision. |

### 7.7 Named factual corrections the rewrite must make
1. The 31 July deadline must be stated **with** the on-or-after-2-May revised-statement extension. Flat "the deadline is strict" language is a BLOCK.
2. The election-dies-when-all-benefits-are-taken limb must appear.
3. Any headline reduction figure must be visibly conditioned on **NPA 68 / 2015 scheme**, at the point the number is shown, not only in the note. 1995 (NPA 60) and 2008 (NPA 65) members must be told the number does not apply to their legacy benefits.
4. Any tier or band figure must be tagged **2026/27, from 1 April 2026** and must carry the §2.C warning that a band table can be corrected retrospectively within a year.
5. No page may state a lifetime allowance of £1,073,100. That is the LSDBA. The LTA is abolished (§2.B).

---

## 8. Stated expectation

**Engine and window.** Bing is the 14 to 28 day read; Google is the 28 to 90 day read (§9.6). This page has effectively no Google query-level presence (0 rows, 90d) and near-zero Bing presence (4 impressions, 1 click, 90d), so the expectation is stated as **first-appearance on named phrases**, not as a traffic lift.

**Baseline, with its command.** Bing `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/calculators/nhs-pension-scheme-pays)`, pulled 2026-08-26: **4 named queries, 4 impressions, 1 click**. Google GSC `searchanalytics.query` dims ['page','query'], 2026-05-28 to 2026-08-26: **0 rows**.

**What we expect.**
- **Bing, 14 to 28 days after deploy:** the named-query count on this URL rises from 4 to **at least 15**, with **at least 6** of them containing "contribution", "superannuation" or "salary sacrifice" (that is, drawn from the newly placed vocabulary rather than the existing Scheme Pays four). Impressions at least **40**. Clicks are not the measure at this volume.
- **Bing, 28 days:** at least **1** of the five Tier A peer-winnable phrases in 7.1 appears as a named query with a non-zero impression count.
- **Google, 28 to 90 days:** query-level rows on this URL move from 0 to **at least 5**. Given `medical` GSC coverage indexes roughly 16% of the corpus, a zero here at 90 days is informative but not by itself a failure.
- **Phrase coverage is the verdict, not total traffic** (§9.6 point 2). Total impressions rising while the 30 named phrases stay missing from the query set is recorded as **drift and a fail**.

**Failure trigger, written as a number, before the work (§9.6 point 3).**
> If Bing clicks on `/calculators/nhs-pension-scheme-pays` fall to **0** in a 28-day window after deploy, or the Bing named-query count for this URL is **below 8** at 28 days, or **any** of the four equity queries in section 2 stops appearing in `GetPageQueryStats` for this URL across two consecutive 28-day windows, **revert** to sha `b3d78c97e768645cca480dd350281ffa68c1faf9` and record the rollback reason on `blog_optimizations`.

**Tracker fields to populate at rewrite time** (`§9.6`, reuse, do not build): one `monitored_pages` row with both engines' baselines above; `blog_optimizations.target_keywords` set to the **30 phrases in 7.1**, not to the four we already rank for.

---

## Corrections to the dossier

1. **Topic size disagrees between the dossier and the data sheet, by a factor of nearly three.** Dossier §3 row 1 states this topic at **332 keywords / 448,550 volume / 91,230 peer-winnable / 294 of 332 missing**. The data sheet's regex extract for the same topic gives **121 keywords / 206,880 volume / 2,880 peer-winnable / 116 of 121 missing**. Both are dated 2026-08-26 and both come from `dataforseo_competitor_data`. The pack uses the **data sheet**, because the brief names it as the extract of record and it is the set the matcher will run against. The peer-winnable divergence is the more consequential half: 91,230 against 2,880 is not a rounding difference, and any prioritisation made on the dossier's figure is prioritising a set this pack does not contain. **Not harmonised. Flagged for the orchestrator.**
2. **Equity figures disagree.** Dossier §3 records this page as `B 1c/10i`. The data sheet's `GetPageQueryStats` pull, same date, gives **4 impressions, 1 click** across 4 named queries. Bing's page-level and query-level endpoints are known to disagree (the query breakdown is a subset), so 10 page-level impressions against 4 query-attributed impressions is plausible rather than contradictory, but the **grade test in §9.2 step 5 is written against impressions**, so the discrepancy should be resolved before any page in this cluster sits near the REFRAME/EXTEND boundary. This page is far from the boundary either way, so the grade stands.
3. **The topic regex fuses four subjects that are not one page.** The selection regex sweeps **Scheme Pays**, **NHS member contribution tiers / superannuation**, **salary sacrifice** and **death in service** into a single 121-keyword topic assigned to a Scheme Pays calculator. Salary sacrifice (roughly 61,000 of the 206,880 volume) and death in service (roughly 6,700) are distinct reader intents with distinct SERPs, held by distinct competitor URLs (4.1 and 4.4 respectively, neither of which mentions Scheme Pays). Forcing all four onto one calculator would produce a page that serves none of them and would breach §9.3's "coverage is additive to the specialist layer, never a replacement" by drowning the arithmetic that is our only real advantage. **Recommendation, recorded as a delta and not folded in:** place the two bounded blocks required by 7.1 Tier D, and queue **salary sacrifice and the NHS pension** and **NHS death in service benefits** as NO-PAGE candidates for a later pass. 86 phrasings are deferred on this basis; they are named by their families (salary sacrifice, death in service, added years, change of address, non-NHS/teachers/police comparators) rather than individually, and the count balances in 7.6 floor 7.
4. **"nhs pension change of address" (260 x 2) is a service-desk query, not a content query.** It reached the set through the `nhs pension (scheme )?change` limb of the regex, which was aimed at scheme *changes*. It should be an `excluded` row with reason code off-niche, not an `assigned` one. Included in the 86 deferred above; named here because it is a regex defect rather than a scope judgement, and the same limb will misfire on any future harvest.
5. **The dossier's §7 tie is understated in one direction.** It records the calculator and `/blog/nhs-pension-scheme-pays-doctors-deadlines` as tying on nine topics. The blog post is `status='flagged'` and on HOLD, which the dossier itself flags as "a question, not a clearance". Worth adding: the calculator currently does **not link to** that blog post at all (`related[]` holds two other URLs). Whatever the flag turns out to mean, the two pages tying on nine topics with no link between them is a live cannibalisation risk that the rewrite should close in the cheap direction, by adding the link from here.
