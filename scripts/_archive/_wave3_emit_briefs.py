import os
from pathlib import Path

BRIEFS_DIR = Path(r"C:/Users/user/Documents/Accounting/briefs/property/wave3")
BRIEFS_DIR.mkdir(parents=True, exist_ok=True)

AUTH_ATED = """- [HMRC ATED Manual (gov.uk Internal Manuals)](https://www.gov.uk/hmrc-internal-manuals/annual-tax-on-enveloped-dwellings)
- [ATED return guidance (gov.uk)](https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-returns)
- [ATED rates and bands (gov.uk current-year table)](https://www.gov.uk/government/publications/annual-tax-on-enveloped-dwellings-technical-guidance)
- [FA 2013 Part 3 (ATED introduction, legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2013/29/part/3)
- [Schedule A1 IHTA 1984 (IHT look-through for enveloped UK residential property)](https://www.legislation.gov.uk/ukpga/1984/51/schedule/A1)
- [Register of Overseas Entities (gov.uk)](https://www.gov.uk/guidance/register-an-overseas-entity)
- [FA 2009 Sch 55 (penalties for failure to make returns)](https://www.legislation.gov.uk/ukpga/2009/10/schedule/55)
- [HMRC ATED-CGT abolition guidance (FA 2019 transitional)](https://www.gov.uk/government/publications/non-resident-companies-chargeable-gains-on-uk-immovable-property)"""

AUTH_MTD = """- [HMRC Making Tax Digital for Income Tax guidance (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [Find software compatible with MTD for Income Tax (gov.uk supplier list)](https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax)
- [FA 2017 Sch A1 / Sch 14 (digital reporting obligations, legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [FA 2021 Sch 24 / 25 / 26 (new penalty regime as adapted for MTD ITSA)](https://www.legislation.gov.uk/ukpga/2021/26)
- [HMRC MTD overview (gov.uk)](https://www.gov.uk/government/publications/making-tax-digital/overview-of-making-tax-digital)
- [Spring Statement 2025 (penalty doubling for MTD ITSA late payments)](https://www.gov.uk/government/topical-events/spring-statement-2025)
- [Original 2018 MTD consultation outcome (gov.uk context)](https://www.gov.uk/government/consultations/making-tax-digital)"""

AUTH_RRA = """- [Renters Rights Act 2025 (legislation.gov.uk, 2025 c. 26)](https://www.legislation.gov.uk/ukpga/2025/26/contents)
- [Housing Act 1988 (legislation.gov.uk, ss.5 / 8 / 13 / 21 baseline)](https://www.legislation.gov.uk/ukpga/1988/50/contents)
- [First-Tier Tribunal Property Chamber decisions (gov.uk)](https://www.gov.uk/government/organisations/first-tier-tribunal-property-chamber)
- [Decent Homes Standard (gov.uk MHCLG / DLUHC)](https://www.gov.uk/government/publications/a-decent-home-definition-and-guidance)
- [HMRC Property Income Manual (PIM) for deductibility framings](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [gov.uk private renting / landlord pages](https://www.gov.uk/browse/housing-local-services/renting-property)
- [Renters Rights Act commencement orders (legislation.gov.uk SI lookup)](https://www.legislation.gov.uk/all?title=Renters%20Rights)"""

HP_ATED = "**Read `docs/property/house_positions.md` once at the start.** For Wave 3, pay particular attention to **section 2 (headline ATED position)** AND **section 18 (Wave 3 ATED extension)** which gives you the 2026/27 band figures (verified 2026-05-22), the relief catalogue with statutory citations, the 30 April return mechanic, the five-yearly + acquisition valuation rules, the ATED-CGT abolition framing, the RoE interaction, and the OTM compliance campaign signal. Section 18 is the working detail; section 2 is the headline tie-breaker."

HP_MTD = "**Read `docs/property/house_positions.md` once at the start.** For Wave 3, pay particular attention to **section 3 (headline MTD ITSA position)** AND **section 19 (Wave 3 MTD extension)** which gives you the mandate timeline (50k April 2026, 30k April 2027, 20k April 2028), the qualifying-income gross-vs-net mechanic, the excluded categories (Ltd Cos out, partnerships deferred), joint-property owner threshold split, the three-year exit rule, software requirements, quarterly cycle dates, the points-based late-submission regime, the Spring Statement 2025 doubled late-payment regime (3%/3%/10%), and the abandoned 10k threshold history. Section 19 is the working detail; section 3 is the headline tie-breaker."

HP_RRA = "**Read `docs/property/house_positions.md` once at the start.** For Wave 3, pay particular attention to **section 12 (the original in-passage framing, retained for audit) AND section 20 (Wave 3 RRA extension, the post-Royal-Assent locked detail)**. Section 20 reflects the actual Renters Rights Act 2025 (2025 c. 26, Royal Assent 27 October 2025): Section 21 abolition, reformed Section 8 grounds, periodic-tenancy default + AST phase-out, Decent Homes Standard extension to PRS, landlord database + PRS Ombudsman, Section 13 rent-rise mechanics, pet rights, bidding-wars prohibition, transition for existing tenancies, enforcement / penalty regime, and the firm-specific tax-implications angle. Section 20 supersedes section 12 where they conflict; section 12 stays as audit trail."

