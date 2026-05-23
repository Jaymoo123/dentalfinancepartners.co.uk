# Wave 5 site-wide flags

Append-only. Each flag uses format `F-N | YYYY-MM-DD HH:MMZ | TAG | session | summary` plus optional sub-bullets.

Tags: HOUSE_POSITION_CONFLICT, CANNIBAL, INTERNAL_LINK, SCHEMA, REDIRECT, POSITIONING, BUILD_BLOCKER, CALCULATOR_IDEA, COMPONENT_IDEA, CROSS_NICHE_LINK, FACTUAL.

---

## F-1 | 2026-05-23 PM | FACTUAL + INTERNAL_LINK | Stage 1 reasoning agent | Existing `section-24-joint-property-ownership-tax-split` page has incorrect Form 17 framing

Pre-Wave-5 discovery — surfaced during Bucket C candidate reasoning against existing on-site joint-ownership inventory.

**Issue:** Existing page `Property/web/content/blog/section-24-joint-property-ownership-tax-split.md` lines 17-19 + 39-43 + 78 state Form 17 lets married couples elect to split income "regardless of actual ownership percentages":
> "Yes, married couples and civil partners can elect to split rental income and expenses 50/50 using Form 17, regardless of actual ownership percentages."
> "The Form 17 election allows married couples to split all income from jointly owned property equally, even if one spouse owns 90% and the other owns 10%."

This contradicts ITA 2007 s.836/837 (the actual rule):
- s.836 default: spousal income on jointly held property is deemed split 50/50.
- s.837 election (via Form 17): elects to actual beneficial interest share, NOT to an arbitrary chosen split. Form 17 requires evidence of actual beneficial ownership (declaration of trust or Land Registry tenants-in-common with declared shares).

The correct framing is preserved in the Wave 3 page `mtd-itsa-jointly-owned-property-threshold-split.md` (lines 30, 36, 42, 46): "Form 17 requires the elected split to match actual beneficial ownership, evidenced by a contemporaneous declaration of trust."

**Action items (manager review per §16.19):**
1. **Back-patch existing page** before or during Wave 5 launch. Rewrite Form 17 framing on lines 17-19 + 39-43 + 78 of `section-24-joint-property-ownership-tax-split.md` to match correct ITA 2007 s.836/837 mechanic.
2. **Lock Form 17 mechanic into house_positions.md** as new sub-section §23 (recommended) in pre-Wave-5 prep. Sessions C will write Wave 5 C-bucket pages against this locked position; new pages will cite §23.
3. **Coordinate with Wave 5 C1** (`form-17-declaration-beneficial-interest-property-mechanics-filing-revocation`): Wave 5 C1 is the dedicated Form 17 mechanic page that closes the Wave 2 Stage 2 AUTHORITY_GAP. Once C1 ships, the back-patched `section-24-joint-property-ownership-tax-split` should cross-link to C1 as the upstream mechanic page.

**HOUSE_POSITION_CONFLICT signal severity:** MEDIUM. Form 17 mechanic is not currently in house_positions.md (no formal locked position contradicted), but §19.4 MTD joint-property discussion implicitly assumes correct Form 17 framing. Wave 5 prep is the right window to lock the position formally.

---

## HOUSE_POSITION_CONFLICT

(empty — append as flags arise)

---

## CANNIBAL

(empty — append as flags arise)

---

## INTERNAL_LINK

(empty — append as flags arise. Note: F-1 above also carries INTERNAL_LINK component for the eventual cross-link from back-patched S24 page to Wave 5 C1.)

---

## SCHEMA

(empty — append as flags arise)

---

## REDIRECT

(empty — append as flags arise)

---

## POSITIONING

(empty — append as flags arise)

---

## BUILD_BLOCKER

(empty — append as flags arise)

---

## FACTUAL

(F-1 above is the seed entry; append as further flags arise)
