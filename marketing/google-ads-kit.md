# Kuddle Super Meal — Google Ads Launch Kit

**Brand:** Mr Healthybite · **Product:** Kuddle Super Meal (Garlic Paprika + Jalapeño)
**Goal:** Online sales · **Total budget:** ₹700/day (~₹21,000/mo)
**Geography:** Metro cities · **Landing:** nutriwow.in product pages
**Campaign types:** Search (₹400/day) + Performance Max (₹300/day)

> ⚠️ These files are a ready-to-import kit. You still need to log into your own
> Google Ads account, add billing, import/paste, set up conversion tracking, and
> click **Publish**. Nothing here is live until you do.

---

## 🎯 Direct sales fast-track (read this first)

You want **direct sales**, not just traffic. The highest-converting Google setup for an online store is **Shopping ads driven by a product feed** — your pack photo + "₹225" shows right in Google results, so clicks are buyers, not browsers.

**Priority order for sales:**
1. **Google Merchant Center** → upload `kuddle-merchant-feed.csv` (both flavours, ready).
   - Verify & claim `nutriwow.in`, set India / INR, add shipping & return policy.
   - ⚠️ Feed price **must exactly match** the nutriwow product page (₹225 sale / ₹477 MRP). Fix the CSV if the live page differs, or Shopping will disapprove.
2. **Conversion tracking** (Section 0) — non-negotiable for sales bidding.
3. **Performance Max + feed** → this becomes a Shopping-first sales engine (product images, prices, remarketing to cart-abandoners) all in one.
4. **Search campaign** → captures people already typing "ready to eat protein meal" etc.

Run PMax(+feed) and Search together. Once you have ~15–30 tracked sales, switch both to conversion-value bidding to scale profitably.

---

## Landing URLs

| Flavour | URL |
|---------|-----|
| Garlic Paprika | https://www.nutriwow.in/products/kuddle-super-meal-garlic-paprika-ready-to-eat-high-protein-meal-16g-protein-no-preservatives-free-from-vegetable-oil-225g |
| Jalapeño | https://www.nutriwow.in/products/kuddle-super-meal-jalapeno-ready-to-eat-high-protein-meal-16g-protein-no-preservatives-free-from-vegetable-oil-225g |

Use the final URL that matches the ad group flavour; for generic ad groups, point to the Garlic Paprika page (bestseller) or a Kuddle collection page.

---

## 0. Before you launch — Conversion tracking (do this FIRST)

Ads that can't measure purchases waste money. Because sales happen on **nutriwow.in** (your store), the Google tag must live there.

1. Google Ads → **Goals → Conversions → New conversion action → Website**.
2. Create **"Purchase"** (category: Purchase, value: use transaction value, count: One).
3. Also create **"Begin checkout"** and **"Add to cart"** (secondary, for optimisation data).
4. Install the **Google tag (gtag.js)** or **Google Tag Manager** on nutriwow.in and fire the Purchase event on the order-confirmation/thank-you page.
   - Easiest path: connect **GA4** on nutriwow.in → mark `purchase` as a key event → **import** it into Google Ads (Goals → Conversions → Import → GA4).
5. Verify with **Google Tag Assistant** before spending.

If you truly cannot add tags to nutriwow.in yet, launch on **Maximize Clicks** (see bidding) and switch to conversion bidding once tracking is live.

---

## 1. Account structure

```
Kuddle Super Meal (Account)
├── Campaign: Kuddle | Search | Metros      (₹400/day)
│   ├── AG: Brand
│   ├── AG: Ready-to-Eat High Protein
│   ├── AG: Paneer / Veg Instant Meal
│   └── AG: Ready-to-Eat Meals (generic)
└── Campaign: Kuddle | PMax | Metros         (₹300/day)
    └── Asset Group: Kuddle Super Meal
```

### Common campaign settings (both)
- **Networks (Search):** Search only. **Turn OFF** "Search partners" and "Display network" at start.
- **Locations:** *Presence: People in your targeted locations* (not "interest"). Target metros:
  Delhi NCR (Delhi, Gurugram, Noida), Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Chandigarh.
- **Language:** English + Hindi.
- **Ad schedule:** All week; nudge bids +10–20% for 12:00–15:00 and 19:00–22:00 (meal times).
- **Devices:** All; expect mobile to dominate.

---

## 2. Search campaign — Keywords

Match types: start with **Phrase** + **Exact**. Add a few **Broad** only once conversion tracking + smart bidding are on. (All keywords are in `kuddle-keywords.csv` for one-click Google Ads Editor import.)

### AG: Brand
- [kuddle super meal]
- "kuddle super meal"
- [kuddle meal]
- "mr healthybite kuddle"
- "kuddle ready to eat"

### AG: Ready-to-Eat High Protein
- "ready to eat high protein meal"
- "high protein ready to eat meal"
- "ready to eat protein meal"
- "instant high protein meal"
- "high protein meal delivery"

### AG: Paneer / Veg Instant Meal
- "ready to eat paneer meal"
- "instant paneer meal"
- "ready to eat veg meal"
- "instant veg meal online"
- "healthy ready to eat meal"

### AG: Ready-to-Eat Meals (generic)
- "ready to eat meals online"
- "ready to eat food online"
- "instant meal online"
- "ready to eat meals india"
- "ready meal no cooking"

### Negative keywords (add at campaign level)
`free`, `recipe`, `recipes`, `how to make`, `homemade`, `jobs`, `job`, `chicken`,
`mutton`, `non veg`, `egg`, `buffet`, `restaurant near me`, `tiffin service`,
`calories`, `weight loss diet plan`, `wholesale`, `distributor`, `franchise`, `pdf`

