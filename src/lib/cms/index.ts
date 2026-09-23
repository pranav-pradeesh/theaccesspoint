/*
 * Content access layer.
 *
 * Every page reads content through these async functions, never from the
 * content files directly. Moving to a headless CMS (Sanity / Payload / Strapi)
 * means reimplementing this file against the CMS client — pages don't change.
 */
import { articles } from "./content/articles";
import { courses } from "./content/courses";
import { projects } from "./content/projects";
import { services } from "./content/services";
import type { Article, ArticleCategory, Course, Project, Service } from "./types";

export type { Article, ArticleCategory, Course, CourseCategory, Project, Service } from "./types";
export * from "./content/company";

export const articleCategories: ArticleCategory[] = [
  "Web Development",
  "Design",
  "Technology",
  "Business",
  "Education",
  "Digital Strategy",
];

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getNextProject(slug: string): Promise<Project | undefined> {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || projects.length < 2) return undefined;
  return projects[(i + 1) % projects.length];
}

export async function getArticles(): Promise<Article[]> {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return articles.find((a) => a.slug === slug);
}

export function categorySlug(category: ArticleCategory) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
