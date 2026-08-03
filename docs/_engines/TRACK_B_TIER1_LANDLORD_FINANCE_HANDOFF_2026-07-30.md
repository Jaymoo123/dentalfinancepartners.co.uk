# Track B Tier 1 — Landlord Finance on Property — Scoping Handoff

**Date:** 2026-07-30 · **For:** a fresh agent scoping + building the property-native landlord-finance cluster.
**Parent program:** [[adjacent_leadgen_finance_expansion]] · **Phase-0 (done):** `FINANCE_TAX_EXPANSION_HANDOFF_2026-07-30.md`.
**Host site:** property (Property Tax Partners, propertytaxpartners.co.uk) · **Audience:** UK landlords, BTL investors, property developers.

---

## 0. What this is (and the unlock)

Phase 0 shipped 66 pages + 6 calcs across specialist tax / business finance / exit / dental (all build-green, committed on `expansion/phase-0`, NOT yet deployed). It deliberately **excluded** the landlord commercial-finance + SPV/BTL clusters, calling them "IAR-gated, deferred."

**That framing over-blocked it.** After a compliance re-read, Track B splits into two tiers, and **Tier 1 is buildable now with no IAR**, on the exact compliant pattern already live for Business Finance:

- **Tier 1 (THIS handoff — build now, no IAR):** educational content + **business-purpose / company-gated** lead capture for **UNREGULATED** landlord finance: **SPV / ltd-co BTL mortgages, commercial mortgages, bridging (business purpose), development finance, portfolio / refinance**. Introducing these = not a regulated activity, same footing as the Business Finance cluster.
- **Tier 2 (NOT this handoff — IAR-gated):** the **consumer-BTL / regulated-mortgage** conversion only (accidental landlords, letting to family, first-charge residential). Needs an FCA-authorised principal (IAR) or gets dropped. **Fence it off.**

This is the biggest single prize in the expansion: SPV/BTL ~118,220/mo total, bridging ~18,100/mo, ltd-co/SPV cluster ~12-15k/mo. Property is the right host (its audience IS landlords).

---

## 1. Compliance boundary — BAKE INTO EVERY PAGE (the crux; get this right)

Operator is NOT a lawyer or accountant. This is the shape; the **estate solicitor signs off the lead-capture wording before any conversion CTA goes live** (the DSA / legal-review process already exists — see [[leadgen_data_sharing_agreement_pack]]). Content can publish now; regulated-adjacent CTA wording waits for sign-off.

1. **Educational content is not a financial promotion.** FSMA s21 restricts *inviting or inducing* someone into a controlled agreement. Explaining how bridging / SPV BTL / commercial finance works, rates, criteria, LTV, the tax angle = information. Publish freely.
2. **The s21 trigger is the CONVERSION step on a REGULATED product.** "Apply / get a quote / we connect you to a lender" for a *regulated* activity = financial promotion, needs an authorised person to make/approve it. Only there.
3. **Most landlord finance is UNREGULATED business lending** → introducing it is not regulated: **SPV/ltd-co BTL, commercial mortgages, bridging-for-business, development finance.** Company-gate the form (SPV / portfolio / business-purpose), keep it a **bare introduction**.
4. **The regulated slice (Tier 2, fence off):** consumer BTL (regulated mortgage contract — borrower/relative occupies), first-charge residential. Do NOT capture these leads until an IAR is secured. Where a page's topic touches consumer BTL, note the distinction and route the consumer away (do not present it as something we introduce), exactly like the Business Finance MCA/Start-Up-Loan fences.
5. **Do not tip into "arranging" (RAO Art 25):** pass a name + business-purpose gate only. No advising, negotiating, or packaging the deal.
6. s21 breach is a **criminal offence** — err toward education-now, regulated-conversion-after-sign-off.

---

## 2. Existing research to USE (do not redo)

In `expansion_research/dental_finance/` (yes, same dir as Phase 0):
- `landlord_commercial_finance_pages.csv` + `landlord_commercial_finance_universe.csv` — the mapped commercial-finance pages (bridging, development, commercial mortgage) with volumes/KD/secondary keywords/guardrails.
- `btl_pages.csv` + `btl_volumes.csv` — the SPV/BTL mortgage page map.
- `OPPORTUNITY_MAP.md`, `WIDE_FINDINGS.md`, `PAGE_PLAN_V2.md` — the ranked opportunity + full page plan (Track B section).
- `estate_corpus.json` + `s10_decannibalise.py` — the 15-site GSC de-cannibalisation base.

