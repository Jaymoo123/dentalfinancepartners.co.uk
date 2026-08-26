# Medical: answer-pattern and language spec

**Site** medicalaccounts.co.uk · **Built** 2026-08-26 · **Method** `docs/_engines/REWRITE_PROGRAM.md` §9.11 (cluster level, once, before any page is written)
**Status** analysis and rules only. No page content was written or edited. Nothing committed, deployed or indexed. No monitor, alert or scheduled job created.
**Inherited by reference** by every per-page pack in this cluster. The editorial QA pass checks the drafted page against this file, not against the reviewer's taste.

**Evidence base.** Nine competitor pages read in full on 2026-08-26 across the three peer types: specialist firms (ramsaybrown.com, sial-accountants.co.uk, accountants4nhsdoctors.co.uk), publisher and directory hybrids (medicsmoney.co.uk x3, practiceindex.co.uk), and the institutional layer that owns the SERP but is not a rank target (bma.org.uk x3). Every claim below about how competitors write carries the URL it was read on. Our own corpus counts come from `Medical/web/content/` and are labelled as ours, never as market evidence.

---

## Part 1. The rules (writer's brief and QA checklist)

Every rule here is countable. A QA agent applies it without judgement. Rule IDs are stable, cite them in QA findings.

### A. Opening

| ID | Rule | How QA checks it |
|---|---|---|
| A1 | The direct answer to the page's dominant query appears within the **first 60 words of body copy**, before the first H2. | Count words from the first body word to the first sentence that states the answer. Fail above 60. |
| A2 | The **first sentence contains the market phrasing of the topic** (see Part 2 substitution table), not our internal phrasing. | String-match the first sentence against the page's primary market phrase. |
| A3 | No scene-setting opener. Banned openings: a hypothetical scenario, a rhetorical multiple-choice question, "In this blog we'll", "Navigating X is essential", any sentence whose subject is us. | Regex the first 2 sentences for the banned forms and for `we` / `our` as grammatical subject. |
| A4 | If the answer is a number, the number appears in the first 60 words. If the answer is genuinely conditional, the first sentence states the condition in the form "X if Y, Z if not", then the detail follows. | Fail if the first 60 words contain no figure and no explicit conditional on a page whose query asks "how much". |
| A5 | Opening length 40 to 90 words, then the first H2. No opening block over 120 words. | Word count to first H2. |

Measured against the market, this is a deliberate improvement rather than a copy. **Nobody in this niche does A1 well and that is the opening.** medicsmoney's contribution-rate page runs roughly **285 words before the employer rate appears** and opens "As NHS Doctors and other Healthcare professionals, the NHS Pension is an extremely valuable component of your total reward package. But there's one question we need to answer: how much does the NHS contribute to your pension? In this blog we'll provide the 2025/2026 contribution rates to answer this question." (https://medicsmoney.co.uk/how-much-does-the-nhs-contribute-to-my-pension/). practiceindex opens with a **150-word scenario** and a three-option rhetorical question, "You are in a meeting with your GP partners and the practice accountant to review last year's accounts. Do you: 1. feel an impending sense of doom 2. glaze over, or 3. fully understand the figures" (https://www.practiceindex.co.uk/gp/blog/explaining-gp-practice-accounts-part-one/). ramsaybrown opens on itself, "Navigating NHS pension rules is essential and often overwhelming. We help GPs, consultants and PCNs manage contributions, tax liabilities, and documentation with complete clarity." (https://ramsaybrown.com/service/nhs-superannuation-pensions/).

The one page in the sample that does open correctly is institutional. bma.org.uk leads with a one-line summary and a dated stamp, "A summary of contribution rates payable to your pension from you as an employee and your employer. Location: UK Audience: All doctors Updated: Tuesday 30 September 2025" (https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates), and its annual-allowance page reaches a definition by sentence two, "The annual allowance is a threshold which restricts the amount of pension savings you are allowed each year before tax charges apply." (https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance).

### B. Headings

| ID | Rule | How QA checks it |
|---|---|---|
| B1 | The H1 carries the **dominant query's word order verbatim**, taken from the page pack, not a paraphrase of it. | Exact substring test, case and punctuation normalised. |
| B2 | Every H2 is either a **question in the reader's words** or a **noun phrase containing a market phrase**. No abstract or clever headings ("The bigger picture", "Getting it right", "Key considerations"). | Each H2 must contain at least one phrase from the page's assigned keyword set, or start with What / How / When / Who / Can / Do / Is / Why / What if. |
| B3 | **Word-order coverage.** Where the pack lists multiple word orders of one idea, the page carries at least **two distinct orders**: one in an H2, one in an FAQ question or body sentence. | Count distinct listed orders present verbatim. Minimum 2. |
| B4 | Question rate: **50% to 75% of H2s are question-form**. Below 50% the page reads institutional, above 75% it reads like a generated FAQ dump. | Count question-form H2s over total H2s. |
| B5 | No heading is left with no body text under it. No trailing empty FAQ heading. | Every heading followed by 20+ words before the next heading. |
| B6 | H2 count 6 to 14 for a standard page. Nested H3 only where an H2 has 3 or more genuine sub-cases. | Count. |

