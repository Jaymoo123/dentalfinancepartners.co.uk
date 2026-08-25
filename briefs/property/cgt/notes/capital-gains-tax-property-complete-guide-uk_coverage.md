# Coverage note - /blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk

EXTEND (additive only) executed 2026-08-20 against `PACK_blog_capital-gains-tax_capital-gains-tax-property-complete-guide-uk.md` section 3.
Facts re-derived from `docs/property/house_positions.md` section 5 (AEA GBP 3,000; residential 18% / 24%; 60-day report-and-pay) and gov.uk.

**Revision 2 (post-QA, same day).** Rewritten in response to `qa/EDITORIAL_batch1.md` page 1 (must_fix, 7 blockers) and `qa/FACTUAL_rates-family.md` page 1 (all_clear, 1 advisory). Revision 1 is described at the foot of this note for the record.

## Change summary (final state)

- **3 new H2 sections placed ABOVE the specialist depth**, directly after the opening paragraph and before "The 2026/27 CGT framework at a glance". This is the shape the dossier section 6 spec describes ("near zero statute in new plain-language sections; keep depth below") and the shape the PRR page already uses.
- **1 new FAQ entry.** Page carries 15 FAQs with no near-pairs.
- `dateModified` and `reviewedAt` both 2026-08-20. Nothing else in frontmatter touched.
- Diff against HEAD on this page: 38 insertions / 2 deletions. The two deletions are the old `dateModified` and `reviewedAt` lines. metaTitle, H1, all 13 existing H2s and their order, all existing body prose and all 14 existing FAQ entries are byte-identical.

New sections:

- 1. Do you pay capital gains tax when you sell a house?
- 2. How much is capital gains tax on property in 2026/27?
- 3. Do you pay capital gains tax on a rental property, a second home or commercial property?

New FAQ: "Do you pay capital gains tax when you sell your house?"

## QA fixes applied

| QA item | Fix |
|---|---|
| **BLOCKER 1.1** new block bolted on below the depth | 7 sections cut to 3 and moved above "The 2026/27 CGT framework at a glance". Existing H2 order unchanged. |
| **BLOCKER 1.2** five new sections re-answered five existing ones | Deleted "What is the capital gains allowance on property?" (duplicated "The annual exempt amount and rate bands"), "When do you pay capital gains tax on property?" (duplicated "The 60-day reporting and payment regime"), "How is capital gains tax on rental property calculated?" and "What counts as the gain when you sell a property?" (both duplicated "The five-step calculation" + "Allowable costs in the base cost"), and folded "Do you pay capital gains tax on commercial property and land?" into the new property-type section. Each surviving section now answers and then points DOWN to the mechanics rather than restating them. |
| **BLOCKER 1.3** five new FAQs duplicated five existing FAQs | Deleted all five (how much / allowance / when do you pay / commercial / letting relief). Kept only the one QA did not flag. 20 FAQs down to 15, zero near-pairs. |
| **BLOCKER 1.4** visible keyword list in a sentence | "Sellers ask this in a dozen ways, from X to Y to Z" deleted outright. |
| **BLOCKER 1.5** keyword-carrying sentences that say nothing | All five deleted: the "commercial real estate is the same tax" synonym assertion, "Property and capital gains tax questions almost always start with the wrong number", "the property sale capital gains figure", "the sale of property CGT calculation", "what the capital gains tax percentage on property looks like". |
| **BLOCKER 1.6** three consecutive sentences each carrying a variant | Kept only the sentence that does real work ("not taxed at one fixed percentage: how much falls at 18% depends on..."). The unprompted "rates do not vary with how long you owned it" denial is gone. |
| **BLOCKER 1.7** self-contradiction ("whether you are resident here or not") | Section deleted; the sentence is gone. The 60-day statement that survives, in section 1, is correctly conditioned: "Where there is tax to pay ... and the 60-day section below sets out who does not have to file at all." |
| **ADVISORY 1.8** every section the same shape | Three sections, three shapes: fork-with-bullets, prose-only worked example, property-type bullets. |
| **ADVISORY 1.9** empty summarising closers | Both deleted ("In short, CGT on property carries two rates and one allowance"; "That is the one thing to hold on to..."). |
| **ADVISORY 1.10 / X.1** rule-of-three saturation | Numeric list openers cut from four to **one** ("Three positions cover most sellers:"). Verified by scan. |
| **ADVISORY 1.11** reviewedAt stale | `reviewedAt` moved to 2026-08-20 so the review credential covers the new copy. Casing left as-is: the existing body only capitalises "Capital Gains Tax" in the opening definition and in HMRC form names, and the new copy follows that. |
| **X.3** mortgage misunderstanding duplicated with the second-home page | Cut from a three-sentence set-piece to one clause in section 3, and the second-home page is linked. |
| **X.4** same worked example, different numbers | Figures changed off the shared GBP 180,000 purchase price to GBP 245,000, and the table removed entirely: the example is now continuous prose with the rate split inline, so it shares no skeleton with the second-home page's table. |
| **X.6** joint-ownership closer duplicated with the PRR page | Reworded to "two names on the deeds shelter GBP 6,000 of gain before any other planning". |
| **FACTUAL ADVISORY 1** unqualified "Trusts get GBP 1,500" in a new FAQ | Resolved by deletion: that FAQ was one of the five removed under blocker 1.3. No trust figure appears in the surviving new copy. |

