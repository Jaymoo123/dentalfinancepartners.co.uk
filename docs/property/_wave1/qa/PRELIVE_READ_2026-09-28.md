# Pre-live sceptical read, Property (Property Tax Partners), Leads-250 Wave 1

Read 2026-09-28. Scope: the 15 segment pages in `Property/web/src/data/audiences.ts` as rendered by
`Property/web/src/app/for/[slug]/page.tsx`, plus the shared entity copy in `Property/niche.config.json`
and the terms page. No posts on Property this wave. Read-only; nothing was edited except this file.

**Counts: READY 13 / FIX-FIRST 2 / NOT-READY 0, plus one wave-level FIX-FIRST on the shared route
template that shows on all 15 pages.**

Recommendation: fix five things first, three of them in one template file and two single sentences in
the data file, then go live. None of them is a wrong figure and none is a claims-integrity breach. The
content is the strongest segment work in the estate so far. What is not ready is the furniture around
it.

## Provenance check

`audiences.ts` was committed once, `efcb0694` 2026-09-27 21:38, after the Track A factual reports, the
Track B editorial reports and the `_wave_sweep.md` sweep (all dated 2026-09-27). The reworded items the
sweep says it produced are present in the committed file ("The four facts that settle the first
return", "What the enquiry needs from you"), so the committed rows are the post-sweep text. No row has
changed since. `git log` on the route file shows only `89e982ac`, before the rows landed. So every page
is graded from the two reports plus my own read of the current text, and no diff needed reading.

The working tree has four uncommitted Property files (`layout.tsx`, `page.tsx`,
`organization-schema.ts`, `schema.ts`). They are not segment-page files and are out of my scope, but
they are in the tree that would be deployed, so somebody should know what they are before the deploy.

## Banned-string sweep

Run over the whole data file: zero em-dashes (U+2014), zero hits on "chartered", "ICAEW", "ACCA",
"CIOT", "our accountants", "we are accountants", "we advise", and zero hits on "advice" in any form,
including the permitted negation, which the entity block carries instead. No fee or price figure for
our own service. No named person. The only "pricing" hit is mortgage pricing on
`property-spv-set-up` ("company mortgage pricing is usually higher"), which is a third party's price,
not ours. The sweep report claims the same result and I reproduce it.

One thing the banned list does not cover and I am flagging anyway: "Your accountant prepares ..."
appears in 17 bodies across 10 pages. It is not a banned string, and the owner's 2026-09-12 ruling
keeps the first-person "we do the work" voice, so this is not graded as a defect. But "your
accountant" on a page that also carries a heading reading "What we are not" is the softest possible
statement of the model, and it is doing the work of "the partner firm". Worth a later pass, not a
pre-live blocker.

## Per-page table

| Piece | Type | Changed since QA | Grade | The decider's question this answers | Specific | Banned hits | Reason |
|---|---|---|---|---|---|---|---|
| moving-property-into-a-limited-company | segment page | n | READY | "Is it worth moving my buy-to-lets into a company, and what does it cost me to get in?" | yes | none | Prices entry both ways, names the s.162 claim deadline and the lender problem as the thing most likely to stop the plan. Per-property, not per-portfolio. |
| selling-a-buy-to-let | segment page | n | READY | "I am selling a rental. Who handles the 60-day CGT return and how much is it?" | yes | none | Exchange against completion is the first thing on the page, which is the actual trap. Closed list of deductible costs given, not gestured at. |
| portfolio-landlords-incorporating-a-partnership | segment page | n | READY | "We run a lettings partnership. Does Schedule 15 get our SDLT to nil, and has our partnership run long enough?" | yes | none | Answers the prior question (does a partnership exist, since when) before the reliefs. The two-year safe harbour is stated as a working one, not as law. |
| non-resident-landlords | segment page | n | READY | "I live abroad and let a UK flat. What do I owe, what is outstanding, and what does selling cost?" | yes | none | The "60 days whether or not tax is due" point is the rule most overseas owners have wrong, and it is stated as a change from the rule they knew. |
| property-spv-set-up | segment page | n | READY | "I am buying the next property through a company. What has to be right before completion?" | yes | none | Four pre-formation decisions, and the associated-companies divisor answered against the multi-SPV plan the buyer arrives with. |
| gifting-property-to-family | segment page | n | READY | "What does it cost to give a property to my children, and does it keep it out of my estate?" | yes | none | Leads with the fact that the tax lands before any money moves. Reservation of benefit is given as where most family gifts fail. |
| couples-splitting-rental-income | segment page | n | FIX-FIRST | "Can we tax the rent 90/10 so the higher-rate partner pays less?" | yes | none | Content is right and the "Form 17 declares a split, it does not create one" framing is the answer. One sentence understates the post-separation relief: see fix 4. |
| landlord-self-assessment-and-mtd | segment page | n | FIX-FIRST | "Am I in MTD from April 2026, and will someone else hold the filing calendar?" | yes | none | Strong on gross against profit. But the stat strip says "5 filings" while the body says four quarterly updates plus two year-end filings: see fix 3. |
| first-time-and-accidental-landlords | segment page | n | READY | "I am letting my old home by accident. What do I have to tell HMRC and by when?" | yes | none | Opens on the notify date, the allowance against Section 24 interaction is the real decision, and the last card lists the four facts to bring. |
| inherited-property | segment page | n | READY | "I have inherited a house. Do we sell from the estate or after it is passed to us?" | yes | none | Probate value framed as a tax number rather than a formality, and the estate-sells against beneficiaries-sell fork is costed, which is the actual decision. |
| property-company-profit-extraction | segment page | n | READY | "How do I get money out of my property company without overpaying?" | yes | none | Answers with an order (loan, dividend, pension, salary) rather than a single route, and names the year the loan credit runs out. |
| rental-income-disclosure | segment page | n | READY | "I never declared the rent. Do I come forward, and how bad is it?" | yes | none | Prompted against unprompted stated as a penalty floor with numbers, and the route question (LPC against DDS against WDF) answered rather than assumed. |
| holiday-let-and-serviced-accommodation | segment page | n | READY | "FHL is gone. What did I lose, what did I keep, and am I near VAT?" | yes | none | The three surviving transitional points are the part operators cannot find elsewhere. Gross-across-all-channels VAT point is the one that catches people. |
| hmo-and-multi-let-landlords | segment page | n | READY | "My HMO tax is not like a normal buy-to-let. What is revenue, what is capital, and who pays the council tax?" | yes | none | The common-parts and non-dwelling capital allowances carve-out is the specific answer an HMO owner cannot get from a general page. |
| landlord-retirement-and-succession | segment page | n | READY | "I am retiring. Do I sell down, gift, or put the portfolio in a structure?" | partly | none | Routes are compared and "doing nothing" is included, which is honest. Partly because the page has to hold four routes at once, so each gets less depth than a single-decision page. |

Figures: I re-checked the ones I doubted rather than re-running Track A. Dividend 10.75 / 35.75 /
39.35 with a £500 allowance, s.455 at 35.75% for loans from 6 April 2026, CT 19 / 25 / 26.5 with the
associated-companies divisor, CGT 18 / 24 with a £3,000 exempt amount, PR and trustee rate 24%, SDLT
5% surcharge from 31 October 2024 and the Schedule 4A 17% flat rate above £500,000, NRB £325,000
frozen to 5 April 2031, RNRB £175,000 tapering from £2m, combined BPR and APR allowance £2.5m from
6 April 2026, BADR 18% from 6 April 2026, property income 22 / 42 / 47 from 6 April 2027 with the
reducer tracking 22%, WDA 14% and special rate 6% from April 2026, AIA £1m, VAT £90,000, property
allowance £1,000, MTD £50,000 / £30,000 / £20,000 with £200 at four points. All agree with
`house_positions.md` and with the estate ground-truth memories. I found no wrong figure.

## Cross-piece: do these read as one site, or as fifteen fills of one template

Honest verdict: **one site, one voice, and one visible mould.** The writing is not interchangeable, but
the shape of the opening move is, and the chrome around it is identical on all fifteen.

What is genuinely varied, and Track B earned it: the closings. Fifteen different landings, no two
alike. "The deadlines in it are law's, not yours." "The filing dates come with them." "Sometimes the
answer is that the change is shut to you, or costs more than it saves; that comes back in writing too."
"Below, each of those in turn, then the lender problem and the cost of running the company." Nothing
in that set reads generated.

What repeats:

1. **Fourteen of fifteen intros open with "You".** "You already own buy-to-lets in your own name ...",
   "You are selling a buy-to-let ...", "You have inherited a property ...", "You own a property
   company ...", "You spent decades building a rental portfolio ...". The fifteenth is "If you run an
   HMO ...". I do not think this is a defect. Second-person situation address is the right move for a
   decider page and it is the house voice. But it is a shape, and a reader who lands on two of these
   will notice it.

2. **Nine of fifteen intros then run the same second move: "A specialist" plus a colon plus a list of
   three or four things.** "A specialist starts with the title, not the tax: joint tenants or tenants
   in common ..." (couples). "A specialist starts with the probate value, because ..." (inherited).
   "A specialist looks at four things first: when the letting began ..." (first-time). "A specialist
   from our partner network reviews three things first: your gross rents before deductions ..." (mtd).
   "A specialist looks first at what your director's loan account really stands at ..." (extraction).
   "A specialist settles the residence position first ..." (non-resident). This is the tell. Six pages
   already avoid it (gifting, retirement, portfolio, spv, hmo, holiday-let), which proves it is
   avoidable without losing anything.

3. **The template chrome is identical on all fifteen, verbatim.** Eyebrow "What lands on your desk",
   section heading "What a specialist reviews", CTA eyebrow "Free consultation", CTA body "Book a free
   consultation. No obligation, no hard sell.", form title "Book your free consultation", submit label
   "Request callback". This is the biggest sameness driver on the wave and none of it is the writers'
   doing. It is four string literals in `for/[slug]/page.tsx`.

4. **One of those literals is broken English on every page.** The template renders
   `What lands on your desk: ${audience.title.toLowerCase()}`, which produces "What lands on your
   desk: landlords moving property into a limited company" and "What lands on your desk: executors and
   beneficiaries". A segment name is not a thing that lands on a desk, and the eyebrow directly above
   already says the same five words, so the heading duplicates its own eyebrow and then adds a
   grammatical error. Same pattern in the CTA: "Talk to a specialist about landlords moving property
   into a limited company", "Talk to a specialist about executors and beneficiaries".

## Assistant test

Descriptions written using only each page's rendered text, as ChatGPT would produce them.

**moving-property-into-a-limited-company.** "Property Tax Partners is a trading name of Ashfield
Trading Ltd, a UK service that takes enquiries from landlords and introduces them to a specialist
partner firm; it publishes property tax research, guides and calculators and is not an accountancy
practice itself. It is aimed at UK landlords who hold buy-to-lets personally and are weighing a
transfer into a limited company, covering the SDLT on market value, the CGT and section 162, the
partnership route and the refinancing." Model correct, no person named, positioning correct. The
entity block does the work: "Who we are", "How it works" and "What we are not" are separate headings a
model can lift whole.

**non-resident-landlords.** "Property Tax Partners, a trading name of Ashfield Trading Ltd, is a UK
property tax enquiry service that matches landlords to firms in its specialist partner network. This
page serves landlords who live outside the UK and let or sell UK property: the Non-Resident Landlord
Scheme and NRL1 gross payment approval, self assessment from overseas, the 60-day return on every UK
land disposal, and rebasing to 2015 or 2019." Correct.

**inherited-property.** "Property Tax Partners, a trading name of Ashfield Trading Ltd, takes property
tax enquiries and introduces the enquirer to a partner firm rather than doing the work itself. This
page is for executors and beneficiaries holding an inherited property who are deciding whether to
keep, let or sell it, and it covers the probate value as the CGT base cost, who sells and when, rental
income in each period, and deeds of variation." Correct.

None of the three would call us an accountancy practice, name a person or get the model wrong, and
that is entirely down to the entity block. Two risks worth naming, neither of which broke my three
descriptions:

- Every h1 begins "Accountants for ...", and one section is headed "What a specialist reviews", while
  the entity block on the same page says "Property Tax Partners is not an accountancy practice". A
  model that summarises from the h1 alone, or a person who reads the h1 and stops, gets the wrong
  model. Per the owner's 2026-09-12 ruling I am not grading h1s as claims, and the entity block is the
  stronger signal because it is labelled prose. Flagging it as the ranking-against-positioning tension
  the owner already owns, not as a defect on these pages.
- The entity `serves` line is "UK landlords and property investors, whether you hold one buy to let in
  your own name or a portfolio through a limited company". Three of the fifteen pages are not aimed at
  landlords at all: `inherited-property` (executors and beneficiaries), `gifting-property-to-family`
  (owners of a family home) and part of `couples-splitting-rental-income`. On those pages the shared
  "Who this is for" heading contradicts the page's own audience. An assistant asked "who is this firm
  for" from the inherited-property page will answer "landlords" even though the page is for executors.

## Ranked fix list

**1. The section heading on all fifteen pages is broken English and duplicates its own eyebrow.**
File `Property/web/src/app/for/[slug]/page.tsx`. Change
`title={`What lands on your desk: ${audience.title.toLowerCase()}`}` to `title="What you are dealing
with"` and leave the eyebrow as it is. One line, fixes fifteen pages.

**2. The CTA heading reads "Talk to a specialist about landlords moving property into a limited
company".** Same file. Change `title={`Talk to a specialist about ${audience.title.toLowerCase()}`}`
to `title="Talk to a specialist about your situation"`. If a per-page heading is wanted later, it
needs a short noun phrase per row (for example "your incorporation", "your sale"), which is a new data
field, not a lowercased title.

**3. `landlord-self-assessment-and-mtd`: the stat strip contradicts the page body.** The stat is
`"value": "5 filings"`, `"label": "Four quarterly updates plus the year-end steps each tax year"`,
while `challenges[1]` says "The year is closed by the end-of-period statement and the final
declaration, both due 31 January after the tax year ends", which makes six. Track A logged this as
defensible because HMRC treats the year-end as one annual obligation, but the page's own words say two,
and a decider counting the number in a four-tile strip will count six. Change the label to "Four
quarterly updates plus the year-end declaration each tax year", which matches the value and stops the
page arguing with itself.

**4. `couples-splitting-rental-income`, FAQ 4: the three-year window is attached to the wrong
transfers.** Current sentence: "If you have separated, the same treatment can still apply to transfers
under a court order or formal separation agreement, for up to three tax years after the year of
separation." The three-tax-year window in TCGA 1992 s.58(1A) is the general post-separation window;
s.58(1D) has no time limit where the transfer is made under a formal divorce agreement or court order.
As written the page caps the wider relief and could send a separating couple to complete a transfer
early for no reason. Change to: "If you have separated, the treatment runs for up to three tax years
after the year of separation, and with no time limit where the transfer is made under a court order or
a formal separation agreement." Track A saw this and chose the conservative reading deliberately, so
this is a judgement call to put to the owner rather than a defect Track A missed.

**5. The stat labels overflow the strip the template renders them in.** Labels run to 91 characters
(`portfolio`: "Anti-withdrawal window on capital taken out of the partnership after a Schedule 15
transfer"), 88 (`inherited`), 87 (`hmo`: "An HMO in England is a single council tax dwelling, owner
liable, since 1 December 2023") and 83 (`couples`). The template renders them at `text-xs uppercase
tracking-wider` in a two-column grid on mobile, so a 90-character label wraps to six or seven lines
next to a neighbour that wraps to two, and the four tiles end up wildly unequal. Cut the four longest
to about 45 characters ("Anti-withdrawal window after a Sch 15 transfer", "One council tax bill, owner
liable, since Dec 2023"). Worth a look on a phone before deploy either way: this is a mobile-first
lead path and the strip sits directly under the hero.

**6. All fifteen pages are orphans.** Nothing on the site links to `/for/<slug>`. The nav is Services,
Resources, Calculators, About, Contact; no services page, blog post or homepage block links in; the
only inbound paths are `sitemap.ts` and `llms.txt`, both of which do include all fifteen. For the
assistant lever in section 2 of the programme that may be enough. For Google it is not, and a human on
the homepage cannot reach any of them. Cheapest fix that holds: one list of the fifteen on
`/services/property-accountant`, plus a three-item "other situations" list rendered from `audiences`
at the foot of the segment template. That is a new block, so it is an owner call, not a pre-live edit.

**7. Vary the second sentence on two or three of the nine "A specialist starts with X: a, b, c"
intros.** Lowest priority and pure polish. Six pages already do it, so the pattern to copy is in the
wave.

**8. Two positioning gaps to note, neither a pre-live blocker.** The entity `serves` line says
"landlords and property investors" on three pages whose audience is executors, beneficiaries or family
homeowners; adding "and families passing property on" would cover it. And the terms page is silent on
the partner-network model: it says the site gives no advice and creates no accountant-client
relationship, which is consistent, but it never says enquiries are passed to a partner firm, which
every segment page now says in prose. Terms is where a sceptical reader checks, so the two should
agree.
