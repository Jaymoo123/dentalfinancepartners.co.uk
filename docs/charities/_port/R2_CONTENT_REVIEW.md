# R2 — independent adversarial content review (charities / Trustee Tax)

Reviewer: independent, adversarial. Scope: content integrity, crawlability, and what a design
port silently breaks. Reviewed the **rendered output** of the post-port production build served
at `http://localhost:3133` (identity confirmed: `<title>Specialist Charity Accountants UK</title>`).

Commits in scope: `78dcd3a5` (phase 0, content fixes, deliberate), `51acda3b` (estate article-body
+ privacy fixes), `ce37721f` (phases 1 to 6, design only). Pre-port production SHA `958460de`.

No server was started, no git write command was run, no file was edited except this report.
All scratch artefacts live in the session scratchpad and are not in the repo.

Counts: **1 blocking, 3 should-fix, 5 notes.**

---

## BLOCKING

### B1 — 17 FAQ answers are asserted to crawlers and render nowhere, on 7 pages. The port re-opened the exact defect phase 0 closed.

* **Severity:** blocking
* **URLs (7):** `/services/independent-examination`, `/services/charity-accounts`,
  `/services/charity-bookkeeping`, `/services/gift-aid`, `/services/charity-vat`,
  `/for/cics`, `/for/social-enterprises`
* **Command:**
  ```
  curl -s http://localhost:3133/for/cics | grep -c "CICs are not charities and cannot claim Gift Aid"
  curl -s http://localhost:3133/for/cics \
    | perl -pe 's/<script.*?<\/script>//gs' | grep -c "CICs are not charities and cannot claim Gift Aid"
  ```
* **Observed:** `1` and `0`. The answer text exists **only inside the FAQPage JSON-LD**. The
  served markup is the kit's Radix accordion with the panel closed and not force-mounted:

  ```html
  <button ... data-state="closed" ...>Can a CIC claim Gift Aid?<svg .../></button>
  <div data-state="closed" id="radix-_R_2epbsnpfenb_" hidden="" role="region" ...>
  ```

  The `hidden=""` region carries no children in the server HTML. Per-page asserted-vs-rendered:

  | URL | FAQPage answers asserted | rendered in server HTML |
  |---|---|---|
  | /services/charity-accounts | 2 | 0 |
  | /services/charity-bookkeeping | 2 | 0 |
  | /services/charity-vat | 2 | 0 |
  | /services/gift-aid | 2 | 0 |
  | /services/independent-examination | 2 | 0 |
  | /for/cics | 4 | 0 |
  | /for/social-enterprises | 3 | 0 |
  | **total** | **17** | **0** |

