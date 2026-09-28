# Estate parity research: the estate report (2026-09-28)

Written from the 17 per-site reports (`docs/<site>/PARITY_RESEARCH_2026-09-28.md`), the data read
(`ESTATE_DATA_READ_2026-09-28.md`) and the ops read (`ESTATE_OPS_READ_2026-09-28.md`). Nothing was
built, fixed or deployed. Numbers carry the report they came from the first time they appear.

---

## 1. Verdict in three lines

All 17 sites are live and none of them is broken, but only seven carry the work of the last five
days: ten sites are 13 to 22 commits behind and are still serving the 23 September build [ops read].
The money pages on those ten are where the damage is: five sites tell Google their own service and
segment pages are copies of the homepage, and four sites render no enquiry form at all on the pages
a buyer actually lands on. Twelve of the 17 still tell a prospect that somebody else does the work,
which the 28 September ruling now calls a defect, and the worst offender by volume is Dentists at
97 occurrences across 21 files [Dentists report].

---

## 2. The five things that matter most

**One. Ten sites are running last week's code, so the fixes already written are not live.**
Property, Medical, care, charities and contractors-ir35 sit at HEAD; Dentists and generalist are two
docs-only commits behind. The other ten are on the 23 September batch or older: ecommerce 22 commits
behind, construction-cis, startups-tech and hospitality 16, crypto and pharmacies 15,
digital-agency 14, Solicitors, wills-probate and divorce-finances 13 [ops read]. Everything written
on 28 September, the positioning reversal, the canonical-hub fix and the lead-kit corrections, is in
the repository and not on those ten sites. This is the cheapest item in this document: no code, one
deploy round.

**Two. The live blockers are on money pages, not on the homepages.** Construction-cis serves
`rel="canonical"` pointing at its own homepage on 50 of the first 60 sitemap URLs, including all 39
segment pages, `/services`, `/about` and `/contact` [construction-cis report], so its whole segment
estate is de-indexed by its own tag, and the fix (`bb297ab2`) was written on 27 September and never
deployed. Hospitality, ecommerce, wills-probate and divorce-finances carry the same defect on their
`/for` and `/services` hubs. Separately, ecommerce prints raw HTML anchor markup as visible body
text on 15 live pages, 39 occurrences on one page alone; pharmacies does it on all five segment
pages; startups-tech on four; hospitality on six. And ecommerce renders zero forms on 15 commercial
pages, hospitality on 11, crypto on six of the ten pages read, startups-tech on seven of ten. The
Solicitors homepage renders no `h1` at all [Solicitors report].

**Three. The positioning reversal reached five sites and twelve still speak the old voice to
prospects.** Corrected on 28 September: Property, Medical, care, charities, contractors-ir35. Still
carrying caveats on prospect-facing surfaces: Dentists 97 occurrences across 21 files, with 29
caveat sentences measured on six of seven rendered pages; Solicitors 22 files, 18 rendered
sentences, and the `/about` page's own `h1` is the caveat; construction-cis on the homepage,
`/about`, `/services` and `/contact`; startups-tech on `/contact`, `/complete`, `/thank-you`;
crypto on four surfaces; wills-probate and divorce-finances throughout, in an explicit
"free information service, not a law firm" voice; pharmacies, ecommerce and hospitality on the
post-submit pages only; digital-agency on `/contact` alone; generalist on `/complete` and `/contact`.
Property is not clean either: "A specialist reviews" renders as an uppercase section heading on 11
segment pages [Property report].

**Four. Property's own defects propagate, because Property is the template.** The footer
"Book a consultation" link points at an untokened `/book` that renders zero form elements, and that
same dead page is now confirmed live on Property, care, charities, contractors-ir35, Dentists,
Solicitors, digital-agency, construction-cis, ecommerce, hospitality, pharmacies, crypto,
wills-probate and divorce-finances. Generalist is the only site whose `/book` renders a form. No form
field shows a visible focus ring on any site the readers measured. And the primary call-to-action
fails WCAG AA on the three sites cut from the newest palettes: Property 3.65:1, ecommerce 3.04:1,
wills-probate and divorce-finances 2.89:1, against the 4.5 floor. Charities is the best on the estate
at 7.85:1, so this is a token choice, not a technical limit.

