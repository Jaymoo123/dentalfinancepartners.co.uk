-- Bulk insert 40 blog topics for Dental Finance Partners
-- Run this in Supabase SQL Editor

-- TIER 1: High Priority (12 topics)
INSERT INTO blog_topics (topic, secondary_keywords, used) VALUES
('Do I need to register for self assessment as a dentist?', 'self assessment registration, dentist tax registration, HMRC registration, self-employed dentist', false),
('Should I register for VAT as an associate dentist?', 'VAT registration threshold, associate VAT, voluntary VAT registration, dentist VAT', false),
('NHS superannuation and your pension annual allowance', 'NHS pension, pension annual allowance, dentist pension, superannuation scheme, pension tax', false),
('Sole trader vs limited company for dentists: which is right for you?', 'limited company dentist, sole trader dentist, incorporation, business structure, tax comparison', false),
('Is dental treatment VAT exempt? A clear guide for practice owners', 'dental VAT exemption, VAT on dental treatment, mixed supply VAT, dental services VAT', false),
('What goodwill means when buying or selling a dental practice', 'dental practice goodwill, goodwill valuation, intangible assets, practice sale, goodwill tax', false),
('How to read a dental practice profit and loss account', 'P&L account, profit and loss, practice finances, financial statements, reading accounts', false),
('NHS UDA rates 2026/27 and what they mean for your practice finances', 'NHS UDA rates, UDA value, NHS contract, NHS income, unit of dental activity', false),
('How to choose a dental accountant UK', 'choosing accountant, specialist accountant, dental accountant, accountant selection, best accountant', false),
('Making Tax Digital for dental practices', 'MTD, Making Tax Digital, digital tax records, MTD compliance, HMRC digital', false),
('Payment on account: what dentists need to know', 'payment on account, POA, tax payments, HMRC payments, advance tax', false),
('Capital gains tax when selling a dental practice', 'CGT, capital gains tax, practice sale tax, selling practice, CGT relief', false);

-- TIER 2: Medium Priority (10 topics)
INSERT INTO blog_topics (topic, secondary_keywords, used) VALUES
('How NHS contract payments work and how to account for them', 'NHS payments, contract income, NHS accounting, BSA payments, NHS reconciliation', false),
('Business asset disposal relief for dentists: what qualifies?', 'BADR, entrepreneurs relief, CGT relief, business disposal, tax relief', false),
('How to pay yourself as a dental practice owner', 'salary vs dividend, profit extraction, owner pay, director salary, tax-efficient pay', false),
('Facial aesthetics and VAT: what dental practices need to know', 'facial aesthetics VAT, botox VAT, cosmetic treatment VAT, aesthetics tax', false),
('What is a reasonable profit margin for a dental practice?', 'dental profit margin, practice profitability, profit benchmarking, practice performance', false),
('Associate dentist agreements: the financial clauses that matter', 'associate agreement, associate contract, percentage split, associate terms', false),
('Corporation tax for dental limited companies: a plain-English guide', 'corporation tax, limited company tax, CT600, company tax return', false),
('The cost of setting up a dental practice from scratch', 'startup costs, new practice costs, practice setup, initial investment', false),
('Management accounts for dental practices: what to track', 'management accounts, dental KPIs, practice metrics, financial reporting', false),
('Dental practice valuation methods explained', 'practice valuation, practice worth, valuation methods, EBITDA multiple', false);

-- TIER 3: Lower Priority (8 topics)
INSERT INTO blog_topics (topic, secondary_keywords, used) VALUES
('How to structure a dental group across multiple sites', 'dental group structure, multi-site structure, group accounting, holding company', false),
('Laboratory costs and how to treat them in your accounts', 'lab costs, laboratory expenses, dental lab, cost of sales', false),
('Equipment finance for dental practices: what are the tax implications?', 'equipment finance, dental equipment, leasing, hire purchase, capital allowances', false),
('Inter-company loans and dividends in a dental group structure', 'inter-company loans, group dividends, group tax, transfer pricing', false),
('When does a dental practice need an audit?', 'statutory audit, audit requirement, audit threshold, Companies Act audit', false),
('IR35 and dentists: does it apply to associate agreements?', 'IR35, off-payroll working, associate employment status, IR35 dentist', false),
('Pension contributions for dentists: tax relief and annual allowance', 'pension contributions, pension tax relief, annual allowance, pension planning', false),
('Dental practice insurance: what can you claim as a business expense?', 'practice insurance, professional indemnity, insurance tax, deductible insurance', false);

-- GAP-FILLING TOPICS: High Value (10 topics)
INSERT INTO blog_topics (topic, secondary_keywords, used) VALUES
('R&D tax credits for dental practices: are you eligible?', 'R&D tax credits, innovation relief, research and development, dental R&D, HMRC R&D', false),
('Hiring your first associate: what it costs and how to structure it', 'hiring associate, associate costs, associate agreement, first associate, recruitment', false),
('Dental practice benchmarking: are you profitable?', 'practice benchmarking, profitability, practice performance, dental KPIs, profit comparison', false),
('Student loan repayments for dentists: how they are calculated', 'student loan repayment, Plan 2 student loan, dentist student debt, loan threshold', false),
('Maternity and paternity leave for associate dentists: what you need to know', 'maternity leave associate, self-employed maternity, statutory pay, parental leave', false),
('CQC inspection costs: can you claim them as expenses?', 'CQC costs, CQC inspection, CQC fees, compliance costs, tax deductible', false),
('Dental practice exit planning: when to start and what to consider', 'exit planning, selling practice, retirement planning, practice succession, exit strategy', false),
('Dental accountant London: how to choose a specialist', 'dental accountant London, London accountant, specialist accountant, choosing accountant London', false),
('Dental accountant Manchester: why specialist knowledge matters', 'dental accountant Manchester, Manchester accountant, specialist accountant, local accountant', false),
('Moving from associate to practice owner: financial planning guide', 'associate to owner, buying first practice, practice ownership, financial planning', false);