**First task:** pull these, filter to the Tier-1 (unregulated) pages, and RE-RUN de-cannibalisation against the CURRENT property corpus (Phase 0 added 15 specialist-tax pages; the seed-time de-cannib predates them). Verify live slugs on disk, do NOT trust the CSV blindly — Phase 0 found every cluster had more existing overlap than the seed flagged.

---

## 3. De-cannibalisation reality (load-bearing)

Property **already owns BTL/ltd-co TAX**: incorporation, SDLT, Section 24, CGT, "buy-to-let accountant [city]", portfolio tax planning, and now the Phase-0 specialist-tax cluster. Property does **NOT** rank for BTL/commercial **finance mechanics** (lenders, rates, LTV, deals, calculators) → the finance cluster is **net-new + additive**.

**GUARDRAIL:** keep the **tax decision** on the existing property pages; put **finance mechanics** on the new cluster; **cross-link, never duplicate**. The contested seam is SPV/incorporation *structuring* (property ranks it weakly) — do NOT build a competing "ltd vs personal tax" page; link to the existing one. Bridging-for-BTL (short-term) vs BTL mortgage (term) are distinct pages, cross-link.

---

## 4. Scope (Tier 1 only) — refine from the CSVs, but expect roughly

- **SPV / ltd-co BTL mortgages** cluster: pillar + how-SPV-BTL-mortgages-work, ltd-co BTL rates/lenders/LTV, SPV vs personal *for finance* (not tax), transferring to a company (finance side), first-time-landlord-limited-company mortgage, HMO/MUFB finance, holiday-let/serviced-accom finance.
- **Commercial mortgages** cluster: commercial mortgage guide, semi-commercial, mixed-use, commercial-for-landlords, owner-occupier vs investment.
- **Bridging (business purpose)** cluster: bridging finance guide, bridging for auction/BTL/refurb, bridge-to-let, regulated-vs-unregulated bridging (educational — fence the regulated).
- **Development finance** cluster: development finance guide, ground-up vs refurb, GDV/LTC mechanics, first-time developer.
- **Portfolio / refinance:** portfolio landlord finance, remortgaging a BTL portfolio, releasing equity, capital raising for the next purchase.

