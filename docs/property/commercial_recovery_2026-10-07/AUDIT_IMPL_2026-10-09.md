# AUDIT_IMPL 2026-10-09: the three service pages, current state and implementation inventory

Read-only audit of `claude/website-estate-access-gdk8ei` at `4a72cdb2`. Nothing in the repo was changed except this file. All paths are relative to the repo root; `PA` = `Property/web/src/app/services/property-accountant/page.tsx`, `LA` = `.../landlord-accountant/page.tsx`, `PTA` = `.../property-tax-advice/page.tsx`. "Live" means the rendered snapshots in `snapshots_2026-10-09/` (production, which is behind HEAD: e.g. live hero `hero_book` points at `#book`, HEAD at `/contact` since `845f0d7c`). Index status: INV_A/INV_B (URL Inspection 2026-10-07) where they cover a URL, otherwise the full sweep stored in Supabase `gsc_url_inspection` (site_key `property`, checked 2026-09-26, 802 blog URLs). Unknown means neither source covers it.

Checks run: `npx tsc --noEmit --incremental false -p Property/web` exit 0; `npx vitest run` on `nav-active-state`, `calculator-tabs-crawl-path`, `niche-config` tests: 30/30 pass.

---

## Headline facts that change the implementation

1. **FAQ answers are not in the server HTML** (they are in the DOM once JavaScript runs and show on click; the gap is for fetchers without JavaScript, confirmed 2026-10-09 by a `curl` of the live page and a real-browser render). `FaqSection` (`Property/web/src/components/ui/FaqSection.tsx:42-44`) wraps answers in Radix `AccordionContent` (`components/ui/accordion.tsx:49-61`), which does not render closed items. Live snapshots carry all 12 questions per page but zero answer text outside the JSON-LD script. This fails the owner's no-JS requirement (STATE.md:27 item d) and visible/schema FAQ parity. The fix is Property-local but `FaqSection` is used on other Property pages too (every `/for/*`, pillars), so it is a site-wide change.
2. **The header ships no dropdown links server-side**, desktop or mobile (section 3).
3. **Zero blog posts link to any of the three pages.** `grep` over `Property/web/content` for `/services/(property-accountant|landlord-accountant|property-tax-advice)` returns 0 files. All body inlinks today come from 13 `.tsx` pages.
4. **45 posts (21 indexed) carry the head-term anchors "specialist property accountant" / "property accountant" pointing at the blog post `/blog/property-accountant-services/what-does-a-property-accountant-do`**, not at the money page. Those are the cheapest high-value conversions (section 2, "R" rows).
5. **The calculator-tabs test is two-way.** `Property/web/src/tests/calculator-tabs-crawl-path.test.ts:104-107` lists PA and PTA in `OWNER_REMOVED_INBODY_LINKS`; lines 182-196 FAIL if either page regains a `/calculators/<slug>` link. LA must keep at least one (it has three). Any rewrite that adds or removes a per-tool calculator link must edit that list, which records an owner decision.
6. **`llms.txt` publishes a phone and email** (`Property/web/public/llms.txt:139-140`: `hello@propertytaxpartners.co.uk`, `+44 20 3026 1111`) while SCHEMA_F, COMP_D and plan F1 say no phone exists anywhere on the site, and `config/site.ts:56-57` says the contact email is internal-only. Unverified; owner question.
7. **Owner rulings after the plan** (STATE.md:25-27) override parts of WP1: "property tax accountant" belongs to PA, not PTA; Belfast/Slough/`/locations/bristol` do-not-touch is lifted for the money queries only, but sequencing (10-09 decision 4) says re-aim them only after Google has fetched the new owners; facts F1 to F6 deferred, so no contact block now.

---

## 1. The three pages today

### 1a. Metadata, H1, schema

| | PA | LA | PTA |
|---|---|---|---|
| title | `Property Accountant for UK Landlords and Investors` (:50) | `Landlord Accountant \| Accountants for Landlords & Buy to Let` (:49) | `Property Tax Advice from Specialist Advisors` (:53) |
| meta description | :51-52 "A property accountant for UK landlords and investors: rental accounts, Self Assessment, SPV company accounts, MTD quarterly filing and year-round tax planning." | :50-51 "Landlord accountant for UK rental income: Section 24, MTD quarterly filing, rental portfolios, property investors and letting agents. Book a consultation." | :54-55 "Specialist property tax advice for UK landlords and investors: one-off consultations on structuring, CGT timing, capital allowances and portfolio IHT. Written advice, no ongoing tie-in." |
| H1 | :408-410 "A property accountant for UK landlords and investors" | :333-335 "Landlord accountant for UK rental income" | :450-452 "Property tax advice from specialist advisors" |
| metadata shape | static `export const metadata` with canonical, hreflang en-GB + x-default, openGraph (own title/desc, type website), twitter summary_large_image (:49-73) | same shape (:48-72), `PAGE_URL` const | same shape (:52-76), `pageUrl` const |
| Service node | :352-383, `@id …#service`, name, serviceType, description, url, provider `{@type Organization, @id #organization, name, url}`, areaServed `{Country, "GB"}`, audience, **hasOfferCatalog** from `coverage.map` | :283-300, **no @id**, name "Landlord accountant", serviceType, description, url, provider with `@id #organization`, areaServed "GB", audience, **no hasOfferCatalog** | :402-423, **no @id**, name, serviceType, url, provider `{Organization, name: "Property Tax Partners" (hard-coded), url}` **no @id**, areaServed "GB", audience, **no hasOfferCatalog** |
| FAQPage | :392-395 via `buildFaqPageJsonLd(faqs)` (`Property/web/src/lib/faq-page-schema.ts`) | inline in the same array, :301-309 (one script, array of 2 nodes, :315-318) | :432-435 via `buildFaqPageJsonLd` |
| BreadcrumbList | from `<Breadcrumb>` (`components/ui/Breadcrumb.tsx` → `lib/schema.ts:7-18`) PA:401-407 | LA:326-332 | PTA:443-449 |
| Organization | layout, once per page (`app/layout.tsx:105`) | same | same |
| SCHEMA_F gaps (§5, §6a) | areaServed "GB" vs "United Kingdom" | @id, hasOfferCatalog, areaServed | @id, provider @id, hasOfferCatalog, areaServed |
| OG image | none per page; static `Property/web/src/app/opengraph-image.png`. A title change does not change the card (plan WP1 "OG image regenerates from title" does not apply to these routes) | same | same |

### 1b. Outline with live word counts

Counts are from the live 2026-10-09 snapshot, `<main>` only, scripts stripped, approximate (marquee cards may be duplicated for the loop; the LeadCTAPanel row includes the form labels and the 12 FAQ questions; FAQ answers are absent from HTML). Live totals: PA 2,328, LA 2,754, PTA 2,907 (INV_A, different method: 2,726 / 3,036 / 3,261).

**PA**

| Level | Heading (source line) | Words |
|---|---|---|
| H1 | A property accountant for UK landlords and investors (:408) + hero p :411-415 | 61 |
| H2 | Your tax bill is decided before the return is filed (:451-453) incl. `TaxYearGap` H3s The refurbishment / The ownership / The finance costs / The disposal | 142 + 62 |
| H2 | Most people arrive here saying one of these (:482-484), `PromptMarquee` | 293 |
| H2 | Who this is for (:508); H3 ×4 audiences (:524): "You bought a flat…", "You run a portfolio…", "You hold property through a company", "Property is one part of a wider position" | 48 + 227 |
| H2 | What a property accountant covers (:537); H3 ×6 coverage (:116-147) | 69 + 293 |
| H2 | Why a specialist property accountant rather than a general one (:574-576); H3 ×4 (:172-193) | 19 + 250 |
| H2 | What landlords say (TestimonialsSection, :601) | 108 |
| H2 | How working together starts (:607-609); H3 ×4 ProcessTimeline (:214-239) | 148 |
| H2 | What it costs (:619); H3 ×4 fee drivers (:195-212) + two "end" cards | 81 + 108 |
| H2 | Work out your own numbers first (:689), CalculatorTabs | 57 |
| H2 | Talk to a property accountant about your portfolio (LeadCTAPanel :726) + H3 "Book your free consultation" (form) | 60 + 134 |
| H2 | What landlords ask before they engage us (FaqSection :737-741), 12 Q | questions only |
| H2 | More on choosing and working with one (:747); RelatedArticles 8 cards (H3) | 160 |

**LA**

