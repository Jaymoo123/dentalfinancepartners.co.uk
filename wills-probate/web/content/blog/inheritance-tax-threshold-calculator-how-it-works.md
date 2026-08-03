---
title: "How an Inheritance Tax Threshold Calculator Works, and Where It Stops"
slug: inheritance-tax-threshold-calculator-how-it-works
date: "2026-08-03"
updatedDate: "2026-08-03"
author: "Editorial Team"
image: "https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?auto=format&fit=crop&w=1200&q=80"
altText: "An office desk with printed financial charts and figures."
imageCredit:
  photographer: "Jakub Zerdzicki"
  photographerUrl: "https://unsplash.com/@jakubzerdzicki"
  source: "Unsplash"
  sourceUrl: "https://unsplash.com/photos/office-desk-with-smartphone-and-financial-charts-heiYgqp0Tsk"
category: "Inheritance Tax"
metaTitle: "IHT Threshold Calculator: How It Works"
metaDescription: "Five inputs decide whether your threshold is £325,000 or £1,000,000. How our IHT threshold calculator builds the figure, and the four things it cannot see."
h1: "How an inheritance tax threshold calculator works, and where it stops"
summary: "An inheritance tax threshold calculator turns a handful of inputs into one number: the amount an estate can pass on before 40% tax starts. This guide walks through exactly what our calculator asks for, how each input moves the answer, and the four situations where its estimate and an actual filing position part company: gifts made in the last seven years, a home that does not pass wholly to direct descendants, assets held in trust, and reliefs the tool has no box for. Knowing where the arithmetic stops is what makes the number useful."
keyTakeaways:
  - "Our calculator asks for five things: total estate value, marital status, whether a home passes to children or grandchildren, the percentage of a late spouse's allowance still available, and whether at least 10% of the estate goes to charity."
  - "It builds the threshold as nil-rate band plus residence nil-rate band, each scaled by any transferred percentage, then reduces the residence element by £1 for every £2 the estate exceeds £2,000,000."
  - "On a £1,150,000 estate, one toggle (home to children or not) moves the tax bill by £70,000, and a full transferred allowance moves it by £200,000."
  - "There is no input for lifetime gifts. Gifts in the seven years before death use up the nil-rate band first, so an estate with recent large gifts will be understated, sometimes by tens of thousands of pounds."
  - "The residence nil-rate band is the lower of £175,000 and the value of the home actually passing to direct descendants, so a modest property makes the calculator's yes/no toggle generous."
  - "Selecting married or civil partnership does not apply the spouse exemption. The tool prices one estate on one death, not the transfer to a surviving spouse, which is exempt without limit."
sourcesVerifiedAt: "2026-08-03"
faqs:
  - question: "What information do I need before using an IHT threshold calculator?"
    answer: "Four figures cover most of it. First, the gross value of everything owned at death: property at open market value, bank and investment accounts, the surrender value of any insurance not written in trust, vehicles, and personal possessions, with debts and funeral costs deducted. Second, marital status, because a surviving spouse's estate can carry a second set of allowances. Third, whether a home is passing to children, grandchildren or other direct descendants, and what that share of the property is worth. Fourth, if the deceased was widowed, the percentage of the late spouse's allowances that went unused, which the executors establish from the first estate's records rather than assuming 100%."
  - question: "Does the calculator account for the residence nil-rate band automatically?"
    answer: "It adds the residence nil-rate band whenever the 'home left to children or grandchildren' toggle is on, and it applies the taper for estates over £2,000,000 without you doing anything. What it does not do is check that the property is actually worth £175,000 or more. GOV.UK's guidance sets the allowance at the lower of the maximum and the value of the residential interest passing to direct descendants, so if the qualifying share of the home is worth £140,000, the real allowance is £140,000. The toggle cannot know that, so it credits the full £175,000."
  - question: "Does the threshold calculator include gifts made in the last 7 years?"
    answer: "No. There is no gifts field. Gifts made within seven years of death are added back and set against the nil-rate band before the death estate gets any of it, which can leave far less allowance than the calculator assumes. There is a second wrinkle worth knowing: HMRC's manual confirms the £2,000,000 taper test uses the death estate after liabilities but before exemptions and reliefs, and it excludes those lifetime gifts. So gifts reduce the available nil-rate band without reducing the taper test, which is the opposite of what most people expect."
  - question: "Why might a calculator estimate differ from HMRC's actual assessment?"
    answer: "Because a calculator prices the inputs it is given, and an inheritance tax account prices an estate. The common divergences are valuation (HMRC can challenge a property or share valuation), lifetime gifts inside seven years, business or agricultural property qualifying for relief, assets in trust that fall into the estate on death, jointly held property and survivorship, the exact percentage of a late spouse's allowances that transferred, and the spouse and charity exemptions applied to specific gifts in the will. Treat the output as a planning figure that tells you roughly which side of the line you are on."
  - question: "If I am married, why does the calculator still show tax due?"
    answer: "Selecting married or civil partnership tells the tool that no allowance has been transferred in yet, so it prices a single estate against a single set of allowances. It does not apply the spouse exemption, which removes inheritance tax entirely on whatever passes to a surviving UK-domiciled spouse or civil partner. In practice the tax on a first death is often nil and the bill lands on the second death, when the survivor's estate can claim both sets of allowances. Use the widowed option with a transfer percentage to model that second death."
  - question: "Can I use the calculator if the estate includes a business, a farm or a pension?"
    answer: "You can run it, but read the answer with those assets in mind, because none of them has a field. Business and agricultural property relief has been capped since 6 April 2026 at £2.5 million of combined qualifying property per person at 100% relief, with 50% above, so relievable assets are not simply taxable at 40% as the calculator would assume. Unused pension funds sit outside the estate for deaths before 6 April 2027 and inside it from that date, and the calculator has no pension box either way. Our pensions estimator handles the 2027 scenario properly."
