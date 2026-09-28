# Target list spec: 50 UK accounting firms

Brief for the list builder. Same method as the August 2026 buyer scrape
(`BUYER_SCRAPE_SPEC_2026-08-13.md`), narrowed to one category.

## Format

Two columns, one row per firm. Nothing else.

| Column | Notes |
|---|---|
| `Company Name` | Trading name, cleaned (see below). Goes into the message, so it must read like something a person would type. |
| `Website` | The firm's own site. Contact page where findable, root domain otherwise. |

No email column. No phone column. Outreach runs through the firm's own website contact form.
We do not harvest email addresses and we do not buy lists.

## Who qualifies

All six must be true.

1. **1 to 10 staff.** Independent practice, not a branch of a national. Check the team page,
   the Companies House employee band, or just the tone of the site.
2. **UK only.**
3. **Dated or template site.** Stock photography of handshakes, a theme you can name on
   sight, mobile layout that breaks, or a copyright line that stopped updating.
4. **No blog, or a blog that died 12 or more months ago.** Check the date on the most recent
   post. A blog with three posts from 2023 qualifies. An active blog disqualifies: they
   already have someone.
5. **No visible marketing.** No ads in the SERP for their own name plus service terms, no
   evidence of an agency, no tracking-heavy site, no obvious SEO landing pages.
6. **Has a working contact form.** This is the deliverable. A firm with only an email address
   or only a phone number is a dead row.

## Who does not

- Firms with an active blog, an agency credit in the footer, or obvious paid search.
- Franchises and branches of nationals. Their enquiry forms route into a central queue.
- Firms with no working website, or whose only presence is a Google Business Profile,
  a Facebook page or a directory listing.
- Bookkeeping-only outfits with no advisory work.
- Any firm currently a partner, prospect or lead buyer of the estate. Check before sending.

## Sources

Google Maps by town, ICAEW and ACCA firm directories, AAT licensed accountant search,
Companies House filing agents. Work town by town rather than nationally, so the mix stays
independent rather than chain.

## URL rules (the part that gets skipped)

- Firm's own site only. No directory profiles, no aggregator listings, no social pages.
- Resolve shorteners and record the real destination.
- Strip tracking parameters, everything from `?utm_source=` onwards. Google Business Profile
  links carry these routinely.
- Prefer `/contact`, `/contact-us`, `/get-in-touch`. Root domain is acceptable if the scrape
  cannot find one.
- **Deduplicate by domain, not by company name.** Multi-office firms list each office
  separately on Maps and they all resolve to the same form. Submitting the same form twice is
  the fastest way to get filtered.

## Name cleaning

Directory titles are keyword stuffed. Cut everything after the trading name, strip branch
suffixes, and drop `Ltd` or `Limited` where it reads awkwardly. "Smith & Co Accountants
Manchester - Tax Returns, Payroll, Bookkeeping" becomes "Smith & Co".

## Volume

50 usable rows for the first run. Quality of the website column beats raw count: a row whose
URL does not reach a working contact form is worth nothing. Send the first 10 for review
before completing the rest.

## Data protection note

- Every row is a business, published on the business's own public website, and the two fields
  captured (trading name, website URL) are business contact information, not personal data
  about an identified individual.
- Contact is made through the firm's own contact form, which the firm publishes to invite
  enquiries. That is a business-to-business approach on the basis of legitimate interests
  (UK GDPR Article 6(1)(f)), and PECR direct marketing rules on electronic mail do not bite,
  because we are not sending email.
- **No email harvesting.** Do not capture, store or use email addresses from these sites,
  including ones printed in the page text.
- One message per firm, one follow-up, then stop. Any request to stop is honoured
  immediately and the row is marked closed.
- Do not capture names of individual staff members.
