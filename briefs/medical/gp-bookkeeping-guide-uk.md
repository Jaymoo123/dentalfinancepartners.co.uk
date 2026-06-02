# Brief: gp-bookkeeping-guide-uk

**Site:** medical
**Source file:** `Medical/web/content/blog/gp-bookkeeping-guide-uk.md`
**Live URL (when indexed):** https://www.medicalaccounts.co.uk/blog/gp-bookkeeping-guide-uk
**Generated:** 2026-05-21

---

## Page snapshot (current frontmatter)

- **Title:** GP Bookkeeping: Essential Guide for UK General Practice Partners
- **metaTitle:** GP Bookkeeping Guide 2026 | Medical Practice Accounts UK
- **metaDescription:** GP bookkeeping goes beyond standard accounting — partnership profit sharing, NHS income tracking, and expense categories explained for UK practices.
- **H1:** GP Bookkeeping: Essential Guide for UK General Practice Partners
- **Category:** GP Practice Management
- **Current body word count (approx):** 1901
- **Current FAQs in frontmatter:** 7

---

## Primary query

- **Primary query:** `GP Bookkeeping Guide 2026 | Medical Practice Accounts UK`
- **Source:** Seeded from page metaTitle / h1 (no GSC data)

### GSC queries (last 28 days)

*No GSC impressions in the last 28 days for this page. The page is below the GSC noise floor or not yet indexed. Primary query was seeded from page metadata — see the field above. Treat the competitor URLs as the authoritative target demand for this query.*


---

## Competitor URLs (top 3 organic, your-own-domain and robots-blocked hosts excluded)

