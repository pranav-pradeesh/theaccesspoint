const DEFAULT_SITE_URL = "https://theaccesspoint.com";

/**
 * Canonical origin. Empty or malformed env values fall back instead of breaking the build.
 * Order: NEXT_PUBLIC_SITE_URL → Vercel's production domain → default. A missing scheme gets https://.
 */
function resolveSiteUrl() {
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).origin;
    } catch {
      console.warn(`[site] Ignoring invalid site URL: "${value}"`);
    }
  }
  return DEFAULT_SITE_URL;
}

export const siteConfig = {
  name: "The Access Point",
  descriptor: "Gateway to Knowledge",
  description:
    "The Access Point is a Coimbatore company offering web development, software, design and digital marketing services, and practical IT training courses.",
  url: resolveSiteUrl(),
  // Contact details from the company's published site (theaccesspoint.in, 2017). Confirm they're current before launch.
  email: "theaccesspoint@outlook.com",
  phone: { display: "+91 88381 57323", href: "tel:+918838157323" },
  location: "Coimbatore, India",
  address: {
    lines: ["No. 2, Visweswarraya Street", "Sai Baba Colony, K.K. Pudur Post", "Coimbatore 641038"],
    street: "No. 2, Visweswarraya Street, Sai Baba Colony, K.K. Pudur Post",
    locality: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "641038",
    country: "IN",
  },
  // Only verified profiles belong here; the footer renders nothing when empty.
  socials: [] as { label: string; href: string }[],
} as const;

export const primaryNav = [
  { href: "/services", label: "Services" },
  { href: "/training", label: "Training" },
  { href: "/about", label: "About" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
