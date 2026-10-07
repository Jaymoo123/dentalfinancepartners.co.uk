# SCHEMA_F: Property structured data and factual claims audit

Read-only. Repo `C:\Users\user\Documents\Accounting` at HEAD `110643de7`, live HTML fetched
2026-10-07 from `https://www.propertytaxpartners.co.uk`. No repo file was changed.

**One thing to know before reading the tables: live is behind HEAD.** The live homepage stat
block renders "120+ / 14 hr / 168+", while `Property/web/src/lib/site-stats.ts:16-62` at HEAD
holds 200+ / 24hr / 280+ (updated 2026-09-28). Live also still carries the retired
"fixed fee in writing" copy that commit `535843985` (30 Sep) removed from the repo. So every
live finding below has to be read as "live production", not "the code".

---

## 1. How JSON-LD is produced

### Shared builders, `packages/web-shared/schema/`

| File | Lines | What it builds |
|---|---|---|
| `index.ts` | 22-40 | Barrel export of every builder |
| `JsonLd.tsx` | 11-18 | The `<script type="application/ld+json">` component |
| `serialize.ts` | 8-11 | `JSON.stringify` plus `</` escaping |
| `organization.ts` | 12-61 | `buildOrganization`: type from `organizationType`, address, areaServed, knowsAbout, sameAs, parentOrganization with a Companies House `PropertyValue` identifier. `priceRange`, `phone`, `email`, `foundingDate`, `contactPoint` are all optional and only emitted when passed |
| `organization.ts` | 68-79 | `referencedOrganization`: `@id`-only stub for `provider` / `publisher` |
| `organization.ts` | 85-104 | `buildWebSite` with a SearchAction |
| `breadcrumb.ts` | 7-21 | `buildBreadcrumb` |
| `faq-page.ts` | 9-23 | `buildFaqPage`, returns null on an empty list |
| `service.ts` | 18-60 | `buildService`: provider, serviceType, audience, areaServed, hasOfferCatalog |
| `local-business.ts` | 18-65 | `buildAccountingService`: **always writes a PostalAddress**, falling back to `addressLocality: input.city` (line 27) when no address is passed. Optional geo and openingHoursSpecification |
| `local-business.ts` | 99-136 | `buildLocalBusinessJsonLd`, deprecated shim. Hard-codes `priceRange: "££"` and Mon-Fri 09:00-17:00 openingHoursSpecification |
| `lib/local-business-schema.ts` | 1-8 | Deprecated re-export of the shim |

Property does **not** call either city builder in `local-business.ts`. Nothing in
`Property/web/src` imports `buildAccountingService` or `buildLocalBusinessJsonLd`; the city
pages use their own inline function (section 3).

### Property wrappers, `Property/web/src/lib/`

| File | Lines | Notes |
|---|---|---|
| `organization-schema.ts` | 21-70 | Feeds `buildOrganization`. `organizationType: "AccountingService"` (line 35), description from `niche.entity.firm` (line 31), address from `siteConfig.company.registeredOffice`, `sameAs` = Companies House filing + 4 sister brands (14-19, 48-51), `knowsAbout` = the 15 audience page titles plus 8 topics (52-64), `parentOrganization` = Ashfield Trading Ltd + company number (65-68). No telephone, no email: comment at 44-45 says enquiries go via `/contact` |
| `schema.ts` | 7-18 | `buildBreadcrumbJsonLd` |
| `schema.ts` | 28-102 | `buildBlogPostingJsonLd`: BlogPosting + optional FAQPage + optional HowTo. Author is the Organization `@id`, not a Person (74-79) |
| `faq-page-schema.ts` | 7-21 | Property's own FAQPage builder, duplicate of the shared one |
| `calculator-schema.ts` | 10-38 | WebApplication, free tool, provider = Organization `@id` |

### Emission points

