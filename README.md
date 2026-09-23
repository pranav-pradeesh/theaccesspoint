# The Access Point — Gateway to Knowledge

Corporate website for The Access Point. Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis.

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
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`              | Enables cookieless Plausible analytics. Empty = no analytics script at all.                 |

**Lead storage must be configured in production.** With no sink set, `/api/leads` logs briefs to the console in development, but in production it returns `503` and the form tells visitors to email instead. It never drops a brief without telling anyone.

## Structure

```text
src/
├── app/                  routes: /, /work, /work/[slug], /services, /about,
│                         /insights, /insights/[slug], /contact, /api/leads,
│                         sitemap, robots, OG images
├── animations/           GSAP utilities — reveal, staggerReveal, textReveal,
│                         parallax, magnetic, gateway hero + page transition
├── components/           brand, navigation, hero, home, services, projects,
│                         insights, contact, cursor, transitions, motion, ui, visuals
└── lib/
    ├── cms/              content layer (see below)
    ├── validation/       shared zod/mini schema (form + API)
    ├── leads/            Supabase / webhook sinks
    ├── analytics/        track() → Plausible
    └── seo/              metadata builder, JSON-LD, OG renderer
```

### Content

All content is read through the async functions in `src/lib/cms/index.ts`. Right now they return typed data from `src/lib/cms/content/*.ts`. To move to Sanity, Payload or Strapi, reimplement those functions against the CMS client. Pages don't need to change.

- **Case studies:** `content/projects.ts`. Only publish real work. The two entries right now are in-house: the site itself and the Academy concept, which is labelled "Concept".
- **Articles:** `content/articles.ts`
- **Services / philosophy / mission / process:** `content/services.ts`, `content/company.ts`
- **Contact details:** `src/lib/site.ts` — email, phone and Coimbatore address are taken from the company's 2017 site; confirm they are current. Add only verified social profiles.

### Motion

Sections stay server components. Motion is opt-in through data attributes that `MotionController` wires up on each route:

| Attribute                         | Effect                                         |
| --------------------------------- | ---------------------------------------------- |
| `data-reveal` / `="stagger"`      | Fade and rise into view (children staggered)   |
| `data-split` + `data-word` spans  | Word-by-word scrubbed statement                |
| `data-parallax="0.1"`             | Vertical parallax                              |
| `data-magnetic`                   | Magnetic pull (fine pointers only)             |
| `data-cursor="view\|drag\|open"`  | Custom cursor label                            |
| `data-track="Label"`              | Analytics CTA click                            |

When a visitor has `prefers-reduced-motion` set, Lenis, the page transition, parallax, the cursor and scroll animations are all switched off, and all content stays visible. With JavaScript disabled, all content still renders. Elements only start hidden once an inline script confirms JS is running.

Tailwind 4's `translate-*` / `scale-*` utilities set the CSS `translate`/`scale` properties. These stack with GSAP's `transform`, so don't combine them with GSAP x/y on the same element.
