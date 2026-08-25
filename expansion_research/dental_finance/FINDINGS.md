# Dental Finance — deep SEO data findings (2026-07-30)

Data: DataForSEO Google Ads search_volume, UK (location 2826), + competitor sitemap harvest.
Google Ads volumes are banded/rounded and merge close variants; `0` = under ~10/mo, not literally zero. Real per-lead value is high; the constraint here is **traffic volume**, not lead worth.

## 1. Dental commercial finance (UNREG — build-now) search volume is TINY

21 of 57 commercial seeds returned any volume; **~920/mo total**. Head terms:

| keyword | vol/mo |
|---|---|
| buy a dental practice / buying a dental practice | 210 + 210 |
| selling a dental practice | 90 |
| dental practice loan | 70 |
| dental practice finance | 40 |
| dental practice valuation | 40 |
| start a dental practice | 40 |
| dental equipment finance | 20 |
| (goodwill loan, commercial mortgage, cbct/chair finance, refinance, squat loan…) | <10 each |

Slug discoveries beyond the seed set (from rival sitemaps):
- **dental practices for sale — 1,600** (practice-sales intent, agent play not finance-lead)
- **dentist insurance — 9,900** (REGULATED — protection/IDD, not build-now)
- dental accountants / dental accounting — 720 + 720 (**already owned** by the dentist accounting site)
- digital marketing for dentists — 590 (adjacent, not finance)
- sell a dental practice 90, squat dental practice 50, dental practice valuations 40, business loans for dental practices 30…

**Regulated dental seeds:** dentist mortgage 110, mortgages for dentists 110, dentist income protection 90, income protection for dentists 40. ~390/mo total.

## 2. SPV / BTL comparison — where the real volume is

Same pull, BTL universe: **118,220/mo total** across 45 terms.

| keyword | vol/mo |
|---|---|
| buy to let mortgage(s) | 33,100 + 33,100 |
| buy to let mortgage calculator | 22,200 |
| buy to let mortgage rates | 9,900 |
| **limited company buy to let mortgage** (+2 close variants) | **2,400** (×3 variants) |
| let to buy mortgage | 1,900 |
| buy to let remortgage / best btl | 1,300 + 1,300 |
| hmo mortgage / holiday let mortgage | 880 + 880 |
| spv company 720, spv mortgage 320, spv for property 210 | ~1,250 |
| transfer property to limited company | 480 |
| british expat mortgage 880, expat mortgage 480, non resident mortgage uk 260 | ~1,620 |

Ltd-co/SPV/portfolio/incorporation cluster ≈ **12–15k/mo**; broad BTL informational+calculator ≈ 60k+/mo.

**BTL is ~60–120× the search volume of dental commercial finance.**

## 3. Competitor page counts (sitemap harvest, 7 of 14 crawled; 7 Cloudflare-blocked)

| domain | total URLs | dental | finance | dental+fin |
|---|---|---|---|---|
| rangewell.com | 870 | 101 | 531 | 54 |
| samera.co.uk | 419 | 194 | 85 | 37 |
| braemarfinance.co.uk | 259 | 42 | 259 | 42 |
| pfmdental.co.uk | 166 | 166 | 29 | 29 |
| ukbusiness.finance | 230 | 4 | 230 | 4 |
| fiftyninefinancial.co.uk | 66 | 7 | 66 | 7 |
| practicecover.co.uk | 27 | 27 | 14 | 14 |
| **total unique dental+finance URLs** | | | | **187** |

Blocked (need manual/WebFetch if wanted): dentalelite, foxdavidson, fdcommercial, alphacapitaluk, cliftonpf, wesleyan, lilyhead.

**Key structural tell — Rangewell's path buckets:** `/sectors/` (186), `/finance-options/` (122), `/dentists/` (38), `/pharmacists/` (32), `/gp-medical-practice-finance/` (23), `/care-homes/`, `/hotels/`, `/childrens-day-nurseries/`… **Nobody runs a standalone dental-finance site. They run a multi-sector commercial-finance site where dentists is one sector landing cluster of ~30–50 pages among ten sectors.** The volume doesn't support a dedicated domain — and the market confirms it.

## 4. Implications

