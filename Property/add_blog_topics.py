"""
Bulk add blog topics to Supabase blog_topics table.
"""
import httpx
from config_supabase import SUPABASE_URL, SUPABASE_KEY

# TIER 1: High Priority (12 topics)
tier1_topics = [
    {
        "topic": "Do I need to register for self assessment as a dentist?",
        "secondary_keyword_1": "self assessment registration",
        "secondary_keyword_2": "dentist tax registration",
        "secondary_keyword_3": "HMRC registration",
        "secondary_keyword_4": "self-employed dentist",
        "category": "Associate tax",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Should I register for VAT as an associate dentist?",
        "secondary_keyword_1": "VAT registration threshold",
        "secondary_keyword_2": "associate VAT",
        "secondary_keyword_3": "voluntary VAT registration",
        "secondary_keyword_4": "dentist VAT",
        "category": "VAT & compliance",
        "priority": 3,
        "used": False
    },
    {
        "topic": "NHS superannuation and your pension annual allowance",
        "secondary_keyword_1": "NHS pension",
        "secondary_keyword_2": "pension annual allowance",
        "secondary_keyword_3": "dentist pension",
        "secondary_keyword_4": "superannuation scheme",
        "secondary_keyword_5": "pension tax",
        "category": "Associate tax",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Sole trader vs limited company for dentists: which is right for you?",
        "secondary_keyword_1": "limited company dentist",
        "secondary_keyword_2": "sole trader dentist",
        "secondary_keyword_3": "incorporation",
        "secondary_keyword_4": "business structure",
        "secondary_keyword_5": "tax comparison",
        "category": "Practice accounting",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Is dental treatment VAT exempt? A clear guide for practice owners",
        "secondary_keyword_1": "dental VAT exemption",
        "secondary_keyword_2": "VAT on dental treatment",
        "secondary_keyword_3": "mixed supply VAT",
        "secondary_keyword_4": "dental services VAT",
        "category": "VAT & compliance",
        "priority": 3,
        "used": False
    },
    {
        "topic": "What goodwill means when buying or selling a dental practice",
        "secondary_keyword_1": "dental practice goodwill",
        "secondary_keyword_2": "goodwill valuation",
        "secondary_keyword_3": "intangible assets",
        "secondary_keyword_4": "practice sale",
        "secondary_keyword_5": "goodwill tax",
        "category": "Buying a practice",
        "priority": 3,
        "used": False
    },
    {
        "topic": "How to read a dental practice profit and loss account",
        "secondary_keyword_1": "P&L account",
        "secondary_keyword_2": "profit and loss",
        "secondary_keyword_3": "practice finances",
        "secondary_keyword_4": "financial statements",
        "secondary_keyword_5": "reading accounts",
        "category": "Practice finance",
        "priority": 3,
        "used": False
    },
    {
        "topic": "NHS UDA rates 2026/27 and what they mean for your practice finances",
        "secondary_keyword_1": "NHS UDA rates",
        "secondary_keyword_2": "UDA value",
        "secondary_keyword_3": "NHS contract",
        "secondary_keyword_4": "NHS income",
        "secondary_keyword_5": "unit of dental activity",
        "category": "Practice finance",
        "priority": 3,
        "used": False
    },
    {
        "topic": "How to choose a dental accountant UK",
        "secondary_keyword_1": "choosing accountant",
        "secondary_keyword_2": "specialist accountant",
        "secondary_keyword_3": "dental accountant",
        "secondary_keyword_4": "accountant selection",
        "secondary_keyword_5": "best accountant",
        "category": "Practice accounting",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Making Tax Digital for dental practices",
        "secondary_keyword_1": "MTD",
        "secondary_keyword_2": "Making Tax Digital",
        "secondary_keyword_3": "digital tax records",
        "secondary_keyword_4": "MTD compliance",
        "secondary_keyword_5": "HMRC digital",
        "category": "VAT & compliance",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Payment on account: what dentists need to know",
        "secondary_keyword_1": "payment on account",
        "secondary_keyword_2": "POA",
        "secondary_keyword_3": "tax payments",
        "secondary_keyword_4": "HMRC payments",
        "secondary_keyword_5": "advance tax",
        "category": "Associate tax",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Capital gains tax when selling a dental practice",
        "secondary_keyword_1": "CGT",
        "secondary_keyword_2": "capital gains tax",
        "secondary_keyword_3": "practice sale tax",
        "secondary_keyword_4": "selling practice",
        "secondary_keyword_5": "CGT relief",
        "category": "Buying a practice",
        "priority": 3,
        "used": False
    },
]

