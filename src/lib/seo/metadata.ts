import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Options = {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildMetadata({ title, description = siteConfig.description, path, type = "website", publishedTime }: Options): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.descriptor}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
