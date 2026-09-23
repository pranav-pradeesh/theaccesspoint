/*
 * Content access layer. Pages read content through these functions, so moving to a
 * headless CMS later means changing this file, not the pages.
 */
import { courses } from "./content/courses";
import { services } from "./content/services";
import type { Course, Service } from "./types";

export type { Course, CourseCategory, Service } from "./types";
export * from "./content/company";

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}
