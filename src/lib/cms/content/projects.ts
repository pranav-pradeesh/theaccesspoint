import type { Project } from "../types";

/*
 * Case studies. Only real work belongs here — no invented clients, quotes or metrics.
 * Add client projects as they are cleared for publication.
 */
export const projects: Project[] = [
  {
    slug: "the-access-point",
    name: "The Access Point",
    client: "In-house",
    industry: "Technology & Education",
    year: "2026",
    status: "Live",
    summary:
      "Our own identity and website — a clear, professional presence built around the gateway mark.",
    services: ["Branding", "UI/UX Design", "Web Development"],
    technology: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: "gateway",
    sections: [
      {
        id: "overview",
        label: "Overview",
        heading: "A studio site that behaves like a product.",
        body: [
          {
            type: "p",
            text: "The Access Point works across web development, software, design, branding and technical education. The website had to explain that range clearly, prove we can build what we describe, and leave room for a future learning platform — without feeling like another agency template.",
          },
        ],
      },
      {
        id: "challenge",
        label: "The Challenge",
        heading: "Six disciplines, one clear message.",
        body: [
          {
            type: "p",
            text: "A broad offer can easily read as unfocused. Visitors needed to understand what we do within seconds, while the education mission — central to why the company exists — had to stay visible without confusing people who simply want a website built.",
          },
          {
            type: "ul",
            items: [
              "Explain six services without a wall of cards.",
              "Show craft through the site itself, not claims about it.",
              "Keep every page fast on mid-range phones.",
              "Design an architecture that can grow into an Academy.",
            ],
          },
        ],
      },
      {
        id: "approach",
        label: "The Approach",
        heading: "Clarity over decoration.",
        body: [
          {
            type: "p",
            text: "We organised the site around what visitors need to decide: what we do, what we have built, how we work and how to get in touch. The gateway mark gives the brand a consistent identity, while layout and typography do the work of explaining.",
          },
          {
            type: "quote",
            text: "A business website should make the next step obvious.",
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        heading: "A consistent visual system.",
        body: [
          {
            type: "p",
            text: "A deep navy palette with electric blue accents carries the brand, while long-form reading — case studies and insights — uses a clean light theme. Manrope provides a confident, readable typeface throughout.",
          },
          {
            type: "ul",
            items: [
              "Two-plane isometric gateway mark with a four-point spark.",
              "Fluid type scale that adapts from phones to large screens.",
              "12-column grid with an 8-point spatial rhythm.",
              "Colour tokens tuned so body copy clears WCAG AA contrast.",
            ],
          },
        ],
      },
      {
        id: "development",
        label: "Development",
        heading: "Fast, static and maintainable.",
        body: [
          {
            type: "p",
            text: "The site is built with Next.js and TypeScript in strict mode. Pages are statically generated and content is kept separate from layout, so pages load quickly and are straightforward to update.",
          },
          {
            type: "ul",
            items: [
              "Reusable components shared across every page.",
              "Generated vector artwork instead of heavy imagery.",
              "Validated project-brief API with spam protection.",
              "Structured data, sitemap and per-page Open Graph images.",
            ],
          },
        ],
      },
      {
        id: "experience",
        label: "Experience",
        heading: "Accessible on every device.",
        body: [
          {
            type: "p",
            text: "Layouts are designed for phones first, with keyboard navigation, visible focus states and sufficient colour contrast throughout. Animation is limited to brief fades and switches off entirely for visitors who prefer reduced motion.",
          },
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        heading: "A foundation built to grow.",
        body: [
          {
            type: "p",
            text: "The result is a single system — brand, components and content model — that we can extend with new case studies, articles and eventually the Academy without redesigning the core. Performance and engagement will be reported here once there is real data to share.",
          },
        ],
      },
    ],
    gallery: [
      { caption: "Gateway mark construction", art: "system" },
      { caption: "Type scale & tokens", art: "type" },
      { caption: "Gateway mark states", art: "motion" },
      { caption: "12-column architectural grid", art: "grid" },
    ],
  },
  {
    slug: "access-point-academy",
    name: "Access Point Academy",
    client: "In-house",
    industry: "Education",
    year: "2026",
    status: "Concept",
    summary:
      "Early product architecture for a learning platform that makes technical education feel human.",
    services: ["Software Development", "UI/UX Design", "Technical Education"],
    technology: ["Next.js", "PostgreSQL", "TypeScript"],
    cover: "academy",
    sections: [
      {
        id: "overview",
        label: "Overview",
        heading: "Learning should feel human.",
        body: [
          {
            type: "p",
            text: "The Academy is our planned learning platform — courses, learning paths and hands-on resources for people who want to understand technology, not just memorise it. This page documents the concept and architecture work so far; it is not a launched product.",
          },
        ],
      },
      {
        id: "challenge",
        label: "The Challenge",
        heading: "Education without the pressure.",
        body: [
          {
            type: "p",
            text: "Much technical education optimises for completion and certificates. We want learners to leave with understanding. That changes how lessons are sequenced, how progress is shown and how feedback is given.",
          },
        ],
      },
      {
        id: "approach",
        label: "The Approach",
        heading: "A separate product, a shared foundation.",
        body: [
          {
            type: "p",
            text: "To keep the studio site focused, the Academy is treated as its own product that will live under /academy. It shares the design system and brand, but has its own accounts, content model and roadmap.",
          },
          {
            type: "ul",
            items: [
              "Courses and learning paths",
              "Video lessons and resources",
              "Quizzes and progress tracking",
              "Certificates and student profiles",
              "Instructor dashboard",
            ],
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        heading: "Curiosity before memorisation.",
        body: [
          {
            type: "p",
            text: "Early design explorations favour short, concrete lessons with a visible path forward, so learners always know where they are, why the next step matters and how it connects to what they already understand.",
          },
        ],
      },
      {
        id: "development",
        label: "Development",
        heading: "Architecture first.",
        body: [
          {
            type: "p",
            text: "The planned stack mirrors the studio site — Next.js and TypeScript — with PostgreSQL for accounts, enrolments and progress. Building on the same foundations keeps maintenance manageable for a small team.",
          },
        ],
      },
      {
        id: "experience",
        label: "Experience",
        heading: "Designed for real devices.",
        body: [
          {
            type: "p",
            text: "Many learners will study on a phone, on variable connections. Lessons are planned to be lightweight and usable offline where possible, with accessibility treated as a requirement rather than a feature.",
          },
        ],
      },
      {
        id: "outcome",
        label: "Status",
        heading: "In concept — follow along.",
        body: [
          {
            type: "p",
            text: "The Academy is still in the concept stage. We will share progress in Insights as it develops. If you're interested in workshops or training for your team, tell us what you need — it helps shape what we build first.",
          },
        ],
      },
    ],
    gallery: [
      { caption: "Platform architecture", art: "architecture" },
      { caption: "Learning path concept", art: "courses" },
    ],
  },
];
