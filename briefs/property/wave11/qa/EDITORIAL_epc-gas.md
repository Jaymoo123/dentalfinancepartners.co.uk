# Wave 11 independent editorial QA (Track 2) — EPC pair + gas cost

Reviewer: independent editorial QA, Google helpful-content rubric, harsh setting.
Scope: Track 2 only (intent, original value, sameness, AI tells, register). No content
file was edited. Track 1 (arithmetic, statute re-derivation, link resolution) was NOT
run here except where a cross-page contradiction is visible to a reader.

Pages reviewed (three different writers):
- `Property/web/content/blog/epc-certificate-cost-uk.md` (2,969 body words)
- `Property/web/content/blog/how-to-book-an-epc.md` (2,851 body words)
- `Property/web/content/blog/gas-safety-certificate-cost.md` (2,890 body words)

Read for register only: `energy-performance-certificates-epc.md`, `gas-safety-certificates.md`.

---

## VERDICTS

VERDICT epc-certificate-cost-uk: must_fix
VERDICT how-to-book-an-epc: must_fix
VERDICT gas-safety-certificate-cost: must_fix

Counts: 15 BLOCKER, 19 ADVISORY.
Per page: epc-certificate-cost-uk 6B / 8A · how-to-book-an-epc 5B / 6A · gas-safety-certificate-cost 4B / 5A.

Nothing here is a rewrite. Every blocker is a sentence-level or paragraph-level cut.
The three pages are individually strong; the damage is almost entirely templating
across writers and duplication inside the EPC pair.

---

## Check 1 — INTENT (does the page answer the query on the first screen?)

