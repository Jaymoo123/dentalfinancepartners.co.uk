# Wave 7 brief: partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions

---

## Manager pre-decisions

- **Suggested slug:** `partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §1.A (Sch 15 partnership SDLT relief — verbatim with SLP mechanics + para 17A + para 34 income-profit-share + SDLTM33500+) + §1.F (do-not-write list)
- **Framing differentiator (~50 words, Stage 1a-locked):**

> FA 2003 Sch 15 paras 10-13 transfer-IN mechanics (SLP sum-of-lower-proportions 5-step calculation per para 12 — corresponding partnership share × lower-proportion-of-vendor-and-connected-persons step-by-step); paras 18-20 transfer-OUT mechanics; **para 17A 3-year anti-withdrawal rule** (transferee partner reduces partnership share within 3 years → SDLT charge — NOT 7-year, HP-lock catch #7-adjacent); **para 34 partnership-share metric is INCOME-PROFIT-SHARE NOT capital/voting** (HP-lock catch #7 — common drift). HMRC manual SDLTM33500+ (NOT SDLTM09050+ which is s.75A Ramsay territory — HP-lock catch). Cohabitants not connected under CTA 2010 s.1122 (married/CP only). Genuine-partnership substance requirement (firm-positioning practice: 2-year safe harbour, not statutory). NOT writing s.108 linked transactions (C5 covers).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C9 ships **first within Bucket C SDLT cluster** — C5 linked transactions cite C9 forward for the partnership-incorporation-as-linked-transactions scenario. Drift-prone territory — competitor content frequently asserts "partnership share is voting/capital share" (FALSE — it's income-profit-share per para 34); frequently asserts "para 17A is 7 years" (FALSE — 3 years); frequently cites SDLTM09050+ (FALSE — that's s.75A Ramsay; SDLTM33500+ is the correct partnership reference).

**HOUSE_POSITION_CONFLICT signal context:** §1.A is the primary verbatim lock. §1.F do-not-write list forbids five items: "Sch 15 SLP is a loophole" (FALSE — statute-authorised relief); "cohabitants can use Sch 15 SLP" (FALSE — connected-persons via CTA 2010 s.1122 = married/CP only); "para 17A anti-withdrawal is 7 years" (FALSE — 3 years); "partnership share is voting/capital" (FALSE — income-profit per para 34); "SDLTM09050 is partnership reference" (FALSE — SDLTM33500+).

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of SLP 5-step calculation, treatment of para 17A 3-year anti-withdrawal, treatment of para 34 income-profit-share metric, treatment of genuine-partnership requirement.

- https://www.ukpropertyaccountants.co.uk/sdlt-partnership-incorporation-sch-15/
- https://www.uklandlordtax.co.uk/partnership-sdlt-relief-zero-charge/
- https://www.shipleys.com/insights/sch-15-partnership-incorporation-mechanics/
- https://www.haines-watts.com/insight/partnership-incorporation-sdlt-relief/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: **explicit SLP 5-step walkthrough with arithmetic** (most competitor pieces describe SLP at high level only); explicit para 17A 3-year anti-withdrawal (not 7); explicit para 34 income-profit-share metric (not capital/voting); explicit SDLTM33500+ HMRC manual reference; explicit cohabitants-not-connected operational point; explicit 2-year genuine-partnership safe-harbour (firm practice, not statute).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "Sch 15 partnership SDLT relief", "sum of lower proportions SDLT", "partnership incorporation SDLT zero", "para 17A anti-withdrawal SDLT".*

---

## Closest existing pages

- `sdlt-sub-sale-relief-mechanics` (0.24 cannibal — adjacent SDLT mechanic; clean separation — sub-sale is FA 2003 s.45A, not Sch 15).
- `incorporation-holdover-relief-property` (0.13 cannibal — CGT-side incorporation relief; cross-link for full incorporation tax-stack).
- `sdlt-incorporation-stamp-duty-twice` (0.12 cannibal — adjacent SDLT incorporation focus; cross-link for "Sch 15 may eliminate the SDLT-twice problem if partnership route applicable").
- `section-162-incorporation-relief-property-landlords` (0.12 cannibal — CGT s.162 relief; cross-link for full incorporation tax-stack).
- C5 (Wave 7 linked transactions) — cite forward for "partnership-incorporation invokes s.108 linkage".
- C6 (Wave 7 group relief) — cross-link for post-incorporation corporate-group restructure context.

**Cannibalisation discipline:**
- C9 is the Sch 15 partnership SDLT mechanic. Read existing incorporation pages before writing; do not re-walk s.162 CGT incorporation arithmetic.
- C9 must not stray into FA 2003 s.75A general anti-avoidance Ramsay territory (SDLTM09050+ is the wrong manual reference for Sch 15).

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch.

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory:**
- FA 2003 Sch 15 paras 10-20 + 34 (partnership SDLT relief — SLP, anti-withdrawal, definition of partnership-share): https://www.legislation.gov.uk/ukpga/2003/14/schedule/15
- CTA 2010 s.1122 (connected persons — married/CP only, not cohabitants): https://www.legislation.gov.uk/ukpga/2010/4/section/1122
- LBT(S)A 2013 Sch 17 (Scottish partnership relief — not identical): https://www.legislation.gov.uk/asp/2013/11/schedule/17
- LTTA 2017 Sch 7 (Welsh partnership relief — not identical): https://www.legislation.gov.uk/anaw/2017/1/schedule/7
- Partnership Act 1890 s.1 (definition of partnership — genuine-partnership substance): https://www.legislation.gov.uk/ukpga/Vict/53-54/39/section/1

**HMRC manuals:**
- SDLTM33500+ (partnership transactions HMRC manual — correct primary reference): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm33500
- SDLTM34000+ (transfers from a partnership — paras 18-20): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm34000
- SDLTM33700 (SLP calculation worked examples): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm33700

**Cross-references in house_positions.md:** §1.A (primary verbatim lock); §1.F (do-not-write list — five forbidden items); §1.B (linked transactions — C5 cross-link); §1 (main SDLT bands for the residual-rate context).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 15 paras 10-13, 17A, 18-20, 34 verbatim against legislation.gov.uk. Verify SDLTM33500+ + SDLTM33700 SLP worked examples current. Verify CTA 2010 s.1122 connected-persons scope (married/CP, NOT cohabitants). Verify para 17A 3-year window (not 7).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the genuine-partnership requirement section (high-intent: "is your arrangement a genuine partnership?")
  - After the SLP 5-step worked example (high-value: numerical demonstration of zero-SDLT outcome)
  - After the para 17A 3-year anti-withdrawal section (high-intent: post-incorporation continuity planning)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C9 is the Sch 15 partnership SDLT mechanic. Read existing incorporation pages + C5 brief before writing. Forward-link, don't duplicate.

### House positions
- **§1.A is your primary working detail (verbatim-locked).** §1.F forbids: "Sch 15 SLP is a loophole" / "cohabitants can use Sch 15 SLP" / "para 17A anti-withdrawal is 7 years" / "partnership share is voting/capital" / "SDLTM09050 is partnership reference" (all FALSE).
- **CRITICAL drift to avoid:** Partnership-share is **income-profit-share** per para 34, NOT capital/voting (HP-lock catch #7). Para 17A anti-withdrawal is **3 years** not 7. SDLTM33500+ is the correct HMRC manual (NOT SDLTM09050+ which is s.75A territory).

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the operational outcome (when Sch 15 delivers zero SDLT on incorporation and when it does not), not with "What is Schedule 15".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §1 + §1.A-§1.F + §1.G is your primary working detail for Bucket C Wave 7 SDLT cluster.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify Sch 15 paras 10-13, 17A, 18-20, 34 verbatim + SDLTM33500+ + para 34 income-profit-share + para 17A 3-year window at write time.**
8. Fetch a hero image from Pexels via fetch_image_for_post.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`. Must pass clean.
11. Verify (all six checks must pass): FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap. (None for this brief.)
13. Register the new page in `monitored_pages` via the Supabase _db helper.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include the tracker in your branch commit.
15. Fill in the per-page work-log at the bottom of this brief.
16. Mark done in `docs/property/wave7_page_tracker.md` with a 1-line Notes summary.
17. Append any site-wide flags to `docs/property/wave7_site_wide_flags.md`.
18. Log discoveries to `docs/property/wave7_discovery_log_session_<X>.md`.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug / category:**
- **H1 chosen:**
- **Meta title chosen:** (max 62 chars)
- **Meta description chosen:** (max 158 chars)
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- em-dash count:
- Tailwind utility classes in markdown:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave7_site_wide_flags.md

### 2-3 sentence summary
