# 🚨 CRITICAL: Environment Variable Issue Found

**Date:** 29 March 2026  
**Priority:** CRITICAL - Must fix before agents run  
**Status:** ACTION REQUIRED

---

## ⚠️ Problem Discovered

Your local `.env` file has the **wrong Supabase key** for agents:

```bash
# CURRENT (WRONG):
SUPABASE_KEY=eyJhbGci...  # This is the ANON key

# SHOULD BE (CORRECT):
SUPABASE_KEY=eyJhbGci...  # This should be the SERVICE_ROLE key
```

---

## 🔍 Why This Matters

### Anon Key (What you have now)
- ✅ Used by browsers/frontend
- ✅ Limited permissions (INSERT leads only after RLS)
- ❌ **WRONG for agents** (can't access agent tables after RLS)

### Service Role Key (What agents need)
- ✅ Bypasses RLS completely
- ✅ Full access to all tables
- ✅ **CORRECT for agents**

---

## 🎯 Impact

### Local Development
- ❌ Running agents locally will FAIL after RLS
- ❌ Agents can't access agent_executions, blog_topics, etc.
- ❌ Boolean filter fix won't help if key is wrong

### GitHub Actions (Production)
- ✅ Likely using correct service_role key in secrets
- ✅ Agents in GitHub Actions should still work
- ✅ Need to verify GitHub secrets have service_role key

---

## ✅ How to Fix

### Step 1: Get Your Service Role Key

1. Open Supabase Dashboard
2. Go to **Settings** → **API**
3. Scroll to **Project API keys**
4. Find **service_role** key (NOT anon key)
5. Copy the key (starts with `eyJhbGci...`, much longer than anon key)

### Step 2: Update Local .env File

Replace line 14 in `.env`:

```bash
# OLD (anon key):
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobHh3bXZta3Jmbm1jZ2pibnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODM0NjMsImV4cCI6MjA3NDA1OTQ2M30.hwUgd2x91wFqX8HKENztrXtGkabR21LPKhC-oxzuOA8

# NEW (service_role key):
SUPABASE_KEY=<paste service_role key here>
```

### Step 3: Verify GitHub Secrets

1. Go to GitHub → Repository → Settings → Secrets and variables → Actions
2. Check `SUPABASE_KEY` secret
3. Verify it's the **service_role key** (not anon key)
4. If it's the anon key, update it with service_role key

---

## 🧪 How to Verify

### Test 1: Check Which Key You Have

The anon key payload (decoded) contains:
```json
{
  "role": "anon",  // ← This is what you have now
  "ref": "dhlxwmvmkrfnmcgjbntk"
}
```

The service_role key payload contains:
```json
{
  "role": "service_role",  // ← This is what you need
  "ref": "dhlxwmvmkrfnmcgjbntk"
}
```

You can decode JWT at https://jwt.io to check.

### Test 2: Run Agent Locally

After updating `.env`:

```bash
python agents/setup/quick_test.py
```

**Expected:** All tests pass ✅  
**If fails:** Key is still wrong

---

## 📊 Current vs. Correct Setup

### Current Setup (WRONG)
```
Local .env:
  SUPABASE_KEY = anon key ❌

GitHub Secrets:
  SUPABASE_KEY = ??? (need to check)

Result:
  - Local agents will fail after RLS ❌
  - GitHub agents might work (if secret is correct) ✅
```

### Correct Setup (NEEDED)
```
Local .env:
  SUPABASE_KEY = service_role key ✅

GitHub Secrets:
  SUPABASE_KEY = service_role key ✅

Result:
  - Local agents work ✅
  - GitHub agents work ✅
  - RLS doesn't affect agents ✅
```

---

## 🚨 Why This Wasn't Caught Earlier

The `.env.example` file had a placeholder:
```bash
SUPABASE_KEY=your_supabase_anon_key_here
```

This was **misleading** - it should have said:
```bash
SUPABASE_KEY=your_supabase_SERVICE_ROLE_key_here
```

**Lesson:** Always use service_role key for backend/agents, anon key for frontend only.

---

## 🔧 Quick Fix Commands

### Update .env File

I can't update your `.env` file directly (it contains secrets), but you can:

1. Open `.env` in your editor
2. Replace line 14 with your service_role key
3. Save the file

### Or via Command Line

```bash
# Get service_role key from Supabase dashboard first, then:
echo "SUPABASE_KEY=<your_service_role_key_here>" > .env.tmp
# Then manually copy the line to .env
```

---

## ✅ After You Fix This

1. Test agents locally:
   ```bash
   python agents/setup/quick_test.py
   ```

2. Verify GitHub secrets have service_role key

3. Run a test agent:
   ```bash
   python agents/content_research_agent.py --niche Dentists
   ```

4. Check Supabase logs for any RLS errors

---

## 🎯 Summary

**Problem:** `.env` has anon key, agents need service_role key  
**Impact:** Local agents will fail after RLS  
**Fix:** Replace `SUPABASE_KEY` in `.env` with service_role key  
**Time:** 2 minutes  
**Priority:** CRITICAL (do before running agents locally)

---

**Discovered:** 29 March 2026  
**Status:** NEEDS IMMEDIATE FIX  
**Risk:** High (agents won't work locally)