All **business-purpose / company-gated**. Sector/segment long-tail as topical authority (like Phase 0's `-for-X` pages) where volume supports.

**Calculators (Pattern A, property — `Property/web/src/lib/calculators/tools/*.ts` + registry):** BTL mortgage / affordability (ICR stress test), bridging cost, commercial mortgage, development finance (GDV/LTC), SPV setup + finance cost. Build tasks, not blog bodies.

---

## 5. Reuse the proven Phase-0 pipeline (do NOT reinvent)

Everything you need already exists in `expansion_research/dental_finance/briefs/`:
- **`WRITER_PLUMBING.md`** — the frontmatter contract (STANDARD_MANIFEST: required slug/title/date/category/metaDescription), flat-file rule (loaders are non-recursive — write to `content/blog/<slug>.md`, category is frontmatter not a folder), voice/quality bar, 2026/27 tax facts (WDA 14% + 40% FYA, etc.). **Update it for landlord-finance facts** (ICR stress rates, current BTL LTV norms, s24, MTD Apr 2026).
- **`validate_md.py`** — pre-build contract check. NOTE: the CI limit is metaDescription **≤155** / metaTitle ≤60 (validate_md's default was 160 — the CI gate `scripts/validate_blog_content.py` is stricter; trim to ≤152).
- **`fix_links.py`** — reuses `slug_resolver.normalise_links` to auto-fix cross-link category prefixes + flag invented/404 slugs. Run per-site AFTER the whole wave lands (siblings must exist first). Calculator links must be `/calculators/<slug>` not `/blog/...`; pillar links `/fundamentals/...` (generalist) — property has no fundamentals dir, pillars go in blog.
- The 4 Phase-0 cluster briefs are the **template** for your cluster-architecture briefs (angle, H2 outline, unique hook, internal + cross links, authority sources, lead-CTA, guardrail, FAQ stems, anti-sameness matrix, de-cannib map).

**Build method (locked estate rules):** Opus ARCHITECTS the cluster briefs; **one Opus subagent per page** writes the A* body (Opus-only for content); Sonnet builds calculators/config. Fan out in waves (per cluster) or a Workflow; validate → fix_links → `npm run build` gate per site. Verify every tax/finance fact against a live source before it anchors a page (Phase 0 caught WDA 18→14%, FHL 2025, EOT 50% this way). No em-dashes; faceless EEAT (operator not an accountant); anti-sameness on templated pages.

---

## 6. Property site plumbing specifics

- Content is **flat**: `Property/web/content/blog/<slug>.md` (loader `readdirSync`, non-recursive). URL = `/blog/<category-slug>/<slug>` built from the `category` frontmatter field.
- **New category needed.** Property's categories (in `Property/.../niche.config.json` `content_strategy.categories`, and the `[category]` route reads them) do NOT include a finance one. Add e.g. **"Landlord Finance"** (or "BTL Mortgages & Finance") to `niche.config.json` so the category index page + nav + breadcrumb generate — Phase 0 hit exactly this (a missing category → breadcrumb-index 404). Confirm `slugifyCategory` output matches your canonicals.
- Calculators auto-add to sitemap + get WebApplication schema via the registry — no separate step.
- Schema (Article/FAQPage/Breadcrumb) auto-emits from frontmatter `faqs:` — do NOT hand-write JSON-LD; leave `schema: ''`.
- **Property `llms.txt` + `llms-full.txt` are STATIC** (`Property/web/public/`) — hand-update them with the new calcs + category + authority topics (generalist/dentists auto-regen via route factory, property does not).
- Lead form: property lead source `property`; segment fields business-purpose (SPV / portfolio size / developer). Consent checkbox mandatory. Fence Tier-2 consumer BTL out of the form.
- Deploy: repo-root env-override, `--archive=tgz` (see `vercel_cli_deploy_workflow` memory; Property project `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`). Owner-gated.

---

## 7. Sequence

1. Read the research CSVs + this handoff + `WRITER_PLUMBING.md` + the 4 Phase-0 briefs. Confirm existing pipeline before building anything new.
2. Filter Tier-1 (unregulated) pages from the CSVs; **re-run de-cannibalisation** vs the current property corpus (incl. Phase-0 pages); verify live slugs.
3. Add the "Landlord Finance" category to `niche.config.json`.
4. Seed the Tier-1 pages into `blog_topics` (`keyword_source='track-b-tier1-2026-07-30'`, distinct `status`), OR go straight to briefs if the owner prefers.
5. Opus cluster-architecture briefs (one per cluster) → per-page Opus A* bodies (waved) → Sonnet calculators.
6. validate_md → fix_links → `npm run build` (green) per the Property gate.
7. Update Property `llms.txt`/`llms-full.txt`. Update this handoff + memory. Commit (owner), solicitor sign-off on conversion wording, deploy (owner).

---

## 8. Owner decisions / open items

- **Solicitor sign-off** on the Tier-1 lead-capture / CTA wording before conversion goes live (content can publish first).
- **Broker principal(s):** secure a commercial-finance / SPV-BTL broker to buy the Tier-1 leads (business-purpose, exclusive). Until then, CTA is a shared placeholder (as with dental).
- **Tier 2 (consumer BTL):** decide whether to pursue an FCA IAR to capture the regulated slice, or permanently drop it.
- **Category name** ("Landlord Finance" vs "BTL Mortgages & Finance").
- **Hosting:** stays on property (audience-correct); no new-hub question here.

## 9. Hard DON'Ts
- Do NOT capture consumer-BTL / regulated-mortgage leads (Tier 2) without an IAR. Fence them off.
- Do NOT duplicate the existing property BTL/ltd-co TAX pages — cross-link, finance-mechanics only.
- Do NOT publish conversion CTAs on regulated-adjacent pages before solicitor sign-off.
- Do NOT reinvent the pipeline — reuse `briefs/` infra, the flat-file contract, validate_md/fix_links.
- No em-dashes; faceless EEAT; verify every finance/tax fact against a live source.

---

### START-HERE prompt for the fresh agent
> You are scoping + building **Track B Tier 1** (unregulated landlord finance) on the property site. Read `docs/_engines/TRACK_B_TIER1_LANDLORD_FINANCE_HANDOFF_2026-07-30.md` in full, then the memory `adjacent_leadgen_finance_expansion`, the Phase-0 handoff, and the research CSVs (`landlord_commercial_finance_pages.csv`, `btl_pages.csv` + universes) in `expansion_research/dental_finance/`. Reuse the Phase-0 build pipeline in `expansion_research/dental_finance/briefs/` (WRITER_PLUMBING, validate_md, fix_links, the 4 cluster briefs as templates) — do NOT reinvent it. Bake the Section-1 compliance boundary into every page (Tier 1 unregulated/company-gated only; fence off Tier 2 consumer BTL; solicitor signs off conversion wording). Sequence per Section 7. Opus architects + writes bodies (Opus-only content), Sonnet builds calculators. Gate: validate_md → fix_links → `npm run build` green per site. Deploy + commit owner-gated.
