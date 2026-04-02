# Read and fix the config file
with open('Medical/config_supabase.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace site-specific values
content = content.replace('Property niche', 'Medical niche')
content = content.replace('https://propertytaxpartners.co.uk', 'https://www.medicalaccounts.co.uk')
content = content.replace('"Property Tax Partners"', '"Medical Accounts"')

# Replace categories
old_categories = '''POST_CATEGORIES = [
    "Section 24 & Tax Relief",
    "Incorporation & Company Structures",
    "Making Tax Digital (MTD)",
    "Capital Gains Tax",
    "Portfolio Management",
]'''

new_categories = '''POST_CATEGORIES = [
    "GP Tax & Accounts",
    "NHS Pension Planning",
    "Locum Tax",
    "Private Practice",
    "Medical Expenses",
    "Incorporation & Company Structures",
    "Consultant Tax",
]'''

content = content.replace(old_categories, new_categories)

# Replace internal links
old_links = '''INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
    "/incorporation",
    "/calculators",
]'''

new_links = '''INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
    "/nhs-pension",
    "/calculators",
]'''

content = content.replace(old_links, new_links)

# Replace audience mapping function
old_function = '''def get_relevant_audience_link(topic: str) -> str:
    """Map blog topic to the most relevant audience page."""
    topic_lower = topic.lower()
    if "incorporation" in topic_lower or "limited company" in topic_lower:
        return "/incorporation"
    elif "section 24" in topic_lower or "calculator" in topic_lower:
        return "/calculators"
    elif "mtd" in topic_lower or "making tax digital" in topic_lower:
        return "/services"
    else:
        return "/services"'''

new_function = '''def get_relevant_audience_link(topic: str) -> str:
    """Map blog topic to the most relevant audience page."""
    topic_lower = topic.lower()
    if "nhs pension" in topic_lower or "annual allowance" in topic_lower:
        return "/nhs-pension"
    elif "incorporation" in topic_lower or "limited company" in topic_lower:
        return "/services"
    elif "calculator" in topic_lower:
        return "/calculators"
    else:
        return "/services"'''

content = content.replace(old_function, new_function)

# Replace system prompt
content = content.replace('You are a specialist UK property accountant writing blog content for Property Tax Partners.', 'You are a specialist UK medical accountant writing blog content for Medical Accounts.')
content = content.replace('AUDIENCE: UK landlords and property investors (individual landlords, portfolio owners, property developers).', 'AUDIENCE: UK medical professionals (GP partners, salaried GPs, locum doctors, hospital consultants, private practice owners).')
content = content.replace('Plain English — avoid jargon unless it is standard in UK property (e.g. BTL, SPV, Section 24, MTD).', 'Plain English — avoid jargon unless it is standard in UK medical practice (e.g. GMS, QOF, PCN, NHS pension, GMC, BMA).')
content = content.replace('Write as if you are explaining something to a colleague who knows property but not accounting.', 'Write as if you are explaining something to a medical colleague who understands medicine but not accounting.')
content = content.replace('Use real examples where helpful (e.g. "a landlord with 3 BTL properties earning £45k rental income").', 'Use real examples where helpful (e.g. "a GP partner earning £120k with £15k pension growth").')

# Replace UK context section
old_context = '''UK CONTEXT:
- Reference current tax years (2025/26, 2026/27)
- Use UK terminology: buy-to-let (BTL), landlord, property portfolio, SPV
- Include specific examples with UK tax bands and allowances
- Mention Section 24 mortgage interest restriction where relevant
- Reference MTD for Income Tax Property (ITSA) starting 6 April 2026
- Use London/Manchester/Birmingham examples for local relevance'''

new_context = '''UK MEDICAL CONTEXT:
- Reference current tax years (2025/26, 2026/27)
- Use UK medical terminology: GP partner, salaried GP, locum, consultant, GMS contract, QOF, PCN
- Include specific examples with UK tax bands and allowances
- Mention NHS pension annual allowance (£60k standard, tapered for high earners)
- Reference tapered annual allowance (threshold income >£200k, adjusted income >£260k)
- Mention IR35 for locum doctors where relevant
- Reference GMC registration, professional indemnity (MDU/MPS), BMA membership
- Use London/Manchester/Birmingham examples for local relevance

MEDICAL-SPECIFIC TAX ISSUES:
- NHS pension annual allowance and tapered allowance
- GP partnership profit sharing and basis period reform
- Locum doctor IR35 status and employment structures
- Private practice incorporation decisions
- Medical professional expenses (GMC, indemnity, BMA, CPD)
- Mixed NHS and private income allocation'''

content = content.replace(old_context, new_context)

# Replace compliance section
content = content.replace('Suggest readers "speak to a specialist" or "get advice" for specific situations.', 'Suggest readers "speak to a specialist medical accountant" or "get advice" for specific situations.')

# Replace category list in output format
content = content.replace('[One of: Section 24 & Tax Relief, Incorporation & Company Structures, Making Tax Digital (MTD), Capital Gains Tax, Portfolio Management]', '[One of: GP Tax & Accounts, NHS Pension Planning, Locum Tax, Private Practice, Medical Expenses, Incorporation & Company Structures, Consultant Tax]')

# Write back
with open('Medical/config_supabase.py', 'w', encoding='utf-8') as f:
    f.write(content)

print('Medical config created successfully')
