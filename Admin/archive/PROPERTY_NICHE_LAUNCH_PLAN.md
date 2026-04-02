# Property Niche Launch Plan

**Date:** March 28, 2026  
**Target Launch:** Q2 2026  
**Domain:** propertyaccountants.co.uk  
**Status:** 📋 PLANNING PHASE

---

## 1. MARKET CONTEXT & OPPORTUNITY

### Current UK Property Landscape (2026)

**Massive Structural Shift:**
- 43% of buy-to-let purchases now via limited companies (up from 7.5% in 2018)
- 66,587 new buy-to-let companies formed in 2025 (+8% YoY)
- ~443,272 active buy-to-let companies on register

**Key Tax Pressures Driving Demand:**
1. **Section 24 Mortgage Interest Relief** - Only 20% tax credit (not full deduction)
2. **CGT Annual Allowance** - Slashed to £3,000 (was £12,300)
3. **Making Tax Digital (MTD)** - Mandatory from April 2026 for £50k+ income
4. **SDLT Surcharge** - Increased to 5% on buy-to-let purchases
5. **Income Tax Rise** - Basic rate to 22% in April 2027 (Section 24 stays 20%)

**Pain Point Example:**
- Higher-rate taxpayer with £18k rental income, £9k mortgage interest
- Personal ownership: £4,400 tax
- Limited company: £1,235 tax
- **Annual saving: £3,165** (but incorporation has upfront CGT/SDLT costs)

**Market Opportunity:** Landlords desperately need specialist advice on:
- Whether to incorporate (not universal answer)
- How to incorporate (CGT/SDLT implications)
- MTD compliance (quarterly digital reporting)
- Portfolio structuring (personal vs. company)
- Exit planning (CGT on disposal)

---

## 2. TARGET AUDIENCE SEGMENTATION

### Primary Segments

#### Segment A: Individual Landlords (1-3 Properties)
**Profile:**
- Accidental landlords or small-scale investors
- Rental income: £20k-£60k/year
- Often higher-rate taxpayers (Section 24 hits hard)
- Confused about MTD requirements
- Considering incorporation but unsure

**Pain Points:**
- Section 24 tax hit (losing 40% of mortgage interest deduction)
- MTD compliance burden (quarterly reporting)
- Incorporation decision (CGT/SDLT upfront costs vs. long-term savings)
- Self Assessment complexity (rental income + employment income)

**Services Needed:**
- Self Assessment with rental schedules
- MTD compliance support
- Incorporation feasibility analysis
- Tax planning (personal vs. company)

---

#### Segment B: Portfolio Owners (4-10 Properties)
**Profile:**
- Serious investors, often full-time landlords
- Rental income: £60k-£200k/year
- Mix of personal and company ownership
- Dealing with multiple mortgages, refinancing
- Growth-focused (acquisitions)

**Pain Points:**
- Complex tax position (multiple income sources)
- Incorporation timing (which properties, when)
- Portfolio structuring (SPV vs. single company)
- Cash flow management (mortgage payments, void periods)
- Refinancing decisions (tax implications)

**Services Needed:**
- Management accounts (property-level profitability)
- Incorporation planning (phased approach)
- SPV structuring advice
- Acquisition due diligence
- Tax-efficient profit extraction

---

#### Segment C: Large Portfolios & Developers (10+ Properties)
**Profile:**
- Professional landlords or property developers
- Rental income: £200k+/year
- Already incorporated (or should be)
- Dealing with group structures, inter-company loans
- Acquisition and disposal activity

**Pain Points:**
- Group accounting complexity
- Corporation tax planning
- Acquisition accounting (goodwill, stamp duty)
- Disposal planning (CGT, rollover relief)
- VAT on property development
- Financing structures (director loans, shareholder loans)

**Services Needed:**
- Group accounts and consolidation
- Acquisition support and due diligence
- Disposal planning (CGT optimization)
- Corporation tax planning
- VAT advice (property development)
- Restructuring advice

---

## 3. BRAND POSITIONING

### Core Positioning Statement

**"Property Accountants UK - Specialist accounting for landlords and property investors"**

**Tagline Options:**
1. "Accounting for UK landlords — nothing else"
2. "Specialist property accountants for UK landlords"
3. "Property portfolio accounting — Section 24, MTD, and incorporation"

**Recommended:** Option 1 (mirrors Dentists structure, clear differentiation)

### Key Differentiators

1. **Property-Only Focus**
   - We only work with landlords and property investors
   - Not generalist accountants dabbling in property
   - Deep expertise in Section 24, MTD, incorporation

2. **Incorporation Specialists**
   - Feasibility analysis (is it worth it for YOUR portfolio?)
   - CGT/SDLT cost modeling
   - Phased incorporation planning
   - SPV structuring advice

3. **MTD Compliance Experts**
   - Mandatory from April 2026 for £50k+ income
   - Quarterly digital reporting
   - Software setup and training
   - Penalty avoidance

4. **Portfolio-Level Reporting**
   - Property-by-property profitability
   - Yield analysis (gross vs. net)
   - Cash flow forecasting
   - Refinancing decision support

---

## 4. BRAND IDENTITY

### Visual Identity

