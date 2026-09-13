# Property reference answers (2026-09-13)

Read-only investigation. Nothing was edited. Property and `packages/web-shared/`
were read, never touched. Every answer below is verified against source, not
against the brief.

Five questions, one section each. Final section lists the Property defects
encountered and confirms each is excluded from the recommendations.

---

## 1. Article body typography

### What Property actually does

Property emits **no bare `prose` class anywhere**. Its article wrapper is:

`Property/web/src/components/blog/BlogPostRenderer.tsx:262`

```tsx
<div className="article-body prose-blog mt-10">
```

and the same pair on the guides route:

`Property/web/src/app/resources/[topic]/page.tsx:88`

```tsx
className="article-body prose-blog mt-10"
```

`article-body` carries **no CSS rule at all** in Property (`grep article-body`
over the whole Property tree returns only those two call sites). It is an inert
hook. **`prose-blog` is the entire mechanism**, and it is a hand-rolled,
unlayered descendant-selector block in `Property/web/src/app/globals.css`,
lines **228-372**, under the banner `/* BLOG CONTENT STYLING */`.

Verbatim (Property/web/src/app/globals.css:228-372):

```css
.prose-blog {
  max-width: 65ch;
  color: var(--slate-700);
  font-size: 1.0625rem;
  line-height: 1.75;
}

.prose-blog h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-left: 4px solid var(--emerald-600);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--slate-900);
}

.prose-blog h3 {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--slate-900);
}

.prose-blog p {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}

/* Prose link styling applies to in-text links only. Tracked CTA buttons
   (anything carrying data-cta) keep their own colours — without the :not()
   this rule painted emerald text onto emerald button backgrounds. */
.prose-blog a:not([data-cta]) {
  color: var(--emerald-700);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}

.prose-blog a:not([data-cta]):hover {
  color: var(--emerald-600);
}

.prose-blog ul,
.prose-blog ol {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose-blog li {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose-blog strong {
  font-weight: 700;
  color: var(--slate-900);
}

/* These article-table rules must NOT leak into embedded `.not-prose` components
   (e.g. the Excel-grid preview), whose own utility classes would otherwise lose
   on specificity. `:not(.not-prose *)` exempts anything inside a not-prose
   subtree; normal blog tables are unaffected. */
.prose-blog table:not(.not-prose *) {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.prose-blog th:not(.not-prose *) {
  background: var(--slate-900);
  color: white;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.prose-blog td:not(.not-prose *) {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border);
}

.prose-blog tr:nth-child(even):not(.not-prose *) {
  background: var(--slate-50);
}

.prose-blog aside {
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem 1.75rem;
  border-left: 4px solid var(--emerald-600);
  background: var(--emerald-50);
  border-radius: 0 4px 4px 0;
}

.prose-blog aside p:first-child {
  margin-top: 0;
  font-weight: 700;
  color: var(--slate-900);
  font-size: 1.0625rem;
}

.prose-blog aside p {
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--slate-700);
}

.prose-blog aside .aside-cta-row {
  margin-top: 1rem;
  margin-bottom: 0;
}

.prose-blog aside a.aside-cta,
.prose-blog aside a.aside-cta:hover {
  display: inline-block;
  padding: 0.625rem 1.125rem;
  background: var(--emerald-700);
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.prose-blog aside a.aside-cta:hover {
  background: var(--emerald-600);
}

.prose-blog aside a.aside-cta:focus-visible {
  outline: 2px solid var(--emerald-600);
  outline-offset: 2px;
}
```

Note what is **absent** from Property's block and present in Solicitors':
`blockquote`, `code`, `pre`, `hr`, `img`. Property's raw HTML content does not
emit those, so it never styled them.

### Can this be shared?

Yes, and safely. **Property does not import the shared kit.**
`Property/web/src/app/globals.css:1-4` imports only `tailwindcss` and
`tw-animate-css`; it never imports
`@accounting-network/web-shared/design/globals-standard.css`. The seven sites
that do import the kit are construction-cis, Dentists, generalist, Medical,
Solicitors (and contractors-ir35 references it in comments only). Adding an
article-typography block to
`packages/web-shared/design/globals-standard.css` (295 lines today; it contains
`.hero-reveal`, `.marquee-*`, `.related-card`, `.eyebrow-rule` and **no article
typography at all**) therefore **cannot change Property's output**.