**Five. The two sites everyone believed were unlaunched are live, and invisible on purpose.**
Wills-probate and divorce-finances both answer HTTP 200 on every machine route, serve 189 and 77
sitemap URLs, and have real content, real fonts, live chat widgets and live blog capture. Both serve
an `/llms.txt` that reads "STUB (pre-launch): the site is built but not yet published ... nothing here
should be cited or indexed", which tells every assistant not to cite them, and both serve an
`og:image` at `/brand/icon-alt.png` that returns 404, so every shared link has a blank card. Both
have zero rows in `web_sessions` and zero leads ever recorded, under any plausible site key, while
serving pages for weeks [data read]. That is an analytics-beacon question, not a traffic finding.

---

## 3. Heat table: sites by dimension

Cells are the worst gap in that dimension from the site's own report. Data columns are leads per
1,000 UK humans over 90 days and UK humans over 90 days [data read].

| Site | Positioning | Lead kit | GEO | Content | Design | Ops | per 1,000 | UK humans |
|---|---|---|---|---|---|---|---:|---:|
| Property | S | S | S | NONE | S | NONE | 18.0 | 11,119 |
| Medical | XS | S | M | L | NONE | NONE | 33.0 | 817 |
| contractors-ir35 | S | S | M | L | S | NONE | 70.2 | 114 |
| care | XS | L | S | L | L | L | 44.2 | 113 |
| charities | S | M | S | L | S | M | 15.6 | 384 |
| Dentists | L | S | S | L | S | S | 5.9 | 853 |
| Solicitors | L | M | M | M | M | S | 2.2 | 4,170 |
| generalist | M | M | L | L | XS | S | 5.0 | 3,431 |
| digital-agency | XS | M | S | L | L | S | 5.6 | 180 |
| construction-cis | L | S | L | M | S | M | 12.4 | 403 |
| crypto | M | L | M | L | NONE | M | 26.3 | 38 |
| ecommerce | M | L | L | M | L | L | 21.7 | 46 |
| hospitality | S | L | L | M | L | M | 0.0 | 99 |
| pharmacies | M | L | M | M | L | M | 10.9 | 92 |
| startups-tech | L | L | M | M | L | M | 19.6 | 51 |
| wills-probate | L | M | L | L | L | L | no data | no data |
| divorce-finances | L | M | L | L | L | L | no data | no data |

Single worst finding per site:

- **Property**: the footer books a consultation on a page that renders no form, on every page.
- **Medical**: the calculator result serves no capture form at all, not even a gated one.
- **contractors-ir35**: the highest-converting site in the estate has no service pages, only a hub.
- **care**: no chat widget, no intent engine, no sticky element of any kind, and no web font.
- **charities**: GA4 is not configured at all, so the site has run blind since launch.
- **Dentists**: 97 caveat occurrences and nothing published since 4 June.
- **Solicitors**: the homepage has no `h1`, on the estate's second-largest audience.
- **generalist**: no segment-page layer exists at all, on 3,431 UK humans.
- **digital-agency**: the design kit has never been adopted; the playbook gate reads 0/0/0/0.
- **construction-cis**: 50 of 60 live pages canonicalise to the homepage.
- **crypto**: six of ten rendered pages carry no form.
- **ecommerce**: 15 live pages print raw HTML as visible text, and 15 carry no form.
- **hospitality**: eleven commercial pages with no conversion path and no header button anywhere.
- **pharmacies**: raw HTML on all five segment pages, and no header, sticky or chat prompt at all.
- **startups-tech**: seven of ten playbook gate rows fail and four pages break the phone viewport.
- **wills-probate**: its own `llms.txt` tells assistants not to cite it.
- **divorce-finances**: `/services` opens with "Full service detail is being built now."

---

## 4. Ranked gap list by leverage

Leverage is UK humans times the leads-per-1,000 rate, weighted up where one fix serves many sites.
Freshness caveat, stated once: Property's 15 segment pages produced zero entry-page leads in 90 days
because they went live on 28 September, so that zero is immaturity, not failure; wills-probate and
divorce-finances have no data at all; and the top rates rest on tiny denominators, contractors-ir35
being 8 leads on 114 humans and crypto 1 on 38 [data read].

### A. Deploy what is already written

One deploy round, no new code. Highest leverage item in this document.

| Sites | Behind | What the deploy turns on |
|---|---:|---|
| construction-cis | 16 | canonical fix on 50 pages, firm voice, lead-kit corrections |
| hospitality | 16 | canonical fix on both hubs |
| startups-tech | 16 | firm voice, header security |
| crypto, pharmacies | 15 | firm voice, header security |
| digital-agency | 14 | firm voice |
| Solicitors | 13 | firm voice, kit corrections |
| wills-probate, divorce-finances | 13 | canonical fix, header security |
| ecommerce | 22 | the entire design port, blog capture, canonical fix |

