# Medical Wave 1: pre-live sceptical read (2026-09-28)

READY 6 / FIX-FIRST 11 / NOT-READY 0

Read as a decider and as an assistant would read it, against
`docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §1-2, the owner rulings of 2026-09-12, the
Track A and Track B reports in this folder, `docs/medical/_wave1/qa/_wave_sweep.md`,
`docs/medical/_wave1/qa/posts/_wave_sweep.md` and
`docs/_engines/T4_QUERY_PRESERVATION_2026-09-27.md`. Nothing was edited except this file.

No hit anywhere in the 17 pieces on: em-dash, "chartered", ICAEW, ACCA, CIOT, "our
accountants", "we are accountants", "we advise", "advice" as something we give, a named
person, or a fee figure for our own service. The word "advise"/"adviser"/"advisory" does not
appear at all. Every internal link on the five segment pages resolves on disk (22 anchors,
including the calculator slugs and the sibling `/for-gp-partners`), and the ten posts' links
resolve as the post sweep recorded.

Two things outside the piece list are in the way of going live and are ranked first in the fix
list: the live Medical homepage CTA still calls us "GP accountants" with a free consultation,
which the new entity block on these five pages directly contradicts; and the terms page never
says the site is a referral network.

## Piece by piece

| Piece | Type | Changed since QA | Grade | The decider's question it answers | Specific | Banned hits | Reason |
|---|---|---|---|---|---|---|---|
| `/for-gp-partners` | segment page | n (`52e49278`, same night as QA) | FIX-FIRST | "I am joining a GP partnership. What does the tax and pension side cost me, and what do I ask to see first?" | yes | none | Best of the five: the buy-in, the Type 1 certificate and the last-partner-standing lease risk are all answered in the decider's own terms. Two defects: "a regulated firm" in the CTA, and the CTA's closing sentence is identical on all five pages. |
| `/for-medical-companies` | segment page | n | FIX-FIRST | "I already have a medical company. What do I decide this year on salary, dividends, IR35 and the loan account?" | yes | none | Answers a running-the-company decider, not a should-I-incorporate reader, and the s.455 date-banding is the kind of detail a decider cannot get from a generic page. Same two CTA defects. |
| `/for-nhs-doctors` | segment page | n | FIX-FIRST | "My NHS pay, pension input, private or locum income and maybe a company have to sit in one return. Who handles that?" | partly | none | Deliberately the umbrella page, so it routes rather than resolves ("Which page should I read next?"). That is the right job for it, but a decider on one specific decision is better served by a sibling. Same two CTA defects. |
| `/for-retiring-doctors` | segment page | n | FIX-FIRST | "Partial retirement, retire and return, or full retirement, and in what order do I take the Scheme Pays election and the drawdown?" | yes | none | The sequencing point (elect before you draw, s.237B(6)) is the reason a decider calls someone, and the page leads with it. Same two CTA defects. |
| `/for-salaried-gps` | segment page | n | FIX-FIRST | "I am a salaried GP taking locum sessions. What must I register, pension and file, and is a company worth it?" | yes | none | Four named decisions in the intro with the deadlines attached, and it answers the company question with a no rather than hedging. Same two CTA defects. |
| `closing-a-medical-limited-company` | post | n (`c6696b13`) | READY | "Do I strike off or liquidate, and will the TAAR turn my capital distribution into income?" | yes | none | The £25,000 cliff edge and Condition C are both stated as the fork they are, with the two-year clock dated from the distribution. |
| `doctors-returning-to-uk-tax-residence-split-year` | post | n | FIX-FIRST | "I am coming back to the UK. When does residence restart, which split year case, and what do I file?" | yes | none | One incomplete figure: the closing section gives Class 4 as "2% above £50,270" and omits the 6% band that every other piece in this wave states. |
| `doctors-undeclared-income-digital-disclosure-service` | post | n | READY | "I have undeclared private or locum income. Do I come forward now, and how far back does it go?" | yes | none | Strongest decider piece in the wave: the 0% against 15% floor is the whole reason to act this week, and the wrong-facility warning is honest. |
| `register-self-employed-locum-doctor` | post | n | READY | "I have started locum sessions. By when must I tell HMRC, and what else starts?" | yes | none | Separates the 5 October tax clock from the 10-week pension clock, which is the thing that actually costs money. Class 4 given in full. |
| `salaried-gp-locum-work-tax` | post | n | READY | "What do my locum sessions cost me in tax on top of a salaried GP post, and should I use a company?" | yes | none | Carries the corrected registration sentence from the site sweep, and the company table is read downwards with the pension loss priced in. |
| `gp-vat-registration` | post | **y** (`87295b2e`, after both QA tracks) | FIX-FIRST | "Does my private and non-NHS work push the practice over the VAT threshold?" | yes | none | The T4 fix replaced the "Is there VAT on private medical services?" FAQ rather than adding to it, and three of the five missing queries are still unanswered. Per query below. |
| `medical-practice-incorporation-step-by-step` | post | n | READY | "Sole trader or limited company for my private practice, and how do I switch?" | yes | none | The £18.52 per £1,000 accrual figure is what makes this specific to a doctor rather than to any sole trader, and the consultant-versus-GP fork is stated before the arithmetic. |
| `nhs-pension-partial-retirement-doctors-guide` | post | **y** (`87295b2e`) | FIX-FIRST | "Which retirement route, and what does the 10% pay cut and the abatement line actually cost?" | yes | none | Same replacement pattern: the annual allowance FAQ was swapped out for the early-reduction one. The body still covers the allowance, so nothing is lost to a reader, but the FAQPage schema now has no annual allowance question. |
| `nhs-pension-scheme-pays-doctors-deadlines` | post | n | READY | "Do I pay the annual allowance charge myself or elect Scheme Pays, and by when?" | yes | none | The 1995/2008-versus-2015 split that kills the mandatory right is the specific trap, and 31 July 2028 is derived rather than asserted. |
| `nhs-uniform-tax-relief-laundry-allowance` | post | n | READY | "Do I claim my work expenses myself or use a rebate agent?" | partly | none | Honest and correct, and it tells the reader a straightforward PAYE claim needs no accountant. That is the right answer and it is also why this piece will not produce leads: the decider it serves has a £25 decision. |
| `entity` key in `Medical/niche.config.json` | entity copy | n (`1a153508`) | READY | "Who am I actually dealing with, and what happens to my details?" | yes | none | All six parts present, Ashfield Trading Ltd and 16358723 named, "not an accountancy practice and does not give advice" stated plainly, and the network sentence matches `leadConsentText`. |
| `Medical/web/src/app/terms/page.tsx` | terms page | n (`53b4b09d`, 2026-09-11) | FIX-FIRST | "What am I agreeing to by sending this form?" | no | none | The terms page never says the site is a referral network and never says we are not a practice. It says "Formal engagements for professional services are subject to separate written engagement letters", which reads as though we could be engaged. The entity block on the five new pages says the opposite. |

### The seven "missing" T4 queries, one line each

The T4 report says "7 across 2 posts" in its summary but lists six. I graded the six it names,
against the current bodies.

| Query | Post | Answered now? |
|---|---|---|
| gp vat exemption letter | gp-vat-registration | **Yes.** New FAQ 1: "HMRC issues no VAT exemption certificate or exemption letter to a GP practice." |
| does a gp have vat exemption certificate uk | gp-vat-registration | **Yes.** Same FAQ, same sentence. |
| are there many vat registered gp surgeries? | gp-vat-registration | **No.** Nothing in the post says how common registration is. One clause would do it. |
| gynecology and obstetrics and vat | gp-vat-registration | **No.** The exemption test is stated, but no specialty is named anywhere, so a specialty-worded query has nothing to match. |
| hertfordshire gp vat registered | gp-vat-registration | **No,** and it should stay that way. A location-worded query on a national site is not worth a sentence, and faking local presence is a claims risk. |
| does early retirement adjustment get applied if you take partial retirement from nhs | nhs-pension-partial-retirement | **Yes.** New FAQ 5 answers it directly and names the normal pension age per section. |

Two more things the T4 fix did that the report does not mention. Both FAQs were **replaced,
not added**, so the FAQ sets lost "Is there VAT on private medical services?" and "Does taking
my pension affect the annual allowance in that year?". The first of those was the FAQ matching
the covered queries "vat exempt gp", "private practice vat exemption" and "vat medical
exemption for vat registration"; the answer survives in the body and the h2 "Which Private
Medical Work Is Exempt?", so coverage holds, but the FAQPage schema an assistant lifts no
longer carries the question in the form people ask it. Re-adding both as a seventh FAQ costs
nothing and restores both.

## Cross-piece: one site or fifteen fills of one template

**Verdict: one voice on the bodies, one template on the closings.** The prose itself is not
templated. The mechanical sweep found no pair sharing more than two 8-word sequences, and
reading the fifteen openings in one sitting bears that out: "Joining a GP partnership, or
finishing your first full year as one, is when the tax bill becomes real", "You already have
the company", "Within a few years of drawing your NHS pension the decision stops being a date
and becomes a set of trade-offs", "Come back to the UK and your tax residence restarts for the
whole tax year you return in", "Private work does not make your fees VATable". Those are
different sentences by someone who knows the reader, not fills.

The closings are the problem, and they are visible at a glance.

1. **Nine of the ten posts end their final paragraph on the same move: a specialist reviews a
   list of three things.** Quoted in order of how close they run:
   - closing-a-medical-limited-company: "A specialist reviews the trading history, the loan account and your intentions for the next two years before any distribution is made"
   - doctors-returning: "A specialist reviews the residence position before the pages go in"
   - nhs-pension-scheme-pays: "A specialist reviews the statement, the split between schemes and the deadline that applies to your year"
   - nhs-pension-partial-retirement: "A specialist reviews the pensionable pay baseline for the 12 months before the date, the 90 percent abatement line and how any extra work will be classified"
   - register-self-employed-locum-doctor: "A specialist reviews the registration date, the pension forms and the first payment on account together"
   - medical-practice-incorporation: "A specialist reviews both routes with the pension loss priced in"
   - gp-vat-registration: "a specialist reviews the split before the threshold is crossed rather than after"
   - doctors-undeclared-income: "a specialist reviews the history and the classification before anything is notified"
   - salaried-gp-locum-work-tax: "have a specialist review the pension side alongside the tax side"

   The post sweep checked repeated *openers* and found no cluster. It did not check closers,
   and the closers are where the sameness sits. The subject is identical, the verb is
   identical, and the shape ("reviews X, Y and Z, because ...") is identical nine times.

2. **All five segment pages close on a literally identical sentence**, plus an identical
   opening clause: "A call with a regulated firm from our specialist partner network, covering
   [the page's three things]. Scope and fees are agreed with that firm, and enquiring commits
   you to nothing." Five for five, word for word on both the first eleven words and the last
   fourteen.

3. Shared by design and correctly so: the template's proof points, the "No obligation" footnote,
   the entity block and the statutory-figures strip. Those are the site being one site. I am not
   grading them as sameness.

## The assistant test

Three segment pages, the two-sentence description ChatGPT would write from that page's text
alone, entity block included.

**`/for-gp-partners`.** "Medical Accountants UK is a trading name of Ashfield Trading Ltd, a UK
service that publishes tax research and calculators for medical professionals and introduces
enquiries to accountancy firms in its specialist partner network. It is aimed at GP partners
dealing with profit share and drawings, the Type 1 Annual Certificate, a partnership buy-in or
retirement, and it is not itself an accountancy practice."

**`/for-medical-companies`.** "Medical Accountants UK, a trading name of Ashfield Trading Ltd
(company 16358723), matches doctors who run a medical limited company to accountancy firms in
its partner network that handle medical work. It is for consultants and locums deciding salary
against dividends, IR35 status, director's loan account charges and closing a company, and the
partner firm rather than the site does the work."

**`/for-retiring-doctors`.** "Medical Accountants UK is a UK referral service operated by
Ashfield Trading Ltd that publishes NHS pension research and passes enquiries to specialist
accountancy firms. It serves doctors within a few years of drawing their NHS pension who are
weighing partial retirement against retire and return, managing annual allowance charges, or
leaving a GP partnership."

All three get the model right, name no person, and none of them calls us an accountancy
practice. The entity block is doing exactly what A1 was built to do. One caveat: the phrase a
model is most likely to lift verbatim from the CTA is "a regulated firm from our specialist
partner network", and an assistant quoting that is repeating a regulatory claim about a third
party that nothing on the page supports.

## Ranked fix list

1. **The live homepage CTA contradicts the entity block these pages mount.**
   `Medical/niche.config.json`, `cta.variants.leadgen.home_cta` (the active variant, rendered at
   `Medical/web/src/app/page.tsx:716-728`). Current heading: "Speak with GP accountants who
   specialize in the medical profession". Current body: "GP partners, salaried GPs, hospital
   consultants, or locum doctors[em-dash]our GP accountants handle NHS pension planning, mixed
   income tax optimization, and practice financial structures. Initial consultation with a
   medical accountant is free and obligation-free." Button: "Book your free consultation". That
   is "our accountants", a service claim in the first person, a free-consultation offer, an
   em-dash (stored mojibake) and two US spellings, on the page that converts AI arrivals at 28%.
   Change to heading "Speak to an accountant who works with doctors" and body "GP partners,
   salaried GPs, hospital consultants and locum doctors: tell us your position and we introduce
   you to a firm from our specialist partner network that handles medical work. Enquiring
   commits you to nothing." Button "Send your enquiry". This is pre-existing and out of Wave 1's
   scope, but Wave 1 is what makes it a contradiction rather than just an old sentence.
2. **Drop "regulated" from all five segment page CTAs.** Five files, one word each. Change "A
   call with a regulated firm from our specialist partner network" to "A call with a firm from
   our specialist partner network". Accountancy is not itself a regulated profession in the UK,
   we hold nothing evidencing the regulatory status of each partner firm, and it is the sentence
   an assistant is most likely to quote back. `Medical/web/src/app/for-gp-partners/page.tsx:119`,
   `for-medical-companies:115`, `for-nhs-doctors:113`, `for-retiring-doctors:115`,
   `for-salaried-gps:122`.
3. **Break the identical closing sentence on the five segment pages.** Keep it on one page and
   rewrite it on four. Example for `/for-retiring-doctors`: replace "Scope and fees are agreed
   with that firm, and enquiring commits you to nothing." with "That firm agrees its own scope
   with you, and nothing here commits you to anything." Same meaning, and a decider comparing
   two of our pages no longer sees the same sentence twice.
4. **Break the "a specialist reviews X, Y and Z" closer on at least five of the nine posts.**
   Cheapest version: change the subject and the verb, not the meaning. On
   `nhs-pension-scheme-pays-doctors-deadlines` replace "A specialist reviews the statement, the
   split between schemes and the deadline that applies to your year, then sets the two
   settlement routes against each other on your own numbers." with "Get the statement, the
   split between schemes and your own deadline in front of an accountant who has done this
   before, and have both settlement routes costed on your figures." Do the same on
   `closing-a-medical-limited-company`, `doctors-returning`, `register-self-employed-locum-doctor`
   and `medical-practice-incorporation-step-by-step`.
5. **Fix the incomplete Class 4 figure.** `doctors-returning-to-uk-tax-residence-split-year.md`,
   last section: "Locum or private profit is stacked on your NHS pay and taxed at your marginal
   rate, with Class 4 National Insurance at 2% above £50,270." Change to "... with Class 4
   National Insurance at 6% between £12,570 and £50,270 and 2% above." Not wrong for a doctor
   already over the threshold, but incomplete, and it is the only place in the wave where the
   6% band is omitted.
6. **Re-add the two displaced FAQs as a seventh entry on each post rather than leaving them
   replaced.** On `gp-vat-registration.md` re-add "Is there VAT on private medical services?"
   with its previous answer; on `nhs-pension-partial-retirement-doctors-guide.md` re-add "Does
   taking my pension affect the annual allowance in that year?" with its previous answer. The
   T4 fix gained two queries and silently cost two questions that were already earning.
7. **Answer the one remaining gp-vat query that is worth answering.** In the "When Exactly Must
   You Register?" section, after "The deregistration threshold is £88,000, so a practice whose
   taxable work falls away can come off the register.", add "Most GP practices are not VAT
   registered at all, because almost all of their income is exempt clinical care or
   out-of-scope NHS funding, and the ones that register are usually those with substantial
   medico-legal, occupational health or cosmetic work." That covers "are there many vat
   registered gp surgeries?" honestly. Leave the Hertfordshire and the gynaecology queries
   alone: one is a location claim we cannot make and the other is not worth a sentence.
8. **Put the referral model on the terms page.** `Medical/web/src/app/terms/page.tsx`, section 2.
   After "No accountant-client relationship is created by your use of this Site or submission of
   an enquiry form." add "This Site is not an accountancy practice. We publish research and
   calculators and introduce enquiries to firms in our specialist partner network, and any
   engagement is between you and that firm." Positioning has to match the terms page, and right
   now the terms page is the one surface that does not say what the entity block says.
9. **The five new pages are orphans except for the sitemap and llms.txt.** No live page links to
   them: the homepage cards, `/medical-guides` and the four live hubs all point only at
   `/for-gps`, `/for-consultants`, `/for-locum-doctors` and `/for-junior-doctors`. Add the five
   to the `/medical-guides` audience list (`Medical/web/src/app/medical-guides/page.tsx:76`
   onwards) and link `/for-salaried-gps` and `/for-gp-partners` from the live `/for-gps` page.
   Not a copy defect and not a blocker, but Bing and Google reaching a page only through a
   sitemap is the crawl-starvation pattern this site already has.
10. **`deriveTopic` has no case for the five new routes**
    (`Medical/web/src/lib/intent/deriveTopic.ts:58-68`), so each returns null and the five pages
    ship without a topic for the intent engine, unlike the four live hubs. Add
    `/for-salaried-gps` and `/for-gp-partners` to "gp-practice", `/for-retiring-doctors` and
    `/for-nhs-doctors` to "nhs-pension" or "gp-tax", and `/for-medical-companies` to "gp-tax".
    Worth doing before live so the first month of behaviour data on these pages is attributable.

Nothing in this list is a wrong figure, a contradiction between pieces on a rule, or a piece
that answers a reader where it should answer a decider. Items 1, 2 and 8 are claims-integrity
items and belong before the deploy; 3 to 7 are sentence edits; 9 and 10 are two-line code
changes that decide whether the wave can be measured.
