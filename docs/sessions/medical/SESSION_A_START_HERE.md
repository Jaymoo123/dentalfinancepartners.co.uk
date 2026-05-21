# Medical — Session A — start here

**You are Session A**, one of three parallel Claude Opus 4.7 sessions rewriting Medical site pages. Your assignment is fixed — Sessions B and C have their own pre-assigned lists, you do not coordinate with them in real time.

## Worktree

You run inside the worktree at `C:/Users/user/Documents/Accounting-wt-medical-a/` on branch `medical-rewrite-a`. **Stay inside that worktree.** Build commands run from that worktree's root. The other sessions are in `Accounting-wt-medical-b/` and `Accounting-wt-medical-c/` on their own branches — they will never collide with your `.next/` or mid-edit YAML.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/medical/house_positions.md`** — the locked house positions for IR35, NHS Pension AA, MTD-for-ITSA, GP partner vs salaried vs locum, McCloud, partnership goodwill. Apply on every page; do not unilaterally re-frame. Read once; only re-read if you hit a factual edge case.
3. **`docs/competitor_rewrite_playbook.md`** — the system-level reference. The Medical pipeline is the same as Property's, with the Python extraction layer removed: each session fetches competitor HTML and reasons over it directly.
4. **Your assigned brief files** at `briefs/medical/<slug>.md`. Each brief lists: source markdown path, current frontmatter snapshot, primary query, GSC queries (if any), 3 competitor URLs, cannibalisation context, universal rules, workflow, and the post-rewrite report template you fill in.
5. **`docs/medical/page_rewrite_tracker.md`** — the master tracker. Find the "Session A pages" section. That's your work list.

## Per-page workflow

For each page in your assignment (in order):