generator: "claude-opus-5 | manual | 2026-08-03"
---
<h2>Five boxes decide the whole answer</h2>

<p>An inheritance tax threshold calculator is doing one job: turning a description of an estate into the amount that can pass before 40% tax starts. Our <a href="/calculators/iht-threshold-calculator">IHT threshold calculator</a> asks for five things to do it. Three are on the main panel: <strong>total estate value</strong>, <strong>marital status</strong> (single or divorced, married or in a civil partnership, or widowed with a transferable allowance), and a toggle for whether a <strong>home passes to children or grandchildren</strong>. Two more sit under "Advanced options": the <strong>percentage of a late spouse's allowance</strong> still unused, and whether <strong>at least 10% of the estate goes to charity</strong>.</p>

<p>That is the entire input set. Everything the tool tells you is derived from those five values, which is exactly why it is worth knowing what it does with them and what it never sees. This article covers England and Wales terminology, though inheritance tax itself works the same across the UK, and it is general information rather than legal or financial advice. For the underlying figures and how they were set, our siblings cover the ground properly: <a href="/blog/inheritance-tax/inheritance-tax-rates-and-allowances-explained">inheritance tax rates and allowances</a> for the full picture, and <a href="/blog/inheritance-tax/the-nil-rate-band-explained">the nil-rate band explained</a> for the £325,000 band and how it transfers.</p>

<h2>The arithmetic behind the number</h2>

<p>The calculation runs in four steps.</p>

<ol>
<li><strong>Start with the nil-rate band.</strong> £325,000, per <a href="https://www.gov.uk/government/publications/rates-and-allowances-inheritance-tax-thresholds-and-interest-rates/inheritance-tax-thresholds-and-interest-rates">GOV.UK's threshold table</a>, which currently shows the band running unchanged to 5 April 2031. If you selected widowed and entered a transfer percentage, the band is scaled: 100% gives £650,000, 50% gives £487,500.</li>
<li><strong>Add the residence nil-rate band, if the toggle is on.</strong> £175,000, scaled by the same transfer percentage, so a full transfer gives £350,000. If the toggle is off, this element is zero.</li>
<li><strong>Apply the taper.</strong> Where the estate value exceeds £2,000,000, the residence element is reduced by £1 for every £2 of the excess, as set out in <a href="https://www.gov.uk/guidance/inheritance-tax-residence-nil-rate-band">GOV.UK's residence nil-rate band guidance</a>. The nil-rate band itself never tapers.</li>
<li><strong>Tax the excess.</strong> Estate value minus the combined threshold, at 40%, or at 36% if the charity toggle is on. Both rates are confirmed on <a href="https://www.gov.uk/inheritance-tax">GOV.UK's inheritance tax page</a>.</li>
</ol>

