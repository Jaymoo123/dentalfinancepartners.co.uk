# Implementation brief, optimise the Property Tax Partners HOMEPAGE for its national head-keyword family

**Page:** https://www.propertytaxpartners.co.uk/
**Source file to hand-edit:** `Property/web/src/app/page.tsx`
**Web root for build:** `Property/web`
**Audience:** UK landlords, buy-to-let investors, property developers
**Voice:** practical, figures-and-legislation, no hard sell. NO em-dashes anywhere (use commas, parentheses, full stops, or middle dots · ). Anonymised social proof only.

This is a TSX server-component commercial landing page, not a markdown blog post. Tailwind utility classes DO work here. The `faqs` array inside the file feeds `buildFaqPageJsonLd`, so editing it updates the FAQPage schema automatically. Keep the existing visual design, hero layout, components, and lazy-loaded calculators. This pass is SEO content + structure + schema only.

---

## 1. Role + diagnosis

You are optimising the homepage so it becomes the canonical national entity for "property accountant", "property tax accountant", "landlord accountant", "buy to let accountant", and "property investment accountant". Today the homepage owns **0 of 149** head-family queries (1,578 impressions in 90 days, effectively 0 clicks because everything sits page 3 to 8). The national head term is instead caught by a single blog file: `content/blog/london-property-accountant.md` (canonical `/blog/property-accountant-services/london-property-accountant`; the URL `/blog/property-accountant-services/property-specialist-accountant-london` 301-redirects into the same file via `src/middleware.ts` line 351). That London-flavoured blog ranks "property accountant" at pos 28, "property tax accountant" at pos 31.9, "property specialist accountant" at pos 30.2, and "property investment accountant" at pos 44. The root cause is an entity-signal mismatch: the homepage H1 is a keyword-less slogan ("Property tax sorted. Your way."), the title leads with "Landlord Accountant" and omits "property accountant" entirely, the page is 67 words with 0 H2 and only {Organization, FAQPage} schema, while page-1 competitors run 638 words median with Organization + WebSite + WebPage + BreadcrumbList near-universally. A national, London-agnostic blog is out-ranking the homepage for the national term because the homepage gives Google nothing national to anchor to. The fix: make the homepage unambiguously the national "property accountant" page (title, H1, keyword-rich prose, full schema graph), then point the London blog UP at it and nudge that blog back toward its London long-tail so the two pages stop competing for the national head term. Location pages (`/locations/london`, `/leeds`, `/manchester`) correctly catch the geo variants and must NOT be touched.

---

## 2. Title + meta

Lead the title with the highest-volume national head token ("property accountant", 144 impr; "property accountants", 62; "property tax accountant", 68). Keep <=60 chars.

**Current title (60 chars):**
`Landlord Accountant UK | Section 24, MTD & Incorporation Specialists`
(actually 67 chars, and it never says "property accountant")

**Proposed title (recommended, 57 chars):**
`Property Accountants UK | Specialist Landlord Tax Advice`

Rationale: leads with the plural national head token (so it matches both "property accountant" and "property accountants"), keeps "landlord" for the second-strongest family, signals national ("UK") and intent ("tax advice"). If the engineer prefers the singular head token, the alternate is `Property Accountant UK | Specialist Landlord Tax Advice` (54 chars).

**Current meta description:**
`Specialist property accountants for UK landlords. Section 24 planning, MTD compliance, incorporation analysis. Fixed fees, 24hr response. Free calculators.`

**Proposed meta description (151 chars, keep most of the current, it is already good):**
`Specialist property accountants for UK landlords and investors. Section 24, MTD, incorporation and CGT planning. Fixed fees, 24hr response, free calculators.`

Update the `openGraph.title` and `twitter.title` too: change `${siteConfig.name} | Property Tax Specialists` to `${siteConfig.name} | Property Accountants for UK Landlords` so the head token is present in social cards as well. Leave `alternates.canonical: siteConfig.url` unchanged. Do not change OG/Twitter images.

---

## 3. H1 (currently a slogan, the single highest-leverage fix)

The slogan moves DOWN to a sub-headline `<p>`. The H1 must carry a head keyword.

**Option A (recommended):**
`Property accountants for UK landlords and investors`
Why: contains the plural national head token, names both audience segments, reads naturally, national framing. Best entity match for the title.

