# EntityBlock review, T1 of section 13 S5 (2026-09-28)

Read-only review. Nothing edited. Scope: the shared `EntityBlock`
(`packages/web-shared/design/marketing/EntityBlock.tsx`) on homepage, `/about` and
`/services` of Property, Medical, contractors-ir35, care and charities, plus the five
`entity` copies in `<site>/niche.config.json`.

Evidence: the 1280 and 390 screenshots in the session scratchpad, the working tree as of
this review, and a scripted rule-check of the five copies.

## Verdict in one line

Property, Medical and care render the block correctly. **contractors-ir35 and charities
have no block on homepage, `/about` or `/services` in the working tree** - only on
`/for/[slug]`. The screenshots for those two sites were taken from a build that no longer
exists in the repo. Two further items are deploy blockers: the care `/about` placeholder
paragraph contradicts the block two sections below it, and Medical `/about` duplicates
"How it works" as its own "The handoff" section.

## 1. Mount audit (working tree, not the screenshots)

`grep -rn "EntityBlock"`, non-`node_modules`:

| Site | Homepage | /about | /services | /for/[slug] |
|---|---|---|---|---|
| Property | yes (page.tsx:517) | yes (:129) | yes (:439) | yes |
| Medical | yes (page.tsx:792) | yes (:146) | yes (:314) | yes (AudienceStageLayout) |
| care | yes (page.tsx:461) | yes (:21) | yes (:50) | yes |
| contractors-ir35 | **missing** | **missing** | **missing** | yes (:238) |
| charities | **missing** | **missing** | **missing** | yes (:137) |

Commits `800d2b61` (property) and `96d9ceef` (medical) landed the mounts. There is no
equivalent commit for contractors-ir35 or charities, and the only uncommitted changes on
charities (`about/page.tsx`, `page.tsx`) are line-ending churn with an empty diff. The
screenshots `about-1280.png` / `services-1280.png` / `home-1280.png` (contractors) and
`entity-*.png` (charities) show the block rendering, so the work was done and lost before
commit. It must be redone, not re-reviewed.

## 2. Property

| Page | Verdict | Defect | Fix |
|---|---|---|---|
| Homepage | Pass | Block sits on slate-50 after the dark CTA band, before the white FAQ. Ground alternates cleanly, 390 wraps with no clipping. | none |
| /about | Pass with one defect | Block is the first content after the hero. The stat strip immediately below claims "14hr response time"; the block says "We reply within 24 hours". An assistant lifting the page gets two answers. | Align the two numbers. Prefer the block's 24 hours, which is also the consent wording. |
| /about | Minor | The proactive chat bubble and "Ask a specialist" launcher land on top of the block at both widths, because the block is the topmost content. | Delay the proactive bubble on `/about`, or offset the block's top padding. Cosmetic, not a blocker. |
| /services | Pass | Block on slate-50 at the foot, between the white card grid and the lead panel. | none |
| All | Minor | The block's largest heading is an `h3` at 16-18px with no `h2` above it. On `/about` that means the top of the page has no section heading and the document skips a level. | Promote the block's six labels or add a visually-quiet `h2`. Shared component, fixes all five sites at once. |

## 3. Medical

| Page | Verdict | Defect | Fix |
|---|---|---|---|
| Homepage | Pass | Slate-50 after the dark CTA, before the white FAQ. Clean at 390. | none |
| /about | **Fix before deploy** | The section directly below the block is "The handoff - How an enquiry works", which restates the block's four-step "How it works" list. Two "how we work" answers on one page is exactly the duplication T1 forbids. | Drop the block's "How it works" heading on this page, or cut "The handoff" section and let the block carry it. |
| /about | Minor | At 390 the "Ask a specialist" bubble sits directly over the "About this service" eyebrow and the "Who we are" heading. Same root cause as Property. | As Property. |
| /about | Minor | Mounted with `className="bg-white py-16 sm:py-20"`, so it shares the cream hero's ground and reads as continued hero prose rather than its own section. | Use the default slate-50, or keep white and add a rule above. |
| /services | Pass with a nit | Block at the foot on slate-50, but the lead panel below is also pale, so the two merge. | Give the lead panel a white ground on this page. |

## 4. care

| Page | Verdict | Defect | Fix |
|---|---|---|---|
| Homepage | Pass | Block after the purple "Talk to a care sector specialist" CTA, before the guidance band and footer. Correct position per T1. | none |
| /about | **Fix before deploy** | Two sections below the block: "We are specialist accountants for UK care providers", "This page is being prepared and will set out our approach in more detail", "We work on a fixed-fee basis and reply within one working day". That is a self-claim as an accountancy practice, placeholder copy shipped live, a pricing claim, and a response-time that contradicts the block's 24 hours. Four rule breaks in three sentences. | Delete those three paragraphs. The block already says everything `/about` needs. |
| /about | Minor | The trading-name and registered-office sentence appears in the block, again in the small print below it, and again in the footer. Three times on one page. | Drop the mid-page repeat. |
| /services | Pass | Block at the foot on slate, no duplicate, clean at 390. | none |
| /services | Minor | The tier cards above use "move to advisory", "structure advice", "not just filed accounts". Read together with "does not give advice" the page argues with itself. | Out of T1 scope, but log it for the claims sweep. |
| Homepage | Minor | H1 is "Accountants for UK care providers." The block then says the firm is not an accountancy practice. An assistant reading the page has to pick one. | Out of T1 scope, log for the claims sweep. |