def universal_rules(hp_pointer):
    return """## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments (match each where relevant in FAQs): Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments. Conversion moments to consider:
  - After the first worked numerical example
  - After a comparison table
  - After explaining a high-cost trap or pitfall
  - At the end of a decision-framework section
- Avoid: opening the page with an aside (let the user trust you first); placing an aside inside a worked example; >3 asides total.
- Don't write the same opening sentence each time. Avoid "Many landlords ask about ...". Vary the opening per page.

### Schema
- FAQs live in frontmatter `faqs:` array. The template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.
- If your topic suits HowTo schema (step-by-step process), flag in your work-log and the orchestrator will assess whether to add HowTo schema in the template (NOT in body).

### Cannibalisation
- The "Closest existing pages" section below shows what we already have on related topics. **Read those pages before writing**. Decide whether yours is the applied/scenario version (link out to the existing pillar) or vice versa.
- Do not duplicate worked numerical examples verbatim across pages. Differ figures, scenarios, or angles.

### House positions
- """ + hp_pointer + """ If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave3_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count**, aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 3 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page. ATED pillar pages and ATED penalty-appeal pages should NOT have the same outline. MTD persona pages must each lead with the persona-specific wrinkle. RRA mechanic pages and tax-implication pages should diverge clearly.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages."""

WORKFLOW = """## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 3, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave3_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (Stage 2 will fill the precise list during your worktree session). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 2 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 1 had multiple tracker-ahead-of-branch drift incidents; Wave 2 baked in the discipline; Wave 3 carries it forward. Use git add for the content file and brief file only.
    **Wave 2 section 16.15 lesson:** do NOT include `docs/property/wave3_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave3_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **Wave 2 section 16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave3_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave3_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern (from Wave 2)

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait."""


WORK_LOG = """## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:** ( chars)
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted:
- Body word count:

### Flags raised to wave3_site_wide_flags.md

### 2-3 sentence summary"""

def make_brief(slug, session, category, bucket, framing, competitor, closest_hint, redirect_note, bucket_key):
    if bucket_key == "ATED":
        hp = HP_ATED; auth = AUTH_ATED
    elif bucket_key == "MTD":
        hp = HP_MTD; auth = AUTH_MTD
    else:
        hp = HP_RRA; auth = AUTH_RRA
    rules = universal_rules(hp)
    header = (
        "# Wave 3 brief: " + slug + "\n\n"
        "**Site:** property\n"
        "**Bucket:** " + bucket + "\n"
        "**Session:** " + session + "\n"
        "**Brief type:** Net-new page (no existing markdown file)\n"
        "**Source markdown path on launch:** `Property/web/content/blog/" + slug + ".md`\n"
        "**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/" + category + "/" + slug + "\n\n"
        "---\n\n"
        "## Manager pre-decisions\n\n"
        "- **Suggested slug:** `" + slug + "`\n"
        "- **Suggested category:** `" + category + "`\n"
        "- **Bucket:** " + bucket + "\n"
        "- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**\n\n"
        "> " + framing + "\n\n"
        "If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.\n\n"
        "---\n\n"
        "## Competitor URLs, to validate in Stage 2\n\n"
        "- " + competitor + " (manager-identified primary; Stage 2 must verify the URL is alive, read it, and reason about whether it is the right reference, and add 2-4 more URLs if the candidate is weak).\n\n"
        "> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Stage 2 fills additional URLs after live verification.\n\n"
        "---\n\n"
        "## GSC data\n\n"
        "*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*\n\n"
        "---\n\n"
        "## Closest existing pages, Opus reasoning needed (Stage 2)\n\n"
        "*Manager pre-fills only a 1-line hint of expected neighbours below. Stage 2 reads the actual existing post titles + slugs on the full Property inventory (316 pages including the 61 Wave 1 and Wave 2 outputs on main) and reasons about the 3-7 closest pages topically. The token-similarity matcher is NOT used (section 16.11 lesson from Wave 2).*\n\n"
        "**Manager hint:** " + closest_hint + "\n\n"
        "**Cannibalisation discipline:**\n"
        "- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.\n"
        "- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).\n"
        "- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.\n\n"
        "---\n\n"
        "## Redirect overlap (on launch)\n\n"
        + redirect_note + "\n\n"
        "---\n\n"
        "## Authority links worth considering for this bucket\n\n"
        + auth + "\n\n"
        "You don't have to use all of these; pick the ones that fit your specific framing. Add others you find during research.\n\n"
        "---\n\n"
        + rules + "\n\n"
        "---\n\n"
        + WORKFLOW + "\n\n"
        "---\n\n"
        + WORK_LOG + "\n"
    )
    return header

BRIEFS = []

