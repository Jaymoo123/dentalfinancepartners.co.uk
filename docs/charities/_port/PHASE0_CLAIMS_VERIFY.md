# Charities — Phase 0 claims ADVERSARIAL VERIFY + rule-based re-sweep

Method: every verdict below is a measurement on the **served production build at
`http://localhost:3117`** (build proved current by the manager: `/thank-you` carries the Aswatax
paragraph from `958460de`, 2026-09-09). No repo agreement was accepted as evidence. No site code
and no ledger row was edited.

Corpus: all 66 URLs in `docs/charities/_port/sweep_baseline.json` (byte-identical to the emitted
`/sitemap.xml`, verified by `diff`), **plus 6 public routes that are in neither list and that the
repo-only pass therefore never rendered**: `/book`, `/complete`, `/thank-you`,
`/embed/{gift-aid-calculator,gasds-small-donations-calculator,independent-examination-vs-audit-checker}`,
`/feed.xml`. All 72 return 200.

Two derived corpora were built and swept separately, because a claim can hide in either:

1. **Rendered text** — tags/scripts/styles stripped from each page's HTML.
2. **Machine-only layer** — JSON-LD whose text has **no** on-page counterpart (116 FAQ Q&A pairs).
   A rendered-text sweep alone misses this entirely. S25 lives here and nowhere else.

```bash
# corpus
python -c "import json;[print(u) for u in json.load(open('docs/charities/_port/sweep_baseline.json'))['links']]" > urls.txt
while read -r u; do curl -s -w "%{http_code} $u\n" -o "html/$(echo $u|sed 's|/|_|g').html" "http://localhost:3117$u"; done < urls.txt
```

---

## A. Per-row verdicts on the 25 (actually 26) serious rows

> **Ledger arithmetic defect, raised first:** the Serious table contains **26** rows (S1–S26). The
> ledger's own Summary block and severity total both say **25**. The brief inherited the undercount.
> All 26 were verified.

