# The Access Point — Gateway to Knowledge

Corporate website for The Access Point. Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS 4 · GSAP (entrance fades only).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional locally — see below
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                        |
| `npm run build`     | Production build — every page is prerendered  |
| `npm run lint`      | ESLint (next core-web-vitals + typescript)    |
| `npm run typecheck` | Generates route types, then `tsc --noEmit`    |

Node 20.9+ is required.

## Environment

| Variable                                    | Purpose                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                      | Canonical URLs, sitemap, Open Graph. Optional: falls back to Vercel's production domain, then `https://theaccesspoint.com`. |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Stores project briefs in the `leads` table (`supabase/migrations/0001_leads.sql`). Server-only. |
| `LEAD_WEBHOOK_URL`                          | Optional: also POSTs each brief as JSON (Slack workflow, Zapier, CRM…).                     |

**Lead storage must be configured in production.** With no sink set, `/api/leads` logs briefs to the console in development, but in production it returns `503` and the form tells visitors to email instead. It never drops a brief without telling anyone.

## Structure

```text
src/
├── app/                  routes: /, /work, /work/[slug], /services, /about,
│                         /insights, /insights/[slug], /contact, /api/leads,
│                         sitemap, robots, OG images
├── animations/           GSAP entrance fades — reveal, staggerReveal
├── components/           brand, navigation, hero, home, services, projects,
│                         insights, contact, motion, ui, visuals
└── lib/
    ├── cms/              content layer (see below)
    ├── validation/       shared zod/mini schema (form + API)
    ├── leads/            Supabase / webhook sinks
    └── seo/              metadata builder, JSON-LD, OG renderer
```

### Content

All content is read through the async functions in `src/lib/cms/index.ts`. Right now they return typed data from `src/lib/cms/content/*.ts`. To move to Sanity, Payload or Strapi, reimplement those functions against the CMS client. Pages don't need to change.

- **Case studies:** `content/projects.ts`. Only publish real work. The two entries right now are in-house: the site itself and the Academy concept, which is labelled "Concept".
- **Articles:** `content/articles.ts`
- **Services / philosophy / mission / process:** `content/services.ts`, `content/company.ts`
- **Contact details:** `src/lib/site.ts` — email, phone and Coimbatore address are taken from the company's 2017 site; confirm they are current. Add only verified social profiles.

### Motion

Motion is kept deliberately minimal. Add `data-reveal` (or `data-reveal="stagger"` for children) to fade an element in as it scrolls into view; `MotionController` wires this up on every route, so sections stay server components. There is no smooth scrolling, custom cursor, page transition or parallax, and no analytics or tracking.

With `prefers-reduced-motion` set, the fades are skipped. With JavaScript disabled, all content renders — elements only start hidden once an inline script confirms JS is running.
