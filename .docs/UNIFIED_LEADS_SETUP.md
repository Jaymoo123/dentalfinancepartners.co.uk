# Unified Leads Table Setup

All niche sites funnel leads into **one shared table** with a `source` column to identify which site the lead came from.

---

## 📊 Database Schema

### Single Leads Table (All Niches)

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,              -- 'dentists', 'property', 'restaurants', etc.
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  page_url TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for filtering by source
CREATE INDEX idx_leads_source ON leads(source);

-- Index for filtering by status
CREATE INDEX idx_leads_status ON leads(status);

-- Index for sorting by date
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

---

## 🔧 Implementation in Each Niche

### Dentists Site (`Dentists/web/`)

In your contact form API route (e.g., `src/app/api/contact/route.ts`):

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: Request) {
  const formData = await request.json()
  
  const { data, error } = await supabase
    .from('leads')
    .insert({
      source: 'dentists',           // ← Dentist identifier
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      page_url: formData.pageUrl,
      status: 'new'
    })
  
  if (error) throw error
  return Response.json({ success: true })
}
```

### Property Site (`Property/web/`)

Same code, just change the `source`:

```typescript
const { data, error } = await supabase
  .from('leads')
  .insert({
    source: 'property',              // ← Property identifier
    name: formData.name,
    email: formData.email,
    // ... rest same as above
  })
```

---

## 📈 Querying Leads by Source

### Get All Dentist Leads
```sql
SELECT * FROM leads 
WHERE source = 'dentists' 
ORDER BY created_at DESC;
```

### Get All Property Leads
```sql
SELECT * FROM leads 
WHERE source = 'property' 
ORDER BY created_at DESC;
```

### Get All New Leads (All Niches)
```sql
SELECT * FROM leads 
WHERE status = 'new' 
ORDER BY created_at DESC;
```

### Lead Count by Source
```sql
SELECT source, COUNT(*) as lead_count 
FROM leads 
GROUP BY source 
ORDER BY lead_count DESC;
```

---

## 🎯 Benefits

1. **Single Dashboard:** View all leads in one place
2. **Easy Filtering:** Filter by `source` to see niche-specific leads
3. **Cross-Niche Analytics:** Compare performance across niches
4. **Simplified Management:** One table to maintain, backup, and monitor
5. **Unified CRM Integration:** Connect one table to your CRM/email system

---

## 🔗 Source Identifiers

Defined in `shared_supabase_config.py`:

| Niche | Source Value | Table Name |
|-------|--------------|------------|
| Dentists | `dentists` | `blog_topics` |
| Property/Landlords | `property` | `blog_topics_property` |
| Future Niche 1 | `restaurants` | `blog_topics_restaurants` |
| Future Niche 2 | `ecommerce` | `blog_topics_ecommerce` |

---

## ✅ Setup Checklist

- [x] Create `leads` table in Supabase
- [ ] Update Dentists contact form to use `source: 'dentists'`
- [ ] Update Property contact form to use `source: 'property'`
- [ ] Add Supabase credentials to each site's `.env.local`
- [ ] Test form submissions from both sites
- [ ] Verify leads appear in Supabase with correct `source` value

---

## 🚀 Next Steps

1. **Create the `leads` table** in Supabase (SQL above)
2. **Update contact forms** in both sites to submit to this table
3. **Add environment variables** to each site:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://dhlxwmvmkrfnmcgjbntk.supabase.co
   SUPABASE_SERVICE_KEY=[your-service-key]
   ```
4. **Test submissions** from both sites
5. **Set up email notifications** (optional) when new leads arrive