| Surface | File:lines | Nodes added |
|---|---|---|
| Root layout | `app/layout.tsx:109` | Organization (`AccountingService`), once per page |
| Breadcrumb component | `components/ui/Breadcrumb.tsx:17,32` | BreadcrumbList, wherever the component renders |
| Homepage | `app/page.tsx:145,152-197` | FAQPage, Service `#service`, WebSite `#website`, WebPage `#webpage`, BreadcrumbList |
| `/services` hub | `app/services/page.tsx:87-92,214` | ItemList |
| `/services/property-accountant` | `.../page.tsx:352-394` | Service `#service` + hasOfferCatalog, FAQPage |
| `/services/landlord-accountant` | `.../page.tsx:286-316` | Service (no `@id`), FAQPage |
| `/services/property-tax-advice` | `.../page.tsx:402-434` | Service (no `@id`), FAQPage |
| `/services/non-resident-landlord` | `.../page.tsx:310-335` | Service (no `@id`), FAQPage |
| `/for/[slug]` | `app/for/[slug]/page.tsx:47-66` | Service `#service` + FAQPage, via the shared builders |
| `/locations/[slug]` | `app/locations/[slug]/page.tsx:21-43,822-848` | inline `AccountingService` + FAQPage |
| `/calculators/section-24-calculator` | `.../page.tsx:32-34` | WebApplication |
| Blog post | `components/blog/BlogPostRenderer.tsx:115,174` | BlogPosting + FAQPage + optional HowTo |
| `/about`, `/contact`, `/locations`, `/spv-company`, `/incorporation` | no local `ld+json` except FAQPage on the last two | Organization + BreadcrumbList only (plus FAQPage where listed) |

### `Property/niche.config.json` fields that feed schema

`entity.firm` (the Organization `description`), `legal_name`, `company.number`,
`company.registered_office.{line1,line2,city,postcode}` (the PostalAddress),
`company.place_of_registration`, `display_name` (`name`), `tagline` (`slogan`),
`brand.publisher_logo_url` (`logo`/`image`), `locations[]` (city page generation),
`seo.locale`. `company.vat_number` is null, so no `vatID` is emitted.

---

## 2. Live node table

Organization is emitted **exactly once per page** on all 17 pages, from the layout, with
`@id` `https://www.propertytaxpartners.co.uk#organization`. No duplicate Organization node
anywhere. Its constant payload: `@type: AccountingService`, PostalAddress 20 Ashfield Avenue
Shipley / Bradford / BD18 3AL / GB, `areaServed` Country United Kingdom, 5 `sameAs`,
`parentOrganization` Ashfield Trading Ltd + 16358723, 23 `knowsAbout`. No geo, no
openingHours, no priceRange, no aggregateRating, no telephone, no email.

| Page | Nodes beyond Organization + BreadcrumbList | Service `@id` | areaServed on Service | hasOfferCatalog | FAQ schema Q | FAQ all visible |
|---|---|---|---|---|---|---|
| `/` | FAQPage, Service, WebSite, WebPage | `#service` | Country United Kingdom | yes, 5 offers | 9 | yes |
| `/about` | none | - | - | - | - | - |
| `/contact` | none | - | - | - | - | - |
| `/services` | ItemList | - | - | - | - | - |
| `/services/property-accountant` | Service, FAQPage | `/services/property-accountant#service` | Country **"GB"** | yes | 12 | yes |
| `/services/landlord-accountant` | Service, FAQPage | **none** | Country "GB" | no | 12 | yes |
| `/services/property-tax-advice` | Service, FAQPage | **none** | Country "GB" | no | 12 | yes |
| `/services/non-resident-landlord` | Service, FAQPage | **none** | Country "GB" | no | 12 | yes |
| `/locations` | none | - | - | - | - | - |
| `/locations/manchester` | second `AccountingService`, FAQPage | **no `@id`** | City Manchester in UK | no | 11 | yes |
| `/locations/leeds` | second `AccountingService`, FAQPage | **no `@id`** | City Leeds in UK | no | 11 | yes |
| `/spv-company` | FAQPage | - | - | - | 8 | yes |
| `/incorporation` | FAQPage | - | - | - | 5 | yes |
| `/for/property-spv-set-up` | Service, FAQPage | `/for/property-spv-set-up#service` | Country United Kingdom | no | 5 | yes |
| `/for/moving-property-into-a-limited-company` | Service, FAQPage | `.../#service` | Country United Kingdom | no | 5 | yes |
| `/calculators/section-24-calculator` | WebApplication | - | - | - | - | - |
| `/blog/property-accountant-services/what-does-a-property-accountant-do` | BlogPosting, FAQPage | - | - | - | 20 | yes |