That is the safe shared home. No edit to Property is required or permitted.

### Which base is better: Property's `.prose-blog` or Solicitors' `.prose`

**Solicitors is the better base.** `Solicitors/web/src/app/globals.css`:

- lines **284-355**: a bare `.prose` block inside `@layer components`
  (`max-width: 68ch`, `h2`, `h3`, `p`, `ul/ol`, `li`, `a`, `a:hover`, `strong`,
  `code`, `blockquote`) — 12 rules, the only hand-rolled bare `.prose` in the
  estate, and proven in production;
- lines **357-513**: a fuller `.article-body.prose-blog` block that Property's
  does not match, adding `blockquote`, `hr`, `img`, `code`, `pre`,
  `pre code` and responsive `@media` refinements;
- lines **522-548**: the same `aside`/`aside-cta` treatment Property has.

Three reasons it beats Property's block as the shared base:

1. **It is `@layer components`-wrapped.** Property's is unlayered, which is the
   documented Tailwind v4 trap (an unlayered rule beats every utility; it is
   what produced the contractors-ir35 62-post CTA defect and Medical's own
   recorded trap). A layered block lets a consumer's `text-white` utility win.
2. **It already styles the bare `.prose` selector**, which is exactly the class
   the eleven broken sites are emitting. Adopting it means **zero markup
   changes** on those sites.
3. **It is token-based** (`var(--primary)`, `var(--ink)`, `var(--accent)`,
   `var(--surface-elevated)`), not brand-hardcoded. Property's block hardcodes
   `--emerald-600` / `--slate-900`, which do not exist on most sites.

### What the smaller sites should do

**Port Solicitors' `@layer components` block (globals.css:284-355 for `.prose`
plus 357-513 for `.article-body.prose-blog`) into
`packages/web-shared/design/globals-standard.css`, token-driven, and have each
site `@import` the kit.** No markup change: `class="prose prose-neutral"` keeps
working because `prose-neutral` is simply an inert no-op class alongside a real
`.prose`. Sites not yet importing the kit (charities, care, crypto, ecommerce,
hospitality, pharmacies, startups-tech) add the one `@import` line at the top of
their `globals.css`, exactly as `construction-cis/web/src/app/globals.css:5`
does. Do **not** install `@tailwindcss/typography` — it is installed nowhere,
would need an `@plugin` line in eleven files, and buys nothing the hand-rolled
block does not already deliver.

---

## 2. `section-label`

### Property's rule

`Property/web/src/app/globals.css:378-387`, under `/* UTILITY CLASSES */`:

```css
.section-label {
  display: inline-block;
  background: var(--emerald-600);
  color: white;
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

It is a **solid filled chip** (white on emerald), not tinted text. That is why
the five sites emitting the class with no rule render effectively invisible: the
class was supposed to paint its own ground.

### contractors-ir35's version

`contractors-ir35/web/src/app/globals.css:283-299`, verbatim including its
comment:

```css
/* `.section-label` paints BOTH its own ground and its own ink (white on
   var(--accent) #0e7490 = 5.36, PASS), so no consumer ever depended on it
   beating a utility — all 19 consumers add layout utilities only (mb-*).
   Layered for the same reason as the rest: a future `bg-*`/`text-*` on one of
   them must win. */