# TIER 2: Medium Priority (10 topics)
tier2_topics = [
    {
        "topic": "How NHS contract payments work and how to account for them",
        "secondary_keyword_1": "NHS payments",
        "secondary_keyword_2": "contract income",
        "secondary_keyword_3": "NHS accounting",
        "secondary_keyword_4": "BSA payments",
        "secondary_keyword_5": "NHS reconciliation",
        "category": "Practice finance",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Business asset disposal relief for dentists: what qualifies?",
        "secondary_keyword_1": "BADR",
        "secondary_keyword_2": "entrepreneurs relief",
        "secondary_keyword_3": "CGT relief",
        "secondary_keyword_4": "business disposal",
        "secondary_keyword_5": "tax relief",
        "category": "Associate tax",
        "priority": 2,
        "used": False
    },
    {
        "topic": "How to pay yourself as a dental practice owner",
        "secondary_keyword_1": "salary vs dividend",
        "secondary_keyword_2": "profit extraction",
        "secondary_keyword_3": "owner pay",
        "secondary_keyword_4": "director salary",
        "secondary_keyword_5": "tax-efficient pay",
        "category": "Practice finance",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Facial aesthetics and VAT: what dental practices need to know",
        "secondary_keyword_1": "facial aesthetics VAT",
        "secondary_keyword_2": "botox VAT",
        "secondary_keyword_3": "cosmetic treatment VAT",
        "secondary_keyword_4": "aesthetics tax",
        "category": "VAT & compliance",
        "priority": 2,
        "used": False
    },
    {
        "topic": "What is a reasonable profit margin for a dental practice?",
        "secondary_keyword_1": "dental profit margin",
        "secondary_keyword_2": "practice profitability",
        "secondary_keyword_3": "profit benchmarking",
        "secondary_keyword_4": "practice performance",
        "category": "Practice finance",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Associate dentist agreements: the financial clauses that matter",
        "secondary_keyword_1": "associate agreement",
        "secondary_keyword_2": "associate contract",
        "secondary_keyword_3": "percentage split",
        "secondary_keyword_4": "associate terms",
        "category": "Associate tax",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Corporation tax for dental limited companies: a plain-English guide",
        "secondary_keyword_1": "corporation tax",
        "secondary_keyword_2": "limited company tax",
        "secondary_keyword_3": "CT600",
        "secondary_keyword_4": "company tax return",
        "category": "Practice accounting",
        "priority": 2,
        "used": False
    },
    {
        "topic": "The cost of setting up a dental practice from scratch",
        "secondary_keyword_1": "startup costs",
        "secondary_keyword_2": "new practice costs",
        "secondary_keyword_3": "practice setup",
        "secondary_keyword_4": "initial investment",
        "category": "Buying a practice",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Management accounts for dental practices: what to track",
        "secondary_keyword_1": "management accounts",
        "secondary_keyword_2": "dental KPIs",
        "secondary_keyword_3": "practice metrics",
        "secondary_keyword_4": "financial reporting",
        "category": "Practice accounting",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Dental practice valuation methods explained",
        "secondary_keyword_1": "practice valuation",
        "secondary_keyword_2": "practice worth",
        "secondary_keyword_3": "valuation methods",
        "secondary_keyword_4": "EBITDA multiple",
        "category": "Buying a practice",
        "priority": 2,
        "used": False
    },
]

# TIER 3: Lower Priority (8 topics)
tier3_topics = [
    {
        "topic": "How to structure a dental group across multiple sites",
        "secondary_keyword_1": "dental group structure",
        "secondary_keyword_2": "multi-site structure",
        "secondary_keyword_3": "group accounting",
        "secondary_keyword_4": "holding company",
        "category": "Practice accounting",
        "priority": 1,
        "used": False
    },
    {
        "topic": "Laboratory costs and how to treat them in your accounts",
        "secondary_keyword_1": "lab costs",
        "secondary_keyword_2": "laboratory expenses",
        "secondary_keyword_3": "dental lab",
        "secondary_keyword_4": "cost of sales",
        "category": "Practice accounting",
        "priority": 1,
        "used": False
    },
    {
        "topic": "Equipment finance for dental practices: what are the tax implications?",
        "secondary_keyword_1": "equipment finance",
        "secondary_keyword_2": "dental equipment",
        "secondary_keyword_3": "leasing",
        "secondary_keyword_4": "hire purchase",
        "secondary_keyword_5": "capital allowances",
        "category": "Practice accounting",
        "priority": 1,
        "used": False
    },
    {
        "topic": "Inter-company loans and dividends in a dental group structure",
        "secondary_keyword_1": "inter-company loans",
        "secondary_keyword_2": "group dividends",
        "secondary_keyword_3": "group tax",
        "secondary_keyword_4": "transfer pricing",
        "category": "Practice accounting",
        "priority": 1,
        "used": False
    },
    {
        "topic": "When does a dental practice need an audit?",
        "secondary_keyword_1": "statutory audit",
        "secondary_keyword_2": "audit requirement",
        "secondary_keyword_3": "audit threshold",
        "secondary_keyword_4": "Companies Act audit",
        "category": "Practice accounting",
        "priority": 1,
        "used": False
    },
    {
        "topic": "IR35 and dentists: does it apply to associate agreements?",
        "secondary_keyword_1": "IR35",
        "secondary_keyword_2": "off-payroll working",
        "secondary_keyword_3": "associate employment status",
        "secondary_keyword_4": "IR35 dentist",
        "category": "Associate tax",
        "priority": 1,
        "used": False
    },
    {
        "topic": "Pension contributions for dentists: tax relief and annual allowance",
        "secondary_keyword_1": "pension contributions",
        "secondary_keyword_2": "pension tax relief",
        "secondary_keyword_3": "annual allowance",
        "secondary_keyword_4": "pension planning",
        "category": "Associate tax",
        "priority": 1,
        "used": False
    },
    {
        "topic": "Dental practice insurance: what can you claim as a business expense?",
        "secondary_keyword_1": "practice insurance",
        "secondary_keyword_2": "professional indemnity",
        "secondary_keyword_3": "insurance tax",
        "secondary_keyword_4": "deductible insurance",
        "category": "Practice accounting",
        "priority": 1,
        "used": False
    },
]

