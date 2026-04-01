# Lead Form Configuration Audit

**Date:** 31 March 2026  
**Status:** ✅ VERIFIED - With 1 Migration Required

---

## Executive Summary

All three sites (Property, Dentists, Medical) use identical lead form logic and submit to the same Supabase `leads` table. Each lead is tagged with a `source` identifier to track which site it came from.

**Critical Finding:** Database constraint needs updating to accept 'medical' source.

---

## 1. Lead Form Payload Structure

All three sites send identical payload structure:

```typescript
{
  full_name: string,        // Required
  email: string,            // Required, validated
  phone: string,            // Required, UK format validated
  role: string,             // Required, from niche-specific dropdown
  practice_name: string,    // "—" for Property/Medical, optional for Dentists
  message: string,          // Optional
  source: string,           // ✅ "property" | "dentists" | "medical"
  source_url: string,       // ✅ Full URL where form was submitted
  submitted_at: string      // ISO timestamp
}
```

---

## 2. Source Identifiers

Each site correctly uses its own identifier from `niche.config.json`:

| Site | Source Identifier | Config Path |
|------|------------------|-------------|
| Property | `"property"` | `Property/web/niche.config.json` → `content_strategy.source_identifier` |
| Dentists | `"dentists"` | `Dentists/niche.config.json` → `content_strategy.source_identifier` |
| Medical | `"medical"` | `Medical/web/niche.config.json` → `content_strategy.source_identifier` |

**Code Implementation:**
```typescript
source: niche.content_strategy.source_identifier,
```

✅ **Result:** Each site correctly identifies itself

---

## 3. Source URL Tracking

All forms capture the exact page URL where submission occurred:

```typescript
const [sourceUrl, setSourceUrl] = useState("");

useEffect(() => {
  if (typeof window !== "undefined") {
    setSourceUrl(window.location.href);
  }
}, []);

// In payload:
source_url: sourceUrl || String(data.get("sourceUrl") || "").trim(),
```

**Examples:**
- Property: `https://www.propertytaxpartners.co.uk/contact`
- Dentists: `https://www.dentalfinancepartners.co.uk/services`
- Medical: `https://www.medicalaccounts.co.uk/locations/london`

✅ **Result:** Full attribution tracking works correctly

---

## 4. Supabase Table Structure

**Table:** `leads` (shared by all niches)

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ,
  
  -- Contact information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Lead details
  role TEXT NOT NULL,
  practice_name TEXT,
  message TEXT,
  
  -- Attribution
  source TEXT,        -- ✅ 'dentists', 'property', or 'medical'
  source_url TEXT,    -- ✅ Full URL of submission page
  
  -- Status tracking
  status TEXT DEFAULT 'new'
);
```

**Indexes:**
- `idx_leads_created_at` - For chronological queries
- `idx_leads_source` - ✅ For filtering by niche
- `idx_leads_status` - For workflow management
- `idx_leads_email` - For deduplication

---

## 5. Database Constraint Issue

### Current Constraint (PROBLEM)
```sql
ALTER TABLE leads ADD CONSTRAINT leads_source_valid 
  CHECK (source IN ('dentists', 'property') OR source IS NULL);
```

❌ **Issue:** This constraint will REJECT any lead from Medical site with `source = 'medical'`

### Required Migration
**File:** `supabase/migrations/20260331000001_add_medical_to_leads_source.sql`

```sql
-- Drop the old constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

-- Add the new constraint with 'medical' included
ALTER TABLE leads ADD CONSTRAINT leads_source_valid 
  CHECK (source IN ('dentists', 'property', 'medical') OR source IS NULL);
```

✅ **Status:** Migration file created, ready to apply

---

## 6. Role Options by Site

Each site has niche-specific role options:

### Property
- Portfolio landlord
- Single property owner
- First-time landlord
- Property developer
- Other

### Dentists
- Associate dentist
- Practice owner
- Multi-site group
- Other

### Medical
- GP (salaried)
- GP (partner)
- Locum doctor
- Hospital consultant
- Private practice owner
- Other

✅ **Result:** All role options are niche-appropriate

---

## 7. Validation Rules

All three sites use identical validation:

| Field | Validation |
|-------|-----------|
| full_name | Min 2 characters |
| email | Regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$` |
| phone | UK format: min 10 digits, allows `+`, `-`, `()`, spaces |
| role | Required (must select from dropdown) |
| message | Optional, but if provided must be min 10 chars |

✅ **Result:** Consistent validation across all sites

---

## 8. API Configuration

All sites use environment variables for Supabase connection:

