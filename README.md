# Escape Clothing 👣 - Premium Streetwear Shopify Theme

A highly polished, production-ready Shopify Online Store 2.0 theme designed for **Escape Clothing** — a streetwear fashion brand. Built with a dark luxury streetwear aesthetic inspired by Zara India, Represent Clothing, and The Souled Store.

---

## Project Structure

This repository follows the official Shopify OS 2.0 theme structure:

```text
escape-clothing-theme/
├── layout/
│   └── theme.liquid                  # Core page layout, Tailwind configuration, global scripts
├── templates/
│   ├── 404.json                      # 404 Not Found Page Template
│   ├── cart.json                     # Cart Drawer & Cart Page Templates
│   ├── collection.json               # Product Collection Catalog Page
│   ├── index.json                    # Homepage Layout Configuration
│   ├── page.json                     # Default Page Template
│   ├── page.contact.json             # Contact Page Template
│   ├── page.faq.json                 # FAQ Page Template
│   ├── page.size-guide.json          # Size Guide Page Template
│   ├── page.track-order.json         # Order Tracking Template
│   ├── product.json                  # Product Details Page Template
│   ├── search.json                   # Search Results Page Template
│   └── customers/                    # Customer Management Templates
│       ├── account.json              # Customer Account Dashboard
│       ├── order.json                # Customer Order Details
│       ├── login.json                # Customer Log-in
│       ├── register.json             # Customer Registration
│       └── addresses.json            # Address Management
├── sections/
│   ├── header.liquid                 # Navigation bar (Glassmorphic)
│   ├── footer.liquid                 # 5-column brand footer
│   ├── product-main.liquid           # Product main content (Buy buttons + WhatsApp button)
│   ├── main-account.liquid           # Customer dashboard layouts
│   ├── main-order.liquid             # Order history details
│   ├── main-login.liquid             # Login forms
│   ├── main-register.liquid          # Create account forms
│   ├── main-addresses.liquid         # Edit/Delete Address layouts
│   ├── collection-korean-jerseys.liquid    # Dedicated Jersey Drop Section
│   ├── collection-streetwear-tops.liquid   # Dedicated Tops Section
│   ├── collection-box-fit-tshirts.liquid   # Dedicated Tee Drop Section
│   ├── collection-polo-tshirts.liquid      # Dedicated Polo Section
│   ├── collection-cargos.liquid            # Dedicated Cargos Section
│   ├── collection-jeans.liquid             # Dedicated Jeans Section
│   ├── collection-track-pants.liquid       # Dedicated Track Pants Section
│   ├── collection-new-arrivals.liquid      # Dedicated New Arrivals Section
│   ├── collection-best-sellers.liquid       # Dedicated Bestsellers Section
│   └── ...                           # Other modular sections (Hero, Reviews, etc.)
├── snippets/
│   ├── product-card.liquid           # Reusable product grid item with hover buy action
│   ├── size-chart-popup.liquid       # Interactive modal size guides
│   ├── whatsapp-button.liquid        # Floating Whatsapp widget
│   └── ...                           # Other utility fragments
├── assets/
│   ├── theme.css                     # Primary styles override
│   ├── theme.js                      # Core interactive javascript engines
│   └── ...
├── config/
│   ├── settings_data.json            # Dynamic Customizer Defaults
│   └── settings_schema.json           # Theme Customizer Fields Settings
└── locales/
    └── en.default.json               # Language files
```

---

## Dynamic Escape Clothing Sections

We have created individual dynamic sections ready to drag and drop anywhere on the store:
1. **Korean Jerseys**: Displays oversized jerseys (defaults to `korean-jerseys` collection).
2. **Streetwear Tops**: Showcases hoodies and sweaters (defaults to `streetwear-tops`).
3. **Box Fit T-Shirts**: Showcases oversized graphic tees (defaults to `box-fit-tshirts`).
4. **Polo T-Shirts**: Shows knitted collar items (defaults to `polo-tshirts`).
5. **Cargos**: Displays utility bottoms (defaults to `cargos`).
6. **Jeans**: Displays baggy denim fits (defaults to `jeans`).
7. **Track Pants**: Displays comfort joggers (defaults to `track-pants`).
8. **New Arrivals**: Loaded on homepage (defaults to `new-arrivals`).
9. **Best Sellers**: Loaded on homepage (defaults to `best-sellers`).

---

## Customer Dashboard

Logged-in customers can track their complete order history, verify payment status, view fulfillment tags, manage default addresses, and register new addresses.

---

## Theme Settings Customization

You can customize the following parameters directly in the **Shopify Theme Editor (Customizer)** without changing code:
1. **Colors**: Background, Surface container levels, outline borders, primary typography colors, and red accent/urgeny highlight colors.
2. **Typography**: Select between clean custom options (e.g. `Bebas Neue` for titles, `Inter` for body).
3. **Logo & Favicon**: Drag and drop brand logo assets and adjust widths.
4. **Social Links**: Set profiles for Instagram, Twitter, Facebook, and pre-fill WhatsApp order phone numbers and greetings.

---

## Performance & SEO Optimization

- **Mobile First**: Fully responsive layouts with touch-friendly horizontal swipe grids for collections and reviews.
- **Lazy Loading**: Native browser image lazy loading applied using `loading="lazy"` tags.
- **Image Optimization**: Images fetch matching resolutions through Shopify's dynamic width resizing (`image_url: width: ...`) and specify retina `srcset` values.
- **Structured Data**: Automatic JSON-LD product and aggregate schemas embedded for search engine rankings.

---

## GitHub Deployment

This theme is optimized for Shopify's native GitHub integration:
1. Push this folder to a private or public GitHub repository.
2. Go to **Shopify Admin** &rarr; **Online Store** &rarr; **Themes**.
3. Under **Theme library**, click **Add theme** &rarr; **Connect from GitHub**.
4. Select your branch (`main`). Shopify will keep the theme synced with every commit.
