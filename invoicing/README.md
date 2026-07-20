# Monthly Invoice Generator

A simple tool that creates a clean, professional PDF invoice for Ashfield Trading
Limited. Each month you edit one plain-text file (no code), run one command, and
a finished A4 invoice appears in the `output` folder. It can also read your leads
from a CSV file and count them for you, so you never type the number by hand.

Everything is in British English, GBP, black and white. No paid services.

---

## What is in this folder

| File / folder            | What it is                                                       |
| ------------------------ | ---------------------------------------------------------------- |
| `invoice_config.toml`    | The one file you edit each month (client, dates, line items).    |
| `leads/`                 | Your monthly lead CSV files. A sample is included.               |
| `output/`                | Finished PDF invoices land here.                                 |
| `generate_invoice.py`    | The tool itself. You do not need to open or edit this.           |
| `requirements.txt`       | The one add-on the tool needs (`fpdf2`).                         |
| `README.md`              | This guide.                                                      |

---

## One-time setup (do this once)

You need Python installed. You already have Python 3.13, so you are set. To check
at any time, open PowerShell and run:

```
python --version
```

Then install the one thing the tool needs. In PowerShell, run:

```
cd C:\Users\user\Documents\Accounting\invoicing
python -m pip install -r requirements.txt
```

That is the whole setup. You only do it once.

---

## Making this month's invoice (the normal routine)

1. Open `invoice_config.toml` in Notepad (or any text editor).
2. Change the details for this month (see "What to change each month" below).
3. Save the file.
4. In PowerShell, run:

   ```
   cd C:\Users\user\Documents\Accounting\invoicing
   python generate_invoice.py
   ```

5. The tool prints a short summary so you can check the numbers, and saves the PDF
   to the `output` folder with a professional, email-ready name, for example
   `output\Ashfield Trading Limited - Invoice DJH-001 - June 2026.pdf`.
   (The name is built from your business name, the invoice number and the billing
   period. If you leave `billing_period` blank, it uses the invoice month instead.)
6. Open the PDF, give it a final look, and send it to your client.

---

## What to change each month

Open `invoice_config.toml` and edit these. Keep the quotes around text.

- **Invoice number** - `invoice_number = "DJH-001"`. This is a client-specific
  reference so the invoice reads as being for that client, not a generic one.
  Bump it each month for the same client: DJH-001, then DJH-002, and so on. For a
  different client, use their own prefix (for example ABC-001). This reference is
  also used as the payment reference on the invoice, so when they pay with it you
  can see straight away which client it is.
- **Invoice date** - `invoice_date = "2026-07-01"`. Always year-month-day. The
  due date is worked out for you automatically as the invoice date plus 14 days.
- **Billing period** (optional) - `billing_period = "July 2026"`. Shown on the
  invoice. Set it to `""` if you do not want it shown.
- **Client** - the `[client]` section: company, contact, title, address, email.
- **Lead count** - handled for you if you use the lead import (see next section).
  Otherwise put a number in `quantity` in the `[[line_items]]` section.

You do not need to touch anything else for a normal month.

---

## Importing your leads (so you do not type the number)

Your leads live in a CSV file (one row per lead). A CSV is just a spreadsheet
saved in a simple text format; Excel and Google Sheets can both "Save as CSV".

The `[leads]` section of the config controls the import:

```toml
[leads]
enabled          = true
path             = "leads/leads-2026-06.csv"
date_column      = "date"
period           = ""
reference_column = "reference"
itemise          = false
```

- `enabled = true` tells the tool to read the file and count the rows.
- `path` points to that month's CSV. Save a new file each month, for example
  `leads/leads-2026-07.csv`, and update this line to match.
- In the `[[line_items]]` section, set `quantity = "auto"`. The word `auto`
  means "use the number of leads just imported". That is how this month's
  invoice got a quantity of 9 without you typing it.
- `period` is optional. If your CSV holds several months in one file, set
  `period = "2026-07"` to count only July rows. Leave it as `""` to count
  every row in the file.
- `itemise = true` will print a plain list of the lead references underneath
  the invoice, if you ever want the leads listed. Default is `false`.

### The CSV format

Your CSV needs a header row. The sample `leads/leads-2026-06.csv` looks like this:

```
reference,date,name,email,type
PTP-2606-01,2026-06-02,J Marsden,j.marsden@example.com,Landlord
PTP-2606-02,2026-06-04,A Okafor,a.okafor@example.com,Landlord
...
```

The only columns the tool actually needs are:

- a **reference** column (used only if you turn on `itemise`), and
- a **date** column (used only if you set a `period` filter).

Any extra columns (name, email, type) are ignored, so you can export whatever
your website gives you. If your columns are named differently, just update
`date_column` and `reference_column` in the config to match your headings.

### Not using the import yet?

Set `enabled = false` in the `[leads]` section and put a plain number in
`quantity`, for example `quantity = 9`. The invoice will still generate.

### Swapping the source later

Your leads are actually captured on your website and stored in your database.
When you want to pull the count straight from there (or from a Google Sheet)
instead of a CSV, only one small function needs changing: `load_leads` near the
top of `generate_invoice.py`. It just has to return a count and, optionally, a
list of references. Everything else stays the same. Ask your developer to swap
it when you are ready; nothing else in the tool needs to move.

---

## Changing a line's price, or adding a second line

In the `[[line_items]]` section:

- The standard line is `Lead generation (qualified leads)` at `unit_price = 85.00`.
  Change the price there if your rate changes.
- To add another charge (for example a setup fee), copy the whole
  `[[line_items]]` block and paste it underneath, then edit the new one. The
  config file has a ready-made example you can switch on by deleting the `#`
  at the start of each of its lines.

The `amount` for every line, the subtotal and the total are all worked out for
you. The tool checks the maths adds up before it saves the PDF.

---

## Changing your own business or bank details (rare)

These are already built in and shown at the bottom of `invoice_config.toml`, in
the `[business]` and `[bank]` sections. If your address, bank or account details
ever change, edit them there and save. You do not need to touch any code.

---

## Keeping a separate config per client (optional)

If you invoice several firms and want a saved set-up for each, make a copy of
`invoice_config.toml`, for example `djh.toml`, and run:

```
python generate_invoice.py djh.toml
```

The tool uses whichever config file you name. If you name none, it uses
`invoice_config.toml`.

---

## Troubleshooting

- **"Could not find the config file"** - run the command from inside the
  `invoicing` folder (the `cd ...` line above), and check the file name.
- **"has a formatting mistake"** - you probably deleted a quote or a comma while
  editing. Compare your change with the notes in the config file, or restore the
  line from this guide.
- **"lead import is switched on but the file was not found"** - the `path` in the
  `[leads]` section does not match a real file. Check the file name and that it
  is in the `leads` folder.
- **"quantity = auto, but lead import is off"** - either set `enabled = true` in
  the `[leads]` section, or replace `"auto"` with a number.
- **The pound sign looks odd in PowerShell** - that is just the terminal. The PDF
  itself shows the pound sign correctly. Always judge the result by opening the
  PDF.

---

## Quick reference: next month in 4 steps

1. Save next month's leads as `leads/leads-2026-07.csv` (or reuse your export).
2. In `invoice_config.toml`: bump `invoice_number` to `DJH-002` (or the next
   number for whichever client you are billing), set the new `invoice_date`, set
   `billing_period` to `"July 2026"`, update the `path` in `[leads]`, and change
   the `[client]` if you are billing a different firm.
3. Run `python generate_invoice.py`.
4. Open the new PDF in the `output` folder and send it.
