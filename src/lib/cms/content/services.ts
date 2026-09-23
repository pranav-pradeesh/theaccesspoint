import type { Service } from "../types";

export const services: Service[] = [
  {
    slug: "web-development",
    index: "01",
    title: "Web Development",
    summary: "Fast, accessible websites and web applications engineered to last.",
    description:
      "From a focused landing page to a full web application, we build on modern, well-supported foundations so your site is fast on real phones, easy to find in search and simple to grow.",
    offerings: ["Corporate websites", "Business websites", "Landing pages", "E-commerce", "Web applications", "Web hosting"],
    deliverables: ["Responsive front-end", "CMS integration", "Performance budget", "SEO foundations", "Deployment & hosting setup"],
    visual: "web",
  },
  {
    slug: "software-development",
    index: "02",
    title: "Software Development",
    summary: "Custom software and mobile apps shaped around how your business actually works.",
    description:
      "We design and build business applications, mobile apps, dashboards and APIs — starting from the workflow, not the feature list — so the software removes friction instead of adding it.",
    offerings: ["SaaS", "Business applications", "Mobile apps", "Custom software", "Dashboards", "APIs"],
    deliverables: ["System architecture", "Data modelling", "API design", "Admin tooling", "Documentation & handover"],
    visual: "software",
  },
  {
    slug: "ui-ux-design",
    index: "03",
    title: "UI/UX Design",
    summary: "Interfaces that feel obvious because the thinking behind them wasn't.",
    description:
      "Research, structure and interface design that make complex products feel effortless — delivered as working prototypes and design systems your team can keep using.",
    offerings: ["Product design", "UX research", "Design systems", "Prototyping", "Responsive interfaces"],
    deliverables: ["User flows", "Wireframes", "Interactive prototypes", "Component library", "Design tokens"],
    visual: "design",
  },
  {
    slug: "branding",
    index: "04",
    title: "Branding",
    summary: "Identities with a clear idea at the centre — and a system around it.",
    description:
      "We find the one idea your brand should stand for, then build the mark, typography, colour and rules that let it show up consistently everywhere.",
    offerings: ["Brand identity", "Logo design", "Graphic design", "Visual systems", "Brand guidelines", "Digital branding"],
    deliverables: ["Brand strategy", "Logo suite", "Typography & colour system", "Guidelines", "Launch assets"],
    visual: "brand",
  },
  {
    slug: "digital-marketing",
    index: "05",
    title: "Digital Marketing",
    summary: "Search visibility and content that bring the right people to you.",
    description:
      "Technical SEO, content strategy and conversion work grounded in how your customers search and decide — measured with privacy-conscious analytics.",
    offerings: ["SEO", "Content strategy", "Search visibility", "Digital campaigns", "Conversion optimization"],
    deliverables: ["Technical SEO audit", "Content plan", "Analytics setup", "Landing page tests", "Monthly reporting"],
    visual: "marketing",
  },
  {
    slug: "technical-education",
    index: "06",
    title: "Technical Education",
    summary: "Workshops and training that make technology understandable.",
    description:
      "Our roots are in making technical knowledge accessible. We are shaping workshops, training and learning resources — the foundation of a future Access Point Academy.",
    offerings: ["Workshops", "Technical training", "Courses", "Learning resources"],
    deliverables: ["Team workshops", "Custom curricula", "Hands-on labs", "Learning materials"],
    visual: "education",
    upcoming: true,
  },
];
