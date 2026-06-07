# Domain Migration: Bluehost → Vercel

Reference doc for moving `triiqcoaching.com` off Bluehost/WordPress and onto
Vercel, and (eventually) getting off Bluehost entirely.

---

## How it all fits together (current state, post-cutover)

```
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 1 — WHO OWNS THE NAME                                      │
│                                                                    │
│   🏢 NETWORK SOLUTIONS  (the registrar)                          │
│   → Holds the registration for triiqcoaching.com.                │
│   → Like owning the title to a piece of land.                    │
│   → Its only real job here: point to Layer 2 via "nameservers."  │
└───────────────────────────┬──────────────────────────────────────┘
                            │  delegates DNS control to...
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 2 — WHO DIRECTS TRAFFIC (the DNS zone)                     │
│                                                                    │
│   📡 BLUEHOST  (ns1/ns2.bluehost.com)                            │
│   → Holds the actual phone book (DNS records) for the domain.    │
│   → Every record — website, email, verification — lives here.    │
│   → This is the piece we'll eventually move elsewhere.           │
└───────────────────────────┬──────────────────────────────────────┘
                            │  routes each kind of traffic to...
          ┌─────────────────┼─────────────────┬───────────────────┐
          ▼                 ▼                 ▼                   ▼
┌──────────────────┐ ┌──────────────┐ ┌───────────────┐ ┌─────────────────┐
│ LAYER 3a         │ │ LAYER 3b     │ │ LAYER 3c      │ │ LAYER 3d        │
│                  │ │              │ │               │ │                 │
│  ▲ VERCEL        │ │ 📧 GOOGLE    │ │ ✉️  RESEND     │ │ 🪦 BLUEHOST     │
│                  │ │   WORKSPACE  │ │               │ │   (WordPress)   │
│  Serves the      │ │              │ │ Sends contact-│ │                 │
│  actual website  │ │ Hosts the    │ │ form emails   │ │ The OLD site —  │
│  (A + www CNAME  │ │ real inboxes │ │ as noreply@   │ │ no longer in    │
│  records → here) │ │ (MX records  │ │ (verification │ │ the loop now    │
│                  │ │ → here)      │ │ records→here) │ │ that DNS points │
│                  │ │              │ │               │ │ to Vercel       │
└──────────────────┘ └──────────────┘ └───────────────┘ └─────────────────┘
```

**Key insight:** Bluehost currently wears *two hats* — it's both the DNS
"phone book" (Layer 2) **and** one of the destinations (3d, the now-retired
WordPress host). Fully removing Bluehost means moving Layer 2 to a new home
**before** you can safely shut down 3d.

### Separate piece: `triiq.com`
```
triiq.com  →  Cloudflare (its own DNS)  →  redirects to → triiqcoaching.com
```
Doesn't touch Bluehost at all — just an HTTP redirect/forward to the main
domain. Will keep working automatically through any future changes here.

---

## What changed during the Vercel cutover (already done ✅)

In Bluehost's DNS Zone Editor for `triiqcoaching.com`, two records were
updated to point at Vercel instead of Bluehost's WordPress hosting:

| Type | Host | Old value | New value |
|---|---|---|---|
| A | `@` (apex) | `50.87.177.72` (Bluehost) | `216.198.79.1` (Vercel) |
| CNAME | `www` | `triiqcoaching.com` | `cname.vercel-dns.com` (Vercel) |

**Everything else was left untouched** — specifically:
- MX records (`@` → Google's `aspmx.l.google.com` servers) — email inboxes
- Resend verification records (`send.triiqcoaching.com` MX/TXT,
  `resend._domainkey` TXT, `_dmarc` TXT) — keeps the contact form's
  `noreply@triiqcoaching.com` emails working
- Bluehost/cPanel infrastructure records (`mail`, `webmail`, `autoconfig`,
  `autodiscover`, `cpcalendars`, `cpcontacts`, `webdisk`, `whm`, `cpanel`,
  `ftp`, `localhost`)

This was a **surgical, low-risk change** — only the two records that control
*where the website lives* were touched. Email and Resend kept working
throughout.

---

## Roadmap: fully removing Bluehost (future work)

Bluehost isn't just hosting the old website — it's the **authoritative DNS
host** for `triiqcoaching.com` (nameservers `ns1/ns2.bluehost.com`). To
remove Bluehost completely, that whole DNS zone needs a new home first.
**Do not skip steps or reorder these — getting this wrong can break email
silently for days.**

### Phase 0 — Confirm the Vercel cutover is solid
- [ ] `triiqcoaching.com` and `www.triiqcoaching.com` show **"Valid
      Configuration"** in Vercel (green checkmark)
- [ ] Visiting the live site shows the new Next.js site, not WordPress
- [ ] Contact form still sends/receives emails correctly (test it)
- [ ] Pete/Kendra can still send & receive `@triiqcoaching.com` mail

### Phase 1 — Migrate the DNS zone to a new host
Pick a new DNS provider — **Cloudflare** is a strong choice (free, full DNS
control, and `triiq.com` is already there — could consolidate both).

Recreate every record that matters in the new zone **before** switching
nameservers:

**Keep / recreate:**
- ✅ `@` → A record → `216.198.79.1` (Vercel apex)
- ✅ `www` → CNAME → `cname.vercel-dns.com` (Vercel)
- ✅ `@` → 5x MX records → Google (`aspmx.l.google.com` + 4 alts, matching
      priorities: 1, 5, 5, 10, 10)
- ✅ `@` → TXT (SPF) → `v=spf1 a mx include:websitewelcome.com ~all`
      *(consider updating this to include Google's SPF too —
      `include:_spf.google.com` — since mail is hosted there, not Bluehost)*
- ✅ `send.triiqcoaching.com` → MX → `feedback-smtp.us-east-1.amazonses.com`
- ✅ `send.triiqcoaching.com` → TXT (SPF) → `v=spf1 include:amazonses.com ~all`
- ✅ `resend._domainkey.triiqcoaching.com` → TXT (DKIM public key — long string)
- ✅ `_dmarc.triiqcoaching.com` → TXT → `v=DMARC1; p=none;`

**Safe to drop** (Bluehost/cPanel infrastructure — irrelevant once you're
not hosted there): `autoconfig`, `autodiscover`, `cpcalendars`, `cpcontacts`,
`localhost`, `mail`, `webdisk`, `whm`, `cpanel`, `ftp`, `webmail`
*(double-check `mail`/`autoconfig`/`autodiscover` aren't referenced in any
mail client setup before deleting — but since mail runs through Google,
they almost certainly aren't needed)*

### Phase 2 — Switch nameservers
At **Network Solutions** (the registrar), change the nameservers for
`triiqcoaching.com` from `ns1/ns2.bluehost.com` to the new provider's
nameservers (e.g., Cloudflare's).

⚠️ **This is the point of no return for Bluehost's DNS.** Give it several
days to fully propagate, then verify:
- [ ] Website still loads correctly
- [ ] Email send AND receive both still work
- [ ] Contact form still sends through Resend

### Phase 3 — Cancel Bluehost
Only after the new DNS zone has been live and verified for several days:
- [ ] Export/back up anything worth keeping from the WordPress site
      (content, images, etc.)
- [ ] Cancel the Bluehost hosting plan

---

## Notes
- The domain `triiqcoaching.com` is **registered** at Network Solutions but
  its DNS is **delegated** to Bluehost — these are two different things.
  Removing Bluehost hosting does NOT affect domain ownership.
- This whole process is meaningfully riskier than the simple A/CNAME swap
  already done — recommend doing it step-by-step with verification at each
  stage, not all at once.
