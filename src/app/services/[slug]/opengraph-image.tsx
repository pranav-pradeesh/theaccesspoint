import { getService, getServices } from "@/lib/cms";
import { ogSize, renderOg } from "@/lib/seo/og";

export async function generateStaticParams() {
  return (await getServices()).filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export const size = ogSize;
export const contentType = "image/png";
export const alt = "The Access Point, Coimbatore";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = await getService((await params).slug);
  return renderOg({ eyebrow: "Services", title: item?.title ?? "The Access Point" });
}
