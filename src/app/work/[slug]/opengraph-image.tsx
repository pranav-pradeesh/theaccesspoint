import { getProject, getProjects } from "@/lib/cms";
import { ogSize, renderOg } from "@/lib/seo/og";

export const alt = "Case study — The Access Point";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return renderOg({ eyebrow: "Case study", title: project?.name ?? "Selected work" });
}
