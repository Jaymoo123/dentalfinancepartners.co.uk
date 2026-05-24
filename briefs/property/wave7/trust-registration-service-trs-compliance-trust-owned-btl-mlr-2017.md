# Wave 7 brief: trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017

---

## Manager pre-decisions

- **Suggested slug:** `trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §22.16 (TRS — MLR 2017 reg 45 + reg 76 + TRSM80020) + §22.20 (do-not-write list)
- **Framing differentiator (~50 words, Stage 1a-locked):**

> TRS registrable trust classes under MLR 2017 reg 45 — taxable relevant trusts; non-UK express trusts post-October 2020 5MLD transposition; non-UK trusts acquiring UK land. 90-day registration deadline (not 30/60/180). **Penalty regime is reg 76 + £5,000 max DISCRETIONARY per TRSM80020 — NOT a graduated £100/£200/£300 tariff per §22.16 / HP-lock catch #5.** Update obligations on beneficial-ownership change within 90 days. Operational walkthrough: trust-owned BTL portfolio registration mechanics, what "express trust" means for declared-trust + bare-trust-of-land scenarios, Sch 3A narrow exclusions, agent-vs-trustee role assignment. Distinguished from IPDI/QIIP trust registration (C2 cross-link). NOT writing IPDI mechanics (C2 covers) or EOT (C3 covers).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C1 is the **first ship within Bucket C trust cluster**; C2 IPDI/QIIP cites C1 forward for the trust-registration obligation that applies to IPDI trusts. Drift-prone territory — practitioner content frequently conflates TRS with HMRC trust-tax registration (separate regime). Reg 45 + reg 76 + TRSM80020 are the operative authorities; any competitor source asserting "graduated £100/£200/£300 penalty" is wrong.

**HOUSE_POSITION_CONFLICT signal context:** §22.16 is the primary anchor and is verbatim-locked. Note: §22.20 do-not-write list explicitly forbids "TRS penalties are graduated £100/£200/£300" + "30 days to register" + "bare trusts exempt from TRS". Sch 3A exclusions are narrow (charitable trusts, pension scheme trusts, trusts imposed by statute, certain co-ownership trusts where the legal + beneficial owners are identical) and must NOT be paraphrased as "bare trusts exempt".

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of reg 45 registrable classes, treatment of reg 76 penalty, treatment of Sch 3A exclusions, treatment of 90-day deadlines (initial + update).

- https://www.ukpropertyaccountants.co.uk/trust-registration-service-rental-property/
- https://www.uklandlordtax.co.uk/trs-trust-registration-landlord/
- https://www.shipleys.com/insights/trust-registration-service-and-property-trusts/
- https://www.haines-watts.com/insight/trs-registration-property-trusts/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: explicit reg 45 / reg 76 / TRSM80020 citation stack (most competitor pieces cite "TRS guidance" generically); explicit Sch 3A narrow-exclusion treatment; explicit £5,000-max-discretionary penalty framing (most competitors paraphrase as graduated tariff — wrong).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "TRS registration trust BTL", "trust registration service 90 days", "MLR 2017 reg 45 registration", "TRS penalty late registration property trust".*

---

## Closest existing pages

- `directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap` (Wave 6 — 0.11 cannibal score, adjacent SPV/trust mechanic; C1 forward-links from the trust-owned-portfolio context).
- `iht-clt-property-discretionary-trust-20-percent-entry-charge` (0.08 cannibal — adjacent discretionary-trust IHT mechanic; C1 forward-links for the lifetime-trust registration case).
- `fic-vs-discretionary-trust-property-comparison` (0.07 cannibal — adjacent comparison; C1 forward-links for "if you go trust-route, here is the registration obligation").
- C2 (Wave 7 IPDI/QIIP) — cite C1 forward; C1 ships first.

**Cannibalisation discipline:**
- C1 is the TRS compliance mechanic. Do NOT re-walk discretionary-trust 20% entry-charge arithmetic (separate page covers). Do NOT re-walk trust-vs-FIC decision (separate page covers).
- C1 must not stray into FATCA / CRS offshore-trust reporting territory (separate regime; flag if reached).

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch unless an in-flight Wave 7 sibling lands a TRS-adjacent slug — confirm at write time.

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory:**
- MLR 2017 reg 45 (TRS registration): https://www.legislation.gov.uk/uksi/2017/692/regulation/45
- MLR 2017 reg 76 (penalty): https://www.legislation.gov.uk/uksi/2017/692/regulation/76
- MLR 2017 Sch 3A (TRS exclusions — 5MLD transposition): https://www.legislation.gov.uk/uksi/2017/692/schedule/3A
- IHTA 1984 s.49(1) (deemed beneficial entitlement — interaction with TRS registration of IPDI trusts): https://www.legislation.gov.uk/ukpga/1984/51/section/49

**HMRC manuals (Trust Registration Service Manual):**
- TRSM80020 (penalty operational tariff — verbatim £5,000 max DISCRETIONARY framing): https://www.gov.uk/hmrc-internal-manuals/trust-registration-service-manual/trsm80020
- TRSM23020 (registrable trusts under reg 45): https://www.gov.uk/hmrc-internal-manuals/trust-registration-service-manual/trsm23020
- TRSM24000 (non-UK trusts — UK-land-acquisition route): https://www.gov.uk/hmrc-internal-manuals/trust-registration-service-manual/trsm24000
- TRSM32010 (Sch 3A exclusions — narrow scope): https://www.gov.uk/hmrc-internal-manuals/trust-registration-service-manual/trsm32010

**Cross-references in house_positions.md:** §22.16 (primary verbatim lock); §22.17 (IPDI/QIIP — TRS registration applies to IPDI trusts; C2 cross-link); §22.20 (do-not-write list).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify TRSM80020 verbatim wording ("case-by-case basis" + £5,000 framing) against current gov.uk at write time. Verify MLR 2017 has not been amended by FA 2026 c. 11 (Royal Assent status check). Verify 90-day deadline (not 30, not 60, not 180) against reg 45 verbatim.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the reg 45 registrable-classes walkthrough (high-intent: "is my trust within scope?")
  - After the reg 76 / TRSM80020 penalty section (high-intent: late-registration rescue)
  - After the trust-owned-BTL operational walkthrough (high-value: practical handover moment)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C1 is the TRS compliance mechanic. Read C2 brief + existing directors-of-trust-owned-SPV page before writing. Forward-link, don't duplicate.

### House positions
- **§22.16 is your primary working detail (verbatim-locked).** Do NOT paraphrase the penalty regime; cite reg 76 + TRSM80020 verbatim.
- **CRITICAL drift to avoid:** do NOT state penalty is graduated £100/£200/£300 (HP-lock catch #5). Do NOT state 30-day deadline (it's 90). Do NOT state "bare trusts exempt from TRS" (only narrow Sch 3A exclusions apply; most bare-trust-of-land arrangements ARE registrable).

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the operational decision question ("does your trust need to register and by when?"), not with "What is the TRS".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §22.16-§22.18 + §22.20-§22.21 is your primary working detail for Bucket C Wave 7.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify TRSM80020 verbatim + reg 45 + reg 76 + Sch 3A exclusions at write time.**
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
18. Log discoveries to `docs/property/wave7_discovery_log_session_<X>.md` (session letter assigned at dispatch).
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
