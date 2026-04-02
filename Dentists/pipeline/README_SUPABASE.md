# Blog Generation with Anthropic + Supabase

Simplified blog generation pipeline using Anthropic Claude and Supabase (no Google Sheets needed).

---

## Quick Start

### 1. Add Blog Topics to Supabase

Go to your Supabase dashboard:
**https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/editor**

Click **Table Editor > blog_topics** and add rows:

| topic | secondary_keyword_1 | secondary_keyword_2 | category | priority | used |
|-------|-------------------|-------------------|----------|----------|------|
| Your blog topic here | keyword 1 | keyword 2 | Associate tax | 10 | false |

**Categories:** Associate tax, Practice finance, Buying a practice, Practice accounting, VAT & compliance

**Priority:** Higher numbers = generated first (10 = highest, 1 = lowest)

---

### 2. Generate a Blog Post

```bash
cd "c:\Users\user\Documents\Accounting\BA NEXT JS SITE"
$env:ANTHROPIC_API_KEY="your-key-here"
python generate_blog_supabase.py
```

This will:
1. Fetch the highest-priority unused topic from Supabase
2. Generate a full blog post using Claude
3. Export it to `../web/content/blog/{slug}.md`
4. Mark the topic as used in Supabase

---

### 3. View the New Post

The Next.js site automatically picks up new Markdown files:

**Local:** http://localhost:3000/blog/{slug}  
**Production:** https://dentalfinancepartners.co.uk/blog/{slug}

---

## Generated Content Includes:

- SEO-optimized title, meta description, and H1
- 1,500-2,500 word article with proper HTML structure
- Internal links to relevant pages
- 4 FAQ questions with answers
- Proper front matter for Next.js rendering

---

## Configuration

Edit `config_supabase.py` to customize:

- **`BLOG_SYSTEM_PROMPT`** — Tone, structure, and style
- **`POST_CATEGORIES`** — Available categories
- **`INTERNAL_LINK_SLUGS`** — Pages to link to in content
- **`AUTHOR_NAME`** — Byline for posts

---

## Workflow

### Add Multiple Topics

Insert multiple rows in Supabase, then run the script multiple times:

```bash
python generate_blog_supabase.py  # Generates post 1
python generate_blog_supabase.py  # Generates post 2
python generate_blog_supabase.py  # Generates post 3
```

Each run processes one topic and marks it as used.

---

### Deploy New Posts

After generating posts, commit and deploy:

```bash
cd ../web
git add content/blog/*.md
git commit -m "Add new blog posts"
git push origin main
vercel --prod
```

Posts appear in:
- Blog index: `/blog`
- Sitemap: `/sitemap.xml`
- Individual pages: `/blog/{slug}`

---

## Supabase Table Schema

The `blog_topics` table has these columns:

- **`topic`** (text, required) — Main blog topic/keyword
- **`secondary_keyword_1` to `secondary_keyword_10`** (text, optional) — Related keywords
- **`category`** (text, optional) — Post category
- **`priority`** (integer, default 0) — Higher = generated first
- **`used`** (boolean, default false) — Marks if topic has been processed
- **`generated_slug`** (text) — Slug of generated post
- **`generated_at`** (timestamp) — When it was generated
- **`notes`** (text, optional) — Internal notes

---

## Cost

**Anthropic Claude Sonnet 4:**
- ~$0.03 per blog post (4,000 tokens output)
- ~$1 for 30 posts

**Supabase:**
- Free tier: 500MB database, 2GB bandwidth (plenty for blog topics)

---

## Troubleshooting

### "No unused topics found"
Add topics to the `blog_topics` table in Supabase with `used = false`.

### API Key Error
Set the environment variable:
```bash
$env:ANTHROPIC_API_KEY="your-key-here"
```

### Post Not Appearing on Site
1. Check the file exists: `web/content/blog/{slug}.md`
2. Restart dev server: `npm run dev` (from `web` folder)
3. Check front matter has all required fields

---

## Next Steps

1. **Add 10-20 blog topics** to Supabase
2. **Run the generator** for each topic
3. **Review and edit** generated posts if needed
4. **Commit and deploy** to production

Your site will automatically include new posts in the blog index, sitemap, and navigation.