**Option B:**
`Specialist property tax accountants for landlords`
Why: captures "property tax accountant" + "specialist property accountant" + "landlord accountant" in one line. Slightly narrower on "investor" intent.

**Option C:**
`Property accountant and landlord tax specialists`
Why: tightest, hits "property accountant" and "landlord ... specialist". Reads a touch more like a label than a sentence.

**Recommendation:** Option A.

The current slogan becomes the sub-headline. Replace the existing `<h1>` block (page.tsx lines 172-177) so the H1 holds Option A and the slogan + existing supporting line become the `<p>`:

```tsx
<h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl">
  Property accountants for UK landlords and investors
</h1>
<p className="mt-4 sm:mt-6 text-lg leading-relaxed text-white sm:text-xl lg:text-2xl max-w-2xl">
  Property tax sorted, your way. Whether you need to get ready for Making Tax Digital, run a buy-to-let limited company, or get specialist tax advice on Section 24, CGT, and incorporation.
</p>
```

Keep the existing hero image, the blue "MTD is now live for landlords" badge, the two CTA buttons, and the `trustBadges` row exactly as they are.

---

## 4. On-page sections + entity coverage

Goal: lift the page from 67 words to roughly the competitor median (target 550 to 750 words of genuine prose) WITHOUT redesigning anything. Add prose into existing section shells and add two small new blocks. Keep all four calculators lazy-loaded and untouched.

### 4a. Keyword-rich intro paragraph under the hero
Add a new short `<section>` immediately AFTER the MTD Urgent Banner section (after page.tsx line 203, before the "Core Services" section). Two short paragraphs, white background, constrained width, that establish the national property-accountant entity in plain prose:

```tsx
<section className="bg-white py-10 sm:py-14">
  <div className={siteContainerLg}>
    <div className="max-w-3xl">
      <p className="text-base sm:text-lg leading-relaxed text-slate-700">
        Property Tax Partners is a firm of specialist property accountants working with landlords, buy-to-let investors, and property developers across the UK. We work only with property, so Section 24, the Non-Resident Landlord Scheme, capital gains on disposals, ATED, and the personal-versus-limited-company decision are core competence rather than an occasional sideline.
      </p>
      <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
        Whether you hold one rental flat or a portfolio of thirty, a property tax accountant turns the rules into a plan: modelling your Section 24 finance-cost restriction, getting you compliant with Making Tax Digital for Income Tax (live since 6 April 2026), running the incorporation arithmetic before you commit, and filing your capital gains within the 60-day HMRC window. Fixed fees, 24-hour response, no hard sell.
      </p>
    </div>
  </div>
</section>
```

Entities/terms this prose must include (so the page reads as the canonical property-accountant page): **property accountant**, **property tax accountant**, **specialist property accountant**, **landlord**, **buy-to-let investor**, **property developer**, **Section 24**, **Making Tax Digital / MTD for Income Tax**, **incorporation / limited company**, **capital gains tax / CGT**, **Non-Resident Landlord Scheme**, **ATED**, **portfolio**, **UK / national**. The block above already covers these; do not pad beyond natural use.

### 4b. Relabel "What we specialise in"
The current H2 at page.tsx line 209-211 reads "What we specialise in" (no keyword). Change it to a keyword-bearing H2 and tighten the supporting line:

```tsx
<h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
  What a property accountant does for landlords
</h2>
<p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
  Property-only focus means we understand Section 24, MTD, incorporation, and CGT inside out.
</p>
```

This both answers the zero-click query "what does a property accountant do" (caught at pos 67-83 by blog pages today) and seeds the head token into a heading.

### 4c. "Areas we serve" block linking DOWN to /locations
Add a new `<section>` after the "Who We Help" section (after page.tsx line 317). This funnels geo intent to the location pages WITHOUT duplicating term+city content on the homepage. Map over `siteConfig.locations` (already imported via `siteConfig`) and link each to `/locations/{slug}`, plus a link to the `/locations` index:

```tsx
<section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
  <div className={siteContainerLg}>
    <div className="max-w-3xl mb-6 sm:mb-8">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
        Property accountants across the UK
      </h2>
      <p className="mt-3 text-base sm:text-lg text-slate-600">
        Tax law is national, so we act for landlords anywhere in the UK. We also publish city-specific guidance for the markets where we work most.
      </p>
    </div>
    <div className="flex flex-wrap gap-3">
      {siteConfig.locations.map((loc) => (
        <Link
          key={loc.slug}
          href={`/locations/${loc.slug}`}
          className="bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
        >
          {loc.title}
        </Link>
      ))}
      <Link
        href="/locations"
        className="bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:border-emerald-600 transition-colors"
      >
        All locations
      </Link>
    </div>
  </div>
</section>
```

