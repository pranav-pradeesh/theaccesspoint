export type ServiceVisualKey = "web" | "software" | "design" | "brand" | "marketing" | "education";

export type Service = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  description: string;
  offerings: string[];
  deliverables: string[];
  visual: ServiceVisualKey;
  /** Future-facing offerings are shown, but labelled as such. */
  upcoming?: boolean;
};

export type RichBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type ProjectStatus = "Live" | "In development" | "Concept";

export type CaseStudySection = {
  id: "overview" | "challenge" | "approach" | "design" | "development" | "experience" | "outcome";
  label: string;
  heading: string;
  body: RichBlock[];
};

export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  year: string;
  status: ProjectStatus;
  summary: string;
  services: string[];
  technology: string[];
  /** Key of the generated cover artwork (no stock imagery). */
  cover: "gateway" | "academy";
  sections: CaseStudySection[];
  gallery: { caption: string; art: "system" | "type" | "motion" | "grid" | "courses" | "architecture" }[];
};

export type ArticleCategory =
  | "Web Development"
  | "Design"
  | "Technology"
  | "Business"
  | "Education"
  | "Digital Strategy";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  publishedAt: string;
  readingMinutes: number;
  author: string;
  body: RichBlock[];
};
