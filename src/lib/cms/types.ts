/** `featured` questions also appear on the home page. */
export type Faq = { q: string; a: string; featured?: boolean };

export type Service = {
  slug: string;
  title: string;
  /** Search-facing title for the service's own page, e.g. "Website Design & Development in Coimbatore". */
  seoTitle: string;
  /** Search result snippet, up to ~155 characters. */
  metaDescription: string;
  summary: string;
  /** Direct one-paragraph answer to "what is this service?" (shown first on the page). */
  description: string;
  offerings: string[];
  /** Detail page. Omit `href` to get /services/<slug>. */
  href?: string;
  audience: string[];
  deliverables: { title: string; text: string }[];
  faqs: Faq[];
};

export type CourseCategory = "Programming" | "Creative" | "Infrastructure";

export type Course = {
  slug: string;
  title: string;
  /** Search-facing title for the course page, e.g. "Java Course in Coimbatore". */
  seoTitle: string;
  category: CourseCategory;
  summary: string;
  topics: string[];
  /** Direct answer to "what will I learn and what can I do after this course?" */
  overview: string;
  audience: string[];
  prerequisites: string;
  /** Syllabus outline. Confirm against the current syllabus before relying on it. */
  modules: { title: string; points: string[] }[];
  outcomes: string[];
  faqs: Faq[];
  /**
   * Set when the course runs as an affiliated programme. Fill in only with the real
   * partner (university, board or certification body) and the certificate it awards.
   */
  affiliation?: { partner: string; certificate?: string };
};