`loc.title` already reads "Property accountants in London" etc (from `niche.config.json`), so the anchor text is keyword-rich and geo-funnelling without duplicating prose.

### 4d. Link DOWN to service/pillar pages
The nav already exposes `/services` and `/incorporation` (both exist as real pages, confirmed). In the relabelled "What a property accountant does" section, OR in the intro block, add 2 to 3 inline contextual links to consolidate topical authority downward:
- Link "Section 24" to the pillar `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`
- Link "incorporation" to `/incorporation`
- Link "Making Tax Digital" to the pillar `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`
- Optionally link "capital gains" to `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`

Use the existing emerald underline link style already used in the FAQ accordion: `className="font-bold text-emerald-600 underline underline-offset-2 hover:text-emerald-700"`. Do NOT add a duplicate LeadForm anywhere (the page already has one in the Contact CTA section). Keep the StickyCTA.

---

## 5. FAQ expansion (3 to 8-10, drawn from the zero-click head queries)

Grow the `faqs` array (page.tsx lines 123-139) from 3 to **9**. The array feeds `buildFaqPageJsonLd`, so the FAQPage schema count updates automatically. The visible Accordion at page.tsx lines 441-480 is hand-written and currently shows only 3 items; **add the 6 new questions as Accordion items too** so the rendered page matches the schema (otherwise the FAQPage schema lists questions not visible on-page, which is a Google rich-results risk). Keep the existing 3, add these 6 (no em-dashes, figures-and-legislation voice, each answer 2 to 4 sentences):

1. **Do I need a property accountant?**
   "Not always, but most landlords break even or save money by using one. A property accountant ensures you claim every allowable expense, apply the Section 24 finance-cost credit correctly, meet the Making Tax Digital quarterly deadlines, and report any capital gain within the 60-day HMRC window. If even one mortgaged property pushes your qualifying income over the MTD for Income Tax threshold (£50,000 from 6 April 2026, £30,000 from 2027, £20,000 from 2028), specialist help usually costs less than the penalties and missed reliefs it prevents."

2. **What does a property tax accountant do?**
   "A property tax accountant handles the tax side of owning rental property: Self Assessment with rental schedules, Section 24 planning, capital gains tax on disposals, incorporation feasibility, MTD for Income Tax compliance, and limited company accounts for buy-to-let SPVs. The work centres on the rules that govern rental income, which a general high-street accountant rarely lives inside day to day."

3. **How much does a property accountant cost?**
   "Fees depend on portfolio size and complexity, not a flat menu. A single rental property on Self Assessment sits at the lower end; a multi-property limited company with quarterly MTD filing and management accounts sits higher. We quote fixed fees up front so there are no surprises. For most landlords the fee is recovered several times over through correctly claimed expenses and avoided penalties."

4. **What is the difference between a property accountant and a regular accountant?**
   "A general accountant handles a broad mix of clients and knows the basics of Self Assessment and corporation tax. A specialist property accountant works only with landlords, developers, and investors, so Section 24, the 60-day CGT reporting window, ATED, the Non-Resident Landlord Scheme, and the personal-versus-limited-company decision are core competence. In practice a generalist may still treat mortgage interest as a deductible expense (it has not been since 6 April 2020) and rarely models incorporation."

5. **Can a property accountant help me decide whether to incorporate?**
   "Yes, and it is one of the most valuable things we do. Incorporation can move rental profits from personal rates of 40% or 45% (after Section 24) to corporation tax of 19% to 25%, but transferring existing properties triggers SDLT (including the 5% additional-dwellings surcharge) and a CGT charge on the deemed disposal at market value. We model the upfront cost against the long-term saving and give you a clear recommendation. Try the incorporation calculator above for a quick estimate."

6. **Do you work with landlords outside London?**
   "Yes. Tax legislation is national, so we act for landlords and investors anywhere in the UK, with remote support and digital document handling. We publish city-specific guidance for the markets where we work most, including London, Manchester, Birmingham, Leeds, and Bristol, but a specialist property accountant does not need to share your postcode to advise on Section 24, CGT, MTD, or incorporation."