| Level | Heading | Words |
|---|---|---|
| H1 | Landlord accountant for UK rental income (:333) + hero p :336-340 | 62 |
| H2 | What a landlord accountant covers (:376); H3 ×6 coverage (:74-105) | 124 + 237 |
| H2 | Who we work with (:404), eyebrow "Our clients" (:403); CardCarousel H3 ×5 (:107-135) | 181 |
| H2 | Buy to let landlords (:422) + Section24Wedge | 296 |
| H2 | Rental portfolios and multiple properties (:478-480) + PortfolioPooling | 277 |
| H2 | Property investors (:536); H3 ×4 investorFocus (:164-185) | 145 + 65 |
| H2 | Letting agents and managing agents (:577) + AgencyBooks | 287 |
| H2 | Why a landlord tax accountant rather than a general practice (:638-640) + ComparisonTable | 430 |
| H2 | From first call to first filing (:680); H3 ×4 (:137-158) | 140 |
| H2 | What landlords say (:688) | 107 |
| H2 | Looking for a landlord accountant near you (:693-695) + LocationMap | 157 |
| H2 | Put numbers on it before you call (:723) | 37 |
| H2 | Speak to an accountant who only works with landlords (:735) + form H3 | 70 + 134 |
| H2 | Landlord accountant questions (:748), 12 Q | questions only |

**PTA**

| Level | Heading | Words |
|---|---|---|
| H1 | Property tax advice from specialist advisors (:450) + hero p :453-456 | 60 |
| H2 | Advice, not another set of accounts (:493) + DecisionWindow | 226 |
| H2 | When a consultation is worth booking (:520-522) + PromptMarquee (prompts with `detail`) | 657 |
| H2 | What the advice covers (:550); H3 ×6 coverage (:83-120) | 29 + 399 |
| H2 | How an engagement works (:564); H3 ×5 (:183-209) | 182 |
| H2 | What you get from a consultation (:577) + DrawnTickList | 96 |
| H2 | Why a property tax specialist rather than a general adviser (:606-608) + ComparisonTable | 430 |
| H2 | The rules your advice has to work around in 2026/27 (:638-640) + changes table; H3 Background reading before you book (:684) + 8 cards | 215 + 195 |
| H2 | What landlords say (:696) | 108 |
| H2 | Run the numbers yourself first (:702) | 97 |
| H2 | Get specialist property tax advice on the decision in front of you (:739) + form H3 | 74 + 134 |
| H2 | Questions about a consultation (:756), 12 Q | questions only |

### 1c. FAQ items (all 12 per page are in FAQPage schema; answers not in visible HTML, see headline 1)

| # | PA (:283-344) | LA (:215-276) | PTA (:335-396) |
|---|---|---|---|
| 1 | What does a property accountant do? | What does a landlord accountant do? | What is the difference between property tax advice and property accountancy? |
| 2 | Do I need a property accountant for one buy-to-let? | Do I need an accountant for one rental property? | Do I have to switch accountants to get advice from you? |
| 3 | What is the difference between a property accountant and a regular accountant? | How much does a landlord accountant cost? | What does a property tax consultation cost? |
| 4 | How much does a property accountant cost? | What is the difference between a landlord tax accountant and a general accountant? | What should I bring to the first call? |
| 5 | Do I need a property accountant near me? | Can you help if I have not declared rental income? | Can you advise on a property I have already bought or sold? |
| 6 | Can you take over from my current accountant mid-year? | Should I own property personally or through a limited company? | Do you give advice on incorporation? |
| 7 | Do you handle both personally held property and limited companies? | Do I have to file quarterly under Making Tax Digital? | Is a property tax specialist worth it for a small portfolio? |
| 8 | Will you tell me whether to incorporate? | Do you work with landlords outside your local area? | Do you advise on commercial property as well as residential? |
| 9 | How does Making Tax Digital change what you do for me? | Is there a bad time of year to switch accountants? | Can you help with an HMRC enquiry or an undisclosed rental period? |
| 10 | What records do you need from me? | Do you act for letting agents and managing agents? | Do you work with landlords outside London? |
| 11 | Do you work with non-resident landlords? | What paperwork do I need to hand over? | How quickly can I get advice? |
| 12 | What happens if HMRC opens an enquiry? | Do you advise on inheritance tax for a portfolio? | Will you tell me if I should do nothing? |

FAQ answers are plain text (`FaqSection` without `html`), so a link inside an answer needs the `html` prop and would put raw HTML into the schema text unless the builder strips it.

### 1d. Internal links out (body; breadcrumb Home/Services on all three)

| Page:line | href | Anchor |
|---|---|---|
| PA:512 | /services/landlord-accountant | accounts and returns for landlords |
| PA:514 | /services/property-tax-advice | property tax advice |
| PA:516 | /services/non-resident-landlord | non-resident landlord service |
| PA:545 | /property-tax-rates | property tax rates page |
| PA:547 | /landlord-tax | landlord tax guide |
| PA:629 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost | property accountant fees |
| PA:696 | /incorporation | incorporation feasibility analysis |
| PA:248-281 → :748 | 8 RelatedArticles cards: how-to-choose-a-property-accountant; how-much-does-a-property-accountant-cost; change-landlord-accountants; finance-costs-section-24-complete-guide; making-tax-digital-landlords-april-2026-deadline; best-mtd-software-landlords-2026; buy-to-let-limited-company-complete-guide-uk; how-to-complete-landlord-self-assessment-filing-step-by-step-guide | labels as in the array |
| LA:387 | /section-24 | guide to Section 24 |
| LA:388 | /blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide | finance costs and Section 24 |
| LA:392 | /calculators/section-24-calculator | Section 24 calculator |
| LA:394 | /landlord-tax | landlord tax guide |
| LA:127-128 (CardCarousel card) | /blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026 | How a Let Property Campaign disclosure works |
| LA:443 | /blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk | buy to let limited company guide |
| LA:447 | /incorporation | incorporation analysis |
| LA:505 | /calculators/portfolio-profitability-calculator | portfolio profitability calculator |
| LA:512 / :516 / :520 | capital-vs-revenue-expenditure-landlord-uk / jointly-owned-property / property-finance/portfolio-landlord-mortgages-guide | capital versus revenue expenditure / jointly owned property / portfolio landlord mortgages |
| LA:550 | /blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step | calculating capital gains tax on a sale |
| LA:554 | /services/property-tax-advice | property tax advice service |
| LA:595 | /making-tax-digital-landlords | Making Tax Digital guide |
| LA:597 / :601 | mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly / how-to-register-mtd-landlord-step-by-step-guide | agent managed portfolios and quarterly filing / registering for MTD |
| LA:605 | /calculators/mtd-checker | MTD checker |
| LA:653 / :657 | change-landlord-accountants / buy-to-let-accountants-near-me-guide | changing landlord accountants / choosing a buy to let accountant |
| LA:709 | /locations | locations (+ LocationMap component links) |
| PTA:507 | /services/property-accountant | property accountant page |
| PTA:646 | /property-tax-rates | property tax rates reference |
| PTA:300-333 → :688 | 8 RelatedArticles cards (company structure; 2027 rates and S24; CGT deferral; CGT on transfer to company; capital allowances pillar; BPR/APR cap; FIC estate planning; MTD software) | labels as in array |
| PTA:710 / :711 | /incorporation / /landlord-tax | buy-to-let incorporation analysis / landlord tax guide |

All hrefs above resolve to an existing route or post (checked by script). None is noindexed.

### 1e. CTAs and forms

| Page:line | Component | data-cta | Destination |
|---|---|---|---|
| PA:417-425, LA:342-350, PTA:461-469 | Link (hero) | `hero_book` placement hero goal form | /contact |
| PA:426-433, LA:351-358 | Link | `hero_calculators` | #free-tools |
| PTA:470-475 | Link | **none** | #free-tools |
| PA:489-497 | Link | `prompts_book` / sound_familiar | #book |
| PA:556-564 | Link | `included_book` / what_is_included | #book |
| PA:586-594 | Link | `difference_book` / the_difference | #book |
| PA:671-679 | Link | `fees_book` / fees | #book |
| LA:462-470 | Link | `section24_book` / buy_to_let | #book |
| LA:615-623 | Link | `agents_book` / letting_agents | #book |
| LA:663-673, PTA:619-629 | ComparisonTable cta | `comparison_book` / comparison_table (`components/property/ComparisonTable.tsx:83-98`) | #book |
| PTA:530-538 | Link | `triggers_book` / triggers | #book |
| PTA:587-595 | Link | `deliverables_book` / deliverables | #book |
| header (all pages) | SiteHeader | `header_book`, `header_contact`, `header_book_mobile` | /contact |