Across all 17 pages: **zero** `aggregateRating`, `review`, `priceRange`, `openingHours`,
`openingHoursSpecification`, `telephone`, `email`, `geo`, `employee`, `foundingDate`,
`memberOf` or `hasCredential`. Every FAQPage question was found verbatim in the rendered
visible text (checked mechanically, 12 pages with FAQ schema, 0 questions missing).

---

## 3. The `bbfe04378` city builder diff

Commit `bbfe04378`, 5 Aug 2026, "feat(property): commercial money tier + hubs + city
consolidation + demotion sweep". Function `buildCityLocalBusinessJsonLd` in
`Property/web/src/app/locations/[slug]/page.tsx`, before at lines 18-53, after at 20-43.
The current HEAD version is byte-identical to the "after" version, so nothing has been
restored since.

| Property | Before | After | Truthful before? |
|---|---|---|---|
| `@type` | `config.organizationType` (passed as `"AccountingService"`) | hard-coded `"AccountingService"` | yes, unchanged in effect |
| `name` | `"{brand} - {city}"` | same | yes |
| `legalName`, `description`, `url`, `logo`, `image` | present | present | yes |
| `address` PostalAddress `{addressLocality: city, addressCountry: GB}` | present | **removed** | **No.** It asserted the business is located in Manchester, Leeds, London, Birmingham and Bristol. The firm has no offices in those cities. Removing it was correct |
| `areaServed` City + containedInPlace UK | present | kept | yes, the firm does serve those cities remotely |
| `priceRange: "££"` | present | **removed** | **Unverified.** No price band exists in the repo. No `priceRange` appears anywhere in `niche.config.json` or `site.ts`. Visible copy says only "fixed fees, quoted upfront". "££" was invented |
| `openingHoursSpecification` Mon-Fri 09:00-17:00 | present | **removed** | **Unverified, and wrongly scoped.** Firm-level hours would be truthful if the hours are real, but no repo record states them. It was also attached to a per-city node, which implies five premises open those hours |
| Nothing was added | - | - | The after version adds only the comment at lines 14-19 explaining the omissions |

Also removed by the same commit, from `config`: the `organizationType` parameter.

### What Google's documentation says

Google's LocalBusiness structured data reference lists exactly two **required** properties:

> "Required properties: **address** PostalAddress. The physical location of the business.
> Include as many properties as possible. ... **name** Text. The name of the business."

Source: https://developers.google.com/search/docs/appearance/structured-data/local-business
(fetched 2026-10-07, page footer "Last updated 2026-09-08 UTC").

The word `areaServed` does **not appear once** on that page. Google documents no service-area
variant of LocalBusiness markup: service-area businesses are handled in Business Profile, not
in structured data, and Business Profile is banned on this estate. The structured-data
policies page adds:

> "Completeness: Specify all required properties listed in the documentation for your
> specific rich result type. Items that are missing required properties are not eligible for
> rich results."
>
> "Relevance: Your structured data must be a true representation of the page content."

Source: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

**Net verdict.** The post-`bbfe04378` city node is honest and makes no claim the firm cannot
stand behind. It is also ineligible for any LocalBusiness rich result, permanently, because it
has no `address` and Google offers no address-free path. Putting a city PostalAddress back
would buy eligibility by asserting premises that do not exist, which the house rules forbid.
The only address that is both required-field-satisfying and true is the registered office,
which the layout Organization node already carries on every page.

---

## 4. Claims audit of visible copy

Source column: "verified" means a repo artefact shows the derivation. "No source" means no
artefact in `docs/property/house_positions.md`, `niche.config.json` or `docs/` supports it.

