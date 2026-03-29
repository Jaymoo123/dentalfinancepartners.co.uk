# Content Attribution - Visual Flow

## 🔀 THE ROUTING SYSTEM

```
┌─────────────────────────────────────────────────────────────┐
│  COMMAND LINE (Entry Point)                                 │
├─────────────────────────────────────────────────────────────┤
│  python agents/blog_generation_agent.py --niche Property    │
│                                          ^^^^^^^^^^^^^^^^    │
│                                          EXPLICIT PARAMETER  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  AGENT CONFIG (agents/config/agent_config.py)               │
├─────────────────────────────────────────────────────────────┤
│  NICHE_CONFIG["Property"] = {                               │
│    "blog_topics_table": "blog_topics_property",  ← TABLE    │
│    "web_path": "Property/web",                   ← PATH     │
│    "source_identifier": "property"               ← TAG      │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  DATABASE (Supabase)                                         │
├─────────────────────────────────────────────────────────────┤
│  SELECT * FROM blog_topics_property WHERE used = false      │
│                ^^^^^^^^^^^^^^^^^^^^                          │
│                PROPERTY-SPECIFIC TABLE                       │
│                                                              │
│  Returns: "Section 24 mortgage interest restriction..."     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  NICHE CONFIG (Property/config_supabase.py)                 │
├─────────────────────────────────────────────────────────────┤
│  SITE_BASE_URL = "https://propertytaxpartners.co.uk"        │
│  AUTHOR_NAME = "Property Tax Partners"                      │
│  BLOG_SYSTEM_PROMPT = "You are a property accountant..."    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  CONTENT GENERATION (Claude API)                            │
├─────────────────────────────────────────────────────────────┤
│  System: "You are a UK property accountant..."              │
│  Context: "UK landlords, Section 24, BTL, incorporation..." │
│  Output: Property-specific article                          │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  CONTENT STORAGE (published_content table)                  │
├─────────────────────────────────────────────────────────────┤
│  INSERT INTO published_content (                            │
│    niche: "property",                        ← TAGGED       │
│    slug: "section-24-mortgage-interest...",                 │
│    content: "...",                                           │
│    deployment_status: "pending"                             │
│  )                                                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  DEPLOYMENT AGENT                                            │
├─────────────────────────────────────────────────────────────┤
│  SELECT * FROM published_content                            │
│  WHERE niche = 'property'                    ← FILTERED     │
│    AND deployment_status = 'pending'                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  FILESYSTEM (Local)                                          │
├─────────────────────────────────────────────────────────────┤
│  Write to: Property/web/content/blog/section-24-...md       │
│            ^^^^^^^^                                          │
│            PROPERTY FOLDER ONLY                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  GIT COMMIT                                                  │
├─────────────────────────────────────────────────────────────┤
│  git add Property/web/content/blog/                         │
│           ^^^^^^^^                                           │
│           PROPERTY PATH ONLY                                 │
│  git commit -m "Deploy blog content for Property"           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  VERCEL DEPLOYMENT                                           │
├─────────────────────────────────────────────────────────────┤
│  Property Vercel Project:                                   │
│    Watches: Property/web/**                                 │
│    Deploys to: propertytaxpartners.co.uk                    │
│                                                              │
│  Dentists Vercel Project:                                   │
│    Watches: Dentists/web/**                                 │
│    Deploys to: dentalfinancepartners.co.uk                  │
│    Status: UNAFFECTED (no changes detected)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 PARALLEL COMPARISON

### Dentists Flow (Unchanged)

```
--niche Dentists
  ↓
blog_topics (table, 59 rows)
  ↓
Dentists/config_supabase.py
  ↓
"You are a UK dental accountant..."
  ↓
published_content (niche: "dentists")
  ↓
Dentists/web/content/blog/
  ↓
dentalfinancepartners.co.uk
```

### Property Flow (New)

```
--niche Property
  ↓
blog_topics_property (table, 60 rows)
  ↓
Property/config_supabase.py
  ↓
"You are a UK property accountant..."
  ↓
published_content (niche: "property")
  ↓
Property/web/content/blog/
  ↓
propertytaxpartners.co.uk
```

**Two completely independent pipelines.**

---

## 🎯 KEY INSIGHT

The system uses **explicit routing at every step**, not inference or detection.

**It's like two separate apps that happen to share:**
- ✅ Database connection (Supabase URL/key)
- ✅ Agent utilities (cost tracking, error handling)
- ✅ Workflow structure (same Python scripts)

**But keep completely separate:**
- ❌ Topic pools (different tables)
- ❌ Content (different niche tags)
- ❌ Output paths (different folders)
- ❌ Deployments (different domains)

**Think of it like two restaurants sharing a kitchen supplier (Supabase) but serving completely different menus to different customers at different locations.**