Lead form: one page-authored form per page, `LeadCTAPanel` (PA:725, LA:734, PTA:738) → `components/forms/LeadForm.tsx`, analytics `form_id` `"lead_form"` (`useFormTracking("lead_form")`, LeadForm.tsx:47; hook re-exported from `packages/web-shared/analytics/react/useFormTracking`). LeadForm sets no `extras.form_id`. Live HTML shows 5 `<form>` per page: the LeadForm plus 4 calculator result forms inside `CalculatorTabs` (`Step 1 of 2, about you`).

### 1f. Claims flagged by SCHEMA_F or without a source

| Claim | Location | Source status |
|---|---|---|
| "questions answered inside 24 hours" | PA:237 (owner-question comment :232-235) | SCHEMA_F §4: no measurement record |
| proofPoint "24-hour response / Usually the same working day" | PA:731, LA:740, PTA:744 | same |
| StatsCounter `siteStats` "24hr Response time", "100% Property-only focus" | PA:443, LA:369, PTA:485 → `lib/site-stats.ts:17,60` | no source for 24hr or 100% (SCHEMA_F §4); 200+ and 280+ are derived (site-stats.ts:12-58) |
| "Every client here is a landlord, investor or developer. Nothing else." | PA:584 | SCHEMA_F §4: no client record; plan D3 |
| "Every client of this practice is a landlord, investor or property business." | PTA:615 | same |
| "Property-only specialists / Landlords, investors and developers, nothing else" | PA:729 | client-base claim, same class |
| "We act for landlords only. That is the entire practice" / table "It is the entire practice" / "A landlord-only practice like us" / "Landlord specialists only" | LA:651, :191, :667, :738 | same class |
| eyebrow "Our clients" / "where our clients are" | LA:403, :709 | SCHEMA_F "softer" |
| "from single flats to portfolios of forty" | PA:307 | no record |
| "Most handovers complete inside two weeks" | PA:312 | no record |
| "Plenty of clients keep their existing accountant", "one of the most common questions we are asked", "Scoping calls are usually available within a few days" | PTA:344, :364, :389 | no record |
| TestimonialsSection, 3 quotes with stars, "Anonymised feedback from landlords … we act for / we have worked with" | PA:601, LA:688, PTA:696 → `components/property/TestimonialsSection.tsx:8-30` | SCHEMA_F rated "within the rule" (house_positions.md:441 personas); `site-stats.ts:27-29` states no client records exist. No source record found |
| "quotes a fixed annual fee in writing" / "We quote a fixed annual fee in writing" | LA:338-339, :229 | close variant of the retired 30 Sep phrase; `535843985` grep target was "fixed fee in writing" so these survived. Owner wording call |

`house_positions.md` §13 (:438-447) has no rule on these claims; it bans em-dashes, real client names, "the best" claims, invented HMRC figures.

### 1g. What feeds the pages, and what is shared

| Input | Used by | Scope of a change |
|---|---|---|
| `siteConfig.url`, `.name` (`config/site.ts:46-54` from `niche.config.json` `display_name`, `domain`) | all three: canonical, schema provider | Property only |
| `niche.config.json` `navigation` :46-139 (service hrefs :57, :61, :65) | header + footer labels | Property only |
| `niche.config.json` `lead_form.role_options`, consent text via `siteConfig.leadConsentText` | LeadForm | Property only |
| `niche.config.json` `cta` (leadgen variant) | header CTAs | Property only |
| `lib/site-stats.ts` | StatsCounter on all three, homepage, /services, /about | Property only; homepage is frozen |
| `TestimonialsSection.tsx` | all three, homepage (frozen), /services, /property-tax-rates | edit reaches frozen homepage |
| `lib/page-summaries.ts:30-31` (PTA one-line summary) | card excerpts wherever PTA is linked through `relatedItemsFromLinks` (`lib/blog.ts:269`), e.g. cost-of-selling, landed-estates, leasehold, thank-you modules | Property only; PTA's own hero does not import it despite the docstring (:13-15) |
| `FaqSection.tsx`, `accordion.tsx`, `LeadCTAPanel.tsx`, `CoverageCards`, `ProcessTimeline`, `PromptMarquee`, `ComparisonTable`, `CalculatorTabs`, `RelatedArticles`, `Breadcrumb`, `page-blocks`, `layout-utils`, `HeroBrickBackdrop`, `TaxYearGap`, `Section24Wedge`, `PortfolioPooling`, `AgencyBooks`, `LocationMap`, `CardCarousel`, `DrawnTickList`, `DecisionWindow`, `ExampleFigureNote` | all Property-local files under `Property/web/src/components` | Property-wide, not estate-wide |
| `packages/web-shared` | **only transitively**: `lib/blog.ts` uses `web-shared/lib/frontmatter`; LeadForm uses `web-shared/analytics/ids`, `analytics/visitMemory`, `leads/capture-steps` (`buildRoleExtras`) and the `useFormTracking` hook | estate-wide; the plan forbids edits there (plan §3). Nothing in a rewrite needs to touch them |

`packages/web-shared/design/chrome/SiteHeader.tsx` exists but Property does not use it (`components/layout/PageShell.tsx:6` imports the local `./SiteHeader`).

---

## 2. Inbound links

### 2a. Today

Body links (all `.tsx`; content/blog has none):

| Source:line | Target | Anchor | Source indexed? |
|---|---|---|---|
| `app/services/page.tsx:52/57/62` (hub cards, rendered :412-425) | PA / LA / PTA | card: "Property accountant…", "Landlord accountant…", "Property tax advice…" + "Read more" | yes |
| `app/services/property-accountant/page.tsx:512, :514` | LA, PTA | accounts and returns for landlords; property tax advice | yes |
| `app/services/property-tax-advice/page.tsx:507` | PA | property accountant page | yes |
| `app/services/landlord-accountant/page.tsx:554` | PTA | property tax advice service | yes |
| `app/services/non-resident-landlord/page.tsx:492` | LA | landlord accounting service | yes |
| `app/landlord-compliance/page.tsx:863` | LA | landlord accounting service | yes |
| `app/landlord-tax/page.tsx:1286` | LA | landlord accounting service | yes |
| `app/section-24/page.tsx:811` | PTA | property tax advice service | yes |
| `app/incorporation/page.tsx:500, :502` | PTA, PA | property tax advice; property accountant | yes |
| `app/calculators/stamp-duty-calculator/page.tsx:361` | PA | specialist property accountant | yes (frozen, signoff scoped to internal links) |
| `app/cost-of-selling-a-property/page.tsx:595` | PTA | Property tax advice | yes, but a `TopicSection links` card module, not prose |
| `app/landed-estates/page.tsx:428`, `app/leasehold/page.tsx:547` | PTA | Property tax advice | yes, card modules |
| `app/thank-you/page.tsx:59` | PTA | What a property tax consultation covers | robots-disallowed, unknown to Google |

