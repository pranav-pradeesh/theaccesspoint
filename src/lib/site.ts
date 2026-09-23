export const siteConfig = {
  name: "The Access Point",
  descriptor: "Gateway to Knowledge",
  description:
    "The Access Point builds websites, software, brands and digital experiences where technology meets creativity — and makes technical knowledge accessible.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaccesspoint.com").replace(/\/$/, ""),
  // TODO(content): confirm the public contact address before launch.
  email: "hello@theaccesspoint.com",
  location: "India",
  // Only verified profiles belong here; the footer renders nothing when empty.
  socials: [] as { label: string; href: string }[],
} as const;

export const primaryNav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