ecommerce is the standout: a full six-phase design port, tagged 26 September, plus blog lead capture,
sitting undeployed while the live site serves a pre-port build with no capture on any money page.

### B. Shared fixes, one change serving many sites

| Item | Sites | Size | What it unlocks |
|---|---|---|---|
| Dead untokened `/book` in the shared template; the footer link is the defect, not the gate. contractors-ir35 already has the right wording ("An accountant will call you then") | 14 | S once | Every footer booking click currently dead-ends |
| No visible focus ring on form fields; `outline-style: none` with a transparent shadow | every site measured | S | Keyboard and low-vision users cannot see where they are |
| Call-to-action contrast token: Property 3.65, ecommerce 3.04, wills and divorce 2.89 | 4 | XS | AA compliance on the primary button |
| Pre-launch `llms.txt` stub telling assistants not to cite | wills-probate, divorce-finances | XS | Two live sites currently opt out of every assistant |
| `og:image` at `/brand/icon-alt.png` returns 404; `public/brand/` does not exist | wills-probate, divorce-finances | XS | Every shared link shows a blank card |
| Nurture `delayHours` running `0,0,4,24,48,96,168,264`, which is Property's gap sequence read cumulatively. Corrected on four sites by `63087d14` | 12 remaining | S | Later nurture sends currently fire far later than intended |
| Raw HTML anchor markup stored in body copy and rendered as a JSX text child | ecommerce 15 pages, pharmacies 5, hospitality 6, startups-tech 4 | M | A prospect currently reads a broken site |
| Homepage canonical on hub pages (`layout.tsx` default never overridden) | construction-cis, hospitality, ecommerce, wills-probate, divorce-finances | XS code, already written for three | De-indexed service and segment layers |
| Sitemap `lastModified` set to build-time `now`, or frozen (Medical every entry reads 2026-06-03) | 10 plus Medical | XS | Every page looks freshly edited on every deploy |
| `StatsCounter` renders 0 for a non-numeric value; generalist's homepage mapper is unguarded while its own `/services` mapper is guarded | shared component | XS | Latent, the Medical date-as-zero class |
| Missing `X-Frame-Options` | crypto, ecommerce, pharmacies, startups-tech | XS, rides the deploy | One header gap, not four |
| Empty `google_analytics_id` | charities, crypto, ecommerce, pharmacies, divorce-finances | XS | Five live sites collecting nothing |
| Missing `gsc_config.py` entries | crypto, ecommerce, hospitality, divorce-finances, wills-probate | XS | Sites invisible to the estate's Search Console discipline |
| Missing IndexNow script (key file present on some, script absent) | Medical, contractors-ir35, care, charities, crypto, ecommerce | XS each | New pages are not pushed to Bing, the index assistants search |
| No `Service` node and no `BreadcrumbList` on segment and service pages, where Medical serves 7 and 1 | crypto, ecommerce, hospitality, pharmacies, startups-tech, construction-cis, wills-probate, divorce-finances, Solicitors, Dentists | S per site, one template | The pages assistants pick for specific buyer needs |

### C. Per-site packages

| Site | Package | Size |
|---|---|---|
| Dentists | Positioning sweep: 97 occurrences, 21 files, 29 rendered sentences. Plus a coverage map | M |
| Solicitors | Positioning sweep: 22 files, 18 sentences, the `/about` `h1`. Plus the missing homepage `h1`, 10 em-dashes, 4 American spellings | M |
| construction-cis | Positioning decision then sweep; six files, four rendered sentences across four top pages | M, gated on decision 2 |
| crypto, startups-tech | Lead forms on the segment, service and blog pages that have none; segment closers that paste the slug into English ("your miners situation") | M each, one shared template |
| ecommerce | Lead forms on 15 pages; body-copy markup fix; contrast tokens; `/about` body text at 2.48:1 | M |
| hospitality | Lead forms on 11 pages; a header call-to-action, which the site does not have at any width | M |
| pharmacies | Markup fix on 5 pages; header and sticky layer; `/for/locum-pharmacists` has no form | M |
| care, charities | Chat, intent and sticky port; forms on `/about` and `/services`; care has no header button and no web font; both stack two identical capture forms on the calculator page | M each |
| generalist | Build a segment-page layer from nothing, with schema | L |
| wills-probate, divorce-finances | One package, not two: identical shell, identical defects. STATE correction, Vercel project recorded, `llms.txt`, `og:image`, canonicals, contrast, and a production database check that leads are actually landing | M |
| Medical | Calculator capture form; `/for-*` schema is already live and correct, contrary to wave 1 | S |
| contractors-ir35 | Service pages (none exist); blog category CTA is dead code; remove the blog-placement calculator gate | M |

