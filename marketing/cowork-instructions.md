# Cowork Task — Set up Google Ads for Kuddle Super Meal (direct sales)

Paste everything below into Cowork (or any agent with browser access to my Google accounts).

---

## ROLE & GOAL
You are setting up Google Ads campaigns to drive **direct online sales** of **Kuddle Super Meal** (brand: Mr Healthybite) sold on **nutriwow.in**. Two flavours: Garlic Paprika and Jalapeño. Work in MY Google Ads + Google Merchant Center accounts (I am logged in). **Do NOT spend money or set campaigns "live" until I explicitly approve** — build everything and leave campaigns **PAUSED**, then show me a summary to review.

## KEY FACTS
- Product: ready-to-eat, high-protein (16g/pack) veg paneer meal, 225g, no preservatives, free from vegetable oil, retort technology, 6-month shelf life, 100% vegetarian.
- Price: **₹225** launch price (MRP ₹477). ⚠️ Confirm this matches the live nutriwow page before using in the feed.
- Total budget: **₹700/day** → Search ₹400/day + Performance Max ₹300/day.
- Geography: **Metro cities** — Delhi NCR (Delhi, Gurugram, Noida), Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Chandigarh.
- Languages: English + Hindi.

## LANDING URLs (ads must go here)
- Garlic Paprika: https://www.nutriwow.in/products/kuddle-super-meal-garlic-paprika-ready-to-eat-high-protein-meal-16g-protein-no-preservatives-free-from-vegetable-oil-225g
- Jalapeño: https://www.nutriwow.in/products/kuddle-super-meal-jalapeno-ready-to-eat-high-protein-meal-16g-protein-no-preservatives-free-from-vegetable-oil-225g

## READY-MADE FILES (download from my GitHub repo `amithkukllod777/healthybite`, folder `marketing/`)
- `kuddle-merchant-feed.csv` — product feed for Merchant Center (both flavours)
- `kuddle-keywords.csv` — Search keywords (Google Ads Editor import)
- `kuddle-negative-keywords.csv` — negative keywords
- `google-ads-kit.md` — full reference with all ad copy & extensions
Raw URL pattern: `https://raw.githubusercontent.com/amithkukllod777/healthybite/main/marketing/<file>`

---

## STEPS

### STEP 1 — Google Merchant Center (for Shopping / direct sales)
1. Open Merchant Center. Create/confirm account, country **India**, currency **INR**.
2. Verify & claim the website **nutriwow.in** (if I don't control it, tell me — we may need Shopping without a verified store, or use PMax without feed).
3. Add business info: shipping (as per nutriwow policy) and return policy.
4. Products → add a **feed** → method **Upload** → upload `kuddle-merchant-feed.csv`.
5. Fix any disapprovals (most common: price mismatch vs landing page, or missing GTIN → set "identifier exists = no", which the file already does).

### STEP 2 — Conversion tracking (do before spending)
1. Google Ads → Goals → Conversions → **New conversion action → Website**.
2. Create **Purchase** (category Purchase, value = order value, count One). Also add **Begin checkout** + **Add to cart** as secondary.
3. Install Google tag / GTM on nutriwow.in and fire `purchase` on the order-confirmation page. Easiest: connect **GA4** on nutriwow.in, mark `purchase` as key event, and **Import** it into Google Ads.
4. Verify with **Google Tag Assistant**. If tags can't be added to nutriwow.in, tell me — we'll start on Maximize Clicks.

### STEP 3 — Search campaign "Kuddle | Search | Metros" (₹400/day)
1. New campaign → objective **Sales** → **Search** → website.
2. Budget ₹400/day. Networks: **Search only** (turn OFF Search Partners + Display).
3. Locations: the metro list above, setting **"Presence: people in your targeted locations."** Languages English + Hindi.
4. Bidding: start **Maximize Clicks**, max CPC cap **₹18**. (Switch to Maximize Conversions after ~15–30 conversions.)
5. Create 4 ad groups and import keywords from `kuddle-keywords.csv`:
   Brand · Ready-to-Eat High Protein · Paneer / Veg Instant Meal · Ready-to-Eat Meals.
6. Add campaign **negative keywords** from `kuddle-negative-keywords.csv`.
7. In each ad group create **one Responsive Search Ad** using headlines + descriptions from `google-ads-kit.md` (Section 3). Final URL = the flavour page (generic ad groups → Garlic Paprika page). Display path `/kuddle` `/super-meal`.
8. Add assets (from `google-ads-kit.md` Section 4): **Sitelinks, Callouts, Structured snippets, Price, Image, Business name (Mr Healthybite)**.
9. Leave campaign **PAUSED**.

### STEP 4 — Performance Max campaign "Kuddle | PMax | Metros" (₹300/day)
1. New campaign → **Sales** → **Performance Max**. Link the Merchant Center feed if Step 1 succeeded.
2. Budget ₹300/day. Bidding **Maximize Conversions** (needs Step 2 tracking).
3. Locations + languages same as Search.
4. Asset group "Kuddle Super Meal": upload pack/lifestyle images from repo `images/` (garlic-paprika/04.jpg, 02.jpg, 05.jpg; jalapeno/05.jpg, 01.jpg), logo `images/brand/favicon-mrhb.png`, headlines/descriptions from `google-ads-kit.md` Section 5, long headline + business name. Turn **Final URL expansion OFF** to stay on-message.
5. Audience signal: custom segment (searches: high protein meal, ready to eat meal, instant paneer meal) + in-market Food Delivery / Health foods; demographics 22–45.
6. Leave campaign **PAUSED**.

### STEP 5 — Report back (do NOT enable yet)
Give me: Merchant Center feed status (approved/disapproved + reasons), conversion tracking status, both campaigns built & paused, and anything blocked (e.g. site verification, tag access). I will review, add billing if needed, and tell you to **enable**.

## GUARDRAILS
- Never enable campaigns or start spend without my explicit "go".
- Don't change bidding for the first 7–10 days after launch.
- Don't add billing/payment info unless I tell you to.
- If nutriwow.in can't be verified/tagged, pause and ask me — don't work around it silently.
