# Property Track 1 — Session B — start here

**You are Session B.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is fixed — Sessions B and C have their own pre-assigned lists.

This is NOT the priority-rewrite work from 2026-05-21. That's done and deployed. This is Track 1 — writing pages that don't exist yet, based on competitor gap analysis.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-track1-b/` on branch `property-track1-b`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions B and C are in their own worktrees on their own branches; you will never collide on `.next/` or mid-edit YAML.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/house_positions.md`** — the LOCKED factual positions for SDLT, ATED, MTD, S24, CGT, FHL, 2027 surcharge, LTA-replaced, IHT, DTAs, Companies House, RRA. **Read this fully once at the start of your session.** It is the tie-breaker when competitor sources disagree. If a competitor contradicts a house position, the house position wins and you flag the conflict.
3. **`docs/network_state_and_handover_2026-05-21.md`** — context for what Track 1 is and where it sits in the bigger plan. Skim only.
4. **`docs/competitor_rewrite_playbook.md`** — system-wide methodology reference. Skim only.
5. **Your assigned briefs** at `briefs/property/track1/<slug>.md`. Each brief is a research package — inputs only, no prescribed outline.
6. **`docs/property/track1_page_tracker.md`** — master tracker. Your assigned pages are in the "Session B pages" table.

## Per-page workflow (canonical version in each brief; this is the summary)

Each brief at `briefs/property/track1/<slug>.md` has the canonical 19-step workflow. The summary:

1. Read house positions doc (once at session start).
2. Claim ONE page in tracker (`⬜ todo` → `🟡 in_progress` + UTC timestamp).
3. Read the brief (framing differentiator, closest existing, redirect overlap, authority links).
4. Fetch + read each competitor URL with `httpx` + `BeautifulSoup`.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page — anti-templating).
7. Verify factual claims against authorities.
8. **Fetch hero image from Pexels** via `fetch_image_for_post(query)` (free, attribution required in `imageCredit:` frontmatter).
9. Write the markdown file at `Property/web/content/blog/<slug>.md` (full frontmatter list in brief).
10. Build clean: `cd Property/web && npm run build`.
11. **Six verifications must pass:** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, all internal `/blog/...` links resolve to existing markdown files.
12. Apply redirect repointing in `middleware.ts` if your brief lists a redirect overlap.
13. **Register the new page in `monitored_pages` Supabase table** (snippet in the brief). The regression detector watches new pages once registered.
14. **Commit on your branch** (per-page commit; do NOT merge to main — orchestrator handles).
15. Fill in the per-page work-log at the bottom of the brief.
16. Mark `✅ done` in tracker with 1-line Notes.
17. Append site-wide issues to `docs/property/track1_site_wide_flags.md` (append-only).
18. **Append discoveries** to `docs/property/track1_discovery_log_session_B.md` (append-only) — adjacent topics, calculator ideas, components, existing-page issues, cross-niche links.
19. Next page — claim ONE more.

The brief has the verbatim commands and code snippets. Refer to it for any step's detail.

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
- Build broken by something OUTSIDE your page (sibling session's mid-edit YAML, etc) → `BUILD_BLOCKER` (orchestrator unblocks).
- Page would benefit from a calculator or interactive widget we don't have → `CALCULATOR_IDEA`.
- Competitor uses a UI pattern (comparison-table style, decision matrix, downloadable PDF) we lack → `COMPONENT_IDEA`.
- Topic bridges Property and another niche (Medical / Solicitors etc) → `CROSS_NICHE_LINK`.

**Log to `docs/property/track1_discovery_log_session_B.md`** (append-only; for observations that don't need immediate action but feed future waves):
- Adjacent topics that competitors cover and we don't (not in `topic_gaps_final.md`) → `ADJACENT_TOPIC`
- Calculator / interactive widget ideas → `CALCULATOR_IDEA`
- Competitor UI patterns worth borrowing → `COMPONENT_IDEA`
- EXISTING (non-assigned) pages of ours with stale figures or wrong framings → `EXISTING_PAGE_STALE` (feeds Track 2 sweep)
- Existing pages that should link to your new page (you can suggest these or the orchestrator handles) → `EXISTING_PAGE_LINK_OPPORTUNITY`
- Cross-niche topic-bridges → `CROSS_NICHE_LINK`
- HMRC manuals / legislation / case law our site never cites → `AUTHORITY_GAP`
- SERP features (featured snippets, rich answers, knowledge panels) competitors win → `SERP_FEATURE`
- Questions you couldn't answer with public sources — would need internal data → `INTERNAL_RESEARCH`

**Difference flags vs discoveries:** flags = orchestrator needs to action (cross-session impact); discoveries = observations that compound into future waves (no immediate action). When in doubt, log to discoveries.

**Stop and ask** (only in extreme cases):
- Build failures on baseline before your changes (would make rewriting unsafe).
- Security vulnerability that should not wait for a flag entry to be read.
- Otherwise: never pause. Flag and continue.

### Asking the manager (Q&A channel)

If you genuinely cannot proceed without a manager decision (and the answer is not in your brief, house positions doc, or your own judgement), use the question channel:

- **File:** `docs/property/track1_questions_session_B.md` (append-only; only YOU and the manager write to it)
- **How:** append a question block at the bottom using the template at the top of that file. Mark `STATUS: open`.
- **Polling:** re-read the file periodically. When the manager has answered, the STATUS line on your question flips from `open` to `answered` and the response appears directly below your question.
- **Keep working** on a different page or a different step while you wait, unless the open question genuinely blocks all forward progress.
- Never edit a previous question or answer. Always append.

This channel is for decisions you need. For things you've already actioned, use `track1_site_wide_flags.md`. For observations that don't need action, use the discovery log.

## Your Session B pages (8 assigned — Limited company / BTL operation)

In assignment order. Work top to bottom. Claim ONE at a time.

| # | Slug |
|---|---|
| B1 | director-loan-account-property-company-mechanics |
| B2 | property-company-group-relief-corporation-tax |
| B3 | substantial-shareholding-exemption-property-companies |
| B4 | corporation-tax-marginal-relief-property-companies |
| B5 | transferring-fhl-portfolio-to-limited-company |
| B6 | incorporating-hmo-portfolio-to-limited-company |
| B7 | extracting-money-from-property-limited-company |
| B8 | close-investment-holding-company-property |

**Limited company / BTL operation bucket discipline:** All your pages are limited-company mechanics. Each brief's framing differentiator defines a distinct angle (DLA, group relief, SSE, marginal relief, FHL→Ltd, HMO→Ltd, extraction routes, CIHC). Don't conflate them. Worked examples should use different figures per page.

## When you're done with all 8

Update the summary at the top of `docs/property/track1_page_tracker.md` and append a `[SESSION_B_COMPLETE]` paragraph to `docs/property/track1_site_wide_flags.md`. Then stop.

Begin with B1 (`director-loan-account-property-company-mechanics`).
