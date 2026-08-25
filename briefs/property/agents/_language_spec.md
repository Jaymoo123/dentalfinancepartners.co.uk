# Property letting-agent / RRA cluster (agents1): answer-pattern spec

Measured 2026-08-21 from live HTML. Winner set = top-10 density across the six DuckDuckGo SERPs
pulled the same day (`_serps.json` equivalent held in session scratch; positions restated in the
table below), not brand impression. Prose only: nav, header, footer, cookie banner, practice-area
and office lists, related-post loops, "you might also like" loops, membership CTAs and
publication-page furniture are excluded. Table cells are excluded from word, sentence and
readability stats, so tables are counted separately. Our four pages are measured on body only;
frontmatter (title, summary, metaDescription, `faqs:` block) is excluded from prose stats and the
FAQ count is reported separately.

**This cluster splits into three registers and our intended audience occupies none of them.**
Officialdom (gov.uk) writes duties at the landlord in the second person. Advice and membership
(NRLA, Shelter, Savills, lettingaproperty) writes explanation at the landlord or tenant. Lettings-team
operational (Goodlord, No Letting Go, HeyBRB) writes about letting agents, mostly in the third
person. Across 19,321 words of competitor prose, the phrase that addresses an agent about the
landlord they act for appears **once**: HeyBRB's "your landlord client". The
`briefs/property/rural-estates/_language_spec.md` targets do not transfer whole. Statute density is
not the lever here (statute is the reader's own vocabulary in this family), reading ease is a much
bigger one than it was in the rural set, and the register variable is which of three parties is "you".

## 1. The measured table

| Page (SERP facts from the 2026-08-21 DDG pulls) | Words | Mean sent. | Flesch | Q-headings | "you"/1k | "we"/1k | **Cite/1k** | **Notice/1k** | Jargon/1k | Tables |
|---|---|---|---|---|---|---|---|---|---|---|
| **W1** gov.uk `/guidance/renters-rights-act-an-overview-for-landlords` (gov.uk = 4 slots over 3 queries, best p1) | 868 | 17.4 | **61.2** | 2/7 | **86.4** | **0.0** | **0.0** | 5.8 | 1.2 | 0 |
| **W2** gov.uk `/government/publications/the-renters-rights-act-information-sheet-2026` (p1 and p2 on the info-sheet query; **document-shaped landing page**, see gaps) | **549** | 16.5 | 54.4 | 1/2 | 34.6 | 1.8 | **0.0** | 14.6 | 1.8 | 0 |
| **W3** nrla.org.uk `/resources/renters-rights` (4 slots across **4 of the 6 queries**, best p2, the widest spread in the set) | **2,955** | 18.2 | 54.4 | 8/28 | 36.9 | **8.8** | **0.0** | 14.7 | 0.3 | 0 |
| **W4** england.shelter.org.uk `..._renters_rights_act_changes_for_private_renters` (3 slots, best p4; tenant-facing) | 963 | **10.6** | **77.2** | 5/18 | **101.8** | 6.2 | **0.0** | 10.4 | 5.2 | 1 |
| **W5** tenancypilot.co.uk `/guides/...commencement-dates-the-full-timeline-for/` (**p1 on "commencement dates"**, the single highest-signal topic in this cluster) | 2,046 | 19.3 | 47.1 | **10/15** | 17.6 | 3.4 | **0.0** | 13.6 | 2.9 | 1 |
| **W6** blog.goodlord.co `/the-renters-rights-act-starts-this-week` (p8 commencement; goodlord.com also p10) | 1,794 | 15.7 | 43.7 | **0/9** | **2.8** | 4.5 | **0.0** | 10.0 | **0.0** | 0 |
| **W7** nolettinggo.co.uk `/blog/renters-rights-act-your-2026-countdown-...` (p9 periodic tenancy) | 1,113 | 16.3 | 42.0 | 9/18 | **3.6** | 4.5 | **0.0** | 13.4 | 0.9 | 0 |
| **W8** heybrb.ai `/blog/renters-rights-act-14-day-ai-checklist-letting-agents` (p7 commencement; **the closest register match to our intended audience**) | 2,300 | 15.9 | 49.0 | 8/17 | **14.8** | 4.8 | **0.0** | **18.3** | 0.4 | 0 |
| **W9** savills.co.uk `/blog/article/382650/...renters--rights-act-explained...` (p9 "what landlords need to know") | 693 | 18.2 | 53.3 | **0/0** | 2.9 | 2.9 | **0.0** | 5.7 | 2.9 | 0 |
| **W10** wrigleys.co.uk `/news/property/epcs-and-mees-what-you-need-to-know/` (**p1 MEES**; see do-not-copy) | **3,617** | **24.2** | **38.0** | 1/2 | **0.3** | 1.4 | **0.0** | **0.3** | 2.5 | 1 |
| **W11** lettingaproperty.com `/landlord/blog/epc-certificates/` (p5 MEES) | 2,348 | 16.9 | 36.2 | **13/22** | 11.1 | 0.9 | **0.0** | 6.8 | **0.0** | 0 |
| **Winner median (all 11)** | **1,794** | **16.9** | **49.0** | 57/138 | **14.8** | 3.4 | **0.0** | 10.4 | 1.2 | 0 |
| *Officialdom (W1, W2)* | 709 | 16.9 | **57.8** | 3/9 | **60.5** | 0.9 | 0.0 | 10.2 | 1.5 | 0 |
| *Advice and membership (W3, W4, W9, W11)* | 1,656 | 17.5 | 53.8 | 26/68 | **24.0** | 4.5 | 0.0 | 9.1 | 1.6 | 0 |
| *Lettings-team operational (W6, W7, W8)* | 1,794 | **15.9** | 43.7 | 17/44 | **3.6** | 4.5 | 0.0 | 13.5 | 0.4 | 0 |
| OURS `renters-rights-act-rent-increase-section-13-tribunal-route` (**our only visible page**: 46 Bing impressions, 40 query rows, 2 clicks; plus our only GSC row, 9 impressions at p10.1) | 2,317 | 22.5 | 32.5 | 2/10 | **0.9** | 3.0 | **1.3** | **20.3** | 2.6 | 0 |
| OURS `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` (28 Bing impressions, 9 rows, 0 clicks) | 2,899 | 20.1 | **26.8** | 2/25 | **0.0** | 0.7 | **15.2** | 1.7 | 0.0 | 0 |
| OURS `renters-rights-act-2026-tax-implications-landlords` (1 Bing impression) | 2,468 | 16.8 | **26.2** | **0/27** | **0.0** | 1.2 | **11.3** | 8.5 | 1.6 | 0 |
| OURS `renters-rights-act-periodic-tenancy-switch-landlord-obligations` (invisible, 0 rows either engine) | 2,788 | 19.1 | 29.4 | 4/18 | **0.0** | 1.4 | **11.8** | 6.1 | 1.1 | 0 |
| **Our median** | **2,628** | **19.6** | **28.1** | 8/80 | **0.0** | 1.3 | **11.6** | 7.3 | 1.4 | 0 |

Secondary counts, same extraction:

| Page | Pound figures | Percentage figures | Em-dashes | Agent-noun/1k | Imperative openers | Headings total | FAQ |
|---|---|---|---|---|---|---|---|
| W1 gov.uk overview | 0 | 0 | 0 | **0.0** | 0 | 7 | no |
| W2 gov.uk info sheet | 1 | 0 | 0 | 7.3 | 0 | 2 | no |
| W3 NRLA hub | 8 | 0 | 0 | 1.3 | 2 | 28 | 5 |
| W4 Shelter | 0 | 0 | 0 | 2.1 | 0 | 18 | no |
| W5 tenancypilot | 0 | 0 | 0 | **0.0** | 1 | 15 | 6 |
| W6 goodlord | 1 | 3 | 0 | 6.6 | 0 | 9 | no |
| W7 nolettinggo | 0 | 1 | **13** | **12.5** | 2 | 18 | 6 |
| W8 heybrb | 2 | 2 | 4 | **13.0** | **10** | 17 | 6 |
| W9 savills | 3 | 0 | 0 | 1.4 | 0 | **0** | no |
| W10 wrigleys | **20** | **14** | 3 | 0.0 | 0 | 2 | no |
| W11 lettingaproperty | **26** | 2 | **26** | 0.0 | 1 | 22 | 5 |
| OURS section 13 | **40** | 11 | 0 | 1.3 | 0 | 10 | 14 |
| OURS redress | 18 | 0 | 0 | 11.7 | 3 | 25 | 12 |
| OURS tax implications | 19 | **32** | 0 | 0.0 | 0 | 27 | 12 |
| OURS periodic switch | 4 | 3 | 0 | 0.4 | 2 | 18 | 12 |

**Cite** counts citation-style references only: bare `s.64` and `s24` abbreviations, `SI 2026/421`,
`Sch 8` / `Schedule 1`, `reg.3`, `para 4`. **Notice** counts the reader's own names for the same
things: `Section 21`, `Section 8`, `Section 13` written out, and Act names (Renters' Rights Act,
Housing Act 1988, Deregulation Act 2015, Tenant Fees Act 2019). Jargon nouns counted: assured
shorthold (as a bare term of art), statutory periodic, contractual periodic, reversion, covenant,
forfeiture, mesne profits, apportionment, de minimis, pursuant, notwithstanding, prescribed form.

**Four things the numbers say, before any interpretation.**

1. **Citation-style references are zero across the entire winner set.** Not low: zero, in all
   eleven pages and 19,321 words. Not one competitor writes `s.64`, `SI 2026/421`, `reg.3` or
   `Sch 8`. Three of our four pages run 11.3 to 15.2 per 1,000 words. **Notice-name references, by
   contrast, are everywhere**: winner median 10.4 per 1,000, top of range 18.3. The reform's section
   numbers are not jargon in this family. They are the nouns the reader already uses. The gap is not
   statute density. It is citation grammar.
2. **Our one visible page is the one that writes notice-names instead of citations.** The section 13
   tribunal page carries the highest notice-name rate of anything measured, ours or theirs (20.3 per
   1,000), and the lowest citation rate of our four (1.3). It is the only page of ours with Bing rows
   (46 impressions, 40 queries, 2 clicks) and the only page of ours with a GSC row in 90 days. Its 40
   Bing queries are almost all literal notice-name searches: "section 13 rent increase government",
   "can tenant challenge section 13", "renters rights act refer rent increase to ftt". The three
   citation-heavy pages have 1 impression between them. This is the strongest single correlation in
   the pass.
3. **Reading ease IS the variable in this cluster, unlike the rural one.** Winner median Flesch 49.0
   with a range of 36.2 to 77.2. Our median is 28.1 and our best page is 32.5. Every one of our four
   pages is harder going than every one of the eleven winners. Our mean sentence length (19.6) is
   also above the winner median (16.9). The 2026-08-17 Appendix F finding and the rural spec both
   concluded reading ease was not a differentiator. In this cluster it is, and by roughly 21 Flesch
   points.
4. **Word count is not the variable, again.** The winner set runs 549 to 3,617 words, a 6.6x spread,
   with a 549-word publication landing page holding p1 and p2 and a 3,617-word article holding p1 on
   MEES. We sit at 2,317 to 2,899, inside the winner range and invisible on three of four pages.

**Where the register split lives: which of three parties is "you".** Officialdom addresses the
landlord as "you" and barely names them (W1: "you" 86.4 per 1,000, "landlord" 2.3 per 1,000).
Shelter addresses the tenant as "you" and names the landlord 31.2 times per 1,000. The lettings-team
pages name agents heavily (6.6 to 13.0 agent-nouns per 1,000, the highest in the set) but mostly in
the **third person**: W6 and W7 run "you" at 2.8 and 3.6 while writing headings like "What This Means
for Letting Agents". Only W8 puts the agent in the second person (14.8) and it is the only page in
the set carrying imperatives at scale (10 imperative-opening sentences against 0 to 3 everywhere
else). Our pages run 0.0 to 0.9. Three of our four use the word "you" **zero times**, across 8,155
words.

## 2. Answer patterns

**P1. The winners put the date and the duty in the first sentence. We put the statutory anchor.**
Them (W1, first sentence): "You must follow the correct processes when renting out your property."
Them (W8, first sentence): "The Renters' Rights Act commences on 1 May 2026. As of today, that's 14
days."
Them (W4, first sentence): "Private tenants have new rights from 1 May 2026."
Us (redress, first sentence): "RRA 2025 Part 2 Chapter 2 (ss.64-74) introduces a statutory
requirement for residential landlords to belong to an approved redress scheme."
Us (periodic switch, first sentence): "Every fixed-term assured shorthold tenancy current on 30 April
2026 converted to a periodic assured tenancy on 1 May 2026 by force of RRA 2025 s.1 and the saving
provisions in SI 2026/421 reg.2."
Us (section 13, first sentence): "For most landlords this is the rule that bites soonest."
Our periodic-switch page carries the same fact as W4 and spends 41 words plus two citations on it.
W4 spends nine words and none. Note that our section 13 page, the visible one, is the only one of
ours that opens on the reader's situation rather than the provision.

**P2. W8 is the register model for this cluster and its structural move is a labelled one-line
answer.** Its first H2 is literally "The one-line answer", and what follows is: "The 14-day window is
a manageable, structured project: update your tenancy templates, train your team on the new regime,
prepare bulk Information Sheet comms for existing tenants, audit your live cases for Section 21
exposure, and refresh your tenant-facing FAQ." Then, in its own sentence: "That's the short version.
The detail matters because the firms doing this checklist properly between now and 30 April will
spend May running their business. The firms who don't will spend May firefighting." None of our four
pages has a labelled short answer. All four open with two paragraphs of scope-setting, three of them
ending on a variant of "this guide walks through".

**P3. The agent is addressed as "you", and the landlord is the third party who asks.** This is the
single sentence in 19,321 competitor words that occupies our intended register.
Them (W8): "This is a positive duty, the obligation sits with you (or your landlord client)
regardless of who drafted the tenancy."
Them (W8, the scenario device): "A landlord asking 'can I still evict my tenant?', answer: yes, but
only via Section 8 grounds, which require a specific reason (rent arrears, breach of tenancy, the new
mandatory grounds)."
Them (W6, the same audience, third person): "It's the letting agents and landlords that are on the
frontline of this regulatory reset that will define how the sector evolves."
Them (W7, heading): "What This Means for Letting Agents".
Us (redress, our highest agent-noun page at 11.7 per 1,000): "The Letting-Agent Regime (Since 2014)".
We name agents at competitive density on one page and never once address one. W6 and W7 do the same.
W8's scenario device, a landlord question in quotation marks followed by "answer:", is the shape our
whole cluster is being written in, and one page in the tracked set uses it.

**P4. Commencement is presented as a two-state split, in force versus not, with the not-yet in
conditional grammar.** This matters most: explainer 1 is the highest-signal topic and W5 holds p1.
Them (W5, H2s): "Already in force: the 1 May 2026 reforms" then "Coming next: phased provisions (not
yet in force)".
Them (W5, the rule stated explicitly): "Because each of these depends on secondary legislation, the
safest stance is conditional: 'when the database opens, you will need to register,' not 'you must
register now.'"
Them (W5, on the distinction itself): "Royal Assent makes the text part of the statute book;
commencement makes a given section operative. Until a section is commenced, it is dormant, it imposes
no duties and grants no rights. This is exactly why you can correctly say the database provisions are
'in the Act' while also saying they are 'not in force yet.' Both statements are true at once."
Them (W5, on the table it does carry): "The table below summarises the key milestones. Treat phased
items as indicative: the Government has committed to them, but the exact go-live dates are confirmed
only by later regulations."
Us (redress, the same distinction, correct and unreadable): "The framework was a centrepiece of the
Renters' Rights Act passage but the operational regime is not yet live: only s.74 was brought into
force on 1 May 2026 under SI 2026/421 reg.3, with the broader chapter awaiting further commencement
orders and the s.64 regulations designating which scheme (or schemes) are operative."
We already hold the harder and better version of this fact. W5 wins p1 by stating the same thing in
notice-names, a two-state H2 split, one indicative table, and a named rule for the conditional. Our
sentence has three citations and 51 words. **Take W5's structure wholesale for explainer 1.**

