# Wave 7 brief: sdlt-divorce-separation-transfer-relief-schedule-3-paragraph-3-fa-2003

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/sdlt-divorce-separation-transfer-relief-schedule-3-paragraph-3-fa-2003.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-tax-changes/sdlt-divorce-separation-transfer-relief-schedule-3-paragraph-3-fa-2003

---

## Manager pre-decisions

- **Suggested slug:** `sdlt-divorce-separation-transfer-relief-schedule-3-paragraph-3-fa-2003`
- **Suggested category:** `property-tax-changes`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §1.D (Sch 3 para 3 — verbatim) + §1.F (do-not-write list)
- **Framing differentiator (~50 words, Stage 1a-locked):**

> FA 2003 Sch 3 para 3 exemption for spouse/civil-partner transfers on divorce, judicial separation, annulment OR civil partnership dissolution pursuant to: (a) MCA 1973 ss.22A/23A/24A property adjustment orders; (b) Civil Partnership Act 2004 Sch 5 orders; (c) **"any agreement made in contemplation of or otherwise in connection with the dissolution or annulment"** — broader than court-order route. Combines with TCGA 1992 s.58 spouse no-gain-no-loss (extended by FA 2023 to year-of-permanent-separation + two further tax years) + s.225B main-residence-on-divorce relief. **Third-party transfers (e.g. transfer to children or to trust) NOT covered** — common drift point. Mortgage-assumption-as-consideration historic ambiguity (HMRC accepts exempt treatment in divorce context). Scottish LBTT(S)A 2013 Sch 1 para 6 + Welsh LTTA 2017 Sch 3 para 6 are jurisdictional equivalents (note divergence).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C7 ships **independently within Bucket C** (no strict sequencing). Adjacent to existing site page `cgt-divorce-property-transfer-tax-implications` (0.12 cannibal — CGT-side focus); C7 differentiates on **SDLT-side primary focus** with CGT cross-link. The "agreement in contemplation of dissolution" scope is broader than "court order" and frequently under-explained in practitioner content.

**HOUSE_POSITION_CONFLICT signal context:** §1.D is the primary verbatim lock. §1.F do-not-write list forbids: "Sch 3 para 3 covers transfers to children" (FALSE — only spouse-to-spouse); "requires Decree Absolute" (FALSE — agreement in contemplation suffices). Third-party transfers fall outside Sch 3 para 3 entirely and pay SDLT on full chargeable consideration.

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of Sch 3 para 3 scope, treatment of "agreement in contemplation" wider scope, treatment of TCGA s.58 + s.225B interaction, treatment of mortgage-assumption-as-consideration.

- https://www.ukpropertyaccountants.co.uk/sdlt-divorce-property-transfer/
- https://www.uklandlordtax.co.uk/sdlt-relief-divorce-separation/
- https://www.shipleys.com/insights/sdlt-and-divorce-mechanics/
- https://www.haines-watts.com/insight/property-transfers-divorce-sdlt-cgt/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: explicit Sch 3 para 3 verbatim citation (most competitor pieces paraphrase as "transfers on divorce are exempt"); explicit "agreement in contemplation" wider-scope treatment; explicit third-party-transfers-NOT-covered surface; explicit mortgage-assumption HMRC concessional treatment; explicit Scottish/Welsh jurisdictional divergence.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "SDLT divorce property transfer", "Sch 3 para 3 SDLT exemption", "stamp duty separation agreement property", "SDLT on house transfer divorce".*

---

## Closest existing pages