## 5. contractors-ir35

| Page | Verdict | Defect | Fix |
|---|---|---|---|
| Homepage | **Not built** | No mount in the working tree. The screenshot shows the block between the guides band and the lead panel, i.e. *before* the primary CTA; T1 says after it. | Rebuild the mount, below the lead panel, before the footer. |
| Homepage | (when rebuilt) | Screenshot shows the block on white against a white band above, so it reads as loose body text with no section boundary. Also the page already argues "A generalist accountant handles your compliance. We handle contractor-specific tax", a second "who we are" message. | Use the default slate-50 ground. Leave the generalist section, it is positioning not identity, but do not add a third. |
| /about | **Not built** | No mount. The screenshot shows the block at the top, immediately followed by "We are specialist accountants for UK contractors and limited company directors" and a card reading "You deal with specialist accountants, not a call centre" - a duplicate "who we are" that also contradicts "not an accountancy practice". | Rebuild the mount, and rewrite or cut the two-column section below it. |
| /services | **Not built** | No mount. Screenshot placement (foot, above the lead panel) was correct. | Rebuild as shown. |

## 6. charities

| Page | Verdict | Defect | Fix |
|---|---|---|---|
| Homepage | **Not built** | No mount. The supplied `entity-home-1280.png` is a cropped element shot, not a page in context, so placement was never reviewable. | Rebuild the mount and re-screenshot in page context. |
| /about | **Not built** | No mount. `entity-about-1280.png` shows the block below the hero and above a "Get in touch" button, but again cropped. | Rebuild the mount. |
| /services | **Not built** | No mount. | Rebuild the mount. |
| All | Minor | In the supplied crops the block renders on white, not the default slate-50. If a charities-level style is overriding the component ground, the same override will hit the new mounts. | Check before re-screenshotting. |

## 7. The five copies, graded

Scripted check across all six fields of all five sites: no em-dash, no en-dash, no
"chartered", no "ICAEW", no "our accountants", no "we advise", no pricing, no named
people, no Americanisms. The only hit for "advice" is inside "does not give advice", which
is the required negation. All five pass.

Quotable-block requirement, per the plan's six parts:

| Part | Property | Medical | contractors | care | charities |
|---|---|---|---|---|---|
| What the service is | yes | yes | yes | yes | yes |
| Who it is for | yes | yes | yes | yes | yes |
| Where | yes | yes | yes | yes | yes |
| How it works | yes | yes | yes | yes | yes |
| What happens after the form | yes | yes | yes | yes | yes |
| What it is not | yes | yes | yes | yes | yes |

Entity facts: all five name the trading name, Ashfield Trading Ltd, company number
16358723 and the registered office. Correct and consistent.

Could an assistant lift one paragraph and describe us accurately? Yes for all five. The
firm field alone is a complete, self-contained sentence pair: legal entity, company
number, what we publish, and the referral model. Each is 220-250 words in total, short
enough to be quoted whole.

Two content observations, neither a blocker:

- Property and care say "We reply within 24 hours"; Medical, contractors and charities
  say nothing about timing. If the 24 hours is true estate-wide, say it everywhere; an
  assistant asked "how fast do they respond" can only answer for two of five.
- "Medical Accountants UK", "Contractor Tax Accountants" and "Care Home Tax" are brand
  names containing or implying accountancy, immediately followed by "is not an accountancy
  practice". The copy is honest and the construction is the right one, but it puts the
  strain on the reader. Nothing to fix in the block; it is an argument for the claims
  sweep to clear the *other* self-claims on those pages so the block is not the only
  place the distinction is drawn.

## 8. Ranked fix list

1. **Rebuild the contractors-ir35 mounts** on homepage, `/about` and `/services`. Homepage
   goes below the lead panel, not above it. Default slate-50 ground.
2. **Rebuild the charities mounts** on homepage, `/about` and `/services`, and
   re-screenshot in page context, not cropped.
3. **care `/about`**: delete the "specialist accountants", "page is being prepared" and
   "fixed-fee basis" paragraphs. Placeholder copy, a pricing claim and a contradiction of
   the block, all live.
4. **Medical `/about`**: resolve the duplicate. Either the block's "How it works" or the
   "The handoff" section, not both.
5. **contractors-ir35 `/about`**: rewrite the "We are specialist accountants" two-column
   section and the "You deal with specialist accountants" card so they do not contradict
   the block being mounted above them.
6. **Property `/about`**: reconcile "14hr response time" with "We reply within 24 hours".
7. **care `/about`**: drop the duplicated registered-office small print, keep block and
   footer only.
8. **Shared component**: give the block a real section heading so `/about` does not open
   on an `h3` and the document stops skipping a level. One change, five sites.
9. **Chat widget** on `/about` across the estate: the proactive bubble lands on the block
   because the block is the topmost content. Delay it or offset the block.
10. **Medical `/about` ground**: white makes it read as hero continuation; use slate-50.
11. **Medical `/services`**: differentiate the lead panel's ground from the block's.
12. **Log for the claims sweep, not T1**: the care H1 "Accountants for UK care providers",
    the care services tiers' "advisory" and "structure advice", and the contractors footer
    "IR35 status advice".

## 9. What could not be judged

- contractors-ir35 and charities placement, spacing and neighbour duplication on the three
  pages, because the code is not in the tree and the charities screenshots are cropped
  element shots. Re-review after the rebuild.
- Rendered heading levels and landmark structure were read from the component source, not
  from an accessibility tree dump.
