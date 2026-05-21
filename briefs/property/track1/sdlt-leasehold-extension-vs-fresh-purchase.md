# Track 1 brief: sdlt-leasehold-extension-vs-fresh-purchase

**Site:** property
**Bucket:** SDLT — surcharges and reliefs
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/sdlt-leasehold-extension-vs-fresh-purchase.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sdlt-leasehold-extension-vs-fresh-purchase

---

## Manager pre-decisions

- **Suggested slug:** `sdlt-leasehold-extension-vs-fresh-purchase`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** SDLT — surcharges and reliefs
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> SDLT on lease extensions: chargeable consideration calculation when the premium plus net present value of rent crosses bands. When statutory lease extensions (Leasehold Reform Acts) interact with SDLT. Why a buy-to-let landlord extending a flat lease may face an unexpected SDLT bill.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt/

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have — outline, FAQs, worked examples, citation density, component patterns. The competitor list is a starting set, not exhaustive — if a competitor URL is poor quality or off-topic, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*No close matches found on our site. This topic is genuinely new for us.*

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response — UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

*No redirect overlap. No middleware changes needed at launch.*


---

## Authority links worth considering for this bucket

- [HMRC SDLT Manual (SDLTM)](https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual)
- [FA 2003 (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2003/14/contents)
- [HMRC SDLT calculator](https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/)
- [HMRC SDLTM00390 — grounds and gardens](https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm00390)
- [FA (No.2) 2024 (MDR abolition)](https://www.legislation.gov.uk/ukpga/2024/12/contents)

You don't have to use all of these; pick the ones that fit your specific framing. Add others you find during research.

---

## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS — you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes** — just `<aside><p>headline</p><p>body</p></aside>`.
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
- **Read `docs/property/house_positions.md` once at the start.** It is the tie-breaker. If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/track1_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count** — aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Track 1 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator** — don't write a generic "complete guide" template.
- Vary your H2 structure per page. SDLT mechanics pages and SDLT case-law pages should NOT have the same outline.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.


---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases).
2. **Claim the page** in `docs/property/track1_page_tracker.md` — change Status `⬜ todo` to `🟡 in_progress`, add today's UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Decide what's worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (paths in the "Closest existing pages" section). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it — don't pattern-match siblings), meta title (lead with the primary query word order, <62 chars), meta description (<158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter: `title`, `slug`, `canonical: https://www.propertytaxpartners.co.uk/blog/<category>/<slug>`, `date: <today>`, `author: 'Property Tax Partners Editorial Team'`, `category: <category>`, `metaTitle`, `metaDescription`, `altText`, `image: ''`, `h1`, `summary`, `schema: ''`, `faqs: [...]`, `dateModified`, `reviewedBy: ICAEW Qualified Senior Reviewer`, `reviewerCredentials: Chartered Accountant (ACA, ICAEW), Property Tax Specialist`, `reviewedAt: <today>`, `editorialNote`.
9. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
10. **Verify:**
    - `grep -c '"@type":"Question"' Property/web/.next/server/app/blog/<category>/<slug>.html` equals your `faqs:` array length
    - `grep -c "—" Property/web/content/blog/<slug>.md` is 0
    - `grep -cE 'class="[a-z]' Property/web/content/blog/<slug>.md` is 0
11. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page (changes are in the brief; apply them precisely).
12. **Fill in the per-page work-log** at the bottom of this brief (URLs fetched, decisions made, citations added, internal links, build status, flags).
13. **Mark done** in `docs/property/track1_page_tracker.md` (`🟡 in_progress` to `✅ done`) with a 1-line Notes summary.
14. **Append any site-wide flags** to `docs/property/track1_site_wide_flags.md` (append-only). Do not pause; flag and continue.
15. **Next page** — claim ONE more page (the one above the current bottom of your assigned list), repeat.


---

## Per-page work-log (fill in as you go — supports resumability if interrupted)

### Decisions
- **Final slug:** <unchanged from assignment, OR explain override>
- **Final category:** <unchanged from assignment, OR explain override>
- **H1 chosen:** <text>
- **Meta title chosen:** <text>
- **Why these vs other options:** <1-2 lines>

### Competitor URLs fetched
- <URL> — <key takeaway in 1 line>
- <URL> — <key takeaway>
- <URL> — <key takeaway>

### Existing-page review (from "Closest existing pages")
- `<our-slug>` — <how does it overlap? are you writing the applied/local version?>
- `<our-slug>` — <as above>

### Citations added (external authority)
- <citation 1>
- <citation 2>
- <citation 3>
- <citation 4>

### Internal links added (to our existing pages)
- `/blog/<category>/<slug>` — <why>
- `/blog/<category>/<slug>` — <why>

### Inline CTA placements
- After section "<H2 name>" — <reasoning>
- After section "<H2 name>" — <reasoning>

### Build attempts
- Attempt 1 — <pass / fail + reason>
- Attempt 2 (if needed) — <pass / fail>

### Verification
- FAQ schema count in built HTML matches frontmatter: <yes / no>
- Em-dashes in markdown: <0 / fixed>
- Tailwind classes in markdown: <0 / fixed>

### Flags raised to track1_site_wide_flags.md
- <none / one-line summary of each flag>

### 2-3 sentence summary
<freeform>