**Colors:**
- Primary: `#047857` (Emerald green - wealth, growth, property)
- Secondary: `#0f172a` (Slate - professional, stable)
- Accent: `#fbbf24` (Amber - premium, investment)

**Typography:**
- Same as Dentists (consistency across platform)
- Serif headings, sans-serif body

**Tone:**
- Authoritative but accessible
- Data-driven (numbers, examples, calculations)
- UK-specific (no US tax content)
- Practical (not theoretical)

### Brand Name

**"Property Accountants UK"**

**Legal Entity:** Property Accountants UK Ltd (or use same entity as Dentists if preferred)

**Domain:** propertyaccountants.co.uk

---

## 5. WEBSITE STRUCTURE

### Navigation

```json
"navigation": [
  { "label": "Services", "href": "/services" },
  { "label": "Incorporation", "href": "/incorporation" },  // NEW: Key differentiator
  { "label": "About", "href": "/about" },
  { "label": "Blog", "href": "/blog" },
  { "label": "Contact", "href": "/contact" }
]
```

### Page Hierarchy

```
Homepage
├── Services
│   ├── Self Assessment (landlords)
│   ├── Limited company accounts
│   ├── MTD compliance
│   ├── Management accounts
│   ├── Incorporation planning
│   └── Portfolio structuring
├── Incorporation (NEW - Key Landing Page)
│   ├── Should I incorporate?
│   ├── Cost calculator
│   ├── CGT/SDLT implications
│   └── Case studies
├── About
├── Blog
│   ├── Section 24 guides
│   ├── MTD compliance
│   ├── Incorporation case studies
│   ├── CGT planning
│   └── Portfolio management
├── Locations
│   ├── London
│   ├── Manchester
│   ├── Birmingham
│   └── Leeds
└── Contact
```

---

## 6. PROPERTY-SPECIFIC COMPONENTS

### NEW Components Needed

#### 1. Incorporation Calculator (Interactive)
**Purpose:** Help landlords determine if incorporation makes financial sense

**Inputs:**
- Number of properties
- Total rental income
- Total mortgage interest
- Current tax bracket
- Planned holding period

**Outputs:**
- Annual tax saving (company vs. personal)
- Upfront costs (CGT + SDLT)
- Break-even period
- 5-year projection

**Location:** `Property/web/src/components/calculators/IncorporationCalculator.tsx`

**Status:** NEW - Property-specific, NOT shared

---

#### 2. Portfolio Profitability Table
**Purpose:** Show property-by-property returns

**Features:**
- Sortable by yield, cash flow, equity
- Filter by location, property type
- Visual indicators (profitable vs. loss-making)

**Location:** `Property/web/src/components/portfolio/ProfitabilityTable.tsx`

**Status:** NEW - Property-specific, NOT shared

---

#### 3. MTD Compliance Checker
**Purpose:** Help landlords understand if they need MTD

**Inputs:**
- Rental income
- Self-employment income
- Current accounting year end

**Outputs:**
- MTD requirement (yes/no)
- Deadline for compliance
- Software recommendations
- Quarterly reporting dates

**Location:** `Property/web/src/components/compliance/MTDChecker.tsx`

**Status:** NEW - Property-specific, NOT shared

---

#### 4. Section 24 Impact Calculator
**Purpose:** Show how Section 24 affects their tax bill

**Inputs:**
- Rental income
- Mortgage interest
- Tax bracket

**Outputs:**
- Tax under old rules
- Tax under Section 24
- Annual cost increase
- Incorporation savings potential

**Location:** `Property/web/src/components/calculators/Section24Calculator.tsx`

**Status:** NEW - Property-specific, NOT shared

---

### SHARED Components (Reused from Dentists)

These work perfectly for Property with config changes:
- ✅ Header, Footer, Navigation
- ✅ LeadForm (with property-specific role options)
- ✅ BlogPostRenderer (with property-specific CTA)
- ✅ StickyCTA (with property-specific text)
- ✅ CTASection, Breadcrumb, UI components

---

## 7. CONTENT STRATEGY

### Initial Blog Topics (50 Topics to Seed)

#### Category 1: Section 24 & Tax Relief (12 topics)
1. Section 24 mortgage interest restriction explained for UK landlords
2. How Section 24 affects higher-rate taxpayer landlords in 2026
3. Section 24 tax calculator: work out your annual cost
4. Mortgage interest tax relief changes: what landlords need to know
5. Section 24 vs. incorporation: which saves more tax?
6. Section 24 impact on cash flow for buy-to-let investors
7. Can I claim mortgage interest as a limited company landlord?
8. Section 24 and basic rate taxpayers: are you affected?
9. How to reduce Section 24 tax impact without incorporating
10. Section 24 case study: £100k rental income portfolio
11. Section 24 and pension contributions: tax planning strategies
12. Future of Section 24: will it be reversed?

