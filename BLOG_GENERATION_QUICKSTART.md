# Blog Generation Quick Start

Your blog generation system is **fully configured and working**.

---

## What's Set Up:

✅ **Supabase table** (`blog_topics`) with 5 sample topics  
✅ **Anthropic Claude integration** for content generation  
✅ **Python script** that generates production-ready blog posts  
✅ **First blog post generated**: "Associate Dentist Expenses: What You Can Claim Against Tax in the UK"  

---

## Generate a New Blog Post (30 seconds)

```bash
cd "c:\Users\user\Documents\Accounting\BA NEXT JS SITE"
$env:ANTHROPIC_API_KEY="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"
python generate_blog_supabase.py
```

**That's it!** The script will:
1. Fetch the next unused topic from Supabase
2. Generate a 1,500-2,500 word blog post
3. Save it to `web/content/blog/{slug}.md`
4. Mark the topic as used

---

## Add New Blog Topics

Go to: **https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/editor**

Click **blog_topics** table and add rows:

| Field | Example |
|-------|---------|
| **topic** | "VAT on dental lab fees: what you can reclaim" |
| **secondary_keyword_1** | "VAT exemption" |
| **secondary_keyword_2** | "dental supplies" |
| **secondary_keyword_3** | "HMRC guidance" |
| **category** | "VAT & compliance" |
| **priority** | 10 (higher = generated first) |
| **used** | false |

**Current topics in queue:**
1. ~~Associate dentist expenses~~ (DONE)
2. How to value a dental practice for sale
3. VAT on dental supplies
4. Should you incorporate your practice?
5. Understanding NHS contract performance

---

## Deploy New Posts to Production

After generating posts:

```bash
cd "c:\Users\user\Documents\Accounting"
git add web/content/blog/*.md
git commit -m "Add new blog posts"
git push origin main
cd web
vercel --prod
```

New posts appear at:
- **Blog index**: https://dentalfinancepartners.co.uk/blog
- **Individual pages**: https://dentalfinancepartners.co.uk/blog/{slug}
- **Sitemap**: https://dentalfinancepartners.co.uk/sitemap.xml

---

## Cost Per Post

**~$0.03 per blog post** (Anthropic Claude Sonnet 4)

Generate 30 posts for ~$1.

---

## Categories Available

- Associate tax
- Practice finance
- Buying a practice
- Practice accounting
- VAT & compliance

---

## Full Documentation

See `BA NEXT JS SITE/README_SUPABASE.md` for:
- Customizing tone and structure
- Internal linking strategy
- Troubleshooting
- Advanced configuration

---

## Current Status

✅ **System ready** — Run `python generate_blog_supabase.py` anytime  
✅ **4 topics queued** — Ready to generate  
✅ **First post live**: https://dentalfinancepartners.co.uk/blog/associate-dentist-expenses-tax-deductions-uk