### D. Programmes

| Programme | Scope | Note |
|---|---|---|
| Design port | care, digital-agency, hospitality, pharmacies, startups-tech, wills-probate, divorce-finances | Seven sites with zero kit imports. The playbook records that the six launched unported sites carry under 4% of estate impressions |
| Segment-page content chain | Priority sites only, per the 27 September ruling | Property's 15 pages cost about 52 agent runs |
| Content freshness | Dentists (nothing since 4 June), digital-agency (28 July), crypto (15 July), startups-tech (mid-July). Hospitality, pharmacies and ecommerce are database-backed and could not be dated from the repository | Four confirmed, three unknown |
| Calculators and their schema | Counts range from 21 on generalist and 13 on Dentists and Solicitors to 3 on hospitality and pharmacies; no site carries a cite-this line | Lower priority: calculators produced four leads estate-wide in 90 days [data read] |

---

## 5. What is mechanical and what is a programme

Yardsticks from the leads-250 plan: Property's 15 segment pages cost about 52 agent runs; four small
sites' pages and posts about 220 runs; a design port is a multi-day programme per site; a mechanical
sweep is one Sonnet agent per site plus one Opus read.

**Mechanical.** Roughly 14 Sonnet agents plus 4 Opus reads, plus one deploy round.

1. The ten deploys. No agents, one session.
2. The shared template fixes in group B: `/book`, focus ring, contrast tokens, canonical default,
   sitemap dates, `StatsCounter` guard. One agent each, one Opus review across all of them.
3. The plumbing: five `gsc_config` entries, six IndexNow scripts, five GA4 ids, `llms.txt` and
   `og:image` on two sites. One agent for the lot.
4. The body-copy markup fix: one agent, four sites, one shared data-rendering cause.
5. The positioning sweeps: one Sonnet per site on Dentists, Solicitors, construction-cis,
   startups-tech, crypto, pharmacies, ecommerce, hospitality, digital-agency, generalist,
   wills-probate, divorce-finances, plus one Opus read that sweeps by rule and not by file list.
6. Lead forms onto the pages that have none: one agent per site on ecommerce, hospitality, crypto,
   startups-tech, pharmacies.

**Programme.** Weeks, not sessions.

1. Design port on seven sites. Multi-day each, and the playbook says to budget a mop-up package.
2. Segment-page content chain. About 52 runs per site at Property's shape.
3. Content waves on the four sites with nothing since July, or a decision to stop.
4. A segment-page layer built from scratch on generalist.

---

## 6. Contradictions found

**Memory and STATE.md said two sites were unlaunched. Both are live.** `docs/wills-probate/STATE.md`
says "no Vercel project ... nothing is deployed"; the site serves 189 sitemap URLs.
`docs/divorce-finances/STATE.md` says the same; the site serves 77 and a real deployment id. Both
went live around 25 to 26 September and nobody has been tracking them.

**STATE.md is stale in a way that misleads on seven more sites.**

| Site | What its STATE.md says wrongly |
|---|---|
| care | "Brand: NOT LOCKED", domain `www.brand-tbd-care.invalid`, placeholder phone, S7/S8 unchecked. The site is live on carehometax.co.uk |
| hospitality | "DEPLOY IS HELD" at the top, while its own 08-25 entry proves production has been live since 16 July |
| ecommerce | "DEPLOY HELD", S7 and S8 unchecked, GA4 and DNS listed as to-do. The site has been live for days on a pre-port build |
| Medical | Last recorded deploy 6 July, and the closing line reads "production still serves the pre-port design and the pre-audit copy". Live pages serve the ported design |
| charities | Newest entry 16 July, lists GA4, domain, phone and DNS as open. Only GA4 is genuinely still open |
| Solicitors | The 12 September entry locks in the "partner network" wording as deliberate and legally matched, which the 28 September ruling reverses. It documents the opposite of current policy |
| digital-agency | "GA4 not configured" is stale (it is consent-gated and wired) and the deploy pointer is a month old |