# Session A - ATED
BRIEFS.append(("ated-overview-companies-holding-uk-residential-property-2026-27", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Strategic overview page for the company-holding-residential-property cohort. Not a rates table (that is A2), not a process walkthrough (that is A10), not a relief catalogue. This is the chargeable-persons positioning page: who falls in, who falls out, the 2026/27 transition, the 500,000 threshold, why ATED exists alongside SDLT 15% and IHT Sch A1, and the strategic question every BTL ltd co director asks before they incorporate. Anchors the bucket. Existing `ated-complete-guide-2026-27` becomes the deeper mechanic; this page is the strategic entry point and links out to A2/A3/A6/A9/A10 for depth.",
    "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-annual-tax-on-enveloped-dwellings/",
    "expected neighbours: existing `ated-complete-guide-2026-27` (must coordinate, see cannibalisation flag in wave3_candidates_selected.md), `ated-15-percent-flat-rate-sdlt-interaction`, `ated-rental-property-relief-mechanics`, `buy-to-let-limited-company-complete-guide-uk`, `corporation-tax-rates-property-companies-2026-27`. Sibling Wave 3 briefs A2/A3/A6.",
    "none obvious; Stage 2 to validate against the 429-redirect catalogue. Old `annual-tax-enveloped-dwellings`-style slugs may exist as legacy aliases.",
    "ATED"))

BRIEFS.append(("ated-rates-2026-27-bands-table-worked-examples", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Rates and bands reference page anchored on the verified 2025/26 + 2026/27 figures from section 18.1. Worked examples by band tier (sub-1m flat, 2-5m townhouse, 5m+ central London house) showing the year-on-year uplift. Pre-return banding check mechanic for boundary cases. Distinct from A1 (strategic positioning) by being a quick-reference rates page; distinct from A7 (valuation rules) by anchoring on the rate, not the value. Reader: someone who knows they are in ATED and needs the current-year number.",
    "https://www.ukpropertyaccountants.co.uk/ated-rates/",
    "expected neighbours: A1 (overview, strategic anchor), A7 (valuation rules, lateral mechanic), existing `ated-complete-guide-2026-27`. Page intentionally narrow and reference-shaped.",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-relief-clawback-occupation-non-qualifying-individual", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Clawback mechanics page. The rental relief under s.133 FA 2013 is granted on the assumption of unconnected-tenant occupation. When that breaks (director adult child moves in between tenants for 3 months; family friend stays through a Covid scare; informal use-of-property for relatives during a refurb), the relief is clawed back and the full ATED charge becomes due. This page covers the trigger events, the apportionment, the disclosure obligation, and the worked example of how a 9,150 charge becomes payable on a previously-relieved 1.5m flat. Existing relief-mechanics page covers the claim; this page covers the loss of the claim.",
    "https://www.ukpropertyaccountants.co.uk/ated-relief-clawback-occupation-by-a-non-qualifying-occupation/",
    "expected neighbours: existing `ated-rental-property-relief-mechanics` (the claim side; this is the clawback side), A4 (related-persons mechanic, lateral), A9 (penalty appeals where clawback was not declared).",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-relief-related-persons-market-rent-test", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "The s.133 FA 2013 unconnected-tenant-on-commercial-terms test in the context where the tenant IS a related person. Specific scenarios: director adult-children tenancy at full market rent; portfolio company letting to associated trading company relocation pool; family trust occupying via lease structured commercially. Covers what 'commercial terms' means when the parties are related (HMRC view: independent valuation evidence, monthly rent demonstrably received, same terms an unconnected tenant would accept). Highly practical advisory page; distinct from A3 (clawback after relief granted) because this is about whether relief is granted at all.",
    "https://www.ukpropertyaccountants.co.uk/ated-relief-for-related-persons-and-market-rent-a-complete-guide/",
    "expected neighbours: existing `ated-rental-property-relief-mechanics`, A3 (clawback side), `transfer-properties-to-company-phased-guide`, `landlord-incorporation-step-by-step-guide-uk`.",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-return-amendment-corrections-procedure", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Process page for amending a filed ATED return. Reasons amendment is needed: valuation challenged by HMRC, relief mis-claimed, band-boundary correction after a PRBC, discovery of an earlier non-filing. Covers the 12-month standard amendment window, the longer windows where HMRC discovery is the trigger, the IHT400-style correction letter route, and the interaction with the FA 2009 Sch 55 penalty regime. Distinct from A10 (process walkthrough for the first-time filer) by being amendment-specific.",
    "https://www.ukpropertyaccountants.co.uk/ated-return-amendment-guide-when-how-tax-tips/",
    "expected neighbours: existing `ated-late-filing-penalties-mechanics`, A9 (appeals where amendment is denied), A10 (process walkthrough for the first-time filer).",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-mixed-use-property-apportionment-treatment", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Boundary-case page for mixed-use buildings. ATED applies only to the residential portion; a flat-over-shop owned by a company gets ATED on the residential element only if that element clears 500,000. Covers floor-area vs value-based apportionment evidence, the HMRC just-and-reasonable test, the interaction with the SDLT mixed-use concessionary route (separate, but readers conflate), and the serviced-accommodation edge case (when does a B and B-style room cease to be 'dwelling' for ATED?). Practical for company-held mixed-use portfolios in central London and regional cities.",
    "https://www.ukpropertyaccountants.co.uk/understanding-ated-and-mixed-use-properties-a-detailed-guide/",
    "expected neighbours: A1, A7 (valuation), existing `airbnb-tax-uk-short-term-rental-income-taxed` (serviced-accom edge), existing `cgt-commercial-property-different-residential` (CGT mixed-use sibling, lateral mechanic).",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-valuation-date-rules-2027-revaluation", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "The 1 April 2027 five-yearly revaluation page, written to be timeless but anchored on the upcoming revaluation. Covers the 1 April 2012 / 2017 / 2022 / 2027 cycle, the acquisition-date interim rule, the PRBC for near-boundary values, and the practical decision: instruct a chartered surveyor now, or accept HMRC's view if the property looks comfortably within a band? Worked example: a 4.9m flat at 1 April 2022 that has moved to 5.3m by 1 April 2027 jumps the band and adds about 40,000 a year to the charge. Timing-led page; lands well in 2026 and early 2027 ahead of the deadline.",
    "https://www.ukpropertyaccountants.co.uk/understanding-ated-valuation-rules/",
    "expected neighbours: A1, A2 (rates table), A6 (mixed-use, related apportionment), existing `how-to-value-rental-property-portfolio-tax-purposes` (cross-bucket valuation lateral).",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-overseas-companies-voluntary-compliance-otm-letters", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Compliance-focused page for the overseas-company holding cohort. Covers voluntary disclosure routes for previously-unfiled years, the HMRC OTM (One-to-Many) campaign letters as a known practical pressure point (section 18.7), the interaction with the Register of Overseas Entities (section 18.6, the two regimes run in parallel), and the disclosure-vs-investigation calculus (volunteering vs waiting for the discovery letter). Specific to overseas-incorporated entities; UK-co cohort gets less from this page.",
    "https://www.ukpropertyaccountants.co.uk/voluntary-ated-compliance-a-guide-for-overseas-companies/",
    "expected neighbours: existing `non-resident-landlord-scheme-uk-complete-guide` (NRL pillar, often the related compliance question for these clients), A1, existing register-of-overseas-entities-related pages if any.",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-late-filing-penalty-appeal-reasonable-excuse", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Appeals procedure page for ATED penalties. The penalty schedule (100 / 200 / 300 / 300 escalation) is covered in existing `ated-late-filing-penalties-mechanics`; this page is what happens AFTER. Covers FA 2009 Sch 55 reasonable-excuse test, the FTT appeal route, key tribunal decisions on what counts as reasonable excuse for ATED specifically (distinct from VAT and IT case law), special circumstances reduction, and the practical decision tree: when to appeal, when to accept and just file. Anchored on tribunal precedent rather than just policy.",
    "https://www.ukpropertyaccountants.co.uk/ated-late-filing-penalty-failed-reasonable-excuse-or-special-circumstances-appeal/",
    "expected neighbours: existing `ated-late-filing-penalties-mechanics` (the penalty side; this is the appeal side), existing `hmrc-penalties-late-landlord-tax-returns-2026` (cross-tax appeals), A5 (amendment, related).",
    "none obvious; Stage 2 to validate.",
    "ATED"))

