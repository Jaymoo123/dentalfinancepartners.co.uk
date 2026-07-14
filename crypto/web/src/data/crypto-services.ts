export interface CryptoService {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const cryptoServices: CryptoService[] = [
  {
    slug: "hmrc-disclosure",
    title: "HMRC Disclosure",
    headline: "HMRC crypto disclosure for unpaid cryptoasset tax",
    metaTitle: "HMRC Crypto Disclosure Service | Digital Asset Tax Partners",
    metaDescription: "Specialist help with HMRC crypto disclosure. Nudge letter response, years assessable by behaviour band, penalty range and voluntary disclosure route.",
    intro: "If you have received a nudge letter about cryptoassets, or you know you have undeclared gains before HMRC's Cryptoasset Reporting Framework begins flowing exchange data from January 2027, the right move is a managed, voluntary disclosure, not silence. HMRC operates a dedicated <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">cryptoasset disclosure service</a> separate from the general Worldwide Disclosure Facility. Coming forward voluntarily, with a correctly reconstructed position including <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">s104 pooling</a> at average cost, puts you in the best possible position on the number of years assessed and the penalty outcome. The firm handles the full process: reconstruct your transaction history, compute the correct liability, prepare and submit the disclosure, and manage HMRC correspondence through to settlement.",
    stats: [
      { value: "4 years", label: "Years HMRC can assess where under-declaration arose from reasonable care (non-deliberate)" },
      { value: "6 years", label: "Years assessable for careless under-declaration" },
      { value: "20 years", label: "Years assessable for deliberate concealment" },
    ],
    challenges: [
      {
        title: "A nudge letter is not the end, but ignoring it makes it worse",
        body: "HMRC's cryptoasset nudge letters are prompts, not charges. Recipients who do not respond invite an HMRC-initiated enquiry, which removes the prompt-disclosure mitigations on penalties. Responding through the dedicated <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">cryptoasset disclosure service</a> keeps control with you and secures the lowest available penalty band for your behaviour category.",
      },
      {
        title: "The number of years HMRC can go back depends entirely on your behaviour",
        body: "Under <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">HMRC's disclosure framework</a>, the assessment window is 4 years for reasonable care, 6 years for careless under-declaration, and 20 years for deliberate concealment. Getting the behaviour characterisation right at the outset matters enormously: 4 years versus 20 years of liability is a very different exposure.",
      },
      {
        title: "Crypto-to-crypto swaps create taxable disposals even without a pound leaving your account",
        body: "Every swap between tokens is a <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">disposal at sterling market value</a> at the moment of the swap. Many holders with undeclared gains never converted to fiat; that does not reduce the liability. Reconstructing the correct exposure requires locating and valuing every swap, not only the withdrawals to a bank account.",
      },
      {
        title: "Producing a defensible disclosure figure is skilled work, not a spreadsheet sum",
        body: "<a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">Section 104 pooling</a> requires tracking the average cost of each token across every acquisition. Software using FIFO or specific identification produces the wrong UK figure. The same-day and <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250\">30-day bed-and-breakfast rules</a> override the pool and are beyond any stateless tool. A disclosure built on the wrong method exposes a holder to a second enquiry.",
      },
    ],
    howWeHelp: [
      {
        title: "Full transaction reconstruction and UK-correct liability calculation",
        body: "We gather exchange exports, on-chain data and any available records to rebuild your full history. Every disposal is computed under s104 pooling at average cost, with same-day and 30-day matching applied correctly. The output is a defensible liability figure, with tax, interest and a penalty-band assessment, before anything is submitted to HMRC.",
      },
      {
        title: "Managed submission through HMRC's dedicated cryptoasset disclosure route",
        body: "We prepare and submit the disclosure through <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">HMRC's cryptoasset-specific service</a>, with a cover narrative explaining the behaviour characterisation and the steps taken to ensure completeness. Voluntary, unprompted disclosure submitted with a correct calculation secures the lowest available penalty range for your behaviour band.",
      },
      {
        title: "HMRC correspondence management through to settlement",
        body: "We handle all HMRC responses, information requests and settlement correspondence so you are not navigating the process alone. If HMRC raises questions about the methodology or the period covered, we respond with the technical position. The engagement ends when the disclosure is accepted and the liability settled.",
      },
    ],
    faqs: [
      {
        question: "I have received a nudge letter about cryptoassets. What should I do?",
        answer: "Do not ignore it. A nudge letter is HMRC prompting you to check your position, not a formal assessment. Responding voluntarily through <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">HMRC's cryptoasset disclosure service</a> secures the lowest available penalty outcome for your behaviour band and keeps the process orderly. Ignoring the letter invites an HMRC-led enquiry, which removes those mitigations.",
      },
      {
        question: "Can HMRC actually see my exchange account?",
        answer: "From 1 January 2026, UK cryptoasset platforms are required to collect user and transaction data under the <a href=\"https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data\">Cryptoasset Reporting Framework (CARF)</a>. The first report to HMRC covering the 2026 calendar year is due <a href=\"https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data\">between 1 January and 31 May 2027</a>, with annual reporting thereafter. HMRC does not yet hold that data, but the collection has begun and the first report window opens in early 2027.",
      },
      {
        question: "What is CARF and when does HMRC start getting the data?",
        answer: "The Cryptoasset Reporting Framework is the UK's equivalent of the Common Reporting Standard applied to crypto. UK platforms <a href=\"https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data\">collect user and transaction data from 1 January 2026</a>, covering the full 2026 calendar year. The first report to HMRC is submitted <a href=\"https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data\">between 1 January and 31 May 2027</a>, and annually by 31 May thereafter.",
      },
      {
        question: "How many years back can HMRC assess?",
        answer: "Under <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">HMRC's cryptoasset disclosure framework</a>, the assessment window depends on behaviour: 4 years for reasonable care, 6 years for careless under-declaration, and 20 years for deliberate concealment. Getting the behaviour characterisation right at the start is one of the most important decisions in managing a disclosure.",
      },
      {
        question: "Will I get a penalty if I come forward voluntarily?",
        answer: "Penalties are charged as a percentage of the tax due and vary by behaviour band (reasonable care, careless, deliberate) and by whether the disclosure is unprompted or prompted. An unprompted voluntary disclosure, made before HMRC contacts you, secures the lowest available penalty range in your band. See <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">HMRC's guidance</a> for the applicable penalty framework; we do not assert a fixed percentage because the ranges depend on the full facts.",
      },
      {
        question: "I never cashed out to pounds. Do I still have undeclared tax?",
        answer: "Yes, you may. Every swap between tokens is a <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">disposal at sterling market value</a> at the time of the swap, whether or not pounds ever left your exchange account. Spending crypto on goods and services and gifting crypto (except to a spouse or civil partner) are also disposals. Many holders with significant undeclared tax never made a bank withdrawal.",
      },
      {
        question: "What is the difference between the Worldwide Disclosure Facility and the cryptoasset disclosure service?",
        answer: "The Worldwide Disclosure Facility is HMRC's route for offshore income and gains, typically bank accounts, investments and assets held abroad. HMRC operates a separate, dedicated <a href=\"https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets\">cryptoasset disclosure service</a> specifically for unpaid tax on crypto, including assets held on overseas exchanges. Most crypto disclosures route through the latter, though the specific route depends on the full facts.",
      },
      {
        question: "I do not know my full transaction history. Can you still help?",
        answer: "Yes. Incomplete records are common, particularly where exchanges have closed or historical exports are unavailable. We work with whatever you have, supplement it with on-chain data where possible, and apply the methodology that HMRC expects. Where records are genuinely unavailable, the disclosure narrative explains that; a best-endeavours reconstruction on the correct method is always preferable to no disclosure at all.",
      },
    ],
  },
  {
    slug: "crypto-self-assessment",
    title: "Crypto Self Assessment",
    headline: "Self Assessment filing for UK cryptoasset holders",
    metaTitle: "Crypto Self Assessment UK | SA108 Filing | Digital Asset Tax Partners",
    metaDescription: "Self Assessment preparation and filing for crypto investors and traders. SA108 cryptoasset pages, CGT computation, staking income and HMRC deadlines.",
    intro: "If you disposed of cryptoassets, received staking or mining rewards, or held DeFi positions in a tax year, Self Assessment is almost certainly required. The SA108 capital gains supplementary pages carry dedicated cryptoasset entries. Two points catch holders by surprise: gains must be reported even when no tax is due once disposal proceeds exceed the reporting threshold, and <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">every crypto-to-crypto swap is a disposal</a> at sterling market value, not just withdrawals to a bank account. The firm handles the full Self Assessment: reconstruct disposals under <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">s104 pooling</a>, compute gains and income-side receipts, complete the SA108 entries, and submit before the 31 January deadline.",
    stats: [
      { value: "5 Oct", label: "Self Assessment registration deadline following the tax year in which first reportable gains or income arose" },
      { value: "31 Jan", label: "Online Self Assessment filing and payment deadline" },
      { value: "SA108", label: "Dedicated cryptoasset entries on the capital gains supplementary pages" },
    ],
    challenges: [
      {
        title: "Reporting is required even when no tax is due",
        body: "Where disposal proceeds exceed the reporting threshold, the disposals must be reported inside Self Assessment even if the <a href=\"https://www.gov.uk/capital-gains-tax/allowances\">£3,000 annual exempt amount</a> covers the gain and no tax is payable. This is the single most common DIY miss: a nil-tax position is not a nil-reporting position. Failure to report when required carries late-filing penalties and may prompt an enquiry.",
      },
      {
        title: "Every swap is a disposal, whether or not you saw sterling",
        body: "Exchanging one token for another is a <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">taxable disposal at the sterling market value</a> at the time of the swap. An active holder who never converted to fiat may have hundreds of reportable disposals. Spending crypto on goods or services and gifting crypto (except to a spouse or civil partner) are also disposals. The filing obligation follows the disposals, not the bank statements.",
      },
      {
        title: "S104 pooling, not FIFO, determines your allowable cost",
        body: "<a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">Section 104 pooling</a> holds each token at average cost across all acquisitions. Software that defaults to FIFO or specific identification produces an incorrect UK figure. The <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250\">same-day and 30-day matching rules</a> then override the pool. An SA108 submission built on the wrong method is not a defensible filing.",
      },
      {
        title: "Staking and mining income needs its own treatment before the CGT question arises",
        body: "Staking and mining rewards are taxable on receipt at sterling value as miscellaneous or trading income. That receipt value also becomes the <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200\">CGT base cost</a> for the later disposal. The two-step means both the income side and the gains side of the SA return need separate treatment, not a single CGT entry.",
      },
    ],
    howWeHelp: [
      {
        title: "Complete disposal reconstruction under the correct UK method",
        body: "We gather every exchange export and on-chain record, compute disposals under <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">s104 pooling</a> at average cost, apply same-day and 30-day matching, and reconcile the total gains and losses. The result is a set of figures ready to carry onto the SA108 capital gains pages, with each disposal defensible if HMRC asks.",
      },
      {
        title: "Income-side treatment for staking, mining, airdrops and DeFi receipts",
        body: "We classify each token receipt against its income character: miscellaneous income, trading income, or a capital acquisition with no income at point of receipt (such as an unsolicited airdrop). Each category feeds the correct SA box. Where DeFi treatment is uncertain under <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000\">HMRC's current analysis</a>, we present the position honestly rather than applying a blanket rule.",
      },
      {
        title: "SA108 completion and submission before the 31 January deadline",
        body: "We complete the SA108 cryptoasset entries and the wider Self Assessment return, review for consistency, and submit electronically by the 31 January deadline. If <a href=\"https://www.gov.uk/register-for-self-assessment\">registration by 5 October</a> has been missed for an earlier year, we advise on late registration and, where prior years are affected, on whether a voluntary disclosure through the <a href=\"/services/hmrc-disclosure\">cryptoasset disclosure service</a> is the better route.",
      },
    ],
    faqs: [
      {
        question: "Do I need to do a Self Assessment for crypto?",
        answer: "Yes, if you disposed of cryptoassets in the tax year (including swaps and spending), received staking or mining income, or if your disposal proceeds exceed the CGT reporting threshold. <a href=\"https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return\">HMRC's registration guidance</a> sets out the full triggers. The filing obligation follows the disposals, not whether tax is actually owed.",
      },
      {
        question: "What is the 5 October deadline?",
        answer: "If it is your first year needing Self Assessment, you must <a href=\"https://www.gov.uk/register-for-self-assessment\">register with HMRC by 5 October</a> following the end of the tax year in which the first reportable gains or income arose. Missing that date does not remove the obligation; it adds a potential late-registration issue on top.",
      },
      {
        question: "Do I have to report crypto if I made no profit or stayed under the annual exempt amount?",
        answer: "Possibly yes. Where your disposal proceeds exceed the reporting threshold, you must report the disposals inside Self Assessment <a href=\"https://www.gov.uk/capital-gains-tax/reporting-and-paying-capital-gains-tax\">even if no tax is due</a> because the <a href=\"https://www.gov.uk/capital-gains-tax/allowances\">£3,000 annual exempt amount</a> covers the gain. The reporting obligation and the tax liability are separate questions.",
      },
      {
        question: "I only swapped one coin for another. Do I report that?",
        answer: "Yes. A swap is a <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">disposal at sterling market value</a> at the moment of the exchange. Every token-for-token trade is a reportable event. The most common misconception is that only withdrawals to a bank account create a tax event.",
      },
      {
        question: "I received staking rewards. Where do those go on my tax return?",
        answer: "Staking rewards are typically taxable as <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200\">miscellaneous income on receipt</a>, valued in sterling at that point. That receipt value also becomes your CGT base cost for the later disposal of those tokens. The two-step means both an income entry and a future CGT entry, not just one or the other.",
      },
      {
        question: "What if I should have filed in previous years?",
        answer: "If you have unreported crypto gains or income from earlier years, a voluntary disclosure through <a href=\"/services/hmrc-disclosure\">HMRC's cryptoasset disclosure service</a> is the right route, not late Self Assessment returns alone. The number of years covered and the penalty outcome depend on your behaviour band. Come forward before HMRC contacts you to secure the lowest available penalty range.",
      },
      {
        question: "Can I just use my Koinly report to file?",
        answer: "A Koinly or Recap report is a useful starting point, but it needs review before it goes on the SA108. UK individuals must use <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">s104 pooling at average cost</a>, not FIFO or specific identification. The same-day and 30-day matching rules are also beyond most stateless tools. We offer a <a href=\"/services/koinly-recap-reconciliation\">dedicated reconciliation service</a> that verifies the method and flags any misclassifications before we file.",
      },
      {
        question: "What is the annual exempt amount for 2026/27?",
        answer: "The <a href=\"https://www.gov.uk/capital-gains-tax/allowances\">CGT annual exempt amount is £3,000</a> for 2026/27. It is not a filing exemption: if your disposal proceeds exceed the reporting threshold you must report the disposals even if the exempt amount covers the gain. The allowance is also per person, not per asset, so active traders with many disposals often exhaust it in the first transaction or two once swaps are counted.",
      },
    ],
  },
  {
    slug: "koinly-recap-reconciliation",
    title: "Koinly and Recap Reconciliation",
    headline: "Review and reconciliation of Koinly and Recap tax reports",
    metaTitle: "Koinly Recap Tax Report Review UK | Digital Asset Tax Partners",
    metaDescription: "Specialist review of Koinly and Recap CGT reports for UK tax. s104 pooling errors, same-day and 30-day matching, DeFi classification and HMRC filing.",
    intro: "You have a Koinly, Recap or CoinTracking report but you are not sure it is UK-correct. The most common reason it might not be is the pooling method: UK individuals must use <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">section 104 pooling at average cost</a> per token, not FIFO, LIFO or specific identification, which are the defaults in US-originated software and in many account setups. A report using the wrong method produces a plausible-looking number that is still wrong. The firm reviews your export, verifies the method settings, applies <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250\">same-day and 30-day matching</a> where the tool has not, checks swap and transfer classifications, and produces a reconciled position you can file on or disclose from.",
    stats: [
      { value: "s104", label: "The only UK-correct pooling method: average cost per token, not FIFO or specific identification" },
      { value: "30 days", label: "Bed-and-breakfast rule: acquisitions within 30 days of disposal override the s104 pool" },
      { value: "Same day", label: "Same-day matching must be applied before the 30-day rule and the pool, and is beyond stateless tools" },
    ],
    challenges: [
      {
        title: "FIFO and specific identification are wrong for UK individuals",
        body: "<a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">Section 104 pooling</a> requires that every acquisition of a token goes into a single pool, and the allowable cost on any disposal is the average cost of that pool at the time of disposal. FIFO matches the earliest coins first; specific identification lets you pick. Both produce a different, usually incorrect, allowable cost under UK rules. The error can run in either direction and compounds across a multi-year history.",
      },
      {
        title: "The same-day and 30-day rules are beyond what a stateless report can reliably apply",
        body: "Under <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250\">HMRC's matching rules</a>, a disposal must first be matched against same-day acquisitions, then against acquisitions in the following 30 days, and only then against the s104 pool. These rules exist to prevent bed-and-breakfast loss harvesting. A report that does not apply them correctly overstates losses (or understates gains) in the periods where the rules bite, and is the biggest single source of DIY calculation error for active traders.",
      },
      {
        title: "Wallet-to-wallet transfers are not disposals, but software often misclassifies them",
        body: "Moving tokens between your own wallets is not a <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">disposal</a>. Swapping one token for another, or sending tokens to another person, is. Software that cannot reliably distinguish your own wallets from external addresses will treat internal transfers as disposals and inflate the apparent gain. A reconciliation pass catches these misclassifications before they reach a filing.",
      },
      {
        title: "DeFi deposits and LP entries may themselves be disposals, not just receipts",
        body: "Under <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000\">HMRC's current analysis</a>, many DeFi lending deposits and liquidity-pool entries involve a transfer of beneficial ownership and are therefore disposals of the deposited tokens. This is HMRC's current view, not settled law, but it is the most under-reported event class in DIY reports and one of the most important things a reconciliation review checks. A report that treats DeFi deposits as neutral transfers will understate the gain.",
      },
    ],
    howWeHelp: [
      {
        title: "Method verification and correction to UK s104 pooling",
        body: "We review your export settings and recalculate any periods where the wrong pooling method was applied. Every token's pool is reconstructed at average cost, with acquisitions sequenced correctly. The corrected pool forms the allowable-cost baseline for every disposal in the reconciled report. Where software can be corrected at the settings level, we advise on that; where a manual override is needed, we apply it.",
      },
      {
        title: "Same-day and 30-day matching applied manually where the tool has not",
        body: "We identify every disposal that falls within a matching period (same-day acquisition, or acquisition in the following 30 days) and apply <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250\">HMRC's ordering rules</a> manually. This is the one step no stateless tool can reliably do, and it is often the difference between a defensible position and one that will not survive an enquiry. The reconciled output states which disposals were matched and against which acquisitions.",
      },
      {
        title: "Reconciled output ready for filing or disclosure",
        body: "The reconciled report feeds directly into a <a href=\"/services/crypto-self-assessment\">Self Assessment SA108 filing</a> or, where prior years are affected, into a <a href=\"/services/hmrc-disclosure\">voluntary disclosure</a> through HMRC's cryptoasset service. We flag any remaining uncertainties (unresolved DeFi classification, unavailable records) with the methodology used so that the filing position is transparent and defensible.",
      },
    ],
    faqs: [
      {
        question: "Is Koinly accurate for UK tax?",
        answer: "Koinly supports <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">s104 pooling</a> as a setting, but the accuracy of the output depends entirely on whether the settings are correct, whether wallet addresses are properly classified as your own, and whether all exchanges and wallets are connected. The software cannot apply the <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250\">same-day and 30-day matching rules</a> reliably. A UK accountant review catches the gaps the tool itself cannot flag.",
      },
      {
        question: "What pooling method should my crypto tax report use in the UK?",
        answer: "<a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">Section 104 pooling at average cost</a>, per token. Each token has one pool; the allowable cost on any disposal is the average cost of all acquisitions into that pool to date. FIFO, LIFO and specific identification (common in US software and US-oriented account setups) are wrong for UK individuals.",
      },
      {
        question: "Why does FIFO give the wrong UK answer?",
        answer: "FIFO matches the earliest coins first and uses the cost of those specific coins as the allowable cost. UK rules require the pool average, which is a different number once you have multiple purchases at different prices. In a rising market, FIFO typically understates the allowable cost (overstating the gain); in a falling market it overstates it. The direction of the error depends on the price history, not on the method being conservative or generous.",
      },
      {
        question: "What are the same-day and 30-day rules and can software handle them?",
        answer: "Under <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250\">HMRC's matching rules</a>, a disposal must be matched first against same-day acquisitions, then against acquisitions in the 30 days following the disposal, and only then against the s104 pool. These rules prevent loss harvesting by selling and immediately rebuying. Most stateless tools cannot apply them reliably because doing so requires knowing the full acquisition sequence across the matching windows, not just the disposal date.",
      },
      {
        question: "My report shows a large gain from swaps I never cashed out. Is that right?",
        answer: "It can be. Every swap between tokens is a <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">disposal at sterling market value</a> at the time of the swap. If you swapped into a token that subsequently fell, the gain on the swap is still real even though the replacement token is now worth less. However, if your own wallet transfers are being misclassified as swaps, those are not disposals and the report needs correcting.",
      },
      {
        question: "Can you work from a Recap or CoinTracking export too?",
        answer: "Yes. The reconciliation process applies to any UK-destined crypto tax report, regardless of which tool generated the export. The checks are the same: pooling method, same-day and 30-day matching, transfer versus disposal classification, and DeFi event treatment.",
      },
      {
        question: "Can you fix a report that was filed on the wrong method in a previous year?",
        answer: "If a prior return was filed using the wrong pooling method, the corrective route is usually a voluntary amendment or a disclosure through <a href=\"/services/hmrc-disclosure\">HMRC's cryptoasset disclosure service</a>, depending on how long ago the year was and what the under-declaration looks like. We can reconstruct the correct position and advise on the appropriate route.",
      },
    ],
  },
  {
    slug: "crypto-cgt-planning",
    title: "Crypto CGT Planning",
    headline: "CGT planning for UK cryptoasset holders",
    metaTitle: "Crypto CGT Planning UK | AEA, Band and Spouse Planning | Digital Asset Tax Partners",
    metaDescription: "CGT planning for crypto investors. Annual exempt amount use, basic-rate band planning, spouse transfers and loss harvesting for UK cryptoasset holders.",
    intro: "You can reduce a crypto CGT bill legitimately and recover value from past losses you did not know were claimable. The planning levers available to UK cryptoasset holders are precise and documented: spouse and civil-partner no-gain/no-loss transfers, capital loss harvesting within the four-year claim window, and negligible-value claims on genuinely worthless tokens from rug pulls or dead chains. The rate you are planning against matters: <a href=\"https://www.gov.uk/capital-gains-tax/rates\">18% within your remaining basic-rate band and 24% above</a>, against a <a href=\"https://www.gov.uk/capital-gains-tax/allowances\">£3,000 annual exempt amount</a> per person. The firm reviews your pooled position, models the available levers, prepares any spouse transfers and loss claims correctly, and files the outcome.",
    stats: [
      { value: "£3,000", label: "CGT annual exempt amount per person, 2026/27: usable each year or permanently lost" },
      { value: "£37,700", label: "Basic-rate band ceiling 2026/27: gains within the remaining band taxed at 18%, above at 24%" },
      { value: "4 years", label: "Time limit to claim a capital loss after the end of the tax year it arose: unclaimed losses are lost" },
    ],
    challenges: [
      {
        title: "The CGT rate is not a flat 18%",
        body: "<a href=\"https://www.gov.uk/capital-gains-tax/rates\">CGT on cryptoassets</a> is charged at 18% only on the part of the gain that fits inside your remaining basic-rate band (the band ceiling is £37,700 of taxable income for 2026/27). Any gain above that boundary is charged at 24%. Higher and additional-rate taxpayers pay 24% on the whole gain. Effective planning models the actual band position, not a rounded rate.",
      },
      {
        title: "Capital losses only count if you claim them, and unclaimed years may still be open",
        body: "<a href=\"https://www.gov.uk/capital-gains-tax/losses\">Capital losses must be claimed</a> to be usable, normally within four years of the end of the tax year in which they arose. Many holders have made and never reported losses on failed projects, early exchanges that closed, or prior market crashes. Those unclaimed years may still be within the claim window and carry forward value that offsets future gains.",
      },
      {
        title: "Lost private keys are not a loss, but worthless tokens may be",
        body: "Losing access to a wallet is <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400\">not itself a disposal</a> and does not crystallise a loss for CGT. A <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500\">negligible value claim</a> is available for tokens whose value has genuinely fallen to nil or near-nil, such as rug pulls and dead chains. The two are not the same: inaccessibility is not worthlessness. DIY guides routinely blur this distinction.",
      },
      {
        title: "Gifting to a spouse is a planning lever; gifting to anyone else is a disposal",
        body: "Transfers between spouses and civil partners are <a href=\"https://www.gov.uk/capital-gains-tax/gifts\">no-gain/no-loss</a>: the asset moves at base cost with no CGT triggered, and the receiving spouse acquires it at that cost. Used correctly this doubles the annual exempt amount and both basic-rate bands available to the couple. Gifting to children, friends or anyone else is a disposal at market value at the time of the gift, with no exemption.",
      },
    ],
    howWeHelp: [
      {
        title: "Pool reconstruction and lever modelling before you act",
        body: "Before planning can start, the pooled position must be correct. We reconstruct your s104 pools under <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200\">UK pooling rules</a>, compute the unrealised gain on each holding, and model the available levers against your income band position. The output is a set of options with their CGT outcomes, not an investment recommendation.",
      },
      {
        title: "Spouse transfers, loss claims and negligible-value claims prepared correctly",
        body: "Spouse transfers must be documented with the correct base cost passing to the receiving spouse. Loss claims require the loss to be evidenced and reported in the right tax year. <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500\">Negligible-value claims</a> require the token to be genuinely worthless and the claim to be made formally. We prepare and file all three categories, with the documentation HMRC expects.",
      },
      {
        title: "Year-end review and carry-forward register",
        body: "Planning is only useful if it is executed before the tax year ends and recorded so carry-forward losses are not forgotten. We review your position close to 5 April, implement the agreed actions, and maintain a carry-forward register of unclaimed losses and their claim-year windows so future returns start from the correct base.",
      },
    ],
    faqs: [
      {
        question: "What rate is crypto CGT in 2026/27?",
        answer: "<a href=\"https://www.gov.uk/capital-gains-tax/rates\">18% on the part of the gain within your remaining basic-rate income tax band, and 24% on any gain above that</a>. The basic-rate band ceiling is £37,700 of taxable income for 2026/27. Higher and additional-rate taxpayers pay 24% on the whole gain. Never plan against a flat 18%.",
      },
      {
        question: "How much can I make tax-free?",
        answer: "The <a href=\"https://www.gov.uk/capital-gains-tax/allowances\">CGT annual exempt amount is £3,000 per person for 2026/27</a>. It is a use-it-or-lose-it allowance: it cannot be carried forward. Active holders who have made multiple swaps often exhaust it on the first disposal or two once all crypto-to-crypto trades are counted as separate disposals.",
      },
      {
        question: "Can I transfer crypto to my spouse to save tax?",
        answer: "Yes, with conditions. Transfers between spouses and civil partners are <a href=\"https://www.gov.uk/capital-gains-tax/gifts\">no-gain/no-loss</a>: no CGT arises at the time of transfer, and the receiving spouse takes the asset at your original base cost. This allows both spouses to use their annual exempt amounts and both basic-rate bands against a future disposal. The transfer must be a genuine gift with no condition of return; it cannot be unwound without a new disposal.",
      },
      {
        question: "I made losses years ago and never told HMRC. Is it too late?",
        answer: "It depends on when the loss arose. <a href=\"https://www.gov.uk/capital-gains-tax/losses\">Capital losses must normally be claimed within four years</a> of the end of the tax year in which they arose. A loss from 2022/23 can be claimed until 5 April 2027. Losses outside the window are permanently lost. It is worth checking what is still claimable before the windows close.",
      },
      {
        question: "My tokens are worthless from a rug pull. Can I claim the loss?",
        answer: "If the tokens have a value of nil or near-nil, a <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500\">negligible value claim</a> crystallises an allowable loss without a sale. The tokens must be genuinely worthless (zero market, no recovery prospect), not just inaccessible. Once the claim is accepted, the loss is treated as if you disposed of and reacquired at nil value on the date you nominate.",
      },
      {
        question: "I lost my private keys. Is that a tax loss?",
        answer: "No. Losing access to a wallet is <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400\">not itself a disposal</a> and does not create a CGT loss. A negligible value claim only works if the asset itself has become worthless; inaccessibility does not satisfy that test. If the underlying tokens still have value and could in principle be recovered, no loss is claimable.",
      },
      {
        question: "What happened to my coins on a collapsed exchange like FTX?",
        answer: "The outcome depends on the specific facts: it may be a <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500\">negligible value claim</a>, a capital loss on a claim against the exchange in administration, or, if recoveries are still possible, neither yet. We do not promise a deduction; the position requires a fact-specific review of the insolvency status and your creditor position.",
      },
      {
        question: "Does gifting crypto to my children save tax?",
        answer: "No. Gifts to anyone other than a spouse or civil partner are <a href=\"https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets\">disposals at market value</a> at the time of the gift. CGT arises on the gain from your original cost to the market value on the day of the gift, with the usual annual exempt amount and band-split rates. The gift is not tax-free from a CGT perspective even if the recipient pays nothing.",
      },
    ],
  },
  {
    slug: "investor-vs-trader-status",
    title: "Investor vs Trader Status",
    headline: "Investor vs trader status advice for UK crypto and day traders",
    metaTitle: "Crypto Investor vs Trader Status UK | Digital Asset Tax Partners",
    metaDescription: "Badges-of-trade analysis for UK crypto and day traders. Almost all individuals are investors (CGT); trading status is rare and usually worse. Specialist advice.",
    intro: "The common assumption on trading forums is that HMRC \"trader status\" is a prize to claim. The opposite is usually true. <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250\">HMRC expects trading treatment only in exceptional circumstances</a>; almost all individuals holding and exchanging cryptoassets are investors for tax, with gains taxed under CGT at <a href=\"https://www.gov.uk/capital-gains-tax/rates\">18% within the remaining basic-rate band and 24% above</a>. Trading profits are income taxed at up to 45% plus <a href=\"https://www.gov.uk/self-employed-national-insurance-rates\">Class 4 National Insurance at 6% on profits between £12,570 and £50,270, and 2% above</a>. Trader status is usually a worse outcome, not a better one. Scottish taxpayers have devolved income tax bands, which can widen this gap further. The firm reviews your activity against the badges of trade, provides a reasoned written position, and tells you how to report consistently with it.",
    stats: [
      { value: "CGT", label: "Default for almost all individuals: HMRC expects trading status only in exceptional circumstances" },
      { value: "45%", label: "Top income tax rate if trading status applies, plus Class 4 NIC, versus 24% CGT for investors" },
      { value: "Badges", label: "Badges of trade (frequency, organisation, profit motive and more) determine status, not volume alone" },
    ],
    challenges: [
      {
        title: "Trader status is not a goal for most people",
        body: "Trading profits are <a href=\"https://www.gov.uk/income-tax-rates\">income taxable at up to 45%</a> plus <a href=\"https://www.gov.uk/self-employed-national-insurance-rates\">Class 4 NIC at 6% between £12,570 and £50,270 and 2% above</a>. By contrast, a higher-rate taxpayer's crypto gain is charged at 24% CGT with the <a href=\"https://www.gov.uk/capital-gains-tax/allowances\">£3,000 annual exempt amount</a> available. For most active holders, investor status produces a significantly lower tax outcome. Trader status matters mainly in loss-relief edge cases where income losses are more useful than capital losses.",
      },
      {
        title: "High frequency does not make you a trader under HMRC's test",
        body: "<a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250\">HMRC's cryptoassets manual</a> applies the badges-of-trade analysis from <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim20205\">BIM20205</a>: frequency and volume of transactions, organisation and infrastructure of the activity, degree of knowledge and expertise, motive, and whether the activity is consistent with a recognised trade pattern. High frequency alone does not satisfy the test. Someone executing hundreds of DeFi swaps per month can still be an investor.",
      },
      {
        title: "You cannot elect or choose your status",
        body: "Status is determined by the facts under the badges of trade, not by a formal election or by self-describing as an investor or trader. An incorrect self-characterisation does not bind HMRC. Consistently reporting as an investor when the facts support investor status is the safest approach; inconsistency between years (especially if it happens to favour you) is something HMRC's data-matching will notice.",
      },
      {
        title: "Forex and CFD traders face the same test; spread-betting sits outside tax both ways",
        body: "Day-trading in forex and CFDs uses <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim22015\">the same badges-of-trade analysis</a> as crypto. Spread-betting is different: winnings are generally outside the scope of tax because it is treated as gambling rather than a trade. The corollary is that spread-betting losses are equally unrelievable. The exemption is not purely advantageous; it cuts both ways.",
      },
    ],
    howWeHelp: [
      {
        title: "Badges-of-trade review against HMRC's published tests",
        body: "We review your activity history against the <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250\">HMRC cryptoassets manual</a> and the <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim20205\">badges of trade in BIM20205</a>: frequency, organisation, the presence of systematic profit-seeking, and the other factors HMRC weighs. We assess each badge and explain where the facts are clear and where they are marginal.",
      },
      {
        title: "Written status opinion you can rely on and report consistently with",
        body: "The output is a written position setting out the analysis, the conclusion (investor or, in the exceptional case, trader), and how to report consistently with it across Self Assessment returns. Consistent, documented treatment from the same reasoned basis is the best defence if HMRC ever queries the characterisation.",
      },
      {
        title: "Onward routing to CGT planning or Self Assessment filing",
        body: "Once investor status is confirmed, the natural next step is <a href=\"/services/crypto-cgt-planning\">CGT planning</a> to make best use of the annual exempt amount, the basic-rate band split and, where relevant, spouse transfers. Where prior years have been reported inconsistently, we advise whether a voluntary disclosure or an amended return is the correct route.",
      },
    ],
    faqs: [
      {
        question: "Am I a crypto trader or an investor for HMRC?",
        answer: "Almost certainly an investor. <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250\">HMRC's manual</a> states that trading treatment applies only in exceptional circumstances. The default for individuals holding and exchanging cryptoassets is CGT as an investor. The badges-of-trade test determines whether exceptional circumstances apply; frequency and volume alone are not enough.",
      },
      {
        question: "Does high trading frequency make me a trader?",
        answer: "No. <a href=\"https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250\">HMRC applies the badges-of-trade analysis</a>, which looks at frequency alongside organisation, knowledge, motive, and the overall character of the activity. Someone making many trades per day through a structured, businesslike setup may be closer to trading, but frequency is one factor among several, not a trigger on its own.",
      },
      {
        question: "Is trader status better for tax?",
        answer: "Usually no. Trading profits are <a href=\"https://www.gov.uk/income-tax-rates\">income taxable at up to 45%</a> plus <a href=\"https://www.gov.uk/self-employed-national-insurance-rates\">Class 4 NIC</a> (6% between £12,570 and £50,270, 2% above). A higher-rate investor pays 24% CGT on gains with the <a href=\"https://www.gov.uk/capital-gains-tax/allowances\">£3,000 annual exempt amount</a> available. For most people the investor outcome is substantially better. Trader status is mainly of use where income losses are needed to offset other income, which is a narrow edge case.",
      },
      {
        question: "What tax do day traders actually pay?",
        answer: "If HMRC treats the activity as trading, profits are income taxable at the marginal rate (20%, 40% or 45%) plus <a href=\"https://www.gov.uk/self-employed-national-insurance-rates\">Class 4 NIC at 6% on profits between £12,570 and £50,270 and 2% above</a>. If the activity is investment, gains are subject to <a href=\"https://www.gov.uk/capital-gains-tax/rates\">CGT at 18% within the remaining basic-rate band and 24% above</a>, with the £3,000 exempt amount. The difference for a higher-rate taxpayer on the same profit is substantial.",
      },
      {
        question: "What are the badges of trade?",
        answer: "The badges are factors <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim20205\">HMRC uses to assess whether an activity amounts to a trade</a>: the subject matter, the frequency and number of transactions, the length of the ownership period, the circumstances of realisation (forced sale versus planned profit-taking), supplementary work done on the asset, the motive (profit as the primary aim versus income from holding), and whether the activity is organised as a business. No single badge is determinative.",
      },
      {
        question: "When would trader status ever help me?",
        answer: "The main edge case is loss relief. Trading losses can be set against other income in the same or preceding year, which is more flexible than capital losses (which can only offset capital gains). If you have run at a sustained loss, trader status might produce a better overall position. However, this needs a careful comparison of the full income and gains position, not an assumption that losses make trading status desirable.",
      },
      {
        question: "How is forex trading taxed in the UK?",
        answer: "Spot forex involves gains or losses on a foreign currency asset. Those gains are chargeable under CGT in most cases (with a narrow personal-spending exemption for currency acquired for travel). If the activity amounts to a trade under the <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim22015\">badges-of-trade test</a>, profits are income. The test is the same as for crypto. CFD profits follow a similar analysis.",
      },
      {
        question: "Is spread betting taxed?",
        answer: "Spread-betting winnings are generally outside the scope of <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim22015\">UK tax</a> because HMRC treats spread betting as gambling rather than a financial trade. The corollary is that spread-betting losses are equally unrelievable: they cannot be offset against income or gains. The exemption is not a pure advantage; it removes the ability to claim losses too.",
      },
      {
        question: "Can I just choose to be a trader or an investor?",
        answer: "No. Status is determined by the facts under the badges of trade, not by a self-declared election. Reporting consistently as an investor across all years, when the facts support that characterisation, is the correct approach. HMRC's data matching covers multiple years and will notice an inconsistency that happens to favour you in the year it is applied.",
      },
    ],
  },
];

export function getCryptoService(slug: string): CryptoService | undefined {
  return cryptoServices.find(s => s.slug === slug);
}