**P5. The number goes in the sentence about what the reader does, not in the sentence about what the
provision says.**
Them (W3): "You are now only able to put a rent increase in place once a year, and can only do so by
serving your tenants with an official Section 13 notice."
Them (W3): "These fines can range from anywhere between £7,000 and £40,000 depending on the severity
of the breach."
Them (W11): "Minimum rating required: Band E. Properties rated F or G cannot legally be let without a
formally registered exemption. Penalties: Local authorities can issue civil fines of up to £5,000 for
non-compliance with the MEES regulations."
Us (tax implications, 32 percentage figures and 19 pound figures on one page): "The MTD trigger
thresholds (£50k from 6-Apr-2026; £30k from 6-Apr-2027; £20k from 6-Apr-2028) draw most portfolio
landlords into scope quickly."
That MTD sentence is the closest of ours to the pattern and it still puts all three figures inside a
parenthesis, subordinate to an abstract subject. W3 makes the reader the subject and the figure the
object of a verb the reader performs.

**P6. "It depends" is resolved by naming the fork and giving the safe default, in one move.**
Them (W5): "Do not assume any of these binds you before its commencement order is in force, and do
not let a salesperson persuade you that a not-yet-live obligation is already mandatory."
Them (W8): "What doesn't change on 1 May: existing AST that already have valid Section 21 notices
served, deposit protection rules, Right to Rent obligations, the Tenancy Deposit Scheme adjudication
process. Your underlying compliance landscape is the same shape, the eviction route changed."
Them (W8): "Don't use AI as a substitute for legal review on contested cases or new template
sign-off; do use it to cut the routine drafting work."
Us (periodic switch): "The landlord cannot retrospectively apply the contractual review to 1 May 2026.
The next eligible rent increase is the s.13 notice route, and any s.13 increase resets the 12-month
clock for the next eligible increase."
Ours is correct and it is the same move; the only difference is `s.13` twice where W5 and W8 would
write "Section 13". W8's explicit negative list ("what doesn't change") is a device none of our four
pages uses and it is the highest-value one for an agent fielding questions, because most of the
questions an agent gets are about things that did not change.

