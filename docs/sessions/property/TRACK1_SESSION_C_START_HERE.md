# Property Track 1 — Session C — start here

**You are Session C.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is fixed — Sessions B and C have their own pre-assigned lists.

This is NOT the priority-rewrite work from 2026-05-21. That's done and deployed. This is Track 1 — writing pages that don't exist yet, based on competitor gap analysis.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-track1-c/` on branch `property-track1-c`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions B and C are in their own worktrees on their own branches; you will never collide on `.next/` or mid-edit YAML.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/house_positions.md`** — the LOCKED factual positions for SDLT, ATED, MTD, S24, CGT, FHL, 2027 surcharge, LTA-replaced, IHT, DTAs, Companies House, RRA. **Read this fully once at the start of your session.** It is the tie-breaker when competitor sources disagree. If a competitor contradicts a house position, the house position wins and you flag the conflict.
3. **`docs/network_state_and_handover_2026-05-21.md`** — context for what Track 1 is and where it sits in the bigger plan. Skim only.
4. **`docs/competitor_rewrite_playbook.md`** — system-wide methodology reference. Skim only.
5. **Your assigned briefs** at `briefs/property/track1/<slug>.md`. Each brief is a research package — inputs only, no prescribed outline.
6. **`docs/property/track1_page_tracker.md`** — master tracker. Your assigned pages are in the "Session C pages" table.

## Per-page workflow

For each page in your assignment (one at a time):

1. **Claim the page** in `docs/property/track1_page_tracker.md` — change `⬜ todo` to `🟡 in_progress`, add a UTC timestamp at claim time. Save the file.
2. **Read the brief** at `briefs/property/track1/<slug>.md`. Pay close attention to:
   - **Framing differentiator** — defines what makes this page distinct from siblings in the same bucket
   - **Closest existing pages** — what we already have on related topics (cannibalisation discipline)
   - **Redirect overlap** — if any, the exact middleware.ts edit you apply on launch
   - **Authority links** worth considering for the bucket
3. **Fetch each competitor URL listed in the brief** using `httpx` + `BeautifulSoup`. Read what they actually have. Decide what you'll do better, differently, or where you'll go deeper.
4. **Read the closest-existing pages on our site** (paths in the brief). Decide whether your new page is the applied/scenario version (link out to existing pillar) or vice versa.
5. **Plan the page** before writing. Decide:
   - H2/H3 outline (vary it per page — do NOT pattern-match siblings)
   - meta title (lead with the primary query word order, <62 chars)
   - meta description (<158 chars)
   - 10-14 FAQs covering competitor patterns + segment qualifiers + house-position clarifications
   - inline `<aside>` CTA placements (1-3 per page; styling is global CSS — you write `<aside><p>headline</p><p>body</p></aside>` without classes)
   - cannibalisation handling
6. **Verify factual claims** against authorities (HMRC manuals, legislation.gov.uk, gov.uk). House positions doc is the tie-breaker.
7. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. See brief for required frontmatter fields.
8. **If your brief lists a redirect overlap and your new page is a more specific fit:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log the decision in the brief's work-log.
9. **Build** from the worktree root: `cd Property/web && npm run build`. Must pass clean.
10. **Verify:**
    - FAQ schema count matches frontmatter: `grep -c '"@type":"Question"' Property/web/.next/server/app/blog/<category>/<slug>.html` equals your `faqs:` array length
    - Zero em-dashes: `grep -c "—" Property/web/content/blog/<slug>.md` returns 0
    - Zero Tailwind classes: `grep -cE 'class="[a-z]' Property/web/content/blog/<slug>.md` returns 0
11. **Fill in the per-page work-log** at the bottom of the brief. URLs you fetched, decisions you made, citations added, internal links, build status. Supports resumability if you're interrupted mid-page.
12. **Mark done** in `docs/property/track1_page_tracker.md`: `🟡 in_progress` → `✅ done`, 1-line Notes summary.
13. **Flag** any site-wide issues to `docs/property/track1_site_wide_flags.md` (append-only). Never pause; flag and continue.
14. **Next page** — claim ONE more page (top of your list). Repeat.

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names unless quoting publicly available policy.

### Lead-gen architecture (styling is global, placement is yours)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the LeadForm at the bottom of every post. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald accent on emerald-50 background. **You add no classes** — just `<aside><p>headline</p><p>body</p></aside>`.
- 1-3 inline asides per page at conversion moments. Avoid opening with an aside; avoid asides inside worked examples.
- Lead-form role segments: Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer. Cover each segment's perspective in FAQs where relevant.

