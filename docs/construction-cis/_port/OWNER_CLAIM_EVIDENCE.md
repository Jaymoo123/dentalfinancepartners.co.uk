# Trade: owner claim evidence pack

Site: `construction-cis/web` (Trade Tax Specialists). Written 2026-09-11.

**Purpose.** Three claim sets were surfaced by the Phase 5 planner as owner decisions. This
document is the source evidence for them, so the question put to the owner rests on verbatim
strings and file:line, not on an agent's summary.

**How this was derived.** Read-only. No file under `construction-cis/web/src` was edited, no build
run, no server started. Every sweep is by RULE with the pattern printed, never by a file list and
never by a single phrase. Scope for every rule: `src content ../niche.config.json scripts`, run
from `construction-cis/web`, with `.test.*` excluded via `| grep -v '\.test\.'`. Render status was
established by curling the live production server at `http://localhost:3167` (Trade at HEAD
`72fe3261`) and counting occurrences with `grep -o <string> | wc -l`.

**Reading the render counts.** Next.js App Router emits every string twice on a server-rendered
route: once in the visible HTML and once in the serialised RSC flight payload at the foot of the
document. A count of `x2` therefore means **one** visible instance. Counts below are given as
visible instances, with the raw figure in brackets where it matters.

---

## 1. Fixed-fee promises. Reconciling 7 vs 12 vs 16

### 1.1 The three numbers, resolved

| number | where it came from | verdict |
|---|---|---|
| **16** | `_port/CLAIMS_REGISTER.md:319`, "hits" column | **CORRECT and reproduced exactly today.** |
| **12** | same row, "breaches" column (with "4 licensed, §13-caveated blog bands") | **The total is right by coincidence, the split is WRONG.** There are no §13 blog bands in this pattern's result set. The real split of the 16 is **15 rendering first-party claims + 1 dormant**, and **zero** licensed or third-party. |
| **7** | Phase 5 planner, restated at `PHASE5_BUILD_SPEC.md:77` as "7 lines across 5 files" | **UNDERCOUNT.** The spec row's own stated deriving command, `grep -rni 'fixed fee\|fixed-fee\|fixed fees' src`, returns **11** lines, not 7. It enumerates only `page.tsx`, `services/page.tsx`, `cis-refund`, `gross-payment-status` and `service-tiers.ts`, and misses `about`, `blog`, `glossary`, `glossary/[slug]` and `niche.config.json` entirely. |

**Headline: 15 fixed-fee claims render today. 1 is dormant. 16 total.**

### 1.2 The rule and its pattern

Rule 1b (pricing and billing promises). Pattern, reproduced verbatim from `CLAIMS_REGISTER.md:319`:

```
grep -rniE 'fixed[- ]fee|fixed fees|quoted before we start|no surprises on the bill|Fixed fees, plain English' \
  src content ../niche.config.json scripts | grep -v '\.test\.' | wc -l
# => 16
```

### 1.3 Every instance