BRIEFS.append(("ated-six-step-compliance-walkthrough-uk-non-natural-persons", "A", "property-types-and-specialist-tax", "ATED (Annual Tax on Enveloped Dwellings)",
    "Process-walkthrough page (six steps: chargeable-person check, dwelling valuation, return preparation, payment by 30 April, relief claim if applicable, ongoing-year monitoring). HowTo schema candidate (flag in work-log; orchestrator decides). Designed for the first-time filer who has just become aware of ATED (typical scenario: company purchases a 700k flat as director housing, year 1 ATED return due). Distinct from A1 (strategic positioning) by being step-by-step; distinct from A5 (amendment) by being first-filing only.",
    "https://uklandlordtax.co.uk/tax-guide/annual-tax-on-enveloped-dwellings-ated/",
    "expected neighbours: A1 (overview), A5 (amendment, for after the first filing), existing `ated-complete-guide-2026-27`, existing `buy-to-let-limited-company-complete-guide-uk`.",
    "none obvious; Stage 2 to validate.",
    "ATED"))

# Session B - MTD ITSA
BRIEFS.append(("mtd-itsa-qualifying-income-test-gross-vs-net", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "The gross-vs-net qualifying-income mechanic from section 19.2. The question landlords actually ask: 'my rental income is 52k but my net profit is 8k, am I in?' Answer: yes, gross is the test. Worked examples by persona (net-low / gross-high landlord, mixed self-employment + rental, multi-property net-low after S24 finance costs). Distinct from existing `mtd-rental-income-threshold-exemptions` (which covers exemption categories) by being the mechanic at the threshold boundary itself.",
    "https://www.ukpropertyaccountants.co.uk/what-is-qualifying-income-for-mtd/",
    "expected neighbours: existing `mtd-rental-income-threshold-exemptions`, existing `mtd-quarterly-reporting-landlords-step-by-step-guide`, existing `how-to-register-mtd-landlord-step-by-step-guide`, B8 (overview, sibling).",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-accidental-landlords-do-i-need-to-file-digitally", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "Persona-driven page for the accidental landlord (someone who inherited a property, kept it let; or moved abroad and rents out the former home; or has a single high-value let from a relationship breakdown). Critical mechanic: a single 55k-gross inherited London flat puts the otherwise-PAYE-only landlord into MTD ITSA from April 2026. Covers the persona typical setup (no accountant, light bookkeeping, surprise at HMRC outreach letter), what they need to do, software pick (cheap end of HMRC list). Distinct framing from the comprehensive-landlord pages because the reader does not see themselves as a landlord.",
    "https://www.ukpropertyaccountants.co.uk/accidental-landlords-mtd-do-you-also-need-to-file-digitally/",
    "expected neighbours: existing `mtd-rental-income-threshold-exemptions`, existing `inheriting-uk-rental-property-executors-step-by-step` (Wave 2 sibling, persona overlap), existing `how-to-register-mtd-landlord-step-by-step-guide`, B1 (gross-vs-net mechanic).",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-jointly-owned-property-threshold-split", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "The section 19.4 joint-ownership mechanic. Spouses owning jointly with 100k gross test 50k each (default 50/50); a Form 17 75/25 election puts the higher-share spouse in earlier. Worked examples: husband-wife BTL boundary case, three-friends-buying-together non-spousal joint tenancy, tenants-in-common with declared unequal shares. Distinct from existing single-ownership pages by handling the threshold-test mechanic that competitor coverage tends to assume away.",
    "https://www.ukpropertyaccountants.co.uk/mtd-made-simple-for-landlords-with-jointly-owned-properties/",
    "expected neighbours: existing `mtd-rental-income-threshold-exemptions`, existing `section-24-joint-property-ownership-tax-split` (closest existing on joint-ownership mechanics, cross-bucket lateral), B1 (gross-vs-net), `how-to-switch-self-assessment-mtd-property-income`.",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-exit-rule-income-drops-three-year-test", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "The section 19.5 exit mechanic. Three consecutive tax years below threshold permits exit; the landlord notifies HMRC and is removed from MTD obligations. Covers when this applies (FHL former owners who downsized, landlords who sold properties to reduce exposure, retirement-cycle landlords running off the portfolio), the notification mechanic, the re-entry rule if income rises again. Distinct from registration pages by being the deregistration mechanic.",
    "https://www.ukpropertyaccountants.co.uk/heres-how-you-can-exit-mtd-if-your-income-falls/",
    "expected neighbours: existing `mtd-rental-income-threshold-exemptions`, existing `how-to-switch-self-assessment-mtd-property-income` (switching how-to, related), existing `property-investment-exit-strategy-planning-guide` (cross-bucket lateral on exit theming).",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-vs-limited-company-cohort-different-rules", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "Comparison page between the MTD ITSA cohort (sole trader / landlord, in scope from April 2026) and the limited company cohort (outside MTD ITSA entirely, on annual CT600 cycle). Critical bridging page because the incorporation question for a landlord ('should I move my BTL into a Ltd Co?') now has an MTD compliance dimension as well as the tax-rate dimension. Covers what stays the same (digital record-keeping best practice), what is different (annual vs quarterly cycle, deadline pattern, software pick). Bridges the MTD bucket and the incorporation cluster.",
    "https://www.ukpropertyaccountants.co.uk/how-making-tax-digital-affects-limited-companies/",
    "expected neighbours: existing `landlord-incorporation-step-by-step-guide-uk`, existing `buy-to-let-limited-company-complete-guide-uk`, existing `corporation-tax-rates-property-companies-2026-27`, B8 (overview, sibling), B1 (mechanic).",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-letter-from-hmrc-what-to-do-next", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "Action-oriented process page for landlords who receive the HMRC pre-mandate outreach letter. The letter is not an assessment; it is an information notice that you appear in scope. Covers the recipient options (verify, register, get software, claim exemption if applicable, dispute the scope determination), the timeline pressure (typically 3-6 months before mandate date), and the cost of inaction (mandate becomes effective whether or not the recipient responded). Distinct framing: this is the 'I just got a letter' page, not the 'I am planning ahead' page.",
    "https://www.ukpropertyaccountants.co.uk/received-hmrcs-mtd-letter-mtd-compliance-for-landlords/",
    "expected neighbours: existing `how-to-register-mtd-landlord-step-by-step-guide`, existing `mtd-penalties-landlords-miss-deadline`, B1 (gross-vs-net, often the verification question), B9 (pilot for early opt-in alternative).",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "Side-by-side comparison: current annual self-assessment cycle vs MTD quarterly + EoPS + final declaration cycle. Covers what changes operationally (5 submissions per year, not 1), what stays the same (the final declaration substitutes for SA100; tax liability is still annual; payment dates 31 January and 31 July preserve), and the common misconceptions (no, you do not pay tax quarterly; no, quarterly updates are not estimates of tax due). Distinct from existing `how-to-switch-self-assessment-mtd-property-income` (which is a switching how-to) by being a comparison reference.",
    "https://www.ukpropertyaccountants.co.uk/making-tax-digital-major-self-assessment-overhaul-ahead/",
    "expected neighbours: existing `how-to-switch-self-assessment-mtd-property-income`, existing `mtd-quarterly-deadlines-2026-2027-landlords`, B8 (overview), existing `how-to-register-mtd-landlord-step-by-step-guide`.",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-overview-six-changes-residential-landlords", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "Bucket pillar covering the six headline changes residential landlords face: (1) digital record-keeping required, (2) quarterly updates replace single SA filing, (3) EoPS + final declaration close the year, (4) software list mandates HMRC-recognised products, (5) phased threshold 50k / 30k / 20k, (6) new penalty regime with Spring Statement 2025 doubled late-payment rates. Anchors the bucket. **Cannibalisation note (manager-flagged):** partial overlap with existing `mtd-quarterly-reporting-landlords-step-by-step-guide` (score 0.29). This page is deliberately scoped as 'what changes' overview, leaving the existing page as the process detail. Stage 2 must hold this scope line.",
    "https://www.ukpropertyaccountants.co.uk/mtd-explained-for-residential-landlords-what-changes-and-when/",
    "expected neighbours: existing `mtd-quarterly-reporting-landlords-step-by-step-guide` (CANNIBAL-WATCH; see framing), existing `how-to-register-mtd-landlord-step-by-step-guide`, B7 (SA vs MTD comparison), B10 (policy history), all sibling B briefs.",
    "none obvious; Stage 2 to validate the partial-overlap question carefully against `mtd-quarterly-reporting-landlords-step-by-step-guide`.",
    "MTD"))