**epc-certificate-cost-uk — PASSES on the first screen.** Paragraph 1 gives the range,
the three booking routes with prices, and the reason quotes vary ("There is no fixed
statutory fee") before any preamble. Jurisdiction lands in paragraph 2. This is the
correct shape for a cost page.

**how-to-book-an-epc — PASSES, and correctly resists lead-page contortion.** The page
opens by telling the reader not to buy ("The fastest way to get a valid Energy
Performance Certificate is often not to book one at all"), routes to the cost page twice
and to MEES once, and carries no in-body enquiry CTA. The brief's "router, never a lead
page" ruling is honoured. One soft contortion is flagged as A-11 below.

**gas-safety-certificate-cost — PASSES on the first screen.** Bold headline price, the
per-appliance uplift, the bundle price and the deductibility line all inside paragraph 1.

Gaps a searcher needs, recorded as advisories A-01 to A-04.

## Check 2 — ORIGINAL VALUE (nameable non-generic assets)

All three clear the bar. No BLOCKER on this check.

`epc-certificate-cost-uk`: (1) the causal chain from a discounted fee to RdSAP default
assumptions to a marginal band to MEES exposure, which no booking platform will publish
because it argues against its own product; (2) the two-statute penalty boundary (£200
under reg 38 of SI 2012/3118 versus the separate SI 2015/962 MEES regime) with the
correct observation that a valid EPC and a MEES breach can coexist; (3) the dual-audience
tax layer, s.272 for the landlord including PIM2505 pre-commencement, s.38(1)(c) for the
seller; (4) the VAT-inclusive comparison point, which is a real trap in this market and
absent from every price guide in the SERP.

`how-to-book-an-epc`: (1) step 0 as a genuine "do not pay" step anchored on reg 9(2)
rather than a throwaway line; (2) the four questions to ask before confirming a booking,
with "What is your accreditation number?" doubling as a broker-quality test; (3)
"lodgement, not the visit, is the finish line" paired with the reg 7 distinction between
commissioning and obtaining, which is the single most useful thing on the page for
someone marketing on Friday; (4) the observation that the assessor's evidence pack and
the accountant's capital-versus-revenue file are the same folder.

`gas-safety-certificate-cost`: (1) the clock-mismatch arithmetic on bundles, quantified
("four unnecessary electrical reports across the cycle"), which is the page's best idea
and is genuinely absent from the package-selling SERP; (2) reg 36A reframed from a
compliance footnote into a pricing lever plus a portfolio-batching mechanic; (3) the
boiler fork worked example (£2,400 revenue versus £7,500 capital on the same broken
boiler).

## Check 3 — SAMENESS

The EPC pair does not own clean lanes. Both briefs granted both pages a register-check
section and a reg 22 accreditation section, so the writers are not solely at fault, but
the execution duplicates at sentence level, not just topic level. Separately, the two
cost pages (different writers, different briefs, different statutes) have converged on
the same five-driver template. Findings B-04 to B-06, B-08, B-09, B-13, B-14.

"[Number] [noun]:" opener density across the three: 11 instances. `Four drivers explain
almost all of the spread` · `Five drivers account for nearly all of it` · `Two practical
consequences follow, and both save money` (cost) · `Two practical consequences follow
from that wording` · `four questions before you confirm the booking` · `Two points about
how the scoring works` · `Three timing rules catch landlords specifically` (booking) ·
`Two warnings on the edges of the table` · `Five drivers explain nearly all of the
spread` · `it has two cash consequences` (gas). Recorded as A-13.

"X, not Y" antithesis rhythm: 13 instances across the three pages, six of them on the
booking page alone. Recorded as A-14.

## Check 4 — AI TELLS

Em-dashes: 0 across all three files (verified by grep, en-dashes also 0). Clean.
Keyword-lists-as-prose: none found; no stuffed sentences.
Banned tics: no literal "most guides", "it's important to note", "pays for itself",
"navigating", "the single most". But all three pages carry a paraphrase of the banned
"most guides blur" move, which the writer spec bans as a class ("no meta-commentary about
other content"). Findings B-01, B-02, B-07, B-12.
Banned CTA behaviour: all three close on the same stock sentence. Finding B-03.

## Check 5 — REGISTER

UK English clean on all three (no Americanisms, no -ize, "licence"/"practising"/
"diarise" correct). Jurisdiction stated in paragraph 2 on every page. No Property Tax
Partners service pricing anywhere. No in-body enquiry CTA, no /contact links: LeadForm
injection is unobstructed. Seam quality is good except for the internal-vocabulary leaks
at A-08 and the tone drift against the legacy siblings at A-12.

---

## FINDINGS

### BLOCKERS

[BLOCKER] epc-certificate-cost-uk: "None of the price-comparison content on this subject touches tax, and yet for a landlord the after-tax cost of an EPC is meaningfully below the invoice price" — this is the banned "most guides blur" move in paraphrase (writer spec, Banned tics: "no meta-commentary about other content"), and it is an unverifiable absolute claim about pages we have not audited. — Drop-in fix: "For a landlord the after-tax cost of an EPC is meaningfully below the invoice price, and for a seller the fee has a specific home in the capital gains computation."

[BLOCKER] epc-certificate-cost-uk: "Keep the two penalty regimes apart, because the internet routinely blends them into a single "EPC fine" figure." — same banned class: defines the page's value by other people's failures rather than stating the point positively. — Drop-in fix: "Keep the two penalty regimes apart. They answer different questions and carry different numbers."

[BLOCKER] epc-certificate-cost-uk: "that is the point to put the numbers in front of a property tax specialist before the spend is committed rather than after." — the closing sentence of all three pages is the same construction ("...worth a conversation with a property tax specialist before the invoices are committed" on the booking page; "...worth a conversation with a property tax specialist before the invoice is raised" on the gas page). Writer spec: "CTA close: topic-fitted, varied, no repeated stock phrase across pages." Three writers landed on one phrase, so this is a wave-level template failure, not a single-page slip. — Drop-in fix (this page only, the other two need their own distinct closes): "Improvement spend is where the money on this page actually goes, and the capital-versus-revenue line on that spend is decided by how the works are scoped and evidenced, not by what the invoice is headed."

[BLOCKER] epc-certificate-cost-uk: "Regulation 22(1) of SI 2012/3118 requires every energy assessor to be a member of an accreditation scheme approved by the Secretary of State, and regulation 22(3) sets the conditions a scheme must meet: carrying out assessments with independence, ensuring members are qualified and fit-and-proper, standard forms, a published code of conduct, indemnity arrangements, a complaints process, and lodgement of every certificate on the central register." — the booking sibling carries the same citation, the same seven-item scheme-condition list and the same conclusion in its own H2 ("to vet their members as qualified, fit and proper persons, to operate a published code of conduct and a complaints procedure, to carry indemnity arrangements, and to lodge their members' certificates on the official register"), plus both pages carry a near-identical "Who can carry out an EPC?" FAQ. Two sibling pages ranking for adjacent queries with the same two-paragraph statutory block is duplication, whatever the briefs allowed. The booking page owns "who is allowed to do this" (its brief H2 no. 2, first-screen adjacent); the cost page needs only the price-relevant half. — Drop-in fix: collapse the cost page's H2 to one paragraph and delete the scheme-condition list: "Only an accredited energy assessor can produce and lodge an EPC, under regulation 22(1) of SI 2012/3118, and this is the one thing your money does not buy more of: a £35 booking and a £120 booking both come from an accredited assessor whose name and accreditation number appear on the certificate. What the price buys is time on site, which is the subject of the previous section. For how to find and vet an assessor, see our guide to booking an EPC."

[BLOCKER] epc-certificate-cost-uk: "There is a third consequence, less well known, hiding in regulation 9(2)(b): a newer certificate supersedes the old one the moment it is lodged, even if the old one had years left to run. Used deliberately, this is a tool. ... Used carelessly, it is a trap" — the supersession mechanic, including the both-ways framing, is told four times across the pair: here, in this page's "Does a new EPC replace my old one?" FAQ ("This cuts both ways"), in the booking page's step-0 bullet ("This is the supersession rule, and it cuts both ways"), and in the booking page's "Re-book straight after improvement works" H2. Same idea, same metaphor, two pages. — Drop-in fix: cut the cost page's third-consequence paragraph to its money sentence and hand the mechanic to the sibling: "One warning before you book a voluntary re-assessment: under regulation 9(2)(b) the new certificate replaces the old one the moment it is lodged, so a speculative re-check can cost you a band you were relying on. Re-assess after works, when you expect the number to move in your favour. Our booking guide covers the timing."

[BLOCKER] epc-certificate-cost-uk: "The certificate also travels with the building, not the owner: an EPC commissioned by the previous owner or a former letting agent counts" — twin sentence with the booking page's "Validity travels with the property, not the owner or the tenancy. A certificate lodged by the previous owner, or before your current tenant moved in, is still yours to use." Same claim, same verb, same antithesis, same position (the reg 9(2) explanation) on both pages. — Drop-in fix: on the cost page, replace with the money version of the point: "A certificate lodged by a previous owner or a former agent is free to reuse; the register does not care who paid for it."

[BLOCKER] how-to-book-an-epc: "So the correct first step, the one most booking websites will not tell you, is to check whether your property already has one." — banned meta-commentary about competing content (writer spec, Banned tics). It is also load-bearing on nothing: the step is impressive on its own facts. — Drop-in fix: "So the correct first step is to check whether your property already has one."

[BLOCKER] how-to-book-an-epc: "that is a conversation worth having with a property tax specialist before the invoices are committed, because how the work is described and evidenced can change how it is treated." — see B-03. Identical stock close to both siblings. This page also has the weakest claim on a tax close at all, being top-of-funnel fulfilment. — Drop-in fix: end the page on the process, not on advice: "And if the register check has already saved you the booking fee, note the expiry date in your compliance file now; the next person to need it will be a conveyancer, an agent or a lender, and they will all ask for the certificate number."

[BLOCKER] how-to-book-an-epc: "The certificate only exists in law once it is on the register, so ask the assessor when they will lodge, not just when they will visit." — the same instruction is delivered four times on one page: this FAQ; the booking-questions bullet ("Not when the visit is; when the certificate will be on the register. Get a date."); the timeline bullet ("Lodgement, not the visit, is the finish line."); and the timeline bullet's own closing line ("When booking, ask when they lodge, not just when they can come."). Three of the four use the same "not X, Y" shape. On a 2,851-word page this is the most repeated sentence, and repetition at this density reads as generated filler. — Drop-in fix: keep the timeline bullet ("Lodgement, not the visit, is the finish line. An assessor who visits Monday but lodges Friday has not given you an EPC until Friday.") and the booking-questions bullet; delete the trailing "When booking, ask when they lodge, not just when they can come." from the timeline bullet and end the FAQ answer at "The certificate only exists in law once it is on the register."

[BLOCKER] how-to-book-an-epc: "if you hold commercial property, the process and pricing differ enough that you should read the commercial guidance separately rather than assume the domestic rules carry across." — a router page whose entire job is routing tells the reader to go elsewhere and gives them nowhere to go. Wave 11 ships both `commercial-epc-requirements` and `commercial-energy-performance-certificate-cost` in `property-types-and-specialist-tax`. — Drop-in fix: "...you should read our guide to <a href="/blog/property-types-and-specialist-tax/commercial-epc-requirements">commercial EPC requirements</a> rather than assume the domestic rules carry across."

[BLOCKER] how-to-book-an-epc: mirror of B-04 and B-05. "Under regulation 22 of the 2012 Regulations, an energy assessor must be a member of an accreditation scheme approved by the Secretary of State. Approved schemes are required to vet their members as qualified, fit and proper persons..." and "This is the supersession rule, and it cuts both ways" — duplicated with the cost sibling as set out above. — Drop-in fix: no change needed on this page if B-04 and B-05 are applied to the cost page; this page is the correct owner of both explanations. If the fix round instead trims this page, the cost page must be trimmed first, not both.

[BLOCKER] gas-safety-certificate-cost: "Whether a bundle saves money depends on one thing competitors selling the packages rarely mention: the three certificates run on three different clocks." — banned meta-commentary about other content, and it weakens the page's best original idea by framing it as a competitor's omission rather than as a fact about the certificates. — Drop-in fix: "Whether a bundle saves money turns on one thing the package pricing hides: the three certificates run on three different clocks."

[BLOCKER] gas-safety-certificate-cost: "the capital-versus-revenue line and the timing of the spend are worth a conversation with a property tax specialist before the invoice is raised" — see B-03, third instance of the same close. — Drop-in fix: "the capital-versus-revenue line is decided by the scope of the works, and scope is far easier to describe correctly on the invoice than to reconstruct three years later."

[BLOCKER] gas-safety-certificate-cost: "Quotes for an identical legal product, one Landlord Gas Safety Record, can vary by a factor of two. Five drivers explain nearly all of the spread." — twin of the EPC cost page's "Every domestic EPC is the same legal document produced by the same RdSAP methodology, so the price spread is entirely about the delivery chain. Five drivers account for nearly all of it." The sameness is not just the sentence: four of the five drivers map one to one (size proxy, region, agent/intermediary margin, urgency), leaving only "access quirks" versus "one-off versus contract" as genuinely different. Two different writers on two different statutes produced the same section. The EPC cost page repeats the formula a third time in its own FAQ ("Four drivers explain almost all of the spread"). — Drop-in fix: change this page's lead-in to the gas-specific truth and reorder so appliance count leads as a physical driver, not as item 1 of a taxonomy: "Two quotes for the same Landlord Gas Safety Record can differ by a factor of two, and the gas inventory explains most of it before anything else does." Then merge drivers 4 and 5 (urgency and agent margin) into one "who books it and when" paragraph so the shape stops matching the sibling. Alternatively fix the EPC page instead, but one of the two must change.

[BLOCKER] gas-safety-certificate-cost: "This page is about the money: what the check costs, why quotes vary, and when bundling it with the electrical and energy certificates saves you anything." — verbatim twin opener with the EPC cost page's "This page is about the money: what you will pay, why quotes vary, when you do not need to pay at all, and how the fee and any follow-on spend are treated for tax." Both then run "For the [wider picture / regulatory guide], [comma list], see our complete guide to X." Identical scaffolding, identical position (paragraph 3), two writers. — Drop-in fix: "The rules are settled and covered in full elsewhere. What varies, and what this page prices, is the quote: what the check costs, why one engineer asks £70 and another £140, and when a bundle is worth taking. For who the duty falls on, what the engineer inspects, the tenant service deadlines and the penalty regime, see our complete gas safety certificate guide."

### ADVISORIES

[ADVISORY] epc-certificate-cost-uk: A-01. No answer to "who pays for the EPC". The page never says that a landlord cannot recharge the fee to a tenant (Tenant Fees Act 2019 makes it a prohibited payment) or that on a sale it is the seller's cost, not the buyer's. Both are high-volume adjacent queries for a cost page and both are house-differentiator material. — Drop-in fix: add two sentences to the "Check the register before you pay anything" H2: "One thing you cannot do is pass the cost on. The EPC is the landlord's expense and charging it to a tenant is a prohibited payment; on a sale it sits with the seller, since it is the seller who cannot lawfully market without one."

[ADVISORY] epc-certificate-cost-uk: A-02. "A domestic Energy Performance Certificate costs between £35 and £120+ in 2026" (also the metaTitle: "£35 to £120+") sits against the page's own table row "£100 to £200+" for an agent-arranged detached house, and against paragraph 1's "estate agents ... commonly charge £75 to £150". The headline range and the table do not describe the same market. — Drop-in fix: make the "+" explicit in paragraph 1: "...between £35 and £120 for most homes, with large detached properties and agent-arranged packages running to £200 or more."

[ADVISORY] epc-certificate-cost-uk: A-03. "The visit is non-invasive and takes roughly 30 to 60 minutes for most homes" conflicts with the booking sibling ("between 40 minutes and an hour and a half"), with this page's own driver bullet ("A one-bedroom flat is a 20 to 30 minute visit ... can take well over an hour"), and with the legacy general guide ("typically 30 to 90 minutes"). Four figures, three pages, one cluster. — Drop-in fix: standardise the cluster on the widest honest statement, "typically 30 to 90 minutes, longer for large or heavily extended properties", and use it in all three places.

[ADVISORY] epc-certificate-cost-uk: A-04. "Search the address at find-energy-certificate.service.gov.uk, the official government register for England and Wales" conflicts with the booking sibling's "It is free, takes about a minute, and covers England, Wales and Northern Ireland." A reader crossing the two pages sees a contradiction about what the register covers. Track 1 should settle which is right; editorially the pair must say one thing. — Drop-in fix: align both on the sibling's wording once verified.

[ADVISORY] epc-certificate-cost-uk: A-05. "Yes." opens three of the last four FAQ answers ("Is the EPC fee tax-deductible...", "Can a seller deduct...", "Is the EPC regime different in Scotland?"), and "Usually yes" opens a fourth. Across the three pages "Usually, yes" opens four separate answers. Rich-result snippets from the same site all opening on the same word is a visible pattern. — Drop-in fix: vary the Scotland answer to "Scotland is a separate regime entirely." and the broker answer to "In the narrow sense that matters legally, yes."

[ADVISORY] epc-certificate-cost-uk: A-06. "and it is a belief that quietly sells a lot of unnecessary £60 assessments" — unverifiable market claim dressed as fact, and "quietly" is doing no work. — Drop-in fix: "and it sells a lot of unnecessary £60 assessments."

[ADVISORY] epc-certificate-cost-uk: A-07. "The legitimacy question is the wrong question. The right question is what the price does to the survey." — the rhetorical question-and-answer pair is a recognisable generated rhythm and the paragraph is stronger without it. — Drop-in fix: "Legality is not what separates them. Price separates them by what it does to the survey."

[ADVISORY] epc-certificate-cost-uk: A-08. "That page owns the what and the why; this one owns the how much." — internal lane vocabulary exposed to the reader. The same leak appears on the gas page ("which is the canonical treatment of the rules themselves" and the anchor text "canonical guide") and on the booking page ("Cost in one line, and where the depth lives"). Readers do not think in lanes, depth or canonicals. — Drop-in fix: "That guide explains what the rating means; this one explains what it costs." Gas page: "...see our complete gas safety certificate guide." Booking page H2: "What it costs, in one line".

[ADVISORY] how-to-book-an-epc: A-09. Intensifier and hedge density is the highest of the three: 16 instances, including "actually" six times and "genuinely" four. Worst cluster: "The subcontracting step between paying a broker and an assessor actually ringing you is where cheap-tier bookings quietly lose a week." Two empty adverbs in one sentence. — Drop-in fix: "The subcontracting step between paying a broker and an assessor ringing you is where cheap-tier bookings lose a week."

[ADVISORY] how-to-book-an-epc: A-10. List-itis. Five of the eight H2s terminate in a list (18 `<li>` across five lists), and three consecutive H2s each end in a four or five item bullet run. The prose sections are good; the page reads as a deck in the middle third. — Drop-in fix: convert the four-bullet "what stretches the timeline" run into two sentences of prose, keeping only "Lodgement, not the visit, is the finish line" as a standalone emphasis.

[ADVISORY] how-to-book-an-epc: A-11. "our <a href="/calculators/portfolio-profitability-calculator">portfolio profitability calculator</a> is a quick way to see what your full cost stack does to the net position" — the softest lead-page contortion on the page. A reader who wants an EPC booked this week has no use for a portfolio profitability model, and the sentence stretches a one-paragraph tax footnote into a funnel step. Note the tension: the writer spec requires at least one calculator link where one fits, so this needs a swap, not a deletion. — Drop-in fix: cut the sentence and, if a calculator link must remain, attach it where it genuinely fits, in the invoice-file paragraph: "...much easier to build at booking time than to reconstruct years later, and it feeds straight into the figures you put through our <a href="/calculators/rental-income-tax-calculator">rental income tax calculator</a> at year end."

[ADVISORY] how-to-book-an-epc: A-12. "A tenanted property can be assessed perfectly well, subject to the tenant's cooperation and your usual notice obligations for access." The page's single biggest practical gap for its actual audience: it never says what the notice obligation is (24 hours' written notice, reasonable hours) or answers whether the landlord needs to attend at all, whether keys can be left with an agent, or what happens if the tenant refuses. For a fulfilment page at 14,800/mo this is the question after "how do I book". — Drop-in fix: add to the "What happens during the assessment" H2: "You do not need to be there. Assessors are used to collecting keys from an agent or meeting a tenant. If the property is tenanted, give at least 24 hours' written notice and propose a reasonable time; a tenant who refuses access cannot be forced, so agree the slot before you confirm the booking rather than after."

[ADVISORY] how-to-book-an-epc: A-13. "Finding an accredited assessor is deliberately easy." — "deliberately" asserts a motive for government service design that the page cannot support, and the sentence is a filler lead-in. — Drop-in fix: "The government runs the lookup itself."

[ADVISORY] gas-safety-certificate-cost: A-14. Sibling price contradiction: this page says "£60 to £120" while the legacy `gas-safety-certificates.md` says "The cost is typically £60 to £100 for a standard residential property." Two pages, one site, one query, two ceilings. — Drop-in fix: not this page's problem to solve alone; flag the legacy page for a one-word update to £120 in the same fix round so the cluster agrees.

[ADVISORY] gas-safety-certificate-cost: A-15. No "you may not need to pay at all" section, which is exactly the move that makes the EPC cost sibling trustworthy. The page never says that a property with no landlord-owned gas appliance, or one where the supply has been capped off by a Gas Safe engineer, needs no CP12, nor that tenant-owned appliances fall outside reg 36 (the legacy guide makes both points). On a page whose thesis is "know what you are paying for", the cheapest answer is missing. — Drop-in fix: add a short paragraph after the cost table: "The cheapest CP12 is the one you do not need. The duty in reg 36 bites on gas appliances, flues and pipework that you own and the tenant uses, so an all-electric property needs nothing, a tenant's own gas cooker is outside your duty (though your pipework is not), and a supply capped off by a Gas Safe engineer ends the annual cost. Get the capping certificate and file it."

[ADVISORY] gas-safety-certificate-cost: A-16. "Tag the invoice at the point of spend" appears twice, once in the "Is a replacement boiler tax-deductible?" FAQ and once closing the boiler-fork worked example, then a third variant closes the page ("the tagging decision is far easier to get right at the point of spend"). Three deliveries of one instruction. — Drop-in fix: keep it in the worked example, cut it from the FAQ.

[ADVISORY] gas-safety-certificate-cost: A-17. "£180 to £300 (illustrative)" is the only table cell carrying a hedge label while the other four rows are presented as verified ranges. That asymmetry is honest but it draws the eye to the weakest row and invites the reader to distrust the rest. — Drop-in fix: move the label out of the cell into the driver-note column, "package pricing varies widely by firm, so treat this row as indicative rather than a market range", and leave the number clean.

[ADVISORY] gas-safety-certificate-cost: A-18. "and "we also cover your area" is not one" — the scare-quoted imagined objection is a chatty register spike against an otherwise controlled page, and it is the only direct-speech moment outside the booking page's four questions. — Drop-in fix: "The drivers that justify a higher figure are the subject of the next section; travel distance alone is not one of them."

[ADVISORY] all three: A-19. Cluster tone drift against the legacy siblings. The Wave 11 pages use sentence-case H2s, second person and flowing prose; `energy-performance-certificates-epc.md` and `gas-safety-certificates.md` use Title Case H2s ("What an EPC Is, in One Paragraph", "Who Must Obtain a Gas Safety Certificate") and clipped institutional fragments ("Five steps." "The check is annual."). Cross-linked pages in one cluster should not read as two different publications. The new pages are the ones following the current spec, so the recommendation is to leave them alone and note the legacy pair for a heading-case pass, not to drag the new work backwards. No fix on the pages under review.

---

## Register and compliance sign-off

- UK English: clean, three pages, zero exceptions found.
- Em-dashes / en-dashes: zero.
- Jurisdiction: stated in paragraph 2 on all three, before any figure is relied on.
- Service pricing: none. Every £ figure is a market range or a statutory amount.
- In-body CTAs: none. No `/contact`, no "get in touch", no "book a call". LeadForm
  injection is unobstructed on all three.
- Utility CSS classes: none found in the bodies (semantic HTML only).
- Body word counts: all three inside the 2,800 to 3,500 band.