#### Category 2: Incorporation & Company Structures (15 topics)
1. Should I incorporate my buy-to-let portfolio in 2026?
2. Incorporation cost calculator: CGT and SDLT implications
3. How to transfer property into a limited company UK
4. SPV property company structure: one company or multiple?
5. Incorporation timing: when is the right time to incorporate?
6. CGT on property transfer to limited company: how to calculate
7. SDLT on incorporation: do I pay stamp duty twice?
8. Incorporation case study: 5-property portfolio analysis
9. Limited company vs. personal ownership: tax comparison 2026
10. How to incorporate rental property without triggering CGT
11. Incorporation holdover relief: does it apply to property?
12. Property company profit extraction: salary vs. dividends
13. Should I incorporate before or after buying my next property?
14. Incorporation for existing portfolios: phased approach
15. Property company director loans: tax implications

#### Category 3: Making Tax Digital (MTD) (10 topics)
1. Making Tax Digital for landlords: April 2026 deadline explained
2. Do I need MTD for my rental income? Threshold and exemptions
3. MTD quarterly reporting: what landlords must submit
4. Best MTD software for landlords in 2026
5. MTD penalties for landlords: what happens if I miss a deadline?
6. MTD and property income: how to prepare your records
7. MTD for landlords with multiple properties: reporting requirements
8. MTD exemptions: when you don't need to comply
9. MTD and accountant support: should I hire a specialist?
10. MTD first quarter submission: step-by-step guide for landlords

#### Category 4: Capital Gains Tax (8 topics)
1. Capital gains tax on property sale UK 2026: rates and allowances
2. CGT annual exempt amount: £3,000 in 2026/27
3. How to reduce CGT on property disposal UK
4. CGT on buy-to-let sale: calculation example
5. Principal Private Residence relief for landlords
6. CGT payment deadlines for property sales 2026
7. CGT and property portfolio: tax planning strategies
8. CGT on property transfer to spouse: is it exempt?

#### Category 5: Portfolio Management & Accounting (5 topics)
1. Property portfolio accounting: tracking profitability by property
2. Rental yield calculation: gross vs. net yield explained
3. Cash flow management for multi-property landlords
4. Property management accounts: what to track monthly
5. Buy-to-let refinancing: when does it make financial sense?

**Total Initial Topics:** 50

---

## 8. SEO STRATEGY

### Primary Keywords (High Intent)

**Tier 1 (Incorporation Focus):**
- "should I incorporate my buy to let" (High volume, high intent)
- "property limited company accountant" (Medium volume, high intent)
- "section 24 tax relief" (High volume, medium intent)
- "landlord accountant UK" (High volume, medium intent)
- "buy to let accountant" (Medium volume, high intent)

**Tier 2 (Compliance Focus):**
- "making tax digital landlords" (High volume, April 2026 spike expected)
- "landlord self assessment accountant" (Medium volume, high intent)
- "rental property tax return UK" (Medium volume, medium intent)
- "property portfolio accountant" (Low volume, very high intent)

**Tier 3 (Long-tail):**
- "CGT on property transfer to limited company"
- "SPV property company structure"
- "section 24 mortgage interest restriction calculator"
- "landlord incorporation cost calculator"

### Content Pillars

**Pillar 1: Incorporation Decision-Making**
- Hub page: `/incorporation`
- Supporting content: 15 blog posts
- Interactive tools: Incorporation calculator, cost estimator
- Target: "should I incorporate" searches

**Pillar 2: Section 24 Education**
- Hub page: `/services` (tax planning section)
- Supporting content: 12 blog posts
- Interactive tools: Section 24 calculator
- Target: "section 24" searches

**Pillar 3: MTD Compliance**
- Hub page: `/services` (MTD section)
- Supporting content: 10 blog posts
- Interactive tools: MTD checker
- Target: "making tax digital landlords" searches

**Pillar 4: Portfolio Management**
- Hub page: `/services` (management accounts)
- Supporting content: 5 blog posts
- Interactive tools: Yield calculator
- Target: "property portfolio accountant" searches

### Local SEO Strategy

**Target Cities:**
- London (primary - highest property values)
- Manchester (secondary - strong rental market)
- Birmingham (tertiary - growing BTL market)
- Leeds (tertiary - strong student/professional rental)
- Bristol (tertiary - high property prices)

**Location Pages:**
```json
"locations": [
  { "slug": "london", "title": "Property accountants in London" },
  { "slug": "manchester", "title": "Property accountants in Manchester" },
  { "slug": "birmingham", "title": "Property accountants in Birmingham" },
  { "slug": "leeds", "title": "Property accountants in Leeds" },
  { "slug": "bristol", "title": "Property accountants in Bristol" }
]
```

---

## 9. HOMEPAGE CONTENT STRATEGY

### Hero Section

**Headline:**
"Specialist property accountants for UK landlords and investors."

**Subheadline:**
"Section 24, MTD compliance, and incorporation planning for buy-to-let portfolios. We only work with property investors, so we understand the tax rules that generalist accountants miss."

**CTA:**
- Primary: "Speak to a property accountant"
- Secondary: "Calculate incorporation savings →"

**Trust Signals:**
- "Trusted by 100+ landlords across London, Manchester, and the UK"
- "Specialist property tax advice since 2020"
- "Fixed fees, no surprises"

---

### Section 1: The Reality (Pain Points)

**Headline:** "Most landlords are financially underserved."

**Subheadline:** "Between Section 24, MTD, and the incorporation question, the tax landscape for UK landlords has fundamentally changed. A generalist accountant will file your return — but that's not the same as helping you navigate these structural shifts."

