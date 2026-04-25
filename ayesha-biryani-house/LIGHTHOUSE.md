# Lighthouse Audit — Ayesha Biryani House

## Status

Pre-deployment audit. Run a full Lighthouse test on the live Netlify URL once deployed and record scores here.

## How to Run

1. Open the deployed site in Chrome.
2. Open DevTools (F12) → Lighthouse tab.
3. Select: Mobile · Performance · Accessibility · Best Practices · SEO.
4. Click **Analyse page load**.
5. Record scores below.

---

## Target Scores (from brief)

| Category | Target | Status |
|---|---|---|
| Performance (Mobile) | 90+ | Pending live test |
| Accessibility | 95+ | Pending live test |
| SEO | 95+ | Pending live test |
| Best Practices | 95+ | Pending live test |

## Core Web Vitals Targets

| Metric | Target | Status |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Pending |
| CLS (Cumulative Layout Shift) | < 0.1 | Pending |
| INP (Interaction to Next Paint) | < 200ms | Pending |

---

## Design Decisions for Performance

The following choices were made to hit the target scores:

**Performance**
- All images are AVIF (typically 50–70% smaller than JPEG at equivalent quality).
- Images below the fold use `loading="lazy"`.
- Hero image uses `fetchpriority="high"` — no lazy loading on LCP element.
- All `<img>` tags have explicit `width` and `height` to prevent CLS.
- Google Fonts loaded via `<link rel="stylesheet">` in `<head>` with `preconnect` — not via CSS `@import` (which blocks rendering).
- Lucide icons loaded via CDN script, called after HTML renders.
- `main.js` is `defer`red — zero render-blocking JS.
- CSS is a single file with no `@import` chains.

**Accessibility**
- Skip-to-content link on every page.
- All interactive elements have visible focus rings (`outline: 3px solid var(--clr-primary)`).
- Mobile nav has `aria-expanded`, `aria-hidden`, `aria-controls`, `aria-label`.
- Gallery lightbox has `role="dialog"`, `aria-modal`, keyboard navigation (arrow keys + Escape).
- All images have descriptive `alt` text including location keyword "Bhopal".
- Form fields have associated `<label>` tags and `aria-describedby` error messages.
- Colour contrast: dark brown (#451A03) on cream (#FFF7ED) — ratio ~14:1 ✓

**SEO**
- Unique `<title>` and `<meta name="description">` on every page.
- `<link rel="canonical">` on every page.
- Open Graph + Twitter Card meta tags on every page.
- JSON-LD structured data: Restaurant + BreadcrumbList on every page.
- Menu schema with pricing on `menu.html`.
- AggregateRating + individual Review schema on `reviews.html`.
- BlogPosting schema on `blog.html`.
- `robots.txt` allows all crawlers.
- `sitemap.xml` lists all 8 pages with `lastmod` dates.
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`, `<blockquote>`.
- Hindi text uses `lang="hi"` attribute.

---

## Known Limitations / Post-Launch Tasks

- [ ] Google Maps iframe uses a placeholder embed URL — replace with real embed after deployment.
- [ ] OG image (`og-default.avif`) is AVIF format. WhatsApp/Facebook may not preview AVIF — export a JPEG version if social sharing previews fail.
- [ ] Lucide icons are loaded from unpkg CDN — consider self-hosting for production to eliminate the external CDN dependency.
- [ ] Google Fonts are loaded from Google's CDN. For maximum performance, consider self-hosting fonts using `@font-face` with local WOFF2 files.
- [ ] Contact form uses Netlify Forms (`data-netlify="true"`) — only functional on Netlify. Verify submissions after deployment.
