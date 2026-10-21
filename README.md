# SM Studio

Marketing site and interactive demos for **SM Studio**, an independent digital studio by Swampod.

Built with React, Vite, TypeScript and Tailwind CSS. No backend required — the contact form can post
to any form endpoint or fall back to WhatsApp / email.

## Quick start

```bash
npm install
cp .env.example .env   # Windows: Copy-Item .env.example .env
npm run dev
```

Open http://127.0.0.1:5173.

## Scripts

| Command                | Purpose                               |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start the Vite dev server             |
| `npm run build`        | Type-check and build to `dist/`       |
| `npm run preview`      | Preview the production build          |
| `npm run lint`         | Run ESLint                            |
| `npm run typecheck`    | Run TypeScript without emitting files |
| `npm run format`       | Format the project with Prettier      |
| `npm run format:check` | Verify formatting                     |

## Environment

Copy `.env.example` to `.env` and fill in what you need. Empty values hide the related UI.

| Variable               | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `VITE_SITE_URL`        | Canonical and Open Graph base URL                    |
| `VITE_WHATSAPP_NUMBER` | International format without `+`, e.g. `8801XXXXXXX` |
| `VITE_CONTACT_EMAIL`   | Contact email                                        |
| `VITE_FACEBOOK_URL`    | Optional Facebook profile                            |
| `VITE_YOUTUBE_URL`     | Optional YouTube channel                             |
| `VITE_FORM_ENDPOINT`   | Optional POST endpoint (Formspree, Basin, custom)    |

Without `VITE_FORM_ENDPOINT` the contact form prepares the inquiry and offers WhatsApp / email
instead of submitting it.

## Structure

```
src/
  components/   Layout, Logo, Seo, Reveal, cards, FAQ, CTA, error boundary
  pages/        Home, Services, Portfolio, Pricing, About, Contact, Privacy
                ShopDemo, RestaurantDemo, BizTrackDemo, NotFound
  data.ts       Services, plans, projects, process, FAQs, options
  lib.ts        Environment helpers and contact links
public/         favicon, manifest, og-image, robots, sitemap
```

## Demos

All three portfolio demos are live and use sample data only:

- `/demo/shopstarter` — e-commerce storefront
- `/demo/restaurantpro` — restaurant site with menu and reservation flow
- `/demo/biztrack` — business dashboard with inventory and invoices

## Deployment (Vercel)

1. Import the repository into Vercel.
2. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
3. Add the environment variables from `.env.example`.
4. Deploy. `vercel.json` handles SPA route fallback and basic security headers.

## Before going live

- Replace `your-domain.example` in `public/sitemap.xml` and `public/robots.txt`.
- Set `VITE_SITE_URL`, `VITE_WHATSAPP_NUMBER` and `VITE_CONTACT_EMAIL`.
- Swap the demo/sample content for real project details when available.
- Optionally add privacy and terms pages if you collect inquiry data.
