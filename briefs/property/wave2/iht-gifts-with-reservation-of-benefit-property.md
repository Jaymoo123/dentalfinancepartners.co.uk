# Wave 2 brief: iht-gifts-with-reservation-of-benefit-property

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-gifts-with-reservation-of-benefit-property.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-gifts-with-reservation-of-benefit-property

---

## Manager pre-decisions

- **Suggested slug:** `iht-gifts-with-reservation-of-benefit-property`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Deep dive on s.102 Finance Act 1986 (gifts with reservation) applied to property. The classic 'gift the house, keep living there' trap, the rent-payment escape route (commercial rent, periodically reviewed, actually paid), POAT as the back-stop, and the limited Sch 20 para 6 co-ownership carve-out. Worked example: parent gifting £600k home to children continuing to occupy.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/gift-with-reservation-of-benefit/ — specialist firm's GROB explainer; useful baseline for the language readers expect and which examples lead (gift-the-house-keep-living-there is the canonical scenario).
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14301 — HMRC IHTM chapter starting point on Reservation of Benefit; the authoritative outline of HMRC's view of GROB plus the FA 1986 Sch 20 carve-outs; treat as the technical spine of any worked example.
- https://www.legislation.gov.uk/ukpga/1986/41/section/102 — s.102 FA 1986 itself on legislation.gov.uk; cite by subsection in any technical claim (s.102(1) the rule, s.102(3) death-time deeming, s.102(5) disposal-of-benefit exception).
- https://www.legislation.gov.uk/ukpga/1986/41/schedule/20 — Sch 20 FA 1986 (further provisions); para 6 contains the narrow co-ownership carve-out that the framing differentiator names; cite directly rather than via secondary sources.
- https://www.gov.uk/government/publications/pre-owned-assets-income-tax-helpsheet-hs248 — HMRC HS248 on Pre-Owned Assets Tax (POAT); the IHT500 election route belongs in any GROB page as the back-stop where GROB doesn't apply but the donor still enjoys the benefit.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified; session verifies on first fetch and flags any 404 / redirect via discovery log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned the wrong adjacent pages (BPR, developer tax) instead of the actual gifting / lifetime-transfer / FIC-IHT cluster.*

- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar; any GROB-focused page is the deeper-mechanism sibling and must link out to the pillar for readers wanting the umbrella rather than the s.102 trap.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `cgt-gifting-property-family-members-uk` (Capital Gains Tax) — [reasoning: gifting property triggers CGT for the donor; any IHT-side gifting page must link to the CGT-side companion or the reader is only getting half the picture; cross-link makes both pages stronger.]
  - title: CGT on Gifting Property to Family Members in the UK (2026 Guide)
- `cgt-property-transfer-spouse` (Capital Gains Tax) — [reasoning: spouse-exemption is the canonical no-GROB-no-CGT route; the contrast with parent-to-child GROB is a load-bearing teaching point; pure adjacency by readership not topic overlap.]
  - title: CGT on Property Transfer to Spouse: Is It Exempt?
- `fic-iht-treatment-bpr-myth` (Incorporation & Company Structures) — [reasoning: FIC is often pitched as the GROB-avoidance vehicle ("gift the shares not the house"); this page disposes of the parallel BPR myth and is the natural deeper hop for readers asking "can I avoid GROB by using a company".]
  - title: FIC IHT Treatment and the BPR Myth: What Actually Saves Inheritance Tax in a Property FIC
- `cgt-divorce-property-transfer-tax-implications` (Capital Gains Tax) — [reasoning: divorce transfers are a different no-GROB no-PET pattern; lateral link, included because readers researching family-home transfers frequently arrive from divorce queries and benefit from the contrast.]
  - title: CGT and Divorce: Property Transfer Tax Implications for UK Landlords
- `business-property-relief-rental-property-iht` (Landlord Tax Essentials) — [reasoning: readers often conflate "I gifted but kept living there" with "I converted to FHL so it qualifies for BPR"; this page is where the BPR misconception gets reset.]
  - title: Does Business Property Relief Apply to Rental Property Inheritance?

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response — UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

*No redirect overlap. No middleware changes needed at launch.*


---

## Authority links worth considering for this bucket