| id | verdict | proof command | decisive output |
|---|---|---|---|
| S1 | **CONFIRMED** | `curl -s localhost:3117/about \| grep -o "Every client we work with[^<]*"` | `Every client we work with operates in the charity and not-for-profit sector.` — renders on `/about`. |
| S2 | **CONFIRMED** | `curl -s localhost:3117/about \| grep -o "We carry out examinations[^<]*"` | `We carry out examinations week in, week out and we prepare the accounts with the examination in mind` |
| S3 | **CONFIRMED** | `curl -s localhost:3117/about \| grep -o "fixed-fee basis[^<]*"` | `fixed-fee basis. You know what you are paying before we start.` Rendered-text sweep for `fixed[ -]?fee` across all 72 URLs hits **exactly 1 visible page** (`/about`) and **2 HTML files** (the 2nd is S6's `<meta>`). No other fee string exists site-wide: `from £<n>` = 0, `our fee` = 0, `pricing` = 0. |
| S4 | **CONFIRMED — UNDERSTATED** | `grep -hoiE "within 24 hours\|one working day\|24-hour response\|same working day" txt/*.txt \| sort \| uniq -c` | `41 within 24 hours` / `4 one working day` / `1 24-hour response` / `1 same working day`. Ledger said "9 surfaces". Truth: **"within 24 hours" renders on 40 of 72 URLs**; "one working day" on 4. See N1 for the origin. |
| S5 | **CONFIRMED** | `curl -s localhost:3117/services/independent-examination \| grep -o "We carry out the independent examination[^<]*"` | `We carry out the independent examination of your charity's accounts, confirm compliance with the Chari…` |
| S6 | **CONFIRMED** | `curl -s localhost:3117/services/independent-examination \| grep -o '<meta name="description" content="[^"]*"'` | `…required by the Charities Act. Fixed fee, Charity Commission compliant, completed within agreed timescales.` |
| S7 | **CONFIRMED** | `curl -s localhost:3117/ \| grep -o "We conduct the examination[^<]*"` | `We conduct the examination, produce the examiner's report, and file with the Commission on time` |
| S8 | **CONFIRMED** | `curl -s localhost:3117/ \| grep -o "Conducted to CC31 standards[^<]*"` | `Conducted to CC31 standards, examiner's report produced, filed with the Commission on schedule` |
| S9 | **CONFIRMED (row correctly scoped)** | `grep -rl "examination by a qualified examiner" txt/` | Renders as a **tier feature** on `/services` (`✓ Independent examination by a qualified examiner`). The same phrase on `/research/uk-charity-scrutiny-cliff` and `/research/uk-small-charity-finance-index` is a correct statutory description, not a first-person claim — the ledger did **not** over-reach onto those. |
| S10 | **CONFIRMED** | `curl -s localhost:3117/ \| grep -o "compliance situations described are real"` | Renders, under section label `Real outcomes`, above three attributed testimonials. |
| S11 | **CONFIRMED** | `curl -s localhost:3117/ \| grep -o "general commercial clients\|never discuss one client"` | Both render in the homepage trust strip. |
| S12 | **CONFIRMED** | `curl -s localhost:3117/ \| grep -o "24-hour response.\{0,40\}"` | `24-hour response ✓ … Usually the same working day` — self-contradicting, one node apart. |
| S13 | **CONFIRMED — UNDERSTATED** | `grep -rl "independently examined rather than audited" txt/` | Renders on **2** URLs (`/services`, `/services/independent-examination`), not 1. A **third** no-carve-out variant renders in a blog CTA — see N6. |
| S14 | **CONFIRMED** | `curl -s localhost:3117/services/gift-aid \| grep -o "on the same donations[^<]*"` | `…also claim Gift Aid on the same donations in the same tax year (except in the first year).` |
| S15 | **CONFIRMED — UNDERSTATED** | `grep -rlie "every Scottish charity needs\|all Scottish charities are subject to external scrutiny" txt/` | Renders 4× on `/calculators/independent-examination-vs-audit-checker` as the ledger says, **and once more on `/guides/charity-sorp-2026`** — a file the S15 row does not cover. See N3. |
| S16 | **CONFIRMED** | `curl -s localhost:3117/privacy-policy \| grep -o "tailored on-page message"` | Renders. No renderer exists: `grep -rn "personalis\|tailored" charities/web/src` returns only this policy line. |
| S17 | **CONFIRMED** | `curl -s localhost:3117/privacy-policy \| grep -o "24 months from the date of your enquiry[^<]*"` | `…after which it is deleted.` `src/lib/leads/retention.ts:15` = `SHIPS DORMANT … Nothing is mutated until LEAD_RETENTION_PURGE_ENABLED=1`, and the module anonymises, never deletes. |
| S18 | **CONFIRMED** | `curl -s localhost:3117/privacy-policy \| grep -o "published grading rubric"` | Renders. No rubric is published on any of the 72 URLs. |
| S19 | **CONFIRMED** | `curl -s localhost:3117/privacy-policy \| grep -o "Anthropic, through the Vercel AI Gateway"` | Renders. `ls charities/web/src/lib/ai` → **no such directory**. The only other hits are a stale comment (`api/leads/inbound/email/route.ts:18`) pointing at that non-existent module, and a robots.txt UA name. No call path exists. |
| S20 | **CONFIRMED** | `curl -s localhost:3117/privacy-policy \| grep -o "at most six firms\|within 48 hours\|after seven days"` | All three render. `src/lib/lead-routing.ts:8,13` = one fixed `DEFAULT_NOTIFY_TO` + one fixed `DEFAULT_PARTNER_CC`. No claim/pool code exists. |
| S21 | **CONFIRMED** | `curl -s localhost:3117/cookie-policy \| grep -o "do not store your IP address[^<]*"` | `(only a country derived from it)` renders; the shared handler also stores city, region and timezone. |
| S22 | **CONFIRMED — count verified independently by rule** | JSON-LD parser over all 72 pages, matching each `mainEntity[].name` against the tag-stripped body | **43 pages emit `FAQPage`. 14 emit FAQs where *every* Q is absent from the rendered body; 1 more (`business-donations-to-charity-tax`) is partial at 4 of 7; 28 are clean.** The ledger's 14 names and its "plus 4 of 7" note are **exactly right** — reproduced from the DOM, not from its list. Payload = **116 Q&A pairs** with no on-page counterpart (see N7). |
| S23 | **CONFIRMED — exactly 3, and the inverse checks out** | canonical extracted from all 72 URLs | Only `/services`, `/for`, `/guides` emit `href="https://www.trusteetax.co.uk"` (the homepage). **All 63 other indexable URLs are correctly self-canonical.** Inverse verified: the 3 `/embed/*` routes canonicalise *away* to their parent `/calculators/*` page, which is correct and intended; `/book`, `/complete`, `/thank-you` inherit the root canonical but are `noindex, nofollow`, so harmless. No family beyond the three named is affected. |
| S24 | **CONFIRMED — and it is the only 404 on the site** | see §A.404 below | `404 /calculators/calc-gift-aid-calculator`, linked from `/` only. |
| S25 | **CONFIRMED — but RECLASSIFIED** | `grep -o ".\{0,60\}10\.2.\{0,60\}" html/_blog_gift-aid_charity-trading-subsidiary-gift-aid.html` vs the same grep on the tag-stripped text | The string **does not appear in the rendered text of any URL** (`grep -rhoiE "10\.2m" txt/` → 0 hits). It is published **only inside the unrendered `FAQPage` JSON-LD** of `/blog/gift-aid/charity-trading-subsidiary-gift-aid`. The claim is real and machine-published to Google, but no human visitor can see it. The row is right; its "a trustee could act on this" rationale is not — a crawler can, a reader cannot. |
| S26 | **CONFIRMED** | `curl -s localhost:3117/research/uk-charity-scrutiny-cliff \| grep -o "recognised accountancy bodies"` | `…must be a qualified accountant, defined by the Charity Commission as a member of one of the recognised accountancy bodies` renders. |

### A.404 — whole-site 404 sweep (the S24 rule, applied to everything)

```bash
grep -ho 'href="/[^"]*"' html/*.html | sed 's/href="//;s/"$//;s/[#?].*//' | sort -u > internal.txt   # 71 distinct targets
while read -r u; do c=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3117$u"); [ "$c" != 200 ] && echo "$c $u"; done < internal.txt
# also swept: every absolute https://www.trusteetax.co.uk/* in the HTML (69), and every URL in /llms.txt (35)
```

**Confirmed 404s: 1.**

- `404 /calculators/calc-gift-aid-calculator` — linked from `/` (homepage free-tools card, "Gift Aid calculator").

Everything else resolved 200, including all 35 `/llms.txt` targets, `/api/og`, `/feed.xml`,
`/robots.txt`, `/sitemap.xml`. `/rss.xml` is 404 but is not linked from anywhere and is not
advertised, so it is not a broken link.

### A.fees — the "config-injected footer / JSON-LD fee" hypothesis from the brief

Tested directly, on the rendered HTML, footer and JSON-LD of many URLs. Result is **split**:

- **No fee claim in the footer.** The footer is identical on all 67 indexable URLs and carries only:
  `Trustee Tax is a trading name of Ashfield Trading Ltd … Specialist charity accountants. Editorial
  content only.` No price, no turnaround.
- **`niche.config.json` carries no fee string** — but it *does* carry the turnaround one
  (`"cta_body": "…we will come back within 24 hours."`). That is the config-injected claim on this
  site. See **N1**.
- **The Organization JSON-LD *does* carry a machine-readable price claim on every single URL.**
  `priceRange: "££"`, on **68 nodes across 67 pages**. The ledger caught the string (M2) but graded
  it **minor** and described it as "every page that emits the Organization node" without measuring
  it. Measured, it is every page there is. See **N2**.

---

## B. Rule-based re-sweep — NEW rows

Same schema as the ledger.

### New serious

| id | url | file:line | exact rendered string | what is wrong | proof | verdict | severity |
|---|---|---|---|---|---|---|---|
| N1 | 40 of 72 URLs (every page with a contact CTA or lead form) | `charities/niche.config.json` (cta body), rendered via `LeadForm`, `CalcResultCta`, `MiniCapture`, section CTAs | "Tell us about your charity, CIC or social enterprise and we will come back **within 24 hours**." | The turnaround promise is **config-injected**, so the repo pass attributed it to 9 component call sites; it actually renders on **40 URLs**. No SLA, monitor or queue enforces it anywhere in `src/lib/leads/**`. This is S4's real blast radius, and the reason S4 must be fixed in config, not in 9 components. | `grep -rli "within 24 hours" txt/ \| wc -l` → **40**; `grep -n "within 24 hours" charities/niche.config.json` | corrected-needed | **serious** |
| N2 | **all 67 indexable URLs** | `charities/web/src/lib/schema.ts:35` | JSON-LD `"@type": ["ProfessionalService","AccountingService"] … "priceRange": "££"` | A machine-readable **price-band claim for our own services on every URL of the site**, while the site publishes no price at all and `/terms` §2 says no engagement exists. The ledger logged this as **minor M2**. By rendered site-wide count it is the most widely published unbacked commercial claim on the site — 68 nodes, 67 pages, more surfaces than S1–S14 combined. Severity is wrong in the ledger. | JSON-LD census over all 72 pages: `('ProfessionalService','AccountingService')` × 68, `priceRange "££"` × 68; `grep -l priceRange html/*.html \| wc -l` → 67 | unsourced-remove | **serious (ledger graded minor)** |
| N3 | `/guides/charity-sorp-2026` | `charities/web/content/guides/charity-sorp-2026.md` (not in any ledger row) | "**All Scottish charities are subject to external scrutiny of their accounts regardless of income size**, and the thresholds governing the form of that scrutiny differ from England and Wales." | Same HP 26 open-flag-3 breach as S15 — the OSCR universal-scrutiny rule stated as settled fact — but on a **different file and a different route family** that the S15 row does not cover. Fixing S15's four calculator surfaces leaves this one live. Textbook "sweep by the rule, not the list". | `grep -rlie "all scottish charities are subject to external scrutiny" txt/` → `_guides_charity-sorp-2026.html.txt` | owner-decision | **serious** |
| N4 | `/privacy-policy` (3 occurrences: §3, §4, §5) | `src/app/privacy-policy/page.tsx`; string origin `charities/niche.config.json` partner-network name | "…pass it to **regulated firms in our specialist partner network**…" / "…share it with **regulated firms from our specialist partner network**…" | Asserts, three times, that enquiry recipients are **regulated firms** and that a **network** exists. `lead-routing.ts` sends every charities lead to one internal Ashfield inbox with one fixed partner CC; nothing in the repo evidences the regulatory status of any recipient. Same root cause as S20 but a distinct assertion S20 does not quote, and it is config-injected so a component-level fix misses it. | `grep -rhoi ".\{0,90\}regulated firms.\{0,110\}" txt/` → 3 distinct contexts, all `/privacy-policy`; `src/lib/lead-routing.ts:8,13` | corrected-needed | **serious** |
| N5 | `/privacy-policy` §6 | `src/app/privacy-policy/page.tsx` vs `src/lib/leads/retention.ts:5-8` | published: "We keep enquiry data for **24 months** … after which it is deleted." | The retention module's own header states the governing contract requires the opposite: "*the data-sharing agreement requires deletion/anonymisation of contact details and message content **within 3 months** of the enquiry date*". The published period is **8× the contractual maximum the code itself cites**. S17 caught that the purge is dormant and anonymises rather than deletes; it did not catch that the published **period** contradicts the DSA. | `sed -n '1,20p' charities/web/src/lib/leads/retention.ts`; `curl -s localhost:3117/privacy-policy \| grep -o "24 months from the date[^<]*"` | owner-decision | **serious** |
| N6 | `/blog/charity-governance/how-long-do-uk-charities-last` | in-body service CTA | "Our independent examination service provides the Charity Commission-compliant external scrutiny **required for charities with gross income between £25,000 and £1 million** (£40,000 and £1.5 million for financial years ending on or after 30 September 2026)." | The S13 defect class on a **third** surface the S13 row does not name: asserts the whole £25k–£1m band needs examination, with **no** £250,000 + £3.26m asset carve-out. Found by applying the rule (every rendered sentence asserting the band, tested for the carve-out) rather than by re-reading S13's file. | `python` sentence scan over `txt/*.txt` for `£25,000 and £1 m…` sentences lacking `3.26\|250,000\|unless\|assets` | corrected-needed | **serious** |
| N7 | 15 blog URLs | `src/app/blog/[category]/[slug]/page.tsx:70,78` | **116 FAQ question/answer pairs** emitted as `FAQPage` JSON-LD with no on-page counterpart | This is S22's payload, measured. It is not only a structured-data policy breach: it is an **unaudited publication channel**. Every figure and legal statement in those 116 pairs is published to crawlers and LLMs while being invisible to a human reviewer, to a rendered-text sweep, and to the site's own readers. S25's stale £10.2m company-audit threshold survives *only* here — proving the channel already carries at least one live defect. Any future claims audit that greps rendered text alone will keep missing it. | JSON-LD parser diffing `mainEntity` against the tag-stripped body across all 72 pages; figure census over the extracted layer shows £10.2m present there and nowhere else | corrected-needed | **serious** |
| N8 | **all 67 indexable URLs** (footer) + 4 `<title>` tags + 68 JSON-LD nodes | `charities/web/src/components/layout/SiteFooter.tsx:67`; `src/lib/schema.ts` `@type` | footer on every page: "**Specialist charity accountants.** Editorial content only."; `<title>Specialist Charity Accountants UK</title>`; JSON-LD `@type: AccountingService` | A professional-title claim on **every URL of the site**, in three independent layers (visible footer, page title, machine-readable type), while `/terms` §2 disclaims any accountant-client relationship and **no qualification, listed body, PI insurance or regulator is evidenced anywhere**. It may be sanctioned by the positioning ruling — but it is the site's largest qualification claim by surface count and it was never put to the owner. | `grep -rl "Specialist charity accountants" txt/ \| wc -l` → **67**; `grep -hoi "<title>[^<]*</title>" html/*.html \| grep -ci accountant` → 4; JSON-LD census `AccountingService` × 68; first-person qualification sweep → **0** hits | owner-decision | **serious** |

### New minor

| id | url | file:line | exact rendered string | what is wrong | proof | verdict | severity |
|---|---|---|---|---|---|---|---|
| N9 | `/` | `src/app/layout.tsx` + `src/app/page.tsx:251` | two identical `ProfessionalService/AccountingService` JSON-LD nodes | The homepage emits the Organization node **twice**, byte-identical including `@id`. Duplicate entity node; every other page emits it once. | JSON-LD census: `pages with >1 priceRange node: 1 → _.html` | corrected-needed | minor |
| N10 | all 67 URLs | `src/lib/schema.ts` | JSON-LD `"logo": "https://www.trusteetax.co.uk/api/og"` | `logo` points at the **dynamic OG-image route**, not a logo asset (`/logo.png` → 404). Schema.org `logo` is expected to be a stable image of the mark; an OG card is not one. | `curl -s -o /dev/null -w "%{http_code}" localhost:3117/logo.png` → 404; node dump shows `logo: .../api/og` | corrected-needed | minor |
| N11 | `/guides/charity-structures-which-to-choose` | guide body | "A **structure-chooser tool is queued for this page**: answer a few questions and get a recommended structure with the rationale. **It will appear here when available.**" | A build-backlog placeholder shipped to an indexable page. Honest in wording (so not a false claim), but it publishes a forward product promise with no owner and no date, and it is the only such placeholder on the site. | `grep -rhoiE ".{0,100}(queued for this page\|coming soon\|will be added).{0,80}" txt/` → 1 hit | owner-decision | minor |

### Rule sweeps that produced NOTHING (recorded so the next pass does not redo them)

- **Qualification / regulator / PI, first person:** 0 hits across all 72 rendered pages. The only
  `ICAEW/ICAS/ACCA/AAT/CIMA/CIPFA/ACIE/AIA/IFA/CPAA/AAPA` occurrences (62 total) are editorial
  descriptions of the s.145 listed bodies, correctly framed. `professional indemnity` / `PI
  insurance`: **0**. Every apparent "our … registered" hit is `if your charity is registered…`.
  (N8 is the exception and is raised on the footer/title/schema layer, not on prose.)
- **Fees beyond S3/S6:** `from £<n>` 0, `our fee` 0, `pricing` 0, `per month` 0, `free quote` 0.
  `no obligation` × 16 — form copy, not a fee claim.
- **Trend claims** (`wider|widen|narrow|rises|higher|high enough|relatively low|comfortably
  exceeds|scales|break-even|the more you`, rendered text **and** the machine-only layer): 66 distinct
  sentences reviewed. All are either statutory ("the gate **rises** to £40,000", correct per HP 1-6),
  rate-band language ("**higher**-rate donor", correct), or explicitly self-qualified. **Only one
  fails**, and the ledger already has it — M10, **CONFIRMED and understated**: the published
  `cohort_survival` series has **11 downward steps in 37 cohorts**, not the single 2009→2011 dip the
  row cites (1980→81, 82→83, 86→87, 88→89, 90→91, 92→93, 95→96, 96→97, 99→2000, 2009→10, 2010→11).
  The long-run direction (34.9% → 81.9%) does hold, so the finding survives and the wording does not,
  exactly as the row says. Note the page **already** carries the correct caveat two paragraphs down,
  so the defect is a heading that contradicts its own body.
- **Config- or build-injected figures:** full rendered-figure census (every `£n` token on all 72
  URLs, 140 distinct values). Every one resolves to HP 1-6/12/14/17/20/21/27, to a re-derived worked
  example (£100→£125, 40%→£75, 45%→£68.75/£31.25 — re-checked by hand, correct), or to a research
  JSON figure. The two outlier clusters were chased and cleared: £85,000/£79,000/£81,000 are the
  small trading exemption cliff worked example (25% of £320,000 = £80,000, correct), and
  £21,050/£4,410/£112,602/£458,523/£662,961 are the finance-index quartiles. **£10,500** Employment
  Allowance correct. **No stale £85,000 VAT threshold anywhere** — the rendered value is £90,000 × 14.

### Ledger positives that were re-tested and HELD

- "Internal link sweep … one broken route only" — **true**, re-derived independently from the DOM.
- "canonical tags on every route family" — **true**, and exactly three families affected, no more.
- S22's list of 14 posts — **exact**, reproduced from the emitted DOM rather than from the list.
- Gift Aid worked examples and the 30 Sep 2026 uplift pairing — **true** on the rendered pages.
- M5 arithmetic — **true**: the printed bands sum to 162,609 against a stated 162,611, and
  `charity-scrutiny-cliff.json → headline.active_charities_with_income = 162587`. Three values.
- M4 — **true**: `meta.generated_at = 2026-07-20T19:15:25Z`; the four `vercel.json` crons are
  lead-nurture, nurture-digest, retention and reconcile. Nothing refreshes research data.

**No row in the ledger was found to be overstated in its verdict, and none was a false positive.**
Four were understated in **scale** (S4, S13, S15, M10) and one (S25) is correctly flagged but
mis-located — it is machine-only, not visitor-facing. One (M2) is correctly described but
**mis-graded**: it is serious, re-filed as N2.

---

## Reconciliation

| | count |
|---|---|
| Serious rows in the ledger's table | **26** (its own summary says 25 — ledger arithmetic defect) |
| **CONFIRMED** — renders as claimed, real, and wrong | **26 of 26 (100%)** |
| **OVERSTATED** | **0** |
| **FALSE-POSITIVE** | **0** |
| **UNVERIFIABLE** | **0** |
| Confirmed but **understated in scale** | 4 (S4, S13, S15 — and M10 in the minor table) |
| Confirmed but **mis-located** (machine-only, not visitor-facing) | 1 (S25) |
| Minor rows **re-graded up to serious** | 1 (M2 → N2) |
| **NEW serious rows added by the rule-based re-sweep** | **8** (N1–N8) |
| **NEW minor rows added** | **3** (N9–N11) |
| Serious total after verification | **34** (26 surviving + 8 new) |
| Confirmed 404s site-wide | **1** |

The repo-only pass was **accurate but not exhaustive**: every judgement it made was correct, and it
missed 8 serious items. All 8 share one cause — they are only visible **after render**: injected
from `niche.config.json` (N1, N4), emitted into JSON-LD on every page (N2, N8), living in the
unrendered FAQ layer (N7), or sitting in a sibling file the row's scope did not reach (N3, N6). The
undercount ratio (26 → 34) is consistent with every prior port.

---

## What in the brief I found to be FALSE, and what I could not do

**FALSE in the brief:**

1. **"25 serious"** — the ledger's Serious table has **26 rows (S1–S26)**. The brief inherited the
   ledger's own summary-block undercount. I verified all 26.
2. **"the three named [canonical] families"** — the brief implies the ledger named three and more
   may exist. It named three and there are **exactly** three. This one did not undercount.
3. **"the ledger says 14 [FAQ posts] — verify the number by rule"** — verified by rule from the DOM:
   **14 fully missing plus 1 partial**, which is precisely what the ledger states. Also correct.
4. **The fee hypothesis** ("a fee claim that lived in `niche.config.json` and rendered in the footer
   and the Organization JSON-LD") — **half false here**. `niche.config.json` contains **no fee
   string**, and the footer carries **no fee claim**. But the mechanism the brief predicted is real
   on this site in two other forms: the **24-hour turnaround** is the config-injected claim (40
   URLs, N1) and the **Organization JSON-LD does carry `priceRange: "££"` on all 67 pages** (N2).
   Checking the footer for fees was the wrong target; checking it at all was right — it is how N8
   surfaced.
5. **"66 URLs"** as the site — that is the sitemap, but **6 further public 200-serving routes exist**
   (`/book`, `/complete`, `/thank-you`, three `/embed/*`, `/feed.xml`). I swept all 72. Nothing new
   was found on them, but a future sweep scoped to the baseline would be blind there.

**What I could not do:**

- **Client-side calculator behaviour was not exercised.** The engines were verified as the ledger
  did — by reading and re-deriving — plus the static rendered output (labels, FAQ text, worked
  examples, default states). Actually running the three calculators would need a browser or a dev
  server, and I am forbidden from starting one. The ledger's arithmetic verdict on `giftAid`,
  `gasdsClaim` and `scrutinyLevel` is therefore **inherited, not independently re-measured on the
  build** — the one place in this report where agreement, not measurement, is the evidence.
- **S25's underlying fact (the £10.2m → £15m company audit uplift) still needs a live external
  source check.** I confirmed *where* it publishes and that it is unsourced in HP; I cannot confirm
  the correct replacement figure offline. The ledger's owner-decision verdict stands unchanged.
- `/admin/*` was not swept (staff-only, noindex, gated).
