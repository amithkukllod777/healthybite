# 🥗 HealthyBite

A responsive single-page marketing landing page for **HealthyBite** — a fictional
fresh-meal delivery service. Built as a static site with plain HTML, CSS, and
JavaScript (no build step), ready to deploy on **Vercel**.

## Sections

- Sticky header with mobile nav
- Hero with floating meal cards
- "As featured in" trust bar
- How it works (3 steps)
- Weekly menu grid
- Pricing plans
- Testimonials
- FAQ (accordion)
- Email signup call-to-action
- Footer

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page markup |
| `styles.css` | All styling (responsive, dark-footer, reduced-motion aware) |
| `script.js` | Nav toggle, footer year, demo signup form |
| `vercel.json` | Static hosting config + security headers |

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Deploy to Vercel

This is a zero-config static site.

**Option A — Dashboard:** Import the repo at [vercel.com/new](https://vercel.com/new).
Leave framework preset as **Other**; no build command or output directory needed.

**Option B — CLI:**

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

## Notes

The signup form is front-end only (no backend); it validates the email and shows
a confirmation message. Emojis are used as lightweight imagery so the page stays
fully self-contained with no external assets.
