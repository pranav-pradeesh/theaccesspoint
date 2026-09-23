import type { Course, Faq, Service } from "@/lib/cms";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Thing = Record<string, unknown>;

export function JsonLd({ data }: { data: Thing | Thing[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const orgId = `${siteConfig.url}/#organization`;
const provider = { "@id": orgId };
const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
};

export const organizationLd = (): Thing => ({
  "@context": "https://schema.org",
  // A local business that also runs training, so both types apply.
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "@id": orgId,
  name: siteConfig.name,
  slogan: siteConfig.descriptor,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.svg"),
  email: siteConfig.email,
  telephone: siteConfig.phone.href.replace("tel:", ""),
  address: postalAddress,
  areaServed: { "@type": "City", name: "Coimbatore" },
  knowsAbout: siteConfig.knowsAbout,
  ...(siteConfig.socials.length ? { sameAs: siteConfig.socials.map((s) => s.href) } : {}),
});

export const websiteLd = (): Thing => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: "en-IN",
  publisher: provider,
});

export const breadcrumbLd = (items: { name: string; path: string }[]): Thing => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqLd = (faqs: Faq[]): Thing => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceLd = (s: Service, path: string): Thing => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl(path)}#service`,
  name: s.title,
  serviceType: s.title,
  description: s.description,
  url: absoluteUrl(path),
  provider,
  areaServed: { "@type": "City", name: "Coimbatore" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: s.title,
    itemListElement: s.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
  },
});

export const courseLd = (c: Course): Thing => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${absoluteUrl(`/training/${c.slug}`)}#course`,
  name: c.title,
  description: c.overview,
  url: absoluteUrl(`/training/${c.slug}`),
  inLanguage: "en",
  provider,
  teaches: c.outcomes,
  coursePrerequisites: c.prerequisites,
  syllabusSections: c.modules.map((m) => ({ "@type": "Syllabus", name: m.title, description: m.points.join(", ") })),
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Onsite",
    location: {
      "@type": "Place",
      name: siteConfig.name,
      address: postalAddress,
    },
  },
  ...(c.affiliation?.certificate
    ? { educationalCredentialAwarded: `${c.affiliation.certificate} (${c.affiliation.partner})` }
    : {}),
});

/** For index pages: points to each item's own page, which carries the full entity. */
export const itemListLd = (name: string, items: { name: string; path: string }[]): Thing => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    url: absoluteUrl(item.path),
  })),
});