**P7. The hand-off names a job the reader was already doing, not a service.**
Them (W5, closing): "Keeping track of staggered commencement dates, certificate renewals and the
once-a-year Section 13 window is exactly what a compliance calendar should handle for you."
Them (W6, closing): "The question is: are you going to react to what's just happened or are you going
to lead what happens next? If you'd like to know more about how Goodlord could help your business in
the post-RRA world, get in touch with our expert team today."
Them (W9, closing): "*If you are unsure how the upcoming changes will affect you, seek professional
advice. *This is our understanding of the Act as it's currently written."
Us (section 13, closing, the best of ours): "Three operational points. First, build the evidence pack
before serving the notice, not after the challenge lands."
Us (redress, closing): "RRA 2025 ss.64-74 creates a statutory landlord redress scheme architecture
that is plural (not single ombudsman), uncapped..."
Our section 13 close is already the pattern: a numbered operational instruction, no service, no form.
Our redress page closes on a restatement of the statutory architecture. W9's close is the weakest in
the winner set and is on the do-not-copy list below.

**P8. What the winners leave out, counted.** Across 19,321 words of winner prose: **zero
citation-style statute references**, **zero case-law citations**, **three tables in eleven pages**
(W4, W5, W10, one each), **one named worked example** (W5's "Priya", tracking one flat through the
commencement timeline), and **zero pricing of any kind**. Nine of eleven carry fewer than four pound
figures. They also leave out: the distinction between a commencement order and the enabling section
(W5 is the only page that explains it at all), tax treatment of anything (no winner touches it),
client-money or deposit accounting, and MTD. Five of the eleven carry an FAQ block of five or six
questions and the FAQ questions are near-verbatim SERP queries.