- `cgt-divorce-property-transfer-tax-implications` (0.12 cannibal — adjacent CGT-side page; C7 differentiates on SDLT-side primary focus; cross-link both directions).
- `sdlt-sub-sale-relief-mechanics` (0.21 cannibal — **false-positive**; sub-sale relief is FA 2003 s.45A territory, unrelated).
- `sdlt-on-probate-property-transfers` (0.09 cannibal — adjacent SDLT exemption mechanic; cross-link).
- `gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics` (Wave 6 — cross-link for third-party-transfer route since Sch 3 para 3 doesn't cover transfers to children).

**Cannibalisation discipline:**
- C7 is the SDLT-primary divorce-transfer mechanic. Cross-link existing CGT-divorce page; do not re-walk CGT-side arithmetic in depth.
- C7 must not stray into Wave 6 GROB s.102 territory (separate IHT-side gifting mechanic).

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch.

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory:**
- FA 2003 Sch 3 para 3 verbatim (SDLT divorce/separation exemption): https://www.legislation.gov.uk/ukpga/2003/14/schedule/3
- MCA 1973 s.22A (maintenance pending suit): https://www.legislation.gov.uk/ukpga/1973/18/section/22A
- MCA 1973 s.23A (lump sum orders): https://www.legislation.gov.uk/ukpga/1973/18/section/23A
- MCA 1973 s.24A (property adjustment orders): https://www.legislation.gov.uk/ukpga/1973/18/section/24A
- CPA 2004 Sch 5 (civil partnership financial relief): https://www.legislation.gov.uk/ukpga/2004/33/schedule/5
- TCGA 1992 s.58 (spouse no-gain-no-loss — extended by FA 2023 to year-of-permanent-separation + 2 further tax years): https://www.legislation.gov.uk/ukpga/1992/12/section/58
- TCGA 1992 s.225B (main-residence on divorce — PPR election extended): https://www.legislation.gov.uk/ukpga/1992/12/section/225B
- LBTT(S)A 2013 Sch 1 para 6 (Scottish equivalent): https://www.legislation.gov.uk/asp/2013/11/schedule/1
- LTTA 2017 Sch 3 para 6 (Welsh equivalent): https://www.legislation.gov.uk/anaw/2017/1/schedule/3

**HMRC manuals:**
- SDLTM04030 (SDLT divorce/separation relief): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm04030
- CG22420+ (CGT spouse no-gain-no-loss + divorce): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg22420
- CG65356+ (PPR on divorce — s.225B): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg65356

**Cross-references in house_positions.md:** §1.D (primary verbatim lock); §1.F (do-not-write list); §22.5 (spouse exemption — IHT-side cross-link for full divorce-tax-stack); §24 (Wave 5 spouse mechanics — cohabitant divergence).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 3 para 3 verbatim against legislation.gov.uk. Verify FA 2023 extension to s.58 spouse no-gain-no-loss (year-of-permanent-separation + 2 further tax years from 6 April 2023). Verify s.225B mechanics. Verify HMRC concessional treatment of mortgage-assumption-as-consideration via SDLTM04030.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the Sch 3 para 3 scope walkthrough (high-intent: "is your settlement in scope?")
  - After the third-party-transfer carve-out warning (high-intent: "transferring to trust for children defeats the exemption")
  - After the full SDLT + CGT + IHT stack worked example (high-value: planning consultation)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C7 is the SDLT-primary divorce-transfer mechanic. Read CGT-divorce existing page + adult-children gifting page before writing. Forward-link, don't duplicate.

### House positions
- **§1.D is your primary working detail (verbatim-locked).** §1.F forbids: "Sch 3 para 3 covers transfers to children" (FALSE — third-party out of scope); "requires Decree Absolute" (FALSE — agreement in contemplation suffices).
- **CRITICAL drift to avoid:** The "agreement in contemplation of dissolution" wider scope is the operational gold — surface clearly. Third-party transfers (to children, to trust, to new partner) FALL OUTSIDE Sch 3 para 3 entirely and pay SDLT on full consideration.

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the operational decision (when is SDLT chargeable on a divorce-related transfer, and which agreement form keeps it inside the exemption), not with "What is SDLT".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §1 + §1.A-§1.F + §1.G is your primary working detail for Bucket C Wave 7 SDLT cluster.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify Sch 3 para 3 verbatim + FA 2023 s.58 extension + s.225B mechanics at write time.**
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