@layer components {
  .section-label {
    display: inline-block;
    background: var(--accent);
    color: white;
    padding: 0.375rem 0.875rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
```

### Which is the better base

**contractors-ir35.** Geometry is byte-identical to Property's; the two
differences are both improvements: it is wrapped in `@layer components` (so a
consumer utility can override it) and it uses the `var(--accent)` token rather
than a hardcoded `--emerald-600` that most sites do not define. It also carries
a verified contrast figure.

### What the smaller sites should do

Put the contractors-ir35 form into
`packages/web-shared/design/globals-standard.css` next to the existing
`.eyebrow-rule` rule (that file already owns eyebrow treatments), keyed on
`var(--accent)`. The five sites with uses and no rule — **charities (7 source
uses, 16 on the rendered homepage), crypto, hospitality, pharmacies,
startups-tech** — then inherit it with no markup change. Sites with their own
copy (Property, construction-cis, digital-agency, divorce-finances,
wills-probate) are unaffected.

---

## 3. JSON-LD `@type` / Organization node

### What Property publishes

`Property/web/src/lib/organization-schema.ts:3-44`, in full:

```ts
export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    // Registered legal entity vs the public-facing trading name (brand).
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    // When Ashfield Trading Ltd becomes VAT-registered, add: vatID: siteConfig.company.vatNumber
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    },
    // No public telephone is advertised: enquiries are handled via the on-site
    // /contact form, so the ContactPoint (which would otherwise be empty) is omitted.
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    knowsAbout: [
      "Section 24 mortgage interest relief restriction",
      "Buy-to-let limited company incorporation",
      "Stamp Duty Land Tax",
      "Capital Gains Tax on residential property",
      "Making Tax Digital for Income Tax",
      "Non-resident landlord tax",
      "Furnished holiday lettings",
      "Property portfolio tax planning",
    ],
  };
}
```

Resolved against `Property/niche.config.json`, the published object is:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.propertytaxpartners.co.uk#organization",
  "name": "Property Tax Partners",
  "legalName": "Ashfield Trading Ltd",
  "alternateName": "Property Tax Partners",
  "url": "https://www.propertytaxpartners.co.uk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20 Ashfield Avenue, Shipley",
    "addressLocality": "Bradford",
    "postalCode": "BD18 3AL",
    "addressCountry": "GB"
  },
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.propertytaxpartners.co.uk/og-placeholder.svg"
  },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "Specialist property accountants for UK landlords. Section 24 planning, MTD compliance, incorporation analysis. Fixed fees, 24hr response. Free calculators.",
  "slogan": "Get your property tax sorted",
  "knowsAbout": [ ... 8 topics as above ... ]
}
```

**Included:** `@context`, `@type`, `@id`, `name`, `legalName`, `alternateName`,
`url`, `address` (PostalAddress), `logo` (**ImageObject**, not a bare string),
`areaServed` (**Country object**, not a string array), `description`, `slogan`,
`knowsAbout`.

**Deliberately omitted, with a source comment for each:** `telephone` /
`contactPoint` (no public phone advertised; enquiries go via `/contact`),
`vatID` (Ashfield Trading Ltd is not VAT-registered), `sameAs`,
`aggregateRating`, `founder`, `numberOfEmployees`, `openingHours`.

**Scope:** `buildOrganizationJsonLd` is imported in exactly one place —
`Property/web/src/app/page.tsx:10`, used at `:146`. Property publishes the
Organization node **on the homepage only**. Other pages reference it by
`@id` (`{ "@id": "…#organization" }`) rather than re-emitting it. The homepage
additionally emits a separate `AccountingService` node at
`Property/web/src/app/page.tsx:152-171` with
`@id: …#localbusiness` and `parentOrganization: { "@id": …#organization }`.

### What the smaller sites should do

charities' `@type: ["ProfessionalService", "AccountingService"]`
(`charities/web/src/lib/schema.ts:19`, driven by
`charities/niche.config.json:103`) is **not** Property's shape. Property's answer
is: **one single-string `"@type": "Organization"` node for the legal entity, and
a separate `AccountingService`/`LocalBusiness` node linked by
`parentOrganization`.** Adopt that split. Also adopt the two field shapes
charities currently flattens: `logo` as an `ImageObject` (charities emits a bare
string at `schema.ts:25`) and `areaServed` as a `Country` object (charities
passes `niche.seo.service_areas`, an array of strings, at `schema.ts:33`).
Keep `slogan`. Consider moving the node out of `layout.tsx:76` (every page) to
the homepage only, matching Property.