**Pain Points (4 cards):**

1. **Section 24 is costing you thousands**
   - Higher-rate taxpayers lose 40% of mortgage interest deduction
   - Only 20% tax credit instead of full relief
   - Example: £18k income, £9k interest = £1,800 extra tax/year
   - Most accountants just file the return, don't model alternatives

2. **MTD is mandatory from April 2026**
   - Quarterly digital reporting for £50k+ income
   - Software requirements, new deadlines
   - Penalties for non-compliance (up to £400/quarter)
   - Many landlords don't know if they're affected

3. **Incorporation isn't always the answer**
   - Upfront CGT and SDLT costs can be £50k+
   - Break-even period varies (2-10 years)
   - Depends on mortgage levels, tax bracket, exit plans
   - Needs proper modeling, not generic advice

4. **No portfolio-level visibility**
   - Which properties are profitable vs. loss-making?
   - What's your actual yield after all costs?
   - When should you refinance or sell?
   - Year-end accounts don't answer these questions

---

### Section 2: Who We Work With

**Headline:** "We work with landlords at every scale."

**Segments (3 cards):**

1. **Individual Landlords**
   - Subtitle: "1-3 properties · Self Assessment · MTD"
   - Body: "If you own a small portfolio, you're dealing with Section 24, MTD compliance, and the incorporation question. We handle your Self Assessment, model whether incorporation makes sense for YOUR situation, and make sure you're MTD-ready before the April 2026 deadline."

2. **Portfolio Owners**
   - Subtitle: "4-10 properties · Limited companies · Growth"
   - Body: "Running a portfolio brings complexity — multiple mortgages, refinancing decisions, cash flow management, and the question of how to structure new acquisitions. We prepare management accounts that show property-level profitability, advise on incorporation timing, and support with acquisition due diligence."

3. **Large Portfolios & Developers**
   - Subtitle: "10+ properties · Group structures · Development"
   - Body: "Professional landlords and developers need group accounting, acquisition support, disposal planning, and VAT advice on property development. We work with clients managing significant portfolios — whether that's 10 properties or 100 — and can support with restructuring, financing, and ongoing financial management."

---

### Section 3: How We Work (Services)

**Headline:** "What we actually do, and how we do it."

**Services (6 items):**

1. **Self Assessment and rental income**
   - For individual landlords. We prepare your tax return with rental schedules, claim all legitimate expenses, and make sure Section 24 is applied correctly. No surprises, no HMRC penalties.

2. **Making Tax Digital (MTD) compliance**
   - Mandatory from April 2026 for landlords with £50k+ income. We handle quarterly submissions, software setup, and make sure you're compliant before the deadline.

3. **Incorporation feasibility analysis**
   - Not every landlord should incorporate. We model YOUR specific situation — rental income, mortgage interest, tax bracket, exit plans — and show you the numbers. Upfront costs vs. long-term savings, with a clear recommendation.

4. **Limited company accounts and corporation tax**
   - For landlords who've already incorporated. We prepare annual accounts, file corporation tax returns, and advise on profit extraction (salary vs. dividends) and director loans.

5. **Management accounts and portfolio reporting**
   - For portfolio owners who want to make informed decisions throughout the year. We produce quarterly reports showing property-level profitability, yield analysis, and cash flow forecasting.

6. **Acquisition and disposal planning**
   - Buying or selling investment property has significant tax implications. We support with due diligence, CGT planning, SDLT optimization, and structuring advice (personal vs. company purchase).

---

### Section 4: Why Specialist Matters

**Headline:** "The difference a property specialist makes is not theoretical."

**Body:**
"A generalist accountant isn't cutting corners. They simply don't see enough landlord clients to build genuine expertise in Section 24, MTD, and incorporation planning. They won't know, off the top of their head, whether your portfolio size justifies the upfront CGT cost of incorporation, or how MTD quarterly reporting interacts with your accounting year end.

We do, because it comes up constantly. That breadth of exposure — across hundreds of landlord clients — means we can spot opportunities before you miss them, and give advice grounded in what actually works for property investors, not just what the textbook says.

It also means the conversation is more efficient. You don't have to explain what Section 24 is, or why your mortgage interest isn't fully deductible anymore. We already know, so we can focus on solving your specific problem."

**Comparison Table:**

| Area | Property Accountants UK |
|------|-------------------------|
| Section 24 impact | Modeled for your portfolio |
| Incorporation decision | Feasibility analysis with CGT/SDLT costs |
| MTD compliance | Quarterly reporting from April 2026 |
| Portfolio reporting | Property-level profitability |
| Acquisition support | Due diligence and structuring |
| CGT planning | Disposal and exit strategies |

---

### Section 5: Practical Guidance (Featured Blog Posts)

**Headline:** "Property tax insights from specialists."

**Subheadline:** "Real-world guidance on Section 24, incorporation, and MTD — written by accountants who work exclusively with UK landlords. Each article addresses questions we're actually asked by property investors every week."

**Featured Posts (3):**
1. "Should I incorporate my buy-to-let portfolio in 2026?"
2. "Section 24 mortgage interest restriction: complete UK guide"
3. "Making Tax Digital for landlords: April 2026 deadline"

---

### Section 6: Get Started (Lead Capture)

