# Domain Setup — dentalfinancepartners.co.uk

Guide for connecting your production domain to the Next.js site.

---

## Prerequisites

- Domain registered: **dentalfinancepartners.co.uk**
- Hosting platform chosen (Vercel, Netlify, or other)
- Next.js site built and tested locally

---

## Option 1: Deploy to Vercel (Recommended for Next.js)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Deploy from the `web` Folder

```bash
cd c:\Users\user\Documents\Accounting\web
vercel
```

Follow prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No (first time)
- **Project name:** dental-finance-partners
- **Directory:** `./` (already in `web`)
- **Override settings?** No

### 3. Set Environment Variable

In the Vercel dashboard (or via CLI):

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
```

Value: `https://dentalfinancepartners.co.uk`

Also add `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` (your Apps Script web app URL from the lead form setup).

### 4. Add Custom Domain

1. Go to **Project Settings → Domains** in Vercel.
2. Add `dentalfinancepartners.co.uk` and `www.dentalfinancepartners.co.uk`.
3. Vercel will show DNS records to add at your registrar.

### 5. Update DNS at Your Registrar

Add these records (values from Vercel):

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| A     | @    | 76.76.21.21 (Vercel IP)        |
| CNAME | www  | cname.vercel-dns.com           |

Wait 10-60 minutes for DNS propagation.

### 6. Verify

Visit `https://dentalfinancepartners.co.uk` — your site should load with SSL.

---

## Option 2: Deploy to Netlify

### 1. Build the Site

```bash
cd c:\Users\user\Documents\Accounting\web
npm run build
```

### 2. Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Or use the Netlify dashboard:
1. Drag the `web/.next` folder (or connect your Git repo).
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### 3. Add Environment Variables

In **Site settings → Environment variables**:
- `NEXT_PUBLIC_SITE_URL` = `https://dentalfinancepartners.co.uk`
- `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` = (your Apps Script URL)

### 4. Add Custom Domain

1. Go to **Domain settings → Add custom domain**.
2. Add `dentalfinancepartners.co.uk`.
3. Follow DNS instructions (similar to Vercel).

---

## Option 3: Self-Hosted (VPS / Docker)

### 1. Build for Production

```bash
cd c:\Users\user\Documents\Accounting\web
npm run build
```

### 2. Run with PM2 or Docker

**PM2:**

```bash
npm install -g pm2
pm2 start npm --name "dental-site" -- start
```

**Docker:**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t dental-site .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://dentalfinancepartners.co.uk dental-site
```

### 3. Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name dentalfinancepartners.co.uk www.dentalfinancepartners.co.uk;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dentalfinancepartners.co.uk www.dentalfinancepartners.co.uk;

    ssl_certificate /etc/letsencrypt/live/dentalfinancepartners.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dentalfinancepartners.co.uk/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Get SSL cert:

```bash
certbot --nginx -d dentalfinancepartners.co.uk -d www.dentalfinancepartners.co.uk
```

---

## DNS Records Summary

At your domain registrar (e.g. Namecheap, GoDaddy), add:

### For Vercel / Netlify

| Type  | Name | Value                     | TTL  |
|-------|------|---------------------------|------|
| A     | @    | (IP from hosting provider)| 3600 |
| CNAME | www  | (CNAME from provider)     | 3600 |

### For Self-Hosted

| Type  | Name | Value              | TTL  |
|-------|------|--------------------|------|
| A     | @    | YOUR_SERVER_IP     | 3600 |
| CNAME | www  | dentalfinancepartners.co.uk | 3600 |

---

## Post-Deployment Checklist

- [ ] Site loads at `https://dentalfinancepartners.co.uk`
- [ ] SSL certificate is valid (green padlock)
- [ ] All pages render correctly (`/`, `/services`, `/about`, `/blog`, `/contact`, `/locations`)
- [ ] Lead form submits to Google Sheet
- [ ] Blog posts display correctly
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Submit sitemap to Google Search Console

---

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property: `https://dentalfinancepartners.co.uk`
3. Verify ownership (DNS TXT record or HTML file upload).
4. Submit sitemap: `https://dentalfinancepartners.co.uk/sitemap.xml`

---

## Questions?

See `GOOGLE_APPS_SCRIPT_SETUP.md` for lead form setup, or `BA NEXT JS SITE/README.md` for blog pipeline details.