The market's heading habit is question-form and first-person, and it is worth copying. bma.org.uk's locum GP page runs 29 headings of which the substantive ones are almost all reader-voice questions: "Can I pension locum work as a GP?", "How much do I pay?", "Who pays my employer contribution?", "I have incorrectly assessed my tier", "I am a GP partner and locum" (https://www.bma.org.uk/pay-and-contracts/pensions/being-a-member-of-a-pension-scheme/an-introduction-to-the-nhs-pension-scheme-for-locum-gps). Note the "I have..." and "I am..." forms: those are the reader's situation as a heading, and they match how a clinician actually searches. medicsmoney does the same, "When can I retire?", "How can I retire early? Can I buy additional pension? What's an ERRBO?" (https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/).

**Do not copy** bma.org.uk's fragment headings on its annual-allowance page, which include bare field labels lifted from a form: "Pension input start date", "Pension input end", "Annual allowance", "Pension input amount" (https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance). Those are readable only because the BMA owns the brand.

### C. Sentence and paragraph shape

| ID | Rule | How QA checks it |
|---|---|---|
| C1 | Mean sentence length **15 to 22 words**. No sentence over 40 words. | Compute. |
| C2 | Paragraphs **1 to 4 sentences**, maximum 75 words. No paragraph over 5 sentences. | Compute. |
| C3 | Second person throughout. Target **12 to 25 instances of "you" or "your" per 1,000 words**. | Count per 1,000. |
| C4 | First person plural ("we", "our", "us") **maximum 3 instances per 1,000 words**, and none in the opening block or in any H2. | Count. |
| C5 | Bulleted lists only for genuinely enumerable sets: rate bands, forms, deadlines, eligibility conditions, document checklists. **A sequence of reasoning is prose.** Maximum 3 bulleted lists per page, maximum 8 items each. | Count lists; flag any list whose items are full sentences of argument rather than items. |
| C6 | No hedging stacks. Banned: "it is important to note", "it is worth remembering", "as you may be aware", "in today's complex landscape", "the reality is". | String search. |

### D. Register

| ID | Rule | How QA checks it |
|---|---|---|
| D1 | Authoritative and specific. Every claim either carries a figure, a date, a form name, a deadline, or a named rule. **No paragraph of pure generality.** | Flag any paragraph of 40+ words containing no number, date, proper noun or form name. |
| D2 | Never chatty. No exclamation marks, no rhetorical questions in body copy (questions belong in headings), no direct address of the reader's feelings ("daunting", "overwhelming", "sense of doom", "don't panic"). | String and punctuation search. |
| D3 | Never salesy. No superlative self-description ("leading", "trusted", "award-winning", "expert team"), no urgency, no "get in touch today" inside body copy. One CTA at the end of the page only, wording as per the site's existing component, never invented inline. | String search plus count of CTA phrases in body. |
| D4 | Write to a clinician, not to a finance professional. Every finance or tax term of art gets a **six to fifteen word plain gloss on first use**, in the same sentence or the sentence immediately after. NHS-scheme terms get the same treatment (see E). | Every term on the gloss list must have a gloss within 25 words of its first occurrence. |
| D5 | No condescension. The gloss explains the finance, never the medicine, and never implies the reader is bad with money. Banned framings: "what medical school didn't teach you", "doctors are notoriously bad at". | String search. |

D2 and D3 are the two places the peer set is weakest and where the differentiation sits. ramsaybrown's NHS pension service page carries CTAs at three separate points, "Consult Us Today", "Book A Consultation", "Download our NHS Pension Management Guide", and its headings are mostly about itself: "Why Choose The NHS Pension Scheme Experts At Ramsay Brown?", "What Our Clients Say" (https://ramsaybrown.com/service/nhs-superannuation-pensions/). sial-accountants extends a clinical metaphor into its selling copy, "knowing how to recognise the issues and prescribe the most effective treatment is something best left to a specialist" (https://www.sial-accountants.co.uk/services/medical-accountants-for-doctors/). D5's banned framing is lifted verbatim from a live competitor heading, "What medical school didn't teach us about money" (https://medicsmoney.co.uk/nhs-pension-tax-charges-are-you-affected-by-annual-allowance-tapered-annual-allowance-and-how-to-calculate-your-threshold-and-adjusted-income/).

The one thing to copy outright is accountants4nhsdoctors' declarative, non-boastful subheading style: "A PAYE salary does not always mean a simple tax position", "Annual allowance tax can arise even when salary is taxed under PAYE", "The hidden tax issue for many doctors is not income. It is pension growth" (https://www.accountants4nhsdoctors.co.uk/). Those are claims, dense, short, and none of them is about the firm.

### E. NHS jargon, introduction rules

Every one of these terms is glossed on first use on every page that uses it. The page cannot assume the reader has read another page. The gloss text below is the minimum content, not fixed wording, and must be re-expressed per page so E-rules do not create cross-post sameness (see H2).

| ID | Term | What the first-use gloss must contain |
|---|---|---|
| E1 | **PCSE** | Expand to Primary Care Support England on first use, plus what it does in one clause (administers GP pension records and payments in England), plus the nation caveat (local health board in Wales, separate arrangements in Scotland and Northern Ireland). |
| E2 | **Type 1 and Type 2** | Say what each one *is a person doing*, not what the form is called: Type 1 is a GP provider or partner, Type 2 is a salaried or employed GP. Never use the bare digits without the noun on first use. |
| E3 | **Forms A and B** | Name what they are for (recording and paying pension contributions on locum GP earnings) and who they go to, in the same sentence. Never introduce them as a bare form code. |
| E4 | **Scheme Pays** | Say what it does before what it is called: the scheme settles the annual allowance charge and reduces the pension in return. State that the reduction carries an interest cost. Distinguish mandatory from voluntary where the page's topic touches the threshold. |
| E5 | **Tiered contributions** | Say the rate depends on the pay band and the bands change, with the effective date of the table shown. Pair with "member contribution rate" on first use so both phrasings are present. |
| E6 | **McCloud** | Introduce as "the McCloud remedy" with one clause on what it did (moved affected members' 2015-to-2022 service back into their legacy section), plus the artefact it produces for the reader (a remediable pension savings statement). |
| E7 | **Annual allowance / pension input amount** | Gloss pension input amount as growth in the value of the pension over the year, not as a contribution. This is the single most common misreading by clinicians and every annual-allowance page must correct it explicitly. |
| E8 | **Superannuation** | Use once per page as an explicit synonym for NHS pension contributions, glossed as such, because it is the NHS payslip word and the market searches it (see Part 2). |
| E9 | **Annualisation** | Where a locum or part-time page touches tiering, name annualisation and gloss it in one clause. Our corpus contains the concept and not the word. |

The market handles these badly and that is the opening. bma.org.uk introduces Forms A and B with no gloss at all, "the decision to pension is effected by the completion of locum forms A and B", and PCSE only as an acronym inside a rate sentence, "You need to forward this amount (currently limited to 14.38% of the 90% pensionable amount), plus your own contribution, to PCSE (local health board in Wales) via forms A and B" (https://www.bma.org.uk/pay-and-contracts/pensions/being-a-member-of-a-pension-scheme/an-introduction-to-the-nhs-pension-scheme-for-locum-gps). medicsmoney introduces Type 1 and Type 2 parenthetically, "(Type 1) or a salaried GP (Type 2)", presents its six-tier contribution table with no conceptual introduction at all, and mentions Scheme Pays only as link text (https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/). bma.org.uk's annual-allowance page names McCloud with no definition (https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance). ramsaybrown uses "RPSS" as a heading, "Remediable Pension Savings Statements (RPSS)", and then defines it only inside its FAQ (https://ramsaybrown.com/service/nhs-superannuation-pensions/).

The one competitor that solves the jargon problem does it with a **glossary block**, not inline: practiceindex closes Part 1 with eight defined terms, accruals basis, balance sheet, drawings, partners' capital accounts, partners' current accounts, profit and loss account, working capital (https://www.practiceindex.co.uk/gp/blog/explaining-gp-practice-accounts-part-one/). **Do not copy the glossary block.** A terminal glossary defers the explanation past the point of confusion and gets skipped. Gloss inline, at first use, per E1 to E9.

### F. Figures and dating

| ID | Rule | How QA checks it |
|---|---|---|
| F1 | Every rate, threshold, band or allowance carries its **tax year or effective date within the same sentence or the table caption**. Format: "2026/27" for tax years, "from 1 April 2026" for NHS scheme dates. Never a bare figure. | Every numeric with a % or £ must have a year or date within the sentence or in its table caption. |
| F2 | The **live year leads**. One current year is stated in full; historical rates are subordinated into a single clause, a sentence, or one table row labelled as prior. Never a chronological march through four years of rates in body prose. | Count distinct tax years given their own paragraph or heading. Maximum 1. |
| F3 | **NHS scheme dates and tax years are never conflated.** NHS member contribution bands change on 1 April, the tax year starts 6 April. Any page touching both states the distinction once. | Flag any sentence that dates a contribution band with "6 April" or an allowance with "1 April". |
| F4 | Every load-bearing figure traces to `docs/medical/house_positions.md`. Nothing is written from memory or inferred from a competitor page. | Cross-check against house positions in the factual QA track. |
| F5 | **No figure may be stated for the two UNVERIFIED items**: the GMC annual retention fee, and the Global Sum per weighted patient or QOF point value. Pages may state that the GMC fee is deductible. Pages may say Global Sum and QOF values were uplifted for 2026/27 and direct the reader to the Statement of Financial Entitlements Directions 2026. | String search for a £ or numeric within 30 words of "GMC" plus "fee", "global sum", "weighted patient", "QOF point". Any hit is a hard fail. |
| F6 | **No fabricated statistics of any kind.** No invented survey results, no "most doctors", no "we find that around X%", no percentage without a named source. Client-outcome numbers are banned outright. | Flag every percentage and every quantified generalisation without an adjacent named source. |
| F7 | Where a figure is genuinely uncertain or annually uplifted, say so and name where the reader confirms it. Absence of a figure is stated, never smoothed over. | Manual, factual QA track. |

F2 is measured against a live failure. bma.org.uk's contribution-rates page stacks four dated regimes, "Pre October 2022", "Phase 1 Contribution rate from 1 October 2022", "Phase 2 Contribution rate", plus tables "from 1 April 2025" and per-nation variants, which makes it near unreadable for a reader who only wants this year's rate (https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates). The staleness risk is real too: medicsmoney's tapered-allowance article still opens on the March 2020 budget and carries its own admission, "We will update this article very soon. Much of it remains relevant" (https://medicsmoney.co.uk/nhs-pension-tax-charges-are-you-affected-by-annual-allowance-tapered-annual-allowance-and-how-to-calculate-your-threshold-and-adjusted-income/). Anchoring on one live year is what stops that.

### G. Worked examples

**The finding that matters: not one of the nine competitor pages read carries a worked example with figures.** ramsaybrown, sial-accountants, accountants4nhsdoctors, practiceindex, both bma.org.uk pension pages and all three medicsmoney pages return "none" on worked examples (URLs as cited above). medicsmoney's own guide has two comparison tables and zero numerical scenarios (https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/). This is the widest quality gap in the niche and it is cheap to take.

| ID | Rule | How QA checks it |
|---|---|---|
| G1 | Every page whose topic involves a calculation, a threshold, a taper or a band carries **exactly one worked example**. Pages that are purely procedural (which form, which deadline, who to contact) carry none. | Presence test by topic type from the page pack. |
| G2 | The worked example sits **immediately after the H2 that states the rule it demonstrates**, never in a terminal block and never before the rule. | Position check. |
| G3 | A worked example contains, in order: a one-line named persona with a role and a rounded figure, the inputs, the arithmetic shown step by step, the result, and one sentence on what changes the answer. **Five components, all five required.** | Component checklist. |
| G4 | The persona is a **role and an initial or a first name only** and is explicitly illustrative. "A salaried GP on £95,000" or "Dr A, a Type 2 GP". Never a real or realistic named individual, never a client, never a testimonial. | String check for surnames, practice names, locations tied to a person. |
| G5 | Figures in the example are **rounded and clearly illustrative** and every rate used traces to house positions. The example never introduces a rate the body has not already stated with its year. | Cross-check rates in example against rates in body. |
| G6 | **The heading above the example must not be the words "Worked example"**, and the example must not open with a "Worked example:" prefix. The heading states the question the example answers. Introduce with a natural sentence, for instance "Take a salaried GP earning £95,000 in 2026/27." | String search for `Worked example` as a heading or line-initial prefix. Hard fail. Note: our corpus currently has 13 files containing the string. |
| G7 | Length 80 to 200 words. An example longer than 200 words is a section pretending to be an example. | Word count. |

### H. FAQs

| ID | Rule | How QA checks it |
|---|---|---|
| H1 | **4 to 8 FAQ questions.** Below 4 the block is decorative, above 8 it is a keyword dump. | Count. |
| H2 | Each question is a **distinct market phrasing** from the page's assigned keyword set, in the market's word order, and **not already used verbatim as an H2** on the same page. | Cross-check against the H2 list and the keyword set. |
| H3 | Each answer is **40 to 110 words**, opens with the direct answer in its first clause, and contains at least one figure, date, form name or named rule. | Word count plus first-clause check plus D1 test. |
| H4 | No FAQ question may be answered "it depends" without the two branches being stated in the same answer. | Flag "depends" without a following "if". |
| H5 | No empty trailing FAQ heading, no FAQ heading with no answer, no duplicated question. | Structural check. |
| H6 | FAQ answers do not repeat body sentences verbatim. Overlap above 60% of an answer's words with any body paragraph is a fail. | Similarity check. |

The peer set splits cleanly and confirms the shape. The commercial and service pages carry FAQ blocks: sial-accountants 5 questions (https://www.sial-accountants.co.uk/services/medical-accountants-for-doctors/), ramsaybrown 9 (https://ramsaybrown.com/service/nhs-superannuation-pensions/), medicsmoney's scheme guide 11 (https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/). The institutional pages carry none, because their H2 set already is the FAQ: bma.org.uk's contribution-rates and locum GP pages have zero FAQ sections and 7 and 29 headings respectively (URLs above). Our 4-to-8 band sits between medicsmoney's 11, which duplicates its own body, and the 5 of sial-accountants, which is thin.

### I. Binding estate copy rules, all hard fails

| ID | Rule | How QA checks it |
|---|---|---|
| I1 | **No em-dashes anywhere in user-facing copy**, including frontmatter, metaTitle, metaDescription, alt text, headings, tables and FAQ answers. Use commas, parentheses, full stops, semicolons. En-dashes are permitted only inside numeric ranges such as 2026–27. | Search for the em-dash character in every user-facing field. Any hit is a hard fail. |
| I2 | **No named experts and no personal credentials.** No author bylines, no "reviewed by", no "our head of medical", no qualifications after a name, no photos of people presented as our team, no first-person expert voice. Authority on this site is faceless and institutional. | Search for name-plus-credential patterns, `About the author`, `Written by`, `Reviewed by`, ACA, ACCA, FCA, CTA, ATT as post-nominals. |
| I3 | **No regulated-activity claims.** No investment advice, no pension transfer advice, no insurance recommendation, no "we advise you to invest / transfer / opt out". Pages explain how rules work and what the reader's options are, and point at a regulated adviser where advice is needed. | Search for advice verbs in the first person plus regulated nouns. |
| I4 | **Anonymised social proof only.** No named clients, no named practices, no identifiable locations tied to a client, no logos. Role plus rounded scale only. | Search for testimonial blocks and proper nouns in them. |
| I5 | **No pricing anywhere.** No fees, no fee ranges, no "from £X per month", no fee comparison. | Currency-plus-fee-noun search. |
| I6 | **No fabricated statistics.** Duplicate of F6, restated here because it is the most commonly broken rule under time pressure. | As F6. |
| I7 | **No interruptive UI.** No popup, modal, toast, banner, exit-intent, sticky bar, countdown, newsletter interstitial. Nothing new that interrupts the reader may be added by a page. | Component diff. |
| I8 | **No comparative or superlative claims about us** against a named competitor or the profession at large. | String search. |

I2 and I4 are both live in the peer set and both are off limits for us. medicsmoney bylines its articles with a named clinician, "Tommy (Dr Tommy Perkins, GP Partner)", plus a credited contributor, and runs an "About the author" section (https://medicsmoney.co.uk/nhs-pension-tax-charges-are-you-affected-by-annual-allowance-tapered-annual-allowance-and-how-to-calculate-your-threshold-and-adjusted-income/); its directory page names four individuals (https://medicsmoney.co.uk/medical-accountant-search/). We cannot do that and must not imitate it. What we can imitate is the anonymised form sial-accountants uses, "DR D. K., General Practitioner, London NW7" (https://www.sial-accountants.co.uk/services/medical-accountants-for-doctors/), and the institutional bylining practiceindex uses, where the author is an organisation, "AISMA" (https://www.practiceindex.co.uk/gp/blog/explaining-gp-practice-accounts-part-one/). Body-level authority for us comes from figures, dates, form names and statutory references, per D1, not from a person. Note also that accountants4nhsdoctors, the most directly winnable peer in the universe, ships roughly 2,850 words with **no named staff and no credentials at all** (https://www.accountants4nhsdoctors.co.uk/), which is direct evidence that faceless works in this niche.

### J. AI tells this estate polices at QA, all hard fails

| ID | Tell | How QA checks it |
|---|---|---|
| J1 | **Cross-post sameness.** No two pages in the batch share an opening sentence pattern, a gloss sentence, a transition, a CTA sentence or an FAQ answer. Especially watch the E1 to E9 glosses, which are the highest sameness risk in this cluster because every page needs them. | Pairwise similarity across the batch on openings, glosses and FAQ answers. |
| J2 | **Pipeline-artefact leakage.** No "verify at build", no inline house-position codes such as "(HP12)", no "TODO", no "[source]", no bracketed instructions to the writer, no placeholder figures such as "£X". | String search. |
| J3 | **Empty trailing FAQ headings.** Duplicate of H5. | Structural check. |
| J4 | **The "Worked example:" heading prefix.** Duplicate of G6. | String search. |
| J5 | **Bulleted ladders where prose is correct.** A list whose items are clauses of one argument, or a list of three items each one sentence long that reads as a paragraph chopped up. | Flag lists whose items average over 15 words or contain a connective at item start. |
| J6 | **Triadic rhythm.** Repeated three-item constructions ("clear, simple and correct"), repeated "not only X but Y", repeated "It is not X. It is Y." Maximum 2 per page of any one construction. | Count constructions. |
| J7 | **Symmetrical section lengths.** Sections all landing within 10% of each other in word count reads as generated. Variance is expected in real writing. | Coefficient of variation across section word counts must exceed 0.2. |
| J8 | **Hollow transitions.** "Let's dive in", "That said", "Ultimately", "At the end of the day", "In conclusion". | String search. |
| J9 | **Restated-question openers.** An FAQ answer or section that begins by restating its own heading. | First clause versus heading overlap. |

### K. What a page must NOT do to the specialist depth

The specialist tail is the differentiator. 97 of our 105 in-scope pages match no consensus topic at all (`docs/medical/cluster_dossier_2026-08-26.md` §9), and that layer is exactly what no peer in the universe has. **Coverage is additive to it, never a replacement.**

| ID | Rule | How QA checks it |
|---|---|---|
| K1 | **No net deletion of specialist content.** On any EXTEND or REFRAME page, the drafted version's count of statutory references, form names, technical terms and figures must be **greater than or equal to** the current live page's. | Count both. Any decrease is a hard fail requiring named justification. |
| K2 | On an **EXTEND** page, metaTitle, H1 and the order of existing H2s are frozen. New material is added as new H2 sections only. | Diff against live. |
| K3 | Plain-language material goes **above** the specialist material, never in place of it. A page gains a primer layer at the top and keeps its depth below. | Structural position check. |
| K4 | **No page is collapsed, redirected or merged.** Where two of our pages overlap (dossier §7), they are differentiated in scope, not consolidated. The calculator owns the tool intent, the guide owns the explanation, the blog post owns the worked case. | No redirect entries, no deletions. |
| K5 | A simplification never becomes an inaccuracy. If plain English cannot carry the rule, the page states the rule precisely and glosses it, per D4. | Factual QA track. |
| K6 | The primer layer is prose, not inserted keywords. A section that exists only to hold a phrase is a fail. | Editorial QA judgement, recorded with a reason. |

### L. Length and shape targets

| ID | Rule | Basis |
|---|---|---|
| L1 | Primer and coverage pages: **900 to 1,600 words.** | Competitor median in the sample. bma.org.uk annual allowance ~1,450 and contribution rates ~1,100, ramsaybrown ~1,200, sial-accountants ~1,400 to 1,600, medicsmoney contributions ~1,850 (URLs above). |
| L2 | Hub and deep guide pages: **2,000 to 3,200 words.** | medicsmoney scheme guide ~2,400, accountants4nhsdoctors ~2,850 (URLs above). Only bma.org.uk's locum page runs to ~4,800 and it is a reference document, not a rank target we can take. |
| L3 | **Word count is not a lever.** Do not pad to hit a band. If the topic is answered in 900 words, ship 900. The band exists to catch thin pages and bloated ones, not to set a target. | `REWRITE_PROGRAM.md` §9.12, corroborated twice. |
| L4 | At least **one table** on any page carrying bands, tiers, rates by nation, deadlines or a comparison. Tables carry a caption stating the effective date, per F1. | Every peer in the sample that presents rates uses a table. |

---

## Part 2. Vocabulary substitutions

**This is the highest-value section.** 1,141 of 1,242 market phrasings appear nowhere in our 105-page corpus (dossier §1). The gap is vocabulary, not subject matter: we have the right pages and they carry the wrong words.

**How to use this table.** The "market phrasing" column is what the writer must place verbatim in an H1, an H2, an FAQ question or a body sentence. The "our current word" column is what our corpus says instead. Both survive. Nothing in this table is a replacement instruction: the market phrase is added, and the precise term stays wherever precision matters. Volumes and best-held positions are from the dossier §5 harvest (DataForSEO, UK, 2026-08-26). Our corpus counts are file counts from `Medical/web/content/`, measured 2026-08-26.

### 2a. The word-order family (one idea, four searches)

| Market phrasing | Volume | Held by, best pos | In our corpus | Rule |
|---|---|---|---|---|
| nhs pension changes | 27,100 | bma.org.uk, 8 | **0 files** | B3 applies. The page that owns this idea must carry at least two of these four orders. |
| pension changes nhs | 27,100 | bma.org.uk, 8 | **0 files** | |
| changes to nhs pension scheme | 27,100 | bma.org.uk, 9 | **0 files** | |
| nhs pension scheme changes | 27,100 | bma.org.uk, 16 | **0 files** | |

Our corpus has one file containing "pension changes" in any form. This is one H2 and one FAQ question away from being fixed, and it is a 27,100-volume idea.

### 2b. Contributions, the single clearest failure

| Market phrasing | Volume | Held by, best pos | In our corpus | Our word instead |
|---|---|---|---|---|
| nhs pension scheme contributions | 9,900 | bma.org.uk, 5 | **0 files** | "pension contributions" (42 files) |
| pension nhs contribution | 9,900 | bma.org.uk, 7 | 0 | as above |
| nhs pensions contributions | 9,900 | bma.org.uk, 6 | 0 | as above |
| nhs superannuation contribution rates | 1,900 | bma.org.uk, 4 | 0 | "tiered contribution" (4 files), "superannuation" (2 files) |
| nhs pensions contribution rates | 1,600 | bma.org.uk, 4 | 0 | "contribution rates" appears in **1 file** |
| pension scheme employer contribution | 4,400 | bma.org.uk, 21 | 0 | "pensionable pay" (26 files) |

We own `/calculators/nhs-superannuation-tiered-contribution`, which is exactly the right page, and it does not contain the phrase "NHS pension scheme contributions". The market's own terms for this table, taken from bma.org.uk, are "pensionable pay", "contribution rate", "employee contribution tiers", "actual pensionable pay" (https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates); medicsmoney uses "pensionable pay" and "Employer Contribution Rate" and does **not** use "superannuation" at all (https://medicsmoney.co.uk/how-much-does-the-nhs-contribute-to-my-pension/). Per E8 we carry "superannuation" anyway because it is the payslip word and it has 1,900 volume behind it.

### 2c. The commercial acquisition vocabulary

Our word is "gp accountant <city>" (20 files). The market's is not.

| Market phrasing | In our corpus | Note |
|---|---|---|
| healthcare accountants | **0 files** | The head of the highest-confidence topic on the whole map, 24 of 27 domains, 10,110 volume (dossier §4 row 1). |
| healthcare accountants near me | 0 | The commercial term. NO-PAGE. |
| accountants for doctors | **0 files** | medicsmoney's directory uses "specialist accountant for doctors", "specialist medical accountants", "medical accountants", "medical advisers" interchangeably on one page (https://medicsmoney.co.uk/medical-accountant-search/). |
| accountant for medical professionals | 0 | |
| medic accountants | 0 | |
| medical accountants | 82 files | The one commercial phrase we do carry. |

sial-accountants' audience vocabulary on a single service page runs "doctors", "GPs", "medical practices", "healthcare professionals", "NHS doctors", "consultants", "registrars", "opticians", "pharmacists", "dentists" (https://www.sial-accountants.co.uk/services/medical-accountants-for-doctors/). Breadth of audience noun is normal in this niche and we are narrow. Note the `allied_health` lane in `sites/medical.discovery.json` exists for exactly the pharmacist and veterinary terms (dossier §4 rows 9 and 10) and has no page.

**Caution on "consultant".** Dossier §8 flags seven screened topics totalling 6,450 volume where "consultant" means a tax adviser to Google and a hospital doctor to us. Any page using "consultant" in the clinical sense must qualify it on first use ("hospital consultant", "consultant in private practice") so the page does not drift into the tax-adviser SERP.

### 2d. Scheme mechanics the market names and we do not

| Market phrasing | Volume | In our corpus | Note |
|---|---|---|---|
| pension opt out / nhs pension opt out / opting out of nhs pension / nhs pension opt out form | 20,260 family | "opt out" 1 file, "opting out" 2 files | bma.org.uk holds positions 4 to 9 across the whole family. Zero peer-winnable on Google, and on a site where Bing out-clicks Google 3.4x that is not a reason to skip it (dossier §4 row 11). |
| nhs pension phone number / contact number / contact address / telephone number | 4,400 each | 0 | Administrative-contact intent. Section on `/nhs-pension`. |
| nhs pension website | 1,300 | 0 | |
| death in service | 3,490 | **0 files** | We have no page containing the phrase. |
| ill health retirement | 1,000 | **0 files** | |
| retire and return | 760 | **0 files** | |
| refund of contributions / nhs pension refund form | 3,600 | **0 files** | RF12. |
| added years | 280 | 0 | |
| additional pension / AVCs | 5,390 | "additional pension" 1 file | medicsmoney groups this with early retirement and ERRBO in one heading, "How can I retire early? Can I buy additional pension? What's an ERRBO?" (https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/). Our corpus has ERRBO in 1 file. |
| total reward statement | n/a | **0 files** | ramsaybrown gives it a whole page (https://ramsaybrown.com/updated-total-rewards-statements/). It is the artefact the reader is holding when they search. |
| RPSS / remediable pension savings statement | n/a | "RPSS" 0 files, "remediable" 2 files | ramsaybrown uses RPSS as a service heading (https://ramsaybrown.com/service/nhs-superannuation-pensions/). Per E6 we expand it, but we must carry the acronym too. |
| annualisation | n/a | **0 files** | We have the concept. The word is what a locum searches after a tier query. |
| abatement of pension | 940 | 2 files | |

### 2e. Allowance vocabulary

| Market phrasing | Volume | In our corpus | Our word instead |
|---|---|---|---|
| adjustable net income / adjusted net income | 3,600 to 7,210 | thin | We use "threshold income" and "adjusted income". The market also searches the wrong-but-common "adjustable net income" (medicsmoney holds pos 38). Carry the correct term as the H2 and the common misphrasing in an FAQ question, never as a factual assertion. |
| pension lifetime allowance / lifetime allowance pension | 4,400 | present but not in both orders | B3 applies. |
| nhs pension fund calculator | 6,600 | 0 | Tool intent. |
| pension input amount | n/a | 40 files | We are strong here. Per E7 it still needs its gloss on every page: growth, not contributions. |
| pension savings statement | n/a | 8 files | Underused relative to "pension input amount". The reader receives a statement; they do not receive an input amount. |

### 2f. Expenses and reliefs

| Market phrasing | Volume | In our corpus | Note |
|---|---|---|---|
| uniform tax rebate / work uniform tax refund / uniform tax relief / tax relief on work uniform / uniform tax allowance | 26,880 family | 0 | Five word orders of one idea (dossier §4 row 4). taxqube.co.uk holds it at positions 59 to 87, which is weak enough to take. |
| nhs mileage allowance / mileage tax claim | 2,270 | present under other wording | Rates per F4 and house positions: 55p first 10,000 miles for 2026/27. |
| how much is maternity allowance | 9,490 | 0 | Doctor-specific angle. |
| gmc revalidation | 1,400 | 0 | Note F5: no fee figure. |

### 2g. GP practice income

| Market phrasing | In our corpus | Note |
|---|---|---|
| pcse | 25 files | Strong. Per E1 it still expands on first use every time. |
| global sum | 36 files | Strong on the word. F5 blocks any per-weighted-patient figure. |
| carr-hill | 32 files | Strong. |
| qof point | 9 files | `/blog/qof-income-gp-practice-accounting-explained` earns 12 Bing clicks and is missing 7 of its topic's 7 phrasings (dossier §3). F5 blocks any point-value figure. |
| what is a gms contract / apms contract | thin | 1,180 volume, section prescription. |

**Two pages to look at first.** `/blog/gp-practice-income-pcse-statement-reconciliation` earns 17 Bing clicks from 261 impressions and zero Google clicks, with 9 of 9 phrasings missing. `/blog/qof-income-gp-practice-accounting-explained` is the same shape at 12 Bing clicks and 7 of 7 missing. Both are EXTEND, so K2 applies: additive only.

---

## Part 3. Do not copy

Observed on live competitor pages, deliberately declined, with the reason.

| Do not copy | Seen at | Why not |
|---|---|---|
| Scenario or rhetorical-question openers | https://www.practiceindex.co.uk/gp/blog/explaining-gp-practice-accounts-part-one/ | Violates A1 and A3. 150 words before substance. |
| "In this blog we'll..." throat-clearing | https://medicsmoney.co.uk/how-much-does-the-nhs-contribute-to-my-pension/ | 285 words to the number. Violates A1. |
| Opening on ourselves | https://ramsaybrown.com/service/nhs-superannuation-pensions/ | Violates A3 and D3. |
| Named clinician bylines and "About the author" | https://medicsmoney.co.uk/nhs-pension-tax-charges-are-you-affected-by-annual-allowance-tapered-annual-allowance-and-how-to-calculate-your-threshold-and-adjusted-income/ | Violates I2. Authority here is faceless. |
| "What medical school didn't teach us about money" framing | same URL as above | Violates D5. |
| Three CTAs inside body copy | https://ramsaybrown.com/service/nhs-superannuation-pensions/ | Violates D3 and I7. |
| Clinical metaphor as sales copy ("prescribe the most effective treatment") | https://www.sial-accountants.co.uk/services/medical-accountants-for-doctors/ | Violates D3. Reads as condescension to a clinician. |
| A terminal glossary block | https://www.practiceindex.co.uk/gp/blog/explaining-gp-practice-accounts-part-one/ | Defers the explanation past the point of confusion. Gloss inline per E1 to E9. |
| Bare form-field headings ("Pension input end") | https://www.bma.org.uk/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance | Violates B2. Legible only on BMA brand equity. |
| Four dated rate regimes stacked in one page | https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates | Violates F2. |
| Leaving a stale-article notice in place of an update | https://medicsmoney.co.uk/nhs-pension-tax-charges-are-you-affected-by-annual-allowance-tapered-annual-allowance-and-how-to-calculate-your-threshold-and-adjusted-income/ | Their own text admits it. F1 and F2 exist to prevent it. |
| Acronym-first jargon (RPSS, PCSE, forms A and B, McCloud) | https://ramsaybrown.com/service/nhs-superannuation-pensions/ , https://www.bma.org.uk/pay-and-contracts/pensions/being-a-member-of-a-pension-scheme/an-introduction-to-the-nhs-pension-scheme-for-locum-gps | Violates D4 and E1 to E9. The single biggest reader-facing weakness in the niche. |
| 11-question FAQ blocks that restate the body | https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/ | Violates H1 and H6. |
| 4,800-word reference documents | https://www.bma.org.uk/pay-and-contracts/pensions/being-a-member-of-a-pension-scheme/an-introduction-to-the-nhs-pension-scheme-for-locum-gps | Violates L2. Length is not the lever and this page ranks on brand. |

**Copy outright:** reader-voice situation headings, "I have incorrectly assessed my tier", "I am a GP partner and locum" (https://www.bma.org.uk/pay-and-contracts/pensions/being-a-member-of-a-pension-scheme/an-introduction-to-the-nhs-pension-scheme-for-locum-gps); short declarative claim subheadings, "A PAYE salary does not always mean a simple tax position", "The hidden tax issue for many doctors is not income. It is pension growth" (https://www.accountants4nhsdoctors.co.uk/); and the dated summary stamp at the top of a rates page (https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates).

---

## Part 4. Where this spec contradicts or extends the dossier

Stated so the contradictions are visible rather than silently resolved.

1. **The dossier's §11.2 limitation is now partly closed.** It records "no competitor page has been fetched". Nine have, listed above. This is not a §9.10 teardown, which is per-domain and crawl-based, and it does not produce a heading union or a coverage checklist. The teardown remains unbuilt.

2. **The dossier reads the market as an NHS-pension map, which holds, but the peer set does not compete on pension depth.** The peers that rank commercially are thin: ramsaybrown's NHS pension service page is roughly 1,200 words with no worked example and no figures, sial-accountants roughly 1,400 to 1,600 with none either (URLs above). The pension depth belongs to bma.org.uk and nhsbsa.nhs.uk, which are the non-peer institutional layer. So the competitive picture is sharper than "we are on the wrong layer": the plain-language pension layer is held by institutions we cannot outrank on brand, while the peers we can outrank hold the same slots with thin service pages. That argues for taking peer slots with pages that are plain-language **and** substantive, which is exactly what A1 plus G1 plus D1 produce, and it means the primer layer is not a race to the bottom.

3. **Worked examples are a clear differentiator and the dossier does not mention this.** Zero of nine competitor pages carry one. Our corpus already contains the string "Worked example" in 13 files, which means we have the habit and, per G6, the wrong label on it.

4. **bma.org.uk is a vocabulary source and a heading-pattern source, not just a blocked SERP.** The dossier treats it as the domain holding unwinnable slots and as the largest supplier of missing vocabulary. Its locum GP page is additionally the best model in the sample for reader-voice headings. Read it for phrasing, never for length, and never for jargon handling.

5. **One measured habit runs counter to the assumption that we should simplify.** accountants4nhsdoctors, the most directly winnable peer in the universe, is the longest peer page in the sample at roughly 2,850 words with 38 headings and no named staff. Winnability here does not correlate with brevity. L3 stands: length is not the lever, and this page is evidence that a dense, faceless, heading-rich page competes.

6. **Not measured, and stated as a gap.** No quantitative probe per §9.11 half 1 was run: no automated strip-and-measure of sentence length, Flesch reading ease, second-person rate or statute density across a matched set of our pages and theirs. The C-band and D-band targets in Part 1 are therefore derived from the read pages and from estate convention, not from a computed distribution. Four peer pages returned 403 or 404 to automated fetching (hawsons.co.uk, nhsbsa.nhs.uk, and two URL guesses that do not exist), so an automated probe would need a different fetch path. Running the probe would sharpen C1, C3 and C4 and would either confirm or move those bands. It is the cheapest extension of this spec.

---

## Part 5. QA runsheet

The editorial QA agent runs these in order and reports per rule ID. A page fails the gate if any hard fail is present.

**Hard fails, no exceptions:** F5 (UNVERIFIED figures), F6 and I6 (fabricated statistics), I1 (em-dash), I2 (named expert or credential), I3 (regulated-activity claim), I4 (named client), I5 (pricing), I7 (interruptive UI), G6 and J4 ("Worked example" label), J2 (pipeline artefact), H5 and J3 (empty FAQ heading), K1 (net loss of specialist depth), K4 (collapse or redirect).

**Counted rules, reported with the number:** A1, A5, B4, B6, C1, C2, C3, C4, C5, G7, H1, H3, J7, L1, L2.

**Coverage rules, reported with the list of what is missing:** B1, B3, E1 to E9, and the page's assigned market phrasings from Part 2.

**Judgement rules, reported with a recorded reason:** D5, K5, K6, J1.


## Coordinator rulings during batch 1 (2026-08-26), binding on later batches

1. **The FAQ band of 4 to 8 governs a NEWLY AUTHORED set only.** Existing substantive FAQ entries are never
   deleted to hit the count. Deleting depth to satisfy a style band is a net loss and breaks the standing rule
   that coverage is additive to depth. Raise a finding only where a new set was authored above the band, or
   where an entry is padding, duplicates an H2, or repeats another entry.
2. **On EXTEND pages the structural bands are scored against the EXTEND reality.** A frozen structure can make
   the question-form heading rate and the FAQ count unreachable. That is a consequence of the grade, not a defect,
   and a writer must never contort a page to reach a band the grade forbids.
3. **EXTEND restricts structure and positioning, never truth.** Factual corrections inside frozen copy are
   required, not merely permitted, and are noted in a one-line addendum so QA does not read them as scope creep.
4. **The no-pricing rule covers OUR fees only.** Third-party amounts that are facts about the reader's position
   (a statutory penalty, an HMRC interest rate, a scheme reimbursement cap, a statutory allowance) are publishable
   and often the most useful thing on the page. A pricing finding must name the service WE would be charging for.
5. **A calculator's file name does not predict its route on this site.** Resolve a calculator link by reading the
   `slug` field inside `Medical/web/src/lib/tools/configs/*.ts`, or by requesting the URL, never by looking for a
   file whose name matches the slug. `nhs-pension-calculator.ts` serves `/calculators/nhs-pension-annual-allowance`,
   which one writer wrongly reported as a dead link on 2026-08-26.


## LESSONS FROM BATCH 1's EDITORIAL QA (2026-08-26). These are BINDING on every later batch and every later site.

The batch-1 writer brief said "place the market's missing phrasings" and set no ceiling and no ownership
map. Ten conscientious writers each placed everything relevant to their own page. The overlap was the
arithmetic result, not writer error, and it produced six BLOCK findings and a batch-wide duplication
problem. The four rules below exist so that cannot repeat.

**V1. Two word orders per idea per page. Hard cap.** Placing a third is a defect, not thoroughness. The
market having four word orders of one phrase does not mean one page carries four; it means the family is
worth owning and the orders spread across the page's H1, an H2, an FAQ question and a body sentence, or
across sibling pages that genuinely differ in intent.

**V2. Never narrate the keyword research to the reader.** A page must never list search-string variants as
body copy, never carry a table column of "also written as", and never tell a reader that two searches mean
the same thing. Observed live in batch 1 and blocked. The phrasings go IN the prose as prose. If a phrasing
cannot be placed as natural English, it does not go on the page, and the writer reports it as unplaced.

**V3. Every fact has ONE owning page. Everyone else links.** Before writing a batch, the conductor names the
owner of each shared fact and states it in every pack. In batch 1 the Scheme Pays two-limb deadline landed
on seven of twelve pages in near-identical wording, none of them the Scheme Pays page, and the contribution
tier table landed on three pages none of which was the tiered-contribution calculator. A supporting page
gets one sentence and a link, never the full explanation.

**V4. A hub routes, it does not answer.** A page that calls itself the map and then delivers the full detail
of each sub-topic leaves its children nothing to rank for and competes with the pages it links to. Two to
four sentences of orientation per sub-topic, then hand off.

**V5. One rhetorical construction, maximum twice per page, and the conductor watches it ACROSS the batch.**
Every batch-1 page ran "it is not X, it is Y" between three and seven times. Individually defensible, and
collectively it made twelve pages by ten authors read as one author with one tic, which is precisely the
signature an AI-tell detector looks for. Batch-level sameness is invisible from inside a single page, so it
is the conductor's job, not the writer's.

**V6. Vocabulary placement never overrides the page's own topic.** The Scheme Pays calculator deleted four
on-topic FAQs to make room for contribution-rate vocabulary that belonged to a different page. Placing a
phrasing is never a reason to remove the page's own specialist substance. If the two conflict, the page's
topic wins and the phrasing goes to the page that owns it.


**V7 (added 2026-08-26, from a live conflict during batch 2). The ownership map outranks the conductor's brief.**
A writer was told in its brief to use two freshly verified figures (the Global Sum and the QOF point value) as
differentiators, while its pack assigned both to other owning pages. It obeyed the pack, stated neither, and
reported the conflict for a ruling. That is exactly right and it is now the standing order: where a conductor's
brief and the ownership map disagree, THE MAP WINS, the writer follows it, and the conflict goes in the report.
The reason is structural rather than procedural. A conductor writes seven briefs quickly and can easily reach for
the same compelling fact in more than one of them; the map is the single place where duplication is actually
visible. A brief is an instruction about ONE page, and only the map can see the batch. This is the same failure
that put one Scheme Pays explanation on seven of twelve batch-1 pages, caught one layer earlier.

**V8. Do not pad to a length band.** The same page landed at 1,991 words against a 2,000 floor and reported the
shortfall rather than closing it, which is correct: length is explicitly not a lever, and nine words of padding to
satisfy a band is nine words of filler on an A-star page. A band is a shape check, not a target. Report the miss.


**V1 ENFORCEMENT NOTE (added 2026-08-26, before QA runs on batch 2). Count non-overlapping longest matches, never raw substrings.**
The two-word-orders-per-idea cap is measurable only if the counting method is right, and a naive verbatim count
will BLOCK compliant pages. In this niche the required phrases nest inside each other: "nhs pension opt out form"
contains both "nhs pension opt out" and "pension opt out form"; "nhs pension opt out refund form rf12" contains
"nhs pension opt out refund". A page that places two orders will therefore report three or four to a substring
counter. Match longest phrases first, consume the matched span, and count only what remains. Any QA finding on V1
must quote the specific spans it counted, so a false positive is visible rather than assumed.

**V2 IS A LIVE STANDARD, NOT A BATCH-2 RULE.** It was written after batch 1 and batch 1 pages were therefore not
checked against it. One survived into the committed corpus: a table cell on `/blog/nhs-pension-tax-charges-how-to-minimize`
reading "also searched as an NHS pensions refund or an NHS pension opt out refund", found by a batch-2 writer and
fixed 2026-08-26. Any pass touching an older page checks it against the CURRENT rules, not the rules that existed
when it was written.


**V9 (added 2026-08-26, from batch 2's editorial QA). A warned-off tic is REPLACED, not removed. Detect the shape, not the phrase.**
Batch 1 ran "it is not X, it is Y" up to seven times a page and V5 capped it. Every batch-2 writer complied: the
full construction appears at most twice on any page and mostly not at all. Seven writers then independently
converged on a NEW one, opening a paragraph with a numeral count ("Two rules that are individually sensible
combine...", "Four levers work while the tax year is still running", "Two things account for almost every nursing
claim"), 22 instances across seven pages against a cap of two.

The mechanism is worth understanding rather than just patching: writers given a measured spec and a banned phrase
reach for the nearest unbanned device that performs the same function, which here is a confident enumerative
opener that signals structure. Banning that specific opener will produce a third tic in batch 3.

So the rule is not another phrase ban. **The conductor checks for ANY single sentence-opening or clause shape
repeating more than twice per page or clustering across a batch, whatever it is, and names it in that batch's
fix pass.** This is inherently a cross-page check and therefore the conductor's job, not a writer's: it is invisible
from inside a single page, where two or three instances read as voice rather than as a tic.

Corollary observed the same day: five of seven pages opened with a corrective clause in the first two sentences
("and it is not the taxable pay printed on your payslip", "you get back the tax on what you spent, not what you
spent"). Below the per-page cap, genuinely different executions, and arguably the correct move on a corpus whose
whole differentiation is that the market is wrong. Recorded as the house reflex rather than flagged as a defect,
but a third batch showing the same reflex should be varied deliberately.
