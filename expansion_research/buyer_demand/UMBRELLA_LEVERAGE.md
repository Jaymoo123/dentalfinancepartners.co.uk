# Can we leverage existing site authority for the new niches?

Date: 2026-08-08. Answers the owner's question: do the Tier 1 niches fall under the same umbrella as
Property and Solicitors, and can we get a head start from them?

**Answer: yes for some, no for others — and the head start is not the one you'd assume.**
The estate has almost no link authority to inherit. What it has is content velocity, working engines
and, in the Solicitors case, direct access to the lead *buyers*.

## Finding 1 — there is essentially no link authority to inherit

`backlinks/summary/live`, live backlinks, 2026-08-08 (`raw/backlinks.json`):

| Domain | Rank | Referring domains | Backlinks |
|---|---|---|---|
| propertytaxpartners.co.uk | 86 | 13 | 37 |
| accountsforlawyers.co.uk | 0 | 3 | 3 |
| medicalaccounts.co.uk | 0 | 4 | 4 |
| tradetaxspecialists.co.uk | 0 | 1 | 1 |

Four of the eight domains queried returned no data at all, which is itself the finding.
Caveat: a null result can mean "not in the backlink index" rather than a confirmed zero, so treat
these as an upper bound on how little there is, not a precise count.

**Consequence:** the usual argument for folding a new vertical into an existing domain — inheriting
link equity — does not apply here. There is no equity to inherit. Estate rankings come from content
depth and topical coverage, not links. That cuts both ways: launching a *new* domain also gives up
almost nothing, so the new-vs-existing decision should be made on brand fit and topical coherence
alone, which is a much cleaner question.

This also re-confirms the standing off-site authority gap already tracked in the research-authority
programme. It is the estate's weakest dimension, everywhere.

## Finding 2 — the brand names constrain the answer more than the domains do

Every estate brand is an **accounting** brand:

| Folder | Brand | Domain | What it actually sells |
|---|---|---|---|
| Property | Property Tax Partners | propertytaxpartners.co.uk | property *tax* to landlords |
| Solicitors | Accounts for Lawyers | accountsforlawyers.co.uk | *accounting to law firms* |

This matters. "Accounts for Lawyers" is not a legal-services brand — it sells accountancy *to*
solicitors. It cannot credibly rank for `settlement agreement solicitor`, which is a consumer legal
query. The naive read ("we have a legal site, put the legal niches there") does not survive contact
with what the brand actually is.

Content scale, for reference: Property 741 blog posts plus 6 resource topics; Solicitors 196 posts,
10 solicitor-guides, 8 resources.

## Finding 3 — Property already half-covers the landlord-compliance niches

Mentions vs dedicated slugs across Property's 741 posts:

| Topic | Mentions | Dedicated slugs |
|---|---|---|
| service charge | 83 | 1 |
| HMO licensing | 71 | 1 |
| ground rent | 73 | 0 |
| EPC | 59 | 3 |
| gas safety | 44 | 1 |
| selective licensing | 39 | 1 |
| EICR | 34 | 0 |
| electrical safety | 11 | 0 |
| MEES | 9 | 0 |
| fire risk | 6 | 0 |
| lease extension | 6 | 3 |
| right to manage | 2 | 0 |
| asbestos | 10 | 0 |
| party wall | 1 | 0 |
| knotweed | 2 | 0 |

Classic topical presence without capture: the site talks about EICR 34 times and ground rent 73
times without a single page targeting either. Those are fold-ins, not new builds — we already have
the topical signal and are simply not claiming the query.

Note the bottom three rows. Party wall (1), knotweed (2) and asbestos (10) are *not* part of what
this site is about. That is the dividing line.

## The recommendation — three different plays, not one

### A. Fold into Property (propertytaxpartners.co.uk)
Landlord compliance and leasehold. Real topical lift, brand-coherent, already half-written.

- `eicr certificates` 18,100 @ £5.84 · `landlord licensing` 1,600 @ £7.35 KD 11 ·
  `fire risk assessment cost` 720 @ £16.20 **KD 0** · `commercial epc` 1,300 @ £20.45 **KD 0**
- `lease extension lawyers` 1,000 @ £9.25 **KD 0** · `right to manage` 1,000 @ £7.55 **KD 1**

Structural cost is low but not zero: Property's `/services/*` is four hardcoded folders rather than
`[slug]`, and pillars sit at root (`/section-24`, `/landlord-tax`). A new root-level pillar folder
matches the existing convention and is the smaller change.

Risk to manage: Property is a *tax* brand. Compliance certificates and leasehold law are adjacent to
the landlord audience but not to tax. Keep it framed as landlord obligations, and watch for
cannibalisation against the existing MTD/Section 24 clusters.

### B. New domain, existing engines
Settlement agreements, property surveys (party wall, asbestos, knotweed, RICS L3), MVL, H&S,
trademark. None fit an accounting brand. Since there is no link equity to forfeit, a clean brand
costs little and avoids diluting the tax sites.

The head start here is not the domain, it is everything around it: the blog generator, optimisation
engine, calculator framework, lead capture and consent, email routing and nurture, IndexNow,
deploy pipeline. That is months of build already done, and it is the reason a new site in this estate
is not a standing start.

### C. The one genuinely underrated angle — Solicitors as a buyer channel
Accounts for Lawyers cannot rank for `settlement agreement solicitor`. But it has 196 posts and four
`/for-<audience>` hubs aimed squarely at **employment solicitors and law firm partners** — who are
exactly the people who would *buy* settlement-agreement leads.

That flips the asset. The existing legal site is not a traffic head start for the new vertical; it is
a distribution head start on the buy side, which is the constraint identified in `FINDINGS.md`
(buyer shortage, not content shortage). Same logic applies to Property and landlord-compliance
buyers, and Solicitors already has the hub-and-spoke routes (`/services/[slug]`,
`/for-<audience>`) to absorb a partner page with zero structural work.

## Suggested order

1. Fold landlord compliance + leasehold into Property. Cheapest, uses existing topical signal, no new brand.
2. Stand up a partner/buyer page on Solicitors aimed at employment solicitors, before building the
   consumer-side settlement-agreement site — so the demand has somewhere to go on day one.
3. Then build settlement agreements on its own domain, using the estate engines.
4. Property surveys as a separate later decision; good numbers, weakest brand fit anywhere.