1. **livingstonesaccountants.co.uk** — [Bookkeeping Essentials for Medical Practices in the UK](https://www.livingstonesaccountants.co.uk/blog/bookkeeping-essentials-for-medical-practices-in-the-uk/)
   - *DDG snippet:* Bookkeeping for medical practices UK simplified. Learn essentials, common mistakes, and compliance tips to keep your healthcare business financially healthy.
2. **honeybarrettmedical.co.uk** — [Explaining the GP Practice Accounts - Honey Barrett](https://www.honeybarrettmedical.co.uk/pdf/explaining-the-gp-practice-accounts/)
   - *DDG snippet:* GPs and their Practices Locum and Portfolio Doctors Consultants Limited Company Advice for Medics Primary Care Networks Pension Services Other Healthcare Professionals
3. **dains.com** — [Association of Independent Specialist Medical Accountants: Explaining ...](https://www.dains.com/assets/downloadable/asima-guide-to-practice-accounts.pdf)
   - *DDG snippet:* Making sense of the practice accounts doesn’t require a degree in economics. But you do need to grasp the basic principles of accounting and how they apply to GP practices. This tutorial will get you started and has been put together for Practice Index by Andrew Pow and Kieran Hancock of the Associa


> Fetch each one yourself: `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Decide per-page what's worth extracting: outline, FAQs, worked examples, citation density, component patterns, word count, schema. Reason over the real HTML — do not rely on regex shortcuts.

---

## Cannibalisation context

*No obvious slug-level overlap with other medical posts.*

**Pillar pages** (write applied/local version, link out instead of duplicating):

- NHS pension annual allowance: `/blog/nhs-pension-annual-allowance-complete-guide`
- Locum tax (complete): `/blog/locum-doctor-tax-complete-guide`
- Locum IR35: `/blog/locum-doctor-ir35-what-you-need-to-know`
- GP partnership tax (complete): `/blog/gp-partnership-tax-complete-guide`
- GP limited company: `/blog/gp-limited-company-tax-benefits-drawbacks`
- Medical practice incorporation: `/blog/medical-practice-incorporation-step-by-step`
- GP tax deductions: `/blog/gp-tax-deductions-complete-list-2026`
- GP accountant services (complete): `/blog/gp-accountant-services-complete-guide`


---

## Site rules and house positions

- **Universal rules:** see below.
- **House positions:** read `docs/medical/house_positions.md` once at the start of your session. It locks the speculative-figure framings (IR35 post-April-2024, NHS Pension AA + tapered + MPAA + Scheme Pays + McCloud, MTD-for-ITSA threshold and applicability to medical professionals, GP partner vs salaried vs locum tax framing, GP partnership goodwill).

## Universal rules

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical and specific. Exact figures, named legislation. No vague hedges.
- Anonymised social proof only. No real client names. No real NHS Trust names unless quoting publicly available policy.

### Lead-gen architecture
- `Medical/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- Add 1-3 inline `<aside>` CTAs at conversion moments (after worked examples, comparison tables, decision frameworks). Drive scroll-to-form.
- Match the form's role segments: GP (salaried) / GP (partner) / Locum doctor / Hospital consultant / Private practice owner. Cover each segment's perspective where relevant.

### CSS in markdown content
- **Tailwind utilities do NOT work in markdown body content** (Tailwind v4 scans `src/**` only).
- Semantic HTML in markdown only: `<aside>`, `<table>`, `<ul>`, `<strong>`.
- The `.prose-blog aside` rule is in `Medical/web/src/app/globals.css` (medical-teal accent on copper-soft) — added during pre-flight.
- Inline CTA pattern:
```html
<aside>
<p>Headline that signals a conversion moment</p>
<p>Body copy that prompts scroll-to-form below.</p>
</aside>
```

### FAQs and schema
- FAQs live in frontmatter `faqs:` array (`question` + `answer`).
- Template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd` in `Medical/web/src/lib/schema.ts`. **Do NOT manually add FAQ schema in body content.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.

### Cannibalisation
- Pillar pages are listed below. When this page touches a pillar topic, write the **applied / scenario / local** version, not the comprehensive theoretical version. Link out to the pillar.
- Do not duplicate worked numerical examples verbatim across pages.

### House positions
- **Read `docs/medical/house_positions.md` once at the start of your session.** It is the tie-breaker. If a competitor contradicts a house position, the house position wins; the competitor is wrong or out of date.

### Quality bar (acceptance criteria for each page)
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short.
- FAQs: 10-14.
- External authority links: 4-7 (HMRC EIM/ESM/BIM, NHS BSA, NHS England, GMC, BMA, legislation.gov.uk, gov.uk).
- 1-3 inline `<aside>` CTAs.
- Build clean: from your worktree root, `cd Medical/web && npm run build`.
- FAQ schema count in built HTML matches the frontmatter array length (`grep -c '"@type":"Question"' .next/server/app/blog/<slug>.html`).
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages.


---

## Workflow (do in order, per page)

1. **Claim the page** in `docs/medical/page_rewrite_tracker.md` — change Status `⬜ todo` → `🟡 in_progress`, add today's date.
2. **Read the source markdown** at the path under "Source file" below.
3. **Read `docs/medical/house_positions.md`** once at the start of your session (only re-read if you hit a factual edge case you've not seen before).
4. **Fetch and analyse each competitor URL listed below.**
   - Use `httpx.get(url, follow_redirects=True, timeout=30)` and `BeautifulSoup(html, "lxml")` to parse the HTML.
   - Decide what shape of analysis the page needs (a city page has different priorities than a tax-pillar page — do not run the same template across all of them).
   - For each competitor: read the actual content. Note H1, the H2 outline and what's covered under each, FAQ patterns, worked examples, citation density, component patterns (comparison tables, decision matrices, calculators), word count, schema emitted, anything else that stands out.
   - Then compare across competitors: where do 2 or more cover something that ours doesn't?
   - Then compare to OUR source: where are our gaps; where are we over-indexed on theory vs application; which queries are competitors targeting that ours misses.
5. **Plan the rewrite** before touching markdown. Decide: new H2/H3 outline; meta title (lead with the primary query word order, <62 chars); meta description (<158 chars); FAQs to add/rewrite; inline `<aside>` CTAs and where they go; cannibalisation handling (write the applied/local version where a pillar exists).
6. **Verify factual claims against authorities.** HMRC manuals, NHS BSA, legislation.gov.uk, GMC, BMA. The house positions doc is the tie-breaker.
7. **Apply the rewrite to the source markdown file.**
8. **Update `date:` frontmatter** to today's date.
9. **Build:** from your worktree root, `cd Medical/web && npm run build`. Must pass clean.
10. **Verify FAQ schema count:** `grep -c '"@type":"Question"' Medical/web/.next/server/app/blog/<slug>.html` must equal your frontmatter `faqs:` array length.
11. **Verify no em-dashes:** `grep -c "—" Medical/web/content/blog/<slug>.md` must return 0.
12. **Verify no Tailwind classes** in markdown: `grep -cE 'class="[a-z]' Medical/web/content/blog/<slug>.md` must return 0.
13. **Fill in the "Post-rewrite report" at the bottom of this brief.** What you found, what you changed, what you couldn't resolve.
14. **Mark done** in `docs/medical/page_rewrite_tracker.md`: `🟡 in_progress` → `✅ done`, one-line Notes summary.
15. **Append site-wide issues** to `docs/medical/site_wide_flags.md` (append-only, never edit existing entries) if you discover anything requiring orchestrator/user input. Do not pause; flag and continue.
16. **Next page on your assigned list.**


---

## Post-rewrite report (fill in after rewrite)

**Slug:** <slug>
**Rewrite date:** <YYYY-MM-DD>
**Build:** <pass / fail>
**FAQ schema count matches frontmatter:** <yes / no>

### Word count
- Before: <n>
- After: <n>

### FAQ count
- Before: <n>
- After: <n>

### What competitors had that we didn't (the gaps you closed)
- <bullet>
- <bullet>

### Worked examples added / scenarios used
- <bullet>

### Authority links added
- <bullet>

### Cannibalisation handling
- <none / linked out to pillar X / pivoted to the applied scenario version>

### House-position items applied
- <bullet, only if relevant>

### Anything flagged to `docs/medical/site_wide_flags.md`
- <none / one-line summary of each flag>

### Key 2-3 sentence summary
<freeform>