## 3. The register prescription for this cluster

The SERP evidence shows the three registers and their ceilings. Officialdom holds the head: gov.uk
takes four top-10 slots across three of the six queries and assets.publishing.service.gov.uk takes
three more, so seven of sixty tracked slots are gov.uk estate. That is unbeatable on the head terms
and should not be contested. NRLA takes four slots across four of six queries, the widest spread of
any non-government domain, on a membership hub. The lettings-team pages take three slots (W6 p8, W7
p9, W8 p7) and every one of them sits in the back half of the top ten, which tells us the operational
register is under-served rather than saturated.

**What the agent query wants that none of them supply.** An agent fielding landlord questions needs
three things at once: what changed, what did not change, and what to say when a landlord asks. gov.uk
supplies the first in the landlord's second person, so the agent has to translate it. NRLA supplies
the first and part of the third but behind a membership frame ("Not already a member?", "we're being
asked a lot of questions by our landlords", the highest first-person rate in the set at 8.8 per
1,000). W6 and W7 supply the first while talking about agents rather than to them. Only W8 addresses
the agent directly, and it does so to sell an AI workflow. **The unoccupied position is the agent as
"you" and the landlord as the third party asking the question.** One sentence in the tracked set
occupies it.

**What our current register is, on the evidence of our own rows.** Our four pages carry a median of
11.6 citation-style references per 1,000 words, zero second person on three of four, and a median
Flesch of 28.1. The one page that departs from that pattern, the section 13 tribunal page at 1.3
citations and 20.3 notice-names, is the only page of ours visible on either engine, and its 40 Bing
queries are notice-name queries typed by landlords and tenants mid-dispute. We are ranking for the
grammar we write in. Where we write citations, we rank nowhere.

