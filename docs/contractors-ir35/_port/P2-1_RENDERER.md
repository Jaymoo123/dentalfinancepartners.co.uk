# P2-1: blog post renderer restyle

Phase 2, package 1. Lease: `contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx`
(one file, nothing else edited). Template renders on 62 routes.

Nothing committed, nothing built, nothing deployed by this package. No git state changed.

---

## 1. What changed

| # | Change | Why |
|---|---|---|
| 1 | 420-520px blurred photo hero replaced by a light header card | the hero pushed h1, summary and every in-page route below the fold, made an off-domain decorative photo the LCP element via `next/image priority`, and carried no route to the ask. Same move the five sibling ports made |
| 2 | Hero photo + credit moved in-body as a `<figure>`/`<figcaption>`, plain `<img>` not `next/image` | carve-out E4 preserved, including both outbound Pexels links. The source is an off-domain hotlink, so the optimiser bought nothing |
| 3 | `Breadcrumb` keeps the phase 1 kit primitive; `onDark` dropped | the ground under it moved from navy photo to the light card. The phase 1 repoint is intact, only the boolean changed |
| 4 | Meta run (`12 min read · Published … · Updated …`) becomes four icon pills | standard's header-card recipe. Every fact still rendered, `<time dateTime>` kept on both dates |
| 5 | Closing ask gets `id="enquiry-form"`, `scroll-mt-24`, `aria-labelledby`, and a navy `slate-900` panel with the `LeadForm` in a white card | DESIGN_SYSTEM §0.5. It had none of the three, so nothing on the page could route to it. A "Skip to enquiry form" link in the header card is the route |
| 6 | Ask moved above the FAQ | canonical tail per §0.1 is panel, FAQ, footer. Navy never touches the navy footer |
| 7 | Radii and edges: `rounded-xl` + `ring-1 ring-neutral-200/70` everywhere | §0.1. Replaces `rounded-lg` / `rounded-2xl` / `border border-neutral-200` |
| 8 | Colour literals `cyan-700/800/900/50/100/200` replaced by the P1-7 `primary-*` ramp | `primary-600` IS `#0e7490` and `primary-700` IS `#155e75` on this site, so no hex moved. Single point for a future rebrand |
| 9 | Eyebrow gains the standard's 24x2 primary rule, keeps the mono face | DESIGN_DELTA N3 recommends keeping the mono eyebrow; the rule is adopted either way. Static span, not the kit `EyebrowRule` (see §5) |
| 10 | Related list becomes a two-column card grid with a derived "Article" pill | §0.6 recipe, matched by hand rather than by the kit component (see §5) |
| 11 | Desktop TOC: host owns one sticky clamp, `stickyDesktop={false}` passed | carve-out E13. See §4 |
| 12 | FAQ `dd`'s `dangerouslySetInnerHTML` moved off an inner `<span>` onto the `<dd>` | 3 posts carry block-level markup in an answer, and a `<p>` inside a `<span>` is invalid HTML the browser reflows out of the span. Identical text, valid structure |

Unchanged on purpose: every capture-surface mount and its position, the schema fallback,
the FAQ `<dl>`, the article container (`siteContainerLg`), the `article-body prose-blog`
body wrapper, the intent taxonomy calls, `formatUkDate`.

---

## 2. The FAQ verdict: the `<dl>` STAYS

**The kit `FaqSection` is NOT adopted here, and this is the correct call.** The block
remains a server-rendered `<dl>` / `<dt>` / `<dd>` with `dangerouslySetInnerHTML`, always
open, no disclosure state.

Two independent regressions avoided, both re-derived this package rather than taken on
trust:

| Claim | Command | Result |
|---|---|---|
| Every post has FAQs, so the blast radius is the whole corpus | `grep -c "^faqs:" content/blog/*.md \| grep -vc ":0"` | `62` of 62 |
| The kit escapes answers, and some answers carry real markup | `grep -lE '^\s+answer: .*<(strong\|a \|em\|ul\|li\|br\|p)' content/blog/*.md \| wc -l` | `3` |
| The kit's accordion content has no `forceMount` | `grep -n forceMount packages/web-shared/design/primitives/accordion.tsx` | no match |
| The pre-port page really does serve answers in server HTML | `curl -s http://localhost:3611/blog/umbrella-vs-limited-company/best-umbrella-company-how-to-choose \| grep -o '<dd' \| wc -l` | `10` |

Adopting the kit would have stripped FAQ answer text from the server HTML of all 62 posts
and printed raw markup as visible literal text on 3 of them. `web-shared` is shared by 18
sites and was not edited; the ruling is recorded here and in PHASE_PLAN §B.1.

Server identity asserted before trusting port 3611:
`curl -s http://localhost:3611/ | grep -o "<title>[^<]*</title>"` returned
`<title>Specialist Contractor Accountants | IR35 Advice UK</title>`. Read-only, nothing
started, nothing written.

---

## 3. The schema fallback: preserved verbatim, and one correction to the brief

```ts
const jsonLd =
  post.schema?.trim() ||
  buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);
```

Byte-identical to the pre-port line. A comment above it now records why.

**Checked the VALUE, never the key:**

| Question | Command | Result |
|---|---|---|
| How many posts carry a `schema:` key? | `grep -l "^schema:" content/blog/*.md \| wc -l` | `61` of 62 |
| What are the values? | `grep -h "^schema:" content/blog/*.md \| sort \| uniq -c` | `61 schema: ''`, every one empty |

So `post.schema?.trim()` is falsy on all 62 posts and the fallback fires on all 62. A
`grep -l` reading would have called it dead code.

**Correction to the brief.** The brief describes the risk as emitting "a SECOND FAQPage on
every post", and calls the fallback's output "the nested schema". On THIS site that is not
the shape. `buildBlogPostingJsonLd` (`src/lib/schema.ts:267-318`) emits a `BlogPosting`
with `speakable`, and it nests no `FAQPage`. The `FAQPage` is a separate, second
`<script>` built unconditionally by `buildFaqJsonLd(post.faqs)` and is not governed by the
fallback at all. So the real consequence of "simplifying" the fallback away here is worse
than a duplicate: `jsonLd` becomes the empty string and all 62 posts ship an **empty
`application/ld+json` script with no BlogPosting at all**, while the FAQPage keeps
rendering and hides the loss from an `@type: FAQPage` spot-check. PHASE_PLAN E2's
acceptance line ("JSON-LD with `@type: FAQPage` present on a sampled post") is therefore
necessary but NOT sufficient, the verification list in §6 checks `BlogPosting` too.

A second, undocumented dependency found while doing this: `buildBlogPostingJsonLd` sets
`speakable.cssSelector = [".tldr", "h1"]`. Pre-port, `.tldr` was carried by the takeaways
callout OR, on a post with no takeaways, by the summary paragraph. The summary now lives
in the header card, so the fallback branch was gone. Restored as a conditional class on
the header summary: `.tldr` still resolves on any post, with or without takeaways.

---

## 4. Carve-out acceptance table

Live vs inert is derived from the actual 62-post corpus, not from the code. Commands run
in `contractors-ir35/web`.