---

## 3. Responsive Search Ad copy (use in every ad group)

Paste into one RSA per ad group. Pin **Headline 1 = flavour/brand** where relevant.

**Headlines (≤30 chars each):**
1. Kuddle Super Meal
2. 16g Protein, Ready to Eat
3. Healthy Meal in Minutes
4. Just ₹225 – Launch Offer
5. No Cooking, No Fridge
6. 100% Natural, No Additives
7. Paneer-Packed Super Meal
8. Ready-to-Eat Protein Meal
9. Heat & Eat in 3 Minutes
10. Garlic Paprika & Jalapeño
11. India's 1st Retort Meal
12. 16g Protein Per Pack
13. No Preservatives, All Real
14. Order Kuddle Online
15. High-Protein Veg Meal

**Descriptions (≤90 chars each):**
1. Chef-crafted paneer meal with 16g protein. Ready to eat in minutes. Order at ₹225.
2. 100% natural, no preservatives, no vegetable oil. Two bold flavours. Shop online now.
3. No cooking, no fridge. Shelf-stable 12 months with retort technology. Try Kuddle.
4. Launch offer ₹225 (MRP ₹477). High-protein ready-to-eat veg meal. Order today.

**Display path:** `/kuddle` `/super-meal`

### Flavour ad variants (optional, add as 2nd RSA per flavour ad group)
- Garlic Paprika HL: "Kuddle Garlic Paprika", "Smoky Garlic Paprika Meal"
- Jalapeño HL: "Kuddle Jalapeño Meal", "Zesty Jalapeño Protein Meal"

---

## 4. Assets / Extensions (add at campaign level)

**Sitelinks** (text ≤25, desc ≤35):
| Text | Description 1 | Description 2 | URL |
|------|---------------|---------------|-----|
| Garlic Paprika ₹225 | 16g protein, ready to eat | Smoky garlic paprika broth | Garlic Paprika URL |
| Jalapeño ₹225 | 16g protein, ready to eat | Zesty green jalapeño kick | Jalapeño URL |
| 100% Natural Meal | No preservatives, no veg oil | Real paneer & veggies | Garlic Paprika URL |
| Ready in 3 Minutes | Heat & eat, no cooking | 12-month shelf life | Jalapeño URL |

**Callouts (≤25):** 16g Protein Per Pack · No Preservatives · Ready in 3 Minutes · 100% Vegetarian · Free From Veg Oil · Launch Price ₹225 · 12-Month Shelf Life

**Structured snippets:**
- Header **Styles**: Garlic Paprika, Jalapeño
- Header **Brands**: Kuddle, Mr Healthybite

**Other:** Add **Price** asset (Garlic Paprika ₹225, Jalapeño ₹225), **Image** assets (use pack shots), and **Call**/**Business name** ("Mr Healthybite") if available.

---

## 5. Performance Max — Asset group "Kuddle Super Meal"

**Final URL:** Garlic Paprika product page (enable "Final URL expansion" OFF at start so it stays on-message).

**Images** (from this repo's `images/` folder — upload these):
- Landscape 1.91:1: `images/garlic-paprika/04.jpg`, `images/jalapeno/05.jpg`
- Square 1:1: `images/garlic-paprika/02.jpg`, `images/jalapeno/01.jpg`
- Portrait 4:5: `images/garlic-paprika/05.jpg` (lifestyle)
- Logo 1:1: `images/brand/favicon-mrhb.png` · Logo 4:1: `images/brand/foodondoor-logo.png`

**Headlines (≤30):** reuse the 15 above.
**Long headline (≤90):** "Kuddle Super Meal — 16g protein, ready-to-eat paneer meal at ₹225 launch price."
**Descriptions (≤90):** reuse the 4 above.
**Business name:** Mr Healthybite
**Video:** optional — if you have a YouTube clip, add it; otherwise Google auto-generates one.
**Call to action:** Shop Now.

**Audience signal (custom segment):**
- Search terms: high protein meal, ready to eat meal, instant paneer meal, protein food online
- In-market: Food Delivery Services, Health & Wellness Foods
- Demographics: 22–45, urban metros

---

## 6. Budget & bidding

| Campaign | Daily budget | Start bidding | Switch to (after ~15–30 conversions) |
|----------|-------------|---------------|--------------------------------------|
| Search | ₹400 | Maximize Clicks, max CPC cap ₹18 | Maximize Conversions → then tCPA ₹120–150 |
| PMax | ₹300 | Maximize Conversions | Max Conversion Value, tROAS once stable |

- Don't touch bidding for the first **7–10 days** — let it learn.
- Review search terms report twice a week → add negatives.
- Target CPA benchmark: with ₹225 AOV, aim CPA under ~₹120–150 to stay profitable (adjust once you know margins).

---

## 7. Import steps (fastest path)

1. Download **Google Ads Editor** (free desktop app).
2. Sign in → get your account.
3. **Account → Import → From file** → select `kuddle-keywords.csv`.
4. Review the drafted Search campaign, ad groups & keywords.
5. Add the RSA copy (Section 3) + extensions (Section 4) in Editor or the web UI.
6. **Post** changes.
7. Build the **PMax** campaign in the web UI (PMax can't be CSV-imported) using Section 5.
8. Turn on conversion tracking (Section 0), set billing, then **enable** campaigns.

---

*Prepared as a starter kit. Tune keywords, copy, and bids from real performance data after 1–2 weeks.*