| Claim (live wording) | Pages | Repo source | Verdict |
|---|---|---|---|
| "120 + Landlord enquiries", "168 + Properties enquired about" | `/`, `/services` | `lib/site-stats.ts:11-62` carries the SQL, the band logic, the round-down rule and the re-derivation date. HEAD numbers are 200+ and 280+ | Method verified and deliberately understated. Live figures are stale, not false |
| "14 hr Response time" (live) / "24hr" (HEAD) | `/`, `/services` | `site-stats.ts:17`. No measurement record for either number | No source for the figure itself |
| "60 % Property-only focus" (live) / "100 %" (HEAD) | `/`, `/services` | `site-stats.ts:62` sets 100 | Live and HEAD disagree. Neither has a source record |
| "24-hour response **guarantee**" | `/services` (`services/page.tsx:101`) | none | A guarantee, not a statement. No source, no stated remedy |
| "We respond within 24 hours", "Usually the same working day" | all 17 pages (lead panel) | `docs/property/STATE.md:114` records the nurture email making the same promise and flags it | Operational promise, no source record |
| "No obligation and no hard sell" | all 17 | none needed | Statement of conduct, not a fact claim |
| "Fixed fees, quoted upfront" / "You approve the fee before any work starts" | `/`, `/services`, `/spv-company`, `/incorporation`, all 4 `/services/*`, `/locations/*` | `niche.config.json` `entity.howItWorks[2]`: "We agree the scope and the fee before any work starts" | Verified against the entity record |
| "Free consultation", "Book your free consultation" | all 17 | post-`535843985` standard wording | Current approved wording |
| **"and a fixed fee in writing if you want the work done"** | `/about` | **gone from HEAD.** `535843985` removed every instance; `grep "fixed fee in writing"` over `Property/web/src` and `niche.config.json` returns zero | Live leftover of the reverted 30 Sep copy. Repo is clean |
| **"We will come back within 24 hours with where the money is leaking and a fixed fee in writing"** | `/services` | same | Live leftover |
| **"then quote a fixed fee in writing"** | `/services/landlord-accountant` | same | Live leftover |
| "Every client is a landlord, investor, or developer" / "Every client here is a landlord, investor or developer" / "Every client of this practice is a landlord, investor or property business" | `/contact`, `/`, `/services/property-accountant`, `/services/property-tax-advice` | none | Client-base composition claim with no client record in the estate. `site-stats.ts:18-32` states outright that no client records exist anywhere |
| "Our clients / Who we work with" section headings | 4 `/services/*` pages | none | Same issue, softer |
| "One team, not a panel. We work only on property tax, nothing else" | `/about` | `niche.config.json` `entity.firm` and `entity.serves` support the specialism | Specialism verified. "One team" is a staffing claim with no source |
| "One of our accountants calls you" / "a specialist will reply within 24 hours" | `/about`, blog post, `/for/*` | `entity.howItWorks[1]`, `entity.next` | Verified against the entity record |
| "800+ landlord tax guides" | `/` | countable from `Property/web/content/blog` | Checkable, not checked here |
| "IL Individual landlord, 2 properties, Leeds" quote block | `/services/property-accountant` | `house_positions.md:441` permits anonymised personas only | Within the rule |
| "Registered office: 20 Ashfield Avenue, Shipley, Bradford, BD18 3AL" | all 17 (footer) | `niche.config.json` `company.registered_office` | Verified |
| No years-in-business, no staff names, no ACCA/ICAEW/CIOT/ATT membership, no reviews, no ratings, no star counts, no awards | - | - | Clean on all 17 pages. The only credential letters that appear are "ACA / ACCA / CTA / ATT" in the blog post, as generic advice on what to look for in any accountant, not as a claim about this firm |

### Retired-feature leftovers

