# Editorial QA (Track 2) — EICR pair, fire risk assessment, landlord licensing

Reviewer: independent editorial QA, Google helpful-content rubric, harsh setting.
Scope: 4 pages, 4 different writers. No content file was edited.
Mechanical baseline: 0 em-dashes, 0 en-dashes, 0 in-body CTAs, 0 Property Tax
Partners service pricing, 0 Americanisms, body words all inside 2,800-3,500
(2,974 / 3,437 / 2,893 / 3,168).

VERDICT eicr-certificate-cost-landlords: must_fix
VERDICT landlord-electrical-safety-certificate: must_fix
VERDICT fire-risk-assessment-cost: must_fix
VERDICT landlord-licensing-explained: must_fix

---

## Cross-set summary (detail filed per slug below)

Three systemic failures run through all four pages and are the reason no page
clears:

1. **The banned "most guides" move, 11 times across 4 pages.** The writer spec
   bans "most guides blur" and "no meta-commentary about other content". Every
   page substitutes a paraphrase for it. This is the wave's dominant AI tell.
2. **"Priya" on three of four pages**, including both halves of the EICR pair.
   The spec explicitly requires varied persona names.
3. **The "fee is deductible, fine is not" contrast is the closing rhetorical
   move on all four pages**, four times in near-identical shape. Individually
   fine, as a set it reads as one template with four skins.

Plus a fourth, weaker but real: the `[number] [noun]:` list-introducer opener
appears **16 times across the four pages** (3 / 5 / 2 / 6). Quoted per page.

---

## eicr-certificate-cost-landlords

**INTENT: pass with one defect.** Price is the first thing on the page, England
jurisdiction is stated in sentence three of para 1. Nothing a price-searcher
needs is missing (report fee, remedial follow-on, HMO uplift, validity period,
what moves the quote). But the headline number is contradicted by the page's own
table, below.