**Do not copy Property's `description` value** — see defect 5 below.

---

## 4. Lead consent text

### Property's wording, verbatim

`Property/web/src/config/site.ts:39`:

```
To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.
```

292 characters. Each form appends `" See our Privacy Policy."`
(`Property/web/src/components/forms/LeadForm.tsx:55` and `:410`; also
`SpecialistWidget.tsx:379/458/615/751`, `MiniCapture.tsx:19`,
`ResultGateModal.tsx:18`, `MobileToolSlot.tsx:12`).

### The brief's premise is FALSE on two counts

**(a) charities' text is not a variant of Property's — it is byte-identical.**
Verified programmatically: `Property/web/src/config/site.ts:39` and
`charities/web/src/config/site.ts:19` are both 292 characters and compare
equal. charities did not invent this wording; it inherited the estate standard.

**(b) Property does run a real pool model, and it runs it for every site,
charities included.** Property's lead code has two separate paths and the brief
conflates them:

- **Notification** (`Property/web/src/lib/lead-routing.ts:1-80`): one internal
  inbox (`junayd@ashfieldtrading.com`, `resolveLeadTo`) plus one fixed CC
  (`umair@propertytaxpartners.co.uk`, `DEFAULT_PARTNER_CC`, `resolveLeadCc`).
  **Property's own routing here is the same one-inbox-plus-one-CC shape the
  brief attributes only to charities.** This path is internal ops, not the
  disclosed sharing.
- **Sharing / the pool** (`Property/web/src/lib/leads/offer-send.ts`): real
  multi-firm distribution. `sendOffers` (`:250`) calls
  `matchingBuyers(source, tier)` (`offer-config.ts:129-138`), inserts a
  `lead_offers` row per matching firm, emails each an anonymised teaser, and the
  firm accepts by replying YES. Offers expire (`expires_at`), suppressed
  enquirers are excluded (`isSuppressed`), raw-supplied leads are excluded, and
  the gate at `:278` checks the lead's **own stored** `consent_text` via
  `consentAllowsSharing` (`:214-219`). Crucially, `matchingBuyers` filters
  `lead_buyers` on `sources cs.{<source>}` — it is **source-agnostic and
  DB-driven**, so a charities lead reaches exactly the same pool as a Property
  lead the moment a buyer row lists `charities`.

So the wording's truth condition is identical for both sites: it depends on
signed buyer rows in `lead_buyers`, not on per-site code. Per memory, buyer #1
is still open, which means the sentence is currently forward-looking **for
Property too** — not true for Property and false for charities.

### What charities should do

**Change nothing.** charities is already at exact parity with Property, and the
honest fix (if the owner wants one) is an estate-wide question about the pool's
live buyer count, not a charities-only rewrite.

**Friction flag.** Any edit here re-runs the August 2026 incident: the 08-15
Annex B.2 wording ("up to three firms / may be paid a fee") took mini-form
step-2 completion from 6/20 to 0/18 and mini-form leads from 8/wk to 1/wk;
reverted 08-24 (`435cc12e`) byte-exact, and the 09-09 watch closed at PARTIAL
repair (~6.1/wk vs ~10/wk pre-incident). A shorter or longer string is a
conversion change, not a copy change. Two hard constraints on any future edit:
the string must keep the anchor phrase **"a firm from our specialist partner
network"** or `consentAllowsSharing` stops matching and every lead silently
fails the pool gate (`offer-send.ts:207-212`); and
`Property/web/src/tests/consent-anchor-drift.test.ts:58-64` asserts that every
site's `leadConsentText` passes that gate.

---

## 5. Footer identity line

Property's footer has **no editorial-scope sentence**. Its identity slot is
three elements in `Property/web/src/components/layout/SiteFooter.tsx`:

1. **:76-79** — the brand paragraph, which renders `siteConfig.description`
   verbatim:

```tsx
<p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
  {siteConfig.description}
</p>
```

   resolving to: `Specialist property accountants for UK landlords. Section 24
   planning, MTD compliance, incorporation analysis. Fixed fees, 24hr response.
   Free calculators.`

