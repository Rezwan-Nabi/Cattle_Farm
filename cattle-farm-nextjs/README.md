# Cattle Farm Website

A responsive, single-page website for a cattle farm, built from the Cattle Farm PRD (MVP scope).

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · `next/image`

## What's included

| PRD requirement | Where |
|---|---|
| FR-01 Navigation (desktop + mobile menu, skip link, Escape to close) | `components/Navbar.tsx` |
| FR-02 Hero with two calls to action | `components/Hero.tsx` |
| FR-03 About the farm | `components/About.tsx` |
| FR-04 Livestock showcase with per-breed inquiry buttons | `components/Livestock.tsx` |
| FR-05 Services | `components/Services.tsx` |
| FR-06 Animal care and farming practices | `components/Sustainability.tsx` |
| FR-07 Testimonials, hidden while there are none | `components/Testimonials.tsx` |
| FR-08 Inquiry form + server endpoint | `components/ContactForm.tsx`, `app/api/contact/route.ts` |
| FR-09 Footer | `components/Footer.tsx` |
| SEO: metadata, Open Graph, canonical URL, sitemap, robots, LocalBusiness JSON-LD | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/page.tsx` |

All copy, breeds, services, practices and contact details live in **`lib/content.ts`**, typed by `lib/types.ts`. The components only render what's in that file.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check
```

## Before launch: content checklist

Everything in `lib/content.ts` is **placeholder content** marked with `TODO`. Replace it with verified information (PRD §16):

- [ ] Farm name, short name, description and tagline
- [ ] Phone, WhatsApp number (international format, digits only), email, address, opening hours, map link
- [ ] Social media links (remove any the farm doesn't use)
- [ ] The breeds the farm actually raises, with verified traits only
- [ ] Services the farm actually offers
- [ ] Animal-care practices the farm actually follows (no certifications unless held)
- [ ] Testimonials: add only with the customer's permission; the section stays hidden while the list is empty
- [ ] Photos: replace the illustrated placeholders in `public/images/` with real farm photography (same file names, or update the paths in `content.ts`), and update every `alt` text to describe the real photo
- [ ] `public/images/og-image.jpg` (1200×630) for link previews
- [ ] Add a favicon: put `icon.png` (or `favicon.ico`) in `app/`

Prices and live availability are deliberately not shown, per FR-04. The livestock section asks visitors to inquire instead.

## Inquiry form

The form validates in the browser and again on the server (`lib/validation.ts` is shared). The endpoint at `POST /api/contact`:

- rejects non-JSON, cross-origin and oversized requests
- silently drops likely bots (a hidden honeypot field and a minimum fill time)
- limits each IP address to 5 inquiries per 10 minutes
- returns field-level errors that the form shows next to each input

Set **one** delivery method in `.env.local` (or your host's environment variables):

**Email via [Resend](https://resend.com):** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (comma-separate several addresses) and `CONTACT_FROM_EMAIL` (an address on a domain verified in Resend). Replies go straight to the customer because `reply_to` is set to their address.

**Webhook:** set `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_WEBHOOK_SECRET`, sent as `X-Webhook-Secret`). The inquiry is posted as JSON. This works with Google Apps Script (to log into a Google Sheet), Zapier, Make, n8n or your own backend.

If neither is set, inquiries are printed to the terminal during development. **In production the form will show an error asking visitors to call or email instead**, so configure delivery and send a test inquiry before launch.

The rate limiter keeps counts in memory, which is per server instance. If spam becomes a problem, add a shared store (e.g. Upstash Redis) or a CAPTCHA such as Cloudflare Turnstile.

## Deployment

The simplest path is [Vercel](https://vercel.com):

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Add the environment variables from `.env.example`, including `NEXT_PUBLIC_SITE_URL` set to the real domain.
4. Deploy, then connect your domain.

Any Node.js host works too: `npm run build && npm run start`.

After deploying, check: the mobile menu, every navigation link, a real test inquiry arriving, `/sitemap.xml`, `/robots.txt`, and a link preview (paste the URL into WhatsApp or Facebook).

## Design notes

- **Palette** (from the PRD): forest green `pasture`, warm beige `hay`, cream `whey`, `charcoal` text. Ear-tag yellow `tag` is used only for the livestock ear tags and keyboard focus rings.
- **Type:** Zilla Slab for headings, Public Sans for text, loaded with `next/font`.
- **Signature element:** each breed card carries a livestock ear tag (`components/EarTag.tsx`), and the logo uses the same shape.
- **Motion:** one load sequence in the hero and the mobile-menu open/close. Both respect the visitor's reduced-motion setting.
- Tokens are defined in `app/globals.css` under `@theme`.

## Project structure

```text
app/
  api/contact/route.ts   inquiry endpoint
  globals.css            Tailwind + design tokens
  layout.tsx             fonts, metadata, skip link
  page.tsx               the landing page
  not-found.tsx          404 page
  robots.ts, sitemap.ts
components/              one file per section, plus EarTag, Logo, InquiryLink
lib/
  content.ts             ← edit site content here
  types.ts               content types
  validation.ts          shared form validation
  deliver.ts             Resend / webhook delivery
  rate-limit.ts          in-memory limiter
  inquiry.ts             pre-fills the form from "Ask about…" buttons
public/images/           placeholder images to replace
```

## Future enhancements (out of MVP scope)

Admin dashboard, live inventory, individual cattle pages, breed filtering, customer accounts, bookings and payments (PRD §5.2). Keeping content in typed data (`lib/content.ts`) means it can later be swapped for a CMS or database without changing the components.