**The prescription, by planned page type.**

| Planned page type | Register | Target "you"/1k | Cite/1k | Notice/1k | Flesch | Words | Shape |
|---|---|---|---|---|---|---|---|
| **`/for-letting-agents` hub** | Agent-as-you | **15 or above** | **0** | 10 to 15 | **48 or above** | **900 to 1,600** | W1 shape, short H2 per topic, each linking one explainer; no FAQ; the hub is a routing page not a guide |
| **Explainer 1: RRA commencements in force vs not** | Agent-as-you | **15 or above** | **0** | 12 to 18 | **45 or above** | 1,600 to 2,200 | **W5 shape**: two-state H2 split, one indicative-milestones table, conditional grammar for the not-yet, one worked example following a single property, FAQ of 5 to 6 |
| **Explainer 2: the periodic-tenancy switch in order** | Agent-as-you | 15 or above | **0** | 12 to 18 | 45 or above | 1,400 to 2,000 | Ordered steps with an explicit "what did not change" negative list; W8's scenario device for the three questions a landlord actually asks |
| **Explainer 3: MEES law today vs what landlords think** | Agent-as-you | 15 or above | **0 to 1** | 5 to 10 | 45 or above | 1,400 to 2,000 | Enacted-now block first, policy-commitment block second, explicitly labelled; W11's "at a glance" list of the enacted figures; FAQ of 5 |
| **Explainer 4: MTD for a managed portfolio, who files what** | Agent-as-you | 15 or above | **0** | 5 to 10 | 45 or above | 1,400 to 2,000 | Who-does-what table (agent, landlord, accountant), thresholds as dates the reader acts on |
| **Explainer 5: deposit and client-money tax edges** | Agent-as-you | 12 or above | **0 to 1** | 5 to 10 | 45 or above | 1,200 to 1,800 | Landlord tax treatment only; no client-money regulatory advice, no scheme comparison |
| **Explainer 6: landlord database + redress enrolment** | Agent-as-you | 15 or above | **0** | 10 to 15 | 45 or above | 1,400 to 2,000 | Conditional grammar throughout (nothing is live); the anti-scam line is a genuine reader service |
| **Our existing four RRA pages** | Adviser, corrected | raise to 6 or above | cut from 11 to 15 down to **at most 1** | keep | raise to 40 or above | leave length alone | Convert every `s.64` to "Section 64"; move SI numbers to one reference line at the foot or out |