## (a) Placed keywords

60 pack keywords carry vol >= 50. Both clusters this page owns clear the >= 2 domain bar ("capital gains tax on property" = 6 domains; "capital gains on property" = 2 domains, per `cluster_map.csv`), so all 60 were treated as in scope. **57 placed** (15 verbatim, 42 as a natural stopword / word-order / singular-plural / abbreviation variant), **3 declined** (below).

Verbatim on the page (15): capital gains tax on property · capital gains on property · property capital gains tax · report and pay capital gains tax on uk property · capital gains tax on property sales · capital gains on selling a house · capital gains when selling a house · capital gains allowance on property · capital gains on rental property · cgt on rental property · capital gains tax allowance on property · cgt letting relief · property capital gains tax rates · capital gains tax on commercial property · commercial property capital gains tax.

Placed as a variant (42), with the anchor phrase that carries them:

| anchor phrase on the page | section | keywords it carries |
|---|---|---|
| "Do you pay capital gains tax when you sell a house?" (H2 + FAQ) | 1 | do i pay capital gains tax when selling my house; what is capital gain tax on property |
| "no capital gains tax on a home sale" | 1 | home sales capital gains tax; capital gains tax home sale; capital gains on home sale; capital gain tax home sale |
| "capital gains on selling a house" / "capital gains when selling a house" | 1 | cgt house sale; capital gains on house sale; capital gain for selling house; selling house and capital gains tax; capital gains and selling a house; selling home capital gains tax; selling a property and capital gains tax; selling property and capital gains tax; selling a property capital gains; capital gains tax when selling a property |
| "CGT letting relief only reaches you if you shared the house with your tenant" | 1 | (verbatim) |
| "when you pay is fixed at 60 days from completion" | 1 | when to pay capital gains tax; when do you pay capital gains tax on property |
| "report and pay capital gains tax on UK property" | 1 | capital gains tax uk property; capital gains uk property |
| "Your capital gain on residential property" | 2 | capital gain residential property |
| "How much is capital gains tax on property in 2026/27?" (H2) | 2 | how much is capital gains tax property; how much is capital gains on property |
| "the capital gain from the sale" | 2 | capital gain from sale of property; capital gain for sale of property |
| "The capital gains allowance on property" | 2 | capital gains allowances on property; capital gains allowances property |
| "capital gains tax on a rental property" (H2) | 3 | capital gains tax on rental property; capital gains tax and rental property |
| "Selling rental property in a low-income year" | 3 | selling rental property capital gains tax; capital gains selling rental property |
| "capital gains tax on commercial property" / "commercial property capital gains tax" | 3 | capital gains tax commercial property; capital gains tax for commercial property |
| "capital gains tax on land" | 3 | capital gains taxes on land; capital gain tax land |
| "CGT on the sale of a property" | 3 | sale of property cgt; cgt on property sale; cgt on property sales; capital gain tax on property sold |
| "capital gains tax on property sales" | 3 | capital gains property sale |
| "capital gains tax on property" (abbreviated to "CGT" throughout) | 1-3 | cgt on property; property and capital gains tax |

