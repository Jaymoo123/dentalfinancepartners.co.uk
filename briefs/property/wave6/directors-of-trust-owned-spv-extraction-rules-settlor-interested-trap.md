# Wave 6 brief: directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap

**Site:** property
**Bucket:** A (LtdCo extraction-sequence pillar)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap

---

## Manager pre-decisions

- **Suggested slug:** `directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** A (LtdCo extraction-sequence pillar)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> **SEQUENCING CONSTRAINT (per Stage 1 §16.32 coordination notes — LOAD-BEARING):** A10 must be written **LAST in Session A on the A-branch, AFTER Session B's B4 (settlor-interested IHT+CGT trifecta) and B7 (settlor-interest + GROB double-trap) have shipped on B-branch.** A10 cites B4 + B7 for trust-side IHT context; A4 must include forward-links to both. Manager applies back-patches at wave merge per §16.32.
>
> A10 sits at the A↔B seam: where an SPV is **held by a discretionary trust**, the extraction sequence changes radically. Three load-bearing mechanics shift the answer versus a personal-owned SPV: (i) **dividends to trust trigger trust-rate income tax** at the trust rate applicable to trusts — verified at https://www.legislation.gov.uk/ukpga/2007/3/section/479 on 2026-05-23 ("Trustees' accumulated or discretionary income to be charged at special rates"); the dividend trust rate currently sits at 39.35% (the same as the additional dividend rate), but the trust does not have access to the £500 dividend allowance — so even small trust-level dividends face the full additional rate; (ii) **where the settlor or settlor's spouse / minor children are beneficiaries, ITTOIA 2005 s.624 (settlor-retained interest) or s.629 (minor child)** attribute income back to the settlor — defeating the structure for income-tax purposes (per house position §22.9 + §22.10); (iii) **salary / director-fee routes survive intact** because they're employment income to the director-individual, not trust income, and they sit outside the s.624 / s.629 attribution net. The page walks the differential outcomes versus personal-owned-SPV across the six extraction routes (DLA, dividend, salary, pension, buyback, MVL) with anonymised worked examples.
>
> The pure-A framing is preserved (this is the extraction lens, not the IHT lens); B4 + B7 carry the IHT-lens depth. Cross-references house position §22.12 (settlor-interested trusts for IHT — relevant property regime + new s.48ZA long-term-resident test from FA 2025) and §22.13 (trust-vs-FIC decision boundary).

If your reasoning suggests the slug / category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Bucket-fit decision: A10 lands in A (extraction lens, even though trust-owned); B-cluster pages cover the IHT-side mechanics. Bidirectional cross-link with B4 + B7. Sequencing-strict: do not start A10 until B4 + B7 are confirmed shipped on B-branch.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- **Replacement candidates for session SERP search at write time:** "discretionary trust owns SPV extraction property"; "trust-owned company directors dividend trust rate s.479"; "settlor-interested trust SPV s.624 attribution income tax"; "trust-held company extraction rules property landlord".
- Session expected to do targeted SERP searches at write time and document choices in the work-log.

**Stage 2 verification note:** the trust-owned-SPV extraction niche is very thinly covered (most trust-cluster content focuses on direct-property trust structures, not trust-as-shareholder). Session relies on legislation + house position §22.9-§22.13 citations.

**Fetch + read + extract instruction (session):** Run targeted SERP searches at write time for replacement URLs. Cross-check every claim against legislation.gov.uk for ITA 2007 ss.479-481 (trust rates), ITTOIA 2005 s.624 + s.629 (settlements attribution), IHTA 1984 s.49(1A) (post-22-March-2006 IIP narrowing — verified 2026-05-23), CTA 2010 s.456 + s.457 (close-company interest on directors' loans where company controlled by trust — verify exact provision at write time), and HMRC TSEM5100 (settlor-interested chapter).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "trust-owned SPV extraction property", "discretionary trust company directors income", "settlor-interested SPV income attribution s.624", "trust rate dividend SPV extraction".*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `fic-vs-discretionary-trust-property-comparison` (Wave 1 C7) — structural comparison; A10 is the operational extraction-from-trust-owned-SPV.
2. Wave 6 B1 (sibling pillar — trust-route pillar; A10 forward-links for the trust-architecture context).
3. **Wave 6 B4 (cross-bucket sibling, SHIPPED FIRST on B-branch per sequencing constraint)** — B4 is the IHT+CGT trifecta on settlor-interested trusts. A10 forward-links B4 for the IHT side; B4 should back-link to A10 for the extraction side (INTERNAL_LINK flag at wave merge).
4. **Wave 6 B7 (cross-bucket sibling, SHIPPED FIRST on B-branch per sequencing constraint)** — B7 is the settlor-interest + GROB double-trap. A10 forward-links B7 for the double-trap IHT mechanics; B7 should back-link to A10 for the extraction side (INTERNAL_LINK flag at wave merge).
5. `iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4 C10) — entry IHT charge on settlement into discretionary trust; A10 is the post-entry operating angle. Forward-link.
6. Wave 6 A1 (sibling pillar) — A10 sits within A1's six-route framework with the trust-owned overlay. Mandatory back-link.

**Cannibalisation discipline:**
- A10 stays at the trust-owned-SPV extraction mechanic level. It does NOT re-walk trust IHT mechanics (defer to Wave 6 B4 / B7), entry charge on settlement (defer to Wave 4 C10), or FIC-vs-trust structural choice (defer to Wave 1 C7).

---

## Redirect overlap (on launch)

Stage 2 scan of `Property/web/src/middleware.ts` for tokens `trust-owned-spv`, `discretionary-trust-spv`, `settlor-interested-extraction`: no overlapping legacy slugs.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite.