**A finding was withdrawn.** Two site reports said GA4 was blocked by a missing
`region1.google-analytics.com` entry in the content security policy (hospitality, wills-probate). The
ops read checked all 17 live headers: every site carries `https://*.google-analytics.com`, which
covers the regional host by wildcard, and the shared header builder uses the wildcard deliberately
for exactly that reason. The GA4 regional fix is live everywhere. A literal string check
false-negatives here.

**Wave 1 claims that the readers corrected.**

| Site | Wave 1 claim | Correction |
|---|---|---|
| construction-cis | Canonical fix present, "NONE (fixed)" | False live. 50 of 60 URLs canonicalise to the homepage; the commit exists, the deploy does not |
| construction-cis | 27 files import the design kit, read as full adoption | Only 2 distinct kit components across 14 call sites; the homepage imports zero |
| Property | `/book` not re-verified | Verified: zero forms, and the footer link on every page is untokened |
| Property | No row for contrast or focus | Both fail: 3.65:1 and no visible ring. The inventory had no row for either |
| Medical | Segment pages carry zero schema | False. `/for-gps` serves 7 Service nodes, 1 FAQPage, 1 BreadcrumbList |
| Medical | Calculator result "hidden behind a modal gate" | Understated: no capture form is served on that page at all |
| Medical | Design gate "would almost certainly fail" | Passes 9 of 10 rows; only the ring-guard row fails |
| Dentists | `/book` unknown, identical closers "cannot be shared" | `/book` renders zero forms; the closers are shared, on the service pages |
| Dentists, Solicitors, generalist, digital-agency | Canonical state unknown | Defect absent on all four; hubs self-reference |
| Solicitors | No writing check run | Homepage has no `h1`, 10 em-dashes across two pages, 4 American spellings |
| generalist | `/book` and Aswatax unknown | `/book` renders a form and the Aswatax line is present. The only site that passes |
| generalist | 2 calculator route directories | 21 calculators, served by the dynamic route |
| digital-agency | Design state "?" | The gate fails four blocker rows and reads 0/0/0/0, the pre-uplift crypto pattern |
| care, charities | Calculator "one form, no gate" | Two identical capture forms on the same page, on both sites |
| care | Lead form mounted on `/services` | `/services` renders zero forms. No header call-to-action exists at any width |
| hospitality | Forms missing on four page files | Twelve live pages render zero forms, and no layout-level form exists |
| ecommerce | Segment pages "right shape" | FAQPage only, no Service, no BreadcrumbList, no form, no stat tiles |
| pharmacies | Canonical state unknown | No defect. The only one of its reader group that is clean |
| pharmacies | Lead form on all segment pages | `/for/locum-pharmacists` renders zero forms |
| crypto, startups-tech | Blog CTA mechanism unknown | There is none live. Blog posts serve zero forms and zero capture ids |
| startups-tech | 390 px not attempted | Fails: 417 px on four pages, 592 px on the blog post, against a verified 390 control |
| wills-probate, divorce-finances | `llms.txt` implied fine | Both serve a pre-launch stub telling crawlers not to cite the site |
| wills-probate, divorce-finances | Canonical "not distinguishable" | Defect present live on `/about`, `/services` and both segment pages |

---

## 7. Owner decisions

**1. Deploy the ten sites now, or after the positioning sweep?**
Ten sites are running last week's code, and the fixes for their worst live faults are already
written.
- Deploy now: the canonical faults, the security header and the firm voice go live this week on the
  sites that already have a fix. Some sites will still say the wrong thing in places the sweep has
  not reached.
- Deploy after the sweep: everything lands once, cleanly, in one or two weeks. The de-indexed pages
  stay de-indexed for that time.
- Recommendation: deploy now. The canonical fault is hiding 39 pages on one site alone and every day
  it stays is a day of lost indexing; the wording can follow.

**2. Trade Tax Specialists routes each enquiry to up to six partner firms, and says so on its
privacy, about, contact and completion pages. Keep that model or change it?**
This is not stray copy, it is how the site actually fulfils enquiries, and the firm-voice ruling is
in direct tension with it.
- Keep the model and exempt the site: honest, but one site in the estate keeps speaking differently
  from the other sixteen.
- Convert it to doing the work: consistent everywhere, and it means changing how those enquiries are
  actually serviced, not just the words.
