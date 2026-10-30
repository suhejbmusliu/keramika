# Keramika

One-page website for KERAMIKA D.O.O., a stone-processing company from
Preševo, Serbia (marble and granite: staircases, kitchens, fireplaces,
tiles; since 2002).

The site is in **English** (fallback), **Albanian** and **Serbian**. The
language is picked from the browser on the first visit and can be switched
in the navbar; the choice is saved in `localStorage`.

---

## What's inside

Sections, top to bottom (`src/App.tsx`):

- Navbar with section links, language switcher and a quote button
- Hero slider (three slides), philosophy headline, about with stats
- Our craft, rooms, materials, process steps
- Gallery with filters (all / latest work / ceramics) and a lightbox
- Projects, testimonials, FAQ
- Contact: phone (`tel:`) and email (`mailto:`) links
- Footer
- **Quote request:** a floating button opens a form (name, contact,
  project). Sending it opens the visitor's email app with the message
  filled in. Nothing is sent from the site itself.

There is no backend.

---

## Tech stack

| Area | Tool |
|---|---|
| Build | Vite 8 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | Motion (`motion/react`) |
| Icons | lucide-react |
| Translations | i18next + react-i18next + browser language detector |
| Fonts | Inter and JetBrains Mono (Google Fonts, linked in `index.html`) |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

No environment variables are needed.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Type check (`tsc -b`) + production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint |

---

## Project structure

```
src/
  App.tsx                page layout: all sections + quote modal state
  main.tsx               entry point
  index.css              Tailwind + theme colours
  components/            one file per section (Hero, Gallery, FAQ …),
                         QuoteCTA (floating button + form), Reveal (scroll animation)
  hooks/useReveal.ts     scroll-reveal hook
  i18n/
    index.ts             i18next setup (en, sq, sr)
    locales/en.ts        English text (also the fallback)
    locales/sq.ts        Albanian
    locales/sr.ts        Serbian
public/
  images/                banners, about/contact images, logo, icons
  gallery/               gallery photos
index.html               page title, description, favicon, fonts
```

---

## Editing content

- **Text:** the three files in `src/i18n/locales/`. Keep the same keys in
  all three.
- **Hero slides:** `hero.slides` in each locale file (title, subtitle,
  image path).
- **Phone numbers and emails:** `src/components/Contact.tsx`. The quote form
  sends to the address in `MAIL_TO` at the top of
  `src/components/QuoteCTA.tsx`.
- **Gallery photos:** `public/gallery/` and the `ITEMS` list in
  `src/components/Gallery.tsx`.

---

## Deployment

`npm run build` writes a static site to `dist/`. There is no hosting config
in the repo, so any static host works (Vercel, Netlify, or plain file
hosting).

The older plain HTML version of this site is in a separate repository,
`Keramika-pr`.