1. **Claim it** in `docs/medical/page_rewrite_tracker.md` (`⬜ todo` → `🟡 in_progress`, add today's date).
2. **Open the brief** at `briefs/medical/<slug>.md`. The competitor URLs are listed there.
3. **Fetch and analyse each competitor URL.** Use `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read the actual HTML. Decide what shape of analysis the page needs — city pages need different things than tax-pillar pages, do not run the same template across all of them.
4. **Compare across competitors and against our source markdown.** What do 2-of-3 competitors cover that we don't? What's their H2/H3 outline, their FAQ density and pattern, their worked examples, their authority citations, their component patterns (comparison tables, decision matrices, calculators, step lists), their word count? Where are we over-indexed on theory vs application? Which queries are competitors targeting that we miss?
5. **Plan the rewrite** before touching markdown: new H2/H3 outline; meta title (lead with the primary query, <62 chars); meta description (<158 chars); FAQs to add/rewrite to reach 10-14; inline `<aside>` CTA placements; cannibalisation handling (write the applied/local version, link out to the pillar).
6. **Verify factual claims** against authorities (HMRC EIM / ESM / BIM manuals, NHS BSA, legislation.gov.uk, GMC, BMA, gov.uk). House positions doc is the tie-breaker — if a competitor contradicts a house position, the house position wins.
7. **Apply the rewrite** to the source markdown file.
8. **Update `date:` frontmatter** to today's date.
9. **Build:** from the worktree root, `cd Medical/web && npm run build`. Must pass with no new warnings introduced by your changes.
10. **Verify FAQ schema count:** `grep -c '"@type":"Question"' Medical/web/.next/server/app/blog/<slug>.html` must equal the frontmatter `faqs:` array length.
11. **Verify no em-dashes:** `grep -c "—" Medical/web/content/blog/<slug>.md` must return 0.
12. **Verify no Tailwind classes** in markdown: `grep -cE 'class="[a-z]' Medical/web/content/blog/<slug>.md` must return 0.
13. **Fill in the "Post-rewrite report" at the bottom of `briefs/medical/<slug>.md`.** Word count before/after, FAQ count before/after, the gaps you closed, worked examples added, authority links added, cannibalisation handling, house-position items applied, anything flagged.
14. **Mark done** in the tracker (`🟡 in_progress` → `✅ done`) with a one-line Notes summary.
15. **Append to `docs/medical/site_wide_flags.md`** (append-only) anything that needs orchestrator/user input. Do not pause; flag and continue.
16. **Next page** on your list.

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Em-dashes read as AI-generated. Use commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised social proof only. No real client names. No specific NHS Trust names unless quoting publicly available policy.

### Lead-gen architecture
- `Medical/web/src/components/blog/BlogPostRenderer.tsx` auto-injects `LeadForm` at the bottom of every post. **Never duplicate this in body content.**
- Add 1-3 inline `<aside>` CTAs at conversion moments (after worked examples, comparison tables, decision frameworks). Drive scroll-to-form.
- Match the form's role segments: GP (salaried) / GP (partner) / Locum doctor / Hospital consultant / Private practice owner. Address each segment where relevant.

### CSS in markdown
- **Tailwind utility classes do NOT work in markdown body content.** Tailwind v4 scans `src/**` only.
- Semantic HTML in markdown only: `<aside>`, `<table>`, `<ul>`, `<strong>`.
- The `.prose-blog aside` rule was added to `Medical/web/src/app/globals.css` during pre-flight (medical-teal accent on copper-soft).
- Inline CTA pattern (NO classes):
```html
<aside>
<p>Headline that signals a conversion moment</p>
<p>Body copy that prompts scroll-to-form below.</p>
</aside>
```

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array (`question` + `answer`).
- The template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd` in `Medical/web/src/lib/schema.ts`. **Do NOT manually add FAQ schema in body content.**
- Article, FAQPage, BreadcrumbList, Organization all auto-emitted.
- Target 10-14 FAQs covering: GSC query demand (where present), competitor FAQ patterns, lead-form segment qualifiers (one per role where relevant), house-position clarifications.

### Cannibalisation
- Pillar pages: NHS Pension AA, Locum tax (complete), Locum IR35, GP partnership tax (complete), GP limited company, Medical practice incorporation, GP tax deductions, GP accountant services (complete). When this page touches a pillar topic, write the **applied / scenario / local** version, not the comprehensive theoretical version. Link out to the pillar.
- Do not duplicate worked numerical examples verbatim across pages.

### Quality bar (acceptance criteria)
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short.
- FAQs: 10-14.
- New external authority links: 4-7 (HMRC EIM/ESM/BIM, NHS BSA, NHS England, GMC, BMA, legislation.gov.uk, gov.uk).
- 1-3 inline `<aside>` CTAs.
- Build clean; FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; internal links to relevant pillars.

## What to handle yourself vs flag

**Handle yourself** (no orchestrator input needed):
- Em-dash removals, Tailwind class removals, FAQ expansion 4→10-14.
- Adding HMRC / NHS BSA / GMC / BMA / legislation.gov.uk citations.
- Adding inline `<aside>` CTAs.
- Cannibalisation handling via differentiation + linking out to pillars.
- Factual corrections that match the house positions doc.
- Reframing speculative figures to match the house positions doc.

**Flag to `docs/medical/site_wide_flags.md`** (append-only; do not pause):
- Factual errors on a different page you noticed while researching.
- Cannibalisation where two pages essentially duplicate each other and neither has clear differentiation.
- Pages where the slug itself is wrong (eg contains an obsolete LTA figure).
- Pages that turn out to be category index pages or TSX templates, not blog markdown (mark `⏭️ skip` in tracker and flag).
- Anything requiring a business decision (brand positioning, redirect choices).
- Unverifiable claims you cannot fix in-place (named NHS Trusts, specific software products by name without disclosure).

**Stop and ask** (only in extreme cases):
- Build failures on the baseline (before any of your edits) that would make rewriting unsafe.
- Security vulnerability that should not wait for a flag entry to be read.
- Otherwise: never pause. Flag and continue.

## Your Session A pages (16 assigned)

In assignment order — work through them top to bottom. None are pre-marked skip; if you discover one must be skipped (TSX template, redirect candidate, etc), flag it and mark `⏭️ skip`.

| # | Slug |
|---|---|
| A1 | accountant-accounting-services |
| A2 | gp-accountant |
| A3 | gp-accountant-cost |
| A4 | gp-accountant-leeds |
| A5 | gp-accountant-manchester |
| A6 | gp-accountant-sheffield |
| A7 | gp-bookkeeping-guide-uk |
| A8 | gp-home-office-expenses-tax-relief |
| A9 | gp-partnership-profit-sharing-tax-planning |
| A10 | gp-pension-contributions-tax-relief |
| A11 | gp-tax-return |
| A12 | locum-doctor-ir35-what-you-need-to-know |
| A13 | locum-doctor-tax-complete-guide |
| A14 | medical-professional-expenses-what-is-claimable |
| A15 | nhs-pension-tapered-annual-allowance-calculator |
| A16 | private-practice-tax-nhs-and-private-income |

**Pillars in your list:** A12 (Locum IR35), A13 (Locum tax complete). Treat with extra care — every other locum-related page in this site (across all three sessions) will link to these and write the applied version. Your pillars need to BE the comprehensive reference.

## When you're done

Update the summary table at the top of `docs/medical/page_rewrite_tracker.md`, then append a `[SESSION_A_COMPLETE]` paragraph to `docs/medical/site_wide_flags.md` noting any pages where you could not get a clean rewrite done and why. Then stop.

Begin with A1 (`accountant-accounting-services`).