Keep the existing 3 (MTD, incorporation, "Do I need a specialist property accountant?") for a total of 9.

**Accordion wiring:** mirror each new `faqs` entry as an `<AccordionItem value="faq-...">` in the FAQ section so the visible list equals the schema list (9 = 9). Use unique `value` props (e.g. `faq-need`, `faq-what-does`, `faq-cost`, `faq-vs-regular`, `faq-incorporate`, `faq-outside-london`). To avoid drift, the engineer may refactor the Accordion to `.map(faqs)` over the array, but that is optional, the requirement is parity of count and wording.

---

## 6. Schema additions (one #organization @id graph, server-rendered)

Keep `buildOrganizationJsonLd()` and `buildFaqPageJsonLd(faqs)` exactly as they are (both already server-rendered via `<script type="application/ld+json">`). Add four more nodes, all wired to the single `${siteConfig.url}#organization` @id so the graph is internally consistent. Target schema set: **{Organization, LocalBusiness/AccountingService, Service, FAQPage, BreadcrumbList, WebSite, WebPage}**.

### 6a. National LocalBusiness / AccountingService
Import the shared builder (same import the location pages use):
```tsx
import { buildLocalBusinessJsonLd } from "@accounting-network/web-shared/lib/local-business-schema";
```
Call it for a NATIONAL instance. The builder requires `city` and emits a City `areaServed`; for the national homepage pass `city: "United Kingdom"` and `areaServed: "England, Wales, and Northern Ireland"` so the emitted node reads as a UK-wide AccountingService (this is honest: the firm serves GB-wide, and Scotland is out of scope for the FA 2026 property-income changes per ground truth, but at the entity level "United Kingdom" is acceptable for areaServed locality). Use `organizationType: "AccountingService"`:
```tsx
const localBusinessSchema = buildLocalBusinessJsonLd({
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  areaServed: "Landlords and property investors across the UK",
  city: "United Kingdom",
  organizationType: "AccountingService",
});
```
Note: the shared builder returns a STRING (it calls `JSON.stringify` internally) and does NOT set an `@id`. Render it directly: `dangerouslySetInnerHTML={{ __html: localBusinessSchema }}`. It will sit as a sibling AccountingService node alongside the Organization node; that is competitor-standard and acceptable. Do NOT try to JSON.parse it to inject an @id (keep edits minimal and reversible). The builder hard-codes `priceRange: "££"` and Mon-Fri 09:00-17:00, which are non-fabricated generic values, leave them.

### 6b. Service node (provider = #organization)
Add inline (no new builder needed) describing the core property-accountancy service, with `provider` referencing the org @id:
```tsx
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}#service`,
  serviceType: "Property accountancy and landlord tax advice",
  provider: { "@id": `${siteConfig.url}#organization` },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  description: "Specialist accounting and tax services for UK landlords, buy-to-let investors, and property developers: Section 24 planning, Making Tax Digital, incorporation feasibility, capital gains tax, and portfolio reporting.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property tax services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Section 24 tax planning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Making Tax Digital compliance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buy-to-let incorporation analysis" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Capital gains tax on property" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portfolio accounting and reporting" } },
    ],
  },
};
```

### 6c. BreadcrumbList (via existing builder)
Import and call the existing builder from `src/lib/schema.ts` (returns a STRING):
```tsx
import { buildBreadcrumbJsonLd } from "@/lib/schema";
...
const breadcrumbSchema = buildBreadcrumbJsonLd([{ label: "Home" }]);
```
For the homepage the breadcrumb is a single-item list (Home, no href, so it renders as the current page). Render with `dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}`. This satisfies the competitor-standard BreadcrumbList (5 of 8 competitors have it) without inventing a deeper path.

### 6d. WebSite + WebPage (currently missing, competitor-standard, 5-6 of 8 have them)
Add inline, both linked to the org @id. The WebSite node enables sitelinks search box; the WebPage node ties the document to the org and breadcrumb:
```tsx
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  publisher: { "@id": `${siteConfig.url}#organization` },
  inLanguage: "en-GB",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}#webpage`,
  url: siteConfig.url,
  name: "Property accountants for UK landlords and investors",
  isPartOf: { "@id": `${siteConfig.url}#website` },
  about: { "@id": `${siteConfig.url}#organization` },
  primaryImageOfPage: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.publisherLogoUrl}` },
  inLanguage: "en-GB",
};
```