BRIEFS.append(("mtd-itsa-pilot-trial-volunteer-2025-26-experience", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "Voluntary opt-in cohort page (section 19.5). Real-world signal from 2025/26 pilot participants for landlords considering early-mover testing. Covers what the pilot captures (full MTD cycle for a tax year before mandate), the practical benefits (software learning, error-finding without late-filing risk), the practical risks (committed to the cycle once in), and the persona who genuinely benefits (slightly-over-50k landlord who would be in at mandate anyway and wants the trial year). Distinct from mandate pages by being the opt-in mechanic.",
    "https://www.ukpropertyaccountants.co.uk/what-you-need-to-know-about-hmrcs-mtd-trial/",
    "expected neighbours: existing `how-to-register-mtd-landlord-step-by-step-guide`, B6 (HMRC letter, the alternative path), B8 (overview), existing `best-mtd-software-landlords-2026`.",
    "none obvious; Stage 2 to validate.",
    "MTD"))

BRIEFS.append(("mtd-itsa-major-tax-reform-context-policy-history", "B", "making-tax-digital-mtd", "MTD for ITSA",
    "Policy history page. Covers the original 2018 MTD design (10k threshold for all), the 2022 review and December 2022 phased schedule announcement, the Spring Statement 2025 penalty doubling, and the broader context (MTD started with VAT in 2019, ITSA next, CT later, the whole regime is a digital-by-default tax administration transformation). For readers asking 'why is this happening' rather than 'what do I have to do'. **Cannibalisation note (manager-flagged, partial-overlap candidate score 0.38):** judged net-new because existing `how-to-register-mtd-landlord-step-by-step-guide` is a how-to, this is policy history. The framing differentiator (why-this-matters context, not how-to-register) is the cannibalisation defence.",
    "https://www.ukpropertyaccountants.co.uk/making-tax-digital-mtd-the-uks-major-tax-reform/",
    "expected neighbours: existing `how-to-register-mtd-landlord-step-by-step-guide` (CANNIBAL-WATCH; see framing - this is the partial-overlap candidate at 0.38), B8 (overview, sibling), existing `mtd-quarterly-deadlines-2026-2027-landlords` (timeline lateral).",
    "none obvious; Stage 2 to validate the cannibalisation question deliberately. This is the partial-overlap brief manager flagged.",
    "MTD"))

