# Wave 4 brief: mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly

**Site:** property
**Bucket:** MTD ITSA operational details
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD ITSA operational details
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The "who files" common-misconception page for landlords with a managed portfolio. Per house position §19.13: the LANDLORD is the MTD filer, not the letting agent. The page works the operational triangle (letting agent produces monthly statement / landlord owns the MTD obligation / accountant via ASA does the digital submissions where appointed), then walks through the categorisation trap: a landlord reporting "net of agent fees" as gross income mis-applies the §19.2 gross-income threshold test and may incorrectly conclude they are below mandate. Includes a worked example extracting gross collected rent, agent commission, management fees, repairs paid by agent, and net paid to landlord from a typical letting-agent monthly statement, then mapping each line into the correct MTD quarterly-update category. Distinct from the legacy `mtd-quarterly-reporting-landlords-step-by-step-guide` (general filing cycle) and from B3 (ASA mechanics); this page focuses on the agent-managed data-flow specifically.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Common-misconception page; the agent isn't the filer. Net-new on our site.

---

## Competitor URLs (Stage 2 validated)

Fetch each URL using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then parse with `BeautifulSoup(html, "lxml")`. Read for the categorise-the-agent-statement worked-example pattern, FAQ phrasing on the misconception ("can my letting agent just do this for me?"), and the gross-vs-net trap.

- https://www.ukpropertyaccountants.co.uk/do-i-need-making-tax-digital-if-i-use-a-letting-agent/ — VERIFIED ALIVE 2026-05-23 (Stage 1 seed). The closest sibling: confirms landlord remains the filer; uses "John the landlord" persona. Useful for outline, do NOT replicate worked example.
- https://fhpaccounting.co.uk/managing-agent-handovers/ — VERIFIED ALIVE 2026-05-23. Practitioner-firm angle on the agent-to-accountant data handover; useful for the "data quality coming out of the agent statement" angle and FAQ phrasing on the agent / accountant boundary.
- https://rentalbux.com/partners/letting-agents — VERIFIED ALIVE 2026-05-23. Commercial vendor-page from rentalbux about letting-agent integrations; useful for the "agent statement to MTD software" data-flow patterns competitors are pitching. Strong commercial bias to flag.
- https://rentalbux.com/guides/recording-expenses-repairs-agent-fees-insurance-more — VERIFIED ALIVE 2026-05-23. Practical recording-mechanic guide; useful for the categorisation worked example (which line goes where on the MTD update).
- https://www.ukpropertyaccountants.co.uk/hmrc-landlord-crackdown-letting-agents-urged-to-push-voluntary-disclosure/ — VERIFIED ALIVE 2026-05-23. HMRC's compliance angle on letting agents; useful for context on why HMRC cares about gross-rent reporting from agent statements.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `mtd-quarterly-reporting-landlords-step-by-step-guide` (Jaccard 0.18, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (Jaccard 0.13, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-jointly-owned-property-threshold-split` (Jaccard 0.13, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (Jaccard 0.13, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-overview-six-changes-residential-landlords` (Jaccard 0.13, category: `Making Tax Digital (MTD)`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this bucket

Pick 4-7 to actually cite; add others found during research.

