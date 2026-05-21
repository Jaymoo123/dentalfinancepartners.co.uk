# Competitor analysis → per-page rewrite playbook

Last updated: 2026-05-21.

This document captures the end-to-end workflow we built for taking pages from "ranking somewhere but not converting" to "best-in-class for their query". It is the reference for repeating the process on Property's remaining pages and rolling it out to dentists / medical / solicitors / generalist / agency / contractors-ir35.

---

## 1. What we built

### Pipeline (DeepSeek-driven analysis)

`optimisation_engine/competitor/` — runs end-to-end for any site_key:

1. **`serp_runner.py`** — for every page in `gsc_query_data` with impressions in the last 28 days, picks the highest-impressions query as the page's "primary query", fetches the top N organic competitors via DuckDuckGo (`ddg_serp_client`), and stores them in `competitor_serps` + `competitor_pages`.
2. **`page_parser.py`** — fetches our page + each competitor page (with SSRF blocking, robots.txt compliance, content-relevance filtering), extracts 14 categories of text-level signals (sections, FAQs, schema, E-E-A-T, CTAs, layout), stores in `page_content_map`.
3. **`gap_analyser.py`** — computes quantitative gaps (word count / section count / FAQ count deltas) and calls DeepSeek to identify content gaps (`topic_gaps`, `query_gaps`, `structural_gaps`, `eeat_gaps`). Writes to `competitor_gap_reports`.
4. **`brief_generator.py`** — calls DeepSeek again to turn each gap report into a specific actionable improvement brief (typically 4-8 KB of markdown per page). Stored in `competitor_gap_reports.improvement_brief`.

**Total DeepSeek cost for property's 93 pages:** ~$0.11. Cheap research, not cheap writing.

### Handover (Claude Opus 4.7-driven implementation)

`optimisation_engine/competitor/brief_for_opus.py` — generates a self-contained markdown brief per page (`briefs/<site>/<slug>.md`) that a fresh Claude Opus session can pick up and execute end-to-end with no preliminary research. Each brief includes:
- Page metadata, GSC query data, competitor URLs
- Full DeepSeek gap report + improvement brief
- Cannibalisation context (pillar pages on the same site)
- Site rules (voice, CSS, lead-gen architecture, schema)
- External authority links to favour
- Workflow steps and report-back format

CLI:
```bash
python -m optimisation_engine.competitor.brief_for_opus --site property --slug <page-slug>
python -m optimisation_engine.competitor.brief_for_opus --site property --top 63
```

---

## 2. Why DeepSeek + Claude split

DeepSeek is fast and cheap for structured analysis at scale. It pattern-matches well, identifies what competitors have that we don't, and produces serviceable briefs. It is **not** the right tool for writing the actual content on a specialist accountancy site where every figure has to be technically accurate and every statute reference real.

Claude Opus 4.7 does the writing:
- Verifies DeepSeek's competitor claims by re-fetching competitor pages
- Cross-references DeepSeek's £ figures and statute citations against authoritative sources
- Writes the actual rewrite with site-specific voice rules applied
- Integrates lead-gen CTAs at conversion moments
- Handles cannibalisation cleanly (writes the applied/local version, not the comprehensive one, when a pillar exists)

The DeepSeek brief is treated as a starting hypothesis. Claude verifies before transcribing.

---

## 3. The reference rewrite: Peterborough BTL accountants

**Source file:** `Property/web/content/blog/peterborough-property-accountant-specialist-tax-services.md`

| Metric | Before | After |
|---|---|---|
| Word count | 1,535 | ~3,400 |
| Sections | 7 H2s | 11 H2s |
| FAQs | 4 | 14 |
| External authority links | 0 | 4 |
| Inline CTAs | 0 | 2 |
| Meta title | Generic ("Property Accountant Peterborough \| Specialist Tax Services") | GSC-query-aligned ("BTL Accountants Peterborough \| Section 24 & Incorporation Help") |
| Meta description | Generic | Specific differentiators + free-call hook |
| Worked example | None | Full 3-property Peterborough portfolio with personal-vs-company comparison maths |
| Comparison table | None | 8-row personal vs limited company table |
| Allowable expenses | Vague mention | 14-item checklist with ITTOIA references |
| Local content | "Peterborough's regeneration projects" (generic) | Article 4 direction, real yields, named neighbourhoods |

**Cannibalisation check:** zero risk. Pillar pages (Section 24 guide, BTL limited company guide, MTD guide, CGT guide) don't currently rank for the "accountants peterborough btl landlords" query class.