# Session C - RRA 2025 + Tenancies
BRIEFS.append(("rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Operational compliance and defence page for landlords facing or anticipating enforcement action under the Renters Rights Act 2025. The Act extends the civil-penalty regime introduced by the Housing and Planning Act 2016 (financial penalties up to 30,000 GBP, banning orders, rogue-landlord database entry) into the new RRA-2025 obligations: PRS database non-registration, PRS Ombudsman non-enrolment, Decent Homes Standard breaches, unlawful possession attempts during the Section 21 transition. Covers the local-authority enforcement process, representations + FTT-PC appeal routes, the practical compliance checklist that reduces enforcement risk, and the firm's defence angle for landlords post-notice. Distinct from C6 (PRS Database + Ombudsman REGISTRATION mechanics) by being post-breach not pre-enrolment; distinct from C5 (Decent Homes COMPLIANCE) by covering the enforcement layer above specific obligations. High-intent commercial moment. **Manager swap-in note 2026-05-22:** this brief replaces the original C1 `renters-rights-act-2025-tax-implications-comprehensive-update`, which was reframed as a rewrite of the existing `renters-rights-act-2026-tax-implications-landlords` page (legacy-rebuild track, not Wave 3 net-new) given that page's citation staleness.",
    "https://www.gov.uk/government/publications/civil-penalties-under-the-housing-and-planning-act-2016",
    "expected neighbours: existing `hmrc-penalties-late-landlord-tax-returns-2026` (tax-side penalty contrast), existing `penalties-not-declaring-rental-income-hmrc` (HMRC tax penalty contrast), C5 (Decent Homes), C6 (PRS database registration). Grep confirmed 2026-05-22 no existing dedicated civil-penalty / banning-order / rogue-landlord-database page.",
    "none obvious; Stage 2 to validate against the 429-redirect catalogue.",
    "RRA"))