# GAP-FILLING TOPICS: High Value (10 topics)
gap_topics = [
    {
        "topic": "R&D tax credits for dental practices: are you eligible?",
        "secondary_keyword_1": "R&D tax credits",
        "secondary_keyword_2": "innovation relief",
        "secondary_keyword_3": "research and development",
        "secondary_keyword_4": "dental R&D",
        "secondary_keyword_5": "HMRC R&D",
        "category": "Practice accounting",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Hiring your first associate: what it costs and how to structure it",
        "secondary_keyword_1": "hiring associate",
        "secondary_keyword_2": "associate costs",
        "secondary_keyword_3": "associate agreement",
        "secondary_keyword_4": "first associate",
        "secondary_keyword_5": "recruitment",
        "category": "Practice finance",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Dental practice benchmarking: are you profitable?",
        "secondary_keyword_1": "practice benchmarking",
        "secondary_keyword_2": "profitability",
        "secondary_keyword_3": "practice performance",
        "secondary_keyword_4": "dental KPIs",
        "secondary_keyword_5": "profit comparison",
        "category": "Practice finance",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Student loan repayments for dentists: how they are calculated",
        "secondary_keyword_1": "student loan repayment",
        "secondary_keyword_2": "Plan 2 student loan",
        "secondary_keyword_3": "dentist student debt",
        "secondary_keyword_4": "loan threshold",
        "category": "Associate tax",
        "priority": 3,
        "used": False
    },
    {
        "topic": "Maternity and paternity leave for associate dentists: what you need to know",
        "secondary_keyword_1": "maternity leave associate",
        "secondary_keyword_2": "self-employed maternity",
        "secondary_keyword_3": "statutory pay",
        "secondary_keyword_4": "parental leave",
        "category": "Associate tax",
        "priority": 3,
        "used": False
    },
    {
        "topic": "CQC inspection costs: can you claim them as expenses?",
        "secondary_keyword_1": "CQC costs",
        "secondary_keyword_2": "CQC inspection",
        "secondary_keyword_3": "CQC fees",
        "secondary_keyword_4": "compliance costs",
        "secondary_keyword_5": "tax deductible",
        "category": "Practice accounting",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Dental practice exit planning: when to start and what to consider",
        "secondary_keyword_1": "exit planning",
        "secondary_keyword_2": "selling practice",
        "secondary_keyword_3": "retirement planning",
        "secondary_keyword_4": "practice succession",
        "secondary_keyword_5": "exit strategy",
        "category": "Buying a practice",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Dental accountant London: how to choose a specialist",
        "secondary_keyword_1": "dental accountant London",
        "secondary_keyword_2": "London accountant",
        "secondary_keyword_3": "specialist accountant",
        "secondary_keyword_4": "choosing accountant London",
        "category": "Practice accounting",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Dental accountant Manchester: why specialist knowledge matters",
        "secondary_keyword_1": "dental accountant Manchester",
        "secondary_keyword_2": "Manchester accountant",
        "secondary_keyword_3": "specialist accountant",
        "secondary_keyword_4": "local accountant",
        "category": "Practice accounting",
        "priority": 2,
        "used": False
    },
    {
        "topic": "Moving from associate to practice owner: financial planning guide",
        "secondary_keyword_1": "associate to owner",
        "secondary_keyword_2": "buying first practice",
        "secondary_keyword_3": "practice ownership",
        "secondary_keyword_4": "financial planning",
        "category": "Buying a practice",
        "priority": 3,
        "used": False
    },
]

def add_topics_to_supabase(topics):
    """Add topics to Supabase blog_topics table."""
    url = f"{SUPABASE_URL}/rest/v1/blog_topics"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    for topic in topics:
        try:
            response = httpx.post(url, headers=headers, json=topic)
            response.raise_for_status()
            print(f"[OK] Added: {topic['topic']}")
        except Exception as e:
            print(f"[ERROR] Failed to add '{topic['topic']}': {e}")

if __name__ == "__main__":
    print("Adding Tier 1 topics (12)...")
    add_topics_to_supabase(tier1_topics)
    
    print("\nAdding Tier 2 topics (10)...")
    add_topics_to_supabase(tier2_topics)
    
    print("\nAdding Tier 3 topics (8)...")
    add_topics_to_supabase(tier3_topics)
    
    print("\nAdding gap-filling topics (10)...")
    add_topics_to_supabase(gap_topics)
    
    print("\n[OK] All 40 topics added to Supabase!")
    print("Run 'python generate_blog_supabase.py' to start generating posts.")
