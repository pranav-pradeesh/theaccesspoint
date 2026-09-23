# The Access Point — Gateway to Knowledge

Website for The Access Point, Coimbatore. Next.js 16 (App Router), TypeScript (strict) and Tailwind CSS 4.

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
├── app/                  routes: /, /services, /training, /about, /contact,
│                         sitemap, robots, OG image
├── components/           brand, navigation, footer, contact, training, loader, ui
└── lib/
    ├── cms/              content layer (see below)
    ├── validation/       zod/mini schema for the project brief form
    ├── forms/            Web3Forms submission helper
    └── seo/              metadata builder, JSON-LD, OG renderer
```

### Content

Pages read content through the async functions in `src/lib/cms/index.ts`, which currently return typed data from `src/lib/cms/content/*.ts`. Moving to a headless CMS later means reimplementing that file; pages don't change.

- **Services:** `content/services.ts`
- **Training courses:** `content/courses.ts`
- **Values and mission:** `content/company.ts`
- **Contact details:** `src/lib/site.ts`. The email, phone and Coimbatore address come from the company's 2017 site; confirm they are current. Add only verified social profiles.

Only publish real information. There is no portfolio or blog yet; add them once there are real projects and articles to show.

### Loader

On a full page load, an inline script (`components/loader/loaderScript.ts`) shows a progress overlay driven by real resource loading (Resource Timing API) and removes it on the window `load` event. It only appears if loading takes longer than 300ms, and a 10s failsafe always releases the page. In-app navigation shows a thin top bar that completes when the new page renders. There are no other animations. The page scrollbar is hidden; scrolling works normally.
