import type { MetadataRoute } from "next";
import { getArticles, getProjects } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  const pages = ["/", "/work", "/services", "/training", "/about", "/insights", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), changeFrequency: "yearly" as const, priority: 0.7 })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/insights/${a.slug}`),
      lastModified: a.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
