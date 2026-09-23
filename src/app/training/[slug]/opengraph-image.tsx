import { getCourse, getCourses } from "@/lib/cms";
import { ogSize, renderOg } from "@/lib/seo/og";

export async function generateStaticParams() {
  return (await getCourses()).map((c) => ({ slug: c.slug }));
}

export const size = ogSize;
export const contentType = "image/png";
export const alt = "The Access Point, Coimbatore";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = await getCourse((await params).slug);
  return renderOg({ eyebrow: "Training course", title: item?.title ?? "The Access Point" });
}