## (b) Declined keywords

Three, all forced on editorial grounds by the QA pass:

- **capital gains tax commercial real estate** (210). Its only placement was the sentence QA blocker 1.5 required deleting ("capital gains tax on commercial real estate is the same tax at the same rates"), which asserts a synonym is a synonym. "Commercial real estate" is US register with no natural UK placement; the six other commercial phrasings are placed.
- **capital gains tax percentage on property** (170). QA blocker 1.5 named "the capital gains tax percentage on property" as a noun phrase no human uses. The question it stands for is answered in section 2's opening sentence.
- **cgt rates on property** (170). Its only natural home was a bare restatement of the rates, which duplicates the protected framework table one screen below (blocker 1.2). Covered in substance by "capital gains tax on property is 18% ... 24%" and "residential property capital gains tax rates".

Four keywords remain placed at pillar depth only (one clause or sentence plus a link out) because `ledger.csv` assigns their cluster to another page: `cgt letting relief` -> letting-relief-landlords-2026-changes; `capital gains on rental property` / `capital gains tax on rental property` -> cgt-calculation-selling-buy-to-let-property-step-by-step; `cgt house sale` and `report and pay capital gains tax on uk property` -> /calculators/capital-gains-tax-calculator.

Two claims the phrasings could have tempted, handled rather than guessed: no rollover-relief assertion is made anywhere, and the commercial bullet says only that a UK resident files no 60-day return and reports on Self Assessment (house positions section 5), making no claim about capital allowances changing the gain.

## (c) Words added

- **Net against HEAD: +941 body words** (1,879 -> 2,820 by the strip-tags word count; `voice_scan` reports 2,599 body words by its own counter, 18% over its 2,200 ideal).
- Against revision 1: **-957 body words and -5 FAQ entries.** Revision 1 added 1,898 body words and 6 FAQs; revision 2 replaces that with 941 body words and 1 FAQ.
- Second person in the new sections: 56 instances of "you"/"your" in 941 words = **59.5 per 1,000**, against the dossier section 6 target of 25+.
- Question-form headings: 3 of 3.
- Statute references introduced: zero.
- Numeric list openers in new copy: 1.
- Em-dashes in the file: 0.
- Tax years in new copy: 2026/27 only. One labelled historic date (30 October 2024) for the commercial rate alignment.

Arithmetic in the section 2 worked example (new figures, re-derived):

- Net proceeds 430,000 - 8,500 = **421,500**. Base cost 245,000 + 9,500 + 14,000 = **268,500**. Gain = **153,000**.
- Less AEA 3,000 = **150,000** taxable. At 24% = **36,000**.
- With 15,000 of basic-rate band free: 15,000 x 18% = 2,700; 135,000 x 24% = 32,400; total = **35,100**.
- Basic-rate band check: 50,270 - 12,570 = 37,700, consistent with the protected framework table.

Internal links in the new copy (all verified on disk with category "Capital Gains Tax", so the `/blog/capital-gains-tax/<slug>` path resolves): letting-relief-landlords-2026-changes · property-capital-gains-tax-calculator · cgt-rates-property-2026-27-current-rates-explained · cgt-annual-exempt-amount-3000-allowance-2026-27 · capital-gains-tax-second-home-sale · cgt-commercial-property-different-residential · cgt-gifting-property-family-members-uk · cgt-property-sold-loss-claim-capital-losses.

## (d) Competitor heading themes declined (pack section 4)