The existing four pages keep their adviser positioning. They are not the cluster. But the citation
grammar comes out of all four, because it is free to fix and because our own visible page is the
experiment that already ran.

**One thing the agent register does not license.** Register is about who the sentence is about, not
about accuracy. W11 holds p5 while stating "the minimum standard for privately rented homes in
England and Wales will rise from EPC E to the equivalent of EPC C by 1 October 2030" as confirmed
law, with a £10,000 cap and a £30,000 maximum fine, and two more pages in that top ten do the same.
Our house position is that the enacted MEES floor is EPC E with the £3,500 cost cap, and that EPC C
by 2030 is a policy commitment, not enacted regulations. Agent register plus the enacted-versus-
announced split is a position no domain in the MEES top ten currently holds, and it is exactly the
thing an agent needs when a landlord arrives quoting a headline.

## 4. Do not copy

**W10 wrigleys.co.uk. p1 on "mees regulations landlords epc", and the worst model in the set.**
Measured:
- **It is stale to the point of being wrong.** Its own body says "To see the latest guidance for
  2023, please see our article: Government abandons new EPC targets", and its footnotes discuss the
  Climate Change Act 2008 amendment "likely to be amended in June 2019". A p1 result written before
  the current position existed.
- Zero current cap figure. The £3,500 residential cost cap is not on the page at all. It is written
  for commercial leases: "let commercial properties with an EPC rating of F or G".
- "you" at 0.3 per 1,000, the lowest measured anywhere in this pass, on 3,617 words.
- Mean sentence 24.2 and Flesch 38.0, the longest sentences in the set.
- Academic footnote apparatus: "[2] The Energy Performance of Buildings (England and Wales)
  Regulations 2012 (2012/3118)." This is the citation grammar we are removing from our own pages,
  and it is on the one page in the winner set that carries it.
- Two headings in 3,617 words.
Its p1 is a domain-authority and age artefact. **The MEES SERP is the weakest of the six**: p1 is
stale, p5, p9 and p10 assert an unenacted 2030 standard as law. Treat the whole MEES top ten as an
opportunity, not a model.

**W11 lettingaproperty.com. p5 MEES, good shape, unsafe facts.** Its 13-of-22 question headings and
its "Key EPC Requirements for Landlords at a Glance" list are both worth taking. Its central claim is
not: "The Band C requirement is back and now confirmed." Also carries **26 em-dashes**, the most in
the set, and 26 pound figures, most of them upgrade-cost estimates we have no basis for.

**W9 savills.co.uk. p9, 693 words, zero headings, and a closing disclaimer.** Measured:
- Zero H2s or H3s in 693 words. Structure is bold run-in labels only, so it offers no heading model.
- "you" at 2.9 per 1,000 on a page titled "what landlords need to know".
- Closes on two asterisked disclaimers: "*If you are unsure how the upcoming changes will affect you,
  seek professional advice. *This is our understanding of the Act as it's currently written." A
  hedge that transfers the reader's question straight back to the reader.
- Routes to a gated hub as its only next step: "please visit our client Renters' Rights Act hub".

