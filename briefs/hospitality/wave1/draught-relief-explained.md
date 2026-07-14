---
slug: draught-relief-explained
tier: blog
route: /blog/licensed-trade/draught-relief-explained
intent: OPERATOR-PROBLEM. Pub/bar operators working out how alcohol-duty draught relief affects their duty cost, GP% and pricing on cask and keg; assist + capture into the pubs-and-bars hub and licensed-trade payroll/VAT services.
---
# Draught Relief Explained: Lower Alcohol Duty on Cask and Keg, and What It Means for Your Pricing

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO/Google Ads UK, fetched 2026-07-11)

- **Primary:** "draught relief" / "draught duty" cluster (LAUNCH_CORE names "draught relief pricing" in the 12 priority blogs; licensed-trade operator-problem intent, part of the pubs 420/mo head field per TOPICS.md).
- Secondary long-tail (autocomplete-derived, NO measured volume, do not attach figures): "alcohol duty on draught beer", "draught vs packaged duty", "how much duty on a pint", "draught relief 20 litres".
- Do NOT target the pubs head "pub accountants" (owned by the for/pubs-and-bars hub); link, do not compete.

## Search-intent class + play

OPERATOR-PROBLEM (assist + capture). The operator wants to understand the lower draught duty rate and use it correctly in GP% and pricing. Play: BLUF answer box on what draught relief is and the container-size condition, then the current rate table (draught vs packaged), then how it flows into GP% maths, then the capture into licensed-trade accounting. This is a moat topic (the pub cluster is the most specialist-saturated per COMPETITORS.md), so depth and correct current figures are the whole win.

**Cannibalisation split (locked at seed):** this blog owns the DUTY/pricing-mechanics intent. The for/pubs-and-bars hub owns the hire intent (accountants for pubs). Do not replicate the hub's service pitch; explain the duty and link.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **inn-control.co.uk / innspiredaccountancy.co.uk / hayhursts.net / innscribeuk.com** (DEDICATED licensed-trade specialists): the most specialist-saturated cluster; beat with a clean current-rate table and worked GP% maths they do not publish.
- **gov.uk** (Alcohol duty rates page): the source table, dense and not hospitality-framed. Beat by translating it into pub-pricing terms.
- **Xeinadin** (SECTION, dedicated bars/pubs/clubs page): beat on the specific draught-vs-packaged pricing angle.

## Required structure

H2 skeleton:
1. The short answer: what draught relief is (BLUF box, cited, with the 20-litre container condition)
2. Which products qualify (draught, containers of at least 20 litres, ABV bands)
3. The current rates: draught vs packaged (rate table)
4. Why it matters for GP%: worked pricing example on a cask/keg product
5. What does NOT qualify (packaged/bottled/canned, and sub-1.2% ABV zero-duty note)
6. Duty is not VAT: keep the two separate (short, link to food/drink VAT)
7. Getting your licensed-trade numbers right (capture)

FAQ candidates (no answers at seed stage):
- What is draught relief?
- What container size qualifies for draught relief?
- How much lower is draught duty than packaged?
- Does draught relief apply to cider?
- Does bottled or canned beer get draught relief?
- What ABV range does draught relief cover?
- Is there duty on very low-alcohol drinks?
- How does draught relief affect my pint pricing?

Table/chart opportunities:
- Current rate table: product/ABV band × draught rate vs packaged rate (per litre of pure alcohol), sourced to HP 16.
- GP% worked example table for a cask or keg line (draught rate applied).

Calculator/tool embed: none in the launch fleet for duty; the staff cost & rota margin calculator is not a fit. Do not invent a duty calculator embed.

Internal links (launch core): for/pubs-and-bars hub (capture), hospitality VAT returns & schemes service (duty-vs-VAT distinction), AWRS-checks blog (sibling licensed-trade compliance), machine-games-duty blog (sibling).

## House positions touched (docs/hospitality/house_positions.md — ONLY figures source)

- **HP 16 (draught relief), figures LOCKED and verified 2026-07-12:** "Draught relief gives lower alcohol duty rates on qualifying draught products sold from containers of at least 20 litres." Draught products at **3.5% to below 8.5% ABV** attract duty of **£19.45 per litre of pure alcohol** (beer, spirits, wine and other fermented products) or **£8.95 per litre** (still cider, sparkling cider 3.5% to 5.5% ABV). This is materially lower than the equivalent packaged rate of **£22.58 per litre** for beer at 3.5% to 8.4% ABV. Products **below 1.2% ABV attract zero duty.** GP%/pricing for cask and keg should use the draught rate. Citation: https://www.gov.uk/guidance/alcohol-duty-rates

## Hallucination danger zones

- These duty rates ARE locked in HP 16 (£19.45 draught / £8.95 still cider / £22.58 packaged beer, 20-litre container, 3.5% to below 8.5% ABV, sub-1.2% zero). They are still year-sensitive: HOLD to the HP figures verbatim and re-verify at Stage 2. Do NOT round, restate in different units, or invent rates for ABV bands the HP does not cover. If the Stage 2 fetch shows the rates have moved, flag for HP update, do not silently patch.
- Do not extend the rate table to spirits/wine ABV bands or cider bands beyond what HP 16 states; flag any gap for HP extension.
- Keep duty and VAT separate: draught relief is a duty relief, not a VAT relief. Never imply it changes the VAT rate on drinks (alcohol is always 20% VAT per HP 3).
- The container condition is "at least 20 litres" (HP 16); do not state a different threshold.
- No em-dashes in user-facing copy.

## Stage 2 TODO

- WebFetch the Alcohol duty rates page; re-verify £19.45 / £8.95 / £22.58, the 20-litre condition, the 3.5-to-below-8.5% band and the sub-1.2% zero point are all current. If any figure has changed, STOP and flag for HP 16 update before writing.
- Confirm whether the current-year page adds spirits/wine draught bands the HP does not carry; flag for HP extension if the rate table needs them.
- Fetch one licensed-trade specialist page to set the depth bar; extract any GP% worked example format.
