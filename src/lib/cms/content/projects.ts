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
      "Our own identity and flagship website — a gateway mark turned into a complete visual and motion language.",
    services: ["Branding", "UI/UX Design", "Web Development"],
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
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
              "Keep premium motion fast on mid-range phones.",
              "Design an architecture that can grow into an Academy.",
            ],
          },
        ],
      },
      {
        id: "approach",
        label: "The Approach",
        heading: "Let the gateway carry the story.",
        body: [
          {
            type: "p",
            text: "Instead of treating the logo as a badge in the corner, we made the gateway the organising idea of the whole experience. It opens in the hero, frames page transitions and closes at the end of the page. Every animation had to describe passing through a threshold — nothing moves just to move.",
          },
          {
            type: "quote",
            text: "Animation should communicate hierarchy, not exist merely because it looks cool.",
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        heading: "Cinematic Swiss, in two themes.",
        body: [
          {
            type: "p",
            text: "An obsidian canvas lit by electric blue and cyan gives the storytelling sections depth, while long-form reading — case studies and insights — switches to a crisp editorial light theme. Manrope provides the confident display voice, and JetBrains Mono marks indices, stages and metadata.",
          },
          {
            type: "ul",
            items: [
              "Two-plane isometric gateway mark with a four-point spark.",
              "Fluid type scale from 12px micro labels to 120px display.",
              "12-column grid with an 8-point spatial rhythm.",
              "Colour tokens tuned so body copy clears WCAG AA contrast.",
            ],
          },
        ],
      },
      {
        id: "development",
        label: "Development",
        heading: "Static by default, animated on purpose.",
        body: [
          {
            type: "p",
            text: "The site is built with Next.js and TypeScript in strict mode. Pages are statically generated, and animation code is isolated in small reusable utilities — reveal, text reveal, magnetic and parallax — so sections stay readable and motion stays consistent.",
          },
          {
            type: "ul",
            items: [
              "GSAP ScrollTrigger synchronised with Lenis smooth scrolling.",
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
        heading: "Motion that respects the visitor.",
        body: [
          {
            type: "p",
            text: "Custom cursor states appear only for precise pointers. On touch devices, interactions are designed for thumbs rather than scaled down from desktop. When a visitor prefers reduced motion, smooth scrolling, parallax and cursor effects switch off entirely while every piece of content stays available.",
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
            text: "The result is a single system — brand, components, motion and content model — that we can extend with new case studies, articles and eventually the Academy without redesigning the core. Performance and engagement will be reported here once there is real data to share.",
          },
        ],
      },
    ],
    gallery: [
      { caption: "Gateway mark construction", art: "system" },
      { caption: "Type scale & tokens", art: "type" },
      { caption: "Gateway motion choreography", art: "motion" },
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