**Headline:** "Ready to work with a property accountant who understands your portfolio?"

**Body:**
"Whether you're an individual landlord trying to navigate Section 24, or a portfolio owner considering incorporation, the first conversation is straightforward and without obligation. Book your free consultation today."

**Form with Property-Specific Options:**
- "Individual landlord (1-3 properties)"
- "Portfolio owner (4-10 properties)"
- "Large portfolio (10+ properties)"
- "Property developer"
- "Other"

---

## 10. CONFIGURATION FILE

### Complete Property niche.config.json

```json
{
  "niche_id": "property",
  "display_name": "Property Accountants UK",
  "legal_name": "Property Accountants UK Ltd",
  "domain": "propertyaccountants.co.uk",
  "tagline": "Accounting for UK landlords — nothing else",
  "description": "Property accountants for individual landlords, portfolio owners, and developers. Section 24, MTD compliance, incorporation planning, and portfolio management — we only work with property investors.",
  
  "brand": {
    "primary_color": "#047857",
    "logo_path": "/brand/logo.png",
    "publisher_logo_url": "/og-placeholder.svg"
  },
  
  "contact": {
    "email": "hello@propertyaccountants.co.uk",
    "phone": "+44 20 1111 1111"
  },
  
  "navigation": [
    { "label": "Services", "href": "/services" },
    { "label": "Incorporation", "href": "/incorporation" },
    { "label": "About", "href": "/about" },
    { "label": "Blog", "href": "/blog" },
    { "label": "Contact", "href": "/contact" }
  ],
  
  "footer_links": [
    { "label": "Locations", "href": "/locations" },
    { "label": "Privacy policy", "href": "/privacy-policy" },
    { "label": "Terms", "href": "/terms" },
    { "label": "Cookie policy", "href": "/cookie-policy" }
  ],
  
  "locations": [
    { "slug": "london", "title": "Property accountants in London" },
    { "slug": "manchester", "title": "Property accountants in Manchester" },
    { "slug": "birmingham", "title": "Property accountants in Birmingham" },
    { "slug": "leeds", "title": "Property accountants in Leeds" },
    { "slug": "bristol", "title": "Property accountants in Bristol" }
  ],
  
  "content_strategy": {
    "audience": "UK landlords, buy-to-let investors, and property developers",
    "categories": [
      "Section 24 & Tax Relief",
      "Incorporation & Company Structures",
      "Making Tax Digital (MTD)",
      "Capital Gains Tax",
      "Portfolio Management"
    ],
    "supabase_table": "blog_topics_property",
    "source_identifier": "property"
  },
  
  "seo": {
    "locale": "en-GB",
    "organization_type": "ProfessionalService",
    "service_areas": ["London", "Manchester", "Birmingham", "Leeds", "Bristol"],
    "google_analytics_id": "G-XXXXXXXXX",
    "google_site_verification": "YYYYYYYYYYYYYYYY",
    "theme_color": "#047857"
  },
  
  "lead_form": {
    "role_label": "I am a…",
    "role_options": [
      { "value": "Individual landlord", "label": "Individual landlord (1-3 properties)" },
      { "value": "Portfolio owner", "label": "Portfolio owner (4-10 properties)" },
      { "value": "Large portfolio", "label": "Large portfolio (10+ properties)" },
      { "value": "Property developer", "label": "Property developer" },
      { "value": "Other", "label": "Other" }
    ],
    "placeholders": {
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "07700 000000",
      "message": "e.g. I need help with Section 24 tax planning, or I'm considering incorporating my portfolio…"
    }
  },
  
  "cta": {
    "sticky_primary": "Ready to work with a specialist property accountant?",
    "sticky_secondary": "Book your free consultation today",
    "sticky_button": "Get started"
  },
  
  "blog": {
    "cta_heading": "Get specialist advice for your portfolio",
    "cta_body": "Every property portfolio is different. If you would like to discuss how this applies to your specific circumstances, fill in the form below and we will arrange a short introductory call.",
    "cta_button": "Request a callback"
  },
  
  "shared_components_version": "1.0.0",
  "last_sync": null
}
```

---

## 11. PYTHON CONFIGURATION

### Property/config_supabase.py

```python
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

# Property-specific configuration
SITE_URL = "https://propertyaccountants.co.uk"
SITE_NAME = "Property Accountants UK"
AUTHOR = "Property Accountants UK"

# Content configuration
CATEGORIES = [
    "Section 24 & Tax Relief",
    "Incorporation & Company Structures",
    "Making Tax Digital (MTD)",
    "Capital Gains Tax",
    "Portfolio Management"
]

# Supabase tables (property-specific)
BLOG_TOPICS_TABLE = "blog_topics_property"
PUBLISHED_CONTENT_TABLE = "published_content"  # Shared, filtered by niche
LEADS_TABLE = "leads"  # Shared, filtered by source

# Source identifier for lead tracking
SOURCE_IDENTIFIER = "property"

# Output paths (relative to Property folder)
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "web", "content", "blog")

# Content generation prompts (property-specific)
SYSTEM_PROMPT = """You are a specialist UK property accountant writing for landlords and buy-to-let investors.

Your expertise:
- Section 24 mortgage interest restriction and its impact
- Incorporation planning (limited company vs. personal ownership)
- Making Tax Digital (MTD) compliance for landlords
- Capital gains tax on property disposal
- Portfolio-level accounting and profitability analysis
- SPV structures and group property companies

Write for:
- Individual landlords (1-3 properties)
- Portfolio owners (4-10 properties)
- Large portfolios and developers (10+ properties)

UK context only. No US tax advice. Practical, data-driven, with examples."""

CONTENT_GUIDELINES = """
- Use UK terminology (buy-to-let, BTL, landlord, not "rental property owner")
- Reference current tax years (2025/26, 2026/27)
- Include specific examples with numbers (£18k income, £9k interest, etc.)
- Address Section 24 impact where relevant
- Mention MTD if income thresholds apply
- Discuss incorporation trade-offs (not always the answer)
- Use London/Manchester/Birmingham examples for local relevance
- Link to HMRC guidance where appropriate
- Include property-specific FAQs
"""
```

