# Google Apps Script Setup — Lead Form → Sheet → Sidekick

This guide connects your Next.js lead form to a Google Sheet, then forwards submissions to **Sidekick Accounting** for fulfillment.

---

## Step 1: Create a Google Sheet

1. Open [Google Sheets](https://sheets.google.com).
2. Create a new sheet named **Dental Finance Partners — Leads**.
3. Add these column headers in **row 1**:

   | Timestamp | Full Name | Email | Phone | Role | Practice Name | Message | Source URL | Forwarded to Sidekick |
   |-----------|-----------|-------|-------|------|---------------|---------|------------|----------------------|

---

## Step 2: Create a Google Apps Script Web App

1. In your Sheet, go to **Extensions → Apps Script**.
2. Delete any default code and paste the script below.
3. Click **Deploy → New deployment**.
4. Choose **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, authorize, and **copy the Web App URL**.

### Apps Script Code

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const data = JSON.parse(e.postData.contents);
    
    const timestamp = new Date();
    const row = [
      timestamp,
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.role || "",
      data.practiceName || "—",
      data.message || "",
      data.sourceUrl || "",
      "No" // Forwarded to Sidekick (manual or automated later)
    ];
    
    sheet.appendRow(row);
    
    // Optional: forward to Sidekick via email or webhook
    // MailApp.sendEmail({
    //   to: "hello@sidekickaccounting.co.uk",
    //   subject: `New dental lead: ${data.fullName}`,
    //   body: `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nRole: ${data.role}\n\n${data.message}`
    // });
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Step 3: Add the URL to Your Next.js App

1. In `web/.env.local`, add:

   ```bash
   NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

2. Restart your dev server: `npm run dev` (from `web`).

---

## Step 4: Test the Form

1. Go to `http://localhost:3000/contact`.
2. Fill in the form and submit.
3. Check your Google Sheet — a new row should appear.

---

## Step 5: Forward to Sidekick (Optional Automation)

### Option A: Manual
Mark rows as "Yes" in the **Forwarded to Sidekick** column after you email them to Sidekick.

### Option B: Automated Email
Uncomment the `MailApp.sendEmail` block in the Apps Script above. Each submission will email Sidekick automatically.

### Option C: Zapier / Make
Use a Google Sheets → Email or HTTP trigger to forward new rows to Sidekick's intake system.

---

## Troubleshooting

- **CORS error**: Redeploy the Apps Script as a **new version** (Deploy → Manage deployments → Edit → Version: New).
- **403 Forbidden**: Check **Who has access** is set to **Anyone**.
- **Form says "not connected"**: Verify `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` is in `.env.local` and restart `npm run dev`.

---

## Production Checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://dentalfinancepartners.co.uk` in production env.
- [ ] Update Apps Script email recipient to Sidekick's real intake address.
- [ ] Test form submission from production domain.
- [ ] Set up Google Sheet notifications (Tools → Notification rules) for new rows.