- **Standalone dental-finance site is NOT supported by the data** (~1–2k/mo addressable commercial volume; specialists devote 30–55 pages and treat it as 1 sector of 10).
- **Correct structure = a ~20–30 page dental practice-finance cluster on the EXISTING dentist accounting site** (dentalfinancepartners.co.uk — already has authority, GSC, exact audience). Unregulated, build-now, monetise via a commercial-finance broker. Low pages, low maintenance, rides existing authority.
- **The real content-volume prize is the SPV/BTL cluster on the property site** — 12–15k/mo in the ltd-co/SPV/incorporation space it can own, plus 60k+ broad BTL. Build the educational + calculator layer now; add the mortgage-CTA after the IAR.

## Page-count recommendation

| build | pages | why |
|---|---|---|
| Dental practice-finance cluster (on dentist site) | **20–30** | covers the whole lifecycle (purchase, goodwill, commercial mortgage, equipment/asset finance, squat/startup, refinance/2nd site, valuation, exit/sale) — that's the entire addressable universe; more pages = diminishing returns on ~1–2k/mo |
| SPV/BTL cluster (on property site) | **25–40** | ltd-co/SPV/portfolio/incorporation money terms + criteria long-tail + 2 calculators (ICR/stress-test, personal-vs-company tax) |

---

# Deep discovery + cannibalisation map (2026-07-30, stage 6/7)

Pulled every keyword 9 competitors rank for via DataForSEO `keywords_for_site` (2,259 unique dental kw, 2,190 BTL kw, ~$1.20). Cross-mapped against our live GSC corpus (property 3,690 queries / 28,562 impr; dentists 382 queries / 8,084 impr over 120d).

## Finding 1 — dental B2B finance has NO hidden volume
Deep discovery surfaced only (a) patient terms (nhs dentist cost 18,100; dental implant cost 12,100; dental insurance 9,900 — out of scope / regulated) and (b) generic finance noise. The B2B practice-finance universe **is** the seed set (~920/mo). The ceiling is real; 20–30 pages covers it.

## Finding 2 — dentist site ALREADY ranks for practice-finance (cannibalisation risk)
The dentist accounting site already ranks (from the tax angle) for the exact practice-finance queries:
- `goodwill funding practice purchase` — 68 impr, **pos 11**
- `dental practice valuation uk` — 99 impr, pos 27 (+ "how much is my dental practice worth [city]" ×5)
- `specialist dental finance` — 41 impr, pos 20
- `selling a dental practice taxes [city]` — ranks nationwide

→ **Do NOT build a parallel dental-finance cluster.** EXTEND these existing pages with the finance-introduction layer (broker intro + finance mechanics). Only ~5–10 genuinely new pages (equipment finance, squat funding, refinance, second-site). Total dental footprint ≈ 15, mostly upgrades not new URLs.

## Finding 3 — BTL mortgage is net-new to property (NON-cannibalising) with a guardrail
Property **owns** the BTL/ltd-co space only on the TAX angle:
- incorporation, SDLT-on-incorporation, portfolio tax planning, "buy to let accountant [city]", "landlord portfolio incorporation".
Property does **NOT** rank for BTL *mortgage* intent — only tax-of-mortgage ("are mortgage arrangement fees tax deductible", "section 24 relief"). So the mortgage cluster is genuinely additive:

**NET-NEW BTL mortgage opportunities (property ranks for none):**
| vol/mo | keyword |
|---|---|
| 33,100 | buy to let mortgage lenders |
| 22,200 | buy to let mortgage repayment calculator |
| 22,200 | buy to let mortgage uk calculator |
| 9,900 | buy to let mortgage rates / fixed rates / interest rate |
| 9,900 | mortgage deals buy to let |
| 2,400 | limited company buy to let mortgage (+ SPV mortgage 320, spv company 720) |

**Cannibalisation guardrail (contested seam):** property already ranks (weakly, pos 26–40) for the SPV/incorporation *structuring* terms — "incorporating a property portfolio", "should I buy through a limited company". Keep the **tax-decision** content on property; the mortgage cluster covers **mortgage mechanics** of SPVs (eligibility, lenders, rates), cross-linked. No duplicate "ltd vs personal tax" page — that cannibalises property.