| # | Feature | Live or inert | How it renders now | Deriving command |
|---|---|---|---|---|
| E1 | FAQ block | **LIVE**, 62/62 | server-rendered `<dl>`/`<dt>`/`<dd>`, answers unescaped via `dangerouslySetInnerHTML` on the `dd`, `rounded-xl` card with a `border-primary-600` left rule | `grep -c "^faqs:" content/blog/*.md \| grep -vc ":0"` = 62 |
| E2 | Schema fallback | **LIVE on 62/62** | `?.trim() \|\|` verbatim, see §3 | `grep -h "^schema:" content/blog/*.md \| sort \| uniq -c` = `61 schema: ''` |
| E3 | Key takeaways | **LIVE**, 62/62 | `<section aria-label="Key takeaways">` with a real `<ul>`, `rounded-xl`, `bg-primary-50`, left rule. List semantics kept | `grep -c "^keyTakeaways:" content/blog/*.md \| grep -vc ":0"` = 62; 124 `- ` items counted under the key |
| E4 | Image credit | **LIVE**, 62/62 | `<figcaption>` under the in-body `<figure>`, both outbound links (`photographerUrl`, `sourceUrl`) preserved with `rel="noopener nofollow"` | `grep -A1 "^imageCredit:" content/blog/*.md \| grep -c 'photographer:'` = 62 |
| E4b | `post.image` itself | **LIVE**, 62/62 | in-body `<figure>` `<img>`, `ring-1 rounded-xl`. The navy-gradient no-image branch was dropped as unreachable; the `post.image ?` guard is kept | `grep -c "^image:" content/blog/*.md` = 62, all non-empty Pexels URLs |
| E5 | Sources-verified date | **LIVE**, 62/62 | trust line with tick icon under the header card, `formatUkDate` unchanged | `grep -c "^sourcesVerifiedAt:" content/blog/*.md` = 62, values `2026-06-12` / `2026-07-14` / `2026-08-04` etc |
| E6 | Published date | **LIVE**, 62/62 | `<time dateTime>` in a calendar pill | `grep -c "^date:" content/blog/*.md` = 62 |
| E6b | Updated date | **CORRECT BUT INERT** | `showUpdated` branch kept in full, including the tinted pill and the `Published` prefix it switches on. It is false on every post today | `updatedDate` present 62/62 but **equal to `date` on 62/62** (python diff, 0 differ). This is the inverse trap named in the brief: load-bearing-looking, zero live values. NOT deleted |
| E7 | Category as topic | **LIVE**, 62/62 | feeds breadcrumb item 3, the eyebrow, and `<InlineMiniLeadForm topic={post.category} />` at all 3 slots. Per-topic lead attribution unchanged | `grep -c "^category:" content/blog/*.md` = 62 |
| E8 | `h1` / `summary` | **LIVE**, 62/62 | `h1` is the header-card heading; `summary` is the card lede (and carries `.tldr` when takeaways are absent, §3) | `grep -c "^h1:"`, `grep -c "^summary:"` = 62 each |
| E9 | Inline mini lead forms | **LIVE** | 3 JSX slots, same 3 branch positions as pre-port | `grep -c "<InlineMiniLeadForm"` = 3 new, 3 old |
| E10 | Tool island | **LIVE** | 1 slot, after the first h2, unchanged | `grep -c "<ToolIsland"` = 1 new, 1 old |
| E11 | Next-step offer | **LIVE** | 1 mount, unchanged position (after the author aside, before related). Emits the `next_step` `data-cta` triple | `grep -c "<NextStepOffer"` = 1 new, 1 old |
| E12 | Premium upgrade | **LIVE** | 4 slots, all 4 branches | `grep -c "<PremiumUpgrade"` = 4 new, 4 old |
| E13 | Table of contents | **LIVE** | 2 mounts. `stickyDesktop={false}` passed deliberately on the desktop mount; the host `<div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">` owns the single clamp. Mobile mount unchanged (the prop only gates a `hidden lg:block` element) | `grep -c "<TableOfContents"` = 2 new, 2 old |
| E14 | Reading progress | **LIVE** | 1 mount, first child, unchanged | `grep -c "<ReadingProgress"` = 1 new, 1 old |
| E15 | Body HTML | **LIVE** | every branch still `dangerouslySetInnerHTML`, never escaped, inside `article-body prose-blog` | 4 `dangerouslySetInnerHTML` body sites, same as pre-port |
| E16 | `primaryKeyword` | **not this package** | 13/62 posts carry it, all non-empty. The renderer does not read it and did not read it before. P2-7 resolves consumption. Nothing deleted | `grep -l "^primaryKeyword:" content/blog/*.md \| wc -l` = 13 |
| E17 | Glossary raw HTML | **not this package** | `src/app/glossary/[slug]/data.ts`, outside the lease | n/a |
| E18 | ResourceGate consent string | **not this package** | outside the lease | n/a |