* **What is wrong:** `ce37721f` replaced the pre-port native `<details>/<summary>` FAQ (whose answer
  text is always in the HTML) with the kit's `FaqAccordion`. Verified:

  ```
  git show ce37721f^:charities/web/src/app/services/\[slug\]/page.tsx | grep -c "<summary\|<details"   -> 2
  git show ce37721f:charities/web/src/app/services/\[slug\]/page.tsx  | grep -c "<summary\|<details"   -> 0
  git show ce37721f:charities/web/src/app/services/\[slug\]/page.tsx  | grep -n FaqAccordion           -> 100
  grep -rn "forceMount" packages/web-shared/design/                                                    -> (no output)
  ```

  Same swap in `for/[slug]/page.tsx:119`. This is structured data asserting content that is not on
  the page — the defect the port's own commit message says it deliberately avoided on the blog route
  ("the kit's accordion unmounts closed content, which would have put the answers back out of the
  HTML while the JSON-LD still asserted it. Do not convert it."). The blog route was protected. The
  services and audience routes were not.

* **Smallest fix:** on `services/[slug]` and `for/[slug]`, render the FAQ the way the blog route
  does (server-rendered `<h3>` + `<p>`, or the pre-port `<details>/<summary>`), **or** add
  `forceMount` to the kit accordion's content primitive. Do not merely delete the FAQPage JSON-LD:
  the questions already render, only the answers are missing.

---

## SHOULD-FIX

### S1 — `ce37721f`, a design-only commit, authored six new published strings on `/calculators`, one of which makes a privacy claim.

* **Severity:** should-fix
* **URL:** `http://localhost:3133/calculators`
* **Command:**
  ```
  git show 958460de:charities/web/src/app/calculators/page.tsx > /tmp/co.tsx
  git show ce37721f:charities/web/src/app/calculators/page.tsx  > /tmp/cn.tsx
  diff <(prose-extract /tmp/co.tsx) <(prose-extract /tmp/cn.tsx)
  curl -s http://localhost:3133/calculators | grep -c "Nothing you type leaves your browser"
  ```
* **Observed (`1`, it renders):**

  | pre-port (958460de) | post-port (ce37721f) |
  |---|---|
  | "Free tools built on the current Charity Commission and HMRC rules (England and Wales, 2026/27). Every figure is sourced and kept up to date." | same sentence **plus** "Nothing you type leaves your browser, and there is no sign-up." |
  | *(absent)* | "A calculator gives you the shape of the answer" |
  | *(absent)* | "Every calculator, with the rules behind it" |
  | *(absent)* | "Pick a tool and it loads in place" |
  | *(absent)* | "Talk to a charity accountant" (new on this route) |
  | *(absent)* | "What it cannot see is your reserves policy, your restricted funds, or how this year's income changes which scrutiny threshold you fall under next year. If you want your own figures checked, tell us about your charity and we will come back to you." |

* **What is wrong:** two things. (a) A port is a chrome and template job; these sentences are not
  listed as deliberate in the brief and were not in production. (b) "there is no sign-up" is
  published on the hub that links to three calculators, and every one of those calculator pages
  carries a lead-capture form: `src/app/calculators/[slug]/page.tsx:129` renders `<MiniCapture>`,
  and `MiniCapture.tsx:89` POSTs to `/api/leads/submit`. The calculator *inputs* genuinely stay
  local (the kit's `track()` calls at `packages/web-shared/tools/components/Calculator.tsx:78-96`
  send `calculator_slug` and `field_id`, never values), so the first half is true; the second half
  sits one click away from a form that asks for a name and an email.
* **Smallest fix:** owner ruling. Either restore the pre-port intro verbatim and drop the five new
  strings, or keep them and cut ", and there is no sign-up".

### S2 — three blog posts now publish two `Article` nodes and two `Organization` nodes.

* **Severity:** should-fix
* **URLs:** `/blog/charity-finance/how-much-should-a-charity-hold-in-reserves`,
  `/blog/charity-finance/which-charitable-causes-earn-the-most`,
  `/blog/charity-governance/how-long-do-uk-charities-last`
* **Command:** parse every `application/ld+json` block and count top-level `@type`.
* **Observed:** `{'Article': 2}` on each; `Organization` count = 2 (one `publisher`, one `author`).
  Every other route has exactly one. Block 2 is the template's `buildArticleJsonLd`; block 4 is the
  post's own frontmatter `schema:` object, e.g.
  `{"@type":"Article","headline":"How Much Should a Charity Hold in Reserves? ...","author":{"@type":"Organization","name":"Trustee Tax Editorial Team"}}`.
* **What is wrong:** these are precisely the three posts that were emitting `[object Object]`. The
  fix at `src/app/blog/[category]/[slug]/page.tsx:111-116` correctly JSON-stringifies the object —
  and in doing so turned a broken script tag into a valid *duplicate* Article. The brief's rule
  ("exactly one Organization node per page") is violated on these three. `grep -rl "object Object"`
  across all 72 rendered pages returns **0**, so the original defect is genuinely fixed.
* **Smallest fix:** delete the `schema:` frontmatter block from the three `.md` files
  (`content/blog/how-long-do-uk-charities-last.md`, `how-much-should-a-charity-hold-in-reserves.md`,
  `which-charitable-causes-earn-the-most.md`). The template's own Article node is strictly richer.

### S3 — the new footer studio credit is a dofollow sitewide outbound link on all 69 chromed pages.

* **Severity:** should-fix
* **URL:** every page with chrome (69 of 72; the three `/embed/*` are chrome-free)
* **Command:** `curl -s http://localhost:3133/about | grep -o 'href="https://www.doublewiredcreative.com/"[^>]*'`
* **Observed:** `rel="noopener noreferrer"` — no `nofollow`, no `sponsored`.
* **What is wrong:** the footer credit itself is an owner ruling and is not in question. Its
  *follow* status is a separate decision that was made silently by the port: 69 dofollow outbound
  links to a single third-party domain is a sitewide link pattern.
* **Smallest fix:** add `nofollow` to the credit link's `rel` in the kit footer — or confirm the
  owner intends it to pass equity.

---

## NOTES

### N1 — the brief's `return` warning is correct and the CTA is intact.
`/thank-you` gates the CTA on `rt`, not `return`.
`curl -s "http://localhost:3133/thank-you?rt=/blog" | grep -o '<a[^>]*thankyou-return-article[^>]*>'` →
`<a data-cta="thankyou-return-article" data-cta-placement="thank_you" class="font-semibold text-primary-700 underline underline-offset-2" href="/blog">`.
With `?return=/blog` the count is `0`, and with no parameter the count is `0`. Both attributes are
byte-identical to the brief. Source: `src/app/thank-you/page.tsx:129-138`.

### N2 — seven blog FAQ answers are paraphrased rather than quoted in the body.
On `/blog/cics-and-social-enterprises/cic-funding-and-grants` (2),
`/blog/cics-and-social-enterprises/orcic-cic-regulator-explained` (1),
`/blog/gift-aid/business-donations-to-charity-tax` (1),
`/blog/trustee-compliance/annual-report-vs-annual-return` (1),
`/blog/trustee-compliance/best-charity-bank-accounts` (2), the JSON-LD answer text and the rendered
`<h3>`/`<p>` answer differ in wording (links, ordering, a dropped clause). The Q&A **is** on the page
— the blog route correctly server-renders its FAQ — so this is not B1. It is a weaker version of the
same risk and predates the port (no `content/*.md` changed in `ce37721f`). Worth a pass when the
per-category FAQ copy is next touched, not before.

### N3 — no fee, turnaround, regulated-work or invented-proof claim has returned. Zero, confirmed.
Swept the rendered text of all 72 routes for every phrase in the brief. All zero except two benign
hits, both inspected:
* `from £` — 5 files, every hit is register data, e.g. "median charity income varies more than
  threefold across charitable causes, from £53,344 for accommodation and housing charities down to
  £15,000". Not our pricing.
* `testimonial` — 1 file (`/blog/charity-accounts-and-sorp/charity-accounting-software-compared`):
  "Reference clients in your income band and sector are more useful than generic testimonials."
  Advice to the reader about software vendors. Not our proof.

`fixed fee`, `fixed-fee`, `our fee`, `priceRange`, `24 hour`, `24-hour`, `same working day`,
`one working day`, `we carry out the examination`, `we conduct the examination`,
`signed examiner's report`, `Conducted to CC31`, `Real outcomes`, `client base`,
`general commercial clients`: **0 across all 72 rendered pages.**

### N4 — every claim that must still be there is there.
All on `/privacy-policy` unless stated. Command: `grep -c` against the rendered text.

| claim | count |
|---|---|
| "three firms" (pool model) | 1 |
| "three related professions" (rendered as "up to three firms in related professions") | 1 |
| "at most six" | 1 |
| "48 hours" | 1 |
| "seven days" | 1 |
| "regulated firms in our specialist partner network" | 1 |
| Anthropic via the Vercel AI Gateway processor bullet | 1 |
| "internal grading rubric" (internal, not published) | 1 |
| Companies House bullet describing the public register | 1 |
| "After that we anonymise it" | 1 |
| the word "deleted" | **0** (correct, it must not return) |
| "country, region, city and time zone" (`/privacy-policy`) | 1 |
| "country, region, city and time zone" (`/cookie-policy`) | 1 |

### N5 — a heading states the audit gate income-only, with the asset limb in the next sentence.
`/blog/independent-examination-and-audit/charity-scrutiny-cliff-...` carries the section heading
"What changes at the £1 million audit gate" and "Above £1 million gross income, an independent
examination is no longer sufficient". House position 4 requires both limbs to be published
together. The very next sentence supplies it: "It also becomes mandatory if gross income exceeds
£250,000 and gross assets exceed £3.26 million, even if income has not reached £1 million." Reads
correctly in context; flagged only because a heading is quotable on its own. Pre-existing, untouched
by the port.

---

## CHECKED AND FOUND CORRECT

**Published words (brief §1).** `ce37721f` changed **no** `content/*.md`, `src/data/*` or
`src/lib/guides/*` file at all (`git show ce37721f --name-only` over those paths: empty). Every
published sentence the port's `.tsx` diff removed was verified still rendering, or verified still
present on a branch the crawl does not reach:

| sentence the diff removed | where it is now |
|---|---|
| "Each sector has its own rules." | renders, `/for` |
| "Specialist accounting for charities, CICs and social enterprises." | renders, `/for` |
| "Charity finance guides." | renders, `/guides` |
| "Charity accounting services." | renders, `/services` |
| "Not sure which service you need?" | renders, `/services` |
| "Speak to a charity accounts specialist." | renders, 5 pages |
| "The challenges trustees face." | renders, 5 pages |
| "Need advice on your specific situation?" | renders, 8 pages |
| "Need help with your charity's accounts?" + "Tell us about your charity, CIC or social enterprise and we will arrange a short introductory call." + "Get in touch" | moved verbatim into `src/components/blog/blog-cta.ts`, renders on every post and category hub |
| "Thanks, your enquiry is on its way." | renders, `/thank-you` |
| "You will not hear from us again about this enquiry" | `thank-you/page.tsx:47`, the `optout` branch (not a crawlable state) |
| "Thank you, that is everything we need" | `DetailsForm.tsx:114`, post-submit client state |
| the four research-index H1s | all four render on their pages |
| "Tell us about your charity, CIC or social enterprise. We will explain what your organisation needs, in plain English, with no obligation." | renders, homepage |

The homepage "We focus on organisations that sit below the statutory audit threshold…" paragraph and
the `/research` Open Government Licence attribution paragraph both exist at `958460de` — they are
false positives of a line-based extractor, not new copy. **The only real prose change is S1.**

**Crawl integrity (brief §2).** All 72 public routes return `200`. All 66 sitemap routes carry a
self-referencing canonical and no robots meta. `/book`, `/complete` and `/thank-you`:
`noindex, nofollow` and **no** canonical, as specified. The three `/embed/*`: `noindex, nofollow`
with a canonical pointing at the parent calculator, as specified. `sitemap.xml` has exactly 66
`<loc>` entries and none of the six non-indexed routes appears in it.

Hub child corpora counted in the **server HTML** as distinct `href` values, against the corpus on
disk (`content/blog/*.md` = 24, `content/guides/*.md` = 8):

| hub | distinct child links in server HTML | on disk / expected |
|---|---|---|
| `/blog` posts | 24 | 24 |
| `/blog` categories | 8 | 8 |
| `/guides` | 8 | 8 |
| `/calculators` | 3 | 3 |
| `/services` | 5 | 5 |
| `/for` | 2 | 2 |
| `/research` | 4 | 4 |

Per-category hubs, server HTML vs sitemap: trustee-compliance 5/5,
independent-examination-and-audit 4/4, gift-aid 4/4, cics-and-social-enterprises 4/4,
charity-finance 2/2, charity-vat 2/2, charity-accounts-and-sorp 2/2, charity-governance 1/1 —
24 total, nothing truncated. `/blog` does **not** lose 12 posts to the kit's 12-per-page slice: the
route renders `BlogListWithSearch` *and* `HubArticleList`, and all 24 `<a href>` survive in the
server HTML, which I confirmed independently of the source comment that claims it.

Every distinct internal `href` on the site (73) was fetched: **zero non-200**. No `/locations` link
anywhere, so the `companyItems` override held.

**Structured data (brief §3).** Every JSON-LD block on every one of the 72 routes **parses**
(`json.loads`, zero failures). `BreadcrumbList` count is 0 or 1 on every route, never more.
`[object Object]` appears on **0** pages. 305 FAQPage answers are asserted site-wide; 288 render.
The 17 that do not are B1; the 7 near-misses are N2. No *new* unrendered assertion beyond B1 —
B1 is the one, and it is a regression of the old one, not an addition to it. Organization is 1 per
page except the three of S2.

**Facts (brief §6), against `docs/charities/house_positions.md`.** Every rendered figure checked:
* Independent examination gate: £25,000, rising to £40,000 — **12 distinct rendered statements, all
  framed "for financial years ENDING on or after 30 September 2026"**. No "beginning" framing on an
  England and Wales threshold anywhere.
* Audit: "£1 million, or £250,000 with gross assets over £3.26 million", and "£1.5m, or £500,000
  with assets over £5m" from the same date. Both limbs published together in 18 of 19 statements;
  the 19th is N5.
* Annual-return **filing** tier: 14 distinct statements, every one says **£25,000**. None drifts to
  £40,000. The £10,000 question tier is also stated correctly.
* Scotland: "for financial years **beginning** on or after 1 January 2026 a Scottish charity needs
  an audit once gross income reaches £1,000,000, or where gross assets exceed £3.26 million, and an
  independent examination below that", on
  `/calculators/independent-examination-vs-audit-checker`, with the beginning-vs-ending mismatch
  called out explicitly in the next sentence. Correct per position 26 and the TRAP note.
* GASDS: "£30 or less" (5 statements), "without needing a Gift Aid declaration", "£8,000" cap,
  "cannot exceed 10 times the donations on which you claim Gift Aid in the same tax year"
  (7 statements), "You cannot claim GASDS and Gift Aid on the same donation", and explicitly
  "There is no first-year exemption from the matching rule; what changed on 6 April 2017 was the
  separate two-year track record needed to be eligible at all". Every banned framing absent.
* Company audit exemption: the site publishes **no** numeric small-company size test, so there is
  nothing to contradict £15m / £7.5m / 50. The stale £10.2m / £5.1m figures appear **0** times, as
  do £2.8m and the pre-2026 Scottish £500,000 gate.

**Other design-port failure modes swept clean.** Exactly one `<h1>` on all 69 chromed routes
(the three `/embed/*` have none, which is correct for a chrome-free noindex embed). Zero duplicate
`<title>` across 72 routes. Zero em-dashes in rendered copy on all 72 routes. No new capture
surface: `MiniCapture` count on `calculators/[slug]` is 2 before the port and 2 after,
`CalcResultCta` present in both.

---

## WHAT IN THE BRIEF I FOUND TO BE FALSE

1. **"Exactly one Organization node and at most one BreadcrumbList per page" is not met** — three
   posts carry two. See S2. (Stating this as a found defect, not a brief error.)
2. Nothing else in the brief was wrong. Specifically **verified correct**: the `rt`-not-`return`
   warning (a check on `return` reports a false failure — confirmed, count 0); 66 sitemap entries;
   72 public routes; the corpus counts 24/8/8/3/5/2/4; the three noindex conversion pages having no
   canonical; embeds canonicalising to their parent calculator.

## WHAT I COULD NOT CHECK

1. **Client-rendered state.** I reviewed server HTML only, as instructed (no browser). The
   `/thank-you` opt-out branch and the `DetailsForm` success panel were verified in source, not in a
   running browser. This does not weaken B1 — B1 is about what a crawler gets, and a crawler gets
   the server HTML.
2. **Visual regressions**: contrast, layout, the white-on-white hero fix, the reading-progress bar.
   Out of my scope and not checkable without a browser.
3. **The 116-answer figure** in the brief. I measured the *current* build: 305 answers asserted, 17
   unrendered. I have no pre-port rendered baseline to confirm the number was ever 116, only that it
   is not 116 now and is not 0 either.
4. **Whether the new `/calculators` copy was owner-approved out of band.** I can only see that it is
   not in the deliberate list and not in production at `958460de`.