| theme | seen on | decision |
|---|---|---|
| Booking / consultation / fees blocks | optimiseaccountants, uklandlordtax | Declined. Dossier section 6 names booking-CTA padding as a "do not copy". The page already carries two asides. |
| "How do I avoid paying it?" | optimiseaccountants | Declined as framed. Avoidance framing is off-register. |
| On-page CGT calculator widget | uklandlordtax, provestor | Declined. Section 2 links to the calculator page instead of duplicating a tool inside a pillar. |
| Rental income tax, allowable expenses, property income allowance | landlordstudio, uklandlordtax | Declined. Income tax scope, not this cluster. |
| "Rent a Room", "Types of UK Property", FHL as separate sections | uklandlordtax | Rent a Room declined (out of cluster). FHL already has its own protected H2 here. |
| "Will the tax changes accelerate selling?" / "riding out uncertainty" | provestor | Declined. Speculative; the protected "2027 outlook" H2 already sets the house position. |
| "Corporation tax on gains" / "Do Limited Companies Pay CGT?" | provestor, landlordstudio | Declined as a new section. Covered by the protected "Limited company ownership and CGT" H2. |
| "What is Deductible From The Taxable Capital Gain?" | landlordstudio | Declined as a new section. Covered by the protected "Allowable costs in the base cost" H2. Revision 1's duplicate of it was deleted under blocker 1.2. |
| "What do the changes mean for jointly owned properties?" | provestor | Declined as a new section. Covered by the protected spouse H2; sections 1 and 2 add the two-allowance point in second person. |
| "PPR Relief" / "What is Lettings Relief?" | landlordstudio, cruseburke | Declined as a new section. Protected H2 covers it; section 1 bullet 2 adds the plain-language entry point and links out. |
| "Annual Capital Gain Tax Exemption" | landlordstudio | Declined as a new section (was revision 1's section C). Covered by the protected "The annual exempt amount and rate bands" H2; the GBP 3,000 answer now sits in section 2's opening. |
| Site chrome (logins, "Latest news", "Our most popular posts") | landlordstudio, taxd, provestor | Not content. Ignored. |
| Stale-year figures left on page (cruseburke's GBP 11,100) | cruseburke | Declined explicitly per dossier section 6. |

## Approved protected-element change (recorded per instruction)

The coordinator approved a factual back-patch of the stale sentence "The annual exempt amount for capital gains tax continues its significant reduction:". **That sentence is not on this page.** It is on the sibling page `capital-gains-tax-property-sale-uk-2026-rates-allowances.md` at line 68, immediately above a list showing GBP 3,000 for 2024/25, 2025/26 and 2026/27, which is what makes "continues its significant reduction" stale: the AEA has been flat at GBP 3,000 since 6 April 2024 and no further reduction is legislated (house positions section 5).

Applied there, one sentence, nothing else on that page touched by me:

> The annual exempt amount for capital gains tax was cut sharply and has stood at £3,000 since April 2024:

Flagged for the coordinator because that page belongs to another writer in this batch and had uncommitted work in it when I edited.

## Verification (revision 2)

- `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` -> `EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)`
- `python scripts/voice_scan.py --site property --slug capital-gains-tax-property-complete-guide-uk` -> `robot_score 24.4, band MINOR`. Every flagged hit is pre-existing protected prose: S1 x4 on "owner" (the PRR and Letting Relief paragraphs), S3 x3 on "This pillar guide" / "We update this pillar" (opening and closing paragraphs). S2, S4, S5, S7 all zero. Nothing in the new copy is flagged.
- Em-dashes: 0. HTML tag balance: verified. FAQ count 15, no near-pairs.

Not committed and not deployed, per standing terms.

## Revision 1, for the record

Revision 1 appended 7 new H2s (1,898 words) and 6 FAQs BELOW the specialist depth, between "Common mistakes" and "Authoritative sources", and reached 26 of 60 keywords verbatim. It was rejected by editorial QA as must_fix: the block re-answered five existing sections and five existing FAQs in a second register, and the verbatim count was bought with keyword-carrying sentences that no specialist writes. The lesson recorded here: on an EXTEND against a page that already has depth, verbatim placement count is the wrong optimisation target past the point where the sentence stops being one a person would write.
