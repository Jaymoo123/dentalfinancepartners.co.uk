# Property Tax Partners — Off-Page Presence Playbook

**Created:** 2026-07-10 · **Status:** READY TO EXECUTE (owner runs signups, Claude does on-site tie-ins)
**Goal:** build the holistic off-page identity layer (business profiles, citations, social entity, reviews) that search engines and audit tools expect, with the minimum personal-identity exposure compatible with the faceless model.

---

## 0. Canonical identity block (paste EVERYWHERE, character-identical)

Citation consistency is the ranking signal. Every listing must use these exact values. Never improvise variants.

| Field | Value |
|---|---|
| Business name | `Property Tax Partners` |
| Legal entity | `Ashfield Trading Ltd` (Co. 16358723, England and Wales) — only where a legal-entity field exists; never as the display name |
| Website | `https://www.propertytaxpartners.co.uk` (always with www, always https, no trailing slash) |
| Email | `hello@propertytaxpartners.co.uk` |
| Phone | **NONE — decided 2026-07-10.** The `+44 20 3026 1111` in niche.config.json is NOT real; never enter it anywhere. Leave phone blank on every listing where optional. If a platform hard-requires a number for verification (GBP sometimes does), provision a cheap UK VoIP number at that moment (voicemail-to-email), and then use that same number everywhere retroactively. Prefer video/postcard verification where offered. |
| Address | `20 Ashfield Avenue, Shipley, Bradford, BD18 3AL` — **enter only in the private/verification field, always tick "I deliver services at customer locations" / hide address**. This is the registered office (residential-looking); it must never render publicly. |
| Service areas | United Kingdom (where granular: London, Manchester, Birmingham, Leeds, Bristol — matches the live /locations pages) |
| Category (primary) | Accountant / Accounting firm |
| Categories (secondary) | Tax consultant · Tax preparation service · Bookkeeping service |
| Hours | Mon–Fri 9:00–17:30 (or owner's real answerable hours; pick once, reuse) |
| Founded | 2025 (Ashfield Trading Ltd incorporation year — verify against Companies House if a tool demands exact date) |
| Logo | needs a real PNG (current publisher logo is `og-placeholder.svg` — see §5.1) |

### Description copy (pre-written, three lengths — paste as-is, no edits per site)

**Short (~150 chars, for Bing/Yell/short fields):**
> Specialist property tax accountants for UK landlords. Section 24 planning, incorporation analysis, MTD compliance. Fixed fees, online, UK-wide.

**Medium (~400 chars, GBP "from the business" and most directories):**
> Property Tax Partners is a specialist online accountancy service for UK landlords and property investors. We handle Section 24 mortgage interest planning, buy-to-let limited company incorporation analysis, capital gains tax on residential property, stamp duty questions and Making Tax Digital compliance. Fixed fees, a 24 hour response promise, and free property tax calculators on our website.

**Long (~700 chars, FreeIndex/Cylex/profile "about" pages):**
> Property Tax Partners helps UK landlords and property investors get their tax sorted. We are a specialist online practice covering the issues that general accountants often get wrong: the Section 24 mortgage interest restriction, whether and how to incorporate a buy-to-let portfolio, capital gains tax on residential sales, stamp duty land tax, non-resident landlord rules and Making Tax Digital for Income Tax. Everything runs online with fixed fees agreed up front and a 24 hour response promise. Our website offers a suite of free calculators, including Section 24 and incorporation cost calculators, plus in-depth guides and the UK Landlord Tax Index research series. Property Tax Partners is a trading name of Ashfield Trading Ltd.

---

## 1. Tier 1 — the profiles that move rankings (do these first, in order)

### 1.1 Google Business Profile (GBP) — the single biggest item
- business.google.com → create profile as **service-area business** (choose "No" to "Do you want to add a location customers can visit?"). Address entered only for verification, hidden from public.
- Service areas: United Kingdom (or the 5 cities + "UK" if it forces granularity).
- Verification: Google decides the method (video, phone, postcard to the Shipley address). Video verification for online-only businesses is common now; be ready to show the website, logo, and something tying you to the address.
- After live: add the 3 description lengths, categories, services list (Section 24 planning, incorporation analysis, MTD, CGT, SDLT advice), logo + cover image, weekly posts optional.
- ⚠️ **One-brand rule:** create GBP for Property Tax Partners ONLY for now. Eight profiles for eight trading names at one residential address is Google's classic duplicate/spam suspension pattern. Expand to a second brand only after this one has been stable 60+ days, and stagger.

### 1.2 Bing Places
- bingplaces.com → **"Import from Google Business Profile"** after 1.1 is verified. One click, keeps NAP identical, and the estate already over-performs on Bing so this compounds.

### 1.3 Apple Business Connect
- businessconnect.apple.com → same service-area setup. Free, feeds Apple Maps + Siri + increasingly AI assistants. Low effort once GBP copy exists.

### 1.4 LinkedIn Company Page
- Create **Ashfield Trading Ltd requires a personal LinkedIn admin account** — the page itself can be brand-only but you need to be listed as admin privately. Page: "Property Tax Partners", accountancy, 2-10 employees, UK, logo + banner, medium description.
- This is the #1 `sameAs` target and the profile every audit tool checks first. No posting cadence required; an existent, complete page is 90% of the value.
- Faceless-compatible: nothing forces named staff on the page.

### 1.5 Companies House consistency check (already done, verify only)
- Ashfield Trading Ltd 16358723 already public. Nothing to create; just confirm the registered office matches §0 exactly.

## 2. Tier 2 — UK citation/directory layer (free listings, ~20 min each)

Do after Tier 1. All free tiers; decline every upsell call/email (they will call the listing phone).

| Directory | URL | Notes |
|---|---|---|
| Yell.com | yell.com/free-listing | The one the salesman was selling. Free listing is enough; DO NOT buy the paid package, it is the product that audit was designed to sell. |
| FreeIndex | freeindex.co.uk | High-authority UK directory, supports reviews. |
| Thomson Local | thomsonlocal.com | Legacy but still crawled. |
| Cylex UK | cylex-uk.co.uk | Accepts service-area businesses cleanly. |
| Scoot | scoot.co.uk | Feeds several smaller UK directories. |
| Hotfrog | hotfrog.co.uk | Quick. |
| Brownbook | brownbook.net | Quick. |
| 192.com business | 192.com | Optional; exposes address more prominently — skip if uncomfortable. |
| The Trustist / accountant-specific | — | Skip paid niche directories; **do NOT list on ICAEW/ACCA "find an accountant"** — the estate makes no credential claims and must not imply chartered status (see credential-risk memory). |

Use the §0 block verbatim on all of them. Keep one spreadsheet/row per listing with login email + URL (suggest a `presence` tab wherever you track credentials).

## 3. Tier 3 — reviews + minimal social footprint

- **Reviews:** GBP + FreeIndex are the two surfaces worth having. Source: the lead-nurture pipeline already emails clients; add a post-engagement email step asking happy clients for a Google review (link straight to the GBP review URL once live). Faceless-compatible; reviews name the brand, not you.
- **X/Facebook pages:** create handle-squatting pages (`@PropertyTaxPtnrs` or similar, and a Facebook business page) with logo + link + short description, zero posting obligation. Their value is (a) sameAs entities, (b) blocking impersonation, (c) audit-tool checkboxes. ~15 min each.
- **Do not** start a posting cadence anywhere; empty-but-complete beats active-then-abandoned.

## 4. Risk register (why we are NOT doing certain things)

1. **No 8-brand blitz.** One entity, one address, eight brands = spam pattern on Google. Property only, expand slowly.
2. **No paid directories/audit vendors.** The 5.9/10 was a sales instrument; free listings capture ~all the SEO value.
3. **No accountancy-body directories.** No credential claims (locked rule).
4. **Address exposure is bounded:** it is already public at Companies House; listings must still hide it (service-area mode) so it never renders on maps next to the brand.
5. **Phone:** whatever number goes on listings will receive directory-upsell spam calls forever. A dedicated VoIP number is worth it just as a spam sink + tracking line.

## 5. On-site tie-ins (Claude executes once profiles exist)

1. **Real logo + og:image:** replace `og-placeholder.svg` with a proper 1200×630 PNG og:image and a square PNG publisher logo (currently the schema logo points at the SVG placeholder — this also degrades GBP/knowledge-panel matching). Blocked on a real logo asset; a text-lockup PNG can be generated from the existing brand tokens.
2. **`sameAs` in Organization schema** (`Property/web/src/lib/organization-schema.ts`): add array of the LinkedIn/GBP-maps/X/Facebook URLs as each goes live. One-line change per URL.
3. **Consistency:** confirm footer legal line, /contact, and privacy policy all show the same entity/address wording as §0.

## 6. Entity + AI-answer layer (the "next level" — where an AI-focused estate actually wins)

Classic citations (§1-2) are table stakes. AI answer engines (ChatGPT search, Perplexity, Copilot, Gemini, AI Overviews) pick who to cite from a different graph: entity databases, high-authority UGC, datasets, and Bing's index. Already in place on-site: robots.txt whitelists every AI crawler, `/llms.txt` is live, JSON-LD everywhere. The estate-wide methodology lives in `docs/_engines/AI_SEARCH_GEO_PROGRAM.md` (approved, holding for deploy) — this section is the Property off-site slice.

### 6.1 Entity registration (makes "Property Tax Partners" a thing machines know)
- **Wikidata item** — create an item for Property Tax Partners / Ashfield Trading Ltd (instance of: business; country: UK; official website; Companies House ID as external identifier). Wikidata is the backbone of Google's Knowledge Graph and heavily weighted by LLM retrieval. Free, faceless, 30 min, legitimate (any registered company qualifies — this is NOT Wikipedia; do not attempt Wikipedia, the brand is not notable and it would be deleted).
- **Crunchbase company profile** — free tier, high-authority entity page LLMs cite for "who is X".
- **Google Knowledge Panel claim** — once GBP + Wikidata + sameAs exist, a panel usually materialises; claim it via posts.google.com when it does.
- **GS1/DUNS** — D-U-N-S number via dnb.co.uk free lookup/registration; feeds B2B entity databases.

### 6.2 Bing-first distribution (Bing feeds Copilot AND ChatGPT search; estate already over-ranks there)
- **IndexNow for Property** — the agency site already has `pipeline/submit_indexnow.py`; wire Property submissions in (Claude task, small).
- **Bing Places (§1.2)** becomes double-value here: Copilot local answers pull from it directly.

### 6.3 Citable-asset distribution (faceless authority, uses assets that already exist)
- **UK Landlord Tax Index** (`/research/landlord-tax-index`, live): publish the underlying dataset to GitHub (public repo, CC-BY, README pointing home) and Kaggle. Datasets are disproportionately crawled, cited by journalists, and surface in LLM answers with attribution links.
- **Data-PR pushes**: each Index refresh → short methodology-led pitch to property trade press (LandlordZONE, Property118, Landlord Today, PropertyWire). Faceless-compatible: "new analysis from Property Tax Partners", no named expert. One earned link from any of these outranks the entire §2 citation layer.
- **Journalist request platforms** (Qwoted / Featured / ResponseSource alerts): respond as "the research team at Property Tax Partners" with data points from the Index. Skip anything demanding a named credentialed expert (locked rule).
- **Calculator embeds**: the site already has `/embed/[slug]` pages — offer the Section 24 / incorporation calculators as free embeds to landlord blogs and letting agents. Every embed = a followed brand link. This is an existing asset with zero distribution.

### 6.4 High-authority UGC that LLMs actually retrieve from
LLM answers over-cite Reddit, Quora and specialist forums. Rules of engagement: genuinely answer the question first, link only when the calculator/guide is the honest best answer, never paste marketing copy, expect and accept that some communities ban links entirely.
- Reddit: r/uklandlords, r/UKPersonalFinance (link-hostile — answer without links, brand mention only where allowed).
- Property forums: Property Hub forum, LandlordZONE forum, Property Tribes — answer Section 24/incorporation threads, calculator links where permitted.
- Quora: UK landlord tax questions, brand-attributed answers.
- Cadence: a few genuinely useful answers per month beats a blitz; this is the one channel where volume reads as spam fast.

### 6.5 Media placeholders (low effort, entity reinforcement)
- **YouTube channel** — brand placeholder + later short calculator-explainer screencasts (AI narration acceptable; no face needed). YouTube descriptions are crawled and cited; also a sameAs node.
- **Trustpilot** — claim the free business profile (it likely auto-exists or will); audit tools and Bing both surface it. Only worth activating once the review-ask step (§3) can feed it, otherwise an empty 0-review page is neutral-to-negative — claim but don't link until seeded.

### 6.6 Explicitly skipped (so this list is decision-complete)
- Wikipedia — not notable, guaranteed deletion, risks the Wikidata item too if spammed.
- Paid PR-wire releases (PRWeb etc.) — links are nofollow, LLMs discount wire copy; data-PR direct pitches (§6.3) strictly better.
- Podcast guesting / video with faces / named-expert commentary — violates the faceless constraint.
- Awards directories, chambers of commerce — pay-to-play, near-zero signal.
- Review widgets from paid platforms (Reviews.io etc.) — Google + Trustpilot free tiers cover it.

## 7. Execution order + tracking

1. Owner decision: phone number (real / VoIP / omit) → unblocks everything.
2. GBP → verify → Bing import → Apple → LinkedIn (week 1).
3. Citation layer §2 (week 2, batchable in one sitting).
4. Review-ask step into nurture emails + social placeholders (week 3).
5. Entity layer: Wikidata + Crunchbase + Trustpilot claim (week 3, ~90 min total).
6. Claude tasks, as inputs land: sameAs + logo/og-image; Property IndexNow wiring; Index dataset → GitHub/Kaggle publish; embed-offer landing copy.
7. Ongoing drips: data-PR per Index refresh; forum/Reddit answers a few per month; YouTube screencasts when convenient.

Track each listing here as it goes live:

| Surface | Status | URL | Login email |
|---|---|---|---|
| Google Business Profile | ☐ | | |
| Bing Places | ☐ | | |
| Apple Business Connect | ☐ | | |
| LinkedIn | ☐ | | |
| Yell | ☐ | | |
| FreeIndex | ☐ | | |
| Thomson Local | ☐ | | |
| Cylex | ☐ | | |
| Scoot | ☐ | | |
| Hotfrog | ☐ | | |
| Brownbook | ☐ | | |
| X | ☐ | | |
| Facebook | ☐ | | |
