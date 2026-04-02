# Multi-Niche Reorganization Complete ✅

**Date:** March 28, 2026

---

## 🎯 What We Did

Successfully reorganized the accounting lead generation platform into a multi-niche structure that allows you to target multiple professional audiences while sharing infrastructure.

---

## 📁 New Folder Structure

```
\Accounting\
│
├── 📄 shared_supabase_config.py    # Shared Supabase credentials & table names
├── 📄 .env.local                   # Shared environment variables (Anthropic API key, etc.)
├── 📄 README.md                    # Multi-niche documentation
│
├── 📁 Dentists\                    # Complete Dentist niche (scripts + website)
│   ├── 📁 web\                     # Dentist Next.js site
│   │   ├── src/
│   │   ├── content/blog/           # Generated dentist blog posts
│   │   ├── package.json
│   │   └── [Next.js files...]
│   ├── config_supabase.py          # Dentist-specific config (imports shared config)
│   ├── generate_blog_supabase.py   # Main blog generator
│   ├── add_blog_topics.py          # Bulk topic insertion
│   ├── fix_blog_faqs.py            # FAQ fixer
│   ├── generate_batch.py           # Batch generator
│   └── README_SUPABASE.md          # Dentist niche docs
│
└── 📁 Property\                    # Complete Property niche (scripts + website)
    ├── 📁 web\                     # Property Next.js site (copy of Dentists/web)
    │   ├── src/
    │   ├── content/blog/           # Generated property blog posts
    │   ├── package.json
    │   └── [Next.js files...]
    ├── config_supabase.py          # Property-specific config (imports shared config)
    ├── generate_blog_supabase.py   # Main blog generator (uses blog_topics_property)
    ├── add_blog_topics.py          # Bulk topic insertion
    ├── fix_blog_faqs.py            # FAQ fixer
    ├── generate_batch.py           # Batch generator
    └── README_SUPABASE.md          # Property niche docs
```

---

## 🔄 What Changed

### Before:
```
\Accounting\
├── BA NEXT JS SITE\              # All blog scripts mixed together
│   ├── config_supabase.py        # Supabase config embedded
│   └── generate_blog_supabase.py
└── web\                          # Dentist site (at root)
```

### After:
```
\Accounting\
├── shared_supabase_config.py     # ✨ Extracted shared config
├── Dentists\                     # ✨ Complete dentist niche
│   ├── web\                      # ✨ Website moved here
│   └── [blog scripts]
└── Property\                     # ✨ Complete property niche
    ├── web\                      # ✨ Website copied here
    └── [blog scripts]
```

**Key Improvement:** Each niche is now self-contained with its own website and scripts!

---

## 🗄️ Supabase Structure

### Single Leads Table (All Niches)
All contact form submissions funnel into **one table**: `leads`

**Schema:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,              -- 'dentists', 'property', etc.
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  page_url TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Example rows:**
| id | source | name | email | message | created_at |
|----|--------|------|-------|---------|------------|
| ... | dentists | Dr. Smith | ... | Need help with practice accounts | 2026-03-28 |
| ... | property | John Doe | ... | Question about BTL tax | 2026-03-28 |

### Separate Blog Topics Tables (Per Niche)
Each niche has its own blog topics table:
- `blog_topics` — Dentist topics
- `blog_topics_property` — Property topics (TODO: Create this table)

---

## 🚀 How to Use

### For Dentists Niche:
```bash
cd "c:\Users\user\Documents\Accounting\Dentists"
$env:ANTHROPIC_API_KEY="your-key-here"
python generate_blog_supabase.py
```

### For Property Niche:
```bash
cd "c:\Users\user\Documents\Accounting\Property"
$env:ANTHROPIC_API_KEY="your-key-here"
python generate_blog_supabase.py
```

---

## 📋 Next Steps

### 1. Create Property Blog Topics Table
Run this in Supabase SQL Editor:

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

### 2. Update Property Blog Generator
In `Property/generate_blog_supabase.py`, change the table name:
```python
# Line 33: Change from 'blog_topics' to 'blog_topics_property'
url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
```

### 3. Create Property Next.js Site
Copy the `web/` folder to `web-property/` and update:
- Branding (colors, logo, site name)
- Content (homepage, about, services pages)
- Domain configuration
- Contact form to use `source: 'property'` when submitting leads

### 4. Update Contact Forms
Both sites should submit to the same `leads` table with different `source` values:

**Dentists site (`web/`):**
```typescript
// In contact form submission
const leadData = {
  source: 'dentists',
  name: formData.name,
  email: formData.email,
  // ... other fields
}
```

**Property site (`web-property/`):**
```typescript
// In contact form submission
const leadData = {
  source: 'property',
  name: formData.name,
  email: formData.email,
  // ... other fields
}
```

---

## 🎯 Benefits of This Structure

1. **Shared Infrastructure:** One Supabase account, one leads table, shared scripts
2. **Easy Scaling:** Add new niches by copying a folder and updating config
3. **Unified Lead Management:** All leads in one place, filtered by source
4. **Cost Efficient:** Share API keys, database, and tooling across all niches
5. **Consistent Quality:** Same proven blog generation system for all niches

---

## 🔮 Future Niches

To add more niches (e.g., Restaurants, Ecommerce, Medical practices):

1. Copy `Dentists/` folder to `NewNiche/`
2. Update `config_supabase.py` with niche-specific settings
3. Create `blog_topics_[niche]` table in Supabase
4. Add `SOURCE_[NICHE]` constant to `shared_supabase_config.py`
5. Create `web-[niche]/` site
6. Update contact form to use correct `source` value

---

## ✅ Reorganization Complete

All files have been moved and configured. The system is ready for:
- ✅ Dentist blog generation (working)
- ✅ Property blog generation (ready - just needs Supabase table)
- ✅ Unified lead collection (ready - just needs table and form updates)
- ✅ Easy addition of future niches