BRIEFS.append(("section-21-abolition-uk-landlord-possession-guide-2026", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Operational possession-process page post-Section 21 abolition. Covers the reformed Section 8 grounds (rent arrears, anti-social behaviour, landlord-sale, landlord-occupation), the 12-month re-letting restriction after landlord-sale / landlord-occupation possession (section 20.2), the new tenant-notice rights, and the practical workflow: notice, response, court application, possession order. Anchored on the landlord possession workflow not the legislative theory. Distinct from C1 (strategic pillar) by being operational.",
    "https://www.ukpropertyaccountants.co.uk/documents-needed-for-renters-rights-act-possession-claim/",
    "expected neighbours: C1 (post-RRA pillar), C9 (sale-route lateral), existing `renters-rights-act-2026-tax-implications-landlords` (background), existing `rental-income-tax-uk-complete-guide-landlords`.",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("periodic-tenancy-default-ast-conversion-mechanics", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Mechanic page for the periodic-from-grant default (section 20.3). All new assured tenancies are periodic; existing fixed-term ASTs convert at commencement of the relevant Part. Covers the conversion mechanic, the practical implications (no more 6-12 month fixed-term lock-in, monthly default rent period, the impact on lender mortgage conditions that historically required AST), and the transitional pattern for tenancies in flight at commencement. Distinct from possession (C2) and rent (C4) by being structural tenancy form.",
    "https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-periodic-tenancy/",
    "expected neighbours: C1 (pillar), C8 (tenancy-agreement clauses, related), existing `rental-income-tax-uk-complete-guide-landlords`, existing `landlord-insurance-tax-deductible` (lateral on mortgage and insurance implications).",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("renters-rights-act-rent-increase-section-13-tribunal-route", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Rent-increase mechanics page (section 20.6). Section 13 is the only route; once per 12-month period; 2 months notice; tenant-tribunal challenge at FTT-Property Chamber. The tribunal cannot now set rent above the landlord proposed amount (the procedural tweak that protects tenants from challenge backfiring). Covers the workflow: notice, tenant response options, tribunal application route, market-rent evidence requirements. Practical for landlords managing index-linked rent rises against the 12-month cap.",
    "https://www.ukpropertyaccountants.co.uk/new-rent-increase-rules-under-the-renters-rights-act/",
    "expected neighbours: C1 (pillar), C10 (asking-rent / bidding-wars, pre-tenancy sibling), existing `rental-income-tax-uk-complete-guide-landlords`, existing `claim-mortgage-interest-rental-property-uk-section-24` (interaction: S24 + capped rent rises).",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("decent-homes-standard-prs-landlord-compliance-checklist", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Compliance-checklist page for the Decent Homes Standard extension to PRS (section 20.4). Covers the four-pronged standard (HHSRS Category 1 hazards, repair, modern facilities, thermal comfort), the local-authority enforcement route, the Rent Repayment Order consequence for non-compliance, and the practical: what work needs doing now if the landlord wants to be ready for enforcement (EPC bands, modern heating, mould remediation, kitchen / bathroom condition). Distinct from possession / rent pages by being a property-condition compliance angle. Tax lateral: Decent Homes spend splits between revenue-deductible repairs and capital improvements (CGT base cost).",
    "https://www.ukpropertyaccountants.co.uk/renters-rights-bill-key-impact-on-tenants-landlords/",
    "expected neighbours: C1 (pillar), existing `pre-letting-expenses-landlord-claim-before-first-tenant` (lateral on improvement vs repair classification), existing `claim-mortgage-interest-rental-property-uk-section-24`, existing `rental-income-tax-uk-complete-guide-landlords`.",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("prs-database-landlord-ombudsman-registration-requirements", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Registration mechanics page for the PRS Database + PRS Ombudsman (section 20.5). Covers the database registration workflow (landlord ID, property addresses, compliance evidence: gas safety, EICR, EPC, Right to Rent, deposit protection), the Ombudsman subscription mechanic, the 40,000 civil penalty for operating outside, and the banning-order regime for repeat offenders. Practical for landlords getting ready for the registration commencement window. Tax lateral: registration + Ombudsman subscription fees deductible as professional expenses of the rental business.",
    "https://www.ukpropertyaccountants.co.uk/renters-rights-bill-impact-landlords-consider-selling-properties/",
    "expected neighbours: C1 (pillar), C2 (possession, some database compliance is precondition to possession), existing `non-resident-landlord-scheme-uk-complete-guide` (NRL is the other landlord registration regime, lateral).",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("pet-rights-tenancy-landlord-refusal-reasonable-grounds", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Operational page on pet rights (section 20.7). Statutory right to request, reasonable-refusal test, pet damage insurance as consent condition, tribunal route on refusal disputes. Covers what counts as reasonable refusal (superior landlord prohibition; building insurance constraint; layout / size unsuitability), what does not (general dislike of pets; risk-of-damage fears without specific property reason), and the practical decision tree. Tax lateral: pet damage insurance premium is deductible against rental income where required as a consent condition (section 20.11).",
    "https://www.ukpropertyaccountants.co.uk/renters-rights-bill-key-impact-on-tenants-landlords/",
    "expected neighbours: C1 (pillar), C8 (tenancy-agreement clauses), existing `landlord-insurance-tax-deductible` (specific lateral on insurance deductibility), existing `rental-income-tax-uk-complete-guide-landlords`.",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("tenancy-agreement-template-rra-2025-compliant-clauses", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Clause-level tenancy agreement page post-RRA-2025. Covers which old AST clauses are now unenforceable (rent-review clauses, Section 21 notice-to-quit clauses, fixed-term break clauses requiring tenant notice), which new clauses to add (rent-period definition consistent with periodic default, pet damage insurance condition, compliance with database registration), and which clauses stay neutral. Practical for landlords updating their template library. Distinct from C2 (possession) and C3 (periodic mechanic) by being clause-level rather than tenancy-form-level.",
    "https://www.ukpropertyaccountants.co.uk/tenancy-agreements-a-guide-for-landlords/",
    "expected neighbours: C1 (pillar), C3 (periodic mechanic), C7 (pet clauses), C4 (rent-increase clauses), existing `rental-income-tax-uk-complete-guide-landlords`.",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("landlords-considering-selling-portfolio-rra-2025-tax-implications", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "The firm commercial-positioning angle: landlords selling portfolios in response to RRA-2025. Covers the CGT implications (residential 18% / 24% from 30 October 2024, 60-day reporting), the Section 24 squeeze that is pushing the disposal decision, the anti-forestalling considerations for any remaining FHL-route disposals, the landlord-sale possession ground (RRA s.6 area, 12-month re-let restriction). The tax-led angle competitor pages do not cover (they focus on legal-services). Strong lead-gen page for the firm portfolio-exit-planning advisory.",
    "https://www.ukpropertyaccountants.co.uk/renters-rights-bill-impact-landlords-consider-selling-properties/",
    "expected neighbours: existing `property-investment-exit-strategy-planning-guide`, existing `capital-gains-tax-selling-rental-property-uk`, existing `cgt-rates-property-2026-27-current-rates-explained`, existing `claim-mortgage-interest-rental-property-uk-section-24`, C1 (pillar), C2 (possession route for vacant-sale).",
    "none obvious; Stage 2 to validate.",
    "RRA"))

BRIEFS.append(("bidding-wars-asking-rent-cap-landlord-marketing-compliance", "C", "landlord-tax-essentials", "Renters Rights Act 2025 + Tenancies",
    "Pre-tenancy marketing-compliance page (section 20.8). Landlords and letting agents cannot invite or accept offers above the advertised rent; cannot demand advance rent beyond the first month. Covers the workflow change (one advertised rent, no upward negotiation), the penalty regime, the interaction with the letting-agent instruction (who is liable if the agent solicits a higher offer behind the landlord back), and the practical impact in high-demand markets where the historic practice of accepting higher offers was norm. Distinct from C4 (post-tenancy rent rises) by being pre-tenancy marketing.",
    "https://www.ukpropertyaccountants.co.uk/new-rent-increase-rules-under-the-renters-rights-act/",
    "expected neighbours: C4 (post-tenancy rent rises, sibling), C1 (pillar), existing `rental-yield-vs-roi-property-investors-uk` (lateral on yield-from-rent vs yield-from-asking-rent), existing `rental-income-tax-uk-complete-guide-landlords`.",
    "none obvious; Stage 2 to validate.",
    "RRA"))


def main():
    written = []
    for tup in BRIEFS:
        slug, session, category, bucket, framing, competitor, hint, redirect, bucket_key = tup
        content = make_brief(slug, session, category, bucket, framing, competitor, hint, redirect, bucket_key)
        p = BRIEFS_DIR / (slug + ".md")
        p.write_text(content, encoding="utf-8")
        written.append(p)
    print("Wrote", len(written), "briefs")
    em_total = 0
    for p in written:
        t = p.read_text(encoding="utf-8")
        n = t.count(chr(0x2014))  # em-dash
        if n:
            em_total += n
            print("  EM:", p.name, n)
    print("Em-dashes total:", em_total)


if __name__ == "__main__":
    main()