- Recommendation: convert it, because a single voice across the estate is what makes assistants name
  us as a firm, and that channel is where the leads are coming from. But confirm the servicing side
  can carry it before any words change.

**3. The estate-planning and divorce sites describe introducing people to a regulated law firm. Same
question.**
These two cannot claim to do the legal work, so the choice is narrower.
- Keep the introducer voice but stop calling it a network: describe the introduction plainly and
  drop the "not an accountancy practice" wording. Honest and compliant.
- Restate the whole proposition as the money side of the matter, which we do do, with the legal
  referral as a named step.
- Recommendation: the second. It puts us in the firm voice for the part we deliver and keeps the
  legal introduction honest.

**4. Which sites get the segment-page content chain?**
The 27 September ruling was to grow the sites that convert. The rates say the medical site converts
at 33 leads per 1,000 visitors on 817 visitors, the contractor site at 70 on 114, the care site at
44 on 113, against the solicitors site at 2 on 4,170.
- Follow the rates: medical, contractor, care, charities. Three of those four have tiny visitor
  numbers, so the rates could move a lot on a handful of leads.
- Follow the volume: solicitors and the generalist site, where the traffic already is, accepting
  their low conversion.
- Recommendation: the medical site first and alone for one round, because it is the only high rate
  with enough visitors to trust, then the contractor and care sites once the medical round has a
  measured result.

**5. In what order do the seven unported sites get the design work?**
Seven sites have never had the design kit. The playbook records that the six launched unported sites
carry under four per cent of all estate impressions.
- By traffic: the care site and the estate-planning and divorce pair first.
- By damage: the hospitality, pharmacy and founder sites first, because those three render in
  whatever font the visitor's phone supplies, which reads as an unfinished template.
- Recommendation: by damage, and only after the mechanical work in group two, because a site with no
  enquiry form on its main pages gains nothing from being prettier.

**6. The free first call and the 24-hour promise, still open from the lead-kit check.**
The promise to reply within 24 hours appears roughly 115 times on the property site and nothing
sends a reply that says so.
- Keep the promise and build the email that keeps it.
- Soften the wording to one working day, which the sequence already meets.
- Recommendation: build the email. The promise is a real conversion driver and the fix is one
  message.

**7. Four sites have published nothing since July. Fund, pause, or park?**
The dental site last published on 4 June, the agency site on 28 July, the crypto site on 15 July and
the founder site in mid-July.
- Fund: content waves on all four, which is the largest spend line available.
- Pause: keep them accurate, publish nothing, revisit in a quarter.
- Park: stop all work and let them sit.
- Recommendation: pause all four. None of them converts well enough to earn a wave, and the same
  agent time on the medical site is worth more.

**8. Two live sites currently tell assistants not to cite them, and have never recorded a single
visitor.** Raised by the evidence rather than on the original list.
- Fix the file and the analytics beacon this week, then measure for a month before deciding anything
  else about those two sites.
- Recommendation: do that. Right now we cannot tell whether they have no visitors or no measurement.

---

## 8. Agents used

Wave 1: one pre-inventory Sonnet agent, 17 per-site Sonnet inventory agents (the Medical inventory
spawned three sub-agents of its own), one Opus data agent, one Sonnet ops agent. Wave 2: four Opus
readers, four sites each, reading rendered pages. Synthesis: this agent. Twenty-five agents launched,
28 counting Medical's three sub-agents.

---

## 9. What this research did not do

- No builds, no deploys, no fixes, no form submissions, nothing committed and nothing pushed.
- `npm run build` was not run locally on the ten sites that are behind, so nobody has confirmed the
  undeployed commits build cleanly on each of them. That is the first thing to check before the
  deploy round in group A.
- Nurture environment values were read as key names only on three Vercel projects; the actual on or
  off value of `LEAD_NURTURE_ENABLED` is unread on all 17, and 14 projects were not checked at all.
- Eight sites have zero rows in `monitored_pages` (charities, care, crypto, ecommerce, pharmacies,
  startups-tech, wills-probate, divorce-finances) and nobody established whether that is expected
  because no wave ever ran, or a broken registration.
- The ten red "Content Quality Check" continuous-integration runs were counted but their logs were
  not opened, so the failure cause is unknown. All ten emailed the owner.
- Whether the lead-table constraint in production accepts every site's source string was not read
  from the database; three site reports left it as an open question, and if it rejects one, that
  site's forms are failing silently.
