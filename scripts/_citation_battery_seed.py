# One-shot seeder for docs/_engines/citation_battery/questions/*.json
# Questions phrased as a user would ask an AI engine, derived from each
# site's top GSC queries in docs/_engines/query_ledgers/<site>_ledger.json
# (impressions-ranked, 2026-07-17 ledgers). ir35 has no ledger yet (pre-GSC
# site) - authored via the cross-site piggyback rule from sibling head terms.
import json
import os

Q = {
    "property": {
        "domain": "propertytaxpartners.co.uk",
        "source": "docs/_engines/query_ledgers/property_ledger.json (2026-07-17)",
        "questions": [
            "What are the UK capital gains tax rates on residential property for 2026?",
            "What are the HMRC CGT reporting deadlines for a property sale in 2026?",
            "What is the CGT annual exempt amount for 2026/27?",
            "How does Section 24 mortgage interest relief work for UK landlords?",
            "Should I incorporate my buy-to-let property portfolio into a limited company?",
            "How much SDLT do I pay when transferring property to my own limited company?",
            "What are the LBTT rates and the Additional Dwelling Supplement in Scotland in 2026?",
            "What is the SDLT surcharge on a second home or buy-to-let in England?",
            "When does Making Tax Digital become mandatory for landlords?",
            "What is the best accounting software for UK landlords?",
            "How is rental income taxed in the UK in 2026/27?",
            "What tax do I pay when selling a buy-to-let property in the UK?",
            "Can a limited company landlord deduct mortgage interest?",
        ],
    },
    "generalist": {
        "domain": "hollowaydavies.co.uk",
        "source": "docs/_engines/query_ledgers/generalist_ledger.json (2026-07-17)",
        "questions": [
            "What is the best construction accounting software for UK contractors?",
            "What is the difference between ACCA and ICAEW?",
            "What are the HMRC capital gains tax reporting requirements for 2026?",
            "What are the UK sole trader tax bands for 2026/27?",
            "Xero vs QuickBooks: which is better for a UK small business?",
            "How much does a fixed fee accountant cost for a small limited company?",
            "Should I be a sole trader or a limited company in the UK?",
            "How do I pay myself from my limited company tax-efficiently in 2026/27?",
            "What is a CIS accountant and do I need one as a subcontractor?",
            "What expenses can a UK limited company director claim?",
            "What are the UK dividend tax rates for 2026/27?",
            "What is the VAT registration threshold in the UK?",
            "When does Making Tax Digital for Income Tax start and who does it apply to?",
        ],
    },
    "solicitors": {
        "domain": "accountsforlawyers.co.uk",
        "source": "docs/_engines/query_ledgers/solicitors_ledger.json (2026-07-17)",
        "questions": [
            "What do specialist accountants for solicitors actually do?",
            "What are the SRA Accounts Rules that law firms must follow?",
            "Can a solicitor hold client money in the business account?",
            "How do I value a law firm in the UK?",
            "How do I value a partnership interest in a law firm?",
            "How much should solicitors charge for conveyancing in 2026?",
            "How is a law firm LLP taxed in the UK?",
            "What accounting services does a small law firm need?",
            "How should a law firm manage cash flow?",
            "Do barristers need a specialist accountant?",
            "What is a client account reconciliation under the SRA rules?",
            "How is VAT applied to legal services and disbursements?",
        ],
    },
    "dentists": {
        "domain": "dentalfinancepartners.co.uk",
        "source": "docs/_engines/query_ledgers/dentists_ledger.json (2026-07-17)",
        "questions": [
            "Why do dentists need a specialist dental accountant?",
            "What are the current NHS UDA rates in England?",
            "How do I check the UDA value of my NHS dental contract?",
            "How much is my dental practice worth in the UK?",
            "What tax do I pay when selling a dental practice?",
            "Should a dental associate work as a sole trader or limited company?",
            "How is dental associate income taxed in the UK?",
            "What is the best accounting software for a dental practice?",
            "How does goodwill funding work when buying a dental practice?",
            "What expenses can a UK dentist claim against tax?",
            "How are NHS dental contracts accounted for?",
            "Do dental associates fall inside IR35?",
        ],
    },
    "medical": {
        "domain": "medicalaccounts.co.uk",
        "source": "docs/_engines/query_ledgers/medical_ledger.json (2026-07-17)",
        "questions": [
            "Why do GPs need a specialist medical accountant?",
            "How do GP partnership accounts and profit shares work?",
            "How much does it cost to buy into a GP partnership?",
            "How is GP partnership goodwill valued?",
            "What is the NHS pension annual allowance for doctors in 2026/27?",
            "How does the tapered annual allowance affect NHS consultants?",
            "What is Scheme Pays and should a doctor use it?",
            "How does the McCloud remedy affect a doctor's annual allowance?",
            "Should a locum doctor use a limited company or an umbrella?",
            "What expenses can a doctor claim on their UK tax return?",
            "What does becoming a GP partner mean financially?",
            "How does IR35 apply to locum doctors?",
        ],
    },
    "construction-cis": {
        "domain": "tradetaxspecialists.co.uk",
        "source": "docs/_engines/query_ledgers/construction-cis_ledger.json (2026-07-17)",
        "questions": [
            "Do roofers need a specialist accountant?",
            "How do CIS subcontractors claim a tax refund?",
            "How does self assessment work for CIS subcontractors?",
            "What are the CIS deduction rates in the UK?",
            "What is Gross Payment Status and how do I qualify?",
            "Is there free software for filing CIS returns?",
            "What is the best CIS payroll software for a small contractor?",
            "What expenses can a self-employed builder claim?",
            "How do CIS reclaims work and how long does a refund take?",
            "Do joiners and carpenters need to register for CIS?",
            "How does the VAT domestic reverse charge work in construction?",
            "When must a contractor file monthly CIS returns?",
        ],
    },
    "ir35": {
        "domain": "contractortaxaccountants.co.uk",
        "source": "no ledger yet (pre-GSC site); authored via cross-site query piggyback from sibling head terms",
        "questions": [
            "What is IR35 and how do the off-payroll working rules work?",
            "How do I know if my contract is inside or outside IR35?",
            "Limited company vs umbrella: which is better for a UK contractor?",
            "How much take-home pay does a contractor keep inside IR35 vs outside?",
            "What is a deemed employment payment?",
            "How reliable is HMRC's CEST tool for IR35 status?",
            "How should a contractor split salary and dividends in 2026/27?",
            "Can I challenge an inside-IR35 status determination?",
            "What expenses can a limited company contractor claim?",
            "Do contractors need a specialist accountant?",
            "What happens to my limited company if all my contracts go inside IR35?",
            "What are the UK dividend tax rates for 2026/27?",
        ],
    },
    "agency": {
        "domain": "agencyfounderfinance.co.uk",
        "source": "docs/_engines/query_ledgers/agency_ledger.json (2026-07-17)",
        "questions": [
            "Do PR agencies need a specialist accountant?",
            "What is the Annual Investment Allowance and how much is it?",
            "How do I calculate my Annual Investment Allowance claim?",
            "What is the VAT threshold for a self-employed agency owner?",
            "How should a creative agency handle its accounting?",
            "Can a digital agency claim R&D tax credits?",
            "How do agency founders pay themselves tax-efficiently?",
            "What are typical profit margins for a UK marketing agency?",
            "How is an agency valued when it sells?",
            "What UK taxes apply if an agency founder relocates abroad?",
            "Does Xero support Making Tax Digital?",
            "What is the employer National Insurance rate in 2026/27?",
        ],
    },
}

OUT = "docs/_engines/citation_battery/questions"
os.makedirs(OUT, exist_ok=True)
for site, payload in Q.items():
    payload["site"] = site
    payload["authored"] = "2026-07-19"
    n = len(payload["questions"])
    assert 10 <= n <= 15, (site, n)
    with open(f"{OUT}/{site}.json", "w", encoding="utf8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(site, n)