### 6e. Render order
In the `HomePage` component body, build all nodes, then emit one `<script>` per node (mirroring the existing pattern at page.tsx lines 152-155). For the object nodes use `JSON.stringify(...)`; for the two string-returning builders (`localBusinessSchema`, `breadcrumbSchema`) pass the string straight into `__html`. Example block to place right after the existing org/faq scripts:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBusinessSchema }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema && JSON.stringify(serviceSchema) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
```
All scripts are server-rendered (the page is a server component, no "use client"), so the JSON-LD ships in the initial HTML. Verify after build.

### 6f. AggregateRating / Review: EXCLUDE
Do NOT add AggregateRating or Review schema. There are no genuine, verifiable, on-page reviews on the homepage (the "100+ landlords" badge is anonymised social proof, not a review corpus). Fabricated ratings are a structured-data policy violation and a manual-action risk. If genuine reviews are added later (e.g. a real review widget with real counts), AggregateRating can be added then, sourced from the real data only.

---

## 7. Internal-linking / cannibalisation actions (conservative, reversible)

The two top catcher URLs both resolve to ONE file: `Property/web/content/blog/london-property-accountant.md` (canonical `/blog/property-accountant-services/london-property-accountant`; `property-specialist-accountant-london` is a 301 alias in `src/middleware.ts` line 351). So there is one real edit target for the primary catcher, plus the secondary national catchers. Do the minimum to re-point national intent at the homepage while keeping these pages on their London/long-tail intent.

### 7a. `content/blog/london-property-accountant.md` (PRIMARY target, blog, catches the national term)
- **Add an exact-match link UP to the homepage** in the existing intro (line 54 already has an internal link, add a sibling sentence). Insert, after the first intro paragraph, a sentence such as:
  `<p>For landlords outside the capital, see our main <a href="/">property accountants</a> page for UK-wide Section 24, MTD, and incorporation advice.</p>`
  The anchor text "property accountants" pointing at `/` is the key signal that tells Google the homepage is the national entity and this page is the London variant.
- **Soften the national-flavoured signals toward London long-tail.** The page currently catches the NATIONAL term because of national-phrased headings and a national FAQ:
  - `metaTitle` is `Property Specialist Accountant London: BTL Tax Help 2026`. Keep "London" but lead with the long-tail it should own: change to `London Property Accountant: BTL Tax Help for Landlords 2026` (keeps the geo token first, drops the generic "property specialist accountant" lead that competes nationally).
  - H2 at line 68 reads "Property Specialist Accountant vs High-Street Generalist" (national framing). Re-scope to London: `London Property Accountant vs High-Street Generalist`.
  - The FAQ "What is the difference between a property specialist accountant and a general accountant?" (line 40) is purely national. Re-scope its question to `What is the difference between a London property accountant and a general accountant?` and leave the answer (it is already strong); this keeps the long-tail and stops the bare national-term match.
  - Do NOT delete content, change the slug, change the canonical, or remove the pillar link at line 54. Edits are wording-only and fully reversible.

### 7b. Secondary national catchers (lighter touch, add link UP only)
These blog pages catch national head terms at deep positions; add a single exact-match link UP to `/` in their intro and leave titles alone (they are already topic-specific, not geo-competing):
- `content/blog/property-accountant-job-description.md` (catches "what does a specialist property accountant do?" pos 58.9, "property accountant job description"). Add: `<p>If you are a landlord looking to hire one rather than become one, see our <a href="/">property accountants</a> page.</p>`
- The "what does a property accountant do" and "what services buy to let accountant" pages (under `property-accountant-services`): add the same one-line `<a href="/">property accountants</a>` link UP in the intro. Find the files by their slugs (`what-does-a-property-accountant-do`, `what-services-buy-to-let-accountant`) in `content/blog/`.
- `content/blog/portfolio-management/property-tax-accountant-birmingham.md` and `property-accountant-services/property-accountant-nottingham-landlords.md` catch a MIX of geo and national. These already rank well for their GEO long-tails (Birmingham pos 10, Nottingham pos 9-12). **Add the link UP to `/` but do NOT change their titles** (do not weaken pages that rank top-15 for their city term).

### 7c. Location pages: DO NOT TOUCH
`/locations/london`, `/locations/leeds`, `/locations/manchester`, `/locations/birmingham`, `/locations/bristol` correctly catch geo variants (e.g. "property accountancy leeds" pos 16, "property accountants near me" pos 14.5). Leave them entirely. The homepage funnels DOWN to them via the new "Areas we serve" block; that is the only interaction.

---

## 8. Geo angle

The homepage targets NATIONAL intent only. It must not contain term+city prose (no "property accountant London", "property accountant Leeds" body copy) because that would re-create the exact cannibalisation with the location pages. The only geo presence on the homepage is the "Areas we serve" link block (section 4c), whose anchors are the location-page titles ("Property accountants in London" etc) pointing at `/locations/{slug}`. National framing words to use in homepage prose: "across the UK", "UK-wide", "anywhere in the UK", "national". Geo-specific worked examples, borough licensing, city market commentary, all stay on the location and London-blog pages. This keeps a clean hierarchy: homepage = national entity, /locations/* = city entities, London blog = London investor long-tail.

---

## 9. Risks

- **Cannibalisation, the other direction.** Do not over-optimise the homepage with city terms or it will start competing with the location pages that already rank locally. Keep the homepage strictly national.
- **Young, noisy GSC window.** Positions in the pack (pos 28 to 96) are averaged over a short window and will swing. Do not chase individual positions; the structural fixes (title, H1, schema, prose, the link-ups) are the durable levers. Expect weeks, not days, for re-ranking.
- **Server-rendered JSON-LD is mandatory.** The page is a server component with no "use client"; keep all `<script type="application/ld+json">` nodes in the server render so the JSON-LD is in the initial HTML, not injected client-side. Do not move schema into a client component.
- **No fabricated ratings.** Explicitly exclude AggregateRating/Review (section 6f). "100+ landlords" stays as an anonymised badge, not a schema rating.
- **Reversibility on the blog edits.** All catcher-page edits are wording-only (no slug, canonical, or content removal). They can be reverted with a single git revert if positions move the wrong way.
- **Calculators / CWV.** Keep all four calculators behind `dynamic(...)` with their existing loading skeletons. The new prose and link blocks are static server HTML and add negligible weight. Do not import calculators eagerly.
- **Accordion / schema parity.** If the visible Accordion and the `faqs` array drift in count or wording, Google may flag FAQ rich-result mismatch. Keep them in lockstep (9 = 9).

---

## 10. Acceptance criteria

- [ ] Title leads with the national head token ("Property Accountants ...") and is <=60 chars; OG/Twitter titles carry the head token too.
- [ ] H1 is keyword-bearing (Option A: "Property accountants for UK landlords and investors"); the slogan is demoted to a `<p>` sub-headline.
- [ ] Keyword-rich intro block added under the hero; "What we specialise in" relabelled to a keyword H2; "Areas we serve" block links to all `/locations/{slug}` + `/locations`; 2 to 3 contextual links DOWN to `/incorporation` and the Section 24 / MTD pillars.
- [ ] `faqs` array grown to 9; visible Accordion mirrors all 9; FAQPage schema count = 9 (verify in built HTML).
- [ ] Schema set in built HTML = {Organization, LocalBusiness/AccountingService, Service, FAQPage, BreadcrumbList, WebSite, WebPage}, all referencing the single `${siteConfig.url}#organization` @id where applicable.
- [ ] NO AggregateRating / Review anywhere.
- [ ] Catcher edits applied: `london-property-accountant.md` has a link UP to `/` and softened London-long-tail metaTitle/H2/FAQ; secondary national catchers have a link UP to `/`; location pages untouched.
- [ ] `cd Property/web && npm run build` passes.
- [ ] Calculators remain lazy-loaded (no eager imports, skeletons intact).
- [ ] NO em-dashes anywhere in copy or code comments (grep the diff). Use commas, parentheses, full stops, middle dots.
- [ ] All JSON-LD server-rendered (present in initial HTML, page stays a server component).

---

### Verification commands (run after editing)
```
cd Property/web
npm run build
```
Then re-extract the built homepage HTML and confirm: 7 distinct `application/ld+json` script types present; 9 Question entries in the FAQPage node; H1 text contains "Property accountants"; title starts with "Property Accountants"; no em-dash character (U+2014) in the diff.