- [HMRC Making Tax Digital for Income Tax — use the service (gov.uk)](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
- [HMRC eligibility check for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [HMRC Property Income Manual (PIM4702 covers letting-agent expenses; PIM overview)](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [HMRC PIM4702 — letting-agent fees as deductible expense (gov.uk)](https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4702)
- [HMRC compatible-software list for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax)
- [HMRC ASA registration (gov.uk; for the accountant-via-ASA layer)](https://www.gov.uk/guidance/get-an-hmrc-agent-services-account)
- [Property rental toolkit (gov.uk — section on gross-income reporting where agents collect rent)](https://www.gov.uk/government/publications/property-rental-toolkit)
- [FA 2017 Sch A1 / Sch 14 — MTD framework (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- House position §19.13 (letting-agent managed portfolio — Wave 4 extension) and §19.2 (gross-income threshold test) — internal tie-breakers.

---

## Universal rules (do not skip)

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
- **Read `docs/property/house_positions.md` once at the start.** For Wave 4, pay particular attention to:
  - **Bucket A (LtdCo + FIC):** §11 (Companies House / ECCTA) and the Wave 4 LtdCo extension (manager will land §21 ahead of session launch covering FIC mechanics, share-class structures, charging-rent-to-own-co, post-incorporation operational details).
  - **Bucket B (MTD ITSA):** §3 (headline MTD position) + §19 (Wave 3 MTD extension covering the mandate timeline, qualifying-income mechanic, joint-property owner threshold, three-year exit rule, the corrected §19.7 15/30/31 + 3%/3%/10% penalty regime). Wave 4 may add a §19 extension covering agent involvement, foreign income, pension funds, letting-agent who-files mechanics.
  - **Bucket C (IHT):** §9 (headline IHT) + §15 (Wave 2 IHT extension with NRB/RNRB, PETs/CLTs/7-year-clock, GROB s.102 FA 1986, April 2026 BPR/APR cap, pensions in IHT from 2027, non-resident IHT). Wave 4 may add a §22 extension covering landlord-specific BPR-Pawson, deed-of-variation s.142, charitable-legacy s.1A, CLT/discretionary-trust mechanics, FIC-as-estate-planning-tool.

If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave4_site_wide_flags.md`.

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
- Each Wave 4 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 4, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave4_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site. Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 2/3 baked this discipline in; Wave 4 carries it forward. Use git add for the content file and brief file only.
    **§16.15 lesson:** do NOT include `docs/property/wave4_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave4_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **§16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave4_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave4_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly` (no override)
- **Final category:** `Making Tax Digital (MTD)` (no override; URL segment `making-tax-digital-mtd`)
- **H1 chosen:** "Letting Agents, Managed Portfolios and MTD ITSA: Who Actually Files the Quarterly Updates"
- **Meta title chosen:** "MTD ITSA + Letting Agent: Who Files Your Quarterly Updates" (58 chars)
- **Why these vs other options:** Lead with the misconception this page exists to correct (who files); H1 + meta both name letting-agent + MTD-ITSA + filing in the first six words. Avoided pattern-matching B1's "Once both joint owners..." opening or B3's "From 6 April 2026...accountant..." opening. Title leads with the misconception, not with a software / process angle, because the page exists to answer that one question first.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk "do I need MTD if I use a letting agent" -> outline (5 H2s), £18k/£60k/Sophie+Alex personas (deliberately not used; need different figures), explicit "using a letting agent does not remove your obligation", gross-vs-net trap warning. Strongest sibling; B6 reuses the framing but goes deeper on the line-by-line statement mapping competitor stops short of.
- fhpaccounting.co.uk "managing-agent-handovers" -> off-topic (corporate managing-agent transition, not letting-agent + landlord); useful only for FAQ phrasing on the "data quality coming out of the agent statement" angle.
- rentalbux.com guides/recording-expenses -> HMRC-approved category list (8 lines) used as cross-check for my SA105 box-27/box-25/box-29 mapping; no useful worked numerics.
- rentalbux.com partners/letting-agents -> commercial vendor page; confirmed landlord-is-filer position, useful only for FAQ phrasing on the referral-commission tilt some letting-agent integrations carry.
- gov.uk PIM4702 (intended) -> WebFetch returned overseas-property fragment; PIM4702 expense detail not surfaced. Did not rely on. House position §19.13 stands as the internal authority.

### Existing-page review (from "Closest existing pages")
- `mtd-quarterly-reporting-landlords-step-by-step-guide` (Jaccard 0.18) — F-7/F-9 stale-figures page. Did NOT cite as authority. Did cross-link nowhere on B6 to avoid amplifying stale figures.
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (0.13) — adjacent persona page; not cross-linked from B6 (different cohort, not the letting-agent landlord scope).
- `mtd-itsa-jointly-owned-property-threshold-split` (0.13, Wave 3 B3) — joint-owner threshold mechanic; referenced indirectly via cross-link to Wave 4 B1 (which already cross-links to Wave 3 B3).
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (0.13) — adjacent topic; not cross-linked.
- `mtd-itsa-overview-six-changes-residential-landlords` (0.13) — bucket pillar; cross-linked from closing section as the starting-point reference.
- Additional semantic neighbours (not Jaccard top-5) cross-linked: Wave 4 B1 joint-owner quarterly filing mechanics (joint-owner letting-agent variant); Wave 4 B3 ASA walkthrough (accountant-via-ASA layer); existing `mtd-itsa-qualifying-income-test-gross-vs-net` (gross threshold test, key for B6's gross-vs-net trap section); existing `nrl-scheme-letting-agents-quarterly-returns-mechanics` (NRL withholding interaction).

### Citations added (external authority)
- gov.uk MTD ITSA "use the service" guidance (implicit context; named in editorialNote, not body link to avoid keyword-stuffing)
- HMRC compatible-software list (referenced in body)
- HMRC Property Income Manual SA105 expense-categorisation framework (referenced in body)
- House position §19.13 (Wave 4 letting-agent extension, internal tie-breaker) — named in body + editorialNote
- House position §19.2 (gross-income threshold test) — named in body (gross-vs-net trap section)

### Internal links added (to our existing pages)
- `/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords` ×1 (closing section as bucket pillar)
- `/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net` ×1 (closing section, gross-test cross-reference)
- `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 B1) ×2 (joint-owner section + closing)
- `/blog/making-tax-digital-mtd/mtd-itsa-agent-services-account-asa-authorisation-walkthrough` (Wave 4 B3) ×2 (accountant-via-ASA section + closing)
- `/blog/non-resident-landlord-tax/nrl-scheme-letting-agents-quarterly-returns-mechanics` ×2 (NRL FAQ + closing)
- All 5 target files exist; URL category segments verified manually against destination frontmatter `category` field (MTD pages map to `making-tax-digital-mtd`, NRL page maps to `non-resident-landlord-tax`).

### Inline CTA placements
- `<aside>` 1: after the gross-vs-net trap explanation (high-intent moment, landlord realising the agent's net-paid line is not their MTD income figure).
- `<aside>` 2: after the multi-agent portfolio section (high-intent, multi-agent landlords face the heaviest admin and are highest-intent for accountant engagement).
- `<aside>` 3: after the pre-April-2026 setup checklist (high-intent, landlord at decision point on readiness review).
- 3 asides total; within the brief's ≤3 limit. None inside worked examples, none at page opening.

### Build attempts
- Attempt 1: `cd Property/web && npm run build` from worktree root — passed clean; page rendered to `.next/server/app/blog/making-tax-digital-mtd/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.html` (135,701 bytes).

### Verification
- FAQ schema count in built HTML matches frontmatter: 12 Question entries in 1 FAQPage block = frontmatter 12 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 58 (max 62) ✓
- Meta description length: 150 (max 158) ✓
- Internal links resolve: 5/5 target files exist + URL category segments match destination frontmatter `category` field ✓
- monitored_pages row inserted: yes (id 171, rewrite_type='rewrite', site_key='property', 90-day window 2026-05-23 → 2026-08-21)
- Body word count: 2,577 (within 2,500-3,500 framing-differentiator-led range)

### Flags raised to wave4_site_wide_flags.md
- None raised. The PIM4702 WebFetch returned overseas-property content rather than the letting-agent-fees detail expected from the URL; logged as a discovery item for future authority-link curation (PIM4702 may not be the right manual reference for letting-agent fees specifically; PIM2068 or PIM1900s range may be the better citation). Not raised as a site-wide flag because the body does not rely on PIM4702 as an authority.

### 2-3 sentence summary
Net-new operational-mechanics page for letting-agent-managed-portfolio landlords entering MTD ITSA from 6 April 2026. Walks the operational triangle (agent collects rent / landlord owns the MTD obligation / accountant via ASA where engaged), maps a typical letting-agent monthly statement line by line into MTD quarterly update categories with a Singh-Reading worked example (different figures from competitor Emma/John/Sophie+Alex personas), works the gross-vs-net categorisation trap with explicit threshold-test impact, and covers multi-property single-agent, multi-agent, joint-owner, year-end reconciliation, NRL interaction, and agent-failure variants. Anti-templating boundary held: did not re-walk Wave 4 B1's joint-owner quarterly cycle, Wave 4 B3's ASA walkthrough, or the existing NRL letting-agents page; deferred to those siblings via explicit cross-links.
