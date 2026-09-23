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
};
