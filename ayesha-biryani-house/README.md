# Ayesha Biryani House — Website

Production-ready, 8-page static restaurant website.
**Stack:** Vanilla HTML5 / CSS3 / JavaScript · No frameworks · Netlify-ready

---

## Deployment

### Option 1 — Drag & Drop (fastest)

1. Go to [netlify.com](https://netlify.com) and sign in.
2. On the dashboard, drag the entire `ayesha-biryani-house/` folder onto the "Deploy manually" drop zone.
3. Netlify will publish it immediately at a random URL (e.g. `random-name.netlify.app`).
4. In Site Settings → General → Site name, change it to `ayeshabiryanihouse`.

### Option 2 — GitHub Auto-Deploy (recommended for updates)

1. Create a new GitHub repository (e.g. `ayesha-biryani-house`).
2. Push this folder to the repo:
   ```
   git init
   git add .
   git commit -m "Initial deployment"
   git remote add origin https://github.com/YOUR_USERNAME/ayesha-biryani-house.git
   git push -u origin main
   ```
3. In Netlify → Add new site → Import from Git → choose the repo.
4. Build command: *(leave blank — static site)*
5. Publish directory: `.` (root)
6. Click Deploy. Every future `git push` will auto-deploy.

### Custom Domain (when ready)

1. Buy the domain (e.g. `ayeshabiryanihouse.in`).
2. In Netlify → Domain Settings → Add custom domain.
3. Follow the DNS instructions Netlify provides.
4. Once live, update the `canonical` URL and `og:url` meta tags in all 8 HTML files from `ayeshabiryanihouse.netlify.app` to the new domain.
5. Update `sitemap.xml` URLs to match the new domain.

---

## Updating Content

| What to change | File | Section to find |
|---|---|---|
| Phone number | All 8 HTML files | Search `6263890056` — replace all occurrences |
| Opening hours | All 8 HTML files + `sitemap.xml` | Search `12:00 PM – 11:30 PM` |
| Menu prices | `menu.html` | Find the item name, edit `menu-variant-price` span |
| Add a menu item | `menu.html` | Copy an existing `<article class="menu-item">` block |
| About story text | `about.html` | `<div class="article-body">` section |
| Add a review | `reviews.html` | Copy an existing `<article class="review-card">` block |
| Instagram link | All footers | Search `href="#"` near `aria-label="Instagram"` — replace `#` with the Instagram URL |
| Google Maps embed | `index.html`, `contact.html` | Find the `<!-- REPLACE: -->` comment above the `<iframe>` |

---

## Replacing the Google Maps Embed

1. Go to [maps.google.com](https://maps.google.com) and search for **Ayesha Biryani House, Hoshangabad Road, Bhopal**.
2. Click **Share** → **Embed a map**.
3. Copy the full `<iframe>` code Google provides.
4. In `index.html` and `contact.html`, find the comment `<!-- REPLACE: Generate your embed code -->` and replace the existing `<iframe>` with the one from Google.

---

## Adding the Instagram Link

When Mr. Shah creates the Instagram account:

1. Open every HTML file.
2. Search for `aria-label="Instagram (coming soon)"`.
3. Change `href="#"` to the full Instagram profile URL (e.g. `https://www.instagram.com/ayeshabiryanihouse`).
4. Remove `(coming soon)` from the `aria-label`.

---

## File Structure

```
ayesha-biryani-house/
├── index.html          ← Home page
├── menu.html           ← Full bilingual menu
├── about.html          ← Founder story + values
├── gallery.html        ← Photo grid + lightbox (20 photos)
├── contact.html        ← Address, map, contact form
├── order.html          ← Zomato + Swiggy CTAs
├── reviews.html        ← 6 Zomato reviews
├── blog.html           ← Bhopali vs Hyderabadi biryani article
├── robots.txt
├── sitemap.xml
├── css/
│   └── styles.css      ← All styles (mobile-first, CSS custom properties)
├── js/
│   └── main.js         ← Nav, lightbox, scroll animations, form validation
└── images/
    ├── README.md       ← Image inventory
    ├── chicken-biryani.avif
    ├── mutton-curry.avif
    └── ... (20 food photos total)
```

---

## TODOs Before / After Launch

- [x] **Google Maps embed** — real embed live in `index.html` and `contact.html`.
- [ ] **Instagram link** — add Instagram URL to all footer social icons once the account is created (search `aria-label="Instagram"` across all 8 files).
- [ ] **Custom domain** — buy domain and update canonical URLs + sitemap once live.
- [ ] **Netlify Forms** — contact form uses `data-netlify="true"`. Verify form submissions are arriving in the Netlify dashboard after deployment.
- [ ] **Google Search Console** — submit `sitemap.xml` after the site is live to accelerate indexing.
- [ ] **Real Lighthouse audit** — run Lighthouse on the live Netlify URL and record scores in `LIGHTHOUSE.md`.
- [ ] **Restaurant interior photo** — add to About page and gallery when available.
- [ ] **Founder portrait** — add photo of Mohammed Ikram to the About page.
- [ ] **Mutton Biryani** — not on the current menu but could be added if/when offered.
