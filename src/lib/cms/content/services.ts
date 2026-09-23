import type { Service } from "../types";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    summary: "Websites and web applications for businesses, including hosting.",
    description:
      "We design, build and host websites for businesses of every size, from a single landing page to a full web application or online store.",
    offerings: ["Business websites", "Landing pages", "E-commerce", "Web applications", "Web hosting"],
  },
  {
    slug: "software-development",
    title: "Software & Mobile Apps",
    summary: "Custom software, mobile apps and business applications.",
    description:
      "We build business applications, mobile apps, dashboards and APIs around the way your organisation actually works.",
    offerings: ["Business applications", "Mobile apps", "Custom software", "Dashboards", "APIs"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    summary: "Clear, usable interfaces for websites and apps.",
    description:
      "We plan and design interfaces that are easy to use on every device, and deliver them as prototypes and reusable design systems.",
    offerings: ["User research", "Wireframes", "Prototyping", "Design systems", "Responsive interfaces"],
  },
  {
    slug: "branding",
    title: "Branding & Graphic Design",
    summary: "Logos, brand identities and graphic design.",
    description:
      "We create logos, brand identities and the supporting graphics that keep your business consistent across print and digital.",
    offerings: ["Logo design", "Brand identity", "Graphic design", "Brand guidelines"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    summary: "SEO, content and online marketing.",
    description:
      "We help customers find you online through search engine optimisation, content and targeted digital campaigns.",
    offerings: ["SEO", "Content strategy", "Digital campaigns", "Conversion optimisation"],
  },
  {
    slug: "technical-education",
    title: "Technical Training",
    summary: "Practical courses in programming, animation, networking and cloud.",
    description:
      "We run practical training courses at our Coimbatore centre, covering Java, Android, PHP, .NET, web development, animation, hardware and networking, and cloud computing.",
    offerings: ["Programming", "Web & mobile development", "Animation", "Hardware & networking", "Cloud computing"],
  },
];
