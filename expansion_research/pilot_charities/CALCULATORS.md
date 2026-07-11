# Calculator fleet — Charities pilot (R3)

Date: 2026-07-11. Demand evidence = DataForSEO keyword_suggestions, UK (2826), fetched 2026-07-11
(`raw/dfs_keyword_suggestions.json`). Config-driven fleet pattern per the Property calculator engine
(1 config file + 1 import per tool).

## Launch tier (build with the site)

| # | Calculator | Demand evidence (vol/mo, KD) | Rules involved | Inputs → outputs |
|---|---|---|---|---|
| 1 | **Gift Aid calculator** | "gift aid calculator" 720, KD 0, CPC £7.55; "how much gift aid" 720 KD 8; "gift aid calculator uk" 90 KD 1; "hmrc gift aid calculator" 70 KD 1 | 25% basic-rate gross-up; higher/additional-rate donor relief (140/mo cluster) | donation £, donor tax band → charity receives, donor reclaims, net cost to donor |
| 2 | **Independent examination vs audit threshold checker** | "charity audit threshold" 390 KD 0 CPC £3.29; "charity audit" 320 KD 0; "independent examination charity accounts" 210 KD 0; "charity independent examination threshold" 70 KD 0 | £25k IE gate; £250k accruals/qualified-examiner gate; £1m audit; £250k+£3.26m assets; governing-document override; Scotland-differs flag | gross income, gross assets, company?, Scotland? → scrutiny level required + examiner qualification requirement |
| 3 | **Small trading exemption / trading subsidiary checker** | "charity trading subsidiary" 50 KD 0; "trading subsidiary of a charity" 50; long-tail cluster (gift aid to parent, deed of covenant) | £8k / 25%-of-income / £80k cap; primary-purpose carve-out; corporate Gift Aid | charity income, non-primary trading turnover → exempt? tax exposure, subsidiary recommended? |
| 4 | **GASDS (small donations) calculator** | "gift aid small donations scheme" 390 KD 0; "gift aid small donations" 90 KD 0 CPC £10.89 | £30/donation cap, £8,000/yr cap, matching rule (10× Gift Aid claimed), community buildings | cash/contactless small donations, Gift Aid claimed → claimable top-up |

## Queue tier

| # | Calculator | Demand evidence | Notes |
|---|---|---|---|
| 5 | **Charity VAT reclaim estimator (partial exemption / business–non-business)** | "can charity claim back vat" 480 KD 0; "charity vat" 480 KD 2; "do charity pay vat" 1,000 KD 0 | Higher build complexity (apportionment methods); v1 can be a decision-tree ("what VAT can our charity recover/relieve?") rather than a numeric engine |
| 6 | **Charity shop VAT + retail Gift Aid estimator** | "charity shop gift aid" 110 KD 1; "do charity shops pay vat" 30; "are charity shops vat registered" (autocomplete) | Zero-rating of donated-goods sales + retail Gift Aid methods; niche but zero-competition |
| 7 | **Business rates charitable relief calculator** | "charitable rate relief" family (not in seed pull — re-pull at S5) | 80% mandatory + discretionary top-up; simple engine |
| 8 | **Charity payroll cost calculator** | estate-proven pattern (employer NIC 15%/£5k + Employment Allowance £10.5k both citation-confirmed) | Reuse estate payroll calc logic with charity EA angle |
| 9 | **CIC vs charity/CIO structure chooser** | "cic accountant" 90 KD 0; structure queries in autocomplete ("cic vs charity" family) | Decision-tree, not numeric; feeds the CIC money page |

## Rival precedent

The verified rival set (COMPETITORS.md) is brochure-plus-blog; none of the dedicated charity
specialists surface an interactive calculator on their service pages (checked homepages + service
pages in `raw/verify_evidence.json`). Charity Excellence Framework (info platform, not an
accountancy rival) runs free tools/funding finders — precedent that trustees use interactive
tools. The fleet above is therefore a differentiator, with demand evidenced by search volume
rather than rival copying.

All statutory figures used by these engines are anchored in HOUSE_POSITIONS_OUTLINE.md
(citations fetched + confirmed live 2026-07-11).