**ORIGINAL VALUE: pass.** Nameable: (a) the "with minor remedials" column, which
no electrician directory publishes; (b) "Circuits, not bedrooms" as the pricing
driver, with the concrete ask ("Ask how many circuits the price covers and what
an extra circuit costs"); (c) the revenue/capital fork on remedial spend routing
a rewire into TCGA 1992 s.38(1)(b) base cost rather than losing relief.

### Findings

[BLOCKER] eicr-certificate-cost-landlords: opening says "An EICR for a typical rental property costs between £120 and £250 in 2026" (and summary/metaDescription both say "£120") but the table's first row says "Studio or 1-bed flat | £100 to £180" and its driver cell says "fixed booking prices from around £70 exist in competitive areas" — on a cost page the headline figure being contradicted by the page's own table two screens later is the single worst trust defect available; a searcher who scrolls loses confidence in every other number. Fix: change the opener, summary and metaDescription floor to £100 ("An EICR costs between £100 and £250 for most rentals in 2026, rising to £350 for large houses and £450 or more for HMOs"), and move the £70 claim into the body prose as "budget deals from around £70 exist in competitive areas but usually cover a minimal-circuit flat".

[BLOCKER] eicr-certificate-cost-landlords: "Two changes from November 2025 are worth noting because older summaries miss them" and "so any page still quoting £30,000 is describing the old law" and "so older guides quoting £30,000 are out of date" (FAQ) — three uses of the banned meta-commentary-about-other-content move on one page; the spec bans "most guides blur" and this is the same move in a costume. Fix: state the change positively and drop the comparison. "Two changes took effect in November 2025" / "The £30,000 cap applied until 31 October 2025; £40,000 applies from 1 November 2025." / FAQ: "The cap was £30,000 until 1 November 2025."

[BLOCKER] eicr-certificate-cost-landlords: "<strong>Priya, portfolio landlord, six terraced houses.</strong>" — the sibling obligations page also runs a "Priya" ("Take Priya, who bought a five-bedroom student HMO through her company"), and so does landlord-licensing-explained ("Priya holds four houses in a city with a borough-wide selective scheme"). Three pages in one cluster sharing one persona name is exactly what the spec's persona-variation rule exists to prevent, and a reader moving between the linked siblings will see it. Fix: rename this one (it is the portfolio-budgeting example, so a portfolio-flavoured name) to "Yusuf, portfolio landlord, six terraced houses" and leave Priya to the licensing page, which uses her for the incorporation numbers.

[BLOCKER] eicr-certificate-cost-landlords: "Keep this regime separate from licensing penalties, because they are routinely mixed up. A civil penalty of up to £40,000 per offence is also available under section 249A of the Housing Act 2004 ... The identical caps make the confusion easier, but they are different regimes with different triggers, and a landlord running an unlicensed HMO with no EICR can face both" — this is the obligations sibling's signature passage restated ("There are two separate £40,000 penalty regimes that can hit the same property, and they do not merge ... Both caps happening to sit at £40,000 makes it tempting to treat them as one figure; they are different statutes ... a landlord can face both at once"). Same insight, same structure, same conclusion, on two pages that link to each other. The cost page has no cost reason to own it. Fix: cut the paragraph to one sentence with a handoff — "A separate £40,000 cap exists for licensing offences under Housing Act 2004 s.249A; the two regimes stack rather than merge, which our <a href=\"/blog/landlord-tax-essentials/landlord-electrical-safety-certificate\">electrical safety certificate guide</a> works through."

[BLOCKER] eicr-certificate-cost-landlords: the whole `<h2>Why you are buying this at all: the duty cycle in brief</h2>` block reproduces the sibling's lane in full — reg 3's five duties, the Schedule 1 exclusion list ("principally long leases of seven years or more, accommodation shared with the landlord or the landlord's family, student halls of residence, hostels and refuges, care homes and hospital accommodation"), the November 2025 social-rented-sector extension, and a full paragraph on Scotland/Wales/NI. The page then says "That is deliberately the compressed version", which is an admission, not a defence: three paragraphs is not compression, it is the sibling page. Fix: cut to two sentences plus the handoff — the 5-year interval, "you must hold a valid report before a new tenant occupies", and the existing link. Delete the Schedule 1 list (the sibling owns it) and delete the devolved-nations paragraph from the body (the FAQ already covers it and duplicates it a third time).

[ADVISORY] eicr-certificate-cost-landlords: five FAQs duplicate the sibling's FAQs, one of them verbatim — "Do the EICR rules apply in Scotland, Wales and Northern Ireland?" is the identical question string on both pages, and "Is an EICR legally required for landlords?" / "How often do landlords need an EICR?" / "What is the penalty for not having an EICR?" / "Is the EICR fee tax-deductible?" all shadow obligations-page entries. Identical FAQ phrasing across two internally-linked pages is a duplicate-answer signal. Fix: re-cut this page's FAQ set to price questions the sibling cannot answer — "Why did two electricians quote £140 and £320 for the same flat?", "Is a cheap fixed-price EICR worth taking?", "Does an EICR cost more if the property is tenanted?", "Can I claim the EICR fee if the property was empty all year?" — and delete the four overlapping ones, leaving the devolved-nations FAQ on the obligations page only.

[ADVISORY] eicr-certificate-cost-landlords: the C1/C2/C3/FI code list ("<strong>C2, potentially dangerous.</strong> Requires remedial work. One or more C2s makes the report unsatisfactory.") duplicates the sibling's code table row for row. Two adjacent pages should not both teach the codes. Fix: keep only the one line the cost page needs — "Only C1, C2 and FI items must be fixed, so only they generate a remedial bill; C3 items are optional spend" — and link the sibling's table.

[ADVISORY] eicr-certificate-cost-landlords: "Five drivers explain almost every gap between two quotes for the same postcode:" / "One terminology point worth knowing:" / "Two further costs sit behind the headline penalty." — three instances of the `[number] [noun]` list-introducer, a shape used 16 times across these four pages. Fix: convert at least two to a different entry, e.g. "Quotes for the same postcode diverge on five things:" and "The headline penalty is not the whole bill."

[ADVISORY] eicr-certificate-cost-landlords: "before you file" is used twice, once in the tax section ("worth an hour of a property tax specialist's time before you file") and again in the close ("put the invoice in front of your accountant or a property tax specialist before you file") — two specialist handoffs with the same trailing phrase, three paragraphs apart. Fix: delete the earlier one; the close already carries it.

[ADVISORY] eicr-certificate-cost-landlords: "the wiring, consumer unit, sockets, switches and light fittings" (FAQ) and "the wiring, consumer unit, earthing and bonding, sockets, switches and light fittings" (body) — the same keyword string twice on this page and again on the sibling ("the wiring, sockets, switches, light fittings and consumer unit"). Reads as a keyword list rather than prose. Fix: in the body, replace with "everything wired in behind the sockets, including the consumer unit, earthing and bonding".

[NOTE] eicr-certificate-cost-landlords: uses word-numbers ("five years", "seven years") where the sibling uses numerals ("5 years", "7 years") for the same statutory periods. Cosmetic, but the two pages are read consecutively. Whichever the house style is, apply it to both.

---

## landlord-electrical-safety-certificate

**INTENT: pass.** The obligation is stated in the first sentence, all four duty
limbs in the first paragraph, England-only in the first line of paragraph two,
the £40,000 cap and its date in the first screen. This is the correct opener for
a rules query and it does not open with a price. Nothing a rules-searcher needs
is missing.

**ORIGINAL VALUE: pass, strongest of the four on rules depth.** Nameable:
(a) the four-supply-deadline table with the 7-day council deadline called out as
"a clean, easily evidenced breach before it has even considered the installation
itself"; (b) the SI 2025/1043 detail almost nobody carries — social-rented
extension, the moveable-structures exclusion added, new regs 3B to 3D, and
transitional phasing to 1 May 2026; (c) the Marcus timeline, which is the only
place in this cluster that shows the two 28-day clocks running from *different*
start dates (inspection date vs completion date).

### Findings

[BLOCKER] landlord-electrical-safety-certificate: "<p>Now the point that most coverage of this topic gets wrong.</p>" — this is the banned tic verbatim in substance; "most guides blur" is on the spec's banned list and this is the same sentence with a synonym. Compounded by "so plenty of older guides are now quoting superseded figures" and "Any guide still quoting £30,000 is describing the old law." Three on one page. Fix: replace with the positive statement — "Two separate £40,000 penalty regimes can hit the same property, and they do not merge." Then delete the other two clauses: "government guidance was reissued on 1 November 2025" (full stop), and "The 2025 amendment regulations substituted £40,000 with effect from 1 November 2025." (full stop).

[BLOCKER] landlord-electrical-safety-certificate: "Take Priya, who bought a five-bedroom student HMO through her company and let it to five sharers" — persona collision with the cost sibling's "Priya, portfolio landlord" and with landlord-licensing-explained's "Priya holds four houses". See the cost-page finding. Fix: rename here to "Take Bev, who bought a five-bedroom student HMO through her company"; this page already has Marcus, so a second distinct name is all that is needed.

[BLOCKER] landlord-electrical-safety-certificate: "Where the report required remedial work, a second round of supply duties applies once the work is done: written confirmation of completion from a qualified person must go to each tenant and to the local housing authority within 28 days of the work finishing" — the cost sibling states the same rule in the same shape ("with written confirmation then supplied to the tenants and the local housing authority within 28 days of completion"), and this page then states it a *third* time in the same page ("supply that confirmation with the report to every tenant and to the local housing authority within 28 days of completing the work"). Within-page triplication plus a cross-page twin. Fix: keep the statement once, in the unsatisfactory-reports section where the 28-day clock lives, and in the supply-deadlines section replace it with a table row ("Each tenant and the council, after remedial work | Within 28 days of the work being completed") so it is data rather than a repeated sentence.

[ADVISORY] landlord-electrical-safety-certificate: "Three events in practice restart or interrupt the clock:" / "Three features deserve emphasis:" / "Two neighbouring documents cause confusion." / "One more naming quirk:" / "Four deadlines apply." (FAQ) — five `[number] [noun]` list-introducers on one page, the densest of the four. By the third the reader is hearing the pattern rather than the content. Fix: recast at least three, e.g. "The clock restarts or stalls in three situations:" → "A new report resets the date. An unsatisfactory one stops it. Buying a tenanted property inherits it." as running prose, and "Three features deserve emphasis:" → "The penalty has three features worth understanding before you read a council's notice:" is not a fix, so instead delete the introducer entirely and let the bulleted `<strong>` lead-ins carry it.

[ADVISORY] landlord-electrical-safety-certificate: the tax section is structurally identical to the cost sibling's — same four bolded lead-ins in the same order (fee deductible / remedial fork / penalties not deductible), same three citations (ITTOIA 2005 s.272, TCGA 1992 s.38(1)(b), BIM38515), same worked conclusion. Two linked pages carrying the same tax section is duplicate content in substance even where the wording differs. Fix: this page should keep the compliance-calendar and record-keeping angle it already owns ("HMRC expects landlords to keep the records ... for at least 5 years ... and the EICR cycle runs at up to 5 years, so one well-kept property file serves both masters") and cut the fee/remedial/penalty explanation to three sentences plus a link to the cost page's tax section, which is where the revenue-capital detail belongs.

[ADVISORY] landlord-electrical-safety-certificate: "A £5,000 penalty therefore costs a higher-rate taxpayer more than £8,000 of pre-tax rental profit to absorb" — the £5,000 is an unlabelled invented figure sitting in a page whose every other number is statutory, and it does not correspond to any cap or example elsewhere on the page. Fix: anchor it to the page's own numbers — "A £5,000 penalty, a modest one by the standards of this regime, costs a higher-rate taxpayer over £8,000 of pre-tax rental profit to absorb."

[NOTE] landlord-electrical-safety-certificate: "landlords who treat the EICR as a one-off document rather than a cycle are the ones the council letters find" and "Treat the report as a live business record, not a filed-and-forgotten PDF" are the two best lines in the cluster. They are the reason this page reads human. Keep them through any fix round.

---

## fire-risk-assessment-cost

**INTENT: pass on cost, pass on who-needs-one, fail on jurisdiction.** Both
halves of the query are answered in the first screen: the £150 to £1,500+ range
with the building-type spread in paragraph one, and the duty gate in paragraph
two. The gate-first framing ("Before you spend anything, check the duty actually
applies to you") is the right call and is the page's best structural decision.
The jurisdiction line is wrong, below.

**ORIGINAL VALUE: pass, strongest of the four on originality.** Nameable:
(a) the negative answer — "It does not cover the inside of a single self-contained
house or flat let to one household" — which a price-comparison page has a
commercial reason never to give; (b) the CAA 2001 s.35 split, that fire safety
plant in an HMO's shared hallway fails the dwelling-house exclusion while the
same plant in a block's common parts qualifies for plant and machinery
allowances, with HMRC's CA23060 worked example behind it; this is genuinely rare
and is the single most valuable paragraph across all four pages;
(c) the 18m/7-storey 2022 Regulations threshold held distinct from the Building
Safety Act "higher-risk building" definition, with the correct conclusion that
"the two sets of obligations run in parallel, they do not merge".

### Findings

[BLOCKER] fire-risk-assessment-cost: "This page applies to England and Wales; Scotland and Northern Ireland run separate fire safety regimes." — the claim is made in the first screen and then contradicted by the page's own content. The Fire Safety (England) Regulations 2022 (the whole 11m/18m section), the Smoke and Carbon Monoxide Alarm (England) Regulations 2015 (the single-let answer, which is the page's headline differentiator), and the Housing Act 2004 HHSRS references are all England-only. A Welsh single-let landlord who reads "This page applies to England and Wales" and then "A single-let landlord's fire duties sit in the smoke and carbon monoxide alarm regulations instead" is being pointed at legislation that does not apply to them (Wales runs fitness standards under Renting Homes). The page's own FAQ gets this right ("shared with Wales only at the level of the 2005 Order itself"), which makes the first-screen line an outright error rather than a simplification. Fix: replace with "This page states the position for England. The Fire Safety Order 2005 also applies in Wales, but the 2022 Regulations, the alarm rules and the enforcement detail below are England-only; Scotland and Northern Ireland run separate regimes entirely." and add "(England)" to the single-let bullet's opening clause.

[BLOCKER] fire-risk-assessment-cost: "Price lists rarely say this, which is how single-let landlords end up buying assessments the law never asked them for." and the FAQ's "No, and this is the point most price lists skip." — the banned meta-commentary move, twice, and both times attached to the page's most valuable claim, which does not need the comparison to land. Fix: "A single-let landlord's fire duties sit in the smoke and carbon monoxide alarm regulations instead, covered below." (full stop, delete the trailing clause) and FAQ opener "No. The duty to make a fire risk assessment under article 9 ..." (delete "and this is the point most price lists skip").

[ADVISORY] fire-risk-assessment-cost: "The table below combines quoted ranges from three UK providers checked in August 2026: a national fire risk assessment network quoting £200 to £1,500 or more ... a landlord certificate provider quoting £150 to £600 ... and an hourly-rate assessor model at £50 to £120 an hour." — three anonymous sources under a "verified" framing, on a page whose cluster sibling (landlord-licensing-explained) names Bristol, Liverpool and Camden with exact figures. Anonymous sourcing on a cost page is the weakest form of the claim and invites the reader to discount the table. Fix: name the three providers, or relabel honestly — "The table below is built from quoted ranges published by three UK assessment providers in August 2026 (a national assessor network, a landlord certificate provider and an hourly-rate practice) and is a market range, not a tariff."

[ADVISORY] fire-risk-assessment-cost: "so a £40,000 article 32 fine is paid out of income that has already been taxed" — article 32 fines are unlimited, as the page correctly says two sentences earlier, so £40,000 is invented; worse, £40,000 is the exact cap of the two *other* penalty regimes running through this cluster (SI 2020/312 reg 11 and HA 2004 s.249A), so the number actively invites conflation across the four linked pages. Fix: "so a six-figure article 32 fine is paid out of income that has already been taxed", which matches the page's own "regularly run into five and six figures".

[ADVISORY] fire-risk-assessment-cost: "Reported cases against landlords and agents of blocks and HMOs regularly run into five and six figures." — "regularly" is doing unsourced quantitative work on a criminal-penalty claim. Fix: "Fines on landlords and managing agents in reported cases have reached five and six figures."

[ADVISORY] fire-risk-assessment-cost: "For higher-risk buildings, that premium is usually the cheapest insurance on the page." — the page is about fire safety, and "cheapest insurance" collides with actual buildings insurance, which is a real and adjacent cost in a leasehold block. Fix: "For higher-risk buildings that premium buys the only defence you have if the assessment is later challenged."

[ADVISORY] fire-risk-assessment-cost: "Two pricing patterns worth knowing." and "One boundary to keep clean:" — the `[number] [noun]` shape again; lighter here than on the other three, but it is the same shape the reader has met on the linked EICR pages. Fix: "Two pricing patterns worth knowing" → "Hourly quotes converge on the same place."

[NOTE] fire-risk-assessment-cost: "<h2>Where this leaves you</h2>" is shared with eicr-certificate-cost-landlords, and both are cost pages in the same cluster that link to each other. It is an existing house heading (4 older Property pages use it), so this is not a new tell, but two adjacent siblings landing on it is avoidable. Suggest this page take "Before you commission one" instead.

---

## landlord-licensing-explained

**INTENT: pass.** The primary query is "which of the three applies to me", and
the first paragraph names all three, states the mandatory/designated split
("only one of them applies everywhere"), and gives the four facts that decide
it. England is fixed in paragraph two. The two-minute decision path with a
stop-at-first-yes instruction is the correct answer shape for this query and is
better than the SERP norm.

**ORIGINAL VALUE: pass.** Nameable: (a) named, dated 2026 fee schedules with the
split explained by *R (Gaskin) v Richmond upon Thames LBC* — the Part A / Part B
structure is visible on every council site and explained on almost none;
(b) s.68(6) non-transferability turned into an incorporation cost line ("£3,000
of licensing cost triggered purely by the change of legal owner"), which is a
real hole in standard incorporation appraisals; (c) the RRO point that repayment
comes out of already-taxed rent with no deduction, so the cash cost exceeds the
rent repaid.

### Findings

[BLOCKER] landlord-licensing-explained: "the part the lettings guides skip, the tax position" (opening screen), "a large share of the guidance still online quotes the old number", "because it appears in almost no incorporation appraisal", "This is the compounding cost no penalty table shows." — four instances of the banned meta-commentary-about-other-content move, one of them in the first screen where it sets the page's voice. The spec bans this family outright. Fix, in order: "and the tax position"; "The cap rose from £30,000 to £40,000 on 1 May 2026 (SI 2026/319)."; "The incorporation point deserves numbers."; "That is the compounding cost: you repay gross rent out of taxed income."

[BLOCKER] landlord-licensing-explained: "Priya holds four houses in a city with a borough-wide selective scheme and incorporates the portfolio." — third page in this cluster to use Priya (see both EICR pages). This page is the one with the strongest claim to keep her, since the incorporation numbers are its own, but the collision has to be resolved somewhere and the fix must be coordinated. Fix: keep Priya here, rename on both EICR pages (see those findings).

[ADVISORY] landlord-licensing-explained: "Designations currently run in roughly 70 or more council areas in England" (body) and "Designations currently run in roughly 70 or more council areas in England" (FAQ, near-verbatim) — the same soft-quantified, unsourced claim stated twice, and "roughly 70 or more" hedges in two directions at once, which reads as an estimate the writer could not verify. On a page whose credibility rests on named, dated fee schedules, this is the one number with no provenance. Fix: source it or convert it to a check instruction — "Selective designations run in dozens of council areas and the list changes every year, which is why the only reliable answer is your own council's page." Delete the duplicate from the FAQ or reword it.

[ADVISORY] landlord-licensing-explained: "Those certificates have their own price tags, covered in our <a href=\"/blog/landlord-tax-essentials/landlord-electrical-safety-certificate\">EICR guide</a> and <a href=\"...gas-safety-certificate-cost\">gas safety certificate cost guide</a>" — the link promises price tags but points at the obligations page, which deliberately does not carry prices; the cost page (eicr-certificate-cost-landlords) is the one that does. The anchor text also calls the obligations page "EICR guide", competing with the cost page for that label. Fix: point at `/blog/landlord-tax-essentials/eicr-certificate-cost-landlords` with anchor text "EICR cost guide".

[ADVISORY] landlord-licensing-explained: "One jurisdiction point before anything else." / "Two cautions:" / "One caveat on scope:" / "Two structural points explain the odd shapes in the fee schedules." / "Three situations where that line costs real money:" / "Four properties means four fresh applications" — six `[number] [noun]` constructions, the highest count of the four pages, four of them as section-opening moves. Fix: recast at least three, e.g. "One jurisdiction point before anything else." → "Everything below is England."; "Two structural points explain the odd shapes in the fee schedules." → "The fee schedules look odd for two reasons, and both have explanations."  → better: "Councils split the fee because a court told them to."; "One caveat on scope:" → "Even inside a selective area, some lettings are exempt:".

[ADVISORY] landlord-licensing-explained: "s.68(6) of the Housing Act 2004 says flatly that a licence may not be transferred" (FAQ) and "Section 68(6) of the Housing Act 2004 says it in one line: a licence may not be transferred to another person" (body) and the close "The whole subject, then, in one line:" — "in one line" twice plus "says flatly" is an intensifier cluster around a provision that needs no rhetorical help. Fix: "Section 68(6) of the Housing Act 2004: a licence may not be transferred to another person." and close with "So: count the people and households, check the map, and treat the fee as a modest, deductible, five-year cost of doing business."

[ADVISORY] landlord-licensing-explained: "The fee was never the real cost; the £4,200 of fire safety works the inspection flagged was, and most of that was deductible too as repairs." — "most of that" asserts a repair/improvement outcome without applying the test the sibling pages spend paragraphs on, and £4,200 is an unlabelled illustrative figure. It also cuts against fire-risk-assessment-cost, which is explicit that new alarm systems and compartmentation upgrades are capital. Fix: "The fee was never the real cost; the £4,200 of fire safety works the inspection flagged was. Whether that £4,200 is deductible turns on the repair-versus-improvement split, which our <a href=\"/blog/landlord-tax-essentials/fire-risk-assessment-cost\">fire risk assessment cost guide</a> works through line by line. Figures illustrative."

[NOTE] landlord-licensing-explained: "Amara and Josh" is the only genuinely varied persona pairing in the set and the couple framing fits the household-counting topic. Good. Keep.

---

## Sameness verdict on the EICR pair

The two pages **do not currently own separate lanes**. The obligations page
stays clean of pricing (correct). The cost page does not stay clean of rules: it
carries a duty-cycle section, the Schedule 1 exclusions, the November 2025
amendment, the devolved-nations position, the four-code classification, the
28-day remedial rule, the two-£40,000-regimes insight, and a tax section
structurally identical to the sibling's, plus five overlapping FAQs, one
verbatim. Direction of the fix is one-way: **cut from the cost page, not from
the obligations page.** After the cuts listed above the cost page loses roughly
600-800 words, which its 2,974 body words can absorb; refill with price content
the sibling cannot carry (why two quotes for one flat differ, how to read a
fixed-price offer, bundling maths against the gas and EPC renewal dates, the
cost of the re-visit confirmation).

Sentence-shape sameness across all four: 16 `[number] [noun]` list-introducers,
4 "fee deductible / penalty not deductible" closers, 4 "speak to a property tax
specialist" handoffs, 3 pages sharing one persona name.

## Counts

- eicr-certificate-cost-landlords: 5 BLOCKER, 5 ADVISORY, 1 NOTE
- landlord-electrical-safety-certificate: 3 BLOCKER, 3 ADVISORY, 1 NOTE
- fire-risk-assessment-cost: 2 BLOCKER, 5 ADVISORY, 1 NOTE
- landlord-licensing-explained: 2 BLOCKER, 5 ADVISORY, 1 NOTE
- Total: 12 BLOCKER, 18 ADVISORY, 4 NOTE
