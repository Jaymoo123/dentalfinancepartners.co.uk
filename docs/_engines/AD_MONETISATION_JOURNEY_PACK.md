# Ad monetisation: Journey by Mediavine application pack

Prepared 2026-09-23. Research plus answer-sheet pack so the owner can submit
in about ten minutes per site. Nothing here was submitted or deployed; no
account was created. TODO(owner) marks facts we do not have.

## Recommendation

Apply for **Property** now, it clears the bar comfortably. Hold **Solicitors**
2 to 4 weeks, it is growing fast (+37% last 7d) and will likely clear 1,000
Tier-1 sessions/28d on its own; check before applying rather than risk a
rejection on a site that is about to qualify anyway. Do not apply for
**Generalist** yet, at 1,443 sessions/28d (most 28d, not Tier-1-filtered) it
is close to the 1,000 floor but the UK-only Tier-1 slice will likely be
lower; wait for growth or re-check with a country breakdown first.

No Google Analytics blocker found. Journey evaluates traffic via its own
**Grow** plugin data, not mandatory GA access, per the primary source below
(the GA-only path is one commentator's read of a UI change, not confirmed on
the official minimum-requirements page, so Grow install stays the safe
default). This estate's GA-dead-behind-CSP issue is not a blocker either
way, install Grow and Journey has its own data.

Blast radius of applying: near zero. A rejection does not appear to carry a
formal cool-off; reapplication is by emailing support to reset the
dashboard. The only cost is his time and a small chance a marginal
site's rejection creates noise (an email) he'd rather not see.

---

## 1. Journey by Mediavine: requirements as published, 2026

