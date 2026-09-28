# Estate canonical sweep, 2026-09-25

## The rule swept by

Every Next.js App Router `page.tsx` that renders a real, public, indexable
route must set its own canonical, either as a static `metadata.alternates.canonical`
or inside `generateMetadata`. If it does not, it silently inherits whatever
`alternates.canonical` the root `layout.tsx` sets. On 13 of the 15 live sites
(plus both non-live sites) the root layout sets `alternates.canonical` to the
homepage URL. That default is only correct for the homepage itself. Any other
page that forgets to override it declares itself a duplicate of the homepage,
which is the exact shape of the ecommerce `/services`, `/vat`, `/for` defect.

Two sites, `contractors-ir35` and `charities`, have already removed the
root-layout default entirely (with a code comment naming this exact trap), so
a page that forgets its own canonical there gets no canonical at all rather
than a wrong one. That is the safer shape and is the fix pattern below.

Static finding = "does the source set its own canonical." Live finding =
"what canonical did the server actually render for that URL." The two are
reported in separate columns and never merged: a route can be source-correct
and still render wrong (stale build), and a route the static scan flags can
turn out to be intentionally noindexed and harmless.

## Per-site table

| Site | Public routes counted | Routes with no own canonical (static) | Live mismatches confirmed | Sitemap URL count | Robots OK |
|---|---|---|---|---|---|
| property | 55 | 4 (book, complete, resources/[topic], thank-you) | 1 (resources/[topic], noindex) | 873 | yes |
| dentists | 38 | 5 (book, complete, embed, embed/[slug], thank-you) | 1 (embed, noindex) | 289 | yes |
| medical | 34 | 5 (book, complete, embed, embed/[slug], thank-you) | 1 (embed, noindex) | 138 | yes |
| solicitors | 42 | 5 (book, complete, embed, embed/[slug], thank-you) | 1 (embed, noindex) | 274 | yes |
| generalist | 39 | 10 (book, complete, embed x2, free-health-check, guides/[slug]/download, incorporation, newsletter x2, resources/[topic], thank-you) | 0 real (incorporation and free-health-check are `redirect()` calls, not canonical bugs) | 784 | yes |
| agency (digital-agency) | 79 | 10 (same shape as generalist) | 0 real (incorporation is a `redirect()`) | 436 | yes |
| contractors-ir35 | 27 | 3 (book, complete, thank-you) | 0 (root layout has no default canonical; `/for` self-referential, confirmed live) | 154 | yes |
| construction-cis | 32 | 15 (about, book, cis-invoice-template, cis-payment-deduction-statement-template, cis-refund, complete, contact, cookie-policy, for, for/[slug], gross-payment-status, privacy-policy, services, terms, thank-you) | 4 confirmed (services, for, about, gross-payment-status, all -> homepage) | 246 | yes |
| charities | 25 | 3 (book, complete, thank-you) | not sampled beyond homepage/blog controls (both self-referential); static scan clean on hubs, same fixed root-layout pattern as contractors-ir35 | 66 | yes |
| hospitality | 26 | 6 (book, complete, for, research embed, services, thank-you) | 2 confirmed (for, services, both -> homepage) | 59 | yes |
| care | 26 | 6 (book, complete, for, research embed, services, thank-you) | 2 confirmed (for, services, both -> homepage) | 55 | yes |
| pharmacies | 23 | 3 (book, complete, thank-you) | 0 sampled beyond controls (homepage/blog self-referential; static scan clean on hubs) | 55 | yes |
| crypto | 22 | 3 (book, complete, thank-you) | 0 sampled beyond controls (homepage/blog self-referential; static scan clean on hubs) | 51 | yes |
| ecommerce | 24 | 3 (book, complete, thank-you) | 3 confirmed live (services, vat, for, all -> homepage); fix already in source, commit `286365a8`, not deployed | 51 | yes |
| startups-tech | 26 | 5 (book, complete, for, services, thank-you) | 2 confirmed (for, services, both -> homepage) | 68 | yes |
| wills-probate (not live) | 29 | 15 (about, book, complete, contact, cookie-policy, for, for/[slug], inheritance-tax, lasting-power-of-attorney, privacy-policy, probate, services, terms, thank-you, wills) | not live, not checked | n/a | n/a |
| divorce-finances (not live) | 27 | 11 (about, book, complete, contact, cookie-policy, for, for/[slug], privacy-policy, services, terms, thank-you) | not live, not checked | n/a | n/a |

Static counts are the "does the file contain `alternates` and `canonical`
somewhere" check, read against each route's `metadata` export or
`generateMetadata` function, not a literal-string grep for a URL. Dynamic
routes (`[slug]`, `[topic]`, `[category]`) were read as functions.

## Defect list (confirmed live, ordered by severity)

Severity ranking: a hub that lists/links child pages and is meant to rank
outranks a leaf utility page; a page already marked `noindex` outranks nothing
serious because it was never meant to be found by canonical anyway.