---

## 12. SUPABASE SETUP

### New Table: blog_topics_property

```sql
CREATE TABLE IF NOT EXISTS blog_topics_property (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  search_volume TEXT,
  competition TEXT,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP
);

CREATE INDEX idx_blog_topics_property_unused 
ON blog_topics_property(used, priority, category) 
WHERE used = FALSE;
```

### Seed Initial Topics

```sql
INSERT INTO blog_topics_property (topic, category, priority) VALUES
('Section 24 mortgage interest restriction explained for UK landlords', 'Section 24 & Tax Relief', 'high'),
('Should I incorporate my buy-to-let portfolio in 2026?', 'Incorporation & Company Structures', 'high'),
('Making Tax Digital for landlords: April 2026 deadline explained', 'Making Tax Digital (MTD)', 'high'),
-- ... (47 more topics)
```

---

## 13. AGENT CONFIGURATION

### Update agents/config/agent_config.py

```python
NICHE_CONFIG = {
    "Dentists": {
        "blog_topics_table": "blog_topics",
        "source_identifier": "dentists",
        "daily_post_limit": 1,
        "categories": ["Practice accounting", "Associate tax", ...],
    },
    "Property": {  # NEW
        "blog_topics_table": "blog_topics_property",
        "source_identifier": "property",
        "daily_post_limit": 1,
        "categories": [
            "Section 24 & Tax Relief",
            "Incorporation & Company Structures",
            "Making Tax Digital (MTD)",
            "Capital Gains Tax",
            "Portfolio Management"
        ],
    }
}
```

---

## 14. GITHUB ACTIONS UPDATE

### Matrix Already Includes Property

```yaml
strategy:
  matrix:
    niche: [Dentists, Property]  # Already configured
```

**No changes needed** - Property will automatically be included in daily pipeline once activated.

---

## 15. VERCEL SETUP

### New Vercel Project Configuration

**Project Name:** property-accountants-uk

