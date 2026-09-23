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
├── app/                  routes: /, /services, /services/[slug], /training,
│                         /training/[slug], /about, /faq, /contact,
│                         sitemap, robots, llms.txt, OG images
├── components/           brand, navigation, footer, contact, training, loader, ui
└── lib/
    ├── cms/              content layer (see below)
    ├── validation/       zod/mini schema for the project brief form
    ├── forms/            Web3Forms submission helper
    └── seo/              metadata builder, JSON-LD, OG renderer
```

### Content

Pages read content through the async functions in `src/lib/cms/index.ts`, which currently return typed data from `src/lib/cms/content/*.ts`. Moving to a headless CMS later means reimplementing that file; pages don't change.

- **Services:** `content/services.ts`. Each service (except Training, which links to `/training`) gets its own page with offerings, audience, process and FAQs.
- **Training courses:** `content/courses.ts`. Each course gets its own page with an overview, syllabus modules, outcomes, prerequisites and FAQs. **The syllabus modules were drafted from each course's published topics: check them against what is actually taught.** For courses run as affiliated programmes, add `affiliation: { partner, certificate }`; the Training page then shows an "Affiliated programme" badge with those details.
- **General FAQs:** `content/faqs.ts` (the `/faq` page; questions marked `featured` also appear on the home page)
- **Values and mission:** `content/company.ts`
- **Contact details:** `src/lib/site.ts`. The email, phone and Coimbatore address come from the company's 2017 site; confirm they are current. Add only verified social profiles.

Only publish real information. There is no portfolio or blog yet; add them once there are real projects and articles to show.

### Search and answer engines (SEO, GEO, AEO)

- Every page has its own title, meta description, canonical URL and Open Graph image. Course and service titles target local searches ("Java Course in Coimbatore").
- Structured data (JSON-LD): the business as `LocalBusiness` + `EducationalOrganization`, `Service` and `Course` (with syllabus and onsite course instance) on detail pages, `FAQPage` wherever questions are shown, `BreadcrumbList` and `ItemList`.
- Pages lead with a direct one-paragraph answer (what the service or course is), followed by question-and-answer sections, the format answer engines and AI assistants quote.
- `/llms.txt` gives AI assistants a plain-text summary of the business, services, courses and FAQs, generated from the same content.
- `sitemap.xml` lists every page. After launch, submit it in Google Search Console and Bing Webmaster Tools, and set up a Google Business Profile with the same name, address and phone number as `site.ts`: for local searches, that profile matters more than anything on the site.

### Smooth scrolling

`components/navigation/SmoothScroll.tsx` enables [Lenis](https://github.com/darkroomengineering/lenis) for mouse-wheel scrolling. Touch devices keep native scrolling, visitors with reduced motion enabled get native scrolling, and in-page links use the browser's own jump.

### Illustrations, motion and sound

- **Illustrations** (`components/illustrations/Illustration.tsx`) are inline SVGs mapped to each service and course by slug. They follow the light/dark theme and add no image requests. They are placeholders for real photos of the centre, classes and client work: photos are better for trust and for image search, so replace or supplement them when you have them (use `next/image`).
- **Motion:** sections fade up once as they scroll into view (`[data-reveal]` + `components/motion/RevealOnScroll.tsx`), linked cards lift on hover, buttons press in, and illustrations have small looping details. Everything is skipped for visitors who prefer reduced motion, and nothing is hidden without JavaScript.
- **Click sounds** (`lib/sound.ts`, `components/navigation/SoundToggle.tsx`) are synthesised with the Web Audio API and are **off by default**; the speaker button in the header turns them on and the choice is saved. To make them on by default, change `soundEnabled()` to return true when nothing is stored.

### Themes

Light and dark themes are defined as CSS variables in `src/app/globals.css` (light on `:root`, dark on `[data-theme="dark"]`, plus a `prefers-color-scheme` fallback for visitors without JavaScript). A small script in `layout.tsx` applies the saved choice, or the system setting, before first paint so there is no flash. The header toggle (`components/navigation/ThemeToggle.tsx`) switches themes and saves the choice in `localStorage`.

### Loader

On a full page load, an inline script (`components/loader/loaderScript.ts`) shows a progress overlay driven by real resource loading (Resource Timing API) and removes it on the window `load` event. It only appears if loading takes longer than 300ms, and a 10s failsafe always releases the page. In-app navigation shows a thin top bar that completes when the new page renders. Other motion is described under "Illustrations, motion and sound". The page scrollbar is hidden; scrolling works normally.