| # | file:line | verbatim published string | renders? | route proven on | visible count |
|---|---|---|---|---|---|
| 1 | `src/app/about/page.tsx:39` | "We work on a fixed-fee basis. You know what you are paying before we start. You deal with specialist CIS accountants, not a call centre." | **YES** | `/about` (200) | 1 (x2 raw) |
| 2 | `src/app/blog/page.tsx:158` | "Fixed fees, no surprises" | **YES** | `/blog` (200) | 1 |
| 3 | `src/app/blog/page.tsx:159` | "Quoted before we start, so you see the number first." | **YES** | `/blog` (200) | 1 |
| 4 | `src/app/cis-refund/page.tsx:231` | "Fixed fees, quoted before we start" | **YES** | `/cis-refund` (200) | 1 |
| 5 | `src/app/glossary/page.tsx:149` | "Fixed fees, no surprises" | **YES** | `/glossary` (200) | 1 |
| 6 | `src/app/glossary/page.tsx:150` | "Quoted before we start, so you see the number first." | **YES** | `/glossary` (200) | 1 |
| 7 | `src/app/glossary/[slug]/page.tsx:172` | "Fixed fees, no surprises" | **YES** | `/glossary/cis` (200) | 1, **on every glossary term page** |
| 8 | `src/app/glossary/[slug]/page.tsx:173` | "Quoted before we start, so you see the number first." | **YES** | `/glossary/cis` (200) | 1, **on every glossary term page** |
| 9 | `src/app/gross-payment-status/page.tsx:241` | "Fixed fees, quoted before we start" | **YES** | `/gross-payment-status` (200) | 1 |
| 10 | `src/app/page.tsx:214` | "Fixed fees. Plain English. No hard sell." | **YES** | `/` (200) | 1 |
| 11 | `src/app/page.tsx:355` | "Start with our free calculators or speak to us directly. Fixed fees, no surprises." | **YES** | `/` (200) | 1 |
| 12 | `src/app/page.tsx:532` | `{ title: "Fixed fees, no surprises", sub: "Quoted before we start" }` | **YES** | `/` (200) | 1 (both halves) |
| 13 | `src/app/services/page.tsx:176` | "Start with our free calculators or speak to us directly. Fixed fees, no surprises." | **YES** | `/services` (200) | 1 |
| 14 | `src/config/service-tiers.ts:35` | "Fixed fee, quoted before we start" | **YES** | `/` and `/services` (200) | 1 each |
| 15 | `../niche.config.json:24` (site `description`) | "... We claim it back, then keep you compliant. **Fixed fees, plain English.**" | **YES, AND THIS IS THE WORST ONE** | **every route** | see 1.4 |
| 16 | `../niche.config.json:312` (`packages` CTA `cta_body`) | "Plans start at £24 a month for subbies, £49 for CIS contractors and £79 for trade limited companies. Your refund claimed, your returns filed on time, **no surprises on the bill.** ..." | **NO, DORMANT** | none | 0 |

### 1.4 The instance nobody has listed: `niche.config.json:24`

This is the site description. It is not a page-level claim and it does not appear in any
file-list-based audit of `src/`, which is exactly why every previous count missed it. It renders in
**five** places on **every route on the site**:

- the **visible site footer blurb**, `{siteConfig.description}` at
  `src/components/layout/SiteFooter.tsx:105`, the paragraph immediately before
  `<nav aria-label="Footer">` (not `legalDisclosure`, which is a separate string at `:164`)
- `<meta name="description">`
- `<meta property="og:description">`
- `<meta name="twitter:description">`
- the `Organization` / `WebSite` JSON-LD `description` field

Proof it is route-independent, taken on a route with **zero** `src`-side fixed-fee hits:

```
curl -s http://localhost:3167/contact | grep -oE '.{70}Fixed fees.{70}' | sort -u
# => 9 distinct surfaces, including:
#    ...keep you compliant. Fixed fees, plain English.</p></div><nav aria-label="Footer" ...
#    ...keep you compliant. Fixed fees, plain English."/><meta name="twitter:image" ...
```

**This is the single worst instance of the class**: one string, one file, 246 routes, in the
indexed meta description and the structured data as well as the visible page.

### 1.5 Proof that `:312` is genuinely dormant

```
grep -n '"variant"' construction-cis/niche.config.json
# => 293:    "variant": "leadgen",
```

`isPackagesMode()` is false, so the `packages` CTA variant is not mounted. Confirmed at the
rendered level: the string `no surprises on the bill` returns **0** occurrences on `/`, `/blog`,
`/contact`, `/services`, `/cis-refund`, `/gross-payment-status`, `/glossary` and `/glossary/cis`.
It remains one config-string flip from publishing, which is `LIVE_DEFECTS.md` TD-02.

### 1.6 Instances deliberately NOT counted as breaches

