# K9 RECEIPT — manager-direct, `lib/schema.ts` + `globals.css`

Scope: two files only. `pharmacies/web/src/lib/schema.ts` and
`pharmacies/web/src/app/globals.css`. Nothing else touched, no build, no
server, no git state change.

---

## 1. `lib/schema.ts` (a) FAQ answers stripped to plain text

W3 §7 derived the real scope: 5 of 61 answer strings carry markup, all five
`<a href>` cross-references in `src/data/pharmacies-hubs.ts` (`:149,212,287,346,358`);
`pharmacies-services.ts` carries none today. Applied once in `buildFaqJsonLd`,
not at the two call sites, so `/services/[slug]` (8 URLs), `/for/[slug]` (5) and
the blog posts (22) share one place.

Taken one step past W3's one-liner: the receipt's own acceptance row compares
the JSON-LD answer against the served HTML "normalised to alphanumerics with
entities decoded", so the builder decodes too. A bare `replace(/<[^>]+>/g,"")`
leaves `&amp;` in `acceptedAnswer.text` while the browser renders `&`, which
would fail that row for any answer carrying an entity.

```diff
+// K9: FAQ answers in src/data/pharmacies-hubs.ts are authored HTML (5 of 61
+// carry <a> cross-references); src/data/pharmacies-services.ts carries none
+// today but is the same shape by rule. `acceptedAnswer.text` must be TEXT, so
+// every answer is stripped and the five entities an HTML answer can legally
+// carry are decoded, once here rather than at each call site.
+// ponytail: regex, not a parser. These are authored strings in two data files,
+// not user input; swap in an HTML parser if answers ever come from outside.
+function toPlainText(html: string) {
+  return html
+    .replace(/<[^>]+>/g, "")
+    .replace(/&nbsp;/g, " ")
+    .replace(/&lt;/g, "<")
+    .replace(/&gt;/g, ">")
+    .replace(/&quot;/g, '"')
+    .replace(/&#39;/g, "'")
+    .replace(/&amp;/g, "&")
+    .replace(/\s+/g, " ")
+    .trim();
+}
+
 export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
   ...
-      acceptedAnswer: { "@type": "Answer", text: faq.answer },
+      acceptedAnswer: { "@type": "Answer", text: toPlainText(faq.answer) },
```

`&amp;` is decoded LAST, so `&amp;lt;` cannot be double-decoded into `<`.

No new dependency. No call site changed: the blog post template's own inline
strip at `blog/[category]/[slug]/page.tsx:208` is now a no-op over
already-stripped text, as W3 predicted, and is left alone (builder-owned file,
off limits).

## 2. `lib/schema.ts` (b) `buildBlogPostingJsonLd` exported

Exactly W2 §7's name, signature and body, verbatim apart from comment wording.
Shape cross-checked against `Property/web/src/lib/schema.ts:28-96` (read-only):
same `BlogPosting` posture, `headline: post.h1`, `description:
post.metaDescription`, Organization as BOTH `author` and `publisher` pointing at
the canonical `${siteConfig.url}#organization` node that
`buildOrganizationJsonLd` emits, `mainEntityOfPage` to the post URL. Property's
extra fields (`image`, `@id`, `reviewedBy`, `articleSection`, `inLanguage`, and
an embedded FAQPage) are deliberately NOT ported: this site's template already
emits its own FAQPage and HowTo blocks, and the rest are claims or data W2's
five-field signature does not carry.

The entity data comes from `niche.config.json` by the route this file already
uses, `siteConfig` / `niche-loader`, which is where `display_name`, `domain` and
the company block land. No second read of the JSON added.

**Not** folded into the existing `buildArticleJsonLd` (`:101`): that builder
takes a RELATIVE url and has live consumers on the research pages. Changing it
would be a wider diff than adding the builder W2 asked for.

### HANDOFF TO M1 — one line to add

