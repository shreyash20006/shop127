# Escape Clothing 👣 - Premium Streetwear Shopify Theme

A highly polished, premium Shopify Online Store 2.0 theme designed for **Escape Clothing** — a streetwear fashion brand from Nagpur, India. Built with a dark luxury streetwear aesthetic inspired by Zara India, Represent Clothing, and The Souled Store.

## Theme Features

- **Dark Streetwear Aesthetic**: Rich near-black `#0A0A0A` background with clean, high-contrast layouts, sharp border edges (no round buttons), and vivid `#FF3B30` red drop accents.
- **Scroll Reveal Animations**: Performant scroll-based fade and translate effects using the native Intersection Observer API (no external libraries).
- **Sticky Headroom Header**: Seamless fixed header that shifts background opacity and blur on scroll, hiding on scroll down, and revealing on scroll up.
- **Dynamic 999 Drop Countdown**: Built-in, Javascript-driven drop countdown timer with remaining stock urgency tickers.
- **AJAX Side Cart Drawer**: Instant item adjustments, coupon applies, and a live free shipping progress bar that triggers green at ₹999.
- **Souled Store Level Product Page**: Double-image thumbnail switchers, lightbox image zooms, color swatches, quick size selections, size guide popups, and delivery forecast estimators.

## Shopify Collections to Create
Create these collections in your Shopify Admin with these exact handles:
1. `new-arrivals` — Loaded on the homepage top grid.
2. `best-sellers` — Showcased on the homepage bestseller grid.
3. `999-drop` — Used for the combo promotion banner.
4. `jerseys`
5. `oversized-tees`
6. `shirts`
7. `bottoms`
8. `all`

## Installation Steps (GitHub &rarr; Shopify)

1. **Upload Theme Folder**:
   - Zip the `escape-clothing-theme` directory.
   - Go to your **Shopify Admin** &rarr; **Online Store** &rarr; **Themes**.
   - Click **Add Theme** &rarr; **Upload zip file**.
2. **GitHub Integration (Recommended)**:
   - Push this repository to a private GitHub repository named `escape-clothing-theme`.
   - Go to **Shopify Themes** &rarr; **Add Theme** &rarr; **Connect from GitHub**.
   - Connect the repository and select branch `main`. Any future commits will automatically deploy to Shopify.

## Required / Recommended Apps (Free)

| App Name | Purpose | Integration Liquid Hooks |
|---|---|---|
| **Judge.me** | Product reviews and ratings | `{% render 'judge-me-product-review-widget' %}` |
| **Wishlist Hero** | Customer wishlist saves | Handled via wishlist triggers in header & product cards |
| **AfterShip** | Live logistics order tracking | Integrates into the Track Order page template |
| **Cashfree Payments** | Payment gateway checkout | Handled directly during Shopify checkout checkout redirections |
| **Elfsight Instagram** | Social grid feed | Optional, theme includes native static grid upload |