### CSS in markdown
- **Tailwind utility classes do NOT work in markdown body content** (Tailwind v4 scans `src/**` only).
- Semantic HTML only: `<aside>`, `<table>`, `<ul>`, `<strong>`, `<table><thead><tr><th>`. No classes.

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array (`question` + `answer`).
- The template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd` in `Property/web/src/lib/schema.ts`. **Do NOT manually add FAQ schema in body content.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.
- If your topic genuinely suits HowTo schema (step-by-step process), flag it in your work-log and the orchestrator will assess whether to add HowTo schema in the template.

### Cannibalisation
- Read the "Closest existing pages" section in your brief before writing. Decide whether yours is the applied/scenario version (link out to the existing pillar) or the deeper version.
- Do not duplicate worked numerical examples verbatim across pages. Differ figures, scenarios, or angles.

### Anti-templating (critical for Track 1)
- Every brief has a **Framing differentiator**. Write to it. Don't write a generic "complete guide" template.
- Vary your H2 structure per page. SDLT mechanics pages and SDLT case-law pages should NOT have the same outline.
- Vary your opening 2-3 sentences. Don't start every page with "Many landlords ask about...".
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.
- If you notice yourself reaching for a phrase you used on the previous page, stop and rewrite.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). **Do not aim for a word count** — aim to cover the topic per the framing differentiator. Word count falls out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list in the brief (plus others you find).
- Build clean.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes; zero Tailwind classes.
- Internal links to relevant pillar pages from your "Closest existing pages" list.

## What to handle yourself vs flag

**Handle yourself** (no orchestrator input needed):
- Em-dash removals; Tailwind class avoidance; FAQ count discipline (10-14).
- Adding HMRC / legislation.gov.uk / gov.uk citations.
- Adding inline `<aside>` CTAs at sensible conversion moments.
- Cannibalisation handling via differentiation + linking out to closest-existing.
- Factual statements that match the house positions doc.
- Slug invention if your assigned slug genuinely doesn't fit (log override in work-log).

**Flag to `docs/property/track1_site_wide_flags.md`** (append-only; never pause):
- Competitor source contradicts a house position → `HOUSE_POSITION_CONFLICT`.
- Two of your Track 1 siblings turn out to overlap → `CANNIBAL`.
- An existing Property page should be UPDATED to link to your new page → `INTERNAL_LINK`.
- A non-default schema type (HowTo, Course) would add SERP value → `SCHEMA`.
- Redirect repointing action you took (or chose not to take) → `REDIRECT`.
- Anything requiring a brand or business-model decision → `POSITIONING`.

**Stop and ask** (only in extreme cases):
- Build failures on baseline before your changes (would make rewriting unsafe).
- Security vulnerability that should not wait for a flag entry to be read.
- Otherwise: never pause. Flag and continue.

## Your Session C pages (13 assigned — VAT + FIC + ATED)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug | Bucket |
|---|---|---|
| C1 | domestic-reverse-charge-construction-vat-landlords | VAT |
| C2 | toms-vat-serviced-accommodation | VAT |
| C3 | vat-on-new-builds-residential-property | VAT |
| C4 | togc-vat-property-letting-business | VAT |
| C5 | diy-housebuilders-vat-refund-scheme | VAT |
| C6 | fic-complete-guide-property-wealth-transfer | FIC (PARTIAL OVERLAP — read brief) |
| C7 | fic-vs-discretionary-trust-property-comparison | FIC |
| C8 | fic-growth-shares-and-freezer-shares-design | FIC |
| C9 | fic-iht-treatment-bpr-myth | FIC |
| C10 | ated-complete-guide-2026-27 | ATED (PILLAR) |
| C11 | ated-rental-property-relief-mechanics | ATED |
| C12 | ated-15-percent-flat-rate-sdlt-interaction | ATED |
| C13 | ated-late-filing-penalties-mechanics | ATED |

**Multi-bucket discipline:** You span three buckets — VAT, FIC, and ATED. Each is a distinct topic family. The cross-bucket variation will help naturally; within a bucket, each brief's framing differentiator is what protects against templating. Honour them.

**C6 partial-overlap note:** `fic-complete-guide-property-wealth-transfer` is a known partial overlap with our existing `/blog/incorporation-and-company-structures/family-investment-company-property-worth-it`. The existing page is decision-focused ("should I?"). Your new page is the comprehensive reference. Cross-link bidirectionally; consider whether the existing page needs an update to its "Related" links section (raise as `INTERNAL_LINK` flag if so).

**C10 pillar status:** `ated-complete-guide-2026-27` is the new ATED pillar. C11, C12, C13 are ATED daughters — they should link back to C10. Write C10 first if you can.

## When you're done with all 13

Update the summary at the top of `docs/property/track1_page_tracker.md` and append a `[SESSION_C_COMPLETE]` paragraph to `docs/property/track1_site_wide_flags.md`. Then stop.

Begin with C1 (`domestic-reverse-charge-construction-vat-landlords`) — but if you'd rather write C10 (ATED pillar) first so C11-C13 can link back to it, that's also fine. Log your sequence choice in the first brief's work-log.