W2's receipt states the call site is **not yet wired** ("currently NOT present,
so the post template emits no `BlogPosting`"), and grep confirms zero references
to `buildBlogPostingJsonLd` anywhere under `pharmacies/web/src`. The export
compiles and is dead until M1 adds it. In
`src/app/blog/[category]/[slug]/page.tsx`, immediately after the
`{post.schema && ...}` block (and add `buildBlogPostingJsonLd` to the existing
`@/lib/schema` import):

```tsx
{!post.schema && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: buildBlogPostingJsonLd({
        headline: post.h1,
        description: post.metaDescription,
        url: `${siteConfig.url}/blog/${category}/${post.slug}`,
        datePublished: post.date,
        dateModified: post.updatedDate || post.date,
      }),
    }}
  />
)}
```

Acceptance W2 set: `headline` equals the visible `<h1>` byte for byte on all 22
posts. The template renders `{post.h1}` and the call passes `post.h1`, so the
drift that hit 19 of 32 startups-tech posts is impossible by construction.
**M1 must confirm `post.updatedDate` is the field name on this site's BlogPost
type before pasting** — Property's is `dateModified`.

## 3. No vitest test added

Instruction was to extend a test only if one already covers `schema.ts`. The
three tests in `src/tests/` are `focus-ring`, `lead-contactability-bridge` and
`lead-submit-verify`; `grep -rl schema src/tests/` returns nothing, and no
`__tests__` directory exists under `src/lib`. Nothing added.

## 4. `globals.css` — `.story-numeral`

W5 D4: `NumberedReasons.tsx:62,69` emit `.story-numeral` /
`.story-numeral-rule` and flip `data-draw`, but the rule set is per-site and
this site did not declare it, so band 10's motion was inert. W5's exact block
pasted into the existing `@layer components`, after the `.prose table` rule,
which was the last rule in the layer, with W5's own rationale kept as the
comment.

Shape confirmed against `Property/web/src/app/globals.css:653-680`, the
reference W5 ported from: identical selectors, identical 520ms timings,
identical `transform-origin` and cubic-bezier. hospitality and startups-tech do
**not** carry the rule (`grep -c story-numeral` = 0 on both), so Property is the
only shape to match; noted so a reviewer does not read their absence as a
missing port here.

Two substitutions, both W5's and both measured by W5:
- `var(--color-primary-700)` (`#177392`, 5.38 on white, 5.1 on slate-50) for
  Property's emerald. `primary-600` measures 3.55 on slate-50, under the 4.5
  text floor, so it is NOT used for the lit numeral.
- `rgb(var(--brand-glow) / 0.45)` for Property's `rgb(16 185 129 / 0.45)`.
  `--brand-glow: 48 178 224` is declared in this file's `@layer base` (`:141`).

`prefers-reduced-motion` honoured as the block specifies: the LIT state is the
resting state, and everything that moves, including the undrawn
`[data-draw="off"]` state, sits inside `@media (prefers-reduced-motion:
no-preference)`. A reduced-motion visitor therefore gets the finished, brand,
legible numeral with no transition and no hidden state. `--color-slate-200`
carries Property's literal `oklch(0.929 0.013 255.508)` as a `var()` fallback so
the undrawn colour cannot resolve to nothing.

Still open, NOT mine: K4's `<noscript>` release in `layout.tsx` (W7/manager)
covers `[data-draw="off"]` as well as the accordion. Until it lands, a no-JS
visitor with no reduced-motion preference sees the numerals at slate-200 rather
than brand. Legible either way, which is why W5 called the degradation safe.

Nothing else in `globals.css` changed.

---

## 5. ACCEPTANCE — run from `pharmacies/web`

### `npx tsc --noEmit`, pasted verbatim

```
(no output, exit 0)
```

Clean. W5's transient `terms/page.tsx` `legalLink` errors (its D7) are gone.

### `npx vitest run`, summary pasted

```
 Test Files  6 passed (6)
      Tests  40 passed (40)
   Duration  4.64s
```

Matches W2's and W5's figures exactly, so nothing regressed.
