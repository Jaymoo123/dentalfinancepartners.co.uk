# Buyer list scrape spec (2026-08-13)

Brief for the list builder. Follows the sample provided (`Sample (1).xlsx`).

## Format

The sample's shape is correct. Keep it. Three columns, one row per firm:

| Column | Notes |
|---|---|
| `Company Name` | Trading name, cleaned. See below. |
| `Category` | Exactly one of the ten category labels below, spelled consistently. |
| `Website` | Root domain or contact page of the firm's own site. |

No email or phone columns needed. Outreach runs through website contact forms, so the website URL
is the deliverable and everything hangs off it being correct.

## Categories (ten, UK)

1. Buy to let mortgage brokers
2. Conveyancing solicitors
3. SDLT reclaim specialists
4. Chartered surveyors
5. Bridging loan brokers
6. Letting agents
7. Capital allowances consultants
8. Estate agents
9. Landlord insurance brokers
10. Company formation agents

Same shape across all ten. Send a small batch per category first so volume per category is visible
before a full run.

## Website column rules (the important part)

The URL has to land somewhere a contact form can be submitted:

- **Firm's own site only.** No directory listings, no aggregator profiles, no social pages.
- **Resolve shorteners.** The sample has `bit.ly/TheBuyToLetBroker`. Follow the redirect and record
  the real destination.
- **Strip tracking parameters.** Drop everything from `?utm_source=` onward. The sample carries
  Google Business Profile utm tags on several rows.
- **Prefer the contact page** where the scrape can find it (`/contact`, `/contact-us`,
  `/get-in-touch`). Root domain is acceptable if not.
- **Drop firms with no working website** or where the only web presence is a Google Business
  Profile, a Facebook page or a directory entry.

## Deduplicate by domain, not by company name

One row per domain. Multi-branch firms list every office separately on Google Maps: the sample has
three Acorn and Dexters branch pages that all resolve to the same site and the same contact form.
Submitting the same form repeatedly is the fastest way to get filtered.

## Company name cleaning

Google Business Profile titles are keyword stuffed. From the sample:

`Alizan Mortgages- Best broker in uk-Residential Buy to let mortgage-- Bridging speacilist-Foreign
national-Commercial expert`

Cut everything after the trading name: `Alizan Mortgages`. Also strip branch suffixes
(`Dexters London Bridge Estate Agent` becomes `Dexters`) and drop `Ltd`/`Limited` where it reads
awkwardly. The name goes into the outreach message, so it needs to read like something a person
would type.

## Target profile

- **Independent firms over national chains.** Chain branch pages route into a generic enquiry queue
  and the chains will not buy leads anyway. The sample's estate agent rows are almost all national
  chain branches.
- **Active firms.** Skip listings with no reviews and no site activity.
- UK only.

## Volume

Aim for 100 to 200 usable rows per category on the first full run, after deduplication. Quality of
the website column matters more than raw count: a row whose URL does not reach a working contact
form is a dead row.
