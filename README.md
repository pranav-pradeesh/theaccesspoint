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
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`          | Web3Forms access key. The project brief (`/contact`) and course enquiry (`/training`) forms email submissions through [Web3Forms](https://web3forms.com). |

**Set the Web3Forms key in production.** Without it, both forms show a message asking visitors to email or call instead. Because it is a `NEXT_PUBLIC_` variable, it is baked in at build time — redeploy after adding it.

## Structure

```text
src/
├── app/                  routes: /, /work, /work/[slug], /services, /training, /about,
│                         /insights, /insights/[slug], /contact, sitemap, robots, OG images
├── animations/           GSAP entrance fades — reveal, staggerReveal
├── components/           brand, navigation, hero, home, services, projects,
│                         insights, contact, training, loader, motion, ui, visuals
└── lib/
    ├── cms/              content layer (see below)
    ├── validation/       zod/mini schema for the project brief form
    ├── forms/            Web3Forms submission helper
    └── seo/              metadata builder, JSON-LD, OG renderer
```

### Content

All content is read through the async functions in `src/lib/cms/index.ts`. Right now they return typed data from `src/lib/cms/content/*.ts`. To move to Sanity, Payload or Strapi, reimplement those functions against the CMS client. Pages don't need to change.

- **Case studies:** `content/projects.ts`. Only publish real work. The two entries right now are in-house: the site itself and the Academy concept, which is labelled "Concept".
- **Training courses:** `content/courses.ts`
- **Articles:** `content/articles.ts`
- **Services / philosophy / mission / process:** `content/services.ts`, `content/company.ts`
- **Contact details:** `src/lib/site.ts` — email, phone and Coimbatore address are taken from the company's 2017 site; confirm they are current. Add only verified social profiles.

### Motion

Motion is kept deliberately minimal. Add `data-reveal` (or `data-reveal="stagger"` for children) to fade an element in as it scrolls into view; `MotionController` wires this up on every route, so sections stay server components. There is no smooth scrolling, custom cursor, page transition or parallax, and no analytics or tracking.

**Loader.** On a full page load, an inline script (`components/loader/loaderScript.ts`) shows a progress overlay driven by real resource loading (Resource Timing API) and lifts on the window `load` event. It only appears if loading takes longer than 300ms, and a 10s failsafe always releases the page. In-app navigation shows a thin top bar that completes when the new route renders. The page scrollbar is hidden; scrolling still works normally.

With `prefers-reduced-motion` set, the fades are skipped. With JavaScript disabled, all content renders — elements only start hidden once an inline script confirms JS is running.