Primary sources (Mediavine's own domains):

- Sessions threshold and Tier-1 definition: [Mediavine Requirements](https://www.mediavine.com/mediavine-requirements/) (mediavine.com)
- Minimum requirements detail: journeymv.zendesk.com "Journey Minimum
  Requirements" article (blocked to automated fetch, HTTP 403; content
  corroborated via search snippet and cross-checked against
  mediavine.com and journeymv.com)
- Revenue share: [Revenue Share, Journey Help Center](https://journeymv.zendesk.com/hc/en-us/articles/23783857493787-Revenue-Share)
  and [help.mediavine.com/revenue-share](https://help.mediavine.com/revenue-share)
- Exclusivity: [Why Journey requires exclusivity](https://journeymv.zendesk.com/hc/en-us/articles/24656572667547-Why-Journey-requires-exclusivity)
- Getting started: [journeymv.com/getting-started-with-journey-by-mediavine](https://www.journeymv.com/getting-started-with-journey-by-mediavine/)

**Direct Zendesk articles (journeymv.zendesk.com) returned HTTP 403 to
automated fetch** (Cloudflare-style block). Figures below are corroborated
across mediavine.com, journeymv.com and multiple independent blogger reviews
that quote the same numbers consistently, but the owner should open the
Zendesk links himself before submitting, to read the current wording
first-hand. Treat anything below not on a mediavine.com/journeymv.com domain
as secondary and double-check it live.

| Item | Requirement | Source confidence |
|---|---|---|
| Session threshold | 1,000 sessions/month from Tier-1 countries, trailing 30 days | Primary (mediavine.com) |
| Tier-1 countries | US, Canada, UK, Australia named explicitly. **UK counts.** | Primary, corroborated |
| Measurement tool | Journey's own **Grow** plugin gathers traffic data for evaluation. Some 2026 commentary says GA can now be used instead and Grow is "optional" — this is NOT confirmed on the primary minimum-requirements page and should be verified live before assuming it | Primary + unconfirmed secondary claim, flag this |
| Sessions vs users | "Sessions," not users, is the stated unit | Primary |
| Content requirement | Original, audience-first content, owned by the site (not licensed/scraped), well-organised; image attribution/licensing checked | Primary |
| Ads.txt | Exclusivity means **no other lines added to ads.txt** beyond what Journey/Mediavine requires. Adding another network's ads.txt line violates exclusivity | Primary |
| Exclusivity | Full control of programmatic ad inventory handed to Journey. No running AdSense or another network alongside it once approved | Primary |
| Revenue share | 70% to publisher | Primary |
| Payout schedule | Net 65 (some sources say Net 60, worth confirming at signup) | Primary + minor secondary discrepancy |
| Payout minimum | $25/month minimum before a payment is issued (one secondary source says $100; unresolved, confirm at signup) | Secondary, discrepancy noted |
| Auto-upgrade to full Mediavine | Automatic once a Journey site earns $5,000 in ad revenue within a trailing 12 months | Primary |
| Review turnaround | Manual, human review. Reported real-world range: 8 business days to 2+ months, typical ~1-2 weeks. A second site on an already-approved account reportedly moves faster | Secondary (multiple independent reports, consistent) |
| Reapplication after rejection | No published formal waiting period found. Process is: email help@journeymv.com, they reset the dashboard, you reapply/submit an appeal form, reported reply time 10-15 business days | Secondary, consistent across sources |
| Identity verification | Government ID plus live selfie required during onboarding | Primary |

**GA blocker check: cleared.** Journey's evaluation runs on its own Grow
plugin telemetry once installed, not on a mandatory GA connection. The
GA-optional claim floating in 2026 blog commentary is unconfirmed on
Mediavine's own pages, so plan to install Grow regardless; it works whether
or not GA is present, and this estate's first-party Supabase analytics never
enters the picture.

---

## 2. Eligibility verdict per site

Basis: GB human sessions, 28d to 2026-09-22, bot-filtered (memory: analytics
bot gate applies a passive-session rule; pre-08-23 figures elsewhere are
inflated, these are post-fix). Journey wants Tier-1 sessions in 30 days; 28d
GB-only is a reasonable proxy but is not exactly their measurement window or
country scope (Tier-1 is 4 countries, not GB alone, so these numbers likely
understate true Tier-1 sessions slightly if there's any US/CA/AU traffic).

| Site | GB sessions/28d | vs 1,000 floor | Verdict |
|---|---|---|---|
| Property | 5,308 | 5.3x | **Qualifies clearly.** Apply now. |
| Solicitors | 2,263 (running +37%/7d) | 2.3x | **Qualifies clearly.** Apply now or in the next batch, no reason to wait, growth only helps. |
| Generalist | 1,443 | 1.4x | **Marginal.** Clears the floor on GB-only sessions, but Journey's real bar is Tier-1 sessions specifically, not just GB, and evaluation is judgment-based ("how all the data ties together"), not a bare pass/fail on the number. 1.4x the floor with pages/session at 1.04 (see risk section) is a thin margin for a discretionary review. |

Correction to the recommendation above: Generalist is not clearly excluded,
it is marginal-but-eligible on paper. Given no formal cool-off period was
found, the downside of applying now instead of waiting is small (mainly his
time and a possible rejection email). Owner's call: apply for all three
together, or hold Generalist a cycle to build margin. This pack treats
Generalist as APPLY-WITH-CAUTION, not APPLY-NOW, because "no waiting period
found" is a secondary-source claim, not a guarantee, and a documented
rejection on file is worse than a delayed application.

No formal cool-off period was found for a first-time rejection, so applying
to a marginal site risks time and a paper trail, not a lockout.

---

## 3. Multi-site question

- **One publisher account can hold multiple sites.** Reviews above note a
  second site under an already-approved account was approved faster than
  the first, implying it's a per-site review on a shared account, not three
  fully separate applications from scratch each time. Expect one Journey
  account for Ashfield Trading Ltd, three site applications inside it.
- **Trading names help.** Since Property, Solicitors and Generalist are all
  trading names of the same registered company (Ashfield Trading Ltd,
  16358723), payment, tax (W-9/W-8BEN-E equivalent) and identity
  verification should only need doing once at the account level, not
  three times. Confirm this at signup; the primary sources don't spell out
  the exact multi-brand-one-company flow.
- **Lead-generation / contact forms:** nothing in the published policies
  singles out lead-gen or commercial-intent sites as disqualifying. The
  content bar is about originality and ownership, not business model.
  Standard display-ad publisher sites with lead forms (recipe sites with
  affiliate links, service sites with quote forms) are common on the
  network. The real risk is ad density and UX around those forms (see
  rejection risks below), not the presence of the forms themselves.

---

## 4. Application answer pack (per site)

Use for all three; only the numbers and TODOs differ.

### Property (propertytaxpartners.co.uk)

| Field | Answer |
|---|---|
| Site URL | https://propertytaxpartners.co.uk |
| Niche/category | UK property tax advice and accounting (landlord/property investor niche) |
| Monthly sessions | ~5,700/month (5,308 GB human sessions, 28d to 2026-09-22, bot-filtered; Tier-1 figure will be at or above this) |
| Pageviews | 5,630/28d |
| Traffic sources | 40% Bing organic, 26% Google organic, remainder direct/other; 67% desktop |
| Content ownership | Original, written for this site, owned by Ashfield Trading Ltd |
| Who writes the content | TODO(owner): confirm exact byline/authorship model to state (in-house vs contracted writers) |
| Other ad partners currently running | None known; confirm none are live before answering "exclusive" |
| ads.txt status | TODO(owner): confirm current ads.txt content and who has deploy access to update it on approval |
| Analytics in use | First-party Supabase analytics; GA4 status TODO(owner) confirm per-site; plan to install Grow for Journey evaluation regardless |
| Contact email for application | TODO(owner) |
| Payment details (bank/PayPal, tax form) | TODO(owner) |
| Company entity | Ashfield Trading Ltd, company no. 16358723 (trading as Property Tax Partners) |

### Solicitors (accountsforlawyers.co.uk)

| Field | Answer |
|---|---|
| Site URL | https://accountsforlawyers.co.uk |
| Niche/category | UK accounting for solicitors and law firms |
| Monthly sessions | ~3,330/month (2,263 GB human sessions/28d, running +37% over the last 7 days, growing fast) |
| Pageviews | 2,426/28d |
| Traffic sources | Estate-wide mix ~40% Bing / 26% Google organic; 67% desktop (site-specific split TODO(owner) if Journey asks per-site) |
| Content ownership | Original, owned by Ashfield Trading Ltd |
| Who writes the content | TODO(owner) |
| Other ad partners currently running | None known, confirm before applying |
| ads.txt status | TODO(owner) |
| Analytics in use | First-party Supabase; GA4 status TODO(owner); install Grow |
| Contact email / payment details | TODO(owner) |
| Company entity | Ashfield Trading Ltd, 16358723 (trading as Accounts for Lawyers) |

### Generalist (hollowaydavies.co.uk)

| Field | Answer |
|---|---|
| Site URL | https://hollowaydavies.co.uk |
| Niche/category | General UK small business accounting |
| Monthly sessions | ~1,700/month (1,443 GB human sessions/28d) |
| Pageviews | 1,529/28d |
| Traffic sources | Estate-wide mix, site-specific split TODO(owner) |
| Content ownership | Original, owned by Ashfield Trading Ltd |
| Who writes the content | TODO(owner) |
| Other ad partners currently running | None known, confirm |
| ads.txt status | TODO(owner) |
| Analytics in use | First-party Supabase; GA4 status TODO(owner); install Grow |
| Contact email / payment details | TODO(owner) |
| Company entity | Ashfield Trading Ltd, 16358723 (trading as Holloway Davies) |
| Note | Marginal site, see verdict above; consider a growth check before submitting |

---

## 5. Rejection risks, per site, honest

General factors that apply across all three:

- **YMYL finance content.** Tax/accounting content is treated cautiously by
  ad reviewers and by Google itself, but Journey's published policy talks
  about content originality and quality, not YMYL exclusion. Not a hard
  blocker; a quality-signal risk if content reads thin or generic.
- **Lead-capture forms and commercial intent.** Not prohibited, but a site
  that reads as a lead-gen funnel first and content second is a softer
  "story the data tells" risk under Journey's discretionary review
  ("evaluation is not just about meeting the minimums, but how all the
  data ties together"). A form-heavy page with little surrounding editorial
  content could read as thin.
- **Pages-per-session ~1.04.** This is the single biggest technical risk.
  It signals users landing on one page and leaving, which is the opposite
  of the "audience" behaviour ad networks want (repeat, browsing readers
  who see more ad impressions per visit). No published Journey rule sets a
  pages/session floor, but reviewers read engagement signals qualitatively,
  and 1.04 will visibly stand out against typical approved blogs (usually
  1.5 to 3+). This is worth improving cheaply before applying: internal
  links to related articles, a "related posts" module, or a calculator/tool
  that keeps users on-site longer.
- **Bing-dominant traffic (40% vs 26% Google).** Not a disqualifier in any
  published policy. Ad networks care about traffic being real, human and
  brand-safe, not which search engine sent it. This is a non-issue unless
  it correlates with something else (bot traffic, low quality), which the
  bot-filtering already rules out.
- **Thin content in places.** True across the estate per memory (design
  port / rewrite programs still open on some sites). A reviewer clicking
  through five random pages and hitting a thin one is a real risk,
  particularly for Generalist which has less content depth than Property.

Per-site honest probability read (not a guarantee, a working estimate from
the published bar plus the risk factors above):

| Site | Est. approval likelihood | Why |
|---|---|---|
| Property | High | Clears sessions 5x over, has the most content depth and the estate's most mature design port |
| Solicitors | Moderate-high | Clears sessions comfortably, growing fast, but the site is smaller in content footprint than Property, worth a quick thin-page check first |
| Generalist | Moderate | Clears the bare floor narrowly, lowest pageviews and least content depth of the three, and pages/session applies here too |

Cheap fixes before applying, all three sites: check ads.txt is clean of
other networks now (avoids a "not exclusive" flag), audit for any clearly
thin pages a reviewer would land on, and consider a lightweight related-
content block to lift pages/session before submitting. None of these are
deploys done by this pack; they are recommendations for the owner or a
future ticket.

---

## 6. Fallback ladder if Journey rejects a site

| Site | Traffic level | Next best option | Notes |
|---|---|---|---|
| Property | ~5,700/month | **Newor Media** (floor is 5,000 visitors/month) | Property just clears Newor's own floor; a natural next step if Journey says no |
| Solicitors | ~3,330/month, growing | **AdSense** (no session floor) now, revisit Journey or Newor once past 5,000/month | Fastest path to any revenue immediately, no threshold blocker |
| Generalist | ~1,700/month | **AdSense** (no floor) | Below Newor's 5,000 floor; AdSense is the only fallback until traffic grows |

Reapplying to Journey after a rejection: no formal waiting period found in
the published policy. Process is emailing help@journeymv.com to reset the
dashboard and reapply, with a reported 10-15 business day reply time on
appeals. Confirm this live before advising the owner it's risk-free to
retry immediately, secondary sources are consistent but not a primary
Mediavine statement.

---

## What was not verified

- Exact wording of journeymv.zendesk.com's minimum-requirements, policies
  and application-process articles could not be fetched directly (HTTP 403
  to automated tools). The owner should open these three links himself
  before submitting, in case wording has shifted since the search-engine
  snapshot used here:
  - https://journeymv.zendesk.com/hc/en-us/articles/24633185741723-Journey-Minimum-Requirements
  - https://journeymv.zendesk.com/hc/en-us/articles/23745987278363-What-is-Journey-and-How-to-Apply
  - https://journeymv.zendesk.com/hc/en-us/articles/34832302083483-Journey-Publisher-Policies
- Payout minimum ($25 vs $100) and payout schedule (Net 60 vs Net 65) carry
  a minor discrepancy across secondary sources, confirm at signup.
- The "GA now sufficient instead of Grow" claim is unconfirmed on any
  primary Mediavine page, treat Grow as required until Journey's own
  onboarding says otherwise.
- Per-site ads.txt current contents, GA4 live/dead status per site, current
  content-authorship model and payment/contact details are all
  TODO(owner), not researchable from outside the account.
