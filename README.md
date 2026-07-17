# 🍲 Kuddle Super Meal — Mr Healthybite

A responsive single-page landing site for **Kuddle Super Meal** by Mr Healthybite,
featuring the two flavours **Garlic Paprika** and **Jalapeño**. Built as a static
site with plain HTML, CSS, and JavaScript (no build step), ready to deploy on **Vercel**.

## Highlights on the page

- Two-flavour product showcase (Garlic Paprika + Jalapeño)
- 16g protein per pack · 225g · 100% natural · no preservatives
- Retort technology / ready-to-eat messaging
- Benefits, how-to-prepare, nutrition facts, testimonials, FAQ, email capture

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page markup |
| `styles.css` | All styling (responsive, brand colours, reduced-motion aware) |
| `script.js` | Nav toggle, footer year, demo signup form |
| `vercel.json` | Static hosting config + security headers |
| `images/` | Product photos (see `images/README.md` for filenames) |

## ⚠️ Add your product photos

The page references four image files. Add them to `images/` using the exact
filenames listed in [`images/README.md`](images/README.md). Until then, the page
shows emoji fallbacks so it never looks broken.

## Run locally

Open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Deploy to Vercel

Zero-config static site.

**Dashboard:** Import the repo at [vercel.com/new](https://vercel.com/new).
Framework preset **Other**; no build command or output directory needed.

**CLI:**

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

## Notes

The signup form is front-end only (no backend); it validates the email and shows
a confirmation message.
