/*
 * Content access layer. Pages read content through these functions, so moving to a
 * headless CMS later means changing this file, not the pages.
 */
import { courses } from "./content/courses";
import { generalFaqs } from "./content/faqs";
import { services } from "./content/services";
import type { Course, Service } from "./types";

export type { Course, CourseCategory, Faq, Service } from "./types";
export { serviceHref } from "./content/services";
export * from "./content/company";

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getService(slug: string): Promise<Service | undefined> {
  return services.find((s) => s.slug === slug);
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getCourse(slug: string): Promise<Course | undefined> {
  return courses.find((c) => c.slug === slug);
}

export async function getFaqs() {
  return generalFaqs;
}
