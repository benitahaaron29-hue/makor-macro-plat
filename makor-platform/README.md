# Makor Securities · Morning Intelligence Platform

Institutional FX & macro briefing workspace — a Next.js application built around the Makor Securities visual identity. This repository contains the deployment-ready prototype.

> **Internal product · prototype · v.1.1**
> *Total Independence, Outstanding Execution.*

---

## Stack

- **Next.js** 15 (App Router)
- **React** 18
- **Tailwind CSS** 3 (scaffolded; the platform itself uses inline styles by design — Tailwind is wired in for any future extensions)
- **lucide-react** for iconography
- **Lora** + **Inter** via Google Fonts

The application is a single-page client component (`components/MakorPlatform.jsx`) holding all four routes — Dashboard, Archive, Sources, and Briefing Viewer — with internal state-based navigation. No backend, no authentication; everything renders statically and runs entirely in the browser.

---

## Project Structure

```
makor-platform/
├── app/
│   ├── globals.css          # global resets + Tailwind base
│   ├── layout.jsx           # root HTML shell + metadata + viewport
│   └── page.jsx             # mounts <MakorPlatform />
├── components/
│   └── MakorPlatform.jsx    # the entire platform (single 'use client' component)
├── public/
│   └── logo-makor.jpg       # Makor Securities logo asset
├── .env.example             # env template (no secrets required at present)
├── .gitignore
├── .nvmrc                   # pins Node 20 for Vercel
├── jsconfig.json            # path aliasing — '@/components/...'
├── next.config.mjs          # minimal production config
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js       # Makor brand tokens exposed as Tailwind classes
└── vercel.json              # framework hint + security headers
```

---

## Local Development

Requires Node 18.18+ (Node 20 recommended).

```bash
# Install dependencies
npm install

# Start the dev server on http://localhost:3000
npm run dev

# Production build
npm run build
npm run start
```

---

## Deploy to Vercel

### Option A — One-click via the Vercel dashboard

1. Push this repository to GitHub (see *GitHub Setup* below).
2. Go to <https://vercel.com/new> and import the GitHub repository.
3. Vercel auto-detects Next.js. Leave all defaults (the `vercel.json` in this repo handles framework + security headers).
4. Click **Deploy**. The first build takes ~1–2 minutes.
5. Vercel will assign a URL like `makor-platform-xxx.vercel.app`. Add a custom domain in *Project → Settings → Domains* if needed.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel        # preview deployment
vercel --prod # production deployment
```

The CLI will prompt for project name on first run; accept defaults.

### Environment variables

The prototype requires no environment variables. If you later integrate APIs, add them in *Vercel → Settings → Environment Variables* and copy the relevant keys from `.env.example`.

---

## GitHub Setup

```bash
# In the project root
git init
git add .
git commit -m "Initial commit — Makor Morning Intelligence Platform v1.1"

# Create a GitHub repo (private recommended for an internal product)
# then:
git remote add origin https://github.com/<your-org>/makor-platform.git
git branch -M main
git push -u origin main
```

---

## Routing

The platform uses internal React state (no Next.js dynamic routes) for navigation between four views:

| Route state    | Component             | Entry points                                       |
| -------------- | --------------------- | -------------------------------------------------- |
| `dashboard`    | `Dashboard`           | Sidebar · default landing                          |
| `archive`      | `ArchivePage`         | Sidebar                                            |
| `sources`      | `SourcesPage`         | Sidebar                                            |
| `briefing`     | `BriefingViewerPage`  | "Generate Briefing" CTA · "Open" links · archive items |

Adding a real `/briefing/[id]` route via the App Router is a future-proof refactor; the prototype intentionally keeps everything client-side for ease of demo and presentation.

---

## Notes for Production

- **Responsive behaviour.** The platform is designed for an executive-desktop context. On viewports under 1280px, `globals.css` allows horizontal scroll rather than reflowing the layout — the institutional design is preserved exactly. If a tablet/mobile experience is needed in future, build it as a separate breakpoint variant rather than reflowing the desktop view.
- **Logo asset.** The Makor logo is served from `/public/logo-makor.jpg` and rendered by the `<MakorLogo>` component using CSS `mix-blend-mode` and `filter` to adapt to dark or light surfaces. No retouching required.
- **Brand tokens.** Colours, typography, and spacing constants are defined as module-level constants (`C`, `fontSerif`, `fontSans`) inside `MakorPlatform.jsx`. They are also mirrored in `tailwind.config.js` under the `makor` namespace for any future Tailwind-based extensions.
- **No client-side analytics or trackers** are included by default. Add Vercel Analytics via *Project → Analytics → Enable* if desired.

---

## License

Internal Makor Group property. Not for redistribution.

© 2026 Makor Group · FCA Regulation 625054