**GSC baseline (last 90 days):** 29 impressions, 0 clicks, position 10.2. Pure CTR-fail on page 1. The rewrite addresses both depth (so we can climb past pos 5) and CTR (so the clicks materialise once we're there).

---

## 4. Per-page workflow

For every page in the queue:

### 4.1 Verify
1. Read the source markdown file (path in brief).
2. Read DeepSeek's gap report and improvement brief.
3. **Fetch each competitor URL directly** (`optimisation_engine.competitor._fetch.fetch_url`) and check what they actually have. Verify DeepSeek's specific claims (figures, section structure, FAQ presence) against the real HTML.
4. Pull GSC data for the page (queries already getting impressions, current position, CTR).
5. Check cannibalisation: does any pillar page already rank for the queries this page is targeting? If so, write the applied/local version.

### 4.2 Write
1. **Meta title** — lead with the highest-impression GSC query word order. Include a high-intent differentiator. Stay under 62 characters.
2. **Meta description** — specific (not generic). Include the free consultation hook. Stay under 158 characters.
3. **Body** — restructure to address each DeepSeek topic gap with depth. Add at least one worked numerical example with real figures. Add a comparison table if relevant. Add external authority links (HMRC manuals, legislation.gov.uk, gov.uk).
4. **FAQs** — expand to 10-14 in the frontmatter. Cover: DeepSeek-surfaced gaps + GSC queries with impressions-but-no-clicks + competitor FAQ patterns + lead-form qualifier questions (one per role segment where relevant).
5. **Inline CTAs** — 1-3 `<aside>` blocks at conversion moments (after worked examples, after comparison tables, after the trust-building section). Drive scroll-to-form, do not duplicate the form.

### 4.3 Check
1. Build the site: `cd <web-root> && npm run build`. Must pass with no new warnings.
2. Verify FAQ schema count: `grep -c '"@type":"Question"' .next/server/app/blog/<category>/<slug>.html` should equal the frontmatter `faqs:` array length.
3. Verify all schema types present: BlogPosting, FAQPage, BreadcrumbList, Organization, Person.
4. Confirm zero em-dashes and zero Tailwind utility classes leaked into the markdown.

### 4.4 Report
Report back with the standard summary block from the brief footer (word count before/after, FAQ count, links added, build status, cannibalisation risk, 2-3 sentence summary).

---

## 5. Universal site rules

These are the rules every rewrite must follow. They live in `optimisation_engine/competitor/brief_for_opus.py` as the `UNIVERSAL_RULES` constant and are inlined in every generated brief.

### Voice
- **No em-dashes anywhere.** Em-dashes read as AI-generated. Use commas, parentheses, full stops, or middle dots.
- Brand voice: practical, specific, "no hard sell". Exact figures and named legislation, not vague hedges.
- Anonymised social proof only. Never real client names.

### Lead-gen architecture
- `BlogPostRenderer.tsx` injects a `LeadForm` at the bottom of every post automatically. **Never duplicate this in body content.**
- Add 1-3 inline `<aside>` CTAs at high-intent moments to drive scroll-to-form.
- Content pre-sells the form: worked examples, HMRC citations, local data, anonymised case studies build the trust that converts.
- Match the form's role segments in the content (Property: individual landlord / portfolio owner / large portfolio / property developer).

### CSS in markdown
- **Tailwind utility classes do NOT work in markdown body content.** Tailwind v4 in these projects uses `source("..")` from `src/app/globals.css`, so it scans `src/**` only, not `content/**`.
- Use semantic HTML in markdown: `<aside>`, `<table>`, `<ul>`, `<strong>`.
- The `.prose-blog` rules in `src/app/globals.css` style all of these automatically with the site brand. The `prose-blog aside` rule (emerald accent callout) was added during the Peterborough rewrite — apply the same pattern to other sites if they lack it.
- Inline CTA pattern: `<aside><p>Headline</p><p>Body copy</p></aside>`. No classes.

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array.
- The template auto-emits FAQPage JSON-LD from the frontmatter (via `buildBlogPostingJsonLd` fallback in `src/lib/schema.ts`). **Do not manually add FAQ schema in body content.**
- Article, FAQPage, BreadcrumbList, Organization all auto-emitted.
- Target 10-14 FAQs per page.

### Cannibalisation
- Pillar pages exist for major concepts (Section 24, BTL limited company, MTD, CGT on property). When this page touches one of those, write the **applied / scenario / local** version, not the comprehensive theoretical version. Link out to the pillar.
- Do not duplicate worked examples verbatim across pages. Differ figures, scenarios, or angles.

---

## 6. Known issues in the analysis pipeline

These are bugs in the parser layer that affected the DeepSeek briefs. They do NOT need to be fixed to use the briefs — Claude verifies against reality during the per-page rewrite — but they're worth knowing about and worth fixing before the next site's pipeline run.

### `page_parser.py` bugs to fix

1. **H1 extraction returns empty** because the noise-stripping pass removes the header zone before H1 extraction. Every report shows `query_in_h1: false`.
2. **JSON-LD schema extraction silently fails.** `schema_types` is `[]` on every page even when the live HTML clearly contains Article, FAQPage, BreadcrumbList. The schema parsing path is broken.
3. **FAQ extraction misses `dl/dt/dd` patterns.** The parser looks for `<details>/<summary>` and class-based accordions only. Property's blog template uses `<dl><dt><dd>`, so all our pages report `faqs=0`.
4. **The FAQ JSON-LD fallback is broken too** (consequence of bug 2). So competitor FAQ schema isn't counted either, making all "FAQs 0 vs 0" comparisons wrong.

**Net effect:** topic gaps from DeepSeek (which come from reading the text) are reliable. Structural gaps from DeepSeek (which depend on the parser's counts) are partially unreliable. The brief generator includes explicit warnings about this.

### `_db.py` retry coverage
The retry logic covers 429 (rate limit). It does not cover 503. Hit one 503 during the property run. Worth extending the retry block to cover transient 5xx.

---

## 7. Rolling out to other sites

Order: property (done) → dentists → medical → solicitors → generalist → agency → contractors-ir35.

### Pre-flight per site
1. Confirm GSC data is current in `gsc_query_data` for the site.
2. Confirm `niche.config.json` exists and CTA/lead form config is correct.
3. Confirm `src/app/globals.css` has `.prose-blog aside` rule (add it if missing — see Section 5).
4. Verify the blog template (`src/components/blog/BlogPostRenderer.tsx`) auto-emits FAQPage schema via `buildBlogPostingJsonLd` fallback. Some sites may need the helper wired up.

### Run pipeline
```bash
# Phase 0 discovery (optional, ~15 min)
python -m optimisation_engine.competitor --site <key> --discover --n-queries 15

# Full pipeline (~1-3 hours depending on page count)
python -m optimisation_engine.competitor --site <key> --n-competitors 3
```

### Generate briefs
```bash
python -m optimisation_engine.competitor.brief_for_opus --site <key> --top <N>
```

### Per-site additions to `brief_for_opus.SITE_RULES`
For each new site, add a dict entry with:
- `content_dir` — where markdown blog posts live
- `web_root` — for build commands
- `domain` — for full URL prefixing
- `audience` — for voice context
- `lead_form_segments` — for FAQ targeting
- `pillar_pages` — for cannibalisation checks
- `authority_links` — site-appropriate authority links (HMRC PIM for property; GDC for dentists; CQC/NHS for medical; SRA for solicitors)

---

## 8. Database schema (Supabase)

All tables in the public schema:

- `gsc_query_data` — input. GSC query-level data per page per day.
- `ga4_page_data` — input. GA4 page-level engagement/conversion data per day.
- `competitor_serps` — one row per (site_key, query, fetch_date). Stores our position + competitor URLs.
- `competitor_pages` — one row per competitor URL per SERP. Linked to `page_content_map` after parsing.
- `page_content_map` — one row per page per day. 14 categories of extracted signals.
- `competitor_discovery` — Phase 0 calibration output (DeepSeek analysis of top pages).
- `competitor_gap_reports` — one row per (site_key, our_page_url, primary_query). The full gap analysis + improvement brief.

All upserts use `ON CONFLICT DO UPDATE` for idempotency. Re-running the pipeline on the same day is a no-op.

---

## 9. Files of note

| File | Purpose |
|---|---|
| `optimisation_engine/competitor/__init__.py` | Pipeline entry point |
| `optimisation_engine/competitor/__main__.py` | CLI |
| `optimisation_engine/competitor/_db.py` | Supabase Management API helpers (with 429 retry) |
| `optimisation_engine/competitor/_fetch.py` | SSRF-blocked, robots-respecting HTTP fetcher |
| `optimisation_engine/competitor/discovery.py` | Phase 0 DeepSeek pattern discovery |
| `optimisation_engine/competitor/serp_runner.py` | SERP fetch + competitor URL storage |
| `optimisation_engine/competitor/page_parser.py` | Text-level HTML signal extraction (has known parser bugs, see Section 6) |
| `optimisation_engine/competitor/gap_analyser.py` | Quantitative + DeepSeek content gap analysis |
| `optimisation_engine/competitor/brief_generator.py` | DeepSeek improvement brief generation |
| `optimisation_engine/competitor/brief_for_opus.py` | Per-page handover brief generator for Claude sessions |
| `optimisation_engine/clients/ddg_serp_client.py` | DuckDuckGo SERP client (with bot-detection safety nets) |
| `briefs/<site>/<slug>.md` | Per-page handover briefs (generated, not committed by default) |
| `docs/competitor_rewrite_playbook.md` | This document |

---

## 10. Cost ledger

- **Property pipeline run:** $0.11 (DeepSeek)
- **Per-page Claude rewrite cost:** harder to measure but ~30-60 minutes of Opus 4.7 wall time per page (includes verification, writing, build, check)
- **Per-page DDG fetches:** free, but ~30-40 seconds of soft rate-limited wall time per page during pipeline run

---

## 11. What this is not

- Not a content-volume play. The audience is specialist; the bar is technical accuracy and depth, not throughput.
- Not a programmatic SEO play. Pages are hand-tuned with real local data and verified figures.
- Not a backlink play. Authority is built through HMRC/legislation.gov.uk/gov.uk outbound citations and the per-page depth, not link acquisition.
- Not an automation-end-to-end play. DeepSeek is intentionally only used for analysis. The writing stays with Claude because the cost of a hallucinated statute reference or fabricated £ figure on a specialist accountancy site is much higher than the cost of writing it well.