The `fixed price` family appears 18 further times in `content/blog/**` and once at
`src/app/research/uk-construction-insolvency-index/page.tsx:53`. **None is a breach.** Every one is
editorial prose about how a reader prices their own construction work ("never quote a fixed price
on a property you have not surveyed"), or about fixed-price contract risk in the insolvency data.
They are statements about the reader's business, not about how we bill. The register's pattern
correctly excludes the bare `fixed price` form for this reason.

### 1.7 Proof of zero for the adjacent pricing rules

| pattern | hits | note |
|---|---|---|
| `no win\|no-win-no-fee\|success fee\|only pay if\|contingency fee\|percentage of your refund` | **0** | no contingency-fee model claimed anywhere |
| `aggregateRating\|reviewCount\|ratingValue` | **0** | no review structured data, so no unsupported rating is being emitted |
| `client (satisfaction\|success) rate\|[0-9]{1,3}% of (our )?clients\|average (client )?refund of £` | **0** | no aggregate-performance percentage published |

---

## 2. Three "our clients" claims on the homepage

### 2.1 First, a correction to the register

`CLAIMS_REGISTER.md:319` rule 4 records a breach at `page.tsx:411`. **That is stale.** Running the
register's own rule-4 pattern against `src/app/page.tsx` today returns **zero** hits, and the word
`client` does not appear in the homepage source at all:

```
grep -nE 'our clients|client base|most (of our )?clients|we have (helped|saved)|trusted by|covers our fee|most [a-z]+ we speak to' src/app/page.tsx
# => (no output)
grep -nio 'client' src/app/page.tsx
# => (no output)
```

`page.tsx:411` is now a comparison-table heading ("A generalist handles your compliance. We handle
CIS-specific tax."), which is a scope statement and not a client claim.

### 2.2 The real three: the homepage testimonial block

The claims are **anonymised testimonials**, which is why a `client`-keyword sweep misses them
entirely. Declared at `src/app/page.tsx:48-65`, rendered in the section at
`src/app/page.tsx:251-266` (`aria-labelledby="testimonials-heading"`). All three confirmed visible
on `/` (200), 1 visible instance each.

| # | file:line | verbatim quote | verbatim attribution | house-positions rule breached |
|---|---|---|---|---|
| 1 | `src/app/page.tsx:50-53` | "Three years filing my own returns and I never got the materials split right. First year with a proper CIS accountant and the refund was more than four times what I had been getting." | "Self-employed roofer, West Midlands" | **Client-behaviour assertion** and **aggregate-performance claim**. Also cuts across `house_positions.md` §13, which permits market refund figures only when flagged "for content, not guaranteed"; this states a specific multiple as our own result, with no flag. |
| 2 | `src/app/page.tsx:55-59` | "My contractor was taking 20% off the full invoice including materials. Once we split it out correctly and claimed the mileage, the refund was considerably larger than expected." | "Self-employed plumber, South East England" | **Client-behaviour assertion.** The "we split it out" first person places us in the transaction, so it is a performance claim about work we hold no record of. |
| 3 | `src/app/page.tsx:61-64` | "Applied for GPS on the advice of our accountant. No more 20% taken every month. The cash flow difference on a £500k-a-year turnover is enormous." | "Groundwork contractor, Yorkshire" | **Client-behaviour assertion** plus an unsupported **client-profile claim** (a named £500k turnover band). |

**The worst of the three is #1**: it publishes a quantified outcome ("more than four times") that we
cannot evidence, on the site's highest-traffic route, and §13 is the exact rule written to stop
unflagged refund figures.

### 2.3 The fourth, off the homepage, that should travel with this decision

The same class is live on all 45 `/for/<trade>` pages via a shared data file:

- `src/data/trade-types.ts:252` — "... **For most groundworkers, the refund covers our fee** ..."
- Renders: `curl -s http://localhost:3167/for/groundworkers` returns 200 and the string
  "the refund covers our fee" (x2 raw = 1 visible).

This is a client-count / aggregate-performance claim ("for most") about our own billing outcome. It
is the one rule-4 breach the register records that is still exactly where it says it is.

### 2.4 Proof of zero for the harder claim forms

| pattern | hits | note |
|---|---|---|
| `most [a-z ]{0,20}qualify\|you will probably qualify\|most [a-z ]{0,20}are eligible` | **0** | no eligibility promise |
| `we have helped [0-9]\|[0-9,]+ (happy )?clients\|[0-9,]+\+ clients\|hundreds of (clients\|subcontractors)\|thousands of (clients\|subcontractors)` | **2, both clean** | `content/blog/cis-for-housebuilders.md:33` and `content/blog/which-construction-sub-sectors-have-most-insolvencies.md:33`, both third-party statistics about the sector, neither a claim about us. **No headcount claim is published anywhere.** |

The two remaining homepage "most" statements are population claims about UK subcontractors, not
about our clients, and are permitted: `page.tsx:70` and `page.tsx:239`, both "Most subcontractors
overpay / are owed a meaningful refund".

---

## 3. Turnaround promises: is the site-facing tier genuinely still closed?

**Verdict: YES. Genuinely closed. Zero site-facing breaches.** Swept tree-wide by rule, not by the
19-file list from the Phase 2 fix, and not scoped to Phase 5's routes.

### 3.1 Rule 2a: hard time commitments

```
grep -rniE 'same[- ]day|within (24|48|72) ?hours|24[- ]hour|next working day|respond within|reply within|get back to you within|response time|response guarantee|one working day' \
  src content ../niche.config.json scripts | grep -v '\.test\.'
```

**19 hits, 0 breaches.** Every one disposed of:

| file:line | what it is | disposition |
|---|---|---|
| `src/app/admin/analytics/trends/page.tsx:84` | "Last 24 hours" dashboard heading | login-gated internal console, exempt per `DESIGN_DELTA` `/admin/analytics/**` carve-out |
| `src/app/api/cron/lead-nurture-digest/route.ts:3` | code comment | not published |
| `src/app/api/leads/booking-viewed/route.ts:3` | code comment | not published |
| `src/app/privacy-policy/page.tsx:136` | "... takes it up within 48 hours, we may offer it instead to firms in the related professions" | **pool-model disclosure**, a statement about how leads are distributed, not a promise to the reader about our response. Required by the compliance model. Keep. |
| `src/app/privacy-policy/page.tsx:186` | "We will respond within one month." | **statutory UK GDPR DSAR deadline.** Required. Keep. |
| `src/components/blog/InlineMiniLeadForm.tsx:11` | comment recording that TD-14's "within 24 hours" promise was **removed, not softened** | the fix's own audit trail |
| `src/config/lead-nurture.ts:280`, `src/lib/leads/aux-cron.ts:308` | comments naming the "same-day SMS" step | not published |
| `src/lib/leads/handoff.ts:149` | `row("Response time", ...)` | **internal partner handoff email**, reports elapsed latency after the fact; makes no promise |
| `src/lib/leads/nurture-health.ts:12,114,151` | operator alert thresholds | internal |
| 8 x `content/blog/**` | HMRC processing times, statutory deadlines, and a tradesperson quoting a customer "the same day" | third-party or reader-facing, none about our response |

### 3.2 Rule 2b: soft turnaround language

```
grep -rniE 'be in touch shortly|call you shortly|in touch soon|contact you shortly|reply shortly|speak soon|straight back|right back to you|we will call you|call you back|back to you (today|shortly|quickly|fast)|turnaround|quick(ly)? turnaround|fast turnaround|hear from us' \
  src content ../niche.config.json scripts | grep -v '\.test\.'
```

**16 hits, 0 site-facing breaches.** The four known transactional-email strings are present and
unchanged, exactly as `STATE.md` owner-item 4 records them:

| file:line | verbatim | status |
|---|---|---|
| `src/lib/leads/aux-cron.ts:164` | `const SIGNOFF = ` "Speak soon, the team at ${COMPANY}" | transactional email, deliberately left |
| `src/lib/leads/reply-ack.ts:48` | "Great, thank you{name}. A specialist will call you. Nothing to prepare. **Speak soon.**" | transactional, deliberately left. This is the one the register books as its single rule-2 breach. |
| `src/lib/leads/reply-ack.ts:181` | `signoff: "Speak soon, the team at Trade Tax Specialists"` | transactional, deliberately left |
| `src/lib/leads/reply-ack.ts:7` | the "call shortly" framing comment | documentation of the above |

The remaining 12 are: three nurture SMS bodies (`src/config/lead-nurture.ts:306,342,381`, outbound
sequence, none states a time); `lead-nurture.ts:447` "we have no way to call you back yet", which is
the **absence** of a promise; a rendered unsubscribe page's boilerplate
(`src/app/api/leads/optout/[token]/route.ts:114`); two code comments that record the removal
(`InlineMiniLeadForm.tsx:13`, `service-tiers.ts:69`) and one that records the pool-model reason
(`src/lib/blog-cta-map.ts:15`); and four `content/**` uses of "turnaround" meaning HMRC's processing
time or an economic trend (`glossary/[slug]/data.ts:739`, `how-long-does-cis-refund-take.md:23`,
`consumer-unit-replacement-pricing.md:68`, `uk-construction-net-formation-collapse.md:37,101`).

### 3.3 Proof of zero for the classes the Solicitors incident actually hid behind

On Solicitors this class was declared closed three times and found live three times, the last on a
page nobody had listed. The three patterns below are the ones that caught it there, run here
against the whole tree rather than a file list:

| pattern | hits | disposition |
|---|---|---|
| `within 24 hours\|24-hour (response\|turnaround)\|same[- ]day (reply\|response\|callback)` | **1** | `src/components/blog/InlineMiniLeadForm.tsx:11`, the comment recording the removal. **Not a published string.** |
| `guarantee[ds]? (a \|your )?(refund\|response\|reply\|turnaround)` | **1** | `src/lib/calculators/premium/configs/cis-refund-planner.ts:16`, a comment reading "No guaranteed refund amount - HP §13", i.e. a guard against the claim. **Not a published string.** |
| `response guarantee` (the Property/TD-13 stat that Phase 2 removed 23 instances of) | **0** | gone, tree-wide |

### 3.4 What this does not cover

The four transactional-email phrases are **out of scope by owner decision**, not by oversight. They
are listed here so the owner can see them alongside the site-facing verdict, but they are not
counted as open breaches and nothing in Phase 5 should touch them.

---

## 4. Summary for the owner question

| claim set | number that RENDER | worst instance |
|---|---|---|
| Fixed-fee promises | **15** (plus 1 dormant, 16 total) | `niche.config.json:24` — "Fixed fees, plain English." in the footer, the meta description, the OG and Twitter cards and the JSON-LD, on all 246 routes |
| "Our clients" claims on the homepage | **3** (plus 1 more on all 45 `/for/<trade>` pages) | `src/app/page.tsx:50-53` — "the refund was more than four times what I had been getting", attributed to "Self-employed roofer, West Midlands" |
| Turnaround promises, site-facing | **0. Genuinely closed.** | n/a; the four transactional-email phrases remain by decision, worst-framed being `src/lib/leads/reply-ack.ts:48` — "A specialist will call you. Nothing to prepare. Speak soon." |

---

## 5. What a future sweep must do differently

1. **`niche.config.json` is a rendering surface on every route, not config.** Its `description`
   reaches the visible footer, three meta tags and the JSON-LD. A sweep scoped to `src/` will report
   a fixed-fee-clean site while the claim sits on all 246 pages. Every claim rule must include it.
2. **Testimonials are claims and contain no claim keywords.** A rule-4 pattern built around the word
   `client` returns zero on a homepage carrying three unevidenced outcome quotes. Any client-claim
   rule must also sweep the testimonial and quote arrays by structure, not by vocabulary.
3. **Do not inherit a count from a register row without re-running its pattern.** The row at
   `CLAIMS_REGISTER.md:319` has a correct total and a wrong breakdown, and its rule-4 sibling points
   at a line that no longer contains what it says. Both were reproduced and corrected here by
   running the stated commands.
