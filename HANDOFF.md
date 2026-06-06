# Tri IQ Coaching Website — Handoff Document

## Overview
Marketing + members-only website for **Tri IQ Coaching LLC**, a triathlon coaching business run by Coach Pete (Peter Heizer) and Coach Kendra (Kendra Kitson). The site is a Next.js app with a gated members area.

---

## Infrastructure

| Thing | Where | Details |
|---|---|---|
| **Source code** | GitHub | `git@github.com:kmarsteller/TriIQ_Website.git` (SSH) |
| **Live site** | Vercel | Auto-deploys on every push to `main` |
| **Local dev path** | Mac | `/Users/kmarsteller/Projects/2026_TriIQ website/triiq-website/` |
| **Dev server** | `npm run dev` | Runs on `http://localhost:3000` with Turbopack |

**Deploy flow:** `git push origin main` → Vercel picks it up automatically, usually live in 1–2 minutes.

**Git remote:** Uses SSH (`git@github.com:...`), not HTTPS. If auth fails on a new machine, check SSH keys are set up for GitHub.

---

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion v12
- **Icons:** Lucide React
- **Deployment:** Vercel (Hobby plan)

---

## Environment Variables

Stored in `.env.local` (not committed to git). You'll need to recreate this file on a new machine:

```
MEMBERS_PASSWORD=triiqteam2026
MEMBERS_TOKEN=triiq-squad-access-2026-secure
```

The members area is protected by a cookie set via `/api/members-auth`. The password above is what athletes enter at `/members/login`.

---

## Site Structure

```
src/app/
  page.tsx                        # Homepage (hero video, stats, pillars, services, CTA)
  layout.tsx                      # Root layout (Navbar, Footer)
  coaches/page.tsx                # Coaches page (flip cards + bios)
  coaching/page.tsx               # Services/pricing page
  contact/page.tsx                # Contact form
  members/
    login/page.tsx                # Members login
    page.tsx                      # Members hub (practices, race calendar, partners, gear)
  events/
    im-oh-preview/page.tsx        # IRONMAN Ohio preview event page
    indoor-training/page.tsx      # Indoor training event page
    swim-clinic/page.tsx          # Swim clinic event page
  api/
    contact/route.ts              # Contact form handler
    members-auth/route.ts         # Sets members_auth cookie
    members-logout/route.ts       # Clears cookie

src/components/
  HeroSection.tsx                 # Homepage hero with cycling background videos
  Navbar.tsx                      # Top nav with Community dropdown
  Footer.tsx
  AnimatedSection.tsx             # Scroll-triggered fade-in wrapper
  AnimatedCounter.tsx             # Animated number counter
  RaceCountdown.tsx               # Countdown to next race in members area
  coaches/
    CoachFlipCards.tsx            # Click-to-expand grid for coaches page ← main UI
    CoachOrbitCard.tsx            # Old orbit visualization (kept, unused on coaches page)
    orbitData.ts                  # Data for both coaches' stat cards

src/proxy.ts                      # Route protection for /members/* (Next.js proxy convention)
```

---

## Key Public Assets (`public/`)

```
triiq-logo.png                    # Main logo
usat-main-logo.svg                # USA Triathlon logo (used on coaches page)
swim.mp4 / bike.mp4 / run.mp4    # Hero background videos (custom-edited blends)
swim_v1.mp4                       # Backup of original swim video
coaches/
  kendra.jpg                      # Coach Kendra photo
  pete.jpg                        # Coach Pete photo (EXIF orientation 6 — portrait when displayed)
  pete/                           # Pete's stat card background images
  kendra/                         # Kendra's stat card background images
partners/                         # Partner logos (Zealios, Orca, FINIS, Xterra, ZYM, NCM, Jakroo, SquadLocker)
gear/
  jakroo-kit-2026.jpg             # 2026 kit launch image (Jakroo tile background)
  squadlocker-tank-2026.png       # Pink tank top (Squad Locker tile background)
practices/                        # Background photos for group practice cards
```

---

## Coaches Page — CoachFlipCards

The coaches page uses a **3×3 click-to-expand grid** per coach:
- 8 surrounding stat cards (from `orbitData.ts`, "life" item filtered out)
- 1 large center cell with the coach photo
- Clicking any card expands a full-bleed overlay over the entire grid
- Click-only (no hover triggers) — works on mobile too
- Overlay is fully opaque (`bg-slate-950`) with the card's background image at 65% opacity

Coach data (bio, credentials, stats) is defined inline at the top of `src/app/coaches/page.tsx`.

---

## Members Area

Gated behind a cookie. Athletes go to `/members/login`, enter the team password, get a cookie, and are redirected to `/members`.

**Tabs:**
1. **Group Practices** — 4 practice cards with background photos
2. **Race Calendar** — 2026 race list; races with `url: "#"` render as plain divs (no link). Others show "Race site ↗" with ExternalLink icon.
3. **Partnerships** — 6 partner discount cards. On mobile, cards **glow with their accent color when 65% visible in the viewport** (framer-motion `useInView`). Desktop uses hover.
4. **Gear Store** — Squad Locker + Jakroo tiles, both with product image backgrounds.

---

## Hero Videos

Three custom-edited clips in `public/`:
- **swim.mp4** — Pexels 12204020 (8s) crossfaded into Pexels 35837093 (aerial triathlon swim)
- **bike.mp4** — Pexels 32900990 (race footage, first ~19s at 2× speed) crossfaded into Pexels 2066560
- **run.mp4** — Pexels 3125907 (6s) crossfaded into Pexels 27902485 (second half, 11–22s)

Videos auto-advance on end. Clicking Swim/Bike/Run tabs jumps to that clip. Initial page load fades video in over 1.4s.

---

## Common Tasks

**Add/update a race in the calendar:**
Edit the `races` array in `src/app/members/page.tsx`. Set `url: "#"` if there's no website yet.

**Update partner discount codes:**
Edit the `partners` array in `src/app/members/page.tsx`.

**Update coach bio/credentials:**
Edit the `coaches` array in `src/app/coaches/page.tsx`.

**Add a new orbit/flip card stat for a coach:**
Edit `src/components/coaches/orbitData.ts`. Add background images to `public/coaches/pete/` or `public/coaches/kendra/`.

**Push changes to production:**
```bash
git add <files>
git commit -m "description"
git push origin main
```

---

## Notes & Gotchas

- **Pete's photo** (`pete.jpg`) has EXIF orientation 6 — browsers display it as portrait even though the file is stored landscape. The browser handles the rotation automatically.
- **SSH remote** — must have SSH keys configured for GitHub on the machine. Test with `ssh -T git@github.com`.
- **`.env.local`** is not in git — must be recreated manually on any new machine.
- **`src/proxy.ts`** replaces the old `middleware.ts` — Next.js renamed the convention. The exported function must be named `proxy`.
- **Tailwind v4** — config is in `tailwind.config.ts` if custom classes are needed. Some older Tailwind v3 patterns may not work.
- The `CoachOrbitCard.tsx` component still exists but is not used on the coaches page — it was replaced by `CoachFlipCards.tsx`. It's kept in case it's wanted elsewhere.