| # | Site | Requested URL | Rendered canonical | Points at |
|---|---|---|---|---|
| 1 | construction-cis | https://www.tradetaxspecialists.co.uk/services | https://www.tradetaxspecialists.co.uk | homepage (services hub, lists all CIS services) |
| 2 | construction-cis | https://www.tradetaxspecialists.co.uk/for | https://www.tradetaxspecialists.co.uk | homepage (trade hub, lists every trade page) |
| 3 | ecommerce | https://www.ecommercefinance.co.uk/services | https://www.ecommercefinance.co.uk | homepage (services hub) |
| 4 | ecommerce | https://www.ecommercefinance.co.uk/vat | https://www.ecommercefinance.co.uk | homepage (VAT hub, has its own child routes under /vat/[slug]) |
| 5 | ecommerce | https://www.ecommercefinance.co.uk/for | https://www.ecommercefinance.co.uk | homepage (audience hub) |
| 6 | hospitality | https://www.hospitalitytax.co.uk/services | https://www.hospitalitytax.co.uk | homepage (services hub) |
| 7 | hospitality | https://www.hospitalitytax.co.uk/for | https://www.hospitalitytax.co.uk | homepage (audience hub) |
| 8 | care | https://www.carehometax.co.uk/services | https://www.carehometax.co.uk | homepage (services hub) |
| 9 | care | https://www.carehometax.co.uk/for | https://www.carehometax.co.uk | homepage (audience hub) |
| 10 | startups-tech | https://www.foundertaxpartners.co.uk/services | https://www.foundertaxpartners.co.uk | homepage (services hub) |
| 11 | startups-tech | https://www.foundertaxpartners.co.uk/for | https://www.foundertaxpartners.co.uk | homepage (audience hub) |
| 12 | construction-cis | https://www.tradetaxspecialists.co.uk/about | https://www.tradetaxspecialists.co.uk | homepage (leaf, about page) |
| 13 | construction-cis | https://www.tradetaxspecialists.co.uk/gross-payment-status | https://www.tradetaxspecialists.co.uk | homepage (leaf, but a real target-keyword landing page) |
| 14 | dentists | https://www.dentalfinancepartners.co.uk/embed | https://www.dentalfinancepartners.co.uk | homepage, but page is already `robots: { index: false }`, so this is cosmetic, not a ranking loss |
| 15 | medical | https://medicalaccounts.co.uk/embed | https://www.medicalaccounts.co.uk | homepage, already noindex, cosmetic |
| 16 | solicitors | https://accountsforlawyers.co.uk/embed | https://www.accountsforlawyers.co.uk | homepage, already noindex, cosmetic |
| 17 | property | https://www.propertytaxpartners.co.uk/resources/mtd | https://www.propertytaxpartners.co.uk | homepage, but page is already `robots: { index: false, follow: false }` (gated lead-magnet), cosmetic |

Rows 1-13 are the same defect shape as the ecommerce bug that triggered this
sweep, on indexable pages, live in production right now. Row set 1-5 is worse
than 6-11 only in that construction-cis and ecommerce both spread the bug
across more distinct hub routes; rows 6-11 are the identical pattern with a
smaller footprint. Rows 12-13 are lower-traffic leaf pages with the same
mechanism. Rows 14-17 are technically defective but already excluded from the
index by `robots: { index: false }`, so Google was never going to canonicalise
them away from anything; they cost nothing today and are included only
because the rule says report every instance.

construction-cis's `/for/[slug]` and `/services/*` (if any) sub-routes were
not individually live-checked; the static scan flags `/for/[slug]` with no own
canonical, so its children likely inherit the same homepage default once
crawled, but that was not confirmed live and is listed as a static finding
only.

## Was ecommerce the only site with the hub-canonical bug?

No. It is one of at least five: construction-cis, ecommerce, hospitality,
care, and startups-tech all have live, indexable hub pages (`/services`
and/or `/for`) canonicalising to the homepage right now. construction-cis has
the widest live-confirmed footprint (4 confirmed instances including a leaf
landing page). Two sites, contractors-ir35 and charities, already carry a
fix for the class (root layout has no default canonical), which is why they
came back clean.

## The fix, once, as a class

Two valid shapes, pick one per estate-wide decision, both remove the trap:

**Shape A, the one already live on contractors-ir35 and charities: delete the
default.** Root `layout.tsx` should not set `alternates.canonical` at all.
Next.js only emits a `<link rel="canonical">` when a page (or the layout)
sets one, so a page that forgets to set its own simply renders with no
canonical tag rather than a wrong one. No canonical is a smaller SEO problem
than a wrong canonical: it is neutral, a wrong one actively tells Google to
ignore the page.

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  // no `alternates` key here at all
  ...
};
```

**Shape B, belt and braces: keep the layout default but force every route
group to override it**, one `alternates.canonical` per `page.tsx`:

```tsx
// app/<route>/page.tsx
export const metadata: Metadata = {
  ...
  alternates: { canonical: `${siteConfig.url}/<route>` },
};

// or for a dynamic route:
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    ...
    alternates: { canonical: `${siteConfig.url}/<route>/${slug}` },
  };
}
```

Shape A is the lazier and safer fix estate-wide: it turns a silent,
compounding class of bug into a build-time absence that a future page simply
does not have, instead of a future page that silently lies. Shape B is
still required for every route that wants to actually rank (the layout having
no default does not give a route a correct canonical, it just stops giving it
a wrong one), so the two shapes are complementary, not alternatives: remove
the default AND finish adding `alternates.canonical` to the flagged routes
above, hub pages first.

## Where the check could not be completed

wills-probate and divorce-finances are placeholder domains, not live, so Half
2 (live rendering) was not attempted for either, per the task's own scope.
Their Half 1 static findings are reported above from source only.

construction-cis's `/for/[slug]`, `/services/[slug]` (if present),
`cis-invoice-template`, `cis-payment-deduction-statement-template`, and
`cis-refund` were flagged by the static scan but not individually
live-fetched; the sample already confirmed the site's root-layout default is
live and active on four sibling routes, so the remaining flagged routes are a
static finding only until fetched.

Generalist and digital-agency's `/incorporation` static "no own canonical"
flag turned out, on live fetch, to be a `redirect()` to a blog post, not a
canonical bug; this was verified from source (`redirect("/blog/...")`) and is
excluded from the defect list. The same site's `free-health-check` is a
deliberate `redirect("/contact")` per an in-code comment, also excluded.
