import { ogSize, renderOg } from "@/lib/seo/og";

export const alt = "The Access Point: web development, software and IT training in Coimbatore";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "IT services and training", title: "Web development, software and IT training." });
}
