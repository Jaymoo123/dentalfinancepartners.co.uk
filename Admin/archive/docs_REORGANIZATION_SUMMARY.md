# Multi-Niche Reorganization Summary ✅

**Date:** March 28, 2026

---

## ✅ What's Done

### 1. Folder Structure Created
```
\Accounting\
├── shared_supabase_config.py      # Shared Supabase credentials
├── .env.local                     # Shared API keys
│
├── Dentists\                      # Complete dentist niche
│   ├── web\                       # Dentist website
│   └── [blog scripts]
│
└── Property\                      # Complete property niche
    ├── web\                       # Property website (copy)
    └── [blog scripts]
```

### 2. Shared Configuration
- **`shared_supabase_config.py`** — Contains Supabase URL, API key, and table names
- Both niches import this file instead of duplicating credentials
- Includes constants for source identifiers: `SOURCE_DENTISTS = "dentists"`, `SOURCE_PROPERTY = "property"`

### 3. Each Niche Has:
- ✅ Complete Next.js website (`web/` subfolder)
- ✅ Blog generation scripts (`generate_blog_supabase.py`)
- ✅ Niche-specific config (`config_supabase.py`)
- ✅ Bulk topic insertion tools (`add_blog_topics.py`)
- ✅ Documentation (`README_SUPABASE.md`)

### 4. Property Niche Configured
- Updated categories: Landlord tax, Property finance, Buy-to-let accounting, Capital gains tax, Property compliance
- Updated blog system prompt for UK landlords/property investors
- Blog generator points to `blog_topics_property` table
- Website ready to be customized with property branding

---

## 🗄️ Unified Leads Strategy

### Single Leads Table
All contact forms from all niches submit to **one table**: `leads`

**Schema includes:**
- `source` — Identifies which niche site (e.g., "dentists", "property")
- `name`, `email`, `phone`, `message` — Lead details
- `page_url` — Where they submitted from
- `status` — Lead status tracking
- `created_at` — Timestamp

### Benefits:
- ✅ All leads in one dashboard
- ✅ Easy filtering by source
- ✅ Cross-niche analytics
- ✅ Simplified CRM integration
- ✅ One backup/maintenance point

---

## 🎯 How Each Niche Works

### Blog Generation (Same Process for All Niches)

**For Dentists:**
```bash
cd "c:\Users\user\Documents\Accounting\Dentists"
$env:ANTHROPIC_API_KEY="your-key"
python generate_blog_supabase.py
```
- Reads from `blog_topics` table
- Generates content with dentist-specific prompt
- Saves to `Dentists/web/content/blog/`

**For Property:**
```bash
cd "c:\Users\user\Documents\Accounting\Property"
$env:ANTHROPIC_API_KEY="your-key"
python generate_blog_supabase.py
```
- Reads from `blog_topics_property` table
- Generates content with property-specific prompt
- Saves to `Property/web/content/blog/`

### Website Deployment (Independent)

Each niche has its own website and deployment:

**Dentists:**
```bash
cd "c:\Users\user\Documents\Accounting\Dentists\web"
npm run dev              # Local: http://localhost:3000
vercel --prod            # Deploy: https://dentalfinancepartners.co.uk
```

**Property:**
```bash
cd "c:\Users\user\Documents\Accounting\Property\web"
npm run dev              # Local: http://localhost:3001 (different port)
vercel --prod            # Deploy: https://propertyaccountants.co.uk
```

---

## 📋 Immediate Next Steps

### 1. Clean Up Root Web Folder (Optional)
The original `web/` folder at root can be deleted once you stop any running dev servers:
```bash
# Stop any dev servers first, then:
Remove-Item -Path "web" -Recurse -Force
```

### 2. Create Property Blog Topics Table
Run in Supabase SQL Editor:
```sql
CREATE TABLE blog_topics_property (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic TEXT NOT NULL,
  secondary_keyword_1 TEXT,
  secondary_keyword_2 TEXT,
  secondary_keyword_3 TEXT,
  secondary_keyword_4 TEXT,
  secondary_keyword_5 TEXT,
  secondary_keyword_6 TEXT,
  secondary_keyword_7 TEXT,
  secondary_keyword_8 TEXT,
  secondary_keyword_9 TEXT,
  secondary_keyword_10 TEXT,
  category TEXT,
  priority INTEGER DEFAULT 0,
  used BOOLEAN DEFAULT FALSE,
  generated_slug TEXT,
  generated_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Create Unified Leads Table
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  page_url TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

### 4. Update Contact Forms
Update the contact form in each website to use the correct `source` value:

**In `Dentists/web/src/app/api/contact/route.ts`:**
```typescript
source: 'dentists'
```

**In `Property/web/src/app/api/contact/route.ts`:**
```typescript
source: 'property'
```

### 5. Customize Property Website
Update `Property/web/` with property-specific branding:
- Site name, colors, logo
- Homepage content (target landlords instead of dentists)
- Services page (property accounting services)
- About page (property accounting expertise)
- Update `package.json` name field

---

## 🚀 Adding Future Niches

To add a new niche (e.g., Restaurants):

```bash
# 1. Copy the Dentists folder
Copy-Item -Path "Dentists" -Destination "Restaurants" -Recurse

# 2. Update config
# Edit Restaurants/config_supabase.py:
#   - SITE_BASE_URL = "https://restaurantaccountants.co.uk"
#   - AUTHOR_NAME = "Restaurant Finance Partners"
#   - POST_CATEGORIES = [restaurant-specific categories]
#   - BLOG_SYSTEM_PROMPT = [restaurant-specific prompt]

# 3. Update blog generator
# Edit Restaurants/generate_blog_supabase.py:
#   - Change table to "blog_topics_restaurants"

# 4. Create Supabase table
# CREATE TABLE blog_topics_restaurants (same schema)

# 5. Add source constant
# Edit shared_supabase_config.py:
#   - SOURCE_RESTAURANTS = "restaurants"

# 6. Customize website
# Update Restaurants/web/ with restaurant branding

# 7. Update contact form
# Set source: 'restaurants' in form submission
```

---

## ✅ Current Status

- ✅ Dentists niche: Fully set up with website and blog generation
- ✅ Property niche: Scripts ready, website copied, needs branding updates
- ✅ Shared infrastructure: Supabase config extracted and ready
- ✅ Unified leads: Architecture designed, needs table creation
- ✅ Scalable structure: Easy to add more niches

---

## 🎉 Result

You now have a **scalable multi-niche lead generation platform** where:
1. Each niche is **self-contained** (website + scripts in one folder)
2. All niches **share infrastructure** (Supabase, API keys, blog generator logic)
3. All leads **funnel to one table** with source tracking
4. Adding new niches is **fast and repeatable** (copy folder, update config, deploy)

This structure lets you test multiple professional verticals without rebuilding from scratch each time!