Prose body inlinks from indexed pages today: PA 4, LA 5, PTA 5 (INV_A's 4/5/9 also counts modules and /thank-you).

Chrome: footer, server-rendered on every page: `components/layout/SiteFooter.tsx:34` `childrenOf("/services")` → labels "Property accountant", "Landlord accountant", "Property tax advice" (niche.config.json :56-65). Header desktop dropdown `SiteHeader.tsx:144-205` and mobile drawer :328-455 both gated, so not in HTML. Homepage body: none (`app/page.tsx` services section :270-298 has no links).

### 2b. How the candidate sources render

- **Blog posts**: one file each in `Property/web/content/blog/*.md` (flat, 806 files), frontmatter plus an **HTML** body (`<p>…<a href>`, not Markdown), rendered by the shared route `app/blog/[category]/[slug]/page.tsx` → `components/blog/BlogPostRenderer.tsx`. The 40 city posts need 40 file edits; there is no per-post template text. Frontmatter `faqs[].answer` can carry `<a>` (e.g. what-does-a-property-accountant-do) and also lands in FAQPage schema.
- **Shared post components (one edit = a link on every post; these are not body links and do not count)**: `BlogPostRenderer.tsx` (author box `/about` links :370, :379; aside CTA injection :105), `BlogSidebarCta.tsx`, `InlineMiniLeadForm`, `RelatedArticles`, `TableOfContents`, `GateOrForm`, `PremiumUpgrade`.
- **Location pages**: one template `app/locations/[slug]/page.tsx` with per-city data `cityContent` (:52-~800). Data strings (`intro`, `whyLocal`, `areas`, `services[].desc`) render as plain text (`{content.intro}` :883, `{content.whyLocal}` :912), so a link inside them needs a render change. The only shared prose sentence is template text at :938-941; editing it with a per-city anchor map gives one link per city page from one edit (body copy on each page, but identical template sentence: owner call whether that counts).
- **/for pages**: template `app/for/[slug]/page.tsx`; copy in `data/audiences.ts`. `intro` renders via `dangerouslySetInnerHTML` (:73) and already carries `<a>` on two rows (:327, :731), so links go straight into the data string. `howWeHelp` cards also render HTML (`CardStack … html`, :104). Editing `intro` does not touch Organization `knowsAbout` (which reads titles, `lib/organization-schema.ts`).
- **Pillars**: hand-written JSX prose in each `page.tsx`; `TopicSection links` render as RelatedArticles cards (`components/property/TopicSection.tsx:99-117`), i.e. a module, not prose.

### 2c. Proposed body links, by source type

Anchor class: **E** = exact family phrase (PA: property accountant(s), specialist property accountant, accountant(s) for property / property investors, property tax accountant, capital gains tax accountant; LA: landlord accountant(s), accountant(s) for landlords, buy to let accountant, accountant for rental property; PTA: property tax specialist(s), property tax adviser, (specialist) property tax advice). **V** = family phrase extended or close variant. **D** = descriptive. One link per source per owner page; body prose only. "Idx" = Google indexed. Sentences are proposals for the Opus/Fable writer, not final copy.

**Locations (template sentence `app/locations/[slug]/page.tsx:938-941`, all five Idx per INV_A)**

Existing: "We work with landlords across the UK, and we understand the specific dynamics of the {city} property market. Remote support with local market knowledge."

Proposed: "We work with landlords across the UK, and we understand the specific dynamics of the {city} property market: {city} landlords get the same {link} we run nationally, with local market knowledge on top." Per-city anchor map:

| City | Anchor | Target | Class |
|---|---|---|---|
| london | property accountants who act across the UK | PA | V |
| birmingham | UK-wide property accountancy service | PA | V |
| manchester | landlord accountancy service | LA | V |
| leeds | accountants for landlords | LA | E |
| bristol | property tax specialists | PTA | E, **defer**: plan §8.3 do-not-touch; STATE.md:26 decision 4 sequencing |

**Pillar guides**

| Source:line | Idx | Existing sentence (quoted) | Proposed rewrite (anchor in [ ]) | Target | Class |
|---|---|---|---|---|---|
| landlord-tax/page.tsx:1260-1262 | yes | "The decisions that repay a specialist several times over are the structural ones:" | "The decisions that repay [specialist property tax advice] several times over are the structural ones:" | PTA | E |
| landlord-tax/page.tsx:1277-1281 | yes | "…Those points are worth more than the compliance fee, and they are only visible to someone who looks at rental portfolios every week." | "…they are only visible to [a property accountant who looks at rental portfolios every week]." | PA | V |
| landlord-tax:1286 | yes | already links LA | keep | LA | V |
| section-24/page.tsx:364-366 | yes | "Most landlords felt the bill rise without ever being told why, or whether theirs was even calculated correctly." | "…or whether theirs was even calculated correctly, which is the first thing a [landlord accountant] checks." | LA | E |
| section-24/page.tsx:1046-1047 | yes | "A generalist accountant will file your return correctly. The difference here is that we look at the structure behind the return…" | "A generalist accountant will file your return correctly. The difference with a [specialist property accountant] is that we look at the structure behind the return…" | PA | E |
| section-24:811 | yes | already links PTA | keep | PTA | V |
| incorporation:500, :502 | yes | already links PTA and PA | keep; no natural LA slot | | |
| making-tax-digital-landlords/page.tsx:1240-1241 | yes | "Any competent accountant can file a quarterly update. The value is in what surrounds it, and the five situations below…" | "Any competent accountant can file a quarterly update. The value [a specialist accountant for landlords] adds is in what surrounds it, and the five situations below…" | LA | V |
| making-tax-digital-landlords/page.tsx:1212-1213 | yes | "Most landlords who come to us want the quarterly cycle to stop being their problem. Once you authorise us as your agent, we file for you and you send us data once a quarter." | "…we file for you and you send us data once a quarter, as part of our wider [property accountancy service]." | PA | V |
| leasehold/page.tsx:357-361 | yes | "Costs sit on top of the premium." | "Costs sit on top of the premium, and so does the tax: the stamp duty and base-cost questions a [property tax adviser] settles before you serve notice." (weak fit; prose here is non-tax) | PTA | V |
| landed-estates/page.tsx:418-419 | yes | "We work alongside those advisers rather than replacing them. What we do is the inheritance tax and capital tax position on the land…" | "…What [our advisory work] covers is the inheritance tax and capital tax position on the land…" | PTA | D |
| landlord-compliance:863 | yes | already links LA | keep | LA | V |
| spv-company/page.tsx:294-296 | yes | "…how to move property in without an avoidable tax bill, and how to run and eventually unwind it." | "…and how to run and eventually unwind it, which is the work of an [accountant who runs property companies]." | PA | D |
| property-tax-rates/page.tsx:439-440 | yes | "These figures are a quick reference and not a substitute for advice on your own position." | "These figures are a quick reference and not a substitute for [advice on your own position]." | PTA | D |

**The three pages and NRL, cross-links**

| Source:line | Existing | Proposed | Target | Class |
|---|---|---|---|---|
| LA:546 | "As an accountant for property investors, four things carry most of the risk." | link "[accountant for property investors]" | PA | E |
| PTA:504-508 | "…that is a different service and it lives on our property accountant page." | add: "If you hold property personally and only need the returns, our [landlord accountant service] covers that." | LA | V |
| PA:512-516, PTA:507, LA:554, NRL:492 | existing | keep | | |

**/for pages (`Property/web/src/data/audiences.ts`, intro strings; all 15 Idx per INV_A)**

| Row (intro line) | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|
| moving-property-into-a-limited-company (:29) | "One of our property tax specialists starts with the market value and debt on each property…" | "One of our [property tax specialists] starts with…" | PTA | E |
| selling-a-buy-to-let (:129) | "The gain computation comes to you line by line, the return is prepared and filed, and the same figures carry into your self assessment." | "…the return is prepared and filed by a [capital gains tax accountant who works only on property], and the same figures…" | PA | V |
| portfolio-landlords-incorporating-a-partnership (:225) | "Everything rests on a prior question: whether a partnership genuinely exists in law, and how long it has run." | "Everything rests on a prior question, the first one our [incorporation advice] answers: whether a partnership genuinely exists in law…" | PTA | D |
| non-resident-landlords (:327) | already links `/services/non-resident-landlord` | none (NRL is the owner) | | |
| property-spv-set-up (:428) | "…and the first-year filing dates are already on a calendar." | "…already on a calendar, with our [accountancy service for property investors] ready to file them." | PA | V |
| gifting-property-to-family (:528) | "Two numbers decide it: the cost of gifting now and the cost of doing nothing." | "Two numbers decide it, and [one-off property tax advice] puts a figure on both: …" | PTA | V |
| couples-splitting-rental-income (:628) | "A specialist starts with the title, not the tax…" | "[An accountant for landlords who co-own] starts with the title, not the tax…" | LA | V |
| landlord-self-assessment-and-mtd (:731) | "One person then holds the start date, the filing calendar…" | "One person on our [landlord accountancy service] then holds…" | LA | V |
| first-time-and-accidental-landlords (:836) | "…ending with a call with one of our accountants." | "…ending with a call with one of our [accountants for landlords]." | LA | E |
| inherited-property (:938) | "A specialist starts with the probate value…" | "A [property tax adviser] starts with the probate value…" | PTA | E |
| property-company-profit-extraction (:1033) | "A specialist looks first at what your director's loan account really stands at…" | "A [property company accountant] looks first at…" | PA | D |
| rental-income-disclosure (:1131) | "Your accountant prepares the notification…" | "Your [landlord tax accountant] prepares the notification…" | LA | V |
| holiday-let-and-serviced-accommodation (:1232) | "A specialist starts with how each property is run…" | "A [specialist property accountant] starts with how each property is run…" | PA | E |
| hmo-and-multi-let-landlords (:1332) | "Those four are written up against your own figures, and our team prepares the returns." | "…and our [team of HMO and multi-let accountants] prepares the returns." | LA | D |
| landlord-retirement-and-succession (:1434) | "The documents your accountant prepares for your solicitor follow from it." | "The documents your [property tax accountant] prepares…" | PA | E, **defer** (ranks #1 for "property tax accountant", plan §8.3; STATE.md:26 decision 4) |

**Services index** `app/services/page.tsx`: each owner page already has one body card link (:412-425). No further link (one per source per owner page).

**Homepage services section** `app/page.tsx:278-280` (frozen; needs a per-page `signoff:` line in `docs/_engines/property_frozen_pages.md:23`; STATE.md:26 sign-off covers the title only):

Existing: "Property-only focus means we understand Section 24, MTD, incorporation, and CGT inside out, at every scale from individual landlords with a single flat to large portfolio owners."

Proposed: "…at every scale, from [individual landlords with a single flat] (LA, D) to [large portfolio owners] (PA, D). If you only need one decision modelled, [one-off property tax advice] (PTA, V) is a separate service." Note `WhatWeCoverSection` (rendered :301) is shared with /contact; editing it would add links to /contact too.

**Indexed posts, by category.** R = repoint an existing head-term link that currently targets `/blog/property-accountant-services/what-does-a-property-accountant-do` (that post keeps 135 body inlinks minus these). N = new link in an unlinked sentence. Idx source: INV_B (2026-10-07) for property-accountant-services rows, otherwise `gsc_url_inspection` 2026-09-26.

*Property Accountant Services*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| what-does-a-property-accountant-do.md:63 | R (from `/`) | "see our main <a href="/">property accountants</a> page for UK-wide Section 24, MTD, and incorporation advice." | repoint href to PA, anchor [property accountants] unchanged | PA | E |
| how-to-choose-a-property-accountant.md:52 | R | "A [property accountant] who works predominantly with landlords treats these as everyday questions." | anchor [property accountant who works predominantly with landlords] | PA | V |
| coventry-property-accountant.md:52 | N | "That is the case for joined-up advice from someone who works with property all day rather than as a sideline." | "…joined-up advice from [an accountant who works with property all day] rather than as a sideline." | PA | D |
| portsmouth-property-accountant-landlord-tax-services.md:48 | N | "A property specialist focuses on the issues that recur for landlords…" | "A [property-focused accountant] focuses on…" | PA | D |
| why-luton-landlords-need-specialist-property-accountant-2026.md:39 | N | "For most landlords in 2026 the honest answer leans towards specialist expertise." | "…leans towards [specialist property accountancy]." | PA | V |
| property-accountant-glasgow.md:43 | N | "Getting the interaction right is where specialist advice earns its place." | "…is where [specialist advice] earns its place." | PTA | D |
| property-accountant-leicester.md:45 | N | "…the case for specialist accountancy support strengthens at modest portfolio sizes." | "…the case for [specialist accountancy support for landlords] strengthens…" | LA | D |
| liverpool-property-accountant-tax-services-landlords.md:137 | N | "A property accountant configures the chart of accounts so each property's profit reads cleanly…" | "A [landlord accountant] configures…" | LA | E |
| why-cardiff-landlords-need-specialist-property-accountant-2026.md:39 | N | "…a general accountant who treats Cardiff like any English city will miss the parts that matter." | "…will miss the parts that matter, which is the gap a [specialist landlord accountant] closes." | LA | V |
| vat-calculation-calculator.md:117 | N | "If in doubt, consult a specialist property accountant who deals with VAT on property every day." | anchor [specialist property accountant who deals with VAT] | PA | V (plan D4 may move this post) |
| vat-how-to-calculate.md:148 | N | "…or get in touch for advice tailored to your portfolio." | "…or get in touch for [advice tailored to your portfolio]." | PTA | D (D4 candidate) |
| property-accountant-bournemouth-landlords-tax-services.md:45 | none | only sentence uses the city phrase as a bold head term | needs a read | | |
| belfast-…, slough-… | defer | indexed; plan §8.3 guardrail and decision 4 | after new owners are fetched | | |
| how-much-does-a-property-accountant-cost.md | frozen | `property_frozen_pages.md:15`, signoff none | needs signoff | | |
| can-you-claim-aia-on-second-hand-assets.md | exclude | frozen (:18), Bing position 1 to 2 (BING_G) | none | | |

*Section 24 and tax relief*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| how-to-calculate-section-24-tax-credit-step-by-step.md:182 | R | "That modelling is where a [specialist property accountant] earns their keep…" | repoint, anchor unchanged | PA | E |
| section-24-tax-credit-20-percent-basic-rate-relief.md:163 | R | "…that is exactly the kind of work a [property accountant] does." | "…the kind of work [our property accountancy service] does." | PA | V |
| section-24-self-assessment-tax-return.md:180 | R | "A [property accountant] can model those interactions… and check the return ties up before it is filed." | anchor [landlord accountant preparing the return] | LA | V |
| section-24-personal-allowance-60-percent-tax-rate-landlords.md:152 | R | "A [property accountant] can calculate your adjusted net income…" | "A [specialist looking at your whole tax position] can calculate…" | PTA | D |
| tax-relief-mortgage-interest-rented-property-guide.md:117 | R | "[A property accountant] can confirm the relief is being claimed correctly…" | "[An accountant for landlords] can confirm…" | LA | E |
| replacement-domestic-items-relief-uk-landlords-guide.md:279 | R | "…a [specialist property accountant] can review your replacement spend…" | "…a [landlord tax accountant] can review…" | LA | V |
| mortgage-arrangement-fees-deductible-landlord.md:166 | R, **frozen** (:14) | "A [specialist property accountant] earns their place by getting the classification right first time…" | "A [specialist accountant for landlords] earns their place…" | LA | V, needs signoff |
| finance-costs-section-24-complete-guide.md:220 | N | "…that is the point to take advice rather than rely on default software treatment." | "…that is the point to [take specialist advice] rather than…" | PTA | D |
| section-24-interest-only-mortgage-tax-planning.md:272 | N | "A specialist property accountant can model the interest-only and repayment paths against your actual income…" | anchor [model the interest-only and repayment paths] | PA | D |
| section-24-child-benefit-high-income-charge-landlords.md:111 | N | "A property accountant who models adjusted net income alongside your rental profit…" | "[A property tax adviser who models adjusted net income] alongside…" | PTA | V |
| section-24-repeal-future-reversed.md:142 | N | "…our property tax team can talk it through." | "…our [property tax advice team] can talk it through." | PTA | V |
| section-24-vs-incorporation-which-saves-more-tax.md:208 | N | "Model your specific position before committing, or speak to a specialist who can look at the whole picture…" | "…or [speak to a specialist] who can look at the whole picture…" | PTA | D |
| annual-investment-allowance-uk.md:105 | N | "A specialist property accountant can scope the claim before you file." | anchor [scope the claim before you file] | PA | D |
| mortgage-interest-deductible-landlords-uk-2026.md:100 | N | "A specialist review of your last filed return often surfaces a missed credit." | "A review of your last filed return by [a landlord's accountant] often surfaces a missed credit." | LA | D |
| rental-income-tax-uk-complete-guide-landlords.md:263 | N | "…these are the situations where a specialist property accountant routinely finds tax that would otherwise be overpaid:" | "…where an [accountant for rental property] routinely finds…" | LA | E |
| landlord-tax-deductions-uk-2026-complete-list.md:176 | N | "A specialist property accountant can review your spend before you file." | "[An accountant who prepares landlord returns] can review your spend before you file." | LA | D |
| Idx with no natural sentence found by scan (needs a read) | | can-section-24-push-higher-rate-tax, section-24-2027-tax-year-planning-uk-landlords, section-24-higher-rate-taxpayers-2026, section-24-tax-relief-complete-guide; section-24-2027-tax-year-planning-landlords:109 is already linked to how-to-choose | | | |

*Incorporation and company structures*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| 2027-tax-rates-incorporation-decision-uk-landlords.md:164 | R | "If incorporation is on your mind, a [specialist property accountant] can run those scenarios for your portfolio." | "…a [property tax adviser] can run those scenarios…" | PTA | E |
| corporation-tax-rates-property-companies-2026-27.md:136 | R | "A [property accountant] can model the specific numbers before you commit to a structure…" | "An [accountant for property companies] can model…" | PA | V |
| corporation-tax-vs-income-tax-landlords-2027.md:201 | R | "A [specialist property accountant] can run those scenarios on your actual figures and tell you which regime…" | "[Specialist property tax advice] runs those scenarios… and tells you which regime…" | PTA | E |
| sdlt-transfer-property-company-cost.md:241 | R | "A specialist [property accountant] can model the SDLT, the CGT, the section 162 and Schedule 15 positions…" | "A specialist [adviser on property incorporations] can model…" | PTA | D |
| section-162-incorporation-relief-property-landlords.md:179 | R | "A [specialist property accountant] can model the total cost over several years…" | "Our [property tax advice service] can model…" | PTA | V |
| when-does-hmrc-accept-rental-property-incorporation-business.md:210 | R | "If you are weighing incorporation, a [property accountant] can assess whether your activity clears the Ramsay threshold…" | "…[an adviser who models incorporations] can assess…" | PTA | D |
| property-investment-company-structure-planning.md:176 | N | "…a structure-choice decision is one worth modelling with a property tax specialist before you incorporate anything." | anchor [worth modelling with a property tax specialist] | PTA | V |
| incorporation-holdover-relief-property.md:196 | N | "…talk to a specialist who can confirm the mechanism for your situation." | "[talk to a specialist] who can confirm…" | PTA | D |
| incorporating-property-portfolio-uk-2026.md:158 | N | "If that is your position, take advice specific to it rather than following this sequence." | "…take [advice specific to it] rather than…" | PTA | D |
| spv-property-investment-special-purpose-vehicle-guide.md:262 | N | "The decisions worth getting professional input on at the SPV setup stage are the share structure…" | "The decisions worth taking to [an accountant who sets up property SPVs] at the setup stage are…" | PA | D |
| buy-to-let-limited-company-complete-guide-uk.md:190 | N | "Take specialist advice before relying on it." | "[Take specialist advice] before relying on it." | PTA | D |
| starting-property-business-sole-trader-vs-ltd-vs-partnership.md:322 | N | "Get specialist advice before relying on incorporation relief for a letting portfolio." | "[Get specialist advice] before relying on…" | PTA | D |
| Idx, needs a read | | alphabet-shares…, extraction-while-incorporating…, incorporate-rental-property-without-cgt, incorporation-existing-portfolios-phased-approach, partnership-sdlt-relief…, pre-sale-extraction…, property-company-group-relief…, property-spv-employer-pension…, sdlt-incorporation-stamp-duty-twice, section-24-impact-on-company-formations-data, time-pressure-extraction… | | | |

*Landlord tax essentials, MTD, CGT, property types, portfolio, finance*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| landlord-tax-changes-2026-complete-guide.md:198 | N | "A specialist property accountant can keep you compliant through the MTD transition and model the rate change against your actual numbers." | anchor [specialist property accountant] | PA | E |
| landlord-tax-return-complete-guide-2026.md:218 | N | "A specialist property accountant can make sure the return is right…" | "An [accountant who specialises in landlord returns] can make sure…" | LA | D |
| landlord-tax-calendar-2026-27-key-dates.md:220 | N | "A specialist property accounting team handles the diary, the software, the quarterly filings…" | "A [specialist landlord accounting team] handles…" | LA | V |
| record-keeping-landlords-what-track-how-long-keep.md:257 | R | "A [specialist property accountant] can set up the system…" | "[An accountant who works with landlords] can set up…" | LA | D |
| what-repairs-can-landlords-deduct-from-rental-income.md:169 | N | "A specialist property accountant can review the work, apportion any genuine improvement element…" | "A [buy-to-let accountant] can review the work…" | LA | E |
| inheritance-tax-rental-property-uk-guide.md:205 | N | "Specialist advice is essential before any large-scale lifetime gift." | "[Specialist advice] is essential before…" | PTA | D |
| property-investment-tax-uk-complete-guide-2026.md:253 | N | "A specialist property accountant can help you sequence the buy, hold, sell and pass-on decisions…" | "An [accountant for property investors] can help you sequence…" | PA | E |
| mtd-penalties-landlords-miss-deadline.md:185 | R | "…hand the quarterly cycle and the year-end final declaration to [a property accountant], who manages both together…" | "…to [a landlord accountant], who…" | LA | E |
| mtd-quarterly-reporting-landlords-step-by-step-guide.md:99 | N | "A specialist property accountant can set up your software, agree the category mapping with you once…" | "An [accountant who runs MTD for landlords] can set up…" | LA | D |
| making-tax-digital-property-income-2026-complete-guide.md:95 | N | "If an accountant files for you, the route is the Agent Services Account (ASA)." | "If [an accountant for landlords] files for you…" | LA | E |
| best-mtd-software-landlords-2026.md:152 | N | "The situations where a property accountant typically adds material value alongside the software:" | "…where [an accountant who files for landlords] typically adds…" | LA | D |
| cgt-selling-buy-to-let-property-calculation-guide.md:192 | R | "A [property accountant] works the disposal calculation, the 60-day return and the reliefs together…" | anchor [property accountant handling the sale] | PA | V |
| cgt-selling-multiple-properties-same-year.md:175 | R | "A [specialist property accountant] can build that model, confirm the 60-day obligations on each sale…" | "A [property tax specialist] can build that model…" | PTA | E |
| cgt-payment-deadlines-property-sales-2026.md:84 | N | "If an accountant files for you, ask to see the calculation before it goes in…" | "If a [capital gains tax accountant] files for you…" | PA | E |
| commercial-property-tax-landlords-rates-reliefs-allowances.md:199 | R | "A [specialist property accountant] brings the heads together into one plan." | "An [accountant who works on commercial property every week] brings…" | PA | D |
| section-24-commercial-property-complete-guide.md:92 | R | "A specialist [property accountant] will pin the classification down…" | "A [specialist who works on commercial lettings] will pin…" | PA | D |
| integral-features-capital-allowances.md:171 | N | "A property accountant experienced in capital allowances can identify the qualifying expenditure…" | anchor [property accountant experienced in capital allowances] | PA | V |
| vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages.md:130 | N | "…a 30-minute call with a VAT-aware property accountant before signing typically pays for itself…" | anchor [VAT-aware property accountant] | PA | V |
| hmo-tax-guide-rental-income-deductions-multi-tenant.md:189 | N | "…a specialist review can confirm your income and expense position…" | "…a review by [an accountant for HMO landlords] can confirm…" | LA | V |
| leasehold-reform-act-2024-what-is-in-force.md:162 | N | "…and speak to a property tax adviser before you commit…" | "…and [speak to a property tax adviser] before you commit…" | PTA | V |
| budgeting-voids-repairs-rental-cash-flow.md:177 | N | "…are where a specialist property accountant earns their place…" | anchor [specialist property accountant] | PA | E |
| refinancing-rental-property-when-does-it-make-financial-sense.md:62 | R | "This is exactly the kind of apportionment a [property accountant] handles routinely…" | repoint, anchor unchanged | PA | E |
| portfolio-landlord-mortgages-guide.md:95 | N | "…a decision on structure that a tax adviser has already sense-checked." | "…that [a tax adviser] has already sense-checked." | PTA | D |
| non-resident-landlords-uk-inheritance-tax-exposure.md:165 | N | "Careful modelling with a tax adviser is essential before proceeding." | "Careful [modelling with a tax adviser] is essential…" | PTA | D |
| Idx, needs a read | | landlord-tax-essentials/tenancy-deposits-landlord-tax-position, portfolio-management/multi-property-landlord-tax-planning-strategies-5-plus-properties, portfolio-landlord-tax-planning-strategy-guide, property-finance/sic-code-for-an-spv-property-company, spv-mortgage-no-income-newly-formed, spv-mortgages-explained | | | |

Other `R` repoint candidates exist in 24 **unindexed** posts (scratch list; e.g. buy-to-let-accountants-near-me-guide:64, section-24-multiple-properties-cumulative-impact:157); they do not count toward the target.

### 2d. Count achievable from indexed pages (body prose only)

| Owner page | Existing | New pillars / cross / for / locations | New + repointed posts | Total | Excluding items needing signoff or deferred | Exact-match share of new anchors |
|---|---|---|---|---|---|---|
| PA | 4 | 12 (incl. homepage, retirement deferred not counted) | 22 | 38 | 37 | 10 of 34 (29%) |
| LA | 5 | 11 (incl. homepage) | 19 (incl. 1 frozen) | 35 | 33 | 9 of 30 (30%) |
| PTA | 5 | 9 (incl. homepage; Bristol deferred not counted) | 22 | 36 | 35 | 6 of 31 (19%) |

Target 30+ each is reachable from indexed pages without the deferred Belfast, Slough, Bristol and retirement-and-succession sources and without the city posts (30 of 40 unindexed).

---

## 3. The header

**Today, server HTML** (`Property/web/src/components/layout/SiteHeader.tsx`, `"use client"` but SSR'd; nav built server-side in `lib/nav.ts:16-22` and passed via `PageShell`):

- Brand link `/` (`BrandWordmarkHomeLink`, :247).
- Desktop nav `<nav aria-label="Primary">` (:249-272): items with `children`/`groups` (Services, Resources, Calculators) render `DesktopDropdown`, whose trigger is a `<button>` (:128-142) and whose panel is rendered only when `open` (`{open ? … : null}`, :144-205; initial `useState(false)` :101). Items without children render `<Link>`: About `/about`, Contact `/contact` (Contact hidden at `xl:` via class, :261).
- CTAs: `header_contact` `/contact` (:276-289, `xl:inline-flex`), `header_book` `/contact` (:304-313, `lg:inline-flex`).
- Mobile drawer `{open ? … : null}` (:328-455): nothing in HTML.
- Live check (snapshot): header anchors `/`, `/about`, `/contact` ×3; buttons Services, Resources, Calculators.

**After WP1** (plan WP1.1, `COMMERCIAL_RECOVERY_PLAN_2026-10-07.md:90`): panels always rendered, visibility by CSS. Anchors added to every page's HTML: Services 6 (`/services`, the three service pages, `/services/non-resident-landlord`, `/incorporation`; niche.config.json :50-75), Resources 11 (`/landlord-tax`, `/section-24`, `/making-tax-digital-landlords`, `/leasehold`, `/landlord-compliance`, `/landed-estates`, `/cost-of-selling-a-property`, `/for-letting-agents`, `/property-tax-rates`, `/research/landlord-tax-index`, `/blog`), Calculators: one per tool in `TOOLS` (27 per INV_A) from `calculatorNavGroups()` (`lib/calculators/nav.ts`) plus "View all calculators" `/calculators` (:176-182). If the mobile drawer is also made always-rendered, the same hrefs appear a second time. Things to preserve: `aria-expanded`/`aria-controls` on the button, Escape / outside-mousedown / route-change close (:106-124), `childActive` exact match (:81-83), drawer `role="dialog" aria-modal` and scroll lock (:223-235, :329-333). A hidden-but-present `role="dialog" aria-modal="true"` panel needs `hidden`/`inert` handling so screen readers do not see an open modal.

**Owner locks in the file:** :15-26 (nav "Contact" hidden at `xl:` because the CTA carries the live `data-cta="header_contact"` series, "report 07 2.3"); :85-99 deliberate divergence, click-toggled `<button>` not hover `<Link>`, on accessibility grounds (needs self-referential first child in each group); :291-303 "`lg:`, NOT `sm:`, owner 2026-08-23" for `header_book`. Plan S1 (homepage sign-off) covers the header change "including the homepage"; STATE.md:26 records the S1-level sign-off for the homepage title only. Whether it covers the header is not recorded.

**Tests:** `Property/web/src/tests/nav-active-state.test.ts` (mirrors `hrefActive`/`childActive` against `buildPrimaryNav()`; passes; does not render the component). No test renders SiteHeader or asserts SSR anchors. `packages/web-shared/design/guards/nav-active-state*` is the estate copy, not used by Property.

---

## 4. llms.txt and llms-full.txt (lockstep)

| File:line | Text | Change with rewrite |
|---|---|---|
| `Property/web/public/llms.txt:26` | "[Property accountant for UK landlords and investors](…/services/property-accountant?utm_source=chatgpt&utm_medium=llms): The core accountancy service: rental accounts, Self Assessment, SPV company accounts, MTD, CGT and structuring." | label and description |
| llms.txt:27 | "[Landlord accountant](…/services/landlord-accountant?…): Accountants for landlords, buy-to-let owners, rental portfolios, property investors, and letting or managing agents." | same |
| llms.txt:28 | "[Property tax advice](…/services/property-tax-advice?…): One-off specialist consultations: structuring decisions, CGT timing, Section 24 mitigation, IHT and succession planning." | same (ChatGPT's best-converting page, BING_G:94: 13 sessions, 6 leads, 46%) |
| llms.txt:23 | "Facts current as at 2026-09-27." | deploy date |
| llms.txt:17 | "What happens after the form: We reply within 24 hours…" | follows any D3 wording change |
| llms.txt:139-140 | Email and phone | unverified (headline 6) |
| llms.txt:126-130 | 4 city entries point at 301ing blog URLs | WP0.2 |
| `Property/web/src/app/llms-full.txt/route.ts:12-28` | header from `niche.entity` + "Facts current as at 2026-09-27" (:22); body is blog posts only via `web-shared/content/llmsFull` | no service-page lines; date only |
| `Property/web/src/lib/page-summaries.ts:30-31` | PTA one-liner used in card excerpts | update if PTA's positioning sentence changes |

---

## 5. Build, QA, deploy and post-deploy gates

Pre-deploy, local (from repo root unless stated):

| # | Command | Notes |
|---|---|---|
| 1 | `cd Property/web && npx tsc --noEmit --incremental false` | baseline exit 0 today; `--incremental false` avoids writing tsbuildinfo (gitignored anyway) |
| 2 | `cd Property/web && npx vitest run` | config `Property/web/vitest.config.ts` (`src/**/*.test.ts`); STATE.md:30 last full run 1641/1641. Watch `calculator-tabs-crawl-path.test.ts` (headline 5) |
| 3 | `cd Property/web && npm run lint` | exists in package.json |
| 4 | `cd Property/web && npm run build` | kit step 1. Local env lacks `NEXT_PUBLIC_MINIFORMS_MULTISTEP` (plan §9) |
| 5 | `python scripts/check_dependency_closure.py` | standard_terms §6, before any deploy |
| 6 | `python scripts/track2_link_audit.py` then the hand grep `grep -rnE 'href="/(blog\|services\|locations\|for\|calculators)' Property/web/src Property/web/public/llms.txt Property/niche.config.json` | auditor scans only `content/blog/*.md` (DONE_E V13); `.tsx` and `audiences.ts` changes need the grep. Baseline 0 HARD / 1 SOFT |
| 7 | Schema parse: no repo script exists (DONE_E step 7). With `npm run start`: `curl -s localhost:3000/services/property-accountant \| node -e 'const h=require("fs").readFileSync(0,"utf8");const m=[...h.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];m.forEach(x=>JSON.parse(x[1]));console.log(m.length,"blocks parse")'`, then validator.schema.org by hand; `npx vitest run packages/web-shared/schema/schema.test.ts` covers only the shared builders, which these pages do not use | |
| 8 | No-JS render: `curl -s localhost:3000/ \| grep -o 'href="/services/[^"]*"' \| sort \| uniq -c` (expect header + footer hits after WP1); `curl -s localhost:3000/services/property-accountant \| grep -c "<new H2 text>"`; FAQ answers: grep an answer sentence outside `<script>` | today answers fail |
| 9 | `python scripts/predeploy_gate.py --site property` (`--strict` adds em-dash and pricing hard-fails) | QA-verdict and coverage gates key on blog `.md` sha256 (`scripts/qa_verdict.py:60-87`), so they do not cover `.tsx` service pages or `audiences.ts`; the brand check does scan `web/src/app` (:532) |
| 10 | Bing veto: `python scripts/_bing_veto_audit_2026_08_05.py` | one-shot, no arguments, hard-coded to city pages and three head terms (:137-172); threshold "≥1 click OR ≥100 impressions" (:146). Needs `BING_WEBMASTER_API_KEY`, `SUPABASE_ACCESS_TOKEN`; writes 4 untracked JSON files into `expansion_research/_prop_audit_2026_08_05/`. STATE.md:27 asks for the "pattern" on every changed title, H1 and slug, so it needs adapting to the service URLs, not running as is. BING_G: no Bing rows exist for any `/services/*` page |
| 11 | `git grep` for the old titles after retitle (DONE_E 1b(a)) | |

DONE_E verification kit, quoted (`DONE_E_report.md:204-234`): **1** Build `cd Property/web && npm run build`. **2** Hub-shadow guard `npm run dev` once (middleware dev throw, `middleware.ts` L556-565). **3** Link sweep `python scripts/track2_link_audit.py`, expect `HARD 404 ISSUES: 0` and `SOFT: 0`, then the hand grep above. **4** Sitemap diff `curl -s localhost:3000/sitemap.xml | grep -o '<loc>[^<]*' | sed 's|<loc>||' | sort > new.txt` against live. **5** Redirect chains `curl -sIL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126" <url> | grep -E "^HTTP/|^location:"`, repeat with the Googlebot UA. **6** Feed and llms parity: `curl -s localhost:3000/feed.xml | grep -c "<item>"` and `curl -s localhost:3000/llms-full.txt | grep -c "^URL: "` equal the sitemap post count. **7** Schema validation (no repo validator; node parse + validator.schema.org; "Do not claim one"). **8** `python scripts/predeploy_gate.py`. **9** After deploy only: inspection re-sweep `python <scratchpad>/tools/gsc_inspect_urls.py urls.txt out.csv` (script is not in the repo; location unknown). **10** IndexNow enqueue only. **11** monitored_pages via `register_monitored_batch.py`. Plan WP1 asks for steps 1, 3, 7, 8 pre-deploy and 9 post-deploy; WP5.2 asks for 1 to 8.

REWRITE_PROGRAM items that bind: §2 chain (`docs/_engines/REWRITE_PROGRAM.md:28-78`) is built for blog slugs (writer workflow → `qa_verdict.py pending/record/coverage` → `predeploy_gate.py --qa-batch` → build → commit → owner deploy); §5 locked rules (:127-139: rewrite-only, no em-dashes, house_positions cited by §N.M, manual deploys); §9.9 (:437-462) adds blocking equity preservation (every 90d GSC and 91d Bing query still matchable), cluster coverage, ledger balance and competitor re-read; §9.11 (:484-517) a cluster-level language pass before any page is written. How §2's sha256 gates apply to `.tsx` pages is not defined in the repo.

Deploy and post-deploy (owner-triggered, plan §5 step 4, WP0.7, WP5.3):

| Step | Exact mechanism |
|---|---|
| Deploy | Owner. `scripts/deploy-and-index.ps1 -Site property [-QaBatch <B>]`: gate (`predeploy_gate.py --site property`), swap `.vercel/project.json`, `vercel deploy --prod --yes --archive=tgz` from repo root, restore, optional `register_monitored_batch.py --batch <B> --commit` (step 5b), IndexNow drain (step 6). Note: the script deploys from the working tree; standard_terms §6 and plan §9 require a clean worktree at a pushed SHA (`C:/dep`), and HEAD is unpushed (STATE.md:21) |
| IndexNow | `python -m optimisation_engine.indexing.submit_indexnow --site property --enqueue <url>` during work; drain `--from-queue`, or explicit `python -m optimisation_engine.indexing.submit_indexnow --site property <url> <url>`; never `--from-sitemap` |
| Request indexing | Search Console UI, owner: the four service pages, `/blog/property-accountant-services`, `/locations`, the London and Bristol old city post URLs (plan §5 step 4, WP5.3). No script |
| site_flags SQL | `update site_flags set value = value || '{"enabled":false}' where key='calc_pdf_offer';` (STATE.md:412; table columns `key, value jsonb, updated_at`) |
| monitored_pages | `python scripts/register_monitored_batch.py --slugs property-accountant landlord-accountant property-tax-advice --page-urls property-accountant=/services/property-accountant landlord-accountant=/services/landlord-accountant property-tax-advice=/services/property-tax-advice --rewrite-type rewrite` (dry run), then `--commit`. Default URL builder assumes `/blog/<cat>/<slug>` (:159), hence `--page-urls`. Reconcile the 19 stale rows in DONE_E V8 the same way, never a bare insert |
| Day 14 | URL Inspection re-sweep of every touched URL plus anything that 301s into one; Bing and ChatGPT entries read alongside (STATE.md:27 b) |

---

## 6. Non-copy elements to preserve through a rewrite

| Element | PA | LA | PTA |
|---|---|---|---|
| `import type { Metadata }`, `Link`, component imports | :1-34 | :1-32 | :1-37 |
| Path constant | `PAGE_PATH` :36 | `PAGE_PATH`, `PAGE_URL` :34-35 | `PAGE_PATH`, `pageUrl` :39-40 |
| `export const metadata` (static; no `generateMetadata` on any of the three) with canonical, `languages` en-GB + x-default, openGraph type website, twitter summary_large_image | :49-73 | :48-72 | :52-76 |
| Service JSON-LD (add @id, provider @id, areaServed "United Kingdom", hasOfferCatalog per SCHEMA_F §6a) | :352-383, emitted :388-391 | :283-300, emitted :315-318 | :402-423, emitted :428-431 |
| FAQPage builder and parity (12 questions; plan guardrail: count stays 12) | `buildFaqPageJsonLd` :393-395 | inline :301-309 | `buildFaqPageJsonLd` :433-435 |
| `<Breadcrumb>` (emits BreadcrumbList) | :401-407 | :326-332 | :443-449 |
| `hasOfferCatalog` derived from the visible `coverage` array so copy and schema cannot drift | :375-382 | none | none |
| Anchor ids | `#included` :533, `#free-tools` :685, `#book` :724 | `#free-tools` :720, `#book` :733, `#faqs` :746 | `#free-tools` :698, `#book` :737, `#faqs` :754 and `#faq` :755 (both kept on purpose, comment :750-753) |
| `scroll-mt-24` on anchored blocks | yes | yes | yes |
| data-cta ids (section 1e) | hero_book, hero_calculators, prompts_book, included_book, difference_book, fees_book | hero_book, hero_calculators, section24_book, agents_book, comparison_book | hero_book, triggers_book, deliverables_book, comparison_book (hero secondary has none) |
| Hero primary to `/contact`, `#book` panels kept (`845f0d7c`, STATE.md:30) | :418 | :343 | :462 |
| LeadCTAPanel (only page form, `form_id` lead_form) | :725-734 | :734-743 | :738-747 |
| CalculatorTabs and the per-tool link rule (test :104-107, :182-196) | tabs, zero `/calculators/<slug>` links, exempt | tabs plus 3 per-tool links (:392, :505, :605), must keep ≥1 | `tabs={["section24","incorporation","mtd","stampduty"]}` :715, zero links, exempt |
| Even-length `PromptMarquee` arrays (comment: odd count shows a seam) | `clientPrompts` 6, :80-114 | | `triggerPrompts` 6 with `detail`, :126-172 |
| RelatedArticles lists (carve-out 5 comments) | `feedingPosts` 8, :241-281 | | `backgroundReading` 8, :294-333 |
| `ExampleFigureNote` on figure tables (owner rule 33) | | | :673 |
| CardCarousel per-card `href` (LPC link) | | :127-128, comment :405-414 | |
| Owner comments that record decisions | :38-48 (title kept vs designer), :232-235 (24h owner question), :636-641 (DECISION I, no invented fee), :703-719 (OWNER DECISION 2026-08-23 tabs only) | :37-47, :405-414 | :42-51, :174-181, :676-682, :717-730 |
| Shared components a copy edit might be tempted to change | TestimonialsSection (reaches frozen homepage), site-stats (homepage, /about), FaqSection (all Property FAQ pages) | same | same |

No test snapshots or renders these three pages. Tests that read their source: `calculator-tabs-crawl-path.test.ts` (all three) and `nav-active-state.test.ts` (nav config only). `consent-anchor-drift.test.ts` reads niche configs, not page copy.

---

## Unknowns

- Index status of blog posts outside INV_B is from the 2026-09-26 sweep; the 2026-10-07 full sweep is not stored (only 19 rows that day in `gsc_url_inspection`).
- Whether the 2026-10-09 live build equals any specific SHA; snapshots show live behind HEAD on hero CTA targets.
- Whether S1 sign-off covers the header change.
- Whether the llms.txt phone and email are real and monitored.
- Location of `gsc_inspect_urls.py`.
- How the §2 QA-verdict chain should key `.tsx` pages.
- Bing per-query data for the service pages: none exists (BING_G), so the veto has nothing to protect on search; the ChatGPT entry on PTA is the asset.
