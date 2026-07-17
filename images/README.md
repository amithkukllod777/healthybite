# Product images

Drop your product photos into this folder using these **exact filenames**.
The landing page references them directly; until they're added, the page shows
tasteful emoji fallbacks so nothing looks broken.

| Filename | What to use | Where it shows |
|----------|-------------|----------------|
| `garlic-paprika.png` | Garlic Paprika pack — front (pink box) | Flavours section card |
| `garlic-paprika-bowl.png` | Garlic Paprika served in a bowl / lifestyle shot | "Power up with paneer" section |
| `jalapeno.png` | Jalapeño pack — front (green box) | Flavours section card |
| `jalapeno-bowl.png` | Jalapeño served in a bowl / lifestyle shot | Hero (top of page) |

## Tips
- Square-ish or 4:3 images look best. The site crops with `object-fit: cover`.
- `.png` or `.jpg` both work — if you use `.jpg`, either rename to `.png`
  or update the `src` paths in `index.html`.
- Keep files reasonably small (ideally under ~400 KB each) for fast loading.
