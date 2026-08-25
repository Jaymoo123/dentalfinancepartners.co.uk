# Buyer-side demand research — can we make lead buyers come to us?

Date: 2026-08-08. Data: DataForSEO Google Ads, UK (2826), en. Two pulls, ~1,900 keywords.
Scripts: `pull.py` (+ `seeds.json`, `seeds2.json`). Raw JSON in `raw/`.

## Headline

**No, not with "buy accounting leads" keywords. That market does not exist at search scale.**

| Corpus | Total monthly UK volume | Keywords |
|---|---|---|
| "accounting leads" core (buy accounting leads, accountancy leads, lead gen for accountants…) | **960** | 72 |
| Lead-model / pricing language (pay per lead, lead gen agency UK…) | 5,270 | 200 |
| Adjacent buyers (mortgage, IFA, conveyancing, construction…) | 8,660 | 404 |
| Property / agent lead-gen | 4,520 | 204 |
| Supply-side partner language (introducer, referral programme) | **30** | 7 |

Anchor terms: `accounting leads` / `accountancy leads` / `accountant leads` = **70/mo each**.
`accounting leads uk` = 10/mo. `pay per lead uk` = 40/mo. `ifa leads` = 20/mo.
`become a partner accountant` and every introducer/referral phrase = effectively zero.

The volume that does exist is mostly *sell-side* noise (agencies searching "lead generation agency uk"
to check rivals) or US real-estate contamination ("agent lead generation" 880 @ £49 is realtor SaaS).

## The counter-signal: CPC is enormous

| Keyword | Vol | CPC |
|---|---|---|
| b2b lead generation uk | 70 | **£181.04** |
| pay per lead companies | 20 | £104.51 |
| lead generation in uk | 320 | £80.36 |
| accounting leads uk | 10 | £81.45 |
| lead generation agency uk | 590 | £48.17 |
| accountancy leads | 70 | £45.01 |
| pay per lead | 110 | £33.37 |

Low volume + £45-£180 CPC is the signature of a market where **buyers are sold to, not searching**.
Nobody wins this organically because there is nothing to win. The people bidding £180 are doing so
because a single closed buyer is worth thousands, not because the traffic is meaningful.

## Where lead buyers ARE reachable inbound

Buyers do not search "buy leads". They search for growth, marketing, and acquisition.

| Corpus | Vol | Notes |
|---|---|---|
| Consumer-side property-accountant demand | **10,430** | `property accountant` 720 @ £17.55, `property accountants near me` 880, `landlord accountant` 390, `accountant for landlords` 260, `property tax specialist` 210 |
| Outsourced marketing for professionals | 7,560 | `seo for estate agents` 480, `seo for accountants` 210, `website for accountants` 320 |
| Practice pain / M&A | 6,240 | `accountancy practice for sale` 590, `accounting firms for sale` 390, `marketing for accountants` 210 |
| Landlord-supply buyer language | **10** | dead — letting agents don't search this way |

## Read

Three things fall out of the numbers.

1. **Direct buyer-intent SEO is not a build.** A perfect #1 across the entire accounting-leads corpus
   is ~960 impressions/mo, maybe 250 clicks, maybe 8 enquiries. That is not a pipeline, it is a
   rounding error. Do not build a "buy accounting leads" content programme.

2. **The highest-leverage buyer magnet is the traffic we already own.** We rank in the exact
   consumer queries (`property accountant`, `accountant for landlords`) that a property accountant
   Googles weekly to check their own position. The person we want as a buyer is *already looking at
   our SERP result*, from the other side. Converting that view into an inbound buyer enquiry costs
   nothing new in SEO — it is a page and a CTA, not a corpus.

3. **Practice-growth and practice-M&A is the only real adjacent corpus** (~14k/mo combined) and it
   is on-brand: we are an SEO company selling growth to firms that cannot generate their own.
   `accountancy practice for sale` (590) + `accounting firms for sale` (390) is the acquirer crowd —
   people actively spending money to buy client volume. That is our exact buyer, with intent already
   proven by wallet.

## Recommended build, cheapest first

**A. Buyer-facing surface on the traffic we already have (days, near-zero cost).**
`ashfield/web/src/app/buy-leads/page.tsx` already exists and is invisible to the niche sites.
Add to each niche site a single `/for-accountants` (or `/partner`) page plus a footer link, framed as
"we send landlord/property clients to firms like yours". The visitor is the practice owner who found
us by searching their own money keyword. No new rankings required.

**B. Practice-growth + valuation magnets on Ashfield (1-2 weeks).**
Target `marketing for accountants`, `seo for accountants`, `accountancy practice for sale`,
`accountancy practice valuation`. Ship one genuinely useful free tool (practice valuation calculator
off fee-block multiples; client-acquisition cost calculator). This is the only corpus with enough
volume to justify content, and it self-selects for firms that want more clients.

**C. Paid, not organic, for the head buyer terms.**
`accountancy leads` etc. is a ~£45 CPC / ~1k-impression market. Worth a small always-on Ads budget
precisely *because* nobody can win it organically, but budget it as a handful of conversions, not a channel.

**D. Multi-sell the same lead (revenue per lead, not more buyers).**
A landlord lead is saleable to an accountant, a BTL mortgage broker and a conveyancer.
`mortgage leads` (260 @ £14) is the strongest adjacent buyer corpus by some margin; IFA (90) and
conveyancing (40) are thinner but real. Adding a second and third buyer per lead beats adding a
second and third buyer-acquisition channel.

**Do not build:** a lead marketplace/directory as a *traffic* play, an introducer/referral-programme
content hub (30/mo), or anything keyed to "pay per lead" phrasing.
