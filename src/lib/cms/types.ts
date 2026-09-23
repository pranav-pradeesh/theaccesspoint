export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  offerings: string[];
};

export type CourseCategory = "Programming" | "Creative" | "Infrastructure";

export type Course = {
  slug: string;
  title: string;
  category: CourseCategory;
  summary: string;
  topics: string[];
  /**
   * Set when the course runs as an affiliated programme. Fill in only with the real
   * partner (university, board or certification body) and the certificate it awards.
   */
  affiliation?: { partner: string; certificate?: string };
};