<p>The output panel shows each step separately: the standard nil-rate band, the residence nil-rate band after any taper, the transferred allowance, the combined threshold, the taxable excess, the rate applied, and the tax due. That breakdown is the useful part. A single headline number tells you nothing about which lever to pull.</p>

<h2>Worked example: how far the inputs move the answer</h2>

<p>Callum is 61, divorced, and lives in Bristol. His estate is worth <strong>£1,150,000</strong>: a flat valued at £420,000, a rental property at £310,000, pensions aside, plus savings, investments and possessions making up the rest. The flat goes to his two adult children. Here is the same £1,150,000 run through the calculator four ways.</p>

<table>
<thead>
<tr><th>Inputs</th><th>Threshold</th><th>Taxable</th><th>Tax at 40%</th></tr>
</thead>
<tbody>
<tr><td>Single, home to children</td><td>£500,000</td><td>£650,000</td><td>£260,000</td></tr>
<tr><td>Single, flat left to his brother instead</td><td>£325,000</td><td>£825,000</td><td>£330,000</td></tr>
<tr><td>Widowed, 50% transferable, home to children</td><td>£750,000</td><td>£400,000</td><td>£160,000</td></tr>
<tr><td>Widowed, 100% transferable, home to children</td><td>£1,000,000</td><td>£150,000</td><td>£60,000</td></tr>
</tbody>
</table>

<p>Two things stand out. Changing who inherits the flat, and nothing else, costs <strong>£70,000</strong>, which is 40% of the £175,000 residence allowance that disappears. And the transferable allowance is not a footnote: the gap between 50% and 100% is <strong>£100,000</strong> of tax on an identical estate. That percentage is a matter of record from the first spouse's estate, not a guess, and executors who assume 100% because it is the default have sometimes been wrong. Our guide to the <a href="/blog/inheritance-tax/inheritance-tax-threshold-married-couples-rnrb">married couples' threshold and the RNRB</a> covers how the transfer is established and claimed.</p>

<p>If Callum left 10% or more of the net estate to charity, the advanced toggle drops the rate on the taxable slice from 40% to 36%. On the first row that is £234,000 instead of £260,000. The mechanics of the 10% test are covered in our piece on <a href="/blog/inheritance-tax/leaving-10-percent-to-charity-36-rate-iht">leaving 10% to charity and the 36% rate</a>, and there is a catch in the tool worth naming: the toggle takes your word for it. It does not compute the baseline amount the 10% is measured against, which is the estate after reliefs, exemptions and the nil-rate band, not 10% of the gross value.</p>

<h2>Four things the calculator cannot see</h2>

<p>This is where an estimate and a filing position separate. None of the following has an input field, and each can move the answer materially.</p>

<h3>1. Gifts made in the last seven years</h3>

<p>There is no gifts box. Under <a href="https://www.gov.uk/inheritance-tax/gifts">GOV.UK's guidance on gifts</a>, gifts made within seven years of death are brought back in and set against the nil-rate band before the death estate touches it. Say Callum gave a daughter £200,000 three years before he died. The natural thing to type into any calculator is the estate as it stands afterwards, £950,000, which returns a £500,000 threshold and <strong>£180,000</strong> of tax. The real position is that £200,000 of nil-rate band has already gone, leaving £125,000 plus £175,000, so £650,000 is taxable and the bill is <strong>£260,000</strong>. An £80,000 gap, produced entirely by a field that does not exist.</p>

<p>There is a counterintuitive detail here too. HMRC's <a href="https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm46023">Inheritance Tax Manual at IHTM46023</a> confirms the £2,000,000 taper test uses the estate after liabilities but <em>before</em> exemptions and reliefs, and it excludes lifetime gifts within seven years. So those gifts eat the nil-rate band without reducing the value tested for taper. Our guide to the <a href="/blog/inheritance-tax/7-year-rule-gifts-inheritance-tax">7 year rule on gifts</a> sets out the taper relief bands that apply to tax on the gifts themselves, which is a different taper again and also not modelled here.</p>

<h3>2. A home that does not pass wholly to direct descendants</h3>

<p>The toggle is binary, but the real allowance is not. GOV.UK's guidance calculates the residence nil-rate band as the lower of the maximum available and the value of the residential interest actually passing to direct descendants. Take Denise, a retired teacher whose wealth sits mostly in ISAs and whose ex-council flat is worth £140,000, left to her son. Her real allowance is £140,000, not £175,000. The toggle credits her with the full amount, understating the taxable estate by £35,000 and the tax by £14,000.</p>

