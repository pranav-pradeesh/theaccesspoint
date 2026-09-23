import { ogSize, renderOg } from "@/lib/seo/og";

export const alt = "The Access Point — Gateway to Knowledge";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Gateway to Knowledge", title: "We build digital experiences that move businesses forward." });
}