- [IHTA 1984 (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/1984/51/contents)
- [HMRC IHT Manual (IHTM)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual)
- [HMRC IHT400 guidance](https://www.gov.uk/guidance/how-to-complete-form-iht400-inheritance-tax-account)
- [FA 1986 s.102 (Gifts with Reservation)](https://www.legislation.gov.uk/ukpga/1986/41/section/102)
- [Pawson v HMRC [2013] UKUT 050 (TCC)](https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc)
- [Brander v HMRC [2010] UKUT 300 (TCC)](https://www.gov.uk/tax-and-chancery-tribunal-decisions/brander-v-hmrc-2010-ukut-300-tcc)
- [HMRC IHTM25000 (Business Relief)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25000)
- [HMRC IHTM24000 (Agricultural Relief)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm24000)
- [APR/BPR reforms from 6 April 2026 (gov.uk)](https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms)

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
- **Read `docs/property/house_positions.md` once at the start.** It is the tie-breaker. For Wave 2, pay particular attention to §§9-10 (headline IHT/DTAs positions) AND §§15-17 (the Wave 2 extensions covering IHT depth, DTA article-level detail, and expat / leaving-the-UK working detail). If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave2_site_wide_flags.md`.

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
- Each Wave 2 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator** — don't write a generic "complete guide" template.
- Vary your H2 structure per page. IHT-mechanism pages and IHT-event pages should NOT have the same outline. DTA-bilateral pages must each lead with the bilateral-specific wrinkle.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.


---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 2, §§9-10 give the headline positions and §§15-17 give the Wave-2 working detail.
2. **Claim the page** in `docs/property/wave2_page_tracker.md` — change Status `⬜ todo` to `🟡 in_progress`, add today's UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Decide what's worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (paths in the "Closest existing pages" section). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it — don't pattern-match siblings), meta title (lead with the primary query word order, **≤62 chars**), meta description (**≤158 chars**), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required):
   ```python
   import sys; sys.path.insert(0, '.')
   from optimisation_engine.blog_generator.post_processing import fetch_image_for_post
   image = fetch_image_for_post("uk property tax")
   ```
   Pick a query that's visually evocative and topical. If Pexels returns None, leave `image: ''`.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: `title`, `slug`, `canonical`, `date`, `author`, `category`, `metaTitle` (≤62 chars), `metaDescription` (≤158 chars), `altText`, `image`, `imageCredit` (if Pexels), `h1`, `summary`, `schema: ''`, `faqs: [...]` (10-14 entries), `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`, `editorialNote`.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages`:
    ```bash
    python -c "
    import sys; sys.path.insert(0,'.')
    from optimisation_engine.competitor._db import _sql, _esc
    slug = '<your-slug>'
    cat = '<your-category>'
    _sql(f\"INSERT INTO monitored_pages (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type, notes) VALUES ('property', {_esc(slug)}, '/blog/{cat}/{slug}', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', 'rewrite', 'Wave 2 net-new page') ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING\")
    print('registered')
    "
    ```
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 1 had multiple tracker-ahead-of-branch drift incidents; the orchestrator calibrated mid-wave. For Wave 2 we bake the discipline in: step 14 (commit) MUST happen before step 16 (mark done).
    ```bash
    git add Property/web/content/blog/<slug>.md briefs/property/wave2/<slug>.md docs/property/wave2_page_tracker.md
    git commit -m "Wave 2 (<bucket>): write <slug>"
    ```
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave2_page_tracker.md` (`🟡 in_progress` to `✅ done`) with a 1-line Notes summary. (Step 14 MUST be complete first.)
17. **Append any site-wide flags** to `docs/property/wave2_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave2_discovery_log_session_<X>.md` (append-only).
19. **Next page** — claim ONE more page from the top of your remaining list.

## Session-side watcher pattern (new for Wave 2)

When you append a `STATUS: open` question to your Q&A file, spawn a Monitor task on that file watching for the `STATUS: answered` flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue.

```bash
QFILE="docs/property/wave2_questions_session_<X>.md"
LATEST_Q=$(grep -oE '^## \[Q-[0-9]+\]' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. Do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.


---

## Per-page work-log (fill in as you go — supports resumability if interrupted)

### Decisions
- **Final slug:** unchanged (`iht-gifts-with-reservation-of-benefit-property`).
- **Final category:** unchanged (`Landlord Tax Essentials`).
- **H1 chosen:** "Gifts with Reservation of Benefit on Property: A Section 102 FA 1986 Walkthrough"
- **Meta title chosen:** "GROB on Property Gifts: s.102 FA 1986 Explained" (47 chars)
- **Why these vs other options:** Statute-anchored title differentiates from sibling A1 (decision framework) and from the existing IHT pillar (descriptive). Lead with "GROB" (the term readers search) and the specific section number for SERP signal of authoritative depth. Meta description leads with the three concrete sub-mechanisms (rent escape, POAT, Sch 20) so SERP snippet signals depth not just topic.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/gift-with-reservation-of-benefit/ — competitor's GROB explainer: structured around "how GWR affects lifetime gifts" + "how to avoid GWR rules". Single worked example (£500k home gifted 2020, valued £700k at 2027 death, full estate inclusion). Mentions full market rent. No co-ownership carve-out, no POAT depth. Confirms our deeper-than-competitor positioning.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14301 — HMRC's GWR manual chapter starting point: s.102(1)(a) bona-fide-possession limb, s.102(1)(b) entire-exclusion limb, "relevant period" definition. Cross-references IHTM14311/14331/14371/14391/14421 + s.102A/B/C extension for post-9-March-1999 land gifts. POAT also referenced.
- https://www.legislation.gov.uk/ukpga/1986/41/section/102 — Verbatim statute. s.102(1)/(2)/(3)/(4)/(5)/(6-7)/(8). Used directly in body for subsection-by-subsection walkthrough. Confirmed s.102(5) exemptions list (spousal, charitable, marriage, small gifts, political parties, housing associations, employee trusts) and s.102(4) cessation-PET mechanism.

### Existing-page review (from "Closest existing pages")
- `inheritance-tax-rental-property-uk-guide` — descriptive pillar, mentions GROB only as FAQ-level ("can I just give my children the keys and move out"). This page is the deep mechanism explainer underneath the pillar's FAQ. Linked bidirectionally; pillar should add back-link (already flagged F-3 from A1).
- `cgt-gifting-property-family-members-uk` — comprehensive CGT side of gifting. Linked at the rent-escape and donee-base-cost paragraphs to hand readers the CGT companion without re-explaining s.17 mechanics.
- `cgt-property-transfer-spouse` — spouse-transfer CGT side. Linked at the s.102(5) exemptions section because s.18 IHTA 1984 spousal exemption is the canonical no-GROB route; reader hops to CGT companion.
- `fic-iht-treatment-bpr-myth` — referenced but not linked: FIC as a GROB-avoidance vehicle was flagged in the brief, but A2 stays statute-focused and lets A1 decision framework + FIC-myth page handle the FIC-as-alternative discussion. Avoiding cross-link sprawl.
- `cgt-divorce-property-transfer-tax-implications` — not linked: divorce-specific, lateral. No natural hook in A2's mechanism-focused outline.
- `business-property-relief-rental-property-iht` — not linked: BPR misconception belongs in the A1 decision framework's "what doesn't work" section, not in a statute walkthrough.
- `iht-property-investors-decision-framework-2026-onwards` (A1, just shipped) — linked at opening and at the close as the planning-context counterpart. A1 back-patched in same commit to add forward-link to A2 (closing F-5 flag).

### Citations added (external authority)
- s.102 Finance Act 1986 (legislation.gov.uk) — verbatim statute spine.
- Schedule 20 Finance Act 1986 (legislation.gov.uk, referenced) — para 6 co-ownership carve-out.
- s.84 + Schedule 15 Finance Act 2004 — POAT statutory basis.
- HMRC IHTM14301 (Inheritance Tax Manual, Reservation of Benefit chapter starting point) — HMRC's published interpretation.
- IHTA 1984 ss.18/20/22/23/24/24A — s.102(5) exemption cross-references.
- s.7(4) IHTA 1984 — taper relief on the cessation-PET.
- FA 1986 (Double Charges) Regulations 1987 (SI 1987/1130) — reconciliation between GROB and cessation-PET.

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` — A1 sibling; planning context.
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` — descriptive pillar (for the wider BTL gifting framing).
- `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` — CGT companion at rent-escape paragraph.
- `/blog/capital-gains-tax/cgt-property-transfer-spouse` — spouse-transfer CGT side at s.102(5) exemption section.
- (Back-patch to A1) re-added the forward-link from A1 → A2 in A1's GROB-discussion paragraph, closing flag F-5.

### Inline CTA placements
- After the Patel-estate £600k worked example — high-intent moment for readers who recognise their own situation in the trap.
- After the four-most-enquired-patterns list — high-intent moment for readers reviewing their existing arrangements against HMRC's enquiry pattern.

### Build attempts
- Attempt 1 — pass. `npm run build` clean. Rebuilt after the A1 back-patch micro-edit to ensure A1's HTML reflects the re-added forward link to A2.

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries, 13 faqs).
- Em-dashes in markdown: 0.
- Tailwind classes in markdown: 0.
- Meta title length: 47 chars (≤62 OK).
- Meta description length: 145 chars (≤158 OK).
- Internal links resolve: yes (4 unique internal blog links, all targets exist).
- monitored_pages row inserted: yes (90-day window from 2026-05-22).
- Body word count: 2,713.

### Flags raised to wave2_site_wide_flags.md
- F-5 (raised under A1) closed by the A1 back-patch in the same A2 commit (forward-link from A1 to A2 re-added). No new flags for A2.

### 2-3 sentence summary
Wave 2 A2 shipped: subsection-by-subsection s.102 FA 1986 walkthrough applied to property gifts. Covers s.102(1)(a)/(b) tests, s.102(3) death-time deeming, s.102(4) cessation-PET, s.102(5) exemptions, Sch 20 para 6 co-ownership carve-out, POAT (s.84 + Sch 15 FA 2004) and the IHT500 election, ss.102A/B/C extensions for land gifts. Patel-estate £600k worked trap example; clean BTL gift fact pattern; four most-enquired HMRC patterns. 2,713 body words, 13 FAQs, all six verifications pass, monitored_pages registered. A1 back-patched in the same commit to re-add the forward-link removed pre-build (closes F-5).