- [ITA 2007 s.479 "Trustees' accumulated or discretionary income to be charged at special rates"](https://www.legislation.gov.uk/ukpga/2007/3/section/479) — trust rates gateway
- [ITA 2007 ss.480-481 (Trust rate categories)](https://www.legislation.gov.uk/ukpga/2007/3/part/9/chapter/3) — chapter 3 framework
- [ITTOIA 2005 s.624 "Income where settlor retains an interest"](https://www.legislation.gov.uk/ukpga/2005/5/section/624) — settlor-attribution income tax
- [ITTOIA 2005 s.629 "Income paid to relevant children of settlor"](https://www.legislation.gov.uk/ukpga/2005/5/section/629) — minor-child attribution
- [IHTA 1984 s.49 + s.49(1A)](https://www.legislation.gov.uk/ukpga/1984/51/section/49) — IIP treatment + post-22-March-2006 narrowing
- [IHTA 1984 s.48ZA NEW (post-FA-2025 long-term-resident excluded property test)](https://www.legislation.gov.uk/ukpga/1984/51/section/48ZA) — per house position §22.12; cite where reader is offshore-trust or non-resident
- [CTA 2010 ss.456-457 (Exceptions to s.455 + interest interaction where company controlled by trust)](https://www.legislation.gov.uk/ukpga/2010/4/section/456) — verify exact provision applicable at write time
- [HMRC TSEM5100+ (Settlor-interested trusts)](https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem5100) — HMRC interpretive overlay
- [HMRC TSEM3000+ (Trust rates of income tax)](https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem3000) — trust-rate framework

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every figure against current gov.uk at write time:
- Dividend trust rate (currently 39.35% per house position §21.4 / ITA 2007 s.479; verify against gov.uk).
- Trust rate (currently 45% on non-dividend non-savings income above £1k; verify against gov.uk).
- £1,000 trust standard rate band (ITA 2007 s.491 — verify exact section at write time).
- Trust has NO dividend allowance (£500 dividend allowance applies to individuals only).
- Personal dividend rates 10.75 / 35.75 / 39.35 post-6-April-2026 (§21.4 F-20 correction; relevant for the personal-owned-SPV comparison).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Front-load the trust-rate-on-trust-dividends framing — most readers underestimate how punitive trust-level dividend tax is versus personal-level.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-2 inline `<aside>` CTAs: after the trust-rate framing, after the salary-survives-intact subsection.
- Vary opening sentence. A10 should open from "when the SPV is held by a discretionary trust, the extraction sequence changes at three load-bearing points — the trust-rate dividend hit at trust level, the settlements-legislation income attribution if the settlor or spouse / minor child can benefit, and the survival of the salary route as the cleanest extraction path".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 11-13 FAQs.

### Cannibalisation
- Read Wave 6 B4 + B7 (cross-bucket siblings, must be shipped first), Wave 1 C7, Wave 4 C10, Wave 6 A1 carefully before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- §21.1 (DLA — DLA route survives intact in trust-owned-SPV; same as personal-owned).
- §21.4 (post-2025/26 rates including trust-rate cross-reference).
- §21.5 (CIHC mechanics).
- §22.9 (ITTOIA 2005 s.624 settlements legislation income attribution — full detail).
- §22.10 (ITTOIA 2005 s.629 minor-child attribution).
- §22.12 (IHTA 1984 s.49 IIP + new s.48ZA long-term-resident test).
- §22.13 (trust-vs-FIC decision boundary).

### Anti-templating
- A10's natural H2 spine: (1) the trust-owned-SPV structure context — when this exists (Wave 1 C7 FIC-vs-trust decision led to trust route), (2) **mechanic 1 — trust-rate dividend tax** at trust level (ITA 2007 s.479 + s.491 £1k standard rate band; no dividend allowance), (3) **mechanic 2 — settlor-attribution under ITTOIA 2005 s.624 (or s.629 for minor children)** where settlor / spouse / minor child can benefit (forward-link Wave 6 B4 for the IHT trifecta context), (4) **mechanic 3 — the salary / director-fee survival route** — employment income is the director's, not trust income, sits outside s.624 net, (5) DLA route — survives intact (same as personal-owned SPV), (6) pension contribution route — employer pension contributions to director are corporate-side deductions, not trust dividends; route survives, (7) MVL / wind-up route — trust-shareholder treatment on capital distribution (forward-link Wave 6 A4), (8) the settlor-interested + GROB double-trap (forward-link Wave 6 B7) when the underlying SPV holds property the settlor occupies, (9) decision-tree quick-reference vs personal-owned-SPV.
- Vary FAQ phrasing.

### Quality bar
- Word count: 3,000-3,500 body.
- FAQs: 11-13.
- New external authority links: 6-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start. §21.5 + §22.9 + §22.10 + §22.12 + §22.13 primary.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`. **CONFIRM B4 + B7 ARE SHIPPED ON B-BRANCH BEFORE STARTING (manager-side check).**
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** Stage 1 pool sparse; session does targeted SERP at write time.
5. **Read the closest existing pages.** Particular care: Wave 6 B4 + B7 (cross-bucket dependencies).
6. **Plan the rewrite/write.** Three-mechanic spine with trust-vs-personal comparison.
7. **Verify factual claims.** §16.35 per-write.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise CROSS_BUCKET_BACKLINK for Wave 6 B4 + B7 bidirectional back-patches at wave merge per §16.32).
18. **Discovery log.**
19. **Next page** (A10 is LAST in Bucket A; back-patch + post-write tracker close).

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Meta description chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification

### §16.35 numeric verification log (every figure cited)

### Flags raised to wave6_site_wide_flags.md

### 2-3 sentence summary