| Item | Status |
|---|---|
| Paid-PDF offer copy | **Clean on all 17 pages.** No PDF or price copy in any rendered page. The route code is still in the repo (`app/api/calc/pdf-offer/route.ts`, `app/api/calc/pdf-request/route.ts`, `lib/calculators/premium/pdfRequest.ts`) and `privacy-policy/page.tsx` still mentions it |
| Deep-scroll modal | **Still live.** `DeepScrollModal` is imported and mounted at `app/layout.tsx:11,145` at HEAD, and the component ships in the live homepage HTML |
| "Free first call" | Removed from every page by `535843985`, but survives at HEAD in three assistant openers: `Property/web/src/lib/assistant/opener.ts:70,77,110`. These render through the SpecialistWidget, so they are prospect-facing |
| Stale code comment | `app/page.tsx:149-151`: "Property Tax Partners is a referral network, not an accountancy practice with opening hours or a price range of its own." This contradicts the 28 Sep reversal (the brand is the firm). Comment only, no rendered effect |

---

## 5. Mechanical validity

Every `<script type="application/ld+json">` on all 17 pages plus the blog post parsed as
valid JSON: 54 scripts, 57 nodes, 0 parse errors. Checked against Google's documented
required properties per type.

| Finding | Pages | Severity |
|---|---|---|
| `AccountingService` city node missing required `address` | `/locations/manchester`, `/locations/leeds` | Ineligible for a LocalBusiness rich result. Deliberate, see section 3 |
| Homepage `Service` node missing `name` (schema.org Service has no hard required property, but every Google Service-adjacent surface wants a name, and the node carries only `serviceType`) | `/` (`app/page.tsx:152-172`) | Real gap, cheap to close |
| `Service` node has no `@id` | `/services/landlord-accountant`, `/services/property-tax-advice`, `/services/non-resident-landlord` | No stable node identity, no cross-page linking |
| `Service.provider` written as an inline Organization with **no** `@id` | `/services/property-tax-advice`, `/services/non-resident-landlord` | Parsers see a second, nameless Organization instead of resolving to `#organization`. The other pages do carry the `@id` |
| `areaServed` written as `{"@type":"Country","name":"GB"}` | all 4 `/services/*` | Inconsistent with the Organization node and every `/for/*` page, which both say "United Kingdom". "GB" is a code, not a name |
| City `AccountingService` has no `@id` | both city pages | Two `AccountingService` nodes per city page, one identified and one not |
| `BreadcrumbList` nodes have no `@id` | all pages | Not required. Fine |
| `FAQPage`, `BreadcrumbList`, `WebSite`, `WebPage`, `WebApplication`, `BlogPosting` | all | All required properties present. No errors |

Google's Rich Results Test has no public API and is not scriptable. The checks above are a
local JSON parse plus a required-property comparison against Google's published tables; they
catch missing fields, not Google's own eligibility logic. Manual confirmation:
https://search.google.com/test/rich-results (and the Schema Markup Validator at
https://validator.schema.org/).

---

## 6. The truthful signal set

### (a) Available now from repo facts

Structured data:

- `Organization.name`, `legalName`, `url`, `logo`, `image`, `description` from `entity.firm`, `slogan` from `tagline`. All already live.
- `Organization.address` = the registered office. Already live, and it is the one PostalAddress that is true.
- `Organization.parentOrganization` with the Companies House `PropertyValue` identifier. Already live.
- `Organization.sameAs` = the Companies House filing plus the four sister-brand homepages. Already live.
- `Organization.knowsAbout`, 23 entries from the audience rows. Already live.
- `Organization.areaServed` = Country United Kingdom, supported by `entity.where`. Already live.
- `Service.name` on the homepage node, and `@id` plus an `@id`-carrying `provider` on the three `/services/*` nodes that lack them. Pure wiring, no new facts.
- `areaServed` normalised to "United Kingdom" across the four `/services/*` nodes, matching the Organization node and the `/for/*` pages.
- `@id` on the two city `AccountingService` nodes.
- `Service.hasOfferCatalog` on the three `/services/*` pages that have a visible services list but no catalog. The offer labels are the visible headings, so nothing new is asserted.
- `Service.termsOfService` pointing at `/terms`, and `Organization.privacyPolicy`-adjacent links. Both documents exist on site.
- `hasPart` / `isPartOf` linking the city and service pages to `#website`. Mechanical.
- `WebPage` + `BreadcrumbList` on the pages that currently have neither beyond breadcrumbs.