**W6 blog.goodlord.co. p8, and the clearest case of the third-person trap.** It is a well-written
sector-commentary piece, 1,794 words, zero question headings, "you" at 2.8 per 1,000, and its
headings are essay titles: "A structural shift, not an incremental change", "A marathon, not a
sprint", "This is a moment for leadership". An agent looking for what to tell a landlord tomorrow
cannot scan it. Do not copy its heading style, its opening abstraction ("It fundamentally reshapes
how renting works"), or its closing rhetorical question.

**W7 nolettinggo.co.uk. p9, and the vendor-insert problem.** Highest agent-noun density outside W8
(12.5 per 1,000) and still only 3.6 second person, because every mention is third person. Its FAQ
question 5 is "How can No Letting Go help with these changes?" and its H2 "How No Letting Go Helps
You Prepare" sits inside the body of the explainer, above the FAQ. Thirteen em-dashes. Its phased-
provisions list hedges into uselessness: "extended property standards under Awaab's Law and the
Decent Homes Standard (phase three, dates not yet finalised)" with no statement of what that means
for the reader now.

**W3 nrla.org.uk. Widest SERP spread in the set, and the numbers are not reliable.** It carries
"fines can range from anywhere between £7,000 and £40,00,0", a typo in a headline penalty figure, and
"Prevening discrimination" in an H2. Its structure is excellent and its membership frame is not
available to us: 8.8 first-person per 1,000, an opening "Here at the NRLA", a "Not already a member?"
block, and repeated routing into gated guides. Take its question-heading discipline and its
one-topic-per-H2 layout. Do not take its numbers without independent verification, and do not adopt
first person at its rate.

**Also do not copy, from W8, our closest register match.**
- **Its product frame.** Roughly a fifth of the page is AI-tool instruction ("Upload your existing AST
  to Claude", "use Claude for Work, not Pro"). Take the second person, the labelled one-line answer,
  the scenario device, the negative list and the imperatives. Leave the tooling.
- **Its unsourced quantification.** "turn 30 hours of compliance work into 8" and "cut the routine
  drafting work by 60-70%" are stated without basis. We do not have those numbers and must not invent
  equivalents.
- **Its countdown framing.** "As of today, that's 14 days" and "between now and 30 April" date the
  page to a fortnight. W5 has the same problem in milder form ("they impose no duties on you on 18
  June 2026"). Our pages must not be datable to a week.

## 5. Hard rules for writers in this cluster

Standing (all clusters): zero em-dashes; UK English; no PropertyTaxPartners pricing on page. Eight of
eleven winners use zero or fewer than four em-dashes; the two heaviest users (26 and 13) are both on
the do-not-copy list.

Cluster-specific, from the measurements above:

1. **Zero citation-style statute references. Notice-names instead.** Write "Section 13", "Section
   21", "Section 8", "the Renters' Rights Act 2025", "the Housing Act 1988". Never `s.13`, `ss.64-74`,
   `SI 2026/421`, `reg.3`, `Sch 8`, `HA 1988 s.16E`. Winner count across eleven pages and 19,321
   words: zero. Our count on three invisible pages: 105. Where a commencement instrument genuinely
   has to be identified, it goes in one reference line at the foot of the page, never in prose.
2. **Reading ease at or above 45, mean sentence at or below 18 words.** Winner median 49.0 and 16.9.
   Ours 28.1 and 19.6. This is the one measured axis where the rural spec's conclusion does not
   carry: here readability is a differentiator and every winner beats every page of ours.
3. **Second person at 15 per 1,000 or above, and "you" is the agent.** The landlord is "your
   landlord", "the landlord you act for", "your landlord client". The tenant is "the tenant". Three
   of our four pages use "you" zero times. One sentence in the entire winner set holds this position,
   which is why the cluster exists.
4. **Every explainer opens with a labelled short answer.** W8's "The one-line answer" heading, or a
   first sentence that gives the date and the duty. Never open on the statutory anchor, never open on
   "this guide walks through", never open on scope-setting. Two sentences maximum before the answer.
5. **Every explainer carries an explicit "what has not changed" block.** No winner except W8 does
   this and it is the highest-value device for our audience, because most landlord questions an agent
   fields are about things that did not change. Name the things that stayed the same, by name.
6. **Commencement is presented as two states, and the not-yet state uses conditional grammar.**
   "Already in force" and "Not yet in force" as headings. For anything not commenced: "when the
   database opens, you will need to register", never "you must register". Any indicative year is
   labelled indicative in the same sentence. This is W5's rule, stated on the page that holds p1 on
   the highest-signal query in the cluster.
7. **Question headings at half or more of H2s on the explainers, phrased as the landlord's question.**
   W5 runs 10 of 15 and holds p1; W11 runs 13 of 22; W8 runs 8 of 17. Our four pages run 8 question
   headings across 80. The hub is exempt: W1, the officialdom model, uses noun-phrase section labels.
8. **No statute reference in any heading, and no citation abbreviation anywhere in a heading.** Our
   redress page has "The Enforcement Architecture: ss.66 and s.74" as an H2. Zero winners do this.
9. **The scenario device for anything an agent will be asked out loud.** A landlord question in
   quotation marks, then the answer, in the agent's voice. W8 runs five of them consecutively and it
   is the only page in the set that does.
10. **Figures go in the sentence about what the reader does.** Never in a parenthesis, never
    subordinate to an abstract subject. Winner median is one pound figure per page; our median is
    18.5. Cut the figure count and put the survivors in the reader's verb.
11. **Nothing on the page may be datable to a week.** No "as of today, that's 14 days", no "they
    impose no duties on you on 18 June 2026". Dated statements name the date they are true from, not
    the date the page was written.
12. **Enacted versus announced is stated explicitly wherever it applies, and MEES is the test case.**
    The enacted floor is EPC E with the £3,500 cost cap. EPC C by 2030 is a policy commitment, not
    enacted regulations, and is labelled as such in the same block. Three pages in the MEES top ten
    state it as settled law. Being right here is free differentiation.
13. **One table maximum per page, and only for a milestone timeline or a who-does-what split.**
    Eleven winners carry three tables between them. Do not add tables to hit a target.
14. **No service offer, no pricing, no "how we can help" block inside the body.** W7 puts "How No
    Letting Go Helps You Prepare" above its FAQ and it is on the do-not-copy list for it. The cluster
    is written in the register of what your landlords will ask you this year, not accountancy for
    letting agents.
15. **FAQ of five or six questions per explainer, each a near-verbatim SERP query.** Five of eleven
    winners carry exactly this and their questions read as typed. Our existing pages carry 12 to 14,
    which is not a gap against the winners but is not the model for the new pages either.
16. **Do not chase word count.** The winner set spans 549 to 3,617 words and the shortest page in it
    holds p1 and p2. Length is not a lever in this cluster and never has been in this programme.

## 6. Calls recorded, and gaps

- **Positions are DuckDuckGo, not Google.** Serper is out of credits, so the six SERPs behind this
  spec were pulled from DuckDuckGo on 2026-08-21. DDG results are Bing-derived, which happens to
  match where our own visible page earns its rows, but they are not Google positions and no Google
  position is asserted anywhere in this spec. Winners are defined by top-10 density across those six
  queries: "renters rights act 2026", "renters rights act 2026 information sheet", "renters rights
  act commencement dates", "periodic tenancy renters rights act", "renters rights act what landlords
  need to know", "mees regulations landlords epc". Any positional claim here should be re-derived
  against Google before it drives a decision beyond language.
- **One fetch failure. theindependentlandlord.com returned HTTP 202 with an empty body (195 bytes)**
  and could not be measured. It holds three top-10 slots across three of the six queries, best p2, so
  it is a genuine winner whose language habits are asserted nowhere in this spec. This is the same
  block recorded against ukpropertyaccountants.co.uk in the rural and rental specs, so it is a
  standing property of that class of domain rather than a transient failure. Flagged gap,
  SERP-data-only.
- **W2 gov.uk information sheet is a publication landing page pointing at a 282 KB PDF**, as
  anticipated. It was measured as what it is: 549 words of surrounding guidance, an attachment block
  and a change log. The PDF itself was not fetched or measured. It is included because it holds p1
  and p2 on its own query and because its 549 words carry the highest notice-name density of the two
  gov.uk pages, but it should not be read as an article-shaped competitor.
- Two other government-estate results in the SERPs were not fetched: mhclgmedia.blog.gov.uk (three
  slots) and housinghub.campaign.gov.uk (two slots, one a PDF checklist). They sit inside the same
  officialdom register already measured on W1 and W2, and the gov.uk estate is not a position we
  contest, so measuring them would not change a target. Recorded as a deliberate omission, not a
  failure.
- W10 wrigleys required an explicit `.span9` selector and W9 savills a `#txt_03` selector; a generic
  main or article selector returned the whole page chrome for wrigleys (cookie policy, practice-area
  lists, office contacts) and nothing for savills. Removing that furniture cut wrigleys from 3,873 to
  3,617 prose words. W6 goodlord's template emits each heading twice as body text, so exact-duplicate
  lines were dropped; that cut it from 1,853 to 1,794. W7's "You might also like" loop and "Get in
  touch today" block were removed as sitewide furniture, cutting it from 1,393 to 1,113.
- W9 savills reports zero headings. That is real: the page's structure is bold run-in labels rather
  than heading elements, the same pattern rossmartin showed in the rural spec, so its question-heading
  share is not comparable and it is excluded from the question-heading totals in the register rows.
- Our four pages are measured on body only. Their `faqs:` frontmatter blocks (12 to 14 per page) are
  rendered on the live page but are excluded from prose stats and reported in the FAQ column.
- Bing rows are from `briefs/property/agents/_bing_page_queries.json` (GetPageQueryStats per URL,
  never site-wide GetQueryStats), pulled 2026-08-21 across twelve RRA pages. GSC rows are from
  `_gsc_family_queries.json`, 90-day window to 2026-08-19: **one row across all twelve pages**, on
  the same section 13 page that carries the Bing rows. Two engines, one visible page, same page.
- Flesch computed with the standard 206.835 - 1.015(W/S) - 84.6(Syl/W) formula and a regex syllable
  heuristic, on sentences of five words or more. Comparable across rows; not an absolute grade level.
- The citation-versus-notice split is a metric introduced in this spec and not used in the rural or
  rental specs. It was added because the undifferentiated statute count showed winners at a median of
  10.4 per 1,000, which would have produced the wrong instruction. The split is the finding: winners
  are at zero on one half and high on the other. Any future cluster where statute names are the
  reader's own vocabulary should measure the same way.
