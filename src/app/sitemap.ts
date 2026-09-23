import type { MetadataRoute } from "next";
import { getCourses, getServices, serviceHref } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, courses] = await Promise.all([getServices(), getCourses()]);
  const paths = [
    "/",
    "/services",
    ...services.filter((s) => !s.href).map(serviceHref),
    "/training",
    ...courses.map((c) => `/training/${c.slug}`),
    "/about",
    "/faq",
    "/contact",
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
