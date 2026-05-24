# Wave 7 brief: employee-ownership-trust-eot-property-spv-exit-mechanics-tcga-1992-s236

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/employee-ownership-trust-eot-property-spv-exit-mechanics-tcga-1992-s236.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/employee-ownership-trust-eot-property-spv-exit-mechanics-tcga-1992-s236

---

## Manager pre-decisions

- **Suggested slug:** `employee-ownership-trust-eot-property-spv-exit-mechanics-tcga-1992-s236`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §22.18 (EOT property-SPV exit — verbatim) + §22.20 (do-not-write list)
- **Framing differentiator (~50 words, Stage 1a-locked):**

> TCGA 1992 ss.236H-236U EOT relief range — owner-managed-company disposal to EOT at no-gain-no-loss. **CRITICAL gating constraint: trading-company requirement (s.236I) — property investment / letting business is NOT trading per CG65700+. Most landlord SPVs do NOT qualify.** Where it does apply (property development, property-management services, property professional services, mixed SPVs with substantial trading activity): s.236M "more than 50%" four-pronged controlling-interest test (NOT "at least 50%" per HP-lock catch #10 — equal 50/50 splits FAIL). FA 2025 s.31 + Sch 6 reforms commenced 6 April 2025: UK-resident trustee requirement, independence test, consideration tightening, anti-avoidance. ITEPA 2003 s.312A £3,600 per employer per tax year bonus exemption (NOT £4,800 yet pre-FA-2026 Royal Assent — verify at write time). NIC still applies (income-tax exemption only). NOT CTA 2010 ss.464M-Q which does NOT exist (HP-lock catch #4 — common myth).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C3 ships **independently within Bucket C** (no strict sequencing dependency with C1/C2). Drift-prone territory — practitioner content frequently mis-cites a non-existent "CTA 2010 ss.464M-Q" for EOT bonus exemption (correct citation is ITEPA 2003 s.312A). Also frequently misstates controlling-interest test as "at least 50%" (correct: "more than 50%" — 50/50 splits FAIL).

**HOUSE_POSITION_CONFLICT signal context:** §22.18 is the primary anchor and verbatim-locked. **The trading-company gating constraint is the operational gate** — most landlord SPVs are investment companies (rental property = investment per CG65700+, not trading) and therefore do NOT qualify for EOT relief at all. Frame the page as "is EOT available to property SPVs?" → "rarely, only for trading SPVs (development / management services / professional services)" → then mechanics for those that qualify.

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of the trading-company gating constraint, treatment of s.236M controlling-interest test, treatment of FA 2025 s.31 reforms, treatment of ITEPA s.312A bonus.

- https://www.ukpropertyaccountants.co.uk/employee-ownership-trust-property/
- https://www.uklandlordtax.co.uk/eot-property-company-disposal/
- https://www.shipleys.com/insights/employee-ownership-trust-mechanics/
- https://www.blickrothenberg.com/insights/eot-cgt-relief-after-fa-2025/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: **explicit gating-constraint lead** ("most landlord SPVs do NOT qualify"); explicit ss.236H-236U citation range; explicit FA 2025 s.31 + Sch 6 reform walkthrough (UK-resident trustee, independence, consideration tightening); explicit ITEPA s.312A £3,600 figure with NIC-still-applies caveat; explicit refutation of the CTA 2010 ss.464M-Q myth.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "EOT property company exit", "employee ownership trust CGT relief", "TCGA s 236H disposal", "FA 2025 EOT reforms".*

---

## Closest existing pages

- `directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap` (Wave 6 — 0.16 cannibal, adjacent trust-owned-SPV mechanic; C3 forward-links for the trust-owned-SPV context but does NOT overlap).
- `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (0.24 cannibal — **false-positive**; token overlap only).
- `spv-property-investment-special-purpose-vehicle-guide` (0.16 cannibal — adjacent SPV pillar; C3 forward-links for "if your SPV is investment-only, EOT is not available").
- `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` (Wave 6 — adjacent exit route; cross-link for "alternative exit routes if EOT is not available").

**Cannibalisation discipline:**
- C3 is the EOT-specific mechanic. Do NOT re-walk MVL territory (separate page). Do NOT re-walk discretionary-trust 20% entry-charge (separate page).
- C3 must not stray into Wave 6 C1 (extracting-cash-from-property-spv-extraction-sequence-pillar) territory (separate exit/extraction route).

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch.

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory:**
- TCGA 1992 s.236H (EOT relief — entry): https://www.legislation.gov.uk/ukpga/1992/12/section/236H
- TCGA 1992 s.236I (trading-company / trading-group requirement): https://www.legislation.gov.uk/ukpga/1992/12/section/236I
- TCGA 1992 s.236M (controlling-interest test — "more than 50%"): https://www.legislation.gov.uk/ukpga/1992/12/section/236M
- TCGA 1992 s.236N (limited-participation requirement — original beneficial owners not controlling): https://www.legislation.gov.uk/ukpga/1992/12/section/236N
- TCGA 1992 s.236O (disqualifying events + claw-back): https://www.legislation.gov.uk/ukpga/1992/12/section/236O
- ITEPA 2003 s.312A (EOT bonus IT exemption — £3,600 per employer per tax year): https://www.legislation.gov.uk/ukpga/2003/1/section/312A
- FA 2025 s.31 (EOT reforms commencement 6 April 2025): https://www.legislation.gov.uk/ukpga/2025/8/section/31
- FA 2025 Sch 6 (EOT reform detail — Part 1 CGT, Part 2 IT): https://www.legislation.gov.uk/ukpga/2025/8/schedule/6

**HMRC manuals:**
- CG65700+ (trading vs investment — property letting is investment, not trading): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg65700
- CG67800+ (EOT disposal relief mechanics): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg67800
- EIM03050+ (ITEPA s.312A bonus exemption mechanics): https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim03050

**Cross-references in house_positions.md:** §22.18 (primary verbatim lock); §22.20 (do-not-write list — multiple EOT-specific forbidden statements); §22.7 (trust frameworks general); §11 (CGT framework general).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify ss.236H-236U range against current TCGA 1992. Verify s.236M "exceeds 50%" wording verbatim. Verify FA 2025 s.31 + Sch 6 commencement (6 April 2025). **CRITICAL** verify ITEPA s.312A £3,600 figure — if FA 2026 c. 11 has received Royal Assent + commenced by write date and uplifts the figure, update. Verify CG65700+ trading-vs-investment line (property letting = investment).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the trading-vs-investment gating-constraint section (high-intent: "does my SPV qualify?")
  - After the s.236M four-pronged controlling-interest test (high-value: planning consultation)
  - After the FA 2025 reform walkthrough (high-intent: "do post-April-2025 disposals still work?")
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C3 is the EOT-specific mechanic. Read Wave 6 trust-owned-SPV + MVL pages before writing. Forward-link, don't duplicate.

### House positions
- **§22.18 is your primary working detail (verbatim-locked).** §22.20 forbids: "EOT relief on investment companies" (FALSE — trading-only); "EOT trustees offshore" (FALSE post-FA-2025 — UK-resident trustee mandatory); "s.312A is £4,800" (FALSE pre-FA-2026 Royal Assent + commencement); "controlling interest is at least 50%" (FALSE — "more than 50%"); "CTA 2010 ss.464M-Q govern bonus exemption" (FALSE — those sections don't exist; ITEPA s.312A is correct).
- **CRITICAL drift to avoid:** The trading-vs-investment gating is the operational lead — lead the page with this constraint, not with the mechanics.

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the gating-constraint reality ("most landlord SPVs do not qualify for EOT relief; here is why and what to do if yours does"), not with "What is an EOT".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §22.16-§22.18 + §22.20-§22.21 is your primary working detail for Bucket C Wave 7.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify trading-vs-investment line at CG65700+ + s.236M "more than 50%" + ITEPA s.312A £3,600 + FA 2025 s.31 commencement at write time.**
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
