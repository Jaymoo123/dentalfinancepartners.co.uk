# Pack (experiment 3, conversational coverage): `a-complete-guide-to-periodic-tenancy`

## 1. Target and permission
- File: `Property/web/content/blog/a-complete-guide-to-periodic-tenancy.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 15 impr / 0 clicks @ wpos 6.0; Google 28d 0 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `can you add additional tenants to periodic tenancy` : 2 impr, pos 6.0
- `notice period for periodic tenancies pre renters reform` : 2 impr, pos 8.0
- `periodic tenancy agreement uk, we pay monthly or annual ?` : 1 impr, pos 6.0
- `new periodic tenancy have term lengths` : 1 impr, pos 9.0
- `determining criteria for periodic and non-periodic leases` : 1 impr, pos 5.0
- `periodic tenancy  uk minimum lease term for landlord` : 1 impr, pos 8.0
- `how to calculate a refund on a periodic tenancy poist rra - is it a monthly or weekly tenancy` : 1 impr, pos 6.0
- `what are the rent periods` : 1 impr, pos 2.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `can you add additional tenants to periodic tenancy` : 2 impr, 0 clicks, pos 6.0
- `notice period for periodic tenancies pre renters reform` : 2 impr, 0 clicks, pos 8.0
- `periodic tenancy agreement uk, we pay monthly or annual ?` : 1 impr, 0 clicks, pos 6.0
- `practical periodic tenancy monthly` : 1 impr, 0 clicks, pos 8.0
- `periodic cots of rental property` : 1 impr, 0 clicks, pos 1.0
- `new periodic tenancy have term lengths` : 1 impr, 0 clicks, pos 9.0
- `determining criteria for periodic and non-periodic leases` : 1 impr, 0 clicks, pos 5.0
- `periodic tenancy  uk minimum lease term for landlord` : 1 impr, 0 clicks, pos 8.0
- `how to calculate a refund on a periodic tenancy poist rra - is it a monthly or weekly tenancy` : 1 impr, 0 clicks, pos 6.0
- `rent before rent period` : 1 impr, 0 clicks, pos 9.0
- `what are the rent periods` : 1 impr, 0 clicks, pos 2.0
- `what is the threshold for ground rent to become a periodic tenancy` : 1 impr, 0 clicks, pos 1.0
- `minimum rent period` : 1 impr, 0 clicks, pos 7.0

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
