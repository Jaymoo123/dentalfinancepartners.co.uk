# Phase 0 wording reversal (owner ruling, 2026-09-28 late)

Owner: "I am fine with everything other than the agents rewriting hundreds of sentences. That is
something someone will pick up on, and I don't think it needs to be done. I am fine with the wording
we had, and if we were going to change the wording it would be a more careful pass than what we've
done today. Reverse that and keep everything else."

So: every prose sentence an agent rewrote today goes back to exactly what it was before phase 0
(base commit `8e1043d0`). Every mechanical change stays. A careful, owner-led wording pass is a
later, separate piece of work; the 2026-09-28 positioning ruling (the brand is the firm) still
stands as policy, it is just not being executed by sweep.

## What goes BACK to the `8e1043d0` text (wording)

- Positioning sweeps: every "partner network" / "a specialist reviews" / "a specialist will" /
  "matching" / "up to six firms" sentence an agent rewrote, on pages, in `niche.config.json`
  strings, chat openers, FAQ answers, SMS and email nurture copy, booking and thank-you and
  complete pages, blog CTAs, `page-summaries`, service and audience data files.
- Closers: every `closer` / `ctaBody` / closing sentence rewritten or newly varied on segment,
  service, hub and VAT pages. If a `closer` field was added to a data model and the template now
  reads it, remove the field and the template read, restoring the original shared closing line,
  even where that line was one template for every page.
- "Free consultation" / "free review" to "Free first call, then a fixed fee in writing" swaps,
  sticky secondary strings, and the 24-hour sentence added to the first nurture email and SMS.
- Lead-panel copy (eyebrow, title, description, button label) that agents wrote on panels that
  ALREADY existed. On panels NEWLY mounted today on pages that had no form, keep the mount but pass
  no custom copy, so the shared `LeadCTAPanel` defaults render (they were already Property's).
- Header and sticky button labels agents wrote where the component is new: keep the component,
  use the site's existing `niche.config.json` `cta` strings, not new prose.
- Blog post body edits (contractors-ir35, three posts) and their `dateModified` / `updatedDate`
  bumps.
- Medical `/free-practice-health-check` copy, Solicitors "30-minute scoping call" closers,
  charities `blog-cta-map.ts` entries (drop the map, restore the fixed block), Dentists and
  Solicitors and generalist chat opener lines, `/about` body rewrites (ecommerce and others),
  construction-cis `WhatToExpectCard` and complete-page rewrites (this also restores "Ask a
  specialist", which a sweep had turned into "Ask we").
- Test expectation strings that were changed to match new wording go back too.

## What STAYS (mechanical)

- Lead form mounts on pages that had none; one form under each calculator result; gate and modal
  removals; duplicate-form removals.
- Focus rings, aria labels and `htmlFor` fixes, contrast tokens and class changes, header hide
  wrappers, new header / sticky / footer-link components (with existing config strings).
- Nurture `delayHours` arrays.
- Canonicals, sitemap `lastModified`, `Service` / `FAQPage` / `BreadcrumbList` / Organization
  schema builders and their structural fields (`parentOrganization`, `sameAs`, `knowsAbout`),
  `entity` keys in `niche.config.json` (machine copy that feeds schema and llms.txt, not rendered
  prose; keep), `og:image` paths, favicon, font loading, `<main>` landmark, Solicitors homepage
  `<h1>` (keep the element; its text must be the page's pre-existing hero heading, not new prose).
- `llms.txt` UTM tagging on all sites; the replacement of the two "pre-launch STUB, do not cite"
  files on wills-probate and divorce-finances (a broken machine file, not prospect wording; the
  replacement lists routes and is firm-first per the standing policy). EXCEPTION, flagged to the
  owner: divorce-finances `/services` opening line "Full service detail is being built now." was
  replaced with a real intro; keep the replacement, since the original is a broken live page, and
  the owner can strike it.
- Raw-HTML-as-text rendering fixes, table overflow CSS, phone-width overflow fixes.
- AdSense wiring, `ads.txt`, security headers, IndexNow scripts and keys, `gsc_config.py`,
  `StatsCounter` guards, the shared package fixes.
- Em-dash removals and US-spelling corrections (house rule, punctuation and spelling, not
  sentences). Where an em-dash removal rewrote the sentence rather than swapping punctuation,
  restore the sentence and swap only the dash.
- Docs, STATE entries and reports (append a dated "wording reverted" note, do not rewrite).

## Method

Per site: `git diff 8e1043d0 HEAD -- <site>/` and walk every hunk. For each wording hunk, restore
the `8e1043d0` text by hand (read it with `git show 8e1043d0:<path>`); never `git checkout`,
`git restore`, `git revert` or `git reset`. Where a hunk mixes both (a rewritten sentence next to
a new `focusRing` class), keep the class and restore the sentence. Then `npx tsc --noEmit`,
`npx vitest run`, and confirm the section 1 defect-string grep now returns the SAME hits as at
`8e1043d0` for prospect-facing files (that is the proof the wording is back), while the form-mount
grep and the `delayHours` values still show today's state. The manager rebuilds, commits and pushes.