2. **:143-145** — `siteConfig.company.legalDisclosure`
   (`Property/web/src/config/site.ts:77-80`), which renders:
   `Property Tax Partners is a trading name of Ashfield Trading Ltd, a company
   registered in England and Wales (company no. 16358723). Registered office: 20
   Ashfield Avenue, Shipley, Bradford, BD18 3AL.`

3. **:147-149** — the copyright line:
   `© {year} Ashfield Trading Ltd t/a Property Tax Partners.`

charities' footer (`charities/web/src/components/layout/SiteFooter.tsx:66-69`)
already carries 2 and 3 identically; its extra sentence is
`Specialist charity accountants. Editorial content only. Speak to us for advice
specific to your organisation.`

### What the smaller sites should do

**Keep the editorial-scope sentence and do not import Property's slot 1.**
Property's brand paragraph is the vehicle for a defect (fee claim + turnaround
promise, see below). charities' sentence makes a scope statement and no
commercial claim, which is the safer copy. Structural parity is already met via
`legalDisclosure` + the `t/a` copyright line. If a brand paragraph is wanted,
source it from a claim-free `niche.config.json` description.

---

## Property defects encountered — all EXCLUDED from the above

| # | Defect | Where seen | Status in this doc |
|---|---|---|---|
| 1 | `WhatToExpectCard` default props publish a fee line no page authored | Property; component also present in Solicitors, construction-cis, generalist | Not recommended, not referenced. |
| 2 | `FaqSection` is a Radix accordion with no `forceMount`, so closed answers are absent from server HTML while the JSON-LD still asserts them | Property; component present in Dentists, Medical, Solicitors, construction-cis, contractors-ir35, generalist | Not recommended. Section 3 recommends copying the Organization node **only**, not `FaqSection` or its FAQPage JSON-LD. |
| 3 | `NumberedReasons` animates off keyframe classes its siblings lack | Property; component present in Dentists, construction-cis, generalist | Not recommended, not referenced. |
| 4 | `LeadCTAPanel` call sites pass "Fixed fees, quoted upfront" and "24-hour response" | Property call sites (~28 pages under `Property/web/src/app/`) | Not recommended. Correct port value is `proofPoints={[]}` with no invented replacement. |
| 5 | `Property/niche.config.json:24` description publishes "Fixed fees, 24hr response", rendering in the footer (`SiteFooter.tsx:78`) and in the Organization JSON-LD `description` on the homepage | Property | Explicitly excluded in sections 3 and 5. Copy the node's **shape**, not its `description` value. |

Additional unlayered-CSS hazard noted while reading: Property's `.prose-blog`
and `.section-label` blocks are **unlayered**, which is the recorded Tailwind v4
trap (an unlayered rule beats every utility). Sections 1 and 2 therefore
recommend the **layered** Solicitors / contractors-ir35 variants as the base, not
Property's raw blocks. Property's own output is untouched.

### Smaller sites already carrying a Property defect

Grep over all sites for the defect-4 strings:

- **generalist** — `web/src/app/page.tsx:69` (`"24-hour response window"`) and
  `web/src/app/glossary/[slug]/page.tsx:112` (`"24-hour response, usually same
  day"`).
- **crypto** — `web/src/app/page.tsx:732` (`{ title: "24-hour response", sub:
  "Usually the same working day" }`).
- **hospitality** — `web/src/app/page.tsx:764`, same string.
- **startups-tech** — `web/src/app/page.tsx:759`, same string.
- **pharmacies** — `web/src/app/page.tsx:824`, same string.

Clean: Dentists (`calculators/[slug]/page.tsx:184` is a comment recording the
ban), contractors-ir35 (`calculators/page.tsx:148`,
`calculators/[slug]/page.tsx:176`, both comments recording the ban), Medical,
Solicitors, construction-cis, charities, care, ecommerce.

Also noted: `construction-cis/niche.config.json:24` carries "Fixed fees, plain
English" — a fee claim of the same family as defect 5, though without the
turnaround promise.
