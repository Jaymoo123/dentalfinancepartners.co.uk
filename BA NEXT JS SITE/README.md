# BA NEXT JS SITE — Blog Generation Pipeline

Python pipeline that generates dental blog posts from a Google Sheet queue and exports them as Markdown for the **Dental Finance Partners** Next.js site.

---

## Pipeline Flow

```
Google Sheet (topics queue)
  ↓
01_sheets_find_row.py       → Find first unused row
  ↓
02_blog_generator.py        → Generate blog content via LLM (DeepSeek/OpenAI)
  ↓
03_content_parser.py        → Parse LLM output into structured fields
  ↓
04_image_generator.py       → (Optional) Generate hero image via DALL-E
  ↓
05_schema_builder.py        → (Optional) Build JSON-LD schema
  ↓
09_md_exporter.py           → Export to ../web/content/blog/{slug}.md
  ↓
07_sheets_mark_used.py      → Mark row as "Used" in Sheet
  ↓
08_sheets_logger.py         → Log completion
```

The Next.js site (`../web`) automatically picks up new `.md` files in `content/blog/` and renders them.

---

## Setup

### 1. Install Dependencies

```bash
pip install openai gspread oauth2client
```

### 2. Configure `config.py`

The `config.py` file is already set up with defaults. Update these values:

- **`GOOGLE_SERVICE_ACCOUNT_FILE`** — Path to your Google service account JSON (for Sheets API).
- **`TOPICS_SPREADSHEET_NAME`** — Name of your Google Sheet (e.g. "Dental Blog Topics").
- **`TOPICS_WORKSHEET_NAME`** — Tab name (default: "Sheet1").
- **`DEESEEK_API_KEY`** — Set via environment variable or update directly.

### 3. Google Sheet Structure

Your Sheet should have these columns (row 1):

| Blog Topic | Secondary Keyword1 | Secondary Keyword2 | ... | Secondary Keyword17 | Used? |
|------------|-------------------|-------------------|-----|---------------------|-------|

- **Blog Topic** — Main keyword/topic (e.g. "Associate dentist tax UK").
- **Secondary Keywords** — 17 columns for related keywords.
- **Used?** — "No" for new topics, "Yes" after processing.

### 4. Service Account Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a project, enable **Google Sheets API** and **Google Drive API**.
3. Create a **Service Account**, download the JSON key.
4. Share your Google Sheet with the service account email (found in the JSON).

---

## Usage

### Generate a Single Blog Post

Run the full pipeline (finds first unused row, generates, exports, marks used):

```bash
cd "c:\Users\user\Documents\Accounting\BA NEXT JS SITE"
python 01_sheets_find_row.py
```

Or run steps manually:

```bash
# 1. Find unused row
python 01_sheets_find_row.py

# 2. Generate content (pass row data)
python 02_blog_generator.py

# 3. Parse output
python 03_content_parser.py

# 4. Export to Markdown
python 09_md_exporter.py

# 5. Mark as used
python 07_sheets_mark_used.py
```

### Check Output

New Markdown files appear in:

```
c:\Users\user\Documents\Accounting\web\content\blog\{slug}.md
```

The Next.js site automatically includes them in `/blog` and `/sitemap.xml`.

---

## Customization

### Blog Tone & Structure

Edit **`BLOG_SYSTEM_PROMPT`** in `config.py` to change:
- Tone (currently: direct, professional, no fluff)
- Content structure (headings, paragraph length)
- Internal linking strategy
- SEO keyword density

### Categories

Update **`POST_CATEGORIES`** in `config.py`:

```python
POST_CATEGORIES = [
    "Associate tax",
    "Practice finance",
    "Buying a practice",
    "Practice accounting",
    "VAT & compliance",
]
```

### Internal Links

Update **`INTERNAL_LINK_SLUGS`** to match your site structure:

```python
INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
    "/blog/your-new-post-slug",
]
```

---

## Troubleshooting

### `ModuleNotFoundError: No module named 'config'`

Make sure you're running scripts from the `BA NEXT JS SITE` folder, or that `config.py` exists.

### `FileNotFoundError: service-account.json`

Download your Google service account key and place it in `BA NEXT JS SITE/service-account.json`.

### Blog post not appearing on site

1. Check the file exists: `web/content/blog/{slug}.md`
2. Restart Next.js dev server: `npm run dev` (from `web`)
3. Check front matter has required fields: `title`, `slug`, `date`, `h1`, `summary`

### LLM API errors

- **DeepSeek**: Set `DEEPSEEK_API_KEY` environment variable or update `config.py`.
- **OpenAI**: Change `LLM_BASE_URL` to `"https://api.openai.com/v1"` and set `OPENAI_API_KEY`.

---

## Next.js Integration

The pipeline outputs Markdown that the Next.js site consumes via:

- **`web/src/lib/blog.ts`** — Scans `content/blog/*.md`, parses front matter + HTML.
- **`web/src/app/blog/[slug]/page.tsx`** — Renders individual posts.
- **`web/src/components/blog/BlogPostRenderer.tsx`** — Layout for posts.

No additional configuration needed on the Next.js side — just drop `.md` files into `content/blog/` and they appear.

---

## Production Workflow

1. Add blog topics to your Google Sheet (one per row, **Used? = No**).
2. Run `python 01_sheets_find_row.py` (or set up a cron/scheduler).
3. Generated posts appear in `web/content/blog/`.
4. Commit and deploy your Next.js site — new posts are live.

---

## Files in This Folder

- **`config.py`** — All configuration (paths, API keys, prompts).
- **`01_sheets_find_row.py`** — Find first unused topic row.
- **`02_blog_generator.py`** — Generate content via LLM.
- **`03_content_parser.py`** — Parse LLM output into structured fields.
- **`04_image_generator.py`** — Generate hero images (optional).
- **`05_schema_builder.py`** — Build JSON-LD schema (optional).
- **`06_webflow_uploader.py`** — Legacy Webflow integration (not used for Next.js).
- **`07_sheets_mark_used.py`** — Mark row as processed.
- **`08_sheets_logger.py`** — Log pipeline completion.
- **`09_md_exporter.py`** — Export to Markdown (main output).

---

## Questions?

See `../web/README.md` for Next.js site documentation, or check the inline comments in each Python script.