<p>The same applies to shares. Direct descendants means children, grandchildren, other lineal descendants, stepchildren, adopted and fostered children, and the spouses of lineal descendants. Nephews, nieces and siblings are not on the list. If half the house goes to a son and half to a nephew, only the son's half counts towards the allowance, and the calculator's yes or no answer cannot express that. Where the property share is worth less than £175,000, or is split with someone outside the descendant list, work out the qualifying value yourself and treat the tool's threshold as the ceiling rather than the answer.</p>

<h3>3. Assets in trust</h3>

<p>No trust input exists. Depending on the type of trust, <a href="https://www.gov.uk/trusts-taxes/trusts-and-inheritance-tax">assets held in trust can form part of an estate on death</a>, most obviously with a qualifying interest in possession, and assets transferred into a trust within seven years of death are added back in the same way as any other gift. An estate that looks comfortably inside the threshold on the assets held outright can be well over it once settled property is counted. Our overview of <a href="/blog/inheritance-tax/inheritance-tax-on-trusts-10-year-charge">inheritance tax on trusts</a> explains which charges apply where.</p>

<h3>4. Reliefs, and pensions from 2027</h3>

<p>Business and agricultural property have their own regime and their own box, which this tool does not have. From <a href="https://www.gov.uk/government/publications/reforms-to-agricultural-property-relief-and-business-property-relief/agricultural-property-relief-and-business-property-relief-reforms">6 April 2026</a>, 100% relief is capped at £2.5 million of combined qualifying business and agricultural property per person, with 50% relief above that and the unused allowance transferable between spouses. An estate containing a trading company or a farm will show a far higher figure here than it will actually pay, and our notes on <a href="/blog/inheritance-tax/business-relief-inheritance-tax-basics">business relief</a> and <a href="/blog/inheritance-tax/agricultural-relief-inheritance-tax-basics">agricultural relief</a> cover the qualifying tests.</p>

<p>Pensions cut the other way. For deaths before 6 April 2027 most unused pension funds sit outside the estate entirely, and <a href="https://www.gov.uk/government/publications/inheritance-tax-unused-pension-funds-and-death-benefits/inheritance-tax-unused-pension-funds-and-death-benefits">from that date they are brought inside it</a>, with personal representatives responsible for reporting and paying. The threshold calculator has no pension field either way, so you would have to add the pot into the estate value manually and remember that doing so also drags it into the £2,000,000 taper test. Our <a href="/calculators/pensions-iht-2027-estimator">pensions and IHT 2027 estimator</a> models the before and after properly, including the residence allowance lost to the taper.</p>

<h2>One more thing about the married option</h2>

<p>Selecting married or civil partnership does not double the threshold, and it does not apply the spouse exemption. It prices one estate on one death against one set of allowances, which is why the result panel adds a note reminding you that on the second death any unused bands from the first can normally be transferred. In reality, transfers between UK-domiciled spouses and civil partners are exempt from inheritance tax without limit, so where an estate passes to a surviving spouse the tax on that first death is usually nil regardless of what the calculator shows. The number that matters is the one on the second death, and you model that with the widowed option and a transfer percentage.</p>

<h2>Getting a useful answer out of it</h2>

<p>Used well, the tool answers three questions quickly: roughly how far over the line an estate sits, which allowance is doing the heavy lifting, and how much a single decision (who gets the house, whether a charitable legacy reaches 10%) is worth in tax. Enter the gross estate before reliefs, cap the residence element at the value of the qualifying property share, and check the transfer percentage against the first spouse's records rather than leaving it at 100%. If the estate involves recent large gifts, a trust, a business, a farm or a pension you plan to leave untouched, read the output as the starting point of a conversation rather than a figure to plan around.</p>

<p>For the wider picture on how the tax is charged and reported, start with our <a href="/inheritance-tax">inheritance tax guide</a> and the detail on the <a href="/blog/inheritance-tax/inheritance-tax-threshold-uk">UK inheritance tax threshold</a>. Where the numbers are close to a threshold, or where any of the four blind spots above apply, an estate planning specialist can price the position properly, and we can put you in touch with one who works on estates of that shape.</p>