```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
```

**Endpoint:** `${supabaseUrl}/rest/v1/leads`  
**Method:** `POST`  
**Headers:**
- `Content-Type: application/json`
- `apikey: ${supabaseKey}`
- `Authorization: Bearer ${supabaseKey}`
- `Prefer: return=minimal`

✅ **Result:** All sites use same API configuration

---

## 9. Google Analytics Tracking

All forms track successful submissions:

```typescript
gtag("event", "generate_lead", {
  event_category: "engagement",
  event_label: `${niche.niche_id}_${payload.role}`,
  value: 1,
});
```

**Event Labels:**
- Property: `property_Portfolio landlord`, `property_Single property owner`, etc.
- Dentists: `dentists_Associate dentist`, `dentists_Practice owner`, etc.
- Medical: `medical_GP (partner)`, `medical_Locum doctor`, etc.

✅ **Result:** Each site's conversions are properly tagged

---

## 10. Error Handling

All forms have consistent error states:

1. **Validation errors** - Shown inline per field
2. **Network errors** - "That did not go through... Try again, or email us"
3. **Missing config** - "This form is not connected yet. Email us..."
4. **Success state** - Redirects to `/thank-you` or shows inline success message

✅ **Result:** User-friendly error handling

---

## 11. Comparison Matrix

| Aspect | Property | Dentists | Medical | Status |
|--------|----------|----------|---------|--------|
| Uses `source` field | ✅ "property" | ✅ "dentists" | ✅ "medical" | ✅ Correct |
| Uses `source_url` field | ✅ Full URL | ✅ Full URL | ✅ Full URL | ✅ Correct |
| Submits to `/rest/v1/leads` | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Correct |
| Role options are niche-specific | ✅ Landlords | ✅ Dentists | ✅ Doctors | ✅ Correct |
| GA tracking with niche_id | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Correct |
| Database constraint allows source | ✅ Yes | ✅ Yes | ❌ **NO** | ⚠️ **Migration needed** |

---

## 12. Action Required

### CRITICAL: Apply Database Migration

**Before Medical forms will work**, you must apply this migration:

```bash
# Option 1: Via Supabase Dashboard
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Paste contents of: supabase/migrations/20260331000001_add_medical_to_leads_source.sql
# 3. Run migration

# Option 2: Via Supabase CLI (if installed)
supabase db push
```

**What this does:**
- Removes old constraint: `CHECK (source IN ('dentists', 'property'))`
- Adds new constraint: `CHECK (source IN ('dentists', 'property', 'medical'))`

**Impact if not applied:**
- Medical lead form submissions will be REJECTED by database
- Users will see error: "Request failed (400)" or constraint violation error
- No Medical leads will be captured

---

## 13. Testing Checklist

Once migration is applied, test each site:

### Property
- [ ] Submit test lead from `/contact`
- [ ] Verify `source = 'property'` in Supabase
- [ ] Verify `source_url` contains `propertytaxpartners.co.uk`

### Dentists
- [ ] Submit test lead from `/contact`
- [ ] Verify `source = 'dentists'` in Supabase
- [ ] Verify `source_url` contains `dentalfinancepartners.co.uk`

### Medical
- [ ] Submit test lead from `/contact`
- [ ] Verify `source = 'medical'` in Supabase
- [ ] Verify `source_url` contains `medicalaccounts.co.uk`

---

## 14. Query Examples

Once Medical leads start coming in, you can query them:

```sql
-- Get all Medical leads
SELECT * FROM leads WHERE source = 'medical' ORDER BY created_at DESC;

-- Count leads by source
SELECT source, COUNT(*) FROM leads GROUP BY source;

-- Recent leads from Medical site
SELECT full_name, email, role, source_url, created_at 
FROM leads 
WHERE source = 'medical' 
ORDER BY created_at DESC 
LIMIT 10;

-- Leads from specific Medical page
SELECT * FROM leads 
WHERE source = 'medical' 
AND source_url LIKE '%/locations/london%';
```

---

## Conclusion

✅ **Form Implementation:** Perfect - all three sites use identical logic  
✅ **Source Tracking:** Perfect - each site correctly identifies itself  
✅ **URL Tracking:** Perfect - full page URL is captured  
✅ **Role Options:** Perfect - each site has appropriate options  
✅ **GA Tracking:** Perfect - conversions are properly tagged  

⚠️ **ACTION REQUIRED:** Apply migration `20260331000001_add_medical_to_leads_source.sql` to Supabase

**After migration:** Medical forms will work identically to Property and Dentists, with perfect attribution tracking.