**Carve-outs in this package's scope: E1-E15. Checked: 15 of 15. Dropped: none.**
Live: E1, E2, E3, E4, E4b, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15.
Correct-but-inert, kept anyway: E6b (updated date).
Also dropped as genuinely unreachable, and named so it is not mistaken for a carve-out:
the `post.image ? … : <navy gradient>` **else** branch, which could not fire on any of the
62 posts, and the `takeaways ? … : post.summary` **else** callout, which could not fire
either and whose only live consequence (the `.tldr` hook) is preserved per §3.

---

## 5. Two kit components deliberately NOT adopted, and the reason is the same missing CSS

`contractors-ir35/web/src/app/globals.css` does not import
`packages/web-shared/design/globals-standard.css` and does not define its class rules
(P1-1 records the non-import; `grep -n "eyebrow-rule\|related-card\|data-draw" src/app/globals.css`
returns nothing).

1. **`design/primitives/EyebrowRule`**, a client component whose only job is to drive
   `.eyebrow-rule` keyframes via an `IntersectionObserver`. With the CSS absent the bar
   renders statically anyway, so the component would ship an observer to 62 routes to
   achieve exactly what a static `<span>` achieves. Replaced by a static 24x2
   `bg-primary-600` span. Identical rendered result, no JavaScript. This is
   DESIGN_DELTA §4 P3 ("any animated component adopted from the kit lands together with
   its keyframes") answered by not adopting the animation.
2. **`design/blog/RelatedArticles`**, **do not adopt this on this site until the CSS
   lands.** Its title link carries `focus-visible:outline-none`
   (`RelatedArticles.tsx:104`) and hands the focus indicator to a
   `.related-card:focus-within` rule in `globals-standard.css`. With that stylesheet
   absent, adopting it makes the focus ring **invisible** on 3 related links x 62 posts,
   and loses the hover affordance too. That is an accessibility floor, not a style
   preference, so the §0.6 "one card component" rule is deferred rather than broken. The
   recipe (`rounded-xl`, ring, kind pill, `line-clamp-3` excerpt) is matched by hand with
   a real `focus-visible` ring.

   **Reportable finding beyond this lease:** `construction-cis/web` adopted
   `RelatedArticles` in its own port and its `globals.css` also lacks `.related-card`
   (`grep -rn "related-card" --include=globals*.css` finds the rule only in
   `Property/web/src/app/globals.css` and `packages/web-shared/design/globals-standard.css`).
   If that is right, the sibling shipped the invisible-focus defect on its blog foot.
   Flagged for the manager, not acted on from here.

**Fix that unblocks both, and it is not mine:** add `.related-card` (and `.eyebrow-rule`)
to `contractors-ir35/web/src/app/globals.css`, or import `globals-standard.css`. That file
is P1-1's lease. Once it lands, swapping the local grid for `RelatedArticles` is a
three-line edit.

---

## 6. Verification list for the manager's serialised build

`next build` / `next start` was NOT run by this package: five agents share one `.next` in
this tree. **Everything below is UNVERIFIED at runtime.** What WAS verified locally:

- `npx tsc --noEmit -p tsconfig.json`, clean, no output.
- `npx eslint src/components/blog/BlogPostRenderer.tsx`, clean, no output.
- Contrast, hand-computed (no `var()`-themed utility is used in this file, so DESIGN_DELTA
  H2's instrument ban does not bite, but it was hand-computed anyway; the calculator
  self-tests against slate-500/white = 4.76 and slate-400/white = 2.56 before running):
  primary-700 on white 7.27, on neutral-50 6.96, on primary-50 6.99; eyebrow `--accent`
  on neutral-50 5.13; neutral-700 on white 10.37; neutral-500 fine print on white 4.74;
  neutral-600 on white 7.81; slate-200 on slate-900 14.48; white on slate-900 17.85.
  All pass 4.5.

Run in `contractors-ir35/web`, with `POST=/blog/umbrella-vs-limited-company/best-umbrella-company-how-to-choose`
and `PORT` the manager's serialised server port.

| # | URL | Command | Expected |
|---|---|---|---|
| V0 | `/` | `curl -s http://localhost:$PORT/ \| grep -o "<title>[^<]*</title>"` | `<title>Specialist Contractor Accountants \| IR35 Advice UK</title>`, assert the server is this site before trusting any row below |
| V1 | `$POST` | `curl -s http://localhost:$PORT$POST -o /tmp/after.html -w "%{http_code}\n"` | `200` |
| V2 | `$POST` | `grep -o '<dd' /tmp/after.html \| wc -l` | `10`, the pre-port count from port 3611. **E1 gate** |
| V3 | `$POST` | `grep -c 'Frequently asked questions' /tmp/after.html` | `>= 1`, and the answer text of FAQ 1 present in the HTML |
| V4 | `$POST` | `grep -o '"@type":"FAQPage"' /tmp/after.html \| wc -l` | exactly `1`. More than 1 means a duplicate FAQPage |
| V5 | `$POST` | `grep -o '"@type":"BlogPosting"' /tmp/after.html \| wc -l` | exactly `1`. **This is the E2 gate that a FAQPage-only check misses** (§3) |
| V6 | `$POST` | `grep -o '"cssSelector":\["\.tldr","h1"\]' /tmp/after.html \| wc -l` | `1`, and `grep -c 'class="[^"]*tldr' /tmp/after.html` >= `1` |
| V7 | `$POST` | `grep -o 'href="[^"]*"' /tmp/after.html \| sort -u > /tmp/after_links.txt; diff /tmp/before_links.txt /tmp/after_links.txt` | only ADDITIONS, and the only expected addition is `href="#enquiry-form"`. **Zero deletions.** Baseline `/tmp/before_links.txt` = the 42 unique hrefs captured from port 3611 and listed in §7 |
| V8 | `$POST` | `grep -c 'pexels.com/@anete-lusina' /tmp/after.html` | `>= 1`. **E4 gate**: the photo credit links survive the hero move |
| V9 | `$POST` | `grep -o 'data-cta="[^"]*"' /tmp/after.html \| sort \| uniq -c` | `1 data-cta="next_step"` and `1 data-cta="specialist_widget"`, matching the pre-port server HTML exactly |
| V10 | `$POST` | `grep -c 'id="enquiry-form"' /tmp/after.html` and `grep -c 'scroll-mt-24' /tmp/after.html` | `1` each, and `grep -c 'href="#enquiry-form"'` = `1` |
| V11 | `$POST` | `grep -o '<time dateTime="[^"]*"' /tmp/after.html \| wc -l` | `1` (published only). **E6b**: `2` would mean a post's `updatedDate` now differs from `date`, which is a corpus change, not a renderer bug |
| V12 | `$POST` | `grep -c '<figcaption' /tmp/after.html` | `1` |
| V13 | `$POST` | `grep -c 'blur-\[2px\]\|h-\[420px\]' /tmp/after.html` | `0`, the photo hero is gone |
| V14 | a post in an UNMAPPED category (no early tool) | `curl -s http://localhost:$PORT/blog/<unmapped>/<slug> \| grep -c 'article-body'` | `1`, page 200s. Exercises the `fallbackSplit` branch, which V1-V13 do not |
| V15 | `/blog/ir35-status/inside-ir35` | same battery as V2, V5, V9 | a second post, to catch anything keyed to the sampled one |
| V16 | link floor | `docs/contractors-ir35/_port/sweep_baseline.json` sweep, whole site | 157 URLs / 2755 internal links or better. A drop here is multiplied by 62 |
| V17 | visual | 390 / 768 / 1024 / 1440 on `$POST` | no horizontal page scroll; the desktop TOC column has ONE scrollbar, not two (E13); the header card, the navy ask panel and the FAQ cards all read |

---

## 7. Pre-port link baseline for V7

42 unique hrefs on `$POST`, captured read-only from port 3611 this session:

```
#a-practical-checklist-before-you-sign  #accreditation-alone-is-not-the-whole-picture
#agency-psls-are-now-a-compliance-filter-not-just-a-commercial-preference
#check-payroll-accuracy-from-the-first-payment  #confirm-how-holiday-pay-is-handled
#how-the-april-2026-jsl-reform-reshapes-your-choices
#inside-ir35-and-the-umbrella-versus-limited-company-question  #main
#mini-umbrella-fraud-a-separate-warning  #summary-the-compliance-hierarchy
#test-1-independently-verified-accreditation
#test-2-a-complete-reconcilable-key-information-document
#test-3-the-take-home-red-flag  #test-4-transparent-margin-and-no-worker-charges
#the-compliance-led-framework-four-tests-to-apply  #the-umbrella-remains-your-employer
#verify-the-paye-reference-and-rti-submissions
#what-to-do-if-you-are-directed-to-an-umbrella-you-have-not-vetted
#why-choosing-the-right-umbrella-matters-more-in-2026
/  /about  /blog  /blog/ir35-status/inside-ir35  /blog/umbrella-vs-limited-company
/blog/umbrella-vs-limited-company/cheapest-umbrella-company-uk
/blog/umbrella-vs-limited-company/hmrc-umbrella-company-warning
/blog/umbrella-vs-limited-company/limited-company-vs-umbrella-contractor
/blog/umbrella-vs-limited-company/umbrella-company-holiday-pay
/calculators/contractor-day-rate-calculator
/calculators/umbrella-vs-limited-calculator
/contact  /cookie-policy  /for  /ir35-status  /privacy-policy  /services  /terms
https://www.contractortaxaccountants.co.uk/blog/umbrella-vs-limited-company/best-umbrella-company-how-to-choose
https://www.pexels.com/@anete-lusina
https://www.pexels.com/photo/freelancer-typing-on-laptop-at-table-with-fresh-fruits-6334227/
(+ 2 _next asset hrefs)
```

---

## 8. Reported, not edited (outside the lease)

| Where | What | Who |
|---|---|---|
| `src/app/globals.css` | no `.related-card` / `.eyebrow-rule`; `globals-standard.css` is not imported. Blocks kit `RelatedArticles` and `EyebrowRule` on a11y grounds (§5) | P1-1 / tokens owner |
| `src/components/ui/layout-utils.ts:17` | `btnPrimary` is still the pre-standard box (`px-7`, `text-sm`, `font-medium`, no `min-w-[10rem]`, no `rounded-xl`) that DESIGN_DELTA §1 says to close. Not used by this file, but `LeadForm` in the new navy panel renders through it | P1-1 / forms package |
| `src/components/intent/NextStepOffer.tsx` | `rounded-2xl` + raw `cyan-*` literals, unported. Restyle is listed as a phase 1 capture-surface item (DESIGN_DELTA §5a) and is not in this lease | phase 1 capture-surface package |
| `packages/web-shared/design/blog/RelatedArticles.tsx:104` | `focus-visible:outline-none` with no in-component fallback ring. Shared by 18 sites, NOT edited (trap 12). Consequence for `construction-cis` flagged in §5 | manager |
| `src/lib/schema.ts:310` | `speakable` depends on a `.tldr` class in the renderer. Undocumented coupling, now recorded here and in a code comment | recorded only |

---

## 9. Sidebar column and P2-4

The desktop `<aside>` lives in this file, so P2-4 will edit it to mount `BlogSidebarCta`.
It is left ready: the host `<div>` already owns `sticky top-24 max-h-[calc(100vh-7rem)]
space-y-5 overflow-y-auto`, so the card drops in above the TOC with no further layout work,
and the TOC's own clamp is already off. P2-4 also owns the per-category CTA copy; this
package deliberately left the enquiry panel on `niche.blog.cta_heading` / `cta_body` /
`cta_button` rather than inventing a rival source.
