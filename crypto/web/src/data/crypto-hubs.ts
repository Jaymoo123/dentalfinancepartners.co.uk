export interface CryptoHub {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const cryptoHubs: CryptoHub[] = [
  {
    slug: "investors",
    title: "Investors",
    headline: "CGT and Self Assessment for UK crypto investors",
    metaTitle: "Crypto Investor Tax UK | Crypto Tax Partners",
    metaDescription: "Specialist UK tax accountants for crypto investors. CGT, s104 pooling, AEA offset and Self Assessment for UK cryptoasset holders.",
    intro: "For most UK crypto holders, every sale, swap and spend is a Capital Gains Tax event. HMRC treats the great majority of individual holders as investors, not financial traders, so gains fall under CGT rather than income tax. Getting it right means applying the correct s104 pooling method, the correct band-split rate, and counting every crypto-to-crypto swap as a disposal, not just the times you cashed out to pounds.",
    stats: [
      { value: "18% / 24%", label: "CGT rates on cryptoassets 2026/27: 18% within remaining basic-rate band, 24% above (higher/additional-rate taxpayers pay 24% on the whole gain)" },
      { value: "£3,000", label: "Annual exempt amount (AEA) 2026/27, frozen. Most active holders exhaust it in one or two disposals once every swap is counted" },
      { value: "s104", label: "UK pooling method: per-token average cost. FIFO and LIFO (US software defaults) are wrong for UK individuals" },
    ],
    challenges: [
      {
        title: "Swaps are disposals, even without cashing out",
        body: "Under HMRC's rules, exchanging one cryptoasset for another is a disposal at the sterling market value at the moment of the swap. 'I never converted to pounds' is not a defence. Each swap triggers a CGT calculation, and most portfolios contain far more taxable events than the owner realises.",
      },
      {
        title: "UK pooling is not FIFO or LIFO",
        body: "UK individuals must use Section 104 pooling: one pool per token at average cost, with same-day acquisitions matched first, then acquisitions in the following 30 days, then the pool. The popular US-default methods (FIFO, LIFO, specific identification) produce wrong figures for UK tax. Software built for US markets will overstate or understate your UK gain.",
      },
      {
        title: "The £3,000 allowance is smaller than most people assume",
        body: "The annual exempt amount is £3,000 for 2026/27, and it is frozen at that level. Once every crypto-to-crypto swap counts as a separate disposal, a typical active portfolio exhausts it in one or two transactions. The 'I am under the allowance' assumption is usually wrong before the first manual check.",
      },
      {
        title: "Gains may be reportable even when no tax is due",
        body: "Where disposal proceeds exceed the reporting threshold, the disposals must be declared inside Self Assessment even if the annual exempt amount covers the gain. The registration deadline for Self Assessment is 5 October following the tax year in which the first reportable event arose. Missing it creates penalties on top of any tax due.",
      },
    ],
    howWeHelp: [
      {
        title: "Correct UK pooling and disposal calculation",
        body: "We reconstruct your transaction history using the correct s104 method, apply the same-day and 30-day matching rules that override the pool, and produce a gain figure built on UK rules rather than the default from US-origin software. We state clearly what a web estimator cannot capture and where a human review is needed.",
      },
      {
        title: "Legitimate planning: spouse transfers and loss recovery",
        body: "Transfers between spouses and civil partners are no-gain/no-loss, which means both annual exempt amounts and both basic-rate bands can be used across a household. Capital losses from past years can be claimed and carried forward, normally within four years of the end of the tax year they arose. Unclaimed loss years are recoverable value.",
      },
      {
        title: "Self Assessment filing and HMRC correspondence",
        body: "We prepare the SA108 capital gains pages with the correct cryptoasset entries, handle registration if you are newly reportable, and manage any HMRC enquiry or nudge-letter response. If you have unreported years, we assess the voluntary disclosure route before HMRC contacts you.",
      },
    ],
    faqs: [
      {
        question: "Do I pay tax if I swapped one coin for another without cashing out?",
        answer: "Yes. HMRC treats a crypto-to-crypto swap as a disposal at the sterling market value at the moment of the swap. The fact that you never received pounds does not remove the CGT liability. Each swap is a separate taxable event.",
      },
      {
        question: "What is the crypto capital gains allowance for 2026/27?",
        answer: "The annual exempt amount is £3,000 for 2026/27. It is frozen at this level. Once every swap is counted as a disposal, most active holders exhaust it in one or two transactions.",
      },
      {
        question: "Is crypto CGT charged at a flat 18%?",
        answer: "No. The rate is 18% only on the portion of the gain that fits within your remaining basic-rate income tax band (the band ceiling is £37,700 of taxable income for 2026/27). Any gain above that boundary is charged at 24%. Higher and additional-rate taxpayers pay 24% on the whole gain.",
      },
      {
        question: "Why does my US crypto software give a different gain to my UK tax figure?",
        answer: "Most US software defaults to FIFO or specific-identification cost methods. UK individuals must use Section 104 pooling at average cost, with same-day and 30-day matching overriding the pool. These are different calculations and will almost always produce different numbers.",
      },
      {
        question: "Can I move crypto to my spouse to reduce our tax bill?",
        answer: "Transfers between spouses and civil partners are treated as no-gain/no-loss for CGT, so the transfer itself does not trigger tax. The receiving spouse inherits your base cost, not market value. The benefit is that the disposal to a third party can then use the receiving spouse's annual exempt amount and basic-rate band, but the base cost does not reset.",
      },
      {
        question: "Do I have to report gains if they are under the annual exempt amount?",
        answer: "If your disposal proceeds exceed the Self Assessment reporting threshold, you must include the disposals in Self Assessment even if the £3,000 annual exempt amount means no tax is actually payable. We confirm the current threshold and whether it applies to your year.",
      },
    ],
  },

  {
    slug: "day-traders",
    title: "Day Traders",
    headline: "Investor vs trader status and high-volume CGT for UK day traders",
    metaTitle: "Day Trader Tax UK | Investor vs Trader Status | Crypto Tax Partners",
    metaDescription: "UK tax for day traders in crypto, forex and CFDs. Investor vs trader status, badges of trade, high-volume CGT reconciliation.",
    intro: "Trading crypto at high frequency does not make you a financial trader for UK tax purposes. HMRC expects trading treatment only in exceptional circumstances; high volume alone is not enough. The honest position is the counter-intuitive one: trader status is usually a worse outcome than investor status, because trading profits are subject to income tax at up to 45% plus Class 4 NIC, whereas CGT tops out at 24%. Scottish taxpayers have devolved income tax bands, which can shift this comparison. The real jobs here are a defensible investor-vs-trader status opinion and high-volume reconciliation that DIY software cannot finish.",
    stats: [
      { value: "CGT", label: "Default treatment for almost all individuals, including those who trade every day. HMRC expects investor status unless exceptional circumstances apply" },
      { value: "Up to 45% + Class 4 NIC", label: "Tax cost of trading status if found: income tax plus Class 4 NIC on profits, versus 24% CGT as an investor" },
      { value: "Same-day + 30-day", label: "Matching rules that override the s104 pool on every repurchase: the main source of error in high-volume DIY calculations" },
    ],
    challenges: [
      {
        title: "Trader status is usually a worse outcome, not a prize",
        body: "Reddit and DIY culture treat trader status as something to pursue, but the numbers run the other way. Trading profits are charged to income tax at up to 45% and attract Class 4 National Insurance, currently 6% on profits between £12,570 and £50,270 and 2% above that. CGT tops out at 24%. Trader treatment mainly helps in narrow loss-relief edge cases. Almost everyone is better off as an investor.",
      },
      {
        title: "High-frequency reconciliation that software cannot finish",
        body: "Thousands of trades across multiple exchanges mean thousands of same-day and 30-day matching calculations that override the s104 pool. Most web-based tools are stateless and cannot perform this matching correctly at scale. US-default software compounds the problem by applying FIFO or specific-identification instead of UK average-cost pooling.",
      },
      {
        title: "Forex, CFDs and spread-betting sit in different tax boxes",
        body: "Spread-betting winnings are generally outside tax as gambling, but spread-betting losses are equally unrelievable, so it is not the tax-free-upside-only picture it is sometimes sold as. CFD and forex gains use the same badges-of-trade analysis as crypto. Personal foreign-exchange gains can be chargeable gains; the personal-spending exemption is narrow.",
      },
      {
        title: "How HMRC decides: badges of trade",
        body: "HMRC applies the same badges-of-trade analysis to crypto as to shares and forex. The relevant factors are profit motive, the frequency and volume of transactions, the nature of the asset, and the degree of organisation, among others. High frequency alone does not make a trade. The question is decided on the totality of the facts, and a status opinion needs to document those facts.",
      },
    ],
    howWeHelp: [
      {
        title: "Defensible investor-vs-trader status opinion",
        body: "We assess your activity against HMRC's published badges-of-trade criteria and produce a written opinion that supports your Self Assessment position. The opinion does not guarantee a particular status: it documents the facts and applies the tests. Where the facts are genuinely borderline, we tell you that directly.",
      },
      {
        title: "High-volume reconciliation done in UK rules",
        body: "We process high transaction counts using the correct UK method: s104 pooling at average cost, with same-day and 30-day matching applied before the pool. We identify and correct the systematic errors that US-origin software introduces, and we produce a gain summary built on HMRC's own rules.",
      },
      {
        title: "Forex, CFD and spread-betting returns",
        body: "We handle the full mix: CGT for crypto and forex disposals, income-tax treatment if a trade is found, and the correct treatment of spread-betting (outside tax, with losses unrelievable). If you operate across instruments, we bring the positions together in one return rather than handling each in isolation.",
      },
    ],
    faqs: [
      {
        question: "Am I a crypto trader for tax if I trade every day?",
        answer: "Almost certainly not. HMRC expects trading status only in exceptional circumstances. Trading every day is one factor, but high frequency alone is not enough; the badges-of-trade test looks at the totality of the facts. For most active participants, investor status and CGT is the correct treatment.",
      },
      {
        question: "Is trader status better for tax?",
        answer: "Usually no, and often significantly worse. Trading profits are charged to income tax at up to 45% plus Class 4 NIC. As an investor, gains are charged to CGT at a maximum of 24%. Trader status mainly helps in specific loss-relief scenarios, not as a general tax-reduction strategy.",
      },
      {
        question: "Do I pay tax on spread-betting profits?",
        answer: "Spread-betting winnings are generally outside income tax and CGT because they are treated as gambling rather than a trade. However, spread-betting losses are equally unrelievable. You cannot claim them to offset other income or gains. This is not a one-sided arrangement.",
      },
      {
        question: "My reconciliation software cannot handle thousands of trades. Can you?",
        answer: "Yes. The complexity at high volume comes mainly from the same-day and 30-day matching rules that override the s104 pool, and from the errors introduced by US-default cost methods. We process the transaction history manually against UK rules and produce a reconciled gain figure.",
      },
      {
        question: "If I am an investor, what rate and allowance apply to my gains?",
        answer: "As an investor, CGT applies. The annual exempt amount is £3,000 for 2026/27. The rate is 18% on the portion of the gain within your remaining basic-rate income tax band (the band ceiling is £37,700 of taxable income), and 24% on any gain above that. Higher and additional-rate taxpayers pay 24% on the whole gain.",
      },
    ],
  },

  {
    slug: "defi-and-staking",
    title: "DeFi and Staking",
    headline: "DeFi and staking tax for UK cryptoasset participants",
    metaTitle: "DeFi and Staking Tax UK | Crypto Tax Partners",
    metaDescription: "UK tax for DeFi and staking participants. Disposal events, staking income, LP entries and HMRC guidance on DeFi transactions.",
    intro: "DeFi tax has no clean, settled rule. Whether a return is income or capital, and whether depositing tokens into a protocol is itself a disposal, depends on the protocol mechanics and whether beneficial ownership transfers. HMRC's published analysis covers many DeFi structures, but the legislative fix consulted on in 2023 has not been enacted. The honest position, the one that protects you, is to read each protocol correctly rather than apply a generic classification. Every DeFi position on this page is stated as HMRC's current view, not settled law.",
    stats: [
      { value: "Two steps", label: "Staking and mining rewards: income on receipt (valued in sterling), then CGT on the later disposal using receipt value as base cost" },
      { value: "£1,000", label: "Trading and miscellaneous income allowance may shelter small staking receipts from income tax only. It does not remove CGT on the later disposal" },
      { value: "HMRC view", label: "Many DeFi deposits and LP entries are disposals under current HMRC analysis. This is HMRC's current view, not settled law" },
    ],
    challenges: [
      {
        title: "Many LP and DeFi deposits are disposals (HMRC current view, not settled law)",
        body: "Under HMRC's current analysis, depositing tokens into a liquidity pool or lending protocol can itself be a disposal if beneficial ownership of the tokens transfers to the protocol. This is the most under-reported event class in DIY DeFi returns. Software that auto-classifies DeFi entries often gets this wrong because it cannot read the protocol's beneficial-ownership mechanics. This position is HMRC's current view, not settled law.",
      },
      {
        title: "Staking rewards trigger two separate tax events",
        body: "Staking rewards are taxable as income on receipt, valued in sterling at the date of receipt. That sterling value then becomes the CGT base cost for the later disposal of those tokens. This is not double taxation on the same value: the income leg and the CGT leg each cover different economic events. Missing either leg, or conflating them, produces a wrong return.",
      },
      {
        title: "The £1,000 allowance has a ceiling",
        body: "The trading and miscellaneous income allowance can shelter up to £1,000 of small staking or DeFi income receipts from income tax in a tax year. It does not remove CGT on the later disposal of the same tokens. It is also not available if the income exceeds £1,000, and the income side and the disposal side must each be calculated separately.",
      },
      {
        title: "Airdrop treatment depends on whether you received it for something",
        body: "Airdrops received in return for a service or an expectation of doing something are taxable as income on receipt. Genuinely unsolicited airdrops received for nothing are not income; they enter CGT at their acquisition value. Blanket-treating all airdrops as income is wrong. So is treating them all as free of income tax.",
      },
    ],
    howWeHelp: [
      {
        title: "Protocol-level disposal analysis",
        body: "We read the mechanics of each protocol you have used and determine whether depositing tokens constitutes a disposal under HMRC's current analysis at CRYPTO61000. We do not apply a generic classification. Where the law is genuinely unsettled, we document that position and flag it, so your return accurately reflects the current state of HMRC's guidance.",
      },
      {
        title: "Correct staking and income receipts accounting",
        body: "We value staking and DeFi income receipts in sterling at the date of receipt, calculate any income tax due, apply the £1,000 allowance where it genuinely applies, and carry the receipt values forward as CGT base costs for the later disposal leg. Both steps are accounted for, correctly, and the allowance is applied only where it is available.",
      },
      {
        title: "Unreported DeFi years and voluntary disclosure",
        body: "Many DeFi participants have unreported disposal and income events from prior years. Voluntary disclosure to HMRC through the dedicated cryptoasset service generally produces better outcomes than waiting for HMRC to open an enquiry. We assess the scope of the exposure, quantify the liability across open years, and manage the disclosure process.",
      },
    ],
    faqs: [
      {
        question: "Is depositing into a liquidity pool a taxable disposal?",
        answer: "Under HMRC's current analysis, it can be, if beneficial ownership of the tokens transfers to the protocol. This is HMRC's current view, not settled law: the 2023 consultation on a legislative fix has not been enacted. Whether a specific deposit is a disposal depends on the protocol mechanics and requires a transaction-by-transaction assessment.",
      },
      {
        question: "How are staking rewards taxed in the UK?",
        answer: "In two steps. On receipt, the sterling value of the reward is taxable as miscellaneous income (or as trading income if the activity amounts to a trade). That sterling value becomes the CGT base cost. When you later dispose of those tokens, you pay CGT on the gain above the base cost. The income leg and the CGT leg cover different economic events.",
      },
      {
        question: "Do I pay tax twice on staking rewards?",
        answer: "No, in the sense that the same value is not taxed twice. Income tax applies to the sterling value on receipt. When you sell, CGT applies only to any gain above that receipt value. If you sell at exactly the receipt-date price, the CGT gain is nil.",
      },
      {
        question: "Does the £1,000 allowance mean my staking is tax-free?",
        answer: "Only for income tax, and only if your total trading and miscellaneous income from all sources in the tax year is below £1,000. It does not remove CGT on the later disposal of the staked tokens. The two calculations are separate.",
      },
      {
        question: "Are airdrops taxable?",
        answer: "It depends on how you received them. Airdrops received in exchange for a service, or where you were expected to do something to receive them, are taxable as income on receipt. Genuinely unsolicited airdrops received for nothing are not income; they enter CGT at their acquisition value when you later sell.",
      },
      {
        question: "Is there a settled rule for DeFi tax?",
        answer: "No. HMRC's cryptoassets manual at CRYPTO61000 sets out the current analysis, but the 2023 consultation on a legislative fix has not been enacted. The correct treatment of many DeFi structures remains HMRC's current published view, not statute, and depends on the specific protocol mechanics. Any firm that tells you otherwise is overstating the certainty of the law.",
      },
    ],
  },

  {
    slug: "nft-creators-and-flippers",
    title: "NFT Creators and Flippers",
    headline: "NFT tax for UK creators and flippers",
    metaTitle: "NFT Tax UK | CGT and Income Tax for NFT Creators | Crypto Tax Partners",
    metaDescription: "UK tax for NFT creators and traders. CGT on disposals, income tax on royalties, trader vs investor status for NFT flippers.",
    intro: "NFT tax in the UK turns on one question: are you creating or flipping? Creating and selling your own NFTs, and earning ongoing royalties, is likely to be income from a trade or profession. Buying and reselling NFTs you did not create is usually CGT on each disposal. These are two different tax pictures, and getting the split wrong, treating creator income as a capital gain or ignoring flip-on-flip CGT, is the most common error. Both sides carry their own reporting obligations.",
    stats: [
      { value: "CGT", label: "Default treatment for NFT disposals for most holders: capital gains at 18% within basic-rate band, 24% above" },
      { value: "Income", label: "Creator royalties and trading income taxed at marginal income tax rates. The activity classification depends on the badges-of-trade facts" },
      { value: "£3,000", label: "Annual exempt amount 2026/27, shared across all your CGT disposals. NFT-for-NFT and NFT-for-crypto swaps are each separate disposals" },
    ],
    challenges: [
      {
        title: "Drawing the creator-income versus flipper-CGT line",
        body: "HMRC draws the line using the badges of trade. Creating NFTs and selling them, especially as an ongoing activity with a commercial purpose, is likely to be trading or professional income taxed at your marginal rate. Buying existing NFTs and reselling them is usually CGT. There is no bright-line frequency threshold; the classification is a facts-and-badges judgment, and borderline cases need a documented opinion, not a guess.",
      },
      {
        title: "Every flip is a disposal, including NFT-for-NFT swaps",
        body: "Selling an NFT for crypto, swapping one NFT for another, or spending an NFT on goods or services are all disposals at the sterling market value at the time of the transaction. The £3,000 annual exempt amount is shared across all your CGT disposals in the year, and active flippers typically exhaust it in the first few transactions.",
      },
      {
        title: "Royalties and creator income need separate treatment",
        body: "Ongoing royalties from NFT sales are income, not capital gains. The tax treatment depends on whether the creator is trading (which puts the income in trading profits) or acting in a professional capacity. The £1,000 trading and miscellaneous income allowance may shelter very small receipts from income tax, but it does not remove CGT on any tokens received as payment.",
      },
      {
        title: "Worthless collections and rug-pull losses",
        body: "Capital losses on flips must be claimed, normally within four years of the end of the tax year they arose. Where an NFT collection becomes genuinely worthless (a rug pull, a dead chain) a negligible value claim may crystallise a loss without a sale. A price crash alone is not enough; the asset must be genuinely worthless. Exchange or marketplace collapse is fact-specific and no deduction can be promised.",
      },
    ],
    howWeHelp: [
      {
        title: "Creator-or-flipper classification with a documented basis",
        body: "We assess your NFT activity against the badges of trade and produce a written classification that supports your Self Assessment position. We handle the mixed case (creator and flipper in the same year) and the royalty income leg separately from the disposal leg. Borderline positions are flagged honestly, not resolved with false certainty.",
      },
      {
        title: "Flipper CGT reconciliation in UK rules",
        body: "We account for every disposal: sales, NFT-for-NFT swaps, NFT-for-crypto exchanges and spending events. We apply s104 pooling at average cost where it is relevant, calculate the gain on each transaction in sterling, and offset the annual exempt amount and any available losses correctly.",
      },
      {
        title: "Loss claims and negligible value for dead collections",
        body: "We identify unclaimed loss years, prepare and submit negligible value claims for genuinely worthless collections, and assess rug-pull and marketplace-collapse scenarios on the specific facts. Unclaimed capital losses are recoverable value; we find them across open years before the four-year window closes.",
      },
    ],
    faqs: [
      {
        question: "Do I pay income tax or capital gains tax on my NFTs?",
        answer: "It depends on whether you are creating or flipping. Creating and selling your own NFTs is likely to be income from a trade or profession, taxed at your marginal income tax rate. Buying and reselling NFTs you did not create is usually CGT on each disposal. The classification depends on the badges-of-trade facts, not on a single rule.",
      },
      {
        question: "How are NFT royalties taxed?",
        answer: "Royalties from NFT sales are income and are taxed at your marginal income tax rate. The £1,000 trading and miscellaneous income allowance may shelter very small annual royalty totals, but it does not apply once your total income from all trading and miscellaneous sources exceeds £1,000 in the year.",
      },
      {
        question: "Is swapping one NFT for another a taxable event?",
        answer: "Yes. An NFT-for-NFT swap is a disposal of the NFT you give up at its sterling market value at the moment of the swap. It is a CGT event in exactly the same way as a cash sale. The gain is the sterling value received minus your allowable cost.",
      },
      {
        question: "What is the NFT capital gains allowance?",
        answer: "The annual exempt amount is £3,000 for 2026/27. It is shared across all your CGT disposals in the year, including crypto and other assets. Active flippers typically exhaust it in the first few transactions once every swap is counted.",
      },
      {
        question: "Can I claim a loss on a worthless NFT collection?",
        answer: "A negligible value claim is available for cryptoassets and NFTs that have become genuinely worthless, crystallising a capital loss without a sale. A price crash alone is not enough; the asset must be worthless, not merely inaccessible or illiquid. Rug-pull and marketplace-collapse scenarios are fact-specific and the outcome depends on the particular circumstances.",
      },
    ],
  },

  {
    slug: "miners",
    title: "Miners",
    headline: "Crypto mining tax for UK miners: income, CGT and the two-step",
    metaTitle: "Crypto Mining Tax UK | Income and CGT for Miners | Crypto Tax Partners",
    metaDescription: "UK tax for crypto miners. Mining rewards taxable as miscellaneous or trading income on receipt; CGT on later disposal. Two-step calculation explained.",
    intro: "Mining rewards are taxable in the UK on receipt, valued in sterling at the date you receive them, and again when you dispose of the mined tokens. These are two separate tax events. The receipt triggers income tax (as miscellaneous income, or as trading income if the activity amounts to a trade). The disposal triggers CGT on any gain above the receipt-date value, which is your base cost. Missing either leg, or double-counting, are the two errors that make DIY mining returns wrong.",
    stats: [
      { value: "Two steps", label: "Mining rewards: income tax on receipt at sterling value, then CGT on later disposal above that base cost. Two separate tax events, not one" },
      { value: "£1,000", label: "Miscellaneous income allowance may shelter small-scale mining receipts from income tax. Does not remove CGT on the later disposal" },
      { value: "CGT", label: "Later disposal of mined tokens is a separate CGT event using the receipt-date sterling value as base cost" },
    ],
    challenges: [
      {
        title: "Missing the receipt-income leg",
        body: "Most DIY miners report only the sale of their tokens and miss the income event on receipt. HMRC's guidance is clear: mining rewards are taxable as miscellaneous income (or trading income) on the date of receipt, valued in sterling at that date. That sterling value is also your CGT base cost. Omitting it produces an understated income tax bill and a wrong capital gain.",
      },
      {
        title: "Hobby or trade: the wrong classification has consequences",
        body: "Whether your mining is miscellaneous income or trading income depends on the degree of organisation, scale, and commercial intent. Trading treatment is not automatically better: trading profits are subject to income tax at up to 45% plus Class 4 NIC. The classification is a badges-of-trade judgment on the facts, with no bright-line threshold.",
      },
      {
        title: "Where the £1,000 allowance helps and where it does not",
        body: "The trading and miscellaneous income allowance can shelter up to £1,000 of mining receipts from income tax in a year where total receipts are below that threshold. It does not remove CGT on the later disposal of those tokens. The income calculation and the CGT calculation are separate, and the allowance applies only to the income leg.",
      },
      {
        title: "Cost deductibility is facts-dependent",
        body: "Whether electricity, hardware, pool fees and other mining costs are deductible depends on whether the activity is a trade (in which case trading-expense rules apply) or a source of miscellaneous income (where relief is more limited). We do not assert a fixed deduction rule; the answer depends on the specific facts of your operation.",
      },
    ],
    howWeHelp: [
      {
        title: "Full two-step calculation: income and CGT, both legs",
        body: "We value your mining receipts in sterling at the date of receipt, calculate income tax on the receipt leg, apply the £1,000 allowance where it is available, and carry the receipt values forward as CGT base costs. When you sell or swap the mined tokens, we calculate the CGT gain correctly using those base costs.",
      },
      {
        title: "Hobby-vs-trade classification with a documented basis",
        body: "We assess your mining activity against the badges of trade and produce a classification that supports your Self Assessment position. Where cost deductibility depends on the treatment, we assess that too and route genuinely uncertain items to the correct HMRC guidance rather than asserting a deduction that may not hold.",
      },
      {
        title: "Unreported mining years and voluntary disclosure",
        body: "Miners with unreported receipt-income years face both the omitted income and the wrong base cost on any subsequent disposal. Voluntary disclosure through HMRC's dedicated cryptoasset service is available. We quantify the exposure across open years and manage the disclosure, aiming for the lowest penalty band available for unprompted disclosure.",
      },
    ],
    faqs: [
      {
        question: "How is crypto mining taxed in the UK?",
        answer: "In two steps. Mining rewards are taxable as income (miscellaneous or trading, depending on the scale and organisation of the activity) on the date of receipt, valued in sterling at that date. When you later sell or swap the mined tokens, CGT applies to any gain above the receipt-date sterling value, which is your base cost.",
      },
      {
        question: "Do I pay tax when I mine or only when I sell?",
        answer: "Both. The receipt of mining rewards is an income event. The later disposal is a separate CGT event. Both must be reported. The income on receipt also sets your CGT base cost, so the two legs are connected but they are not the same event.",
      },
      {
        question: "Does the £1,000 allowance make my mining tax-free?",
        answer: "Only for income tax, and only if your total trading and miscellaneous income from all sources in the year is below £1,000. It does not remove CGT on the later disposal of the mined tokens. If your mining receipts exceed £1,000 in the year, the allowance is not available at all.",
      },
      {
        question: "Is my mining a hobby or a trade for tax?",
        answer: "The classification depends on the degree of organisation, scale, commerciality, and other badges-of-trade factors. There is no bright-line frequency or equipment threshold. HMRC applies the same analysis as for any other activity that could be a trade. Trading treatment is not automatically better: trading profits are taxed at income tax rates plus Class 4 NIC.",
      },
      {
        question: "Do I pay tax again when I sell what I mined?",
        answer: "Yes, if there is a gain above your base cost. The base cost is the sterling value at which the reward was assessed as income on receipt. If you sell at a higher sterling value, the difference is a capital gain subject to CGT. If you sell at exactly the receipt-date price, the CGT gain is nil.",
      },
      {
        question: "Can I deduct my electricity and hardware costs?",
        answer: "It depends on whether your mining activity is treated as a trade or as a source of miscellaneous income. Deductibility rules differ between the two treatments. We assess the facts of your operation before advising on costs; we do not assert a deduction that may not be available for your specific classification.",
      },
    ],
  },

  {
    slug: "businesses",
    title: "Businesses",
    headline: "Crypto tax for UK businesses: Corporation Tax, VAT and PAYE",
    metaTitle: "Business Crypto Tax UK | Companies Holding or Accepting Crypto | Crypto Tax Partners",
    metaDescription: "UK corporation tax for businesses holding, accepting or paying in cryptoassets. CT on gains, VAT on goods and services, PAYE on token salaries.",
    intro: "A company that holds, accepts or pays in cryptoassets is a different taxpayer to an individual. Crypto gains in a company sit in Corporation Tax, not Capital Gains Tax, and a company has no annual exempt amount. The accounting treatment of crypto on the balance sheet, the VAT position when accepting crypto for goods or services, and the PAYE and NIC obligations when paying staff in tokens each need the correct analysis. And from 1 January 2026, platforms must collect transaction data under CARF, so the company's exchange accounts are visible to HMRC from the start of 2027.",
    stats: [
      { value: "CT, not CGT", label: "Corporation Tax applies to a company's crypto gains, not CGT. A company has no £3,000 annual exempt amount" },
      { value: "VAT on the supply", label: "VAT bites on the goods or services paid for in crypto, at sterling value at the time of the transaction. Not on the token exchange itself" },
      { value: "15% / £5,000", label: "Employer Class 1 NIC rate and secondary threshold from 6 April 2025 where tokens paid to staff are readily convertible assets" },
    ],
    challenges: [
      {
        title: "Corporation Tax, not CGT, and no annual exempt amount",
        body: "A company's disposal of cryptoassets falls within Corporation Tax, not Capital Gains Tax. The £3,000 annual exempt amount is an allowance for individuals and does not apply to companies. The CT rates and reliefs that apply depend on the company's profits and the number of associated companies; the rate and balance-sheet treatment require a fact-specific conversation rather than a general figure.",
      },
      {
        title: "Accepting crypto for goods or services: getting VAT right",
        body: "Exchanging one token for another is not itself a VATable supply of the tokens. However, VAT bites on the goods and services paid for in crypto, at their sterling value at the time of the transaction. A business that accepts crypto for its products or services must account for output VAT on the supply in the normal way. 'We accept crypto' does not mean 'the transaction is VAT-exempt'.",
      },
      {
        title: "Paying staff in tokens triggers PAYE and NIC",
        body: "Where tokens paid to employees are readily convertible assets (broadly, where they can be exchanged for cash), they are treated as earnings. PAYE and NIC apply. Employer Class 1 NIC is charged at 15% above the £5,000 secondary threshold from 6 April 2025. The previous rate of 13.8% above £9,100 is stale and must not be used.",
      },
      {
        title: "CARF: company accounts are now visible",
        body: "From 1 January 2026, UK cryptoasset platforms must collect user and transaction data under the Cryptoasset Reporting Framework. The first report to HMRC covers the 2026 calendar year and must be submitted between 1 January 2027 and 31 May 2027. Company exchange accounts are within scope. The period in which a company's crypto activity was invisible to HMRC is formally over.",
      },
    ],
    howWeHelp: [
      {
        title: "CT, VAT and PAYE brought together in one engagement",
        body: "We handle the Corporation Tax position on crypto disposals, the VAT accounting for goods and services paid in crypto, and the PAYE and NIC obligations on token salary payments, as a single engagement rather than three separate conversations. We route balance-sheet measurement questions to the applicable accounting standards and flag where the treatment is fact-specific.",
      },
      {
        title: "Employer NIC and employment-income compliance on token payments",
        body: "We assess whether the tokens you pay are readily convertible assets, calculate the PAYE and NIC liability at the correct rates (employer NIC 15% above £5,000 from 6 April 2025), and ensure the payroll accounting is consistent with HMRC's employment-income guidance at CRYPTO42000.",
      },
      {
        title: "CARF readiness and corporate disclosure",
        body: "We assess your company's CARF exposure, identify any prior-year Corporation Tax or other liabilities that may be surfaced when platform data reaches HMRC from early 2027, and manage voluntary disclosure where it reduces penalties. The dedicated HMRC cryptoasset disclosure service is available to companies as well as individuals; unprompted disclosure consistently achieves lower penalty rates than prompted disclosure.",
      },
    ],
    faqs: [
      {
        question: "How is crypto taxed in a limited company?",
        answer: "A company pays Corporation Tax on gains from cryptoasset disposals, not Capital Gains Tax. There is no £3,000 annual exempt amount for companies. The applicable CT rate and any reliefs depend on the company's total profits and the number of associated companies; the specific figures need a fact-specific assessment rather than a general answer.",
      },
      {
        question: "Do we charge VAT if we accept crypto for our products?",
        answer: "VAT applies to the goods or services you supply, not to the method of payment. If you supply VATable goods or services, output VAT is due, calculated on the sterling value of those goods or services at the time of the transaction. Accepting crypto does not make the supply VAT-exempt. The token exchange itself is not a VATable supply of the tokens.",
      },
      {
        question: "Can we pay staff or contractors in crypto?",
        answer: "Yes, but where the tokens are readily convertible assets, the payment is treated as earnings, and PAYE and NIC apply in the same way as a cash salary. The assessment of whether tokens are readily convertible is the key question; we assess that on the specific tokens and the terms of payment.",
      },
      {
        question: "What is the employer NIC cost of paying staff in tokens?",
        answer: "Employer Class 1 NIC is charged at 15% on the value of readily convertible asset tokens above the £5,000 secondary threshold per employee, from 6 April 2025. The previous rate of 13.8% above £9,100 is no longer current.",
      },
      {
        question: "Does CARF apply to our company's exchange accounts?",
        answer: "Yes. UK cryptoasset platforms must collect user and transaction data from 1 January 2026, covering transactions in the 2026 calendar year. The first report to HMRC must be submitted between 1 January 2027 and 31 May 2027. Company accounts held on in-scope platforms are included.",
      },
      {
        question: "We hold crypto on our balance sheet. How is it accounted for?",
        answer: "The accounting treatment, including whether crypto is recognised as an intangible asset, inventory, or at fair value, depends on the applicable accounting standard and the specific nature of the holding. This is a fact-specific question that requires a conversation about your company's circumstances and the applicable standard, rather than a general rule.",
      },
    ],
  },
];

export function getCryptoHub(slug: string): CryptoHub | undefined {
  return cryptoHubs.find(h => h.slug === slug);
}