Visible trust elements:

- The registered-office and company-number disclosure line, already in the footer on all 17 pages.
- The enquiry-derived stat block, once live catches up to the HEAD figures and their SQL derivation.
- The specialism statement from `entity.firm` and `entity.serves`.
- The process steps from `entity.howItWorks`, which already match the on-page "how it works" blocks.
- Anonymised personas, already used and explicitly permitted by `house_positions.md:441`.
- The guides count, which is countable from the content directory.

### (b) Needs exactly one owner fact each

| Signal | The fact needed |
|---|---|
| `Organization.telephone` and a visible phone number | A real published number the firm answers, and whether it should be published at all given the current form-only routing |
| `Organization.email` | Whether any inbox is monitored for public display. `contact.email` in config is marked internal-routing only |
| `Organization.openingHoursSpecification` at firm level | The real hours. Mon-Fri 09:00-17:00 was invented by the deprecated shim, not recorded anywhere |
| `Organization.priceRange` | A real band. "££" was invented |
| `Organization.foundingDate` | The date the firm began trading under this brand, or the Ashfield Trading Ltd incorporation date if that is the intended meaning |
| `Organization.numberOfEmployees` | A real headcount, if the owner wants "one team" to be more than a phrase |
| `memberOf` / `hasCredential` | Which professional body, if any, the firm or its people hold. None is recorded |
| `Organization.vatID` | Whether Ashfield Trading Ltd has registered since. `site.ts:76-78` says not yet |
| A defensible "24-hour response" claim, and whether "guarantee" stays | The measured median first-response time, and the remedy if it is missed |
| "Every client is a landlord, investor or developer" | Whether a client base exists to describe at all, now that the brand is the firm. `site-stats.ts:18-32` says no client records exist in the estate |

### (c) Not permitted under the rules

- `aggregateRating`, `reviewCount`, `review`, star displays, "rated X by Y clients". No reviews exist, and Google's own note on the LocalBusiness page restricts `aggregateRating` to sites capturing reviews about other businesses.
- Any per-city `PostalAddress`, `geo`, or city-level `openingHoursSpecification`. No offices in those cities.
- `department` nodes per city, same reason.
- Anything requiring or implying a Google Business Profile: map pins, place IDs, `hasMap`, "find us on Google".
- Named staff, `employee` or `founder` Person nodes, author bylines naming individuals.
- Client counts, client names, case studies tied to a real identifiable client, "trusted by N landlords", "£X saved".
- Professional-body logos or `memberOf` for a body the firm does not belong to.
- Awards, accreditations, or trading-history claims ("established 20XX", "over N years") without the fact in (b).
- Disclosure of the partner-network arrangement anywhere outside consent, privacy and terms copy.

---

## Could not verify

- Whether the live deployment lag is intentional. HEAD is ahead of production on at least the stat figures and the 30 Sep copy revert; memory says roughly 120 commits are unpushed. Everything in section 2 and the live column of section 4 describes production, which no longer matches the code.
- The source of the "24 hour" and "same working day" response claims. No measurement record was found in `docs/property/`.
- The "60 %" versus "100 %" property-only-focus figure. Live and HEAD disagree and neither carries a derivation.
- The "800+ landlord tax guides" count was not counted.
- Whether the paid-PDF routes are dead code or still reachable. The API routes exist at HEAD and `privacy-policy` still references the offer, but no audited page links to it. Other entry points were not swept.
- Whether `DeepScrollModal` still being mounted is a deliberate keep or a missed removal.
- Whether the three `assistant/opener.ts` "free first call" strings were deliberately left out of the 30 Sep revert.
- Only Manchester and Leeds city pages were fetched. London, Birmingham and Bristol come off the same template and the same builder, so the city-node findings apply, but they were not read live.