**Settings:**
- **Framework Preset:** Next.js
- **Root Directory:** `Property/web`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
NEXT_PUBLIC_SITE_URL=https://propertyaccountants.co.uk
```

**Ignored Build Step:**
```bash
git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/
```

**Custom Domain:**
- propertyaccountants.co.uk
- www.propertyaccountants.co.uk

---

## 16. GOOGLE ANALYTICS SETUP

### Create New GA4 Property

**Property Name:** Property Accountants UK  
**Property ID:** (Will be assigned, e.g., `G-XXXXXXXXX`)  
**Time Zone:** United Kingdom  
**Currency:** GBP

**Key Events to Track:**
- `generate_lead` (form submissions)
- `page_view` (automatic)
- `incorporation_calculator_use` (custom event)
- `section24_calculator_use` (custom event)
- `mtd_checker_use` (custom event)

**Custom Dimensions:**
- `user_role` (Individual landlord, Portfolio owner, etc.)
- `lead_source` (property)
- `portfolio_size` (1-3, 4-10, 10+)

---

## 17. GOOGLE SEARCH CONSOLE SETUP

### Add New Property

**Domain:** propertyaccountants.co.uk  
**Verification Method:** HTML meta tag  
**Verification Code:** (Will be provided, add to `niche.config.json`)

**Sitemaps to Submit:**
- https://propertyaccountants.co.uk/sitemap.xml

**Target Countries:** United Kingdom

---

## 18. IMPLEMENTATION CHECKLIST

### Phase 1: Structure Setup (30 minutes)
- [ ] Copy `Dentists/niche.config.json` to `Property/niche.config.json`
- [ ] Customize Property config (all fields from plan above)
- [ ] Copy `Dentists/web/` to `Property/web/`
- [ ] Copy `Dentists/config_supabase.py` to `Property/config_supabase.py`
- [ ] Copy `Dentists/generate_blog_supabase.py` to `Property/generate_blog_supabase.py`
- [ ] Update Property Python configs

### Phase 2: Supabase Setup (15 minutes)
- [ ] Create `blog_topics_property` table
- [ ] Seed 50 initial topics
- [ ] Update `agents/config/agent_config.py` with Property config
- [ ] Test: Query topics table

### Phase 3: Component Sync (5 minutes)
- [ ] Run `python scripts/sync_shared_components.py --niche Property`
- [ ] Verify: 12 files synced
- [ ] Check: `last_sync` timestamp updated

### Phase 4: Content Creation (2 hours)
- [ ] Write Property homepage (`Property/web/src/app/page.tsx`)
- [ ] Write Services page (`Property/web/src/app/services/page.tsx`)
- [ ] Write About page (`Property/web/src/app/about/page.tsx`)
- [ ] Write Incorporation page (`Property/web/src/app/incorporation/page.tsx`) - NEW
- [ ] Update Contact page metadata
- [ ] Create location pages (5 cities)

### Phase 5: Property-Specific Components (3 hours)
- [ ] Build IncorporationCalculator.tsx
- [ ] Build Section24Calculator.tsx
- [ ] Build MTDChecker.tsx
- [ ] Build PortfolioProfitabilityTable.tsx (optional, can be later)

### Phase 6: Testing (1 hour)
- [ ] Build test: `cd Property/web && npm run build`
- [ ] Dev server test: `cd Property/web && npm run dev -p 3002`
- [ ] Visual inspection: Check all pages
- [ ] Form test: Submit test lead
- [ ] Verify: `source = 'property'` in Supabase
- [ ] Verify: No dental content visible

### Phase 7: Google Services Setup (30 minutes)
- [ ] Create GA4 property
- [ ] Add GA4 ID to `Property/niche.config.json`
- [ ] Create Search Console property
- [ ] Add verification code to config
- [ ] Submit sitemap

### Phase 8: Vercel Deployment (30 minutes)
- [ ] Create new Vercel project
- [ ] Configure root directory: `Property/web`
- [ ] Set environment variables
- [ ] Configure ignored build step
- [ ] Connect custom domain
- [ ] Trigger first deployment
- [ ] Verify: Live site works

### Phase 9: Agent Activation (15 minutes)
- [ ] Update `agents/config/agent_config.py`
- [ ] Test: `python agents/content_research_agent.py --niche Property`
- [ ] Test: `python agents/blog_generation_agent.py --niche Property --max-posts 1`
- [ ] Verify: Content generated and stored
- [ ] Verify: Deployment works

### Phase 10: Cross-Contamination Verification (30 minutes)
- [ ] Run both dev servers (Dentists:3001, Property:3002)
- [ ] Compare side-by-side
- [ ] Verify: Completely different branding
- [ ] Submit leads from both
- [ ] Verify: Proper source tracking
- [ ] Check GA: Separate tracking

**Total Estimated Time:** 8-9 hours

---

## 19. CONTENT PRIORITIES

### Week 1 (Launch Week)
**Goal:** Establish authority on core topics

**Publish:**
1. "Should I incorporate my buy-to-let portfolio in 2026?" (Pillar content)
2. "Section 24 mortgage interest restriction: complete UK guide" (Pillar content)
3. "Making Tax Digital for landlords: April 2026 deadline" (Timely, urgent)

### Week 2-4 (Build Authority)
**Goal:** Cover all major pain points

**Publish (1/day):**
- Week 2: Section 24 deep dives (calculator, case studies, impact analysis)
- Week 3: Incorporation guides (cost calculator, CGT implications, timing)
- Week 4: MTD compliance (software, reporting, penalties)

### Month 2-3 (Long-tail & Local)
**Goal:** Capture long-tail searches and local traffic

**Publish (1/day):**
- CGT planning guides
- Portfolio management content
- Location-specific pages (London, Manchester, etc.)
- Case studies and examples

---

## 20. DIFFERENTIATION FROM DENTISTS

### What's DIFFERENT (Property-Specific)

**Content Focus:**
- Section 24, MTD, incorporation (vs. NHS, associate tax, VAT)
- Property portfolio management (vs. practice management)
- CGT on disposal (vs. practice acquisition)
- Landlord-specific tax rules (vs. dental-specific)

**Target Audience:**
- Landlords and property investors (vs. dentists and practice owners)
- Portfolio scale matters (1-3, 4-10, 10+ properties)
- Mix of personal and company ownership

**Key Services:**
- Incorporation feasibility analysis (unique to property)
- MTD compliance (affects landlords, not dentists)
- Portfolio-level reporting (property-by-property)
- Section 24 tax planning (property-specific)

**Interactive Tools:**
- Incorporation calculator (property-specific)
- Section 24 calculator (property-specific)
- MTD checker (property-specific)

### What's SHARED (Same Architecture)

**Technical:**
- Same Next.js framework
- Same component library (Header, Footer, Forms, etc.)
- Same Supabase backend
- Same AI agent system
- Same deployment pipeline

**Business Model:**
- Same lead capture approach
- Same content generation strategy
- Same SEO methodology
- Same local targeting approach

**Brand Approach:**
- Specialist positioning (only work with X)
- Evidence-based content
- Fixed fees, transparent pricing
- UK-specific advice

---

## 21. RISK ASSESSMENT

### Technical Risks 🟢 LOW

- ✅ Architecture proven with Dentists
- ✅ All components tested and verified
- ✅ Sync script works correctly
- ✅ Build process validated

**Mitigation:** Already implemented and tested.

### Content Risks 🟡 MEDIUM

- ⚠️ Property market more competitive than dental
- ⚠️ Incorporation topic heavily covered by competitors
- ⚠️ MTD deadline creates time pressure (April 2026)

**Mitigation:**
- Focus on practical, calculator-driven content
- Emphasize "not always the answer" positioning
- Target long-tail keywords (specific scenarios)
- Leverage MTD deadline urgency

### Market Risks 🟡 MEDIUM

- ⚠️ Property market sentiment affected by interest rates
- ⚠️ Landlord exodus narrative (some exiting market)
- ⚠️ Regulatory uncertainty (potential new taxes)

**Mitigation:**
- Position for serious, long-term investors (not casual landlords)
- Focus on optimization (not just compliance)
- Emphasize portfolio management (not just tax filing)

### SEO Risks 🟢 LOW

- ✅ Clear keyword opportunities (incorporation, Section 24, MTD)
- ✅ Timely content (MTD deadline April 2026)
- ✅ Local SEO strategy (5 cities)

**Mitigation:** Strong content strategy, proven SEO approach from Dentists.

---

## 22. SUCCESS METRICS

### Month 1 (Launch)
- 3 blog posts published
- 50 topics in database
- Site live on Vercel
- GA4 tracking active
- 0 technical errors

### Month 2-3 (Growth)
- 30+ blog posts published (1/day)
- 10+ organic search impressions/day
- 1-2 leads/week
- Search Console indexing 50+ pages

### Month 6 (Maturity)
- 90+ blog posts published
- 100+ organic visits/day
- 5-10 leads/week
- Ranking for "landlord accountant UK" (top 20)
- Ranking for "should I incorporate buy to let" (top 10)

---

## 23. BUDGET ALLOCATION

### Content Generation
- Daily limit: 1 post/niche = 2 posts/day total (Dentists + Property)
- Monthly: ~30 Property posts
- Cost: ~$3/post = ~$90/month for Property content

### Total System Cost
- Dentists: $90/month
- Property: $90/month
- Research agent: $20/month
- **Total: $200/month** (within budget)

---

## 24. LAUNCH SEQUENCE

### Pre-Launch (Week 0)
- [ ] Complete all setup (structure, config, Supabase)
- [ ] Build and test locally
- [ ] Create Google services (GA4, Search Console)
- [ ] Set up Vercel project
- [ ] Generate first 3 blog posts manually

### Launch Day (Day 1)
- [ ] Deploy to Vercel
- [ ] Verify live site works
- [ ] Submit sitemap to Search Console
- [ ] Test form submission
- [ ] Announce internally

### Post-Launch (Week 1-4)
- [ ] Activate daily agent pipeline
- [ ] Monitor for errors
- [ ] Track initial traffic
- [ ] Collect first leads
- [ ] Iterate based on feedback

---

## 25. OPEN QUESTIONS FOR USER

### Domain & Branding
1. **Domain:** Do you already own `propertyaccountants.co.uk`? (Need to purchase if not)
2. **Legal Entity:** Use same company as Dentists or create new entity?
3. **Phone Number:** Use same number or get dedicated property line?
4. **Email:** Use `hello@propertyaccountants.co.uk` or different format?

### Google Services
5. **GA4:** Should I create new property or will you do it? (Need property ID)
6. **Search Console:** Should I set up or will you? (Need verification code)

### Content Strategy
7. **Tone:** More formal (professional investors) or accessible (individual landlords)?
8. **Calculators:** Build all 4 calculators at launch or phase in later?
9. **Initial Topics:** Start with 50 topics or more/less?

### Business Strategy
10. **Pricing:** Same as Dentists or different for property clients?
11. **Service Scope:** All services at launch or start with core (Self Assessment, incorporation)?
12. **Geographic Focus:** All 5 cities or start with London/Manchester?

---

## 26. RECOMMENDED APPROACH

### Option A: Full Launch (Recommended)
**Timeline:** 8-9 hours implementation  
**Scope:** Complete site, 50 topics, all services, 5 locations  
**Pros:** Strong market entry, comprehensive offering, immediate authority  
**Cons:** More upfront work

### Option B: MVP Launch
**Timeline:** 4-5 hours implementation  
**Scope:** Basic site, 20 topics, core services only, 2 locations  
**Pros:** Faster to market, test demand first  
**Cons:** Less comprehensive, may miss opportunities

**My Recommendation:** **Option A (Full Launch)**

**Reasoning:**
- Architecture is proven and tested
- Most work is configuration (not building from scratch)
- Property market timing is good (MTD deadline April 2026)
- Strong content strategy already planned
- Can leverage Dentists learnings

---

## 27. NEXT STEPS

### If You Approve This Plan

1. **Answer open questions** (domain, GA4, etc.)
2. **I'll implement** the full Property niche setup
3. **We'll test** side-by-side with Dentists
4. **We'll deploy** to Vercel
5. **We'll activate** the agent pipeline

### Estimated Timeline

- **Planning:** ✅ COMPLETE (this document)
- **Implementation:** 8-9 hours
- **Testing:** 1-2 hours
- **Deployment:** 1 hour
- **Total:** 10-12 hours to fully live Property niche

---

**Plan Status:** COMPLETE & READY FOR APPROVAL  
**Next Action:** Await user approval and answers to open questions
