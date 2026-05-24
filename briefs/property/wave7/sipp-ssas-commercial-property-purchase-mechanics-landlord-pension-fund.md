# Wave 7 brief: sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund

---

## Manager pre-decisions

- **Suggested slug:** `sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §22.21 (FA 2004 Sch 29A taxable property regime — mini-lock added 2026-05-24 commit `6cbb0ed`)
- **Framing differentiator (~50 words, Stage 1a-locked):**

> FA 2004 Sch 29A taxable property regime: **residential property = taxable** (unauthorised payment charge + scheme sanction charge stack to 55-70% effective rate); **commercial property = excluded** (Sch 29A para 7 carve-out). Investment-regulated schemes only (SIPP + SSAS, not occupational DB schemes). In-specie contributions (transfer existing commercial property at market value into pension fund). Member loan limitations: **SIPP cannot make member loans; SSAS can make loans to sponsoring employer up to 50% of net asset value** with 5-year maximum, market-rate interest, first-charge security, equal-instalment-repayment conditions. Connected-party rent-at-market-value requirement (full market rent must be paid by tenant; PTM126000+ context). FA 2024 lump-sum-allowance architecture replacing the abolished Lifetime Allowance from 6 April 2024. NOT writing pension-rental-income MTD treatment (Wave 4 page covers).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** **C10 was LOW CONFIDENCE at Stage 1b** — manager-resolved by adding §22.21 mini-lock at commit `6cbb0ed`. SIPP/SSAS framework is now HP-locked. **However, statutory citation specifics (exact FA 2004 section ranges for taxable-property regime + PTM page numbers + lump-sum-allowance figures) still need write-time verification per §16.35.**

**HOUSE_POSITION_CONFLICT signal context:** §22.21 mini-lock is the primary anchor. The "suitable for dwelling use" test in Sch 29A mirrors SDLT s.116(1)(a) per §1.C Bewley — narrow exception only for substantially uninhabitable / under-development properties (so an SIPP/SSAS "mixed-use" property purchase has a Bewley-adjacent test). Mini-lock added 2026-05-24 to address LOW CONFIDENCE pick.

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of taxable-property regime, treatment of in-specie contributions, treatment of SSAS member-loan mechanics, treatment of connected-party rent requirements.

- https://www.ukpropertyaccountants.co.uk/sipp-ssas-commercial-property-purchase/
- https://www.uklandlordtax.co.uk/pension-commercial-property-mechanics/
- https://www.shipleys.com/insights/sipp-ssas-commercial-property-acquisition/
- https://www.haines-watts.com/insight/sipp-ssas-property-purchase-mechanics/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: explicit FA 2004 Sch 29A citation (most competitor pieces describe taxable-property at high level only); explicit 55-70% effective rate framing for residential purchase via SIPP (unauthorised payment + scheme sanction stack); explicit SSAS 50%-NAV-loan conditions (5-year max + market-rate + first-charge + equal-instalment); explicit FA 2024 lump-sum-allowance replacement of LTA.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "SIPP commercial property purchase", "SSAS member loan property", "FA 2004 Sch 29A taxable property", "in-specie pension commercial property".*

---

## Closest existing pages

- `mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment` (0.21 cannibal — Wave 4 page; C10 differentiates on **purchase mechanics + in-specie + SSAS loan depth** distinct from MTD-treatment focus; cross-link both directions).
- `vat-option-to-tax-commercial-property-mechanics-election-revocation` (0.19 cannibal — adjacent commercial-property mechanic; cross-link for "VAT and SIPP commercial property purchase interaction").
- `commercial-property-fixtures-claim-s198-election-purchase-mechanics` (0.18 cannibal — Wave 6 C6; cross-link for "if your SIPP/SSAS purchases a commercial property with embedded fixtures, the s.198 election mechanic applies").
- `iht-spouse-exemption-second-death-property-portfolio-window-mechanics` (0.18 cannibal — adjacent IHT mechanic; cross-link for "pension as IHT-efficient property-holding wrapper, pre/post April 2027 framing").

**Cannibalisation discipline:**
- C10 is the **purchase + in-specie + member-loan depth** piece. Cross-link MTD page; do not re-walk MTD-treatment territory.
- C10 must not stray into FA 2024 lump-sum-allowance internals beyond the property-purchase relevance — that is a separate pension-tax topic.

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch.

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory (write-time verification mandatory per §16.35 + §22.21 LOW-CONFIDENCE flag):**
- Finance Act 2004 Part 4 (pension schemes; ss.149-274 — verify exact taxable-property section ranges at write time): https://www.legislation.gov.uk/ukpga/2004/12/part/4
- FA 2004 Sch 29A (taxable property — verify): https://www.legislation.gov.uk/ukpga/2004/12/schedule/29A
- FA 2004 s.182 (member loans + scheme sanction charge): https://www.legislation.gov.uk/ukpga/2004/12/section/182 (verify)
- FA 2024 (lump-sum-allowance replacing abolished LTA — verify exact provisions at write time)

**HMRC manuals (Pensions Tax Manual — verify specific page ranges at write time):**
- PTM landing page: https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual
- PTM125000+ (taxable property regime — verify): https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm125000
- PTM126000+ (connected-party rent requirements — verify): https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm126000
- PTM131000+ (loans to sponsoring employers SSAS): https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm131000 (verify exact page)

**Cross-references in house_positions.md:** §22.21 (primary verbatim mini-lock); §15.5 (pensions in IHT — pre/post-April 2027 framing); §19.12 (pension funds + rental property MTD); §1.C (Bewley — Sch 29A "suitable for dwelling use" test mirrors SDLT s.116(1)(a)).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory; LOW-CONFIDENCE pick flagged at Stage 1b):** This brief is one of two LOW-CONFIDENCE picks resolved via mini-lock at Stage 1b. Write-time verification MANDATORY for: (a) FA 2004 Sch 29A taxable-property scope (residential property = unauthorised payment + scheme sanction stack); (b) member loan limits — SIPP no member loans; SSAS 50% NAV loan to sponsoring employer with specific conditions (5-year max, market-rate interest, first-charge security, equal-instalment repayment); (c) in-specie contribution mechanics + market-value rule; (d) connected-party rent at full market value required (PTM126000+); (e) FA 2024 lump-sum-allowance framework replacing LTA. **If write-time verification surfaces drift between §22.21 mini-lock and current legislation/PTM, flag in `wave7_site_wide_flags.md` immediately.**

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the commercial-only / residential-prohibited framing (high-intent: "is the property I want commercial enough?")
  - After the in-specie contribution mechanic (high-value: practical handover moment)
  - After the SSAS 50%-NAV-loan section (high-intent: "can my SSAS lend to my trading company?")
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C10 is the purchase + in-specie + member-loan depth piece. Read MTD-pension page (Wave 4) before writing. Forward-link, don't duplicate.

### House positions
- **§22.21 is your primary working detail (verbatim mini-lock).** Mini-lock added 2026-05-24 to address LOW-CONFIDENCE Stage 1b pick.
- **CRITICAL drift to avoid:** SIPP cannot make ANY member loans (FA 2004 s.182 + reg) — only SSAS can lend, and only to sponsoring employer, only up to 50% NAV, only with five specific conditions. Residential property via SIPP/SSAS = unauthorised payment + scheme sanction = 55-70% effective rate (do not paraphrase as "residential is just disallowed"). Connected-party rent must be FULL MARKET — discounting fails the regime.

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the gating constraint (commercial property only — residential triggers 55-70% effective rate; here is the operational route for commercial), not with "What is a SIPP".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §22.16-§22.18 + §22.20-§22.21 is your primary working detail for Bucket C Wave 7.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35 + Stage 1b LOW-CONFIDENCE flag: MANDATORY write-time verification of FA 2004 Sch 29A scope + SSAS 50%-NAV-loan five conditions + in-specie market-value rule + PTM126000+ connected-party rent + FA 2024 lump-sum-allowance.**
8. Fetch a hero image from Pexels via fetch_image_for_post.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`. Must pass clean.
11. Verify (all six checks must pass): FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap. (None for this brief.)
13. Register the new page in `monitored_pages` via the Supabase _db helper.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include the tracker in your branch commit.
15. Fill in the per-page work-log at the bottom of this brief.
16. Mark done in `docs/property/wave7_page_tracker.md` with a 1-line Notes summary.
17. Append any site-wide flags to `docs/property/wave7_site_wide_flags.md` (LOW-CONFIDENCE pick — flag any §22.21 mini-lock drift discovered at write time).
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
