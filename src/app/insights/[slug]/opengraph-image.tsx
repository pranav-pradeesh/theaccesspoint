import { getArticle, getArticles } from "@/lib/cms";
import { ogSize, renderOg } from "@/lib/seo/og";

export const alt = "Insight — The Access Point";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  return renderOg({ eyebrow: article?.category ?? "Insights", title: article?.title ?? "Insights" });
}
